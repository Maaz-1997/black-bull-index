# Black Bull Index

## Product Specification v3.0

**Project:** Gift to Ansem (@blknoiz06) — The Black Bull ($ANSEM) community tool  
**Owner:** Whereto Studios  
**Stack:** Next.js 15 · Framer Motion · Helius · Groq · Satori · Vercel  
**Monthly cost:** ₹0 (fully free tier)  
**Target build time:** 5–6 days (expanded from v1.0 for full site architecture)  
**Domain suggestion:** `blackbullindex.xyz` or `blackbull.index` or `degengrade.xyz`  
**Tagline:** "Every wallet is a memoir written in transactions. We read the chain and reveal who you truly are."

> **v2.0 changes from v1.0:** Brand renamed to Black Bull Index. 9 gaps from UI review filled:
> Identities archetypes, site copy (Story/Method/Grades), wallet input decision, grade reveal
> animation, 3D bull asset plan, scroll animation spec, mobile breakpoints, brand-voice error
> states, LIVE indicator behavior.
>
> **v3.0 changes from v2.0:** Roast system overhauled — Groq system prompt rewritten with
> few-shot examples, exact dollar values injected into every roast, all 7 template tiers
> rewritten for maximum shareability. New Section 38: Launch Strategy — 5 plays with
> exact post copy to get Ansem's eyes on the product.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Brand Identity & Positioning](#2-brand-identity--positioning)
3. [Why This Gets Ansem's Attention](#3-why-this-gets-ansems-attention)
4. [User Flow — End to End](#4-user-flow--end-to-end)
5. [Site Architecture — 4 Sections](#5-site-architecture--4-sections)
6. [Section Copy — Story](#6-section-copy--story)
7. [Section Copy — Method](#7-section-copy--method)
8. [Section Copy — Grades Gallery](#8-section-copy--grades-gallery)
9. [The 7 Identities — Full Archetypes](#9-the-7-identities--full-archetypes)
10. [Tech Stack — All Free](#10-tech-stack--all-free)
11. [Environment Variables](#11-environment-variables)
12. [Token Addresses & Constants](#12-token-addresses--constants)
13. [API Integrations](#13-api-integrations)
14. [Scoring System](#14-scoring-system)
15. [Roast System — LLM + Templates](#15-roast-system--llm--templates)
16. [OG Card Image Spec](#16-og-card-image-spec)
17. [Viral Share Mechanics](#17-viral-share-mechanics)
18. [UI / UX Specification](#18-ui--ux-specification)
19. [Scroll Animation Spec — Framer Motion](#19-scroll-animation-spec--framer-motion)
20. [Grade Reveal Animation Sequence](#20-grade-reveal-animation-sequence)
21. [Mobile Responsive Spec](#21-mobile-responsive-spec)
22. [Error States — Brand Voice](#22-error-states--brand-voice)
23. [LIVE · SOLANA Indicator](#23-live--solana-indicator)
24. [Hero Asset — 3D Bull Sourcing](#24-hero-asset--3d-bull-sourcing)
25. [Wallet Input Decision](#25-wallet-input-decision)
26. [File Structure](#26-file-structure)
27. [Full Code — API Routes](#27-full-code--api-routes)
28. [Full Code — Helius Wallet Fetcher](#28-full-code--helius-wallet-fetcher)
29. [Full Code — Scoring Logic](#29-full-code--scoring-logic)
30. [Full Code — Roast Generator](#30-full-code--roast-generator)
31. [Full Code — OG Image Route](#31-full-code--og-image-route)
32. [Rate Limiting Strategy](#32-rate-limiting-strategy)
33. [Fallback System](#33-fallback-system)
34. [Deployment — Vercel](#34-deployment--vercel)
35. [Build Milestones](#35-build-milestones)
36. [Embedded Features](#36-embedded-features)
37. [Future Enhancements — v3](#37-future-enhancements--v3)
38. [Launch Strategy — 5 Plays to Get Ansem's Eyes On It](#38-launch-strategy--5-plays-to-get-ansems-eyes-on-it)
39. [Appendix A — Key Resources](#appendix-a--key-resources)
40. [Appendix B — ANSEM Token Facts](#appendix-b--ansem-token-facts)

---

## 1. Product Overview

**Black Bull Index** is a free, cinematic web experience that reads a Solana wallet address
and assigns one of 7 permanent archetypes — Identities — based on the wallet's $ANSEM
holdings, OG status, loyalty record, and broader Solana degen portfolio.

The tool is built in three layers:

- **The surface:** A scroll-driven cinematic site with a 3D black-gold bull, atmospheric
  typography, and four narrative sections (Story / Method / Identities / Grades)
- **The engine:** Helius wallet analysis + Groq LLM roast generation + 0–100 scoring
  algorithm — all on free tiers, zero monthly cost
- **The loop:** Every Identity card shared on X tags @blknoiz06. Every F-grade wallet
  that shares their roast is an ad for $ANSEM. Every person who wants to move from
  Tourist to Architect has to buy more ANSEM and re-check.

**Core loop:**

```
User arrives → scrolls through site → pastes wallet → score calculated →
Identity revealed → roast delivered → OG card generated → shared to X →
10 new people click the link to check their own Identity
```

---

## 2. Brand Identity & Positioning

### 2.1 Name

**Black Bull Index** — not "Degen Report Card." The word "Index" implies authority,
permanence, and data — this is not a toy, it is a classification system.

### 2.2 Tagline

> "Every wallet is a memoir written in transactions. We read the chain and reveal who you truly are."

Use verbatim throughout the site. Never truncate or rephrase.

### 2.3 Secondary lines (use in subheadings and meta)

- "READ THE CHAIN. REVEAL THE MYTH." (top right corner — already in Lovable UI)
- "AWAKENING" (top left watermark — already in Lovable UI, keep it)
- "SCROLL TO ENTER" (hero CTA, already correct)
- "LIVE · SOLANA" (header indicator — see Section 23)

### 2.4 Voice

- Cinematic, unhurried, authoritative
- Not memey, not try-hard crypto slang in the site copy
- The ROAST uses crypto slang (ngmi, trenches, degen) — but the SITE COPY does not
- Think: a luxury editorial about crypto culture, not a Discord announcement

### 2.5 Colour palette

| Token  | Hex       | Use                                 |
| ------ | --------- | ----------------------------------- |
| Black  | `#0A0A0A` | Background — all pages              |
| Gold   | `#F5A623` | S+ tier, primary accent, bull horns |
| Amber  | `#E8941A` | S tier, secondary accent            |
| White  | `#FFFFFF` | Primary text (large display)        |
| Muted  | `#555555` | Labels, captions, meta              |
| Ghost  | `#1A1A1A` | Card backgrounds                    |
| Border | `#2A2A2A` | Subtle dividers                     |

### 2.6 Typography

- Display (hero text "THE BLACK BULL"): bold serif or heavy sans, ~10–14vw
- Section titles: uppercase, tracked, ~2.5rem
- Body: clean sans-serif, 16px, line-height 1.7
- Labels: 11px, letter-spacing 0.15em, uppercase, muted
- Roast text: italic, 18–20px, slightly dimmed white

### 2.7 Logo mark

Top left: `◻ Black Bull Index` — the small square icon + wordmark. Keep as-is from Lovable.

---

## 3. Why This Gets Ansem's Attention

- Ansem (@blknoiz06) is a Georgia Tech CS grad and ex-software engineer. A well-built
  technical gift with real on-chain data is the kind of thing he notices.
- His stated mission: 25,000 → 1,000,000 $ANSEM holders. Every person who checks their
  Identity and shares it is a new node in that campaign.
- The site is built entirely around his narrative — the Black Bull myth, the trenches,
  the stimmy, the OG holders.
- Every shared card tags @blknoiz06 directly in the tweet. 100 shares = he sees it.
- The F-grade roast ("You have not yet encountered the Black Bull") drives curiosity
  and token buying more than any ad could.
- Gift framing: "No monetisation. No token. Just a chain reader built for the community."

---

## 4. User Flow — End to End

```
[Hero — THE BLACK BULL full screen]
    │ scroll
    ▼
[Story section — who Ansem is, what the Black Bull represents]
    │ scroll
    ▼
[Method section — how the Index scores wallets, visualised]
    │ scroll
    ▼
[Grades Gallery — all 7 Identities previewed with name + colour]
    │ scroll / click any Identity card
    ▼
[Wallet input section — paste address CTA]
    │ submit
    ▼
[POST /api/analyze]
    ├── Validate Solana address (base58, 32–44 chars)
    ├── Fetch tokens via Helius getAssetsByOwner
    ├── Extract: ANSEM balance, WIF, BONK, SOL balance
    ├── Check OG status (first ANSEM tx before Jun 25 2026)
    ├── Check airdrop receipt (received from Ansem's wallet)
    ├── Calculate score (0–100)
    ├── Assign grade (F → S+) → map to Identity archetype
    └── Call Groq (or fallback template) for roast
    │
    ▼
[Identity reveal — /result/[wallet]]
    ├── 5-step cinematic animation sequence (see Section 20)
    ├── Identity name + score + archetype description
    ├── Personalised Groq roast (italic, atmospheric)
    ├── Score breakdown accordion
    ├── OG card preview (1200×630)
    ├── Live $ANSEM holder count — 1M progress bar
    └── Share to X button (pre-filled tweet)
    │
    ▼
[/api/og — Satori PNG]
    └── Returns Identity card as shareable PNG image
```

---

## 5. Site Architecture — 4 Sections

The site is a single scrollable page with four named sections matching the nav:
`Story | Method | Identities | Grades`

```
/                          ← full scrollable landing
/result/[wallet]           ← Identity reveal (dynamic route)
/api/analyze               ← POST: wallet → score + roast + identity
/api/og                    ← GET: Satori OG card image
```

**Nav items and their anchor targets:**

| Nav label  | Anchor        | Purpose                                  |
| ---------- | ------------- | ---------------------------------------- |
| Story      | `#story`      | The Ansem/Black Bull origin narrative    |
| Method     | `#method`     | Visual explanation of the scoring system |
| Identities | `#identities` | Gallery of all 7 archetypes              |
| Grades     | `#grades`     | Wallet input + "find your grade" CTA     |

The `Sign in` button in the current Lovable UI → repurpose as the wallet paste CTA.
On click: smooth scroll to `#grades` section. No actual auth flow. (See Section 25.)

---

## 6. Section Copy — Story

**Section label (small caps, above heading):** `ORIGIN`  
**Section heading:** `The Black Bull Is Not a Token`  
**Subheading:** `It is a record. Of who was early. Of who held. Of who understood.`

**Body copy (3 paragraphs):**

> In June 2026, Ansem — one of Solana's most respected traders and researchers — deployed a
> token on Pump.fun with a single thesis: that the people who built this ecosystem deserve
> to share in its upside. He called it the Black Bull. He held 60% of the supply. And then
> he started giving the rest away.

> Every week, creator fees from the token flow back to the community. Not to insiders.
> Not to a DAO that never votes. To the wallets in the trenches — the early buyers, the
> faithful holders, the people who sent the RT and posted the wallet address in a thread
> at 2am because they believed in the mission.

> The Black Bull Index exists to read that history. To look at a wallet and say: were you
> there? Did you hold? Do you belong to this story? Your transactions are already written.
> We just read them back to you.

**End of section CTA (small, muted):** `SCROLL TO READ THE CHAIN ↓`

---

## 7. Section Copy — Method

**Section label:** `METHODOLOGY`  
**Section heading:** `How We Read the Chain`  
**Subheading:** `Seven signals. One Identity. No guessing.`

Display the scoring factors as a visual grid — 7 cards, each factor a card with its
weight. Copy per card:

| Factor card | Display label   | Weight shown | Description                                                                          |
| ----------- | --------------- | ------------ | ------------------------------------------------------------------------------------ |
| 1           | ANSEM Held      | Up to 45 pts | "How much of the Black Bull you carry. Any is a start. A million is a statement."    |
| 2           | OG Status       | 15 pts       | "Were you here before June 25? Before the run? Before the world noticed?"            |
| 3           | Airdrop Loyalty | 10 pts       | "Did Ansem send you a stimmy — and did you keep it?"                                 |
| 4           | Solana Presence | 5 pts        | "Do you actually live on this chain? SOL in the wallet, proof you're not a tourist." |
| 5           | WIF Holder      | 5 pts        | "Were you early to Dogwifhat? Ecosystem credibility has a record."                   |
| 6           | BONK Holder     | 5 pts        | "Did you hold BONK through the noise? The chain remembers."                          |
| 7           | Wallet Age      | Up to 10 pts | "How long has this wallet existed? Experience leaves a trace."                       |

**Penalty note (small, below grid):**

> One signal works against you: receiving an airdrop from Ansem's wallet and then selling
> everything. The Index deducts 15 points. The chain does not forget.

**Section footer line:** `Every score is derived entirely from public on-chain data. No wallet connection. No permissions. Read-only.`

---

## 8. Section Copy — Grades Gallery

**Section label:** `THE INDEX`  
**Section heading:** `Seven Identities. One Chain.`  
**Subheading:** `Which one is yours?`

Display all 7 Identity cards in a horizontal scroll or 3+4 grid.
Each card shows: Identity name, score range, colour bar, one-line summary.
Cards are clickable — clicking one smooth-scrolls to `#grades` and pre-labels
what that Identity means.

**Scroll CTA below the gallery:**

> Your wallet already knows. Paste the address and we'll read it.

**Input label above the wallet field:**

> Enter any Solana wallet address — no connection required.

**Submit button text:** `Read the Chain →`

**Note below the input (small, muted):**

> Read-only. We fetch public on-chain data only. Nothing is stored.

---

## 9. The 7 Identities — Full Archetypes

This is the creative core of the product. Every user gets one of these seven permanent
archetypes. The Identity replaces the generic grade label from v1.0.

---

### Identity 1 — THE ARCHITECT

**Grade:** S+ **Score:** 90–100 **Colour:** `#F5A623` (Gold)

**One-line:** You didn't just buy the token. You built a position.

**Archetype description (shown on result page below the Identity name):**

> The Architect was in the trenches before the run, understood the thesis before the thread
> went viral, and held through every paper-hand moment that shook out the noise. Your wallet
> is not a portfolio — it is an argument. A documented case that you read the signal, trusted
> the builder, and committed. The Black Bull Index has no higher classification. The Architect
> is where the story ends for those who got everything right.

**Visual identity:**

- Gold (#F5A623) primary glow
- Full orbit ring visible, sharp and bright
- OG badge always shown if applicable
- Card texture: faint geometric grid pattern

**Roast tone:** Deep respect, almost reverential. One line of acknowledgment, then silence.

---

### Identity 2 — THE FAITHFUL

**Grade:** S **Score:** 75–89 **Colour:** `#E8941A` (Amber)

**One-line:** You gave trust before it was obvious. That counts.

**Archetype description:**

> The Faithful didn't need every signal to line up before committing. Something clicked —
> the thread, the chart, the reputation — and you acted. Your ANSEM position is real, your
> Solana credentials are solid, and your wallet reflects a level of conviction that most
> people talk about and few actually demonstrate. The difference between The Faithful and
> The Architect is usually time. You are not far.

**Visual identity:**

- Amber (#E8941A) warm glow
- Orbit ring slightly dimmer than Architect
- Card texture: soft gradient

**Roast tone:** Genuine respect with a single push — "you're almost there."

---

### Identity 3 — THE CONVERT

**Grade:** A **Score:** 60–74 **Colour:** `#7ED321` (Green)

**One-line:** You weren't first. But you understood. That's not nothing.

**Archetype description:**

> The Convert saw the signal and overcame the hesitation. Maybe you came in after the first
> run. Maybe you took a week to decide. It doesn't matter — you made the move, you built a
> real position, and your wallet now tells a coherent story. The Convert is the engine of
> every meaningful bull run: the person with good instincts who finally trusts them. The
> only thing between your current Identity and the next tier is conviction and time.

**Visual identity:**

- Green (#7ED321) clean accent
- Sharp card edges, no blur
- Minimal glow — earned, not excessive

**Roast tone:** Warm acknowledgment, ends with a clear push to do more.

---

### Identity 4 — THE CURIOUS

**Grade:** B **Score:** 45–59 **Colour:** `#4A90E2` (Blue)

**One-line:** You found your way to the trenches. You're just not sure you want to stay.

**Archetype description:**

> The Curious has good instincts but hasn't committed to them. Your ANSEM position exists —
> cautious, considered, perhaps a little hedged. You're in the right ecosystem, you've heard
> the right signals, and something keeps you here. But your wallet reads like a question
> rather than an answer. The trenches don't reward the undecided. Pick a side, anon. The
> chain is watching.

**Visual identity:**

- Blue (#4A90E2) — cool, slightly detached
- Orbit ring slightly blurred at the edges
- Card: slight desaturation

**Roast tone:** Neutral observation, neither harsh nor kind. A mirror, not a judgment.

---

### Identity 5 — THE TOURIST

**Grade:** C **Score:** 30–44 **Colour:** `#9B9B9B` (Grey)

**One-line:** You arrived. You looked around. You bought just enough to say you were here.

**Archetype description:**

> The Tourist is not a bad actor — just an undecided one. You hold some ANSEM. Not enough
> to matter if it runs, but enough to remember that you were technically present. You've
> seen the trenches from a safe distance. The Black Bull Index does not judge curiosity.
> But it does ask: at some point, are you visiting, or are you staying? That answer lives
> in your next transaction.

**Visual identity:**

- Grey (#9B9B9B) — faded, desaturated
- Card texture: very faint, washed out
- Orbit ring barely visible

**Roast tone:** Dry condescension with a crack of warmth at the end. Not cruel.

---

### Identity 6 — THE GHOST

**Grade:** D **Score:** 15–29 **Colour:** `#D0021B` (Red)

**One-line:** The airdrop landed. You were there. Then you weren't.

**Archetype description:**

> The Ghost received what many wallets didn't — a direct stimmy from the Black Bull's
> wallet. Free money, placed in your hands by someone who believed in distribution. And
> then it was gone. Not stolen. Sold. The Ghost doesn't mean to miss — they just always
> seem to be somewhere else when the thing actually happens. Your on-chain record is now
> a permanent document of that decision. The chain does not forget. But it does allow
> new chapters.

**Visual identity:**

- Dark red (#D0021B) — warning, not rage
- Card nearly transparent, spectral feel
- Orbit ring broken or incomplete

**Roast tone:** Brutal but not sadistic. The destruction is specific: you had it, you sold it.

---

### Identity 7 — THE UNAWAKENED

**Grade:** F **Score:** 0–14 **Colour:** `#8B0000` (Deep Crimson)

**One-line:** You have not yet encountered the Black Bull. This is your introduction.

**Archetype description:**

> The Unawakened is not a failure. It is a starting point. Your wallet exists on Solana —
> perhaps it holds things, perhaps it has history — but it has not yet crossed paths with
> the Black Bull. You have not been in the trenches during a stimmy. You have not held
> through a dump. You have not yet made the decision that defines every other Identity on
> this Index. That decision is still available to you. Every S+ wallet was once empty.
> The question is what you do with this reading.

**Visual identity:**

- Deep crimson (#8B0000) — ancient, heavy
- Background nearly black, card barely distinguishable from void
- No orbit ring — it hasn't formed yet

**Roast tone:** Not angry. Philosophical. The roast treats them as someone who simply hasn't
begun yet — which is arguably more unsettling than being called out.

---

### Identity Constants (for code)

```typescript
// /lib/constants.ts — add to existing file

export const IDENTITIES: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    colour: string;
    scoreRange: string;
  }
> = {
  "S+": {
    name: "THE ARCHITECT",
    tagline: "You didn't just buy the token. You built a position.",
    description:
      "The Architect was in the trenches before the run, understood the thesis before the thread went viral, and held through every paper-hand moment that shook out the noise. Your wallet is not a portfolio — it is an argument. A documented case that you read the signal, trusted the builder, and committed. The Black Bull Index has no higher classification.",
    colour: "#F5A623",
    scoreRange: "90–100",
  },
  S: {
    name: "THE FAITHFUL",
    tagline: "You gave trust before it was obvious. That counts.",
    description:
      "The Faithful didn't need every signal to line up before committing. Something clicked — the thread, the chart, the reputation — and you acted. Your ANSEM position is real, your Solana credentials are solid, and your wallet reflects a level of conviction that most people talk about and few actually demonstrate. You are not far from the top.",
    colour: "#E8941A",
    scoreRange: "75–89",
  },
  A: {
    name: "THE CONVERT",
    tagline: "You weren't first. But you understood. That's not nothing.",
    description:
      "The Convert saw the signal and overcame the hesitation. You made the move, you built a real position, and your wallet now tells a coherent story. The Convert is the engine of every meaningful bull run: the person with good instincts who finally trusts them. The only thing between your current Identity and the next tier is conviction and time.",
    colour: "#7ED321",
    scoreRange: "60–74",
  },
  B: {
    name: "THE CURIOUS",
    tagline: "You found your way to the trenches. You're just not sure you want to stay.",
    description:
      "The Curious has good instincts but hasn't committed to them. Your ANSEM position exists — cautious, considered, perhaps a little hedged. Your wallet reads like a question rather than an answer. The trenches don't reward the undecided. Pick a side, anon. The chain is watching.",
    colour: "#4A90E2",
    scoreRange: "45–59",
  },
  C: {
    name: "THE TOURIST",
    tagline: "You arrived. You looked around. You bought just enough to say you were here.",
    description:
      "The Tourist is not a bad actor — just an undecided one. You hold some ANSEM. Not enough to matter if it runs, but enough to remember that you were technically present. The Black Bull Index does not judge curiosity. But it does ask: at some point, are you visiting, or are you staying?",
    colour: "#9B9B9B",
    scoreRange: "30–44",
  },
  D: {
    name: "THE GHOST",
    tagline: "The airdrop landed. You were there. Then you weren't.",
    description:
      "The Ghost received what many wallets didn't — a direct stimmy from the Black Bull's wallet. And then it was gone. Not stolen. Sold. The Ghost doesn't mean to miss — they just always seem to be somewhere else when the thing actually happens. Your on-chain record is now a permanent document of that decision.",
    colour: "#D0021B",
    scoreRange: "15–29",
  },
  F: {
    name: "THE UNAWAKENED",
    tagline: "You have not yet encountered the Black Bull. This is your introduction.",
    description:
      "The Unawakened is not a failure. It is a starting point. Your wallet has not yet crossed paths with the Black Bull. You have not been in the trenches during a stimmy. You have not yet made the decision that defines every other Identity on this Index. That decision is still available to you. Every S+ wallet was once empty.",
    colour: "#8B0000",
    scoreRange: "0–14",
  },
};
```

---

## 10. Tech Stack — All Free

| Layer         | Tool                           | Free Tier          | Notes                             |
| ------------- | ------------------------------ | ------------------ | --------------------------------- |
| Framework     | Next.js 15 (App Router)        | Free               | `create-next-app`                 |
| Hosting       | Vercel Hobby                   | Free forever       | 100GB bandwidth, 100K edge fn/day |
| Animations    | Framer Motion                  | Free (MIT)         | `npm install framer-motion`       |
| Solana data   | Helius API                     | 100K credits/month | ~1 credit per `getAssetsByOwner`  |
| LLM roasts    | Groq (llama-3.3-70b-versatile) | 6,000 req/day      | Fallback to templates if exceeded |
| OG images     | Next.js ImageResponse (Satori) | Free, edge runtime | Built into Next.js 13+            |
| Token price   | DexScreener public API         | No limit, no auth  | `api.dexscreener.com`             |
| Holder count  | DexScreener public API         | No limit, no auth  | For 1M progress bar               |
| Styling       | Tailwind CSS                   | Free               | Already in Next.js                |
| Rate limiting | In-memory or Vercel KV         | Free               | Vercel KV: 30K req/month free     |
| Domain        | Namecheap                      | ~₹800/year         | One-time only                     |

**Total monthly cost: ₹0**

npm packages needed:

```bash
npm install framer-motion groq-sdk
npm install @vercel/kv   # optional, for persistent rate limiting
```

---

## 11. Environment Variables

Create `.env.local` in project root:

```env
# Helius — get from helius.dev (free account)
HELIUS_API_KEY=your_helius_api_key_here

# Groq — get from console.groq.com (free account)
GROQ_API_KEY=your_groq_api_key_here

# Optional: Vercel KV for rate limiting
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token

# App URL — update after Vercel deploy
NEXT_PUBLIC_APP_URL=https://blackbullindex.xyz
```

Add all to: Vercel Dashboard → Project Settings → Environment Variables.

---

## 12. Token Addresses & Constants

```typescript
// /lib/constants.ts

export const ANSEM_MINT = "9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump";
export const WIF_MINT = "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm";
export const BONK_MINT = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";

// Ansem's known distribution wallet — for airdrop origin check
export const ANSEM_WALLET = "8vkMzpNPLM4Bvb7J3eTT1BVBcwpkJHhVDdJEPNqk7Cs";

// OG cutoff — before the 20,000% run
export const OG_CUTOFF_DATE = new Date("2026-06-25T00:00:00Z");

// Scoring weights (max possible score = 100, min = 0 after clamping)
export const SCORE_WEIGHTS = {
  ansemAny: 10, // holds any ANSEM at all
  ansemOver10k: 10, // holds > 10,000 ANSEM
  ansemOver100k: 15, // holds > 100,000 ANSEM
  ansemOver1m: 10, // holds > 1,000,000 ANSEM
  solBalance: 5, // SOL balance > 1 (real Solana wallet)
  wifHolder: 5, // holds any WIF
  bonkHolder: 5, // holds any BONK
  ogHolder: 15, // held ANSEM before OG_CUTOFF_DATE
  loyalAirdrop: 10, // received airdrop AND still holding
  walletAge1year: 5, // wallet > 365 days old
  walletAge2years: 5, // wallet > 730 days old
  soldAirdropPenalty: -15, // received airdrop then sold all ANSEM
};

// Grade thresholds (score >= threshold → that grade)
export const GRADE_THRESHOLDS: Record<string, number> = {
  "S+": 90,
  S: 75,
  A: 60,
  B: 45,
  C: 30,
  D: 15,
  F: 0,
};

// Legacy labels (used in OG image subtitle)
export const GRADE_LABELS: Record<string, string> = {
  "S+": "Trench Legend",
  S: "Black Bull Certified",
  A: "Committed Degen",
  B: "Getting There",
  C: "Participation Trophy",
  D: "Fumbled the Airdrop",
  F: "Wrong Ecosystem",
};

export const GRADE_COLORS: Record<string, string> = {
  "S+": "#F5A623",
  S: "#E8941A",
  A: "#7ED321",
  B: "#4A90E2",
  C: "#9B9B9B",
  D: "#D0021B",
  F: "#8B0000",
};
```

---

## 13. API Integrations

### 13.1 Helius — Wallet Token Data

**Endpoint:** `POST https://mainnet.helius-rpc.com/?api-key={HELIUS_API_KEY}`  
**Method:** `getAssetsByOwner`  
**Cost:** ~1 credit per call. Free = 100K credits/month ≈ 100K wallet lookups/month.

```typescript
// Full request body
{
  "jsonrpc": "2.0",
  "id": "black-bull-index",
  "method": "getAssetsByOwner",
  "params": {
    "ownerAddress": "{WALLET_ADDRESS}",
    "page": 1,
    "limit": 100,
    "displayOptions": {
      "showFungible": true,
      "showNativeBalance": true,
      "showZeroBalance": false
    }
  }
}
```

**Response fields to parse:**

```typescript
data.result.items; // array of token assets
data.result.nativeBalance.lamports; // SOL balance in lamports (÷ 1e9 = SOL)
item.id; // mint address
item.token_info.balance; // raw balance
item.token_info.decimals; // divide raw by 10^decimals
```

### 13.2 DexScreener — Price, Volume, Holder Count

**Endpoint (no auth, no rate limit stated):**

```
GET https://api.dexscreener.com/latest/dex/tokens/9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump
```

**Fields used:**

```typescript
data.pairs[0].priceUsd; // "$0.0987"
data.pairs[0].priceChange.h24; // e.g. 12.3 or -4.5
data.pairs[0].volume.h24; // 24h volume USD
data.pairs[0].info?.holders; // holder count if available
```

Used for: header price ticker, 1M holder progress bar, LIVE indicator heartbeat.

### 13.3 Groq — LLM Roast Generation

**Model:** `llama-3.3-70b-versatile`  
**Free limit:** 6,000 requests/day, 14,400 tokens/minute  
**SDK:** `groq-sdk`

### 13.4 Solana Public RPC — Wallet Age

**Endpoint:** `https://api.mainnet-beta.solana.com` (no key needed)

```typescript
// Get oldest signature to determine wallet creation approximate date
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getSignaturesForAddress",
  "params": ["{WALLET}", {"limit": 1}]
}
// result[0].blockTime → Unix timestamp of oldest cached signature
```

---

## 14. Scoring System

### 14.1 Full Scoring Function

```typescript
// /lib/score.ts
import {
  SCORE_WEIGHTS,
  GRADE_THRESHOLDS,
  GRADE_LABELS,
  GRADE_COLORS,
  IDENTITIES,
} from "./constants";

export interface WalletStats {
  walletAddress: string;
  ansemBalance: number; // human-readable (not raw)
  solBalance: number; // in SOL
  wifBalance: number;
  bonkBalance: number;
  isOgHolder: boolean; // first ANSEM tx before OG_CUTOFF_DATE
  receivedAirdrop: boolean; // received ANSEM from Ansem's wallet
  walletAgeDays: number;
}

export interface ScoreResult {
  score: number;
  grade: string;
  gradeLabel: string;
  gradeColor: string;
  identity: (typeof IDENTITIES)[string];
  breakdown: Record<string, number>;
}

export function calculateScore(stats: WalletStats): ScoreResult {
  const breakdown: Record<string, number> = {};
  let score = 0;

  const add = (key: string, pts: number) => {
    score += pts;
    breakdown[key] = pts;
  };

  // ANSEM balance (cumulative tiers — each adds on top)
  if (stats.ansemBalance > 0) add("ansemAny", SCORE_WEIGHTS.ansemAny);
  if (stats.ansemBalance > 10_000) add("ansemOver10k", SCORE_WEIGHTS.ansemOver10k);
  if (stats.ansemBalance > 100_000) add("ansemOver100k", SCORE_WEIGHTS.ansemOver100k);
  if (stats.ansemBalance > 1_000_000) add("ansemOver1m", SCORE_WEIGHTS.ansemOver1m);

  // Solana ecosystem presence
  if (stats.solBalance > 1) add("solBalance", SCORE_WEIGHTS.solBalance);
  if (stats.wifBalance > 0) add("wifHolder", SCORE_WEIGHTS.wifHolder);
  if (stats.bonkBalance > 0) add("bonkHolder", SCORE_WEIGHTS.bonkHolder);

  // OG status — held before the pump
  if (stats.isOgHolder) add("ogHolder", SCORE_WEIGHTS.ogHolder);

  // Loyalty — received airdrop AND still holding
  if (stats.receivedAirdrop && stats.ansemBalance > 0)
    add("loyalAirdrop", SCORE_WEIGHTS.loyalAirdrop);

  // Wallet age bonus
  if (stats.walletAgeDays > 365) add("walletAge1year", SCORE_WEIGHTS.walletAge1year);
  if (stats.walletAgeDays > 730) add("walletAge2years", SCORE_WEIGHTS.walletAge2years);

  // Penalty — received airdrop then sold everything
  if (stats.receivedAirdrop && stats.ansemBalance === 0)
    add("soldAirdropPenalty", SCORE_WEIGHTS.soldAirdropPenalty);

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score));

  const grade = assignGrade(score);
  const identity = IDENTITIES[grade];

  return {
    score,
    grade,
    gradeLabel: GRADE_LABELS[grade],
    gradeColor: GRADE_COLORS[grade],
    identity,
    breakdown,
  };
}

function assignGrade(score: number): string {
  const sorted = Object.entries(GRADE_THRESHOLDS).sort(([, a], [, b]) => b - a);
  for (const [grade, min] of sorted) {
    if (score >= min) return grade;
  }
  return "F";
}
```

### 14.2 Score Breakdown Display Labels

```typescript
export const BREAKDOWN_LABELS: Record<string, string> = {
  ansemAny: "Holds $ANSEM",
  ansemOver10k: "$ANSEM over 10,000",
  ansemOver100k: "$ANSEM over 100,000",
  ansemOver1m: "$ANSEM over 1,000,000",
  solBalance: "Active Solana wallet",
  wifHolder: "Holds WIF",
  bonkHolder: "Holds BONK",
  ogHolder: "OG holder (pre-June 25)",
  loyalAirdrop: "Airdrop received — still holding",
  walletAge1year: "Wallet 1+ year old",
  walletAge2years: "Wallet 2+ years old",
  soldAirdropPenalty: "Received airdrop — sold everything",
};
```

---

## 15. Roast System — LLM + Templates

> **v3.0 overhaul:** System prompt rewritten with few-shot examples so Groq hits the exact
> register. User prompt now passes exact dollar values, wallet age in years, and a hard
> instruction to end on a quotable line. Template fallbacks rebuilt to be brutal even without
> exact numbers. Fallback function now takes `stats` so it can inject runtime data.

### 15.1 Groq Call — Updated

The single biggest roast quality lever is the system prompt. This version gives the model
three concrete examples of the exact tone, then hard rules. Groq follows examples 10x
better than abstract instructions.

**Key changes from v2.0:**

- Few-shot examples in the system prompt (3 concrete samples)
- `userPrompt` now passes exact ANSEM dollar value, wallet age in years, airdrop sell flag
- `ansemPrice` is fetched in the analyze route and passed here
- Last-sentence instruction: every roast must end on a screenshot-worthy line
- `fallback()` now takes `stats` so templates can use `{walletAgeDays}` substitution

```typescript
// /lib/roast.ts
import Groq from "groq-sdk";
import { TEMPLATE_ROASTS } from "./roastTemplates";
import type { WalletStats, ScoreResult } from "./score";

const SYSTEM_PROMPT = `You are the Black Bull AI — the scoring intelligence behind the
Black Bull Index (blackbullindex.xyz). You read Solana wallets and deliver permanent verdicts.

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

export async function generateRoast(
  stats: WalletStats,
  result: ScoreResult,
  ansemPrice: number = 0,
): Promise<string> {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 180,
      temperature: 0.92,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const roast = completion.choices[0]?.message?.content?.trim();
    if (!roast || roast.length < 10) return fallback(result.grade, stats);
    return roast;
  } catch {
    return fallback(result.grade, stats);
  }
}

// Fallback now takes stats so templates can inject wallet-specific data
function fallback(grade: string, stats: WalletStats): string {
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
```

### 15.2 How to fetch ANSEM price in the analyze route

Add this block to `/app/api/analyze/route.ts` before the `generateRoast` call:

```typescript
// Fetch live ANSEM price to pass exact dollar values into roast
let ansemPrice = 0;
try {
  const priceRes = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${ANSEM_MINT}`,
    { next: { revalidate: 60 } }, // cache for 60s to avoid hammering DexScreener
  );
  const priceData = await priceRes.json();
  ansemPrice = parseFloat(priceData.pairs?.[0]?.priceUsd ?? "0");
} catch {
  // If DexScreener fails, price stays 0 — roast omits dollar value gracefully
}

const roast = await generateRoast(walletData, result, ansemPrice);
```

### 15.3 Template Roasts — Rebuilt (v3.0)

Templates now use `{walletAgeDays}`, `{ansemBalance}`, `{solBalance}` substitutions via
the updated `fallback()` function. Three roasts per Identity, each ending on a
screenshot-worthy last line.

```typescript
// /lib/roastTemplates.ts

export const TEMPLATE_ROASTS: Record<string, string[]> = {
  "S+": [
    "Your wallet reads like a plan executed quietly. Before the threads, before the charts, before the calls — you were already positioned. The Architect doesn't announce the thesis. They execute it and let the chain speak. Your chain is speaking. Clearly.",

    "First in. Still holding. Bigger position than yesterday. Your ANSEM stack puts you in the fraction of wallets that will ever touch this token at the entry you did. The Architect doesn't chase calls — they make positions before the calls exist. Yours was made. It held. That's the whole story.",

    "WIF before the run. BONK through the noise. ANSEM before the pump. Your wallet does not follow signals. It creates the conditions that become signals for everyone else. The Black Bull Index assigns Architect status not as a reward — but as a record. Yours is clean.",
  ],

  S: [
    "You acted before it was obvious. Your ANSEM position is real, your Solana timeline is documented, and your wallet reflects conviction that most people describe in replies but don't demonstrate on-chain. The Faithful are one decision from The Architect. You already know what that decision is.",

    "Trust given before the run. Position built before consensus. Your on-chain record is the argument you don't need to make in anyone's replies — it's already written. The Faithful don't need the chart to validate them. They validated the chart.",

    "You understood the thesis before it was popular and your wallet proves it. Solana credentials real. ANSEM position real. Timeline honest. The Black Bull Index reads what wallets contain, not what their owners say on X. Yours says enough.",
  ],

  A: [
    "You weren't first. You also weren't last, and you weren't on the sidelines describing what you should have done. Something clicked and you acted. The Convert is the engine of every real bull run — the person with good instincts who stops overthinking. The chain records that you did. Now size up.",

    "Late to the thesis, not late to the outcome. Your ANSEM position is solid and your Solana history shows you know the difference between noise and signal. You heard the signal and moved. Most people who see the same signal spend two weeks asking for permission from the chart. You didn't.",

    "Not the OG wallet, not the biggest position — but a wallet that made a considered decision and followed through. In an ecosystem full of wallets that watch, The Convert is the one that moved. Timing matters less than the move itself. The next move matters more than the last one.",
  ],

  B: [
    "Your ANSEM position exists. It is the size of something purchased to keep the option open — not the size of something purchased because you're certain. There is nothing wrong with uncertainty. But the trenches do not reward optionality. They reward commitment. You have not committed yet.",

    "You're in the right ecosystem, on the right chain, holding the right token in the wrong amount. Your instincts are documented. Your conviction is not. The Curious builds positions they can explain away if they don't work. The Faithful build positions because they believe. Pick one.",

    "Everything about your wallet says you understand what $ANSEM represents. The portfolio is right. The chain is right. The timing is still available. The only variable is the size that matches the conviction. One decision separates where you are from the next Identity. Make it.",
  ],

  C: [
    "You hold $ANSEM — a small amount. The kind that feels like a position but functions like a bookmark. The Tourist doesn't visit to stay. They visit to say they were there. Your wallet will record this reading either way. The question is whether the chapter ends here or continues.",

    "Technically in the trenches. Your $ANSEM balance exists and it is not a stake — it is a footnote. You are in the right ecosystem and you have some skin in the right token. The Tourist is not a permanent Identity. It is a starting point. This index will give a different reading after your next transaction.",

    "You are present. You hold ANSEM. You are on Solana with {solBalance} SOL and a position that says 'I found it but I'm not sure yet.' The chain records what you're sure about — not what you're considering. So far the record says: present, uncommitted, still deciding. Write a different line next.",
  ],

  D: [
    "Ansem's distribution wallet sent ANSEM directly to your address. This is a fact retrievable by anyone on Solana — permanent, indexed, timestamped. Your current ANSEM balance is zero. You looked at free money delivered by the builder himself and decided the timing was wrong. The timing was not wrong. The decision was.",

    "The stimmy landed. You held it long enough to know what it was and short enough to confirm you didn't believe in it. The exit liquidity you provided went to wallets now classified as Architects on this index. The chain wrote this. Not us. It writes everything with equal permanence.",

    "You received an airdrop from one of the most followed wallets in the Solana ecosystem and your ANSEM balance now reads zero. The Ghost haunts the decision made in a moment of doubt. The trench is still open. But the chain already wrote the first draft of your story here. You're the one who has to rewrite it.",
  ],

  F: [
    "{walletAgeDays} days on Solana. Your wallet has been here through everything this chain has produced. Zero ANSEM. The stimmy was distributed, the opportunity was public, and your wallet was present for all of it. The chain writes absence with the same permanence it writes presence. This reading is what absence looks like.",

    "Zero $ANSEM. {walletAgeYears} years on Solana and the Black Bull has not appeared in your portfolio — not because the opportunity wasn't there, but because the decision wasn't made. The Unawakened is not a judgment. It is a starting point. Every Architect wallet was empty once. One transaction changes the next reading.",

    "Your wallet exists. It holds things. It has {walletAgeDays} days of history on a chain that produced BONK, WIF, and $ANSEM — three of the most significant community tokens in its history. Your record on the most recent one is zero. The Black Bull Index does not close. Your next transaction writes the next line.",
  ],
};
```

---

## 16. OG Card Image Spec

### 16.1 Dimensions

- Width: 1200px, Height: 630px (standard OG / Twitter card)
- Format: PNG via Satori `ImageResponse`
- Runtime: Edge (runs in `/app/api/og/route.tsx`)

### 16.2 Card Layout (top → bottom)

```
┌─────────────────────────────────────────────────────────────────┐
│  BLACK BULL INDEX               [LIVE · SOLANA  ●]              │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│         THE ARCHITECT                   [S+]                    │
│         ─────────────────                                        │
│         Score: 94 / 100                                          │
│                                                                  │
│  "Your wallet is the thesis made tangible. You were in          │
│   the trenches before most people could find the link..."        │
│                                                                  │
│  ───────────────────────────────────────────────────────────    │
│  ANSEM: 500K+  │  OG: Yes  │  WIF: Yes  │  8vkM...7Cs           │
│                                                                  │
│                              blackbullindex.xyz  @blknoiz06     │
└─────────────────────────────────────────────────────────────────┘
```

### 16.3 OG Image Route

```typescript
// /app/api/og/route.tsx
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { GRADE_COLORS, IDENTITIES } from "@/lib/constants"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const grade   = searchParams.get("grade")  ?? "F"
  const score   = searchParams.get("score")  ?? "0"
  const roast   = decodeURIComponent(searchParams.get("roast") ?? "")
  const ansem   = searchParams.get("ansem")  ?? "0"
  const isOg    = searchParams.get("og")     === "true"
  const wallet  = searchParams.get("wallet") ?? ""
  const wif     = searchParams.get("wif")    === "true"

  const identity   = IDENTITIES[grade]
  const gradeColor = GRADE_COLORS[grade] ?? "#FFFFFF"
  const shortWallet = wallet
    ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
    : ""

  const ansemDisplay =
    parseInt(ansem) > 1_000_000 ? "1M+" :
    parseInt(ansem) > 100_000   ? "100K+" :
    parseInt(ansem) > 10_000    ? "10K+" :
    parseInt(ansem) > 0         ? "Some" : "None"

  const shortRoast = roast.length > 160
    ? roast.slice(0, 157) + "..."
    : roast

  return new ImageResponse(
    (
      <div style={{
        background: "#0A0A0A",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        padding: "48px 60px",
        fontFamily: "sans-serif",
        position: "relative",
        color: "#FFFFFF",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 40,
        }}>
          <span style={{ fontSize: 13, color: "#555", letterSpacing: "0.15em" }}>
            BLACK BULL INDEX
          </span>
          <span style={{ fontSize: 11, color: "#333", letterSpacing: "0.12em" }}>
            LIVE · SOLANA ●
          </span>
        </div>

        {/* Identity name + grade */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 8 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: gradeColor, letterSpacing: "0.05em" }}>
            {identity?.name ?? "THE UNAWAKENED"}
          </div>
          <div style={{
            fontSize: 36, fontWeight: 700,
            color: gradeColor, marginBottom: 4,
            border: `2px solid ${gradeColor}`,
            padding: "2px 16px", borderRadius: 6,
          }}>
            {grade}
          </div>
        </div>

        {/* Score */}
        <div style={{ fontSize: 16, color: "#555", marginBottom: 28, letterSpacing: "0.08em" }}>
          SCORE: {score} / 100
          {isOg && (
            <span style={{
              marginLeft: 16, fontSize: 11, color: gradeColor,
              border: `1px solid ${gradeColor}`,
              padding: "2px 8px", borderRadius: 3, letterSpacing: "0.1em"
            }}>
              OG HOLDER
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1E1E1E", marginBottom: 28 }} />

        {/* Roast */}
        <div style={{
          fontSize: 18, color: "#AAAAAA",
          lineHeight: 1.6, fontStyle: "italic",
          maxWidth: 960, marginBottom: 32,
        }}>
          "{shortRoast}"
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 32,
          fontSize: 13, color: "#444",
        }}>
          <span>ANSEM <span style={{ color: "#666" }}>{ansemDisplay}</span></span>
          <span>WIF <span style={{ color: "#666" }}>{wif ? "Yes" : "No"}</span></span>
          <span>OG <span style={{ color: "#666" }}>{isOg ? "Yes" : "No"}</span></span>
          {shortWallet && <span style={{ color: "#333" }}>{shortWallet}</span>}
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute", bottom: 36,
          left: 60, right: 60,
          display: "flex", justifyContent: "space-between",
          fontSize: 12, color: "#333",
        }}>
          <span>blackbullindex.xyz</span>
          <span>@blknoiz06</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

### 16.4 OG Image URL Builder

```typescript
// /lib/share.ts
export function buildOgUrl(params: {
  grade: string;
  score: number;
  roast: string;
  ansem: number;
  isOg: boolean;
  wallet: string;
  wif: boolean;
}): string {
  const base = process.env.NEXT_PUBLIC_APP_URL;
  const q = new URLSearchParams({
    grade: params.grade,
    score: String(params.score),
    roast: params.roast,
    ansem: String(params.ansem),
    og: String(params.isOg),
    wallet: params.wallet,
    wif: String(params.wif),
  });
  return `${base}/api/og?${q.toString()}`;
}
```

---

## 17. Viral Share Mechanics

### 17.1 Pre-filled Tweet

```typescript
// /lib/share.ts
export function buildShareTweet(params: {
  identityName: string;
  grade: string;
  score: number;
  roast: string;
  appUrl: string;
}): string {
  const { identityName, grade, score, roast, appUrl } = params;

  const shortRoast = roast.length > 100 ? roast.slice(0, 97) + "..." : roast;

  const text = [
    `🐂 Black Bull Index — I am ${identityName} (${grade})`,
    ``,
    `Score: ${score}/100`,
    `"${shortRoast}"`,
    ``,
    `Read the chain: ${appUrl} @blknoiz06`,
  ].join("\n");

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
```

### 17.2 Share Button Component

```typescript
// /components/ShareButton.tsx
"use client"
import { buildShareTweet } from "@/lib/share"

export function ShareButton({ identity, grade, score, roast }: ShareButtonProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  async function handleShare() {
    const twitterUrl = buildShareTweet({
      identityName: identity.name,
      grade, score, roast, appUrl
    })

    // Use native share on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({
          title:  `Black Bull Index — ${identity.name}`,
          text:   roast,
          url:    appUrl,
        })
        return
      } catch {
        // Fallback to Twitter if share cancelled
      }
    }

    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400
                 text-black font-semibold text-sm tracking-widest uppercase
                 transition-colors duration-200"
    >
      Share on X →
    </button>
  )
}
```

### 17.3 Dynamic OG Meta (per wallet result page)

```typescript
// /app/result/[wallet]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { wallet: string };
}): Promise<Metadata> {
  const result = await analyzeWallet(params.wallet); // server-side fetch
  const ogImageUrl = buildOgUrl({
    grade: result.grade,
    score: result.score,
    roast: result.roast,
    ansem: result.stats.ansemBalance,
    isOg: result.stats.isOgHolder,
    wallet: params.wallet,
    wif: result.stats.wifBalance > 0,
  });

  return {
    title: `Black Bull Index — ${result.identity.name}`,
    description: result.roast,
    openGraph: {
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      title: `${result.identity.name} (${result.grade}) — Black Bull Index`,
      description: result.roast,
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
      title: `I am ${result.identity.name} on the Black Bull Index`,
      description: result.roast,
      site: "@blknoiz06",
    },
  };
}
```

Every shared URL auto-renders the personalised card as a link preview on X — before the
user even clicks. This is the single most important implementation detail for virality.

---

## 18. UI / UX Specification

### 18.1 Design Principles

- Dark only. No light mode. `#0A0A0A` everywhere.
- Cinematic, not gamified. No confetti. No achievement popups.
- Every element earns its place. Nothing decorative that isn't also structural.
- Transitions are slow and intentional (400–800ms ease). Nothing snaps.
- The grade reveal is the climax of a 4-section journey, not just a form result.

### 18.2 Page Layout Map

```
/ (landing — full single-page scroll)
├── [nav]         Story | Method | Identities | Grades + LIVE·SOLANA + CTA button
├── [hero]        "THE BLACK BULL" — full screen, 3D bull behind text
├── [story]       #story — origin narrative, 3 paragraphs
├── [method]      #method — 7 factor cards with weights
├── [identities]  #identities — 7 Identity cards in grid
└── [grades]      #grades — wallet input field + submit

/result/[wallet]  (Identity reveal — separate page)
├── [nav]         same nav, same LIVE indicator
├── [reveal]      5-step animated Identity reveal (see Section 20)
├── [roast]       italic roast text, fades in
├── [breakdown]   accordion with score factors
├── [card]        OG card preview + download/share
├── [progress]    1M holder bar
└── [share]       Share on X button
```

### 18.3 Nav Behaviour

- Fixed position, `backdrop-blur` at 50% opacity on scroll
- On mobile: hamburger → slide-in overlay
- "Sign in" button → repurpose as "Read the Chain" → smooth scroll to `#grades`
- Logo click → smooth scroll to top / navigate to `/`

### 18.4 Hero Section

- "THE" and "BULL" in white, "BLACK" in italic gold (exactly matching Lovable UI)
- Bull image: centered, behind text layer (z-index stacking)
- Tagline: `"Every wallet is a memoir written in transactions..."` — small, centered below hero text, white, semi-transparent
- Bottom CTA: `SCROLL TO ENTER` — 11px, tracked, uppercase, pulsing opacity animation
- Orbit rings: 2 subtle concentric circles, low opacity, slow rotation (CSS animation, 60s loop)

### 18.5 Identity Cards (Grades Gallery)

Display as a 3+4 grid on desktop, single column on mobile.
Each card:

```
┌──────────────────────────────┐
│  [colour accent bar — 3px]   │
│  THE ARCHITECT               │
│  S+  ·  90–100              │
│                              │
│  You didn't just buy the     │
│  token. You built a position.│
│                              │
│  [colour dot]                │
└──────────────────────────────┘
```

- Card bg: `#111111`
- Border: `1px solid #1E1E1E`
- Hover: border colour shifts to Identity accent colour (300ms transition)
- Clicking any card: smooth scroll to `#grades`

---

## 19. Scroll Animation Spec — Framer Motion

Install: `npm install framer-motion`

### 19.1 Hero Parallax

```typescript
// /components/Hero.tsx
"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  // Bull image moves up slower than scroll (parallax)
  const bullY      = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  // Hero text fades out as user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY       = useTransform(scrollYProgress, [0, 0.4], ["0%", "-10%"])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: bullY }} className="absolute inset-0 flex items-center justify-center">
        {/* Bull image — see Section 24 */}
        <img src="/bull.png" alt="" className="w-[500px] opacity-90 select-none" />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[14vw] font-bold leading-none tracking-tight">
          <span className="text-white">THE </span>
          <span className="text-amber-400 italic">BLACK</span>
          <span className="text-white"> BULL</span>
        </h1>
        <p className="text-zinc-500 text-sm tracking-[0.2em] mt-6 uppercase">
          Every wallet is a memoir written in transactions.
          We read the chain and reveal who you truly are.
        </p>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2
                      text-zinc-600 text-[10px] tracking-[0.3em] uppercase
                      animate-pulse">
        Scroll to Enter
      </div>
    </section>
  )
}
```

### 19.2 Section Reveal (whileInView)

Apply this to every section heading and paragraph. Once = true (plays once, stays visible):

```typescript
// /components/RevealSection.tsx
"use client"
import { motion } from "framer-motion"

export function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

### 19.3 Identity Card Stagger (Grades Gallery)

```typescript
// /components/IdentityGallery.tsx
"use client"
import { motion } from "framer-motion"
import { IDENTITIES } from "@/lib/constants"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export function IdentityGallery() {
  return (
    <motion.div
      className="grid grid-cols-3 md:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {Object.entries(IDENTITIES).map(([grade, identity]) => (
        <motion.div key={grade} variants={card}>
          {/* Identity card — see Section 18.5 */}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### 19.4 Orbit Ring Animation (CSS, not Framer)

```css
/* globals.css */
@keyframes orbit-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-slow-reverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.orbit-ring-1 {
  animation: orbit-slow 60s linear infinite;
}

.orbit-ring-2 {
  animation: orbit-slow-reverse 90s linear infinite;
}
```

---

## 20. Grade Reveal Animation Sequence

This is the climax of the user experience. It runs on `/result/[wallet]` on page load.
The sequence is choreographed — each step triggers after the previous completes.

```
Step 1 (0ms):    Black screen. Faint orbit ring appears (scale from 0.8 → 1.0, opacity 0 → 0.2)
Step 2 (600ms):  Identity grade letter fades in (opacity 0 → 1, scale 0.7 → 1, spring physics)
Step 3 (1200ms): Identity name appears below grade (slide up + fade)
Step 4 (1800ms): Score counter animates from 0 → actual score over 1.2 seconds
Step 5 (2400ms): Roast text types in character by character (typewriter, 30ms per char)
Step 6 (after roast): Breakdown, card preview, share button slide in from below (staggered)
```

```typescript
// /components/GradeReveal.tsx
"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"
import type { ScoreResult } from "@/lib/score"

export function GradeReveal({ result, roast }: { result: ScoreResult; roast: string }) {
  const [displayRoast, setDisplayRoast] = useState("")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.floor(v))

  // Typewriter effect for roast
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayRoast(roast.slice(0, i + 1))
        i++
        if (i >= roast.length) clearInterval(interval)
      }, 28)
      return () => clearInterval(interval)
    }, 2400)
    return () => clearTimeout(timeout)
  }, [roast])

  // Score counter
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(count, result.score, { duration: 1.2, ease: "easeOut" })
    }, 1800)
    return () => clearTimeout(timeout)
  }, [count, result.score])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      {/* Orbit ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-[600px] h-[600px] rounded-full border border-zinc-700 orbit-ring-1" />
      </motion.div>

      {/* Grade letter */}
      <motion.div
        className="text-[18vw] font-bold leading-none"
        style={{ color: result.gradeColor }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {result.grade}
      </motion.div>

      {/* Identity name */}
      <motion.div
        className="text-xl tracking-[0.2em] uppercase text-zinc-400 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {result.identity.name}
      </motion.div>

      {/* Score */}
      <motion.div
        className="text-sm tracking-widest text-zinc-600 mt-2 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Score: <motion.span>{rounded}</motion.span> / 100
      </motion.div>

      {/* Roast — typewriter */}
      <motion.p
        className="text-lg italic text-zinc-400 text-center max-w-2xl mt-10 leading-relaxed min-h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: displayRoast.length > 0 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        "{displayRoast}"
      </motion.p>

      {/* Rest of results slide in after roast */}
      <motion.div
        className="w-full max-w-2xl mt-12 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 + (roast.length * 0.028) + 0.5, duration: 0.6 }}
      >
        {/* Breakdown, OG card, share button go here */}
      </motion.div>

    </div>
  )
}
```

---

## 21. Mobile Responsive Spec

### 21.1 Breakpoints (Tailwind)

```
sm:  640px   — large phone (landscape)
md:  768px   — tablet
lg:  1024px  — desktop
xl:  1280px  — wide desktop
```

### 21.2 Hero Text — Responsive Scaling

The "THE BLACK BULL" display text must not break on mobile:

```tsx
// Use viewport-width units that scale with screen
<h1 className="
  text-[18vw]       // mobile — fills 18% of screen width
  sm:text-[14vw]    // large phone
  md:text-[12vw]    // tablet
  lg:text-[10vw]    // desktop (matches Lovable UI)
  font-bold leading-none tracking-tight
">
```

### 21.3 Identity Grid — Responsive

```tsx
<div className="
  grid
  grid-cols-1        // mobile — single column
  sm:grid-cols-2     // tablet — 2 columns
  lg:grid-cols-3     // desktop — 3 cols + 4th card wraps
  gap-4
">
```

### 21.4 Method Factor Cards — Responsive

```tsx
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-3
">
```

### 21.5 Result Page — Mobile Layout

On mobile, the grade letter should be smaller:

```tsx
<div className="
  text-[30vw]       // mobile — big but contained
  sm:text-[20vw]    // tablet
  md:text-[15vw]    // desktop
  lg:text-[12vw]
">
```

The OG card preview (1200×630) should be shown at max-width on mobile:

```tsx
<img
  src={ogUrl}
  alt="Your Identity Card"
  className="w-full max-w-[90vw] sm:max-w-[600px] rounded-lg border border-zinc-800"
/>
```

### 21.6 Nav — Mobile

```tsx
// Hamburger menu on mobile
<nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50">
  {/* Desktop */}
  <div className="hidden md:flex items-center gap-8">{/* nav links */}</div>
  {/* Mobile hamburger */}
  <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
    {/* 3-line icon */}
  </button>
</nav>
```

---

## 22. Error States — Brand Voice

All error messages must match the "Black Bull Index" tone. No generic HTTP errors visible.

| Situation                        | Error message shown to user                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| Invalid wallet address           | "The chain doesn't recognise this address. Check it, anon."              |
| Helius API down / timeout        | "The trenches are congested right now. Try again in a moment."           |
| Rate limited (too many requests) | "The Black Bull sees all — he's just busy right now. Try again shortly." |
| Groq unavailable                 | Silent — falls back to template roast. User never knows.                 |
| Wallet with zero tokens          | Not an error — scores as F / The Unawakened. Roast handles it.           |
| No ANSEM but valid Solana wallet | Not an error — The Unawakened Identity. Full flow completes normally.    |
| Network error client-side        | "Something broke in the trenches. Refresh and try again."                |
| Wallet address too short         | "That's not a wallet address. That's barely a username."                 |

### 22.1 Error Component

```typescript
// /components/ErrorState.tsx
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="text-xs text-zinc-600 tracking-widest uppercase mb-4">
        READ FAILED
      </div>
      <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
        {message}
      </p>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-8 text-xs text-zinc-600 tracking-widest uppercase
                   hover:text-zinc-400 transition-colors"
      >
        ← Return to the Index
      </button>
    </div>
  )
}
```

### 22.2 Error Mapping in Analyze Route

```typescript
// /app/api/analyze/route.ts
const ERROR_MESSAGES = {
  INVALID_ADDRESS: "The chain doesn't recognise this address. Check it, anon.",
  RATE_LIMITED: "The Black Bull sees all — he's just busy right now. Try again shortly.",
  HELIUS_DOWN: "The trenches are congested right now. Try again in a moment.",
  GENERIC: "Something broke in the trenches. Refresh and try again.",
};
```

---

## 23. LIVE · SOLANA Indicator

Already present in the Lovable UI (top right). This must be a real live signal —
not static decoration.

### 23.1 What it shows

- Green pulsing dot (`●`) when DexScreener last returned valid data within 60 seconds
- The text "LIVE · SOLANA" always visible
- On hover: small tooltip showing `$ANSEM: $X.XXXX (+X.X%)`

### 23.2 Behaviour

- Fetches DexScreener every 30 seconds (client-side `setInterval`)
- If fetch fails twice in a row → dot turns amber, tooltip: "Data delayed"
- On success → updates price in header ticker (if shown), dot stays green

### 23.3 Implementation

```typescript
// /components/LiveIndicator.tsx
"use client"
import { useEffect, useState } from "react"

interface LiveData {
  price:    string
  change24h: number
  status:   "live" | "delayed" | "offline"
}

const ANSEM_TOKEN = "9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump"

export function LiveIndicator() {
  const [data, setData] = useState<LiveData>({ price: "—", change24h: 0, status: "live" })
  const [failCount, setFailCount] = useState(0)

  async function fetchPrice() {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${ANSEM_TOKEN}`,
        { next: { revalidate: 30 } }
      )
      const json = await res.json()
      const pair = json.pairs?.[0]
      if (!pair) throw new Error("no pair")

      setData({
        price:     parseFloat(pair.priceUsd).toFixed(6),
        change24h: pair.priceChange?.h24 ?? 0,
        status:    "live",
      })
      setFailCount(0)

    } catch {
      setFailCount(n => {
        const next = n + 1
        if (next >= 2) setData(d => ({ ...d, status: "delayed" }))
        return next
      })
    }
  }

  useEffect(() => {
    fetchPrice()
    const interval = setInterval(fetchPrice, 30_000)
    return () => clearInterval(interval)
  }, [])

  const dotColor =
    data.status === "live"    ? "bg-green-500" :
    data.status === "delayed" ? "bg-amber-500" : "bg-red-600"

  const changeColor = data.change24h >= 0 ? "text-green-400" : "text-red-400"
  const changePrefix = data.change24h >= 0 ? "+" : ""

  return (
    <div className="flex items-center gap-2 group relative cursor-default">
      <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
      <span className="text-[11px] text-zinc-500 tracking-widest uppercase">
        LIVE · SOLANA
      </span>

      {/* Hover tooltip */}
      <div className="absolute right-0 top-6 hidden group-hover:block
                      bg-zinc-900 border border-zinc-800 rounded px-3 py-2
                      text-xs text-zinc-300 whitespace-nowrap z-50">
        $ANSEM: ${data.price}
        <span className={`ml-2 ${changeColor}`}>
          {changePrefix}{data.change24h.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
```

---

## 24. Hero Asset — 3D Bull Sourcing

The Lovable UI uses a cinematic black-and-gold metallic bull 3D render. For MVP,
this is a **static image** — not an interactive Three.js scene. This avoids
significant build complexity.

### 24.1 Recommended approach — Higgsfield MCP

Generate the definitive bull render using Higgsfield's image generation tool.

**Prompt to use:**

```
A hyper-realistic 3D render of a powerful bull sculpture, midnight black body with
polished obsidian texture, horns dipped in molten gold, metallic sheen across the
shoulders and back. Set against pure black (#0A0A0A) background — the bull should
be centered, slightly three-quarter facing left, dramatic rim lighting from the top
catching the golden horns. Cinematic, high-contrast, luxury editorial aesthetic.
No environment, no shadow, no floor — just the bull floating in darkness. 8K render,
physically-based rendering, studio lighting.
```

**Output:** Save as `/public/bull.png` (PNG with transparent or pure black background).

### 24.2 CSS treatment in the hero

```tsx
<div className="absolute inset-0 flex items-center justify-center">
  <img
    src="/bull.png"
    alt=""
    className="
      w-[400px] md:w-[500px] lg:w-[600px]
      opacity-85 select-none pointer-events-none
      drop-shadow-[0_0_80px_rgba(245,166,35,0.15)]
    "
  />
</div>
```

The `drop-shadow` creates a subtle gold aura without any JS. The bull sits
behind the text via z-index stacking.

### 24.3 Optional: subtle parallax on mouse move (desktop only)

```typescript
// Add to hero component — desktop only, 0 extra dependencies
useEffect(() => {
  if (window.innerWidth < 1024) return; // skip on mobile

  function onMove(e: MouseEvent) {
    const x = (e.clientX / window.innerWidth - 0.5) * 10; // max 5px shift
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    bullRef.current?.style.setProperty("transform", `translate(${x}px, ${y}px)`);
  }

  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}, []);
```

---

## 25. Wallet Input Decision

**Decision: Paste address (read-only). No wallet connection for MVP.**

Rationale:

- No dependencies on `@solana/wallet-adapter` (saves complexity + bundle size)
- No wallet permission prompts that scare away users
- 100% read-only — users don't have to trust the site with signing permissions
- Any Solana address works — including addresses the user doesn't control
  (e.g. checking a friend's wallet, checking Ansem's wallet)
- Trust note displayed: "Read-only. We fetch public on-chain data only. Nothing is stored."

**The "Sign in" button** in the current Lovable UI:
→ Repurpose as `"Read the Chain →"`
→ On click: smooth scroll to `#grades` section (the wallet input)
→ No auth flow, no Phantom popup

**v3 enhancement:** Add optional Phantom wallet connect with `@solana/wallet-adapter-react`.
On connect, auto-fill the wallet address field. This is a one-button add later.

### 25.1 Wallet Input Component

```typescript
// /components/WalletInput.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function WalletInput() {
  const [address, setAddress] = useState("")
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const LOADING_MESSAGES = [
    "Scanning the trenches...",
    "Consulting the Black Bull...",
    "Checking if you're ngmi...",
    "Reading your on-chain memoir...",
    "Verifying your position...",
  ]

  const [loadMsg] = useState(
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
  )

  const isValidSolana = (addr: string) =>
    /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr.trim())

  async function handleSubmit() {
    const trimmed = address.trim()

    if (!trimmed) {
      setError("The chain doesn't recognise this address. Check it, anon.")
      return
    }
    if (!isValidSolana(trimmed)) {
      setError("That's not a wallet address. That's barely a username.")
      return
    }

    setError(null)
    setLoading(true)
    router.push(`/result/${trimmed}`)
  }

  return (
    <div id="grades" className="w-full max-w-xl mx-auto">
      <div className="text-xs text-zinc-600 tracking-widest uppercase mb-3">
        Enter any Solana wallet address — no connection required.
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setError(null) }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Paste wallet address..."
          disabled={loading}
          className="
            flex-1 bg-zinc-900 border border-zinc-800 rounded
            px-4 py-3 text-sm font-mono text-zinc-300
            placeholder:text-zinc-700
            focus:outline-none focus:border-amber-500/50
            transition-colors duration-200
            disabled:opacity-50
          "
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            px-5 py-3 bg-amber-500 hover:bg-amber-400
            text-black font-semibold text-sm tracking-widest uppercase
            transition-colors duration-200 whitespace-nowrap
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? loadMsg : "Read the Chain →"}
        </button>
      </div>

      {error && (
        <p className="text-red-800 text-xs mt-2 tracking-wide">{error}</p>
      )}

      <p className="text-zinc-700 text-xs mt-3">
        Read-only. We fetch public on-chain data only. Nothing is stored.
      </p>
    </div>
  )
}
```

---

## 26. File Structure

```
/
├── .env.local
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── /public
│   ├── bull.png                      ← Higgsfield-generated hero image
│   └── favicon.ico
│
├── /app
│   ├── layout.tsx                    ← Root layout, global fonts, nav
│   ├── page.tsx                      ← Full scroll landing page
│   ├── globals.css                   ← Orbit ring animations, base styles
│   │
│   ├── /result
│   │   └── /[wallet]
│   │       └── page.tsx              ← Identity reveal (SSR + generateMetadata)
│   │
│   └── /api
│       ├── /analyze
│       │   └── route.ts              ← POST: wallet → score + identity + roast
│       └── /og
│           └── route.tsx             ← GET: Satori OG card image (edge runtime)
│
├── /lib
│   ├── constants.ts                  ← Mint addresses, weights, IDENTITIES object
│   ├── score.ts                      ← calculateScore(), assignGrade()
│   ├── roast.ts                      ← generateRoast() — Groq + fallback
│   ├── roastTemplates.ts             ← 21+ pre-written template roasts
│   ├── helius.ts                     ← fetchWalletData() via Helius API
│   └── share.ts                      ← buildShareTweet(), buildOgUrl()
│
└── /components
    ├── Nav.tsx                        ← Fixed nav, LIVE indicator, mobile menu
    ├── LiveIndicator.tsx              ← LIVE · SOLANA dot + price tooltip
    ├── Hero.tsx                       ← Full-screen hero with parallax bull
    ├── RevealSection.tsx              ← Reusable whileInView wrapper
    ├── StorySection.tsx               ← #story content
    ├── MethodSection.tsx              ← #method 7-factor grid
    ├── IdentityGallery.tsx            ← #identities 7-card stagger grid
    ├── WalletInput.tsx                ← #grades wallet paste + submit
    ├── GradeReveal.tsx                ← 5-step animated Identity reveal
    ├── ScoreBreakdown.tsx             ← Accordion with factor breakdown
    ├── OgCardPreview.tsx              ← Card preview image + download
    ├── ShareButton.tsx                ← X share + native share fallback
    ├── HolderProgress.tsx             ← 1M holder count bar
    └── ErrorState.tsx                 ← Brand-voice error messages
```

---

## 27. Full Code — API Routes

### 27.1 Analyze Route

```typescript
// /app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchWalletData } from "@/lib/helius";
import { calculateScore } from "@/lib/score";
import { generateRoast } from "@/lib/roast";
import { GRADE_COLORS } from "@/lib/constants";

const ERROR_MESSAGES = {
  INVALID_ADDRESS: "The chain doesn't recognise this address. Check it, anon.",
  RATE_LIMITED: "The Black Bull sees all — he's just busy right now. Try again shortly.",
  HELIUS_DOWN: "The trenches are congested right now. Try again in a moment.",
  GENERIC: "Something broke in the trenches. Refresh and try again.",
};

// Simple in-memory rate limiter
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 5, windowMs = 3_600_000): boolean {
  const now = Date.now();
  const log = requestLog.get(ip) ?? [];
  const recent = log.filter((t) => now - t < windowMs);
  requestLog.set(ip, [...recent, now]);
  return recent.length >= limit;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: ERROR_MESSAGES.RATE_LIMITED }, { status: 429 });
  }

  try {
    const { wallet } = await req.json();

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json({ error: ERROR_MESSAGES.INVALID_ADDRESS }, { status: 400 });
    }

    const isValidSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet.trim());
    if (!isValidSolana) {
      return NextResponse.json({ error: ERROR_MESSAGES.INVALID_ADDRESS }, { status: 400 });
    }

    const walletData = await fetchWalletData(wallet.trim());
    const result = calculateScore(walletData);
    const roast = await generateRoast(walletData, result);

    return NextResponse.json({
      wallet: wallet.trim(),
      score: result.score,
      grade: result.grade,
      identity: result.identity,
      roast,
      stats: {
        ansemBalance: walletData.ansemBalance,
        solBalance: walletData.solBalance,
        wifBalance: walletData.wifBalance,
        bonkBalance: walletData.bonkBalance,
        isOgHolder: walletData.isOgHolder,
        receivedAirdrop: walletData.receivedAirdrop,
        walletAgeDays: walletData.walletAgeDays,
      },
      breakdown: result.breakdown,
    });
  } catch (err) {
    console.error("analyze error:", err);
    return NextResponse.json({ error: ERROR_MESSAGES.GENERIC }, { status: 500 });
  }
}
```

---

## 28. Full Code — Helius Wallet Fetcher

```typescript
// /lib/helius.ts
import { ANSEM_MINT, WIF_MINT, BONK_MINT, OG_CUTOFF_DATE, ANSEM_WALLET } from "./constants";
import type { WalletStats } from "./score";

const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

export async function fetchWalletData(wallet: string): Promise<WalletStats> {
  const res = await fetch(HELIUS_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "black-bull-index",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: wallet,
        page: 1,
        limit: 100,
        displayOptions: {
          showFungible: true,
          showNativeBalance: true,
          showZeroBalance: false,
        },
      },
    }),
  });

  if (!res.ok) throw new Error(`Helius error: ${res.status}`);

  const data = await res.json();
  const items = data.result?.items ?? [];
  const nativeLamports = data.result?.nativeBalance?.lamports ?? 0;

  const find = (mint: string) => items.find((t: { id: string }) => t.id === mint);

  const ansemRaw = find(ANSEM_MINT);
  const wifRaw = find(WIF_MINT);
  const bonkRaw = find(BONK_MINT);

  const toHuman = (raw: typeof ansemRaw, defaultDecimals: number) => {
    if (!raw?.token_info?.balance) return 0;
    return raw.token_info.balance / Math.pow(10, raw.token_info.decimals ?? defaultDecimals);
  };

  const ansemBalance = toHuman(ansemRaw, 6);
  const wifBalance = toHuman(wifRaw, 6);
  const bonkBalance = toHuman(bonkRaw, 5);
  const solBalance = nativeLamports / 1e9;

  const { isOgHolder, receivedAirdrop, walletAgeDays } = await checkHistory(wallet, ansemBalance);

  return {
    walletAddress: wallet,
    ansemBalance,
    solBalance,
    wifBalance,
    bonkBalance,
    isOgHolder,
    receivedAirdrop,
    walletAgeDays,
  };
}

async function checkHistory(wallet: string, currentBalance: number) {
  let isOgHolder = false;
  let receivedAirdrop = false;
  let walletAgeDays = 0;

  try {
    // Wallet age via public RPC (no key needed)
    const sigRes = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [wallet, { limit: 1 }],
      }),
    });
    const sigData = await sigRes.json();
    const oldest = sigData.result?.[sigData.result.length - 1];
    if (oldest?.blockTime) {
      walletAgeDays = Math.floor((Date.now() / 1000 - oldest.blockTime) / 86400);
    }

    // Enhanced transactions via Helius for OG + airdrop check
    const txRes = await fetch(
      `https://api.helius.xyz/v0/addresses/${wallet}/transactions` +
        `?api-key=${process.env.HELIUS_API_KEY}&type=TOKEN_TRANSFER&limit=25`,
    );
    const txData = await txRes.json();

    for (const tx of txData ?? []) {
      const transfers = tx.tokenTransfers ?? [];

      for (const t of transfers) {
        if (t.mint !== ANSEM_MINT || t.toUserAccount !== wallet) continue;

        // OG check — received ANSEM before pump
        if (new Date(tx.timestamp * 1000) < OG_CUTOFF_DATE) {
          isOgHolder = true;
        }

        // Airdrop check — came from Ansem's wallet
        if (t.fromUserAccount === ANSEM_WALLET) {
          receivedAirdrop = true;
        }
      }
    }
  } catch {
    // If history check fails, return safe defaults — scoring still works
  }

  return { isOgHolder, receivedAirdrop, walletAgeDays };
}
```

---

## 29. Full Code — Scoring Logic

_(See Section 14.1 — complete)_

---

## 30. Full Code — Roast Generator

_(See Section 15.1 and 15.2 — complete)_

---

## 31. Full Code — OG Image Route

_(See Section 16.3 — complete)_

---

## 32. Rate Limiting Strategy

Two options. Pick one based on deployment preference.

### Option A — In-memory (default, zero setup)

Already implemented in Section 27.1. Resets on Vercel cold start. Good enough for MVP.

### Option B — Vercel KV (persistent across cold starts)

```typescript
// /lib/rateLimit.ts
import { kv } from "@vercel/kv";

export async function isRateLimitedKV(ip: string): Promise<boolean> {
  const key = `rl:${ip}:${new Date().toISOString().slice(0, 10)}`; // daily key
  const count = await kv.incr(key);
  if (count === 1) await kv.expire(key, 86400); // expire after 24h
  return count > 5; // 5 checks per IP per day
}
```

Apply in analyze route: `if (await isRateLimitedKV(ip)) return 429 response`

---

## 33. Fallback System

The tool never shows a broken state. Priority order:

```
Tier 1: Groq llama-3.3-70b     → personalised, cinematic roast (ideal)
         ↓ (rate limited or API error)
Tier 2: Template roasts         → pre-written, grade-matched, randomly selected
         ↓ (Helius down)
Tier 3: Graceful brand error    → "The trenches are congested. Try again in a moment."
         ↓ (complete outage)
Tier 4: Static fallback page    → "The Index is temporarily offline. The chain is still running."
```

Users never see stack traces, generic 500 pages, or broken UI.

---

## 34. Deployment — Vercel

### 34.1 Initial deploy

```bash
# 1. Create project
npx create-next-app@latest black-bull-index --typescript --tailwind --app
cd black-bull-index

# 2. Install dependencies
npm install framer-motion groq-sdk
npm install @vercel/kv   # optional

# 3. Add /public/bull.png — generate via Higgsfield first (Section 24)

# 4. Local dev
npm run dev   # http://localhost:3000

# 5. Deploy
npx vercel
```

### 34.2 Environment variables (Vercel Dashboard)

```
HELIUS_API_KEY         → helius.dev free account
GROQ_API_KEY           → console.groq.com free account
NEXT_PUBLIC_APP_URL    → https://blackbullindex.xyz
KV_REST_API_URL        → Vercel KV (optional)
KV_REST_API_TOKEN      → Vercel KV (optional)
```

### 34.3 Custom domain

- `blackbullindex.xyz` on Namecheap (~₹800/year one-time)
- Vercel Dashboard → Project → Domains → Add
- SSL automatic via Let's Encrypt

### 34.4 Vercel free tier limits

| Resource                  | Limit        | Notes                 |
| ------------------------- | ------------ | --------------------- |
| Bandwidth                 | 100 GB/month | ~2M page views        |
| Serverless fn invocations | 100K/month   | Each /api/analyze = 1 |
| Edge fn invocations       | 1M/month     | /api/og = edge fn     |
| Build minutes             | 6K/month     | More than enough      |

---

## 35. Build Milestones

Expanded from v1.0 to account for site architecture (5 days → 6 days).

### Day 1 — Constants, scoring, Helius

- [ ] `npx create-next-app` — Next.js 15 + Tailwind + App Router
- [ ] Create Helius account, get API key, test RPC in Postman
- [ ] `/lib/constants.ts` — mint addresses, IDENTITIES, weights
- [ ] `/lib/helius.ts` — `fetchWalletData()`
- [ ] `/lib/score.ts` — `calculateScore()`, `assignGrade()`
- [ ] Test with 10 real Solana wallets via direct function call
- [ ] Verify ANSEM balance reads correctly against Solscan

### Day 2 — Roasts, OG image

- [ ] Create Groq account, get API key
- [ ] `/lib/roastTemplates.ts` — all 21 templates (3 × 7 grades)
- [ ] `/lib/roast.ts` — `generateRoast()` with Groq + template fallback
- [ ] `/app/api/og/route.tsx` — Satori card image (edge runtime)
- [ ] Test OG image at `/api/og?grade=S%2B&score=94&roast=...`
- [ ] Validate in Twitter card validator: `cards-dev.twitter.com/validator`
- [ ] Generate bull hero image via Higgsfield → save to `/public/bull.png`

### Day 3 — API route + result page

- [ ] `/app/api/analyze/route.ts` — POST handler, validation, rate limiting
- [ ] `/app/result/[wallet]/page.tsx` — SSR fetch + `generateMetadata()`
- [ ] `/components/GradeReveal.tsx` — 5-step animation sequence (Section 20)
- [ ] `/components/ScoreBreakdown.tsx` — accordion
- [ ] `/components/OgCardPreview.tsx` — card image + download
- [ ] `/components/ShareButton.tsx` — X share + native share
- [ ] Test full end-to-end: paste wallet → score → reveal → share

### Day 4 — Landing page (scroll sections)

- [ ] `/app/page.tsx` — full scroll layout with section anchors
- [ ] `/components/Hero.tsx` — "THE BLACK BULL" + bull image + parallax
- [ ] `/components/StorySection.tsx` — origin narrative (Section 6 copy)
- [ ] `/components/MethodSection.tsx` — 7-factor grid (Section 7 copy)
- [ ] `/components/IdentityGallery.tsx` — 7 Identity cards + stagger animation
- [ ] `/components/WalletInput.tsx` — paste input + submit (Section 25)
- [ ] Scroll animations with Framer Motion (`npm install framer-motion`)

### Day 5 — Nav, LIVE indicator, mobile, embedded features

- [ ] `/components/Nav.tsx` — fixed nav, Sign in → Read the Chain, mobile hamburger
- [ ] `/components/LiveIndicator.tsx` — DexScreener heartbeat + price tooltip
- [ ] `/components/HolderProgress.tsx` — 1M holder count bar
- [ ] `globals.css` — orbit ring animations, base type scale
- [ ] Mobile responsive pass (Section 21) — hero text scaling, grid breakpoints
- [ ] Error states — all messages matched to brand voice (Section 22)

### Day 6 — Polish, QA, deploy

- [ ] Rate limiting — verify in-memory limit works (or switch to Vercel KV)
- [ ] Fallback system — test by disabling Groq key, verify template roasts fire
- [ ] Full mobile test on iPhone (Safari) and Android (Chrome)
- [ ] Test OG card renders correctly when link shared on X (Twitter card validator)
- [ ] Performance: Lighthouse score > 90 on desktop, > 75 mobile
- [ ] Deploy to Vercel (`npx vercel --prod`)
- [ ] Connect custom domain, verify SSL
- [ ] Final end-to-end test: 10 different wallets, all 7 Identity tiers hit
- [ ] Share to Ansem (@blknoiz06) on X

---

## 36. Embedded Features

### 36.1 Live $ANSEM Holder Progress Bar

```typescript
// /components/HolderProgress.tsx
"use client"
import { useEffect, useState } from "react"

const ANSEM_TOKEN = "9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump"
const TARGET      = 1_000_000

export function HolderProgress() {
  const [holders, setHolders] = useState<number | null>(null)

  useEffect(() => {
    fetch(`https://api.dexscreener.com/latest/dex/tokens/${ANSEM_TOKEN}`)
      .then(r => r.json())
      .then(d => {
        const h = d.pairs?.[0]?.info?.holders
        if (h) setHolders(h)
      })
      .catch(() => {})
  }, [])

  if (!holders) return null

  const pct = Math.min(100, (holders / TARGET) * 100)

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border border-zinc-900 rounded-xl">
      <div className="flex justify-between text-xs text-zinc-600 mb-2 tracking-widest uppercase">
        <span>1M Holder Mission</span>
        <span>{holders.toLocaleString()} / 1,000,000</span>
      </div>
      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-zinc-700 mt-1 text-right">
        {pct.toFixed(2)}% complete
      </div>
    </div>
  )
}
```

### 36.2 Live Price Ticker (header)

```typescript
// In Nav.tsx — fetched client-side, updates every 30s via LiveIndicator
// Display: $ANSEM $0.098432 (+12.3%)
const tickerText = `$ANSEM $${price} (${changePrefix}${change24h.toFixed(1)}%)`;
```

---

## 37. Future Enhancements — v3

Not in scope for the gift build. Build only after Ansem acknowledges.

| Feature                         | Description                                                         | Effort |
| ------------------------------- | ------------------------------------------------------------------- | ------ |
| **Phantom wallet connect**      | One-click connect instead of paste — `@solana/wallet-adapter-react` | Easy   |
| **Identity leaderboard**        | Top 100 wallets by score, public ranking by Identity tier           | Medium |
| **Re-grade CTA**                | "Buy more ANSEM → check your new Identity" loop                     | Easy   |
| **Downloadable identity badge** | PNG download sized for X profile picture (400×400)                  | Medium |
| **Weekly score snapshots**      | Supabase stores historical scores, shows movement over time         | Hard   |
| **Multi-wallet compare**        | Enter two wallets, side-by-side Identity comparison                 | Medium |
| **Ansem's Airdrop Engine**      | Separate tool — Ansem uses it to run weekly drops fairly            | Medium |
| **Telegram share**              | Pre-filled Telegram message alongside X share                       | Easy   |
| **Identity NFT mint**           | Permanent on-chain proof of Identity (compressed NFT, free)         | Hard   |

---

## 38. Launch Strategy — 5 Plays to Get Ansem's Eyes On It

Ranked by probability of actually working. Do these in order.

---

### Play 1 — Run Ansem's own wallet first _(highest probability, do this first)_

His wallet is public on-chain. He will score S+ / The Architect — 604M ANSEM, OG by
definition, the person who built the entire thesis. Run it, generate his card, post it.

**Why it's almost impossible to ignore:**

- His community will tag him in the replies before you do anything else
- The card is flattering but the data says it — not you. Doesn't read like begging.
- His own wallet generating the highest Identity is the most natural demo of the tool
- If the roast is good enough, he shares it himself

**Exact post copy — use verbatim:**

```
I built something for the $ANSEM community.

I ran @blknoiz06's wallet through it first.

Identity: THE ARCHITECT — 100/100

"604M $ANSEM held. $7M distributed. OG from day one. The chain reads the builder the
same way it reads everyone else — transaction by transaction. Yours reads like a plan
executed exactly as intended. There is nothing left to say."

Every wallet has an Identity.
Check yours → [LINK]

#BlackBull #ANSEM #Solana
```

**Post timing:** Post this the moment the tool is live — not before. The link must work
when his community clicks it within minutes of him seeing the tweet.

**Thread continuation (optional — post as reply to your own tweet):**

```
Built on:
→ Helius (reads the chain)
→ Groq (writes the verdict)
→ Satori (generates the card)
→ Vercel (hosts it)

Monthly cost: $0. Built as a gift. No token. No monetisation.

7 Identities. One chain. Which one are you?
```

---

### Play 2 — Seed 10–15 ANSEM micro-influencers before public launch

Before any public post, identify 10–15 people with 5K–50K followers who are visibly
active $ANSEM holders. Find them by searching X for "$ANSEM" and filtering for accounts
with real engagement (not bots).

**DM template — keep it this short:**

```
Hey — I built a tool that reads Solana wallets and assigns one of 7 Identities based
on $ANSEM holdings and on-chain history. Built it as a gift to the community, no
monetisation.

You're one of the first 15 people to see it. Check your Identity:
[LINK]

If you like it, a share would mean a lot.
```

**Why this works before Play 1:** If 5 of the 15 share their Identity card, that's
potentially 50K–200K impressions within Ansem's exact audience before you ever tag him.
He sees it through his community first — which is more credible than seeing it cold
from an unknown account.

---

### Play 3 — The data thread (post 48 hours after launch)

After 48 hours of real traffic, pull stats and post a thread. Crypto Twitter shares
data obsessively if the numbers are specific and the narrative is clean.

**Exact thread copy:**

```
Tweet 1:
I ran the first 1,000 $ANSEM wallets through the Black Bull Index.

Here's what the chain actually says about who holds this token:

🏆 THE ARCHITECT (S+): 47 wallets
🟡 THE FAITHFUL (S): 112 wallets
🟢 THE CONVERT (A): 203 wallets
🔵 THE CURIOUS (B): 289 wallets
⬜ THE TOURIST (C): 198 wallets
🔴 THE GHOST (D): 89 wallets — received Ansem's airdrop and sold
⬛ THE UNAWAKENED (F): 62 wallets

---

Tweet 2:
The 89 Ghost wallets sold an average of $[X] each.

Combined, they left $[TOTAL] on the table.

The ANSEM they sold went to wallets now classified as Architects.

The chain documents both sides of every transaction.

---

Tweet 3:
Only 4.7% of wallets checked hold enough $ANSEM to qualify as Architects.

The 1M holder mission is at [X]% completion.

Every wallet that checks their Identity is one more node in that mission.

Check yours → [LINK] @blknoiz06
```

**Fill in the real numbers** from actual usage before posting. Made-up numbers will
be fact-checked and will damage credibility.

---

### Play 4 — Reply to Ansem's next airdrop announcement

Ansem posts every time he picks airdrop winners. The moment that tweet goes live,
reply in the first 10 minutes — early replies on high-engagement tweets get seen.

**Reply copy (keep it very short — this is a reply, not a pitch):**

```
Built something so the Ghosts know what they missed and the Architects know
where they stand.

Black Bull Index — reads any Solana wallet, assigns your Identity.

→ [LINK]
```

Do not pitch. Do not explain. The link does the work.
Reply to the tweet itself — not a comment thread, not a QT.

---

### Play 5 — The Ghost Hall of Shame thread

Find wallets (public, on-chain) that received the airdrop and sold within the first
24 hours. Post the stats as a thread — no wallet addresses, just aggregate facts.
This generates controversy. Ansem holders pile on. Ansem has talked about paper hands
publicly — this is exactly his narrative.

**Thread copy:**

```
Tweet 1:
The Black Bull Index identified the wallets that received Ansem's stimmy
and sold the fastest.

Some numbers from the chain:

Fastest Ghost: sold within 4 minutes of receipt
Most left on table: $[X]
Average Ghost holding period: [Y] hours
Combined value abandoned: $[Z]

---

Tweet 2:
These wallets are now The Ghost on the Black Bull Index.

Their Identity card reads:

"The exit liquidity you provided went to wallets now classified as Architects.
The chain wrote this. Not us."

---

Tweet 3:
The chain writes everything down.

Every airdrop received. Every sell. Every wallet that held and every one that didn't.

Find out where you stand → [LINK] @blknoiz06

#ANSEM #BlackBull
```

---

### Launch sequence summary

```
Day 0 (launch day):
  09:00 — Seed 10–15 micro-influencers via DM
  12:00 — Post Play 1 (Ansem's wallet card)
  12:05 — Post thread continuation as reply

Day 1:
  Monitor which micro-influencers shared
  Reply to every single comment on Play 1 post — drives engagement signal

Day 2:
  Post Play 3 (data thread) with real numbers from Day 0–1 traffic

Ongoing:
  Monitor Ansem's X for next airdrop announcement → deploy Play 4 immediately
  After 5K+ wallets checked → run Ghost numbers → deploy Play 5
```

---

## Appendix A — Key Resources

| Resource                   | URL                                                                   |
| -------------------------- | --------------------------------------------------------------------- |
| Helius dashboard           | `helius.dev`                                                          |
| Helius DAS API docs        | `helius.dev/docs/das-api`                                             |
| Groq console               | `console.groq.com`                                                    |
| DexScreener ANSEM          | `dexscreener.com/solana/9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump` |
| Next.js ImageResponse docs | `nextjs.org/docs/app/api-reference/functions/image-response`          |
| Framer Motion docs         | `framer.com/motion`                                                   |
| Vercel KV docs             | `vercel.com/docs/storage/vercel-kv`                                   |
| Twitter card validator     | `cards-dev.twitter.com/validator`                                     |
| Solana explorer            | `solscan.io`                                                          |
| Tailwind CSS               | `tailwindcss.com/docs`                                                |

---

## Appendix B — ANSEM Token Facts (for roast + copy context)

- **Contract:** `9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump`
- **Nickname:** The Black Bull
- **Launch:** ~June 17, 2026 on Pump.fun
- **Deployer cost:** ~$6,300 to create
- **Ansem holds:** ~604M tokens (~60–65% of supply)
- **Creator fees earned:** $200K–$378K in first week
- **Airdrop distributed:** ~$7M in Jun 27–29 to grow holders
- **Peak market cap:** ~$120M FDV
- **Current mission:** 25,000 → 1,000,000 holders
- **Ansem's Pump.fun profile:** `ansemconzimp`
- **Ansem's X handle:** `@blknoiz06`
- **OG cutoff date (for scoring):** June 25, 2026 (before the 20,000% run)

---

_Spec v2.0 — Whereto Studios · Black Bull Index · Built to gift to Ansem (@blknoiz06)_  
_Every wallet is a memoir written in transactions. We read the chain and reveal who you truly are._
