import { useState } from 'react';
import { Icon, Flag } from '../Icon.jsx';
import { EXCL, flagFor, iconsFor, showIcons, norm, optLabel } from '../../lib/present.js';
import { burst } from '../../lib/fx.js';
import { optEmoji } from '../../lib/emoji.js';
import { t } from '../../i18n/index.js';

/* Multi-select: tiles for short lists, a filterable chip cloud for long ones.
   "None of these"-style options clear the others, and picking another clears them. */
export function Multi({ s, n, o, value, act, t: tw, chips }) {
  const [q, setQ] = useState('');
  const sel = value || [], wi = !chips && showIcons(n), ics = chips ? null : iconsFor(o, tw), nq = norm(q).trim();
  const toggle = (e, v, l) => {
    let next;
    if (e.target.checked) next = EXCL.test(l) ? [v] : sel.filter((x) => !EXCL.test((o.find((y) => y[1] === x) || [''])[0])).concat(v);
    else next = sel.filter((x) => x !== v);
    act.answer(n, next, { prune: true });
    if (e.target.checked) burst(e.target.closest('label'), document.getElementById('cd'));
  };
  const showFilter = chips || o.length > 12;
  return (
    <>
      <div className="mbar">
        {showFilter && (
          <label className="fsr"><span className="sr">{t('filter_label')}</span><Icon n="search" />
            <input id="flt" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('filter_ph', { n: o.length })} autoComplete="off"
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} />
          </label>
        )}
        <span className="cnt" id="cnt" aria-live="polite">{t('n_selected', { n: sel.length })}</span>
        <button type="button" className="lnk" id="clr" hidden={!sel.length} onClick={() => act.answer(n, [], { prune: true })}>{t('clear_all')}</button>
      </div>
      <div className={chips ? 'chips' : 'tiles multi' + (wi ? '' : ' noic')} role="group" aria-labelledby="qh" aria-describedby="er">
        {o.map(([l, v], k) => {
          const on = sel.includes(v), lab = optLabel(s, n, l, v), hide = !!nq && !norm(lab + ' ' + l).includes(nq);
          const input = <input type="checkbox" value={v} data-q="" checked={on} onChange={(e) => toggle(e, v, l)} />;
          return chips ? (
            <label key={v} className={'chip' + (on ? ' on' : '')} hidden={hide}>{input}<Icon n="check" /><Flag cc={flagFor(s, n, l, v)} />{optEmoji(n, l) && <span className="emo" aria-hidden="true">{optEmoji(n, l)}</span>}<span>{lab}</span></label>
          ) : (
            <label key={v} className={'tile' + (on ? ' on' : '')} style={{ '--k': k }} hidden={hide}>
              {input}
              {wi && (optEmoji(n, l) ? <span className="ic emo" aria-hidden="true">{optEmoji(n, l)}</span> : <span className="ic"><Icon n={ics[k]} /></span>)}
              <span className="tl"><Flag cc={flagFor(s, n, l, v)} />{lab}</span>
              <span className="tk"><Icon n="check" /></span>
            </label>
          );
        })}
      </div>
    </>
  );
}
