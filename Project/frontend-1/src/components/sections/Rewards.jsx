// Reward visuals: fanned 3D wallet of payout methods, the incentive "reward routes" carousel,
// the claim journey meter and survey-invitation channels.
import { useEffect, useState } from 'react';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import { METHOD_META, methodsFor } from '../../data/payouts.js';

export const METHODS = [
  { id: 'upi', name: 'UPI', text: 'Instant transfer to any UPI app linked to your Indian bank account.', arrive: 'Straight to your UPI ID', icon: 'phone', grad: 'linear-gradient(135deg,#0E7A4B,#12C29B)', indiaOnly: true },
  { id: 'paypal', name: 'PayPal', text: 'Lands in your PayPal balance – spend it or move it to your bank.', arrive: 'To your PayPal email', icon: 'wallet', grad: 'linear-gradient(135deg,#003087,#009CDE)' },
  { id: 'wire', name: 'Wire Transfer', text: 'Paid directly into your bank account.', arrive: 'To your bank account', icon: 'transfer', grad: 'linear-gradient(135deg,#3A1C71,#7B5CFF)' },
  { id: 'amazon', name: 'Amazon Gift Card', text: 'A gift card code you can spend on millions of products.', arrive: 'Code sent by email', icon: 'gift', grad: 'linear-gradient(135deg,#232F3E,#FF9900)' }
];

/** Country switch deals the payout cards that apply there: four for India (with UPI), three everywhere else. */
export function RewardWallet() {
  const [where, setWhere] = useState('IN');
  const [deal, setDeal] = useState(0);
  const cards = METHODS.filter((m) => where === 'IN' || !m.indiaOnly);
  const pickWhere = (w) => {
    setWhere(w);
    setDeal((d) => d + 1);
  };
  return (
    <div className="dealer">
      <div className="dealer-switch" role="group" aria-label="Where do you live?">
        <span className={`ds-thumb ${where === 'IN' ? '' : 'is-world'}`} aria-hidden="true" />
        <button type="button" aria-pressed={where === 'IN'} onClick={() => pickWhere('IN')}>
          <Flag code="IN" size={16} /> I live in India
        </button>
        <button type="button" aria-pressed={where !== 'IN'} onClick={() => pickWhere('WORLD')}>
          <Icon name="globe" size={16} /> Anywhere else
        </button>
      </div>
      <p className="dealer-sum" aria-live="polite">
        <b>{cards.length}</b> ways to get paid {where === 'IN' ? 'in India – including UPI' : 'in every other country we serve'}
      </p>
      <div className="dealer-table" key={deal}>
        {cards.map((m, i) => (
          <article key={m.id} className="pcard" style={{ '--i': i, '--g': m.grad, '--n': cards.length }}>
            <div className="pcard-in">
              <span className="pcard-chip" aria-hidden="true" />
              <span className="pcard-icon">
                <Icon name={m.icon} size={26} />
              </span>
              {m.indiaOnly && (
                <span className="pcard-tag">
                  <Flag code="IN" size={12} /> India only
                </span>
              )}
              <h3>{m.name}</h3>
              <p>{m.text}</p>
              <span className="pcard-arrive">
                <Icon name="send" size={13} /> {m.arrive}
              </span>
              <span className="pcard-shine" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const ROUTES = [
  { who: 'University student', country: 'IN', icon: 'cap', tone: '#FF9933' },
  { who: 'IT manager', country: 'DE', icon: 'chip', tone: '#49B6FF' },
  { who: 'Homemaker', country: 'BR', icon: 'heart', tone: '#FF5C7A' },
  { who: 'Hospital administrator', country: 'AE', icon: 'pulse', tone: '#12C29B' },
  { who: 'Marketing director', country: 'US', icon: 'megaphone', tone: '#7B5CFF' },
  { who: 'Retiree', country: 'CA', icon: 'clock', tone: '#FFB020' }
];
const TERMINALS = ['UPI', 'PayPal', 'Wire Transfer', 'Amazon Gift Card'];
const SY = (i) => 50 + i * 64; // station y (viewBox 1000 x 420)
const TY = (i) => 70 + i * 96; // terminal y

/** "Every profile has a way to earn": a metro map from member profiles to the payout methods open in their country. */
export function RewardRoutes() {
  const [act, setAct] = useState(0);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (!inView || hold || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setAct((n) => (n + 1) % ROUTES.length), 2600);
    return () => clearTimeout(t);
  }, [act, inView, hold]);
  const r = ROUTES[act];
  return (
    <div className="metro" ref={ref} onMouseLeave={() => setHold(false)}>
      <div className="metro-map">
        <svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          {ROUTES.map((ro, i) =>
            methodsFor(ro.country).map((m) => {
              const t = TERMINALS.indexOf(m);
              const d = `M150 ${SY(i)} C 480 ${SY(i)}, 520 ${TY(t)}, 850 ${TY(t)}`;
              return (
                <g key={ro.who + m} className={`mt-line ${i === act ? 'is-on' : ''}`} style={{ '--c': ro.tone }}>
                  <path d={d} className="mt-rail" />
                  <path d={d} className="mt-train" pathLength="100" />
                </g>
              );
            })
          )}
        </svg>
        {ROUTES.map((ro, i) => (
          <button
            key={ro.who}
            type="button"
            className={`mt-station ${i === act ? 'is-on' : ''}`}
            style={{ top: `${(SY(i) / 420) * 100}%`, '--c': ro.tone }}
            onMouseEnter={() => {
              setHold(true);
              setAct(i);
            }}
            onFocus={() => setAct(i)}
            onClick={() => setAct(i)}
          >
            <span className="mt-ico">
              <Icon name={ro.icon} size={16} />
            </span>
            <span className="mt-who">{ro.who}</span>
            <Flag code={ro.country} size={13} />
          </button>
        ))}
        {TERMINALS.map((m, t) => {
          const live = methodsFor(r.country).includes(m);
          return (
            <span key={m} className={`mt-term ${live ? 'is-live' : 'is-off'}`} style={{ top: `${(TY(t) / 420) * 100}%`, '--mc': METHOD_META[m].color }}>
              <Icon name={METHOD_META[m].icon} size={16} /> {m}
              {m === 'UPI' && <small>India only</small>}
            </span>
          );
        })}
      </div>
      <p className="metro-cap" aria-live="polite">
        <Flag code={r.country} size={16} /> <strong>{r.who}</strong> can cash out via {methodsFor(r.country).join(', ')}
      </p>
    </div>
  );
}

const JOURNEY = [
  { t: 'Earn rewards', d: 'Complete eligible surveys and studies.', icon: 'chat' },
  { t: 'Check your balance', d: 'Watch points grow in your dashboard.', icon: 'dashboard' },
  { t: 'Reach the threshold', d: 'Hit the redemption minimum for your country.', icon: 'target' },
  { t: 'Submit a claim', d: 'Pick PayPal, wire or a gift card – or UPI in India.', icon: 'send' },
  { t: 'Receive your reward', d: 'Verified claims are paid in batches.', icon: 'gift' }
];

/** Reward journey as a glass tube filling with gold; each milestone bubble pops as the level passes it. */
export function ClaimJourney() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  return (
    <div className={`tube ${inView ? 'is-run' : ''}`} ref={ref}>
      <div className="tube-glass" aria-hidden="true">
        <span className="tube-liquid">
          <i />
          <i />
          <i />
        </span>
      </div>
      <ol className="tube-steps">
        {JOURNEY.map((st, i) => (
          <li key={st.t} style={{ '--i': i }}>
            <span className="tube-node">
              <Icon name={st.icon} size={20} />
            </span>
            <strong>{st.t}</strong>
            <span>{st.d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "Track your payout": a paper plane flies the claim through each stop, like a parcel tracker. */
export function PayoutTracker() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const stops = [
    ['send', 'Claim submitted', 'From your dashboard'],
    ['search', 'Checked', 'Profile and completions verified'],
    ['bank', 'With accounts', 'Payment prepared'],
    ['check', 'Paid', 'Usually within 2–3 weeks']
  ];
  return (
    <div className={`tracker ${inView ? 'is-run' : ''}`} ref={ref}>
      <div className="tr-road" aria-hidden="true">
        <span className="tr-fill" />
        <span className="tr-plane">
          <Icon name="send" size={20} />
        </span>
      </div>
      <ol className="tr-stops">
        {stops.map(([ic, t, d], i) => (
          <li key={t} style={{ '--i': i }}>
            <span className="tr-dot">
              <Icon name={ic} size={18} />
            </span>
            <strong>{t}</strong>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const CHANNELS = [
  { id: 'dash', name: 'Account Dashboard', text: 'Track surveys and rewards anytime.', icon: 'dashboard', color: '#1F5BFF' },
  { id: 'sms', name: 'SMS', text: 'Receive instant survey alerts.', icon: 'sms', color: '#FFB020' },
  { id: 'wa', name: 'WhatsApp', text: 'Get notifications directly on WhatsApp.', icon: 'whatsapp', color: '#25D366' },
  { id: 'mail', name: 'Email', text: 'Detailed invitations delivered to your inbox.', icon: 'mail', color: '#7B5CFF' }
];

const NOTE_TEXT = {
  wa: 'Hi! A new survey matches your profile – consumer tech, about 10 minutes. Tap to start 👇',
  sms: 'New survey for you on Turn2Opinion. Reward shown before you start. Reply STOP to opt out.',
  mail: 'Your invitation: a short study on streaming apps. Topic, length and reward inside.',
  dash: 'New surveys waiting. Your points balance updates the moment you finish.'
};
const NOTE_APP = { wa: 'WhatsApp', sms: 'Messages', mail: 'Mail', dash: 'Turn2Opinion' };

/** Survey invitations: four channel "transmitters" beam invitations onto a lock-screen phone. */
export function InvitationChannels() {
  const [order, setOrder] = useState([0, 1, 2, 3]); // newest first
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const on = order[0];
  useEffect(() => {
    if (!inView || hold || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setOrder((o) => [(o[0] + 1) % CHANNELS.length, ...o.filter((x) => x !== (o[0] + 1) % CHANNELS.length)]), 3000);
    return () => clearTimeout(t);
  }, [inView, hold, order]);
  const pick = (i) => {
    setHold(true);
    setOrder((o) => [i, ...o.filter((x) => x !== i)]);
  };
  const c = CHANNELS[on];
  const side = (list) =>
    list.map((i) => {
      const ch = CHANNELS[i];
      return (
        <button key={ch.id} type="button" aria-pressed={i === on} className={`sg-tx ${i === on ? 'is-on' : ''}`} style={{ '--c': ch.color }} onClick={() => pick(i)}>
          <span className="sg-ico">
            <Icon name={ch.icon} size={22} />
            <span className="sg-waves" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="sg-txt">
            <strong>{ch.name}</strong>
            <small>{ch.text}</small>
          </span>
          <span className="sg-beam" aria-hidden="true" />
        </button>
      );
    });
  return (
    <div className={`signals ${inView ? 'is-in' : ''}`} ref={ref} style={{ '--c': c.color }} role="group" aria-label="Choose how you hear about surveys">
      <div className="sg-side sg-left">{side([0, 1])}</div>
      <div className="sg-phone" aria-live="polite">
        <span className="sg-halo" aria-hidden="true" />
        <div className="sg-screen">
          <span className="sg-island" aria-hidden="true" />
          <p className="sg-lock" aria-hidden="true">
            <Icon name="lock" size={14} />
          </p>
          <p className="sg-clock" aria-hidden="true">
            New for you
          </p>
          <ul className="sg-notes">
            {order.slice(0, 3).map((i, k) => {
              const ch = CHANNELS[i];
              return (
                <li key={ch.id} className={`sg-note ${k === 0 ? 'is-new' : ''}`} style={{ '--c': ch.color, '--k': k }}>
                  <span className="sn-app">
                    <span className="sn-ico">
                      <Icon name={ch.icon} size={13} />
                    </span>
                    {NOTE_APP[ch.id]}
                    <small>{k === 0 ? 'now' : `${k * 3}m ago`}</small>
                  </span>
                  <span className="sn-body">{NOTE_TEXT[ch.id]}</span>
                </li>
              );
            })}
          </ul>
          <span className="sg-home" aria-hidden="true" />
        </div>
      </div>
      <div className="sg-side sg-right">{side([2, 3])}</div>
    </div>
  );
}
