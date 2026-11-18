// "Scan & Connect" — the QR hub in the footer.
//
// Two rails, deliberately different from one another so the section does not read as one long grid:
//
//   FAMILY   The research panels and the parent company (Turn2Opinion, MyFrequentRewards,
//            MyHealthOpinions, Frequent Research Fieldwork Solutions Pvt. Ltd.). Tall "scan
//            plinth" cards: the brand logo sits above a framed QR on a plinth, lit from below in
//            that brand's own colour, with a scan line sweeping the code.
//
//   SOCIAL   Instagram, Facebook, LinkedIn, YouTube and WhatsApp. Wide cards that flip on hover
//            or focus: the platform face turns over to reveal its QR. Each carries its own brand
//            gradient, so the row is five different colour worlds rather than five blue tiles.
//
// Every QR is a static SVG generated at build time by scripts/build-qr.mjs (`npm run qr`), so no
// QR library is shipped to visitors and the codes work with JavaScript switched off. Each card is
// also a plain link — scanning is the shortcut, not the only way in.
//
// Performance: the scan-line and sheen animations are transform/opacity only, and the whole hub
// carries content-visibility from perf.css so none of it runs until it is scrolled to.
import { asset } from '../../config/env.js';
import { SITE } from '../../config/site.js';
import Icon from '../Icon.jsx';
import SocialNetwork from './SocialNetwork.jsx';

function FamilyCard({ p, i }) {
  return (
    <a
      className={`qp qp-${p.id} ${p.self ? 'is-self' : ''}`}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--t1': p.tint, '--t2': p.tint2, '--i': i }}
      aria-label={`${p.label} — ${p.kind}. ${p.blurb} ${p.self ? 'You are here' : 'Open'} in a new tab.`}
    >
      <span className="qp-glow" aria-hidden="true" />
      <span className="qp-logo">
        <img src={asset(p.logo)} alt={`${p.label} logo`} width="150" height="48" loading="lazy" decoding="async" />
      </span>
      <span className="qp-kind">{p.kind}</span>

      <span className="qp-code">
        <span className="qp-frame" aria-hidden="true">
          <i className="c tl" />
          <i className="c tr" />
          <i className="c bl" />
          <i className="c br" />
          <i className="qp-scan" />
        </span>
        <img src={asset(p.qr)} alt={`QR code that opens ${p.label}`} width="132" height="132" loading="lazy" decoding="async" />
      </span>

      <span className="qp-plinth" aria-hidden="true" />
      <span className="qp-blurb">{p.blurb}</span>
      <span className="qp-go">
        {p.self ? 'You are here' : 'Open'} <Icon name={p.self ? 'check' : 'external'} size={13} />
      </span>
    </a>
  );
}

// `variant="page"` is used on /about/scan-connect/, where the page hero already carries the H1 and
// the intro; the hub then renders without its own header so nothing is said twice.
export default function QrHub({ variant = 'footer' }) {
  const page = variant === 'page';
  return (
    <section className={`qr-hub ${page ? 'is-page' : ''}`} aria-labelledby={page ? 'qr-family-h' : 'qr-title'}>
      <span className="qr-beam" aria-hidden="true" />

      {!page && (
      <header className="qr-head">
        <p className="qr-kicker">
          <Icon name="scan" size={15} /> Scan &amp; connect
        </p>
        <h2 id="qr-title">Point your camera. Land where you meant to.</h2>
        <p className="qr-lead">
          One group, five brands. Every code below opens the real thing: our panels, our parent company, Sampledge
          and every channel we post on. No app, no typing, no hunting for the right account.
        </p>
      </header>
      )}
      {page && (
        <h2 id="qr-family-h" className="qr-page-h">
          <Icon name="building" size={18} /> Our research panels &amp; parent company
        </h2>
      )}

      <div className="qr-family" role="list" aria-label="Research panels and parent company">
        {SITE.family.map((p, i) => (
          <div role="listitem" key={p.id} className="qr-family-cell">
            <FamilyCard p={p} i={i} />
          </div>
        ))}
      </div>

      <div className="qr-sep" aria-hidden="true">
        <span />
        <Icon name="qr" size={16} />
        <span />
      </div>

      <h2 className="qr-page-h" id={page ? undefined : 'qr-net-h'}>
        <Icon name="users" size={18} /> Follow every panel &amp; the company
      </h2>
      {/* v4: every brand's channels (Turn2Opinion, MyFrequentRewards, MyHealthOpinions, Frequent
          Research, Sampledge) with their QR codes, replacing the Turn2Opinion-only row. */}
      <SocialNetwork />

      <p className="qr-foot">
        <Icon name="shield" size={14} /> Every code points at an official Turn2Opinion or Frequent Research address. We
        will never ask for a password, an OTP or a payment through a QR code.
      </p>
    </section>
  );
}
