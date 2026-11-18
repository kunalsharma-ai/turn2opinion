// Live review notifications — right-hand side of the screen.
//
// v3.2: redesigned as a gem "airmail" card. A small card slides in from the right every so often showing a real member review: their
// rating as its gem + number + word (never stars), their first name,
// designation and country flag, and the opening of what they wrote. Tapping it opens the full
// review on the ratings page; the arrow button opens the Opinion Studio so the visitor can add
// their own.
//
// Rules that keep it from becoming annoying:
//   * nothing appears for the first 30 seconds of a visit (never on arrival);
//   * one card at a time, 7 s on screen, 26–40 s apart (randomised so it never feels mechanical);
//   * at most 5 per session, tracked in sessionStorage;
//   * paused while the tab is hidden, while a modal or the live chat is open, and on the
//     ratings page itself (where the same reviews are already on screen);
//   * a dismissed card stops the whole stream for that session;
//   * a quiet two-note chime, rate-limited and muted by the site's sound switch.
//
// Reviews a visitor posts themselves are never shown back to them as a notification.
import { useEffect, useRef, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials } from '../utils/reviews.js';
import { playNotify } from '../utils/sound.js';
import { levelOf } from '../data/reviewFacets.js';
import { COUNTRIES } from '../data/countries.js';
import { session } from '../utils/storage.js';
import { usePath, Link } from '../router/Router.jsx';
import { Flag } from './Brand.jsx';
import Icon from './Icon.jsx';
import Gem from './rating/Gem.jsx';

const SHOWN = 't2o_rv_toasts';
const MAX = 5;
const nameOf = (c) => (COUNTRIES.find((x) => x.c === c) || {}).n || '';

export default function ReviewToasts({ blocked }) {
  const [item, setItem] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [stopped, setStopped] = useState(false);
  const pool = useRef(null);
  const order = useRef([]);
  const count = useRef(session.get(SHOWN, 0));
  const path = usePath();
  const onReviewsPage = path.startsWith('/about/reviews');

  // Build the pool: published testimonials + anything the API has approved, minus the
  // visitor's own reviews (showing someone their own review as "news" is odd).
  useEffect(() => {
    const mineIds = new Set(getMyReviews().map((r) => r.id));
    const usable = (list) => list.filter((r) => r.text && r.name && r.rating >= 4 && !mineIds.has(r.id));
    pool.current = usable(seedTestimonials());
    let alive = true;
    fetchApprovedReviews()
      .then((list) => {
        if (!alive || !list.length) return;
        const extra = usable(list);
        if (extra.length) pool.current = [...extra, ...pool.current];
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // A review posted anywhere (this tab or another) surfaces immediately as "just posted".
  useEffect(() => {
    return onReview((r) => {
      if (!r.text || !r.name) return;
      setLeaving(false);
      setItem({ ...r, fresh: true, key: Date.now() });
      playNotify({ up: true });
      const t = setTimeout(() => setLeaving(true), 8200);
      return () => clearTimeout(t);
    });
  }, []);

  useEffect(() => {
    if (blocked || stopped || onReviewsPage) return undefined;
    let timer;
    let hideTimer;

    const next = () => {
      const src = pool.current || [];
      if (!src.length || count.current >= MAX) return;
      const cls = document.documentElement.classList;
      const narrow = window.matchMedia('(max-width: 600px)').matches;
      const busy = cls.contains('modal-open') || cls.contains('nav-open') || (narrow && cls.contains('ask-open'));
      if (document.hidden || busy) {
        timer = setTimeout(next, 12000);
        return;
      }
      if (!order.current.length) order.current = [...src.keys()].sort(() => Math.random() - 0.5);
      const pick = src[order.current.pop()];
      setLeaving(false);
      setItem({ ...pick, key: Date.now() });
      playNotify({ up: true });
      count.current += 1;
      session.set(SHOWN, count.current);
      hideTimer = setTimeout(() => setLeaving(true), 7000);
      timer = setTimeout(next, 26000 + Math.random() * 14000);
    };

    timer = setTimeout(next, 30000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [blocked, stopped, onReviewsPage]);

  if (!item) return null;
  const L = levelOf(item.rating);
  const where = nameOf(item.country);
  const who = [item.role && item.role !== 'Member' ? item.role : '', item.company].filter(Boolean).join(', ');
  const snippet = item.text.length > 118 ? `${item.text.slice(0, 115).trimEnd()}…` : item.text;
  const pro = item.audience === 'professional';

  return (
    <aside
      className={`gtoast ${leaving ? 'is-leaving' : ''} ${item.fresh ? 'is-fresh' : ''} lv-${L.key} ${pro ? 'is-pro' : 'is-con'}`}
      key={item.key}
      role="status"
      aria-live="polite"
      style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--life': `${item.fresh ? 8.2 : 7}s` }}
    >
      <span className="gt-sheen" aria-hidden="true" />
      <span className="gt-life" aria-hidden="true" />
      <button
        type="button"
        className="gt-x"
        aria-label="Stop showing review notifications"
        onClick={() => {
          setLeaving(true);
          setStopped(true);
          session.set(SHOWN, MAX);
        }}
      >
        <Icon name="close" size={13} />
      </button>

      <p className="gt-kicker">
        {item.fresh ? (
          <>
            <i className="gt-live" /> Just posted · live
          </>
        ) : (
          <>
            <Icon name={pro ? 'briefcase' : 'plane'} size={12} /> {pro ? 'A professional just rated us' : 'New airmail from a member'}
          </>
        )}
      </p>

      <div className="gt-main">
        <span className="gt-gem">
          <Gem level={item.rating || 4} size={46} motion="spin" />
          <b>
            {item.rating}
            <i>/5</i>
          </b>
          <small>{L.word}</small>
        </span>
        <div className="gt-body">
          <p className="gt-who">
            <strong className="notranslate" translate="no">
              {item.name}
            </strong>
            {who && <span>{who}</span>}
          </p>
          <p className="gt-text">“{snippet}”</p>
        </div>
        <span className="gt-stamp" aria-hidden="true">
          {item.country ? <Flag code={item.country} size={30} title={where} /> : <Icon name="globe" size={22} />}
        </span>
      </div>

      <footer className="gt-foot">
        <span className="gt-place">
          {item.country && <Flag code={item.country} size={14} title={where} />} {where || 'Worldwide'}
        </span>
        <Link to="/about/reviews/" className="gt-more">
          All reviews <Icon name="arrow" size={13} />
        </Link>
        <button type="button" className="gt-add" onClick={() => window.dispatchEvent(new CustomEvent('t2o:open-review'))}>
          <Icon name="pen" size={13} /> Rate us
        </button>
      </footer>
    </aside>
  );
}
