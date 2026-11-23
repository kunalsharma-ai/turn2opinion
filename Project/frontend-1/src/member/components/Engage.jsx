// Engagement features (Round 17). Each block reads data/engage.js. On the live site those blocks
// render nothing until their API exists (engageOn), so nothing is promised that cannot be delivered.
// Instant alerts is real: it saves the existing communication-methods answer.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMe, useMemberData, useSection } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { engageData, engageMemo, engageOn } from '../data/engage.js';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Button, Icon, Modal, Toggle, cx, useToast, prefersReducedMotion } from './ui.jsx';
import { XEmpty, XHead, XSkel, useDash } from './Sections.jsx';

const today = () => new Date().toISOString().slice(0, 10);
const daysLeft = (d) => Math.max(0, Math.ceil((new Date(d) - Date.now()) / 864e5));
const preview = (toast, text) => toast(`${text} ${t('e.previewNote')}`, 'info');

export function useEngage() {
  const me = useMe();
  return useMemo(() => engageData(me.type), [me.type]);
}

/** A cut gem, coloured per tier. Used for tiers and expert levels (never stars). */
export function Gem({ tone = 'silver', size = 34 }) {
  return (
    <svg className={cx('xgem', `is-${tone.toLowerCase()}`)} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 4h24l8 11-20 23L0 15z" className="xgem__body" />
      <path d="M0 15h40M8 4l6 11 6-11 6 11 6-11M14 15l6 23 6-23" className="xgem__cut" />
    </svg>
  );
}

/* ============================ all members ============================ */
export function StreakCard() {
  const e = useEngage();
  const toast = useToast();
  const [claimed, setClaimed] = useState(() => engageMemo.get().claimed === today());
  if (!engageOn('streak') || !e) return null;
  const s = e.streak;
  const labels = t('e.week').split(',');
  const claim = () => {
    engageMemo.set({ claimed: today() });
    setClaimed(true);
    feedback('points');
    preview(toast, t('e.streak.added', { n: s.bonus }));
  };
  return (
    <section className="xe2 xe2--streak" aria-labelledby="xe-streak">
      <div className="xe2__top">
        <span className={cx('xstreak__flame', s.days > 0 && 'is-lit')} aria-hidden="true">
          <Icon name="bolt" size={26} />
        </span>
        <div>
          <p className="xe2__k" id="xe-streak">
            {t('e.streak')}
          </p>
          <p className="xe2__big">{tn('e.streak.days', s.days)}</p>
        </div>
      </div>
      <ol className="xstreak__week" aria-label={t('e.streak.week')}>
        {s.week.map((on, i) => (
          <li key={i} className={cx(on && 'is-on', i === 6 && 'is-today')} style={{ '--i': i }}>
            <span aria-hidden="true">{on ? <Icon name="check" size={12} strokeWidth={3} /> : null}</span>
            <small>{labels[i]}</small>
            <b className="mb-sr">{on ? t('e.streak.yes') : t('e.streak.no')}</b>
          </li>
        ))}
      </ol>
      <p className="xe2__hint">{t('e.streak.best', { n: s.best })}</p>
      {claimed ? (
        <p className="xe2__done">
          <Icon name="check" size={16} strokeWidth={3} /> {t('e.streak.claimed')}
        </p>
      ) : (
        <Button size="sm" icon="gift" onClick={claim}>
          {t('e.streak.claim', { n: s.bonus })}
        </Button>
      )}
    </section>
  );
}

export function MonthlyGoal() {
  const e = useEngage();
  const d = useDash();
  if (!engageOn('goal') || !e) return null;
  const now = new Date();
  // real progress: surveys completed this calendar month, from the activity feed
  const done = (d.activity || []).filter((a) => {
    const x = new Date(a.date);
    return a.status === 'complete' && x.getMonth() === now.getMonth() && x.getFullYear() === now.getFullYear();
  }).length;
  const { target, bonus } = e.goal;
  const pct = Math.min(1, done / target);
  const month = now.toLocaleDateString(undefined, { month: 'long' });
  const left = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  return (
    <section className="xe2 xe2--goal" aria-labelledby="xe-goal">
      <p className="xe2__k" id="xe-goal">
        {t('e.goal', { month })}
      </p>
      <div className="xgoal">
        <span className="xgoal__ring" style={{ '--p': pct }} aria-hidden="true">
          <b>{Math.round(pct * 100)}%</b>
        </span>
        <div>
          <p className="xe2__big">{pct >= 1 ? t('e.goal.done') : t('e.goal.of', { a: done, b: target })}</p>
          <p className="xe2__hint">{pct >= 1 ? tn('e.goal.surveys', done) : t('e.goal.sub')}</p>
        </div>
      </div>
      <span className="xgoal__bar" role="progressbar" aria-label={t('e.goal', { month })} aria-valuemin={0} aria-valuemax={target} aria-valuenow={Math.min(done, target)}>
        <i style={{ '--w': pct }} />
      </span>
      <p className="xe2__hint">{pct >= 1 ? t('e.goal.hit', { n: fmt(bonus) }) : t('e.goal.bonus', { n: fmt(bonus), d: left })}</p>
    </section>
  );
}

/** One-tap poll. After voting the live results animate in. */
export function QuickPoll({ teen }) {
  const e = useEngage();
  const [vote, setVote] = useState(null);
  useEffect(() => {
    if (e) setVote(engageMemo.get().votes?.[e.poll.id] || null);
  }, [e]);
  if (!engageOn('polls') || !e) return null;
  const p = e.poll;
  const opts = p.options.map(([id, label, n]) => ({ id, label, n: n + (vote === id ? 1 : 0) }));
  const total = opts.reduce((n, o) => n + o.n, 0);
  const top = Math.max(...opts.map((o) => o.n));
  const cast = (id) => {
    const votes = { ...(engageMemo.get().votes || {}), [p.id]: id };
    engageMemo.set({ votes });
    setVote(id);
    feedback('success');
  };
  return (
    <section className={cx('xs xs--poll', teen && 'is-teen')} aria-labelledby="xe-poll">
      <XHead id="xe-poll" icon="chat" eyebrow={teen ? t('e.poll.teen') : t('e.poll.eyebrow')} title={p.q} sub={vote ? tn('e.poll.votes', total) : t('e.poll.sub')} />
      {!vote ? (
        <div className="xpoll" role="group" aria-label={p.q}>
          {opts.map((o, i) => (
            <button key={o.id} type="button" className="xpoll__opt" style={{ '--i': i }} onClick={() => cast(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
      ) : (
        <ul className="xpoll__res" aria-live="polite">
          {opts.map((o, i) => {
            const pc = Math.round((o.n / total) * 100);
            return (
              <li key={o.id} className={cx(o.id === vote && 'is-mine', o.n === top && 'is-top')} style={{ '--w': o.n / total, '--i': i }}>
                <span className="xpoll__bar" aria-hidden="true" />
                <span className="xpoll__label">
                  {o.label}
                  {o.id === vote && <em>{t('e.poll.you')}</em>}
                </span>
                <span className="xpoll__pc">{pc}%</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function ImpactStories({ limit }) {
  const e = useEngage();
  if (!engageOn('stories') || !e) return null;
  return (
    <section className="xs xs--stories" aria-labelledby="xe-stories">
      <XHead id="xe-stories" icon="sparkles" eyebrow={t('e.stories.eyebrow')} title={t('e.stories')} sub={t('e.stories.sub')} />
      {!e.stories.length ? (
        <XEmpty compact kind="activity" title={t('e.stories.empty')} />
      ) : (
        <ul className="xstory">
          {e.stories.slice(0, limit || e.stories.length).map((s, i) => (
            <li key={s.id} className="xstory__card" style={{ '--i': i }}>
              <span className="xstory__icon" aria-hidden="true">
                <Icon name={s.icon} size={20} />
              </span>
              <p className="xstory__because">{t('e.stories.because', { s: s.survey })}</p>
              <p className="xstory__change">{s.change}</p>
              <p className="xstory__when">{relTime(s.when)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Instant alerts. WhatsApp is the existing communication-methods answer, so this one is live. */
export function InstantAlerts() {
  const me = useMe();
  const [ans, status] = useSection('answers');
  const { patchSection } = useMemberData();
  const toast = useToast();
  const [push, setPush] = useState(() => !!engageMemo.get().push);
  const teen = me.type === 'teen';
  const list = Array.isArray(ans?.['communication-methods']) ? ans['communication-methods'] : [];
  const wa = list.includes('whatsapp');
  const setWa = async (v) => {
    const next = v ? [...new Set([...list, 'whatsapp'])] : list.filter((x) => x !== 'whatsapp');
    try {
      await actions.saveChannels(next);
      patchSection('answers', (a) => ({ ...(a || {}), 'communication-methods': next }));
      toast(t('st.saved'));
    } catch (x) {
      toast(x.message || t('st8.error'), 'error');
    }
  };
  return (
    <section className="xe2 xe2--alerts" aria-labelledby="xe-alerts">
      <div className="xe2__top">
        <span className="xalert__bell" aria-hidden="true">
          <Icon name="bell" size={22} />
        </span>
        <div>
          <p className="xe2__k" id="xe-alerts">
            {t('e.alerts')}
          </p>
          <p className="xe2__hint">{teen ? t('e.alerts.teen') : t('e.alerts.sub')}</p>
        </div>
      </div>
      {status !== 'ready' ? (
        <XSkel rows={2} h={30} />
      ) : teen ? (
        <ul className="xalert__teen">
          <li>
            <Icon name="mail" size={16} /> {t('st.n.email')}
          </li>
          <li>
            <Icon name="dashboard" size={16} /> {t('st.n.dashboard')}
          </li>
        </ul>
      ) : (
        <div className="mb-toggles">
          <Toggle label={t('st.n.whatsapp')} description={t('e.alerts.wa')} checked={wa} onChange={setWa} />
          {engageOn('push') && (
            <Toggle
              label={t('e.alerts.push')}
              description={t('e.alerts.push.d')}
              checked={push}
              onChange={(v) => {
                engageMemo.set({ push: v });
                setPush(v);
                if (v) preview(toast, t('e.alerts.push.on'));
              }}
            />
          )}
        </div>
      )}
    </section>
  );
}

/** Streak, monthly goal and alerts side by side, right under the hero. */
export function EngageStrip() {
  return (
    <div className="xe-strip">
      <StreakCard />
      <MonthlyGoal />
      <InstantAlerts />
    </div>
  );
}

/* ============================ consumers ============================ */
export const TIERS = [
  { id: 'bronze', at: 0 },
  { id: 'silver', at: 5 },
  { id: 'gold', at: 15 },
  { id: 'platinum', at: 30 },
  { id: 'diamond', at: 60 }
];
export function GemTiers({ full }) {
  const e = useEngage();
  const d = useDash();
  if (!engageOn('tiers') || !e) return null;
  const done = d.stats?.complete || 0;
  const idx = TIERS.reduce((n, x, i) => (done >= x.at ? i : n), 0);
  const next = TIERS[idx + 1];
  const cur = TIERS[idx];
  const pct = next ? (done - cur.at) / (next.at - cur.at) : 1;
  return (
    <section className={cx('xs xs--tiers', full && 'is-full')} aria-labelledby="xe-tiers">
      <XHead id="xe-tiers" icon="trophy" eyebrow={t('e.tier.eyebrow')} title={t('e.tier.title', { tier: t(`e.tier.${cur.id}`) })} sub={next ? t('e.tier.next', { n: next.at - done, tier: t(`e.tier.${next.id}`) }) : t('e.tier.top')} />
      <div className="xtier__now">
        <span className="xtier__gem">
          <Gem tone={cur.id} size={72} />
        </span>
        <div className="xtier__bar">
          <span role="progressbar" aria-label={t('e.tier.eyebrow')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct * 100)}>
            <i style={{ '--w': pct }} />
          </span>
          <p>{t('e.tier.perks')}: {t(`e.tier.${cur.id}.p`)}</p>
        </div>
      </div>
      <ol className="xtier__ladder">
        {TIERS.map((x, i) => (
          <li key={x.id} className={cx(i <= idx && 'is-on', i === idx && 'is-now')} style={{ '--i': i }}>
            <Gem tone={x.id} size={full ? 40 : 30} />
            <strong>{t(`e.tier.${x.id}`)}</strong>
            <small>{tn('e.tier.at', x.at)}</small>
            {full && <span className="xtier__perk">{t(`e.tier.${x.id}.p`)}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProductTests() {
  const e = useEngage();
  const toast = useToast();
  const [applied, setApplied] = useState(() => engageMemo.get().tests || []);
  if (!engageOn('tests') || !e) return null;
  const apply = (id) => {
    const next = [...applied, id];
    engageMemo.set({ tests: next });
    setApplied(next);
    feedback('success');
    preview(toast, t('e.test.applied'));
  };
  return (
    <section className="xs xs--tests" aria-labelledby="xe-tests">
      <XHead id="xe-tests" icon="bag" eyebrow={t('e.test.eyebrow')} title={t('e.test.title')} sub={t('e.test.sub')} />
      {!e.tests.length ? (
        <XEmpty compact kind="surveys" title={t('e.test.empty')} />
      ) : (
        <ul className="xtest">
          {e.tests.map((x, i) => {
            const is = x.status === 'applied' || applied.includes(x.id);
            return (
              <li key={x.id} className={cx('xtest__card', is && 'is-applied')} style={{ '--i': i }}>
                <span className="xtest__box" aria-hidden="true">
                  <Icon name="bag" size={26} />
                  <i />
                </span>
                <p className="xtest__cat">{x.category}</p>
                <h3>{x.product}</h3>
                <p className="xtest__meta">
                  <span>
                    <Icon name="home" size={14} /> {x.length}
                  </span>
                  <span>
                    <Icon name="users" size={14} /> {t('e.test.spots', { n: x.spots })}
                  </span>
                  <span>
                    <Icon name="clock" size={14} /> {tn('e.test.closes', daysLeft(x.closes))}
                  </span>
                </p>
                {is ? (
                  <p className="xe2__done">
                    <Icon name="check" size={16} strokeWidth={3} /> {t('e.test.applied.s')}
                  </p>
                ) : (
                  <Button size="sm" iconEnd="arrow" onClick={() => apply(x.id)}>
                    {t('e.test.apply')}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function LuckySpin() {
  const e = useEngage();
  const toast = useToast();
  const [left, setLeft] = useState(null);
  const [angle, setAngle] = useState(0);
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  if (!engageOn('spin') || !e) return null;
  const spins = left ?? e.spins;
  const prizes = e.prizes;
  const seg = 360 / prizes.length;
  const spin = () => {
    if (!spins || busy) return;
    const pick = Math.floor(Math.random() * prizes.length);
    const target = angle + 360 * 5 + (360 - pick * seg - seg / 2) - (angle % 360);
    setBusy(true);
    setWon(null);
    setAngle(target);
    timer.current = setTimeout(
      () => {
        setBusy(false);
        setLeft(spins - 1);
        setWon(prizes[pick]);
        feedback('achievement');
        preview(toast, t('e.spin.won', { p: prizes[pick] }));
      },
      prefersReducedMotion() ? 50 : 4200
    );
  };
  const colors = ['#ff5a5f', '#ffb703', '#7b5cff', '#10b981', '#0b8bd6', '#e23d8f', '#f97316', '#14b8a6'];
  return (
    <section className="xs xs--spin" aria-labelledby="xe-spin">
      <XHead id="xe-spin" icon="gift" eyebrow={t('e.spin.eyebrow')} title={t('e.spin.title')} sub={t('e.spin.sub')} />
      <div className="xspin">
        <div className="xspin__wheelwrap">
          <span className="xspin__pin" aria-hidden="true" />
          <svg className="xspin__wheel" viewBox="-100 -100 200 200" style={{ transform: `rotate(${angle}deg)` }} aria-hidden="true">
            {prizes.map((p, i) => {
              const a0 = ((i * seg - 90) * Math.PI) / 180;
              const a1 = (((i + 1) * seg - 90) * Math.PI) / 180;
              const mid = i * seg + seg / 2;
              return (
                <g key={i}>
                  <path d={`M0 0 L${Math.cos(a0) * 96} ${Math.sin(a0) * 96} A96 96 0 0 1 ${Math.cos(a1) * 96} ${Math.sin(a1) * 96} Z`} fill={colors[i % colors.length]} />
                  <text transform={`rotate(${mid}) translate(0 -58) rotate(90)`} className="xspin__txt">
                    {p.replace(' points', '').replace('Prize draw entry', 'Draw')}
                  </text>
                </g>
              );
            })}
            <circle r="18" className="xspin__hub" />
          </svg>
        </div>
        <div className="xspin__side">
          <p className="xe2__big">{tn('e.spin.left', spins)}</p>
          <p className="xe2__hint">{t('e.spin.how')}</p>
          {won && (
            <p className="xspin__won" role="status">
              <Icon name="sparkles" size={16} /> {t('e.spin.youWon', { p: won })}
            </p>
          )}
          <Button icon="refresh" busy={busy} disabled={!spins} onClick={spin}>
            {spins ? t('e.spin.go') : t('e.spin.none')}
          </Button>
          <p className="xe2__fine">{t('e.spin.rules')}</p>
        </div>
      </div>
    </section>
  );
}

export function ReferralLeaderboard() {
  const e = useEngage();
  if (!engageOn('leaderboard') || !e || !e.board) return null;
  const month = new Date().toLocaleDateString(undefined, { month: 'long' });
  const [a, b, c, ...rest] = e.board;
  return (
    <section className="xs xs--board" aria-labelledby="xe-board">
      <XHead id="xe-board" icon="trophy" eyebrow={t('e.board.eyebrow', { month })} title={t('e.board.title')} sub={e.boardPrize} />
      {!e.board.length ? (
        <XEmpty compact kind="referrals" title={t('e.board.empty')} />
      ) : (
        <>
          <ol className="xpodium" aria-label={t('e.board.top')}>
            {[b, a, c].filter(Boolean).map((r) => {
              const rank = e.board.indexOf(r) + 1;
              return (
                <li key={r[0]} className={cx(`is-${rank}`, r[2] && 'is-you')}>
                  <span className="xpodium__av">{r[0][0]}</span>
                  <strong>{r[0]}</strong>
                  <small>{tn('e.board.friends', r[1])}</small>
                  <span className="xpodium__step">{rank}</span>
                </li>
              );
            })}
          </ol>
          <ol className="xboard" start={4}>
            {rest.map((r, i) => (
              <li key={r[0]} className={cx(r[2] && 'is-you')}>
                <span className="xboard__rank">{i + 4}</span>
                <span className="xboard__name">
                  {r[0]}
                  {r[2] && <em>{t('xt.you')}</em>}
                </span>
                <span className="xboard__n">{tn('e.board.friends', r[1])}</span>
              </li>
            ))}
          </ol>
          <p className="xe2__fine">{t('e.board.fine')}</p>
        </>
      )}
    </section>
  );
}

/* ============================ professionals ============================ */
export function ExpertBadges() {
  const e = useEngage();
  if (!engageOn('experts') || !e?.experts) return null;
  return (
    <section className="xs xs--experts" aria-labelledby="xe-exp">
      <XHead id="xe-exp" icon="briefcase" eyebrow={t('e.exp.eyebrow')} title={t('e.exp.title')} sub={t('e.exp.sub')} />
      <ul className="xexp">
        {e.experts.map((x, i) => {
          const done = x.have >= x.goal;
          return (
            <li key={x.id} className={cx('xexp__card', done ? 'is-on' : 'is-locked')} style={{ '--i': i, '--p': Math.min(1, x.have / x.goal) }}>
              <span className="xexp__medal">
                <Gem tone={x.level} size={44} />
              </span>
              <p className="xexp__level">{t('e.exp.level', { l: x.level })}</p>
              <h3>{x.industry}</h3>
              <span className="xexp__bar" aria-hidden="true">
                <i />
              </span>
              <p className="xexp__prog">{t('e.exp.prog', { a: x.have, b: x.goal })}</p>
              <p className="xexp__unlock">
                <Icon name={done ? 'check' : 'lock'} size={14} strokeWidth={2.6} /> {done ? t('e.exp.unlocked', { u: x.unlocks }) : t('e.exp.unlocks', { u: x.unlocks })}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function BenchmarkReport() {
  const e = useEngage();
  if (!engageOn('benchmark') || !e?.bench) return null;
  return (
    <section className="xs xs--bench" aria-labelledby="xe-bench">
      <XHead id="xe-bench" icon="pulse" eyebrow={t('e.bench.eyebrow')} title={t('e.bench.title')} sub={t('e.bench.sub', { n: fmt(e.benchPeers) })} />
      <ul className="xbench">
        {e.bench.map((m, i) => {
          const max = Math.max(m.you, m.peers) * 1.15 || 1;
          return (
            <li key={m.id} style={{ '--i': i }}>
              <p className="xbench__label">{m.label}</p>
              <div className="xbench__row is-you">
                <span>{t('xt.you')}</span>
                <span className="xbench__bar">
                  <i style={{ '--w': m.you / max }} />
                </span>
                <b>
                  {m.you}
                  {m.unit}
                </b>
              </div>
              <div className="xbench__row is-peers">
                <span>{t('e.bench.peers')}</span>
                <span className="xbench__bar">
                  <i style={{ '--w': m.peers / max }} />
                </span>
                <b>
                  {m.peers}
                  {m.unit}
                </b>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="xe2__fine">
        <Icon name="lock" size={13} /> {t('e.bench.anon')}
      </p>
    </section>
  );
}

export function CharityDonate() {
  const e = useEngage();
  const d = useDash();
  const toast = useToast();
  const [pick, setPick] = useState(null);
  const [amount, setAmount] = useState(1000);
  if (!engageOn('donate') || !e?.charities) return null;
  const p = d.points;
  // Donations open from a small minimum, well below the cash-out threshold.
  const MIN = 500;
  const open = p && p.total >= MIN;
  const max = open ? Math.max(MIN, Math.min(5000, Math.floor(p.total / MIN) * MIN)) : 5000;
  return (
    <section className="xs xs--charity" aria-labelledby="xe-ch">
      <XHead id="xe-ch" icon="heart" eyebrow={t('e.ch.eyebrow')} title={t('e.ch.title')} sub={t('e.ch.sub')} />
      <div className="xch" role="radiogroup" aria-label={t('e.ch.title')}>
        {e.charities.map((c) => (
          <button key={c.id} type="button" role="radio" aria-checked={pick === c.id} className={cx('xch__opt', pick === c.id && 'is-on')} onClick={() => setPick(c.id)}>
            <span className="xch__icon" aria-hidden="true">
              <Icon name={c.icon} size={22} />
            </span>
            <strong>{c.name}</strong>
            <small>{c.cause}</small>
          </button>
        ))}
      </div>
      <label className="xch__amt">
        <span>{t('e.ch.amount', { n: fmt(Math.min(amount, max)) })}</span>
        <input type="range" min={MIN} max={max} step={MIN} value={Math.min(amount, max)} onChange={(x) => setAmount(Number(x.target.value))} />
      </label>
      {open ? (
        <Button icon="heart" disabled={!pick} onClick={() => preview(toast, t('e.ch.done'))}>
          {t('e.ch.go')}
        </Button>
      ) : (
        <p className="xrw__lock xch__lock">
          <Icon name="lock" size={16} /> {t('e.ch.locked', { n: fmt(MIN) })}
        </p>
      )}
    </section>
  );
}

export function Certificates() {
  const e = useEngage();
  const me = useMe();
  if (!engageOn('certs') || !e?.certs) return null;
  const share = (c) => {
    const d = new Date(c.date);
    const q = new URLSearchParams({ startTask: 'CERTIFICATION_NAME', name: c.title, organizationName: 'Turn2Opinion', issueYear: String(d.getFullYear()), issueMonth: String(d.getMonth() + 1) });
    return `https://www.linkedin.com/profile/add?${q}`;
  };
  return (
    <section className="xs xs--certs" aria-labelledby="xe-cert">
      <XHead id="xe-cert" icon="flag" eyebrow={t('e.cert.eyebrow')} title={t('e.cert.title')} sub={t('e.cert.sub')} />
      <ul className="xcert">
        {e.certs.map((c, i) => (
          <li key={c.id} className={cx('xcert__item', c.locked && 'is-locked')} style={{ '--i': i }}>
            <div className="xcert__paper" aria-hidden={c.locked || undefined}>
              <span className="xcert__seal">
                <Gem tone="gold" size={34} />
              </span>
              <p className="xcert__org">Turn2Opinion</p>
              <p className="xcert__title">{c.title}</p>
              <p className="xcert__to">{t('e.cert.to', { name: me.fullName })}</p>
              <p className="xcert__meta">
                {tn('e.cert.studies', c.studies)} · {new Date(c.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </p>
            </div>
            {c.locked ? (
              <p className="xe2__fine">
                <Icon name="lock" size={13} /> {t('e.cert.locked')}
              </p>
            ) : (
              <a className="mb-btn mb-btn--primary mb-btn--sm xcert__li" href={share(c)} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={16} />
                <span className="mb-btn__label">{t('e.cert.share')}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================ teens ============================ */
export function LearningBadges() {
  const e = useEngage();
  const [open, setOpen] = useState(null);
  const [learned, setLearned] = useState(() => engageMemo.get().learned || []);
  if (!engageOn('learning') || !e?.learning) return null;
  const list = e.learning.map((b) => ({ ...b, done: b.done || learned.includes(b.id) }));
  const cur = list.find((b) => b.id === open);
  const finish = () => {
    const next = [...new Set([...learned, open])];
    engageMemo.set({ learned: next });
    setLearned(next);
    feedback('achievement');
    setOpen(null);
  };
  return (
    <section className="xs xs--learn" aria-labelledby="xe-learn">
      <XHead id="xe-learn" icon="cap" eyebrow={t('e.learn.eyebrow', { a: list.filter((b) => b.done).length, b: list.length })} title={t('e.learn.title')} sub={t('e.learn.sub')} />
      <ul className="xlearn">
        {list.map((b, i) => (
          <li key={b.id} style={{ '--i': i }}>
            <button type="button" className={cx('xlearn__badge', b.done && 'is-done')} onClick={() => setOpen(b.id)}>
              <span className="xlearn__hex" aria-hidden="true">
                <Icon name={b.done ? 'cap' : 'lock'} size={22} />
              </span>
              <strong>{b.title}</strong>
              <small>{b.done ? t('e.learn.earned') : t('e.learn.start')}</small>
            </button>
          </li>
        ))}
      </ul>
      <Modal open={!!cur} onClose={() => setOpen(null)} title={cur?.title || ''}>
        {cur && (
          <div className="xlesson">
            <span className="xlearn__hex is-big" aria-hidden="true">
              <Icon name="cap" size={30} />
            </span>
            <h2>{cur.title}</h2>
            <p>{cur.lesson}</p>
            <div className="mb-row">
              {cur.done ? (
                <Button onClick={() => setOpen(null)}>{t('common.close')}</Button>
              ) : (
                <>
                  <Button icon="check" onClick={finish}>
                    {t('e.learn.got')}
                  </Button>
                  <Button variant="ghost" onClick={() => setOpen(null)}>
                    {t('common.close')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export function SeasonChallenge() {
  const e = useEngage();
  if (!engageOn('season') || !e?.season) return null;
  const s = e.season;
  return (
    <section className="xseason" aria-labelledby="xe-season">
      <div className="xseason__bg" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ '--i': i, left: `${(i * 37) % 100}%` }} />
        ))}
      </div>
      <div className="xseason__head">
        <p className="xph__eyebrow">{t('e.season.eyebrow')}</p>
        <h2 id="xe-season">{s.name}</h2>
        <p className="xseason__ends">
          <Icon name="clock" size={15} /> {tn('e.season.ends', daysLeft(s.ends))}
        </p>
      </div>
      <ul className="xseason__list">
        {s.challenges.map((c, i) => {
          const done = c.have >= c.goal;
          return (
            <li key={c.id} className={cx(done && 'is-done')} style={{ '--i': i, '--w': Math.min(1, c.have / c.goal) }}>
              <span className="xseason__icon" aria-hidden="true">
                <Icon name={done ? 'check' : 'target'} size={18} strokeWidth={done ? 3 : 2} />
              </span>
              <span className="xseason__t">{c.title}</span>
              <span className="xseason__pts">+{c.pts}</span>
              <span className="xseason__bar" aria-hidden="true">
                <i />
              </span>
              <span className="xseason__n">{t('ach.progress', { a: Math.min(c.have, c.goal), b: c.goal })}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function GuardianSummary() {
  const e = useEngage();
  const d = useDash();
  const [g] = useSection('guardian');
  if (!engageOn('summary') || !e?.summary) return null;
  const s = e.summary;
  return (
    <section className="xs xs--summary" aria-labelledby="xe-sum">
      <XHead id="xe-sum" icon="mail" eyebrow={t('e.sum.eyebrow')} title={t('e.sum.title')} sub={t('e.sum.sub', { name: g?.name || s.to })} />
      <div className="xmail" aria-label={t('e.sum.preview')}>
        <p className="xmail__subject">
          <Icon name="mail" size={14} /> {t('e.sum.subject', { name: d.me.firstName })}
        </p>
        <ul className="xmail__stats">
          <li>
            <strong>{d.points ? fmt(d.points.total) : '…'}</strong>
            <span>{t('sum.points')}</span>
          </li>
          <li>
            <strong>{d.stats ? d.stats.complete : '…'}</strong>
            <span>{t('ac.s.complete')}</span>
          </li>
          <li>
            <strong>{(e.learning || []).filter((b) => b.done).length}</strong>
            <span>{t('e.sum.badges')}</span>
          </li>
        </ul>
        <p className="xmail__fine">{t('e.sum.fine')}</p>
      </div>
      <p className="xe2__hint">{t('e.sum.last', { when: relTime(s.last), f: t(`e.sum.${s.frequency}`) })}</p>
    </section>
  );
}

export function GiftCards() {
  const e = useEngage();
  const d = useDash();
  const toast = useToast();
  const [asked, setAsked] = useState(() => engageMemo.get().asked || []);
  if (!engageOn('giftcards') || !e?.cards) return null;
  const have = d.points?.total || 0;
  const ask = (id) => {
    const next = [...asked, id];
    engageMemo.set({ asked: next });
    setAsked(next);
    feedback('success');
    preview(toast, t('e.gift.asked'));
  };
  return (
    <section className="xs xs--gifts" aria-labelledby="xe-gift">
      <XHead id="xe-gift" icon="gift" eyebrow={t('e.gift.eyebrow')} title={t('e.gift.title')} sub={t('e.gift.sub')} />
      <ol className="xgift__steps" aria-label={t('e.gift.how')}>
        <li>
          <span>1</span>
          {t('e.gift.s1')}
        </li>
        <li>
          <span>2</span>
          {t('e.gift.s2')}
        </li>
        <li>
          <span>3</span>
          {t('e.gift.s3')}
        </li>
      </ol>
      <ul className="xgift">
        {e.cards.map((c, i) => {
          const can = have >= c.points;
          const is = asked.includes(c.id);
          return (
            <li key={c.id} className={cx('xgift__card', !can && 'is-locked', is && 'is-asked')} style={{ '--i': i }}>
              <span className="xgift__art" aria-hidden="true">
                <Icon name={c.icon} size={26} />
              </span>
              <strong>{c.name}</strong>
              <span className="xs-coin">
                <span className="mb-coin mb-coin--sm" aria-hidden="true" />
                {t('hdr.points', { n: fmt(c.points) })}
              </span>
              {is ? (
                <p className="xgift__wait">
                  <Icon name="clock" size={14} /> {t('e.gift.waiting')}
                </p>
              ) : can ? (
                <Button size="sm" icon="shield" onClick={() => ask(c.id)}>
                  {t('e.gift.ask')}
                </Button>
              ) : (
                <p className="xe2__fine">{t('e.gift.need', { n: fmt(c.points - have) })}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

