// Duotone "extruded" icons drawn for this page (no icon library). Each icon has a solid body (filled with the
// chapter's colour grade through CSS variables --g1 / --g2), a darker extrusion layer offset behind it for a 3D
// look, and white detail lines on top. Every icon carries alternative text (role="img" + aria-label) — the list is
// in ALT-TEXT.md. Pass `alt` to describe a specific use, or `decorative` when the text beside it says the same.
const I = {
  door: { s: 'M6 3h10a2 2 0 012 2v16H6z', l: 'M14 12h.5M3 21h18M10 7h4' , alt: 'Open door icon' },
  layers: { s: 'M12 3l9 4.5-9 4.5-9-4.5zM3 12l9 4.5 9-4.5v2.5L12 19l-9-4.5z', l: 'M3 17l9 4.5 9-4.5', alt: 'Stacked data layers icon' },
  coins: { s: 'M4 8c0-1.7 3-3 7-3s7 1.3 7 3v8c0 1.7-3 3-7 3s-7-1.3-7-3z', l: 'M4 8c0 1.7 3 3 7 3s7-1.3 7-3M4 12c0 1.7 3 3 7 3s7-1.3 7-3M19 9.5c1.3.4 2 1 2 1.8v6c0 1.6-2.7 2.9-6.5 3', alt: 'Coins icon' },
  shield: { s: 'M12 2.5l8 3v6.2c0 5-3.4 8.6-8 9.8-4.6-1.2-8-4.8-8-9.8V5.5z', l: 'M8.5 12l2.5 2.5 4.6-5', alt: 'Security shield icon' },
  mic: { s: 'M9 3.5a3 3 0 016 0V12a3 3 0 01-6 0z', l: 'M5.5 11a6.5 6.5 0 0013 0M12 17.5V21M8.5 21h7', alt: 'Microphone icon' },
  key: { s: 'M8 15.5a4.5 4.5 0 114.1-6.4H21v3.2h-2v2.2h-2.4v-2.2h-4.5A4.5 4.5 0 018 15.5z', l: 'M6.5 11h.01', alt: 'Key icon' },
  wave: { s: 'M7 11.5V6a1.5 1.5 0 013 0v4-6a1.5 1.5 0 013 0v6-5a1.5 1.5 0 013 0v7l1.2-2a1.6 1.6 0 012.7 1.6L16.5 19a5 5 0 01-4.3 2.5H11a5 5 0 01-5-5v-3.5a1.5 1.5 0 011-1.5z', l: 'M3.5 6.5l1.5 1M2.5 10H4M4 3.5l1 1.5', alt: 'Waving hand icon' },
  badge: { s: 'M12 2.5l2.4 1.8 3-.2.8 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.8 2.9-3-.2L12 21.5l-2.4-1.8-3 .2-.8-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.8-2.9 3 .2z', l: 'M8.5 12l2.5 2.5 4.5-5', alt: 'Verified badge icon' },
  folder: { s: 'M3 6.5A1.5 1.5 0 014.5 5h5l2 2.5h8A1.5 1.5 0 0121 9v9.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5z', l: 'M7 13h10M7 16.5h6', alt: 'Information folder icon' },
  target: { s: 'M12 3a9 9 0 110 18 9 9 0 010-18z', l: 'M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM12 11.2v1.6M15 9l5-5M17 4h3v3', alt: 'Target icon' },
  clipboard: { s: 'M5.5 5h13v16h-13z', l: 'M9 3.5h6V6.5H9zM8.5 12l2 2 4-4.5M8.5 17.5h7', alt: 'Survey clipboard icon' },
  gift: { s: 'M4 10.5h16V21H4zM3 7h18v3.5H3z', l: 'M12 7v14M12 7C10.5 4 7 3.5 7 5.8 7 7 9.5 7 12 7zM12 7c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7z', alt: 'Gift icon' },
  lock: { s: 'M5 10.5h14V21H5z', l: 'M8 10.5V7.5a4 4 0 018 0v3M12 14.5v3', alt: 'Padlock icon' },
  share: { s: 'M6 9a3 3 0 110 6 3 3 0 010-6zM18 3a3 3 0 110 6 3 3 0 010-6zM18 15a3 3 0 110 6 3 3 0 010-6z', l: 'M8.6 10.6l6.8-3.7M8.6 13.4l6.8 3.7', alt: 'Sharing network icon' },
  cookie: { s: 'M12 3a9 9 0 109 9 3 3 0 01-3.5-3A3 3 0 0113 5.5 3 3 0 0112 3z', l: 'M8.5 9.5h.01M8 14.5h.01M12.5 12.5h.01M15.5 16h.01M11.5 17h.01', alt: 'Cookie icon' },
  bell: { s: 'M6 16V11a6 6 0 0112 0v5l1.5 2h-15z', l: 'M10 20.5a2.2 2.2 0 004 0M12 3v2', alt: 'Notification bell icon' },
  heart: { s: 'M12 20.5S3.5 15.2 3.5 9.2A4.7 4.7 0 0112 6.5a4.7 4.7 0 018.5 2.7c0 6-8.5 11.3-8.5 11.3z', l: 'M7 12h2.5l1.3-2.5 2.2 5 1.3-2.5H17', alt: 'Heart with pulse icon' },
  hand: { s: 'M7 21v-6.5L4.8 11a1.6 1.6 0 012.6-1.8L9 11.5V5a1.5 1.5 0 013 0v5V3.8a1.5 1.5 0 013 0V10 5.2a1.5 1.5 0 013 0V15a6 6 0 01-6 6z', l: 'M12 10v2M15 10v2M18 10v2', alt: 'Raised hand icon' },
  exit: { s: 'M4 3.5h10v17H4z', l: 'M11 12h10M18 9l3 3-3 3M11 12h.01', alt: 'Exit door icon' },
  globe: { s: 'M12 3a9 9 0 110 18 9 9 0 010-18z', l: 'M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z', alt: 'Globe icon' },
  spark: { s: 'M12 2.5l2.2 6.3 6.3 2.2-6.3 2.2L12 19.5l-2.2-6.3L3.5 11l6.3-2.2z', l: 'M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z', alt: 'Sparkle icon' },
  family: { s: 'M8 4a3 3 0 110 6 3 3 0 010-6zM3 20c0-4 2.2-7 5-7s5 3 5 7zM17 9a2.4 2.4 0 110 4.8A2.4 2.4 0 0117 9zM13.6 20c0-2.8 1.5-5 3.4-5s3.4 2.2 3.4 5z', l: '', alt: 'Adult and child icon' },
  refresh: { s: 'M12 3.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17z', l: 'M16.5 9A5 5 0 007.3 10M7.5 15a5 5 0 009.2-1M16.5 6v3h-3M7.5 18v-3h3', alt: 'Update cycle icon' },
  server: { s: 'M4 4h16v7H4zM4 13h16v7H4z', l: 'M7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6', alt: 'Server icon' },
  scale: { s: 'M10.5 19h3V6h-3zM6 21h12v-2H6z', l: 'M4 7h16M12 3v3M4 7l-2.5 6a2.6 2.6 0 005 0zM20 7l-2.5 6a2.6 2.6 0 005 0z', alt: 'Scales of justice icon' },
  pen: { s: 'M15 3.5l5.5 5.5L9 20.5H3.5V15z', l: 'M13 5.5l5.5 5.5M3 22h18', alt: 'Signing pen icon' },
  briefcase: { s: 'M3 8h18v12H3z', l: 'M8 8V5h8v3M3 13h18M11 13v2h2v-2', alt: 'Briefcase icon' },
  chart: { s: 'M4 14h4v6H4zM10 9h4v11h-4zM16 4h4v16h-4z', l: 'M3 21h18', alt: 'Bar chart icon' },
  vault: { s: 'M3.5 4h17v15h-17z', l: 'M12 8.5a3 3 0 110 6 3 3 0 010-6zM12 8.5v-1M15 11.5h1M5.5 19v2M18.5 19v2M7 8v7', alt: 'Safe vault icon' },
  handshake: { s: 'M2.5 9l4-3 4 2 3-2 3 1 5 3-2.5 5-3.5 3-4-1-3-2-3.5-1z', l: 'M10.5 8l-2.5 3 1.5 1.5 3-2 3 3M13 15.5l1.5 1.5M11 16.5l1.5 1.5', alt: 'Handshake icon' },
  sun: { s: 'M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z', l: 'M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8', alt: 'Light theme icon' },
  moon: { s: 'M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z', l: 'M16 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z', alt: 'Dark theme icon' },
  // interface
  lang: { s: 'M12 3a9 9 0 110 18 9 9 0 010-18z', l: 'M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z', alt: 'Language globe icon' },
  volume: { s: 'M3.5 9h4l5-4v14l-5-4h-4z', l: 'M16 9a4 4 0 010 6M18.5 6.5a7.5 7.5 0 010 11', alt: 'Sound on icon' },
  mute: { s: 'M3.5 9h4l5-4v14l-5-4h-4z', l: 'M16.5 9.5l5 5M21.5 9.5l-5 5', alt: 'Sound off icon' },
  check: { s: '', l: 'M5 12.5l4.5 4.5L19 7', alt: 'Check mark icon' },
  chevron: { s: '', l: 'M6 9l6 6 6-6', alt: 'Expand icon' },
  x: { s: '', l: 'M6 6l12 12M18 6L6 18', alt: 'Close icon' },
  search: { s: '', l: 'M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM16 16l5 5', alt: 'Search icon' },
  download: { s: '', l: 'M12 4v11M7 10.5l5 5 5-5M4 20h16', alt: 'Download icon' },
  arrow: { s: '', l: 'M5 12h14M13 6l6 6-6 6', alt: 'Arrow icon' },
  print: { s: 'M6 9h12v7H6z', l: 'M8 9V3.5h8V9M8 14h8v6.5H8z', alt: 'Printer icon' },
  mail: { s: 'M3 5.5h18v13H3z', l: 'M3.5 6l8.5 7 8.5-7', alt: 'Envelope icon' },
  pin: { s: 'M12 21.5s7-6.2 7-11.5A7 7 0 005 10c0 5.3 7 11.5 7 11.5z', l: 'M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', alt: 'Location pin icon' },
  clock: { s: 'M12 3a9 9 0 110 18 9 9 0 010-18z', l: 'M12 7v5l3.2 2', alt: 'Clock icon' },
  star: { s: 'M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z', l: '', alt: 'Star icon' },
};

export const ICON_ALT = Object.fromEntries(Object.entries(I).map(([k, v]) => [k, v.alt]));

export default function Icon({ name, size = 24, alt, decorative = false, className = '' }) {
  const d = I[name] || I.spark;
  const label = alt || d.alt;
  return (
    <svg
      className={`ix ${d.s ? 'ix-solid' : 'ix-line'} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
    >
      {d.s ? <path className="ix-depth" d={d.s} transform="translate(1.1 1.3)" /> : null}
      {d.s ? <path className="ix-body" d={d.s} /> : null}
      {d.l ? <path className="ix-line" d={d.l} /> : null}
    </svg>
  );
}
