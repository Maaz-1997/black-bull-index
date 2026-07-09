-- Black Bull Index — D1 schema (Phase 6).
-- Apply with: wrangler d1 migrations apply black-bull-index  (or `wrangler d1 execute ... --file`).

CREATE TABLE IF NOT EXISTS wallets (
  address       TEXT PRIMARY KEY,
  grade         TEXT    NOT NULL,
  score         INTEGER NOT NULL,
  identity      TEXT    NOT NULL,
  ansem_balance REAL    NOT NULL DEFAULT 0,
  is_og         INTEGER NOT NULL DEFAULT 0,
  roast         TEXT    NOT NULL DEFAULT '',
  data          TEXT    NOT NULL DEFAULT '{}',  -- JSON WalletStats, to reconstruct the reveal on a cache hit
  analyzed_at   INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wallets_score ON wallets(score DESC);

-- Per-IP daily usage for the abuse cap (fresh analyses only).
CREATE TABLE IF NOT EXISTS ip_usage (
  ip    TEXT    NOT NULL,
  day   TEXT    NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, day)
);
