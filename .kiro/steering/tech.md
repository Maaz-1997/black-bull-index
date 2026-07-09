---
inclusion: always
---

# Tech Stack — Locked

This stack is the one **Lovable chose and shipped**. It is decided and frozen. Do not introduce,
swap, or "upgrade" any of it without an explicit instruction from the user. No drive-by dependency
additions. Note: the product spec (`black-bull-index.md`) mentions Next.js/Vercel — that was the
original assumption. **The real project is TanStack Start on Vite. The real stack below wins.**

## Frontend & app framework (already built — preserve)

- **TanStack Start** (`@tanstack/react-start`) on **Vite 8**, with **TanStack Router** file-based
  routing (`src/routes/`, `routeTree.gen.ts` auto-generated — never hand-edit). SSR entry is wrapped
  by `src/server.ts`; request middleware in `src/start.ts`.
- **React 19** + TypeScript strict.
- **Tailwind CSS v4** via `@tailwindcss/vite` (`@import "tailwindcss"`; tokens/theme live in
  `src/styles.css`). There is **no `tailwind.config.ts`** — do not add one.
- **shadcn/ui** (Radix) primitives in `src/components/ui/`. Feature components in `src/components/bbi/`.
- **Vite config** is `@lovable.dev/vite-tanstack-config` — it already bundles tanstackStart, viteReact,
  tailwindcss, tsConfigPaths, nitro, env injection, and the `@` path alias. **Do not add these plugins
  manually** or the app breaks with duplicate plugins.
- **TanStack Query** for server state. **GSAP + ScrollTrigger**, **Framer Motion**, and **Lenis**
  (smooth scroll via `use-lenis.ts`) drive the cinematic animation — all three stay.
- Fonts: `@fontsource-variable/bricolage-grotesque` (display), `geist-mono` (mono), `inter` (body).
  `lucide-react` is the ONLY icon library. **Sonner** for toasts. `zod` + `react-hook-form` for forms.

## The engine (to build) — TanStack Start server functions / server routes

- **No separate backend service.** All server work runs as TanStack Start **server functions**
  (`createServerFn`) or **API/server routes** — co-located in the app, deployed by Nitro. Do NOT
  scaffold a FastAPI/Express server or reach for Next.js API-route patterns.
- **Deploy target: Cloudflare Workers** (confirmed). TanStack Start runs as a Worker in the workerd
  runtime — a single Worker serves static assets + SSR + server functions + the OG route. (Classic
  "Cloudflare Pages" is being folded into Workers; do not target legacy Pages Functions.) The Lovable
  vite config already builds for Cloudflare via Nitro — do not swap it.
- Keep engine code **edge/worker-safe**: `fetch` + Web APIs only; no Node-only built-ins (`fs`,
  node `crypto`, etc.). OG image generation must use a Workers-compatible renderer (`@cf-wasm/og` /
  `workers-og` style Satori). Workers CPU limit is generous (up to 5 min/request) but keep the OG
  render lean and deterministic.
- Engine modules live in `src/lib/` (`constants.ts`, `score.ts`, `roast.ts`, `roastTemplates.ts`,
  `helius.ts`, etc.). Server functions call them; components never call external APIs directly.

## External services (locked, all free tier)

- **Helius** — Solana wallet token data (`getAssetsByOwner`). Free 100K credits/month.
- **Groq** (`llama-3.3-70b-versatile` via `groq-sdk`) — LLM roasts. Free 6,000 req/day; template
  fallback when unavailable.
- **DexScreener** (public, no auth) — $ANSEM price, volume, holder count for the 1M progress bar.
- **Solana public RPC** (`api.mainnet-beta.solana.com`) — wallet age via oldest signature.
- **Satori** (via a Workers-compatible `ImageResponse` renderer, e.g. `@cf-wasm/og`) — shareable OG cards.
- **Rate limiting** — the **Cloudflare Workers Rate Limiting binding** (per-key, simple) is the default
  for this free tool. Naive in-memory counters do NOT work on Workers (ephemeral, distributed isolates).
  Use KV or a Durable Object only if accurate/persistent limits are needed later.

## Hard rules

- TypeScript `strict` on. **No `any`, no `@ts-ignore`** without a one-line justification comment.
- **All secrets via env** — `HELIUS_API_KEY`, `GROQ_API_KEY`, etc. Read them **only inside server
  functions**, never in client components or `VITE_`-prefixed vars. Never hardcode keys or tokens.
- Token mints, scoring weights, grade thresholds, and the Identities map are **constants** in
  `src/lib/constants.ts`, matching `black-bull-index.md` §12 exactly. Never fork these values.
- Match existing libraries/versions. If you think a new dependency is needed, **propose it first**
  with a one-line reason; do not install silently. `bun` is the package manager (`bun.lock`).
