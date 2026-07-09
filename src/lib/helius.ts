// Server-only wallet data fetcher. Adapted from black-bull-index.md §28 to run inside a
// TanStack Start server function (edge/worker-safe: fetch + Web APIs only).
// Import this ONLY from server functions — it reads HELIUS_API_KEY.
//
// Token balances are read per-mint via getTokenAccountsByOwner (exact, regardless of how many
// other assets the wallet holds). The earlier getAssetsByOwner approach paginated at 100 assets,
// so whales with many tokens reported 0 ANSEM even while holding millions.
import { ANSEM_MINT, WIF_MINT, BONK_MINT, OG_CUTOFF_DATE, ANSEM_WALLET } from "./constants";
import { serverEnvKeys } from "./env";
import type { WalletStats } from "./score";

// --- Minimal typed shapes for the provider responses we consume ---

interface TokenAccount {
  account?: { data?: { parsed?: { info?: { tokenAmount?: { uiAmount?: number | null } } } } };
}

interface TokenAccountsResponse {
  result?: { value?: TokenAccount[] };
}

interface BalanceResponse {
  result?: { value?: number };
}

interface HeliusTokenTransfer {
  mint?: string;
  fromUserAccount?: string;
  toUserAccount?: string;
}

interface HeliusEnhancedTx {
  timestamp?: number;
  tokenTransfers?: HeliusTokenTransfer[];
}

interface SignatureInfo {
  signature?: string;
  blockTime?: number | null;
}

interface SignaturesResponse {
  result?: SignatureInfo[];
}

function heliusKeys(): string[] {
  const keys = serverEnvKeys("HELIUS_API_KEY");
  if (keys.length === 0) throw new Error("HELIUS_API_KEY is not set");
  return keys;
}

// A Helius mainnet RPC call that falls back across keys. Returns null only when every key fails
// (network error / non-2xx) — callers use null to distinguish "provider down" from a real 0.
async function heliusRpc<T>(keys: string[], body: object): Promise<T | null> {
  for (const key of keys) {
    try {
      const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) continue;
      return (await res.json()) as T;
    } catch {
      // Try the next key.
    }
  }
  return null;
}

// Pure: sum the uiAmount across a getTokenAccountsByOwner response. No I/O — unit-tested.
export function parseTokenAccounts(data: TokenAccountsResponse): number {
  const accounts = data.result?.value ?? [];
  let total = 0;
  for (const acct of accounts) {
    const ui = acct.account?.data?.parsed?.info?.tokenAmount?.uiAmount;
    if (typeof ui === "number") total += ui;
  }
  return total;
}

// Exact balance of a single mint for an owner. null → provider failure (not a real 0 balance).
async function fetchTokenBalance(
  keys: string[],
  owner: string,
  mint: string,
): Promise<number | null> {
  const data = await heliusRpc<TokenAccountsResponse>(keys, {
    jsonrpc: "2.0",
    id: "bbi-token",
    method: "getTokenAccountsByOwner",
    params: [owner, { mint }, { encoding: "jsonParsed" }],
  });
  return data ? parseTokenAccounts(data) : null;
}

async function fetchSolBalance(keys: string[], owner: string): Promise<number | null> {
  const data = await heliusRpc<BalanceResponse>(keys, {
    jsonrpc: "2.0",
    id: "bbi-sol",
    method: "getBalance",
    params: [owner],
  });
  return data ? (data.result?.value ?? 0) / 1e9 : null;
}

export async function fetchWalletData(wallet: string): Promise<WalletStats> {
  const keys = heliusKeys();

  // Everything runs concurrently — balances, wallet age, and the enhanced-tx history check — so
  // total latency is roughly the slowest single request, not the sum. (Previously sequential,
  // which pushed cold analyses to 30–45s.)
  const [ansem, wif, bonk, sol, history] = await Promise.all([
    fetchTokenBalance(keys, wallet, ANSEM_MINT),
    fetchTokenBalance(keys, wallet, WIF_MINT),
    fetchTokenBalance(keys, wallet, BONK_MINT),
    fetchSolBalance(keys, wallet),
    checkHistory(wallet, keys),
  ]);

  // The ANSEM balance is the core signal — if every key failed to return it, surface an error
  // (analyze.ts maps this to PROVIDER_DOWN) rather than silently scoring a holder as 0.
  if (ansem === null) throw new Error("Helius: all keys failed for ANSEM balance");

  return {
    walletAddress: wallet,
    ansemBalance: ansem,
    wifBalance: wif ?? 0,
    bonkBalance: bonk ?? 0,
    solBalance: sol ?? 0,
    ...history,
  };
}

// OG status, airdrop receipt, and wallet age. Best-effort — on any failure we return safe
// defaults (false / 0) so scoring still produces a result.
//
// Heuristic limits (documented per steering C4):
//  - OG/airdrop use Helius enhanced transactions (last 25 TOKEN_TRANSFERs). A wallet whose
//    ANSEM history is older/deeper than that window may under-report OG/airdrop. We never
//    fabricate a positive signal — unknown resolves to false.
//  - Wallet age uses the oldest signature within one getSignaturesForAddress page (max 1000,
//    newest-first). Exact for wallets with <=1000 signatures; a conservative floor otherwise.
async function checkHistory(
  wallet: string,
  keys: string[],
): Promise<
  Pick<WalletStats, "isOgHolder" | "receivedAirdrop" | "walletAgeDays" | "walletAgeKnown">
> {
  let isOgHolder = false;
  let receivedAirdrop = false;
  let walletAgeDays = 0;
  let walletAgeKnown = true;

  try {
    // Age and the enhanced-tx history check are independent — run them together.
    const [age, txData] = await Promise.all([
      fetchWalletAge(keys, wallet),
      fetchEnhancedTxs(keys, wallet),
    ]);
    walletAgeDays = age.days;
    walletAgeKnown = age.known;

    for (const tx of txData) {
      for (const t of tx.tokenTransfers ?? []) {
        if (t.mint !== ANSEM_MINT || t.toUserAccount !== wallet) continue;
        // OG check — received ANSEM before the pump cutoff.
        if (tx.timestamp && new Date(tx.timestamp * 1000) < OG_CUTOFF_DATE) isOgHolder = true;
        // Airdrop check — came directly from Ansem's distribution wallet.
        if (t.fromUserAccount === ANSEM_WALLET) receivedAirdrop = true;
      }
    }
  } catch {
    // History check failed — safe defaults keep scoring functional.
  }

  return { isOgHolder, receivedAirdrop, walletAgeDays, walletAgeKnown };
}

// Recent ANSEM token transfers for the OG + airdrop check. Falls back across keys.
async function fetchEnhancedTxs(keys: string[], wallet: string): Promise<HeliusEnhancedTx[]> {
  for (const key of keys) {
    try {
      const res = await fetch(
        `https://api.helius.xyz/v0/addresses/${wallet}/transactions` +
          `?api-key=${key}&type=TOKEN_TRANSFER&limit=25`,
      );
      if (!res.ok) continue;
      return (await res.json()) as HeliusEnhancedTx[];
    } catch {
      // Try the next key.
    }
  }
  return [];
}

// Wallet age from a single getSignaturesForAddress call (newest-first, max 1000).
//   - fewer than 1000 signatures → that's the whole history; the oldest is the first tx → exact age
//   - a full page (1000) → the wallet has 1000+ txs → "established" veteran, exact age indeterminate
//     (we never claim a specific "N days" and treat it as long-lived for scoring)
//   - no signatures → genuinely new/empty wallet (age 0, known)
//   - fetch failed → treat as established rather than risk claiming "0 days"
// One call keeps cold analyses fast; deep pagination to genesis isn't worth 4+ extra round-trips.
async function fetchWalletAge(
  keys: string[],
  wallet: string,
): Promise<{ days: number; known: boolean }> {
  const data = await heliusRpc<SignaturesResponse>(keys, {
    jsonrpc: "2.0",
    id: "bbi-wallet-age",
    method: "getSignaturesForAddress",
    params: [wallet, { limit: 1000 }],
  });
  if (!data) return { days: 0, known: false };
  const page = data.result ?? [];
  if (page.length === 0) return { days: 0, known: true };
  if (page.length >= 1000) return { days: 0, known: false };
  const oldest = page[page.length - 1];
  if (oldest?.blockTime) {
    return { days: Math.floor((Date.now() / 1000 - oldest.blockTime) / 86400), known: true };
  }
  return { days: 0, known: false };
}
