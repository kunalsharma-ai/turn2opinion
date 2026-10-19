import { useMemo } from 'react';
import { Icon, Flag } from './Icon.jsx';
import { LANGS, BY, suggested, bcp } from '../i18n/languages.js';
import { t, useI18n, lang, preloadLang } from '../i18n/index.js';

/* The language strip right under the header: the visitor's own languages first, then the most spoken.
   One tap switches the whole page (with that language's sound); "+N more" opens the full picker. */
export default function LangRail({ onPick, onMore }) {
  useI18n();
  const code = lang();
  const list = useMemo(() => suggested(code), [code]);
  return (
    <section className="rail" aria-labelledby="rail-h">
      <div className="rail-head">
        <span className="rail-ic" aria-hidden="true"><Icon n="translate" /></span>
        <h2 id="rail-h">{t('lang_choose')}</h2>
        <span className="rail-sub">{t('lang_auto')}</span>
      </div>
      <div className="rail-scroll">
        <ul className="rail-list">
          {list.map((c) => {
            const l = BY[c], on = c === code;
            return (
              <li key={c}>
                <button type="button" className={'lchip' + (on ? ' on' : '')} aria-pressed={on} lang={bcp(c)} dir={l.d || 'ltr'}
                  onClick={(e) => onPick(c, e)} onPointerEnter={() => preloadLang(c)} onFocus={() => preloadLang(c)}>
                  <Flag cc={l.f} />
                  <span className="lc-n">{l.n}</span>
                  {on && <span className="eq" aria-hidden="true"><i /><i /><i /></span>}
                </button>
              </li>
            );
          })}
          <li>
            <button type="button" className="lchip more" onClick={onMore} aria-haspopup="dialog">
              <Icon n="globe" /><span className="lc-n">{t('lang_more', { n: LANGS.length - list.length })}</span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
