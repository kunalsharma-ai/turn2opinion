// "World Mailroom" — member voices (v3.2 rebuild; replaces the v3.1 Opinion Atlas orbit).
//
// The section is built from two objects nobody uses for testimonials:
//
//   1. THE DECK         Reviews arrive as physical things you can hold. Consumer reviews are airmail
//                       postcards (flag stamp, gem postmark); professional reviews are conference
//                       passes (holographic, verified B2B band). The front card is readable; the next
//                       two sit behind it in 3D. Swipe, drag, use the arrows or let it deal itself.
//   2. ARRIVALS BOARD   A split-flap style board listing who is "arriving" next — flag, name,
//                       country, designation and their gem. Tap a row to bring that card forward.
//
// Real time: a review posted anywhere on the site (this tab or another tab, via BroadcastChannel)
// lands on top of the deck immediately, flagged "Just posted · live", and the board flips to it.
// Approved reviews from the backend (VITE_API_REVIEWS_URL) are polled every 30 s while the section
// is on screen, so other visitors' reviews appear without a reload.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials, summarise } from '../../utils/reviews.js';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { AUDIENCES, levelOf } from '../../data/reviewFacets.js';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import { Link } from '../../router/Router.jsx';
import Gem from '../rating/Gem.jsx';
import VoiceCard, { countryName, roleLine } from '../rating/VoiceCard.jsx';

const dateOf = (r) => {
  const t = Date.parse(r.date);
  return isNaN(t) ? 0 : t;
};
const BOARD_ROWS = 6;

export default function Testimonials() {
  const [list, setList] = useState(() => seedTestimonials());
  const [freshId, setFreshId] = useState(null);
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(null); // { r, dir } — the card currently flying off
  const [filter, setFilter] = useState('all');
  const [held, setHeld] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const drag = useRef(null);
  const deckRef = useRef(null);
  const reduce = prefersReducedMotion();

  const merge = useCallback(
    (incoming) =>
      setList((l) => {
        const ids = new Set(l.map((x) => x.id));
        const add = incoming.filter((x) => x && x.id && !ids.has(x.id));
        return add.length ? [...add, ...l] : l;
      }),
    []
  );

  useEffect(() => {
    merge(getMyReviews());
    const off = onReview((r) => {
      merge([r]);
      setFreshId(r.id);
      setFilter('all');
      setIdx(0);
    });
    return off;
  }, [merge]);

  // Poll approved reviews while on screen (first fetch as soon as it scrolls into view).
  useEffect(() => {
    if (!inView) return undefined;
    let alive = true;
    const poll = () => fetchApprovedReviews().then((r) => alive && r.length && merge(r)).catch(() => {});
    poll();
    const iv = setInterval(poll, 30000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [inView, merge]);

  // Newest dated reviews first (site submissions), then the published set in its original order.
  const ordered = useMemo(() => {
    const dated = list.filter((x) => dateOf(x)).sort((a, b) => dateOf(b) - dateOf(a));
    const fresh = list.filter((x) => x.id === freshId);
    const rest = [...dated, ...list.filter((x) => !dateOf(x))].filter((x) => x.id !== freshId);
    return [...fresh, ...rest];
  }, [list, freshId]);

  const shown = useMemo(() => (filter === 'all' ? ordered : ordered.filter((x) => (x.audience || 'consumer') === filter)), [ordered, filter]);
  const stats = useMemo(() => summarise(ordered), [ordered]);
  const n = shown.length;
  const at = n ? ((idx % n) + n) % n : 0;
  const current = shown[at];

  const go = useCallback(
    (dir = 1) => {
      if (n < 2) return;
      const leaving = shown[at];
      setOut({ r: leaving, dir, k: Date.now() });
      setIdx((i) => i + dir);
      setTimeout(() => setOut(null), 520);
    },
    [n, shown, at]
  );

  // Deal itself while on screen (never with reduced motion, never while the visitor is holding it).
  useEffect(() => {
    if (!inView || reduce || held || n < 2) return undefined;
    const t = setTimeout(() => go(1), 8000);
    return () => clearTimeout(t);
  }, [inView, reduce, held, n, go, at]);

  // Swipe / drag the front card.
  const onDown = (e) => {
    if (e.button && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, dx: 0 };
    setHeld(true);
  };
  const onMove = (e) => {
    if (!drag.current || !deckRef.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current.dx = dx;
    deckRef.current.style.setProperty('--drag', `${dx}px`);
    deckRef.current.style.setProperty('--dragr', `${dx / 24}deg`);
  };
  const onUp = () => {
    if (!drag.current) return;
    const { dx } = drag.current;
    drag.current = null;
    deckRef.current?.style.setProperty('--drag', '0px');
    deckRef.current?.style.setProperty('--dragr', '0deg');
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  const pick = (id) => {
    const i = shown.findIndex((x) => x.id === id);
    if (i >= 0 && i !== at) {
      setOut({ r: shown[at], dir: 1, k: Date.now() });
      setIdx(i);
      setTimeout(() => setOut(null), 520);
    }
    setHeld(true);
  };

  const behind = n > 1 ? [shown[(at + 1) % n], n > 2 ? shown[(at + 2) % n] : null].filter(Boolean) : [];
  const board = Array.from({ length: Math.min(BOARD_ROWS, n) }, (_, k) => shown[(at + k) % n]);
  const avgL = levelOf(stats.avg || 4);
  const counts = {
    all: ordered.length,
    consumer: ordered.filter((x) => (x.audience || 'consumer') === 'consumer').length,
    professional: ordered.filter((x) => x.audience === 'professional').length
  };

  return (
    <div className={`mailroom f-${filter}`} ref={ref}>
      {/* -------- live strip -------- */}
      <div className="mr-strip">
        <div className="mr-score" style={{ '--g1': avgL.c1, '--g2': avgL.c2, '--g3': avgL.c3 }}>
          <Gem level={avgL.v} size={46} motion="spin" />
          <span>
            <b>{stats.avg ? stats.avg.toFixed(1) : '—'}</b>
            <small>average · {avgL.word}</small>
          </span>
        </div>
        <ul className="mr-facts">
          <li>
            <b>{stats.count}</b> scored voices
          </li>
          <li>
            <b>{stats.countries}</b> countries
          </li>
          <li className="mr-live">
            <i /> Updates live
          </li>
        </ul>
        <div className="mr-filters" role="group" aria-label="Show reviews from">
          {[
            ['all', 'Everyone', 'users'],
            ['consumer', 'Consumers', 'bag'],
            ['professional', 'Professionals', 'briefcase']
          ].map(([k, l, ic]) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              className={`mf-${k} ${filter === k ? 'is-on' : ''}`}
              onClick={() => {
                setFilter(k);
                setIdx(0);
              }}
            >
              <Icon name={ic} size={14} /> {l} <small>{counts[k]}</small>
            </button>
          ))}
        </div>
      </div>

      {/* -------- stage -------- */}
      <div className="mr-stage">
        <div
          className="mr-deck"
          ref={deckRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
          aria-roledescription="carousel"
          aria-label="Member reviews"
        >
          <span className="mr-table" aria-hidden="true" />
          {behind
            .slice()
            .reverse()
            .map((r, k) => (
              <div key={`b-${r.id}`} className={`mr-card depth-${behind.length - k}`} aria-hidden="true">
                <VoiceCard r={r} size="md" clamp={220} />
              </div>
            ))}
          {current && (
            <div key={`f-${current.id}`} className="mr-card depth-0" aria-live="polite">
              <VoiceCard r={current} size="md" fresh={current.id === freshId} />
            </div>
          )}
          {out && out.r && (
            <div key={`o-${out.k}`} className={`mr-card is-out dir-${out.dir > 0 ? 'l' : 'r'}`} aria-hidden="true">
              <VoiceCard r={out.r} size="md" clamp={220} />
            </div>
          )}
          {n > 1 && (
            <div className="mr-nav">
              <button type="button" onClick={() => (setHeld(true), go(-1))} aria-label="Previous review">
                <Icon name="arrowLeft" size={18} />
              </button>
              <span className="mr-count" aria-hidden="true">
                <b>{String(at + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => (setHeld(true), go(1))} aria-label="Next review">
                <Icon name="arrow" size={18} />
              </button>
            </div>
          )}
          <p className="mr-hint" aria-hidden="true">
            <Icon name="finger" size={13} /> Swipe the card
          </p>
        </div>

        <aside className="mr-board" aria-label="Arrivals board — who is next">
          <header className="mb-head">
            <span className="mb-title">
              <Icon name="plane" size={15} /> Arrivals
            </span>
            <span className="mb-cols" aria-hidden="true">
              <span>From</span>
              <span>Member</span>
              <span>Gem</span>
            </span>
          </header>
          <ol className="mb-rows">
            {board.map((r, k) => {
              const L = levelOf(r.rating || 4);
              const w = AUDIENCES[r.audience] || AUDIENCES.consumer;
              return (
                <li key={`${r.id}-${k}`} style={{ '--k': k, '--g1': L.c1, '--g2': L.c2, '--a1': w.c1 }}>
                  <button type="button" className={k === 0 ? 'is-now' : ''} onClick={() => pick(r.id)} aria-label={`Read ${r.name}${r.country ? `, ${countryName(r.country)}` : ''}`}>
                    <span className="mb-from">
                      {r.country ? <Flag code={r.country} size={22} title={countryName(r.country)} /> : <Icon name="globe" size={18} />}
                      <span className="mb-flap">{(countryName(r.country) || 'World').toUpperCase().slice(0, 14)}</span>
                    </span>
                    <span className="mb-who">
                      <strong className="notranslate" translate="no">
                        {r.name}
                      </strong>
                      <small>{roleLine(r) || (r.audience === 'professional' ? 'Business professional' : 'Consumer')}</small>
                    </span>
                    <span className="mb-gem">
                      {r.rating ? (
                        <>
                          <Gem level={r.rating} size={24} motion="still" />
                          <b>{L.word}</b>
                        </>
                      ) : (
                        <b>On record</b>
                      )}
                    </span>
                    <span className={`mb-status ${k === 0 ? 'is-now' : ''}`}>{k === 0 ? (r.id === freshId ? 'LIVE' : 'NOW') : k === 1 ? 'NEXT' : 'SOON'}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <Link to="/about/reviews/" className="mb-all">
            Every rating &amp; review <Icon name="arrow" size={15} />
          </Link>
        </aside>
      </div>

      {/* -------- add your voice -------- */}
      <button type="button" className="mr-add" onClick={() => window.dispatchEvent(new CustomEvent('t2o:open-review'))}>
        <span className="mra-gems" aria-hidden="true">
          {[1, 3, 5].map((g) => (
            <Gem key={g} level={g} size={34} motion="float" />
          ))}
        </span>
        <span className="mra-copy">
          <strong>Add your gem to the wall</strong>
          <small>Two minutes. Your review lands in this deck the moment you post it.</small>
        </span>
        <span className="mra-go" aria-hidden="true">
          <Icon name="pen" size={18} />
        </span>
      </button>
    </div>
  );
}
