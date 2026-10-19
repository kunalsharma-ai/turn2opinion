import { useEffect, useState } from "react";
import { Icon, Flag } from "./Icon.jsx";
import { LS } from "../lib/storage.js";
import { sound } from "../lib/sound.js";
import { useToast } from "./Toasts.jsx";
import { t, useI18n, langMeta } from "../i18n/index.js";

const MODES = ["light", "dark"];

/* Sticky header: animated logo, the language button (always in front), sound and colour mode. */
export default function Header({ onHome, onLang }) {
  useI18n();
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
  return <></>;
  return (
    <header className="top" id="hdr">
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
            src="/img/turn2opinion-logo.png"
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
