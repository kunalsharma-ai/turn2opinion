"use client";
import React from "react";

/**
 * Injects the 80-symbol SVG sprite that every <Icon /> references.
 * Render it once, high in the tree — it paints nothing itself.
 *
 * The markup is our own build artefact (extracted from the preview into
 * public/t2o/icons.svg.html), not user input, so the raw injection is safe.
 * It is fetched rather than inlined so it stays out of the JS bundle and
 * gets cached like any other static asset.
 */
export default function IconSprite({ src = "/t2o/icons.svg.html" }) {
  const [markup, setMarkup] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => (r.ok ? r.text() : ""))
      .then((t) => {
        if (alive) setMarkup(t);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <div
      id="t2o-icons"
      className="sprite"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
