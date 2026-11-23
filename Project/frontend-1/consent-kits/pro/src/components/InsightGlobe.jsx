// "Global insight network": a 3D wireframe globe (meridians + parallels) turning slowly, with 23 expert nodes on its
// surface — one per clause — that light up as the professional reviews the agreement. A tilted orbit carries data
// satellites, insight arcs shoot between continents, sonar pings pulse, and a "connected expert" chip shows the
// member (the extras — nodes, orbits, arcs, pings — mount a moment after the first paint on non-English pages).
// When the agreement is signed the whole network turns green. Pure CSS 3D + SVG (transform/opacity and
// stroke-dashoffset only), paused off screen, still for reduced-motion visitors.
import { useEffect, useRef } from 'react';
import Icon from './Icons.jsx';
import T2OMark from './T2OMark.jsx';
import { useI18n } from '../i18n/I18n.jsx';

// [longitude, latitude] of the 23 nodes (roughly: business hubs around the world)
const NODES = [
  [-74, 41], [-122, 37], [-99, 19], [-46, -23], [-58, -34], [-0, 51], [2, 49], [13, 52], [37, 56], [28, 41], [31, 30],
  [55, 25], [3, 6], [36, -1], [18, -34], [77, 28], [73, 19], [80, 13], [104, 1], [121, 31], [139, 36], [126, 37], [151, -34],
];
const ARCS = [
  'M40 120 Q 120 30 210 96', 'M210 96 Q 270 40 330 120', 'M90 170 Q 170 230 270 180', 'M60 90 Q 190 -10 320 80',
];

export default function InsightGlobe({ reviewed, total, signed, name, memberId, extras = true }) {
  const { t } = useI18n();
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-paused', !e.isIntersecting), { rootMargin: '60px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const initial = (name || 'B').trim().charAt(0).toUpperCase();
  return (
    <div className={`globe ${signed ? 'is-signed' : ''}`} ref={ref} role="img" aria-label={`${t('progress')}: ${t('reviewed', reviewed, total)}`}>
      <div className="g-halo" aria-hidden="true" />
      {extras ? <div className="g-pings" aria-hidden="true"><i /><i /><i /></div> : null}
      <div className="g-scene" aria-hidden="true">
        <div className="g-tilt">
          <div className="g-spin">
            {[0, 30, 60, 90, 120, 150].map((r) => <i key={r} className="mer" style={{ '--r': `${r}deg` }} />)}
            {[-60, -30, 0, 30, 60].map((la) => <i key={la} className="par" style={{ '--y': Math.sin((la * Math.PI) / 180), '--s': Math.cos((la * Math.PI) / 180) }} />)}
            {extras && NODES.map(([lo, la], i) => (
              <i key={i} className={`node ${i < reviewed ? 'lit' : ''}`} style={{ '--lo': `${lo}deg`, '--la': `${la}deg`, '--d': `${(i % 6) * 0.4}s` }} />
            ))}
          </div>
          <div className="g-core"><T2OMark size={56} /></div>
          {extras ? <div className="orbit o1"><i className="sat" /><i className="sat s2" /></div> : null}
          {extras ? <div className="orbit o2"><i className="sat" /></div> : null}
        </div>
      </div>
      <svg className="g-arcs" viewBox="0 0 380 260" aria-hidden="true">
        {extras && ARCS.map((d, i) => <path key={i} d={d} style={{ '--i': i }} />)}
      </svg>
      <div className="g-chip" aria-hidden="true">
        <span className="g-avatar">{initial}<i /></span>
        <span className="g-who">
          <b>{name || t('badge_role')}</b>
          <small className="mono">{memberId ? `${t('badge_member')} ${memberId}` : t('badge_role')}</small>
        </span>
        <span className={`g-state ${signed ? 'ok' : ''}`}><Icon name={signed ? 'check' : 'clock'} size={14} decorative /></span>
      </div>
      <p className="g-count mono">
        <Icon name="chart" size={16} decorative />
        <b>{reviewed}</b>
        <span>/ {total}</span>
      </p>
    </div>
  );
}
