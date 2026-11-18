import { useEffect, useRef } from 'react';
import { SITE, waLink } from '../config/site.js';
import { Link, usePath } from '../router/Router.jsx';
import { FrLogo, Logo, T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';
import { LanguageButton } from './Language.jsx';
import QrHub from './sections/QrHub.jsx';

const COLS = [
  {
    title: 'Earn',
    links: [
      ['/paid-surveys/', 'Earn with paid surveys'],
      ['/how-it-works/', 'How it works'],
      ['/rewards/', 'Rewards'],
      ['/profiling/', 'Trust & safety'],
      ['/join/', 'Join free']
    ]
  },
  {
    title: 'Learn',
    links: [
      ['/about/', 'About us'],
      ['/about/reviews/', 'Ratings & reviews'],
      ['/about/scan-connect/', 'Scan & connect'],
      ['/blog/', 'Blogs'],
      ['/faq/', 'FAQ'],
      ['/contact/', 'Contact'],
      ['/sitemap/', 'Sitemap']
    ]
  },
  {
    title: 'Legal',
    links: [
      ['/privacy/', 'Privacy policy'],
      ['/gdpr/', 'GDPR compliance'],
      ['/cookies/', 'Cookie policy'],
      ['/terms/', 'Terms of use']
    ]
  }
];

// Faces of the rotating 3D reward cube (UPI is labelled India-only, matching src/data/payouts.js).
const CUBE = [
  { face: 'front', icon: 'wallet', label: 'PayPal', c1: '#003087', c2: '#009CDE' },
  { face: 'right', icon: 'transfer', label: 'Wire Transfer', c1: '#3A1C71', c2: '#7B5CFF' },
  { face: 'back', icon: 'gift', label: 'Amazon Gift Card', c1: '#232F3E', c2: '#FF9900' },
  { face: 'left', icon: 'phone', label: 'UPI · India', c1: '#0E7A4B', c2: '#12C29B' }
];

function RewardCube() {
  return (
    <div className="fs-scene" aria-hidden="true">
      <div className="fs-floor" />
      <div className="fs-beam" />
      <div className="fs-cube-wrap">
        <div className="fs-cube">
          {CUBE.map((f) => (
            <span key={f.face} className={`fs-face fs-${f.face}`} style={{ '--c1': f.c1, '--c2': f.c2 }}>
              <Icon name={f.icon} size={34} />
              <b>{f.label}</b>
            </span>
          ))}
          <span className="fs-face fs-top">
            <T2OMark size={64} />
          </span>
          <span className="fs-face fs-bottom" />
        </div>
      </div>
      <span className="fs-shadow" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`fs-coin k${i}`}>
          <i />
        </span>
      ))}
      <span className="fs-ring r1" />
      <span className="fs-ring r2" />
    </div>
  );
}

/** Giant outlined wordmark (same treatment as the MyFrequentRewards / MyHealthOpinions footers): construction
 *  guide lines, a hairline outline on every letter, a colour fill that grows from dark on the left to bright brand
 *  colours on the right, a light sweep gliding across the letters, a twinkling spark and a spinning ring.
 *  Pure SVG + CSS (transform/opacity only); paused while off-screen by AnimationGate. */
const WORDMARK_GRADES = {
  // TURN2OPINION: midnight navy → logo navy → royal blue → sky → violet → reward gold
  t2o: [['0', '#0a1238', 0], ['.12', '#13205e', 0.6], ['.34', '#1544c9', 1], ['.52', '#1f5bff', 1], ['.68', '#49b6ff', 1], ['.84', '#7b5cff', 1], ['1', '#ffb020', 1]],
  // Frequent Research: navy → gold → coral → magenta (as on MyFrequentRewards)
  fr: [['0', '#11143a', 0], ['.16', '#1b1d47', 0.55], ['.42', '#6e5a22', 1], ['.6', '#c99a1c', 1], ['.78', '#d2584a', 1], ['1', '#c0326f', 1]]
};

export function BrandWordmark({ text, grade = 't2o', id = grade, size = 'lg' }) {
  const W = 1600;
  const fontSize = size === 'lg' ? 200 : 120;
  const H = size === 'lg' ? 230 : 150;
  const base = size === 'lg' ? 182 : 116;
  const cap = base - fontSize * 0.6;
  const mid = (cap + base) / 2;

  // v3.1: the big name at the bottom of the page now has a proper animated treatment.
  // Six layers, every one of them transform- or opacity-only so the whole thing stays on the
  // compositor, and all of it inside the footer's content-visibility boundary so nothing runs
  // until the visitor actually scrolls down to it:
  //
  //   1. construction guides that draw themselves in
  //   2. the colour-graded fill
  //   3. an aurora that drifts through the letterforms (masked to the glyphs)
  //   4. a specular sweep that glides left to right
  //   5. a hairline outline that breathes
  //   6. drifting motes and a spark, caught inside the letters
  return (
    <div className={`fr-wordmark wm-${size} notranslate`} translate="no" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
            {WORDMARK_GRADES[grade].map(([o, c, op]) => (
              <stop key={o} offset={o} stopColor={c} stopOpacity={op} />
            ))}
          </linearGradient>

          {/* The aurora that moves behind the letters */}
          <linearGradient id={`${id}-aurora`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#49b6ff" stopOpacity="0" />
            <stop offset=".25" stopColor="#7b5cff" stopOpacity=".75" />
            <stop offset=".5" stopColor="#12c29b" stopOpacity=".85" />
            <stop offset=".75" stopColor="#ffb020" stopOpacity=".7" />
            <stop offset="1" stopColor="#ff5c7a" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".92" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <text x={W / 2} y={base} textAnchor="middle" className="frw-glyphs" fontSize={fontSize} fill="#fff" textLength={W - 80} lengthAdjust="spacingAndGlyphs">
              {text}
            </text>
          </mask>
        </defs>

        {/* 1. construction guides */}
        <g className="frw-guides">
          {[H * 0.06, cap, base, H * 0.93].map((y, i) => (
            <line key={y} x1="0" x2={W} y1={y} y2={y} style={{ '--i': i }} />
          ))}
        </g>

        {/* 2. the graded fill */}
        <text x={W / 2} y={base} textAnchor="middle" className="frw-glyphs frw-fill" fontSize={fontSize} fill={`url(#${id}-fill)`} textLength={W - 80} lengthAdjust="spacingAndGlyphs">
          {text}
        </text>

        {/* 3–6. everything that lives *inside* the letterforms */}
        <g mask={`url(#${id}-mask)`}>
          <rect className="frw-aurora" x={-W} y="0" width={W * 2} height={H} fill={`url(#${id}-aurora)`} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle key={i} className="frw-mote" style={{ '--k': i }} cx={(W / 8) * i + 60} cy={mid} r={size === 'lg' ? 5 : 3.5} />
          ))}
          <rect className="frw-sweep" x="-460" y="0" width="460" height={H} fill={`url(#${id}-sweep)`} />
        </g>

        {/* 5. breathing outline */}
        <text x={W / 2} y={base} textAnchor="middle" className="frw-glyphs frw-outline" fontSize={fontSize} textLength={W - 80} lengthAdjust="spacingAndGlyphs">
          {text}
        </text>

        <g className="frw-spark" transform={`translate(${W - 28} ${H * 0.22})`}>
          <path d="M0 -14 L3.5 -3.5 L14 0 L3.5 3.5 L0 14 L-3.5 3.5 L-14 0 L-3.5 -3.5 Z" />
        </g>
        <circle className="frw-ring" cx={W - 10} cy={H * 0.65} r={H * 0.18} />
      </svg>
    </div>
  );
}

/** v4 footer name (Kunal, 18 Nov 2026): TURN2OPINION alone, replacing the two SVG wordmarks.
 *  Each letter is its own element so the name can make an entrance: when the footer scrolls into
 *  view the letters flip up out of a 3D plane one after another, the colour grade flows through
 *  them, the "2" spins like a coin, and a soft wave keeps running along the word afterwards.
 *  Without JavaScript (or with reduced motion) the name is simply shown, fully coloured. */
const T2O_LETTERS = 'TURN2OPINION'.split('');
function T2OWordmark() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      el && el.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="t2w notranslate" translate="no" ref={ref} aria-hidden="true">
      <span className="t2w-glow" />
      <span className="t2w-word">
        {T2O_LETTERS.map((c, i) => (
          <span key={i} className={`t2w-l${c === '2' ? ' is-two' : ''}`} style={{ '--i': i, '--n': T2O_LETTERS.length }}>
            <span className="t2w-in">{c}</span>
          </span>
        ))}
      </span>
      <span className="t2w-line">
        <i />
      </span>
      <span className="t2w-tag">{SITE.tagline}</span>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const onScanPage = usePath().startsWith('/about/scan-connect');
  return (
    <footer className="site-footer">
      <div className="footer-aurora" aria-hidden="true" />
      <div className="wrap">
        <section className="footer-stage" aria-labelledby="footer-cta-title">
          <div className="fs-copy">
            <h2 id="footer-cta-title">Your opinion already has value. Start collecting it.</h2>
            <p>
              Consumers and professionals earn rewards for honest answers – redeemed through PayPal, wire transfer and Amazon gift
              cards worldwide, plus UPI for members in India.
            </p>
            <div className="fs-actions">
              <Link to="/join/" className="btn btn-primary btn-shimmer">
                Join free <Icon name="arrow" size={18} />
              </Link>
              <Link to="/how-it-works/" className="btn btn-glass">
                See how it works
              </Link>
            </div>
            <ul className="fs-points">
              <li>
                <Icon name="check" size={16} /> Free forever
              </li>
              <li>
                <Icon name="lock" size={16} /> Details never sold
              </li>
              <li>
                <Icon name="clock" size={16} /> 24/7 live help
              </li>
            </ul>
          </div>
          <RewardCube />
        </section>

        {/* Scan & Connect: QR codes for every social platform plus all three panels and the
            parent company. Replaces the old four-tile social strip. */}
        {/* On the Scan & Connect page the hub is the page itself, so it is not repeated here. */}
        {onScanPage ? null : <QrHub />}

        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-plinth">
              <Logo size="md" />
              <span className="plinth-base" aria-hidden="true" />
            </div>
            <p>
              Turn2Opinion is the worldwide consumer and business opinion community of Frequent Research. Share your
              perspective on research that shapes real products and services – and get rewarded for it.
            </p>
            <div className="footer-trust">
              <Icon name="lock" size={18} />
              <span>Your personal details stay with us. We never sell or share them with anyone else.</span>
            </div>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} className="footer-col" aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer-col footer-contact">
            <h3>Talk to us</h3>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>
                  <Icon name="mail" size={16} /> {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`}>
                  <Icon name="phone" size={16} /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} /> WhatsApp {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <span>
                  <Icon name="pin" size={16} /> {SITE.address.street}, {SITE.address.locality} – {SITE.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="trust-stage">
          <span className="ts-beams" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div className="ts-top">
            <div className="ts-plinth">
              <span className="ts-halo" aria-hidden="true" />
              <span className="ts-card">
                <FrLogo width={150} />
              </span>
              <span className="ts-reflect" aria-hidden="true" />
            </div>
            <div className="ts-copy">
              <p className="ts-kicker">
                <Icon name="building" size={15} /> The company behind Turn2Opinion
              </p>
              <p className="ts-name">
                <span>Frequent Research</span> Fieldwork Solutions Pvt. Ltd.
              </p>
              <p className="ts-desc">Full-service market research from New Delhi, trusted by brands, agencies and public bodies.</p>
              <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="ts-link">
                Visit Frequent Research <Icon name="external" size={14} />
              </a>
            </div>
          </div>
          {/* The "Our Affiliations" logo strip (ISO 27001 / ISO 20252 / ISO 9001 / ESOMAR / MSME)
              was removed from the footer on request — v3.1. The certifications themselves are
              unchanged and still published on the About page and in the structured data; only this
              footer strip is gone. SITE.certifications remains the single source for them. */}
        </div>

        <div className="footer-wordmarks">
          <T2OWordmark />
        </div>

        <div className="footer-bottom">
          <p>
            <span className="notranslate" translate="no">© {year} Turn2Opinion · </span>
            <span>A brand of</span> <span className="notranslate" translate="no">{SITE.legalName}</span>
          </p>
          <p>Rewards and payment methods vary by country. Survey availability depends on your profile.</p>
          <LanguageButton compact />
        </div>
      </div>
    </footer>
  );
}
