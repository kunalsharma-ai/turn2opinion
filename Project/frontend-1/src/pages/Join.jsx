// Free sign-up: 3-step wizard with live member-card preview, full validation, full DOB (calendar),
// country flags + dial codes, guardian email for under-18s and CAPTCHA.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Link } from '../router/Router.jsx';
import { ENV, asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { COUNTRIES } from '../data/countries.js';
import { B2B } from '../data/profiles.js';
import { postJSON, putJSON, failureMessage,api } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import Captcha from '../components/Captcha.jsx';
import { Flag } from '../components/Brand.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { ageOn, CountryPicker, DateField, EMAIL_RE, Field, formatDate, FREE_MAIL, passwordStrength, PhoneField } from '../components/FormFields.jsx';
import SocialAuth from '../components/SocialAuth.jsx';
import FollowUs from '../components/FollowUs.jsx';
import ResendVerify from '../components/ResendVerify.jsx';
import { AuthAura, AuthVoice, saveAud } from '../components/AuthAura.jsx';
import { playAudience } from '../utils/sound.js';
import { TeenAssent, TeenKeys, TeenParentBlock } from '../components/TeenJoin.jsx';

const emailCheck = {
  validateDomain: async (v) => {
    try {
      const r = await api.post('/api/v1/validator/email', { email: v });
      return !!r?.valid;
    } catch { return true; } // network fail pe block mat karo, server baad mein bhi check karta hai
  },
  checkDuplicate: async (v) => {
    try {
      const { data } = await api.post('/api/v1/user/check', { mail: v });
      return !isNaN(data) && data <= 0;
    } catch { return true; }
  }
};

// Teens (13–17) sign up as b2c: the backend is unchanged and recognises under-18s by date of birth.
const category = { consumer: "b2c", pro: "b2b", minor: "b2c" };
const STEPS = ['About you', 'Secure your account', 'Contact & profile'];
// Teen panel (13-17) uses the same three API steps, relabelled for the two-keys flow:
// step 0 adds the parent or guardian, step 1 adds the teen's own yes (assent).
const TEEN_STEPS = ['You & your parent', 'Account & your yes', 'Contact & profile'];
const TEEN_PARENT_KEY = 't2o_teen_parent_v1';
// Only birthdays for ages 13 to 17 today can be picked on the teen calendar.
function teenWindow(now = new Date()) {
  const max = new Date(now.getFullYear() - SITE.minAge, now.getMonth(), now.getDate());
  const min = new Date(now.getFullYear() - SITE.adultAge, now.getMonth(), now.getDate() + 1);
  return { min, max };
}
function teenParentFields(saved, p) {
  if (!saved) return {};
  return {
    guardianName: saved.guardianName || p.guardianName,
    guardianRel: saved.guardianRel || p.guardianRel,
    guardianEmail: saved.guardianEmail || p.guardianEmail,
    parentAware: true
  };
}
function readTeenParent(email) {
  try {
    const saved = JSON.parse(localStorage.getItem(TEEN_PARENT_KEY));
    if (saved && email && saved.email === String(email).trim().toLowerCase()) return saved;
  } catch (e) {
    /* ignore */
  }
  return null;
}
const STEP_ICONS = ['user', 'lock', 'phone'];
const TYPE_KEY = 't2o_join_type';
const PENDING_JOIN_KEY = 't2o_pending_registration';
const RESUME_KEY = 't2o_resume_signup';
const NAME_RE = /^[\p{L}][\p{L} .'-]{0,48}$/u;
const GENDERS = [
  'Female',
  'Male',
  'Other',
  // 'Non-binary',
  // 'Prefer not to say'
];
const GENDER_META = {
  Female: { c: '#FF4F8B', d: ['M12 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z', 'M12 13.5V21', 'M8.8 17.6h6.4'] },
  Male: { c: '#2F7BFF', d: ['M10 9.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z', 'M13.6 10.9 20 4.5', 'M15 4.5h5v5'] },
  Other: { c: '#8B5CF6', d: ['M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z', 'M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3'] },
  'Non-binary': { c: '#8B5CF6', d: ['M12 10a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2z', 'M12 10V3', 'M9.4 4.4l5.2 3', 'M14.6 4.4l-5.2 3'] },
  'Prefer not to say': { c: '#0E9F8E', d: ['M4 5.5h16v10H10l-4.5 3.8v-3.8H4z', 'M8 10.5h8', 'M9.5 9v3M12 9v3M14.5 9v3'] }
};

function GenderGlyph({ g, on }) {
  return (
    <svg viewBox="0 0 24 24" className={`gg ${on ? 'is-on' : ''}`} aria-hidden="true">
      {GENDER_META[g].d.map((d, i) => (
        <path key={i} d={d} pathLength="1" style={{ '--i': i }} />
      ))}
    </svg>
  );
}

/** Birthday cake with a flickering candle (label icon for date of birth). */
function CakeIcon() {
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

const initial = {
  type: 'consumer',
  firstName: '',
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
  company: '',
  workEmail: '',
  guardianEmail: '',
  guardianName: '',
  guardianRel: '',
  parentAware: false,
  teenAssent: false,
  teenSkip: false,
  teenWait: false,
  channels: { email: true, sms: false, whatsapp: true },
  password: '',
  confirm: '',
  terms: false,
  research: false,
  marketing: false
};

const WORK_LEVELS = [
  { key: 'empstat',    name: 'empstat',    label: 'Employment status', api: '/api/v1/option/empstat',    parent: null,         method: 'get'  },
  { key: 'industry',   name: 'industry',   label: 'Industry',          api: '/api/v1/option/industry',   parent: 'empstat',    method: 'post' },
  { key: 'sector',     name: 'sector',     label: 'Specialization',    api: '/api/v1/option/sector',     parent: 'industry',   method: 'post' },
  { key: 'department', name: 'department', label: 'Department',        api: '/api/v1/option/department', parent: 'sector',     method: 'post' },
  { key: 'jobTitle',   name: 'jobrole',    label: 'Job title',         api: '/api/v1/option/jobrole',    parent: 'department', method: 'post' },
];
// dropdown ki value aur save hone wali answer dono label hi rakhte hain
// (survey code mein stored answers ko option ke parentValue se label ke roop mein match kiya jata hai)
const normOpt = (o) => {
  const label = typeof o === 'string' ? o : (o.label ?? o.name ?? o.value);
  return { value: label, label };
};

// Steps: 0 = About you, 1 = Secure your account (password), 2 = Contact & profile
function validate(step, f) {
  const e = {};
  const age = ageOn(f.dob);
  if (step === 0) {
    if (!NAME_RE.test(f.firstName.trim())) e.firstName = 'Enter your first name using letters only.';
    if (!NAME_RE.test(f.lastName.trim())) e.lastName = 'Enter your last name using letters only.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    if (!f.dob) e.dob = 'Pick your full date of birth (day, month and year).';
    else if (age < 0 || new Date(f.dob) > new Date()) e.dob = 'Date of birth can’t be in the future.';
    else if (age < SITE.minAge) e.dob = `You must be at least ${SITE.minAge} years old to join.`;
    else if (age > 100) e.dob = 'Check the year – that makes you over 100.';
    else if (f.type === 'minor' && age >= SITE.adultAge) e.dob = 'The teen panel is for ages 13 to 17. Pick Consumer or Business professional instead.';
    if (!f.gender) e.gender = 'Select your gender.';
    if (f.type === 'minor') {
      if (!NAME_RE.test(f.guardianName.trim())) e.guardianName = 'Enter your parent or guardian’s first name.';
      if (!f.guardianRel) e.guardianRel = 'Tell us how they’re related to you.';
      if (!EMAIL_RE.test(f.guardianEmail.trim())) e.guardianEmail = 'Enter your parent or guardian’s email, so we can ask for their permission.';
      else if (f.guardianEmail.trim().toLowerCase() === f.email.trim().toLowerCase()) e.guardianEmail = 'Use your parent or guardian’s own email, not yours.';
      if (!f.parentAware) e.parentAware = 'Let your parent or guardian know first, then tick this box.';
    }
  }

  if (step === 1) {
    if (PW_RULES.some(([, fn]) => !fn(f.password))) e.password = 'Your password needs all four ingredients below.';
    else if (f.password.toLowerCase().includes(f.firstName.trim().toLowerCase()) && f.firstName.trim().length > 2) e.password = 'Don’t include your name in your password.';
    if (!f.confirm) e.confirm = 'Type your password again.';
    else if (f.confirm !== f.password) e.confirm = 'Passwords don’t match.';
    if (!f.terms) e.terms = 'You need to accept the Terms and Privacy Policy to activate your account.';
    if (!f.research) e.research = 'Consent to take part in research is needed to receive surveys.';
    if (f.type === 'minor') {
      if (!f.teenAssent) e.teenAssent = 'This is your own yes. Tick it if you want to take part.';
      if (!f.teenSkip) e.teenSkip = 'Please confirm you know you can skip or stop any time.';
      if (!f.teenWait) e.teenWait = 'Please confirm you know surveys wait for your parent’s yes.';
    }
  }

  if (step === 2) {
    if (!f.country) {
      e.country = 'Select the country you live in.';
    }

    const digits = f.phone.replace(/\D/g, '');

    const dialDigits = (
      COUNTRIES.find((c) => c.c === f.dial) || { d: '' }
    ).d.replace(/\D/g, '');

    if (!f.dial) {
      e.phone = 'Choose your country code.';
    } 
    else if (!isValidPhoneNumber(`+${dialDigits}${digits}`)) {
      e.phone = 'Enter a valid mobile number for the selected country.';
    }
     else if (/^(\d)\1+$/.test(digits)) {
      e.phone = 'That number doesn’t look real.';
    }
    if (f.type === 'pro') {
      // if (f.jobTitle.trim().length < 2) e.jobTitle = 'Enter your job title.';
      // if (!f.industry) e.industry = 'Select your industry.';
      WORK_LEVELS.forEach((l) => {
        if (!f[l.key]) e[l.key] = `Select your ${l.label.toLowerCase()}.`;
      });

      if (f.workEmail && !EMAIL_RE.test(f.workEmail.trim())) e.workEmail = 'Enter a valid work email or leave it empty.';
      else if (f.workEmail && FREE_MAIL.includes(f.workEmail.split('@')[1]?.toLowerCase())) e.workEmail = 'Use your company email domain (not Gmail, Yahoo, etc.).';
    }
    if (age !== null && age < SITE.adultAge) {
      if (!EMAIL_RE.test(f.guardianEmail.trim())) e.guardianEmail = 'Members under 18 need a parent or guardian email.';
      else if (f.guardianEmail.trim().toLowerCase() === f.email.trim().toLowerCase()) e.guardianEmail = 'Use your parent or guardian’s own email, not yours.';
    }
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
  const name = `${f.firstName} ${f.lastName}`.trim();
  const c = COUNTRIES.find((x) => x.c === f.country);
  return (
    <div className="mcard-scene" onMouseMove={onMove} onMouseLeave={reset} aria-hidden="true">
      <div className={`mcard ${f.type === 'pro' ? 'is-pro' : f.type === 'minor' ? 'is-minor' : ''}`} ref={card}>
        <div className="mcard-holo" />
        <div className="mcard-top">
          <span className="mcard-brand">Turn2Opinion</span>
          <span className="mcard-type">{f.type === 'pro' ? 'Professional' : f.type === 'minor' ? 'Teen panel' : 'Consumer'} member</span>
        </div>
        <div className="mcard-chip" />
        <p className="mcard-name">{name || 'Your name here'}</p>
        <p className="mcard-sub">{f.type === 'pro' && f.jobTitle ? f.jobTitle : f.email || 'you@example.com'}</p>
        <div className="mcard-foot">
          <span>{c ? <Flag code={c.c} size={14} /> : <Icon name="globe" size={14} />} {c ? c.n : 'Your country'}</span>
          <span>{f.dob ? `Born ${formatDate(f.dob)}` : 'Member since today'}</span>
        </div>
      </div>
      <img className="mcard-peep" src={asset(`/images/people/${f.type === 'pro' ? 'business' : f.type === 'minor' ? 'gamer' : 'shopper'}.svg`)} alt={f.type === 'pro' ? 'Business professional taking paid surveys' : f.type === 'minor' ? 'Teen member of the Turn2Opinion teen panel' : 'Consumer taking paid surveys'} width="160" height="190" key={f.type} />
      {['₹', '$', '€', '£'].map((c, i) => (
        <span key={c} className={`mc-coin k${i}`}>
          {c}
        </span>
      ))}
      <ol className="unlocks">
        {[
          ['user', 'Account', 'Free, no investment'],
          ['bell', 'Matched surveys', 'Invites that fit you'],
          ['gift', 'Rewards', 'PayPal, cash, bank, wire, vouchers, gift cards · UPI in India']
        ].map(([ic, t, d], i) => (
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

export default function Join() {
  const [f, setF] = useState(initial);
  // Remember the chosen side so Log in opens in the same colours next time.
  useEffect(() => saveAud(f.type), [f.type]);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [captchaErr, setCaptchaErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [state, setState] = useState('idle');
  const [pendingSignup, setPendingSignup] = useState(false);
  const [msg, setMsg] = useState('');
  const formRef = useRef(null);
  const [queryParams, setQueryParams] = useState({});
  const [workOpts, setWorkOpts] = useState({});
  const [workLoading, setWorkLoading] = useState({});
  const [duplicate, setDuplicate] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  // password set hone ke baad login + consents ka status (retry-safe)
  const session = useRef({ loggedIn: false, consentSaved: false });

  const age = ageOn(f.dob);
  const minor = age !== null && age < SITE.adultAge;
  const teen = useMemo(() => teenWindow(), []);
  const live = validate(step, f);
  // const errOf = (k) => (touched[k] || submitted ? live[k] || '' : '');
  // const okOf = (k) => touched[k] && !live[k];
  const errOf = (k) => (touched[k] || submitted ? live[k] || (k === 'email' ? emailErr : '') || '' : '');
  const okOf = (k) => touched[k] && !live[k] && !(k === 'email' && emailErr);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const onCaptcha = useCallback((t) => {
    setCaptcha(t);
    if (t) setCaptchaErr('');
  }, []);

const loadWorkOptions = async (lvl, parentVal) => {
  setWorkLoading((l) => ({ ...l, [lvl.key]: true }));
  try {
    const parentName = WORK_LEVELS.find((x) => x.key === lvl.parent)?.name;
    const body = parentName ? { parentValue: parentVal } : {};
    const resp = lvl.method === 'get'
            ? await api.get(lvl.api)
            : await api.post(lvl.api, body);
    setWorkOpts((o) => ({ ...o, [lvl.key]: (resp.data || []).map(normOpt) }));
  } catch (e) {
    setWorkOpts((o) => ({ ...o, [lvl.key]: [] }));
  } finally {
    setWorkLoading((l) => ({ ...l, [lvl.key]: false }));
  }
};

useEffect(() => {
  if (f.type === 'pro' && step === 2) loadWorkOptions(WORK_LEVELS[0]);
}, [f.type, step]); // eslint-disable-line react-hooks/exhaustive-deps // eslint-disable-line react-hooks/exhaustive-deps


useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const queries = Object.fromEntries(params.entries());
  // /join/professional/ is the clean URL; ?category= still works for old links.
  if (/\/join\/professional\/?$/.test(window.location.pathname)) queries.category = 'professional';
  if (/\/join\/teen\/?$/.test(window.location.pathname)) queries.category = 'minor';

  if (!(queries.category)) return;

  setF(prev => ({
    ...prev,
    type: queries?.category==="professional"?"pro":queries?.category==="minor"?"minor":"consumer"
  }));
},[])


useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const queries = Object.fromEntries(params.entries());

  if (!(queries.user && queries.code)) return;

  setState('checking');

  (async () => {
    try {
      const resp = await api.post(`/api/v1/user/${queries.user}`, {
        channel: 'email',
        code: queries.code,
      });

      if (resp.status !== 'success') {
        setState('link-used');
        return;
      }
      const u = resp.data;
      if (u && typeof u === 'object') {
        let savedType = null;
        try { savedType = localStorage.getItem(TYPE_KEY); } catch (e) { /* ignore */ }
        setF((p) => ({
          ...p,
          firstName: u.name?.first ?? p.firstName,
          lastName: u.name?.last ?? p.lastName,
          email: u.mail ?? p.email,
          dob: u.dob ? String(u.dob).slice(0, 10) : p.dob,
          gender: u.gender ?? p.gender,
          type: savedType || (u.category === 'b2b' ? 'pro' : 'consumer'),
          ...teenParentFields(readTeenParent(u.mail), p),
        }));
      }

      setQueryParams(queries);
      setStep(1); // Secure your account
      setPendingSignup(true);
      setState('idle');
    } catch (error) {
      setState('link-used');
    }
  })();
}, []);


// Login se aaya incomplete user: ?user=<id>&resume=1 -> seedha step 2
useEffect(() => {
  const q = new URLSearchParams(window.location.search);
  if (q.get('resume') !== '1' || !q.get('user')) return;

  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(RESUME_KEY)); } catch (e) { /* ignore */ }

  // data nahi mila (direct URL khola) -> wapas login
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
    type: saved.type ?? p.type,
    ...teenParentFields(readTeenParent(saved.email), p),
  }));
  setQueryParams({ user: q.get('user') });

  // user pehle hi login ho chuka hai aur consents step 1 mein save ho chuki hain
  session.current = { loggedIn: true, consentSaved: true };

  setPendingSignup(true);
  setStep(2);
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (f.country && !f.dial) set('dial', f.country);
  }, [f.country]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    track('sign_up_start');
  }, []);

useEffect(() => {
  const fetchCountry = async () => {
    try {
      const response = await fetch("/api/v1/get-country");
      const info = await response.json();

      console.log("Country response:", info);

      const country = info?.country;

      if (country) {
        set("country", country);
        set("dial", country);
      }
    } catch (error) {
      console.error("Failed to fetch country:", error);
    }
  };

  fetchCountry();
}, []); // eslint-disable-line react-hooks/exhaustive-deps


const onWorkChange = (idx, val) => {
  const lvl = WORK_LEVELS[idx];
  const below = WORK_LEVELS.slice(idx + 1);

  setF((p) => {
    const n = { ...p, [lvl.key]: val };
    below.forEach((l) => { n[l.key] = ''; });  
    return n;
  });
  setWorkOpts((o) => {
    const n = { ...o };
    below.forEach((l) => { delete n[l.key]; }); 
    return n;
  });
  setTouched((t) => ({ ...t, [lvl.key]: true }));

  if (val && below[0]) loadWorkOptions(below[0], val); 
};

  const focusFirstError = (e) => {
    const k = Object.keys(e)[0];
    if (!k || !formRef.current) return;
    setTimeout(() => {
      const el = formRef.current.querySelector(`[data-k="${k}"] input, [data-k="${k}"] button, [data-k="${k}"] textarea`);
      el && el.focus();
    }, 30);
  };

  // ---------- STEP 0: About you -> create user + send verification mail ----------
  const checkEmail = async () => {
  const v = f.email.trim().toLowerCase();
  if (!EMAIL_RE.test(v)) return true; // format error validate() already dikha raha hai
  if (!(await emailCheck.validateDomain(v))) {
    setEmailErr('This email domain looks invalid or can’t receive mail.');
    return false;
  }
  if (!(await emailCheck.checkDuplicate(v))) {
    setDuplicate(true); // tumhara existing "Email already registered" + ResendVerify UI khulega
    setMsg('This email is already registered.');
    setState('error');
    return false;
  }
  setEmailErr('');
  return true;
};
  const next = async (e) => {
    e?.preventDefault();
    const v = validate(0, f);
    if (Object.keys(v).length) {
      setSubmitted(true);
      focusFirstError(v);
      return;
    }
    setState('sending');
    if (!(await checkEmail())) { setSubmitted(true); if (state !== 'error') setState('idle'); return; }
    await submitSignup();
  };

const submitSignup = async () => {
  setState('sending');
  setMsg('');

  try {
    console.log('signup payload category:', category[f.type], 'type:', f.type);
    let res = await api.put(`/api/v1/user`,{
      category: category[f.type],
      name: {
        salutation:
          f.gender === 'Male'
            ? 'Mr.'
            : f.gender === 'Female'
              ? 'Ms.'
              : 'Mx.',
        first: f.firstName.trim(),
        last: f.lastName.trim(),
      },

      mail: f.email.trim().toLowerCase(),
      dob: f.dob,
      gender: f.gender,

      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  console.log({res});
    if (res.status === "success") {
      try { localStorage.setItem(TYPE_KEY, f.type); } catch (e) { /* ignore */ }
      if (f.type === 'minor') {
        // The parent's details come back on step 3 (after the email link), so keep them on this device.
        try {
          localStorage.setItem(
            TEEN_PARENT_KEY,
            JSON.stringify({
              email: f.email.trim().toLowerCase(),
              guardianName: f.guardianName.trim(),
              guardianRel: f.guardianRel,
              guardianEmail: f.guardianEmail.trim().toLowerCase()
            })
          );
        } catch (e) {
          /* ignore */
        }
      }
      setPendingSignup(true);
      setState('done');

      track('sign_up_start', {
        category: f.type,
        country: f.country,
      });
    } else {
      setState('error');
      setMsg(failureMessage(res));
      setDuplicate(/duplicate|already/i.test(JSON.stringify(res)));
    }
  } catch (error) {
    setState('error');
    setMsg('Unable to submit your details. Please try again.');
  }
};

  // ---------- login (token) + consents; password set hone ke baad ----------
  const startSession = async () => {

    if (!session.current.loggedIn) {
      const res = await api.post('/api/v1/user/login', {
        mail: f.email.trim().toLowerCase(),
        password: f.password,
      });
      if (res?.status !== 'success') {
        session.current.lastError = res?.message;
        return false;
      }

      session.current.loggedIn = true;
    }
    if (!session.current.consentSaved) {
      try {
        const r = await api.put(`/api/v1/user/${queryParams.user}`, {
          // consents: {
          //   terms: f.terms,
          //   research: f.research,
          //   marketing: f.marketing,
          // },
          joiningTerms: [
            f.terms && 'privacy-policy',
            f.marketing && 'newsletter',
            f.research && 'video-concent',
          ].filter(Boolean),
        });
        session.current.consentSaved = r?.status === 'success';
        if (!session.current.consentSaved) console.error('Consent save failed:', r);
      } catch (err) {
        console.error('Consent save failed:', err);
      }
    }
    return session.current.loggedIn;
  };

  // ---------- STEP 1: Secure your account -> set password, login, save consents ----------
  const submitPassword = async (e) => {
    e.preventDefault();

    const v = validate(1, f);
    setSubmitted(true);

    if (!captcha) setCaptchaErr('Complete the human check.');

    if (Object.keys(v).length || !captcha) {
      focusFirstError(v);
      return;
    }

    setState('sending');
    setMsg('');

    try {
      // Set the password using the link's user ID and code
      const resp = await api.patch('/api/v1/user', {
        userID: queryParams.user,
        emailOTP: queryParams.code,
        password: f.password,
        confirmPassword: f.confirm,
      });
      console.log('set-password response:', resp);
      if (resp.status != "success") {
        if (/expired|invalid|used/i.test(JSON.stringify(resp))) {
          setState('link-used');
          return;
        }
        setState('error');
        setMsg(failureMessage(resp));
        setResetKey((k) => k + 1);
        return;
      }
      try {
        await startSession();
      } catch (err) {
        console.error('Auto login failed:', err);
      }

      // Save incomplete registration details for frontend resume flow
      try {
        localStorage.setItem(
          PENDING_JOIN_KEY,
          JSON.stringify({
            user: queryParams.user,
            email: f.email.trim().toLowerCase(),
            type: f.type,
          })
        );
      } catch (error) {
        console.error('Unable to save pending registration:', error);
      }

      setSubmitted(false);
      setTouched({});
      setState('idle');
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setState('error');
      setMsg('Unable to create your account. Please try again.');
      setResetKey((k) => k + 1);
    }
  };

  // ---------- STEP 2: Contact & profile -> save phone/country/guardian + pro answers ----------
  const submitProfile = async (e) => {
    e.preventDefault();

    const v = validate(2, f);
    setSubmitted(true);

    if (Object.keys(v).length) {
      focusFirstError(v);
      return;
    }

    setState('sending');
    setMsg('');

    try {
      const ok = await startSession();
      if (!ok) {
        setState('error');
        setMsg('We couldn’t sign you in to save your profile. Please try again.');
        return;
      }

      const dial = (COUNTRIES.find((c) => c.c === f.dial) || {}).d || '';

      const upd = await api.put(`/api/v1/user/${queryParams.user}`, {
        address: [
          {
            tag: 'Home',
            country: f.country,
          },
        ],
        phone: `${dial.replace(/^\+/, '')}${f.phone.replace(/\D/g, '')}`,
        guardianEmail: minor
          ? f.guardianEmail.trim().toLowerCase()
          : undefined,
      });
      if (upd.status !== 'success') {
        setState('error');
        setMsg(failureMessage({ data: upd }));
        return;
      }

      const answerPayload = {
        'communication-methods': Object.keys(f.channels).filter((k) => f.channels[k]).concat('dashboard'),
      };
      if (f.type === 'pro') {
        WORK_LEVELS.forEach((l) => { answerPayload[l.name] = f[l.key]; });
        if (f.company.trim()) answerPayload.companyname = f.company.trim();
        if (f.workEmail.trim()) answerPayload.workemail = f.workEmail.trim().toLowerCase();
      }

      const ansResp = await api.patch('/api/v1/me/answer', answerPayload);
      if (ansResp.status !== 'success') {
        setState('error');
        setMsg(failureMessage({ data: ansResp }));
        return;
      }
      try {
        localStorage.removeItem(PENDING_JOIN_KEY);
        sessionStorage.removeItem(RESUME_KEY);
      } catch (e) {
        console.error('Unable to clear pending registration:', e);
      }
      window.history.replaceState(null, '', window.location.pathname);
      setQueryParams({});
      setState('created');

      track('sign_up_complete', {
        category: f.type,
        country: f.country,
      });
    } catch (error) {
      setState('error');
      setMsg('Unable to save your profile. Please try again.');
    }
  };

  const strength = passwordStrength(f.password);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const parts = (q.get('name') || '').trim().split(/\s+/).filter(Boolean);
    const email = q.get('email');
    if (!parts.length && !email) return;

    setF((p) => ({
      ...p,
      firstName: parts[0] ?? p.firstName,
      lastName: parts.length > 1 ? parts.slice(1).join(' ') : p.lastName,
      email: email ?? p.email
    }));
  }, []);
  
  if (state === 'done') {
    return (
      <section className="join-done">
        <div className="wrap join-done-inner">
          <div className="inbox-anim" aria-hidden="true">
            <span className="inbox-env">
              <Icon name="mail" size={56} />
            </span>
            <span className="inbox-spark s1" />
            <span className="inbox-spark s2" />
            <span className="inbox-spark s3" />
          </div>

          <h1>Check your inbox, {f.firstName.trim()}!</h1>

          <p>
            We have sent a verification link to{' '}
            <strong>{f.email}</strong>. Open the email and click
            the link to continue setting up your account.
          </p>

          <p className="muted">
            If you don't see the email, check your spam folder.
          </p>
          {f.type === 'minor' && (
            <TeenKeys f={f} stage={0} />
          )}

          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  if (state === 'created') {
    return (
      <section className="join-done">
        <div className="wrap join-done-inner">
          <div className="inbox-anim" aria-hidden="true">
            <span className="inbox-env">
              <Icon name="mail" size={56} />
            </span>
            <span className="inbox-spark s1" />
            <span className="inbox-spark s2" />
            <span className="inbox-spark s3" />
          </div>
      
          <h1>Your account has been created successfully! 🎉</h1>

          {f.type === 'minor' ? (
            <>
              <p>Your key is turned. Next, your parent or guardian gets their own permission form at <strong>{f.guardianEmail}</strong>.</p>
              <p>Surveys switch on once they say yes. Ask them to check their inbox (and spam folder).</p>
              <TeenKeys f={f} stage={2} />
            </>
          ) : (
            <>
              <p>Welcome to our community! You're all set to get started and explore exciting opportunities and rewards.</p>
              <p>We're glad to have you with us!</p>
            </>
          )}

          <Link to="/login?new=1" className="btn btn-primary">
            Login
          </Link>
        </div>
      </section>
    );
  }

  if (state === 'checking') {
    return (
      <section className="join-done">
        <div className="wrap join-done-inner">
          <p>Verifying your link…</p>
        </div>
      </section>
    );
  }

  if (state === 'link-used') {
    return (
      <section className="join-done">
        <div className="wrap join-done-inner">
          <h1>This link is no longer valid</h1>
          <p>
            This link has either already been used or has expired. If you have
            already set your password, please log in.
          </p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </section>
    );
  }

  if (duplicate) {
    return (
      <ResendVerify email={f.email} title="Email already registered" message={msg}>
        <Link to="/login/" className="btn-outline">Sign in</Link>
        <button
          type="button"
          className="link-soft"
          onClick={() => {
            setDuplicate(false);
            setState('idle');
            setMsg('');
          }}
        >
          Use a different email
        </button>
      </ResendVerify>
    );
  }
  return (
    <section className={`join theme-${f.type === 'pro' ? 'pro' : f.type === 'minor' ? 'minor' : 'consumer'}`}>
      <div className="join-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <AuthAura aud={f.type === 'pro' || f.type === 'minor' ? f.type : 'consumer'} />
      <div className="wrap join-grid">
        <div className="join-side">
          <Breadcrumbs items={[{ label: 'Join free' }]} />
          <h1>{f.type === 'minor' ? 'Get on the teen panel' : 'Create your free account'}</h1>
          <p className="join-tag" key={`tag-${f.type === 'minor' ? 'm' : 'x'}`}>
            {(f.type === 'minor' ? 'Two keys. One voice. Yours.' : 'Two minutes now. Rewards for every survey after.').split(' ').map((w, i) => (
              <span key={i} style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="join-lead">{f.type === 'minor' ? 'Free, always. You sign up, we invite your parent or guardian, and the account switches on once you both say yes.' : 'No fees, no investment – just honest answers. Unlock each step below as you go.'}</p>
          <MemberCard f={f} step={step} />
          <AuthVoice aud={f.type === 'pro' || f.type === 'minor' ? f.type : 'consumer'} />
        </div>

        <div className="join-card">
          <span className="join-card-ring" aria-hidden="true" />
          <ol className="stepper" aria-label="Sign-up progress">
            {(f.type === 'minor' ? TEEN_STEPS : STEPS).map((s, i) => (
              <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
                <span className="stepper-dot">{i < step ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name={STEP_ICONS[i]} size={15} />}</span>
                <span className="stepper-label">{s}</span>
              </li>
            ))}
            <span className="stepper-bar" style={{ '--p': step / (STEPS.length - 1) }} aria-hidden="true" />
          </ol>

          <form ref={formRef} onSubmit={step === 0 ? next : step === 1 ? submitPassword : submitProfile} noValidate key={step} className="join-step">
            {/* ================= STEP 0: ABOUT YOU ================= */}
            {step === 0 && (
              <>
                <div className="type-toggle is-three" role="radiogroup" aria-label="I am joining as">
                  {[
                    ['consumer', 'Consumer', 'users', 'Everyday opinions on products & life'],
                    ['pro', 'Business professional', 'briefcase', 'Also get B2B & workplace studies'],
                    ['minor', 'Teen · 13–17', 'sparkles', 'Teen panel, with a parent’s permission']
                  ].map(([v, l, ic, d]) => (
                    <button type="button" role="radio" aria-checked={f.type === v} key={v} className={`type-opt to-${v} ${f.type === v ? 'is-on' : ''}`} onClick={() => {
                      if (f.type !== v) playAudience(v);
                      set('type', v);
                    }}>
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
                {f.type === 'minor' && (
                  <p className="minor-join-note" key="mjn">
                    <span className="mjn-keys" aria-hidden="true">
                      <i>🔑</i>
                      <i>🔑</i>
                    </span>
                    <span>
                      <strong>Two keys switch your account on.</strong> After you sign up we email your parent or guardian. They say yes, you say yes in your own words, and only then do surveys start. <a href="/earn/teens/">How the teen panel works</a>
                    </span>
                  </p>
                )}
                <div className="form-grid two">
                  <div data-k="firstName">
                    <Field id="j-first" label="First name" error={errOf('firstName')} valid={okOf('firstName')}>
                      <input id="j-first" className="input" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={touch('firstName')} autoComplete="given-name" maxLength={49} aria-invalid={!!errOf('firstName')} />
                    </Field>
                  </div>
                  <div data-k="lastName">
                    <Field id="j-last" label="Last name" error={errOf('lastName')} valid={okOf('lastName')}>
                      <input id="j-last" className="input" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={touch('lastName')} autoComplete="family-name" maxLength={49} aria-invalid={!!errOf('lastName')} />
                    </Field>
                  </div>
                </div>
                <div data-k="email">
                  <Field id="j-email" label="Email address" error={errOf('email')} valid={okOf('email')} hint="We’ll send a verification link here.">
                    <input id="j-email" className="input" type="email" value={f.email} onChange={(e) => { set('email', e.target.value); setEmailErr(''); }}
onBlur={() => { touch('email')(); checkEmail(); }} autoComplete="email" maxLength={120} aria-invalid={!!errOf('email')} />
                  </Field>
                </div>
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
                    hint={f.type === 'minor' ? 'Teen panel: only birthdays for ages 13 to 17 can be picked. Other years are switched off.' : 'Full date: day, month and year. It can’t be changed later.'}
                  >
                    {f.type === 'minor' ? (
                      <DateField
                        key="dob-teen"
                        id="j-dob"
                        value={f.dob}
                        onChange={(v) => { set('dob', v); setTouched((t) => ({ ...t, dob: true })); }}
                        invalid={!!errOf('dob')}
                        minDate={teen.min}
                        maxDate={teen.max}
                        lockedYears={4}
                        foot="Ages 13–17 only. Greyed-out years and days can’t be picked."
                      />
                    ) : (
                      <DateField key="dob-all" id="j-dob" value={f.dob} onChange={(v) => { set('dob', v); setTouched((t) => ({ ...t, dob: true })); }} invalid={!!errOf('dob')} />
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
                      <span>
                        {birthdayInfo(f.dob).days === 0 ? 'Happy birthday today! 🎉' : `Next birthday: ${birthdayInfo(f.dob).label} · in ${birthdayInfo(f.dob).days} days`}
                      </span>
                    </p>
                  )}
                </div>
                {minor && f.type !== 'minor' && !live.dob && (
                  <p className="inline-note">
                    <Icon name="users" size={16} /> As you’re under 18, we’ll ask for a parent or guardian email on the last step.
                  </p>
                )}
                <div data-k="gender">
                  <Field
                    id="j-gender"
                    label={
                      <span className="lbl-ico">
                        <span className="gl-duo" aria-hidden="true">
                          <i />
                          <i />
                        </span>{' '}
                        Gender
                      </span>
                    }
                    error={errOf('gender')}
                  >
                    <div className="gender-pick" role="radiogroup" aria-label="Gender" id="j-gender">
                      {GENDERS.map((g, i) => (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={f.gender === g}
                          key={g}
                          className={`gp-opt ${f.gender === g ? 'is-on' : ''}`}
                          style={{ '--gc': GENDER_META[g].c, '--i': i }}
                          onClick={() => { set('gender', g); setTouched((t) => ({ ...t, gender: true })); }}
                        >
                          <span className="gp-badge">
                            <GenderGlyph g={g} on={f.gender === g} />
                          </span>
                          <span className="gp-label">{g}</span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
                {f.type === 'minor' && <TeenParentBlock f={f} set={set} touch={touch} errOf={errOf} okOf={okOf} setTouched={setTouched} />}
                {state === 'error' && !duplicate && (
                  <p className="form-alert" role="alert">
                    {msg}
                  </p>
                )}
              </>
            )}

            {/* ================= STEP 1: SECURE YOUR ACCOUNT ================= */}
            {step === 1 && (
              <>
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
                <div className="consents">
                  <label className={`check ${errOf('terms') ? 'has-error' : ''}`} data-k="terms">
                    <input type="checkbox" checked={f.terms} onChange={(e) => set('terms', e.target.checked)} />
                    <span className="check-ui" />
                    <span>
                      I accept the <Link to="/terms/">Terms & Conditions</Link> and <Link to="/privacy/">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errOf('terms') && <p className="field-error">{errOf('terms')}</p>}
                  <label className={`check ${errOf('research') ? 'has-error' : ''}`} data-k="research">
                    <input type="checkbox" checked={f.research} onChange={(e) => set('research', e.target.checked)} />
                    <span className="check-ui" />
                    <span>I agree to take part in surveys and other market research activities.</span>
                  </label>
                  {errOf('research') && <p className="field-error">{errOf('research')}</p>}
                  <label className="check">
                    <input type="checkbox" checked={f.marketing} onChange={(e) => set('marketing', e.target.checked)} />
                    <span className="check-ui" />
                    <span>Send me tips, reward news and the occasional newsletter (optional).</span>
                  </label>
                </div>
                {f.type === 'minor' && <TeenAssent f={f} set={set} errOf={errOf} />}
                <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
                {captchaErr && <p className="field-error">{captchaErr}</p>}
                {state === 'error' && (
                  <p className="form-alert" role="alert">
                    {msg}
                  </p>
                )}
              </>
            )}

            {/* ================= STEP 2: CONTACT & PROFILE ================= */}
            {step === 2 && (
              <>
                {/* <div data-k="country">
                  <Field id="j-country" label="Country of residence" error={errOf('country')} valid={!!f.country} hint="We check this against your location for every survey.">
                    <CountryPicker id="j-country" value={f.country} onChange={(c) => { set('country', c); set('dial', c); setTouched((t) => ({ ...t, country: true })); }} invalid={!!errOf('country')} />
                  </Field>
                </div> */}
                <div data-k="phone">
                  <Field id="j-phone" label="Mobile number" error={errOf('phone')} valid={okOf('phone')} hint="We’ll text you a one-time code to verify it.">
                    <PhoneField id="j-phone" country={f.dial} number={f.phone} onCountry={(c) => set('dial', c)} onNumber={(v) => set('phone', v)} onBlur={touch('phone')} invalid={!!errOf('phone')} />
                  </Field>
                </div>
                {f.type === 'pro' && (
                  <fieldset className="pro-fields">
                    <legend>
                      <Icon name="briefcase" size={16} /> Your work
                    </legend>
                    <div className="form-grid two">
                      {/* <div data-k="jobTitle">
                        <Field id="j-job" label="Job title" error={errOf('jobTitle')} valid={okOf('jobTitle')}>
                          <input id="j-job" className="input" value={f.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} onBlur={touch('jobTitle')} maxLength={80} autoComplete="organization-title" list="job-suggest" />
                          <datalist id="job-suggest">
                            {jobOptions.map((t) => (
                              <option key={t.id ?? t} value={t.label ?? t} />
                            ))}
                          </datalist>
                        </Field>
                      </div>
                      <div data-k="industry">
                        <Field id="j-ind" label="Industry" error={errOf('industry')} valid={!!f.industry}>
                          <select id="j-ind" className="input" value={f.industry} onChange={(e) => { set('industry', e.target.value); setTouched((t) => ({ ...t, industry: true })); }}>
                            <option value="">Select industry</option>
                            {industryOptions.map((i) => (
                              <option key={i.id ?? i} value={i.id ?? i}>{i.label ?? i}</option>
                            ))}
                            <option>Other</option>
                          </select>
                        </Field>
                      </div> */}

                      {WORK_LEVELS.map((lvl, idx) => {
                        const opts = workOpts[lvl.key] || [];
                        const disabled = (lvl.parent && !f[lvl.parent]) || workLoading[lvl.key];
                        return (
                          <div data-k={lvl.key} key={lvl.key}>
                            <Field id={`j-${lvl.key}`} label={lvl.label} error={errOf(lvl.key)} valid={okOf(lvl.key)}>
                              <select
                                id={`j-${lvl.key}`}
                                className="input"
                                value={f[lvl.key]}
                                disabled={disabled}
                                onChange={(e) => onWorkChange(idx, e.target.value)}
                              >
                                <option value="">{workLoading[lvl.key] ? 'Loading…' : `Select ${lvl.label.toLowerCase()}`}</option>
                                {opts.map((o) => (
                                  <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                              </select>
                            </Field>
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
                {f.type === 'minor' && <TeenKeys f={f} stage={1} />}
                {minor && (
                  <div data-k="guardianEmail">
                    <Field id="j-guardian" label="Parent or guardian email" error={errOf('guardianEmail')} valid={okOf('guardianEmail')} hint={f.type === 'minor' ? 'This is where their permission form goes. Check it’s right before you finish.' : 'We’ll let them know you’ve joined. They can ask us to pause or delete your account anytime.'}>
                      <input id="j-guardian" className="input" type="email" value={f.guardianEmail} onChange={(e) => set('guardianEmail', e.target.value)} onBlur={touch('guardianEmail')} maxLength={120} />
                    </Field>
                  </div>
                )}
                <div className="field">
                  <p className="field-label">Send me survey invitations by</p>
                  <div className="channel-toggles">
                    {CHANNELS.map(([k, l, ic]) => (
                      <label key={k} className={`ch-toggle ${f.channels[k] ? 'is-on' : ''}`}>
                        <input type="checkbox" checked={f.channels[k]} onChange={(e) => set('channels', { ...f.channels, [k]: e.target.checked })} />
                        <Icon name={ic} size={18} /> {l}
                      </label>
                    ))}
                    <span className="ch-toggle is-on is-locked">
                      <Icon name="dashboard" size={18} /> Dashboard (always on)
                    </span>
                  </div>
                </div>
                {state === 'error' && (
                  <p className="form-alert" role="alert">
                    {msg}
                  </p>
                )}
              </>
            )}

            <div className="join-actions">
              <button type="submit" className="btn btn-primary btn-lg btn-shimmer" disabled={state === 'sending'}>
                {step === 2 ? (
                  state === 'sending' ? (
                    'Creating your account…'
                  ) : (
                    <>
                      Create my free account <Icon name="sparkles" size={18} />
                    </>
                  )
                ) : state === 'sending' ? (
                  'Please wait…'
                ) : (
                  <>
                    Continue <Icon name="arrow" size={18} />
                  </>
                )}
              </button>
            </div>

            {step === 0 && <SocialAuth />}
            
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