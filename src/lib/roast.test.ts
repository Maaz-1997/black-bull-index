import { test, expect } from "bun:test";
import { fallback, generateRoast } from "./roast";
import { calculateScore, type WalletStats } from "./score";

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

const GRADES = ["S+", "S", "A", "B", "C", "D", "F"];

test("fallback substitutes every token for all grades — no leftover placeholders", () => {
  for (const grade of GRADES) {
    // Random template pick, so exercise each grade several times.
    for (let i = 0; i < 12; i++) {
      const roast = fallback(
        grade,
        wallet({ walletAgeDays: 847, ansemBalance: 1234, solBalance: 2.5 }),
      );
      expect(roast.length).toBeGreaterThan(10);
      expect(roast.includes("{")).toBe(false);
      expect(roast.includes("}")).toBe(false);
    }
  }
});

test("generateRoast falls back to a template when GROQ_API_KEY is absent", async () => {
  delete process.env.GROQ_API_KEY;
  const stats = wallet({ walletAgeDays: 847 });
  const result = calculateScore(stats);
  const roast = await generateRoast(stats, result, 0);
  expect(typeof roast).toBe("string");
  expect(roast.length).toBeGreaterThan(10);
  expect(roast.includes("{")).toBe(false);
});
