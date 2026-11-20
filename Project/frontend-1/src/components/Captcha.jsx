// Human check for sign-up and login.
//
// The challenge comes from the API (GET /api/v1/user/captcha) and is checked on the server when the
// form is submitted, once: a used or expired challenge is rejected, so the parent form asks for a new
// one (resetKey) after every failed submit. Typing never checks or submits anything. Enter inside
// the code box is ignored, so only the form's own button sends it.
//
// If the API can't be reached (local preview, older backend), a picture code drawn in the browser is
// used instead and checked on submit; that fallback blocks naive bots only.
//
// onChange receives null (nothing typed yet) or
//   { provider: 'server', id, answer }  -> send as `captcha: { id, answer }`
//   { provider: 'local', answer, valid } -> check `valid` on submit
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { api } from '../utils/api.js';
import Icon from './Icon.jsx';

const CHARS = 'ABCDEFGHJKLMNPRSTUVWXYZ2345678';
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

const norm = (v) => String(v || '').replace(/\s+/g, '').toUpperCase();

/** True when the value from onChange is ready to be submitted. */
export function captchaReady(c) {
  return !!(c && c.answer && norm(c.answer).length >= 1);
}
/** Body field for the API, or undefined for the browser-only fallback. */
export function captchaPayload(c) {
  return c && c.provider === 'server' ? { id: c.id, answer: norm(c.answer) } : undefined;
}
/** For the browser fallback only: does the typed answer match? */
export function captchaLocalOk(c) {
  return !!(c && c.provider === 'local' && c.valid);
}
/** Server message about the human check (so forms can put it under the box). */
export const isCaptchaError = (msg) => /human check|captcha/i.test(String(msg || ''));

export default function Captcha({ onChange, resetKey = 0, error, label, notice }) {
  const id = useId();
  const canvas = useRef(null);
  const timer = useRef(null);
  const [mode, setMode] = useState('image');
  const [source, setSource] = useState('loading'); // loading | server | local
  const [challenge, setChallenge] = useState(null); // server: { id, image | question }
  const [local, setLocal] = useState({ code: '', sum: null });
  const [value, setValue] = useState('');
  const [expired, setExpired] = useState(false);

  const load = useCallback(
    async (m = mode) => {
      clearTimeout(timer.current);
      setValue('');
      onChange(null);
      setSource('loading');
      try {
        const r = await api.get(`/api/v1/user/captcha?mode=${m === 'text' ? 'text' : 'image'}`);
        if (r?.status === 'success' && r.data?.id) {
          setChallenge(r.data);
          setSource('server');
          // Swap in a fresh code a little before the server forgets this one.
          const ms = Math.max(30, (r.data.expiresIn || 300) - 10) * 1000;
          timer.current = setTimeout(() => {
            setExpired(true);
            load(m);
          }, ms);
          return;
        }
        if (r?.status === 'error' && /too many/i.test(r.message || '')) {
          setChallenge({ id: null, blocked: r.message });
          setSource('server');
          return;
        }
      } catch {
        /* fall through to the browser code */
      }
      setLocal({ code: makeCode(), sum: makeSum() });
      setSource('local');
    },
    [mode, onChange]
  );

  useEffect(() => {
    load(mode);
    return () => clearTimeout(timer.current);
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (source === 'local' && mode === 'image' && canvas.current && local.code) drawCode(canvas.current, local.code);
  }, [local, mode, source]);

  const type = (v) => {
    setValue(v);
    setExpired(false);
    if (!v.trim()) return onChange(null);
    if (source === 'server' && challenge?.id) onChange({ provider: 'server', id: challenge.id, answer: v });
    else if (source === 'local') {
      const valid = mode === 'image' ? norm(v) === local.code : local.sum && v.trim() === local.sum.a;
      onChange({ provider: 'local', answer: v, valid });
    }
  };

  const switchMode = () => {
    const m = mode === 'image' ? 'text' : 'image';
    setMode(m);
    if (source === 'local') {
      setValue('');
      onChange(null);
    } else load(m);
  };

  const refresh = () => {
    setExpired(false);
    if (source === 'local') {
      setLocal({ code: makeCode(), sum: makeSum() });
      setValue('');
      onChange(null);
    } else load(mode);
  };

  const question = source === 'server' ? challenge?.question : local.sum?.q;
  return (
    <div className={`captcha ${error ? 'has-error' : ''}`}>
      <div className="captcha-top">
        <span className="captcha-shield" aria-hidden="true">
          <Icon name="shield" size={18} />
        </span>
        <span className="captcha-title">{label || 'Prove you’re human'}</span>
        <button type="button" className="captcha-refresh" onClick={refresh} aria-label="Get a new code">
          <Icon name="refresh" size={16} />
        </button>
      </div>
      <div className="captcha-body">
        {source === 'loading' ? (
          <span className="captcha-canvas captcha-loading" aria-hidden="true" />
        ) : mode === 'image' ? (
          source === 'server' ? (
            challenge?.image ? <img className="captcha-canvas" src={challenge.image} width="168" height="52" alt="CAPTCHA code: five letters and numbers" /> : <span className="captcha-canvas captcha-loading" aria-hidden="true" />
          ) : (
            <canvas ref={canvas} className="captcha-canvas" style={{ width: 168, height: 52 }} aria-hidden="true" />
          )
        ) : (
          <p className="captcha-q" id={`${id}-q`}>
            {question}
          </p>
        )}
        <input
          id={`${id}-in`}
          className="captcha-input"
          inputMode={mode === 'image' ? 'text' : 'numeric'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck="false"
          enterKeyHint="done"
          maxLength={mode === 'image' ? 5 : 3}
          value={value}
          disabled={source === 'loading' || !!challenge?.blocked}
          onChange={(e) => type(e.target.value)}
          onKeyDown={(e) => {
            // Never submit the form from the code box: only the form's button does that.
            if (e.key === 'Enter') e.preventDefault();
          }}
          aria-label={mode === 'image' ? 'Type the five characters shown in the image' : question || 'Answer'}
          aria-invalid={error ? 'true' : 'false'}
          placeholder={mode === 'image' ? 'Type the code' : 'Answer'}
        />
      </div>
      <p className="captcha-note">
        {challenge?.blocked
          ? challenge.blocked
          : expired
            ? 'That code expired, so here’s a new one.'
            : notice || (mode === 'image' ? 'Not case-sensitive. We check it when you press the button.' : 'We check it when you press the button.')}
      </p>
      <button type="button" className="captcha-switch" onClick={switchMode}>
        {mode === 'image' ? 'Can’t read it? Answer a text question instead' : 'Use the picture code instead'}
      </button>
    </div>
  );
}
