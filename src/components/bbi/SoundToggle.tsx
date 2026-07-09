import { Volume2, VolumeX } from "lucide-react";
import { useSoundEnabled } from "@/lib/sound";

// Speaker toggle. Sound is off by default (autoplay policy + courtesy); a soft gold ring pulses
// while muted to make it discoverable. Enabling it wakes the bull.
export function SoundToggle() {
  const [on, toggle] = useSoundEnabled();
  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute sound" : "Enable sound"}
      aria-pressed={on}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]"
    >
      {on ? <Volume2 className="h-4 w-4 text-gold" /> : <VolumeX className="h-4 w-4" />}
      {!on && (
        <span className="pointer-events-none absolute inset-0 rounded-full border border-[#d8b15a]/40 animate-[bbi-pulse-glow_3s_ease-in-out_infinite]" />
      )}
    </button>
  );
}
