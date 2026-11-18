// "Browse a few of our paid surveys" as a survey vending machine: pick consumer or professional, press a slot
// (or let it pick for you) and the survey card spirals off its coil into the tray with its reward and length.
// Data: src/data/surveys.js. All survey titles, rewards and lengths are real text in the HTML.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../../router/Router.jsx';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { SURVEYS, SURVEY_NOTE } from '../../data/surveys.js';
import Icon from '../Icon.jsx';
import { playCoin, playSwitch, playVend, setSoundEnabled, soundEnabled } from '../../utils/sound.js';

/** Speaker switch for the machine's sounds (shares the site-wide sound setting). */
function SoundSwitch() {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(soundEnabled()), []);
  const flip = () => {
    const next = !on;
    setSoundEnabled(next);
    setOn(next);
    if (next) playCoin();
  };
  return (
    <button type="button" className={`vm-snd${on ? ' is-on' : ''}`} onClick={flip} aria-pressed={on} aria-label={on ? 'Machine sounds on. Turn off' : 'Machine sounds off. Turn on'} title={on ? 'Sound on' : 'Sound off'}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        {on ? (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
            <path d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
          </g>
        ) : (
          <path d="M16 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      <span className="vm-snd__eq" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

const code = (i) => String(i + 1).padStart(2, '0');

export default function SurveyMachine() {
  const [aud, setAud] = useState('consumer');
  const [sel, setSel] = useState(0);
  const [drop, setDrop] = useState(0); // bumps on every vend so the tray animation replays
  const [held, setHeld] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.25 });
  const tray = useRef(null);
  const list = SURVEYS[aud];
  const s = list[sel % list.length];

  useEffect(() => {
    if (held || !inView || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => {
      setSel((n) => (n + 1 + Math.floor(Math.random() * 3)) % list.length);
      setDrop((d) => d + 1);
    }, 3800);
    return () => clearTimeout(t);
  }, [sel, held, inView, list.length]);

  const vend = (i) => {
    playVend(i);
    setHeld(true);
    setSel(i);
    setDrop((d) => d + 1);
    // On phones the tray sits above the slots: bring the picked survey into view.
    if (typeof window !== 'undefined' && window.innerWidth < 900 && tray.current) {
      tray.current.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    }
  };
  const switchAud = (a) => {
    if (a !== aud) playSwitch(a === 'professional');
    setAud(a);
    setSel(0);
    setDrop((d) => d + 1);
  };
  const range = useMemo(() => {
    const r = list.map((x) => x.reward);
    return [Math.min(...r), Math.max(...r)];
  }, [list]);

  return (
    <div className={`vm vm-${aud} ${inView ? 'is-in' : ''}`} ref={ref} style={{ '--sc': s.c }}>
      <div className="vm-sign">
        <span className="vm-bulbs" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </span>
        <p className="vm-title">
          <Icon name="coin" size={22} /> Paid survey machine
        </p>
        <div className="vm-switch" role="group" aria-label="Show surveys for">
          {[
            ['consumer', 'Consumers', 'bag'],
            ['professional', 'Professionals', 'briefcase']
          ].map(([k, l, ic]) => (
            <button key={k} type="button" aria-pressed={aud === k} className={aud === k ? 'is-on' : ''} onClick={() => switchAud(k)}>
              <Icon name={ic} size={16} /> {l}
              <small>{SURVEYS[k].length}</small>
            </button>
          ))}
        </div>
        <SoundSwitch />
      </div>

      <div className="vm-body">
        <div className="vm-glass">
          <span className="vm-shine" aria-hidden="true" />
          <ul className="vm-grid" key={aud} aria-label={`${aud === 'consumer' ? 'Consumer' : 'Professional'} paid surveys`}>
            {list.map((x, i) => (
              <li key={x.id} style={{ '--c': x.c, '--i': i }}>
                <button type="button" className={`vm-slot ${i === sel % list.length ? 'is-on' : ''}`} aria-pressed={i === sel % list.length} onClick={() => vend(i)}>
                  <span className="vm-item">
                    <span className="vm-ico">
                      <Icon name={x.icon} size={22} />
                    </span>
                    <span className="vm-name">{x.title}</span>
                  </span>
                  <span className="vm-coil" aria-hidden="true" />
                  <span className="vm-tag">
                    <b>${x.reward}</b>
                    <small>
                      <Icon name="clock" size={10} /> {x.mins}m
                    </small>
                  </span>
                  <span className="vm-code" aria-hidden="true">
                    {code(i)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <aside className="vm-panel" aria-live="polite">
          <button type="button" className="vm-lcd" onClick={() => vend((sel + 1 + Math.floor(Math.random() * 3)) % list.length)} aria-label="Pick a survey for me">
            <span className="lcd-code">{code(sel % list.length)}</span>
            <span className="lcd-price">${s.reward.toFixed(2)}</span>
            <span className="lcd-run">
              <i key={s.id}>
                {s.cat} · {s.mins} min · {s.title}
              </i>
            </span>
          </button>
          <div className="vm-coins" aria-hidden="true" key={`c-${drop}`}>
            <span className="vm-slotline" />
            <i className="vm-coin">$</i>
          </div>
          <p className="vm-range">
            {aud === 'consumer' ? 'Consumer' : 'Professional'} surveys from <b>${range[0]}</b> to <b>${range[1]}</b>
          </p>
          <div className="vm-tray" ref={tray}>
            <div className="vm-card" key={`${aud}-${s.id}-${drop}`} style={{ '--c': s.c }}>
              <span className="vc-top">
                <span className="vc-ico">
                  <Icon name={s.icon} size={24} />
                </span>
                <span className="vc-cat">{s.cat}</span>
                <span className="vc-reward">${s.reward}</span>
              </span>
              <strong className="vc-title">{s.title}</strong>
              <span className="vc-desc">{s.desc}</span>
              <span className="vc-meta">
                <span>
                  <Icon name="clock" size={13} /> {s.mins} min
                </span>
                <span>
                  <Icon name="gift" size={13} /> Rewarded on completion
                </span>
              </span>
            </div>
          </div>
          <Link to="/join/" className="vm-cta" onClick={() => playCoin()}>
            Start earning – join free <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
      <p className="vm-note">
        <Icon name="sparkles" size={14} /> {SURVEY_NOTE}
      </p>
    </div>
  );
}
