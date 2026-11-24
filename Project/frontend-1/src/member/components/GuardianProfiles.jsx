// "Parent & guardian profile" cards on the Teen member's Profiles page (/member/profiles/), 23 Nov 2026.
// One card per group of information collected from the parent or legal guardian, with a slot for every
// field, shown as filled or not filled. Slots the onboarding form does not ask yet (occupation,
// reward preferences) are shown as "Not collected yet", never filled in. Employment, education and the
// home & family slots come from the parent profiling sections (Teen bank questions, 24 Nov 2026).
// Data: the same GET /api/v1/user/teen-profile -> family record as ParentSection.jsx (sent only after the
// guardian approved and finished onboarding). Before that every slot shows "Waiting for your guardian".
import { useFamily } from './ParentSection.jsx';
import { Icon, cx } from './ui.jsx';
import { useSection } from '../data/MemberData.jsx';
import { fmt } from '../i18n/t.js';
import { relWord } from '../../data/teen/registration.js';
import { consentSelections, has, onboardingAnswer, teenStatements } from '../data/family.js';
import css from '../member-family.css?inline';

const NOT_ASKED = 'not-asked';
const day = (d) => {
  try {
    return d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  } catch {
    return '';
  }
};
const yes = (v) => (v === true ? 'Confirmed' : '');

/** Every slot, per card. A slot is [label, value | NOT_ASKED]. */
function cards(d, points) {
  const f = d?.family || {};
  const a = f.onboarding || {};
  const g = f.guardian || {};
  const c = f.consent || {};
  const ans = (k) => onboardingAnswer(a, k);
  const name = [g.name?.first, g.name?.middle, g.name?.last].filter(Boolean).join(' ');
  const sels = consentSelections(c.selections || {});
  const mine = teenStatements(f.teenConsent, g.relation);
  return [
    {
      id: 'guardian', icon: '👤', tone: 'blue', title: 'Personal details', sub: 'Who your parent or guardian is',
      slots: [
        ['Full name', ans('parent-first-name') || name],
        ['How they describe themselves', ans('parent-gender') || g.gender],
        ['Date of birth', ans('parent-dob')],
        ['Age band', a.P05],
        ['Marital status', ans('parent-marital')],
        ['Occupation', NOT_ASKED],
        ['Employment status', ans('teen-s001')],
        ['Highest education', ans('teen-s002')]
      ]
    },
    {
      id: 'guardian', icon: '🏡', tone: 'violet', title: 'Relationship & household', sub: 'How they are linked to you',
      slots: [
        ['Relationship to you', ans('P03') || (g.relation ? relWord(g.relation) : '')],
        ['Legally authorised to give permission', ans('P04')],
        ['Children aged 13–17 they parent', ans('P11')],
        ['Country', ans('P01')],
        ['State or region', ans('P02')]
      ]
    },
    {
      id: 'onboarding', icon: '🏠', tone: 'violet', title: 'Home & family profile', sub: 'Answered by your guardian for the Teen panel',
      slots: [
        ['Area you live in', ans('teen-g003')],
        ['Time lived in this country', ans('teen-g004')],
        ['Household size', ans('teen-h001')],
        ['Children under 18', ans('teen-h002')],
        ['Siblings', ans('teen-h004')],
        ['Home', ans('teen-h005')],
        ['Pets', ans('teen-h006')],
        ['Household income', ans('household-income')]
      ]
    },
    {
      id: 'guardian', icon: '📬', tone: 'sky', title: 'Contact & communication', sub: 'Partly hidden to protect them',
      slots: [
        ['Email', g.email || a.P08],
        ['Mobile', g.phone || a.P09],
        ['Language for messages', ans('P06')],
        ['Preferred contact', ans('P07')],
        ['Panel administration messages', ans('P12')]
      ]
    },
    {
      id: 'onboarding', icon: '💚', tone: 'mint', title: 'Your health (from your guardian)', sub: 'Optional. Keeps unsuitable studies away',
      slots: [
        ['Long-term health conditions', ans('HQ1')],
        ['Caregiver for a health need', ans('HQ2')],
        ['Help they give regularly', ['primary', 'shared'].includes(a.HQ2) ? ans('HQ4') : a.HQ2 ? 'Not applicable' : '']
      ]
    },
    {
      id: 'rewards', icon: '🎁', tone: 'coral', title: 'Reward registration', sub: 'How you earn, and what they agreed',
      slots: [
        ['Reward rules accepted', c.termsRead ? `Yes · ${c.version || ''}` : ''],
        ['Reward eligibility', f.state === 'approved' || f.state === 'approved-without-form' ? (f.status === 'account-active' && c.selections?.participation ? 'Eligible to earn' : 'Pending') : ''],
        ['“No guaranteed reward” declaration', yes(c.declaration)],
        ['Your points', points ? `${fmt(points.total)} points` : ''],
        ['Preferred reward type', NOT_ASKED],
        ['Who receives rewards (payout route)', NOT_ASKED],
        ['Reward expectations', NOT_ASKED]
      ]
    },
    {
      id: 'consent', icon: '🛡️', tone: 'gold', title: 'Consent & authorisation', sub: 'Permissions given for you',
      slots: [
        ['Consent date', day(c.acceptedAt)],
        ['Agreement version', c.version],
        ['Read the full agreement', yes(c.termsRead)],
        ['10-point declaration', yes(c.declaration)],
        ...sels.map((s) => [s.title, s.recorded ? (s.given ? 'Given' : 'Not given') : ''])
      ]
    },
    {
      id: 'teen', icon: '🪪', tone: 'blue', title: 'Your registration', sub: 'Reference, status and your confirmations',
      slots: [
        ['Registration reference', d?.ref],
        ['Guardian decision', f.decision === 'yes' ? `Yes · ${day(f.timeline?.decisionAt)}` : ''],
        ['Onboarding form sent', day(f.timeline?.onboardingAt)],
        ['Account status', f.status === 'account-active' ? 'Active' : ''],
        ['Your confirmations', f.teenConsent ? `${mine.filter((x) => x.given).length} of ${mine.length}` : '']
      ]
    }
  ];
}

export function GuardianProfiles() {
  const s = useFamily();
  const [points] = useSection('points');
  const d = s.data;
  const f = d?.family;
  const approved = f && (f.state === 'approved' || f.state === 'approved-without-form');
  const list = cards(approved ? d : { ref: d?.ref }, approved ? points : null);
  const counted = list.flatMap((c) => c.slots).filter(([, v]) => v !== NOT_ASKED);
  const filled = counted.filter(([, v]) => has(v)).length;
  const rel = relWord(f?.guardian?.relation);

  return (
    <section className="sec6 xgp" aria-labelledby="h-gp" id="guardian-profile">
      <style>{css}</style>
      <header className="sec6-h">
        <span className="sec6-ic" aria-hidden="true">👪</span>
        <div>
          <h2 id="h-gp">Parent &amp; guardian profile</h2>
          <p>
            {approved
              ? `Everything your ${rel} shared when they enrolled you. Filled slots show what is on record.`
              : s.status === 'loading'
                ? 'Loading…'
                : 'These slots fill in automatically once your parent or guardian approves you and finishes the onboarding form.'}
          </p>
        </div>
        <span className="sec6-count">
          {approved ? `${filled}/${counted.length}` : '—'}
        </span>
      </header>
      <div className="xgp-grid">
        {list.map((c, i) => {
          const own = c.slots.filter(([, v]) => v !== NOT_ASKED);
          const done = own.filter(([, v]) => has(v)).length;
          const pct = own.length ? done / own.length : 0;
          return (
            <article key={c.title} className={cx('xgp-card', `xgp-card--${c.tone}`, approved && pct === 1 && 'is-full')} style={{ '--i': i, '--p': approved ? pct : 0 }}>
              <header>
                <span className="xgp-ring" aria-hidden="true">
                  <span>{c.icon}</span>
                </span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.sub}</p>
                </div>
                <b className="xgp-n">{approved ? `${done}/${own.length}` : `0/${own.length}`}</b>
              </header>
              <ul>
                {c.slots.map(([label, v]) => {
                  const st = !approved ? 'wait' : v === NOT_ASKED ? 'na' : has(v) ? 'ok' : 'no';
                  return (
                    <li key={label} className={`is-${st}`}>
                      <span className="xgp-dot" aria-hidden="true">
                        {st === 'ok' ? <Icon name="check" size={11} strokeWidth={3} /> : null}
                      </span>
                      <span className="xgp-l">{label}</span>
                      <span className="xgp-v">{st === 'ok' ? v : st === 'na' ? 'Not collected yet' : st === 'wait' ? 'Waiting for your guardian' : 'Not provided'}</span>
                    </li>
                  );
                })}
              </ul>
              {approved && (
                <a className="xgp-more" href={`/member/profile/#family-${c.id}`}>
                  See full details <Icon name="arrow" size={14} />
                </a>
              )}
            </article>
          );
        })}
      </div>
      <p className="xgp-legend">
        <span className="is-ok">Filled</span>
        <span className="is-no">Not provided</span>
        <span className="is-na">Not collected yet (not asked in the onboarding form)</span>
      </p>
    </section>
  );
}

export default GuardianProfiles;
