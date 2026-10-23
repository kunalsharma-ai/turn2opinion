"use client";
import React from "react";

/**
 * The rocket-to-flag progress rail above the question card, with the
 * respondent's marker sliding along it and milestones at the quarters.
 */
export default function Journey({ pct = 0, marker = "🪪" }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <div className="journey" aria-hidden="true">
      <span className="jr-start">🚀</span>
      <span className="jr-track">
        <i style={{ "--w": `${w}%` }} />
        <span className="jr-me" style={{ "--x": `${w}%` }}>
          {marker}
        </span>
        <span className="jr-ms" style={{ "--x": "25%" }}>⭐</span>
        <span className="jr-ms" style={{ "--x": "50%" }}>🔥</span>
        <span className="jr-ms" style={{ "--x": "75%" }}>💎</span>
      </span>
      <span className="jr-end">🏁</span>
    </div>
  );
}
