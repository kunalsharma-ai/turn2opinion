/**
 * Dual-output plumbing.
 *
 * Every mailer component is written once and rendered twice:
 *   mode 'html'   -> sample data baked in, used by the preview file
 *   mode 'liquid' -> Liquid output/branching tags, used by the ESP
 *
 * React escapes `<`, `>`, `&` and `"` in text nodes, which would mangle a tag like
 * {% if member.points > 0 %}. It never touches `{`, `%` or `}`, so we emit the tags
 * normally and `unescapeLiquid()` (run once on the final string in build.mjs) repairs
 * the entities *inside* {{ ... }} and {% ... %} spans only — markup outside stays escaped.
 */

let MODE = 'html';

export const setMode = (m) => { MODE = m; };
export const getMode = () => MODE;
export const isLiquid = () => MODE === 'liquid';

/**
 * A merge field. In liquid mode emits `{{ expr }}`, in html mode the sample value.
 * @param {string} expr    Liquid expression, e.g. `member.first_name | default: "there"`
 * @param {*}      sample  what the preview should show
 */
export const v = (expr, sample) => (MODE === 'liquid' ? `{{ ${expr} }}` : String(sample ?? ''));

/** A bare Liquid tag, e.g. L('if member.points > 0') -> `{% if member.points > 0 %}`. */
export const L = (tag) => (MODE === 'liquid' ? `{% ${tag} %}` : '');

/**
 * Conditional block. Renders children in html mode only when `show`; in liquid mode
 * always renders them, wrapped in {% if cond %} … {% endif %}.
 */
export const ifBlock = (cond, show, children) => {
  if (MODE !== 'liquid') return show ? children : null;
  return [L(`if ${cond}`), children, L('endif')];
};

/**
 * Pick the Liquid or the sample variant of a `meta` field (subject, preheader).
 * Called at render time, not module load, so it sees the mode the build just set.
 */
export const pick = (meta, field) =>
  (MODE === 'liquid' ? meta[field] : (meta[`${field}Sample`] ?? meta[field]));

/**
 * The template's subject line. `i` selects one of the three alternatives; index 0 is
 * the primary and the one baked into <title> and the preview.
 */
export const subject = (meta, i = 0) =>
  (MODE === 'liquid'
    ? meta.subjects[i]
    : (meta.subjectsSample?.[i] ?? meta.subjects[i]));

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" };

/** Repair entity escaping inside Liquid tags, leaving the rest of the markup alone. */
export function unescapeLiquid(html) {
  return html.replace(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g, (tag) =>
    tag.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;/g, (e) => ENT[e]));
}
