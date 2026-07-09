import { test, expect } from "bun:test";
import { parseWalletAssets } from "./helius";
import { ANSEM_MINT, WIF_MINT, BONK_MINT } from "./constants";

test("parses balances with per-token decimals and SOL from lamports", () => {
  const b = parseWalletAssets({
    result: {
      items: [
        { id: ANSEM_MINT, token_info: { balance: 500_000_000_000, decimals: 6 } }, // 500,000
        { id: WIF_MINT, token_info: { balance: 2_000_000, decimals: 6 } }, // 2
        { id: BONK_MINT, token_info: { balance: 100_000_000, decimals: 5 } }, // 1,000
      ],
      nativeBalance: { lamports: 2_500_000_000 }, // 2.5 SOL
    },
  });
  expect(b.ansemBalance).toBe(500_000);
  expect(b.wifBalance).toBe(2);
  expect(b.bonkBalance).toBe(1_000);
  expect(b.solBalance).toBe(2.5);
});

test("missing tokens and empty result resolve to zero", () => {
  expect(parseWalletAssets({})).toEqual({
    ansemBalance: 0,
    wifBalance: 0,
    bonkBalance: 0,
    solBalance: 0,
  });

  const onlyAnsem = parseWalletAssets({
    result: { items: [{ id: ANSEM_MINT, token_info: { balance: 10_000_000, decimals: 6 } }] },
  });
  expect(onlyAnsem.ansemBalance).toBe(10);
  expect(onlyAnsem.wifBalance).toBe(0);
  expect(onlyAnsem.solBalance).toBe(0);
});

test("falls back to default decimals when the asset omits them", () => {
  const b = parseWalletAssets({
    result: { items: [{ id: ANSEM_MINT, token_info: { balance: 1_000_000 } }] }, // default 6
  });
  expect(b.ansemBalance).toBe(1);
});
