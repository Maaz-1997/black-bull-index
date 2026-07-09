import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// The origin narrative — spec §6, verbatim, mapped onto the 3-chapter scroller.
const chapters = [
  {
    n: "I",
    title: "The Black Bull",
    body: "In June 2026, Ansem — one of Solana's most respected traders and researchers — deployed a token on Pump.fun with a single thesis: that the people who built this ecosystem deserve to share in its upside. He called it the Black Bull. He held 60% of the supply. And then he started giving the rest away.",
  },
  {
    n: "II",
    title: "The Trenches",
    body: "Every week, creator fees from the token flow back to the community. Not to insiders. Not to a DAO that never votes. To the wallets in the trenches — the early buyers, the faithful holders, the people who sent the RT and posted the wallet address in a thread at 2am because they believed in the mission.",
  },
  {
    n: "III",
    title: "The Record",
    body: "The Black Bull Index exists to read that history. To look at a wallet and say: were you there? Did you hold? Do you belong to this story? Your transactions are already written. We just read them back to you.",
  },
];

export function Story() {
  const wrap = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".bbi-chapter");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: `+=${items.length * 90}%`,
          pin: true,
          scrub: 1,
        },
      });

      gsap.set(items, { opacity: 0, y: 60, filter: "blur(12px)" });
      gsap.set(items[0], { opacity: 1, y: 0, filter: "blur(0px)" });

      tl.to(railRef.current, { scaleY: 1, ease: "none" }, 0);

      items.forEach((c, i) => {
        if (i === 0) return;
        const prev = items[i - 1];
        tl.to(prev, { opacity: 0, y: -40, filter: "blur(12px)", duration: 0.4, ease: "power2.in" });
        tl.fromTo(
          c,
          { opacity: 0, y: 60, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
          "<",
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={wrap} className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute top-8 left-6 md:left-10 z-20 flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
        <span className="text-gold">·</span> Chapter · Origin
      </div>

      {/* Vertical gold line drawing itself */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 z-10">
        <div
          ref={railRef}
          className="h-full w-full origin-top bg-gradient-to-b from-transparent via-[#d8b15a]/50 to-transparent"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <div className="relative flex h-full w-full items-center justify-center px-6">
        {chapters.map((c, i) => (
          <div
            key={c.n}
            className="bbi-chapter absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
              — Chapter {c.n} —
            </div>
            <h3 className="mt-8 font-display text-[16vw] md:text-[10vw] leading-[0.85] tracking-[-0.05em] text-white">
              {c.title}
            </h3>
            <p className="mt-10 max-w-2xl text-[15px] md:text-[18px] leading-relaxed text-white/60 font-light">
              {c.body}
            </p>
            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              0{i + 1} · 03 · Solana L1
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
