// Free sign-up for the three panels (restored and extended 20 Nov 2026, Kunal's brief):
//
// Consumer / Business professional
//   0 Your details   First*, Middle, Last, Email*, Mobile*, Date of birth*, Gender*, Terms*, Privacy*,
//                    research consent*, newsletter (optional), CAPTCHA -> PUT /api/v1/user
//                    -> the verification email goes out (existing "register/respondent" template)
//   1 Secure it      (from the email link) password -> PATCH /api/v1/user (logs the member in)
//   2 Your profile   invitation channels; professionals also give employment, industry,
//                    specialization, department, job title, company and work email
//
// Teen (13–17): ages are worked out from the date of birth, so a 13–17 birthday on the Consumer or
// Professional form moves the visitor here (and the API does the same check on the server).
//   0 You            First*, Last, Email*, Date of birth*, Gender*
//   1 Parent         Mother / Father / Legal guardian, their names, email, phone, date of birth
//                    (gender for a legal guardian only)
//   2 Consent        consent request + legal links + CAPTCHA -> PUT /api/v1/user (category "minor")
//                    -> the parent/guardian gets the onboarding form (/parent-consent/)
//   activation       after the parent consents, the teen gets a one-time link back here
//                    (?user=…&code=…&activate=1) to create a password.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { COUNTRIES } from '../data/countries.js';
import { api, failureMessage } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import Captcha, { captchaLocalOk, captchaPayload, captchaReady, isCaptchaError } from '../components/Captcha.jsx';
import { Flag } from '../components/Brand.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { ageOn, DateField, EMAIL_RE, Field, formatDate, FREE_MAIL, passwordStrength, PhoneField } from '../components/FormFields.jsx';
import SocialAuth from '../components/SocialAuth.jsx';
import FollowUs from '../components/FollowUs.jsx';
import ResendVerify from '../components/ResendVerify.jsx';
import { AuthAura, AuthVoice, saveAud } from '../components/AuthAura.jsx';
import { playAudience } from '../utils/sound.js';
import { TeenConsentStep, TeenParentStep, TeenStatus, TEEN_CONSENTS } from '../components/TeenJoin.jsx';
import { readReferral, clearReferral } from '../utils/referral.js';
import { redirectIfLoggedIn } from '../utils/session.js';
import { fullPhone, NAME_RE, phoneError, validateParent } from '../utils/signup.js';

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
const STEPS = ['Your details', 'Secure your account', 'Contact & profile'];
const STEP_ICONS = ['user', 'lock', 'phone'];
const TEEN_STEPS = ['You', 'Parent or guardian', 'Consent'];
const TEEN_ICONS = ['user', 'users', 'shield'];
const TYPE_KEY = 't2o_join_type';
const PENDING_JOIN_KEY = 't2o_pending_registration';
const RESUME_KEY = 't2o_resume_signup';
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
const CHANNELS = [
  ['email', 'Email', 'mail'],
  ['sms', 'SMS', 'sms'],
  ['whatsapp', 'WhatsApp', 'whatsapp']
];
const PW_RULES = [
  ['8+ characters', (p) => p.length >= 8],
  ['Upper & lower case', (p) => /[a-z]/.test(p) && /[A-Z]/.test(p)],
  ['A number', (p) => /\d/.test(p)],
  ['A symbol', (p) => /[^A-Za-z0-9]/.test(p)]
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
  country: '',
  dial: '',
  phone: '',
  jobTitle: '',
  empstat: '',
  industry: '',
  sector: '',
  department: '',
  company: '',
  workEmail: '',
  parent: EMPTY_PARENT,
  parentConfirm: false,
  ...Object.fromEntries(TEEN_CONSENTS.map(([k]) => [k, false])),
  channels: { email: true, sms: false, whatsapp: false },
  password: '',
  confirm: '',
  terms: false,
  privacy: false,
  research: false,
  marketing: false
};

const WORK_LEVELS = [
  { key: 'empstat', name: 'empstat', label: 'Employment status', api: '/api/v1/option/empstat', parent: null, method: 'get' },
  { key: 'industry', name: 'industry', label: 'Industry', api: '/api/v1/option/industry', parent: 'empstat', method: 'post' },
  { key: 'sector', name: 'sector', label: 'Specialization', api: '/api/v1/option/sector', parent: 'industry', method: 'post' },
  { key: 'department', name: 'department', label: 'Department', api: '/api/v1/option/department', parent: 'sector', method: 'post' },
  { key: 'jobTitle', name: 'jobrole', label: 'Job title', api: '/api/v1/option/jobrole', parent: 'department', method: 'post' }
];
// The dropdown value and the saved answer are both the label (stored answers are matched to the
// next level's options through parentValue = label).
const normOpt = (o) => {
  const label = typeof o === 'string' ? o : (o.label ?? o.name ?? o.value);
  return { value: label, label };
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

// Step numbers: adults 0 details, 1 password, 2 profile. Teens 0 you, 1 parent, 2 consent, and
// 'activate' (password) after the parent has consented.
function validate(step, f, { teenActivate = false } = {}) {
  const e = {};
  const teen = f.type === 'minor';
  if (teenActivate || (!teen && step === 1)) {
    if (PW_RULES.some(([, fn]) => !fn(f.password))) e.password = 'Your password needs all four ingredients below.';
    else if (f.firstName.trim().length > 2 && f.password.toLowerCase().includes(f.firstName.trim().toLowerCase())) e.password = 'Don’t include your name in your password.';
    if (!f.confirm) e.confirm = 'Type your password again.';
    else if (f.confirm !== f.password) e.confirm = 'Passwords don’t match.';
    return e;
  }
  if (step === 0) {
    if (!NAME_RE.test(f.firstName.trim())) e.firstName = 'Enter your first name using letters only.';
    if (!teen && f.middleName.trim() && !NAME_RE.test(f.middleName.trim())) e.middleName = 'Use letters only, or leave it empty.';
    if (f.lastName.trim() && !NAME_RE.test(f.lastName.trim())) e.lastName = 'Use letters only, or leave it empty.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    const de = dobError(f.dob, f.type);
    if (de) e.dob = de;
    if (!f.gender) e.gender = 'Select your gender.';
    if (!teen) {
      const pe = phoneError(f.dial, f.phone);
      if (pe) e.phone = pe;
      if (!f.terms) e.terms = 'Please accept the Terms & Conditions to create your account.';
      if (!f.privacy) e.privacy = 'Please accept the Privacy Policy to create your account.';
      if (!f.research) e.research = 'Consent to take part in research is needed to receive surveys.';
    }
  }
  if (teen && step === 1) {
    Object.assign(e, validateParent(f.parent, f.email));
    if (!f.parentConfirm) e.parentConfirm = 'Please confirm these are your parent or guardian’s real details.';
  }
  if (teen && step === 2) {
    TEEN_CONSENTS.forEach(([k, , msg]) => {
      if (!f[k]) e[k] = msg;
    });
  }
  if (!teen && step === 2 && f.type === 'pro') {
    // Levels whose options could not be loaded are not required, so a missing list never blocks sign-up.
    WORK_LEVELS.forEach((l) => {
      if (!f[l.key] && f.__workAvailable?.[l.key] !== false) e[l.key] = `Select your ${l.label.toLowerCase()}.`;
    });
    if (f.workEmail && !EMAIL_RE.test(f.workEmail.trim())) e.workEmail = 'Enter a valid work email or leave it empty.';
    else if (f.workEmail && FREE_MAIL.includes(f.workEmail.split('@')[1]?.toLowerCase())) e.workEmail = 'Use your company email domain (not Gmail, Yahoo, etc.).';
  }
  return e;
}

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
  const name = [f.firstName, f.type === 'minor' ? '' : f.middleName, f.lastName].map((s) => s.trim()).filter(Boolean).join(' ');
  const c = COUNTRIES.find((x) => x.c === (f.dial || f.country));
  const teen = f.type === 'minor';
  const unlocks = teen
    ? [
        ['user', 'Your request', 'Your details and your parent’s'],
        ['users', 'Parent consent', 'They get an onboarding form by email'],
        ['key', 'Your password', 'Sent to you once they consent']
      ]
    : [
        ['user', 'Account', 'Free, no investment'],
        ['bell', 'Matched surveys', 'Invites that fit you'],
        ['gift', 'Rewards', 'PayPal, bank, wire, vouchers, gift cards · cash and UPI in India']
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
        <p className="mcard-sub">{f.type === 'pro' && f.jobTitle ? f.jobTitle : f.email || 'you@example.com'}</p>
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

export default function Join() {
  const [f, setF] = useState(initial);
  useEffect(() => saveAud(f.type), [f.type]);
  const [step, setStep] = useState(0);
  const [teenActivate, setTeenActivate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [captchaErr, setCaptchaErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [ageNotice, setAgeNotice] = useState('');
  const formRef = useRef(null);
  const [queryParams, setQueryParams] = useState({});
  const [workOpts, setWorkOpts] = useState({});
  const [workLoading, setWorkLoading] = useState({});
  const [duplicate, setDuplicate] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  // After the password is set: session + saved consents (safe to retry).
  const session = useRef({ loggedIn: false });

  const teen = f.type === 'minor';
  const age = ageOn(f.dob);
  const teenDates = useMemo(() => teenWindow(), []);
  const live = validate(step, f, { teenActivate });
  const errOf = (k) => (touched[k] || submitted ? live[k] || (k === 'email' ? emailErr : '') || '' : '');
  const okOf = (k) => touched[k] && !live[k] && !(k === 'email' && emailErr);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setParent = (k, v) => setF((p) => ({ ...p, parent: { ...p.parent, [k]: v } }));
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const onCaptcha = useCallback((t) => {
    setCaptcha(t);
    if (t) setCaptchaErr('');
  }, []);

  // ---------- panel choice + age-based classification ----------
  const chooseType = (v) => {
    const a = ageOn(f.dob);
    if (v !== 'minor' && isTeenAge(a)) {
      setAgeNotice(`You’re ${a}, so you join the Teen panel. Teen accounts need a parent or guardian’s consent, and you can’t switch to an adult panel until you turn 18.`);
      return;
    }
    setAgeNotice('');
    if (f.type !== v) playAudience(v);
    setF((p) => ({ ...p, type: v, dob: v === 'minor' && a !== null && a >= SITE.adultAge ? '' : p.dob }));
  };
  const onDob = (v) => {
    const a = ageOn(v);
    setTouched((t) => ({ ...t, dob: true }));
    if (f.type !== 'minor' && isTeenAge(a)) {
      // 13–17 on the Consumer or Professional form: move to the Teen sign-up and keep what fits.
      setF((p) => ({ ...p, dob: v, type: 'minor', middleName: '', phone: '' }));
      setAgeNotice(
        `You’re ${a}, so we’ve moved you to the Teen panel. Your name, email, date of birth and gender are kept. Next, we’ll ask for your parent or legal guardian, who must give consent before your account switches on.`
      );
      playAudience('minor');
      return;
    }
    set('dob', v);
  };

  // ---------- professional work questions ----------
  const loadWorkOptions = async (lvl, parentVal) => {
    setWorkLoading((l) => ({ ...l, [lvl.key]: true }));
    try {
      const body = lvl.parent ? { parentValue: parentVal } : {};
      const resp = lvl.method === 'get' ? await api.get(lvl.api) : await api.post(lvl.api, body);
      const list = Array.isArray(resp?.data) ? resp.data.map(normOpt).filter((o) => o.value) : [];
      setWorkOpts((o) => ({ ...o, [lvl.key]: list }));
      setF((p) => ({ ...p, __workAvailable: { ...(p.__workAvailable || {}), [lvl.key]: list.length > 0 } }));
    } catch {
      setWorkOpts((o) => ({ ...o, [lvl.key]: [] }));
      setF((p) => ({ ...p, __workAvailable: { ...(p.__workAvailable || {}), [lvl.key]: false } }));
    } finally {
      setWorkLoading((l) => ({ ...l, [lvl.key]: false }));
    }
  };
  useEffect(() => {
    if (f.type === 'pro' && step === 2) loadWorkOptions(WORK_LEVELS[0]);
  }, [f.type, step]); // eslint-disable-line react-hooks/exhaustive-deps
  const onWorkChange = (idx, val) => {
    const lvl = WORK_LEVELS[idx];
    const below = WORK_LEVELS.slice(idx + 1);
    setF((p) => {
      const n = { ...p, [lvl.key]: val };
      below.forEach((l) => {
        n[l.key] = '';
      });
      return n;
    });
    setWorkOpts((o) => {
      const n = { ...o };
      below.forEach((l) => {
        delete n[l.key];
      });
      return n;
    });
    setTouched((t) => ({ ...t, [lvl.key]: true }));
    if (val && below[0]) loadWorkOptions(below[0], val);
  };

  // ---------- URL entry points ----------
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    let type = null;
    if (/\/join\/professional\/?$/.test(path) || q.get('category') === 'professional') type = 'pro';
    if (/\/join\/teen\/?$/.test(path) || q.get('category') === 'minor' || q.get('category') === 'teen') type = 'minor';
    if (type) setF((p) => ({ ...p, type }));
    const parts = (q.get('name') || '').trim().split(/\s+/).filter(Boolean);
    const email = q.get('email');
    if (parts.length || email)
      setF((p) => ({ ...p, firstName: parts[0] ?? p.firstName, lastName: parts.length > 1 ? parts.slice(1).join(' ') : p.lastName, email: email ?? p.email }));
    // A member who is already signed in has nothing to do here (email links and resume excepted).
    if (!q.get('user')) redirectIfLoggedIn();
  }, []);

  // Email link: ?user=<id>&code=<code>[&activate=1 for a Teen after parent consent]
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const user = q.get('user');
    const code = q.get('code');
    if (!(user && code)) return;
    setState('checking');
    (async () => {
      try {
        const resp = await api.post(`/api/v1/user/${user}`, { channel: 'email', code });
        if (resp?.status !== 'success') {
          setState('link-used');
          return;
        }
        const u = resp.data || {};
        let savedType = null;
        try {
          savedType = localStorage.getItem(TYPE_KEY);
        } catch {
          /* ignore */
        }
        const isTeenAccount = u.category === 'minor' || isTeenAge(ageOn(String(u.dob || '').slice(0, 10)));
        setF((p) => ({
          ...p,
          firstName: u.name?.first ?? p.firstName,
          middleName: u.name?.middle ?? p.middleName,
          lastName: u.name?.last ?? p.lastName,
          email: u.mail ?? p.email,
          dob: u.dob ? String(u.dob).slice(0, 10) : p.dob,
          gender: u.gender ?? p.gender,
          type: isTeenAccount ? 'minor' : u.category === 'b2b' ? 'pro' : savedType === 'pro' ? 'pro' : 'consumer',
          parent: u.parent ? { ...p.parent, email: u.parent.email || '', first: u.parent.name?.first || '' } : p.parent
        }));
        setQueryParams({ user, code });
        if (isTeenAccount) {
          const approved = u.parent?.consent === true || u.parent?.consentStatus === 'approved';
          if (u.parent?.email && !approved) {
            setState('teen-waiting');
            return;
          }
          setTeenActivate(true);
        } else setStep(1);
        setState('idle');
      } catch {
        setState('link-used');
      }
    })();
  }, []);

  // From the login page for a member who hasn't finished: ?user=<id>&resume=1 -> step 2
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('resume') !== '1' || !q.get('user')) return;
    let saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(RESUME_KEY));
    } catch {
      /* ignore */
    }
    if (!saved || String(saved.user) !== q.get('user')) {
      window.location.replace('/login/');
      return;
    }
    setF((p) => ({
      ...p,
      firstName: saved.firstName ?? p.firstName,
      lastName: saved.lastName ?? p.lastName,
      email: saved.email ?? p.email,
      dob: saved.dob ?? p.dob,
      gender: saved.gender ?? p.gender,
      type: saved.type === 'minor' ? 'minor' : (saved.type ?? p.type),
      dial: saved.dial || p.dial,
      phone: saved.phone || p.phone
    }));
    setQueryParams({ user: q.get('user') });
    session.current = { loggedIn: true };
    if (saved.type === 'minor') setTeenActivate(true);
    setStep(2);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    track('sign_up_start');
    (async () => {
      try {
        const response = await fetch('/api/v1/get-country');
        const info = await response.json();
        const country = info?.country;
        if (country) setF((p) => ({ ...p, country: p.country || country, dial: p.dial || country, parent: { ...p.parent, dial: p.parent.dial || country } }));
      } catch {
        /* the member picks it */
      }
    })();
  }, []);

  const focusFirstError = (e) => {
    const k = Object.keys(e)[0];
    if (!k || !formRef.current) return;
    setTimeout(() => {
      const el = formRef.current.querySelector(`[data-k="${k}"] input, [data-k="${k}"] button, [data-k="${k}"] textarea, [data-k="${k}"] select`);
      el && el.focus();
    }, 30);
  };

  const resetCaptcha = () => {
    setCaptcha(null);
    setResetKey((k) => k + 1);
  };
  // Checked only when the button is pressed. Returns false (and shows why) when not ready.
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

  // ---------- email checks ----------
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

  // ---------- STEP 0 (adults): create the account + verification email ----------
  const submitDetails = async () => {
    const v = validate(0, f);
    setSubmitted(true);
    const capOk = captchaOk();
    if (Object.keys(v).length || !capOk) {
      focusFirstError(v);
      return;
    }
    // Belt and braces: an age that changed after the panel was picked.
    if (isTeenAge(age)) return onDob(f.dob);
    setState('sending');
    setMsg('');
    if (!(await checkEmail({ submit: true }))) {
      setState('idle');
      return;
    }
    const ref = readReferral();
    try {
      const res = await api.put('/api/v1/user', {
        category: category[f.type],
        name: {
          salutation: f.gender === 'Male' ? 'Mr.' : f.gender === 'Female' ? 'Ms.' : 'Mx.',
          first: f.firstName.trim(),
          middle: f.middleName.trim(),
          last: f.lastName.trim()
        },
        mail: f.email.trim().toLowerCase(),
        phone: fullPhone(f.dial, f.phone),
        dob: f.dob,
        gender: f.gender,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        terms: ['privacy-policy', f.research && 'video-concent', f.marketing && 'newsletter'].filter(Boolean),
        ...(ref ? { referredBy: ref } : {}),
        captcha: captchaPayload(captcha)
      });
      if (res?.status === 'success') {
        try {
          localStorage.setItem(TYPE_KEY, f.type);
        } catch {
          /* ignore */
        }
        clearReferral();
        setState('done');
        track('sign_up_submitted', { category: f.type });
        return;
      }
      const m = errText(res, 'We couldn’t create your account. Please try again.');
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
      setMsg('Unable to submit your details. Please try again.');
    }
  };

  // ---------- Teen steps 0 and 1: checks only, nothing is sent yet ----------
  const teenNext = async () => {
    const v = validate(step, f);
    setSubmitted(true);
    if (Object.keys(v).length) {
      focusFirstError(v);
      return;
    }
    if (step === 0) {
      setState('sending');
      const ok = await checkEmail({ submit: true });
      setState('idle');
      if (!ok) return;
    }
    setSubmitted(false);
    setTouched({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- Teen step 2: send the registration request ----------
  const submitTeen = async () => {
    const v = validate(2, f);
    setSubmitted(true);
    const capOk = captchaOk();
    if (Object.keys(v).length || !capOk) {
      focusFirstError(v);
      return;
    }
    setState('sending');
    setMsg('');
    const p = f.parent;
    const ref = readReferral();
    try {
      const res = await api.put('/api/v1/user', {
        category: 'minor',
        name: { salutation: f.gender === 'Male' ? 'Mr.' : f.gender === 'Female' ? 'Ms.' : 'Mx.', first: f.firstName.trim(), last: f.lastName.trim() },
        mail: f.email.trim().toLowerCase(),
        dob: f.dob,
        gender: f.gender,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        terms: ['privacy-policy', 'video-concent'],
        parent: {
          relation: p.rel,
          name: { first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim() },
          email: p.email.trim().toLowerCase(),
          phone: fullPhone(p.dial, p.phone),
          dob: p.dob,
          ...(p.rel === 'guardian' ? { gender: p.gender } : {})
        },
        ...(ref ? { referredBy: ref } : {}),
        captcha: captchaPayload(captcha)
      });
      if (res?.status === 'success') {
        try {
          localStorage.setItem(TYPE_KEY, 'minor');
        } catch {
          /* ignore */
        }
        clearReferral();
        setState('teen-submitted');
        track('sign_up_submitted', { category: 'minor' });
        window.scrollTo({ top: 0 });
        return;
      }
      const m = errText(res, 'We couldn’t send your request. Please try again.');
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
      setMsg('Unable to send your request. Please try again.');
    }
  };

  // ---------- password (adult step 1, or Teen activation) ----------
  const ensureSession = async () => {
    if (session.current.loggedIn) return true;
    // The password call signs the member in on an updated API; older APIs need a login call.
    const me = await api.get('/api/v1/me');
    if (me?.status === 'success') {
      session.current.loggedIn = true;
      return true;
    }
    const res = await api.post('/api/v1/user/login', { mail: f.email.trim().toLowerCase(), password: f.password });
    session.current.loggedIn = res?.status === 'success';
    return session.current.loggedIn;
  };

  const submitPassword = async () => {
    const v = validate(1, f, { teenActivate });
    setSubmitted(true);
    if (Object.keys(v).length) {
      focusFirstError(v);
      return;
    }
    setState('sending');
    setMsg('');
    try {
      const resp = await api.patch('/api/v1/user', {
        userID: queryParams.user,
        emailOTP: queryParams.code,
        password: f.password,
        confirmPassword: f.confirm
      });
      if (resp?.status !== 'success') {
        const m = errText(resp, 'We couldn’t save your password. Please try again.');
        if (/consent/i.test(m)) {
          setState('teen-waiting');
          return;
        }
        if (/expired|invalid|used/i.test(m)) {
          setState('link-used');
          return;
        }
        setState('error');
        setMsg(m);
        return;
      }
      session.current.loggedIn = false;
      try {
        await ensureSession();
      } catch {
        /* the profile step retries */
      }
      try {
        localStorage.setItem(PENDING_JOIN_KEY, JSON.stringify({ user: queryParams.user, email: f.email.trim().toLowerCase(), type: f.type }));
      } catch {
        /* ignore */
      }
      setSubmitted(false);
      setTouched({});
      setState('idle');
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setState('error');
      setMsg('Unable to save your password. Please try again.');
    }
  };

  // ---------- STEP 2: contact & profile ----------
  const submitProfile = async () => {
    const v = validate(2, f, { teenActivate: false });
    setSubmitted(true);
    if (!teen && Object.keys(v).length) {
      focusFirstError(v);
      return;
    }
    setState('sending');
    setMsg('');
    try {
      const ok = await ensureSession();
      if (!ok) {
        setState('error');
        setMsg('We couldn’t sign you in to save your profile. Please log in and finish from there.');
        return;
      }
      const country = (f.dial || f.country || '').toLowerCase();
      const body = { address: [{ tag: 'Home', country }] };
      if (!teen && f.phone) body.phone = fullPhone(f.dial, f.phone);
      const upd = await api.put(`/api/v1/user/${queryParams.user}`, body);
      if (upd?.status !== 'success') {
        setState('error');
        setMsg(errText(upd, 'We couldn’t save your profile. Please try again.'));
        return;
      }
      const answerPayload = {
        'communication-methods': Object.keys(f.channels)
          .filter((k) => f.channels[k] && !(teen && k !== 'email'))
          .concat('dashboard')
      };
      if (f.type === 'pro') {
        WORK_LEVELS.forEach((l) => {
          if (f[l.key]) answerPayload[l.name] = f[l.key];
        });
        if (f.company.trim()) answerPayload.companyname = f.company.trim();
        if (f.workEmail.trim()) answerPayload.workemail = f.workEmail.trim().toLowerCase();
      }
      const ansResp = await api.patch('/api/v1/me/answer', answerPayload);
      if (ansResp?.status !== 'success') {
        setState('error');
        setMsg(errText(ansResp, 'We couldn’t save your answers. Please try again.'));
        return;
      }
      try {
        localStorage.removeItem(PENDING_JOIN_KEY);
        sessionStorage.removeItem(RESUME_KEY);
      } catch {
        /* ignore */
      }
      window.history.replaceState(null, '', window.location.pathname);
      setQueryParams({});
      setState('created');
      track('sign_up_complete', { category: f.type, country: f.dial || f.country });
    } catch {
      setState('error');
      setMsg('Unable to save your profile. Please try again.');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (teenActivate && step !== 2) return submitPassword();
    if (step === 2) return submitProfile();
    if (teen) return step === 2 ? submitTeen() : teenNext();
    return step === 0 ? submitDetails() : submitPassword();
  };
  const onTeenSubmit = (e) => {
    e.preventDefault();
    if (step === 2) return submitTeen();
    return teenNext();
  };

  const strength = passwordStrength(f.password);

  // ================= result screens =================
  if (state === 'done')
    return (
      <Done title={`Check your inbox, ${f.firstName.trim()}!`}>
        <p>
          We’ve sent a verification link to <strong>{f.email}</strong>. Open it to confirm your email and create your password.
        </p>
        <p className="muted">The link works for 24 hours. If you can’t see the email, check your spam or promotions folder.</p>
        <ResendVerify email={f.email} compact />
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </Done>
    );
  if (state === 'teen-submitted')
    return (
      <Done icon="users" title="Request sent to your parent or guardian">
        <p>
          Your registration request has been submitted successfully. We have sent a <strong>Parent/Guardian Onboarding Form</strong> to <strong>{f.parent.email}</strong>. Please ask them to check their inbox (and spam folder) and complete
          the onboarding to continue.
        </p>
        <p className="muted">Your Teen account stays switched off until they consent. Then we email you a link to create your password.</p>
        <TeenStatus stage="parent-verification-pending" parentEmail={f.parent.email} />
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
  if (state === 'created')
    return (
      <Done icon="check" title={teen ? 'Your Teen account is active 🎉' : 'Your account has been created 🎉'}>
        {teen ? (
          <>
            <p>Your parent or guardian has consented and your password is set. You can log in to the Teen panel now.</p>
            <TeenStatus stage="account-active" />
          </>
        ) : (
          <>
            <p>Welcome to Turn2Opinion. Your first step is your “About you” profile: it decides which surveys reach you.</p>
          </>
        )}
        {/* Feedback 20 Nov: after sign-up, Continue goes to the profiles, not the dashboard. */}
        <a href="/member/profiles" className="btn btn-primary">
          Start my “About you” profile <Icon name="arrow" size={18} />
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
        <p>It has already been used or it has expired. If you already set your password, log in. Otherwise you can ask for a new verification email.</p>
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

  // ================= forms =================
  const steps = teen && !teenActivate ? TEEN_STEPS : STEPS;
  const icons = teen && !teenActivate ? TEEN_ICONS : STEP_ICONS;
  const shownStep = teenActivate ? (step === 2 ? 2 : 1) : step;
  const aud = f.type === 'pro' || teen ? f.type : 'consumer';
  const alert = state === 'error' && msg && (
    <p className="form-alert" role="alert">
      {msg}
    </p>
  );
  const consents = (
    <div className="consents">
      <Consent k="terms" f={f} set={set} errOf={errOf}>
        I have read and accept the{' '}
        <a href="/terms/" target="_blank" rel="noopener">
          Terms &amp; Conditions
        </a>
        .
      </Consent>
      <Consent k="privacy" f={f} set={set} errOf={errOf}>
        I have read and accept the{' '}
        <a href="/privacy/" target="_blank" rel="noopener">
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
        <span>Send me tips, reward news and the occasional newsletter (optional).</span>
      </label>
    </div>
  );

  return (
    <section className={`join theme-${aud}`}>
      <div className="join-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <AuthAura aud={aud} />
      <div className="wrap join-grid">
        <div className="join-side">
          <Breadcrumbs items={[{ label: 'Join free' }]} />
          <h1>{teenActivate ? 'Switch on your Teen account' : teen ? 'Join the Teen panel' : 'Create your free account'}</h1>
          <p className="join-tag" key={`tag-${teen ? 'm' : 'x'}`}>
            {(teen ? 'Your voice. Your parent’s OK. Then you’re in.' : 'Two minutes now. Rewards for every survey after.').split(' ').map((w, i) => (
              <span key={i} style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="join-lead">
            {teen
              ? 'For ages 13 to 17. You fill in your details and your parent or guardian’s. They get an onboarding and consent form by email, and your account switches on only after they consent.'
              : 'No fees, no investment – just honest answers. Unlock each step below as you go.'}
          </p>
          <MemberCard f={f} step={shownStep} />
          <AuthVoice aud={aud} />
        </div>

        <div className="join-card">
          <span className="join-card-ring" aria-hidden="true" />
          <ol className="stepper" aria-label="Sign-up progress">
            {steps.map((s, i) => (
              <li key={s} className={i === shownStep ? 'is-on' : i < shownStep ? 'is-done' : ''} aria-current={i === shownStep ? 'step' : undefined}>
                <span className="stepper-dot">{i < shownStep ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name={icons[i]} size={15} />}</span>
                <span className="stepper-label">{s}</span>
              </li>
            ))}
            <span className="stepper-bar" style={{ '--p': shownStep / (steps.length - 1) }} aria-hidden="true" />
          </ol>
          <p className="join-progress-note">
            Step {shownStep + 1} of {steps.length}
            {teen && !teenActivate ? ' · nothing is sent until the last step' : ''}
          </p>

          <form ref={formRef} onSubmit={teen && !teenActivate ? onTeenSubmit : onSubmit} noValidate key={`${step}-${teen}-${teenActivate}`} className="join-step">
            {/* ================= STEP 0: details (all panels) ================= */}
            {step === 0 && !teenActivate && (
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
                      <strong>Parent or guardian consent is required.</strong> First your details, then theirs. They receive an onboarding form by email and your account switches on
                      only after they consent. <a href="/earn/teens/">How the Teen panel works</a>
                    </span>
                  </p>
                )}
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
                {alert}
              </>
            )}

            {/* ================= Teen steps 1 and 2 ================= */}
            {teen && !teenActivate && step === 1 && <TeenParentStep f={f} setParent={setParent} set={set} errOf={errOf} okOf={okOf} setTouched={setTouched} />}
            {teen && !teenActivate && step === 2 && (
              <>
                <TeenConsentStep f={f} set={set} errOf={errOf} />
                <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
                {captchaErr && (
                  <p className="field-error" role="alert">
                    {captchaErr}
                  </p>
                )}
                {alert}
              </>
            )}

            {/* ================= password (adult step 1, Teen activation) ================= */}
            {((!teen && step === 1) || (teenActivate && step !== 2)) && (
              <>
                {teenActivate && <TeenStatus stage="account-activation-pending" />}
                <p className="join-step-lead">
                  {teenActivate ? 'Your parent or guardian has consented. Create your password to switch your account on.' : `Email confirmed${f.firstName ? `, ${f.firstName}` : ''}. Now choose a password.`}
                </p>
                <div data-k="password">
                  <Field id="j-pw" label="Create a password" error={errOf('password')}>
                    <div className="pw-wrap">
                      <input id="j-pw" className="input" type={showPw ? 'text' : 'password'} value={f.password} onChange={(e) => set('password', e.target.value)} onBlur={touch('password')} autoComplete="new-password" maxLength={128} aria-invalid={!!errOf('password')} aria-describedby="pw-rules" />
                      <button type="button" className="pw-eye" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                        <Icon name={showPw ? 'eyeOff' : 'eye'} size={18} />
                      </button>
                    </div>
                  </Field>
                  <div className={`pw-meter s${strength}`} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <ul className="pw-rules" id="pw-rules">
                    {PW_RULES.map(([l, fn]) => (
                      <li key={l} className={fn(f.password) ? 'ok' : ''}>
                        <Icon name={fn(f.password) ? 'check' : 'x'} size={12} strokeWidth={3} /> {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-k="confirm">
                  <Field id="j-pw2" label="Confirm password" error={errOf('confirm')} valid={!!f.confirm && f.confirm === f.password}>
                    <input id="j-pw2" className="input" type={showPw ? 'text' : 'password'} value={f.confirm} onChange={(e) => set('confirm', e.target.value)} onBlur={touch('confirm')} autoComplete="new-password" maxLength={128} />
                  </Field>
                </div>
                {alert}
              </>
            )}

            {/* ================= STEP 2: contact & profile ================= */}
            {step === 2 && (teenActivate || !teen) && (
              <>
                <div className="field">
                  <p className="field-label">Send me survey invitations by</p>
                  <div className="channel-toggles">
                    {CHANNELS.filter(([k]) => !teen || k === 'email').map(([k, l, ic]) => (
                      <label key={k} className={`ch-toggle ${f.channels[k] ? 'is-on' : ''}`}>
                        <input type="checkbox" checked={f.channels[k]} onChange={(e) => set('channels', { ...f.channels, [k]: e.target.checked })} />
                        <Icon name={ic} size={18} /> {l}
                      </label>
                    ))}
                    <span className="ch-toggle is-on is-locked">
                      <Icon name="dashboard" size={18} /> Dashboard (always on)
                    </span>
                  </div>
                  {!teen && <p className="field-hint">SMS and WhatsApp are off until you switch them on.</p>}
                </div>
                {f.type === 'pro' && (
                  <fieldset className="pro-fields">
                    <legend>
                      <Icon name="briefcase" size={16} /> Your work
                    </legend>
                    <div className="form-grid two">
                      {WORK_LEVELS.map((lvl, idx) => {
                        const opts = workOpts[lvl.key] || [];
                        const waiting = lvl.parent && !f[lvl.parent];
                        const empty = !waiting && !workLoading[lvl.key] && workOpts[lvl.key] && opts.length === 0;
                        return (
                          <div data-k={lvl.key} key={lvl.key}>
                            <Field id={`j-${lvl.key}`} label={lvl.label} error={errOf(lvl.key)} valid={okOf(lvl.key)} hint={empty ? 'No options are available for this right now. You can add it later in your profile.' : undefined}>
                              <select id={`j-${lvl.key}`} className="input" value={f[lvl.key]} disabled={waiting || workLoading[lvl.key] || empty} onChange={(e) => onWorkChange(idx, e.target.value)}>
                                <option value="">{workLoading[lvl.key] ? 'Loading…' : waiting ? `Choose ${WORK_LEVELS[idx - 1].label.toLowerCase()} first` : `Select ${lvl.label.toLowerCase()}`}</option>
                                {opts.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </Field>
                            {idx === 0 && empty && (
                              <button type="button" className="link-soft" onClick={() => loadWorkOptions(WORK_LEVELS[0])}>
                                Try loading the list again
                              </button>
                            )}
                          </div>
                        );
                      })}
                      <Field id="j-company" label="Company" optional>
                        <input id="j-company" className="input" value={f.company} onChange={(e) => set('company', e.target.value)} maxLength={100} autoComplete="organization" />
                      </Field>
                      <div data-k="workEmail">
                        <Field id="j-wemail" label="Work email" optional error={errOf('workEmail')} hint="Verifies your role for higher-value B2B studies.">
                          <input id="j-wemail" className="input" type="email" value={f.workEmail} onChange={(e) => set('workEmail', e.target.value)} onBlur={touch('workEmail')} maxLength={120} />
                        </Field>
                      </div>
                    </div>
                  </fieldset>
                )}
                {alert}
              </>
            )}

            <div className="join-actions">
              {teen && !teenActivate && step > 0 && (
                <button
                  type="button"
                  className="btn btn-ghost btn-lg"
                  onClick={() => {
                    setSubmitted(false);
                    setStep((s) => s - 1);
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
                ) : step === 2 && (teenActivate || !teen) ? (
                  <>
                    Finish <Icon name="sparkles" size={18} />
                  </>
                ) : teen && !teenActivate && step === 2 ? (
                  <>
                    Submit registration request <Icon name="arrow" size={18} />
                  </>
                ) : !teen && step === 0 ? (
                  <>
                    Create my account <Icon name="sparkles" size={18} />
                  </>
                ) : (
                  <>
                    Continue <Icon name="arrow" size={18} />
                  </>
                )}
              </button>
            </div>

            {step === 0 && !teen && <SocialAuth />}
            <p className="join-alt">
              Already a member? <Link to="/login/">Log in</Link>
            </p>
            <FollowUs />
          </form>
        </div>
      </div>
    </section>
  );
}
