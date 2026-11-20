// PREVIEW-ONLY stand-in for the API. Used only when VITE_DEMO_MODE=true (the single-file design
// preview, which has no server). It lets reviewers click through sign-up, the Teen request, the
// parent's consent form and Teen activation. Production builds never call it.
const KEY = 't2o_demo_signup';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const read = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
};
const save = (v) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    /* ignore */
  }
};
const ok = (data = [], message = '') => ({ status: 'success', message, data });
const err = (message) => ({ status: 'error', message });

const SAMPLE_TEEN = {
  _id: 'demo-teen',
  category: 'minor',
  name: { first: 'Riya', last: 'Shah' },
  mail: 'riya@example.com',
  dob: '2011-03-14',
  gender: 'Female',
  parent: { relation: 'mother', name: { first: 'Meera', last: 'Shah' }, email: 'meera@example.com', phone: '919900011122', dob: '1982-06-02', consentStatus: 'pending' }
};
const OPTIONS = {
  empstat: ['Employed full-time', 'Employed part-time', 'Self-employed'],
  industry: ['Information technology', 'Healthcare', 'Finance & banking', 'Retail'],
  sector: ['Software', 'Cloud & infrastructure', 'Cyber security'],
  department: ['Engineering', 'IT operations', 'Product'],
  jobrole: ['Software engineer', 'Engineering manager', 'CTO']
};

export async function demoRespond(method, endpoint, body = {}) {
  await wait(450);
  const path = endpoint.split('?')[0];
  const st = read();
  if (path === '/api/v1/me') return err('Unauthorized [No Token Found]');
  if (path === '/api/v1/user/captcha') return err('Preview: the code is drawn in the browser');
  if (path === '/api/v1/get-country') return { country: 'IN' };
  if (path === '/api/v1/user/check') return ok(0);
  if (path === '/api/v1/validator/email') return { valid: true };
  if (path === '/api/v1/category') return ok([]);
  if (path.startsWith('/api/v1/option/')) return ok((OPTIONS[path.split('/').pop()] || []).map((label) => ({ label })));
  if (path === '/api/v1/user/parent-consent-resend') return ok([], 'If a Teen request is waiting, we have emailed the form again.');
  if (path === '/api/v1/user/resend') return ok([], 'Preview: no email was sent.');
  if (path === '/api/v1/user/login' && method === 'POST') {
    if (/teen|riya/i.test(body.mail || '') && st.consent !== 'approved')
      return err('Your parent or guardian hasn’t approved your Teen account yet. We’ve emailed them the onboarding form.');
    return { ...ok([], 'Login successful'), demo: true };
  }
  if (path === '/api/v1/user' && method === 'PUT') {
    const teen = !!(body.parent && body.parent.email);
    save({ user: { ...body, _id: teen ? 'demo-teen' : 'demo-adult', parent: teen ? { ...body.parent, consentStatus: 'pending' } : undefined }, consent: teen ? 'pending' : null });
    return teen ? ok({ user: 'demo-teen', registrationStatus: 'parent-verification-pending' }) : ok({ user: 'demo-adult', registrationStatus: 'email-verification-pending' });
  }
  if (path === '/api/v1/user' && method === 'PATCH') return ok([], 'Your password is created.');
  if (path.startsWith('/api/v1/user/parent-consent/') && method === 'PUT') {
    save({ ...st, consent: 'approved' });
    return ok({ registrationStatus: 'account-activation-pending' });
  }
  const verify = path.match(/^\/api\/v1\/user\/([\w-]+)$/);
  if (verify && method === 'POST') {
    const u = st.user && st.user._id === verify[1] ? st.user : (verify[1] === 'demo-teen' ? SAMPLE_TEEN : { _id: 'demo-adult', category: 'b2c', name: { first: 'Asha' }, mail: 'asha@example.com', dob: '1994-05-10', gender: 'Female' });
    const approved = st.consent === 'approved' || new URLSearchParams(window.location.search).get('activate') === '1';
    const parent = u.parent ? { ...u.parent, consent: approved ? true : null, consentStatus: approved ? 'approved' : 'pending' } : undefined;
    return ok({ ...u, parent, isMinor: u.category === 'minor' });
  }
  if (verify && method === 'PUT') return ok(st.user || {});
  if (path === '/api/v1/me/answer') return ok([], 'Updated successfully');
  return err('Preview mode: no server');
}
