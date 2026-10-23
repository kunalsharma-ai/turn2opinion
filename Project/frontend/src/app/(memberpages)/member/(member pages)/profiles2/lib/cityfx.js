/* Opinion City effects (Web Animations API; transform and opacity only).
   - skyFirework(host, x, y, colors, label): a rocket climbs from a rooftop and bursts into a ring of sparks
     with "+100" in the middle.
   - flyToPill(fromRect, label, onLand): a glowing "+100" beacon arcs from the city to the header points pill.
   - dust(host, x, y): construction dust puffs when a tower lands.
   Every effect is skipped under prefers-reduced-motion (callbacks still run). */
import { reducedMotion } from './fx.js';

const mk = (cls, host, css) => { const e = document.createElement('span'); e.className = cls; if (css) Object.assign(e.style, css); host.append(e); return e; };
const done = (a, el) => a.finished.then(() => el.remove(), () => el.remove());

export function skyFirework(host, x, y0, y1, colors, label) {
  if (!host || reducedMotion()) return Promise.resolve();
  const rocket = mk('fw-rocket', host, { left: x + 'px', top: y0 + 'px', '--c': colors[0] });
  const climb = rocket.animate([{ transform: 'translate(-50%,0) scale(1)', opacity: 1 }, { transform: `translate(-50%,${y1 - y0}px) scale(.7)`, opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
  return climb.finished.then(() => {
    rocket.remove();
    const N = 22;
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2, r = 46 + (i % 3) * 14, c = colors[i % colors.length];
      const s = mk('fw-spark', host, { left: x + 'px', top: y1 + 'px', background: c, boxShadow: `0 0 8px ${c}` });
      done(s.animate([
        { transform: 'translate(-50%,-50%) scale(1.2)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(ang) * r}px), calc(-50% + ${Math.sin(ang) * r}px)) scale(.9)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${Math.cos(ang) * r * 1.15}px), calc(-50% + ${Math.sin(ang) * r * 1.15 + 26}px)) scale(.3)`, opacity: 0 },
      ], { duration: 1100 + (i % 4) * 90, easing: 'cubic-bezier(.15,.75,.35,1)' }), s);
    }
    const ring = mk('fw-ring', host, { left: x + 'px', top: y1 + 'px', borderColor: colors[1] || colors[0] });
    done(ring.animate([{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 0.9 }, { transform: 'translate(-50%,-50%) scale(2.6)', opacity: 0 }], { duration: 700, easing: 'ease-out' }), ring);
    if (label) {
      const t = mk('fw-label', host, { left: x + 'px', top: y1 + 'px' }); t.textContent = label;
      done(t.animate([
        { transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 },
        { transform: 'translate(-50%,-80%) scale(1.15)', opacity: 1, offset: 0.25 },
        { transform: 'translate(-50%,-95%) scale(1)', opacity: 1, offset: 0.75 },
        { transform: 'translate(-50%,-140%) scale(.9)', opacity: 0 },
      ], { duration: 1500, easing: 'ease-out' }), t);
    }
  });
}

export function dust(host, x, y) {
  if (!host || reducedMotion()) return;
  for (let i = 0; i < 7; i++) {
    const d = mk('fw-dust', host, { left: x + 'px', top: y + 'px' }), dx = (i - 3) * 12;
    done(d.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0.7 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% - ${8 + (i % 3) * 6}px)) scale(1.6)`, opacity: 0 }], { duration: 750 + i * 40, easing: 'ease-out' }), d);
  }
}

/* "+100" beacon from a point in the city to the header points pill (#rw-pts), or to `fallback` (the board's
   neon counter) when the header is scrolled out of view. Resolves with the element it landed on. */
const onScreen = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; };
export function flyToPill(from, label, colors, fallback) {
  const hp = document.getElementById('rw-pts'), pill = onScreen(hp) ? hp : fallback;
  if (!pill || reducedMotion()) return Promise.resolve(null);
  const to = pill.getBoundingClientRect(), tx = to.left + to.width / 2, ty = to.top + to.height / 2;
  const el = mk('fw-fly', document.body, { left: from.x + 'px', top: from.y + 'px', '--c1': colors[0], '--c2': colors[1] || colors[0] });
  el.innerHTML = `<i></i><b>${label}</b>`;
  const dx = tx - from.x, dy = ty - from.y, lift = Math.min(-80, dy * 0.35 - 90), k = [];
  for (let i = 0; i <= 16; i++) {
    const u = i / 16, x = dx * u, y = dy * u + lift * 4 * u * (1 - u), s = 1 + Math.sin(u * Math.PI) * 0.35 - u * 0.45;
    k.push({ transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) scale(${s.toFixed(3)})`, opacity: u > 0.94 ? 0.2 : 1 });
  }
  /* comet trail */
  const trail = [];
  for (let j = 1; j <= 4; j++) {
    const tr = mk('fw-trail', document.body, { left: from.x + 'px', top: from.y + 'px', background: colors[j % colors.length] });
    trail.push(tr.animate(k.map((f) => ({ transform: f.transform.replace(/scale\([^)]+\)/, `scale(${0.6 - j * 0.1})`), opacity: 0.7 - j * 0.12 })), { duration: 1050, delay: j * 45, easing: 'cubic-bezier(.45,.05,.4,1)' }));
    done(trail[trail.length - 1], tr);
  }
  const a = el.animate(k, { duration: 1050, easing: 'cubic-bezier(.45,.05,.4,1)' });
  return a.finished.then(() => { el.remove(); return pill; }, () => { el.remove(); return null; });
}

/* Header pill reaction when points land. */
export function pillPop(target) {
  const pill = target || document.getElementById('rw-pts'); if (!pill || reducedMotion()) return;
  pill.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 520, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  const r = pill.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const s = mk('fw-spark', document.body, { position: 'fixed', left: r.left + r.width / 2 + 'px', top: r.top + r.height / 2 + 'px', background: i % 2 ? 'var(--l4,#ffb020)' : 'var(--l1,#1f5eff)', zIndex: 90 });
    const ang = (i / 10) * Math.PI * 2;
    done(s.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * 34}px), calc(-50% + ${Math.sin(ang) * 26}px)) scale(.2)`, opacity: 0 }], { duration: 650, easing: 'ease-out' }), s);
  }
}
