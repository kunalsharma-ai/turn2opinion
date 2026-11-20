// Parent/guardian onboarding and consent for a Teen sign-up.
// The link comes from the "register/minor" email: /parent-consent/?user=<teenId>&code=<code>.
//   1 Onboarding form   confirm or complete the parent/guardian details
//   2 Consent form      what the Teen panel is, what the teen does, privacy, responsibilities,
//                       withdrawal; explicit confirmations -> PUT /api/v1/user/parent-consent/:id
// The API records the consent (status, time, version, IP, confirmations), emails the parent a
// confirmation and emails the teen a one-time link to create their password.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { api } from '../utils/api.js';
import { SITE } from '../config/site.js';
import Icon from '../components/Icon.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import { ParentFields, relLabel, TeenStatus } from '../components/TeenJoin.jsx';
import { splitPhone, validateParent, fullPhone } from '../utils/signup.js';

const CONSENT_VERSION = 'teen-consent-2026-11';
const CONFIRMS = [
  ['identity', (t, rel) => `I am ${t}’s ${rel.toLowerCase()} and I have the legal authority to give consent for them.`, 'Please confirm you are their parent or legal guardian.'],
  ['participation', (t) => `I consent to ${t} taking part in the Turn2Opinion Teen panel and in the research activities described above.`, 'Please give your consent to continue.'],
  ['terms', 'TERMS', 'Please accept the Terms & Conditions.'],
  ['privacy', 'PRIVACY', 'Please accept the Privacy Policy.'],
  ['accuracy', () => 'The information I have given is true and accurate.', 'Please confirm the information is accurate.']
];

const SECTIONS = [
  ['target', 'What the Teen panel is', (t) => `Turn2Opinion is an online survey and market research panel operated by Frequent Research Fieldwork Solutions Pvt. Ltd. The Teen panel is for members aged 13 to 17. ${t} is invited only to studies that are suitable for their age and earns reward points for completed surveys.`],
  ['clipboard', 'What participation involves', () => 'Short online surveys about everyday topics such as games, apps, school life, media and products. Taking part is always voluntary: any question can be skipped and any survey can be stopped at any time, without penalty.'],
  ['shield', 'Privacy and data protection', () => 'We collect the profile details given at sign-up (name, email, date of birth, gender), survey answers and reward details. Answers are used for research in anonymised or aggregated form and are not sold. Full details are in the Privacy Policy, including the section on members under 18.'],
  ['users', 'Your responsibilities', () => 'Keep your contact details up to date, talk with your teen about safe and honest participation, and tell us if anything about their account changes.'],
  ['refresh', 'Withdrawing consent', () => `You can withdraw consent, ask what we hold, or ask us to suspend or delete the account at any time by writing to ${SITE.email || 'our support team'}. When consent is withdrawn, the Teen account is paused and its data is deleted or anonymised under our retention policy.`]
];

const emptyParent = { rel: '', first: '', middle: '', last: '', email: '', dial: '', phone: '', dob: '', gender: '' };

export default function ParentConsent() {
  const [state, setState] = useState('checking'); // checking | form | sending | done | expired | error
  const [step, setStep] = useState(0);
  const [teen, setTeen] = useState(null);
  const [p, setP] = useState(emptyParent);
  const [checks, setChecks] = useState({});
  const [extraTerms, setExtraTerms] = useState([]); // admin-defined terms for the "minor" category, if any
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState(null);
  const q = useRef({});
  const formRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    q.current = { user: params.get('user'), code: params.get('code') };
    if (!q.current.user || !q.current.code) {
      setState('expired');
      return;
    }
    (async () => {
      const r = await api.post(`/api/v1/user/${q.current.user}`, { channel: 'parent-consent', code: q.current.code });
      if (r?.status !== 'success' || !r.data) {
        setState('expired');
        return;
      }
      const u = r.data;
      if (u.parent?.consent === true || u.parent?.consentStatus === 'approved') {
        setTeen(u);
        setState('already');
        return;
      }
      const par = u.parent || {};
      const ph = splitPhone(par.phone);
      setTeen(u);
      setP({
        rel: ['mother', 'father', 'guardian'].includes(par.relation) ? par.relation : '',
        first: par.name?.first || '',
        middle: par.name?.middle || '',
        last: par.name?.last || '',
        email: par.email || '',
        dial: ph.dial,
        phone: ph.phone,
        dob: par.dob ? String(par.dob).slice(0, 10) : '',
        gender: par.gender || ''
      });
      setState('form');
      try {
        const c = await api.post('/api/v1/category', { name: u.category || 'minor' });
        const terms = c?.data?.[0]?.terms;
        if (Array.isArray(terms)) setExtraTerms(terms.filter((t) => t && t.name));
      } catch {
        /* optional */
      }
    })();
  }, []);

  const teenName = teen?.name?.first || 'your teen';
  const rel = relLabel(p.rel);
  const detailErrors = useMemo(() => validateParent(p, null), [p]);
  const consentErrors = useMemo(() => {
    const e = {};
    CONFIRMS.forEach(([k, , m]) => {
      if (!checks[k]) e[k] = m;
    });
    extraTerms.forEach((t) => {
      if (t.isRequired && !checks[`x:${t.name}`]) e[`x:${t.name}`] = 'This one is required.';
    });
    return e;
  }, [checks, extraTerms]);
  const live = step === 0 ? detailErrors : consentErrors;
  const errOf = (k) => (touched[k] || submitted ? live[k] || '' : '');
  const okOf = (k) => touched[k] && !live[k];
  const setParent = (k, v) => setP((x) => ({ ...x, [k]: v }));
  const tick = (k, v) => setChecks((c) => ({ ...c, [k]: v }));

  const focusFirst = (e) => {
    const k = Object.keys(e)[0];
    setTimeout(() => {
      const el = formRef.current?.querySelector(`[data-k="${k}"] input, [data-k="${k}"] button`);
      el && el.focus();
    }, 30);
  };

  const next = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(detailErrors).length) return focusFirst(detailErrors);
    setSubmitted(false);
    setTouched({});
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(consentErrors).length) return focusFirst(consentErrors);
    setState('sending');
    setMsg('');
    const accepted = extraTerms.filter((t) => checks[`x:${t.name}`]).map((t) => t.name);
    const r = await api.put(`/api/v1/user/parent-consent/${q.current.user}`, {
      user: q.current.user,
      code: q.current.code,
      version: CONSENT_VERSION,
      confirmations: CONFIRMS.map(([k]) => k),
      terms: Array.from(new Set(['privacy-policy', 'video-concent', ...accepted])),
      parent: {
        relation: p.rel,
        name: { first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim() },
        phone: fullPhone(p.dial, p.phone),
        dob: p.dob,
        ...(p.rel === 'guardian' ? { gender: p.gender } : {})
      }
    });
    if (r?.status === 'success') {
      setResult(r.data || {});
      setState('done');
      window.scrollTo({ top: 0 });
      return;
    }
    const m = r?.message || 'We couldn’t record your consent. Please try again.';
    if (/expired/i.test(m)) return setState('expired');
    setMsg(m);
    setState('form');
  };

  if (state === 'checking')
    return (
      <Shell>
        <p className="pgc-wait">Checking your link…</p>
      </Shell>
    );
  if (state === 'expired')
    return (
      <Shell icon="clock" title="This consent link is no longer valid">
        <p>It may have expired (links last 7 days) or it has already been used. Ask your teen to request a new form from the Teen login page, or contact us at {SITE.email}.</p>
        <Link to="/" className="btn btn-primary">
          Go to the home page
        </Link>
      </Shell>
    );
  if (state === 'already')
    return (
      <Shell icon="check" title="Consent is already recorded">
        <p>You have already given consent for {teenName}. Nothing more is needed.</p>
        <TeenStatus stage="account-activation-pending" />
      </Shell>
    );
  if (state === 'done')
    return (
      <Shell icon="check" title="Thank you. Your consent is recorded.">
        <p>
          We’ve emailed you a confirmation. {teenName} will receive a separate email with a one-time link to create their password, and the Teen account switches on once they do.
        </p>
        <TeenStatus stage={result?.registrationStatus === 'account-active' ? 'account-active' : 'account-activation-pending'} />
        <p className="muted">You can withdraw consent at any time by writing to {SITE.email}.</p>
      </Shell>
    );

  return (
    <section className="pgc">
      <div className="wrap pgc-grid">
        <aside className="pgc-side">
          <Breadcrumbs items={[{ label: 'Parent consent' }]} />
          <span className="pgc-kicker">Teen panel · parent or guardian</span>
          <h1>{step === 0 ? `${teenName} would like to join Turn2Opinion` : 'Consent form'}</h1>
          <p>
            {step === 0
              ? `${teenName} asked us to send you this form. Please check your details, then read and complete the consent form. Nothing is activated until you do.`
              : 'Please read each section. Your consent is recorded with today’s date and this version of the form.'}
          </p>
          <ol className="pgc-steps">
            <li className={step === 0 ? 'is-on' : 'is-done'}>
              <b>1</b> Your details
            </li>
            <li className={step === 1 ? 'is-on' : ''}>
              <b>2</b> Consent form
            </li>
          </ol>
          <TeenStatus stage="consent-pending" />
        </aside>
        <div className="pgc-card">
          {step === 0 ? (
            <form ref={formRef} onSubmit={next} noValidate>
              <h2>Parent / guardian onboarding form</h2>
              <ParentFields p={p} setParent={setParent} errOf={errOf} okOf={okOf} setTouched={setTouched} emailLocked idp="pc" />
              <div className="join-actions">
                <button type="submit" className="btn btn-primary btn-lg">
                  Continue to the consent form <Icon name="arrow" size={18} />
                </button>
              </div>
            </form>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate>
              <h2>Parent / guardian consent form</h2>
              <div className="pgc-sections">
                {SECTIONS.map(([ic, t, body]) => (
                  <section key={t} className="pgc-sec">
                    <span className="pgc-ico" aria-hidden="true">
                      <Icon name={ic} size={18} />
                    </span>
                    <div>
                      <h3>{t}</h3>
                      <p>{body(teenName)}</p>
                    </div>
                  </section>
                ))}
              </div>
              <div className="consents">
                {CONFIRMS.map(([k, label]) => (
                  <div key={k}>
                    <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
                      <input type="checkbox" checked={!!checks[k]} onChange={(e) => tick(k, e.target.checked)} />
                      <span className="check-ui" />
                      <span>
                        {label === 'TERMS' ? (
                          <>
                            I have read and accept the{' '}
                            <a href="/terms/" target="_blank" rel="noopener">
                              Terms &amp; Conditions
                            </a>{' '}
                            on {teenName}’s behalf.
                          </>
                        ) : label === 'PRIVACY' ? (
                          <>
                            I have read the{' '}
                            <a href="/privacy/" target="_blank" rel="noopener">
                              Privacy Policy
                            </a>{' '}
                            and agree to {teenName}’s data being used as it describes.
                          </>
                        ) : (
                          label(teenName, rel)
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
                {extraTerms.map((t) => {
                  const k = `x:${t.name}`;
                  return (
                    <div key={k}>
                      <label className={`check ${errOf(k) ? 'has-error' : ''}`} data-k={k}>
                        <input type="checkbox" checked={!!checks[k]} onChange={(e) => tick(k, e.target.checked)} />
                        <span className="check-ui" />
                        {/* Admin-written term text from the API's category settings (same source the member area uses). */}
                        <span dangerouslySetInnerHTML={{ __html: `${t.body || t.name}${t.isRequired ? '' : ' <em>(optional)</em>'}` }} />
                      </label>
                      {errOf(k) && <p className="field-error">{errOf(k)}</p>}
                    </div>
                  );
                })}
              </div>
              {msg && (
                <p className="form-alert" role="alert">
                  {msg}
                </p>
              )}
              <div className="join-actions">
                <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(0)}>
                  <Icon name="arrowLeft" size={18} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Recording your consent…' : `I consent: allow ${teenName} to join`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Shell({ icon = 'shield', title, children }) {
  return (
    <section className="join-done pgc-done">
      <div className="wrap join-done-inner">
        <div className="inbox-anim" aria-hidden="true">
          <span className="inbox-env">
            <Icon name={icon} size={56} />
          </span>
        </div>
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </section>
  );
}
