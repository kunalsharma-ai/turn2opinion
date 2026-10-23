"use client";

/**
 * Next.js App Router page for Turn2Opinion Respondent Profile (v5.2)
 * Route: /profiles
 *
 * Self-contained under app/profiles — static assets must be available at
 * /profiles/* (copy app/profiles/static/* → your Next.js public/profiles/).
 */

import { StrictMode, useEffect, useState } from "react";
import App from "./App.jsx";
import { initialLang, setLang } from "./i18n/index.js";
import "./styles/app.css";
import "./styles/v5.css";
import "./styles/city.css";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay.jsx";

export default function ProfilesPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Match original main.jsx boot: pick language first, then render.
    // English is immediate; other languages wait briefly for their UI pack.
    let cancelled = false;
    const { code, how } = initialLang();

    if (code === "en") {
      setLang("en", { how });
      if (!cancelled) setReady(true);
      return;
    }

    let done = false;
    const go = () => {
      if (!done && !cancelled) {
        done = true;
        setReady(true);
      }
    };
    setLang(code, { how }).then(go, go);
    const t = setTimeout(go, 700);
    return () => {
      cancelled = true;
      clearTimeout(t);
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
          background: "var(--bg, #fff)",
          color: "var(--mu, #5b6478)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}
