import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IDENTITIES } from "@/lib/constants";

// Best → worst. The 7 canonical archetypes (spec §9), sourced from constants.
const GRADE_ORDER = ["S+", "S", "A", "B", "C", "D", "F"] as const;

// Dark cinematic base per grade, subtly tinted toward that Identity's accent.
const TONES: Record<string, string> = {
  "S+": "from-[#3a2a08] via-[#0d0d0d] to-[#050505]",
  S: "from-[#2e2109] via-[#0d0d0d] to-[#050505]",
  A: "from-[#0f2410] via-[#0d0d0d] to-[#050505]",
  B: "from-[#0a1626] via-[#0d0d0d] to-[#050505]",
  C: "from-[#1a1a1a] via-[#0d0d0d] to-[#050505]",
  D: "from-[#2a0a0a] via-[#0d0d0d] to-[#050505]",
  F: "from-[#1e0505] via-[#0d0d0d] to-[#050505]",
};

const identities = GRADE_ORDER.map((grade) => ({
  tag: `${grade} · ${IDENTITIES[grade].scoreRange}`,
  name: IDENTITIES[grade].name,
  line: IDENTITIES[grade].tagline,
  range: IDENTITIES[grade].scoreRange,
  desc: IDENTITIES[grade].description,
  tone: TONES[grade],
  accent: IDENTITIES[grade].colour,
}));

export function Identities() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(identities.length - 1) * 100}vw`]);

  return (
    <section
      id="identities"
      ref={ref}
      className="relative"
      style={{ height: `${identities.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div className="absolute top-8 left-6 md:left-10 z-20 flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
          <span className="text-gold">·</span> Archetypes
          <span className="h-px w-16 bg-white/10" />
          <span>07 identities</span>
        </div>

        <motion.div style={{ x }} className="flex h-full">
          {identities.map((id, i) => (
            <IdCard key={id.name} data={id} index={i} total={identities.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IdCard({
  data,
  index,
  total,
}: {
  data: (typeof identities)[number];
  index: number;
  total: number;
}) {
  return (
    <div className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16">
      <div className={`absolute inset-0 bg-gradient-to-br ${data.tone}`} />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(60% 60% at 70% 30%, ${data.accent}20, transparent 70%)`,
        }}
      />

      <div className="relative z-10 grid w-full max-w-[1240px] grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: data.accent }}
          >
            {data.tag}
          </div>
          <h3 className="mt-6 font-display text-[14vw] md:text-[9vw] leading-[0.9] tracking-[-0.04em]">
            {data.name}
          </h3>
          <p className="mt-8 max-w-lg text-[18px] md:text-[22px] leading-snug text-white/70 font-light italic">
            &ldquo;{data.line}&rdquo;
          </p>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="glass-card rounded-[28px] p-8">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span>Profile</span>
              <span>
                0{index + 1} / 0{total}
              </span>
            </div>
            <div className="mt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Score range
              </div>
              <div
                className="mt-1 font-display text-[40px] leading-none tracking-[-0.03em]"
                style={{ color: data.accent }}
              >
                {data.range}
              </div>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-white/60">{data.desc}</p>
            <div className="mt-8 h-px hairline" />
            <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
              Read-only · Public on-chain data
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
        Swipe · Scroll →
      </div>
    </div>
  );
}
