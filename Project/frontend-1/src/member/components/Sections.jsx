// Round 16 building blocks shared by the three dashboards and the section pages.
// Every number comes from an existing section (see data/source.js) or simple arithmetic on it.
// Each block owns its loading, empty and error state, drawn in the section's own style.
import { useMemo, useState } from 'react';
import { aboutYou, useMe, useSection, profileCompletion, qualityTier } from '../data/MemberData.jsx';
import { ABOUT_YOU, ROUTES, profileLink, surveyLink } from '../config/memberTypes.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Button, Counter, Icon, MLink, Skeleton, cx } from './ui.jsx';
import { EmptyArt, QualityMeter, Vault } from './art.jsx';

/* ------------------------------------------------------------------ data */
const WEEK = 7 * 864e5;
/** Everything the dashboards derive, in one place. */
export function useDash() {
  const me = useMe();
  const [points, pStatus] = useSection('points');
  const [stats, stStatus] = useSection('stats');
  const [surveys, sStatus, sRetry] = useSection('surveys');
  const [allProfiles, prStatus, prRetry] = useSection('profiles');
  const profiles = useMemo(() => (allProfiles ? aboutYou(allProfiles) : allProfiles), [allProfiles]);
  const [activity, aStatus, aRetry] = useSection('activity');
  const [refs, rStatus] = useSection('referrals');
  const pc = profileCompletion(allProfiles);
  const tier = qualityTier(me.quality.score, me.quality.scale);
  const rate = stats && stats.total ? stats.complete / stats.total : 0;
  // points per week for the last 8 weeks, oldest first (from completed responses)
  const weeks = useMemo(() => {
    const out = Array(8).fill(0);
    const now = Date.now();
    (activity || []).forEach((a) => {
      const w = Math.floor((now - new Date(a.date || 0).getTime()) / WEEK);
      if (w >= 0 && w < 8) out[7 - w] += a.points || 0;
    });
    return out;
  }, [activity]);
  // the member's next step in the journey: 0 profile, 1 survey, 2 earn, 3 quality, 4 impact
  const stage = !pc || pc.percent < 100 ? 0 : surveys?.length ? 1 : points && points.total < points.threshold ? 2 : tier !== 'excellent' ? 3 : 4;
  return { me, points, pStatus, stats, stStatus, surveys, sStatus, sRetry, profiles, allProfiles, prStatus, prRetry, activity, aStatus, aRetry, refs, rStatus, pc, tier, rate, weeks, stage };
}

/* ------------------------------------------------------------------ categories */
const CATS = [
  [/food|snack|grocer|beverage|drink/i, 'cup', 'sun'],
  [/media|stream|entertain|music|video/i, 'play', 'rose'],
  [/beauty|personal|skin/i, 'sparkles', 'pink'],
  [/travel|tour|auto|car|scooter/i, 'plane', 'sky'],
  [/bank|financ|insur|money/i, 'bank', 'mint'],
  [/tech|it\b|software|cloud|cyber/i, 'chip', 'sky'],
  [/operat|procure|supply|logist/i, 'truck', 'amber'],
  [/hr|workplace|people|hiring/i, 'users', 'violet'],
  [/gam/i, 'game', 'violet'],
  [/educat|learn|school/i, 'cap', 'mint'],
  [/health|fitness|sport/i, 'heart', 'rose']
];
export function catArt(category) {
  const hit = CATS.find(([re]) => re.test(category || ''));
  return { icon: hit ? hit[1] : 'clipboard', hue: hit ? hit[2] : 'sky' };
}
const isNew = (s) => Date.now() - new Date(s.createdAt || 0) < 2 * 864e5;

/* ------------------------------------------------------------------ small parts */
/** Section header with an icon tile in the section's own accent. */
export function XHead({ icon, eyebrow, title, sub, action, id, as: H = 'h2' }) {
  return (
    <header className="xs-head">
      <span className="xs-head__tile" aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <div className="xs-head__text">
        {eyebrow && <p className="xs-head__eyebrow">{eyebrow}</p>}
        <H id={id}>{title}</H>
        {sub && <p className="xs-head__sub">{sub}</p>}
      </div>
      {action && <div className="xs-head__action">{action}</div>}
    </header>
  );
}

/** Branded empty state: a small illustration, a clear sentence and the next step. */
export function XEmpty({ kind, title, children, action, compact }) {
  return (
    <div className={cx('xe', compact && 'xe--compact')}>
      <EmptyArt kind={kind} />
      <p className="xe__title">{title}</p>
      {children && <p className="xe__text">{children}</p>}
      {action}
    </div>
  );
}

export function XError({ text, onRetry }) {
  return (
    <div className="xe xe--error" role="alert">
      <span className="xe__err" aria-hidden="true">
        <Icon name="refresh" size={22} />
      </span>
      <p className="xe__title">{text || t('st8.error')}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" icon="refresh" onClick={onRetry}>
          {t('st8.retry')}
        </Button>
      )}
    </div>
  );
}

/** Shimmer placeholder shaped like the content it stands for. */
export function XSkel({ rows = 3, h = 64 }) {
  return (
    <div className="xk" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <span key={i} className="xk__row" style={{ height: h, '--i': i }} />
      ))}
    </div>
  );
}

export function Sparkline({ values = [], label, height = 64 }) {
  const max = Math.max(1, ...values);
  const n = Math.max(2, values.length);
  const pts = values.map((v, i) => [(i / (n - 1)) * 100, 92 - (v / max) * 80]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return (
    <svg className="xg-spark" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} role="img" aria-label={label}>
      <path d={`${line} L100 100 L0 100 Z`} className="xg-spark__area" />
      <path d={line} className="xg-spark__line" pathLength="100" />
      {pts.length > 0 && <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.6" className="xg-spark__dot" />}
    </svg>
  );
}

export function Donut({ value = 0, size = 112, label, children }) {
  const p = Math.max(0, Math.min(1, value));
  return (
    <div className="xg-donut" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <circle cx="21" cy="21" r="15.9" className="xg-donut__track" />
        <circle cx="21" cy="21" r="15.9" className="xg-donut__fill" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
      </svg>
      <span className="xg-donut__in">{children}</span>
    </div>
  );
}

/** One horizontal bar split into parts: [{ key, value, label }] */
export function StackBar({ parts, label }) {
  const total = parts.reduce((n, p) => n + p.value, 0) || 1;
  return (
    <div className="xg-stack">
      <div className="xg-stack__bar" role="img" aria-label={`${label}: ${parts.map((p) => `${p.label} ${p.value}`).join(', ')}`}>
        {parts.map((p) => p.value > 0 && <span key={p.key} className={`is-${p.key}`} style={{ flexGrow: p.value / total }} />)}
      </div>
      <ul className="xg-stack__legend">
        {parts.map((p) => (
          <li key={p.key} className={`is-${p.key}`}>
            <i aria-hidden="true" />
            {p.label} <strong>{fmt(p.value)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ journey rail */
// "Complete your profile -> Participate -> Earn -> Improve your quality -> Track your impact"
const JOURNEY = [
  ['profiles', 'map', 'jr.profile'],
  ['surveys', 'clipboard', 'jr.survey'],
  ['rewards', 'coin', 'jr.earn'],
  ['quality', 'shield', 'jr.quality'],
  ['activity', 'pulse', 'jr.impact']
];
export function JourneyRail() {
  const d = useDash();
  const values = [
    d.pc ? `${d.pc.percent}%` : '…',
    d.sStatus === 'ready' ? tn('jr.open', d.surveys.length) : '…',
    d.points ? t('hdr.points', { n: fmt(d.points.total) }) : '…',
    t(`q.tier.${d.tier}`),
    d.stats ? tn('jr.done', d.stats.complete) : '…'
  ];
  return (
    <nav className="xj" aria-label={t('jr.title')}>
      <ol>
        {JOURNEY.map(([to, icon, key], i) => (
          <li key={to} className={cx('xj__step', i < d.stage && 'is-done', i === d.stage && 'is-now')} style={{ '--i': i }}>
            <MLink to={to} className="xj__link" aria-current={i === d.stage ? 'step' : undefined}>
              <span className="xj__orb" aria-hidden="true">
                <Icon name={i < d.stage ? 'check' : icon} size={18} strokeWidth={i < d.stage ? 3 : 2} />
              </span>
              <span className="xj__k">{t(key)}</span>
              <span className="xj__v">{values[i]}</span>
            </MLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ profile journey */
// Three ways to show the same About-you profiles:
//   road    (Consumer) a winding road with a stop per profile
//   dossier (Professional) a research dossier with completeness bars and expertise answers
//   quests  (Teen) quest cards with XP
export function ProfileJourney({ variant = 'road' }) {
  const d = useDash();
  const list = d.profiles || [];
  const next = list.find((p) => p.completion < 100);
  const unlock = !d.pc || d.pc.percent < 100 ? t(`pj.unlock.${variant}`) : t('pj.unlocked');
  const body =
    d.prStatus === 'error' ? (
      <XError text={t('pj.err')} onRetry={d.prRetry} />
    ) : !d.profiles ? (
      <XSkel rows={variant === 'quests' ? 1 : 2} h={variant === 'quests' ? 132 : 58} />
    ) : !list.length ? (
      <XEmpty kind="profile" title={t('pc.empty')} action={<Button to="profiles" size="sm" iconEnd="arrow">{t('pc.open')}</Button>} />
    ) : variant === 'dossier' ? (
      <Dossier list={list} />
    ) : variant === 'quests' ? (
      <Quests list={list} />
    ) : (
      <Road list={list} />
    );
  return (
    <section className={cx('xs xs--profile', `xs--${variant}`)} aria-labelledby="xs-profile">
      <XHead
        id="xs-profile"
        icon={variant === 'dossier' ? 'id' : variant === 'quests' ? 'flag' : 'map'}
        eyebrow={t('pj.eyebrow')}
        title={t(`pj.title.${variant}`)}
        sub={d.pc ? (d.pc.left ? tn('pc.left', d.pc.left) : t('pc.done')) : t('pj.sub')}
        action={
          <Button to={next ? profileLink(next.slug) : 'profiles'} size="sm" variant={next ? 'primary' : 'secondary'} iconEnd="arrow">
            {next ? t('pj.continue', { name: next.name }) : t('pc.open')}
          </Button>
        }
      />
      <div className="xs-why">
        <p>
          <Icon name="target" size={16} /> <strong>{t('pj.why')}</strong> {t(`pj.why.${variant}`)}
        </p>
        <p>
          <Icon name="lock" size={16} /> <strong>{t('pj.unlocks')}</strong> {unlock}
        </p>
      </div>
      {body}
    </section>
  );
}

function Road({ list }) {
  const firstOpen = list.findIndex((p) => p.completion < 100);
  return (
    <ol className="xr" style={{ '--n': list.length }}>
      <svg className="xr__road" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 10 C12 0 22 20 34 10 S56 0 67 10 S88 20 100 10" />
        <path d="M0 10 C12 0 22 20 34 10 S56 0 67 10 S88 20 100 10" className="xr__dash" />
      </svg>
      {list.map((p, i) => {
        const done = p.completion >= 100;
        return (
          <li key={p.slug} className={cx('xr__stop', done && 'is-done', i === firstOpen && 'is-next')} style={{ '--i': i }}>
            <MLink to={profileLink(p.slug)} className="xr__pin" aria-label={`${p.name}: ${p.completion}%`}>
              <span className="xr__flag" aria-hidden="true">
                {done ? <Icon name="check" size={16} strokeWidth={3} /> : <span>{p.completion}%</span>}
              </span>
            </MLink>
            <span className="xr__name">{p.name}</span>
            <span className="xr__bar" aria-hidden="true">
              <i style={{ width: `${p.completion}%` }} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const PRO_FIELDS = [
  ['industry', 'pro.industry'],
  ['jobrole', 'pro.role'],
  ['add-seniority', 'pro.seniority'],
  ['orgsize', 'pro.orgsize']
];
function Dossier({ list }) {
  const [ans] = useSection('answers');
  const d = useDash();
  return (
    <div className="xdo">
      <div className="xdo__score">
        <Donut value={(d.pc?.percent || 0) / 100} size={120} label={`${t('pj.title.dossier')} ${d.pc?.percent || 0}%`}>
          <strong>
            <Counter value={d.pc?.percent || 0} />%
          </strong>
          <small>{t('pj.complete')}</small>
        </Donut>
      </div>
      <ul className="xdo__rows">
        {list.map((p, i) => (
          <li key={p.slug} className={cx(p.completion >= 100 && 'is-done')} style={{ '--i': i }}>
            <span className="xdo__name">{p.name}</span>
            <span className="xdo__bar" aria-hidden="true">
              <i style={{ '--w': p.completion / 100 }} />
            </span>
            <span className="xdo__val">{p.completion}%</span>
          </li>
        ))}
      </ul>
      <dl className="xdo__facts">
        {PRO_FIELDS.map(([k, label]) => (
          <div key={k}>
            <dt>{t(label)}</dt>
            <dd className={cx(!ans?.[k] && 'is-missing')}>{ans?.[k] ? (Array.isArray(ans[k]) ? ans[k].join(', ') : ans[k]) : t('pro.missing')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const XP = 50; // the points a completed profile has earned in the activity feed
function Quests({ list }) {
  return (
    <ul className="xq">
      {list.map((p, i) => {
        const done = p.completion >= 100;
        return (
          <li key={p.slug} className={cx('xq__card', done && 'is-done', !p.started && 'is-new')} style={{ '--i': i }}>
            <span className="xq__icon" aria-hidden="true">
              <Icon name={done ? 'trophy' : catArt(p.name).icon} size={22} />
            </span>
            <span className="xq__name">{p.name}</span>
            <span className="xq__ring" style={{ '--p': p.completion / 100 }} aria-hidden="true" />
            <span className="xq__state">{done ? t('pj.q.done') : p.started ? t('pj.q.progress', { n: p.completion }) : t('pj.q.new')}</span>
            {!done && (
              <MLink to={profileLink(p.slug)} className="xq__go">
                {p.started ? t('pj.q.resume') : t('pj.q.start')} <Icon name="arrow" size={14} />
              </MLink>
            )}
            {done && <span className="xq__xp">+{XP} XP</span>}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ survey discovery */
//   deck     (Consumer) a featured opportunity card plus a fan of smaller cards
//   briefs   (Professional) research briefs as rows, with length and honorarium bars
//   missions (Teen) missions with a time bar and points
export function SurveyDiscovery({ variant = 'deck', limit = 6 }) {
  const d = useDash();
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => {
    const l = d.surveys || [];
    if (filter === 'short') return l.filter((s) => s.loi && s.loi <= 10);
    if (filter === 'high') return [...l].sort((a, b) => b.points - a.points).slice(0, Math.max(2, Math.ceil(l.length / 2)));
    if (filter === 'new') return l.filter(isNew);
    return l;
  }, [d.surveys, filter]);
  const filters = ['all', 'new', 'short', 'high'];
  const head = (
    <XHead
      id="xs-surveys"
      icon={variant === 'briefs' ? 'briefcase' : variant === 'missions' ? 'target' : 'clipboard'}
      eyebrow={t('sd.eyebrow')}
      title={t(`sd.title.${variant}`)}
      sub={d.sStatus === 'ready' && d.surveys.length ? t(`sd.sub.${variant}`, { n: d.surveys.length }) : t('sv.sub')}
      action={
        <Button to="surveys" size="sm" variant="ghost" iconEnd="arrow">
          {t('sv.browse')}
        </Button>
      }
    />
  );
  let body;
  if (d.sStatus === 'error') body = <XError text={t('sv.err')} onRetry={d.sRetry} />;
  else if (d.sStatus !== 'ready') body = <XSkel rows={variant === 'briefs' ? 3 : 2} h={variant === 'briefs' ? 62 : 120} />;
  else if (!d.surveys.length)
    body = (
      <XEmpty kind="surveys" title={t(`sd.empty.${variant}`)} action={<Button to="profiles" variant="secondary" size="sm" iconEnd="arrow">{t('sv.empty.cta')}</Button>}>
        {t('sv.empty.p')}
      </XEmpty>
    );
  else
    body = (
      <>
        <div className="xs-filters" role="group" aria-label={t('sd.filter')}>
          {filters.map((f) => (
            <button key={f} type="button" className={cx('xs-chip', filter === f && 'is-on')} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {t(`sd.f.${f}`)}
            </button>
          ))}
        </div>
        {!list.length ? (
          <XEmpty compact kind="surveys" title={t('sd.none')} />
        ) : variant === 'briefs' ? (
          <Briefs list={list.slice(0, limit)} />
        ) : variant === 'missions' ? (
          <Missions list={list.slice(0, limit)} />
        ) : (
          <Deck list={list.slice(0, limit)} />
        )}
      </>
    );
  return (
    <section className={cx('xs xs--surveys', `xs--${variant}`)} aria-labelledby="xs-surveys">
      {head}
      {body}
    </section>
  );
}

function CoinAmt({ n }) {
  return (
    <span className="xs-coin">
      <span className="mb-coin mb-coin--sm" aria-hidden="true" />
      {t('sv.pts', { n: fmt(n) })}
    </span>
  );
}

function Deck({ list }) {
  const [first, ...rest] = list;
  const maxLoi = Math.max(15, ...list.map((s) => s.loi || 0));
  const art = catArt(first.category);
  return (
    <div className="xdk">
      <article className={cx('xdk__hero', `hue-${art.hue}`)}>
        <span className="xdk__art" aria-hidden="true">
          <span className="xdk__blob" />
          <Icon name={art.icon} size={44} />
          <span className="xdk__spark xdk__spark--a" />
          <span className="xdk__spark xdk__spark--b" />
        </span>
        <div className="xdk__text">
          <p className="xdk__cat">
            {first.category || t('sv.cat.general')}
            {isNew(first) && <span className="xs-new">{t('sv.new')}</span>}
          </p>
          <h3>{first.name}</h3>
          <div className="xdk__meta">
            <CoinAmt n={first.points} />
            <span className="xs-time">
              <Icon name="clock" size={15} /> {t('sv.min', { n: first.loi || '—' })}
              <span className="xs-time__bar" aria-hidden="true">
                <i style={{ '--w': (first.loi || 0) / maxLoi }} />
              </span>
            </span>
          </div>
          <Button to={surveyLink(first.slug)} iconEnd="arrow" aria-label={`${t('sd.take')}: ${first.name}`}>
            {t('sd.take')}
          </Button>
        </div>
      </article>
      {rest.length > 0 && (
        <ul className="xdk__fan">
          {rest.map((s, i) => {
            const a = catArt(s.category);
            return (
              <li key={s.id} className={cx('xdk__card', `hue-${a.hue}`)} style={{ '--i': i }}>
                <MLink to={surveyLink(s.slug)} className="xdk__cardlink" aria-label={`${t('sv.start')}: ${s.name}`}>
                  <span className="xdk__mini" aria-hidden="true">
                    <Icon name={a.icon} size={20} />
                  </span>
                  <span className="xdk__name">{s.name}</span>
                  <span className="xdk__row">
                    <CoinAmt n={s.points} />
                    <span className="xs-time">
                      <Icon name="clock" size={14} /> {t('sv.min', { n: s.loi || '—' })}
                    </span>
                  </span>
                  {isNew(s) && <span className="xs-new xs-new--corner">{t('sv.new')}</span>}
                </MLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Briefs({ list }) {
  const maxLoi = Math.max(1, ...list.map((s) => s.loi || 0));
  const maxPts = Math.max(1, ...list.map((s) => s.points || 0));
  return (
    <div className="xbr" role="table" aria-label={t('sd.title.briefs')}>
      <div className="xbr__head" role="row">
        <span role="columnheader">{t('sd.col.study')}</span>
        <span role="columnheader">{t('sd.col.length')}</span>
        <span role="columnheader">{t('sd.col.reward')}</span>
        <span role="columnheader" className="mb-sr">
          {t('sv.start')}
        </span>
      </div>
      {list.map((s, i) => {
        const a = catArt(s.category);
        return (
          <div key={s.id} className="xbr__row" role="row" style={{ '--i': i }}>
            <span role="cell" className="xbr__study">
              <span className="xbr__icon" aria-hidden="true">
                <Icon name={a.icon} size={18} />
              </span>
              <span>
                <strong>{s.name}</strong>
                <small>
                  {s.category || t('sv.cat.general')}
                  {isNew(s) && <em className="xs-new">{t('sv.new')}</em>}
                </small>
              </span>
            </span>
            <span role="cell" className="xbr__metric">
              <span className="xbr__num">{t('sv.min', { n: s.loi || '—' })}</span>
              <span className="xbr__bar is-loi" aria-hidden="true">
                <i style={{ '--w': (s.loi || 0) / maxLoi }} />
              </span>
            </span>
            <span role="cell" className="xbr__metric">
              <span className="xbr__num">{fmt(s.points)}</span>
              <span className="xbr__bar is-pts" aria-hidden="true">
                <i style={{ '--w': s.points / maxPts }} />
              </span>
            </span>
            <span role="cell" className="xbr__go">
              <Button to={surveyLink(s.slug)} size="sm" variant={i === 0 ? 'primary' : 'secondary'} iconEnd="arrow" aria-label={`${t('sd.open')}: ${s.name}`}>
                {t('sd.open')}
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Missions({ list }) {
  return (
    <ul className="xm">
      {list.map((s, i) => {
        const a = catArt(s.category);
        return (
          <li key={s.id} className={cx('xm__card', `hue-${a.hue}`)} style={{ '--i': i }}>
            <span className="xm__badge" aria-hidden="true">
              <Icon name={a.icon} size={24} />
            </span>
            <span className="xm__no">{t('sd.mission', { n: i + 1 })}</span>
            <h3 className="xm__name">{s.name}</h3>
            <span className="xm__row">
              <CoinAmt n={s.points} />
              <span className="xs-time">
                <Icon name="clock" size={14} /> {t('sv.min', { n: s.loi || '—' })}
              </span>
            </span>
            <Button to={surveyLink(s.slug)} size="sm" iconEnd="arrow" className="xm__go" aria-label={`${t('sd.go')}: ${s.name}`}>
              {t('sd.go')}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ bento tiles */
export function VaultTile() {
  const d = useDash();
  const p = d.points;
  const pct = p ? p.total / p.threshold : 0;
  return (
    <MLink to="rewards" className="xt xt--vault" aria-label={`${t('nav.rewards')}: ${p ? t('hdr.points', { n: fmt(p.total) }) : ''}`}>
      <span className="xt__k">{t('xt.vault')}</span>
      <Vault pct={pct} open={pct >= 1}>
        <strong>{p ? <Counter value={p.total} /> : '…'}</strong>
        <small>{t('pts.balance')}</small>
      </Vault>
      <span className="xt__v">{p ? (pct >= 1 ? t('pts.milestoneReached') : t('xt.vault.left', { n: fmt(p.threshold - p.total) })) : <Skeleton w={120} h={12} />}</span>
    </MLink>
  );
}

export function QualityTile() {
  const d = useDash();
  return (
    <MLink to="quality" className={cx('xt xt--quality', `is-${d.tier}`)}>
      <span className="xt__k">{t('q.title')}</span>
      <QualityMeter score={d.me.quality.score} scale={d.me.quality.scale} tier={d.tier}>
        <strong>
          <Counter value={d.me.quality.score} />
        </strong>
        <small>{t(`q.tier.${d.tier}`)}</small>
      </QualityMeter>
      <span className="xt__v">{t(`q.msg.${d.tier}`)}</span>
    </MLink>
  );
}

export function ReferralTile() {
  const d = useDash();
  const r = d.refs;
  const teen = d.me.type === 'teen';
  return (
    <MLink to="referrals" className="xt xt--referral">
      <span className="xt__k">{t(teen ? 'rf.teenTitle' : 'rf.title')}</span>
      <span className="xt__web" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={cx(r && i < r.joined && 'is-on')} style={{ '--i': i }} />
        ))}
        <b>{t('xt.you')}</b>
      </span>
      <span className="xt__big">{r ? tn('rf.count', r.joined) : '…'}</span>
      <span className="xt__v">{r ? tn('rf.invited', r.invited) : ''}</span>
    </MLink>
  );
}

/* ------------------------------------------------------------------ activity ribbon */
const ACT_ICON = { complete: 'check', terminate: 'close', dropout: 'clock', overquota: 'lock' };
export function ActivityRibbon({ limit = 8, title }) {
  const d = useDash();
  const list = (d.activity || []).slice(0, limit);
  return (
    <section className="xs xs--activity" aria-labelledby="xs-act">
      <XHead
        id="xs-act"
        icon="pulse"
        eyebrow={t('ar.eyebrow')}
        title={title || t('ac.title')}
        action={
          <MLink to="activity" className="mb-linkbtn">
            {t('ac.all')}
          </MLink>
        }
      />
      {d.aStatus === 'error' ? (
        <XError text={t('ac.err')} onRetry={d.aRetry} />
      ) : !d.activity ? (
        <XSkel rows={1} h={86} />
      ) : !list.length ? (
        <XEmpty compact kind="activity" title={t('ac.empty.t')}>
          {t('ac.empty.p')}
        </XEmpty>
      ) : (
        <ol className="xrb">
          {list.map((a, i) => (
            <li key={a.id} className={cx('xrb__item', `is-${a.status}`)} style={{ '--i': i }}>
              <span className="xrb__icon" aria-hidden="true">
                <Icon name={ACT_ICON[a.status] || 'pulse'} size={14} strokeWidth={2.6} />
              </span>
              <span className="xrb__when">{relTime(a.date)}</span>
              <span className="xrb__name">{a.name}</span>
              <span className="xrb__what">{a.points > 0 ? `+${fmt(a.points)}` : t(`ac.${a.status}`) === `ac.${a.status}` ? t('ac.other') : t(`ac.${a.status}`)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ badge shelf */
export function BadgeShelf({ list, title, limit }) {
  const items = limit ? list.slice(0, limit) : list;
  const earned = list.filter((a) => a.have >= a.goal).length;
  return (
    <section className="xs xs--badges" aria-labelledby="xs-badges">
      <XHead id="xs-badges" icon="trophy" eyebrow={t('bs.eyebrow', { a: earned, b: list.length })} title={title || t('ach.title')} sub={t('ach.sub')} />
      <ul className="xb">
        {items.map((a, i) => {
          const done = a.have >= a.goal;
          const p = Math.min(1, a.have / a.goal);
          return (
            <li key={a.id} className={cx('xb__item', done ? 'is-earned' : 'is-locked')} style={{ '--i': i, '--p': p }}>
              <span className="xb__medal" aria-hidden="true">
                <span className="xb__ring" />
                <Icon name={done ? a.icon : 'lock'} size={22} />
              </span>
              <span className="xb__name">{t(`ach.${a.id}`)}</span>
              <span className="xb__desc">{done ? t('ach.earned') : t('ach.progress', { a: fmt(Math.min(a.have, a.goal)), b: fmt(a.goal) })}</span>
              <span className="mb-sr">{t(`ach.${a.id}.d`, a.vars)}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Where an external member route lives, for labels. */
export const isExternal = (id) => !!ROUTES[id]?.external;
export { ABOUT_YOU };
