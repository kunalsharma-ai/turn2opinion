// Teen panel (13-17) pieces for the Join wizard (Round 10c, Kunal, 20 Nov 2026).
// Step 0: the parent or guardian ("key 1"). Step 1: the teen's own yes ("key 2").
// TeenKeys shows where the two keys stand at each point of the flow.
import Icon from './Icon.jsx';
import { Field } from './FormFields.jsx';

const RELS = [
  ['Mother', '👩'],
  ['Father', '👨'],
  ['Legal guardian', '🛡️'],
  ['Other carer', '🤝']
];

export function TeenParentBlock({ f, set, touch, errOf, okOf, setTouched }) {
  return (
    <fieldset className="tj-parent">
      <legend>
        <span className="tj-badge" aria-hidden="true">🔑</span>
        <span>
          <b>Key 1 · Your parent or guardian</b>
          <small>We email them a short permission form. Nothing switches on until they say yes.</small>
        </span>
      </legend>
      <div className="form-grid two">
        <div data-k="guardianName">
          <Field id="j-gname" label="Their first name" error={errOf('guardianName')} valid={okOf('guardianName')}>
            <input id="j-gname" className="input" value={f.guardianName} onChange={(e) => set('guardianName', e.target.value)} onBlur={touch('guardianName')} autoComplete="off" maxLength={49} aria-invalid={!!errOf('guardianName')} />
          </Field>
        </div>
        <div data-k="guardianEmail">
          <Field id="j-gmail" label="Their email address" error={errOf('guardianEmail')} valid={okOf('guardianEmail')}>
            <input id="j-gmail" className="input" type="email" value={f.guardianEmail} onChange={(e) => set('guardianEmail', e.target.value)} onBlur={touch('guardianEmail')} autoComplete="off" maxLength={120} aria-invalid={!!errOf('guardianEmail')} />
          </Field>
        </div>
      </div>
      <div data-k="guardianRel">
        <Field id="j-grel" label="They are my" error={errOf('guardianRel')}>
          <div className="tj-rels" role="radiogroup" aria-label="Relationship" id="j-grel">
            {RELS.map(([r, e]) => (
              <button
                type="button"
                role="radio"
                key={r}
                aria-checked={f.guardianRel === r}
                className={`tj-rel ${f.guardianRel === r ? 'is-on' : ''}`}
                onClick={() => {
                  set('guardianRel', r);
                  setTouched((t) => ({ ...t, guardianRel: true }));
                }}
              >
                <i aria-hidden="true">{e}</i> {r}
              </button>
            ))}
          </div>
        </Field>
      </div>
      <label className={`check ${errOf('parentAware') ? 'has-error' : ''}`} data-k="parentAware">
        <input type="checkbox" checked={f.parentAware} onChange={(e) => set('parentAware', e.target.checked)} />
        <span className="check-ui" />
        <span>My parent or guardian knows I’m signing up, and it’s OK to email them.</span>
      </label>
      {errOf('parentAware') && <p className="field-error">{errOf('parentAware')}</p>}
      <ol className="tj-path" aria-label="What happens next">
        <li><b>1</b> You verify your email and set a password</li>
        <li><b>2</b> You give your own yes</li>
        <li><b>3</b> {f.guardianName.trim() || 'Your parent'} gets a 5-minute permission form</li>
        <li><b>4</b> Both keys turned: surveys switch on</li>
      </ol>
    </fieldset>
  );
}

const ASSENT = [
  ['teenAssent', 'I’ve read how the teen panel works, and I want to take part.'],
  ['teenSkip', 'I know I can skip any question or stop at any time, and that’s fine.'],
  ['teenWait', 'I understand surveys only start after my parent or guardian says yes too.']
];

export function TeenAssent({ f, set, errOf }) {
  return (
    <fieldset className="tj-assent">
      <legend>
        <span className="tj-badge is-you" aria-hidden="true">🗝️</span>
        <span>
          <b>Key 2 · Your own yes</b>
          <small>
            Your parent’s permission isn’t enough on its own. We need yours too, in your own words. <a href="/earn/teens/#teen-faq">Read the teen FAQ</a>
          </small>
        </span>
      </legend>
      {ASSENT.map(([k, t]) => (
        <div key={k}>
          <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
            <input type="checkbox" checked={f[k]} onChange={(e) => set(k, e.target.checked)} />
            <span className="check-ui" />
            <span>{t}</span>
          </label>
          {errOf(k) && <p className="field-error">{errOf(k)}</p>}
        </div>
      ))}
    </fieldset>
  );
}

// stage 0: signed up (verify email next) · 1: teen's key turned · 2: account created, parent invited
export function TeenKeys({ f, stage }) {
  const who = f.guardianName.trim() || 'Your parent or guardian';
  const keys = [
    ['🗝️', 'Your key', stage >= 1 ? 'Turned' : 'Verify your email, then say yes', stage >= 1],
    ['🔑', `${who}’s key`, stage >= 2 ? `Form sent to ${f.guardianEmail}` : 'Their form goes out when you finish', false]
  ];
  return (
    <div className={`tj-keys s${stage}`} aria-label="Two keys status">
      {keys.map(([e, t, sub, done], i) => (
        <div key={t} className={`tj-key ${done ? 'is-done' : ''} ${i === 1 && stage >= 2 ? 'is-wait' : ''}`}>
          <i aria-hidden="true">{e}</i>
          <span>
            <b>{t}</b>
            <small>{sub}</small>
          </span>
          {done ? <Icon name="check" size={16} strokeWidth={3} /> : <span className="tj-dot" aria-hidden="true" />}
        </div>
      ))}
      <p className="tj-lock">
        <span aria-hidden="true">{stage >= 2 ? '🔓' : '🔒'}</span> {stage >= 2 ? 'Surveys switch on the moment they say yes.' : 'Surveys stay locked until both keys turn.'}
      </p>
    </div>
  );
}
