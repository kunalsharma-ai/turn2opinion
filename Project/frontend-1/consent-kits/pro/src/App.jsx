// Turn2Opinion — Business Professionals Panel: Terms, Privacy Notice & Consent (shown after login).
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './components/Icons.jsx';
import InsightGlobe from './components/InsightGlobe.jsx';
import T2OMark from './components/T2OMark.jsx';
import { ClauseCard, Drawer, bodyTexts } from './components/Clause.jsx';
import LanguagePicker from './components/LanguagePicker.jsx';
import { Approvals, Certificate, DeclineDialog } from './components/Approvals.jsx';
import { CONSENTS, SECTIONS, SECTION_ORDER, TOTAL, TRACKS } from './content/terms.js';
import { useI18n } from './i18n/I18n.jsx';
import { isSoundEnabled, setSoundEnabled } from './i18n/soundPrefs.js';
import { play } from './sound.js';
import { asset } from './assets.js';
import EN from './i18n/strings/en.js';
import { Doc, MUTED, savePdf, when } from '../../shared/pdf-doc.js';

const THEME_KEY = 't2o.pro.theme';
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const ss = {
  get(k, f) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
};
const makeId = () => {
  const d = new Date();
  const r = Array.from((typeof crypto !== 'undefined' && crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(4)) : [1, 2, 3, 4].map(() => Math.random() * 255)), (b) => Math.floor(b).toString(36).padStart(2, '0')).join('').toUpperCase().slice(0, 8);
  return `T2O-B2B-${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}-${r}`;
};
const fmtDate = (iso, lang) => { try { return new Date(`${iso}T00:00:00`).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return iso; } };

/** Theme: the member's own choice wins; otherwise English → light, other languages → dark. */
export function initialTheme(cfg, lang) {
  const saved = ls.get(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (cfg.theme === 'light' || cfg.theme === 'dark') return cfg.theme;
  return lang === 'en' ? 'light' : 'dark';
}

// small sparkline shapes for the track headers (decorative)
const SPARKS = ['M0 30 L15 26 L30 28 L45 18 L60 21 L75 12 L90 15 L105 6 L120 9', 'M0 28 L15 30 L30 20 L45 23 L60 14 L75 17 L90 9 L105 12 L120 4', 'M0 32 L15 22 L30 25 L45 16 L60 19 L75 10 L90 13 L105 8 L120 5'];

export default function App({ cfg }) {
  const { t, lang, meta, mtBusy } = useI18n();
  const [mounted, setMounted] = useState(false);
  // A fresh (non-hydrating) render paints the brief + skyline first and mounts the clause room one frame later,
  // so no single main-thread task has to build the whole page (keeps TBT low on slow phones).
  const STAGES = TRACKS.length + 2; // tracks one by one, then approvals + footer, then the print copy
  const [stage, setStage] = useState(() => (typeof window === 'undefined' || cfg.hydrating ? STAGES : 0));
  const full = stage >= STAGES;
  // hydrating the prerendered (light) HTML must start from 'light'; the real theme is applied right after mount
  const [theme, setTheme] = useState(() => (typeof window === 'undefined' || cfg.hydrating ? 'light' : initialTheme(cfg, lang)));
  const [themeChosen, setThemeChosen] = useState(false);
  const [reviewed, setReviewed] = useState(() => new Set());
  const [drawer, setDrawer] = useState(null);
  const [values, setValues] = useState(() => Object.fromEntries(CONSENTS.map((c) => [c.id, false])));
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(false);
  const [record, setRecord] = useState(null);
  const [picker, setPicker] = useState(false);
  const [decline, setDecline] = useState(false);
  const [sound, setSound] = useState(true);
  const [activeTrack, setActiveTrack] = useState(TRACKS[0].id);
  const rootRef = useRef(null);
  const timers = useRef(new Map());
  const $$ = (sel) => (rootRef.current ? rootRef.current.querySelectorAll(sel) : []);

  useEffect(() => {
    setMounted(true);
    setSound(isSoundEnabled());
    setThemeChosen(Boolean(ls.get(THEME_KEY)));
    if (cfg.hydrating) setTheme(initialTheme(cfg, lang));
    const saved = ss.get(`t2o.pro.reviewed.${cfg.termsVersion}`, []);
    if (saved.length) setReviewed(new Set(saved));
  }, [cfg.termsVersion]);
  // follow the language until the member picks a theme
  useEffect(() => { if (mounted && !themeChosen) setTheme(initialTheme(cfg, lang)); }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (cfg.standalone && mounted) { // before mount the <head> boot script already set it
      document.documentElement.dataset.theme = theme;
      const m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', theme === 'dark' ? '#070a1a' : '#f6f7fb');
    }
  }, [theme, mounted, cfg.standalone]);
  useEffect(() => { if (mounted) ss.set(`t2o.pro.reviewed.${cfg.termsVersion}`, [...reviewed]); }, [reviewed, mounted, cfg.termsVersion]);

  const markReviewed = useCallback((n) => setReviewed((r) => (r.has(n) ? r : new Set(r).add(n))), []);

  // A clause counts as reviewed when its full text is opened, or after its tile has been on screen for 2 s.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const n = Number(e.target.dataset.n);
        if (e.isIntersecting) { if (!timers.current.has(n)) timers.current.set(n, setTimeout(() => { markReviewed(n); timers.current.delete(n); }, 2000)); }
        else if (timers.current.has(n)) { clearTimeout(timers.current.get(n)); timers.current.delete(n); }
      }
    }, { threshold: 0.6 });
    $$('.clause[data-n]').forEach((el) => io.observe(el));
    const tr = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActiveTrack(vis.target.dataset.track);
    }, { rootMargin: '-30% 0px -60% 0px' });
    $$('[data-track]').forEach((el) => tr.observe(el));
    const rise = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.dataset.in = '1'; rise.unobserve(e.target); }
    }, { rootMargin: '0px 0px -6% 0px' });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && rootRef.current) {
      $$('.clause, .track-head, .board').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.in = '1';
        else rise.observe(el);
      });
      rootRef.current.dataset.rise = '1';
    }
    return () => { io.disconnect(); tr.disconnect(); rise.disconnect(); timers.current.forEach(clearTimeout); timers.current.clear(); };
  }, [markReviewed, stage]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (full) return undefined;
    let t2;
    const t1 = requestAnimationFrame(() => { t2 = setTimeout(() => startTransition(() => setStage((x) => x + 1)), 0); });
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, [stage, full]);

  const count = SECTION_ORDER.filter((n) => reviewed.has(n)).length + (reviewed.has(23) ? 1 : 0);
  const trackDone = useMemo(() => Object.fromEntries(TRACKS.map((tr) => [tr.id, tr.sections.filter((n) => reviewed.has(n)).length])), [reviewed]);

  const goto = (target) => {
    play('tap');
    const id = typeof target === 'number' ? `s${target}` : target;
    const el = rootRef.current && rootRef.current.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    play(next);
    setTheme(next);
    setThemeChosen(true);
    ls.set(THEME_KEY, next);
  };
  const toggleSound = () => { const n = !sound; setSoundEnabled(n); setSound(n); if (n) play('tap'); };

  const sign = async () => {
    setError(false);
    setStatus('saving');
    markReviewed(23);
    const rec = {
      consentId: makeId(),
      panel: 'business',
      memberId: cfg.member.id || null,
      termsVersion: cfg.termsVersion,
      effectiveDate: cfg.effectiveDate,
      language: lang,
      theme,
      acceptedAt: new Date().toISOString(),
      timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return ''; } })(),
      consents: { ...values },
      clausesReviewed: [...reviewed, 23].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
    };
    const started = Date.now();
    try {
      // Turn2Opinion host hook: the site saves the record through its own API (see consent-kits/README.md).
      if (typeof cfg.save === 'function') {
        const data = await cfg.save(rec);
        if (data && data.consentId) rec.consentId = data.consentId;
      } else if (cfg.submitUrl && !cfg.demo) {
        const r = await fetch(cfg.submitUrl, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(cfg.headers || {}) }, body: JSON.stringify(rec) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json().catch(() => ({}));
        if (data && data.consentId) rec.consentId = data.consentId;
      }
      play('sign');
      await new Promise((res) => setTimeout(res, Math.max(0, 1500 - (Date.now() - started))));
      setRecord(rec);
      setStatus('done');
      try { window.dispatchEvent(new CustomEvent('t2o:consent', { detail: rec })); } catch { /* ignore */ }
      if (typeof cfg.onAccept === 'function') cfg.onAccept(rec);
    } catch {
      setStatus('idle');
      setError(true);
      play('warn');
    }
  };

  // The accepted terms as a PDF (issue #37: this used to save an .html file). The legal text is the binding English.
  const download = () => {
    if (!record) return;
    const d = new Doc('Business Professionals Panel: Terms and Conditions, Privacy Notice and Consent');
    d.masthead('Business Professionals Panel terms, privacy notice and consent', `Version ${record.termsVersion}`);
    d.h1('Business Professionals Panel: Terms and Conditions, Privacy Notice and Consent');
    d.text(`${cfg.operator} - ${cfg.website} - ${cfg.supportEmail}`, { size: 9.6, color: MUTED, after: 2 });
    d.text(cfg.address, { size: 9, color: MUTED, after: 4 });
    d.panel([
      ['Reference', record.consentId],
      ['Signed', when(record.acceptedAt)],
      ['Member', `${cfg.member.id || '-'}${cfg.member.firstName ? ` (${cfg.member.firstName})` : ''}`],
      ['Terms version', `${record.termsVersion} (effective ${cfg.effectiveDate})`],
      ['Page language', record.language]
    ], { title: 'Certificate of consent' });
    d.h3('Approvals');
    for (const c of CONSENTS) d.bullet(`${record.consents[c.id] ? 'YES' : 'NO'} (${c.required ? 'required' : 'optional'}): ${EN[`c_${c.id}`] || t(`c_${c.id}`)}`, { size: 9.2 });
    for (let n = 1; n <= TOTAL; n++) {
      d.h2(`${n}. ${SECTIONS[n].title}`);
      bodyTexts(n, cfg).forEach((p) => d.text(p, { after: 4 }));
    }
    savePdf(d.bytes(`Turn2Opinion business consent ${record.consentId}`), `Turn2Opinion-business-consent-${record.consentId}.pdf`);
  };

  const name = mounted ? [cfg.member.firstName, cfg.member.jobTitle].filter(Boolean).join(' · ') : '';
  const pct = Math.round((count / TOTAL) * 100);
  const g = meta.grade;

  return (
    <div
      ref={rootRef}
      className={`px ${status === 'saving' ? 'is-signing' : ''}`}
      data-theme={theme}
      lang={lang}
      dir={meta.dir === 'rtl' ? 'rtl' : 'ltr'}
      style={{ '--a1': g[0], '--a2': g[1], '--a3': g[2] }}
    >
      <a className="skip" href="#approvals" onClick={(e) => { e.preventDefault(); goto('approvals'); }}>{t('skip')}</a>
      <div className="mesh" aria-hidden="true"><i /><i /><i /><b /></div>

      <header className="top">
        <div className="top-in">
          <span className="logo">
            <img src={asset('brand/turn2opinion-logo.webp')} alt="Turn2Opinion.com logo" width="150" height="46" />
          </span>
          <span className="doc-pill">
            <Icon name="briefcase" size={16} decorative />
            <b>{t('agreement')}</b>
            <span className="sep" aria-hidden="true" />
            <span className="mono">{t('version', cfg.termsVersion)}</span>
          </span>
          <span className="grow" />
          <span className="meter mono" aria-hidden="true"><i style={{ '--p': pct / 100 }} />{count}/{TOTAL}</span>
          <button type="button" className={`theme-sw ${theme}`} onClick={toggleTheme} aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')} title={theme === 'dark' ? t('theme_light') : t('theme_dark')} aria-pressed={theme === 'dark'}>
            <span className="theme-knob"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={16} decorative /></span>
          </button>
          <button type="button" className="icon-btn" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? t('sound_on') : t('sound_off')} title={sound ? t('sound_on') : t('sound_off')}>
            <Icon name={sound ? 'volume' : 'mute'} size={20} decorative />
          </button>
          <button type="button" className="lang-btn" onClick={() => { play('paper'); setPicker(true); }} aria-haspopup="dialog" aria-label={`${t('language')}: ${meta.native}`}>
            <span className="lang-orb" aria-hidden="true">{meta.glyph}</span>
            <span className="lang-name">{meta.native}</span>
            {mtBusy ? <span className="spin sm" aria-hidden="true" /> : <Icon name="chevron" size={16} decorative />}
          </button>
        </div>
        <div className="top-progress" role="progressbar" aria-label={t('progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
      </header>

      <main id="main">
        <section className="brief">
          <div className="brief-text">
            <p className="kicker mono"><span className="dot-live" aria-hidden="true" />{t('doc')}</p>
            <p className="hello">{mounted && cfg.member.firstName ? t('hello', cfg.member.firstName) : t('hello_anon')}</p>
            <h1>{t('h1')}</h1>
            <p className="lead">{t('lead')}</p>
            <ol className="agenda-steps">
              {[t('step1'), t('step2'), t('step3')].map((s, i) => (
                <li key={i}><span className="mono">0{i + 1}</span>{s}</li>
              ))}
            </ol>
            <p className="meta mono"><Icon name="clock" size={15} decorative />{t('time')} · {t('effective', fmtDate(cfg.effectiveDate, lang), fmtDate(cfg.lastUpdated, lang))}</p>
          </div>
          <InsightGlobe reviewed={count} total={TOTAL} signed={status === 'done'} name={name} memberId={mounted ? cfg.member.id : ''} extras={full} />
        </section>

        {stage > 0 ? (
        <div className="room">
          <nav className="spine" aria-label={t('agenda')}>
            <p className="spine-h mono">{t('agenda')}</p>
            <ol>
              {TRACKS.map((tr, i) => (
                <li key={tr.id} className={activeTrack === tr.id ? 'is-active' : ''} style={{ '--h1': tr.hue[0], '--h2': tr.hue[1], '--done': trackDone[tr.id] / tr.sections.length }}>
                  <a href={`#tr-${tr.id}`} onClick={(e) => { e.preventDefault(); goto(`tr-${tr.id}`); }} aria-current={activeTrack === tr.id ? 'true' : undefined}>
                    <span className="node mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="spine-txt"><b>{t(`tr_${tr.id}`)}</b><small className="mono">{trackDone[tr.id]}/{tr.sections.length}</small></span>
                  </a>
                  <span className="pips" aria-hidden="true">{tr.sections.map((n) => <i key={n} className={reviewed.has(n) ? 'on' : ''} />)}</span>
                </li>
              ))}
              <li className={activeTrack === 'approvals' ? 'is-active' : ''} style={{ '--h1': 'var(--a1)', '--h2': 'var(--a2)' }}>
                <a href="#approvals" onClick={(e) => { e.preventDefault(); goto('approvals'); }}>
                  <span className="node mono" aria-hidden="true">✓</span>
                  <span className="spine-txt"><b>{t('approvals_h')}</b><small className="mono">§23</small></span>
                </a>
              </li>
            </ol>
          </nav>

          <div className="tracks">
            {TRACKS.slice(0, stage).map((tr, ti) => (
              <section key={tr.id} id={`tr-${tr.id}`} className="track" data-track={tr.id} style={{ '--h1': tr.hue[0], '--h2': tr.hue[1] }} aria-labelledby={`tr-${tr.id}-h`}>
                <header className="track-head">
                  <span className="track-no" aria-hidden="true">{String(ti + 1).padStart(2, '0')}</span>
                  <div className="track-txt">
                    <h2 id={`tr-${tr.id}-h`}>{t(`tr_${tr.id}`)}</h2>
                    <p>{t(`tr_${tr.id}_tag`)}</p>
                  </div>
                  <svg className="spark" viewBox="0 0 120 40" aria-hidden="true"><path d={SPARKS[ti % SPARKS.length]} /><path className="spark-fill" d={`${SPARKS[ti % SPARKS.length]} L120 40 L0 40 Z`} /></svg>
                  <span className="gauge" aria-hidden="true" style={{ '--p': trackDone[tr.id] / tr.sections.length }}>
                    <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" /><circle className="gauge-v" cx="22" cy="22" r="18" /></svg>
                    <Icon name={tr.icon} size={20} decorative />
                  </span>
                </header>
                <div className="clauses">
                  {tr.sections.map((n, i) => (
                    <ClauseCard key={n} n={n} index={i} reviewed={reviewed.has(n)} onOpen={setDrawer} wide={tr.sections.length % 2 === 1 && i === tr.sections.length - 1} />
                  ))}
                </div>
              </section>
            ))}

            {stage > TRACKS.length ? (<>
            <div data-track="approvals">
              <Approvals
                cfg={cfg}
                values={values}
                onChange={(id, v) => setValues((x) => ({ ...x, [id]: v }))}
                status={status}
                onSign={sign}
                onDecline={() => setDecline(true)}
                reviewed={count}
                total={TOTAL}
                error={error}
                goto={goto}
              />
            </div>

            <footer className="foot">
              <p>{t('footer_q').split('{0}').reduce((acc, part, i) => (i ? [...acc, <a key={i} href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a>, part] : [part]), [])}</p>
              <p className="foot-links">
                <a href={cfg.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" onClick={() => play('tap')}>{t('privacy_policy')}</a>
                <a href={cfg.cookiePolicyUrl} target="_blank" rel="noopener noreferrer" onClick={() => play('tap')}>{t('cookie_policy')}</a>
                <button type="button" className="linkish" onClick={() => { play('tap'); window.print(); }}><Icon name="print" size={16} decorative />{t('print')}</button>
              </p>
              <p className="foot-op">{cfg.operator} · {cfg.address}</p>
            </footer>
            </>) : null}
          </div>
        </div>
        ) : <div className="room room-wait" aria-hidden="true" />}
        {full ? (
          <div className="print-all" aria-hidden="true">
            {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
              <section key={n}><h2>{n}. {SECTIONS[n].title}</h2>{bodyTexts(n, cfg).map((p, j) => <p key={j}>{p}</p>)}</section>
            ))}
          </div>
        ) : null}
      </main>

      <div className="sign-fx" aria-hidden="true">
        <div className="tx">
          <span className="tx-doc"><Icon name="clipboard" size={30} decorative /></span>
          <span className="tx-beam"><i /><i /><i /></span>
          <span className="tx-node"><T2OMark size={54} /></span>
          <span className="tx-label mono">{t('signing')}</span>
        </div>
      </div>

      <Drawer
        n={drawer}
        cfg={cfg}
        reviewed={drawer != null && reviewed.has(drawer)}
        onReviewed={markReviewed}
        onGo={(n) => { setDrawer(n); }}
        onClose={(scrollNext) => {
          const last = drawer;
          setDrawer(null);
          if (scrollNext && last) setTimeout(() => goto('approvals'), 50);
        }}
      />
      <LanguagePicker open={picker} onClose={() => setPicker(false)} />
      <DeclineDialog
        open={decline}
        onBack={() => setDecline(false)}
        onLogout={() => {
          try { window.dispatchEvent(new CustomEvent('t2o:consent-declined')); } catch { /* ignore */ }
          if (typeof cfg.onDecline === 'function') cfg.onDecline();
          else if (cfg.logoutUrl) window.location.assign(cfg.logoutUrl);
          setDecline(false);
        }}
      />
      {status === 'done' ? (
        <Certificate record={record} name={mounted ? [cfg.member.firstName, cfg.member.jobTitle, cfg.member.company].filter(Boolean).join(' · ') : ''} onDownload={download} hasContinue={Boolean(cfg.continueUrl || cfg.onContinue)} onContinue={() => (typeof cfg.onContinue === 'function' ? cfg.onContinue(record) : window.location.assign(cfg.continueUrl))} />
      ) : null}
    </div>
  );
}
