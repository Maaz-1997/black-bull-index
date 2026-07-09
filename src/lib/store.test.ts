import { test, expect } from "bun:test";
import { MemoryStore, dayKey, type WalletRecord } from "./store";

function rec(address: string, score: number, identity = "THE ARCHITECT"): WalletRecord {
  return {
    address,
    grade: "S+",
    score,
    identity,
    ansemBalance: 1000,
    isOg: false,
    roast: "r",
    data: "{}",
    analyzedAt: Math.floor(Date.now() / 1000),
  };
}

test("upsert + getWallet round-trips and overwrites", async () => {
  const s = new MemoryStore();
  await s.upsertWallet(rec("A", 50));
  expect((await s.getWallet("A"))?.score).toBe(50);
  await s.upsertWallet(rec("A", 80));
  expect((await s.getWallet("A"))?.score).toBe(80);
  expect(await s.getWallet("missing")).toBeNull();
});

test("topWallets orders by score desc and filters by identity", async () => {
  const s = new MemoryStore();
  await s.upsertWallet(rec("A", 30, "THE TOURIST"));
  await s.upsertWallet(rec("B", 90, "THE ARCHITECT"));
  await s.upsertWallet(rec("C", 60, "THE CONVERT"));
  const top = await s.topWallets(10);
  expect(top.map((w) => w.address)).toEqual(["B", "C", "A"]);
  const architects = await s.topWallets(10, "THE ARCHITECT");
  expect(architects).toHaveLength(1);
  expect(architects[0].address).toBe("B");
});

test("rankFor gives 1-based rank and total", async () => {
  const s = new MemoryStore();
  await s.upsertWallet(rec("A", 90));
  await s.upsertWallet(rec("B", 60));
  await s.upsertWallet(rec("C", 30));
  expect(await s.rankFor(90)).toEqual({ rank: 1, total: 3 });
  expect(await s.rankFor(60)).toEqual({ rank: 2, total: 3 });
  expect(await s.rankFor(0)).toEqual({ rank: 4, total: 3 });
});

test("bumpIpUsage increments per ip+day", async () => {
  const s = new MemoryStore();
  const day = dayKey();
  expect(await s.bumpIpUsage("1.2.3.4", day)).toBe(1);
  expect(await s.bumpIpUsage("1.2.3.4", day)).toBe(2);
  expect(await s.bumpIpUsage("9.9.9.9", day)).toBe(1);
  expect(await s.bumpIpUsage("1.2.3.4", "2000-01-01")).toBe(1);
});
