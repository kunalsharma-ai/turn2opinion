import { asset, ENV } from '../config/env.js';
import { COUNTRIES } from '../data/countries.js';
import { Link } from '../router/Router.jsx';
import { useMounted } from '../hooks/useMounted.js';

// English country names for flag alt text. Taken from our own country list rather than
// Intl.DisplayNames, whose names differ between Node and browsers ("Hong Kong SAR China" vs
// "Hong Kong") and would make the prerendered HTML disagree with the hydrated page.
let REGION_NAMES = null;
function regionName(code) {
  if (!REGION_NAMES) {
    REGION_NAMES = { EU: 'the European Union', UN: 'the United Nations' };
    for (const c of COUNTRIES) REGION_NAMES[c.c] = c.n;
  }
  const k = code.toUpperCase();
  return REGION_NAMES[k] || k;
}

/**
 * Country flag from /public/flags (flag-icons, MIT).
 *
 * Every flag carries alt text: `title` when given (the country or place it stands for), otherwise
 * the English country name looked up from its code. Images without alt text count against the
 * page in SEO audits and image search, so none are left empty.
 */
export function Flag({ code, size = 20, className = '', title }) {
  if (!code) return null;
  const c = String(code).toLowerCase();
  return (
    <img
      className={`flag ${className}`}
      src={asset(`/flags/${c}.svg`)}
      width={Math.round(size * 1.333)}
      height={size}
      alt={`Flag of ${title || regionName(c)}`}
      loading="lazy"
      decoding="async"
    />
  );
}

// CSS url() inside a custom property resolves against the stylesheet, so relative bases (e.g. './') need an
// absolute URL. That URL is only known in the browser, so with a relative base the mask is applied after mount
// (prerendered HTML can't be patched during hydration). With the normal '/' base it's rendered straight away.
const RELATIVE_BASE = ENV.BASE_URL.startsWith('.');
function useCssUrl(src) {
  const mounted = useMounted();
  if (!RELATIVE_BASE) return `url(${src})`;
  return mounted ? `url(${new URL(src, document.baseURI).href})` : undefined;
}

/** Animated Turn2Opinion logo: rotating light-arc halo + ripples behind the "2" emblem and a periodic light sweep. */
export function Logo({ size = 'md', to = '/', eager = false }) {
  const w = size === 'lg' ? 300 : size === 'sm' ? 140 : 168;
  const h = Math.round((w * 379) / 1241);
  const src320 = asset('/images/brand/turn2opinion-logo-320.webp');
  const src640 = asset('/images/brand/turn2opinion-logo-640.webp');
  const mask = useCssUrl(src640);
  return (
    <Link to={to} className={`logo logo-${size}`} aria-label="Turn2Opinion home">
      <span className="logo-stage" style={{ width: w, height: h, '--logo-mask': mask }}>
        <span className="logo-halo" aria-hidden="true">
          <span className="logo-halo-ring" />
          <span className="logo-ripple r1" />
          <span className="logo-ripple r2" />
        </span>
        <img
          src={src320}
          srcSet={`${src320} 320w, ${src640} 640w`}
          sizes={`${w}px`}
          width={w}
          height={h}
          alt="Turn2Opinion"
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
        />
        <span className="logo-shine" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * Turn2Opinion brand mark (the circular-arrows "2") as animated SVG – used for the chat avatar and footer.
 * Arrows rotate slowly, the "2" breathes. Decorative unless `title` is given.
 */
export function T2OMark({ size = 48, title, className = '', spin = true }) {
  const id = `t2o-${size}`;
  // Three stacked layers rather than one SVG: the turning arrows and the breathing "2" are their own
  // <svg> elements, so the browser animates them on the compositor. Animating shapes inside a single
  // SVG runs on the main thread every frame, and this mark is on screen on every page (chat button).
  return (
    <span
      className={`t2o-mark ${spin ? 'is-spinning' : ''} ${className}`}
      style={{ width: size, height: size }}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e7efff" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill={`url(#${id}-bg)`} />
      </svg>
      <svg className="t2o-arrows" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-arc`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7cc8ff" />
            <stop offset=".55" stopColor="#1f5bff" />
            <stop offset="1" stopColor="#0e1b4d" />
          </linearGradient>
        </defs>
        <path d="M14 26 A19 19 0 0 1 44 15" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="5" strokeLinecap="round" />
        <path d="M45.5 9.5 L47.5 18.5 L38.5 18" fill={`url(#${id}-arc)`} />
        <path d="M50 38 A19 19 0 0 1 20 49" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="5" strokeLinecap="round" />
        <path d="M18.5 54.5 L16.5 45.5 L25.5 46" fill={`url(#${id}-arc)`} />
      </svg>
      <svg className="t2o-two" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-two`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3d7bff" />
            <stop offset="1" stopColor="#0e1b4d" />
          </linearGradient>
        </defs>
        <text x="32" y="43" textAnchor="middle" fontFamily="Manrope, Arial, sans-serif" fontWeight="800" fontSize="32" fill={`url(#${id}-two)`}>
          2
        </text>
      </svg>
    </span>
  );
}

/** Frequent Research logo with float, light sweep and a rotating certification ring. */
export function FrLogo({ width = 150, className = '' }) {
  const src = asset('/images/brand/frequent-research-logo.webp');
  const mask = useCssUrl(src);
  return (
    <span className={`fr-logo ${className}`} style={{ width }}>
      <span className="fr-ring" aria-hidden="true" />
      <img src={src} alt="Frequent Research Fieldwork Solutions Private Limited" width={width} height={Math.round((width * 2) / 3)} loading="lazy" />
      <span className="fr-shine" aria-hidden="true" style={{ '--fr-mask': mask }} />
    </span>
  );
}
