/* Profile engine: the original page's business rules (dependent options, visibility, pruning, payload)
   plus the v3 validation layer (src/lib/validate): every answer gets a level — pass / soft / stepup / block.
     block   → the respondent must fix it (red message)
     soft    → shown once as an amber "please confirm"; pressing Continue again accepts it and records a flag
     stepup  → needs an extra confirmation (e.g. parental consent) or verification before it is trusted
   Flags travel with the submitted profile (payload.quality) for server-side scoring. */
import { INCOME_Q, incomeOptions, incomeMeta } from './income.js';
import { fieldSpec, validateField } from './validate/fields.js';
import { validateText } from './validate/misc.js';
import { t } from '../i18n/index.js';

/* identity fields: editable after completion, but every change is flagged for review and email/phone
   changes reset their verification */
export const LOCK = /^(firstname|lastname|mail|phone|dob|gender|country)$/;
/* "Other" options: picking one opens a required "Please specify" field (stored as <question>-other) */
export const OTHER = /^\s*(others?|something else|any ?other|another|else)\b|please specify|\(specify\)|^other\s*[-–(:]/i;
export const otherKey = (n) => n + '-other';
export const filled = (a) => a != null && a !== '' && !(Array.isArray(a) && !a.length);
const OPTIONAL = /alternate|linkedin|website|payment-method|social-media|company-address|^verify-|^add-(middlename|address2|preferredname|linkedin)$|^phone1$|^workemail$/;

export class Session {
  /* others(): answers saved in the respondent's other profiles (for cross-profile checks); guess: likely country */
  constructor(D, prof, others = () => ({}), guess = '') {
    this.D = D; this.prof = prof; this.others = others; this.guess = guess;
    this.ans = {}; this.raw = {}; this.flat = []; this.hist = [];
    this.i = -1; this.live = false; this.edit = false; this.one = false; this.done = false;
    this.pct = 0; this.ms = new Set(); this.cache = new Map(); this.snap = null;
    this.res = {}; this.ack = {}; this.flags = {}; this.prev = {}; this.times = {};
    const seen = new Set();
    const add = (q, sec) => {
      if (seen.has(q) || !D.Q[q]) return; seen.add(q);
      const par = D.Q[q][1];
      if (par && D.Q[par]) add(par, sec);   // pull in parent questions from other profiles
      this.flat.push([q, sec]);
    };
    prof.p.forEach(([sec, qs]) => qs.forEach((q) => add(q, sec)));
  }
  q(n) { return this.D.Q[n][0]; }
  nm(i) { return this.flat[i][0]; }
  cur() { return this.nm(this.i); }
  spec(n) { return fieldSpec(n, this.q(n)); }
  /* compatibility with v2 callers: [_, input type, _, placeholder] */
  sp(n) { const s = this.spec(n); return [0, s.type, null, typeof s.ph === 'function' ? s.ph(this.ctx(n)) : s.ph]; }
  ctx(n) {
    const A = Object.assign({}, this.others(), this.ans);
    return { A, category: this.prof.c, prev: this.prev[n], guess: this.guess };
  }
  req(n) { return !this.prof.x && !OPTIONAL.test(n); }
  multi(n) { return /all that apply|select all|check all|choose all|multiple/i.test(this.q(n)); }
  optsRaw(n) {
    const { D } = this, c = D.A[n] || n, d = D.O[c];
    if (!d && INCOME_Q.test(n)) return incomeOptions([]).opts;
    if (!d) return n === 'sports31' ? [['Yes', 'Yes'], ['No', 'No']] : null;
    const par = D.Q[n][1]; let ks;
    if (par && D.Q[par]) { const a = this.ans[par]; ks = [''].concat(Array.isArray(a) ? a : [a]); } else ks = Object.keys(d);
    const seen = new Set(), r = [];
    ks.forEach((k) => (d[k] || []).forEach((x) => { const o = typeof x === 'string' ? [x, x] : x; if (!seen.has(o[1])) { seen.add(o[1]); r.push(o); } }));
    if (INCOME_Q.test(n)) return incomeOptions(r).opts;
    /* "Other", "None of the above" and "Prefer not to say" always sit at the end of a list (stable for the rest) */
    const tail = (l) => (OTHER.test(l) ? 1 : /^(none of (the|these)|not applicable|n\/a)\b/i.test(l) ? 2 : /^prefer not/i.test(l) ? 3 : 0);
    return r.some((x) => tail(x[0])) ? r.map((x, i) => [x, i]).sort((a, b) => tail(a[0][0]) - tail(b[0][0]) || a[1] - b[1]).map((x) => x[0]) : r;
  }
  opts(n) {   // memoised on the parent answer
    const par = this.D.Q[n][1], pk = par && this.D.Q[par] ? JSON.stringify(this.ans[par] ?? null) : '*', h = this.cache.get(n);
    if (h && h.k === pk) return h.v;
    const v = this.optsRaw(n); this.cache.set(n, { k: pk, v }); return v;
  }
  vis(n) {
    const par = this.D.Q[n][1];
    if (n === 'welcome-note') return false;
    if (par && this.D.Q[par] && !filled(this.ans[par])) return false;
    const o = this.opts(n); return !o || o.length > 0;
  }
  skip() { return false; }   // v3: nothing is skipped in edit mode — identity changes are flagged instead
  nv(i) { for (i++; i < this.flat.length; i++) if (this.vis(this.nm(i))) return i; return -1; }
  visList() { const r = []; for (let i = 0; i < this.flat.length; i++) if (this.vis(this.nm(i))) r.push(i); return r; }
  msg(r) { return r && r.code ? t('v_' + r.code, r.vars || {}) : ''; }
  result(n) {
    const v = this.ans[n];
    if (!filled(v)) return null;
    const r = validateField(n, typeof v === 'string' ? v : String(v), this.ctx(n), this.q(n));
    this.res[n] = r; return r;
  }
  /* blocking error ('' when the answer can be accepted) */
  /* true when the current answer includes an "Other"-type option */
  otherSel(n) {
    const o = this.opts(n), a = this.ans[n]; if (!o || !filled(a)) return false;
    const vals = new Set((Array.isArray(a) ? a : [a]).map(String));
    return o.some((x) => vals.has(String(x[1])) && OTHER.test(x[0]));
  }
  otherCheck(n) {
    const r = validateText(this.ans[otherKey(n)] || '', { strict: true, min: 2, max: 120 });
    if (r.level === 'block') return r.code === 'required' ? t('v_other_required') : t('v_' + r.code, r.vars || {});
    return '';
  }
  check(n) {
    const o = this.opts(n), a = this.ans[n];
    if (o) {
      if (this.raw[n] && !filled(a)) return t('v_pick');
      if (!filled(a)) return this.req(n) ? t('v_choose') : '';
      const ok = new Set(o.map((x) => String(x[1])));            // reject manipulated / unknown values
      if ((Array.isArray(a) ? a : [a]).some((x) => !ok.has(String(x)))) return t('v_enum');
      if (this.otherSel(n)) return this.otherCheck(n);
      return '';
    }
    if (!filled(a) || (typeof a === 'string' && !a.trim())) return this.req(n) ? t('v_required') : '';
    const r = this.result(n);
    return r && r.level === 'block' ? this.msg(r) : '';
  }
  /* soft / step-up notice for the current value, if not yet confirmed */
  warn(n) {
    const r = this.res[n] || this.result(n);
    if (r && r.level === 'stepup') {   // v5: no extra prompts (members consented at registration) — record the flag silently
      if (this.ack[n] !== r.code) { this.ack[n] = r.code; this.flags[n] = { code: r.code, level: r.level, value: this.ans[n], at: Date.now() }; }
      return null;
    }
    if (!r || r.level !== 'soft') return null;
    if (this.ack[n] === r.code) return null;
    return { level: r.level, code: r.code, text: this.msg(r), suggestion: r.meta && r.meta.suggestion };
  }
  confirm(n) {
    const r = this.res[n]; if (!r) return;
    this.ack[n] = r.code;
    this.flags[n] = { code: r.code, level: r.level, value: this.ans[n], at: Date.now() };
  }
  /* store the normalised value (trimmed names, E.164 phones, upper-case postcodes…) */
  normalise(n) {
    const r = this.res[n];
    if (r && r.level !== 'block' && r.norm != null && typeof this.ans[n] === 'string') this.ans[n] = r.norm;
    if (this.edit && LOCK.test(n) && this.prev[n] !== undefined && JSON.stringify(this.prev[n]) !== JSON.stringify(this.ans[n])) {
      this.flags[n] = { code: 'identity_changed', level: 'soft', from: this.prev[n], value: this.ans[n], at: Date.now() };
      if (n === 'mail' && this.ans['verify-mail'] === 'verified') this.ans['verify-mail'] = 'changed';
      if (n === 'phone' && this.ans['verify-phone'] === 'verified') this.ans['verify-phone'] = 'changed';
    }
  }
  prune() {
    this.flat.forEach(([n]) => {
      if (!this.vis(n)) { delete this.ans[n]; delete this.raw[n]; return; }
      const o = this.opts(n), a = this.ans[n]; if (!o || !filled(a)) return;
      const ok = new Set(o.map((x) => x[1]));
      if (Array.isArray(a)) this.ans[n] = a.filter((x) => ok.has(x)); else if (!ok.has(a)) delete this.ans[n];
    });
    for (const k of Object.keys(this.ans)) if (k.endsWith('-other') && this.D.Q[k.slice(0, -6)] && !this.otherSel(k.slice(0, -6))) delete this.ans[k];
  }
  payload() {
    const o = {};
    this.flat.forEach(([n]) => {
      if (!this.vis(n) || !filled(this.ans[n])) return;
      o[n] = this.ans[n];
      if (this.otherSel(n) && this.ans[otherKey(n)]) o[otherKey(n)] = String(this.ans[otherKey(n)]).trim();   // "Other — please specify" text
    });
    const r = { category: this.prof.c, profile: this.prof.s, answers: o };
    if (o['personal-income'] || o['household-income']) r.income = incomeMeta(Object.assign({}, this.others(), o));
    return r;
  }
  lab(n, v) {
    const o = this.opts(n), f = (x) => { const h = o && o.find((y) => y[1] == x); return h ? h[0] : x; };
    return Array.isArray(v) ? v.map(f).join(', ') : f(v);
  }
  progress() {
    const vs = this.visList(), done = vs.filter((i) => i < this.i || filled(this.ans[this.nm(i)])).length;
    const pct = vs.length ? Math.round(done / vs.length * 100) : 0;
    this.pct = pct;
    const fr = vs.find((i) => this.check(this.nm(i)) !== '') ?? vs[vs.length - 1];
    return { vs, done, pct, left: vs.length - done, frontier: fr };
  }
  nextLabel() {
    const n = this.cur(), base = this.one ? 'Save' : this.nv(this.i) < 0 ? (this.edit ? 'Save changes' : 'Finish') : 'Continue';
    return base === 'Continue' && !this.req(n) && !filled(this.ans[n]) ? 'Skip' : base;
  }
}
