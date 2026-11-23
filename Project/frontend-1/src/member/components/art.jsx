// Visual storytelling pieces for the member area (Round 16). Each one shows a real idea with the
// member's real numbers. None of them is decoration only:
//   OpinionLoop      Consumer hero: Opinion -> Survey -> Contribution -> Reward -> Impact
//   InsightPipeline  Professional hero: Responses -> Data -> Analysis -> Insight
//   VoiceConstellation Teen hero: your voice joining many others to become insight
//   Vault            Rewards: a vault door whose dial turns with progress to the payout milestone
//   QualityMeter     Quality score: a calibrated gauge with a needle
//   ReferralWeb      Referrals: you in the middle, each friend a node coloured by stage
//   BrandLoader      branded loading state
//   EmptyArt         small illustrations for empty states, one per section
// Motion is CSS (stops with reduced motion) or SMIL that is only rendered when motion is allowed.
import { useId, useMemo } from 'react';
import { Icon, cx, prefersReducedMotion } from './ui.jsx';
import { fmt } from '../i18n/t.js';

const motionOk = () => !prefersReducedMotion();

/* ============================ Consumer: the opinion loop ============================ */
// Five stations on a loop. `stage` is the member's next step (0..4) and glows.
const LOOP_POS = [
  [50, 6],
  [92, 38],
  [76, 90],
  [24, 90],
  [8, 38]
];
export function OpinionLoop({ stations, stage = 0, center }) {
  const gid = useId().replace(/:/g, '');
  // the loop path through the five stations (in a 100x100 box)
  const d = 'M50 6 C78 6 96 20 92 38 C89 60 86 80 76 90 C62 100 38 100 24 90 C14 80 10 60 8 38 C6 20 22 6 50 6 Z';
  return (
    <div className="xa-loop" role="img" aria-label={stations.map((s) => `${s.label}: ${s.value}`).join(', ')}>
      <svg className="xa-loop__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`lg${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--xc-a)" />
            <stop offset="0.5" stopColor="var(--xc-b)" />
            <stop offset="1" stopColor="var(--xc-c)" />
          </linearGradient>
        </defs>
        <path d={d} className="xa-loop__track" />
        <path d={d} className="xa-loop__flow" stroke={`url(#lg${gid})`} />
        {motionOk() &&
          [0, 0.33, 0.66].map((b) => (
            <circle key={b} r="1.4" className="xa-loop__spark">
              <animateMotion dur="7s" repeatCount="indefinite" begin={`${b * 7}s`} path={d} rotate="auto" />
            </circle>
          ))}
      </svg>
      <div className="xa-loop__center">{center}</div>
      {stations.map((s, i) => (
        <div key={s.id} className={cx('xa-loop__node', i === stage && 'is-now', i < stage && 'is-done')} style={{ '--x': `${LOOP_POS[i][0]}%`, '--y': `${LOOP_POS[i][1]}%`, '--i': i }}>
          <span className="xa-loop__orb">
            <Icon name={s.icon} size={20} />
          </span>
          <span className="xa-loop__label">{s.label}</span>
          <span className="xa-loop__value">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================ Professional: insight pipeline ============================ */
// bars: up to 8 real values (points per week). rate: completion rate 0..1.
export function InsightPipeline({ bars = [], responses = 0, rate = 0, labels }) {
  const max = Math.max(1, ...bars);
  const dots = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ x: 8 + ((i * 37) % 84), d: (i * 0.37) % 2.6 })), []);
  return (
    <div className="xa-pipe" role="img" aria-label={`${labels.responses}: ${responses}. ${labels.insight}: ${Math.round(rate * 100)}%`}>
      <div className="xa-pipe__stage">
        <div className="xa-pipe__rain" aria-hidden="true">
          {dots.map((p, i) => (
            <i key={i} style={{ left: `${p.x}%`, animationDelay: `${p.d}s` }} />
          ))}
        </div>
        <p className="xa-pipe__k">{labels.responses}</p>
        <p className="xa-pipe__v">{fmt(responses)}</p>
      </div>
      <span className="xa-pipe__link" aria-hidden="true" />
      <div className="xa-pipe__stage">
        <div className="xa-pipe__bars" aria-hidden="true">
          {(bars.length ? bars : [0, 0, 0, 0, 0, 0]).map((b, i) => (
            <i key={i} style={{ '--h': Math.max(0.06, b / max), '--i': i }} />
          ))}
        </div>
        <p className="xa-pipe__k">{labels.data}</p>
      </div>
      <span className="xa-pipe__link" aria-hidden="true" />
      <div className="xa-pipe__stage">
        <div className="xa-pipe__lens" aria-hidden="true">
          <span className="xa-pipe__scatter">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} style={{ left: `${10 + ((i * 29) % 80)}%`, top: `${12 + ((i * 47) % 70)}%` }} />
            ))}
          </span>
          <span className="xa-pipe__glass" />
        </div>
        <p className="xa-pipe__k">{labels.analysis}</p>
      </div>
      <span className="xa-pipe__link" aria-hidden="true" />
      <div className="xa-pipe__stage xa-pipe__stage--insight">
        <div className="xa-pipe__insight">
          <span className="xa-pipe__big">{Math.round(rate * 100)}%</span>
          <span className="xa-pipe__small">{labels.rate}</span>
        </div>
        <p className="xa-pipe__k">{labels.insight}</p>
      </div>
    </div>
  );
}

/* ============================ Teen: voice constellation ============================ */
export function VoiceConstellation({ voices = 0, label }) {
  // fixed, pleasant star positions; the member is the bright centre
  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.4;
        const r = 22 + ((i * 13) % 22);
        return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r * 0.78, s: 0.6 + ((i * 7) % 10) / 10, d: (i % 7) * 0.5 };
      }),
    []
  );
  const lit = Math.min(stars.length, Math.max(3, voices));
  return (
    <div className="xa-const" role="img" aria-label={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {stars.slice(0, lit).map((s, i) => (
          <line key={`l${i}`} x1="50" y1="50" x2={s.x} y2={s.y} className="xa-const__line" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} className={cx('xa-const__star', i < lit && 'is-lit')} style={{ animationDelay: `${s.d}s` }} />
        ))}
        <circle cx="50" cy="50" r="9" className="xa-const__halo" />
        <circle cx="50" cy="50" r="4.2" className="xa-const__you" />
      </svg>
      <span className="xa-const__tag xa-const__tag--you">
        <Icon name="megaphone" size={14} /> You
      </span>
    </div>
  );
}

/* ============================ Rewards: vault ============================ */
export function Vault({ pct = 0, open = false, children }) {
  const p = Math.max(0, Math.min(1, pct));
  return (
    <div className={cx('xa-vault', open && 'is-open')} style={{ '--p': p }}>
      <svg className="xa-vault__ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="56" className="xa-vault__track" />
        <circle cx="60" cy="60" r="56" className="xa-vault__fill" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
      </svg>
      <div className="xa-vault__door" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="xa-vault__bolt" style={{ '--a': `${i * 45}deg` }} />
        ))}
        <span className="xa-vault__dial">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ '--a': `${i * 30}deg` }} />
          ))}
        </span>
      </div>
      <div className="xa-vault__center">{children}</div>
      {open && (
        <span className="xa-vault__coins" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </span>
      )}
    </div>
  );
}

/* ============================ Quality: meter ============================ */
export function QualityMeter({ score = 0, scale = 200, tier, children }) {
  const p = Math.max(0, Math.min(1, scale ? score / scale : 0));
  const angle = -90 + p * 180;
  // bands follow the tier thresholds in data/MemberData.jsx (0.3, 0.5, 0.75, 0.9)
  const bands = [
    [0, 0.3, 'low'],
    [0.3, 0.5, 'fair'],
    [0.5, 0.75, 'good'],
    [0.75, 0.9, 'great'],
    [0.9, 1, 'excellent']
  ];
  const arc = (a, b) => {
    const pt = (v) => {
      const t = Math.PI * (1 - v);
      return [100 + Math.cos(t) * 80, 100 - Math.sin(t) * 80];
    };
    const [x1, y1] = pt(a);
    const [x2, y2] = pt(b);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A80 80 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  return (
    <div className={cx('xa-meter', `is-${tier}`)}>
      <svg viewBox="0 0 200 116" aria-hidden="true">
        {bands.map(([a, b, k]) => (
          <path key={k} d={arc(a + 0.006, b - 0.006)} className={cx('xa-meter__band', `is-${k}`, k === tier && 'is-on')} />
        ))}
        {Array.from({ length: 21 }, (_, i) => {
          const t = Math.PI * (1 - i / 20);
          const r1 = i % 5 ? 64 : 60;
          return <line key={i} x1={100 + Math.cos(t) * r1} y1={100 - Math.sin(t) * r1} x2={100 + Math.cos(t) * 68} y2={100 - Math.sin(t) * 68} className="xa-meter__tick" />;
        })}
        <g className="xa-meter__needle" style={{ '--a': `${angle}deg` }}>
          <path d="M100 30 L104 100 L96 100 Z" />
          <circle cx="100" cy="100" r="7" />
        </g>
      </svg>
      <div className="xa-meter__read">{children}</div>
    </div>
  );
}

/* ============================ Referrals: network ============================ */
export function ReferralWeb({ rows = [], label }) {
  const nodes = useMemo(() => {
    const ring = { verified: 26, joined: 36, invited: 45 };
    const list = rows.slice(0, 18);
    return list.map((r, i) => {
      const a = (i / Math.max(list.length, 6)) * Math.PI * 2 - Math.PI / 2;
      const rad = ring[r.status] || 45;
      return { x: 50 + Math.cos(a) * rad, y: 50 + Math.sin(a) * rad * 0.8, s: r.status, n: (r.name || r.email || '?').trim()[0]?.toUpperCase() || '?', i };
    });
  }, [rows]);
  return (
    <div className="xa-web" role="img" aria-label={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="26" ry="20.8" className="xa-web__orbit" />
        <ellipse cx="50" cy="50" rx="36" ry="28.8" className="xa-web__orbit" />
        <ellipse cx="50" cy="50" rx="45" ry="36" className="xa-web__orbit" />
        {nodes.map((n) => (
          <line key={`l${n.i}`} x1="50" y1="50" x2={n.x} y2={n.y} className={cx('xa-web__link', `is-${n.s}`)} style={{ animationDelay: `${n.i * 0.1}s` }} />
        ))}
      </svg>
      {nodes.map((n) => (
        <span key={n.i} className={cx('xa-web__node', `is-${n.s}`)} style={{ left: `${n.x}%`, top: `${n.y}%`, '--i': n.i }}>
          {n.n}
        </span>
      ))}
      <span className="xa-web__you">You</span>
    </div>
  );
}

/* ============================ loader + empty art ============================ */
export function BrandLoader({ label }) {
  return (
    <div className="xa-loader" role="status" aria-live="polite">
      <span className="xa-loader__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <b>T2O</b>
      </span>
      {label && <span className="xa-loader__label">{label}</span>}
    </div>
  );
}

const EMPTY = {
  surveys: (
    <>
      <circle cx="60" cy="60" r="40" className="xe-soft" />
      <circle cx="60" cy="60" r="26" className="xe-ring" />
      <circle cx="60" cy="60" r="12" className="xe-ring" />
      <path d="M60 60 L92 36" className="xe-sweep" />
      <circle cx="82" cy="44" r="4" className="xe-dot" />
    </>
  ),
  rewards: (
    <>
      <rect x="26" y="30" width="68" height="60" rx="12" className="xe-soft" />
      <circle cx="60" cy="60" r="18" className="xe-ring" />
      <path d="M60 46 V60 L70 66" className="xe-line" />
      <rect x="34" y="88" width="10" height="8" rx="2" className="xe-line" />
      <rect x="76" y="88" width="10" height="8" rx="2" className="xe-line" />
    </>
  ),
  referrals: (
    <>
      <circle cx="60" cy="60" r="12" className="xe-dot" />
      <circle cx="60" cy="60" r="34" className="xe-ring xe-dashed" />
      <circle cx="94" cy="60" r="6" className="xe-soft" />
      <circle cx="33" cy="40" r="6" className="xe-soft" />
      <circle cx="40" cy="88" r="6" className="xe-soft" />
    </>
  ),
  activity: (
    <>
      <path d="M24 40 H96 M24 60 H80 M24 80 H88" className="xe-line xe-dashed" />
      <circle cx="24" cy="40" r="5" className="xe-dot" />
      <circle cx="24" cy="60" r="5" className="xe-soft" />
      <circle cx="24" cy="80" r="5" className="xe-soft" />
    </>
  ),
  history: (
    <>
      <path d="M22 92 H98 M22 92 V24" className="xe-line" />
      <path d="M26 80 C44 78 52 60 64 62 C78 64 82 44 96 40" className="xe-line xe-dashed" />
      <circle cx="96" cy="40" r="5" className="xe-dot" />
    </>
  ),
  profile: (
    <>
      <circle cx="60" cy="48" r="16" className="xe-soft" />
      <path d="M32 94 C34 74 86 74 88 94" className="xe-soft" />
      <circle cx="60" cy="60" r="44" className="xe-ring xe-dashed" />
    </>
  )
};
export function EmptyArt({ kind = 'surveys' }) {
  return (
    <svg className="xe-art" viewBox="0 0 120 120" aria-hidden="true">
      {EMPTY[kind] || EMPTY.surveys}
    </svg>
  );
}
