import { useState } from 'react';
import { SITE, waLink } from '../config/site.js';
import { ENV, asset } from '../config/env.js';
import { postJSON, failureMessage } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import { useReveal } from '../hooks/useMounted.js';
import { Link } from '../router/Router.jsx';
import Captcha from '../components/Captcha.jsx';
import { EMAIL_RE } from '../components/FormFields.jsx';
import Icon from '../components/Icon.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import { T2OMark } from '../components/Brand.jsx';
import WordSplit from '../components/WordSplit.jsx';

const TOPICS = ['My account', 'Surveys & invitations', 'Rewards & payments', 'Privacy & data', 'Business / research partnership', 'Something else'];

// Hero switchboard: a support person in the middle, live "cables" running to each channel.
const LINES = [
  { id: 'chat', label: 'Live help', sub: 'Online now · instant', icon: 'chat', c: '#1F5BFF', x: 12, y: 18 },
  { id: 'wa', label: 'WhatsApp', sub: 'Replies the same day', icon: 'whatsapp', c: '#25D366', x: 88, y: 18 },
  { id: 'mail', label: 'Email', sub: 'Within 1 business day', icon: 'mail', c: '#7B5CFF', x: 12, y: 82 },
  { id: 'phone', label: 'Phone', sub: 'Office hours, IST', icon: 'phone', c: '#FF5C7A', x: 88, y: 82 }
];

function Switchboard() {
  const href = { wa: waLink(), mail: `mailto:${SITE.email}`, phone: `tel:${SITE.phone}` };
  return (
    <div className="switchboard">
      <svg className="sb-cables" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {LINES.map((l) => (
          <g key={l.id} style={{ '--c': l.c }}>
            <path d={`M50 52 C 50 ${l.y}, ${l.x} 52, ${l.x} ${l.y}`} className="sb-wire" />
            <path d={`M50 52 C 50 ${l.y}, ${l.x} 52, ${l.x} ${l.y}`} className="sb-pulse" pathLength="100" />
          </g>
        ))}
      </svg>
      <span className="sb-person" aria-hidden="true">
        <span className="sb-ring" />
        <img src={asset('/images/people/pro-pointing.svg')} alt="Illustration of a Turn2Opinion support contact pointing to the ways to reach the team" width="200" height="240" />
      </span>
      {LINES.map((l, i) => {
        const inner = (
          <>
            <span className="sb-ico">
              <Icon name={l.icon} size={24} />
            </span>
            <span className="sb-txt">
              <strong>{l.label}</strong>
              <small>
                <i className="sb-led" /> {l.sub}
              </small>
            </span>
          </>
        );
        const style = { '--c': l.c, '--x': `${l.x}%`, '--y': `${l.y}%`, '--i': i };
        return l.id === 'chat' ? (
          <button key={l.id} type="button" className="sb-line" style={style} onClick={() => window.dispatchEvent(new Event('t2o:open-chat'))}>
            {inner}
          </button>
        ) : (
          <a key={l.id} className="sb-line" style={style} href={href[l.id]} {...(l.id === 'wa' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {inner}
          </a>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const ref = useReveal();
  const [f, setF] = useState({ name: '', email: '', topic: '', message: '' });
  const [agree, setAgree] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [hp, setHp] = useState(''); // honeypot: real people never see or fill this

  const v = {
    name: f.name.trim().length < 2 ? 'Enter your name.' : '',
    email: !EMAIL_RE.test(f.email.trim()) ? 'Enter a valid email address, like name@example.com.' : '',
    topic: !f.topic ? 'Choose what your message is about.' : '',
    message: f.message.trim().length < 15 ? 'Write at least 15 characters so we can help.' : ''
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const blur = (k) => () => setTouched({ ...touched, [k]: true });
  const err = (k) => (touched[k] || errors._submitted ? v[k] : '');

  const submit = async (e) => {
    e.preventDefault();
    const extra = { agree: agree ? '' : 'Tick the box so we can reply to you.', captcha: captcha ? '' : 'Complete the human check.' };
    setErrors({ _submitted: true, ...extra });
    if (Object.values(v).some(Boolean) || extra.agree || extra.captcha) return;
    setState('sending');
    const res = await postJSON(ENV.API_ENQUIRY_URL, { ...f, website: hp, captchaToken: captcha.token, captchaProvider: captcha.provider });
    if (res.ok) {
      setState('sent');
      track('contact_submit', { topic: f.topic });
    } else {
      setState('error');
      setMsg(failureMessage(res));
      setResetKey((k) => k + 1);
    }
  };

  return (
    <div ref={ref}>
      <section className="contact-hero2">
        <div className="ch-glow" aria-hidden="true" />
        <div className="wrap ch-grid">
          <div className="ch-copy">
            <Breadcrumbs items={[{ label: 'Contact' }]} />
            <p className="ph-kicker">Real people, on every line</p>
            <h1 className="ph-title">Let’s talk</h1>
            <p className="ph-tagline">
              <WordSplit text="Pick a line. A real person picks up." />
            </p>
            <p className="ph-lead">Questions about surveys, rewards or your account? Live help answers any time of day – or drop us a note below.</p>
            <ul className="ch-facts">
              <li>
                <b>24/7</b> live help
              </li>
              <li>
                <b>4</b> ways to reach us
              </li>
              <li>
                <b>1</b> office in New Delhi
              </li>
            </ul>
          </div>
          <Switchboard />
        </div>
      </section>

      <section className="section s-paper contact-main">
        <div className="wrap contact-grid">
          <div className="contact-form-card" data-reveal>
            {state === 'sent' ? (
              <div className="sent">
                <div className="sent-plane" aria-hidden="true">
                  <Icon name="send" size={44} />
                </div>
                <h2>Message sent</h2>
                <p>Thanks, {f.name.split(' ')[0]}. We’ll reply to {f.email} – usually within one business day.</p>
                <Link to="/" className="btn btn-primary">
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="madlib">
                <h2>Write to us</h2>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="c-website">Website</label>
                  <input id="c-website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
                <p className="ml-line">
                  Hi Turn2Opinion, my name is{' '}
                  <span className={`ml-slot ${err('name') ? 'bad' : touched.name && !v.name ? 'ok' : ''}`}>
                    <label htmlFor="c-name" className="sr-only">
                      Your name
                    </label>
                    <input id="c-name" value={f.name} onChange={set('name')} onBlur={blur('name')} placeholder="your name" autoComplete="name" maxLength={80} aria-invalid={!!err('name')} aria-describedby="c-name-err" size={Math.max(9, f.name.length + 1)} />
                  </span>{' '}
                  and you can reach me at{' '}
                  <span className={`ml-slot ${err('email') ? 'bad' : touched.email && !v.email ? 'ok' : ''}`}>
                    <label htmlFor="c-email" className="sr-only">
                      Email
                    </label>
                    <input id="c-email" type="email" value={f.email} onChange={set('email')} onBlur={blur('email')} placeholder="you@email.com" autoComplete="email" maxLength={120} aria-invalid={!!err('email')} aria-describedby="c-email-err" size={Math.max(14, f.email.length + 1)} />
                  </span>
                  .
                </p>
                <p className="field-error" id="c-name-err">
                  {err('name')}
                </p>
                <p className="field-error" id="c-email-err">
                  {err('email')}
                </p>
                <p className="ml-line">I’d like to talk about…</p>
                <div className="topic-chips" role="radiogroup" aria-label="Topic">
                  {TOPICS.map((t, i) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={f.topic === t}
                      key={t}
                      style={{ '--i': i }}
                      className={`topic-chip ${f.topic === t ? 'is-on' : ''}`}
                      onClick={() => {
                        setF({ ...f, topic: t });
                        setTouched({ ...touched, topic: true });
                      }}
                    >
                      {f.topic === t && <Icon name="check" size={14} />} {t}
                    </button>
                  ))}
                </div>
                {err('topic') && <p className="field-error">{err('topic')}</p>}
                <div className="ml-bubble">
                  <label htmlFor="c-msg">Here’s what’s on my mind</label>
                  <textarea id="c-msg" rows={5} value={f.message} onChange={set('message')} onBlur={blur('message')} maxLength={1500} aria-invalid={!!err('message')} placeholder="Type your message…" />
                  <span className="ml-count">{f.message.length}/1500</span>
                </div>
                {err('message') && <p className="field-error">{err('message')}</p>}
                <label className={`check ${errors.agree ? 'has-error' : ''}`}>
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                  <span className="check-ui" />
                  <span>
                    I agree that Turn2Opinion may use these details to reply to me, as described in the <Link to="/privacy/">privacy policy</Link>.
                  </span>
                </label>
                {errors.agree && <p className="field-error">{errors.agree}</p>}
                <Captcha onChange={setCaptcha} resetKey={resetKey} error={errors.captcha} />
                {errors.captcha && <p className="field-error">{errors.captcha}</p>}
                {state === 'error' && (
                  <p className="form-alert" role="alert">
                    {msg}
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-block btn-lg ml-send" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send message'} <Icon name="send" size={18} />
                </button>
              </form>
            )}
          </div>

          <aside className="contact-side">
            <div className="letter" aria-hidden="true">
              <span className="letter-stamp">
                <T2OMark size={30} />
              </span>
              <p className="letter-row">
                <b>To</b> {SITE.email}
              </p>
              <p className="letter-row">
                <b>From</b> {f.name || 'You'} {f.email && <span>&lt;{f.email}&gt;</span>}
              </p>
              <p className="letter-row">
                <b>About</b> {f.topic || '…'}
              </p>
              <p className="letter-body">
                {f.message || 'Your message appears here as you type.'}
                <i className="letter-caret" />
              </p>
              <span className="letter-postmark">New Delhi</span>
            </div>
            <div className="office" data-reveal>
              <div className="delhi-map" aria-hidden="true">
                <svg viewBox="0 0 320 170">
                  <path className="dm-river" d="M250 0 C 230 40, 270 70, 240 110 S 250 150, 230 170" />
                  <ellipse className="dm-ring" cx="170" cy="92" rx="110" ry="62" />
                  <ellipse className="dm-ring r2" cx="170" cy="92" rx="62" ry="36" />
                  <path className="dm-road" d="M0 60 L320 120 M40 170 L200 0 M0 130 L320 40" />
                </svg>
                <span className="dm-pin" style={{ left: '27%', top: '30%' }}>
                  <Icon name="pin" size={28} />
                </span>
                <span className="dm-pulse" style={{ left: '27%', top: '30%' }} />
                <span className="dm-label" style={{ left: '33%', top: '18%' }}>
                  Mangolpur Kalan
                </span>
              </div>
              <h3>Our office</h3>
              <address>
                {SITE.legalName}
                <br />
                {SITE.address.street}, {SITE.address.locality} – {SITE.address.postalCode}
                <br />
                {SITE.address.countryName}
              </address>
            </div>
            <div className="race" data-reveal>
              <h3>How fast we reply</h3>
              {[
                ['Live help', 'instant, 24/7', 1, '#1F5BFF'],
                ['WhatsApp', 'same day', 0.7, '#25D366'],
                ['Email', '1 business day', 0.45, '#7B5CFF']
              ].map(([k, t, w, c], i) => (
                <div key={k} className="race-row" style={{ '--w': w, '--c': c, '--i': i }}>
                  <span className="race-k">{k}</span>
                  <span className="race-bar">
                    <i />
                  </span>
                  <span className="race-t">{t}</span>
                </div>
              ))}
              <Link to="/faq/" className="link-arrow">
                Or browse the FAQ first <Icon name="arrow" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
