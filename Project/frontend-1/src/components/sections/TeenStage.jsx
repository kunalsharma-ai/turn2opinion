// Home hero art for the Minors slide (Round 10b, Kunal, 20 Nov 2026): a neon "soundstage".
// A 3D carousel of teen topics spins around a glowing mic with a live equaliser, a sample poll fills in
// above it, and the "two keys" (parent + teen) turn below. Decorative: aria-hidden, no real data.
import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useMounted.js';

const TOPICS = [
  ['🎮', 'Games'],
  ['🎧', 'Music'],
  ['👟', 'Trainers'],
  ['📚', 'Study apps'],
  ['🍜', 'Snacks'],
  ['🎬', 'Creators']
];

// Sample polls. The bars are illustrative, so the card is labelled "Sample poll".
const POLLS = [
  { q: 'Best way to spend a free Saturday?', o: [['Gaming with friends', 46], ['Out and about', 34], ['Sleeping in', 20]], pick: 0, topic: 0 },
  { q: 'Where do you find new music?', o: [['Short videos', 52], ['Friends', 29], ['Playlists', 19]], pick: 1, topic: 1 },
  { q: 'What matters most in new trainers?', o: [['How they look', 44], ['Comfort', 38], ['Price', 18]], pick: 1, topic: 2 },
  { q: 'Would a homework-planner app help?', o: [['If it’s not boring', 55], ['Maybe', 30], ['Nope', 15]], pick: 0, topic: 3 }
];

export default function TeenStage() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0); // 0 question, 1 bars fill, 2 keys turn + points
  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase(2);
      return undefined;
    }
    const steps = [
      [900, () => setPhase(1)],
      [2300, () => setPhase(2)],
      [4800, () => {
        setPhase(0);
        setI((n) => (n + 1) % POLLS.length);
      }]
    ];
    const ts = steps.map(([ms, fn]) => setTimeout(fn, ms));
    return () => ts.forEach(clearTimeout);
  }, [i]);
  const p = POLLS[i];
  return (
    <div className="teen-stage" aria-hidden="true">
      <span className="tns-glow" />
      <span className="tns-waves">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="tns-shapes">
        {['tri', 'zig', 'ring', 'plus', 'tri', 'ring', 'zig', 'plus'].map((s, k) => (
          <i key={k} className={`s-${s}`} style={{ '--k': k }} />
        ))}
      </span>

      <div className="tns-orbit">
        <div className="tns-carousel">
          {TOPICS.map(([e, t], k) => (
            <span key={t} className={`tns-card ${k === p.topic ? 'is-live' : ''}`} style={{ '--k': k }}>
              <em>{e}</em>
              <b>{t}</b>
            </span>
          ))}
        </div>
        <span className="tns-floor" />
      </div>

      <span className="tns-mic">
        <span className="tns-eq">
          {Array.from({ length: 7 }).map((_, k) => (
            <i key={k} style={{ '--k': k }} />
          ))}
        </span>
        <b>Your voice</b>
      </span>

      <div className="tns-poll" key={`poll-${i}`}>
        <span className="tns-poll-tag">
          <i /> Sample poll · ages 13–17
        </span>
        <p>{p.q}</p>
        <ul>
          {p.o.map(([label, pct], k) => (
            <li key={label} className={phase >= 1 && k === p.pick ? 'is-you' : ''} style={{ '--p': phase >= 1 ? pct / 100 : 0, '--k': k }}>
              <span className="tsb" />
              <span className="tsl">{label}</span>
              <span className="tsv">{phase >= 1 ? `${pct}%` : ''}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`tns-keys ${phase >= 2 ? 'is-open' : ''}`}>
        <span className="tk k1">
          <i>🔑</i> Parent
        </span>
        <span className="tk-plus">+</span>
        <span className="tk k2">
          <i>🗝️</i> You
        </span>
        <span className="tk-eq">=</span>
        <span className="tk-lock">{phase >= 2 ? '🔓' : '🔒'}</span>
      </div>

      {phase >= 2 && (
        <div className="tns-points" key={`pts-${i}`}>
          <b>+100</b>
          <small>{TOPICS[p.topic][1]} channel tuned</small>
          <span className="tns-pop">
            {Array.from({ length: 10 }).map((_, k) => (
              <i key={k} style={{ '--k': k }} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}
