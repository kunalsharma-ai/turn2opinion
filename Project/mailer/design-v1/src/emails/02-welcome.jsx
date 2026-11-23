/**
 * welcome — password created, account active.
 * Merge fields: user.name.first, user.origin
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Ask, Steps, Cards, Payouts, Note, Signoff } from '../components/Mail.jsx';
import { u, url, CONDUCT_NOTE } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';

export const meta = {
  id: 'welcome', code: '02', n: 6, name: 'Account active', kind: 'Auth', group: 'Account & security',
  tone: 'mint', transactional: true, source: 'welcome.liquid',
  trigger: 'Password created; account now active',
  subjects: [
    'Your Turn2Opinion account is active',
    '{{ user.name.first }}, you’re in — your first profile is waiting',
    'Welcome to Turn2Opinion: here’s your first step',
  ],
  subjectsSample: [
    'Your Turn2Opinion account is active',
    'Aarav, you’re in — your first profile is waiting',
    'Welcome to Turn2Opinion: here’s your first step',
  ],
  preheader: 'Your password is set. Start with your Basic profile — about 2 minutes and your first 50 points.',
  cta: { label: 'Log in to my dashboard', dest: '?login' },
  reason: 'You are receiving this because your Turn2Opinion account was just activated.',
};

export const text = () => `Your Turn2Opinion account is active

Hi ${u.first()},

Your password has been created and your account is now active.

WHAT TO DO NEXT
  1. Log in to your dashboard
  2. Complete your Basic profile - this decides which studies you match
     (about 2 min, +50 points, +1 quality score)
  3. Start receiving survey invitations and earning rewards

LOG IN TO MY DASHBOARD
${url.login()}

HOW TURN2OPINION WORKS
  - Every profile and survey you finish raises a building in your
    Opinion Kingdom: +50 points and +1 quality score.
  - Each invitation shows its reward and length before you start.
  - Redeem by PayPal, Wire Transfer, Amazon Gift Card, or UPI in India.

${CONDUCT_NOTE}
${textFoot(meta.reason)}`;

export default function Welcome() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account active" reason={meta.reason}>
      <Stage tone="mint" eyebrow="You’re all set" hero="02-welcome"
        alt="A cheerful member holding a mug in a gold portal, with a gift tile, a +50 coin and sparkles"
        title={<>Your account is <span style={{ color: '#FFE08A' }}>active</span>. Your first profile is waiting.</>}
        sub="Your password is set. The Basic profile is next — it decides which surveys you’re matched to."
        facts={[{ text: 'Password set' }, { text: 'Basic ≈ 2 minutes', dot: '#9FD6FF' }, { text: 'First +50 points', dot: '#FFE08A' }]} />

      <Hello name={u.first()}>
        <Lead>Welcome to Turn2Opinion &mdash; where the opinions you already have can earn you rewards.</Lead>
      </Hello>

      <Ask q="What do I do next?" kicker="Three steps">
        <Steps items={[
          { title: 'Log in to your dashboard', text: 'Use the email and password you just set.' },
          { title: 'Complete your Basic profile', text: 'This is what decides which studies you match. About 2 minutes · +50 points · +1 quality score.' },
          { title: 'Start receiving surveys', text: 'Invitations arrive by email and on your dashboard, each showing its reward first.' },
        ]} />
      </Ask>

      <Cta href={url.login()} label="Log in to my dashboard" />

      <Ask q="How does it all work?">
        <Cards items={[
          { icon: 'flag-coral', tint: 'coral', title: 'Build your kingdom', text: 'Every profile and survey you finish raises a building: +50 points, +1 quality score.' },
          { icon: 'layers-violet', tint: 'violet', title: 'One step at a time', text: 'About-you profiles first; then surveys open in order, each one unlocking the next.' },
          { icon: 'clock-gold', tint: 'gold', title: 'Reward shown first', text: 'Every invitation shows its reward and length before you start.' },
          { icon: 'thumb-mint', tint: 'mint', title: 'Always optional', text: 'Decline any survey — it never costs you anything.' },
        ]} />
      </Ask>

      <Payouts />

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">{CONDUCT_NOTE}</Note>

      <Signoff line="Speak your mind. We’re glad you’re here." />
    </Frame>
  );
}
