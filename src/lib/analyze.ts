// The analyze server function: validate a Solana address, read the chain, score it, persist it,
// and rank it. Server-side only (createServerFn handler) — secrets/D1 never reach the client.
//
// Rules (Phase 6):
//  - A wallet is freshly analysed at most once per 24h; within that window the stored result is
//    served with zero provider calls (this is the per-wallet daily limit).
//  - Fresh analyses are capped per IP per day (abuse protection); cached hits don't count.
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { fetchWalletData } from "@/lib/helius";
import { calculateScore, type ScoreResult, type WalletStats } from "@/lib/score";
import { generateRoast } from "@/lib/roast";
import { loadAnsemPrice, type AnsemPrice } from "@/lib/price";
import { getStore, dayKey, WALLET_TTL_SECONDS, IP_DAILY_CAP } from "@/lib/store";

// Brand-voice error copy (spec §22 / §27.1). Surfaced to the UI verbatim.
export const ANALYZE_ERRORS = {
  INVALID_ADDRESS: "The chain doesn't recognise this address. Check it, anon.",
  RATE_LIMITED: "You've read enough wallets for one day. The chain will still be here tomorrow.",
  PROVIDER_DOWN: "The trenches are congested right now. Try again in a moment.",
  GENERIC: "Something broke in the trenches. Refresh and try again.",
} as const;

// Base58, 32–44 chars — the standard Solana address shape (spec §27.1).
const BASE58_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const inputSchema = z.object({
  wallet: z.string().trim().regex(BASE58_ADDRESS, ANALYZE_ERRORS.INVALID_ADDRESS),
});

export interface AnalyzeResult extends ScoreResult {
  wallet: string;
  roast: string;
  ansemPrice: number;
  rank: number;
  total: number;
  percentile: number | null; // "top N%" — null until the dataset is meaningful
  stats: {
    ansemBalance: number;
    solBalance: number;
    wifBalance: number;
    bonkBalance: number;
    isOgHolder: boolean;
    receivedAirdrop: boolean;
    walletAgeDays: number;
  };
}

function clientIp(): string {
  return (
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function buildResult(
  wallet: string,
  result: ScoreResult,
  roast: string,
  price: AnsemPrice,
  stats: WalletStats,
  rank: number,
  total: number,
): AnalyzeResult {
  return {
    wallet,
    ...result,
    roast,
    ansemPrice: price.priceUsd,
    rank,
    total,
    percentile: total >= 10 ? Math.max(1, Math.ceil((rank / total) * 100)) : null,
    stats: {
      ansemBalance: stats.ansemBalance,
      solBalance: stats.solBalance,
      wifBalance: stats.wifBalance,
      bonkBalance: stats.bonkBalance,
      isOgHolder: stats.isOgHolder,
      receivedAirdrop: stats.receivedAirdrop,
      walletAgeDays: stats.walletAgeDays,
    },
  };
}

export const analyze = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    // Clean brand-voice message instead of a raw ZodError; no provider call for a bad address.
    const parsed = inputSchema.safeParse(data);
    if (!parsed.success) throw new Error(ANALYZE_ERRORS.INVALID_ADDRESS);
    return parsed.data;
  })
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const store = getStore();
    const wallet = data.wallet;
    const now = Math.floor(Date.now() / 1000);

    // --- Cache hit: fresh within 24h → reconstruct from stored stats, zero provider calls ---
    const existing = await store.getWallet(wallet);
    if (existing && now - existing.analyzedAt < WALLET_TTL_SECONDS) {
      try {
        const stats = JSON.parse(existing.data) as WalletStats;
        const result = calculateScore(stats);
        const price = await loadAnsemPrice();
        const { rank, total } = await store.rankFor(result.score);
        return buildResult(wallet, result, existing.roast, price, stats, rank, total);
      } catch {
        // Corrupt stored data — fall through and recompute.
      }
    }

    // --- Fresh analysis: enforce the per-IP daily cap (cached hits above never reach here) ---
    const count = await store.bumpIpUsage(clientIp(), dayKey());
    if (count > IP_DAILY_CAP) throw new Error(ANALYZE_ERRORS.RATE_LIMITED);

    let walletData: WalletStats;
    try {
      walletData = await fetchWalletData(wallet);
    } catch (err) {
      console.error("analyze: wallet fetch failed", err);
      throw new Error(ANALYZE_ERRORS.PROVIDER_DOWN);
    }

    const result = calculateScore(walletData);
    const price = await loadAnsemPrice();
    // generateRoast always resolves (Groq → template fallback), so a reveal never lacks a roast.
    const roast = await generateRoast(walletData, result, price.priceUsd);

    await store.upsertWallet({
      address: wallet,
      grade: result.grade,
      score: result.score,
      identity: result.identity.name,
      ansemBalance: walletData.ansemBalance,
      isOg: walletData.isOgHolder,
      roast,
      data: JSON.stringify(walletData),
      analyzedAt: now,
    });

    const { rank, total } = await store.rankFor(result.score);
    return buildResult(wallet, result, roast, price, walletData, rank, total);
  });
