"use client";
import React from "react";
import Icon from "./Icon";
import IconSprite from "./IconSprite";
import Atmosphere from "./Atmosphere";

/**
 * The page chrome from the preview: animated backdrop, sticky header
 * (points pill, language, sound, theme) and the privacy footer.
 *
 * `world` selects a palette from t2o-worlds.css — pass the survey's
 * category slug ("identity", "campus", "finance", …). It is set on
 * <html data-t> because the palette variables cascade from there.
 */
export default function Shell({
  world = "brand",
  points = 0,
  cash = "$0.00",
  language = "English",
  countryCode = "GB",
  progress = null,
  onLanguageClick,
  onLogoClick,
  children,
}) {
  const [theme, setTheme] = useTheme();
  const [sound, setSound] = useSound();

  React.useEffect(() => {
    document.documentElement.dataset.t = world || "brand";
  }, [world]);

  return (
    <div id="t2o">
      <IconSprite />
      <a className="skip" href="#app">
        Skip to content
      </a>

      <Atmosphere world={world} />

      {/* Thin load/progress rail pinned to the very top of the viewport */}
      <div className="tbar" aria-hidden="true">
        <i style={{ "--w": `${progress ?? 0}%` }} />
      </div>

      <header className="top" id="hdr">
        <div className="top-in">
          <a
            className="logo"
            href="./"
            id="logo"
            aria-label="Turn2Opinion, back to all profiles"
            onClick={(e) => {
              if (onLogoClick) {
                e.preventDefault();
                onLogoClick();
              }
            }}
          >
            <img
              src="/t2o/assets/img/turn2opinion-logo.png"
              alt="Turn2Opinion.com"
              width="198"
              height="60"
              decoding="async"
            />
            <span className="sheen" aria-hidden="true" />
          </a>

          <div className="tools">
            <button
              className="rwpill"
              type="button"
              aria-label={`${points} Opinion Points, worth ${cash}.`}
              title={cash}
            >
              <span className="rwp-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="10" width="6" height="12" rx="1" />
                  <rect x="9" y="3" width="7" height="19" rx="1" />
                  <rect x="17" y="8" width="5" height="14" rx="1" />
                </svg>
              </span>
              <Odometer value={points} />
              <small>pts</small>
            </button>

            <button
              className="langpill"
              type="button"
              id="langbtn"
              aria-haspopup="dialog"
              aria-label={`Language: ${language}. Choose your language`}
              onClick={onLanguageClick}
            >
              <span className="lp-globe">
                <Icon n="globe" />
              </span>
              <span className="flag" aria-hidden="true" data-cc={countryCode} />
              <span className="lp-name">{language}</span>
              <Icon n="chev" className="lp-chev" />
            </button>

            <button
              className={`ib ${sound ? "on" : ""}`}
              type="button"
              aria-pressed={sound}
              aria-label={sound ? "Sound on" : "Sound muted"}
              title={sound ? "Sound on" : "Sound muted"}
              onClick={() => setSound(!sound)}
            >
              <Icon n={sound ? "vol" : "mute"} />
            </button>

            <button
              className={`tswitch ${theme}`}
              type="button"
              role="switch"
              aria-checked={theme === "dark"}
              aria-label="Switch between light and dark theme"
              title={theme === "dark" ? "Dark theme" : "Light theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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

      <div className="wrap">{children}</div>

      <footer className="foot">
        <Icon n="shield" />
        <span>
          Your answers are private and used only to match you with research
          studies.
        </span>
      </footer>
    </div>
  );
}

/** Rolling-digit counter used by the points pill. */
function Odometer({ value = 0 }) {
  const digits = String(Math.max(0, Math.round(value)));
  return (
    <span className="odo" aria-hidden="true">
      {digits.split("").map((d, i) => (
        <span className="odo-c" key={i}>
          <span className="odo-r" style={{ "--d": Number(d) }}>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
          <span className="odo-w">{d}</span>
        </span>
      ))}
    </span>
  );
}

/** Colour mode, persisted exactly where the preview's no-flash script looks. */
export function useTheme() {
  const [theme, set] = React.useState("light");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("ui:mode");
      const dark =
        saved === "dark" ||
        (saved === "auto" &&
          matchMedia("(prefers-color-scheme: dark)").matches);
      set(dark ? "dark" : "light");
    } catch {
      /* private mode, blocked storage — light is a fine default */
    }
  }, []);

  const setTheme = React.useCallback((next) => {
    set(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ui:mode", next);
    } catch {
      /* nothing to do; the choice just won't survive a reload */
    }
  }, []);

  return [theme, setTheme];
}

function useSound() {
  const [on, set] = React.useState(true);
  React.useEffect(() => {
    try {
      set(localStorage.getItem("ui:snd") !== "0");
    } catch {
      /* default stays on */
    }
  }, []);
  const setSound = React.useCallback((next) => {
    set(next);
    try {
      localStorage.setItem("ui:snd", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);
  return [on, setSound];
}
