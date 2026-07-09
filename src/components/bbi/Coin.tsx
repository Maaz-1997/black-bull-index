import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Coin() {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const ry = useTransform(sx, (v) => v * 40);
  const rx = useTransform(sy, (v) => v * -25);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const el = wrap.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 relative z-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            · The artifact
          </div>
          <h2 className="mt-6 font-display text-[12vw] md:text-[6vw] leading-[0.9] tracking-[-0.04em]">
            Struck in <span className="gold-shimmer italic">gold</span>.
            <br />
            Held by <span className="italic">the few</span>.
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            The Black Bull medallion is the emblem of your reading — struck the moment the chain
            reveals your grade. No mint, no wallet connection. Just the verdict, rendered in gold.
          </p>
          <div className="mt-10 flex items-center gap-6 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
            <span>Read-only</span>
            <span>·</span>
            <span>Public data</span>
            <span>·</span>
            <span>Publicly ranked</span>
          </div>
        </div>

        <div
          ref={wrap}
          className="md:col-span-7 relative h-[560px] md:h-[720px] flex items-center justify-center"
          style={{ perspective: 1400 }}
        >
          {/* Halo */}
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(216,177,90,0.18),transparent_65%)]" />
          {/* Floor shadow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-8 w-[60%] rounded-[50%] bg-black/80 blur-2xl" />

          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative animate-float"
          >
            <div
              className="relative aspect-square h-[420px] md:h-[560px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg, #6a4a15, #f4d78a, #d8b15a, #b98a2d, #6a4a15, #f4d78a, #d8b15a, #6a4a15)",
                boxShadow:
                  "0 60px 120px -30px rgba(0,0,0,0.9), 0 0 60px rgba(216,177,90,0.25), inset 0 0 40px rgba(255,231,168,0.35), inset 0 -20px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Rim */}
              <div className="absolute inset-[4%] rounded-full border-[6px] border-[#5a3f10]/60" />
              {/* Inner face */}
              <div
                className="absolute inset-[10%] rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, #f4d78a 0%, #d8b15a 40%, #b98a2d 75%, #6a4a15 100%)",
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)",
                }}
              >
                <div className="text-center">
                  <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#3a2708]">
                    Black Bull
                  </div>
                  <div className="font-display text-[72px] md:text-[110px] leading-none tracking-[-0.05em] text-[#2a1a05] mt-2">
                    S+
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3a2708]/70 mt-2">
                    Est · 2026
                  </div>
                </div>
              </div>
              {/* Reflection sweep */}
              <div
                className="absolute inset-[10%] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                  mixBlendMode: "overlay",
                }}
              />
              {/* Notches */}
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[calc(50%-2px)] w-[2px] origin-top bg-[#3a2708]/40"
                  style={{ transform: `translate(-50%, 0) rotate(${i * 6}deg)` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
