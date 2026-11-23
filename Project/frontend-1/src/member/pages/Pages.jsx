// Rewards, Quality score, Referrals and Activity pages.
import { useMemo, useState } from 'react';
import { useMe, useSection } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { REFERRAL_STEPS } from '../config/memberTypes.js';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Achievements, ActivityTimeline, PointsCard, QualityScoreCard } from '../components/Modules.jsx';
import { Badge, Button, Card, Counter, EmptyState, Field, Icon, MLink, Progress, Section, Segmented, Skeleton, StatTile, Tabs, cx, useToast } from '../components/ui.jsx';

export function PageHead({ title, sub, icon, action }) {
  return (
    <header className="mb-pagehead">
      <div>
        <h1>
          {icon && (
            <span className="mb-pagehead__icon" aria-hidden="true">
              <Icon name={icon} size={20} />
            </span>
          )}
          {title}
        </h1>
        {sub && <p>{sub}</p>}
      </div>
      {action}
    </header>
  );
}

/* ================= rewards ================= */
export function RewardsPage() {
  const me = useMe();
  const [p] = useSection('points');
  const [activity, status, retry] = useSection('activity');
  const earned = (activity || []).filter((a) => a.points > 0);
  const ready = p && p.total >= p.threshold;
  return (
    <div className="mb-page">
      <PageHead
        title={t('nav.rewards')}
        icon="coin"
        sub={t('pts.how')}
        action={
          me.type !== 'teen' &&
          (ready ? (
            <Button to="myaccount" icon="wallet" iconEnd="external">
              {t('pts.redeem')}
            </Button>
          ) : (
            p && (
              <Badge tone="neutral" icon="lock">
                {t('pts.redeemSoon', { n: fmt(p.threshold) })}
              </Badge>
            )
          ))
        }
      />
      <div className="mb-cols">
        <div className="mb-col-main">
          <PointsCard />
          <Card title={t('pts.recent')} icon="pulse">
            <Section status={status} onRetry={retry} skeleton={<Skeleton lines={5} h={16} />}>
              {earned.length ? (
                <table className="mb-table">
                  <caption className="mb-sr">{t('pts.recent')}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t('ac.title')}</th>
                      <th scope="col">{t('ac.range')}</th>
                      <th scope="col" className="is-num">
                        {t('sum.points')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {earned.map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{relTime(a.date)}</td>
                        <td className="is-num mb-pos">+{fmt(a.points)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState icon="coin" title={t('pts.none')} />
              )}
            </Section>
          </Card>
        </div>
        <div className="mb-col-side">
          <Card title={t('pts.how')} icon="sparkles">
            <ul className="mb-rules">
              <li>
                <Icon name="clipboard" size={16} /> {t('q.rule1')}
              </li>
              <li>
                <Icon name="coin" size={16} /> {p ? t('pts.milestone', { n: fmt(p.threshold) }) : t('pts.milestone', { n: '…' })}
              </li>
              <li>
                <Icon name="wallet" size={16} /> {t('ma.payment.d')}
              </li>
            </ul>
            {me.type !== 'teen' && (
              <Button to="myaccount" variant="secondary" size="sm" iconEnd="external" className="mb-wide">
                {t('ma.payment.open')}
              </Button>
            )}
          </Card>
          <Achievements />
        </div>
      </div>
    </div>
  );
}

/* ================= quality ================= */
export function QualityPage() {
  return (
    <div className="mb-page">
      <PageHead title={t('nav.quality')} icon="shield" sub={t('q.rule3')} />
      <div className="mb-cols">
        <div className="mb-col-main">
          <QualityScoreCard detailed />
        </div>
        <div className="mb-col-side">
          <Card title={t('q.how')} icon="sparkles">
            <ul className="mb-rules">
              <li>
                <Icon name="check" size={16} /> {t('q.rule1')}
              </li>
              <li>
                <Icon name="x" size={16} /> {t('q.rule2')}
              </li>
              <li>
                <Icon name="target" size={16} /> {t('q.rule3')}
              </li>
            </ul>
            <Button to="profiles" size="sm" iconEnd="external" className="mb-wide">
              {t('pc.cta')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ================= referrals ================= */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function ReferralsPage() {
  const me = useMe();
  const [r, status, retry] = useSection('referrals');
  const toast = useToast();
  const [emails, setEmails] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const next = REFERRAL_STEPS.find((n) => n > (r?.joined || 0)) || REFERRAL_STEPS[REFERRAL_STEPS.length - 1];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.link);
      toast(t('rf.copied'));
      feedback('success');
    } catch {
      /* ignore */
    }
  };
  const share = async () => {
    const data = { title: 'Turn2Opinion', text: t('rf.lead'), url: r.link };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* cancelled */
      }
    } else copy();
  };
  const send = async (e) => {
    e.preventDefault();
    const list = emails
      .split(/[\s,;]+/)
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    if (!list.length || list.some((x) => !EMAIL.test(x))) return setErr(t('rf.badEmail'));
    setErr('');
    setBusy(true);
    try {
      const res = await actions.invite([...new Set(list)].slice(0, 20));
      toast(t('rf.sent', { n: res?.invited?.length ?? list.length, m: res?.alreadyRegistered?.length ?? 0 }));
      feedback('success');
      setEmails('');
      retry();
    } catch (x) {
      toast(x.message || t('st8.error'), 'error');
    } finally {
      setBusy(false);
    }
  };
  const teen = me.type === 'teen';
  return (
    <div className="mb-page">
      <PageHead title={t(teen ? 'rf.teenTitle' : 'rf.title')} icon="users" sub={t('rf.lead')} />
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={6} h={18} />}>
        {r && (
          <>
            <section className="mb-refhero" aria-label={t('rf.progress')}>
              <div className="mb-refhero__orbit" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={cx('mb-refhero__dot', i < r.joined && 'is-on')} style={{ '--i': i }}>
                    <Icon name="user" size={14} />
                  </span>
                ))}
                <span className="mb-refhero__core">
                  <Counter value={r.joined} />
                </span>
              </div>
              <div className="mb-refhero__text">
                <p className="mb-eyebrow">{t('rf.progress')}</p>
                <h2>{tn('rf.count', r.joined)}</h2>
                <p className="mb-muted">{tn('rf.invited', r.invited)}</p>
                <Progress value={r.joined} max={next} label={t('rf.progress')} />
                <p className="mb-faint mb-small">{t('rf.next', { n: next })}</p>
                {r.link && (
                  <div className="mb-copy mb-copy--lg">
                    <input className="mb-input mb-input--mono" readOnly value={r.link} aria-label={t('rf.link')} onFocus={(e) => e.target.select()} />
                    <Button icon="copy" onClick={copy}>
                      {t('rf.copy')}
                    </Button>
                    <Button variant="secondary" icon="send" onClick={share}>
                      {t('rf.share')}
                    </Button>
                  </div>
                )}
                <p className="mb-faint mb-small">{teen ? t('rf.teenNote') : t('rf.rewardNote')}</p>
              </div>
            </section>
            <div className="mb-cols">
              <div className="mb-col-main">
                <Card title={t('rf.history')} icon="clock">
                  {r.rows.length ? (
                    <ul className="mb-reflist">
                      {r.rows.map((x, i) => (
                        <li key={x.email || i}>
                          <span className="mb-reflist__avatar" aria-hidden="true">
                            {(x.name || x.email || '?')[0].toUpperCase()}
                          </span>
                          <div className="mb-reflist__text">
                            <p className="mb-reflist__name">{x.name || x.email}</p>
                            <p className="mb-faint mb-small">{relTime(x.joinedAt || x.sentAt)}</p>
                          </div>
                          <Badge tone={x.status === 'verified' ? 'success' : x.status === 'joined' ? 'primary' : 'neutral'}>{t(`rf.status.${x.status}`)}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <EmptyState icon="users" title={t('rf.empty.t')}>
                      {t('rf.empty.p')}
                    </EmptyState>
                  )}
                </Card>
              </div>
              <div className="mb-col-side">
                {!teen && (
                  <Card title={t('rf.invite')} icon="mail">
                    <form onSubmit={send} noValidate>
                      <Field id="mb-inv" label={t('rf.invite')} error={err} hint="Up to 20 addresses, separated by commas.">
                        <textarea id="mb-inv" className="mb-input" rows={3} value={emails} placeholder={t('rf.invitePh')} onChange={(e) => setEmails(e.target.value)} />
                      </Field>
                      <Button type="submit" busy={busy} icon="send" className="mb-wide">
                        {busy ? t('rf.sending') : t('rf.send')}
                      </Button>
                    </form>
                  </Card>
                )}
                <SocialFollow />
              </div>
            </div>
          </>
        )}
      </Section>
    </div>
  );
}

/** "Get rewarded for staying connected": the existing follow-and-verify flow, restyled. */
function SocialFollow() {
  const [list, status, retry] = useSection('socials');
  const [open, setOpen] = useState(null);
  const [handle, setHandle] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [followed, setFollowed] = useState({});
  const toast = useToast();
  if (status === 'ready' && !list?.length) return null;
  const submit = async (e) => {
    e.preventDefault();
    if (!handle.trim() || !file) return;
    setBusy(true);
    try {
      await actions.verifySocial(open, handle.trim(), file);
      toast('Submitted for verification.');
      setOpen(null);
      setHandle('');
      setFile(null);
      retry();
    } catch (x) {
      toast(x.message || t('st8.error'), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card title="Stay connected" icon="heart">
      <p className="mb-card__lead">Follow us and submit your handle for verification to earn the bonus shown.</p>
      <Section status={status} onRetry={retry} skeleton={<Skeleton lines={4} h={16} />}>
        <ul className="mb-socials">
          {(list || []).map((s) => {
            const st = followed[s.platform] && s.status === 'not_started' ? 'followed' : s.status;
            return (
              <li key={s.platform} className={cx('mb-social', `is-${st}`)}>
                <span className="mb-social__icon" aria-hidden="true">
                  <Icon name={s.platform.toLowerCase()} size={18} />
                </span>
                <span className="mb-social__name">{s.platform}</span>
                {st === 'rewarded' ? (
                  <Badge tone="success" icon="check">+{s.points}</Badge>
                ) : st === 'pending' ? (
                  <Badge tone="warning" icon="clock">Pending</Badge>
                ) : st === 'followed' ? (
                  <Button size="sm" onClick={() => setOpen(s.platform)}>
                    Verify
                  </Button>
                ) : (
                  <a className="mb-btn mb-btn--secondary mb-btn--sm" href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => setFollowed((f) => ({ ...f, [s.platform]: true }))}>
                    <span className="mb-btn__label">Follow · +{s.points}</span>
                  </a>
                )}
                {open === s.platform && (
                  <form className="mb-social__form" onSubmit={submit}>
                    <Field id={`h-${s.platform}`} label={`Your ${s.platform} name`}>
                      <input id={`h-${s.platform}`} className="mb-input" value={handle} onChange={(e) => setHandle(e.target.value)} />
                    </Field>
                    <Field id={`f-${s.platform}`} label="Screenshot showing you follow us">
                      <input id={`f-${s.platform}`} className="mb-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </Field>
                    <div className="mb-row">
                      <Button type="submit" size="sm" busy={busy} disabled={!handle.trim() || !file}>
                        Submit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setOpen(null)}>
                        {t('av.cancel')}
                      </Button>
                    </div>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </Card>
  );
}

/* ================= activity ================= */
const RANGES = { 30: 30, 90: 90, 365: 365, all: null };
export function ActivityPage() {
  const [list, status, retry] = useSection('activity');
  const [stats, sStatus] = useSection('stats');
  const [filter, setFilter] = useState('all');
  const [range, setRange] = useState('90');
  const items = useMemo(() => {
    const days = RANGES[range];
    const since = days ? Date.now() - days * 864e5 : 0;
    return (list || []).filter((a) => (filter === 'all' || a.status === filter) && new Date(a.date || 0).getTime() >= since);
  }, [list, filter, range]);
  return (
    <div className="mb-page">
      <PageHead title={t('nav.activity')} icon="pulse" sub={t('ac.empty.p')} />
      <div className="mb-stats-row">
        <StatTile icon="clipboard" label={t('ac.s.total')} value={sStatus === 'ready' ? <Counter value={stats.total} /> : '—'} />
        <StatTile icon="check" tone="success" label={t('ac.s.complete')} value={sStatus === 'ready' ? <Counter value={stats.complete} /> : '—'} />
        <StatTile icon="x" tone="danger" label={t('ac.s.disq')} value={sStatus === 'ready' ? <Counter value={stats.disqualified} /> : '—'} />
        <StatTile icon="clock" tone="warning" label={t('ac.s.abandoned')} value={sStatus === 'ready' ? <Counter value={stats.abandoned} /> : '—'} />
      </div>
      <Card title={t('ac.title')} icon="pulse">
        <div className="mb-toolbar">
          <Tabs
            label={t('ac.title')}
            value={filter}
            onChange={setFilter}
            tabs={['all', 'complete', 'terminate', 'dropout'].map((v) => ({ value: v, label: t(`ac.filter.${v}`) }))}
          />
          <label className="mb-select">
            <span className="mb-sr">{t('ac.range')}</span>
            <Icon name="calendar" size={16} />
            <select value={range} onChange={(e) => setRange(e.target.value)}>
              {Object.keys(RANGES).map((k) => (
                <option key={k} value={k}>
                  {t(`ac.range.${k}`)}
                </option>
              ))}
            </select>
          </label>
        </div>
        {status === 'ready' ? <ActivityTimeline items={items} limit={200} compact /> : <Section status={status} onRetry={retry} error={t('ac.err')} skeleton={<Skeleton lines={6} h={16} />} />}
      </Card>
    </div>
  );
}
