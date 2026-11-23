/**
 * Sample payloads shaped exactly like the call sites that send these templates.
 * Used by lint-liquid.mjs and send.mjs --liquid.
 *
 *   SAMPLE         system templates (user.name.first, user.mail …) AND the lifecycle
 *                  reminder payload (member.*, links.*, profile.*) — they never clash
 *   TICKET_SAMPLE  the four support-ticket templates, whose call site sends a FLAT
 *                  user.name / user.email
 */
export const SAMPLE = {
  user: {
    name: { first: 'Aarav' },
    mail: 'aarav.mehta@example.com',
    _id: '6720b4c1e9f3',
    origin: 'www.turn2opinion.com',
    fullName: 'Aarav Mehta',
    parent: { name: { first: 'Neha' }, relation: 'mother' },
  },
  email: 'aarav.new@example.com',
  token: 'c93e10ab57',
  otp: { code: '602914' },
  survey: { name: 'Streaming habits 2026', points: 300, time: 10, link: 'https://www.turn2opinion.com/s/SV-31207' },
  ref: { link: 'https://www.turn2opinion.com/join?r=AARAV26' },
  data: { ticketNo: 'TKT-20931', subject: 'Points not showing for survey SV-31207' },
  reply: { ticketNo: 'TKT-20931', message: 'Thanks for waiting — the 300 points are now in your balance.' },
  repliedBy: { fullName: 'Support Team' },

  // lifecycle reminder service
  member: { first_name: 'Aarav', email: 'aarav.mehta@example.com', member_id: 'T2O-5521-08', country: 'India' },
  profile: { completed_count: 4, total_count: 37, percent_complete: 11, next_name: 'Banking & Financial Services' },
  links: {
    set_password: 'https://www.turn2opinion.com/set-password?t=TOKEN',
    accept_terms: 'https://www.turn2opinion.com/account/terms',
    profiles: 'https://www.turn2opinion.com/member/profiles',
    account: 'https://www.turn2opinion.com/member',
    login: 'https://www.turn2opinion.com/?login',
  },
  preferences_url: 'https://www.turn2opinion.com/account/preferences',
  unsubscribe_url: 'https://www.turn2opinion.com/unsubscribe?t=TOKEN',
};

export const TICKET_SAMPLE = { ...SAMPLE, user: { name: 'Aarav Mehta', email: 'aarav.mehta@example.com' } };

export const isTicket = (f) => /(^|\/)ticket-/.test(f);
