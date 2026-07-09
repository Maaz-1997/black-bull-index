// Token addresses, scoring constants, and the 7 Identity archetypes.
// Values are canonical — they mirror black-bull-index.md §9/§12/§14.2 byte-for-byte.
// Never fork or "adjust" a mint, weight, threshold, or colour.

// Canonical public origin — used to build absolute OG image / share URLs for crawlers.
export const SITE_URL = "https://blackbullindex.com";

export const ANSEM_MINT = "9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump";
export const WIF_MINT = "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm";
export const BONK_MINT = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";

// Ansem's known distribution wallet — for airdrop origin check
export const ANSEM_WALLET = "8vkMzpNPLM4Bvb7J3eTT1BVBcwpkJHhVDdJEPNqk7Cs";

// OG cutoff — before the 20,000% run
export const OG_CUTOFF_DATE = new Date("2026-06-25T00:00:00Z");

// Scoring weights. Cumulative ANSEM tiers stack; the final score is clamped to 0–100, so the
// heaviest holders (10M / 100M+) can reach the top on conviction-by-size alone — the single
// biggest holder should read as an Architect, not a Convert.
export const SCORE_WEIGHTS = {
  ansemAny: 10, // holds any ANSEM at all
  ansemOver10k: 10, // holds > 10,000 ANSEM
  ansemOver100k: 15, // holds > 100,000 ANSEM
  ansemOver1m: 10, // holds > 1,000,000 ANSEM
  ansemOver10m: 10, // holds > 10,000,000 ANSEM (whale)
  ansemOver100m: 15, // holds > 100,000,000 ANSEM (titan)
  solBalance: 5, // SOL balance > 1 (real Solana wallet)
  wifHolder: 5, // holds any WIF
  bonkHolder: 5, // holds any BONK
  ogHolder: 15, // held ANSEM before OG_CUTOFF_DATE
  loyalAirdrop: 10, // received airdrop AND still holding
  walletAge1year: 5, // wallet > 365 days old
  walletAge2years: 5, // wallet > 730 days old
  soldAirdropPenalty: -15, // received airdrop then sold all ANSEM
};

// Grade thresholds (score >= threshold → that grade)
export const GRADE_THRESHOLDS: Record<string, number> = {
  "S+": 90,
  S: 75,
  A: 60,
  B: 45,
  C: 30,
  D: 15,
  F: 0,
};

// Legacy labels (used in OG image subtitle)
export const GRADE_LABELS: Record<string, string> = {
  "S+": "Trench Legend",
  S: "Black Bull Certified",
  A: "Committed Degen",
  B: "Getting There",
  C: "Participation Trophy",
  D: "Fumbled the Airdrop",
  F: "Wrong Ecosystem",
};

export const GRADE_COLORS: Record<string, string> = {
  "S+": "#F5A623",
  S: "#E8941A",
  A: "#7ED321",
  B: "#4A90E2",
  C: "#9B9B9B",
  D: "#D0021B",
  F: "#8B0000",
};

export const IDENTITIES: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    colour: string;
    scoreRange: string;
  }
> = {
  "S+": {
    name: "THE ARCHITECT",
    tagline: "You didn't just buy the token. You built a position.",
    description:
      "The Architect was in the trenches before the run, understood the thesis before the thread went viral, and held through every paper-hand moment that shook out the noise. Your wallet is not a portfolio — it is an argument. A documented case that you read the signal, trusted the builder, and committed. The Black Bull Index has no higher classification.",
    colour: "#F5A623",
    scoreRange: "90–100",
  },
  S: {
    name: "THE FAITHFUL",
    tagline: "You gave trust before it was obvious. That counts.",
    description:
      "The Faithful didn't need every signal to line up before committing. Something clicked — the thread, the chart, the reputation — and you acted. Your ANSEM position is real, your Solana credentials are solid, and your wallet reflects a level of conviction that most people talk about and few actually demonstrate. You are not far from the top.",
    colour: "#E8941A",
    scoreRange: "75–89",
  },
  A: {
    name: "THE CONVERT",
    tagline: "You weren't first. But you understood. That's not nothing.",
    description:
      "The Convert saw the signal and overcame the hesitation. You made the move, you built a real position, and your wallet now tells a coherent story. The Convert is the engine of every meaningful bull run: the person with good instincts who finally trusts them. The only thing between your current Identity and the next tier is conviction and time.",
    colour: "#7ED321",
    scoreRange: "60–74",
  },
  B: {
    name: "THE CURIOUS",
    tagline: "You found your way to the trenches. You're just not sure you want to stay.",
    description:
      "The Curious has good instincts but hasn't committed to them. Your ANSEM position exists — cautious, considered, perhaps a little hedged. Your wallet reads like a question rather than an answer. The trenches don't reward the undecided. Pick a side, anon. The chain is watching.",
    colour: "#4A90E2",
    scoreRange: "45–59",
  },
  C: {
    name: "THE TOURIST",
    tagline: "You arrived. You looked around. You bought just enough to say you were here.",
    description:
      "The Tourist is not a bad actor — just an undecided one. You hold some ANSEM. Not enough to matter if it runs, but enough to remember that you were technically present. The Black Bull Index does not judge curiosity. But it does ask: at some point, are you visiting, or are you staying?",
    colour: "#9B9B9B",
    scoreRange: "30–44",
  },
  D: {
    name: "THE GHOST",
    tagline: "The airdrop landed. You were there. Then you weren't.",
    description:
      "The Ghost received what many wallets didn't — a direct stimmy from the Black Bull's wallet. And then it was gone. Not stolen. Sold. The Ghost doesn't mean to miss — they just always seem to be somewhere else when the thing actually happens. Your on-chain record is now a permanent document of that decision.",
    colour: "#D0021B",
    scoreRange: "15–29",
  },
  F: {
    name: "THE UNAWAKENED",
    tagline: "You have not yet encountered the Black Bull. This is your introduction.",
    description:
      "The Unawakened is not a failure. It is a starting point. Your wallet has not yet crossed paths with the Black Bull. You have not been in the trenches during a stimmy. You have not yet made the decision that defines every other Identity on this Index. That decision is still available to you. Every S+ wallet was once empty.",
    colour: "#8B0000",
    scoreRange: "0–14",
  },
};

// Human-readable labels for each score-breakdown key (shown on the reveal page)
export const BREAKDOWN_LABELS: Record<string, string> = {
  ansemAny: "Holds $ANSEM",
  ansemOver10k: "$ANSEM over 10,000",
  ansemOver100k: "$ANSEM over 100,000",
  ansemOver1m: "$ANSEM over 1,000,000",
  ansemOver10m: "$ANSEM over 10,000,000",
  ansemOver100m: "$ANSEM over 100,000,000",
  solBalance: "Active Solana wallet",
  wifHolder: "Holds WIF",
  bonkHolder: "Holds BONK",
  ogHolder: "OG holder (pre-June 25)",
  loyalAirdrop: "Airdrop received — still holding",
  walletAge1year: "Wallet 1+ year old",
  walletAge2years: "Wallet 2+ years old",
  soldAirdropPenalty: "Received airdrop — sold everything",
};
