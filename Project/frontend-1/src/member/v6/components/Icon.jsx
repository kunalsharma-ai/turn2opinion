import { asset } from '../../../config/env.js';


/* Stroke icon from the inline sprite (see lib/icons.js). */
export function Icon({ n, className }) {
  return (
    <svg className={'i' + (className ? ' ' + className : '')} aria-hidden="true" focusable="false">
      <use href={`#i-${n}`} />
    </svg>
  );
}

/* Country flag (public/flags/<cc>.svg, the same files the site header uses; Windows has no flag emoji). */
export function Flag({ cc, className }) {
  if (!cc || !/^[A-Za-z]{2}$/.test(String(cc))) return null;
  return <img className={'flag6' + (className ? ' ' + className : '')} src={asset(`/flags/${String(cc).toLowerCase()}.svg`)} width="20" height="15" alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}

export function MiniRing({ pct }) {
  const c = 2 * Math.PI * 18;
  return (
    <svg className="mini" viewBox="0 0 44 44" aria-hidden="true">
      <circle className="tr" cx="22" cy="22" r="18" />
      <circle className="fg" cx="22" cy="22" r="18" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}
