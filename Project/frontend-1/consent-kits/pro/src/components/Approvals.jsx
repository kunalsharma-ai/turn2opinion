// Clause 23 — the approvals checklist (each approval draws its tick with a scan sweep), press-and-hold to sign, the
// decline dialog and the sealed-envelope confirmation.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons.jsx';
import { Body } from './Clause.jsx';
import { CONSENTS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';
import T2OMark from './T2OMark.jsx';

// Press-and-hold to sign: a ring fills around the button while it is held (about 1.2 s) and a rising tone plays;
// letting go early resets it. Keyboard and assistive tech: Enter or Space signs straight away.
const HOLD_MS = 1200;
function HoldToSign({ ready, busy, onSign, onBlocked }) {
  const { t } = useI18n();
  const [p, setP] = useState(0); // 0..1
  const raf = useRef(0);
  const start = useRef(0);
  const ticks = useRef(0);
  const stop = () => { cancelAnimationFrame(raf.current); raf.current = 0; };
  const finish = () => { stop(); if (!ready) { onBlocked(); setP(0); return; } setP(1); onSign(); };
  const loop = () => {
    const v = Math.min(1, (performance.now() - start.current) / HOLD_MS);
    const tk = Math.floor(v * 6);
    if (tk > ticks.current) { ticks.current = tk; play('tick'); }
    setP(v);
    if (v >= 1) finish(); else raf.current = requestAnimationFrame(loop);
  };
  const down = (e) => {
    if (busy) return;
    if (!ready) { onBlocked(); return; }
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
    start.current = performance.now();
    ticks.current = 0;
    play('tap');
    stop();
    raf.current = requestAnimationFrame(loop);
  };
  const up = () => { if (raf.current) { stop(); setP(0); } };
  useEffect(() => () => stop(), []);
  useEffect(() => { if (!busy && p === 1) setP(0); }, [busy]); // eslint-disable-line react-hooks/exhaustive-deps
  const C = 2 * Math.PI * 30;
  return (
    <div className={`hold ${ready ? 'ready' : ''} ${busy ? 'busy' : ''} ${p > 0 && p < 1 ? 'holding' : ''}`} style={{ '--p': p }}>
      <button
        type="button"
        className="hold-btn"
        aria-label={t('slide')}
        aria-disabled={!ready || busy}
        onPointerDown={down}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={up}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => { if (busy) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); } }}
      >
        <svg className="hold-ring" viewBox="0 0 68 68" aria-hidden="true">
          <circle cx="34" cy="34" r="30" />
          <circle className="hold-v" cx="34" cy="34" r="30" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - p) }} />
        </svg>
        <span className="hold-core" aria-hidden="true">{busy ? <span className="spin" /> : <T2OMark size={40} />}</span>
      </button>
      <span className="hold-label" aria-hidden="true">
        <b>{busy ? t('signing') : t('slide')}</b>
        <small>{busy ? '' : t('slide_kb')}</small>
      </span>
      <span className="hold-bar" aria-hidden="true"><i /></span>
    </div>
  );
}

export function Approvals({ cfg, values, onChange, status, onSign, onDecline, reviewed, total, error, goto }) {
  const { t } = useI18n();
  const left = CONSENTS.filter((c) => c.required && !values[c.id]).length;
  const ready = left === 0;
  const busy = status === 'saving';
  const blocked = (root) => {
    play('warn');
    const first = root && root.querySelector('.ap.req:not(.on)');
    if (first) { first.classList.remove('nudge'); void first.offsetWidth; first.classList.add('nudge'); first.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  };
  const ref = useRef(null);
  const tile = (c, i) => {
    const on = !!values[c.id];
    return (
      <li key={c.id} style={{ '--i': i }}>
        <label className={`ap ${on ? 'on' : ''} ${c.required ? 'req' : 'opt'}`}>
          <input type="checkbox" checked={on} disabled={busy} aria-describedby={`h-${c.id}`} onChange={(e) => { play(e.target.checked ? 'stamp' : 'unstamp'); onChange(c.id, e.target.checked); }} />
          <span className="ap-box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg></span>
          <span className="ap-ico" aria-hidden="true"><Icon name={c.icon} size={22} decorative /></span>
          <span className="ap-text">
            <b>{t(`c_${c.id}`)}</b>
            <small id={`h-${c.id}`}>
              {c.refs.map((r) => <a key={r} href={`#s${r}`} className="ref mono" onClick={(e) => { e.preventDefault(); goto(r); }}>§{r}</a>)}
              <span>{t(`c_${c.id}_hint`)}</span>
            </small>
          </span>
          <span className="ap-scan" aria-hidden="true" />
        </label>
      </li>
    );
  };
  return (
    <section className="board" id="approvals" aria-labelledby="ap-h" ref={ref}>
      <div className="board-grid" aria-hidden="true" />
      <header className="board-head">
        <span className="clause-no mono">{t('clause', '23')} · {t('t23')}</span>
        <h2 id="ap-h">{t('approvals_h')}</h2>
        <p>{t('approvals_lead')}</p>
      </header>
      <div className="board-legal" lang="en" dir="ltr"><Body n={23} cfg={cfg} t={t} /></div>
      <h3 className="group-h"><span className="tag req">{t('required')}</span><span className="mono need">{ready ? t('all_required') : t('need_n', left)}</span></h3>
      <ul className="aps">{CONSENTS.filter((c) => c.required).map(tile)}</ul>
      <h3 className="group-h"><span className="tag opt">{t('optional')}</span></h3>
      <ul className="aps">{CONSENTS.filter((c) => !c.required).map(tile)}</ul>
      <p className="review-note"><Icon name="clipboard" size={18} decorative />{t('review_note', reviewed, total)}</p>
      {error ? <p className="err" role="alert">{t('err_save')}</p> : null}
      <div className="sign-row">
        <HoldToSign ready={ready} busy={busy} onSign={onSign} onBlocked={() => blocked(ref.current)} />
        <button type="button" className="btn ghost" onClick={() => { play('tap'); onDecline(); }} disabled={busy}>{t('not_now')}</button>
      </div>
    </section>
  );
}

export function DeclineDialog({ open, onBack, onLogout }) {
  const { t } = useI18n();
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const b = ref.current && ref.current.querySelector('button');
    if (b) b.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === 'Escape') onBack(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onBack]);
  if (!open) return null;
  return (
    <div className="veil" onMouseDown={(e) => { if (e.target === e.currentTarget) onBack(); }}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dc-h" aria-describedby="dc-p" ref={ref}>
        <span className="hex big warn" aria-hidden="true"><Icon name="exit" size={30} decorative /></span>
        <h2 id="dc-h">{t('decline_h')}</h2>
        <p id="dc-p">{t('decline_p')}</p>
        <div className="dialog-actions">
          <button type="button" className="btn primary" onClick={() => { play('tap'); onBack(); }}>{t('decline_back')}</button>
          <button type="button" className="btn ghost" onClick={() => { play('dark'); onLogout(); }}>{t('decline_out')}</button>
        </div>
      </div>
    </div>
  );
}

// Confirmation: the signed agreement is folded into an envelope, the flap closes, a Turn2Opinion seal presses on and
// the envelope flies up — then the confirmation card (with every detail of the record) rises out of it.
export function Certificate({ record, name, onDownload, onContinue, hasContinue }) {
  const { t, languages } = useI18n();
  const ref = useRef(null);
  useEffect(() => { const b = ref.current && ref.current.querySelector('.btn.primary, .btn'); if (b) b.focus({ preventScroll: true }); }, []);
  if (!record) return null;
  const langName = (languages.find((l) => l.code === record.language) || {}).native || record.language;
  return (
    <div className="veil cert-veil">
      <div className="env" aria-hidden="true">
        <span className="env-back" />
        <span className="env-letter"><i /><i /><i /></span>
        <span className="env-front" />
        <span className="env-flap" />
        <span className="env-seal"><T2OMark size={34} /></span>
      </div>
      <div className="cert" role="dialog" aria-modal="true" aria-labelledby="ct-h" ref={ref}>
        <div className="cert-in">
          <div className="cert-top">
            <span className="cert-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="23" /><path d="M15 27l7 7 15-16" /></svg></span>
            <div>
              <p className="cert-kicker mono">{t('cert')}</p>
              <h2 id="ct-h">{t('done_h')}</h2>
            </div>
          </div>
          <p className="cert-p">{t('done_p')}</p>
          <dl className="cert-dl">
            {name ? <div><dt>{t('r_name')}</dt><dd>{name}</dd></div> : null}
            <div><dt>{t('r_id')}</dt><dd className="mono">{record.consentId}</dd></div>
            <div><dt>{t('r_date')}</dt><dd>{new Date(record.acceptedAt).toLocaleString(record.language)}</dd></div>
            <div><dt>{t('r_version')}</dt><dd className="mono">{record.termsVersion}</dd></div>
            <div><dt>{t('r_lang')}</dt><dd>{langName}</dd></div>
          </dl>
          <h3>{t('r_choices')}</h3>
          <ul className="cert-list">
            {CONSENTS.map((c) => (
              <li key={c.id} className={record.consents[c.id] ? 'y' : 'n'}>
                <span className="yn mono">{record.consents[c.id] ? t('yes') : t('no')}</span>
                <span>{t(`c_${c.id}`)}</span>
              </li>
            ))}
          </ul>
          <div className="dialog-actions">
            <button type="button" className="btn ghost" onClick={() => { play('tap'); onDownload(); }}><Icon name="download" size={18} decorative />{t('download')}</button>
            {hasContinue ? <button type="button" className="btn primary" onClick={() => { play('tap'); onContinue(); }}>{t('continue')}<Icon name="arrow" size={18} decorative /></button> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
