// Round 18: more reasons to come back, on the section pages (Rewards, Quality score, Referrals,
// Activity, My account, Settings). Same rule as Engage.jsx: anything that needs an API that does not
// exist yet is shown only in the design preview (engageOn). Everything marked live below is built only
// from data the site already has, or keeps its choice on the member's device.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMe, useSection } from '../data/MemberData.jsx';
import { engageMemo, engageOn } from '../data/engage.js';
import { store } from '../../utils/storage.js';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Badge, Button, Card, Icon, MLink, Modal, Segmented, Toggle, cx, useToast } from './ui.jsx';
import { ABOUT_YOU, XEmpty, XHead, XSkel, useDash } from './Sections.jsx';
import { useAchievements } from './Modules.jsx';
import { useEngage, Gem } from './Engage.jsx';
import { qrMatrix, qrPath } from './qr.js';

const preview = (toast, text) => toast(`${text} ${t('e.previewNote')}`, 'info');
const money = (pts, rate) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(pts * rate);
  } catch {
    return `$${(pts * rate).toFixed(2)}`;
  }
};
function useNow(every = 30000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), every);
    return () => clearInterval(id);
  }, [every]);
  return now;
}
const left = (iso, now) => {
  const ms = Math.max(0, new Date(iso) - now);
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms % 864e5) / 36e5);
  const m = Math.floor((ms % 36e5) / 6e4);
  return d ? t('g.time.dh', { d, h }) : h ? t('g.time.hm', { h, m }) : t('g.time.m', { m });
};

/** Draw on a canvas and save it as a PNG (used for share images). */
async function savePng(name, w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  await draw(ctx);
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  if (!blob) return null;
  const file = new File([blob], name, { type: 'image/png' });
  return file;
}
function download(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
async function shareOrDownload(file, text) {
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return;
    }
  } catch {
    /* cancelled: fall back to a download */
  }
  download(file);
}
function wrapText(ctx, text, x, y, max, lh) {
  const words = String(text).split(' ');
  let line = '';
  let yy = y;
  words.forEach((w, i) => {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > max && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else line = test;
    if (i === words.length - 1) ctx.fillText(line, x, yy);
  });
  return yy;
}
function drawQr(ctx, text, x, y, size) {
  const m = qrMatrix(text);
  const n = m.length + 8;
  const s = size / n;
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#121a3d';
  m.forEach((row, r) => row.forEach((on, c) => on && ctx.fillRect(x + (c + 4) * s, y + (r + 4) * s, Math.ceil(s), Math.ceil(s))));
}
const BG = { consumer: ['#ff5a5f', '#7b5cff'], pro: ['#0f766e', '#1e3a8a'], teen: ['#8b5cf6', '#0e7490'] };
const FONT = (w, px) => `${w} ${px}px Manrope, Inter, system-ui, sans-serif`;

/* ================================ rewards ================================ */
const GOAL_KEY = 't2o_member_goal';

/** Savings goal + points forecast. Live: built from points, activity and a choice kept on the device. */
export function SavingsGoal() {
  const d = useDash();
  const me = useMe();
  const toast = useToast();
  const teen = me.type === 'teen';
  const [goal, setGoal] = useState(() => store.get(GOAL_KEY, null));
  const [custom, setCustom] = useState('');
  if (!engageOn('savings')) return null;
  const p = d.points;
  if (!p) return <XSkel rows={2} h={60} />;
  const options = teen
    ? [
        { id: 'small', pts: 500 },
        { id: 'mid', pts: 1000 },
        { id: 'big', pts: 2500 }
      ]
    : [
        { id: 'payout', pts: p.threshold },
        { id: 'double', pts: p.threshold * 2 },
        { id: 'big', pts: p.threshold * 4 }
      ];
  const target = goal?.pts || options[0].pts;
  const pct = Math.min(1, p.total / target);
  const remaining = Math.max(0, target - p.total);
  const earnedSurveys = (d.activity || []).filter((a) => a.points > 0).slice(0, 20);
  const avg = earnedSurveys.length ? earnedSurveys.reduce((n, a) => n + a.points, 0) / earnedSurveys.length : 0;
  const surveysLeft = avg ? Math.ceil(remaining / avg) : null;
  const weekly = d.weeks.reduce((n, v) => n + v, 0) / (d.weeks.length || 8);
  const weeksTo = (pts) => (weekly > 0 ? Math.max(1, Math.ceil(Math.max(0, pts - p.total) / weekly)) : null);
  const pick = (g) => {
    store.set(GOAL_KEY, g);
    setGoal(g);
    feedback('success');
    toast(t('g.goal.saved'));
  };
  const label = (o) => (teen ? t(`g.goal.teen.${o.id}`) : t(`g.goal.${o.id}`));
  const forecast = [
    { id: 'goal', name: goal?.name || label(options.find((o) => o.pts === target) || options[0]), pts: target },
    !teen && target !== p.threshold && { id: 'payout', name: t('g.goal.payout'), pts: p.threshold }
  ].filter(Boolean);
  return (
    <section className="xs xs--savings" aria-labelledby="xg-goal">
      <XHead id="xg-goal" icon="target" eyebrow={t('g.goal.eyebrow')} title={t('g.goal.title')} sub={t(teen ? 'g.goal.sub.teen' : 'g.goal.sub')} />
      <div className="xsave">
        <div className="xsave__now">
          <span className="xsave__ring" style={{ '--p': pct }} aria-hidden="true">
            <b>{Math.round(pct * 100)}%</b>
          </span>
          <div>
            <p className="xsave__big">{remaining ? (surveysLeft != null ? tn('g.goal.surveys', surveysLeft) : t('g.goal.points', { n: fmt(remaining) })) : t('g.goal.done')}</p>
            <p className="xe2__hint">
              {t('g.goal.towards', { name: forecast[0].name, n: fmt(target) })}
              {!teen && p.rate > 0 && ` · ${t('g.goal.worth', { money: money(target, p.rate) })}`}
            </p>
            {remaining > 0 && surveysLeft != null && <p className="xe2__fine">{t('g.goal.avg', { n: fmt(Math.round(avg)) })}</p>}
          </div>
        </div>
        <div className="xsave__pick" role="radiogroup" aria-label={t('g.goal.pick')}>
          {options.map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={target === o.pts && !goal?.custom} className={cx('xsave__opt', target === o.pts && !goal?.custom && 'is-on')} onClick={() => pick({ pts: o.pts, name: label(o) })}>
              <strong>{label(o)}</strong>
              <small>
                {t('hdr.points', { n: fmt(o.pts) })}
                {!teen && p.rate > 0 ? ` · ${money(o.pts, p.rate)}` : ''}
              </small>
            </button>
          ))}
          <form
            className={cx('xsave__custom', goal?.custom && 'is-on')}
            onSubmit={(e) => {
              e.preventDefault();
              const n = Math.round(Number(custom));
              if (n >= 100 && n <= 1e6) pick({ pts: n, name: t('g.goal.mine'), custom: true });
              else toast(t('g.goal.bad'), 'error');
            }}
          >
            <label className="mb-sr" htmlFor="xsave-n">
              {t('g.goal.custom')}
            </label>
            <input id="xsave-n" className="mb-input" inputMode="numeric" placeholder={t('g.goal.custom')} value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ''))} />
            <Button type="submit" size="sm" variant="secondary">
              {t('g.goal.set')}
            </Button>
          </form>
        </div>
      </div>
      {engageOn('forecast') && (
        <ul className="xfore" aria-label={t('g.fc.title')}>
          {forecast.map((f) => {
            const w = weeksTo(f.pts);
            const done = p.total >= f.pts;
            return (
              <li key={f.id} className={cx(done && 'is-done')}>
                <span className="xfore__icon" aria-hidden="true">
                  <Icon name={done ? 'check' : 'calendar'} size={18} />
                </span>
                <span>
                  <strong>{f.name}</strong>
                  <small>{done ? t('g.fc.done') : w == null ? t('g.fc.none') : w > 52 ? t('g.fc.year') : tn('g.fc.weeks', w)}</small>
                </span>
              </li>
            );
          })}
          <li className="xfore__note">{weekly > 0 ? t('g.fc.pace', { n: fmt(Math.round(weekly)) }) : t('g.fc.start')}</li>
        </ul>
      )}
    </section>
  );
}

/** Bonus weekends and double-points surveys (preview: needs a campaign API). */
export function BonusBanner({ compact }) {
  const e = useEngage();
  const now = useNow(30000);
  if (!engageOn('bonus') || !e?.bonus) return null;
  const b = e.bonus;
  return (
    <section className={cx('xbonus', compact && 'is-compact')} aria-labelledby="xg-bonus">
      <span className="xbonus__x" aria-hidden="true">
        ×{b.mult}
      </span>
      <div className="xbonus__text">
        <p className="xbonus__k" id="xg-bonus">
          {t('g.bonus.k')}
        </p>
        <p className="xbonus__t">{t('g.bonus.t', { n: b.mult })}</p>
        {!compact && (
          <ul className="xbonus__list">
            {b.surveys.map((s) => (
              <li key={s}>
                <Icon name="bolt" size={13} /> {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="xbonus__timer" role="timer" aria-live="off">
        <Icon name="clock" size={15} /> {t('g.bonus.ends', { t: left(b.ends, now) })}
      </span>
      <Button to="surveys" size="sm" iconEnd="arrow" className="xbonus__go">
        {t('g.bonus.go')}
      </Button>
    </section>
  );
}

/** Points expiry reminder (preview: only meaningful if the backend adds expiry). */
export function ExpiryNotice() {
  const e = useEngage();
  if (!engageOn('expiry') || !e?.expiry) return null;
  const x = e.expiry;
  const date = new Date(x.on).toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
  return (
    <p className="xexpiry" role="note">
      <Icon name="clock" size={18} />
      <span>
        <strong>{t('g.exp.t', { n: fmt(x.points), date })}</strong> {t('g.exp.p')}
      </span>
    </p>
  );
}

/* ================================ quality ================================ */
export function ScoreBoosters() {
  const d = useDash();
  const me = useMe();
  if (!engageOn('boosters')) return null;
  const about = (d.profiles || []).filter((p) => ABOUT_YOU.includes(p.slug));
  const dropouts = (d.activity || []).filter((a) => a.status === 'dropout');
  const showPts = engageOn('boostPts');
  const list = [
    ...about.map((p) => ({ id: `p-${p.slug}`, icon: 'map', text: t('g.boost.profile', { name: p.name }), done: p.completion >= 100, pts: 6, to: 'profiles' })),
    { id: 'phone', icon: 'phone', text: t('g.boost.phone'), done: !!me.phone, pts: 4, to: 'myaccount' },
    { id: 'finish', icon: 'clock', text: dropouts.length ? tn('g.boost.finish', dropouts.length) : t('g.boost.finish.none'), done: !dropouts.length, pts: 3, to: 'surveys' },
    { id: 'practice', icon: 'eye', text: t('g.boost.practice'), done: !!engageMemo.get().practiced, pts: 0, href: '#xq-practice' }
  ];
  const open = list.filter((x) => !x.done);
  const total = open.reduce((n, x) => n + x.pts, 0);
  return (
    <section className="xs xs--boost" aria-labelledby="xg-boost">
      <XHead id="xg-boost" icon="bolt" eyebrow={t('g.boost.eyebrow')} title={t('g.boost.title')} sub={showPts && total ? t('g.boost.sub.pts', { n: total }) : t('g.boost.sub')} />
      {!d.profiles ? (
        <XSkel rows={3} h={48} />
      ) : (
        <ul className="xboost">
          {list.map((x, i) => (
            <li key={x.id} className={cx(x.done && 'is-done')} style={{ '--i': i }}>
              <span className="xboost__icon" aria-hidden="true">
                <Icon name={x.done ? 'check' : x.icon} size={17} strokeWidth={x.done ? 3 : 2} />
              </span>
              <span className="xboost__text">{x.text}</span>
              {showPts && x.pts > 0 && !x.done && <span className="xboost__pts">+{x.pts}</span>}
              {!x.done &&
                (x.href ? (
                  <a className="mb-linkbtn" href={x.href} onClick={(ev) => {
                    ev.preventDefault();
                    document.getElementById('xq-practice')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}>
                    {t('g.boost.try')}
                  </a>
                ) : (
                  <MLink to={x.to} className="mb-linkbtn">
                    {t('g.boost.do')}
                  </MLink>
                ))}
            </li>
          ))}
        </ul>
      )}
      {showPts && <p className="xe2__fine">{t('g.boost.est')}</p>}
    </section>
  );
}

const PRACTICE_OPTS = ['never', 'rarely', 'sometimes', 'often'];
/** 30-second attention-check practice. Live: nothing is sent anywhere. */
export function AttentionPractice() {
  const [phase, setPhase] = useState('intro');
  const [ans, setAns] = useState(null);
  const [sec, setSec] = useState(30);
  useEffect(() => {
    if (phase !== 'run') return undefined;
    if (sec <= 0) {
      setPhase('late');
      return undefined;
    }
    const id = setTimeout(() => setSec((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, sec]);
  if (!engageOn('practice')) return null;
  const start = () => {
    setAns(null);
    setSec(30);
    setPhase('run');
  };
  const choose = (o) => {
    setAns(o);
    setPhase(o === 'rarely' ? 'ok' : 'miss');
    engageMemo.set({ practiced: true });
    feedback(o === 'rarely' ? 'achievement' : 'toggle');
  };
  return (
    <section className="xs xs--practice" id="xq-practice" aria-labelledby="xg-prac">
      <XHead id="xg-prac" icon="eye" eyebrow={t('g.prac.eyebrow')} title={t('g.prac.title')} sub={t('g.prac.sub')} />
      {phase === 'intro' ? (
        <Button icon="play" onClick={start}>
          {t('g.prac.start')}
        </Button>
      ) : (
        <div className="xprac">
          <span className="xprac__timer" style={{ '--w': sec / 30 }} aria-hidden="true">
            <i />
          </span>
          <p className="xprac__count" aria-live="off">
            {phase === 'run' ? tn('g.prac.sec', sec) : ''}
          </p>
          <p className="xprac__q">{t('g.prac.q')}</p>
          <p className="xprac__hint">{t('g.prac.check')}</p>
          <div className="xprac__opts" role="group" aria-label={t('g.prac.q')}>
            {PRACTICE_OPTS.map((o) => (
              <button key={o} type="button" disabled={phase !== 'run'} className={cx('xprac__opt', ans === o && 'is-picked', phase !== 'run' && o === 'rarely' && 'is-right')} onClick={() => choose(o)}>
                {t(`g.prac.o.${o}`)}
              </button>
            ))}
          </div>
          {phase !== 'run' && (
            <div className={cx('xprac__result', phase === 'ok' ? 'is-ok' : 'is-miss')} role="status">
              <Icon name={phase === 'ok' ? 'check' : 'eye'} size={18} />
              <p>{t(`g.prac.${phase}`)}</p>
              <Button size="sm" variant="secondary" icon="refresh" onClick={start}>
                {t('g.prac.again')}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/** Monthly quality report card (preview: needs score history, item 13). */
export function QualityReport() {
  const e = useEngage();
  if (!engageOn('report') || !e?.report) return null;
  const r = e.report;
  const diff = r.to - r.from;
  const last = new Date();
  last.setDate(0);
  const month = last.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  return (
    <section className="xs xs--report" aria-labelledby="xg-rep">
      <XHead id="xg-rep" icon="calendar" eyebrow={t('g.rep.eyebrow')} title={t('g.rep.title', { month })} />
      <div className="xrep">
        <div className={cx('xrep__score', diff >= 0 ? 'is-up' : 'is-down')}>
          <span className="xrep__arrow" aria-hidden="true">
            <Icon name="arrow" size={22} strokeWidth={2.6} />
          </span>
          <strong>{r.to}</strong>
          <small>{diff >= 0 ? t('g.rep.up', { n: diff, from: r.from }) : t('g.rep.down', { n: -diff, from: r.from })}</small>
        </div>
        <dl className="xrep__facts">
          <div>
            <dt>{t('ac.s.complete')}</dt>
            <dd>{r.completed}</dd>
          </div>
          <div>
            <dt>{t('ac.s.disq')}</dt>
            <dd>{r.screened}</dd>
          </div>
        </dl>
        <p className="xrep__tip">
          <Icon name="spark" size={16} /> <strong>{t('g.rep.tip')}</strong> {t('g.rep.tipText')}
        </p>
      </div>
    </section>
  );
}

/** Trusted Member badge at 180+ (preview: priority invites need targeting on the backend). */
export function TrustedBadge() {
  const e = useEngage();
  const me = useMe();
  if (!engageOn('trusted') || !e?.trusted) return null;
  const { score } = me.quality;
  const at = e.trusted;
  const on = score >= at;
  return (
    <section className={cx('xs xs--trusted', on && 'is-on')} aria-labelledby="xg-tr">
      <div className="xtrust">
        <span className="xtrust__seal" aria-hidden="true">
          <Icon name="shield" size={34} />
          <i />
        </span>
        <div>
          <p className="xs-head__eyebrow">{t('g.tr.eyebrow')}</p>
          <h2 id="xg-tr">{on ? t('g.tr.on') : t('g.tr.title', { n: at })}</h2>
          <p className="xe2__hint">{on ? t('g.tr.onSub') : t('g.tr.sub', { n: at - score })}</p>
          <span className="xgoal__bar xtrust__bar" aria-hidden="true">
            <i style={{ '--w': Math.min(1, score / at) }} />
          </span>
        </div>
      </div>
      <ul className="xtrust__perks">
        {['priority', 'early', 'longer'].map((k) => (
          <li key={k}>
            <Icon name={on ? 'check' : 'lock'} size={14} strokeWidth={2.6} /> {t(`g.tr.p.${k}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ================================ referrals ================================ */
/** WhatsApp message, Instagram story image and QR code. Live. Teens must confirm a guardian said OK. */
export function ShareKit({ link }) {
  const me = useMe();
  const toast = useToast();
  const teen = me.type === 'teen';
  const [ok, setOk] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const closeQr = useCallback(() => setQrOpen(false), []);
  const qr = useMemo(() => (link ? qrPath(link) : null), [link]);
  if (!engageOn('share') || !link) return null;
  if (teen && !engageOn('teenInvite')) return null;
  const msg = teen ? t('g.sh.msg.teen', { link }) : t('g.sh.msg', { link });
  const locked = teen && !ok;
  const [c1, c2] = BG[me.type] || BG.consumer;
  const story = async () => {
    const file = await savePng('turn2opinion-invite.png', 1080, 1920, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 1080, 1920);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1080, 1920);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      [[880, 260, 260], [160, 1560, 320], [980, 1500, 140]].forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#fff';
      ctx.font = FONT(800, 52);
      ctx.fillText('Turn2Opinion', 96, 200);
      ctx.font = FONT(800, 104);
      const y = wrapText(ctx, teen ? t('g.sh.story.teen') : t('g.sh.story'), 96, 420, 880, 116);
      ctx.font = FONT(500, 44);
      ctx.globalAlpha = 0.92;
      wrapText(ctx, teen ? t('g.sh.storySub.teen') : t('g.sh.storySub'), 96, y + 100, 860, 60);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.roundRect?.(270, 1050, 540, 540, 40);
      ctx.fill();
      drawQr(ctx, link, 300, 1080, 480);
      ctx.fillStyle = '#fff';
      ctx.font = FONT(700, 40);
      ctx.textAlign = 'center';
      ctx.fillText(t('g.sh.scan'), 540, 1680);
      ctx.textAlign = 'left';
    });
    if (file) {
      await shareOrDownload(file, msg);
      feedback('success');
    }
  };
  const qrPng = async () => {
    const file = await savePng('turn2opinion-qr.png', 800, 800, (ctx) => drawQr(ctx, link, 0, 0, 800));
    if (file) download(file);
  };
  return (
    <section className="xs xs--share" aria-labelledby="xg-share">
      <XHead id="xg-share" icon="send" eyebrow={t('g.sh.eyebrow')} title={t('g.sh.title')} sub={teen ? t('g.sh.sub.teen') : t('g.sh.sub')} />
      {teen && (
        <label className="xshare__ok">
          <input type="checkbox" checked={ok} onChange={(x) => setOk(x.target.checked)} />
          <span>
            <strong>{t('g.sh.ok')}</strong>
            <small>{t('g.sh.ok.d')}</small>
          </span>
        </label>
      )}
      <ul className={cx('xshare', locked && 'is-locked')}>
        <li className="xshare__card is-wa">
          <span className="xshare__art" aria-hidden="true">
            <Icon name="whatsapp" size={30} />
          </span>
          <strong>{t('g.sh.wa')}</strong>
          <p className="xshare__preview">{msg}</p>
          <Button href={locked ? undefined : `https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" size="sm" disabled={locked} icon="whatsapp">
            {t('g.sh.wa.go')}
          </Button>
        </li>
        <li className="xshare__card is-ig">
          <span className="xshare__art xshare__story" aria-hidden="true" style={{ '--c1': c1, '--c2': c2 }}>
            <b>Turn2Opinion</b>
            <i>{teen ? t('g.sh.story.teen') : t('g.sh.story')}</i>
            {qr && (
              <svg viewBox={`0 0 ${qr.size} ${qr.size}`}>
                <rect width={qr.size} height={qr.size} fill="#fff" />
                <path d={qr.d} fill="#121a3d" />
              </svg>
            )}
          </span>
          <strong>{t('g.sh.ig')}</strong>
          <Button size="sm" disabled={locked} icon="instagram" onClick={story}>
            {t('g.sh.ig.go')}
          </Button>
        </li>
        <li className="xshare__card is-qr">
          {qr && (
            <button type="button" className="xshare__qr" disabled={locked} onClick={() => setQrOpen(true)} aria-label={t('g.sh.qr.big')}>
              <svg viewBox={`0 0 ${qr.size} ${qr.size}`} role="img" aria-label={t('g.sh.qr.alt')}>
                <rect width={qr.size} height={qr.size} fill="#fff" />
                <path d={qr.d} fill="#121a3d" />
              </svg>
            </button>
          )}
          <strong>{t('g.sh.qr')}</strong>
          <Button size="sm" variant="secondary" disabled={locked} icon="arrow" onClick={qrPng}>
            {t('g.sh.qr.go')}
          </Button>
        </li>
      </ul>
      <Modal open={qrOpen} onClose={closeQr} title={t('g.sh.qr')}>
        <div className="xqrbig">
          {qr && (
            <svg viewBox={`0 0 ${qr.size} ${qr.size}`} role="img" aria-label={t('g.sh.qr.alt')}>
              <rect width={qr.size} height={qr.size} fill="#fff" />
              <path d={qr.d} fill="#121a3d" />
            </svg>
          )}
          <p>{t('g.sh.scan')}</p>
          <Button onClick={closeQr}>{t('common.close')}</Button>
        </div>
      </Modal>
      {!teen && <p className="xe2__fine">{t('g.sh.fine')}</p>}
      {teen && <p className="xe2__fine">{t('g.sh.teenFine')}</p>}
    </section>
  );
}

/** Rewards at 1, 3, 5 and 10 friends (preview: needs reward rules, items 6 and 14). Not for Teens. */
export function ReferralMilestones({ joined = 0 }) {
  const e = useEngage();
  const me = useMe();
  if (!engageOn('refMilestones') || !e?.milestones || me.type === 'teen') return null;
  const list = e.milestones;
  const next = list.find((m) => joined < m.at);
  return (
    <section className="xs xs--refms" aria-labelledby="xg-rms">
      <XHead id="xg-rms" icon="flag" eyebrow={t('g.rms.eyebrow')} title={t('g.rms.title')} sub={next ? tn('g.rms.next', next.at - joined, { pts: fmt(next.reward) }) : t('g.rms.all')} />
      <ol className="xrms" style={{ '--p': Math.min(1, joined / list[list.length - 1].at) }}>
        <span className="xrms__line" aria-hidden="true">
          <i />
        </span>
        {list.map((m, i) => (
          <li key={m.at} className={cx(joined >= m.at && 'is-on', m === next && 'is-next')} style={{ '--i': i, '--x': m.at / list[list.length - 1].at }}>
            <span className="xrms__dot" aria-hidden="true">
              {joined >= m.at ? <Icon name="check" size={16} strokeWidth={3} /> : m.at}
            </span>
            <strong>{tn('e.board.friends', m.at)}</strong>
            <small>+{fmt(m.reward)}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Friendly reminder to a friend who joined but has not done a survey (preview: needs an API). */
export function NudgeFriends({ rows = [] }) {
  const me = useMe();
  const toast = useToast();
  const [sent, setSent] = useState(() => engageMemo.get().nudged || []);
  if (!engageOn('nudge') || me.type === 'teen') return null;
  const list = rows.filter((r) => r.status === 'joined');
  if (!list.length) return null;
  const nudge = (id) => {
    const next = [...sent, id];
    engageMemo.set({ nudged: next });
    setSent(next);
    feedback('success');
    preview(toast, t('g.nd.sent'));
  };
  return (
    <section className="xs xs--nudge" aria-labelledby="xg-nd">
      <XHead id="xg-nd" icon="heart" eyebrow={t('g.nd.eyebrow')} title={t('g.nd.title')} sub={t('g.nd.sub')} />
      <ul className="xnudge">
        {list.map((r) => {
          const id = r.email || r.name;
          const is = sent.includes(id);
          return (
            <li key={id}>
              <span className="xrh__avatar" aria-hidden="true">
                {(r.name || r.email || '?')[0].toUpperCase()}
              </span>
              <span className="xnudge__who">
                <strong>{r.name || r.email}</strong>
                <small>{t('g.nd.joined', { when: relTime(r.joinedAt) })}</small>
              </span>
              {is ? (
                <span className="xe2__done">
                  <Icon name="check" size={14} strokeWidth={3} /> {t('g.nd.done')}
                </span>
              ) : (
                <Button size="sm" variant="secondary" icon="bell" onClick={() => nudge(id)}>
                  {t('g.nd.go')}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="xe2__fine">{t('g.nd.fine')}</p>
    </section>
  );
}

/* ================================ activity ================================ */
/** "Year in review", shareable as an image. Live: from the activity feed. */
export function YearInReview() {
  const d = useDash();
  const me = useMe();
  const e = useEngage();
  if (!engageOn('wrapped')) return null;
  if (!d.activity) return <XSkel rows={1} h={180} />;
  const year = new Date().getFullYear();
  const mine = d.activity.filter((a) => new Date(a.date).getFullYear() === year);
  const done = mine.filter((a) => a.status === 'complete');
  if (!done.length) return null;
  const pts = done.reduce((n, a) => n + (a.points || 0), 0);
  const count = (key) => {
    const m = {};
    done.forEach((a) => {
      const k = key(a);
      if (k) m[k] = (m[k] || 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1])[0];
  };
  const cat = count((a) => (a.category && a.category !== 'Profile' ? a.category : ''));
  const best = count((a) => new Date(a.date).toLocaleDateString(undefined, { month: 'long' }));
  const story = e?.stories?.[0];
  const tiles = [
    { k: 'surveys', icon: 'clipboard', v: fmt(done.length), l: tn('g.yr.surveys', done.length) },
    { k: 'points', icon: 'coin', v: fmt(pts), l: t('g.yr.points') },
    cat && { k: 'cat', icon: 'heart', v: cat[0], l: t('g.yr.cat') },
    best && { k: 'month', icon: 'calendar', v: best[0], l: t('g.yr.month') }
  ].filter(Boolean);
  const [c1, c2] = BG[me.type] || BG.consumer;
  const save = async () => {
    const file = await savePng(`turn2opinion-${year}.png`, 1080, 1350, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 1080, 1350);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = '#fff';
      ctx.font = FONT(700, 40);
      ctx.fillText(`Turn2Opinion · ${year}`, 80, 130);
      ctx.font = FONT(800, 84);
      wrapText(ctx, t('g.yr.title', { name: me.firstName || '' }), 80, 260, 920, 96);
      tiles.forEach((x, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const X = 80 + col * 470;
        const Y = 480 + row * 300;
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.beginPath();
        ctx.roundRect?.(X, Y, 450, 260, 32);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = FONT(800, String(x.v).length > 9 ? 46 : 72);
        wrapText(ctx, x.v, X + 36, Y + 110, 380, 56);
        ctx.font = FONT(600, 34);
        ctx.fillText(x.l, X + 36, Y + 220);
      });
      if (story) {
        ctx.font = FONT(600, 34);
        wrapText(ctx, t('g.yr.impact', { change: story.change }), 80, 1120, 920, 46);
      }
    });
    if (file) await shareOrDownload(file, t('g.yr.shareText', { year }));
  };
  return (
    <section className="xwrap" aria-labelledby="xg-yr" style={{ '--c1': c1, '--c2': c2 }}>
      <div className="xwrap__bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="xwrap__head">
        <p className="xph__eyebrow">{t('g.yr.eyebrow', { year })}</p>
        <h2 id="xg-yr">{t('g.yr.title', { name: me.firstName || '' })}</h2>
      </div>
      <ul className="xwrap__tiles">
        {tiles.map((x, i) => (
          <li key={x.k} style={{ '--i': i }}>
            <Icon name={x.icon} size={18} />
            <strong>{x.v}</strong>
            <span>{x.l}</span>
          </li>
        ))}
      </ul>
      {story && <p className="xwrap__impact">{t('g.yr.impact', { change: story.change })}</p>}
      <Button icon="send" onClick={save} className="xwrap__go">
        {t('g.yr.share')}
      </Button>
    </section>
  );
}

/** Calendar heatmap of active days (last 26 weeks). Live: from the activity feed. */
export function ActivityHeatmap() {
  const d = useDash();
  if (!engageOn('heatmap')) return null;
  if (!d.activity) return <XSkel rows={1} h={140} />;
  const WEEKS = 26;
  const day = (x) => {
    const z = new Date(x);
    z.setHours(0, 0, 0, 0);
    return z.getTime();
  };
  const counts = {};
  d.activity.forEach((a) => {
    if (a.date) counts[day(a.date)] = (counts[day(a.date)] || 0) + 1;
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - ((today.getDay() + 6) % 7) - (WEEKS - 1) * 7); // Monday, 26 weeks back
  const cols = [];
  const months = [];
  for (let w = 0; w < WEEKS; w++) {
    const col = [];
    for (let i = 0; i < 7; i++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + w * 7 + i);
      const k = dt.getTime();
      col.push({ k, n: counts[k] || 0, future: k > today.getTime(), date: dt });
      if (i === 0 && dt.getDate() <= 7) months.push({ w, label: dt.toLocaleDateString(undefined, { month: 'short' }) });
    }
    cols.push(col);
  }
  const all = cols.flat().filter((c) => !c.future);
  const active = all.filter((c) => c.n > 0).length;
  let run = 0;
  let best = 0;
  all.forEach((c) => {
    run = c.n ? run + 1 : 0;
    best = Math.max(best, run);
  });
  const labels = t('e.week').split(',');
  return (
    <section className="xs xs--heat" aria-labelledby="xg-heat">
      <XHead id="xg-heat" icon="calendar" eyebrow={t('g.heat.eyebrow')} title={tn('g.heat.title', active)} sub={t('g.heat.sub', { n: best })} />
      <div className="xheat" role="img" aria-label={tn('g.heat.title', active)} ref={(el) => el && (el.scrollLeft = el.scrollWidth)}>
        <div className="xheat__months" aria-hidden="true" style={{ '--n': WEEKS }}>
          {months.map((m) => (
            <span key={m.w} style={{ gridColumn: m.w + 1 }}>
              {m.label}
            </span>
          ))}
        </div>
        <div className="xheat__days" aria-hidden="true">
          {labels.map((l, i) => (
            <span key={i}>{i % 2 === 0 ? l : ''}</span>
          ))}
        </div>
        <div className="xheat__grid" style={{ '--n': WEEKS }}>
          {cols.map((col, w) =>
            col.map((c, i) => <i key={c.k} className={cx(c.future && 'is-future', c.n > 0 && `is-l${Math.min(3, c.n)}`)} style={{ gridColumn: w + 1, gridRow: i + 1 }} title={c.future ? undefined : `${c.date.toLocaleDateString()}: ${c.n}`} />)
          )}
        </div>
      </div>
      <p className="xheat__legend" aria-hidden="true">
        {t('g.heat.less')} <i /> <i className="is-l1" /> <i className="is-l2" /> <i className="is-l3" /> {t('g.heat.more')}
      </p>
    </section>
  );
}

/** "Why was I screened out?" explainer. Live. */
export function ScreenOutHelp({ open, onClose, name }) {
  if (!engageOn('screenout')) return null;
  return (
    <Modal open={open} onClose={onClose} title={t('g.so.title')}>
      <div className="xso">
        <span className="xso__icon" aria-hidden="true">
          <Icon name="search" size={28} />
        </span>
        <h2>{t('g.so.title')}</h2>
        {name && <p className="xso__name">{name}</p>}
        <p>{t('g.so.lead')}</p>
        <ul>
          {['quota', 'target', 'quality', 'closed'].map((k) => (
            <li key={k}>
              <strong>{t(`g.so.${k}.t`)}</strong> {t(`g.so.${k}.p`)}
            </li>
          ))}
        </ul>
        <p className="xso__tip">
          <Icon name="spark" size={16} /> {t('g.so.tip')}
        </p>
        <div className="mb-row">
          <Button to="profiles" iconEnd="arrow">
            {t('pc.cta')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/* ================================ my account ================================ */
/** Member level card, downloadable as an image. Live. */
export function LevelCard() {
  const d = useDash();
  const me = useMe();
  const ach = useAchievements();
  if (!engageOn('levelcard')) return null;
  const earned = ach.filter((a) => a.have >= a.goal).length;
  const done = d.stats?.complete || 0;
  const since = me.joinedAt ? new Date(me.joinedAt) : null;
  const months = since ? Math.max(0, (new Date().getFullYear() - since.getFullYear()) * 12 + new Date().getMonth() - since.getMonth()) : 0;
  const tenure = months >= 12 ? tn('g.lv.years', Math.floor(months / 12)) : months >= 1 ? tn('g.lv.months', months) : t('g.lv.new');
  const TIER_AT = [0, 5, 15, 30, 60];
  const gemIds = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const gi = TIER_AT.reduce((n, x, i) => (done >= x ? i : n), 0);
  const useGem = engageOn('tiers') && me.type === 'consumer';
  const level = useGem ? t(`e.tier.${gemIds[gi]}`) : t(`q.tier.${d.tier}`);
  const [c1, c2] = BG[me.type] || BG.consumer;
  const rows = [
    [t('g.lv.level'), level],
    [t('g.lv.member'), tenure],
    [t('g.lv.badges'), `${earned}/${ach.length}`],
    [t('ac.s.complete'), fmt(done)]
  ];
  const save = async () => {
    const file = await savePng('turn2opinion-member-card.png', 1200, 750, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 1200, 750);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect?.(0, 0, 1200, 750, 48);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(1040, 120, 300, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = FONT(800, 44);
      ctx.fillText('Turn2Opinion', 72, 110);
      ctx.font = FONT(600, 32);
      ctx.fillText(t(`member.${me.type}`), 72, 160);
      ctx.font = FONT(800, 76);
      ctx.fillText(me.firstName ? `${me.firstName} ${(me.lastName || '')[0] || ''}${me.lastName ? '.' : ''}` : 'Member', 72, 330);
      rows.forEach(([k, v], i) => {
        const X = 72 + i * 270;
        ctx.font = FONT(600, 26);
        ctx.globalAlpha = 0.85;
        ctx.fillText(k.toUpperCase(), X, 560);
        ctx.globalAlpha = 1;
        ctx.font = FONT(800, 40);
        ctx.fillText(String(v), X, 615);
      });
    });
    if (file) await shareOrDownload(file, t('g.lv.shareText'));
  };
  return (
    <section className="xs xs--level" aria-labelledby="xg-lv">
      <XHead id="xg-lv" icon="id" eyebrow={t('g.lv.eyebrow')} title={t('g.lv.title')} sub={t('g.lv.sub')} />
      <div className="xlv">
        <div className="xlv__card" style={{ '--c1': c1, '--c2': c2 }}>
          <span className="xlv__brand">Turn2Opinion</span>
          <span className="xlv__type">{t(`member.${me.type}`)}</span>
          {useGem && (
            <span className="xlv__gem" aria-hidden="true">
              <Gem tone={gemIds[gi]} size={54} />
            </span>
          )}
          <span className="xlv__name">{me.firstName ? `${me.firstName} ${(me.lastName || '')[0] || ''}${me.lastName ? '.' : ''}` : me.fullName}</span>
          <dl className="xlv__rows">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="xlv__side">
          <p className="xe2__hint">{t('g.lv.privacy')}</p>
          <Button icon="arrow" onClick={save}>
            {t('g.lv.save')}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Profile freshness (preview: needs a last-updated date per profile). */
export function ProfileFreshness() {
  const e = useEngage();
  const d = useDash();
  if (!engageOn('freshness') || !e?.freshness) return null;
  const list = (d.profiles || []).filter((p) => p.started && e.freshness[p.slug] != null).map((p) => ({ ...p, days: e.freshness[p.slug] }));
  if (!list.length) return null;
  list.sort((a, b) => b.days - a.days);
  const stale = list.filter((p) => p.days > 180);
  return (
    <Card title={t('g.fr.title')} icon="refresh" className="xid-card xfresh">
      <p className="mb-card__lead">{stale.length ? t('g.fr.lead', { name: stale[0].name, n: Math.round(stale[0].days / 30) }) : t('g.fr.allFresh')}</p>
      <ul className="xfresh__list">
        {list.map((p) => {
          const m = Math.round(p.days / 30);
          const old = p.days > 180;
          return (
            <li key={p.slug} className={cx(old ? 'is-old' : 'is-fresh')}>
              <span className="xfresh__dot" aria-hidden="true" />
              <span className="xfresh__name">{p.name}</span>
              <span className="xfresh__age">{m < 1 ? t('g.fr.recent') : tn('g.fr.months', m)}</span>
              {old && (
                <MLink to="profiles" className="mb-linkbtn">
                  {t('g.fr.update')}
                </MLink>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/** Linked sign-in accounts (preview: needs Google sign-in and phone login on the backend). */
export function LinkedAccounts() {
  const e = useEngage();
  const me = useMe();
  const toast = useToast();
  const [linked, setLinked] = useState(() => engageMemo.get().linked || null);
  if (!engageOn('linked') || !e?.linked) return null;
  const l = linked || e.linked;
  const flip = (k) => {
    const next = { ...l, [k]: !l[k] };
    engageMemo.set({ linked: next });
    setLinked(next);
    preview(toast, next[k] ? t('g.ln.on') : t('g.ln.off'));
  };
  const masked = me.phone ? `•••• ${String(me.phone).slice(-3)}` : '';
  return (
    <Card title={t('g.ln.title')} icon="key" className="xid-card xlinked">
      <p className="mb-card__lead">{t('g.ln.lead')}</p>
      <ul className="xlinked__list">
        {[
          ['google', 'globe', t('g.ln.google'), l.google ? me.email : t('g.ln.notLinked')],
          ['phone', 'phone', t('g.ln.phone'), l.phone ? masked || t('g.ln.linked') : t('g.ln.notLinked')]
        ].map(([k, icon, name, sub]) => (
          <li key={k} className={cx(l[k] && 'is-on')}>
            <span className="xlinked__icon" aria-hidden="true">
              <Icon name={icon} size={18} />
            </span>
            <span className="xlinked__text">
              <strong>{name}</strong>
              <small>{sub}</small>
            </span>
            <Button size="sm" variant={l[k] ? 'ghost' : 'secondary'} onClick={() => flip(k)}>
              {l[k] ? t('g.ln.unlink') : t('g.ln.link')}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ================================ settings ================================ */
const TOPICS = ['alcohol', 'gambling', 'politics', 'health', 'finance', 'religion'];
const TEEN_TOPICS = ['politics', 'health', 'religion'];

/** Survey preferences (preview: needs a place to store them and matching that uses them). */
export function SurveyPrefs() {
  const e = useEngage();
  const me = useMe();
  const toast = useToast();
  const [p, setP] = useState(() => engageMemo.get().prefs || null);
  if (!engageOn('prefs') || !e?.prefs) return null;
  const v = p || e.prefs;
  const upd = (patch) => setP({ ...v, ...patch });
  const topics = me.type === 'teen' ? TEEN_TOPICS : TOPICS;
  const save = () => {
    engageMemo.set({ prefs: v });
    feedback('success');
    preview(toast, t('st.saved'));
  };
  return (
    <Card id="set-prefs" title={t('st.prefs')} icon="target">
      <p className="mb-card__lead">{t('g.pf.lead')}</p>
      <p className="mb-subhead">{t('g.pf.length')}</p>
      <Segmented label={t('g.pf.length')} value={v.length} onChange={(x) => upd({ length: x })} options={['any', 'short', 'long'].map((x) => ({ value: x, label: t(`g.pf.len.${x}`) }))} />
      <p className="mb-subhead">{t('g.pf.time')}</p>
      <Segmented label={t('g.pf.time')} value={v.time} onChange={(x) => upd({ time: x })} options={['any', 'morning', 'afternoon', 'evening'].map((x) => ({ value: x, label: t(`g.pf.t.${x}`) }))} />
      <p className="mb-subhead">{t('g.pf.avoid')}</p>
      <ul className="mb-chips xprefs__topics">
        {topics.map((k) => {
          const on = v.avoid.includes(k);
          return (
            <li key={k}>
              <button type="button" className={cx('mb-chip', on && 'is-on')} aria-pressed={on} onClick={() => upd({ avoid: on ? v.avoid.filter((x) => x !== k) : [...v.avoid, k] })}>
                {on && <Icon name="close" size={12} strokeWidth={3} />} {t(`g.pf.topic.${k}`)}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mb-faint mb-small">{t('g.pf.note')}</p>
      <div className="mb-row">
        <Button size="sm" icon="check" onClick={save}>
          {t('g.pf.save')}
        </Button>
      </div>
    </Card>
  );
}

/** Quiet hours and alert digest (preview: needs the notification service to honour them). */
export function QuietHours() {
  const e = useEngage();
  const toast = useToast();
  const [q, setQ] = useState(() => engageMemo.get().quiet || null);
  if (!engageOn('quiet') || !e?.quiet) return null;
  const v = q || e.quiet;
  const upd = (patch) => {
    const next = { ...v, ...patch };
    setQ(next);
    engageMemo.set({ quiet: next });
  };
  return (
    <Card id="set-quiet" title={t('st.quiet')} icon="clock">
      <div className="mb-toggles">
        <Toggle label={t('g.qh.on')} description={t('g.qh.on.d')} checked={v.on} onChange={(x) => upd({ on: x })} />
      </div>
      {v.on && (
        <div className="xquiet">
          <label>
            <span>{t('g.qh.from')}</span>
            <input type="time" className="mb-input" value={v.from} onChange={(x) => upd({ from: x.target.value })} />
          </label>
          <label>
            <span>{t('g.qh.to')}</span>
            <input type="time" className="mb-input" value={v.to} onChange={(x) => upd({ to: x.target.value })} />
          </label>
        </div>
      )}
      <p className="mb-subhead">{t('g.qh.digest')}</p>
      <Segmented
        label={t('g.qh.digest')}
        value={v.digest}
        onChange={(x) => {
          upd({ digest: x });
          preview(toast, t('st.saved'));
        }}
        options={['instant', 'daily', 'weekly'].map((x) => ({ value: x, label: t(`g.qh.d.${x}`) }))}
      />
      <p className="mb-faint mb-small">{t(`g.qh.d.${v.digest}.d`)}</p>
    </Card>
  );
}

/** Data & privacy centre. Live: download what this page holds; full export with answers is preview. */
export function DataCentre() {
  const me = useMe();
  const toast = useToast();
  const [points] = useSection('points');
  const [stats] = useSection('stats');
  const [profiles] = useSection('profiles');
  const [activity] = useSection('activity');
  const [refs] = useSection('referrals');
  if (!engageOn('datacentre')) return null;
  const teen = me.type === 'teen';
  const dl = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      account: { memberId: me.memberId, name: me.fullName, email: me.email, phone: me.phone, dateOfBirth: me.dob, gender: me.gender, memberType: me.type, joined: me.joinedAt, location: me.address },
      consents: me.terms,
      qualityScore: me.quality,
      points,
      surveyStatistics: stats,
      profiles: (profiles || []).map((p) => ({ name: p.name, completion: p.completion })),
      activity: (activity || []).map((a) => ({ survey: a.name, status: a.status, points: a.points, date: a.date })),
      referrals: teen ? undefined : (refs?.rows || []).map((r) => ({ email: r.email, status: r.status, invited: r.sentAt, joined: r.joinedAt }))
    };
    download(new File([JSON.stringify(data, null, 2)], 'turn2opinion-my-data.json', { type: 'application/json' }));
    feedback('success');
    toast(t('g.dc.done'));
  };
  const who = [
    ['briefcase', 'research', teen ? 'research.teen' : 'research'],
    ['shield', 'us', 'us'],
    teen && ['users', 'guardian', 'guardian'],
    ['globe', 'public', me.type === 'consumer' ? 'public.board' : 'public']
  ].filter(Boolean);
  return (
    <Card id="set-data" title={t('st.data')} icon="database">
      <p className="mb-card__lead">{t('g.dc.lead')}</p>
      <ul className="xwho">
        {who.map(([icon, k, p]) => (
          <li key={k}>
            <span className="xwho__icon" aria-hidden="true">
              <Icon name={icon} size={18} />
            </span>
            <span>
              <strong>{t(`g.dc.w.${k}`)}</strong>
              <small>{t(`g.dc.p.${p}`)}</small>
            </span>
          </li>
        ))}
      </ul>
      <div className="mb-row">
        <Button size="sm" icon="arrow" onClick={dl}>
          {t('g.dc.dl')}
        </Button>
        {engageOn('dataFull') && (
          <Button size="sm" variant="secondary" icon="mail" onClick={() => preview(toast, t('g.dc.full.done'))}>
            {t('g.dc.full')}
          </Button>
        )}
      </div>
      <p className="mb-faint mb-small">{t('g.dc.note')}</p>
    </Card>
  );
}
