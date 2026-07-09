import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";
import { IDENTITIES, GRADE_COLORS } from "@/lib/constants";

const GRADE_ORDER = ["S+", "S", "A", "B", "C", "D", "F"] as const;

export const Route = createFileRoute("/leaderboard")({
  loader: () => getLeaderboard(),
  head: () => ({
    meta: [
      { title: "The Index — Leaderboard · Black Bull Index" },
      {
        name: "description",
        content: "The ranked wallets of the Black Bull Index. Where do you stand in the trenches?",
      },
    ],
  }),
  component: LeaderboardPage,
});

const short = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

function LeaderboardPage() {
  const entries = Route.useLoaderData();
  const [filter, setFilter] = useState<string>("ALL");

  // Rank is the overall position; compute before filtering.
  const ranked = entries.map((e, i) => ({ ...e, rank: i + 1 }));
  const shown = filter === "ALL" ? ranked : ranked.filter((e) => e.grade === filter);

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{ background: "radial-gradient(60% 40% at 50% 0%, #d8b15a22, transparent 70%)" }}
      />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10 py-20 md:py-28">
        {/* header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 rounded-sm gold-foil" />
              <div className="absolute inset-[3px] rounded-[2px] bg-[#050505]" />
            </div>
            <span className="font-display text-[15px] tracking-tight">
              Black Bull <span className="text-muted-foreground">Index</span>
            </span>
          </Link>
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-white transition-colors"
          >
            Read a wallet →
          </Link>
        </div>

        <div className="mt-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
            The index
          </div>
          <h1 className="mt-5 font-display text-[13vw] md:text-[6vw] leading-[0.9] tracking-[-0.04em]">
            The <span className="italic gold-shimmer">Leaderboard</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] text-muted-foreground">
            Every wallet the chain has read, ranked by conviction. Public on-chain data — no wallet
            connection.
          </p>
        </div>

        {/* filter chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          {(["ALL", ...GRADE_ORDER] as const).map((g) => {
            const active = filter === g;
            const label = g === "ALL" ? "All" : IDENTITIES[g].name;
            const colour = g === "ALL" ? "#d8b15a" : GRADE_COLORS[g];
            return (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className="rounded-full border px-4 h-9 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors"
                style={{
                  borderColor: active ? colour : "rgba(255,255,255,0.1)",
                  color: active ? colour : "rgba(255,255,255,0.55)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* list */}
        {shown.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="font-display text-[28px] md:text-[36px] text-white/80">
              No wallets here yet.
            </p>
            <p className="mt-3 text-[14px] text-muted-foreground">
              Be the first in this tier — read a wallet and claim the spot.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-gradient-to-b from-[#f4d78a] via-[#d8b15a] to-[#b98a2d] px-6 text-[13px] font-medium text-[#1a0f00]"
            >
              Read the Chain
            </Link>
          </div>
        ) : (
          <div className="mt-10 flex flex-col">
            {shown.map((e, i) => {
              const c = GRADE_COLORS[e.grade] ?? "#d8b15a";
              return (
                <motion.div
                  key={e.address}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
                  className="grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-white/[0.06] py-4"
                >
                  <div className="font-mono text-[13px] text-muted-foreground">#{e.rank}</div>
                  <div className="min-w-0">
                    <div
                      className="font-display text-[18px] md:text-[22px] tracking-tight truncate"
                      style={{ color: c }}
                    >
                      {e.identity}
                      {e.isOg && (
                        <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                          · OG
                        </span>
                      )}
                    </div>
                    <a
                      href={`https://solscan.io/account/${e.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
                    >
                      {short(e.address)} ↗
                    </a>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-display text-[24px] md:text-[30px] leading-none"
                      style={{ color: c }}
                    >
                      {e.score}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {e.grade}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
