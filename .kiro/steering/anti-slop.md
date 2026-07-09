---
inclusion: always
---

# The Anti-Slop Contract

"AI slop" is low-quality, generic, half-thought-out output. It is banned here. This is a luxury,
cinematic, production-grade gift for a public figure and his community — it will be screenshotted and
shared. Every line you write should look like it came from a senior engineer who cares about the craft.

## Banned outright

- **Placeholder/fake work:** no `// TODO: implement`, no `throw new Error("not implemented")`, no mock
  wallet data left in a real code path, no commented-out dead code, no "example" stubs presented as done.
- **Hallucinated APIs:** never invent a library function, prop, env var, or endpoint. Do not guess the
  Helius/Groq/DexScreener response shape — use the exact fields documented in `black-bull-index.md`
  §13/§27–§31. If unsure, check the codebase/docs or ask. Do not guess import paths.
- **Changing canonical content:** never rephrase brand copy, rename an Identity, or alter a scoring
  weight/threshold/colour. Those are fixed in the spec. Copy them verbatim.
- **Generic boilerplate comments:** no `// set the variable`, no restating code in English. Comment
  _why_, not _what_, and only where a senior would.
- **Console noise / debug litter:** no stray `console.log`, leftover test files, or scratch scripts.
- **Over-engineering:** no premature abstraction, no design patterns for their own sake, no config
  options nobody asked for, no state management library when a prop will do.
- **Under-engineering:** no happy-path-only code. Handle loading, empty, invalid-address, provider-down,
  over-quota, and zero-balance states — this reads real wallets where failure is visible and shared.
- **Filler prose:** no "You're absolutely right", no padded summaries, no emoji spray. Say what changed
  and why, briefly.

## Required on every change

- **Read before you write.** Understand the existing `bbi/*` pattern and match it. Consistency with the
  Lovable code beats your personal preference.
- **Make it real.** Wire it end-to-end. If you say the analyze flow is done, pasting a wallet must
  produce a real score, Identity, and roast — demonstrably.
- **Handle the unhappy paths.** Validate the address, guard nulls, catch provider errors, fall back to
  template roasts, and surface failures in the **brand voice** (spec §22) — never a raw stack trace.
- **Security & privacy by default.** Read-only on-chain data only; never request wallet connection or
  keys. Secrets stay server-side. Validate/escape all external input. Only public on-chain data is
  stored (wallets are publicly ranked, Phase 6) — never store secrets or non-public user data.
- **Preserve the cinematic bar.** Respect `prefers-reduced-motion`, no layout shift, no jank, 44px tap
  targets, keyboard/focus handling. The reveal must feel deliberate and premium.
- **Stay free-tier safe.** Rate-limit, cache prices, and fall back rather than blowing a quota.

## The self-review before you finish

Before reporting a task done, re-read your own diff and ask:

1. Would a senior engineer approve this in review, or call it sloppy?
2. Does it match the spec exactly — copy verbatim, weights unchanged, nothing faked, nothing missing?
3. Did I verify it runs (`bun run build` / the dev server), not just assume?
4. Did I touch only what this task needs, and leave the Lovable UI visually identical?
5. Are all failure/edge states handled in brand voice?
   If any answer is "no", fix it before saying it's done. **Correctness and craft over speed, always.**
