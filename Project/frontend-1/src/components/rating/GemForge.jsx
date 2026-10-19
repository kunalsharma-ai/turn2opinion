// "Gem Forge" — the overall rating control (replaces the v3.1 Pulse Core dial, which was removed).
//
// What the visitor sees:
//   * a stage with a lit pedestal; the gem for the chosen level floats above it, turning slowly,
//     with a halo, light rays and rising sparks in that level's colour;
//   * the number and the plain word right next to it ("4 / 5 · Great") so it is never a puzzle;
//   * a rail of five gems underneath — tap one, or drag along the rail, or use the arrow keys.
//
// Accessibility: the rail is a real radiogroup (one tab stop, arrow keys move, Home/End jump);
// each option is announced as "4 out of 5, Great — Sapphire".
import { useCallback, useRef } from 'react';
import { LEVELS, levelOf } from '../../data/reviewFacets.js';
import Gem from './Gem.jsx';

export default function GemForge({ value, onChange, idPrefix = 'gf' }) {
  const L = levelOf(value);
  const rail = useRef(null);
  const dragging = useRef(false);

  const pickFromX = useCallback(
    (clientX) => {
      const el = rail.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(0.999, Math.max(0, (clientX - r.left) / r.width));
      const n = Math.floor(t * 5) + 1;
      if (n !== Math.round(value)) onChange(n);
    },
    [onChange, value]
  );

  const onKey = (e) => {
    const v = Math.round(value);
    let n = v;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') n = Math.min(5, v + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') n = Math.max(1, v - 1);
    else if (e.key === 'Home') n = 1;
    else if (e.key === 'End') n = 5;
    else return;
    e.preventDefault();
    onChange(n);
    const btn = rail.current?.querySelector(`[data-v="${n}"]`);
    btn && btn.focus();
  };

  return (
    <div className={`forge lv-${L.key}`} style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--glow': L.glow, '--p': (L.v - 1) / 4 }}>
      <div className="forge-stage" aria-hidden="true">
        <span className="fg-rays" />
        <span className="fg-halo" />
        <span className="fg-orbit o1">
          <i />
        </span>
        <span className="fg-orbit o2">
          <i />
        </span>
        <span className="fg-sparks">
          {Array.from({ length: 10 }, (_, i) => (
            <i key={i} style={{ '--i': i, '--x': `${(i * 37) % 100}%` }} />
          ))}
        </span>
        <span className="fg-gem" key={L.key}>
          <Gem level={L.v} size={132} motion="spin" />
        </span>
        <span className="fg-pedestal">
          <i className="fg-ped-top" />
          <i className="fg-ped-side" />
          <i className="fg-ped-glow" />
        </span>
      </div>

      <p className="forge-read" aria-live="polite">
        <span className="fr-num">
          <b>{L.v}</b>
          <small>/5</small>
        </span>
        <span className="fr-words">
          <strong>{L.word}</strong>
          <small>
            {L.gem} · {L.note}
          </small>
        </span>
      </p>

      <div
        className="forge-rail"
        ref={rail}
        role="radiogroup"
        aria-label="Your overall rating, 1 to 5"
        id={`${idPrefix}-rail`}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture?.(e.pointerId);
          pickFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && pickFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onKeyDown={onKey}
      >
        <span className="fr-track" aria-hidden="true">
          <i />
        </span>
        {LEVELS.map((lv) => {
          const on = lv.v === L.v;
          const lit = lv.v <= L.v;
          return (
            <button
              key={lv.key}
              type="button"
              role="radio"
              data-v={lv.v}
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              aria-label={`${lv.v} out of 5, ${lv.word} — ${lv.gem}`}
              className={`fr-opt ${on ? 'is-on' : ''} ${lit ? 'is-lit' : ''}`}
              style={{ '--o1': lv.c1, '--o2': lv.c2, '--o3': lv.c3 }}
              onClick={() => onChange(lv.v)}
            >
              <span className="fr-socket">
                <Gem level={lv.v} size={38} motion="still" />
              </span>
              <span className="fr-n">{lv.v}</span>
              <span className="fr-w">{lv.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
