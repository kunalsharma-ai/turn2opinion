// One-off blog covers, round 12 (Kunal, 20 Nov 2026: "give each blog cover its own design").
// The 22 newer posts used to fall back to their category world, so posts in the same category
// (for example the Trends & tech pair) looked alike. Each now has its own scene, palette and motion,
// drawn the same way as blogScenes.jsx: a 400 × 240 box, subject kept within x 70–330, no text,
// and only transform, opacity and stroke-dashoffset animate (classes in home.css).

function LG({ id, stops, x2 = 0, y2 = 1, x1 = 0, y1 = 0 }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([o, c, a = 1], k) => (
        <stop key={k} offset={o} stopColor={c} stopOpacity={a} />
      ))}
    </linearGradient>
  );
}
function RG({ id, stops, cx = 0.5, cy = 0.5, r = 0.5 }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      {stops.map(([o, c, a = 1], k) => (
        <stop key={k} offset={o} stopColor={c} stopOpacity={a} />
      ))}
    </radialGradient>
  );
}
const D = (s) => ({ '--d': `${s}s` });
const DT = (d, t) => ({ '--d': `${d}s`, '--t': `${t}s` });

/* AI and the future of surveys: a questionnaire card whose answers flow out into a neural net. */
function AiSurvey({ id }) {
  const nodes = [[250, 60], [300, 96], [250, 132], [300, 168], [350, 132], [350, 72]];
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#0c2a3f'], [1, '#13234f']]} />
        <RG id={`${id}g`} stops={[[0, '#41f0d1', 0.8], [1, '#41f0d1', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="70" y="50" width="120" height="150" rx="14" fill="#f4fbff" />
      <rect x="104" y="40" width="52" height="18" rx="8" fill="#41f0d1" />
      {[78, 108, 138, 168].map((y, k) => (
        <g key={k}>
          <rect x="86" y={y} width="16" height="16" rx="4" fill="none" stroke="#13234f" strokeWidth="2.4" />
          {k !== 2 && <path d={`M89 ${y + 8} l4 4 l7 -9`} fill="none" stroke="#1fb89c" strokeWidth="3" strokeLinecap="round" className="ba-tw" style={D(-k * 0.6)} />}
          <rect x="110" y={y + 5} width={58 - k * 6} height="6" rx="3" fill="#b9cbe0" />
        </g>
      ))}
      {nodes.map(([x, y], k) =>
        nodes.slice(k + 1).map(([x2, y2], j) =>
          Math.hypot(x2 - x, y2 - y) < 90 ? <line key={`${k}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#41f0d1" strokeOpacity=".35" strokeWidth="1.6" /> : null
        )
      )}
      <path d="M190 100 C 215 100 220 60 250 60 M190 130 C 220 130 220 132 250 132" fill="none" stroke="#41f0d1" strokeWidth="2.4" strokeDasharray="4 8" className="ba-dash" />
      {nodes.map(([x, y], k) => (
        <g key={k}>
          <circle cx={x} cy={y} r="18" fill={`url(#${id}g)`} className="ba-pulse" style={D(-k * 0.5)} />
          <circle cx={x} cy={y} r="7" fill="#e9fffb" />
        </g>
      ))}
    </>
  );
}

/* AI in everyday life: a kitchen counter, a smart speaker and its listening rings. */
function AiHome({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffd9c2'], [1, '#d9c7ff']]} />
        <LG id={`${id}s`} stops={[[0, '#4b3a73'], [1, '#2a2148']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="0" y="176" width="400" height="64" fill="#b48a6a" />
      <rect x="0" y="170" width="400" height="10" fill="#d8b391" />
      <rect x="250" y="40" width="70" height="60" rx="8" fill="#fff" opacity=".6" />
      <line x1="285" y1="40" x2="285" y2="100" stroke="#d9c7ff" strokeWidth="3" />
      {[0, 1, 2].map((k) => (
        <ellipse key={k} cx="180" cy="110" rx={44 + k * 26} ry={30 + k * 18} fill="none" stroke="#7c5cff" strokeOpacity={0.5 - k * 0.12} strokeWidth="3" className="ba-pulse" style={D(-k)} />
      ))}
      <rect x="150" y="84" width="60" height="90" rx="26" fill={`url(#${id}s)`} />
      <ellipse cx="180" cy="88" rx="28" ry="8" fill="#6c55a8" />
      <ellipse cx="180" cy="88" rx="20" ry="4" fill="#41e0ff" className="ba-glow" />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={164 + k * 7} y="120" width="4" height="26" rx="2" fill="#41e0ff" className="ba-grow" style={D(-k * 0.35)} />
      ))}
      <g className="ba-bob" style={DT(-1, 4)}>
        <rect x="96" y="132" width="34" height="40" rx="6" fill="#fff" />
        <path d="M130 140 q14 4 0 18" fill="none" stroke="#fff" strokeWidth="4" />
      </g>
    </>
  );
}

/* Creator economy: a vertical video frame under a ring light, hearts floating up. */
function Creator({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ff4f8b'], [1, '#ff9a3d']]} x2="1" y2="1" />
        <LG id={`${id}p`} stops={[[0, '#2b0f3a'], [1, '#160822']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="112" r="92" fill="none" stroke="#fff6e6" strokeWidth="12" opacity=".9" className="ba-glow" />
      <rect x="160" y="40" width="80" height="150" rx="16" fill={`url(#${id}p)`} />
      <rect x="168" y="52" width="64" height="118" rx="8" fill="#ff7aa8" opacity=".35" />
      <path d="M188 92 L218 112 L188 132 Z" fill="#fff" className="ba-pulse" />
      <rect x="170" y="160" width="60" height="4" rx="2" fill="#fff" opacity=".4" />
      <rect x="170" y="160" width="26" height="4" rx="2" fill="#fff" />
      <line x1="200" y1="204" x2="200" y2="240" stroke="#2b0f3a" strokeWidth="6" />
      {[[110, 200], [290, 210], [130, 220], [300, 190], [270, 230]].map(([x, y], k) => (
        <path key={k} className="ba-rise" style={DT(-k * 1.1, 5 + k * 0.4)} d={`M${x} ${y} c -8 -10 -20 0 0 14 c 20 -14 8 -24 0 -14 z`} fill={k % 2 ? '#fff' : '#ffe14d'} />
      ))}
    </>
  );
}

/* Deepfakes and trust: two near-identical faces, a magnifier scanning and glitch bars. */
function Deepfake({ id }) {
  const face = (x, c) => (
    <g>
      <ellipse cx={x} cy="112" rx="44" ry="56" fill={c} />
      <ellipse cx={x - 16} cy="102" rx="6" ry="8" fill="#0d1726" />
      <ellipse cx={x + 16} cy="102" rx="6" ry="8" fill="#0d1726" />
      <path d={`M${x - 16} 138 q16 12 32 0`} fill="none" stroke="#0d1726" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#0f1b2d'], [1, '#22324b']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {face(140, '#9fe4ff')}
      {face(260, '#ffb1b1')}
      {[[220, 80, 70], [236, 120, 50], [214, 150, 80]].map(([x, y, w], k) => (
        <rect key={k} x={x} y={y} width={w} height="6" fill="#ff4d6d" opacity=".75" className="ba-tw" style={D(-k * 0.4)} />
      ))}
      <g className="ba-bob" style={DT(0, 3.6)}>
        <circle cx="200" cy="176" r="30" fill="#ffffff" fillOpacity=".12" stroke="#eaf4ff" strokeWidth="6" />
        <line x1="222" y1="198" x2="252" y2="228" stroke="#eaf4ff" strokeWidth="10" strokeLinecap="round" />
      </g>
      <rect x="70" y="56" width="260" height="3" fill="#41e0ff" className="ba-scan" />
    </>
  );
}

/* EV sentiment: an electric car on a coastal road, a charging bolt, a turning wind turbine. */
function EvRoad({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#b8f2e6'], [1, '#7cc6fe']]} />
        <LG id={`${id}c`} stops={[[0, '#ffffff'], [1, '#d6e4f0']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M0 150 C 90 120 160 160 240 130 S 360 120 400 140 V240 H0Z" fill="#5fb49c" />
      <rect y="176" width="400" height="64" fill="#3b4a5a" />
      <line x1="0" x2="400" y1="208" y2="208" stroke="#fff" strokeWidth="4" strokeDasharray="22 18" className="ba-dash" />
      <g transform="translate(300 50)">
        <rect x="-2" y="0" width="4" height="100" fill="#fff" />
        <g className="ba-spin" style={{ '--t': '6s' }}>
          <circle r="34" fill="none" />
          {[0, 120, 240].map((a) => (
            <path key={a} d="M0 0 L-5 -32 Q0 -36 5 -32 Z" fill="#fff" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="5" fill="#e3edf5" />
      </g>
      <g className="ba-bob" style={DT(0, 4)}>
        <path d="M110 176 L120 150 Q130 136 160 134 L220 134 Q244 136 258 152 L284 158 Q296 162 296 176 Z" fill={`url(#${id}c)`} />
        <path d="M138 150 L150 140 L186 140 L186 152 Z M194 140 L222 140 L240 152 L194 152 Z" fill="#7cc6fe" />
        <circle cx="146" cy="178" r="15" fill="#1f2a36" />
        <circle cx="262" cy="178" r="15" fill="#1f2a36" />
        <circle cx="146" cy="178" r="6" fill="#cfd8e3" />
        <circle cx="262" cy="178" r="6" fill="#cfd8e3" />
      </g>
      <path d="M206 64 L190 96 L204 96 L194 124 L222 86 L208 86 L218 64 Z" fill="#ffd93d" className="ba-pulse" />
    </>
  );
}

/* Exam season: a night desk, a stack of books, a tablet with a filling progress ring, a lamp. */
function StudyDesk({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#1d2a5c'], [1, '#2f3f7a']]} />
        <RG id={`${id}l`} stops={[[0, '#ffe58a', 0.8], [1, '#ffe58a', 0]]} cy={0.1} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M250 60 L150 200 L350 200 Z" fill={`url(#${id}l)`} className="ba-glow" />
      <path d="M236 30 L270 30 L280 60 L226 60 Z" fill="#ffcb47" />
      <line x1="253" y1="30" x2="300" y2="0" stroke="#ffcb47" strokeWidth="5" />
      <rect y="196" width="400" height="44" fill="#8a5a3c" />
      {[[80, 176, '#ff6b6b', 96], [86, 158, '#4ecdc4', 84], [76, 140, '#ffe66d', 100], [90, 122, '#a78bfa', 76]].map(([x, y, c, w], k) => (
        <rect key={k} x={x} y={y} width={w} height="18" rx="3" fill={c} />
      ))}
      <rect x="210" y="104" width="110" height="88" rx="10" fill="#0f1733" stroke="#e6ecff" strokeWidth="4" />
      <circle cx="265" cy="148" r="26" fill="none" stroke="#2f3f7a" strokeWidth="8" />
      <circle cx="265" cy="148" r="26" fill="none" stroke="#7af0c1" strokeWidth="8" strokeLinecap="round" pathLength="100" strokeDasharray="70 100" className="ba-ring" transform="rotate(-90 265 148)" />
      <g className="ba-bob" style={DT(-0.6, 3.4)}>
        <rect x="170" y="150" width="8" height="46" rx="2" fill="#ffd166" transform="rotate(20 174 173)" />
      </g>
      {[[40, 30], [120, 50], [360, 90], [330, 30]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="2" fill="#fff" className="ba-tw" style={D(-k)} />
      ))}
    </>
  );
}

/* Family money talk: a round table seen from above, three bubbles of different sizes, a coin. */
function FamilyTable({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#fbe3cf'], [1, '#f2c6a6']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <ellipse cx="200" cy="180" rx="150" ry="40" fill="#c0603e" />
      <ellipse cx="200" cy="174" rx="150" ry="40" fill="#e07a52" />
      {[[110, 70, 46, '#ffffff'], [210, 52, 56, '#fff4d6'], [300, 82, 38, '#ffffff']].map(([x, y, r, c], k) => (
        <g key={k} className="ba-bob" style={DT(-k * 0.9, 4 + k * 0.5)}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill={c} />
          <path d={`M${x - 8} ${y + r * 0.62} l -10 18 l 22 -12 z`} fill={c} />
          {k === 1 ? (
            <g>
              <circle cx={x} cy={y} r="16" fill="#ffc83d" />
              <circle cx={x} cy={y} r="10" fill="none" stroke="#fff6cf" strokeWidth="2.4" />
            </g>
          ) : (
            [0, 1, 2].map((j) => <circle key={j} cx={x - 12 + j * 12} cy={y} r="4" fill="#c0603e" className="ba-tw" style={D(-j * 0.3)} />)
          )}
        </g>
      ))}
      {[[120, 158], [200, 150], [280, 158]].map(([x, y], k) => (
        <g key={k}>
          <ellipse cx={x} cy={y + 14} rx="18" ry="6" fill="#fff" opacity=".85" />
          <rect x={x - 5} y={y - 6} width="10" height="18" rx="3" fill="#7a4b9a" opacity=".8" />
        </g>
      ))}
    </>
  );
}

/* Teens earning safely: a jar filling with coins under a protective shield. */
function SafeJar({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#2b1a5e'], [1, '#4a2a8a']]} />
        <LG id={`${id}s`} stops={[[0, '#c6ff4d'], [1, '#4dffb8']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M200 26 L276 52 V110 C276 160 240 190 200 206 C160 190 124 160 124 110 V52 Z" fill="none" stroke={`url(#${id}s)`} strokeWidth="6" className="ba-glow" />
      <rect x="164" y="96" width="72" height="88" rx="16" fill="#ffffff" fillOpacity=".16" stroke="#e9e3ff" strokeWidth="4" />
      <rect x="170" y="86" width="60" height="12" rx="4" fill="#e9e3ff" />
      {[0, 1, 2, 3].map((k) => (
        <ellipse key={k} cx="200" cy={172 - k * 12} rx="26" ry="6" fill="#ffd23f" stroke="#c99400" strokeWidth="1.5" />
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k} className="ba-fall" style={DT(-k * 1.6, 4.8)}>
          <circle cx={186 + k * 14} cy="-20" r="9" fill="#ffd23f" />
        </g>
      ))}
      {[[80, 60], [330, 70], [96, 180], [312, 170]].map(([x, y], k) => (
        <path key={k} d={`M${x} ${y - 8} L${x + 3} ${y - 2} L${x + 9} ${y} L${x + 3} ${y + 2} L${x} ${y + 8} L${x - 3} ${y + 2} L${x - 9} ${y} L${x - 3} ${y - 2} Z`} fill="#c6ff4d" className="ba-tw" style={D(-k * 0.7)} />
      ))}
    </>
  );
}

/* Parental consent: a form with two signature lines, both ticks drawing in, and a shared key. */
function ConsentForm({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#dff3ff'], [1, '#d8f7e6']]} x2="1" y2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <g transform="rotate(-4 200 120)">
        <rect x="120" y="30" width="160" height="190" rx="12" fill="#fff" stroke="#b6d6ee" strokeWidth="2" />
        {[54, 70, 86].map((y, k) => (
          <rect key={k} x="140" y={y} width={120 - k * 20} height="6" rx="3" fill="#d4e3f0" />
        ))}
        {[120, 168].map((y, k) => (
          <g key={k}>
            <circle cx="152" cy={y} r="13" fill={k ? '#dff7ea' : '#e2f0ff'} />
            <path d={`M145 ${y} l5 6 l10 -12`} fill="none" stroke={k ? '#1fa463' : '#2f6bff'} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="30" className="ba-ring" style={D(-k * 1.5)} />
            <path d={`M176 ${y + 6} c 10 -14 18 8 28 -6 s 16 10 30 -4 s 14 6 22 0`} fill="none" stroke="#3a4a5a" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="176" x2="262" y1={y + 12} y2={y + 12} stroke="#c3d3e2" strokeWidth="2" />
          </g>
        ))}
      </g>
      <g className="ba-bob" style={DT(-1, 4.4)}>
        <circle cx="320" cy="70" r="16" fill="none" stroke="#ffb703" strokeWidth="6" />
        <path d="M320 86 V128 M320 108 h10 M320 120 h8" stroke="#ffb703" strokeWidth="6" strokeLinecap="round" />
      </g>
    </>
  );
}

/* Quick commerce: a scooter racing a stopwatch, speed lines and a delivery bag. */
function Scooter({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffb347'], [1, '#ff7b54']]} x2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect y="190" width="400" height="50" fill="#2c3e50" />
      {[60, 96, 132].map((y, k) => (
        <line key={k} x1={20 + k * 10} x2={120 + k * 10} y1={y} y2={y} stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" strokeDasharray="30 20" className="ba-dash" />
      ))}
      <g className="ba-bob" style={DT(0, 1.6)}>
        <rect x="170" y="96" width="56" height="50" rx="8" fill="#16a085" />
        <path d="M180 96 q18 -18 36 0" fill="none" stroke="#0e6655" strokeWidth="5" />
        <path d="M150 170 L240 170 L270 120 L284 120" fill="none" stroke="#ecf0f1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M150 150 h80 v20 h-80 z" fill="#e74c3c" />
        <circle cx="160" cy="184" r="16" fill="#1b2631" />
        <circle cx="264" cy="184" r="16" fill="#1b2631" />
        <circle cx="160" cy="184" r="6" fill="#bdc3c7" />
        <circle cx="264" cy="184" r="6" fill="#bdc3c7" />
      </g>
      <g transform="translate(296 66)">
        <circle r="30" fill="#fff" />
        <rect x="-6" y="-46" width="12" height="10" rx="3" fill="#fff" />
        <circle r="34" fill="none" stroke="#16a085" strokeWidth="5" />
        <g className="ba-spin" style={{ '--t': '3s' }}>
          <circle r="26" fill="none" />
          <line x1="0" y1="0" x2="0" y2="-24" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle r="4" fill="#2c3e50" />
      </g>
    </>
  );
}

/* Hybrid work: a home and an office joined by an arc, a laptop travelling between them. */
function Hybrid({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#e4efe0'], [1, '#f5e6c8']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect y="196" width="400" height="44" fill="#a3b18a" />
      <g>
        <path d="M70 196 V140 L110 108 L150 140 V196 Z" fill="#dda15e" />
        <path d="M62 144 L110 102 L158 144" fill="none" stroke="#bc6c25" strokeWidth="8" strokeLinejoin="round" />
        <rect x="98" y="160" width="24" height="36" fill="#606c38" />
        <rect x="80" y="148" width="14" height="14" fill="#fefae0" className="ba-tw" />
      </g>
      <g>
        <rect x="262" y="70" width="70" height="126" fill="#588157" />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={272 + c * 20} y={82 + r * 22} width="12" height="12" fill="#e9f5db" className="ba-tw" style={D(-(r + c) * 0.4)} />)
        )}
      </g>
      <path d="M130 106 Q 200 10 280 66" fill="none" stroke="#bc6c25" strokeWidth="3" strokeDasharray="6 8" className="ba-dash" />
      <g className="ba-bob" style={DT(0, 3)}>
        <rect x="178" y="50" width="48" height="32" rx="4" fill="#283618" />
        <rect x="183" y="55" width="38" height="22" fill="#a7c957" />
        <rect x="172" y="82" width="60" height="6" rx="3" fill="#283618" />
      </g>
    </>
  );
}

/* Subscription fatigue: a stack of app tiles under a renewing loop, a battery running low. */
function SubStack({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#3d3557'], [1, '#5c4d7d']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[['#ff6b6b', 0], ['#4ecdc4', 1], ['#ffe66d', 2], ['#a78bfa', 3], ['#f78fb3', 4]].map(([c, k]) => (
        <rect key={k} x={110 + k * 12} y={70 + k * 22} width="110" height="56" rx="12" fill={c} stroke="#2a2340" strokeWidth="3" className="ba-bob" style={DT(-k * 0.5, 4)} />
      ))}
      <g transform="translate(290 90)">
        <g className="ba-spin" style={{ '--t': '5s' }}>
          <path d="M-34 0 A34 34 0 1 1 0 34" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <path d="M-6 26 L0 34 L-8 42" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g transform="translate(266 160)">
        <rect width="64" height="30" rx="6" fill="none" stroke="#fff" strokeWidth="4" />
        <rect x="64" y="9" width="6" height="12" rx="2" fill="#fff" />
        <rect x="6" y="6" width="12" height="18" rx="2" fill="#ff4d6d" className="ba-tw" />
      </g>
    </>
  );
}

/* Sustainable shopping: a tote bag with a sprouting leaf, a recycling loop and drifting leaves. */
function Tote({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#f1f8e9'], [1, '#c5e1a5']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <g transform="translate(300 72)">
        <g className="ba-spin" style={{ '--t': '9s' }}>
          {[0, 120, 240].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M-10 -34 L14 -34 L22 -20 M22 -20 L28 -30 M22 -20 L10 -20" fill="none" stroke="#2e7d32" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </g>
      </g>
      <path d="M150 90 q 50 -70 100 0" fill="none" stroke="#8d6e63" strokeWidth="8" />
      <path d="M126 90 H274 L262 210 H138 Z" fill="#d7ccc8" />
      <path d="M126 90 H274 L272 104 H128 Z" fill="#bcaaa4" />
      <path d="M200 190 V140" stroke="#2e7d32" strokeWidth="5" />
      <path d="M200 150 C 170 140 166 116 180 106 C 196 116 204 134 200 150 Z" fill="#43a047" className="ba-sway" style={{ transformOrigin: '200px 150px' }} />
      <path d="M200 160 C 230 152 238 130 226 120 C 210 128 200 146 200 160 Z" fill="#66bb6a" />
      {[[80, 0], [120, 1], [340, 2], [60, 3]].map(([x, k]) => (
        <path key={k} className="ba-fall leaf" style={DT(-k * 1.7, 7)} d={`M${x} -10 c 8 -8 18 -4 16 6 c -10 4 -16 2 -16 -6 z`} fill={k % 2 ? '#7cb342' : '#aed581'} />
      ))}
    </>
  );
}

/* Teen gaming: a neon controller over a pixel skyline, hearts and a high-score glow. */
function Controller({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#12002b'], [1, '#2d0a5c']]} />
        <LG id={`${id}c`} stops={[[0, '#7b2ff7'], [1, '#f107a3']]} x2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[30, 70, 110, 290, 330, 370].map((x, k) => (
        <rect key={k} x={x - 14} y={150 - (k % 3) * 22} width="28" height={90 + (k % 3) * 22} fill="#1d0b45" />
      ))}
      <path d="M118 100 Q118 72 150 72 H250 Q282 72 282 100 L300 168 Q306 192 282 190 Q266 190 252 166 H148 Q134 190 118 190 Q94 192 100 168 Z" fill={`url(#${id}c)`} className="ba-bob" style={DT(0, 3.6)} />
      <g className="ba-bob" style={DT(0, 3.6)}>
        <rect x="138" y="108" width="40" height="12" rx="3" fill="#0ff0fc" />
        <rect x="152" y="94" width="12" height="40" rx="3" fill="#0ff0fc" />
        {[[244, 102, '#ffe600'], [264, 118, '#00ff9c'], [224, 118, '#ff5e5e'], [244, 134, '#0ff0fc']].map(([x, y, c], k) => (
          <circle key={k} cx={x} cy={y} r="8" fill={c} className="ba-tw" style={D(-k * 0.4)} />
        ))}
      </g>
      {[[90, 50], [320, 44], [200, 30]].map(([x, y], k) => (
        <path key={k} className="ba-pulse" style={D(-k)} d={`M${x} ${y} h6 v-6 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 z`} fill="#ff5ec4" />
      ))}
    </>
  );
}

/* Teen money habits: a piggy bank with a coin on the way in and three growing savings bars. */
function Piggy({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffe3ef'], [1, '#d3f8ec']]} x2="1" y2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={270 + k * 26} y={200 - (40 + k * 30)} width="18" height={40 + k * 30} rx="5" fill={['#7bdcb5', '#4fc3a1', '#26a69a'][k]} className="ba-grow" style={D(-k * 0.6)} />
      ))}
      <rect y="200" width="400" height="40" fill="#f8bbd0" />
      <g className="ba-bob" style={DT(0, 4)}>
        <ellipse cx="170" cy="140" rx="70" ry="52" fill="#ff8fb7" />
        <circle cx="236" cy="136" r="18" fill="#ff7aa8" />
        <circle cx="232" cy="134" r="3" fill="#a3315c" />
        <circle cx="242" cy="134" r="3" fill="#a3315c" />
        <circle cx="198" cy="118" r="5" fill="#3b1a2b" />
        <path d="M150 90 l12 -18 l10 20 z" fill="#ff7aa8" />
        <rect x="150" y="90" width="34" height="6" rx="3" fill="#a3315c" />
        <rect x="120" y="182" width="16" height="20" rx="4" fill="#ff7aa8" />
        <rect x="196" y="182" width="16" height="20" rx="4" fill="#ff7aa8" />
      </g>
      <g className="ba-fall soft" style={DT(0, 3)}>
        <circle cx="167" cy="30" r="12" fill="#ffd23f" stroke="#d4a106" strokeWidth="2" />
      </g>
    </>
  );
}

/* Parent's guide to teen surveys: a house outline sheltering two figures and a shared tick. */
function HomeTwo({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffd6c9'], [1, '#c9d4ff']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M100 210 V110 L200 40 L300 110 V210" fill="none" stroke="#3d348b" strokeWidth="8" strokeLinejoin="round" />
      <g>
        <circle cx="168" cy="118" r="20" fill="#f7a072" />
        <path d="M134 210 Q134 148 168 148 Q202 148 202 210 Z" fill="#3d348b" />
      </g>
      <g className="ba-bob" style={DT(-0.5, 3.8)}>
        <circle cx="236" cy="140" r="15" fill="#e8885a" />
        <path d="M210 210 Q210 164 236 164 Q262 164 262 210 Z" fill="#f35b04" />
      </g>
      <g transform="translate(202 86)">
        <circle r="18" fill="#fff" className="ba-pulse" />
        <path d="M-8 0 l6 6 l11 -12" fill="none" stroke="#1fa463" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

/* Teen privacy checklist: three toggle switches flicking on beside an eye that blinks shut. */
function Toggles({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#073b4c'], [1, '#0b6e72']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[0, 1, 2].map((k) => (
        <g key={k} transform={`translate(84 ${62 + k * 56})`}>
          <rect width="80" height="36" rx="18" fill="#118ab2" opacity=".5" />
          <rect width="80" height="36" rx="18" fill="#ffd166" className="ba-tw" style={D(-k * 0.9)} />
          <circle cx="62" cy="18" r="14" fill="#fff" />
          <rect x="92" y="12" width={60 - k * 12} height="12" rx="6" fill="#e0fbfc" opacity=".8" />
        </g>
      ))}
      <g transform="translate(288 110)">
        <path d="M-40 0 Q0 -36 40 0 Q0 36 -40 0 Z" fill="#e0fbfc" />
        <circle r="14" fill="#073b4c" />
        <line x1="-40" y1="30" x2="40" y2="-30" stroke="#ef476f" strokeWidth="6" strokeLinecap="round" className="ba-pulse" />
      </g>
    </>
  );
}

/* Screen-time balance: a seesaw rocking between a phone and a football under a sun and moon. */
function Seesaw({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffcf99'], [0.5, '#a0c4ff'], [1, '#3a3f8f']]} x2="1" y2="0" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="70" cy="56" r="24" fill="#ffe066" className="ba-pulse" />
      <path d="M340 40 a22 22 0 1 0 18 34 a18 18 0 1 1 -18 -34 z" fill="#f1f1ff" />
      <rect y="200" width="400" height="40" fill="#5c8a5c" />
      <path d="M186 200 L200 170 L214 200 Z" fill="#6b4f3a" />
      <g className="ba-rock" style={{ transformOrigin: '200px 168px' }}>
        <rect x="80" y="162" width="240" height="10" rx="5" fill="#8d5a3b" />
        <rect x="94" y="110" width="30" height="52" rx="6" fill="#222" />
        <rect x="98" y="116" width="22" height="38" rx="3" fill="#7fd8ff" />
        <circle cx="290" cy="146" r="16" fill="#fff" />
        <path d="M290 130 l6 10 l-6 8 l-6 -8 z M276 144 l8 2 M304 144 l-8 2" fill="#222" stroke="#222" strokeWidth="2" />
      </g>
    </>
  );
}

/* Spotting scams: a chat bubble with a red flag waving and a warning triangle pulsing. */
function RedFlag({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#2b0f1a'], [1, '#5a1a2a']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="80" y="60" width="180" height="110" rx="20" fill="#fff4e6" />
      <path d="M110 170 l-10 30 l34 -30 z" fill="#fff4e6" />
      {[86, 106, 126, 146].map((y, k) => (
        <rect key={k} x="104" y={y} width={130 - k * 18} height="8" rx="4" fill="#e8cfc0" />
      ))}
      <g transform="translate(250 50)">
        <rect x="0" y="0" width="5" height="86" rx="2" fill="#f5f5f5" />
        <path className="ba-sway" style={{ transformOrigin: '252px 54px' }} d="M5 4 Q30 -6 50 6 Q38 18 50 34 Q30 24 5 32 Z" fill="#ff3b3b" />
      </g>
      <g transform="translate(318 152)" className="ba-pulse">
        <path d="M0 -30 L28 20 H-28 Z" fill="#ffb703" stroke="#ffb703" strokeWidth="6" strokeLinejoin="round" />
        <rect x="-3" y="-12" width="6" height="18" rx="3" fill="#2b0f1a" />
        <circle cy="12" r="3.5" fill="#2b0f1a" />
      </g>
    </>
  );
}

/* Digital payments: two phones, a QR on one, a scan line, and a rupee coin hopping across. */
function UpiPhones({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ff9933'], [0.5, '#fff7ec'], [1, '#138808']]} x2="0" y2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect width="400" height="240" fill="#0b1d3a" opacity=".82" />
      {[[100, '#ffffff'], [240, '#e8fff0']].map(([x, c], k) => (
        <g key={k} transform={`translate(${x} 46)`}>
          <rect width="70" height="140" rx="12" fill="#11233f" stroke="#cfd8ff" strokeWidth="3" />
          <rect x="8" y="16" width="54" height="104" rx="4" fill={c} />
          {k === 0 &&
            [0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4].map((cc) => ((r * 3 + cc * 7) % 3 ? <rect key={`${r}${cc}`} x={14 + cc * 9} y={40 + r * 9} width="8" height="8" fill="#0b1d3a" /> : null))
            )}
          {k === 0 && <rect x="12" y="38" width="46" height="3" fill="#ff9933" className="ba-scan" />}
          {k === 1 && (
            <path d="M24 70 l10 10 l18 -22" fill="none" stroke="#138808" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="44" className="ba-ring" />
          )}
        </g>
      ))}
      <path d="M176 110 Q205 70 236 110" fill="none" stroke="#ff9933" strokeWidth="3" strokeDasharray="5 7" className="ba-dash" />
      <g className="ba-bob" style={DT(0, 2.4)}>
        <circle cx="206" cy="84" r="16" fill="#ffd23f" stroke="#d4a106" strokeWidth="2" />
        <path d="M199 77 h14 M199 82 h14 M201 77 q10 0 6 9 l-6 0 l9 10" fill="none" stroke="#7a5200" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </>
  );
}

/* Wellness wearables: a smartwatch with a running heart trace and three activity rings. */
function Watch({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffe0d6'], [1, '#c8f4e8']]} x2="1" y2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="168" y="0" width="64" height="240" rx="18" fill="#264653" />
      <rect x="134" y="54" width="132" height="132" rx="34" fill="#1d1d1f" />
      <rect x="146" y="66" width="108" height="108" rx="26" fill="#000" />
      {[[34, '#ff375f'], [26, '#30d158'], [18, '#64d2ff']].map(([r, c], k) => (
        <g key={k} transform="translate(200 108)">
          <circle r={r} fill="none" stroke={c} strokeOpacity=".22" strokeWidth="7" />
          <circle r={r} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" pathLength="100" strokeDasharray={`${60 + k * 12} 100`} transform="rotate(-90)" className="ba-ring" style={D(-k)} />
        </g>
      ))}
      <path d="M150 158 h22 l6 -10 l8 18 l8 -24 l8 16 h48" fill="none" stroke="#ff375f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 6" className="ba-dash" />
      <rect x="266" y="100" width="8" height="20" rx="3" fill="#3a3a3c" />
    </>
  );
}

/* Why brands ask teens: a megaphone sending waves toward a shelf of products that light up. */
function Megaphone({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffe45e'], [1, '#ff6392']]} x2="1" />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <g transform="rotate(-10 120 130)">
        <path d="M80 110 L150 80 V180 L80 150 Z" fill="#5aa9e6" />
        <rect x="64" y="108" width="20" height="44" rx="6" fill="#3d5a80" />
        <rect x="150" y="76" width="10" height="108" rx="4" fill="#3d5a80" />
        <path d="M96 150 l10 34 h14 l-8 -28" fill="#3d5a80" />
      </g>
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${172 + k * 20} 90 q 18 40 0 80`} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" className="ba-pulse" style={D(-k * 0.4)} />
      ))}
      <rect x="236" y="60" width="96" height="6" rx="3" fill="#7a3b69" />
      <rect x="236" y="128" width="96" height="6" rx="3" fill="#7a3b69" />
      <rect x="236" y="196" width="96" height="6" rx="3" fill="#7a3b69" />
      {[[244, 30, '#7fc8f8'], [280, 38, '#f9c80e'], [308, 26, '#ff6392'], [246, 98, '#a5e6ba'], [278, 92, '#ffffff'], [308, 104, '#7fc8f8'], [250, 166, '#f9c80e'], [284, 160, '#a5e6ba']].map(([x, y, c], k) => (
        <rect key={k} x={x} y={y} width="24" height={(k % 2 ? 30 : 28) - 0} rx="4" fill={c} className="ba-bob" style={DT(-k * 0.3, 2.6)} />
      ))}
    </>
  );
}

export const SCENES2 = {
  'ai-and-market-research-future-surveys': AiSurvey,
  'ai-in-everyday-life-consumer-opinions': AiHome,
  'creator-economy-short-video': Creator,
  'deepfakes-misinformation-trust': Deepfake,
  'electric-vehicles-consumer-sentiment': EvRoad,
  'exam-season-study-apps-teens': StudyDesk,
  'family-conversations-about-money-online': FamilyTable,
  'how-teens-can-earn-money-online-safely': SafeJar,
  'parental-consent-online-research-explained': ConsentForm,
  'quick-commerce-10-minute-delivery-trend': Scooter,
  'remote-hybrid-work-2026': Hybrid,
  'subscription-fatigue': SubStack,
  'sustainable-shopping-trends': Tote,
  'teen-gaming-trends-2026': Controller,
  'teen-money-habits-first-rewards': Piggy,
  'teen-paid-surveys-parent-guide': HomeTwo,
  'teen-privacy-checklist': Toggles,
  'teen-screen-time-balance': Seesaw,
  'teens-spot-online-scams': RedFlag,
  'upi-digital-payments-trends': UpiPhones,
  'wellness-wearables-health-tech': Watch,
  'why-brands-want-teen-opinions': Megaphone
};
