---
inclusion: fileMatch
fileMatchPattern: ["src/lib/**", "src/server/**", "src/routes/api/**", "**/*.server.ts"]
---

# Engine Rules (TanStack Start server functions · Helius · Groq · scoring · OG)

## Where server code runs

- All external calls and secrets run in **TanStack Start server functions** (`createServerFn`) or
  server/API routes — never in a client component. Deployed by Nitro to an edge/worker runtime, so
  code must be **edge-safe**: use `fetch` and Web APIs; avoid Node-only built-ins (`fs`, `crypto`
  node APIs, etc.) unless a documented polyfill exists.
- Read secrets (`HELIUS_API_KEY`, `GROQ_API_KEY`) from server env only. Never expose them to the
  client or via a `VITE_` variable.

## Layering (strict)

- **server-fn / route** → validate input (zod: wallet is base58, 32–44 chars), orchestrate, return a
  typed DTO. No business logic beyond orchestration.
- **`lib/` pure logic** → `score.ts` (`calculateScore`, `assignGrade`), prompt building, parsing.
  Pure, no I/O, deterministic, unit-testable. This is where spec §14 lives, verbatim.
- **fetchers** → `helius.ts`, price fetch, RPC fetch, `roast.ts` (Groq). Each isolates one provider.
- Never return a raw Helius/Groq/DexScreener payload to the client — map to `WalletStats` /
  `ScoreResult` / roast string first (spec §14 interfaces).

## Correctness — match the spec exactly

- Constants (`ANSEM_MINT`, `WIF_MINT`, `BONK_MINT`, `ANSEM_WALLET`, `OG_CUTOFF_DATE`, `SCORE_WEIGHTS`,
  `GRADE_THRESHOLDS`, `GRADE_LABELS`, `GRADE_COLORS`, `IDENTITIES`) live in `constants.ts` and match
  `black-bull-index.md` §9/§12 **byte-for-byte**. Never fork or "adjust" a weight, threshold, or colour.
- Scoring is cumulative-tier per §14.1; clamp 0–100; grade via descending thresholds. Balances are
  human-readable (raw ÷ 10^decimals), not raw.
- The roast: build the Groq system + user prompt exactly per §15.1 (few-shot register, exact dollar
  values, screenshot-worthy last line). Inject the live ANSEM price (§15.2). `max_tokens` and
  `temperature` per spec.

## Failure paths (no silent failures, stay on free tier)

- **Invalid address** → 400 + brand-voice message (§22); never call a provider.
- **Helius down/error** → surface a brand-voice error state; do not fake a score.
- **Groq down / over quota / empty** → `fallback(grade, stats)` template roast (§15.1/§15.3). The roast
  must always resolve to real text.
- **DexScreener down** → price 0; roast omits dollar value gracefully; progress bar degrades.
- **Wallet-age RPC down** → treat age as unknown/0; scoring proceeds without the age bonus.
- Cache the ANSEM price (≈60s) to avoid hammering DexScreener. Add rate limiting per §32 (in-memory or
  KV) so a single client can't burn the Helius/Groq quota.

## OG card image

- Generate the shareable card server-side via an edge-compatible Satori renderer (spec §16/§31),
  1200×630, exact Identity name / grade / score / colour / roast excerpt. Fonts loaded server-side.
- The card is the ad. It must render deterministically and never throw — on any failure, return a
  static fallback card rather than a broken image.

## Quality bar

- `tsc` + `eslint` clean, full type hints, no `any`. Consistent typed error envelope + correct HTTP
  status. No `console.log`; no commented-out code. Write unit tests for `score.ts` (the pure core).
- Every new server function / contract matches `black-bull-index.md` §13/§27; if you add one, note it
  in the build-plan appendix in the same change.
