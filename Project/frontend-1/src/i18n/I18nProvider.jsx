// Language state for the whole site: which language is active, the colour grade, the picker, the sounds.
//
// Order of choice on page load (client only — prerendered HTML is always English, so hydration is safe):
//   1. ?lang=zh-CN in the URL (campaign links, e.g. https://www.turn2opinion.com/?lang=zh-CN for China)
//   2. the visitor's saved choice (localStorage "t2o.lang")
//   3. nothing saved and the browser speaks a supported non-English language → the picker opens once,
//      with that language suggested at the top (visitors always choose; we never switch silently).
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BY_CODE, DEFAULT_LANG, LANGUAGES, matchLocale, resolveLang, themeFor } from './languages.js';
import { onStatus, setPageLanguage, retryWithGesture } from './engine.js';
import { isSoundEnabled, setSoundEnabled } from './soundPrefs.js';

const loadSounds = () => import('./sounds.js');
/** Play a language's signature sound (the synthesiser chunk is fetched on first use). */
function playLanguageSound(code) {
  if (!isSoundEnabled()) return;
  loadSounds().then((m) => m.playLanguageSound(code)).catch(() => {});
}
import { track } from '../utils/analytics.js';

const KEY = 't2o.lang';
const SEEN = 't2o.lang.seen';
const I18nContext = createContext({ lang: DEFAULT_LANG, meta: BY_CODE[DEFAULT_LANG], setLang: () => {}, openPicker: () => {} });

const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* blocked storage: the choice lasts for this visit */
    }
  },
};

/** Paint the site's colour grade for a language (CSS variables + the WebGL aurora listens to the event). */
export function applyGrade(meta) {
  const [a, b, c] = meta.grade;
  document.documentElement.dataset.theme = themeFor(meta.code);
  const s = document.documentElement.style;
  s.setProperty('--lg1', a);
  s.setProperty('--lg2', b);
  s.setProperty('--lg3', c);
  window.dispatchEvent(new CustomEvent('t2o:grade', { detail: meta.grade }));
}

/** A ripple of the new colour grade that washes over the screen from the click point. */
function gradeWave(meta, origin) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = document.createElement('div');
  el.className = 'grade-wave';
  el.setAttribute('aria-hidden', 'true');
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 80;
  el.style.setProperty('--x', `${x}px`);
  el.style.setProperty('--y', `${y}px`);
  el.style.setProperty('--w1', meta.grade[0]);
  el.style.setProperty('--w2', meta.grade[1]);
  el.style.setProperty('--w3', meta.grade[2]);
  el.innerHTML = `<i></i><i></i><i></i><b class="notranslate" translate="no">${meta.glyph}</b>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const [picker, setPicker] = useState(false);
  const [suggested, setSuggested] = useState(null);
  const [sound, setSound] = useState(true);
  const [status, setStatus] = useState({ waiting: 0, pending: 0, hasProvider: false, needsClick: false });
  const first = useRef(true);

  const setLang = useCallback((code, { origin, silent = false, interactive = true } = {}) => {
    const meta = BY_CODE[code] || BY_CODE[DEFAULT_LANG];
    setLangState(meta.code);
    store.set(KEY, meta.code);
    store.set(SEEN, '1');
    if (!silent) {
      playLanguageSound(meta.code);
      gradeWave(meta, origin);
      track('language_change', { language: meta.code });
    }
    applyGrade(meta);
    // let the wave start before the page text changes
    setTimeout(() => setPageLanguage(meta.code, { interactive }), silent ? 0 : 160);
  }, []);

  // Initial language (after hydration)
  useEffect(() => {
    if (!first.current) return;
    first.current = false;
    setSound(isSoundEnabled());
    const unsub = onStatus(setStatus);
    let fromUrl = null;
    try {
      fromUrl = resolveLang(new URLSearchParams(window.location.search).get('lang'));
    } catch {
      /* ignore */
    }
    const saved = store.get(KEY);
    const pick = fromUrl || (saved && BY_CODE[saved] ? saved : null);
    if (pick) {
      if (pick !== DEFAULT_LANG) setLang(pick, { silent: true, interactive: false });
      else applyGrade(BY_CODE[DEFAULT_LANG]);
      if (fromUrl) store.set(KEY, fromUrl);
    } else {
      applyGrade(BY_CODE[DEFAULT_LANG]);
      const guess = matchLocale(navigator.languages || [navigator.language]);
      if (guess && guess !== DEFAULT_LANG && !store.get(SEEN)) {
        setSuggested(guess);
        const t = setTimeout(() => setPicker(true), 900);
        return () => {
          clearTimeout(t);
          unsub();
        };
      }
    }
    return unsub;
  }, [setLang]);

  const toggleSound = useCallback(() => {
    setSound((s) => {
      setSoundEnabled(!s);
      return !s;
    });
  }, []);

  const value = useMemo(
    () => ({
      lang,
      meta: BY_CODE[lang],
      languages: LANGUAGES,
      setLang,
      picker,
      suggested,
      openPicker: () => {
        loadSounds().catch(() => {}); // warm up so the first sound plays instantly
        setPicker(true);
      },
      closePicker: () => {
        store.set(SEEN, '1');
        setPicker(false);
      },
      sound,
      toggleSound,
      status,
      translateRest: retryWithGesture,
    }),
    [lang, setLang, picker, suggested, sound, toggleSound, status]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
