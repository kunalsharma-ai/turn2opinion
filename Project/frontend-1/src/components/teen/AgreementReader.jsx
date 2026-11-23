// The Teen participation agreement MINOR-2026.10, Part A, as six colour-graded chapters
// (src/data/teen/agreement.js, the attached consent form, wording unchanged).
// Each section shows its plain-language summary; "Read the full section" opens the binding text.
// Used by the guardian consent form and the /teen/agreement/ page (the Teen notice).
import { useState } from 'react';
import { CHAPTERS, COMPANY, EFFECTIVE, INFO, INFO_RULE, SECTION_EMOJI, SECTIONS, TERMS_VERSION } from '../../data/teen/agreement.js';
import Icon from '../Icon.jsx';

function Body({ items }) {
  return (
    <ol className="agr-clauses">
      {items.map((b, i) =>
        typeof b === 'string' ? (
          <li key={i}>{b}</li>
        ) : b.ul ? (
          <li key={i} className="agr-ul">
            <ul>
              {b.ul.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </li>
        ) : b.contact ? (
          <li key={i} className="agr-contact">
            <b>{COMPANY.legalName}</b>
            <span>Email: {COMPANY.supportEmail}</span>
            <span>Address: {COMPANY.address}</span>
            <span>Phone: {COMPANY.phone}</span>
          </li>
        ) : null
      )}
    </ol>
  );
}

export default function AgreementReader({ audience = 'guardian' }) {
  const [openCh, setOpenCh] = useState(CHAPTERS[0].id);
  const [full, setFull] = useState({});
  const [seen, setSeen] = useState({ [CHAPTERS[0].id]: true });
  const count = Object.keys(seen).length;
  return (
    <div className={`agr agr--${audience}`}>
      <div className="agr-info">
        <p className="agr-meta">
          <span>Version {TERMS_VERSION}</span> <span>Effective {EFFECTIVE}</span> <span>Ages 13–17</span>
        </p>
        {INFO.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
        <p className="agr-rule">
          <Icon name="shield" size={16} /> {INFO_RULE}
        </p>
      </div>
      <p className="agr-progress" aria-live="polite">
        <span style={{ '--p': count / CHAPTERS.length }} /> {count} of {CHAPTERS.length} chapters opened
      </p>
      <div className="agr-chapters">
        {CHAPTERS.map((c, ci) => {
          const on = openCh === c.id;
          return (
            <section key={c.id} className={`agr-ch ${on ? 'is-open' : ''} ${seen[c.id] ? 'is-seen' : ''}`} style={{ '--c1': c.grade[0], '--c2': c.grade[1], '--i': ci }}>
              <button
                type="button"
                className="agr-ch-tab"
                aria-expanded={on}
                onClick={() => {
                  setOpenCh(on ? '' : c.id);
                  setSeen((s) => ({ ...s, [c.id]: true }));
                }}
              >
                <span className="agr-ch-e" aria-hidden="true">
                  {c.emoji}
                </span>
                <span className="agr-ch-t">
                  <b>
                    {ci + 1}. {c.title}
                  </b>
                  <small>{c.tag}</small>
                </span>
                <span className="agr-ch-n">
                  §{c.sections[0]}–{c.sections[c.sections.length - 1]}
                </span>
                <Icon name="chevron" size={18} className="agr-ch-chev" />
              </button>
              {on && (
                <div className="agr-ch-body">
                  {c.sections.map((n) => {
                    const s = SECTIONS[n];
                    return (
                      <article key={n} className="agr-sec">
                        <h4>
                          <span aria-hidden="true">{SECTION_EMOJI[n]}</span> {n}. {s.title}
                        </h4>
                        <p className="agr-short">
                          <b>In short:</b> {s.short}
                        </p>
                        <button type="button" className="link-soft" aria-expanded={!!full[n]} onClick={() => setFull((f) => ({ ...f, [n]: !f[n] }))}>
                          {full[n] ? 'Hide the full text' : 'Read the full section'}
                        </button>
                        {full[n] && <Body items={s.body} />}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className="agr-binding">The full legal text is in English, which is the binding version. Translations are for convenience.</p>
    </div>
  );
}
