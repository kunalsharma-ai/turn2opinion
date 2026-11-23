// One place that says how each member type's dashboard is composed. The three dashboards share
// every component; only the order, emphasis and wording change here.

export const TYPES = ['consumer', 'pro', 'teen'];

/** API category -> member type. */
export function memberTypeOf(category) {
  if (category === 'b2b') return 'pro';
  if (category === 'minor') return 'teen';
  return 'consumer';
}

// Routes. `external: true` pages belong to the existing member app (approved Profiles hero and the
// approved survey experience) and are opened with a full page load, never re-rendered here.
export const ROUTES = {
  dashboard: { path: '/member/dashboard/', icon: 'dashboard', label: 'nav.dashboard' },
  surveys: { path: '/member/surveys', icon: 'clipboard', label: 'nav.surveys', external: true },
  rewards: { path: '/member/rewards/', icon: 'coin', label: 'nav.rewards' },
  quality: { path: '/member/quality-score/', icon: 'shield', label: 'nav.quality' },
  referrals: { path: '/member/referrals/', icon: 'users', label: 'nav.referrals' },
  activity: { path: '/member/activity/', icon: 'pulse', label: 'nav.activity' },
  profile: { path: '/member/profile/', icon: 'user', label: 'nav.account' },
  profiles: { path: '/member/profiles', icon: 'map', label: 'nav.profiles', external: true },
  settings: { path: '/member/settings/', icon: 'gear', label: 'nav.settings' },
  support: { path: '/member/support', icon: 'headset', label: 'nav.support', external: true },
  myaccount: { path: '/member/myaccount', icon: 'wallet', label: 'ma.payment', external: true }
};

// Sidebar (desktop) and bottom bar (phone). The bottom bar holds the four most used places plus "More".
// Order follows the member journey: complete your profile -> participate -> earn -> improve -> track.
export const NAV = ['dashboard', 'profiles', 'surveys', 'rewards', 'quality', 'referrals', 'activity', 'profile', 'settings'];
export const BOTTOM_NAV = ['dashboard', 'profiles', 'surveys', 'rewards'];

// Dashboard composition. Module ids map to components in dashboards/Composer.jsx.
//   wide: spans the main column;  side: right column on wide screens
export const LAYOUT = {
  consumer: {
    main: ['surveys', 'points', 'activity', 'achievements'],
    side: ['quality', 'profile', 'referral', 'kingdom']
  },
  pro: {
    main: ['surveys', 'expertise', 'insights', 'activity'],
    side: ['quality', 'qualification', 'points', 'referral']
  },
  teen: {
    main: ['surveys', 'achievements', 'points', 'activity'],
    side: ['quality', 'guardian', 'profile', 'referral']
  }
};

// The About-you profiles that unlock surveys (from the profile system), per panel.
export const ABOUT_YOU = ['basic', 'educational', 'professional', 'financial'];

// Points per payout and milestones for the referral progress bar (display only).
export const REFERRAL_STEPS = [1, 3, 5, 10, 25];
