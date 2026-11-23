// Rewards, Quality score, Referrals and Activity. Each page has its own hero, layout, colour and
// art so no two sections look alike:
//   Rewards     a vault room: the vault dial turns with progress, milestones unlock along a path
//   Quality     a lab: calibrated gauge, what / why / how, tier ladder, strengths and next steps
//   Referrals   a network: you in the centre, each friend a node, and the referral journey
//   Activity    a river: participation numbers as a band, then a month-by-month timeline
import { useCallback, useMemo, useState } from 'react';
import { useMe, useSection } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { useAchievements } from '../components/Modules.jsx';
import { Badge, Button, Counter, Field, Icon, MLink, cx, useToast } from '../components/ui.jsx';
import { QualityMeter, ReferralWeb, Vault } from '../components/art.jsx';
import { ActivityHeatmap, AttentionPractice, BonusBanner, ExpiryNotice, NudgeFriends, QualityReport, ReferralMilestones, SavingsGoal, ScoreBoosters, ScreenOutHelp, ShareKit, TrustedBadge, YearInReview } from '../components/Grow.jsx';
import { engageOn } from '../data/engage.js';
import { CharityDonate, Certificates, GemTiers, GiftCards, ReferralLeaderboard } from '../components/Engage.jsx';
import { ABOUT_YOU, BadgeShelf, XEmpty, XError, XHead, XSkel, useDash } from '../components/Sections.jsx';

const money = (pts, rate) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(pts * rate);
  } catch {
    return `$${(pts * rate).toFixed(2)}`;
  }
};

/** Simple page header, kept for any page without its own hero. */
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

/** Each page's hero: its own art on one side, the story on the other. */
function PageHero({ kind, eyebrow, title, lead, art, children, artFirst }) {
  return (
    <section className={cx('xph', `xph--${kind}`, artFirst && 'is-art-first')} aria-labelledby={`xph-${kind}`}>
      <div className="xph__bg" aria-hidden="true" />
      <div className="xph__text">
        <p className="xph__eyebrow">{eyebrow}</p>
        <h1 id={`xph-${kind}`}>{title}</h1>
        {lead && <p className="xph__lead">{lead}</p>}
        {children}
      </div>
      <div className="xph__art">{art}</div>
    </section>
  );
}

/* ================= rewards ================= */
const STEPS = [0.25, 0.5, 0.75, 1];
export function RewardsPage() {
  const me = useMe();
  const d = useDash();
  const ach = useAchievements();
  const p = d.points;
  const teen = me.type === 'teen';
  const pct = p ? Math.min(1, p.total / p.threshold) : 0;
  const ready = p && p.total >= p.threshold;
  const earned = (d.activity || []).filter((a) => a.points > 0);
  return (
    <div className="xp xp--rewards">
      <PageHero
        kind="rewards"
        eyebrow={t('rw.eyebrow')}
        title={t(teen ? 'rw.title.teen' : 'rw.title')}
        lead={teen ? t('rw.lead.teen') : t('rw.lead')}
        art={
          <Vault pct={pct} open={!!ready}>
            <strong>{p ? <Counter value={p.total} /> : '…'}</strong>
            <small>{t('pts.balance')}</small>
          </Vault>
        }
      >
        {d.pStatus === 'error' ? (
          <XError text={t('st8.error')} />
        ) : p ? (
          <>
            <p className="xrw__balance">
              <Counter value={p.total} /> <span>{t('pts.balance')}</span>
            </p>
            {!teen && p.rate > 0 && <p className="xrw__worth">{t('pts.worth', { money: money(p.total, p.rate) })}</p>}
            <dl className="xrw__split">
              <div>
                <dt>{t('pts.earned')}</dt>
                <dd>{fmt(p.earned)}</dd>
              </div>
              <div>
                <dt>{t('pts.redeemed')}</dt>
                <dd>{fmt(p.redeemed)}</dd>
              </div>
              <div>
                <dt>{t('rw.payoutAt')}</dt>
                <dd>{fmt(p.threshold)}</dd>
              </div>
            </dl>
            {!teen &&
              (ready ? (
                <Button to="myaccount" icon="wallet" iconEnd="external" className="xrw__cta">
                  {t('pts.redeem')}
                </Button>
              ) : (
                <p className="xrw__lock">
                  <Icon name="lock" size={16} /> {t('rw.locked', { n: fmt(p.threshold - p.total) })}
                </p>
              ))}
          </>
        ) : (
          <XSkel rows={2} h={40} />
        )}
      </PageHero>

      <BonusBanner />
      <ExpiryNotice />
      <SavingsGoal />

      <section className="xs xs--milestones" aria-labelledby="xs-ms">
        <XHead id="xs-ms" icon="flag" eyebrow={t('rw.ms.eyebrow')} title={t('rw.ms.title')} sub={t('rw.ms.sub')} />
        <ol className="xms" style={{ '--p': pct }}>
          <span className="xms__line" aria-hidden="true">
            <i />
          </span>
          {STEPS.map((s, i) => {
            const on = pct >= s;
            const goal = p ? Math.round(p.threshold * s) : 0;
            return (
              <li key={s} className={cx('xms__step', on && 'is-on', !on && pct >= (STEPS[i - 1] || 0) && 'is-next')} style={{ '--i': i }}>
                <span className="xms__gem" aria-hidden="true">
                  <Icon name={on ? (s === 1 ? 'gift' : 'check') : 'lock'} size={20} strokeWidth={on ? 2.6 : 2} />
                </span>
                <span className="xms__pct">{Math.round(s * 100)}%</span>
                <span className="xms__pts">{p ? t('hdr.points', { n: fmt(goal) }) : '…'}</span>
                <span className="xms__state">{on ? t('rw.ms.unlocked') : s === 1 ? (teen ? t('rw.ms.teenGoal') : t('rw.ms.payout')) : t('rw.ms.locked')}</span>
              </li>
            );
          })}
        </ol>
      </section>

      {me.type === 'consumer' && <GemTiers full />}
      {me.type === 'pro' && (
        <div className="xe-row">
          <CharityDonate />
          <Certificates />
        </div>
      )}
      {teen && <GiftCards />}

      <BadgeShelf list={ach} title={t('rw.badges')} />

      <div className="xp-cols">
        <section className="xs xs--ledger" aria-labelledby="xs-ledger">
          <XHead id="xs-ledger" icon="layers" eyebrow={t('rw.ledger.eyebrow')} title={t('pts.recent')} />
          {d.aStatus === 'error' ? (
            <XError text={t('ac.err')} onRetry={d.aRetry} />
          ) : !d.activity ? (
            <XSkel rows={4} h={46} />
          ) : earned.length ? (
            <ol className="xledger">
              {earned.map((a, i) => (
                <li key={a.id} style={{ '--i': i }}>
                  <span className="xledger__coin" aria-hidden="true" />
                  <span className="xledger__name">{a.name}</span>
                  <span className="xledger__when">{relTime(a.date)}</span>
                  <span className="xledger__amt">+{fmt(a.points)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <XEmpty kind="rewards" title={t('rw.empty.t')} action={<Button to="surveys" size="sm" iconEnd="external">{t('nav.surveys')}</Button>}>
              {t('pts.none')}
            </XEmpty>
          )}
        </section>
        <section className="xs xs--how" aria-labelledby="xs-how">
          <XHead id="xs-how" icon="sparkles" title={t('pts.how')} />
          <ol className="xhow">
            <li>
              <span>1</span>
              {t('rw.how1')}
            </li>
            <li>
              <span>2</span>
              {t('rw.how2', { n: p ? fmt(p.threshold) : '…' })}
            </li>
            <li>
              <span>3</span>
              {teen ? t('rw.how3.teen') : t('ma.payment.d')}
            </li>
          </ol>
          {!teen && (
            <Button to="myaccount" variant="secondary" size="sm" iconEnd="external">
              {t('ma.payment.open')}
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}

/* ================= quality ================= */
const TIERS = ['low', 'fair', 'good', 'great', 'excellent'];
export function QualityPage() {
  const d = useDash();
  const { score, scale } = d.me.quality;
  const s = d.stats;
  const about = (d.profiles || []).filter((p) => ABOUT_YOU.includes(p.slug));
  const openProfiles = about.filter((p) => p.completion < 100);
  const factors = [
    { id: 'profiles', icon: 'user', value: about.length ? (about.length - openProfiles.length) / about.length : null, text: about.length ? `${about.length - openProfiles.length}/${about.length}` : '—' },
    { id: 'rate', icon: 'check', value: s && s.total ? s.complete / s.total : null, text: s && s.total ? `${Math.round((s.complete / s.total) * 100)}%` : '—' },
    { id: 'finish', icon: 'clock', value: s && s.total ? 1 - s.abandoned / s.total : null, text: s && s.total ? `${Math.round((1 - s.abandoned / s.total) * 100)}%` : '—' }
  ];
  const strong = factors.filter((f) => f.value != null && f.value >= 0.75);
  const weak = factors.filter((f) => f.value != null && f.value < 0.75);
  const recs = [
    openProfiles.length > 0 && { icon: 'map', text: t('ql.rec.profile', { list: openProfiles.map((p) => p.name).join(', ') }), to: 'profiles', cta: t('pc.cta') },
    s && s.abandoned > 0 && { icon: 'clock', text: tn('ql.rec.finish', s.abandoned), to: 'surveys', cta: t('nav.surveys') },
    { icon: 'eye', text: t('ql.rec.careful') },
    { icon: 'target', text: t('ql.rec.honest') }
  ].filter(Boolean);
  const idx = TIERS.indexOf(d.tier);
  return (
    <div className="xp xp--quality">
      <PageHero
        kind="quality"
        eyebrow={t('ql.eyebrow')}
        title={t('ql.title')}
        lead={t(`q.msg.${d.tier}`)}
        art={
          <QualityMeter score={score} scale={scale} tier={d.tier}>
            <strong>
              <Counter value={score} />
            </strong>
            <small>
              {t('q.of', { n: scale })} · {t(`q.tier.${d.tier}`)}
            </small>
          </QualityMeter>
        }
      >
        <ol className="xladder" aria-label={t('ql.ladder')}>
          {TIERS.map((k, i) => (
            <li key={k} className={cx(`is-${k}`, i === idx && 'is-now', i < idx && 'is-past')} aria-current={i === idx ? 'step' : undefined}>
              <span aria-hidden="true" />
              {t(`q.tier.${k}`)}
            </li>
          ))}
        </ol>
      </PageHero>

      <div className="xwhy3">
        {[
          ['what', 'shield'],
          ['why', 'target'],
          ['how', 'spark']
        ].map(([k, icon], i) => (
          <article key={k} className="xwhy3__card" style={{ '--i': i }}>
            <span className="xwhy3__icon" aria-hidden="true">
              <Icon name={icon} size={22} />
            </span>
            <h2>{t(`ql.${k}.t`)}</h2>
            <p>{t(`ql.${k}.p`)}</p>
          </article>
        ))}
      </div>

      <div className="xe-row">
        <ScoreBoosters />
        <AttentionPractice />
      </div>

      <div className="xp-cols">
        <section className="xs xs--factors" aria-labelledby="xs-fac">
          <XHead id="xs-fac" icon="pulse" eyebrow={t('ql.fac.eyebrow')} title={t('q.factors')} />
          {d.stStatus === 'loading' && !s ? (
            <XSkel rows={3} h={48} />
          ) : (
            <>
              <ul className="xfac">
                {factors.map((f, i) => (
                  <li key={f.id} className={cx(f.value == null ? 'is-none' : f.value >= 0.75 ? 'is-strong' : f.value >= 0.5 ? 'is-mid' : 'is-weak')} style={{ '--i': i, '--w': f.value ?? 0 }}>
                    <span className="xfac__icon" aria-hidden="true">
                      <Icon name={f.icon} size={16} />
                    </span>
                    <span className="xfac__label">{t(`ql.f.${f.id}`)}</span>
                    <span className="xfac__val">{f.text}</span>
                    <span className="xfac__bar" aria-hidden="true">
                      <i />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="xsw">
                <div className="xsw__col is-strong">
                  <p className="xsw__t">
                    <Icon name="thumb" size={16} /> {t('ql.strengths')}
                  </p>
                  <p>{strong.length ? strong.map((f) => t(`ql.f.${f.id}`)).join(', ') : t('ql.none.strong')}</p>
                </div>
                <div className="xsw__col is-weak">
                  <p className="xsw__t">
                    <Icon name="target" size={16} /> {t('ql.improve')}
                  </p>
                  <p>{weak.length ? weak.map((f) => t(`ql.f.${f.id}`)).join(', ') : t('ql.none.weak')}</p>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="xs xs--recs" aria-labelledby="xs-recs">
          <XHead id="xs-recs" icon="sparkles" eyebrow={t('ql.recs.eyebrow')} title={t('ql.recs')} />
          <ol className="xrecs">
            {recs.map((r, i) => (
              <li key={i} style={{ '--i': i }}>
                <span className="xrecs__icon" aria-hidden="true">
                  <Icon name={r.icon} size={18} />
                </span>
                <span>{r.text}</span>
                {r.to && (
                  <MLink to={r.to} className="mb-linkbtn">
                    {r.cta}
                  </MLink>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <TrustedBadge />
      {engageOn('report') ? (
        <QualityReport />
      ) : (
        <section className="xs xs--history" aria-labelledby="xs-hist">
          <XHead id="xs-hist" icon="calendar" eyebrow={t('ql.hist.eyebrow')} title={t('ql.hist')} />
          <XEmpty compact kind="history" title={t('ql.hist.empty.t')}>
            {t('ql.hist.empty.p')}
          </XEmpty>
        </section>
      )}
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
  const teen = me.type === 'teen';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.link);
      toast(t('rf.copied'));
      feedback('success');
    } catch {
      /* clipboard blocked */
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
    if (!list.length) return setErr(t('rf.noEmail'));
    if (list.some((x) => !EMAIL.test(x))) return setErr(t('rf.badEmail'));
    if (list.length > 20) return setErr(t('rf.tooMany'));
    setErr('');
    setBusy(true);
    try {
      const res = await actions.invite([...new Set(list)]);
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
  const rows = r?.rows || [];
  const verified = rows.filter((x) => x.status === 'verified').length;
  const journey = [
    { id: 'you', icon: 'user', n: null, label: t('xt.you') },
    { id: 'invited', icon: 'send', n: r ? r.invited : null, label: t('rj.invited') },
    { id: 'joined', icon: 'users', n: r ? r.joined : null, label: t('rj.joined') },
    { id: 'verified', icon: 'check', n: r ? verified : null, label: t('rj.activated') },
    { id: 'participated', icon: 'clipboard', n: null, label: t('rj.participated'), note: t('rj.notTracked') },
    !teen && { id: 'reward', icon: 'gift', n: null, label: t('rj.reward'), note: t('rj.rules') }
  ].filter(Boolean);
  return (
    <div className="xp xp--referrals">
      <PageHero
        kind="referrals"
        artFirst
        eyebrow={t('rj.eyebrow')}
        title={t(teen ? 'rf.teenTitle' : 'rj.title')}
        lead={teen ? t('rf.teenNote') : t('rj.lead')}
        art={status === 'ready' ? <ReferralWeb rows={rows} label={tn('rf.count', r.joined)} /> : <span className="xph__artskel" aria-hidden="true" />}
      >
        {status === 'error' ? (
          <XError text={t('st8.error')} onRetry={retry} />
        ) : !r ? (
          <XSkel rows={2} h={46} />
        ) : (
          <>
            <p className="xrf__count">
              <Counter value={r.joined} /> <span>{tn('rf.count', r.joined).replace(/^\S+\s/, '')}</span>
            </p>
            {r.link && (
              <div className="xrf__link">
                <label htmlFor="xrf-link" className="mb-sr">
                  {t('rf.link')}
                </label>
                <input id="xrf-link" className="mb-input mb-input--mono" readOnly value={r.link} onFocus={(e) => e.target.select()} />
                <Button icon="copy" onClick={copy}>
                  {t('rf.copy')}
                </Button>
                <Button variant="ghost" icon="send" onClick={share}>
                  {t('rf.share')}
                </Button>
              </div>
            )}
            {!teen && <p className="xph__note">{t('rf.rewardNote')}</p>}
          </>
        )}
      </PageHero>

      {r && <ShareKit link={r.link} />}
      {me.type === 'consumer' && <ReferralLeaderboard />}
      {r && <ReferralMilestones joined={r.joined} />}
      <section className="xs xs--journey" aria-labelledby="xs-rj">
        <XHead id="xs-rj" icon="route" eyebrow={t('rj.j.eyebrow')} title={t('rj.j.title')} sub={t('rj.j.sub')} />
        <ol className="xrj">
          {journey.map((s, i) => (
            <li key={s.id} className={cx('xrj__node', `is-${s.id}`, s.n > 0 && 'is-on', s.note && 'is-soft')} style={{ '--i': i }}>
              <span className="xrj__orb" aria-hidden="true">
                <Icon name={s.icon} size={20} />
              </span>
              <span className="xrj__label">{s.label}</span>
              <span className="xrj__n">{s.n == null ? s.note || '' : fmt(s.n)}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="xp-cols">
        <section className="xs xs--refhist" aria-labelledby="xs-rh">
          <XHead id="xs-rh" icon="clock" title={t('rf.history')} />
          {!r ? (
            <XSkel rows={3} h={52} />
          ) : rows.length ? (
            <ul className="xrh">
              {rows.map((x, i) => (
                <li key={x.email || i} className={`is-${x.status}`} style={{ '--i': i }}>
                  <span className="xrh__avatar" aria-hidden="true">
                    {(x.name || x.email || '?')[0].toUpperCase()}
                  </span>
                  <span className="xrh__text">
                    <strong>{x.name || x.email}</strong>
                    <small>{relTime(x.joinedAt || x.sentAt)}</small>
                  </span>
                  <span className="xrh__steps" aria-hidden="true">
                    <i className="is-on" />
                    <i className={cx(x.status !== 'invited' && 'is-on')} />
                    <i className={cx(x.status === 'verified' && 'is-on')} />
                  </span>
                  <Badge tone={x.status === 'verified' ? 'success' : x.status === 'joined' ? 'primary' : 'neutral'}>{t(`rf.status.${x.status}`)}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <XEmpty kind="referrals" title={t('rf.empty.t')}>
              {t('rf.empty.p')}
            </XEmpty>
          )}
        </section>
        <div className="xp-side">
          {!teen && (
            <section className="xs xs--invite" aria-labelledby="xs-inv">
              <XHead id="xs-inv" icon="mail" title={t('rf.invite')} />
              <form onSubmit={send} noValidate>
                <Field id="mb-inv" label={t('rf.inviteLabel')} error={err} hint={t('rf.inviteHint')}>
                  <textarea
                    id="mb-inv"
                    className={cx('mb-input', err && 'is-invalid')}
                    rows={3}
                    value={emails}
                    placeholder={t('rf.invitePh')}
                    aria-invalid={!!err}
                    onChange={(e) => {
                      setEmails(e.target.value);
                      if (err) setErr('');
                    }}
                  />
                </Field>
                <Button type="submit" busy={busy} icon="send" className="mb-wide">
                  {busy ? t('rf.sending') : t('rf.send')}
                </Button>
              </form>
            </section>
          )}
          <SocialFollow />
        </div>
      </div>
      {r && <NudgeFriends rows={rows} />}
    </div>
  );
}

/** "Stay connected": the existing follow-and-verify flow. */
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
      toast(t('so.sent'));
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
    <section className="xs xs--social" aria-labelledby="xs-so">
      <XHead id="xs-so" icon="heart" title={t('so.title')} sub={t('so.sub')} />
      {status === 'loading' ? (
        <XSkel rows={3} h={44} />
      ) : status === 'error' ? (
        <XError onRetry={retry} />
      ) : (
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
                  <Badge tone="success" icon="check">
                    +{s.points}
                  </Badge>
                ) : st === 'pending' ? (
                  <Badge tone="warning" icon="clock">
                    {t('so.pending')}
                  </Badge>
                ) : st === 'followed' ? (
                  <Button size="sm" onClick={() => setOpen(s.platform)}>
                    {t('so.verify')}
                  </Button>
                ) : (
                  <a className="mb-btn mb-btn--secondary mb-btn--sm" href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => setFollowed((f) => ({ ...f, [s.platform]: true }))}>
                    <span className="mb-btn__label">{t('so.follow', { n: s.points })}</span>
                  </a>
                )}
                {open === s.platform && (
                  <form className="mb-social__form" onSubmit={submit}>
                    <Field id={`h-${s.platform}`} label={t('so.handle', { p: s.platform })} error={!handle.trim() && busy ? t('so.need') : ''}>
                      <input id={`h-${s.platform}`} className="mb-input" value={handle} onChange={(e) => setHandle(e.target.value)} />
                    </Field>
                    <Field id={`f-${s.platform}`} label={t('so.shot')}>
                      <input id={`f-${s.platform}`} className="mb-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </Field>
                    <div className="mb-row">
                      <Button type="submit" size="sm" busy={busy} disabled={!handle.trim() || !file}>
                        {t('so.submit')}
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
      )}
    </section>
  );
}

/* ================= activity ================= */
const RANGES = { 30: 30, 90: 90, 365: 365, all: null };
const ACT_ICON = { complete: 'check', terminate: 'x', dropout: 'clock', overquota: 'lock' };
export function ActivityPage() {
  const [list, status, retry] = useSection('activity');
  const [stats] = useSection('stats');
  const [filter, setFilter] = useState('all');
  const [range, setRange] = useState('90');
  const [cat, setCat] = useState('all');
  const [why, setWhy] = useState(null);
  const closeWhy = useCallback(() => setWhy(null), []);
  const cats = useMemo(() => [...new Set((list || []).map((a) => a.category).filter(Boolean))].sort(), [list]);
  const items = useMemo(() => {
    const days = RANGES[range];
    const since = days ? Date.now() - days * 864e5 : 0;
    return (list || []).filter((a) => (filter === 'all' || a.status === filter) && (cat === 'all' || a.category === cat) && new Date(a.date || 0).getTime() >= since);
  }, [list, filter, range, cat]);
  const months = useMemo(() => {
    const g = [];
    items.forEach((a) => {
      let label = '';
      try {
        label = new Date(a.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      } catch {
        label = '';
      }
      const last = g[g.length - 1];
      if (last && last.label === label) last.items.push(a);
      else g.push({ label, items: [a] });
    });
    return g;
  }, [items]);
  const earnedPts = items.reduce((n, a) => n + (a.points || 0), 0);
  const band = [
    ['clipboard', 'ac.s.total', stats?.total],
    ['check', 'ac.s.complete', stats?.complete],
    ['x', 'ac.s.disq', stats?.disqualified],
    ['clock', 'ac.s.abandoned', stats?.abandoned]
  ];
  return (
    <div className="xp xp--activity">
      <section className="xact-hero" aria-labelledby="xact-t">
        <div className="xact-hero__text">
          <p className="xph__eyebrow">{t('av2.eyebrow')}</p>
          <h1 id="xact-t">{t('av2.title')}</h1>
          <p className="xph__lead">{t('av2.lead')}</p>
        </div>
        <ul className="xact-band">
          {band.map(([icon, k, v], i) => (
            <li key={k} style={{ '--i': i }} className={`is-${i}`}>
              <span className="xact-band__icon" aria-hidden="true">
                <Icon name={icon} size={18} />
              </span>
              <strong>{v == null ? '—' : <Counter value={v} />}</strong>
              <span>{t(k)}</span>
            </li>
          ))}
        </ul>
        <svg className="xact-hero__wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C150 0 300 60 450 30 S750 0 900 30 S1100 60 1200 30 V60 H0 Z" />
        </svg>
      </section>

      <YearInReview />
      <ActivityHeatmap />

      <section className="xs xs--river" aria-labelledby="xs-river">
        <XHead id="xs-river" icon="pulse" title={t('ac.title')} sub={items.length ? t('av2.summary', { n: items.length, p: fmt(earnedPts) }) : undefined} />
        <div className="xriver__tools">
          <div className="xs-filters" role="group" aria-label={t('ac.title')}>
            {['all', 'complete', 'terminate', 'dropout'].map((v) => (
              <button key={v} type="button" className={cx('xs-chip', filter === v && 'is-on')} aria-pressed={filter === v} onClick={() => setFilter(v)}>
                {t(`ac.filter.${v}`)}
              </button>
            ))}
          </div>
          {cats.length > 1 && (
            <label className="mb-select">
              <span className="mb-sr">{t('g.cat')}</span>
              <Icon name="layers" size={16} />
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="all">{t('g.cat.all')}</option>
                {cats.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}
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
        {status === 'error' ? (
          <XError text={t('ac.err')} onRetry={retry} />
        ) : status !== 'ready' ? (
          <XSkel rows={4} h={56} />
        ) : !list.length ? (
          <XEmpty kind="activity" title={t('ac.empty.t')} action={<Button to="surveys" size="sm" iconEnd="external">{t('nav.surveys')}</Button>}>
            {t('ac.empty.p')}
          </XEmpty>
        ) : !items.length ? (
          <XEmpty compact kind="activity" title={t('av2.none')} />
        ) : (
          <div className="xriver">
            {months.map((m) => (
              <section key={m.label} className="xriver__month">
                <h3 className="xriver__label">{m.label}</h3>
                <ol>
                  {m.items.map((a, i) => (
                    <li key={a.id} className={cx('xriver__item', `is-${a.status}`)} style={{ '--i': i }}>
                      <span className="xriver__node" aria-hidden="true">
                        <Icon name={ACT_ICON[a.status] || 'pulse'} size={14} strokeWidth={2.6} />
                      </span>
                      <div className="xriver__card">
                        <p className="xriver__what">{t(`ac.${a.status}`) === `ac.${a.status}` ? t('ac.other') : t(`ac.${a.status}`)}</p>
                        <p className="xriver__name">{a.name}</p>
                        <p className="xriver__when">{relTime(a.date)}</p>
                      </div>
                      {a.points > 0 ? (
                        <span className="xriver__pts">+{fmt(a.points)}</span>
                      ) : a.status === 'terminate' && engageOn('screenout') ? (
                        <button type="button" className="mb-linkbtn" onClick={() => setWhy(a.name)}>
                          {t('g.so.why')}
                        </button>
                      ) : a.status === 'dropout' && a.source === 'internal' ? (
                        <MLink to="surveys" className="mb-linkbtn">
                          {t('ac.resume')}
                        </MLink>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}
      </section>
      <ScreenOutHelp open={!!why} name={why} onClose={closeWhy} />
    </div>
  );
}
