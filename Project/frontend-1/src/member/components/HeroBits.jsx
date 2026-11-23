// Shared hero pieces (Round 22): every section hero greets the member by name and shows their live
// points and quality score. Numbers count up whenever they change (after a profile or survey is
// completed), and a "+N" pops so the reward is visible straight away.
import { useEffect, useRef, useState } from 'react';
import { useMe, useSection, qualityTier } from '../data/MemberData.jsx';
import { t, fmt } from '../i18n/t.js';
import { Avatar, Counter, MLink, cx } from './ui.jsx';

/** Remember the previous number and report a positive change for a short "+N" pop. */
export function useGain(value) {
  const prev = useRef(null);
  const [gain, setGain] = useState(null);
  useEffect(() => {
    if (value == null) return undefined;
    if (prev.current != null && value > prev.current) {
      const d = value - prev.current;
      setGain({ d, k: Date.now() });
      const id = setTimeout(() => setGain(null), 2400);
      prev.current = value;
      return () => clearTimeout(id);
    }
    prev.current = value;
    return undefined;
  }, [value]);
  return gain;
}

const hourWord = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

/** "Good afternoon, Asha 👋" with the name in an animated gradient. */
export function HeroHello({ me: meProp, tone = 'light', text }) {
  const ctx = useMe();
  const me = meProp || ctx;
  const name = me.firstName || me.fullName || '';
  return (
    <p className={cx('hx-hello', `is-${tone}`)}>
      <span className="hx-hello__av" aria-hidden="true">
        <Avatar name={me.fullName || name} src={me.photo} size={30} />
      </span>
      <span className="hx-hello__t">
        {text || hourWord()}
        {name ? ', ' : ''}
        {name && <strong className="hx-name">{name}</strong>}
      </span>
      <span className="hx-wave" aria-hidden="true">
        👋
      </span>
    </p>
  );
}

/** Live points + quality chips (and payout progress for members who can redeem). */
export function HeroStats({ tone = 'light', showPayout = true, className }) {
  const me = useMe();
  const [points] = useSection('points');
  const total = points?.total;
  const gainP = useGain(total);
  const gainQ = useGain(me.quality?.score);
  const tier = qualityTier(me.quality.score, me.quality.scale);
  const q = Math.max(0, Math.min(1, me.quality.score / (me.quality.scale || 1)));
  const pay = points && points.threshold ? Math.max(0, Math.min(1, points.total / points.threshold)) : 0;
  const teen = me.type === 'teen';
  return (
    <div className={cx('hx-stats', `is-${tone}`, className)}>
      <MLink to="rewards" className="hx-stat hx-stat--pts" aria-label={`${t('nav.rewards')}: ${total != null ? fmt(total) : '…'} ${t('pts.balance')}`}>
        <span className="hx-coin" aria-hidden="true">
          <i />
        </span>
        <span className="hx-stat__v">{total != null ? <Counter value={total} duration={1200} /> : '…'}</span>
        <span className="hx-stat__l">{t('pts.balance')}</span>
        {gainP && (
          <span key={gainP.k} className="hx-pop" aria-live="polite">
            +{fmt(gainP.d)}
          </span>
        )}
      </MLink>
      <MLink to="quality" className={cx('hx-stat hx-stat--q', `is-${tier}`)} aria-label={`${t('nav.quality')}: ${me.quality.score}, ${t(`q.tier.${tier}`)}`}>
        <svg viewBox="0 0 36 36" className="hx-ring" aria-hidden="true">
          <circle cx="18" cy="18" r="15" />
          <circle cx="18" cy="18" r="15" pathLength="100" style={{ strokeDasharray: `${q * 100} 100` }} />
        </svg>
        <span className="hx-stat__v">
          <Counter value={me.quality.score} duration={1200} />
        </span>
        <span className="hx-stat__l">{t(`q.tier.${tier}`)}</span>
        {gainQ && (
          <span key={gainQ.k} className="hx-pop hx-pop--q" aria-live="polite">
            +{fmt(gainQ.d)}
          </span>
        )}
      </MLink>
      {showPayout && !teen && points && (
        <MLink to="rewards" className="hx-stat hx-stat--pay" aria-label={t('pts.toMilestone', { n: fmt(Math.max(0, points.threshold - points.total)) })}>
          <span className="hx-pay" aria-hidden="true">
            <i style={{ '--w': pay }} />
          </span>
          <span className="hx-stat__l">{pay >= 1 ? t('pts.milestoneReached').split('.')[0] : `${Math.round(pay * 100)}% to payout`}</span>
        </MLink>
      )}
    </div>
  );
}
