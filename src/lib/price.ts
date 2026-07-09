// Live $ANSEM market data from DexScreener (public, no auth). Feeds the roast's dollar
// values (P2) and the 1M holder progress bar (P3). Spec §13.2.
// Exposed as a server function with a short in-isolate cache to avoid hammering DexScreener.
import { createServerFn } from "@tanstack/react-start";
import { ANSEM_MINT } from "./constants";

export interface AnsemPrice {
  priceUsd: number;
  change24h: number;
}

interface DexPair {
  priceUsd?: string;
  priceChange?: { h24?: number };
}

interface DexResponse {
  pairs?: DexPair[];
}

const EMPTY: AnsemPrice = { priceUsd: 0, change24h: 0 };
const TTL_MS = 60_000;

// Best-effort cache within a warm runtime. Resets on cold start — acceptable, DexScreener is free.
let cache: { at: number; value: AnsemPrice } | null = null;

// Server-side loader (also used directly by the analyze server fn to inject $ values into the roast).
export async function loadAnsemPrice(): Promise<AnsemPrice> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ANSEM_MINT}`);
    if (!res.ok) return cache?.value ?? EMPTY;

    const data = (await res.json()) as DexResponse;
    const pair = data.pairs?.[0];
    const value: AnsemPrice = {
      priceUsd: pair?.priceUsd ? parseFloat(pair.priceUsd) : 0,
      change24h: pair?.priceChange?.h24 ?? 0,
    };

    cache = { at: Date.now(), value };
    return value;
  } catch {
    // DexScreener down — serve stale if we have it, otherwise a graceful empty reading.
    return cache?.value ?? EMPTY;
  }
}

export const getAnsemPrice = createServerFn({ method: "GET" }).handler(loadAnsemPrice);
