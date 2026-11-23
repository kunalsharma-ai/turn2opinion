// Interface sounds for the business consent page — synthesised with the Web Audio API (no audio files).
// Every click has a sound; each kind of action has its own character so the page "answers" the visitor:
//   tap      glassy UI click            paper   data swipe (clause viewer opens)   close  swipe back
//   stamp    digital two-tone confirm (approval ticked)   unstamp  the reverse
//   read     sonar ping (a clause counted as reviewed)    tick     charging blip while holding to sign
//   sign     seal thump + network arpeggio (agreement signed)
//   light / dark   rising / falling glide (theme switch)   warn  low double knock (something still needed)
// Language signatures (one per language) live in i18n/sounds.js and are loaded on demand.
import { isSoundEnabled } from './i18n/soundPrefs.js';

let ctx = null;
let out = null;
function audio() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor();
    out.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}
function note(t, freq, { type = 'sine', dur = 0.18, vol = 0.18, a = 0.005, glide = 0, pan = 0 } = {}) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(freq * glide, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  if (p) { p.pan.value = pan; g.connect(p); p.connect(out); } else g.connect(out);
  o.start(t);
  o.stop(t + dur + 0.02);
}
function hiss(t, { dur = 0.12, vol = 0.06, from = 800, to = 5000 } = {}) {
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = ctx.createBufferSource();
  s.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.Q.value = 1.2;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(out);
  s.start(t);
}
const RECIPES = {
  // Turn2Opinion business "network" set — glassy UI clicks, a data-swipe, sonar pings, a charging hold tone, a
  // digital confirm and a deep seal thump — different from the MyFrequentRewards paper/stamp set.
  tap: (t) => { note(t, 2637, { type: 'sine', dur: 0.05, vol: 0.05 }); note(t, 1318.5, { type: 'triangle', dur: 0.04, vol: 0.04 }); },
  paper: (t) => { note(t, 300, { type: 'sine', dur: 0.22, vol: 0.06, glide: 3 }); hiss(t, { dur: 0.12, vol: 0.025, from: 2000, to: 8000 }); },
  close: (t) => { note(t, 900, { type: 'sine', dur: 0.18, vol: 0.05, glide: 0.33 }); },
  stamp: (t) => { note(t, 987.77, { type: 'triangle', dur: 0.08, vol: 0.07 }); note(t + 0.07, 1479.98, { type: 'triangle', dur: 0.16, vol: 0.07 }); },
  unstamp: (t) => { note(t, 739.99, { type: 'triangle', dur: 0.08, vol: 0.06 }); note(t + 0.06, 493.88, { type: 'triangle', dur: 0.12, vol: 0.06 }); },
  // sonar ping when a clause counts as reviewed
  read: (t) => { note(t, 1244.5, { type: 'sine', dur: 0.5, vol: 0.06 }); note(t + 0.18, 1244.5, { type: 'sine', dur: 0.4, vol: 0.02 }); },
  // hold-to-sign: rising charge blips
  tick: (t) => { note(t, 600 + Math.random() * 40, { type: 'sine', dur: 0.06, vol: 0.05, glide: 1.6 }); },
  light: (t) => { note(t, 523.25, { type: 'sine', dur: 0.2, vol: 0.06, glide: 2 }); },
  dark: (t) => { note(t, 1046.5, { type: 'sine', dur: 0.22, vol: 0.06, glide: 0.5 }); },
  // signed: seal thump + network arpeggio + shimmer
  sign: (t) => {
    note(t, 90, { type: 'sine', dur: 0.4, vol: 0.28, glide: 0.6 });
    hiss(t, { dur: 0.05, vol: 0.06, from: 1200, to: 600 });
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => note(t + 0.25 + i * 0.07, f, { type: 'sine', dur: 0.5, vol: 0.06, pan: (i - 2) * 0.3 }));
    note(t + 0.7, 2093, { type: 'sine', dur: 1, vol: 0.03 });
  },
  warn: (t) => { note(t, 196, { type: 'sine', dur: 0.1, vol: 0.12 }); note(t + 0.13, 174.6, { type: 'sine', dur: 0.12, vol: 0.12 }); },
  open: (t) => RECIPES.paper(t),
  on: (t) => RECIPES.stamp(t),
  off: (t) => RECIPES.unstamp(t),
};
export function play(kind = 'tap') {
  if (!isSoundEnabled()) return;
  try {
    if (!audio()) return;
    (RECIPES[kind] || RECIPES.tap)(ctx.currentTime + 0.01);
  } catch {
    /* audio unavailable */
  }
}
/** Language signature (separate chunk, loaded when the picker opens). */
export function playLanguage(code) {
  if (!isSoundEnabled()) return;
  import('./i18n/sounds.js').then((m) => m.playLanguageSound(code)).catch(() => {});
}
export const preloadLanguageSounds = () => import('./i18n/sounds.js').catch(() => {});
