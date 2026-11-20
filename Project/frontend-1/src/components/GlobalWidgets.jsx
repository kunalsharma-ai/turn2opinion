// Client-only floating layer: cursor, scroll progress, WhatsApp + live help, rate tab + review prompt,
// opportunity toasts and the cookie consent manager. Loaded after first paint (see App.jsx).
import { useEffect, useRef, useState } from 'react';
import { SITE, waLink } from '../config/site.js';
import { ENV } from '../config/env.js';
import { getConsent, initAnalytics, saveConsent } from '../utils/analytics.js';
import { getJSON } from '../utils/api.js';
import { visit } from '../utils/storage.js';
import { SPOTLIGHTS } from '../data/activity.js';
import { METHOD_META, methodsFor, normalizeMethod } from '../data/payouts.js';
import { ALL_COUNTRIES } from '../data/profiles.js';
import { COUNTRIES } from '../data/countries.js';
import { PREVIEW_EVENTS } from '../data/activity-preview.js';
import { Flag, T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';
import LiveChat from './LiveChat.jsx';
import VideoFab from './video/VideoFab.jsx';
import ReviewWidget from './ReviewWidget.jsx';
import ReviewToasts from './ReviewToasts.jsx';
import { Link, usePath } from '../router/Router.jsx';
import { prefersReducedMotion } from '../hooks/useMounted.js';
import { armArrivalSound, playReward } from '../utils/sound.js';
import { useMe } from '../utils/gems.js';
import Gem from './rating/Gem.jsx';
import ModeAmbience from './ModeAmbience.jsx';

/* Cursor halo removed (Kunal, 18 Nov 2026): the ring that followed the mouse looked like a loading spinner. */

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
  const m = normalizeMethod(e.method);
  const method = methodsFor(country).includes(m) ? m : null;
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
  const shown = useRef(visit.get('t2o_toasts_shown', 0));
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
      if (visit.get('t2o_toasts_off')) return;
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
      visit.set('t2o_toasts_shown', shown.current);
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
  // The ticket takes the colours of the reward it announces (PayPal blue, grocery amber, gift-card violet...).
  const meta = (item.real && item.method && METHOD_META[item.method]) || { icon: item.icon || 'sparkles', color: '#1f5bff', c2: '#7b5cff' };
  const shownMethods = methods.slice(0, 3);
  return (
    <div
      className={`rdrop ${item.real ? 'is-real' : 'is-spot'} ${leaving ? 'is-leaving' : ''}`}
      key={item.key}
      role="status"
      aria-live="polite"
      style={{ '--m1': meta.color, '--m2': meta.c2 || meta.color }}
    >
      <span className="rd-border" aria-hidden="true" />
      <span className="rd-aurora" aria-hidden="true" />
      <div className="rd-token" aria-hidden="true">
        <svg className="rd-timer" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="29" pathLength="100" />
        </svg>
        <span className="rd-coin">
          <span className="rd-coin__f">
            <Icon name={meta.icon} size={24} />
          </span>
          <span className="rd-coin__b">{item.real ? initials : <Icon name="bell" size={20} />}</span>
        </span>
        {item.real && (
          <span className="rd-who-av" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <div className="rd-body">
        {item.real ? (
          <>
            <p className="rd-kicker">
              <span className="rd-live">
                <i /> Reward paid
              </span>
              {item.when && <span className="rd-when">{item.when}</span>}
              {item.preview && <span className="rd-preview">Preview</span>}
            </p>
            <p className="rd-line">
              <strong>{item.name || 'A member'}</strong> earned{' '}
              {item.amount && item.currency ? <CountUp className="rd-amount" to={item.amount} currency={item.currency} /> : <b className="rd-amount">a reward</b>}
            </p>
            <p className="rd-meta">
              {item.method && (
                <span className="rd-method">
                  <Icon name={meta.icon} size={12} /> {item.method}
                </span>
              )}
              <span className="rd-place">
                <Flag code={item.country} size={12} /> {place}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="rd-kicker">
              <span className="rd-live">
                <i /> Now inviting
              </span>
            </p>
            <p className="rd-line">
              <strong>{item.role}</strong> in <Flag code={item.country} size={13} /> {countryName(item.country)}
            </p>
            {item.topic && <p className="rd-topic">{item.topic}</p>}
            <p className="rd-meta rd-pills">
              {shownMethods.map((m, i) => (
                <span key={m} className="rd-method sm" style={{ '--m1': METHOD_META[m].color, '--m2': METHOD_META[m].c2, '--d': `${0.45 + i * 0.08}s` }}>
                  <Icon name={METHOD_META[m].icon} size={11} /> {METHOD_META[m].short}
                </span>
              ))}
              {methods.length > shownMethods.length && <span className="rd-more">+{methods.length - shownMethods.length} more</span>}
            </p>
          </>
        )}
      </div>
      <button
        type="button"
        className="rd-x"
        aria-label="Stop showing these notifications"
        onClick={() => {
          setLeaving(true);
          visit.set('t2o_toasts_off', true);
        }}
      >
        <Icon name="close" size={13} />
      </button>
      <span className="rd-confetti" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} style={{ '--k': i }} />
        ))}
      </span>
      <span className="rd-progress" aria-hidden="true" />
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
// Three matching round buttons in one column (Kunal, 18 Nov 2026): Rate us, WhatsApp, live help.
// Rate us shows for everyone; for visitors who are not logged in it carries a lock and asks them to
// log in first (ReviewWidget shows that prompt). A light wave runs down the three in turn.
function FloatingActions({ chatOpen, onChat }) {
  const { user, loading } = useMe();
  const member = !!user && !loading;
  return (
    <div className={`fab-stack fab-trio ${chatOpen ? 'chat-is-open' : ''}`}>
      <span className="fab-rail" aria-hidden="true" />
      <button
        type="button"
        className={`fab fab-rate ${member ? '' : 'is-locked'}`}
        onClick={() => window.dispatchEvent(new CustomEvent('t2o:open-review', { detail: {} }))}
        aria-label={member ? 'Rate us: rate your experience' : 'Rate us (members only): log in first'}
      >
        <span className="fab-ring" aria-hidden="true" />
        <span className="fab-face" aria-hidden="true">
          <Gem level={5} size={28} motion="float" />
        </span>
        {!member && (
          <span className="fab-lock" aria-hidden="true">
            <Icon name="lock" size={11} strokeWidth={2.6} />
          </span>
        )}
        <span className="fab-tip">{member ? 'Rate us' : 'Rate us · log in first'}</span>
      </button>
      <a className="fab fab-wa" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Chat with us on WhatsApp ${SITE.whatsappDisplay}`}>
        <span className="fab-ring" aria-hidden="true" />
        <span className="fab-face" aria-hidden="true">
          <Icon name="whatsapp" size={28} />
        </span>
        <span className="fab-tip">WhatsApp us</span>
      </a>
      <button type="button" className="fab fab-chat" onClick={onChat} aria-expanded={chatOpen} aria-controls="live-chat" aria-label={chatOpen ? 'Close live help' : 'Live help 24/7 — open live chat'}>
        <span className="fab-ring" aria-hidden="true" />
        <span className="fab-face fab-chat-icon" aria-hidden="true">
          {chatOpen ? <Icon name="close" size={24} /> : <T2OMark size={38} />}
        </span>
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

// Pages that are one long form: no pop-ups slide in over the fields while someone fills them in.
export const FORM_PAGE = /^\/(join|login|parent-consent|forgot-password|reset-password|contact|account-setup|verify)(\/|$)/;

export default function GlobalWidgets() {
  const path = usePath();
  const formPage = FORM_PAGE.test(path || '');
  const [chatOpen, setChatOpen] = useState(false);
  const [consentDone, setConsentDone] = useState(false);
  useEffect(() => {
    const open = () => setChatOpen(true);
    window.addEventListener('t2o:open-chat', open);
    return () => window.removeEventListener('t2o:open-chat', open);
  }, []);

  // Lets CSS tidy the other floating buttons while the live-help panel is open (phones).
  useEffect(() => {
    document.documentElement.classList.toggle('chat-open', chatOpen);
    return () => document.documentElement.classList.remove('chat-open');
  }, [chatOpen]);

  // While a field has focus, the floating buttons and pop-ups step aside so nothing covers what is typed.
  useEffect(() => {
    const root = document.documentElement;
    const isField = (el) => el && el.matches && el.matches('input:not([type=checkbox]):not([type=radio]), textarea, select, [contenteditable=true], [role=combobox]') && !el.closest('.chat');
    const on = (e) => root.classList.toggle('is-typing', isField(e.target));
    const off = () => setTimeout(() => root.classList.toggle('is-typing', isField(document.activeElement)), 0);
    document.addEventListener('focusin', on);
    document.addEventListener('focusout', off);
    return () => {
      document.removeEventListener('focusin', on);
      document.removeEventListener('focusout', off);
      root.classList.remove('is-typing');
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('form-page', formPage);
  }, [formPage]);

  // The site's signature arrival sound. Browsers block audio until the visitor interacts, so this
  // arms the chime and fires it on their first tap, click, key press or scroll — see utils/sound.js.
  useEffect(() => armArrivalSound(), []);

  // The reward pop-up has its own cash-register ka-ching (review toasts use a softer kalimba).
  useEffect(() => {
    const h = () => playReward();
    window.addEventListener('t2o:ticket', h);
    return () => window.removeEventListener('t2o:ticket', h);
  }, []);

  return (
    <>
      <ModeAmbience />
      <ScrollProgress />
      <VideoFab quiet={formPage} />
      <FloatingActions chatOpen={chatOpen} onChat={() => setChatOpen((o) => !o)} />
      <LiveChat open={chatOpen} onClose={() => setChatOpen(false)} />
      <ReviewWidget ready={consentDone && !formPage} />
      {/* Right-hand side: live member reviews. Bottom-left: reward tickets. They never collide. */}
      <ReviewToasts blocked={!consentDone || chatOpen || formPage} />
      <ActivityToasts blocked={!consentDone || chatOpen || formPage} />
      <CookieConsent onDone={() => setConsentDone(true)} />
    </>
  );
}
