// Interface sound feedback. Used only for meaningful moments (survey done, points, achievements,
// important notifications) and always behind the site-wide sound switch (utils/soundPref.js).
import { soundEnabled } from '../../utils/soundPref.js';

const reduce = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const MAP = { success: 'playSuccess', points: 'playCoin', achievement: 'playReward', notify: 'playNotify', toggle: 'playSwitch' };

export function feedback(kind = 'success') {
  if (!soundEnabled()) return;
  import('../../utils/sound.js')
    .then((m) => m[MAP[kind]]?.())
    .catch(() => {});
}

// Small haptic on phones that support it (silent, respects reduced motion).
export function tap() {
  if (reduce()) return;
  try {
    navigator.vibrate?.(8);
  } catch {
    /* ignore */
  }
}
