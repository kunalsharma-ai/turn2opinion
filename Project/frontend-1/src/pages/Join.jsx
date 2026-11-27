// Free sign-up for the three panels.
//
// Consumer / Business professional (Round 15, Kunal 23 Nov 2026: no welcome questions, a
// dedicated Consent & Terms step, then straight into the dashboard):
//   1 Your details       First (required), Middle, Last, email, mobile, date of birth, gender,
//                        Country -> State / Province -> City -> ZIP / Postal code,
//                        (Professional) three optional "Your work" answers from the profile bank,
//                        privacy acknowledgement, CAPTCHA
//                        -> PUT /api/v1/user (address + location answers) -> account link by email
//   2 Confirm email      ?user=…&code=… from the email (the API requires the email check first)
//   3 Create password    AccountSetup: PATCH /api/v1/user sets the password AND logs the member in
//   4 Consent & terms    ConsentKit: the approved Consumer (v1.1.0) or Professional (v1.0.0) consent
//                        page, word for word, with its consent boxes -> PUT /api/v1/me { terms }
//   5 Dashboard          /member/dashboard/ (already signed in, no second login)
//
// Teen (13–17): a 13–17 birthday on the Consumer or Professional form moves the visitor here
// (the API checks the age again).
//   0 You · 1 Parent or guardian · 2 Consent & send
//   -> the parent/guardian gets the onboarding and consent form (/parent-consent/); the YES and NO
//      buttons in their email open that page at the matching question
//   -> after consent the teen gets a secure link back here (?user&code&activate=1) to choose a
//      password, which logs them in -> consent receipt -> the Teen dashboard. No password is ever
//      emailed.
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
import { redirectIfLoggedIn, termsUrl } from '../utils/session.js';
import ConsentKit from '../components/onboarding/ConsentKit.jsx';
import { saveAgreementTerms } from '../utils/consentTerms.js';
import ProWorkFields, { proWorkAnswers } from '../components/onboarding/ProWorkFields.jsx';
import { loadBank } from '../components/onboarding/WelcomeQuestions.jsx';
import { fullPhone, NAME_RE, phoneError, validateParent } from '../utils/signup.js';
import LocationFields, { locationErrors } from '../components/onboarding/LocationFields.jsx';
import AccountSetup from '../components/onboarding/AccountSetup.jsx';
import UnderThirteen from '../components/teen/UnderThirteen.jsx';
import { ageRoute, apiGender, maskEmail, TEEN_REG_CONSENT_VERSION, TEEN_STATEMENTS } from '../data/teen/registration.js';

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
// The same three choices for every segment (Consumer, Professional and Teen): what the account stores
// (User.gender is Male / Female / Other) and the options of the Basic profile's Gender question (issue #35).
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

export function GenderPicker({ id, value, onPick, label = 'Gender', error, options = GENDERS }) {
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
        {options.map((g, i) => (
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
        ['users', 'Parent consent', 'They get an onboarding form by email'],
        ['key', 'Your password', 'Link sent once they consent'],
        ['dashboard', 'Your dashboard', 'Opens as soon as your password is set']
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
// Adults fill in one page here; the next stages start from the email link and are shown for orientation.
const STEPS = ['Your details', 'Confirm email', 'Create password', 'Consent & terms', 'Dashboard'];
const STEP_ICONS = ['user', 'mail', 'key', 'clipboard', 'dashboard'];
const TEEN_STEPS = ['You', 'Parent or guardian', 'Consent & send'];
const TEEN_ICONS = ['user', 'users', 'shield'];
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
  noPostal: false,
  parent: EMPTY_PARENT,
  parentConfirm: false,
  ...Object.fromEntries(TEEN_CONSENTS.map(([k]) => [k, false])),
  channels: { email: true, sms: false, whatsapp: false },
  work: {},
  privacy: false
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

// Steps. Adults: 0 details (with consents and CAPTCHA). Teens: 0 you, 1 parent, 2 consent.
function validate(step, f) {
  const e = {};
  const teen = f.type === 'minor';
  if (step === 0) {
    // Only the first name is required; middle and last are checked only when filled in.
    if (!f.firstName.trim()) e.firstName = 'Enter your first name.';
    else if (!NAME_RE.test(f.firstName.trim())) e.firstName = 'Use letters only for your first name.';
    if (f.middleName.trim() && !NAME_RE.test(f.middleName.trim())) e.middleName = 'Use letters only.';
    if (f.lastName.trim() && !NAME_RE.test(f.lastName.trim())) e.lastName = 'Use letters only.';
    if (teen && !f.lastName.trim()) e.lastName = 'Enter your last name.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    const de = dobError(f.dob, f.type);
    if (de) e.dob = de;
    // a saved draft may still hold an older Teen choice (Non-binary, Prefer not to say): ask again
    if (!GENDERS.includes(f.gender)) e.gender = 'Select your gender.';
    if (!teen || f.phone.trim()) {
      const pe = phoneError(f.dial, f.phone);
      if (pe) e.phone = pe;
    }
    Object.assign(e, locationErrors(f));
  }
  if (teen && step === 1) {
    Object.assign(e, validateParent(f.parent, f.email));
    if (!f.parentConfirm) e.parentConfirm = 'Please confirm these are your parent or guardian’s real details.';
  }
  // The panel Terms & Conditions and research consents have their own step after the password.
  if (!teen && step === 0 && !f.privacy) e.privacy = 'Please accept the Privacy Policy to create your account.';
  if (teen && step === 2) {
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

/** "Email them again" on the Teen sent screen (the API answers the same way whatever happens). */
function TeenResend({ email, who }) {
  const [note, setNote] = useState('');
  return (
    <p className="teen-resend">
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        disabled={note === '…'}
        onClick={async () => {
          setNote('…');
          try {
            const r = await api.post('/api/v1/user/parent-consent-resend', { mail: email.trim().toLowerCase() });
            setNote(r?.message || 'Sent again.');
          } catch {
            setNote('We couldn’t send it right now. Please try again in a minute.');
          }
        }}
      >
        <Icon name="mail" size={16} /> Email my {who} again
      </button>
      {note && note !== '…' && <span role="status">{note}</span>}
    </p>
  );
}

/** Read-only summary of what will be sent (adult confirm step and Teen consent step). */
function ReviewCard({ f, journey, onEdit }) {
  const teen = journey === 'teen';
  const c = COUNTRIES.find((x) => x.c === f.country);
  const name = [f.firstName, f.middleName, f.lastName].map((s) => s.trim()).filter(Boolean).join(' ');
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
    </div>
  );
}

/** The five adult stages, shown on the details form and again on the password and consent steps. */
function AdultStepper({ step }) {
  return (
    <>
      <ol className="stepper is-five" aria-label="Sign-up progress">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
            <span className="stepper-dot">{i < step ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name={STEP_ICONS[i]} size={15} />}</span>
            <span className="stepper-label">{s}</span>
          </li>
        ))}
        <span className="stepper-bar" style={{ '--p': step / (STEPS.length - 1) }} aria-hidden="true" />
      </ol>
      <p className="join-progress-note">{`Step ${step + 1} of ${STEPS.length}`}</p>
    </>
  );
}

/** Teen: who gave consent and when, read from the signed-in Teen's own record. */
async function loadTeenReceipt(f) {
  const rel = (r) => (r ? relLabel(r) : 'Parent or guardian');
  if (ENV.DEMO_MODE) {
    let u = null;
    try {
      u = JSON.parse(sessionStorage.getItem('t2o_demo_signup'))?.user || null;
    } catch {
      u = null;
    }
    const p = u?.parent || f.parent || {};
    return { name: [p.name?.first || p.first, p.name?.last || p.last].filter(Boolean).join(' ') || 'Meera Shah', relation: rel(p.relation || p.rel || 'mother'), at: new Date().toISOString(), version: 'MINOR-2026.10' };
  }
  try {
    const r = await api.get('/api/v1/user/teen-profile');
    const g = r?.data?.guardian;
    if (!g) return null;
    const rec = (r.data.consents || []).find((c) => c.who === 'guardian');
    return { name: [g.name?.first, g.name?.last].filter(Boolean).join(' '), relation: rel(g.relation), at: g.approvedAt || rec?.at || null, version: rec?.version || null };
  } catch {
    return null;
  }
}

function ConsentReceipt({ info }) {
  if (!info) return null;
  const date = info.at ? new Date(info.at).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  return (
    <dl className="reg-receipt" aria-label="Parent or guardian consent">
      <div>
        <dt>Consent provided by</dt>
        <dd>
          {info.name || info.relation}
          {info.name ? ` (${info.relation.toLowerCase()})` : ''}
        </dd>
      </div>
      {date && (
        <div>
          <dt>Date</dt>
          <dd>{date}</dd>
        </div>
      )}
      {info.version && (
        <div>
          <dt>Consent version</dt>
          <dd>{info.version}</dd>
        </div>
      )}
      <div>
        <dt>Status</dt>
        <dd className="is-ok">
          <Icon name="check" size={16} strokeWidth={3} /> Consent given
        </dd>
      </div>
    </dl>
  );
}

/** Opens the dashboard a few seconds after the last step (the member is already signed in). */
function ToDashboard({ type, delay = 4 }) {
  const [left, setLeft] = useState(delay);
  const href = hrefFor('/member/dashboard/');
  const go = useCallback(() => {
    if (ENV.DEMO_MODE) {
      // preview only: open the matching demo dashboard
      try {
        localStorage.setItem('t2o_member_demo', JSON.stringify({ as: type, state: 'ready' }));
      } catch {
        /* ignore */
      }
    }
    window.location.assign(href);
  }, [href, type]);
  useEffect(() => {
    if (left <= 0) {
      go();
      return undefined;
    }
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left, go]);
  return (
    <>
      <p className="reg-redirect" role="status" aria-live="polite">
        <span className="btn-spin" aria-hidden="true" /> Opening your dashboard{left > 0 ? ` in ${left}…` : '…'}
      </p>
      <button type="button" className="btn btn-primary" onClick={go}>
        Go to my dashboard <Icon name="arrow" size={18} />
      </button>
    </>
  );
}

export default function Join() {
  const [f, setF] = useState(initial);
  const [answers, setAnswers] = useState({});
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
  const [under13, setUnder13] = useState(false);
  const [teenSent, setTeenSent] = useState(null); // { ref, parentMasked } from the API
  const [receipt, setReceipt] = useState(null); // Teen: who consented and when
  const formRef = useRef(null);
  const restored = useRef(false);

  const teen = f.type === 'minor';
  const journey = teen ? 'teen' : f.type === 'pro' ? 'pro' : 'consumer';
  const lastStep = teen ? 2 : 0;
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
    setF((p) => ({ ...p, type: v, dob: v === 'minor' && a !== null && a >= SITE.adultAge ? '' : p.dob, gender: !GENDERS.includes(p.gender) ? '' : p.gender }));
  };
  const onDob = (v) => {
    const a = ageOn(v);
    setTouched((t) => ({ ...t, dob: true }));
    // Under 13: no registration on any route. Nothing typed is kept (the API refuses it as well).
    if (ageRoute(v) === 'blocked') {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setF((p) => ({ ...initial, type: p.type, country: p.country, dial: p.dial }));
      setUnder13(true);
      return;
    }
    if (f.type !== 'minor' && isTeenAge(a)) {
      setF((p) => ({ ...p, dob: v, type: 'minor' }));
      setAnswers({});
      setAgeNotice(`You’re ${a}, so you join the Teen panel. Everything you typed is kept. Your parent or legal guardian must say yes before your account switches on.`);
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
      setStep(d.f.type === 'minor' ? Math.min(d.step || 0, 1) : 0);
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
    const sig = q.get('s') || '';
    if (!(user && code)) return;
    setState('checking');
    (async () => {
      try {
        const resp = await api.post(`/api/v1/user/${user}`, { channel: 'email', code, s: sig });
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
        setLink({ user, code, sig, teen: isTeenAccount, category: u.category });
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
    // Location (every panel), the optional Professional work answers, and contact channels go with
    // the request as ordinary profile answers. There are no welcome questions any more.
    const bank = f.type === 'pro' ? await loadBank().catch(() => null) : null;
    const welcome = {
      ...(f.type === 'pro' ? proWorkAnswers(bank, f.work) : {}),
      country: f.country,
      ...(f.state ? { state: f.state } : {}),
      city: f.city.trim(),
      ...(f.zipcode.trim() && !f.noPostal ? { zipcode: f.zipcode.trim() } : {}),
      // Teen: saved as profile answers, so the welcome questions and profiles never ask them again.
      ...(teen
        ? {
            D01: String(age),
            D02: f.country,
            ...(f.state ? { D03: f.state } : {}),
            D06: f.gender
          }
        : {}),
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
      gender: teen ? apiGender(f.gender) : f.gender,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      address: [{ tag: 'Home', country: f.country.toLowerCase(), state: f.state || undefined, city: f.city.trim(), zipcode: f.noPostal ? undefined : f.zipcode.trim() || undefined }],
      terms: teen ? ['privacy-policy', 'video-concent'] : ['privacy-policy'],
      welcome,
      ...(teen
        ? {
            parent: {
              relation: p.rel,
              name: { first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim() },
              email: p.email.trim().toLowerCase(),
              ...(p.phone.trim() ? { phone: fullPhone(p.dial, p.phone) } : {}),
              dob: p.dob,
              ...(p.rel === 'guardian' ? { gender: p.gender } : {})
            }
          }
        : {}),
      ...(teen ? { teenConsent: { version: TEEN_REG_CONSENT_VERSION, statements: TEEN_STATEMENTS.map((s) => s.id) } } : {}),
      ...(ref ? { referredBy: ref } : {}),
      captcha: captchaPayload(captcha)
    };
    try {
      const res = await api.put('/api/v1/user', body);
      if (res?.status === 'success' && teen) setTeenSent({ ref: res.data?.ref, parentMasked: res.data?.parentMasked || maskEmail(p.email) });
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
            <Icon name="mail" size={14} /> Confirm your email (open the link)
          </li>
          <li>
            <Icon name="key" size={14} /> Create your password
          </li>
          <li>
            <Icon name="clipboard" size={14} /> {f.type === 'pro' ? 'Professional' : 'Consumer'} Consent &amp; Terms
          </li>
          <li>
            <Icon name="dashboard" size={14} /> Your dashboard, already signed in
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
      <Done icon="users" title={`Sent! Now it’s your ${relLabel(f.parent.rel).toLowerCase()}’s turn`}>
        <p>
          We emailed an invitation to <strong>{teenSent?.parentMasked || maskEmail(f.parent.email)}</strong> and a confirmation to you at <strong>{maskEmail(f.email)}</strong>. They choose <strong>Yes</strong> or{' '}
          <strong>No</strong>. If they say yes, they fill in a short onboarding form and the consent form.
        </p>
        <p className="teen-inactive">
          <Icon name="lock" size={16} />
          <span>
            <strong>Your account is not active yet.</strong> It switches on only after they say yes and complete both forms. Then we email you a secure link to create your password, and you log in with{' '}
            <strong>{f.email}</strong>.
          </span>
        </p>
        <TeenStatus stage="parent-verification-pending" parentEmail={teenSent?.parentMasked || maskEmail(f.parent.email)} />
        {teenSent?.ref && (
          <p className="teen-ref">
            Registration reference <strong>{teenSent.ref}</strong>
          </p>
        )}
        <TeenResend email={f.email} who={relLabel(f.parent.rel).toLowerCase()} />
        <PreviewLinks links={[['Open the guardian’s invitation', '?user=demo-teen&code=000000&s=demo', '/parent-consent/']]} />
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
        <p>Your parent or guardian has consented and your password is set. You are signed in. Next time, log in with your email address.</p>
        <TeenStatus stage="account-active" />
        <ConsentReceipt info={receipt} />
        <ToDashboard type="teen" />
      </Done>
    );
  if (state === 'to-dashboard')
    return (
      <Done icon="check" title="Account created 🎉">
        <p>You are signed in, and your consent choices are saved. You can change the optional ones any time in Settings.</p>
        <ToDashboard type={f.type === 'pro' ? 'pro' : 'consumer'} />
      </Done>
    );
  // ================= Consent & Terms (logged in, after the password) =================
  if (state === 'consent') {
    const kind = f.type === 'pro' || link?.category === 'b2b' ? 'pro' : 'consumer';
    return (
      <section className={`join theme-${kind} is-setup at-step-3 join--kit`}>
        <div className="wrap join-kit-head">
          <AdultStepper step={3} />
          <p className="join-kit-lead">Your password is set and you are signed in. Read your panel agreement and choose your permissions. Your dashboard opens right after.</p>
        </div>
        <ConsentKit
          kind={kind}
          label={kind === 'pro' ? 'Professional Consent & Terms' : 'Consumer Consent & Terms'}
          config={{
            member: { id: link?.user || '', firstName: f.firstName.trim(), email: f.email.trim(), country: f.country },
            continueUrl: '',
            logoutUrl: '',
            // the package keeps its "saving" state and its retry message while this runs
            save: async (rec) => {
              await saveAgreementTerms(kind, rec.consents);
              track('sign_up_consent_saved', { category: f.type });
              // Marks the old welcome questionnaire as done (no questions are asked), so the
              // existing member pages never show it, and keeps the chosen contact channels.
              if (!ENV.DEMO_MODE)
                api
                  .put('/api/v1/user/welcome', { welcome: { 'communication-methods': Object.keys(f.channels).filter((k) => f.channels[k]).concat('dashboard') } })
                  .catch(() => {});
              return {};
            },
            // "Continue to your dashboard" on the package's receipt
            onContinue: () => {
              setState('to-dashboard');
              window.scrollTo({ top: 0 });
            },
            // "Not now" -> "Log out"
            onDecline: async () => {
              if (!ENV.DEMO_MODE) await api.delete('/api/v1/me').catch(() => {});
              window.location.assign(hrefFor('/'));
            }
          }}
        />
      </section>
    );
  }
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
            <p className="join-lead">{link.teen ? 'Your parent or guardian said yes. Create a password you’ll remember.' : 'Your email is confirmed. Create your password: it signs you in. Your Consent & Terms come next, then your dashboard.'}</p>
            <MemberCard f={f} step={2} />
          </div>
          <div className="join-card">
            <span className="join-card-ring" aria-hidden="true" />
            {!link.teen && <AdultStepper step={2} />}
            {link.teen && <TeenStatus stage="account-activation-pending" />}
            <AccountSetup
              user={link.user}
              code={link.code}
              firstName={f.firstName}
              lastName={f.lastName}
              email={f.email}
              teen={link.teen}
              sig={link.sig}
              onLinkUsed={() => setState('link-used')}
              onTeenWaiting={() => setState('teen-waiting')}
              onDone={() => {
                window.history.replaceState(null, '', window.location.pathname + window.location.hash);
                track('sign_up_account_created', { category: f.type });
                if (link.teen) {
                  loadTeenReceipt(f).then(setReceipt);
                  return setState('teen-active');
                }
                // Signed in now (the password call sets the session): the Consent & Terms step.
                setState('consent');
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        </div>
      </section>
    );

  // ================= under 13: no registration =================
  if (under13)
    return (
      <section className={`join theme-${aud} trg-blocked`}>
        <div className="wrap">
          <UnderThirteen
            onBack={() => {
              setUnder13(false);
              setTouched({});
            }}
          />
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
  // Only the privacy acknowledgement for the details typed here. The panel Terms & Conditions and
  // every research and marketing consent are on their own Consent & Terms step after the password.
  const consents = (
    <div className="consents">
      <Consent k="privacy" f={f} set={set} errOf={errOf}>
        I have read and accept the{' '}
        <a href={hrefFor('/privacy/')} target="_blank" rel="noopener">
          Privacy Policy
        </a>
        , including how my data is used for research.
      </Consent>
      <p className="consents-note">
        <Icon name="clipboard" size={14} /> Your {f.type === 'pro' ? 'Professional' : 'Consumer'} Consent &amp; Terms come on their own step, after you create your password.
      </p>
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
    <section className={`join theme-${aud} at-step-${step}`}>
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
              ? 'For ages 13 to 17. You fill in your details and your parent or guardian’s. They get an onboarding and consent form by email, and your account switches on only after they consent.'
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
            {teen ? `Step ${step + 1} of ${steps.length} · nothing is sent until the last step` : `Step 1 of ${steps.length} · the next steps start from the link we email you`}
          </p>

          {(
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
                        <strong>Parent or guardian consent is required.</strong> First your details, then theirs. They receive an onboarding form by email and your account switches on only after they
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
                      <Field id="j-email" label="Email address" error={errOf('email')} valid={okOf('email')} hint={teen ? 'Your own email. Your account link comes here after your parent consents.' : 'Your account link comes here.'}>
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
                        hint={teen ? 'Teen panel: ages 13 to 17. Under 13 can’t register yet.' : 'Full date: day, month and year. It places you in the right panel and can’t be changed later.'}
                      >
                        {teen ? (
                          <DateField key="dob-teen" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} minDate={teenDates.min} maxDate={new Date()} lockedYears={2} foot="Ages 13–17. Turned 18? Pick Consumer or Business professional." />
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
                    <LocationFields loc={f} set={set} errOf={errOf} touch={touch} idp="j-loc" freeState noPostal={f.noPostal} onNoPostal={(v) => { set('noPostal', v); if (v) set('zipcode', ''); }} />
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
                      <Field id="j-middle" label="Middle name" error={errOf('middleName')}>
                        <input id="j-middle" className="input" value={f.middleName} onChange={(e) => set('middleName', e.target.value)} onBlur={touch('middleName')} autoComplete="additional-name" maxLength={49} />
                      </Field>
                    </div>
                  )}
                  <div data-k="lastName">
                    <Field id="j-last" label="Last name" error={errOf('lastName')} valid={okOf('lastName') && !!f.lastName.trim()}>
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
                    hint={teen ? 'Teen panel: ages 13 to 17. Under 13 can’t register yet.' : 'Full date: day, month and year. We use it to place you in the right panel; it can’t be changed later.'}
                  >
                    {teen ? (
                      <DateField key="dob-teen" id="j-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} minDate={teenDates.min} maxDate={new Date()} lockedYears={2} foot="Ages 13–17. Turned 18? Pick Consumer or Business professional." />
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
                    <fieldset className="jf-group">
                      <legend>
                        <Icon name="pin" size={15} /> Where you live
                      </legend>
                      <LocationFields loc={f} set={set} errOf={errOf} touch={touch} idp="j-loc" freeState noPostal={f.noPostal} onNoPostal={(v) => { set('noPostal', v); if (v) set('zipcode', ''); }} />
                    </fieldset>
                    {f.type === 'pro' && <ProWorkFields work={f.work || {}} onChange={(w) => set('work', w)} />}
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
                    journey={journey}
                    onEdit={(s) => goStep(s)}
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
                    onClick={() => goStep(step - 1)}
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
                      Continue <Icon name="arrow" size={18} />
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

export { termsUrl };
