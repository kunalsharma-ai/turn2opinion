// CAPTCHA with two modes:
// 1) Google reCAPTCHA v2 when VITE_RECAPTCHA_SITE_KEY is set (token MUST be verified server-side
//    with the secret key – the backend endpoint is responsible for that).
// 2) Built-in visual/text challenge as a fallback for local development & previews.
//    It blocks naive bots but is NOT a security control on its own – always configure reCAPTCHA in production.
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ENV } from '../config/env.js';
import Icon from './Icon.jsx';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rnd = (n) => Math.floor(Math.random() * n);

function makeCode() {
  let s = '';
  for (let i = 0; i < 5; i++) s += CHARS[rnd(CHARS.length)];
  return s;
}
function makeSum() {
  const a = 2 + rnd(8);
  const b = 1 + rnd(9);
  return { q: `What is ${a} plus ${b}?`, a: String(a + b) };
}

function drawCode(canvas, code) {
  const dpr = window.devicePixelRatio || 1;
  const w = 168;
  const h = 52;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#E8EEFF');
  g.addColorStop(1, '#F3E9FF');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = `hsla(${200 + rnd(80)},70%,55%,.45)`;
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    ctx.moveTo(rnd(w), rnd(h));
    ctx.bezierCurveTo(rnd(w), rnd(h), rnd(w), rnd(h), rnd(w), rnd(h));
    ctx.stroke();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `hsla(${rnd(360)},60%,50%,.35)`;
    ctx.fillRect(rnd(w), rnd(h), 2, 2);
  }
  code.split('').forEach((ch, i) => {
    ctx.save();
    ctx.translate(18 + i * 30, 34 + rnd(6) - 3);
    ctx.rotate((rnd(40) - 20) * (Math.PI / 180));
    ctx.font = `800 ${24 + rnd(6)}px Manrope, system-ui, sans-serif`;
    ctx.fillStyle = ['#0E1B4D', '#1F5BFF', '#7B5CFF', '#D6336C'][rnd(4)];
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
}

let recaptchaPromise = null;
function loadRecaptcha() {
  if (recaptchaPromise) return recaptchaPromise;
  recaptchaPromise = new Promise((resolve, reject) => {
    window.__t2oRecaptchaReady = () => resolve(window.grecaptcha);
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?onload=__t2oRecaptchaReady&render=explicit';
    s.async = true;
    s.defer = true;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return recaptchaPromise;
}

function GoogleCaptcha({ onChange, resetKey }) {
  const box = useRef(null);
  const widget = useRef(null);
  useEffect(() => {
    let alive = true;
    loadRecaptcha()
      .then((g) => {
        if (!alive || !box.current) return;
        if (widget.current === null) {
          widget.current = g.render(box.current, {
            sitekey: ENV.RECAPTCHA_SITE_KEY,
            callback: (t) => onChange({ provider: 'recaptcha', token: t }),
            'expired-callback': () => onChange(null),
            'error-callback': () => onChange(null)
          });
        }
      })
      .catch(() => onChange(null));
    return () => {
      alive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (widget.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widget.current);
      onChange(null);
    }
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={box} className="recaptcha-box" />;
}

function LocalCaptcha({ onChange, resetKey, error, label }) {
  const id = useId();
  const canvas = useRef(null);
  const [mode, setMode] = useState('image');
  const [code, setCode] = useState('');
  const [sum, setSum] = useState(null);
  const [value, setValue] = useState('');
  const [ok, setOk] = useState(false);

  const regenerate = useCallback(() => {
    const c = makeCode();
    setCode(c);
    setSum(makeSum());
    setValue('');
    setOk(false);
    onChange(null);
  }, [onChange]);

  useEffect(() => {
    regenerate();
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mode === 'image' && canvas.current && code) drawCode(canvas.current, code);
  }, [code, mode]);

  const check = (v) => {
    setValue(v);
    const good = mode === 'image' ? v.trim().toUpperCase() === code : sum && v.trim() === sum.a;
    setOk(good);
    onChange(good ? { provider: 'local', token: `local.${Date.now().toString(36)}` } : null);
  };

  return (
    <div className={`captcha ${ok ? 'is-ok' : ''} ${error ? 'has-error' : ''}`}>
      <div className="captcha-top">
        <span className="captcha-shield" aria-hidden="true">
          <Icon name={ok ? 'check' : 'shield'} size={18} />
        </span>
        <span className="captcha-title">{label || 'Prove you’re human'}</span>
        <button type="button" className="captcha-refresh" onClick={regenerate} aria-label="New challenge">
          <Icon name="refresh" size={16} />
        </button>
      </div>
      <div className="captcha-body">
        {mode === 'image' ? (
          <canvas ref={canvas} className="captcha-canvas" style={{ width: 168, height: 52 }} aria-hidden="true" />
        ) : (
          <p className="captcha-q" id={`${id}-q`}>
            {sum && sum.q}
          </p>
        )}
        <input
          id={`${id}-in`}
          className="captcha-input"
          inputMode={mode === 'image' ? 'text' : 'numeric'}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck="false"
          maxLength={mode === 'image' ? 5 : 3}
          value={value}
          onChange={(e) => check(e.target.value)}
          aria-label={mode === 'image' ? 'Type the five characters shown in the image' : sum ? sum.q : 'Answer'}
          aria-invalid={error ? 'true' : 'false'}
          placeholder={mode === 'image' ? 'Type the code' : 'Answer'}
        />
      </div>
      <button type="button" className="captcha-switch" onClick={() => { setMode((m) => (m === 'image' ? 'text' : 'image')); setValue(''); setOk(false); onChange(null); }}>
        {mode === 'image' ? 'Can’t read it? Answer a text question instead' : 'Use the picture code instead'}
      </button>
    </div>
  );
}

export default function Captcha(props) {
  return ENV.RECAPTCHA_SITE_KEY ? <GoogleCaptcha {...props} /> : <LocalCaptcha {...props} />;
}
