import { useEffect, useRef, useState } from "react";
import { INCOME_Q } from "../lib/income.js";
import { Icon, Flag } from "./Icon.jsx";
import { Tiles, Binary, Rows, Scale, Levels } from "./fields/Choice.jsx";
import { Multi } from "./fields/Multi.jsx";
import ComboBox from "./fields/ComboBox.jsx";
import TextField from "./fields/TextField.jsx";
import { DECO } from "../lib/deco.js";
import { qEmoji, profileEmoji } from "../lib/emoji.js";
import { CFG } from "../lib/config.js";
import { LOCK, filled } from "../lib/engine.js";
import {
  kind,
  qIcon,
  flagFor,
  SENS,
  PRIV,
  themeId,
  pnameT,
  qText,
  ansLabel,
  secName,
} from "../lib/present.js";
import { finePointer, reducedMotion } from "../lib/fx.js";
import { useToast } from "./Toasts.jsx";
import { t, tr, nf, lang, isPending, useI18n } from "../i18n/index.js";

/* ---------- side panel: the world's 3D stage, progress ring, snapshot and question map ---------- */
function Stage({ tw, id, slug }) {
  const img = (CFG.images || {})[id] || (CFG.images || {})[tw.base];
  const [e1, e2, e3] = profileEmoji(slug);
  return (
    <div className={"stage" + (tw.dark ? " dk" : "")} id="stage">
      <span className="st-pat" aria-hidden="true" />
      <svg
        className="deco"
        viewBox="0 0 320 210"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: DECO[id] || DECO[tw.base] || "" }}
      />
      <span className="st-orbit" aria-hidden="true" />
      {img ? (
        <img className="st-photo" src={img} alt="" loading="lazy" />
      ) : (
        <img
          className="st-img"
          src={`/profiles/illustrations/${id}.svg`}
          width="320"
          height="240"
          alt={tr(tw.name)}
          decoding="async"
        />
      )}
      <span className="st-spark s1" aria-hidden="true" />
      <span className="st-spark s2" aria-hidden="true" />
      <span className="st-spark s3" aria-hidden="true" />
      <span className="st-e e1" aria-hidden="true">
        {e1}
      </span>
      <span className="st-e e2" aria-hidden="true">
        {e2}
      </span>
      <span className="st-e e3" aria-hidden="true">
        {e3}
      </span>
    </div>
  );
}

function Panel({ s, tw, pr, act, pulse }) {
  const c = 2 * Math.PI * 52,
    { vs, done, pct, left, frontier } = pr;
  const snap = [];
  for (let k = vs.length - 1; k >= 0 && snap.length < 3; k--) {
    const n = s.nm(vs[k]),
      a = s.ans[n];
    if (!filled(a) || SENS.test(n) || PRIV.test(n) || !s.opts(n)) continue;
    const first = Array.isArray(a) ? a[0] : a;
    snap.push(
      <div className="sn" key={n}>
        <span className="sn-e" aria-hidden="true">
          {qEmoji(n, s.q(n), s.prof.s)}
        </span>
        <div className="sn-t">
          <small>{qText(s, n)}</small>
          <span>
            <Flag cc={flagFor(s, n, s.lab(n, first), first)} />
            {ansLabel(s, n, a)}
          </span>
        </div>
      </div>,
    );
  }
  const m = Math.max(1, Math.round((left * 8) / 60));
  return (
    <aside className="panel" aria-label={t("your_progress")}>
      <button className="back" id="hb" type="button" onClick={act.home}>
        <Icon n="arrow-l" className="flip" />
        {t("all_profiles")}
      </button>
      <Stage tw={tw} id={themeId(s.prof)} slug={s.prof.s} />
      <div className="info">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            {tr(tw.name)}
          </p>
          <h1 className="ptitle">{pnameT(s.prof)}</h1>
        </div>
        {tw.tag && <p className="ptag">{tr(tw.tag)}</p>}
        <div className="meter">
          <div
            className={"ring" + (pulse ? " pulse" : "")}
            id="ring"
            role="progressbar"
            aria-label={t("ring_label")}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={pct}
          >
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="rgr" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--a2)" />
                  <stop offset="1" stopColor="var(--a)" />
                </linearGradient>
              </defs>
              <circle className="tr" cx="60" cy="60" r="52" />
              <circle
                className="fg"
                cx="60"
                cy="60"
                r="52"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - pct / 100)}
              />
            </svg>
            <b id="ringv">{nf(pct)}%</b>
          </div>
          <div className="mtx" id="mtx">
            {tw.xp ? (
              <>
                <b>{t("xp", { xp: done * 50 })}</b>
                <br />
                {t("quests", { n: left })}
                <br />
                <span className="lvl">
                  {t("level", { l: Math.min(5, Math.floor(pct / 20) + 1) })}
                </span>
              </>
            ) : (
              <>
                <b>{t("answered", { done, total: vs.length })}</b>
                <br />
                {left ? t("to_go", { left, m }) : t("all_done")}
                {tw.lvl && (
                  <>
                    <br />
                    <span className="lvl">
                      {t("seniority")}:{" "}
                      {pct >= 75
                        ? t("sen_senior")
                        : pct >= 40
                          ? t("sen_mid")
                          : t("sen_entry")}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {snap.length > 0 && (
        <div className="snap" id="snap">
          <h2>{t("snapshot")}</h2>
          {snap}
        </div>
      )}
      <details
        className="smap"
        id="smap"
        open={typeof innerWidth !== "undefined" && innerWidth > 900}
      >
        <summary>
          <Icon n="chev" />
          {t("qmap")}
        </summary>
        <div className="steps" id="steps">
          {vs.map((i, k) => {
            const n = s.nm(i),
              dn = filled(s.ans[n]),
              cu = i === s.i,
              ok = s.edit || i <= frontier || dn;
            return (
              <button
                key={i}
                type="button"
                className={"st" + (dn ? " dn" : "") + (cu ? " cu" : "")}
                data-j={i}
                disabled={!ok || cu}
                aria-label={
                  t("q_n", { n: k + 1 }) +
                  (dn ? ", " + t("lg_answered") : "") +
                  (cu ? ", " + t("lg_current") : "")
                }
                title={qText(s, n)}
                onClick={() => act.jump(i)}
              >
                {dn && !cu ? "" : nf(k + 1)}
              </button>
            );
          })}
        </div>
        <div className="legend">
          <span>
            <i className="l1" />
            {t("lg_answered")}
          </span>
          <span>
            <i className="l2" />
            {t("lg_current")}
          </span>
          <span>
            <i />
            {t("lg_next")}
          </span>
        </div>
      </details>
    </aside>
  );
}

/* ---------- the question card ---------- */
function Field({ s, n, tw, act, invalid }) {
  const o = s.opts(n),
    value = s.ans[n];
  if (!o)
    return <TextField s={s} n={n} value={value} act={act} invalid={invalid} />;
  const k = kind(n, o, s.multi(n)),
    p = { s, n, o, value, act, t: tw };
  switch (k) {
    case "bin":
      return <Binary {...p} />;
    case "levels":
      return <Levels {...p} />;
    case "scale":
      return <Scale {...p} />;
    case "tiles":
      return <Tiles {...p} />;
    case "rows":
      return <Rows {...p} />;
    case "combo":
      return (
        <ComboBox
          key={n + "|" + JSON.stringify(s.ans[s.D.Q[n][1]] ?? "")}
          {...p}
        />
      );
    case "mtiles":
      return <Multi {...p} />;
    default:
      return <Multi {...p} chips />;
  }
}

/* "Other" picked → a required, validated "Please specify" field; the flow waits for it (no auto-advance). */
function OtherInput({ n, value, act, invalid }) {
  const ref = useRef(null);
  useEffect(() => {
    const k = setTimeout(() => {
      if (ref.current) ref.current.focus({ preventScroll: false });
    }, 60);
    return () => clearTimeout(k);
  }, []);
  return (
    <div className={"other-q" + (invalid ? " bad" : "")}>
      <label htmlFor="qo">
        <span className="oq-emo" aria-hidden="true">
          ✍️
        </span>
        {t("other_label")}
      </label>
      <div className="fld">
        <span className="fi">
          <Icon n="edit" />
        </span>
        <input
          id="qo"
          ref={ref}
          className="in"
          type="text"
          value={value}
          maxLength={120}
          autoComplete="off"
          placeholder={t("other_ph")}
          aria-describedby="er"
          aria-invalid={invalid || undefined}
          onChange={(e) => act.other(n, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              act.next();
            }
          }}
        />
      </div>
    </div>
  );
}

/* Journey track: start emoji → finish flag, with the profile's emoji travelling along as you answer. */
function Journey({ s, pr }) {
  const [e1] = profileEmoji(s.prof.s),
    p = Math.max(0, Math.min(100, pr.pct));
  return (
    <div className="journey" aria-hidden="true">
      <span className="jr-start">🚀</span>
      <span className="jr-track">
        <i style={{ "--w": p + "%" }} />
        <span className="jr-me" style={{ "--x": p + "%" }}>
          {e1}
        </span>
        {[25, 50, 75].map((m) => (
          <span
            key={m}
            className={"jr-ms" + (p >= m ? " on" : "")}
            style={{ "--x": m + "%" }}
          >
            {m === 25 ? "⭐" : m === 50 ? "🔥" : "💎"}
          </span>
        ))}
      </span>
      <span className="jr-end">🏁</span>
    </div>
  );
}

const NEXT_KEY = {
  Continue: "continue",
  Skip: "skip_q",
  Finish: "finish",
  Save: "save",
  "Save changes": "save_changes",
};

function QuestionCard({ s, tw, act, dir, qKey, err, shake, busy }) {
  const [orig, setOrig] = useState(false);
  const n = s.cur(),
    vs = s.visList(),
    pos = vs.indexOf(s.i) + 1,
    sec = s.flat[s.i][1];
  const raw = s.nextLabel(),
    label = busy
      ? t("saving")
      : err && err.submit
        ? t("retry")
        : t(NEXT_KEY[raw] || "continue");
  const showBack = s.hist.length || s.edit;
  const en = s.q(n),
    q = qText(s, n),
    translated = lang() !== "en" && q !== en,
    waiting = isPending(en);
  const shown = err && err.level !== "soft" && err.text;
  const notice = err && err.level === "soft" ? err : null;
  const ok = !shown && !notice && filled(s.ans[n]) && !s.check(n);
  const words = q.split(/(\s+)/);
  return (
    <div
      className={
        "card v-" +
        (tw.card || "soft") +
        (shown ? " bad" : notice ? " warn" : ok ? " ok" : "") +
        (shake ? " shake" : "")
      }
      id="cd"
    >
      <span className="card-fx" aria-hidden="true">
        <span className="card-glow" />
      </span>
      <div
        className={"qb " + (dir > 0 ? "enter-f" : "enter-b")}
        id="qbody"
        key={qKey}
      >
        <div className="qhead">
          <span className="qemo" aria-hidden="true">
            <span>{qEmoji(n, en, s.prof.s)}</span>
          </span>
          <span className="sec">{secName(sec)}</span>
          <span className="qn">
            {s.one ? t("editing_one") : t("q_of", { n: pos, total: vs.length })}
          </span>
          {!s.req(n) && <span className="opt">{t("optional")}</span>}
          {LOCK.test(n) && s.edit && (
            <span className="opt" title={t("identity_note")}>
              <Icon n="shield" /> {t("identity_note")}
            </span>
          )}
        </div>
        <h2
          className={"qt" + (waiting ? " wait" : "")}
          id="qh"
          tabIndex={-1}
          aria-label={q}
        >
          {reducedMotion()
            ? q
            : words.map((w, i) =>
                /^\s+$/.test(w) ? (
                  w
                ) : (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="w"
                    style={{ "--i": Math.min(i, 30) }}
                  >
                    {w}
                  </span>
                ),
              )}
        </h2>
        {(translated || waiting) && (
          <div className="trbar">
            <span className="trchip">
              <Icon n="translate" />
              {waiting ? t("translating") : t("auto_tr")}
            </span>
            {translated && (
              <button
                type="button"
                className="lnk"
                aria-expanded={orig}
                onClick={() => setOrig((x) => !x)}
              >
                <Icon n="eye" />
                {orig ? t("show_tr") : t("show_orig")}
              </button>
            )}
          </div>
        )}
        {orig && translated && (
          <p className="orig" lang="en" dir="ltr">
            {en}
          </p>
        )}
        {s.opts(n) && s.multi(n) && <p className="hint">{t("select_all")}</p>}
        {INCOME_Q.test(n) && <p className="hint">{t("inc_note")}</p>}
        <div id="fld">
          <Field s={s} n={n} tw={tw} act={act} invalid={!!shown} />
        </div>
        {s.otherSel(n) && (
          <OtherInput
            n={n}
            value={s.ans[n + "-other"] || ""}
            act={act}
            invalid={!!shown}
          />
        )}
        <div className="er" id="er" role="alert">
          {shown && (
            <>
              <Icon n="x" />
              {shown}
            </>
          )}
        </div>
        {notice && (
          <div className="notice-q soft" role="alert">
            <p>
              <Icon n="sparkle" />
              <span>
                <b>{t("check_title")}</b> {notice.text}
              </span>
            </p>
            <div className="nq-acts">
              {notice.suggestion && (
                <button
                  type="button"
                  className="btn gh sm"
                  onClick={() => act.answer(n, notice.suggestion)}
                >
                  {t("use_suggestion", { s: notice.suggestion })}
                </button>
              )}
              <button
                type="button"
                className="btn pr sm"
                onClick={() => act.confirm(true)}
              >
                <Icon n="check" />
                {t("confirm_continue")}
              </button>
            </div>
          </div>
        )}
        <div className="nav">
          <button
            className="btn gh"
            id="bk"
            type="button"
            hidden={!showBack}
            onClick={act.back}
          >
            <Icon n="arrow-l" className="flip" />
            <span>{s.hist.length || !s.edit ? t("back") : t("cancel")}</span>
          </button>
          <button
            className="btn pr"
            id="nx"
            type="button"
            disabled={busy}
            onClick={act.nextClick}
          >
            {busy ? <span className="spin" /> : null}
            <span id="nxl">{label}</span>
            {!busy && (
              <Icon
                n={/Finish|Save/.test(raw) ? "check" : "arrow-r"}
                className={/Finish|Save/.test(raw) ? "" : "flip"}
              />
            )}
          </button>
        </div>
        <p className="kbd">
          {t("kbd")}
          {showBack ? <> · {t("kbd_back")}</> : null}
        </p>
      </div>
    </div>
  );
}

export default function Flow({ s, tw, act, dir, qKey, err, shake, busy }) {
  useI18n();
  const toast = useToast();
  const pr = s.progress();
  const [pulse, setPulse] = useState(false);
  const started = useRef(false);

  /* milestone toasts at 25 / 50 / 75% (not in edit mode, not on the last question) */
  useEffect(() => {
    if (s.edit || s.nv(s.i) < 0) {
      started.current = true;
      return;
    }
    for (const m of [25, 50, 75]) {
      if (pr.pct >= m && !s.ms.has(m)) {
        s.ms.add(m);
        if (started.current) {
          setPulse(false);
          requestAnimationFrame(() => setPulse(true));
          toast(tw.xp ? t("a" + m) : t("m" + m), "star");
        }
      }
    }
    started.current = true;
  }, [pr.pct]); // eslint-disable-line react-hooks/exhaustive-deps

  /* focus + scroll when the question changes */
  useEffect(() => {
    const inp = document.getElementById("qi");
    if (inp && finePointer() && inp.type !== "date")
      inp.focus({ preventScroll: true });
    else {
      const h = document.getElementById("qh");
      if (h) h.focus({ preventScroll: true });
    }
    const cd = document.getElementById("cd");
    if (cd) {
      const r = cd.getBoundingClientRect();
      if (r.top < 0 || r.top > innerHeight * 0.6)
        cd.scrollIntoView({
          block: "start",
          behavior: reducedMotion() ? "auto" : "smooth",
        });
    }
  }, [qKey]);

  return (
    <div className={"flow " + (tw.lay || "L")}>
      <Panel s={s} tw={tw} pr={pr} act={act} pulse={pulse} />
      <section className="qwrap">
        <Journey s={s} pr={pr} />
        <QuestionCard
          s={s}
          tw={tw}
          act={act}
          dir={dir}
          qKey={qKey}
          err={err}
          shake={shake}
          busy={busy}
        />
      </section>
    </div>
  );
}
