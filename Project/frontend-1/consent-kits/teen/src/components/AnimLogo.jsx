// The Turn2Opinion logo, alive: a light dot circles the swirl around the "2", a soft shine sweeps across the
// letters (masked to the logo's own shape), the whole mark floats, and hovering or clicking it sparkles.
// Pure CSS transforms; everything stops under prefers-reduced-motion. The picture itself has the alt text.
import { useRef, useState } from 'react';
import { asset } from '../assets.js';
import { play, playAmbient } from '../sound.js';

export default function AnimLogo({ height = 40, className = '' }) {
  const [pop, setPop] = useState(0);
  const last = useRef(0);
  const src = asset('brand/turn2opinion-logo.webp');
  const hover = () => { const n = Date.now(); if (n - last.current > 2200) { last.current = n; playAmbient('sparkle'); } };
  return (
    <span className={`alogo ${className}`} style={{ '--lh': `${height}px`, '--mask': `url("${src}")` }} onPointerEnter={hover} onClick={() => { setPop((n) => n + 1); play('sparkle'); }}>
      <img src={src} alt="Turn2Opinion logo" width={Math.round(height * 3.29)} height={height} fetchPriority="high" />
      <i className="alogo-orbit" aria-hidden="true" />
      <i className="alogo-shine" aria-hidden="true" />
      {pop ? <span className="alogo-burst" key={pop} aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <b key={i} style={{ '--a': `${i * 36}deg`, '--d': `${26 + (i % 3) * 9}px` }} />)}</span> : null}
    </span>
  );
}
