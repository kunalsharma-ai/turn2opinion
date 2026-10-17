import { asset } from '../config/env.js';
import { SITE, waLink } from '../config/site.js';
import { Link } from '../router/Router.jsx';
import { FrLogo, Logo, T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';

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

function SocialCard({ s, i }) {
  return (
    <a
      className={`social-card social-${s.id}`}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--i': i }}
      aria-label={`Turn2Opinion on ${s.label} (opens in a new tab)`}
    >
      <span className="social-flip">
        <span className="social-front">
          <span className="social-icon">
            <Icon name={s.id} size={26} />
          </span>
          <span className="social-name">{s.label}</span>
          <span className="social-handle">{s.handle}</span>
          <span className="social-hint">
            <Icon name="search" size={13} /> Hover or tap for QR
          </span>
        </span>
        <span className="social-back">
          <img src={asset(s.qr)} alt={`QR code linking to Turn2Opinion on ${s.label}`} width="120" height="120" loading="lazy" />
          <span className="social-scan">Scan to follow</span>
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
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

        <section className="footer-social" aria-labelledby="follow-title">
          <div className="footer-social-head">
            <h2 id="follow-title">Follow the conversation</h2>
            <p>New survey drops, payout tips and member stories – wherever you scroll.</p>
          </div>
          <div className="social-grid">
            {SITE.social.map((s, i) => (
              <SocialCard key={s.id} s={s} i={i} />
            ))}
            <div className="social-card social-site" style={{ '--i': 4 }}>
              <span className="social-flip is-static">
                <span className="social-back is-front">
                  <img src={asset('/images/qr/turn2opinion-website-qr.png')} alt="QR code to open turn2opinion.com" width="120" height="120" loading="lazy" />
                  <span className="social-scan">Scan to join on mobile</span>
                </span>
              </span>
            </div>
          </div>
        </section>

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
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
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

        <div className="parent-band">
          <div className="pb-logo">
            <span className="pb-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <FrLogo width={130} />
          </div>
          <div className="pb-copy">
            <p className="pb-kicker">The company behind Turn2Opinion</p>
            <p className="pb-name">Frequent Research Fieldwork Solutions Pvt. Ltd.</p>
            <p className="pb-desc">Full-service market research from New Delhi – trusted by brands, agencies and public bodies.</p>
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="pb-link">
              Visit Frequent Research <Icon name="external" size={14} />
            </a>
          </div>
          <ul className="medals" aria-label="Certifications and affiliations">
            {SITE.certifications.map((c, i) => (
              <li key={c.id} style={{ '--i': i }} title={c.note}>
                <span className="medal-disc">
                  <Icon name="shield" size={16} />
                </span>
                <strong>{c.label}</strong>
                <small>{c.note}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} Turn2Opinion · A brand of {SITE.legalName}
          </p>
          <p>Rewards and payment methods vary by country. Survey availability depends on your profile.</p>
        </div>
      </div>
    </footer>
  );
}
