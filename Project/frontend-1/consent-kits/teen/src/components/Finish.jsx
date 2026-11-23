// The end of the page: the send dock (three things to be done), the "Not now" dialog, the result screen
// (activation lock + consent record + PDF) and the eligibility notice for members outside 13–17.
import { useEffect, useRef } from 'react';
import Icon from './Icons.jsx';
import Ring from './Turns.jsx';
import { CONSENTS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { BY_CODE } from '../i18n/languages.js';
import { play } from '../sound.js';
import { trapTab } from './focusTrap.js';

export function SendDock({ parentKey, teenKey, checks, count, onSend, onNotNow, status, error }) {
  const { t } = useI18n();
  const rows = [
    { k: 'terms', ok: checks.terms, label: t('chk_read'), go: 't-accept' },
    { k: 'required', ok: checks.required, label: t('chk_required'), go: 'partB' },
    { k: 'teen', ok: checks.teen, label: t('chk_teen'), go: 'partC' },
  ];
  const missing = rows.filter((r) => !r.ok);
  const ready = !missing.length;
  return (
    <section className={`dock ${ready ? 'is-ready' : ''} ${status === 'saving' ? 'is-sending' : ''}`} id="send" data-nav="send" aria-labelledby="send-h">
      <div className="dock-lock" aria-hidden="true"><Ring parent={parentKey} teen={teenKey} size={0.62} label={false} /></div>
      <div className="dock-pad">
        <h3 id="send-h"><Icon name="key" size={24} decorative />{t('send_h')}<span className="dock-count mono" aria-live="polite">{count}</span></h3>
        <ul className="dock-list">
          {rows.map((r) => (
            <li key={r.k} className={r.ok ? 'ok' : ''}>
              <a href={`#${r.go}`} data-go={r.go}>
                <span className="dl-box" aria-hidden="true">{r.ok ? <Icon name="check" size={14} decorative /> : null}</span>
                <span>{r.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {error ? <p className="dock-err" role="alert"><Icon name="info" size={18} decorative />{t('err_save')}</p> : null}
        <div className="dock-acts">
          <button type="button" className="btn primary big" onClick={onSend} aria-disabled={!ready} disabled={status === 'saving'}>
            {status === 'saving' ? <span className="spin" aria-hidden="true" /> : <span className="btn-plane" aria-hidden="true"><Icon name="plane" size={20} decorative /></span>}
            {status === 'saving' ? t('sending') : t('send_btn')}
          </button>
          <button type="button" className="btn ghost" onClick={onNotNow}>{t('not_now')}</button>
        </div>
        <p className="dock-note" aria-live="polite">
          <Icon name="lock" size={16} decorative />
          {ready ? t('send_note') : t('need', missing.map((m) => m.label).join(' · '))}
        </p>
      </div>
    </section>
  );
}

function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const id = setTimeout(() => { const el = ref.current && ref.current.querySelector('button'); if (el) el.focus({ preventScroll: true }); }, 50);
    const key = (e) => { if (e.key === 'Escape' && onClose) { play('fold'); onClose(); } else trapTab(e, ref.current); };
    window.addEventListener('keydown', key);
    return () => { clearTimeout(id); window.removeEventListener('keydown', key); if (prev && prev.focus) prev.focus({ preventScroll: true }); };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

export function DeclineDialog({ open, onBack, onLogout }) {
  const { t } = useI18n();
  const ref = useDialog(open, onBack);
  if (!open) return null;
  return (
    <div className="veil" onMouseDown={(e) => { if (e.target === e.currentTarget) { play('fold'); onBack(); } }}>
      <div className="dlg" role="dialog" aria-modal="true" aria-labelledby="dc-h" ref={ref}>
        <span className="dlg-ico" aria-hidden="true"><Icon name="exit" size={30} decorative /></span>
        <h2 id="dc-h">{t('decline_h')}</h2>
        <p>{t('decline_p')}</p>
        <div className="dlg-acts">
          <button type="button" className="btn primary" onClick={() => { play('unfold'); onBack(); }}>{t('decline_back')}</button>
          <button type="button" className="btn ghost" onClick={() => { play('tap'); onLogout(); }}>{t('decline_out')}</button>
        </div>
      </div>
    </div>
  );
}

const fmt = (iso, lang) => { try { return new Date(iso).toLocaleString(lang, { dateStyle: 'medium', timeStyle: 'short' }); } catch { return iso; } };

export function Done({ record, phase, guardian, onPdf, onContinue, hasContinue, onResend, onDemoVerify, demo, onLeave }) {
  const { t, lang } = useI18n();
  const ref = useDialog(true, null);
  const declined = phase === 'declined';
  const active = phase === 'active';
  const g = record.guardian || guardian || {};
  const who = [g.name, g.relationship ? t(`rel_${g.relationship}`) : '', g.masked || ''].filter(Boolean).join(' · ');
  const st = (v) => t(`st_${v}`);
  return (
    <div className="veil veil-done">
      <div className={`fin is-${phase}`} role="dialog" aria-modal="true" aria-labelledby="done-h" ref={ref}>
        <div className="fin-art">
          <Ring parent={declined ? 'wait' : active ? 'turned' : 'verifying'} teen={declined ? 'no' : 'turned'} open={active} size={0.9} />
          {!declined ? <div className="stars" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div> : null}
        </div>
        <div className="fin-txt">
          <h2 id="done-h">{declined ? t('declined_h') : active ? t('done_active_h') : t('done_h')}</h2>
          <p>{declined ? t('declined_p') : active ? t('done_active_p') : t('done_p')}</p>
          {!declined && !active ? <p className="fin-wait" aria-live="polite"><span className="dots" aria-hidden="true"><i /><i /><i /></span>{t('done_wait')}</p> : null}
          <div className="rec">
            <h3><Icon name="stamp" size={18} decorative />{t('receipt')}</h3>
            <dl>
              <div><dt>{t('r_id')}</dt><dd className="mono">{record.consentId}</dd></div>
              <div><dt>{t('r_date')}</dt><dd>{fmt(record.timestamps.submittedAt, lang)}</dd></div>
              <div><dt>{t('r_version')}</dt><dd className="mono">{record.policyVersion}</dd></div>
              <div><dt>{t('r_lang')}</dt><dd>{(BY_CODE[record.language] || {}).native || record.language}</dd></div>
              {!declined && who ? <div><dt>{t('r_guardian')}</dt><dd>{who}</dd></div> : null}
              {!declined ? <div><dt>{t('r_permission')}</dt><dd><span className={`pill ${active ? 'ok' : 'wait'}`}>{st(active ? 'verified' : 'pending')}</span></dd></div> : null}
              <div><dt>{t('r_assent')}</dt><dd><span className={`pill ${declined ? 'no' : 'ok'}`}>{st(declined ? 'declined' : 'agreed')}</span></dd></div>
              <div><dt>{t('r_account')}</dt><dd><span className={`pill ${active ? 'ok' : 'lock'}`}>{st(active ? 'active' : 'blocked')}</span></dd></div>
            </dl>
            {!declined ? (
              <ul className="rec-choices" aria-label={t('r_choices')}>
                {CONSENTS.filter((c) => c.id in record.consents).map((c) => (
                  <li key={c.id} className={record.consents[c.id] ? 'y' : 'n'}>
                    <Icon name={record.consents[c.id] ? 'check' : 'x'} size={14} decorative />
                    <span>{t(`c_${c.id}_k`)}</span>
                    <small>{record.consents[c.id] ? t('yes') : t('no')}</small>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="fin-acts">
            {active && hasContinue ? <button type="button" className="btn primary" onClick={() => { play('tap'); onContinue(); }}>{t('continue')}<Icon name="arrow" size={18} decorative /></button> : null}
            {declined ? <button type="button" className="btn primary" onClick={() => { play('tap'); onLeave(); }}>{t('decline_out')}</button> : null}
            <button type="button" className={`btn ${active || declined ? 'ghost' : 'primary'}`} onClick={() => { play('stamp'); onPdf(); }}><Icon name="download" size={18} decorative />{t('download_pdf')}</button>
            {!declined && !active ? <button type="button" className="btn ghost" onClick={onResend}><Icon name="refresh" size={18} decorative />{t('resend')}</button> : null}
            {!declined && !active && demo ? <button type="button" className="btn demo" onClick={onDemoVerify}><Icon name="key" size={18} decorative />{t('demo_verify')}</button> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Notice({ kind, cfg }) {
  const { t } = useI18n();
  return (
    <div className="notice">
      <span className="notice-ico" aria-hidden="true"><Icon name={kind === 'adult' ? 'badge' : 'info'} size={34} decorative /></span>
      <h1>{kind === 'adult' ? t('adult_h') : t('under_h')}</h1>
      <p>{kind === 'adult' ? t('adult_p') : t('under_p')}</p>
      {cfg.continueUrl || cfg.logoutUrl ? (
        <a className="btn primary" href={kind === 'adult' ? cfg.continueUrl || '/' : cfg.logoutUrl || '/'} onClick={() => play('tap')}>{t('go_back')}<Icon name="arrow" size={18} decorative /></a>
      ) : null}
    </div>
  );
}
