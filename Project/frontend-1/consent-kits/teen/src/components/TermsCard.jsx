// Part A in one card: six topics in plain words. Opening a topic shows what each of its sections says; "Read more"
// opens the full agreement at that place. One tap at the end agrees to all of it.
import { memo, useState } from 'react';
import Icon from './Icons.jsx';
import Tile from './Tile.jsx';
import { CHAPTERS, SECTIONS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';

function TermsCard({ accepted, onAccept, onRead, showErr, locked }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => new Set());
  const toggle = (id) => {
    play(open.has(id) ? 'fold' : 'unfold');
    setOpen((o) => { const x = new Set(o); if (x.has(id)) x.delete(id); else x.add(id); return x; });
  };
  return (
    <section className="card card-terms" id="partA" data-nav="partA" aria-labelledby="partA-h">
      <header className="card-head">
        <span className="card-ico ci-a" aria-hidden="true"><Icon name="book" size={24} decorative /></span>
        <div>
          <h2 id="partA-h">{t('partA_h')}</h2>
          <p>{t('partA_p')}</p>
        </div>
        <button type="button" className="chip chip-read" onClick={() => { play('unfold'); onRead(null); }}>
          <Icon name="layers" size={16} decorative />{t('full_agreement')}
        </button>
      </header>

      <ol className="topics">
        {CHAPTERS.map((c, ci) => {
          const isOpen = open.has(c.id);
          return (
            <li key={c.id} className={`topic ${isOpen ? 'is-open' : ''}`} style={{ '--g1': c.grade[0], '--g2': c.grade[1], '--i': ci }}>
              <button type="button" className="topic-h" aria-expanded={isOpen} aria-controls={`tp-${c.id}`} onClick={() => toggle(c.id)}>
                <span className="topic-n" aria-hidden="true">A{ci + 1}</span>
                <span className="topic-ico" aria-hidden="true"><Icon name={c.icon} size={22} decorative /></span>
                <span className="topic-t">
                  <b>{t(`ch_${c.id}`)}</b>
                  <small>{t(`ch_${c.id}_tag`)}</small>
                </span>
                <span className="topic-ch" aria-hidden="true"><Icon name="chevron" size={18} decorative /></span>
              </button>
              <div className="topic-fold" id={`tp-${c.id}`} role="region">
                <div className="topic-in">
                  <ul className="topic-list">
                    {c.sections.map((n) => (
                      <li key={n} style={{ '--h': SECTIONS[n].hue }}>
                        <span className="tl-n" aria-hidden="true">{n}</span>
                        <span><b>{t(`t${n}`)}</b> {t(`s${n}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="linkish topic-more" onClick={() => { play('unfold'); onRead(c.id); }}>
                    <Icon name="book" size={16} decorative />{t('read_more')}<Icon name="arrow" size={16} decorative />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <Tile
        id="t-accept"
        big
        tone="terms"
        icon="stamp"
        kind={t('required')}
        title={t('terms_accept')}
        desc={t('legal_en')}
        on={accepted}
        onToggle={onAccept}
        disabled={locked}
        err={showErr && !accepted}
      />
    </section>
  );
}
export default memo(TermsCard);
