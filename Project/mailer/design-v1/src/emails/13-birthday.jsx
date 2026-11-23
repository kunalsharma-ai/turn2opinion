/**
 * birthday — member's birthday. Asks for nothing.
 * Merge fields: user.name.first
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Row, Signoff } from '../components/Mail.jsx';
import { u, url } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';
import { C, FONT } from '../lib/theme.js';

export const meta = {
  id: 'birthday', code: '13', n: 17, name: 'Birthday greeting', kind: 'Engagement', group: 'Engagement',
  tone: 'coral', transactional: false, source: 'birthday.liquid',
  trigger: 'Member’s birthday',
  subjects: ['Happy birthday, {{ user.name.first }}!', 'A birthday wish from Turn2Opinion', '{{ user.name.first }}, today is all yours'],
  subjectsSample: ['Happy birthday, Aarav!', 'A birthday wish from Turn2Opinion', 'Aarav, today is all yours'],
  preheader: 'No survey, nothing to do — just a good wish from all of us.',
  cta: null,
  reason: 'You are receiving this because you are a Turn2Opinion member and today is the birthday on your profile.',
};

export const text = () => `Happy birthday, ${u.first()}!

Wishing you a wonderful birthday filled with happiness, memorable moments
and plenty of reasons to smile.

We're glad to have you in the Turn2Opinion community, and grateful for
every opinion you've shared with us this year.

No survey attached, and nothing to do. Just a good wish.

May the year ahead be full of good opportunities and happy moments.
${textFoot(meta.reason, { prefs: url.prefs() })}`;

const Wish = ({ e, title, text, bg }) => (
  <td width="33%" valign="top" className="stat-col" style={{ width: '33%', padding: '0 6px 0 0' }}>
    <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0" bgcolor={bg} style={{ backgroundColor: bg, borderRadius: '20px' }}>
      <tbody><tr><td align="center" style={{ padding: '18px 10px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '30px', lineHeight: 1.1 }}>{e}</p>
        <p style={{ margin: '8px 0 2px', fontFamily: FONT.display, fontSize: '15px', fontWeight: 800, color: C.ink }}>{title}</p>
        <p style={{ margin: 0, fontFamily: FONT.body, fontSize: '13px', color: C.muted, lineHeight: 1.45 }}>{text}</p>
      </td></tr></tbody>
    </table>
  </td>
);

export default function Birthday() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Celebration" reason={meta.reason} prefs={url.prefs()}>
      <Stage tone="coral" eyebrow="A little celebration" hero="13-birthday"
        alt="A cheerful member in a pink portal surrounded by a birthday cake tile, a gift tile and sparkles"
        title={<>Happy birthday, <span style={{ color: '#FFE3A3' }}>{u.first()}</span>!</>}
        sub="No survey, nothing to do, nothing to click. Just a good wish from all of us at Turn2Opinion."
        facts={[{ text: 'Nothing to do' }, { text: 'Just a good wish', dot: '#FFE3A3' }]} />

      <Hello hi="Dear" name={u.first()}>
        <Lead mb={12}>Wishing you a wonderful birthday filled with happiness, memorable moments and plenty of reasons to smile.</Lead>
        <Lead>We&rsquo;re glad to have you in the Turn2Opinion community, and grateful for every opinion you&rsquo;ve shared with us this year.</Lead>
      </Hello>

      <Row py={8}>
        <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0"><tbody><tr>
          <Wish e="🎂" title="Celebrate" text="Today is entirely yours." bg={C.tCoral} />
          <Wish e="🎁" title="Treat yourself" text="You’ve earned a slow day." bg={C.tGold} />
          <Wish e="✨" title="Big year ahead" text="Full of good things." bg={C.tViolet} />
        </tr></tbody></table>
      </Row>

      <Signoff line="May the year ahead be full of good opportunities and happy moments." />
    </Frame>
  );
}
