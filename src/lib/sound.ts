// Procedural Web Audio sound engine — no audio assets required.
//
// Every cue is synthesised at runtime, so the experience ships with zero binary assets, works
// offline, and stays tiny. Client-only and SSR-safe: no AudioContext is created until unlock()
// runs inside a user gesture (browser autoplay policy). Sound is OFF by default and gated behind a
// user toggle (persisted) so nobody is blasted unexpectedly.
//
// Cues:
//   whoosh  — "enter the arena" (fires when a wallet is submitted)
//   roar    — the Black Bull bellows (landing, and when sound is enabled)
//   impact  — the verdict lands (reveal mount)
//   ui      — soft confirmation blip
//   + startLoadingDrone(): a low arena drone that loops under the charge loader
//
// If you later drop real samples in /public/sounds, wire them in here — the call sites won't change.

import { useEffect, useState } from "react";

type CueName = "whoosh" | "roar" | "impact" | "ui";

const STORAGE_KEY = "bbi-sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;
let inited = false;
const listeners = new Set<(v: boolean) => void>();

function ensureInit(): void {
  if (inited || typeof window === "undefined") return;
  inited = true;
  enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
}

function audioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio(): void {
  const c = audioCtx();
  if (c && c.state === "suspended") void c.resume();
}

export function isSoundEnabled(): boolean {
  ensureInit();
  return enabled;
}

export function subscribeSound(fn: (v: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setSoundEnabled(v: boolean): void {
  ensureInit();
  enabled = v;
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, v ? "on" : "off");
  listeners.forEach((fn) => fn(v));
  // Enabling is itself a user gesture — give a soft confirmation blip (no bull roar on the page).
  if (v) {
    unlockAudio();
    playCue("ui");
  }
}

/* ---- synthesis helpers ---- */

function noiseBuffer(c: AudioContext, dur: number): AudioBuffer {
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

// A deep sine "boom" with a downward pitch glide.
function boom(
  c: AudioContext,
  t0: number,
  f0: number,
  f1: number,
  dur: number,
  peak: number,
): void {
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(f0, t0);
  o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(master as GainNode);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

function whoosh(c: AudioContext, t0: number): void {
  const dur = 0.9;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, dur);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.8;
  bp.frequency.setValueAtTime(300, t0);
  bp.frequency.exponentialRampToValueAtTime(2600, t0 + 0.4);
  bp.frequency.exponentialRampToValueAtTime(400, t0 + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.6, t0 + 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src
    .connect(bp)
    .connect(g)
    .connect(master as GainNode);
  src.start(t0);
  src.stop(t0 + dur);
  boom(c, t0 + 0.05, 150, 60, 0.5, 0.45);
}

function roar(c: AudioContext, t0: number): void {
  const dur = 1.5;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.15);
  g.gain.setValueAtTime(0.5, t0 + dur * 0.6);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(500, t0);
  lp.frequency.linearRampToValueAtTime(900, t0 + 0.3);
  lp.frequency.linearRampToValueAtTime(300, t0 + dur);
  lp.connect(g).connect(master as GainNode);

  [95, 120].forEach((f, idx) => {
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.detune.value = idx === 0 ? 0 : 7;
    o.frequency.setValueAtTime(f, t0);
    o.frequency.exponentialRampToValueAtTime(idx === 0 ? 70 : 85, t0 + dur);
    o.connect(lp);
    o.start(t0);
    o.stop(t0 + dur);
  });

  // Growl: a fast tremolo on the amplitude.
  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 18;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.12;
  lfo.connect(lfoGain).connect(g.gain);
  lfo.start(t0);
  lfo.stop(t0 + dur);

  // Breath.
  const n = c.createBufferSource();
  n.buffer = noiseBuffer(c, dur);
  const nbp = c.createBiquadFilter();
  nbp.type = "bandpass";
  nbp.frequency.value = 1200;
  nbp.Q.value = 0.6;
  const ng = c.createGain();
  ng.gain.value = 0.08;
  n.connect(nbp)
    .connect(ng)
    .connect(master as GainNode);
  n.start(t0);
  n.stop(t0 + dur);
}

function impact(c: AudioContext, t0: number): void {
  boom(c, t0, 180, 46, 1.1, 0.7);

  const n = c.createBufferSource();
  n.buffer = noiseBuffer(c, 0.3);
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 800;
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.5, t0);
  ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
  n.connect(hp)
    .connect(ng)
    .connect(master as GainNode);
  n.start(t0);
  n.stop(t0 + 0.3);

  // Gold shimmer chime.
  const chime = t0 + 0.12;
  [880, 1320, 1760].forEach((f, i) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, chime);
    g.gain.exponentialRampToValueAtTime(0.18 / (i + 1), chime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, chime + 1.0);
    o.connect(g).connect(master as GainNode);
    o.start(chime);
    o.stop(chime + 1.05);
  });
}

function uiBlip(c: AudioContext, t0: number): void {
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(660, t0);
  o.frequency.exponentialRampToValueAtTime(990, t0 + 0.08);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
  o.connect(g).connect(master as GainNode);
  o.start(t0);
  o.stop(t0 + 0.16);
}

export function playCue(name: CueName): void {
  ensureInit();
  if (!enabled) return;
  const c = audioCtx();
  if (!c) return;
  unlockAudio();
  const t0 = c.currentTime + 0.01;
  if (name === "whoosh") whoosh(c, t0);
  else if (name === "roar") roar(c, t0);
  else if (name === "impact") impact(c, t0);
  else if (name === "ui") uiBlip(c, t0);
}

// A low arena drone that loops under the loading charge. Returns a stop() that fades it out.
export function startLoadingDrone(): () => void {
  ensureInit();
  if (!enabled) return () => {};
  const c = audioCtx();
  if (!c) return () => {};
  unlockAudio();
  const t0 = c.currentTime;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.8);
  g.connect(master as GainNode);

  const o1 = c.createOscillator();
  o1.type = "sine";
  o1.frequency.value = 55;
  o1.connect(g);

  const o2 = c.createOscillator();
  o2.type = "sine";
  o2.frequency.value = 82.5;
  const o2g = c.createGain();
  o2g.gain.value = 0.4;
  o2.connect(o2g).connect(g);

  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.5;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain).connect(g.gain);

  o1.start(t0);
  o2.start(t0);
  lfo.start(t0);

  let stopped = false;
  return () => {
    if (stopped || !c) return;
    stopped = true;
    const tn = c.currentTime;
    g.gain.cancelScheduledValues(tn);
    g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), tn);
    g.gain.exponentialRampToValueAtTime(0.0001, tn + 0.4);
    o1.stop(tn + 0.45);
    o2.stop(tn + 0.45);
    lfo.stop(tn + 0.45);
  };
}

// React binding for the toggle button.
export function useSoundEnabled(): readonly [boolean, () => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    ensureInit();
    setOn(isSoundEnabled());
    return subscribeSound(setOn);
  }, []);
  const toggle = () => setSoundEnabled(!isSoundEnabled());
  return [on, toggle] as const;
}
