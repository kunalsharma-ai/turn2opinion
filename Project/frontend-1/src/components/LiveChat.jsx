// 24/7 live help: an instant answer engine built from our FAQ, with one-tap hand-off to a person
// on WhatsApp, email or (optionally) Tawk.to live agents. Plays a soft "pop" when opened and on replies.
import { useEffect, useRef, useState } from 'react';
import { ENV } from '../config/env.js';
import { SITE, waLink } from '../config/site.js';
import { hrefFor } from '../router/Router.jsx';
import { pop, setSoundEnabled, soundEnabled } from '../utils/sound.js';
import { T2OMark } from './Brand.jsx';
import Icon from './Icon.jsx';

const KB = [
  {
    id: 'join',
    keys: ['join', 'register', 'sign up', 'signup', 'account', 'start', 'create', 'free', 'enroll', 'enrol'],
    a: 'Joining is free and takes about two minutes: add your details, verify your email and phone, and you’ll start receiving survey invitations that match your profile.',
    link: ['/join/', 'Create my free account']
  },
  {
    id: 'pay',
    keys: ['pay', 'payment', 'paid', 'redeem', 'reward', 'paypal', 'wire', 'bank', 'amazon', 'gift', 'cash', 'money', 'withdraw', 'incentive'],
    a: 'You earn points for every completed survey. Once you reach the threshold in your dashboard you can redeem them. Members in India can choose UPI, PayPal, wire transfer or an Amazon gift card; members outside India can choose PayPal, wire transfer or an Amazon gift card.',
    link: ['/rewards/', 'See reward options']
  },
  {
    id: 'upi',
    keys: ['upi', 'gpay', 'phonepe', 'paytm', 'bhim'],
    a: 'Yes – UPI is available for members in India, alongside PayPal, wire transfer and Amazon gift cards. UPI is an India-only method, so members in other countries can choose PayPal, wire transfer or an Amazon gift card.',
    link: ['/rewards/', 'Compare payout methods']
  },
  {
    id: 'time',
    keys: ['how long', 'when', 'receive', 'delay', 'pending', 'weeks', 'not received', 'status'],
    a: 'After you request a redemption we verify your profile and completions, then our accounts team processes it. Transfers can take up to 2–3 weeks because they run in batches. Double-check your payment details to avoid delays.'
  },
  {
    id: 'surveys',
    keys: ['survey', 'no survey', 'invitation', 'invite', 'how many', 'more surveys', 'available', 'notification', 'how surveys work'],
    a: 'Invitations are matched to your profile. Complete every profile section, set your ideal survey frequency, and turn on SMS, WhatsApp or email alerts so you never miss one.',
    link: ['/how-it-works/', 'How it works']
  },
  {
    id: 'screen',
    keys: ['screen', 'disqualif', 'terminated', 'closed', 'quota', 'kicked', 'not eligible', 'over quota'],
    a: 'Each study needs a specific audience, so screening questions come first. If you don’t match, or the quota is already full, the survey closes early. Accurate, honest profile answers mean fewer screen-outs over time.'
  },
  {
    id: 'pro',
    keys: ['business', 'professional', 'b2b', 'job', 'manager', 'director', 'it ', 'doctor', 'company', 'work email'],
    a: 'Yes – professionals are very welcome. Add your job title, industry and department to your profile to unlock business studies for IT, finance, HR, healthcare, marketing, operations and many more roles.',
    link: ['/paid-surveys/', 'Explore ways to earn']
  },
  {
    id: 'countries',
    keys: ['country', 'countries', 'india', 'usa', 'uk', 'where', 'region', 'available in'],
    a: 'We invite consumers and professionals across North and South America, Europe, Asia Pacific, the Middle East and Africa. Sign up with your real country of residence – it’s validated for every survey.'
  },
  {
    id: 'privacy',
    keys: ['privacy', 'data', 'safe', 'secure', 'share', 'sell', 'gdpr', 'personal', 'spam'],
    a: 'Your details are secured with us and never sold or shared for advertising. Survey answers are reported in aggregate, not linked to your identity.',
    link: ['/profiling/', 'Trust & Safety']
  },
  {
    id: 'password',
    keys: ['password', 'login', 'log in', 'forgot', 'reset', 'can’t access', 'cant access', 'locked'],
    a: 'You can change your password under Settings → Change Password after logging in. If you can’t log in, use “Forgot password?” on the login page or email us from your registered address.',
    link: ['/login/', 'Go to login']
  },
  {
    id: 'delete',
    keys: ['delete', 'remove', 'cancel', 'close account', 'unsubscribe'],
    a: 'Log in, open My Profile (top right) and choose Delete Account, then confirm by email. You can restore it within 30 days; after that all data is removed.'
  },
  {
    id: 'email',
    keys: ['change email', 'update email', 'email address', 'new email'],
    a: 'For security, registered emails can’t be changed in the dashboard. Email support@turn2opinion.com from your registered address and we’ll help.'
  },
  {
    id: 'age',
    keys: ['age', 'old', 'minor', 'teen', 'under 18', 'student'],
    a: 'Students and adults of all ages can join. Members under 18 need to inform a parent or guardian and provide their email during sign-up.'
  },
  {
    id: 'investment',
    keys: ['investment', 'fee', 'cost', 'charge', 'scam', 'legit', 'genuine', 'real'],
    a: 'Turn2Opinion never asks for money – not to join, not to unlock surveys, not to withdraw. We’re part of Frequent Research, an ISO 9001, ISO 27001 and ISO 20252 certified research company and ESOMAR member.'
  }
];

const TOPICS = [
  { id: 'join', label: 'Join free', q: 'How do I join?', icon: 'sparkles', c: '#1F5BFF' },
  { id: 'pay', label: 'Get paid', q: 'How do I get paid?', icon: 'wallet', c: '#12C29B' },
  { id: 'surveys', label: 'Surveys', q: 'How do surveys work?', icon: 'chat', c: '#FFB020' },
  { id: 'pro', label: 'Professionals', q: 'Can professionals join?', icon: 'briefcase', c: '#7B5CFF' },
  { id: 'privacy', label: 'My data', q: 'Is my data safe?', icon: 'shield', c: '#FF5C7A' },
  { id: 'human', label: 'Talk to a person', q: 'Talk to a person', icon: 'headset', c: '#0E1B4D' }
];

const CHIPS = [
  ['Is UPI available?', 'upi'],
  ['I forgot my password', 'password'],
  ['Why was I screened out?', 'screen'],
  ['How long do payouts take?', 'time'],
  ['Is it really free?', 'investment'],
  ['Can students join?', 'age'],
  ['Can professionals join?', 'pro']
];

function answerFor(text) {
  const t = ` ${text.toLowerCase()} `;
  let best = null;
  let score = 0;
  for (const k of KB) {
    const s = k.keys.reduce((n, key) => n + (t.includes(key) ? key.length : 0), 0);
    if (s > score) {
      score = s;
      best = k;
    }
  }
  return best;
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

  useEffect(() => setSound(soundEnabled()), []);
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

  const reply = (entry, fallbackText) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pop({ pitch: 1.25, volume: 0.16 });
      if (entry === 'human') {
        setMsgs((m) => [...m, { from: 'bot', text: 'Happy to connect you with our support team. Pick whatever is easiest:', human: true }]);
        return;
      }
      if (!entry) {
        setMsgs((m) => [
          ...m,
          { from: 'bot', text: `I don’t have a ready answer for “${fallbackText.slice(0, 60)}”, but a person on our team does. Reach them below – we reply around the clock.`, human: true }
        ]);
        return;
      }
      setMsgs((m) => [...m, { from: 'bot', text: entry.a, link: entry.link }]);
    }, 650 + Math.random() * 500);
  };

  const ask = (q, id) => {
    setMsgs((m) => [...m, { from: 'me', text: q }]);
    if (id === 'human') return reply('human');
    const entry = id ? KB.find((k) => k.id === id) : answerFor(q);
    reply(entry, q);
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
            <span className="live-dot" /> Online now · replies in seconds
          </p>
        </div>
        <div className="chat-tools">
          <button type="button" className="chat-tool" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Mute chat sounds' : 'Unmute chat sounds'}>
            <Icon name={sound ? 'volume' : 'volumeOff'} size={18} />
          </button>
          <button type="button" className="chat-tool" onClick={onClose} aria-label="Close live help">
            <Icon name="x" size={18} />
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
              <p>{m.text}</p>
              {m.link && (
                <a className="bubble-link" href={hrefFor(m.link[0])} onClick={onClose}>
                  {m.link[1]} <Icon name="arrow" size={14} />
                </a>
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
