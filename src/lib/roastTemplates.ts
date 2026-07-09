// Fallback roasts used when Groq is unavailable, over quota, or returns empty.
// Eight per grade for variety — roast.ts picks one at random and substitutes
// {walletAgeDays} / {walletAgeYears} / {ansemBalance} / {solBalance} at runtime.
// Voice mirrors black-bull-index.md §15: deadpan, precise, one specific fact lands harder
// than five insults. The last line of each should work as a standalone screenshot.

export const TEMPLATE_ROASTS: Record<string, string[]> = {
  "S+": [
    "Your wallet reads like a plan executed quietly. Before the threads, before the charts, before the calls — you were already positioned. The Architect doesn't announce the thesis. They execute it and let the chain speak. Your chain is speaking. Clearly.",

    "First in. Still holding. Bigger position than yesterday. Your ANSEM stack puts you in the fraction of wallets that will ever touch this token at the entry you did. The Architect doesn't chase calls — they make positions before the calls exist. Yours held. That's the whole story.",

    "WIF before the run. BONK through the noise. ANSEM before the pump. Your wallet does not follow signals. It creates the conditions that become signals for everyone else. Architect status isn't a reward here. It's a record. Yours is clean.",

    "{ansemBalance} ANSEM, held through every shakeout designed to separate you from it. Most wallets talk about conviction in replies. Yours documents it on-chain, block by block. The Index has no classification above the one you already hold.",

    "You were early and you stayed early — a combination almost nobody manages. The paper hands became your entry liquidity. The doubters became your exit targets. The chain kept the receipts and every one of them has your name on the right side.",

    "There is nothing to roast here, and that itself is the roast for everyone reading below your tier. Your wallet is the benchmark the rest are measured against. The Architect doesn't need a verdict. It issues them.",

    "You didn't ask the chart for permission. You read the thesis, sized the position, and let time do the arguing. {ansemBalance} ANSEM later, the argument is settled. The trenches produced exactly one outcome for wallets like yours: proof.",

    "The wallets that will screenshot this reading and cope are the same ones that sold you their bags. You hold the top classification on an index built to find people exactly like you. Early, heavy, and still here. The chain remembers who was.",
  ],

  S: [
    "You acted before it was obvious. Your ANSEM position is real, your Solana timeline is documented, and your wallet reflects conviction most people describe in replies but never demonstrate on-chain. The Faithful are one decision from The Architect. You already know which one.",

    "Trust given before the run. Position built before consensus. Your on-chain record is the argument you don't need to make in anyone's replies — it's already written. The Faithful don't need the chart to validate them. They validated the chart.",

    "You understood the thesis before it was popular and your wallet proves it. Solana credentials real. ANSEM position real. Timeline honest. The Index reads what wallets contain, not what owners post. Yours says enough.",

    "{ansemBalance} ANSEM and a Solana history that isn't cosplay. You committed on conviction rather than confirmation, which is the whole difference between this tier and the tourists below it. Size once more and the classification changes.",

    "You're the wallet that bought when it was still a little embarrassing to. That discomfort is exactly what the top tiers are made of. You have the position and the timing — what you don't have yet is the last increment of size. That's it. That's the gap.",

    "Not the first wallet in, but early enough that the chain files you with the believers, not the spectators. The Faithful carried conviction before it paid to. Yours is on record. One more decision writes you into the tier above.",

    "Your wallet doesn't hedge its story. ANSEM held, Solana lived-in, timeline clean. The Faithful are the wallets Architects were before they went all the way. You're closer than your replies would admit.",

    "You gave the thesis trust while it was still a question. It became an answer, and your position was already there to catch it. The chain rewards that quietly and permanently. The Faithful don't get roasted. They get acknowledged.",
  ],

  A: [
    "You weren't first. You also weren't on the sidelines describing what you should have done. Something clicked and you moved. The Convert is the engine of every real run — good instincts that finally stopped overthinking. Now size up.",

    "Late to the thesis, not late to the outcome. Your ANSEM position is solid and your history shows you know signal from noise. You heard it and acted. Most people who hear the same signal spend two weeks asking the chart for permission. You didn't.",

    "Not the OG wallet, not the biggest position — but a considered decision followed through. In an ecosystem full of wallets that only watch, The Convert is the one that moved. The next move matters more than the last one.",

    "{ansemBalance} ANSEM says you got past the hesitation that traps most wallets a tier below you. The Convert's whole arc is instinct catching up to nerve. Yours did. Keep going and the story stops being 'came around' and starts being 'was right'.",

    "You bought the version of the thesis that had already been half-proven — which is fine, because you actually bought it. Plenty of wallets waited for full proof and are still waiting. You converted. The chain files that as a decision, not a coincidence.",

    "Your wallet made peace with being early-ish and acted anyway. That's more than most manage. The Convert's ceiling is high precisely because the instincts are real — the only variable left is how much you trust them next time.",

    "The signal reached you, you weighed it, you moved. A boring sentence that describes maybe one wallet in ten. The other nine are still 'watching'. You have a position and a coherent story. Now make it a bigger one.",

    "You came in after the doubt and before the regret — the exact window most people miss in both directions. {ansemBalance} ANSEM later, the read was correct. The Convert's next transaction decides whether this was instinct or a fluke. Prove it was instinct.",
  ],

  B: [
    "Your ANSEM position exists. It's the size of something bought to keep the option open — not the size of something bought because you're certain. Nothing wrong with uncertainty. But the trenches reward commitment, not optionality. You haven't committed yet.",

    "Right ecosystem, right chain, right token, wrong amount. Your instincts are documented. Your conviction is not. The Curious builds positions they can explain away if they're wrong. The Faithful build positions because they believe. Pick one.",

    "Everything about your wallet says you understand what $ANSEM represents. The portfolio is right, the chain is right, the timing is still open. The only missing variable is a size that matches the conviction. One decision separates you from the next tier.",

    "{ansemBalance} ANSEM — enough to prove you get it, not enough to prove you mean it. The Curious hovers at the edge of the trench taking notes. At some point the notebook has to become a position. The chain is watching which.",

    "You've done the reading. You're in the right rooms. You're holding the right token in the amount of someone who wants a story either way — winner if it runs, 'only had a little' if it doesn't. The trenches see that hedge clearly.",

    "Your wallet reads like a question mark, not a full stop. There's genuine instinct here, which is more than most have. What there isn't yet is the moment you stopped hedging. The Curious becomes The Convert the day the position gets serious.",

    "You found the trench. You're standing at the top of it, deciding. That's not nothing — most never find it. But standing at the edge isn't the same as being in it, and the chain only records the wallets that climbed down. Yours is still deciding.",

    "Cautious ANSEM, real Solana presence, {walletAgeDays} days of history that says you're not new here. So the hesitation isn't inexperience. It's a choice. The Curious knows exactly what to do and hasn't done it. Yet.",
  ],

  C: [
    "You hold $ANSEM — a small amount. The kind that feels like a position but functions like a bookmark. The Tourist doesn't visit to stay. They visit to say they were there. The chain records this reading either way. The question is whether the chapter ends here.",

    "Technically in the trenches. Your $ANSEM balance exists and it's not a stake — it's a footnote. Right ecosystem, some skin in the right token. The Tourist isn't a permanent Identity. It's a starting point. The next transaction gets a different reading.",

    "You're present. You hold ANSEM. You're on Solana with {solBalance} SOL and a position that says 'I found it but I'm not sure yet.' The chain records what you're sure about, not what you're considering. So far: present, uncommitted, still deciding.",

    "{ansemBalance} ANSEM. Enough to check the box, not enough to change your life if the thesis is right. The Tourist buys the souvenir, not the ticket. There's still time to trade one for the other, but the window narrows every day you don't.",

    "You bought just enough to feel involved and little enough to stay comfortable. Comfort and the trenches don't share a wallet for long. The Tourist either commits or drifts. The chain will note which one you chose, in the amount you choose next.",

    "Your wallet has been near the story without being in it. A small ANSEM bag, a real Solana footprint, and a posture that says 'watching, mostly.' The Tourist isn't wrong to be careful. They're just not yet part of what happens next.",

    "A position this size is a hedge against FOMO, not a bet on a thesis. That's the Tourist's whole strategy — be able to say you were there without risking enough to matter. The chain doesn't grade intentions. It grades size. Yours reads: visiting.",

    "You showed up, looked around, and bought the smallest position that still counts as buying. {walletAgeDays} days on this chain and this is the stake you settled on. The Tourist's next transaction decides whether this was a start or a souvenir.",
  ],

  D: [
    "Ansem's distribution wallet sent ANSEM directly to your address. This is retrievable by anyone on Solana — permanent, indexed, timestamped. Your current ANSEM balance is zero. You looked at free money from the builder himself and decided the timing was wrong. It wasn't. The decision was.",

    "The stimmy landed. You held it long enough to know what it was and short enough to confirm you didn't believe in it. The exit liquidity you provided went to wallets now classified as Architects on this index. The chain wrote this. Not us.",

    "You received an airdrop from one of the most followed wallets in the ecosystem and your ANSEM balance now reads zero. The Ghost haunts the decision made in a moment of doubt. The trench is still open. But the chain already wrote the first draft.",

    "Free ANSEM, placed in your hands by someone betting on distribution. You sold it. What it's worth now versus what you sold it for is a number you already looked up and closed the tab on. The chain keeps that tab open permanently.",

    "The airdrop was a test disguised as a gift, and the chain graded it in real time. You held zero of it. The Ghost isn't a thief — just a wallet that was somewhere else when it mattered, again. The record is specific and it isn't going anywhere.",

    "You had it. That's the part that stings and the part the chain won't let you edit. The stimmy arrived, sat in your wallet, and left. Everyone who bought your bag is a tier or three above you now. Documented, timestamped, yours.",

    "Received from Ansem direct. Balance now zero. There's no ambiguity in those two facts and no roast crueler than stating them plainly. The Ghost's story is short because it's the same story every time: was there, isn't now.",

    "The distribution found you. You just didn't hold long enough for it to mean anything. {walletAgeDays} days on Solana and the one time the builder handed you the position directly, you handed it back to the market. The chain filed it under 'sold'.",
  ],

  F: [
    "{walletAgeDays} days on Solana. Your wallet survived everything this chain produced. Zero ANSEM. The stimmy was distributed, the opportunity was public, and your wallet was present for all of it. The chain writes absence with the same permanence as presence. This is what absence looks like.",

    "Zero $ANSEM. {walletAgeYears} years on Solana and the Black Bull never appeared in your portfolio — not because the chance wasn't there, but because the decision wasn't made. The Unawakened isn't a judgment. It's a starting point. Every Architect wallet was empty once.",

    "Your wallet exists. It holds things. It has {walletAgeDays} days of history on a chain that produced BONK, WIF, and $ANSEM. Your record on the most recent is zero. The Index doesn't close. Your next transaction writes the next line.",

    "The trenches happened near you and without you. {walletAgeYears} years on-chain, and the defining token of this cycle isn't in your wallet. Not sold — never held. The Unawakened's roast isn't an insult. It's the notification you didn't get at the time.",

    "You were here for the whole thing and touched none of it. That's rarer than it sounds and quieter than being wrong. Zero ANSEM after {walletAgeDays} days of being present. The chain doesn't record hesitation as a transaction, but it records the empty space it leaves.",

    "No ANSEM. No stimmy held. No position to defend. Your wallet is a clean page in a story everyone else already wrote a chapter in. The Unawakened isn't behind — it hasn't started. Starting is still one transaction away, same as it was for every tier above you.",

    "The most-watched distribution on Solana ran past your wallet and your balance never moved. {walletAgeYears} years of on-chain history and this token is a blank. The chain isn't angry about it. It's just accurate. This reading is the accuracy.",

    "You have the wallet age of a veteran and the ANSEM balance of someone who arrived yesterday. The Unawakened is the only Identity defined entirely by what isn't there. The good news is the same as the roast: what isn't there can still change.",
  ],
};
