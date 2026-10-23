"use client";
import React from "react";
import Icon from "../Icon";
import ProfileCard from "./ProfileCard";
import OpinionCity from "./OpinionCity";

/**
 * The profile hub: hero with KPIs, audience toggle and search, the
 * Opinion City board, then the profiles grouped into sections.
 *
 * `profiles` is the app's own list — see the shape in ProfileCard. This
 * component owns only presentation and filtering; opening a profile is
 * delegated through `onOpen` so routing stays with the page.
 */
export default function ProfileHub({
  profiles = [],
  groups = DEFAULT_GROUPS,
  userName,
  points = 0,
  languages = 135,
  onOpen,
}) {
  const [audience, setAudience] = React.useState("b2c");
  const [query, setQuery] = React.useState("");

  const forAudience = profiles.filter((p) => (p.audience || "b2c") === audience);
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? forAudience.filter((p) =>
        `${p.name} ${p.worldLabel} ${(p.tags || []).join(" ")}`
          .toLowerCase()
          .includes(needle),
      )
    : forAudience;

  const done = forAudience.filter((p) => p.status === "done");
  const inProgress = forAudience.filter((p) => p.status === "prog");
  const totalQuestions = forAudience.reduce((n, p) => n + (p.questions || 0), 0);

  const counts = {
    b2c: profiles.filter((p) => (p.audience || "b2c") === "b2c").length,
    minor: profiles.filter((p) => p.audience === "minor").length,
  };

  const resume = inProgress[0];
  const next = forAudience.find((p) => p.status !== "done");

  const grouped = groups
    .map((g) => ({
      ...g,
      items: visible.filter((p) => p.group === g.key),
    }))
    .filter((g) => g.items.length > 0);

  const ungrouped = visible.filter((p) => !groups.some((g) => g.key === p.group));

  return (
    <main id="app" tabIndex={-1}>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" />
            Respondent profile
          </p>
          <h1 className="h1">
            {userName ? `Welcome back, ${userName} — ` : ""}Build the profile
            that brings you <em className="grad">better surveys</em>
          </h1>
          <p className="lead">
            Each profile takes a few minutes. The more you complete, the better
            we can match you with studies that fit your life and work.
          </p>

          <div className="kpis">
            <Kpi cls="k1" emoji="🏆" value={`${done.length}/${forAudience.length}`} label="profiles complete" />
            <Kpi cls="k2" emoji="⏳" value={inProgress.length} label="in progress" />
            <Kpi cls="k3" emoji="💬" value={totalQuestions} label="questions to explore" />
            <Kpi cls="k4" emoji="🌐" value={languages} label="languages" />
          </div>

          <div className="hero-meter">
            <span className="hm-bar">
              <i
                style={{
                  "--w": `${forAudience.length ? Math.round((done.length / forAudience.length) * 100) : 0}%`,
                }}
              />
            </span>
            <b>
              {forAudience.length
                ? Math.round((done.length / forAudience.length) * 100)
                : 0}
              %
            </b>
          </div>

          {resume && (
            <button
              className="resume"
              type="button"
              onClick={() => onOpen?.(resume)}
            >
              <span className="rs-e" aria-hidden="true">
                {(resume.emojis || ["📋"])[0]}
              </span>
              <span className="rt">
                <b>Continue {resume.name}</b>
                <small>{resume.percent}% done · pick up where you left off</small>
              </span>
              <Icon n="arrow-r" flip />
            </button>
          )}
        </div>

        <div className="hero-vis">
          <div className="globe" aria-hidden="true" />
        </div>
      </section>

      <div className="ctrl">
        <div className="seg" role="tablist" aria-label="Profile audience">
          <button
            type="button"
            role="tab"
            aria-selected={audience === "b2c"}
            className={audience === "b2c" ? "on" : ""}
            data-c="b2c"
            onClick={() => setAudience("b2c")}
          >
            <span aria-hidden="true">🧑</span>Adults
            <span className="n">{counts.b2c}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === "minor"}
            className={audience === "minor" ? "on" : ""}
            data-c="minor"
            onClick={() => setAudience("minor")}
          >
            <span aria-hidden="true">🧒</span>Under 18
            <span className="n">{counts.minor}</span>
          </button>
        </div>

        <label className="srch">
          <span className="sr">Search profiles</span>
          <Icon n="search" />
          <input
            id="srch"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search profiles, e.g. gaming, travel…"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
      </div>

      <OpinionCity
        points={points}
        built={done.length}
        total={forAudience.length}
        nextProfile={next}
        onBuild={() => next && onOpen?.(next)}
      />

      {inProgress.length > 0 && !needle && (
        <section className="hsec sec-prog" aria-labelledby="h-prog">
          <h2 className="hsec-h" id="h-prog">
            <span className="hsec-e" aria-hidden="true">⏳</span>
            Pick up where you left off
            <small>
              {inProgress.length} {inProgress.length === 1 ? "profile" : "profiles"}
            </small>
          </h2>
          <div className="pgrid v-wide">
            {inProgress.map((p, i) => (
              <ProfileCard key={p.slug} profile={p} index={i} variant="wide" onOpen={onOpen} />
            ))}
          </div>
        </section>
      )}

      <div id="groups">
        {grouped.map((g) => (
          <section
            key={g.key}
            className={`grp g-${g.variant}`}
            style={{ "--gt": g.tint }}
            aria-label={g.label}
          >
            <h2 className="grp-h">
              <span className="grp-e" aria-hidden="true">{g.emoji}</span>
              {g.label}
              <small>
                {g.items.filter((p) => p.status !== "done").length} to complete
              </small>
            </h2>
            <div className={`pgrid v-${g.variant}`}>
              {g.items.map((p, i) => (
                <ProfileCard
                  key={p.slug}
                  profile={p}
                  index={i}
                  variant={g.variant}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </section>
        ))}

        {ungrouped.length > 0 && (
          <section className="grp g-bento" aria-label="More profiles">
            <h2 className="grp-h">
              <span className="grp-e" aria-hidden="true">✨</span>
              More profiles
              <small>{ungrouped.length} to explore</small>
            </h2>
            <div className="pgrid v-bento">
              {ungrouped.map((p, i) => (
                <ProfileCard key={p.slug} profile={p} index={i} onOpen={onOpen} />
              ))}
            </div>
          </section>
        )}
      </div>

      {visible.length === 0 && (
        <p className="empty" id="empty">
          No profiles match. Try another search or filter.
        </p>
      )}
    </main>
  );
}

function Kpi({ cls, emoji, value, label }) {
  return (
    <div className={`kpi ${cls}`}>
      <span className="kpi-e" aria-hidden="true">{emoji}</span>
      <div>
        <b>{value}</b>
        <small>{label}</small>
      </div>
    </div>
  );
}

/**
 * Section definitions. `variant` is the card look the group's grid uses;
 * the stylesheet ships bento, wide, pro, glass, ticket, polaroid, sticker,
 * menu, luxe, neon, sport, clinical, paper, pass, tag, line and dash.
 */
export const DEFAULT_GROUPS = [
  { key: "about-you",   label: "About you",        emoji: "🙋", variant: "bento",    tint: "#4f46e5" },
  { key: "household",   label: "Home and family",  emoji: "🏠", variant: "paper",    tint: "#0ea5e9" },
  { key: "work",        label: "Work and study",   emoji: "💼", variant: "pro",      tint: "#0f766e" },
  { key: "money",       label: "Money",            emoji: "💳", variant: "pass",     tint: "#7c3aed" },
  { key: "shopping",    label: "Shopping",         emoji: "🛒", variant: "ticket",   tint: "#db2777" },
  { key: "tech",        label: "Tech and gaming",  emoji: "💻", variant: "neon",     tint: "#2563eb" },
  { key: "health",      label: "Health",           emoji: "🩺", variant: "clinical", tint: "#059669" },
  { key: "lifestyle",   label: "Food and travel",  emoji: "✈️", variant: "polaroid", tint: "#ea580c" },
];
