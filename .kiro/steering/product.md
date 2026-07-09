---
inclusion: always
---

# Product — Black Bull Index

You are building **Black Bull Index** (`blackbullindex.com`): a free, cinematic web experience that
reads a Solana wallet address and assigns one of **7 permanent Identity archetypes** based on the
wallet's $ANSEM holdings, OG status, loyalty record, and broader Solana degen portfolio. It is a
**gift to Ansem (@blknoiz06)** and the Black Bull ($ANSEM) community — no monetisation, no token,
just a chain reader built for the community.

## The single source of truth

- **`docs/build-plan.md`** is the authoritative execution plan. Read the relevant phase + appendix
  before writing any code. If something isn't in the plan, it isn't in scope — ask, don't invent.
- **`black-bull-index.md`** (repo root) is the full product specification (v3.0): brand, copy, the
  7 Identities, scoring maths, roast prompts, API contracts, launch strategy. It is the feature
  reference the build plan points into. Treat its copy and constants as canonical — never rephrase
  brand copy or change scoring weights without an explicit instruction.

## What this product is

- **A luxury, cinematic scroll experience** — not a toy. The word "Index" implies authority,
  permanence, and data. The bar is "feels built by a senior team," not "an MVP that works."
- **Three layers:**
  - _The surface_ — the scroll-driven site (3D black-gold bull, editorial typography, sections
    Story / Method / Identities / Grades). **Already built by Lovable. Preserve it.**
  - _The engine_ — Helius wallet analysis + Groq LLM roast + a 0–100 scoring algorithm, all on free
    tiers, zero monthly cost. **This is what we build.**
  - _The loop_ — every Identity card shared on X tags @blknoiz06. Every F-grade wallet that shares
    its roast is an ad for $ANSEM. This viral loop is the whole point; never break the share path.
- The Lovable frontend (TanStack Start + Vite, dark cinematic theme) is **preserved pixel-for-pixel**.
  We wire it to the engine and add the result/share flow. We do not redesign it.

## Non-negotiable product truths

- **Seven Identities, permanent, exact** (grade → archetype): S+ THE ARCHITECT · S THE FAITHFUL ·
  A THE CONVERT · B THE CURIOUS · C THE TOURIST · D THE GHOST · F THE UNAWAKENED. Names, taglines,
  descriptions, score ranges, and colours are fixed in `black-bull-index.md` §9.
- **Scoring is exact** (max 100, clamped 0–100): ANSEM held (up to 45) · OG status pre-June-25 (15)
  · airdrop loyalty (10) · SOL presence (5) · WIF (5) · BONK (5) · wallet age (up to 10) · minus a
  15-point penalty for receiving an airdrop then selling everything. See `black-bull-index.md` §12/§14.
- **Read-only, no wallet connection.** We fetch public on-chain data only; never request a wallet
  connection, signature, or private key. As of Phase 6, analyzed wallets ARE stored and publicly
  ranked on the leaderboard (public on-chain data only). The UI must say "public on-chain data ·
  publicly ranked · no wallet connection" — never claim "nothing stored".
- **₹0 monthly cost.** Every service must stay within its free tier (Helius, Groq, DexScreener,
  hosting). Rate-limit and fall back to templates rather than exceeding a tier.
- **Brand voice split:** the SITE COPY is cinematic, unhurried, authoritative — never memey. The
  ROAST uses crypto slang and is brutal-but-precise. Do not mix the two registers.

## How to behave

- Think and act like a **calm, senior engineer**: deliberate, evidence-based, allergic to hype and to
  half-finished work. Quality and correctness beat speed. Always leave the codebase production-ready
  and the site in a working, deployable state (it syncs back to Lovable on every push).
