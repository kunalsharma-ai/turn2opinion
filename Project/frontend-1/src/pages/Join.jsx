// Free sign-up for the three panels.
//
// Consumer / Business professional (the previous create-account process, Kunal 20 Nov 2026:
// details -> CAPTCHA -> email link -> password -> welcome questions -> T&C -> dashboard)
//   0 Your details       First (required), Middle, Last, email, mobile, date of birth, gender,
//                        country, state / province, city, postal code, consents, CAPTCHA
//                        -> PUT /api/v1/user -> account link by email
//   email link           ?user=…&code=… -> password + CAPTCHA (AccountSetup); login is by email
//                        -> welcome questions (components/onboarding/WelcomeQuestions.jsx), saved
//                           with PUT /api/v1/user/welcome while signed in
//                        -> the panel's Terms & Conditions form (/user/terms-b2c|b2b.html)
//                        -> the member dashboard (Project/frontend, unchanged)
//
// Teen (13–17): a 13–17 birthday on the Consumer or Professional form moves the visitor here
// (the API checks the age again).
//   0 You · 1 Parent or guardian · 2 Teen welcome questions · 3 Consent & send
//   -> the parent/guardian gets the onboarding and consent form (/parent-consent/)
//   -> after consent the teen gets a secure link back here (?user&code&activate=1) to choose a
//      password. No password is ever emailed.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, hrefFor } from '../router/Router.jsx';
import { ENV, asset } from '../config/env.js';
import PreviewLinks from '../components/PreviewLinks.jsx';
import { SITE } from '../config/site.js';
import { COUNTRIES } from '../data/countries.js';
import { api, failureMessage } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import Captcha, { captchaLocalOk, captchaPayload, captchaReady, isCaptchaError } from '../components/Captcha.jsx';
import { Flag } from '../components/Brand.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { ageOn, DateField, EMAIL_RE, Field, formatDate, PhoneField } from '../components/FormFields.jsx';
import SocialAuth from '../components/SocialAuth.jsx';
import FollowUs from '../components/FollowUs.jsx';
import ResendVerify from '../components/ResendVerify.jsx';
import { AuthAura, AuthVoice, saveAud } from '../components/AuthAura.jsx';
import { playAudience } from '../utils/sound.js';
import { relLabel, TeenConsentStep, TeenParentStep, TeenStatus, TEEN_CONSENTS } from '../components/TeenJoin.jsx';
import { readReferral, clearReferral } from '../utils/referral.js';
import { DASHBOARD, redirectIfLoggedIn } from '../utils/session.js';
import { fullPhone, NAME_RE, phoneError, validateParent } from '../utils/signup.js';
import LocationFields, { locationErrors } from '../components/onboarding/LocationFields.jsx';
import WelcomeQuestions, { answerLabel, loadBank, welcomePayload } from '../components/onboarding/WelcomeQuestions.jsx';
import AccountSetup from '../components/onboarding/AccountSetup.jsx';

const emailCheck = {
  validateDomain: async (v) => {
    try {
      const r = await api.post('/api/v1/validator/email', { email: v });
      return r?.valid === false ? false : true;
    } catch {
      return true; // a network failure must not block sign-up: the server checks again
    }
  },
  checkDuplicate: async (v) => {
    try {
      const { data } = await api.post('/api/v1/user/check', { mail: v });
      return !isNaN(data) && data <= 0;
    } catch {
      return true;
    }
  }
};

// The API decides the final panel from the date of birth; under-18s always become "minor".
const category = { consumer: 'b2c', pro: 'b2b', minor: 'minor' };
const GENDERS = ['Female', 'Male', 'Other'];
const GENDER_META = {
  Female: { c: '#FF4F8B', d: ['M12 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z', 'M12 13.5V21', 'M8.8 17.6h6.4'] },
  Male: { c: '#2F7BFF', d: ['M10 9.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z', 'M13.6 10.9 20 4.5', 'M15 4.5h5v5'] },
  Other: { c: '#8B5CF6', d: ['M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z', 'M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3'] }
};

/** Message from an API error, falling back to a friendly generic one. */
const errText = (res, fallback) => (res && typeof res.message === 'string' && res.message ? res.message : fallback || failureMessage({ data: res }));

// Only birthdays for ages 13 to 17 today can be picked on the Teen calendar.
function teenWindow(now = new Date()) {
  const max = new Date(now.getFullYear() - SITE.minAge, now.getMonth(), now.getDate());
  const min = new Date(now.getFullYear() - SITE.adultAge, now.getMonth(), now.getDate() + 1);
  return { min, max };
}
const isTeenAge = (a) => a !== null && a >= SITE.minAge && a < SITE.adultAge;

function GenderGlyph({ g, on }) {
  return (
    <svg viewBox="0 0 24 24" className={`gg ${on ? 'is-on' : ''}`} aria-hidden="true">
      {GENDER_META[g].d.map((d, i) => (
        <path key={i} d={d} pathLength="1" style={{ '--i': i }} />
      ))}
    </svg>
  );
}

export function GenderPicker({ id, value, onPick, label = 'Gender', error }) {
  return (
    <Field
      id={id}
      label={
        <span className="lbl-ico">
          <span className="gl-duo" aria-hidden="true">
            <i />
            <i />
          </span>{' '}
          {label}
        </span>
      }
      error={error}
    >
      <div className="gender-pick" role="radiogroup" aria-label={typeof label === 'string' ? label : 'Gender'} id={id}>
        {GENDERS.map((g, i) => (
          <button type="button" role="radio" aria-checked={value === g} key={g} className={`gp-opt ${value === g ? 'is-on' : ''}`} style={{ '--gc': GENDER_META[g].c, '--i': i }} onClick={() => onPick(g)}>
            <span className="gp-badge">
              <GenderGlyph g={g} on={value === g} />
            </span>
            <span className="gp-label">{g}</span>
          </button>
        ))}
      </div>
    </Field>
  );
}

/** Birthday cake with a flickering candle (label icon for date of birth). */
export function CakeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="cake-ico" aria-hidden="true">
      <path className="ck-flame" d="M16 3.2c1.8 2 2.2 3.4 1.2 4.8a1.6 1.6 0 0 1-2.4 0c-1-1.4-.6-2.8 1.2-4.8z" />
      <rect x="15" y="8.4" width="2" height="5" rx="1" className="ck-candle" />
      <rect x="6" y="13.5" width="20" height="7" rx="3" className="ck-top" />
      <path d="M6 17c2 1.6 3.4 1.6 5 0s3-1.6 5 0 3 1.6 5 0 3-1.6 5 0" className="ck-icing" />
      <rect x="4" y="20.5" width="24" height="8" rx="3" className="ck-base" />
    </svg>
  );
}

function birthdayInfo(dob) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob || '');
  if (!m) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), +m[2] - 1, +m[3]);
  if (next < today) next = new Date(now.getFullYear() + 1, +m[2] - 1, +m[3]);
  const days = Math.round((next - today) / 864e5);
  return { days, label: next.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) };
}

// SMS and WhatsApp start unticked: members opt in (feedback, 20 Nov 2026).
function MemberCard({ f, step }) {
  const card = useRef(null);
  const onMove = (e) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-y * 14}deg`);
    el.style.setProperty('--ry', `${x * 18}deg`);
  };
  const reset = () => {
    if (!card.current) return;
    card.current.style.setProperty('--rx', '0deg');
    card.current.style.setProperty('--ry', '0deg');
  };
  const name = [f.firstName, f.middleName, f.lastName].map((s) => s.trim()).filter(Boolean).join(' ');
  const c = COUNTRIES.find((x) => x.c === (f.country || f.dial));
  const teen = f.type === 'minor';
  const unlocks = teen
    ? [
        ['user', 'You & your parent', 'Your details and theirs'],
        ['sparkles', 'Welcome questions', 'So surveys fit you'],
        ['users', 'Parent consent', 'They get an onboarding form by email'],
        ['key', 'Your password', 'Link sent once they consent']
      ]
    : [
        ['user', 'Account', 'Free, no investment'],
        ['bell', 'Matched surveys', 'Invites that fit you'],
        ['gift', 'Rewards', 'PayPal, bank, wire, vouchers, gift cards · UPI in India']
      ];
  return (
    <div className="mcard-scene" onMouseMove={onMove} onMouseLeave={reset} aria-hidden="true">
      <div className={`mcard ${f.type === 'pro' ? 'is-pro' : teen ? 'is-minor' : ''}`} ref={card}>
        <div className="mcard-holo" />
        <div className="mcard-top">
          <span className="mcard-brand">Turn2Opinion</span>
          <span className="mcard-type">{f.type === 'pro' ? 'Professional' : teen ? 'Teen panel' : 'Consumer'} member</span>
        </div>
        <div className="mcard-chip" />
        <p className="mcard-name">{name || 'Your name here'}</p>
        <p className="mcard-sub">{f.email || 'you@example.com'}</p>
        <div className="mcard-foot">
          <span>{c ? <Flag code={c.c} size={14} /> : <Icon name="globe" size={14} />} {c ? c.n : 'Your country'}</span>
          <span>{f.dob ? `Born ${formatDate(f.dob)}` : 'Member since today'}</span>
        </div>
      </div>
      <img className="mcard-peep" src={asset(`/images/people/${f.type === 'pro' ? 'business' : teen ? 'gamer' : 'shopper'}.svg`)} alt="" width="160" height="190" key={f.type} />
      {['₹', '$', '€', '£'].map((cur, i) => (
        <span key={cur} className={`mc-coin k${i}`}>
          {cur}
        </span>
      ))}
      <ol className="unlocks">
        {unlocks.map(([ic, t, d], i) => (
          <li key={t} className={i < step ? 'is-open' : i === step ? 'is-now' : ''} style={{ '--i': i }}>
            <span className="ul-ico">
              <Icon name={i < step ? 'check' : i === step ? ic : 'lock'} size={18} />
            </span>
            <span>
              <strong>{t}</strong>
              <small>{d}</small>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Consent({ k, f, set, errOf, children }) {
  return (
    <div>
      <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
        <input type="checkbox" checked={!!f[k]} onChange={(e) => set(k, e.target.checked)} />
        <span className="check-ui" />
        <span>{children}</span>
      </label>
      {errOf(k) && (
        <p className="field-error" role="alert">
          {errOf(k)}
        </p>
      )}
    </div>
  );
}

function Done({ icon = 'mail', title, children }) {
  return (
    <section className="join-done">
      <div className="wrap join-done-inner">
        <div className="inbox-anim" aria-hidden="true">
          <span className="inbox-env">
            <Icon name={icon} size={56} />
          </span>
          <span className="inbox-spark s1" />
          <span className="inbox-spark s2" />
          <span className="inbox-spark s3" />
        </div>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

const TYPE_KEY = 't2o_join_type';
const DRAFT_KEY = 't2o_join_draft_v2';
// Adults fill in one page; the other stages happen after the email link and are shown for orientation.
const STEPS = ['Your details', 'Secure your account', 'Welcome questions'];
const STEP_ICONS = ['user', 'lock', 'sparkles'];
const TEEN_STEPS = ['You', 'Parent or guardian', 'Welcome questions', 'Consent & send'];
const TEEN_ICONS = ['user', 'users', 'sparkles', 'shield'];
const CHANNELS = [
  ['email', 'Email', 'mail'],
  ['sms', 'SMS', 'sms'],
  ['whatsapp', 'WhatsApp', 'whatsapp']
];
export const EMPTY_PARENT = { rel: '', first: '', middle: '', last: '', email: '', dial: '', phone: '', dob: '', gender: '' };

const initial = {
  type: 'consumer',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  dob: '',
  gender: '',
  dial: '',
  phone: '',
  country: '',
  state: '',
  city: '',
  zipcode: '',
  hasStates: false,
  parent: EMPTY_PARENT,
  parentConfirm: false,
  ...Object.fromEntries(TEEN_CONSENTS.map(([k]) => [k, false])),
  channels: { email: true, sms: false, whatsapp: false },
  terms: false,
  privacy: false,
  research: false,
  marketing: false
};

function dobError(dob, type) {
  const age = ageOn(dob);
  if (!dob) return 'Pick your full date of birth (day, month and year).';
  if (age === null || age < 0 || new Date(dob) > new Date()) return 'Date of birth can’t be in the future.';
  if (age < SITE.minAge) return `You must be at least ${SITE.minAge} years old to join Turn2Opinion.`;
  if (age > 100) return 'Check the year – that makes you over 100.';
  if (type === 'minor' && age >= SITE.adultAge) return 'The Teen panel is for ages 13 to 17. Pick Consumer or Business professional instead.';
  return '';
}

// Steps. Adults: 0 details (with consents and CAPTCHA). Teens: 0 you, 1 parent, 2 welcome, 3 consent.
function validate(step, f) {
  const e = {};
  const teen = f.type === 'minor';
  if (step === 0) {
    // Only the first name is required; middle and last are checked only when filled in.
    if (!f.firstName.trim()) e.firstName = 'Enter your first name.';
    else if (!NAME_RE.test(f.firstName.trim())) e.firstName = 'Use letters only for your first name.';
    if (f.middleName.trim() && !NAME_RE.test(f.middleName.trim())) e.middleName = 'Use letters only.';
    if (f.lastName.trim() && !NAME_RE.test(f.lastName.trim())) e.lastName = 'Use letters only.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    const de = dobError(f.dob, f.type);
    if (de) e.dob = de;
    if (!f.gender) e.gender = 'Select your gender.';
    if (!teen || f.phone.trim()) {
      const pe = phoneError(f.dial, f.phone);
      if (pe) e.phone = pe;
    }
    if (teen) Object.assign(e, locationErrors(f));
  }
  if (teen && step === 1) {
    Object.assign(e, validateParent(f.parent, f.email));
    if (!f.parentConfirm) e.parentConfirm = 'Please confirm these are your parent or guardian’s real details.';
  }
  if (!teen && step === 0) {
    if (!f.terms) e.terms = 'Please accept the Terms & Conditions to create your account.';
    if (!f.privacy) e.privacy = 'Please accept the Privacy Policy to create your account.';
    if (!f.research) e.research = 'Consent to take part in research is needed to receive surveys.';
  }
  if (teen && step === 3) {
    TEEN_CONSENTS.forEach(([k, , msg]) => {
      if (!f[k]) e[k] = msg;
    });
  }
  return e;
}

const readDraft = () => {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) || null;
  } catch {
    return null;
  }
};

/** Read-only summary of what will be sent (adult confirm step and Teen consent step). */
function ReviewCard({ f, answers, bank, journey, onEdit }) {
  const teen = journey === 'teen';
  const c = COUNTRIES.find((x) => x.c === f.country);
  const name = [f.firstName, f.middleName, f.lastName].map((s) => s.trim()).filter(Boolean).join(' ');
  const ctx = { country: f.country };
  const payload = bank ? welcomePayload(bank, journey, answers, ctx, {}) : {};
  const qs = bank ? bank.sections[journey].flatMap((s) => s.keys).filter((k) => k in payload) : [];
  return (
    <div className="review-card">
      <div className="rv-block">
        <p className="rv-head">
          <Icon name="user" size={16} /> Your details
          <button type="button" className="link-soft" onClick={() => onEdit(0)}>
            Edit
          </button>
        </p>
        <dl className="rv-dl">
          <dt>Name</dt>
          <dd>{name}</dd>
          <dt>Email</dt>
          <dd>{f.email}</dd>
          {f.phone && (
            <>
              <dt>Mobile</dt>
              <dd>
                +{fullPhone(f.dial, f.phone)}
              </dd>
            </>
          )}
          <dt>Born</dt>
          <dd>{formatDate(f.dob)}</dd>
          <dt>Gender</dt>
          <dd>{f.gender}</dd>
          <dt>Lives in</dt>
          <dd>
            {c && <Flag code={c.c} size={14} />} {[f.city, f.zipcode, c?.n].filter(Boolean).join(', ')}
          </dd>
        </dl>
      </div>
      {teen && f.parent.email && (
        <div className="rv-block">
          <p className="rv-head">
            <Icon name="users" size={16} /> Parent or guardian
            <button type="button" className="link-soft" onClick={() => onEdit(1)}>
              Edit
            </button>
          </p>
          <dl className="rv-dl">
            <dt>{relLabel(f.parent.rel)}</dt>
            <dd>{[f.parent.first, f.parent.middle, f.parent.last].filter((s) => s.trim()).join(' ')}</dd>
            <dt>Email</dt>
            <dd>{f.parent.email}</dd>
          </dl>
        </div>
      )}
      <div className="rv-block">
        <p className="rv-head">
          <Icon name="sparkles" size={16} /> Welcome answers · {qs.length}
          <button type="button" className="link-soft" onClick={() => onEdit(teen ? 2 : 1)}>
            Edit
          </button>
        </p>
        <ul className="rv-answers">
          {qs.slice(0, 40).map((k) => (
            <li key={k}>
              <span>{bank.Q[k][0]}</span>
              <b>{answerLabel(bank, journey, k, answers, ctx, {})}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Join() {
  const [f, setF] = useState(initial);
  const [answers, setAnswers] = useState({});
  const [bank, setBank] = useState(null);
  useEffect(() => saveAud(f.type), [f.type]);
  const [step, setStep] = useState(0);
  const [link, setLink] = useState(null); // { user, code, teen } from the email link
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [captchaErr, setCaptchaErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [ageNotice, setAgeNotice] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [welcomeFromEnd, setWelcomeFromEnd] = useState(false);
  const formRef = useRef(null);
  const restored = useRef(false);

  const teen = f.type === 'minor';
  const journey = teen ? 'teen' : f.type === 'pro' ? 'pro' : 'consumer';
  const welcomeStep = teen ? 2 : -1;
  const lastStep = teen ? 3 : 0;
  const age = ageOn(f.dob);
  const teenDates = useMemo(() => teenWindow(), []);
  const live = validate(step, f);
  const errOf = (k) => (touched[k] || submitted ? live[k] || (k === 'email' ? emailErr : '') || '' : '');
  const okOf = (k) => touched[k] && !live[k] && !(k === 'email' && emailErr);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setParent = (k, v) => setF((p) => ({ ...p, parent: { ...p.parent, [k]: v } }));
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const onCaptcha = useCallback((t) => {
    setCaptcha(t);
    if (t) setCaptchaErr('');
  }, []);

  useEffect(() => {
    loadBank().then(setBank).catch(() => {});
  }, []);

  // Keep the unfinished form for this tab, so a refresh or Back never loses it.
  useEffect(() => {
    if (!restored.current || link || ['done', 'teen-submitted'].includes(state)) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ f, answers, step }));
    } catch {
      /* ignore */
    }
  }, [f, answers, step, link, state]);

  // ---------- panel choice + age-based classification ----------
  const chooseType = (v) => {
    const a = ageOn(f.dob);
    if (v !== 'minor' && isTeenAge(a)) {
      setAgeNotice(`You’re ${a}, so you join the Teen panel. Teen accounts need a parent or guardian’s consent, and you can’t switch to an adult panel until you turn 18.`);
      return;
    }
    setAgeNotice('');
    if (f.type !== v) {
      playAudience(v);
      setAnswers({});
    }
    setF((p) => ({ ...p, type: v, dob: v === 'minor' && a !== null && a >= SITE.adultAge ? '' : p.dob }));
  };
  const onDob = (v) => {
    const a = ageOn(v);
    setTouched((t) => ({ ...t, dob: true }));
    if (f.type !== 'minor' && isTeenAge(a)) {
      setF((p) => ({ ...p, dob: v, type: 'minor' }));
      setAnswers({});
      setAgeNotice(`You’re ${a}, so we’ve moved you to the Teen panel. Everything you typed is kept. Next, we’ll ask for your parent or legal guardian, who must give consent before your account switches on.`);
      playAudience('minor');
      return;
    }
    set('dob', v);
  };

  // ---------- URL entry points ----------
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const path = window.location.pathname + window.location.hash;
    let type = null;
    if (/\/join\/professional\/?/.test(path) || q.get('category') === 'professional') type = 'pro';
    if (/\/join\/teen\/?/.test(path) || q.get('category') === 'minor' || q.get('category') === 'teen') type = 'minor';
    const d = !q.get('user') ? readDraft() : null;
    if (d && d.f) {
      setF({ ...initial, ...d.f, parent: { ...EMPTY_PARENT, ...(d.f.parent || {}) }, ...(type && type !== d.f.type && !isTeenAge(ageOn(d.f.dob)) ? { type } : {}) });
      setAnswers(d.answers || {});
      setStep(d.f.type === 'minor' ? Math.min(d.step || 0, 2) : 0);
    } else if (type) setF((p) => ({ ...p, type }));
    const parts = (q.get('name') || '').trim().split(/\s+/).filter(Boolean);
    const email = q.get('email');
    if (parts.length || email)
      setF((p) => ({ ...p, firstName: parts[0] ?? p.firstName, lastName: parts.length > 1 ? parts.slice(1).join(' ') : p.lastName, email: email ?? p.email }));
    restored.current = true;
    if (!q.get('user')) redirectIfLoggedIn();
  }, []);

  // Email link: ?user=<id>&code=<code>[&activate=1 for a Teen after parent consent] -> account setup
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const user = q.get('user');
    const code = q.get('code');
    if (!(user && code)) return;
    setState('checking');
    (async () => {
      try {
        const resp = await api.post(`/api/v1/user/${user}`, { channel: 'email', code });
        if (resp?.status !== 'success') return setState('link-used');
        const u = resp.data || {};
        const isTeenAccount = u.category === 'minor' || isTeenAge(ageOn(String(u.dob || '').slice(0, 10)));
        setF((p) => ({
          ...p,
          firstName: u.name?.first ?? p.firstName,
          middleName: u.name?.middle ?? p.middleName,
          lastName: u.name?.last ?? p.lastName,
          email: u.mail ?? p.email,
          dob: u.dob ? String(u.dob).slice(0, 10) : p.dob,
          gender: u.gender ?? p.gender,
          type: isTeenAccount ? 'minor' : u.category === 'b2b' ? 'pro' : 'consumer',
          parent: u.parent ? { ...p.parent, email: u.parent.email || '', first: u.parent.name?.first || '' } : p.parent
        }));
        if (isTeenAccount) {
          const approved = u.parent?.consent === true || u.parent?.consentStatus === 'approved';
          if (u.parent?.email && !approved) return setState('teen-waiting');
        }
        setLink({ user, code, teen: isTeenAccount, category: u.category });
        setState('idle');
      } catch {
        setState('link-used');
      }
    })();
  }, []);

  useEffect(() => {
    track('sign_up_start');
    (async () => {
      try {
        const info = await api.get('/api/v1/get-country');
        const country = info?.country;
        if (country)
          setF((p) => ({ ...p, country: p.country || country, dial: p.dial || country, parent: { ...p.parent, dial: p.parent.dial || country } }));
      } catch {
        /* the member picks it */
      }
    })();
  }, []);

  const focusFirstError = (e) => {
    const k = Object.keys(e)[0];
    if (!k || !formRef.current) return;
    setTimeout(() => {
      const box = formRef.current.querySelector(`[data-k="${k}"]`);
      box?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const el = box?.querySelector('input, button, textarea, select');
      el && el.focus({ preventScroll: true });
    }, 30);
  };
  const resetCaptcha = () => {
    setCaptcha(null);
    setResetKey((k) => k + 1);
  };
  const captchaOk = () => {
    if (!captchaReady(captcha)) {
      setCaptchaErr('Type the code from the picture (or answer the question) to show you’re human.');
      return false;
    }
    if (captcha.provider === 'local' && !captchaLocalOk(captcha)) {
      setCaptchaErr('That code didn’t match. Here’s a new one.');
      resetCaptcha();
      return false;
    }
    return true;
  };

  const checkEmail = async ({ submit = false } = {}) => {
    const v = f.email.trim().toLowerCase();
    if (!EMAIL_RE.test(v)) return true;
    if (!(await emailCheck.validateDomain(v))) {
      setEmailErr('This email domain looks invalid or can’t receive mail.');
      return false;
    }
    if (!(await emailCheck.checkDuplicate(v))) {
      if (submit) {
        setDuplicate(true);
        setMsg('This email is already registered.');
      } else setEmailErr('This email is already registered. Log in instead, or use a different email.');
      return false;
    }
    setEmailErr('');
    return true;
  };

  const goStep = (n) => {
    setSubmitted(false);
    setTouched({});
    setStep(n);
    setTimeout(() => formRef.current?.closest('.join-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
  };

  // Steps before the questionnaire: checks only, nothing is sent yet.
  const next = async () => {
    const v = validate(step, f);
    setSubmitted(true);
    if (Object.keys(v).length) return focusFirstError(v);
    if (step === 0) {
      setState('sending');
      const ok = await checkEmail({ submit: true });
      setState('idle');
      if (!ok) return;
    }
    setWelcomeFromEnd(false);
    goStep(step + 1);
  };

  // ---------- last step: send everything, then the email goes out ----------
  const submitAll = async () => {
    const v = validate(lastStep, f);
    setSubmitted(true);
    const capOk = captchaOk();
    if (Object.keys(v).length || !capOk) return focusFirstError(v);
    for (const s of teen ? [0, 1] : [0]) {
      if (Object.keys(validate(s, f)).length) return goStep(s);
    }
    if (isTeenAge(age) && !teen) return onDob(f.dob);
    setState('sending');
    setMsg('');
    const ctx = { country: f.country };
    const b = teen ? bank || (await loadBank()) : null;
    const welcome = {
      ...(teen ? welcomePayload(b, journey, answers, ctx, {}) : {}),
      country: f.country,
      ...(f.state ? { state: f.state } : {}),
      city: f.city.trim(),
      ...(f.zipcode.trim() ? { zipcode: f.zipcode.trim() } : {}),
      'communication-methods': Object.keys(f.channels)
        .filter((k) => f.channels[k] && !(teen && k !== 'email'))
        .concat('dashboard')
    };
    const ref = readReferral();
    const p = f.parent;
    const body = {
      category: category[f.type],
      name: {
        salutation: f.gender === 'Male' ? 'Mr.' : f.gender === 'Female' ? 'Ms.' : 'Mx.',
        first: f.firstName.trim(),
        middle: f.middleName.trim(),
        last: f.lastName.trim()
      },
      mail: f.email.trim().toLowerCase(),
      ...(f.phone.trim() ? { phone: fullPhone(f.dial, f.phone) } : {}),
      dob: f.dob,
      gender: f.gender,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...(teen ? { address: [{ tag: 'Home', country: f.country.toLowerCase(), state: f.state || undefined, city: f.city.trim(), zipcode: f.zipcode.trim() || undefined }] } : {}),
      terms: teen ? ['privacy-policy', 'video-concent'] : ['privacy-policy', f.research && 'video-concent', f.marketing && 'newsletter'].filter(Boolean),
      ...(teen ? { welcome } : {}),
      ...(teen
        ? {
            parent: {
              relation: p.rel,
              name: { first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim() },
              email: p.email.trim().toLowerCase(),
              phone: fullPhone(p.dial, p.phone),
              dob: p.dob,
              ...(p.rel === 'guardian' ? { gender: p.gender } : {})
            }
          }
        : {}),
      ...(ref ? { referredBy: ref } : {}),
      captcha: captchaPayload(captcha)
    };
    try {
      const res = await api.put('/api/v1/user', body);
      if (res?.status === 'success') {
        try {
          localStorage.setItem(TYPE_KEY, f.type);
          sessionStorage.removeItem(DRAFT_KEY);
        } catch {
          /* ignore */
        }
        clearReferral();
        setState(teen ? 'teen-submitted' : 'done');
        track('sign_up_submitted', { category: f.type, welcome_answers: Object.keys(welcome).length });
        window.scrollTo({ top: 0 });
        return;
      }
      const m = errText(res, 'We couldn’t send your details. Please try again.');
      resetCaptcha();
      if (isCaptchaError(m)) {
        setCaptchaErr(m);
        setState('idle');
        return;
      }
      if (/duplicate|already/i.test(m)) {
        setDuplicate(true);
        setMsg('This email is already registered.');
        setState('idle');
        return;
      }
      setState('error');
      setMsg(m);
    } catch {
      resetCaptcha();
      setState('error');
      setMsg('Unable to send your details. Please try again.');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (step === lastStep) return submitAll();
    return next();
  };

  // ================= result screens =================
  if (state === 'done')
    return (
      <Done title={`Check your inbox, ${f.firstName.trim()}!`}>
        <p>
          Your details are saved. We’ve sent an account link to <strong>{f.email}</strong>. Open it to create your password. You’ll log in with this email address.
        </p>
        <ol className="done-next">
          <li className="is-done">
            <Icon name="check" size={14} strokeWidth={3} /> Your details and CAPTCHA
          </li>
          <li className="is-now">
            <Icon name="mail" size={14} /> Open the email link
          </li>
          <li>
            <Icon name="key" size={14} /> Create your password
          </li>
          <li>
            <Icon name="sparkles" size={14} /> A few welcome questions
          </li>
          <li>
            <Icon name="clipboard" size={14} /> {f.type === 'pro' ? 'Professional' : 'Consumer'} panel Terms &amp; Conditions
          </li>
          <li>
            <Icon name="dashboard" size={14} /> Your dashboard
          </li>
        </ol>
        <p className="muted">The link works for 24 hours. If you can’t see the email, check your spam or promotions folder.</p>
        <ResendVerify email={f.email} compact />
        <PreviewLinks links={[['Open the account link', '?user=demo-adult&code=000000', '/join/']]} />
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </Done>
    );
  if (state === 'teen-submitted')
    return (
      <Done icon="users" title="Request sent to your parent or guardian">
        <p>
          Your details and welcome answers are saved. We have sent a <strong>Parent/Guardian Onboarding Form</strong> to <strong>{f.parent.email}</strong>, and a note to you at <strong>{f.email}</strong>. Please ask them to check
          their inbox (and spam folder) and complete the onboarding and consent form.
        </p>
        <p className="muted">Your Teen account stays switched off until they consent. Then we email you a secure link to create your password.</p>
        <TeenStatus stage="parent-verification-pending" parentEmail={f.parent.email} />
        <PreviewLinks links={[['Open the parent’s onboarding form', '?user=demo-teen&code=000000', '/parent-consent/']]} />
        <Link to="/earn/teens/" className="btn btn-primary">
          How the Teen panel works
        </Link>
      </Done>
    );
  if (state === 'teen-waiting')
    return (
      <Done icon="clock" title="Waiting for your parent or guardian">
        <p>Your parent or guardian hasn’t completed the consent form yet, so this account can’t be activated. We’ll email you as soon as they do.</p>
        <TeenStatus stage="parent-verification-pending" parentEmail={f.parent.email} />
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </Done>
    );
  if (state === 'teen-active')
    return (
      <Done icon="check" title="Your Teen account is active 🎉">
        <p>Your parent or guardian has consented and your password is set. You log in with your email address. You can change your password any time in your account settings.</p>
        <TeenStatus stage="account-active" />
        <a href={DASHBOARD} className="btn btn-primary">
          Go to my dashboard <Icon name="arrow" size={18} />
        </a>
      </Done>
    );
  if (state === 'to-terms')
    return (
      <Done icon="clipboard" title="Account created. One last step">
        <p>Read and accept your panel agreement (Terms &amp; Conditions, privacy notice and consent). Then your dashboard opens.</p>
        <a href={termsUrl(link?.category, f.type)} className="btn btn-primary">
          Open the Terms &amp; Conditions <Icon name="arrow" size={18} />
        </a>
      </Done>
    );
  if (state === 'checking')
    return (
      <Done icon="refresh" title="Checking your link…">
        <p>One moment.</p>
      </Done>
    );
  if (state === 'link-used')
    return (
      <Done icon="clock" title="This link is no longer valid">
        <p>It has already been used or it has expired. If you already created your account, log in. Otherwise ask for a new email below.</p>
        <ResendVerify email={f.email} compact />
        <Link to="/login/" className="btn btn-primary">
          Log in
        </Link>
      </Done>
    );
  if (duplicate)
    return (
      <ResendVerify email={f.email} title="Email already registered" message={msg}>
        <Link to="/login/" className="btn-outline">
          Log in
        </Link>
        <button
          type="button"
          className="link-soft"
          onClick={() => {
            setDuplicate(false);
            setState('idle');
            setMsg('');
            setEmailErr('');
          }}
        >
          Use a different email
        </button>
      </ResendVerify>
    );

  const aud = f.type === 'pro' || teen ? f.type : 'consumer';

  // ================= adults: welcome questions after the password =================
  const saveWelcomeAnswers = async () => {
    setState('welcome-saving');
    setMsg('');
    try {
      const b = bank || (await loadBank());
      const country = (f.country || f.dial || '').toLowerCase();
      if (country) await api.put(`/api/v1/user/${link.user}`, { address: [{ tag: 'Home', country }] });
      const welcome = {
        ...welcomePayload(b, journey, answers, { country: f.country }, {}),
        'communication-methods': Object.keys(f.channels)
          .filter((k) => f.channels[k])
          .concat('dashboard')
      };
      const res = await api.put('/api/v1/user/welcome', { welcome });
      if (res?.status !== 'success') {
        setState('welcome');
        setMsg(errText(res, 'We couldn’t save your answers. Please try again.'));
        return;
      }
      track('sign_up_welcome_complete', { category: f.type, answers: Object.keys(welcome).length });
      setState('to-terms');
      setTimeout(() => window.location.assign(termsUrl(link?.category, f.type)), ENV.DEMO_MODE ? 2500 : 900);
    } catch {
      setState('welcome');
      setMsg('Unable to save your answers. Please try again.');
    }
  };
  if (link && (state === 'welcome' || state === 'welcome-saving'))
    return (
      <section className={`join theme-${aud} at-step-welcome`}>
        <div className="join-bg" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <AuthAura aud={aud} />
        <div className="wrap join-grid">
          <div className="join-side">
            <Breadcrumbs items={[{ label: 'Welcome questions' }]} />
            <h1>Your account is ready. A few welcome questions</h1>
            <p className="join-lead">These answers decide which surveys reach you. They take a few minutes, and you can update them later from your dashboard. Next comes your panel agreement.</p>
            <MemberCard f={f} step={2} />
          </div>
          <div className="join-card">
            <span className="join-card-ring" aria-hidden="true" />
            <div className="join-step" ref={formRef}>
              <WelcomeQuestions journey={journey} ans={answers} setAnswers={setAnswers} ctx={{ country: f.country }} onDone={saveWelcomeAnswers} doneLabel="Save and continue to the agreement" />
              {state === 'welcome-saving' && (
                <p className="join-progress-note" role="status">
                  <span className="btn-spin" aria-hidden="true" /> Saving your answers…
                </p>
              )}
              {msg && (
                <p className="form-alert" role="alert">
                  {msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );

  // ================= account setup from the email link =================
  if (link)
    return (
      <section className={`join theme-${aud} is-setup`}>
        <div className="join-bg" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <AuthAura aud={aud} />
        <div className="wrap join-grid">
          <div className="join-side">
            <Breadcrumbs items={[{ label: 'Create your account' }]} />
            <h1>{link.teen ? 'Switch on your Teen account' : 'Create your account'}</h1>
            <p className="join-lead">{link.teen ? 'Your parent or guardian said yes. Create a password you’ll remember.' : 'Your email is confirmed. Create your password, then answer a few welcome questions.'}</p>
            <MemberCard f={f} step={2} />
          </div>
          <div className="join-card">
            <span className="join-card-ring" aria-hidden="true" />
            {link.teen && <TeenStatus stage="account-activation-pending" />}
            <AccountSetup
              user={link.user}
              code={link.code}
              firstName={f.firstName}
              lastName={f.lastName}
              email={f.email}
              teen={link.teen}
              onLinkUsed={() => setState('link-used')}
              onTeenWaiting={() => setState('teen-waiting')}
              onDone={() => {
                window.history.replaceState(null, '', window.location.pathname + window.location.hash);
                track('sign_up_account_created', { category: f.type });
                if (link.teen) return setState('teen-active');
                setAnswers({});
                setState('welcome');
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        </div>
      </section>
    );

  // ================= forms =================
  const steps = teen ? TEEN_STEPS : STEPS;
  const icons = teen ? TEEN_ICONS : STEP_ICONS;
  const alert = state === 'error' && msg && (
    <p className="form-alert" role="alert">
      {msg}
    </p>
  );
  const consents = (
    <div className="consents">
      <Consent k="terms" f={f} set={set} errOf={errOf}>
        I have read and accept the{' '}
        <a href={hrefFor('/terms/')} target="_blank" rel="noopener">
          Terms &amp; Conditions
        </a>
        .
      </Consent>
      <Consent k="privacy" f={f} set={set} errOf={errOf}>
        I have read and accept the{' '}
        <a href={hrefFor('/privacy/')} target="_blank" rel="noopener">
          Privacy Policy
        </a>
        , including how my data is used for research.
      </Consent>
      <Consent k="research" f={f} set={set} errOf={errOf}>
        I agree to take part in surveys and other market research activities.
      </Consent>
      <label className="check">
        <input type="checkbox" checked={f.marketing} onChange={(e) => set('marketing', e.target.checked)} />
        <span className="check-ui" />
        <span>Send me tips, reward news and the occasional newsletter.</span>
      </label>
    </div>
  );
  const captchaBox = (
    <>
      <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
      {captchaErr && (
        <p className="field-error" role="alert">
          {captchaErr}
        </p>
      )}
    </>
  );

  return (
    <section className={`join theme-${aud} at-step-${step === welcomeStep ? 'welcome' : step}`}>
      <div className="join-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <AuthAura aud={aud} />
      <div className="wrap join-grid">
        <div className="join-side">
          <Breadcrumbs items={[{ label: 'Join free' }]} />
          <h1>{teen ? 'Join the Teen panel' : 'Create your free account'}</h1>
          <p className="join-tag" key={`tag-${teen ? 'm' : 'x'}`}>
            {(teen ? 'Your voice. Your parent’s OK. Then you’re in.' : 'Two minutes now. Rewards for every survey after.').split(' ').map((w, i) => (
              <span key={i} style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="join-lead">
            {teen
              ? 'For ages 13 to 17. You fill in your details, your parent or guardian’s and a few welcome questions. They get an onboarding and consent form by email, and your account switches on only after they consent.'
              : 'No fees, no investment – just honest answers. Unlock each step below as you go.'}
          </p>
          <MemberCard f={f} step={teen ? Math.min(step, 3) : Math.min(step, 2)} />
          <AuthVoice aud={aud} />
        </div>

        <div className="join-card">
          <span className="join-card-ring" aria-hidden="true" />
          <ol className="stepper" aria-label="Sign-up progress">
            {steps.map((s, i) => (
              <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
                <span className="stepper-dot">{i < step ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name={icons[i]} size={15} />}</span>
                <span className="stepper-label">{s}</span>
              </li>
            ))}
            <span className="stepper-bar" style={{ '--p': step / (steps.length - 1) }} aria-hidden="true" />
          </ol>
          <p className="join-progress-note">
            {teen ? `Step ${step + 1} of ${steps.length} · nothing is sent until the last step` : 'Step 1 of 3 · the next steps start from the link we email you'}
          </p>

          {step === welcomeStep ? (
            <div className="join-step" ref={formRef}>
              <WelcomeQuestions
                key={`${journey}-${welcomeFromEnd}`}
                journey={journey}
                ans={answers}
                setAnswers={setAnswers}
                ctx={{ country: f.country }}
                startAtEnd={welcomeFromEnd}
                onBack={() => goStep(step - 1)}
                onDone={() => goStep(step + 1)}
              />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate key={`${step}-${teen}`} className="join-step">
              {step === 0 && (
                <>
                  <div className="type-toggle is-three" role="radiogroup" aria-label="I am joining as">
                    {[
                      ['consumer', 'Consumer', 'users', 'Everyday opinions on products & life'],
                      ['pro', 'Business professional', 'briefcase', 'Also get B2B & workplace studies'],
                      ['minor', 'Teen · 13–17', 'sparkles', 'With a parent or guardian’s consent']
                    ].map(([v, l, ic, d]) => (
                      <button type="button" role="radio" aria-checked={f.type === v} key={v} className={`type-opt to-${v} ${f.type === v ? 'is-on' : ''}`} onClick={() => chooseType(v)}>
                        <span className="to-ico">
                          <Icon name={ic} size={22} />
                        </span>
                        <strong>{l}</strong>
                        <span className="to-sub">{d}</span>
                        <span className="to-tick" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={3} />
                        </span>
                        <span className="to-spark" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                      </button>
                    ))}
                  </div>
                  {ageNotice && (
                    <p className="age-notice" role="status">
                      <Icon name="users" size={18} />
                      <span>{ageNotice}</span>
                    </p>
                  )}
                  {teen && !ageNotice && (
                    <p className="minor-join-note">
                      <span className="mjn-keys" aria-hidden="true">
                        <i>🛡️</i>
                      </span>
                      <span>
                        <strong>Parent or guardian consent is required.</strong> First your details, then theirs, then a few welcome questions. They receive an onboarding form by email and your account switches on only after they
                        consent. <a href={hrefFor('/earn/teens/')}>How the Teen panel works</a>
                      </span>
                    </p>
                  )}
                  {teen ? (
                    <>
                  <fieldset className="jf-group">
                    <legend>
                      <Icon name="id" size={15} /> Your name
                    </legend>
                    <div className="form-grid three name-row">
                      <div data-k="firstName">
                        <Field id="j-first" label="First name" error={errOf('firstName')} valid={okOf('firstName')}>
                          <input id="j-first" className="input" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={touch('firstName')} autoComplete="given-name" maxLength={49} aria-required="true" aria-invalid={!!errOf('firstName')} />
                        </Field>
                      </div>
                      <div data-k="middleName">
                        <Field id="j-middle" label="Middle name" error={errOf('middleName')} valid={okOf('middleName') && !!f.middleName.trim()}>
                          <input id="j-middle" className="input" value={f.middleName} onChange={(e) => set('middleName', e.target.value)} onBlur={touch('middleName')} autoComplete="additional-name" maxLength={49} />
                        </Field>
                      </div>
                      <div data-k="lastName">
                        <Field id="j-last" label="Last name" error={errOf('lastName')} valid={okOf('lastName') && !!f.lastName.trim()}>
                          <input id="j-last" className="input" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={touch('lastName')} autoComplete="family-name" maxLength={49} />
                        </Field>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="jf-group">
                    <legend>
                      <Icon name="mail" size={15} /> Contact
                    </legend>
                    <div data-k="email">
                      <Field id="j-email" label="Email address" error={errOf('email')} valid={okOf('email')} hint={teen ? 'Your own email. Your account link comes here after your parent consents.' : 'Your account link comes here after the welcome questions.'}>
                        <input
                          id="j-email"
                          className="input"
                          type="email"
                          value={f.email}
                          onChange={(e) => {
                            set('email', e.target.value);
                            setEmailErr('');
                          }}
                          onBlur={() => {
                            touch('email')();
                            checkEmail();
                          }}
                          autoComplete="email"
                          maxLength={120}
                          aria-invalid={!!errOf('email')}
                        />
                      </Field>
                    </div>
                    <div data-k="phone">
                      <Field id="j-phone" label="Mobile number" error={errOf('phone')} valid={okOf('phone') && !!f.phone} hint={teen ? 'If you have your own phone. Used only for account security.' : 'With your country code. Used for account security and, if you choose, survey alerts.'}>
                        <PhoneField id="j-phone" country={f.dial} number={f.phone} onCountry={(c) => set('dial', c)} onNumber={(v) => set('phone', v)} onBlur={touch('phone')} invalid={!!errOf('phone')} />
                      </Field>
                    </div>
                  </fieldset>
                  <fieldset className="jf-group">
                    <legend>
                      <Icon name="cake" size={15} /> Birthday &amp; gender
                    </legend>
                    <div data-k="dob">
                      <Field
                        id="j-dob"
                        label={
                          <span className="lbl-ico">
                            <CakeIcon /> Date of birth
                          </span>
                        }
                        error={errOf('dob')}
                        valid={!!f.dob && !live.dob}
                        hint={teen ? 'Teen panel: only birthdays for ages 13 to 17 can be picked.' : 'Full date: day, month and year. It places you in the right panel and can’t be changed later.'}
                      >
                        {teen ? (
                          <DateField key="dob-teen" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} minDate={teenDates.min} maxDate={teenDates.max} lockedYears={4} foot="Ages 13–17 only. Greyed-out years and days can’t be picked." />
                        ) : (
                          <DateField key="dob-all" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} />
                        )}
                      </Field>
                      {f.dob && !live.dob && birthdayInfo(f.dob) && (
                        <p className="bday-chip" key={f.dob}>
                          <strong>Age {age}</strong>
                          <span>{birthdayInfo(f.dob).days === 0 ? 'Happy birthday today! 🎉' : `Next birthday: ${birthdayInfo(f.dob).label} · in ${birthdayInfo(f.dob).days} days`}</span>
                        </p>
                      )}
                    </div>
                    <div data-k="gender">
                      <GenderPicker
                        id="j-gender"
                        value={f.gender}
                        error={errOf('gender')}
                        onPick={(g) => {
                          set('gender', g);
                          setTouched((t) => ({ ...t, gender: true }));
                        }}
                      />
                    </div>
                  </fieldset>
                  <fieldset className="jf-group">
                    <legend>
                      <Icon name="pin" size={15} /> Where you live
                    </legend>
                    <LocationFields loc={f} set={set} errOf={errOf} touch={touch} idp="j-loc" />
                  </fieldset>
                    </>
                  ) : (
                    // Consumers and professionals: the previous create-account form, unchanged (Kunal, 20 Nov 2026).
                    <>
                <div className={`form-grid ${teen ? 'two' : 'three'}`}>
                  <div data-k="firstName">
                    <Field id="j-first" label="First name" error={errOf('firstName')} valid={okOf('firstName')}>
                      <input id="j-first" className="input" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={touch('firstName')} autoComplete="given-name" maxLength={49} aria-invalid={!!errOf('firstName')} />
                    </Field>
                  </div>
                  {!teen && (
                    <div data-k="middleName">
                      <Field id="j-middle" label="Middle name" optional error={errOf('middleName')}>
                        <input id="j-middle" className="input" value={f.middleName} onChange={(e) => set('middleName', e.target.value)} onBlur={touch('middleName')} autoComplete="additional-name" maxLength={49} />
                      </Field>
                    </div>
                  )}
                  <div data-k="lastName">
                    <Field id="j-last" label="Last name" optional error={errOf('lastName')} valid={okOf('lastName') && !!f.lastName.trim()}>
                      <input id="j-last" className="input" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={touch('lastName')} autoComplete="family-name" maxLength={49} />
                    </Field>
                  </div>
                </div>
                <div data-k="email">
                  <Field id="j-email" label="Email address" error={errOf('email')} valid={okOf('email')} hint={teen ? 'Your own email. Your password link comes here after your parent consents.' : 'We’ll send a verification link here.'}>
                    <input
                      id="j-email"
                      className="input"
                      type="email"
                      value={f.email}
                      onChange={(e) => {
                        set('email', e.target.value);
                        setEmailErr('');
                      }}
                      onBlur={() => {
                        touch('email')();
                        checkEmail();
                      }}
                      autoComplete="email"
                      maxLength={120}
                      aria-invalid={!!errOf('email')}
                    />
                  </Field>
                </div>
                {!teen && (
                  <div data-k="phone">
                    <Field id="j-phone" label="Mobile number" error={errOf('phone')} valid={okOf('phone')} hint="With your country code. Used for account security and, if you choose, survey alerts.">
                      <PhoneField id="j-phone" country={f.dial} number={f.phone} onCountry={(c) => set('dial', c)} onNumber={(v) => set('phone', v)} onBlur={touch('phone')} invalid={!!errOf('phone')} />
                    </Field>
                  </div>
                )}
                <div data-k="dob">
                  <Field
                    id="j-dob"
                    label={
                      <span className="lbl-ico">
                        <CakeIcon /> Date of birth
                      </span>
                    }
                    error={errOf('dob')}
                    valid={!!f.dob && !live.dob}
                    hint={teen ? 'Teen panel: only birthdays for ages 13 to 17 can be picked.' : 'Full date: day, month and year. We use it to place you in the right panel; it can’t be changed later.'}
                  >
                    {teen ? (
                      <DateField key="dob-teen" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} minDate={teenDates.min} maxDate={teenDates.max} lockedYears={4} foot="Ages 13–17 only. Greyed-out years and days can’t be picked." />
                    ) : (
                      <DateField key="dob-all" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} />
                    )}
                  </Field>
                  {f.dob && !live.dob && birthdayInfo(f.dob) && (
                    <p className="bday-chip" key={f.dob}>
                      <span className="bc-confetti" aria-hidden="true">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <i key={i} style={{ '--i': i }} />
                        ))}
                      </span>
                      <strong>Age {age}</strong>
                      <span>{birthdayInfo(f.dob).days === 0 ? 'Happy birthday today! 🎉' : `Next birthday: ${birthdayInfo(f.dob).label} · in ${birthdayInfo(f.dob).days} days`}</span>
                    </p>
                  )}
                </div>
                <div data-k="gender">
                  <GenderPicker
                    id="j-gender"
                    value={f.gender}
                    error={errOf('gender')}
                    onPick={(g) => {
                      set('gender', g);
                      setTouched((t) => ({ ...t, gender: true }));
                    }}
                  />
                </div>
                {!teen && (
                  <>
                    {consents}
                    <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
                    {captchaErr && (
                      <p className="field-error" role="alert">
                        {captchaErr}
                      </p>
                    )}
                  </>
                )}
                    </>
                  )}
                  {alert}
                </>
              )}

              {teen && step === 1 && <TeenParentStep f={f} setParent={setParent} set={set} errOf={errOf} okOf={okOf} setTouched={setTouched} />}

              {teen && step === lastStep && (
                <>
                  <p className="join-step-lead">Check everything once. When you press the button we save it and send the {teen ? 'onboarding form to your parent or guardian' : 'account link to your email'}.</p>
                  <ReviewCard
                    f={f}
                    answers={answers}
                    bank={bank}
                    journey={journey}
                    onEdit={(s) => {
                      setWelcomeFromEnd(s === welcomeStep);
                      goStep(s);
                    }}
                  />
                  <TeenConsentStep f={f} set={set} errOf={errOf} />
                  {captchaBox}
                  {alert}
                </>
              )}

              <div className="join-actions">
                {step > 0 && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-lg"
                    onClick={() => {
                      setWelcomeFromEnd(step - 1 === welcomeStep);
                      goStep(step - 1);
                    }}
                  >
                    <Icon name="arrowLeft" size={18} /> Back
                  </button>
                )}
                <button type="submit" className="btn btn-primary btn-lg btn-shimmer" disabled={state === 'sending'}>
                  {state === 'sending' ? (
                    <>
                      <span className="btn-spin" aria-hidden="true" /> Please wait…
                    </>
                  ) : step === lastStep ? (
                    <>
                      {teen ? 'Send to my parent or guardian' : 'Create my account'} <Icon name="send" size={18} />
                    </>
                  ) : (
                    <>
                      {step === welcomeStep - 1 ? 'Continue to welcome questions' : 'Continue'} <Icon name="arrow" size={18} />
                    </>
                  )}
                </button>
              </div>

              {step === 0 && !teen && <SocialAuth />}
              <p className="join-alt">
                Already a member? <Link to="/login/">Log in</Link>
              </p>
              {step === 0 && <FollowUs />}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/** The panel agreement pages (existing Consumer and Professional T&C forms, served at /user/). */
export function termsUrl(cat, type) {
  const c = cat === 'b2b' || (!cat && type === 'pro') ? 'b2b' : 'b2c';
  return ENV.DEMO_MODE ? hrefFor('/terms/') : `/user/terms-${c}.html`;
}
