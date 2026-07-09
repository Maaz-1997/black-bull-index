import { motion } from "framer-motion";
import { Counter } from "./Counter";

// Accurate, static facts about how the Index works — no fabricated live metrics.
// "0 wallet connections" is still true: we read public on-chain data, never connect a wallet.
const STATS = [
  { v: 7, label: "Identity archetypes" },
  { v: 7, label: "On-chain signals" },
  { v: 100, label: "Point scale" },
  { v: 0, label: "Wallet connections" },
];

export function Stats() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden py-40">
      {/* Rotating rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[110vh] max-h-[1200px] animate-[bbi-rotate-slow_120s_linear_infinite]">
          <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-[10%] rounded-full border border-dashed border-[#d8b15a]/15" />
          <div className="absolute inset-[22%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[36%] rounded-full border border-[#d8b15a]/10" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="relative aspect-square h-[90vh] max-h-[1000px] animate-[bbi-rotate-slow_180s_linear_infinite]"
          style={{ animationDirection: "reverse" }}
        >
          <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[15%] rounded-full border border-dashed border-[#d8b15a]/12" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] w-full px-6 md:px-10 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
            · The index
          </div>
          <h2 className="mt-6 font-display text-[10vw] md:text-[5vw] leading-[0.95] tracking-[-0.04em]">
            The chain, <span className="italic gold-shimmer">read</span>.
          </h2>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="font-display gold-gradient text-[48px] md:text-[80px] leading-none tracking-[-0.04em]">
                <Counter to={s.v} />
              </div>
              <div className="mt-4 mx-auto h-px w-8 bg-gradient-to-r from-transparent via-[#d8b15a]/60 to-transparent" />
              <div className="mt-4 text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
