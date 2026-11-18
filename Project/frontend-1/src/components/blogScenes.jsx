// One-off blog covers, round 9 (Kunal, 18 Nov 2026): "all design are repeatedly … give fresh blog
// cover images". Every post now has its own hand-drawn scene about its own subject, with its own
// palette, composition and motion. No two covers share a motif or a colour grade, and none has text.
//
// Each scene draws into a 400 × 240 box. Thumbnails crop the sides, so the subject stays roughly
// within x 70–330. Only transform, opacity and stroke-dashoffset animate (classes in home.css).
// `id` keeps gradient ids unique when several covers share a page.

/** Linear gradient helper: stops is [[offset, colour, opacity?], …]. */
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

/* 1 · Realistic guide: a dawn mountain range, a winding trail and a flag on the summit. */
function Summit({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}s`} stops={[[0, '#ffb38a'], [0.55, '#f6a6c1'], [1, '#b9a7f2']]} />
        <RG id={`${id}u`} stops={[[0, '#fff7d6'], [0.6, '#ffd27a'], [1, '#ffd27a', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}s)`} />
      <circle cx="270" cy="96" r="58" fill={`url(#${id}u)`} className="ba-pulse" />
      <circle cx="270" cy="96" r="26" fill="#fff4cf" />
      <path d="M0 170 L70 110 L120 150 L190 70 L250 140 L300 100 L400 160 V240 H0 Z" fill="#8f6bb8" opacity=".55" />
      <path d="M0 190 L90 130 L150 170 L210 54 L280 160 L340 120 L400 180 V240 H0 Z" fill="#5d3f8f" />
      <path d="M210 54 L228 88 L216 82 L206 94 L196 80 Z" fill="#fff" opacity=".85" />
      <path d="M60 240 C 110 220 90 200 140 190 S 180 150 200 120 S 206 80 210 60" fill="none" stroke="#ffe3b3" strokeWidth="3" strokeDasharray="5 7" className="ba-dash" />
      <g transform="translate(210 56)">
        <rect x="-1" y="-34" width="2.5" height="36" fill="#fff" />
        <path className="ba-wavy" d="M1.5 -34 L28 -28 L1.5 -20 Z" fill="#ff5e7a" />
      </g>
      <path d="M0 214 C 80 196 140 230 220 210 S 340 200 400 220 V240 H0 Z" fill="#3a2766" />
      {[[96, 70], [124, 58], [150, 76]].map(([x, y], k) => (
        <path key={k} className="ba-bob" style={DT(-k * 0.8, 4 + k)} d={`M${x} ${y} q 6 -6 12 0 q 6 -6 12 0`} fill="none" stroke="#5d3f8f" strokeWidth="2" strokeLinecap="round" />
      ))}
    </>
  );
}

/* 2 · Without investment: a sapling in a pot whose leaves are coins, popping in one by one. */
function CoinTree({ id }) {
  const coins = [[170, 92], [220, 74], [246, 112], [188, 128], [206, 104], [150, 118], [236, 140]];
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#d9fbe8'], [1, '#9be7c4']]} />
        <RG id={`${id}c`} cx={0.35} cy={0.3} stops={[[0, '#fff6c9'], [0.55, '#ffcf3f'], [1, '#d38b00']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="80" cy="50" r="90" fill="#fff" opacity=".35" className="ba-drift" />
      <circle cx="340" cy="210" r="110" fill="#5fd3a1" opacity=".25" className="ba-drift d1" />
      <path d="M200 196 C 198 160 204 140 200 100 M200 150 C 182 140 172 126 170 104 M201 132 C 220 124 236 108 240 90 M200 170 C 214 160 228 156 238 146" fill="none" stroke="#2f7d52" strokeWidth="5" strokeLinecap="round" />
      {coins.map(([x, y], k) => (
        <g key={k} className="ba-pop" style={D(k * 0.45)}>
          <circle cx={x} cy={y} r="13" fill={`url(#${id}c)`} />
          <circle cx={x} cy={y} r="8" fill="none" stroke="#fff3c0" strokeWidth="2" />
        </g>
      ))}
      <path d="M150 196 H250 L238 236 H162 Z" fill="#e07a4f" />
      <rect x="144" y="190" width="112" height="14" rx="4" fill="#f2946a" />
      <g className="ba-fall" style={DT(-1, 5)}>
        <circle cx="300" cy="10" r="8" fill={`url(#${id}c)`} />
      </g>
      <g className="ba-fall" style={DT(-3.2, 6)}>
        <circle cx="110" cy="10" r="6" fill={`url(#${id}c)`} />
      </g>
    </>
  );
}

/* 3 · Complete guide: a brass compass on a teal chart with routes being traced. */
function Compass({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} stops={[[0, '#0c4f5a'], [1, '#12354f']]} />
        <RG id={`${id}g`} cx={0.4} cy={0.35} stops={[[0, '#fff1c2'], [0.6, '#e2b04a'], [1, '#8a5a12']]} />
        <pattern id={`${id}p`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 H0 V24" fill="none" stroke="#7fd6d0" strokeOpacity=".16" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect width="400" height="240" fill={`url(#${id}p)`} />
      <path d="M40 200 C 100 150 120 210 170 170 M260 60 C 300 90 330 60 370 100 M60 50 C 110 70 120 40 150 70" fill="none" stroke="#ffd98a" strokeWidth="2.5" strokeDasharray="6 8" className="ba-dash" />
      {[[40, 200], [370, 100], [60, 50]].map(([x, y], k) => (
        <g key={k} className="ba-bob" style={D(-k)}>
          <path d={`M${x} ${y - 4} c -8 -14 -8 -22 0 -22 s 8 8 0 22 z`} fill="#ff7a59" />
          <circle cx={x} cy={y - 18} r="3" fill="#fff" />
        </g>
      ))}
      <circle cx="210" cy="122" r="76" fill={`url(#${id}g)`} />
      <circle cx="210" cy="122" r="62" fill="#fdf6e3" />
      <g className="ba-spin" style={{ '--t': '60s' }}>
        {Array.from({ length: 16 }).map((_, k) => (
          <rect key={k} x="209" y="62" width="2" height={k % 4 ? 6 : 12} fill="#8a5a12" transform={`rotate(${k * 22.5} 210 122)`} />
        ))}
      </g>
      <path d="M210 74 L220 122 L210 170 L200 122 Z" fill="#c9b48a" opacity=".5" transform="rotate(45 210 122)" />
      <g className="ba-needle">
        <path d="M210 70 L219 122 L201 122 Z" fill="#e2463b" />
        <path d="M210 174 L219 122 L201 122 Z" fill="#2a3f5a" />
      </g>
      <circle cx="210" cy="122" r="6" fill="#8a5a12" />
    </>
  );
}

/* 4 · Beginner's playbook: stepping stones across a lagoon, a light hopping from stone to stone. */
function Stones({ id }) {
  const st = [[96, 196], [150, 168], [204, 146], [258, 120], [312, 96]];
  return (
    <>
      <defs>
        <LG id={`${id}w`} stops={[[0, '#56d6f0'], [1, '#1673b8']]} />
        <RG id={`${id}o`} stops={[[0, '#fff'], [0.4, '#fff7b0'], [1, '#fff7b0', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}w)`} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} className="ba-wave" style={DT(-k * 2, 14 + k * 4)} d={`M0 ${40 + k * 50} q 25 -6 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0`} fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
      ))}
      {st.map(([x, y], k) => (
        <g key={k}>
          <ellipse cx={x} cy={y + 6} rx="30" ry="9" fill="#0d4f7e" opacity=".5" className="ba-pulse" style={D(-k * 0.7)} />
          <ellipse cx={x} cy={y} rx="26" ry="10" fill={['#c9d6df', '#b3c6d3', '#d7e1e7', '#a9bcc9', '#e3eaee'][k]} />
          <ellipse cx={x - 6} cy={y - 3} rx="10" ry="3" fill="#fff" opacity=".6" />
        </g>
      ))}
      <g className="ba-hop">
        <circle cx="96" cy="176" r="20" fill={`url(#${id}o)`} />
        <circle cx="96" cy="176" r="7" fill="#fff" />
      </g>
      <ellipse cx="60" cy="110" rx="18" ry="7" fill="#2fbf71" />
      <ellipse cx="350" cy="190" rx="22" ry="8" fill="#2fbf71" />
      <circle cx="354" cy="186" r="4" fill="#ff8fb1" className="ba-pulse" />
    </>
  );
}

/* 5 · Cash vs gift cards: a tipping balance scale, banknotes on one side, a gift card on the other. */
function Scale({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} stops={[[0, '#fff1e2'], [1, '#ffd2c2']]} />
        <LG id={`${id}m`} stops={[[0, '#d9a64a'], [1, '#9c6a17']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="120" r="110" fill="#ffb59b" opacity=".35" className="ba-pulse" />
      <path d="M200 70 V200 M168 206 H232" stroke={`url(#${id}m)`} strokeWidth="8" strokeLinecap="round" />
      <g className="ba-tilt">
        <rect x="96" y="66" width="208" height="7" rx="3.5" fill={`url(#${id}m)`} />
        <path d="M110 70 L90 124 M110 70 L130 124 M290 70 L270 124 M290 70 L310 124" stroke="#9c6a17" strokeWidth="1.6" />
        <path d="M84 124 H136 Q130 142 110 142 Q90 142 84 124 Z" fill={`url(#${id}m)`} />
        <path d="M264 124 H316 Q310 142 290 142 Q270 142 264 124 Z" fill={`url(#${id}m)`} />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(92 ${112 - k * 7}) rotate(${k * 3 - 3})`}>
            <rect width="38" height="16" rx="2" fill={['#3fae6b', '#4cc27c', '#35995d'][k]} />
            <circle cx="19" cy="8" r="4.5" fill="none" stroke="#e8ffe9" strokeWidth="1.5" />
          </g>
        ))}
        <g transform="translate(268 94) rotate(-8)">
          <rect width="44" height="30" rx="4" fill="#ff5d8f" />
          <rect x="18" width="7" height="30" fill="#ffd166" />
          <rect y="11" width="44" height="7" fill="#ffd166" />
          <path d="M21 11 c -10 -12 -18 -2 0 0 c 18 -2 10 -12 0 0" fill="none" stroke="#ffd166" strokeWidth="3" />
        </g>
      </g>
      <circle cx="200" cy="66" r="9" fill="#ffd77a" stroke="#9c6a17" strokeWidth="2" />
      {[[60, 40], [340, 60], [330, 190], [70, 196]].map(([x, y], k) => (
        <path key={k} className="ba-tw" style={D(-k * 0.8)} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="#ff8a65" />
      ))}
    </>
  );
}

/* 6 · Tips: a lightbulb traced as a constellation, its filament glowing, sparks drifting up. */
function Bulb({ id }) {
  const pts = [[200, 44], [236, 58], [252, 92], [240, 126], [224, 146], [224, 168], [176, 168], [176, 146], [160, 126], [148, 92], [164, 58]];
  const path = pts.map((p, k) => `${k ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ') + ' Z';
  return (
    <>
      <defs>
        <RG id={`${id}b`} cy={0.4} r={0.8} stops={[[0, '#2a2470'], [1, '#0a0b26']]} />
        <RG id={`${id}g`} stops={[[0, '#fff3a8', 0.9], [1, '#ffb93a', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="100" r="80" fill={`url(#${id}g)`} className="ba-pulse" />
      <path d={path} fill="none" stroke="#9fb5ff" strokeOpacity=".7" strokeWidth="1.4" strokeDasharray="3 5" className="ba-dash" />
      <path d="M186 140 V116 L194 104 L200 116 L206 104 L214 116 V140" fill="none" stroke="#ffe27a" strokeWidth="3" strokeLinejoin="round" className="ba-glow" />
      {pts.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={k % 3 ? 2.4 : 3.6} fill="#fff" className="ba-tw" style={D(-k * 0.37)} />
      ))}
      <rect x="180" y="174" width="40" height="8" rx="3" fill="#7d8bd6" />
      <rect x="184" y="186" width="32" height="8" rx="3" fill="#5f6cb8" />
      {[[150, 0], [260, 1.4], [120, 2.2], [290, 3]].map(([x, d], k) => (
        <circle key={k} cx={x} cy="200" r="2.5" fill="#ffe27a" className="ba-rise" style={DT(-d, 4)} />
      ))}
      {Array.from({ length: 22 }).map((_, k) => (
        <circle key={k} cx={(k * 97) % 400} cy={(k * 53) % 240} r=".9" fill="#fff" opacity=".6" />
      ))}
    </>
  );
}

/* 7 · Reward sites vs survey communities: a busy islet and a calm one with a campfire circle. */
function Islands({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}s`} stops={[[0, '#bfe9ff'], [0.55, '#8fd3f5'], [0.56, '#2aa4d8'], [1, '#126da3']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}s)`} />
      {[[40, 30, 0], [250, 46, 1]].map(([x, y, k]) => (
        <g key={k} className="ba-cloud" style={DT(-k * 9, 26)}>
          <path d={`M${x} ${y} h70 a14 14 0 0 0 -16 -18 a22 22 0 0 0 -40 0 a12 12 0 0 0 -14 18 z`} fill="#fff" opacity=".9" />
        </g>
      ))}
      <ellipse cx="110" cy="152" rx="70" ry="22" fill="#f4d58d" />
      <ellipse cx="110" cy="146" rx="58" ry="14" fill="#7cc576" />
      {Array.from({ length: 12 }).map((_, k) => (
        <circle key={k} cx={68 + ((k * 23) % 84)} cy={138 + ((k * 7) % 10)} r="3.5" fill={['#ff6b6b', '#ffd93d', '#6bcbff', '#c77dff'][k % 4]} className="ba-jit" style={D(-k * 0.21)} />
      ))}
      <ellipse cx="292" cy="160" rx="74" ry="24" fill="#f4d58d" />
      <ellipse cx="292" cy="153" rx="62" ry="15" fill="#5fb36a" />
      {Array.from({ length: 6 }).map((_, k) => {
        const a = (k / 6) * Math.PI * 2;
        return <circle key={k} cx={292 + Math.cos(a) * 26} cy={150 + Math.sin(a) * 8} r="4.5" fill="#fff" stroke="#2d6a4f" strokeWidth="1.5" />;
      })}
      <path className="ba-flick" d="M292 150 c -8 -6 -4 -16 0 -22 c 4 6 8 16 0 22 z" fill="#ff8c32" />
      <path className="ba-flick" style={D(-0.3)} d="M292 150 c -4 -4 -2 -9 0 -12 c 2 3 4 8 0 12 z" fill="#ffe066" />
      <path d="M180 150 Q 200 128 220 152" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 5" className="ba-dash" />
      {[0, 1, 2].map((k) => (
        <path key={k} className="ba-wave" style={DT(-k * 3, 12 + k * 4)} d={`M0 ${190 + k * 16} q 20 -5 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      ))}
    </>
  );
}

/* 8 · Work from home: a lamp-lit desk by a window with the moon outside. */
function Window({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}w`} stops={[[0, '#283a7a'], [1, '#1b2350']]} />
        <LG id={`${id}n`} stops={[[0, '#0c1238'], [1, '#3d2f7a']]} />
        <RG id={`${id}l`} cy={0} r={1} stops={[[0, '#ffe7a8', 0.75], [1, '#ffe7a8', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}w)`} />
      <rect x="120" y="26" width="170" height="122" rx="8" fill={`url(#${id}n)`} stroke="#d9c7a1" strokeWidth="6" />
      <path d="M205 26 V148 M120 87 H290" stroke="#d9c7a1" strokeWidth="4" />
      <circle cx="252" cy="58" r="16" fill="#fff6d8" className="ba-pulse" />
      <circle cx="258" cy="54" r="14" fill="#2d2766" />
      {[[140, 44], [176, 66], [228, 112], [150, 120], [270, 124]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="1.6" fill="#fff" className="ba-tw" style={D(-k * 0.6)} />
      ))}
      <path d="M80 0 L60 70 H120 Z" fill="#c76b4a" />
      <path d="M60 70 L20 240 H180 L120 70 Z" fill={`url(#${id}l)`} />
      <rect x="0" y="176" width="400" height="64" fill="#7a4a2f" />
      <rect x="0" y="172" width="400" height="8" fill="#97603e" />
      <g transform="translate(160 132)">
        <rect width="92" height="44" rx="4" fill="#202744" stroke="#cfd8ff" strokeWidth="2" />
        <rect x="6" y="6" width="80" height="32" rx="2" fill="#5b8cff" className="ba-glow" />
        <path d="M14 30 L30 20 L44 26 L60 12 L78 18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-10 44 H102 L96 52 H-4 Z" fill="#cfd8ff" />
      </g>
      <g className="ba-sway" style={{ transformOrigin: '320px 172px' }}>
        <path d="M320 172 C 300 140 296 120 308 100 M320 172 C 340 140 350 124 344 104 M320 172 C 318 140 322 116 320 96" fill="none" stroke="#3fae6b" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="306" cy="100" rx="9" ry="5" fill="#4cc27c" />
        <ellipse cx="344" cy="104" rx="9" ry="5" fill="#4cc27c" />
        <ellipse cx="320" cy="94" rx="8" ry="5" fill="#5fd38d" />
      </g>
      <path d="M302 172 H338 L332 196 H308 Z" fill="#e8b67a" />
      <rect x="90" y="150" width="22" height="22" rx="4" fill="#fff" />
      {[0, 1].map((k) => (
        <path key={k} className="ba-steam" style={D(k * 1.2)} d={`M${97 + k * 8} 146 q 5 -8 0 -16 q -5 -8 0 -16`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      ))}
    </>
  );
}

/* 9 · Spotting scams: an envelope on a fishing hook, and a shielded fish swimming past it. */
function Hook({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}w`} stops={[[0, '#0f5e6e'], [1, '#05243a']]} />
        <RG id={`${id}s`} stops={[[0, '#9ff6ff', 0], [0.75, '#9ff6ff', 0.15], [1, '#9ff6ff', 0.7]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}w)`} />
      {[60, 140, 300, 350].map((x, k) => (
        <path key={k} d={`M${x} 0 L${x + 40} 240 L${x + 70} 240 L${x + 20} 0 Z`} fill="#bff7ff" opacity=".06" />
      ))}
      <g className="ba-dangle">
        <path d="M150 -10 V110" stroke="#cfe9ef" strokeWidth="1.5" />
        <path d="M150 110 v18 a10 10 0 0 0 20 0 v-6" fill="none" stroke="#d9e2e6" strokeWidth="3.5" strokeLinecap="round" />
        <g transform="translate(130 92) rotate(-10)">
          <rect width="40" height="26" rx="3" fill="#ffe08a" />
          <path d="M0 0 L20 15 L40 0" fill="none" stroke="#c9952c" strokeWidth="2" />
          <circle cx="34" cy="6" r="6" fill="#ff4d4d" className="ba-blink" />
        </g>
      </g>
      <g className="ba-swim">
        <g transform="translate(250 150)">
          <circle r="34" fill={`url(#${id}s)`} stroke="#9ff6ff" strokeOpacity=".6" />
          <path d="M-20 0 C -10 -16 14 -16 22 0 C 14 16 -10 16 -20 0 Z" fill="#ff9f43" />
          <path d="M-20 0 L-32 -10 V10 Z" fill="#ff7f11" />
          <circle cx="12" cy="-3" r="3" fill="#1b1b1b" />
        </g>
      </g>
      {[[90, 0], [210, 1.6], [330, 0.8], [270, 2.4]].map(([x, d], k) => (
        <circle key={k} cx={x} cy="236" r={3 + (k % 2) * 2} fill="none" stroke="#bff7ff" strokeOpacity=".7" className="ba-rise" style={DT(-d, 5)} />
      ))}
      <path d="M0 220 C 40 200 50 240 90 230 S 140 200 170 236 V240 H0 Z M260 240 C 280 210 320 220 340 200 S 390 220 400 210 V240 Z" fill="#06303f" />
      <path className="ba-sway" style={{ transformOrigin: '60px 240px' }} d="M60 240 C 50 210 70 196 58 170" fill="none" stroke="#2f9e74" strokeWidth="5" strokeLinecap="round" />
      <path className="ba-sway" style={{ transformOrigin: '360px 240px', '--d': '-1.5s' }} d="M360 240 C 372 214 352 196 364 176" fill="none" stroke="#2f9e74" strokeWidth="5" strokeLinecap="round" />
    </>
  );
}

/* 10 · Earning from India: kites over a sunset city of domes and rooftops. */
function Kites({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}s`} stops={[[0, '#ff7e5f'], [0.5, '#feb47b'], [1, '#ffd89b']]} />
        <RG id={`${id}u`} stops={[[0, '#fff2c4'], [0.7, '#ffb347'], [1, '#ffb347', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}s)`} />
      <circle cx="200" cy="160" r="70" fill={`url(#${id}u)`} className="ba-pulse" />
      {[
        [120, 60, '#e83e8c', '#7b2cbf', 0],
        [230, 40, '#00b4d8', '#0077b6', -1.2],
        [300, 90, '#06d6a0', '#118ab2', -2.1]
      ].map(([x, y, a, b, d], k) => (
        <g key={k} className="ba-kite" style={{ ...D(d), transformOrigin: `${x}px ${y + 30}px` }}>
          <path d={`M${x} ${y - 22} L${x + 18} ${y} L${x} ${y + 26} L${x - 18} ${y} Z`} fill={a} />
          <path d={`M${x} ${y - 22} L${x + 18} ${y} L${x} ${y} Z`} fill={b} />
          <path d={`M${x} ${y + 26} q -6 12 2 22 q 8 10 -2 22`} fill="none" stroke={a} strokeWidth="2" />
          <path d={`M${x} ${y + 26} L${150 + k * 40} 240`} stroke="#5c3d2e" strokeOpacity=".35" strokeWidth=".8" />
        </g>
      ))}
      <path d="M0 196 H40 V176 H60 V188 Q 80 150 100 188 V170 H120 V196 H150 V160 L160 150 L170 160 V196 H210 Q 230 140 250 196 H270 V172 H300 V186 Q 316 164 332 186 V196 H360 V178 H380 V196 H400 V240 H0 Z" fill="#5a2a4a" />
      {[[28, 214], [76, 206], [128, 210], [190, 214], [236, 206], [290, 212], [352, 208]].map(([x, y], k) => (
        <rect key={k} x={x} y={y} width="6" height="8" rx="1" fill="#ffd166" className="ba-tw" style={D(-k * 0.5)} />
      ))}
    </>
  );
}

/* 11 · Myths: a cracked top hat on a velvet stage, sparkles fizzling, a magnifier revealing the truth. */
function Hat({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}c`} x2={1} stops={[[0, '#5a0f3c'], [0.5, '#7d1d55'], [1, '#4a0c33']]} />
        <LG id={`${id}l`} stops={[[0, '#fff6c2', 0.55], [1, '#fff6c2', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}c)`} />
      {[30, 90, 150, 250, 310, 370].map((x) => (
        <path key={x} d={`M${x} 0 C ${x + 10} 80 ${x - 10} 160 ${x} 240`} stroke="#3a0826" strokeWidth="10" fill="none" opacity=".5" />
      ))}
      <path d="M200 0 L120 240 H280 Z" fill={`url(#${id}l)`} className="ba-glow" />
      <ellipse cx="200" cy="200" rx="110" ry="16" fill="#2a0619" opacity=".6" />
      <ellipse cx="200" cy="184" rx="74" ry="12" fill="#14141f" />
      <path d="M160 184 V96 Q 200 86 240 96 V184 Z" fill="#1d1d2b" />
      <rect x="160" y="156" width="80" height="12" fill="#c41e5a" />
      <path d="M206 92 L198 118 L210 130 L196 152 L204 168" fill="none" stroke="#ffd6e5" strokeWidth="2" className="ba-draw" pathLength="100" />
      {[[150, 80], [240, 66], [270, 110], [130, 120], [214, 52]].map(([x, y], k) => (
        <path key={k} className="ba-fizz" style={D(-k * 0.55)} d={`M${x} ${y - 8} L${x + 2} ${y - 2} L${x + 8} ${y} L${x + 2} ${y + 2} L${x} ${y + 8} L${x - 2} ${y + 2} L${x - 8} ${y} L${x - 2} ${y - 2} Z`} fill="#ffe27a" />
      ))}
      <g className="ba-glide">
        <circle cx="120" cy="140" r="26" fill="#bde0fe" fillOpacity=".25" stroke="#e7f1ff" strokeWidth="5" />
        <path d="M139 159 L162 182" stroke="#e7f1ff" strokeWidth="9" strokeLinecap="round" />
      </g>
    </>
  );
}

/* 12 · Income ideas: a beam of white light through a prism, splitting into six coloured paths. */
function Prism({ id }) {
  const cols = ['#ff4d6d', '#ff9f1c', '#ffe66d', '#2ec4b6', '#4d96ff', '#9b5de5'];
  return (
    <>
      <defs>
        <RG id={`${id}b`} cx={0.3} r={0.9} stops={[[0, '#22223b'], [1, '#07070f']]} />
        <LG id={`${id}p`} x2={1} y2={1} stops={[[0, '#ffffff', 0.55], [1, '#9db4ff', 0.15]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M0 132 L176 118" stroke="#fff" strokeWidth="4" className="ba-glow" />
      {cols.map((c, k) => (
        <g key={k}>
          <path d={`M212 122 L400 ${40 + k * 32}`} stroke={c} strokeWidth="6" opacity=".85" />
          <g className="ba-bob" style={DT(-k * 0.6, 4 + (k % 3))}>
            {k % 3 === 0 && <circle cx={340 - k * 6} cy={58 + k * 30} r="8" fill={c} />}
            {k % 3 === 1 && <rect x={334 - k * 6} y={50 + k * 30} width="15" height="15" rx="3" fill={c} />}
            {k % 3 === 2 && <path d={`M${341 - k * 6} ${48 + k * 30} l9 16 h-18 z`} fill={c} />}
          </g>
        </g>
      ))}
      <path d="M196 64 L246 160 H146 Z" fill={`url(#${id}p)`} stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
      <path d="M196 64 L206 160 H146 Z" fill="#fff" opacity=".12" />
      {Array.from({ length: 14 }).map((_, k) => (
        <circle key={k} cx={(k * 61) % 180} cy={20 + ((k * 37) % 200)} r=".9" fill="#fff" className="ba-tw" style={D(-k * 0.3)} />
      ))}
    </>
  );
}

/* 13 · 30-day plan: a calendar of tiles lighting up day after day, with a progress ring. */
function Calendar({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#fff9db'], [1, '#ffe8a3']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="92" y="34" width="190" height="176" rx="14" fill="#fff" stroke="#f4c430" strokeWidth="3" />
      <rect x="92" y="34" width="190" height="30" rx="14" fill="#f4a300" />
      <rect x="92" y="50" width="190" height="14" fill="#f4a300" />
      {[124, 250].map((x) => (
        <rect key={x} x={x} y="24" width="8" height="20" rx="4" fill="#7a4b00" />
      ))}
      {Array.from({ length: 30 }).map((_, k) => {
        const x = 104 + (k % 6) * 29;
        const y = 74 + Math.floor(k / 6) * 26;
        return (
          <g key={k}>
            <rect x={x} y={y} width="22" height="19" rx="4" fill="#fff3c4" />
            <rect x={x} y={y} width="22" height="19" rx="4" fill={['#ff8a5b', '#f4a300', '#3bb273', '#4d96ff'][k % 4]} className="ba-day" style={D(k * 0.18)} />
          </g>
        );
      })}
      <g transform="translate(320 110)">
        <circle r="32" fill="none" stroke="#ffe08a" strokeWidth="9" />
        <circle r="32" fill="none" stroke="#3bb273" strokeWidth="9" strokeLinecap="round" pathLength="100" className="ba-ring" transform="rotate(-90)" />
        <path d="M-12 0 L-3 9 L13 -9" fill="none" stroke="#3bb273" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

/* 14 · Business professionals: an isometric boardroom chart with bars rising and a briefcase floating. */
function Boardroom({ id }) {
  const bars = [[150, 40, '#6c8cff'], [186, 64, '#8b5cf6'], [222, 52, '#06b6d4'], [258, 90, '#f59e0b']];
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#334155'], [1, '#0f172a']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M60 190 L200 120 L340 190 L200 240 Z" fill="#1e293b" stroke="#475569" />
      {Array.from({ length: 6 }).map((_, k) => (
        <path key={k} d={`M${60 + k * 23} ${190 - k * 11.5} L${200 + k * 23} ${240 - k * 8.3}`} stroke="#475569" strokeOpacity=".5" />
      ))}
      {bars.map(([x, h, c], k) => (
        <g key={k} className="ba-grow" style={D(k * 0.3)}>
          <path d={`M${x} ${190 - (x - 150) * 0.2} v${-h} l16 -8 v${h} z`} fill={c} />
          <path d={`M${x} ${190 - (x - 150) * 0.2 - h} l16 -8 l16 8 l-16 8 z`} fill="#fff" opacity=".35" />
          <path d={`M${x + 32} ${190 - (x - 150) * 0.2} v${-h} l-16 -8 v${h} z`} fill="#000" opacity=".25" />
        </g>
      ))}
      <path d="M120 150 L170 120 L210 132 L290 70" fill="none" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" pathLength="100" className="ba-draw" />
      <path d="M290 70 l-14 2 l8 10 z" fill="#a7f3d0" />
      <g className="ba-bob" style={{ '--t': '6s' }}>
        <rect x="70" y="60" width="60" height="40" rx="6" fill="#b45309" />
        <rect x="88" y="52" width="24" height="10" rx="3" fill="none" stroke="#b45309" strokeWidth="4" />
        <rect x="70" y="74" width="60" height="5" fill="#78350f" />
        <rect x="96" y="72" width="8" height="9" rx="1" fill="#fde68a" />
      </g>
    </>
  );
}

/* 15 · IT decision-makers: neon server racks on a perspective grid, LEDs blinking, packets flowing. */
function Servers({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#020617'], [1, '#0b1f3a']]} />
        <LG id={`${id}r`} x2={1} stops={[[0, '#1e293b'], [1, '#0f172a']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {Array.from({ length: 9 }).map((_, k) => (
        <path key={k} d={`M200 150 L${-200 + k * 100} 240`} stroke="#22d3ee" strokeOpacity=".35" />
      ))}
      {[160, 176, 196, 222].map((y) => (
        <path key={y} d={`M0 ${y} H400`} stroke="#22d3ee" strokeOpacity=".25" />
      ))}
      {[120, 180, 240].map((x, k) => (
        <g key={x}>
          <rect x={x} y={40 + (k === 1 ? -12 : 0)} width="44" height={120 + (k === 1 ? 12 : 0)} rx="4" fill={`url(#${id}r)`} stroke="#22d3ee" strokeOpacity=".7" />
          {Array.from({ length: 7 }).map((_, j) => (
            <g key={j}>
              <rect x={x + 6} y={48 + j * 16 + (k === 1 ? -12 : 0)} width="32" height="9" rx="2" fill="#0b1324" />
              <circle cx={x + 32} cy={52.5 + j * 16 + (k === 1 ? -12 : 0)} r="2" fill={j % 3 ? '#22d3ee' : '#f472b6'} className="ba-blink" style={D(-((j * 5 + k * 3) % 7) * 0.31)} />
            </g>
          ))}
        </g>
      ))}
      <path d="M40 200 H120 V160 M164 160 V200 H224 V160 M284 160 V200 H360" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="2 10" className="ba-dash" />
      {[0, 1, 2].map((k) => (
        <rect key={k} x="40" y="196" width="10" height="8" rx="2" fill="#f472b6" className="ba-packet" style={D(-k * 1.3)} />
      ))}
    </>
  );
}

/* 16 · Healthcare professionals: a clinical mint card with a beating heart and a running ECG trace. */
function Heartbeat({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#e6fffa'], [1, '#b2f5ea']]} />
        <RG id={`${id}h`} cx={0.35} cy={0.3} stops={[[0, '#ff9aa8'], [0.6, '#f43f5e'], [1, '#be123c']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[[50, 40], [350, 60], [70, 190], [330, 196]].map(([x, y], k) => (
        <path key={k} className="ba-bob" style={DT(-k, 5)} d={`M${x - 4} ${y - 12} h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 z`} fill="#14b8a6" opacity=".45" />
      ))}
      <path d="M0 140 H120 L136 140 L150 96 L166 184 L182 118 L194 140 H400" fill="none" stroke="#0f766e" strokeOpacity=".25" strokeWidth="3" />
      <path d="M0 140 H120 L136 140 L150 96 L166 184 L182 118 L194 140 H400" fill="none" stroke="#0d9488" strokeWidth="3.5" strokeLinejoin="round" pathLength="100" className="ba-ecg" />
      <g className="ba-beat">
        <path d="M262 150 C 222 124 214 92 238 80 C 252 74 262 84 262 94 C 262 84 272 74 286 80 C 310 92 302 124 262 150 Z" fill={`url(#${id}h)`} />
        <ellipse cx="244" cy="92" rx="7" ry="4" fill="#fff" opacity=".55" transform="rotate(-30 244 92)" />
      </g>
      <path d="M88 40 C 88 80 120 90 120 60 M88 40 C 70 40 70 62 90 72 C 110 82 140 70 150 90 C 160 110 150 120 140 124" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="140" cy="126" r="8" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
    </>
  );
}

/* 17 · Profiling: puzzle pieces on warm orange, the last one sliding into place, invites flying out. */
function Puzzle({ id }) {
  const piece = 'M0 0 h22 c0 -10 16 -10 16 0 h22 v22 c-10 0 -10 16 0 16 v22 h-22 c0 10 -16 10 -16 0 h-22 v-22 c10 0 10 -16 0 -16 z';
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#ff9f43'], [1, '#ee5253']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="320" cy="40" r="80" fill="#feca57" opacity=".35" className="ba-drift" />
      <g transform="translate(140 60)">
        <path d={piece} fill="#fff" />
        <path d={piece} transform="translate(60 0)" fill="#feca57" />
        <path d={piece} transform="translate(0 60)" fill="#54a0ff" />
        <g className="ba-snap">
          <path d={piece} transform="translate(60 60)" fill="#1dd1a1" />
        </g>
        <path d="M0 0 h120 v120 h-120 z" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="4 6" />
      </g>
      {[[96, 0], [300, 1.2], [270, 2.6]].map(([x, d], k) => (
        <g key={k} className="ba-rise" style={DT(-d, 5)}>
          <rect x={x} y="200" width="30" height="20" rx="3" fill="#fff" />
          <path d={`M${x} 200 l15 11 l15 -11`} fill="none" stroke="#ee5253" strokeWidth="1.8" />
        </g>
      ))}
    </>
  );
}

/* 18 · Screened out: a glass funnel where many dots fall in and a few pass through. */
function Funnel({ id }) {
  const cols = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff'];
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#e0ecff'], [1, '#b8d0ff']]} />
        <LG id={`${id}g`} x2={1} stops={[[0, '#ffffff', 0.75], [1, '#ffffff', 0.2]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {Array.from({ length: 10 }).map((_, k) => (
        <circle key={k} cx={130 + ((k * 37) % 140)} cy="0" r="6" fill={cols[k % 5]} className="ba-fall soft" style={DT(-k * 0.5, 3.2)} />
      ))}
      <path d="M110 70 H290 L222 150 V196 H178 V150 Z" fill={`url(#${id}g)`} stroke="#4d6fd1" strokeWidth="3" strokeLinejoin="round" />
      <path d="M124 78 H276" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {[0, 1].map((k) => (
        <circle key={k} cx="200" cy="200" r="6" fill={cols[k + 2]} className="ba-drip" style={D(-k * 1.6)} />
      ))}
      <path d="M150 232 H250" stroke="#4d6fd1" strokeWidth="4" strokeLinecap="round" />
      {[[80, 120, 0], [320, 130, 1]].map(([x, y, k]) => (
        <circle key={k} cx={x} cy={y} r="6" fill={cols[k]} opacity=".7" className="ba-bob" style={D(-k)} />
      ))}
    </>
  );
}

/* 19 · Rewards thresholds: a glass tube filling with coins up to a blinking threshold, with a burst. */
function Tube({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#5b21b6'], [1, '#c026d3']]} />
        <LG id={`${id}f`} stops={[[0, '#fde68a'], [1, '#f59e0b']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <g transform="translate(200 40)">
        <g className="ba-spin" style={{ '--t': '30s' }}>
          {Array.from({ length: 12 }).map((_, k) => (
            <path key={k} d="M0 0 L-5 -60 L5 -60 Z" fill="#fff" opacity=".15" transform={`rotate(${k * 30})`} />
          ))}
        </g>
        <path d="M0 -16 L5 -5 L16 -4 L8 4 L10 15 L0 9 L-10 15 L-8 4 L-16 -4 L-5 -5 Z" fill="#fde68a" className="ba-pulse" />
      </g>
      <rect x="170" y="70" width="60" height="150" rx="30" fill="#fff" fillOpacity=".15" stroke="#fff" strokeWidth="3" />
      <rect x="176" y="96" width="48" height="118" rx="24" fill={`url(#${id}f)`} className="ba-fillup" />
      {[0, 1, 2, 3].map((k) => (
        <ellipse key={k} cx="200" cy={200 - k * 26} rx="18" ry="5" fill="#fff7d6" opacity=".5" />
      ))}
      <path d="M150 100 H250" stroke="#f0abfc" strokeWidth="3" strokeDasharray="8 6" className="ba-blink" />
      <circle cx="262" cy="100" r="7" fill="#f0abfc" className="ba-blink" />
      {[[110, 0], [290, 1.5], [130, 2.4], [300, 3.1]].map(([x, d], k) => (
        <g key={k} className="ba-fall" style={DT(-d, 6)}>
          <circle cx={x} cy="0" r="9" fill="#fbbf24" />
          <circle cx={x} cy="0" r="5" fill="none" stroke="#fff7d6" strokeWidth="1.5" />
        </g>
      ))}
    </>
  );
}

/* 20 · Payout options: four payment cards fanning open on emerald. */
function Cards({ id }) {
  const cards = [
    ['#0ea5e9', '#0369a1', -24],
    ['#22c55e', '#15803d', -8],
    ['#f97316', '#c2410c', 8],
    ['#a855f7', '#7e22ce', 24]
  ];
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#064e3b'], [1, '#0f766e']]} />
        {cards.map(([a, b], k) => (
          <LG key={k} id={`${id}c${k}`} x2={1} y2={1} stops={[[0, a], [1, b]]} />
        ))}
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="230" r="150" fill="#34d399" opacity=".15" className="ba-pulse" />
      {cards.map(([, , rot], k) => (
        <g key={k} className="ba-fan" style={{ '--r': `${rot}deg`, ...D(k * 0.15), transformOrigin: '200px 220px' }}>
          <rect x="150" y="70" width="100" height="64" rx="9" fill={`url(#${id}c${k})`} stroke="#fff" strokeOpacity=".5" />
          <rect x="162" y="88" width="18" height="13" rx="3" fill="#fde68a" />
          <path d="M162 94.5 h18 M171 88 v13" stroke="#b45309" strokeWidth=".8" />
          <rect x="162" y="114" width="56" height="5" rx="2.5" fill="#fff" opacity=".6" />
          <circle cx="230" cy="86" r="7" fill="#fff" opacity=".35" />
        </g>
      ))}
      {[[70, 60], [330, 70], [90, 170], [320, 170]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="3" fill="#a7f3d0" className="ba-tw" style={D(-k * 0.7)} />
      ))}
    </>
  );
}

/* 21 · Privacy: a padlock with a glowing keyhole and data dots orbiting it in tilted rings. */
function Lock({ id }) {
  return (
    <>
      <defs>
        <RG id={`${id}b`} r={0.8} stops={[[0, '#1e3a8a'], [1, '#0b1026']]} />
        <LG id={`${id}l`} x2={1} y2={1} stops={[[0, '#93c5fd'], [1, '#3b82f6']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {[-20, 25].map((rot, k) => (
        <g key={k} transform={`translate(200 124) rotate(${rot}) scale(1 .38)`}>
          <circle r="120" fill="none" stroke="#60a5fa" strokeOpacity=".35" strokeWidth="2.5" />
          <g className={`ba-spin ${k ? 'rev' : ''}`} style={{ '--t': `${10 + k * 6}s` }}>
            {[0, 1, 2].map((j) => (
              <circle key={j} cx={Math.cos((j * 2 * Math.PI) / 3) * 120} cy={Math.sin((j * 2 * Math.PI) / 3) * 120} r="9" fill={['#22d3ee', '#a78bfa', '#f472b6'][j]} />
            ))}
          </g>
        </g>
      ))}
      <path d="M176 112 V90 a24 24 0 0 1 48 0 V112" fill="none" stroke="#cbd5e1" strokeWidth="10" />
      <rect x="160" y="108" width="80" height="66" rx="12" fill={`url(#${id}l)`} />
      <circle cx="200" cy="134" r="9" fill="#0b1026" />
      <path d="M196 138 h8 l3 18 h-14 z" fill="#0b1026" />
      <circle cx="200" cy="138" r="18" fill="#fde047" opacity=".35" className="ba-pulse" />
    </>
  );
}

/* 22 · Quality checks: a clipboard on lavender, ticks drawing in, a magnifier gliding across. */
function Clipboard({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#f3e8ff'], [1, '#ddd6fe']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="60" cy="200" r="70" fill="#c4b5fd" opacity=".4" className="ba-drift" />
      <rect x="130" y="30" width="140" height="190" rx="12" fill="#7c3aed" />
      <rect x="140" y="46" width="120" height="166" rx="6" fill="#fff" />
      <rect x="176" y="22" width="48" height="18" rx="6" fill="#4c1d95" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x="152" y={68 + k * 36} width="20" height="20" rx="5" fill="#ede9fe" />
          <path d={`M156 ${78 + k * 36} l5 5 l9 -10`} fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="ba-draw" style={D(-k * 0.5)} />
          <rect x="182" y={72 + k * 36} width={62 - (k % 2) * 16} height="5" rx="2.5" fill="#c4b5fd" />
          <rect x="182" y={82 + k * 36} width={40 + (k % 3) * 8} height="4" rx="2" fill="#e9d5ff" />
        </g>
      ))}
      <g className="ba-glide alt">
        <circle cx="270" cy="120" r="24" fill="#fff" fillOpacity=".35" stroke="#4c1d95" strokeWidth="5" />
        <path d="M287 137 L306 156" stroke="#4c1d95" strokeWidth="8" strokeLinecap="round" />
      </g>
    </>
  );
}

/* 23 · Students: a chalkboard with a floating mortarboard, swinging tassel, books and chalk stars. */
function Grad({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#1f4d3a'], [1, '#143327']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="6" y="6" width="388" height="228" fill="none" stroke="#8b5e34" strokeWidth="10" />
      <path d="M40 60 q 20 -20 40 0 t 40 0 M300 190 l20 -20 l20 20 M60 180 c 10 -20 30 -20 40 0" fill="none" stroke="#e8f5e9" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      {[[320, 50], [80, 120], [350, 120], [270, 40]].map(([x, y], k) => (
        <path key={k} className="ba-tw" style={D(-k * 0.6)} d={`M${x} ${y - 9} L${x + 2.5} ${y - 2.5} L${x + 9} ${y} L${x + 2.5} ${y + 2.5} L${x} ${y + 9} L${x - 2.5} ${y + 2.5} L${x - 9} ${y} L${x - 2.5} ${y - 2.5} Z`} fill="none" stroke="#fff59d" strokeWidth="1.6" />
      ))}
      <g className="ba-bob" style={{ '--t': '5s' }}>
        <path d="M200 50 L270 78 L200 106 L130 78 Z" fill="#111827" />
        <path d="M164 92 V118 C 180 130 220 130 236 118 V92 L200 106 Z" fill="#1f2937" />
        <circle cx="200" cy="78" r="4" fill="#fbbf24" />
        <g className="ba-tassel" style={{ transformOrigin: '200px 78px' }}>
          <path d="M200 78 L252 92 V122" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <path d="M248 120 h8 l2 14 h-12 z" fill="#fbbf24" />
        </g>
      </g>
      {[['#ef4444', 0], ['#3b82f6', 1], ['#f59e0b', 2]].map(([c, k]) => (
        <rect key={k} x={150 + k * 4} y={200 - k * 16} width={100 - k * 8} height="14" rx="2" fill={c} />
      ))}
      <rect x="150" y="214" width="100" height="4" fill="#fff" opacity=".7" />
    </>
  );
}

/* 24 · Homemakers: a terracotta kitchen with a steaming kettle, herbs swaying and a phone pinging. */
function Kitchen({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#fde2c8'], [1, '#f8c4a0']]} />
        <LG id={`${id}k`} x2={1} y2={1} stops={[[0, '#ef6f53'], [1, '#b83b2a']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <path d="M0 0 H400 V40 H0 Z" fill="#f4a989" opacity=".4" />
      {Array.from({ length: 10 }).map((_, k) => (
        <rect key={k} x={k * 40 + 6} y="12" width="28" height="18" rx="3" fill="#fff" opacity=".35" />
      ))}
      <rect x="0" y="176" width="400" height="64" fill="#c97b54" />
      <rect x="0" y="170" width="400" height="10" fill="#e09a70" />
      <g>
        <path d="M110 176 C 100 150 104 120 130 112 H170 C 196 120 200 150 190 176 Z" fill={`url(#${id}k)`} />
        <path d="M190 140 C 212 132 222 118 222 104" fill="none" stroke="#b83b2a" strokeWidth="8" strokeLinecap="round" />
        <path d="M126 110 C 130 84 170 84 174 110" fill="none" stroke="#5b3a29" strokeWidth="6" />
        <ellipse cx="150" cy="112" rx="20" ry="5" fill="#8e2c1f" />
        <ellipse cx="136" cy="140" rx="8" ry="14" fill="#fff" opacity=".25" />
      </g>
      {[0, 1, 2].map((k) => (
        <path key={k} className="ba-steam" style={D(k * 0.9)} d={`M${218 + k * 6} 96 q 6 -10 0 -20 q -6 -10 0 -20`} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
      ))}
      {[260, 300].map((x, k) => (
        <g key={x}>
          <g className="ba-sway" style={{ ...D(-k), transformOrigin: `${x + 14}px 150px` }}>
            <path d={`M${x + 14} 150 C ${x} 130 ${x + 4} 110 ${x + 10} 100 M${x + 14} 150 C ${x + 24} 128 ${x + 30} 114 ${x + 26} 102`} fill="none" stroke="#3a7d44" strokeWidth="3" />
            {[[x + 8, 112], [x + 26, 108], [x + 6, 128], [x + 24, 126]].map(([lx, ly], j) => (
              <ellipse key={j} cx={lx} cy={ly} rx="6" ry="3.5" fill="#56a65f" transform={`rotate(${j % 2 ? 30 : -30} ${lx} ${ly})`} />
            ))}
          </g>
          <path d={`M${x} 150 H${x + 28} L${x + 24} 176 H${x + 4} Z`} fill="#e07a4f" />
        </g>
      ))}
      <g transform="translate(60 120) rotate(-8)">
        <rect width="34" height="56" rx="6" fill="#2b2d42" />
        <rect x="3" y="6" width="28" height="42" rx="3" fill="#8ecae6" />
        <g className="ba-pop" style={D(0)}>
          <circle cx="30" cy="4" r="8" fill="#ef233c" />
          <circle cx="30" cy="4" r="3" fill="#fff" />
        </g>
      </g>
    </>
  );
}

/* 25 · Side income after office hours: a night skyline under a moon that is a clock. */
function MoonClock({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#0b1a4a'], [1, '#1e3a8a']]} />
        <RG id={`${id}m`} cx={0.4} cy={0.35} stops={[[0, '#fffbea'], [1, '#fde68a']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      {Array.from({ length: 18 }).map((_, k) => (
        <circle key={k} cx={(k * 89) % 400} cy={(k * 31) % 120} r="1.2" fill="#fff" className="ba-tw" style={D(-k * 0.27)} />
      ))}
      <circle cx="210" cy="78" r="60" fill="#fde68a" opacity=".15" className="ba-pulse" />
      <circle cx="210" cy="78" r="42" fill={`url(#${id}m)`} />
      {Array.from({ length: 12 }).map((_, k) => (
        <rect key={k} x="209" y="40" width="2" height="6" fill="#b45309" transform={`rotate(${k * 30} 210 78)`} />
      ))}
      <rect x="208.5" y="54" width="3" height="26" rx="1.5" fill="#78350f" className="ba-hand" style={{ '--t': '60s' }} />
      <rect x="209" y="62" width="2" height="18" rx="1" fill="#78350f" className="ba-hand" style={{ '--t': '720s' }} />
      <circle cx="210" cy="78" r="3" fill="#78350f" />
      <path d="M0 240 V170 H30 V140 H62 V176 H90 V120 H130 V160 H160 V130 H190 V190 H230 V110 H270 V160 H300 V136 H340 V170 H370 V150 H400 V240 Z" fill="#0a0f2c" />
      {Array.from({ length: 26 }).map((_, k) => {
        const x = 36 + ((k * 53) % 330);
        const y = 150 + ((k * 23) % 70);
        return <rect key={k} x={x} y={y} width="5" height="7" fill="#fcd34d" className={k % 3 ? '' : 'ba-blink'} style={D(-k * 0.4)} opacity={k % 4 ? 0.9 : 0.35} />;
      })}
    </>
  );
}

/* 26 · Mobile surveys: a tilted phone on a sunset gradient, answer bubbles and coins rising out of it. */
function Phone({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} x2={1} y2={1} stops={[[0, '#ff4ecd'], [1, '#ff9a3c']]} />
        <LG id={`${id}s`} stops={[[0, '#3a0ca3'], [1, '#7209b7']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="130" r="100" fill="#fff" opacity=".12" className="ba-pulse" />
      <g transform="rotate(-12 200 140)">
        <rect x="160" y="60" width="80" height="150" rx="14" fill="#1b1b3a" />
        <rect x="166" y="72" width="68" height="126" rx="8" fill={`url(#${id}s)`} />
        {[0, 1, 2].map((k) => (
          <rect key={k} x="176" y={90 + k * 26} width={48 - k * 10} height="16" rx="8" fill="#fff" opacity={0.9 - k * 0.2} />
        ))}
        <circle cx="200" cy="180" r="9" fill="#4cc9f0" className="ba-pulse" />
      </g>
      {[[140, 0, '#fff'], [250, 1.3, '#ffe66d'], [270, 2.5, '#fff'], [120, 3.2, '#ffe66d']].map(([x, d, c], k) => (
        <g key={k} className="ba-rise tall" style={DT(-d, 4.5)}>
          {k % 2 ? (
            <>
              <circle cx={x} cy="120" r="10" fill={c} />
              <circle cx={x} cy="120" r="5.5" fill="none" stroke="#ff9a3c" strokeWidth="1.6" />
            </>
          ) : (
            <path d={`M${x - 16} 108 h32 a6 6 0 0 1 6 6 v12 a6 6 0 0 1 -6 6 h-20 l-8 7 v-7 h-4 a6 6 0 0 1 -6 -6 v-12 a6 6 0 0 1 6 -6 z`} fill={c} />
          )}
        </g>
      ))}
    </>
  );
}

/* 27 · Retirees: golden hour, a rocking chair, a cup of tea steaming, leaves drifting down. */
function Rocker({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#ffcf71'], [1, '#f08a4b']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="300" cy="150" r="60" fill="#fff1c1" opacity=".55" className="ba-pulse" />
      <path d="M0 190 C 100 170 300 200 400 180 V240 H0 Z" fill="#b5532a" />
      <g className="ba-rock" style={{ transformOrigin: '170px 200px' }}>
        <path d="M120 206 Q 170 222 220 206" fill="none" stroke="#5c2c14" strokeWidth="6" strokeLinecap="round" />
        <path d="M134 210 L144 160 M206 210 L196 160 M140 160 H204 M144 160 L130 80 M130 80 Q 150 70 170 80 L180 160" fill="none" stroke="#7a3b1c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="140" y="150" width="62" height="12" rx="4" fill="#d9822b" />
        <rect x="136" y="96" width="38" height="50" rx="8" fill="#e9a35c" transform="rotate(-10 155 120)" />
      </g>
      <rect x="244" y="190" width="40" height="6" rx="3" fill="#5c2c14" />
      <path d="M250 166 H278 V182 Q 278 190 264 190 Q 250 190 250 182 Z" fill="#fff" />
      <path d="M278 170 q 10 0 8 8 q -2 6 -8 4" fill="none" stroke="#fff" strokeWidth="3" />
      {[0, 1].map((k) => (
        <path key={k} className="ba-steam" style={D(k * 1.1)} d={`M${258 + k * 10} 160 q 5 -8 0 -16 q -5 -8 0 -16`} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {[[80, 0], [220, 1.8], [340, 3.4], [150, 5]].map(([x, d], k) => (
        <path key={k} className="ba-fall leaf" style={DT(-d, 7)} d={`M${x} -10 q 8 -8 14 0 q -8 8 -14 0 z`} fill={['#d9480f', '#f59f00', '#e8590c', '#c92a2a'][k]} />
      ))}
    </>
  );
}

/* 28 · How research uses your opinion: a conveyor belt turning speech bubbles into product boxes. */
function Factory({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#0e7490'], [1, '#164e63']]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <rect x="20" y="160" width="360" height="14" rx="7" fill="#0f172a" />
      {Array.from({ length: 10 }).map((_, k) => (
        <circle key={k} cx={34 + k * 37} cy="167" r="5" fill="#94a3b8" />
      ))}
      <g transform="translate(200 104)">
        <rect x="-34" y="-44" width="68" height="96" rx="8" fill="#334155" />
        <g className="ba-spin" style={{ '--t': '6s' }}>
          <path d="M0 -20 l5 0 l2 -6 l6 3 l-2 6 l4 4 l6 -2 l3 6 l-6 2 v6 l6 2 l-3 6 l-6 -2 l-4 4 l2 6 l-6 3 l-2 -6 h-6 l-2 6 l-6 -3 l2 -6 l-4 -4 l-6 2 l-3 -6 l6 -2 v-6 l-6 -2 l3 -6 l6 2 l4 -4 l-2 -6 l6 -3 l2 6 z" fill="#fbbf24" transform="translate(-2 18)" />
        </g>
        <circle cx="0" cy="-30" r="5" fill="#22d3ee" className="ba-blink" />
      </g>
      {[0, 1].map((k) => (
        <g key={k} className="ba-convey" style={D(-k * 2)}>
          <path d="M40 124 h34 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-20 l-8 7 v-7 h-6 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z" fill="#fff" />
          <circle cx="50" cy="137" r="3" fill="#0e7490" />
          <circle cx="60" cy="137" r="3" fill="#0e7490" />
          <circle cx="70" cy="137" r="3" fill="#0e7490" />
        </g>
      ))}
      {[0, 1].map((k) => (
        <g key={k} className="ba-convey out" style={D(-k * 2)}>
          <path d="M270 128 l18 -8 l18 8 v24 l-18 8 l-18 -8 z" fill="#f97316" />
          <path d="M270 128 l18 8 l18 -8 M288 136 v24" fill="none" stroke="#7c2d12" strokeWidth="1.5" />
        </g>
      ))}
      <path d="M30 40 h60 M30 54 h40 M310 40 h60 M330 54 h40" stroke="#67e8f9" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

/* 29 · Around the world: a turning globe with flight arcs and planes tracing them. */
function Globe({ id }) {
  return (
    <>
      <defs>
        <RG id={`${id}b`} r={0.9} stops={[[0, '#1d4ed8'], [1, '#0b1a4a']]} />
        <RG id={`${id}g`} cx={0.35} cy={0.3} stops={[[0, '#7dd3fc'], [0.6, '#0284c7'], [1, '#0c4a6e']]} />
        <clipPath id={`${id}c`}>
          <circle cx="200" cy="124" r="78" />
        </clipPath>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <circle cx="200" cy="124" r="96" fill="#38bdf8" opacity=".15" className="ba-pulse" />
      <circle cx="200" cy="124" r="78" fill={`url(#${id}g)`} />
      <g clipPath={`url(#${id}c)`}>
        <g className="ba-turn">
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${k * 160} 0)`}>
              <path d="M110 90 q 20 -14 40 -4 q 8 14 -6 22 q -18 4 -22 18 q -14 -10 -12 -36 z M170 140 q 18 -6 26 8 q -2 20 -18 26 q -14 -10 -8 -34 z M200 80 q 30 -10 50 6 q 10 18 -12 22 q -20 -4 -38 -28 z" fill="#4ade80" />
            </g>
          ))}
        </g>
        {[-40, 0, 40].map((y) => (
          <ellipse key={y} cx="200" cy={124 + y} rx="78" ry="6" fill="none" stroke="#fff" strokeOpacity=".2" />
        ))}
      </g>
      <path d="M60 170 Q 200 -10 340 150" fill="none" stroke="#fde047" strokeWidth="2" strokeDasharray="4 6" className="ba-dash" />
      <path d="M90 60 Q 220 260 330 70" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 6" className="ba-dash" />
      {[60, 340, 90, 330].map((x, k) => (
        <circle key={k} cx={x} cy={[170, 150, 60, 70][k]} r="5" fill={k < 2 ? '#fde047' : '#f472b6'} className="ba-pulse" style={D(-k * 0.5)} />
      ))}
      <g className="ba-plane">
        <path d="M193 18 l14 4 l-14 4 l3 -4 z" fill="#fff" />
      </g>
    </>
  );
}

/* 30 · First week: seven dawns along a path, lighting up day by day as the sun climbs. */
function Week({ id }) {
  return (
    <>
      <defs>
        <LG id={`${id}b`} stops={[[0, '#a5b4fc'], [0.6, '#fbcfe8'], [1, '#fde68a']]} />
        <RG id={`${id}s`} stops={[[0, '#fffbeb'], [0.6, '#fbbf24'], [1, '#fbbf24', 0]]} />
      </defs>
      <rect width="400" height="240" fill={`url(#${id}b)`} />
      <g className="ba-sunrise">
        <circle cx="200" cy="160" r="54" fill={`url(#${id}s)`} />
      </g>
      <path d="M0 170 C 120 150 280 150 400 170 V240 H0 Z" fill="#818cf8" />
      <path d="M0 196 C 120 180 280 180 400 196 V240 H0 Z" fill="#6366f1" />
      <path d="M40 220 C 120 200 160 180 200 176 S 300 196 360 220" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      {Array.from({ length: 7 }).map((_, k) => {
        const a = Math.PI + (k / 6) * Math.PI;
        const x = 200 + Math.cos(a) * 140;
        const y = 150 + Math.sin(a) * 100;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r="11" fill="#fff" opacity=".5" />
            <circle cx={x} cy={y} r="11" fill={['#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#6366f1'][k]} className="ba-day slow" style={D(k * 0.5)} />
          </g>
        );
      })}
    </>
  );
}

/** slug → scene. A post without an entry falls back to its category world in BlogArt.jsx. */
export const SCENES = {
  'earn-money-online-realistic-guide': Summit,
  'earn-money-online-without-investment': CoinTree,
  'paid-surveys-complete-guide': Compass,
  'online-surveys-for-money-beginners': Stones,
  'paid-surveys-for-cash-vs-gift-cards': Scale,
  'get-paid-to-do-surveys-tips': Bulb,
  'swagbucks-surveys-vs-survey-communities': Islands,
  'online-work-from-home-without-investment': Window,
  'online-jobs-from-home-no-investment-scams': Hook,
  'earn-dollars-online-without-investment-india': Kites,
  'free-money-making-online-myths': Hat,
  'online-income-ideas-beginners': Prism,
  'make-money-without-any-investment-30-day-plan': Calendar,
  'paid-surveys-for-business-professionals': Boardroom,
  'surveys-for-it-decision-makers': Servers,
  'paid-surveys-for-healthcare-professionals': Heartbeat,
  'survey-profiling-more-invitations': Puzzle,
  'why-you-get-screened-out-of-surveys': Funnel,
  'survey-rewards-points-thresholds-explained': Tube,
  'upi-paypal-wire-amazon-survey-payouts': Cards,
  'are-paid-surveys-safe-data-privacy': Lock,
  'survey-quality-checks-explained': Clipboard,
  'earn-money-online-for-students': Grad,
  'online-earning-for-homemakers': Kitchen,
  'side-income-for-working-professionals': MoonClock,
  'earn-money-online-using-phone': Phone,
  'online-work-for-retirees-senior-citizens': Rocker,
  'how-market-research-uses-your-opinion': Factory,
  'paid-surveys-around-the-world': Globe,
  'first-week-paid-surveys-checklist': Week
};
