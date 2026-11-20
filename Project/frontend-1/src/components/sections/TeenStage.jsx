// Home hero art for the Teen slide. Round 10d (Kunal, 20 Nov 2026): "Swipe the trend".
// A tilted neon phone shows a sample swipe card (a product a teen might rate). A tap picks 🔥 or 🧊, the card flies
// off with a stamp, emoji burst out, points jump into the points pill, and the sample "trend board" beside the phone
// re-sorts. On the left, the two keys and the safety checks tick on. Decorative: aria-hidden, no real data.
import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useMounted.js';

// Sample cards. `hot` decides which way the card is swiped.
const CARDS = [
  { e: '🎮', name: 'Co-op racing game', topic: 'Games', q: 'Would you play it with friends?', hot: true, pts: 40, burst: ['🔥', '🎮', '⚡', '🏁'] },
  { e: '🥤', name: 'Mango fizz soda', topic: 'Snacks', q: 'Would you try this flavour?', hot: false, pts: 25, burst: ['🧊', '🥤', '💧', '❄️'] },
  { e: '👟', name: 'Glow-sole trainers', topic: 'Trainers', q: 'Would you wear these to school?', hot: true, pts: 35, burst: ['🔥', '👟', '✨', '💜'] },
  { e: '🎧', name: 'Study beats playlist', topic: 'Music', q: 'Would this help you focus?', hot: true, pts: 30, burst: ['🔥', '🎧', '🎵', '💫'] },
  { e: '📱', name: 'Homework planner app', topic: 'Study apps', q: 'Would you actually use it?', hot: false, pts: 30, burst: ['🧊', '📚', '🤔', '❄️'] }
];

// Sample trend board: the score of the topic just rated goes up, then the list re-sorts.
const START = { Games: 62, Music: 58, Trainers: 47, Snacks: 41, 'Study apps': 33 };
const STICKERS = ['🎮', '🎧', '👟', '🍕', '📸', '🛹', '🎨', '⚽'];
const CHECKS = ['Age 13–17 checked', 'Parent said yes', 'You said yes', 'Study reviewed'];

export default function TeenStage() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0); // 0 card in, 1 tap, 2 swiped + burst, 3 next
  const [pts, setPts] = useState(120);
  const [board, setBoard] = useState(START);
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTicks(CHECKS.length);
      return undefined;
    }
    if (ticks >= CHECKS.length) return undefined;
    const t = setTimeout(() => setTicks((n) => n + 1), ticks === 0 ? 500 : 420);
    return () => clearTimeout(t);
  }, [ticks]);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const c = CARDS[i];
    const steps = [
      [1300, () => setPhase(1)],
      [1900, () => {
        setPhase(2);
        setPts((n) => n + c.pts);
        setBoard((b) => ({ ...b, [c.topic]: Math.min(96, b[c.topic] + (c.hot ? 9 : 3)) }));
      }],
      [3400, () => {
        setPhase(0);
        setI((n) => (n + 1) % CARDS.length);
      }]
    ];
    const ts = steps.map(([ms, fn]) => setTimeout(fn, ms));
    return () => ts.forEach(clearTimeout);
  }, [i]);

  const c = CARDS[i];
  const next = CARDS[(i + 1) % CARDS.length];
  const sorted = Object.entries(board).sort((a, b) => b[1] - a[1]);
  const rank = Object.fromEntries(sorted.map(([k], r) => [k, r]));

  return (
    <div className="teen-stage tth" aria-hidden="true">
      <span className="tth-aura" />
      <span className="tth-rings">
        <i />
        <i />
        <i />
      </span>
      <span className="tth-stickers">
        {STICKERS.map((s, k) => (
          <i key={k} style={{ '--k': k }}>
            {s}
          </i>
        ))}
      </span>

      {/* left: two keys + safety ticks */}
      <div className="tth-safe">
        <div className={`tth-keys ${ticks >= 3 ? 'is-open' : ''}`}>
          <span className="tk1">🔑</span>
          <span className="tk2">🗝️</span>
          <b>{ticks >= 3 ? '🔓' : '🔒'}</b>
        </div>
        <ul>
          {CHECKS.map((t, k) => (
            <li key={t} className={k < ticks ? 'is-on' : ''}>
              <i>{k < ticks ? '✓' : ''}</i> {t}
            </li>
          ))}
        </ul>
      </div>

      {/* centre: the phone */}
      <div className="tth-phone">
        <span className="tth-notch" />
        <div className="tth-screen">
          <div className="tth-top">
            <span className="tth-tag">Teens · 13–17</span>
            <span className={`tth-pts ${phase === 2 ? 'is-pop' : ''}`} key={`p-${pts}`}>
              ⚡ {pts}
            </span>
          </div>
          <div className="tth-deck">
            <div className="tth-card is-back">
              <em>{next.e}</em>
            </div>
            <div className={`tth-card is-top ${phase === 2 ? (c.hot ? 'go-r' : 'go-l') : ''}`} key={`c-${i}`}>
              <span className="tth-topic">{c.topic}</span>
              <em>{c.e}</em>
              <b>{c.name}</b>
              <small>{c.q}</small>
              {phase === 2 && <span className={`tth-stamp ${c.hot ? 'hot' : 'nah'}`}>{c.hot ? '🔥 Hot' : '🧊 Nah'}</span>}
            </div>
          </div>
          <div className="tth-btns">
            <span className={`nah ${phase >= 1 && !c.hot ? 'is-tap' : ''}`}>🧊</span>
            <span className={`hot ${phase >= 1 && c.hot ? 'is-tap' : ''}`}>🔥</span>
          </div>
          <span className="tth-sample">Sample card</span>
        </div>
        {phase === 2 && (
          <span className="tth-burst" key={`b-${i}`}>
            {Array.from({ length: 10 }).map((_, k) => (
              <i key={k} style={{ '--k': k }}>
                {c.burst[k % c.burst.length]}
              </i>
            ))}
            <b>+{c.pts}</b>
          </span>
        )}
      </div>

      {/* right: sample trend board */}
      <div className="tth-board">
        <span className="tth-board-h">
          <i /> Trend board · sample
        </span>
        <ol>
          {Object.entries(board).map(([k, v]) => (
            <li key={k} className={k === c.topic && phase === 2 ? 'is-up' : ''} style={{ '--r': rank[k], '--v': v / 100 }}>
              <span className="n">{rank[k] + 1}</span>
              <span className="l">{k}</span>
              <span className="bar" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
