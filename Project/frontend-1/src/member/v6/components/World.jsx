/* Round 24 · the reward worlds for Professionals and Teens, the counterparts of the Consumer Kingdom.
     Professional  "Insight Observatory": every profile and survey is a star in the night sky over an
                   observatory. Completing it ignites the star, draws its constellation line and adds its
                   points. The next star carries a teal target, a started one shows its progress ring,
                   locked ones are faint. Point milestones add a signal beacon, an aurora, a satellite,
                   a comet, a golden telescope and a meteor shower.
     Teen          "Quest Islands": every profile and survey is an island on a treasure-map route. Completing
                   it raises the island with a palm, a flag and a treasure chest. A sailboat waits at the next
                   island, started ones show a tent and their progress, locked ones sit in the fog. Milestones
                   add a message in a bottle, a rainbow, a whale, a hot-air balloon, a ship and fireworks.
   Both share the Kingdom's frame (.kd): level meter, treasury with the member's REAL points and quality
   score, next-milestone chest and badges. Each completed item animates once (same "built" record as the
   Kingdom), the scene pauses off-screen and honours reduced motion, and every plot is a keyboard button. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { star, dome, island } from '../lib/world-art.js';
import { itemMeta } from '../lib/items.js';
import { POINTS_PER_ITEM, isBuilt, markBuilt } from '../lib/rewards.js';
import { worldById, worldLevel } from '../lib/world.js';
import { profileKey } from '../lib/storage.js';
import { pnameT } from '../lib/present.js';
import { t, nf, useI18n } from '../i18n/index.js';
import { reducedMotion } from '../lib/fx.js';
import { sound } from '../lib/uisound.js';
import Odo from './Odo.jsx';

const VW = 1200, VH = 560;

/* ------------------------------------------------------------ layouts */
// Observatory: About-you profiles sit just above the dome; the rest fill constellations around the sky.
const OB_ANCHORS = [[540, 318], [660, 318], [470, 350], [730, 350]];
const OB_CENTRES = [[190, 118], [450, 92], [760, 92], [1010, 118], [200, 300], [1000, 300], [600, 175], [340, 215], [865, 215], [600, 52]];
const OB_SHAPE = [[0, 0], [66, -24], [124, 10], [92, 66], [22, 74], [-46, 44], [-66, -18]];
function obLayout(nAbout, nSurveys) {
  const about = Array.from({ length: nAbout }, (_, i) => {
    const a = OB_ANCHORS[i] || [470 - (i - 3) * 60, 360];
    return { x: a[0], y: a[1], s: 1.05, g: -1 };
  });
  const groups = Math.min(OB_CENTRES.length, Math.max(1, Math.ceil(nSurveys / 6)));
  const per = Math.ceil(nSurveys / groups);
  const sv = [];
  for (let i = 0; i < nSurveys; i++) {
    const g = Math.floor(i / per), k = i % per, c = OB_CENTRES[g];
    // each constellation is the same seven-star shape, centred on its spot and turned a little
    const rot = (((g % 2 ? 1 : -1) * (12 + g * 5)) * Math.PI) / 180, ring = Math.floor(k / OB_SHAPE.length);
    const dx = OB_SHAPE[k % OB_SHAPE.length][0] - 29, dy = OB_SHAPE[k % OB_SHAPE.length][1] - 25, sc = 0.82 + ring * 0.4;
    const x = c[0] + (dx * Math.cos(rot) - dy * Math.sin(rot)) * sc, y = c[1] + (dx * Math.sin(rot) + dy * Math.cos(rot)) * sc * 0.78;
    sv.push({ x: Math.round(Math.max(40, Math.min(VW - 40, x))), y: Math.round(Math.max(36, Math.min(420, y))), s: 0.78, g });
  }
  return { about, sv };
}

// Islands: a serpentine treasure route from the bottom left, up through three rows of islands.
const IS_ROWS = [{ y: 488, s: 1 }, { y: 372, s: 0.84 }, { y: 268, s: 0.7 }];
function isLayout(n) {
  const w = [0.38, 0.33, 0.29], caps = w.map((f) => Math.max(1, Math.round(n * f)));
  let d = n - caps.reduce((a, b) => a + b, 0);
  for (let k = 0; d !== 0; k = (k + 1) % 3) { if (d > 0) { caps[k]++; d--; } else if (caps[k] > 1) { caps[k]--; d++; } }
  const pts = [];
  IS_ROWS.forEach((r, ri) => {
    const c = caps[ri], x0 = 110 + ri * 40, x1 = VW - 110 - ri * 40;
    for (let i = 0; i < c; i++) {
      const f = c === 1 ? 0.5 : i / (c - 1), x = ri % 2 ? x1 - (x1 - x0) * f : x0 + (x1 - x0) * f;
      pts.push({ x: Math.round(x), y: r.y + (i % 2 ? 10 : -6) * r.s, s: r.s });
    }
  });
  return pts.slice(0, n);
}
const route = (pts) => pts.reduce((d, p, i) => {
  if (!i) return `M${p.x} ${p.y + 8}`;
  const q = pts[i - 1], mx = (q.x + p.x) / 2, my = (q.y + p.y) / 2 + (Math.abs(q.y - p.y) > 40 ? 0 : 28);
  return `${d} Q${Math.abs(q.y - p.y) > 40 ? (i % 2 ? 1180 : 20) : mx} ${my} ${p.x} ${p.y + 8}`;
}, '');

/* ------------------------------------------------------------ component */
export default function World({ kind, items, state, name, hold, onOpen, onLocked, points, quality }) {
  useI18n();
  const W = worldById(kind), isObs = kind === 'observatory', P = isObs ? 'w_obs' : 'w_isl';
  const wrap = useRef(null), scene = useRef(null);
  const [tip, setTip] = useState(null);
  const [rise, setRise] = useState(() => new Set());
  const profiles = items.filter((x) => x.kind === 'profile'), surveys = items.filter((x) => x.kind === 'survey');
  const st = (x) => state.map.get(x.i) || { st: 'locked', pct: 0 };
  const done = items.filter((x) => st(x).st === 'done').length, total = items.length;
  const pts = points ?? 0, qs = quality ?? 0;
  const lv = worldLevel(W.levels, done, total), lvNext = W.levels[Math.min(lv.k + 1, W.levels.length - 1)];
  const nextMs = W.milestones.find((m) => pts < m.pts), wonders = new Set(W.milestones.filter((m) => pts >= m.pts).map((m) => m.fx));
  const ctx = { done, total, basic: profiles[0] && st(profiles[0]).st === 'done', aboutDone: state.aboutDone, surveysDone: surveys.filter((x) => st(x).st === 'done').length };

  const pos = useMemo(() => {
    const map = new Map();
    if (isObs) {
      const l = obLayout(profiles.length, surveys.length);
      profiles.forEach((x, i) => map.set(x.i, l.about[i]));
      surveys.forEach((x, i) => map.set(x.i, l.sv[i]));
    } else {
      const l = isLayout(items.length);
      items.forEach((x, i) => map.set(x.i, l[i]));
    }
    return map;
  }, [isObs, items.length, profiles.length, surveys.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /* animate items completed since the world was last seen (once each), after the celebration closes */
  useEffect(() => {
    if (hold) return undefined;
    const fresh = items.filter((x) => st(x).st === 'done' && !isBuilt(profileKey(x.p)));
    if (!fresh.length) return undefined;
    const el = wrap.current;
    const go = () => {
      setRise(new Set(fresh.map((x) => x.i)));
      if (!reducedMotion()) { sound.build && sound.build('en'); setTimeout(() => sound.windows && sound.windows('en', 6), 700); }
      const sc = scene.current, p = pos.get(fresh[fresh.length - 1].i);
      if (sc && p && sc.scrollWidth > sc.clientWidth) sc.scrollTo({ left: Math.max(0, (p.x / VW) * sc.scrollWidth - sc.clientWidth / 2), behavior: reducedMotion() ? 'auto' : 'smooth' });
      setTimeout(() => fresh.forEach((x) => markBuilt(profileKey(x.p))), 1900);
      setTimeout(() => setRise(new Set()), 2600);
    };
    if (!el || typeof IntersectionObserver === 'undefined') { go(); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && e.intersectionRatio > 0.35) { io.disconnect(); setTimeout(go, 250); } }, { threshold: [0, 0.35, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, [done, hold]); // eslint-disable-line react-hooks/exhaustive-deps

  /* pause ambient animation off-screen */
  useEffect(() => {
    const el = wrap.current; if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('off', !e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);

  /* narrow screens: start the observatory centred, the islands at the start of the route */
  useEffect(() => { const sc = scene.current; if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = isObs ? (sc.scrollWidth - sc.clientWidth) / 2 : 0; }, [isObs]);

  /* mouse drag to pan (touch scrolls natively) */
  useEffect(() => {
    const sc = scene.current; if (!sc) return undefined;
    let down = null;
    const d = (e) => { if (e.pointerType !== 'mouse' || sc.scrollWidth <= sc.clientWidth) return; down = { x: e.clientX, l: sc.scrollLeft, moved: false }; };
    const m = (e) => { if (!down) return; const dx = e.clientX - down.x; if (Math.abs(dx) > 4) down.moved = true; sc.scrollLeft = down.l - dx; };
    const u = () => { setTimeout(() => { down = null; }, 0); };
    sc.addEventListener('pointerdown', d); addEventListener('pointermove', m); addEventListener('pointerup', u);
    sc._moved = () => down && down.moved;
    return () => { sc.removeEventListener('pointerdown', d); removeEventListener('pointermove', m); removeEventListener('pointerup', u); };
  }, []);

  const click = (x, e) => {
    if (scene.current && scene.current._moved && scene.current._moved()) return;
    const s = st(x).st;
    if (s === 'locked') { onLocked(x.i); return; }
    if (s === 'done') { sound.ui('gem'); const r = e.currentTarget.getBoundingClientRect(), w = wrap.current.getBoundingClientRect(); setTip({ x, left: r.left + r.width / 2 - w.left, top: r.top - w.top }); return; }
    onOpen(x.i);
  };
  const key = (x) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); click(x, e); } };

  // the first open (not started) item is "next": it gets the target / the sailboat
  const nextItem = items.find((x) => st(x).st === 'open') || items.find((x) => st(x).st === 'prog');

  const plot = (x) => {
    const p = pos.get(x.i); if (!p) return null;
    const s0 = st(x).st, m = itemMeta(x.p);
    const waiting = s0 === 'done' && !rise.has(x.i) && !isBuilt(profileKey(x.p));
    const s = waiting ? 'open' : s0;
    const label = `${pnameT(x.p)}: ${s0 === 'done' ? t(`${P}_done`) : s === 'locked' ? t('v6_locked') : s === 'prog' ? t('v6_in_progress', { pct: st(x).pct }) : t(`${P}_ready`)}`;
    const art = isObs ? star(m, s, st(x).pct) : island(m, s, st(x).pct);
    return (
      <g key={x.i} className={'plot wp st-' + s + (rise.has(x.i) ? ' rise' : '') + (x === nextItem ? ' is-next' : '')} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}
        role="button" tabIndex={0} aria-label={label} onClick={(e) => click(x, e)} onKeyDown={key(x)} data-snd={s === 'locked' ? 'lock' : s === 'done' ? 'none' : 'open'}>
        <title>{label}</title>
        <circle className="wp-hit" r={isObs ? 26 : 44} />
        <g className="plot-art" dangerouslySetInnerHTML={{ __html: art }} />
        {rise.has(x.i) && (isObs
          ? <g className="ob-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, k) => <line key={k} x1="0" y1="-14" x2="0" y2="-40" transform={`rotate(${k * 45})`} />)}</g>
          : <g className="is-splash" aria-hidden="true"><circle cx="-30" cy="0" r="6" /><circle cx="0" cy="4" r="8" /><circle cx="30" cy="0" r="6" /></g>)}
      </g>
    );
  };

  /* observatory: constellation lines between completed stars of the same group (about-you joins the dome) */
  const lines = [];
  if (isObs) {
    const groups = new Map();
    items.forEach((x) => { const p = pos.get(x.i); if (!p) return; const g = groups.get(p.g) || []; g.push(x); groups.set(p.g, g); });
    groups.forEach((g) => {
      for (let k = 1; k < g.length; k++) {
        const a = g[k - 1], b = g[k], pa = pos.get(a.i), pb = pos.get(b.i), on = st(a).st === 'done' && st(b).st === 'done';
        lines.push(<line key={a.i + '-' + b.i} className={'ob-line' + (on ? ' on' : '') + (on && (rise.has(a.i) || rise.has(b.i)) ? ' draw' : '')} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} pathLength="1" />);
      }
    });
  }
  const isPts = !isObs ? items.map((x) => pos.get(x.i)).filter(Boolean) : [];
  const boat = !isObs && nextItem && pos.get(nextItem.i);
  const order = items.slice().sort((a, b) => (pos.get(a.i)?.y || 0) - (pos.get(b.i)?.y || 0));

  return (
    <section className={'kd kd--' + kind} id="kingdom" ref={wrap} aria-labelledby="kd-h">
      <div className="kd-head">
        <div>
          <p className="kd-eyebrow"><span aria-hidden="true">{lv.e}</span>{t(lv.key)}</p>
          <h2 id="kd-h" className="kd-h">{name ? t(`${P}_named`, { name }) : t(`${P}_title`)}</h2>
          <p className="kd-sub">{t(`${P}_sub`)}</p>
        </div>
        <div className="kd-lv" role="img" aria-label={t('v6_lv_aria', { lv: t(lv.key), n: lv.toNext, next: t(lvNext.key) })}>
          <div className="kd-stones">{Array.from({ length: 10 }, (_, i) => { const f = total ? Math.max(done ? 1 : 0, Math.round((done / total) * 10)) : 0; return <i key={i} className={i < f ? 'on' : ''} style={{ '--i': i }} />; })}</div>
          <small>{lv.k === W.levels.length - 1 ? t(`${P}_max`) : t('v6_lv_next', { n: lv.toNext, next: t(lvNext.key) })}</small>
        </div>
      </div>

      <div className="kd-body">
        <div className="kd-scene" ref={scene} tabIndex={-1}>
          <svg className="kd-svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="group" aria-label={t(`${P}_aria`, { done, total })}>
            {isObs ? <ObsBackdrop wonders={wonders} /> : <IslBackdrop wonders={wonders} />}
            {isObs && <g className="ob-lines">{lines}</g>}
            {!isObs && isPts.length > 1 && <path className="is-route" d={route(isPts)} />}
            {boat && (
              <g className="is-boat" transform={`translate(${boat.x - 64 * boat.s} ${boat.y + 6}) scale(${boat.s})`} aria-hidden="true">
                <g className="is-bob"><path d="M-22 0h44l-8 12h-28z" fill="#8a4b20" /><rect x="-1" y="-40" width="2.4" height="40" fill="#5b3a1e" /><path d="M2 -38l22 30h-22z" fill="#fff" /><path d="M-2 -32l-16 24h16z" fill="#ffd2a1" /><path d="M2 -40l10 4 -10 4z" fill="#e5484d" /></g>
              </g>
            )}
            <g className="plots">{order.map(plot)}</g>
            {isObs && <g transform="translate(600 548)" className="ob-dome" dangerouslySetInnerHTML={{ __html: dome(wonders.has('gold')) }} />}
            {isObs && wonders.has('beacon') && <path className="wonder ob-beacon" d="M590 400L600 300L610 400z" />}
          </svg>
          {tip && (
            <div className="kd-tip" role="status" style={{ left: tip.left, top: tip.top }} onClick={() => setTip(null)}>
              <b>{pnameT(tip.x.p)}</b><span>{t(`${P}_tip`)}</span><span className="kd-tip-r"><i className="mini-coin" />+{nf((tip.x.src && tip.x.src.points) || POINTS_PER_ITEM)}</span>
              <button type="button" className="kd-tip-x" onClick={(e) => { e.stopPropagation(); onOpen(tip.x.i); setTip(null); }}>{t('v6_update_answers')}</button>
            </div>
          )}
          <p className="kd-pan" aria-hidden="true"><span>👆</span>{t(`${P}_pan`)}</p>
        </div>

        <aside className="kd-treasury" aria-label={t('v6_treasury')}>
          <div className="tr-row coins"><span className="tr-coin" aria-hidden="true"><i /></span><div><Odo value={pts} className="big" /><small>{t('v6_pts_long')}</small></div></div>
          <div className="tr-row gems"><span className="tr-gem" aria-hidden="true"><i /></span><div><Odo value={qs} className="big" /><small>{t('v6_qs_long')}</small></div></div>
          <div className="tr-row bld"><span className="tr-e" aria-hidden="true">{W.e}</span><div><b>{nf(done)}<span>/{nf(total)}</span></b><small>{t(W.unit)}</small></div></div>
          {nextMs ? (
            <div className="tr-chest">
              <span className="chest" aria-hidden="true"><span className="lid" />{nextMs.e}</span>
              <div><b>{t(nextMs.key)}</b><small>{t('v6_chest_at', { n: nextMs.pts - pts })}</small>
                <span className="chest-bar" role="progressbar" aria-valuemin="0" aria-valuemax={nextMs.pts} aria-valuenow={pts}><i style={{ '--w': Math.min(100, (pts / nextMs.pts) * 100) + '%' }} /></span></div>
            </div>
          ) : <div className="tr-chest open"><span className="chest" aria-hidden="true">🏆</span><div><b>{t(`${P}_all`)}</b></div></div>}
        </aside>
      </div>

      <div className="kd-seals" role="list" aria-label={t(`${P}_seals`)}>
        {W.seals.map((s) => { const on = s.need(ctx); return <span key={s.k} role="listitem" className={'seal' + (on ? ' on' : '')} title={t(s.k)}><span className="seal-e" aria-hidden="true">{s.e}</span><small>{t(s.k)}</small><span className="sr">{on ? t('v6_seal_on') : t('v6_seal_off')}</span></span>; })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ backdrops */
function ObsBackdrop({ wonders }) {
  return (
    <>
      <defs>
        <linearGradient id="ob-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#060b26" /><stop offset=".55" stopColor="#0d1b4a" /><stop offset="1" stopColor="#14466a" /></linearGradient>
        <radialGradient id="ob-milk" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#8fb4ff" stopOpacity=".28" /><stop offset="1" stopColor="#8fb4ff" stopOpacity="0" /></radialGradient>
        <linearGradient id="ob-aur" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2dd4bf" stopOpacity="0" /><stop offset=".3" stopColor="#2dd4bf" stopOpacity=".55" /><stop offset=".7" stopColor="#a78bfa" stopOpacity=".5" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" /></linearGradient>
        <linearGradient id="ob-sweep" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#5eead4" stopOpacity=".22" /><stop offset="1" stopColor="#5eead4" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width={VW} height={VH} fill="url(#ob-sky)" />
      <ellipse cx="600" cy="210" rx="640" ry="120" fill="url(#ob-milk)" transform="rotate(-12 600 210)" />
      <g className="ob-grid">{[120, 220, 320, 420].map((r) => <ellipse key={r} cx="600" cy="548" rx={r * 1.6} ry={r} />)}{[-60, -30, 0, 30, 60].map((a) => <line key={a} x1="600" y1="548" x2={600 + Math.sin((a * Math.PI) / 180) * 700} y2={548 - Math.cos((a * Math.PI) / 180) * 460} />)}</g>
      <g className="kd-stars ob-stars">{Array.from({ length: 70 }, (_, i) => <circle key={i} cx={(i * 263 + 41) % VW} cy={((i * 137) % 430) + 6} r={i % 6 ? 0.9 : 1.6} style={{ '--d': (i % 9) * 0.35 + 's' }} />)}</g>
      {wonders.has('aurora') && <g className="wonder ob-aurora"><path d="M0 70Q200 20 400 70T800 60T1200 70V120Q1000 80 800 110T400 110T0 120z" fill="url(#ob-aur)" /></g>}
      <g className="ob-sweepw"><path className="ob-sweep" d="M600 548L380 60A520 520 0 0 1 560 30z" fill="url(#ob-sweep)" /></g>
      <g className="ob-shoot"><line x1="0" y1="0" x2="-70" y2="-24" /></g>
      {wonders.has('satellite') && <g className="wonder ob-sat"><g className="ob-sat-in"><rect x="-6" y="-4" width="12" height="8" rx="2" fill="#dbe4ff" /><rect x="-24" y="-3" width="15" height="6" fill="#3b82f6" /><rect x="9" y="-3" width="15" height="6" fill="#3b82f6" /><circle cx="0" cy="-8" r="2" fill="#5eead4" className="blink" /></g></g>}
      {wonders.has('comet') && <g className="wonder ob-comet"><line x1="0" y1="0" x2="-110" y2="-34" /><circle r="5" fill="#fff" /></g>}
      {wonders.has('meteors') && <g className="wonder ob-meteors">{[0, 1, 2, 3].map((k) => <line key={k} className="ob-met" style={{ '--d': k * 0.9 + 's', '--x': 200 + k * 230 + 'px' }} x1="0" y1="0" x2="-60" y2="-22" />)}</g>}
      <path className="ob-city" d="M0 560V488h40v-30h36v22h30v-46h44v40h28v-20h40v34h36v-58h30v30h40v-12h40v26h50v20h60v-30h40V420h40v74h50v-24h38v40h30v-56h46v34h34v-18h40v28h44v-50h36v40h38v-22h40v30h30v-40h40v32h46v68z" />
      <g className="ob-cwin">{Array.from({ length: 36 }, (_, i) => <rect key={i} x={(i * 97 + 18) % 1180} y={500 + ((i * 13) % 40)} width="4" height="6" style={{ '--d': (i % 6) * 0.5 + 's' }} />)}</g>
    </>
  );
}

function IslBackdrop({ wonders }) {
  return (
    <>
      <defs>
        <linearGradient id="is-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="is-sky0" /><stop offset="1" className="is-sky1" /></linearGradient>
        <linearGradient id="is-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="is-sea0" /><stop offset="1" className="is-sea1" /></linearGradient>
        <radialGradient id="is-sun"><stop offset="0" stopColor="#fff7c9" /><stop offset=".6" stopColor="#ffd56b" /><stop offset="1" stopColor="#ffb020" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={VW} height={VH} fill="url(#is-sky)" />
      <g className="kd-stars">{Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 263) % VW} cy={((i * 97) % 150) + 8} r={i % 5 ? 1.1 : 1.8} style={{ '--d': (i % 7) * 0.4 + 's' }} />)}</g>
      <g className="kd-sun"><circle cx="1040" cy="80" r="62" fill="url(#is-sun)" /><circle cx="1040" cy="80" r="26" className="sun-core" /></g>
      <g className="kd-moon"><circle cx="1040" cy="78" r="24" fill="#f4f1de" /><circle cx="1050" cy="70" r="22" className="moon-cut" /></g>
      {wonders.has('rainbow') && <g className="wonder rainbow" opacity=".7">{['#ff5e5e', '#ffb020', '#ffe14d', '#4cd964', '#36c2ff', '#7c5cff'].map((c, i) => <path key={c} d={`M${300 + i * 8} 196A${300 - i * 8} 150 0 0 1 ${900 - i * 8} 196`} fill="none" stroke={c} strokeWidth="8" />)}</g>}
      <g className="kd-clouds"><g className="cl c1"><ellipse cx="160" cy="70" rx="58" ry="18" /><ellipse cx="200" cy="58" rx="36" ry="20" /></g><g className="cl c2"><ellipse cx="560" cy="50" rx="64" ry="16" /><ellipse cx="600" cy="40" rx="30" ry="16" /></g><g className="cl c3"><ellipse cx="820" cy="110" rx="48" ry="14" /><ellipse cx="850" cy="100" rx="26" ry="14" /></g></g>
      <g className="kd-birds"><path d="M0 0q5 -5 10 0q5 -5 10 0" /><path d="M24 10q4 -4 8 0q4 -4 8 0" /></g>
      {wonders.has('balloon') && <g className="wonder is-balloon"><ellipse cx="300" cy="120" rx="20" ry="24" fill="#ff7ab6" /><path d="M282 126q18 30 36 0" fill="#ffb020" /><path d="M293 146h14l-2 10h-10z" fill="#8a5a3b" /></g>}
      <rect y="186" width={VW} height={VH - 186} fill="url(#is-sea)" />
      <path className="is-horizon" d="M0 188H1200" />
      {wonders.has('ship') && <g className="wonder is-ship"><path d="M-40 0h80l-12 14h-56z" fill="#5b3a1e" /><rect x="-2" y="-46" width="3" height="46" fill="#3b2412" /><path d="M2 -44q22 18 0 38z" fill="#fff" /><path d="M-2 -40q-18 16 0 32z" fill="#f1e4c8" /><path d="M1 -46l12 4 -12 4z" fill="#111" /></g>}
      <g className="is-waves">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${(i * 211) % 1150} ${220 + ((i * 53) % 320)}q10 -6 20 0t20 0`} style={{ '--d': (i % 5) * 0.6 + 's' }} />)}</g>
      {wonders.has('whale') && <g className="wonder is-whale" transform="translate(1010 300)"><path d="M-40 0q10 -24 44 -22q30 2 38 22q-40 10 -82 0z" fill="#3d6fb6" /><path d="M42 0l14 -12v20z" fill="#3d6fb6" /><circle cx="-18" cy="-8" r="2.4" fill="#fff" /><g className="is-spout"><path d="M0 -22q-6 -14 -14 -18M0 -22q0 -16 0 -22M0 -22q6 -14 14 -18" stroke="#bfe6ff" strokeWidth="3" fill="none" strokeLinecap="round" /></g></g>}
      {wonders.has('bottle') && <g className="wonder is-bottle" transform="translate(180 330)"><g className="is-bob"><rect x="-6" y="-16" width="12" height="20" rx="4" fill="#7fd6b4" opacity=".85" /><rect x="-3" y="-22" width="6" height="7" fill="#b07a3c" /><rect x="-3" y="-10" width="6" height="8" fill="#fff6d8" /></g></g>}
      {wonders.has('fireworks') && <g className="wonder fw">{[[300, 110, '#ffd23f'], [880, 80, '#ff5e8a'], [620, 60, '#36c2ff']].map(([x, y, c], i) => <g key={i} className="fwb" style={{ '--d': i * 1.3 + 's' }} transform={`translate(${x} ${y})`}>{Array.from({ length: 10 }, (_, k) => <line key={k} x1="0" y1="0" x2="0" y2="-22" stroke={c} strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${k * 36})`} />)}</g>)}</g>}
    </>
  );
}
