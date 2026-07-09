import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IDENTITIES } from "@/lib/constants";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Worst → best. Each tier is a canonical Identity (spec §9), coloured by its accent.
const GRADE_LADDER = ["F", "D", "C", "B", "A", "S", "S+"] as const;

const GRADES = GRADE_LADDER.map((g) => ({
  g,
  label: IDENTITIES[g].name,
  tone: IDENTITIES[g].colour,
}));

export function GradeReveal() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".bbi-grade");

      // start: only first visible
      cards.forEach((c, i) => {
        gsap.set(c, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 0.4,
          filter: i === 0 ? "blur(0px)" : "blur(40px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((c, i) => {
        if (i === 0) return;
        const prev = cards[i - 1];
        tl.to(prev, {
          opacity: 0,
          scale: 1.8,
          filter: "blur(30px)",
          ease: "power2.in",
          duration: 0.5,
        });
        tl.fromTo(
          c,
          { opacity: 0, scale: 0.4, filter: "blur(40px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 0.5 },
          "<",
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute top-8 left-6 md:left-10 z-20 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        · The grade ladder
      </div>
      <div className="absolute top-8 right-6 md:right-10 z-20 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        07 tiers · 1 truth
      </div>

      <div ref={stage} className="relative flex h-screen w-full items-center justify-center">
        {/* Halo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(216,177,90,0.16),transparent_65%)]" />

        {GRADES.map((g) => (
          <div
            key={g.g}
            className="bbi-grade absolute inset-0 flex flex-col items-center justify-center"
          >
            <div
              className="font-mono text-[11px] uppercase tracking-[0.4em]"
              style={{ color: g.tone }}
            >
              Grade
            </div>
            <div
              className="font-display leading-[0.8] tracking-[-0.06em]"
              style={{
                fontSize: "clamp(180px, 44vw, 700px)",
                background: `linear-gradient(180deg, #ffffff 0%, ${g.tone} 62%, #050505 112%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: `0 0 80px ${g.tone}55`,
              }}
            >
              {g.g}
            </div>
            <div className="mt-4 font-display text-[22px] md:text-[28px] tracking-tight text-white/80">
              {g.label}
            </div>
          </div>
        ))}
      </div>

      {/* progress rail */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {GRADES.map((g) => (
          <div key={g.g} className="flex flex-col items-center gap-2">
            <div className="h-[2px] w-8" style={{ background: g.tone, opacity: 0.5 }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              {g.g}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
