import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon.jsx";
import ProfileCard from "./ProfileCard.jsx";
import GreetingGlobe from "./GreetingGlobe.jsx";
import { PROFILES } from "../lib/data.js";
import { GROUPS } from "../lib/themes.js";
import { statusOf, loadDone, LS } from "../lib/storage.js";
import { norm, pname, pnameT, qcount, themeOf } from "../lib/present.js";
import { profileEmoji } from "../lib/emoji.js";
import { LANGS } from "../i18n/languages.js";
import { t, tr, nf, useI18n } from "../i18n/index.js";

/* Mounts a section's cards only when it comes within ~900px of the viewport (and keeps it mounted for the
   session). The hub has 37+ rich cards; rendering them all at once was the main cost on phones. Unlike
   CSS content-visibility this never paints a blank area when coming back from a profile. */
const SEEN = new Set();
function Near({ id, n, force, children }) {
  const ref = useRef(null),
    [on, setOn] = useState(
      () =>
        force || SEEN.has(id) || typeof IntersectionObserver === "undefined",
    );
  useEffect(() => {
    if (on) {
      SEEN.add(id);
      return;
    }
    if (force) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          startTransition(() => setOn(true));
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [on, force, id]);
  if (on) return children;
  const cols = Math.max(1, Math.floor((Math.min(innerWidth, 1280) - 60) / 300));
  return (
    <div
      ref={ref}
      className="near-ph"
      style={{
        minHeight: Math.ceil(n / cols) * (innerWidth < 640 ? 250 : 300),
      }}
      aria-hidden="true"
    />
  );
}

export const CAT = { b2c: "aud_adults", minor: "aud_minor" };

/* Each group of profiles gets its own emoji, colour band and card layout, so the hub never looks like one
   template repeated: bento grid, executive "pro" row, polaroids, price tags, menu cards, neon arcade,
   pulse cards, boarding passes and stickers. */
export const GROUP_META = {
  "About you": { e: "🙋", v: "bento", tint: "#4f46e5" },
  "Work & money": { e: "💼", v: "pro", tint: "#0f2a5f" },
  "Home & family": { e: "🏡", v: "polaroid", tint: "#e76f51" },
  "Shopping & style": { e: "🛍️", v: "tag", tint: "#d61f69" },
  "Food & drink": { e: "🍽️", v: "menu", tint: "#e4572e" },
  "Tech, media & play": { e: "🎮", v: "neon", tint: "#7c3aed" },
  "Health & fitness": { e: "💪", v: "pulse", tint: "#0f9b8e" },
  "Travel & mobility": { e: "✈️", v: "ticket", tint: "#0a8fd0" },
  "Research & rewards": { e: "🎁", v: "sticker", tint: "#f59e0b" },
  "More profiles": { e: "✨", v: "bento", tint: "#64748b" },
};
const ORBIT = [
  "🎮",
  "✈️",
  "🛍️",
  "🍕",
  "💼",
  "🩺",
  "🎓",
  "🐾",
  "💎",
  "⚽",
  "📱",
  "🏡",
];

export default function Hub({ cat, setCat, onOpen, onPickLang }) {
  useI18n();
  const [q, setQ] = useState("");
  /* Staged mount keeps every main-thread task short (low Total Blocking Time):
     stage 0 = hero copy (same as the static first paint), 1 = globe + controls + first section, 2 = everything. */
  const [stage, setStage] = useState(() => {
    if (!Hub.mounted) document.documentElement.classList.add("intro");
    return Hub.mounted ? 2 : 0;
  });
  useEffect(() => {
    if (stage >= 2) {
      if (!Hub.mounted)
        setTimeout(
          () => document.documentElement.classList.remove("intro"),
          1400,
        );
      Hub.mounted = true;
      return;
    }
    let id = requestAnimationFrame(() => {
      id = setTimeout(() => startTransition(() => setStage((x) => x + 1)), 0);
    });
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(id);
    };
  }, [stage]);
  const full = stage >= 2;

  const ps = useMemo(
    () => PROFILES.map((p, i) => [p, i]).filter(([p]) => p.c === cat),
    [cat],
  );
  console.log(ps);
  const stMap = useMemo(() => new Map(ps.map(([p]) => [p, statusOf(p)])), [ps]);
  const st = ps.map(([p]) => stMap.get(p));
  const done = st.filter((s) => s.st === "done").length,
    prog = st.filter((s) => s.st === "prog").length;
  const pct = ps.length ? Math.round((done / ps.length) * 100) : 0;
  const basic = PROFILES.find((p) => p.c === cat && p.s === "basic"),
    bs = basic && loadDone(basic);
  const first =
    bs && bs.a && bs.a.firstname
      ? String(bs.a.firstname).trim().split(" ")[0]
      : "";
  let rec = null;
  ps.forEach(([p, i], k) => {
    const s = st[k];
    if (s.st === "prog" && (!rec || (s.t || 0) > (rec.s.t || 0)))
      rec = { p, i, s };
  });

  const nq = norm(q).trim();
  const match = (p) => {
    const w = themeOf(p);
    return (
      !nq ||
      norm([pname(p), pnameT(p), w.name, tr(w.name)].join(" ")).includes(nq)
    );
  };
  const isAdd = (p) => p.s === "additional";
  const inProg = ps.filter(
    ([p]) => stMap.get(p).st === "prog" && !isAdd(p) && match(p),
  );
  const completed = ps.filter(([p]) => stMap.get(p).st === "done" && match(p));
  const addP = ps.find(([p]) => isAdd(p));
  const groups = useMemo(() => {
    const seen = new Set();
    const g = GROUPS.filter(([name]) => name !== "Additional details").map(
      ([name, slugs]) => {
        const items = ps.filter(([p]) => slugs.includes(p.s));
        items.forEach(([p]) => seen.add(p.s));
        return [name, items];
      },
    );
    const rest = ps.filter(([p]) => !seen.has(p.s) && !isAdd(p));
    if (rest.length) g.push(["More profiles", rest]);
    return g;
  }, [cat]); // eslint-disable-line react-hooks/exhaustive-deps
  const todo = groups
    .map(([name, items]) => [
      name,
      items.filter(([p]) => stMap.get(p).st === "new" && match(p)),
    ])
    .filter((g) => g[1].length);
  let k = 0;
  const shown = full || nq ? todo : todo.slice(0, 1);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" />
            {first ? t("welcome_back", { name: first }) : t("eyebrow")}
          </p>
          <h1 className="h1">
            {t("h1_a")} <em className="grad">{t("h1_b")}</em>
          </h1>
          <p className="lead">{t("lead")}</p>
          <div className="kpis">
            <div className="kpi k1">
              <span className="kpi-e" aria-hidden="true">
                🏆
              </span>
              <div>
                <b>
                  {nf(done)}/{nf(ps.length)}
                </b>
                <small>{t("kpi_done")}</small>
              </div>
            </div>
            <div className="kpi k2">
              <span className="kpi-e" aria-hidden="true">
                ⏳
              </span>
              <div>
                <b>{nf(prog)}</b>
                <small>{t("kpi_prog")}</small>
              </div>
            </div>
            <div className="kpi k3">
              <span className="kpi-e" aria-hidden="true">
                💬
              </span>
              <div>
                <b>{nf(ps.reduce((s, [p]) => s + qcount(p), 0))}</b>
                <small>{t("kpi_q")}</small>
              </div>
            </div>
            <div className="kpi k4">
              <span className="kpi-e" aria-hidden="true">
                🌐
              </span>
              <div>
                <b>{nf(LANGS.length)}</b>
                <small>{t("kpi_lang")}</small>
              </div>
            </div>
          </div>
          <div
            className="hero-meter"
            role="img"
            aria-label={t("kpi_done") + ": " + nf(pct) + "%"}
          >
            <span className="hm-bar">
              <i style={{ "--w": pct + "%" }} />
            </span>
            <b>{nf(pct)}%</b>
          </div>
          {rec && (
            <button
              className="resume"
              type="button"
              style={{ "--pa": themeOf(rec.p).a, "--pb": themeOf(rec.p).a2 }}
              onClick={() => onOpen(rec.i)}
            >
              <span className="rs-e" aria-hidden="true">
                {profileEmoji(rec.p.s)[0]}
              </span>
              <span className="rt">
                <b>{t("resume", { name: pnameT(rec.p) })}</b>
                <small>{t("resume_sub", { pct: rec.s.pct })}</small>
              </span>
              <Icon n="arrow-r" className="flip" />
            </button>
          )}
        </div>
        <div className="hero-vis">
          {stage >= 1 && (
            <div className="orbit-e" aria-hidden="true">
              {ORBIT.map((e, i) => (
                <span key={i} style={{ "--i": i, "--n": ORBIT.length }}>
                  {e}
                </span>
              ))}
            </div>
          )}
          {stage >= 1 ? (
            <GreetingGlobe onPick={onPickLang} />
          ) : (
            <div className="globe" aria-hidden="true" />
          )}
        </div>
      </section>

      {stage >= 1 && (
        <>
          <div className="ctrl">
            <div className="seg" role="tablist" aria-label={t("aud_label")}>
              {Object.keys(CAT).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={c === cat}
                  className={c === cat ? "on" : ""}
                  data-c={c}
                  onClick={() => {
                    setCat(c);
                    LS.set("ui:cat", c);
                  }}
                >
                  <span aria-hidden="true">{c === "b2c" ? "🧑" : "🧒"}</span>
                  {t(CAT[c])}
                  <span className="n">
                    {nf(PROFILES.filter((p) => p.c === c).length)}
                  </span>
                </button>
              ))}
            </div>
            <label className="srch">
              <span className="sr">{t("search_label")}</span>
              <Icon n="search" />
              <input
                id="srch"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search_ph")}
                autoComplete="off"
                enterKeyHint="search"
              />
            </label>
          </div>

          {inProg.length > 0 && (
            <section className="hsec sec-prog" aria-labelledby="h-prog">
              <h2 className="hsec-h" id="h-prog">
                <span className="hsec-e" aria-hidden="true">
                  ⏳
                </span>
                {t("sec_prog")}
                <small>
                  {inProg.length === 1
                    ? t("one_profile")
                    : t("n_profiles", { n: inProg.length })}
                </small>
              </h2>
              <div className="pgrid v-wide">
                {inProg.map(([p, i]) => (
                  <ProfileCard
                    key={i}
                    p={p}
                    i={i}
                    k={k++}
                    st={stMap.get(p)}
                    v="wide"
                    onOpen={onOpen}
                  />
                ))}
              </div>
            </section>
          )}

          <div id="groups">
            {shown.map(([name, items]) => {
              const m = GROUP_META[name] || GROUP_META["More profiles"];
              return (
                <section
                  className={"grp g-" + m.v}
                  key={name}
                  style={{ "--gt": m.tint }}
                  aria-label={tr(name)}
                >
                  <h2 className="grp-h">
                    <span className="grp-e" aria-hidden="true">
                      {m.e}
                    </span>
                    {tr(name)}
                    <small>{t("n_to_do", { n: items.length })}</small>
                  </h2>
                  <Near id={cat + name} n={items.length} force={!!nq}>
                    <div className={"pgrid v-" + m.v}>
                      {items.map(([p, i]) => (
                        <ProfileCard
                          key={i}
                          p={p}
                          i={i}
                          k={k++}
                          st={stMap.get(p)}
                          v={m.v}
                          onOpen={onOpen}
                        />
                      ))}
                    </div>
                  </Near>
                </section>
              );
            })}
          </div>
          {full && todo.length === 0 && !nq && (
            <div className="alldone" role="status">
              <span aria-hidden="true">🎉</span>
              <b>{t("all_todo_done")}</b>
            </div>
          )}

          {full && completed.length > 0 && (
            <section className="hsec sec-done" aria-labelledby="h-done">
              <h2 className="hsec-h" id="h-done">
                <span className="hsec-e" aria-hidden="true">
                  🏆
                </span>
                {t("sec_done")}
                <small>
                  {completed.length === 1
                    ? t("one_profile")
                    : t("n_profiles", { n: completed.length })}
                </small>
              </h2>
              <p className="hsec-sub">{t("sec_done_sub")}</p>
              <Near id={cat + ":done"} n={completed.length} force={!!nq}>
                <div className="pgrid v-done">
                  {completed.map(([p, i]) => (
                    <ProfileCard
                      key={i}
                      p={p}
                      i={i}
                      k={k++}
                      st={stMap.get(p)}
                      v="done"
                      onOpen={onOpen}
                    />
                  ))}
                </div>
              </Near>
            </section>
          )}
          {full &&
            nq &&
            !inProg.length &&
            !todo.length &&
            !completed.length && (
              <p className="empty" id="empty">
                {t("empty")}
              </p>
            )}

          {full &&
            addP &&
            !nq &&
            (() => {
              const [ap, ai] = addP,
                as = stMap.get(ap),
                atw = themeOf(ap);
              return (
                <section
                  className="grp addb"
                  style={{ "--pa": atw.a, "--pb": atw.a2, "--pc": atw.a3 }}
                  aria-labelledby="addh"
                >
                  <div className="addb-in">
                    <span className="addb-orb" aria-hidden="true">
                      {profileEmoji("additional")[0]}
                    </span>
                    <div className="addb-t">
                      <p className="eyebrow">
                        <span className="dot" />
                        {tr("Additional details")}
                      </p>
                      <h2 id="addh">
                        {as.st === "done"
                          ? t("add_done_title")
                          : t("add_banner_title")}
                      </h2>
                      <p>{t("add_banner_sub")}</p>
                      <button
                        type="button"
                        className="btn pr"
                        onClick={() => onOpen(ai)}
                      >
                        <Icon
                          n={as.st === "done" ? "edit" : "arrow-r"}
                          className={as.st === "done" ? "" : "flip"}
                        />
                        {as.st === "done"
                          ? t("edit_responses")
                          : as.st === "prog"
                            ? t("resume", { name: pnameT(ap) })
                            : t("add_banner_cta")}
                      </button>
                    </div>
                    <div className="addb-card">
                      <ProfileCard
                        p={ap}
                        i={ai}
                        k={k++}
                        st={as}
                        v="add"
                        onOpen={onOpen}
                      />
                    </div>
                  </div>
                </section>
              );
            })()}
        </>
      )}
    </>
  );
}
