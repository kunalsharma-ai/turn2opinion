// "Member voices" as voice notes: the featured review plays like an audio message – a waveform sweeps while the words
// light up one by one (read-along). Beside it, a live rating gauge built only from reviews on record and a queue of
// every voice. New reviews (posted on the site or approved via the API) jump to the front of the queue instantly.
import { useEffect, useMemo, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials } from '../../utils/reviews.js';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { COUNTRIES } from '../../data/countries.js';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';

const nameOf = (code) => (COUNTRIES.find((c) => c.c === code) || {}).n || '';
const MS_PER_WORD = 260;

// Deterministic waveform from the review text, so every voice note has its own shape.
function bars(text, n = 44) {
  let h = 7;
  return Array.from({ length: n }, (_, i) => {
    h = (h * 31 + text.charCodeAt(i % text.length)) % 997;
    const env = Math.sin((Math.PI * (i + 1)) / (n + 1));
    return 0.22 + env * (0.35 + (h % 100) / 180);
  });
}
const dateOf = (r) => {
  const t = Date.parse(r.date);
  return isNaN(t) ? 0 : t;
};

function Stars({ n, size = 15 }) {
  if (!n) return null;
  return (
    <span className="vn-stars" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} className={i <= n ? 'on' : ''} />
      ))}
    </span>
  );
}

function Avatar({ r, big }) {
  const hue = (r.name.charCodeAt(0) * 37) % 360;
  return (
    <span className={`vn-avatar ${big ? 'is-big' : ''}`} style={{ '--ah': hue }}>
      {r.name.charAt(0).toUpperCase()}
      {r.country && (
        <span className="vn-avatar-flag">
          <Flag code={r.country} size={big ? 14 : 11} title={nameOf(r.country)} />
        </span>
      )}
    </span>
  );
}

function VoiceNote({ r, playing, onEnd, fresh }) {
  const words = useMemo(() => r.text.split(/\s+/), [r.text]);
  const wave = useMemo(() => bars(r.text), [r.text]);
  const [w, setW] = useState(prefersReducedMotion() ? words.length : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    setW(0);
    return undefined;
  }, [r.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!playing || prefersReducedMotion()) return undefined;
    if (w >= words.length) {
      const t = setTimeout(onEnd, 2600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setW((n) => n + 1), MS_PER_WORD);
    return () => clearTimeout(t);
  }, [playing, w, words.length, onEnd]);

  const progress = words.length ? w / words.length : 1;
  return (
    <article className={`vn-card ${playing ? 'is-playing' : ''} ${fresh ? 'is-fresh' : ''}`} key={r.id} style={{ '--prog': progress }}>
      {fresh && <span className="vn-new">Just posted</span>}
      <header className="vn-head">
        <Avatar r={r} big />
        <div>
          <strong className="vn-name">{r.name}</strong>
          <span className="vn-meta">
            {[r.role && r.role !== 'Member' ? r.role : '', r.company, nameOf(r.country)].filter(Boolean).join(' · ') || 'Turn2Opinion member'}
          </span>
        </div>
        <Stars n={r.rating} />
      </header>

      <div className="vn-player" aria-hidden="true">
        <span className="vn-play">
          <Icon name={playing && w < words.length ? 'volume' : 'play'} size={18} />
        </span>
        <span className="vn-wave">
          {wave.map((h, i) => (
            <i key={i} style={{ '--h': h, '--i': i }} className={i / wave.length < progress ? 'is-on' : ''} />
          ))}
        </span>
        <span className="vn-time">{Math.ceil((words.length * MS_PER_WORD) / 1000)}s</span>
      </div>

      <blockquote className="vn-text">
        <Icon name="quote" size={30} className="vn-q" />
        <p>
          {words.map((word, i) => (
            <span key={i} className={i < w ? 'is-read' : i === w ? 'is-now' : ''}>
              {word}{' '}
            </span>
          ))}
        </p>
      </blockquote>

      {r.tags && r.tags.length > 0 && (
        <ul className="vn-tags" aria-label="Highlights">
          {r.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function RatingGauge({ list }) {
  const rated = list.filter((r) => r.rating > 0);
  const [ref, inView] = useInView({ threshold: 0.4 });
  if (!rated.length) return null;
  const avg = rated.reduce((a, r) => a + r.rating, 0) / rated.length;
  const dist = [5, 4, 3, 2, 1].map((s) => rated.filter((r) => r.rating === s).length);
  return (
    <div className={`vn-gauge ${inView ? 'is-in' : ''}`} ref={ref}>
      <div className="vn-dial" style={{ '--p': avg / 5 }}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="50" className="vn-dial-bg" />
          <circle cx="60" cy="60" r="50" className="vn-dial-fg" pathLength="100" />
        </svg>
        <span className="vn-avg">
          <b>{avg.toFixed(1)}</b>
          <small>out of 5</small>
        </span>
      </div>
      <div className="vn-dist">
        {dist.map((c, i) => (
          <span key={i} className="vn-bar" style={{ '--w': rated.length ? c / rated.length : 0, '--i': i }}>
            <em>{5 - i}★</em>
            <i />
            <small>{c}</small>
          </span>
        ))}
        <p className="vn-count">
          From {rated.length} star-rated member {rated.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>
    </div>
  );
}

function RiverCard({ x, on, onPick, hidden }) {
  return (
    <button type="button" className={`rv-card ${on ? 'is-on' : ''}`} onClick={onPick} tabIndex={hidden ? -1 : 0} aria-hidden={hidden || undefined}>
      <span className="rv-top">
        <Avatar r={x} />
        <span className="rv-who">
          <strong>{x.name}</strong>
          <span>{[x.role && x.role !== 'Member' ? x.role : '', nameOf(x.country)].filter(Boolean).join(' · ')}</span>
        </span>
      </span>
      <Stars n={x.rating} size={12} />
      <span className="rv-txt">“{x.text.length > 150 ? `${x.text.slice(0, 147)}…` : x.text}”</span>
    </button>
  );
}

export default function Testimonials() {
  const [list, setList] = useState(() => seedTestimonials());
  const [fresh, setFresh] = useState(null);
  const [curId, setCurId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({ threshold: 0.25 });

  useEffect(() => {
    const merge = (incoming) =>
      setList((l) => {
        const ids = new Set(l.map((x) => x.id));
        const add = incoming.filter((x) => !ids.has(x.id));
        return add.length ? [...add, ...l] : l;
      });
    merge(getMyReviews());
    let alive = true;
    const poll = () => fetchApprovedReviews().then((r) => alive && r.length && merge(r));
    poll();
    const iv = setInterval(poll, 60000);
    const off = onReview((r) => {
      merge([r]);
      setFresh(r.id);
      setCurId(r.id);
      setFilter('all');
    });
    return () => {
      alive = false;
      clearInterval(iv);
      off();
    };
  }, []);

  // Newest dated reviews first (site submissions), then the published set in its original order.
  const ordered = useMemo(() => {
    const dated = list.filter((x) => dateOf(x)).sort((a, b) => dateOf(b) - dateOf(a));
    return [...dated, ...list.filter((x) => !dateOf(x))];
  }, [list]);
  const shown = useMemo(() => (filter === 'all' ? ordered : ordered.filter((x) => x.audience === filter || (!x.audience && filter === 'consumer'))), [ordered, filter]);
  const idx = Math.max(0, shown.findIndex((x) => x.id === curId));
  const r = shown[idx] || ordered[0];
  const next = () => setCurId(shown[(idx + 1) % shown.length].id);
  const cols = [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)];

  return (
    <div className="voices3" ref={ref}>
      <div className="v3-bar">
        <RatingGauge list={ordered} />
        <div className="v3-filters" role="group" aria-label="Show reviews from">
          {[
            ['all', 'Everyone', 'users'],
            ['consumer', 'Consumers', 'bag'],
            ['professional', 'Professionals', 'briefcase']
          ].map(([k, l, ic]) => (
            <button key={k} type="button" aria-pressed={filter === k} className={filter === k ? 'is-on' : ''} onClick={() => setFilter(k)}>
              <Icon name={ic} size={15} /> {l}
              <small>{k === 'all' ? ordered.length : ordered.filter((x) => x.audience === k || (!x.audience && k === 'consumer')).length}</small>
            </button>
          ))}
        </div>
        <button type="button" className="vn-add" onClick={() => window.dispatchEvent(new Event('t2o:open-review'))}>
          <span className="vn-mic" aria-hidden="true">
            <Icon name="pen" size={20} />
          </span>
          <span>
            <strong>Add your voice</strong>
            <small>Your review shows up here straight away.</small>
          </span>
        </button>
      </div>

      <div className="v3-main">
        <div className="vn-main" aria-live="polite">
          <span className="vn-glow" aria-hidden="true" />
          {r && <VoiceNote key={r.id + filter} r={r} playing={inView} onEnd={shown.length > 1 ? next : () => {}} fresh={fresh === r.id} />}
        </div>
        <div className="river" aria-label="All member reviews">
          {cols.map((col, c) => (
            <div key={c} className={`river-col ${c ? 'up' : 'down'}`} style={{ '--dur': `${Math.max(30, col.length * 7)}s` }}>
              <div className="river-track">
                {[...col, ...col].map((x, i) => (
                  <RiverCard key={`${x.id}-${i}`} x={x} on={x.id === (r && r.id)} hidden={i >= col.length} onPick={() => setCurId(x.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
