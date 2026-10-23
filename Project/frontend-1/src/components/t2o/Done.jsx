"use client";
import React from "react";
import Icon from "./Icon";

/**
 * Completion screen, using the preview's own `donewrap` / `card done`
 * anatomy: glow and rays behind a badge, eyebrow, headline, the survey's
 * thank-you copy, a stat row, then the actions.
 *
 * `cel` is the celebratory variant — it drives the entry animation, so it
 * is applied on mount rather than being on from the first paint.
 */
export default function Done({
  survey,
  points = 100,
  answers = 0,
  onDashboard,
  onEdit,
}) {
  const [celebrate, setCelebrate] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setCelebrate(true), 60);
    const h = document.getElementById("dh");
    if (h) h.focus({ preventScroll: true });
    return () => clearTimeout(t);
  }, []);

  return (
    <main id="app" tabIndex={-1}>
      <div className="donewrap">
        <section
          className={`card done v-soft${celebrate ? " cel" : ""}`}
          id="done"
        >
          <span className="glow" aria-hidden="true" />
          <span className="rays" aria-hidden="true" />

          {/* The preview fills `.badge` with the tower art earned for the
              profile. Until that artwork is wired up, a sized emoji keeps
              the same visual weight at the centre of the rays. */}
          <div className="badge">
            <span
              className="rv-e"
              aria-hidden="true"
              style={{ fontSize: "64px", lineHeight: 1 }}
            >
              🎉
            </span>
          </div>

          <p className="eyebrow">
            <span className="dot" />
            {survey?.name || "Profile"}
          </p>

          <h1 tabIndex={-1} id="dh">
            All done — thank you
          </h1>

          {survey?.thankyou ? (
            <div
              className="mu"
              dangerouslySetInnerHTML={{ __html: survey.thankyou }}
            />
          ) : (
            <p className="mu">Your answers are saved.</p>
          )}

          <div className="stats">
            {answers > 0 && (
              <span>
                <b>{answers}</b>
                answers
              </span>
            )}
            <span>
              <b>100%</b>
              complete
            </span>
            <span>
              <b>+{points}</b>
              points
            </span>
          </div>

          <div className="acts">
            <button
              className="btn pr big"
              type="button"
              onClick={onDashboard}
            >
              <span>Go to dashboard</span>
              <Icon n="arrow-r" flip />
            </button>
            {onEdit && (
              <button className="btn gh" type="button" onClick={onEdit}>
                <Icon n="edit" />
                <span>Edit responses</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
