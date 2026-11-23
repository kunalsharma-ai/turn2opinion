// The legal text of a Part A section: the numbered clauses (1.1, 1.2 …), bullet lists and the contact block.
// Shown inside the "full agreement" reader, and flattened to plain strings for machine translation and the PDF.
import { useState } from 'react';
import Icon from './Icons.jsx';
import { SECTIONS } from '../content/terms.js';
import { useI18n, translateTexts } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

export const fill = (s, cfg) => String(s).replace(/\{(\w+)\}/g, (m, k) => (cfg[k] != null && typeof cfg[k] !== 'object' ? cfg[k] : m));

/** Flattens a section body to plain strings (machine translation / the downloadable copy). */
export function bodyTexts(n, cfg) {
  const out = [];
  for (const b of SECTIONS[n].body) {
    if (typeof b === 'string') out.push(fill(b, cfg));
    else if (b.ul) b.ul.forEach((x) => out.push(fill(x, cfg)));
  }
  return out;
}

export function Contact({ cfg, t }) {
  return (
    <dl className="contact">
      <div><dt><Icon name="mail" size={18} decorative />{t('contact_email')}</dt><dd><a href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a></dd></div>
      <div><dt><Icon name="pin" size={18} decorative />{t('contact_address')}</dt><dd>{cfg.operator}, {cfg.address}</dd></div>
      <div><dt><Icon name="lock" size={18} decorative />{t('contact_privacy')}</dt><dd><a href={`mailto:${cfg.privacyEmail}`}>{cfg.privacyEmail}</a></dd></div>
    </dl>
  );
}

function Body({ n, cfg, tr, t }) {
  let k = 0;
  let c = 0;
  const next = (s) => (tr ? tr[k++] || s : s);
  return SECTIONS[n].body.map((b, i) => {
    if (typeof b === 'string') {
      c += 1;
      return <p key={i} className="clause"><span className="cl-no">{n}.{c}</span><span>{next(fill(b, cfg))}</span></p>;
    }
    if (b.ul) return <ul key={i} className="cl-list">{b.ul.map((x, j) => <li key={j}>{next(fill(x, cfg))}</li>)}</ul>;
    if (b.contact) return <Contact key={i} cfg={cfg} t={t} />;
    return null;
  });
}

/** One numbered section inside the reader: title, plain-language summary, then the full clauses. */
export default function Section({ n, cfg }) {
  const { t, lang } = useI18n();
  const s = SECTIONS[n];
  const [tr, setTr] = useState(null);
  const [trState, setTrState] = useState('idle');
  const [trLang, setTrLang] = useState(null);
  const translated = tr && trLang === lang;
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
    <article className="rd-sec" id={`s${n}`} style={{ '--h': s.hue }} aria-labelledby={`s${n}-t`}>
      <h4 id={`s${n}-t`}><span className="rd-n">{n}</span>{t(`t${n}`)}</h4>
      <p className="rd-short"><span className="tc-k">{t('in_short')}</span><mark>{t(`s${n}`)}</mark></p>
      <div className="rd-text" lang={translated ? lang : 'en'} dir={translated ? undefined : 'ltr'}>
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
    </article>
  );
}
