// Teen registration (13–17): shared rules, wording and status map (21 Nov 2026).
// The ids here are the ids the API records (Project/backend/app/utils/teen.js); change both together.
import { SITE } from '../../config/site.js';

export const TEEN_REG_CONSENT_VERSION = 'T2O-TEEN-REG-2026.11';
export const GUARDIAN_TERMS_VERSION = 'MINOR-2026.10';

/** Age in whole years on a date, from an ISO yyyy-mm-dd birthday (birthday not yet reached = one less). */
export function exactAge(iso, now = new Date()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').slice(0, 10));
  if (!m) return null;
  const y = +m[1];
  const mo = +m[2] - 1;
  const d = +m[3];
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null; // 31 Feb etc.
  let a = now.getFullYear() - y;
  if (now.getMonth() < mo || (now.getMonth() === mo && now.getDate() < d)) a--;
  return a;
}

/** 'blocked' under 13, 'teen' 13–17, 'adult' 18+, 'future' / null for impossible dates. */
export function ageRoute(iso, now = new Date()) {
  if (!iso) return null;
  const dt = new Date(`${String(iso).slice(0, 10)}T00:00:00`);
  if (isNaN(dt)) return null;
  if (dt > now) return 'future';
  const a = exactAge(iso, now);
  if (a === null) return null;
  if (a < SITE.minAge) return 'blocked';
  if (a < SITE.adultAge) return 'teen';
  return 'adult';
}

/** Step 3: the teen's own confirmations. Each one is a separate, unticked box, and all are required. */
export const TEEN_STATEMENTS = [
  { id: 'guardian-aware', icon: '👪', text: (rel) => `My ${rel} knows I’m registering, and I agree that Turn2Opinion may email them an invitation, an onboarding form and a consent form.` },
  { id: 'terms', icon: '📜', link: ['/terms/', 'Terms & Conditions'], text: () => 'I have read and accept the' },
  { id: 'privacy', icon: '🔏', link: ['/privacy/', 'Privacy Policy'], text: () => 'I have read the', after: ', including the section on members under 18.' },
  { id: 'teen-notice', icon: '🧾', link: ['/teen/agreement/', 'Teen participation agreement'], text: () => 'I have read the', after: ' (the plain-language summary is enough), so I know how my information is used.' },
  { id: 'how-it-works', icon: '🔒', text: (rel) => `I understand my account stays switched off until my ${rel} says yes and completes the onboarding and consent forms, and that I can skip any question or stop at any time.` },
  { id: 'accurate', icon: '✅', text: (rel) => `The details I’ve given about me and my ${rel} are true and accurate.` },
  { id: 'not-consent', icon: '⚖️', text: (rel) => `I understand that ticking these boxes is my own agreement only. It does not replace my ${rel}’s consent.` }
];

/** Reasons a guardian can give for saying no. Ids match the API. */
export const DECLINE_REASONS = [
  ['not-now', 'I do not wish to enrol my Teen at this time.', '⏸️'],
  ['learn-more', 'I would like to understand the Teen Panel better before making a decision.', '📖'],
  ['privacy', 'I have concerns about privacy or the use of personal information.', '🔐'],
  ['activities', 'I have concerns about the surveys or activities.', '📋'],
  ['not-guardian', 'I am not the appropriate parent or legal guardian.', '🙅'],
  ['not-recognised', 'I did not initiate or recognise this registration request.', '❓'],
  ['other', 'Other', '✏️']
];

/** Teen gender options. The API stores Male / Female / Other; the exact answer is also saved as profile answer D06. */
export const TEEN_GENDERS = [
  ['Female', 'Female', '♀'],
  ['Male', 'Male', '♂'],
  ['Non-binary', 'Non-binary', '⚧'],
  ['Prefer not to say', 'Prefer not to say', '🤐'],
  ['self', 'Let me describe', '✏️']
];
export const apiGender = (g) => (g === 'Female' || g === 'Male' ? g : 'Other');

export const RELATIONS = [
  { id: 'mother', label: 'Mother', emoji: '👩', grade: ['#ff5e9c', '#ffb36b'], line: 'Mum, mom, ammi, maman…' },
  { id: 'father', label: 'Father', emoji: '👨', grade: ['#3a7bff', '#22e4ff'], line: 'Dad, papa, abbu, baba…' },
  { id: 'guardian', label: 'Legal guardian', emoji: '🛡️', grade: ['#8b5cf6', '#c8ff3a'], line: 'Someone legally responsible for you' }
];
export const relWord = (r) => (r === 'guardian' ? 'legal guardian' : r === 'mother' ? 'mother' : r === 'father' ? 'father' : 'parent or guardian');

/** The statuses the API reports (User.registrationStatus), in journey order, with plain labels. */
export const STATUS_LINE = [
  ['registration-started', 'Registration submitted', 'You filled in steps 1–3.'],
  ['parent-verification-pending', 'Waiting for your guardian', 'They choose Yes or No.'],
  ['onboarding-pending', 'Guardian said yes', 'They fill in the onboarding form.'],
  ['consent-pending', 'Consent form', 'They read the agreement and give permission.'],
  ['account-activation-pending', 'Create your password', 'We email you a secure link.'],
  ['account-active', 'Account active', 'Log in with your email.']
];
const AT = { 'registration-started': 0, 'parent-verification-pending': 1, 'parent-reviewing': 1, 'onboarding-pending': 2, 'consent-pending': 3, 'account-activation-pending': 4, 'account-active': 5 };
export const statusIndex = (s) => AT[s] ?? 1;
export const CLOSED = { 'registration-rejected': 'Registration not approved', 'registration-expired': 'Link expired', 'registration-cancelled': 'Registration cancelled', 'consent-withdrawn': 'Consent withdrawn' };

export function maskEmail(v) {
  const [u, d] = String(v || '').split('@');
  if (!d) return '';
  const [host, ...rest] = d.split('.');
  const mu = u.length <= 2 ? `${u[0] || ''}•` : `${u[0]}${'•'.repeat(Math.min(6, u.length - 2))}${u.slice(-1)}`;
  const mh = host.length <= 2 ? `${host[0] || ''}•` : `${host[0]}${'•'.repeat(Math.min(5, host.length - 1))}`;
  return `${mu}@${mh}.${rest.join('.')}`;
}

/** The welcome questions for Teens (after the first login), from the attached Teen Profile Survey,
 *  "The basics" and "School & learning". D01 age, D02 country, D03 region and D06 gender are already
 *  known from registration, so they are never asked again. */
export const TEEN_WELCOME_KEYS = ['D04', 'D05', 'D08', 'D09', 'D07'];
export const KNOWN_FROM_REGISTRATION = ['D01', 'D02', 'D03', 'D06'];
