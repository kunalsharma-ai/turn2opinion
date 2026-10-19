// "Opinion Gems" review studio — the rating and review experience (v3.2 rebuild).
//
// Flow (four short steps, each in its own colour world):
//   1  WHICH WORLD   consumer or business professional — two animated 3D scene cards
//   2  YOUR GEM      overall rating on the Gem Forge + four facet meters + highlight chips
//   3  YOUR WORDS    the review, with tap-to-insert sentence starters and a live preview of the
//                    exact card it will become (airmail postcard or conference pass)
//   4  ABOUT YOU     must-haves: first name, email, country (with flag)
//                    nice-to-add: last name, designation, company, phone (country, code and flag)
//   →  DELIVERED     the card "lands" on the wall, with the gem and the flag
//
// The v3.1 "How charged is your opinion?" Pulse Core dial animation was removed in v3.2 at the
// owner's request (it did not behave reliably); the Gem Forge replaces it.
//
// Prompt rules (never on arrival, and never once someone has reviewed):
//   * the first ask needs 50 s on the site AND 35 % scroll depth;
//   * it can come back up to 3 times in a session, at least 4 minutes apart, each time after more
//     scrolling, so it never feels like the same popup nagging;
//   * "Not now" costs a full interval; the × closes it for the session;
//   * at most 3 sessions ever, at least 2 days apart.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { session, store } from '../utils/storage.js';
import { submitReview } from '../utils/reviews.js';
import { track } from '../utils/analytics.js';
import { failureMessage } from '../utils/api.js';
import { playSuccess, playTick } from '../utils/sound.js';
import { AUDIENCES, audienceOf, HIGHLIGHTS, LEVELS, levelOf, STARTERS } from '../data/reviewFacets.js';
import { COUNTRIES } from '../data/countries.js';
import Captcha from './Captcha.jsx';
import Icon from './Icon.jsx';
import { Flag } from './Brand.jsx';
import { CountryPicker, Field, PhoneField, EMAIL_RE } from './FormFields.jsx';
import GemForge from './rating/GemForge.jsx';
import FacetDials from './rating/FacetDials.jsx';
import Gem from './rating/Gem.jsx';
import VoiceCard from './rating/VoiceCard.jsx';
import { Link } from '../router/Router.jsx';

const KEY = 't2o_review_prompt_v1';
const SESSION_SHOWN = 't2o_review_prompt_session';
const blankFacets = () => ({ worth: 0, rewards: 0, support: 0, device: 0 });
const blankForm = () => ({ name: '', lastName: '', email: '', phoneCc: '', phone: '', country: '', company: '', role: '', text: '' });
const STEPS = [
  ['Your world', 'users'],
  ['Your gem', 'sparkles'],
  ['Your words', 'pen'],
  ['About you', 'id']
];

/* ------------------------------------------------------------------ step 1 scene cards */
function WorldCard({ a, on, onPick }) {
  const ref = useRef(null);
  const tilt = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`);
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };
  const consumer = a.key === 'consumer';
  return (
    <button
      ref={ref}
      type="button"
      className={`world w-${a.key} ${on ? 'is-on' : ''}`}
      style={{ '--w1': a.c1, '--w2': a.c2, '--w3': a.c3 }}
      aria-pressed={on}
      onPointerMove={tilt}
      onPointerLeave={reset}
      onClick={onPick}
    >
      <span className="world-scene" aria-hidden="true">
        <span className="ws-sun" />
        {consumer ? (
          <>
            <span className="ws-phone">
              <i className="ws-notch" />
              <i className="ws-bar b1" />
              <i className="ws-bar b2" />
              <i className="ws-coin" />
            </span>
            {['bag', 'cup', 'heart', 'gift', 'game', 'plane'].map((ic, i) => (
              <span key={ic} className="ws-float" style={{ '--i': i }}>
                <Icon name={ic} size={18} />
              </span>
            ))}
          </>
        ) : (
          <>
            <span className="ws-laptop">
              <span className="ws-screen">
                {[0.45, 0.7, 0.55, 0.9, 0.75].map((h, i) => (
                  <i key={i} style={{ '--h': h, '--i': i }} />
                ))}
                <svg viewBox="0 0 100 40" className="ws-line">
                  <path d="M2 34 L22 26 L40 30 L60 14 L80 18 L98 4" />
                </svg>
              </span>
              <span className="ws-base" />
            </span>
            {['briefcase', 'chip', 'pulse', 'bank', 'target', 'globe'].map((ic, i) => (
              <span key={ic} className="ws-float" style={{ '--i': i }}>
                <Icon name={ic} size={18} />
              </span>
            ))}
          </>
        )}
      </span>
      <span className="world-copy">
        <span className="world-tag">
          <Icon name={a.icon} size={14} /> I’m a {consumer ? 'consumer' : 'professional'}
        </span>
        <strong>{a.label}</strong>
        <small>{a.pitch}</small>
      </span>
      <span className="world-go" aria-hidden="true">
        {on ? <Icon name="check" size={18} strokeWidth={3} /> : <Icon name="arrow" size={18} />}
      </span>
    </button>
  );
}

/* ================================================================================
   The studio (modal)
   ================================================================================ */
function OpinionStudio({ open, initialRating, onClose, onDone }) {
  const [step, setStep] = useState(1);
  const [aud, setAud] = useState('');
  const [v, setV] = useState(initialRating || 4);
  const [facets, setFacets] = useState(blankFacets);
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [agree, setAgree] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [posted, setPosted] = useState(null);
  const dialog = useRef(null);
  const body = useRef(null);
  const textRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const world = audienceOf(aud);
  const L = levelOf(v);

  useEffect(() => {
    if (!open) return undefined;
    setStep(1);
    setAud('');
    setV(initialRating || 4);
    setFacets(blankFacets());
    setTags([]);
    setForm(blankForm());
    setAgree(false);
    setState('idle');
    setErrors({});
    setMsg('');
    setPosted(null);
    const id = setTimeout(() => dialog.current && dialog.current.focus(), 40);
    const esc = (e) => e.key === 'Escape' && closeRef.current();
    window.addEventListener('keydown', esc);
    document.documentElement.classList.add('modal-open');
    return () => {
      clearTimeout(id);
      window.removeEventListener('keydown', esc);
      document.documentElement.classList.remove('modal-open');
    };
  }, [open, initialRating]);

  // Each step starts at the top of the dialog (matters on phones, where the dialog scrolls).
  useEffect(() => {
    if (body.current) body.current.scrollTop = 0;
  }, [step, state]);

  const setRating = useCallback((n) => {
    setV((old) => {
      if (Math.round(old) !== n) playTick(n);
      return n;
    });
  }, []);

  if (!open) return null;

  const rating = Math.round(v);
  const clearErr = (k) => errors[k] && setErrors((x) => ({ ...x, [k]: undefined }));
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    clearErr(k);
  };
  const toggleTag = (t) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : cur.length < 4 ? [...cur, t] : cur));
  const setFacet = (k, n) => setFacets((f) => ({ ...f, [k]: n }));
  const insertStarter = (s) => {
    setForm((f) => ({ ...f, text: (f.text.trim() ? `${f.text.trim()} ` : '') + s.replace('…', ' ') }));
    clearErr('text');
    // Move focus to the box straight away (so a following key press types, rather than re-pressing
    // the starter button), then put the caret at the end once React has written the new text.
    const el = textRef.current;
    if (el) {
      el.focus();
      requestAnimationFrame(() => el.setSelectionRange(el.value.length, el.value.length));
    }
  };

  const validateWords = () => {
    const e = {};
    if (form.text.trim().length < 20) e.text = 'Tell us a little more – at least 20 characters.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter your first name (at least 2 letters).';
    else if (!/^[\p{L} .'-]+$/u.test(form.name.trim())) e.name = 'Use letters only.';
    if (form.lastName.trim() && !/^[\p{L} .'-]+$/u.test(form.lastName.trim())) e.lastName = 'Use letters only.';
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!form.country) e.country = 'Pick your country so we can show your flag.';
    const digits = form.phone.replace(/\D/g, '');
    if (digits && (digits.length < 6 || digits.length > 14)) e.phone = 'Enter 6–14 digits, without the country code.';
    else if (digits && !form.phoneCc) e.phone = 'Pick the country dial code.';
    if (form.text.trim().length < 20) e.text = 'Tell us a little more – at least 20 characters.';
    if (!agree) e.agree = 'Tick the box so we can publish your review.';
    if (!captcha) e.captcha = 'Complete the human check.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const send = async (ev) => {
    ev.preventDefault();
    if (step < 4) return;
    if (!validate()) {
      setTimeout(() => dialog.current?.querySelector('.has-error input, .has-error textarea, .field-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 30);
      return;
    }
    setState('sending');
    const digits = form.phone.replace(/\D/g, '');
    const res = await submitReview({
      name: form.name,
      country: form.country,
      company: form.company,
      role: form.role,
      audience: aud,
      text: form.text,
      rating,
      facets,
      tags,
      captchaToken: captcha && captcha.token,
      captchaProvider: captcha && captcha.provider,
      // Private contact details: sent to the backend for verification only, never published.
      contact: { lastName: form.lastName.trim(), email: form.email.trim(), phoneCountry: digits ? form.phoneCc : '', phone: digits }
    });
    track('review_submit', { rating, audience: aud });
    if (!res.ok) setMsg(failureMessage(res));
    else if (res.data && res.data.message) setMsg(res.data.message);
    setPosted(res.review);
    setState('done');
    playSuccess();
    onDone();
    setResetKey((k) => k + 1);
  };

  const chips = rating >= 4 ? HIGHLIGHTS.up : rating === 3 ? [...HIGHLIGHTS.up.slice(0, 4), ...HIGHLIGHTS.down.slice(0, 2)] : HIGHLIGHTS.down;
  const countryName = (COUNTRIES.find((c) => c.c === form.country) || {}).n || '';
  const draft = {
    id: 'draft',
    name: form.name.trim() || 'Your name',
    role: form.role.trim(),
    company: form.company.trim(),
    country: form.country,
    audience: aud || 'consumer',
    rating,
    facets,
    tags,
    text: form.text.trim() || (aud === 'professional' ? 'Your words will appear here, on your own conference pass…' : 'Your words will appear here, on your own airmail postcard…'),
    date: new Date().toISOString()
  };

  const styleVars = { '--a1': world.c1, '--a2': world.c2, '--a3': world.c3, '--aink': world.ink, '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--glow': L.glow };
  const goto = (n) => setStep(n);

  return (
    <div className="gs-scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`gstudio aud-${aud || 'none'} lv-${L.key} step-${step} ${state === 'done' ? 'is-done' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-title"
        tabIndex={-1}
        ref={dialog}
        style={styleVars}
      >
        <span className="gs-aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button type="button" className="gs-x" onClick={onClose} aria-label="Close">
          <Icon name="x" size={18} />
        </button>

        <div className="gs-body" ref={body}>
          {state === 'done' ? (
            /* ---------------- Delivered ---------------- */
            <div className="gs-done">
              <div className="gd-burst" aria-hidden="true">
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} style={{ '--i': i }} />
                ))}
              </div>
              <div className="gd-gem">
                <Gem level={rating} size={110} motion="spin" />
              </div>
              <p className="gd-kicker">
                <Icon name="check" size={14} strokeWidth={3} /> Delivered to the wall
              </p>
              <h2 id="studio-title">Thank you, {form.name.trim().split(' ')[0] || 'friend'}!</h2>
              <p className="gd-text">
                Your {L.gem.toLowerCase()} — <strong>{rating}/5 · {L.word}</strong> — has landed in <strong>Member voices</strong>
                {countryName ? (
                  <>
                    {' '}
                    under the <Flag code={form.country} size={16} /> <strong>{countryName}</strong> flag
                  </>
                ) : null}
                . You can see it there right now.
              </p>
              {msg && <p className="gd-note">{msg}</p>}
              <div className="gd-card">{posted && <VoiceCard r={{ ...posted, mine: true }} size="md" fresh />}</div>
              <div className="gd-actions">
                <Link to="/about/reviews/" className="btn btn-primary btn-shimmer" onClick={onClose}>
                  See all ratings &amp; reviews <Icon name="arrow" size={16} />
                </Link>
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                  Back to the site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={send} noValidate className="gs-form">
              {/* ---------------- Progress ---------------- */}
              <ol className="gs-rail" aria-label="Progress">
                {STEPS.map(([s, ic], i) => {
                  const n = i + 1;
                  const can = n < step || (n === 2 && aud) || (n === 3 && aud && step >= 2) || (n === 4 && step >= 3);
                  return (
                    <li key={s} className={step === n ? 'is-on' : step > n ? 'is-done' : ''}>
                      <button type="button" disabled={!can || n === step} onClick={() => goto(n)} aria-current={step === n ? 'step' : undefined}>
                        <span className="gr-dot" aria-hidden="true">
                          {step > n ? <Icon name="check" size={13} strokeWidth={3} /> : <Icon name={ic} size={13} />}
                        </span>
                        <span className="gr-label">{s}</span>
                      </button>
                    </li>
                  );
                })}
                <span className="gr-fill" style={{ '--p': (step - 1) / 3 }} aria-hidden="true" />
              </ol>

              {/* ================= STEP 1 — which world ================= */}
              {step === 1 && (
                <div className="gs-pane gp-who" key="s1">
                  <p className="gs-eyebrow">
                    <Gem level={5} size={20} motion="float" /> Opinion Gems · 2 minutes
                  </p>
                  <h2 id="studio-title">
                    First things first — <span>which world are you from?</span>
                  </h2>
                  <p className="gs-sub">Consumers and business professionals see different sides of Turn2Opinion, so their reviews live in two different colour worlds.</p>
                  <div className="worlds">
                    {Object.values(AUDIENCES).map((a) => (
                      <WorldCard
                        key={a.key}
                        a={a}
                        on={aud === a.key}
                        onPick={() => {
                          setAud(a.key);
                          playTick(a.key === 'consumer' ? 2 : 4);
                          setTimeout(() => setStep(2), 380);
                        }}
                      />
                    ))}
                  </div>
                  <p className="gs-foot-note">
                    <Icon name="lock" size={14} /> Your email and phone are only used to verify the review. They are never published.
                  </p>
                </div>
              )}

              {/* ================= STEP 2 — the gem ================= */}
              {step === 2 && (
                <div className="gs-pane gp-rate" key="s2">
                  <h2 id="studio-title">
                    What is your experience worth? <span>Pick a gem.</span>
                  </h2>
                  <p className="gs-sub">From a plain pebble to a brilliant diamond — tap a gem or slide along the rail.</p>

                  <GemForge value={v} onChange={setRating} idPrefix="studio" />

                  <div className="gs-block">
                    <p className="gs-q">
                      Rate the details <small>Optional — skip any you have not used</small>
                    </p>
                    <FacetDials values={facets} onChange={setFacet} idPrefix="studio-f" />
                  </div>

                  <div className="gs-block">
                    <p className="gs-q">
                      {rating >= 4 ? 'What made it shine?' : rating === 3 ? 'What works, what does not?' : 'What should we polish first?'}
                      <small>Pick up to 4</small>
                    </p>
                    <div className="gs-chips">
                      {chips.map((c, i) => (
                        <button type="button" key={c} style={{ '--i': i }} aria-pressed={tags.includes(c)} className={tags.includes(c) ? 'is-on' : ''} onClick={() => toggleTag(c)}>
                          {tags.includes(c) ? <Icon name="check" size={13} strokeWidth={3} /> : <Icon name="plus" size={13} />} {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="gs-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                      <Icon name="arrowLeft" size={18} /> Back
                    </button>
                    <button type="button" className="btn btn-primary btn-shimmer" onClick={() => setStep(3)}>
                      Next: your words <Icon name="arrow" size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3 — words + live preview ================= */}
              {step === 3 && (
                <div className="gs-pane gp-words" key="s3">
                  <h2 id="studio-title">
                    Tell other {world.key === 'professional' ? 'professionals' : 'members'} <span>what it is really like</span>
                  </h2>
                  <div className="gs-recap">
                    <Gem level={rating} size={30} motion="float" />
                    <b>{rating}/5</b>
                    <span>{L.word}</span>
                    <span className="gsr-aud">
                      <Icon name={world.icon} size={13} /> {world.label}
                    </span>
                    <button type="button" onClick={() => setStep(2)}>
                      Change
                    </button>
                  </div>

                  <div className="gs-split">
                    <div className="gs-write">
                      <div className="gs-starters" aria-label="Sentence starters">
                        {(STARTERS[world.key] || STARTERS.consumer).map((s) => (
                          <button key={s} type="button" onClick={() => insertStarter(s)}>
                            <Icon name="sparkles" size={12} /> {s}
                          </button>
                        ))}
                      </div>
                      <Field id="rv-text" label="Your review" error={errors.text} hint={`${form.text.length}/600 — what you liked, what could be better`}>
                        <textarea
                          id="rv-text"
                          ref={textRef}
                          className="input"
                          rows={6}
                          value={form.text}
                          onChange={set('text')}
                          maxLength={600}
                          placeholder={
                            world.key === 'professional'
                              ? 'e.g. The B2B surveys actually match my role, and the incentive lands on PayPal within two weeks…'
                              : 'e.g. I answer a couple of surveys on the bus each week and the gift card arrived exactly when they said…'
                          }
                        />
                      </Field>
                      <span className="gs-meter" style={{ '--p': Math.min(1, form.text.trim().length / 120) }} aria-hidden="true">
                        <i />
                        <small>{form.text.trim().length < 20 ? `${20 - form.text.trim().length} more characters to go` : form.text.trim().length < 120 ? 'Good — a little more detail helps others' : 'Perfect length'}</small>
                      </span>
                    </div>
                    <div className="gs-preview" aria-label="Preview of your review">
                      <p className="gs-prev-label">
                        <Icon name="eye" size={13} /> Live preview — this is how it appears
                      </p>
                      <VoiceCard r={draft} size="sm" />
                    </div>
                  </div>

                  <div className="gs-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                      <Icon name="arrowLeft" size={18} /> Back
                    </button>
                    <button type="button" className="btn btn-primary btn-shimmer" onClick={() => validateWords() && setStep(4)}>
                      Next: about you <Icon name="arrow" size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 4 — identity ================= */}
              {step === 4 && (
                <div className="gs-pane gp-you" key="s4">
                  <h2 id="studio-title">
                    Who should we credit? <span>Sign your {world.key === 'professional' ? 'pass' : 'postcard'}.</span>
                  </h2>

                  <div className="gs-split">
                    <div className="gs-fields">
                      <fieldset className="gs-set set-must">
                        <legend>
                          <span className="gss-badge">Required</span> The must-haves
                        </legend>
                        <div className="form-grid two">
                          <Field id="rv-name" label="First name" error={errors.name}>
                            <input id="rv-name" className="input" value={form.name} onChange={set('name')} maxLength={60} autoComplete="given-name" />
                          </Field>
                          <Field id="rv-email" label="Email ID" error={errors.email} hint="Never published — only to verify you">
                            <input id="rv-email" className="input" type="email" inputMode="email" value={form.email} onChange={set('email')} maxLength={120} autoComplete="email" />
                          </Field>
                          <Field id="rv-country" label="Country" error={errors.country} className="field-wide">
                            <CountryPicker
                              id="rv-country"
                              value={form.country}
                              invalid={!!errors.country}
                              onChange={(c) => {
                                setForm((f) => ({ ...f, country: c, phoneCc: f.phoneCc || c }));
                                clearErr('country');
                              }}
                            />
                          </Field>
                        </div>
                        <div className={`gs-flagstage ${form.country ? 'has-flag' : ''}`} aria-live="polite">
                          {form.country ? (
                            <>
                              <span className="gfs-pole" aria-hidden="true" />
                              <span className="gfs-flag" key={form.country}>
                                <Flag code={form.country} size={64} title={countryName} />
                              </span>
                              <span className="gfs-copy">
                                <strong>{countryName}</strong>
                                <small>Your review will fly this flag</small>
                              </span>
                            </>
                          ) : (
                            <span className="gfs-empty">
                              <Icon name="globe" size={18} /> Pick your country and your flag goes up here
                            </span>
                          )}
                        </div>
                      </fieldset>

                      <fieldset className="gs-set set-opt">
                        <legend>
                          <span className="gss-badge is-opt">Optional</span> Nice to add
                        </legend>
                        <div className="form-grid two">
                          <Field id="rv-last" label="Last name" optional error={errors.lastName}>
                            <input id="rv-last" className="input" value={form.lastName} onChange={set('lastName')} maxLength={60} autoComplete="family-name" />
                          </Field>
                          <Field id="rv-role" label="Designation" optional>
                            <input id="rv-role" className="input" value={form.role} onChange={set('role')} maxLength={80} autoComplete="organization-title" placeholder={world.askRole} />
                          </Field>
                          <Field id="rv-company" label="Company name" optional>
                            <input id="rv-company" className="input" value={form.company} onChange={set('company')} maxLength={80} autoComplete="organization" placeholder={world.askName} />
                          </Field>
                          <Field id="rv-phone" label="Phone number" optional error={errors.phone} hint="Country, dial code and flag — kept private">
                            <PhoneField
                              id="rv-phone"
                              country={form.phoneCc}
                              number={form.phone}
                              onCountry={(c) => setForm((f) => ({ ...f, phoneCc: c }))}
                              onNumber={(n) => {
                                setForm((f) => ({ ...f, phone: n }));
                                clearErr('phone');
                              }}
                              invalid={!!errors.phone}
                            />
                          </Field>
                        </div>
                      </fieldset>

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
                        <span>Publish my review with my first name, designation, company and country flag. My email, last name and phone stay private.</span>
                      </label>
                      {errors.agree && <p className="field-error">{errors.agree}</p>}

                      <Captcha onChange={setCaptcha} resetKey={resetKey} error={errors.captcha} />
                      {errors.captcha && <p className="field-error">{errors.captcha}</p>}
                      {errors.text && (
                        <p className="field-error">
                          {errors.text}{' '}
                          <button type="button" className="link-arrow" onClick={() => setStep(3)}>
                            Edit your words
                          </button>
                        </p>
                      )}
                    </div>

                    <div className="gs-preview" aria-label="Preview of your review">
                      <p className="gs-prev-label">
                        <Icon name="eye" size={13} /> Live preview
                      </p>
                      <VoiceCard r={draft} size="sm" />
                    </div>
                  </div>

                  <div className="gs-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(3)}>
                      <Icon name="arrowLeft" size={18} /> Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-shimmer" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Delivering…' : 'Post my review'} <Icon name="send" size={16} />
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

/* ================================================================================
   The launcher: side tab + the delayed, well-behaved ask
   ================================================================================ */
export default function ReviewWidget({ ready }) {
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [prompt, setPrompt] = useState(false);
  const started = useRef(Date.now());
  const shownThisSession = useRef(session.get(SESSION_SHOWN, 0));

  const openModal = useCallback((r = 0) => {
    setRating(r);
    setPrompt(false);
    setModal(true);
    track('review_open', { rating: r });
  }, []);

  useEffect(() => {
    const h = (e) => openModal((e && e.detail && e.detail.rating) || 0);
    window.addEventListener('t2o:open-review', h);
    return () => window.removeEventListener('t2o:open-review', h);
  }, [openModal]);

  // Tell the notification stream an ask is on screen (on phones only one of them may show).
  useEffect(() => {
    document.documentElement.classList.toggle('ask-open', prompt);
    return () => document.documentElement.classList.remove('ask-open');
  }, [prompt]);

  // --- the delayed, repeating ask ---------------------------------------------------------
  useEffect(() => {
    if (!ready) return undefined;
    const st = store.get(KEY, { count: 0, last: 0, submitted: false });
    if (st.submitted || st.count >= 3 || Date.now() - st.last < 2 * 864e5) return undefined;

    let maxDepth = 0;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) maxDepth = Math.max(maxDepth, window.scrollY / h);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Each successive ask needs more time on the site AND more of the page read.
    const GATES = [
      { afterMs: 50000, depth: 0.35 },
      { afterMs: 290000, depth: 0.6 },
      { afterMs: 650000, depth: 0.8 }
    ];

    const iv = setInterval(() => {
      const n = shownThisSession.current;
      const gate = GATES[n];
      if (!gate) {
        clearInterval(iv);
        return;
      }
      const cls = document.documentElement.classList;
      if (document.hidden || cls.contains('modal-open') || cls.contains('nav-open')) return;
      if (Date.now() - started.current < gate.afterMs || maxDepth < gate.depth) return;

      shownThisSession.current = n + 1;
      session.set(SESSION_SHOWN, shownThisSession.current);
      setPrompt(true);
      store.set(KEY, { ...st, count: st.count + 1, last: Date.now() });
      if (shownThisSession.current >= GATES.length) clearInterval(iv);
    }, 4000);

    return () => {
      clearInterval(iv);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ready]);

  const done = () => {
    const st = store.get(KEY, { count: 0, last: 0 });
    store.set(KEY, { ...st, submitted: true });
    setPrompt(false);
  };

  const dismissForever = () => {
    setPrompt(false);
    session.set(SESSION_SHOWN, 9);
    shownThisSession.current = 9;
  };

  const askLevels = useMemo(() => LEVELS, []);
  const closeModal = useCallback(() => setModal(false), []);

  return (
    <>
      <button type="button" className="rate-tab" onClick={() => openModal(0)} aria-label="Rate us — rate your experience">
        <span className="rate-tab-gem" aria-hidden="true">
          <Gem level={5} size={22} motion="float" />
        </span>
        <span className="rate-tab-text">Rate us</span>
      </button>

      {prompt && (
        <div className="gask" role="dialog" aria-labelledby="ask-title">
          <span className="gask-aurora" aria-hidden="true" />
          <button type="button" className="gask-x" onClick={dismissForever} aria-label="Don't ask again this visit">
            <Icon name="x" size={14} />
          </button>
          <p className="gask-kicker">
            <i className="gask-live" /> 20-second favour
          </p>
          <p id="ask-title" className="gask-title">
            If Turn2Opinion were a gem, which one would it be?
          </p>
          <div className="gask-gems">
            {askLevels.map((L, i) => (
              <button key={L.key} type="button" style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--i': i }} onClick={() => openModal(L.v)} aria-label={`${L.v} of 5 — ${L.word}`}>
                <Gem level={L.v} size={34} motion="still" />
                <small>{L.word}</small>
              </button>
            ))}
          </div>
          <button type="button" className="gask-later" onClick={() => setPrompt(false)}>
            Not now
          </button>
        </div>
      )}

      <OpinionStudio open={modal} initialRating={rating} onClose={closeModal} onDone={done} />
    </>
  );
}
