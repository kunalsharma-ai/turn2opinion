// The Teen's "family record" (23 Nov 2026): everything the guardian submitted during the Teen
// registration, mapped question by question from the forms that collected it.
//
// Source: GET /api/v1/user/teen-profile -> data.family (backend utils/teenFamily.js). The API sends
// the record only after the guardian said YES, finished the onboarding form and gave consent;
// before that it sends { state: 'pending' | 'declined' | 'withdrawn' } and no answers.
//
// Nothing here is invented: every row is a question from data/teen/parentSurvey.js (the onboarding
// form), data/teen/agreement.js (the consent form) or data/teen/registration.js (the teen's own
// confirmations), with the stored answer, or "Not provided" when there is none.
import { PARENT_SURVEY } from '../../data/teen/parentSurvey.js';
import { MINOR_PROFILES } from '../../data/teen/teenProfiles.js';
import { CHAPTERS, DECLARATION, EN, SECTIONS, SELECTIONS, TERMS_VERSION } from '../../data/teen/agreement.js';
import { TEEN_STATEMENTS, relWord } from '../../data/teen/registration.js';
import { answerText, isShown } from '../../components/survey/QInput.jsx';

export const has = (v) => v != null && v !== '' && !(Array.isArray(v) && !v.length);

const AGE_BANDS = { P05: 'Age band (worked out from the date of birth)' };

/** One row per question of the onboarding form, in form order, grouped by its sections. */
export function onboardingRows(a = {}) {
  return PARENT_SURVEY.sections.map((s) => {
    const rows = [];
    for (const q of s.qs) {
      // a follow-up question that only appears for some answers (HQ4) is listed only when it applied
      if (q.when && !isShown(q, a)) continue;
      let value = '';
      if (q.n === 'P08' || q.n === 'P09') value = a[q.n] || ''; // masked by the API, shown as sent
      else value = answerText(q, a);
      rows.push({ key: q.n, q: q.q, value, required: !!q.req });
      if (q.derive && has(a[q.derive])) rows.push({ key: q.derive, q: AGE_BANDS[q.derive] || q.derive, value: String(a[q.derive]), required: false, derived: true });
    }
    const answered = rows.filter((r) => has(r.value)).length;
    return { name: s.name, icon: s.icon, optional: !!s.optional, rows, answered, skipped: s.optional && answered === 0 };
  });
}

/** Look up one onboarding answer as readable text. */
export function onboardingAnswer(a, key) {
  for (const s of PARENT_SURVEY.sections) {
    const q = s.qs.find((x) => x.n === key);
    if (q) return key === 'P08' || key === 'P09' ? a[key] || '' : answerText(q, a);
  }
  return has(a[key]) ? String(a[key]) : '';
}

/** The six consent selections with their exact wording and what the guardian chose. */
export function consentSelections(sel = {}) {
  return SELECTIONS.map((s) => ({
    id: s.id,
    emoji: s.emoji,
    required: s.required,
    kind: EN[s.kind] || (s.required ? 'Required' : 'Optional'),
    title: EN[`c_${s.id}_k`] || s.id,
    text: EN[`c_${s.id}`] || '',
    refs: s.refs,
    given: sel[s.id] === true,
    recorded: Object.prototype.hasOwnProperty.call(sel, s.id)
  }));
}

export const declaration = () => DECLARATION;
export const agreementVersion = TERMS_VERSION;

/** The agreement as chapters of sections, for the full consent form view. */
export function agreementChapters() {
  return CHAPTERS.map((c) => ({ ...c, items: c.sections.map((n) => ({ n, ...SECTIONS[String(n)] })) }));
}
export const rewardsChapter = () => agreementChapters().find((c) => c.id === 'rewards');
/** The declaration line about rewards ("participation does not guarantee a reward…"). */
export const rewardDeclaration = () => DECLARATION.find((d) => /reward/i.test(d)) || '';

/** The teen's own step-3 confirmations, with their wording, and whether each was recorded. */
export function teenStatements(teenConsent, relation) {
  const rel = relWord(relation);
  const got = new Set(teenConsent?.statements || []);
  return TEEN_STATEMENTS.map((s) => ({
    id: s.id,
    icon: s.icon,
    text: `${s.text(rel)}${s.link ? ` ${s.link[1]}` : ''}${s.after || ''}`,
    given: got.has(s.id)
  }));
}

/** The teen's own participation preferences ("Taking part" and "Topics & updates" profiles). */
export function participationRows(answers = {}) {
  const ids = ['minor__research', 'minor__topics'];
  return MINOR_PROFILES.filter((p) => ids.includes(p.id)).map((p) => ({
    name: p.name,
    icon: p.icon,
    rows: p.sections.flatMap((s) => s.qs).filter((q) => isShown(q, answers)).map((q) => ({ key: q.n, q: q.q, value: answerText(q, answers) }))
  }));
}

/** Registration journey from the real timestamps the API recorded. */
export function journey(f, teenConsentAt) {
  const tl = f?.timeline || {};
  return [
    { id: 'reg', label: 'You registered', at: teenConsentAt || tl.requestedAt },
    { id: 'yes', label: 'Guardian said YES', at: tl.decisionAt },
    { id: 'onb', label: 'Onboarding form sent', at: tl.onboardingAt },
    { id: 'con', label: 'Consent given', at: tl.consentAt || f?.consent?.acceptedAt },
    { id: 'act', label: 'Your account switched on', at: f?.status === 'account-active' ? tl.consentAt || f?.consent?.acceptedAt : null, done: f?.status === 'account-active' }
  ].map((s) => ({ ...s, done: s.done ?? !!s.at }));
}

// ---------------------------------------------------------------- design preview only
// Used only when the site is built with VITE_DEMO_MODE (the single-file design preview). The live
// site never reads it. Keys are the real questionnaire keys, so the preview shows the real mapping.
export const DEMO_FAMILY = {
  ref: 'T2O-TN-4F2A9C',
  status: 'account-active',
  answers: { D01: '15', D02: 'IN', D03: 'IN-MH', D06: 'Female', D05: 'en', R01: ['surveys', 'products'], R02: '6-10', R03: 'weekly', A19: ['gaming', 'entertainment', 'tech'] },
  family: {
    state: 'approved',
    status: 'account-active',
    guardian: { relation: 'mother', name: { first: 'Meera', middle: '', last: 'Shah' }, gender: null, email: 'm••••••h@e•••••.com', phone: '••••••678' },
    timeline: {
      requestedAt: '2026-11-10T09:12:00.000Z',
      openedAt: '2026-11-10T18:02:00.000Z',
      decisionAt: '2026-11-10T18:03:00.000Z',
      onboardingAt: '2026-11-10T18:09:00.000Z',
      consentAt: '2026-11-10T18:14:00.000Z'
    },
    decision: 'yes',
    needsReview: false,
    onboarding: {
      'parent-first-name': 'Meera', 'parent-last-name': 'Shah', 'parent-gender': 'Female', 'parent-dob': '1984-05-02', P05: '35-44',
      P01: 'IN', P02: 'IN-MH', P03: 'mother', 'parent-marital': 'Married', P04: 'yes', P11: '2',
      P06: 'en', P07: ['email', 'whatsapp'], P08: 'm••••••h@e•••••.com', P09: '••••••678', P12: 'yes',
      HQ1: ['allergy'], HQ2: 'primary', HQ4: ['medication', 'appointments'],
      // parent profiling (Teen bank questions answered by the guardian)
      'teen-p008': 'Yes', 'teen-p009': ['Surveys'], 'teen-p010': 'Weekly',
      'teen-g003': 'Metropolitan', 'teen-g004': 'Since birth', 'teen-g005': ['English', 'Hindi'], 'teen-g006': 'Hindi',
      'teen-h001': '4', 'teen-h002': '2', 'teen-h003': ['13–15', '18+'], 'teen-h004': 'Yes', 'teen-h005': 'Owned apartment', 'teen-h006': ['Dog'], 'teen-h007': ['Internet', 'Study area', 'Computer'],
      'teen-s001': 'Full-time', 'teen-s002': 'Master’s', 'household-income': '500000 - 749999', 'teen-s004': '2', 'teen-s005': ['Car', 'Computer', 'Smart TV']
    },
    consent: {
      version: 'MINOR-2026.10', acceptedAt: '2026-11-10T18:14:00.000Z', termsRead: true, declaration: true,
      selections: { participation: true, privacy: true, contact: true, studyContact: true, recording: false, sensitive: false },
      teenRegistrationRef: 'T2O-TN-4F2A9C', teenConsentVersion: 'T2O-TEEN-REG-2026.11', verifiedVia: 'email-link'
    },
    teenConsent: { version: 'T2O-TEEN-REG-2026.11', statements: ['guardian-aware', 'terms', 'privacy', 'teen-notice', 'how-it-works', 'accurate', 'not-consent'], acceptedAt: '2026-11-10T09:12:00.000Z' }
  }
};
