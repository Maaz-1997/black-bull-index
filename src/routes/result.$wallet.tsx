import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, RotateCcw, Download, Trophy } from "lucide-react";
import { analyze, type AnalyzeResult } from "@/lib/analyze";
import { BREAKDOWN_LABELS } from "@/lib/constants";
import { buildOgImageUrl, buildOgImagePath, buildImagePath, buildShareText } from "@/lib/og-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
  errorComponent: ({ error }) => (
    <Fault message={error instanceof Error ? error.message : undefined} />
  ),
  component: ResultPage,
});

function ResultPage() {
  return <Reveal data={Route.useLoaderData()} />;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const short = (w: string) => (w.length > 12 ? `${w.slice(0, 4)}…${w.slice(-4)}` : w);

/* ---- states ---- */

function PendingResult() {
  const { wallet } = Route.useParams();
  return (
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
        Reading the chain
      </div>
      <div className="mt-6 font-display text-[13vw] md:text-[7vw] leading-[0.9] tracking-[-0.04em] gold-shimmer">
        {short(wallet)}
      </div>
      <div className="mt-10 h-px w-40 overflow-hidden bg-white/[0.06]">
        <div className="h-full w-1/2 animate-[bbi-pulse-glow_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#d8b15a] to-transparent" />
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

/* ---- the reveal ---- */

function Reveal({ data }: { data: AnalyzeResult }) {
  const c = data.identity.colour;
  const beat = (i: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: 0.2 + i * 0.35, ease: EASE },
  });

  const entries = Object.entries(data.breakdown);
  const herdPct = Math.min(100, Math.max(1.5, (data.total / 1_000_000) * 100));

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-clip">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{ background: `radial-gradient(60% 50% at 50% 22%, ${c}22, transparent 70%)` }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10 py-24 md:py-32">
        <motion.div
          {...beat(0)}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span>The Black Bull Index · Reading</span>
          <span>{short(data.wallet)}</span>
        </motion.div>

        <motion.div {...beat(1)} className="mt-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: c }}>
            {data.grade} · {data.identity.scoreRange}
          </div>
          <h1
            className="mt-5 font-display text-[15vw] md:text-[9vw] leading-[0.85] tracking-[-0.05em]"
            style={{ color: c }}
          >
            {data.identity.name}
          </h1>
          <p className="mt-6 max-w-xl text-[18px] md:text-[22px] leading-snug text-white/70 font-light italic">
            {data.identity.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span>
              Rank <span style={{ color: c }}>#{data.rank}</span> of {data.total}
            </span>
            {data.percentile != null && <span>· Top {data.percentile}%</span>}
            {data.stats.isOgHolder && <span className="text-gold">· OG · held before the run</span>}
          </div>
        </motion.div>

        <motion.div {...beat(2)} className="mt-16 flex items-end gap-6">
          <div
            className="font-display leading-[0.8] tracking-[-0.05em]"
            style={{
              fontSize: "clamp(90px, 20vw, 220px)",
              background: `linear-gradient(180deg, #ffffff 0%, ${c} 62%, #050505 112%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {data.score}
          </div>
          <div className="mb-4 font-mono text-[12px] uppercase tracking-[0.28em] text-muted-foreground">
            / 100
          </div>
        </motion.div>

        <motion.blockquote
          {...beat(3)}
          className="mt-14 max-w-2xl border-l-2 pl-6 text-[18px] md:text-[20px] leading-relaxed text-white/80 italic font-light"
          style={{ borderColor: c }}
        >
          {data.roast}
        </motion.blockquote>

        <motion.p
          {...beat(4)}
          className="mt-10 max-w-2xl text-[15px] leading-relaxed text-white/50"
        >
          {data.identity.description}
        </motion.p>

        <motion.div {...beat(5)} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
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
                        <span className="font-mono" style={{ color: pts < 0 ? "#D0021B" : c }}>
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

            <div className="flex flex-wrap gap-3">
              <ShareButton data={data} />
              <DownloadButton data={data} />
              <a
                href={buildImagePath(data, "pfp")}
                download={`black-bull-pfp-${data.grade}.png`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.05] transition"
              >
                <Download className="h-4 w-4" /> PFP
              </a>
              <a
                href={buildImagePath(data, "banner")}
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

// Downloadable animated card (GIF) the user can attach to a tweet as media. Rendered client-side;
// gifenc/canvas are dynamically imported so they stay out of the initial reveal bundle.
function DownloadButton({ data }: { data: AnalyzeResult }) {
  const [busy, setBusy] = useState(false);
  const onDownload = async () => {
    setBusy(true);
    try {
      const { downloadAnimatedCard } = await import("@/lib/download-card");
      await downloadAnimatedCard(
        buildOgImagePath(data),
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
