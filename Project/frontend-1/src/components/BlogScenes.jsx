// Illustrated, lightly animated SVG scenes for blog covers – one per category (no stock photos to download).
// Drawn on a 400×240 canvas on top of the post's gradient. Purely decorative (the cover is aria-hidden).

const W = '#fff';

function Coins({ x, y, n = 3 }) {
  return Array.from({ length: n }).map((_, i) => (
    <g key={i} className="bs-rise" style={{ '--d': `${i * 0.8}s` }}>
      <circle cx={x + i * 22} cy={y} r="9" fill="#FFD36B" stroke="#C88A00" strokeWidth="2" />
      <text x={x + i * 22} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="#8A5A00">
        ★
      </text>
    </g>
  ));
}

function EarnOnline() {
  return (
    <g>
      <g className="bs-spin-slow" style={{ transformOrigin: '330px 58px' }}>
        <circle cx="330" cy="58" r="30" fill="none" stroke={W} strokeOpacity=".5" strokeWidth="2" />
        <ellipse cx="330" cy="58" rx="12" ry="30" fill="none" stroke={W} strokeOpacity=".5" strokeWidth="2" />
        <path d="M300 58 H360 M305 42 H355 M305 74 H355" stroke={W} strokeOpacity=".5" strokeWidth="2" />
      </g>
      <rect x="140" y="62" width="130" height="86" rx="8" fill="#0E1B4D" fillOpacity=".55" stroke={W} strokeWidth="3" />
      <path d="M124 160 H286 L272 148 H138 Z" fill={W} fillOpacity=".85" />
      <g>
        <rect className="bs-grow" x="162" y="102" width="16" height="34" rx="3" fill="#49B6FF" style={{ '--d': '0s' }} />
        <rect className="bs-grow" x="188" y="88" width="16" height="48" rx="3" fill="#7B5CFF" style={{ '--d': '.2s' }} />
        <rect className="bs-grow" x="214" y="76" width="16" height="60" rx="3" fill="#FFB020" style={{ '--d': '.4s' }} />
        <rect className="bs-grow" x="240" y="94" width="16" height="42" rx="3" fill="#12C29B" style={{ '--d': '.6s' }} />
      </g>
      <g className="bs-float">
        <circle cx="86" cy="104" r="16" fill={W} />
        <path d="M60 170 Q60 128 86 128 Q112 128 112 170 Z" fill={W} fillOpacity=".9" />
      </g>
      <Coins x={300} y={150} />
    </g>
  );
}

function PaidSurveys() {
  return (
    <g>
      <rect x="158" y="34" width="86" height="168" rx="16" fill="#0E1B4D" fillOpacity=".6" stroke={W} strokeWidth="3" />
      <rect x="168" y="52" width="66" height="134" rx="8" fill={W} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="176" y={64 + i * 28} width="14" height="14" rx="4" fill="none" stroke="#1F5BFF" strokeWidth="2" />
          <path className="bs-check" style={{ '--d': `${i * 0.35}s` }} d={`M178 ${71 + i * 28} l4 4 l7 -8`} fill="none" stroke="#12C29B" strokeWidth="3" strokeLinecap="round" />
          <rect x="196" y={67 + i * 28} width={30 - (i % 2) * 8} height="7" rx="3.5" fill="#C9D5F5" />
        </g>
      ))}
      <g className="bs-float" style={{ '--d': '-1s' }}>
        <rect x="52" y="60" width="84" height="44" rx="14" fill={W} />
        <path d="M110 104 l10 14 l2 -14 Z" fill={W} />
        <circle cx="76" cy="82" r="4" fill="#FF5C7A" />
        <circle cx="94" cy="82" r="4" fill="#FFB020" />
        <circle cx="112" cy="82" r="4" fill="#49B6FF" />
      </g>
      <g className="bs-float" style={{ '--d': '-2.5s' }}>
        <rect x="268" y="120" width="90" height="40" rx="14" fill={W} fillOpacity=".9" />
        <path d="M280 160 l-6 14 l16 -14 Z" fill={W} fillOpacity=".9" />
        <path d="M284 140 h58" stroke="#7B5CFF" strokeWidth="5" strokeLinecap="round" />
      </g>
      {[
        [300, 60],
        [70, 170],
        [350, 196]
      ].map(([x, y], i) => (
        <path key={i} className="bs-twinkle" style={{ '--d': `${i * 0.6}s`, transformOrigin: `${x}px ${y}px` }} d={`M${x} ${y - 10} L${x + 3} ${y - 3} L${x + 10} ${y} L${x + 3} ${y + 3} L${x} ${y + 10} L${x - 3} ${y + 3} L${x - 10} ${y} L${x - 3} ${y - 3} Z`} fill="#FFD36B" />
      ))}
    </g>
  );
}

function WorkFromHome() {
  return (
    <g>
      <circle className="bs-pulse" cx="334" cy="56" r="22" fill="#FFD36B" style={{ transformOrigin: '334px 56px' }} />
      <path d="M70 120 L160 50 L250 120" fill="none" stroke={W} strokeWidth="6" strokeLinejoin="round" />
      <rect x="88" y="118" width="144" height="92" rx="4" fill={W} fillOpacity=".18" stroke={W} strokeWidth="3" />
      <rect className="bs-glow" x="110" y="132" width="40" height="34" rx="4" fill="#FFE7A8" />
      <path d="M130 132 V166 M110 149 H150" stroke="#0E1B4D" strokeOpacity=".3" strokeWidth="2" />
      <path d="M168 188 H300" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <rect x="196" y="150" width="58" height="36" rx="5" fill="#0E1B4D" fillOpacity=".6" stroke={W} strokeWidth="2.5" />
      <rect x="276" y="166" width="20" height="22" rx="4" fill={W} />
      <path d="M296 172 q8 0 8 7 q0 6 -8 6" fill="none" stroke={W} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <path key={i} className="bs-steam" style={{ '--d': `${i * 0.5}s` }} d={`M${280 + i * 6} 160 q-4 -8 0 -14 q4 -6 0 -12`} fill="none" stroke={W} strokeWidth="2" strokeLinecap="round" />
      ))}
      <g className="bs-sway" style={{ transformOrigin: '336px 210px' }}>
        <path d="M336 210 V176" stroke="#0E7A4B" strokeWidth="3" />
        <path d="M336 186 q-18 -4 -20 -20 q16 2 20 20 Z M336 180 q16 -6 20 -22 q-16 4 -20 22 Z" fill="#7CF0C8" />
      </g>
      <rect x="324" y="206" width="24" height="18" rx="4" fill={W} />
    </g>
  );
}

function Professionals() {
  return (
    <g>
      {[
        [270, 90, 34, 140],
        [310, 60, 40, 170],
        [356, 110, 30, 120]
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill={W} fillOpacity={0.2 + i * 0.1} stroke={W} strokeOpacity=".6" strokeWidth="2" />
          {Array.from({ length: 4 }).map((_, k) => (
            <rect key={k} className="bs-blink" style={{ '--d': `${(i + k) * 0.4}s` }} x={x + 8} y={y + 14 + k * 24} width={w - 16} height="8" rx="2" fill="#FFE7A8" />
          ))}
        </g>
      ))}
      <path className="bs-draw" d="M40 190 L90 160 L130 172 L180 120 L220 132 L250 90" fill="none" stroke="#FFD36B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="bs-pulse" cx="250" cy="90" r="7" fill="#FFD36B" style={{ transformOrigin: '250px 90px' }} />
      <g className="bs-float">
        <circle cx="110" cy="74" r="18" fill={W} />
        <path d="M80 140 Q80 98 110 98 Q140 98 140 140 Z" fill="#0E1B4D" fillOpacity=".75" />
        <path d="M110 100 l-5 8 l5 20 l5 -20 Z" fill="#FF5C7A" />
      </g>
      <g className="bs-float" style={{ '--d': '-2s' }}>
        <rect x="160" y="160" width="52" height="38" rx="6" fill="#7B3F00" fillOpacity=".85" stroke={W} strokeWidth="2.5" />
        <path d="M176 160 v-8 h20 v8" fill="none" stroke={W} strokeWidth="3" />
        <path d="M160 176 H212" stroke={W} strokeOpacity=".6" strokeWidth="2" />
      </g>
    </g>
  );
}

function Rewards() {
  return (
    <g>
      {[
        ['#003087', -14, 70],
        ['#5A36D6', -4, 84],
        ['#C76E00', 8, 98]
      ].map(([c, r, x], i) => (
        <g key={i} className="bs-fan" style={{ '--d': `${i * 0.25}s`, transformOrigin: `${x + 50}px 190px`, '--r': `${r}deg` }}>
          <rect x={x} y="100" width="100" height="64" rx="10" fill={c} stroke={W} strokeWidth="2.5" />
          <rect x={x + 12} y="114" width="20" height="14" rx="3" fill="#FFD36B" />
          <path d={`M${x + 12} ${150} h60`} stroke={W} strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <g transform="translate(232 96)">
        <rect x="0" y="40" width="96" height="70" rx="6" fill={W} />
        <rect x="42" y="40" width="12" height="70" fill="#FF5C7A" />
        <g className="bs-lid">
          <rect x="-6" y="24" width="108" height="20" rx="5" fill={W} stroke="#FF5C7A" strokeWidth="2" />
          <rect x="42" y="24" width="12" height="20" fill="#FF5C7A" />
          <path d="M48 24 q-26 -26 -30 -6 q4 10 30 6 Z M48 24 q26 -26 30 -6 q-4 10 -30 6 Z" fill="#FF5C7A" />
        </g>
      </g>
      <Coins x={280} y={70} n={2} />
      <Coins x={40} y={60} n={2} />
    </g>
  );
}

function Safety() {
  return (
    <g>
      <circle className="bs-ring" cx="200" cy="120" r="70" fill="none" stroke={W} strokeWidth="2" style={{ transformOrigin: '200px 120px' }} />
      <circle className="bs-ring" cx="200" cy="120" r="70" fill="none" stroke={W} strokeWidth="2" style={{ transformOrigin: '200px 120px', '--d': '1.2s' }} />
      <path d="M200 46 L256 68 V118 Q256 168 200 196 Q144 168 144 118 V68 Z" fill={W} fillOpacity=".95" />
      <path d="M200 58 L246 76 V118 Q246 158 200 182 Q154 158 154 118 V76 Z" fill="#0E1B4D" fillOpacity=".08" />
      <rect x="180" y="112" width="40" height="34" rx="6" fill="#1F5BFF" />
      <path d="M188 112 v-10 a12 12 0 0 1 24 0 v10" fill="none" stroke="#1F5BFF" strokeWidth="5" />
      <circle cx="200" cy="127" r="4" fill={W} />
      <path className="bs-check" style={{ '--d': '0.4s' }} d="M300 70 l10 10 l20 -22" fill="none" stroke="#7CF0C8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${66 - i * 6} ${190 - i * 4} a${26 + i * 8} ${26 + i * 8} 0 0 1 ${52 + i * 16} 0`} fill="none" stroke={W} strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" className="bs-blink" style={{ '--d': `${i * 0.4}s` }} />
      ))}
      {[
        [80, 60],
        [330, 180]
      ].map(([x, y], i) => (
        <g key={i} className="bs-float" style={{ '--d': `${-i * 2}s` }}>
          <rect x={x - 16} y={y - 12} width="32" height="24" rx="5" fill={W} fillOpacity=".85" />
          <circle cx={x} cy={y} r="4" fill="#FF5C7A" />
        </g>
      ))}
    </g>
  );
}

const SCENES = {
  'Earn online': EarnOnline,
  'Paid surveys': PaidSurveys,
  'Work from home': WorkFromHome,
  Professionals,
  'Rewards & payouts': Rewards,
  'Safety & privacy': Safety
};

export default function BlogScene({ category }) {
  const Scene = SCENES[category] || EarnOnline;
  return (
    <g className="bs-scene">
      <Scene />
    </g>
  );
}
