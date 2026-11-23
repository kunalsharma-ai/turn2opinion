// Language sound signatures — every language has its own short (≈1.5 s) musical "hello", synthesised live
// with the Web Audio API. No audio files are downloaded (0 KB of assets, nothing to license) and the
// AudioContext is only created after a visitor clicks a language, so nothing ever plays on page load.
//
// Each signature borrows the colour of an instrument or musical tradition linked to the language —
// guzheng glissando for Chinese, koto for Japanese, sitar + tabla for Hindi, oud in maqam Rast for Arabic,
// flamenco guitar + castanets for Spanish, accordion musette for French, brass fanfare for German, and so on.
// They are impressions built from simple synthesis, not recordings of the real instruments.
//
// Public API: playLanguageSound(code). Preferences + names live in soundPrefs.js (always loaded);
// this synth file is a separate chunk, downloaded only when someone opens the language picker.
import { isSoundEnabled } from './soundPrefs.js';

let ctx = null;
let master = null;
let wet = null;

function audio() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(comp);
    comp.connect(ctx.destination);
    // Small hall reverb from a generated impulse response
    const verb = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 1.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    verb.buffer = ir;
    wet = ctx.createGain();
    wet.gain.value = 0.28;
    wet.connect(verb);
    verb.connect(comp);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

/** A voice output: gain node routed to master + reverb. */
function out(vol = 0.5, pan = 0, verb = 1) {
  const g = ctx.createGain();
  g.gain.value = vol;
  let node = g;
  if (ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    g.connect(p);
    node = p;
  }
  node.connect(master);
  if (verb) {
    const s = ctx.createGain();
    s.gain.value = verb;
    node.connect(s);
    s.connect(wet);
  }
  return g;
}

/* ---------------- instruments ---------------- */

/** Plucked string (Karplus–Strong). opts: bright 0–1, decay, dur, vol, bend (semitones), bendAt, buzz, pan */
function pluck(t, m, o = {}) {
  const sr = ctx.sampleRate;
  const dur = o.dur ?? 1.4;
  const f = hz(m);
  const n = Math.max(2, Math.round(sr / f));
  const len = Math.floor(sr * dur);
  const buf = ctx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  const ring = new Float32Array(n);
  const bright = o.bright ?? 0.6;
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const r = Math.random() * 2 - 1;
    prev = prev + bright * (r - prev); // low-pass the excitation for darker strings
    ring[i] = prev;
  }
  const decay = o.decay ?? 0.996;
  let idx = 0;
  for (let i = 0; i < len; i++) {
    const a = ring[idx];
    const b = ring[(idx + 1) % n];
    const v = decay * 0.5 * (a + b);
    ring[idx] = v;
    d[i] = o.buzz ? Math.tanh(a * (1 + o.buzz * 6)) : a;
    idx = (idx + 1) % n;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  if (o.bend) {
    const at = t + (o.bendAt ?? 0.12);
    src.playbackRate.setValueAtTime(1, at);
    src.playbackRate.linearRampToValueAtTime(Math.pow(2, o.bend / 12), at + (o.bendTime ?? 0.18));
    if (o.bendBack) src.playbackRate.linearRampToValueAtTime(1, at + (o.bendTime ?? 0.18) * 2.2);
  }
  const g = out(o.vol ?? 0.55, o.pan ?? 0, o.verb ?? 1);
  src.connect(g);
  src.start(t);
}

/** Oscillator voice: brass, reeds, bowed strings, flutes, pads, accordion. */
function tone(t, m, o = {}) {
  const dur = o.dur ?? 0.4;
  const g = out(o.vol ?? 0.25, o.pan ?? 0, o.verb ?? 1);
  const env = ctx.createGain();
  const a = o.a ?? 0.02;
  const r = o.r ?? 0.2;
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(1, t + a);
  env.gain.setValueAtTime(1, t + Math.max(a, dur - r));
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur + r);
  let tail = env;
  if (o.filter) {
    const f = ctx.createBiquadFilter();
    f.type = o.filterType || 'lowpass';
    f.Q.value = o.q ?? 1;
    f.frequency.setValueAtTime(o.filter * (o.filterEnv ? 0.4 : 1), t);
    if (o.filterEnv) f.frequency.exponentialRampToValueAtTime(o.filter, t + (o.filterEnv || 0.08));
    env.connect(f);
    tail = f;
  }
  if (o.trem) {
    const tg = ctx.createGain();
    const lfo = ctx.createOscillator();
    const ld = ctx.createGain();
    lfo.frequency.value = o.trem;
    ld.gain.value = 0.35;
    tg.gain.value = 0.65;
    lfo.connect(ld);
    ld.connect(tg.gain);
    tail.connect(tg);
    tail = tg;
    lfo.start(t);
    lfo.stop(t + dur + r + 0.05);
  }
  tail.connect(g);
  const types = Array.isArray(o.type) ? o.type : [o.type || 'sawtooth'];
  const detunes = o.detune ? [-o.detune, o.detune] : [0];
  for (const ty of types) {
    for (const dt of detunes) {
      const osc = ctx.createOscillator();
      osc.type = ty;
      osc.detune.value = dt;
      const f0 = hz(o.from ?? m);
      osc.frequency.setValueAtTime(f0, t);
      if (o.from !== undefined) osc.frequency.exponentialRampToValueAtTime(hz(m), t + (o.glide ?? 0.12));
      if (o.vib) {
        const lfo = ctx.createOscillator();
        const ld = ctx.createGain();
        lfo.frequency.value = o.vib;
        ld.gain.setValueAtTime(0, t);
        ld.gain.linearRampToValueAtTime(hz(m) * (o.vibDepth ?? 0.012), t + Math.min(0.25, dur));
        lfo.connect(ld);
        ld.connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + dur + r + 0.05);
      }
      osc.connect(env);
      osc.start(t);
      osc.stop(t + dur + r + 0.05);
    }
  }
  if (o.breath) noise(t, { dur: Math.min(dur, 0.25), vol: o.breath, type: 'bandpass', freq: hz(m) * 2, q: 1.2, verb: o.verb });
}

/** FM bell / gong. ratio 3.5 = bell, 1.4 = gong, 2.76 = metallophone. */
function bell(t, m, o = {}) {
  const dur = o.dur ?? 1.6;
  const f = hz(m);
  const g = out(o.vol ?? 0.22, o.pan ?? 0, o.verb ?? 1.2);
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(1, t + (o.a ?? 0.004));
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  env.connect(g);
  const car = ctx.createOscillator();
  const mod = ctx.createOscillator();
  const idx = ctx.createGain();
  car.frequency.value = f;
  mod.frequency.value = f * (o.ratio ?? 3.5);
  idx.gain.setValueAtTime(f * (o.index ?? 2.2), t);
  idx.gain.exponentialRampToValueAtTime(f * 0.05, t + dur * 0.8);
  mod.connect(idx);
  idx.connect(car.frequency);
  car.connect(env);
  car.start(t);
  mod.start(t);
  car.stop(t + dur + 0.05);
  mod.stop(t + dur + 0.05);
}

/** Struck bar: marimba / xylophone / kalimba / celesta / santur hammer. partials = frequency multipliers */
function mallet(t, m, o = {}) {
  const dur = o.dur ?? 0.7;
  const g = out(o.vol ?? 0.3, o.pan ?? 0, o.verb ?? 1);
  const parts = o.partials || [1, 4];
  parts.forEach((p, i) => {
    const osc = ctx.createOscillator();
    const e = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz(m) * p;
    const d = dur / (1 + i * 1.6);
    e.gain.setValueAtTime(0.0001, t);
    e.gain.exponentialRampToValueAtTime(i === 0 ? 1 : 0.35 / i, t + 0.004);
    e.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(e);
    e.connect(g);
    osc.start(t);
    osc.stop(t + d + 0.05);
  });
}

/** Filtered noise burst: castanets, shakers, claps, breath, cymbals. */
function noise(t, o = {}) {
  const dur = o.dur ?? 0.08;
  const len = Math.max(1, Math.floor(ctx.sampleRate * (dur + 0.02)));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = o.type || 'bandpass';
  f.frequency.value = o.freq ?? 2500;
  f.Q.value = o.q ?? 1;
  const e = ctx.createGain();
  e.gain.setValueAtTime(0.0001, t);
  e.gain.exponentialRampToValueAtTime(1, t + (o.a ?? 0.002));
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const g = out(o.vol ?? 0.3, o.pan ?? 0, o.verb ?? 0.6);
  src.connect(f);
  f.connect(e);
  e.connect(g);
  src.start(t);
}

/** Pitched membrane: tabla, dhol, taiko, darbuka, djembe, janggu. */
function drum(t, o = {}) {
  const dur = o.dur ?? 0.35;
  const osc = ctx.createOscillator();
  const e = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(o.f0 ?? 180, t);
  osc.frequency.exponentialRampToValueAtTime(o.f1 ?? 70, t + (o.sweep ?? 0.12));
  e.gain.setValueAtTime(0.0001, t);
  e.gain.exponentialRampToValueAtTime(1, t + 0.003);
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const g = out(o.vol ?? 0.6, o.pan ?? 0, o.verb ?? 0.4);
  osc.connect(e);
  e.connect(g);
  osc.start(t);
  osc.stop(t + dur + 0.05);
  if (o.slap) noise(t, { dur: 0.05, vol: o.slap, freq: o.slapFreq ?? 3000, q: 0.8, pan: o.pan, verb: 0.3 });
}

/* ---------------- helpers ---------------- */
const seq = (t, step, notes, fn) => notes.forEach((n, i) => n !== null && fn(t + i * step, n, i));
const chord = (t, notes, fn, spread = 0) => notes.forEach((n, i) => fn(t + i * spread, n, i));

/* ---------------- the signatures ---------------- */
const RECIPES = {
  // English — bright modern "sparkle": maj9 arpeggio on glassy bells + soft pad
  en: (t) => {
    seq(t, 0.08, [60, 64, 67, 71, 74, 79], (s, n, i) => bell(s, n, { ratio: 2, index: 1.2, dur: 1.2, vol: 0.14, pan: -0.5 + i * 0.2 }));
    chord(t + 0.05, [48, 55, 59, 62], (s, n) => tone(s, n, { type: 'triangle', dur: 1, a: 0.2, r: 0.6, vol: 0.06 }));
  },
  // Chinese (Simplified) — guzheng glissando in the gong pentatonic, a melodic answer and a small gong
  'zh-CN': (t) => {
    seq(t, 0.035, [62, 64, 66, 69, 71, 74, 76, 78, 81], (s, n, i) => pluck(s, n, { bright: 0.75, decay: 0.997, vol: 0.32, pan: -0.6 + i * 0.15 }));
    pluck(t + 0.45, 78, { bright: 0.7, bend: 2, bendAt: 0.18, bendBack: true, vol: 0.5 });
    pluck(t + 0.75, 74, { bright: 0.7, vol: 0.45 });
    bell(t + 0.95, 50, { ratio: 1.41, index: 3, dur: 2.2, vol: 0.18 });
  },
  // Chinese (Traditional) — erhu-like bowed glide over pipa tremolo
  'zh-TW': (t) => {
    for (let i = 0; i < 10; i++) pluck(t + i * 0.045, i < 5 ? 69 : 71, { bright: 0.85, decay: 0.993, dur: 0.4, vol: 0.18, pan: 0.4 });
    tone(t + 0.3, 76, { from: 74, glide: 0.18, type: 'sawtooth', filter: 2200, dur: 0.5, a: 0.08, r: 0.25, vib: 6, vibDepth: 0.018, vol: 0.13, pan: -0.2 });
    tone(t + 0.85, 74, { from: 76, glide: 0.25, type: 'sawtooth', filter: 2000, dur: 0.6, a: 0.05, r: 0.4, vib: 5.5, vibDepth: 0.02, vol: 0.12 });
  },
  // Japanese — koto in the miyako-bushi scale, bent last note, wind-chime shimmer
  ja: (t) => {
    seq(t, 0.13, [64, 65, 69, 71, 72], (s, n, i) => pluck(s, n, { bright: 0.55, decay: 0.995, vol: 0.45, pan: -0.3 + i * 0.15 }));
    pluck(t + 0.75, 76, { bright: 0.55, bend: 1, bendAt: 0.2, bendTime: 0.25, vol: 0.5 });
    seq(t + 0.2, 0.17, [96, 100, 98], (s, n) => bell(s, n, { ratio: 3.5, index: 0.6, dur: 1.2, vol: 0.05, pan: 0.6 }));
  },
  // Korean — gayageum pluck with vibrato bend (nonghyeon) + janggu double hit
  ko: (t) => {
    drum(t, { f0: 140, f1: 80, dur: 0.4, vol: 0.45, pan: -0.4 });
    drum(t + 0.02, { f0: 420, f1: 300, dur: 0.12, vol: 0.2, slap: 0.25, pan: 0.4 });
    seq(t + 0.15, 0.16, [62, 64, 67, 69], (s, n) => pluck(s, n, { bright: 0.5, decay: 0.995, vol: 0.45 }));
    pluck(t + 0.85, 72, { bright: 0.5, bend: 1.2, bendAt: 0.12, bendTime: 0.14, bendBack: true, vol: 0.5 });
    drum(t + 0.85, { f0: 120, f1: 70, dur: 0.5, vol: 0.4, pan: -0.4 });
  },
  // Hindi — tanpura drone, sitar phrase (raga Yaman flavour) with meend, tabla "dha-dhin"
  hi: (t) => {
    [48, 55, 60].forEach((n, i) => pluck(t + i * 0.18, n, { bright: 0.4, buzz: 0.4, decay: 0.999, dur: 1.8, vol: 0.2, pan: -0.5 }));
    seq(t + 0.15, 0.14, [72, 74, 76, 78], (s, n) => pluck(s, n, { bright: 0.85, buzz: 0.5, vol: 0.32, pan: 0.2 }));
    pluck(t + 0.75, 79, { bright: 0.85, buzz: 0.5, bend: 2, bendAt: 0.05, bendTime: 0.3, vol: 0.4, pan: 0.2 });
    drum(t + 0.1, { f0: 330, f1: 280, dur: 0.3, vol: 0.35, slap: 0.15, pan: 0.5 });
    drum(t + 0.1, { f0: 110, f1: 75, dur: 0.4, vol: 0.4, pan: 0.5 });
    drum(t + 0.6, { f0: 340, f1: 300, dur: 0.4, vol: 0.32, slap: 0.12, pan: 0.5 });
  },
  // Bengali — bansuri flute phrase over an ektara pulse
  bn: (t) => {
    seq(t, 0.2, [50, 50, 50, 50, 50], (s, n) => pluck(s, n, { bright: 0.6, buzz: 0.3, dur: 0.5, vol: 0.25, pan: -0.4 }));
    tone(t + 0.1, 74, { from: 72, glide: 0.15, type: 'sine', dur: 0.32, a: 0.06, r: 0.1, vib: 5, vibDepth: 0.01, breath: 0.05, vol: 0.22, pan: 0.2 });
    tone(t + 0.45, 75, { type: 'sine', dur: 0.25, a: 0.04, r: 0.08, vib: 5, breath: 0.04, vol: 0.2, pan: 0.2 });
    tone(t + 0.72, 79, { from: 77, glide: 0.2, type: 'sine', dur: 0.6, a: 0.05, r: 0.4, vib: 5.5, vibDepth: 0.015, breath: 0.05, vol: 0.22, pan: 0.2 });
  },
  // Tamil — veena with Carnatic gamaka + mridangam strokes
  ta: (t) => {
    drum(t, { f0: 260, f1: 230, dur: 0.25, vol: 0.35, slap: 0.12 });
    drum(t + 0.18, { f0: 95, f1: 70, dur: 0.35, vol: 0.4 });
    drum(t + 0.3, { f0: 280, f1: 240, dur: 0.2, vol: 0.3, slap: 0.1 });
    seq(t + 0.1, 0.16, [60, 62, 64, 67], (s, n) => pluck(s, n, { bright: 0.45, decay: 0.997, buzz: 0.15, vol: 0.45 }));
    pluck(t + 0.75, 69, { bright: 0.45, decay: 0.998, bend: 2, bendAt: 0.08, bendTime: 0.12, bendBack: true, vol: 0.5, dur: 1.4 });
  },
  // Telugu — nadaswaram-like reed call with thavil hits
  te: (t) => {
    drum(t, { f0: 160, f1: 90, dur: 0.3, vol: 0.5, slap: 0.3, slapFreq: 1800 });
    tone(t + 0.1, 72, { type: 'square', filter: 2600, filterType: 'bandpass', q: 0.8, dur: 0.22, vib: 6, vol: 0.12 });
    tone(t + 0.35, 74, { type: 'square', filter: 2800, filterType: 'bandpass', q: 0.8, dur: 0.18, vib: 6, vol: 0.12 });
    tone(t + 0.55, 77, { from: 76, glide: 0.1, type: 'square', filter: 3000, filterType: 'bandpass', q: 0.8, dur: 0.7, r: 0.35, vib: 6.5, vibDepth: 0.02, vol: 0.13 });
    drum(t + 0.55, { f0: 150, f1: 85, dur: 0.35, vol: 0.45, slap: 0.25, slapFreq: 1800 });
  },
  // Marathi — dhol-tasha procession: tasha roll + dhol booms + harmonium
  mr: (t) => {
    for (let i = 0; i < 12; i++) noise(t + i * 0.045, { dur: 0.04, vol: 0.06 + i * 0.012, freq: 1900, q: 3, pan: 0.4 });
    [0, 0.3, 0.45].forEach((d) => drum(t + d, { f0: 110, f1: 55, dur: 0.45, vol: 0.55, pan: -0.3 }));
    chord(t + 0.62, [60, 64, 67], (s, n) => tone(s, n, { type: ['square', 'sawtooth'], filter: 1600, dur: 0.7, a: 0.05, r: 0.4, vol: 0.05 }));
    drum(t + 0.62, { f0: 105, f1: 50, dur: 0.6, vol: 0.55, pan: -0.3 });
  },
  // Gujarati — dandiya sticks in garba six-eight + shehnai
  gu: (t) => {
    [0, 0.17, 0.34, 0.5, 0.67, 0.84].forEach((d, i) => noise(t + d, { dur: 0.03, vol: i % 3 === 0 ? 0.35 : 0.2, freq: 3400, q: 5, pan: i % 2 ? 0.5 : -0.5 }));
    tone(t + 0.1, 72, { type: 'sawtooth', filter: 2400, filterType: 'bandpass', q: 1.2, dur: 0.3, vib: 7, vol: 0.12 });
    tone(t + 0.45, 74, { type: 'sawtooth', filter: 2400, filterType: 'bandpass', q: 1.2, dur: 0.2, vib: 7, vol: 0.12 });
    tone(t + 0.68, 76, { from: 74, glide: 0.1, type: 'sawtooth', filter: 2600, filterType: 'bandpass', q: 1.2, dur: 0.6, r: 0.3, vib: 7, vibDepth: 0.02, vol: 0.12 });
  },
  // Punjabi — bhangra dhol groove + tumbi riff
  pa: (t) => {
    [[0, 'b'], [0.16, 's'], [0.32, 'b'], [0.4, 'b'], [0.56, 's'], [0.72, 'b']].forEach(([d, k]) =>
      k === 'b' ? drum(t + d, { f0: 120, f1: 55, dur: 0.4, vol: 0.6, pan: -0.2 }) : drum(t + d, { f0: 500, f1: 380, dur: 0.1, vol: 0.25, slap: 0.4, pan: 0.3 })
    );
    seq(t + 0.05, 0.11, [81, 81, 84, 81, 79, 81, 88], (s, n) => pluck(s, n, { bright: 0.95, decay: 0.99, dur: 0.5, vol: 0.28, pan: 0.4 }));
  },
  // Kannada — veena in raga Mohanam (pentatonic) + ghatam clay-pot taps
  kn: (t) => {
    seq(t, 0.12, [62, 64, 66, 69, 71, 74], (s, n) => pluck(s, n, { bright: 0.5, decay: 0.997, buzz: 0.15, vol: 0.4 }));
    pluck(t + 0.8, 76, { bright: 0.5, bend: 1.5, bendAt: 0.1, bendBack: true, vol: 0.45, dur: 1.2 });
    [0.05, 0.29, 0.41, 0.65].forEach((d) => noise(t + d, { dur: 0.06, vol: 0.3, freq: 900, q: 6, pan: 0.5 }));
  },
  // Malayalam — chenda roll swelling into a temple bell
  ml: (t) => {
    for (let i = 0; i < 14; i++) drum(t + i * 0.042, { f0: 380, f1: 260, dur: 0.08, vol: 0.08 + i * 0.02, slap: 0.12, pan: i % 2 ? 0.3 : -0.3 });
    drum(t + 0.62, { f0: 130, f1: 60, dur: 0.5, vol: 0.5 });
    bell(t + 0.62, 76, { ratio: 2.76, index: 1.5, dur: 2.2, vol: 0.18 });
    bell(t + 0.62, 88, { ratio: 3.5, index: 0.8, dur: 1.5, vol: 0.06 });
  },
  // Urdu — qawwali: harmonium chord, tabla and hand claps
  ur: (t) => {
    chord(t, [57, 60, 64], (s, n) => tone(s, n, { type: ['square', 'sawtooth'], filter: 1500, dur: 1.1, a: 0.08, r: 0.4, trem: 5, vol: 0.05 }));
    tone(t + 0.3, 72, { type: ['square', 'sawtooth'], filter: 2000, dur: 0.25, a: 0.03, vol: 0.06 });
    tone(t + 0.58, 71, { type: ['square', 'sawtooth'], filter: 2000, dur: 0.5, a: 0.03, vol: 0.06 });
    [0.3, 0.58, 0.86].forEach((d) => noise(t + d, { dur: 0.06, vol: 0.4, freq: 1400, q: 1.2, verb: 1 }));
    drum(t, { f0: 330, f1: 290, dur: 0.3, vol: 0.3, slap: 0.12 });
    drum(t + 0.44, { f0: 100, f1: 70, dur: 0.35, vol: 0.4 });
  },
  // Arabic — oud phrase in maqam Rast (with its half-flat third) over darbuka doum-tek-tek
  ar: (t) => {
    drum(t, { f0: 120, f1: 65, dur: 0.4, vol: 0.55 });
    noise(t + 0.2, { dur: 0.05, vol: 0.3, freq: 4200, q: 2, pan: 0.4 });
    noise(t + 0.3, { dur: 0.05, vol: 0.25, freq: 4200, q: 2, pan: 0.4 });
    drum(t + 0.6, { f0: 120, f1: 65, dur: 0.4, vol: 0.5 });
    seq(t + 0.05, 0.14, [60, 62, 63.5, 65, 67], (s, n) => pluck(s, n, { bright: 0.35, decay: 0.994, vol: 0.5, pan: -0.2 }));
    pluck(t + 0.8, 63.5, { bright: 0.35, decay: 0.996, vol: 0.5, pan: -0.2, bend: -0.5, bendAt: 0.2 });
  },
  // Persian — santur tremolo in dastgah Shur
  fa: (t) => {
    for (let i = 0; i < 6; i++) mallet(t + i * 0.055, i % 2 ? 74 : 75.5, { partials: [1, 2.01, 3], dur: 0.6, vol: 0.12, pan: 0.2 });
    seq(t + 0.4, 0.13, [72, 70, 68.5, 67], (s, n) => { mallet(s, n, { partials: [1, 2.01, 3], dur: 0.8, vol: 0.18 }); pluck(s, n, { bright: 0.9, vol: 0.15, dur: 0.8 }); });
  },
  // Hebrew — clarinet line in the freygish mode + tambourine
  he: (t) => {
    seq(t, 0.15, [62, 63, 66, 67, 69], (s, n, i) => tone(s, n, { type: 'square', filter: 1800, dur: 0.17, a: 0.02, r: 0.08, vib: i === 4 ? 6 : 0, vol: 0.1 }));
    tone(t + 0.75, 70, { from: 69, glide: 0.08, type: 'square', filter: 1900, dur: 0.6, a: 0.02, r: 0.3, vib: 6, vibDepth: 0.02, vol: 0.1 });
    [0, 0.3, 0.45, 0.75].forEach((d) => noise(t + d, { dur: 0.12, vol: 0.16, freq: 7000, type: 'highpass', pan: 0.5 }));
  },
  // Turkish — bağlama run in Hicaz + bendir
  tr: (t) => {
    seq(t, 0.09, [69, 70, 73, 74, 76, 74, 73], (s, n) => pluck(s, n, { bright: 0.9, decay: 0.993, vol: 0.35, dur: 0.8 }));
    pluck(t + 0.75, 70, { bright: 0.9, decay: 0.996, vol: 0.4, bend: -1, bendAt: 0.25 });
    drum(t, { f0: 90, f1: 55, dur: 0.5, vol: 0.5 });
    drum(t + 0.36, { f0: 260, f1: 220, dur: 0.15, vol: 0.25, slap: 0.2 });
    drum(t + 0.72, { f0: 90, f1: 55, dur: 0.5, vol: 0.45 });
  },
  // Spanish — flamenco rasgueado (Am–G–F–E) with castanets
  es: (t) => {
    const strum = (s, notes, v = 0.3) => chord(s, notes, (x, n) => pluck(x, n, { bright: 0.7, decay: 0.994, vol: v, dur: 0.9 }), 0.012);
    strum(t, [57, 64, 69, 72, 76]);
    strum(t + 0.22, [55, 62, 67, 71, 74]);
    strum(t + 0.44, [53, 60, 65, 69, 72]);
    strum(t + 0.7, [52, 59, 64, 68, 71, 76], 0.36);
    for (let i = 0; i < 6; i++) noise(t + 0.55 + i * 0.03, { dur: 0.02, vol: 0.22, freq: 3300, q: 8, pan: 0.6 });
    noise(t + 0.22, { dur: 0.02, vol: 0.25, freq: 3300, q: 8, pan: 0.6 });
  },
  // Portuguese — bossa nova: nylon guitar maj7 chords, shaker and rim click
  pt: (t) => {
    chord(t, [48, 55, 59, 64], (s, n) => pluck(s, n, { bright: 0.35, decay: 0.996, vol: 0.32, dur: 1 }), 0.02);
    chord(t + 0.45, [50, 57, 60, 65], (s, n) => pluck(s, n, { bright: 0.35, decay: 0.996, vol: 0.3, dur: 1.2 }), 0.02);
    for (let i = 0; i < 8; i++) noise(t + i * 0.11, { dur: 0.05, vol: i % 2 ? 0.07 : 0.12, freq: 8000, type: 'highpass', pan: 0.4 });
    [0.33, 0.66].forEach((d) => noise(t + d, { dur: 0.02, vol: 0.25, freq: 1800, q: 6, pan: -0.4 }));
  },
  // French — accordion musette waltz: bass + oom-pah chords + a melody with tremolo
  fr: (t) => {
    const acc = (s, n, d, v = 0.06) => tone(s, n, { type: ['sawtooth', 'square'], detune: 9, filter: 2400, dur: d, a: 0.02, r: 0.12, trem: 6, vol: v });
    pluck(t, 45, { bright: 0.4, vol: 0.4 });
    chord(t + 0.22, [60, 64, 69], (s, n) => acc(s, n, 0.12, 0.03));
    chord(t + 0.44, [60, 64, 69], (s, n) => acc(s, n, 0.12, 0.03));
    seq(t, 0.22, [76, 77, 76, 72], (s, n) => acc(s, n, 0.2));
    acc(t + 0.88, 74, 0.5);
    pluck(t + 0.66, 40, { bright: 0.4, vol: 0.35 });
  },
  // Italian — mandolin tremolo melody
  it: (t) => {
    const trem = (s, n, len) => { for (let i = 0; i < len; i++) pluck(s + i * 0.05, n, { bright: 0.9, decay: 0.99, dur: 0.3, vol: 0.2, pan: 0.2 }); };
    trem(t, 72, 4);
    trem(t + 0.22, 76, 4);
    trem(t + 0.44, 79, 4);
    trem(t + 0.66, 84, 8);
    chord(t, [48, 55, 64], (s, n) => pluck(s, n, { bright: 0.4, vol: 0.25, pan: -0.3, dur: 1.4 }), 0.03);
  },
  // German — brass fanfare with timpani
  de: (t) => {
    const brass = (s, n, d) => tone(s, n, { type: 'sawtooth', filter: 2800, filterEnv: 0.08, dur: d, a: 0.03, r: 0.15, vol: 0.12 });
    brass(t, 60, 0.12);
    brass(t + 0.15, 60, 0.12);
    brass(t + 0.3, 64, 0.15);
    brass(t + 0.5, 67, 0.15);
    chord(t + 0.7, [60, 64, 67, 72], (s, n) => brass(s, n, 0.7));
    drum(t + 0.7, { f0: 90, f1: 70, dur: 0.9, vol: 0.5 });
    drum(t, { f0: 90, f1: 70, dur: 0.4, vol: 0.35 });
  },
  // Dutch — carillon bells ringing down from the tower
  nl: (t) => {
    seq(t, 0.18, [79, 76, 74, 72, 67], (s, n, i) => bell(s, n, { ratio: 2.4, index: 1.8, dur: 1.6, vol: 0.13, pan: -0.4 + i * 0.2 }));
    bell(t + 0.9, 60, { ratio: 2.4, index: 2, dur: 2.2, vol: 0.12 });
  },
  // Russian — balalaika tremolo in A minor over a bass
  ru: (t) => {
    const trem = (s, n, len) => { for (let i = 0; i < len; i++) pluck(s + i * 0.045, n, { bright: 0.85, decay: 0.99, dur: 0.3, vol: 0.2 }); };
    pluck(t, 45, { bright: 0.5, vol: 0.45 });
    trem(t, 76, 5);
    trem(t + 0.25, 77, 4);
    trem(t + 0.45, 76, 4);
    trem(t + 0.65, 81, 10);
    pluck(t + 0.65, 40, { bright: 0.5, vol: 0.4 });
  },
  // Ukrainian — bandura cascade, minor with a bright major turn
  uk: (t) => {
    seq(t, 0.05, [57, 60, 64, 69, 72, 76, 81], (s, n, i) => pluck(s, n, { bright: 0.6, decay: 0.997, vol: 0.28, pan: -0.6 + i * 0.2 }));
    seq(t + 0.55, 0.05, [55, 59, 62, 67, 71, 74, 79], (s, n, i) => pluck(s, n, { bright: 0.6, decay: 0.998, vol: 0.28, pan: 0.6 - i * 0.2 }));
  },
  // Polish — mazurka on a fiddle: accent on beat two
  pl: (t) => {
    const fid = (s, n, d, v = 0.1) => tone(s, n, { type: 'sawtooth', filter: 3000, dur: d, a: 0.04, r: 0.1, vib: 6, vibDepth: 0.01, vol: v });
    fid(t, 69, 0.16);
    fid(t + 0.2, 74, 0.35, 0.14);
    fid(t + 0.6, 72, 0.16);
    fid(t + 0.8, 76, 0.45, 0.14);
    pluck(t, 50, { bright: 0.4, vol: 0.35 });
    pluck(t + 0.6, 45, { bright: 0.4, vol: 0.35 });
  },
  // Swedish — nyckelharpa-like folk phrase in dorian with sympathetic shimmer
  sv: (t) => {
    seq(t, 0.17, [62, 64, 65, 69, 67], (s, n) => {
      tone(s, n, { type: 'sawtooth', filter: 3500, dur: 0.18, a: 0.02, r: 0.12, vol: 0.09 });
      bell(s, n + 12, { ratio: 2, index: 0.5, dur: 0.9, vol: 0.04 });
    });
    tone(t + 0.85, 74, { type: 'sawtooth', filter: 3500, dur: 0.5, a: 0.02, r: 0.3, vib: 5, vol: 0.1 });
  },
  // Norwegian — a long lur horn call under aurora ice chimes
  nb: (t) => {
    tone(t, 50, { type: 'sawtooth', filter: 900, filterEnv: 0.3, dur: 0.6, a: 0.12, r: 0.3, vol: 0.14 });
    tone(t + 0.55, 57, { from: 55, glide: 0.1, type: 'sawtooth', filter: 1100, dur: 0.7, a: 0.05, r: 0.5, vol: 0.14 });
    seq(t + 0.2, 0.11, [93, 98, 100, 105, 103], (s, n, i) => bell(s, n, { ratio: 3.1, index: 0.4, dur: 1, vol: 0.05, pan: -0.5 + i * 0.25 }));
  },
  // Danish — music-box celesta, "hygge" waltz
  da: (t) => {
    seq(t, 0.16, [84, 88, 91, 88, 86, 89, 93], (s, n, i) => mallet(s, n, { partials: [1, 3, 5.2], dur: 0.9, vol: 0.14, pan: -0.3 + i * 0.1 }));
    mallet(t, 60, { partials: [1, 2], dur: 1.2, vol: 0.12 });
  },
  // Finnish — kantele pentatonic cascade
  fi: (t) => {
    seq(t, 0.1, [69, 71, 72, 74, 76, 74, 72, 71, 69], (s, n, i) => pluck(s, n, { bright: 0.45, decay: 0.998, vol: 0.3, dur: 1.4, pan: -0.4 + i * 0.1 }));
  },
  // Greek — bouzouki tremolo in Hijaz-kar
  el: (t) => {
    const trem = (s, n, len) => { for (let i = 0; i < len; i++) pluck(s + i * 0.048, n, { bright: 0.95, decay: 0.99, dur: 0.35, vol: 0.2, pan: 0.2 }); };
    trem(t, 74, 3);
    trem(t + 0.15, 75, 3);
    trem(t + 0.3, 78, 3);
    trem(t + 0.45, 79, 3);
    trem(t + 0.62, 81, 9);
    chord(t, [50, 57, 62], (s, n) => pluck(s, n, { bright: 0.5, vol: 0.25, dur: 1.3, pan: -0.3 }), 0.02);
  },
  // Czech — polka: oom-pah brass and a skipping clarinet
  cs: (t) => {
    [0, 0.4, 0.8].forEach((d, i) => tone(t + d, i === 1 ? 43 : 48, { type: 'sawtooth', filter: 800, dur: 0.12, a: 0.01, r: 0.08, vol: 0.2 }));
    [0.2, 0.6, 1].forEach((d) => chord(t + d, [60, 64, 67], (s, n) => tone(s, n, { type: 'sawtooth', filter: 1800, dur: 0.1, a: 0.01, r: 0.06, vol: 0.05 })));
    seq(t, 0.1, [72, 74, 76, 77, 79, null, 79, null, 84], (s, n) => tone(s, n, { type: 'square', filter: 2200, dur: 0.08, a: 0.01, r: 0.05, vol: 0.08 }));
  },
  // Hungarian — cimbalom run in the Hungarian minor
  hu: (t) => {
    seq(t, 0.065, [69, 71, 72, 75, 76, 77, 80, 81], (s, n) => { mallet(s, n, { partials: [1, 2.02, 3.01], dur: 0.5, vol: 0.12 }); pluck(s, n, { bright: 0.95, decay: 0.993, vol: 0.12, dur: 0.6 }); });
    chord(t + 0.6, [57, 64, 69, 72], (s, n) => pluck(s, n, { bright: 0.9, decay: 0.997, vol: 0.2, dur: 1.4 }), 0.03);
  },
  // Romanian — nai (pan flute) doina with breathy glides
  ro: (t) => {
    tone(t, 76, { from: 74, glide: 0.2, type: 'sine', dur: 0.4, a: 0.06, r: 0.1, vib: 5, breath: 0.08, vol: 0.22 });
    tone(t + 0.45, 79, { from: 81, glide: 0.08, type: 'sine', dur: 0.2, a: 0.03, r: 0.06, breath: 0.06, vol: 0.2 });
    tone(t + 0.68, 77, { type: 'sine', dur: 0.15, a: 0.03, r: 0.05, breath: 0.06, vol: 0.2 });
    tone(t + 0.86, 76, { from: 77, glide: 0.25, type: 'sine', dur: 0.6, a: 0.04, r: 0.4, vib: 5.5, vibDepth: 0.018, breath: 0.07, vol: 0.22 });
  },
  // Indonesian — gamelan metallophones in pelog + gong ageng
  id: (t) => {
    seq(t, 0.15, [64, 65, 67, 71, 72, 71], (s, n, i) => mallet(s, n, { partials: [1, 2.76, 5.4], dur: 1, vol: 0.18, pan: -0.3 + i * 0.12 }));
    bell(t + 0.9, 40, { ratio: 1.41, index: 2.5, dur: 2.6, vol: 0.25 });
  },
  // Malay — kompang frame drums answered by a rebab line
  ms: (t) => {
    [0, 0.12, 0.24, 0.48, 0.6].forEach((d, i) => drum(t + d, { f0: 260, f1: 200, dur: 0.12, vol: 0.3, slap: 0.3, slapFreq: 2400, pan: i % 2 ? 0.4 : -0.4 }));
    tone(t + 0.3, 69, { from: 67, glide: 0.15, type: 'sawtooth', filter: 1800, dur: 0.35, a: 0.05, r: 0.1, vib: 6, vol: 0.1 });
    tone(t + 0.72, 72, { from: 71, glide: 0.1, type: 'sawtooth', filter: 1800, dur: 0.6, a: 0.04, r: 0.35, vib: 6, vibDepth: 0.02, vol: 0.1 });
  },
  // Thai — ranat ek xylophone run + ching cymbal
  th: (t) => {
    seq(t, 0.075, [72, 74, 76, 79, 81, 84, 81, 79, 81, 84], (s, n) => mallet(s, n, { partials: [1, 3.9, 9.2], dur: 0.35, vol: 0.18 }));
    [0, 0.45].forEach((d) => bell(t + d, 100, { ratio: 1.6, index: 4, dur: d ? 1.2 : 0.4, vol: 0.05, pan: 0.5 }));
  },
  // Vietnamese — đàn bầu monochord with its signature pitch bends
  vi: (t) => {
    pluck(t, 67, { bright: 0.3, decay: 0.999, dur: 0.6, bend: 3, bendAt: 0.15, bendTime: 0.2, vol: 0.5 });
    pluck(t + 0.55, 72, { bright: 0.3, decay: 0.999, dur: 1.2, bend: -2, bendAt: 0.15, bendTime: 0.3, bendBack: true, vol: 0.5 });
    seq(t + 0.1, 0.12, [79, 81, 84], (s, n) => pluck(s, n, { bright: 0.7, vol: 0.18, dur: 0.6, pan: 0.5 }));
  },
  // Filipino — kulintang gong melody over the agung
  fil: (t) => {
    seq(t, 0.12, [67, 69, 72, 69, 74, 72, 76], (s, n, i) => bell(s, n, { ratio: 1.0, index: 0.9, dur: 0.6, vol: 0.13, pan: -0.3 + i * 0.1 }));
    bell(t, 43, { ratio: 1.5, index: 1.5, dur: 1.8, vol: 0.2 });
    bell(t + 0.48, 43, { ratio: 1.5, index: 1.5, dur: 1.8, vol: 0.16 });
  },
  // Swahili — kalimba (mbira) pattern + djembe tone and slap
  sw: (t) => {
    seq(t, 0.11, [72, 76, 79, 76, 74, 77, 81, 79], (s, n) => { mallet(s, n, { partials: [1, 5.9], dur: 0.6, vol: 0.2 }); noise(s, { dur: 0.015, vol: 0.05, freq: 5000, q: 4 }); });
    drum(t, { f0: 140, f1: 80, dur: 0.4, vol: 0.45 });
    drum(t + 0.44, { f0: 420, f1: 320, dur: 0.1, vol: 0.25, slap: 0.4 });
    drum(t + 0.66, { f0: 140, f1: 80, dur: 0.4, vol: 0.4 });
  },
  // Nepali — madal hand-drum groove under a bansuri phrase in a Himalayan pentatonic
  ne: (t) => {
    [0, 0.22, 0.33, 0.55].forEach((d, i) => drum(t + d, { f0: i % 2 ? 300 : 150, f1: i % 2 ? 240 : 85, dur: 0.25, vol: 0.38, slap: i % 2 ? 0.18 : 0, pan: -0.3 }));
    seq(t + 0.12, 0.16, [74, 76, 79, 81], (s, n) => tone(s, n, { type: 'sine', dur: 0.2, a: 0.04, r: 0.08, vib: 5.5, breath: 0.05, vol: 0.2, pan: 0.25 }));
    tone(t + 0.78, 83, { from: 81, glide: 0.2, type: 'sine', dur: 0.5, a: 0.05, r: 0.35, vib: 5, vibDepth: 0.014, breath: 0.04, vol: 0.2, pan: 0.25 });
  },
  // Sinhala — geta bera drum roll + horanewa-like reed answering
  si: (t) => {
    for (let i = 0; i < 6; i++) drum(t + i * 0.07, { f0: i === 5 ? 120 : 260, f1: i === 5 ? 70 : 200, dur: 0.18, vol: 0.3 + (i === 5 ? 0.15 : 0), slap: 0.1, pan: -0.4 });
    tone(t + 0.45, 72, { from: 71, glide: 0.08, type: ['sawtooth', 'square'], filter: 1900, dur: 0.22, a: 0.02, r: 0.08, vib: 6.5, vol: 0.08, pan: 0.3 });
    tone(t + 0.7, 74, { type: ['sawtooth', 'square'], filter: 2100, dur: 0.45, a: 0.02, r: 0.3, vib: 6.5, vibDepth: 0.016, vol: 0.08, pan: 0.3 });
  },
  // Khmer — roneat ek (bamboo xylophone) run with a skor drum and small ching cymbal
  km: (t) => {
    seq(t, 0.075, [67, 69, 72, 74, 76, 79, 76, 74], (s, n, i) => mallet(s, n, { partials: [1, 3.9, 9.2], dur: 0.35, vol: 0.2, pan: -0.4 + i * 0.1 }));
    drum(t, { f0: 160, f1: 90, dur: 0.4, vol: 0.4 });
    noise(t + 0.3, { dur: 0.25, vol: 0.08, type: 'highpass', freq: 6500, q: 0.6, verb: 1 });
    noise(t + 0.6, { dur: 0.05, vol: 0.12, type: 'highpass', freq: 7000, q: 0.6, verb: 0.8 });
    mallet(t + 0.68, 84, { partials: [1, 3.9], dur: 0.8, vol: 0.22 });
  },
  // Bulgarian — gadulka bowed line in an uneven 7/8 pulse (3+2+2) with a tapan thump
  bg: (t) => {
    [0, 0.21, 0.35, 0.49].forEach((d, i) => drum(t + d, { f0: i === 0 ? 110 : 220, f1: i === 0 ? 60 : 160, dur: 0.22, vol: i === 0 ? 0.5 : 0.25, slap: i ? 0.12 : 0 }));
    seq(t + 0.05, 0.1, [69, 70, 73, 74, 76], (s, n) => tone(s, n, { type: 'sawtooth', filter: 2600, q: 2, dur: 0.11, a: 0.01, r: 0.05, vol: 0.09, pan: 0.25 }));
    tone(t + 0.6, 77, { from: 76, glide: 0.06, type: 'sawtooth', filter: 2400, q: 2, dur: 0.55, a: 0.02, r: 0.3, vib: 6.5, vibDepth: 0.015, vol: 0.1, pan: 0.25 });
  },
  // Afrikaans — boeremusiek concertina "vastrap" chords with a guitar strum
  af: (t) => {
    [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67, 72]].forEach((c, i) => chord(t + i * 0.2, c, (s, n) => tone(s, n, { type: 'square', filter: 1800, dur: i === 3 ? 0.55 : 0.14, a: 0.01, r: i === 3 ? 0.35 : 0.05, detune: 9, vol: 0.05 })));
    chord(t, [48, 55, 60, 64], (s, n) => pluck(s, n, { bright: 0.6, vol: 0.18, dur: 0.8 }), 0.012);
    chord(t + 0.6, [48, 55, 60, 64], (s, n) => pluck(s, n, { bright: 0.6, vol: 0.2, dur: 1.2 }), 0.012);
  },
  // Zulu — marimba call-and-response over a deep isigubhu drum
  zu: (t) => {
    seq(t, 0.11, [67, 71, 74, 71, 72, 76, 79], (s, n, i) => mallet(s, n, { partials: [1, 4, 10], dur: 0.5, vol: 0.22, pan: i % 2 ? 0.35 : -0.35 }));
    drum(t, { f0: 90, f1: 50, dur: 0.6, vol: 0.55 });
    drum(t + 0.44, { f0: 90, f1: 50, dur: 0.6, vol: 0.45 });
    mallet(t + 0.8, 83, { partials: [1, 4], dur: 0.9, vol: 0.24 });
  },
  // Amharic — krar lyre in the tizita mode with a kebero drum
  am: (t) => {
    seq(t, 0.13, [64, 66, 67, 71, 72], (s, n, i) => pluck(s, n, { bright: 0.7, decay: 0.996, vol: 0.38, pan: -0.3 + i * 0.12 }));
    pluck(t + 0.72, 76, { bright: 0.7, bend: -1, bendAt: 0.2, bendTime: 0.2, vol: 0.42 });
    drum(t, { f0: 130, f1: 75, dur: 0.45, vol: 0.4 });
    drum(t + 0.39, { f0: 330, f1: 260, dur: 0.15, vol: 0.25, slap: 0.2 });
    drum(t + 0.65, { f0: 130, f1: 75, dur: 0.45, vol: 0.35 });
  },
  // Hausa — kakaki long-trumpet fanfare and a talking-drum (kalangu) pitch bend
  ha: (t) => {
    tone(t, 62, { type: 'sawtooth', filter: 1600, filterEnv: 0.06, dur: 0.3, a: 0.03, r: 0.1, vol: 0.12 });
    tone(t + 0.32, 69, { type: 'sawtooth', filter: 1900, filterEnv: 0.06, dur: 0.5, a: 0.03, r: 0.3, vib: 5, vol: 0.13 });
    [0.1, 0.3, 0.5, 0.75].forEach((d, i) => drum(t + d, { f0: [200, 260, 180, 300][i], f1: [120, 330, 110, 380][i], sweep: 0.15, dur: 0.3, vol: 0.38, pan: 0.35 }));
  },
  // Yoruba — dùndún talking drum "speaking" a rising-falling phrase with shekere shakes
  yo: (t) => {
    [[0, 160, 240], [0.18, 240, 160], [0.33, 200, 300], [0.5, 300, 180], [0.74, 180, 260]].forEach(([d, a, b]) => drum(t + d, { f0: a, f1: b, sweep: 0.14, dur: 0.28, vol: 0.4, slap: 0.06, pan: -0.2 }));
    for (let i = 0; i < 7; i++) noise(t + i * 0.12, { dur: 0.06, vol: 0.07, type: 'highpass', freq: 5500, q: 0.7, pan: 0.5 });
    mallet(t + 0.95, 79, { partials: [1, 5.2], dur: 0.6, vol: 0.18 });
  },
};

// Loudness balance per signature (measured RMS → about the same perceived level for every language).
const LEVEL = {'en': 1.6, 'zh-CN': 0.92, 'zh-TW': 2.18, 'ja': 1.14, 'ko': 0.96, 'hi': 0.55, 'bn': 0.55, 'ta': 0.6, 'te': 1.85, 'mr': 0.69, 'gu': 3.2, 'pa': 0.8, 'kn': 0.63, 'ml': 1.26, 'ur': 1.2, 'ar': 0.8, 'fa': 1.6, 'he': 1.5, 'tr': 1.14, 'es': 0.86, 'pt': 1.33, 'fr': 1.0, 'it': 1.5, 'de': 0.86, 'nl': 1.6, 'ru': 1.0, 'uk': 1.0, 'pl': 1.26, 'sv': 3.2, 'nb': 2.4, 'da': 1.85, 'fi': 1.5, 'el': 1.6, 'cs': 2.4, 'hu': 1.85, 'ro': 0.86, 'id': 1.09, 'ms': 2.18, 'th': 2.0, 'vi': 1.5, 'fil': 1.5, 'sw': 1.2, 'ne': 1.1, 'si': 1.2, 'km': 1.2, 'bg': 1.2, 'af': 1.6, 'zu': 1.0, 'am': 1.0, 'ha': 1.1, 'yo': 1.0};

/** Play a language's signature (no-op if sound is off, unsupported, or reduced motion is not relevant). */
export function playLanguageSound(code) {
  if (!isSoundEnabled()) return;
  const recipe = RECIPES[code] || RECIPES.en;
  try {
    if (!audio()) return;
    const t = ctx.currentTime + 0.03;
    master.gain.setValueAtTime(0.5 * (LEVEL[code] || 1), t);
    recipe(t);
  } catch {
    /* audio can fail silently (autoplay policy, old browsers) — the language still changes */
  }
}

/**
 * Reward machine: lever clunk → reels ticking → a thunk as each reel stops (≈1.6 s, 1.95 s, 2.3 s) →
 * cash-register "ka-ching" and a shower of coins as the reward lands (≈2.6 s). Synthesised, ~3 s.
 */
export function playSlotPull() {
  if (!isSoundEnabled()) return;
  try {
    if (!audio()) return;
    const t = ctx.currentTime + 0.02;
    master.gain.setValueAtTime(0.6, t);
    // lever: metallic ratchet + low clunk
    for (let i = 0; i < 5; i++) noise(t + i * 0.025, { dur: 0.02, vol: 0.18, freq: 3800, q: 6, verb: 0.2 });
    drum(t + 0.14, { f0: 140, f1: 60, dur: 0.18, vol: 0.5, slap: 0.15, slapFreq: 900 });
    // reels ticking, slowing down
    let x = t + 0.25;
    let gap = 0.045;
    while (x < t + 2.25) {
      noise(x, { dur: 0.012, vol: 0.09, freq: 5200, q: 8, verb: 0.1, pan: Math.random() * 0.6 - 0.3 });
      x += gap;
      gap *= 1.035;
    }
    // each reel stopping
    [1.6, 1.95, 2.3].forEach((d, i) => {
      drum(t + d, { f0: 220, f1: 110, dur: 0.12, vol: 0.38, slap: 0.2, slapFreq: 1500, pan: (i - 1) * 0.5 });
    });
    // ka-ching: register bell pair
    bell(t + 2.6, 88, { ratio: 3.5, index: 2.8, dur: 1.4, vol: 0.22 });
    bell(t + 2.68, 95, { ratio: 3.5, index: 2.4, dur: 1.6, vol: 0.2 });
    noise(t + 2.6, { dur: 0.09, vol: 0.25, freq: 2600, q: 2, verb: 0.3 }); // drawer
    // coin shower
    for (let i = 0; i < 16; i++) {
      const s = t + 2.72 + i * 0.045 + Math.random() * 0.03;
      const m = 96 + Math.floor(Math.random() * 8);
      mallet(s, m, { partials: [1, 2.76, 5.4], dur: 0.25, vol: 0.07 + Math.random() * 0.05, pan: Math.random() * 1.2 - 0.6 });
    }
  } catch {
    /* audio unavailable */
  }
}
