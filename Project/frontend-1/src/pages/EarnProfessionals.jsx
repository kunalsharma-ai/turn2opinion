// /earn/business-professionals/ — Earn menu, page 2 of 4 (round 10, Kunal 20 Nov 2026).
//
// World: "midnight boardroom". Deep navy and amethyst with brushed gold, the same family as the
// professional side of the home hero, but every section is a different object from the office:
//   1. HERO        a split-flap departures board flipping through job titles
//   2. DIRECTORY   the lobby floor directory: one floor per sector, with a moving lift car
//   3. DOSSIER     four study formats as tabbed folders in a dossier
//   4. LANYARD     how verification works, on a swinging access pass
//   5. LEDGER      what you are paid for, as a gold ledger page
//   6. TABLE       the closing call to action at a boardroom table with an empty seat
import { useEffect, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { prefersReducedMotion, useReveal } from '../hooks/useMounted.js';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { REWARDS } from '../data/payouts.js';

const TITLES = ['IT DIRECTOR', 'CFO', 'HR LEAD', 'ENGINEER', 'FOUNDER', 'BUYER', 'MARKETER', 'CTO', 'OPS HEAD'];
const W = 11; // characters on the board

function Flap({ word }) {
  const chars = word.padEnd(W, ' ').slice(0, W).split('');
  return (
    <span className="ep-flaps" aria-hidden="true">
      {chars.map((c, k) => (
        <span key={`${word}-${k}`} className="ep-flap" style={{ '--k': k }}>
          <b>{c}</b>
        </span>
      ))}
    </span>
  );
}

function Board() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % TITLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  const rows = [0, 1, 2].map((r) => TITLES[(i + r * 3) % TITLES.length]);
  const gates = ['B2B', 'TECH', 'FIN'];
  const status = ['BOARDING', 'ON TIME', 'INVITED'];
  return (
    <div className="ep-board" role="img" aria-label="A departures board listing professional roles we invite: IT directors, CFOs, HR leads, engineers, founders, buyers, marketers and more.">
      <div className="ep-board-top">
        <span>
          <Icon name="briefcase" size={14} /> Departures · Expert studies
        </span>
        <span className="ep-clock">LIVE</span>
      </div>
      <div className="ep-board-head">
        <span>Role</span>
        <span>Gate</span>
        <span>Status</span>
      </div>
      {rows.map((w, r) => (
        <div key={r} className="ep-row" style={{ '--r': r }}>
          <Flap word={w} />
          <span className="ep-gate">{gates[r]}</span>
          <span className={`ep-status s${r}`}>{status[r]}</span>
        </div>
      ))}
    </div>
  );
}

const FLOORS = [
  { n: 12, t: 'Technology & software', d: 'CIOs, architects, developers, IT buyers', icon: 'chip' },
  { n: 11, t: 'Finance & banking', d: 'CFOs, controllers, analysts, insurers', icon: 'bank' },
  { n: 10, t: 'Marketing & media', d: 'CMOs, brand leads, agencies, creators', icon: 'megaphone' },
  { n: 9, t: 'Manufacturing & engineering', d: 'Plant heads, quality, R&D, procurement', icon: 'gear' },
  { n: 8, t: 'Retail & e-commerce', d: 'Category managers, merchandisers, sellers', icon: 'cart' },
  { n: 7, t: 'People & HR', d: 'CHROs, recruiters, L&D, payroll', icon: 'users' },
  { n: 6, t: 'Logistics & supply chain', d: 'Fleet, warehousing, freight, sourcing', icon: 'truck' },
  { n: 5, t: 'Legal & compliance', d: 'Counsel, risk, privacy, audit', icon: 'scale' },
  { n: 4, t: 'Education & training', d: 'Principals, faculty, ed-tech buyers', icon: 'cap' },
  { n: 3, t: 'Energy & utilities', d: 'Grid, renewables, facilities', icon: 'bolt' },
  { n: 2, t: 'Founders & small business', d: 'Owners, partners, freelancers', icon: 'building' },
  { n: 1, t: 'Public sector & NGOs', d: 'Officers, programme leads, policy', icon: 'landmark' }
];

function Directory() {
  const [floor, setFloor] = useState(12);
  const at = FLOORS.find((f) => f.n === floor);
  return (
    <div className="ep-dir">
      <div className="ep-lift" aria-hidden="true">
        <span className="ep-lift-num">{String(floor).padStart(2, '0')}</span>
        <span className="ep-lift-arrow">▲</span>
        <span className="ep-shaft">
          <i style={{ '--f': (floor - 1) / 11 }} />
        </span>
      </div>
      <ol className="ep-floors" aria-label="Sectors we invite">
        {FLOORS.map((f) => (
          <li key={f.n}>
            <button type="button" className={floor === f.n ? 'is-on' : ''} aria-pressed={floor === f.n} onMouseEnter={() => setFloor(f.n)} onFocus={() => setFloor(f.n)} onClick={() => setFloor(f.n)}>
              <span className="ep-fl-n">{String(f.n).padStart(2, '0')}</span>
              <span className="ep-fl-t">{f.t}</span>
              <Icon name={f.icon} size={16} />
            </button>
          </li>
        ))}
      </ol>
      <div className="ep-door" aria-live="polite" key={floor}>
        <span className="ep-door-l" aria-hidden="true" />
        <span className="ep-door-r" aria-hidden="true" />
        <div className="ep-door-in">
          <Icon name={at.icon} size={30} />
          <b>Floor {at.n}</b>
          <strong>{at.t}</strong>
          <small>{at.d}</small>
        </div>
      </div>
    </div>
  );
}

const FORMATS = [
  { k: 'pulse', tab: 'Pulse', t: 'Quick pulse', time: '5–10 min', d: 'A handful of sharp questions on a tool, a vendor or a trend in your field. Ideal between meetings.', points: ['Mobile friendly', 'Most frequent format', 'Reward shown up front'] },
  { k: 'deep', tab: 'Deep-dive', t: 'Deep-dive survey', time: '15–25 min', d: 'A structured study on how your team buys, budgets or decides. Longer, so it is rewarded accordingly.', points: ['Save and continue', 'Role-specific routing', 'Higher reward band'] },
  { k: 'concept', tab: 'Concept', t: 'Concept & product test', time: '10–20 min', d: 'See a product, a pitch or a price before the market does, and say what would make you buy it.', points: ['Early access to ideas', 'Under confidentiality', 'Your feedback shapes launches'] },
  { k: 'talk', tab: 'Interview', t: 'Expert conversation', time: 'By invitation', d: 'Some studies need a real conversation. These are always optional, scheduled around you and explained before you agree.', points: ['Scheduled by you', 'Separate consent first', 'Premium reward'] }
];

function Dossier() {
  const [tab, setTab] = useState('pulse');
  const f = FORMATS.find((x) => x.k === tab);
  return (
    <div className="ep-dossier">
      <div className="ep-tabs" role="tablist" aria-label="Study formats">
        {FORMATS.map((x, k) => (
          <button
            key={x.k}
            type="button"
            role="tab"
            id={`ep-tab-${x.k}`}
            aria-selected={tab === x.k}
            aria-controls="ep-folder"
            className={tab === x.k ? 'is-on' : ''}
            style={{ '--k': k }}
            onClick={() => setTab(x.k)}
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div className="ep-folder" id="ep-folder" role="tabpanel" aria-labelledby={`ep-tab-${tab}`} key={tab}>
        <span className="ep-stamp" aria-hidden="true">
          Confidential
        </span>
        <p className="ep-time">
          <Icon name="clock" size={15} /> {f.time}
        </p>
        <h3>{f.t}</h3>
        <p>{f.d}</p>
        <ul>
          {f.points.map((p) => (
            <li key={p}>
              <Icon name="check" size={14} /> {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CHECKS = [
  ['id', 'Your role, confirmed', 'We ask about your job level, function and industry, and check that the answers hang together.'],
  ['mail', 'Work email, optional', 'Adding a company email can unlock more studies. Free mail domains are fine for everything else.'],
  ['shield', 'Consistency checks', 'Speeders, copy-paste answers and duplicate accounts are filtered out, so genuine experts qualify more.'],
  ['eye', 'Anonymous by default', 'Clients learn your role and sector. Never your name, your employer or your contact details.']
];

export default function EarnProfessionals() {
  const ref = useReveal();
  return (
    <div ref={ref} className="ep-page">
      {/* 1. HERO */}
      <section className="ep-hero">
        <span className="ep-hero-lines" aria-hidden="true" />
        <span className="ep-hero-orb" aria-hidden="true" />
        <div className="wrap ep-hero-grid">
          <div className="ep-hero-copy">
            <Breadcrumbs items={[{ label: 'Earn', to: '/paid-surveys/' }, { label: 'Business Professionals' }]} />
            <p className="ep-kicker">
              <Icon name="briefcase" size={15} /> Earn · Business professionals
            </p>
            <h1>
              Your job title is
              <em> a seat at the table.</em>
            </h1>
            <p className="ep-lead">
              Companies spend months guessing what managers, engineers, buyers and founders really think. Turn2Opinion lets them ask you directly, in focused B2B studies
              matched to your role, and rewards you for the expertise you already carry.
            </p>
            <div className="ep-actions">
              <Link to="/join/professional/" className="btn btn-lg ep-btn-gold">
                Join as a professional <Icon name="arrow" size={18} />
              </Link>
              <a href="#ep-dir" className="ep-textlink">
                Find your floor <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
          <Board />
        </div>
      </section>

      {/* 2. DIRECTORY */}
      <section className="section ep-dir-sec" id="ep-dir" aria-labelledby="ep-d-h">
        <div className="wrap">
          <div className="ep-head" data-reveal>
            <p className="ep-kicker">Lobby directory</p>
            <h2 id="ep-d-h">Twelve floors. One of them is yours.</h2>
            <p>Hover a floor to ride the lift. If your sector is not listed, it is still welcome: these are just the busiest floors.</p>
          </div>
          <div data-reveal>
            <Directory />
          </div>
        </div>
      </section>

      {/* 3. DOSSIER */}
      <section className="section ep-dossier-sec" aria-labelledby="ep-f-h">
        <div className="wrap ep-split">
          <div data-reveal>
            <p className="ep-kicker is-ink">Study formats</p>
            <h2 id="ep-f-h">Four kinds of brief land on your desk</h2>
            <p>Every invitation tells you which format it is, how long it should take and what it pays. You decide whether it is worth your time.</p>
          </div>
          <div data-reveal>
            <Dossier />
          </div>
        </div>
      </section>

      {/* 4. LANYARD */}
      <section className="section ep-pass-sec" aria-labelledby="ep-p-h">
        <div className="wrap ep-split is-rev">
          <div className="ep-lanyard" aria-hidden="true">
            <span className="ep-strap" />
            <div className="ep-pass">
              <span className="ep-holo" />
              <span className="ep-pass-top">
                <b>T2O</b> EXPERT ACCESS
              </span>
              <span className="ep-pass-photo">
                <Icon name="user" size={34} />
              </span>
              <b className="ep-pass-name">Verified professional</b>
              <small>Role · Sector · Seniority</small>
              <span className="ep-pass-bar" />
              <span className="ep-pass-ok">
                <Icon name="check" size={13} strokeWidth={3} /> Name hidden from clients
              </span>
            </div>
          </div>
          <div>
            <div data-reveal>
              <p className="ep-kicker">Verified, never exposed</p>
              <h2 id="ep-p-h">Your pass gets you in. Your name stays outside.</h2>
            </div>
            <ul className="ep-checks">
              {CHECKS.map(([ic, t, d], k) => (
                <li key={t} style={{ '--k': k }} data-reveal>
                  <span className="ep-check-ico">
                    <Icon name={ic} size={18} />
                  </span>
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. LEDGER */}
      <section className="section ep-ledger-sec" aria-labelledby="ep-l-h">
        <div className="wrap">
          <div className="ep-ledger" data-reveal>
            <div className="ep-ledger-l">
              <p className="ep-kicker is-ink">The ledger</p>
              <h2 id="ep-l-h">Rewards sized to your time and your expertise</h2>
              <p>
                B2B studies are longer and harder to fill, so they carry bigger rewards than most consumer surveys. The amount is always on the invitation, before you click.
              </p>
              <dl>
                <div>
                  <dt>Shown before you start</dt>
                  <dd>Always</dd>
                </div>
                <div>
                  <dt>Fees to join</dt>
                  <dd>None</dd>
                </div>
                <div>
                  <dt>Ways to cash out</dt>
                  <dd>{REWARDS.length}</dd>
                </div>
              </dl>
            </div>
            <ul className="ep-ledger-r" aria-label="Ways to cash out">
              {REWARDS.map((r, k) => (
                <li key={r.id} style={{ '--k': k, '--c1': r.c1, '--c2': r.c2 }}>
                  <span className="ep-coin">
                    <Icon name={r.icon} size={16} />
                  </span>
                  <b>{r.name}</b>
                  <small>{r.best}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. TABLE */}
      <section className="ep-table" aria-labelledby="ep-c-h">
        <div className="wrap" data-reveal>
          <div className="ep-table-art" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, k) => (
              <i key={k} className={k === 3 ? 'is-empty' : ''} style={{ '--k': k }} />
            ))}
            <span className="ep-table-top" />
          </div>
          <h2 id="ep-c-h">The meeting is about your industry. Your chair is empty.</h2>
          <p>Join in two minutes. Add your role, and B2B invitations start matching you.</p>
          <div className="ep-actions is-center">
            <Link to="/join/professional/" className="btn btn-lg ep-btn-gold">
              Take the seat <Icon name="arrow" size={18} />
            </Link>
            <Link to="/earn/who-can-join/" className="ep-textlink">
              Who can join? <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
