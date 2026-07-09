import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bull from "@/assets/black-bull.png";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bullRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const bullTx = useTransform(sx, (v) => v * 24);
  const bullTy = useTransform(sy, (v) => v * 24);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Bull: subtle rotate + zoom
      tl.to(bullRef.current, { scale: 1.25, rotate: 8, y: -60, ease: "none" }, 0);
      tl.to(ringsRef.current, { rotate: 45, scale: 1.15, ease: "none" }, 0);

      // Line reveals across scroll
      tl.fromTo(
        line1.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
        0.05,
      );
      tl.fromTo(
        line2.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.7 },
        0.25,
      );
      tl.fromTo(
        line3.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
        0.45,
      );

      // Outro dissolve
      tl.to(
        [line1.current, line2.current, line3.current],
        { opacity: 0, y: -30, filter: "blur(12px)", ease: "power2.in", duration: 0.5 },
        0.85,
      );
      tl.to(
        bullRef.current,
        { opacity: 0, scale: 1.6, filter: "blur(20px)", ease: "power2.in", duration: 0.5 },
        0.85,
      );
      tl.fromTo(
        outroRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 },
        0.9,
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Ambient light */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Rings */}
        <div
          ref={ringsRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <div className="relative aspect-square h-[130vh] max-h-[1400px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[10%] rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-[#d8b15a]/20" />
            <div className="absolute inset-[36%] rounded-full border border-white/[0.04]" />
          </div>
        </div>

        {/* Bull */}
        <motion.div
          ref={bullRef}
          style={{ x: bullTx, y: bullTy }}
          className="relative z-10 will-change-transform"
        >
          <div className="absolute inset-x-10 bottom-6 h-20 rounded-[50%] bg-black/90 blur-2xl" />
          <img
            src={bull}
            alt="Black bull sculpture with molten gold veins"
            className="relative max-h-[80vh] w-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.85)]"
          />
        </motion.div>

        {/* Editorial typography stack */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="overflow-hidden">
            <div
              ref={line1}
              className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#d8b15a]"
            >
              — Solana · Season 01 —
            </div>
          </div>
          <div className="mt-8 overflow-hidden">
            <div
              ref={line2}
              className="font-display text-[16vw] md:text-[11vw] leading-[0.85] tracking-[-0.05em] text-white"
            >
              THE <span className="gold-shimmer italic font-light">BLACK</span> BULL
            </div>
          </div>
          <div className="mt-6 overflow-hidden">
            <div
              ref={line3}
              className="max-w-lg text-[14px] md:text-[15px] text-white/60 leading-relaxed"
            >
              Every wallet is a memoir written in transactions. We read the chain and reveal who you
              truly are.
            </div>
          </div>
        </div>

        {/* Outro (fills after dissolve) */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0"
        >
          <div className="font-display text-[22vw] md:text-[16vw] leading-none tracking-[-0.06em] gold-gradient">
            REVEAL
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll to enter
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-[#d8b15a]/70 to-transparent" />
        </div>

        {/* Corner marks */}
        <div className="absolute top-24 left-6 md:left-10 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          01 · Awakening
        </div>
        <div className="absolute top-24 right-6 md:right-10 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 text-right">
          Read the chain <br /> Reveal the myth
        </div>
      </div>
    </section>
  );
}
