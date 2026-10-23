import { useEffect, useRef, useState } from 'react';
import { Icon, Flag } from './Icon.jsx';
import ProfileCard from './ProfileCard.jsx';
import { PROFILES } from '../lib/data.js';
import { LOCK, filled } from '../lib/engine.js';
import { completeness, COMPLETENESS_AREAS } from '../lib/validate/risk.js';
import { CELEBRATIONS, celebrate as celebrateFx } from '../lib/fx.js';
import { profileEmoji, qEmoji } from '../lib/emoji.js';
import { loadDone } from '../lib/storage.js';
import { flagFor, themeId, pnameT, qText, ansLabel } from '../lib/present.js';
import { sound } from '../lib/sound.js';
import { useToast } from './Toasts.jsx';
import { t, tr, nf, lang, useI18n } from '../i18n/index.js';
import { towerSpec, towerSVG, towerBox, CITY_DEFS } from '../lib/city-art.js';
import { totalPoints, fmtUsd, markPaid, isPaid, POINTS_PER_PROFILE, POINTS_PER_USD } from '../lib/rewards.js';
import { skyFirework, flyToPill, pillPop } from '../lib/cityfx.js';
import { profileKey } from '../lib/storage.js';
import { reducedMotion } from '../lib/fx.js';
import Odo from './Odo.jsx';
import { ensureCityStyles } from '../lib/city-style.js';

ensureCityStyles();

/* Opinion City reward on the completion screen (first finish only): the profile's tower rises from its
   blueprint between the respondent's other towers, its windows light up floor by floor, the emoji lands on
   the roof and a firework bursts with +100 Opinion Points. The odometer rolls to the new balance. */
function TowerRise({ p }) {
  const box = useRef(null), sp = towerSpec(p.s);
  const after = totalPoints(), before = Math.max(0, after - POINTS_PER_PROFILE);
  const [phase, setPhase] = useState(0), [v, setV] = useState(before);
  const hood = PROFILES.filter((q) => q.c === p.c && q !== p && loadDone(q)).slice(0, 6).map((q) => towerSpec(q.s));
  const left = hood.filter((_, i) => i % 2 === 0), right = hood.filter((_, i) => i % 2 === 1);
  useEffect(() => {
    if (reducedMotion()) { setPhase(3); setV(after); return undefined; }
    const code = lang(), T = [];
    T.push(setTimeout(() => { setPhase(1); sound.build(code); }, 1300));
    T.push(setTimeout(() => { setPhase(2); sound.windows(code, 6); }, 2150));
    T.push(setTimeout(() => {
      setPhase(3); setV(after); sound.firework();
      const host = box.current, tw = host && host.querySelector('.tr-main .tw-art');
      if (!tw) return;
      const hr = host.getBoundingClientRect(), r = tw.getBoundingClientRect(), x = r.left - hr.left + r.width / 2, y1 = Math.max(30, r.top - hr.top - 56), key = profileKey(p);
      skyFirework(host, x, r.top - hr.top, y1, [sp.a, sp.a2, sp.a3, '#ffd66b'], t('rw_plus', { n: POINTS_PER_PROFILE })).then(() => {
        if (isPaid(key) || !box.current) return null;
        return flyToPill({ x: hr.left + x, y: hr.top + y1 }, t('rw_plus', { n: POINTS_PER_PROFILE }), [sp.a2, sp.a3, '#ffd66b']);
      }).then((el) => { if (el) { markPaid(key); pillPop(el); sound.land(code); } });
    }, 3050));
    return () => T.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const toNext = POINTS_PER_USD - (after % POINTS_PER_USD);
  const mini = (s, k) => <span key={k} className="tr-n" style={{ aspectRatio: '40 / ' + towerBox(s).vbH }} dangerouslySetInnerHTML={{ __html: towerSVG(s, 'lit') }} />;
  return (
    <div className={'trise ph' + phase} ref={box} role="group" aria-label={t('cel_rw_title')}>
      <svg className="city-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs dangerouslySetInnerHTML={{ __html: CITY_DEFS }} /></svg>
      <div className="tr-scene" aria-hidden="true">
        <span className="sky-stars" /><span className="tr-glow" />
        <div className="tr-row">
          {left.map(mini)}
          <span className="tr-main" style={{ aspectRatio: '40 / ' + towerBox(sp).vbH }}>
            <span className="tr-bp" dangerouslySetInnerHTML={{ __html: towerSVG(sp, 'plot') }} />
            <span className="tw-clip"><span className="tw-art" dangerouslySetInnerHTML={{ __html: towerSVG(sp, 'lit') }} /></span>
            <span className="tr-emo">{profileEmoji(p.s)[0]}</span>
          </span>
          {right.map(mini)}
        </div>
        <span className="tr-street" />
      </div>
      <div className="tr-txt">
        <p className="tr-title">{t('cel_rw_title')}</p>
        <p className="tr-got"><span className="tr-plus">{t('cel_rw_got', { n: nf(POINTS_PER_PROFILE) })}</span></p>
        <p className="tr-bal"><Odo value={v} /> <span>{t('rw_pts')} · {fmtUsd(v)}</span></p>
        <p className="tr-next">{t('cel_rw_next', { n: nf(toNext), usd: fmtUsd((Math.floor(after / POINTS_PER_USD) + 1) * POINTS_PER_USD) })}</p>
        <span className="sr">{t('cel_rw_bal', { pts: nf(after), usd: fmtUsd(after) })}</span>
      </div>
    </div>
  );
}

function Badge({ tw, emo }) {
  return (
    <svg viewBox="0 0 150 150" aria-hidden="true">
      <defs>
        <linearGradient id="bgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style={{ stopColor: 'var(--a2)' }} /><stop offset="1" style={{ stopColor: 'var(--a)' }} /></linearGradient>
        <linearGradient id="bgl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <circle className="rb" cx="75" cy="75" r="70" fill="none" style={{ stroke: 'var(--a3)' }} strokeWidth="3" strokeDasharray="440" strokeLinecap="round" />
      <path d="M75 22l46 26.5v53L75 128l-46-26.5v-53z" fill="rgba(0,0,0,.18)" transform="translate(3 5)" />
      <path d="M75 16l50 29v58l-50 29-50-29V45z" fill="url(#bgr)" />
      <path d="M75 16l50 29-50 29-50-29z" fill="url(#bgl)" />
      <path d="M75 16l50 29v58l-50 29-50-29V45z" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
      <text x="75" y="76" textAnchor="middle" dominantBaseline="central" fontSize="46" className="be">{emo}</text>
      <g style={{ fill: 'var(--a3)' }}>
        <path d="M20 30l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" /><path d="M130 112l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      </g>
    </svg>
  );
}

/* Completion (celebrate=true, first finish only) and the review/edit screen for saved profiles. */
export default function Completion({ s, tw, msg, celebrate, act }) {
  useI18n();
  const badge = useRef(null), toast = useToast();
  const [copied, setCopied] = useState(false), [fallback, setFallback] = useState('');
  const p = s.prof, name = pnameT(p), world = themeId(p);
  const cr = (CELEBRATIONS[world] || CELEBRATIONS.brand)[0], cel = p.c === 'minor' ? cr[cr.length - 1] : cr[0];
  const A = {}; for (const q of PROFILES) { const d = q === p ? null : loadDone(q); if (d && d.a) Object.assign(A, d.a); }
  Object.assign(A, s.ans);
  const cm = completeness(A), vm = A['verify-mail'], vp = A['verify-phone'];
  const vstate = (v) => v === 'verified' ? 'ok' : v === 'demo' ? 'demo' : 'no';

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const h = document.getElementById('dh'); if (h) h.focus({ preventScroll: true });
    if (!celebrate) return;
    if (toast.clear) toast.clear();
    sound.chime(world);   // only after a successful finish; muted viewers still get the visuals
    requestAnimationFrame(() => celebrateFx(world, [tw.a, tw.a2, tw.a3], badge.current, p.c === 'minor', profileEmoji(p.s).concat('🎉', '⭐')));
    const sr = document.getElementById('sr'); if (sr) sr.textContent = t('complete_sr', { name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rows = s.flat.map(([n], i) => (s.vis(n) && filled(s.ans[n])) ? (
    <div className="rv" key={n}>
      <span className="rv-e" aria-hidden="true">{qEmoji(n, s.q(n), p.s)}</span>
      <div className="rv-t"><small>{qText(s, n)}</small><div className="val"><Flag cc={flagFor(s, n, s.lab(n, s.ans[n]), Array.isArray(s.ans[n]) ? '' : s.ans[n])} />{ansLabel(s, n, s.ans[n])}</div></div>
      <button className={'eb' + (LOCK.test(n) ? ' id' : '')} type="button" data-e={i} aria-label={t('edit_aria', { q: qText(s, n) })} title={LOCK.test(n) ? t('identity_note') : undefined} onClick={() => act.editOne(i)}><Icon n="edit" />{t('edit')}</button>
    </div>
  ) : null);
  const count = s.flat.filter(([n]) => s.vis(n) && filled(s.ans[n])).length;
  const same = themeId(p);
  const sug = PROFILES.map((q, i) => [q, i]).filter(([q]) => q.c === p.c && q !== p && !loadDone(q))
    .sort((x, y) => (themeId(y[0]) === same) - (themeId(x[0]) === same)).slice(0, 3);
  const all = PROFILES.filter((q) => q.c === p.c), dn = all.filter((q) => loadDone(q)).length;

  const copy = () => {
    const txt = JSON.stringify(s.payload(), null, 2);
    const ok = () => { setCopied(true); toast(t('copied_toast'), 'copy'); };
    try { navigator.clipboard.writeText(txt).then(ok, () => setFallback(txt)); } catch (e) { setFallback(txt); }
  };

  return (
    <div className="donewrap">
      <section className={'card done v-' + (tw.card || 'soft') + (celebrate ? ' cel' : '')} data-cel={cel} id="done">
        <span className="glow" aria-hidden="true" />
        <span className="rays" aria-hidden="true" />
        <div className="badge" ref={badge}><Badge tw={tw} emo={profileEmoji(p.s)[0]} /></div>
        <p className="eyebrow"><span className="dot" />{celebrate ? tr(tw.badge) : t('saved_title')}</p>
        <h1 tabIndex={-1} id="dh">{celebrate ? t('done_title', { name }) : t('review_title', { name })}</h1>
        <p className="mu">{msg ? t(msg) : celebrate ? t('thanks') : t('saved_note')}</p>
        <div className="stats">
          <span><b>{nf(count)}</b>{t('st_answers')}</span><span><b>{nf(100)}%</b>{t('st_complete')}</span><span><b>{nf(dn)}/{nf(all.length)}</b>{t('st_profiles')}</span>
        </div>
        {celebrate && <TowerRise p={p} />}
        <div className="acts">
          <button className="btn pr big" id="ea" type="button" onClick={act.editAll}><Icon n="edit" />{t('edit_responses')}</button>
          <button className="btn gh" id="hb" type="button" onClick={act.home}><Icon n="arrow-l" className="flip" />{t('all_profiles')}</button>
        </div>
        <p className="hint edh">{t('edit_hint')}</p>
      </section>
      <section className="card strength" aria-labelledby="sth">
        <div className="st-top">
          <div className="st-ring" style={{ '--p': cm.score }} role="img" aria-label={t('strength') + ' ' + nf(cm.score) + '%'}><b>{nf(cm.score)}%</b></div>
          <div><h2 id="sth">{t('strength')}</h2><p className="hint">{t('strength_sub')}</p>
            <div className="vbadges">
              {[['mail', vm], ['phone', vp]].map(([k, v]) => (
                <span key={k} className={'vb ' + vstate(v)}><Icon n={vstate(v) === 'ok' ? 'check' : k} />{t('ver_' + k)} · {vstate(v) === 'ok' ? t('verified') : vstate(v) === 'demo' ? t('ver_demo') : t('ver_skip')}</span>
              ))}
            </div>
          </div>
        </div>
        <ul className="st-areas">
          {Object.keys(COMPLETENESS_AREAS).map((k) => (
            <li key={k}><span>{t('area_' + k)}</span><i style={{ '--w': cm.areas[k] + '%' }} /><b>{nf(cm.areas[k])}%</b></li>
          ))}
        </ul>
      </section>
      {sug.length > 0 && (
        <section className="nexts"><h2>{t('keep_going')}</h2>
          <div className="pgrid">{sug.map(([q, i], k) => <ProfileCard key={i} p={q} i={i} k={k} onOpen={act.open} />)}</div>
        </section>
      )}
      <section className="card rev">
        <div className="rev-h"><h2>{t('your_answers')}</h2><button className="btn gh sm" type="button" onClick={act.editAll}><Icon n="edit" />{t('edit_responses')}</button></div>
        {rows}
        <div className="revf">
          <span>{t('locked_note')}</span>
          <button className="lnk" id="cp" type="button" onClick={copy}><Icon n={copied ? 'check' : 'copy'} /> {copied ? t('copied') : t('copy_json')}</button>
        </div>
        {fallback && <textarea className="in" rows={8} readOnly value={fallback} onFocus={(e) => e.target.select()} aria-label={t('json_label')} />}
      </section>
    </div>
  );
}
