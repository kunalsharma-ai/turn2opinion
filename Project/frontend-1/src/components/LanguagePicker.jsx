// Language picker (full-screen, searchable, with sounds) and the translation status pill. Lazy-loaded by App.jsx.
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { BY_CODE, LANGUAGES } from '../i18n/languages.js';
import { SOUND_NAMES } from '../i18n/soundPrefs.js';
import Icon from './Icon.jsx';

/** Rotating "Choose your language" in every language. */
function RotatingTitle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % LANGUAGES.length), 1700);
    return () => clearInterval(t);
  }, []);
  const l = LANGUAGES[i];
  return (
    <span className="lp-rot notranslate" translate="no" aria-hidden="true">
      <span key={l.code} dir={l.dir || 'ltr'} lang={l.code} style={{ '--c': l.grade[0] }}>{l.choose}</span>
    </span>
  );
}

const Tile = memo(function Tile({ l, active, onPick, featured = false }) {
  return (
    <li>
      <button
        type="button"
        className={`lp-tile ${active ? 'is-on' : ''} ${featured ? 'is-featured' : ''}`}
        style={{ '--t1': l.grade[0], '--t2': l.grade[1], '--t3': l.grade[2] }}
        onClick={(e) => onPick(l.code, { x: e.clientX, y: e.clientY })}
        aria-pressed={active}
        lang={l.code}
        title={SOUND_NAMES[l.sound]}
      >
        <span className="lt-orb notranslate" translate="no" aria-hidden="true"><b>{l.glyph}</b></span>
        <span className="lt-txt">
          <b className="notranslate" translate="no" dir={l.dir || 'ltr'}>{l.native}</b>
          <small className="notranslate" translate="no" lang="en">{l.name}</small>
        </span>
        <span className="lt-sound" aria-hidden="true"><i /><i /><i /><i /></span>
        {active && <Icon name="check" size={16} stroke={3} className="lt-check" />}
      </button>
    </li>
  );
});

// Extra search words, so people find their language however they type it (English, native, country, script).
const ALIASES = {
  en: 'english inglés anglais englisch 英语 英語 inggris',
  'zh-CN': 'chinese mandarin simplified putonghua china 中文 汉语 普通话 简体 zhongwen hanyu',
  'zh-TW': 'chinese traditional taiwan hong kong macau cantonese 中文 繁体 繁體 國語 正體',
  ja: 'japanese nihongo japan にほんご 日本',
  ko: 'korean hangul hanguk korea 한글 조선말',
  hi: 'hindi hindustani india bharat हिंदी',
  bn: 'bengali bangla bangladesh kolkata',
  ta: 'tamil tamizh chennai sri lanka singapore',
  te: 'telugu andhra telangana hyderabad',
  mr: 'marathi maharashtra mumbai pune',
  gu: 'gujarati gujarat ahmedabad',
  pa: 'punjabi panjabi gurmukhi punjab',
  kn: 'kannada karnataka bengaluru bangalore',
  ml: 'malayalam kerala',
  ur: 'urdu pakistan',
  ar: 'arabic arabi arabiya saudi uae egypt gulf عربي',
  fa: 'persian farsi iran dari',
  he: 'hebrew ivrit israel',
  tr: 'turkish turkce turkey türkiye',
  es: 'spanish espanol español castellano spain mexico latin america',
  pt: 'portuguese portugues brazil brasil portugal',
  fr: 'french francais français france canada',
  it: 'italian italiano italy',
  de: 'german deutsch germany austria swiss',
  nl: 'dutch nederlands netherlands holland flemish vlaams belgium',
  ru: 'russian russkiy russia',
  uk: 'ukrainian ukrainska ukraine',
  pl: 'polish polski poland',
  sv: 'swedish svenska sweden',
  nb: 'norwegian norsk bokmal bokmål norway',
  da: 'danish dansk denmark',
  fi: 'finnish suomi finland',
  el: 'greek ellinika greece cyprus',
  cs: 'czech cesky čeština czechia',
  hu: 'hungarian magyar hungary',
  ro: 'romanian romana română romania moldova',
  id: 'indonesian bahasa indonesia',
  ms: 'malay melayu malaysia brunei',
  th: 'thai thailand',
  vi: 'vietnamese tieng viet vietnam',
  fil: 'filipino tagalog philippines pilipino',
  sw: 'swahili kiswahili kenya tanzania uganda',
};
const fold = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const HAY = Object.fromEntries(LANGUAGES.map((l) => [l.code, fold(`${l.native} ${l.name} ${l.code} ${ALIASES[l.code] || ''}`)]));

export function LanguagePicker() {
  const { lang, setLang, picker, closePicker, suggested, sound, toggleSound } = useI18n();
  const [q, setQ] = useState('');
  const dq = useDeferredValue(q); // typing stays instant; the tile grid updates right after
  const search = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    if (!picker) return;
    setQ('');
    const prev = document.activeElement;
    document.documentElement.classList.add('lp-open');
    window.dispatchEvent(new Event('t2o:pause')); // stop the page's animations + WebGL behind the picker
    const t = setTimeout(() => (window.matchMedia('(pointer: fine)').matches ? search.current : panel.current)?.focus(), 60);
    const onKey = (e) => {
      if (e.key === 'Escape') closePicker();
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('button, input, [href]');
        if (!f.length) return;
        const firstEl = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); firstEl.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove('lp-open');
      window.dispatchEvent(new Event('t2o:resume'));
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [picker, closePicker]);

  const groups = useMemo(() => {
    const terms = fold(dq.trim()).split(/\s+/).filter(Boolean);
    const list = LANGUAGES.filter((l) => terms.every((t) => HAY[l.code].includes(t)));
    const by = {};
    for (const l of list) (by[l.region] ||= []).push(l);
    return Object.entries(by);
  }, [dq]);

  const pick = useCallback(
    (code, origin) => {
      setLang(code, { origin });
      setTimeout(closePicker, 380);
    },
    [setLang, closePicker]
  );

  if (!picker) return null;
  const sug = suggested && BY_CODE[suggested];

  return createPortal(
    <div className="lp" role="dialog" aria-modal="true" aria-labelledby="lp-title">
      <div className="lp-backdrop" onClick={closePicker} />
      <div className="lp-panel" ref={panel} tabIndex={-1}>
        <div className="lp-aurora" aria-hidden="true"><i /><i /><i /></div>
        <header className="lp-head">
          <div>
            <p className="lp-kicker"><Icon name="globe" size={14} /> {LANGUAGES.length} languages</p>
            <h2 id="lp-title" className="lp-title">
              <span className="sr-only">Choose your language</span>
              <RotatingTitle />
            </h2>
            <p className="lp-sub">Every language has its own colour and sound.</p>
          </div>
          <div className="lp-tools">
            <button type="button" className={`lp-sound ${sound ? 'on' : ''}`} onClick={toggleSound} aria-pressed={sound}>
              <span className="lps-ic" aria-hidden="true"><i /><i /><i /></span>
              {sound ? 'Sound on' : 'Sound off'}
            </button>
            <button type="button" className="lp-close" onClick={closePicker} aria-label="Close"><Icon name="close" size={20} /></button>
          </div>
        </header>
        <label className="lp-search">
          <Icon name="search" size={18} />
          <input
            ref={search}
            type="text"
            inputMode="search"
            enterKeyHint="go"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && groups[0]) {
                e.preventDefault();
                const r = search.current.getBoundingClientRect();
                pick(groups[0][1][0].code, { x: r.left + 40, y: r.top + r.height / 2 });
              }
            }}
            placeholder="Search languages"
            aria-label="Search languages"
            aria-controls="lp-results"
          />
          {q && (
            <button type="button" className="lp-clear" onClick={() => { setQ(''); search.current?.focus(); }} aria-label="Clear search">
              <Icon name="close" size={16} />
            </button>
          )}
        </label>
        <div className="lp-scroll" id="lp-results" aria-live="polite">
          {sug && !dq && (
            <section className="lp-group">
              <h3>Suggested for you</h3>
              <ul className="lp-grid is-sug notranslate" translate="no">
                <Tile l={sug} active={lang === sug.code} onPick={pick} featured />
                {sug.code !== 'en' && <Tile l={BY_CODE.en} active={lang === 'en'} onPick={pick} />}
              </ul>
            </section>
          )}
          {groups.map(([region, list]) => (
            <section key={region} className="lp-group">
              <h3>{region}</h3>
              <ul className="lp-grid notranslate" translate="no">{list.map((l) => <Tile key={l.code} l={l} active={lang === l.code} onPick={pick} />)}</ul>
            </section>
          ))}
          {!groups.length && <p className="lp-empty">No language matches “{dq}”.</p>}
        </div>
      </div>
    </div>,
    document.body
  );
}

/** Small pill while the rest of the page is being machine-translated (or a button when a click is needed). */
export function TranslateStatus() {
  const { lang, status, translateRest } = useI18n();
  const [hideInfo, setHideInfo] = useState(false);
  useEffect(() => setHideInfo(false), [lang]);
  useEffect(() => {
    if (!status.pending || status.hasProvider || status.needsClick) return;
    const t = setTimeout(() => setHideInfo(true), 7000);
    return () => clearTimeout(t);
  }, [status.pending, status.hasProvider, status.needsClick, lang]);
  if (lang === 'en') return null;
  if (status.waiting > 0)
    return (
      <div className="tx-pill" role="status">
        <span className="tx-spin" aria-hidden="true" /> Translating the page… <b className="notranslate" translate="no">{status.waiting}</b>
      </div>
    );
  if (status.needsClick && status.pending > 0)
    return (
      <div className="tx-pill is-action" role="status">
        <button type="button" onClick={translateRest}><Icon name="globe" size={15} /> Translate everything on this page</button>
      </div>
    );
  if (status.pending > 0 && !status.hasProvider && !hideInfo)
    return (
      <div className="tx-pill is-info" role="status">
        Menus and key sections are translated. Some longer text is still in English.
        <button type="button" onClick={() => setHideInfo(true)} aria-label="Dismiss"><Icon name="close" size={14} /></button>
      </div>
    );
  return null;
}
