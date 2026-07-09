import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAnsemPrice } from "@/lib/price";

export function Nav() {
  // Real liveness: the dot is "live" only when a fresh $ANSEM price actually comes back.
  const { data: price } = useQuery({
    queryKey: ["ansem-price"],
    queryFn: () => getAnsemPrice(),
    refetchInterval: 60_000,
    staleTime: 60_000,
    retry: false,
  });
  const live = (price?.priceUsd ?? 0) > 0;
  const fmtPrice = (v: number) => (v < 0.01 ? v.toPrecision(2) : v.toFixed(4));
  const up = (price?.change24h ?? 0) >= 0;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-sm gold-foil" />
            <div className="absolute inset-[3px] rounded-[2px] bg-[#050505]" />
          </div>
          <span className="font-display text-[15px] tracking-tight">
            Black Bull <span className="text-muted-foreground">Index</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-9 text-[13px] text-muted-foreground">
          <a href="#story" className="hover:text-white transition-colors">
            Story
          </a>
          <a href="#method" className="hover:text-white transition-colors">
            Method
          </a>
          <a href="#identities" className="hover:text-white transition-colors">
            Identities
          </a>
          <Link to="/leaderboard" className="hover:text-white transition-colors">
            Leaderboard
          </Link>
          <a href="#grades" className="hover:text-white transition-colors">
            Grades
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span
              className={
                live
                  ? "h-1.5 w-1.5 rounded-full bg-[#c8a34a] shadow-[0_0_12px_#c8a34a] animate-pulse"
                  : "h-1.5 w-1.5 rounded-full bg-white/25"
              }
            />
            {live && price ? (
              <>
                <span className="text-white/70">$ANSEM ${fmtPrice(price.priceUsd)}</span>
                <span style={{ color: up ? "#7ED321" : "#D0021B" }}>
                  {up ? "▲" : "▼"}
                  {Math.abs(price.change24h).toFixed(1)}%
                </span>
              </>
            ) : (
              "Solana"
            )}
          </span>
          <a
            href="#grades"
            className="text-[13px] px-4 h-9 inline-flex items-center rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition"
          >
            Read the Chain
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="hairline h-px" />
      </div>
    </motion.header>
  );
}
