// "Rate your experience": a persistent side tab plus a gentle, rate-limited prompt.
// Prompt rules (never on arrival): only after 45s on site AND 40% scroll depth, at most once per
// session, max 3 times ever, at least 2 days apart, and never again after a review is submitted.
import { useCallback, useEffect, useRef, useState } from 'react';
import { session, store } from '../utils/storage.js';
import { submitReview } from '../utils/reviews.js';
import { track } from '../utils/analytics.js';
import { failureMessage } from '../utils/api.js';
import Captcha from './Captcha.jsx';
import Icon from './Icon.jsx';
import { CountryPicker, Field, PhoneField } from './FormFields.jsx';

const KEY = 't2o_review_prompt_v1';
const MOODS = [
  { v: 1, label: 'Not great', face: 'M8 16c1-1.5 2.4-2.2 4-2.2s3 .7 4 2.2', hue: '#FF5C7A' },
  { v: 2, label: 'Could be better', face: 'M8.5 15.5h7', hue: '#FF8A3D' },
  { v: 3, label: 'Good', face: 'M8.5 14.8c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2', hue: '#FFB020' },
  { v: 4, label: 'Really good', face: 'M8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4', hue: '#49B6FF' },
  { v: 5, label: 'Love it', face: 'M7.5 13.5c1 2.4 2.6 3.6 4.5 3.6s3.5-1.2 4.5-3.6z', hue: '#12C29B' }
];

function MoodFace({ m, active }) {
  return (
    <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true" className={active ? 'is-active' : ''}>
      <circle cx="12" cy="12" r="10" fill={active ? m.hue : 'currentColor'} opacity={active ? 1 : 0.14} />
      <circle cx="9" cy="10" r="1.2" fill={active ? '#fff' : 'currentColor'} />
      <circle cx="15" cy="10" r="1.2" fill={active ? '#fff' : 'currentColor'} />
      <path d={m.face} fill={m.v === 5 ? (active ? '#fff' : 'currentColor') : 'none'} stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// Things members can tap in step 1 (sent as "tags" and shown on their testimonial).
const LIKES = ['Easy to use', 'Quick payouts', 'Interesting topics', 'Helpful support', 'Works on mobile', 'Fair rewards'];
const FIXES = ['More surveys', 'Fewer screen-outs', 'Faster payouts', 'Shorter surveys'];

/** Big face that morphs continuously with the dial value (1–5). */
function BigFace({ v }) {
  const t = (v - 1) / 4;
  const hue = (350 + t * 160) % 360;
  const mouthY = 132 + (t - 0.5) * 70; // control point below the corners = smile, above = frown
  const outer = 76 - 12 * t; // sad: inner ends of the brows raised; happy: both lifted
  const inner = 64 + 2 * t;
  const eyeRy = 7 + t * 3;
  return (
    <svg viewBox="0 0 200 200" className="bigface" aria-hidden="true" style={{ '--fh': hue }}>
      <defs>
        <radialGradient id="bf-g" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor={`hsl(${hue} 95% 78%)`} />
          <stop offset="1" stopColor={`hsl(${hue} 85% 55%)`} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="78" fill="url(#bf-g)" />
      <ellipse cx="62" cy="122" rx="13" ry="8" fill="#fff" opacity={0.15 + t * 0.35} />
      <ellipse cx="138" cy="122" rx="13" ry="8" fill="#fff" opacity={0.15 + t * 0.35} />
      <path d={`M58 ${outer} L84 ${inner}`} stroke="#1b1140" strokeWidth="6" strokeLinecap="round" />
      <path d={`M116 ${inner} L142 ${outer}`} stroke="#1b1140" strokeWidth="6" strokeLinecap="round" />
      <ellipse className="bf-eye" cx="72" cy="94" rx="7" ry={eyeRy} fill="#1b1140" />
      <ellipse className="bf-eye" cx="128" cy="94" rx="7" ry={eyeRy} fill="#1b1140" />
      <circle cx="75" cy="90" r="2.4" fill="#fff" />
      <circle cx="131" cy="90" r="2.4" fill="#fff" />
      <path d={`M66 132 Q100 ${mouthY + (mouthY - 132)} 134 132`} fill={t > 0.8 ? '#1b1140' : 'none'} stroke="#1b1140" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function ReviewModal({ open, initialRating, onClose, onDone }) {
  const [v, setV] = useState(initialRating || 3);
  const [touched, setTouched] = useState(!!initialRating);
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({ audience: '', name: '', lastName: '', email: '', phoneCc: '', phone: '', country: '', company: '', role: '', text: '' });
  const [agree, setAgree] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const dialog = useRef(null);

  useEffect(() => {
    if (open) {
      setV(initialRating || 3);
      setTouched(!!initialRating);
      setStep(1);
      setState('idle');
      setTimeout(() => dialog.current && dialog.current.focus(), 30);
      const esc = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', esc);
      document.documentElement.classList.add('modal-open');
      return () => {
        window.removeEventListener('keydown', esc);
        document.documentElement.classList.remove('modal-open');
      };
    }
    return undefined;
  }, [open, initialRating, onClose]);

  if (!open) return null;
  const rating = Math.round(v);
  const mood = MOODS[rating - 1];
  const clearErr = (k) => errors[k] && setErrors((x) => ({ ...x, [k]: undefined }));
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    clearErr(k);
  };
  const toggleTag = (t) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : cur.length < 4 ? [...cur, t] : cur));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter your first name (at least 2 letters).';
    else if (!/^[\p{L} .'-]+$/u.test(form.name.trim())) e.name = 'Use letters only.';
    if (!form.audience) e.audience = 'Tell us if you take part as a consumer or a business professional.';
    if (form.lastName.trim() && !/^[\p{L} .'-]+$/u.test(form.lastName.trim())) e.lastName = 'Use letters only.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Enter a valid email address, e.g. name@example.com.';
    const digits = form.phone.replace(/\D/g, '');
    if (digits && (digits.length < 6 || digits.length > 14)) e.phone = 'Enter 6–14 digits, without the country code.';
    else if (digits && !form.phoneCc) e.phone = 'Pick the country dial code.';
    if (form.company.trim().length < 2) e.company = 'Enter your company name (or where you study).';
    if (form.role.trim().length < 2) e.role = 'Enter your designation.';
    if (form.text.trim().length < 20) e.text = 'Tell us a little more – at least 20 characters.';
    if (!agree) e.agree = 'Tick the box so we can publish your review.';
    if (!captcha) e.captcha = 'Complete the human check.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const send = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setState('sending');
    const digits = form.phone.replace(/\D/g, '');
    const res = await submitReview({
      name: form.name,
      country: form.country,
      company: form.company,
      role: form.role,
      audience: form.audience,
      text: form.text,
      rating,
      tags,
      captchaToken: captcha && captcha.token,
      // Private contact details: sent to the backend for verification only, never published or stored in the browser.
      contact: { lastName: form.lastName.trim(), email: form.email.trim(), phoneCountry: digits ? form.phoneCc : '', phone: digits }
    });
    track('review_submit', { rating });
    if (!res.ok) setMsg(failureMessage(res));
    setState('done');
    onDone();
    setResetKey((k) => k + 1);
  };

  const chips = rating >= 3 ? LIKES : [...FIXES, ...LIKES.slice(0, 2)];
  const hue = (350 + ((v - 1) / 4) * 160) % 360;
  return (
    <div className="modal-scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`review-modal rm-step${step} ${state === 'done' ? 'is-done' : ''}`} role="dialog" aria-modal="true" aria-labelledby="review-title" tabIndex={-1} ref={dialog} style={{ '--mh': hue }}>
        <button type="button" className="modal-x" onClick={onClose} aria-label="Close">
          <Icon name="x" size={18} />
        </button>

        <div className="rm-stage" aria-hidden="true">
          <span className="rm-facewrap">
            <span className="rm-ring" style={{ '--p': (v - 1) / 4 }} />
            <BigFace v={v} />
          </span>
          <span className="rm-floaters" key={rating}>
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} style={{ '--i': i }}>
                <Icon name={rating >= 4 ? 'heart' : rating === 3 ? 'star' : 'chat'} size={14 + (i % 3) * 4} />
              </i>
            ))}
          </span>
          <span className="rm-word">{mood.label}</span>
          <span className="rm-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <Icon key={n} name="star" size={18} className={n <= rating ? 'on' : ''} />
            ))}
          </span>
        </div>

        <div className="rm-panel">
          {state === 'done' ? (
            <div className="review-done">
              <div className="rm-plane" aria-hidden="true">
                <Icon name="send" size={34} />
              </div>
              <h2 id="review-title">Thanks, {form.name.split(' ')[0] || 'friend'}!</h2>
              <p>Your review is already showing in Member voices on this device. Everyone else will see it once our team has had a quick look.</p>
              {msg && <p className="review-note">{msg}</p>}
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Back to the site
              </button>
            </div>
          ) : (
            <form onSubmit={send} noValidate>
              <ol className="rm-steps" aria-label="Progress">
                <li className={step === 1 ? 'is-on' : 'is-done'}>Your mood</li>
                <li className={step === 2 ? 'is-on' : ''}>Your words</li>
              </ol>
              {step === 1 ? (
                <div className="rm-pane" key="s1">
                  <h2 id="review-title">How does Turn2Opinion feel so far?</h2>
                  <p className="review-sub">Slide the dial. Be honest – the low scores teach us the most.</p>
                  <div className="dial">
                    <label htmlFor="rv-dial" className="sr-only">
                      Your rating from 1 to 5
                    </label>
                    <input
                      id="rv-dial"
                      type="range"
                      min="1"
                      max="5"
                      step="0.01"
                      value={v}
                      aria-valuetext={`${rating} of 5 – ${mood.label}`}
                      onChange={(e) => {
                        setV(Number(e.target.value));
                        setTouched(true);
                      }}
                      onPointerUp={() => setV(Math.round(v))}
                      onKeyUp={() => setV(Math.round(v))}
                      onBlur={() => setV(Math.round(v))}
                      style={{ '--fill': `${((v - 1) / 4) * 100}%` }}
                    />
                    <div className="dial-ticks" aria-hidden="true">
                      {MOODS.map((m) => (
                        <button type="button" tabIndex={-1} key={m.v} className={rating === m.v ? 'is-on' : ''} onClick={() => setV(m.v)}>
                          <MoodFace m={m} active={rating === m.v} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="rm-q">{rating >= 3 ? 'What stood out?' : 'What should we fix first?'} <small>Pick up to 4</small></p>
                  <div className="rm-chips">
                    {chips.map((c, i) => (
                      <button type="button" key={c} style={{ '--i': i }} aria-pressed={tags.includes(c)} className={tags.includes(c) ? 'is-on' : ''} onClick={() => toggleTag(c)}>
                        {tags.includes(c) && <Icon name="check" size={13} />} {c}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="btn btn-primary btn-block" onClick={() => setStep(2)}>
                    {touched ? 'Next: add your words' : 'Keep 3 stars and continue'} <Icon name="arrow" size={18} />
                  </button>
                </div>
              ) : (
                <div className="rm-pane" key="s2">
                  <h2 id="review-title">Tell other members what it’s really like</h2>
                  <fieldset className={`aud-tick ${errors.audience ? 'has-error' : ''}`}>
                    <legend>I take part as a…</legend>
                    {[
                      ['consumer', 'Consumer', 'Everyday life & shopping', 'bag'],
                      ['professional', 'Business professional', 'Work, tools & decisions', 'briefcase']
                    ].map(([k, l, sub, ic]) => (
                      <label key={k} className={`at-opt at-${k} ${form.audience === k ? 'is-on' : ''}`}>
                        <input type="radio" name="rv-aud" value={k} checked={form.audience === k} onChange={() => {
                            setForm({ ...form, audience: k });
                            clearErr('audience');
                          }} />
                        <span className="at-ico" aria-hidden="true">
                          <Icon name={ic} size={20} />
                        </span>
                        <span className="at-txt">
                          <strong>{l}</strong>
                          <small>{sub}</small>
                        </span>
                        <span className="at-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12.5l4.2 4.2L19 7" pathLength="1" />
                          </svg>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                  {errors.audience && <p className="field-error">{errors.audience}</p>}
                  <div className="form-grid two">
                    <Field id="rv-name" label="First name" error={errors.name}>
                      <input id="rv-name" className="input" value={form.name} onChange={set('name')} maxLength={60} autoComplete="given-name" />
                    </Field>
                    <Field id="rv-last" label="Last name" optional error={errors.lastName}>
                      <input id="rv-last" className="input" value={form.lastName} onChange={set('lastName')} maxLength={60} autoComplete="family-name" />
                    </Field>
                    <Field id="rv-email" label="Email" error={errors.email} hint="Never published – only used to verify your review" className="field-wide">
                      <input id="rv-email" className="input" type="email" inputMode="email" value={form.email} onChange={set('email')} maxLength={120} autoComplete="email" />
                    </Field>
                    <Field id="rv-phone" label="Phone number" optional error={errors.phone} className="field-wide">
                      <PhoneField
                        id="rv-phone"
                        country={form.phoneCc}
                        number={form.phone}
                        onCountry={(c) => setForm({ ...form, phoneCc: c })}
                        onNumber={(n) => {
                          setForm({ ...form, phone: n });
                          clearErr('phone');
                        }}
                        invalid={!!errors.phone}
                      />
                    </Field>
                    <Field id="rv-company" label="Company name" error={errors.company}>
                      <input id="rv-company" className="input" value={form.company} onChange={set('company')} maxLength={80} autoComplete="organization" placeholder={form.audience === 'consumer' ? 'Where you work or study' : 'Your company'} />
                    </Field>
                    <Field id="rv-role" label="Designation" error={errors.role}>
                      <input id="rv-role" className="input" value={form.role} onChange={set('role')} maxLength={80} autoComplete="organization-title" placeholder={form.audience === 'professional' ? 'IT manager, CFO…' : 'Student, nurse, homemaker…'} />
                    </Field>
                    <Field id="rv-country" label="Country" optional className="field-wide" hint="Shows your flag on the review">
                      <CountryPicker id="rv-country" value={form.country} onChange={(c) => setForm({ ...form, country: c, phoneCc: form.phoneCc || c })} />
                    </Field>
                  </div>
                  <Field id="rv-text" label="Your review" error={errors.text} hint={`${form.text.length}/600`}>
                    <textarea id="rv-text" className="input" rows={3} value={form.text} onChange={set('text')} maxLength={600} placeholder="What do you like? What could be better?" />
                  </Field>
                  <label className={`check ${errors.agree ? 'has-error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => {
                        setAgree(e.target.checked);
                        clearErr('agree');
                      }}
                    />
                    <span className="check-ui" />
                    <span>Publish my review with my first name, designation, company and country flag. My email and phone stay private.</span>
                  </label>
                  {errors.agree && <p className="field-error">{errors.agree}</p>}
                  <Captcha onChange={setCaptcha} resetKey={resetKey} error={errors.captcha} />
                  {errors.captcha && <p className="field-error">{errors.captcha}</p>}
                  <div className="rm-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                      <Icon name="arrowLeft" size={18} /> Back
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Posting…' : 'Post my review'} <Icon name="send" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewWidget({ ready }) {
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [prompt, setPrompt] = useState(false);
  const started = useRef(Date.now());

  const openModal = useCallback((r = 0) => {
    setRating(r);
    setPrompt(false);
    setModal(true);
    track('review_open', { rating: r });
  }, []);

  useEffect(() => {
    const h = () => openModal(0);
    window.addEventListener('t2o:open-review', h);
    return () => window.removeEventListener('t2o:open-review', h);
  }, [openModal]);

  useEffect(() => {
    if (!ready) return undefined;
    const st = store.get(KEY, { count: 0, last: 0, submitted: false });
    if (st.submitted || st.count >= 3 || Date.now() - st.last < 2 * 864e5 || session.get(KEY)) return undefined;
    let depthOk = false;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h > 0.4) depthOk = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const iv = setInterval(() => {
      if (depthOk && Date.now() - started.current > 45000 && !document.hidden && !document.documentElement.classList.contains('modal-open')) {
        clearInterval(iv);
        setPrompt(true);
        session.set(KEY, 1);
        store.set(KEY, { ...st, count: st.count + 1, last: Date.now() });
      }
    }, 3000);
    return () => {
      clearInterval(iv);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ready]);

  const done = () => {
    const st = store.get(KEY, { count: 0, last: 0 });
    store.set(KEY, { ...st, submitted: true });
  };

  return (
    <>
      <button type="button" className="rate-tab" onClick={() => openModal(0)} aria-label="Rate your experience">
        <span className="rate-tab-faces" aria-hidden="true">
          {MOODS.map((m) => (
            <span key={m.v} style={{ '--i': m.v - 1 }}>
              <MoodFace m={m} active />
            </span>
          ))}
        </span>
        <span className="rate-tab-text">Rate your experience</span>
      </button>

      {prompt && (
        <div className="rate-prompt" role="dialog" aria-labelledby="rate-prompt-title">
          <button type="button" className="rate-prompt-x" onClick={() => setPrompt(false)} aria-label="Not now">
            <Icon name="x" size={14} />
          </button>
          <p id="rate-prompt-title" className="rate-prompt-title">
            Enjoying Turn2Opinion so far?
          </p>
          <div className="rate-prompt-faces">
            {MOODS.map((m, i) => (
              <button type="button" key={m.v} style={{ '--i': i }} onClick={() => openModal(m.v)} aria-label={`${m.v} of 5 – ${m.label}`}>
                <MoodFace m={m} active />
              </button>
            ))}
          </div>
          <button type="button" className="rate-prompt-later" onClick={() => setPrompt(false)}>
            Maybe later
          </button>
        </div>
      )}

      <ReviewModal open={modal} initialRating={rating} onClose={() => setModal(false)} onDone={done} />
    </>
  );
}
