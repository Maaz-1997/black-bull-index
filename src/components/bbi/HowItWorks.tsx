import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The seven scoring signals — spec §7. Copy verbatim.
const signals = [
  {
    n: "01",
    label: "ANSEM Held",
    weight: 45,
    upTo: true,
    body: "How much of the Black Bull you carry. Any is a start. A million is a statement.",
    hero: true,
  },
  {
    n: "02",
    label: "OG Status",
    weight: 15,
    upTo: false,
    body: "Were you here before June 25? Before the run? Before the world noticed?",
  },
  {
    n: "03",
    label: "Airdrop Loyalty",
    weight: 10,
    upTo: false,
    body: "Did Ansem send you a stimmy — and did you keep it?",
  },
  {
    n: "04",
    label: "Solana Presence",
    weight: 5,
    upTo: false,
    body: "Do you actually live on this chain? SOL in the wallet, proof you're not a tourist.",
  },
  {
    n: "05",
    label: "WIF Holder",
    weight: 5,
    upTo: false,
    body: "Were you early to Dogwifhat? Ecosystem credibility has a record.",
  },
  {
    n: "06",
    label: "BONK Holder",
    weight: 5,
    upTo: false,
    body: "Did you hold BONK through the noise? The chain remembers.",
  },
  {
    n: "07",
    label: "Wallet Age",
    weight: 10,
    upTo: true,
    body: "How long has this wallet existed? Experience leaves a trace.",
  },
];

const fade: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: EASE },
  }),
};

export function HowItWorks() {
  return (
    <section id="method" className="relative py-40 md:py-56 scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-gold">
              Methodology
            </div>
            <h2 className="mt-6 font-display text-[10vw] md:text-[5vw] leading-[0.95] tracking-[-0.03em]">
              How We Read
              <br />
              <span className="text-muted-foreground">the Chain.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] text-muted-foreground">
            Seven signals. One Identity. No guessing.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signals.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fade}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`group relative ${s.hero ? "lg:col-span-2" : ""}`}
            >
              <div className="glass-card rounded-[28px] p-8 md:p-10 h-full flex flex-col justify-between min-h-[280px]">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Signal · {s.n}
                  </span>
                  <div className="text-right leading-none">
                    {s.upTo && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        Up to
                      </span>
                    )}
                    <span className="font-display gold-gradient text-[52px] md:text-[64px] leading-none tracking-[-0.04em]">
                      {s.weight}
                    </span>
                    <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      pts
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className="font-display text-[28px] md:text-[34px] leading-[1] tracking-[-0.02em] text-white">
                    {s.label}
                  </h3>
                  <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-md">
                    {s.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <p className="text-[14px] leading-relaxed text-white/50">
            <span className="text-gold">One signal works against you.</span> Receiving an airdrop
            from Ansem's wallet and then selling everything. The Index deducts 15 points. The chain
            does not forget.
          </p>
          <p className="md:text-right font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground leading-relaxed">
            Every score is derived entirely from public on-chain data.
            <br />
            No wallet connection. No permissions. Read-only.
          </p>
        </div>
      </div>
    </section>
  );
}
