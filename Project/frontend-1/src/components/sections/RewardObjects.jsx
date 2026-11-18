// The eight reward options as eight different objects (Kunal, 18 Nov 2026): no shared card template.
// PayPal is a sky wallet, Cash a banknote, Bank a marble vault, Wire a night globe, UPI a tricolour
// phone, Shopping a tote bag, Grocery a printed receipt and Gift Cards a holographic card with a bow.
// Everything is drawn with CSS and small inline SVG: no images to download, and all motion stops
// under prefers-reduced-motion. Each object carries one genuine member review from data/testimonials.js
// (picked for topic; it does not claim that member used that payout method).
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import GemScore from '../rating/GemScore.jsx';
import { TESTIMONIALS } from '../../data/testimonials.js';

const VOICE = {
  paypal: 'maya-us',
  cash: 'ethan-miller-us',
  bank: 'elif-ylmaz-tr',
  wire: 'katarzyna-nowak-pl',
  upi: 'priya-sharma-in',
  shopping: 'giulia-romano-it',
  grocery: 'mariana-costa-br',
  giftcards: 'rizky-pratama-id'
};
const firstSentence = (t = '') => {
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};

function Voice({ id }) {
  const r = TESTIMONIALS.find((x) => x.id === VOICE[id]);
  if (!r) return null;
  return (
    <figure className="rx-voice">
      <span className="rx-voice-q" aria-hidden="true">
        “
      </span>
      <blockquote>{firstSentence(r.text)}</blockquote>
      <figcaption>
        <Flag code={r.country} size={14} /> <b>{r.name}</b>
        {r.role && r.role !== 'Member' ? <span>{r.role}</span> : null}
        {r.rating ? (
          <GemScore rating={r.rating} size={16} className="rx-stars" />
        ) : null}
      </figcaption>
    </figure>
  );
}

function Info({ m, kicker }) {
  return (
    <div className="rx-info">
      <p className="rx-kicker">{kicker}</p>
      <h3>{m.name}</h3>
      <p className="rx-line">{m.line}</p>
      <p className="rx-meta">
        <span className="rx-arrive">
          <Icon name="send" size={13} /> {m.arrive}
        </span>
        <span className="rx-best">{m.best}</span>
      </p>
    </div>
  );
}

/* ---------- the eight stages ---------- */
const Stage = {
  paypal: () => (
    <div className="rx-stage" aria-hidden="true">
      <i className="pp-cloud c1" />
      <i className="pp-cloud c2" />
      <span className="pp-wallet">
        <i className="pp-flap" />
        <b>P</b>
      </span>
      <svg className="pp-plane" viewBox="0 0 24 24">
        <path d="M2 11.5 21 3l-6 18-3.5-7.5L2 11.5Z" fill="#fff" />
        <path d="M11.5 13.5 21 3" stroke="#9fd8ff" strokeWidth="1.4" />
      </svg>
      <svg className="pp-trail" viewBox="0 0 200 90" preserveAspectRatio="none">
        <path d="M5 80 C 60 10, 120 90, 190 18" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeDasharray="4 7" />
      </svg>
    </div>
  ),
  cash: () => (
    <div className="rx-stage" aria-hidden="true">
      <span className="cs-note n3" />
      <span className="cs-note n2" />
      <span className="cs-note n1">
        <i className="cs-seal" />
        <b className="cs-den">100</b>
        <i className="cs-strip" />
      </span>
      <i className="cs-coin k1" />
      <i className="cs-coin k2" />
    </div>
  ),
  bank: () => (
    <div className="rx-stage" aria-hidden="true">
      <span className="bk-temple">
        <i className="bk-roof" />
        <i className="bk-cols" />
        <i className="bk-step" />
      </span>
      <span className="bk-vault">
        <i className="bk-dial" />
      </span>
      <i className="bk-glint" />
    </div>
  ),
  wire: () => (
    <div className="rx-stage" aria-hidden="true">
      <span className="wr-globe">
        <i className="wr-lat" />
      </span>
      <i className="wr-ring" />
      <svg className="wr-arc" viewBox="0 0 220 120" preserveAspectRatio="none">
        <path d="M30 92 Q 110 -14 190 70" fill="none" stroke="#5ff4ff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <i className="wr-pin p1" />
      <i className="wr-pin p2" />
      <i className="wr-dot" />
    </div>
  ),
  upi: () => (
    <div className="rx-stage" aria-hidden="true">
      <i className="up-ribbon r1" />
      <i className="up-ribbon r2" />
      <span className="up-phone">
        <span className="up-qr">
          <svg viewBox="0 0 21 21" shapeRendering="crispEdges">
            <path
              fill="#0b1e5b"
              d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3zM0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2zM8 0h2v2H8zM11 1h2v3h-2zM8 4h3v2H8zM9 8h3v2H9zM13 8h2v3h-2zM16 9h4v2h-4zM8 11h2v3H8zM11 12h3v2h-3zM15 13h2v2h-2zM18 12h3v3h-3zM8 16h3v2H8zM12 15h2v4h-2zM15 17h3v2h-3zM19 17h2v4h-2zM9 19h2v2H9zM0 8h3v2H0zM4 9h3v2H4z"
            />
          </svg>
          <i className="up-beam" />
        </span>
        <b className="up-ok">✓ Paid</b>
      </span>
    </div>
  ),
  shopping: () => (
    <div className="rx-stage" aria-hidden="true">
      <span className="sh-bag">
        <i className="sh-handle" />
        <b>SALE</b>
        <i className="sh-tag" />
      </span>
      <i className="sh-confetti" />
    </div>
  ),
  grocery: () => (
    <div className="rx-stage gr-stage" aria-hidden="true">
      <span className="gr-basket">
        <i className="gr-fruit f1" />
        <i className="gr-fruit f2" />
        <i className="gr-fruit f3" />
        <i className="gr-leaf" />
      </span>
    </div>
  ),
  giftcards: () => (
    <div className="rx-stage" aria-hidden="true">
      <span className="gc-card">
        <i className="gc-holo" />
        <i className="gc-ribbon-v" />
        <i className="gc-ribbon-h" />
        <i className="gc-bow" />
        <b className="gc-chip" />
      </span>
      <i className="gc-spark s1" />
      <i className="gc-spark s2" />
      <i className="gc-spark s3" />
    </div>
  )
};

const KICKER = {
  paypal: 'Wallet · worldwide',
  cash: 'Cash · spend anywhere',
  bank: 'Bank · straight in',
  wire: 'Wire · across borders',
  upi: 'UPI · India only',
  shopping: 'Voucher · shops',
  grocery: 'Voucher · groceries',
  giftcards: 'E-gift · instant'
};

export default function RewardObject({ m, i, n }) {
  const S = Stage[m.id];
  return (
    <article className={`rx rx-${m.id}`} style={{ '--i': i, '--n': n }}>
      {S ? <S /> : null}
      {m.only && (
        <span className="rx-only">
          <Flag code="IN" size={12} /> India only
        </span>
      )}
      <Info m={m} kicker={KICKER[m.id] || (m.kind === 'money' ? 'To your account' : 'Voucher')} />
      {m.id === 'grocery' && (
        <ol className="gr-receipt" aria-hidden="true">
          <li>
            <span>1 × survey</span>
            <span>✓</span>
          </li>
          <li>
            <span>Points</span>
            <span>+ 450</span>
          </li>
          <li className="gr-total">
            <span>Voucher</span>
            <span>Redeemed</span>
          </li>
        </ol>
      )}
      <Voice id={m.id} />
    </article>
  );
}
