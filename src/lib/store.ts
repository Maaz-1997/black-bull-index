// Persistence layer for the leaderboard + per-wallet 24h cache + per-IP daily cap.
// SERVER-ONLY: reads the Cloudflare D1 binding via globalThis.__env__.DB (Nitro sets it in the
// cloudflare-module handler and in dev). When no D1 is bound (local dev/tests), falls back to an
// in-memory store so the app still runs. Import this only from server-fn handlers.

export const WALLET_TTL_SECONDS = 86_400; // a wallet is freshly analysed at most once / 24h
export const IP_DAILY_CAP = 50; // max fresh analyses per IP per day (cached hits don't count)

export interface WalletRecord {
  address: string;
  grade: string;
  score: number;
  identity: string;
  ansemBalance: number;
  isOg: boolean;
  roast: string;
  data: string; // JSON WalletStats — reconstructs the full reveal on a cache hit
  analyzedAt: number; // unix seconds
}

export interface WalletStore {
  getWallet(address: string): Promise<WalletRecord | null>;
  upsertWallet(rec: WalletRecord): Promise<void>;
  topWallets(limit: number, identity?: string): Promise<WalletRecord[]>;
  rankFor(score: number): Promise<{ rank: number; total: number }>;
  /** Total wallets the Index has read — powers the 1M "herd" progress. */
  count(): Promise<number>;
  /** Increment and return the caller's fresh-analysis count for `day`. */
  bumpIpUsage(ip: string, day: string): Promise<number>;
}

export function dayKey(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

/* ---------- minimal D1 typings (avoids adding @cloudflare/workers-types) ---------- */

interface D1Prepared {
  bind(...values: unknown[]): D1Prepared;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}
interface D1Like {
  prepare(query: string): D1Prepared;
}
interface WalletRow {
  address: string;
  grade: string;
  score: number;
  identity: string;
  ansem_balance: number;
  is_og: number;
  roast: string;
  data: string;
  analyzed_at: number;
}

function rowToRecord(r: WalletRow): WalletRecord {
  return {
    address: r.address,
    grade: r.grade,
    score: r.score,
    identity: r.identity,
    ansemBalance: r.ansem_balance,
    isOg: r.is_og === 1,
    roast: r.roast,
    data: r.data,
    analyzedAt: r.analyzed_at,
  };
}

/* ---------- D1-backed store (production) ---------- */

class D1Store implements WalletStore {
  constructor(private db: D1Like) {}

  async getWallet(address: string): Promise<WalletRecord | null> {
    const row = await this.db
      .prepare("SELECT * FROM wallets WHERE address = ?")
      .bind(address)
      .first<WalletRow>();
    return row ? rowToRecord(row) : null;
  }

  async upsertWallet(r: WalletRecord): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO wallets (address, grade, score, identity, ansem_balance, is_og, roast, data, analyzed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(address) DO UPDATE SET
           grade=excluded.grade, score=excluded.score, identity=excluded.identity,
           ansem_balance=excluded.ansem_balance, is_og=excluded.is_og,
           roast=excluded.roast, data=excluded.data, analyzed_at=excluded.analyzed_at`,
      )
      .bind(
        r.address,
        r.grade,
        r.score,
        r.identity,
        r.ansemBalance,
        r.isOg ? 1 : 0,
        r.roast,
        r.data,
        r.analyzedAt,
      )
      .run();
  }

  async topWallets(limit: number, identity?: string): Promise<WalletRecord[]> {
    const stmt = identity
      ? this.db
          .prepare("SELECT * FROM wallets WHERE identity = ? ORDER BY score DESC LIMIT ?")
          .bind(identity, limit)
      : this.db.prepare("SELECT * FROM wallets ORDER BY score DESC LIMIT ?").bind(limit);
    const { results } = await stmt.all<WalletRow>();
    return results.map(rowToRecord);
  }

  async rankFor(score: number): Promise<{ rank: number; total: number }> {
    const above = await this.db
      .prepare("SELECT COUNT(*) AS c FROM wallets WHERE score > ?")
      .bind(score)
      .first<{ c: number }>();
    const totalRow = await this.db
      .prepare("SELECT COUNT(*) AS t FROM wallets")
      .first<{ t: number }>();
    return { rank: (above?.c ?? 0) + 1, total: totalRow?.t ?? 0 };
  }

  async count(): Promise<number> {
    const row = await this.db.prepare("SELECT COUNT(*) AS t FROM wallets").first<{ t: number }>();
    return row?.t ?? 0;
  }

  async bumpIpUsage(ip: string, day: string): Promise<number> {
    const row = await this.db
      .prepare(
        `INSERT INTO ip_usage (ip, day, count) VALUES (?, ?, 1)
         ON CONFLICT(ip, day) DO UPDATE SET count = count + 1
         RETURNING count`,
      )
      .bind(ip, day)
      .first<{ count: number }>();
    return row?.count ?? 1;
  }
}

/* ---------- in-memory store (dev / tests) ---------- */

export class MemoryStore implements WalletStore {
  private wallets = new Map<string, WalletRecord>();
  private ip = new Map<string, number>();

  async getWallet(address: string): Promise<WalletRecord | null> {
    return this.wallets.get(address) ?? null;
  }
  async upsertWallet(r: WalletRecord): Promise<void> {
    this.wallets.set(r.address, { ...r });
  }
  async topWallets(limit: number, identity?: string): Promise<WalletRecord[]> {
    return [...this.wallets.values()]
      .filter((w) => !identity || w.identity === identity)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
  async rankFor(score: number): Promise<{ rank: number; total: number }> {
    const all = [...this.wallets.values()];
    const rank = all.filter((w) => w.score > score).length + 1;
    return { rank, total: all.length };
  }
  async count(): Promise<number> {
    return this.wallets.size;
  }
  async bumpIpUsage(ip: string, day: string): Promise<number> {
    const key = `${ip}:${day}`;
    const next = (this.ip.get(key) ?? 0) + 1;
    this.ip.set(key, next);
    return next;
  }
}

let memoryStore: MemoryStore | undefined;

export function getStore(): WalletStore {
  const db = (globalThis as { __env__?: { DB?: D1Like } }).__env__?.DB;
  if (db) return new D1Store(db);
  memoryStore ??= new MemoryStore();
  return memoryStore;
}
