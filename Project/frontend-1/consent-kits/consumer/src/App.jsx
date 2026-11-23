// Turn2Opinion — Consumer Panel Terms, Privacy Notice & Consent (shown after login).
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './components/Icons.jsx';
import PhoneHero from './components/PhoneHero.jsx';
import Section, { bodyTexts } from './components/Section.jsx';
import LanguagePicker from './components/LanguagePicker.jsx';
import { ConsentDock, DeclineDialog, Done } from './components/Consent.jsx';
import { CHAPTERS, CONSENTS, SECTIONS } from './content/terms.js';
import { useI18n } from './i18n/I18n.jsx';
import { isSoundEnabled, setSoundEnabled } from './i18n/soundPrefs.js';
import { play } from './sound.js';
import { asset } from './assets.js';

const THEME_KEY = 't2o.consent.theme'; // the member's own light/dark choice (wins over everything)
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
// light | dark — saved choice, then config.theme, then the language (English → light, others → dark)
export function initialTheme(cfg, lang) {
  const saved = ls.get(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (cfg.theme === 'light' || cfg.theme === 'dark') return cfg.theme;
  return lang === 'en' ? 'light' : 'dark';
}

const READABLE = CHAPTERS.flatMap((c) => c.sections); // sections 1–21 (22 is the choices dock)
const TOTAL = READABLE.length + 1;
const sess = {
  get(k, f) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
};
const makeId = () => {
  const d = new Date();
  const r = (typeof crypto !== 'undefined' && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => b.toString(36).padStart(2, '0')).join('') : Math.random().toString(36).slice(2, 10)).toUpperCase().slice(0, 8);
  return `T2O-${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}-${r}`;
};
const fmtDate = (iso, lang) => {
  try { return new Date(`${iso}T00:00:00`).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return iso; }
};

export default function App({ cfg }) {
  const { t, lang, meta, mtBusy } = useI18n();
  const [mounted, setMounted] = useState(false);
  // A fresh (non-hydrating) render paints the intro + wheel first and mounts the chapters one by one in the next
  // frames, so no single main-thread task has to build the whole page (keeps TBT low on slow phones).
  const STAGES = CHAPTERS.length + 1;
  const [stage, setStage] = useState(() => (typeof window === 'undefined' || cfg.hydrating ? STAGES : 0));
  const full = stage >= STAGES;
  useEffect(() => {
    if (full) return undefined;
    let t2;
    const t1 = requestAnimationFrame(() => { t2 = setTimeout(() => startTransition(() => setStage((x) => x + 1)), 0); });
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, [stage, full]);
  // hydrating the prerendered (light) HTML must start from 'light'; the real theme is applied right after mount
  const [theme, setTheme] = useState(() => (typeof window === 'undefined' || cfg.hydrating ? 'light' : initialTheme(cfg, lang)));
  const [themeChosen, setThemeChosen] = useState(false);
  const [read, setRead] = useState(() => new Set());
  const [open, setOpen] = useState(() => new Set());
  const [values, setValues] = useState(() => Object.fromEntries(CONSENTS.map((c) => [c.id, false])));
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const [error, setError] = useState(false);
  const [record, setRecord] = useState(null);
  const [picker, setPicker] = useState(false);
  const [decline, setDecline] = useState(false);
  const [sound, setSound] = useState(true);
  const [activeCh, setActiveCh] = useState(CHAPTERS[0].id);
  const timers = useRef(new Map());
  const rootRef = useRef(null); // all DOM queries are scoped to the page (works inside a shadow root too)
  const $$ = (sel) => (rootRef.current ? rootRef.current.querySelectorAll(sel) : []);

  // client-only state (keeps the prerendered HTML identical for hydration)
  useEffect(() => {
    setMounted(true);
    setSound(isSoundEnabled());
    setThemeChosen(Boolean(ls.get(THEME_KEY)));
    if (cfg.hydrating) setTheme(initialTheme(cfg, lang));
    const saved = sess.get(`t2o.consent.read.${cfg.termsVersion}`, []);
    if (saved.length) setRead(new Set(saved));
  }, [cfg.termsVersion]);
  // follow the language until the member picks a theme
  useEffect(() => { if (mounted && !themeChosen) setTheme(initialTheme(cfg, lang)); }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!cfg.standalone || !mounted) return; // before mount the <head> boot script already set it
    document.documentElement.dataset.theme = theme === 'dark' ? 'classic' : 'light';
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', theme === 'dark' ? '#050a24' : '#f5f8ff');
  }, [theme, mounted, cfg.standalone]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    play(next);
    setTheme(next);
    setThemeChosen(true);
    ls.set(THEME_KEY, next);
  };
  useEffect(() => { if (mounted) sess.set(`t2o.consent.read.${cfg.termsVersion}`, [...read]); }, [read, mounted, cfg.termsVersion]);

  const markRead = useCallback((n) => setRead((r) => (r.has(n) ? r : new Set(r).add(n))), []);
  const toggle = useCallback((n) => {
    setOpen((o) => { const x = new Set(o); if (x.has(n)) x.delete(n); else x.add(n); return x; });
    markRead(n);
  }, [markRead]);

  // A section counts as read after it has been at least half on screen for 1.5 s (or when it is opened).
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const n = Number(e.target.dataset.n);
        if (e.isIntersecting) {
          if (!timers.current.has(n)) timers.current.set(n, setTimeout(() => { markRead(n); timers.current.delete(n); }, 1500));
        } else if (timers.current.has(n)) {
          clearTimeout(timers.current.get(n));
          timers.current.delete(n);
        }
      }
    }, { threshold: 0.5 });
    $$('.card[data-n]').forEach((el) => io.observe(el));
    // chapter highlight in the rail
    const ch = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActiveCh(vis.target.dataset.ch);
    }, { rootMargin: '-35% 0px -55% 0px' });
    $$('.chapter[data-ch]').forEach((el) => ch.observe(el));
    // entrance: cards and chapter banners rise in as they reach the screen (transform/opacity only)
    const root = rootRef.current;
    const rise = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.dataset.in = '1'; rise.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px' });
    if (root && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $$('.card, .ch-head, .dock').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.dataset.in = '1'; // already on screen: no flash
        else rise.observe(el);
      });
      root.dataset.rise = '1'; // data attributes: React re-renders never wipe them
    }
    return () => { io.disconnect(); ch.disconnect(); rise.disconnect(); timers.current.forEach(clearTimeout); timers.current.clear(); };
  }, [markRead, stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const readCount = READABLE.filter((n) => read.has(n)).length + (read.has(22) ? 1 : 0);
  const allOpen = open.size >= READABLE.length;

  const agree = async () => {
    setError(false);
    setStatus('saving');
    markRead(22);
    const rec = {
      consentId: makeId(),
      memberId: cfg.member.id || null,
      termsVersion: cfg.termsVersion,
      effectiveDate: cfg.effectiveDate,
      language: lang,
      acceptedAt: new Date().toISOString(),
      timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return ''; } })(),
      consents: { ...values },
      sectionsRead: [...read, 22].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b),
      sectionsOpened: [...open].sort((a, b) => a - b),
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
        const r = await fetch(cfg.submitUrl, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(cfg.headers || {}) },
          body: JSON.stringify(rec),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json().catch(() => ({}));
        if (data && data.consentId) rec.consentId = data.consentId;
      }
      // let the signing animation finish (≥ 1.1 s)
      await new Promise((res) => setTimeout(res, Math.max(0, 1100 - (Date.now() - started))));
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

  const download = () => {
    if (!record) return;
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const secs = Array.from({ length: 22 }, (_, i) => i + 1)
      .map((n) => `<h2>${n}. ${esc(SECTIONS[n].title)}</h2>${bodyTexts(n, cfg).map((p) => `<p>${esc(p)}</p>`).join('')}`)
      .join('');
    const rows = CONSENTS.map((c) => `<tr><td>${record.consents[c.id] ? 'Yes' : 'No'}</td><td>${esc(t(`c_${c.id}`))}${c.required ? ' (required)' : ' (optional)'}</td></tr>`).join('');
    const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Turn2Opinion consent ${esc(record.consentId)}</title>
<style>body{font:15px/1.6 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#0b1238}h1{font-size:24px}h2{font-size:17px;margin-top:28px}table{border-collapse:collapse;width:100%}td{border:1px solid #dde;padding:6px 10px;vertical-align:top}.box{background:#f5f6fb;border-radius:12px;padding:14px 18px}</style>
<h1>Consumer Panel Terms, Conditions, Privacy Notice and Consent</h1>
<div class="box"><b>Consent receipt</b><br>Reference: ${esc(record.consentId)}<br>Date: ${esc(record.acceptedAt)}<br>Member: ${esc(cfg.member.id || '—')}<br>Terms version: ${esc(record.termsVersion)} · Effective ${esc(cfg.effectiveDate)}<br>Language of the page: ${esc(record.language)}</div>
<h2>Your choices</h2><table>${rows}</table>
<p>Operator: ${esc(cfg.operator)} · ${esc(cfg.website)} · ${esc(cfg.supportEmail)} · ${esc(cfg.address)}</p>${secs}</html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `Turn2Opinion-consent-${record.consentId}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const goto = (id) => {
    play('tap');
    const el = rootRef.current && rootRef.current.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  const toggleSound = () => {
    const next = !sound;
    setSoundEnabled(next);
    setSound(next);
    if (next) play('on');
  };
  const name = mounted && cfg.member.firstName ? cfg.member.firstName : '';
  const progress = Math.round((readCount / TOTAL) * 100);
  const chapterDone = useMemo(() => Object.fromEntries(CHAPTERS.map((c) => [c.id, c.sections.filter((n) => read.has(n)).length])), [read]);

  return (
    <div ref={rootRef} className={`cx ${status === 'saving' ? 'is-signing' : ''}`} data-theme={theme === 'dark' ? 'classic' : 'light'} lang={lang} dir={meta.dir === 'rtl' ? 'rtl' : 'ltr'} style={{ '--lg1': meta.grade[0], '--lg2': meta.grade[1] }}>
      <a className="skip" href="#choices" onClick={(e) => { e.preventDefault(); goto('choices'); }}>{t('skip')}</a>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>

      <header className="bar">
        <div className="bar-in">
          <span className="logo-chip">
            <img src={asset('brand/turn2opinion-logo.webp')} alt="Turn2Opinion.com logo" width="150" height="46" />
          </span>
          <span className="bar-doc">
            <Icon name="lock" size={16} decorative />
            {t('agreement')} · <span className="mono">{t('version', cfg.termsVersion)}</span>
          </span>
          <span className="bar-gap" />
          <span className="bar-read" aria-hidden="true">{t('read_count', readCount, TOTAL)}</span>
          <button type="button" className={`theme-sw ${theme}`} onClick={toggleTheme} aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')} title={theme === 'dark' ? t('theme_light') : t('theme_dark')} aria-pressed={theme === 'dark'}>
            <span className="theme-knob"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={16} decorative /></span>
          </button>
          <button type="button" className="icon-btn" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? t('sound_on') : t('sound_off')} title={sound ? t('sound_on') : t('sound_off')}>
            <Icon name={sound ? 'volume' : 'mute'} size={20} decorative />
          </button>
          <button type="button" className="lang-btn" onClick={() => { play('open'); setPicker(true); }} aria-haspopup="dialog" aria-label={`${t('language')}: ${meta.native}`}>
            <span className="lang-orb" aria-hidden="true">{meta.glyph}</span>
            <span className="lang-name">{meta.native}</span>
            {mtBusy ? <span className="spin sm" aria-hidden="true" /> : <Icon name="chevron" size={16} decorative />}
          </button>
        </div>
        <div className="bar-progress" role="progressbar" aria-label={t('progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </header>

      <main id="main">
        <section className="intro">
          <div className="chatter" aria-hidden="true">
            {full && [0, 1, 2, 3, 4, 5].map((k) => <span key={k} className={`bub b${k}`}>{k % 2 ? <><i /><i /><i /></> : null}</span>)}
          </div>
          <div className="intro-text">
            <p className="hello">
              <span className="wave" aria-hidden="true"><Icon name="wave" size={22} decorative /></span>
              {name ? t('hello', name) : t('hello_anon')}
            </p>
            <h1>{t('h1')}</h1>
            <p className="lead">{t('lead')}</p>
            <ol className="steps">
              <li style={{ '--c1': '#1f5bff', '--c2': '#49b6ff' }}><span className="step-n">1</span>{t('step1')}</li>
              <li style={{ '--c1': '#7b5cff', '--c2': '#4d8dff' }}><span className="step-n">2</span>{t('step2')}</li>
              <li style={{ '--c1': '#0fb48f', '--c2': '#3fd6e8' }}><span className="step-n">3</span>{t('step3')}</li>
            </ol>
            <p className="meta-line">
              <Icon name="clock" size={16} decorative /> {t('time')}
              <span className="dot" aria-hidden="true">•</span>
              {t('effective', fmtDate(cfg.effectiveDate, lang), fmtDate(cfg.lastUpdated, lang))}
            </p>
          </div>
          <PhoneHero read={readCount} total={TOTAL} extras={full} />
        </section>

        <div className="layout">
          <nav className="rail" aria-label={t('chapters')}>
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.id} style={{ '--g1': c.grade[0], '--g2': c.grade[1] }}>
                  <a href={`#ch-${c.id}`} className={activeCh === c.id ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); goto(`ch-${c.id}`); }} aria-current={activeCh === c.id ? 'true' : undefined}>
                    <span className="rail-ico" aria-hidden="true"><Icon name={c.icon} size={18} decorative /></span>
                    <span className="rail-txt">
                      <b>{t(`ch_${c.id}`)}</b>
                      <small>{chapterDone[c.id]}/{c.sections.length}</small>
                    </span>
                    <span className="rail-bar" aria-hidden="true"><i style={{ transform: `scaleX(${chapterDone[c.id] / c.sections.length})` }} /></span>
                  </a>
                </li>
              ))}
              <li style={{ '--g1': '#ff8a3d', '--g2': '#7b5cff' }}>
                <a href="#choices" className={activeCh === 'choices' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); goto('choices'); }}>
                  <span className="rail-ico" aria-hidden="true"><Icon name="pen" size={18} decorative /></span>
                  <span className="rail-txt"><b>{t('choices_h')}</b><small>§22</small></span>
                </a>
              </li>
            </ol>
            <button type="button" className="chip rail-all" onClick={() => { play(allOpen ? 'close' : 'open'); setOpen(allOpen ? new Set() : new Set(READABLE)); READABLE.forEach(markRead); }}>
              <Icon name={allOpen ? 'x' : 'layers'} size={16} decorative />
              {allOpen ? t('collapse_all') : t('expand_all')}
            </button>
          </nav>

          <div className="flow">
            {CHAPTERS.slice(0, stage).map((c, ci) => (
              <section key={c.id} id={`ch-${c.id}`} className={`chapter ch-${c.id}`} data-ch={c.id} style={{ '--g1': c.grade[0], '--g2': c.grade[1], '--g3': c.grade[2] }} aria-labelledby={`ch-${c.id}-h`}>
                <header className="ch-head">
                  <div className="ch-art" aria-hidden="true">
                    <span className="story-ring" />
                    <span className="story-face"><Icon name={c.icon} size={34} decorative /></span>
                    <span className="story-heart"><Icon name="heart" size={14} decorative /></span>
                  </div>
                  <span className="ch-quote" aria-hidden="true">“</span>
                  <div className="ch-text">
                    <span className="ch-no">{String(ci + 1).padStart(2, '0')}</span>
                    <h2 id={`ch-${c.id}-h`}>{t(`ch_${c.id}`)}</h2>
                    <p>{t(`ch_${c.id}_tag`)}</p>
                  </div>
                  <span className="ch-count" aria-label={t('read_count', chapterDone[c.id], c.sections.length)}>
                    {chapterDone[c.id]}/{c.sections.length}
                  </span>
                </header>
                <div className="cards">
                  {c.sections.map((n, i) => (
                    <Section key={n} n={n} index={i} cfg={cfg} isOpen={open.has(n)} isRead={read.has(n)} onToggle={toggle} />
                  ))}
                </div>
              </section>
            ))}

            {full ? (<>
            <ConsentDock
              cfg={cfg}
              values={values}
              onChange={(id, v) => setValues((x) => ({ ...x, [id]: v }))}
              status={status}
              onAgree={agree}
              onDecline={() => setDecline(true)}
              goto={goto}
              readCount={readCount}
              total={TOTAL}
              error={error}
            />

            <footer className="foot">
              <p>{t('footer_q')
                .split('{0}')
                .reduce((acc, part, i) => (i ? [...acc, <a key={i} href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a>, part] : [part]), [])}</p>
              <p className="foot-links">
                <a href={cfg.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" onClick={() => play('tap')}>{t('privacy_policy')}</a>
                <a href={cfg.cookiePolicyUrl} target="_blank" rel="noopener noreferrer" onClick={() => play('tap')}>{t('cookie_policy')}</a>
                <button type="button" className="linkish" onClick={() => { play('tap'); setOpen(new Set(READABLE)); setTimeout(() => window.print(), 300); }}>
                  <Icon name="print" size={16} decorative />{t('print')}
                </button>
              </p>
              <p className="foot-op">{cfg.operator} · {cfg.address}</p>
            </footer>
            </>) : <div className="flow-wait" aria-hidden="true" />}
          </div>
        </div>
      </main>

      <div className="sign-fx" aria-hidden="true">
        <svg viewBox="0 0 320 120"><path d="M14 82c22-40 40-58 52-50 14 10-22 52-6 56 16 4 30-48 46-44 14 4-6 40 8 42 18 2 26-34 44-32 16 2 4 26 20 28 22 2 40-30 64-26 20 4 26 18 54 10" /></svg>
      </div>

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
        <Done record={record} onDownload={download} hasContinue={Boolean(cfg.continueUrl || cfg.onContinue)} onContinue={() => (typeof cfg.onContinue === 'function' ? cfg.onContinue(record) : window.location.assign(cfg.continueUrl))} />
      ) : null}
    </div>
  );
}
