import { Component, lazy, Suspense, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Header from './components/Header.jsx';
import LangRail from './components/LangRail.jsx';
import Atmosphere from './components/Atmosphere.jsx';
import Hub, { CAT } from './components/Hub.jsx';
import { Icon, Flag } from './components/Icon.jsx';
import { ToastProvider, useToast } from './components/Toasts.jsx';
import { SPRITE } from './lib/icons.js';
import { TW, themeCSS } from './lib/themes.js';
import { loadData, ensureFor, warm, PROFILES } from './lib/data.js';
import { submitProfile, CFG } from './lib/config.js';
import { track, noteAccount } from './lib/signals.js';
import { LS, loadDone, saveDone, loadDraft, saveDraft, clearDraft } from './lib/storage.js';
import { buildCountryMap, themeId, pnameT, qText, secName } from './lib/present.js';
import { sound } from './lib/sound.js';
import { finePointer, reducedMotion, ripple } from './lib/fx.js';
import { BY } from './i18n/languages.js';
import { t, useI18n, setLang, lang, langMeta } from './i18n/index.js';
import { initSeen, syncProgress, emitRewards } from './lib/rewards.js';

/* Per-world CSS variables: the production build inlines them in index.html (#t2o-worlds); otherwise inject once. */
if (typeof document !== 'undefined' && !document.getElementById('t2o-worlds')) {
  const st = document.createElement('style'); st.id = 't2o-worlds'; st.textContent = themeCSS(); document.head.append(st);
}
/* Icon sprite: inlined in index.html by the build; injected once otherwise. */
if (typeof document !== 'undefined' && !document.getElementById('t2o-icons')) {
  const d = document.createElement('div'); d.id = 't2o-icons'; d.className = 'sprite'; d.innerHTML = SPRITE; document.body.prepend(d);
}
/* Code-split: the question flow, the completion screen and the language picker load on demand. */
const loadFlow = () => import('./components/Flow.jsx'), loadDoneView = () => import('./components/Completion.jsx');
const Flow = lazy(loadFlow), Completion = lazy(loadDoneView), LangSheet = lazy(() => import('./components/LangSheet.jsx'));
/* answers from every saved profile (for cross-profile validation and pre-filling the phone country) */
export function allAnswers(except) {
  const A = {};
  for (const p of PROFILES) { if (p === except) continue; const d = loadDone(p); if (d && d.a) Object.assign(A, d.a); }
  return A;
}
const loadQuality = () => import('./lib/quality.js'), loadEngine = () => import('./lib/engine.js');
warm.add(() => { loadFlow(); loadDoneView(); loadQuality(); loadEngine(); });

function Shell() {
  const I = useI18n();
  const toast = useToast();
  const [D, setD] = useState(null);
  const [view, setView] = useState({ name: 'hub' });     // hub | loading | flow | review | error
  const [cat, setCat] = useState(() => (CAT[LS.get('ui:cat')] ? LS.get('ui:cat') : 'b2c'));
  const [theme, setTheme] = useState('brand');
  const [dir, setDir] = useState(1);
  const [qKey, setQKey] = useState(0);
  const [err, setErr] = useState(null);
  const [shake, setShake] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [sheetUsed, setSheetUsed] = useState(false);
  const [atmos, setAtmos] = useState(false);   // background world fades in once the page has settled
  useEffect(() => { const go = () => setAtmos(true); if ('requestIdleCallback' in window) { const id = requestIdleCallback(go, { timeout: 1500 }); return () => cancelIdleCallback(id); } const id = setTimeout(go, 300); return () => clearTimeout(id); }, []);
  useEffect(() => { if (sheet) setSheetUsed(true); }, [sheet]);
  useEffect(() => { initSeen(); syncProgress(); }, []);   // Opinion City: first visit counts earlier profiles as built; tell the reminder service
  const [notice, setNotice] = useState(() => I.how === 'browser' && lang() !== 'en' && !LS.get('ui:lang-notice'));
  const [, bump] = useReducer((x) => x + 1, 0);
  const sRef = useRef(null), timers = useRef({}), lastArrow = useRef(0), pendingOpen = useRef(-1);
  const s = sRef.current;

  useEffect(() => {
    document.documentElement.dataset.t = theme;
    const x = sRef.current; document.documentElement.dataset.vibe = x ? (x.prof.c === 'minor' ? 'teen' : /^(professional|financial|banking-financial-services|additional)$/.test(x.prof.s) ? 'pro' : 'fun') : 'hub';
    const m = document.querySelector('meta[name="theme-color"]'), w = TW[theme];
    if (m && w) m.content = theme === 'brand' ? '#ffffff' : w.a;
  }, [theme]);
  useEffect(() => {
    const x = sRef.current;
    document.title = x ? `${pnameT(x.prof)} · Turn2Opinion` : `${t('eyebrow')} · Turn2Opinion`;
  });

  /* ---------- language ---------- */
  const chooseLang = useCallback((code, e) => {
    sound.lang(code);                                   // each language has its own short motif
    setSheet(false); setNotice(false); LS.set('ui:lang-notice', '1');
    const vt = document.startViewTransition && !reducedMotion();
    if (vt && e && e.clientX != null) {
      document.documentElement.style.setProperty('--vx', e.clientX + 'px');
      document.documentElement.style.setProperty('--vy', e.clientY + 'px');
    } else document.documentElement.style.setProperty('--vx', '50%');
    const done = () => toast(t('lang_set', { name: BY[code].n }), 'translate', 1800);
    const wrap = vt ? (apply) => {
      try { document.startViewTransition(() => flushSync(apply)).updateCallbackDone.then(done, done); } catch (er) { apply(); done(); }
    } : (apply) => { apply(); done(); };
    setLang(code, { how: 'user', wrap });
    setTimeout(syncProgress, 50);   // reminder e-mails follow the language the member picks
  }, [toast]);

  /* ---------- draft autosave ---------- */
  const persistDraft = useCallback((now) => {
    const x = sRef.current; if (!x || x.edit || x.done) return;
    clearTimeout(timers.current.d);
    const w = () => saveDraft(x.prof, { a: x.ans, r: x.raw, i: x.i, p: x.pct || 0, t: Date.now() });
    if (now) w(); else timers.current.d = setTimeout(w, 300);
  }, []);
  useEffect(() => {
    const h = () => persistDraft(true);
    addEventListener('pagehide', h); return () => removeEventListener('pagehide', h);
  }, [persistDraft]);

  /* ---------- navigation ---------- */
  const announce = (x, i) => {
    const sr = document.getElementById('sr'); if (!sr) return;
    const vs = x.visList();
    sr.textContent = `${x.one ? t('editing_one') : t('q_of', { n: vs.indexOf(i) + 1, total: vs.length })}: ${qText(x, x.nm(i))}`;
  };
  const show = (i, d) => {
    const x = sRef.current; x.i = i; x.live = false; x.shownAt = Date.now(); track.question();
    clearTimeout(timers.current.adv);
    setErr(null); setShake(false); setDir(d); setQKey((k) => k + 1);
    announce(x, i);
  };
  /* Leaving a profile. Opening a profile adds a browser-history entry (#/<category>/<slug>), so the phone's back
     gesture, the browser Back button and "All profiles" all return to the hub with the draft saved — instead of
     leaving the site and showing a blank page (the v4 "white screen" bug). */
  const doHome = () => {
    persistDraft(true); clearTimeout(timers.current.adv);
    sRef.current = null; pendingOpen.current = -1; setTheme('brand'); setView({ name: 'hub' }); setBusy(false); setErr(null);
    window.scrollTo({ top: 0 });
  };
  const home = () => {
    if (history.state && history.state.t2o) { history.back(); return; }   // popstate → doHome()
    doHome();
  };
  const review = (msg, celebrate) => {
    const x = sRef.current; x.edit = false; x.one = false; x.done = true; clearTimeout(timers.current.adv);
    setBusy(false); setView({ name: 'review', msg, celebrate: !!celebrate, k: Date.now() });
  };
  const start = async (d, i) => {
    let guess = 'US'; try { guess = (await loadQuality()).GUESS(); } catch (e) { /* offline chunk */ }
    const { Session } = await loadEngine();
    const p = d.P[i], x = new Session(d, p, () => allAnswers(p), guess);
    sRef.current = x; setTheme(themeId(p));
    const sv = loadDone(p);
    if (sv) {
      x.ans = JSON.parse(JSON.stringify(sv.a)); x.raw = JSON.parse(JSON.stringify(sv.r || {}));
      await ensureFor(x).catch(() => {});
      return review();
    }
    const dr = loadDraft(p);
    if (dr && dr.a) {
      x.ans = JSON.parse(JSON.stringify(dr.a)); x.raw = JSON.parse(JSON.stringify(dr.r || {}));
      await ensureFor(x).catch(() => {});
      x.prune();
      const vs = x.visList(); let j = vs.includes(dr.i) ? dr.i : vs.find((k) => x.check(x.nm(k)) !== ''); if (j == null) j = vs[vs.length - 1];
      x.hist = vs.filter((k) => k < j); [25, 50, 75].forEach((m) => { if ((dr.p || 0) >= m) x.ms.add(m); });
      setView({ name: 'flow' }); show(j, 1); window.scrollTo({ top: 0 });
      toast(t('resumed'), 'check', 3200);
    } else {
      const j = x.nv(-1); if (j < 0) return review();
      setView({ name: 'flow' }); show(j, 1); window.scrollTo({ top: 0 });
    }
  };
  const open = async (i, fromHistory) => {
    const p0 = PROFILES[i]; if (!p0) return;
    if (!fromHistory) { try { if (history.state && history.state.t2o) history.replaceState({ t2o: 1, i }, '', '#/' + p0.c + '/' + p0.s); else history.pushState({ t2o: 1, i }, '', '#/' + p0.c + '/' + p0.s); } catch (e) { /* sandboxed iframe */ } }
    if (D) return start(D, i);
    pendingOpen.current = i;
    setView({ name: 'loading' });
    try { const d = await loadData(); buildCountryMap(d); setD(d); if (pendingOpen.current === i) start(d, i); }
    catch (e) { setView({ name: 'error', i }); }
  };

  const fail = (text) => {
    const x = sRef.current; x.live = true; setErr({ text });
    setShake(false); requestAnimationFrame(() => setShake(true));
    const q = document.getElementById('qi'); if (q) q.focus();
  };
  /* Quality layer sent with every profile: validation flags, cross-profile consistency, privacy-conscious
     device/behaviour signals, verification status, completeness and a provisional trust score.
     The server recomputes the score with IP / device / duplicate / history data (see docs/VALIDATION.md). */
  const quality = async (x) => (await loadQuality()).buildQuality(x, Object.assign(allAnswers(x.prof), x.ans));
  const commit = async (msg, celebrate) => {
    const x = sRef.current; sound.prime(); setBusy(true);
    saveDone(x.prof, x.ans, x.raw);       // saved on the device first, exactly like the original page
    let q = null;
    try { q = await quality(x); } catch (e) { q = null; }
    if (x.ans.mail) noteAccount(x.ans.mail);
    /* No consent screens, CAPTCHAs or "press and hold" checks: members already gave consent at registration.
       Bot / risk signals travel silently in payload.quality and are scored on the server. */
    const all = Object.assign(allAnswers(x.prof), x.ans), context = {};
    ['firstname', 'lastname', 'mail', 'phone', 'dob', 'gender', 'country', 'state', 'add-residence', 'add-nationality', 'empstat', 'add-jobtitle', 'workemail'].forEach((k) => { if (all[k] != null && all[k] !== '') context[k] = all[k]; });
    try { await submitProfile(Object.assign(x.payload(), { memberId: q && q.signals && q.signals.installId, context, language: lang(), submittedAt: new Date().toISOString(), quality: q })); }
    catch (e) { setBusy(false); setErr({ text: t('submit_err'), submit: true }); return; }
    clearDraft(x.prof); emitRewards(); syncProgress(); review(msg, celebrate);
  };
  const next = async () => {
    const x = sRef.current; if (!x || x.done || x.navving) return;
    const n = x.cur(), e = x.check(n); clearTimeout(timers.current.adv);
    if (e) return fail(e);
    x.navving = true;
    try { await ensureFor(x); } catch (er) { /* list chunk failed; questions that need it stay hidden */ }
    x.navving = false;
    if (sRef.current !== x || x.done) return;
    if (CFG.api && /^(mail|workemail|alternate-email)$/.test(n) && x.ans[n]) {   // server: MX + extra disposable list
      const key = n + ':' + x.ans[n]; x.mx = x.mx || {};
      if (x.mx[key] === undefined) {
        try { const r = await fetch(CFG.api.replace(/\/$/, '') + '/validate/email', { method: 'POST', credentials: CFG.credentials, headers: Object.assign({ 'Content-Type': 'application/json' }, CFG.headers), body: JSON.stringify({ email: x.ans[n], work: n === 'workemail' }) }).then((y) => y.json()); x.mx[key] = r.level === 'block' ? r.code : ''; }
        catch (er) { x.mx[key] = ''; }   // API unreachable: never block on that
      }
      if (sRef.current !== x) return;
      if (x.mx[key]) return fail(t('v_' + x.mx[key]));
    }
    const w = x.warn(n);                       // soft / step-up: ask once, then accept and record a flag
    if (w) { x.live = true; setErr(w); sound.click(themeId(x.prof), 'warn'); return; }
    x.normalise(n);
    sound.click(themeId(x.prof), 'next');
    if (x.one) {
      x.prune();
      const j = x.flat.findIndex(([m]) => x.vis(m) && x.check(m) !== '');
      if (j >= 0) { x.hist.push(x.i); show(j, 1); } else commit('changes_saved', false);
      return;
    }
    const j = x.nv(x.i);
    if (j < 0) return commit(x.edit ? 'changes_saved' : '', !x.edit);
    if (x.flat[j][1] !== x.flat[x.i][1] && !x.edit) { toast(t('section_done', { name: secName(x.flat[x.i][1]) }), 'check'); sound.tick(); }
    x.hist.push(x.i); persistDraft(); show(j, 1);
  };
  const back = () => {
    const x = sRef.current; clearTimeout(timers.current.adv);
    const restore = () => { [x.ans, x.raw] = JSON.parse(x.snap); x.cache.clear(); review(); };
    if (!x.hist.length && x.edit) return restore();
    let j;
    while (x.hist.length) { j = x.hist.pop(); if (x.vis(x.nm(j)) && !x.skip(j)) break; j = undefined; }
    if (j === undefined) { if (x.edit) restore(); return; }
    sound.click(themeId(x.prof), 'back'); show(j, -1);
  };
  const editOne = (i) => { const x = sRef.current; x.prev = JSON.parse(JSON.stringify(x.ans)); x.snap = JSON.stringify([x.ans, x.raw]); x.edit = true; x.one = true; x.done = false; x.hist = []; x.ms = new Set([25, 50, 75]); setView({ name: 'flow' }); show(i, 1); };
  const editAll = () => {
    const x = sRef.current; x.prev = JSON.parse(JSON.stringify(x.ans)); x.snap = JSON.stringify([x.ans, x.raw]); x.edit = true; x.one = false; x.done = false; x.hist = []; x.ms = new Set([25, 50, 75]);
    const j = x.nv(-1); if (j < 0) return review(); setView({ name: 'flow' }); show(j, 1);
  };
  const jump = (j) => { const x = sRef.current; if (j === x.i) return; x.hist.push(x.i); show(j, j > x.i ? 1 : -1); };

  /* header points pill → the Opinion City board on the hub */
  const goRewards = () => {
    const run = () => { dispatchEvent(new Event('t2o:rewards')); requestAnimationFrame(() => { const el = document.getElementById('rewards'); if (el) el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' }); }); };
    if (sRef.current) { home(); setTimeout(run, 420); } else run();
  };

  /* actions used by the field components */
  const act = {
    home, open, back, next, jump, editOne, editAll,
    nextClick: () => { const x = sRef.current; if (Date.now() - (x.shownAt || 0) > 250 && Date.now() - (x.autoAt || 0) > 600) next(); },
    answer: (n, v, o = {}) => {
      const x = sRef.current; x.ans[n] = v;
      if (!o.quiet && (x.opts(n) || o.click)) sound.click(themeId(x.prof), Array.isArray(v) ? 'toggle' : 'pick');
      if (o.raw !== undefined) x.raw[n] = o.raw;
      if (o.prune) x.prune();
      if (o.live) x.live = true;
      setErr(x.live ? { text: x.check(n) } : null);
      persistDraft(); bump();
      if (o.prune) ensureFor(x).then((ch) => { if (ch && sRef.current === x) bump(); }).catch(() => {});   // prefetch dependent lists (cities, job titles)
    },
    /* "Other — please specify" text for question n */
    other: (n, v) => {
      const x = sRef.current; if (!x) return;
      x.ans[n + '-other'] = v;
      setErr(x.live ? { text: x.check(n) } : null);
      persistDraft(); bump();
    },
    /* soft notice: "Yes, it's correct" → accept and continue */
    confirm: (v) => {
      const x = sRef.current; if (!x || !err) return; const n = x.cur();
      x.confirm(n); setErr(null); next();
    },
    setLive: () => { const x = sRef.current; x.live = true; setErr({ text: x.check(x.cur()) }); },
    /* move on by itself after a choice, with a short sweep so the change isn't abrupt */
    auto: (n, el) => {
      const x = sRef.current; clearTimeout(timers.current.adv);
      if (Date.now() - lastArrow.current < 250 || x.check(n)) return;
      if (el && !reducedMotion()) { document.querySelectorAll('.adv').forEach((a) => a.remove()); const sw = document.createElement('span'); sw.className = 'adv'; el.append(sw); }
      if (x.nv(x.i) < 0 && !x.one) sound.prime();
      timers.current.adv = setTimeout(() => { const y = sRef.current; if (y && !y.done && y.cur() === n && !y.check(n)) { y.autoAt = Date.now(); next(); } }, 420);
    },
  };

  /* browser history: Back/forward and deep links like #/b2c/travel */
  const navRef = useRef({}); navRef.current = { doHome, open };
  useEffect(() => {
    const idx = () => { const m = /^#\/([\w-]+)\/([\w-]+)$/.exec(location.hash); return m ? PROFILES.findIndex((p) => p.c === m[1] && p.s === m[2]) : -1; };
    const pop = (e) => {
      if (e.state && e.state.t2o) { if (!sRef.current) navRef.current.open(e.state.i, true); return; }
      if (sRef.current || pendingOpen.current >= 0) navRef.current.doHome(); else { setView((v) => (v.name === 'hub' ? v : { name: 'hub' })); setTheme('brand'); }
    };
    addEventListener('popstate', pop);
    const i = idx();
    if (i >= 0) { try { history.replaceState(null, '', location.pathname + location.search); history.pushState({ t2o: 1, i }, '', '#/' + PROFILES[i].c + '/' + PROFILES[i].s); } catch (e) { /* ignore */ } navRef.current.open(i, true); }
    return () => removeEventListener('popstate', pop);
  }, []);

  /* global keyboard + pointer helpers */
  useEffect(() => {
    const kd = (e) => {
      if (/^Arrow/.test(e.key)) lastArrow.current = Date.now();
      const x = sRef.current;
      if (e.altKey && e.key === 'ArrowLeft' && x && !x.done && (x.hist.length || x.edit)) { e.preventDefault(); back(); }
    };
    addEventListener('keydown', kd, true);
    let raf = 0, last = null;
    const pm = (e) => {
      last = e; if (raf || reducedMotion()) return;
      raf = requestAnimationFrame(() => {
        raf = 0; const ev = last, c = ev.target.closest && ev.target.closest('.tile,.pcard,.qemo');
        if (c) { const r = c.getBoundingClientRect(), fx = (ev.clientX - r.left) / r.width, fy = (ev.clientY - r.top) / r.height;
          c.style.setProperty('--mx', (fx * 100).toFixed(1) + '%'); c.style.setProperty('--my', (fy * 100).toFixed(1) + '%');
          c.style.setProperty('--tx', ((fx - 0.5) * 2).toFixed(3)); c.style.setProperty('--ty', ((fy - 0.5) * 2).toFixed(3)); }
      });
    };
    const vis = () => document.documentElement.classList.toggle('paused', document.hidden);
    if (finePointer()) document.addEventListener('pointermove', pm, { passive: true });
    document.addEventListener('visibilitychange', vis);
    return () => { removeEventListener('keydown', kd, true); document.removeEventListener('pointermove', pm); document.removeEventListener('visibilitychange', vis); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { window.T2O = { payload: () => (sRef.current ? Object.assign(sRef.current.payload(), { language: lang() }) : null), setLang: (c) => setLang(c), playLang: (c) => sound.lang(c), version: '5.2' }; }, []);

  const onPointerDown = (e) => {
    const el = e.target.closest('.tile,.row,.sc,.chip,.lv .bar,.btn,.lchip'); if (el) ripple(el, e);
    const x = sRef.current; if (x && !x.done && x.nv(x.i) < 0) sound.prime();
  };

  const tw = s ? TW[themeId(s.prof)] : TW.brand, L = langMeta();
  let body;
  if (view.name === 'loading') body = <div className="loading" role="status"><span className="spin" />{t('loading')}</div>;
  else if (view.name === 'error') body = <div className="card errcard"><h2 className="qt">{t('load_err')}</h2><p className="hint">{t('load_err_p')}</p><div className="nav"><button className="btn gh" type="button" onClick={home}>{t('all_profiles')}</button><button className="btn pr" type="button" onClick={() => open(view.i)}>{t('retry')}</button></div></div>;
  else if (view.name === 'flow' && s) body = <Flow s={s} tw={tw} act={act} dir={dir} qKey={qKey} err={err} shake={shake} busy={busy} />;
  else if (view.name === 'review' && s) body = <Completion key={view.k} s={s} tw={tw} msg={view.msg} celebrate={view.celebrate} act={act} />;
  else body = <Hub cat={cat} setCat={setCat} onOpen={open} onPickLang={chooseLang} />;

  return (
    <div id="t2o">
      <a className="skip" href="#app">{t('skip')}</a>
      {atmos && <Atmosphere themeId={theme} slug={s ? s.prof.s : ''} />}
      <div className="tbar" aria-hidden="true"><i style={{ '--w': (view.name === 'flow' && s ? s.progress().pct : view.name === 'review' && view.celebrate ? 100 : 0) + '%' }} /></div>
      <Header onHome={() => { if (sRef.current) home(); else window.scrollTo({ top: 0, behavior: 'smooth' }); }} onLang={() => setSheet(true)} onRewards={goRewards} />
      {notice && (
        <div className="notice" role="status">
          <Flag cc={L.f} /><span>{t('lang_detected', { name: L.n })}</span>
          <button type="button" className="lnk" onClick={() => { setSheet(true); setNotice(false); LS.set('ui:lang-notice', '1'); }}>{t('lang_change')}</button>
          <button type="button" className="ib sm" aria-label={t('close')} onClick={() => { setNotice(false); LS.set('ui:lang-notice', '1'); }}><Icon n="x" /></button>
        </div>
      )}
      {I.mtDown && <div className="notice warn" role="status"><Icon n="translate" /><span>{t('lang_mt_down')}</span></div>}
      {view.name === 'hub' && <LangRail onPick={chooseLang} onMore={() => setSheet(true)} />}
      <div className="wrap">
        <main id="app" tabIndex={-1} onPointerDown={onPointerDown}>
          <Guard key={view.name + (s ? s.prof.s : '')} onHome={doHome}><Suspense fallback={<Skeleton />}>{body}</Suspense></Guard>
        </main>
        {atmos && <footer className="foot"><Icon n="shield" /><span>{t('footer')}</span></footer>}
      </div>
      {(sheet || sheetUsed) && <Suspense fallback={null}><LangSheet open={sheet} onClose={() => setSheet(false)} onPick={chooseLang} /></Suspense>}
      <p className="sr" id="sr" aria-live="polite" />
    </div>
  );
}

/* A loading placeholder with the page's shape (never a blank screen while a chunk loads). */
function Skeleton() {
  return <div className="skel" role="status" aria-label={t('loading')}><span className="sk-a" /><span className="sk-b" /><span className="sk-c" /><span className="sk-c" /><span className="sk-c short" /></div>;
}
/* If anything inside a screen throws, show a friendly recovery card instead of an empty white page.
   Answers are already saved on the device, so going back to the profiles loses nothing. */
class Guard extends Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { try { console.error('[t2o] screen error', err, info && info.componentStack); window.dispatchEvent(new CustomEvent('t2o:error', { detail: { message: String(err && err.message), stack: info && info.componentStack } })); } catch (e) { /* ignore */ } }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="card errcard" role="alert">
        <div className="err-emo" aria-hidden="true">🛟</div>
        <h2 className="qt">{t('oops_title')}</h2><p className="hint">{t('oops_p')}</p>
        <div className="nav"><button className="btn pr" type="button" onClick={() => { this.setState({ err: null }); this.props.onHome(); }}><Icon n="arrow-l" className="flip" />{t('all_profiles')}</button>
          <button className="btn gh" type="button" onClick={() => location.reload()}>{t('retry')}</button></div>
      </div>
    );
  }
}

export default function App() {
  return <ToastProvider><Shell /></ToastProvider>;
}
