// Turn2Opinion sound design — synthesised with the Web Audio API, so there are no audio files to
// download and nothing blocks the first paint.
//
// IMPORTANT — how "a sound when someone opens the website" actually works:
// Every browser blocks audio until the visitor has interacted with the page (Chrome, Safari,
// Firefox and every mobile browser enforce this; it cannot be worked around, and trying to is what
// gets a site muted permanently by the browser). So the arrival chime is *armed* on load and fires
// on the visitor's very first gesture — the first tap, click, key press or scroll. In practice that
// is within a second or two of arriving and it feels like an opening sound. If they never interact,
// no sound plays, which is exactly the behaviour the browser intends.
//
// Everything is rate-limited and respects a persisted mute switch, plus prefers-reduced-motion
// (people who ask for less motion generally want less noise too).
import { soundEnabled, setSoundPref } from './soundPref.js';

export { soundEnabled };
const ARRIVAL_KEY = 't2o_arrival_played';
let ctx = null;
let master = null;
let armed = false;
let lastAt = 0;

export const setSoundEnabled = (on) => {
  setSoundPref(on);
  if (on) ensure();
};

function ensure() {
  if (typeof window === 'undefined') return null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      // A gentle shelf keeps the chimes from sounding harsh on phone speakers.
      const shelf = ctx.createBiquadFilter();
      shelf.type = 'highshelf';
      shelf.frequency.value = 5200;
      shelf.gain.value = -5;
      master.connect(shelf).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

const quiet = () =>
  !soundEnabled() ||
  (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/** One voice: a sine/triangle partial with its own envelope. */
function voice(t, freq, { dur = 0.5, vol = 0.18, type = 'sine', detune = 0, attack = 0.008 } = {}) {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.detune.setValueAtTime(detune, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** A struck-bell partial stack — the signature timbre of the brand sound. */
function bell(t, freq, { vol = 0.14, dur = 1.6 } = {}) {
  voice(t, freq, { dur, vol, type: 'sine' });
  voice(t, freq * 2.01, { dur: dur * 0.6, vol: vol * 0.4, type: 'sine' });
  voice(t, freq * 3.02, { dur: dur * 0.35, vol: vol * 0.18, type: 'sine' });
}

/** Shared rate limit so a burst of events never turns into noise. */
function gate(minGapMs) {
  const now = Date.now();
  if (now - lastAt < minGapMs) return false;
  lastAt = now;
  return true;
}

/* ============================== The sounds ============================== */

/**
 * ARRIVAL — the site's signature. A rising five-note figure on a D major pentatonic
 * (D4 A4 D5 E5 A5) over a soft pad swell, ending on a shimmer. Roughly 1.6 s.
 * Plays once per browser session.
 */
export function playArrival() {
  if (quiet() || !ensure()) return;
  const t = ctx.currentTime + 0.04;
  const notes = [293.66, 440.0, 587.33, 659.25, 880.0];
  notes.forEach((f, i) => bell(t + i * 0.085, f, { vol: 0.15 - i * 0.012, dur: 1.8 - i * 0.15 }));
  // pad swell underneath
  voice(t, 146.83, { dur: 1.9, vol: 0.07, type: 'triangle' });
  voice(t, 220.0, { dur: 1.9, vol: 0.05, type: 'triangle', detune: 6 });
  // closing shimmer
  bell(t + 0.62, 1174.66, { vol: 0.06, dur: 1.1 });
  lastAt = Date.now();
}

/** NOTIFICATION — a two-note "ping-up" for review toasts and activity tickets. */
export function playNotify({ up = true } = {}) {
  if (quiet() || !ensure() || !gate(900)) return;
  const t = ctx.currentTime + 0.01;
  const a = up ? 659.25 : 587.33;
  const b = up ? 987.77 : 440.0;
  bell(t, a, { vol: 0.11, dur: 0.6 });
  bell(t + 0.09, b, { vol: 0.09, dur: 0.75 });
}

/** TICK — a tiny click as the rating dial crosses a level. Very short, very quiet. */
export function playTick(level = 3) {
  if (quiet() || !ensure() || !gate(70)) return;
  const t = ctx.currentTime + 0.005;
  voice(t, 420 + level * 110, { dur: 0.09, vol: 0.055, type: 'triangle', attack: 0.004 });
}

/** SUCCESS — a warm three-note resolve after a review is posted. */
export function playSuccess() {
  if (quiet() || !ensure()) return;
  const t = ctx.currentTime + 0.02;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(t + i * 0.1, f, { vol: 0.13 - i * 0.015, dur: 1.5 }));
  voice(t, 261.63, { dur: 1.4, vol: 0.06, type: 'triangle' });
  lastAt = Date.now();
}

/** Legacy name kept so existing call sites (live chat) keep working. */
export function pop({ pitch = 1, volume = 0.22 } = {}) {
  if (quiet() || !ensure() || !gate(120)) return;
  const t = ctx.currentTime;
  voice(t, 520 * pitch, { dur: 0.16, vol: Math.min(0.2, volume), type: 'sine' });
  voice(t + 0.03, 880 * pitch, { dur: 0.2, vol: Math.min(0.14, volume * 0.6), type: 'sine' });
}

/* ============================== Survey machine ============================== */
// Arcade/vending sounds for the "Paid survey machine" on the home page. Click-only: the machine's
// own auto-demo never makes a sound.

let noiseBuf = null;
/** A filtered noise burst: clicks, thunks and the motor's rattle. */
function noise(t, dur, { vol = 0.12, freq = 1800, q = 1, type = 'bandpass' } = {}) {
  const c = ctx;
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, Math.floor(c.sampleRate * 1.2), c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t);
  src.stop(t + dur + 0.02);
}

/** A pitch sweep (glide) on one oscillator. */
function sweep(t, from, to, { dur = 0.3, vol = 0.1, type = 'sine' } = {}) {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/**
 * VEND — pressing a slot: keypad beep, the coil motor whirring, the card thunking into the
 * tray and a bright "cha-ching" of coins. About 1.3 s. `step` (0–17) nudges the keypad pitch so
 * every slot sounds a little different.
 */
export function playVend(step = 0) {
  if (quiet() || !ensure() || !gate(160)) return;
  const t = ctx.currentTime + 0.01;
  // keypad beep (two quick square blips, like an LCD keypad)
  const k = 880 * Math.pow(2, (step % 8) / 12);
  voice(t, k, { dur: 0.07, vol: 0.05, type: 'square', attack: 0.002 });
  voice(t + 0.08, k * 1.5, { dur: 0.08, vol: 0.045, type: 'square', attack: 0.002 });
  // coil motor: a buzzy low tone with a rattle on top
  sweep(t + 0.18, 70, 110, { dur: 0.5, vol: 0.06, type: 'sawtooth' });
  for (let i = 0; i < 7; i++) noise(t + 0.2 + i * 0.065, 0.05, { vol: 0.05, freq: 900 + i * 60, q: 4 });
  // the card drops into the tray
  sweep(t + 0.72, 180, 55, { dur: 0.22, vol: 0.18, type: 'sine' });
  noise(t + 0.72, 0.12, { vol: 0.12, freq: 380, q: 0.8, type: 'lowpass' });
  // cha-ching: coins and a bell
  [1567.98, 2093.0, 2637.02].forEach((f, i) => bell(t + 0.9 + i * 0.06, f, { vol: 0.06, dur: 0.5 }));
  noise(t + 0.9, 0.25, { vol: 0.035, freq: 7000, q: 1.5, type: 'highpass' });
  bell(t + 1.02, 1318.51, { vol: 0.07, dur: 0.9 });
}

/** SWITCH — the Consumers / Professionals lever: a mechanical clunk and a rising (or falling) blip. */
export function playSwitch(up = true) {
  if (quiet() || !ensure() || !gate(140)) return;
  const t = ctx.currentTime + 0.01;
  noise(t, 0.05, { vol: 0.1, freq: 2400, q: 2 });
  sweep(t, 140, 70, { dur: 0.12, vol: 0.12, type: 'sine' });
  sweep(t + 0.06, up ? 520 : 780, up ? 780 : 520, { dur: 0.16, vol: 0.06, type: 'triangle' });
  voice(t + 0.2, up ? 1046.5 : 783.99, { dur: 0.22, vol: 0.05, type: 'sine' });
}

/** COIN — dropping a coin in the slot (the "Start earning" button and the coin slot). */
export function playCoin() {
  if (quiet() || !ensure() || !gate(160)) return;
  const t = ctx.currentTime + 0.01;
  // a coin rolling down the chute: three quick metallic ticks
  [0, 0.07, 0.12].forEach((d, i) => noise(t + d, 0.04, { vol: 0.06 - i * 0.012, freq: 5200, q: 6 }));
  bell(t + 0.16, 1975.53, { vol: 0.08, dur: 0.5 });
  bell(t + 0.24, 2637.02, { vol: 0.07, dur: 0.8 });
}

/* ============================== Light / dark ============================== */
/**
 * MODE — the light/dark switch. To dark: a soft "whoosh" falling into a twinkling night chord
 * (A minor add 9, high bells). To light: a bright rising sparkle that resolves into a major chord.
 */
export function playMode(to = 'dark') {
  if (quiet() || !ensure() || !gate(300)) return;
  const t = ctx.currentTime + 0.01;
  if (to === 'dark') {
    // whoosh: filtered noise sweeping down
    const c = ctx;
    if (!noiseBuf) noise(t, 0.01, { vol: 0.0001 });
    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = 1.2;
    f.frequency.setValueAtTime(3200, t);
    f.frequency.exponentialRampToValueAtTime(260, t + 0.6);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    src.connect(f).connect(g).connect(master);
    src.start(t);
    src.stop(t + 0.75);
    sweep(t, 520, 130, { dur: 0.55, vol: 0.05, type: 'sine' });
    // night chord, then twinkles
    [220.0, 261.63, 329.63, 493.88].forEach((fr, i) => bell(t + 0.42 + i * 0.05, fr, { vol: 0.07, dur: 1.8 }));
    [1760, 2349.32, 1975.53, 2637.02].forEach((fr, i) => bell(t + 0.6 + i * 0.13, fr, { vol: 0.035, dur: 0.6 }));
  } else {
    // sunrise: rising arpeggio + shimmer
    sweep(t, 300, 900, { dur: 0.35, vol: 0.05, type: 'triangle' });
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((fr, i) => bell(t + 0.08 + i * 0.07, fr, { vol: 0.08, dur: 1.2 }));
    noise(t + 0.4, 0.4, { vol: 0.03, freq: 8000, q: 1, type: 'highpass' });
  }
}

/* ============================== Arming ============================== */

/**
 * Call once on load. Unlocks audio on the visitor's first gesture and plays the arrival chime
 * (once per session). Returns a cleanup function.
 */
export function armArrivalSound() {
  if (typeof window === 'undefined' || armed) return () => {};
  armed = true;
  let done = false;
  const already = (() => {
    try {
      return sessionStorage.getItem(ARRIVAL_KEY) === '1';
    } catch {
      return false;
    }
  })();

  const fire = () => {
    if (done) return;
    done = true;
    off();
    if (already || quiet()) {
      ensure(); // still unlock the context for later notification sounds
      return;
    }
    try {
      sessionStorage.setItem(ARRIVAL_KEY, '1');
    } catch {
      /* private mode: the chime may replay next navigation, which is harmless */
    }
    // A beat after the gesture so it reads as the site greeting them, not as a click sound.
    setTimeout(playArrival, 220);
  };

  const events = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];
  const off = () => events.forEach((e) => window.removeEventListener(e, fire));
  events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
  return off;
}
