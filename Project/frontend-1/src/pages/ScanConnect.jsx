// /about/scan-connect/ — "Scan & Connect" (v3.2).
//
// The QR hub (components/sections/QrHub.jsx) used to live only at the bottom of the footer. It now
// has its own page under About Us, so visitors can find it from the main menu. The QR codes are the
// same static SVGs generated at build time by scripts/build-qr.mjs — nothing new is downloaded.
import { useReveal } from '../hooks/useMounted.js';
import { PageHero, SectionHead, CtaBand } from '../components/Common.jsx';
import QrHub from '../components/sections/QrHub.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router/Router.jsx';
import { asset } from '../config/env.js';

function ScanArt() {
  return (
    <div className="scn-art" aria-hidden="true">
      <span className="scn-code">
        <img src={asset('/images/qr/turn2opinion-qr.svg')} alt="QR code that opens the Turn2Opinion website" width="150" height="150" />
        <i className="scn-sweep" />
      </span>
      <span className="scn-phone">
        <span className="scn-cam">
          <i className="c tl" />
          <i className="c tr" />
          <i className="c bl" />
          <i className="c br" />
          <i className="scn-laser" />
        </span>
        <span className="scn-pop">
          <Icon name="check" size={14} strokeWidth={3} /> turn2opinion.com
        </span>
      </span>
      {['instagram', 'facebook', 'linkedin', 'youtube', 'whatsapp'].map((ic, i) => (
        <span key={ic} className={`scn-orb o-${ic}`} style={{ '--i': i }}>
          <Icon name={ic} size={18} />
        </span>
      ))}
    </div>
  );
}

const STEPS = [
  ['scan', 'Open your camera', 'Any phone camera or Google Lens reads these codes — there is no app to install.'],
  ['finger', 'Point and tap', 'Hold the phone over a code until a link appears, then tap it.'],
  ['check', 'Land in the right place', 'Every code opens an official Turn2Opinion or Frequent Research address.']
];

export default function ScanConnect() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero
        theme="prism"
        crumbs={[{ label: 'About', to: '/about/' }, { label: 'Scan & Connect' }]}
        kicker="Scan & connect"
        title="Point your camera. Land where you meant to."
        tagline="One group, four research communities, six social channels."
        lead="Every code below opens the real thing — our panels, our parent company and the places we post. No app, no typing, no hunting for the right account."
        art={<ScanArt />}
      />

      <section className="section s-night scn-hubwrap" aria-label="QR codes">
        <div className="wrap">
          <QrHub variant="page" />
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="scn-how">
        <div className="wrap">
          <SectionHead id="scn-how" kicker="Three seconds" title="How to scan a code" align="center" />
          <ol className="scn-steps">
            {STEPS.map(([ic, t, d], i) => (
              <li key={t} style={{ '--i': i }} data-reveal>
                <span className="scn-n">{i + 1}</span>
                <span className="scn-ico">
                  <Icon name={ic} size={26} />
                </span>
                <strong>{t}</strong>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <p className="scn-safe" data-reveal>
            <Icon name="shield" size={16} />
            <span>
              We will never ask for a password, an OTP or a payment through a QR code. If a code anywhere else claims to be Turn2Opinion and asks for one,{' '}
              <Link to="/contact/">tell us</Link>.
            </span>
          </p>
          <p className="center-link" data-reveal>
            <Link to="/about/reviews/" className="link-arrow">
              See our ratings &amp; reviews <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
