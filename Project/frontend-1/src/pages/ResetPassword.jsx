import { useState } from 'react';
import { Link } from '../router/Router.jsx';
import { api, failureMessage } from '../utils/api.js';
import { Breadcrumbs } from '../components/Common.jsx';
import { Field } from '../components/FormFields.jsx';
import Icon from '../components/Icon.jsx';
import { WelcomePortal } from './Login.jsx';

export default function ResetPassword() {

  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | ok | error
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const qs = new URLSearchParams(window.location.search);
const userID = qs.get('user');
const code = qs.get('code');
    const er = {};
    if (!userID || !code) er.form = 'This reset link is invalid. Please request a new one.';
    if (pw.length < 8) er.pw = 'Password must be at least 8 characters.';
    if (cpw !== pw) er.cpw = 'Passwords do not match.';
    setErrors(er);
    if (Object.keys(er).length) return;

    setState('sending');
    const res = await api.patch('/api/v1/user', {
        userID,
        emailOTP: code,
        password: pw,
        confirmPassword: cpw
        });

    if (res.status === 'success') {
      setState('ok');
    } else {
      setState('error');
      setMsg(res.message || failureMessage(res));
    }
  };

  const eye = (
    <button type="button" className="pw-eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
      <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
    </button>
  );

  return (
    <section className="login">
      <div className="login-bg" aria-hidden="true" />
      <div className="wrap login-grid">
        <div className="login-art">
          <Breadcrumbs items={[{ label: 'Login', to: '/login/' }, { label: 'Reset password' }]} />
          <h1>Set a new password</h1>
          <p className="login-tag">Choose a strong password you haven’t used before.</p>
          <WelcomePortal />
        </div>

        <div className="login-card">
          <div className="login-card-glow" aria-hidden="true" />
          <span className={`padlock ${state === 'ok' ? 'is-open' : ''}`} aria-hidden="true">
            <span className="pl-shackle" />
            <span className="pl-body">
              <Icon name={state === 'ok' ? 'check' : 'lock'} size={18} />
            </span>
          </span>
          <h2>New password</h2>
          {state !== 'ok' && <p className="login-sub">Enter and confirm your new password.</p>}

          {state === 'ok' ? (
            <div className="sent">
              <div className="sent-plane" aria-hidden="true">
                <Icon name="check" size={40} />
              </div>
              <p>Your password has been reset successfully. You can now log in.</p>
              <Link to="/login/" className="btn btn-primary btn-block btn-lg">
                Go to login <Icon name="arrow" size={18} />
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <Field id="r-pw" label="New password" error={errors.pw}>
                <div className="input-icon pw-wrap">
                  <Icon name="lock" size={18} />
                  <input id="r-pw" className="input" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" aria-invalid={!!errors.pw} />
                  {eye}
                </div>
              </Field>
              <Field id="r-cpw" label="Confirm password" error={errors.cpw}>
                <div className="input-icon pw-wrap">
                  <Icon name="lock" size={18} />
                  <input id="r-cpw" className="input" type={show ? 'text' : 'password'} value={cpw} onChange={(e) => setCpw(e.target.value)} autoComplete="new-password" aria-invalid={!!errors.cpw} />
                </div>
              </Field>

              {(errors.form || state === 'error') && (
                <p className="form-alert" role="alert">
                  {errors.form || msg}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Saving…' : 'Save password'} <Icon name="arrow" size={18} />
              </button>
              <p className="join-alt">
                <Link to="/login/">Back to login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}