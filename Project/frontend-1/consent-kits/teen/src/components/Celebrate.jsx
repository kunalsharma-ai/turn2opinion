// The moment the answer is sent: paper confetti, ribbons and a ring of light over the whole page, with the
// celebration sound (sound.js → 'party'). Everything is drawn on one canvas and the canvas removes itself when
// the burst is over. Under prefers-reduced-motion nothing moves: the sound plays and a soft glow fades in.
import { useEffect, useRef } from 'react';

const COLORS = ['#1f5bff', '#52c8ff', '#0a1a78', '#7be3d0', '#2fe3a2', '#ffffff', '#ffd166', '#12b6e8'];
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Celebrate({ run, onDone }) {
  const ref = useRef(null);
  const raf = useRef(0);
  useEffect(() => {
    if (!run) return undefined;
    const canvas = ref.current;
    if (!canvas || reduced()) {
      const id = setTimeout(() => onDone && onDone(), 900);
      return () => clearTimeout(id);
    }
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = () => canvas.clientWidth;
    const H = () => canvas.clientHeight;
    const size = () => { canvas.width = Math.floor(W() * dpr); canvas.height = Math.floor(H() * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    window.addEventListener('resize', size, { passive: true });

    const bits = [];
    const spawn = (x, y, n, power, spread) => {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * spread;
        const v = power * (0.55 + Math.random() * 0.75);
        bits.push({
          x, y,
          vx: Math.cos(a) * v * (0.85 + Math.random() * 0.5),
          vy: Math.sin(a) * v,
          w: 5 + Math.random() * 7,
          h: 8 + Math.random() * 12,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          sway: 0.6 + Math.random() * 1.6,
          phase: Math.random() * 6.28,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          ribbon: Math.random() < 0.28,
          life: 0,
        });
      }
    };
    spawn(W() * 0.1, H() + 12, 44, 17, 1.1);
    spawn(W() * 0.9, H() + 12, 44, 17, 1.1);
    spawn(W() * 0.5, H() * 0.44, 52, 12, 6.28);

    const start = performance.now();
    const DUR = 3200;
    const ring = { r: 0 };
    const tick = (now) => {
      const el = now - start;
      ctx.clearRect(0, 0, W(), H());
      // one ring of light from the middle
      if (el < 900) {
        ring.r = (el / 900) ** 0.55 * Math.max(W(), H()) * 0.62;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 0.35 * (1 - el / 900));
        ctx.lineWidth = 16 * (1 - el / 900) + 2;
        ctx.strokeStyle = '#9ad7ff';
        ctx.beginPath();
        ctx.arc(W() / 2, H() * 0.44, ring.r, 0, 6.2832);
        ctx.stroke();
        ctx.restore();
      }
      for (const b of bits) {
        b.life += 1;
        b.vy += 0.26; // gravity
        b.vx *= 0.995;
        b.x += b.vx + Math.sin((el / 420) + b.phase) * b.sway * 0.5;
        b.y += b.vy;
        b.rot += b.vr;
        const fade = el > DUR - 900 ? Math.max(0, 1 - (el - (DUR - 900)) / 900) : 1;
        if (b.y > H() + 40) continue;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = fade;
        ctx.fillStyle = b.c;
        if (b.ribbon) {
          ctx.beginPath();
          ctx.moveTo(-b.w, 0);
          ctx.quadraticCurveTo(0, -b.h * 0.7, b.w, 0);
          ctx.quadraticCurveTo(0, b.h * 0.45, -b.w, 0);
          ctx.fill();
        } else {
          const squash = Math.abs(Math.cos(b.rot * 1.4));
          ctx.fillRect(-b.w / 2, (-b.h / 2) * squash, b.w, Math.max(1.5, b.h * squash));
        }
        ctx.restore();
      }
      if (el < DUR) raf.current = requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, W(), H()); if (onDone) onDone(); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', size); };
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!run) return null;
  return <canvas className="confetti" ref={ref} aria-hidden="true" />;
}
