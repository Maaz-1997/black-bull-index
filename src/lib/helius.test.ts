import { test, expect } from "bun:test";
import { parseTokenAccounts } from "./helius";

// getTokenAccountsByOwner (jsonParsed) response shape — uiAmount is already human-readable.
function accts(...amounts: (number | null)[]) {
  return {
    result: {
      value: amounts.map((uiAmount) => ({
        account: { data: { parsed: { info: { tokenAmount: { uiAmount } } } } },
      })),
    },
  };
}

test("sums uiAmount across token accounts for a mint", () => {
  expect(parseTokenAccounts(accts(1_500_000))).toBe(1_500_000);
  // A mint can have more than one token account for the same owner — sum them.
  expect(parseTokenAccounts(accts(1_000_000, 500_000))).toBe(1_500_000);
});

test("empty / missing / null balances resolve to zero", () => {
  expect(parseTokenAccounts({})).toBe(0);
  expect(parseTokenAccounts({ result: { value: [] } })).toBe(0);
  expect(parseTokenAccounts(accts(null))).toBe(0);
});

test("ignores malformed accounts without a numeric uiAmount", () => {
  const data = {
    result: {
      value: [
        { account: { data: { parsed: { info: {} } } } },
        { account: { data: { parsed: { info: { tokenAmount: { uiAmount: 42 } } } } } },
      ],
    },
  };
  expect(parseTokenAccounts(data)).toBe(42);
});
