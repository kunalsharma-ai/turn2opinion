"use client";

import { useEffect, useState } from "react";
import App from "./App.jsx";
import { initialLang, setLang } from "./i18n/index.js";
import "./styles/app.css";
import "./styles/v5.css";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay.jsx";

/**
 * Next.js App Router page for the Turn2Opinion respondent profile builder.
 * Drop this folder under your project's `app/` directory.
 * Public assets (data/, flags/, illustrations/, img/, icons/) must live in the
 * project root `public/` folder (already prepared in this package).
 */
export default function RespondentProfilePage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const { code, how } = initialLang();
    let cancelled = false;

    const go = () => {
      if (!cancelled) setReady(true);
    };

    if (code === "en") {
      setLang("en", { how });
      go();
    } else {
      setLang(code, { how }).then(go, go);
      const t = setTimeout(go, 700);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return <LoadingOverlay />;
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          // background: 'var(--bg, #0b0d12)',
          color: "var(--fg, #e8eaef)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span style={{ opacity: 0.6, color: "#333" }}>Loading…</span>
      </div>
    );
  }

  return <App />;
}
