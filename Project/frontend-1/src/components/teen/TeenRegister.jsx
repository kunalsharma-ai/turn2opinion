// Teen panel registration (13–17), Steps 1–4, plus the entry screen (21 Nov 2026).
//
//   entry   /join/teen/ opened directly: what the Teen panel is and how the four steps work
//   1 You            first, middle, last, birthday (13–17 only), email, phone (optional), gender,
//                    country (flags) -> state -> city -> postal code, each searchable or typed in
//   2 Guardian       Mother / Father / Legal guardian cards (one only); first, middle, last, birthday,
//                    gender (legal guardian only), email, phone (optional)
//   3 Promise        what happens next, how the information is used, and 7 separate, unticked
//                    confirmations + CAPTCHA -> "Complete registration" -> PUT /api/v1/user
//   4 Sent           the request is pending: masked emails, reference, live status line
//
// Nothing is sent before step 3. The draft is kept in sessionStorage so a refresh or Back never
// loses it. The API checks the age again, records the step-3 confirmations with their version and
// emails the teen (confirmation) and the guardian (YES / NO invitation).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, hrefFor } from '../../router/Router.jsx';
import { SITE } from '../../config/site.js';
import { COUNTRIES } from '../../data/countries.js';
import { api } from '../../utils/api.js';
import { track } from '../../utils/analytics.js';
import { playSuccess, playSwitch, pop } from '../../utils/sound.js';
import Captcha, { captchaLocalOk, captchaPayload, captchaReady, isCaptchaError } from '../Captcha.jsx';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import PreviewLinks from '../PreviewLinks.jsx';
import { DateField, EMAIL_RE, Field, formatDate, PhoneField } from '../FormFields.jsx';
import LocationFields, { locationErrors } from '../onboarding/LocationFields.jsx';
import { fullPhone, NAME_RE, phoneError } from '../../utils/signup.js';
import { readReferral, clearReferral } from '../../utils/referral.js';
import {
  ageRoute, apiGender, exactAge, maskEmail, RELATIONS, relWord, STATUS_LINE, TEEN_GENDERS, TEEN_REG_CONSENT_VERSION, TEEN_STATEMENTS
} from '../../data/teen/registration.js';

const DRAFT = 't2o_teen_reg_v3';
const EMPTY_GUARDIAN = { rel: '', first: '', middle: '', last: '', dob: '', gender: '', email: '', dial: '', phone: '' };
export const TEEN_EMPTY = {
  firstName: '', middleName: '', lastName: '', dob: '', email: '', dial: '', phone: '', gender: '', genderSelf: '',
  country: '', state: '', city: '', zipcode: '', hasStates: false, noPostal: false,
  parent: EMPTY_GUARDIAN, consents: {}
};
const LEVELS = [
  ['You', 'user', 'Your details'],
  ['Guardian', 'users', 'Who gives consent'],
  ['Promise', 'shield', 'Confirm & send'],
  ['Sent', 'send', 'What happens next']
];

function teenWindow(now = new Date()) {
  return {
    max: new Date(now.getFullYear() - SITE.minAge, now.getMonth(), now.getDate()),
    min: new Date(now.getFullYear() - SITE.adultAge, now.getMonth(), now.getDate() + 1)
  };
}
const readDraft = () => {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT)) || null;
  } catch {
    return null;
  }
};
const fullName = (a, b, c) => [a, b, c].map((s) => String(s || '').trim()).filter(Boolean).join(' ');

// ---------------------------------------------------------------- validation
function validate(step, f) {
  const e = {};
  if (step === 0) {
    if (!f.firstName.trim()) e.firstName = 'Enter your first name.';
    else if (!NAME_RE.test(f.firstName.trim())) e.firstName = 'Use letters only (any language).';
    if (f.middleName.trim() && !NAME_RE.test(f.middleName.trim())) e.middleName = 'Use letters only, or leave it empty.';
    if (!f.lastName.trim()) e.lastName = 'Enter your last name.';
    else if (!NAME_RE.test(f.lastName.trim())) e.lastName = 'Use letters only (any language).';
    const r = ageRoute(f.dob);
    if (!f.dob) e.dob = 'Pick your date of birth.';
    else if (r === 'future' || r === null) e.dob = 'That date isn’t possible. Pick your real birthday.';
    else if (r === 'blocked') e.dob = `The Teen panel starts at ${SITE.minAge}.`;
    else if (r === 'adult') e.dob = 'You are 18 or older, so you join the adult panel instead.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter your email address, like name@example.com.';
    if (f.phone.trim()) {
      const pe = phoneError(f.dial, f.phone);
      if (pe) e.phone = pe;
    }
    if (!f.gender) e.gender = 'Choose an option (or “Prefer not to say”).';
    if (f.gender === 'self' && f.genderSelf.trim().length > 40) e.genderSelf = 'Keep it under 40 characters.';
    Object.assign(e, locationErrors(f.noPostal ? { ...f, zipcode: 'skip' } : f));
    if (f.noPostal) delete e.zipcode;
  }
  if (step === 1) {
    const p = f.parent;
    if (!p.rel) e['parent.rel'] = 'Choose Mother, Father or Legal guardian.';
    else {
      if (!p.first.trim()) e['parent.first'] = 'Enter their first name.';
      else if (!NAME_RE.test(p.first.trim())) e['parent.first'] = 'Use letters only.';
      if (p.middle.trim() && !NAME_RE.test(p.middle.trim())) e['parent.middle'] = 'Use letters only, or leave it empty.';
      if (!p.last.trim()) e['parent.last'] = 'Enter their last name.';
      else if (!NAME_RE.test(p.last.trim())) e['parent.last'] = 'Use letters only.';
      const pa = exactAge(p.dob);
      if (!p.dob) e['parent.dob'] = 'Pick their date of birth.';
      else if (pa === null || pa < 18) e['parent.dob'] = 'A parent or guardian must be 18 or older.';
      else if (pa > 110) e['parent.dob'] = 'Check the year.';
      if (p.rel === 'guardian' && !p.gender) e['parent.gender'] = 'Choose the guardian’s gender.';
      if (!EMAIL_RE.test(p.email.trim())) e['parent.email'] = 'Enter their email address, like name@example.com.';
      else if (p.email.trim().toLowerCase() === f.email.trim().toLowerCase()) e['parent.email'] = 'This must be their own email, not yours.';
      if (p.phone.trim()) {
        const pe = phoneError(p.dial, p.phone);
        if (pe) e['parent.phone'] = pe;
      }
    }
  }
  if (step === 2) {
    TEEN_STATEMENTS.forEach((s) => {
      if (!f.consents[s.id]) e[`c.${s.id}`] = 'Please tick this box to continue.';
    });
  }
  return e;
}

// ---------------------------------------------------------------- the live "backstage pass"
function Pass({ f, step }) {
  const ref = useRef(null);
  const c = COUNTRIES.find((x) => x.c === f.country);
  const age = exactAge(f.dob);
  const rel = RELATIONS.find((r) => r.id === f.parent.rel);
  const move = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`);
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
    el.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
  };
  const leave = () => ref.current && (ref.current.style.cssText = '');
  return (
    <div className="trg-pass-scene" onMouseMove={move} onMouseLeave={leave} aria-hidden="true">
      <div className={`trg-pass at-${step}`} ref={ref}>
        <span className="trg-pass-holo" />
        <span className="trg-pass-punch" />
        <div className="trg-pass-top">
          <b>Turn2Opinion</b>
          <span>Teen pass · 13–17</span>
        </div>
        <div className="trg-pass-face">
          <span className="trg-pass-avatar">{(f.firstName.trim()[0] || '?').toUpperCase()}</span>
          <div>
            <p className="trg-pass-name">{fullName(f.firstName, f.middleName, f.lastName) || 'Your name'}</p>
            <p className="trg-pass-mail">{f.email || 'you@example.com'}</p>
          </div>
        </div>
        <dl className="trg-pass-grid">
          <div>
            <dt>Age</dt>
            <dd>{age !== null && age >= 13 && age < 18 ? age : '—'}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{c ? <><Flag code={c.c} size={14} /> {c.c}</> : '—'}</dd>
          </div>
          <div>
            <dt>Guardian</dt>
            <dd>{rel ? `${rel.emoji} ${rel.label}` : '—'}</dd>
          </div>
        </dl>
        <div className="trg-pass-bar">
          {LEVELS.map(([l], i) => (
            <i key={l} className={i < step ? 'is-done' : i === step ? 'is-now' : ''} />
          ))}
        </div>
        <span className="trg-pass-stamp">{step >= 3 ? 'PENDING GUARDIAN' : 'DRAFT'}</span>
      </div>
      <span className="trg-orb o1" />
      <span className="trg-orb o2" />
      <span className="trg-orb o3" />
    </div>
  );
}

// ---------------------------------------------------------------- level map (progress)
function LevelMap({ step }) {
  return (
    <ol className="trg-levels" aria-label="Registration progress">
      {LEVELS.map(([l, ic, d], i) => (
        <li key={l} className={i < step ? 'is-done' : i === step ? 'is-now' : ''} aria-current={i === step ? 'step' : undefined}>
          <span className="trg-lv-node">{i < step ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name={ic} size={15} />}</span>
          <span className="trg-lv-txt">
            <b>
              {i + 1}. {l}
            </b>
            <small>{d}</small>
          </span>
        </li>
      ))}
      <span className="trg-lv-track" style={{ '--p': step / (LEVELS.length - 1) }} aria-hidden="true" />
    </ol>
  );
}

// ---------------------------------------------------------------- step 0 entry
function Entry({ onStart }) {
  return (
    <section className="trg-entry">
      <div className="trg-entry-sky" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap trg-entry-grid">
        <div className="trg-entry-copy">
          <p className="trg-chip">
            <span /> Teen panel · ages 13–17
          </p>
          <h1>
            Your opinion has a <em>backstage pass</em>.
          </h1>
          <p className="trg-entry-lead">
            Brands want to hear from people your age. Register in three short steps, your parent or legal guardian says yes, and then you create your own password. Five minutes, no fees, nothing to buy.
          </p>
          <button type="button" className="trg-go" onClick={onStart}>
            Start my registration <Icon name="arrow" size={18} />
          </button>
          <p className="trg-entry-alt">
            Already registered? <Link to="/login/">Log in</Link> · 18 or older? <Link to="/join/">Join the adult panel</Link>
          </p>
        </div>
        <ol className="trg-entry-route">
          {[
            ['🙋', 'You', 'Name, birthday, email and where you live.'],
            ['👪', 'Your guardian', 'Mother, father or legal guardian and their contact.'],
            ['✍️', 'Your promise', 'Read how it works and tick the boxes.'],
            ['📬', 'They decide', 'We email them. If they say yes, you get a password link.']
          ].map(([e, t, d], i) => (
            <li key={t} style={{ '--i': i }}>
              <span className="trg-route-emoji">{e}</span>
              <span>
                <b>{t}</b>
                <small>{d}</small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- step 1
function GenderChips({ value, onPick, error }) {
  return (
    <div className={`trg-gender ${error ? 'has-error' : ''}`} role="radiogroup" aria-label="Gender">
      {TEEN_GENDERS.map(([v, l, g], i) => (
        <button key={v} type="button" role="radio" aria-checked={value === v} className={value === v ? 'is-on' : ''} style={{ '--i': i }} onClick={() => onPick(v)}>
          <span aria-hidden="true">{g}</span> {l}
        </button>
      ))}
    </div>
  );
}

function StepYou({ f, set, errOf, okOf, touch, dates, onDob }) {
  const age = exactAge(f.dob);
  return (
    <div className="trg-step trg-you">
      <header className="trg-step-head">
        <span className="trg-step-emoji" aria-hidden="true">
          🙋
        </span>
        <div>
          <h2>Tell us about you</h2>
          <p>Use your real details. Your guardian sees them before they decide.</p>
        </div>
      </header>

      <div className="trg-block">
        <p className="trg-block-t">Your name</p>
        <div className="trg-grid3">
          <div data-k="firstName">
            <Field id="t-first" label="First name" error={errOf('firstName')} valid={okOf('firstName')}>
              <input id="t-first" className="input" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={touch('firstName')} autoComplete="given-name" maxLength={49} aria-required="true" />
            </Field>
          </div>
          <div data-k="middleName">
            <Field id="t-middle" label="Middle name" hint="Optional" error={errOf('middleName')} valid={okOf('middleName') && !!f.middleName.trim()}>
              <input id="t-middle" className="input" value={f.middleName} onChange={(e) => set('middleName', e.target.value)} onBlur={touch('middleName')} autoComplete="additional-name" maxLength={49} />
            </Field>
          </div>
          <div data-k="lastName">
            <Field id="t-last" label="Last name" error={errOf('lastName')} valid={okOf('lastName')}>
              <input id="t-last" className="input" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={touch('lastName')} autoComplete="family-name" maxLength={49} aria-required="true" />
            </Field>
          </div>
        </div>
      </div>

      <div className="trg-block">
        <p className="trg-block-t">Birthday</p>
        <div className="trg-grid2">
          <div data-k="dob">
            <Field id="t-dob" label="Date of birth" error={errOf('dob')} valid={!!f.dob && !errOf('dob') && age !== null}>
              <DateField id="t-dob" value={f.dob} onChange={onDob} invalid={!!errOf('dob')} minDate={dates.min} maxDate={new Date()} lockedYears={2} foot="Ages 13–17. Turned 18? Use the adult panel." />
            </Field>
          </div>
          <div className="trg-age-badge" aria-live="polite">
            {age !== null && age >= 13 && age < 18 ? (
              <>
                <b>{age}</b>
                <span>years old · Teen panel</span>
              </>
            ) : (
              <span>Your age appears here</span>
            )}
          </div>
        </div>
      </div>

      <div className="trg-block">
        <p className="trg-block-t">Contact</p>
        <div className="trg-grid2">
          <div data-k="email">
            <Field id="t-email" label="Email address" error={errOf('email')} valid={okOf('email')} hint="Your own. It becomes your username, and your password link comes here.">
              <input id="t-email" className="input" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={touch('email')} autoComplete="email" maxLength={120} aria-required="true" />
            </Field>
          </div>
          <div data-k="phone">
            <Field id="t-phone" label="Phone number" hint="Optional. Only if you have your own." error={errOf('phone')} valid={okOf('phone') && !!f.phone}>
              <PhoneField id="t-phone" country={f.dial} number={f.phone} onCountry={(c) => set('dial', c)} onNumber={(v) => set('phone', v)} onBlur={touch('phone')} invalid={!!errOf('phone')} />
            </Field>
          </div>
        </div>
      </div>

      <div className="trg-block">
        <p className="trg-block-t">Gender</p>
        <div data-k="gender">
          <GenderChips value={f.gender} error={errOf('gender')} onPick={(g) => { set('gender', g); touch('gender')(); }} />
          {errOf('gender') && (
            <p className="field-error" role="alert">
              {errOf('gender')}
            </p>
          )}
        </div>
        {f.gender === 'self' && (
          <div data-k="genderSelf" className="trg-self">
            <Field id="t-gself" label="How do you describe yourself?" hint="Optional. You can leave this empty." error={errOf('genderSelf')}>
              <input id="t-gself" className="input" value={f.genderSelf} onChange={(e) => set('genderSelf', e.target.value)} maxLength={40} />
            </Field>
          </div>
        )}
      </div>

      <div className="trg-block">
        <p className="trg-block-t">Where you live</p>
        <LocationFields loc={f} set={set} errOf={errOf} touch={touch} idp="t-loc" freeState noPostal={f.noPostal} onNoPostal={(v) => { set('noPostal', v); if (v) set('zipcode', ''); }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- step 2
function StepGuardian({ f, setParent, errOf, okOf, touchP }) {
  const p = f.parent;
  const rel = RELATIONS.find((r) => r.id === p.rel);
  const now = new Date();
  const adultMax = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  const who = rel ? rel.label : 'Guardian';
  return (
    <div className="trg-step trg-guardian">
      <header className="trg-step-head">
        <span className="trg-step-emoji" aria-hidden="true">
          👪
        </span>
        <div>
          <h2>Who gives consent?</h2>
          <p>Pick one person. We email them the invitation and the forms, and nothing else.</p>
        </div>
      </header>
      <div className="trg-rel-deck" role="radiogroup" aria-label="Parent or legal guardian" data-k="parent.rel">
        {RELATIONS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={p.rel === r.id}
            className={`trg-rel ${p.rel === r.id ? 'is-on' : p.rel ? 'is-off' : ''}`}
            style={{ '--g1': r.grade[0], '--g2': r.grade[1], '--i': i }}
            onClick={() => {
              if (p.rel === r.id) return;
              setParent('rel', r.id);
              if (r.id !== 'guardian') setParent('gender', '');
              playSwitch(true);
            }}
          >
            <span className="trg-rel-glow" aria-hidden="true" />
            <span className="trg-rel-emoji" aria-hidden="true">
              {r.emoji}
            </span>
            <b>{r.label}</b>
            <small>{r.line}</small>
            <span className="trg-rel-tick" aria-hidden="true">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
          </button>
        ))}
      </div>
      {errOf('parent.rel') && (
        <p className="field-error" role="alert">
          {errOf('parent.rel')}
        </p>
      )}
      {rel && (
        <div className="trg-gform" key={p.rel} style={{ '--g1': rel.grade[0], '--g2': rel.grade[1] }}>
          <p className="trg-gform-t">
            <span aria-hidden="true">{rel.emoji}</span> Your {rel.label.toLowerCase()}’s details
          </p>
          <div className="trg-grid3">
            <div data-k="parent.first">
              <Field id="g-first" label="First name" error={errOf('parent.first')} valid={okOf('parent.first')}>
                <input id="g-first" className="input" value={p.first} onChange={(e) => setParent('first', e.target.value)} onBlur={touchP('first')} maxLength={49} autoComplete="off" />
              </Field>
            </div>
            <div data-k="parent.middle">
              <Field id="g-middle" label="Middle name" hint="Optional" error={errOf('parent.middle')}>
                <input id="g-middle" className="input" value={p.middle} onChange={(e) => setParent('middle', e.target.value)} onBlur={touchP('middle')} maxLength={49} autoComplete="off" />
              </Field>
            </div>
            <div data-k="parent.last">
              <Field id="g-last" label="Last name" error={errOf('parent.last')} valid={okOf('parent.last')}>
                <input id="g-last" className="input" value={p.last} onChange={(e) => setParent('last', e.target.value)} onBlur={touchP('last')} maxLength={49} autoComplete="off" />
              </Field>
            </div>
          </div>
          <div className="trg-grid2">
            <div data-k="parent.dob">
              <Field id="g-dob" label={`${who}’s date of birth`} error={errOf('parent.dob')} valid={!!p.dob && !errOf('parent.dob')}>
                <DateField id="g-dob" value={p.dob} maxDate={adultMax} onChange={(v) => { setParent('dob', v); touchP('dob')(); }} invalid={!!errOf('parent.dob')} />
              </Field>
            </div>
            {p.rel === 'guardian' && (
              <div data-k="parent.gender">
                <Field id="g-gender" label="Guardian’s gender" error={errOf('parent.gender')}>
                  <div className="trg-gender is-small" role="radiogroup" aria-label="Guardian’s gender" id="g-gender">
                    {[['Female', '♀'], ['Male', '♂'], ['Other', '⚧']].map(([g, s]) => (
                      <button key={g} type="button" role="radio" aria-checked={p.gender === g} className={p.gender === g ? 'is-on' : ''} onClick={() => { setParent('gender', g); touchP('gender')(); }}>
                        <span aria-hidden="true">{s}</span> {g}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            )}
          </div>
          <div className="trg-grid2">
            <div data-k="parent.email">
              <Field id="g-email" label={`${who}’s email address`} error={errOf('parent.email')} valid={okOf('parent.email')} hint="We send the invitation, the onboarding form and the consent form here. It is used to verify them and never for marketing.">
                <input id="g-email" className="input" type="email" value={p.email} onChange={(e) => setParent('email', e.target.value)} onBlur={touchP('email')} maxLength={120} autoComplete="off" />
              </Field>
            </div>
            <div data-k="parent.phone">
              <Field id="g-phone" label={`${who}’s phone number`} hint="Optional" error={errOf('parent.phone')} valid={okOf('parent.phone') && !!p.phone}>
                <PhoneField id="g-phone" country={p.dial} number={p.phone} onCountry={(c) => setParent('dial', c)} onNumber={(v) => setParent('phone', v)} onBlur={touchP('phone')} invalid={!!errOf('parent.phone')} />
              </Field>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- step 3
function StepPromise({ f, setConsent, errOf, onEdit, captchaBox }) {
  const word = relWord(f.parent.rel);
  const c = COUNTRIES.find((x) => x.c === f.country);
  const all = TEEN_STATEMENTS.every((s) => f.consents[s.id]);
  const count = TEEN_STATEMENTS.filter((s) => f.consents[s.id]).length;
  return (
    <div className="trg-step trg-promise">
      <header className="trg-step-head">
        <span className="trg-step-emoji" aria-hidden="true">
          ✍️
        </span>
        <div>
          <h2>Read, check, promise</h2>
          <p>Read this with your {word} if you can. Nothing is sent until you press the button.</p>
        </div>
      </header>

      <div className="trg-doc">
        <div className="trg-doc-tab">Teen panel · how it works</div>
        <div className="trg-doc-cols">
          <section>
            <h3>🎯 What the Teen panel is</h3>
            <p>Short, age-appropriate online surveys about things like tech, entertainment, shopping and everyday life. Completed surveys can earn rewards. It is free and voluntary, and you never have to buy anything.</p>
          </section>
          <section>
            <h3>👪 Why your {word} is involved</h3>
            <p>Under 18, you can only take part with the permission of a parent or legal guardian. They decide first, and they can change their mind at any time.</p>
          </section>
          <section>
            <h3>🗂️ How your information is used</h3>
            <p>Your details let us check you are eligible and send surveys that fit your age and country. We never ask for your school name or home address, never sell your data and never show it to other members.</p>
          </section>
          <section>
            <h3>🔑 How you get in</h3>
            <p>When your {word} has finished, we email you a secure link to create your own password. Your username is your email address. We never send passwords by email.</p>
          </section>
        </div>
        <ol className="trg-doc-flow">
          {[
            ['📨', `We email your ${word}`, 'An invitation with two buttons: Yes or No.'],
            ['📝', 'Onboarding form', 'A few questions about them, if they say yes.'],
            ['✅', 'Consent form', 'They read the agreement and tick their permissions.'],
            ['🔑', 'Your password link', 'Sent to your email. Then you log in.']
          ].map(([e, t, d], i) => (
            <li key={t} style={{ '--i': i }}>
              <span>{e}</span>
              <b>{t}</b>
              <small>{d}</small>
            </li>
          ))}
        </ol>
      </div>

      <div className="trg-recap">
        <div>
          <p className="trg-recap-h">
            You <button type="button" className="link-soft" onClick={() => onEdit(0)}>Edit</button>
          </p>
          <p>
            <b>{fullName(f.firstName, f.middleName, f.lastName)}</b> · {formatDate(f.dob)} · {f.email}
          </p>
          <p>
            {c && <Flag code={c.c} size={14} />} {[f.city, f.zipcode, c?.n].filter(Boolean).join(', ')}
          </p>
        </div>
        <div>
          <p className="trg-recap-h">
            Your {word} <button type="button" className="link-soft" onClick={() => onEdit(1)}>Edit</button>
          </p>
          <p>
            <b>{fullName(f.parent.first, f.parent.middle, f.parent.last)}</b> · {f.parent.email}
          </p>
        </div>
      </div>

      <fieldset className="trg-ticks">
        <legend>
          Tick each box <span className="trg-count">{count} / {TEEN_STATEMENTS.length}</span>
        </legend>
        {TEEN_STATEMENTS.map((s, i) => (
          <div key={s.id} data-k={`c.${s.id}`}>
            <label className={`trg-tick ${f.consents[s.id] ? 'is-on' : ''} ${errOf(`c.${s.id}`) ? 'has-error' : ''}`} style={{ '--i': i }}>
              <input type="checkbox" checked={!!f.consents[s.id]} onChange={(e) => setConsent(s.id, e.target.checked)} />
              <span className="trg-tick-box" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12.5l4.2 4.2L19 7" pathLength="1" />
                </svg>
              </span>
              <span className="trg-tick-ico" aria-hidden="true">
                {s.icon}
              </span>
              <span className="trg-tick-txt">
                {s.text(word)}
                {s.link && (
                  <>
                    {' '}
                    <a href={hrefFor(s.link[0])} target="_blank" rel="noopener">
                      {s.link[1]}
                    </a>
                  </>
                )}
                {s.after || (s.link ? '.' : '')}
              </span>
            </label>
            {errOf(`c.${s.id}`) && (
              <p className="field-error" role="alert">
                {errOf(`c.${s.id}`)}
              </p>
            )}
          </div>
        ))}
        <p className="trg-ticks-note">
          {all ? 'All set. ' : ''}Recorded with version {TEEN_REG_CONSENT_VERSION}, the date and time, and your registration reference.
        </p>
      </fieldset>
      {captchaBox}
    </div>
  );
}

// ---------------------------------------------------------------- step 4
export function TeenStatusLine({ status = 'parent-verification-pending', compact = false }) {
  const at = { 'registration-started': 0, 'parent-verification-pending': 1, 'parent-reviewing': 1, 'onboarding-pending': 2, 'consent-pending': 3, 'account-activation-pending': 4, 'account-active': 5 }[status] ?? 1;
  return (
    <ol className={`trg-metro ${compact ? 'is-compact' : ''}`} aria-label="Registration status">
      {STATUS_LINE.map(([k, l, d], i) => {
        const done = i < at || (status === 'account-active' && i === at);
        const now = i === at && status !== 'account-active';
        return (
          <li key={k} className={done ? 'is-done' : now ? 'is-now' : ''}>
            <span className="trg-metro-dot" aria-hidden="true">
              {done ? <Icon name="check" size={12} strokeWidth={3} /> : now ? <i /> : null}
            </span>
            <span>
              <b>{l}</b>
              {!compact && <small>{d}</small>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Sent({ f, result }) {
  const [resend, setResend] = useState('');
  const word = relWord(f.parent.rel);
  const ask = async () => {
    setResend('sending');
    try {
      const r = await api.post('/api/v1/user/parent-consent-resend', { mail: f.email.trim().toLowerCase() });
      setResend(r?.message || 'Sent again.');
    } catch {
      setResend('We couldn’t send it right now. Please try again in a minute.');
    }
  };
  return (
    <section className="trg-sent">
      <div className="trg-sent-sky" aria-hidden="true">
        <svg className="trg-plane-path" viewBox="0 0 600 220" preserveAspectRatio="none">
          <path d="M20 190 C 160 40, 300 210, 440 70 S 560 40, 585 60" pathLength="1" />
        </svg>
        <span className="trg-plane">✈️</span>
        <span className="trg-inbox">📬</span>
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} className="trg-confetto" style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap trg-sent-grid">
        <div className="trg-sent-copy">
          <p className="trg-chip is-lime">
            <span /> Registration submitted
          </p>
          <h1>Sent! Now it’s your {word}’s turn.</h1>
          <p className="trg-sent-lead">
            We emailed an invitation to <b>{result.parentMasked || maskEmail(f.parent.email)}</b> and a confirmation to <b>{maskEmail(f.email)}</b>.
          </p>
          <div className="trg-inactive">
            <Icon name="lock" size={18} />
            <span>
              <b>Your account is not active yet.</b> It switches on only after your {word} says yes and completes the onboarding and consent forms.
            </span>
          </div>
          <ul className="trg-next">
            <li>
              <span>1</span> Your {word} opens our email and chooses <b>Yes</b> or <b>No</b>.
            </li>
            <li>
              <span>2</span> If yes, they fill in the onboarding form and the consent form.
            </li>
            <li>
              <span>3</span> We email you a secure link to create your password.
            </li>
            <li>
              <span>4</span> You log in with <b>{f.email}</b> as your username.
            </li>
          </ul>
          <div className="trg-ref">
            <span>Registration reference</span>
            <b data-allow-copy>{result.ref || 'T2O-TN-······'}</b>
          </div>
          <div className="trg-sent-actions">
            <button type="button" className="trg-go is-ghost" onClick={ask} disabled={resend === 'sending'}>
              {resend === 'sending' ? 'Sending…' : `Email my ${word} again`}
            </button>
            <Link to="/earn/teens/" className="trg-go">
              How the Teen panel works <Icon name="arrow" size={18} />
            </Link>
          </div>
          {resend && resend !== 'sending' && (
            <p className="trg-resend" role="status">
              {resend}
            </p>
          )}
          <PreviewLinks links={[[`Open the ${word}’s invitation email link`, '?user=demo-teen&code=000000&s=demo', '/parent-consent/']]} />
        </div>
        <div className="trg-sent-status">
          <p className="trg-sent-status-h">Where it stands</p>
          <TeenStatusLine status="parent-verification-pending" />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- under 13
export function UnderThirteen({ onBack }) {
  return (
    <div className="u13" role="alert">
      <div className="u13-art" aria-hidden="true">
        <span className="u13-sun" />
        <span className="u13-cloud c1" />
        <span className="u13-cloud c2" />
        <span className="u13-seed">🌱</span>
      </div>
      <h2>Not just yet, but we’ll be here!</h2>
      <p>
        Turn2Opinion is for people aged {SITE.minAge} and older, so we can’t create an account for you right now. We haven’t saved anything you typed. Come back on your {SITE.minAge}th birthday and join
        the Teen panel with your parent or guardian.
      </p>
      <div className="u13-actions">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        {onBack && (
          <button type="button" className="link-soft" onClick={onBack}>
            I picked the wrong date
          </button>
        )}
      </div>
    </div>
  );
}

// ================================================================ the wizard
export default function TeenRegister({ seed, notice, startAtForm = false }) {
  const draft = useMemo(() => readDraft(), []);
  const [f, setF] = useState(() => {
    const base = { ...TEEN_EMPTY, ...(draft?.f || {}), parent: { ...EMPTY_GUARDIAN, ...(draft?.f?.parent || {}) }, consents: {} };
    if (seed) {
      ['firstName', 'middleName', 'lastName', 'email', 'dob', 'dial', 'phone', 'country'].forEach((k) => {
        if (seed[k] && !base[k]) base[k] = seed[k];
      });
      if (seed.gender && !base.gender) base.gender = seed.gender === 'Other' ? 'self' : seed.gender;
    }
    return base;
  });
  const [step, setStep] = useState(() => (draft ? Math.min(draft.step || 0, 2) : 0));
  const [started, setStarted] = useState(() => startAtForm || !!draft || !!(seed && (seed.firstName || seed.email || seed.dob)));
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaErr, setCaptchaErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [result, setResult] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const formRef = useRef(null);
  const busy = useRef(false);
  const dates = useMemo(() => teenWindow(), []);

  const live = validate(step, f);
  const errOf = (k) => (touched[k] || submitted ? live[k] || (k === 'email' ? emailErr : '') || '' : '');
  const okOf = (k) => !!touched[k] && !live[k] && !(k === 'email' && emailErr);
  const set = useCallback((k, v) => setF((p) => ({ ...p, [k]: v })), []);
  const setParent = (k, v) => setF((p) => ({ ...p, parent: { ...p.parent, [k]: v } }));
  const setConsent = (k, v) => {
    setF((p) => ({ ...p, consents: { ...p.consents, [k]: v } }));
    if (v) pop({ pitch: 1 + Object.values(f.consents).filter(Boolean).length * 0.06 });
  };
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const touchP = (k) => touch(`parent.${k}`);
  const onCaptcha = useCallback((t) => {
    setCaptcha(t);
    if (t) setCaptchaErr('');
  }, []);

  // keep the draft (never the consents: they are ticked fresh each time)
  useEffect(() => {
    if (!started || result) return;
    try {
      sessionStorage.setItem(DRAFT, JSON.stringify({ f: { ...f, consents: {} }, step }));
    } catch {
      /* ignore */
    }
  }, [f, step, started, result]);

  useEffect(() => {
    (async () => {
      try {
        const info = await api.get('/api/v1/get-country');
        const cc = info?.country;
        if (cc) setF((p) => ({ ...p, country: p.country || cc, dial: p.dial || cc, parent: { ...p.parent, dial: p.parent.dial || cc } }));
      } catch {
        /* the teen picks it */
      }
    })();
  }, []);

  const onDob = (v) => {
    setTouched((t) => ({ ...t, dob: true }));
    if (ageRoute(v) === 'blocked') {
      // Under 13: stop, and keep nothing that was typed.
      try {
        sessionStorage.removeItem(DRAFT);
      } catch {
        /* ignore */
      }
      setF({ ...TEEN_EMPTY, parent: EMPTY_GUARDIAN });
      setBlocked(true);
      return;
    }
    set('dob', v);
  };

  const focusFirst = (e) => {
    const k = Object.keys(e)[0];
    if (!k || !formRef.current) return;
    setTimeout(() => {
      const box = formRef.current.querySelector(`[data-k="${k}"]`);
      box?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      box?.querySelector('input, button, textarea')?.focus({ preventScroll: true });
    }, 40);
  };
  const go = (n) => {
    setSubmitted(false);
    setTouched({});
    setStep(n);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  };

  const checkEmail = async () => {
    const v = f.email.trim().toLowerCase();
    try {
      const r = await api.post('/api/v1/validator/email', { email: v });
      if (r?.valid === false) {
        setEmailErr('This email address can’t receive mail. Check the spelling.');
        return false;
      }
    } catch {
      /* the server checks again */
    }
    try {
      const { data } = await api.post('/api/v1/user/check', { mail: v });
      if (!isNaN(data) && data > 0) {
        setEmailErr('This email is already registered. Log in, or use another email.');
        return false;
      }
    } catch {
      /* the server checks again */
    }
    setEmailErr('');
    return true;
  };

  const resetCaptcha = () => {
    setCaptcha(null);
    setResetKey((k) => k + 1);
  };
  const captchaOk = () => {
    if (!captchaReady(captcha)) {
      setCaptchaErr('Type the code from the picture to show you’re human.');
      return false;
    }
    if (captcha.provider === 'local' && !captchaLocalOk(captcha)) {
      setCaptchaErr('That code didn’t match. Here’s a new one.');
      resetCaptcha();
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (busy.current) return; // no double submissions
    for (const s of [0, 1]) if (Object.keys(validate(s, f)).length) return go(s);
    const v = validate(2, f);
    setSubmitted(true);
    const capOk = captchaOk();
    if (Object.keys(v).length || !capOk) return focusFirst(v);
    busy.current = true;
    setState('sending');
    setMsg('');
    const p = f.parent;
    const age = exactAge(f.dob);
    const genderLabel = f.gender === 'self' ? 'Other' : f.gender;
    const ref = readReferral();
    const body = {
      category: 'minor',
      name: { salutation: f.gender === 'Male' ? 'Mr.' : f.gender === 'Female' ? 'Ms.' : 'Mx.', first: f.firstName.trim(), middle: f.middleName.trim(), last: f.lastName.trim() },
      mail: f.email.trim().toLowerCase(),
      ...(f.phone.trim() ? { phone: fullPhone(f.dial, f.phone) } : {}),
      dob: f.dob,
      gender: apiGender(f.gender),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      address: [{ tag: 'Home', country: f.country.toLowerCase(), state: f.state || undefined, city: f.city.trim(), zipcode: f.noPostal ? undefined : f.zipcode.trim() || undefined }],
      terms: ['privacy-policy', 'video-concent'],
      // Saved as profile answers, so the welcome survey and the profiles never ask them again.
      welcome: {
        country: f.country,
        ...(f.state ? { state: f.state } : {}),
        city: f.city.trim(),
        ...(f.zipcode.trim() && !f.noPostal ? { zipcode: f.zipcode.trim() } : {}),
        'communication-methods': ['email', 'dashboard'],
        D01: String(age),
        D02: f.country,
        ...(f.state ? { D03: f.state } : {}),
        D06: genderLabel,
        ...(f.gender === 'self' && f.genderSelf.trim() ? { 'D06-other': f.genderSelf.trim() } : {})
      },
      parent: {
        relation: p.rel,
        name: { first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim() },
        email: p.email.trim().toLowerCase(),
        ...(p.phone.trim() ? { phone: fullPhone(p.dial, p.phone) } : {}),
        dob: p.dob,
        ...(p.rel === 'guardian' ? { gender: p.gender } : {})
      },
      teenConsent: { version: TEEN_REG_CONSENT_VERSION, statements: TEEN_STATEMENTS.map((s) => s.id) },
      ...(ref ? { referredBy: ref } : {}),
      captcha: captchaPayload(captcha)
    };
    try {
      const res = await api.put('/api/v1/user', body);
      if (res?.status === 'success') {
        try {
          sessionStorage.removeItem(DRAFT);
          localStorage.setItem('t2o_join_type', 'minor');
        } catch {
          /* ignore */
        }
        clearReferral();
        track('sign_up_submitted', { category: 'minor' });
        playSuccess();
        setResult(res.data || {});
        setStep(3);
        window.scrollTo({ top: 0 });
        return;
      }
      const m = res && typeof res.message === 'string' ? res.message : '';
      resetCaptcha();
      if (isCaptchaError(m)) setCaptchaErr(m);
      else if (/duplicate|already/i.test(m)) {
        setEmailErr('This email is already registered. Log in, or use another email.');
        go(0);
      } else setMsg(/at least 13/i.test(m) ? m : m && m.length < 160 && !/error|exception|E11000|mongo/i.test(m) ? m : 'We couldn’t send your registration. Please try again.');
    } catch {
      resetCaptcha();
      setMsg('We couldn’t reach Turn2Opinion. Check your connection and try again.');
    } finally {
      busy.current = false;
      setState('idle');
    }
  };

  const next = async (e) => {
    e?.preventDefault();
    if (step === 2) return submit();
    const v = validate(step, f);
    setSubmitted(true);
    if (Object.keys(v).length) return focusFirst(v);
    if (step === 0) {
      setState('checking');
      const ok = await checkEmail();
      setState('idle');
      if (!ok) {
        setTouched((t) => ({ ...t, email: true }));
        return focusFirst({ email: 1 });
      }
    }
    playSwitch(true);
    go(step + 1);
  };

  if (blocked)
    return (
      <section className="trg trg-blocked">
        <div className="wrap">
          <UnderThirteen onBack={() => setBlocked(false)} />
        </div>
      </section>
    );
  if (!started) return <Entry onStart={() => { setStarted(true); playSwitch(true); }} />;
  if (step === 3 && result) return <Sent f={f} result={result} />;

  return (
    <section className={`trg at-${step}`}>
      <div className="trg-bg" aria-hidden="true">
        <span className="b1" />
        <span className="b2" />
        <span className="trg-grid-floor" />
      </div>
      <div className="wrap trg-shell">
        <aside className="trg-side">
          <p className="trg-chip">
            <span /> Teen registration
          </p>
          <h1>{['Level 1: you', 'Level 2: your guardian', 'Level 3: your promise'][step]}</h1>
          <Pass f={f} step={step} />
          <LevelMap step={step} />
        </aside>
        <div className="trg-stage">
          {notice && step === 0 && (
            <p className="trg-notice" role="status">
              <span aria-hidden="true">🎟️</span> {notice}
            </p>
          )}
          <form ref={formRef} onSubmit={next} noValidate className="trg-form" key={step}>
            {step === 0 && <StepYou f={f} set={(k, v) => { set(k, v); if (k === 'email') setEmailErr(''); }} errOf={errOf} okOf={okOf} touch={touch} dates={dates} onDob={onDob} />}
            {step === 1 && <StepGuardian f={f} setParent={setParent} errOf={errOf} okOf={okOf} touchP={touchP} />}
            {step === 2 && (
              <StepPromise
                f={f}
                setConsent={setConsent}
                errOf={errOf}
                onEdit={go}
                captchaBox={
                  <div className="trg-captcha">
                    <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
                    {captchaErr && (
                      <p className="field-error" role="alert">
                        {captchaErr}
                      </p>
                    )}
                  </div>
                }
              />
            )}
            {msg && (
              <p className="form-alert" role="alert">
                {msg}
              </p>
            )}
            <div className="trg-actions">
              {step > 0 && (
                <button type="button" className="trg-go is-ghost" onClick={() => go(step - 1)}>
                  <Icon name="arrowLeft" size={18} /> Back
                </button>
              )}
              <button type="submit" className="trg-go" disabled={state !== 'idle'}>
                {state === 'sending' ? (
                  <>
                    <span className="btn-spin" aria-hidden="true" /> Sending…
                  </>
                ) : state === 'checking' ? (
                  <>
                    <span className="btn-spin" aria-hidden="true" /> Checking…
                  </>
                ) : step === 2 ? (
                  <>
                    Complete registration <Icon name="send" size={18} />
                  </>
                ) : (
                  <>
                    Continue <Icon name="arrow" size={18} />
                  </>
                )}
              </button>
            </div>
            <p className="trg-foot">
              Step {step + 1} of 3 · saved on this device as you go · <Link to="/login/">Already registered? Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
