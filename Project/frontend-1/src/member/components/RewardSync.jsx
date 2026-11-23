// Live reward sync (Round 23). When the server confirms a reward (data/rewardBus.js), this reloads the real
// balance, quality score, activity and progress from the API, shows a reward notification under the
// header, and flags the page for ~2.5 s so heroes can react (CSS: html[data-reward]). Nothing is added
// locally: every number on screen comes back from the API.
import { useEffect, useRef, useState } from 'react';
import { useMemberData } from '../data/MemberData.jsx';
import { onReward } from '../data/rewardBus.js';
import { t } from '../i18n/t.js';
import { Counter, cx } from './ui.jsx';

export default function RewardSync() {
  const { reload, refreshMe } = useMemberData();
  const [items, setItems] = useState([]);
  const timer = useRef(null);
  useEffect(
    () =>
      onReward((r) => {
        ['points', 'activity', 'stats', 'profiles', 'surveys'].forEach((n) => reload?.(n));
        refreshMe?.();
        setItems((x) => [...x.slice(-2), r]);
        setTimeout(() => setItems((x) => x.filter((y) => y !== r)), 4200);
        const el = document.documentElement;
        el.dataset.reward = r.kind || 'on';
        clearTimeout(timer.current);
        timer.current = setTimeout(() => delete el.dataset.reward, 2600);
      }),
    [reload, refreshMe]
  );
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="rw-stack" aria-live="polite">
      {items.map((r) => (
        <div key={r.at} className={cx('rw-toast', `is-${r.kind}`)} role="status">
          <span className="rw-toast__coin" aria-hidden="true">
            <i />
          </span>
          <span className="rw-toast__txt">
            <strong>
              +<Counter value={r.points} duration={900} /> {t('pts.balance')}
            </strong>
            <span>{r.kind === 'profile' ? `${r.title || ''} profile complete` : `${r.title || 'Survey'} complete`}</span>
          </span>
          <span className="rw-toast__burst" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} style={{ '--a': `${i * 45}deg` }} />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
