// One numbered section of the terms: 3D icon tile, plain-language summary ("In short"), and the full legal text
// behind an accordion. Counted as read when opened, or after it has been on screen for a moment (see App.jsx).
import { memo, useRef, useState } from 'react';
import Icon from './Icons.jsx';
import { SECTIONS } from '../content/terms.js';
import { useI18n, translateTexts } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

export const fill = (s, cfg) =>
  String(s).replace(/\{(\w+)\}/g, (m, k) => (cfg[k] != null && typeof cfg[k] !== 'object' ? cfg[k] : m));

/** Flattens a section body to plain strings (for machine translation / the downloadable copy). */
export function bodyTexts(n, cfg) {
  const out = [];
  for (const b of SECTIONS[n].body) {
    if (typeof b === 'string') out.push(fill(b, cfg));
    else if (b.h) out.push(b.h);
    else if (b.ol || b.ul) (b.ol || b.ul).forEach((x) => out.push(fill(x, cfg)));
  }
  return out;
}

export function Body({ n, cfg, tr, t }) {
  let k = 0;
  const next = (s) => (tr ? tr[k++] || s : s);
  return SECTIONS[n].body.map((b, i) => {
    if (typeof b === 'string') return <p key={i}>{next(fill(b, cfg))}</p>;
    if (b.h) return <h4 key={i}>{next(b.h)}</h4>;
    if (b.ol) return <ol key={i}>{b.ol.map((x, j) => <li key={j}>{next(fill(x, cfg))}</li>)}</ol>;
    if (b.ul) return <ul key={i}>{b.ul.map((x, j) => <li key={j}>{next(fill(x, cfg))}</li>)}</ul>;
    if (b.contact)
      return (
        <dl className="contact" key={i}>
          <div><dt><Icon name="mail" size={18} decorative />{t('contact_email')}</dt><dd><a href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a></dd></div>
          <div><dt><Icon name="pin" size={18} decorative />{t('contact_address')}</dt><dd>{cfg.operator}, {cfg.address}</dd></div>
          <div><dt><Icon name="lock" size={18} decorative />{t('contact_privacy')}</dt><dd><a href={`mailto:${cfg.privacyEmail}`}>{cfg.privacyEmail}</a></dd></div>
        </dl>
      );
    return null;
  });
}

function Section({ n, cfg, isOpen, isRead, onToggle, index }) {
  const { t, lang } = useI18n();
  const s = SECTIONS[n];
  const [tr, setTr] = useState(null); // machine translation of the full text (current language)
  const [trState, setTrState] = useState('idle');
  const [trLang, setTrLang] = useState(null);
  const translated = tr && trLang === lang;
  const ever = useRef(false); // keep the text mounted after the first opening so closing animates too
  if (isOpen) ever.current = true;
  const doTranslate = async () => {
    play('tap');
    setTrState('busy');
    try {
      const out = await translateTexts(lang, bodyTexts(n, cfg));
      if (out) { setTr(out); setTrLang(lang); setTrState('idle'); } else setTrState('fail');
    } catch {
      setTrState('fail');
    }
  };
  return (
    <article className={`card ${isOpen ? 'is-open' : ''} ${isRead ? 'is-read' : ''}`} id={`s${n}`} data-n={n} style={{ '--i': index }} aria-labelledby={`s${n}-t`}>
      <div className="card-top">
        <span className="tile" aria-hidden="true">
          <Icon name={s.icon} size={30} decorative />
          <i className="tap-heart"><Icon name="heart" size={40} decorative /></i>
        </span>
        <div className="card-title">
          <span className="sec-no">{t('section', n)}</span>
          <h3 id={`s${n}-t`}>{t(`t${n}`)}</h3>
        </div>
        <span className={`read-pill ${isRead ? 'on' : ''}`} aria-live="polite">
          <span className="pill-heart" aria-hidden="true"><Icon name="heart" size={14} decorative /></span>
          {isRead ? <><Icon name="check" size={14} decorative />{t('read_done')}</> : null}
        </span>
      </div>
      <p className="short">
        <span className="short-k">{t('in_short')}</span>
        {t(`s${n}`)}
      </p>
      <button
        type="button"
        className="more"
        aria-expanded={isOpen}
        aria-controls={`s${n}-b`}
        onClick={() => { play(isOpen ? 'close' : 'open'); onToggle(n); }}
      >
        <span>{isOpen ? t('hide') : t('full')}</span>
        <Icon name="chevron" size={18} decorative />
      </button>
      <div className="body-wrap" id={`s${n}-b`} role="region" aria-labelledby={`s${n}-t`}>
        <div className="body-in">
          {ever.current ? (
            <div className="body" lang={translated ? lang : 'en'} dir={translated ? undefined : 'ltr'}>
              {lang !== 'en' ? (
                <div className="mt-bar">
                  <span>{translated ? t('mt_note') : t('legal_en')}</span>
                  {!translated ? (
                    <button type="button" className="chip" onClick={doTranslate} disabled={trState === 'busy'}>
                      <Icon name="lang" size={16} decorative />
                      {trState === 'busy' ? t('translating') : trState === 'fail' ? t('mt_fail') : t('translate_full')}
                    </button>
                  ) : null}
                </div>
              ) : null}
              <Body n={n} cfg={cfg} tr={translated ? tr : null} t={t} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
export default memo(Section);
