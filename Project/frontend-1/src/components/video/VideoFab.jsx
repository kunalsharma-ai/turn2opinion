// The animated "Watch" button that floats on every page, and the theatre it opens.
//
// The button: a YouTube-red core inside a slowly turning ring of text ("WATCH · OUR · VIDEOS"),
// two sonar waves and a tiny equaliser that bounces while the page has a video. Hover or focus
// slides out a label with the name of this page's video.
//
// The theatre: the page's own showcase template (see VideoShowcase.jsx), full-screen, with focus
// trapped inside and Escape / backdrop click to close. Loaded with the other floating widgets,
// after the first interaction, so it never touches first paint.
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePath } from '../../router/Router.jsx';
import { videoFor, YT_CHANNEL } from '../../data/videos.js';
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

export default function VideoFab() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const v = videoFor(path);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const h = () => (v ? setOpen(true) : window.open(YT_CHANNEL, '_blank', 'noopener'));
    window.addEventListener('t2o:open-video', h);
    return () => window.removeEventListener('t2o:open-video', h);
  }, [v]);
  const go = () => (v ? setOpen(true) : window.open(YT_CHANNEL, '_blank', 'noopener'));
  return (
    <>
      <button
        type="button"
        className={`vfab${open ? ' is-open' : ''}`}
        onClick={go}
        aria-haspopup="dialog"
        aria-label={v ? `Watch this page's video: ${v.title} ${v.em || ''}` : 'Watch our videos on YouTube'}
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
        <span className="vfab__tip" aria-hidden="true">
          <small>{v ? v.eyebrow : 'YouTube'}</small>
          {v ? `${v.title} ${v.em || ''}` : 'Watch our videos'}
        </span>
      </button>
      {open && v && <Theatre v={v} onClose={close} />}
    </>
  );
}
