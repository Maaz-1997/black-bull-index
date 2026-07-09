// Leaderboard data — top ranked wallets. Server-only (reads the store). Returns a client-safe DTO.
import { createServerFn } from "@tanstack/react-start";
import { getStore } from "@/lib/store";

export interface LeaderboardEntry {
  address: string;
  grade: string;
  score: number;
  identity: string;
  isOg: boolean;
  ansemBalance: number;
}

export const getLeaderboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeaderboardEntry[]> => {
    const rows = await getStore().topWallets(100);
    return rows.map((r) => ({
      address: r.address,
      grade: r.grade,
      score: r.score,
      identity: r.identity,
      isOg: r.isOg,
      ansemBalance: r.ansemBalance,
    }));
  },
);

// Total wallets read — drives the 1M "herd" progress on the landing and reveal.
export const getHerdCount = createServerFn({ method: "GET" }).handler(async (): Promise<number> =>
  getStore().count(),
);
