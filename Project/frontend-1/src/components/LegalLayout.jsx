import { useEffect, useState } from 'react';
import { PageHero } from './Common.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { Link } from '../router/Router.jsx';
import Icon from './Icon.jsx';

/**
 * Shared layout for legal pages: hero, sticky table of contents with scroll-spy,
 * and numbered section cards. sections = [{ id, title, icon, body: ReactNode }]
 */
export default function LegalLayout({ crumb, title, kicker, lead, tagline, theme, art, sections, aside }) {
  const ref = useReveal();
  const [active, setActive] = useState(sections[0] && sections[0].id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const jump = (id) => (e) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={ref}>
      <PageHero theme={theme} crumbs={[{ label: crumb }]} kicker={kicker} title={title} tagline={tagline} lead={lead} art={art} />
      <div className="wrap legal">
        <aside className="legal-toc">
          <p className="toc-title">Contents</p>
          <ol>
            {sections.map((s) => (
              <li key={s.id} className={active === s.id ? 'is-on' : ''}>
                <a href={`#${s.id}`} onClick={jump(s.id)}>
                  <Icon name={s.icon} size={14} /> {s.title}
                </a>
              </li>
            ))}
          </ol>
          {aside}
          <div className="legal-help">
            <p>Questions about this page?</p>
            <Link to="/contact/" className="link-arrow">
              Contact us <Icon name="arrow" size={14} />
            </Link>
          </div>
        </aside>
        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-card" data-reveal style={{ '--i': i }}>
              <header>
                <span className="legal-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <h2>{s.title}</h2>
              </header>
              <div className="legal-content">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LegalArt({ icon, words }) {
  return (
    <div className="legal-art" aria-hidden="true">
      <div className="legal-doc">
        <span className="ld-line w1" />
        <span className="ld-line w2" />
        <span className="ld-line w3" />
        <span className="ld-line w4" />
        <span className="ld-stamp">
          <Icon name={icon} size={34} />
        </span>
      </div>
      {words.map((w, i) => (
        <span key={w} className="legal-tag" style={{ '--i': i }}>
          {w}
        </span>
      ))}
    </div>
  );
}
