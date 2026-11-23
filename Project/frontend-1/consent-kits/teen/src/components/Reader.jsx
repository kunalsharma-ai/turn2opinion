// "Read more" — the entire agreement in one reader: the information for parents, all 19 sections of Part A with
// their full legal clauses, the declaration, the teen's assent points, the card every study shows and the contact
// details. Nothing is hidden behind the short page; this is simply where the long version lives.
// It can be printed, or saved as a PDF (src/pdf.js — the binding English text).
import { useEffect, useRef } from 'react';
import Icon from './Icons.jsx';
import Section, { Contact } from './Clauses.jsx';
import StudyCard from './StudyCard.jsx';
import { ASSENT, ASSENT_ICONS, CHAPTERS, CONSENTS, DECLARATION, PARENT_INFO } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';
import { play } from '../sound.js';
import { trapTab } from './focusTrap.js';

export default function Reader({ open, focus, cfg, onClose, onPdf }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const key = (e) => { if (e.key === 'Escape') { play('fold'); onClose(); } else trapTab(e, ref.current); };
    window.addEventListener('keydown', key);
    // the long text above the target is still settling, so the position is corrected once more a moment later
    const settle = () => {
      const target = focus && bodyRef.current ? bodyRef.current.querySelector(`#rd-${focus}`) : null;
      if (target && bodyRef.current) bodyRef.current.scrollTop += target.getBoundingClientRect().top - bodyRef.current.getBoundingClientRect().top - 10;
    };
    const id = setTimeout(() => {
      const el = ref.current && ref.current.querySelector('.rd-close');
      if (el) el.focus({ preventScroll: true });
      settle();
    }, 40);
    const id2 = setTimeout(settle, 320);
    const id3 = setTimeout(settle, 900);
    return () => { clearTimeout(id); clearTimeout(id2); clearTimeout(id3); window.removeEventListener('keydown', key); if (prev && prev.focus) prev.focus({ preventScroll: true }); };
  }, [open, focus]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!open) return null;

  const jump = (id) => {
    play('tap');
    const el = bodyRef.current && bodyRef.current.querySelector(`#rd-${id}`);
    if (el && bodyRef.current) bodyRef.current.scrollBy({ top: el.getBoundingClientRect().top - bodyRef.current.getBoundingClientRect().top - 10, behavior: 'smooth' });
  };

  return (
    <div className="veil veil-read" onMouseDown={(e) => { if (e.target === e.currentTarget) { play('fold'); onClose(); } }}>
      <div className="reader" role="dialog" aria-modal="true" aria-labelledby="rd-h" ref={ref}>
        <header className="rd-top">
          <div className="rd-title">
            <h2 id="rd-h"><Icon name="book" size={22} decorative />{t('full_agreement')}</h2>
            <p className="mono">{t('version', cfg.termsVersion)}</p>
          </div>
          <div className="rd-acts">
            <button type="button" className="chip" onClick={onPdf}><Icon name="download" size={16} decorative />{t('download_pdf')}</button>
            <button type="button" className="chip rd-print" onClick={() => { play('tap'); setTimeout(() => window.print(), 120); }}><Icon name="print" size={16} decorative />{t('print')}</button>
            <button type="button" className="icon-btn rd-close" onClick={() => { play('fold'); onClose(); }} aria-label={t('close')}><Icon name="x" size={20} decorative /></button>
          </div>
          <nav className="rd-nav" aria-label={t('sections')}>
            {CHAPTERS.map((c, i) => (
              <button type="button" key={c.id} className="rd-chip" style={{ '--g1': c.grade[0], '--g2': c.grade[1] }} onClick={() => jump(c.id)}>
                <b>A{i + 1}</b>{t(`ch_${c.id}`)}
              </button>
            ))}
            <button type="button" className="rd-chip" onClick={() => jump('declaration')}><b>B</b>{t('b2_h')}</button>
            <button type="button" className="rd-chip" onClick={() => jump('assent')}><b>C</b>{t('partC_h')}</button>
            <button type="button" className="rd-chip" onClick={() => jump('study')}><b>D</b>{t('partD_h')}</button>
          </nav>
        </header>

        <div className="rd-body" ref={bodyRef} tabIndex={-1}>
          <aside className="note-parents" aria-labelledby="info-h">
            <span className="np-pin" aria-hidden="true" />
            <h3 id="info-h"><Icon name="family" size={22} decorative />{t('info_h')}</h3>
            {PARENT_INFO.map((_, i) => <p key={i}>{t(`info${i + 1}`)}</p>)}
            <p className="np-rule"><Icon name="lock" size={18} decorative /><b>{t('info_rule')}</b></p>
          </aside>

          <h3 className="rd-part"><span>{t('part', 'A')}</span>{t('partA_h')}</h3>
          {CHAPTERS.map((c, ci) => (
            <section key={c.id} id={`rd-${c.id}`} className="rd-chap" style={{ '--g1': c.grade[0], '--g2': c.grade[1] }} aria-labelledby={`rd-${c.id}-h`}>
              <h3 id={`rd-${c.id}-h`} className="rd-chap-h">
                <span className="rd-chap-n" aria-hidden="true">A{ci + 1}</span>
                <span><b>{t(`ch_${c.id}`)}</b><small>{t(`ch_${c.id}_tag`)}</small></span>
              </h3>
              {c.sections.map((n) => <Section key={n} n={n} cfg={cfg} />)}
            </section>
          ))}

          <section id="rd-declaration" className="rd-chap rd-decl" aria-labelledby="rd-decl-h">
            <h3 id="rd-decl-h" className="rd-part"><span>{t('part', 'B')}</span>{t('b2_h')}</h3>
            <p className="rd-lead">{t('b2_lead')}</p>
            <ul className="decl">
              {DECLARATION.map((_, i) => <li key={i} style={{ '--i': i }}><Icon name="check" size={16} decorative /><span>{t(`d${i + 1}`)}</span></li>)}
            </ul>
            <h4 className="rd-sub">{t('b3_h')}</h4>
            <ul className="decl decl-c">
              {CONSENTS.map((c) => (
                <li key={c.id}><Icon name={c.icon} size={16} decorative /><span><b>{t(`c_${c.id}_k`)}</b> — {t(`c_${c.id}`)}</span></li>
              ))}
            </ul>
          </section>

          <section id="rd-assent" className="rd-chap" aria-labelledby="rd-assent-h">
            <h3 id="rd-assent-h" className="rd-part"><span>{t('part', 'C')}</span>{t('partC_h')}</h3>
            <p className="rd-lead">{t('c_lead')}</p>
            <p className="rd-lead"><b>{t('c_if')}</b></p>
            <ul className="stickers">
              {ASSENT.map((_, i) => (
                <li key={i} style={{ '--i': i }}>
                  <span className="stk" aria-hidden="true"><Icon name={ASSENT_ICONS[i]} size={22} decorative /></span>
                  <span>{t(`a${i + 1}`)}</span>
                </li>
              ))}
            </ul>
            <p className="rd-lead">{t('c_decide')}</p>
          </section>

          <section id="rd-study" className="rd-chap" aria-labelledby="rd-study-h">
            <h3 id="rd-study-h" className="rd-part"><span>{t('part', 'D')}</span>{t('partD_h')}</h3>
            <p className="rd-lead">{t('partD_p')}</p>
            <StudyCard cfg={cfg} />
          </section>

          <section className="rd-chap" aria-label={t('contact_email')}>
            <Contact cfg={cfg} t={t} />
            <p className="rd-foot">{cfg.operator} · {cfg.address} · <span className="mono">{t('version', cfg.termsVersion)}</span></p>
          </section>
        </div>
      </div>
    </div>
  );
}
