/**
 * LIFECYCLE 1 — Registered, password never set.
 * Same trigger and payload as the MyFrequentRewards case 1; Turn2Opinion design and
 * the v6 profile model (Basic → Educational → surveys one by one, +50 / +1 each).
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Journey, Cta, Ask, Cards, Rows, Payouts, Note, Signoff, P, Sp } from '../components/Mail.jsx';
import { link, mem, FIRST_ITEMS, CONDUCT_NOTE } from '../lib/data.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';

const CMP = 'case1-password';
const HL = { color: '#FFD872' };

export const meta = {
  id: 'case1-password', code: 'L1', n: 1, name: 'Password never set', kind: 'Lifecycle', group: 'Lifecycle reminders',
  tone: 'blue', transactional: true, source: 'MFR case1-password',
  trigger: 'Registered on the portal but never set a password',
  subjects: [
    '{{ member.first_name | default: "Hi" }}, your Turn2Opinion account can’t be used yet',
    'One password stands between you and your first paid survey',
    'Step 2 of 4: set your Turn2Opinion password',
  ],
  subjectsSample: [
    'Aarav, your Turn2Opinion account can’t be used yet',
    'One password stands between you and your first paid survey',
    'Step 2 of 4: set your Turn2Opinion password',
  ],
  preheader: 'Without a password we can’t send you a single survey. Setting one takes about 40 seconds.',
  cta: { label: 'Set my password', dest: 'links.set_password' },
  reason: 'You are receiving this because you registered for a Turn2Opinion account and the set-up is unfinished.',
};

export const text = () => `WHY YOU'RE GETTING THIS
Your account is registered, but it can't be used yet.
No password has been set, so you can't sign in - and we can't send you a
single paid survey. Setting one takes about 40 seconds.
About 40 seconds · Step 2 of 4 · Member ${mem.id()}

Hi ${mem.first()},

Everything you entered is saved. One field is missing, and until it is
filled nothing else on Turn2Opinion can start.

WHAT'S HOLDING THINGS UP
  [done]  Your account is registered.
  [open]  No password has been set, so the account can't be signed into.
  [open]  Survey invitations only go to secured accounts - none has been
          sent to you, and none will be until this is fixed.
Setting a password takes about 40 seconds and fixes all three.

SET MY PASSWORD
${link.setPassword(CMP)}

YOUR SIGN-UP, 4 STEPS
  1. Register                 done
  2. Set your password        you are here
  3. Accept the research terms
  4. Build your Basic profile

WHAT OPENS ONCE YOU'RE IN
  - Your Opinion Kingdom: every profile and survey you finish raises a
    building and earns +50 Opinion Points and +1 quality score.
  - Surveys matched to you, consumer and professional (B2B).
  - Get rewarded your way: PayPal, Wire Transfer, Amazon Gift Card,
    and UPI for members in India.

YOUR FIRST TWO PROFILES
  Basic          19 questions  about 2 min  +50 pts
  Educational    13 questions  about 2 min  +50 pts
  Then surveys open one at a time - each one you finish opens the next.

${CONDUCT_NOTE}
${textFoot(meta.reason)}`;

export default function Case1() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account set-up" reason={meta.reason} recipient={mem.email()}>
      <Stage
        tone="blue" hero="c1-password"
        alt="A member holding a phone inside a gold portal, with a key tile and a padlock tile floating beside them"
        title={<>Your account is registered, but it <span style={HL}>can&rsquo;t be used yet</span>.</>}
        sub="No password has been set — so you can’t sign in, and we can’t send you a single paid survey."
        facts={[{ text: 'About 40 seconds' }, { text: 'Step 2 of 4', dot: '#9FD6FF' }, { text: <>Member {mem.id()}</>, dot: '#7FF0CF' }]}
      />

      <Hello name={mem.first()}>
        <Lead>Everything you entered is saved. One field is missing, and until it&rsquo;s filled, nothing else on Turn2Opinion can start.</Lead>
      </Hello>

      <Journey
        label="What’s holding things up"
        steps={[
          { state: 'done', label: 'Your account is registered.', chip: 'Done' },
          { state: 'warn', label: 'No password has been set, so the account can’t be signed into.', chip: 'Missing' },
          { state: 'warn', label: 'Survey invitations only go to secured accounts — none has been sent to you, and none will be until this is fixed.', chip: 'Blocked' },
        ]}
        note="Setting a password takes about 40 seconds and fixes all three."
      />

      <Cta href={link.setPassword(CMP)} label="Set my password"
           note={<>Opens the secure form on turn2opinion.com &middot; member ID {mem.id()}</>} />

      <Journey
        label="Your sign-up, 4 steps"
        steps={[
          { state: 'done', label: 'Register' },
          { state: 'now', label: 'Set your password', note: 'About 40 seconds' },
          { state: 'next', label: 'Accept the research terms', note: 'One tap' },
          { state: 'next', label: 'Build your Basic profile', note: 'About 2 minutes · +50 points · +1 quality score' },
        ]}
      />

      <Ask q="What opens once I’m in?">
        <Cards items={[
          { icon: 'flag-coral', tint: 'coral', title: 'Your Opinion Kingdom', text: 'Every profile and survey you finish raises a new building and earns +50 points and +1 quality score.' },
          { icon: 'target-blue', tint: 'blue', title: 'Surveys matched to you', text: 'Your profile decides which studies you’re invited to — shopping, tech, travel and more.' },
          { icon: 'briefcase-navy', tint: 'mist', title: 'Professionals welcome', text: 'B2B studies matched to your role, for decision-makers and specialists in every industry.' },
          { icon: 'wallet-mint', tint: 'mint', title: 'No fees, ever', text: 'Joining is free and you’ll never be asked for a payment.' },
        ]} />
      </Ask>

      <Payouts />

      <Ask q="What will I do first?" kicker="After your password">
        <Rows items={FIRST_ITEMS.slice(0, 2).map((it) => ({
          icon: it.icon, title: it.name, tag: it.kind, text: `${it.q} questions · about ${it.min} min · ${it.note}`, meta: '+50',
        }))} />
        <Sp h={6} />
        <P size={14} color="#56618C" mb={0}>Then surveys open one at a time &mdash; each one you finish opens the next.</P>
      </Ask>

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">{CONDUCT_NOTE}</Note>

      <Signoff line="See you inside — your kingdom is waiting." />
    </Frame>
  );
}
