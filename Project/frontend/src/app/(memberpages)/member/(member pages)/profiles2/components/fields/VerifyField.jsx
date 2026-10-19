import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon.jsx';
import { sendCode, checkCode, otpMode } from '../../lib/otp.js';
import { sound } from '../../lib/sound.js';
import { t } from '../../i18n/index.js';

/* Email / phone verification with a one-time code.
   Answer values: "verified" (server confirmed), "demo" (preview without a server — not trusted), "skipped",
   "changed" (contact changed after verifying). Format checks alone never set "verified". */
export default function VerifyField({ s, n, value, act }) {
  const isMail = n === 'verify-mail', A = s.ctx(n).A, to = isMail ? A.mail : A.phone;
  const [st, setSt] = useState(value === 'verified' || value === 'demo' ? 'done' : 'idle');
  const [id, setId] = useState(null), [code, setCode] = useState(''), [msg, setMsg] = useState(''), [demo, setDemo] = useState(''), [wait, setWait] = useState(0), [busy, setBusy] = useState(false);
  const inp = useRef(null);
  useEffect(() => { if (!wait) return; const k = setTimeout(() => setWait((w) => w - 1), 1000); return () => clearTimeout(k); }, [wait]);
  useEffect(() => { if (st === 'sent' && inp.current) inp.current.focus(); }, [st]);

  if (!to) return <p className="hint">{t('verify_first', { what: t(isMail ? 'what_mail' : 'what_phone') })}</p>;
  const send = async () => {
    setBusy(true); setMsg('');
    try {
      const r = await sendCode(isMail ? 'email' : 'sms', to);
      if (r.error) setMsg(t(r.error === 'resends' ? 'otp_resends' : 'otp_locked'));
      else { setId(r.id); setSt('sent'); setWait(r.resendIn || 45); setDemo(r.demoCode || ''); setCode(''); }
    } catch (e) { setMsg(t('submit_err')); }
    setBusy(false);
  };
  const verify = async (c = code) => {
    if (c.length !== 6) return;
    setBusy(true);
    try {
      const r = await checkCode(id, c);
      if (r.verified) { if (r.token) { try { sessionStorage.setItem('t2o:vtok:' + (isMail ? 'email' : 'phone'), r.token); } catch (e) { /* private mode */ } } setSt('done'); sound.tick(); act.answer(n, r.demo || otpMode() === 'demo' ? 'demo' : 'verified'); act.auto(n, null); }
      else if (r.error === 'wrong') { setMsg(t('otp_wrong', { left: r.attemptsLeft })); setCode(''); }
      else if (r.error === 'expired') { setMsg(t('otp_expired')); setSt('idle'); }
      else { setMsg(t('otp_locked')); setSt('idle'); }
    } catch (e) { setMsg(t('submit_err')); }
    setBusy(false);
  };
  return (
    <div className="verify">
      <div className="vf-head">
        <span className={'vf-ic' + (st === 'done' ? ' ok' : '')}><Icon n={st === 'done' ? 'check' : isMail ? 'mail' : 'phone'} /></span>
        <div><b dir="ltr">{to}</b><small>{st === 'done' ? (value === 'demo' ? t('verified') + ' · demo' : t('verified')) : t(isMail ? 'verify_mail_lead' : 'verify_phone_lead', { to })}</small></div>
      </div>
      {st === 'idle' && (
        <div className="vf-row">
          <button type="button" className="btn pr sm" onClick={send} disabled={busy}>{busy ? <span className="spin" /> : <Icon n="send" />}{t('send_code')}</button>
          <button type="button" className="btn gh sm" onClick={() => { act.answer(n, 'skipped'); act.next(); }}>{t('verify_later')}</button>
        </div>
      )}
      {st === 'sent' && (
        <>
          {demo && <p className="vf-demo" role="status"><Icon n="sparkle" />{t('demo_code', { code: demo })}</p>}
          <p className="hint">{t('code_sent', { to })}</p>
          <div className="vf-row">
            <input ref={inp} className="in otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} dir="ltr" value={code} aria-label={t('enter_code')} placeholder="••••••"
              onChange={(e) => { const c = e.target.value.replace(/\D/g, '').slice(0, 6); setCode(c); if (c.length === 6) verify(c); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); verify(); } }} />
            <button type="button" className="btn pr sm" onClick={() => verify()} disabled={busy || code.length !== 6}>{busy ? <span className="spin" /> : <Icon n="check" />}{t('verify_btn')}</button>
          </div>
          <div className="vf-row">
            <button type="button" className="lnk" onClick={send} disabled={wait > 0 || busy}>{wait > 0 ? t('resend_in', { s: wait }) : t('resend')}</button>
            <button type="button" className="lnk" onClick={() => { act.answer(n, 'skipped'); act.next(); }}>{t('verify_later')}</button>
          </div>
        </>
      )}
      {msg && <p className="er" role="alert"><Icon n="x" />{msg}</p>}
    </div>
  );
}
