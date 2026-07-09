// Shareable card: a Satori-compatible JSX layout rendered to PNG by the /api/og route via
// @cf-wasm/og. Client-safe — no @cf-wasm/og import here, so buildOgImageUrl / buildShareText /
// buildOgImagePath can be used from the client without pulling wasm into the bundle.
import { SITE_URL } from "./constants";
import type { AnalyzeResult } from "./analyze";

export interface CardParams {
  name: string; // Identity name, e.g. "THE ARCHITECT"
  grade: string; // "S+"
  score: number; // 0–100
  colour: string; // accent hex, e.g. "#F5A623"
  wallet: string; // short-hash, e.g. "8vkM…7Cs"
  roast: string; // excerpt
  rank: string; // e.g. "#42 · Top 3%" (empty string if none)
  isOg: boolean;
}

// Premium 1200×630 card. Satori rule: every div with children needs display:flex.
export function CardImage({ name, grade, score, colour, wallet, roast, rank, isOg }: CardParams) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#050505",
        color: "#eaeaea",
      }}
    >
      <div
        style={{
          height: 8,
          width: "100%",
          backgroundImage: "linear-gradient(90deg,#b98a2d,#f4d78a,#b98a2d)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 64,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            color: "#9a9a9a",
          }}
        >
          <div style={{ display: "flex" }}>BLACK BULL INDEX</div>
          <div style={{ display: "flex" }}>LIVE · SOLANA</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: colour }}>
            {grade} · READING
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: -2,
                color: colour,
              }}
            >
              {name}
            </div>
            {isOg ? (
              <div
                style={{
                  display: "flex",
                  marginLeft: 22,
                  fontSize: 22,
                  letterSpacing: 4,
                  color: "#f4d78a",
                  border: "2px solid #b98a2d",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                OG
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                fontSize: 150,
                fontWeight: 800,
                letterSpacing: -4,
                color: colour,
              }}
            >
              {String(score)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#7a7a7a",
                marginLeft: 16,
                marginBottom: 26,
              }}
            >
              / 100
            </div>
          </div>
          {rank ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 4,
                color: "#9a9a9a",
                marginTop: 10,
              }}
            >
              {rank}
            </div>
          ) : null}
          <div
            style={{ display: "flex", width: 1040, fontSize: 28, color: "#d0d0d0", marginTop: 24 }}
          >
            {roast}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex" }}>{wallet}</div>
          <div style={{ display: "flex" }}>blackbullindex.com · @blknoiz06</div>
        </div>
      </div>
    </div>
  );
}

// 1000×1000 avatar — the grade as an iconic badge. Reads at small PFP size.
export function PfpImage({ name, grade, score, colour, isOg }: CardParams) {
  return (
    <div
      style={{
        width: 1000,
        height: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          display: "flex",
          backgroundImage: `radial-gradient(circle at 50% 42%, ${colour}33, transparent 60%)`,
        }}
      />
      <div style={{ display: "flex", fontSize: 30, letterSpacing: 12, color: "#8a8a8a" }}>
        BLACK BULL INDEX
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 460,
          fontWeight: 800,
          letterSpacing: -12,
          color: colour,
          lineHeight: 1,
        }}
      >
        {grade}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: -2,
          color: "#eaeaea",
        }}
      >
        {name}
      </div>
      <div
        style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#8a8a8a", marginTop: 20 }}
      >
        {score}/100{isOg ? " · OG" : ""}
      </div>
    </div>
  );
}

// 1500×500 X header banner.
export function BannerImage({ name, grade, score, colour, roast, rank, isOg }: CardParams) {
  return (
    <div
      style={{
        width: 1500,
        height: 500,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#050505",
        padding: 80,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 500,
          display: "flex",
          backgroundImage: `radial-gradient(60% 120% at 20% 50%, ${colour}22, transparent 60%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: colour }}>
          {grade} · READING{isOg ? " · OG" : ""}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -3,
            color: colour,
            marginTop: 6,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", width: 900, fontSize: 26, color: "#b8b8b8", marginTop: 16 }}>
          {roast}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 3,
            color: "#8a8a8a",
            marginTop: 20,
          }}
        >
          blackbullindex.com · @blknoiz06
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div
          style={{
            display: "flex",
            fontSize: 220,
            fontWeight: 800,
            letterSpacing: -8,
            color: colour,
            lineHeight: 1,
          }}
        >
          {String(score)}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            color: "#8a8a8a",
            marginTop: 8,
          }}
        >
          / 100{rank ? ` · ${rank}` : ""}
        </div>
      </div>
    </div>
  );
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function parseCardParams(q: URLSearchParams): CardParams {
  return {
    name: q.get("name") ?? "THE BLACK BULL",
    grade: q.get("grade") ?? "",
    score: Number(q.get("score") ?? 0),
    colour: q.get("colour") ?? "#F5A623",
    wallet: q.get("wallet") ?? "blackbullindex.com",
    roast: (q.get("roast") ?? "Every wallet is a memoir written in transactions.").slice(0, 180),
    rank: q.get("rank") ?? "",
    isOg: q.get("og") === "1",
  };
}

export function buildFallbackSvg(p: CardParams): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#050505"/><rect width="1200" height="8" fill="#d8b15a"/><text x="80" y="330" font-family="sans-serif" font-size="80" font-weight="700" fill="${p.colour}">${escapeXml(p.name)}</text><text x="80" y="420" font-family="sans-serif" font-size="38" fill="#8a8a8a">${escapeXml(p.grade)} · ${p.score}/100 · blackbullindex.com</text></svg>`;
}

const shortWallet = (w: string) => (w.length > 12 ? `${w.slice(0, 4)}…${w.slice(-4)}` : w);

function rankLabel(r: AnalyzeResult): string {
  return `#${r.rank}${r.percentile ? ` · Top ${r.percentile}%` : ""}`;
}

function ogParams(r: AnalyzeResult): string {
  return new URLSearchParams({
    name: r.identity.name,
    grade: r.grade,
    score: String(r.score),
    colour: r.identity.colour,
    wallet: shortWallet(r.wallet),
    roast: r.roast.slice(0, 180),
    rank: rankLabel(r),
    og: r.stats.isOgHolder ? "1" : "0",
  }).toString();
}

// Absolute URL to the OG card (for crawler-facing share meta).
export function buildOgImageUrl(r: AnalyzeResult): string {
  return `${SITE_URL}/api/og?${ogParams(r)}`;
}

// Same-origin path for a given image route (og card / pfp / banner). Used by the client for the
// animated-card fetch and the PFP/banner download links.
export function buildImagePath(r: AnalyzeResult, kind: "og" | "pfp" | "banner"): string {
  return `/api/${kind}?${ogParams(r)}`;
}

// Same-origin path (for in-browser fetch, e.g. the downloadable animated card).
export function buildOgImagePath(r: AnalyzeResult): string {
  return buildImagePath(r, "og");
}

// Pre-filled X share text — tags @blknoiz06, keeps the Identity/score/rank in the tweet body. Spec §17.
export function buildShareText(r: AnalyzeResult): string {
  const rank = `Ranked #${r.rank}${r.percentile ? ` · top ${r.percentile}%` : ""}.`;
  return `I'm ${r.identity.name} (${r.grade}, ${r.score}/100) on the Black Bull Index.\n${rank}\n\n"${r.identity.tagline}"\n\nRead your wallet @blknoiz06`;
}
