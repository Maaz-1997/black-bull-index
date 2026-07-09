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

// Every env/secret name visible to the worker (process.env in Node/dev, __env__ on Cloudflare).
function allEnvNames(): string[] {
  const names = new Set<string>();
  if (typeof process !== "undefined" && process.env) {
    for (const k of Object.keys(process.env)) names.add(k);
  }
  const cf = (globalThis as { __env__?: Record<string, unknown> }).__env__;
  if (cf) for (const k of Object.keys(cf)) names.add(k);
  return [...names];
}

// Collects an ordered list of keys for a provider, so a request can fall back to the next key when
// one is rate-limited or down. Keys can be supplied any of these ways (all supported, deduped):
//   - the canonical name:  HELIUS_API_KEY / GROQ_API_KEY   (tried first)
//   - numbered variants:   HELIUS_API_KEY_2, HELIUS_API_KEY_3, ...
//   - comma-separated:     HELIUS_API_KEY="keyA,keyB,keyC"
//   - loosely-named siblings whose name simply contains the same tokens, e.g. HELIUS_API1_KEY,
//     HELIUS2_API_KEY, GROQ2_API_KEY — so a mis-suffixed secret still contributes.
// Set these as Cloudflare Worker secrets (dashboard or `wrangler secret put <NAME>`).
export function serverEnvKeys(name: string): string[] {
  const keys: string[] = [];
  const add = (raw: string | undefined) => {
    if (!raw) return;
    for (const part of raw.split(",")) {
      const k = part.trim();
      if (k && !keys.includes(k)) keys.push(k);
    }
  };

  // 1. Canonical + numbered variants first (deterministic priority order).
  add(serverEnv(name));
  for (let i = 2; i <= 6; i++) add(serverEnv(`${name}_${i}`));

  // 2. Loosely-named siblings: any env var whose name contains the same tokens in order
  //    (e.g. HELIUS_API_KEY → /HELIUS.*API.*KEY/i). Catches inconsistent suffixes without
  //    cross-matching a different provider (HELIUS never matches GROQ and vice versa).
  const tokens = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (tokens.length) {
    const re = new RegExp(
      tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*"),
      "i",
    );
    for (const envName of allEnvNames()) {
      if (re.test(envName)) add(serverEnv(envName));
    }
  }

  return keys;
}
