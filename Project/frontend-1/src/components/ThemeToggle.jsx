// Footer light / dark switch: a little sky. Day shows the sun and drifting clouds, night shows the moon
// and twinkling stars; the knob rolls across, the page changes with a circular reveal from the switch,
// a burst of stars (or sun rays) and a sound (see utils/mode.js and playMode in utils/sound.js).
import { useEffect, useRef, useState } from 'react';
import { getMode, setMode } from '../utils/mode.js';

export default function ThemeToggle() {
  const [mode, setM] = useState('light');
  const btn = useRef(null);
  useEffect(() => {
    setM(getMode());
    const h = (e) => setM(e.detail);
    window.addEventListener('t2o:mode', h);
    return () => window.removeEventListener('t2o:mode', h);
  }, []);
  const dark = mode === 'dark';
  const flip = () => setMode(dark ? 'light' : 'dark', btn.current);
  return (
    <div className="tt-wrap">
      <span className="tt-label" aria-hidden="true">
        {dark ? 'Night mode' : 'Day mode'}
      </span>
      <button
        ref={btn}
        type="button"
        className={`tt-sky ${dark ? 'is-dark' : 'is-light'}`}
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        onClick={flip}
      >
        <span className="tt-stars" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
        <span className="tt-clouds" aria-hidden="true">
          <i />
          <i />
        </span>
        <span className="tt-word tt-word--light" aria-hidden="true">
          Light
        </span>
        <span className="tt-word tt-word--dark" aria-hidden="true">
          Dark
        </span>
        <span className="tt-knob" aria-hidden="true">
          <span className="tt-sun" />
          <span className="tt-moon">
            <i />
            <i />
            <i />
          </span>
        </span>
      </button>
    </div>
  );
}
