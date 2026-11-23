/**
 * LIFECYCLE 2 — Password set, research terms not accepted.
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Journey, Cta, Ask, Cards, Checks, Note, Signoff, A } from '../components/Mail.jsx';
import { link, mem, CONDUCT_NOTE } from '../lib/data.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';

const CMP = 'case2-terms';
const HL = { color: '#FFD872' };

export const meta = {
  id: 'case2-terms', code: 'L2', n: 2, name: 'Terms not accepted', kind: 'Lifecycle', group: 'Lifecycle reminders',
  tone: 'blue', transactional: true, source: 'MFR case2-terms',
  trigger: 'Password created, research terms not accepted / no return login',
  subjects: [
    '{{ member.first_name | default: "Hi" }}, one item is still open on your Turn2Opinion account',
    'Two of four done — the next step is one tap',
    'Your Turn2Opinion account is built but not active yet',
  ],
  subjectsSample: [
    'Aarav, one item is still open on your Turn2Opinion account',
    'Two of four done — the next step is one tap',
    'Your Turn2Opinion account is built but not active yet',
  ],
  preheader: 'Without your consent to the research terms we can’t match you to any study. It’s one tap.',
  cta: { label: 'Accept and activate', dest: 'links.accept_terms' },
  reason: 'You are receiving this because your Turn2Opinion account set-up is unfinished.',
};

export const text = () => `WHY YOU'RE GETTING THIS
Your account is built, but it's not active yet.
The research terms haven't been accepted, and without that consent we're
not allowed to match you to any study.
One tap · Step 3 of 4 · Member ${mem.id()}

Hi ${mem.first()},

Your password works and your details are saved. One consent is all that
stands between you and your first profile.

WHAT'S HOLDING THINGS UP
  [done]  Your account is created and your password works.
  [open]  The research terms have not been accepted.
  [open]  Without that consent no invitation can be sent, even though
          your account is otherwise ready.
It's one tap on the portal. There is no form to fill in.

ACCEPT AND ACTIVATE
${link.terms(CMP)}

WHAT YOU'RE AGREEING TO
  - Your answers are used for research only and reported in aggregate.
  - Taking part is always optional - decline any survey, it costs nothing.
  - You can close your account whenever you like.
  - You keep your data rights: access, correction and deletion.
Read in full: ${link.terms_page()} and ${link.privacy()}

THE MOMENT YOU ACCEPT
  - Your Basic profile opens: about 2 minutes, +50 points, +1 quality score.
  - It lays the first stone of your Opinion Kingdom.
  - Surveys then open one at a time, each matched to you.

YOUR SIGN-UP, 4 STEPS
  1. Register                  done
  2. Set your password         done
  3. Accept the research terms you are here
  4. Build your Basic profile

${CONDUCT_NOTE}
${textFoot(meta.reason)}`;

export default function Case2() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account set-up" reason={meta.reason} recipient={mem.email()}>
      <Stage
        tone="blue" hero="c2-terms"
        alt="A member inside a mint portal beside a clipboard with a green tick and a blue shield"
        title={<>Your account is built, but it&rsquo;s <span style={HL}>not active yet</span>.</>}
        sub="The research terms haven’t been accepted — and without that consent we’re not allowed to match you to any study."
        facts={[{ text: 'One tap' }, { text: 'Step 3 of 4', dot: '#9FD6FF' }, { text: <>Member {mem.id()}</>, dot: '#7FF0CF' }]}
      />

      <Hello name={mem.first()}>
        <Lead>Your password works and your details are saved. One consent is all that stands between you and your first profile.</Lead>
      </Hello>

      <Journey
        label="What’s holding things up"
        steps={[
          { state: 'done', label: 'Your account is created and your password works.' },
          { state: 'warn', label: 'The research terms have not been accepted.', chip: 'Missing' },
          { state: 'warn', label: 'Without that consent no invitation can be sent, even though your account is otherwise ready.', chip: 'Blocked' },
        ]}
        note="It’s one tap on the portal. There is no form to fill in."
      />

      <Cta href={link.terms(CMP)} label="Accept and activate" note="Participation is always optional, and you can withdraw at any time." />

      <Ask q="What exactly am I agreeing to?">
        <Checks items={[
          'Your answers are used for research only and reported in aggregate.',
          'Taking part is always optional — decline any survey, and it costs you nothing.',
          'You can close your account whenever you like.',
          'You keep your data rights: access, correction and deletion.',
        ]} />
        <p style={{ margin: '4px 0 0', fontFamily: "'Inter',Arial,sans-serif", fontSize: '14px', color: '#56618C' }}>
          Read them in full: <A href={link.terms_page()}>Terms &amp; Conditions</A> &middot; <A href={link.privacy()}>Privacy Policy</A>
        </p>
      </Ask>

      <Ask q="What happens the moment I accept?">
        <Cards items={[
          { icon: 'user-blue', tint: 'blue', title: 'Your Basic profile opens', text: 'About 2 minutes. Earns +50 points and +1 quality score.' },
          { icon: 'flag-coral', tint: 'coral', title: 'The first stone is laid', text: 'Your Opinion Kingdom starts as a campsite and grows with every item you finish.' },
          { icon: 'layers-violet', tint: 'violet', title: 'Surveys, one at a time', text: 'Once your About-you profiles are done, surveys open in order — each one opens the next.' },
          { icon: 'gift-coral', tint: 'gold', title: 'Rewarded your way', text: 'PayPal, Wire Transfer, Amazon Gift Card — and UPI for members in India.' },
        ]} />
      </Ask>

      <Journey
        label="Your sign-up, 4 steps"
        steps={[
          { state: 'done', label: 'Register' },
          { state: 'done', label: 'Set your password' },
          { state: 'now', label: 'Accept the research terms', note: 'One tap' },
          { state: 'next', label: 'Build your Basic profile', note: 'About 2 minutes · +50 points · +1 quality score' },
        ]}
      />

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">{CONDUCT_NOTE}</Note>

      <Signoff line="One tap, and your kingdom’s first stone is laid." />
    </Frame>
  );
}
