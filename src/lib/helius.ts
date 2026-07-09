// Server-only wallet data fetcher. Adapted from black-bull-index.md §28 to run inside a
// TanStack Start server function (edge/worker-safe: fetch + Web APIs only).
// Import this ONLY from server functions — it reads HELIUS_API_KEY.
import { ANSEM_MINT, WIF_MINT, BONK_MINT, OG_CUTOFF_DATE, ANSEM_WALLET } from "./constants";
import { serverEnvKeys } from "./env";
import type { WalletStats } from "./score";

// --- Minimal typed shapes for the provider responses we consume ---

interface HeliusTokenInfo {
  balance?: number;
  decimals?: number;
}

interface HeliusAsset {
  id: string;
  token_info?: HeliusTokenInfo;
}

interface HeliusAssetsResponse {
  result?: {
    items?: HeliusAsset[];
    nativeBalance?: { lamports?: number };
  };
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

export interface WalletBalances {
  ansemBalance: number;
  solBalance: number;
  wifBalance: number;
  bonkBalance: number;
}

function heliusKeys(): string[] {
  const keys = serverEnvKeys("HELIUS_API_KEY");
  if (keys.length === 0) throw new Error("HELIUS_API_KEY is not set");
  return keys;
}

// Pure: turn a getAssetsByOwner response into human-readable balances. No I/O — unit-tested.
export function parseWalletAssets(data: HeliusAssetsResponse): WalletBalances {
  const items = data.result?.items ?? [];
  const nativeLamports = data.result?.nativeBalance?.lamports ?? 0;

  const find = (mint: string): HeliusAsset | undefined => items.find((t) => t.id === mint);

  const toHuman = (asset: HeliusAsset | undefined, defaultDecimals: number): number => {
    const info = asset?.token_info;
    if (!info?.balance) return 0;
    return info.balance / Math.pow(10, info.decimals ?? defaultDecimals);
  };

  return {
    ansemBalance: toHuman(find(ANSEM_MINT), 6),
    wifBalance: toHuman(find(WIF_MINT), 6),
    bonkBalance: toHuman(find(BONK_MINT), 5),
    solBalance: nativeLamports / 1e9,
  };
}

export async function fetchWalletData(wallet: string): Promise<WalletStats> {
  const keys = heliusKeys();

  // Try each key in order; a rate-limited or failing key falls through to the next.
  let lastError: unknown;
  let data: HeliusAssetsResponse | null = null;
  for (const key of keys) {
    try {
      const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "black-bull-index",
          method: "getAssetsByOwner",
          params: {
            ownerAddress: wallet,
            page: 1,
            limit: 100,
            displayOptions: {
              showFungible: true,
              showNativeBalance: true,
              showZeroBalance: false,
            },
          },
        }),
      });
      if (!res.ok) {
        lastError = new Error(`Helius error: ${res.status}`);
        continue;
      }
      data = (await res.json()) as HeliusAssetsResponse;
      break;
    } catch (err) {
      lastError = err;
    }
  }
  if (!data) throw lastError ?? new Error("Helius: all keys failed");

  const balances = parseWalletAssets(data);
  const history = await checkHistory(wallet, keys);

  return {
    walletAddress: wallet,
    ...balances,
    ...history,
  };
}

// OG status, airdrop receipt, and wallet age. Best-effort within a single call per provider.
// On any failure we return safe defaults (false / 0) so scoring still produces a result.
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
    let page: SignatureInfo[] = [];
    for (const key of keys) {
      try {
        const sigRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "bbi-wallet-age",
            method: "getSignaturesForAddress",
            params: [wallet, { limit: 1000 }],
          }),
        });
        if (!sigRes.ok) continue;
        const sigData = (await sigRes.json()) as SignaturesResponse;
        page = sigData.result ?? [];
        break;
      } catch {
        // Try the next key.
      }
    }
    // getSignaturesForAddress returns newest-first; the oldest in the page is the last element.
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
