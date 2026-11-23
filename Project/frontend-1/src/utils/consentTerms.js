// Saving a panel agreement's choices (Consumer / Professional Consent & Terms step).
// Same call as before the approved consent pages were added: PUT /api/v1/me { terms: [...] }, keeping any
// earlier records (for example the sign-up privacy acknowledgement) and replacing only this agreement's own ids.
import { ENV } from '../config/env.js';
import { api } from './api.js';

// The consent ids of each agreement (consent-kits/<kind>/src/content/terms.js → CONSENTS).
export const AGREEMENT_IDS = {
  consumer: ['terms', 'privacy', 'age', 'marketing', 'analytics', 'recordings', 'sensitive'],
  pro: ['terms', 'privacy', 'accuracy', 'confidential', 'interviews', 'clientContact', 'sensitive', 'marketing', 'analytics']
};

/** record.consents ({ id: true/false }) → saved. Throws with a readable message when the API refuses. */
export async function saveAgreementTerms(kind, consents = {}) {
  const own = AGREEMENT_IDS[kind] || AGREEMENT_IDS.consumer;
  const ids = own.filter((id) => consents[id] === true);
  if (ENV.DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 500));
    return { terms: ids };
  }
  let prev = [];
  try {
    const me = await api.get('/api/v1/me');
    prev = Array.isArray(me?.data?.terms) ? me.data.terms : [];
  } catch {
    prev = [];
  }
  const ownSet = new Set(own);
  const terms = [...new Set([...prev.filter((t) => !ownSet.has(t)), ...ids])];
  const r = await api.put('/api/v1/me', { terms });
  if (r?.status !== 'success') throw new Error(r?.message || 'We couldn’t save your choices. Please try again.');
  return { terms: ids };
}
