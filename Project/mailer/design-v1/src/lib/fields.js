/**
 * Merge fields — eighteen system templates.
 *
 * Field NAMES are identical to the MyFrequentRewards set (and the originals it
 * replaced), because both panels are sent from the same Frequent Research mail
 * system. Nothing in the backend has to change to send these for Turn2Opinion;
 * only the sample values below are Turn2Opinion's.
 *
 * Kept on purpose: the four support-ticket templates use a FLAT `user.name` and
 * `user.email`, every other template uses `user.name.first` and `user.mail`. They are
 * different call sites with different shapes. Do not merge them without changing the
 * backend too.
 */
import { v, isLiquid } from './liquid.js';

/* ── member ──────────────────────────────────────────────────────────────── */
export const u = {
  first:   () => v('user.name.first | default: "there"', 'Aarav'),
  mail:    () => v('user.mail', 'aarav.mehta@example.com'),
  id:      () => v('user._id', '6720b4c1e9f3'),
  origin:  () => v('user.origin', 'www.turn2opinion.com'),
  full:    () => v('user.fullName', 'Aarav Mehta'),
  /** parent / guardian — the four teen-consent templates */
  pFirst:  () => v('user.parent.name.first', 'Neha'),
  idRaw:     () => (isLiquid() ? '{{user._id}}' : '6720b4c1e9f3'),
  originRaw: () => (isLiquid() ? '{{user.origin}}' : 'www.turn2opinion.com'),
  pRel:    () => v('user.parent.relation', 'mother'),
};

/** Support-ticket call site only — flat name/email. */
export const tkUser = {
  name:  () => v('user.name', 'Aarav Mehta'),
  email: () => v('user.email', 'aarav.mehta@example.com'),
};

/* ── tokens ──────────────────────────────────────────────────────────────── */
export const tok = {
  token: () => v('token', 'c93e10ab57'),
  otp:   () => v('otp.code', '602914'),
  otpRaw:   () => (isLiquid() ? '{{otp.code}}' : '602914'),
  tokenRaw: () => (isLiquid() ? '{{token}}' : 'c93e10ab57'),
};

/** The address being moved to, on the two change-email templates. */
export const newEmail = () => v('email', 'aarav.new@example.com');

/* ── survey ──────────────────────────────────────────────────────────────── */
export const sv = {
  name:   () => v('survey.name', 'Streaming habits 2026'),
  points: () => v('survey.points', '300'),
  time:   () => v('survey.time', '10'),
  // the current newsurvey template sends no survey link: the button opens the member's Surveys page
  link:   () => v('survey.link | default: "https://www.turn2opinion.com/member/surveys/"', 'https://www.turn2opinion.com/member/surveys/'),
};

/* ── referral ────────────────────────────────────────────────────────────── */
export const ref = {
  link: () => v('ref.link', 'https://www.turn2opinion.com/join?r=AARAV26'),
};

/* ── support tickets ─────────────────────────────────────────────────────── */
export const tk = {
  no:      () => v('data.ticketNo', 'TKT-20931'),
  subject: () => v('data.subject', 'Points not showing for survey SV-31207'),
};
export const rep = {
  no:      () => v('reply.ticketNo', 'TKT-20931'),
  message: () => v('reply.message', 'Thanks for waiting — the 300 points for SV-31207 are now in your balance. The dashboard can take a few minutes to refresh.'),
  by:      () => v('repliedBy.fullName | default: "Turn2Opinion Support"', 'Support Team'),
};

/* ── destinations ────────────────────────────────────────────────────────────
   Exactly the links the Turn2Opinion templates already send (Project/mailer, before
   this design): same paths, same query parameters, same scheme. The http:// ones are
   kept as they are; see Project/mailer/README.md ("Links to check").           */
const http = () => `http://${u.originRaw()}`;
const https = () => `https://${u.originRaw()}`;

export const url = {
  /** respondent.liquid */
  setPassword: () => `${http()}/join?user=${u.idRaw()}&code=${tok.otpRaw()}`,
  /** forgot-password.liquid */
  forgot:      () => `${http()}/reset-password/?user=${u.idRaw()}&code=${tok.otpRaw()}`,
  /** reset-password.liquid */
  reset:       () => `${http()}/auth/password?user=${u.idRaw()}&code=${tok.otpRaw()}`,
  parent:      () => `${https()}/parent-consent/?user=${u.idRaw()}&code=${tok.otpRaw()}`,
  changeConf:  () => `${https()}/auth/change-email?confcode=${tok.tokenRaw()}`,
  changeUpd:   () => `${https()}/auth/change-email?updatecode=${tok.tokenRaw()}`,
  /** welcome.liquid */
  login:       () => `${http()}/?login`,
  home:        () => https(),
  site:        () => 'https://www.turn2opinion.com',
  support:     () => 'https://www.turn2opinion.com/contact',
  faq:         () => 'https://www.turn2opinion.com/faq',
  privacy:     () => 'https://www.turn2opinion.com/privacy',
  terms:       () => 'https://www.turn2opinion.com/terms',
  prefs:       () => 'https://www.turn2opinion.com/account/preferences',
};

/** Research-conduct statement, as the Turn2Opinion website states it. */
export const CONDUCT_NOTE =
  'Your answers are used for research only, reported in aggregate, and never sold or used for advertising.';
