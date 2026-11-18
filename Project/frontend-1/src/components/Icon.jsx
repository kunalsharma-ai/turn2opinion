// Inline SVG icon set (24px grid, stroke-based). No icon library dependency.
const P = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
  sparkles: <><path d="M9.5 4l1.6 4.4L15.5 10l-4.4 1.6L9.5 16l-1.6-4.4L3.5 10l4.4-1.6z" /><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5" /><path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.8c1.8.8 3 2.6 3.5 5.2" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>,
  gift: <><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v8h14v-8M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zM12 8c2-4 6-4 6-1.5S15 8 12 8z" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 018 0v3.5M12 14.5v2.5" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4.2M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 005.3-1.6" /><path d="M9.9 9.9a3 3 0 004.2 4.2" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  refresh: <><path d="M20 11a8 8 0 10-2.3 5.7" /><path d="M20 4v7h-7" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /><rect x="9.5" y="9.5" width="5" height="5" /></>,
  bank: <><path d="M3 9l9-5 9 5M4 9h16M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18" /></>,
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  // QR / scanning — used by the footer "Scan & Connect" hub.
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" /></>,
  scan: <><path d="M3 8V5.5A2.5 2.5 0 015.5 3H8M16 3h2.5A2.5 2.5 0 0121 5.5V8M21 16v2.5a2.5 2.5 0 01-2.5 2.5H16M8 21H5.5A2.5 2.5 0 013 18.5V16" /><path d="M3.5 12h17" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><rect x="3" y="11" width="18" height="6" rx="2" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  signal: <path d="M4 20v-3M9 20v-7M14 20V9M19 20V4" />,
  bag: <><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  leaf: <><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19c3-4 6-7 10-9" /></>,
  cup: <><path d="M4 8h13v5a6 6 0 01-6 6h-1a6 6 0 01-6-6z" /><path d="M17 10h1.5a2.5 2.5 0 010 5H17M8 2.5v2M12 2.5v2" /></>,
  building: <><rect x="4" y="3" width="11" height="18" /><path d="M15 9h5v12h-5M7.5 7h4M7.5 11h4M7.5 15h4M3 21h18" /></>,
  truck: <><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" /></>,
  plane: <path d="M10.5 21l1.5-6-6.5-1.5L4 11l7.5 0L15 3h2l-1.5 8H21l1 2-6.5 1.5L17 21z" />,
  megaphone: <><path d="M3 10v4h4l8 5V5L7 10z" /><path d="M18 9a4 4 0 010 6M7 14l1.5 6" /></>,
  scale: <><path d="M12 3v18M7 21h10M4 7h16" /><path d="M6 7l-3 7a3 3 0 006 0zM18 7l-3 7a3 3 0 006 0z" /></>,
  landmark: <><path d="M3 21h18M4 10h16M12 3l8 5H4z" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /></>,
  flask: <><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 001.3 2h12.4a1.5 1.5 0 001.3-2L14 9V3" /><path d="M7 15h10" /></>,
  game: <><rect x="2.5" y="7" width="19" height="11" rx="5" /><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 13.5h.01" /></>,
  phone: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  paw: <><circle cx="6" cy="10" r="1.8" /><circle cx="10" cy="6" r="1.8" /><circle cx="14" cy="6" r="1.8" /><circle cx="18" cy="10" r="1.8" /><path d="M12 11c-3 0-6 4.5-5 7s3 1.5 5 1.5 4 1 5-1.5-2-7-5-7z" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="M12 7l4 3-1.5 5h-5L8 10zM12 3v4M21 10l-5 0M3 10l5 0M7 20l2.5-5M17 20l-2.5-5" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  cake: <><path d="M4 21V13h16v8M2 21h20M4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0" /><path d="M12 13V9M12 6.5c-1-1-1-2.5 0-3.5 1 1 1 2.5 0 3.5z" /></>,
  bot: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5M2 13v3M22 13v3" /><circle cx="12" cy="3.5" r="1" /></>,
  link: <><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></>,
  finger: <><path d="M7 11a5 5 0 0110 0v2M12 11v5c0 2-1 4-2 5M9 15c0 2-.5 3.5-1.5 4.5M15 14v2c0 2-.5 3.5-1 5M4.5 9A8 8 0 0119.5 9" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" /></>,
  pin: <><path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  puzzle: <path d="M10 3h4v2.5a1.5 1.5 0 003 0V3h4v7h-2.5a1.5 1.5 0 000 3H21v8h-7v-2.5a1.5 1.5 0 00-3 0V21H3v-8h2.5a1.5 1.5 0 000-3H3V3h7z" />,
  gate: <><path d="M4 21V5M20 21V5M4 8h16M4 14h16M9 8v6M15 8v6" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M18 5l2 2" /></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8z" />,
  pen: <><path d="M4 20l1-5L16 4l4 4L9 19z" /><path d="M13.5 6.5l4 4" /></>,
  fish: <><path d="M3 12c3-4 7-6 11-6 3 0 6 3 7 6-1 3-4 6-7 6-4 0-8-2-11-6z" /><path d="M3 12l-1-3M3 12l-1 3M16.5 11h.01" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6l8.5 7 8.5-7" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></>,
  onion: <><path d="M12 3c0 3-6 5-6 11a6 6 0 0012 0c0-6-6-8-6-11z" /><path d="M12 9c-1.5 2-3 3.5-3 6a3 3 0 006 0c0-2.5-1.5-4-3-6z" /></>,
  cookie: <><path d="M21 12.5A9 9 0 1111.5 3a3 3 0 003.5 3.5 3 3 0 003.5 3.5 3 3 0 002.5 2.5z" /><path d="M8 10h.01M9 15h.01M14 14h.01" /></>,
  id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2.2" /><path d="M5.5 16c.8-1.6 2-2.4 3.5-2.4s2.7.8 3.5 2.4M14.5 10h4M14.5 13.5h3" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" /><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  send: <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />,
  bell: <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4z" /><path d="M10 20a2 2 0 004 0" /></>,
  dashboard: <><rect x="3" y="3" width="8" height="10" rx="1.5" /><rect x="13" y="3" width="8" height="6" rx="1.5" /><rect x="13" y="11" width="8" height="10" rx="1.5" /><rect x="3" y="15" width="8" height="6" rx="1.5" /></>,
  sms: <><path d="M4 4h16v12H8l-4 4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.8" /><path d="M6 9.5v.01M18 14.5v.01" /></>,
  cart: <><path d="M3 4h2.5l2.2 10.5h10.5L20.5 7H7" /><circle cx="9.5" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
  basket: <><path d="M3 10h18l-2 10H5z" /><path d="M7.5 10l3-6M16.5 10l-3-6M9 14v3M12 14v3M15 14v3" /></>,
  card: <><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 9.5h19M6 15h4" /></>,
  upi: <><path d="M9 3l-5 9h5l-2 9 9-12h-5l3-6z" /></>,
  coin: <><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></>,
  wallet: <><path d="M3 7a2 2 0 012-2h13v4" /><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 13.5h.01" /></>,
  transfer: <><path d="M4 8h14l-4-4M20 16H6l4 4" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 01-8 0zM8 6H4a3 3 0 003 4M16 6h4a3 3 0 01-3 4M12 13v4M8 21h8M9 17h6v4" /></>,
  heart: <path d="M12 20s-8-4.8-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6.2-8 11-8 11z" />,
  quote: <path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5" />,
  map: <><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20c0 1-2 2-5 2" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" /></>,
  flag: <path d="M5 21V4M5 4h12l-2 4 2 4H5" />,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" /></>,
  thumb: <path d="M7 11v9H4v-9zM7 11l4-8c1.5 0 2.5 1 2.5 2.5V9H19a2 2 0 012 2.3l-1.2 7A2 2 0 0117.8 20H7" />,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></>,
  volume: <><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16.5 8.5a5 5 0 010 7M19.5 5.5a9 9 0 010 13" /></>,
  volumeOff: <><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l5 6M22 9l-5 6" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
  route: <><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M8.5 19H16a3.5 3.5 0 000-7H8a3.5 3.5 0 010-7h7.5" /></>
};

// Brand marks (filled)
const B = {
  whatsapp: (
    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 000-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.8 11.8 0 004.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.2-.2-.5-.3z" />
  ),
  instagram: (
    <path d="M12 7.3A4.7 4.7 0 1016.7 12 4.7 4.7 0 0012 7.3zm0 7.8a3.1 3.1 0 113.1-3.1 3.1 3.1 0 01-3.1 3.1zm6-8a1.1 1.1 0 11-1.1-1.1A1.1 1.1 0 0118 7.1zM21.9 8.2a5.4 5.4 0 00-1.5-3.9 5.5 5.5 0 00-3.9-1.5c-1.5-.1-6.1-.1-7.6 0a5.5 5.5 0 00-3.9 1.5A5.5 5.5 0 003.5 8.2c-.1 1.5-.1 6.1 0 7.6a5.4 5.4 0 001.5 3.9 5.5 5.5 0 003.9 1.5c1.5.1 6.1.1 7.6 0a5.4 5.4 0 003.9-1.5 5.5 5.5 0 001.5-3.9c.1-1.5.1-6.1 0-7.6zm-2 9.2a3.1 3.1 0 01-1.8 1.8c-1.2.5-4.1.4-5.4.4s-4.2.1-5.4-.4a3.1 3.1 0 01-1.8-1.8c-.5-1.2-.4-4.1-.4-5.4s-.1-4.2.4-5.4a3.1 3.1 0 011.8-1.8c1.2-.5 4.1-.4 5.4-.4s4.2-.1 5.4.4a3.1 3.1 0 011.8 1.8c.5 1.2.4 4.1.4 5.4s.1 4.2-.4 5.4z" />
  ),
  facebook: <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9a15.4 15.4 0 012.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z" />,
  linkedin: <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 013.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 112.1-2.1 2.1 2.1 0 01-2.1 2.1zm1.8 13.1H3.5V9h3.6zM22.2 0H1.8A1.7 1.7 0 000 1.7v20.6A1.7 1.7 0 001.8 24h20.4a1.7 1.7 0 001.8-1.7V1.7A1.7 1.7 0 0022.2 0z" />,
  x: <path d="M18.9 1.2h3.7l-8 9.1L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zm-1.3 19.5h2L6.5 3.2H4.3z" />,
  youtube: <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6z" />
};

export default function Icon({ name, size = 22, className = '', title, strokeWidth = 1.8 }) {
  const brand = B[name];
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' };
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={`icon icon-${name} ${className}`} fill="currentColor" {...a11y}>
        {brand}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`icon icon-${name} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {P[name] || P.spark}
    </svg>
  );
}
