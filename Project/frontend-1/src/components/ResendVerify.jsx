import { useEffect, useState } from 'react';
import { api, failureMessage } from '../utils/api.js';
import Icon from './Icon.jsx';

const RESEND_SECONDS = 60;

export default function ResendVerify({ email, message, title = 'Verify your email', children }) {
  const [cooldown, setCooldown] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const resend = async () => {
    if (!email?.trim()) return setNote('Please enter your email address first.');
    setBusy(true);
    setNote('');
    try {
      const resp = await api.post('/api/v1/user/resend', {
        mail: email.trim().toLowerCase(),
        action: 'resend-otp',
      });
      if (resp?.status === 'error') {
        setNote(failureMessage(resp));
      } else {
        setNote('Verification email sent. Please check your Inbox and Spam folder.');
        setCooldown(RESEND_SECONDS);
      }
    } catch (e) {
      setNote('Unable to send the email. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="join-done">
      <div className="wrap join-done-inner">
        <div className="inbox-anim" aria-hidden="true">
          <span className="inbox-env">
            <Icon name="mail" size={56} />
          </span>
          <span className="inbox-spark s1" />
          <span className="inbox-spark s2" />
          <span className="inbox-spark s3" />
        </div>

        <h1>{title}</h1>

        {message && <p>{message}</p>}
        {email && (
          <p className="muted">
            Verification link will be sent to <strong>{email}</strong>
          </p>
        )}

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={resend}
          disabled={busy || cooldown > 0}
        >
          {busy
            ? 'Sending…'
            : cooldown > 0
            ? `Resend email again in ${cooldown}s`
            : 'Resend verification email'}
        </button>

        {note && (
          <p className="muted" role="status">
            {note}
          </p>
        )}

         <div className="resend-actions">{children}</div>
      </div>
    </section>
  );
}