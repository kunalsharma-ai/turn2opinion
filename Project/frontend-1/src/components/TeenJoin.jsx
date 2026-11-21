// Teen panel (13–17) pieces for the Join wizard and the parent consent page (20 Nov 2026).
//   TeenParentStep   step 2: Mother / Father / Legal guardian and their details
//   TeenConsentStep  step 3: what the parent is asked to authorise, legal links, the teen's own yes
//   TeenStatus       where the registration stands (reflects the API's registrationStatus)
import { hrefFor } from '../router/Router.jsx';
import Icon from './Icon.jsx';
import { DateField, EMAIL_RE, Field, PhoneField } from './FormFields.jsx';
import { relWord, STATUS_LINE, statusIndex, TEEN_STATEMENTS } from '../data/teen/registration.js';

export const RELATIONS = [
  ['mother', 'Mother', '👩'],
  ['father', 'Father', '👨'],
  ['guardian', 'Legal guardian', '🛡️']
];
export const relLabel = (r) => (RELATIONS.find(([k]) => k === r) || [, 'Parent or guardian'])[1];
const GENDERS = ['Female', 'Male', 'Other'];

// Teen consent step: the seven confirmations the API records (data/teen/registration.js). Each is a
// separate, unticked box and all are required. [form key, statement, error]
export const TEEN_CONSENTS = TEEN_STATEMENTS.map((st) => [`tc_${st.id}`, st, 'Please tick this box to continue.']);

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
              <Field id={`${idp}-middle`} label="Middle name" error={errOf(k('middle'))}>
                <input id={`${idp}-middle`} className="input" value={p.middle} onChange={(e) => setParent('middle', e.target.value)} onBlur={touch('middle')} autoComplete="off" maxLength={49} />
              </Field>
            </div>
            <div data-k={k('last')}>
              <Field id={`${idp}-last`} label="Last name" error={errOf(k('last'))}>
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
            <Field id={`${idp}-phone`} label={`${who}’s phone number`} optional error={errOf(k('phone'))} valid={okOf(k('phone')) && !!p.phone}>
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
          <li>They get an email with two buttons, Yes and No. If they choose Yes, they fill in a short onboarding form and the consent form themselves.</li>
          <li>Your account stays switched off until they consent. Then we email you a link to create your password.</li>
          <li>They can withdraw consent, or ask us to delete your account, at any time.</li>
        </ul>
      </div>
      {TEEN_CONSENTS.map(([k, st]) => (
        <div key={k}>
          <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
            <input type="checkbox" checked={!!f[k]} onChange={(e) => set(k, e.target.checked)} />
            <span className="check-ui" />
            <span>
              <span aria-hidden="true">{st.icon}</span> {st.text(relWord(f.parent.rel))}
              {st.link && (
                <>
                  {' '}
                  <a href={hrefFor(st.link[0])} target="_blank" rel="noopener">
                    {st.link[1]}
                  </a>
                  {st.after || '.'}
                </>
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
      <p className="muted tj-version">
        Recorded with version T2O-TEEN-REG-2026.11, the date and time, and your registration reference.
      </p>
    </fieldset>
  );
}

/** Where the registration stands (the API's registrationStatus, in journey order). */
export function TeenStatus({ stage, parentEmail, compact = false }) {
  const at = statusIndex(stage);
  return (
    <ol className={`teen-status ${compact ? 'is-compact' : ''}`} aria-label="Registration status">
      {STATUS_LINE.map(([k, l, d], i) => {
        const done = i < at || (stage === 'account-active' && i === at);
        const now = i === at && stage !== 'account-active';
        return (
          <li key={k} className={done ? 'is-done' : now ? 'is-now' : ''}>
            <span className="ts-dot" aria-hidden="true">
              {done ? <Icon name="check" size={12} strokeWidth={3} /> : now ? <span className="ts-pulse" /> : null}
            </span>
            <span>
              {l}
              {!compact && (
                <small>
                  {' '}
                  · {now && k === 'parent-verification-pending' && parentEmail ? `invitation sent to ${parentEmail}` : d}
                </small>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
