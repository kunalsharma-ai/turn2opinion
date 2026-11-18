// Client-only floating layer: cursor, scroll progress, WhatsApp + live help, rate tab + review prompt,
// opportunity toasts and the cookie consent manager. Loaded after first paint (see App.jsx).
import { useEffect, useRef, useState } from 'react';
import { SITE, waLink } from '../config/site.js';
import { ENV } from '../config/env.js';
import { getConsent, initAnalytics, saveConsent } from '../utils/analytics.js';
import { getJSON } from '../utils/api.js';
import { session } from '../utils/storage.js';
import { SPOTLIGHTS } from '../data/activity.js';
import { METHOD_META, methodsFor } from '../data/payouts.js';
import { ALL_COUNTRIES } from '../data/profiles.js';
import { COUNTRIES } from '../data/countries.js';
import { PREVIEW_EVENTS } from '../data/activity-preview.js';
import { Flag, T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';
import LiveChat from './LiveChat.jsx';
import VideoFab from './video/VideoFab.jsx';
import ReviewWidget from './ReviewWidget.jsx';
import ReviewToasts from './ReviewToasts.jsx';
import { Link } from '../router/Router.jsx';
import { prefersReducedMotion } from '../hooks/useMounted.js';
import { armArrivalSound, playNotify } from '../utils/sound.js';

/* ---------------- Cursor: brand halo ---------------- */
// v3.1 — rewritten for performance.
//
// The previous cursor ran a full-viewport <canvas> particle system: every pointermove spawned
// sparks and kept a requestAnimationFrame loop alive, and a document-level `mouseover` listener
// called `closest()` on every hovered node then toggled a class on <html> (invalidating styles
// for the whole page). On a 5,486-node page that was a constant, measurable tax on every mouse
// movement — a direct cause of the "laggy" feel.
//
// This version keeps the look and costs almost nothing:
//   * one small DOM element, moved with a single composited transform;
//   * pointer position is written once per animation frame, not once per event;
//   * the hover state uses CSS :hover through a pointer-events-none overlay instead of a
//     document-wide mouseover listener, so there is zero JavaScript on hover;
//   * clicks play a pure-CSS ripple — no canvas, no particles, no rAF loop.
// Desktop only, never with reduced motion, and never on low-powered devices.
function Cursor() {
  const halo = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (prefersReducedMotion() || document.documentElement.classList.contains('low-power')) return undefined;
    const el = halo.current;
    if (!el) return undefined;

    let x = -100;
    let y = -100;
    let raf = 0;
    // Coalesce every pointermove in a frame into one style write.
    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const down = () => {
      el.classList.remove('is-click');
      void el.offsetWidth; // restart the CSS ripple
      el.classList.add('is-click');
    };
    document.documentElement.classList.add('has-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);
  return (
    <div ref={halo} className="cursor-halo" aria-hidden="true">
      <span />
    </div>
  );
}

/* ---------------- Scroll progress ---------------- */
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}

/* ---------------- Reward ticket notifications ---------------- */
// Real events come from VITE_ACTIVITY_FEED_URL (see docs/api-contract.md). Every field is validated here:
// names are cut to "First L.", UPI is dropped for anyone outside India, amounts are only shown when the feed
// sends them. Without a feed the ticket shows "now inviting" spotlights – it never claims someone was paid.
const countryName = (c) => (COUNTRIES.find((x) => x.c === c) || {}).n || (ALL_COUNTRIES.find((x) => x.code === c) || {}).name || c;
const regionName = (c) => (ALL_COUNTRIES.find((x) => x.code === c) || {}).region || '';

function shortName(n) {
  const parts = String(n || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}
function money(amount, currency) {
  if (typeof amount !== 'number' || !isFinite(amount) || amount < 0 || !currency) return '';
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
  } catch {
    return '';
  }
}
function ago(ts) {
  const t = Date.parse(ts);
  if (!t) return '';
  const m = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h} h ago` : '';
}
/** Accepts one feed event and returns a safe, display-ready record (or null if unusable). */
export function cleanEvent(e) {
  if (!e || typeof e !== 'object') return null;
  const country = String(e.country || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) return null;
  const method = methodsFor(country).includes(e.method) ? e.method : null;
  return {
    real: true,
    name: shortName(e.name),
    role: String(e.role || '').slice(0, 40),
    audience: e.audience === 'professional' ? 'professional' : e.audience === 'consumer' ? 'consumer' : '',
    country,
    city: String(e.city || '').slice(0, 30),
    method,
    amount: typeof e.amount === 'number' && e.amount > 0 ? e.amount : 0,
    currency: e.amount > 0 && money(e.amount, e.currency) ? String(e.currency).toUpperCase() : '',
    when: e.mins ? `${e.mins} min ago` : ago(e.ts),
    icon: e.icon
  };
}

function ActivityToasts({ blocked }) {
  const [item, setItem] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const feed = useRef(null);
  const shown = useRef(session.get('t2o_toasts_shown', 0));
  const order = useRef([]);

  useEffect(() => {
    if (!ENV.ACTIVITY_FEED_URL) {
      // Shareable preview file only: labelled sample tickets so the design can be reviewed.
      if (ENV.DEMO_MODE) feed.current = PREVIEW_EVENTS.map((e) => ({ ...cleanEvent(e), preview: true }));
      return;
    }
    getJSON(ENV.ACTIVITY_FEED_URL).then((d) => {
      const list = Array.isArray(d) ? d.map(cleanEvent).filter(Boolean).slice(0, 40) : [];
      if (list.length) {
        feed.current = list;
        order.current = [];
      }
    });
  }, []);

  useEffect(() => {
    if (blocked) return undefined;
    let timer;
    let hideTimer;
    const next = () => {
      if (document.hidden || shown.current >= 8) {
        timer = setTimeout(next, 20000);
        return;
      }
      const src = feed.current || SPOTLIGHTS;
      if (!order.current.length) order.current = [...src.keys()].sort(() => Math.random() - 0.5);
      const pick = src[order.current.pop()];
      setLeaving(false);
      setItem({ ...pick, key: Date.now() });
      window.dispatchEvent(new Event('t2o:ticket'));
      shown.current += 1;
      session.set('t2o_toasts_shown', shown.current);
      hideTimer = setTimeout(() => setLeaving(true), 7800);
      timer = setTimeout(next, 22000 + Math.random() * 14000);
    };
    timer = setTimeout(next, 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [blocked]);

  if (!item) return null;
  const methods = item.real ? (item.method ? [item.method] : []) : methodsFor(item.country);
  const place = [item.city, countryName(item.country)].filter(Boolean).join(', ');
  const initials = item.real
    ? (item.name || 'T2O')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';
  const hue = ((item.name || item.role || 'x').charCodeAt(0) * 47) % 360;
  return (
    <div className={`rticket ${item.real ? 'is-real' : 'is-spot'} ${leaving ? 'is-leaving' : ''}`} key={item.key} role="status" aria-live="polite" style={{ '--th': hue }}>
      <span className="rt-bar" aria-hidden="true" />
      <div className="rt-avatar" aria-hidden="true">
        <svg className="rt-timer" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="29" pathLength="100" />
        </svg>
        <span className="rt-face">{item.real ? initials : <Icon name={item.icon || 'sparkles'} size={22} />}</span>
        <span className="rt-badge">
          <Icon name={item.audience === 'professional' ? 'briefcase' : item.real ? 'user' : 'bell'} size={11} />
        </span>
      </div>
      <div className="rt-body">
        {item.real ? (
          <>
            <p className="rt-who">
              <strong>{item.name || 'A member'}</strong>
              {item.role && <span> · {item.role}</span>}
            </p>
            <p className="rt-what">
              {item.amount && item.currency ? (
                <CountUp className="rt-amount" to={item.amount} currency={item.currency} />
              ) : (
                <b className="rt-amount">Reward paid</b>
              )}
              {item.method && (
                <>
                  {' '}
                  via{' '}
                  <span className="rt-method" style={{ '--mc': METHOD_META[item.method].color }}>
                    <Icon name={METHOD_META[item.method].icon} size={13} /> {item.method}
                  </span>
                </>
              )}
            </p>
            <p className="rt-where">
              <Flag code={item.country} size={13} /> {place}
              {item.when && <span> · {item.when}</span>}
            </p>
            {item.preview && <span className="rt-preview">Preview data</span>}
          </>
        ) : (
          <>
            <p className="rt-who">
              <span className="rt-live">
                <i /> Now inviting
              </span>
            </p>
            <p className="rt-what">
              <strong>{item.role}</strong> in <Flag code={item.country} size={13} /> {countryName(item.country)}
            </p>
            <p className="rt-where">{item.topic}</p>
            <div className="rt-methods">
              {methods.map((m, i) => (
                <span key={m} className="rt-method sm" style={{ '--mc': METHOD_META[m].color, '--d': `${0.5 + i * 0.1}s` }}>
                  <Icon name={METHOD_META[m].icon} size={11} /> {m}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <button type="button" className="activity-close" aria-label="Dismiss" onClick={() => setLeaving(true)}>
        <Icon name="x" size={14} />
      </button>
      <span className="rt-sparks" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <i key={i} style={{ '--k': i }} />
        ))}
      </span>
    </div>
  );
}

/** Animated money figure: counts up from zero, formatted in the event's currency. */
function CountUp({ to, currency, className }) {
  const [v, setV] = useState(prefersReducedMotion() ? to : 0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let raf = 0;
    const start = performance.now() + 450;
    const step = (t) => {
      const k = Math.min(1, Math.max(0, (t - start) / 900));
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  const shown = v >= to ? to : Math.round(v);
  return <b className={className}>{money(shown, currency) || shown}</b>;
}

/* ---------------- Cookie consent ---------------- */
function CookieConsent({ onDone }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false, preferences: true });

  useEffect(() => {
    initAnalytics();
    if (!getConsent()) setOpen(true);
    else onDone();
    const reopen = () => {
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener('t2o:open-consent', reopen);
    return () => window.removeEventListener('t2o:open-consent', reopen);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = (c) => {
    saveConsent(c);
    setOpen(false);
    onDone();
  };
  if (!open) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <div className="consent-cookie" aria-hidden="true">
        <Icon name="cookie" size={30} />
      </div>
      <div className="consent-body">
        <h2 id="consent-title">Cookies, your call</h2>
        <p>
          We use essential cookies to run the site and, with your OK, analytics and marketing cookies to improve it.
          See our <Link to="/cookies/">cookie policy</Link>.
        </p>
        {custom && (
          <div className="consent-toggles">
            <label className="switch is-locked">
              <input type="checkbox" checked disabled /> <span className="switch-ui" /> Necessary
            </label>
            {[
              ['analytics', 'Analytics'],
              ['marketing', 'Marketing'],
              ['preferences', 'Preferences']
            ].map(([k, l]) => (
              <label key={k} className="switch">
                <input type="checkbox" checked={prefs[k]} onChange={(e) => setPrefs({ ...prefs, [k]: e.target.checked })} />
                <span className="switch-ui" /> {l}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="consent-actions">
        {custom ? (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => finish(prefs)}>
            Save choices
          </button>
        ) : (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCustom(true)}>
            Customise
          </button>
        )}
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => finish({ analytics: false, marketing: false, preferences: false })}>
          Essential only
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => finish({ analytics: true, marketing: true, preferences: true })}>
          Accept all
        </button>
      </div>
    </div>
  );
}

/* ---------------- Floating actions ---------------- */
function FloatingActions({ chatOpen, onChat }) {
  return (
    <div className={`fab-stack ${chatOpen ? 'chat-is-open' : ''}`}>
      <a className="fab fab-wa" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Chat with us on WhatsApp ${SITE.whatsappDisplay}`}>
        <span className="fab-pulse" aria-hidden="true" />
        <Icon name="whatsapp" size={28} />
        <span className="fab-tip">WhatsApp us</span>
      </a>
      <button type="button" className="fab fab-chat" onClick={onChat} aria-expanded={chatOpen} aria-controls="live-chat" aria-label={chatOpen ? 'Close live help' : 'Live help 24/7 — open live chat'}>
        <span className="fab-chat-ring" aria-hidden="true" />
        <span className="fab-chat-blob" aria-hidden="true" />
        <span className="fab-chat-icon">{chatOpen ? <Icon name="x" size={24} /> : <T2OMark size={42} />}</span>
        {!chatOpen && <span className="fab-chat-badge" aria-hidden="true">1</span>}
        {!chatOpen && (
          <span className="fab-chat-label" aria-hidden="true">
            <span className="live-dot" /> Live help 24/7
          </span>
        )}
      </button>
    </div>
  );
}

export default function GlobalWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [consentDone, setConsentDone] = useState(false);
  useEffect(() => {
    const open = () => setChatOpen(true);
    window.addEventListener('t2o:open-chat', open);
    return () => window.removeEventListener('t2o:open-chat', open);
  }, []);

  // The site's signature arrival sound. Browsers block audio until the visitor interacts, so this
  // arms the chime and fires it on their first tap, click, key press or scroll — see utils/sound.js.
  useEffect(() => armArrivalSound(), []);

  // The reward-ticket notification gets the same pop as the review notifications.
  useEffect(() => {
    const h = () => playNotify({ up: false });
    window.addEventListener('t2o:ticket', h);
    return () => window.removeEventListener('t2o:ticket', h);
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <VideoFab />
      <FloatingActions chatOpen={chatOpen} onChat={() => setChatOpen((o) => !o)} />
      <LiveChat open={chatOpen} onClose={() => setChatOpen(false)} />
      <ReviewWidget ready={consentDone} />
      {/* Right-hand side: live member reviews. Bottom-left: reward tickets. They never collide. */}
      <ReviewToasts blocked={!consentDone || chatOpen} />
      <ActivityToasts blocked={!consentDone || chatOpen} />
      <CookieConsent onDone={() => setConsentDone(true)} />
    </>
  );
}
