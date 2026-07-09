// Pure scoring logic — no I/O, deterministic, unit-tested.
// Mirrors black-bull-index.md §14.1. Do not change weights or thresholds here;
// they live in constants.ts and are canonical.
import {
  SCORE_WEIGHTS,
  GRADE_THRESHOLDS,
  GRADE_LABELS,
  GRADE_COLORS,
  IDENTITIES,
} from "./constants";

export interface WalletStats {
  walletAddress: string;
  ansemBalance: number; // human-readable (not raw)
  solBalance: number; // in SOL
  wifBalance: number;
  bonkBalance: number;
  isOgHolder: boolean; // first ANSEM tx before OG_CUTOFF_DATE
  receivedAirdrop: boolean; // received ANSEM from Ansem's wallet
  walletAgeDays: number;
}

export interface ScoreResult {
  score: number;
  grade: string;
  gradeLabel: string;
  gradeColor: string;
  identity: (typeof IDENTITIES)[string];
  breakdown: Record<string, number>;
}

export function calculateScore(stats: WalletStats): ScoreResult {
  const breakdown: Record<string, number> = {};
  let score = 0;

  const add = (key: string, pts: number) => {
    score += pts;
    breakdown[key] = pts;
  };

  // ANSEM balance (cumulative tiers — each adds on top)
  if (stats.ansemBalance > 0) add("ansemAny", SCORE_WEIGHTS.ansemAny);
  if (stats.ansemBalance > 10_000) add("ansemOver10k", SCORE_WEIGHTS.ansemOver10k);
  if (stats.ansemBalance > 100_000) add("ansemOver100k", SCORE_WEIGHTS.ansemOver100k);
  if (stats.ansemBalance > 1_000_000) add("ansemOver1m", SCORE_WEIGHTS.ansemOver1m);

  // Solana ecosystem presence
  if (stats.solBalance > 1) add("solBalance", SCORE_WEIGHTS.solBalance);
  if (stats.wifBalance > 0) add("wifHolder", SCORE_WEIGHTS.wifHolder);
  if (stats.bonkBalance > 0) add("bonkHolder", SCORE_WEIGHTS.bonkHolder);

  // OG status — held before the pump
  if (stats.isOgHolder) add("ogHolder", SCORE_WEIGHTS.ogHolder);

  // Loyalty — received airdrop AND still holding
  if (stats.receivedAirdrop && stats.ansemBalance > 0)
    add("loyalAirdrop", SCORE_WEIGHTS.loyalAirdrop);

  // Wallet age bonus
  if (stats.walletAgeDays > 365) add("walletAge1year", SCORE_WEIGHTS.walletAge1year);
  if (stats.walletAgeDays > 730) add("walletAge2years", SCORE_WEIGHTS.walletAge2years);

  // Penalty — received airdrop then sold everything
  if (stats.receivedAirdrop && stats.ansemBalance === 0)
    add("soldAirdropPenalty", SCORE_WEIGHTS.soldAirdropPenalty);

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score));

  const grade = assignGrade(score);
  const identity = IDENTITIES[grade];

  return {
    score,
    grade,
    gradeLabel: GRADE_LABELS[grade],
    gradeColor: GRADE_COLORS[grade],
    identity,
    breakdown,
  };
}

function assignGrade(score: number): string {
  const sorted = Object.entries(GRADE_THRESHOLDS).sort(([, a], [, b]) => b - a);
  for (const [grade, min] of sorted) {
    if (score >= min) return grade;
  }
  return "F";
}
