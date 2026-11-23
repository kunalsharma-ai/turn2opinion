// "Your opinion, live": a 3D smartphone floating in the header, playing a looping mini survey the way members see it
// every day — story-style progress segments, a product rating whose stars fill in, a mood slider whose face turns from
// unsure to happy, and a quick poll whose bars grow. Live reactions (hearts, stars, likes) rise beside it, stickers
// bob around it, and every section the member reads makes the phone burst with hearts. The reading count sits on the
// phone's screen. Pure CSS (transform/opacity only), paused off screen, still for reduced-motion visitors.
import { useEffect, useRef } from 'react';
import Icon from './Icons.jsx';
import T2OMark from './T2OMark.jsx';
import { useI18n } from '../i18n/I18n.jsx';

const REACTIONS = ['heart', 'star', 'check', 'heart', 'spark', 'heart'];
const STICKERS = [['gift', '#ff4d8d', '#ff9f1a'], ['star', '#ffb020', '#ff5c7a'], ['heart', '#7b5cff', '#ff4d8d'], ['spark', '#0fb48f', '#3fd6e8']];

function Face({ className = '' }) {
  return (
    <span className={`face ${className}`}>
      <i className="eye l" /><i className="eye r" />
      <i className="mouth sad" /><i className="mouth happy" />
    </span>
  );
}

export default function PhoneHero({ read, total, extras = true }) {
  const { t } = useI18n();
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-paused', !e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="phero" ref={ref} role="img" aria-label={`${t('progress')}: ${t('read_count', read, total)}`}>
      <div className="phero-glow" aria-hidden="true" />
      <div className="stickers" aria-hidden="true">
        {extras && STICKERS.map(([ic, a, b], i) => (
          <span key={i} className={`sticker s${i}`} style={{ '--a': a, '--b': b }}><Icon name={ic} size={22} decorative /></span>
        ))}
      </div>
      <div className="phone-scene" aria-hidden="true">
        <div className="phone">
          {[5, 4, 3, 2, 1].map((z) => <i key={z} className="phone-edge" style={{ '--z': `${-z * 2}px` }} />)}
          <div className="phone-body">
            <div className="screen">
              <span className="notch" />
              <div className="stories"><i /><i /><i /></div>
              <div className="screen-top">
                <span className="me"><T2OMark size={26} /></span>
                <span className="pts"><Icon name="heart" size={12} decorative /><b>{read}</b>/{total}</span>
              </div>
              <div className="q q1">
                <span className="prod"><Icon name="gift" size={34} decorative /></span>
                <i className="ln w70" /><i className="ln w45" />
                <span className="stars">{[0, 1, 2, 3, 4].map((k) => <i key={k} style={{ '--k': k }}><Icon name="star" size={18} decorative /></i>)}</span>
              </div>
              <div className="q q2">
                <Face className="big" />
                <i className="ln w60" />
                <span className="mood"><i className="mood-knob" /></span>
              </div>
              <div className="q q3">
                <i className="ln w70" />
                <span className="poll"><i className="pa" /><b className="mono">64%</b></span>
                <span className="poll"><i className="pb" /><b className="mono">36%</b></span>
              </div>
              <span className="cta"><i /></span>
            </div>
            <span className="glare" />
          </div>
        </div>
      </div>
      <div className="reactions" aria-hidden="true">
        {extras && REACTIONS.map((r, i) => <span key={i} style={{ '--i': i }}><Icon name={r} size={18} decorative /></span>)}
      </div>
      {/* a burst of hearts every time another section is read (key restarts the animation) */}
      <div className="loveburst" key={read} aria-hidden="true">
        {read > 0 ? Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--i': i }}><Icon name="heart" size={16} decorative /></i>) : null}
      </div>
      <p className="phero-count">
        <Icon name="heart" size={18} decorative />
        <b>{read}</b>
        <span>/ {total}</span>
      </p>
    </div>
  );
}
