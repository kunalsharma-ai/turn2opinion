// Language state for the teen participation agreement.
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
import { SECTIONS, DECLARATION, ASSENT } from '../content/terms.js';
import { providersFor, setEndpoint } from './providers.js';

// English base = UI strings + section titles/summaries + declaration + assent points
export const BASE = { ...EN };
for (const [n, s] of Object.entries(SECTIONS)) {
  BASE[`t${n}`] = s.title;
  BASE[`s${n}`] = s.short;
}
DECLARATION.forEach((d, i) => { BASE[`d${i + 1}`] = d; });
ASSENT.forEach((a, i) => { BASE[`a${i + 1}`] = a; });

// Translated text, one small chunk per language (loaded on demand). Every language carries every interface text:
// titles, plain-language summaries, the declaration, all consent boxes, the teen assent, form, dialogs, record.
const LOADERS = {
  'zh-CN': () => import('./strings/zh-CN.js'),
  'zh-TW': () => import('./strings/zh-TW.js'),
  'ja': () => import('./strings/ja.js'),
  'ko': () => import('./strings/ko.js'),
  'hi': () => import('./strings/hi.js'),
  'bn': () => import('./strings/bn.js'),
  'ta': () => import('./strings/ta.js'),
  'te': () => import('./strings/te.js'),
  'mr': () => import('./strings/mr.js'),
  'gu': () => import('./strings/gu.js'),
  'pa': () => import('./strings/pa.js'),
  'kn': () => import('./strings/kn.js'),
  'ml': () => import('./strings/ml.js'),
  'ur': () => import('./strings/ur.js'),
  'ar': () => import('./strings/ar.js'),
  'fa': () => import('./strings/fa.js'),
  'he': () => import('./strings/he.js'),
  'tr': () => import('./strings/tr.js'),
  'es': () => import('./strings/es.js'),
  'pt': () => import('./strings/pt.js'),
  'fr': () => import('./strings/fr.js'),
  'it': () => import('./strings/it.js'),
  'de': () => import('./strings/de.js'),
  'nl': () => import('./strings/nl.js'),
  'ru': () => import('./strings/ru.js'),
  'uk': () => import('./strings/uk.js'),
  'pl': () => import('./strings/pl.js'),
  'sv': () => import('./strings/sv.js'),
  'nb': () => import('./strings/nb.js'),
  'da': () => import('./strings/da.js'),
  'fi': () => import('./strings/fi.js'),
  'el': () => import('./strings/el.js'),
  'cs': () => import('./strings/cs.js'),
  'hu': () => import('./strings/hu.js'),
  'ro': () => import('./strings/ro.js'),
  'id': () => import('./strings/id.js'),
  'ms': () => import('./strings/ms.js'),
  'th': () => import('./strings/th.js'),
  'vi': () => import('./strings/vi.js'),
  'fil': () => import('./strings/fil.js'),
  'sw': () => import('./strings/sw.js'),
  'ne': () => import('./strings/ne.js'),
  'si': () => import('./strings/si.js'),
  'km': () => import('./strings/km.js'),
  'bg': () => import('./strings/bg.js'),
  'af': () => import('./strings/af.js'),
  'zu': () => import('./strings/zu.js'),
  'am': () => import('./strings/am.js'),
  'ha': () => import('./strings/ha.js'),
  'yo': () => import('./strings/yo.js'),
};
export const FULL = ['zh-CN', 'zh-TW', 'hi', 'es', 'ar', 'pt', 'fr', 'de', 'ja', 'ko', 'id', 'ru'];

const KEY = 't2o.lang'; // shared with the main website
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const mtCache = (code) => {
  try { return JSON.parse(sessionStorage.getItem(`t2o.minor.mt.${code}`) || '{}'); } catch { return {}; }
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
      document.documentElement.classList.remove('lang-boot');
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
        try { sessionStorage.setItem(`t2o.minor.mt.${lang}`, JSON.stringify(next)); } catch { /* ignore */ }
        if (id === reqRef.current) setMt(next);
      } finally {
        if (id === reqRef.current) setMtBusy(false);
      }
    })();
  }, [lang]);

  const t = useCallback(
    // Turn2Opinion host hook: config.text overrides English interface strings (e.g. the guardian-mode wording)
    (key, ...args) => fmt((lang === DEFAULT_LANG && config.text && config.text[key]) || (dict && dict[key]) || mt[key] || BASE[key] || key, args),
    [dict, mt, lang, config.text]
  );
  const setLang = useCallback((code) => {
    const c = BY_CODE[code] ? code : DEFAULT_LANG;
    store.set(KEY, c);
    store.set('t2o.lang.seen', '1');
    setLangState(c);
  }, []);
  const setLangSilently = useCallback((code) => setLangState(BY_CODE[code] ? code : DEFAULT_LANG), []);
  const value = useMemo(() => ({ lang, meta: BY_CODE[lang], t, setLang, setLangSilently, languages: LANGUAGES, mtBusy, hand: lang === 'en' || FULL.includes(lang) }), [lang, t, setLang, setLangSilently, mtBusy]);
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
