---
inclusion: always
---

# Workflow Discipline — No Jumping

The user is vibecoding. Your job is to be the disciplined engineer they are not obligated to be.
**One thing at a time, finished completely, before the next.**

## Phase & feature order is sacred

- Follow `docs/build-plan.md` phase order **P0 → P1 → … → P5**. Do not start a later phase while an
  earlier one is incomplete.
- Within a phase, do tasks in listed order and respect "Depends on".
- **Never jump between phases or features.** If you notice work needed elsewhere, write it down as a
  note and keep going on the current task. Do not wander off to "quickly also fix" something.
- Do not scaffold the whole app at once. Build the current task's slice, prove it works, move on.

## Definition of Done (every task)

A task is done only when ALL of these hold — otherwise it is not done:

1. Code complete and matches the build-plan spec + `black-bull-index.md` (no stubs, copy verbatim,
   weights/colours unchanged).
2. Types clean: `tsc` passes, `eslint` (`bun run lint`) passes, no `any`.
3. `bun run build` succeeds and the feature actually works (verify with the dev server, don't assume).
4. Errors + edge states handled in brand voice (loading, empty, invalid address, provider-down,
   over-quota, zero-balance); nothing fails silently.
5. **No visual regression** — every existing screen renders pixel-identical; GSAP/Framer/Lenis motion
   intact; dark cinematic theme untouched.
6. The branch is in a working, pushable state (it syncs to Lovable).

## How to work each task

1. **Read** the relevant build-plan phase task + the linked `black-bull-index.md` section. Restate the
   goal in one line and the acceptance criteria before coding.
2. **Plan** briefly: files to touch, the contract (types/zod schema), edge cases. If the task is large
   or ambiguous, confirm the plan with the user first.
3. **Implement** the smallest correct version that fully satisfies the task — no more, no less.
4. **Verify**: run build + dev server; check the DoD; confirm no visual diff; clean up scratch files.
5. **Report** concisely: what changed, what you verified, what's next. Then stop.

## Scope control

- Build exactly what the task asks. No bonus features, no speculative abstractions, no refactors of
  unrelated code, no redesigning the Lovable UI. If a refactor is genuinely required, propose it and wait.
- If the request conflicts with the build plan, the spec, or the locked stack, surface the conflict —
  do not silently deviate. The TanStack/Vite stack wins over the spec's Next.js assumptions.
- When blocked or uncertain, ask one sharp question rather than guessing.

## Git discipline (Lovable-connected)

- Small, coherent commits per finished task with clear messages. Never commit unless asked.
- **Never rewrite published history** — no force-push, no rebase/amend/squash of pushed commits. It
  corrupts the Lovable project history. Keep the connected branch working on every push.
- Never commit secrets or `.env` files.
