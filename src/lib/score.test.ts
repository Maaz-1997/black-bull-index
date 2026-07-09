import { test, expect } from "bun:test";
import { calculateScore, type WalletStats } from "./score";

// Build a WalletStats with sensible zero defaults; override per case.
function wallet(overrides: Partial<WalletStats> = {}): WalletStats {
  return {
    walletAddress: "TestWa11et1111111111111111111111111111111111",
    ansemBalance: 0,
    solBalance: 0,
    wifBalance: 0,
    bonkBalance: 0,
    isOgHolder: false,
    receivedAirdrop: false,
    walletAgeDays: 0,
    ...overrides,
  };
}

test("empty wallet scores 0 → F / THE UNAWAKENED", () => {
  const r = calculateScore(wallet());
  expect(r.score).toBe(0);
  expect(r.grade).toBe("F");
  expect(r.identity.name).toBe("THE UNAWAKENED");
  expect(r.gradeColor).toBe("#8B0000");
});

test("full OG whale scores 95 → S+ / THE ARCHITECT", () => {
  const r = calculateScore(
    wallet({
      ansemBalance: 2_000_000, // any+10k+100k+1m = 45
      solBalance: 10, // 5
      wifBalance: 100, // 5
      bonkBalance: 100, // 5
      isOgHolder: true, // 15
      receivedAirdrop: true, // loyal (balance > 0): 10
      walletAgeDays: 800, // 1yr + 2yr = 10
    }),
  );
  expect(r.score).toBe(95);
  expect(r.grade).toBe("S+");
  expect(r.identity.name).toBe("THE ARCHITECT");
});

test("faithful holder scores 75 → S", () => {
  const r = calculateScore(
    wallet({
      ansemBalance: 200_000, // any+10k+100k = 35
      solBalance: 5, // 5
      wifBalance: 1, // 5
      bonkBalance: 1, // 5
      isOgHolder: true, // 15
      receivedAirdrop: true, // loyal: 10
    }),
  );
  expect(r.score).toBe(75);
  expect(r.grade).toBe("S");
  expect(r.identity.name).toBe("THE FAITHFUL");
});

test("convert scores 60 → A", () => {
  const r = calculateScore(
    wallet({
      ansemBalance: 200_000, // 35
      solBalance: 5, // 5
      wifBalance: 1, // 5
      isOgHolder: true, // 15
    }),
  );
  expect(r.score).toBe(60);
  expect(r.grade).toBe("A");
  expect(r.identity.name).toBe("THE CONVERT");
});

test("curious holder scores 50 → B", () => {
  const r = calculateScore(
    wallet({
      ansemBalance: 50_000, // any+10k = 20
      solBalance: 5, // 5
      wifBalance: 1, // 5
      bonkBalance: 1, // 5
      isOgHolder: true, // 15
    }),
  );
  expect(r.score).toBe(50);
  expect(r.grade).toBe("B");
  expect(r.identity.name).toBe("THE CURIOUS");
});

test("tourist holder scores 40 → C", () => {
  const r = calculateScore(
    wallet({
      ansemBalance: 50_000, // 20
      solBalance: 5, // 5
      isOgHolder: true, // 15
    }),
  );
  expect(r.score).toBe(40);
  expect(r.grade).toBe("C");
  expect(r.identity.name).toBe("THE TOURIST");
});

test("presence without ANSEM scores 25 → D", () => {
  const r = calculateScore(
    wallet({
      solBalance: 5, // 5
      wifBalance: 1, // 5
      bonkBalance: 1, // 5
      walletAgeDays: 800, // 5 + 5
    }),
  );
  expect(r.score).toBe(25);
  expect(r.grade).toBe("D");
  expect(r.identity.name).toBe("THE GHOST");
});

test("airdrop received then sold applies -15 penalty, not loyalty, and clamps at 0", () => {
  const r = calculateScore(
    wallet({
      receivedAirdrop: true,
      ansemBalance: 0, // sold everything
    }),
  );
  expect(r.breakdown.soldAirdropPenalty).toBe(-15);
  expect(r.breakdown.loyalAirdrop).toBeUndefined();
  expect(r.score).toBe(0); // clamped, never negative
  expect(r.grade).toBe("F");
});

test("loyalty applies only when airdrop received AND still holding", () => {
  const held = calculateScore(wallet({ receivedAirdrop: true, ansemBalance: 5_000 }));
  expect(held.breakdown.loyalAirdrop).toBe(10);
  expect(held.breakdown.soldAirdropPenalty).toBeUndefined();
});

test("cumulative ANSEM tiers stack for a 2M holder", () => {
  const r = calculateScore(wallet({ ansemBalance: 2_000_000 }));
  expect(r.breakdown.ansemAny).toBe(10);
  expect(r.breakdown.ansemOver10k).toBe(10);
  expect(r.breakdown.ansemOver100k).toBe(15);
  expect(r.breakdown.ansemOver1m).toBe(10);
  expect(r.score).toBe(45);
});

test("established wallet (age indeterminate) earns both longevity bonuses", () => {
  // walletAgeKnown:false marks a 1000+ tx veteran whose exact age can't be reached cheaply.
  const established = calculateScore(
    wallet({ ansemBalance: 5000, solBalance: 10, walletAgeDays: 0, walletAgeKnown: false }),
  );
  // ansemAny(10) + solBalance(5) + walletAge1year(5) + walletAge2years(5) = 25
  expect(established.breakdown.walletAge1year).toBe(5);
  expect(established.breakdown.walletAge2years).toBe(5);
  expect(established.score).toBe(25);

  // A genuinely new wallet (known, 0 days) gets no longevity bonus.
  const fresh = calculateScore(
    wallet({ ansemBalance: 5000, solBalance: 10, walletAgeDays: 0, walletAgeKnown: true }),
  );
  expect(fresh.breakdown.walletAge1year).toBeUndefined();
  expect(fresh.score).toBe(15);
});
