// "Your Opinion Kingdom": every completed profile and survey raises a building.
// Counts come from existing data only: completed profiles (POST /api/v1/profile status = 100)
// plus completed surveys (GET /api/v1/me/statistics complete). Stages and milestones are display rules.
import { t, tn, fmt } from '../i18n/t.js';
import { aboutYou } from '../data/MemberData.jsx';
import { Icon, cx } from './ui.jsx';

export const STAGES = [
  ['campsite', 0],
  ['hamlet', 1],
  ['village', 5],
  ['town', 10],
  ['city', 25],
  ['kingdom', 50]
];
export const FLAG_POINTS = 50;

export function kingdomState({ profiles = [], stats, points }) {
  const about = aboutYou(profiles);
  const profilesDone = profiles.filter((p) => p.completion >= 100).length;
  const surveysDone = stats?.complete || 0;
  const built = profilesDone + surveysDone;
  let si = 0;
  STAGES.forEach(([, min], i) => {
    if (built >= min) si = i;
  });
  const next = STAGES[si + 1];
  const from = STAGES[si][1];
  const toNext = next ? next[1] - built : 0;
  const pips = next ? Math.round(((built - from) / (next[1] - from)) * 10) : 10;
  const basic = about[0];
  const aboutDone = about.length > 0 && about.every((p) => p.completion >= 100);
  const pts = points?.total || 0;
  const milestones = [
    ['stone', profiles.some((p) => p.started), 'pin'],
    ['castle', !!basic && basic.completion >= 100, 'building'],
    ['about', aboutDone, 'id'],
    ['survey', surveysDone > 0, 'clipboard'],
    ['b5', built >= 5, 'home'],
    ['b10', built >= 10, 'layers'],
    ['monarch', built >= 25, 'trophy'],
    ['legend', built >= 50, 'sparkles']
  ];
  const overall = about.length ? Math.round(about.reduce((n, p) => n + p.completion, 0) / about.length) : 0;
  return { about, built, stage: STAGES[si][0], next: next?.[0], toNext, pips, founded: milestones[1][1], flag: pts >= FLAG_POINTS, pts, milestones, overall, scaffolds: about.filter((p) => p.completion < 100).length };
}

// building slots around the castle, nearest first (x, ground y, scale)
const SLOTS = [
  [395, 292, 1],
  [605, 292, 1],
  [330, 306, 1.05],
  [670, 306, 1.05],
  [262, 322, 1.1],
  [738, 322, 1.1],
  [430, 334, 1.12],
  [570, 334, 1.12],
  [190, 340, 1.15],
  [810, 340, 1.15],
  [118, 356, 1.2],
  [882, 356, 1.2]
];
const ROOFS = ['#ef5b5b', '#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ec4899'];

function House({ x, y, s, i }) {
  const roof = ROOFS[i % ROOFS.length];
  return (
    <g className="kd-house" transform={`translate(${x} ${y}) scale(${s})`} style={{ '--i': i }}>
      <ellipse cx="0" cy="2" rx="24" ry="5" className="kd-shadow" />
      <rect x="-18" y="-26" width="36" height="28" rx="2" className="kd-wall" />
      <path d={`M-23 -24 L0 -46 L23 -24 Z`} fill={roof} />
      <rect x="-5" y="-14" width="10" height="16" rx="1.5" className="kd-door" />
      <rect x="-14" y="-20" width="7" height="7" rx="1" className="kd-win" />
      <rect x="7" y="-20" width="7" height="7" rx="1" className="kd-win" />
    </g>
  );
}
function Scaffold({ x, y, s, i }) {
  return (
    <g className="kd-scaffold" transform={`translate(${x} ${y}) scale(${s})`} style={{ '--i': i }}>
      <ellipse cx="0" cy="2" rx="22" ry="4" className="kd-shadow" />
      <rect x="-16" y="-30" width="32" height="32" className="kd-frame" />
      <path d="M-16 -14 H16 M-16 2 L16 -30 M16 2 L-16 -30" className="kd-frame" />
      <path d="M12 -30 V-52 M2 -50 H30 M26 -50 V-38" className="kd-crane" />
      <rect x="22" y="-38" width="8" height="6" className="kd-load" />
    </g>
  );
}
function Tent({ x, y, c }) {
  return (
    <g transform={`translate(${x} ${y})`} className="kd-tent">
      <ellipse cx="0" cy="2" rx="22" ry="4" className="kd-shadow" />
      <path d="M-20 2 L0 -28 L20 2 Z" fill={c} />
      <path d="M-4 2 L0 -10 L4 2 Z" className="kd-door" />
    </g>
  );
}

/** The illustrated scene. Decorative: the numbers beside it carry the meaning. */
export function KingdomScene({ k, compact }) {
  const houses = Math.min(k.built, SLOTS.length);
  const scaffolds = Math.min(k.scaffolds, SLOTS.length - houses);
  return (
    <div className={cx('kd-scene', compact && 'is-compact')} aria-hidden="true">
      <svg viewBox="0 0 1000 440" preserveAspectRatio="xMidYMax slice" role="presentation" focusable="false">
        <defs>
          <linearGradient id="kd-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--kd-sky-a)' }} />
            <stop offset="1" style={{ stopColor: 'var(--kd-sky-b)' }} />
          </linearGradient>
          <radialGradient id="kd-glow">
            <stop offset="0.35" style={{ stopColor: 'var(--kd-sun)', stopOpacity: 0.9 }} />
            <stop offset="1" style={{ stopColor: 'var(--kd-sun)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <rect width="1000" height="440" fill="url(#kd-sky)" />
        <g className="kd-stars">
          {[
            [80, 60],
            [180, 110],
            [260, 40],
            [420, 80],
            [560, 50],
            [640, 120],
            [720, 70],
            [930, 150],
            [350, 150],
            [120, 170]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} style={{ '--i': i }} />
          ))}
        </g>
        <g className="kd-sun">
          <circle cx="840" cy="96" r="96" fill="url(#kd-glow)" />
          <circle cx="840" cy="96" r="42" className="kd-sun__disc" />
        </g>
        <g className="kd-clouds">
          <g className="kd-cloud" style={{ '--d': '46s' }}>
            <ellipse cx="170" cy="120" rx="58" ry="16" />
            <ellipse cx="205" cy="108" rx="34" ry="16" />
          </g>
          <g className="kd-cloud" style={{ '--d': '60s', '--o': '-20s' }}>
            <ellipse cx="420" cy="80" rx="44" ry="12" />
            <ellipse cx="445" cy="70" rx="26" ry="12" />
          </g>
          <g className="kd-cloud" style={{ '--d': '52s', '--o': '-8s' }}>
            <ellipse cx="640" cy="150" rx="40" ry="11" />
            <ellipse cx="660" cy="141" rx="22" ry="10" />
          </g>
        </g>
        <path className="kd-mtn" d="M0 300 L110 190 L210 262 L340 150 L460 262 L590 160 L700 255 L830 175 L1000 285 V440 H0 Z" />
        <path className="kd-mtn kd-mtn--snow" d="M318 172 L340 150 L362 172 L350 168 L340 176 L330 168 Z M568 182 L590 160 L612 182 L600 178 L590 186 L580 178 Z M810 195 L830 175 L850 195 L840 191 L830 199 L820 191 Z" />
        <path className="kd-hill kd-hill--back" d="M0 292 Q220 236 470 276 T1000 262 V440 H0 Z" />
        <path className="kd-hill kd-hill--front" d="M0 338 Q300 296 560 326 T1000 318 V440 H0 Z" />
        <path className="kd-road" d="M500 300 C478 340 540 372 486 440" />

        {/* castle */}
        <g className={cx('kd-castle', !k.founded && 'is-ghost')} transform="translate(500 296)">
          <ellipse cx="0" cy="2" rx="70" ry="8" className="kd-shadow" />
          <rect x="-46" y="-64" width="92" height="66" className="kd-stone" />
          <rect x="-60" y="-96" width="26" height="98" className="kd-stone" />
          <rect x="34" y="-96" width="26" height="98" className="kd-stone" />
          <rect x="-14" y="-118" width="28" height="56" className="kd-stone" />
          <path d="M-64 -94 L-47 -128 L-30 -94 Z M30 -94 L47 -128 L64 -94 Z M-18 -116 L0 -152 L18 -116 Z" className="kd-cone" />
          <path d="M-12 2 V-22 Q0 -36 12 -22 V2 Z" className="kd-door" />
          <rect x="-52" y="-74" width="10" height="12" rx="5" className="kd-win" />
          <rect x="42" y="-74" width="10" height="12" rx="5" className="kd-win" />
          <rect x="-5" y="-100" width="10" height="13" rx="5" className="kd-win" />
          <path d="M-46 -64 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h6" className="kd-crenel" />
          {k.flag && (
            <g className="kd-flag">
              <path d="M0 -152 V-184" className="kd-pole" />
              <path d="M0 -184 Q14 -190 26 -182 Q14 -176 0 -170 Z" />
            </g>
          )}
        </g>
        {k.built === 0 && (
          <>
            <Tent x={442} y={318} c="#f97316" />
            <Tent x={556} y={322} c="#3b82f6" />
            <Tent x={498} y={330} c="#22c55e" />
          </>
        )}
        {SLOTS.slice(0, houses).map(([x, y, s], i) => (
          <House key={`h${i}`} x={x} y={y} s={s} i={i} />
        ))}
        {SLOTS.slice(houses, houses + scaffolds).map(([x, y, s], i) => (
          <Scaffold key={`s${i}`} x={x} y={y} s={s} i={i} />
        ))}
        <g transform="translate(500 314)" className="kd-pct">
          <rect x="-24" y="-11" width="48" height="22" rx="11" />
          <text x="0" y="5" textAnchor="middle">
            {k.overall}%
          </text>
        </g>
      </svg>
      {k.built > SLOTS.length && <span className="kd-more">+{fmt(k.built - SLOTS.length)}</span>}
    </div>
  );
}

/** Full section for the Profiles page. */
export function Kingdom({ k, me }) {
  return (
    <section className="xs pf-kd" id="kingdom" aria-labelledby="pf-kd-h" tabIndex={-1}>
      <div className="pf-kd__top">
        <div>
          <p className="pf-stage">
            <Icon name="flag" size={14} /> {t(`kd.stage.${k.stage}`)}
          </p>
          <h2 id="pf-kd-h">{t('kd.title')}</h2>
          <p className="pf-kd__sub">{t('kd.sub')}</p>
        </div>
        <div className="pf-kd__next">
          <span className="pf-pips" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} className={cx(i < k.pips && 'is-on')} />
            ))}
          </span>
          <span>{k.next ? tn('kd.toNext', k.toNext, { stage: t(`kd.stage.${k.next}`) }) : t('kd.max')}</span>
        </div>
      </div>
      <div className="pf-kd__body">
        <KingdomScene k={k} />
        <ul className="pf-kd__stats">
          <li className="is-coin">
            <span className="pf-kd__ic" aria-hidden="true">
              <span className="mb-coin" />
            </span>
            <strong>{fmt(k.pts)}</strong>
            <small>{t('kd.points')}</small>
          </li>
          <li className="is-gem">
            <span className="pf-kd__ic" aria-hidden="true">
              <Icon name="spark" size={22} />
            </span>
            <strong>
              {fmt(me.quality.score)}
              <em>/{fmt(me.quality.scale)}</em>
            </strong>
            <small>{t('kd.quality')}</small>
          </li>
          <li className="is-build">
            <span className="pf-kd__ic" aria-hidden="true">
              <Icon name="building" size={22} />
            </span>
            <strong>
              {fmt(k.built)}
              <em>/{fmt(k.next ? k.built + k.toNext : k.built)}</em>
            </strong>
            <small>{t('kd.buildings')}</small>
          </li>
          <li className={cx('is-flag', k.flag && 'is-won')}>
            <span className="pf-kd__ic" aria-hidden="true">
              <Icon name={k.flag ? 'flag' : 'lock'} size={20} />
            </span>
            <strong>{t('kd.flag')}</strong>
            <small>{k.flag ? t('kd.flag.won') : tn('kd.flag.left', Math.max(0, FLAG_POINTS - k.pts))}</small>
            {!k.flag && (
              <span className="pf-kd__meter" aria-hidden="true">
                <i style={{ width: `${Math.min(100, (k.pts / FLAG_POINTS) * 100)}%` }} />
              </span>
            )}
          </li>
        </ul>
      </div>
      <ol className="pf-ms" aria-label={t('kd.milestones')}>
        {k.milestones.map(([id, won, icon]) => (
          <li key={id} className={cx(won && 'is-won')}>
            <span className="pf-ms__badge" aria-hidden="true">
              <Icon name={won ? icon : 'lock'} size={18} />
            </span>
            <span className="pf-ms__name">{t(`kd.ms.${id}`)}</span>
            <span className="mb-sr">{won ? t('kd.ms.won') : t('kd.ms.locked')}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
