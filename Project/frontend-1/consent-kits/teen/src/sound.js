// Interface sounds — synthesised with the Web Audio API (no audio files). A "paper & keys" sound set made for
// this page (different from the main consent page's chimes):
//   tap      soft paper tick (any button or link — every click has a sound)
//   unfold   paper rustle sweeping up (a section opens)        fold  the same, sweeping down
//   stamp    rubber-stamp thunk with an ink "tsk" (a section counted as read)
//   tick     key-tag click + small bell (a consent box ticked)  untick  dry click, lower
//   agree    deep stamp + bright two-note chime (a card tapped to agree)
//   party    celebration: shackle pop, rising fanfare, ribbon whoosh and a long sparkle shower (record sent)
//   pick     marimba blip (a choice: relationship, contact method, country)
//   key      metal key sliding in and turning (a key on the activation lock turns)
//   unlock   shackle pop + rising celeste arpeggio + paper-star sparkle (account activated)
//   yes      warm major third (teen says yes)                   no  soft falling pair (teen says no — no judgement)
//   sign     pen scribble (signature typed)                     send  paper plane whoosh (record sent)
//   warn     gentle wooden double knock (something still needed)
//   light / dark  theme switch
// Language signatures (one per language) live in i18n/sounds.js and are loaded on demand.
import { isSoundEnabled } from './i18n/soundPrefs.js';

let ctx = null;
let out = null;
let lastPlay = 0;
function audio() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = 0.6;
    const comp = ctx.createDynamicsCompressor();
    out.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}
function note(t, freq, { type = 'sine', dur = 0.18, vol = 0.16, a = 0.004, glide = 0, pan = 0 } = {}) {
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
let noiseBuf = null;
function noise(t, { dur = 0.1, vol = 0.06, type = 'bandpass', from = 1200, to = 0, q = 1, pan = 0 } = {}) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(from, t);
  if (to) f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  s.connect(f); f.connect(g);
  if (p) { p.pan.value = pan; g.connect(p); p.connect(out); } else g.connect(out);
  s.start(t, Math.random() * 0.5, dur + 0.05);
}
const RECIPES = {
  tap: (t) => { noise(t, { dur: 0.035, vol: 0.09, from: 3200, q: 2.5 }); note(t, 1180, { type: 'triangle', dur: 0.05, vol: 0.07, glide: 0.7 }); },
  unfold: (t) => { for (let i = 0; i < 4; i++) noise(t + i * 0.03, { dur: 0.07, vol: 0.05, from: 900 + i * 700, to: 2600 + i * 900, q: 1.4, pan: -0.3 + i * 0.2 }); note(t + 0.05, 740, { dur: 0.16, vol: 0.05, glide: 1.5 }); },
  fold: (t) => { for (let i = 0; i < 3; i++) noise(t + i * 0.03, { dur: 0.07, vol: 0.045, from: 3600 - i * 700, to: 900, q: 1.4, pan: 0.3 - i * 0.2 }); note(t + 0.04, 880, { dur: 0.12, vol: 0.04, glide: 0.66 }); },
  stamp: (t) => { note(t, 150, { type: 'sine', dur: 0.14, vol: 0.28, glide: 0.5 }); noise(t, { dur: 0.05, vol: 0.12, type: 'lowpass', from: 900, q: 0.8 }); noise(t + 0.06, { dur: 0.06, vol: 0.035, type: 'highpass', from: 5000 }); },
  tick: (t) => { noise(t, { dur: 0.02, vol: 0.12, from: 4200, q: 6 }); note(t + 0.02, 1568, { type: 'sine', dur: 0.25, vol: 0.07 }); note(t + 0.02, 2349, { dur: 0.18, vol: 0.03 }); },
  untick: (t) => { noise(t, { dur: 0.025, vol: 0.1, from: 2200, q: 5 }); note(t, 392, { type: 'triangle', dur: 0.08, vol: 0.07, glide: 0.8 }); },
  pick: (t) => { note(t, 988, { type: 'sine', dur: 0.2, vol: 0.12 }); note(t, 3950, { dur: 0.05, vol: 0.02 }); },
  key: (t) => {
    for (let i = 0; i < 6; i++) noise(t + i * 0.018, { dur: 0.015, vol: 0.08, from: 5200 - i * 300, q: 9 });
    noise(t + 0.16, { dur: 0.04, vol: 0.18, from: 2600, q: 4 });
    note(t + 0.16, 220, { type: 'triangle', dur: 0.1, vol: 0.12, glide: 0.8 });
    note(t + 0.2, 1760, { dur: 0.3, vol: 0.05 });
  },
  unlock: (t) => {
    noise(t, { dur: 0.05, vol: 0.2, from: 2000, q: 3 });
    note(t, 330, { type: 'triangle', dur: 0.12, vol: 0.14, glide: 1.5 });
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => note(t + 0.1 + i * 0.07, f, { type: 'sine', dur: 0.9, vol: 0.09, pan: (i - 2) * 0.25 }));
    for (let i = 0; i < 10; i++) note(t + 0.5 + i * 0.045, 2200 + Math.random() * 2400, { dur: 0.12, vol: 0.025, pan: Math.random() * 2 - 1 });
  },
  agree: (t) => {
    noise(t, { dur: 0.045, vol: 0.14, type: 'lowpass', from: 1100, q: 0.9 });
    note(t, 180, { type: 'sine', dur: 0.12, vol: 0.22, glide: 0.55 });
    note(t + 0.05, 1046.5, { type: 'sine', dur: 0.26, vol: 0.08 });
    note(t + 0.12, 1568, { type: 'sine', dur: 0.34, vol: 0.055 });
  },
  party: (t) => {
    // pop + ribbon whoosh
    noise(t, { dur: 0.06, vol: 0.22, from: 1800, q: 2.4 });
    note(t, 300, { type: 'triangle', dur: 0.14, vol: 0.16, glide: 1.9 });
    noise(t + 0.02, { dur: 0.5, vol: 0.07, from: 500, to: 6000, q: 0.7, pan: -0.45 });
    noise(t + 0.08, { dur: 0.5, vol: 0.06, from: 600, to: 5200, q: 0.7, pan: 0.45 });
    // rising fanfare (C–E–G–C–E–G)
    [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98].forEach((f, i) => {
      note(t + 0.06 + i * 0.085, f, { type: 'triangle', dur: 0.75, vol: 0.085, pan: (i - 2.5) * 0.18 });
      note(t + 0.06 + i * 0.085, f * 2, { dur: 0.3, vol: 0.022 });
    });
    // sparkle shower
    for (let i = 0; i < 26; i++) note(t + 0.5 + i * 0.045, 1800 + Math.random() * 3200, { dur: 0.16, vol: 0.022, pan: Math.random() * 2 - 1 });
    // warm bass bloom underneath
    note(t + 0.1, 130.81, { type: 'sine', dur: 1.5, vol: 0.09 });
    note(t + 0.1, 196, { type: 'sine', dur: 1.2, vol: 0.05 });
  },
  yes: (t) => { note(t, 523.25, { type: 'triangle', dur: 0.3, vol: 0.1 }); note(t + 0.09, 659.25, { type: 'triangle', dur: 0.4, vol: 0.1 }); note(t + 0.18, 783.99, { dur: 0.5, vol: 0.06 }); },
  no: (t) => { note(t, 440, { type: 'sine', dur: 0.22, vol: 0.08 }); note(t + 0.12, 349.23, { type: 'sine', dur: 0.32, vol: 0.08 }); },
  sign: (t) => { for (let i = 0; i < 5; i++) noise(t + i * 0.045, { dur: 0.04, vol: 0.05, from: 2500 + (i % 2) * 1500, q: 2, pan: -0.4 + i * 0.2 }); },
  send: (t) => { noise(t, { dur: 0.45, vol: 0.08, from: 400, to: 5200, q: 0.8, pan: -0.5 }); note(t + 0.1, 587, { dur: 0.4, vol: 0.06, glide: 2 }); },
  warn: (t) => { note(t, 196, { type: 'triangle', dur: 0.08, vol: 0.12 }); note(t + 0.12, 175, { type: 'triangle', dur: 0.09, vol: 0.12 }); },
  light: (t) => { note(t, 880, { type: 'triangle', dur: 0.08, vol: 0.07 }); note(t + 0.06, 1320, { type: 'triangle', dur: 0.14, vol: 0.07 }); },
  dark: (t) => { note(t, 660, { type: 'triangle', dur: 0.08, vol: 0.07 }); note(t + 0.06, 440, { type: 'triangle', dur: 0.16, vol: 0.07 }); },
  on: (t) => { note(t, 784, { type: 'triangle', dur: 0.12, vol: 0.1 }); note(t + 0.07, 1175, { type: 'triangle', dur: 0.2, vol: 0.1 }); },
  sparkle: (t) => { [1568, 1976, 2349, 2637, 3136].forEach((f, i) => note(t + i * 0.05, f, { dur: 0.22, vol: 0.05, pan: (i - 2) * 0.3 })); noise(t, { dur: 0.3, vol: 0.025, from: 5000, to: 9000, q: 1.2 }); },
  whoosh: (t) => { noise(t, { dur: 0.42, vol: 0.05, from: 300, to: 3800, q: 0.7, pan: -0.3 }); noise(t + 0.05, { dur: 0.36, vol: 0.03, from: 500, to: 5200, q: 0.8, pan: 0.3 }); note(t + 0.18, 880, { type: 'triangle', dur: 0.22, vol: 0.035, glide: 1.5 }); },
  blip: (t) => { const f = [659.25, 739.99, 880, 987.77, 1174.66, 1318.5][Math.floor(Math.random() * 6)]; note(t, f, { type: 'triangle', dur: 0.14, vol: 0.05, pan: Math.random() * 0.6 - 0.3 }); note(t, f * 2, { dur: 0.08, vol: 0.012 }); },
  turn: (t) => { for (let i = 0; i < 5; i++) noise(t + i * 0.035, { dur: 0.03, vol: 0.06, from: 2200 + i * 500, q: 3, pan: -0.3 + i * 0.15 }); note(t + 0.19, 659.25, { type: 'triangle', dur: 0.4, vol: 0.09 }); note(t + 0.27, 987.77, { type: 'triangle', dur: 0.55, vol: 0.09 }); note(t + 0.27, 1975.5, { dur: 0.3, vol: 0.02 }); },
  coin: (t) => { note(t, 196, { type: 'triangle', dur: 0.5, vol: 0.12, glide: 0.8 }); [784, 987.77, 1174.66, 1567.98, 1975.5].forEach((f, i) => note(t + 0.08 + i * 0.06, f, { type: 'triangle', dur: 0.4, vol: 0.06, pan: (i - 2) * 0.3 })); noise(t, { dur: 0.35, vol: 0.04, from: 400, to: 4800, q: 0.7 }); },
};
export function play(kind = 'tap') {
  lastPlay = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (!isSoundEnabled()) return;
  try {
    if (!audio()) return;
    (RECIPES[kind] || RECIPES.tap)(ctx.currentTime + 0.01);
  } catch {
    /* audio unavailable */
  }
}
/** True when a specific sound already played for the current click (so the generic tap is skipped). */
export const recentlyPlayed = (ms = 60) => (typeof performance !== 'undefined' ? performance.now() : Date.now()) - lastPlay < ms;
/** Language signature (separate chunk, loaded when the picker opens). */
export function playLanguage(code) {
  lastPlay = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (!isSoundEnabled()) return;
  import('./i18n/sounds.js').then((m) => m.playLanguageSound(code)).catch(() => {});
}
export const preloadLanguageSounds = () => import('./i18n/sounds.js').catch(() => {});

// Ambient sounds (section changes, hovers) wait for the first click, tap or key press, so nothing ever plays
// before the visitor has interacted, and they never touch the "a click already has a sound" bookkeeping.
let armed = false;
if (typeof window !== 'undefined') {
  const arm = () => { armed = true; };
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.addEventListener(e, arm, { once: true, capture: true, passive: true }));
}
export function playAmbient(kind) {
  if (!armed || !isSoundEnabled()) return;
  try { if (!audio()) return; (RECIPES[kind] || RECIPES.tap)(ctx.currentTime + 0.01); } catch { /* audio unavailable */ }
}
