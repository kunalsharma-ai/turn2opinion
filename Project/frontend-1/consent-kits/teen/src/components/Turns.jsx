// The "Two Turns" graphics (all inline SVG, transform / stroke-offset animations only):
//   TurnRing   the activation ring — two arc halves with arrowheads, echoing the Turn2Opinion swirl. The right arc
//              is the parent's / guardian's turn, the left arc the teen's own turn; the centre counts the turns.
//              The account opens only when both arcs are complete (Part E of the agreement).
//   MiniTurn   the small check that draws itself inside every tap-to-agree tile
//   TurnBar    a short segmented bar under Part B and Part C: one segment per step completed
import { memo, useId } from 'react';
import { useI18n } from '../i18n/I18n.jsx';

const C = 100;
const R = 78;
export const pt = (deg) => { const a = (deg * Math.PI) / 180; return [C + R * Math.sin(a), C - R * Math.cos(a)]; };
export const arc = (from, to) => { const [x1, y1] = pt(from); const [x2, y2] = pt(to); return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`; };
export const PARENT = [12, 168];
export const TEEN = [192, 348];

function Head({ at, cls }) {
  const [x, y] = pt(at);
  return <path className={`tr-head ${cls}`} d="M-3 -11L13 0L-3 11Z" transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${at})`} />;
}

//   parent: 'wait' | 'ready' | 'verifying' | 'turned'      teen: 'wait' | 'turned' | 'no'
function TurnRing({ parent = 'wait', teen = 'wait', open = false, size = 1, label = true }) {
  const { t } = useI18n();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pState = parent === 'turned' ? 'turned' : parent === 'verifying' ? 'verifying' : parent === 'ready' ? 'ready' : 'wait';
  const tState = teen;
  const pLabel = pState === 'turned' ? t('lock_turned') : pState === 'verifying' ? t('lock_verifying') : pState === 'ready' ? t('lock_ready') : teen === 'no' ? '—' : t('lock_wait');
  const tLabel = tState === 'turned' ? t('lock_turned') : tState === 'no' ? t('no') : t('lock_wait');
  const summary = `${t('lock_title')}: ${open ? t('lock_open') : t('lock_locked')} — ${t('lock_parent')}: ${pLabel}, ${t('lock_teen')}: ${tLabel}`;
  const n = (pState === 'wait' ? 0 : 1) + (tState === 'turned' ? 1 : 0);
  const pFill = pState === 'wait' ? 0 : 100;
  const tFill = tState === 'turned' ? 100 : 0;
  return (
    <div className={`tr ${open ? 'is-open' : ''}`} style={{ '--s': size }} role="img" aria-label={summary}>
      <svg className="tr-svg" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`tp-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f5bff" /><stop offset="1" stopColor="#52c8ff" /></linearGradient>
          <linearGradient id={`tt-${uid}`} x1="1" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#12b6e8" /><stop offset="1" stopColor="#7be3d0" /></linearGradient>
        </defs>
        <circle className="tr-halo" cx={C} cy={C} r="96" />
        <circle className="tr-disc" cx={C} cy={C} r="64" />
        <path className="tr-track" d={arc(...PARENT)} />
        <path className="tr-track" d={arc(...TEEN)} />
        <path className={`tr-fill tr-fill-p is-${pState}`} d={arc(...PARENT)} pathLength="100" stroke={`url(#tp-${uid})`} style={{ strokeDashoffset: 100 - pFill }} />
        <path className={`tr-fill tr-fill-t is-${tState}`} d={arc(...TEEN)} pathLength="100" stroke={`url(#tt-${uid})`} style={{ strokeDashoffset: 100 - tFill }} />
        <Head at={PARENT[1]} cls={`tr-head-p is-${pState}`} />
        <Head at={TEEN[1]} cls={`tr-head-t is-${tState}`} />
        {open ? (
          <path className="tr-ok" d="M78 102l15 15 30-33" />
        ) : (
          <g className="tr-count">
            <text x={C} y="112" textAnchor="middle" className="tr-n">{n}</text>
            <text x={C} y="132" textAnchor="middle" className="tr-of">/ 2</text>
          </g>
        )}
      </svg>
      {label ? (
        <div className="tr-legend" aria-hidden="true">
          <span className={`tr-tag tr-tag-p is-${pState}`}><b>{t('lock_parent')}</b><small>{pLabel}</small></span>
          <span className={`tr-tag tr-tag-t is-${tState}`}><b>{t('lock_teen')}</b><small>{tLabel}</small></span>
        </div>
      ) : null}
    </div>
  );
}
export const Ring = memo(TurnRing);

/** The check that draws itself inside a tap-to-agree tile. */
export const MiniTurn = memo(function MiniTurn({ open, size = 18 }) {
  return (
    <svg className={`mi ${open ? 'is-open' : ''}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <circle className="mi-c" cx="12" cy="12" r="10" />
      <path className="mi-k" d="M7.2 12.6l3.2 3.2 6.4-7" />
    </svg>
  );
});

/** A short segmented bar: one segment per step completed. `turned` = every segment lit. */
export const TurnBar = memo(function TurnBar({ teeth, tone = 'parent', turned = false, label, status }) {
  return (
    <div className={`tb tb-${tone} ${turned ? 'is-turned' : ''}`}>
      <span className="tb-segs" aria-hidden="true">{teeth.map((on, i) => <i key={i} className={on ? 'on' : ''} />)}</span>
      {label ? <span className="tb-l"><b>{label}</b><small>{status}</small></span> : null}
    </div>
  );
});
export default Ring;
