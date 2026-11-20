// /earn/minors/ — Earn menu, page 3 of 4: the teen panel for ages 13 to 17 (round 10, Kunal 20 Nov 2026).
//
// Content source: Kunal's teen onboarding files (parent onboarding v1.1.0 and teen profiles v1.1.0),
// retold in the Turn2Opinion voice. The facts kept from them: a parent or legal guardian registers and
// gives permission first (about five minutes, verified), the teen then gives their own yes, and the
// account only switches on when both are done; a parent's yes never overrides the teen's no; every
// study is age-checked; skip or stop any time; recordings and sensitive topics need separate permission;
// only necessary data; 13 profile channels worth 100 points each; parents see three sections of their own.
//
// World: "sticker book". Candy pink, mint and lemon on the Turn2Opinion royal blue.
//   1. HERO        a phone that tunes through the profile channels, with stickers orbiting it
//   2. TWO KEYS    a padlock that opens only when the parent key and the teen key both turn
//   3. BOARD GAME  the onboarding steps as squares on a winding game board, a token hopping along
//   4. CHANNELS    the 13 profile channels as a TV grid you can "tune"
//   5. STICKERS    our promises as a peelable sticker sheet
//   6. PARENTS     the grown-up corner: calm navy and mint, what parents see and control
//   7. CLOSER      two doors, one for teens and one for parents
import { useEffect, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { prefersReducedMotion, useInView, useReveal } from '../hooks/useMounted.js';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';

const CHANNELS = [
  { e: '👋', t: 'The basics', d: 'Where you live and the language you want surveys in.' },
  { e: '🎓', t: 'School & learning', d: 'What you study, what you love, how you like to learn it.' },
  { e: '🏡', t: 'Home & family', d: 'Who is at home and what you get a say in.' },
  { e: '📱', t: 'Devices & internet', d: 'Phones, laptops, consoles: what you could answer a survey on.' },
  { e: '💬', t: 'Social & creating', d: 'Where you scroll, what you post, who you actually follow.' },
  { e: '🎮', t: 'Gaming & entertainment', d: 'What you play, what you watch, who you watch it with.' },
  { e: '🛍️', t: 'Shopping & brands', d: 'What you buy, who pays, and how much say you get.' },
  { e: '🍕', t: 'Food & drink', d: 'Snacks, takeaways and what makes you try something new.' },
  { e: '👟', t: 'Fashion & style', d: 'What you wear and who you take cues from.' },
  { e: '⚽', t: 'Sports & hobbies', d: 'Everything you do when you are offline.' },
  { e: '🤖', t: 'Tech & AI', d: 'The apps you keep open and the tech you find exciting.' },
  { e: '🔬', t: 'Taking part', d: 'What kind of research you are up for, and when.' },
  { e: '🧭', t: 'Topics & updates', d: 'Pick your favourite subjects. Two questions, done.' }
];

const STEPS = [
  { who: 'teen', e: '✍️', t: 'You sign up', d: 'Name, email, date of birth. The teen panel is for ages 13 to 17.' },
  { who: 'us', e: '📬', t: 'We invite your parent', d: 'Your parent or guardian gets an email. Nothing is switched on yet.' },
  { who: 'parent', e: '🧑‍🍼', t: 'They tell us who they are', d: 'About five minutes, in one sitting. Only an adult who is legally allowed to say yes can.' },
  { who: 'parent', e: '🔏', t: 'They give permission', d: 'Each permission is a separate box, unticked to start. We verify it before anything goes live.' },
  { who: 'teen', e: '🙋', t: 'You say yes, or no', d: 'A plain-words explanation, then your own decision. Saying no is completely fine.' },
  { who: 'us', e: '🚀', t: 'Your account switches on', d: 'Both keys turned. Start tuning your channels and wait for your first age-checked invite.' }
];

const PROMISES = [
  { e: '🎯', t: 'Age-checked studies', d: 'Every study is reviewed for your age before it can reach you.', c: '#ff5fa2' },
  { e: '🙅', t: 'Your no wins', d: 'A parent’s yes never overrides your no. Not once.', c: '#8b5cf6' },
  { e: '⏭️', t: 'Skip anything', d: 'Any question, any survey. Leave whenever you like, no penalty.', c: '#1f5bff' },
  { e: '🎥', t: 'No surprise recordings', d: 'Audio, video, photos or quotes that show who you are need separate permission first.', c: '#0fb99a' },
  { e: '🧠', t: 'Sensitive means separate', d: 'Health, beliefs and similar topics need their own review and their own yes.', c: '#ff8a3d' },
  { e: '🤏', t: 'Only what we need', d: 'An age band, a country, your answers. No school name or exact location unless truly necessary.', c: '#e8436d' },
  { e: '📊', t: 'You stay in the crowd', d: 'Clients see combined results, not you.', c: '#0596d6' },
  { e: '🎁', t: 'No pressure rewards', d: 'Rewards are explained up front and never used to push you into anything.', c: '#c48a00' },
  { e: '🛑', t: 'Stop any time', d: 'You can leave, and your parent can withdraw permission. Either way, no penalty.', c: '#5b4bd6' },
  { e: '🗑️', t: 'Delete on request', d: 'Ask us to correct or delete your data and we will. We keep nothing longer than needed.', c: '#12a37f' },
  { e: '📩', t: 'Calm inbox', d: 'Invites tell you the topic, time and reward. No flood of messages.', c: '#d6336c' },
  { e: '🌍', t: 'Local rules first', d: 'If your country needs more protection, we follow it, or we don’t enrol.', c: '#2f6bff' }
];

const PARENT = [
  { e: '🏡', t: 'Parenting & household', d: 'Who you are, who is at home and how decisions get made.', n: '≈3 min' },
  { e: '🎁', t: 'Rewards & payouts', d: 'Who receives what your teen earns, and how it reaches you.', n: '≈1 min' },
  { e: '🛡️', t: 'Permissions & oversight', d: 'What you want to approve yourself, and what your teen may decide alone.', n: '≈1 min' }
];

function TunerPhone() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % CHANNELS.length), 1900);
    return () => clearInterval(t);
  }, []);
  const c = CHANNELS[i];
  return (
    <div className="em-phone-wrap" aria-hidden="true">
      <span className="em-orbit">
        {['⭐', '🎧', '🛹', '🎨', '💬', '🏆', '✨', '🎮'].map((s, k) => (
          <i key={k} style={{ '--k': k }}>
            {s}
          </i>
        ))}
      </span>
      <div className="em-phone">
        <span className="em-notch" />
        <p className="em-ph-top">
          <b>Your channels</b>
          <span>
            {i + 1}/{CHANNELS.length}
          </span>
        </p>
        <div className="em-screen" key={i}>
          <span className="em-static" />
          <span className="em-ch-emoji">{c.e}</span>
          <b>{c.t}</b>
          <small>{c.d}</small>
          <span className="em-ch-prize">+100 points</span>
        </div>
        <span className="em-dial">
          {CHANNELS.map((_, k) => (
            <i key={k} className={k === i ? 'is-on' : k < i ? 'is-done' : ''} />
          ))}
        </span>
        <span className="em-rank">
          <Icon name="trophy" size={14} /> Rank: Rookie → Rising voice
        </span>
      </div>
    </div>
  );
}

function TwoKeys() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div className={`em-keys ${inView ? 'is-turning' : ''}`} ref={ref} aria-hidden="true">
      <span className="em-key k-parent">
        <i>🔑</i>
        <b>Parent key</b>
      </span>
      <span className="em-lock">
        <span className="em-shackle" />
        <span className="em-lock-body">
          <span className="em-hole h1" />
          <span className="em-hole h2" />
        </span>
        <span className="em-lock-burst">
          {Array.from({ length: 10 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
      </span>
      <span className="em-key k-teen">
        <i>🗝️</i>
        <b>Your key</b>
      </span>
    </div>
  );
}

function Board() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setAt((n) => (n + 1) % STEPS.length), 2200);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <ol className="em-board" ref={ref} aria-label="How a teen joins, step by step">
      {STEPS.map((s, k) => (
        <li key={s.t} className={`em-sq who-${s.who} ${k === at ? 'is-here' : ''} ${k < at ? 'is-past' : ''}`} style={{ '--k': k }}>
          <span className="em-sq-n">{k + 1}</span>
          <span className="em-sq-e" aria-hidden="true">
            {s.e}
          </span>
          <b>{s.t}</b>
          <small>{s.d}</small>
          <span className="em-sq-who">{s.who === 'teen' ? 'You' : s.who === 'parent' ? 'Parent or guardian' : 'Turn2Opinion'}</span>
          {k === at && (
            <span className="em-token" aria-hidden="true">
              ⭐
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ChannelGrid() {
  const [tuned, setTuned] = useState(() => new Set());
  const toggle = (k) =>
    setTuned((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  return (
    <>
      <p className="em-tally" aria-live="polite">
        <b>{tuned.size}</b> / {CHANNELS.length} tuned · <b>{tuned.size * 100}</b> preview points
      </p>
      <div className="em-tv">
        {CHANNELS.map((c, k) => (
          <button key={c.t} type="button" className={`em-tile ${tuned.has(k) ? 'is-tuned' : ''}`} style={{ '--k': k }} aria-pressed={tuned.has(k)} onClick={() => toggle(k)}>
            <span className="em-tile-no">CH {String(k + 1).padStart(2, '0')}</span>
            <span className="em-tile-e" aria-hidden="true">
              {c.e}
            </span>
            <b>{c.t}</b>
            <small>{c.d}</small>
            <span className="em-tile-state">{tuned.has(k) ? '✓ Tuned · +100' : 'Tap to tune'}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default function EarnMinors() {
  const ref = useReveal();
  return (
    <div ref={ref} className="em-page">
      {/* 1. HERO */}
      <section className="em-hero">
        <span className="em-confetti" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
        <div className="wrap em-hero-grid">
          <div className="em-hero-copy">
            <Breadcrumbs items={[{ label: 'Earn', to: '/paid-surveys/' }, { label: 'Minors (13–17)' }]} />
            <p className="em-new">
              <span>✦ Recently introduced</span> Teen panel · ages 13–17
            </p>
            <h1>
              <span className="em-h-1">Your say.</span> <span className="em-h-2">Your rules.</span> <span className="em-h-3">Parent-approved.</span>
            </h1>
            <p className="em-lead">
              Brands are building games, apps, snacks and trainers for you, so they should hear from you. Our new teen panel gives 13 to 17 year olds a safe, age-checked
              place to share what they think, with a parent or guardian on board from the very first step.
            </p>
            <div className="em-actions">
              <Link to="/join/minor/" className="btn btn-lg em-btn-pop">
                I’m a teen, let me in <Icon name="arrow" size={18} />
              </Link>
              <a href="#em-parents" className="em-btn-soft">
                I’m a parent <Icon name="users" size={16} />
              </a>
            </div>
            <ul className="em-chips">
              <li>🔑 Two keys to start</li>
              <li>⏭️ Skip anything</li>
              <li>📺 13 channels · +100 each</li>
            </ul>
          </div>
          <TunerPhone />
        </div>
        <svg className="em-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50 Q 120 10 240 50 T 480 50 T 720 50 T 960 50 T 1200 50 T 1440 50 V90 H0Z" />
        </svg>
      </section>

      {/* 2. TWO KEYS */}
      <section className="section em-keys-sec" aria-labelledby="em-k-h">
        <div className="wrap em-split">
          <div data-reveal>
            <p className="em-kicker">The golden rule</p>
            <h2 id="em-k-h">Two keys. Both have to turn.</h2>
            <p>
              Your parent or guardian holds one key: their permission, which we verify. You hold the other: your own yes, in your own words. The account stays locked until
              both turn, and every individual study still asks you again.
            </p>
            <p className="em-quote">“Giving parental permission never means a teen has to take part in any particular survey.”</p>
          </div>
          <div data-reveal>
            <TwoKeys />
          </div>
        </div>
      </section>

      {/* 3. BOARD GAME */}
      <section className="section em-board-sec" aria-labelledby="em-b-h">
        <div className="wrap">
          <div className="em-head" data-reveal>
            <p className="em-kicker">How joining works</p>
            <h2 id="em-b-h">Six squares from sign-up to your first survey</h2>
            <p>
              <span className="em-leg who-teen">You</span> <span className="em-leg who-parent">Parent or guardian</span> <span className="em-leg who-us">Turn2Opinion</span>
            </p>
          </div>
          <Board />
        </div>
      </section>

      {/* 4. CHANNELS */}
      <section className="section em-tv-sec" aria-labelledby="em-c-h">
        <div className="wrap">
          <div className="em-head is-light" data-reveal>
            <p className="em-kicker">Your profile, your channels</p>
            <h2 id="em-c-h">Thirteen channels to tune in</h2>
            <p>Each channel is a short set of questions about one part of your life. Finish one and win 100 points, and surveys start matching you far better. Start anywhere.</p>
          </div>
          <ChannelGrid />
          <p className="em-small">Preview only: tuning here does not save anything. Your real channels open after both keys have turned.</p>
        </div>
      </section>

      {/* 5. STICKERS */}
      <section className="section em-sticker-sec" aria-labelledby="em-s-h">
        <div className="wrap">
          <div className="em-head" data-reveal>
            <p className="em-kicker">Our promises</p>
            <h2 id="em-s-h">A sticker sheet of things we will always do</h2>
          </div>
          <ul className="em-sheet">
            {PROMISES.map((p, k) => (
              <li key={p.t} className="em-sticker" style={{ '--c': p.c, '--k': k, '--r': `${((k * 7) % 9) - 4}deg` }} data-reveal>
                <span className="em-st-e" aria-hidden="true">
                  {p.e}
                </span>
                <b>{p.t}</b>
                <small>{p.d}</small>
                <span className="em-peel" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. PARENTS */}
      <section className="section em-parent-sec" id="em-parents" aria-labelledby="em-p-h">
        <div className="wrap em-split">
          <div data-reveal>
            <p className="em-kicker is-mint">For parents and guardians</p>
            <h2 id="em-p-h">You stay in the loop, without reading over their shoulder</h2>
            <p>
              When your teen signs up, we email you. You tell us who you are, confirm you are legally able to give permission, and choose exactly what you agree to. Nothing
              is switched on until you say yes, and you can withdraw at any time.
            </p>
            <ul className="em-parent-list">
              <li>
                <Icon name="check" size={15} /> Your own three sections come first, and only you can change them.
              </li>
              <li>
                <Icon name="check" size={15} /> You can open your teen’s channels and read what they answered.
              </li>
              <li>
                <Icon name="check" size={15} /> Rewards can be paid to you, and you choose how.
              </li>
              <li>
                <Icon name="check" size={15} /> Three optional health questions help us keep unsuitable studies away. “Prefer not to say” is always an option.
              </li>
              <li>
                <Icon name="check" size={15} /> Download a PDF copy of everything you agreed to.
              </li>
            </ul>
          </div>
          <div className="em-dash" data-reveal aria-label="What the parent view contains">
            <p className="em-dash-top">
              <span className="em-dot" /> Parent view · Aarav, 15
            </p>
            {PARENT.map((p, k) => (
              <div key={p.t} className="em-dash-row" style={{ '--k': k }}>
                <span className="em-dash-e" aria-hidden="true">
                  {p.e}
                </span>
                <span>
                  <b>{p.t}</b>
                  <small>{p.d}</small>
                </span>
                <em>{p.n}</em>
              </div>
            ))}
            <div className="em-dash-foot">
              <span>
                <Icon name="shield" size={15} /> Permission verified
              </span>
              <span>
                <Icon name="eye" size={15} /> 13 teen channels · read only
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLOSER */}
      <section className="em-closer" aria-labelledby="em-x-h">
        <div className="wrap">
          <h2 id="em-x-h" data-reveal>
            Pick your door
          </h2>
          <div className="em-doors">
            <Link to="/join/minor/" className="em-door is-teen" data-reveal>
              <span className="em-door-e" aria-hidden="true">
                🙋
              </span>
              <b>I’m 13 to 17</b>
              <small>Sign up now. We’ll invite your parent or guardian for you.</small>
              <span className="em-door-go">
                Start <Icon name="arrow" size={16} />
              </span>
            </Link>
            <Link to="/contact/" className="em-door is-parent" data-reveal>
              <span className="em-door-e" aria-hidden="true">
                🧑‍🍼
              </span>
              <b>I’m a parent or guardian</b>
              <small>Questions before you say yes? Talk to a real person, any time.</small>
              <span className="em-door-go">
                Ask us <Icon name="arrow" size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
