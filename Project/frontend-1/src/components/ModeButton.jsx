// Header light / dark switch, next to the sound button (inside the menu on phones). Same behaviour as the
// footer sky switch: circular reveal from the button, star or sun-ray burst and a sound (utils/mode.js).
import { useEffect, useState } from 'react';
import { getMode, setMode } from '../utils/mode.js';

export default function ModeButton({ className = '' }) {
  const [mode, setM] = useState('light');
  useEffect(() => {
    setM(getMode());
    const h = (e) => setM(e.detail);
    window.addEventListener('t2o:mode', h);
    return () => window.removeEventListener('t2o:mode', h);
  }, []);
  const dark = mode === 'dark';
  return (
    <button
      type="button"
      className={`mode-btn ${dark ? 'is-dark' : 'is-light'} ${className}`}
      onClick={(e) => setMode(dark ? 'light' : 'dark', e.currentTarget)}
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="mode-orb" aria-hidden="true">
        <svg className="mode-sun" viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="12" r="4.6" fill="currentColor" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="mode-moon" viewBox="0 0 24 24" width="18" height="18">
          <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6Z" fill="currentColor" />
        </svg>
        <i className="mode-tw" />
        <i className="mode-tw" />
      </span>
    </button>
  );
}
