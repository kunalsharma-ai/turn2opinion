// /earn/teens/ — Earn menu, page 3 of 4: the teen panel for ages 13 to 17 (round 10, Kunal 20 Nov 2026).
//
// Content source: Kunal's teen onboarding files (parent onboarding v1.1.0 and teen profiles v1.1.0),
// retold in the Turn2Opinion voice. The facts kept from them: a parent or legal guardian registers and
// gives permission first (about five minutes, verified), the teen then gives their own yes, and the
// account only switches on when both are done; a parent's yes never overrides the teen's no; every
// study is age-checked; skip or stop any time; recordings and sensitive topics need separate permission;
// only necessary data; 13 profile channels worth 100 points each; parents see three sections of their own.
//
// World (Round 10b, Kunal 20 Nov 2026): "After dark", the same neon grade as the Minors slide of the home
// hero. Night violet with magenta, cyan and lime light; the parents' corner is a calmer mint.
//   1. HERO        a mixtape: reels spin while the tracklist plays through the 13 profile channels
//   2. TWO KEYS    a round vault door that only swings open when both key slots light up
//   3. LEVELS      the onboarding steps as an arcade "level select" map, one level at a time
//   4. CHANNELS    the 13 profile channels as a mixing desk: push a fader up to tune a channel
//   5. PROMISES    our promises as neon signs that flicker on
//   6. PARENTS     the grown-up corner: a calm night-mode dashboard of what parents see and control
//   7. CLOSER      two arcade buttons, Player 1 (teens) and Player 2 (parents)
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

const SHORT = ['Basics', 'School', 'Home', 'Devices', 'Social', 'Gaming', 'Shopping', 'Food', 'Style', 'Sports', 'Tech & AI', 'Research', 'Topics'];

function Mixtape() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % CHANNELS.length), 2100);
    return () => clearInterval(t);
  }, []);
  const view = [-1, 0, 1, 2].map((d) => (i + d + CHANNELS.length) % CHANNELS.length);
  return (
    <div className="mn-tape-wrap" aria-hidden="true">
      <span className="mn-sunring" />
      <div className="mn-tape">
        <span className="mn-tape-label">
          <b>Teen panel · Side A</b>
          <small>13 channels · +100 each</small>
        </span>
        <span className="mn-reels">
          <span className="mn-reel l">
            {Array.from({ length: 6 }).map((_, k) => (
              <i key={k} style={{ '--k': k }} />
            ))}
          </span>
          <span className="mn-window">
            <span className="mn-ribbon" />
          </span>
          <span className="mn-reel r">
            {Array.from({ length: 6 }).map((_, k) => (
              <i key={k} style={{ '--k': k }} />
            ))}
          </span>
        </span>
        <span className="mn-screws">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <ol className="mn-tracks">
        {view.map((k, row) => (
          <li key={`${k}-${i}`} className={row === 1 ? 'is-now' : row === 0 ? 'is-done' : ''}>
            <span className="mn-tn">{String(k + 1).padStart(2, '0')}</span>
            <span className="mn-te">{CHANNELS[k].e}</span>
            <b>{CHANNELS[k].t}</b>
            <em>{row === 0 ? '✓ +100' : row === 1 ? 'Now playing' : '+100'}</em>
          </li>
        ))}
      </ol>
      <span className="mn-eq">
        {Array.from({ length: 16 }).map((_, k) => (
          <i key={k} style={{ '--k': k }} />
        ))}
      </span>
    </div>
  );
}

function Vault() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div className={`mn-vault ${inView ? 'is-open' : ''}`} ref={ref} aria-hidden="true">
      <span className="mn-slot s-parent">
        <i>🔑</i>
        <b>Parent key</b>
        <small>Permission, verified</small>
      </span>
      <span className="mn-door">
        <span className="mn-door-ring">
          {Array.from({ length: 12 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
        <span className="mn-door-face">
          <span className="mn-wheel">
            <i />
            <i />
            <i />
          </span>
        </span>
        <span className="mn-door-inside">
          <b>Unlocked</b>
          <small>Your account switches on</small>
        </span>
      </span>
      <span className="mn-slot s-teen">
        <i>🗝️</i>
        <b>Your key</b>
        <small>Your own yes</small>
      </span>
    </div>
  );
}

function Levels() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [at, setAt] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!inView || held || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setAt((n) => (n + 1) % STEPS.length), 2600);
    return () => clearInterval(t);
  }, [inView, held]);
  const s = STEPS[at];
  const who = s.who === 'teen' ? 'You' : s.who === 'parent' ? 'Parent or guardian' : 'Turn2Opinion';
  return (
    <div className="mn-levels" ref={ref}>
      <svg className="mn-path" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M40 120 C 140 20, 220 20, 300 80 S 460 150, 540 80 S 700 10, 780 70 S 900 140, 960 60" pathLength="100" />
        <path className="lit" d="M40 120 C 140 20, 220 20, 300 80 S 460 150, 540 80 S 700 10, 780 70 S 900 140, 960 60" pathLength="100" style={{ '--p': (at + 1) / STEPS.length }} />
      </svg>
      <ol className="mn-nodes" aria-label="How a teen joins, level by level">
        {STEPS.map((x, k) => (
          <li key={x.t} className={`who-${x.who} ${k === at ? 'is-here' : ''} ${k < at ? 'is-past' : ''}`} style={{ '--k': k }}>
            <button type="button" aria-pressed={k === at} onClick={() => { setAt(k); setHeld(true); }}>
              <span className="mn-node-e" aria-hidden="true">
                {x.e}
              </span>
              <span className="mn-node-n">LVL {k + 1}</span>
              <span className="sr-only">{x.t}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className={`mn-level-card who-${s.who}`} key={at} aria-live="polite">
        <span className="mn-level-no">Level {at + 1} of {STEPS.length}</span>
        <h3>{s.t}</h3>
        <p>{s.d}</p>
        <span className="mn-level-who">{who}</span>
      </div>
    </div>
  );
}

function Mixer() {
  const [tuned, setTuned] = useState(() => new Set());
  const [last, setLast] = useState(0);
  const toggle = (k) => {
    setLast(k);
    setTuned((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };
  const c = CHANNELS[last];
  return (
    <div className="mn-desk">
      <div className="mn-display" aria-live="polite">
        <span className="mn-disp-e" aria-hidden="true">
          {c.e}
        </span>
        <span>
          <b>
            CH {String(last + 1).padStart(2, '0')} · {c.t}
          </b>
          <small>{c.d}</small>
        </span>
        <span className="mn-tally">
          <b>{tuned.size}</b>/{CHANNELS.length} tuned · <b>{tuned.size * 100}</b> pts
        </span>
      </div>
      <div className="mn-faders">
        {CHANNELS.map((x, k) => (
          <button key={x.t} type="button" className={`mn-fader ${tuned.has(k) ? 'is-up' : ''}`} style={{ '--k': k }} aria-pressed={tuned.has(k)} aria-label={`${x.t}: ${tuned.has(k) ? 'tuned' : 'tap to tune'}`} onClick={() => toggle(k)}>
            <span className="mn-leds" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, j) => (
                <i key={j} style={{ '--j': j }} />
              ))}
            </span>
            <span className="mn-track" aria-hidden="true">
              <span className="mn-knob" />
            </span>
            <span className="mn-fe" aria-hidden="true">
              {x.e}
            </span>
            <span className="mn-fl">{SHORT[k]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EarnMinors() {
  const ref = useReveal();
  return (
    <div ref={ref} className="mn-page">
      {/* 1. HERO */}
      <section className="mn-hero">
        <span className="mn-floor" aria-hidden="true" />
        <span className="mn-stars" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
        <div className="wrap mn-hero-grid">
          <div className="mn-hero-copy">
            <Breadcrumbs items={[{ label: 'Earn', to: '/paid-surveys/' }, { label: 'Teens (13–17)' }]} />
            <p className="mn-new">
              <span>✦ Recently introduced</span> Teen panel · ages 13–17
            </p>
            <h1>
              <span className="mn-h-1">Your taste sets the trend.</span> <span className="mn-h-2">Now it earns points.</span>
            </h1>
            <p className="mn-lead">
              The playlists you build, the games you stay up for, the snacks you swear by. Brands spend a fortune guessing what 13 to 17 year olds think. On the Turn2Opinion
              teen panel you just tell them, with a parent or guardian on board from the very first step.
            </p>
            <div className="mn-actions">
              <Link to="/join/teen/" className="btn btn-lg mn-btn-glow">
                Press start <Icon name="arrow" size={18} />
              </Link>
              <a href="#mn-parents" className="mn-btn-line">
                I’m a parent <Icon name="users" size={16} />
              </a>
            </div>
            <ul className="mn-chips">
              <li>🔑 Two keys to start</li>
              <li>⏭️ Skip anything</li>
              <li>🎛️ 13 channels · +100 each</li>
            </ul>
          </div>
          <Mixtape />
        </div>
      </section>

      {/* 2. TWO KEYS */}
      <section className="section mn-keys-sec" aria-labelledby="mn-k-h">
        <div className="wrap mn-split">
          <div data-reveal>
            <p className="mn-kicker">The golden rule</p>
            <h2 id="mn-k-h">One vault. Two keys. Both have to turn.</h2>
            <p>
              Your parent or guardian holds one key: their permission, which we verify. You hold the other: your own yes, in your own words. The door stays shut until both
              light up, and every single study still asks you again.
            </p>
            <p className="mn-quote">“Giving parental permission never means a teen has to take part in any particular survey.”</p>
          </div>
          <div data-reveal>
            <Vault />
          </div>
        </div>
      </section>

      {/* 3. LEVELS */}
      <section className="section mn-levels-sec" aria-labelledby="mn-b-h">
        <div className="wrap">
          <div className="mn-head" data-reveal>
            <p className="mn-kicker is-cyan">Level select</p>
            <h2 id="mn-b-h">Six levels from sign-up to your first survey</h2>
            <p>
              <span className="mn-leg who-teen">You</span> <span className="mn-leg who-parent">Parent or guardian</span> <span className="mn-leg who-us">Turn2Opinion</span>
            </p>
          </div>
          <Levels />
        </div>
      </section>

      {/* 4. CHANNELS */}
      <section className="section mn-desk-sec" aria-labelledby="mn-c-h">
        <div className="wrap">
          <div className="mn-head" data-reveal>
            <p className="mn-kicker is-lime">Your profile, your mix</p>
            <h2 id="mn-c-h">Thirteen channels on the desk. Push one up.</h2>
            <p>Each channel is a short set of questions about one part of your life. Finish one for 100 points, and the surveys you get start sounding a lot more like you.</p>
          </div>
          <Mixer />
          <p className="mn-small">Preview only: nothing here is saved. Your real channels open once both keys have turned.</p>
        </div>
      </section>

      {/* 5. PROMISES */}
      <section className="section mn-neon-sec" aria-labelledby="mn-s-h">
        <div className="wrap">
          <div className="mn-head" data-reveal>
            <p className="mn-kicker">Our promises</p>
            <h2 id="mn-s-h">Twelve promises, lit up all night</h2>
          </div>
          <ul className="mn-signs">
            {PROMISES.map((p, k) => (
              <li key={p.t} className="mn-sign" style={{ '--c': p.c, '--k': k }} data-reveal>
                <span className="mn-sign-e" aria-hidden="true">
                  {p.e}
                </span>
                <b>{p.t}</b>
                <small>{p.d}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. PARENTS */}
      <section className="section mn-parent-sec" id="mn-parents" aria-labelledby="mn-p-h">
        <div className="wrap mn-split">
          <div data-reveal>
            <p className="mn-kicker is-mint">For parents and guardians</p>
            <h2 id="mn-p-h">You stay in the loop, without reading over their shoulder</h2>
            <p>
              When your teen signs up, we email you. You tell us who you are, confirm you are legally able to give permission, and choose exactly what you agree to. Nothing
              is switched on until you say yes, and you can withdraw at any time.
            </p>
            <ul className="mn-parent-list">
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
          <div className="mn-dash" data-reveal aria-label="What the parent view contains">
            <p className="mn-dash-top">
              <span className="mn-dot" /> Parent view · Aarav, 15
            </p>
            {PARENT.map((p, k) => (
              <div key={p.t} className="mn-dash-row" style={{ '--k': k }}>
                <span className="mn-dash-e" aria-hidden="true">
                  {p.e}
                </span>
                <span>
                  <b>{p.t}</b>
                  <small>{p.d}</small>
                </span>
                <em>{p.n}</em>
              </div>
            ))}
            <div className="mn-dash-foot">
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
      <section className="mn-closer" aria-labelledby="mn-x-h">
        <div className="wrap">
          <p className="mn-insert" aria-hidden="true">
            Insert opinion to continue
          </p>
          <h2 id="mn-x-h" data-reveal>
            Choose your player
          </h2>
          <div className="mn-players">
            <Link to="/join/teen/" className="mn-player p1" data-reveal>
              <span className="mn-push" aria-hidden="true">
                <i>P1</i>
              </span>
              <b>I’m 13 to 17</b>
              <small>Sign up now. We’ll invite your parent or guardian for you.</small>
              <span className="mn-player-go">
                Press start <Icon name="arrow" size={16} />
              </span>
            </Link>
            <Link to="/contact/" className="mn-player p2" data-reveal>
              <span className="mn-push" aria-hidden="true">
                <i>P2</i>
              </span>
              <b>I’m a parent or guardian</b>
              <small>Questions before you say yes? Talk to a real person, any time.</small>
              <span className="mn-player-go">
                Ask us <Icon name="arrow" size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
