// Shareable card: a Satori-compatible JSX layout rendered to PNG by the /api/og route via
// @cf-wasm/og. Client-safe — no @cf-wasm/og import here, so buildOgImageUrl / buildShareText /
// buildImagePath can be used from the client without pulling wasm into the bundle.
//
// Design language (Phase 7): black + molten gold is CONSTANT. The Identity name and score always
// render in gold. The grade colour is used ONLY as an ambient glow/ring accent — never as the
// dominant text colour. Every card carries the black-gold bull emblem and the wallet's real
// on-chain data as collectible badges (holdings, live $ANSEM price, OG / WIF / BONK, rank).
import { SITE_URL } from "./constants";
import type { AnalyzeResult } from "./analyze";

// Molten-gold palette (constant across every card).
const GOLD = "#f4d78a";
const GOLD_DEEP = "#b98a2d";
const INK = "#050505";

export interface CardParams {
  name: string; // Identity name, e.g. "THE ARCHITECT"
  grade: string; // "S+"
  score: number; // 0–100
  colour: string; // grade accent hex — used for GLOW ONLY
  wallet: string; // short-hash, e.g. "8vkM…7Cs"
  roast: string; // excerpt
  rank: string; // e.g. "#42 · TOP 3%" (empty string if none)
  isOg: boolean;
  ansem: string; // formatted $ANSEM holdings, e.g. "482K" or "0"
  usd: string; // formatted USD value of holdings, e.g. "$41K" ("" if none)
  price: string; // formatted live $ANSEM price, e.g. "$0.30" ("" if unknown)
  wif: boolean; // holds WIF
  bonk: boolean; // holds BONK
  handle: string; // the sharer's X handle (no @), "" if not provided
  bull?: string; // bull emblem data URI — injected server-side by the image routes only
}

// A collectible data badge (pill).
function Chip({ text, solid }: { text: string; solid?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 21,
        letterSpacing: 1,
        color: solid ? INK : GOLD,
        backgroundColor: solid ? GOLD : "rgba(244,215,138,0.08)",
        border: `1px solid ${solid ? GOLD : "rgba(244,215,138,0.28)"}`,
        borderRadius: 999,
        padding: "6px 16px",
        fontWeight: solid ? 700 : 400,
      }}
    >
      {text}
    </div>
  );
}

function buildChips(p: CardParams) {
  const chips: { text: string; solid?: boolean }[] = [];
  chips.push({ text: `${p.ansem} $ANSEM${p.usd ? ` · ${p.usd}` : ""}` });
  if (p.isOg) chips.push({ text: "OG · PRE-RUN", solid: true });
  if (p.wif) chips.push({ text: "WIF" });
  if (p.bonk) chips.push({ text: "BONK" });
  return chips;
}

// Premium 1200×630 card — the ad that unfurls on X. Satori rule: every div with children needs
// display:flex. The bull sits on the right behind a grade-tinted glow; text stays gold-forward.
export function CardImage(p: CardParams) {
  const { name, grade, score, colour, wallet, roast, rank, isOg, price, handle, bull } = p;
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        backgroundColor: INK,
        color: "#eaeaea",
      }}
    >
      <div
        style={{
          height: 6,
          width: "100%",
          backgroundImage: `linear-gradient(90deg, ${GOLD_DEEP}, ${GOLD}, ${GOLD_DEEP})`,
        }}
      />
      <div style={{ display: "flex", flex: 1 }}>
        {/* Text column — gold-forward */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 730,
            padding: "42px 52px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 20,
              letterSpacing: 3,
              color: "#9a8f77",
            }}
          >
            <div style={{ display: "flex" }}>BLACK BULL INDEX</div>
            <div style={{ display: "flex", color: GOLD }}>
              {price ? `$ANSEM ${price}` : "SEASON 01"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  letterSpacing: 5,
                  color: colour,
                  border: `1px solid ${colour}`,
                  borderRadius: 999,
                  padding: "4px 15px",
                }}
              >
                {grade} · THE INDEX
              </div>
              {isOg ? (
                <div
                  style={{
                    display: "flex",
                    marginLeft: 12,
                    fontSize: 20,
                    letterSpacing: 3,
                    color: INK,
                    backgroundColor: GOLD,
                    borderRadius: 999,
                    padding: "5px 15px",
                    fontWeight: 700,
                  }}
                >
                  OG
                </div>
              ) : null}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 74,
                fontWeight: 800,
                letterSpacing: -2,
                color: GOLD,
                marginTop: 14,
                lineHeight: 1,
              }}
            >
              {name}
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 116,
                  fontWeight: 800,
                  letterSpacing: -5,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                {String(score)}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#7a7a7a",
                  marginLeft: 12,
                  marginBottom: 16,
                }}
              >
                / 100
              </div>
              {rank ? (
                <div
                  style={{
                    display: "flex",
                    fontSize: 22,
                    letterSpacing: 2,
                    color: GOLD,
                    marginLeft: 22,
                    marginBottom: 20,
                  }}
                >
                  {rank}
                </div>
              ) : null}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {buildChips(p).map((c, i) => (
                <Chip key={i} text={c.text} solid={c.solid} />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 620,
              fontSize: 21,
              lineHeight: 1.35,
              color: "#c9c2b4",
            }}
          >
            {roast}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: 2,
              color: "#8a8177",
            }}
          >
            <div style={{ display: "flex", color: handle ? GOLD : "#8a8177" }}>
              {handle ? `@${handle}` : wallet}
            </div>
            <div style={{ display: "flex" }}>blackbullindex.com · @blknoiz06</div>
          </div>
        </div>

        {/* Bull column — grade colour as glow only */}
        <div
          style={{
            display: "flex",
            width: 470,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 470,
              height: 630,
              display: "flex",
              backgroundImage: `radial-gradient(circle at 55% 46%, ${colour}40, transparent 62%)`,
            }}
          />
          {bull ? <img src={bull} width={392} height={490} alt="" /> : null}
        </div>
      </div>
    </div>
  );
}

// 1000×1000 avatar — bull-centric, the grade as a corner badge. Reads at small PFP size.
export function PfpImage(p: CardParams) {
  const { name, grade, score, colour, isOg, rank, bull } = p;
  return (
    <div
      style={{
        width: 1000,
        height: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: INK,
        padding: 54,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          display: "flex",
          backgroundImage: `radial-gradient(circle at 50% 44%, ${colour}44, transparent 60%)`,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          letterSpacing: 6,
          color: "#9a8f77",
        }}
      >
        <div style={{ display: "flex" }}>BLACK BULL INDEX</div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            color: colour,
            border: `1px solid ${colour}`,
            borderRadius: 999,
            padding: "6px 18px",
          }}
        >
          {grade}
          {isOg ? " · OG" : ""}
        </div>
      </div>

      {bull ? <img src={bull} width={432} height={540} alt="" /> : null}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -2,
            color: GOLD,
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            letterSpacing: 4,
            color: "#8a8177",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 700 }}>{score}/100</div>
          {rank ? <div style={{ display: "flex", marginLeft: 14, color: GOLD }}>{rank}</div> : null}
        </div>
      </div>
    </div>
  );
}

// 1500×500 X header banner — bull on the right, gold-forward text on the left.
export function BannerImage(p: CardParams) {
  const { name, grade, score, colour, roast, rank, isOg, price, handle, bull } = p;
  return (
    <div
      style={{
        width: 1500,
        height: 500,
        display: "flex",
        alignItems: "center",
        backgroundColor: INK,
        padding: "0 72px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 760,
          height: 500,
          display: "flex",
          backgroundImage: `radial-gradient(60% 120% at 72% 50%, ${colour}3a, transparent 62%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 4,
            color: "#9a8f77",
          }}
        >
          <div style={{ display: "flex", color: GOLD }}>BLACK BULL INDEX</div>
          <div style={{ display: "flex", marginLeft: 16 }}>
            {price ? `$ANSEM ${price}` : "SEASON 01"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: -3,
            color: GOLD,
            marginTop: 8,
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 10 }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, color: colour }}>
            {grade}
            {isOg ? " · OG" : ""}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#ffffff",
              fontWeight: 700,
              marginLeft: 18,
            }}
          >
            {score}/100
          </div>
          {rank ? (
            <div style={{ display: "flex", fontSize: 24, color: GOLD, marginLeft: 18 }}>{rank}</div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            width: 820,
            fontSize: 22,
            color: "#b8b1a3",
            marginTop: 14,
            lineHeight: 1.3,
          }}
        >
          {roast}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 2,
            color: "#8a8177",
            marginTop: 14,
          }}
        >
          {handle ? `@${handle} · ` : ""}blackbullindex.com · @blknoiz06
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 380,
          height: 500,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {bull ? <img src={bull} width={328} height={410} alt="" /> : null}
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
    ansem: q.get("ansem") ?? "0",
    usd: q.get("usd") ?? "",
    price: q.get("price") ?? "",
    wif: q.get("wif") === "1",
    bonk: q.get("bonk") === "1",
    handle: sanitizeHandle(q.get("handle") ?? ""),
  };
}

// X handles: strip a leading @, keep only [A-Za-z0-9_], cap at 15 chars (X's limit).
export function sanitizeHandle(raw: string): string {
  return raw
    .trim()
    .replace(/^@+/, "")
    .replace(/[^A-Za-z0-9_]/g, "")
    .slice(0, 15);
}

export function buildFallbackSvg(p: CardParams): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${INK}"/><rect width="1200" height="6" fill="${GOLD}"/><text x="72" y="320" font-family="sans-serif" font-size="76" font-weight="700" fill="${GOLD}">${escapeXml(p.name)}</text><text x="72" y="405" font-family="sans-serif" font-size="36" fill="#9a8f77">${escapeXml(p.grade)} · ${p.score}/100 · blackbullindex.com</text></svg>`;
}

const shortWallet = (w: string) => (w.length > 12 ? `${w.slice(0, 4)}…${w.slice(-4)}` : w);

// Compact number formatting for badges: 482000 → "482K", 1500000 → "1.5M".
function compact(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(Math.round(n));
}

// Live $ANSEM price for the ticker chip: sub-cent tokens keep significant digits.
function fmtUsd(v: number): string {
  if (v >= 1) return `$${v.toFixed(2)}`;
  if (v >= 0.01) return `$${v.toFixed(3)}`;
  return `$${v.toPrecision(2)}`;
}

function rankLabel(r: AnalyzeResult): string {
  return `#${r.rank}${r.percentile ? ` · TOP ${r.percentile}%` : ""}`;
}

function ogParams(r: AnalyzeResult, handle = ""): string {
  const holdings = r.stats.ansemBalance;
  const usd = holdings > 0 && r.ansemPrice > 0 ? `$${compact(holdings * r.ansemPrice)}` : "";
  const params = new URLSearchParams({
    name: r.identity.name,
    grade: r.grade,
    score: String(r.score),
    colour: r.identity.colour,
    wallet: shortWallet(r.wallet),
    roast: r.roast.slice(0, 180),
    rank: rankLabel(r),
    og: r.stats.isOgHolder ? "1" : "0",
    ansem: compact(holdings),
    usd,
    price: r.ansemPrice > 0 ? fmtUsd(r.ansemPrice) : "",
    wif: r.stats.wifBalance > 0 ? "1" : "0",
    bonk: r.stats.bonkBalance > 0 ? "1" : "0",
  });
  const clean = sanitizeHandle(handle);
  if (clean) params.set("handle", clean);
  return params.toString();
}

// Absolute URL to the OG card (for crawler-facing share meta).
export function buildOgImageUrl(r: AnalyzeResult, handle = ""): string {
  return `${SITE_URL}/api/og?${ogParams(r, handle)}`;
}

// Same-origin path for a given image route (og card / pfp / banner). Used by the client for the
// animated-card fetch and the PFP/banner download links.
export function buildImagePath(
  r: AnalyzeResult,
  kind: "og" | "pfp" | "banner",
  handle = "",
): string {
  return `/api/${kind}?${ogParams(r, handle)}`;
}

// Same-origin path (for in-browser fetch, e.g. the downloadable animated card).
export function buildOgImagePath(r: AnalyzeResult, handle = ""): string {
  return buildImagePath(r, "og", handle);
}

// Pre-filled X share text — tags @blknoiz06, keeps the Identity/score/rank in the tweet body. Spec §17.
export function buildShareText(r: AnalyzeResult): string {
  const rank = `Ranked #${r.rank}${r.percentile ? ` · top ${r.percentile}%` : ""}.`;
  return `I'm ${r.identity.name} (${r.grade}, ${r.score}/100) on the Black Bull Index.\n${rank}\n\n"${r.identity.tagline}"\n\nRead your wallet @blknoiz06`;
}
