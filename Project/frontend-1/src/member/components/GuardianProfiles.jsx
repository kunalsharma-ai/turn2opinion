// "Parent & guardian" on the Teen member's Profiles page (/member/profiles/).
// 24 Nov 2026 (Kunal): everything the parent or guardian gave is merged into ONE card, "My parent's
// record", instead of seven separate cards. Clicking it opens the whole record: parent details, every
// onboarding question with their answer, consent and permissions, and the registration timeline.
// Data: GET /api/v1/user/teen-profile -> family (useFamily), sent only after the guardian approved,
// finished onboarding and gave consent. Before that the card says it is waiting for them.
import { useFamily } from './ParentSection.jsx';
import { ParentRecord } from './ParentRecord.jsx';
import { relWord } from '../../data/teen/registration.js';

export function GuardianProfiles() {
  const s = useFamily();
  const f = s.data?.family;
  const approved = f && (f.state === 'approved' || f.state === 'approved-without-form');
  return (
    <section className="sec6" aria-labelledby="h-gp" id="guardian-profile">
      <header className="sec6-h">
        <span className="sec6-ic" aria-hidden="true">👪</span>
        <div>
          <h2 id="h-gp">Parent &amp; guardian</h2>
          <p>
            {approved
              ? `Everything your ${relWord(f.guardian?.relation)} shared when they enrolled you, in one card. Open it to see every detail and answer.`
              : s.status === 'loading'
                ? 'Loading…'
                : 'Your parent or guardian’s details, answers and consent appear here once they approve you.'}
          </p>
        </div>
      </header>
      <ParentRecord state={s} />
    </section>
  );
}

export default GuardianProfiles;
