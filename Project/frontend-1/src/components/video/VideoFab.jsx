// The animated "Watch" button that floats on every page, and the theatre it opens.
//
// The button: a YouTube-red core inside a slowly turning ring of text ("WATCH · OUR · VIDEOS"),
// two sonar waves and a tiny equaliser that bounces while the page has a video. Hover or focus
// slides out a label with the name of this page's video.
//
// The notification: a red "1" badge on the button and, a few seconds after a page opens, a chat-style
// message bubble beside it ("typing…", then "New video for this page: <title>" with a Watch now chip).
// Once per page per session; it hides itself after a while, on close, or when the video is opened.
//
// The theatre: the page's own showcase template (see VideoShowcase.jsx), full-screen, with focus
// trapped inside and Escape / backdrop click to close. Loaded with the other floating widgets,
// after the first interaction, so it never touches first paint.
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePath } from '../../router/Router.jsx';
import { videoFor, YT_CHANNEL } from '../../data/videos.js';
import { visit } from '../../utils/storage.js';
import VideoShowcase, { YtMark } from './VideoShowcase.jsx';

function Theatre({ v, onClose }) {
  const box = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    document.documentElement.classList.add('vt-lock');
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && box.current) {
        const f = [...box.current.querySelectorAll('a[href],button:not([disabled]),iframe')];
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', key);
    return () => {
      document.documentElement.classList.remove('vt-lock');
      window.removeEventListener('keydown', key);
      try {
        prev && prev.focus && prev.focus();
      } catch {
        /* element gone */
      }
    };
  }, [onClose]);
  return createPortal(
    <div className={`vt vt--${v.template}`} role="dialog" aria-modal="true" aria-labelledby="vt-h" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="vt-box" ref={box}>
        <button type="button" className="vt-x" onClick={onClose} aria-label="Close the video">
          ×
        </button>
        <VideoShowcase v={v} modal headingId="vt-h" onNavigate={onClose} />
      </div>
    </div>,
    document.body
  );
}

// Pages whose video was opened or whose message was dismissed (badge gone), and pages whose
// message already popped up once this session.
const SEEN = 't2o_vid_seen';
const NUDGED = 't2o_vid_nudged';
const list = (k) => {
  const l = visit.get(k, []);
  return Array.isArray(l) ? l : [];
};
const has = (k, path) => list(k).includes(path);
const mark = (k, path) => {
  const l = list(k);
  if (!l.includes(path)) visit.set(k, [...l, path].slice(-60));
};
const markSeen = (path) => mark(SEEN, path);

/** The chat-style "watch this page's video" bubble beside the button. */
function Nudge({ v, phase, onOpen, onClose, onHold }) {
  return (
    <div className={`vfab-msg is-${phase}`} role="status" aria-live="polite" onMouseEnter={() => onHold(true)} onMouseLeave={() => onHold(false)}>
      <div className="vfab-msg__head">
        <span className="vfab-msg__av" aria-hidden="true">
          <YtMark size={18} />
        </span>
        <b>Turn2Opinion</b>
        <span className="vfab-msg__now">now</span>
        <button type="button" className="vfab-msg__x" onClick={onClose} aria-label="Dismiss the video message">
          ×
        </button>
      </div>
      {phase === 'typing' ? (
        <span className="vfab-msg__typing" aria-label="Turn2Opinion is typing">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <button type="button" className="vfab-msg__body" onClick={onOpen}>
          <small>
            <span className="vfab-msg__bell" aria-hidden="true">🔔</span> New video for this page
          </small>
          <strong>
            {v.title} {v.em && <em>{v.em}</em>}
          </strong>
          <span className="vfab-msg__cta">
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
            </svg>
            Watch now
          </span>
        </button>
      )}
    </div>
  );
}

export default function VideoFab() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(true);
  const [phase, setPhase] = useState(null); // null | typing | shown | out
  const hold = useRef(false);
  const v = videoFor(path);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => setOpen(false), [path]);

  // Badge + bubble: once per page per session.
  useEffect(() => {
    setPhase(null);
    const already = !v || has(SEEN, path) || visit.get('t2o_vid_off');
    setSeen(already);
    // Closing the message with X turns it off on every page until the visitor reloads.
    if (already || has(NUDGED, path) || visit.get('t2o_vid_off')) return undefined;
    const t = [];
    const later = (fn, ms) => t.push(setTimeout(fn, ms));
    later(() => setPhase('typing'), 3500);
    later(() => {
      setPhase('shown');
      mark(NUDGED, path);
    }, 4900);
    const out = () => {
      if (hold.current) return later(out, 2500);
      setPhase('out');
      later(() => setPhase(null), 450);
    };
    later(out, 16000);
    return () => t.forEach(clearTimeout);
  }, [path, v]);

  const dismiss = useCallback(() => {
    setPhase('out');
    setTimeout(() => setPhase(null), 450);
    markSeen(path);
    visit.set('t2o_vid_off', true);
    setSeen(true);
  }, [path]);
  const watch = useCallback(() => {
    setPhase(null);
    markSeen(path);
    setSeen(true);
    setOpen(true);
  }, [path]);
  useEffect(() => {
    const h = () => (v ? setOpen(true) : window.open(YT_CHANNEL, '_blank', 'noopener'));
    window.addEventListener('t2o:open-video', h);
    return () => window.removeEventListener('t2o:open-video', h);
  }, [v]);
  const go = () => (v ? watch() : window.open(YT_CHANNEL, '_blank', 'noopener'));
  return (
    <>
      <button
        type="button"
        className={`vfab${open ? ' is-open' : ''}${phase ? ' has-msg' : ''}`}
        onClick={go}
        aria-haspopup="dialog"
        aria-label={v ? `Watch this page's video: ${v.title} ${v.em || ''}${seen ? '' : ' (1 new video)'}` : 'Watch our videos on YouTube'}
      >
        <i className="vfab__wave" aria-hidden="true" />
        <i className="vfab__wave vfab__wave--2" aria-hidden="true" />
        <span className="vfab__spin" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="vfab-c" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" />
            </defs>
            <text>
              <textPath href="#vfab-c" textLength="238" lengthAdjust="spacing">
                WATCH ● OUR ● VIDEOS ●{' '}
              </textPath>
            </text>
          </svg>
        </span>
        <span className="vfab__core" aria-hidden="true">
          <YtMark size={30} />
        </span>
        <span className="vfab__eq" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {!seen && (
          <span className="vfab__badge" aria-hidden="true">
            1
          </span>
        )}
        <span className="vfab__tip" aria-hidden="true">
          <small>{v ? v.eyebrow : 'YouTube'}</small>
          {v ? `${v.title} ${v.em || ''}` : 'Watch our videos'}
        </span>
      </button>
      {phase && v && !open && <Nudge v={v} phase={phase} onOpen={watch} onClose={dismiss} onHold={(h) => (hold.current = h)} />}
      {open && v && <Theatre v={v} onClose={close} />}
    </>
  );
}
