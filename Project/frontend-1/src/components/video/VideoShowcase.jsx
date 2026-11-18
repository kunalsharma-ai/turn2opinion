// Page video showcase — one template per page.
//
// <VideoShowcase v={video} />           inline section (rendered above the footer of every page)
// <VideoShowcase v={video} modal />     the same template inside the floating "Watch" theatre
//
// Every template has its own poster scene (a pure-CSS/SVG animation inside the screen), its own
// colour grade and its own accent typeface, so no two pages present their video the same way.
// The player is a facade: the YouTube iframe (youtube-nocookie.com) is only created after the
// visitor presses play. Without a video ID the button opens the channel in a new tab instead.
import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useMounted.js';
import { Link } from '../../router/Router.jsx';
import Icon from '../Icon.jsx';
import { YT_CHANNEL, ytEmbed } from '../../data/videos.js';


/** The YouTube mark: white rounded tile with a red play triangle. */
export function YtMark({ size = 28 }) {
  return (
    <svg viewBox="0 0 28 20" width={size} height={(size * 20) / 28} aria-hidden="true" focusable="false">
      <rect width="28" height="20" rx="5.5" fill="#FF0000" />
      <path d="M11 5.6v8.8l7.6-4.4z" fill="#fff" />
    </svg>
  );
}

// The poster scenes are decorative and fairly large, so they live in their own chunk and load when
// the screen first comes near the viewport. The server-rendered HTML carries the empty frame.
let SCENES = null;
let scenesPromise = null;
const loadScenes = () => (scenesPromise ||= import('./scenes.jsx').then((m) => (SCENES = m.SCENES)));

/* ---------------- the screen (poster + player) ---------------- */
export function VideoScreen({ v, autoFocus }) {
  const [play, setPlay] = useState(false);
  const [ref, near] = useInView({ rootMargin: '400px 0px' });
  const [, ready] = useState(Boolean(SCENES));
  useEffect(() => {
    if ((near || autoFocus) && !SCENES) loadScenes().then(() => ready(true));
  }, [near, autoFocus]);
  const Scene = SCENES ? SCENES[v.template] || SCENES.premiere : null;
  const label = `${v.title} ${v.em || ''}`.trim();
  return (
    <div className="vs-screen" ref={ref}>
      {play && v.yt ? (
        <iframe
          title={`Video: ${label}`}
          src={ytEmbed(v)}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <span className="vs-scene" aria-hidden="true">
            {Scene && <Scene />}
          </span>
          {v.yt ? (
            <button type="button" className="vs-play" onClick={() => setPlay(true)} aria-label={`Play the video: ${label}`} autoFocus={autoFocus}>
              <span className="vs-play__ring" aria-hidden="true" />
              <span className="vs-play__core" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30">
                  <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          ) : (
            <a className="vs-play" href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${label} on the Turn2Opinion YouTube channel (opens in a new tab)`} autoFocus={autoFocus}>
              <span className="vs-play__ring" aria-hidden="true" />
              <span className="vs-play__core" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30">
                  <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
              </span>
            </a>
          )}
          <span className="vs-badge" aria-hidden="true">
            <YtMark size={20} /> {v.yt ? 'Play video' : 'Watch on YouTube'}
          </span>
        </>
      )}
    </div>
  );
}

const split = (p, i) => {
  const m = String(p).match(/^\s*([^·]{1,16}?)\s*·\s*(.+)$/);
  return m ? [m[1], m[2]] : [String(i + 1).padStart(2, '0'), String(p)];
};

function Cta({ cta, onNavigate }) {
  if (!cta) return null;
  if (/^https?:/i.test(cta.to))
    return (
      <a className="vs-btn vs-btn--main" href={cta.to} target="_blank" rel="noopener noreferrer">
        {cta.label} <Icon name="external" size={15} />
      </a>
    );
  return (
    <Link className="vs-btn vs-btn--main" to={cta.to} onClick={onNavigate}>
      {cta.label} <Icon name="arrow" size={16} />
    </Link>
  );
}

/** One page's video showcase in its own template. */
export default function VideoShowcase({ v, modal = false, onNavigate, headingId = 'pvid-h' }) {
  if (!v) return null;
  const Tag = modal ? 'div' : 'section';
  return (
    <Tag className={`vs vs--${v.template}${modal ? ' vs--modal' : ''}`} aria-labelledby={headingId} data-video={v.template}>
      <div className="vs-bg" aria-hidden="true">
        <i className="vs-glow g1" />
        <i className="vs-glow g2" />
        <span className="vs-word">{v.em || v.title}</span>
      </div>
      <div className="wrap vs-grid">
        <div className="vs-copy">
          <span className="vs-eye">
            <YtMark size={22} /> {v.eyebrow}
          </span>
          <h2 id={headingId} className="vs-h">
            {v.title} {v.em && <em>{v.em}</em>}
          </h2>
          {v.lede && <p className="vs-lede">{v.lede}</p>}
          {v.points && v.points.length > 0 && (
            <ul className="vs-pts">
              {v.points.map((p, i) => {
                const [a, b] = split(p, i);
                return (
                  <li key={p} style={{ '--i': i }}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="vs-ctas">
            <Cta cta={v.cta} onNavigate={onNavigate} />
            <a className="vs-btn vs-btn--yt" href={YT_CHANNEL} target="_blank" rel="noopener noreferrer">
              <YtMark size={22} /> Subscribe
            </a>
          </div>
        </div>
        <div className="vs-device">
          <VideoScreen v={v} autoFocus={modal} />
        </div>
      </div>
    </Tag>
  );
}
