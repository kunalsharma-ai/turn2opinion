// Part D — "Before every survey": the study-specific information card. With config.study it shows the real study;
// otherwise an example card with the template placeholders (marked "Example").
import { memo } from 'react';
import Icon from './Icons.jsx';
import { STUDY_EXAMPLE, STUDY_FIELDS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { fill } from './Clauses.jsx';

const ICONS = { title: 'clipboard', purpose: 'target', topics: 'layers', duration: 'clock', collected: 'folder', recipients: 'share', reward: 'gift', risks: 'shield', permission: 'key', support: 'mail' };

function StudyCard({ cfg }) {
  const { t } = useI18n();
  const real = cfg.study && typeof cfg.study === 'object';
  const data = real ? cfg.study : STUDY_EXAMPLE;
  return (
    <div className="study">
      {!real ? <span className="study-ribbon" aria-hidden="true"><span>{t('example')}</span></span> : null}
      <div className="study-board">
        <span className="study-clip" aria-hidden="true" />
        <dl className="study-grid" lang={real ? undefined : 'en'}>
          {STUDY_FIELDS.map((f, i) => (
            <div key={f} className={`sf sf-${f}`} style={{ '--i': i }}>
              <dt><span className="sf-ico" aria-hidden="true"><Icon name={ICONS[f]} size={18} decorative /></span>{t(`f_${f}`)}</dt>
              <dd>{fill(data[f] || '—', cfg)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="study-rule"><Icon name="info" size={18} decorative />{t('d_rule')}</p>
    </div>
  );
}
export default memo(StudyCard);
