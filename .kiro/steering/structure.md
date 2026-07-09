---
inclusion: always
---

# Project Structure & Conventions

## Repo layout

```
src/
  routes/                 TanStack Router file-based routes (thin)
    __root.tsx            app shell — wraps every page; preserve <Outlet />, head meta
    index.tsx             the cinematic landing page (composes bbi/* sections)
    result.$wallet.tsx    Identity reveal (dynamic route — to build)
    api/                  server routes (og image, etc. — to build)
  components/
    bbi/                  feature components (Hero, Story, Identities, GradeReveal, ...) — the site
    ui/                   shadcn primitives — do not edit unless told
  hooks/                  use-lenis, use-mobile, ...
  lib/
    constants.ts          mints, scoring weights, grade thresholds, IDENTITIES (to build) — §12
    score.ts              calculateScore + assignGrade (to build) — §14
    helius.ts             wallet fetch + parse (to build) — §13.1/§28
    roast.ts              Groq roast generator + fallback (to build) — §15
    roastTemplates.ts     template roasts per grade (to build) — §15.3
    utils.ts              cn() and shared helpers
    error-*.ts            SSR error capture/rendering — leave as-is
  server/ (or lib/)       server functions (createServerFn) — analyze, price, og data
  styles.css              Tailwind v4 theme — single source of design tokens
  router.tsx, server.ts, start.ts   TanStack Start wiring — leave as-is unless told
docs/build-plan.md        the execution plan (Part A/B/C)
black-bull-index.md       the product spec (feature + copy + constants reference)
```

## Frontend conventions (preserve the Lovable UI)

- **Routes are thin.** A route reads params → calls a server function (via a TanStack Query hook or
  route loader) → renders presentational `bbi/*` components. No external API calls inside route files.
- **Components stay dumb + preserved.** `bbi/*` components own the visual design. When wiring data,
  pass typed props/callbacks — do not restyle, re-layout, or delete GSAP/Framer/Lenis animation.
- **One source of styling truth.** Use existing tokens/classes from `styles.css` and the `bbi/*`
  components. Never hardcode a hex/shadow/size that duplicates a token. Brand colours are the exact
  hexes in `black-bull-index.md` §2.5 and the per-Identity colours in §9.
- **Content lives in constants, not scattered strings.** Identity names, taglines, descriptions, and
  section copy come from `black-bull-index.md` §6–§9 → mirrored in `lib/constants.ts`. When aligning
  the existing 5-card / mismatched-grade components to the canonical 7 Identities, change the DATA
  they map over, keep the MARKUP and motion.
- File names: components `PascalCase.tsx`, hooks `use-kebab.ts`, route files per TanStack conventions
  (`$param`, `_layout`, `__root` — see `src/routes/README.md`). `routeTree.gen.ts` is generated.

## Engine conventions (server functions)

- Layering: **route/server-fn** (input validation with zod, orchestration) → **`lib/` logic**
  (pure scoring, parsing, prompt building) → **external fetchers** (`helius.ts`, price, RPC).
  Pure logic (`score.ts`) must have no I/O so it stays testable.
- Secrets and external `fetch` calls live **only** in server functions / server routes. A client
  component must never see `HELIUS_API_KEY` or `GROQ_API_KEY`.
- One zod schema per server-fn input; validate the wallet address (base58, 32–44 chars) before any
  external call. Return typed DTOs (`ScoreResult`, roast string) — never leak raw provider payloads.
- Every external call has a failure path: Helius down → error state; Groq down/over-quota → template
  fallback; DexScreener down → omit dollar values gracefully. No silent failures.

## Where does this go?

- Reusable UI → `components/ui/`. Site sections/visuals → `components/bbi/`. Pure logic + constants →
  `lib/`. External fetching + secrets → server functions. Never call Helius/Groq from a component.
- New API contract or endpoint? Match `black-bull-index.md` §13/§27; if you add one, note it in the
  build plan appendix in the same change.
