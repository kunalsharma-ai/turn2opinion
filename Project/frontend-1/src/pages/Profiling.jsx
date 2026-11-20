import { Link } from '../router/Router.jsx';
import { useEffect, useState } from 'react';
import { useInView, useReveal, prefersReducedMotion } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import { PrivacyVault, SecurityHive, TeenSafeguards, VerificationStack } from '../components/sections/Security.jsx';
import Icon from '../components/Icon.jsx';
import { SITE } from '../config/site.js';

const SEGMENTS = [
  ['user', 'About you', 'Age, gender, where you live'],
  ['home', 'Household & family', 'Who lives with you, kids, pets'],
  ['briefcase', 'Work & employment', 'Your job, hours and role'],
  ['building', 'Company & industry', 'Sector, size, what you buy'],
  ['cap', 'Education', 'Your highest qualification'],
  ['phone', 'Technology & media', 'Devices, apps, streaming'],
  ['car', 'Automotive', 'What you drive or ride'],
  ['bank', 'Finance & insurance', 'Banking, cards, policies'],
  ['pulse', 'Health & wellness', 'Fitness, care, wellbeing'],
  ['plane', 'Travel & leisure', 'Trips, hotels, hobbies'],
  ['bag', 'Shopping & brands', 'Where and how you shop']
];

const STANDARDS = [
  ['refresh', 'Master data refreshed for every member'],
  ['copy', 'Duplicates cleaned – automatically and by hand'],
  ['clock', 'Inactive accounts suspended'],
  ['pulse', 'Speeding, straight-lining and lazy open answers flagged'],
  ['search', 'Untrustworthy participants found and removed'],
  ['headset', 'A helpline that actually answers'],
  ['mail', 'Email and postal address checked against local directories'],
  ['globe', 'GeoIP, unique-IP and proxy checks by country'],
  ['finger', 'Digital fingerprinting blocks duplicates in real time']
];

/** A member card that fills section by section; the match meter climbs as the profile completes. */
function ProfileBuilder() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setK(SEGMENTS.length);
      return undefined;
    }
    const t = setTimeout(() => setK((n) => (n >= SEGMENTS.length ? 0 : n + 1)), k >= SEGMENTS.length ? 3200 : 520);
    return () => clearTimeout(t);
  }, [inView, k]);
  const pct = Math.round((k / SEGMENTS.length) * 100);
  return (
    <div className="pbuild" ref={ref}>
      <div className="pb-card" aria-hidden="true">
        <div className="pb-top">
          <span className="pb-photo">
            <img src={asset('/images/people/health.svg')} alt="Illustration of a healthcare professional completing her survey profile" width="120" height="140" />
          </span>
          <div className="pb-id">
            <strong>Member profile</strong>
            <span className="pb-ring" style={{ '--p': pct }}>
              <b>{pct}%</b>
            </span>
          </div>
        </div>
        <div className="pb-slots">
          {SEGMENTS.map(([ic, t], i) => (
            <span key={t} className={`pb-slot ${i < k ? 'is-on' : ''}`} style={{ '--i': i }}>
              <Icon name={ic} size={16} />
            </span>
          ))}
        </div>
        <div className="pb-meter">
          <span>Surveys you can be matched to</span>
          <i style={{ '--p': pct / 100 }} />
        </div>
      </div>
      <ul className="pb-list">
        {SEGMENTS.map(([ic, t, d], i) => (
          <li key={t} className={i < k ? 'is-on' : i === k ? 'is-now' : ''}>
            <span className="pb-ico">
              <Icon name={i < k ? 'check' : ic} size={16} />
            </span>
            <span>
              <strong>{t}</strong>
              <small>{d}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gauge() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div className={`gauge ${inView ? 'is-run' : ''}`} ref={ref} aria-hidden="true">
      <svg viewBox="0 0 240 140">
        <defs>
          <linearGradient id="gg" x1="0" x2="1">
            <stop offset="0" stopColor="#FF5C7A" />
            <stop offset=".5" stopColor="#FFB020" />
            <stop offset="1" stopColor="#12C29B" />
          </linearGradient>
        </defs>
        <path d="M20 120 A100 100 0 0 1 220 120" className="gauge-bg" />
        <path d="M20 120 A100 100 0 0 1 220 120" className="gauge-fg" stroke="url(#gg)" />
        <g className="gauge-needle">
          <line x1="120" y1="120" x2="120" y2="36" />
          <circle cx="120" cy="120" r="9" />
        </g>
      </svg>
      <div className="gauge-labels">
        <span>Needs work</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>
      <p className="gauge-title">Quality score</p>
    </div>
  );
}

export default function Profiling() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero
        theme="prism"
        crumbs={[{ label: 'Profiling & Quality' }]}
        kicker="Profiling standard"
        title="Survey Profiling & Quality Score"
        tagline="Honest profiles. Fair surveys. Protected data."
        lead="Complete your profile accurately to match more surveys. Our quality score and multi-layer security keep research fair for honest members."
        art={<Gauge />}
      />

      <section className="section s-paper" aria-labelledby="seg-h">
        <div className="wrap pb-wrap">
          <div data-reveal>
            <h2 id="seg-h">Your profile, section by section</h2>
            <p>
              A rigorous registration process validates every new member, and profile sections are refreshed through periodic screeners so
              your information stays current as your life changes.
            </p>
            <p>
              Each completed and validated section earns points toward your rewards. The more complete your profile, the more targeted –
              and frequent – your survey invitations.
            </p>
            <Link to="/blog/survey-profiling-more-invitations/" className="link-arrow">
              Why profiling gets you more invitations <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ProfileBuilder />
        </div>
      </section>

      <section className="section s-night" aria-labelledby="bot-h">
        <div className="wrap layers3">
          <SectionHead id="bot-h" title="Three gates every member passes" align="center" />
          <div className="gatewalk">
            <div className="gw-track" aria-hidden="true">
              <span className="gw-floor" />
              {[0, 1, 2].map((i) => (
                <span key={i} className="gw-arch" style={{ '--i': i }}>
                  <span className="gw-light" />
                </span>
              ))}
              <span className="gw-walker">
                <img src={asset('/images/people/retiree.svg')} alt="Illustration of a retired panel member whose profile matches a new survey" width="80" height="96" />
              </span>
              <span className="gw-flag">
                <Icon name="check" size={18} /> Verified
              </span>
            </div>
            <div className="gw-cards">
              <div className="gw-card" style={{ '--i': 0 }} data-reveal>
                <span className="gw-ico">
                  <Icon name="bot" size={24} />
                </span>
                <h3>BOT validation</h3>
                <p>A server-checked CAPTCHA at registration and login, randomised attention checks and open-answer checks (no copy-paste) stop bots before they reach a survey.</p>
              </div>
              <div className="gw-card" style={{ '--i': 1 }} data-reveal>
                <span className="gw-ico">
                  <Icon name="gate" size={24} />
                </span>
                <h3>Gate survey & pre-screener</h3>
                <p>Before a client survey, members confirm they are real and paying attention. Anyone who fails attention or open-end checks doesn’t go further.</p>
              </div>
              <div className="gw-card" style={{ '--i': 2 }} data-reveal>
                <span className="gw-ico">
                  <Icon name="pin" size={24} />
                </span>
                <h3>Survey-level security</h3>
                <p>CAPTCHA, gate surveys, pre-screening, geo-tagging, IP scoring, location checks and digital fingerprinting at every level.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section s-indigo" aria-labelledby="checks-h">
        <div className="wrap">
          <SectionHead id="checks-h" title="Quality & security checks" lead="Eighteen controls, grouped by what they protect." align="center" />
          <SecurityHive />
          <TeenSafeguards />
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="ver-h">
        <div className="wrap verify-grid on-light">
          <div data-reveal>
            <h2 id="ver-h">Verification & validation protocols</h2>
            <p>We implement multi-layer authentication to ensure the integrity of our community.</p>
            <VerificationStack />
          </div>
          <PrivacyVault />
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="std-h">
        <div className="wrap">
          <SectionHead id="std-h" title="Quality standards we hold ourselves to" lead="Our radar never switches off: nine checks sweep every account and every answer, backed by ISO 9001, ISO/IEC 27001 and ISO 20252 certification." />
          <div className="qr-wrap">
            <div className="qr" aria-hidden="true">
              <span className="qr-grid" />
              <span className="qr-sweep" />
              {STANDARDS.map(([ic], i) => (
                <span key={i} className="qr-blip" style={{ '--a': `${i * 40}deg`, '--i': i }}>
                  <span>
                    <Icon name={ic} size={16} />
                  </span>
                </span>
              ))}
              <span className="qr-core">
                <Icon name="shield" size={26} />
                <b>9 checks</b>
              </span>
            </div>
            <ol className="qr-list">
              {STANDARDS.map(([ic, t], i) => (
                <li key={t} style={{ '--i': i }}>
                  <span className="qr-ico">
                    <Icon name={ic} size={16} />
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <ul className="seals" aria-label="Certifications">
            {SITE.certifications.map((c, i) => (
              <li key={c.id} style={{ '--i': i }}>
                <span className="seal2-ring" aria-hidden="true" />
                <Icon name="shield" size={18} />
                <strong>{c.label}</strong>
                <small>{c.note}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Quality members earn more. Join the community." variant="aurora" />
    </div>
  );
}
