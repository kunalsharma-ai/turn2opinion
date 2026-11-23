// Profiles vs surveys, locking and sequential unlocking (v6 rules), on the member's real profile list.
//   - "About you" profiles (config ABOUT_YOU, or the panel's first two) are PROFILES; every other
//     profile on GET /api/v1/profile is shown as a SURVEY, in the order the API returns them.
//   - Only the first unfinished About-you profile is open; the next opens when it is complete.
//   - Surveys stay locked until every About-you profile is complete, then open ONE AT A TIME.
//   - Completed items are always open (to update answers).
// Completion is the API's status (100 = complete). Started = some answers saved.
// The page calls setModel() with the current list on every render; the popups read it back.
let model = { list: [], cat: 'b2c' };

/** profile -> the item shape the v6 components use: { p: { c, s, n, q }, i, slug, kind, n, src } */
export function setModel(about, topics, cat = 'b2c') {
  const mk = (src, kind, n) => ({ p: { c: cat, s: src.slug, n: src.name, q: src.questions || 0 }, i: n, slug: src.slug, kind, n, src });
  const list = [...about.map((x) => mk(x, 'profile', 0)), ...topics.map((x) => mk(x, 'survey', 0))];
  list.forEach((x, k) => { x.i = k; x.n = k; });
  model = { list, cat };
  return list;
}
export const itemsOf = () => model.list;
export const profilesOf = () => model.list.filter((x) => x.kind === 'profile');
export const surveysOf = () => model.list.filter((x) => x.kind === 'survey');
export const itemByIndex = (i) => model.list[i] || null;

const statusOf = (x) => {
  const c = x.src.completion || 0;
  if (c >= 100) return { st: 'done', pct: 100 };
  if (x.src.started) return { st: 'prog', pct: Math.max(1, Math.min(99, c)) };
  return { st: 'new', pct: 0 };
};

/** st: 'done' | 'prog' | 'open' | 'locked'; why (locked): { type: 'about' | 'prev', need: item } */
export function stateOf() {
  const list = model.list, out = new Map();
  let aboutDone = true, firstOpenAbout = null;
  for (const x of list.filter((y) => y.kind === 'profile')) {
    const s = statusOf(x);
    if (s.st === 'done') { out.set(x.i, s); continue; }
    aboutDone = false;
    if (!firstOpenAbout) { firstOpenAbout = x; out.set(x.i, { st: s.st === 'prog' ? 'prog' : 'open', pct: s.pct }); }
    else out.set(x.i, { st: 'locked', pct: 0, why: { type: 'about', need: firstOpenAbout } });
  }
  let prevOpen = null;
  for (const x of list.filter((y) => y.kind === 'survey')) {
    const s = statusOf(x);
    if (s.st === 'done') { out.set(x.i, s); continue; }
    if (!aboutDone) { out.set(x.i, { st: 'locked', pct: 0, why: { type: 'about', need: firstOpenAbout } }); continue; }
    if (!prevOpen) { prevOpen = x; out.set(x.i, { st: s.st === 'prog' ? 'prog' : 'open', pct: s.pct }); }
    else out.set(x.i, { st: 'locked', pct: 0, why: { type: 'prev', need: prevOpen } });
  }
  return { map: out, aboutDone, nextAbout: firstOpenAbout, nextSurvey: prevOpen };
}
export function canOpen(i) {
  const st = stateOf().map.get(i);
  return !!st && st.st !== 'locked';
}
export function nextItem() {
  const S = stateOf();
  return S.nextAbout || S.nextSurvey || null;
}
