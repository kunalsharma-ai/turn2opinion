// The one way a single rating is shown across the site (Kunal, 18 Nov 2026): a gem and its name,
// never stars or "4/5". Pebble 1 · Quartz 2 · Amber 3 · Sapphire 4 · Diamond 5.
import { levelOf } from '../../data/reviewFacets.js';
import Gem from './Gem.jsx';

export default function GemScore({ rating, size = 18, word = false, className = '', motion = 'still' }) {
  if (!rating) return null;
  const L = levelOf(rating);
  return (
    <span className={`gscore lv-${L.key} ${className}`} style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3 }} role="img" aria-label={`${L.gem} gem — ${L.word}`}>
      <Gem level={L.v} size={size} motion={motion} />
      <b aria-hidden="true">{L.gem}</b>
      {word && <small aria-hidden="true">{L.word}</small>}
    </span>
  );
}
