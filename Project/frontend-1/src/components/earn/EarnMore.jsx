// Extra content for the Earn pages (Kunal, 20 Nov 2026: "more content for the sub-pages, with
// profile and panel data, presented in Turn2Opinion style"). The numbers come from the real member
// profile index (Project/frontend profiles2/data/profiles-index.json), grouped into chapters a
// visitor can understand. Every section has its own look, so nothing repeats another section.
import { useEffect, useState } from 'react';
import { Link } from '../../router/Router.jsx';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import Icon from '../Icon.jsx';

/* ------------------------------------------------------------------ */
/* CONSUMERS · 1 · the profile as a ring binder with chapter dividers   */
/* ------------------------------------------------------------------ */
export const CONSUMER_CHAPTERS = [
  { k: 'you', icon: 'user', c: '#1f5bff', t: 'About you', n: 19, covers: 'Age band, where you live, who you live with and the language you prefer.', opens: 'Almost every study starts here, so this chapter comes first.' },
  { k: 'work', icon: 'briefcase', c: '#0e7c66', t: 'Work & study', n: 39, covers: 'What you do, where you study, your field and how you work.', opens: 'Studies on jobs, commuting, learning apps and the tools people use at work.' },
  { k: 'money', icon: 'bank', c: '#0b8a5a', t: 'Money & banking', n: 39, covers: 'The accounts, cards, wallets and insurance you already have.', opens: 'Banking apps, digital payments, savings habits and insurance research.' },
  { k: 'family', icon: 'heart', c: '#e8436d', t: 'Family & parenting', n: 43, covers: 'Children at home, their ages and the decisions you make for them.', opens: 'Baby care, school supplies, family meals and toys.' },
  { k: 'home', icon: 'home', c: '#c77700', t: 'Home, pets & household', n: 97, covers: 'Where you live, the appliances you own, home services and the pets you care for.', opens: 'Appliances, cleaning products, pet food, home insurance and repairs.' },
  { k: 'food', icon: 'cup', c: '#ff7a45', t: 'Food, drink & eating out', n: 58, covers: 'What you cook, where you shop for food, takeaway and restaurant habits.', opens: 'Taste tests, packaging, delivery apps and new flavours.' },
  { k: 'shop', icon: 'cart', c: '#e8590c', t: 'Shopping & premium buys', n: 23, covers: 'Where you shop, how you compare prices and the treats you save for.', opens: 'Checkout studies, loyalty schemes and premium brands.' },
  { k: 'style', icon: 'sparkles', c: '#d6336c', t: 'Beauty, fashion & care', n: 71, covers: 'Skincare, grooming, clothes, shoes and the brands you trust.', opens: 'Product tests, advert reviews and new collections.' },
  { k: 'health', icon: 'pulse', c: '#0596d6', t: 'Health & wellness', n: 64, covers: 'Sleep, fitness routines, nutrition and the wellness products you use.', opens: 'Wellness apps, vitamins, fitness trackers and healthy eating.' },
  { k: 'tech', icon: 'phone', c: '#7048e8', t: 'Phones, tech & media', n: 90, covers: 'Your devices, apps, internet plan and what you watch and listen to.', opens: 'Phone launches, streaming services, smart home and AI tools.' },
  { k: 'move', icon: 'car', c: '#2f6bff', t: 'Cars & getting around', n: 48, covers: 'What you drive or ride, how you commute and what you plan to buy next.', opens: 'Car clinics, EV interest, ride apps and fuel habits.' },
  { k: 'travel', icon: 'plane', c: '#14c9b5', t: 'Travel & holidays', n: 28, covers: 'How often you travel, where, and how you book.', opens: 'Airlines, hotels, travel apps and holiday planning.' },
  { k: 'play', icon: 'game', c: '#8b5cf6', t: 'Sport, games & esports', n: 91, covers: 'The sports you play or follow, the games you play and where you play them.', opens: 'Game updates, sports streaming, kit and fantasy leagues.' },
  { k: 'create', icon: 'megaphone', c: '#ff3b8d', t: 'Creators & social media', n: 39, covers: 'The platforms you use, what you post and the creators you follow.', opens: 'Social platforms, creator tools and influencer research.' },
  { k: 'research', icon: 'clipboard', c: '#334155', t: 'How you like to take part', n: 20, covers: 'Survey length you prefer, device, and whether you would join diaries or product tests.', opens: 'Helps us send the formats that suit you, and skip the ones that don’t.' }
];
const CONSUMER_TOTAL = CONSUMER_CHAPTERS.reduce((s, c) => s + c.n, 0);

export function ConsumerChapters() {
  const [k, setK] = useState('you');
  const at = CONSUMER_CHAPTERS.find((c) => c.k === k);
  const idx = CONSUMER_CHAPTERS.indexOf(at);
  return (
    <div className="xm-binder">
      <div className="xm-binder-book" style={{ '--c': at.c }}>
        <span className="xm-rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="xm-page" key={k} aria-live="polite">
          <span className="xm-page-no">
            Chapter {String(idx + 1).padStart(2, '0')} of {CONSUMER_CHAPTERS.length}
          </span>
          <span className="xm-page-ico">
            <Icon name={at.icon} size={30} />
          </span>
          <h3>{at.t}</h3>
          <p className="xm-page-n">
            <b>{at.n}</b> questions, answered once and updated when life changes
          </p>
          <dl>
            <dt>What it covers</dt>
            <dd>{at.covers}</dd>
            <dt>Studies it can open</dt>
            <dd>{at.opens}</dd>
          </dl>
          <span className="xm-page-lines" aria-hidden="true" />
        </div>
      </div>
      <div className="xm-tabs" role="tablist" aria-label="Profile chapters">
        {CONSUMER_CHAPTERS.map((c, i) => (
          <button
            key={c.k}
            type="button"
            role="tab"
            aria-selected={k === c.k}
            className={k === c.k ? 'is-on' : ''}
            style={{ '--c': c.c, '--i': i }}
            onClick={() => setK(c.k)}
            onMouseEnter={() => setK(c.k)}
          >
            <Icon name={c.icon} size={14} />
            <span>{c.t}</span>
            <small>{c.n}</small>
          </button>
        ))}
      </div>
      <p className="xm-binder-foot">
        <Icon name="layers" size={15} /> {CONSUMER_CHAPTERS.length} chapters, about {CONSUMER_TOTAL} questions in all. You never have to finish them in one go, and every chapter you complete can earn points.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONSUMERS · 2 · how an invitation finds you, as a sonar sweep        */
/* ------------------------------------------------------------------ */
const SONAR = [
  { t: 'Lives in Maharashtra', a: 20 },
  { t: 'Aged 25 to 34', a: 75 },
  { t: 'Shops online weekly', a: 140 },
  { t: 'Owns a scooter', a: 205 },
  { t: 'Has a pet', a: 260 },
  { t: 'Streams most nights', a: 320 }
];
const SONAR_STEPS = [
  ['target', 'A brief arrives', 'A brand or researcher describes the people they need to hear from, never by name.'],
  ['filter', 'Profiles are matched', 'We compare that brief with profile answers. Your name and contact details are not part of it.'],
  ['mail', 'You get an invitation', 'It shows the topic, roughly how long it takes and the points, before you click anything.'],
  ['check', 'A few quick checks', 'Short screening questions confirm the fit. If it isn’t you, you’ll know in under a minute.'],
  ['coin', 'Points land', 'Finish the survey, pass the quality checks and the points appear in your balance.']
];

export function MatchSonar() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setLit(SONAR.length);
      return undefined;
    }
    setLit(0);
    const t = setInterval(() => setLit((n) => (n >= SONAR.length + 2 ? 0 : n + 1)), 900);
    return () => clearInterval(t);
  }, [inView]);
  const done = lit >= SONAR.length;
  return (
    <div className="xm-sonar-wrap" ref={ref}>
      <div className={`xm-sonar ${inView ? 'is-on' : ''}`} role="img" aria-label="A radar sweep matching a new study to profile answers such as location, age, shopping habits and pets, then sending an invitation.">
        <span className="xm-ring r1" aria-hidden="true" />
        <span className="xm-ring r2" aria-hidden="true" />
        <span className="xm-ring r3" aria-hidden="true" />
        <span className="xm-sweep" aria-hidden="true" />
        <span className={`xm-core ${done ? 'is-done' : ''}`} aria-hidden="true">
          <Icon name={done ? 'mail' : 'target'} size={26} />
          <b>{done ? 'Invite sent' : 'New study'}</b>
        </span>
        {SONAR.map((s, i) => (
          <span key={s.t} className={`xm-blip ${i < lit ? 'is-lit' : ''}`} style={{ '--a': `${s.a}deg`, '--i': i }} aria-hidden="true">
            <i />
            <em>{s.t}</em>
          </span>
        ))}
      </div>
      <ol className="xm-steps">
        {SONAR_STEPS.map(([ic, t, d], i) => (
          <li key={t} style={{ '--i': i }} data-reveal>
            <span className="xm-step-ico">
              <Icon name={ic} size={18} />
            </span>
            <div>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONSUMERS · 3 · straight talk: promises and things we never do       */
/* ------------------------------------------------------------------ */
const EXPECT = [
  ['clock', 'Surveys usually take 5 to 20 minutes', 'The invitation tells you the length. Longer studies carry more points.'],
  ['filter', 'You won’t qualify for every survey', 'Some briefs need very specific people. Screening out early is normal, and a full profile makes it rarer.'],
  ['calendar', 'Invitations come in waves', 'Research is seasonal. Some weeks are busy, some are quiet. Nothing is ever mandatory.'],
  ['shield', 'Quality checks protect your rewards', 'Rushed or contradictory answers are flagged, which keeps the panel valuable for honest members.']
];
const NEVER = [
  'Charge you to join or to redeem',
  'Sell you anything or ask you to buy a product',
  'Share your name or contact details with the brands behind a survey',
  'Ask for your bank PIN, card number or passwords',
  'Promise a salary or a guaranteed monthly income'
];

export function StraightTalk() {
  return (
    <div className="xm-talk">
      <div className="xm-talk-yes">
        <h3>
          <Icon name="check" size={18} /> What to expect
        </h3>
        <ul>
          {EXPECT.map(([ic, t, d], i) => (
            <li key={t} style={{ '--i': i }} data-reveal>
              <span>
                <Icon name={ic} size={18} />
              </span>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="xm-talk-no">
        <h3>
          <Icon name="x" size={18} /> What we will never do
        </h3>
        <ul>
          {NEVER.map((t, i) => (
            <li key={t} style={{ '--i': i }} data-reveal>
              <s>{t}</s>
            </li>
          ))}
        </ul>
        <p className="xm-talk-note">
          Spotted someone asking for any of these in our name? <Link to="/contact/">Tell us</Link>.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PROFESSIONALS · 1 · the work profile as an org chart                 */
/* ------------------------------------------------------------------ */
const ORG = [
  {
    k: 'role',
    icon: 'id',
    c: '#7c4dff',
    t: 'Your role',
    lead: 'Decides which briefs are relevant to you at all.',
    items: ['Employment status', 'Industry', 'Specialisation', 'Department', 'Job title', 'Seniority', 'Years of experience']
  },
  {
    k: 'org',
    icon: 'building',
    c: '#d4a017',
    t: 'Your organisation',
    lead: 'Lets a study ask for a startup founder or a large-enterprise buyer.',
    items: ['Company size', 'Annual revenue band', 'Offices outside your country', 'Where the head office is']
  },
  {
    k: 'say',
    icon: 'scale',
    c: '#0e9f6e',
    t: 'Your influence',
    lead: 'B2B studies often need the people who shape a purchase, not only the ones who sign it.',
    items: ['Purchase decisions you are part of', 'Budget you influence', 'Products and services you recommend']
  }
];

export function WorkProfileChart() {
  const [k, setK] = useState('role');
  return (
    <div className="xm-org">
      <div className="xm-org-top">
        <span className="xm-org-you">
          <Icon name="user" size={22} />
          <b>You, at work</b>
          <small>Answered once at sign-up, updated whenever you change jobs</small>
        </span>
      </div>
      <span className="xm-org-bus" aria-hidden="true" />
      <div className="xm-org-cols">
        {ORG.map((b, i) => (
          <section key={b.k} className={`xm-org-col ${k === b.k ? 'is-on' : ''}`} style={{ '--c': b.c, '--i': i }} onMouseEnter={() => setK(b.k)}>
            <button type="button" className="xm-org-head" aria-expanded={k === b.k} onClick={() => setK(b.k)}>
              <Icon name={b.icon} size={20} />
              <b>{b.t}</b>
            </button>
            <p>{b.lead}</p>
            <ul>
              {b.items.map((t, j) => (
                <li key={t} style={{ '--j': j }}>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PROFESSIONALS · 2 · how an expert is confirmed, as inspection stamps */
/* ------------------------------------------------------------------ */
const CHECKS = [
  ['id', 'Consistent profile', 'Your role, industry and company size have to agree with each other, and with what you told us before.'],
  ['puzzle', 'Knowledge screeners', 'Short questions only someone in the field answers easily, such as the tools a CFO would actually compare.'],
  ['clock', 'Time and attention', 'Studies record speed and attention checks. Answers given too fast to read are set aside.'],
  ['finger', 'One person, one account', 'Device and duplicate checks stop the same person from answering twice.'],
  ['eye', 'A human review', 'Open answers are read by the research team before rewards are released.']
];

export function ExpertChecks() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <ol className={`xm-checks ${inView ? 'is-in' : ''}`} ref={ref}>
      {CHECKS.map(([ic, t, d], i) => (
        <li key={t} style={{ '--i': i }}>
          <span className="xm-stamp" aria-hidden="true">
            <Icon name={ic} size={22} />
            <em>Checked</em>
          </span>
          <b>
            {String(i + 1).padStart(2, '0')} · {t}
          </b>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* WHO CAN JOIN · 1 · the three panels side by side                    */
/* ------------------------------------------------------------------ */
const LANES = [
  { k: 'c', t: 'Consumer', icon: 'bag', c: '#1f5bff', to: '/join/', cta: 'Join as a consumer' },
  { k: 'p', t: 'Professional', icon: 'briefcase', c: '#7c4dff', to: '/join/professional/', cta: 'Join as a professional' },
  { k: 't', t: 'Teen', icon: 'spark', c: '#ff3b8d', to: '/join/teen/', cta: 'Ask to join as a Teen' }
];
const ROWS = [
  ['Age', '18 or over', '18 or over, working or recently working', '13 to 17'],
  ['You need', 'Your own email address', 'Your own email address and your work details', 'Your own email, plus a parent or guardian with a different email'],
  ['Profile questions', 'Home, shopping, free time, tech and how you like to take part', 'Role, organisation and the decisions you are part of', 'School, interests, screens and shopping, with adult topics left out'],
  ['Account opens', 'After you confirm your email and set a password', 'After you confirm your email and set a password', 'Only after your parent or guardian completes the consent form'],
  ['Typical topics', 'Products, brands, ads, apps, food, travel', 'Software, budgets, vendors, workplace tools', 'Games, apps, school life, snacks, sport'],
  ['Who can see your answers', 'Researchers, without your name', 'Researchers, without your name or company', 'Researchers, without your name. Your parent can ask us to delete the account at any time']
];

export function PanelCompare() {
  const [hi, setHi] = useState(-1);
  return (
    <div className="xm-compare" role="table" aria-label="The three Turn2Opinion panels compared">
      <div className="xm-cmp-row is-head" role="row">
        <span role="columnheader" className="xm-cmp-label">
          <span className="sr-only">Detail</span>
        </span>
        {LANES.map((l) => (
          <span key={l.k} role="columnheader" className="xm-cmp-lane" style={{ '--c': l.c }}>
            <Icon name={l.icon} size={20} />
            {l.t}
          </span>
        ))}
      </div>
      {ROWS.map(([label, ...cells], r) => (
        <div key={label} role="row" className={`xm-cmp-row ${hi === r ? 'is-hi' : ''}`} onMouseEnter={() => setHi(r)} onMouseLeave={() => setHi(-1)} style={{ '--r': r }}>
          <span role="rowheader" className="xm-cmp-label">
            {label}
          </span>
          {cells.map((c, i) => (
            <span key={i} role="cell" className="xm-cmp-cell" style={{ '--c': LANES[i].c }} data-lane={LANES[i].t}>
              {c}
            </span>
          ))}
        </div>
      ))}
      <div className="xm-cmp-row is-foot" role="row">
        <span role="cell" className="xm-cmp-label" />
        {LANES.map((l) => (
          <span key={l.k} role="cell" className="xm-cmp-cell">
            <Link to={l.to} className="xm-cmp-btn" style={{ '--c': l.c }}>
              {l.cta} <Icon name="arrow" size={14} />
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WHO CAN JOIN · 2 · the sign-up journeys as a metro map               */
/* ------------------------------------------------------------------ */
const LINES = [
  { t: 'Consumer line', c: '#1f5bff', stops: ['Your details', 'Confirm & CAPTCHA', 'Email link', 'Password', 'Welcome questions', 'Terms', 'Dashboard'] },
  { t: 'Professional line', c: '#7c4dff', stops: ['Your details', 'Confirm & CAPTCHA', 'Email link', 'Password', 'Work questions', 'Terms', 'Dashboard'] },
  { t: 'Teen line', c: '#ff3b8d', stops: ['About you', 'Parent or guardian', 'Teen questions', 'Request sent', 'Parent consents', 'Set up password', 'Dashboard'] }
];

export function JoinMetro() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div className={`xm-metro ${inView ? 'is-in' : ''}`} ref={ref}>
      {LINES.map((l, i) => (
        <div key={l.t} className="xm-line" style={{ '--c': l.c, '--i': i }}>
          <b className="xm-line-name">{l.t}</b>
          <ol>
            {l.stops.map((s, j) => (
              <li key={s + j} style={{ '--j': j }} className={j === l.stops.length - 1 ? 'is-end' : ''}>
                <i aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className="xm-metro-note">
        <Icon name="lock" size={15} /> Nobody is ever sent a password by email. Every line ends with a secure one-time link where you choose your own.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WHO CAN JOIN · 3 · a ready-check the visitor can tick off            */
/* ------------------------------------------------------------------ */
const READY = [
  ['mail', 'An email address only you use', 'Invitations and your password link go there.'],
  ['cake', 'Your real date of birth', 'It decides your panel, and some surveys are age-specific.'],
  ['map', 'Your country, state and city', 'Most research is local, so this matters more than you’d think.'],
  ['clock', 'About ten minutes', 'Enough for your details and the welcome questions.'],
  ['user', 'One account per person', 'Second accounts are closed and their points are lost.']
];

export function ReadyCheck() {
  const [on, setOn] = useState(() => READY.map(() => false));
  const count = on.filter(Boolean).length;
  return (
    <div className="xm-ready">
      <ul>
        {READY.map(([ic, t, d], i) => (
          <li key={t}>
            <label className={`xm-ready-item ${on[i] ? 'is-on' : ''}`}>
              <input type="checkbox" checked={on[i]} onChange={() => setOn((a) => a.map((v, j) => (j === i ? !v : v)))} />
              <span className="xm-ready-box" aria-hidden="true">
                <Icon name="check" size={16} />
              </span>
              <Icon name={ic} size={20} />
              <span>
                <b>{t}</b>
                <small>{d}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="xm-ready-meter" aria-live="polite">
        <span className="xm-ready-bar">
          <i style={{ '--p': count / READY.length }} />
        </span>
        <b>{count === READY.length ? 'You’re ready. Sign-up takes about ten minutes.' : `${count} of ${READY.length} ready`}</b>
        {count === READY.length && (
          <Link to="/join/" className="btn btn-primary">
            Start sign-up <Icon name="arrow" size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
