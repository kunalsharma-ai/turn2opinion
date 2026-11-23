// Language state for the consent page.
//
//  • 51 languages (same list, palettes and sound signatures as the main website — src/i18n/languages.js).
//  • Interface text: src/i18n/strings/<code>.js (hand translations, loaded on demand). Missing keys fall back to
//    machine translation when available (config.translateUrl or the browser's built-in translator), else English.
//  • Theme: English = white "light" theme; every other language = the classic Turn2Opinion navy theme.
//  • First language: ?lang= in the URL → config.language → the member's choice on the main site (localStorage
//    "t2o.lang") → the browser language → English.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BY_CODE, DEFAULT_LANG, LANGUAGES, matchLocale, resolveLang, themeFor } from './languages.js';
import EN from './strings/en.js';
import { SECTIONS } from '../content/terms.js';
import { providersFor, setEndpoint } from './providers.js';

// English base = UI strings + section titles/summaries
const BASE = { ...EN };
for (const [n, s] of Object.entries(SECTIONS)) {
  BASE[`t${n}`] = s.title;
  BASE[`s${n}`] = s.short;
}

// Hand-translated interface text (one small chunk per language)
const LOADERS = {
  'zh-CN': () => import('./strings/zh-CN.js'),
  'zh-TW': () => import('./strings/zh-TW.js'),
  hi: () => import('./strings/hi.js'),
  es: () => import('./strings/es.js'),
  ar: () => import('./strings/ar.js'),
  pt: () => import('./strings/pt.js'),
  fr: () => import('./strings/fr.js'),
  de: () => import('./strings/de.js'),
  ja: () => import('./strings/ja.js'),
  ko: () => import('./strings/ko.js'),
  id: () => import('./strings/id.js'),
  ru: () => import('./strings/ru.js'),
};
export const HAND_TRANSLATED = Object.keys(LOADERS);
// The other 38 languages: essential text (title, steps, chapters, every consent box, main buttons)
const essential = (code) => () => import('./strings/essential.js').then((m) => ({ default: Object.fromEntries(m.KEYS.map((k, i) => [k, m.ESSENTIAL[code][i]])) }));
for (const l of LANGUAGES) if (l.code !== 'en' && !LOADERS[l.code]) LOADERS[l.code] = essential(l.code);

const KEY = 't2o.lang'; // shared with the main website
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const mtCache = (code) => {
  try { return JSON.parse(sessionStorage.getItem(`t2o.pro.mt.${code}`) || '{}'); } catch { return {}; }
};

const fmt = (s, args) => String(s).replace(/\{(\d)\}/g, (m, i) => (args[i] != null ? args[i] : m));

const Ctx = createContext(null);

export function pickInitialLanguage(config) {
  let fromUrl = null;
  try { fromUrl = resolveLang(new URLSearchParams(window.location.search).get('lang')); } catch { /* ignore */ }
  if (fromUrl) return fromUrl;
  if (config.language && config.language !== 'auto' && BY_CODE[resolveLang(config.language)]) return resolveLang(config.language);
  const saved = store.get(KEY);
  if (saved && BY_CODE[saved]) return saved;
  try { return matchLocale(navigator.languages || [navigator.language]) || DEFAULT_LANG; } catch { return DEFAULT_LANG; }
}

// Loaded dictionaries (so a language can be rendered translated on the very first render).
const DICTS = {};
export function loadLanguage(code) {
  if (code === DEFAULT_LANG || !LOADERS[code]) return Promise.resolve({});
  if (DICTS[code]) return Promise.resolve(DICTS[code]);
  return LOADERS[code]().then((m) => (DICTS[code] = (m && m.default) || {})).catch(() => ({}));
}

export function I18nProvider({ config, initial = DEFAULT_LANG, children }) {
  const [lang, setLangState] = useState(initial);
  const [dict, setDict] = useState(() => DICTS[initial] || null); // hand translations for lang
  const [mt, setMt] = useState({}); // machine translations for missing keys
  const [mtBusy, setMtBusy] = useState(false);
  const reqRef = useRef(0);
  useEffect(() => setEndpoint(config.translateUrl), [config.translateUrl]);

  // load dictionary + fill gaps by machine translation (if a provider exists)
  useEffect(() => {
    const id = ++reqRef.current;
    const meta = BY_CODE[lang];
    if (config.standalone) {
      // standalone page: the whole document follows the language (embed mode leaves the host page alone)
      document.documentElement.lang = lang;
      // keep the word-less boot frame until the member's language (config.bootLang) is on screen
      if (!config.bootLang || lang === config.bootLang) document.documentElement.classList.remove('lang-boot');
    }
    if (lang === DEFAULT_LANG) { setDict(null); setMt({}); return; }
    (async () => {
      const hand = await loadLanguage(lang);
      if (id !== reqRef.current) return;
      setDict(hand);
      const cached = mtCache(lang);
      setMt(cached);
      const missing = Object.keys(BASE).filter((k) => !hand[k] && !cached[k]);
      if (!missing.length) return;
      const providers = await providersFor(meta).catch(() => []);
      const usable = providers.filter((p) => p.name !== 'device-needs-click');
      if (!usable.length || id !== reqRef.current) return;
      setMtBusy(true);
      try {
        const out = await usable[0].translate(missing.map((k) => BASE[k]));
        const next = { ...cached };
        missing.forEach((k, i) => { if (out[i]) next[k] = out[i]; });
        try { sessionStorage.setItem(`t2o.pro.mt.${lang}`, JSON.stringify(next)); } catch { /* ignore */ }
        if (id === reqRef.current) setMt(next);
      } finally {
        if (id === reqRef.current) setMtBusy(false);
      }
    })();
  }, [lang]);

  // an already-loaded dictionary is used on the very render that switches language (no English frame)
  const d = lang === DEFAULT_LANG ? null : DICTS[lang] || dict;
  const t = useCallback(
    (key, ...args) => fmt((d && d[key]) || mt[key] || BASE[key] || key, args),
    [d, mt]
  );
  const setLang = useCallback((code) => {
    const c = BY_CODE[code] ? code : DEFAULT_LANG;
    store.set(KEY, c);
    store.set('t2o.lang.seen', '1');
    setLangState(c);
  }, []);
  const setLangSilently = useCallback((code) => setLangState(BY_CODE[code] ? code : DEFAULT_LANG), []);
  const value = useMemo(() => ({ lang, meta: BY_CODE[lang], t, setLang, setLangSilently, languages: LANGUAGES, mtBusy, hand: lang === 'en' || HAND_TRANSLATED.includes(lang) }), [lang, t, setLang, setLangSilently, mtBusy]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

/** Machine-translate the full legal text of a section on request (returns null when no provider is available). */
export async function translateTexts(code, texts, interactive = true) {
  const meta = BY_CODE[code];
  const providers = await providersFor(meta, { interactive }).catch(() => []);
  const p = providers.find((x) => x.name !== 'device-needs-click');
  if (!p) return null;
  const out = await p.translate(texts);
  return out.some(Boolean) ? out : null;
}
