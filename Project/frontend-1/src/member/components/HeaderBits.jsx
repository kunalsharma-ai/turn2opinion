// Round 25 · the header's points and quality "trophies".
//   Points   a 3D gold coin that turns now and then, twinkling sparkles, the real balance and (Consumers and
//            Professionals) a thin bar towards the payout threshold.
//   Quality  a faceted gem inside a progress ring (score / scale), coloured by tier, with a light sweep.
// When the real value goes up (after a profile or survey is credited) the header plays a collection burst:
// coins fly out and fall back into the coin, the number counts up and "+N" rises; for quality, gem shards
// burst and the ring glows. Values are only ever the member's real totals. In the preview, the demo bar can
// replay the burst (event "t2o:hdr-demo") without changing any number.
import { useEffect, useState } from 'react';
import { useGain } from './HeroBits.jsx';
import { qualityTier } from '../data/MemberData.jsx';
import { ENV } from '../../config/env.js';
import { t, fmt } from '../i18n/t.js';
import { Counter, MLink, cx } from './ui.jsx';

const DEMO_EVENT = 't2o:hdr-demo';
/** in the preview only: replay the header collection animation */
export const playHeaderDemo = () => window.dispatchEvent(new CustomEvent(DEMO_EVENT, { detail: { points: 50, quality: 1 } }));

/** a real gain, or (preview only) a replayed one */
function useBurst(value, key) {
  const gain = useGain(value);
  const [demo, setDemo] = useState(null);
  useEffect(() => {
    if (!ENV.DEMO_MODE) return undefined;
    let id = 0;
    const on = (e) => {
      const d = e.detail?.[key];
      if (!d) return;
      setDemo({ d, k: Date.now() });
      clearTimeout(id);
      id = setTimeout(() => setDemo(null), 2400);
    };
    window.addEventListener(DEMO_EVENT, on);
    return () => {
      window.removeEventListener(DEMO_EVENT, on);
      clearTimeout(id);
    };
  }, [key]);
  return gain || demo;
}

const COINS = Array.from({ length: 9 }, (_, i) => i);
const SHARDS = Array.from({ length: 8 }, (_, i) => i);

export function PointsTrophy({ points, teen }) {
  const burst = useBurst(points?.total, 'points');
  const pct = points && points.threshold ? Math.min(1, points.total / points.threshold) : 0;
  return (
    <MLink to="rewards" className={cx('hdt hdt--pts', burst && 'is-collect')} title={t('nav.rewards')} aria-label={points ? `${fmt(points.total)} ${t('pts.balance')}. ${t('nav.rewards')}` : t('nav.rewards')}>
      <span className="hdt-icon" aria-hidden="true">
        <span className="hdt-coin">
          <i className="hdt-coin__face" />
          <i className="hdt-coin__back" />
        </span>
        <i className="hdt-spark hdt-spark--a" />
        <i className="hdt-spark hdt-spark--b" />
        <i className="hdt-spark hdt-spark--c" />
        {burst && (
          <span key={burst.k} className="hdt-burst">
            {COINS.map((i) => (
              <i key={i} style={{ '--a': `${i * 40 + 10}deg`, '--d': `${i * 28}ms` }} />
            ))}
          </span>
        )}
        {burst && <span key={`r${burst.k}`} className="hdt-ring" />}
      </span>
      <span className="hdt-body">
        <span className="hdt-num">{points ? <Counter value={points.total} duration={1300} still /> : '…'}</span>
        <span className="hdt-unit">
          {t('pts.balance')}
          {!teen && points?.threshold ? <i className="hdt-bar" style={{ '--p': pct }} /> : null}
        </span>
      </span>
      {burst && (
        <span key={`p${burst.k}`} className="hdt-pop" aria-live="polite">
          +{fmt(burst.d)}
        </span>
      )}
    </MLink>
  );
}

export function QualityTrophy({ me }) {
  const burst = useBurst(me.quality.score, 'quality');
  const tier = qualityTier(me.quality.score, me.quality.scale);
  const p = Math.max(0, Math.min(1, me.quality.score / (me.quality.scale || 1)));
  return (
    <MLink
      to="quality"
      className={cx('hdt hdt--q', `is-${tier}`, burst && 'is-collect')}
      title={`${t('nav.quality')}: ${t(`q.tier.${tier}`)}`}
      aria-label={`${t('nav.quality')} ${me.quality.score} ${t('q.of', { n: me.quality.scale })}, ${t(`q.tier.${tier}`)}`}
    >
      <span className="hdt-icon" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="hdt-qring">
          <circle cx="20" cy="20" r="17" />
          <circle cx="20" cy="20" r="17" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
        </svg>
        <span className="hdt-gem">
          <i />
        </span>
        {burst && (
          <span key={burst.k} className="hdt-shards">
            {SHARDS.map((i) => (
              <i key={i} style={{ '--a': `${i * 45 + 20}deg`, '--d': `${i * 30}ms` }} />
            ))}
          </span>
        )}
        {burst && <span key={`r${burst.k}`} className="hdt-ring hdt-ring--q" />}
      </span>
      <span className="hdt-body">
        <span className="hdt-num">
          <Counter value={me.quality.score} duration={1300} still />
        </span>
        <span className="hdt-unit">{t(`q.tier.${tier}`)}</span>
      </span>
      {burst && (
        <span key={`p${burst.k}`} className="hdt-pop hdt-pop--q" aria-live="polite">
          +{fmt(burst.d)}
        </span>
      )}
    </MLink>
  );
}
