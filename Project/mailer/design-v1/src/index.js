/**
 * Template registry — 4 lifecycle reminders, 15 system templates and the 12 Teen emails.
 * scripts/build.mjs walks this list in order.
 */
export { setMode, getMode } from './lib/liquid.js';

import E0, { meta as m0, text as t0 } from './emails/case1-password.jsx';
import E1, { meta as m1, text as t1 } from './emails/case2-terms.jsx';
import E2, { meta as m2, text as t2 } from './emails/case3-noprofiles.jsx';
import E3, { meta as m3, text as t3 } from './emails/case4-partial.jsx';
import E4, { meta as m4, text as t4 } from './emails/01-respondent.jsx';
import E5, { meta as m5, text as t5 } from './emails/02-welcome.jsx';
import E6, { meta as m6, text as t6 } from './emails/03-forgot-password.jsx';
import E7, { meta as m7, text as t7 } from './emails/04-reset-password.jsx';
import E8, { meta as m8, text as t8 } from './emails/05-change-email.jsx';
import E9, { meta as m9, text as t9 } from './emails/06-change-email-verify.jsx';
import E10, { meta as m10, text as t10 } from './emails/07-parent-consent.jsx';
import E14, { meta as m14, text as t14 } from './emails/11-invite.jsx';
import E15, { meta as m15, text as t15 } from './emails/12-newsurvey.jsx';
import E16, { meta as m16, text as t16 } from './emails/13-birthday.jsx';
import E17, { meta as m17, text as t17 } from './emails/14-ticket-created-user.jsx';
import E18, { meta as m18, text as t18 } from './emails/15-ticket-created-team.jsx';
import E19, { meta as m19, text as t19 } from './emails/16-ticket-updated-user.jsx';
import E20, { meta as m20, text as t20 } from './emails/17-ticket-updated-team.jsx';
import E21, { meta as m21, text as t21 } from './emails/18-newuser.jsx';
import { TEEN } from './emails/teen-set.jsx';

const reg = (meta, Component, text, file) => ({ meta: { ...meta, file }, Component, text });

export const EMAILS = [
  reg(m0, E0, t0, 'case1-password.jsx'),
  reg(m1, E1, t1, 'case2-terms.jsx'),
  reg(m2, E2, t2, 'case3-noprofiles.jsx'),
  reg(m3, E3, t3, 'case4-partial.jsx'),
  reg(m4, E4, t4, '01-respondent.jsx'),
  reg(m5, E5, t5, '02-welcome.jsx'),
  reg(m6, E6, t6, '03-forgot-password.jsx'),
  reg(m7, E7, t7, '04-reset-password.jsx'),
  reg(m8, E8, t8, '05-change-email.jsx'),
  reg(m9, E9, t9, '06-change-email-verify.jsx'),
  reg(m10, E10, t10, '07-parent-consent.jsx'),
  reg(m14, E14, t14, '11-invite.jsx'),
  reg(m15, E15, t15, '12-newsurvey.jsx'),
  reg(m16, E16, t16, '13-birthday.jsx'),
  reg(m17, E17, t17, '14-ticket-created-user.jsx'),
  reg(m18, E18, t18, '15-ticket-created-team.jsx'),
  reg(m19, E19, t19, '16-ticket-updated-user.jsx'),
  reg(m20, E20, t20, '17-ticket-updated-team.jsx'),
  reg(m21, E21, t21, '18-newuser.jsx'),
  // the twelve Teen registration emails (13–17), replacing 08 / 09 / 10 of the delivered set
  ...TEEN.map((x) => reg(x.meta, x.Component, x.text, 'teen-set.jsx')),
];

export default EMAILS;
