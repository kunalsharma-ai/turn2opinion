// Part B — the parent's or guardian's permission, as three taps. Nothing is asked here: the name, relationship
// and contact were given when the account was registered, so the card only shows where the confirmation will go.
// The three required permissions stay separate (they are never bundled into one tap), and the optional ones are
// tucked away until they are opened.
import { memo, useState } from 'react';
import Icon from './Icons.jsx';
import Tile from './Tile.jsx';
import { TurnBar } from './Turns.jsx';
import { CONSENTS, DECLARATION } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

function ConsentCard({ cfg, g, consents, setConsent, showErr, locked, onRead }) {
  const { t } = useI18n();
  const [showOpt, setShowOpt] = useState(false);
  const shown = CONSENTS.filter((c) => c.required || (cfg.optionalConsents || []).includes(c.id));
  const req = shown.filter((c) => c.required);
  const opt = shown.filter((c) => !c.required);
  const kind = (c) => (c.id === 'privacy' ? t('kind_ack') : c.id === 'contact' ? t('kind_where') : c.required ? t('required') : t('kind_opt'));
  const done = req.every((c) => consents[c.id]);

  return (
    <section className="card card-parent" id="partB" data-nav="partB" aria-labelledby="partB-h">
      <header className="card-head">
        <span className="card-ico ci-b" aria-hidden="true"><Icon name="family" size={24} decorative /></span>
        <div>
          <h2 id="partB-h">{t('partB_h')}</h2>
          <p>{t('partB_p')}</p>
        </div>
        <div className="card-key"><TurnBar teeth={req.map((c) => Boolean(consents[c.id]))} tone="parent" turned={done} label={t('lock_parent')} status={done ? t('lock_ready') : `${req.filter((c) => consents[c.id]).length}/${req.length}`} /></div>
      </header>

      <p className="onfile">
        <span className="onfile-badge"><Icon name={g.verified ? 'check' : 'badge'} size={16} decorative />{g.verified ? t('verif_done') : t('on_file')}</span>
        <span>{g.masked ? t('on_file_note', g.masked) : t('verif_pending_anon')}</span>
      </p>

      {cfg.mode === 'guardian' ? (
        // Turn2Opinion host hook: the guardian sees the Part B2 declaration their taps confirm
        <details className="gm-decl">
          <summary><Icon name="scale" size={16} decorative /><b>{t('b2_h')}</b><span>{t('b2_lead')}</span></summary>
          <ol>{DECLARATION.map((_, i) => <li key={i}>{t(`d${i + 1}`)}</li>)}</ol>
        </details>
      ) : null}

      <p className="b3-lead">{t('b3_lead')}</p>

      <div className="tiles">
        {req.map((c) => (
          <Tile
            key={c.id}
            id={`k-${c.id}`}
            icon={c.icon}
            kind={kind(c)}
            title={t(`c_${c.id}_k`)}
            desc={t(`c_${c.id}`)}
            on={Boolean(consents[c.id])}
            onToggle={(v) => setConsent(c.id, v)}
            disabled={locked}
            err={showErr && !consents[c.id]}
          />
        ))}
      </div>

      {opt.length ? (
        <div className={`opt ${showOpt ? 'is-open' : ''}`}>
          <button type="button" className="chip opt-h" aria-expanded={showOpt} onClick={() => { play(showOpt ? 'fold' : 'unfold'); setShowOpt(!showOpt); }}>
            <span className="opt-pill">{t('optional')}</span>
            <span className="opt-c">{opt.filter((c) => consents[c.id]).length}/{opt.length}</span>
            <Icon name="chevron" size={16} decorative className="opt-ch" />
          </button>
          <div className="opt-fold">
            <div className="opt-in">
              <p className="opt-note">{t('opt_note')}</p>
              <div className="tiles tiles-opt">
                {opt.map((c) => (
                  <Tile key={c.id} id={`k-${c.id}`} tone="opt" icon={c.icon} kind={kind(c)} title={t(`c_${c.id}_k`)} desc={t(`c_${c.id}`)} on={Boolean(consents[c.id])} onToggle={(v) => setConsent(c.id, v)} disabled={locked} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <p className="card-links">
        <a href={cfg.privacyPolicyUrl} target="_blank" rel="noopener noreferrer"><Icon name="lock" size={16} decorative />{t('privacy_link')}<Icon name="arrow" size={15} decorative /></a>
        <button type="button" className="linkish" onClick={() => { play('unfold'); onRead('declaration'); }}><Icon name="scale" size={16} decorative />{t('b2_h')}</button>
      </p>
    </section>
  );
}
export default memo(ConsentCard);
