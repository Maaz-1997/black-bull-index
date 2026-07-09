import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, RotateCcw, Download, Trophy, Sparkles } from "lucide-react";
import { analyze, reroast, type AnalyzeResult } from "@/lib/analyze";
import { BREAKDOWN_LABELS } from "@/lib/constants";
import {
  buildOgImageUrl,
  buildOgImagePath,
  buildImagePath,
  buildShareText,
  sanitizeHandle,
} from "@/lib/og-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { startLoadingDrone, playCue } from "@/lib/sound";
import bull from "@/assets/black-bull.png";

export const Route = createFileRoute("/result/$wallet")({
  // Load server-side so the reveal AND the share meta / OG card are per-result and crawler-correct.
  loader: ({ params }) => analyze({ data: { wallet: params.wallet } }),
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Your Identity — The Black Bull Index" }] };
    const d = loaderData;
    const title = `${d.identity.name} · ${d.grade} — The Black Bull Index`;
    const description = d.identity.tagline;
    const image = buildOgImageUrl(d);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
    };
  },
  pendingComponent: PendingResult,
  // Show the charge loader almost immediately on client navigation, and once shown keep it up
  // long enough for the cinematic beat to land — even when the analysis returns from cache fast.
  pendingMs: 150,
  pendingMinMs: 2200,
  errorComponent: ({ error }) => (
    <Fault message={error instanceof Error ? error.message : undefined} />
  ),
  component: ResultPage,
});

function ResultPage() {
  return <Reveal data={Route.useLoaderData()} />;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD_TEXT = "linear-gradient(180deg,#fbe7bd 0%,#f4d78a 45%,#b98a2d 100%)";
const short = (w: string) => (w.length > 12 ? `${w.slice(0, 4)}…${w.slice(-4)}` : w);

function compact(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(Math.round(n));
}

function fmtPrice(v: number): string {
  if (v >= 1) return `$${v.toFixed(2)}`;
  if (v >= 0.01) return `$${v.toFixed(3)}`;
  return `$${v.toPrecision(2)}`;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

// Base58 alphabet (Solana) — used to scramble/decode the wallet hash on the loader.
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const isB58 = (ch: string) => B58.includes(ch);

// Decodes the wallet hash left→right (random base58 chars settling into the real ones), then
// holds and re-scrambles on a loop so an indeterminate wait always reads as "reading the chain".
function useScramble(text: string): string {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOut(text);
      return;
    }
    const chars = text.split("");
    const decodeMs = 950;
    const holdMs = 1400;
    let start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      if (t < decodeMs) {
        const p = t / decodeMs;
        setOut(
          chars
            .map((ch, i) =>
              !isB58(ch) || i / chars.length < p ? ch : B58[Math.floor(Math.random() * B58.length)],
            )
            .join(""),
        );
      } else if (t < decodeMs + holdMs) {
        setOut(text);
      } else {
        start = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return out;
}

const LOADER_STATUS = [
  "Fetching on-chain assets",
  "Checking OG status",
  "Weighing the signals",
  "Consulting the Black Bull",
];

function useCyclingStatus(): string {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % LOADER_STATUS.length), 1150);
    return () => clearInterval(id);
  }, []);
  return LOADER_STATUS[i];
}

// Score count-up — the number climbs from 0 to the final value once on mount.
function useCountUp(target: number, ms = 1400): number {
  const [v, setV] = useState(prefersReducedMotion() ? target : 0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setV(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ---- states ---- */

// The charge: the Black Bull emerges from the dark and charges toward you while the chain is read.
function PendingResult() {
  const { wallet } = Route.useParams();
  const decoded = useScramble(short(wallet));
  const status = useCyclingStatus();
  const reduced = prefersReducedMotion();

  // Particle configs are generated once, after mount, to avoid any SSR/hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Low arena drone under the charge; fades out when the reveal takes over.
  useEffect(() => startLoadingDrone(), []);

  const streaks = useMemo(
    () =>
      Array.from({ length: 9 }, () => ({
        top: 8 + Math.random() * 84,
        dur: 0.7 + Math.random() * 0.7,
        delay: Math.random() * 1.4,
        w: 60 + Math.random() * 170,
        o: 0.25 + Math.random() * 0.4,
      })),
    [],
  );
  const embers = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: 30 + Math.random() * 40,
        dx: Math.random() * 60 - 30,
        dur: 2.4 + Math.random() * 2.2,
        delay: Math.random() * 3,
        size: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background grain flex flex-col items-center justify-center">
      {/* Arena light — pulses like a heartbeat */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: "radial-gradient(60% 45% at 50% 44%, rgba(216,177,90,0.16), transparent 70%)",
          animation: reduced ? undefined : "bbi-pulse-glow 3.2s ease-in-out infinite",
        }}
      />

      {/* Wind / speed streaks rushing past */}
      {mounted &&
        !reduced &&
        streaks.map((s, i) => (
          <div
            key={i}
            className="animate-rush pointer-events-none absolute"
            style={{
              top: `${s.top}%`,
              left: 0,
              height: 2,
              width: s.w,
              opacity: s.o,
              background: "linear-gradient(90deg, transparent, #f4d78a, transparent)",
              filter: "blur(0.5px)",
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

      {/* The bull — charges in once, then holds a breathing power idle */}
      <motion.div
        className="relative z-[1] will-change-transform"
        initial={reduced ? false : { scale: 0.34, y: 46, opacity: 0, filter: "blur(16px)" }}
        animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: reduced ? 0.5 : 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Dust at the hooves */}
        <div
          className="pointer-events-none absolute left-1/2 bottom-2 h-[150px] w-[440px] -translate-x-1/2 rounded-[50%] blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(216,177,90,0.30), transparent 70%)",
            animation: reduced ? undefined : "bbi-drift 4s ease-in-out infinite alternate",
          }}
        />
        <motion.img
          src={bull}
          alt=""
          className="relative h-[44vh] w-auto object-contain drop-shadow-[0_50px_90px_rgba(0,0,0,0.9)] md:h-[52vh]"
          animate={reduced ? undefined : { scale: [1, 1.035, 1], y: [0, -6, 0] }}
          transition={reduced ? undefined : { duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Rising embers */}
        {mounted &&
          !reduced &&
          embers.map((e, i) => (
            <span
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                bottom: "6%",
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
                background: "#f4d78a",
                boxShadow: "0 0 8px #f4d78a",
                ["--dx" as string]: `${e.dx}px`,
                animation: `bbi-particle ${e.dur}s ease-out ${e.delay}s infinite`,
              }}
            />
          ))}
      </motion.div>

      {/* Kinetic type */}
      <div className="relative z-[2] mt-4 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.45em] text-gold"
        >
          Reading the chain
        </motion.div>
        <div className="mt-4 font-display text-[13vw] leading-[0.9] tracking-[-0.04em] gold-gradient md:text-[6vw]">
          {decoded}
        </div>
        <div className="mt-4 h-4 overflow-hidden">
          <motion.div
            key={status}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45"
          >
            {status}…
          </motion.div>
        </div>
        <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/[0.06]">
          {reduced ? (
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#f4d78a] to-transparent" />
          ) : (
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#f4d78a] to-transparent"
              animate={{ x: ["-130%", "380%"] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function Fault({ message }: { message?: string }) {
  return (
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
        The chain
      </div>
      <p className="mt-8 max-w-md font-display text-[28px] md:text-[36px] leading-tight text-white/80">
        {message ?? "Something broke in the trenches. Refresh and try again."}
      </p>
      <Link
        to="/"
        className="mt-12 inline-flex items-center gap-2 h-11 px-6 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
      >
        <RotateCcw className="h-4 w-4" /> Read another wallet
      </Link>
    </main>
  );
}

/* ---- badges ---- */

function Chip({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className={
        solid
          ? "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] font-medium tracking-wide bg-gradient-to-b from-[#f4d78a] to-[#c8a34a] text-[#1a0f00]"
          : "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] tracking-wide border border-[#d8b15a]/30 bg-[#d8b15a]/[0.06] text-[#e7c877]"
      }
    >
      {children}
    </span>
  );
}

function DataChips({ data }: { data: AnalyzeResult }) {
  const s = data.stats;
  const years = (s.walletAgeDays / 365).toFixed(1);
  return (
    <div className="flex flex-wrap gap-2">
      <Chip>{compact(s.ansemBalance)} $ANSEM</Chip>
      {data.ansemPrice > 0 && <Chip>$ANSEM {fmtPrice(data.ansemPrice)}</Chip>}
      {s.isOgHolder && <Chip solid>OG · PRE-RUN</Chip>}
      {s.receivedAirdrop && s.ansemBalance > 0 && <Chip>STIMMY HELD</Chip>}
      {s.wifBalance > 0 && <Chip>WIF</Chip>}
      {s.bonkBalance > 0 && <Chip>BONK</Chip>}
      {s.solBalance > 0 && <Chip>{s.solBalance.toFixed(2)} SOL</Chip>}
      {s.walletAgeKnown === false ? (
        <Chip>ESTABLISHED</Chip>
      ) : (
        s.walletAgeDays > 365 && <Chip>{years}Y ON-CHAIN</Chip>
      )}
    </div>
  );
}

/* ---- the reveal ---- */

function Reveal({ data }: { data: AnalyzeResult }) {
  const c = data.identity.colour; // grade accent — glow / rings ONLY
  const [roast, setRoast] = useState(data.roast);
  const current = { ...data, roast }; // share card + downloads reflect the live roast
  const score = useCountUp(data.score);

  // The sharer's own X handle, printed on the downloadable cards. Persisted so it's remembered.
  const [handle, setHandle] = useState("");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("bbi-handle") : null;
    if (saved) setHandle(saved);
  }, []);
  const onHandle = (v: string) => {
    const clean = sanitizeHandle(v);
    setHandle(clean);
    if (typeof window !== "undefined") window.localStorage.setItem("bbi-handle", clean);
  };

  // The verdict lands.
  useEffect(() => {
    playCue("impact");
  }, []);

  const beat = (i: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: 0.2 + i * 0.3, ease: EASE },
  });

  const entries = Object.entries(data.breakdown);
  const herdPct = Math.min(100, Math.max(1.5, (data.total / 1_000_000) * 100));

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-clip">
      {/* Impact flash — the charge lands and the verdict arrives (one-time, on mount) */}
      {!prefersReducedMotion() && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(244,215,138,0.55), transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {/* Ambient: constant gold wash + a faint grade-tinted glow (accent only) */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(70% 55% at 50% 12%, rgba(216,177,90,0.10), transparent 70%), radial-gradient(45% 40% at 78% 30%, ${c}22, transparent 70%)`,
        }}
      />

      {/* Bull emblem — the myth, present on the reveal. Grade glow sits behind it. */}
      <div className="pointer-events-none absolute right-[-8%] top-[6%] hidden lg:flex">
        <div
          className="absolute inset-0 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 42%, ${c}33, transparent 62%)` }}
        />
        <img
          src={bull}
          alt=""
          className="relative h-[86vh] w-auto object-contain opacity-[0.55] drop-shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0%, black 42%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 42%)",
          }}
        />
      </div>

      {/* Mobile: the bull sits large behind the content, faded so the copy stays legible. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center lg:hidden">
        <div
          className="absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 40%, ${c}2e, transparent 62%)` }}
        />
        <img
          src={bull}
          alt=""
          className="relative h-[70vh] w-auto object-contain opacity-[0.14] drop-shadow-[0_40px_90px_rgba(0,0,0,0.9)]"
          style={{
            maskImage: "linear-gradient(180deg, black 34%, transparent 82%)",
            WebkitMaskImage: "linear-gradient(180deg, black 34%, transparent 82%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10 py-24 md:py-32">
        <motion.div
          {...beat(0)}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="text-[#d8b15a]">The Black Bull Index · Season 01</span>
          <span>{short(data.wallet)}</span>
        </motion.div>

        <motion.div {...beat(1)} className="mt-10 max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: c }}>
            {data.grade} · {data.identity.scoreRange}
          </div>
          <h1
            className="mt-5 font-display text-[15vw] md:text-[9vw] leading-[0.85] tracking-[-0.05em]"
            style={{
              backgroundImage: GOLD_TEXT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {data.identity.name}
          </h1>
          <p className="mt-6 max-w-xl text-[18px] md:text-[22px] leading-snug text-white/70 font-light italic">
            {data.identity.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span>
              Rank <span className="text-[#e7c877]">#{data.rank}</span> of {data.total}
            </span>
            {data.percentile != null && (
              <span className="text-[#e7c877]">· Top {data.percentile}%</span>
            )}
          </div>
        </motion.div>

        {/* Real on-chain data as collectible badges */}
        <motion.div {...beat(2)} className="mt-8">
          <DataChips data={data} />
        </motion.div>

        <motion.div {...beat(3)} className="mt-14 flex items-end gap-6">
          <div
            className="font-display leading-[0.8] tracking-[-0.05em]"
            style={{
              fontSize: "clamp(90px, 20vw, 220px)",
              backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f4d78a 60%,#b98a2d 112%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {score}
          </div>
          <div className="mb-4 font-mono text-[12px] uppercase tracking-[0.28em] text-muted-foreground">
            / 100
          </div>
        </motion.div>

        <motion.blockquote
          {...beat(4)}
          className="mt-12 max-w-2xl border-l-2 border-[#d8b15a] pl-6 text-[18px] md:text-[20px] leading-relaxed text-white/85 italic font-light"
        >
          {roast}
          <div className="mt-5 not-italic">
            <ReRoastButton wallet={data.wallet} onRoast={setRoast} />
          </div>
        </motion.blockquote>

        <motion.p
          {...beat(5)}
          className="mt-10 max-w-2xl text-[15px] leading-relaxed text-white/50"
        >
          {data.identity.description}
        </motion.p>

        <motion.div {...beat(6)} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card rounded-[24px] p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Score breakdown
            </div>
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="breakdown" className="border-white/[0.06]">
                <AccordionTrigger className="text-white/80">
                  {entries.length} signals · {data.score} pts
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {entries.map(([key, pts]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between text-[13px] text-white/70"
                      >
                        <span>{BREAKDOWN_LABELS[key] ?? key}</span>
                        <span
                          className="font-mono"
                          style={{ color: pts < 0 ? "#D0021B" : "#e7c877" }}
                        >
                          {pts > 0 ? `+${pts}` : pts}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                <span>The herd</span>
                <span>{data.total.toLocaleString()} / 1,000,000 read</span>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${herdPct}%`,
                    background: "linear-gradient(90deg, #b98a2d, #f4d78a)",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Your X handle — printed on the card
              </label>
              <div className="mt-3 flex items-center rounded-full border border-white/[0.1] bg-black/40 px-4 h-11 focus-within:border-[#d8b15a]/50 transition">
                <span className="font-mono text-[14px] text-[#e7c877]">@</span>
                <input
                  value={handle}
                  onChange={(e) => onHandle(e.target.value)}
                  placeholder="yourhandle"
                  aria-label="Your X handle"
                  maxLength={15}
                  className="ml-1 flex-1 bg-transparent font-mono text-[14px] text-white placeholder:text-white/25 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <ShareButton data={current} />
              <DownloadButton data={current} handle={handle} />
              <a
                href={buildImagePath(current, "pfp", handle)}
                download={`black-bull-pfp-${data.grade}.png`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
              >
                <Download className="h-4 w-4" /> PFP
              </a>
              <a
                href={buildImagePath(current, "banner", handle)}
                download={`black-bull-banner-${data.grade}.png`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
              >
                <Download className="h-4 w-4" /> Banner
              </a>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
              >
                <Trophy className="h-4 w-4" /> Leaderboard
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
              >
                <RotateCcw className="h-4 w-4" /> Read another
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// Re-roast: pull a fresh verdict on the same wallet. Bypasses the 24h cache (server-side) so the
// roast reads differently each time — a reason to come back and re-share.
function ReRoastButton({ wallet, onRoast }: { wallet: string; onRoast: (roast: string) => void }) {
  const [busy, setBusy] = useState(false);
  const onClick = async () => {
    setBusy(true);
    try {
      const { roast } = await reroast({ data: { wallet } });
      onRoast(roast);
    } catch (err) {
      console.error("re-roast failed", err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-[#d8b15a]/30 bg-[#d8b15a]/[0.06] text-[12px] uppercase tracking-[0.2em] text-[#e7c877] transition hover:bg-[#d8b15a]/[0.12] disabled:opacity-50"
    >
      <Sparkles className="h-3.5 w-3.5" /> {busy ? "Reading again…" : "Re-roast"}
    </button>
  );
}

// Downloadable animated card (GIF) the user can attach to a tweet as media. Rendered client-side;
// gifenc/canvas are dynamically imported so they stay out of the initial reveal bundle.
function DownloadButton({ data, handle }: { data: AnalyzeResult; handle: string }) {
  const [busy, setBusy] = useState(false);
  const onDownload = async () => {
    setBusy(true);
    try {
      const { downloadAnimatedCard } = await import("@/lib/download-card");
      await downloadAnimatedCard(
        buildOgImagePath(data, handle),
        `black-bull-${data.grade}-${data.wallet.slice(0, 4)}.gif`,
      );
    } catch (err) {
      console.error("download card failed", err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button
      onClick={onDownload}
      disabled={busy}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 transition hover:bg-white/[0.05] disabled:opacity-50"
    >
      <Download className="h-4 w-4" /> {busy ? "Rendering…" : "Download card"}
    </button>
  );
}

function ShareButton({ data }: { data: AnalyzeResult }) {
  const onShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildShareText(data))}&url=${encodeURIComponent(url)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  };
  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 h-11 pl-6 pr-5 rounded-full bg-gradient-to-b from-[#f4d78a] via-[#d8b15a] to-[#b98a2d] text-[#1a0f00] text-[13px] font-medium transition-transform hover:-translate-y-[1px]"
    >
      Share to X <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}
