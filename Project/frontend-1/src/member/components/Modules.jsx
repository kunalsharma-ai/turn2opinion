// Dashboard modules. Each one reads its own section, so it owns its loading, empty and error state.
// Numbers shown are only ever existing backend values or simple arithmetic on them.
import { useMemo, useRef, useState } from 'react';
import { useMe, useSection, profileCompletion, qualityTier } from '../data/MemberData.jsx';
import { ABOUT_YOU, REFERRAL_STEPS, surveyLink } from '../config/memberTypes.js';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Badge, Button, Card, Counter, EmptyState, Icon, MLink, Progress, ProgressRing, Section, Skeleton, Tabs, Tooltip, cx, useToast, prefersReducedMotion } from './ui.jsx';

const money = (pts, rate) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(pts * rate);
  } catch {
    return `$${(pts * rate).toFixed(2)}`;
  }
};

/* =============== hero / greeting =============== */
function greeting(name) {
  const h = new Date().getHours();
  return t(h < 12 ? 'greet.morning' : h < 18 ? 'greet.afternoon' : 'greet.evening', { name });
}

export function WelcomeHero() {
  const me = useMe();
  const [points] = useSection('points');
  const [profiles] = useSection('profiles');
  const [surveys, sStatus] = useSection('surveys');
  const pc = profileCompletion(profiles);
  const tier = qualityTier(me.quality.score, me.quality.scale);
  // Agreement accepted = the 'terms' choice saved by the panel agreement (PUT /api/v1/me). Accounts made
  // before that agreement existed (18 Oct 2026) are not flagged.
  const termsMissing = me.type !== 'teen' && !(me.terms || []).includes('terms') && new Date(me.joinedAt || 0) >= new Date('2026-10-18');
  const tilt = useTilt();
  return (
    <section className={cx('mb-hero', `mb-hero--${me.type}`)} aria-labelledby="mb-hello">
      <div className="mb-hero__glow" aria-hidden="true" />
      <div className="mb-hero__text">
        <p className="mb-hero__type">
          <Badge tone={me.type} icon={me.type === 'pro' ? 'briefcase' : me.type === 'teen' ? 'sparkles' : 'heart'}>
            {t(`member.${me.type}`)}
          </Badge>
          <Badge tone={termsMissing ? 'warning' : 'success'} icon={termsMissing ? 'clipboard' : 'check'}>
            {termsMissing ? t('greet.status.terms') : t('greet.status.active')}
          </Badge>
        </p>
        <h1 id="mb-hello">{greeting(me.firstName || me.fullName)}</h1>
        <p className="mb-hero__lead">{t(`greet.${me.type}`)}</p>
        <div className="mb-hero__actions">
          {surveys?.length ? (
            <Button to="surveys" iconEnd="arrow">
              {tn('sv.count', surveys.length)}
            </Button>
          ) : (
            <Button to="profiles" iconEnd="arrow">
              {t('pc.cta')}
            </Button>
          )}
          <Button to="profile" variant="ghost" icon="user">
            {t('nav.account')}
          </Button>
        </div>
      </div>
      <div className="mb-hero__stats" ref={tilt.ref} onPointerMove={tilt.move} onPointerLeave={tilt.leave}>
        <h2 className="mb-sr">{t('sum.title')}</h2>
        <HeroStat icon="coin" tone="points" label={t('sum.points')} to="rewards" value={points ? <Counter value={points.total} /> : <Skeleton w={64} h={26} />} />
        <HeroStat icon="shield" tone={tier} label={t('sum.quality')} to="quality" value={<><Counter value={me.quality.score} /><small>/{me.quality.scale}</small></>} />
        <HeroStat icon="clipboard" tone="primary" label={t('sum.surveys')} to="surveys" value={sStatus === 'ready' ? <Counter value={surveys.length} /> : sStatus === 'error' ? '—' : <Skeleton w={40} h={26} />} />
        <HeroStat icon="user" tone="secondary" label={t('sum.profile')} to="profiles" value={pc ? <><Counter value={pc.percent} /><small>%</small></> : <Skeleton w={52} h={26} />} />
      </div>
    </section>
  );
}

function HeroStat({ icon, label, value, to, tone }) {
  return (
    <MLink to={to} className={cx('mb-herostat', `is-${tone}`)}>
      <span className="mb-herostat__icon" aria-hidden="true">
        <Icon name={icon} size={18} />
      </span>
      <span className="mb-herostat__value">{value}</span>
      <span className="mb-herostat__label">{label}</span>
    </MLink>
  );
}

/** Subtle 3D tilt that follows the pointer (desktop only, off with reduced motion). */
function useTilt(max = 6) {
  const ref = useRef(null);
  const move = (e) => {
    if (prefersReducedMotion() || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    ref.current.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };
  return { ref, move, leave };
}

/* =============== points =============== */
export function PointsCard({ compact }) {
  const me = useMe();
  const [p, status, retry] = useSection('points');
  const [activity] = useSection('activity');
  const recent = (activity || []).filter((a) => a.points > 0).slice(0, compact ? 3 : 4);
  const left = p ? Math.max(0, p.threshold - p.total) : 0;
  return (
    <Card title={t(me.type === 'teen' ? 'pts.teenTitle' : 'pts.title')} icon="coin" tone="points" className="mb-points" action={<MLink to="rewards" className="mb-linkbtn">{t('pts.view')}</MLink>}>
      <Section
        status={status}
        onRetry={retry}
        skeleton={
          <div className="mb-points__body">
            <Skeleton w={132} h={132} r="50%" />
            <div style={{ flex: 1 }}>
              <Skeleton h={34} w="60%" />
              <Skeleton lines={3} h={12} />
            </div>
          </div>
        }
      >
        {p && (
          <>
            <div className="mb-points__body">
              <ProgressRing value={p.total} max={p.threshold} size={132} stroke={11} tone="points" label={t('pts.toMilestone', { n: fmt(left) })}>
                <Icon name="coin" size={22} />
                <span className="mb-ring__pct">{Math.min(100, Math.round((p.total / p.threshold) * 100))}%</span>
              </ProgressRing>
              <div className="mb-points__numbers">
                <p className="mb-points__big">
                  <Counter value={p.total} /> <span className="mb-points__unit">{t('pts.balance')}</span>
                </p>
                {p.rate > 0 && <p className="mb-muted">{t('pts.worth', { money: money(p.total, p.rate) })}</p>}
                <Progress value={p.total} max={p.threshold} tone="points" label={t('pts.milestone', { n: fmt(p.threshold) })} />
                <p className="mb-points__next">
                  {left > 0 ? (
                    <>
                      <strong>{fmt(left)}</strong> {t('pts.toMilestone', { n: '' }).trim()}
                    </>
                  ) : (
                    t('pts.milestoneReached')
                  )}
                </p>
                <dl className="mb-points__split">
                  <div>
                    <dt>{t('pts.earned')}</dt>
                    <dd>{fmt(p.earned)}</dd>
                  </div>
                  <div>
                    <dt>{t('pts.redeemed')}</dt>
                    <dd>{fmt(p.redeemed)}</dd>
                  </div>
                  <div>
                    <dt>{t('pts.milestone', { n: '' }).trim()}</dt>
                    <dd>{fmt(p.threshold)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mb-points__recent">
              <p className="mb-subhead">{t('pts.recent')}</p>
              {recent.length ? (
                <ul className="mb-pointlist">
                  {recent.map((a) => (
                    <li key={a.id}>
                      <span className="mb-pointlist__amt">+{fmt(a.points)}</span>
                      <span className="mb-pointlist__name">{a.name}</span>
                      <span className="mb-pointlist__time">{relTime(a.date)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mb-muted mb-small">{t('pts.none')}</p>
              )}
            </div>
          </>
        )}
      </Section>
    </Card>
  );
}

/* =============== quality score =============== */
export function QualityScoreCard({ detailed }) {
  const me = useMe();
  const [stats, sStatus] = useSection('stats');
  const [profiles] = useSection('profiles');
  const { score, scale } = me.quality;
  const tier = qualityTier(score, scale);
  const about = (profiles || []).filter((p) => ABOUT_YOU.includes(p.slug));
  const doneProfiles = about.filter((p) => p.completion >= 100).length;
  const rate = stats && stats.total ? Math.round((stats.complete / stats.total) * 100) : null;
  return (
    <Card title={t('q.title')} icon="shield" className={cx('mb-quality', `is-${tier}`)} action={!detailed && <MLink to="quality" className="mb-linkbtn">{t('q.view')}</MLink>}>
      <div className="mb-quality__body">
        <ProgressRing value={score} max={scale} size={detailed ? 176 : 138} stroke={detailed ? 14 : 12} tone={tier} label={`${t('q.title')} ${score} ${t('q.of', { n: scale })}, ${t(`q.tier.${tier}`)}`}>
          <span className="mb-ring__score">
            <Counter value={score} />
          </span>
          <span className="mb-ring__of">{t('q.of', { n: scale })}</span>
        </ProgressRing>
        <div className="mb-quality__text">
          <Badge tone={tier === 'excellent' || tier === 'great' ? 'success' : tier === 'good' ? 'primary' : 'warning'} icon="spark">
            {t(`q.tier.${tier}`)}
          </Badge>
          <p>{t(`q.msg.${tier}`)}</p>
        </div>
      </div>
      <ul className="mb-factors" aria-label={t('q.factors')}>
        <Factor label={t('q.f.profiles')} value={about.length ? `${doneProfiles}/${about.length}` : '—'} pct={about.length ? doneProfiles / about.length : 0} />
        <Factor label={t('q.f.complete')} value={sStatus === 'ready' ? fmt(stats.complete) : '—'} pct={stats && stats.total ? stats.complete / stats.total : 0} />
        {detailed && <Factor label={t('q.f.rate')} value={rate == null ? '—' : `${rate}%`} pct={rate == null ? 0 : rate / 100} />}
        {detailed && <Factor label={t('q.f.disq')} value={sStatus === 'ready' ? fmt(stats.disqualified) : '—'} pct={stats && stats.total ? stats.disqualified / stats.total : 0} tone="muted" />}
      </ul>
    </Card>
  );
}

function Factor({ label, value, pct, tone }) {
  return (
    <li className="mb-factor">
      <span className="mb-factor__label">{label}</span>
      <span className="mb-factor__value">{value}</span>
      <Progress value={pct * 100} size="sm" tone={tone} label={label} />
    </li>
  );
}

/* =============== surveys =============== */
export function SurveyCard({ s, featured, teen }) {
  return (
    <article className={cx('mb-survey', featured && 'is-featured', teen && 'is-teen')}>
      <div className="mb-survey__top">
        <span className="mb-survey__cat">{s.category || t('sv.cat.general')}</span>
        {Date.now() - new Date(s.createdAt || 0) < 2 * 864e5 && <Badge tone="primary">{t('sv.new')}</Badge>}
      </div>
      <h3 className="mb-survey__name">{s.name}</h3>
      <div className="mb-survey__meta">
        <span>
          <Icon name="clock" size={15} /> {t('sv.min', { n: s.loi || '—' })}
        </span>
        <span className="mb-survey__pts">
          <span className="mb-coin mb-coin--sm" aria-hidden="true" /> {t('sv.pts', { n: fmt(s.points) })}
        </span>
      </div>
      <Button to={surveyLink(s.slug)} size="sm" variant={featured ? 'primary' : 'secondary'} iconEnd="arrow" className="mb-survey__cta" aria-label={`${t('sv.start')}: ${s.name}`}>
        {t('sv.start')}
      </Button>
    </article>
  );
}

export function SurveySection({ limit = 6 }) {
  const me = useMe();
  const [list, status, retry] = useSection('surveys');
  const [tab, setTab] = useState('all');
  const filtered = useMemo(() => {
    const l = list || [];
    if (tab === 'high') return [...l].sort((a, b) => b.points - a.points).filter((s) => s.points >= 500 || l.length < 4);
    if (tab === 'short') return l.filter((s) => s.loi && s.loi <= 10);
    return l;
  }, [list, tab]);
  const titleKey = me.type === 'pro' ? 'sv.proTitle' : me.type === 'teen' ? 'sv.teenTitle' : 'sv.title';
  return (
    <Card
      title={t(titleKey)}
      icon="clipboard"
      className="mb-surveys"
      action={
        <Button to="surveys" size="sm" variant="ghost" iconEnd="arrow">
          {t('sv.browse')}
        </Button>
      }
    >
      <p className="mb-card__lead">{t('sv.sub')}</p>
      {status === 'ready' && list.length > 0 && (
        <Tabs
          label={t(titleKey)}
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'all', label: t('sv.all'), count: list.length },
            { value: 'high', label: t('sv.high') },
            { value: 'short', label: t('sv.short') }
          ]}
        />
      )}
      <Section
        status={status}
        onRetry={retry}
        error={t('sv.err')}
        skeleton={
          <div className="mb-survey-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="mb-survey mb-survey--skel">
                <Skeleton w="40%" h={12} />
                <Skeleton h={20} />
                <Skeleton w="70%" h={14} />
                <Skeleton w={120} h={36} r={12} />
              </div>
            ))}
          </div>
        }
      >
        {list && !list.length ? (
          <EmptyState icon="clipboard" title={t('sv.empty.t')} action={<Button to="profiles" variant="secondary" iconEnd="arrow">{t('sv.empty.cta')}</Button>}>
            {t('sv.empty.p')}
          </EmptyState>
        ) : filtered.length ? (
          <div className="mb-survey-grid">
            {filtered.slice(0, limit).map((s, i) => (
              <SurveyCard key={s.id} s={s} featured={i === 0 && tab === 'all'} teen={me.type === 'teen'} />
            ))}
          </div>
        ) : (
          <p className="mb-muted mb-pad">{t('sv.empty.t')}</p>
        )}
      </Section>
    </Card>
  );
}

/* =============== profile completion =============== */
export function ProfileCompletionCard() {
  const me = useMe();
  const [profiles, status, retry] = useSection('profiles');
  const pc = profileCompletion(profiles);
  const todo = (profiles || []).filter((p) => p.completion < 100).slice(0, 3);
  return (
    <Card title={t(me.type === 'pro' ? 'pc.proTitle' : 'pc.title')} icon="user" className="mb-pcard">
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={4} h={14} />}>
        {pc ? (
          <>
            <div className="mb-pcard__top">
              <p className="mb-pcard__pct">
                <Counter value={pc.percent} />
                <span>%</span>
              </p>
              <Progress value={pc.percent} label={t('pc.title')} />
            </div>
            <p className="mb-muted mb-small">{pc.left ? tn('pc.left', pc.left) : t('pc.done')}</p>
            {todo.length > 0 && (
              <ul className="mb-pcard__list">
                {todo.map((p) => (
                  <li key={p.slug}>
                    <span className={cx('mb-pcard__dot', p.started && 'is-started')} aria-hidden="true" />
                    <span className="mb-pcard__name">{p.name}</span>
                    <span className="mb-pcard__val">{p.completion}%</span>
                  </li>
                ))}
              </ul>
            )}
            <Button to="profiles" variant={pc.left ? 'primary' : 'secondary'} iconEnd="arrow" size="sm" className="mb-wide">
              {pc.left ? t('pc.cta') : t('pc.open')}
            </Button>
          </>
        ) : (
          <EmptyState icon="user" title={t('pc.empty')} action={<Button to="profiles" size="sm">{t('pc.open')}</Button>} />
        )}
      </Section>
    </Card>
  );
}

/* =============== the approved Profiles hero lives on its own page: this card only links to it =============== */
export function KingdomCard() {
  return (
    <section className="mb-kingdom" aria-labelledby="mb-kd">
      <div className="mb-kingdom__art" aria-hidden="true">
        <span className="mb-kingdom__sun" />
        <span className="mb-kingdom__hill mb-kingdom__hill--a" />
        <span className="mb-kingdom__hill mb-kingdom__hill--b" />
        <span className="mb-kingdom__castle">
          <Icon name="building" size={34} />
        </span>
      </div>
      <div className="mb-kingdom__text">
        <h2 id="mb-kd">{t('kd.title')}</h2>
        <p>{t('kd.sub')}</p>
        <Button to="profiles" size="sm" variant="secondary" iconEnd="arrow">
          {t('kd.cta')}
        </Button>
      </div>
    </section>
  );
}

/* =============== referrals (compact, on the dashboard) =============== */
export function ReferralCard() {
  const me = useMe();
  const [r, status, retry] = useSection('referrals');
  const toast = useToast();
  const next = REFERRAL_STEPS.find((n) => n > (r?.joined || 0)) || REFERRAL_STEPS[REFERRAL_STEPS.length - 1];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.link);
      toast(t('rf.copied'));
      feedback('success');
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <Card title={t(me.type === 'teen' ? 'rf.teenTitle' : 'rf.title')} icon="users" className="mb-refcard" action={<MLink to="referrals" className="mb-linkbtn">{t('common.viewAll')}</MLink>}>
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={3} h={14} />}>
        {r && (
          <>
            <p className="mb-muted mb-small">{t('rf.lead')}</p>
            <div className="mb-refcard__count">
              <span className="mb-refcard__num">
                <Counter value={r.joined} />
              </span>
              <span>{tn('rf.count', r.joined).replace(/^\S+\s/, '')}</span>
            </div>
            <Progress value={r.joined} max={next} size="sm" label={t('rf.progress')} />
            <p className="mb-faint mb-small">{t('rf.next', { n: next })}</p>
            {r.link && (
              <div className="mb-copy">
                <input className="mb-input mb-input--mono" readOnly value={r.link} aria-label={t('rf.link')} onFocus={(e) => e.target.select()} />
                <Button size="sm" icon="copy" onClick={copy}>
                  {t('rf.copy')}
                </Button>
              </div>
            )}
          </>
        )}
      </Section>
    </Card>
  );
}

/* =============== activity =============== */
const ACT_ICON = { complete: 'check', terminate: 'x', dropout: 'clock', overquota: 'lock', invited: 'mail' };
export function ActivityTimeline({ limit = 6, items, compact }) {
  const [list, status, retry] = useSection('activity');
  const data = items || list || [];
  const groups = useMemo(() => {
    const g = [];
    data.slice(0, limit).forEach((a) => {
      const label = relTime(a.date);
      const last = g[g.length - 1];
      if (last && last.label === label) last.items.push(a);
      else g.push({ label, items: [a] });
    });
    return g;
  }, [data, limit]);
  const body = (
    <Section status={items ? 'ready' : status} onRetry={retry} error={t('ac.err')} skeleton={<Skeleton lines={5} h={16} />}>
      {!data.length ? (
        <EmptyState icon="pulse" title={t('ac.empty.t')}>
          {t('ac.empty.p')}
        </EmptyState>
      ) : (
        <ol className="mb-timeline">
          {groups.map((g) => (
            <li key={g.label} className="mb-timeline__group">
              <p className="mb-timeline__day">{g.label}</p>
              <ul>
                {g.items.map((a) => (
                  <li key={a.id} className={cx('mb-tl', `is-${a.status}`)}>
                    <span className="mb-tl__icon" aria-hidden="true">
                      <Icon name={ACT_ICON[a.status] || 'pulse'} size={15} strokeWidth={2.4} />
                    </span>
                    <div className="mb-tl__text">
                      <p className="mb-tl__title">{t(`ac.${a.status}`) === `ac.${a.status}` ? t('ac.other') : t(`ac.${a.status}`)}</p>
                      <p className="mb-tl__name">{a.name}</p>
                    </div>
                    {a.points > 0 ? <span className="mb-tl__pts">+{fmt(a.points)}</span> : a.status === 'dropout' && a.source === 'internal' && a.slug ? <MLink to={surveyLink(a.slug)} className="mb-linkbtn">{t('ac.resume')}</MLink> : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
  if (compact) return body;
  return (
    <Card title={t('ac.title')} icon="pulse" className="mb-activity" action={<MLink to="activity" className="mb-linkbtn">{t('ac.all')}</MLink>}>
      {body}
    </Card>
  );
}

/* =============== achievements (derived from real data; locked ones show progress) =============== */
export function useAchievements() {
  const me = useMe();
  const [stats] = useSection('stats');
  const [profiles] = useSection('profiles');
  const [refs] = useSection('referrals');
  const [points] = useSection('points');
  const about = (profiles || []).filter((p) => ABOUT_YOU.includes(p.slug));
  const c = stats?.complete || 0;
  const qGoal = Math.round(me.quality.scale * 0.9);
  return [
    { id: 'first', icon: 'flag', have: c, goal: 1 },
    { id: 'profile', icon: 'user', have: about.filter((p) => p.completion >= 100).length, goal: Math.max(1, about.length || 4) },
    { id: 'ten', icon: 'layers', have: c, goal: 10 },
    { id: 'quality', icon: 'shield', have: me.quality.score, goal: qGoal, vars: { n: qGoal } },
    { id: 'referral', icon: 'users', have: refs?.joined || 0, goal: 1, hide: me.type === 'teen' },
    { id: 'milestone', icon: 'coin', have: points?.total || 0, goal: points?.threshold || 15000, hide: me.type === 'teen' },
    { id: 'fifty', icon: 'trophy', have: c, goal: 50 }
  ].filter((a) => !a.hide);
}

export function Achievements({ limit }) {
  const list = useAchievements();
  const me = useMe();
  return (
    <Card title={t('ach.title')} icon="trophy" className={cx('mb-ach', `is-${me.type}`)}>
      <p className="mb-card__lead">{t('ach.sub')}</p>
      <ul className="mb-ach__grid">
        {list.slice(0, limit).map((a) => {
          const done = a.have >= a.goal;
          return (
            <li key={a.id} className={cx('mb-badge3d', done ? 'is-earned' : 'is-locked')}>
              <span className="mb-badge3d__medal" aria-hidden="true">
                <Icon name={done ? a.icon : 'lock'} size={20} />
              </span>
              <span className="mb-badge3d__name">{t(`ach.${a.id}`)}</span>
              <span className="mb-badge3d__desc">{t(`ach.${a.id}.d`, a.vars)}</span>
              {done ? (
                <span className="mb-badge3d__state">
                  <Icon name="check" size={12} strokeWidth={3} /> {t('ach.earned')}
                </span>
              ) : (
                <Progress value={Math.min(a.have, a.goal)} max={a.goal} size="sm" label={t('ach.progress', { a: fmt(Math.min(a.have, a.goal)), b: fmt(a.goal) })} />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* =============== professional =============== */
const PRO_FIELDS = [
  ['industry', 'pro.industry'],
  ['jobrole', 'pro.role'],
  ['add-seniority', 'pro.seniority'],
  ['orgsize', 'pro.orgsize'],
  ['empstat', 'pro.employment']
];
const show = (v) => (Array.isArray(v) ? v.join(', ') : v);

export function ExpertiseCard() {
  const [ans, status, retry] = useSection('answers');
  return (
    <Card title={t('pro.expertise')} icon="briefcase" className="mb-expertise" action={<MLink to="profiles" className="mb-linkbtn">{t('st.profile.profiles')}</MLink>}>
      <p className="mb-card__lead">{t('pro.expertise.d')}</p>
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={4} h={16} />}>
        <dl className="mb-deflist">
          {PRO_FIELDS.map(([k, label]) => (
            <div key={k}>
              <dt>{t(label)}</dt>
              <dd className={cx(!ans?.[k] && 'is-missing')}>{ans?.[k] ? show(ans[k]) : t('pro.missing')}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </Card>
  );
}

export function QualificationCard() {
  const [profiles, status, retry] = useSection('profiles');
  const prof = (profiles || []).find((p) => p.slug === 'professional');
  const ok = prof && prof.completion >= 100;
  const cats = (profiles || []).filter((p) => !ABOUT_YOU.includes(p.slug));
  return (
    <Card title={t('pro.qual')} icon="target" className="mb-qual">
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={3} h={14} />}>
        <p className={cx('mb-qual__state', ok ? 'is-ok' : 'is-partial')}>
          <Icon name={ok ? 'check' : 'clock'} size={18} strokeWidth={2.4} />
          {ok ? t('pro.qual.ok') : t('pro.qual.partial')}
        </p>
        {cats.length > 0 && (
          <>
            <p className="mb-subhead">{t('pro.categories')}</p>
            <ul className="mb-chips">
              {cats.map((c) => (
                <li key={c.slug} className={cx('mb-chip', c.completion >= 100 && 'is-on')}>
                  {c.completion >= 100 && <Icon name="check" size={12} strokeWidth={3} />}
                  {c.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>
    </Card>
  );
}

export function InsightsCard() {
  const [stats, status, retry] = useSection('stats');
  const [surveys] = useSection('surveys');
  const l = surveys || [];
  const avgLoi = l.length ? Math.round(l.reduce((n, s) => n + (s.loi || 0), 0) / l.length) : null;
  const avgPts = l.length ? Math.round(l.reduce((n, s) => n + s.points, 0) / l.length) : null;
  const rate = stats && stats.total ? Math.round((stats.complete / stats.total) * 100) : null;
  return (
    <Card title={t('pro.insights')} icon="pulse" className="mb-insights">
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={3} h={18} />}>
        <div className="mb-insights__grid">
          <Insight label={t('ac.s.complete')} value={stats ? fmt(stats.complete) : '—'} />
          <Insight label={t('pro.rate')} value={rate == null ? '—' : `${rate}%`} bar={rate} />
          <Insight label={t('pro.avgLoi')} value={avgLoi == null ? '—' : t('sv.min', { n: avgLoi })} />
          <Insight label={t('pro.avgPts')} value={avgPts == null ? '—' : fmt(avgPts)} />
        </div>
      </Section>
    </Card>
  );
}
function Insight({ label, value, bar }) {
  return (
    <div className="mb-insight">
      <span className="mb-insight__value">{value}</span>
      <span className="mb-insight__label">{label}</span>
      {bar != null && <Progress value={bar} size="sm" label={label} />}
    </div>
  );
}

/* =============== teen: guardian consent status =============== */
export function GuardianConsentCard() {
  const [g, status, retry] = useSection('guardian');
  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '';
    }
  };
  return (
    <Card title={t('gc.title')} icon="shield" className="mb-guardian">
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={4} h={14} />}>
        {g ? (
          <dl className="mb-deflist mb-deflist--tight">
            <div>
              <dt>{t('gc.status')}</dt>
              <dd>
                <Badge tone={g.status === 'approved' ? 'success' : 'warning'} icon={g.status === 'approved' ? 'check' : 'clock'}>
                  {g.status === 'approved' ? t('gc.approved') : t('gc.pending')}
                </Badge>
              </dd>
            </div>
            {g.name && (
              <div>
                <dt>{t('gc.by')}</dt>
                <dd>
                  {g.name}
                  {g.relation ? ` (${g.relation})` : ''}
                </dd>
              </div>
            )}
            {g.date && (
              <div>
                <dt>{t('gc.date')}</dt>
                <dd>{fmtDate(g.date)}</dd>
              </div>
            )}
            {g.version && (
              <div>
                <dt>{t('gc.version')}</dt>
                <dd>
                  <Tooltip text={t('gc.verified')}>
                    <span className="mb-mono">{g.version}</span>
                  </Tooltip>
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mb-muted mb-small">{t('gc.unknown')}</p>
        )}
        <Button to="/teen/profile/" size="sm" variant="ghost" iconEnd="arrow">
          {t('gc.view')}
        </Button>
      </Section>
    </Card>
  );
}
