import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const BASE58_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function CtaFooter() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    const w = wallet.trim();
    if (!BASE58_ADDRESS.test(w)) {
      setErr("The chain doesn't recognise this address. Check it, anon.");
      return;
    }
    setErr("");
    navigate({ to: "/result/$wallet", params: { wallet: w } });
  };

  return (
    <>
      <section
        id="grades"
        className="relative min-h-screen w-full flex items-center overflow-hidden scroll-mt-24"
      >
        {/* Spotlight */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(216,177,90,0.14),transparent_70%)] blur-3xl" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-[#d8b15a]/20 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1240px] w-full px-6 md:px-10 text-center py-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold"
          >
            — The final step —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 font-display text-[18vw] md:text-[10vw] leading-[0.85] tracking-[-0.06em]"
          >
            Who are
            <br />
            <span className="italic gold-shimmer">you?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 max-w-xl mx-auto"
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#b98a2d]/0 via-[#d8b15a]/50 to-[#b98a2d]/0 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100 animate-[bbi-pulse-glow_4s_ease-in-out_infinite]" />
              <div className="relative flex items-center rounded-full border border-white/[0.08] bg-black/80 backdrop-blur-xl p-1.5 pl-6">
                <input
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Paste your Solana wallet"
                  aria-label="Solana wallet address"
                  className="flex-1 bg-transparent px-2 h-14 font-mono text-[14px] text-white placeholder:text-white/25 outline-none"
                />
                <button
                  onClick={submit}
                  className="group/btn inline-flex items-center gap-2 h-12 pl-7 pr-5 rounded-full bg-gradient-to-b from-[#f4d78a] via-[#d8b15a] to-[#b98a2d] text-[#1a0f00] text-[13px] font-medium transition-transform hover:-translate-y-[1px] hover:shadow-[0_20px_60px_-15px_rgba(216,177,90,0.8)]"
                >
                  Read the Chain
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
            {err ? (
              <p className="mt-5 text-[13px] text-[#D0021B]">{err}</p>
            ) : (
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                Free · Read-only · Publicly ranked
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-sm gold-foil" />
                <div className="absolute inset-[3px] rounded-[2px] bg-[#050505]" />
              </div>
              <span className="font-display text-[15px] tracking-tight">
                Black Bull <span className="text-muted-foreground">Index</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[13px] text-muted-foreground leading-relaxed">
              An on-chain identity index for the Solana era. Built for the trenches. Made for the
              ones who held.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-white/40">
              Index
            </div>
            <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
              <li>
                <a href="#story" className="hover:text-white">
                  Story
                </a>
              </li>
              <li>
                <a href="#method" className="hover:text-white">
                  Method
                </a>
              </li>
              <li>
                <a href="#identities" className="hover:text-white">
                  Identities
                </a>
              </li>
              <li>
                <a href="#grades" className="hover:text-white">
                  Grades
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-white/40">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
              <li>
                <a href="#" className="hover:text-white">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-white/40">
              Signal
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              A monthly dispatch from the trenches. No noise. No shilling.
            </p>
            <div className="mt-4 flex items-center border-b border-white/[0.08] pb-2">
              <input
                placeholder="you@wallet.xyz"
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/25"
              />
              <ArrowUpRight className="h-4 w-4 text-gold" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-6 flex items-center justify-between flex-wrap gap-4 text-[10.5px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
            <span>© 2026 Black Bull Index — All rights reserved.</span>
            <span>Read the chain. Reveal the myth.</span>
            <span>Made in the trenches.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
