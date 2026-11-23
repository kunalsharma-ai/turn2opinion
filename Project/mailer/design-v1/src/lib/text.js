/** Shared plain-text pieces, so every text/plain part ends the same way. */
import { BRAND } from './theme.js';

export const textFoot = (reason, { prefs, unsub, internal } = {}) => [
  '',
  internal ? '' : `Questions? ${BRAND.support} · ${BRAND.phoneDisplay} · WhatsApp ${BRAND.whatsappDisplay}`,
  '',
  reason,
  prefs ? `Email preferences: ${prefs}` : '',
  unsub ? `Unsubscribe: ${unsub}` : '',
  '',
  `Turn2Opinion — ${BRAND.tagline}`,
  `${BRAND.legalName}`,
  BRAND.address,
].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');

/** Key/value lines aligned in two columns. */
export const kv = (rows) => {
  const w = Math.max(...rows.map(([k]) => k.length)) + 2;
  return rows.map(([k, val]) => `  ${k.padEnd(w)}${val}`).join('\n');
};

export const bullets = (items) => items.map((i) => `  - ${i}`).join('\n');
