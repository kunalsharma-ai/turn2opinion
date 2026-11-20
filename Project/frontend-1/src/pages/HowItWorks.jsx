import { useEffect, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { useInView, useReveal, prefersReducedMotion } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { peopleAlt } from '../data/illustrations.js';
import { CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import { InvitationChannels } from '../components/sections/Rewards.jsx';
import TeenBand from '../components/sections/TeenBand.jsx';
import Icon from '../components/Icon.jsx';

const STEPS = [
  {
    t: 'Create your free account',
    d: 'Sign up with your name, an active email address and a valid mobile number. Registration is free and there is never any investment.',
    icon: 'user',
    screen: { title: 'Join free', lines: ['Name', 'Email', 'Mobile', 'Date of birth'], cta: 'Create account', color: '#49B6FF' }
  },
  {
    t: 'Verify your email and phone',
    d: 'Click the verification link we email you and enter the one-time password sent to your phone. Double opt-in keeps every account genuine.',
    icon: 'shield',
    screen: { title: 'Verify', lines: ['Email link sent', 'OTP: • • • • • •'], cta: 'Verify', color: '#12C29B' }
  },
  {
    t: 'Complete your profile',
    d: 'Answer profile sections about you, your household, interests and work. Each completed section earns points and unlocks more matching surveys.',
    icon: 'id',
    screen: { title: 'My profile', lines: ['About me ✓', 'Household ✓', 'Work & industry', 'Tech & media'], cta: 'Continue', color: '#7B5CFF' }
  },
  {
    t: 'Get matched invitations',
    d: 'When a study needs someone like you, you get an invitation by dashboard, SMS, WhatsApp or email – whichever you choose.',
    icon: 'bell',
    screen: { title: 'New survey', lines: ['Matches your profile', 'Topic: Technology', 'Mobile friendly'], cta: 'Start now', color: '#FFB020' }
  },
  {
    t: 'Qualify and share your opinion',
    d: 'A few screening questions confirm you fit the study. Then answer honestly and thoughtfully – quality checks reward real effort.',
    icon: 'chat',
    screen: { title: 'Survey', lines: ['Q3 of 12', '○ Agree', '● Strongly agree'], cta: 'Next', color: '#FF5C7A' }
  },
  {
    t: 'Redeem your rewards',
    d: 'Points add up in your dashboard. Reach the threshold and claim via PayPal, cash rewards, bank or wire transfer, shopping or grocery vouchers or a digital gift card – or UPI if you live in India.',
    icon: 'gift',
    screen: { title: 'Rewards', lines: ['Balance ready', 'PayPal · Cash · Bank', 'Vouchers · Gift cards', 'UPI (India)'], cta: 'Redeem now', color: '#1F5BFF' }
  }
];

function RoadArt() {
  return (
    <svg className="road" viewBox="0 0 320 320" aria-hidden="true">
      <path d="M20 290 C 120 280, 40 200, 150 190 S 260 120, 190 80 S 250 20, 300 30" className="road-path" />
      <path d="M20 290 C 120 280, 40 200, 150 190 S 260 120, 190 80 S 250 20, 300 30" className="road-dash" />
      {[
        [20, 290],
        [150, 190],
        [190, 80],
        [300, 30]
      ].map(([x, y], i) => (
        <g key={i} className="road-pin" style={{ '--i': i }} transform={`translate(${x} ${y})`}>
          <circle r="12" />
          <circle r="5" className="road-pin-core" />
        </g>
      ))}
    </svg>
  );
}

const NODES = [
  [8, 70],
  [24, 30],
  [41, 66],
  [58, 28],
  [75, 64],
  [92, 26]
];


const SIDES = [
  {
    k: 'con',
    title: 'Consumers',
    icon: 'bag',
    img: 'shopper',
    floats: ['bag', 'cup', 'game', 'plane', 'car', 'heart'],
    items: [
      ['users', 'Students, homemakers, parents, retirees'],
      ['bag', 'Shoppers, gamers, travellers, drivers'],
      ['star', 'Brands, products, media, lifestyle'],
      ['phone', 'Answer from your phone, anytime']
    ]
  },
  {
    k: 'pro',
    title: 'Professionals',
    icon: 'briefcase',
    img: 'business',
    floats: ['chip', 'bank', 'briefcase', 'pulse', 'gear', 'megaphone'],
    items: [
      ['building', 'C-suite, managers, specialists, owners'],
      ['chip', 'IT, finance, HR, healthcare, marketing'],
      ['gear', 'Tools, vendors and decisions at work'],
      ['mail', 'Work-email check for B2B studies']
    ]
  }
];

/** "Who can take part": one person, two sides. A draggable divider compares the consumer and professional worlds. */
function TwoSides() {
  const [split, setSplit] = useState(50);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div className={`duo ${inView ? 'is-in' : ''} ${touched ? 'is-held' : ''}`} ref={ref} style={{ '--split': split }}>
      {SIDES.map((sd) => (
        <div key={sd.k} className={`duo-pane duo-${sd.k}`}>
          <span className="duo-floats" aria-hidden="true">
            {sd.floats.map((ic, i) => (
              <i key={ic} style={{ '--i': i }}>
                <Icon name={ic} size={18} />
              </i>
            ))}
          </span>
          <img className="duo-peep" src={asset(`/images/people/${sd.img}.svg`)} alt={peopleAlt(sd.img)} width="200" height="240" loading="lazy" />
          <div className="duo-copy">
            <h3 className="duo-tag">
              <span>
                <Icon name={sd.icon} size={20} />
              </span>
              {sd.title}
            </h3>
            <ul>
              {sd.items.map(([ic, t], i) => (
                <li key={t} style={{ '--i': i }}>
                  <Icon name={ic} size={16} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <span className="duo-handle" aria-hidden="true">
        <span className="duo-knob">
          <Icon name="heart" size={16} />
          <b>You</b>
          <small>most people are both</small>
        </span>
      </span>
      <label className="sr-only" htmlFor="duo-range">
        Compare the consumer and professional sides
      </label>
      <input
        id="duo-range"
        className="duo-range"
        type="range"
        min="30"
        max="70"
        value={split}
        onChange={(e) => {
          setTouched(true);
          setSplit(Number(e.target.value));
        }}
      />
    </div>
  );
}

const TIPS = [
  ['id', 'Keep your profile 100% complete', 'More detail means more matches and fewer screen-outs.', '#FFD166'],
  ['bell', 'Turn on instant alerts', 'Popular surveys fill their quotas fast.', '#5FE3B0'],
  ['pen', 'Write real open-ended answers', 'Thoughtful replies pass quality checks.', '#FF8FB1'],
  ['clock', 'Take your time', 'Speeding and straight-lining get flagged.', '#7FB2FF'],
  ['shield', 'One account per person', 'Duplicates are found and removed.', '#B79CFF'],
  ['refresh', 'Update when life changes', 'New job, new car, new baby? Update your profile.', '#FFB27A']
];
const LEVELS = ['Low', 'Fair', 'Fair', 'Good', 'Good', 'Great', 'Maximum'];

/** "Make every invitation count": switch tips on and watch the match-chance gauge climb. */
function TipMeter() {
  const [on, setOn] = useState(() => TIPS.map(() => false));
  const [manual, setManual] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.35 });
  const count = on.filter(Boolean).length;
  useEffect(() => {
    if (manual || !inView) return undefined;
    if (prefersReducedMotion()) {
      setOn(TIPS.map(() => true));
      return undefined;
    }
    const nextIdx = on.indexOf(false);
    if (nextIdx === -1) return undefined;
    const t = setTimeout(() => setOn((cur) => cur.map((v, i) => (i === nextIdx ? true : v))), count ? 900 : 600);
    return () => clearTimeout(t);
  }, [on, manual, inView, count]);
  const toggle = (i) => {
    setManual(true);
    setOn((cur) => cur.map((v, j) => (j === i ? !v : v)));
  };
  const p = count / TIPS.length;
  return (
    <div className={`tipmeter ${count === TIPS.length ? 'is-max' : ''}`} ref={ref}>
      <div className="tg">
        <svg viewBox="0 0 220 130" aria-hidden="true">
          <defs>
            <linearGradient id="tg-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#FF5C7A" />
              <stop offset="0.5" stopColor="#FFB020" />
              <stop offset="1" stopColor="#12C29B" />
            </linearGradient>
          </defs>
          <path d="M20 115 A90 90 0 0 1 200 115" className="tg-track" pathLength="100" />
          <path d="M20 115 A90 90 0 0 1 200 115" className="tg-fill" pathLength="100" style={{ strokeDashoffset: 100 - p * 100 }} />
          {Array.from({ length: 13 }).map((_, i) => {
            const a = Math.PI - (i / 12) * Math.PI;
            return <line key={i} x1={110 + Math.cos(a) * 72} y1={115 - Math.sin(a) * 72} x2={110 + Math.cos(a) * (i % 2 ? 66 : 62)} y2={115 - Math.sin(a) * (i % 2 ? 66 : 62)} className="tg-tick" />;
          })}
          <g className="tg-needle" style={{ transform: `rotate(${-90 + p * 180}deg)` }}>
            <path d="M107 115 L110 46 L113 115 Z" />
          </g>
          <circle cx="110" cy="115" r="9" className="tg-hub" />
        </svg>
        <p className="tg-read" aria-live="polite">
          <small>Your match chances</small>
          <b key={LEVELS[count]}>{LEVELS[count]}</b>
          <span>
            {count} of {TIPS.length} habits on
          </span>
        </p>
        {count === TIPS.length && (
          <span className="tg-burst" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ '--i': i }} />
            ))}
          </span>
        )}
      </div>
      <ul className="tm-list">
        {TIPS.map(([ic, t, d, c], i) => (
          <li key={t} style={{ '--c': c, '--i': i }}>
            <button type="button" role="switch" aria-checked={on[i]} className={on[i] ? 'is-on' : ''} onClick={() => toggle(i)}>
              <span className="tl-ico">
                <Icon name={ic} size={20} />
              </span>
              <span className="tl-txt">
                <strong>{t}</strong>
                <small>{d}</small>
              </span>
              <span className="tl-switch" aria-hidden="true">
                <i />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useReveal();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [mapRef, inView] = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (!auto || !inView || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setActive((n) => (n + 1) % STEPS.length), 4200);
    return () => clearTimeout(t);
  }, [active, auto, inView]);
  const go = (i) => {
    setAuto(false);
    setActive((i + STEPS.length) % STEPS.length);
  };
  const s = STEPS[active].screen;
  return (
    <div ref={ref}>
      <PageHero
        theme="orbit"
        crumbs={[{ label: 'How It Works' }]}
        kicker="Opinion → research → reward"
        title="How Turn2Opinion Works"
        tagline="Six simple moves from free sign-up to your reward."
        lead="Paid online surveys, explained in six simple moves – from your free account to rewards in your PayPal, bank or inbox (and UPI in India)."
        art={<RoadArt />}
      >
        <div className="ph-actions">
          <Link to="/join/" className="btn btn-gold">
            Start step one
          </Link>
        </div>
      </PageHero>

      <section className="section s-paper" aria-labelledby="steps-title">
        <div className="wrap">
          <SectionHead id="steps-title" title="Six steps, one smooth journey" lead="Tap a level or let it play. The phone shows exactly what you’ll see at each step." />
          <div className="levels" ref={mapRef}>
            <div className="lv-map">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className="lv-path" d="M8 70 C 14 70, 18 30, 24 30 S 35 66, 41 66 S 52 28, 58 28 S 69 64, 75 64 S 86 26, 92 26" />
              </svg>
              {STEPS.map((stp, i) => (
                <button
                  key={stp.t}
                  type="button"
                  className={`lv-node ${i === active ? 'is-on' : i < active ? 'is-done' : ''}`}
                  style={{ left: `${NODES[i][0]}%`, top: `${NODES[i][1]}%`, '--c': stp.screen.color }}
                  aria-pressed={i === active}
                  aria-label={`Step ${i + 1}: ${stp.t}`}
                  onClick={() => go(i)}
                >
                  <Icon name={i < active ? 'check' : stp.icon} size={20} />
                  <span className="lv-label">{stp.t}</span>
                </button>
              ))}
              <span className="lv-token" style={{ left: `${NODES[active][0]}%`, top: `${NODES[active][1]}%` }} aria-hidden="true">
                <img src={asset('/images/people/shopper.svg')} alt="Illustration of a smiling shopper who has just claimed a survey reward" width="60" height="70" />
              </span>
            </div>

            <div className="lv-stage" key={active} style={{ '--c': s.color }}>
              <div className="lv-copy" aria-live="polite">
                <p className="lv-count">
                  Step <b>{active + 1}</b> of {STEPS.length}
                </p>
                <h3>{STEPS[active].t}</h3>
                <p>{STEPS[active].d}</p>
                <div className="lv-nav">
                  <button type="button" onClick={() => go(active - 1)} aria-label="Previous step">
                    <Icon name="chevronLeft" size={18} />
                  </button>
                  <button type="button" onClick={() => go(active + 1)} aria-label="Next step">
                    <Icon name="chevronRight" size={18} />
                  </button>
                  {active === STEPS.length - 1 && (
                    <Link to="/join/" className="btn btn-primary btn-sm">
                      Start step one
                    </Link>
                  )}
                </div>
              </div>
              <div className="lv-phone" aria-hidden="true">
                <div className="phone-mock tall" style={{ '--c': s.color }}>
                  <div className="phone-notch" />
                  <div className="phone-screen app-screen">
                    <p className="app-title">{s.title}</p>
                    {s.lines.map((l) => (
                      <span key={l} className="app-line">
                        {l}
                      </span>
                    ))}
                    <span className="app-cta">{s.cta}</span>
                    <div className="app-progress">
                      <span style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="who-can">
        <div className="wrap">
          <SectionHead id="who-can" title="Who can take part?" lead="Anyone with an honest opinion: consumers, professionals and teens aged 13 to 17. Studies look for all kinds of people, so every profile has value." align="center" />
          <TwoSides />
          <TeenBand variant="how" />
          <p className="center-link">
            Teens aged 13 to 17 join the teen panel with a parent or guardian’s verified permission – see our <Link to="/privacy/">privacy policy</Link>.
          </p>
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="inv-h">
        <div className="wrap">
          <SectionHead id="inv-h" title="How you’ll hear about new surveys" lead="Choose the notification method that works best for you." />
          <InvitationChannels />
        </div>
      </section>

      <section className="section s-night" aria-labelledby="tips-h">
        <div className="wrap">
          <SectionHead id="tips-h" title="Make every invitation count" align="center" />
          <TipMeter />
          <p className="center-link" data-reveal>
            <Link to="/blog/get-paid-to-do-surveys-tips/" className="link-arrow light">
              Read 15 tips to qualify for more surveys <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Step one takes two minutes." variant="split" />
    </div>
  );
}
