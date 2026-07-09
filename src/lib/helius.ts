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

  const [ansem, wif, bonk, sol] = await Promise.all([
    fetchTokenBalance(keys, wallet, ANSEM_MINT),
    fetchTokenBalance(keys, wallet, WIF_MINT),
    fetchTokenBalance(keys, wallet, BONK_MINT),
    fetchSolBalance(keys, wallet),
  ]);

  // The ANSEM balance is the core signal — if every key failed to return it, surface an error
  // (analyze.ts maps this to PROVIDER_DOWN) rather than silently scoring a holder as 0.
  if (ansem === null) throw new Error("Helius: all keys failed for ANSEM balance");

  const history = await checkHistory(wallet, keys);

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
): Promise<Pick<WalletStats, "isOgHolder" | "receivedAirdrop" | "walletAgeDays">> {
  let isOgHolder = false;
  let receivedAirdrop = false;
  let walletAgeDays = 0;

  try {
    // Wallet age via Helius RPC (the free public RPC at api.mainnet-beta.solana.com is heavily
    // throttled and was failing silently → age defaulted to 0). Falls back across keys.
    const sigData = await heliusRpc<SignaturesResponse>(keys, {
      jsonrpc: "2.0",
      id: "bbi-wallet-age",
      method: "getSignaturesForAddress",
      params: [wallet, { limit: 1000 }],
    });
    // getSignaturesForAddress returns newest-first; the oldest in the page is the last element.
    const page = sigData?.result ?? [];
    const oldest = page[page.length - 1];
    if (oldest?.blockTime) {
      walletAgeDays = Math.floor((Date.now() / 1000 - oldest.blockTime) / 86400);
    }

    // Enhanced transactions via Helius for OG + airdrop check. Falls back across keys.
    let txData: HeliusEnhancedTx[] = [];
    for (const key of keys) {
      try {
        const txRes = await fetch(
          `https://api.helius.xyz/v0/addresses/${wallet}/transactions` +
            `?api-key=${key}&type=TOKEN_TRANSFER&limit=25`,
        );
        if (!txRes.ok) continue;
        txData = (await txRes.json()) as HeliusEnhancedTx[];
        break;
      } catch {
        // Try the next key.
      }
    }

    for (const tx of txData ?? []) {
      for (const t of tx.tokenTransfers ?? []) {
        if (t.mint !== ANSEM_MINT || t.toUserAccount !== wallet) continue;

        // OG check — received ANSEM before the pump cutoff.
        if (tx.timestamp && new Date(tx.timestamp * 1000) < OG_CUTOFF_DATE) {
          isOgHolder = true;
        }

        // Airdrop check — came directly from Ansem's distribution wallet.
        if (t.fromUserAccount === ANSEM_WALLET) {
          receivedAirdrop = true;
        }
      }
    }
  } catch {
    // History check failed — safe defaults keep scoring functional.
  }

  return { isOgHolder, receivedAirdrop, walletAgeDays };
}
