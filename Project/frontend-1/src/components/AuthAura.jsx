// Shared look for Log in and Create account (Kunal, 18 Nov 2026): the same two palettes as the home hero.
// Consumers get the ocean blue (#1f5bff -> #22b8ff), professionals the midnight amethyst with gold.
// Everything here is decorative CSS (aria-hidden), and all motion stops under prefers-reduced-motion.
import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { Flag, T2OMark } from './Brand.jsx';
import { TESTIMONIALS } from '../data/testimonials.js';
import GemScore from './rating/GemScore.jsx';
import { playAudience } from '../utils/sound.js';

const KEY = 't2o_aud';
export function readAud() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'pro' || v === 'minor' ? v : 'consumer';
  } catch {
    return 'consumer';
  }
}
export function saveAud(v) {
  try {
    localStorage.setItem(KEY, v === 'pro' || v === 'minor' ? v : 'consumer');
  } catch {
    /* private mode */
  }
}

/** Glowing aurora, starfield and floating 3D tokens behind the auth pages. */
export function AuthAura({ aud }) {
  return (
    <div className={`auth-aura is-${aud}`} aria-hidden="true">
      <i className="aa-blob a1" />
      <i className="aa-blob a2" />
      <i className="aa-blob a3" />
      <i className="aa-beam" />
      <span className="aa-stars">
        {Array.from({ length: 14 }).map((_, k) => (
          <i key={k} style={{ '--k': k }} />
        ))}
      </span>
      <span className="aa-token t-coin">
        <T2OMark size={30} spin={false} />
      </span>
      <span className="aa-token t-check">
        <Icon name="check" size={18} strokeWidth={3} />
      </span>
      <span className="aa-token t-gift">
        <Icon name="gift" size={20} />
      </span>
      <span className="aa-token t-gem" />
      {aud === 'minor' && (
        <span className="aa-neon">
          <span className="aa-floor" />
          {['tri', 'ring', 'plus', 'zig', 'tri', 'ring', 'plus', 'zig'].map((s, k) => (
            <i key={k} className={`n-${s}`} style={{ '--k': k }} />
          ))}
        </span>
      )}
    </div>
  );
}

/** Consumer / Professional / Teen switch. It recolours the page and is remembered for next time. */
export function AudSwitch({ value, onChange, label = 'I am a' }) {
  return (
    <div className={`auth-switch is-${value}`} role="radiogroup" aria-label={label}>
      <span className="as-knob" aria-hidden="true" />
      {[
        ['consumer', 'Consumer', 'users'],
        ['pro', 'Professional', 'briefcase'],
        ['minor', 'Teen', 'sparkles']
      ].map(([k, l, ic]) => (
        <button key={k} type="button" role="radio" aria-checked={value === k} className={value === k ? 'is-on' : ''} onClick={() => {
            if (k !== value) playAudience(k);
            onChange(k);
          }}>
          <Icon name={ic} size={16} /> {l}
        </button>
      ))}
    </div>
  );
}

const VOICES = {
  consumer: ['maya-us', 'olivia-bennett-gb', 'mariana-costa-br'],
  pro: ['rahul-mehta-in', 'yuki-nakamura-jp', 'sophie-weber-de']
};
const firstSentence = (t = '') => {
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};

// The teen panel is new, so there are no teen reviews yet: the Minor side shows our promises instead.
const TEEN_PROMISES = [
  ['A parent’s yes never replaces yours.', 'Teen panel promise'],
  ['Skip any question. Leave any survey. No penalty, ever.', 'Teen panel promise'],
  ['Every study is checked for your age before it reaches you.', 'Teen panel promise']
];

function TeenPromise() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % TEEN_PROMISES.length), 5200);
    return () => clearInterval(t);
  }, []);
  const [line, who] = TEEN_PROMISES[i];
  return (
    <figure className="auth-voice is-minor" key={`teen-${i}`}>
      <span className="av-q" aria-hidden="true">
        ✦
      </span>
      <blockquote>{line}</blockquote>
      <figcaption>
        <Icon name="shield" size={15} /> <b>{who}</b>
        <span>Ages 13–17</span>
      </figcaption>
      <span className="av-dots" aria-hidden="true">
        {TEEN_PROMISES.map((_, k) => (
          <i key={k} className={k === i ? 'is-on' : ''} />
        ))}
      </span>
    </figure>
  );
}

/** One genuine member review at a time, matched to the chosen side. */
export function AuthVoice({ aud }) {
  if (aud === 'minor') return <TeenPromise />;
  return <MemberVoice aud={aud} />;
}

function MemberVoice({ aud }) {
  const ids = VOICES[aud] || VOICES.consumer;
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % ids.length), 6500);
    return () => clearInterval(t);
  }, [aud]); // eslint-disable-line react-hooks/exhaustive-deps
  const r = TESTIMONIALS.find((x) => x.id === ids[i % ids.length]);
  if (!r) return null;
  return (
    <figure className="auth-voice" key={`${aud}-${r.id}`}>
      <span className="av-q" aria-hidden="true">
        “
      </span>
      <blockquote>{firstSentence(r.text)}</blockquote>
      <figcaption>
        <Flag code={r.country} size={16} /> <b>{r.name}</b>
        {r.role && r.role !== 'Member' ? <span>{r.role}</span> : null}
        {r.rating ? (
          <GemScore rating={r.rating} size={16} className="av-stars" />
        ) : null}
      </figcaption>
      <span className="av-dots" aria-hidden="true">
        {ids.map((id, k) => (
          <i key={id} className={k === i % ids.length ? 'is-on' : ''} />
        ))}
      </span>
    </figure>
  );
}
