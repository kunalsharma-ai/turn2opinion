import { memo, useEffect, useRef } from 'react';
import { GREETINGS } from '../i18n/en.js';
import { BY } from '../i18n/languages.js';
import { t, lang, useI18n } from '../i18n/index.js';
import ORB from './orb.js';   // inlined (not an <img>) so it never becomes the page's LCP element

/* A 3D globe of greetings that spins around the Turn2Opinion orb.
   Drawn on two small canvases (words behind the orb, words in front of it) — well under a
   millisecond per frame, ~30 fps, paused when off-screen, in hidden tabs and on hover; static
   for reduced motion. Far-side words shrink and fade; the active language is highlighted.
   Tapping a front-facing greeting switches the page to that language. */
const N = GREETINGS.length;
const PTS = GREETINGS.map(([c, w], i) => {
  const y = (1 - (i + 0.5) * 2 / N) * 0.84, r = Math.sqrt(1 - y * y), th = i * 2.39996;
  return { c, w, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
});
const TILT = -0.2;
const lighten = (hex, t) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * t)); return `rgb(${c})`; };
const isDark = () => { const r = document.documentElement, m = r.dataset.theme; return m === 'dark' || (!m && matchMedia('(prefers-color-scheme: dark)').matches); };

function GreetingGlobe({ onPick }) {
  useI18n();
  const box = useRef(null), back = useRef(null), front = useRef(null), code = lang();
  const st = useRef({ a: 0.6, hover: -1, hits: [], code, redraw: null, shown: 0, born: [] });
  st.current.code = code;
  useEffect(() => { if (st.current.redraw) st.current.redraw(); }, [code]);

  useEffect(() => {
    const el = box.current, cb = back.current, cf = front.current; if (!el || !cb || !cf) return;
    const S = st.current, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1, raf = 0, last = 0, visible = true, started = false;
    const font = (getComputedStyle(document.documentElement).getPropertyValue('--fh') || 'sans-serif').trim();
    const size = () => {
      const r = el.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
      for (const c of [cb, cf]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
      cache && cache.clear();
    };
    const SPR_SCALE = 1.12, cache = new Map();
    const sprite = (p, chip, dark, budget) => {
      const key = p.c + p.w + (chip ? 1 : 0) + (dark ? 1 : 0) + dpr + (W < 340 ? 's' : '');
      let s = cache.get(key); if (s) return s;
      if (budget && budget.n-- <= 0) return null;
      const fs = Math.round((W < 340 ? 13 : 16) * SPR_SCALE), c = document.createElement('canvas'), x = c.getContext('2d');
      x.font = `800 ${fs}px ${font}`;
      const tw = Math.ceil(x.measureText(p.w).width), pw = chip ? tw + 20 : tw + 4, ph = chip ? fs + 14 : fs + 8;
      c.width = Math.ceil(pw * dpr); c.height = Math.ceil(ph * dpr);
      x.scale(dpr, dpr); x.font = `800 ${fs}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle';
      const base = (BY[p.c].a || [])[0] || '#1f5eff', col = dark ? lighten(base, 0.45) : base;
      if (chip) { x.fillStyle = base; x.beginPath(); if (x.roundRect) x.roundRect(0, 0, pw, ph, ph / 2); else x.rect(0, 0, pw, ph); x.fill(); x.fillStyle = '#fff'; } else x.fillStyle = col;
      x.fillText(p.w, pw / 2, ph / 2 + 1);
      s = { c, w: pw, h: ph }; cache.set(key, s); return s;
    };
    const draw = () => {
      if (!W) return;
      const R = Math.min(W, H) * 0.41, cx = W / 2, cy = H / 2 - H * 0.03, ca = Math.cos(S.a), sa = Math.sin(S.a), ct = Math.cos(TILT), stt = Math.sin(TILT);
      const xb = cb.getContext('2d'), xf = cf.getContext('2d');
      for (const x of [xb, xf]) { x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H); }
      const items = PTS.map((p, i) => {
        const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca;
        const y2 = p.y * ct - z1 * stt, z2 = p.y * stt + z1 * ct;
        return { p, i, sx: cx + R * x1, sy: cy + R * y2, z: z2 };
      }).sort((m, n) => m.z - n.z);
      const hits = [], now = performance.now(), dark = isDark(), budget = { n: 2 };
      for (const it of items) {
        if (it.i >= S.shown) continue;
        const age = Math.min(1, (now - (S.born[it.i] || 0)) / 450), pop = 1 - Math.pow(1 - age, 3);
        const d = (it.z + 1) / 2, sc = (0.6 + 0.52 * d) * (0.5 + 0.5 * pop), on = it.p.c === S.code, hov = S.hover === it.i;
        const x = it.z < 0 ? xb : xf, chip = (on || hov) && it.z > -0.3;
        /* each greeting is shaped once into a small bitmap (text shaping for CJK, Devanagari, Arabic… is the
           expensive part), then only scaled and blended every frame — keeps every frame a few ms even on phones */
        const spr = sprite(it.p, chip, dark, budget); if (!spr) continue;   // at most 2 new greetings shaped per frame
        const k = sc / SPR_SCALE;
        const w = spr.w * k, h = spr.h * k;
        x.globalAlpha = (0.16 + 0.84 * Math.pow(d, 1.4)) * pop;
        x.drawImage(spr.c, it.sx - w / 2, it.sy - h / 2, w, h);
        if (it.z > 0.05) hits.push({ i: it.i, x0: it.sx - w / 2, x1: it.sx + w / 2, y0: it.sy - h / 2 - 4, y1: it.sy + h / 2 + 4 });
      }
      xb.globalAlpha = 1; xf.globalAlpha = 1;
      S.hits = hits;
    };
    const loop = (now) => {
      raf = 0;
      if (!visible || document.hidden || reduce) return;
      if (now - last > 32) {
        const dt = last ? Math.min(64, now - last) : 16; last = now; if (S.hover < 0) S.a += dt * 0.00018;
        if (S.shown < N) { S.born[S.shown] = now; S.shown++; }
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && started) { last = 0; raf = requestAnimationFrame(loop); } };
    const hitAt = (e) => {
      const r = cf.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      for (let k = S.hits.length - 1; k >= 0; k--) { const b = S.hits[k]; if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return b.i; }
      return -1;
    };
    const move = (e) => { const i = hitAt(e); if (i !== S.hover) { S.hover = i; cf.style.cursor = i >= 0 ? 'pointer' : ''; draw(); } };
    const leave = () => { S.hover = -1; cf.style.cursor = ''; kick(); };
    const click = (e) => { const i = hitAt(e); if (i >= 0) onPick(PTS[i].c, e); };
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }) : null;
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { if (started) { size(); draw(); } }) : null;
    const vis = () => kick();
    /* start after the page has settled, so the globe never competes with first render */
    const start = () => { started = true; if (reduce) S.shown = N; size(); draw(); kick(); };
    /* start after the page has settled; greetings then pop in one by one (which also spreads the
       first-time text shaping for each script — CJK, Devanagari, Arabic, Thai… — across frames) */
    const idle = 'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 400);
    S.redraw = () => { if (started) draw(); };
    io && io.observe(el); ro && ro.observe(el);
    cf.addEventListener('pointermove', move); cf.addEventListener('pointerleave', leave); cf.addEventListener('click', click);
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf); if ('cancelIdleCallback' in window) cancelIdleCallback(idle); else clearTimeout(idle);
      io && io.disconnect(); ro && ro.disconnect(); document.removeEventListener('visibilitychange', vis);
      cf.removeEventListener('pointermove', move); cf.removeEventListener('pointerleave', leave); cf.removeEventListener('click', click);
      S.redraw = null;
    };
  }, [onPick]);

  return (
    <div className="globe" ref={box}>
      <div className="g-glow" aria-hidden="true" />
      <span className="g-ring r1" aria-hidden="true" /><span className="g-ring r2" aria-hidden="true" />
      <canvas ref={back} className="g-cv" aria-hidden="true" />
      <span className="g-orb" role="img" aria-label="Turn2Opinion orb" dangerouslySetInnerHTML={{ __html: ORB }} />
      <canvas ref={front} className="g-cv front" aria-hidden="true" />
      <p className="g-hint">{t('globe_hint')}</p>
    </div>
  );
}
export default memo(GreetingGlobe);
