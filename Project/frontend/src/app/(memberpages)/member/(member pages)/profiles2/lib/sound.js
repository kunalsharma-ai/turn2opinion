/* All sound is synthesised with WebAudio — no audio files to download.
   - chime(): profile-complete celebration      - tick(): section complete / sound-on confirmation
   - lang(code): a short signature motif for each language, played when someone picks it.
     ~30 languages have a hand-designed motif (instrument + scale + rhythm inspired by the music
     associated with that language); every other language gets a unique motif generated from its
     code, using its region's instrument family and scale.
   Sound plays only when the viewer has it on, and only from a user gesture (autoplay rules). */
import { LS } from './storage.js';
import { BY } from '../i18n/languages.js';

const SR_TONIC = 0;
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], mixo: [0, 2, 4, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11], phryg: [0, 1, 3, 5, 7, 8, 10], harm: [0, 2, 3, 5, 7, 8, 11], hijaz: [0, 1, 4, 5, 7, 8, 10],
  penta: [0, 2, 4, 7, 9], pminor: [0, 3, 5, 7, 10], insen: [0, 1, 5, 7, 10], hira: [0, 2, 3, 7, 8], yaman: [0, 2, 4, 6, 7, 9, 11],
  bhairav: [0, 1, 4, 5, 7, 8, 11], kafi: [0, 2, 3, 5, 7, 9, 10], pelog: [0, 1, 3, 7, 8], slendro: [0, 2, 5, 7, 9],
  shur: [0, 1.5, 3, 5, 7, 8, 10], ussak: [0, 1.5, 3, 5, 7, 8, 10], tizita: [0, 2, 4, 7, 9], anchi: [0, 1, 5, 6, 8], blues: [0, 3, 5, 6, 7, 10],
};
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

export const sound = {
  on: LS.get('ui:sound') !== 'off',
  ctx: null, out: null, verb: null, nb: null,
  setOn(v) { this.on = v; LS.set('ui:sound', v ? 'on' : 'off'); },
  /* Create/resume the audio context. Call from inside a click/keypress. */
  prime() {
    if (!this.on) return null;
    try {
      if (!this.ctx) {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
        const c = this.ctx = new C();
        const comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
        this.out = c.createGain(); this.out.gain.value = 0.8;
        this.out.connect(comp).connect(c.destination);
        /* small generated room reverb */
        const len = c.sampleRate * 1.4, ir = c.createBuffer(2, len, c.sampleRate);
        for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
        const cv = c.createConvolver(); cv.buffer = ir;
        this.verb = c.createGain(); this.verb.gain.value = 0.22;
        this.verb.connect(cv).connect(comp);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    } catch (e) { return null; }
  },
  send(node, wet = 1) { node.connect(this.out); if (wet) { const g = this.ctx.createGain(); g.gain.value = wet; node.connect(g).connect(this.verb); } },
  noise() {
    if (!this.nb) { const c = this.ctx, b = c.createBuffer(1, c.sampleRate, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; this.nb = b; }
    return this.nb;
  },
  env(g, t, a, peak, dur, curve = 'exp') {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    if (curve === 'exp') g.gain.exponentialRampToValueAtTime(0.0001, t + dur); else g.gain.linearRampToValueAtTime(0.0001, t + dur);
  },
  tone(f, st, dur, vol, type, wet = 0.6) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, st);
    this.env(g, st, 0.012, vol, dur); o.connect(g); this.send(g, wet);
    o.start(st); o.stop(st + dur + 0.05);
  },

  /* ---------- instruments ---------- */
  /* Karplus–Strong plucked string. bright 0..1, bend in semitones (koto / dan bau / sitar meend). */
  pluck(f, t, dur, vol, { bright = 0.5, bend = 0, bendAt = 0.12, decay = 0.996, buzz = 0 } = {}) {
    const c = this.ctx, sr = c.sampleRate, N = Math.max(2, Math.round(sr / f)), len = Math.floor(sr * dur), buf = c.createBuffer(1, len, sr), d = buf.getChannelData(0);
    const ring = new Float32Array(N); for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    let p = 0, last = 0; const a = 0.5 + bright * 0.45;
    for (let i = 0; i < len; i++) {
      const v = ring[p], nx = ring[(p + 1) % N];
      const y = (a * v + (1 - a) * nx) * decay; ring[p] = y; p = (p + 1) % N;
      d[i] = buzz ? Math.tanh((v + buzz * (v - last) * 6) * 1.6) * 0.7 : v; last = v;
    }
    const s = c.createBufferSource(); s.buffer = buf;
    if (bend) { s.playbackRate.setValueAtTime(1, t + bendAt); s.playbackRate.linearRampToValueAtTime(Math.pow(2, bend / 12), t + bendAt + 0.18); }
    const g = c.createGain(); this.env(g, t, 0.004, vol, dur);
    s.connect(g); this.send(g, 0.5); s.start(t); s.stop(t + dur);
  },
  /* FM bell / metallophone. ratio 3.5 = church bell, 1.4 = gamelan, 2 = marimba-ish (short) */
  fm(f, t, dur, vol, { ratio = 3.5, index = 4, wet = 0.6 } = {}) {
    const c = this.ctx, car = c.createOscillator(), mod = c.createOscillator(), mg = c.createGain(), g = c.createGain();
    car.frequency.value = f; mod.frequency.value = f * ratio;
    mg.gain.setValueAtTime(f * index, t); mg.gain.exponentialRampToValueAtTime(f * 0.2, t + dur);
    mod.connect(mg).connect(car.frequency); car.connect(g); this.env(g, t, 0.003, vol, dur); this.send(g, wet);
    car.start(t); mod.start(t); car.stop(t + dur + 0.05); mod.stop(t + dur + 0.05);
  },
  /* Breathy flute / bansuri / shakuhachi */
  flute(f, t, dur, vol, { vib = 5.5, depth = 0.008, breath = 0.25 } = {}) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), l = c.createOscillator(), lg = c.createGain();
    o.type = 'sine'; o.frequency.value = f; l.frequency.value = vib; lg.gain.value = f * depth;
    l.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.07); g.gain.setValueAtTime(vol * 0.85, t + dur * 0.7); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(g); this.send(g, 0.7);
    const n = c.createBufferSource(); n.buffer = this.noise(); const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 2; bp.Q.value = 3;
    const ng = c.createGain(); this.env(ng, t, 0.04, vol * breath, Math.min(dur, 0.35), 'lin'); n.connect(bp).connect(ng); this.send(ng, 0.4);
    o.start(t); l.start(t); n.start(t); o.stop(t + dur + 0.05); l.stop(t + dur + 0.05); n.stop(t + 0.4);
  },
  /* Reed: accordion / harmonium / shehnai / duduk (two detuned saws through a lowpass) */
  reed(f, t, dur, vol, { cut = 2400, detune = 7, vib = 5, nasal = 0 } = {}) {
    const c = this.ctx, g = c.createGain(), lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cut; lp.Q.value = 1 + nasal * 6;
    const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = vib; lg.gain.value = f * 0.006; l.start(t); l.stop(t + dur + 0.05);
    [-detune, detune].forEach((dt) => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = dt; l.connect(lg).connect(o.frequency); o.connect(lp); o.start(t); o.stop(t + dur + 0.05); });
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.05); g.gain.setValueAtTime(vol * 0.9, t + dur * 0.75); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    lp.connect(g); this.send(g, 0.5);
  },
  /* Bowed string: erhu / violin / sarangi with optional slide into the note */
  bow(f, t, dur, vol, { slide = 0, cut = 3000 } = {}) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), bp = c.createBiquadFilter(), l = c.createOscillator(), lg = c.createGain();
    o.type = 'sawtooth';
    if (slide) { o.frequency.setValueAtTime(f * Math.pow(2, slide / 12), t); o.frequency.exponentialRampToValueAtTime(f, t + 0.12); } else o.frequency.value = f;
    l.frequency.value = 6; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.012, t + dur * 0.5); l.connect(lg).connect(o.frequency);
    bp.type = 'lowpass'; bp.frequency.value = cut;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.09); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(bp).connect(g); this.send(g, 0.6); o.start(t); l.start(t); o.stop(t + dur + 0.05); l.stop(t + dur + 0.05);
  },
  /* Brass fanfare: saw with an opening filter */
  brass(f, t, dur, vol) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.value = f; lp.type = 'lowpass'; lp.Q.value = 2;
    lp.frequency.setValueAtTime(f * 1.2, t); lp.frequency.linearRampToValueAtTime(f * 6, t + 0.08); lp.frequency.linearRampToValueAtTime(f * 3, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.04); g.gain.setValueAtTime(vol * 0.8, t + dur * 0.8); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(lp).connect(g); this.send(g, 0.4); o.start(t); o.stop(t + dur + 0.05);
  },
  /* Gong / temple bowl: inharmonic partials with a long tail */
  gong(f, t, dur, vol) {
    [1, 1.47, 2.09, 2.56, 3.39, 4.12].forEach((r, i) => {
      const c = this.ctx, o = c.createOscillator(), g = c.createGain();
      o.frequency.setValueAtTime(f * r * 1.004, t); o.frequency.exponentialRampToValueAtTime(f * r, t + 0.4);
      this.env(g, t, 0.006, vol / (1 + i * 0.8), dur * (1 - i * 0.1)); o.connect(g); this.send(g, 0.8); o.start(t); o.stop(t + dur);
    });
  },
  /* Percussion: kind = kick | tabla | darbuka | clap | shaker | wood | taiko | frame */
  drum(kind, t, vol = 0.5) {
    const c = this.ctx;
    const thump = (f0, f1, d, v) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + d); this.env(g, t, 0.002, v, d); o.connect(g); this.send(g, 0.25); o.start(t); o.stop(t + d + 0.02); };
    const hiss = (fc, q, d, v, type = 'bandpass') => { const n = c.createBufferSource(); n.buffer = this.noise(); const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = fc; fl.Q.value = q; const g = c.createGain(); this.env(g, t, 0.002, v, d); n.connect(fl).connect(g); this.send(g, 0.3); n.start(t); n.stop(t + d + 0.02); };
    if (kind === 'kick') thump(150, 50, 0.3, vol);
    else if (kind === 'taiko') { thump(110, 45, 0.6, vol); hiss(300, 1, 0.12, vol * 0.4, 'lowpass'); }
    else if (kind === 'tabla') { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(260, t + 0.18); this.env(g, t, 0.002, vol, 0.35); o.connect(g); this.send(g, 0.3); o.start(t); o.stop(t + 0.4); }
    else if (kind === 'darbuka') { thump(220, 120, 0.12, vol * 0.8); hiss(3500, 2, 0.05, vol * 0.5); }
    else if (kind === 'clap') { [0, 0.012, 0.024].forEach((d) => { const n = c.createBufferSource(); n.buffer = this.noise(); const fl = c.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = 1400; fl.Q.value = 1.5; const g = c.createGain(); this.env(g, t + d, 0.001, vol * 0.6, 0.09); n.connect(fl).connect(g); this.send(g, 0.4); n.start(t + d); n.stop(t + d + 0.12); }); }
    else if (kind === 'shaker') hiss(6500, 1, 0.08, vol * 0.4, 'highpass');
    else if (kind === 'wood') thump(900, 700, 0.07, vol * 0.7);
    else if (kind === 'frame') { thump(130, 70, 0.25, vol * 0.7); hiss(2500, 0.7, 0.06, vol * 0.3); }
  },

  /* ---------- celebration sounds ---------- */
  chime(world) {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.05;
    if (world) {   /* a closing flourish in the profile's own voice, so every profile finishes with its own sound */
      const v = CLICK[world] || CLICK[CLICK_BASE[world]] || CLICK.brand, sc = SCALES[v.scale] || SCALES.penta;
      [0, 2, 4, 7, 9].forEach((d, i) => { const m = v.root + 12 * Math.floor(d / sc.length) + sc[d % sc.length]; this.voice(v.inst === 'wood' ? 'bell' : v.inst, mtof(m), t + 0.75 + i * 0.09, 0.4, 0.07); });
      if (v.perc) { this.drum(v.perc, t + 0.75, 0.3); this.drum(v.perc, t + 1.11, 0.3); }
    }
    [261.63, 329.63, 392].forEach((hz) => this.tone(hz, t, 1.9, 0.06, 'triangle'));
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((hz, i) => { const st = t + 0.06 + i * 0.075; this.tone(hz, st, 1.3 - i * 0.12, 0.17, 'sine'); this.tone(hz * 2, st, 0.45, 0.035, 'triangle'); });
    [2093, 2637, 3136, 2637].forEach((hz, i) => this.fm(hz, t + 0.5 + i * 0.06, 0.8, 0.03, { ratio: 3.5, index: 1.5 }));
    this.drum('kick', t, 0.3);
  },
  tick() {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.02;
    this.tone(880, t, 0.18, 0.07, 'sine'); this.tone(1318.5, t + 0.06, 0.25, 0.05, 'sine');
  },

  /* ---------- Opinion City reward sounds ----------
     Voiced with the current language's own instrument and scale (the same family as its language motif:
     koto in Japanese, sitar in Hindi, oud in Arabic, flamenco guitar in Spanish…), so every language's city
     sounds different. build(): a tower rises · windows(): lights come on floor by floor ·
     firework(): rocket and burst · land(): +100 lands in the header · levelUp(): the city reaches a new level. */
  _specs: {},
  _spec(code) { return this._specs[code] || (this._specs[code] = MOTIFS[code] || generated(code)); },
  _deg(spec, d, o = 0) { const sc = SCALES[spec.scale] || SCALES.major, n = sc.length, k = Math.floor(d / n), i = ((d % n) + n) % n; return mtof(spec.root + sc[i] + 12 * (k + o)); },
  _lv(spec, f, t, d, vol) {
    switch (spec.inst) {
      case 'pluck': case 'tremolo': case 'strum': return this.pluck(f, t, Math.max(0.4, d), vol * 1.2, spec.opt);
      case 'bell': return this.fm(f, t, Math.max(0.5, d), vol * 0.8, Object.assign({ ratio: 3.5, index: 2.4 }, spec.opt));
      case 'flute': return this.flute(f, t, Math.max(0.2, d * 0.8), vol, spec.opt);
      case 'reed': return this.reed(f, t, Math.max(0.2, d * 0.8), vol * 0.6, spec.opt);
      case 'bow': return this.bow(f, t, Math.max(0.25, d), vol * 0.55, spec.opt);
      case 'brass': return this.brass(f, t, Math.max(0.2, d * 0.7), vol * 0.5);
      default: return this.tone(f, t, d, vol, 'triangle');
    }
  },
  build(code = 'en') {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.02, sp = this._spec(code);
    /* construction rumble rising with the tower */
    const n = c.createBufferSource(); n.buffer = this.noise(); n.loop = true;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(160, t); lp.frequency.exponentialRampToValueAtTime(900, t + 0.75);
    const g = c.createGain(); this.env(g, t, 0.08, 0.16, 0.85); n.connect(lp).connect(g); this.send(g, 0.2); n.start(t); n.stop(t + 0.9);
    this.drum('kick', t, 0.35);
    [0, 1, 2, 3, 4, 5, 7].forEach((d, i) => this._lv(sp, this._deg(sp, d), t + 0.1 + i * 0.085, 0.22, 0.07 + i * 0.008));
    if (sp.perc && sp.perc[0]) this.drum(sp.perc[0][1], t + 0.72, 0.45);
  },
  windows(code = 'en', floors = 6) {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.02, sp = this._spec(code);
    for (let i = 0; i < floors; i++) this.fm(this._deg(sp, 7 + i, 1), t + i * 0.07, 0.35, 0.025, { ratio: 2.76, index: 1.1, wet: 0.6 });
  },
  firework() {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.02;
    const w = c.createBufferSource(); w.buffer = this.noise();
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 6; bp.frequency.setValueAtTime(500, t); bp.frequency.exponentialRampToValueAtTime(4200, t + 0.5);
    const g = c.createGain(); this.env(g, t, 0.05, 0.12, 0.55, 'lin'); w.connect(bp).connect(g); this.send(g, 0.3); w.start(t); w.stop(t + 0.6);
    const b = t + 0.55; this.drum('kick', b, 0.55); this.drum('clap', b, 0.4);
    for (let i = 0; i < 14; i++) { const n = c.createBufferSource(); n.buffer = this.noise(); const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000 + Math.random() * 4000; const gg = c.createGain(); const st = b + 0.08 + Math.random() * 0.7; this.env(gg, st, 0.002, 0.05 + Math.random() * 0.05, 0.05); n.connect(hp).connect(gg); this.send(gg, 0.5); n.start(st, Math.random()); n.stop(st + 0.08); }
  },
  land(code = 'en') {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.01, sp = this._spec(code);
    this._lv(sp, this._deg(sp, 4, 1), t, 0.3, 0.09); this._lv(sp, this._deg(sp, 7, 1), t + 0.08, 0.5, 0.1);
    this.fm(this._deg(sp, 9, 1), t + 0.08, 0.6, 0.03, { ratio: 3.5, index: 1.4 });
  },
  levelUp(code = 'en') {
    const c = this.prime(); if (!c || !this.on) return;
    const t = c.currentTime + 0.03, sp = this._spec(code);
    [0, 2, 4, 7].forEach((d, i) => this._lv(sp, this._deg(sp, d), t + i * 0.11, 0.45, 0.1));
    [0, 2, 4].forEach((d) => this._lv(sp, this._deg(sp, d + 7), t + 0.5, 1.2, 0.07));
    if (sp.gong) this.gong(this._deg(sp, 0, -1), t + 0.5, 2, 0.1);
    this.drum('kick', t + 0.5, 0.5);
    (sp.perc || []).slice(0, 3).forEach(([b, k, v]) => this.drum(k, t + 0.5 + b * 0.12, v));
  },

  /* ---------- question clicks ----------
     click(world, kind): a short, quiet sound on every answer interaction, voiced per profile world.
     kind: 'pick' (choose an option) | 'toggle' (multi-select / checkbox on-off) | 'next' (continue) | 'back' | 'warn'. */
  _last: 0,
  click(world = 'brand', kind = 'pick', on = true) {
    const c = this.prime(); if (!c || !this.on) return;
    const now = performance.now(); if (now - this._last < 45) return; this._last = now;
    const v = CLICK[world] || CLICK[CLICK_BASE[world]] || CLICK.brand, t = c.currentTime + 0.01;
    const sc = SCALES[v.scale] || SCALES.penta, f = (d) => mtof(v.root + 12 * Math.floor(d / sc.length) + sc[((d % sc.length) + sc.length) % sc.length]);
    this._step = ((this._step || 0) + 1) % 4;
    if (kind === 'warn') { this.tone(f(0) / 2, t, 0.22, 0.06, 'triangle', 0.2); this.tone(f(0) / 2 * 1.06, t + 0.09, 0.22, 0.05, 'triangle', 0.2); return; }
    if (kind === 'back') { this.voice(v.inst, f(2), t, 0.16, 0.06); this.voice(v.inst, f(0), t + 0.06, 0.2, 0.05); return; }
    if (kind === 'next') { this.voice(v.inst, f(2), t, 0.18, 0.06); this.voice(v.inst, f(4), t + 0.07, 0.3, 0.07); if (v.perc) this.drum(v.perc, t, 0.18); return; }
    if (kind === 'toggle' && !on) { this.voice(v.inst, f(1), t, 0.12, 0.045); return; }
    this.voice(v.inst, f(kind === 'toggle' ? 3 + this._step : 2 + this._step), t, 0.24, 0.065);
  },
  voice(inst, hz, t, dur, vol) {
    switch (inst) {
      case 'pluck': return this.pluck(hz, t, dur * 2, vol * 1.3, { bright: 0.6 });
      case 'bell': return this.fm(hz, t, dur * 3, vol * 0.7, { ratio: 3.5, index: 2.2, wet: 0.5 });
      case 'glass': return this.fm(hz * 2, t, dur * 2.6, vol * 0.5, { ratio: 2.76, index: 1.2, wet: 0.7 });
      case 'blip': this.tone(hz, t, dur * 0.6, vol * 0.8, 'square', 0.15); return this.tone(hz * 2, t + 0.03, dur * 0.4, vol * 0.4, 'square', 0.15);
      case 'wood': return this.drum('wood', t, vol * 4);
      case 'soft': return this.tone(hz, t, dur * 1.4, vol, 'sine', 0.6);
      case 'reed': return this.reed(hz, t, dur * 1.2, vol * 0.8, { cut: 1800 });
      case 'brass': return this.brass(hz, t, dur * 1.2, vol * 0.8);
      default: return this.tone(hz, t, dur, vol, 'triangle', 0.4);
    }
  },

  /* ---------- language motifs ---------- */
  lang(code) {
    const c = this.prime(); if (!c || !this.on) return;
    const spec = MOTIFS[code] || generated(code);
    const t0 = c.currentTime + 0.04, beat = 60 / (spec.bpm || 160), sc = SCALES[spec.scale] || SCALES.major, root = spec.root;
    const freq = (deg, oct = 0) => { const n = sc.length, o = Math.floor(deg / n), i = ((deg % n) + n) % n; return mtof(root + SR_TONIC + sc[i] + 12 * (o + oct)); };
    if (spec.drone) spec.drone.forEach((d) => this.reed(freq(d, -1), t0, spec.len || 1.6, 0.05, { cut: 900, vib: 0.3 }));
    if (spec.gong) this.gong(freq(0, -1), t0, 2.2, 0.12);
    spec.notes.forEach(([b, deg, l = 1, v = 1, o = 0]) => {
      const t = t0 + b * beat, f = freq(deg, o), d = l * beat * (spec.sustain || 1.6), vol = 0.22 * v;
      switch (spec.inst) {
        case 'pluck': this.pluck(f, t, Math.max(0.5, d), vol, spec.opt); break;
        case 'tremolo': for (let k = 0; k < Math.max(2, Math.round(l * 3)); k++) this.pluck(f, t + k * beat / 3, 0.35, vol * (k ? 0.7 : 1), spec.opt); break;
        case 'strum': [0, 2, 4].forEach((x, k) => this.pluck(freq(deg + x, o - 1), t + k * 0.016, 0.9, vol * 0.75, spec.opt)); break;
        case 'bell': this.fm(f, t, Math.max(0.6, d), vol * 0.8, Object.assign({ ratio: 3.5, index: 3 }, spec.opt)); break;
        case 'flute': this.flute(f, t, Math.max(0.25, d * 0.8), vol * 0.9, spec.opt); break;
        case 'reed': this.reed(f, t, Math.max(0.25, d * 0.8), vol * 0.55, spec.opt); break;
        case 'bow': this.bow(f, t, Math.max(0.3, d * 0.9), vol * 0.5, spec.opt); break;
        case 'brass': this.brass(f, t, Math.max(0.2, d * 0.7), vol * 0.45); break;
        default: this.tone(f, t, Math.max(0.3, d), vol, 'triangle');
      }
    });
    (spec.perc || []).forEach(([b, k, v = 0.5]) => this.drum(k, t0 + b * beat, v));
  },
};

/* Hand-designed motifs: [beat, scale degree, length in beats, velocity, octave shift] */
const MOTIFS = {
  en: { inst: 'bell', scale: 'major', root: 72, bpm: 132, notes: [[0, 2, 1], [1, 1, 1], [2, 0, 1], [3, -3, 2]], opt: { ratio: 3.5, index: 3 } }, // Westminster-style quarters
  'zh-CN': { inst: 'pluck', scale: 'penta', root: 69, bpm: 200, opt: { bright: 0.75, bend: 0, decay: 0.997 }, gong: 1, notes: [[0, 4, 1], [1, 3, 1], [2, 2, 1], [3, 4, 1], [4, 5, 2]] },
  'zh-TW': { inst: 'flute', scale: 'penta', root: 74, bpm: 170, opt: { vib: 5, depth: 0.012 }, notes: [[0, 2, 1], [1, 4, 1], [2, 5, 2], [4, 3, 1], [5, 4, 2]] },
  ja: { inst: 'pluck', scale: 'insen', root: 69, bpm: 120, opt: { bright: 0.8, bend: 1, bendAt: 0.15 }, notes: [[0, 4, 1], [1, 3, 0.5], [1.5, 2, 1.5], [3, 0, 2]], perc: [[0, 'wood', 0.3]] },
  ko: { inst: 'pluck', scale: 'pminor', root: 67, bpm: 150, opt: { bright: 0.55, bend: 2, bendAt: 0.2 }, notes: [[0, 2, 1], [1, 3, 1], [2, 4, 2], [4, 2, 1.5]], perc: [[0, 'taiko', 0.45], [3, 'wood', 0.3]] },
  hi: { inst: 'pluck', scale: 'yaman', root: 62, bpm: 150, drone: [0, 4], opt: { bright: 0.9, buzz: 0.6, bend: 1 }, notes: [[0, 2, 1], [1, 3, 1], [2, 4, 1], [3, 5, 1], [4, 4, 2]], perc: [[0, 'tabla', 0.5], [2, 'tabla', 0.4], [3.5, 'tabla', 0.35]] },
  bn: { inst: 'flute', scale: 'kafi', root: 67, bpm: 150, drone: [0], notes: [[0, 4, 1], [1, 3, 1], [2, 2, 1], [3, 0, 2]], perc: [[0, 'tabla', 0.4], [2, 'tabla', 0.3]] },
  ta: { inst: 'pluck', scale: 'bhairav', root: 64, bpm: 170, drone: [0], opt: { bright: 0.7, buzz: 0.3, bend: 1 }, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 4, 1], [4, 6, 2]], perc: [[0, 'frame', 0.4], [1.5, 'frame', 0.3], [3, 'frame', 0.4]] },
  te: { inst: 'flute', scale: 'yaman', root: 69, bpm: 165, drone: [0], notes: [[0, 4, 1], [1, 5, 1], [2, 4, 1], [3, 2, 1], [4, 4, 2]], perc: [[0, 'tabla', 0.35]] },
  mr: { inst: 'reed', scale: 'kafi', root: 62, bpm: 160, opt: { cut: 1800, nasal: 0.6 }, notes: [[0, 0, 1], [1, 2, 1], [2, 4, 1], [3, 3, 2]], perc: [[0, 'tabla', 0.45], [1, 'tabla', 0.3], [2, 'tabla', 0.45]] },
  ur: { inst: 'reed', scale: 'kafi', root: 62, bpm: 120, drone: [0], opt: { cut: 1500, vib: 4 }, notes: [[0, 4, 1.5], [1.5, 3, 0.5], [2, 2, 1], [3, 0, 2]], perc: [[0, 'tabla', 0.4]] },
  ar: { inst: 'pluck', scale: 'hijaz', root: 62, bpm: 170, opt: { bright: 0.45, decay: 0.995 }, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 3, 1], [4, 2, 0.5], [4.5, 1, 1.5]], perc: [[0, 'darbuka', 0.55], [1.5, 'darbuka', 0.35], [2, 'darbuka', 0.45], [3, 'darbuka', 0.55]] },
  fa: { inst: 'tremolo', scale: 'shur', root: 64, bpm: 150, opt: { bright: 0.85, decay: 0.994 }, notes: [[0, 1, 1], [1, 2, 1], [2, 1, 1], [3, 0, 2]], perc: [[0, 'frame', 0.4]] },
  tr: { inst: 'pluck', scale: 'ussak', root: 64, bpm: 190, opt: { bright: 0.7, buzz: 0.2 }, notes: [[0, 4, 1], [1, 3, 1], [2, 2, 1], [3, 1, 1], [4, 0, 2]], perc: [[0, 'darbuka', 0.5], [2, 'darbuka', 0.4]] },
  iw: { inst: 'reed', scale: 'hijaz', root: 67, bpm: 170, opt: { cut: 2600, vib: 6 }, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 4, 1], [4, 3, 2]] },
  es: { inst: 'strum', scale: 'phryg', root: 64, bpm: 180, opt: { bright: 0.8 }, notes: [[0, 3, 1], [1, 2, 1], [2, 1, 1], [3, 0, 2]], perc: [[0, 'clap', 0.5], [1, 'clap', 0.3], [1.5, 'clap', 0.4], [3, 'clap', 0.5]] },
  pt: { inst: 'pluck', scale: 'lydian', root: 67, bpm: 150, opt: { bright: 0.45 }, notes: [[0, 0, 1], [0, 4, 1], [0, 6, 1], [1.5, 1, 1], [1.5, 5, 1], [3, 2, 1.5], [3, 7, 1.5]], perc: [[0, 'shaker', 0.4], [0.5, 'shaker', 0.25], [1, 'shaker', 0.35], [1.5, 'shaker', 0.25], [2, 'shaker', 0.35]] },
  fr: { inst: 'reed', scale: 'harm', root: 69, bpm: 190, opt: { cut: 3200, detune: 12, vib: 6 }, notes: [[0, 4, 1], [1, 3, 0.5], [1.5, 4, 0.5], [2, 6, 1], [3, 7, 2]] },
  it: { inst: 'tremolo', scale: 'major', root: 72, bpm: 160, opt: { bright: 0.8 }, notes: [[0, 2, 1], [1, 4, 1], [2, 3, 1], [3, 2, 2]] },
  de: { inst: 'brass', scale: 'major', root: 60, bpm: 150, notes: [[0, 0, 0.5], [0.5, 2, 0.5], [1, 4, 1], [2, 7, 2]], perc: [[0, 'kick', 0.4], [2, 'kick', 0.4]] },
  ru: { inst: 'tremolo', scale: 'minor', root: 69, bpm: 170, opt: { bright: 0.85, decay: 0.993 }, notes: [[0, 0, 1], [1, 2, 1], [2, 4, 1], [3, 3, 1], [4, 2, 2]] },
  uk: { inst: 'bow', scale: 'harm', root: 69, bpm: 150, opt: { slide: -1 }, notes: [[0, 0, 1], [1, 2, 1], [2, 4, 1], [3, 6, 1], [4, 7, 2]] },
  pl: { inst: 'bow', scale: 'major', root: 72, bpm: 180, notes: [[0, 4, 0.5], [0.5, 5, 0.5], [1, 4, 1], [2, 2, 1], [3, 0, 2]], perc: [[0, 'frame', 0.4], [1, 'frame', 0.3]] },
  nl: { inst: 'bell', scale: 'major', root: 76, bpm: 200, opt: { ratio: 2.76, index: 2.2 }, notes: [[0, 0, 1], [1, 2, 1], [2, 4, 1], [3, 5, 1], [4, 4, 2]] },
  sv: { inst: 'bow', scale: 'dorian', root: 69, bpm: 150, notes: [[0, 0, 1], [1, 4, 1], [2, 3, 1], [3, 2, 2]] },
  el: { inst: 'tremolo', scale: 'harm', root: 64, bpm: 190, opt: { bright: 0.9 }, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 4, 2]] },
  vi: { inst: 'pluck', scale: 'penta', root: 69, bpm: 120, opt: { bright: 0.35, bend: 3, bendAt: 0.12, decay: 0.998 }, notes: [[0, 2, 2], [2, 4, 2]] },
  th: { inst: 'bell', scale: 'penta', root: 76, bpm: 220, opt: { ratio: 2, index: 1.2 }, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 3, 1], [4, 4, 1], [5, 3, 2]] },
  id: { inst: 'bell', scale: 'pelog', root: 69, bpm: 180, opt: { ratio: 1.4, index: 2.5 }, gong: 1, notes: [[0, 0, 1], [1, 1, 1], [2, 2, 1], [3, 4, 1], [4, 3, 2]] },
  ms: { inst: 'bell', scale: 'slendro', root: 71, bpm: 190, opt: { ratio: 1.4, index: 2 }, notes: [[0, 4, 1], [1, 3, 1], [2, 2, 1], [3, 0, 2]], perc: [[0, 'frame', 0.35]] },
  fil: { inst: 'tremolo', scale: 'major', root: 74, bpm: 180, opt: { bright: 0.7 }, notes: [[0, 0, 1], [1, 2, 1], [2, 4, 1], [3, 5, 2]] },
  sw: { inst: 'bell', scale: 'penta', root: 72, bpm: 210, opt: { ratio: 2, index: 1.5 }, notes: [[0, 0, 1], [1, 2, 1], [2, 1, 1], [3, 3, 1], [4, 4, 2]], perc: [[0, 'wood', 0.35], [1.5, 'wood', 0.25], [3, 'wood', 0.35]] },
  am: { inst: 'pluck', scale: 'anchi', root: 66, bpm: 160, opt: { bright: 0.6, buzz: 0.4 }, notes: [[0, 0, 1], [1, 1, 1], [2, 3, 1], [3, 2, 2]] },
};

/* Every other language: a unique motif derived from its code, coloured by its region. */
const REGION_SOUND = {
  eu: { insts: ['bow', 'reed', 'bell', 'tremolo', 'brass'], scales: ['major', 'dorian', 'minor', 'mixo'], perc: 'frame' },
  as: { insts: ['pluck', 'bell', 'flute'], scales: ['penta', 'pminor', 'pelog', 'slendro'], perc: 'wood' },
  sa: { insts: ['pluck', 'flute', 'reed'], scales: ['yaman', 'kafi', 'bhairav'], perc: 'tabla' },
  me: { insts: ['pluck', 'bell', 'reed', 'flute'], scales: ['hijaz', 'penta', 'tizita', 'mixo'], perc: 'darbuka' },
  am: { insts: ['flute', 'strum', 'pluck'], scales: ['penta', 'major', 'dorian'], perc: 'shaker' },
};
function generated(code) {
  let h = 2166136261; for (const ch of code) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const r = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
  const R = REGION_SOUND[(BY[code] || {}).r] || REGION_SOUND.eu;
  const inst = R.insts[Math.floor(r() * R.insts.length)], scale = R.scales[Math.floor(r() * R.scales.length)];
  const notes = []; let deg = Math.floor(r() * 3), b = 0;
  for (let i = 0; i < 4; i++) { const l = r() < 0.3 ? 0.5 : 1; notes.push([b, deg, l]); b += l; deg += Math.floor(r() * 5) - 1; }
  notes.push([b, r() < 0.5 ? 4 : 7, 2]);
  const perc = r() < 0.6 ? [[0, R.perc, 0.4], [2, R.perc, 0.3]] : [];
  return { inst, scale, root: 62 + Math.floor(r() * 12), bpm: 150 + Math.floor(r() * 60), notes, perc, opt: { bright: 0.5 + r() * 0.4 } };
}

/* Click voices per profile world (see themes.js). Profiles that share a world with a variant inherit via CLICK_BASE. */
const CLICK = {
  brand: { inst: 'soft', scale: 'penta', root: 72 },
  identity: { inst: 'bell', scale: 'major', root: 74, perc: 0 },
  executive: { inst: 'wood', scale: 'major', root: 67, perc: 'wood' },
  vault: { inst: 'glass', scale: 'lydian', root: 70 },
  campus: { inst: 'pluck', scale: 'major', root: 72, perc: 'clap' },
  finance: { inst: 'bell', scale: 'mixo', root: 76 },
  bank: { inst: 'glass', scale: 'major', root: 69 },
  family: { inst: 'pluck', scale: 'penta', root: 74, perc: 'shaker' },
  home: { inst: 'wood', scale: 'penta', root: 69 },
  services: { inst: 'blip', scale: 'major', root: 72 },
  pets: { inst: 'pluck', scale: 'penta', root: 79, perc: 'shaker' },
  shop: { inst: 'bell', scale: 'major', root: 79 },
  luxury: { inst: 'glass', scale: 'lydian', root: 67 },
  beauty: { inst: 'glass', scale: 'penta', root: 77 },
  fashion: { inst: 'soft', scale: 'dorian', root: 70, perc: 'clap' },
  food: { inst: 'pluck', scale: 'mixo', root: 72, perc: 'wood' },
  lounge: { inst: 'reed', scale: 'blues', root: 62 },
  tech: { inst: 'blip', scale: 'lydian', root: 76 },
  media: { inst: 'brass', scale: 'mixo', root: 64 },
  gamer: { inst: 'blip', scale: 'pminor', root: 72, perc: 'kick' },
  creator: { inst: 'bell', scale: 'penta', root: 76, perc: 'clap' },
  health: { inst: 'soft', scale: 'major', root: 72 },
  sports: { inst: 'wood', scale: 'pminor', root: 67, perc: 'kick' },
  travel: { inst: 'bell', scale: 'mixo', root: 72 },
  auto: { inst: 'brass', scale: 'pminor', root: 60, perc: 'kick' },
  rewards: { inst: 'bell', scale: 'major', root: 79 },
  'home-household': { inst: 'glass', scale: 'penta', root: 72 },
  'beauty-personal-care': { inst: 'soft', scale: 'lydian', root: 74 },
  'food-beverages': { inst: 'glass', scale: 'mixo', root: 74 },
  'restaurants-food-delivery': { inst: 'pluck', scale: 'major', root: 76, perc: 'shaker' },
  'consumer-electronics': { inst: 'blip', scale: 'penta', root: 79 },
  'technology-digital-services': { inst: 'glass', scale: 'lydian', root: 74 },
  'gaming-esports': { inst: 'blip', scale: 'harm', root: 69, perc: 'kick' },
  'health-wellness': { inst: 'soft', scale: 'penta', root: 69 },
  'sports-physical-fitness': { inst: 'wood', scale: 'major', root: 72, perc: 'clap' },
  'travel-tourism': { inst: 'pluck', scale: 'penta', root: 74 },
  'automotive-mobility': { inst: 'blip', scale: 'mixo', root: 64 },
  'research-panel': { inst: 'bell', scale: 'dorian', root: 74 },
};
const CLICK_BASE = { 'household-services': 'services' };
