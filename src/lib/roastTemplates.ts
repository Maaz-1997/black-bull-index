// Fallback roasts used when Groq is unavailable, over quota, or returns empty.
// Three per grade. {walletAgeDays} / {walletAgeYears} / {ansemBalance} / {solBalance}
// tokens are substituted at runtime by roast.ts. Mirrors black-bull-index.md §15.3.

export const TEMPLATE_ROASTS: Record<string, string[]> = {
  "S+": [
    "Your wallet reads like a plan executed quietly. Before the threads, before the charts, before the calls — you were already positioned. The Architect doesn't announce the thesis. They execute it and let the chain speak. Your chain is speaking. Clearly.",

    "First in. Still holding. Bigger position than yesterday. Your ANSEM stack puts you in the fraction of wallets that will ever touch this token at the entry you did. The Architect doesn't chase calls — they make positions before the calls exist. Yours was made. It held. That's the whole story.",

    "WIF before the run. BONK through the noise. ANSEM before the pump. Your wallet does not follow signals. It creates the conditions that become signals for everyone else. The Black Bull Index assigns Architect status not as a reward — but as a record. Yours is clean.",
  ],

  S: [
    "You acted before it was obvious. Your ANSEM position is real, your Solana timeline is documented, and your wallet reflects conviction that most people describe in replies but don't demonstrate on-chain. The Faithful are one decision from The Architect. You already know what that decision is.",

    "Trust given before the run. Position built before consensus. Your on-chain record is the argument you don't need to make in anyone's replies — it's already written. The Faithful don't need the chart to validate them. They validated the chart.",

    "You understood the thesis before it was popular and your wallet proves it. Solana credentials real. ANSEM position real. Timeline honest. The Black Bull Index reads what wallets contain, not what their owners say on X. Yours says enough.",
  ],

  A: [
    "You weren't first. You also weren't last, and you weren't on the sidelines describing what you should have done. Something clicked and you acted. The Convert is the engine of every real bull run — the person with good instincts who stops overthinking. The chain records that you did. Now size up.",

    "Late to the thesis, not late to the outcome. Your ANSEM position is solid and your Solana history shows you know the difference between noise and signal. You heard the signal and moved. Most people who see the same signal spend two weeks asking for permission from the chart. You didn't.",

    "Not the OG wallet, not the biggest position — but a wallet that made a considered decision and followed through. In an ecosystem full of wallets that watch, The Convert is the one that moved. Timing matters less than the move itself. The next move matters more than the last one.",
  ],

  B: [
    "Your ANSEM position exists. It is the size of something purchased to keep the option open — not the size of something purchased because you're certain. There is nothing wrong with uncertainty. But the trenches do not reward optionality. They reward commitment. You have not committed yet.",

    "You're in the right ecosystem, on the right chain, holding the right token in the wrong amount. Your instincts are documented. Your conviction is not. The Curious builds positions they can explain away if they don't work. The Faithful build positions because they believe. Pick one.",

    "Everything about your wallet says you understand what $ANSEM represents. The portfolio is right. The chain is right. The timing is still available. The only variable is the size that matches the conviction. One decision separates where you are from the next Identity. Make it.",
  ],

  C: [
    "You hold $ANSEM — a small amount. The kind that feels like a position but functions like a bookmark. The Tourist doesn't visit to stay. They visit to say they were there. Your wallet will record this reading either way. The question is whether the chapter ends here or continues.",

    "Technically in the trenches. Your $ANSEM balance exists and it is not a stake — it is a footnote. You are in the right ecosystem and you have some skin in the right token. The Tourist is not a permanent Identity. It is a starting point. This index will give a different reading after your next transaction.",

    "You are present. You hold ANSEM. You are on Solana with {solBalance} SOL and a position that says 'I found it but I'm not sure yet.' The chain records what you're sure about — not what you're considering. So far the record says: present, uncommitted, still deciding. Write a different line next.",
  ],

  D: [
    "Ansem's distribution wallet sent ANSEM directly to your address. This is a fact retrievable by anyone on Solana — permanent, indexed, timestamped. Your current ANSEM balance is zero. You looked at free money delivered by the builder himself and decided the timing was wrong. The timing was not wrong. The decision was.",

    "The stimmy landed. You held it long enough to know what it was and short enough to confirm you didn't believe in it. The exit liquidity you provided went to wallets now classified as Architects on this index. The chain wrote this. Not us. It writes everything with equal permanence.",

    "You received an airdrop from one of the most followed wallets in the Solana ecosystem and your ANSEM balance now reads zero. The Ghost haunts the decision made in a moment of doubt. The trench is still open. But the chain already wrote the first draft of your story here. You're the one who has to rewrite it.",
  ],

  F: [
    "{walletAgeDays} days on Solana. Your wallet has been here through everything this chain has produced. Zero ANSEM. The stimmy was distributed, the opportunity was public, and your wallet was present for all of it. The chain writes absence with the same permanence it writes presence. This reading is what absence looks like.",

    "Zero $ANSEM. {walletAgeYears} years on Solana and the Black Bull has not appeared in your portfolio — not because the opportunity wasn't there, but because the decision wasn't made. The Unawakened is not a judgment. It is a starting point. Every Architect wallet was empty once. One transaction changes the next reading.",

    "Your wallet exists. It holds things. It has {walletAgeDays} days of history on a chain that produced BONK, WIF, and $ANSEM — three of the most significant community tokens in its history. Your record on the most recent one is zero. The Black Bull Index does not close. Your next transaction writes the next line.",
  ],
};
