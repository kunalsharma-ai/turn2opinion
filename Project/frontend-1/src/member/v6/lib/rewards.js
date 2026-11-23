// Reward constants and the kingdom's levels and milestones (v6 values).
// Points and quality shown on the page are the member's REAL totals from the API; these constants are only
// the per-item reward labels (+50 points, +1 quality) and the cosmetic level/milestone thresholds.
// The device remembers which buildings have already been raised, so each rise animation plays once.
import { LS } from './storage.js';

export const POINTS_PER_ITEM = 50;
export const QUALITY_PER_ITEM = 1;

const BUILT = 't2o:member:built';
let built = null;
const read = () => { if (built) return built; try { const v = JSON.parse(LS.get(BUILT) || 'null'); built = Array.isArray(v) ? v : null; } catch { built = null; } return built; };
/** first visit: everything already complete counts as built (no replay of old animations) */
export function initBuilt(keys) { if (!read()) { built = [...keys]; LS.set(BUILT, JSON.stringify(built)); } }
export const isBuilt = (key) => (read() || []).includes(key);
export const markBuilt = (key) => { const b = read() || []; if (b.includes(key)) return; built = [...b, key]; LS.set(BUILT, JSON.stringify(built)); };
export const markPaid = () => {};

export const LEVELS = [
  { at: 0, key: 'lv_camp', e: '⛺' }, { at: 1, key: 'lv_hamlet', e: '🛖' }, { at: 2, key: 'lv_village', e: '🏘️' },
  { at: 5, key: 'lv_town', e: '🏡' }, { at: 10, key: 'lv_city', e: '🏙️' }, { at: 18, key: 'lv_kingdom', e: '🏰' },
  { at: 28, key: 'lv_empire', e: '👑' }, { at: Infinity, key: 'lv_legend', e: '🌟' }
];
export function levelOf(done, total) {
  let k = 0; for (let j = 0; j < LEVELS.length; j++) if (done >= LEVELS[j].at) k = j;
  if (total && done >= total) k = LEVELS.length - 1;
  const nx = k < LEVELS.length - 2 ? LEVELS[k + 1].at : total;
  return { k, ...LEVELS[k], next: nx, toNext: Math.max(0, nx - done) };
}
export const MILESTONES = [
  { pts: 50, key: 'ms_flag', e: '🚩', fx: 'flag' },
  { pts: 100, key: 'ms_rainbow', e: '🌈', fx: 'rainbow' },
  { pts: 250, key: 'ms_balloons', e: '🎈', fx: 'balloons' },
  { pts: 500, key: 'ms_dragon', e: '🐉', fx: 'dragon' },
  { pts: 1000, key: 'ms_crown', e: '👑', fx: 'crown' },
  { pts: 1500, key: 'ms_fireworks', e: '🎆', fx: 'fireworks' }
];
