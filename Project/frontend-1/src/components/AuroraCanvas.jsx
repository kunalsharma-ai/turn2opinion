// Living colour field behind the hero: a tiny WebGL shader (no library) that paints slow, flowing aurora
// ribbons in the active language's colour grade. When the language changes, the colours glide to the new
// grade. Performance guards: renders at reduced resolution, ~30 fps, only while on screen and the tab is
// visible, one still frame for prefers-reduced-motion, and a CSS gradient fallback when WebGL is missing.
import { useEffect, useRef } from 'react';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;uniform vec2 m;uniform float lt;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
float tt=t*.06;vec2 q=vec2(fbm(p+tt),fbm(p+vec2(5.2,1.3)-tt));
vec2 w=p+2.2*q+vec2(m.x*.25,m.y*.15);float f=fbm(w+vec2(tt*.7,-tt*.4));
float band=smoothstep(.25,.95,sin((uv.y*3.2+f*3.4-t*.12))*.5+.5);
float band2=smoothstep(.45,1.,sin((uv.x*2.4-f*2.8+t*.09))*.5+.5);
vec3 base=vec3(.027,.024,.075);
vec3 col=base+c1*band*f*.95+c2*band2*q.x*.75+c3*pow(f,3.)*.9;
col+=vec3(1.)*pow(max(0.,f-.62),3.)*.6;
float vig=1.-smoothstep(.25,1.25,length(uv-vec2(.62,.45)));
col*=mix(.55,1.05,vig);
float g=h(gl_FragCoord.xy+t)*.035;
vec3 lc=vec3(.982,.978,1.);
lc=mix(lc,mix(c1,vec3(1.),.38),clamp(band*f*1.15,0.,1.)*.5);
lc=mix(lc,mix(c2,vec3(1.),.5),clamp(band2*q.x*1.3,0.,1.)*.42);
lc=mix(lc,mix(c3,vec3(1.),.35),clamp(pow(f,3.)*1.8,0.,1.)*.32);
lc=mix(lc,vec3(1.),(1.-smoothstep(0.,.55,uv.y))*.55);
vec3 dk=clamp(col+g,0.,1.);vec3 lg=clamp(lc+g*.25,0.,1.);
gl_FragColor=vec4(dk*(1.-lt)+lg*lt,1.);}`;

const hex = (s) => {
  const v = s.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map((c) => c + c).join('') : v, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
const readGrade = () => {
  const cs = getComputedStyle(document.documentElement);
  return ['--lg1', '--lg2', '--lg3'].map((k) => hex((cs.getPropertyValue(k) || '#6d5dfc').trim() || '#6d5dfc'));
};

export default function AuroraCanvas({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power', preserveDrawingBuffer: true });
    if (!gl) {
      canvas.classList.add('is-fallback');
      return;
    }
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.classList.add('is-fallback');
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = Object.fromEntries(['r', 't', 'c1', 'c2', 'c3', 'm', 'lt'].map((k) => [k, gl.getUniformLocation(prog, k)]));

    // Light (white) theme for English, dark cinematic theme for the other languages — blends with the grade.
    const themeLight = () => (document.documentElement.dataset.theme === 'light' ? 1 : 0);
    let lt = themeLight();
    let ltTo = lt;
    let cur = readGrade();
    let from = cur;
    let to = cur;
    let mix = 1;
    const onGrade = (e) => {
      from = cur;
      ltTo = themeLight();
      to = (e.detail || []).map(hex);
      if (to.length !== 3) to = readGrade();
      mix = 0;
      // Slow (software) GPUs and reduced motion: jump straight to the new grade in one frame.
      if (reduce) {
        cur = to;
        lt = ltTo;
        mix = 1;
        requestAnimationFrame((now) => draw(now)); // paint inside a frame so the compositor presents it
      }
    };
    window.addEventListener('t2o:grade', onGrade);

    // Software-rendered WebGL (no GPU: some VMs, old laptops, remote desktops) → paint one still frame.
    let software = false;
    try {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const name = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
      software = /swiftshader|llvmpipe|software|basic render/i.test(String(name));
    } catch {
      /* ignore */
    }
    const reduce = software || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Adaptive quality: if frames come in slowly while animating, halve the resolution, then freeze.
    let slowFrames = 0;
    let quality = 1;
    const scale = Math.min(window.devicePixelRatio || 1, 1) * (window.innerWidth < 700 ? 0.4 : 0.5);
    let scaleNow = scale;
    let redraw = null; // set once draw() exists; resizing a canvas clears it, so repaint right away
    const size = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scaleNow));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scaleNow));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        redraw?.();
      }
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(size) : null;
    ro?.observe(canvas);
    size();

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let last = 0;
    let visible = true;
    const t0 = performance.now() - 20000 * Math.random();
    const draw = (now) => {
      if (mix < 1) {
        mix = Math.min(1, mix + 0.035);
        const e = 1 - Math.pow(1 - mix, 3);
        cur = from.map((c, i) => c.map((v, j) => v + (to[i][j] - v) * e));
        lt += (ltTo - lt) * e;
        if (mix >= 1) lt = ltTo;
      }
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      gl.uniform2f(U.r, canvas.width, canvas.height);
      gl.uniform1f(U.t, (now - t0) / 1000);
      gl.uniform3fv(U.c1, cur[0]);
      gl.uniform3fv(U.c2, cur[1]);
      gl.uniform3fv(U.c3, cur[2]);
      gl.uniform2f(U.m, mx, my);
      gl.uniform1f(U.lt, lt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // Still-frame mode (software GPU / reduced motion): some compositors never present a WebGL canvas that
      // is not redrawn every frame, so the still frame is shown as an image behind a hidden canvas instead.
      if (reduce && mix >= 1) {
        try {
          canvas.parentElement.style.background = `center / cover no-repeat url(${canvas.toDataURL('image/jpeg', 0.86)})`;
          canvas.style.visibility = 'hidden';
        } catch {
          /* tainted/lost context: keep the canvas */
        }
      }
    };
    const loop = (now) => {
      raf = 0;
      if (!visible || document.hidden || held) return;
      if (now - last > 32) {
        if (last && now - last > 70) slowFrames++;
        else if (slowFrames > 0) slowFrames -= 0.25;
        if (slowFrames > 20) {
          slowFrames = 0;
          quality *= 0.5;
          if (quality < 0.3) return draw(now); // device can't keep up: leave a still frame
          scaleNow = scale * quality;
          size();
        }
        last = now;
        draw(now);
      }
      if (!reduce || mix < 1) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible && !document.hidden && !held) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const onVis = () => kick();
    // Paused while a full-screen dialog (language picker) covers the hero.
    let held = false;
    const onPause = () => { held = true; };
    const onResume = () => { held = false; kick(); };
    window.addEventListener('t2o:pause', onPause);
    window.addEventListener('t2o:resume', onResume);
    document.addEventListener('visibilitychange', onVis);
    const onGradeKick = () => !reduce && kick();
    window.addEventListener('t2o:grade', onGradeKick);
    redraw = () => requestAnimationFrame((now) => draw(now));
    draw(performance.now());
    canvas.classList.add('is-ready');
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro?.disconnect();
      window.removeEventListener('t2o:grade', onGrade);
      window.removeEventListener('t2o:grade', onGradeKick);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('t2o:pause', onPause);
      window.removeEventListener('t2o:resume', onResume);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={`aurora-canvas ${className}`} aria-hidden="true" />;
}
