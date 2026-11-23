/* CHANGE-06 / CHANGE-07 · "Your Opinion Kingdom" — the game-style reward board.
   Every profile and survey owns a plot. Completing it raises that item's building (castle keep, library,
   windmill, lighthouse, arena…), lights its windows and plants its flag. The next plot to build carries a
   crane; locked plots show a blueprint. The kingdom grows from Campsite to Hamlet, Village, Town, City,
   Kingdom, Empire and Legendary Realm, and point milestones add world wonders (flag, rainbow, balloons,
   dragon, golden crown, fireworks).
   Treasury: points (coins), quality score (gems), level meter made of castle stones, next treasure chest,
   royal seals (achievements).
   Interaction: tap a building to see what built it; tap the crane plot to start it; tap a locked plot for
   the "sealed" message. Day sky in light mode, starry night in dark mode.
   Performance: one inline SVG, CSS transform/opacity animations only, paused off-screen and in hidden tabs. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { building, blueprint, scaffold, campsite } from '../lib/kingdom-art.js';
import { itemMeta } from '../lib/items.js';
import { levelOf, LEVELS, MILESTONES, POINTS_PER_ITEM, QUALITY_PER_ITEM, isBuilt, markBuilt } from '../lib/rewards.js';
import { profileKey } from '../lib/storage.js';
import { pnameT } from '../lib/present.js';
import { t, tr, nf, useI18n } from '../i18n/index.js';
import { reducedMotion } from '../lib/fx.js';
import { sound } from '../lib/uisound.js';
import Odo from './Odo.jsx';

const VW = 1200, VH = 560;
const CASTLE = { x: 600, y: 318 };
/* rows of plots: y, scale, x-range, gap around the castle */
const ROWS = [
  { y: 322, s: 0.6, x0: 70, x1: 1130, hole: [455, 760], cap: 10 },
  { y: 410, s: 0.78, x0: 60, x1: 1140, cap: 12 },
  { y: 505, s: 0.95, x0: 55, x1: 1145, cap: 13 },
];

/** place n surveys: nearest to the castle first, so the kingdom grows outwards */
function layout(n) {
  const capT = ROWS.reduce((a, r) => a + r.cap, 0), caps = ROWS.map((r) => Math.max(1, Math.round(r.cap * n / capT)));
  let d = n - caps.reduce((a, b) => a + b, 0); for (let k = caps.length - 1; d !== 0; k = (k + caps.length - 1) % caps.length) { if (d > 0) { caps[k]++; d--; } else if (caps[k] > 1) { caps[k]--; d++; } }
  const pts = [];
  ROWS.forEach((r, ri) => {
    const c = caps[ri]; if (!c) return;
    let xs = [];
    if (r.hole) {
      const l = Math.ceil(c / 2), rr = c - l, wl = r.hole[0] - r.x0, wr = r.x1 - r.hole[1];
      for (let i = 0; i < l; i++) xs.push(r.hole[0] - wl * (i + 0.5) / l);
      for (let i = 0; i < rr; i++) xs.push(r.hole[1] + wr * (i + 0.5) / rr);
    } else for (let i = 0; i < c; i++) xs.push(r.x0 + (r.x1 - r.x0) * (i + 0.5) / c);
    xs.sort((a, b) => Math.abs(a - CASTLE.x) - Math.abs(b - CASTLE.x));
    xs.forEach((x, i) => pts.push({ x: Math.round(x), y: r.y + (i % 2 ? 6 : -4) * (ri === 0 ? 0.6 : 1), s: r.s }));
  });
  return pts;
}

const SEALS = [
  { k: 'seal_first', e: '🪨', need: (c) => c.done >= 1 },
  { k: 'seal_found', e: '🏰', need: (c) => c.basic },
  { k: 'seal_scholar', e: '📜', need: (c) => c.aboutDone },
  { k: 'seal_explorer', e: '🧭', need: (c) => c.surveysDone >= 1 },
  { k: 'seal_builder', e: '🧱', need: (c) => c.done >= 5 },
  { k: 'seal_architect', e: '📐', need: (c) => c.done >= 10 },
  { k: 'seal_monarch', e: '👑', need: (c) => c.done >= 18 },
  { k: 'seal_legend', e: '🌟', need: (c) => c.total > 0 && c.done >= c.total },
];

export default function Kingdom({ items, state, name, hold, onOpen, onLocked, points, quality }) {
  useI18n();
  const wrap = useRef(null), scene = useRef(null);
  const [tip, setTip] = useState(null);
  const [rise, setRise] = useState(() => new Set());
  const profiles = items.filter((x) => x.kind === 'profile'), surveys = items.filter((x) => x.kind === 'survey');
  const spots = useMemo(() => layout(surveys.length), [surveys.length]);
  const st = (x) => state.map.get(x.i) || { st: 'locked' };
  const done = items.filter((x) => st(x).st === 'done').length, total = items.length;
  const pts = points ?? done * POINTS_PER_ITEM, qs = quality ?? done * QUALITY_PER_ITEM;   // member area: real totals from the API
  const lv = levelOf(done, total), lvNext = LEVELS[Math.min(lv.k + 1, LEVELS.length - 1)];
  const nextMs = MILESTONES.find((m) => pts < m.pts), wonders = new Set(MILESTONES.filter((m) => pts >= m.pts).map((m) => m.fx));
  const ctx = { done, total, basic: profiles[0] && st(profiles[0]).st === 'done', aboutDone: state.aboutDone, surveysDone: surveys.filter((x) => st(x).st === 'done').length };

  /* raise buildings completed since the kingdom was last seen (once each) */
  useEffect(() => {
    if (hold) return undefined;   // wait until the completion celebration has closed
    const fresh = items.filter((x) => st(x).st === 'done' && !isBuilt(profileKey(x.p)));
    if (!fresh.length) return undefined;
    const el = wrap.current;
    const go = () => {
      setRise(new Set(fresh.map((x) => x.i)));
      if (!reducedMotion()) { sound.build && sound.build('en'); setTimeout(() => sound.windows && sound.windows('en', 6), 700); }
      /* centre the new building in the scroll area on small screens */
      const sc = scene.current, first = fresh[fresh.length - 1], pos = posOf(first);
      if (sc && pos && sc.scrollWidth > sc.clientWidth) sc.scrollTo({ left: Math.max(0, pos.x / VW * sc.scrollWidth - sc.clientWidth / 2), behavior: reducedMotion() ? 'auto' : 'smooth' });
      setTimeout(() => { fresh.forEach((x) => markBuilt(profileKey(x.p))); }, 1900);
      setTimeout(() => setRise(new Set()), 2600);
    };
    if (!el || typeof IntersectionObserver === 'undefined') { go(); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && e.intersectionRatio > 0.35) { io.disconnect(); setTimeout(go, 250); } }, { threshold: [0, 0.35, 0.6] });
    io.observe(el); return () => io.disconnect();
  }, [done, hold]); // eslint-disable-line react-hooks/exhaustive-deps

  /* pause ambient animation when off-screen */
  useEffect(() => {
    const el = wrap.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('off', !e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);

  /* centre the castle on narrow screens at first paint */
  useEffect(() => { const sc = scene.current; if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2; }, []);

  /* drag to pan on touch / mouse (native scroll on touch already works; this adds mouse drag) */
  useEffect(() => {
    const sc = scene.current; if (!sc) return;
    let down = null;
    const d = (e) => { if (e.pointerType !== 'mouse' || sc.scrollWidth <= sc.clientWidth) return; down = { x: e.clientX, l: sc.scrollLeft, moved: false }; };
    const m = (e) => { if (!down) return; const dx = e.clientX - down.x; if (Math.abs(dx) > 4) down.moved = true; sc.scrollLeft = down.l - dx; };
    const u = () => { setTimeout(() => { down = null; }, 0); };
    sc.addEventListener('pointerdown', d); addEventListener('pointermove', m); addEventListener('pointerup', u);
    sc._moved = () => down && down.moved;
    return () => { sc.removeEventListener('pointerdown', d); removeEventListener('pointermove', m); removeEventListener('pointerup', u); };
  }, []);

  function posOf(x) {
    if (x.kind === 'profile') { const k = profiles.indexOf(x); return k === 0 ? { x: CASTLE.x - 6, y: CASTLE.y, s: 1 } : k === 1 ? { x: CASTLE.x + 92, y: CASTLE.y + 2, s: 0.92 } : { x: CASTLE.x - 110 - (k - 2) * 60, y: CASTLE.y + 4, s: 0.8 }; }
    return spots[surveys.indexOf(x)];
  }
  const click = (x, e) => {
    if (scene.current && scene.current._moved && scene.current._moved()) return;
    const s = st(x).st;
    if (s === 'locked') { onLocked(x.i); return; }
    if (s === 'done') { sound.ui('gem'); const r = e.currentTarget.getBoundingClientRect(), w = wrap.current.getBoundingClientRect(); setTip({ x, left: r.left + r.width / 2 - w.left, top: r.top - w.top }); return; }
    onOpen(x.i);
  };
  const key = (x) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); click(x, e); } };

  const plot = (x) => {
    const pos = posOf(x); if (!pos) return null;
    const s0 = st(x).st, m = itemMeta(x.p), isKeep = x.kind === 'profile' && profiles.indexOf(x) === 0;
    const waiting = s0 === 'done' && !rise.has(x.i) && !isBuilt(profileKey(x.p));   // completed, building not raised yet
    const s = waiting ? 'open' : s0;
    const label = `${pnameT(x.p)} — ${s0 === 'done' ? t('v6_built', { b: tr(m.name) }) : s === 'locked' ? t('v6_locked') : s === 'prog' ? t('v6_in_progress', { pct: st(x).pct }) : t('v6_ready')}`;
    let art;
    if (s === 'done') art = building(m.b, m);
    else if (isKeep) art = campsite() + (s !== 'locked' ? `<g class="keep-ghost">${building('keep', { ...m, e: ['🙂'] })}</g>` : '');
    else if (s === 'locked') art = blueprint(true);
    else art = scaffold() + `<text class="sign ready-sign" x="0" y="-58" font-size="16" text-anchor="middle">${m.e[0]}</text>`;
    return (
      <g key={x.i} className={'plot st-' + s + (rise.has(x.i) ? ' rise' : '') + (isKeep ? ' keep' : '')} transform={`translate(${pos.x} ${pos.y}) scale(${pos.s})`}
        role="button" tabIndex={0} aria-label={label} onClick={(e) => click(x, e)} onKeyDown={key(x)} data-snd={s === 'locked' ? 'lock' : s === 'done' ? 'none' : 'open'}>
        <title>{label}</title>
        <ellipse className="plot-shadow" cx="0" cy="2" rx={s === 'done' ? 46 : 36} ry="9" />
        <g className="plot-art" dangerouslySetInnerHTML={{ __html: art }} />
        {s === 'prog' && <g className="plot-pct"><rect x="-20" y="12" width="40" height="14" rx="7" /><text x="0" y="22" textAnchor="middle">{nf(st(x).pct)}%</text></g>}
        {rise.has(x.i) && <g className="dust" aria-hidden="true"><circle cx="-26" cy="-2" r="8" /><circle cx="0" cy="2" r="10" /><circle cx="26" cy="-2" r="8" /></g>}
      </g>
    );
  };

  const order = items.slice().sort((a, b) => (posOf(a) ? posOf(a).y : 0) - (posOf(b) ? posOf(b).y : 0));
  return (
    <section className="kd" id="kingdom" ref={wrap} aria-labelledby="kd-h">
      <div className="kd-head">
        <div>
          <p className="kd-eyebrow"><span aria-hidden="true">{lv.e}</span>{t(lv.key)}</p>
          <h2 id="kd-h" className="kd-h">{name ? t('v6_kingdom_named', { name }) : t('v6_kingdom')}</h2>
          <p className="kd-sub">{t('v6_kingdom_sub')}</p>
        </div>
        <div className="kd-lv" role="img" aria-label={t('v6_lv_aria', { lv: t(lv.key), n: lv.toNext, next: t(lvNext.key) })}>
          <div className="kd-stones">{Array.from({ length: 10 }, (_, i) => { const f = total ? Math.max(done ? 1 : 0, Math.round(done / total * 10)) : 0; return <i key={i} className={i < f ? 'on' : ''} style={{ '--i': i }} />; })}</div>
          <small>{lv.k === LEVELS.length - 1 ? t('v6_lv_max') : t('v6_lv_next', { n: lv.toNext, next: t(lvNext.key) })}</small>
        </div>
      </div>

      <div className="kd-body">
        <div className="kd-scene" ref={scene} tabIndex={-1}>
          <svg className="kd-svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="group" aria-label={t('v6_kingdom_aria', { done, total })}>
            <defs>
              <linearGradient id="kd-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="sky0" /><stop offset=".62" className="sky1" /><stop offset="1" className="sky2" /></linearGradient>
              <linearGradient id="kd-hill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="h1a" /><stop offset="1" className="h1b" /></linearGradient>
              <linearGradient id="kd-hill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="h2a" /><stop offset="1" className="h2b" /></linearGradient>
              <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff6b0" stopOpacity=".9" /><stop offset="1" stopColor="#fff6b0" stopOpacity="0" /></linearGradient>
              <radialGradient id="kd-sun"><stop offset="0" stopColor="#fff7c9" /><stop offset=".6" stopColor="#ffd56b" /><stop offset="1" stopColor="#ffb020" stopOpacity="0" /></radialGradient>
            </defs>
            <rect width={VW} height={VH} fill="url(#kd-sky)" />
            <g className="kd-stars">{Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 263) % VW} cy={(i * 97) % 240 + 8} r={i % 5 ? 1.1 : 1.8} style={{ '--d': (i % 7) * 0.4 + 's' }} />)}</g>
            <g className="kd-sun"><circle cx="1010" cy="96" r="70" fill="url(#kd-sun)" /><circle cx="1010" cy="96" r="30" className="sun-core" /></g>
            <g className="kd-moon"><circle cx="1010" cy="92" r="26" fill="#f4f1de" /><circle cx="1020" cy="84" r="24" className="moon-cut" /></g>
            {wonders.has('rainbow') && <g className="wonder rainbow" opacity=".75">{['#ff5e5e', '#ffb020', '#ffe14d', '#4cd964', '#36c2ff', '#7c5cff'].map((c, i) => <path key={c} d={`M${360 + i * 9} 330A${240 - i * 9} ${190 - i * 9} 0 0 1 ${840 - i * 9} 330`} fill="none" stroke={c} strokeWidth="9" />)}</g>}
            <g className="kd-clouds"><g className="cl c1"><ellipse cx="160" cy="90" rx="58" ry="18" /><ellipse cx="200" cy="78" rx="36" ry="20" /></g><g className="cl c2"><ellipse cx="520" cy="60" rx="64" ry="16" /><ellipse cx="560" cy="50" rx="30" ry="16" /></g><g className="cl c3"><ellipse cx="820" cy="128" rx="48" ry="14" /><ellipse cx="850" cy="118" rx="26" ry="14" /></g></g>
            <g className="kd-birds"><path d="M0 0q5 -5 10 0q5 -5 10 0" /><path d="M24 10q4 -4 8 0q4 -4 8 0" /></g>
            <path className="mtn m1" d="M0 300L120 190L210 260L330 150L450 250L560 170L680 260L800 160L930 250L1050 180L1200 280V560H0z" />
            <path className="mtn m2" d="M0 330Q150 250 300 300T600 280T900 300T1200 290V560H0z" fill="url(#kd-hill1)" />
            <path className="hill" d="M0 372Q300 330 600 340T1200 372V560H0z" fill="url(#kd-hill2)" />
            <path className="river" d="M-10 470Q240 440 420 458T800 470T1210 452" />
            <path className="ground" d="M0 452Q300 430 600 440T1200 452V560H0z" />
            <path className="road" d="M560 560Q590 470 600 340" />
            {wonders.has('balloons') && <g className="wonder balloons"><g className="bl b1"><ellipse cx="250" cy="170" rx="16" ry="20" fill="#ff5e8a" /><path d="M244 188h12l-2 10h-8z" fill="#8a5a3b" /></g><g className="bl b2"><ellipse cx="930" cy="210" rx="13" ry="16" fill="#36c2ff" /><path d="M925 225h10l-2 8h-6z" fill="#8a5a3b" /></g></g>}
            {wonders.has('dragon') && <g className="wonder dragon"><text x="0" y="0" fontSize="38">🐉</text></g>}
            <g className="plots">{order.map(plot)}</g>
            {wonders.has('flag') && <text className="wonder crown" x={CASTLE.x + 40} y={CASTLE.y - 150} fontSize="22" textAnchor="middle">🚩</text>}
            {wonders.has('crown') && <text className="wonder crown" x={CASTLE.x - 6} y={CASTLE.y - 170} fontSize="26" textAnchor="middle">👑</text>}
            {wonders.has('fireworks') && <g className="wonder fw">{[[300, 120, '#ffd23f'], [880, 90, '#ff5e8a'], [620, 70, '#36c2ff']].map(([x, y, c], i) => <g key={i} className="fwb" style={{ '--d': i * 1.3 + 's' }} transform={`translate(${x} ${y})`}>{Array.from({ length: 10 }, (_, k) => <line key={k} x1="0" y1="0" x2="0" y2="-22" stroke={c} strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${k * 36})`} />)}</g>)}</g>}
          </svg>
          {tip && (
            <div className="kd-tip" role="status" style={{ left: tip.left, top: tip.top }} onClick={() => setTip(null)}>
              <b>{tr(itemMeta(tip.x.p).name)}</b><span>{t('v6_tip_built', { name: pnameT(tip.x.p) })}</span><span className="kd-tip-r"><i className="mini-coin" />+{(tip.x.src && tip.x.src.points) || POINTS_PER_ITEM}</span>
              <button type="button" className="kd-tip-x" onClick={(e) => { e.stopPropagation(); onOpen(tip.x.i); setTip(null); }}>{t('v6_update_answers')}</button>
            </div>
          )}
          <p className="kd-pan" aria-hidden="true"><span>👆</span>{t('v6_pan')}</p>
        </div>

        <aside className="kd-treasury" aria-label={t('v6_treasury')}>
          <div className="tr-row coins"><span className="tr-coin" aria-hidden="true"><i /></span><div><Odo value={pts} className="big" /><small>{t('v6_pts_long')}</small></div></div>
          <div className="tr-row gems"><span className="tr-gem" aria-hidden="true"><i /></span><div><Odo value={qs} className="big" /><small>{t('v6_qs_long')}</small></div></div>
          <div className="tr-row bld"><span className="tr-e" aria-hidden="true">🏗️</span><div><b>{nf(done)}<span>/{nf(total)}</span></b><small>{t('v6_buildings')}</small></div></div>
          {nextMs ? (
            <div className="tr-chest">
              <span className="chest" aria-hidden="true"><span className="lid" />{nextMs.e}</span>
              <div><b>{t(nextMs.key)}</b><small>{t('v6_chest_at', { n: nextMs.pts - pts })}</small>
                <span className="chest-bar" role="progressbar" aria-valuemin="0" aria-valuemax={nextMs.pts} aria-valuenow={pts}><i style={{ '--w': Math.min(100, pts / nextMs.pts * 100) + '%' }} /></span></div>
            </div>
          ) : <div className="tr-chest open"><span className="chest" aria-hidden="true">🏆</span><div><b>{t('v6_all_wonders')}</b></div></div>}
        </aside>
      </div>

      <div className="kd-seals" role="list" aria-label={t('v6_seals')}>
        {SEALS.map((s) => { const on = s.need(ctx); return <span key={s.k} role="listitem" className={'seal' + (on ? ' on' : '')} title={t(s.k)}><span className="seal-e" aria-hidden="true">{s.e}</span><small>{t(s.k)}</small><span className="sr">{on ? t('v6_seal_on') : t('v6_seal_off')}</span></span>; })}
      </div>
    </section>
  );
}
