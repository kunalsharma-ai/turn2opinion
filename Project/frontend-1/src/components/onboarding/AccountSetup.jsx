// Account creation from the email link: password and CAPTCHA. Members log in with their email
// address, so there is no username (Kunal, 20 Nov 2026).
//   PATCH /api/v1/user { userID, emailOTP, password, confirmPassword, captcha }
// The API checks the link (one use, time limited), the password rules and the CAPTCHA, then signs
// the member in. Teens reach this only after their
// parent or guardian has consented.
import { useCallback, useState } from 'react';
import { api } from '../../utils/api.js';
import Captcha, { captchaLocalOk, captchaPayload, captchaReady, isCaptchaError } from '../Captcha.jsx';
import Icon from '../Icon.jsx';
import { Field, passwordStrength } from '../FormFields.jsx';

export const PW_RULES = [
  ['8+ characters', (p) => p.length >= 8],
  ['Upper & lower case', (p) => /[a-z]/.test(p) && /[A-Z]/.test(p)],
  ['A number', (p) => /\d/.test(p)],
  ['A symbol', (p) => /[^A-Za-z0-9]/.test(p)]
];
const slug = (s) =>
  String(s || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');


export default function AccountSetup({ user, code, firstName = '', lastName = '', email = '', teen = false, onDone, onLinkUsed, onTeenWaiting }) {
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaErr, setCaptchaErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const onCaptcha = useCallback((c) => {
    setCaptcha(c);
    if (c) setCaptchaErr('');
  }, []);

  const errs = {};
  if (PW_RULES.some(([, fn]) => !fn(pw))) errs.password = 'Your password needs all four ingredients below.';
  else if (slug(firstName).length > 2 && pw.toLowerCase().includes(slug(firstName))) errs.password = 'Don’t include your name in your password.';
  else if (email && email.split('@')[0].length > 3 && pw.toLowerCase().includes(email.split('@')[0].toLowerCase())) errs.password = 'Don’t include your email address in your password.';
  if (!pw2) errs.confirm = 'Type your password again.';
  else if (pw2 !== pw) errs.confirm = 'Passwords don’t match.';
  const errOf = (k) => (touched[k] || submitted ? errs[k] || '' : '');
  const strength = passwordStrength(pw);

  const resetCaptcha = () => {
    setCaptcha(null);
    setResetKey((k) => k + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let capOk = true;
    if (!captchaReady(captcha)) {
      setCaptchaErr('Type the code from the picture (or answer the question) to show you’re human.');
      capOk = false;
    } else if (captcha.provider === 'local' && !captchaLocalOk(captcha)) {
      setCaptchaErr('That code didn’t match. Here’s a new one.');
      resetCaptcha();
      capOk = false;
    }
    if (Object.keys(errs).length || !capOk) {
      const k = Object.keys(errs)[0];
      if (k) document.getElementById(`as-${k}`)?.focus();
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const r = await api.patch('/api/v1/user', {
        userID: user,
        emailOTP: code,
        password: pw,
        confirmPassword: pw2,
        captcha: captchaPayload(captcha)
      });
      if (r?.status === 'success') {
        // Older APIs don't sign the member in from this call: log in with the new details.
        const me = await api.get('/api/v1/me').catch(() => null);
        if (me?.status !== 'success' && email) await api.post('/api/v1/user/login', { mail: email, password: pw }).catch(() => null);
        onDone({ email });
        return;
      }
      const m = (r && r.message) || 'We couldn’t create your account. Please try again.';
      resetCaptcha();
      if (isCaptchaError(m)) setCaptchaErr(m);
      else if (/consent/i.test(m)) onTeenWaiting?.();
      else if (/expired|invalid link|link/i.test(m)) onLinkUsed?.();
      else setMsg(m);
    } catch {
      resetCaptcha();
      setMsg('Unable to reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="acct-setup" onSubmit={submit} noValidate>
      <p className="join-step-lead">
        {teen ? (
          <>Your parent or guardian has completed the onboarding and consent form. Create your password to switch your Teen account on. You’ll log in with your email address.</>
        ) : (
          <>
            Email confirmed{firstName ? `, ${firstName}` : ''}. Now create a strong password. You’ll log in with your email address{email ? ` (${email})` : ''}.
          </>
        )}
      </p>
      <div data-k="password">
        <Field id="as-password" label="Create a password" error={errOf('password')}>
          <div className="pw-wrap">
            <input
              id="as-password"
              className="input"
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={(e) => setPw(e.target.value.slice(0, 128))}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              autoComplete="new-password"
              aria-invalid={!!errOf('password')}
              aria-describedby="as-rules"
            />
            <button type="button" className="pw-eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
              <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
            </button>
          </div>
        </Field>
        <div className={`pw-meter s${strength}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <ul className="pw-rules" id="as-rules">
          {PW_RULES.map(([l, fn]) => (
            <li key={l} className={fn(pw) ? 'ok' : ''}>
              <Icon name={fn(pw) ? 'check' : 'x'} size={12} strokeWidth={3} /> {l}
            </li>
          ))}
        </ul>
      </div>
      <div data-k="confirm">
        <Field id="as-confirm" label="Confirm password" error={errOf('confirm')} valid={!!pw2 && pw2 === pw}>
          <input
            id="as-confirm"
            className="input"
            type={show ? 'text' : 'password'}
            value={pw2}
            onChange={(e) => setPw2(e.target.value.slice(0, 128))}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
            autoComplete="new-password"
          />
        </Field>
      </div>
      <Captcha onChange={onCaptcha} resetKey={resetKey} error={captchaErr} />
      {captchaErr && (
        <p className="field-error" role="alert">
          {captchaErr}
        </p>
      )}
      {msg && (
        <p className="form-alert" role="alert">
          {msg}
        </p>
      )}
      <div className="join-actions">
        <button type="submit" className="btn btn-primary btn-lg btn-shimmer" disabled={busy}>
          {busy ? (
            <>
              <span className="btn-spin" aria-hidden="true" /> Creating your account…
            </>
          ) : (
            <>
              {teen ? 'Switch on my account' : 'Create my account'} <Icon name="arrow" size={18} />
            </>
          )}
        </button>
      </div>
      <p className="wq-save-note">
        <Icon name="lock" size={14} /> {teen ? 'Next: your dashboard.' : 'Next: a few welcome questions, your panel Terms & Conditions, then your dashboard.'}
      </p>
    </form>
  );
}
