/**
 * invite — an existing member invited this address.
 * Merge fields: user.fullName, ref.link
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Ask, Cards, Checks, Payouts, Note, Signoff } from '../components/Mail.jsx';
import { u, ref, url, CONDUCT_NOTE } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, bullets } from '../lib/text.js';

export const meta = {
  id: 'invite', code: '11', n: 15, name: 'Referral invitation', kind: 'Engagement', group: 'Engagement',
  tone: 'coral', transactional: false, source: 'invite.liquid',
  trigger: 'An existing member invited this address',
  subjects: ['{{ user.fullName }} invited you to Turn2Opinion', '{{ user.fullName }} thinks your opinion is worth rewarding', 'An invitation to get rewarded for your opinions'],
  subjectsSample: ['Aarav Mehta invited you to Turn2Opinion', 'Aarav Mehta thinks your opinion is worth rewarding', 'An invitation to get rewarded for your opinions'],
  preheader: 'Free to join, no investment. Share your opinions in paid surveys and get rewarded your way.',
  cta: { label: 'Accept the invitation', dest: 'ref.link' },
  reason: 'You are receiving this because a Turn2Opinion member sent you an invitation.',
};

export const text = () => `${u.full()} invited you to Turn2Opinion

${u.full()} thinks you'd like Turn2Opinion, so they sent you this invitation.

WHAT IT IS
Turn2Opinion is an online research community. Members - everyday consumers and business
professionals - answer paid surveys and are rewarded for their time.

${bullets([
  'Every invitation shows the reward and the length before you start',
  'You can decline any study, and declining costs you nothing',
  'Rewards by PayPal, Wire Transfer, Amazon Gift Card - and UPI in India',
  'Joining is free, and you can close the account whenever you like',
])}

ACCEPT THE INVITATION
${ref.link()}

${CONDUCT_NOTE}

If this invitation was not meant for you, ignore it - nothing is created
until you accept.
${textFoot(meta.reason, { prefs: url.prefs() })}`;

export default function Invite() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Invitation" reason={meta.reason} prefs={url.prefs()}>
      <Stage tone="coral" eyebrow="You’ve been invited" hero="11-invite"
        alt="A smiling member in a pink portal beside a gift tile, a people tile and a coin"
        title={<><span style={{ color: '#FFE3A3' }}>{u.full()}</span> thinks your opinion is worth rewarding.</>}
        sub="They’ve invited you to Turn2Opinion — paid surveys for everyday consumers and business professionals."
        facts={[{ text: 'Free to join' }, { text: 'No investment', dot: '#B9F2E1' }, { text: 'Rewarded your way', dot: '#FFE3A3' }]} />

      <Hello hi="Hello" name="there">
        <Lead>Your weekly shop, your favourite shows, the apps on your phone &mdash; the opinions you already have can earn you rewards.</Lead>
      </Hello>

      <Cta href={ref.link()} label="Accept the invitation" note="Nothing is created until you accept." />

      <Ask q="What is Turn2Opinion, exactly?">
        <Cards items={[
          { icon: 'bag-coral', tint: 'coral', title: 'For consumers', text: 'Shop it, rate it, get rewarded for it — surveys on shopping, tech, travel, food and more.' },
          { icon: 'briefcase-navy', tint: 'mist', title: 'For professionals', text: 'B2B studies matched to your role, for decision-makers and specialists.' },
          { icon: 'flag-coral', tint: 'gold', title: 'A kingdom to build', text: 'Every profile and survey you finish raises a building and earns points.' },
          { icon: 'shield-blue', tint: 'blue', title: 'Run by researchers', text: 'Answers are used for research only, reported in aggregate and never sold.' },
        ]} />
      </Ask>

      <Ask q="What’s the catch?" kicker="Fair question">
        <Checks items={[
          'There isn’t one: joining is free and you’ll never be asked for a payment.',
          'Every invitation shows the reward and the length before you start.',
          'You can decline any study, and declining costs you nothing.',
          'You can close the account whenever you like.',
        ]} />
      </Ask>

      <Payouts />

      <Note icon="eye-navy" tint="mist" title="Not meant for you?">
        Ignore this invitation &mdash; nothing is created until you accept. {CONDUCT_NOTE}
      </Note>

      <Signoff line="Speak your mind. Shape what’s next. Get rewarded." />
    </Frame>
  );
}
