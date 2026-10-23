import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon, Flag } from "./Icon.jsx";
import { LS } from "../lib/storage.js";
import { sound } from "../lib/sound.js";
import { useToast } from "./Toasts.jsx";
import { t, nf, useI18n, langMeta } from "../i18n/index.js";
import {
  deliveredPoints,
  fmtUsd,
  subscribeRewards,
  rewardsVersion,
} from "../lib/rewards.js";
import Odo from "./Odo.jsx";

const PILL_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="10" width="6" height="12" rx="1"/><rect x="9" y="3" width="7" height="19" rx="1"/><rect x="17" y="8" width="5" height="14" rx="1"/><path d="M11 6h1M13.5 6h1M11 9h1M13.5 9h1M11 12h1M13.5 12h1M4 13h2M4 16h2M19 11h1M19 14h1" stroke="#ffd66b" stroke-width="1.4"/></svg>';

const MODES = ["light", "dark"];

/* Sticky header: animated logo, the language button (always in front), sound and colour mode. */
export default function Header({ onHome, onLang, onRewards }) {
  useI18n();
  useSyncExternalStore(subscribeRewards, rewardsVersion, rewardsVersion);
  const pts = deliveredPoints();
  const toast = useToast(),
    L = langMeta();
  const [mode, setMode] = useState(() => {
    const m = LS.get("ui:mode");
    return m === "dark" ||
      (m === "auto" && matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";
  });
  const [snd, setSnd] = useState(sound.on);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
  }, [mode]);

  const cycleMode = () => {
    const m = mode === "dark" ? "light" : "dark";
    const run = () => {
      setMode(m);
      LS.set("ui:mode", m);
      document.documentElement.dataset.theme = m;
    };
    if (
      document.startViewTransition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      try {
        document.startViewTransition(run);
      } catch (e) {
        run();
      }
    } else run();
    sound.click("brand", "toggle");
    toast(t("theme_" + m), m === "dark" ? "moon" : "sun");
  };
  const toggleSound = () => {
    const v = !snd;
    sound.setOn(v);
    setSnd(v);
    if (v) sound.tick();
    toast(v ? t("sound_on") : t("sound_off"), v ? "vol" : "mute");
  };

  return (
    <header className="top" id="hdr" style={{ display: "none" }}>
      <div className="top-in">
        <a
          className="logo"
          href="./"
          id="logo"
          aria-label={t("home_aria")}
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
        >
          <img
            src="/profiles/img/turn2opinion-logo.png"
            alt="Turn2Opinion.com"
            width="198"
            height="60"
            fetchpriority="high"
            decoding="async"
          />
          <span className="sheen" aria-hidden="true" />
        </a>
        <div className="tools">
          <button
            className="rwpill"
            id="rw-pts"
            type="button"
            onClick={onRewards}
            aria-label={t("rw_pill_aria", { pts: nf(pts), usd: fmtUsd(pts) })}
            title={fmtUsd(pts)}
          >
            <span
              className="rwp-ic"
              dangerouslySetInnerHTML={{ __html: PILL_ICON }}
            />
            <Odo value={pts} />
            <small>{t("rw_pts")}</small>
          </button>
          <button
            className="langpill"
            type="button"
            id="langbtn"
            onClick={onLang}
            aria-haspopup="dialog"
            aria-label={`${t("lang")}: ${L.n}. ${t("lang_choose")}`}
          >
            <span className="lp-globe">
              <Icon n="globe" />
            </span>
            <Flag cc={L.f} />
            <span className="lp-name" lang={L.c}>
              {L.n}
            </span>
            <Icon n="chev" className="lp-chev" />
          </button>
          <button
            className={"ib" + (snd ? " on" : "")}
            id="snd"
            type="button"
            aria-pressed={snd}
            onClick={toggleSound}
            aria-label={snd ? t("sound_on") : t("sound_off")}
            title={snd ? t("sound_on") : t("sound_off")}
          >
            <Icon n={snd ? "vol" : "mute"} />
          </button>
          <button
            className={"tswitch " + mode}
            id="mode"
            type="button"
            role="switch"
            aria-checked={mode === "dark"}
            onClick={cycleMode}
            aria-label={t("theme_switch")}
            title={t("theme_" + mode)}
          >
            <span className="ts-track" aria-hidden="true">
              <span className="ts-sun">☀️</span>
              <span className="ts-moon">🌙</span>
              <span className="ts-knob" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
