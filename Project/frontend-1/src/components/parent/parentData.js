// The Teen panel's Parent & guardian section (24 Nov 2026): statuses, progress and the reward guide.
// Shared by the guardian's secure page (/parent-consent/) and the Teen's profile (/member/profile/#family).
//
// Nothing here is invented. Every reward fact quotes, or points to, one of:
//   - the agreement the guardian accepts (data/teen/agreement.js, MINOR-2026.10): sections 7, 14 and 16,
//     the declaration and Part D (the study card shown before every survey);
//   - the platform's own rules in the code: survey points count only for responses recorded "complete"
//     (backend ResponseController.getPoints), profile points are credited once when a profile reaches 100%
//     (backend utils/profileRewards.js), the payout milestone is the panel's thresholdPoints (GET /me/points),
//     and Teens earn no referral rewards (member area, Referrals page).
import { PARENT_SURVEY } from '../../data/teen/parentSurvey.js';
import { DECLARATION, SECTIONS, SELECTIONS, TERMS_VERSION, CHAPTERS } from '../../data/teen/agreement.js';
import { answerText, isRequired, isShown, qError } from '../survey/QInput.jsx';

export const has = (v) => v != null && v !== '' && !(Array.isArray(v) && !v.length);

/** Labels the person sees for each status. */
export const ONB_LABEL = { 'not-started': 'Not started', 'in-progress': 'In progress', completed: 'Completed', 'not-on-record': 'Not on record' };
export const CON_LABEL = { 'not-started': 'Not started', pending: 'Pending', submitted: 'Submitted', locked: 'Not started' };
export const tone = (s) => (['completed', 'submitted', 'open', 'done'].includes(s) ? 'ok' : ['in-progress', 'pending'].includes(s) ? 'warn' : 'off');

/** Every question of the onboarding form that is shown for these answers, with its section. */
export function shownQuestions(a = {}) {
  return PARENT_SURVEY.sections.flatMap((s, si) => s.qs.filter((q) => isShown(q, a)).map((q) => ({ q, si, optional: !!s.optional })));
}

const answered = (q, a) => (q.kind === 'name' ? has(a[q.fields[0]]) : has(a[q.n]));

/** How far the onboarding form is: answered / shown questions, and required ones still missing. */
export function onboardingProgress(a = {}) {
  const list = shownQuestions(a);
  const done = list.filter(({ q }) => answered(q, a)).length;
  const req = list.filter(({ q }) => isRequired(q, a));
  const reqLeft = req.filter(({ q }) => qError(q, a)).length;
  return { done, total: list.length, req: req.length, reqLeft, pct: list.length ? Math.round((done / list.length) * 100) : 0 };
}

/** One section's progress, for the section list beside the form. */
export function sectionProgress(sec, a = {}) {
  const qs = sec.qs.filter((q) => isShown(q, a));
  const done = qs.filter((q) => answered(q, a)).length;
  const errors = qs.filter((q) => qError(q, a)).length;
  return { done, total: qs.length, errors };
}

/** One row per question of the onboarding form, grouped by section (read-only review). */
export function answerRows(a = {}, { masked = false } = {}) {
  return PARENT_SURVEY.sections.map((s) => {
    const rows = s.qs
      .filter((q) => !q.when || isShown(q, a))
      .map((q) => ({ key: q.n, q: q.q, required: !!q.req, value: masked && (q.n === 'P08' || q.n === 'P09') ? a[q.n] || '' : answerText(q, a) }));
    const n = rows.filter((r) => has(r.value)).length;
    return { name: s.name, icon: s.icon, optional: !!s.optional, rows, answered: n, skipped: s.optional && n === 0 };
  });
}

export const SURVEY_FACTS = {
  sections: PARENT_SURVEY.sections.length,
  questions: PARENT_SURVEY.sections.reduce((n, s) => n + s.qs.length, 0)
};
export const CONSENT_FACTS = {
  version: TERMS_VERSION,
  sections: Object.keys(SECTIONS).length,
  chapters: CHAPTERS.length,
  declaration: DECLARATION.length,
  permissions: SELECTIONS.length,
  required: SELECTIONS.filter((s) => s.required).length
};

// ------------------------------------------------------------------ the reward guide
const S = (n) => SECTIONS[String(n)];
const line = (n, i) => S(n).body[i];

/**
 * The seven questions the reward card answers. Each answer is a list of points; `src` says where the
 * point comes from, so anyone can check it: "Agreement §14" or "How the platform counts points".
 * `threshold` is the panel's live payout milestone when known (GET /me/points), otherwise null.
 */
export function rewardGuide({ threshold = null } = {}) {
  const AGR = (n) => `Agreement ${TERMS_VERSION} §${n}`;
  const PLAT = 'How Turn2Opinion counts points';
  const milestone = threshold ? `${Number(threshold).toLocaleString('en')} points` : 'the payout milestone shown on the Rewards page';
  return [
    {
      id: 'how',
      icon: 'coin',
      q: 'How does the reward system work?',
      a: [
        ['Your teen collects points in their Turn2Opinion account. Points come from completed surveys and completed profile sections.', PLAT],
        [line(14, 0), AGR(14)],
        [line(14, 2), AGR(14)],
        [`When the balance reaches ${milestone}, the payout milestone opens and a redemption can be requested.`, PLAT]
      ]
    },
    {
      id: 'earn',
      icon: 'trophy',
      q: 'How can teens earn rewards?',
      a: [
        ['By completing eligible surveys they are invited to. The reward for each survey is shown before it starts.', AGR(14)],
        ['By completing their profile sections. Each profile section carries its own points, credited once when that section reaches 100%.', PLAT],
        ['Teens do not earn rewards for inviting friends. Invites are only for sharing.', 'Teen panel rule'],
        [line(14, 7), AGR(14)]
      ]
    },
    {
      id: 'eligible',
      icon: 'clipboard',
      q: 'Which surveys and activities are eligible?',
      a: [
        [line(14, 0), AGR(14)],
        ['Only surveys your teen is invited to, which are checked for their age group. Some studies need your separate permission first.', AGR(7)],
        ['Before every survey, a study card states the reward and its eligibility requirements, how long it takes and what it asks about.', `Agreement ${TERMS_VERSION} Part D (study card)`],
        ['Completing a profile section is a rewarded activity too. Each section is rewarded once.', PLAT]
      ]
    },
    {
      id: 'calc',
      icon: 'target',
      q: 'How are rewards calculated?',
      a: [
        ['Balance = points from surveys recorded as Complete + points from completed profile sections.', PLAT],
        ['A survey where your teen is screened out, or that closes because enough people answered, does not add survey points.', PLAT],
        [line(14, 1), AGR(14)],
        [line(14, 3), AGR(14)]
      ]
    },
    {
      id: 'when',
      icon: 'clock',
      q: 'When and how are rewards credited?',
      a: [
        ['Survey points are added when the survey is recorded as Complete. Profile points are added the moment a profile section reaches 100%, and never twice for the same section.', PLAT],
        [line(14, 4), AGR(14)],
        [line(14, 5), AGR(14)],
        [line(14, 6), AGR(14)]
      ]
    },
    {
      id: 'rules',
      icon: 'shield',
      q: 'What are the conditions and restrictions?',
      a: [
        [DECLARATION.find((d) => /reward/i.test(d)), `Agreement ${TERMS_VERSION} Part B (declaration)`],
        [line(14, 7), AGR(14)],
        [line(16, 0), AGR(16)],
        [line(16, 2), AGR(16)],
        [line(16, 3), AGR(16)],
        [line(14, 8), AGR(14)]
      ]
    },
    {
      id: 'track',
      icon: 'eye',
      q: 'How can parents track their teen’s rewards?',
      a: [
        ['Open this Parent & guardian section with your teen: it shows the live points balance, surveys completed and progress to the payout milestone.', 'Teen profile'],
        ['The Rewards page lists every credit in your teen’s points history, and the Activity page lists each survey and its result.', 'Teen account'],
        [line(16, 1), AGR(16)],
        ['Questions about a reward? Contact support@turn2opinion.com.', AGR(17)]
      ]
    }
  ];
}

/** The reward path, in order, used by the animated journey. */
export const REWARD_PATH = [
  ['shield', 'Guardian consent', 'You give permission'],
  ['map', 'Profiles', 'Points per section, once'],
  ['clipboard', 'Surveys', 'Points shown up front'],
  ['coin', 'Balance', 'Survey + profile points'],
  ['gift', 'Payout milestone', 'Redeem the published way']
];

/** The teen's progress through the four steps, from what is on record. */
export function workflow({ onboarding, consent, profile, surveys }) {
  const s1 = onboarding === 'completed' || onboarding === 'not-on-record' ? 'done' : onboarding;
  const s2 = consent === 'submitted' ? 'done' : consent;
  const s3 = profile == null ? 'waiting' : profile.percent >= 100 ? 'done' : s1 === 'done' && s2 === 'done' ? (profile.percent > 0 ? 'in-progress' : 'not-started') : 'waiting';
  const s4 = surveys?.open ? 'open' : 'waiting';
  return [s1, s2, s3, s4];
}
