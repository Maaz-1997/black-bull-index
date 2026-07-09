---
inclusion: always
---

# The Luxury Bar & No-Trace-of-Vibecode Contract

This product is a **public gift to a well-known trader and his community**. It will be screenshotted,
shared, and judged in under two seconds on a hostile X timeline. **Nothing may betray that it was
built with an AI tool.** "Vibecoded" is a visible smell now — there is even a Collins Word-of-the-Year
term for it and public detectors for it. Our bar: it must read as the work of a senior design-engineer
who obsessed over every pixel. Craft over speed, always.

## The AI-slop fingerprint — BANNED (every one of these is an instant tell)

Recent design writing converges on the same giveaways of AI-generated UI — avoid all of them
([Business Insider, 2026](https://www.businessinsider.com/ai-coded-app-user-interface-experience-design-2026-7);
[utsubo: 12 trust signals](https://www.utsubo.com/blog/built-with-ai-trust-signals-2026);
[why every AI site looks the same](https://alan-west.hashnode.dev/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500)):

- **Purple/indigo-to-blue gradients** or `bg-indigo-500`-style accents. Our palette is **black + molten
  gold** only (spec §2.5) — never introduce a stock accent hue.
- **Default Inter/system sans for display.** We use **Bricolage Grotesque** (display) + **Geist Mono**
  (labels) + Inter for body only. Display type must be large, tracked, editorial.
- **Three equal cards in a row**, uniform border-radius everywhere, glassmorphism panels, drop shadows
  at ~0.1 opacity. Vary rhythm, hierarchy, and depth deliberately; reuse the existing `bbi/*` language.
- **Oversized headline + vague filler copy** ("Empower your workflow"). Our copy is the spec's exact
  cinematic lines — specific, authored, never generic marketing mush.
- **Center-everything, evenly-spaced, no focal point.** Compose with intent: asymmetry, negative space,
  a clear protagonist (the bull, the grade, the Identity).
- **Generic micro-interactions** or none. Motion here is choreographed (GSAP/Framer/Lenis) and is a
  feature, not decoration.
- **Emoji in UI, hashtag soup, "🚀/✨" energy.** The register is luxury editorial, not a Discord post.

## The positive standard — every surface must earn "premium"

- **Design tokens are law.** Colours, type scale, spacing, radius, shadow, and gold treatments come from
  `src/styles.css` + the `bbi/*` components (`gold-foil`, `gold-shimmer`, `gold-gradient`, `.glass-card`,
  `.hairline`, the `bbi-*` keyframes). Never hardcode a value that duplicates a token. New surfaces reuse
  this exact vocabulary so they feel native, not bolted on.
- **Cinematic motion, respected.** 60fps, GPU-friendly transforms, no layout shift, `prefers-reduced-
motion` honored. Every state transition (load → reveal → share) is deliberately timed with the site's
  easing. No janky spinners — use themed skeletons and the reveal choreography.
- **Typography does the heavy lifting.** Tight tracking on display, generous line-height on body, mono
  for labels/meta. Real hierarchy, not just size bumps.
- **Detail obsession.** Pixel-aligned edges, considered empty/error/loading states, tactile hover/press/
  focus, consistent optical spacing. The result reveal and the share card are the money shots — treat
  them like a product launch keyframe, not a form.
- **Copy is authored, not autofilled.** Use the spec's verbatim lines; never invent placeholder text.

## The share card — the single most important pixel

It is the ad. It gets seen more than the site. It must look like a **collectible artifact**, not a
generated meme:

- Deep black canvas, molten-gold foil treatment (reuse `SharePreview`/`Coin` visual language), the
  Identity name as hero, the grade as a monumental numeral, the wallet short-hash, a roast excerpt set
  in italic, subtle grain/vignette, season/edition marks. Per-Identity colour accent (spec §9).
- **1200×630** for link unfurl (static — see the hosting/share notes in the build plan; X does not
  animate `og:image`). Deterministic render, static fallback on error, never a broken image.
- Optional **downloadable animated card** (MP4/GIF) for users to attach as media — treat as a premium
  enhancement, not a substitute for the static card.

## The self-check before "done"

1. If a designer glanced at this for two seconds, would they say "senior studio" or "AI builder"?
2. Any purple gradient, default Inter display, generic 3-card row, or 0.1-opacity shadow slop? Remove it.
3. Does every new surface reuse the existing gold/black tokens and motion vocabulary exactly?
4. Is the copy the spec's authored lines, never filler?
5. Would this card make someone stop scrolling and screenshot it?
   If any answer disappoints, it is not done. **This must never look vibecoded.**
