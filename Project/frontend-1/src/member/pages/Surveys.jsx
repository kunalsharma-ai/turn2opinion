// /member/surveys/ in the v6 "Profiles & Surveys" design, on the member's real data:
//   header with earned points -> All new / High reward / Short + search -> card grid
//   (paid survey invitations first, then the topic surveys, which open one at a time once the
//   About-you profiles are complete) with "Cards per page" and paging -> Survey Participation History.
// Starting a survey: PUT /api/v1/me/survey { slug }; partner surveys redirect to their link with $uid
// replaced by the response id; Turn2Opinion-hosted surveys run in the v6 question flow and save once at the end.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HeroHello, HeroStats } from '../components/HeroBits.jsx';
import { useMemberData } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { engageMemo, engageOn } from '../data/engage.js';
import { t as mt, tn, fmt } from '../i18n/t.js';
import { Button, Counter, Modal, cx, useToast } from '../components/ui.jsx';
import { useDash, XEmpty, XError } from '../components/Sections.jsx';
import { useStage, Stage } from '../v6/Stage.jsx';
import Flow from '../v6/components/Flow.jsx';
import ItemCard from '../v6/components/ItemCard.jsx';
import { Icon } from '../v6/components/Icon.jsx';
import { profileEmoji } from '../v6/lib/emoji.js';
import { TW } from '../v6/lib/themes.js';
import { themeOf } from '../v6/lib/present.js';
import { t, nf } from '../v6/i18n/index.js';
import { readAnchor, clearAnchor } from './anchor.js';

const usd = (pts, rate) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(pts * rate);
  } catch {
    return `$${(pts * rate).toFixed(2)}`;
  }
};
const isNew = (s) => Date.now() - new Date(s.createdAt || 0) < 2 * 864e5;
const FILTERS = [
  ['all', () => true],
  ['high', (x) => x.kind === 'paid' && x.points > 500],
  ['short', (x) => (x.kind === 'paid' ? x.loi > 0 && x.loi <= 5 : (x.src.minutes || 1) <= 5)]
];
const slugify = (s) => String(s || '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** A paid survey invitation drawn as a v6 survey card (open, with its reward). */
function PaidCard({ s, num, onStart, busy }) {
  const cat = slugify(s.category);
  const w = themeOf({ s: cat }) || TW.rewards;
  const [e1, e2, e3] = profileEmoji(cat);
  return (
    <button
      type="button"
      className={`icard k-survey k-paid s-open${w.dark ? ' wdark' : ''}`}
      style={{ '--ca': w.a, '--cb': w.a2, '--cc': w.a3 }}
      onClick={() => onStart(s)}
      disabled={busy}
      aria-label={`${s.name}. ${mt('svp.paid')}. ${t('v6_cta_survey')}`}
    >
      <span className="ic-bg" aria-hidden="true">
        <i className="o1" />
        <i className="o2" />
      </span>
      <span className="ic-num" aria-hidden="true">
        #{nf(num)}
      </span>
      {isNew(s) && (
        <span className="ic-ribbon" aria-hidden="true">
          {mt('sv.new')}
        </span>
      )}
      <span className="ic-orb" aria-hidden="true">
        <span className="ic-e1">{e1}</span>
        <span className="ic-e2">{e2}</span>
        <span className="ic-e3">{e3}</span>
      </span>
      <span className="ic-body">
        <span className="ic-name">{s.name}</span>
        <span className="ic-meta">
          <span>
            <Icon n="clipboard" />
            {s.category || mt('sv.cat.general')}
          </span>
          <span>
            <Icon n="clock" />
            {s.loi ? t('v6_n_min', { n: s.loi }) : '—'}
          </span>
        </span>
        <span className="ic-rw" aria-hidden="true">
          <span className="r-coin">
            <i className="mini-coin" />+{nf(s.points)}
          </span>
        </span>
      </span>
      <span className="ic-foot">
        <span className="ic-st st-open">{mt('svp.paid')}</span>
        <span className="ic-cta">
          {busy ? <span className="spin6" /> : null}
          {t('v6_cta_survey')}
          <Icon n="arrow-r" />
        </span>
      </span>
      <span className="ic-shine" aria-hidden="true" />
    </button>
  );
}

export function SurveysPage() {
  const d = useDash();
  const s = useStage(d.allProfiles);
  const { me, items, state } = s;
  const toast = useToast();
  const { reload, refreshMe } = useMemberData();
  const teen = me.type === 'teen';
  const topics = items.filter((x) => x.kind === 'survey');
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [per, setPer] = useState(12);
  const [pg, setPg] = useState(0);
  const [starting, setStarting] = useState(null);
  const [survey, setSurvey] = useState(null);
  const [terms, setTerms] = useState(false);
  const closeTerms = useCallback(() => setTerms(false), []);

  const list = useMemo(() => {
    const paid = (d.surveys || []).map((x) => ({ ...x, kind: 'paid', key: `s-${x.id}` }));
    const tp = topics.map((x) => ({ ...x, name: x.p.n, kind: 'topic', key: `p-${x.slug}` }));
    const f = FILTERS.find(([id]) => id === filter)[1];
    const needle = q.trim().toLowerCase();
    return [...paid, ...tp].filter(f).filter((x) => !needle || `${x.name} ${x.category || ''}`.toLowerCase().includes(needle));
  }, [d.surveys, topics, filter, q]);
  const pages = Math.max(1, Math.ceil(list.length / per));
  const page = Math.min(pg, pages - 1);
  const shown = list.slice(page * per, page * per + per);
  useEffect(() => setPg(0), [filter, q, per]);

  const start = useCallback(
    async (x) => {
      // the existing survey page sends members without accepted terms to the terms page first
      if (!teen && !me.terms?.length) return setTerms(true);
      setStarting(x.slug);
      try {
        const data = await actions.startSurvey(x.slug);
        if (!data) throw new Error('');
        if (data.link) {
          const url = String(data.link).replace(/\$uid/g, data.respID || '');
          if (/example\.com/.test(url)) toast(mt('qz.partner.preview'), 'info');
          else window.location.assign(url);
          return;
        }
        setSurvey({ ...data, name: data.name || x.name, slug: x.slug, points: data.points ?? x.points });
        s.setView({ name: 'survey' });
        window.scrollTo({ top: 0 });
      } catch (e) {
        toast(e?.message && !/request failed/i.test(e.message) ? e.message : mt('svp.taken'), 'error');
      } finally {
        setStarting(null);
      }
    },
    [me.terms, teen, toast, s]
  );
  const surveyDone = useCallback(() => {
    reload('surveys');
    reload('activity');
    reload('stats');
    reload('points');
    refreshMe?.();
  }, [reload, refreshMe]);

  // deep link from the dashboards: /member/surveys/#start-<slug>
  useEffect(() => {
    if (!d.surveys) return;
    const a = readAnchor();
    if (!a.startsWith('start-')) return;
    clearAnchor();
    const hit = d.surveys.find((x) => x.slug === a.slice(6)) || { slug: a.slice(6), name: '' };
    start(hit);
  }, [d.surveys]); // eslint-disable-line react-hooks/exhaustive-deps

  const p = d.points;
  const loading = !d.surveys && d.sStatus !== 'error';
  const aboutLeft = s.about.filter((x) => (x.completion || 0) < 100).length;
  const st = (x) => state.map.get(x.i) || { st: 'locked', pct: 0 };

  return (
    <Stage
      s={s}
      className="xp xp--surveys"
      renderSurvey={() =>
        survey && (
          <Flow
            key={survey.respID || survey.slug}
            kind="survey"
            source={survey}
            onHome={() => {
              setSurvey(null);
              s.home();
            }}
            onDone={surveyDone}
          />
        )
      }
    >
      <div className="dash svp">
        <header className="sv6-head">
          <span className="sv6-orb" aria-hidden="true">
            <span>📋</span>
            <i>💬</i>
            <i>🎁</i>
          </span>
          <div className="sv6-head__t">
            <HeroHello />
            <p className="h6-eyebrow">
              <span aria-hidden="true">🗝️</span>
              {teen ? mt('svp.sub.teen') : mt('svp.sub')}
            </p>
            <h1>{mt('svp.title')}</h1>
            <HeroStats showPayout={false} className="sv6-stats" />
          </div>
          <div className="sv6-earned">
            <p>{mt('svp.earned')}</p>
            <p className="sv6-earned__n">
              <i className="mini-coin" aria-hidden="true" />
              <b>{p ? <Counter value={p.total} duration={1200} /> : '…'}</b>
              <small>{t('v6_pts')}</small>
            </p>
            {!teen && p && <p className="sv6-earned__usd">≈ {usd(p.total, p.rate)} USD</p>}
            <Button to="rewards" size="sm" icon="gift" className="sv6-redeem">
              {teen ? mt('svp.rewards') : mt('svp.redeem')}
            </Button>
          </div>
        </header>

        <section className="sec6 sv6-list" aria-labelledby="svp-list-h">
          <header className="sec6-h">
            <span className="sec6-ic" aria-hidden="true">
              {d.surveys?.length ? '📋' : state.aboutDone ? '🗝️' : '🔒'}
            </span>
            <div>
              <h2 id="svp-list-h">{t('v6_surveys_title')}</h2>
              <p>{state.aboutDone ? t('v6_surveys_sub_open') : d.surveys?.length ? mt('svp.sub.mixed') : t('v6_surveys_sub_locked')}</p>
            </div>
            <span className="sec6-count">{nf(list.length)}</span>
          </header>
          <div className="sv6-tools">
            <div className="sv6-tabs" role="tablist" aria-label={mt('svp.filter')}>
              {FILTERS.map(([id]) => (
                <button key={id} type="button" role="tab" aria-selected={filter === id} className={cx(filter === id && 'on')} onClick={() => setFilter(id)}>
                  {mt(`svp.f.${id}`)}
                  {id === 'all' && <span className="sv6-new">{mt('sv.new')}</span>}
                </button>
              ))}
            </div>
            <label className="sv6-search">
              <Icon n="search" />
              <span className="sr">{mt('svp.search')}</span>
              <input type="search" placeholder={mt('svp.search')} value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>

          {!state.aboutDone && topics.length > 0 && d.allProfiles && (
            <div className="seal-banner" role="note">
              <span className="sb-lock" aria-hidden="true">
                🔐
              </span>
              <span>{t('v6_surveys_banner', { n: aboutLeft })}</span>
              {state.nextAbout && (
                <button type="button" className="sb-go" onClick={() => s.setLocked(topics[0]?.i ?? state.nextAbout.i)}>
                  {t('v6_cta_locked')}
                  <Icon n="lock" />
                </button>
              )}
            </div>
          )}

          {d.sStatus === 'error' && !d.surveys ? (
            <XError text={mt('sv.err')} onRetry={d.sRetry} />
          ) : loading ? (
            <div className="grid6 g-surveys">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className="icard skel6 dk" aria-hidden="true" />
              ))}
            </div>
          ) : !list.length ? (
            <XEmpty
              kind="surveys"
              title={q || filter !== 'all' ? mt('svp.none.filter') : mt('sv.empty.t')}
              action={
                filter !== 'all' || q ? (
                  <Button size="sm" variant="secondary" onClick={() => (setFilter('all'), setQ(''))}>
                    {mt('svp.clear')}
                  </Button>
                ) : (
                  <Button to="profiles" size="sm" iconEnd="arrow">
                    {mt('sv.empty.cta')}
                  </Button>
                )
              }
            >
              {!q && filter === 'all' ? mt('sv.empty.p') : null}
            </XEmpty>
          ) : (
            <div className="grid6 g-surveys">
              {shown.map((x, k) =>
                x.kind === 'paid' ? (
                  <PaidCard key={x.key} s={x} num={page * per + k + 1} onStart={start} busy={starting === x.slug} />
                ) : (
                  <ItemCard key={x.key} x={x} st={st(x)} num={page * per + k + 1} onOpen={s.open} onLocked={s.setLocked} />
                )
              )}
            </div>
          )}

          {list.length > 0 && (
            <nav className="svp-pager" aria-label={mt('svp.pages')}>
              <label>
                {mt('svp.per')}
                <select value={per} onChange={(e) => setPer(Number(e.target.value))}>
                  {[12, 24, 48].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <span>{mt('svp.showing', { a: page * per + 1, b: Math.min(list.length, page * per + per), n: list.length })}</span>
              <span className="svp-pager__btns">
                <button type="button" onClick={() => setPg(page - 1)} disabled={page === 0} aria-label={mt('svp.prev')}>
                  <Icon n="arrow-l" />
                </button>
                {Array.from({ length: pages }, (_, i) => (
                  <button key={i} type="button" className={cx(i === page && 'is-on')} aria-current={i === page ? 'page' : undefined} onClick={() => setPg(i)}>
                    {i + 1}
                  </button>
                ))}
                <button type="button" onClick={() => setPg(page + 1)} disabled={page >= pages - 1} aria-label={mt('svp.next')}>
                  <Icon n="arrow-r" />
                </button>
              </span>
            </nav>
          )}
        </section>

        <History d={d} onResume={start} />

        <p className="foot6">
          <Icon n="shield" />
          {t('footer')}
        </p>

        <Modal open={terms} onClose={closeTerms} labelledBy="svp-terms-h">
          <div className="pf-modal">
            <h2 id="svp-terms-h">{mt('svp.terms.t')}</h2>
            <p>{mt('svp.terms.p')}</p>
            <div className="mb-row">
              <Button href={me.category === 'b2b' ? '/user/professionalterms.html' : '/user/consumerterm.html'} iconEnd="arrow">
                {mt('svp.terms.go')}
              </Button>
              <Button variant="ghost" onClick={closeTerms}>
                {mt('qz.close')}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ participation history */
const STATUS_TONE = { complete: 'ok', terminate: 'bad', overquota: 'warn', dropout: 'mute' };
const STATUS_E = { complete: '✅', terminate: '⛔', overquota: '📦', dropout: '⏸️' };
function History({ d, onResume }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [q, setQ] = useState('');
  const [pg, setPg] = useState(0);
  const [rate, setRate] = useState(null);
  const closeRate = useCallback(() => setRate(null), []);
  const per = 10;
  const rows = useMemo(() => {
    const a = from ? new Date(`${from}T00:00:00`).getTime() : -Infinity;
    const b = to ? new Date(`${to}T23:59:59`).getTime() : Infinity;
    const needle = q.trim().toLowerCase();
    return (d.activity || []).filter((r) => {
      const tm = new Date(r.start || r.date || 0).getTime();
      return tm >= a && tm <= b && (!needle || r.name.toLowerCase().includes(needle));
    });
  }, [d.activity, from, to, q]);
  useEffect(() => setPg(0), [from, to, q]);
  const pages = Math.max(1, Math.ceil(rows.length / per));
  const page = Math.min(pg, pages - 1);
  const shown = rows.slice(page * per, page * per + per);
  const fb = engageOn('svfeedback');
  const memo = fb ? engageMemo.get().svFeedback || {} : {};
  const when = (r) => {
    const v = ['complete', 'terminate', 'overquota'].includes(r.status) ? r.start || r.date : null;
    if (!v) return '—';
    try {
      return new Date(v).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch {
      return '—';
    }
  };
  return (
    <section className="sec6 svp-hist" aria-labelledby="svp-hist-h">
      <header className="sec6-h">
        <span className="sec6-ic" aria-hidden="true">
          📜
        </span>
        <div>
          <h2 id="svp-hist-h">{mt('svp.hist.t')}</h2>
          <p>{d.activity ? tn('svp.hist.n', d.activity.length) : ' '}</p>
        </div>
      </header>
      <div className="svp-hist__tools">
        <label>
          <span>{mt('svp.from')}</span>
          <input type="date" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          <span>{mt('svp.to')}</span>
          <input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label className="sv6-search">
          <Icon n="search" />
          <span className="sr">{mt('svp.hist.search')}</span>
          <input type="search" placeholder={mt('svp.hist.search')} value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      {d.aStatus === 'error' && !d.activity ? (
        <XError text={mt('ac.err')} onRetry={d.aRetry} />
      ) : !d.activity ? (
        <div className="svp-table__skel" aria-hidden="true" />
      ) : (
        <div className="svp-table" role="region" aria-labelledby="svp-hist-h" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">{mt('svp.c.name')}</th>
                <th scope="col">{mt('svp.c.start')}</th>
                <th scope="col">{mt('svp.c.loi')}</th>
                <th scope="col">{mt('svp.c.status')}</th>
                <th scope="col">{mt('svp.c.rewards')}</th>
                <th scope="col">{mt('svp.c.feedback')}</th>
              </tr>
            </thead>
            <tbody>
              {!shown.length ? (
                <tr className="is-empty">
                  <td colSpan={6}>
                    <span aria-hidden="true">🧭 </span>
                    {d.activity.length ? mt('svp.hist.none') : mt('svp.hist.empty')}
                  </td>
                </tr>
              ) : (
                shown.map((r) => (
                  <tr key={r.id}>
                    <th scope="row" data-label={mt('svp.c.name')}>
                      {r.name}
                    </th>
                    <td data-label={mt('svp.c.start')}>{when(r)}</td>
                    <td data-label={mt('svp.c.loi')}>{r.loi ? t('v6_n_min', { n: r.loi }) : '—'}</td>
                    <td data-label={mt('svp.c.status')}>
                      {r.source === 'internal' && r.status === 'dropout' && r.slug ? (
                        <button type="button" className="svp-badge is-resume" onClick={() => onResume({ slug: r.slug, name: r.name })}>
                          {mt('svp.resume')} <Icon n="arrow-r" />
                        </button>
                      ) : (
                        <span className={cx('svp-badge', `is-${STATUS_TONE[r.status] || 'mute'}`)}>
                          <span aria-hidden="true">{STATUS_E[r.status] || '•'}</span> {mt(`svp.st.${r.status}`) !== `svp.st.${r.status}` ? mt(`svp.st.${r.status}`) : r.status}
                        </span>
                      )}
                    </td>
                    <td data-label={mt('svp.c.rewards')}>
                      {r.points ? (
                        <span className="svp-pts">
                          <i className="mini-coin" aria-hidden="true" />+{fmt(r.points)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td data-label={mt('svp.c.feedback')}>
                      {!fb || r.status !== 'complete' ? (
                        '—'
                      ) : memo[r.id] ? (
                        <span className="svp-rated" aria-label={mt('svp.rated', { n: memo[r.id] })}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <i key={i} className={cx('mini-gem', i < memo[r.id] && 'is-on')} />
                          ))}
                        </span>
                      ) : (
                        <button type="button" className="lnk6" onClick={() => setRate(r)}>
                          {mt('svp.rate')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > per && (
        <nav className="svp-pager" aria-label={mt('svp.pages')}>
          <span>{mt('svp.showing', { a: page * per + 1, b: Math.min(rows.length, page * per + per), n: rows.length })}</span>
          <span className="svp-pager__btns">
            <button type="button" onClick={() => setPg(page - 1)} disabled={page === 0} aria-label={mt('svp.prev')}>
              <Icon n="arrow-l" />
            </button>
            <button type="button" className="is-on" aria-current="page">
              {page + 1}
            </button>
            <button type="button" onClick={() => setPg(page + 1)} disabled={page >= pages - 1} aria-label={mt('svp.next')}>
              <Icon n="arrow-r" />
            </button>
          </span>
        </nav>
      )}
      <RateModal row={rate} onClose={closeRate} />
    </section>
  );
}

function RateModal({ row, onClose }) {
  const [n, setN] = useState(0);
  const toast = useToast();
  useEffect(() => setN(0), [row]);
  return (
    <Modal open={!!row} onClose={onClose} labelledBy="svp-rate-h">
      <div className="pf-modal">
        <h2 id="svp-rate-h">{mt('svp.rate.t')}</h2>
        <p>{row?.name}</p>
        <div className="svp-gems" role="radiogroup" aria-label={mt('svp.rate.t')}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} type="button" role="radio" aria-checked={n === i} aria-label={mt('svp.rated', { n: i })} className={cx(i <= n && 'is-on')} onClick={() => setN(i)}>
              <span aria-hidden="true">💎</span>
            </button>
          ))}
        </div>
        <div className="mb-row">
          <Button
            disabled={!n}
            onClick={() => {
              const m = engageMemo.get().svFeedback || {};
              engageMemo.set({ svFeedback: { ...m, [row.id]: n } });
              toast(mt('svp.rate.thanks'));
              onClose();
            }}
          >
            {mt('svp.rate.send')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {mt('qz.close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
