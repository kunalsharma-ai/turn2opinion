"use client";
import React from "react";
import Icon from "./Icon";

/**
 * The sticky left column: illustration, profile title, completion ring
 * and the question map.
 *
 * `steps` is [{ name, title, answered, current, reachable }].
 * Answered steps are clickable so a respondent can go back and fix one.
 */
export default function Panel({
  world = "identity",
  category = "Global identity",
  title = "Basic",
  tagline = "",
  answered = 0,
  total = 0,
  steps = [],
  minutesLeft = 1,
  onJump,
  onBack,
}) {
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <aside className="panel" aria-label="Your progress">
      <button className="back" id="hb" type="button" onClick={onBack}>
        <Icon n="arrow-l" flip />
        All profiles
      </button>

      <div className="stage" id="stage">
        <span className="st-pat" aria-hidden="true" />
        <svg className="deco" viewBox="0 0 320 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="160" cy="105" r="88" className="d1" />
          <ellipse cx="160" cy="105" rx="38" ry="88" className="d1" />
          <ellipse cx="160" cy="105" rx="88" ry="32" className="d1" />
          <ellipse cx="160" cy="105" rx="146" ry="44" className="d2 dash run" transform="rotate(-12 160 105)" />
          <circle cx="30" cy="128" r="5" className="f3" />
          <circle cx="292" cy="76" r="4" className="f3" />
        </svg>
        <span className="st-orbit" aria-hidden="true" />
        <img
          className="st-img"
          width="320"
          height="240"
          alt={category}
          decoding="async"
          src={`/t2o/assets/img/${world}.svg`}
          onError={(e) => {
            e.currentTarget.src = "/t2o/assets/img/identity.svg";
          }}
        />
        <span className="st-spark s1" aria-hidden="true" />
        <span className="st-spark s2" aria-hidden="true" />
        <span className="st-spark s3" aria-hidden="true" />
      </div>

      <div className="info">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            {category}
          </p>
          <h1 className="ptitle">{title}</h1>
        </div>
        {tagline && <p className="ptag">{tagline}</p>}

        <div className="meter">
          <div
            className="ring"
            id="ring"
            role="progressbar"
            aria-label="Profile completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="rgr" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--a2)" />
                  <stop offset="1" stopColor="var(--a)" />
                </linearGradient>
              </defs>
              <circle className="tr" cx="60" cy="60" r={R} />
              <circle
                className="fg"
                cx="60"
                cy="60"
                r={R}
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct / 100)}
              />
            </svg>
            <b id="ringv">{pct}%</b>
          </div>
          <div className="mtx" id="mtx">
            <b>
              {answered} of {total} answered
            </b>
            <br />
            {total - answered} to go · about {Math.max(1, minutesLeft)} min
          </div>
        </div>
      </div>

      <details className="smap" id="smap" open>
        <summary>
          <Icon n="chev" />
          Question map
        </summary>
        <div className="steps" id="steps">
          {steps.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={`st${s.current ? " cu" : s.answered ? " dn" : ""}`}
              data-j={i}
              disabled={!s.answered && !s.current}
              title={s.title}
              aria-label={`Question ${i + 1}${s.current ? ", Current" : s.answered ? ", Answered" : ""}`}
              onClick={() => onJump?.(i)}
            >
              {/* `.st.dn` draws its own tick in CSS, so an answered chip
                  carries no label of its own. */}
              {s.answered && !s.current ? "" : i + 1}
            </button>
          ))}
        </div>
        <div className="legend">
          <span>
            <i className="l1" />
            Answered
          </span>
          <span>
            <i className="l2" />
            Current
          </span>
          <span>
            <i />
            Up next
          </span>
        </div>
      </details>
    </aside>
  );
}
