// About Turn2Opinion — v4 redesign.
//
// The page tells the story with pictures instead of paragraphs. Every section has its own visual
// language so nothing reads like a repeated template:
//
//   1. Hero ............ a turning 3D wire globe with brands, members and payouts in orbit
//   2. Bridge .......... who asks and who answers (kept from v3)
//   3. Journey ......... one opinion's trip from a brand's question to your reward, as a flow line
//   4. By the numbers .. stat tiles, a region bar chart and a pay scatter plot built from the
//                        site's own data (profiles.js, surveys.js) so the charts never drift
//   5. Family tree ..... Frequent Research and the panels it runs, as an org diagram
//   6. Product worlds .. Consumer and Professional panels, each in its own colour world with its
//                        own member testimonials (only genuine reviews from data/testimonials.js)
//   7. Values .......... a honeycomb of flip tiles
//   8. Certifications .. 3D medals that turn over
//   9. (the footer's Scan & Connect hub now carries every brand's channels and QR codes)
//  10. Reviews gate + member flags + CTA (kept)
import { useEffect, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { useInView, useReveal, prefersReducedMotion } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import FlagCarousel from '../components/sections/FlagCarousel.jsx';
import Icon from '../components/Icon.jsx';
import { Flag, FrLogo, T2OMark } from '../components/Brand.jsx';
import { REGIONS, ALL_COUNTRIES } from '../data/profiles.js';
import { SURVEYS } from '../data/surveys.js';
import { TESTIMONIALS } from '../data/testimonials.js';

/* ---------------- 1. Hero art: a 3D wire globe ---------------- */
function OpinionGlobe() {
  return (
    <div className="ag" aria-hidden="true">
      <div className="ag-stage">
        <div className="ag-globe">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={'m' + i} className="ag-mer" style={{ '--i': i }} />
          ))}
          {[-50, -25, 0, 25, 50].map((lat, i) => (
            <i key={'p' + i} className="ag-par" style={{ '--lat': lat }} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <b key={'d' + i} className="ag-dot" style={{ '--i': i }} />
          ))}
        </div>
      </div>
      <span className="ag-core">
        <T2OMark size={64} />
      </span>
      <span className="ag-orbit o1">
        {[
          ['megaphone', 'Brands'],
          ['users', 'Consumers'],
          ['briefcase', 'Professionals']
        ].map(([ic, t], i) => (
          <b key={t} style={{ '--i': i, '--n': 3 }}>
            <Icon name={ic} size={14} /> {t}
          </b>
        ))}
      </span>
      <span className="ag-orbit o2">
        {['PayPal', 'Cash', 'Bank', 'Wire', 'UPI', 'Shopping', 'Grocery', 'Gift cards'].map((t, i) => (
          <b key={t} style={{ '--i': i, '--n': 4 }}>
            <Icon name="coin" size={12} /> {t}
          </b>
        ))}
      </span>
    </div>
  );
}

const ROTATE = ['real rewards', 'better products', 'smarter policies', 'clearer decisions'];
function RotatingWords() {
  return (
    <span className="rw" aria-label={ROTATE[0]}>
      <span className="rw-track" aria-hidden="true">
        {[...ROTATE, ROTATE[0]].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </span>
    </span>
  );
}

/* ---------------- 3. Journey of one opinion ---------------- */
const JOURNEY = [
  ['megaphone', 'A brand asks', 'A company, agency or public body has a question.', '#FF5C7A'],
  ['clipboard', 'Survey is built', 'Frequent Research designs a short, fair survey.', '#FFB020'],
  ['target', 'Matched to you', 'Your profile decides which invitations you get.', '#12C29B'],
  ['chat', 'You answer', 'Honest opinions, on mobile or desktop.', '#49B6FF'],
  ['pulse', 'Insight lands', 'Answers are combined, never sold one by one.', '#7B5CFF'],
  ['gift', 'You get rewarded', 'PayPal, cash, bank, wire, vouchers, gift cards or UPI in India.', '#1F5BFF']
];
function Journey() {
  return (
    <section className="section ab-journey" aria-labelledby="ab-j-h">
      <div className="wrap">
        <SectionHead id="ab-j-h" kicker="The journey" title="How one opinion travels" align="center" />
        <div className="abj" data-reveal>
          <svg className="abj-line" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="abj-g" x1="0" x2="1">
                {JOURNEY.map(([, , , c], i) => (
                  <stop key={i} offset={i / (JOURNEY.length - 1)} stopColor={c} />
                ))}
              </linearGradient>
            </defs>
            <path id="abj-p" d="M20 100 C 140 10, 260 190, 400 100 S 660 10, 800 100 S 1060 190, 1180 100" />
            <circle r="8" className="abj-pulse">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#abj-p" />
              </animateMotion>
            </circle>
          </svg>
          <ol className="abj-stops">
            {JOURNEY.map(([ic, t, d, c], i) => (
              <li key={t} style={{ '--c': c, '--i': i }}>
                <span className="abj-ico">
                  <Icon name={ic} size={24} />
                  <em>{String(i + 1).padStart(2, '0')}</em>
                </span>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. By the numbers ---------------- */
function CountUp({ to, run, suffix = '' }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run || prefersReducedMotion()) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <>
      {v}
      {suffix}
    </>
  );
}

const CONSUMER = SURVEYS.consumer || [];
const PRO = SURVEYS.professional || [];
const avg = (l, k) => (l.length ? l.reduce((s, x) => s + x[k], 0) / l.length : 0);

function Numbers() {
  const [ref, seen] = useInView({ threshold: 0.25 });
  // Latch: count and draw once, the first time the board is seen.
  const [inView, setLive] = useState(false);
  useEffect(() => {
    if (seen) setLive(true);
  }, [seen]);
  const maxRegion = Math.max(...REGIONS.map((r) => r.countries.length));
  const all = [...CONSUMER.map((s) => ({ ...s, k: 'c' })), ...PRO.map((s) => ({ ...s, k: 'p' }))];
  const maxR = Math.max(...all.map((s) => s.reward));
  const maxM = Math.max(...all.map((s) => s.mins));
  const stats = [
    [ALL_COUNTRIES.length, '', 'countries', 'globe', '#49B6FF'],
    [REGIONS.length, '', 'regions', 'map', '#12C29B'],
    [CONSUMER.length + PRO.length, '', 'survey topics', 'clipboard', '#FFB020'],
    [4, '', 'ways to get paid', 'wallet', '#FF5C7A'],
    [SITE.certifications.length, '', 'certifications', 'shield', '#7B5CFF'],
    [24, '/7', 'live help', 'headset', '#1F5BFF']
  ];
  return (
    <section className={`section ab-num${inView ? ' is-live' : ''}`} aria-labelledby="ab-n-h" ref={ref}>
      <div className="wrap">
        <SectionHead id="ab-n-h" kicker="By the numbers" title="Turn2Opinion at a glance" lead="Every figure on this board comes straight from the surveys and countries we run today." />
        <div className="abn-bento">
          <ul className="abn-stats">
            {stats.map(([n, suf, l, ic, c], i) => (
              <li key={l} style={{ '--c': c, '--i': i }}>
                <Icon name={ic} size={20} />
                <b>
                  <CountUp to={n} run={inView} suffix={suf} />
                </b>
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <figure className="abn-card abn-bars">
            <figcaption>
              <strong>Where members are invited from</strong>
              <span>Countries per region</span>
            </figcaption>
            <ul>
              {REGIONS.map((r, i) => (
                <li key={r.id} style={{ '--c': r.accent, '--w': r.countries.length / maxRegion, '--i': i }}>
                  <span className="abn-l">{r.name}</span>
                  <span className="abn-track">
                    <i />
                  </span>
                  <b>{r.countries.length}</b>
                </li>
              ))}
            </ul>
          </figure>

          <figure className="abn-card abn-scatter">
            <figcaption>
              <strong>Two panels, two pay scales</strong>
              <span>Typical reward (USD) against survey length, one dot per topic</span>
            </figcaption>
            <svg viewBox="0 0 320 200" role="img" aria-label={`Consumer surveys average $${avg(CONSUMER, 'reward').toFixed(1)} for about ${Math.round(avg(CONSUMER, 'mins'))} minutes; professional surveys average $${avg(PRO, 'reward').toFixed(1)} for about ${Math.round(avg(PRO, 'mins'))} minutes.`}>
              {[0, 0.25, 0.5, 0.75, 1].map((g) => (
                <line key={g} className="grid" x1="30" x2="310" y1={180 - g * 160} y2={180 - g * 160} />
              ))}
              <text className="ax" x="30" y="196">
                0 min
              </text>
              <text className="ax" x="310" y="196" textAnchor="end">
                {maxM} min
              </text>
              <text className="ax" x="26" y="24" textAnchor="end">
                ${maxR}
              </text>
              {all.map((s, i) => (
                <circle
                  key={s.id + s.k}
                  className={`dot ${s.k}`}
                  cx={30 + (s.mins / maxM) * 280}
                  cy={180 - (s.reward / maxR) * 160}
                  r={s.k === 'p' ? 6 : 5}
                  style={{ '--i': i }}
                >
                  <title>{`${s.title}: about $${s.reward}, ${s.mins} min`}</title>
                </circle>
              ))}
            </svg>
            <p className="abn-legend">
              <span className="c">Consumer · avg ${avg(CONSUMER, 'reward').toFixed(1)}</span>
              <span className="p">Professional · avg ${avg(PRO, 'reward').toFixed(1)}</span>
            </p>
          </figure>

          <figure className="abn-card abn-pay">
            <figcaption>
              <strong>Ways to get paid</strong>
              <span>Every member, plus UPI in India</span>
            </figcaption>
            <div className="abn-wheel">
              {[
                ['PayPal', 'wallet', '#003087'],
                ['Cash', 'cash', '#0F9D58'],
                ['Bank', 'bank', '#0E7C66'],
                ['Wire', 'globe', '#2F6BFF'],
                ['UPI · India', 'upi', '#5B2EA6'],
                ['Shopping', 'cart', '#E8590C'],
                ['Grocery', 'basket', '#C77700'],
                ['Gift cards', 'card', '#7048E8']
              ].map(([t, ic, c], i) => (
                <span key={t} style={{ '--c': c, '--i': i }}>
                  <Icon name={ic} size={18} />
                  {t}
                </span>
              ))}
              <b>
                <Icon name="coin" size={26} />
              </b>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. Family tree ---------------- */
const FAMILY_EXTRA = {
  turn2opinion: { tag: 'Turn your opinion into rewards.', who: 'Consumers & professionals' },
  myfrequentrewards: { tag: 'Share your views. Earn every time.', who: 'Consumers & professionals' },
  myhealthopinions: { tag: 'Your experience can improve healthcare.', who: 'HCPs, patients & caregivers' }
};
function FamilyTree() {
  const panels = SITE.family.filter((f) => f.id !== 'frequentresearch');
  return (
    <section className="section ab-tree" aria-labelledby="ab-t-h">
      <div className="wrap">
        <SectionHead id="ab-t-h" kicker="The family" title="Part of Frequent Research" align="center" />
        <div className="abt" data-reveal>
          <a className="abt-root" href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">
            <FrLogo width={190} />
            <span className="abt-chips">
              <i>
                <Icon name="pin" size={13} /> New Delhi, India
              </i>
              <i>
                <Icon name="shield" size={13} /> ISO 9001 · 27001 · 20252
              </i>
              <i>
                <Icon name="globe" size={13} /> ESOMAR member
              </i>
            </span>
          </a>
          <svg className="abt-links" viewBox="0 0 900 90" preserveAspectRatio="none" aria-hidden="true">
            <path d="M450 0 V40 M150 40 H750 M150 40 V90 M450 40 V90 M750 40 V90" />
          </svg>
          <ul className="abt-kids">
            {panels.map((p, i) => (
              <li key={p.id} className={p.self ? 'is-self' : ''} style={{ '--t1': p.tint, '--t2': p.tint2, '--i': i }}>
                <img src={asset(p.logo)} alt={`${p.label} logo`} width="150" height="48" loading="lazy" decoding="async" />
                <strong>{p.label}</strong>
                <span className="abt-who">{(FAMILY_EXTRA[p.id] || {}).who || p.kind}</span>
                <em>{(FAMILY_EXTRA[p.id] || {}).tag || p.blurb}</em>
                {p.self ? (
                  <span className="abt-here">
                    <Icon name="check" size={13} /> You are here
                  </span>
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit <Icon name="external" size={13} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. Product worlds with testimonials ---------------- */
const isPro = (t) => t.audience === 'professional';
function ProductWorlds() {
  const consumers = TESTIMONIALS.filter((t) => !isPro(t) && t.text).slice(0, 6);
  const pros = TESTIMONIALS.filter((t) => isPro(t) && t.text).slice(0, 8);
  return (
    <section className="ab-worlds" aria-labelledby="ab-w-h">
      <div className="wrap abw-head">
        <SectionHead id="ab-w-h" kicker="Two panels, two flavours" title="Every panel has its own world" align="center" lead="Same honest rewards, built for very different days." />
      </div>

      <div className="abw abw--consumer">
        <div className="wrap abw-grid">
          <div className="abw-copy" data-reveal>
            <span className="abw-badge">
              <Icon name="bag" size={16} /> Consumer panel
            </span>
            <h3>
              Shop it. Rate it. <em>Get rewarded for it.</em>
            </h3>
            <ul className="abw-tags">
              {CONSUMER.slice(0, 8).map((s) => (
                <li key={s.id} style={{ '--c': s.c }}>
                  <Icon name={s.icon} size={14} /> {s.cat}
                </li>
              ))}
            </ul>
            <Link to="/join/" className="abw-cta">
              Join as a consumer <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="abw-polaroids">
            {consumers.map((t, i) => (
              <li key={t.id} style={{ '--i': i, '--r': `${((i * 37) % 9) - 4}deg` }} data-reveal>
                <blockquote>“{t.text}”</blockquote>
                <footer>
                  <Flag code={t.country} size={16} /> <strong>{t.name}</strong>
                  <span>{t.role}</span>
                  {t.rating ? <i aria-label={`${t.rating} out of 5`}>{'★'.repeat(t.rating)}</i> : null}
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="abw abw--pro">
        <div className="wrap abw-grid">
          <div className="abw-copy" data-reveal>
            <span className="abw-badge">
              <Icon name="briefcase" size={16} /> Professional panel
            </span>
            <h3>
              Your expertise, <em>valued like it should be.</em>
            </h3>
            <ul className="abw-tags">
              {PRO.slice(0, 8).map((s) => (
                <li key={s.id} style={{ '--c': s.c }}>
                  <Icon name={s.icon} size={14} /> {s.cat || s.title}
                </li>
              ))}
            </ul>
            <Link to="/join/professional/" className="abw-cta">
              Join as a professional <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="abw-deck">
            <ul className="abw-cards">
              {[...pros, ...pros].map((t, i) => (
                <li key={t.id + i} aria-hidden={i >= pros.length ? 'true' : undefined}>
                  <span className="abw-avatar">
                    {t.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>
                      {t.role}
                      {t.company ? ` · ${t.company}` : ''} <Flag code={t.country} size={13} />
                    </span>
                    <p>“{t.text}”</p>
                    {t.rating ? <i aria-label={`${t.rating} out of 5`}>{'★'.repeat(t.rating)}</i> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="wrap abw-note">
        Reviews are from members who agreed to publish them. <Link to="/about/reviews/">Read every review</Link>.
      </p>
    </section>
  );
}

/* ---------------- 7. Values honeycomb ---------------- */
const VALUES = [
  ['heart', 'Respect for your time', 'Short, relevant surveys and honest information about rewards before you start.', '#FF5C7A'],
  ['lock', 'Privacy by default', 'Your details are never sold. Answers are reported in aggregate.', '#49B6FF'],
  ['shield', 'Quality, no shortcuts', 'Strict checks protect honest members and the clients who rely on them.', '#12C29B'],
  ['globe', 'Open to everyone', 'Consumers and professionals in every region and walk of life.', '#FFB020'],
  ['headset', 'Help that answers', 'Live help 24/7, WhatsApp and email with real follow-through.', '#7B5CFF'],
  ['gift', 'Rewards your way', 'PayPal, cash, bank or wire transfer, vouchers or gift cards, plus UPI in India.', '#1F5BFF']
];
function ValuesHive() {
  return (
    <section className="section ab-hive" aria-labelledby="ab-v-h">
      <div className="wrap">
        <SectionHead id="ab-v-h" kicker="Our promise" title="What we stand for" align="center" lead="Hover or tap a cell to turn it over." />
        <ul className="abh">
          {VALUES.map(([ic, t, d, c], i) => (
            <li key={t} style={{ '--c': c, '--i': i }} tabIndex={0} data-reveal>
              <span className="abh-in">
                <span className="abh-f">
                  <Icon name={ic} size={30} />
                  <strong>{t}</strong>
                </span>
                <span className="abh-b">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 8. Certifications as medals ---------------- */
function Medals() {
  return (
    <section className="section ab-medals" aria-labelledby="ab-c-h">
      <div className="wrap">
        <SectionHead id="ab-c-h" kicker="Independently checked" title="Checked by people who aren’t us" align="center" />
        <ul className="abm">
          {SITE.certifications.map((c, i) => (
            <li key={c.id} style={{ '--i': i }} data-reveal>
              <span className="abm-coin">
                <span className="abm-face">
                  <Icon name={c.id === 'esomar' ? 'globe' : c.id === 'msme' ? 'landmark' : 'shield'} size={30} />
                  <b>{c.label.replace(':', ' ').split(' ')[0]}</b>
                </span>
                <span className="abm-back">{c.note}</span>
              </span>
              <strong>{c.label}</strong>
              <span>{c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function About() {
  const ref = useReveal();
  return (
    <div ref={ref} className="about-v4">
      <PageHero
        theme="night"
        crumbs={[{ label: 'About' }]}
        kicker="Who we are"
        title="About Turn2Opinion"
        tagline="Where everyday opinions become real rewards."
        lead={
          <>
            We connect people who have something to say with the companies, agencies and public bodies that want to hear it. Your
            answers turn into <RotatingWords />
          </>
        }
        art={<OpinionGlobe />}
      />

      <section className="section s-paper" aria-labelledby="bridge-h">
        <div className="wrap">
          <SectionHead id="bridge-h" title="Your answer, their decision" align="center" />
          <div className="bridge" data-reveal>
            <div className="bridge-side">
              {['Brands', 'Governments', 'Agencies', 'Institutions'].map((t, i) => (
                <span key={t} className="bridge-chip" style={{ '--i': i }}>
                  <Icon name={['bag', 'landmark', 'megaphone', 'cap'][i]} size={16} /> {t}
                </span>
              ))}
              <p>ask the questions</p>
            </div>
            <div className="bridge-core">
              <span className="bridge-beam b-left" />
              <span className="bridge-hub">
                <img src={asset('/images/brand/turn2opinion-logo-320.webp')} alt="Turn2Opinion logo" width="140" height="43" loading="lazy" />
              </span>
              <span className="bridge-beam b-right" />
            </div>
            <div className="bridge-side">
              {['Consumers', 'Professionals', 'Decision-makers', 'Specialists'].map((t, i) => (
                <span key={t} className="bridge-chip alt" style={{ '--i': i }}>
                  <Icon name={['users', 'briefcase', 'target', 'sparkles'][i]} size={16} /> {t}
                </span>
              ))}
              <p>share answers & get rewarded</p>
            </div>
          </div>
        </div>
      </section>

      <Journey />
      <Numbers />
      <FamilyTree />
      <ProductWorlds />
      <ValuesHive />
      <Medals />

      {/* Gateway to the full ratings & reviews page. */}
      <section className="section s-paper" aria-labelledby="rv-gate-h">
        <div className="wrap">
          <Link to="/about/reviews/" className="rv-gate" data-reveal>
            <span className="rvg-art" aria-hidden="true">
              <span className="rvg-orb" />
              <span className="rvg-ring r1" />
              <span className="rvg-ring r2" />
              <span className="rvg-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className="rvg-copy">
              <span className="rvg-kicker">
                <Icon name="pulse" size={14} /> Judged by the people who use it
              </span>
              <h2 id="rv-gate-h">Read every rating and review</h2>
              <p>The average score, ratings for surveys, rewards, support and mobile, and every review in full. Low scores included.</p>
            </span>
            <span className="rvg-go" aria-hidden="true">
              <Icon name="arrow" size={20} />
            </span>
          </Link>
        </div>
      </section>

      <section className="section s-board" aria-labelledby="reach2-h">
        <div className="wrap">
          <SectionHead id="reach2-h" title="Where our members are" align="center" />
          <FlagCarousel />
          <p className="center-link light" data-reveal>
            Have a question for us? <Link to="/contact/">Contact Turn2Opinion</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
