// Turn2Opinion brand mark — the circular arrows around the "2" (same drawing as the main website's mark), as SVG.
// `spin` turns the arrows slowly. Decorative unless `title` is given (then role="img" + aria-label).
import { useId } from 'react';

export default function T2OMark({ size = 48, title, className = '', spin = false }) {
  const id = `t2om${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`t2o-mark ${spin ? 'is-spinning' : ''} ${className}`} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' })}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e7efff" /></linearGradient>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7cc8ff" /><stop offset=".55" stopColor="#1f5bff" /><stop offset="1" stopColor="#0e1b4d" /></linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d7bff" /><stop offset="1" stopColor="#0e1b4d" /></linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${id}b)`} />
      <g className="t2o-arrows">
        <path d="M14 26 A19 19 0 0 1 44 15" fill="none" stroke={`url(#${id}a)`} strokeWidth="5" strokeLinecap="round" />
        <path d="M45.5 9.5 L47.5 18.5 L38.5 18" fill={`url(#${id}a)`} />
        <path d="M50 38 A19 19 0 0 1 20 49" fill="none" stroke={`url(#${id}a)`} strokeWidth="5" strokeLinecap="round" />
        <path d="M18.5 54.5 L16.5 45.5 L25.5 46" fill={`url(#${id}a)`} />
      </g>
      <text x="32" y="43" textAnchor="middle" fontFamily="Manrope, Arial, sans-serif" fontWeight="800" fontSize="32" fill={`url(#${id}t)`}>2</text>
    </svg>
  );
}
