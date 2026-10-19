// Home "Quick answers": a question rail on one side, an illustrated helper on the other whose speech bubble
// reveals the answer word by word. Cycles on its own until someone picks a question. Every answer stays in the
// HTML (inactive panels are only hidden), so search engines and screen readers get the full text.
import { useEffect, useState } from 'react';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { asset } from '../../config/env.js';
import Icon from '../Icon.jsx';
import WordSplit from '../WordSplit.jsx';

const TONES = ['#1F5BFF', '#FF4F7B', '#12A594', '#F08C00', '#7B5CFF', '#0EA5E9'];
const ICONS = ['user', 'wallet', 'gift', 'briefcase', 'mail', 'chat'];

export default function QuickAnswers({ items, idPrefix = 'qa' }) {
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.35 });
  useEffect(() => {
    if (held || !inView || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setOn((n) => (n + 1) % items.length), 7000);
    return () => clearTimeout(t);
  }, [on, held, inView, items.length]);
  const pick = (i) => {
    setHeld(true);
    setOn(i);
  };
  const onKey = (e, i) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    pick(n);
    const el = document.getElementById(`${idPrefix}-tab-${n}`);
    el && el.focus();
  };
  const tone = TONES[on % TONES.length];
  return (
    <div className="qa" ref={ref} style={{ '--qc': tone }}>
      <div className="qa-rail" role="tablist" aria-orientation="vertical" aria-label="Questions">
        {items.map((it, i) => (
          <button
            key={it.q}
            id={`${idPrefix}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === on}
            aria-controls={`${idPrefix}-panel-${i}`}
            tabIndex={i === on ? 0 : -1}
            className={i === on ? 'is-on' : ''}
            style={{ '--c': TONES[i % TONES.length], '--i': i }}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="qr-ico">
              <Icon name={ICONS[i % ICONS.length]} size={18} />
            </span>
            <span className="qr-q">{it.q}</span>
            {i === on && !held && <span className="qr-timer" aria-hidden="true" key={`t-${on}`} />}
          </button>
        ))}
      </div>
      <div className="qa-stage">
        <span className="qa-orbs" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <img className="qa-peep" src={asset('/images/people/tech-user.svg')} alt="Illustration of a panel member reading answers to common questions on a laptop" width="220" height="260" loading="lazy" />
        {items.map((it, i) => (
          <div key={it.q} id={`${idPrefix}-panel-${i}`} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${i}`} hidden={i !== on} className="qa-bubble">
            <span className="qa-quote" aria-hidden="true">
              <Icon name="quote" size={22} />
            </span>
            <h3>{it.q}</h3>
            <p>
              <WordSplit text={it.a} varName="--k" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
