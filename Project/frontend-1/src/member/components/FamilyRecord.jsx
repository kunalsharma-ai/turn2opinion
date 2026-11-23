// "My family record" on the Teen member's profile page (/member/profile/#family), 23 Nov 2026.
// Shows everything the guardian submitted during the Teen registration, in five expandable cards:
//   1 Parent / guardian profile     2 Parent onboarding answers (every question of the form)
//   3 Reward registration & journey  4 Consent & authorisation (+ the complete consent form)
//   5 Teen registration & participation
// Data: GET /api/v1/user/teen-profile -> family (sent only after the guardian approved and finished
// onboarding; contact details masked by the API). Mapping lives in data/family.js. Self-contained:
// its own fetch and its own styles (member-family.css), so other member pages are untouched.
import { useEffect, useState } from 'react';
import { ENV } from '../../config/env.js';
import { api } from '../../utils/api.js';
import { warmRegions } from '../../components/survey/QInput.jsx';
import { relWord, STATUS_LINE, statusIndex, CLOSED } from '../../data/teen/registration.js';
import { COMPANY, EN, INFO, INFO_RULE } from '../../data/teen/agreement.js';
import { useSection } from '../data/MemberData.jsx';
import { fmt } from '../i18n/t.js';
import { Button, Icon, Modal, cx } from './ui.jsx';
import css from '../member-family.css?inline';
import {
  DEMO_FAMILY,
  agreementChapters,
  agreementVersion,
  consentSelections,
  declaration,
  has,
  journey,
  onboardingAnswer,
  onboardingRows,
  participationRows,
  rewardDeclaration,
  rewardsChapter,
  teenStatements
} from '../data/family.js';

const NP = 'Not provided';
const dateOf = (d, time) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString(undefined, time ? { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' } : { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};
const fullName = (n = {}) => [n.first, n.middle, n.last].filter(Boolean).join(' ');

export function useFamily() {
  const [s, setS] = useState({ status: 'loading' });
  useEffect(() => {
    let live = true;
    (async () => {
      if (ENV.DEMO_MODE) {
        await warmRegions();
        return live && setS({ status: 'ready', data: DEMO_FAMILY });
      }
      try {
        const [r] = await Promise.all([api.get('/api/v1/user/teen-profile'), warmRegions()]);
        if (!live) return;
        setS(r?.status === 'success' ? { status: 'ready', data: r.data } : { status: 'error' });
      } catch {
        if (live) setS({ status: 'error' });
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  return s;
}

// ------------------------------------------------------------------ small pieces
function Value({ v, empty = NP }) {
  return has(v) ? <span>{v}</span> : <span className="xfam-np">{empty}</span>;
}

function Facts({ rows }) {
  return (
    <dl className="xfam-facts">
      {rows.map(([label, v, icon, extra]) => (
        <div key={label}>
          <dt>
            {icon && <span aria-hidden="true">{icon}</span>} {label}
          </dt>
          <dd>
            <Value v={v} />
            {extra}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Pill({ ok, warn, children }) {
  return <span className={cx('xfam-pill', ok ? 'is-ok' : warn ? 'is-warn' : 'is-off')}>{children}</span>;
}

function Panel({ id, n, icon, tone, title, sub, status, open, onToggle, children }) {
  const bodyId = `xfam-b-${id}`;
  return (
    <section className={cx('xfam-panel', `xfam-panel--${tone}`, open && 'is-open')} style={{ '--i': n }} id={`family-${id}`}>
      <button type="button" className="xfam-head" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        <span className="xfam-ico" aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
        <span className="xfam-ht">
          <small>{String(n).padStart(2, '0')}</small>
          <b>{title}</b>
          <em>{sub}</em>
        </span>
        <span className="xfam-hs">{status}</span>
        <span className="xfam-chev" aria-hidden="true">
          <Icon name="chevron" size={18} />
        </span>
      </button>
      <div className="xfam-body" id={bodyId} hidden={!open}>
        {children}
      </div>
    </section>
  );
}

function More({ label, children, defaultOpen = false }) {
  const [o, setO] = useState(defaultOpen);
  return (
    <div className={cx('xfam-more', o && 'is-open')}>
      <button type="button" aria-expanded={o} onClick={() => setO(!o)}>
        <Icon name="chevron" size={14} /> {label}
      </button>
      {o && <div className="xfam-more-b">{children}</div>}
    </div>
  );
}

// ------------------------------------------------------------------ the five cards
function GuardianProfile({ f }) {
  const a = f.onboarding || {};
  const g = f.guardian || {};
  const rel = onboardingAnswer(a, 'P03') || relWord(g.relation);
  const where = [onboardingAnswer(a, 'P02'), onboardingAnswer(a, 'P01')].filter(Boolean).join(', ');
  return (
    <>
      <div className="xfam-who">
        <span className="xfam-av" aria-hidden="true">
          {(g.name?.first || '?')[0]}
        </span>
        <div>
          <h3>{fullName(g.name) || NP}</h3>
          <p>
            Your <b>{relWord(g.relation)}</b>
            {where ? ` · ${where}` : ''}
          </p>
          <div className="xfam-tags">
            <Pill ok>Approved your registration</Pill>
            {f.needsReview ? <Pill warn>Authority being checked by our team</Pill> : a.P04 === 'yes' && <Pill ok>Legally authorised</Pill>}
          </div>
        </div>
      </div>
      <h4 className="xfam-h4">Personal details</h4>
      <Facts
        rows={[
          ['Name', onboardingAnswer(a, 'parent-first-name') || fullName(g.name), '👤'],
          ['How they describe themselves', onboardingAnswer(a, 'parent-gender') || g.gender, '🧑'],
          ['Date of birth', onboardingAnswer(a, 'parent-dob'), '🎂'],
          ['Age band', a.P05, '📊'],
          ['Marital status', onboardingAnswer(a, 'parent-marital'), '💍']
        ]}
      />
      <h4 className="xfam-h4">Relationship & household</h4>
      <Facts
        rows={[
          ['Relationship to you', rel, '👪'],
          ['Legally authorised to give permission', onboardingAnswer(a, 'P04'), '⚖️'],
          ['Children aged 13–17 they parent', onboardingAnswer(a, 'P11'), '🧒'],
          ['Country', onboardingAnswer(a, 'P01'), '🌍'],
          ['State or region', onboardingAnswer(a, 'P02'), '📍']
        ]}
      />
      <h4 className="xfam-h4">Contact</h4>
      <Facts
        rows={[
          ['Email', g.email || a.P08, '✉️'],
          ['Mobile', g.phone || a.P09, '📱'],
          ['Language for messages', onboardingAnswer(a, 'P06'), '🗣️'],
          ['Preferred contact', onboardingAnswer(a, 'P07'), '📬']
        ]}
      />
      <p className="xfam-note">
        <Icon name="lock" size={14} /> Contact details are partly hidden to protect your {relWord(g.relation)}. Occupation is not asked in the guardian onboarding form, so it is not on record.
      </p>
    </>
  );
}

function OnboardingAnswers({ f }) {
  const groups = onboardingRows(f.onboarding || {});
  const total = groups.reduce((n, s) => n + s.rows.length, 0);
  const answered = groups.reduce((n, s) => n + s.answered, 0);
  return (
    <>
      <p className="xfam-lead">
        Every question of the <b>Parent &amp; guardian onboarding form</b>, exactly as your {relWord(f.guardian?.relation)} answered it on {dateOf(f.timeline?.onboardingAt) || 'the day they enrolled you'}. {answered} of {total} questions answered.
      </p>
      {groups.map((s, i) => (
        <More key={s.name} defaultOpen={i === 0} label={<><span aria-hidden="true">{s.icon}</span> {s.name} <small>{s.skipped ? 'Optional · skipped' : `${s.answered}/${s.rows.length}`}</small></>}>
          {s.optional && (
            <p className="xfam-note">
              <Icon name="shield" size={14} /> Optional. Stored apart from everything else and used only to keep studies that may not suit your health away from you.
            </p>
          )}
          <ol className="xfam-qa">
            {s.rows.map((r) => (
              <li key={r.key} className={cx(!has(r.value) && 'is-empty')}>
                <span className="xfam-q">
                  {r.q}
                  {r.required && <i title="Required question">Required</i>}
                  {r.derived && <i>Worked out</i>}
                </span>
                <span className="xfam-a">
                  <Value v={r.value} empty={s.skipped ? 'Skipped (optional section)' : NP} />
                </span>
              </li>
            ))}
          </ol>
        </More>
      ))}
    </>
  );
}

function RewardJourney({ f, active }) {
  const [points, pStatus] = useSection('points');
  const [stats] = useSection('stats');
  const ch = rewardsChapter();
  const sel = f.consent?.selections || {};
  const eligible = active && sel.participation === true;
  const a = f.onboarding || {};
  const steps = [
    ['shield', 'Guardian consent', f.consent?.acceptedAt ? dateOf(f.consent.acceptedAt) : '', !!f.consent?.acceptedAt],
    ['check', 'Account active', active ? 'Switched on' : 'Waiting for your password', active],
    ['map', 'Complete your profiles', 'Better matches, more surveys', null],
    ['clipboard', 'Take surveys', stats ? `${fmt(stats.complete)} completed` : '', stats ? stats.complete > 0 : null],
    ['coin', 'Earn points', points ? `${fmt(points.total)} points` : '', points ? points.total > 0 : null],
    ['gift', 'Redeem', points ? `from ${fmt(points.threshold)} points` : 'Guardian-approved route', points ? points.total >= points.threshold : null]
  ];
  return (
    <>
      <div className="xfam-stats">
        <div className={cx('xfam-stat', eligible ? 'is-ok' : 'is-warn')}>
          <small>Reward eligibility</small>
          <b>{eligible ? 'Eligible to earn' : 'Not yet eligible'}</b>
          <span>{eligible ? 'Your guardian’s consent covers rewarded surveys.' : 'Needs an active account and guardian consent.'}</span>
        </div>
        <div className="xfam-stat">
          <small>Points balance</small>
          <b>{points ? fmt(points.total) : pStatus === 'error' ? '—' : '…'}</b>
          <span>{points ? `${fmt(points.earned)} earned · ${fmt(points.redeemed)} redeemed` : ''}</span>
        </div>
        <div className="xfam-stat">
          <small>Reward registration</small>
          <b>{f.consent?.acceptedAt ? 'Registered' : NP}</b>
          <span>{f.consent?.acceptedAt ? `Reward rules accepted ${dateOf(f.consent.acceptedAt)}` : ''}</span>
        </div>
      </div>
      <h4 className="xfam-h4">Your reward journey</h4>
      <ol className="xfam-road">
        {steps.map(([icon, label, note, done], i) => (
          <li key={label} className={cx(done === true && 'is-done', done === false && 'is-wait')} style={{ '--i': i }}>
            <span aria-hidden="true">
              <Icon name={done === true ? 'check' : icon} size={16} />
            </span>
            <b>{label}</b>
            {note && <small>{note}</small>}
          </li>
        ))}
      </ol>
      <h4 className="xfam-h4">What your guardian agreed about rewards</h4>
      <Facts
        rows={[
          ['Reward rules accepted', f.consent?.termsRead ? `Yes, agreement ${f.consent.version || agreementVersion}` : f.consent?.version || '', '📜'],
          ['“No guaranteed reward” declaration', f.consent?.declaration ? 'Confirmed' : '', '✅'],
          ['Contact for reward administration', onboardingAnswer(a, 'P07'), '📬'],
          ['Panel administration messages', onboardingAnswer(a, 'P12'), '🔔']
        ]}
      />
      <blockquote className="xfam-quote">{rewardDeclaration()}</blockquote>
      <h4 className="xfam-h4">How Teens earn rewards</h4>
      {ch.items.map((s) => (
        <More key={s.n} label={<><span aria-hidden="true">{s.n === 14 ? '🪙' : s.n === 15 ? '🔄' : '🗄️'}</span> {s.n}. {s.title}</>} defaultOpen={s.n === 14}>
          <p className="xfam-short">{s.short}</p>
          <ul className="xfam-list">
            {s.body.filter((x) => typeof x === 'string').map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </More>
      ))}
      <p className="xfam-note">
        <Icon name="help" size={14} /> The guardian onboarding form has no separate reward questions: these are the reward terms your guardian read and accepted, and your live points.
      </p>
    </>
  );
}

function ConsentAuth({ f, onOpenForm }) {
  const c = f.consent || {};
  const sels = consentSelections(c.selections);
  return (
    <>
      <div className="xfam-stats">
        <div className="xfam-stat is-ok">
          <small>Consent status</small>
          <b>Approved</b>
          <span>{c.verifiedVia === 'email-link' ? 'Verified through the guardian’s own secure email link' : 'Recorded'}</span>
        </div>
        <div className="xfam-stat">
          <small>Submitted</small>
          <b>{dateOf(c.acceptedAt) || NP}</b>
          <span>{c.acceptedAt ? `at ${new Date(c.acceptedAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}` : ''}</span>
        </div>
        <div className="xfam-stat">
          <small>Agreement</small>
          <b className="mb-mono">{c.version || NP}</b>
          <span>{c.teenRegistrationRef ? `For ${c.teenRegistrationRef}` : ''}</span>
        </div>
      </div>
      <h4 className="xfam-h4">Permissions</h4>
      <ul className="xfam-sels">
        {sels.map((s) => (
          <li key={s.id} className={cx(s.given ? 'is-on' : 'is-off')}>
            <span className="xfam-sel-e" aria-hidden="true">
              {s.emoji}
            </span>
            <div>
              <b>{s.title}</b>
              <small>{s.kind}</small>
              <p>{s.text}</p>
            </div>
            <Pill ok={s.given}>{s.given ? 'Given' : s.recorded ? 'Not given' : NP}</Pill>
          </li>
        ))}
      </ul>
      <p className="xfam-note">
        <Icon name="bell" size={14} /> Authorisation for upcoming surveys: {c.selections?.participation ? 'yes, you can be invited to age-appropriate surveys.' : NP} Optional permissions are asked again before any study that needs them.
      </p>
      <h4 className="xfam-h4">Declarations</h4>
      <Facts
        rows={[
          ['Read the full agreement', c.termsRead === true ? 'Confirmed' : c.termsRead === false ? 'Not confirmed' : '', '📖'],
          ['Signed the 10-point declaration', c.declaration === true ? 'Confirmed' : c.declaration === false ? 'Not confirmed' : '', '🖋️'],
          ['Confirmed they are your parent or guardian', f.decision === 'yes' ? `Yes, on ${dateOf(f.timeline?.decisionAt)}` : '', '🛡️']
        ]}
      />
      <More label="Read the 10 declaration points">
        <ol className="xfam-list is-num">
          {declaration().map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </More>
      <Button icon="book" onClick={onOpenForm} className="xfam-cta">
        View the complete submitted consent form
      </Button>
    </>
  );
}

function TeenRegistration({ d, f, active }) {
  const steps = journey(f, f.teenConsent?.acceptedAt);
  const mine = teenStatements(f.teenConsent, f.guardian?.relation);
  const prefs = participationRows(d.answers || {});
  return (
    <>
      <div className="xfam-stats">
        <div className="xfam-stat">
          <small>Registration reference</small>
          <b className="mb-mono" data-allow-copy>
            {d.ref || NP}
          </b>
          <span>Quote it when you contact support</span>
        </div>
        <div className={cx('xfam-stat', active ? 'is-ok' : 'is-warn')}>
          <small>Registration status</small>
          <b>{active ? 'Complete · account active' : STATUS_LINE[statusIndex(f.status)]?.[1] || f.status}</b>
          <span>{f.teenConsent?.version ? `Your confirmations: ${f.teenConsent.version}` : ''}</span>
        </div>
      </div>
      <ol className="xfam-time">
        {steps.map((s, i) => (
          <li key={s.id} className={cx(s.done && 'is-done')} style={{ '--i': i }}>
            <span aria-hidden="true">{s.done ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}</span>
            <b>{s.label}</b>
            <small>{s.at ? dateOf(s.at, true) : s.done ? '' : 'Not yet'}</small>
          </li>
        ))}
      </ol>
      <More label={<>✅ Your own confirmations when you registered <small>{mine.filter((x) => x.given).length}/{mine.length}</small></>}>
        <ul className="xfam-checks">
          {mine.map((s) => (
            <li key={s.id} className={cx(s.given ? 'is-on' : 'is-off')}>
              <span aria-hidden="true">{s.icon}</span> {s.text} <Pill ok={s.given}>{s.given ? 'Confirmed' : NP}</Pill>
            </li>
          ))}
        </ul>
      </More>
      {prefs.map((p) => (
        <More key={p.name} label={<><span aria-hidden="true">{p.icon}</span> Survey participation: {p.name} <small>{p.rows.filter((r) => has(r.value)).length}/{p.rows.length}</small></>}>
          <ol className="xfam-qa">
            {p.rows.map((r) => (
              <li key={r.key} className={cx(!has(r.value) && 'is-empty')}>
                <span className="xfam-q">{r.q}</span>
                <span className="xfam-a">
                  <Value v={r.value} empty="Not answered yet" />
                </span>
              </li>
            ))}
          </ol>
          <Button to="profiles" size="sm" variant="ghost" iconEnd="arrow">
            Update in my profiles
          </Button>
        </More>
      ))}
    </>
  );
}

// ------------------------------------------------------------------ the full consent form
function ConsentForm({ open, onClose, f }) {
  const c = f.consent || {};
  const sels = consentSelections(c.selections);
  return (
    <Modal open={open} onClose={onClose} title="Submitted consent form">
      <div className="xfam-form">
        <header>
          <div>
            <p className="mb-eyebrow">Submitted {dateOf(c.acceptedAt, true)}</p>
            <h2>{EN.h1 || 'Teen research terms & parental consent'}</h2>
            <p>
              Agreement <b className="mb-mono">{c.version || agreementVersion}</b> · given by {fullName(f.guardian?.name)} ({relWord(f.guardian?.relation)}) · {c.teenRegistrationRef || ''}
            </p>
          </div>
          <div className="xfam-form-act">
            <Button size="sm" variant="ghost" icon="clipboard" onClick={() => window.print()}>
              Print
            </Button>
            <button type="button" className="xfam-x" onClick={onClose} aria-label="Close">
              <Icon name="close" size={18} />
            </button>
          </div>
        </header>
        <div className="xfam-form-body">
          <h3>{EN.info_h || 'Important information for parents and legal guardians'}</h3>
          {INFO.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <b>{INFO_RULE}</b>
          </p>
          <h3>Part A · Terms & conditions</h3>
          {agreementChapters().map((ch) => (
            <div key={ch.id} className="xfam-form-ch">
              <h4>
                {ch.emoji} {ch.title}
              </h4>
              {ch.items.map((s) => (
                <div key={s.n} className="xfam-form-s">
                  <h5>
                    {s.n}. {s.title}
                  </h5>
                  <p className="xfam-short">In short: {s.short}</p>
                  <ul>
                    {s.body.map((x, k) =>
                      typeof x === 'string' ? (
                        <li key={k}>{x}</li>
                      ) : (
                        <li key={k}>
                          {COMPANY.legalName} · {COMPANY.address} · {COMPANY.supportEmail} · {COMPANY.phone}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <h3>Part B · Declaration {c.declaration ? '✔ confirmed' : ''}</h3>
          <ol>
            {declaration().map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
          <h3>Part B · Consent selections</h3>
          <ul className="xfam-form-sel">
            {sels.map((s) => (
              <li key={s.id}>
                <span className={cx('xfam-box', s.given && 'is-on')} aria-label={s.given ? 'Ticked' : 'Not ticked'}>
                  {s.given && <Icon name="check" size={12} strokeWidth={3} />}
                </span>
                <div>
                  <b>
                    {s.title} <small>({s.kind})</small>
                  </b>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="xfam-note">The guardian’s IP address and browser are stored with this record for security and are never shown in your account.</p>
        </div>
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------------ waiting / closed states
function NotYet({ f }) {
  const closed = f && CLOSED[f.status];
  const withdrawn = f?.state === 'withdrawn';
  return (
    <div className="xfam-wait">
      <span className="xfam-ico" aria-hidden="true">
        <Icon name={withdrawn ? 'lock' : 'clock'} size={22} />
      </span>
      <div>
        <h3>{withdrawn ? 'Your guardian withdrew their consent' : closed || 'Your guardian’s details appear here once they approve'}</h3>
        <p>
          {withdrawn
            ? 'Their onboarding answers and consent record are no longer shown. Contact support@turn2opinion.com if this is a mistake.'
            : 'When your parent or guardian says YES, finishes the onboarding form and gives consent, their profile, answers, reward registration and consent record show up here automatically.'}
        </p>
        {!withdrawn && f?.status && (
          <ol className="xfam-time is-small">
            {STATUS_LINE.map(([k, l], i) => (
              <li key={k} className={cx(i < statusIndex(f.status) && 'is-done')}>
                <span aria-hidden="true">{i < statusIndex(f.status) ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}</span>
                <b>{l}</b>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ section
export function FamilyRecord() {
  const s = useFamily();
  const [open, setOpen] = useState({ guardian: true });
  const [form, setForm] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && /^#family/.test(window.location.hash) && s.status === 'ready') {
      const id = window.location.hash.slice(1);
      const k = id.replace('family-', '');
      if (k && k !== 'family') setOpen((o) => ({ ...o, [k]: true }));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    }
  }, [s.status]);

  const d = s.data || {};
  const f = d.family;
  const approved = f && (f.state === 'approved' || f.state === 'approved-without-form');
  const active = f?.status === 'account-active';
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const allOpen = ['guardian', 'onboarding', 'rewards', 'consent', 'teen'].every((k) => open[k]);

  return (
    <section className="xfam" id="family" aria-labelledby="xfam-h">
      <style>{css}</style>
      <header className="xfam-top">
        <div>
          <p className="xph__eyebrow">Teen panel · registration</p>
          <h2 id="xfam-h">My family record</h2>
          <p>Everything your parent or guardian shared when they enrolled you, in one place. Only you and our support team can see it.</p>
        </div>
        {approved && (
          <div className="xfam-chips">
            <Pill ok={active} warn={!active}>Registration {active ? 'complete' : 'in progress'}</Pill>
            <Pill ok>Consent approved</Pill>
            <Pill ok={active && f.consent?.selections?.participation === true}>Rewards {active ? 'eligible' : 'pending'}</Pill>
            <button type="button" className="xfam-all" onClick={() => setOpen(allOpen ? {} : { guardian: true, onboarding: true, rewards: true, consent: true, teen: true })}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
        )}
      </header>

      {s.status === 'loading' && (
        <p className="xfam-wait" role="status">
          <span className="btn-spin" aria-hidden="true" /> Loading your family record…
        </p>
      )}
      {s.status === 'error' && <p className="xfam-wait">We couldn’t load your family record. Please refresh the page.</p>}
      {s.status === 'ready' && !approved && <NotYet f={f || { status: d.status }} />}
      {s.status === 'ready' && approved && (
        <div className="xfam-grid">
          <Panel id="guardian" n={1} icon="user" tone="blue" title="Parent / guardian profile" sub="Who gave permission, and how to reach them" status={<Pill ok>Approved</Pill>} open={!!open.guardian} onToggle={() => toggle('guardian')}>
            {f.onboarding ? <GuardianProfile f={f} /> : <Facts rows={[['Name', fullName(f.guardian?.name), '👤'], ['Relationship to you', relWord(f.guardian?.relation), '👪'], ['Email', f.guardian?.email, '✉️'], ['Mobile', f.guardian?.phone, '📱']]} />}
          </Panel>
          <Panel
            id="onboarding"
            n={2}
            icon="clipboard"
            tone="violet"
            title="Parent onboarding answers"
            sub="Every question from the onboarding form"
            status={f.onboarding ? <Pill ok>Submitted {dateOf(f.timeline?.onboardingAt)}</Pill> : <Pill>Not on record</Pill>}
            open={!!open.onboarding}
            onToggle={() => toggle('onboarding')}
          >
            {f.onboarding ? <OnboardingAnswers f={f} /> : <p className="xfam-np">Your guardian approved you before the onboarding form existed, so there are no onboarding answers on record.</p>}
          </Panel>
          <Panel id="rewards" n={3} icon="gift" tone="coral" title="Reward registration & journey" sub="Eligibility, points and how Teens earn" status={<Pill ok={active} warn={!active}>{active ? 'Eligible' : 'Pending'}</Pill>} open={!!open.rewards} onToggle={() => toggle('rewards')}>
            <RewardJourney f={f} active={active} />
          </Panel>
          <Panel id="consent" n={4} icon="shield" tone="mint" title="Parent consent & authorisation" sub="Permissions, declaration and the full form" status={<Pill ok>Approved</Pill>} open={!!open.consent} onToggle={() => toggle('consent')}>
            <ConsentAuth f={f} onOpenForm={() => setForm(true)} />
          </Panel>
          <Panel id="teen" n={5} icon="id" tone="gold" title="Teen registration & participation" sub="Your reference, timeline and survey preferences" status={<Pill ok={active} warn={!active}>{active ? 'Active' : 'In progress'}</Pill>} open={!!open.teen} onToggle={() => toggle('teen')}>
            <TeenRegistration d={d} f={f} active={active} />
          </Panel>
          <ConsentForm open={form} onClose={() => setForm(false)} f={f} />
        </div>
      )}
    </section>
  );
}

export default FamilyRecord;

