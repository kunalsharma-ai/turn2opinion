/* CHANGE-16 · Animated Turn2Opinion logo (inline SVG, no image request).
   "Turn" · swirl ring around the "2" · "Opinion" · ".com", matching the brand artwork (navy wordmark,
   blue gradient swirl). The ring turns slowly, a light sweep crosses the wordmark every few seconds and the
   "2" breathes; everything stops with prefers-reduced-motion. textLength keeps the width identical whether
   or not the Manrope font has loaded (no layout shift). */
import { useId } from 'react';

export default function Logo({ size = 40, compact = false, title = 'Turn2Opinion.com' }) {
  const id = useId().replace(/:/g, '');
  const w = compact ? 64 : 426;
  return (
    <svg className={'t2o-logo' + (compact ? ' compact' : '')} viewBox={`0 0 ${w} 64`} height={size} width={size * w / 64} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`g2${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5fd0ff" /><stop offset=".55" stopColor="#1f5eff" /><stop offset="1" stopColor="#0b2fa8" /></linearGradient>
        <linearGradient id={`gr${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0b3bd6" /><stop offset=".5" stopColor="#3d8bff" /><stop offset="1" stopColor="#9fe3ff" /></linearGradient>
        <linearGradient id={`sh${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <clipPath id={`cl${id}`}><rect x="0" y="0" width={w} height="64" /></clipPath>
        {!compact && <mask id={`mk${id}`}><rect x="0" y="0" width={w} height="64" fill="#000" />
          <text className="lg-m" x="0" y="47" textLength="102" lengthAdjust="spacingAndGlyphs" fill="#fff">Turn</text>
          <text className="lg-m" x="168" y="47" textLength="178" lengthAdjust="spacingAndGlyphs" fill="#fff">Opinion</text>
          <text className="lg-m sm" x="350" y="47" textLength="72" lengthAdjust="spacingAndGlyphs" fill="#fff">.com</text></mask>}
      </defs>
      <g clipPath={`url(#cl${id})`}>
        {!compact && <text className="lg-word" x="0" y="47" textLength="102" lengthAdjust="spacingAndGlyphs">Turn</text>}
        <g transform={compact ? 'translate(32 32)' : 'translate(136 32)'}>
          <g className="lg-ring">
            <path d="M-26 4a26 26 0 0 1 44 -22" fill="none" stroke={`url(#gr${id})`} strokeWidth="6" strokeLinecap="round" />
            <path d="M22 -24l-1 12l-11 -4z" fill="#3d8bff" />
            <path d="M26 -4a26 26 0 0 1 -44 22" fill="none" stroke={`url(#gr${id})`} strokeWidth="6" strokeLinecap="round" />
            <path d="M-22 24l1 -12l11 4z" fill="#1f5eff" />
          </g>
          <text className="lg-two" x="0" y="15" textAnchor="middle" fill={`url(#g2${id})`}>2</text>
        </g>
        {!compact && <>
          <text className="lg-word" x="168" y="47" textLength="178" lengthAdjust="spacingAndGlyphs">Opinion</text>
          <text className="lg-dot" x="350" y="47" textLength="72" lengthAdjust="spacingAndGlyphs">.com</text>
          <g mask={`url(#mk${id})`}><rect className="lg-shine" x="-60" y="0" width="46" height="64" fill={`url(#sh${id})`} /></g>
        </>}
      </g>
    </svg>
  );
}
