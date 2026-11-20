// /earn/consumers/ — Earn menu, page 1 of 4 (round 10, Kunal 20 Nov 2026).
//
// World: "sunrise sky". Turn2Opinion royal blue with sunshine yellow and a coral accent.
// Every section has its own metaphor so nothing here repeats the other three Earn pages:
//   1. HERO        a phone lock screen where everyday moments arrive as survey invitations (round 12)
//   2. SNAPS       a wall of instant photos from one week; each turns over to the matching survey (round 12)
//   3. SHELF       who is in the consumer panel, as products on a shop shelf with price tags
//   4. JAR         two streams (profile, surveys) pour into one balance jar (round 12)
//   5. VENDING     the seven ways to redeem, as a vending machine (UPI only in India)
//   6. CHAT FAQ    questions as chat bubbles that open to an answer (round 12)
//   7. SUNRISE     the closing call to action
import { useEffect, useRef, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { useInView, useReveal, prefersReducedMotion } from '../hooks/useMounted.js';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { asset } from '../config/env.js';
import { REWARDS, methodsFor } from '../data/payouts.js';
import { ConsumerChapters, MatchSonar, StraightTalk } from '../components/earn/EarnMore.jsx';

const MOMENTS = [
  { h: 7, icon: 'cup', t: 'Breakfast', q: 'Which cereal box would make you switch?' },
  { h: 9, icon: 'car', t: 'Commute', q: 'Podcast, playlist or silence?' },
  { h: 12, icon: 'bag', t: 'Lunch run', q: 'Would you pay more for less packaging?' },
  { h: 15, icon: 'phone', t: 'Scroll break', q: 'Which ad actually made you stop?' },
  { h: 18, icon: 'basket', t: 'Grocery stop', q: 'What made you try a new brand today?' },
  { h: 20, icon: 'play', t: 'Streaming', q: 'Would you watch this trailer twice?' },
  { h: 22, icon: 'game', t: 'Game night', q: 'Which update would bring you back?' },
  { h: 23, icon: 'cart', t: 'Late cart', q: 'Why did you leave that basket?' }
];

const RECEIPT = [
  ['Tried a new snack flavour', 'Taste test survey'],
  ['Booked a weekend trip', 'Travel habits study'],
  ['Switched mobile plans', 'Telecom feedback'],
  ['Binged a new series', 'Streaming poll'],
  ['Bought trainers online', 'Checkout experience'],
  ['Walked the dog in the rain', 'Pet care survey'],
  ['Helped with homework', 'Parents & education'],
  ['Upgraded a game', 'Gaming panel']
];

const SHELF = [
  { img: 'shopper', who: 'Shoppers', tag: 'Brands, prices, packaging', c: '#1f5bff' },
  { img: 'gamer', who: 'Gamers', tag: 'Consoles, apps, updates', c: '#8b5cf6' },
  { img: 'foodie', who: 'Foodies', tag: 'Recipes, takeaway, groceries', c: '#ff7a45' },
  { img: 'traveller', who: 'Travellers', tag: 'Flights, stays, getaways', c: '#0596d6' },
  { img: 'retiree', who: 'Retirees', tag: 'Health, finance, hobbies', c: '#0e9f6e' },
  { img: 'tech-user', who: 'Early adopters', tag: 'Gadgets, AI, smart home', c: '#e8436d' }
];

const TOWERS = [
  { h: 0.45, t: 'Profile sections', d: 'Every section you complete adds points and tells us which surveys fit you.', c: '#22b8ff' },
  { h: 0.85, t: 'Completed surveys', d: 'Each survey shows its reward and length before you start, so you always choose.', c: '#1f5bff' },
  { h: 0.65, t: 'Your balance', d: 'Points add up in your dashboard. Redeem when you reach the threshold.', c: '#ffb020' }
];

const TICKETS = [
  ['Does it cost anything?', 'Nothing, ever. If anyone asks you to pay to join Turn2Opinion, it is not us.'],
  ['How often will I get invites?', 'It depends on your profile and what research is running. Fuller profiles get matched more often.'],
  ['What if I screen out?', 'Some surveys look for very specific people. If you don’t fit, you find out early and move on to the next one.'],
  ['Who sees my answers?', 'Researchers see combined results. Your name is never attached to what you say.'],
  ['Can I take surveys on my phone?', 'Yes. Most surveys work on any phone, tablet or laptop, and you can pause many of them and come back later.'],
  ['When can I redeem my points?', 'As soon as your balance reaches the threshold shown in your dashboard. You choose the reward option each time.']
];

// Round 13: "Ask us anything" as a chat window. Questions on the left, the conversation on the right;
// every answer is also in the page as a plain list for search engines and screen readers.
function AskChat() {
  const [thread, setThread] = useState([0, 1]);
  const [typing, setTyping] = useState(false);
  const box = useRef(null);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [thread, typing]);
  const ask = (k) => {
    if (typing) return;
    setThread((th) => [...th.filter((x) => x !== k), -1 - k]);
    setTyping(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => {
      setThread((th) => th.map((x) => (x === -1 - k ? k : x)));
      setTyping(false);
    }, 650);
  };
  const shown = thread.map((x) => (x < 0 ? -1 - x : x));
  return (
    <>
      <div className="eca-grid">
        <ul className="eca-qs" aria-label="Questions">
          {TICKETS.map(([q], k) => (
            <li key={q}>
              <button type="button" className={`eca-q ${shown.includes(k) ? 'is-asked' : ''}`} onClick={() => ask(k)} aria-controls="eca-log">
                <span className="eca-no">{String(k + 1).padStart(2, '0')}</span>
                {q}
                <Icon name="send" size={15} />
              </button>
            </li>
          ))}
        </ul>
        <div className="eca-win">
          <div className="eca-bar">
            <span className="eca-av" aria-hidden="true">
              T2O
            </span>
            <span>
              <b>Turn2Opinion</b>
              <small>
                <i className="eca-dot" /> Answers in seconds
              </small>
            </span>
          </div>
          <div className="eca-log" id="eca-log" ref={box} aria-live="polite">
            {thread.map((x) => {
              const k = x < 0 ? -1 - x : x;
              return (
                <div key={k} className="eca-pair">
                  <p className="eca-me">{TICKETS[k][0]}</p>
                  {x < 0 ? (
                    <p className="eca-them is-typing" aria-label="Typing">
                      <i />
                      <i />
                      <i />
                    </p>
                  ) : (
                    <p className="eca-them">{TICKETS[k][1]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <dl className="sr-only">
        {TICKETS.map(([q, a]) => (
          <div key={q}>
            <dt>{q}</dt>
            <dd>{a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// Round 12: the hero is a phone lock screen where everyday moments arrive as survey invitations.
function InvitePhone() {
  const [n, setN] = useState(3);
  const [ref, inView] = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setN((v) => (v + 1) % (MOMENTS.length + 3)), 1500);
    return () => clearInterval(t);
  }, [inView]);
  const shown = MOMENTS.slice(0, Math.min(n, MOMENTS.length)).slice(-4).reverse();
  const last = shown[0] || MOMENTS[0];
  return (
    <div className="ecp" ref={ref} aria-hidden="true">
      <span className="ecp-halo" />
      <div className="ecp-phone">
        <span className="ecp-island" />
        <span className="ecp-time">
          <b>{String(last.h).padStart(2, '0')}:00</b>
          <small>An ordinary day</small>
        </span>
        <div className="ecp-stack">
          {shown.map((m) => (
            <span key={m.h} className="ecp-note">
              <span className="ecp-app">
                <Icon name={m.icon} size={16} />
              </span>
              <span className="ecp-txt">
                <b>
                  Turn2Opinion · {m.t}
                  <em>now</em>
                </b>
                <small>{m.q}</small>
              </span>
              <span className="ecp-pts">+pts</span>
            </span>
          ))}
        </div>
        <span className="ecp-home" />
      </div>
      <span className="ecp-chip c1">
        <Icon name="clock" size={14} /> 5–20 min
      </span>
      <span className="ecp-chip c2">
        <Icon name="lock" size={14} /> No name attached
      </span>
      <span className="ecp-chip c3">
        <Icon name="gift" size={14} /> Reward shown first
      </span>
    </div>
  );
}

// Round 12: the week as a wall of instant photos. Each one turns over to show the survey it matches.
const SNAP_ICON = ['cookie', 'plane', 'phone', 'play', 'bag', 'paw', 'cap', 'game'];
const SNAP_DAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sun'];
function SnapWall() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <ul className={`ecw ${inView ? 'is-in' : ''}`} ref={ref}>
      {RECEIPT.map(([a, b], k) => (
        <li key={a} style={{ '--k': k, '--r': `${((k * 37) % 9) - 4}deg` }}>
          <button type="button" className="ecw-card" aria-label={`${a}: ${b}`}>
            <span className="ecw-front">
              <span className="ecw-pic" style={{ '--h': (k * 47) % 360 }}>
                <Icon name={SNAP_ICON[k]} size={34} />
              </span>
              <span className="ecw-cap">{a}</span>
              <small>{SNAP_DAY[k]}</small>
            </span>
            <span className="ecw-back">
              <Icon name="clipboard" size={20} />
              <b>{b}</b>
              <small>A real kind of study, matched by your profile</small>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Vending() {
  const [india, setIndia] = useState(false);
  const allowed = methodsFor(india ? 'IN' : 'US');
  const [pick, setPick] = useState(null);
  const chosen = REWARDS.find((r) => r.id === pick);
  return (
    <div className="ec-vend">
      <div className="ec-vend-glass">
        {REWARDS.map((r, k) => {
          const off = !allowed.includes(r.name);
          return (
            <button
              key={r.id}
              type="button"
              className={`ec-slot ${pick === r.id ? 'is-on' : ''} ${off ? 'is-off' : ''}`}
              style={{ '--c1': r.c1, '--c2': r.c2, '--k': k }}
              disabled={off}
              aria-pressed={pick === r.id}
              onClick={() => setPick(r.id)}
            >
              <span className="ec-slot-item">
                <Icon name={r.icon} size={24} />
              </span>
              <b>{r.short}</b>
              <small>{off ? 'India only' : `A${k + 1}`}</small>
            </button>
          );
        })}
      </div>
      <div className="ec-vend-side">
        <div className="ec-vend-screen" aria-live="polite">
          {chosen ? (
            <>
              <b>{chosen.name}</b>
              <span>{chosen.line}</span>
            </>
          ) : (
            <>
              <b>Pick a slot</b>
              <span>Tap any reward to see how it reaches you.</span>
            </>
          )}
        </div>
        <div className="ec-vend-where" role="group" aria-label="Where do you live?">
          <button type="button" aria-pressed={!india} className={!india ? 'is-on' : ''} onClick={() => setIndia(false)}>
            Outside India · {methodsFor('US').length}
          </button>
          <button type="button" aria-pressed={india} className={india ? 'is-on' : ''} onClick={() => setIndia(true)}>
            India · {methodsFor('IN').length}
          </button>
        </div>
        <span className={`ec-vend-tray ${chosen ? 'is-drop' : ''}`} key={pick || 'none'} aria-hidden="true">
          {chosen && <Icon name={chosen.icon} size={22} />}
        </span>
      </div>
    </div>
  );
}

export default function EarnConsumers() {
  const ref = useReveal();
  const [towerRef, towersIn] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className="ec-page">
      {/* 1. HERO */}
      <section className="ec-hero">
        <span className="ec-hero-glow" aria-hidden="true" />
        <span className="ec-clouds" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="wrap ec-hero-grid">
          <div className="ec-hero-copy">
            <Breadcrumbs items={[{ label: 'Earn', to: '/paid-surveys/' }, { label: 'Consumers' }]} />
            <p className="ec-kicker">
              <Icon name="bag" size={15} /> Earn · Consumers
            </p>
            <h1>
              Your ordinary day
              <span>is worth more than you think.</span>
            </h1>
            <p className="ec-lead">
              The breakfast you pick, the show you finish, the cart you abandon at midnight. Brands are guessing why. You already know. Tell them, and Turn2Opinion turns every
              finished survey into points you can redeem.
            </p>
            <div className="ec-actions">
              <Link to="/join/" className="btn btn-primary btn-lg btn-shimmer">
                Join free as a consumer <Icon name="arrow" size={18} />
              </Link>
              <a href="#ec-receipt" className="ec-textlink">
                See a week of surveys <Icon name="arrow" size={15} />
              </a>
            </div>
            <ul className="ec-facts">
              <li>
                <b>18+</b> everyday adults
              </li>
              <li>
                <b>55</b> countries
              </li>
              <li>
                <b>{REWARDS.length}</b> ways to get paid
              </li>
            </ul>
          </div>
          <InvitePhone />
        </div>
      </section>

      {/* 2. RECEIPT */}
      <section className="section ec-receipt-sec" id="ec-receipt" aria-labelledby="ec-r-h">
        <div className="wrap ec-split">
          <div data-reveal>
            <p className="ec-kicker is-dark">One ordinary week</p>
            <h2 id="ec-r-h">Things you did anyway. Surveys you could have taken.</h2>
            <p>
              Consumer research is about real life, not expertise. If you shop, eat, scroll, travel, play or look after someone, a company somewhere is trying to understand
              exactly that. Your profile tells us which of those studies to send your way.
            </p>
            <p className="ec-note">
              <Icon name="check" size={16} /> Every invitation shows the topic, the time it takes and the reward before you start.
            </p>
            <p className="ec-note">
              <Icon name="finger" size={16} /> Tap a photo to turn it over.
            </p>
          </div>
          <SnapWall />
        </div>
      </section>

      {/* 3. SHELF */}
      <section className="section ec-shelf-sec" aria-labelledby="ec-s-h">
        <div className="wrap">
          <div className="ec-head" data-reveal>
            <p className="ec-kicker is-dark">Who’s on the shelf</p>
            <h2 id="ec-s-h">Every kind of everyday expert</h2>
            <p>No CV needed. Your habits are the qualification.</p>
          </div>
          <div className="ec-shelf" data-reveal>
            {SHELF.map((p, k) => (
              <figure key={p.who} className="ec-item" style={{ '--c': p.c, '--k': k }}>
                <span className="ec-item-box">
                  <img src={asset(`/images/people/${p.img}.svg`)} alt="" width="120" height="144" loading="lazy" />
                </span>
                <figcaption className="ec-tag">
                  <b>{p.who}</b>
                  <small>{p.tag}</small>
                </figcaption>
              </figure>
            ))}
            <span className="ec-plank" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 3b. PROFILE CHAPTERS */}
      <section className="section xm-sec xm-binder-sec" aria-labelledby="xm-b-h">
        <div className="wrap">
          <div className="xm-head" data-reveal>
            <p className="xm-kicker" style={{ '--xk': '#c77700' }}>
              <Icon name="layers" size={14} /> Your member profile
            </p>
            <h2 id="xm-b-h">Your profile, one chapter at a time</h2>
            <p>
              After sign-up your dashboard opens a profile split into chapters. Each one describes a part of everyday life, and together they decide which surveys reach
              you. Pick a chapter to see what it asks and the kind of research it can open.
            </p>
          </div>
          <ConsumerChapters />
        </div>
      </section>

      {/* 3c. MATCHING */}
      <section className="section xm-sec xm-sonar-sec" aria-labelledby="xm-s-h">
        <div className="wrap">
          <div className="xm-head" data-reveal>
            <p className="xm-kicker">
              <Icon name="target" size={14} /> Matching
            </p>
            <h2 id="xm-s-h">How an invitation finds you</h2>
            <p>Nobody browses a list of names. A study describes the kind of person it needs, and your profile answers decide whether that person is you.</p>
          </div>
          <MatchSonar />
        </div>
      </section>

      {/* 4. TOWERS */}
      <section className="section ec-tower-sec" aria-labelledby="ec-t-h">
        <div className="wrap">
          <div className="ec-head is-center" data-reveal>
            <p className="ec-kicker">How points add up</p>
            <h2 id="ec-t-h">Two ways in, one balance out</h2>
          </div>
          <div className={`ecx ${towersIn ? 'is-on' : ''}`} ref={towerRef}>
            {/* way in 1: profile sections tick off one by one */}
            <div className="ecx-card is-profile" style={{ '--c': TOWERS[0].c }}>
              <span className="ecx-tag">Way in · 1</span>
              <div className="ecx-vis" aria-hidden="true">
                {['About you', 'Home & family', 'Work & study', 'Shopping'].map((l, j) => (
                  <span key={l} className="ecx-row" style={{ '--j': j }}>
                    <i className="ecx-tick">
                      <Icon name="check" size={11} strokeWidth={3} />
                    </i>
                    <em>{l}</em>
                    <b className="ecx-plus">+ pts</b>
                  </span>
                ))}
              </div>
              <span className="ecx-ico">
                <Icon name="user" size={20} />
              </span>
              <h3>{TOWERS[0].t}</h3>
              <p>{TOWERS[0].d}</p>
            </div>
            <span className="ecx-op" aria-hidden="true">
              +
            </span>
            {/* way in 2: survey tickets slide in, each shows its length and reward first */}
            <div className="ecx-card is-survey" style={{ '--c': TOWERS[1].c }}>
              <span className="ecx-tag">Way in · 2</span>
              <div className="ecx-vis" aria-hidden="true">
                {[
                  ['Snacks & drinks', 6],
                  ['Phone plans', 12],
                  ['Streaming habits', 9]
                ].map(([l, m], j) => (
                  <span key={l} className="ecx-ticket" style={{ '--j': j }}>
                    <Icon name="clipboard" size={14} />
                    <em>{l}</em>
                    <small>
                      <Icon name="clock" size={11} /> {m} min
                    </small>
                    <b className="ecx-plus">+ pts</b>
                  </span>
                ))}
              </div>
              <span className="ecx-ico">
                <Icon name="clipboard" size={20} />
              </span>
              <h3>{TOWERS[1].t}</h3>
              <p>{TOWERS[1].d}</p>
            </div>
            <span className="ecx-op is-eq" aria-hidden="true">
              =
            </span>
            {/* one balance out: the jar fills to the redeem line */}
            <div className="ecx-card is-jar" style={{ '--c': TOWERS[2].c }}>
              <span className="ecx-tag">One balance out</span>
              <div className="ecx-vis" aria-hidden="true">
                <span className="ecx-glass">
                  <span className="ecx-fill" />
                  <span className="ecx-line">
                    <b>Redeem</b>
                  </span>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <i key={j} className="ecx-coin" style={{ '--j': j }} />
                  ))}
                </span>
                <span className="ecx-outs">
                  {['PayPal', 'Bank', 'Vouchers', 'Gift cards'].map((o) => (
                    <i key={o}>{o}</i>
                  ))}
                </span>
              </div>
              <span className="ecx-ico">
                <Icon name="wallet" size={20} />
              </span>
              <h3>{TOWERS[2].t}</h3>
              <p>{TOWERS[2].d}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VENDING */}
      <section className="section ec-vend-sec" aria-labelledby="ec-v-h">
        <div className="wrap ec-split is-rev">
          <div data-reveal>
            <p className="ec-kicker is-dark">Redeem your way</p>
            <h2 id="ec-v-h">Seven slots. You press the button.</h2>
            <p>
              PayPal, bank or wire transfer, shopping and grocery vouchers, digital gift cards, and UPI if you live in India. Pick whatever suits you this time
              and something else next time.
            </p>
          </div>
          <Vending />
        </div>
      </section>

      {/* 5b. STRAIGHT TALK */}
      <section className="section xm-sec xm-talk-sec" aria-labelledby="xm-t-h">
        <div className="wrap">
          <div className="xm-head" data-reveal>
            <p className="xm-kicker" style={{ '--xk': '#0e7c66' }}>
              <Icon name="shield" size={14} /> Before you join
            </p>
            <h2 id="xm-t-h">Straight talk about paid surveys</h2>
            <p>Surveys are a way to earn a little extra for opinions you already have. Here is what that looks like in practice, and the lines we never cross.</p>
          </div>
          <StraightTalk />
        </div>
      </section>

      {/* 6. TICKETS */}
      <section className="section ec-ticket-sec" aria-labelledby="ec-q-h">
        <div className="wrap eca">
          <div className="eca-side">
            <div className="ec-head" data-reveal>
              <p className="ec-kicker is-dark">Straight answers</p>
              <h2 id="ec-q-h">Ask us anything</h2>
              <p className="eca-lead">Tap a question. The answer comes straight back, the same one our live help gives.</p>
            </div>
            <AskChat />
          </div>
        </div>
      </section>

      {/* 7. SUNRISE */}
      <section className="ec-sunrise" aria-labelledby="ec-c-h">
        <span className="ec-sunrise-sun" aria-hidden="true" />
        <div className="wrap" data-reveal>
          <h2 id="ec-c-h">Tomorrow is full of opinions. Get paid for a few.</h2>
          <p>Free to join, two minutes to sign up, and nothing to buy, ever.</p>
          <div className="ec-actions is-center">
            <Link to="/join/" className="btn btn-primary btn-lg">
              Create my free account <Icon name="arrow" size={18} />
            </Link>
            <Link to="/earn/who-can-join/" className="ec-textlink is-light">
              Check who can join <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
