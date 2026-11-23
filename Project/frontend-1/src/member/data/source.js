// Backend API -> data adapter -> dashboard state.
//
// Every call here is an EXISTING endpoint, used with the same request shape the current member area
// sends (see BACKEND-DEPENDENCIES.md for the list). The adapters turn backend shapes into small,
// stable objects so components never read backend field names directly. If the backend changes a
// field, only this file changes.
import { api } from '../../utils/api.js';
import { ENV } from '../../config/env.js';
import { memberTypeOf } from '../config/memberTypes.js';
import { demoSection } from './demo.js';
import { demoAnswers, demoOptions, demoQuestion, demoSave, demoStartSurvey } from './demoQuestions.js';

export const CHOICE = ['select', 'multiselect', 'checkbox', 'radio'];

const ok = (r) => r && r.status === 'success';
async function call(fn) {
  const r = await fn();
  if (!ok(r)) {
    const e = new Error((r && r.message) || 'request failed');
    e.auth = /token|unauthori[sz]ed|login/i.test(e.message);
    throw e;
  }
  return r.data;
}
const num = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
const title = (s) => String(s || '').replace(/\b([a-z])/g, (m) => m.toUpperCase());

// ---------------- adapters ----------------
export function adaptMe(d) {
  if (!d) return null;
  const name = d.name || {};
  const addr = (Array.isArray(d.address) ? d.address.find((a) => /home/i.test(a?.tag || '')) || d.address[0] : null) || {};
  return {
    id: d._id || d.id || '',
    memberId: d.respondentID || '',
    type: memberTypeOf(d.category),
    category: d.category || 'b2c',
    firstName: name.first || d.firstname || '',
    lastName: name.last || d.lastname || '',
    salutation: name.salutation || '',
    fullName: [name.first, name.middle, name.last].filter(Boolean).join(' ') || d.fullName || '',
    email: d.mail || d.email || '',
    phone: d.phone || '',
    dob: d.dob || null,
    gender: d.gender || '',
    joinedAt: d.createdAt || null,
    photo: d.profilePicture && !/\/images\/logo\/user\.png$/.test(d.profilePicture) ? d.profilePicture : null,
    address: {
      country: addr.country ? String(addr.country).toUpperCase() : '',
      state: addr.state ? (/^[a-z]{2}-/i.test(addr.state) ? String(addr.state).toUpperCase() : title(addr.state)) : '',
      city: title(addr.city),
      zip: addr.zipcode ? String(addr.zipcode).toUpperCase() : ''
    },
    terms: Array.isArray(d.terms) ? d.terms : [],
    quality: { score: num(d.qualityScore, 100), scale: num(d.qualityScoreTotal, 200) || 200 },
    parent: d.parent || null
  };
}

export function adaptPoints(d) {
  const earned = num(d?.respPoints ?? d?.totalPoints);
  const redeemed = num(d?.redeemPoints);
  return {
    total: num(d?.totalPoints, earned - redeemed),
    earned,
    redeemed,
    threshold: num(d?.threshold, 15000) || 15000,
    rate: num(d?.conversionRate, 0.001)
  };
}

export function adaptStats(d) {
  const s = Array.isArray(d) ? d[0] || {} : d || {};
  return {
    total: num(s.total),
    available: num(s.available),
    complete: num(s.complete),
    disqualified: num(s.disqualified),
    abandoned: num(s.abdoned ?? s.abandoned),
    points: num(s.points)
  };
}

export function adaptSurveys(list) {
  return (Array.isArray(list) ? list : [])
    .filter((s) => !s.participationStatus || s.participationStatus === 'invited')
    .map((s) => ({
      id: s._id || s.slug,
      name: s.name || 'Survey',
      slug: s.slug,
      points: num(s.points),
      loi: num(s.loi),
      category: s.surveyCategory || '',
      source: s.source || '',
      createdAt: s.createdAt || null
    }))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

export function adaptProfiles(list) {
  return (Array.isArray(list) ? list : []).map((p) => {
    // pages: [[pageTitle, questionName, ...], ...] (same shape the existing profile flow reads)
    const pages = (Array.isArray(p.pages) ? p.pages : []).filter((pg) => Array.isArray(pg) && pg.length > 1);
    const questions = pages.reduce((n, pg) => n + pg.length - 1, 0);
    return {
      slug: p.slug,
      name: title(p.name || p.slug),
      completion: Math.min(100, Math.max(0, num(p.status, -1))),
      started: num(p.status, -1) >= 0,
      group: p.group || p.section || '',
      icon: p.icon || '',
      points: num(p.points, 50) || 50,
      pages,
      questions,
      minutes: questions ? Math.max(1, Math.round(questions / 7)) : 0
    };
  });
}

/** A question definition from POST /api/v1/question. */
export function adaptQuestion(q) {
  if (!q || !q.name) return null;
  return {
    name: q.name,
    label: q.label || q.name,
    description: q.description || '',
    type: String(q.type || '').toLowerCase(),
    required: Boolean(q.required ?? q.isRequired),
    // the existing flow sends GET when a question has no parent field at all, POST otherwise
    hasParentField: Object.prototype.hasOwnProperty.call(q, 'parent'),
    parent: q.parent || null,
    children: Array.isArray(q.children) ? q.children : [],
    editable: q.isEditable ?? true,
    size: num(q.size, 6) || 6,
    hasOthers: Boolean(q.hasOthers),
    hasNone: Boolean(q.hasNone),
    hasSkip: Boolean(q.hasSkip),
    max: num(q.maxSelections, 0),
    isMoney: Boolean(q.isMoney),
    icon: q.icon || ''
  };
}

/** Options from /api/v1/option/:name. Strings and objects both occur. */
export function adaptOptions(list) {
  return (Array.isArray(list) ? list : []).map((o) =>
    typeof o === 'string' ? { label: o, value: o } : { label: o.label ?? o.value, value: o.value ?? o.label, img: o.img || '', exclusive: Boolean(o.isExclusive), describe: o.describeLabel || '' }
  );
}

export function adaptActivity(list) {
  return (Array.isArray(list) ? list : [])
    .filter((r) => r.status !== 'invited')
    .map((r) => ({
      id: r._id,
      status: r.status || 'other',
      name: r.survey?.name || 'Survey',
      slug: r.survey?.slug,
      category: r.survey?.surveyCategory || r.survey?.category || '',
      source: r.source || '',
      points: r.status === 'complete' ? num(r.points) : 0,
      loi: num(r.survey?.loi),
      start: r.timeline?.start || null,
      date: r.timeline?.end || r.updatedAt || r.timeline?.start || r.createdAt
    }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export function adaptReferrals(invites, joined, me) {
  const inv = Array.isArray(invites) ? invites : [];
  const reg = Array.isArray(joined) ? joined : [];
  const rows = [
    ...inv.map((i) => {
      const r = reg.find((u) => (u.mail || '').toLowerCase() === (i.email || '').toLowerCase());
      return { email: i.email, name: r?.fullName || '', sentAt: i.createdAt, joinedAt: r?.createdAt || null, status: r ? (r.isVerified?.email === 'verified' ? 'verified' : 'joined') : 'invited' };
    }),
    ...reg
      .filter((u) => !inv.some((i) => (i.email || '').toLowerCase() === (u.mail || '').toLowerCase()))
      .map((u) => ({ email: u.mail, name: u.fullName || '', sentAt: null, joinedAt: u.createdAt, status: u.isVerified?.email === 'verified' ? 'verified' : 'joined' }))
  ];
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.turn2opinion.com';
  return {
    // Same link format as the current referral page, so existing tracking keeps working.
    link: me?.id ? `${origin}/?ref=${me.id}&signup` : '',
    rows,
    joined: rows.filter((r) => r.status !== 'invited').length,
    invited: inv.length
  };
}

export function adaptAlerts(list) {
  return (Array.isArray(list) ? list : []).map((a) => ({ id: a._id, title: a.title, body: a.subtitle || '', cta: a.cta || '', date: a.createdAt })).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

// GET /api/v1/user/teen-profile -> { guardian: { relation, name, approvedAt }, consents: [{ who, version, at }] }
// The endpoint only answers for an active Teen, i.e. after the guardian consented.
export function adaptGuardian(d) {
  const g = d?.guardian;
  if (!g) return null;
  const rec = (Array.isArray(d.consents) ? d.consents : []).find((c) => c && c.who === 'guardian');
  return {
    status: rec || g.approvedAt ? 'approved' : 'pending',
    relation: g.relation || '',
    name: [g.name?.first, g.name?.last].filter(Boolean).join(' '),
    date: rec?.at || g.approvedAt || null,
    version: rec?.version || ''
  };
}

export function adaptSocials(list) {
  return (Array.isArray(list) ? list : []).map((s) => ({ platform: s.platform, url: s.url, points: num(s.points), status: s.status || 'not_started' }));
}

// ---------------- loaders (one per dashboard section) ----------------
export const LOADERS = {
  me: async () => adaptMe(await call(() => api.get('/api/v1/me'))),
  points: async () => adaptPoints(await call(() => api.get('/api/v1/me/points'))),
  stats: async () => adaptStats(await call(() => api.get('/api/v1/me/statistics'))),
  surveys: async () => adaptSurveys(await call(() => api.post('/api/v1/me/survey', { status: 'active' }))),
  profiles: async (ctx) => adaptProfiles(await call(() => api.post('/api/v1/profile', { category: ctx.me?.category }))),
  activity: async () => adaptActivity(await call(() => api.post('/api/v1/response', { status: { $nin: ['invited'] } }))),
  referrals: async (ctx) => {
    const [inv, reg] = await Promise.all([call(() => api.get('/api/v1/me/invite')), call(() => api.post('/api/v1/user', { referredBy: ctx.me?.id })).catch(() => [])]);
    return adaptReferrals(inv, reg, ctx.me);
  },
  alerts: async () => adaptAlerts(await call(() => api.get('/api/v1/alerts'))),
  guardian: async (ctx) => (ctx.me?.type === 'teen' ? adaptGuardian(await call(() => api.get('/api/v1/user/teen-profile'))) : null),
  socials: async () => adaptSocials(await call(() => api.get('/api/v1/socials'))),
  answers: async () => {
    // Professional expertise + notification channels, read from saved profile answers.
    const keys = ['communication-methods', 'empstat', 'industry', 'add-seniority', 'orgsize', 'orgdecision', 'jobrole', 'department'];
    const d = await call(() => api.post('/api/v1/me', { questions: keys }));
    const out = {};
    keys.forEach((k) => {
      if (d && d[k] != null) out[k] = d[k];
    });
    return out;
  }
};

/** Load one section. In the design preview (no server) the demo fixtures answer instead. */
export async function loadSection(name, ctx) {
  if (ENV.DEMO_MODE) return demoSection(name, ctx);
  return LOADERS[name](ctx);
}

// ---------------- actions (writes, all existing endpoints) ----------------
export const actions = {
  async uploadPhoto(file) {
    if (ENV.DEMO_MODE) return demoSection('upload', { file });
    const fd = new FormData();
    fd.append('file', file);
    const r = await api.post('/api/v1/upload/image', fd);
    const url = r?.file?.url || r?.data?.file?.url || r?.data?.url;
    if (!url) throw new Error('upload');
    const s = await api.put('/api/v1/me', { profilePicture: url });
    if (!ok(s)) throw new Error('save');
    return url;
  },
  async removePhoto() {
    if (ENV.DEMO_MODE) return true;
    const s = await api.put('/api/v1/me', { profilePicture: null });
    if (!ok(s)) throw new Error('save');
    return true;
  },
  async invite(emails) {
    if (ENV.DEMO_MODE) return { invited: emails, alreadyRegistered: [] };
    return call(() => api.post('/api/v1/me/invite', { emails }));
  },
  async changePassword(oldPassword, newPassword, cnfPassword) {
    if (ENV.DEMO_MODE) return 'Password changed';
    const r = await api.patch('/api/v1/me', { oldPassword, newPassword, cnfPassword });
    if (!ok(r)) throw new Error(r?.message || 'error');
    return r.message;
  },
  async saveChannels(list) {
    if (ENV.DEMO_MODE) return true;
    const r = await api.patch('/api/v1/me/answer', { 'communication-methods': list });
    if (!ok(r)) throw new Error(r?.message || 'error');
    return true;
  },
  async changeEmail(email) {
    if (ENV.DEMO_MODE) return 'Preview: no email was sent.';
    const r = await api.patch('/api/v1/me/change-email', { email });
    if (!ok(r)) throw new Error(r?.message || 'error');
    return r.message;
  },
  async verifySocial(platform, socialId, screenshot) {
    if (ENV.DEMO_MODE) return 'Preview: submitted.';
    const fd = new FormData();
    fd.append('platform', platform);
    fd.append('socialId', socialId);
    fd.append('screenshot', screenshot);
    const r = await api.post('/api/v1/follow-social/verify', fd);
    if (!ok(r)) throw new Error(r?.message || 'error');
    return r.message;
  },
  // ---- profiles and surveys (the same endpoints the existing member app calls) ----
  async question(name) {
    if (ENV.DEMO_MODE) return demoQuestion(name);
    const d = await call(() => api.post('/api/v1/question', { name }));
    return adaptQuestion(Array.isArray(d) && d.length === 1 ? d[0] : null);
  },
  /** Options (choice questions) or validation (text questions); dependent ones send the parent's answer. */
  async options(q, parentValue) {
    if (ENV.DEMO_MODE) return demoOptions(q, parentValue);
    const kind = CHOICE.includes(q.type) ? 'option' : 'validation';
    if (q.parent && (parentValue == null || parentValue === '' || (Array.isArray(parentValue) && !parentValue.length))) return kind === 'option' ? [] : null;
    const r = q.hasParentField ? await api.post(`/api/v1/${kind}/${q.name}`, { parentValue }) : await api.get(`/api/v1/${kind}/${q.name}`);
    const d = r?.data ?? (kind === 'option' ? [] : null);
    return kind === 'option' ? adaptOptions(d) : d;
  },
  async answers(questions) {
    if (ENV.DEMO_MODE) return demoAnswers(questions);
    return (await call(() => api.post('/api/v1/me', { questions }))) || {};
  },
  async saveProfile(values) {
    if (ENV.DEMO_MODE) return demoSave(values);
    const r = await api.patch('/api/v1/me/profile', values);
    if (!ok(r)) throw new Error(r?.message || 'error');
    return true;
  },
  /** Opens a survey for this member: { name, slug, pages, description, thankyou, link, respID }. */
  async startSurvey(slug) {
    if (ENV.DEMO_MODE) return demoStartSurvey(slug);
    return call(() => api.put('/api/v1/me/survey', { slug }));
  },
  async saveSurvey(values, respID) {
    if (ENV.DEMO_MODE) return demoSave(values);
    const r = await api.patch('/api/v1/me/survey', { ...values, respID });
    if (!ok(r)) throw new Error(r?.message || 'error');
    return true;
  },
  async country() {
    if (ENV.DEMO_MODE) return 'in';
    const r = await api.get('/api/v1/get-country').catch(() => null);
    return String(r?.country || r?.data?.country || '').toLowerCase().trim();
  },
  async logout() {
    if (!ENV.DEMO_MODE) await api.delete?.('/api/v1/me').catch(() => {});
    try {
      localStorage.removeItem('token');
    } catch {
      /* ignore */
    }
  }
};
