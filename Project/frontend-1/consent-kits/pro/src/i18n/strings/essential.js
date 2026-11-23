// Essential Business-panel text for the 38 languages without a full hand translation: the page title, the three
// steps, the six track names, every approval (all 9), the sign control and the main buttons — i.e. everything a
// professional needs to understand WHAT they are approving. Other text falls back to machine translation (when
// available) or English. Each language's array follows the order of KEYS.
import A from './ess-1.js';
import B from './ess-2.js';
import C from './ess-3.js';

export const KEYS = [
  'h1', 'step1', 'step2', 'step3', 'means', 'open_clause', 'reviewed_ok', 'approvals_h', 'required', 'optional', 'approved',
  'c_terms', 'c_privacy', 'c_accuracy', 'c_confidential', 'c_interviews', 'c_clientContact', 'c_sensitive', 'c_marketing', 'c_analytics',
  'slide', 'not_now', 'done_h', 'continue', 'legal_en', 'tr_join', 'tr_role', 'tr_data', 'tr_studies', 'tr_sharing', 'tr_account', 'theme_light', 'theme_dark',
];

export const ESSENTIAL = { ...A, ...B, ...C };
