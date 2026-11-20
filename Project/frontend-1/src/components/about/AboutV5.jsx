// About page, round 12 (Kunal, 20 Nov 2026: "redesign every attached section, unique and animated").
// Each section is a different object so none of them repeats another page:
//   OpinionPrism     hero art: one white beam (your opinion) splits into four coloured outcomes
//   AskAnswerThread  "Your answer, their decision": a live chat between askers and members
//   OpinionRiver     "How one opinion travels": a glowing river that fills as you scroll
//   GlanceBoard      "At a glance": a dark instrument panel with gauges, an equaliser and a constellation
//   ValuePillars     "What we stand for": six coloured pillars that open like curtains
//   CertFrames       "Checked by people who aren't us": framed certificates with a ribbon seal
//   ReviewGate       the reviews call to action as a gem meter with a moving quote strip
//   RegionStreams    "Where our members are": one flag river per region, drifting both ways
import { useEffect, useRef, useState } from 'react';
import { Link } from '../../router/Router.jsx';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { SITE } from '../../config/site.js';
import Icon from '../Icon.jsx';
import { Flag, T2OMark } from '../Brand.jsx';
import { REGIONS, ALL_COUNTRIES } from '../../data/profiles.js';
import { SURVEYS } from '../../data/surveys.js';
import { REWARDS } from '../../data/payouts.js';
import { TESTIMONIALS } from '../../data/testimonials.js';

/* ------------------------------ hero prism ------------------------------ */
const RAYS = [
  ['Real rewards', '#ffb020'],
  ['Better products', '#ff5c7a'],
  ['Smarter policies', '#49b6ff'],
  ['Clearer decisions', '#12c29b']
];
export function OpinionPrism() {
  return (
    <div className="apz" aria-hidden="true">
      <span className="apz-beam">
        <em>Your opinion</em>
      </span>
      <span className="apz-prism">
        <span className="apz-glass" />
        <span className="apz-mark">
          <T2OMark size={44} />
        </span>
      </span>
      <span className="apz-rays">
        {RAYS.map(([t, c], i) => (
          <span key={t} className="apz-ray" style={{ '--c': c, '--i': i }}>
            <b>{t}</b>
          </span>
        ))}
      </span>
      <span className="apz-sparks">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
    </div>
  );
}

/* ------------------------------ ask / answer thread ------------------------------ */
const THREAD = [
  ['ask', 'bag', 'A snack brand', 'Would you pay a little more for fully recyclable packaging?'],
  ['say', 'users', 'Consumers', 'Most said yes, as long as the price stays close.'],
  ['ask', 'landmark', 'A city council', 'Which bus route change would make your commute easier?'],
  ['say', 'users', 'Commuters', 'Most chose earlier first buses over extra stops.'],
  ['ask', 'megaphone', 'An agency', 'Which of these three adverts would you remember tomorrow?'],
  ['say', 'briefcase', 'Professionals', 'The plain one won. Fewer claims, more trust.']
];
export function AskAnswerThread() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [n, setN] = useState(THREAD.length);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    setN(1);
    const t = setInterval(() => setN((v) => (v >= THREAD.length ? v : v + 1)), 1100);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <div className="aat" ref={ref}>
      <div className="aat-side is-ask">
        <b>They ask</b>
        <p>Brands, governments, agencies and institutions bring a question they can’t answer from a spreadsheet.</p>
        <ul>
          {['Brands', 'Governments', 'Agencies', 'Institutions'].map((t, i) => (
            <li key={t}>
              <Icon name={['bag', 'landmark', 'megaphone', 'cap'][i]} size={15} /> {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="aat-phone" role="list" aria-label="Examples of questions and what members answered (illustrative)">
        <span className="aat-notch" aria-hidden="true" />
        <span className="aat-top">
          <T2OMark size={20} />
          Turn2Opinion · in between
        </span>
        {THREAD.slice(0, n).map(([k, ic, who, t], i) => (
          <div key={i} role="listitem" className={`aat-msg is-${k}`} style={{ '--i': i }}>
            <span className="aat-who">
              <Icon name={ic} size={12} /> {who}
            </span>
            <span className="aat-bubble">{t}</span>
          </div>
        ))}
        {n < THREAD.length && (
          <span className="aat-typing" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      <div className="aat-side is-say">
        <b>You answer</b>
        <p>Consumers, professionals and Teens with a parent’s permission reply in their own words, and get rewarded for it.</p>
        <ul>
          {['Consumers', 'Professionals', 'Teens 13–17', 'Specialists'].map((t, i) => (
            <li key={t}>
              <Icon name={['users', 'briefcase', 'sparkles', 'star'][i]} size={15} /> {t}
            </li>
          ))}
        </ul>
      </div>
      <p className="aat-note">Examples are illustrative. Real answers are combined with thousands of others and never shown with your name.</p>
    </div>
  );
}

/* ------------------------------ opinion river ------------------------------ */
const JOURNEY = [
  ['megaphone', 'A brand asks', 'A company, agency or public body has a question it needs real people to answer.', '#ff5c7a'],
  ['clipboard', 'A survey is built', 'Frequent Research designs a short, fair survey and tests it before launch.', '#ffb020'],
  ['target', 'It finds you', 'Your profile answers decide which invitations reach you. Your name is never part of it.', '#12c29b'],
  ['chat', 'You answer', 'On your phone or laptop, in your own time. The reward and length are shown first.', '#49b6ff'],
  ['pulse', 'Insight lands', 'Answers are checked for quality and combined, never sold one by one.', '#7b5cff'],
  ['gift', 'You get rewarded', `Points go to your balance. Redeem with ${REWARDS.length} options, including UPI in India.`, '#1f5bff']
];
export function OpinionRiver() {
  const ref = useRef(null);
  const [p, setP] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        setP(Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <ol className="arv" ref={ref} style={{ '--p': p }}>
      <span className="arv-bed" aria-hidden="true">
        <span className="arv-water" />
        <span className="arv-boat">
          <Icon name="chat" size={16} />
        </span>
      </span>
      {JOURNEY.map(([ic, t, d, c], i) => (
        <li key={t} className={p * JOURNEY.length > i + 0.2 ? 'is-on' : ''} style={{ '--c': c, '--i': i }}>
          <span className="arv-dot" aria-hidden="true">
            <Icon name={ic} size={22} />
          </span>
          <div className="arv-card">
            <em>Stop {String(i + 1).padStart(2, '0')}</em>
            <b>{t}</b>
            <p>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------ glance board ------------------------------ */
const CONSUMER = SURVEYS.consumer || [];
const PRO = SURVEYS.professional || [];
const TEEN = SURVEYS.teen || [];
const avg = (l, k) => (l.length ? l.reduce((s, x) => s + x[k], 0) / l.length : 0);

function Gauge({ n, max, label, icon, c, suffix = '', live }) {
  const f = Math.min(1, n / max);
  return (
    <li className="agb-g" style={{ '--c': c, '--f': live ? f : 0 }}>
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path className="agb-arc" d="M10 64 A50 50 0 0 1 110 64" pathLength="100" />
        <path className="agb-val" d="M10 64 A50 50 0 0 1 110 64" pathLength="100" />
      </svg>
      <span className="agb-needle" aria-hidden="true" />
      <b>
        {n}
        {suffix}
      </b>
      <span>
        <Icon name={icon} size={13} /> {label}
      </span>
    </li>
  );
}

export function GlanceBoard() {
  const [ref, seen] = useInView({ threshold: 0.2 });
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (seen) setLive(true);
  }, [seen]);
  const maxRegion = Math.max(...REGIONS.map((r) => r.countries.length));
  const all = [...CONSUMER.map((s) => ({ ...s, k: 'c' })), ...PRO.map((s) => ({ ...s, k: 'p' })), ...TEEN.map((s) => ({ ...s, k: 't' }))];
  const maxR = Math.max(...all.map((s) => s.reward));
  const maxM = Math.max(...all.map((s) => s.mins));
  return (
    <div className={`agb ${live ? 'is-live' : ''}`} ref={ref}>
      <ul className="agb-gauges">
        <Gauge live={live} n={ALL_COUNTRIES.length} max={60} label="countries" icon="globe" c="#49b6ff" />
        <Gauge live={live} n={REGIONS.length} max={6} label="regions" icon="map" c="#12c29b" />
        <Gauge live={live} n={all.length} max={Math.max(40, all.length)} label="survey topics" icon="clipboard" c="#ffb020" />
        <Gauge live={live} n={REWARDS.length} max={8} label="ways to get paid" icon="wallet" c="#ff5c7a" />
        <Gauge live={live} n={SITE.certifications.length} max={6} label="certifications" icon="shield" c="#a58bff" />
        <Gauge live={live} n={24} max={24} suffix="/7" label="live help" icon="headset" c="#5ef2c6" />
      </ul>
      <figure className="agb-eq">
        <figcaption>
          <b>Countries per region</b>
        </figcaption>
        <ul style={{ '--n': REGIONS.length }}>
          {REGIONS.map((r, i) => (
            <li key={r.id} style={{ '--c': r.accent, '--h': r.countries.length / maxRegion, '--i': i }}>
              <span className="agb-col">
                {Array.from({ length: 10 }, (_, j) => (
                  <i key={j} className={j < Math.round((r.countries.length / maxRegion) * 10) ? 'on' : ''} style={{ '--j': j }} />
                ))}
              </span>
              <b>{r.countries.length}</b>
              <small>{r.name}</small>
            </li>
          ))}
        </ul>
      </figure>
      <figure className="agb-sky">
        <figcaption>
          <b>Survey topics as stars</b>
          <span>Further right is longer, higher up is a bigger reward (USD).</span>
        </figcaption>
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label={`Consumer surveys average $${avg(CONSUMER, 'reward').toFixed(1)} for about ${Math.round(avg(CONSUMER, 'mins'))} minutes; professional surveys average $${avg(PRO, 'reward').toFixed(1)} for about ${Math.round(avg(PRO, 'mins'))} minutes; Teen surveys average $${avg(TEEN, 'reward').toFixed(1)} for about ${Math.round(avg(TEEN, 'mins'))} minutes.`}
        >
          {all.map((s, i) => (
            <circle key={s.id + s.k} className={`agb-star ${s.k}`} cx={14 + (s.mins / maxM) * 292} cy={166 - (s.reward / maxR) * 150} r={s.k === 'p' ? 4.5 : 3.5} style={{ '--i': i }}>
              <title>{`${s.title}: about $${s.reward}, ${s.mins} min`}</title>
            </circle>
          ))}
        </svg>
        <p className="agb-legend">
          <span className="c">Consumer · avg ${avg(CONSUMER, 'reward').toFixed(1)}</span>
          <span className="p">Professional · avg ${avg(PRO, 'reward').toFixed(1)}</span>
          <span className="t">Teen · avg ${avg(TEEN, 'reward').toFixed(1)}</span>
        </p>
      </figure>
      <figure className="agb-pay">
        <figcaption>
          <b>Ways to get paid</b>
          <span>Everywhere we pay, plus UPI in India</span>
        </figcaption>
        <ul>
          {REWARDS.map((r, i) => (
            <li key={r.id} style={{ '--c': r.c1, '--c2': r.c2, '--i': i }}>
              <Icon name={r.icon} size={16} />
              {r.short}
              {r.only && <small>IN</small>}
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}

/* ------------------------------ value pillars ------------------------------ */
const VALUES = [
  ['heart', 'Respect for your time', 'Short, relevant surveys and honest information about rewards before you start.', '#ff5c7a'],
  ['lock', 'Privacy by default', 'Your details are never sold. Answers are reported in aggregate.', '#2f8fd8'],
  ['shield', 'Quality, no shortcuts', 'Strict checks protect honest members and the clients who rely on them.', '#0fa784'],
  ['globe', 'Open to everyone', 'Consumers, professionals and Teens aged 13 to 17 (with a parent’s permission) in every region.', '#e09a00'],
  ['headset', 'Help that answers', 'Live help 24/7, WhatsApp and email with real follow-through.', '#7b5cff'],
  ['gift', 'Rewards your way', 'PayPal, bank or wire transfer, vouchers or gift cards, plus UPI in India.', '#1f5bff']
];
export function ValuePillars() {
  const [on, setOn] = useState(0);
  return (
    <ul className="avp">
      {VALUES.map(([ic, t, d, c], i) => (
        <li key={t} className={on === i ? 'is-on' : ''} style={{ '--c': c, '--i': i }} onMouseEnter={() => setOn(i)}>
          <button type="button" aria-expanded={on === i} onClick={() => setOn(i)} onFocus={() => setOn(i)}>
            <span className="avp-no">{String(i + 1).padStart(2, '0')}</span>
            <Icon name={ic} size={26} />
            <b>{t}</b>
          </button>
          <p>{d}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ certificate frames ------------------------------ */
export function CertFrames() {
  return (
    <ul className="acf">
      {SITE.certifications.map((c, i) => (
        <li key={c.id} style={{ '--i': i }} data-reveal>
          <span className="acf-frame">
            <span className="acf-paper">
              <small>Certificate of</small>
              <b>{c.label}</b>
              <span>{c.note}</span>
              <i className="acf-sign" aria-hidden="true" />
            </span>
            <span className="acf-seal" aria-hidden="true">
              <Icon name={c.id === 'esomar' ? 'globe' : c.id === 'msme' ? 'landmark' : 'shield'} size={20} />
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ review gate ------------------------------ */
export function ReviewGate() {
  const quotes = TESTIMONIALS.filter((t) => t.text && t.text.length < 140).slice(0, 8);
  return (
    <Link to="/about/reviews/" className="arg" data-reveal>
      <span className="arg-gems" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <span className="arg-copy">
        <span className="arg-kicker">
          <Icon name="pulse" size={14} /> Judged by the people who use it
        </span>
        <h2 id="rv-gate-h">Read every rating and review</h2>
        <p>The average score, separate ratings for surveys, rewards, support and mobile, and every review in full. Low scores included.</p>
        <span className="arg-btn">
          Open the reviews <Icon name="arrow" size={16} />
        </span>
      </span>
      {quotes.length > 0 && (
        <span className="arg-strip" aria-hidden="true">
          <span className="arg-track">
            {[...quotes, ...quotes].map((q, i) => (
              <span key={i} className="arg-q">
                “{q.text}” <em>{q.name}</em>
              </span>
            ))}
          </span>
        </span>
      )}
    </Link>
  );
}

/* ------------------------------ region streams ------------------------------ */
export function RegionStreams() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div className={`ars ${inView ? 'is-on' : ''}`} ref={ref}>
      {REGIONS.map((r, i) => {
        const list = [...r.countries, ...r.countries, ...r.countries].slice(0, Math.max(12, r.countries.length * 2));
        return (
          <div key={r.id} className="ars-row" style={{ '--c': r.accent, '--i': i, '--d': `${22 + r.countries.length * 1.4}s` }}>
            <span className="ars-label">
              <b>{r.name}</b>
              <small>{r.countries.length} countries</small>
            </span>
            <span className={`ars-river ${i % 2 ? 'is-rev' : ''}`}>
              <span className="ars-track">
                {[...list, ...list].map(([code, name], j) => (
                  <span key={j} className="ars-flag" title={name} aria-hidden={j >= r.countries.length ? 'true' : undefined}>
                    <Flag code={code} size={22} />
                    <em>{name}</em>
                  </span>
                ))}
              </span>
            </span>
          </div>
        );
      })}
      <ul className="sr-only">
        {ALL_COUNTRIES.map((c) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
