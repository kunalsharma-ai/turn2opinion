import { useState } from 'react';
import { Link } from '../router/Router.jsx';
import { api, failureMessage } from '../utils/api.js';
import { Breadcrumbs } from '../components/Common.jsx';
import { EMAIL_RE, Field } from '../components/FormFields.jsx';
import Icon from '../components/Icon.jsx';
import { WelcomePortal } from './Login.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | ok | error
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!EMAIL_RE.test(email.trim())) er.email = 'Enter the email address you registered with.';
    setErrors(er);
    if (Object.keys(er).length) return;

    setState('sending');
    const res = await api.post('/api/v1/forgot-password', {
        user: email.trim().toLowerCase()
    });

    if (res.status === 'success') {
      setState('ok');
    } else {
      setState('error');
      setMsg(res.message || failureMessage(res));
    }
  };

  return (
    <section className="login">
      <div className="login-bg" aria-hidden="true" />
      <div className="wrap login-grid">
        <div className="login-art">
          <Breadcrumbs items={[{ label: 'Login', to: '/login/' }, { label: 'Forgot password' }]} />
          <h1>Forgot your password?</h1>
          <p className="login-tag">No worries – we’ll email you a link to set a new one.</p>
          <WelcomePortal />
        </div>

        <div className="login-card">
          <div className="login-card-glow" aria-hidden="true" />
          <span className="padlock" aria-hidden="true">
            <span className="pl-shackle" />
            <span className="pl-body">
              <Icon name="key" size={18} />
            </span>
          </span>
          <h2>Reset your password</h2>
          {state !== 'ok' && <p className="login-sub">Enter your registered email address.</p>}

          {state === 'ok' ? (
            <div className="sent">
              <div className="sent-plane" aria-hidden="true">
                <Icon name="check" size={40} />
              </div>
              <p>A password reset link has been sent to your mailbox. Please check your email and proceed.</p>
              <p className="join-alt">
                <Link to="/login/">Back to login</Link>
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <Field id="f-email" label="Email" error={errors.email}>
                <div className="input-icon">
                  <Icon name="mail" size={18} />
                  <input
                    id="f-email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                </div>
              </Field>

              {state === 'error' && (
                <p className="form-alert" role="alert">
                  {msg}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send reset link'} <Icon name="arrow" size={18} />
              </button>
              <p className="join-alt">
                Remembered it? <Link to="/login/">Back to login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}