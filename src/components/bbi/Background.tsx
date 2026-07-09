export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,#000_100%)]" />
      {/* Two ambient auras */}
      <div className="absolute -top-[20%] -right-[10%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(216,177,90,0.08),transparent_70%)] blur-3xl animate-[bbi-pulse-glow_14s_ease-in-out_infinite]" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(185,138,45,0.06),transparent_70%)] blur-3xl animate-[bbi-pulse-glow_20s_ease-in-out_infinite]" />
      {/* Diagonal light rays */}
      <div className="absolute top-0 left-1/3 h-[200%] w-[2px] bg-gradient-to-b from-transparent via-[#d8b15a]/10 to-transparent rotate-12 animate-[bbi-ray_18s_ease-in-out_infinite]" />
      <div className="absolute top-0 left-2/3 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-12" />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay animate-[bbi-drift_3s_steps(6)_infinite]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
