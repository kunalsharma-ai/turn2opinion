// Interface sounds for the consent page — synthesised with the Web Audio API (no audio files).
// Every click has a sound; each kind of action has its own character so the page "answers" the visitor:
//   tap      soft bubble pop (buttons, links, chapter rail)
//   open     swipe up (opening a section)        close  swipe down
//   on       pop + "like" sparkle (a permission switched on)   off  deflating boop
//   read     tiny heart pop (a section counted as read)
//   sign     receipt-printer buzz + happy chord + pops (agreement confirmed)
//   light / dark   two rising / falling pops (theme switch)
//   warn     gentle two-note "uh-oh" (something still needed)
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
// Turn2Opinion "social" sound set — bubbly pops, swipes, a like-sparkle, a deflate, a heart pop and a receipt
// printer buzz with a happy chord — different from the MyFrequentRewards chimes.
function pop(t, f = 520, vol = 0.14) { note(t, f, { type: 'sine', dur: 0.09, vol, glide: 2.2 }); }
const RECIPES = {
  tap: (t) => { pop(t, 480, 0.12); },
  open: (t) => { hiss(t, { dur: 0.14, vol: 0.045, from: 900, to: 5200 }); pop(t + 0.05, 620, 0.06); },
  close: (t) => { hiss(t, { dur: 0.12, vol: 0.04, from: 4800, to: 900 }); },
  on: (t) => { pop(t, 560, 0.12); note(t + 0.06, 1318.5, { type: 'triangle', dur: 0.14, vol: 0.06 }); note(t + 0.11, 1760, { type: 'triangle', dur: 0.18, vol: 0.05 }); },
  off: (t) => { note(t, 700, { type: 'sine', dur: 0.18, vol: 0.08, glide: 0.4 }); },
  read: (t) => { pop(t, 900, 0.05); note(t + 0.03, 1975.5, { dur: 0.12, vol: 0.03 }); },
  sign: (t) => {
    for (let i = 0; i < 9; i++) note(t + i * 0.055, 1400 + (i % 2) * 120, { type: 'square', dur: 0.04, vol: 0.018 });
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(t + 0.55 + i * 0.07, f, { type: 'triangle', dur: 0.6, vol: 0.08, pan: (i - 1.5) * 0.3 }));
    for (let i = 0; i < 6; i++) pop(t + 0.8 + i * 0.07, 600 + i * 90, 0.05);
  },
  light: (t) => { pop(t, 700, 0.08); pop(t + 0.07, 940, 0.07); },
  dark: (t) => { pop(t, 600, 0.08); pop(t + 0.07, 420, 0.07); },
  warn: (t) => { note(t, 330, { type: 'triangle', dur: 0.1, vol: 0.08 }); note(t + 0.13, 262, { type: 'triangle', dur: 0.12, vol: 0.08 }); },
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
