// Parent / legal guardian side of a Teen registration (redesigned 21 Nov 2026).
// The link comes from the guardian's email: /parent-consent/?user=<teenId>&code=<code>&s=<signature>
// (+ &d=yes or &d=no from the two buttons in the email).
//
//   invite    the request, explained, with two bold choices: YES enrol / NO do not enrol
//   verify    (YES) review the request and confirm "I am this teen's parent / legal guardian"
//   onboard   the Parent & Guardian Onboarding Form (Module 1 of the attached questionnaire, all
//             questions kept; what the teen already gave is pre-filled and only confirmed)
//   review    check every answer, edit any of them
//   consent   the approved Teen consent page (v1.1.0) in guardian mode: agreement MINOR-2026.10,
//             declaration and the six separate, untapped permissions (3 required, 3 optional)
//   done      certificate; the teen is emailed a password link, the guardian a confirmation
//   decline   (NO) reasons + optional note, with a way back before the final confirmation
//   declined  the request is closed; nobody gets an account
// Every call carries the signed link; the API checks each stage was completed before the next.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { api } from '../utils/api.js';
import Icon from '../components/Icon.jsx';
import { Flag } from '../components/Brand.jsx';
import PreviewLinks from '../components/PreviewLinks.jsx';
import { COUNTRIES } from '../data/countries.js';
import { formatDate } from '../components/FormFields.jsx';
import { fullPhone } from '../utils/signup.js';
import { playSuccess, playSwitch, pop } from '../utils/sound.js';
import { PARENT_SURVEY } from '../data/teen/parentSurvey.js';
import QInput, { answerText, isRequired, isShown, qError, warmRegions } from '../components/survey/QInput.jsx';
import { Chip, Cards, Hero, HubStyles, Sheet, Workflow } from '../components/parent/ParentHub.jsx';
import { RewardGuide } from '../components/parent/ParentViews.jsx';
import { onboardingProgress, sectionProgress, workflow } from '../components/parent/parentData.js';
import ConsentKit from '../components/onboarding/ConsentKit.jsx';
import { SELECTIONS } from '../data/teen/agreement.js';
import { DECLINE_REASONS, GUARDIAN_TERMS_VERSION, relWord } from '../data/teen/registration.js';

const DRAFT = 't2o_guardian_onboarding_v3';
const DRAFT_DAYS = 7;
const fullName = (n = {}) => [n.first, n.middle, n.last].filter(Boolean).join(' ');

// ------------------------------------------------------------------ shell
function GuardianFrame({ stage, children, teenName }) {
  const order = ['invite', 'verify', 'hub', 'done'];
  const at = Math.max(0, order.indexOf(['onboard', 'review', 'consent'].includes(stage) ? 'hub' : stage));
  const labels = ['Decision', 'Confirm', 'Parent section', 'Done'];
  return (
    <section className={`gdn gdn--${stage}`}>
      <header className="gdn-bar">
        <div className="wrap gdn-bar-in">
          <span className="gdn-crest" aria-hidden="true">
            <Icon name="shield" size={18} />
          </span>
          <span className="gdn-bar-t">
            <b>Teen panel · Parents &amp; guardians</b>
            <small>{teenName ? `Registration request from ${teenName}` : 'Secure page'}</small>
          </span>
          <span className="gdn-lock">
            <Icon name="lock" size={14} /> Secure, personal link
          </span>
        </div>
        {(order.includes(stage) || ['onboard', 'review', 'consent'].includes(stage)) && (
          <ol className="wrap gdn-steps" aria-label="Progress">
            {labels.map((l, i) => (
              <li key={l} className={i < at ? 'is-done' : i === at ? 'is-now' : ''}>
                <span>{i < at ? <Icon name="check" size={11} strokeWidth={3} /> : i + 1}</span> {l}
              </li>
            ))}
          </ol>
        )}
      </header>
      {children}
    </section>
  );
}

function TeenCard({ t }) {
  const x = t?.teen || {};
  const cc = String(x.address?.country || '').toUpperCase();
  const c = COUNTRIES.find((k) => k.c === cc);
  return (
    <dl className="gdn-teen">
      <div>
        <dt>Name</dt>
        <dd>{fullName(t?.name) || '—'}</dd>
      </div>
      <div>
        <dt>Date of birth</dt>
        <dd>{x.dob ? formatDate(String(x.dob).slice(0, 10)) : '—'}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>{x.mail || '—'}</dd>
      </div>
      <div>
        <dt>Lives in</dt>
        <dd>
          {c && <Flag code={c.c} size={14} />} {[x.address?.city, c?.n].filter(Boolean).join(', ') || '—'}
        </dd>
      </div>
      <div>
        <dt>Reference</dt>
        <dd data-allow-copy>{t?.ref || '—'}</dd>
      </div>
    </dl>
  );
}

// ------------------------------------------------------------------ invite (YES / NO)
function Invite({ t, onYes, onNo }) {
  const rel = relWord(t.parent?.relation);
  return (
    <div className="wrap gdn-invite">
      <div className="gdn-letter">
        <span className="gdn-letter-flap" aria-hidden="true" />
        <p className="gdn-kicker">A request for your decision</p>
        <h1>
          {t.name?.first || 'Your teen'} would like to join the <em>Turn2Opinion Teen panel</em>
        </h1>
        <p className="gdn-lead">
          Dear {t.parent?.name?.first || 'parent or guardian'}, {t.name?.first || 'a teen'} registered and named you as their <b>{rel}</b>. Teens aged 13 to 17 can only join with a parent or legal guardian’s permission, so nothing happens until you decide.
        </p>
        <div className="gdn-facts">
          <div>
            <span>🎯</span>
            <b>What it is</b>
            <p>A market research panel. Teens get short, age-appropriate online surveys and can earn rewards for completed ones.</p>
          </div>
          <div>
            <span>🛡️</span>
            <b>How they’re protected</b>
            <p>Every study is age-checked. No school names, home addresses or exact locations are ever asked. Sensitive studies need your separate permission.</p>
          </div>
          <div>
            <span>🕊️</span>
            <b>Always voluntary</b>
            <p>Your teen can skip any question or stop at any time. You can withdraw permission whenever you like.</p>
          </div>
        </div>
        <ol className="gdn-path">
          <li>
            <b>1</b> Confirm you are {t.name?.first || 'the teen'}’s {rel}
          </li>
          <li>
            <b>2</b> Onboarding form and family profile, about 6 minutes
          </li>
          <li>
            <b>3</b> Read the agreement, tick your permissions
          </li>
          <li>
            <b>4</b> {t.name?.first || 'Your teen'} gets a link to create their own password
          </li>
        </ol>
        <p className="gdn-ask">Do you want to enrol {t.name?.first || 'your teen'} in the Teen panel?</p>
        <div className="gdn-yesno">
          <button type="button" className="gdn-yes" onClick={onYes}>
            <span className="gdn-yn-k">YES</span>
            <span className="gdn-yn-t">I want to enrol my Teen</span>
          </button>
          <button type="button" className="gdn-no" onClick={onNo}>
            <span className="gdn-yn-k">NO</span>
            <span className="gdn-yn-t">I do not want to enrol my Teen</span>
          </button>
        </div>
        <p className="gdn-small">
          Don’t recognise this request? Choose <b>No</b> and tell us. No account will be created. This link is personal and expires on {t.expiresAt ? formatDate(String(t.expiresAt).slice(0, 10)) : 'its expiry date'}.
        </p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ verify (after YES)
function Verify({ t, busy, err, onBack, onConfirm }) {
  const [ok, setOk] = useState(false);
  const rel = relWord(t.parent?.relation);
  return (
    <div className="wrap gdn-verify">
      <div className="gdn-verify-card">
        <p className="gdn-kicker">Step 1 · Confirm who you are</p>
        <h1>Is this your {t.parent?.relation === 'guardian' ? 'ward' : 'child'}?</h1>
        <p className="gdn-lead">These are the details {t.name?.first || 'the teen'} gave. Contact details are partly hidden to protect them.</p>
        <TeenCard t={t} />
        <label className={`gdn-confirm ${ok ? 'is-on' : ''}`}>
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
          <span className="gdn-confirm-box" aria-hidden="true">
            <Icon name="check" size={16} strokeWidth={3} />
          </span>
          <span>
            I am {t.name?.first || 'this teen'}’s <b>{rel}</b>, I am 18 or older, and I am legally able to give permission for them.
          </span>
        </label>
        {err && (
          <p className="form-alert" role="alert">
            {err}
          </p>
        )}
        <div className="gdn-actions">
          <button type="button" className="gdn-btn is-ghost" onClick={onBack}>
            <Icon name="arrowLeft" size={16} /> Back to the decision
          </button>
          <button type="button" className="gdn-btn" disabled={!ok || busy} onClick={onConfirm}>
            {busy ? 'Saving…' : 'Yes, open the Parent section'} <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ onboarding form
// 24 Nov 2026: nothing is filled in for the guardian. The only answers shown are the ones they typed
// themselves: saved on the server (after they sent the form) or kept on this device until they send it.
// The email address (P08) is the one the invitation went to; the API always uses that one.

// Answers kept on this device until the form is sent (7 days, like the link), then removed.
function readDraft(user) {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT));
    if (!d || d.user !== user || Date.now() - (d.at || 0) > DRAFT_DAYS * 864e5) return null;
    return d;
  } catch {
    return null;
  }
}
function writeDraft(user, a) {
  try {
    localStorage.setItem(DRAFT, JSON.stringify({ user, a, at: Date.now() }));
    return Date.now();
  } catch {
    return 0;
  }
}
function dropDraft() {
  try {
    localStorage.removeItem(DRAFT);
    sessionStorage.removeItem('t2o_guardian_onboarding_v2');
  } catch {
    /* ignore */
  }
}
const timeOf = (ms) => (ms ? new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : '');

function sectionErrors(sec, a) {
  const e = {};
  sec.qs.forEach((q) => {
    const m = qError(q, a);
    if (m) e[q.n] = m;
  });
  return e;
}
const firstErrorSection = (a) => PARENT_SURVEY.sections.findIndex((s) => Object.keys(sectionErrors(s, a)).length > 0);

function Onboarding({ t, a, setA, savedAt, onDone, onExit, start = 0 }) {
  const sections = PARENT_SURVEY.sections;
  const [sIdx, setSIdx] = useState(start);
  const [tried, setTried] = useState(false);
  const [healthIntro, setHealthIntro] = useState(() => (sectionProgress(sections.find((s) => s.optional), a).done ? 'answer' : 'ask')); // ask | confirm | answer
  const top = useRef(null);
  const sec = sections[sIdx];
  const set = (k, v) => setA((p) => {
    const n = { ...p, [k]: v };
    if (k === 'P09:parts') n.P09 = v.phone ? fullPhone(v.dial, v.phone) : '';
    return n;
  });
  const errs = sectionErrors(sec, a);
  const prog = onboardingProgress(a);
  const go = (n) => {
    setTried(false);
    setSIdx(n);
    setTimeout(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
  };
  const next = () => {
    if (Object.keys(errs).length) {
      setTried(true);
      const k = Object.keys(errs)[0];
      setTimeout(() => document.querySelector(`[data-q="${k}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 30);
      return;
    }
    pop({ pitch: 1.1 + sIdx * 0.1 });
    if (sIdx < sections.length - 1) go(sIdx + 1);
    else onDone();
  };
  const gateNo = a.P04 === 'no';
  const isHealth = !!sec.optional;
  const total = sections.length;
  return (
    <div className="wrap gdn-onb pgs-onb" ref={top}>
      <HubStyles />
      <aside className="gdn-rail">
        <p className="gdn-kicker">Card 1 · Parent onboarding form</p>
        <h2>About you</h2>
        <p className="gdn-rail-p">So we know who is giving permission for {t.name?.first || 'your teen'}. Nothing is filled in for you. Required questions are marked; everything else is optional.</p>
        <div className="pgs-onb-meter" style={{ '--p': prog.pct / 100 }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={prog.pct} aria-label="Questions answered">
          <i />
          <span>
            {prog.pct}% answered · {prog.done} of {prog.total}
          </span>
        </div>
        <ol className="gdn-rail-list">
          {sections.map((s, i) => {
            const sp = sectionProgress(s, a);
            const ok = sp.errors === 0 && (sp.done > 0 || s.optional);
            return (
              <li key={s.name} className={i === sIdx ? 'is-now' : ok ? 'is-done' : ''}>
                <button type="button" onClick={() => go(i)} aria-current={i === sIdx ? 'step' : undefined}>
                  <span aria-hidden="true">{ok && i !== sIdx ? '✓' : s.icon}</span>
                  <span className="pgs-onb-sn">{s.name}</span>
                  <small>{s.optional ? 'optional' : `${sp.done}/${sp.total}`}</small>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="pgs-onb-saved" role="status">
          <Icon name="check" size={13} strokeWidth={3} /> {savedAt ? `Saved on this device at ${timeOf(savedAt)}` : 'Your answers are kept on this device as you go'}
        </p>
      </aside>
      <div className="gdn-sheet" key={sIdx}>
        <p className="pgs-onb-step">
          Section {sIdx + 1} of {total}
        </p>
        <h3 className="gdn-sheet-h">
          <span aria-hidden="true">{sec.icon}</span> {sec.name}
        </h3>
        {sec.help && <p className="gdn-q-help">{sec.help}</p>}
        {sec.bank && sIdx === sections.findIndex((x) => x.bank) && (
          <p className="gdn-note">These answers go to {t.name?.first || 'your teen'}’s Teen panel profile, so they are not asked the same questions.</p>
        )}
        {isHealth && healthIntro !== 'answer' ? (
          <div className="gdn-health">
            <p className="gdn-kicker">{sec.intro.kicker}</p>
            <h4>{healthIntro === 'confirm' ? sec.intro.confirm.title : sec.intro.title}</h4>
            <p>{healthIntro === 'confirm' ? sec.intro.confirm.body : sec.intro.body}</p>
            {healthIntro !== 'confirm' && (
              <ul className="gdn-health-why">
                {sec.intro.reasons.map(([e, h, d]) => (
                  <li key={h}>
                    <span aria-hidden="true">{e}</span>
                    <b>{h}</b>
                    <small>{d}</small>
                  </li>
                ))}
              </ul>
            )}
            <p className="gdn-health-safe">
              <Icon name="lock" size={14} /> {sec.intro.assurance}
            </p>
            <div className="gdn-actions">
              <button type="button" className="gdn-btn is-ghost" onClick={() => (healthIntro === 'confirm' ? onDone() : setHealthIntro('confirm'))}>
                {healthIntro === 'confirm' ? sec.intro.confirm.leave : sec.intro.skipLabel}
              </button>
              <button type="button" className="gdn-btn" onClick={() => setHealthIntro('answer')}>
                {healthIntro === 'confirm' ? sec.intro.confirm.stay : sec.intro.startLabel}
              </button>
            </div>
          </div>
        ) : (
          <>
            {sec.qs.filter((q) => isShown(q, a)).map((q, i) => {
              const locked = q.n === 'P08';
              const bad = tried && !!errs[q.n];
              return (
                <div key={q.n} className={`gdn-q ${bad ? 'has-error' : ''}`} data-q={q.n} style={{ '--i': i }}>
                  <div className="gdn-q-head">
                    <p className="gdn-q-t">
                      {q.q} {isRequired(q, a) ? <span className="pgs-req">required</span> : <span className="gdn-opt">optional</span>}
                    </p>
                  </div>
                  {locked ? (
                    <p className="gdn-q-pre">
                      <Icon name="lock" size={14} /> {a.P08 || t.parent?.email || '—'}
                      <small>The address this invitation was sent to. Contact support to change it.</small>
                    </p>
                  ) : (
                    <>
                      {q.help && <p className="gdn-q-help">{q.help}</p>}
                      <QInput q={q} a={a} set={set} skin="gdq" invalid={bad} locked={{ P08: true }} />
                    </>
                  )}
                  {bad && (
                    <p className="field-error" role="alert">
                      {errs[q.n]}
                    </p>
                  )}
                  {q.n === 'P04' && a.P04 === 'unsure' && <p className="gdn-note">Thank you for being careful. You can continue; our team reviews the permission before your teen receives any survey.</p>}
                </div>
              );
            })}
            {gateNo && sec.qs.some((q) => q.n === 'P04') && (
              <div className="gdn-stop" role="alert">
                <b>Only a parent or legally authorised guardian can give this permission.</b>
                <p>If someone else in the family is the right person, please ask {t.name?.first || 'your teen'} to register again with their details, or choose No on the invitation.</p>
              </div>
            )}
            {tried && Object.keys(errs).length > 0 && (
              <p className="form-alert" role="alert">
                {Object.keys(errs).length === 1 ? 'One question in this section needs an answer.' : `${Object.keys(errs).length} questions in this section need an answer.`}
              </p>
            )}
            <div className="gdn-actions pgs-onb-actions">
              <button type="button" className="gdn-btn is-ghost" onClick={() => (sIdx > 0 ? go(sIdx - 1) : onExit())}>
                <Icon name="arrowLeft" size={16} /> {sIdx > 0 ? 'Back' : 'Parent section'}
              </button>
              <button type="button" className="gdn-btn is-ghost pgs-onb-later" onClick={onExit}>
                Save and finish later
              </button>
              <button type="button" className="gdn-btn" onClick={next} disabled={gateNo && sec.qs.some((q) => q.n === 'P04')}>
                {sIdx === sections.length - 1 ? 'Review my answers' : 'Save and continue'} <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ review
function Review({ t, a, onEdit, onBack, onSubmit, busy, err, again }) {
  const bad = firstErrorSection(a);
  const prog = onboardingProgress(a);
  return (
    <div className="wrap gdn-review">
      <p className="gdn-kicker">Card 1 · Check your answers</p>
      <h1>Is everything right?</h1>
      <p className="gdn-lead">
        {prog.done} of {prog.total} questions answered. Edit any section before you send the form{again ? '. Sending again replaces your earlier answers; nothing is added twice.' : '.'}
      </p>
      {bad >= 0 && (
        <p className="form-alert" role="alert">
          A required question in “{PARENT_SURVEY.sections[bad].name}” still needs an answer.{' '}
          <button type="button" className="link-soft" onClick={() => onEdit(bad)}>
            Go to it
          </button>
        </p>
      )}
      <div className="gdn-review-grid">
        {PARENT_SURVEY.sections.map((s, si) => (
          <section key={s.name} className="gdn-review-card" style={{ '--i': si }}>
            <h3>
              <span aria-hidden="true">{s.icon}</span> {s.name}
              <button type="button" className="link-soft" onClick={() => onEdit(si)}>
                Edit
              </button>
            </h3>
            <dl>
              {s.qs.filter((q) => isShown(q, a)).map((q) => (
                <div key={q.n}>
                  <dt>{q.q}</dt>
                  <dd>{answerText(q, a) || <i>{s.optional ? 'Skipped (optional)' : 'Not answered'}</i>}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      {err && (
        <p className="form-alert" role="alert">
          {err}
        </p>
      )}
      <div className="gdn-actions">
        <button type="button" className="gdn-btn is-ghost" onClick={onBack}>
          <Icon name="arrowLeft" size={16} /> Back to the form
        </button>
        <button type="button" className="gdn-btn" onClick={onSubmit} disabled={busy || bad >= 0} aria-busy={busy}>
          {busy ? (
            <>
              <span className="btn-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              {again ? 'Save my changes' : 'Submit the onboarding form'} <Icon name="arrow" size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ the Parent & guardian section (hub)
// Hero, the four steps and the three cards. Card 1 opens the form, card 2 the reward guide, card 3 the
// consent form once the onboarding form is sent.
function Hub({ t, a, onbSaved, consented, notice, onOpen, rewards, onCloseRewards }) {
  const teenName = t.name?.first || 'your teen';
  const draft = onboardingProgress(a);
  const onb = onbSaved ? 'completed' : draft.done > (a.P08 ? 1 : 0) ? 'in-progress' : 'not-started';
  const con = consented ? 'submitted' : onbSaved ? 'pending' : 'not-started';
  const status = { onboarding: onb, consent: con, profile: null, surveys: { open: false } };
  const steps = workflow(status);
  const who = { teenName: t.name?.first, guardianName: fullName(t.parent?.name), relation: t.parent?.relation ? relWord(t.parent.relation) : '', ref: t.ref };
  const cards = {
    onboarding: {
      status: onb,
      pct: draft.pct,
      meta: onb === 'completed' ? 'Sent. You can still edit it until you give consent.' : onb === 'in-progress' ? `${draft.done} of ${draft.total} answered · saved on this device` : 'About 6 minutes',
      cta: onb === 'completed' ? 'Review or edit answers' : onb === 'in-progress' ? 'Continue the form' : 'Start the form'
    },
    rewards: { status: 'off', label: 'Information', meta: 'Read before you give consent', cta: 'See how rewards work' },
    consent: {
      status: con,
      locked: !onbSaved,
      meta: consented ? 'Submitted' : onbSaved ? 'Ready for you to read and sign' : 'Opens after the onboarding form is sent',
      cta: consented ? 'Submitted' : onbSaved ? 'Review and give consent' : 'Send the onboarding form first'
    }
  };
  return (
    <div className="wrap pgs pgs--guardian">
      <HubStyles />
      <Hero mode="guardian" who={who} steps={steps}>
        {notice && (
          <p className={`pgs-notice ${notice.warn ? 'is-warn' : ''}`} role="status">
            <Icon name={notice.warn ? 'help' : 'check'} size={16} /> {notice.text}
          </p>
        )}
      </Hero>
      <Workflow mode="guardian" status={status} teenName={teenName} />
      <Cards cards={cards} onOpen={onOpen} />
      <Sheet open={rewards} onClose={onCloseRewards} tone="rw" kicker="Card 2 · for parents and guardians" title="Parent reward system" status={<Chip status="off">Information</Chip>}>
        <RewardGuide live={null} teenName={teenName} />
      </Sheet>
    </div>
  );
}

// ------------------------------------------------------------------ consent
// The approved Teen consent page (v1.1.0, "Two Turns") in guardian mode: Part A the terms, Part B the
// declaration and the separate permissions (3 required, 3 optional, all untapped), Part C shown as already
// recorded (the teen gave their own decision at registration). Saved with the same call as before:
// PUT /api/v1/user/parent-consent/:id { termsRead, declaration, selections, version }.
function Consent({ t, onSave, onFinish, onBack }) {
  const teen = t.name?.first || 'your teen';
  const p = t.parent || {};
  const cc = String(t.teen?.address?.country || '').toLowerCase();
  return (
    <div className="gdc gdc--kit">
      <ConsentKit
        kind="teen"
        label="Teen participation agreement and parental consent"
        config={{
          mode: 'guardian',
          member: { id: t.ref || '', firstName: p.name?.first || '', country: cc },
          teenName: teen,
          guardian: { name: fullName(p.name), relationship: p.relation || '', contactType: 'email', contact: p.email || '', country: cc, verified: true },
          termsVersion: GUARDIAN_TERMS_VERSION,
          continueUrl: '',
          logoutUrl: '',
          text: {
            hello: 'Hi {0} — the last step: your consent',
            hello_anon: 'The last step: your consent',
            lead: `Read it with ${teen} if you can. You give permission here; ${teen} already made their own decision when they registered. The account switches on only when both are done.`,
            role3_h: `${teen} decides`,
            j_teen: teen,
            lock_teen: `${teen}’s key`,
            on_file_note: 'We use the details from your onboarding form — nothing new to enter. Your confirmation goes to {0}.',
            done_active_h: 'Consent recorded — thank you!',
            done_active_p: `Your permission and ${teen}’s decision are both saved. ${teen} now gets a secure link to create their password.`,
            lock_open: 'Both keys turned',
            continue: 'See your confirmation',
            decline_h: 'Leave without finishing?',
            decline_p: 'Nothing is saved yet. You can come back to this page with the link in your email while it is valid.',
            decline_back: 'Back to the agreement',
            decline_out: 'Back to the Parent section'
          },
          save: onSave,
          onContinue: onFinish,
          onDecline: onBack
        }}
      />
    </div>
  );
}

// ------------------------------------------------------------------ done (certificate)
function Done({ t, res }) {
  return (
    <div className="wrap gdn-done">
      <HubStyles />
      <div className="gdn-cert">
        <span className="gdn-seal" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" pathLength="1" />
            <path d="M38 62l14 14 30-32" pathLength="1" />
          </svg>
        </span>
        <p className="gdn-kicker">Onboarding complete</p>
        <h1>Thank you, {t.parent?.name?.first || 'parent or guardian'}.</h1>
        <p className="gdn-lead">
          Your onboarding and consent are recorded. We have emailed {t.name?.first || 'your teen'} a secure link to create their own password ({res?.teenMasked || t.teen?.mail}), and sent you a confirmation.
        </p>
        <dl className="gdn-cert-dl">
          <div>
            <dt>Agreement</dt>
            <dd>{res?.consentVersion || GUARDIAN_TERMS_VERSION}</dd>
          </div>
          <div>
            <dt>Recorded</dt>
            <dd>{new Date(res?.acceptedAt || Date.now()).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Reference</dt>
            <dd data-allow-copy>{res?.ref || t.ref}</dd>
          </div>
        </dl>
        <p className="gdn-small">You can withdraw consent, change the optional permissions or ask us to delete the account at any time: support@turn2opinion.com.</p>
        <PreviewLinks links={[['Open the teen’s password email link', '?user=demo-teen&code=000000&s=demo&activate=1', '/join/teen/']]} />
      </div>
      <div className="pgs pgs--done">
        <Workflow mode="guardian" status={{ onboarding: 'completed', consent: 'submitted', profile: null, surveys: { open: false } }} teenName={t.name?.first || 'your teen'} />
        <p className="pgs-note">
          <Icon name="help" size={14} /> Your two steps are done. {t.name?.first || 'Your teen'} now creates a password, then completes their own About you profiles; surveys open after that. You can look through your answers, the reward rules and this consent with them any time in the Parent &amp; guardian section of their profile.
        </p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ decline (NO)
function Decline({ t, busy, err, onBack, onConfirm }) {
  const [reasons, setReasons] = useState([]);
  const [note, setNote] = useState('');
  const toggle = (id) => setReasons((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
  return (
    <div className="wrap gdx">
      <div className="gdx-card">
        <span className="gdx-pause" aria-hidden="true">
          <i />
          <i />
        </span>
        <p className="gdn-kicker">You chose not to enrol</p>
        <h1>Before we close this request, can you tell us why?</h1>
        <p className="gdn-lead">It’s optional, and it helps us improve. {t.name?.first || 'Your teen'} won’t see your reasons.</p>
        <div className="gdx-reasons" role="group" aria-label="Reasons">
          {DECLINE_REASONS.map(([id, label, e], i) => (
            <button key={id} type="button" role="checkbox" aria-checked={reasons.includes(id)} className={reasons.includes(id) ? 'is-on' : ''} style={{ '--i': i }} onClick={() => toggle(id)}>
              <span aria-hidden="true">{e}</span> {label}
            </button>
          ))}
        </div>
        <label className="gdx-note">
          <span>Anything else you’d like to tell us? (optional)</span>
          <textarea className="input" rows={3} value={note} maxLength={1000} onChange={(e) => setNote(e.target.value)} />
          <small>{note.length} / 1000</small>
        </label>
        <div className="gdx-what">
          <b>When you confirm:</b> no account is created, no password link is sent, {t.name?.first || 'your teen'} is told the registration can’t go ahead, and you get a confirmation email.
        </div>
        {err && (
          <p className="form-alert" role="alert">
            {err}
          </p>
        )}
        <div className="gdn-actions">
          <button type="button" className="gdn-btn is-ghost" onClick={onBack}>
            <Icon name="arrowLeft" size={16} /> I chose the wrong option
          </button>
          <button type="button" className="gdn-btn is-stop" disabled={busy} onClick={() => onConfirm(reasons, note)}>
            {busy ? 'Saving…' : 'Confirm: do not enrol'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Closed({ title, children, icon = 'clock' }) {
  return (
    <div className="wrap gdn-closed">
      <span className="gdn-closed-ico" aria-hidden="true">
        <Icon name={icon} size={34} />
      </span>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// ================================================================== page
export default function ParentConsent() {
  const [, setRegionsReady] = useState(false);
  useEffect(() => {
    warmRegions().then(() => setRegionsReady(true));
  }, []);
  const q = useMemo(() => (typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search || (window.location.hash.includes('?') ? window.location.hash.slice(window.location.hash.indexOf('?')) : ''))), []);
  const user = q.get('user');
  const code = q.get('code');
  const sig = q.get('s') || '';
  const [stage, setStage] = useState('loading');
  const [t, setT] = useState(null);
  const [a, setA] = useState({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [res, setRes] = useState(null);
  const [renew, setRenew] = useState('');
  const [onbStart, setOnbStart] = useState(0);
  const [onbSaved, setOnbSaved] = useState(false); // the onboarding form is on the server
  const [savedAt, setSavedAt] = useState(0); // last save of the answers on this device
  const [notice, setNotice] = useState(null);
  const [rewards, setRewards] = useState(false);
  const auth = { code, s: sig };

  const show = (s) => {
    setErr('');
    setStage(s);
    playSwitch(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user || !code) return setStage('expired');
    (async () => {
      try {
        const r = await api.post(`/api/v1/user/${user}`, { channel: 'parent-consent', ...auth });
        if (r?.status !== 'success' || !r.data) return setStage(/closed/i.test(r?.message || '') ? 'closed' : 'expired');
        const d = r.data;
        setT(d);
        // Only the guardian's own answers: the form they already sent, or their unsent answers on this device.
        const draft = readDraft(user);
        const mine = { ...(d.parent?.onboarding || {}), ...(draft?.a || {}) };
        if (d.parent?.email) mine.P08 = d.parent.email;
        setA(mine);
        if (draft) setSavedAt(draft.at);
        setOnbSaved(!!d.parent?.onboardingAt);
        if (d.parent?.consentStatus === 'approved' || d.parent?.consent === true) return setStage('already');
        if (d.parent?.decision === 'yes') return setStage('hub');
        const dd = q.get('d');
        setStage(dd === 'yes' ? 'verify' : dd === 'no' ? 'decline' : 'invite');
      } catch {
        setStage('expired');
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // keep the guardian's unsent answers on this device as they type (removed once the form is sent)
  useEffect(() => {
    if (!user || !['onboard', 'review'].includes(stage)) return;
    const tm = setTimeout(() => {
      const at = writeDraft(user, a);
      if (at) setSavedAt(at);
    }, 400);
    return () => clearTimeout(tm);
  }, [a, stage, user]);

  const call = async (fn, onOk) => {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const r = await fn();
      if (r?.status === 'success') return onOk(r.data || {});
      const m = r?.message || '';
      if (/expired/i.test(m)) return setStage('expired');
      setErr(m && m.length < 180 && !/error|exception|mongo/i.test(m) ? m : 'Something went wrong. Please try again.');
    } catch {
      setErr('We couldn’t reach Turn2Opinion. Check your connection and try again. Your answers are still here.');
    } finally {
      setBusy(false);
    }
  };

  const sayYes = () =>
    call(() => api.post(`/api/v1/user/parent-decision/${user}`, { ...auth, decision: 'yes' }), () => {
      setNotice({ text: `Thank you. Start with card 1, the onboarding form. Card 3, the consent form, opens once it is sent.` });
      show('hub');
    });
  const sayNo = (reasons, note) => call(() => api.post(`/api/v1/user/parent-decision/${user}`, { ...auth, decision: 'no', reasons, note }), () => show('declined'));
  const saveOnboarding = () => {
    const answers = Object.fromEntries(Object.entries(a).filter(([k]) => !k.includes(':')));
    const again = onbSaved;
    return call(() => api.put(`/api/v1/user/parent-onboarding/${user}`, { ...auth, answers }), (data) => {
      dropDraft();
      setSavedAt(0);
      setOnbSaved(true);
      playSuccess();
      setNotice(
        data.needsReview
          ? { warn: true, text: 'Onboarding form saved. Because you weren’t sure you are legally authorised, our team checks the permission before any survey is sent. You can continue to the consent form.' }
          : { text: again ? 'Your changes are saved. Next: card 3, the consent form.' : 'Onboarding form submitted. Next: card 3, the consent form.' }
      );
      show('hub');
    });
  };
  // Called by the consent page; throwing shows its "couldn't send" message with a retry.
  const giveConsent = async (rec) => {
    const c = rec?.consents || {};
    const selections = Object.fromEntries(SELECTIONS.map((x) => [x.id, c[x.id] === true]));
    const r = await api.put(`/api/v1/user/parent-consent/${user}`, { ...auth, termsRead: rec?.termsAccepted === true, declaration: SELECTIONS.filter((x) => x.required).every((x) => selections[x.id]), selections, version: GUARDIAN_TERMS_VERSION });
    if (r?.status !== 'success') {
      const m = r?.message || '';
      if (/expired/i.test(m)) setStage('expired');
      throw new Error(m || 'save failed');
    }
    setRes(r.data || {});
    playSuccess();
    return { consentId: r.data?.ref || r.data?.consentId, accountActivationStatus: 'active' };
  };
  const askRenew = async () => {
    setRenew('sending');
    try {
      const r = await api.post(`/api/v1/user/parent-link-renew/${user}`, {});
      setRenew(r?.message || 'If the request is still open, a new link is on its way.');
    } catch {
      setRenew('We couldn’t send it right now. Please try again later.');
    }
  };
  const openCard = (k) => {
    if (k === 'rewards') return setRewards(true);
    if (k === 'onboarding') {
      setNotice(null);
      if (onbSaved && firstErrorSection(a) < 0) return show('review');
      setOnbStart(Math.max(0, firstErrorSection(a)));
      return show('onboard');
    }
    if (k === 'consent') {
      if (!onbSaved) {
        setNotice({ warn: true, text: 'Please send the onboarding form (card 1) first. The consent form opens straight after.' });
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setNotice(null);
      show('consent');
    }
  };

  const teenName = t?.name?.first;
  if (stage === 'loading')
    return (
      <GuardianFrame stage="loading">
        <Closed title="Opening your secure page…" icon="refresh">
          <p>One moment.</p>
        </Closed>
      </GuardianFrame>
    );
  if (stage === 'expired')
    return (
      <GuardianFrame stage="expired">
        <Closed title="This link has expired or was already used">
          <p>For a teen’s safety our links work for 7 days and are replaced whenever a new email is sent. Use the newest email from us, or ask for a fresh link to the address on file.</p>
          {user ? (
            <button type="button" className="gdn-btn" onClick={askRenew} disabled={renew === 'sending'}>
              {renew === 'sending' ? 'Sending…' : 'Email me a new link'}
            </button>
          ) : null}
          {renew && renew !== 'sending' && (
            <p className="gdn-small" role="status">
              {renew}
            </p>
          )}
          <p className="gdn-small">Need help? support@turn2opinion.com</p>
        </Closed>
      </GuardianFrame>
    );
  if (stage === 'closed')
    return (
      <GuardianFrame stage="closed">
        <Closed title="This registration is closed" icon="lock">
          <p>A decision has already been recorded for this request, so nothing more is needed. If this is a mistake, contact support@turn2opinion.com.</p>
        </Closed>
      </GuardianFrame>
    );
  if (stage === 'already')
    return (
      <GuardianFrame stage="done" teenName={teenName}>
        <Closed title="You’ve already given consent" icon="check">
          <p>Thank you. {teenName || 'Your teen'} has been sent their password link. Nothing more is needed. Once they sign in, you can look through your answers, the reward rules and your consent together in the Parent &amp; guardian section of their profile.</p>
        </Closed>
      </GuardianFrame>
    );
  if (stage === 'declined')
    return (
      <GuardianFrame stage="declined" teenName={teenName}>
        <Closed title="Your decision is recorded" icon="check">
          <p>{teenName || 'The teen'}’s registration will not go ahead. No account was created and no password link will be sent. We’ve emailed you a confirmation, and let {teenName || 'them'} know.</p>
          <Link to="/" className="gdn-btn is-ghost">
            Go to Turn2Opinion
          </Link>
        </Closed>
      </GuardianFrame>
    );

  return (
    <GuardianFrame stage={stage === 'decline' ? 'decline' : stage} teenName={teenName}>
      {stage === 'invite' && <Invite t={t} onYes={() => show('verify')} onNo={() => show('decline')} />}
      {stage === 'verify' && <Verify t={t} busy={busy} err={err} onBack={() => show('invite')} onConfirm={sayYes} />}
      {stage === 'decline' && <Decline t={t} busy={busy} err={err} onBack={() => show('invite')} onConfirm={sayNo} />}
      {stage === 'hub' && <Hub t={t} a={a} onbSaved={onbSaved} consented={false} notice={notice} onOpen={openCard} rewards={rewards} onCloseRewards={() => setRewards(false)} />}
      {stage === 'onboard' && <Onboarding t={t} a={a} setA={setA} savedAt={savedAt} start={onbStart} onDone={() => show('review')} onExit={() => show('hub')} />}
      {stage === 'review' && (
        <Review
          t={t}
          a={a}
          busy={busy}
          err={err}
          again={onbSaved}
          onBack={() => {
            setOnbStart(PARENT_SURVEY.sections.length - 1);
            show('onboard');
          }}
          onEdit={(si) => {
            setOnbStart(si);
            show('onboard');
          }}
          onSubmit={saveOnboarding}
        />
      )}
      {stage === 'consent' && <Consent t={t} onSave={giveConsent} onFinish={() => show('done')} onBack={() => show('hub')} />}
      {stage === 'done' && <Done t={t} res={res} a={a} />}
    </GuardianFrame>
  );
}
