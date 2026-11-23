// A country flag (SVG from public/flags, MIT licence). Always decorative: the country or language name is next to it.
import { asset } from '../assets.js';

export default function Flag({ cc, className = '' }) {
  if (!cc) return null;
  return <img className={`flag ${className}`} src={asset(`flags/${String(cc).toLowerCase()}.svg`)} alt="" aria-hidden="true" width="24" height="18" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = 'none'; }} />;
}
