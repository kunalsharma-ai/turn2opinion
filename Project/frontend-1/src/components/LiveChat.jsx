// 24/7 live help: instant answers drawn from every question & answer on the website (see src/utils/assistant.js),
// each with a link to the page that explains it. Questions the site doesn't cover collect the visitor's name,
// email, phone (optional) and country and go to the support team (VITE_API_ENQUIRY_URL). Hand-off to WhatsApp,
// email or (optionally) Tawk.to live agents is always one tap away. Plays a soft "pop" when opened and on replies.
import { useEffect, useRef, useState } from 'react';
import { ENV } from '../config/env.js';
import { SITE, waLink } from '../config/site.js';
import { hrefFor } from '../router/Router.jsx';
import { pop, setSoundEnabled, soundEnabled } from '../utils/sound.js';
import { onSoundChange } from '../utils/soundPref.js';
import { postJSON, failureMessage } from '../utils/api.js';
import { session } from '../utils/storage.js';
import { track } from '../utils/analytics.js';
import { COUNTRIES } from '../data/countries.js';
import { T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';

const TOPICS = [
  { id: 'join', label: 'Join free', q: 'How do I join?', icon: 'sparkles', c: '#1F5BFF' },
  { id: 'methods', label: 'Get paid', q: 'How do I get paid?', icon: 'wallet', c: '#12C29B' },
  { id: 'types', label: 'Surveys', q: 'What kind of surveys are there?', icon: 'chat', c: '#FFB020' },
  { id: 'professional', label: 'Professionals', q: 'Can business professionals join?', icon: 'briefcase', c: '#7B5CFF' },
  { id: 'privacy', label: 'My data', q: 'Is my data safe?', icon: 'shield', c: '#FF5C7A' },
  { id: 'human', label: 'Talk to a person', q: 'Talk to a person', icon: 'headset', c: '#0E1B4D' }
];

const CHIPS = [
  ['Is UPI available?', 'upi'],
  ['How much can I earn?', 'earn'],
  ['I forgot my password', 'forgot'],
  ['Why was I screened out?', 'screenout'],
  ['How long do payouts take?', 'paytime'],
  ['Is it legit?', 'legit'],
  ['Can students join?', 'age'],
  ['Which countries?', 'countries']
];

const LEAD_KEY = 't2o_chat_lead_v1';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let enginePromise = null;
const loadEngine = () => (enginePromise = enginePromise || import('../utils/assistant.js'));

/** In-chat form: collects contact details for questions the website doesn't answer. */
function LeadForm({ question, onSent }) {
  const [f, setF] = useState(() => ({ name: '', email: '', phone: '', country: '', message: question || '', hp: '' }));
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.value });
    if (err[k]) setErr({ ...err, [k]: '' });
  };
  const send = async (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your full name.';
    if (!EMAIL_RE.test(f.email.trim())) x.email = 'Enter a valid email.';
    const digits = f.phone.replace(/\D/g, '');
    if (digits && (digits.length < 6 || digits.length > 15)) x.phone = 'Check the number (6–15 digits).';
    if (!f.country) x.country = 'Choose your country.';
    if (f.message.trim().length < 3) x.message = 'Type your question.';
    setErr(x);
    if (Object.keys(x).length) return;
    const sent = session.get(LEAD_KEY + '_n', 0);
    if (sent >= 3) {
      setMsg('You’ve sent a few requests already – our team will reply soon. For anything urgent, use WhatsApp.');
      return;
    }
    setState('sending');
    const lead = { name: f.name.trim(), email: f.email.trim().toLowerCase(), phone: digits ? f.phone.trim() : '', country: f.country };
    const res = await postJSON(ENV.API_ENQUIRY_URL, {
      ...lead,
      topic: 'Live chat question',
      message: f.message.trim().slice(0, 1000),
      source: 'live-chat',
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      website: f.hp
    });
    if (res.ok) {
      session.set(LEAD_KEY, lead);
      session.set(LEAD_KEY + '_n', sent + 1);
      track('chat_lead', { country: f.country });
      onSent(lead);
    } else {
      setState('idle');
      setMsg(failureMessage(res));
    }
  };
  return (
    <form className="lead-card" onSubmit={send} noValidate>
      <p className="lead-title">
        <Icon name="mail" size={16} /> Send your question to our team
      </p>
      <label className="lead-f">
        <span>Full name *</span>
        <input value={f.name} onChange={set('name')} autoComplete="name" maxLength={80} aria-invalid={!!err.name} />
        {err.name && <em>{err.name}</em>}
      </label>
      <label className="lead-f">
        <span>Email *</span>
        <input type="email" inputMode="email" value={f.email} onChange={set('email')} autoComplete="email" maxLength={120} aria-invalid={!!err.email} />
        {err.email && <em>{err.email}</em>}
      </label>
      <div className="lead-row">
        <label className="lead-f">
          <span>Phone (optional)</span>
          <input type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" maxLength={20} placeholder="+91 98…" aria-invalid={!!err.phone} />
          {err.phone && <em>{err.phone}</em>}
        </label>
        <label className="lead-f">
          <span>Country *</span>
          <select value={f.country} onChange={set('country')} autoComplete="country" aria-invalid={!!err.country}>
            <option value="">Select…</option>
            {COUNTRIES.map((c) => (
              <option key={c.c} value={c.c}>
                {c.n}
              </option>
            ))}
          </select>
          {err.country && <em>{err.country}</em>}
        </label>
      </div>
      <label className="lead-f">
        <span>Your question *</span>
        <textarea rows={2} value={f.message} onChange={set('message')} maxLength={1000} aria-invalid={!!err.message} />
        {err.message && <em>{err.message}</em>}
      </label>
      <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.hp} onChange={set('hp')} name="website" />
      {msg && <p className="lead-msg">{msg}</p>}
      <button type="submit" className="lead-send" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send to support'} <Icon name="send" size={14} />
      </button>
      <p className="lead-privacy">
        <Icon name="lock" size={11} /> Used only to answer you. See our <a href={hrefFor('/privacy/')}>privacy policy</a>.
      </p>
    </form>
  );
}

let tawkLoaded = false;
function openTawk() {
  if (!ENV.TAWK_PROPERTY_ID || !ENV.TAWK_WIDGET_ID) return false;
  if (!tawkLoaded) {
    tawkLoaded = true;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = () => window.Tawk_API.maximize && window.Tawk_API.maximize();
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://embed.tawk.to/${encodeURIComponent(ENV.TAWK_PROPERTY_ID)}/${encodeURIComponent(ENV.TAWK_WIDGET_ID)}`;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.body.appendChild(s);
  } else if (window.Tawk_API && window.Tawk_API.maximize) window.Tawk_API.maximize();
  return true;
}

export default function LiveChat({ open, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [sound, setSound] = useState(true);
  const list = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    setSound(soundEnabled());
    return onSoundChange(setSound);
  }, []);
  useEffect(() => {
    if (open) {
      pop({ pitch: 1 });
      setTimeout(() => input.current && input.current.focus(), 350);
    }
    if (!open) return undefined;
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, onClose]);

  useEffect(() => {
    if (list.current && msgs.length) list.current.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) loadEngine();
  }, [open]);

  const botSay = (m) => {
    setTyping(false);
    pop({ pitch: 1.25, volume: 0.16 });
    setMsgs((cur) => [...cur, { from: 'bot', ...m }]);
  };

  const leadOrHandoff = (question, intro) => {
    const lead = session.get(LEAD_KEY, null);
    if (lead) {
      botSay({ text: `${intro} I can pass this to our team using the details you gave earlier (${lead.email}).`, resend: question, human: true });
    } else {
      botSay({ text: `${intro} Share your details and our support team will reply by email as soon as possible.`, lead: question, human: true });
    }
  };

  const ask = async (q, id) => {
    setMsgs((m) => [...m, { from: 'me', text: q }]);
    setTyping(true);
    const started = Date.now();
    const eng = await loadEngine();
    await new Promise((r) => setTimeout(r, Math.max(0, 550 + Math.random() * 400 - (Date.now() - started))));
    if (id === 'human') {
      const h = eng.byId('human');
      return leadOrHandoff(q, h ? h.a : 'Sure – our support team is happy to help.');
    }
    const res = id ? { best: eng.byId(id), confidence: 'high', related: [] } : eng.ask(q);
    const best = res.best;
    if (!best || res.confidence === 'none') {
      return leadOrHandoff(q, 'I couldn’t find that on our website yet, but a person on our team can answer it.');
    }
    const related = (res.related || []).map((r) => r.q);
    botSay({
      text: best.a,
      title: res.confidence === 'mid' ? best.q : '',
      src: best.src || null,
      related,
      human: !!best.handoff && !best.lead,
      lead: best.lead ? q : null
    });
  };

  const resend = async (question, idx) => {
    const lead = session.get(LEAD_KEY, null);
    if (!lead) return;
    setMsgs((m) => m.map((x, i) => (i === idx ? { ...x, resend: null } : x)));
    const res = await postJSON(ENV.API_ENQUIRY_URL, { ...lead, topic: 'Live chat question', message: question, source: 'live-chat' });
    botSay({ text: res.ok ? `Sent ✓ Our team will reply to ${lead.email}.` : failureMessage(res) });
  };

  const onLeadSent = (idx) => (lead) => {
    setMsgs((m) => m.map((x, i) => (i === idx ? { ...x, lead: null } : x)));
    botSay({ text: `Thanks, ${lead.name.split(' ')[0]}! Your question is with our support team and we’ll reply to ${lead.email}. Need it faster? WhatsApp us any time.`, done: true });
  };

  const submit = (e) => {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    setText('');
    ask(q.slice(0, 300));
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
    if (next) pop();
  };

  return (
    <section id="live-chat" className={`chat ${open ? 'is-open' : ''}`} aria-label="Live help" aria-hidden={!open} inert={!open}>
      <header className="chat-head">
        <div className="chat-aurora" aria-hidden="true" />
        <div className="chat-avatar">
          <span className="chat-avatar-ring" aria-hidden="true" />
          <T2OMark size={50} />
          <span className="chat-avatar-dot" aria-hidden="true" />
        </div>
        <div className="chat-title">
          <h2>
            Live Help <span className="chat-247">24/7</span>
          </h2>
          <p>
            <span className="live-dot" /> Online now · instant replies
          </p>
        </div>
        <div className="chat-tools">
          <button type="button" className="chat-tool" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Mute chat sounds' : 'Unmute chat sounds'}>
            <Icon name={sound ? 'volume' : 'volumeOff'} size={18} />
          </button>
          <button type="button" className="chat-tool" onClick={onClose} aria-label="Close live help">
            <Icon name="close" size={18} />
          </button>
        </div>
        <svg className="chat-wave" viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 18 C 60 4, 120 30, 200 16 S 330 2, 400 16 V30 H0 Z" />
        </svg>
      </header>

      <div className="chat-list" ref={list} aria-live="polite">
        <div className="chat-hello">
          <p className="chat-hi">
            <span className="chat-wavehand" aria-hidden="true">
              👋
            </span>{' '}
            Hi there!
          </p>
          <h3>
            Curious how <span>surveys work?</span>
          </h3>
          <p className="chat-sub">Pick a topic or type below – answers are instant, any time of day.</p>
          <div className="chat-topics">
            {TOPICS.map((t, i) => (
              <button type="button" key={t.id} className="chat-topic" style={{ '--c': t.c, '--i': i }} onClick={() => ask(t.q, t.id)}>
                <span className="chat-topic-icon">
                  <Icon name={t.icon} size={18} />
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {msgs.map((m, i) => (
          <div key={i} className={`bubble bubble-${m.from}`}>
            {m.from === 'bot' && (
              <span className="bubble-avatar" aria-hidden="true">
                <T2OMark size={24} spin={false} />
              </span>
            )}
            <div className="bubble-body">
              {m.title && (
                <p className="bubble-title">
                  <Icon name="sparkles" size={13} /> {m.title}
                </p>
              )}
              <p>{m.text}</p>
              {m.src && m.src.length > 0 && (
                <div className="bubble-src">
                  <span>Read more:</span>
                  {m.src.map(([path, label]) =>
                    /^https?:/.test(path) ? (
                      <a key={path} href={path} target="_blank" rel="noopener noreferrer">
                        {label} <Icon name="external" size={12} />
                      </a>
                    ) : (
                      <a key={path + label} href={hrefFor(path)} onClick={onClose}>
                        {label} <Icon name="arrow" size={12} />
                      </a>
                    )
                  )}
                </div>
              )}
              {m.related && m.related.length > 0 && (
                <div className="bubble-related">
                  <span>Related questions</span>
                  {m.related.map((rq) => (
                    <button type="button" key={rq} onClick={() => ask(rq)}>
                      {rq}
                    </button>
                  ))}
                </div>
              )}
              {m.lead && <LeadForm question={m.lead} onSent={onLeadSent(i)} />}
              {m.resend && (
                <button type="button" className="lead-send" onClick={() => resend(m.resend, i)}>
                  Send this question to the team <Icon name="send" size={14} />
                </button>
              )}
              {m.human && (
                <div className="handoff">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="handoff-btn wa">
                    <Icon name="whatsapp" size={18} /> WhatsApp
                  </a>
                  <a href={`mailto:${SITE.email}`} className="handoff-btn mail">
                    <Icon name="mail" size={18} /> Email
                  </a>
                  {ENV.TAWK_PROPERTY_ID && (
                    <button type="button" className="handoff-btn agent" onClick={openTawk}>
                      <Icon name="headset" size={18} /> Live agent
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="bubble bubble-bot is-typing" aria-label="Typing">
            <span className="bubble-avatar" aria-hidden="true">
              <T2OMark size={24} spin={false} />
            </span>
            <div className="bubble-body typing-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="chat-chips" aria-label="Quick questions">
        <div className="chat-chips-track">
          {[...CHIPS, ...CHIPS].map(([q, id], i) => (
            <button type="button" key={i} className="chip" tabIndex={i >= CHIPS.length ? -1 : 0} aria-hidden={i >= CHIPS.length} onClick={() => ask(q, id)}>
              {q}
            </button>
          ))}
        </div>
      </div>

      <form className="chat-form" onSubmit={submit}>
        <label htmlFor="chat-input" className="sr-only">
          Type your question
        </label>
        <div className="chat-input-wrap">
          <Icon name="sparkles" size={18} />
          <input id="chat-input" ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything about surveys or rewards…" autoComplete="off" maxLength={300} />
        </div>
        <button type="submit" className="chat-send" aria-label="Send" disabled={!text.trim()}>
          <Icon name="send" size={18} />
        </button>
      </form>
      <p className="chat-secure">
        <Icon name="lock" size={12} /> Secure · We’ll never ask for your password or OTP
      </p>
    </section>
  );
}
