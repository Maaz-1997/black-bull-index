// Server-only secret/var accessor.
//
// Secrets resolve from different places depending on the runtime:
//   - Node / local dev / tests  → process.env
//   - Cloudflare Workers (prod) → the env object, which Nitro's cloudflare-module handler exposes
//     as globalThis.__env__ (this is also where the D1 `DB` binding lives — see store.ts).
//
// Reading process.env alone means a secret set via `wrangler secret put` can be invisible in the
// deployed worker, silently disabling Groq (roasts fall back to templates). Check both so keys
// resolve everywhere. Import only from server functions.
export function serverEnv(name: string): string | undefined {
  const fromProcess = typeof process !== "undefined" && process.env ? process.env[name] : undefined;
  if (fromProcess) return fromProcess;
  const cf = (globalThis as { __env__?: Record<string, unknown> }).__env__?.[name];
  return typeof cf === "string" && cf ? cf : undefined;
}

// Collects an ordered list of keys for a provider, so a request can fall back to the next key when
// one is rate-limited or down. Two ways to supply extras (both supported, deduped):
//   - numbered vars:   HELIUS_API_KEY, HELIUS_API_KEY_2, HELIUS_API_KEY_3, ...
//   - comma-separated: HELIUS_API_KEY="keyA,keyB,keyC"
// Set these as Cloudflare Worker secrets (`wrangler secret put HELIUS_API_KEY_2`, etc.).
export function serverEnvKeys(name: string): string[] {
  const keys: string[] = [];
  const add = (raw: string | undefined) => {
    if (!raw) return;
    for (const part of raw.split(",")) {
      const k = part.trim();
      if (k && !keys.includes(k)) keys.push(k);
    }
  };
  add(serverEnv(name));
  for (let i = 2; i <= 6; i++) add(serverEnv(`${name}_${i}`));
  return keys;
}
