import { useCallback, useEffect, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { ENV, asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { postJSON, failureMessage,api } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import Captcha from '../components/Captcha.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import { EMAIL_RE, Field } from '../components/FormFields.jsx';
import Icon from '../components/Icon.jsx';
import SocialAuth from '../components/SocialAuth.jsx';
import ResendVerify from '../components/ResendVerify.jsx';
import FollowUs from '../components/FollowUs.jsx';

/** Welcome portal: a member waves from a morphing portal while their rewards, surveys and security status orbit. */
export function WelcomePortal() {
  return (
    <div className="wportal" aria-hidden="true">
      <span className="wp-rays" />
      <div className="wp-blob">
        <img src={asset('/images/people/traveller.svg')} alt="" width="220" height="260" />
      </div>
      <span className="wp-bubble">Welcome back! 👋</span>
      {[
        ['bell', 'New surveys', 'Matched to your profile', '#1F5BFF'],
        ['gift', 'Reward ready', 'PayPal · Wire · Gift card', '#FFB020'],
        ['shield', 'Account secure', 'Verified member', '#12C29B']
      ].map(([ic, t, d, c], i) => (
        <span key={t} className={`wp-chip k${i}`} style={{ '--c': c }}>
          <span className="wp-ico">
            <Icon name={ic} size={16} />
          </span>
          <span>
            <strong>{t}</strong>
            <small>{d}</small>
          </span>
        </span>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <i key={i} className="wp-coin" style={{ '--i': i }} />
      ))}
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [captcha, setCaptcha] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const [unverified, setUnverified] = useState(false);
  const onCaptcha = useCallback((t) => setCaptcha(t), []);

  useEffect(() => {
  const q = new URLSearchParams(window.location.search);
  const vm = q.get('verifyemail');
  if (vm) {
    setEmail(vm);
    setState('error');
    setMsg('Your email is not verified yet. Please verify it using the link sent to your inbox, then log in.');
    setUnverified(true);
  }
}, []);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!EMAIL_RE.test(email.trim())) er.email = 'Enter the email address you registered with.';
    if (!pw) er.pw = 'Enter your password.';
    if (!captcha) er.captcha = 'Complete the human check.';
    setErrors(er);
    if (Object.keys(er).length) return;
    // setState('sending');
    // // const res = await postJSON("/api/v1/user/login", {
    //   const res = await api.post("/api/v1/user/login", {
    //     mail: email.trim().toLowerCase(),
    //     password: pw,
    //     remember,
    //     // captchaToken: captcha.token,
    //     // captchaProvider: captcha.provider
    // });
    setState('sending');
    setMsg('');
    setUnverified(false);
    try {
      const res = await api.post('/api/v1/user/login', {
        mail: email.trim().toLowerCase(),
        password: pw,
        remember,
      });

      console.log('Login response:', res);

      if (res?.status === 'success') {
        track('login');

        // /me fail hone par login fail nahi manna chahiye
       try {
          const me = await api.get('/api/v1/me');
          if (me?.status === 'success' && me.data) {
            localStorage.setItem('user', JSON.stringify(me.data));
          }
        } catch (err) {
          console.error('/me failed:', err);
        }

        setState('ok');
        if (!res.demo) window.location.assign('/member/dashboard');
        return;
      }

      // login fail: server ka message dikhao
      const m = failureMessage(res) || 'Invalid email or password.';
      setState('error');
      setMsg(m);
      if (/verif/i.test(m)) setUnverified(true);
    } catch (err) {
      console.error('Login failed:', err);
      setState('error');
      setMsg(err?.message || 'Unable to log in. Please try again.');
    }
    
  };
const isNew = new URLSearchParams(window.location.search).get('new') === '1';
if (unverified) {
  return (
    <ResendVerify email={email} title="Verify your email" message={msg}>
      <button
        type="button"
        className="btn-outline"
        onClick={() => {
          setUnverified(false);
          setState('idle');
          setMsg('');
          setEmail('');
          setPw('');
          setResetKey((k) => k + 1);
          window.history.replaceState(null, '', window.location.pathname);
        }}
      >
        Login with another account
      </button>
    </ResendVerify>
  );
}

  return (
    <section className="login">
      <div className="login-bg" aria-hidden="true" />
      <div className="wrap login-grid">
        <div className="login-art">
          <Breadcrumbs items={[{ label: 'Login' }]} />
          <h1>Your rewards are waiting</h1>
          <p className="login-tag">New surveys, your points and your next payout – all one login away.</p>
          <WelcomePortal />
        </div>
        <div className="login-card">
          <div className="login-card-glow" aria-hidden="true" />
          <span className={`padlock ${EMAIL_RE.test(email.trim()) && pw ? 'is-open' : ''}`} aria-hidden="true">
            <span className="pl-shackle" />
            <span className="pl-body">
              <Icon name={EMAIL_RE.test(email.trim()) && pw ? 'check' : 'key'} size={18} />
            </span>
          </span>
          <h2>Member login</h2>
          <p className="login-sub" style={{ textAlign: 'center' }}>
            {isNew ? 'Your account is ready. Log in to get started.' : 'Good to see you again.'}
          </p>
          {state === 'ok' ? (
            <div className="sent">
              <div className="sent-plane" aria-hidden="true">
                <Icon name="check" size={40} />
              </div>
              <p>Logged in. Taking you to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <Field id="l-email" label="Email" error={errors.email}>
                <div className="input-icon">
                  <Icon name="mail" size={18} />
                  <input id="l-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" aria-invalid={!!errors.email} />
                </div>
              </Field>
              <Field id="l-pw" label="Password" error={errors.pw}>
                <div className="input-icon pw-wrap">
                  <Icon name="lock" size={18} />
                  <input id="l-pw" className="input" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" aria-invalid={!!errors.pw} />
                  <button type="button" className="pw-eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
                    <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
                  </button>
                </div>
              </Field>
              <div className="login-row">
                <label className="check small">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <span className="check-ui" />
                  <span>Remember me</span>
                </label>
                {/* <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Password reset request')}`} className="login-forgot">
                  Forgot password?
                </a> */}
                <Link to="/forgot-password/" className="login-forgot">
                  Forgot password?
                </Link>
              </div>
              <Captcha onChange={onCaptcha} resetKey={resetKey} error={errors.captcha} />
              {errors.captcha && <p className="field-error">{errors.captcha}</p>}
              {state === 'error' && !unverified && (
                <p className="form-alert" role="alert">
                  {msg}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Logging in…' : 'Log in'} <Icon name="arrow" size={18} />
              </button>

              <SocialAuth />

              <p className="join-alt">
                New here? <Link to="/join/">Create a free account</Link>
              </p>

              <FollowUs />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
