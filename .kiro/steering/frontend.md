---
inclusion: fileMatch
fileMatchPattern: ["**/*.tsx", "src/routes/**", "src/components/**", "src/styles.css"]
---

# Frontend Rules (TanStack Start / React 19 / Tailwind v4)

## Preserve the Lovable UI — this is the prime directive

- The rendered output must stay **pixel-for-pixel identical** to what Lovable shipped. You are wiring
  data and adding the result/share flow, not redesigning. The theme, landing page, and cinematic
  motion are locked and better than anything we'd rebuild.
- Never delete or alter design tokens/animation rules in `src/styles.css` (e.g. `gold-foil`,
  `gold-shimmer`, `gold-gradient`, `bbi-*` keyframes, `.glass-card`, `.hairline`).
- Never restyle a section "while you're there." If a change risks a visual diff, stop and confirm.
- Reuse `components/ui/` (shadcn) and existing `components/bbi/` patterns. Don't reinvent a Button/Card.
- GSAP ScrollTrigger + Framer Motion + Lenis choreography stays. Don't swap animation libs or rip out
  pinning/scrub timelines. Respect `prefers-reduced-motion`.

## Architecture

- Routes (`src/routes/*.tsx`) are thin: read params → call a server function via a TanStack Query hook
  or route loader → render `bbi/*` components → show a skeleton/loading state that fits the theme. No
  external API calls, no secrets, no business logic in route files.
- `bbi/*` components are presentational: typed props + callbacks, no fetching. Keep their markup and
  motion; feed them real data in place of the current hardcoded arrays.
- Client/shared state stays local (props, small hooks). Don't add a global store unless the plan says so.
- `routeTree.gen.ts` is generated — never hand-edit. New routes follow `src/routes/README.md`
  (`$param`, `_layout`). Head/meta go through the route `head()` (see `__root.tsx`).

## Content is canonical — align data, not design

- Identity names, taglines, descriptions, score ranges, colours, and section copy come from
  `black-bull-index.md` §6–§9 (mirrored in `lib/constants.ts`). Use them **verbatim**.
- The existing `Identities`/`GradeReveal`/`Grades` components use placeholder archetypes and only 5
  cards — when the plan says to align them, change the DATA to the canonical 7 Identities and keep the
  markup + motion. Nav anchors and section labels must match the spec (`#story #method #identities #grades`).

## Quality bar

- TypeScript strict; no `any`; props and server-fn return types fully modeled. Zod validates inputs.
- Every data view handles **loading, empty, error, and invalid-address** states in brand voice
  (spec §22) — never just the happy path, never a raw error.
- Accessibility: semantic HTML, `aria-label` on icon buttons, keyboard + focus management, 44px tap
  targets, no layout shift (reserve space; use skeletons). Mobile breakpoints per spec §21.
- No `console.log` left behind. No unused imports. Run `eslint` + `tsc` before declaring done.

## The reveal & share surfaces (new work)

- The `/result/$wallet` reveal follows the 5-step cinematic sequence (spec §20) using the existing
  animation vocabulary — same tokens, same easing, same gold palette. It must feel native to the site.
- The share button builds the pre-filled tweet tagging @blknoiz06 (spec §17) and the OG card must be
  the exact Identity/score/roast. Never ship a reveal without a working share path.
