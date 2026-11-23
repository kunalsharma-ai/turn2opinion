// The parent or guardian is NOT asked for anything on this page: their name, relationship and contact were
// captured when the account was registered and come in through window.T2O_MINOR.guardian. The page only shows
// the contact — masked — so the family can see where the confirmation will go, and the backend uses its own
// stored copy when it sends it.
export const maskContact = (g) => {
  const v = String((g && g.contact) || '').trim();
  if (!v) return '';
  if (g.contactType === 'phone') return v.length > 4 ? `${'•'.repeat(Math.max(2, Math.min(8, v.length - 4)))}${v.slice(-4)}` : v;
  const [u, d] = v.split('@');
  return d ? `${u.slice(0, 1)}${'•'.repeat(Math.max(1, Math.min(6, u.length - 1)))}@${d}` : v;
};

/** What we know about the guardian already (nothing is required for the page to work). */
export const guardianOnFile = (cfg) => {
  const g = cfg.guardian || {};
  return {
    name: String(g.name || '').trim(),
    relationship: g.relationship || '',
    contactType: g.contactType === 'phone' ? 'phone' : 'email',
    contact: String(g.contact || '').trim(),
    country: String(g.country || cfg.member.country || '').toUpperCase().slice(0, 2),
    verified: Boolean(g.verified),
    masked: maskContact(g),
  };
};
