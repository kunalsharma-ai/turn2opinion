// Site-wide sound on/off, in the header next to the language button. Controls every sound on the site:
// arrival chime, reward notifications, live chat, the survey machine and the light/dark switch.
// The synthesiser (utils/sound.js) is only loaded when the visitor turns sound on, to play a short chime.
import { useEffect, useState } from 'react';
import { onSoundChange, setSoundPref, soundEnabled } from '../utils/soundPref.js';

export default function SoundButton({ className = '' }) {
  const [on, setOn] = useState(true);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    setOn(soundEnabled());
    return onSoundChange(setOn);
  }, []);
  const flip = () => {
    const next = !on;
    setSoundPref(next);
    setOn(next);
    setBump((n) => n + 1);
    if (next) import('../utils/sound.js').then((m) => m.playNotify()).catch(() => {});
  };
  return (
    <button
      type="button"
      className={`snd-btn ${on ? 'is-on' : 'is-off'} ${className}`}
      onClick={flip}
      aria-pressed={on}
      aria-label={on ? 'Site sounds are on. Turn sounds off' : 'Site sounds are off. Turn sounds on'}
      title={on ? 'Sound on' : 'Sound off'}
    >
      <span className="snd-orb" key={bump} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
          {on ? (
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path className="snd-w1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
              <path className="snd-w2" d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
            </g>
          ) : (
            <path d="M16 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </span>
      <span className="snd-eq" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
