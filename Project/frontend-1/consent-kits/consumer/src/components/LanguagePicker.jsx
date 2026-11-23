// Language picker: searchable sheet of 51 languages. Search matches English name, native name, code and common
// aliases ("中文", "deutsch", "farsi"…). Arrow keys move, Enter chooses, Esc closes. Each language plays its own
// sound signature when chosen. Rendering is cheap: the list is filtered with useMemo, no per-keystroke effects.
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icons.jsx';
import { useI18n } from '../i18n/I18n.jsx';
import { play, playLanguage, preloadLanguageSounds } from '../sound.js';

const ALIAS = {
  'zh-CN': 'chinese mandarin 中文 汉语 简体 zhongwen putonghua', 'zh-TW': 'chinese traditional 繁体 繁體 中文 taiwan hong kong cantonese',
  ja: 'japanese nihongo 日本', ko: 'korean hangul 한국', hi: 'hindi हिंदी', ar: 'arabic عربي', fa: 'farsi persian', he: 'hebrew ivrit',
  es: 'spanish espanol castellano', pt: 'portuguese portugues brasil', fr: 'french francais', de: 'german deutsch', it: 'italian italiano',
  nl: 'dutch nederlands', ru: 'russian russkiy', uk: 'ukrainian', pl: 'polish polski', sv: 'swedish svenska', nb: 'norwegian norsk bokmal',
  da: 'danish dansk', fi: 'finnish suomi', el: 'greek ellinika', cs: 'czech cestina', hu: 'hungarian magyar', ro: 'romanian romana',
  tr: 'turkish turkce', id: 'indonesian bahasa', ms: 'malay bahasa melayu', th: 'thai', vi: 'vietnamese tieng viet', fil: 'filipino tagalog',
  sw: 'swahili kiswahili', bn: 'bengali bangla', ta: 'tamil', te: 'telugu', mr: 'marathi', gu: 'gujarati', pa: 'punjabi gurmukhi', kn: 'kannada',
  ml: 'malayalam', ur: 'urdu', ne: 'nepali', si: 'sinhala sinhalese', km: 'khmer cambodian', bg: 'bulgarian', af: 'afrikaans', zu: 'zulu isizulu',
  am: 'amharic', ha: 'hausa', yo: 'yoruba',
};
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function LanguagePicker({ open, onClose }) {
  const { lang, setLang, languages, t } = useI18n();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const listRef = useRef(null);
  const index = useMemo(() => languages.map((l) => ({ l, hay: norm(`${l.name} ${l.native} ${l.code} ${ALIAS[l.code] || ''}`) })), [languages]);
  const list = useMemo(() => {
    const n = norm(q.trim());
    return n ? index.filter((x) => x.hay.includes(n)).map((x) => x.l) : languages;
  }, [q, index, languages]);

  useEffect(() => {
    if (!open) return undefined;
    preloadLanguageSounds();
    setQ('');
    setActive(Math.max(0, languages.findIndex((l) => l.code === lang)));
    const id = setTimeout(() => input.current && input.current.focus({ preventScroll: true }), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(id); document.body.style.overflow = prev; };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => {
    const el = listRef.current && listRef.current.querySelector(`[data-i="${active}"]`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;
  const choose = (code) => {
    playLanguage(code);
    setLang(code);
    onClose();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') { play('close'); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(list.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && list[active]) { e.preventDefault(); choose(list[active].code); }
  };
  const current = languages.find((l) => l.code === lang);
  return (
    <div className="lp-veil" onMouseDown={(e) => { if (e.target === e.currentTarget) { play('close'); onClose(); } }}>
      <div className="lp" role="dialog" aria-modal="true" aria-labelledby="lp-title" onKeyDown={onKey}>
        <div className="lp-head">
          <span className="lp-orb" style={{ '--l1': current.grade[0], '--l2': current.grade[1] }} aria-hidden="true">{current.glyph}</span>
          <div>
            <h2 id="lp-title">{current.choose}</h2>
            <p>{current.native !== current.name ? `${current.native} · ${current.name}` : current.name}</p>
          </div>
          <button type="button" className="icon-btn" onClick={() => { play('close'); onClose(); }} aria-label={t('close')}>
            <Icon name="x" size={20} decorative />
          </button>
        </div>
        <label className="lp-search">
          <Icon name="search" size={18} decorative />
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('search', languages.length)}
            aria-label={t('search', languages.length)}
            aria-controls="lp-list"
            aria-activedescendant={list[active] ? `lp-${list[active].code}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <ul className="lp-list" id="lp-list" role="listbox" ref={listRef} aria-label={t('language')}>
          {list.map((l, i) => (
            <li key={l.code} role="presentation">
              <button
                type="button"
                id={`lp-${l.code}`}
                role="option"
                data-i={i}
                aria-selected={l.code === lang}
                className={`lp-item ${i === active ? 'is-active' : ''} ${l.code === lang ? 'is-current' : ''}`}
                style={{ '--l1': l.grade[0], '--l2': l.grade[1], '--l3': l.grade[2] }}
                onClick={() => choose(l.code)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="lp-glyph" aria-hidden="true">{l.glyph}</span>
                <span className="lp-names">
                  <b lang={l.code} dir={l.dir || 'ltr'}>{l.native}</b>
                  <small lang="en" dir="ltr">{l.name}</small>
                </span>
                {l.code === lang ? <Icon name="check" size={18} className="lp-tick" alt="Selected" /> : null}
              </button>
            </li>
          ))}
          {!list.length ? <li className="lp-empty">{t('no_match')}</li> : null}
        </ul>
      </div>
    </div>
  );
}
