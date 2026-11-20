// /earn/consumers/ — Earn menu, page 1 of 4 (round 10, Kunal 20 Nov 2026).
//
// World: "sunrise sky". Turn2Opinion royal blue with sunshine yellow and a coral accent.
// Every section has its own metaphor so nothing here repeats the other three Earn pages:
//   1. HERO        a 24-hour day dial: a sun travels the clock and lights up everyday moments
//   2. RECEIPT     an "opinion receipt" that prints the moments of a normal day as line items
//   3. SHELF       who is in the consumer panel, as products on a shop shelf with price tags
//   4. TOWER       how points stack: three coin towers that grow when scrolled into view
//   5. VENDING     the eight ways to cash out, as a vending machine (UPI only in India)
//   6. TICKETS     straight answers on tear-off raffle tickets
//   7. SUNRISE     the closing call to action
import { useState } from 'react';
import { Link } from '../router/Router.jsx';
import { useInView, useReveal } from '../hooks/useMounted.js';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { asset } from '../config/env.js';
import { REWARDS, methodsFor } from '../data/payouts.js';

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
  { h: 0.65, t: 'Your balance', d: 'Points add up in your dashboard. Cash out when you reach the threshold.', c: '#ffb020' }
];

const TICKETS = [
  ['Does it cost anything?', 'Nothing, ever. If anyone asks you to pay to join Turn2Opinion, it is not us.'],
  ['How often will I get invites?', 'It depends on your profile and what research is running. Fuller profiles get matched more often.'],
  ['What if I screen out?', 'Some surveys look for very specific people. If you don’t fit, you find out early and move on to the next one.'],
  ['Who sees my answers?', 'Researchers see combined results. Your name is never attached to what you say.']
];

function DayDial() {
  return (
    <div className="ec-dial" aria-hidden="true">
      <span className="ec-dial-sky" />
      <span className="ec-dial-face">
        {Array.from({ length: 24 }).map((_, k) => (
          <i key={k} className={k % 6 === 0 ? 'is-major' : ''} style={{ '--h': k }} />
        ))}
      </span>
      <span className="ec-dial-hand">
        <span className="ec-sun" />
      </span>
      {MOMENTS.map((m, k) => (
        <span key={m.h} className="ec-moment" style={{ '--h': m.h, '--k': k }}>
          <span className="ec-moment-ico">
            <Icon name={m.icon} size={18} />
          </span>
        </span>
      ))}
      <span className="ec-dial-core">
        <span className="ec-core-idle">
          <b>24h</b>
          <small>of opinions</small>
        </span>
        {MOMENTS.map((m) => (
          <span key={m.h} className="ec-moment-card" style={{ '--h': m.h }}>
            <b>
              {String(m.h).padStart(2, '0')}:00 · {m.t}
            </b>
            <small>{m.q}</small>
          </span>
        ))}
      </span>
    </div>
  );
}

function Receipt() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div className={`ec-receipt ${inView ? 'is-printing' : ''}`} ref={ref}>
      <span className="ec-printer" aria-hidden="true">
        <i />
      </span>
      <div className="ec-paper">
        <p className="ec-r-head">
          <b>TURN2OPINION</b>
          <small>Receipt for one ordinary week</small>
        </p>
        <ul>
          {RECEIPT.map(([a, b], k) => (
            <li key={a} style={{ '--k': k }}>
              <span>{a}</span>
              <i aria-hidden="true" />
              <em>{b}</em>
            </li>
          ))}
        </ul>
        <p className="ec-r-total">
          <span>Cost to you</span>
          <b>0.00</b>
        </p>
        <p className="ec-r-total is-earn">
          <span>Paid to you</span>
          <b>Points for every completed survey</b>
        </p>
        <p className="ec-r-foot">Thank you for your opinion. Please come again.</p>
      </div>
    </div>
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
            Outside India · 7
          </button>
          <button type="button" aria-pressed={india} className={india ? 'is-on' : ''} onClick={() => setIndia(true)}>
            India · 8
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
              finished survey into points you can cash out.
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
                <b>8</b> ways to get paid
              </li>
            </ul>
          </div>
          <DayDial />
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
          </div>
          <Receipt />
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

      {/* 4. TOWERS */}
      <section className="section ec-tower-sec" aria-labelledby="ec-t-h">
        <div className="wrap">
          <div className="ec-head is-center" data-reveal>
            <p className="ec-kicker">How points stack up</p>
            <h2 id="ec-t-h">Two ways in, one balance out</h2>
          </div>
          <div className={`ec-towers ${towersIn ? 'is-up' : ''}`} ref={towerRef}>
            {TOWERS.map((t, k) => (
              <div key={t.t} className="ec-tower" style={{ '--h': t.h, '--c': t.c, '--k': k }}>
                <span className="ec-stack" aria-hidden="true">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <i key={j} style={{ '--j': j }} />
                  ))}
                </span>
                <b>{t.t}</b>
                <p>{t.d}</p>
                {k < 2 && (
                  <span className="ec-plus" aria-hidden="true">
                    {k === 0 ? '+' : '='}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VENDING */}
      <section className="section ec-vend-sec" aria-labelledby="ec-v-h">
        <div className="wrap ec-split is-rev">
          <div data-reveal>
            <p className="ec-kicker is-dark">Cash out your way</p>
            <h2 id="ec-v-h">Eight slots. You press the button.</h2>
            <p>
              PayPal, bank or wire transfer, shopping and grocery vouchers, digital gift cards, and cash rewards or UPI if you live in India. Pick whatever suits you this time
              and something else next time.
            </p>
          </div>
          <Vending />
        </div>
      </section>

      {/* 6. TICKETS */}
      <section className="section ec-ticket-sec" aria-labelledby="ec-q-h">
        <div className="wrap">
          <div className="ec-head" data-reveal>
            <p className="ec-kicker is-dark">Straight answers</p>
            <h2 id="ec-q-h">Tear off a question</h2>
          </div>
          <div className="ec-tickets">
            {TICKETS.map(([q, a], k) => (
              <details key={q} className="ec-ticket" style={{ '--k': k }} data-reveal>
                <summary>
                  <span className="ec-ticket-no">No. {String(k + 1).padStart(3, '0')}</span>
                  {q}
                </summary>
                <p>{a}</p>
              </details>
            ))}
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
