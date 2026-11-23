/**
 * Turn2Opinion email components — "the conversation" system.
 *
 * Every structural rule is inlined on the element; the <style> block in Frame only
 * adds refinements (mobile stacking, hover, a gentle hero float in Apple Mail).
 * Outlook on Windows gets solid colours, square corners and a VML pill button;
 * everything still reads, because no information lives in a gradient or an image.
 */
import React from 'react';
import { BRAND, BTN, C, FONT, HERO, ICO, LOGO, PAD, SOC, STAGE, UI, W } from '../lib/theme.js';
import { isLiquid } from '../lib/liquid.js';

/* ── low-level helpers ───────────────────────────────────────────────────── */

/** Inject raw markup (VML, conditional comments). The carrier tag is stripped at build. */
export const Raw = ({ html }) => <t2o-raw dangerouslySetInnerHTML={{ __html: html }} />;

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
/** Escape for raw HTML, leaving Liquid tags untouched. */
export const esc = (s) => String(s).split(/(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})/g)
  .map((p, i) => (i % 2 ? p : p.replace(/[&<>"]/g, (c) => ESC[c]))).join('');

/** A Liquid if/else inside an attribute or text; the sample branch in html mode. */
export const cond = (liquidCond, sample, a, b) =>
  (isLiquid() ? `{% if ${liquidCond} %}${a}{% else %}${b}{% endif %}` : (sample ? a : b));

const T = (props) => <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0" {...props} />;

/** One full-width row of the 600px column, with the standard gutter. */
export const Row = ({ children, py = 16, px = PAD, align, className = '' }) => (
  <tr>
    <td className={`px ${className}`} align={align} style={{ padding: `${py}px ${px}px`, textAlign: align }}>
      {children}
    </td>
  </tr>
);

export const Sp = ({ h = 16 }) => (
  <div style={{ height: `${h}px`, lineHeight: `${h}px`, fontSize: '1px' }}>&nbsp;</div>
);

export const Name = ({ children }) => <strong style={{ fontWeight: 800, color: C.ink }}>{children}</strong>;

export const P = ({ children, size = 15.5, color = C.text, mb = 14, align, weight = 400 }) => (
  <p className="keep-text" style={{
    margin: `0 0 ${mb}px`, fontFamily: FONT.body, fontSize: `${size}px`, lineHeight: 1.65,
    color, textAlign: align, fontWeight: weight,
  }}>{children}</p>
);

export const H2 = ({ children, size = 20, mb = 10, color = C.ink, align }) => (
  <h2 className="h2 keep-ink" style={{
    margin: `0 0 ${mb}px`, fontFamily: FONT.display, fontSize: `${size}px`, lineHeight: 1.3,
    fontWeight: 800, color, letterSpacing: '-0.01em', textAlign: align,
  }}>{children}</h2>
);

export const A = ({ href, children, color = C.blue }) => (
  <a href={href} style={{ color, fontWeight: 600, textDecoration: 'underline' }}>{children}</a>
);

/** Thin rule. */
export const Rule = () => (
  <Row py={6}>
    <T><tbody><tr><td height="1" style={{ fontSize: '1px', lineHeight: '1px', borderTop: `1px solid ${C.line}` }}>&nbsp;</td></tr></tbody></T>
  </Row>
);

/** Icon tile image (assets/icons/<name>.png, 44px display). */
export const Tile = ({ name, size = 44, alt = '' }) => (
  <img src={`${ICO}/${name}.png`} width={size} height={size} alt={alt}
       style={{ display: 'block', border: 0, width: `${size}px`, height: `${size}px` }} />
);

/* ── 1. THE STAGE ─────────────────────────────────────────────────────────── */

/**
 * The purpose of the email, before anything else: a speech-bubble eyebrow, the reason
 * in white, one sentence of consequence, the hero scene, and the deciding facts.
 */
export function Stage({ tone = 'blue', eyebrow = 'Why you’re getting this', title, sub, hero, alt, facts = [] }) {
  const s = STAGE[tone];
  return (
    <tr>
      <td className="stage-out" style={{ padding: '6px 24px 0' }}>
        <T bgcolor={s.base} className="stage" style={{
          backgroundColor: s.base, backgroundImage: s.grad, borderRadius: '28px',
        }}>
          <tbody>
            <tr>
              <td style={{ padding: '0' }}>
                {/* dir=rtl puts the art first in source order, so phones stack art on top */}
                <T dir="rtl">
                  <tbody>
                    <tr>
                      <td dir="ltr" width="214" valign="bottom" className="stack art-cell" align="center"
                          style={{ padding: '22px 18px 8px 0', width: '214px' }}>
                        <img className="art float" src={`${HERO}/${hero}.png`} width="196" height="196" alt={alt}
                             style={{ display: 'block', border: 0, width: '196px', height: '196px', margin: '0 auto' }} />
                      </td>
                      <td dir="ltr" valign="middle" className="stack stage-text"
                          style={{ padding: '30px 6px 10px 30px', textAlign: 'left' }}>
                        <table role="presentation" border="0" cellPadding="0" cellSpacing="0" style={{ margin: '0 0 14px' }}>
                          <tbody><tr>
                            <td bgcolor="#FFFFFF" style={{
                              backgroundColor: '#FFFFFF', borderRadius: '14px 14px 14px 4px', padding: '6px 12px',
                              fontFamily: FONT.body, fontSize: '11px', fontWeight: 700, letterSpacing: '.08em',
                              textTransform: 'uppercase', color: s.eyebrowInk, whiteSpace: 'nowrap',
                            }}>{eyebrow}</td>
                          </tr></tbody>
                        </table>
                        <h1 className="h1" style={{
                          margin: '0 0 12px', fontFamily: FONT.display, fontSize: '27px', lineHeight: 1.18,
                          fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em',
                        }}>{title}</h1>
                        {sub && (
                          <p className="stage-sub" style={{
                            margin: 0, fontFamily: FONT.body, fontSize: '15px', lineHeight: 1.6, color: '#E9EFFF',
                          }}>{sub}</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </T>
              </td>
            </tr>
            {facts.length > 0 && (
              <tr>
                <td className="facts-pad" style={{ padding: '10px 22px 24px 24px' }}>
                  <table role="presentation" border="0" cellPadding="0" cellSpacing="0">
                    <tbody><tr>
                      {facts.map((f, i) => (
                        <td key={i} className="fact-cell" style={{ padding: '0 8px 0 0' }}>
                          <table role="presentation" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
                            <td style={{
                              backgroundColor: s.pill, border: `1px solid ${s.pillLine}`, borderRadius: '999px',
                              padding: '7px 13px', fontFamily: FONT.body, fontSize: '12.5px', fontWeight: 600,
                              color: '#FFFFFF', whiteSpace: 'nowrap',
                            }}>
                              <span style={{ color: f.dot || '#FFD872' }}>&#9679;</span>&nbsp; {f.text}
                            </td>
                          </tr></tbody></table>
                        </td>
                      ))}
                    </tr></tbody>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </T>
      </td>
    </tr>
  );
}

/* ── greeting ─────────────────────────────────────────────────────────────── */

export const Hello = ({ hi = 'Hi', name, children, py = 26 }) => (
  <Row py={py}>
    <p className="hello keep-ink" style={{
      margin: '0 0 10px', fontFamily: FONT.display, fontSize: '22px', fontWeight: 800, color: C.ink, lineHeight: 1.3,
    }}>{hi} <span style={{ color: C.blue }}>{name}</span>,</p>
    {children}
  </Row>
);

export const Lead = ({ children, mb = 0 }) => <P size={16.5} color={C.ink2} mb={mb}>{children}</P>;

/* ── 3. THE JOURNEY ───────────────────────────────────────────────────────── */

const NODE_CHIP = {
  done: { text: 'Done', bg: C.tMint, ink: C.mintD },
  now: { text: 'You are here', bg: C.tBlue, ink: C.blueD },
  next: { text: 'Next', bg: C.mist, ink: C.muted },
  warn: { text: 'Open', bg: C.tCoral, ink: C.coralD },
};

/**
 * Where things stand, as a track: green nodes done, a blue ring for now, a coral
 * node for anything blocking, dashed rings for what follows. Chips repeat the state
 * in words so it reads with images off.
 */
export function Journey({ label = 'Where things stand', steps, note }) {
  return (
    <Row py={10}>
      <T bgcolor={C.mist} style={{ backgroundColor: C.mist, borderRadius: '22px', border: `1px solid ${C.mist2}` }}>
        <tbody>
          <tr><td style={{ padding: '20px 24px 6px' }}>
            <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '11.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>{label}</p>
          </td></tr>
          <tr><td style={{ padding: '10px 24px 8px' }}>
            <T><tbody>
              {steps.map((st, i) => {
                const last = i === steps.length - 1;
                const chip = NODE_CHIP[st.state] || NODE_CHIP.next;
                const lineColor = st.state === 'done' ? '#7FDCC0' : C.lineStrong;
                return (
                  <tr key={i}>
                    <td width="30" valign="top" style={{ width: '30px', padding: 0 }}>
                      <img src={`${UI}/node-${st.state}.png`} width="28" height="28" alt=""
                           style={{ display: 'block', border: 0, width: '28px', height: '28px' }} />
                      {!last && (
                        <table role="presentation" border="0" cellPadding="0" cellSpacing="0" align="center" style={{ margin: '0 auto' }}>
                          <tbody><tr><td width="2" height="26" bgcolor={lineColor}
                            style={{ width: '2px', height: '26px', backgroundColor: lineColor, fontSize: '1px', lineHeight: '1px' }}>&nbsp;</td></tr></tbody>
                        </table>
                      )}
                    </td>
                    <td valign="top" style={{ padding: '3px 0 14px 14px' }}>
                      <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '15px', lineHeight: 1.5, color: C.ink, fontWeight: st.state === 'now' || st.state === 'warn' ? 700 : 500 }}>
                        {st.label}
                      </p>
                      {st.note && <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '13.5px', lineHeight: 1.5, color: C.muted }}>{st.note}</p>}
                    </td>
                    <td width="96" valign="top" align="right" className="hide-sm" style={{ width: '96px', padding: '3px 0 0' }}>
                      <span style={{
                        display: 'inline-block', backgroundColor: chip.bg, color: chip.ink, borderRadius: '999px',
                        padding: '3px 10px', fontFamily: FONT.body, fontSize: '11.5px', fontWeight: 700, whiteSpace: 'nowrap',
                      }}>{st.chip || chip.text}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody></T>
          </td></tr>
          {note && (
            <tr><td style={{ padding: '0 24px 20px' }}>
              <T><tbody><tr><td style={{ borderTop: `1px dashed ${C.lineStrong}`, padding: '14px 0 0' }}>
                <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '14.5px', lineHeight: 1.55, color: C.blueD, fontWeight: 700 }}>{note}</p>
              </td></tr></tbody></T>
            </td></tr>
          )}
        </tbody>
      </T>
    </Row>
  );
}

/* ── 4. THE ASK ───────────────────────────────────────────────────────────── */

/** Pill button: website gradient, VML pill for Outlook, 52px tall. */
export function Button({ href, label, width = 300, ghost = false }) {
  const h = 52;
  const bg = ghost ? '#FFFFFF' : BTN.base;
  const ink = ghost ? C.blue : '#FFFFFF';
  const border = ghost ? `2px solid ${C.lBlue}` : '0';
  const html = `<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${esc(href)}" style="height:${h}px;v-text-anchor:middle;width:${width}px;" arcsize="50%" ${ghost ? `strokecolor="${C.lBlue}" strokeweight="2px"` : 'stroke="f"'} fillcolor="${bg}"><w:anchorlock/><center style="color:${ink};font-family:'Segoe UI',Arial,sans-serif;font-size:16px;font-weight:bold;">${esc(label)} &rarr;</center></v:roundrect><![endif]--><!--[if !mso]><!-- --><a href="${esc(href)}" class="${ghost ? 'btn-ghost' : 'btn'}" style="display:inline-block;box-sizing:border-box;min-width:${width}px;max-width:100%;background-color:${bg};${ghost ? '' : `background-image:${BTN.grad};`}border:${border};border-radius:999px;color:${ink};font-family:${FONT.body.replace(/'/g, '&#39;')};font-size:16px;font-weight:600;line-height:${h}px;text-align:center;text-decoration:none;padding:0 30px;mso-hide:all;">${esc(label)}&nbsp;&nbsp;&rarr;</a><!--<![endif]-->`;
  return <Raw html={html} />;
}

/**
 * The call to action: the button, how long the link lasts, and — for token links —
 * the URL as selectable text, because some corporate gateways rewrite <a href>.
 */
export function Cta({ href, label, expiry, showLink = false, note, secondary, py = 18 }) {
  return (
    <Row py={py} align="center">
      <Button href={href} label={label} />
      {secondary && (<><Sp h={12} /><Button href={secondary.href} label={secondary.label} width={240} ghost /></>)}
      {expiry && (
        <table role="presentation" border="0" cellPadding="0" cellSpacing="0" align="center" style={{ margin: '14px auto 0' }}>
          <tbody><tr>
            <td style={{ padding: '0 6px 0 0' }} valign="middle">
              <img src={`${UI}/clock-ico.png`} width="16" height="16" alt="" style={{ display: 'block', border: 0, width: '16px', height: '16px' }} />
            </td>
            <td valign="middle" style={{ fontFamily: FONT.body, fontSize: '13.5px', color: C.muted, fontWeight: 500 }}>{expiry}</td>
          </tr></tbody>
        </table>
      )}
      {note && <P size={13.5} color={C.muted} mb={0} align="center"><span style={{ display: 'block', paddingTop: '8px' }}>{note}</span></P>}
      {showLink && (
        <T style={{ margin: '18px 0 0' }}>
          <tbody><tr><td style={{
            border: `1.5px dashed ${C.lBlue}`, borderRadius: '16px', backgroundColor: C.tBlue, padding: '12px 16px', textAlign: 'left',
          }}>
            <p style={{ margin: '0 0 4px', fontFamily: FONT.body, fontSize: '12px', fontWeight: 700, color: C.blueD, letterSpacing: '.04em' }}>
              BUTTON NOT WORKING? COPY THIS LINK
            </p>
            <p style={{ margin: 0, fontFamily: FONT.mono, fontSize: '12px', lineHeight: 1.55, color: C.ink2, wordBreak: 'break-all' }}>
              <a href={href} style={{ color: C.ink2, textDecoration: 'none' }}>{href}</a>
            </p>
          </td></tr></tbody>
        </T>
      )}
    </Row>
  );
}

/* ── 5. Q&A SECTIONS ──────────────────────────────────────────────────────── */

/** A section headed by the member's own question, in a navy speech bubble. */
let ASK_N = 0;
export function Ask({ q, children, py = 18, kicker = 'You might be wondering' }) {
  const n = ++ASK_N;
  return (
    <Row py={py}>
      <p style={{ margin: '0 0 8px', fontFamily: FONT.body, fontSize: '11.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: C.violet }}>Q{n} &middot; {kicker}</p>
      <table role="presentation" border="0" cellPadding="0" cellSpacing="0" style={{ margin: '0 0 16px' }}>
        <tbody><tr>
          <td bgcolor={C.ink} className="ask" style={{
            backgroundColor: C.ink, borderRadius: '20px 20px 20px 6px', padding: '13px 20px',
            fontFamily: FONT.display, fontSize: '18px', lineHeight: 1.35, fontWeight: 800, color: '#FFFFFF',
          }}>{q}</td>
        </tr></tbody>
      </table>
      {children}
    </Row>
  );
}

const TINTS = {
  blue: [C.tBlue, C.lBlue], violet: [C.tViolet, C.lViolet], mint: [C.tMint, C.lMint],
  gold: [C.tGold, C.lGold], coral: [C.tCoral, C.lCoral], mist: [C.mist, C.mist2],
};

/** Two-up answer cards (stack on phones). */
export function Cards({ items }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return (
    <T><tbody>
      {rows.map((r, ri) => (
        <tr key={ri}>
          {r.map((it, i) => {
            const [bg, ln] = TINTS[it.tint || 'mist'];
            return (
              <td key={i} width="50%" valign="top" className="stack card-col"
                  style={{ width: '50%', padding: `0 ${i === 0 ? 6 : 0}px 12px ${i === 1 ? 6 : 0}px` }}>
                <T bgcolor={bg} style={{ backgroundColor: bg, border: `1px solid ${ln}`, borderRadius: '20px' }}>
                  <tbody><tr><td style={{ padding: '18px 18px 16px' }}>
                    <Tile name={it.icon} />
                    <p style={{ margin: '12px 0 4px', fontFamily: FONT.display, fontSize: '16px', fontWeight: 800, color: C.ink, lineHeight: 1.3 }}>{it.title}</p>
                    <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '14px', lineHeight: 1.55, color: C.muted }}>{it.text}</p>
                  </td></tr></tbody>
                </T>
              </td>
            );
          })}
          {r.length === 1 && <td width="50%" className="hide-sm" style={{ width: '50%' }}>&nbsp;</td>}
        </tr>
      ))}
    </tbody></T>
  );
}

/** Answer rows: icon tile · title + text · optional right-hand pill. */
export function Rows({ items }) {
  return (
    <T><tbody>
      {items.map((it, i) => (
        <tr key={i}>
          <td width="56" valign="top" style={{ width: '56px', padding: '12px 0', borderTop: i ? `1px solid ${C.line}` : '0' }}>
            <Tile name={it.icon} size={40} />
          </td>
          <td valign="top" style={{ padding: '12px 10px 12px 0', borderTop: i ? `1px solid ${C.line}` : '0' }}>
            <p style={{ margin: '0 0 2px', fontFamily: FONT.display, fontSize: '15.5px', fontWeight: 800, color: C.ink, lineHeight: 1.35 }}>
              {it.title}
              {it.tag && <span style={{ fontFamily: FONT.body, fontSize: '11px', fontWeight: 700, color: C.violet, letterSpacing: '.06em', textTransform: 'uppercase' }}>&nbsp;&nbsp;{it.tag}</span>}
            </p>
            <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '14px', lineHeight: 1.55, color: C.muted }}>{it.text}</p>
          </td>
          {it.meta !== undefined && (
            <td width="70" valign="top" align="right" style={{ width: '70px', padding: '14px 0 12px', borderTop: i ? `1px solid ${C.line}` : '0' }}>
              <span style={{
                display: 'inline-block', backgroundColor: it.metaBg || C.tGold, color: it.metaInk || C.goldText, borderRadius: '999px',
                padding: '4px 10px', fontFamily: FONT.display, fontSize: '13px', fontWeight: 800, whiteSpace: 'nowrap',
              }}>{it.meta}</span>
            </td>
          )}
        </tr>
      ))}
    </tbody></T>
  );
}

/** Numbered next steps (1 · 2 · 3) as gradient-number rows. */
export function Steps({ items }) {
  return (
    <T><tbody>
      {items.map((it, i) => (
        <tr key={i}>
          <td width="44" valign="top" style={{ width: '44px', padding: '0 0 14px' }}>
            <table role="presentation" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
              <td width="32" height="32" align="center" bgcolor={C.blue} style={{
                width: '32px', height: '32px', borderRadius: '11px', backgroundColor: C.blue,
                backgroundImage: 'linear-gradient(135deg,#49B6FF,#1F5BFF)',
                fontFamily: FONT.display, fontSize: '15px', fontWeight: 800, color: '#FFFFFF', textAlign: 'center', lineHeight: '32px',
              }}>{i + 1}</td>
            </tr></tbody></table>
          </td>
          <td valign="top" style={{ padding: '4px 0 14px' }}>
            <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '15.5px', lineHeight: 1.5, color: C.ink, fontWeight: 600 }}>{it.title}</p>
            {it.text && <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '14px', lineHeight: 1.55, color: C.muted }}>{it.text}</p>}
          </td>
        </tr>
      ))}
    </tbody></T>
  );
}

/** Check-list with mint ticks (or coral dots for "not"). */
export function Checks({ items, tone = 'mint' }) {
  const col = tone === 'violet' ? C.violet : tone === 'blue' ? C.blue : C.ok;
  return (
    <T><tbody>
      {items.map((it, i) => (
        <tr key={i}>
          <td width="28" valign="top" style={{ width: '28px', padding: '2px 0 10px' }}>
            <span style={{
              display: 'inline-block', width: '20px', height: '20px', lineHeight: '20px', borderRadius: '50%',
              backgroundColor: col, color: '#FFFFFF', fontFamily: FONT.body, fontSize: '12px', fontWeight: 800, textAlign: 'center',
            }}>&#10003;</span>
          </td>
          <td valign="top" style={{ padding: '0 0 10px 6px', fontFamily: FONT.body, fontSize: '15px', lineHeight: 1.55, color: C.text }}>{it}</td>
        </tr>
      ))}
    </tbody></T>
  );
}

/* ── record card ──────────────────────────────────────────────────────────── */

/** Key/value "receipt" with a gradient top edge. */
export function Facts({ title, rows, py = 12 }) {
  return (
    <Row py={py}>
      <T style={{ border: `1px solid ${C.line}`, borderRadius: '20px', backgroundColor: '#FFFFFF' }} bgcolor="#FFFFFF">
        <tbody>
          <tr><td height="5" bgcolor={C.blue} style={{
            height: '5px', fontSize: '1px', lineHeight: '1px', backgroundColor: C.blue,
            backgroundImage: 'linear-gradient(90deg,#1F5BFF,#49B6FF,#7B5CFF)', borderRadius: '20px 20px 0 0',
          }}>&nbsp;</td></tr>
          <tr><td style={{ padding: '16px 22px 4px' }}>
            <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '11.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>{title}</p>
          </td></tr>
          <tr><td style={{ padding: '6px 22px 14px' }}>
            <T><tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td width="40%" valign="top" className="kv-k" style={{
                    width: '40%', padding: '10px 10px 10px 0', borderTop: i ? `1px dashed ${C.line}` : '0',
                    fontFamily: FONT.body, fontSize: '14px', color: C.muted,
                  }}>{r.k}</td>
                  <td valign="top" className="kv-v" style={{
                    padding: '10px 0', borderTop: i ? `1px dashed ${C.line}` : '0',
                    fontFamily: FONT.display, fontSize: '15px', fontWeight: 700, color: r.color || C.ink, wordBreak: 'break-word',
                  }}>{r.v}</td>
                </tr>
              ))}
            </tbody></T>
          </td></tr>
        </tbody>
      </T>
    </Row>
  );
}

/* ── callout ──────────────────────────────────────────────────────────────── */

export function Note({ icon = 'shield-blue', tint = 'blue', title, children, py = 12 }) {
  const [bg, ln] = TINTS[tint];
  return (
    <Row py={py}>
      <T bgcolor={bg} style={{ backgroundColor: bg, border: `1px solid ${ln}`, borderRadius: '20px' }}>
        <tbody><tr>
          <td width="62" valign="top" style={{ width: '62px', padding: '18px 0 18px 18px' }}><Tile name={icon} size={40} /></td>
          <td valign="top" style={{ padding: '18px 20px 18px 12px' }}>
            {title && <p style={{ margin: '0 0 4px', fontFamily: FONT.display, fontSize: '16px', fontWeight: 800, color: C.ink }}>{title}</p>}
            <div style={{ fontFamily: FONT.body, fontSize: '14.5px', lineHeight: 1.6, color: C.ink2 }}>{children}</div>
          </td>
        </tr></tbody>
      </T>
    </Row>
  );
}

/* ── stat tiles ───────────────────────────────────────────────────────────── */

export function Stats({ items, py = 12 }) {
  return (
    <Row py={py}>
      <T><tbody><tr>
        {items.map((it, i) => {
          const [bg, ln] = TINTS[it.tint || 'blue'];
          return (
            <td key={i} width={`${Math.floor(100 / items.length)}%`} valign="top" className="stat-col"
                style={{ padding: `0 ${i < items.length - 1 ? 8 : 0}px 0 0` }}>
              <T bgcolor={bg} style={{ backgroundColor: bg, border: `1px solid ${ln}`, borderRadius: '20px' }}>
                <tbody><tr><td align="center" style={{ padding: '16px 8px 14px', textAlign: 'center' }}>
                  {it.img && <img src={`${UI}/${it.img}.png`} width="28" height="28" alt="" style={{ display: 'block', margin: '0 auto 6px', border: 0, width: '28px', height: '28px' }} />}
                  <p className="figure" style={{ margin: 0, fontFamily: FONT.display, fontSize: '26px', fontWeight: 800, color: it.color || C.ink, lineHeight: 1.1 }}>{it.value}</p>
                  <p style={{ margin: '6px 0 0', fontFamily: FONT.body, fontSize: '12px', fontWeight: 600, color: C.muted, lineHeight: 1.35 }}>{it.label}</p>
                </td></tr></tbody>
              </T>
            </td>
          );
        })}
      </tr></tbody></T>
    </Row>
  );
}

/* ── the Opinion Kingdom (profiles) ───────────────────────────────────────── */

/**
 * The eight kingdom levels from the Profiles & Surveys dashboard, two rows of four.
 * In Liquid each cell decides its own state from profile.completed_count, so the
 * track is correct for every member with no extra backend field.
 */
export function KingdomTrack({ levels, n, liquidN = 't2o_n', title = 'Your Opinion Kingdom' }) {
  const rows = [levels.slice(0, 4), levels.slice(4)];
  return (
    <Row py={10}>
      <T bgcolor="#FFFFFF" style={{ border: `1px solid ${C.line}`, borderRadius: '22px', backgroundColor: '#FFFFFF' }}>
        <tbody>
          <tr><td style={{ padding: '18px 20px 6px' }}>
            {isLiquid() && <Raw html={`{% assign ${liquidN} = profile.completed_count | default: 0 %}`} />}
            <T><tbody><tr>
              <td width="52" valign="middle" style={{ width: '52px' }}>
                <img src={`${UI}/castle.png`} width="44" height="44" alt="" style={{ display: 'block', border: 0, width: '44px', height: '44px' }} />
              </td>
              <td valign="middle">
                <p style={{ margin: 0, fontFamily: FONT.display, fontSize: '17px', fontWeight: 800, color: C.ink }}>{title}</p>
                <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '13px', color: C.muted }}>Every profile and survey you finish raises a building: +50 points, +1 quality score.</p>
              </td>
            </tr></tbody></T>
          </td></tr>
          <tr><td style={{ padding: '8px 14px 16px' }}>
            <T><tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((l, i) => {
                    const idx = ri * 4 + i;
                    const nextAt = idx < levels.length - 1 ? levels[idx + 1].at : 9999;
                    const cur = `${liquidN} >= ${l.at} and ${liquidN} < ${nextAt}`;
                    const passed = `${liquidN} >= ${nextAt}`;
                    const isCur = n >= l.at && n < nextAt, isPassed = n >= nextAt;
                    const bg = isLiquid()
                      ? `{% if ${cur} %}${C.blue}{% elsif ${passed} %}${C.tMint}{% else %}${C.mist}{% endif %}`
                      : (isCur ? C.blue : isPassed ? C.tMint : C.mist);
                    const ink = isLiquid()
                      ? `{% if ${cur} %}#FFFFFF{% elsif ${passed} %}${C.mintD}{% else %}${C.muted}{% endif %}`
                      : (isCur ? '#FFFFFF' : isPassed ? C.mintD : C.muted);
                    const sub = isLiquid()
                      ? `{% if ${cur} %}You are here{% elsif ${passed} %}Built{% else %}${l.at} item${l.at === 1 ? '' : 's'}{% endif %}`
                      : (isCur ? 'You are here' : isPassed ? 'Built' : `${l.at} item${l.at === 1 ? '' : 's'}`);
                    return (
                      <td key={i} width="25%" valign="top" style={{ width: '25%', padding: '6px' }}>
                        <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
                          <td align="center" bgcolor={bg} style={{ backgroundColor: bg, borderRadius: '16px', padding: '10px 4px 9px', textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '22px', lineHeight: 1.1 }}>{l.e}</p>
                            <p style={{ margin: '4px 0 0', fontFamily: FONT.display, fontSize: '12.5px', fontWeight: 800, color: ink, lineHeight: 1.2 }}>{l.name}</p>
                            <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '10.5px', fontWeight: 600, color: ink, lineHeight: 1.2 }}>{sub}</p>
                          </td>
                        </tr></tbody></table>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody></T>
          </td></tr>
        </tbody>
      </T>
    </Row>
  );
}

/** Points progress bar (table cells — renders everywhere). */
export function Bar({ pct, left, right, liquidPct }) {
  const w = Math.max(3, Math.min(100, pct));
  const fill = isLiquid() && liquidPct ? `{{ ${liquidPct} }}%` : `${w}%`;
  return (
    <>
      {isLiquid() && <Raw html={'{% assign t2o_total = profile.total_count | default: 37 %}'} />}
      <T bgcolor={C.mist2} style={{ backgroundColor: C.mist2, borderRadius: '999px' }}>
        <tbody><tr>
          <td width={fill} height="12" bgcolor={C.blue} style={{
            width: fill, height: '12px', backgroundColor: C.blue, backgroundImage: 'linear-gradient(90deg,#49B6FF,#1F5BFF,#7B5CFF)',
            borderRadius: '999px', fontSize: '1px', lineHeight: '1px',
          }}>&nbsp;</td>
          <td style={{ fontSize: '1px', lineHeight: '1px' }}>&nbsp;</td>
        </tr></tbody>
      </T>
      <T style={{ marginTop: '8px' }}><tbody><tr>
        <td style={{ fontFamily: FONT.body, fontSize: '12.5px', fontWeight: 700, color: C.blueD }}>{left}</td>
        <td align="right" style={{ fontFamily: FONT.body, fontSize: '12.5px', fontWeight: 600, color: C.muted, textAlign: 'right' }}>{right}</td>
      </tr></tbody></T>
    </>
  );
}

/* ── rewards your way ─────────────────────────────────────────────────────── */

const PAYOUTS = [
  { icon: 'wallet-mint', name: 'PayPal', sub: 'Worldwide' },
  { icon: 'transfer-violet', name: 'Wire Transfer', sub: 'Worldwide' },
  { icon: 'gift-coral', name: 'Amazon Gift Card', sub: 'Where available' },
  { icon: 'phone-mint', name: 'UPI', sub: 'India only' },
];

export function Payouts({ py = 12 }) {
  return (
    <Row py={py}>
      <T bgcolor={C.tGold} style={{ backgroundColor: C.tGold, border: `1px solid ${C.lGold}`, borderRadius: '22px' }}>
        <tbody>
          <tr><td style={{ padding: '18px 20px 4px' }}>
            <p style={{ margin: 0, fontFamily: FONT.display, fontSize: '17px', fontWeight: 800, color: C.ink }}>Get rewarded your way</p>
            <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '13px', color: C.muted }}>Redeem from your dashboard once you reach the minimum shown there.</p>
          </td></tr>
          <tr><td style={{ padding: '10px 14px 16px' }}>
            <T><tbody><tr>
              {PAYOUTS.map((p, i) => (
                <td key={i} width="25%" valign="top" className="pay-col" align="center" style={{ width: '25%', padding: '4px', textAlign: 'center' }}>
                  <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
                    <td align="center" bgcolor="#FFFFFF" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '12px 4px 10px', textAlign: 'center' }}>
                      <img src={`${ICO}/${p.icon}.png`} width="34" height="34" alt="" style={{ display: 'block', margin: '0 auto 6px', border: 0, width: '34px', height: '34px' }} />
                      <p style={{ margin: 0, fontFamily: FONT.display, fontSize: '12.5px', fontWeight: 800, color: C.ink, lineHeight: 1.25 }}>{p.name}</p>
                      <p style={{ margin: '2px 0 0', fontFamily: FONT.body, fontSize: '10.5px', fontWeight: 600, color: C.muted }}>{p.sub}</p>
                    </td>
                  </tr></tbody></table>
                </td>
              ))}
            </tr></tbody></T>
          </td></tr>
        </tbody>
      </T>
    </Row>
  );
}

/* ── support message as a chat bubble ─────────────────────────────────────── */

export function ChatQuote({ who, label = 'Latest update', children }) {
  return (
    <Row py={12}>
      <T><tbody><tr>
        <td width="48" valign="bottom" style={{ width: '48px', padding: '0 8px 0 0' }}>
          <img src={`${UI}/mark.png`} width="40" height="40" alt="" style={{ display: 'block', border: 0, width: '40px', height: '40px' }} />
        </td>
        <td valign="top">
          <p style={{ margin: '0 0 6px', fontFamily: FONT.body, fontSize: '12.5px', fontWeight: 700, color: C.muted }}>
            {who} <span style={{ color: C.lineStrong }}>&middot;</span> {label}
          </p>
          <T bgcolor={C.tBlue} style={{ backgroundColor: C.tBlue, border: `1px solid ${C.lBlue}`, borderRadius: '20px 20px 20px 6px' }}>
            <tbody><tr><td style={{ padding: '16px 18px', fontFamily: FONT.body, fontSize: '15px', lineHeight: 1.65, color: C.ink }}>{children}</td></tr></tbody>
          </T>
        </td>
      </tr></tbody></T>
    </Row>
  );
}

/* ── 6. SIGN-OFF ──────────────────────────────────────────────────────────── */

export function Signoff({ line, who = 'Team Turn2Opinion' }) {
  return (
    <Row py={22}>
      <T><tbody><tr>
        <td width="52" valign="bottom" style={{ width: '52px' }}>
          <img src={`${UI}/mark.png`} width="40" height="40" alt="Turn2Opinion" style={{ display: 'block', border: 0, width: '40px', height: '40px' }} />
        </td>
        <td valign="bottom">
          <table role="presentation" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
            <td bgcolor={C.mist} style={{
              backgroundColor: C.mist, border: `1px solid ${C.mist2}`, borderRadius: '20px 20px 20px 6px', padding: '13px 18px',
            }}>
              <p style={{ margin: 0, fontFamily: FONT.display, fontSize: '16px', fontWeight: 800, color: C.ink, lineHeight: 1.4 }}>{line}</p>
              <p style={{ margin: '3px 0 0', fontFamily: FONT.body, fontSize: '13px', fontWeight: 600, color: C.blue }}>&mdash; {who}</p>
            </td>
          </tr></tbody></table>
        </td>
      </tr></tbody></T>
    </Row>
  );
}

/* ── document frame ───────────────────────────────────────────────────────── */

const css = `
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}
  table{border-collapse:separate}
  body{margin:0!important;padding:0!important;width:100%!important;background:#FFFFFF}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}
  u+#body a{color:inherit;text-decoration:none}
  .btn:hover{background-color:#1544C9!important}
  .btn-ghost:hover{border-color:#1F5BFF!important}

  /* Motion is a progressive extra: Apple Mail and iOS Mail play a slow float on the
     hero scene; Gmail and Outlook strip it and show the still image, which is the
     complete design on its own. Reduced-motion users never see it. */
  @media (prefers-reduced-motion:no-preference){
    .float{animation:t2oFloat 6s ease-in-out infinite}
    @keyframes t2oFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  }

  @media screen and (max-width:600px){
    .wrap{width:100%!important;max-width:100%!important}
    .px{padding-left:20px!important;padding-right:20px!important}
    .stage-out{padding-left:12px!important;padding-right:12px!important}
    .stack{display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box}
    .art-cell{padding:22px 0 0!important;text-align:center!important}
    .art{width:170px!important;height:170px!important}
    .stage-text{padding:10px 22px 4px!important}
    .h1{font-size:23px!important;line-height:1.22!important}
    .stage-sub{font-size:14.5px!important}
    .facts-pad{padding:12px 18px 20px!important}
    .fact-cell{display:block!important;padding:0 0 8px!important}
    .card-col{padding:0 0 12px!important}
    .stat-col{display:block!important;width:100%!important;padding:0 0 8px!important}
    .pay-col{display:inline-block!important;width:50%!important;box-sizing:border-box}
    .hide-sm{display:none!important;max-height:0!important;overflow:hidden!important}
    .btn,.btn-ghost{min-width:0!important;width:100%!important}
    .figure{font-size:23px!important}
    .ask{font-size:16.5px!important}
    .kv-k,.kv-v{display:block!important;width:100%!important;padding:6px 0!important;border-top:0!important}
    .foot-link{display:inline-block!important;padding:4px 6px!important}
    .wordmark{font-size:27px!important;letter-spacing:.14em!important}
  }

  :root{color-scheme:light only;supported-color-schemes:light only}
  [data-ogsc] .keep-white,[data-ogsb] .keep-white{background-color:#FFFFFF!important}
  [data-ogsc] .keep-ink{color:#0E1B4D!important}
  [data-ogsc] .keep-text{color:#17224D!important}
`;

const KIND_DOT = {
  Lifecycle: C.coral, Auth: C.blue, 'Teen consent': C.violet, Engagement: C.gold, Support: C.mint, Admin: C.ink,
};

const FOOT_LINKS = [
  ['My dashboard', `${BRAND.site}/member`], ['Member FAQ', `${BRAND.site}/faq`],
  ['Privacy', `${BRAND.site}/privacy`], ['Terms', `${BRAND.site}/terms`], ['Contact', `${BRAND.site}/contact`],
];
const SOCIALS = [
  ['instagram', 'https://www.instagram.com/turn2opinion/', 'Instagram'],
  ['facebook', 'https://www.facebook.com/tryturn2opinion', 'Facebook'],
  ['linkedin', 'https://www.linkedin.com/company/turn2opinionpanel/home/', 'LinkedIn'],
  ['youtube', 'https://www.youtube.com/@Turn2Opinion', 'YouTube'],
  ['whatsapp', 'https://wa.me/918178200573', 'WhatsApp'],
];

function Footer({ reason, recipient, prefs, unsub, internal }) {
  const small = { fontFamily: FONT.body, fontSize: '12.5px', lineHeight: 1.6, color: C.muted, margin: '0 0 6px', textAlign: 'center' };
  return (
    <>
      <tr>
        <td className="stage-out" style={{ padding: '10px 24px 0' }}>
          <T bgcolor={C.mist} style={{ backgroundColor: C.mist, borderRadius: '28px' }}>
            <tbody>
              <tr><td align="center" style={{ padding: '26px 20px 4px', textAlign: 'center' }}>
                <p className="wordmark" style={{
                  margin: 0, fontFamily: FONT.display, fontSize: '34px', fontWeight: 800, letterSpacing: '.2em', lineHeight: 1.1, color: C.ink,
                }}>TURN<span style={{ color: C.blue }}>2</span>OPINION</p>
                <p style={{ margin: '8px 0 0', fontFamily: FONT.body, fontSize: '13px', fontWeight: 600, color: C.blueD }}>{BRAND.tagline}</p>
              </td></tr>
              {!internal && (
                <tr><td align="center" style={{ padding: '16px 20px 4px' }}>
                  <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '14px', lineHeight: 1.7, color: C.ink2, textAlign: 'center' }}>
                    Questions? <a href={`mailto:${BRAND.support}`} style={{ color: C.blue, fontWeight: 700 }}>{BRAND.support}</a>
                    {' '}&middot;{' '}<a href={BRAND.phoneHref} style={{ color: C.ink2, fontWeight: 600, textDecoration: 'none' }}>{BRAND.phoneDisplay}</a>
                    {' '}&middot;{' '}WhatsApp <a href={BRAND.whatsappHref} style={{ color: C.ink2, fontWeight: 600, textDecoration: 'none' }}>{BRAND.whatsappDisplay}</a>
                  </p>
                </td></tr>
              )}
              {!internal && (
                <tr><td align="center" style={{ padding: '10px 20px 2px', textAlign: 'center' }}>
                  {FOOT_LINKS.map(([l, h], i) => (
                    <React.Fragment key={l}>
                      {i > 0 && <span className="hide-sm" style={{ color: C.lineStrong, fontFamily: FONT.body, fontSize: '13px' }}>&nbsp;&middot;&nbsp;</span>}
                      <a className="foot-link" href={h} style={{ fontFamily: FONT.body, fontSize: '13px', fontWeight: 600, color: C.ink, textDecoration: 'none' }}>{l}</a>
                    </React.Fragment>
                  ))}
                </td></tr>
              )}
              {!internal && (
                <tr><td align="center" style={{ padding: '14px 20px 24px' }}>
                  <table role="presentation" border="0" cellPadding="0" cellSpacing="0" align="center"><tbody><tr>
                    {SOCIALS.map(([k, h, l]) => (
                      <td key={k} style={{ padding: '0 5px' }}>
                        <a href={h}><img src={`${SOC}/${k}.png`} width="32" height="32" alt={`Turn2Opinion on ${l}`}
                          style={{ display: 'block', border: 0, width: '32px', height: '32px' }} /></a>
                      </td>
                    ))}
                  </tr></tbody></table>
                </td></tr>
              )}
              {internal && <tr><td style={{ padding: '0 0 22px' }}>&nbsp;</td></tr>}
            </tbody>
          </T>
        </td>
      </tr>
      <tr>
        <td className="px" style={{ padding: `18px ${PAD}px 30px` }}>
          <p style={small}>{reason}</p>
          {recipient && <p style={small}>Sent to {recipient}{prefs && <> &middot; <a href={prefs} style={{ color: C.muted }}>Email preferences</a></>}{unsub && <> &middot; <a href={unsub} style={{ color: C.muted }}>Unsubscribe</a></>}</p>}
          <p style={{ ...small, fontSize: '11.5px', margin: 0 }}>
            &copy; 2026 Turn2Opinion &middot; {BRAND.legalName} &middot; {BRAND.address}
          </p>
        </td>
      </tr>
    </>
  );
}

/**
 * The document. `meta.kind` sets the header pill; `transactional` decides whether the
 * footer carries preferences/unsubscribe (marketing only).
 */
export function Frame({ title, preheader, kind, reason, recipient, prefs, unsub, internal = false, children }) {
  const head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>${esc(title)}</title><!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><style>td,th,p,a,span,h1,h2{font-family:'Segoe UI',Arial,sans-serif!important}</style><![endif]--><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"><style>${css}</style>`;
  const dot = KIND_DOT[kind] || C.blue;
  ASK_N = 0; // question numbering restarts in every email
  return (
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlnsv="urn:schemas-microsoft-com:vml" xmlnso="urn:schemas-microsoft-com:office:office">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body id="body" className="keep-white" style={{ margin: 0, padding: 0, backgroundColor: '#FFFFFF', width: '100%' }}>
        <div style={{ display: 'none', fontSize: '1px', lineHeight: '1px', maxHeight: 0, maxWidth: 0, opacity: 0, overflow: 'hidden', msoHide: 'all' }}>
          {preheader}{' ‌'.repeat(60)}
        </div>
        <T bgcolor="#FFFFFF" className="keep-white" style={{ backgroundColor: '#FFFFFF' }}>
          <tbody><tr><td align="center" style={{ padding: '0' }}>
            <Raw html={`<!--[if mso]><table role="presentation" width="${W}" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->`} />
            <table role="presentation" className="wrap keep-white" width={W} border="0" cellPadding="0" cellSpacing="0" align="center"
                   style={{ width: `${W}px`, maxWidth: `${W}px`, margin: '0 auto', backgroundColor: '#FFFFFF' }}>
              <tbody>
                {/* top bar: logo + what kind of email this is */}
                <tr><td className="px" style={{ padding: `22px ${PAD}px 14px` }}>
                  <T><tbody><tr>
                    <td valign="middle">
                      <a href={`${BRAND.site}?utm_source=email&utm_medium=logo`} style={{ textDecoration: 'none' }}>
                        <img src={`${LOGO}/turn2opinion-logo.png`} width="170" height="52" alt="Turn2Opinion"
                             style={{ display: 'block', border: 0, width: '170px', height: 'auto', fontFamily: FONT.display, fontSize: '20px', fontWeight: 800, color: C.ink }} />
                      </a>
                    </td>
                    <td valign="middle" align="right" style={{ textAlign: 'right' }}>
                      <table role="presentation" border="0" cellPadding="0" cellSpacing="0" align="right"><tbody><tr>
                        <td style={{
                          border: `1px solid ${C.line}`, borderRadius: '999px', padding: '6px 12px', backgroundColor: '#FFFFFF',
                          fontFamily: FONT.body, fontSize: '12px', fontWeight: 600, color: C.ink2, whiteSpace: 'nowrap',
                        }}><span style={{ color: dot }}>&#9679;</span>&nbsp; {kind}</td>
                      </tr></tbody></table>
                    </td>
                  </tr></tbody></T>
                </td></tr>
                {children}
                <Footer reason={reason} recipient={recipient} prefs={prefs} unsub={unsub} internal={internal} />
              </tbody>
            </table>
            <Raw html={'<!--[if mso]></td></tr></table><![endif]-->'} />
          </td></tr></tbody>
        </T>
      </body>
    </html>
  );
}
