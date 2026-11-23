// Part C — the teen's own decision: one tap for yes, one for no. "No" never proceeds: the page offers to save
// the answer (record: assent declined, no guardian data stored) and leave, or to change one's mind.
// What joining means is explained in plain words in Part A and in full in the reader.
import { memo } from 'react';
import Icon from './Icons.jsx';
import { TurnBar } from './Turns.jsx';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

function TeenAssent({ name, assent, setAssent, locked, onSaveNo, busy, showErr, onRead }) {
  const { t } = useI18n();
  const pick = (v) => { if (locked) return; play(v === 'yes' ? 'yes' : 'no'); setAssent(v); };
  return (
    <section className={`card card-teen ${assent ? `is-${assent}` : ''}`} id="partC" data-nav="partC" aria-labelledby="partC-h">
      <header className="card-head">
        <span className="card-ico ci-c" aria-hidden="true"><Icon name="wave" size={24} decorative /></span>
        <div>
          <h2 id="partC-h">{t('partC_h')}</h2>
          <p>{name ? t('c_hello', name) : t('partC_p')}</p>
        </div>
        <div className="card-key"><TurnBar teeth={[assent === 'yes', assent === 'yes', assent === 'yes']} tone="teen" turned={assent === 'yes'} label={t('lock_teen')} status={assent === 'yes' ? t('lock_turned') : assent === 'no' ? t('no') : t('lock_wait')} /></div>
      </header>

      <p className="teen-decide"><Icon name="hand" size={22} decorative /><span>{t('c_decide')}</span></p>

      <fieldset className={`yn ${showErr && !assent ? 'has-err' : ''}`} disabled={locked}>
        <legend>{t('c_choose')}</legend>
        <label className={`yn-o yn-yes ${assent === 'yes' ? 'is-on' : ''}`}>
          <input type="radio" name="assent" value="yes" checked={assent === 'yes'} onChange={() => pick('yes')} />
          <span className="yn-face" aria-hidden="true"><Icon name="check" size={26} decorative /></span>
          <span className="yn-t">{t('yes_opt')}</span>
        </label>
        <label className={`yn-o yn-no ${assent === 'no' ? 'is-on' : ''}`}>
          <input type="radio" name="assent" value="no" checked={assent === 'no'} onChange={() => pick('no')} />
          <span className="yn-face" aria-hidden="true"><Icon name="x" size={24} decorative /></span>
          <span className="yn-t">{t('no_opt')}</span>
        </label>
      </fieldset>

      {assent === 'no' && !locked ? (
        <div className="no-box" role="status">
          <b>{t('no_h')}</b>
          <p>{t('no_p')}</p>
          <div className="no-acts">
            <button type="button" className="btn ghost" onClick={() => { play('unfold'); setAssent(null); }}>{t('no_change')}</button>
            <button type="button" className="btn soft" onClick={onSaveNo} disabled={busy}>{busy ? <span className="spin" aria-hidden="true" /> : <Icon name="exit" size={18} decorative />}{t('no_save')}</button>
          </div>
        </div>
      ) : null}

      <p className="card-links">
        <button type="button" className="linkish" onClick={() => { play('unfold'); onRead('assent'); }}><Icon name="info" size={16} decorative />{t('read_more')}</button>
      </p>
    </section>
  );
}
export default memo(TeenAssent);
