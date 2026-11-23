// Round 24 · a dashboard window onto the member's reward world (the full world is on /member/profiles/#kingdom):
//   Consumer  Opinion Kingdom      a little skyline of houses, one per profile, lit when complete
//   Pro       Insight Observatory  a strip of stars, one per profile, lit when complete
//   Teen      Quest Islands        a row of islands, one per profile, with a palm when complete
// Real data only: completed profiles from the profile list, points from /me/points, quality from /me.
import { useMemo } from 'react';
import { useDash } from './Sections.jsx';
import { Button } from './ui.jsx';
import { fmt } from '../i18n/t.js';
import { t as wt } from '../v6/i18n/index.js';
import { worldIdFor } from '../v6/lib/world.js';
import { ROUTES } from '../config/memberTypes.js';

const TEXT = {
  kingdom: { title: 'v6_kingdom_named', unit: 'v6_buildings', see: 'v6_see_kingdom', sub: 'v6_kingdom_sub', e: '🏰' },
  observatory: { title: 'w_obs_named', unit: 'w_obs_unit', see: 'w_obs_see', sub: 'w_obs_sub', e: '🔭' },
  islands: { title: 'w_isl_named', unit: 'w_isl_unit', see: 'w_isl_see', sub: 'w_isl_sub', e: '🏝️' }
};
const MAX = 24;

/** where mark i of n sits in the 300×150 picture */
function spot(kind, i, n) {
  const rows = kind === 'islands' ? 3 : 2, cols = Math.max(1, Math.ceil(n / rows)), r = Math.floor(i / cols), c = i % cols;
  const x = 22 + ((c + (r % 2) * 0.5) * 256) / Math.max(1, cols - 0.5);
  if (kind === 'observatory') return { x, y: 34 + r * 52 + ((i * 37) % 3) * 9, s: 1 };
  if (kind === 'islands') return { x, y: 74 + r * 28, s: 0.7 + r * 0.17 };
  return { x, y: 112 + r * 24, s: 0.75 + r * 0.25 };
}

function Mark({ kind, on, i, n }) {
  const { x, y, s } = spot(kind, i, n);
  const st = { '--i': i };
  let art;
  if (kind === 'observatory')
    art = on ? (
      <><circle r="11" className="wt-halo" /><path d="M0 -10C1.2 -2.5 2.5 -1.2 10 0C2.5 1.2 1.2 2.5 0 10C-1.2 2.5 -2.5 1.2 -10 0C-2.5 -1.2 -1.2 -2.5 0 -10Z" fill="#fff" /></>
    ) : (
      <circle r="2.2" fill="rgb(200 215 255 / .6)" />
    );
  else if (kind === 'islands')
    art = (
      <>
        <ellipse rx="15" ry="4.5" fill={on ? '#ffd98a' : '#e4dcc2'} opacity={on ? 1 : 0.7} />
        {on && <><path d="M-10 -1c3 -5 7 -7 10 -7s7 2 10 7z" fill="#3ccf7e" /><path d="M0 -4c-1 -6 0 -11 3 -15" stroke="#9a6533" strokeWidth="2" fill="none" /><path d="M3 -19c-5 -3 -9 -1 -11 2c4 -2 7 -2 11 -2zM3 -19c4 -4 9 -4 11 0c-4 -1 -7 -1 -11 0z" fill="#1fae5b" /></>}
      </>
    );
  else
    art = (
      <>
        <path d={`M-9 0v-${on ? 18 : 10}h18v${on ? 18 : 10}z`} fill={on ? '#ffe1a6' : 'rgb(255 255 255 / .45)'} />
        <path d={`M-12 -${on ? 18 : 10}L0 -${on ? 30 : 18}L12 -${on ? 18 : 10}z`} fill={on ? '#ff7a59' : 'rgb(255 255 255 / .4)'} />
        {on && <rect x="-3" y="-12" width="6" height="6" rx="1" fill="#ffd86b" className="wt-win" />}
      </>
    );
  return (
    <g transform={`translate(${x.toFixed(1)} ${y}) scale(${s})`}>
      <g className={'wt-m' + (on ? ' is-on' : '')} style={st}>{art}</g>
    </g>
  );
}

export default function WorldTeaser() {
  const d = useDash();
  const kind = worldIdFor(d.me.type);
  const T = TEXT[kind];
  const list = d.allProfiles || [];
  const done = list.filter((p) => (p.completion || 0) >= 100).length;
  const total = list.length;
  const marks = useMemo(() => {
    const n = Math.min(MAX, total);
    // keep the lit share true to the real count when there are more profiles than marks
    const lit = total ? Math.round((done / total) * n) : 0;
    // spread the lit ones through the picture so progress reads at a glance
    return Array.from({ length: n }, (_, i) => Math.floor(((i + 1) * lit) / n) > Math.floor((i * lit) / n));
  }, [done, total]);
  if (!d.allProfiles) return <div className="wt wt--skel" aria-hidden="true" />;
  const name = d.me.firstName || '';
  return (
    <section className={`wt wt--${kind}`} aria-labelledby="wt-h">
      <div className="wt-art" aria-hidden="true">
        <svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice">
          {kind === 'observatory' && <g className="wt-bgstars">{Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 151) % 300} cy={(i * 47) % 150} r={i % 4 ? 0.8 : 1.4} />)}</g>}
          {kind === 'islands' && <path className="wt-sea" d="M0 70H300V150H0z" />}
          {kind === 'kingdom' && <path className="wt-hill" d="M0 118Q80 96 150 108T300 110V150H0z" />}
          {kind === 'observatory' && <path className="wt-link" d={marks.map((on, i) => [on, spot(kind, i, marks.length)]).filter(([on]) => on).map(([, p], k) => `${k ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y}`).join(' ')} />}
          {marks.map((on, i) => <Mark key={i} kind={kind} on={on} i={i} n={marks.length} />)}
        </svg>
      </div>
      <div className="wt-text">
        <p className="wt-eyebrow"><span aria-hidden="true">{T.e}</span> {wt(T.unit)}: {done}/{total}</p>
        <h2 id="wt-h" className="wt-h">{wt(T.title, { name: name || '—' })}</h2>
        <p className="wt-sub">{wt(T.sub)}</p>
        <div className="wt-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={`${wt(T.unit)} ${done} / ${total}`}><i style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
        <div className="wt-row">
          <span className="wt-pill wt-pill--pts"><i aria-hidden="true" />{d.points ? fmt(d.points.total) : '…'} <small>{wt('v6_pts')}</small></span>
          <span className="wt-pill wt-pill--qs"><i aria-hidden="true" />{fmt(d.me.quality?.score ?? 0)} <small>{wt('v6_qs')}</small></span>
          <Button to={`${ROUTES.profiles.path}#kingdom`} size="sm" iconEnd="arrow" className="wt-cta">{wt(T.see)}</Button>
        </div>
      </div>
    </section>
  );
}
