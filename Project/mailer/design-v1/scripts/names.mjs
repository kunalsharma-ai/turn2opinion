/**
 * Issue #49: member names in Title Case in every email, without changing what is stored. Each name merge field
 * ({{ user.name.first }}, {{ user.parent.name.first }}, {{ user.fullName }} and the flat {{ user.name }} of the
 * ticket emails, with or without `| default: "..."`) becomes a small Liquid loop: lower-case the name, split on
 * spaces, capitalise each word. "aSHA  verma" prints "Asha Verma". An empty name prints the default (e.g. "there").
 * Plain Liquid tags only (assign, split, for, capitalize), so any Liquid engine renders it.
 */
const FIELDS = ['user.name.first', 'user.parent.name.first', 'user.fullName', 'user.name'];
const RE = new RegExp(
  String.raw`\{\{-?\s*(${FIELDS.map((f) => f.replace(/\./g, '\\.')).join('|')})\s*(?:\|\s*default:\s*(?:"([^"]*)"|'([^']*)'))?\s*-?\}\}`,
  'g',
);

export function titleCaseName(field, fallback = '') {
  // Split on spaces, drop empty pieces (double spaces), capitalise each word.
  return `{% assign _nw = ${field} | default: "" | strip | downcase | split: " " %}{% assign _no = "" %}` +
    `{% for _w in _nw %}{% if _w != "" %}{% assign _nc = _w | capitalize %}` +
    `{% if _no == "" %}{% assign _no = _nc %}{% else %}{% assign _no = _no | append: " " | append: _nc %}{% endif %}` +
    `{% endif %}{% endfor %}{% if _no != "" %}{{ _no }}{% else %}${fallback}{% endif %}`;
}

export function titleCaseNames(src) {
  return src.replace(RE, (_, field, d1, d2) => titleCaseName(field, d1 ?? d2 ?? ''));
}
