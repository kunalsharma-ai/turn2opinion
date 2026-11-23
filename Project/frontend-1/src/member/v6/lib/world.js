// Round 24 · one reward world per member type.
//   consumer  "Opinion Kingdom"      a building rises for every completed profile (components/Kingdom.jsx)
//   pro       "Insight Observatory"  a star ignites and joins its constellation (components/World.jsx)
//   teen      "Quest Islands"        an island rises from the sea, gets a palm, a flag and a treasure chest
// The world only changes the picture and its words. Items, completion, points and quality are the same
// real data for everyone. Stage.jsx sets the world from the member type; Hero, Celebration and the
// "sealed" popup read it so their buttons and emoji match the member's world.

const WORLDS = {
  kingdom: {
    id: 'kingdom',
    e: '🏰',
    see: 'v6_see_kingdom',
    back: 'v6_c_kingdom',
    added: 'v6_c_built'
  },
  observatory: {
    id: 'observatory',
    e: '🔭',
    see: 'w_obs_see',
    back: 'w_obs_back',
    added: 'w_obs_added',
    unit: 'w_obs_unit',
    levels: [
      { at: 0, key: 'w_obs_lv0', e: '📡' }, { at: 1, key: 'w_obs_lv1', e: '🔎' }, { at: 2, key: 'w_obs_lv2', e: '📊' },
      { at: 5, key: 'w_obs_lv3', e: '🧠' }, { at: 10, key: 'w_obs_lv4', e: '🎯' }, { at: 18, key: 'w_obs_lv5', e: '🏛️' },
      { at: 28, key: 'w_obs_lv6', e: '🌐' }, { at: Infinity, key: 'w_obs_lv7', e: '🌌' }
    ],
    milestones: [
      { pts: 50, key: 'w_obs_ms0', e: '📡', fx: 'beacon' },
      { pts: 100, key: 'w_obs_ms1', e: '🌈', fx: 'aurora' },
      { pts: 250, key: 'w_obs_ms2', e: '🛰️', fx: 'satellite' },
      { pts: 500, key: 'w_obs_ms3', e: '☄️', fx: 'comet' },
      { pts: 1000, key: 'w_obs_ms4', e: '🔭', fx: 'gold' },
      { pts: 1500, key: 'w_obs_ms5', e: '🌠', fx: 'meteors' }
    ],
    seals: [
      { k: 'w_obs_s0', e: '📡', need: (c) => c.done >= 1 },
      { k: 'w_obs_s1', e: '🗂️', need: (c) => c.basic },
      { k: 'w_obs_s2', e: '🪪', need: (c) => c.aboutDone },
      { k: 'w_obs_s3', e: '📊', need: (c) => c.surveysDone >= 1 },
      { k: 'w_obs_s4', e: '✨', need: (c) => c.done >= 5 },
      { k: 'w_obs_s5', e: '🔭', need: (c) => c.done >= 10 },
      { k: 'w_obs_s6', e: '🏛️', need: (c) => c.done >= 18 },
      { k: 'w_obs_s7', e: '🌌', need: (c) => c.total > 0 && c.done >= c.total }
    ]
  },
  islands: {
    id: 'islands',
    e: '🏝️',
    see: 'w_isl_see',
    back: 'w_isl_back',
    added: 'w_isl_added',
    unit: 'w_isl_unit',
    levels: [
      { at: 0, key: 'w_isl_lv0', e: '🛶' }, { at: 1, key: 'w_isl_lv1', e: '🧭' }, { at: 2, key: 'w_isl_lv2', e: '⛵' },
      { at: 4, key: 'w_isl_lv3', e: '🗺️' }, { at: 7, key: 'w_isl_lv4', e: '🏴‍☠️' }, { at: 10, key: 'w_isl_lv5', e: '⚓' },
      { at: 14, key: 'w_isl_lv6', e: '🦜' }, { at: Infinity, key: 'w_isl_lv7', e: '👑' }
    ],
    milestones: [
      { pts: 50, key: 'w_isl_ms0', e: '🍾', fx: 'bottle' },
      { pts: 100, key: 'w_isl_ms1', e: '🌈', fx: 'rainbow' },
      { pts: 250, key: 'w_isl_ms2', e: '🐋', fx: 'whale' },
      { pts: 500, key: 'w_isl_ms3', e: '🎈', fx: 'balloon' },
      { pts: 1000, key: 'w_isl_ms4', e: '🚢', fx: 'ship' },
      { pts: 1500, key: 'w_isl_ms5', e: '🎆', fx: 'fireworks' }
    ],
    seals: [
      { k: 'w_isl_s0', e: '🏝️', need: (c) => c.done >= 1 },
      { k: 'w_isl_s1', e: '⛺', need: (c) => c.basic },
      { k: 'w_isl_s2', e: '🙋', need: (c) => c.aboutDone },
      { k: 'w_isl_s3', e: '🗺️', need: (c) => c.surveysDone >= 1 },
      { k: 'w_isl_s4', e: '🐚', need: (c) => c.done >= 5 },
      { k: 'w_isl_s5', e: '🦜', need: (c) => c.done >= 10 },
      { k: 'w_isl_s6', e: '⚓', need: (c) => c.total > 0 && c.done >= Math.ceil(c.total * 0.75) },
      { k: 'w_isl_s7', e: '👑', need: (c) => c.total > 0 && c.done >= c.total }
    ]
  }
};

export const worldIdFor = (type) => (type === 'pro' ? 'observatory' : type === 'teen' ? 'islands' : 'kingdom');

let current = 'kingdom';
export function setWorld(type) {
  current = worldIdFor(type);
  return current;
}
/** the member's world config (kingdom unless Stage set another) */
export const world = () => WORLDS[current];
export const worldById = (id) => WORLDS[id] || WORLDS.kingdom;

/** level for a world's own level table (same shape as rewards.levelOf) */
export function worldLevel(levels, done, total) {
  let k = 0;
  for (let j = 0; j < levels.length; j++) if (done >= levels[j].at) k = j;
  if (total && done >= total) k = levels.length - 1;
  const nx = k < levels.length - 2 ? levels[k + 1].at : total;
  return { k, ...levels[k], next: nx, toNext: Math.max(0, nx - done) };
}
