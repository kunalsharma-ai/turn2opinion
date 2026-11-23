
/* Stroke icon from the inline sprite (see lib/icons.js). */
export function Icon({ n, className }) {
  return (
    <svg className={'i' + (className ? ' ' + className : '')} aria-hidden="true" focusable="false">
      <use href={`#i-${n}`} />
    </svg>
  );
}

/* Country flags are not used in the member area. */
export function Flag() {
  return null;
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
