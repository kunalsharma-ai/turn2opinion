// A small 3D scene made with CSS transforms only: the Turn2Opinion mark as a spinning coin, two tilted orbits of
// country flags that circle it, and floating opinion bubbles. The scene leans towards the pointer (parallax);
// clicking the coin plays a chime. Decorative — nothing here carries information.
import { useRef } from 'react';
import Flag from './Flag.jsx';
import Icon from './Icons.jsx';
import { asset } from '../assets.js';
import { play } from '../sound.js';

const ORBIT_A = ['in', 'us', 'gb', 'au', 'ca', 'de'];
const ORBIT_B = ['br', 'jp', 'ae', 'sg', 'za', 'fr'];
const BUBBLES = [['heart', 'b1'], ['spark', 'b2'], ['hand', 'b3'], ['bell', 'b4']];

export default function Hero3D({ home }) {
  const scene = useRef(null);
  const raf = useRef(0);
  const flagsA = home ? [home.toLowerCase(), ...ORBIT_A.filter((c) => c !== home.toLowerCase()).slice(0, 5)] : ORBIT_A;
  const move = (e) => {
    const el = scene.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.parentElement.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => { el.style.setProperty('--ry', `${(x * 26).toFixed(1)}deg`); el.style.setProperty('--rx', `${(-y * 20).toFixed(1)}deg`); });
  };
  const leave = () => { const el = scene.current; if (el) { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); } };
  const mark = asset('brand/t2o-mark.webp');
  return (
    <div className="h3" aria-hidden="true" onPointerMove={move} onPointerLeave={leave}>
      <div className="h3-glow" />
      <div className="h3-scene" ref={scene}>
        <div className="h3-orbit oa">{flagsA.map((c, i) => <span className="h3-chip" key={c} style={{ '--a': `${i * 60}deg`, '--R': '168px', '--T': '-70deg' }}><Flag cc={c} /></span>)}</div>
        <div className="h3-orbit ob">{ORBIT_B.map((c, i) => <span className="h3-chip" key={c} style={{ '--a': `${i * 60 + 30}deg`, '--R': '124px', '--T': '70deg' }}><Flag cc={c} /></span>)}</div>
        <button type="button" tabIndex={-1} className="h3-coin" onClick={() => play('coin')}>
          {Array.from({ length: 9 }, (_, i) => <i className="slab" key={i} style={{ transform: `translateZ(${(i - 4) * 2.4}px)` }} />)}
          <img className="face f" src={mark} alt="" width="120" height="120" />
          <img className="face b" src={mark} alt="" width="120" height="120" />
        </button>
        {BUBBLES.map(([n, c]) => <span className={`h3-bub ${c}`} key={c}><Icon name={n} size={20} decorative /></span>)}
      </div>
    </div>
  );
}
