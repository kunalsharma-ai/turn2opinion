"use client";
import React from "react";

/**
 * One profile tile on the hub. Markup matches the preview's `.pcard`:
 * an illustrated header (`.pv`) over a body (`.pi`) with name, meta,
 * reward chip and progress bar.
 *
 * `variant` picks the grid's look — bento, wide, done, pro, … — and must
 * match the `v-*` class on the surrounding `.pgrid`, since the stylesheet
 * sizes the card from the pair.
 */
export default function ProfileCard({
  profile,
  index = 0,
  variant = "bento",
  onOpen,
}) {
  const {
    slug,
    name,
    world = "identity",
    worldLabel = "Profile",
    questions = 0,
    minutes = 1,
    status = "new", // new | prog | done
    percent = 0,
    points = 100,
    emojis = ["🪪", "🌍", "👋"],
    palette = {},
  } = profile;

  const statusLabel =
    status === "done" ? "Completed" : status === "prog" ? `${percent}% done` : "Not started";

  return (
    <button
      className={`pcard v-${variant}`}
      type="button"
      data-i={index}
      data-st={status}
      aria-label={`${name} profile, ${questions} questions, ${statusLabel}`}
      onClick={() => onOpen?.(profile)}
      style={{
        "--k": index,
        "--pa": palette.a || "#3a4bff",
        "--pb": palette.b || "#12b5ea",
        "--pc": palette.c || "#ff9d2e",
      }}
    >
      <span className="pv">
        <span className="pv-pat" />
        <span className="pv-sheen" />
        <img
          className="pv-img"
          width="320"
          height="240"
          loading="lazy"
          decoding="async"
          alt=""
          src={`/t2o/assets/img/${world}.svg`}
          onError={(e) => {
            e.currentTarget.src = "/t2o/assets/img/identity.svg";
          }}
        />
        {emojis.slice(0, 3).map((e, i) => (
          <span key={i} className={`pv-e e${i + 1}`} aria-hidden="true">
            {e}
          </span>
        ))}
        <span className="world">{worldLabel}</span>
      </span>

      <span className="pi">
        <b className="pn">{name}</b>
        <span className="meta">
          <span className="mq">
            {questions} questions · ~{minutes} min
          </span>
          <span className={`pill ${status}`}>{statusLabel}</span>
        </span>
        <span className="rwchip" aria-hidden="true">
          🏗️ +{points} pts
        </span>
        <span className="pbar" aria-hidden="true">
          <i style={{ "--w": `${status === "done" ? 100 : percent}%` }} />
        </span>
      </span>
    </button>
  );
}
