// Home hero: consumer / professional / minor switch that re-tunes the tagline, the rotating audience word,
// the persona orbit and the animated "survey → reward unlocked" phone. No fake amounts are shown.
import React, { useEffect, useState } from 'react';
import { Link } from '../../router/Router.jsx';
import { prefersReducedMotion } from '../../hooks/useMounted.js';
import Icon from '../Icon.jsx';
import { T2OMark } from '../Brand.jsx';
import { asset } from '../../config/env.js';
import WordSplit from '../WordSplit.jsx';
import AuroraCanvas from '../AuroraCanvas.jsx';
import { peopleAlt } from '../../data/illustrations.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { tr } from '../../i18n/engine.js';
import { playAudience } from '../../utils/sound.js';
import { api } from '../../utils/api.js';
import TeenStage from './TeenStage.jsx';

export const AUDIENCES = {
  consumer: {
    label: 'Consumers',
    motto: ['Shop it.', 'Rate it.', 'Get rewarded for it.'],
    tagline: 'Your weekly shop, your favourite shows, the apps on your phone – the opinions you already have can earn you rewards.',
    lead: 'Earn money online without investment: Turn2Opinion pays everyday people for honest answers, with no fees and no catch. Built for',
    leadEnd: 'and pretty much everyone in between.',
    who: ['students', 'homemakers', 'gamers', 'retirees', 'parents', 'shoppers', 'pet parents', 'travellers'],
    cta: 'Join free as a consumer',
    personas: ['cap', 'heart', 'game', 'bag', 'plane', 'paw'],
    q: 'Which do you use most for online shopping?',
    opts: ['Mobile app', 'Website', 'In-store only'],
    badge: 'Consumer survey',
    ribbon: [['cap', 'Students'], ['heart', 'Parents'], ['game', 'Gamers'], ['bag', 'Shoppers'], ['plane', 'Travellers'], ['paw', 'Pet parents'], ['cup', 'Foodies'], ['clock', 'Retirees']]
  },
  professional: {
    label: 'Professionals',
    motto: ['Your expertise.', 'Your schedule.', 'Your reward.'],
    tagline: 'Decision-makers and specialists: give ten focused minutes to the studies shaping your industry – and get rewarded like the expert you are.',
    lead: 'Earn money online without investment by sharing what you know at work: Turn2Opinion rewards professionals for B2B studies matched to their role. Built for',
    leadEnd: 'and specialists in every industry.',
    who: ['IT managers', 'doctors', 'CFOs', 'marketers', 'engineers', 'HR leaders', 'founders', 'buyers'],
    cta: 'Join free as a professional',
    personas: ['chip', 'pulse', 'bank', 'megaphone', 'gear', 'briefcase'],
    q: 'Who signs off software purchases at your company?',
    opts: ['I do', 'My team decides', 'Someone else'],
    badge: 'B2B study · matched to your role',
    ribbon: [['chip', 'IT managers'], ['pulse', 'Doctors'], ['bank', 'CFOs'], ['megaphone', 'Marketers'], ['gear', 'Engineers'], ['users', 'HR leaders'], ['briefcase', 'Founders'], ['truck', 'Buyers']]
  },
  // Round 10b (Kunal, 20 Nov 2026): the teen panel gets its own neon "soundstage" slide, rebuilt from scratch.
  minor: {
    label: 'Minors',
    tag: 'New',
    motto: ['Press play.', 'Say it loud.', 'Get heard.'],
    title: ['Aged 13 to 17?', 'Turn Your Voice Up.'],
    tagline: 'The games you play, the music on repeat, the trainers you want next – brands are making them for you. This is where you tell them what you really think.',
    lead: 'The teen panel runs on two keys: a parent or guardian says yes first, then you do, and every study is age-checked. Made for',
    leadEnd: 'and every teen with something to say.',
    who: ['gamers', 'creators', 'sneakerheads', 'bookworms', 'athletes', 'coders', 'artists', 'music lovers'],
    cta: 'Join the teen panel',
    ribbon: [['game', 'Gamers'], ['pen', 'Creators'], ['ball', 'Athletes'], ['chip', 'Coders'], ['play', 'Streamers'], ['cap', 'Students'], ['volume', 'Music lovers'], ['sparkles', 'Artists']]
  }
};
const AUD_ICON = { consumer: 'bag', professional: 'briefcase', minor: 'sparkles' };
const AUD_ORDER = ['consumer', 'professional', 'minor'];
const JOIN_LINK = { consumer: '/join/', professional: '/join/professional/', minor: '/join/minor/' };
const PROOF = {
  consumer: ['Free forever', 'No investment', 'PayPal, cash, bank, wire, vouchers, gift cards & UPI in India'],
  professional: ['Free forever', 'No investment', 'PayPal, cash, bank, wire, vouchers, gift cards & UPI in India'],
  minor: ['Free, always', 'A parent says yes first', 'Skip anything, any time']
};

function Rotator({ words }) {
  useI18n(); // re-render when the language changes so the word is shown translated
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    if (prefersReducedMotion()) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, [words]);
  return (
    <span className="rotator notranslate" translate="no" aria-live="off">
      <span className="rotator-word" key={words[i]}>
        {tr(words[i])}
      </span>
    </span>
  );
}

function RoleRibbon({ aud }) {
  const items = AUDIENCES[aud].ribbon;
  return (
    <div className="role-ribbon" aria-hidden="true" key={aud}>
      <div className="role-track">
        {[...items, ...items].map(([ic, label], i) => (
          <span key={i}>
            <Icon name={ic} size={14} /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AudienceSwitch({ value, onChange, timer, paused, ms, onHold }) {
  return (
    <div
      className={`aud-switch is-${value}${paused ? ' is-paused' : ''}`}
      role="group"
      aria-label="I want to earn as"
      style={ms ? { '--aud-ms': `${ms}ms` } : undefined}
      onMouseEnter={onHold && (() => onHold(true))}
      onMouseLeave={onHold && (() => onHold(false))}
      onFocus={onHold && (() => onHold(true))}
      onBlur={onHold && (() => onHold(false))}
    >
      <span className="aud-knob" aria-hidden="true" />
      {timer && <span className="aud-timer" key={timer} aria-hidden="true" />}
      {Object.entries(AUDIENCES).map(([k, a]) => (
        <button key={k} type="button" aria-pressed={value === k} className={value === k ? 'is-on' : ''} onClick={() => onChange(k)}>
          <Icon name={AUD_ICON[k]} size={16} /> {a.label}
          {a.tag && <em className="aud-new">{a.tag}</em>}
        </button>
      ))}
    </div>
  );
}

// Personas shown in the hero "portal". Illustrations: Open Peeps (CC0), see public/images/people/LICENSE.txt.
const PERSONAS = {
  consumer: [
    { img: 'shopper', role: 'Shoppers', icon: 'bag', q: 'What made you pick that brand last time?', a: 'A friend recommended it', m: 'Shopping Vouchers' },
    { img: 'gamer', role: 'Gamers', icon: 'game', q: 'Console, PC or mobile – where do you play most?', a: 'Mostly mobile', m: 'Digital Gift Cards' },
    { img: 'foodie', role: 'Foodies', icon: 'cup', q: 'Takeaway or cooking at home tonight?', a: 'Cooking, obviously', m: 'Grocery Vouchers' },
    { img: 'traveller', role: 'Travellers', icon: 'plane', q: 'Window seat or aisle?', a: 'Window, every time', m: 'PayPal' }
  ],
  professional: [
    { img: 'business', role: 'IT & operations', icon: 'chip', q: 'Who signs off new software at your company?', a: 'My team decides', m: 'Wire Transfer' },
    { img: 'finance', role: 'Finance leaders', icon: 'bank', q: 'Which payment tools does your business use?', a: 'Two banks, one fintech', m: 'Bank Transfer' },
    { img: 'tech-user', role: 'Engineers', icon: 'gear', q: 'How often do you trial new dev tools?', a: 'Every quarter', m: 'Digital Gift Cards' },
    { img: 'pro-pointing', role: 'Marketers', icon: 'megaphone', q: 'Which channel brought your best leads this year?', a: 'Search and WhatsApp', m: 'UPI (India)' }
  ]
};
const METHOD_LABEL = { 'UPI (India)': 'UPI (India)', PayPal: 'PayPal', 'Wire Transfer': 'wire transfer', 'Digital Gift Cards': 'a digital gift card', 'Shopping Vouchers': 'a shopping voucher', 'Grocery Vouchers': 'a grocery voucher', 'Cash Rewards': 'cash rewards', 'Bank Transfer': 'bank transfer' };

function TypeText({ text: source, onDone }) {
  const { lang } = useI18n();
  const text = lang === 'en' ? source : tr(source);
  const [n, setN] = useState(prefersReducedMotion() ? text.length : 0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone && onDone();
      return undefined;
    }
    if (n >= text.length) {
      const t = setTimeout(() => onDone && onDone(), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((x) => x + 1), 28);
    return () => clearTimeout(t);
  }, [n, text]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span className="tt notranslate" translate="no">
      {text.slice(0, n)}
      <i className={n < text.length ? 'tt-caret' : 'tt-caret done'} />
    </span>
  );
}

/** Hero visual: a morphing portal where members of the chosen audience pop up, answer a question and unlock a reward. */
export function RewardStage({ aud }) {
  const list = PERSONAS[aud];
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0); // 0 typing, 1 answered, 2 rewarded
  useEffect(() => {
    setI(0);
    setPhase(0);
  }, [aud]);
  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 900);
      return () => clearTimeout(t);
    }
    if (phase === 2 && !prefersReducedMotion()) {
      const t = setTimeout(() => {
        setI((n) => (n + 1) % list.length);
        setPhase(0);
      }, 2600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, list.length]);
  const p = list[i % list.length];
  return (
    <div className={`portal aud-${aud}`} aria-hidden="true">
      {(
        <span className={aud === 'consumer' ? 'money-rain' : 'money-rain is-rise'} key={`rain-${aud}`}>
          {(aud === 'consumer' ? ['₹', '$', '€', '£', '¥', '$', '₹', '€', '£', '$'] : ['$', '€', '£', '$', '₹', '€', '$', '£', '€', '$']).map((c, k) => (
            <i key={k} className={k % 3 === 0 ? 'note' : 'coin'} style={{ '--k': k }}>
              {c}
            </i>
          ))}
        </span>
      )}
      <span className="portal-rings">
        <i />
        <i />
        <i />
      </span>
      <span className="portal-orbit">
        {list.map((x, k) => (
          <span key={x.img} className={`po-dot ${k === i ? 'is-on' : ''}`} style={{ '--a': `${k * (360 / list.length) - 90}deg` }}>
            <span className="po-ico">
              <Icon name={x.icon} size={18} />
            </span>
          </span>
        ))}
      </span>
      <div className="portal-blob">
        <img key={`${aud}-${p.img}`} className="portal-person" src={asset(`/images/people/${p.img}.svg`)} alt={peopleAlt(p.img)} width="300" height="360" />
      </div>
      <div className="portal-q" key={`q-${aud}-${i}`}>
        <span className="pq-role">
          <Icon name={p.icon} size={13} /> {p.role}
        </span>
        <TypeText text={p.q} onDone={() => setPhase((x) => (x === 0 ? 1 : x))} />
      </div>
      {phase >= 1 && (
        <div className="portal-ans" key={`a-${aud}-${i}`}>
          <Icon name="check" size={14} /> {p.a}
        </div>
      )}
      {aud === 'consumer' ? (
        <div className={`portal-wallet pw-jar ${phase >= 2 ? 'is-hit' : ''}`}>
          <span className="jar-pig">
            <svg viewBox="0 0 64 52" aria-hidden="true">
              <ellipse cx="32" cy="29" rx="23" ry="17" className="pig-body" />
              <path d="M14 18l-4-9 10 5z" className="pig-ear" />
              <ellipse cx="54" cy="30" rx="6" ry="5" className="pig-snout" />
              <circle cx="52.5" cy="29.5" r="1" className="pig-dot" />
              <circle cx="55.5" cy="29.5" r="1" className="pig-dot" />
              <circle cx="44" cy="23" r="2" className="pig-eye" />
              <rect x="22" y="44" width="6" height="7" rx="2" className="pig-leg" />
              <rect x="36" y="44" width="6" height="7" rx="2" className="pig-leg" />
              <rect x="26" y="12" width="12" height="3" rx="1.5" className="pig-slot" />
              <path d="M9 28c-4 0-5-4-2-5" className="pig-tail" />
            </svg>
            {['₹', '$', '€'].map((c, k) => (
              <span key={c} className="jar-coin" style={{ '--k': k }}>
                <i>{c}</i>
              </span>
            ))}
          </span>
          <span className="pw-body">
            <b>Reward jar</b>
            <span className="pw-bar">
              <i style={{ '--p': ((i % list.length) + (phase >= 2 ? 1 : 0)) / list.length }} />
            </span>
          </span>
          {phase >= 2 && <span className="pw-plus">+ points</span>}
        </div>
      ) : (
        <div className={`portal-wallet pw-brief ${phase >= 2 ? 'is-hit' : ''}`}>
          <span className="brief-box">
            <span className="brief-notes">
              {['$', '€', '£'].map((c, k) => (
                <i key={c} style={{ '--k': k }}>
                  {c}
                </i>
              ))}
            </span>
            <Icon name="briefcase" size={22} />
          </span>
          <span className="pw-body">
            <b>Your rewards</b>
            <span className="brief-bars">
              {[0.35, 0.5, 0.45, 0.7, 0.62, 0.9].map((h, k) => (
                <i key={k} style={{ '--h': h, '--k': k }} className={k <= (i % list.length) + (phase >= 2 ? 2 : 1) ? 'is-up' : ''} />
              ))}
            </span>
          </span>
          {phase >= 2 && <span className="pw-plus">+ reward</span>}
        </div>
      )}
      {phase >= 2 && (
        <div className="portal-reward" key={`r-${aud}-${i}`}>
          <span className="pr-coin">
            <T2OMark size={30} />
          </span>
          <span>
            <b>Reward unlocked</b>
            <small>{`Redeem via ${METHOD_LABEL[p.m]}`}</small>
          </span>
          <span className="pr-burst">
            {Array.from({ length: 8 }).map((_, k) => (
              <i key={k} style={{ '--k': k }} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

// The hero flips between Consumers and Professionals on its own (Kunal, 18 Nov 2026). It pauses while the
// visitor hovers or focuses the switch, while it is off screen or the tab is hidden, and for a while after
// they pick a side themselves. Off for people who ask for reduced motion.
const FLIP_MS = 7000;
const HOLD_MS = 20000;

export default function HomeHero() {
  const [aud, setAud] = useState('consumer');
  const [tick, setTick] = useState(1);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const [auto, setAuto] = useState(false);
  const sec = React.useRef(null);
  const { lang } = useI18n();
  const a = AUDIENCES[aud];
  useEffect(() => {
    setAuto(!prefersReducedMotion());
    const el = sec.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const running = auto && !paused && !held && visible;
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => {
      if (document.hidden) return setTick((n) => n + 1);
      setAud((x) => AUD_ORDER[(AUD_ORDER.indexOf(x) + 1) % AUD_ORDER.length]);
      setTick((n) => n + 1);
    }, FLIP_MS);
    return () => clearTimeout(t);
  }, [running, tick]);
  useEffect(() => {
    if (!held) return undefined;
    const t = setTimeout(() => {
      setHeld(false);
      setTick((n) => n + 1);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [held]);
  const pick = (k) => {
    if (k !== aud) playAudience(k);
    setAud(k);
    setHeld(true);
  };
  // Same hero, animation and taglines in every language. English keeps the original white Turn2Opinion grading;
  // every other language adds a WebGL aurora in its own colour grade behind it (see .hero-aurora in i18n.css).
  return (
    <section
      ref={sec}
      className={`hero hero-${aud} ${lang !== 'en' ? 'is-graded' : ''}`}
>
      {lang !== 'en' && (
        <div className="hero-aurora" aria-hidden="true">
          <AuroraCanvas />
        </div>
      )}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob b1" />
        <span className="hero-blob b2" />
        <span className="hero-blob b3" />
        <span className="hero-grid" />
        {Array.from({ length: 9 }).map((_, k) => (
          <span key={k} className="hero-bubble" style={{ '--k': k }} />
        ))}
      </div>
      <div className="wrap hero-grid-layout">
        <div className="hero-copy">
          <AudienceSwitch value={aud} onChange={pick} timer={auto && !held ? `${aud}-${tick}` : null} paused={!running} ms={FLIP_MS} onHold={setPaused} />
          <RoleRibbon aud={aud} />
          <p className="hero-motto" key={`m-${aud}`}>
            {a.motto.map((w, i) => (
              <span key={w} className={`motto-word w${i + 1}`}>
                {w}
              </span>
            ))}
          </p>
          <h1 className="hero-title">
            <span className="ht-line l1" key={`t1-${aud}`}>{a.title ? a.title[0] : 'Paid Online Surveys.'}</span>
            <span className="ht-line l2" key={`t2-${aud}`}>{a.title ? a.title[1] : 'Your Opinion Matters.'}</span>
          </h1>
          <p className="hero-tagline" key={aud}>
            <WordSplit text={a.tagline} />
          </p>
          <p className="hero-lead" key={`l-${aud}`}>
            {a.lead} <Rotator words={a.who} /> {a.leadEnd}
          </p>
          <div className="hero-actions" key={`a-${aud}`}>
            <a href={JOIN_LINK[aud]} className="btn btn-primary btn-lg btn-shimmer">
              {a.cta} <Icon name="arrow" size={18} />
            </a>
            <Link to={aud === 'minor' ? '/earn/minors/' : '/how-it-works/'} className="btn btn-ghost btn-lg">
              <Icon name="play" size={18} /> {aud === 'minor' ? 'See how the two keys work' : 'How it works'}
            </Link>
          </div>
          <ul className="hero-proof" key={`p-${aud}`}>
            {PROOF[aud].map((t) => (
              <li key={t}>
                <Icon name="check" size={16} /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-art" key={`art-${aud}`}>
          {aud === 'minor' ? <TeenStage /> : <RewardStage aud={aud} />}
        </div>
      </div>
    </section>
  );
}
