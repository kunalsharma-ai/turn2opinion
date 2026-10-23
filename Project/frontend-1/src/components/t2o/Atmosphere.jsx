"use client";
import React from "react";
import Icon from "./Icon";

/**
 * The drifting backdrop behind the survey: two colour blooms, a dot
 * pattern, a constellation of linked nodes, and floating emoji/icons
 * themed to the current world. Purely decorative.
 *
 * Node positions are generated once from a seeded PRNG so the layout is
 * identical on server and client — Math.random() here would hydrate-mismatch.
 */
export default function Atmosphere({ world = "brand" }) {
  const theme = WORLDS[world] || WORLDS.brand;

  const { nodes, links } = React.useMemo(() => build(world), [world]);

  return (
    <div className="atmos" id="atmos" aria-hidden="true" data-world={world}>
      <div className="g g1" />
      <div className="g g2" />
      <div className="pat" />

      <svg className="net" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r=".6"
            style={{ "--dl": `${-i * 0.4}s` }}
          />
        ))}
      </svg>

      {theme.emoji.map((e, i) => (
        <span
          key={i}
          className="fe"
          style={{
            left: `${EMOJI_POS[i][0]}%`,
            top: `${EMOJI_POS[i][1]}%`,
            "--d": `${16 + i * 3}s`,
            "--dl": `${-i * 2.3}s`,
            "--z": `${30 + (i % 3) * 12}px`,
          }}
        >
          {e}
        </span>
      ))}

      {theme.icons.map((n, i) => (
        <span
          key={n + i}
          className="fl"
          style={{
            left: `${ICON_POS[i][0]}%`,
            top: `${ICON_POS[i][1]}%`,
            width: ICON_POS[i][2],
            height: ICON_POS[i][2],
            "--d": `${22 + i * 5}s`,
            "--dl": `${-i * 4}s`,
          }}
        >
          <Icon n={n} />
        </span>
      ))}
    </div>
  );
}

/* Fixed positions, so the backdrop is stable across renders. */
const EMOJI_POS = [
  [8, 22], [88, 14], [16, 78], [80, 70], [50, 90], [64, 30], [30, 46],
];
const ICON_POS = [
  [6, 64, 96], [86, 20, 120], [74, 78, 76],
];

const WORLDS = {
  brand:    { emoji: ["💬", "📊", "✨", "💬", "📊", "✨", "💬"], icons: ["chart", "sparkle", "send"] },
  identity: { emoji: ["🪪", "🌍", "👋", "🪪", "🌍", "👋", "🪪"], icons: ["globe", "pin", "flag"] },
  campus:   { emoji: ["🎓", "📚", "✏️", "🎓", "📚", "✏️", "🎓"], icons: ["cap", "book", "clipboard"] },
  finance:  { emoji: ["💳", "📈", "🏦", "💳", "📈", "🏦", "💳"], icons: ["wallet", "chart", "bank"] },
  health:   { emoji: ["🩺", "💊", "❤️", "🩺", "💊", "❤️", "🩺"], icons: ["heartpulse", "pill", "plus"] },
  tech:     { emoji: ["💻", "📱", "🔌", "💻", "📱", "🔌", "💻"], icons: ["laptop", "chip", "wifi"] },
  travel:   { emoji: ["✈️", "🏝️", "🧳", "✈️", "🏝️", "🧳", "✈️"], icons: ["pin", "globe", "bag"] },
  shop:     { emoji: ["🛒", "🏷️", "🎁", "🛒", "🏷️", "🎁", "🛒"], icons: ["cart", "bag", "gift"] },
  gamer:    { emoji: ["🎮", "🏆", "🕹️", "🎮", "🏆", "🕹️", "🎮"], icons: ["gamepad", "trophy", "headset"] },
  food:     { emoji: ["🍕", "🥗", "☕", "🍕", "🥗", "☕", "🍕"], icons: ["food", "cup", "glass"] },
  sports:   { emoji: ["⚽", "🏋️", "🏅", "⚽", "🏋️", "🏅", "⚽"], icons: ["ball", "dumbbell", "trophy"] },
  auto:     { emoji: ["🚗", "⛽", "🔧", "🚗", "⛽", "🔧", "🚗"], icons: ["car", "tool", "bolt"] },
  media:    { emoji: ["🎬", "🎵", "📺", "🎬", "🎵", "📺", "🎬"], icons: ["film", "music", "tv"] },
  pets:     { emoji: ["🐾", "🐕", "🐈", "🐾", "🐕", "🐈", "🐾"], icons: ["paw", "heart", "leaf"] },
  home:     { emoji: ["🏠", "🛋️", "🔑", "🏠", "🛋️", "🔑", "🏠"], icons: ["home", "tool", "leaf"] },
};

/** Deterministic layout: same nodes every render, no hydration mismatch. */
function build(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  const rnd = () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };

  const nodes = Array.from({ length: 12 }, () => ({
    x: +(rnd() * 100).toFixed(2),
    y: +(rnd() * 100).toFixed(2),
  }));

  const links = [];
  nodes.forEach((a, i) => {
    nodes.slice(i + 1).forEach((b) => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 26) links.push([a, b]);
    });
  });

  return { nodes, links };
}
