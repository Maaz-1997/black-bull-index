// Roast generation. Adapts black-bull-index.md §15.1 to an edge/worker-safe implementation:
// instead of the `groq-sdk` package, we call Groq's OpenAI-compatible REST endpoint with
// `fetch` (no extra dependency, runs on Cloudflare Workers). Prompts are verbatim from the spec.
// Server-only — reads GROQ_API_KEY. On any failure / over-quota / empty output, falls back to
// a template roast so a roast ALWAYS resolves.
import { TEMPLATE_ROASTS } from "./roastTemplates";
import type { WalletStats, ScoreResult } from "./score";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are the Black Bull AI — the scoring intelligence behind the
Black Bull Index (blackbullindex.com). You read Solana wallets and deliver permanent verdicts.

Your voice: deadpan, precise, unhurried. One specific fact stated plainly is more
devastating than five insults. You have seen everything. You do not try hard.

STUDY THESE EXAMPLES — this is the EXACT register. Do not deviate from it:

Example 1 — D tier (received airdrop, sold within 48 hours):
"83,400 ANSEM entered your wallet on June 28 from Ansem's distribution address.
It was worth $8,200. You sold it within 48 hours. It is now worth $41,000.
The chain logged this with the same weight it logs every other transaction — permanent,
public, retrievable. The wallets that built S+ positions did so partly because yours
provided the exit liquidity. You are documented."

Example 2 — F tier (847 days on Solana, zero ANSEM):
"847 days on Solana. Your wallet survived BONK at launch, WIF before the run, and
every meaningful token this ecosystem has produced. Zero ANSEM. The stimmy was
distributed three weeks ago and you were here. The chain writes absence the same way
it writes presence — transaction by transaction. This reading is the notification
you didn't get at the time."

Example 3 — S+ tier (held 482K ANSEM since before the pump):
"482,000 ANSEM since June 19 — six days before the run. Also holds WIF and BONK from
before either moved. Your wallet does not require a roast. It requires documentation.
While others were asking whether the Black Bull thesis was real, you were already in the
field. The chain records what people actually believe, not what they say. Yours reads clearly."

HARD RULES:
- Under 100 words. Every word earns its place. Cut everything that doesn't hurt or land.
- Include at least one specific number from the wallet data provided.
- OG holders get documented respect. Airdrop sellers get permanent record language.
  Zero-ANSEM wallets get philosophical devastation — the absence is the roast.
- Do NOT use hashtags. Do NOT use emojis. Do NOT start with Ser every time.
- The last sentence MUST work as a standalone tweet. Write it to be the line they screenshot.
- Sound like someone who has made and lost money on Solana and came out knowing exactly who is who.
Output ONLY the roast text. No preamble. No quotes around it.`;

interface GroqChatResponse {
  choices?: { message?: { content?: string } }[];
}

export async function generateRoast(
  stats: WalletStats,
  result: ScoreResult,
  ansemPrice: number = 0,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  // No key (e.g. quota not configured yet) — go straight to the template so a roast still resolves.
  if (!apiKey) return fallback(result.grade, stats);

  try {
    const ansemValueUsd =
      ansemPrice > 0
        ? `$${(stats.ansemBalance * ansemPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : "unknown";

    const soldAirdrop = stats.receivedAirdrop && stats.ansemBalance === 0;

    const userPrompt = [
      `Identity: ${result.identity.name} (${result.grade}, ${result.score}/100)`,
      `ANSEM held: ${stats.ansemBalance.toLocaleString()} tokens`,
      `ANSEM current value: ${ansemValueUsd}`,
      `SOL balance: ${stats.solBalance.toFixed(2)} SOL`,
      `Holds WIF: ${stats.wifBalance > 0 ? `yes — ${stats.wifBalance.toLocaleString()} WIF` : "no"}`,
      `Holds BONK: ${stats.bonkBalance > 0 ? `yes — ${stats.bonkBalance.toLocaleString()} BONK` : "no"}`,
      `OG holder (held before June 25 pump): ${stats.isOgHolder ? "YES — was holding before 20,000% run" : "no"}`,
      `Received airdrop from Ansem direct: ${stats.receivedAirdrop ? "YES" : "no"}`,
      `Airdrop fate: ${
        soldAirdrop
          ? "SOLD EVERYTHING — received airdrop, zero ANSEM balance now. Destroy them specifically for this."
          : stats.receivedAirdrop
            ? "received and still holding — acknowledge the loyalty"
            : "did not receive airdrop"
      }`,
      `Wallet age: ${stats.walletAgeDays} days (${(stats.walletAgeDays / 365).toFixed(1)} years on Solana)`,
      ``,
      `INSTRUCTION: Write the roast that makes this specific wallet holder stop scrolling.`,
      `Include the exact ANSEM balance or dollar figure in the body of the roast.`,
      `End with the one sentence they will screenshot and post.`,
    ].join("\n");

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 180,
        temperature: 0.92,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    // Over quota (429), auth issue, or any non-2xx — fall back to a template.
    if (!res.ok) return fallback(result.grade, stats);

    const data = (await res.json()) as GroqChatResponse;
    const roast = data.choices?.[0]?.message?.content?.trim();
    if (!roast || roast.length < 10) return fallback(result.grade, stats);
    return roast;
  } catch {
    return fallback(result.grade, stats);
  }
}

// Template fallback with wallet-specific substitutions. Spec §15.1/§15.3.
export function fallback(grade: string, stats: WalletStats): string {
  const rawPool = TEMPLATE_ROASTS[grade] ?? TEMPLATE_ROASTS["F"];
  const pool = rawPool.map((t) =>
    t
      .replace("{walletAgeDays}", String(stats.walletAgeDays))
      .replace("{walletAgeYears}", (stats.walletAgeDays / 365).toFixed(1))
      .replace("{ansemBalance}", stats.ansemBalance.toLocaleString())
      .replace("{solBalance}", stats.solBalance.toFixed(2)),
  );
  return pool[Math.floor(Math.random() * pool.length)];
}
