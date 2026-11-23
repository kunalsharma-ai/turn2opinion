// /member/surveys/ — rebuilt in frontend-1 from the approved live page:
//   "Available Surveys" header with earned points -> All new / High reward / Short + search ->
//   card grid (paid survey invitations first, then the topic surveys that unlock once the About-you
//   profiles are complete) with "Cards per page" and paging -> Survey Participation History.
// Starting a survey: PUT /api/v1/me/survey { slug }; partner surveys redirect to their link with
// $uid replaced by the response id; Turn2Opinion-hosted surveys run in the Questionnaire panel.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMemberData, useMe, aboutYou, topicProfiles } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { engageMemo, engageOn } from '../data/engage.js';
import { t, tn, fmt } from '../i18n/t.js';
import { Button, Icon, Modal, cx, useToast } from '../components/ui.jsx';
import { useDash, XEmpty, XError } from '../components/Sections.jsx';
import Questionnaire from '../components/Questionnaire.jsx';
import { ProfileTile, UnlockHelp, useProfileRunner } from './Profiles.jsx';
import { profileArt, readAnchor, clearAnchor } from './profileArt.js';

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
  ['short', (x) => (x.kind === 'paid' ? x.loi > 0 && x.loi <= 5 : x.minutes <= 5)]
];

function PaidCard({ s, index, onStart, busy }) {
  const art = profileArt({ slug: s.category, name: s.category || s.name });
  return (
    <article className="pf-card pf-card--dark pf-card--paid" style={{ '--i': index }}>
      <span className="pf-card__shine" aria-hidden="true" />
      <span className="pf-card__num">#{index + 1}</span>
      <span className="pf-card__icon" aria-hidden="true">
        <Icon name={art.icon} size={30} />
      </span>
      <h3 className="pf-card__name">{s.name}</h3>
      <p className="pf-card__meta">
        <span>
          <Icon name="layers" size={13} /> {s.category || t('sv.cat.general')}
        </span>
        <span>
          <Icon name="clock" size={13} /> {t('pf.min', { n: s.loi || '—' })}
        </span>
      </p>
      <p className="pf-card__chips">
        <span className="pf-chip pf-chip--coin">+{fmt(s.points)}</span>
        {isNew(s) && <span className="pf-chip pf-chip--new">{t('sv.new')}</span>}
      </p>
      <div className="pf-card__foot">
        <span className="pf-card__state">{t('svp.paid')}</span>
        <button type="button" className="pf-card__btn is-go" onClick={() => onStart(s)} disabled={busy} aria-label={`${t('sv.start')}: ${s.name}`}>
          {busy ? <span className="mb-spin" aria-hidden="true" /> : null}
          {t('svp.start')} <Icon name="arrow" size={13} />
        </button>
      </div>
    </article>
  );
}

export function SurveysPage() {
  const me = useMe();
  const d = useDash();
  const toast = useToast();
  const { reload } = useMemberData();
  const run = useProfileRunner();
  const teen = me.type === 'teen';
  const about = useMemo(() => aboutYou(d.allProfiles), [d.allProfiles]);
  const topics = useMemo(() => topicProfiles(d.allProfiles), [d.allProfiles]);
  const unlocked = about.length > 0 && about.every((p) => p.completion >= 100);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [per, setPer] = useState(12);
  const [pg, setPg] = useState(0);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [starting, setStarting] = useState(null);
  const [survey, setSurvey] = useState(null);
  const [terms, setTerms] = useState(false);
  const closeUnlock = useCallback(() => setUnlockOpen(false), []);
  const closeTerms = useCallback(() => setTerms(false), []);
  const closeSurvey = useCallback(() => setSurvey(null), []);
  const surveyDone = useCallback(() => {
    reload('surveys');
    reload('activity');
    reload('stats');
    reload('points');
  }, [reload]);

  const items = useMemo(() => {
    const paid = (d.surveys || []).map((s) => ({ ...s, kind: 'paid', key: `s-${s.id}` }));
    const tp = topics.map((p) => ({ ...p, kind: 'topic', key: `p-${p.slug}`, loi: p.minutes }));
    const f = FILTERS.find(([id]) => id === filter)[1];
    const needle = q.trim().toLowerCase();
    return [...paid, ...tp].filter(f).filter((x) => !needle || `${x.name} ${x.category || ''}`.toLowerCase().includes(needle));
  }, [d.surveys, topics, filter, q]);
  const pages = Math.max(1, Math.ceil(items.length / per));
  const page = Math.min(pg, pages - 1);
  const shown = items.slice(page * per, page * per + per);
  useEffect(() => setPg(0), [filter, q, per]);

  const start = useCallback(
    async (s) => {
      // the existing survey page sends members without accepted terms to the terms page first
      if (!teen && !me.terms?.length) return setTerms(true);
      setStarting(s.slug);
      try {
        const data = await actions.startSurvey(s.slug);
        if (!data) throw new Error('');
        setSurvey({ ...data, name: data.name || s.name, slug: s.slug });
      } catch (e) {
        toast(e?.message && !/request failed/i.test(e.message) ? e.message : t('svp.taken'), 'error');
      } finally {
        setStarting(null);
      }
    },
    [me.terms, teen, toast]
  );

  // deep link from the dashboards: /member/surveys/#start-<slug>
  useEffect(() => {
    if (!d.surveys) return;
    const a = readAnchor();
    if (!a.startsWith('start-')) return;
    clearAnchor();
    const hit = d.surveys.find((s) => s.slug === a.slice(6)) || { slug: a.slice(6), name: '' };
    start(hit);
  }, [d.surveys]); // eslint-disable-line react-hooks/exhaustive-deps

  const p = d.points;
  const loading = !d.surveys && d.sStatus !== 'error';
  return (
    <div className={cx('xp xp--surveys svp', teen && 'is-teen')}>
      <header className="svp-head">
        <div>
          <h1>{t('svp.title')}</h1>
          <p>{t(teen ? 'svp.sub.teen' : 'svp.sub')}</p>
        </div>
        <div className="svp-earned">
          <p>
            {t('svp.earned')} <strong>{tn('svp.pts', p?.total || 0)}</strong>
          </p>
          {!teen && p && <p className="svp-earned__usd">({usd(p.total, p.rate)} USD)</p>}
          <Button to="rewards" size="sm" icon="gift">
            {teen ? t('svp.rewards') : t('svp.redeem')}
          </Button>
        </div>
      </header>

      <section className="svp-list" aria-labelledby="svp-list-h">
        <h2 id="svp-list-h" className="mb-sr">
          {t('svp.title')}
        </h2>
        <div className="svp-tools">
          <div className="svp-tabs" role="tablist" aria-label={t('svp.filter')}>
            {FILTERS.map(([id]) => (
              <button key={id} type="button" role="tab" aria-selected={filter === id} className={cx(filter === id && 'is-on')} onClick={() => setFilter(id)}>
                {t(`svp.f.${id}`)}
                {id === 'all' && <span className="svp-new">{t('sv.new')}</span>}
              </button>
            ))}
          </div>
          <label className="svp-search">
            <Icon name="search" size={16} />
            <span className="mb-sr">{t('svp.search')}</span>
            <input type="search" placeholder={t('svp.search')} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        </div>

        {!unlocked && topics.length > 0 && d.allProfiles && (
          <p className="svp-lockbar" role="note">
            <Icon name="lock" size={16} /> {tn('pf.seal', about.filter((x) => x.completion < 100).length)}
            <button type="button" onClick={() => setUnlockOpen(true)}>
              {t('sv.unlock')}
            </button>
          </p>
        )}

        {d.sStatus === 'error' && !d.surveys ? (
          <XError text={t('sv.err')} onRetry={d.sRetry} />
        ) : loading ? (
          <div className="pf-grid pf-grid--five">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="pf-card pf-card--skel is-dark" style={{ '--i': i }} />
            ))}
          </div>
        ) : !items.length ? (
          <XEmpty kind="surveys" title={q || filter !== 'all' ? t('svp.none.filter') : t('sv.empty.t')} action={filter !== 'all' || q ? <Button size="sm" variant="secondary" onClick={() => (setFilter('all'), setQ(''))}>{t('svp.clear')}</Button> : <Button to="profiles" size="sm" iconEnd="arrow">{t('sv.empty.cta')}</Button>}>
            {!q && filter === 'all' ? t('sv.empty.p') : null}
          </XEmpty>
        ) : (
          <div className="pf-grid pf-grid--five">
            {shown.map((x, i) =>
              x.kind === 'paid' ? (
                <PaidCard key={x.key} s={x} index={page * per + i} onStart={start} busy={starting === x.slug} />
              ) : (
                <ProfileTile key={x.key} p={x} index={page * per + i} dark locked={!unlocked} onOpen={run.setOpen} onUnlock={() => setUnlockOpen(true)} />
              )
            )}
          </div>
        )}

        {items.length > 0 && (
          <nav className="svp-pager" aria-label={t('svp.pages')}>
            <label>
              {t('svp.per')}
              <select value={per} onChange={(e) => setPer(Number(e.target.value))}>
                {[12, 24, 48].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <span>{t('svp.showing', { a: page * per + 1, b: Math.min(items.length, page * per + per), n: items.length })}</span>
            <span className="svp-pager__btns">
              <button type="button" onClick={() => setPg(0)} disabled={page === 0} aria-label={t('svp.first')}>
                <Icon name="chevronLeft" size={15} />
                <Icon name="chevronLeft" size={15} />
              </button>
              <button type="button" onClick={() => setPg(page - 1)} disabled={page === 0} aria-label={t('svp.prev')}>
                <Icon name="chevronLeft" size={15} />
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} type="button" className={cx(i === page && 'is-on')} aria-current={i === page ? 'page' : undefined} onClick={() => setPg(i)}>
                  {i + 1}
                </button>
              ))}
              <button type="button" onClick={() => setPg(page + 1)} disabled={page >= pages - 1} aria-label={t('svp.next')}>
                <Icon name="chevronRight" size={15} />
              </button>
              <button type="button" onClick={() => setPg(pages - 1)} disabled={page >= pages - 1} aria-label={t('svp.last')}>
                <Icon name="chevronRight" size={15} />
                <Icon name="chevronRight" size={15} />
              </button>
            </span>
          </nav>
        )}
      </section>

      <History d={d} onResume={start} />

      <Modal open={unlockOpen} onClose={closeUnlock} labelledBy="svp-unlock-h">
        <div className="pf-modal">
          <h2 id="svp-unlock-h">
            <Icon name="key" size={20} /> {t('pf.unlock.t')}
          </h2>
          <UnlockHelp
            about={about}
            onOpen={(x) => {
              setUnlockOpen(false);
              run.setOpen(x);
            }}
          />
          <Button variant="ghost" onClick={closeUnlock}>
            {t('qz.close')}
          </Button>
        </div>
      </Modal>

      <Modal open={terms} onClose={closeTerms} labelledBy="svp-terms-h">
        <div className="pf-modal">
          <h2 id="svp-terms-h">
            <Icon name="shield" size={20} /> {t('svp.terms.t')}
          </h2>
          <p>{t('svp.terms.p')}</p>
          <div className="mb-row">
            <Button href={me.category === 'b2b' ? '/user/professionalterms.html' : '/user/consumerterm.html'} iconEnd="arrow">
              {t('svp.terms.go')}
            </Button>
            <Button variant="ghost" onClick={closeTerms}>
              {t('qz.close')}
            </Button>
          </div>
        </div>
      </Modal>

      {run.open && <Questionnaire key={run.open.slug} kind="profile" source={run.open} onClose={run.close} onDone={run.done} />}
      {survey && <Questionnaire key={survey.respID || survey.slug} kind="survey" source={survey} onClose={closeSurvey} onDone={surveyDone} />}
    </div>
  );
}

/* ------------------------------------------------------------------ participation history */
const STATUS_TONE = { complete: 'ok', terminate: 'bad', overquota: 'warn', dropout: 'mute' };
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
    <section className="xs svp-hist" aria-labelledby="svp-hist-h">
      <header className="svp-hist__head">
        <h2 id="svp-hist-h">{t('svp.hist.t')}</h2>
        <div className="svp-hist__tools">
          <label>
            <span>{t('svp.from')}</span>
            <input type="date" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label>
            <span>{t('svp.to')}</span>
            <input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} />
          </label>
          <label className="svp-search">
            <Icon name="search" size={16} />
            <span className="mb-sr">{t('svp.hist.search')}</span>
            <input type="search" placeholder={t('svp.hist.search')} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        </div>
      </header>
      {d.aStatus === 'error' && !d.activity ? (
        <XError text={t('ac.err')} onRetry={d.aRetry} />
      ) : !d.activity ? (
        <div className="svp-table__skel" aria-hidden="true" />
      ) : (
        <div className="svp-table" role="region" aria-labelledby="svp-hist-h" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">{t('svp.c.name')}</th>
                <th scope="col">{t('svp.c.start')}</th>
                <th scope="col">{t('svp.c.loi')}</th>
                <th scope="col">{t('svp.c.status')}</th>
                <th scope="col">{t('svp.c.rewards')}</th>
                <th scope="col">{t('svp.c.feedback')}</th>
              </tr>
            </thead>
            <tbody>
              {!shown.length ? (
                <tr className="is-empty">
                  <td colSpan={6}>{d.activity.length ? t('svp.hist.none') : t('svp.hist.empty')}</td>
                </tr>
              ) : (
                shown.map((r) => (
                  <tr key={r.id}>
                    <th scope="row" data-label={t('svp.c.name')}>
                      {r.name}
                    </th>
                    <td data-label={t('svp.c.start')}>{when(r)}</td>
                    <td data-label={t('svp.c.loi')}>{r.loi ? t('pf.min', { n: r.loi }) : '—'}</td>
                    <td data-label={t('svp.c.status')}>
                      {r.source === 'internal' && r.status === 'dropout' && r.slug ? (
                        <button type="button" className="svp-badge is-resume" onClick={() => onResume({ slug: r.slug, name: r.name })}>
                          {t('svp.resume')} <Icon name="arrow" size={12} />
                        </button>
                      ) : (
                        <span className={cx('svp-badge', `is-${STATUS_TONE[r.status] || 'mute'}`)}>{t(`svp.st.${r.status}`) !== `svp.st.${r.status}` ? t(`svp.st.${r.status}`) : r.status}</span>
                      )}
                    </td>
                    <td data-label={t('svp.c.rewards')}>{r.points ? <span className="svp-pts">+{fmt(r.points)}</span> : '—'}</td>
                    <td data-label={t('svp.c.feedback')}>
                      {!fb || r.status !== 'complete' ? (
                        '—'
                      ) : memo[r.id] ? (
                        <span className="svp-rated" aria-label={t('svp.rated', { n: memo[r.id] })}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <i key={i} className={cx(i < memo[r.id] && 'is-on')} />
                          ))}
                        </span>
                      ) : (
                        <button type="button" className="mb-linkbtn" onClick={() => setRate(r)}>
                          {t('svp.rate')}
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
        <nav className="svp-pager" aria-label={t('svp.pages')}>
          <span>{t('svp.showing', { a: page * per + 1, b: Math.min(rows.length, page * per + per), n: rows.length })}</span>
          <span className="svp-pager__btns">
            <button type="button" onClick={() => setPg(page - 1)} disabled={page === 0} aria-label={t('svp.prev')}>
              <Icon name="chevronLeft" size={15} />
            </button>
            <button type="button" className="is-on" aria-current="page">
              {page + 1}
            </button>
            <button type="button" onClick={() => setPg(page + 1)} disabled={page >= pages - 1} aria-label={t('svp.next')}>
              <Icon name="chevronRight" size={15} />
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
        <h2 id="svp-rate-h">{t('svp.rate.t')}</h2>
        <p>{row?.name}</p>
        <div className="svp-gems" role="radiogroup" aria-label={t('svp.rate.t')}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} type="button" role="radio" aria-checked={n === i} aria-label={t('svp.rated', { n: i })} className={cx(i <= n && 'is-on')} onClick={() => setN(i)}>
              <Icon name="spark" size={22} />
            </button>
          ))}
        </div>
        <div className="mb-row">
          <Button
            disabled={!n}
            onClick={() => {
              const m = engageMemo.get().svFeedback || {};
              engageMemo.set({ svFeedback: { ...m, [row.id]: n } });
              toast(t('svp.rate.thanks'));
              onClose();
            }}
          >
            {t('svp.rate.send')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('qz.close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
