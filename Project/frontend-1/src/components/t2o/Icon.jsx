"use client";
import React from "react";

/**
 * One icon from the sprite. Mirrors the preview's <G n="user" /> helper:
 *   <svg class="i"><use href="#i-user" /></svg>
 *
 * `flip` marks arrows that must mirror under RTL, matching the stylesheet.
 */
export default function Icon({ n, className = "", flip = false }) {
  const cls = ["i", flip ? "flip" : "", className].filter(Boolean).join(" ");
  return (
    <svg className={cls} aria-hidden="true" focusable="false">
      <use href={`#i-${n}`} />
    </svg>
  );
}

/**
 * Country flag, drawn from the shared sprite sheet in
 * public/t2o/assets/flags.webp.
 *
 * The sheet is a 16 x 17 grid of ISO 3166-1 alpha-2 flags in alphabetical
 * order, including the exceptional reservations (AC, CP, CQ, DG, EA, EU,
 * IC, TA, UN, XK). `.flag` in t2o-core.css turns --fx/--fy into a
 * background-position, so all this has to do is find the cell index.
 *
 * The order below was verified cell by cell against the sheet; don't
 * reorder it without re-checking, because every flag after the edit shifts.
 */
const ORDER =
  "ACADAEAFAGAIALAMAOAQARASATAUAWAXAZBABBBDBEBFBGBHBIBJBLBMBNBOBQBRBSBTBVBW" +
  "BYBZCACCCDCFCGCHCICKCLCMCNCOCPCQCRCUCVCWCXCYCZDEDGDJDKDMDODZEAECEEEGEHER" +
  "ESETEUFIFJFKFMFOFRGAGBGDGEGFGGGHGIGLGMGNGPGQGRGSGTGUGWGYHKHMHNHRHTHUICID" +
  "IEILIMINIOIQIRISITJEJMJOJPKEKGKHKIKMKNKPKRKWKYKZLALBLCLILKLRLSLTLULVLYMA" +
  "MCMDMEMFMGMHMKMLMMMNMOMPMQMRMSMTMUMVMWMXMYMZNANCNENFNGNINLNONPNRNUNZOMPA" +
  "PEPFPGPHPKPLPMPNPRPSPTPWPYQARERORSRURWSASBSCSDSESGSHSISJSKSLSMSNSOSRSSST" +
  "SVSXSYSZTATCTDTFTGTHTJTKTLTMTNTOTRTTTVTWTZUAUGUMUNUSUYUZVAVCVEVGVIVNVUWF" +
  "WSXKYEYTZAZMZW";

const COLS = 16;

/**
 * Pair-aligned index. A plain ORDER.indexOf() is wrong here: two adjacent
 * codes can spell a third across their boundary — "BG" followed by "BH"
 * contains "GB" at an odd offset — so the lookup has to step in twos.
 */
const INDEX = (() => {
  const m = new Map();
  for (let i = 0; i < ORDER.length; i += 2) {
    m.set(ORDER.slice(i, i + 2), i / 2);
  }
  return m;
})();

export function Flag({ cc }) {
  if (!cc) return null;
  const i = INDEX.get(String(cc).toUpperCase());
  if (i === undefined) return null;

  return (
    <span
      className="flag"
      aria-hidden="true"
      style={{ "--fx": i % COLS, "--fy": Math.floor(i / COLS) }}
    />
  );
}
