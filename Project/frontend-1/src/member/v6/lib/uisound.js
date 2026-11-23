/* Copied from the v6 deliverables (src/lib/uisound.js). */
/* CHANGE-10 · "Each click should have sound."
   Adds short interface sounds to the existing WebAudio engine (lib/sound.js — no audio files, nothing to
   download) and one delegated listener that gives every button, link, card and option a click sound.
   - respects the mute button (sound.on, remembered in ui:sound) and browser autoplay rules (only after a tap)
   - answer options keep their own per-profile voices (sound.click); the shared 45 ms throttle stops doubles
   - a failure in audio never affects the page (everything is wrapped in try/catch) */
import { sound } from './sound.js';

const UI = {
  tap(c, t) { sound.tone(1250, t, 0.05, 0.035, 'sine', 0.1); sound.tone(620, t, 0.07, 0.03, 'triangle', 0.1); },
  soft(c, t) { sound.tone(880, t, 0.06, 0.025, 'sine', 0.2); },
  open(c, t) { [523.25, 659.25, 880].forEach((f, i) => sound.tone(f, t + i * 0.045, 0.16, 0.05, 'sine', 0.4)); },
  close(c, t) { [659.25, 440].forEach((f, i) => sound.tone(f, t + i * 0.05, 0.14, 0.04, 'sine', 0.3)); },
  lock(c, t) { sound.tone(110, t, 0.28, 0.12, 'triangle', 0.2); sound.drum('wood', t + 0.02, 0.35); [2400, 3100, 2700].forEach((f, i) => sound.tone(f, t + 0.08 + i * 0.05, 0.05, 0.02, 'square', 0.1)); },
  unlock(c, t) { sound.drum('wood', t, 0.3); [784, 988, 1175, 1568].forEach((f, i) => sound.fm(f, t + 0.06 + i * 0.07, 0.5, 0.05, { ratio: 3.5, index: 1.6 })); },
  coin(c, t) { sound.fm(1568, t, 0.35, 0.06, { ratio: 3.5, index: 2 }); sound.fm(2093, t + 0.07, 0.5, 0.06, { ratio: 3.5, index: 2 }); },
  gem(c, t) { [1760, 2217, 2637, 3520].forEach((f, i) => sound.fm(f, t + i * 0.05, 0.4, 0.03, { ratio: 2.76, index: 1.2 })); },
  whoosh(c, t) { try { const n = c.createBufferSource(); n.buffer = sound.noise(); const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2; bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(3000, t + 0.35); const g = c.createGain(); sound.env(g, t, 0.06, 0.12, 0.4, 'lin'); n.connect(bp).connect(g); sound.send(g, 0.3); n.start(t); n.stop(t + 0.45); } catch (e) { /* ignore */ } },
  toggle(c, t) { sound.tone(700, t, 0.05, 0.04, 'square', 0.05); sound.tone(1050, t + 0.04, 0.05, 0.03, 'square', 0.05); },
  fanfare(c, t) { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => { sound.brass(f, t + i * 0.12, 0.3, 0.06); }); sound.drum('kick', t, 0.4); sound.drum('kick', t + 0.36, 0.4); },
};

/** sound.ui('tap' | 'open' | 'lock' | 'unlock' | 'coin' | 'gem' | 'whoosh' | 'toggle' | 'fanfare' | 'soft' | 'close') */
sound.ui = function ui(kind = 'tap') {
  try {
    const c = this.prime(); if (!c || !this.on) return;
    if (kind === 'tap' || kind === 'soft') { const now = performance.now(); if (now - (this._last || 0) < 45) return; this._last = now; }
    (UI[kind] || UI.tap)(c, c.currentTime + 0.01);
  } catch (e) { /* audio must never break the page */ }
};

const CLICKABLE = 'button, a[href], [role="button"], [role="tab"], summary, .icard, .plot';
/** One delegated listener on the app root. Elements with data-snd="<kind>" choose their sound; data-snd="none" is silent.
    Answer options (radio / checkbox labels) are voiced by the question engine itself. */
export function installClickSounds(root) {
  if (!root) return () => {};
  const h = (e) => {
    const el = e.target.closest && e.target.closest('[data-snd], ' + CLICKABLE);
    if (!el || !root.contains(el) || el.disabled || el.getAttribute('aria-disabled') === 'true') return;
    if (el.closest('.tile, .row, .sc, .lv, .chip')) return;   // engine voices answers
    const k = el.getAttribute('data-snd') || 'tap';
    if (k !== 'none') sound.ui(k);
  };
  root.addEventListener('pointerdown', h, { passive: true });
  return () => root.removeEventListener('pointerdown', h);
}
export { sound };
