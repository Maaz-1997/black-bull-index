# Black Bull Index — Master Build Plan (Execution Edition)

### blackbullindex.com · Frontend: existing Lovable TanStack Start UI (preserved) · Engine: TanStack Start server functions · Helius · Groq · DexScreener · Satori

> This is the **single source of truth** for what we build and when.
>
> - **Part A** = orientation (read in 5 minutes: what, why, the phase map, where we are now).
> - **Part B** = the numbered, phase-by-phase execution plan. Each phase has a Goal, a numbered
>   task list (Engine / Frontend / Infra), and a Definition of Done.
> - **Part C** = reference appendices (constants, API contracts, exact specs, gap index).
>   Tasks in Part B link to these and to `black-bull-index.md` (the product spec) — so the phases stay
>   readable and the detail lives in one place.
>
> The product spec is **`black-bull-index.md`** (v3.0). It owns all brand copy, the 7 Identities, the
> scoring maths, the roast prompts, and the launch strategy. This build plan owns the ORDER and the
> execution slices; it never restates or overrides the spec's copy or constants — it points into them
> (`→ spec §N`). Where the spec assumes Next.js/Vercel, **the real stack (TanStack Start + Vite) wins**.

---

---

# PART A — ORIENTATION

## A1. TL;DR

Black Bull Index is a **free, cinematic web experience** and a **gift to Ansem (@blknoiz06)**. A user
scrolls a luxury site, pastes any Solana wallet, and gets one of **7 permanent Identity archetypes** +
a personalised AI roast + a shareable card that tags Ansem. The **UI is already built by Lovable** and
we keep it exactly. We build the **engine** (wallet analysis, scoring, roast, OG card) as TanStack
Start server functions and **wire the existing UI to it** — plus the new result/share flow.

Everything runs on **free tiers at ₹0/month**. The whole product is a **viral loop**: every shared
card is an ad for $ANSEM.

## A2. The product in one line + who uses it

> "Every wallet is a memoir written in transactions. We read the chain and reveal who you truly are."

| Actor                 | What they do                                                                           |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Visitor**           | Scrolls the cinematic site, reads the Story/Method/Identities/Grades, pastes a wallet. |
| **Wallet holder**     | Gets a score, an Identity, a roast, an OG card — and shares it (tagging Ansem).        |
| **Ansem / community** | Sees shared cards; F-grade roasts drive curiosity → $ANSEM buys → re-check.            |

There is **no auth, no account, nothing stored.** The "Sign in" button in the Lovable UI is repurposed
as the wallet-paste CTA (spec §5/§25).

## A3. The stack

| Layer              | Choice                                                                                   | Status                           |
| ------------------ | ---------------------------------------------------------------------------------------- | -------------------------------- |
| App framework      | **TanStack Start** on **Vite 8**, TanStack Router (file-based), React 19, TS strict      | **Built (Lovable). Keep as-is.** |
| Styling            | **Tailwind v4** (tokens in `src/styles.css`), shadcn/ui (`components/ui/`)               | Built. Preserve.                 |
| Motion             | **GSAP + ScrollTrigger**, **Framer Motion**, **Lenis** smooth scroll                     | Built. Preserve.                 |
| Server state       | **TanStack Query**                                                                       | Built (wire it)                  |
| Engine             | **TanStack Start server functions** (`createServerFn`) + server routes, Nitro deploy     | To build                         |
| Wallet data        | **Helius** `getAssetsByOwner` (100K credits/mo free)                                     | To build                         |
| Wallet age         | **Solana public RPC** `getSignaturesForAddress`                                          | To build                         |
| Price / holders    | **DexScreener** public API (no auth)                                                     | To build                         |
| Roast LLM          | **Groq** `llama-3.3-70b-versatile` (free ~1K req/day, ~100K tok/day) + template fallback | To build                         |
| OG images          | **Satori** via Workers renderer (`@cf-wasm/og`) 1200×630 static                          | To build                         |
| Rate limiting      | **Cloudflare Workers Rate Limiting binding** (not in-memory)                             | To build                         |
| Package mgr / host | **bun**; **Cloudflare Workers** via Nitro (Lovable vite config already targets it)       | Set up                           |

Full constants + API contracts: `black-bull-index.md` §12/§13/§27–§31 and **Appendix C1/C2** here.

## A4. The phase map (this is the answer to "what phase are we building?")

| Phase  | Name                           | Goal (one line)                                                                                               | Ships           |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------- |
| **P0** | Foundation & content alignment | Constants + types + align the existing UI to the canonical 7 Identities and real section copy — zero redesign | Correct content |
| **P1** | Wallet analysis engine         | `analyze` server fn: Helius fetch → parse → OG/airdrop/age → 0–100 score → grade → Identity                   | The score       |
| **P2** | Roast system                   | Groq roast with few-shot prompt + exact $ values + template fallback + rate limiting                          | The roast       |
| **P3** | Identity reveal page           | `/result/$wallet` — 5-step cinematic reveal, breakdown, roast, 1M progress bar; wire the wallet inputs        | The reveal      |
| **P4** | Share mechanics & OG card      | Satori 1200×630 card + pre-filled X tweet tagging @blknoiz06 + share meta                                     | 🚀 The loop     |
| **P5** | Polish, resilience & launch    | Brand-voice errors, LIVE indicator, mobile, fallback/rate-limit hardening, deploy                             | LAUNCH          |

**Launch model — single release.** P0–P5 ship together as one public launch, then the launch plays in
spec §38 run. The phases are the **internal build order** (you can't reveal a score before you can
compute one), not separate public releases.

## A5. You are here (current build status)

### ✅ Already built by Lovable (preserve)

- ✅ The cinematic landing page: `Nav`, `Hero` (3D bull + scroll timeline), `Story`, `Identities`,
  `GradeReveal`, `Stats`, `Coin`, `Mission`, `CtaFooter`, `Background`, `CustomCursor`.
- ✅ Unused-but-built sections available to wire: `HowItWorks` (Method), `Grades`, `SharePreview`.
- ✅ Full theme/tokens in `styles.css`; TanStack Start SSR + error handling; shadcn/ui set.

### ⬜ Not built yet (this plan)

- ⬜ **Content alignment** — UI shows 5 placeholder archetypes + mismatched grade labels; spec needs 7
  canonical Identities and the real Story/Method copy. Nav anchors `#how` → `#method`.
- ⬜ **The entire engine** — no `lib/constants.ts`, `score.ts`, `helius.ts`, `roast.ts`,
  `roastTemplates.ts`; no `analyze` server fn; no wallet-age/price/airdrop logic.
- ⬜ **The result page** — `/result/$wallet` does not exist; wallet inputs are static and do nothing.
- ⬜ **Share + OG card** — no Satori route, no tweet builder, no per-result share meta.
- ⬜ **Env / keys** — no `.env.local`, no `HELIUS_API_KEY` / `GROQ_API_KEY` wired.

### ⚠️ Pending human actions (do these NOW — they gate the engine)

- ⬜ Create a free **Helius** account → `HELIUS_API_KEY` (P0-I1) — **blocks P1**.
- ⬜ Create a free **Groq** account → `GROQ_API_KEY` (P0-I1) — **blocks P2**.
- ⬜ Cloudflare account + `wrangler`; enable the **Workers Rate Limiting binding** (P5-I1).
- ⬜ Domain + DNS for `blackbullindex.com` on Cloudflare (P5-I2).
- ⬜ Set env vars (`HELIUS_API_KEY`, `GROQ_API_KEY`) as Worker secrets; deploy to Cloudflare Workers (P5-I3).

**Next engineering action:** start **Phase 0** (constants, types, content alignment — no redesign).

## A6. How to read this doc (numbering convention)

- Phases are `P0`–`P5`. Within a phase, task groups are **Engine / Frontend / Infra**.
- Tasks are numbered `P1-E2` (Phase 1, Engine, task 2), `P3-F1` (Phase 3, Frontend, task 1), etc.
- `→ spec §N` = see `black-bull-index.md` section N for the full spec/copy/code.
- `→ Cn` = see Appendix Cn below.
- `[Gxx]` = the gap from A5 the task closes.
- Every phase ends with a **Definition of Done (DoD)** — the ship gate.

## A7. Golden rules (non-negotiable)

1. **Preserve the Lovable UI.** Output stays pixel-identical. We wire data + add the reveal/share flow;
   we never rebuild or restyle. Align DATA, keep MARKUP + motion. → C6
2. **Copy is canonical.** Identity names/taglines/descriptions and section copy come verbatim from the
   spec. Never rephrase brand copy. → spec §6–§9
3. **Constants are frozen.** Mints, weights, thresholds, colours match spec §12 byte-for-byte. → C1
4. **Read-only, zero-permission, nothing stored.** Public on-chain data only. No wallet connect/keys. → C4
5. **Secrets server-side only.** Keys read inside server functions; never in client or `VITE_` vars. → C2
6. **No silent failures, stay on free tier.** Every provider call has a failure path; Groq falls back to
   templates; price is cached; rate-limit guards the quotas. → C3, C5
7. **Protect the loop.** Never ship a reveal without a working share path + correct OG card. → C7
8. **Accessibility + motion respect.** WCAG AA, 44px targets, `prefers-reduced-motion`, no layout shift.
9. **Scope discipline.** Build the current task's slice only. Flag scope creep.
10. **Definition of Done is the gate.** A phase isn't done until its DoD is green and `bun run build` passes.

---

---

# PART B — THE PHASES (what to build, in order)

---

## PHASE 0 — Foundation & Content Alignment

**Goal:** stand up the shared constants/types the engine needs, and correct the existing UI so its
content matches the canonical spec — **with zero visual redesign**. **Depends on:** nothing.

### Infra / external (start on day 1 — these gate later phases)

- **P0-I1** Create free **Helius** and **Groq** accounts; capture `HELIUS_API_KEY` + `GROQ_API_KEY`.
  Add `.env.local` (gitignored) with the vars in spec §11. (Blocks P1/P2.)
- **P0-I2** Confirm env access pattern for TanStack Start server functions on the chosen Nitro target;
  document how server env is read (never `VITE_`). → C2

### Engine (pure, no I/O yet)

- **P0-E1** Create `src/lib/constants.ts` — `ANSEM_MINT`, `WIF_MINT`, `BONK_MINT`, `ANSEM_WALLET`,
  `OG_CUTOFF_DATE`, `SCORE_WEIGHTS`, `GRADE_THRESHOLDS`, `GRADE_LABELS`, `GRADE_COLORS`, `IDENTITIES`,
  `BREAKDOWN_LABELS`. Copy **verbatim** from spec §9/§12/§14.2. → C1
- **P0-E2** Create `src/lib/score.ts` — `WalletStats`, `ScoreResult` interfaces + `calculateScore` +
  `assignGrade`, exactly per spec §14.1. Pure, no I/O. **Unit-test it** (fixtures per grade). [G-engine]
- **P0-E3** Create `src/lib/roastTemplates.ts` — the `TEMPLATE_ROASTS` map (3 per grade) from spec
  §15.3, including the `{ansemBalance}` / `{walletAgeDays}` / `{solBalance}` substitution tokens.

### Frontend (align content — DATA only, keep markup + motion) → C6

- **P0-F1** Fix nav + footer anchors: `#how` → `#method`; ensure `Story | Method | Identities | Grades`
  map to the correct section ids (spec §5). [content]
- **P0-F2** Wire the **Method** section into the page: `HowItWorks` currently isn't rendered in
  `routes/index.tsx`. Add it (id `#method`) and replace its 3 generic steps' copy with the spec's
  Method framing (spec §7). Keep its layout/motion. Decide with the 7-signal grid (P0-F5) which visual
  the section uses — do not build both; follow the spec's Method section §7.
- **P0-F3** Align **Identities** to the canonical **7** archetypes (currently 5 placeholders). Map the
  component over `IDENTITIES` from constants: name, tagline, grade, score range, colour — verbatim
  (spec §9). Keep the horizontal-scroll card design + Framer transforms untouched.
- **P0-F4** Align **GradeReveal** labels/colours to the 7 Identity names (spec §9). Keep the pinned
  scale/blur choreography and the gradient tier styling.
- **P0-F5** Align **Story** copy to the Ansem/Black Bull origin narrative (spec §6) within the existing
  3-chapter cinematic structure — same motion, real copy.
- **P0-F6** Repurpose the wallet input in `CtaFooter` + the `Nav` "Sign in" button as the wallet CTA
  (spec §25): they are UI-only in P0 (no submit yet) but must carry the correct labels/placeholder and
  smooth-scroll to `#grades`. Wiring to analyze lands in P3.

### Definition of Done

- [ ] `bun run build` passes; landing page renders **pixel-identical** except for corrected copy/labels.
- [ ] `Identities`, `GradeReveal`, `Grades` show the exact 7 Identities/colours from `constants.ts`.
- [ ] `score.ts` unit tests pass for representative wallets in each grade band (F→S+).
- [ ] Nav/footer anchors resolve to Story/Method/Identities/Grades; Method section is visible.
- [ ] No `styles.css` token/animation removed; GSAP/Framer/Lenis motion intact.

---

## PHASE 1 — Wallet Analysis Engine

**Goal:** given a valid Solana address, fetch on-chain data and return a real `ScoreResult` (score,
grade, Identity, breakdown) via a server function. **Depends on:** P0, P0-I1.

### Engine

- **P1-E1** `src/lib/helius.ts` — `fetchWalletData(address)`: POST `getAssetsByOwner` (spec §13.1/§28),
  parse `items` + `nativeBalance`, extract ANSEM/WIF/BONK **human-readable** balances (raw ÷ 10^decimals)
  and SOL. Edge-safe `fetch`; typed result; throws a typed error on provider failure. [G-engine]
- **P1-E2** Wallet age: `getSignaturesForAddress` (limit 1) against Solana public RPC (spec §13.4) →
  `walletAgeDays`. RPC down → age unknown (0), scoring proceeds without the age bonus.
- **P1-E3** OG status + airdrop detection: determine `isOgHolder` (first ANSEM activity before
  `OG_CUTOFF_DATE`) and `receivedAirdrop` (ANSEM received from `ANSEM_WALLET`) using Helius history.
  Document the exact method used; if a signal can't be derived reliably, default it to `false` and note
  the limitation — never fake it. → C4
- **P1-E4** Assemble `WalletStats` and call `calculateScore` (from P0-E2) → `ScoreResult`.
- **P1-E5** `analyze` **server function** (`createServerFn`): zod-validate address (base58, 32–44
  chars) → `fetchWalletData` → age/OG/airdrop → score → return typed DTO. Secrets read server-side.
  Invalid address → 400 brand-voice error (spec §22). Provider failure → typed error state. → C2
- **P1-E6** DexScreener price fetch `getAnsemPrice()` (spec §13.2) with ~60s cache; used for the roast
  ($ values) and the 1M progress bar. Failure → 0, degrade gracefully.

### Frontend

- **P1-F1** Add a thin TanStack Query hook (`useAnalyze`) that calls the `analyze` server fn. No UI
  wiring to the reveal yet (that's P3) — this is the data path + a temporary dev harness to verify.

### Definition of Done

- [ ] Calling `analyze` with a real wallet returns a correct `ScoreResult` (verified against manual
      Helius data for at least one wallet per major branch: holder, OG, airdrop-seller, empty).
- [ ] Invalid/garbage addresses return a 400 with a brand-voice message, no provider call.
- [ ] Helius/RPC/DexScreener failures degrade gracefully (typed error / age 0 / price 0), no crash.
- [ ] No secret is present in any client bundle (grep the build output).
- [ ] `bun run build` + `tsc` + `eslint` clean.

---

## PHASE 2 — Roast System

**Goal:** turn a `ScoreResult` + `WalletStats` + price into a brutal, precise, screenshot-worthy roast,
with a template fallback that never fails. **Depends on:** P1, P0-I1.

### Engine

- **P2-E1** `src/lib/roast.ts` — `generateRoast(stats, result, ansemPrice)` per spec §15.1: build the
  few-shot **system prompt** and the **user prompt** (exact ANSEM balance, `$` value, SOL, WIF/BONK,
  OG, airdrop fate, wallet age in years; instruction to end on a quotable line) verbatim. Call Groq
  `llama-3.3-70b-versatile`, `max_tokens` + `temperature` per spec. Trim + validate output.
- **P2-E2** `fallback(grade, stats)` — pick from `TEMPLATE_ROASTS` (P0-E3) and substitute
  `{ansemBalance}` / `{walletAgeDays}` / `{walletAgeYears}` / `{solBalance}`. Used when Groq is down,
  over quota, or returns empty. The roast **always** resolves to real text. → C5
- **P2-E3** Wire the roast into the `analyze` server fn (or a dedicated `roast` server fn called after
  analyze): fetch price (P1-E6) → `generateRoast`. Return roast text in the analyze DTO. → C2
- **P2-E4** **Rate limiting** (spec §32) via the **Cloudflare Workers Rate Limiting binding** (per-IP
  key) guarding the Groq + Helius quotas; over-limit → brand-voice 429 (spec §22). Do **not** use
  in-memory counters — Workers isolates are ephemeral and distributed, so they don't hold state. In
  local dev, stub the binding. → C3

### Definition of Done

- [ ] A live Groq call produces an on-register roast under 100 words with a specific number and a
      screenshot-worthy last line (verified on 3 wallets across tiers).
- [ ] Killing the Groq key / forcing an error falls back to a template roast with correct substitutions.
- [ ] DexScreener-down path yields a roast that omits `$` values gracefully.
- [ ] Rate limit triggers a brand-voice 429; normal use is unaffected.
- [ ] `bun run build` + `tsc` + `eslint` clean.

---

## PHASE 3 — Identity Reveal Page

**Goal:** the payoff — paste a wallet, navigate to a cinematic reveal of the Identity, score, roast,
breakdown, and 1M progress bar. **Depends on:** P2.

### Frontend

- **P3-F1** New route `src/routes/result.$wallet.tsx` — reads the `$wallet` param, calls `analyze` via
  a route loader / TanStack Query, renders the reveal. Handles loading, invalid-address, and
  provider-error states in brand voice (spec §22). Thin route; presentational children.
- **P3-F2** Build the **5-step cinematic reveal sequence** (spec §20) using the existing animation
  vocabulary (GSAP/Framer, gold palette, easing from the Hero/GradeReveal components). Reuse the
  `GradeReveal`/`Coin` visual language so the reveal feels native. Respect `prefers-reduced-motion`.
- **P3-F3** Reveal content: Identity name + score + archetype description (from `IDENTITIES`), the
  personalised roast (italic, atmospheric per spec §2.6), and a **score-breakdown accordion** using
  `BREAKDOWN_LABELS` (shadcn `accordion`). Colour-driven by the Identity colour.
- **P3-F4** **1M holder progress bar** — fetch live $ANSEM holder count (DexScreener, P1-E6) and render
  progress toward 1,000,000 (ties to the `Mission` section's visual language). Degrade if unavailable.
- **P3-F5** Wire the **wallet inputs** (`CtaFooter`, and the `Nav`/hero CTA) to validate then navigate
  to `/result/<wallet>`. Client-side format check first; real validation server-side. Loading + error
  toasts via Sonner in brand voice.

### Definition of Done

- [ ] Pasting a valid wallet navigates to `/result/<wallet>` and reveals the correct Identity, score,
      roast, and breakdown for that wallet.
- [ ] The reveal animation runs at 60fps, matches the site's cinematic language, and respects
      reduced-motion; no layout shift.
- [ ] Loading, invalid-address, and provider-error states all render in brand voice — never a raw error.
- [ ] Progress bar reflects live holder count or degrades cleanly.
- [ ] Landing page still pixel-identical; `bun run build` clean.

---

## PHASE 4 — Share Mechanics & OG Card

**Goal:** close the viral loop — a shareable OG card and a pre-filled tweet that tags @blknoiz06.
**Depends on:** P3.

> **Share reality (verified):** when a result _link_ is posted on X, the preview `og:image` renders
> **static** — X does not animate GIFs in link unfurls. So the guaranteed, always-visible card is a
> **premium static 1200×630 PNG**. Animation only plays if the user _uploads_ media directly — so the
> animated card is a **downloadable MP4/GIF** the user attaches, an enhancement, never the primary path.

### Engine

- **P4-E1** OG image server route (spec §16/§31) — Workers-compatible Satori `ImageResponse`
  (`@cf-wasm/og`) at 1200×630 rendering the Identity name, grade, score, Identity colour, wallet
  short-hash, and a roast excerpt in the **collectible-artifact** style (luxury-bar steering: black +
  molten-gold foil, grain/vignette, edition marks — reuse the `SharePreview`/`Coin` visual language).
  Fonts loaded server-side. Deterministic; on any failure returns a static fallback card (never broken). → C7
- **P4-E2** Per-result share metadata: the `/result/$wallet` route emits OG/Twitter meta
  (`og:image` → the card route, `og:title`, `twitter:card=summary_large_image`) via the route `head()`
  so a shared link unfurls with the card. → spec §16/§17

### Frontend

- **P4-F1** **Share to X** button on the reveal — builds the pre-filled tweet per spec §17 (Identity +
  score + tagline, tags **@blknoiz06**, links back to the result URL). Also a copy-link action. Uses
  `lucide-react` icons + existing button styles.
- **P4-F2** In-page card preview using the existing `SharePreview` component's design, fed the real
  Identity/score/wallet — keep its 3D/foil visuals. This is the on-screen "money shot".

### Enhancement (optional, only after the static path is solid) → C10

- **P4-E3** **Downloadable animated card** (short looping MP4/WebM, GIF fallback) the user can attach to
  their tweet for motion — gold foil sweep + subtle grade shimmer. Weigh the render cost (Workers CPU
  or client-side canvas/WebCodecs capture); do NOT let it block or replace the static card.

### Definition of Done

- [ ] The OG route returns a correct, premium 1200×630 PNG for any grade; forcing an error returns the fallback.
- [ ] Sharing a result on X pre-fills the tweet, tags @blknoiz06, and the link unfurls with the static card.
- [ ] Copy-link works; the in-page card preview shows the real result and looks collectible, not generic.
- [ ] `bun run build` clean; no secret leaks in the OG route.

---

## PHASE 5 — Polish, Resilience & Launch

**Goal:** production hardening + the single launch. **Depends on:** P4.

### Engine / Infra

- **P5-I1** Wire the **Cloudflare Workers Rate Limiting binding** (spec §32) in `wrangler` config;
  confirm limits protect the Helius/Groq quotas under burst. Document the config.
- **P5-I2** Domain + DNS for `blackbullindex.com` on Cloudflare; TLS.
- **P5-I3** Set `HELIUS_API_KEY` / `GROQ_API_KEY` as **Worker secrets**; verify server env is read only
  server-side in production. Deploy to **Cloudflare Workers** via the Nitro build. → spec §34
- **P5-E1** **Fallback system** review (spec §33): confirm every provider-down path (Helius, RPC,
  DexScreener, Groq) degrades to a defined state; confirm quota headroom vs free tiers.

### Frontend

- **P5-F1** **Error states in brand voice** (spec §22) across analyze/reveal/share: invalid address,
  wallet-not-found, provider down, rate-limited, unknown. On-brand, never a raw stack trace.
- **P5-F2** **LIVE · SOLANA indicator** behaviour (spec §23) — make the header indicator reflect real
  liveness (e.g. successful price/holder heartbeat) rather than a static dot.
- **P5-F3** **Mobile responsive pass** (spec §21) — verify all breakpoints for the landing, reveal, and
  share surfaces; 44px targets; the pinned scroll sections behave on touch.
- **P5-F4** Final a11y + performance pass: reduced-motion, focus states, Lighthouse, no layout shift.

### Definition of Done (launch gate)

- [ ] Full happy path works end-to-end in production: scroll → paste → reveal → share → card unfurls.
- [ ] Every failure path renders a brand-voice state; no raw errors anywhere.
- [ ] All secrets set in the deploy target; no secret in any client bundle.
- [ ] Mobile + reduced-motion verified; landing page pixel-identical to Lovable.
- [ ] Free-tier headroom confirmed; rate limiting active. → then run the launch plays in **spec §38**.

---

---

# PART C — REFERENCE APPENDICES

> Detail lives here so Part B stays readable. Most appendices point into `black-bull-index.md`, which
> is canonical — copy from it verbatim, do not paraphrase code or copy.

## C1. Constants (→ spec §9 / §12 / §14.2)

`src/lib/constants.ts` holds, byte-for-byte from the spec:

- Mints: `ANSEM_MINT`, `WIF_MINT`, `BONK_MINT`; `ANSEM_WALLET`; `OG_CUTOFF_DATE` (2026-06-25Z).
- `SCORE_WEIGHTS` (cumulative ANSEM tiers 10/10/15/10; SOL 5; WIF 5; BONK 5; OG 15; loyalAirdrop 10;
  walletAge1year 5; walletAge2years 5; soldAirdropPenalty −15).
- `GRADE_THRESHOLDS` (S+ 90 · S 75 · A 60 · B 45 · C 30 · D 15 · F 0).
- `GRADE_LABELS`, `GRADE_COLORS`, `BREAKDOWN_LABELS`.
- `IDENTITIES` (the 7 archetypes: name, tagline, description, colour, scoreRange). **Never edited.**

## C2. Engine surface — server functions (→ spec §13 / §27)

| Fn / route                  | Input                                            | Returns                                                | Notes                                                                |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------- |
| `analyze` (server fn)       | `{ wallet: string }` (zod: base58 32–44)         | `ScoreResult` + `roast` + `ansemPrice` + `holderCount` | Orchestrates Helius→age→OG/airdrop→score→roast. Secrets server-side. |
| `getAnsemPrice` (server fn) | —                                                | `{ priceUsd, change24h, holders }`                     | ~60s cache. Feeds roast + progress bar.                              |
| `/api/og` (server route)    | `?grade&score&identity&wallet` (or signed token) | `image/png` 1200×630                                   | Satori. Static fallback on error.                                    |

Rules: keys read only inside server fns; validate all input with zod; never return raw provider
payloads; typed error envelope + correct status (400 invalid, 429 rate-limited, 502 provider).

## C3. External providers & free-tier budget

| Provider    | Use                         | Free tier       | Guardrail                                          |
| ----------- | --------------------------- | --------------- | -------------------------------------------------- |
| Helius      | `getAssetsByOwner`, history | 100K credits/mo | 1 call/analyze; rate-limit per IP                  |
| Solana RPC  | wallet age                  | public          | 1 call/analyze; failure → age 0                    |
| DexScreener | price/holders               | no auth         | ~60s cache; failure → 0                            |
| Groq        | roast                       | 6K req/day      | template fallback; rate-limit; `max_tokens` capped |

**Rate limiting:** use the **Cloudflare Workers Rate Limiting binding** keyed per IP (+ optionally per
wallet) on the `analyze` path. In-memory counters are unreliable on Workers (ephemeral, distributed
isolates) — never rely on them. KV/Durable Objects only if persistent/accurate limits are needed later.
Cloudflare Workers free tier is 100K requests/day, well within our loop; Workers CPU allows up to 5 min
per request, so OG rendering has ample headroom (keep it lean anyway).

## C4. Privacy & signal-derivation notes

- Read-only. No wallet connection, no signatures, no keys, nothing persisted about a user.
- `isOgHolder` / `receivedAirdrop`: derive from on-chain history via Helius (spec §4/§13). If a signal
  is not reliably derivable within free-tier calls, default `false` and document the limitation in code
  — do not fabricate. Never invent balances or history.

## C5. Roast system (→ spec §15)

- System prompt = the few-shot version in §15.1 (3 examples + hard rules), verbatim.
- User prompt = the §15.1 field list (Identity, exact balances/`$`, OG, airdrop fate, age in years, the
  end-on-a-quotable-line instruction).
- Price injected per §15.2. Fallback templates per §15.3 with runtime substitutions. Roast never empty.

## C6. Frontend alignment map (align DATA, keep design)

| Component           | Now                      | Align to                                        | Keep                                 |
| ------------------- | ------------------------ | ----------------------------------------------- | ------------------------------------ |
| `Nav` / `CtaFooter` | anchor `#how`, "Sign in" | `#method`; wallet CTA (spec §25)                | layout, motion                       |
| `Identities`        | 5 placeholder archetypes | 7 `IDENTITIES` (spec §9)                        | horizontal scroll, Framer transforms |
| `GradeReveal`       | mismatched labels        | 7 Identity names/colours (spec §9)              | pinned scale/blur timeline           |
| `Story`             | generic chapters         | Ansem origin copy (spec §6)                     | 3-chapter pinned motion              |
| `HowItWorks`        | not rendered, generic    | Method section (spec §7), rendered at `#method` | card layout, motion                  |

## C7. The viral loop (→ spec §16 / §17 / §38)

- OG card (1200×630 **static PNG**) is the ad — exact Identity/grade/score/colour + roast excerpt;
  collectible-artifact styling (luxury-bar steering); deterministic; static fallback on error.
- **X link previews are static** — an animated GIF does NOT animate in an unfurled link
  ([Sygnal OG docs](https://www.sygnal.com/kb/og-image)). Animation only plays when a user _uploads_
  media to the tweet. So: static PNG = guaranteed unfurl; animated MP4/GIF = optional downloadable
  attachment (P4-E3), never the primary card.
- Share tweet tags **@blknoiz06**, includes Identity + tagline + result link. The share path is
  launch-critical: never ship a reveal without it. Launch plays are spec §38.

## C8. Gap index (what this plan closes)

- **[content]** UI copy/labels/anchors → canonical spec copy + 7 Identities (P0-F1..F6).
- **[G-engine]** No scoring/fetch/roast engine → P0-E*, P1-E*, P2-E\*.
- **[reveal]** No result page / static inputs → P3-F\*.
- **[loop]** No OG card / share → P4-\*.
- **[resilience]** No error states / rate limit / fallback hardening → P2-E4, P5-\*.

## C9. Definition of Done (global)

A task is done only when: code matches this plan + the spec (copy verbatim, weights unchanged);
`tsc` + `eslint` + `bun run build` clean; the feature runs and is verified; all edge/failure states
handled in brand voice; the Lovable UI is visually unchanged; the branch is pushable (syncs to Lovable).

## C10. Enhancements & Ambition (opt-in — raise the ceiling without blowing scope)

These make the product feel more powerful and premium. They are **not** in the P0–P5 critical path;
pull one in only after the core loop ships and only when it clears the luxury/anti-slop bar. Each is a
deliberate upgrade, never a generic add-on.

**Reveal & motion**

- **Animated grade count-up** — the score counts 0→N with the existing `Counter`, synced to the reveal
  timeline; the grade numeral ignites in the Identity colour on land.
- **Grade-reactive bull** — the Hero/reveal bull's glow/horns tint to the Identity colour; S+ gets the
  full orbit ring, F gets a void with no ring (mirrors the per-Identity visual notes in spec §9).
- **Optional sound design** — a single low cinematic swell on reveal, muted by default, one toggle.
  Never autoplay audio.

**Depth of the reading (still read-only, nothing stored)**

- **Richer breakdown** — show the top ANSEM-adjacent holdings and the exact signals that moved the
  score, as an editorial "dossier", not a data dump.
- **OG-since / age storytelling** — surface "N days on Solana" and "held since <date>" as narrative
  lines feeding both the reveal and the roast (data already fetched in P1).
- **Live $ANSEM ticker** in the Nav (price + 24h) from the cached DexScreener call — feeds the LIVE
  indicator (P5-F2) with real liveness.

**Share & loop**

- **Downloadable animated card** (P4-E3) — MP4/WebM loop with a gold-foil sweep for users to attach.
- **Multiple card variants** per Identity (portrait for stories, 1:1 for some clients) — same artifact
  system, different crops. Keep the 1200×630 static as canonical.
- **"Read another wallet"** fast path from the reveal to keep the loop spinning.

**Resilience / trust**

- **Post-Inspector-clean meta** — validate the card via X's Post Inspector before launch so every share
  unfurls perfectly on the first try.
- **Deterministic OG cache** — cache rendered cards by result signature (KV/Cache API) to cut Workers
  CPU and guarantee identical cards across shares.

**Rule:** every enhancement must reuse the existing gold/black token + motion vocabulary, pass the
anti-slop self-check, and never compromise read-only/nothing-stored or the free-tier budget. If an idea
would make the app feel generic or "templated," it does not ship.

---

## P5 — Status & remaining deploy-time steps

**Done in-repo (verified: build green, lint clean, 18 tests pass, client bundle secret-free):**

- Lovable fully removed from source + lockfile — standalone `vite.config.ts` (tailwind + tsConfigPaths +
  tanstackStart with `**/server/**` import protection + nitro cloudflare-module + react). 0 `@lovable.dev`
  / `lovable-tagger` entries in `bun.lock`.
- Brand-voice + on-brand styling for the 404, root error boundary, and the raw SSR fallback page.
- Real **LIVE · SOLANA** indicator (heartbeat = successful DexScreener price fetch).
- `prefers-reduced-motion` guard in `styles.css` (neutralises CSS keyframes; GSAP is scroll-linked).
- Fake data purged; analytics/tracking removed; privacy copy accurate; own favicon.

**Remaining — require your accounts / network (cannot be done or verified in-repo):**

1. **Purge the Lovable registry mirror.** `bun.lock` still has 9 `lovable-core-prod` tarball URLs on
   kept packages. On a machine with npmjs access: delete `bun.lock` + `node_modules`, then `bun install`
   (default registry). Re-run `bun run build` to confirm.
2. **PNG share card (P4 finish).** Add `@cf-wasm/og`, then in `src/routes/api/og.tsx` rasterise the SVG
   from `buildCardSvg()` to PNG (`content-type: image/png`). Design/params already match; it's a wrapper
   swap. Needed for guaranteed X link-unfurl.
3. **Cloudflare Workers Rate Limiting binding (P5-I1).** Declare a `ratelimit` binding in the Nitro
   cloudflare config, then swap the in-memory limiter in `src/lib/rate-limit.ts` to call the binding
   (`env.RATE_LIMITER.limit({ key })`). Keep the in-memory path as the local-dev fallback.
4. **Secrets (P5-I3).** `wrangler secret put HELIUS_API_KEY` and `GROQ_API_KEY` (never commit them).
5. **Domain + deploy (P5-I2/I3).** Point `blackbullindex.com` DNS at the Worker; `bun run build` then
   deploy the Nitro output. Confirm the full path: scroll → paste → reveal → share → card unfurls.
6. **QA passes:** mobile breakpoints (spec §21) and X Post-Inspector on a live result URL.

---

---

# PHASE 6 — Persistence, Leaderboard & Distribution

**Goal:** turn the ephemeral tool into a persistent, competitive, shareable index. Store every
analyzed wallet, rank it, show rank/percentile, and expand distribution (PFP/banner + live signals).
**Depends on:** P0–P5. **New infra:** Cloudflare **D1** (free tier).

## Product change (explicit, agreed)

The tool now **stores every analyzed wallet** (public on-chain data) and ranks it publicly. The
"nothing stored" promise is **replaced** with the truthful "**public on-chain data · publicly ranked ·
no wallet connection**". Read-only and zero-permission remain true.

## Rules

- **1 fresh read per wallet per 24h.** A wallet is analyzed at most once/day; repeat requests inside
  24h serve the **stored** result (no Helius/Groq/DexScreener calls). This _is_ the rate limit.
- **Per-IP daily cap** (abuse protection, agreed): a single IP may trigger at most **50 fresh
  analyses/day**. Cached hits do **not** count. Over-cap → brand-voice 429.

## Data model — Cloudflare D1 (SQLite)

```sql
CREATE TABLE wallets (
  address TEXT PRIMARY KEY,
  grade TEXT NOT NULL, score INTEGER NOT NULL, identity TEXT NOT NULL,
  ansem_balance REAL NOT NULL DEFAULT 0, is_og INTEGER NOT NULL DEFAULT 0,
  roast TEXT NOT NULL DEFAULT '', analyzed_at INTEGER NOT NULL
);
CREATE INDEX idx_wallets_score ON wallets(score DESC);
CREATE TABLE ip_usage (ip TEXT NOT NULL, day TEXT NOT NULL, count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, day));
```

Powers: leaderboard (`ORDER BY score DESC`), rank/percentile (`COUNT(*) WHERE score > ?`),
per-wallet 24h cache (`analyzed_at`), per-IP cap (`ip_usage`).

## Access

Read the D1 binding via **`globalThis.__env__?.DB`** (Nitro sets it in cloudflare-module + dev). No
`cloudflare:workers` import. Binding name: **`DB`**. Dev has no `DB` → in-memory fallback store.

## Tasks

- **P6-I1** Provision D1: `wrangler d1 create black-bull-index`; add the binding (name `DB`) to
  `wrangler.toml`; apply `migrations/0001_init.sql`. Deploy-time (needs Cloudflare account).
- **P6-E1** `src/lib/store.ts` — `WalletStore` interface + D1 impl (via `globalThis.__env__.DB`) +
  in-memory fallback. `getWallet / upsertWallet / topWallets / rankFor / bumpIpUsage`. Server-only.
- **P6-E2** Rework `analyze`: cache-or-compute (24h), per-IP cap, upsert, return `rank/total/percentile`.
- **P6-E3** `getLeaderboard` server fn + `/leaderboard` route + on-brand page (filter by Identity).
- **P6-E4** PFP (1000×1000) + banner (1500×500) render routes via `@cf-wasm/og`.
- **P6-F1** Privacy copy swap (truthful public/ranked wording) across hero meta, Stats, CtaFooter, Coin.
- **P6-F2** `/leaderboard` page — rank badges, Identity filter, Solscan links.
- **P6-F3** Reveal: rank/percentile line + rank on the share card + OG badge.
- **P6-F4** Live $ANSEM price in Nav + real holder→1M progress in Mission (Ansem hooks).
- **P6-F5** Download PFP / banner buttons on the reveal.

## Definition of Done

- [ ] Analyzing a wallet stores it and returns a correct rank/percentile; re-analyzing within 24h
      serves the stored result with zero provider calls (verified via in-memory store tests).
- [ ] Per-IP cap blocks the 51st fresh analysis with a brand-voice 429; cached hits don't count.
- [ ] `/leaderboard` renders top wallets, on-brand, with Solscan links.
- [ ] Reveal + share card show rank; live price + holder progress are real.
- [ ] PFP + banner routes return correct-size PNGs; download buttons work.
- [ ] Privacy copy is truthful everywhere; build/lint/tests green; client bundle secret-free.

## Deploy additions (on top of P5)

- Provision D1 + apply migration + bind as `DB`; `wrangler d1` steps documented in P6-I1.
