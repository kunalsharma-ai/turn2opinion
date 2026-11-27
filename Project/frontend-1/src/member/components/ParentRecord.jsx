// "My parent's record": one card on the Teen's pages that holds everything the parent or guardian gave
// (24 Nov 2026, Kunal: merge it all into one card; clicking it shows every detail).
//   card   who the guardian is, how much of the onboarding form they answered, their consent, at a glance
//   sheet  1 Parent details  2 every onboarding question with their answer  3 consent and permissions
//          4 registration timeline
// Data: GET /api/v1/user/teen-profile -> family (useFamily), sent only after the guardian approved, finished
// onboarding and gave consent. Contact details arrive masked. Nothing is ever filled in here.
import { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { relWord } from '../../data/teen/registration.js';
import { PARENT_SURVEY } from '../../data/teen/parentSurvey.js';
import { Chip, HubStyles, Ring, Sheet } from '../../components/parent/ParentHub.jsx';
import { AnswersView } from '../../components/parent/ParentViews.jsx';
import { answerRows, onboardingProgress } from '../../components/parent/parentData.js';
import { consentSelections, has, journey, onboardingAnswer, teenStatements } from '../data/family.js';

const cx = (...a) => a.filter(Boolean).join(' ');
const NP = 'Not provided';
const dateOf = (d, time) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString(undefined, time ? { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' } : { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};
const initials = (n = {}) => `${(n.first || '?')[0]}${(n.last || '')[0] || ''}`.toUpperCase();

/** The whole record, worked out once for the card and the sheet. */
function useRecord(data) {
  const d = data || {};
  const f = d.family || {};
  const approved = f.state === 'approved' || f.state === 'approved-without-form';
  const g = f.guardian || {};
  const a = f.onboarding || {};
  const c = f.consent || {};
  const ans = (k) => onboardingAnswer(a, k);
  const prog = onboardingProgress(a);
  const sels = consentSelections(c.selections || {});
  const name = [g.name?.first, g.name?.middle, g.name?.last].filter(Boolean).join(' ');
  return {
    d,
    f,
    a,
    c,
    g,
    approved,
    withdrawn: f.state === 'withdrawn',
    rel: relWord(g.relation),
    name,
    prog,
    sels,
    given: sels.filter((s) => s.given).length,
    sections: answerRows(a, { masked: true }),
    details: [
      ['user', 'Full name', ans('parent-first-name') || name],
      ['users', 'Relationship to you', ans('P03') || (g.relation ? relWord(g.relation) : '')],
      ['shield', 'Legally authorised', ans('P04')],
      ['calendar', 'Date of birth', ans('parent-dob')],
      ['star', 'Age band', a.P05],
      ['heart', 'How they describe themselves', ans('parent-gender') || g.gender],
      ['home', 'Marital status', ans('parent-marital')],
      ['globe', 'Country', ans('P01')],
      ['pin', 'State or region', ans('P02')],
      ['mail', 'Email (partly hidden)', g.email || a.P08],
      ['phone', 'Mobile (partly hidden)', g.phone || a.P09],
      ['chat', 'Language for messages', ans('P06')],
      ['bell', 'Preferred contact', ans('P07')]
    ]
  };
}

// ------------------------------------------------------------------ the card
export function ParentRecordCard({ state, onOpen }) {
  const r = useRecord(state.data);
  const loading = state.status === 'loading';
  const ready = state.status === 'ready' && r.approved;
  const pct = ready && r.f.onboarding ? r.prog.done / Math.max(1, r.prog.total) : 0;
  return (
    <button type="button" className={cx('pgs-rec', !ready && 'is-wait')} onClick={onOpen} disabled={loading} aria-label="Open my parent’s full record">
      <span className="pgs-rec-glow" aria-hidden="true" />
      <span className="pgs-rec-who">
        <span className="pgs-rec-ava" aria-hidden="true">
          <i />
          <b>{ready ? initials(r.g.name) : <Icon name="user" size={30} />}</b>
          {ready && (
            <span className="pgs-rec-tick">
              <Icon name="check" size={12} strokeWidth={3.2} />
            </span>
          )}
        </span>
        <span className="pgs-rec-id">
          <small>My parent’s record</small>
          <b>{loading ? 'Loading…' : ready ? r.name || 'Your parent or guardian' : r.withdrawn ? 'Consent withdrawn' : 'Waiting for your guardian'}</b>
          <span>
            {ready ? (
              <>
                Your {r.rel} · {r.c.verifiedVia === 'email-link' ? 'verified by secure email link' : 'consent recorded'}
              </>
            ) : (
              'Their details, answers and consent appear here once they approve you.'
            )}
          </span>
        </span>
      </span>

      <span className="pgs-rec-stats">
        <span className="pgs-rec-stat">
          <Ring value={pct} size={58} stroke={6} label={`${Math.round(pct * 100)}% of questions answered`}>
            <b>{ready ? `${Math.round(pct * 100)}%` : '—'}</b>
          </Ring>
          <span>
            <b>{ready ? `${r.prog.done} of ${r.prog.total}` : '—'}</b>
            <small>questions answered</small>
          </span>
        </span>
        <span className="pgs-rec-stat">
          <span className="pgs-rec-badge is-con" aria-hidden="true">
            <Icon name="shield" size={22} />
          </span>
          <span>
            <b>{ready ? `${r.given} of ${r.sels.length}` : '—'}</b>
            <small>permissions given</small>
          </span>
        </span>
        <span className="pgs-rec-stat">
          <span className="pgs-rec-badge is-date" aria-hidden="true">
            <Icon name="calendar" size={22} />
          </span>
          <span>
            <b>{ready ? dateOf(r.c.acceptedAt) || '—' : '—'}</b>
            <small>consent given</small>
          </span>
        </span>
      </span>

      <span className="pgs-rec-secs" aria-hidden="true">
        <span className="pgs-rec-sec is-details">👤 Parent details</span>
        {PARENT_SURVEY.sections.map((s, i) => {
          const row = r.sections[i];
          return (
            <span key={s.name} className="pgs-rec-sec" style={{ '--i': i }}>
              {s.icon} {s.name}
              {ready && row && <em>{row.skipped ? 'skipped' : `${row.answered}/${row.rows.length}`}</em>}
            </span>
          );
        })}
        <span className="pgs-rec-sec is-con">🛡️ Consent &amp; permissions</span>
      </span>

      <span className="pgs-rec-cta">
        {ready ? 'Open my parent’s full record' : 'See what will appear here'} <Icon name="arrow" size={18} />
      </span>
    </button>
  );
}

// ------------------------------------------------------------------ the full record
export function ParentRecordSheet({ open, onClose, state, onConsentForm }) {
  const r = useRecord(state.data);
  const ready = state.status === 'ready' && r.approved;
  const mine = teenStatements(r.f.teenConsent, r.g.relation);
  const steps = journey(r.f, r.f.teenConsent?.acceptedAt);
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <Sheet
      open={open}
      onClose={onClose}
      tone="rec"
      kicker="Everything your parent or guardian gave, in one place"
      title="My parent’s record"
      status={<Chip status={ready ? 'done' : 'pending'}>{ready ? 'Approved' : 'Waiting'}</Chip>}
      actions={
        <button type="button" className="pgs-btn" onClick={() => window.print()}>
          <Icon name="clipboard" size={16} /> <span className="pgs-hide-sm">Print</span>
        </button>
      }
    >
      <header className="pgs-recx-head">
        <span className="pgs-rec-ava is-big" aria-hidden="true">
          <i />
          <b>{ready ? initials(r.g.name) : <Icon name="user" size={30} />}</b>
        </span>
        <div>
          <h3>{ready ? r.name || 'Your parent or guardian' : 'Waiting for your guardian'}</h3>
          <p>
            {ready
              ? `Your ${r.rel}. Onboarding form sent ${dateOf(r.f.timeline?.onboardingAt) || '—'}, consent given ${dateOf(r.c.acceptedAt) || '—'}.`
              : 'When your parent or guardian approves you, finishes the onboarding form and gives consent, everything they shared shows here.'}
          </p>
        </div>
        {ready && (
          <dl className="pgs-recx-kpi">
            <div>
              <dt>Questions answered</dt>
              <dd>
                {r.prog.done}/{r.prog.total}
              </dd>
            </div>
            <div>
              <dt>Sections</dt>
              <dd>{PARENT_SURVEY.sections.length}</dd>
            </div>
            <div>
              <dt>Permissions given</dt>
              <dd>
                {r.given}/{r.sels.length}
              </dd>
            </div>
          </dl>
        )}
      </header>

      <nav className="pgs-doc-jump" aria-label="Jump to">
        <button type="button" onClick={() => jump('pgs-recx-details')}>
          <Icon name="user" size={14} /> Parent details
        </button>
        <button type="button" onClick={() => jump('pgs-recx-answers')}>
          <Icon name="clipboard" size={14} /> All questions &amp; answers
        </button>
        <button type="button" onClick={() => jump('pgs-recx-consent')}>
          <Icon name="shield" size={14} /> Consent
        </button>
        <button type="button" onClick={() => jump('pgs-recx-time')}>
          <Icon name="clock" size={14} /> Timeline
        </button>
      </nav>

      <section className="pgs-recx-block" id="pgs-recx-details">
        <h4>
          <span aria-hidden="true">👤</span> Parent details
        </h4>
        <dl className="pgs-recx-grid">
          {r.details.map(([icon, label, v]) => (
            <div key={label} className={cx(!has(v) && 'is-empty')}>
              <dt>
                <Icon name={icon} size={14} /> {label}
              </dt>
              <dd>{ready ? (has(v) ? v : NP) : '—'}</dd>
            </div>
          ))}
        </dl>
        <p className="pgs-note">
          <Icon name="lock" size={14} /> Email and mobile are partly hidden to protect your {r.rel}. Only you, your {r.rel} and our support team can see this record.
        </p>
      </section>

      <section className="pgs-recx-block" id="pgs-recx-answers">
        <h4>
          <span aria-hidden="true">📝</span> Every question from the onboarding form, with their answer
        </h4>
        {ready && !r.f.onboarding && <p className="pgs-note">Your {r.rel} approved you before the onboarding form existed, so no answers are on record. These are the questions it asks.</p>}
        <AnswersView answers={ready ? r.a : {}} masked emptyText={ready ? NP : '—'} skippedText={ready ? 'Skipped (optional section)' : '—'} openAll />
      </section>

      <section className="pgs-recx-block" id="pgs-recx-consent">
        <h4>
          <span aria-hidden="true">🛡️</span> Consent &amp; permissions
        </h4>
        <dl className="pgs-recx-grid">
          <div>
            <dt>
              <Icon name="calendar" size={14} /> Consent given
            </dt>
            <dd>{ready ? dateOf(r.c.acceptedAt, true) || NP : '—'}</dd>
          </div>
          <div>
            <dt>
              <Icon name="book" size={14} /> Agreement
            </dt>
            <dd>{ready ? r.c.version || NP : '—'}</dd>
          </div>
          <div>
            <dt>
              <Icon name="eye" size={14} /> Read the full agreement
            </dt>
            <dd>{ready ? (r.c.termsRead ? 'Yes' : NP) : '—'}</dd>
          </div>
          <div>
            <dt>
              <Icon name="check" size={14} /> 10-point declaration
            </dt>
            <dd>{ready ? (r.c.declaration ? 'Confirmed' : NP) : '—'}</dd>
          </div>
        </dl>
        <ul className="pgs-doc-sel">
          {r.sels.map((s) => (
            <li key={s.id} className={ready && s.given ? 'is-on' : 'is-off'}>
              <span className="pgs-box" aria-hidden="true">
                {ready && s.given && <Icon name="check" size={12} strokeWidth={3} />}
              </span>
              <div>
                <b>
                  <span aria-hidden="true">{s.emoji}</span> {s.title} <small>({s.kind})</small>
                </b>
                <p>{s.text}</p>
              </div>
              <Chip status={ready ? (s.given ? 'done' : 'off') : 'pending'}>{ready ? (s.given ? 'Given' : 'Not given') : 'Waiting'}</Chip>
            </li>
          ))}
        </ul>
        {onConsentForm && (
          <button type="button" className="pgs-btn" onClick={onConsentForm}>
            <Icon name="book" size={16} /> Read the complete consent form
          </button>
        )}
      </section>

      <section className="pgs-recx-block" id="pgs-recx-time">
        <h4>
          <span aria-hidden="true">🕒</span> Registration timeline
        </h4>
        <ol className="pgs-recx-time">
          {steps.map((s) => (
            <li key={s.id} className={s.done ? 'is-done' : ''}>
              <span aria-hidden="true">{s.done ? <Icon name="check" size={12} strokeWidth={3} /> : null}</span>
              <b>{s.label}</b>
              <small>{s.at ? dateOf(s.at, true) : s.done ? 'Done' : 'Not yet'}</small>
            </li>
          ))}
        </ol>
        {r.f.teenConsent && (
          <p className="pgs-note">
            <Icon name="star" size={14} /> Your own confirmations when you registered: {mine.filter((x) => x.given).length} of {mine.length}.
          </p>
        )}
        {r.d.ref && (
          <p className="pgs-note" data-allow-copy>
            <Icon name="id" size={14} /> Registration reference {r.d.ref}
          </p>
        )}
      </section>
    </Sheet>
  );
}

/** Card + sheet together, for pages that have only this. */
export function ParentRecord({ state }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HubStyles />
      <ParentRecordCard state={state} onOpen={() => setOpen(true)} />
      <ParentRecordSheet open={open} onClose={() => setOpen(false)} state={state} />
    </>
  );
}

export default ParentRecord;
