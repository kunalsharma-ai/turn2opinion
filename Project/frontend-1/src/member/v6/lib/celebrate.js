/* CHANGE-09 · Completion celebrations (canvas particle effects).
   One fixed, click-through <canvas> is created per celebration and removed when the last particle is gone
   (≈3 s), so nothing stays on top of the dashboard and nothing overlaps the next action.
   - capped particle count and device-pixel-ratio (≤ 2) to stay smooth on phones
   - stops early if the tab is hidden; does nothing with prefers-reduced-motion
   - every item has its own effect (lib/items.js → fx), drawn in the item's own palette and emoji */
import { reducedMotion } from './fx.js';

const TAU = Math.PI * 2;
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[(Math.random() * a.length) | 0];

function star(ctx, r) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, a = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); }
function heart(ctx, r) { ctx.beginPath(); ctx.moveTo(0, r * 0.35); ctx.bezierCurveTo(r, -r * 0.4, r * 0.5, -r * 1.1, 0, -r * 0.45); ctx.bezierCurveTo(-r * 0.5, -r * 1.1, -r, -r * 0.4, 0, r * 0.35); ctx.fill(); }
function gem(ctx, r) { ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(r * 0.8, -r * 0.2); ctx.lineTo(0, r); ctx.lineTo(-r * 0.8, -r * 0.2); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(r * 0.3, -r * 0.2); ctx.lineTo(-r * 0.3, -r * 0.2); ctx.closePath(); ctx.fill(); }
function coin(ctx, r, rot) { const sx = Math.abs(Math.cos(rot)) * 0.9 + 0.1; ctx.scale(sx, 1); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(160,100,0,.55)'; ctx.beginPath(); ctx.arc(0, 0, r * 0.68, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(-r * 0.3, -r * 0.3, r * 0.22, 0, TAU); ctx.fill(); }

/* ---- emitters: (W, H, o, P) → particles; o = origin {x,y}; P = { colors, emoji } ---- */
const burstFrom = (o, n, sp, mk) => Array.from({ length: n }, (_, i) => { const a = rnd(0, TAU), v = rnd(sp * 0.35, sp); return mk({ x: o.x, y: o.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v }, i); });
const E = {
  confetti: (W, H, o, P) => burstFrom(o, 150, 13, (b) => ({ ...b, vy: b.vy - 6, ay: 0.32, drag: 0.985, s: rnd(5, 9), shape: pick(['rect', 'rect', 'circle']), c: pick(P.colors), rot: rnd(0, TAU), vr: rnd(-0.3, 0.3), wob: rnd(0, TAU), life: rnd(110, 170) })),
  confetti2: (W, H, o, P) => [-1, 1].flatMap((side) => Array.from({ length: 70 }, () => ({ x: side < 0 ? 0 : W, y: H * 0.85, vx: -side * rnd(6, 15), vy: rnd(-20, -12), ay: 0.38, drag: 0.985, s: rnd(5, 10), shape: 'rect', c: pick(P.colors), rot: rnd(0, TAU), vr: rnd(-0.35, 0.35), wob: rnd(0, TAU), life: rnd(120, 170) }))),
  fireworks: (W, H, o, P) => { const out = []; for (let k = 0; k < 5; k++) { const cx = rnd(W * 0.18, W * 0.82), cy = rnd(H * 0.14, H * 0.42), c = pick(P.colors), delay = k * 22; for (let i = 0; i < 46; i++) { const a = (i / 46) * TAU, v = rnd(3.2, 5.6); out.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, ay: 0.06, drag: 0.97, s: rnd(2, 3.2), shape: 'circle', c, glow: 1, delay, life: rnd(60, 90), trail: 1 }); } } return out; },
  coins: (W, H, o, P) => Array.from({ length: 70 }, (_, i) => ({ x: rnd(0, W), y: rnd(-H * 0.6, -20), vx: rnd(-1, 1), vy: rnd(2, 6), ay: 0.22, drag: 0.995, s: rnd(9, 14), shape: 'coin', c: '#ffc83d', rot: rnd(0, TAU), vr: rnd(0.08, 0.2), life: 200 })),
  coins2: (W, H, o, P) => Array.from({ length: 80 }, () => ({ x: o.x + rnd(-20, 20), y: H + 10, vx: rnd(-7, 7), vy: rnd(-22, -14), ay: 0.42, drag: 0.99, s: rnd(9, 13), shape: 'coin', c: '#ffcf4a', rot: rnd(0, TAU), vr: rnd(0.1, 0.25), life: 170 })),
  stars: (W, H, o, P) => burstFrom(o, 90, 11, (b) => ({ ...b, ay: 0.05, drag: 0.96, s: rnd(4, 10), shape: 'star', c: pick(P.colors.concat('#fff6b0')), rot: rnd(0, TAU), vr: rnd(-0.12, 0.12), glow: 1, life: rnd(70, 120) })),
  hearts: (W, H, o, P) => Array.from({ length: 46 }, () => ({ x: rnd(W * 0.1, W * 0.9), y: H + rnd(0, 120), vx: rnd(-0.6, 0.6), vy: rnd(-5, -2.6), ay: -0.01, drag: 1, s: rnd(8, 16), shape: Math.random() < 0.5 ? 'heart' : 'text', t: pick(P.emoji), c: pick(P.colors), wob: rnd(0, TAU), life: 220 })),
  balloons: (W, H, o, P) => Array.from({ length: 22 }, () => ({ x: rnd(W * 0.05, W * 0.95), y: H + rnd(20, 260), vx: 0, vy: rnd(-4.2, -2.4), ay: 0, drag: 1, s: rnd(18, 28), shape: 'balloon', c: pick(P.colors), wob: rnd(0, TAU), life: 260 })),
  bubbles: (W, H, o, P) => Array.from({ length: 60 }, () => ({ x: rnd(0, W), y: H + rnd(0, 200), vx: rnd(-0.4, 0.4), vy: rnd(-4.5, -1.8), ay: 0, drag: 1, s: rnd(6, 20), shape: 'bubble', c: pick(P.colors), wob: rnd(0, TAU), life: 240 })),
  bubbles2: (W, H, o, P) => burstFrom(o, 50, 7, (b) => ({ ...b, ay: -0.04, drag: 0.97, s: rnd(6, 18), shape: 'bubble', c: pick(P.colors), wob: rnd(0, TAU), life: 150 })),
  petals: (W, H, o, P) => Array.from({ length: 70 }, () => ({ x: rnd(-40, W), y: rnd(-H * 0.5, -10), vx: rnd(0.6, 2.2), vy: rnd(1.2, 2.6), ay: 0, drag: 1, s: rnd(6, 11), shape: 'petal', c: pick(P.colors.concat('#ffc0d9')), rot: rnd(0, TAU), vr: rnd(-0.06, 0.06), wob: rnd(0, TAU), life: 260 })),
  leaves: (W, H, o, P) => Array.from({ length: 50 }, () => ({ x: rnd(0, W), y: rnd(-H * 0.5, -10), vx: rnd(-1, 1), vy: rnd(1.4, 3), ay: 0, drag: 1, s: rnd(12, 18), shape: 'text', t: pick(['🍃', '🌿', '🍀', ...P.emoji]), rot: rnd(0, TAU), vr: rnd(-0.05, 0.05), wob: rnd(0, TAU), life: 240 })),
  sparks: (W, H, o, P) => burstFrom(o, 120, 16, (b) => ({ ...b, ay: 0.3, drag: 0.96, s: rnd(1.5, 3), shape: 'spark', c: pick(['#fff3b0', '#ffb020', ...P.colors]), glow: 1, life: rnd(40, 80) })),
  shards: (W, H, o, P) => burstFrom(o, 70, 12, (b) => ({ ...b, ay: 0.12, drag: 0.975, s: rnd(6, 12), shape: 'tri', c: pick(P.colors), rot: rnd(0, TAU), vr: rnd(-0.25, 0.25), life: rnd(80, 130) })),
  pixels: (W, H, o, P) => burstFrom(o, 110, 12, (b) => ({ ...b, x: o.x + Math.round(b.vx) * 4, ay: 0.25, drag: 0.98, s: 7, shape: 'pixel', c: pick(P.colors), life: rnd(80, 130) })),
  ribbons: (W, H, o, P) => Array.from({ length: 34 }, () => ({ x: rnd(0, W), y: rnd(-H * 0.4, -10), vx: rnd(-1, 1), vy: rnd(2.2, 4), ay: 0.02, drag: 1, s: rnd(30, 52), shape: 'ribbon', c: pick(P.colors), wob: rnd(0, TAU), life: 230 })),
  scrolls: (W, H, o, P) => burstFrom(o, 40, 10, (b) => ({ ...b, vy: b.vy - 5, ay: 0.25, drag: 0.98, s: rnd(14, 22), shape: 'text', t: pick(['📜', '📚', '✏️', '🎓', '⭐']), rot: rnd(-0.5, 0.5), vr: rnd(-0.08, 0.08), life: 150 })),
  gems: (W, H, o, P) => burstFrom(o, 60, 12, (b) => ({ ...b, vy: b.vy - 4, ay: 0.28, drag: 0.98, s: rnd(6, 12), shape: 'gem', c: pick(['#7cf7ff', '#b28cff', '#ff8fd6', '#7dffb0', ...P.colors]), rot: rnd(-0.4, 0.4), vr: rnd(-0.1, 0.1), glow: 1, life: 150 })),
  paws: (W, H, o, P) => Array.from({ length: 16 }, (_, i) => ({ x: -30 - i * 60, y: H * 0.72 - (i % 2) * 26, vx: 7, vy: 0, ay: 0, drag: 1, s: 22, shape: 'text', t: '🐾', rot: 1.57, life: 230 })),
  lanterns: (W, H, o, P) => Array.from({ length: 26 }, () => ({ x: rnd(0, W), y: H + rnd(0, 260), vx: rnd(-0.3, 0.3), vy: rnd(-2.4, -1.2), ay: 0, drag: 1, s: rnd(10, 18), shape: 'lantern', c: pick(['#ffb347', '#ffd37a', ...P.colors]), wob: rnd(0, TAU), glow: 1, life: 300 })),
  spotlight: (W, H, o, P) => [{ x: W / 2, y: H, vx: 0, vy: 0, ay: 0, drag: 1, s: 1, shape: 'rays', c: P.colors[0], life: 150 }].concat(E.stars(W, H, o, P).slice(0, 50)),
  planes: (W, H, o, P) => Array.from({ length: 7 }, (_, i) => ({ x: -60 - i * 90, y: rnd(H * 0.15, H * 0.7), vx: rnd(8, 11), vy: rnd(-1.2, 0.2), ay: 0, drag: 1, s: 26, shape: 'text', t: pick(['✈️', '🛩️', '🎈', '🌍']), trailc: pick(P.colors), life: 200 })),
  streaks: (W, H, o, P) => Array.from({ length: 60 }, () => ({ x: -rnd(0, W), y: rnd(0, H), vx: rnd(22, 36), vy: 0, ay: 0, drag: 1, s: rnd(40, 140), shape: 'streak', c: pick(P.colors.concat('#ffffff')), life: 90 })),
  emoji: (W, H, o, P) => Array.from({ length: 44 }, () => ({ x: rnd(0, W), y: rnd(-H * 0.6, -20), vx: rnd(-0.6, 0.6), vy: rnd(2, 5), ay: 0.12, drag: 0.995, s: rnd(18, 30), shape: 'text', t: pick(P.emoji), rot: rnd(-0.6, 0.6), vr: rnd(-0.05, 0.05), life: 200 })),
  crown: (W, H, o, P) => [{ x: o.x, y: -60, vx: 0, vy: 10, ay: 0, drag: 0.93, s: 64, shape: 'text', t: '👑', life: 160, settle: o.y - 80 }].concat(E.stars(W, H, o, { colors: ['#ffd700', '#fff1a8', '#ffb020'] })).concat(E.confetti(W, H, o, P).slice(0, 90)),
};
export const FX_NAMES = Object.keys(E);

function draw(ctx, p) {
  ctx.save(); ctx.translate(p.x, p.y);
  if (p.rot) ctx.rotate(p.rot);
  const a = Math.max(0, Math.min(1, p.life / 30)); ctx.globalAlpha = a;
  ctx.fillStyle = p.c || '#fff';
  if (p.glow) { ctx.shadowColor = p.c; ctx.shadowBlur = 12; }
  const s = p.s;
  switch (p.shape) {
    case 'rect': ctx.scale(1, Math.cos(p.wob)); ctx.fillRect(-s / 2, -s / 4, s, s / 2); break;
    case 'circle': ctx.beginPath(); ctx.arc(0, 0, s, 0, TAU); ctx.fill(); break;
    case 'star': star(ctx, s); break;
    case 'heart': heart(ctx, s); break;
    case 'gem': gem(ctx, s); break;
    case 'coin': coin(ctx, s, p.rot || 0); break;
    case 'tri': ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.9, s * 0.6); ctx.lineTo(-s * 0.9, s * 0.6); ctx.closePath(); ctx.fill(); break;
    case 'pixel': ctx.fillRect(-s / 2, -s / 2, s, s); break;
    case 'spark': ctx.strokeStyle = p.c; ctx.lineWidth = s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-p.vx * 2.2, -p.vy * 2.2); ctx.stroke(); break;
    case 'streak': { const g = ctx.createLinearGradient(-s, 0, 0, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, p.c); ctx.strokeStyle = g; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-s, 0); ctx.lineTo(0, 0); ctx.stroke(); break; }
    case 'bubble': ctx.globalAlpha = a * 0.8; ctx.strokeStyle = p.c; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(0, 0, s, 0, TAU); ctx.stroke(); ctx.globalAlpha = a * 0.18; ctx.fill(); ctx.globalAlpha = a * 0.9; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-s * 0.35, -s * 0.35, s * 0.2, 0, TAU); ctx.fill(); break;
    case 'petal': ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.45, 0, 0, TAU); ctx.fill(); break;
    case 'ribbon': ctx.strokeStyle = p.c; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 10; i++) { const y = -s / 2 + i * s / 10; ctx.lineTo(Math.sin(p.wob + i * 0.8) * 6, y); } ctx.stroke(); break;
    case 'balloon': ctx.beginPath(); ctx.ellipse(0, 0, s * 0.75, s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(-s * 0.28, -s * 0.35, s * 0.15, s * 0.26, -0.4, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, s); ctx.quadraticCurveTo(6, s * 1.6, 0, s * 2.3); ctx.stroke(); break;
    case 'lantern': ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-s * 0.5, -s * 0.7, s, s * 1.4, s * 0.3) : ctx.rect(-s * 0.5, -s * 0.7, s, s * 1.4); ctx.fill(); break;
    case 'rays': { ctx.globalAlpha = a * 0.35; for (let i = 0; i < 9; i++) { const ang = -Math.PI / 2 + (i - 4) * 0.16 + Math.sin(p.wob = (p.wob || 0) + 0.004) * 0.2; ctx.save(); ctx.rotate(ang); const g = ctx.createLinearGradient(0, 0, 0, -ctx.canvas.height); g.addColorStop(0, p.c); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-60, -ctx.canvas.height); ctx.lineTo(60, -ctx.canvas.height); ctx.lineTo(8, 0); ctx.fill(); ctx.restore(); } break; }
    case 'text': ctx.shadowBlur = 0; ctx.font = `${s}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.t, 0, 0); break;
    default: break;
  }
  ctx.restore();
}

let active = null;
/** celebrate(variant, { colors, emoji, origin:{x,y} }) — returns a promise that resolves when the effect ends */
export function celebrate(variant, opt = {}) {
  if (reducedMotion() || typeof document === 'undefined') return Promise.resolve();
  if (active) active.stop();
  const cv = document.createElement('canvas'); cv.className = 'fx-canvas'; cv.setAttribute('aria-hidden', 'true');
  (opt.host || document.body).append(cv);
  const ctx = cv.getContext('2d'); if (!ctx) { cv.remove(); return Promise.resolve(); }
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = innerWidth, H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  const P = { colors: (opt.colors && opt.colors.length ? opt.colors : ['#1f5eff', '#00b4ff', '#ffb020']).filter(Boolean), emoji: opt.emoji && opt.emoji.length ? opt.emoji : ['🎉', '⭐', '✨'] };
  const o = opt.origin || { x: W / 2, y: H * 0.42 };
  let parts = (E[variant] || E.confetti)(W, H, o, P).slice(0, 220);
  let raf = 0, done;
  const finished = new Promise((r) => { done = r; });
  const stop = () => { cancelAnimationFrame(raf); cv.remove(); if (active && active.cv === cv) active = null; done(); };
  const frame = () => {
    if (document.hidden) return stop();
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of parts) {
      if (p.delay > 0) { p.delay--; alive++; continue; }
      if (p.life <= 0) continue;
      p.vx *= p.drag ?? 1; p.vy *= p.drag ?? 1; p.vy += p.ay || 0; p.x += p.vx + (p.wob != null && p.shape !== 'rays' ? Math.sin(p.wob += 0.08) * 0.6 : 0); p.y += p.vy;
      if (p.settle != null && p.y > p.settle) { p.y = p.settle; p.vy = 0; }
      if (p.vr) p.rot += p.vr;
      p.life--;
      if (p.trailc) { ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = p.trailc; ctx.lineWidth = 3; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(p.x - 120, p.y + 10); ctx.lineTo(p.x - 16, p.y + 4); ctx.stroke(); ctx.restore(); }
      draw(ctx, p); alive++;
    }
    if (!alive) return stop();
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  active = { cv, stop };
  return finished;
}
export const stopCelebration = () => { if (active) active.stop(); };
