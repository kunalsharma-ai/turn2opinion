// Section 22 — the member's choices (required + optional switches), the confirm / "Not now" buttons, the decline
// dialog and the success receipt.
import { useEffect, useRef } from 'react';
import Icon from './Icons.jsx';
import { Body } from './Section.jsx';
import { CONSENTS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';
import T2OMark from './T2OMark.jsx';

export function ConsentDock({ cfg, values, onChange, status, onAgree, onDecline, readCount, total, error, goto }) {
  const { t } = useI18n();
  const required = CONSENTS.filter((c) => c.required);
  const left = required.filter((c) => !values[c.id]).length;
  const ready = left === 0;
  const busy = status === 'saving';
  const group = (req) => (
    <ul className="switches">
      {CONSENTS.filter((c) => c.required === req).map((c, i) => {
        const on = !!values[c.id];
        return (
          <li key={c.id} style={{ '--i': i }}>
            <label className={`sw ${on ? 'on' : ''} ${req ? 'req' : 'opt'}`}>
              <input
                type="checkbox"
                checked={on}
                onChange={(e) => { play(e.target.checked ? 'on' : 'off'); onChange(c.id, e.target.checked); }}
                aria-describedby={`h-${c.id}`}
                disabled={busy}
              />
              <span className="sw-ico" aria-hidden="true"><Icon name={c.icon} size={24} decorative /></span>
              <span className="sw-text">
                <b>{t(`c_${c.id}`)}</b>
                <small id={`h-${c.id}`}>
                  {c.refs.map((r) => (
                    <a key={r} href={`#s${r}`} onClick={(e) => { e.preventDefault(); goto(`s${r}`); }} className="ref">§{r}</a>
                  ))}
                  <span>{t(`c_${c.id}_hint`)}</span>
                </small>
              </span>
              <span className="sw-track" aria-hidden="true">
                <span className="sw-knob"><i className="kf-eye l" /><i className="kf-eye r" /><i className="kf-mouth" /></span>

              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className="dock" id="choices" aria-labelledby="choices-h">
      <div className="dock-glow" aria-hidden="true" />
      <header className="dock-head">
        <span className="tile big" aria-hidden="true"><Icon name="pen" size={34} decorative /></span>
        <div>
          <span className="sec-no">{t('section', 22)} · {t('t22')}</span>
          <h2 id="choices-h">{t('choices_h')}</h2>
          <p>{t('choices_lead')}</p>
        </div>
      </header>
      <div className="dock-legal" lang="en" dir="ltr">
        <Body n={22} cfg={cfg} t={t} />
      </div>
      <div className="groups">
        <div className="group">
          <h3><span className="tag req">{t('required')}</span></h3>
          {group(true)}
        </div>
        <div className="group">
          <h3><span className="tag opt">{t('optional')}</span></h3>
          {group(false)}
        </div>
      </div>
      <p className="read-note">
        <Icon name="clipboard" size={18} decorative />
        {t('read_note', readCount, total)}
      </p>
      {error ? <p className="err" role="alert">{t('err_save')}</p> : null}
      <div className="dock-actions">
        <p className={`state ${ready ? 'ok' : ''}`} aria-live="polite">
          {ready ? <><Icon name="check" size={18} decorative />{t('all_required')}</> : t('need_n', left)}
        </p>
        <button type="button" className="btn ghost" onClick={() => { play('tap'); onDecline(); }} disabled={busy}>
          {t('not_now')}
        </button>
        <button
          type="button"
          className={`btn primary ${ready ? 'ready' : ''} ${busy ? 'busy' : ''}`}
          aria-disabled={!ready || busy}
          onClick={(e) => {
            if (busy) return;
            if (!ready) {
              play('warn');
              const first = e.currentTarget.closest('.dock').querySelector('.sw.req:not(.on)');
              if (first) { first.classList.remove('nudge'); void first.offsetWidth; first.classList.add('nudge'); first.querySelector('input').focus(); }
              return;
            }
            play('sign');
            onAgree();
          }}
        >
          <span className="btn-shine" aria-hidden="true" />
          {busy ? <span className="spin" aria-hidden="true" /> : <Icon name="pen" size={20} decorative />}
          <span>{busy ? t('agree_saving') : t('agree_btn')}</span>
        </button>
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
        <span className="tile big warn" aria-hidden="true"><Icon name="exit" size={34} decorative /></span>
        <h2 id="dc-h">{t('decline_h')}</h2>
        <p id="dc-p">{t('decline_p')}</p>
        <div className="dialog-actions">
          <button type="button" className="btn primary ready" onClick={() => { play('tap'); onBack(); }}>{t('decline_back')}</button>
          <button type="button" className="btn ghost" onClick={() => { play('off'); onLogout(); }}>{t('decline_out')}</button>
        </div>
      </div>
    </div>
  );
}

// The success screen is a shop-style receipt "printing" out of a little printer: thermal paper slides down from the
// slot with the member's receipt (reference, date, version, language, every choice), a zig-zag torn edge and a
// "thank you for your opinion" footer, while hearts and likes float up around it.
export function Done({ record, onDownload, onContinue, hasContinue }) {
  const { t, languages } = useI18n();
  const ref = useRef(null);
  useEffect(() => {
    const b = ref.current && ref.current.querySelector('.btn.primary, .btn');
    if (b) b.focus({ preventScroll: true });
  }, []);
  if (!record) return null;
  const langName = (languages.find((l) => l.code === record.language) || {}).native || record.language;
  const date = new Date(record.acceptedAt);
  return (
    <div className="veil done-veil">
      <div className="likes" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => <i key={i} style={{ '--i': i }}><Icon name={i % 4 === 1 ? 'star' : i % 4 === 3 ? 'check' : 'heart'} size={22} decorative /></i>)}
      </div>
      <div className="done printer" role="dialog" aria-modal="true" aria-labelledby="dn-h" ref={ref}>
        <div className="printer-head" aria-hidden="true">
          <span className="printer-led" />
          <T2OMark size={30} />
          <span className="printer-slot" />
        </div>
        <div className="paper-wrap">
          <div className="paper">
            <div className="paper-top">
              <span className="paper-mark" aria-hidden="true"><T2OMark size={48} /></span>
              <h2 id="dn-h">{t('done_h')}</h2>
              <p>{t('done_p')}</p>
            </div>
            <div className="receipt slip">
              <h3><Icon name="clipboard" size={18} decorative />{t('receipt')}</h3>
              <dl>
                <div><dt>{t('r_id')}</dt><dd className="mono">{record.consentId}</dd></div>
                <div><dt>{t('r_date')}</dt><dd>{date.toLocaleString(record.language)}</dd></div>
                <div><dt>{t('r_version')}</dt><dd>{record.termsVersion}</dd></div>
                <div><dt>{t('r_lang')}</dt><dd>{langName}</dd></div>
              </dl>
              <h4>{t('r_choices')}</h4>
              <ul className="r-choices">
                {CONSENTS.map((c) => (
                  <li key={c.id} className={record.consents[c.id] ? 'y' : 'n'}>
                    <span className="yn">{record.consents[c.id] ? t('yes') : t('no')}</span>
                    <span>{t(`c_${c.id}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="slip-end mono" aria-hidden="true">* * * Turn2Opinion.com * * *</p>
            </div>
          </div>
        </div>
        <div className="dialog-actions">
          <button type="button" className="btn ghost" onClick={() => { play('tap'); onDownload(); }}>
            <Icon name="download" size={18} decorative />
            {t('download')}
          </button>
          {hasContinue ? (
            <button type="button" className="btn primary ready" onClick={() => { play('tap'); onContinue(); }}>
              <span className="btn-shine" aria-hidden="true" />
              <span>{t('continue')}</span>
              <Icon name="arrow" size={18} decorative />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
