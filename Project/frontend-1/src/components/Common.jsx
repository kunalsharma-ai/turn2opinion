import { useState } from 'react';
import { Link } from '../router/Router.jsx';
import Icon from './Icon.jsx';

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">
            <Icon name="home" size={14} /> Home
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i}>
            <Icon name="chevronRight" size={12} />
            {it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Inner-page hero. `theme` picks one of several distinct backdrops so pages don't look templated:
 * 'orbit' | 'grid' | 'waves' | 'prism' | 'paper' | 'night'
 */
// Floating 3D icon tokens per hero theme (decorative only).
const THEME_TOKENS = {
  orbit: ['route', 'chat', 'gift', 'bell', 'coin', 'check'],
  grid: ['bag', 'chip', 'coin', 'star', 'phone', 'briefcase'],
  prism: ['shield', 'lock', 'finger', 'id', 'check', 'eye'],
  waves: ['gift', 'wallet', 'coin', 'transfer', 'trophy', 'sparkles'],
  night: ['users', 'globe', 'chat', 'heart', 'briefcase', 'star'],
  paper: ['chat', 'search', 'pen', 'bolt', 'star', 'sparkles']
};

export function PageHero({ crumbs, kicker, title, lead, tagline, theme = 'orbit', art, children, tone = 'dark', tokens }) {
  const toks = tokens || THEME_TOKENS[theme] || THEME_TOKENS.orbit;
  return (
    <section className={`page-hero pht-${theme} ph-${tone}`}>
      <div className="ph-bg" aria-hidden="true">
        <span className="ph-b1" />
        <span className="ph-b2" />
        <span className="ph-b3" />
      </div>
      <div className="ph-fx" aria-hidden="true">
        <span className="ph-beam" />
        {toks.map((ic, i) => (
          <span key={ic + i} className={`ph-token t${i}`} style={{ '--i': i }}>
            <Icon name={ic} size={20} />
          </span>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} className="ph-dot" style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap ph-grid">
        <div className="ph-copy">
          {crumbs && <Breadcrumbs items={crumbs} />}
          {kicker && <p className="ph-kicker">{kicker}</p>}
          <h1 className="ph-title">{title}</h1>
          {tagline && (
            <p className="ph-tagline">
              {tagline.split(' ').map((w, i) => (
                <span key={i} style={{ '--i': i }}>
                  {w}{' '}
                </span>
              ))}
              <svg className="ph-underline" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C 60 2, 120 12, 180 6 S 270 3, 298 7" />
              </svg>
            </p>
          )}
          {lead && <p className="ph-lead">{lead}</p>}
          {children}
        </div>
        {art && (
          <div className="ph-art">
            <span className="ph-art-glow" aria-hidden="true" />
            {art}
          </div>
        )}
      </div>
      <svg className="ph-wave" viewBox="0 0 2880 60" preserveAspectRatio="none" aria-hidden="true">
        <path className="w1" d="M0 30 C 360 0, 360 60, 720 30 C 1080 0, 1080 60, 1440 30 C 1800 0, 1800 60, 2160 30 C 2520 0, 2520 60, 2880 30" />
        <path className="w2" d="M0 40 C 360 20, 360 58, 720 40 C 1080 20, 1080 58, 1440 40 C 1800 20, 1800 58, 2160 40 C 2520 20, 2520 58, 2880 40" />
      </svg>
    </section>
  );
}

export function SectionHead({ title, lead, align = 'left', id, kicker }) {
  return (
    <div className={`section-head sh-${align}`} data-reveal>
      {kicker && <p className="sh-kicker">{kicker}</p>}
      <h2 id={id}>{title}</h2>
      {lead && <p className="sh-lead">{lead}</p>}
    </div>
  );
}

export function Accordion({ items, defaultOpen = 0, idPrefix = 'acc' }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc-item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="acc-h">
              <button
                type="button"
                id={`${idPrefix}-b-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className="acc-icon" aria-hidden="true">
                  <Icon name="plus" size={18} />
                </span>
              </button>
            </h3>
            <div id={`${idPrefix}-p-${i}`} role="region" aria-labelledby={`${idPrefix}-b-${i}`} className="acc-panel">
              <div className="acc-inner">
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** FAQ as a chat: tap a question, it is "sent" as your bubble and the answer types back. */
export function ChatFaq({ items, title = 'Turn2Opinion support' }) {
  const [open, setOpen] = useState(0);
  const [typing, setTyping] = useState(false);
  const ask = (i) => {
    if (i === open) return;
    setOpen(i);
    setTyping(true);
    setTimeout(() => setTyping(false), 650);
  };
  const it = items[open];
  return (
    <div className="chatfaq">
      <div className="cf-qs" role="group" aria-label="Questions">
        {items.map((q, i) => (
          <button key={q.q} type="button" className={i === open ? 'is-on' : ''} aria-pressed={i === open} onClick={() => ask(i)} style={{ '--i': i }}>
            <Icon name="chat" size={15} /> {q.q}
          </button>
        ))}
      </div>
      <div className="cf-thread" aria-live="polite">
        <div className="cf-bar">
          <span className="cf-av">
            <Icon name="headset" size={16} />
          </span>
          <strong>{title}</strong>
          <span className="cf-on">online</span>
        </div>
        <div className="cf-body" key={open}>
          <p className="cf-me">{it.q}</p>
          {typing ? (
            <p className="cf-typing" aria-label="Typing">
              <i />
              <i />
              <i />
            </p>
          ) : (
            <p className="cf-them">{it.a}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** FAQ as flip cards: the question on the front, the answer on the back (both always in the HTML for SEO). */
export function FlipFaq({ items, colors }) {
  const [open, setOpen] = useState(() => new Set());
  const flip = (i) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  return (
    <ul className="flipfaq">
      {items.map((it, i) => (
        <li key={it.q} className={`ff-card ${open.has(i) ? 'is-flipped' : ''}`} style={{ '--i': i, '--c': (colors && colors[i]) || it.c || '#1F5BFF' }}>
          <button type="button" className="ff-inner" aria-expanded={open.has(i)} onClick={() => flip(i)}>
            <span className="ff-face ff-front">
              <span className="ff-q">Q</span>
              <span className="ff-text">{it.q}</span>
              <span className="ff-hint">
                <Icon name="refresh" size={14} /> Tap to see the answer
              </span>
            </span>
            <span className="ff-face ff-back">
              <span className="ff-a">A</span>
              <span className="ff-text">{it.a}</span>
              <span className="ff-hint">
                <Icon name="refresh" size={14} /> Flip back
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({ title = 'Your opinion is worth more than you think.', lead = 'Join free in two minutes. No fees, no investment – just honest answers and real rewards.', variant = 'ribbon' }) {
  return (
    <section className={`cta-band cta-${variant}`}>
      <div className="wrap cta-inner" data-reveal>
        <div className="cta-coins" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </div>
        <div className="cta-copy">
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
        <div className="cta-actions">
          <Link to="/join/" className="btn btn-gold btn-lg">
            Join free <Icon name="arrow" size={18} />
          </Link>
          <Link to="/how-it-works/" className="btn btn-glass btn-lg">
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Chip({ children, tone = '' }) {
  return <span className={`chip-tag ${tone}`}>{children}</span>;
}
