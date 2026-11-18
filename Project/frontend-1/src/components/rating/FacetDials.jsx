// The four facet scores — each in its own colour and its own moving metaphor, so the block never
// reads as four identical rows of dots:
//   worth    a clock dial whose hand sweeps round           (blue)
//   rewards  coins dropping onto a stack                    (gold)
//   support  chat bubbles popping in                        (mint)
//   device   a phone battery charging cell by cell          (violet)
//
// Input mode: five numbered pills under each meter (a radiogroup per facet; tap again to clear).
// Read-only mode (`readOnly`, `values` may be decimals): the meter alone, with the average.
import { FACETS, FACET_WORDS } from '../../data/reviewFacets.js';
import { levelOf } from '../../data/reviewFacets.js';
import Icon from '../Icon.jsx';

function Meter({ type, v }) {
  const n = Math.round(v);
  if (type === 'clock') {
    const deg = (v / 5) * 360;
    return (
      <span className="fm fm-clock" style={{ '--deg': `${deg}deg` }} aria-hidden="true">
        <span className="fmc-face" />
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={`fmc-tick ${i < n ? 'is-on' : ''}`} style={{ '--i': i }} />
        ))}
        <span className="fmc-hand" />
        <span className="fmc-pin" />
      </span>
    );
  }
  if (type === 'coins') {
    return (
      <span className="fm fm-coins" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i < n ? 'is-on' : ''} style={{ '--i': i }} />
        ))}
        <span className="fmk-base" />
      </span>
    );
  }
  if (type === 'bubbles') {
    return (
      <span className="fm fm-bubbles" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i < n ? 'is-on' : ''} style={{ '--i': i }} />
        ))}
      </span>
    );
  }
  return (
    <span className="fm fm-battery" aria-hidden="true">
      <span className="fmb-body">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i < n ? 'is-on' : ''} style={{ '--i': i }} />
        ))}
      </span>
      <span className="fmb-cap" />
      {n === 5 && (
        <span className="fmb-bolt">
          <Icon name="bolt" size={14} />
        </span>
      )}
    </span>
  );
}

export default function FacetDials({ values, onChange, readOnly = false, idPrefix = 'fd' }) {
  return (
    <ul className={`fdials ${readOnly ? 'is-read' : ''}`}>
      {FACETS.map((f, k) => {
        const v = values[f.key] || 0;
        const n = Math.round(v);
        return (
          <li key={f.key} className={`fdial fd-${f.meter} ${v ? 'has-v' : ''}`} style={{ '--f1': f.c1, '--f2': f.c2, '--k': k }}>
            <span className="fd-glow" aria-hidden="true" />
            <div className="fd-top">
              <Meter type={f.meter} v={v} />
              <div className="fd-copy">
                <strong id={`${idPrefix}-${f.key}`}>
                  <Icon name={f.icon} size={14} /> {f.label}
                </strong>
                <small>{f.hint}</small>
              </div>
              <span className="fd-val" aria-hidden={!readOnly}>
                {readOnly ? (v ? levelOf(v).gem : '—') : n ? FACET_WORDS[n] : 'Skip'}
              </span>
            </div>
            {!readOnly && (
              <div className="fd-pills" role="radiogroup" aria-labelledby={`${idPrefix}-${f.key}`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={n === s}
                    aria-label={`${levelOf(s).gem} gem, ${FACET_WORDS[s]}`}
                    className={`${s <= n ? 'is-lit' : ''} ${s === n ? 'is-on' : ''}`}
                    style={{ '--s': s }}
                    onClick={() => onChange(f.key, n === s ? 0 : s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
