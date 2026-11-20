// About Turn2Opinion — v4 redesign.
//
// The page tells the story with pictures instead of paragraphs. Every section has its own visual
// language so nothing reads like a repeated template:
//
//   Round 12 (Kunal, 20 Nov 2026) replaced the flagged sections with the objects in
//   components/about/AboutV5.jsx: a prism hero, an ask/answer chat, an opinion river, an
//   instrument-panel numbers board, value pillars, framed certificates, a gem-meter reviews gate
//   and one flag river per region. The family tree and product worlds are unchanged.

import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import { OpinionPrism, AskAnswerThread, OpinionRiver, GlanceBoard, ValuePillars, CertFrames, ReviewGate, RegionStreams } from '../components/about/AboutV5.jsx';
import Icon from '../components/Icon.jsx';
import { Flag, FrLogo } from '../components/Brand.jsx';
import GemScore from '../components/rating/GemScore.jsx';
import { TESTIMONIALS } from '../data/testimonials.js';
import { SURVEYS } from '../data/surveys.js';

const CONSUMER = SURVEYS.consumer || [];
const PRO = SURVEYS.professional || [];
const TEEN = SURVEYS.teen || [];

const ROTATE = ['real rewards', 'better products', 'smarter policies', 'clearer decisions'];
function RotatingWords() {
  return (
    <span className="rw">
      <span className="sr-only">{ROTATE[0]}</span>
      <span className="rw-track" aria-hidden="true">
        {[...ROTATE, ROTATE[0]].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </span>
    </span>
  );
}

/* ---------------- 5. Family tree ---------------- */
const FAMILY_EXTRA = {
  turn2opinion: { tag: 'Turn your opinion into rewards.', who: 'Consumers, professionals & teens (13–17)' },
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
const isTeenR = (t) => t.audience === 'teen';
// What makes the teen panel different: the safeguards a parent would ask about first.
const TEEN_PROMISES = [
  ['key', 'Two keys', 'A verified parent or guardian says yes, then the teen says yes in their own words.'],
  ['cake', 'Ages 13–17 only', 'Date of birth is checked at sign-up and again in screeners.'],
  ['eye', 'Age-appropriate studies', 'Every study is reviewed before teens see it. Sensitive topics need separate permission.'],
  ['lock', 'Less data, by design', 'No school names, no photos, no location tracking. Answers are reported in totals.'],
  ['wallet', 'A parent picks the payout', 'Rewards go to a method the family has approved.'],
  ['refresh', 'Stop any time', 'Skip any question, pause or close the account, no questions asked.']
];
function ProductWorlds() {
  const consumers = TESTIMONIALS.filter((t) => !isPro(t) && !isTeenR(t) && t.text).slice(0, 6);
  const teens = TESTIMONIALS.filter((t) => isTeenR(t) && t.text).slice(0, 4);
  const pros = TESTIMONIALS.filter((t) => isPro(t) && t.text).slice(0, 8);
  return (
    <section className="ab-worlds" aria-labelledby="ab-w-h">
      <div className="wrap abw-head">
        <SectionHead id="ab-w-h" kicker="Three panels, three flavours" title="Every panel has its own world" align="center" lead="Same honest rewards, built for very different days: consumers, professionals and, new this year, teens aged 13 to 17." />
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
                  {t.rating ? <GemScore rating={t.rating} size={15} /> : null}
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
                    {t.rating ? <GemScore rating={t.rating} size={15} /> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="abw abw--teen">
        <span className="abw-floor" aria-hidden="true" />
        <div className="wrap abw-grid">
          <div className="abw-copy" data-reveal>
            <span className="abw-badge">
              <Icon name="sparkles" size={16} /> Teen panel · 13–17 <b className="abw-new">New</b>
            </span>
            <h3>
              Your taste sets the trend. <em>Now it earns points.</em>
            </h3>
            <p className="abw-lead">
              Games, music, snacks, trainers and study apps: brands build them for teens, so they need to hear from teens. Every member joins with a
              parent or guardian’s permission and their own yes, and every study is checked before it reaches them.
            </p>
            <ul className="abw-tags">
              {TEEN.slice(0, 8).map((s) => (
                <li key={s.id} style={{ '--c': s.c }}>
                  <Icon name={s.icon} size={14} /> {s.cat}
                </li>
              ))}
            </ul>
            <div className="abw-ctas">
              <Link to="/join/teen/" className="abw-cta">
                Join the teen panel <Icon name="arrow" size={16} />
              </Link>
              <Link to="/earn/teens/" className="abw-cta is-ghost">
                How the two keys work
              </Link>
            </div>
          </div>
          <div className="abw-teen-side">
            <ul className="abw-promises">
              {TEEN_PROMISES.map(([ic, t, d], i) => (
                <li key={t} style={{ '--i': i }} data-reveal>
                  <span className="abw-p-ico">
                    <Icon name={ic} size={18} />
                  </span>
                  <strong>{t}</strong>
                  <small>{d}</small>
                </li>
              ))}
            </ul>
            <ul className="abw-notes">
              {teens.map((t, i) => (
                <li key={t.id} style={{ '--i': i }}>
                  <span className="abw-wave" aria-hidden="true">
                    {Array.from({ length: 14 }).map((_, k) => (
                      <i key={k} style={{ '--k': k }} />
                    ))}
                  </span>
                  <p>“{t.text}”</p>
                  <footer>
                    <Flag code={t.country} size={14} /> <strong>{t.name}</strong> <span>{t.role}</span>
                    <em>Sample review</em>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="wrap abw-note">
        Reviews are from members who agreed to publish them. Teen reviews are labelled samples until real ones are published. <Link to="/about/reviews/">Read every review</Link>.
      </p>
    </section>
  );
}

/* ---------------- 7. Values honeycomb ---------------- */
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
        art={<OpinionPrism />}
      />

      <section className="section s-paper" aria-labelledby="bridge-h">
        <div className="wrap">
          <SectionHead id="bridge-h" kicker="In between" title="Your answer, their decision" align="center" lead="Turn2Opinion sits between the people with questions and the people with answers, and makes sure both sides are treated fairly." />
          <AskAnswerThread />
        </div>
      </section>

      <section className="section ab-river" aria-labelledby="ab-j-h">
        <div className="wrap">
          <SectionHead id="ab-j-h" kicker="The journey" title="How one opinion travels" align="center" lead="Scroll down and follow one answer from a brand’s question to your reward." />
          <OpinionRiver />
        </div>
      </section>
      <section className="section ab-glance" aria-labelledby="ab-n-h">
        <div className="wrap">
          <SectionHead id="ab-n-h" kicker="By the numbers" title="Turn2Opinion at a glance" lead="Every figure on this board comes straight from the surveys, countries and reward options we run today." />
          <GlanceBoard />
        </div>
      </section>
      <FamilyTree />
      <ProductWorlds />
      <section className="section ab-values" aria-labelledby="ab-v-h">
        <div className="wrap">
          <SectionHead id="ab-v-h" kicker="Our promise" title="What we stand for" align="center" lead="Six promises. Hover, tap or tab through the pillars to open each one." />
          <ValuePillars />
        </div>
      </section>
      <section className="section ab-certs" aria-labelledby="ab-c-h">
        <div className="wrap">
          <SectionHead id="ab-c-h" kicker="Independently checked" title="Checked by people who aren’t us" align="center" lead="Outside bodies audit how we manage quality, protect data and run research. These are the certificates on the wall." />
          <CertFrames />
        </div>
      </section>

      {/* Gateway to the full ratings & reviews page. */}
      <section className="section s-paper" aria-labelledby="rv-gate-h">
        <div className="wrap">
          <ReviewGate />
        </div>
      </section>

      <section className="section s-board" aria-labelledby="reach2-h">
        <div className="wrap">
          <SectionHead id="reach2-h" title="Where our members are" align="center" />
          <RegionStreams />
          <p className="center-link light" data-reveal>
            Have a question for us? <Link to="/contact/">Contact Turn2Opinion</Link>.
          </p>
        </div>
      </section>
      <CtaBand variant="stars" />
    </div>
  );
}
