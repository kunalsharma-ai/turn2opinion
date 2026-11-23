import { useState } from 'react';
import { Icon, Flag } from '../Icon.jsx';
import { flagFor, iconFor, iconsFor, showIcons, rk, SENS, norm, optLabel } from '../../lib/present.js';
import { burst } from '../../lib/fx.js';
import { optEmojiSet } from '../../lib/emoji-plus.js';
/* CHANGE-11: one meaningful, unique picture per option (emoji, value ladder or monogram) */
const Pic = ({ e, cls = 'ic' }) => (!e ? null : typeof e === 'string' ? <span className={cls + ' emo'} aria-hidden="true">{e}</span> : <span className={cls + ' mono'} aria-hidden="true">{e.mono}</span>);
import { t, nf } from '../../i18n/index.js';

/* Single-choice controls. Every variant is a native radio group, so arrow keys, Space and
   screen readers work; picking with a pointer, Space or Enter auto-advances (arrows don't).
   Icons, flags and sorting are worked out from the English option text; the label shown is translated. */
function useRadio({ n, act, value }) {
  return {
    onClick: (e) => { if (e.target.value == value) act.auto(n, e.target.closest('label')); },
    onChange: (e) => {
      act.answer(n, e.target.value, { prune: true });
      burst(e.target.closest('label'), document.getElementById('cd'));
      act.auto(n, e.target.closest('label'));
    },
    onKeyDown: (e) => { if (e.key === 'Enter') { e.preventDefault(); act.next(); } },
  };
}

export function Tiles({ s, n, o, value, act, t: tw, cls = 'tiles' }) {
  const h = useRadio({ n, act, value }), wi = showIcons(n), ics = iconsFor(o, tw), pics = optEmojiSet(n, o.map((x) => x[0]));
  return (
    <div className={cls + (wi ? '' : ' noic')} role="radiogroup" aria-labelledby="qh" aria-describedby="er">
      {o.map(([l, v], k) => (
        <label key={v} className={'tile' + (value == v ? ' on' : '')} style={{ '--k': k }}>
          <input type="radio" name="q" value={v} data-q="" checked={value == v} {...h} />
          {pics[k] ? <Pic e={pics[k]} /> : wi ? <span className="ic"><Icon n={ics[k]} /></span> : null}
          <span className="tl"><Flag cc={flagFor(s, n, l, v)} />{optLabel(s, n, l, v)}</span>
          <span className="tk"><Icon n="check" /></span>
        </label>
      ))}
    </div>
  );
}

export function Binary({ s, n, o, value, act }) {
  const h = useRadio({ n, act, value });
  return (
    <div className="tiles bin" role="radiogroup" aria-labelledby="qh" aria-describedby="er">
      {o.map(([l, v], k) => (
        <label key={v} className={'tile' + (value == v ? ' on' : '') + (/^yes/i.test(l) ? ' yes' : /^no\b/i.test(l) ? ' no' : '')} style={{ '--k': k }}>
          <input type="radio" name="q" value={v} data-q="" checked={value == v} {...h} />
          <span className="ic emo" aria-hidden="true">{/^yes/i.test(l) ? '👍' : /^no\b/i.test(l) ? '👎' : '🤔'}</span>
          <span className="tl">{optLabel(s, n, l, v)}</span>
          <span className="tk"><Icon n="check" /></span>
        </label>
      ))}
    </div>
  );
}

export function Rows({ s, n, o, value, act }) {
  const h = useRadio({ n, act, value }), [filter, setFilter] = useState(''), q = norm(filter).trim(), pics = optEmojiSet(n, o.map((x) => x[0]));
  return (
    <>
      {o.length > 12 && (
        <div className="mbar"><label className="fsr"><span className="sr">{t('filter_label')}</span><Icon n="search" />
          <input id="flt" type="search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={t('filter_ph', { n: o.length })} autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} />
        </label></div>
      )}
      <div className="rows" role="radiogroup" aria-labelledby="qh" aria-describedby="er">
        {o.map(([l, v], k) => {
          const f = flagFor(s, n, l, v), em = !f && pics[k], ic = !f && !em && !SENS.test(n) && iconFor(l), lab = optLabel(s, n, l, v);
          return (
            <label key={v} className={'row' + (value == v ? ' on' : '')} hidden={!!q && !norm(lab + ' ' + l).includes(q)}>
              <input type="radio" name="q" value={v} data-q="" checked={value == v} {...h} />
              <span className="dot" />
              {f ? <Flag cc={f} /> : em ? <Pic e={em} cls="ri" /> : ic ? <Icon n={ic} className="ri" /> : null}
              {f && /^(org-)?state$/.test(n) && <span className="stc">{String(v).split('-').slice(1).join('-')}</span>}
              <span>{lab}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

export function Scale({ s, n, o, value, act }) {
  const h = useRadio({ n, act, value }), N = o.length;
  return (
    <div className="scale" style={{ '--n': N }} role="radiogroup" aria-labelledby="qh" aria-describedby="er">
      {o.map(([l, v], k) => (
        <label key={v} className={'sc' + (value == v ? ' on' : '')}>
          <input type="radio" name="q" value={v} data-q="" checked={value == v} {...h} />
          <span className="bars" aria-hidden="true">
            {Array.from({ length: N }, (_, j) => <i key={j} className={j <= k ? 'f' : ''} style={{ height: `${30 + j * 70 / (N - 1 || 1)}%` }} />)}
          </span>
          <span className="sl">{optLabel(s, n, l, v)}</span>
        </label>
      ))}
    </div>
  );
}

/* Numeric ranges (income, counts, experience) shown lowest to highest as a bar chart. */
export function Levels({ s, n, o, value, act }) {
  const h = useRadio({ n, act, value });
  const sorted = o.map((x, k) => [x, k]).sort((p, q) => rk(p[0][0]) - rk(q[0][0]) || p[1] - q[1]).map((x) => x[0]), N = sorted.length;
  return (
    <>
      <div className="levels" style={{ '--n': N }} role="radiogroup" aria-labelledby="qh" aria-describedby="er">
        {sorted.map(([l, v], k) => (
          <label key={v} className={'lv' + (value == v ? ' on' : '')} style={{ '--k': k }}>
            <input type="radio" name="q" value={v} data-q="" checked={value == v} {...h} />
            <span className="bar" aria-hidden="true"><i style={{ '--h': rk(l) >= 1e15 ? 0.12 : 0.14 + 0.86 * (k + 1) / N }} /></span>
            <span className="tl">{optLabel(s, n, l, v)}</span>
          </label>
        ))}
      </div>
      <p className="cur-hint">{t('ranges')} <span className="sr">{nf(N)}</span></p>
    </>
  );
}
