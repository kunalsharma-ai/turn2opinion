// "Four things members score on their own" (Reviews, Round 12 redesign).
// Four glass towers, one per facet. Each fills to its average score in the colour of the gem at that
// level, with the gem scale (Pebble to Diamond) marked up the side. A facet with no scores yet shows
// an honest "waiting for scores" state instead of a made-up number.
import Icon from '../Icon.jsx';
import Gem from './Gem.jsx';
import { FACETS, FACET_WORDS, LEVELS, levelOf } from '../../data/reviewFacets.js';
import { useInView } from '../../hooks/useMounted.js';

export default function FacetTowers({ values = {} }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div className={`ftw ${inView ? 'is-in' : ''}`} ref={ref}>
      <ol className="ftw-scale" aria-hidden="true">
        {LEVELS.slice()
          .reverse()
          .map((l) => (
            <li key={l.v} style={{ '--g1': l.c1, '--g2': l.c2 }}>
              <b>{l.v}</b> {l.gem}
            </li>
          ))}
      </ol>
      <ul className="ftw-row">
        {FACETS.map((f, i) => {
          const v = Number(values[f.key]) || 0;
          const lv = v ? levelOf(v) : null;
          const pct = v ? Math.max(8, Math.min(100, (v / 5) * 100)) : 0;
          return (
            <li
              key={f.key}
              className={`ftw-t ${v ? 'has' : 'empty'}`}
              style={{ '--c1': f.c1, '--c2': f.c2, '--fill': `${pct}%`, '--i': i, '--g1': lv?.c1 || f.c2, '--g2': lv?.c2 || f.c1 }}
            >
              <div className="ftw-glass">
                <span className="ftw-ticks" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="ftw-liquid" aria-hidden="true">
                  <i className="ftw-wave" />
                  <i className="ftw-bub b1" />
                  <i className="ftw-bub b2" />
                  <i className="ftw-bub b3" />
                </span>
                <span className="ftw-cap">
                  {v ? <Gem level={lv.v} size={40} motion="float" title={`${lv.gem}, ${lv.word}`} /> : <Icon name={f.icon} size={22} />}
                </span>
                <span className="ftw-score">
                  {v ? (
                    <>
                      <strong>{v.toFixed(1)}</strong>
                      <small>{FACET_WORDS[Math.round(v)]}</small>
                    </>
                  ) : (
                    <>
                      <strong aria-hidden="true">·&nbsp;·&nbsp;·</strong>
                      <small>Waiting for scores</small>
                    </>
                  )}
                </span>
              </div>
              <h3>{f.label}</h3>
              <p>{f.hint}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
