// The moving background: three drifting colour blobs (their colours follow the section being read), a dotted grid
// that moves slower than the page, big outlines of the turn ring turning in the distance, and small bubbles rising.
// Fixed behind everything, pointer-events off, transform/opacity only, still under prefers-reduced-motion.
import { arc, pt, PARENT, TEEN } from './Turns.jsx';

const RINGS = [['r1', 360], ['r2', 240], ['r3', 520], ['r4', 180]];
const DOTS = Array.from({ length: 18 }, (_, i) => ({ x: (i * 37 + 11) % 100, s: 6 + ((i * 7) % 5) * 4, d: 16 + ((i * 5) % 9) * 3, t: -((i * 3.7) % 22), k: i % 3 }));
const [px, py] = pt(PARENT[1]);
const [tx, ty] = pt(TEEN[1]);

export default function Backdrop() {
  return (
    <div className="bg" aria-hidden="true">
      <i className="bg-b b1" /><i className="bg-b b2" /><i className="bg-b b3" />
      <i className="bg-grid" />
      {RINGS.map(([c, size]) => (
        <svg key={c} className={`bg-ring ${c}`} viewBox="0 0 200 200" width={size} height={size} focusable="false">
          <path d={arc(...PARENT)} /><path d={arc(...TEEN)} />
          <path className="hd" d="M-3 -11L13 0L-3 11Z" transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${PARENT[1]})`} />
          <path className="hd" d="M-3 -11L13 0L-3 11Z" transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) rotate(${TEEN[1]})`} />
        </svg>
      ))}
      {DOTS.map((d, i) => <i key={i} className={`bg-dot k${d.k}`} style={{ '--x': `${d.x}%`, '--s': `${d.s}px`, '--d': `${d.d}s`, '--t': `${d.t}s` }} />)}
    </div>
  );
}
