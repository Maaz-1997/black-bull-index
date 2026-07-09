import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { getHerdCount } from "@/lib/leaderboard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Mission() {
  // Real progress toward the 1M "herd" — wallets the Index has read (from D1).
  const { data: herd } = useQuery({
    queryKey: ["herd-count"],
    queryFn: () => getHerdCount(),
    staleTime: 60_000,
    retry: false,
  });
  const read = herd ?? 0;
  const wrap = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const dots = useMemo(() => Array.from({ length: 220 }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        numberRef.current,
        { scale: 0.75, opacity: 0, filter: "blur(30px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.out", duration: 0.4 },
      );
      tl.to(
        numberRef.current,
        { scale: 1.6, opacity: 0, filter: "blur(24px)", ease: "power2.in", duration: 0.4 },
        0.5,
      );

      const nodes = gsap.utils.toArray<HTMLElement>(".bbi-dot");
      gsap.set(nodes, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });

      tl.to(
        nodes,
        {
          opacity: 1,
          scale: 1,
          x: () => (Math.random() - 0.5) * window.innerWidth * 0.9,
          y: () => (Math.random() - 0.5) * window.innerHeight * 0.8,
          stagger: { each: 0.002, from: "random" },
          ease: "power3.out",
          duration: 0.5,
        },
        0.5,
      );

      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3 },
        0.85,
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute top-8 left-6 md:left-10 z-20 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        · Mission
      </div>
      <div className="absolute top-8 right-6 md:right-10 z-20 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        A herd of one million
      </div>

      <div className="relative flex h-full w-full items-center justify-center">
        <div
          ref={numberRef}
          className="font-display leading-[0.8] tracking-[-0.06em] text-center"
          style={{
            fontSize: "clamp(120px, 22vw, 460px)",
            background: "linear-gradient(180deg, #ffffff 0%, #d8b15a 60%, #6a4a15 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          1,000,000
        </div>

        <div
          ref={dotsRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {dots.map((_, i) => (
            <span
              key={i}
              className="bbi-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#d8b15a]"
              style={{ boxShadow: "0 0 8px rgba(216,177,90,0.7)" }}
            />
          ))}
        </div>

        <div
          ref={captionRef}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center opacity-0 z-20 max-w-lg px-6"
        >
          <div className="font-display text-[28px] md:text-[36px] tracking-tight leading-tight">
            One million wallets.
            <br />
            <span className="text-white/60">One index of truth.</span>
          </div>
          <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
            Every dot · A holder · A story
          </div>
          <div className="mt-6 mx-auto max-w-xs">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(1.5, (read / 1_000_000) * 100))}%`,
                  background: "linear-gradient(90deg,#b98a2d,#f4d78a)",
                }}
              />
            </div>
            <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.24em] text-gold">
              {read.toLocaleString()} / 1,000,000 wallets read
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
