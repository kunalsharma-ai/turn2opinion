import { FLAG_INDEX, FLAG_COLS, FLAG_ROWS } from '../lib/flag-index.js';

/* Stroke icon from the inline sprite (see lib/icons.js). */
export function Icon({ n, className }) {
  return (
    <svg className={'i' + (className ? ' ' + className : '')} aria-hidden="true" focusable="false">
      <use href={`#i-${n}`} />
    </svg>
  );
}

/* Country flag from one sprite sheet (public/flags/sprite.webp) — one small request, works on every OS
   (Windows has no flag emoji). Individual files also live in public/flags/<CC>.webp. */
export function Flag({ cc, className }) {
  const i = FLAG_INDEX[cc];
  if (i == null) return null;
  return (
    <span className={'flag' + (className ? ' ' + className : '')} aria-hidden="true"
      style={{ '--fx': i % FLAG_COLS, '--fy': Math.floor(i / FLAG_COLS) }} />
  );
}
export const FLAG_GRID = { cols: FLAG_COLS, rows: FLAG_ROWS };

export function MiniRing({ pct }) {
  const c = 2 * Math.PI * 18;
  return (
    <svg className="mini" viewBox="0 0 44 44" aria-hidden="true">
      <circle className="tr" cx="22" cy="22" r="18" />
      <circle className="fg" cx="22" cy="22" r="18" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}
