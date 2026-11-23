/* Lightweight, short-lived effects. Everything here runs only on demand and cleans up after itself. */
export const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => typeof matchMedia !== 'undefined' && matchMedia('(pointer:fine)').matches;

/* Particle burst from an element, drawn inside the question card. */
export function burst(el, host) {
  if (reducedMotion() || !el || !host) return;
  const b = document.createElement('span'); b.className = 'burst';
  const r = el.getBoundingClientRect(), cr = host.getBoundingClientRect();
  b.style.left = (r.left - cr.left + r.width / 2) + 'px';
  b.style.top = (r.top - cr.top + r.height / 2) + 'px';
  const cs = ['var(--a)', 'var(--a2)', 'var(--a3)'];
  b.innerHTML = Array.from({ length: 10 }, (_, k) => `<i style="--r:${k * 36 + Math.random() * 20}deg;--dx:${36 + Math.random() * 30}px;--c:${cs[k % 3]}"></i>`).join('');
  host.append(b); setTimeout(() => b.remove(), 950);
}

/* Material-style ripple at the pointer position. */
export function ripple(el, e) {
  if (reducedMotion() || !el) return;
  const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = document.createElement('i');
  s.className = 'rp';
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  el.append(s); setTimeout(() => s.remove(), 650);
}

/* Confetti from the badge: one canvas, ~2.6s, then removed. */
export function confetti(colors, origin) {
  if (reducedMotion()) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:45';
  document.body.append(cv);
  const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5), x = cv.getContext('2d');
  cv.width = W * dpr; cv.height = H * dpr; x.scale(dpr, dpr);
  const cs = colors.concat('#ffffff'), N = W < 600 ? 70 : 130, ps = [];
  const br = origin ? origin.getBoundingClientRect() : { left: W / 2, top: H / 3, width: 0, height: 0 };
  const ox = br.left + br.width / 2, oy = br.top + br.height / 2;
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
    ps.push({ x: ox, y: oy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, w: 5 + Math.random() * 7, h: 3 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35, c: cs[i % cs.length], o: Math.random() < 0.3 });
  }
  const t0 = performance.now();
  (function f(now) {
    const e = now - t0; x.clearRect(0, 0, W, H);
    const al = Math.max(0, 1 - e / 2600);
    for (const p of ps) {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.22; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      x.globalAlpha = al; x.fillStyle = p.c; x.save(); x.translate(p.x, p.y); x.rotate(p.r);
      if (p.o) { x.beginPath(); x.arc(0, 0, p.w / 2.4, 0, 6.283); x.fill(); } else x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      x.restore();
    }
    if (e < 2600 && !document.hidden) requestAnimationFrame(f); else cv.remove();
  })(t0);
}

/* ---------- Per-profile completion celebrations ----------
   celebrate(world, colors, origin): one fixed canvas, ~3.2s, then removed. Every world has its own recipe —
   a choreography (burst, rain, rise, fireworks, fly-by, shockwave, speed streaks, pixel blast, orbit) plus
   its own particle shapes — so finishing each profile looks different. Honors prefers-reduced-motion. */
const TAU = Math.PI * 2;
const SH = {
  rect(x, s) { x.fillRect(-s / 2, -s / 3.2, s, s / 1.6); },
  dot(x, s) { x.beginPath(); x.arc(0, 0, s / 2.4, 0, TAU); x.fill(); },
  star(x, s) { x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s / 4.4 : s / 1.8, a = i * Math.PI / 5 - Math.PI / 2; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); },
  spark(x, s) { x.beginPath(); for (let i = 0; i < 8; i++) { const r = i % 2 ? s / 9 : s / 1.7, a = i * Math.PI / 4; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); },
  heart(x, s) { const k = s / 16; x.beginPath(); x.moveTo(0, 5 * k); x.bezierCurveTo(-9 * k, -1 * k, -5 * k, -9 * k, 0, -4 * k); x.bezierCurveTo(5 * k, -9 * k, 9 * k, -1 * k, 0, 5 * k); x.fill(); },
  coin(x, s) { x.beginPath(); x.arc(0, 0, s / 2, 0, TAU); x.fill(); x.save(); x.globalAlpha *= 0.55; x.strokeStyle = '#fff'; x.lineWidth = s / 9; x.beginPath(); x.arc(0, 0, s / 3.3, 0, TAU); x.stroke(); x.restore(); },
  gem(x, s) { x.beginPath(); x.moveTo(-s / 2, -s / 6); x.lineTo(-s / 4, -s / 2); x.lineTo(s / 4, -s / 2); x.lineTo(s / 2, -s / 6); x.lineTo(0, s / 2); x.closePath(); x.fill(); x.save(); x.globalAlpha *= 0.5; x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-s / 4, -s / 2); x.lineTo(0, -s / 6); x.lineTo(-s / 2, -s / 6); x.fill(); x.restore(); },
  leaf(x, s) { x.beginPath(); x.moveTo(0, -s / 2); x.quadraticCurveTo(s / 2, 0, 0, s / 2); x.quadraticCurveTo(-s / 2, 0, 0, -s / 2); x.fill(); },
  petal(x, s) { x.beginPath(); x.ellipse(0, 0, s / 2.2, s / 4.4, 0, 0, TAU); x.fill(); },
  bubble(x, s) { x.save(); x.lineWidth = Math.max(1.2, s / 12); x.strokeStyle = x.fillStyle; x.beginPath(); x.arc(0, 0, s / 2, 0, TAU); x.stroke(); x.globalAlpha *= 0.35; x.fillStyle = '#fff'; x.beginPath(); x.arc(-s / 6, -s / 6, s / 8, 0, TAU); x.fill(); x.restore(); },
  ring(x, s) { x.save(); x.lineWidth = s / 6; x.strokeStyle = x.fillStyle; x.beginPath(); x.arc(0, 0, s / 2.6, 0, TAU); x.stroke(); x.restore(); },
  pixel(x, s) { const q = Math.round(s / 1.6); x.fillRect(-q / 2, -q / 2, q, q); },
  cap(x, s) { x.beginPath(); x.moveTo(0, -s / 3); x.lineTo(s / 1.6, 0); x.lineTo(0, s / 3); x.lineTo(-s / 1.6, 0); x.closePath(); x.fill(); x.fillRect(-s / 3.2, 0, s / 1.6, s / 3.4); x.fillRect(s / 2.2, 0, s / 14, s / 2.2); },
  paw(x, s) { const k = s / 20; [[-6, -5], [-2, -9], [3, -9], [7, -5]].forEach(([a, b]) => { x.beginPath(); x.arc(a * k, b * k, 2.4 * k, 0, TAU); x.fill(); }); x.beginPath(); x.ellipse(0.5 * k, 2 * k, 6 * k, 5 * k, 0, 0, TAU); x.fill(); },
  note(x, s) { const k = s / 18; x.beginPath(); x.ellipse(-3 * k, 5 * k, 4 * k, 3 * k, -0.4, 0, TAU); x.fill(); x.fillRect(0.4 * k, -8 * k, 1.8 * k, 13 * k); x.fillRect(0.4 * k, -8 * k, 7 * k, 2.6 * k); },
  plane(x, s) { const k = s / 20; x.beginPath(); x.moveTo(10 * k, 0); x.lineTo(-6 * k, -9 * k); x.lineTo(-3 * k, 0); x.lineTo(-6 * k, 9 * k); x.closePath(); x.fill(); },
  bolt(x, s) { const k = s / 20; x.beginPath(); x.moveTo(2 * k, -10 * k); x.lineTo(-6 * k, 2 * k); x.lineTo(0, 2 * k); x.lineTo(-2 * k, 10 * k); x.lineTo(6 * k, -2 * k); x.lineTo(0, -2 * k); x.closePath(); x.fill(); },
  check(x, s) { x.fillRect(-s / 2, -s / 2, s / 2, s / 2); x.fillRect(0, 0, s / 2, s / 2); x.save(); x.globalAlpha *= 0.25; x.fillRect(0, -s / 2, s / 2, s / 2); x.fillRect(-s / 2, 0, s / 2, s / 2); x.restore(); },
  drop(x, s) { x.beginPath(); x.moveTo(0, -s / 2); x.bezierCurveTo(s / 2, 0, s / 3, s / 2, 0, s / 2); x.bezierCurveTo(-s / 3, s / 2, -s / 2, 0, 0, -s / 2); x.fill(); },
  plus(x, s) { x.fillRect(-s / 2, -s / 7, s, s / 3.5); x.fillRect(-s / 7, -s / 2, s / 3.5, s); },
  ribbon(x, s, p) { x.save(); x.lineWidth = s / 4; x.lineCap = 'round'; x.strokeStyle = x.fillStyle; x.beginPath(); for (let i = 0; i <= 6; i++) { const yy = (i - 3) * s / 3; x.lineTo(Math.sin(i * 1.3 + p.ph) * s / 3, yy); } x.stroke(); x.restore(); },
  fish(x, s) { const k = s / 20; x.beginPath(); x.ellipse(0, 0, 8 * k, 5 * k, 0, 0, TAU); x.fill(); x.beginPath(); x.moveTo(-6 * k, 0); x.lineTo(-12 * k, -5 * k); x.lineTo(-12 * k, 5 * k); x.fill(); },
  emo(x, s, p) { x.font = `${Math.round(s * 1.6)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(p.ch, 0, 0); },
  ball(x, s) { x.beginPath(); x.arc(0, 0, s / 2, 0, TAU); x.fill(); x.save(); x.strokeStyle = '#fff'; x.globalAlpha *= 0.7; x.lineWidth = s / 12; x.beginPath(); x.arc(0, 0, s / 2, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(0, 0, s / 2, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore(); },
};
/* recipe: [choreographies…], shapes, density, glow */
export const CELEBRATIONS = {
  brand: [['burst', 'rain'], ['rect', 'dot', 'star']],
  identity: [['orbit', 'burst'], ['dot', 'star', 'ring']],
  executive: [['rings', 'rain'], ['rect', 'spark', 'coin']],
  vault: [['rings', 'orbit'], ['gem', 'spark', 'ring'], 1, 1],
  campus: [['toss', 'burst'], ['cap', 'star', 'rect']],
  finance: [['rain', 'burst'], ['coin', 'spark', 'rect']],
  bank: [['fireworks', 'rain'], ['coin', 'gem', 'spark'], 1, 1],
  family: [['rise', 'burst'], ['heart', 'star', 'dot']],
  home: [['rain', 'rings'], ['leaf', 'heart', 'dot']],
  services: [['streaks', 'burst'], ['plus', 'spark', 'rect']],
  pets: [['walk', 'rise'], ['paw', 'heart', 'fish']],
  shop: [['burst', 'rain'], ['star', 'coin', 'ribbon']],
  luxury: [['fireworks', 'rain'], ['gem', 'spark', 'dot'], 1, 1],
  beauty: [['rise', 'rain'], ['petal', 'bubble', 'spark']],
  fashion: [['streaks', 'rain'], ['ribbon', 'rect', 'star']],
  food: [['burst', 'rise'], ['dot', 'leaf', 'bubble']],
  lounge: [['rise', 'fireworks'], ['bubble', 'dot', 'spark'], 1, 1],
  tech: [['pixels', 'rings'], ['pixel', 'bolt', 'ring'], 1, 1],
  media: [['fireworks', 'rain'], ['star', 'note', 'rect'], 1, 1],
  gamer: [['pixels', 'fireworks'], ['pixel', 'star', 'bolt'], 1.2, 1],
  creator: [['rise', 'burst'], ['heart', 'star', 'note']],
  health: [['rise', 'rings'], ['plus', 'leaf', 'drop']],
  sports: [['streaks', 'toss'], ['ball', 'star', 'rect']],
  travel: [['fly', 'burst'], ['plane', 'dot', 'star']],
  auto: [['streaks', 'burst'], ['check', 'bolt', 'spark'], 1, 1],
  rewards: [['fireworks', 'burst'], ['star', 'coin', 'rect']],
  'home-household': [['rise', 'rain'], ['bubble', 'heart', 'leaf']],
  'household-services': [['streaks', 'rings'], ['spark', 'plus', 'drop']],
  'beauty-personal-care': [['orbit', 'rise'], ['petal', 'drop', 'spark']],
  'food-beverages': [['rise', 'toss'], ['bubble', 'drop', 'leaf']],
  'restaurants-food-delivery': [['fly', 'rain'], ['dot', 'star', 'rect']],
  'consumer-electronics': [['pixels', 'orbit'], ['bolt', 'pixel', 'dot'], 1, 1],
  'technology-digital-services': [['orbit', 'pixels'], ['ring', 'pixel', 'spark'], 1, 1],
  'gaming-esports': [['fireworks', 'pixels'], ['star', 'pixel', 'bolt'], 1.2, 1],
  'health-wellness': [['rise', 'orbit'], ['leaf', 'bubble', 'drop']],
  'sports-physical-fitness': [['toss', 'streaks'], ['bolt', 'ball', 'star']],
  'travel-tourism': [['fly', 'orbit'], ['plane', 'star', 'dot']],
  'automotive-mobility': [['streaks', 'orbit'], ['bolt', 'check', 'dot'], 1, 1],
  'research-panel': [['rings', 'fireworks'], ['spark', 'star', 'dot']],
};

export function celebrate(world, colors, origin, variant, emojis) {
  if (reducedMotion()) return;
  let [modes, shapes, dens = 1, glow = 0] = CELEBRATIONS[world] || CELEBRATIONS.brand;
  if (variant) { modes = modes.slice().reverse(); shapes = shapes.slice(1).concat('star'); }   /* teen profiles get their own take */
  const cv = document.createElement('canvas');
  cv.className = 'celebrate'; cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:45';
  document.body.append(cv);
  const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5), x = cv.getContext('2d');
  cv.width = W * dpr; cv.height = H * dpr; x.scale(dpr, dpr);
  const small = W < 600, cs = colors.concat('#ffffff'), ps = [], fx = [];
  const br = origin ? origin.getBoundingClientRect() : { left: W / 2, top: H / 3, width: 0, height: 0 };
  const ox = br.left + br.width / 2, oy = br.top + br.height / 2;
  const R = Math.random, pick = (a) => a[Math.floor(R() * a.length)];
  const add = (o) => ps.push(Object.assign({ r: R() * TAU, vr: (R() - 0.5) * 0.25, s: 8 + R() * 10, c: pick(cs), sh: pick(shapes), g: 0.2, dr: 0.985, ph: R() * TAU, life: 3000, t: 0, a: 1 }, o));
  const n = (k) => Math.round(k * dens * (small ? 0.55 : 1));
  const spawn = {
    burst(d = 0) { for (let i = 0; i < n(90); i++) { const a = R() * TAU, s = 4 + R() * 9; add({ x: ox, y: oy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, d }); } },
    rain(d = 350) { for (let i = 0; i < n(70); i++) add({ x: R() * W, y: -20 - R() * H * 0.5, vx: (R() - 0.5) * 1.2, vy: 1.5 + R() * 2.5, g: 0.03, dr: 1, sway: 1, d }); },
    rise(d = 0) { for (let i = 0; i < n(55); i++) add({ x: R() * W, y: H + 20 + R() * H * 0.4, vx: 0, vy: -(1.4 + R() * 2.4), g: -0.012, dr: 0.997, sway: 1.6, vr: 0, r: 0, s: 12 + R() * 16, d }); },
    toss(d = 0) { for (let i = 0; i < n(36); i++) { const a = -Math.PI / 2 + (R() - 0.5) * 1.1; add({ x: W / 2 + (R() - 0.5) * W * 0.5, y: H + 10, vx: Math.cos(a) * 8, vy: -(12 + R() * 7), g: 0.32, s: 16 + R() * 12, vr: (R() - 0.5) * 0.4, d }); } },
    orbit(d = 0) { for (let i = 0; i < n(48); i++) add({ orb: 1, cx: ox, cy: oy, rad: 50 + R() * Math.min(W, H) * 0.35, ang: R() * TAU, w: (0.02 + R() * 0.03) * (R() < 0.5 ? -1 : 1), grow: 1 + R() * 2.2, s: 6 + R() * 9, d }); },
    rings(d = 0) { for (let k = 0; k < 4; k++) fx.push({ k: 'ring', x: ox, y: oy, d: d + k * 260, c: cs[k % cs.length] }); this.burst(d + 120); },
    streaks(d = 0) { for (let k = 0; k < n(26); k++) fx.push({ k: 'streak', y: R() * H, len: 120 + R() * 260, sp: 18 + R() * 22, d: d + R() * 900, c: pick(cs), dir: R() < 0.5 ? 1 : -1 }); for (let i = 0; i < n(50); i++) { const dir = R() < 0.5 ? 1 : -1; add({ x: dir > 0 ? -20 : W + 20, y: R() * H * 0.8, vx: dir * (8 + R() * 8), vy: -R() * 3, g: 0.1, d: d + R() * 600 }); } },
    pixels(d = 0) { for (let i = 0; i < n(120); i++) { const a = R() * TAU, s = 2 + R() * 10; add({ x: ox, y: oy, vx: Math.round(Math.cos(a) * s), vy: Math.round(Math.sin(a) * s), g: 0.06, dr: 0.97, vr: 0, r: 0, sh: R() < 0.7 ? 'pixel' : pick(shapes), d: d + Math.floor(R() * 4) * 90 }); } },
    fireworks(d = 0) { const k = small ? 4 : 7; for (let i = 0; i < k; i++) fx.push({ k: 'rocket', x: W * (0.15 + R() * 0.7), y: H + 10, ty: H * (0.12 + R() * 0.35), d: d + i * 320, c: pick(cs) }); },
    fly(d = 0) { for (let i = 0; i < (small ? 3 : 5); i++) { const dir = i % 2 ? -1 : 1; fx.push({ k: 'fly', y: H * (0.18 + i * 0.14), dir, d: d + i * 220, c: cs[i % cs.length], amp: 20 + R() * 40 }); } this.burst(d + 700); },
    walk(d = 0) { for (let i = 0; i < 14; i++) fx.push({ k: 'paw', x: W * 0.08 + i * (W * 0.84 / 13), y: H * 0.78 - Math.sin(i / 2) * 30 - (i % 2) * 22, d: d + i * 120, c: cs[i % 3] }); },
  };
  modes.forEach((m, i) => spawn[m] && spawn[m](i ? 450 : 0));
  /* the profile's own emoji join the party: a burst from the badge, then a gentle shower */
  if (emojis && emojis.length) {
    for (let i = 0; i < n(18); i++) { const a = -Math.PI / 2 + (R() - 0.5) * 2.4, sp = 6 + R() * 8; add({ x: ox, y: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3, g: 0.22, sh: 'emo', ch: pick(emojis), s: 14 + R() * 12, vr: (R() - 0.5) * 0.12, d: 120 }); }
    for (let i = 0; i < n(14); i++) add({ x: R() * W, y: -40 - R() * H * 0.4, vx: (R() - 0.5), vy: 1.6 + R() * 2, g: 0.02, dr: 1, sway: 1.2, sh: 'emo', ch: pick(emojis), s: 12 + R() * 14, vr: (R() - 0.5) * 0.05, d: 900 });
  }
  const glw = glow && !small; if (glw) x.shadowColor = colors[0];
  const t0 = performance.now(), END = 3400;
  const burstAt = (X, Y, c) => { for (let i = 0; i < n(40); i++) { const a = R() * TAU, s = 2 + R() * 5; add({ x: X, y: Y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: 0.06, dr: 0.975, s: 4 + R() * 6, c: R() < 0.7 ? c : '#fff', sh: R() < 0.5 ? 'spark' : pick(shapes), life: 1500 }); } };
  let prev = t0;
  (function f(now) {
    const e = now - t0, dt = Math.min(2.5, (now - prev) / 16.7); prev = now;
    x.clearRect(0, 0, W, H);
    const fade = e > END - 700 ? Math.max(0, (END - e) / 700) : 1;
    for (const q of fx) {
      const le = e - q.d; if (le < 0) continue;
      if (q.k === 'ring') { const p = le / 900; if (p > 1) continue; x.globalAlpha = (1 - p) * 0.8 * fade; x.strokeStyle = q.c; x.lineWidth = 6 * (1 - p) + 1; x.beginPath(); x.arc(q.x, q.y, 20 + p * Math.max(W, H) * 0.45, 0, TAU); x.stroke(); }
      else if (q.k === 'streak') { const X = q.dir > 0 ? -q.len + le * q.sp / 16 : W + q.len - le * q.sp / 16; if (X < -q.len * 2 || X > W + q.len * 2) continue; const gr = x.createLinearGradient(X, 0, X - q.dir * q.len, 0); gr.addColorStop(0, q.c); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.globalAlpha = 0.7 * fade; x.strokeStyle = gr; x.lineWidth = 3; x.beginPath(); x.moveTo(X, q.y); x.lineTo(X - q.dir * q.len, q.y); x.stroke(); }
      else if (q.k === 'rocket') { const p = Math.min(1, le / 700); const Y = q.y + (q.ty - q.y) * (1 - Math.pow(1 - p, 2)); if (p < 1) { x.globalAlpha = fade; x.fillStyle = q.c; x.beginPath(); x.arc(q.x, Y, 3, 0, TAU); x.fill(); x.globalAlpha = 0.35 * fade; x.fillRect(q.x - 1, Y, 2, 40); } else if (!q.boom) { q.boom = 1; burstAt(q.x, q.ty, q.c); } }
      else if (q.k === 'fly') { const p = le / 1900; if (p > 1) continue; const X = q.dir > 0 ? -60 + p * (W + 120) : W + 60 - p * (W + 120), Y = q.y + Math.sin(p * Math.PI * 2) * q.amp; x.globalAlpha = 0.45 * fade; x.strokeStyle = q.c; x.setLineDash([6, 8]); x.lineWidth = 2; x.beginPath(); for (let k = 0; k <= 20; k++) { const pp = Math.max(0, p - k * 0.012), XX = q.dir > 0 ? -60 + pp * (W + 120) : W + 60 - pp * (W + 120); x.lineTo(XX, q.y + Math.sin(pp * Math.PI * 2) * q.amp); } x.stroke(); x.setLineDash([]); x.globalAlpha = fade; x.fillStyle = q.c; x.save(); x.translate(X, Y); x.rotate((q.dir > 0 ? 0 : Math.PI) + Math.cos(p * Math.PI * 2) * 0.35 * q.dir); SH[shapes.includes('plane') ? 'plane' : 'star'](x, small ? 26 : 34); x.restore(); }
      else if (q.k === 'paw') { const p = le / 1600; if (p > 1) continue; x.globalAlpha = Math.min(1, p * 5) * (1 - p) * fade; x.fillStyle = q.c; x.save(); x.translate(q.x, q.y); x.rotate(Math.PI / 2); SH.paw(x, 30); x.restore(); }
    }
    for (const p of ps) {
      if (p.d) { if (e < p.d) continue; }
      p.t += dt * 16.7; if (p.t > p.life) continue;
      if (p.orb) { p.ang += p.w * dt; p.rad += p.grow * dt * 0.4; p.x = p.cx + Math.cos(p.ang) * p.rad; p.y = p.cy + Math.sin(p.ang) * p.rad * 0.55; }
      else { p.vx *= Math.pow(p.dr, dt); p.vy = p.vy * Math.pow(p.dr, dt) + p.g * dt; p.x += (p.vx + (p.sway ? Math.sin(p.t / 300 + p.ph) * p.sway : 0)) * dt; p.y += p.vy * dt; p.r += p.vr * dt; }
      const lf = p.life < 3000 ? 1 - p.t / p.life : 1;
      x.globalAlpha = Math.max(0, lf * fade); x.fillStyle = p.c; x.shadowBlur = glw ? 10 : 0;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r); (SH[p.sh] || SH.rect)(x, p.s, p); x.restore();
    }
    x.shadowBlur = 0;
    if (e < END && !document.hidden) requestAnimationFrame(f); else cv.remove();
  })(t0);
}
