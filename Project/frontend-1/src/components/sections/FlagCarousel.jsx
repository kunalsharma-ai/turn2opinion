// Global reach shown with flags only: a wall of flags rippling like one big flag, filterable by region.
// Hovering (or focusing the list below) names the country; a screen-reader list mirrors the rings.
import { useEffect, useMemo, useState } from 'react';
import { REGIONS, ALL_COUNTRIES } from '../../data/profiles.js';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';

const COLS = 11;

export default function FlagCarousel() {
  const [sel, setSel] = useState('all');
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const region = REGIONS.find((r) => r.id === sel);
  const list = useMemo(
    () => (region ? region.countries.map(([code, name]) => ({ code, name, region: region.name })) : ALL_COUNTRIES),
    [region]
  );
  const [pop, setPop] = useState(null);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setPop(list[Math.floor(Math.random() * list.length)]), 1600);
    return () => clearInterval(t);
  }, [inView, list]);
  const shownHover = hover || pop;
  const accent = region ? region.accent : '#FFB020';

  return (
    <div className={`fc ${inView ? 'is-on' : ''}`} ref={ref} style={{ '--accent': accent }}>
      <div className="fc-tabs" role="group" aria-label="Show flags by region">
        {[{ id: 'all', name: 'All regions', accent: '#FFB020', countries: ALL_COUNTRIES }, ...REGIONS].map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={sel === r.id}
            className={sel === r.id ? 'is-on' : ''}
            style={{ '--tab': r.accent }}
            onClick={() => {
              setSel(r.id);
              setHover(null);
            }}
          >
            <span className="fc-tab-dot" aria-hidden="true" />
            {r.name}
            <small>{r.countries.length}</small>
          </button>
        ))}
      </div>

      <div className="fw-wall" aria-hidden="true" onMouseLeave={() => setHover(null)}>
        {ALL_COUNTRIES.map((c, i) => {
          const inSel = !region || c.regionId === region.id;
          return (
            <span
              key={c.code}
              className={`fw-flag ${inSel ? 'is-in' : 'is-out'} ${pop && pop.code === c.code ? 'is-pop' : ''}`}
              style={{ '--d': `${((i % COLS) + Math.floor(i / COLS)) * 0.09}s` }}
              onMouseEnter={() => setHover(c)}
            >
              <span className="fw-cloth">
                <Flag code={c.code} size={40} />
              </span>
              <span className="fw-name">{c.name}</span>
            </span>
          );
        })}
      </div>

      <p className="fc-caption" aria-live="polite">
        {shownHover ? (
          <>
            <Flag code={shownHover.code} size={18} /> <strong>{shownHover.name}</strong> · {shownHover.region || (region && region.name)}
          </>
        ) : (
          <>
            <Icon name="globe" size={18} /> <strong>{region ? region.name : 'Members across five regions'}</strong> · {list.length} countries ·
            hover a flag to see its name
          </>
        )}
      </p>

      <ul className="sr-only">
        {list.map((c) => (
          <li key={c.code}>
            <Flag code={c.code} size={14} /> {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
