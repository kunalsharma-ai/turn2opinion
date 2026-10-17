// Signature visuals: the 3-step pipeline and the topics bento.
import { useEffect, useState } from 'react';
import { Link } from '../../router/Router.jsx';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import Icon from '../Icon.jsx';
import { asset } from '../../config/env.js';

const STEPS = [
  { t: 'Sign up free', d: 'Register with an active email and phone number, then verify both with a link and an OTP.', icon: 'user', color: '#49B6FF' },
  { t: 'Share your opinion', d: 'Complete your profile, get matched invitations and answer honestly – on mobile or desktop.', icon: 'chat', color: '#7B5CFF' },
  { t: 'Get rewarded', d: 'Reach your threshold and redeem through PayPal, wire transfer or Amazon gift cards – plus UPI in India.', icon: 'gift', color: '#FFB020' }
];

export function StepsPipeline() {
  return (
    <div className="pipeline">
      <svg className="pipeline-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="pl" x1="0" x2="1">
            <stop offset="0" stopColor="#49B6FF" />
            <stop offset=".5" stopColor="#7B5CFF" />
            <stop offset="1" stopColor="#FFB020" />
          </linearGradient>
        </defs>
        <path d="M20 60 C 200 -10, 300 130, 500 60 S 800 -10, 980 60" fill="none" stroke="url(#pl)" strokeWidth="4" strokeLinecap="round" className="pl-base" />
        <path d="M20 60 C 200 -10, 300 130, 500 60 S 800 -10, 980 60" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" className="pl-pulse" />
      </svg>
      <ol className="pipeline-steps">
        {STEPS.map((s, i) => (
          <li key={s.t} style={{ '--c': s.color, '--i': i }} data-reveal>
            <span className="pipe-node">
              <Icon name={s.icon} size={28} />
              <span className="pipe-n">{i + 1}</span>
            </span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const TOPICS = [
  { t: 'Shopping habits', d: 'Brands, stores and what makes you buy.', q: 'What made you pick that brand last time?', img: 'shopper', icons: ['bag', 'star', 'coin'], c: '#FF5C7A' },
  { t: 'Technology & apps', d: 'Devices, software and AI tools.', q: 'Which app could you not live without?', img: 'tech-user', icons: ['phone', 'chip', 'bolt'], c: '#1F5BFF' },
  { t: 'Food & lifestyle', d: 'Restaurants, recipes and everyday choices.', q: 'Takeaway or cooking at home tonight?', img: 'foodie', icons: ['cup', 'heart', 'star'], c: '#FFB020' },
  { t: 'Travel', d: 'Trips, airlines and hotels.', q: 'Window seat or aisle?', img: 'traveller', icons: ['plane', 'map', 'globe'], c: '#49B6FF' },
  { t: 'Entertainment', d: 'Movies, shows, games and music.', q: 'What are you binge-watching right now?', img: 'gamer', icons: ['game', 'play', 'sparkles'], c: '#7B5CFF' },
  { t: 'Health & wellness', d: 'Care, fitness and wellbeing.', q: 'How do you keep track of your fitness?', img: 'health', icons: ['pulse', 'heart', 'leaf'], c: '#12C29B' },
  { t: 'Business & B2B', d: 'Tools, vendors and decisions at work.', q: 'Who signs off new software at your company?', img: 'business', icons: ['briefcase', 'chip', 'users'], c: '#3A4FD8' },
  { t: 'Money & finance', d: 'Banking, payments and investing.', q: 'How do you prefer to pay online?', img: 'finance', icons: ['bank', 'wallet', 'coin'], c: '#0E9F6E' }
];

const SUBS = {
  'Shopping habits': ['New brands', 'Online vs in-store', 'Deals & loyalty', 'Packaging'],
  'Technology & apps': ['Smartphones', 'AI assistants', 'Streaming apps', 'Smart home'],
  'Food & lifestyle': ['Snacks', 'Restaurants', 'Delivery apps', 'Home cooking'],
  Travel: ['Airlines', 'Hotels', 'Booking sites', 'Holiday plans'],
  Entertainment: ['Movies & series', 'Gaming', 'Music', 'Sport'],
  'Health & wellness': ['Fitness', 'Pharmacy', 'Insurance', 'Sleep'],
  'Business & B2B': ['Software buying', 'Suppliers', 'Hiring', 'Cloud & security'],
  'Money & finance': ['Banking apps', 'Payments', 'Investing', 'Credit cards']
};

/** Topics as a rolling fan of cards: the deck turns to the chosen topic, a polaroid shows who answers and what they're asked. */
export function TopicsBento() {
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (!inView || hold || prefersReducedMotion()) return undefined;
    const id = setTimeout(() => setCur((n) => (n + 1) % TOPICS.length), 4200);
    return () => clearTimeout(id);
  }, [cur, inView, hold]);
  const t = TOPICS[cur];
  return (
    <div className="fan" ref={ref} style={{ '--c': t.c }} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="fan-deck" role="group" aria-label="Survey topics">
        {TOPICS.map((x, i) => {
          let off = i - cur;
          if (off > TOPICS.length / 2) off -= TOPICS.length;
          if (off < -TOPICS.length / 2) off += TOPICS.length;
          return (
            <button
              key={x.t}
              type="button"
              className={`fan-card ${i === cur ? 'is-on' : ''}`}
              style={{ '--off': off, '--c': x.c, '--abs': Math.abs(off) }}
              aria-pressed={i === cur}
              onClick={() => setCur(i)}
              onFocus={() => setCur(i)}
            >
              <span className="fan-icon">
                <Icon name={x.icons[0]} size={22} />
              </span>
              <img src={asset(`/images/people/${x.img}.svg`)} alt="" width="120" height="140" loading="lazy" decoding="async" />
              <strong>{x.t}</strong>
            </button>
          );
        })}
      </div>

      <div className="fan-stage" key={cur} aria-live="polite">
        <figure className="polaroid" aria-hidden="true">
          <span className="tape" />
          <span className="polaroid-pic">
            {x3(t.icons).map((ic, k) => (
              <span key={k} className={`pp-ico k${k}`}>
                <Icon name={ic} size={18} />
              </span>
            ))}
            <img src={asset(`/images/people/${t.img}.svg`)} alt="" width="200" height="240" />
          </span>
          <figcaption>“{t.q}”</figcaption>
        </figure>
        <div className="fan-copy">
          <p className="fan-count">
            {String(cur + 1).padStart(2, '0')} <span>/ {String(TOPICS.length).padStart(2, '0')}</span>
          </p>
          <h3>{t.t}</h3>
          <p>{t.d}</p>
          <ul className="fan-subs">
            {(SUBS[t.t] || []).map((x, k) => (
              <li key={x} style={{ '--k': k }}>
                {x}
              </li>
            ))}
          </ul>
          <Link to="/paid-surveys/" className="btn btn-primary">
            See {t.t.toLowerCase()} surveys <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
const x3 = (a) => a.slice(0, 3);
