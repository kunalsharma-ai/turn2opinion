// Teen panel (13–17) pieces for the Join wizard and the parent consent page (20 Nov 2026).
//   TeenParentStep   step 2: Mother / Father / Legal guardian and their details
//   TeenConsentStep  step 3: what the parent is asked to authorise, legal links, the teen's own yes
//   TeenStatus       where the registration stands (reflects the API's registrationStatus)
import { hrefFor } from '../router/Router.jsx';
import Icon from './Icon.jsx';
import { DateField, EMAIL_RE, Field, PhoneField } from './FormFields.jsx';

export const RELATIONS = [
  ['mother', 'Mother', '👩'],
  ['father', 'Father', '👨'],
  ['guardian', 'Legal guardian', '🛡️']
];
export const relLabel = (r) => (RELATIONS.find(([k]) => k === r) || [, 'Parent or guardian'])[1];
const GENDERS = ['Female', 'Male', 'Other'];

// Teen consent step: every box is required. [key, label, error]
export const TEEN_CONSENTS = [
  ['cParent', 'My parent or legal guardian knows I’m registering and agrees that Turn2Opinion may email them an onboarding and consent form.', 'Your parent or guardian needs to know about this request.'],
  ['cTerms', 'TERMS', 'Please accept the Terms & Conditions.'],
  ['cPrivacy', 'PRIVACY', 'Please accept the Privacy Policy.'],
  ['cParticipation', 'I understand that I can only take part in research after my parent or guardian authorises it, and that I can skip any question or stop at any time.', 'Please confirm you understand how Teen participation works.'],
  ['cAccuracy', 'The information I’ve given about me and my parent or guardian is true and accurate.', 'Please confirm the information is accurate.']
];

/** Relationship cards plus the matching form (gender only for a legal guardian). */
export function ParentFields({ p, setParent, errOf, okOf, setTouched, emailLocked = false, prefix = 'parent', idp = 'pg' }) {
  const who = p.rel ? relLabel(p.rel) : 'Parent or guardian';
  const k = (n) => `${prefix}.${n}`;
  const touch = (n) => () => setTouched((t) => ({ ...t, [k(n)]: true }));
  const now = new Date();
  const adultMax = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return (
    <>
      <div data-k={k('rel')}>
        <Field id={`${idp}-rel`} label="Who is giving consent?" error={errOf(k('rel'))}>
          <div className="tj-rels is-three" role="radiogroup" aria-label="Relationship to the teen" id={`${idp}-rel`}>
            {RELATIONS.map(([v, l, e]) => (
              <button
                type="button"
                role="radio"
                key={v}
                aria-checked={p.rel === v}
                className={`tj-rel ${p.rel === v ? 'is-on' : ''}`}
                onClick={() => {
                  setParent('rel', v);
                  if (v !== 'guardian') setParent('gender', '');
                  setTouched((t) => ({ ...t, [k('rel')]: true }));
                }}
              >
                <i aria-hidden="true">{e}</i> {l}
              </button>
            ))}
          </div>
        </Field>
      </div>
      {p.rel && (
        <div className="tj-parent-form" key={p.rel}>
          <div className="form-grid three">
            <div data-k={k('first')}>
              <Field id={`${idp}-first`} label={`${who}’s first name`} error={errOf(k('first'))} valid={okOf(k('first'))}>
                <input id={`${idp}-first`} className="input" value={p.first} onChange={(e) => setParent('first', e.target.value)} onBlur={touch('first')} autoComplete="off" maxLength={49} />
              </Field>
            </div>
            <div data-k={k('middle')}>
              <Field id={`${idp}-middle`} label="Middle name" optional error={errOf(k('middle'))}>
                <input id={`${idp}-middle`} className="input" value={p.middle} onChange={(e) => setParent('middle', e.target.value)} onBlur={touch('middle')} autoComplete="off" maxLength={49} />
              </Field>
            </div>
            <div data-k={k('last')}>
              <Field id={`${idp}-last`} label="Last name" optional error={errOf(k('last'))}>
                <input id={`${idp}-last`} className="input" value={p.last} onChange={(e) => setParent('last', e.target.value)} onBlur={touch('last')} autoComplete="off" maxLength={49} />
              </Field>
            </div>
          </div>
          <div data-k={k('email')}>
            <Field
              id={`${idp}-email`}
              label={`${who}’s email address`}
              error={errOf(k('email'))}
              valid={!emailLocked && okOf(k('email')) && EMAIL_RE.test(p.email.trim())}
              hint={emailLocked ? 'The onboarding form was sent here. Contact support to change it.' : 'The onboarding and consent form goes here.'}
            >
              <input id={`${idp}-email`} className="input" type="email" value={p.email} readOnly={emailLocked} onChange={(e) => setParent('email', e.target.value)} onBlur={touch('email')} autoComplete="off" maxLength={120} />
            </Field>
          </div>
          <div data-k={k('phone')}>
            <Field id={`${idp}-phone`} label={`${who}’s phone number`} error={errOf(k('phone'))} valid={okOf(k('phone'))}>
              <PhoneField id={`${idp}-phone`} country={p.dial} number={p.phone} onCountry={(c) => setParent('dial', c)} onNumber={(v) => setParent('phone', v)} onBlur={touch('phone')} invalid={!!errOf(k('phone'))} />
            </Field>
          </div>
          <div data-k={k('dob')}>
            <Field id={`${idp}-dob`} label={`${who}’s date of birth`} error={errOf(k('dob'))} valid={!!p.dob && !errOf(k('dob'))}>
              <DateField
                id={`${idp}-dob`}
                value={p.dob}
                maxDate={adultMax}
                onChange={(v) => {
                  setParent('dob', v);
                  setTouched((t) => ({ ...t, [k('dob')]: true }));
                }}
                invalid={!!errOf(k('dob'))}
              />
            </Field>
          </div>
          {p.rel === 'guardian' && (
            <div data-k={k('gender')}>
              <Field id={`${idp}-gender`} label="Guardian’s gender" error={errOf(k('gender'))}>
                <div className="tj-rels" role="radiogroup" aria-label="Guardian’s gender" id={`${idp}-gender`}>
                  {GENDERS.map((g) => (
                    <button
                      type="button"
                      role="radio"
                      key={g}
                      aria-checked={p.gender === g}
                      className={`tj-rel ${p.gender === g ? 'is-on' : ''}`}
                      onClick={() => {
                        setParent('gender', g);
                        setTouched((t) => ({ ...t, [k('gender')]: true }));
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function TeenParentStep({ f, setParent, set, errOf, okOf, setTouched }) {
  const who = f.parent.rel ? relLabel(f.parent.rel).toLowerCase() : 'parent or guardian';
  return (
    <fieldset className="tj-parent">
      <legend>
        <span className="tj-badge" aria-hidden="true">
          🛡️
        </span>
        <span>
          <b>Parent or guardian information</b>
          <small>Choose who will give consent, then fill in their details. We email them; we never contact them for marketing.</small>
        </span>
      </legend>
      <ParentFields p={f.parent} setParent={setParent} errOf={errOf} okOf={okOf} setTouched={setTouched} />
      {f.parent.rel && (
        <div>
          <label className={`check ${errOf('parentConfirm') ? 'has-error' : ''}`} data-k="parentConfirm">
            <input type="checkbox" checked={f.parentConfirm} onChange={(e) => set('parentConfirm', e.target.checked)} />
            <span className="check-ui" />
            <span>These are my {who}’s real details, and they know I’m registering.</span>
          </label>
          {errOf('parentConfirm') && (
            <p className="field-error" role="alert">
              {errOf('parentConfirm')}
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}

export function TeenConsentStep({ f, set, errOf }) {
  const who = relLabel(f.parent.rel);
  return (
    <fieldset className="tj-assent">
      <legend>
        <span className="tj-badge is-you" aria-hidden="true">
          ✍️
        </span>
        <span>
          <b>Consent and confirmation</b>
          <small>Read this together with your {who.toLowerCase()} if you can.</small>
        </span>
      </legend>
      <div className="tj-explain">
        <p>
          By submitting, you ask your {who.toLowerCase()} (<strong>{f.parent.email || 'their email'}</strong>) to authorise you, {f.firstName || 'the teen'}, to take part in the Turn2Opinion
          Teen panel: age-appropriate online surveys and market research, with rewards for completed studies.
        </p>
        <ul className="tick-list">
          <li>This is a request. Submitting it does not count as consent.</li>
          <li>They receive an onboarding and consent form by email and must complete it themselves.</li>
          <li>Your account stays switched off until they consent. Then we email you a link to create your password.</li>
          <li>They can withdraw consent, or ask us to delete your account, at any time.</li>
        </ul>
      </div>
      {TEEN_CONSENTS.map(([k, label]) => (
        <div key={k}>
          <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
            <input type="checkbox" checked={!!f[k]} onChange={(e) => set(k, e.target.checked)} />
            <span className="check-ui" />
            <span>
              {label === 'TERMS' ? (
                <>
                  I have read and accept the{' '}
                  <a href={hrefFor('/terms/')} target="_blank" rel="noopener">
                    Terms &amp; Conditions
                  </a>
                  .
                </>
              ) : label === 'PRIVACY' ? (
                <>
                  I have read and accept the{' '}
                  <a href={hrefFor('/privacy/')} target="_blank" rel="noopener">
                    Privacy Policy
                  </a>
                  , including the section on members under 18.
                </>
              ) : (
                label
              )}
            </span>
          </label>
          {errOf(k) && (
            <p className="field-error" role="alert">
              {errOf(k)}
            </p>
          )}
        </div>
      ))}
    </fieldset>
  );
}

// The statuses Kunal listed, mapped to the API's registrationStatus values.
const STAGES = [
  ['registration-started', 'Registration started'],
  ['parent-details-submitted', 'Parent details submitted'],
  ['parent-verification-pending', 'Parent verification pending'],
  ['consent-pending', 'Onboarding & consent pending'],
  ['consent-verified', 'Consent verified'],
  ['account-activation-pending', 'Account activation pending'],
  ['account-active', 'Account active']
];
const AT = {
  'registration-started': 0,
  'parent-verification-pending': 2,
  'consent-pending': 3,
  'account-activation-pending': 5,
  'account-active': 6
};

export function TeenStatus({ stage, parentEmail }) {
  const at = AT[stage] ?? 2;
  return (
    <ol className="teen-status" aria-label="Registration status">
      {STAGES.map(([k, l], i) => {
        const done = i < at || (stage === 'account-active' && i === at);
        const now = i === at && stage !== 'account-active';
        return (
          <li key={k} className={done ? 'is-done' : now ? 'is-now' : ''}>
            <span className="ts-dot" aria-hidden="true">
              {done ? <Icon name="check" size={12} strokeWidth={3} /> : now ? <span className="ts-pulse" /> : null}
            </span>
            <span>
              {l}
              {now && k === 'parent-verification-pending' && parentEmail ? <small> · form sent to {parentEmail}</small> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
