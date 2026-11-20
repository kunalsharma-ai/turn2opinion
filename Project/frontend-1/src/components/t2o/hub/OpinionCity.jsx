"use client";
import React from "react";
import Icon from "../Icon";

/**
 * The Opinion City board: a skyline where every completed profile lights
 * up a tower, with the points panel and the tier ladder beneath it.
 *
 * The preview generates each tower's geometry procedurally; this does the
 * same, deterministically from the profile slug, so a given profile always
 * gets the same silhouette. Built towers use the lit-window pattern,
 * unbuilt ones render as a dashed plot.
 */
export default function OpinionCity({
  points = 0,
  built = 0,
  total = 0,
  nextProfile,
  profiles = [],
  onBuild,
}) {
  const tier = tierFor(points);
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const cash = `$${(points / 1000).toFixed(2)}`;

  // One slot per profile; fall back to a fixed skyline when none are passed.
  const slots = profiles.length
    ? profiles
    : Array.from({ length: Math.max(total, 12) }, (_, i) => ({
        slug: `plot-${i}`,
        name: `Profile ${i + 1}`,
        status: i < built ? "done" : "new",
      }));

  const half = Math.ceil(slots.length / 2);
  const backRow = slots.slice(0, half);
  const frontRow = slots.slice(half);

  return (
    <section
      className="city"
      id="rewards"
      aria-labelledby="rw-h"
      style={{ "--n": Math.max(frontRow.length, 1) }}
    >
      <CityDefs />

      <div className="sky">
        <span className="sky-stars" aria-hidden="true" />
        <span className="sky-moon" aria-hidden="true" />
        <span className="sky-cloud c1" aria-hidden="true" />
        <span className="sky-cloud c2" aria-hidden="true" />
        <span className="sky-glow" aria-hidden="true" />

        <div className="sky-head">
          <div className="sky-t">
            <p className="city-eyebrow">
              <span className="lv-badge">
                <svg viewBox="0 0 40 24" aria-hidden="true">
                  {TIER_BARS.slice(0, TIERS.indexOf(tier) + 1).map(
                    ([x, y, w, h], i) => (
                      <rect key={i} x={x} y={y} width={w} height={h} rx="1" />
                    ),
                  )}
                </svg>
              </span>
              {tier.name}
            </p>
            <h2 id="rw-h">Your Opinion City</h2>
            <p className="city-sub">
              Every profile you complete builds a new tower and earns 100
              Opinion Points. 1,000 points = $1.00.
            </p>
          </div>

          <div
            className="neon"
            role="img"
            aria-label={`${tier.name}. ${points} Opinion Points, worth ${cash}. ${built} of ${total} towers built.`}
          >
            <span className="neon-l">Opinion Points</span>
            <span className="neon-v">
              <b>{points.toLocaleString()}</b>
              <small>pts</small>
            </span>
            <span className="neon-usd">
              <span>Points value</span>
              <b>{cash}</b>
            </span>
          </div>
        </div>

        <div className="sky-scroll">
          <div className="skyline">
            <ol className="crow cback" aria-hidden="true">
              {backRow.map((p, i) => (
                <li className="tw-li" key={p.slug}>
                  <Tower profile={p} seed={i} back />
                </li>
              ))}
            </ol>
            <span className="haze" aria-hidden="true" />
            <ol className="crow cfront" aria-label="Your Opinion City">
              {frontRow.map((p, i) => (
                <li className="tw-li" key={p.slug}>
                  <Tower profile={p} seed={i + half} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="street" aria-hidden="true">
          <i />
        </div>
      </div>

      <div className="city-foot">
        <div className="lit-row">
          <span className="lit-t">
            <b>
              {built} of {total} towers lit
            </b>
          </span>
          <span className="lit-strip" aria-hidden="true">
            {slots.map((p) => (
              <i
                key={p.slug}
                className={p.status === "done" ? "on" : ""}
                style={{ "--ta": p.palette?.a || "#3a4bff" }}
              />
            ))}
          </span>
        </div>

        <div className="city-chips">
          {nextTier && (
            <span className="cchip">
              <Icon n="target" />
              {(nextTier.at - points).toLocaleString()} pts to {nextTier.name}
            </span>
          )}
          <span className="cchip">
            <Icon n="wallet" />
            {Math.max(0, 1000 - (points % 1000)).toLocaleString()} pts to the
            next $1.00
          </span>
          <span className="cchip soft">
            <Icon n="gift" />
            1,000 pts = $1.00
          </span>
        </div>

        <ol className="lv-track" aria-label="City level">
          {TIERS.map((t, i) => {
            const current = t.name === tier.name;
            return (
              <li
                key={t.name}
                className={current ? "cur" : ""}
                aria-current={current ? "step" : undefined}
              >
                <span className="lv-ic" aria-hidden="true">
                  <svg viewBox="0 0 40 24" aria-hidden="true">
                    {TIER_BARS.slice(0, i + 1).map(([x, y, w, h], k) => (
                      <rect key={k} x={x} y={y} width={w} height={h} rx="1" />
                    ))}
                  </svg>
                </span>
                <b>{t.name}</b>
                <small>{t.at.toLocaleString()} pts</small>
              </li>
            );
          })}
        </ol>

        {nextProfile && (
          <button type="button" className="btn pr city-cta" onClick={onBuild}>
            <span aria-hidden="true">🏗️</span>
            Build your next tower: {nextProfile.name}
            <Icon n="arrow-r" flip />
          </button>
        )}
      </div>
    </section>
  );
}

/** Bar geometry for the tier badge, one more bar per tier. */
const TIER_BARS = [
  [2, 14, 7, 10],
  [10, 6, 7, 18],
  [19, 10, 7, 14],
  [27, 2, 6, 22],
  [33, 12, 7, 12],
];

/** One building. Lit when its profile is complete, a dashed plot when not. */
function Tower({ profile, seed = 0, back = false }) {
  const done = profile.status === "done";
  const r = rng(profile.slug || String(seed));

  const W = 40;
  const H = 90 + Math.round(r() * 60);
  // Three stacked blocks, each narrower than the one below.
  const blocks = [
    { x: 4, w: 32, top: Math.round(H * 0.42) },
    { x: 9, w: 22, top: Math.round(H * 0.2) },
    { x: 14, w: 12, top: 12 },
  ];

  return (
    <button
      type="button"
      className={`tower ${done ? "built" : "plot"}${H > 130 ? " tall" : ""}`}
      data-s={profile.slug}
      aria-label={
        done
          ? `${profile.name}: tower built.`
          : `${profile.name}: empty plot. Complete this profile to build a tower.`
      }
      style={{ aspectRatio: `${W} / ${H}` }}
      tabIndex={back ? -1 : 0}
    >
      <span className="tw-clip">
        <span className="tw-art">
          <svg
            className={`tw ${done ? "tw-built" : "tw-plot"}`}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            {blocks.map((b, i) => {
              const y = b.top;
              const h = (i === 0 ? H : blocks[i - 1].top) - y;
              return done ? (
                <g key={i}>
                  <rect x={b.x} y={y} width={b.w} height={h} fill="var(--ta, #3a4bff)" />
                  <rect x={b.x} y={y} width={b.w} height={h} fill="url(#cw-on)" />
                  <rect x={b.x} y={y} width={b.w} height={h} fill="url(#cw-shade)" />
                </g>
              ) : (
                <rect
                  key={i}
                  x={b.x}
                  y={y}
                  width={b.w}
                  height={h}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeDasharray="3 2.5"
                />
              );
            })}
            <path d={`M2 ${H - 0.6}H${W - 2}`} stroke="currentColor" strokeWidth="1.2" />
            {done && H > 130 && (
              <circle className="tw-beacon" cx={W / 2} cy="6" r="2.4" fill="#ff5a5a" />
            )}
          </svg>
        </span>
      </span>
      {done && <span className="tw-plus">+100</span>}
    </button>
  );
}

/** Window and shading patterns the towers paint with. */
function CityDefs() {
  return (
    <svg className="city-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="cw-on" width="8" height="10" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="2" width="4" height="5" rx=".6" fill="#ffd66b" />
        </pattern>
        <pattern id="cw-off" width="8" height="10" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="2" width="4" height="5" rx=".6" fill="rgba(255,255,255,.13)" />
        </pattern>
        <linearGradient id="cw-shade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".30" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id="cw-top" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const TIERS = [
  { name: "Hamlet", at: 0 },
  { name: "Town", at: 600 },
  { name: "City", at: 1300 },
  { name: "Metropolis", at: 2300 },
  { name: "Megacity", at: 3700 },
];

function tierFor(points) {
  return [...TIERS].reverse().find((t) => points >= t.at) || TIERS[0];
}

/** Small seeded PRNG so a profile's tower never changes between renders. */
function rng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}
