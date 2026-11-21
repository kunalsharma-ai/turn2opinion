// Member voices on the home page, round 8 (Kunal, 18 Nov 2026). Replaces the "World Mailroom" deck
// and arrivals board with the two panels from the Rate & Reviews page, in their compact form:
//   Consumers      ocean blue sky, reviews pegged on a washing line, four at a time.
//   Professionals  midnight amethyst with gold, a spotlight quote and executive passes.
// A gem console on top shows the overall gem, the counts and a switch between the two panels.
// Ratings are gems everywhere (Pebble, Quartz, Amber, Sapphire, Diamond), never stars or "/5".
//
// Real time is unchanged: a review posted anywhere on the site (this tab, or another one through
// BroadcastChannel) is merged straight away, and approved reviews from the backend are polled every
// 30 s while the section is on screen.
import { useCallback, useEffect, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials, summarise } from '../../utils/reviews.js';
import { useInView } from '../../hooks/useMounted.js';
import { levelOf } from '../../data/reviewFacets.js';
import { useRouter } from '../../router/Router.jsx';
import Icon from '../Icon.jsx';
import Gem from '../rating/Gem.jsx';
import { ConsumerPanel, ProPanel, TeenPanel } from '../rating/ReviewPanels.jsx';

const isPro = (r) => r.audience === 'professional';
const isTeen = (r) => r.audience === 'teen';
const dateOf = (r) => {
  const t = Date.parse(r.date);
  return isNaN(t) ? 0 : t;
};

export default function MemberVoices() {
  const [list, setList] = useState(() => seedTestimonials());
  const [side, setSide] = useState('consumer');
  const [ref, inView] = useInView({ threshold: 0.15 });
  const { navigate } = useRouter();

  const merge = useCallback(
    (incoming) =>
      setList((l) => {
        const ids = new Set(l.map((x) => x.id));
        const add = incoming.filter((x) => x && x.id && !ids.has(x.id));
        if (!add.length) return l;
        const next = [...add, ...l];
        // Newest dated reviews (site submissions) first, then the published set in its order.
        return [...next.filter(dateOf).sort((a, b) => dateOf(b) - dateOf(a)), ...next.filter((x) => !dateOf(x))];
      }),
    []
  );

  useEffect(() => {
    merge(getMyReviews());
    return onReview((r) => {
      merge([r]);
      setSide(isPro(r) ? 'pro' : isTeen(r) ? 'teen' : 'consumer');
    });
  }, [merge]);

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

  const stats = summarise(list);
  const L = levelOf(stats.avg || 4);
  const counts = { consumer: list.filter((r) => !isPro(r) && !isTeen(r) && r.text).length, pro: list.filter((r) => isPro(r) && r.text).length, teen: list.filter((r) => isTeen(r) && r.text).length };
  const readAll = () => navigate(side === 'pro' ? '/about/reviews/#panel-pro' : side === 'teen' ? '/about/reviews/#panel-teen' : '/about/reviews/#panel-consumer');
  const panelProps = { list, stats, onReadAll: readAll, compact: true, readAllLabel: 'Every rating & review' };

  return (
    <div className={`mvx is-${side}`} ref={ref}>
      <div className="mvx-console" style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3 }}>
        <div className="mvx-gem">
          <span className="mvx-halo" aria-hidden="true" />
          <Gem level={L.v} size={62} motion="spin" />
          <p>
            <small>Members give us</small>
            <b>{L.gem}</b>
            <span>{L.word} · average gem</span>
          </p>
        </div>
        <ul className="mvx-facts">
          <li>
            <b>{stats.count}</b> gems given
          </li>
          <li>
            <b>{stats.countries}</b> countries
          </li>
          <li className="mvx-live">
            <i aria-hidden="true" /> Updates live
          </li>
        </ul>
        <div className={`mvx-switch is-${side}`} role="group" aria-label="Show reviews from">
          <span className="mvx-knob" aria-hidden="true" />
          {[
            ['consumer', 'Consumers', 'bag'],
            ['pro', 'Professionals', 'briefcase'],
            ['teen', 'Teens', 'sparkles']
          ].map(([k, l, ic]) => (
            <button key={k} type="button" aria-pressed={side === k} className={side === k ? 'is-on' : ''} onClick={() => setSide(k)}>
              <Icon name={ic} size={15} /> {l} <small>{counts[k]}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="mvx-stage" key={side}>
        {side === 'pro' ? <ProPanel {...panelProps} /> : side === 'teen' ? <TeenPanel {...panelProps} /> : <ConsumerPanel {...panelProps} />}
      </div>

      <button type="button" className="mvx-add" onClick={() => window.dispatchEvent(new CustomEvent('t2o:open-review'))}>
        <span className="mvx-add-gems" aria-hidden="true">
          {[1, 3, 5].map((g) => (
            <Gem key={g} level={g} size={34} motion="float" />
          ))}
        </span>
        <span className="mvx-add-copy">
          <strong>Add your gem to the reviews</strong>
          <small>Pick Pebble to Diamond and say why. Your review lands here the moment you post it.</small>
        </span>
        <span className="mvx-add-go" aria-hidden="true">
          <Icon name="pen" size={18} />
        </span>
      </button>
    </div>
  );
}
