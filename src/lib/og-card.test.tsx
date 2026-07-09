import { test, expect } from "bun:test";
import { ImageResponse } from "@cf-wasm/og";
import { CardImage, buildOgImageUrl, buildShareText } from "./og-card";
import type { AnalyzeResult } from "./analyze";
import { IDENTITIES, SITE_URL } from "./constants";

const result: AnalyzeResult = {
  wallet: "8vkMzpNPLM4Bvb7J3eTT1BVBcwpkJHhVDdJEPNqk7Cs",
  score: 94,
  grade: "S+",
  gradeLabel: "Trench Legend",
  gradeColor: "#F5A623",
  identity: IDENTITIES["S+"],
  breakdown: { ansemAny: 10 },
  roast: 'Your wallet is the thesis made tangible. "Documented."',
  ansemPrice: 0,
  rank: 3,
  total: 120,
  percentile: 3,
  stats: {
    ansemBalance: 500000,
    solBalance: 4,
    wifBalance: 1,
    bonkBalance: 1,
    isOgHolder: true,
    receivedAirdrop: false,
    walletAgeDays: 800,
  },
};

test("buildOgImageUrl is absolute and carries the card params", () => {
  const url = buildOgImageUrl(result);
  expect(url.startsWith(`${SITE_URL}/api/og?`)).toBe(true);
  expect(url).toContain("grade=S%2B");
  expect(url).toContain("score=94");
});

test("buildShareText tags @blknoiz06 and includes the identity + score", () => {
  const text = buildShareText(result);
  expect(text).toContain("@blknoiz06");
  expect(text).toContain("THE ARCHITECT");
  expect(text).toContain("94/100");
});

test("CardImage renders to a real PNG via @cf-wasm/og", async () => {
  const res = await ImageResponse.async(
    <CardImage
      name="THE ARCHITECT"
      grade="S+"
      score={94}
      colour="#F5A623"
      wallet="8vkM…7Cs"
      roast="Your wallet does not require a roast. It requires documentation."
      rank="#3 · Top 3%"
      isOg={true}
      ansem="500K"
      usd="$150K"
      price="$0.30"
      wif={true}
      bonk={true}
      handle=""
    />,
    { width: 1200, height: 630, format: "png", fonts: [] },
  );
  const buf = new Uint8Array(await res.arrayBuffer());
  // PNG magic number: 89 50 4E 47
  expect(buf[0]).toBe(0x89);
  expect(buf[1]).toBe(0x50);
  expect(buf[2]).toBe(0x4e);
  expect(buf[3]).toBe(0x47);
  expect(buf.byteLength).toBeGreaterThan(2000);
}, 30_000);
