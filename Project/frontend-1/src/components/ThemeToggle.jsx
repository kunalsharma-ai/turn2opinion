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
    <div className={`tt-wrap ${dark ? 'is-dark' : 'is-light'}`}>
      <span className="tt-title">Theme</span>
      <div className="tt-seg" role="group" aria-label="Colour theme">
        <button type="button" aria-pressed={!dark} onClick={(e) => dark && setMode('light', e.currentTarget)}>
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Light
        </button>
        <button type="button" aria-pressed={dark} onClick={(e) => !dark && setMode('dark', e.currentTarget)}>
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor" /></svg>
          Dark
        </button>
      </div>
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
