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
import { isProfileIncomplete, saveResumeData } from '../utils/profileGate.js';
import FollowUs from '../components/FollowUs.jsx';
import { AudSwitch, AuthAura, AuthVoice, readAud, saveAud } from '../components/AuthAura.jsx';

/** Welcome portal: a member waves from a morphing portal while their rewards, surveys and security status orbit. */
const PORTAL = {
  consumer: {
    img: 'traveller',
    hi: 'Welcome back! 👋',
    chips: [
      ['bell', 'New surveys', 'Matched to your profile', '#1F5BFF'],
      ['gift', 'Reward ready', 'PayPal · Bank · Vouchers · Gift cards', '#22B8FF'],
      ['shield', 'Account secure', 'Verified member', '#12C29B']
    ]
  },
  pro: {
    img: 'business',
    hi: 'Your expert seat is ready',
    chips: [
      ['briefcase', 'B2B studies', 'Matched to your role', '#7B3FE4'],
      ['gift', 'Premium rewards', 'Paid like the expert you are', '#F5B83D'],
      ['shield', 'Private & secure', 'Your answers stay anonymous', '#12C29B']
    ]
  },
  minor: {
    img: 'gamer',
    hi: 'Hey, you’re back! ✌️',
    chips: [
      ['sparkles', 'Channels to tune', '+100 points each', '#FF5FA2'],
      ['shield', 'Age-checked studies', 'Skip anything, anytime', '#2DE2C0'],
      ['users', 'Parent connected', 'Two keys, both turned', '#FFD84A']
    ]
  }
};

export function WelcomePortal({ aud = 'consumer' }) {
  const P = PORTAL[aud] || PORTAL.consumer;
  return (
    <div className={`wportal is-${aud}`} aria-hidden="true" key={aud}>
      <span className="wp-rays" />
      <div className="wp-blob">
        <img src={asset(`/images/people/${P.img}.svg`)} alt="" width="220" height="260" />
      </div>
      <span className="wp-ring" />
      <span className="wp-bubble">{P.hi}</span>
      {P.chips.map(([ic, t, d, c], i) => (
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
  const [incomplete, setIncomplete] = useState(null);
  const onCaptcha = useCallback((t) => setCaptcha(t), []);
  const [aud, setAudState] = useState('consumer');
  useEffect(() => setAudState(readAud()), []);
  const setAud = (v) => {
    setAudState(v);
    saveAud(v);
  };

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
            if (isProfileIncomplete(me.data)) {
              setIncomplete(me.data);
              setState('idle');
              return;
            }
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
const goResume = () => {
  const uid = saveResumeData(incomplete);
  window.location.assign(`/join/?user=${uid}&resume=1`);
};
const isNew = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('new') === '1';
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

if (incomplete) {
  const first = incomplete.name?.first;
  const steps = [
    ['About you', true],
    ['Secure your account', true],
    ['Contact & profile', false],
  ];
  return (
    <section className={`login aud-${aud}`}>
      <div className="login-bg" aria-hidden="true" />
      <AuthAura aud={aud} />
      <div className="wrap login-grid">
        <div className="login-art">
          <Breadcrumbs items={[{ label: 'Login' }]} />
          <h1>You’re almost in{first ? `, ${first}` : ''}!</h1>
          <p className="login-tag">One last step and your account is ready – your surveys and rewards are waiting.</p>
          <WelcomePortal aud={aud} />
        </div>
        <div className="login-card">
          <div className="login-card-glow" aria-hidden="true" />
          <span className="padlock" aria-hidden="true">
            <span className="pl-shackle" />
            <span className="pl-body">
              <Icon name="lock" size={18} />
            </span>
          </span>
          <h2>Complete your joining</h2>
          <p className="login-sub" style={{ textAlign: 'center' }}>
            Your account isn’t fully created yet. Finish the last step first, then you can sign in.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'grid', gap: 12 }}>
            {steps.map(([label, done]) => (
              <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: done ? 500 : 700 }}>
                <Icon name={done ? 'check' : 'arrow'} size={16} />
                <span>{label}</span>
                <small style={{ marginLeft: 'auto', opacity: 0.7 }}>{done ? 'Done' : 'Pending'}</small>
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary btn-block btn-lg" onClick={goResume}>
            Complete joining <Icon name="arrow" size={18} />
          </button>
                    <button
            type="button"
            style={{
              display: 'block',
              margin: '16px auto 0',
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              cursor: 'pointer',
              font: 'inherit',
              fontWeight: 600,
              color: '#1F5BFF',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              transition: 'color .2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#12C29B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#1F5BFF'; }}
            onFocus={(e) => { e.currentTarget.style.color = '#12C29B'; }}
            onBlur={(e) => { e.currentTarget.style.color = '#1F5BFF'; }}
            onClick={() => { setIncomplete(null); setEmail(''); setPw(''); setResetKey((k) => k + 1); }}
          >
            Login with another account
          </button>
        </div>
      </div>
    </section>
  );
}

  return (
    <section className={`login aud-${aud}`}>
      <div className="login-bg" aria-hidden="true" />
      <AuthAura aud={aud} />
      <div className="wrap login-grid">
        <div className="login-art">
          <Breadcrumbs items={[{ label: 'Login' }]} />
          <AudSwitch value={aud} onChange={setAud} label="I log in as a" />
          <h1>{aud === 'pro' ? 'Your expertise is in demand' : aud === 'minor' ? 'Your say is saved' : 'Your rewards are waiting'}</h1>
          <p className="login-tag" key={aud}>
            {aud === 'pro'
              ? 'New B2B studies, your points and your next payout – all one login away.'
              : aud === 'minor'
                ? 'Teen panel, ages 13–17: your channels, your points and your next age-checked survey.'
                : 'New surveys, your points and your next payout – all one login away.'}
          </p>
          <WelcomePortal aud={aud} />
          <AuthVoice aud={aud} />
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
                New here? <Link to={aud === 'pro' ? '/join/professional/' : aud === 'minor' ? '/join/minor/' : '/join/'}>Create a free account</Link>
              </p>

              <FollowUs />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
