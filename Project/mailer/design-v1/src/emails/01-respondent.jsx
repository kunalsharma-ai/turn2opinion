/**
 * respondent — verify email address and set a password (new respondent).
 * Merge fields: user.name.first, user._id, user.origin, otp.code
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Journey, Cta, Ask, Steps, Payouts, Note, Signoff } from '../components/Mail.jsx';
import { u, url, CONDUCT_NOTE } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';

const HL = { color: '#FFD872' };

export const meta = {
  id: 'respondent', code: '01', n: 5, name: 'Verify email & set password', kind: 'Auth', group: 'Account & security',
  tone: 'blue', transactional: true, source: 'respondent.liquid',
  trigger: 'New respondent registered; email not yet verified',
  subjects: [
    'Verify your email to activate your Turn2Opinion account',
    '{{ user.name.first }}, one tap to activate your account',
    'Confirm your email and set your Turn2Opinion password',
  ],
  subjectsSample: [
    'Verify your email to activate your Turn2Opinion account',
    'Aarav, one tap to activate your account',
    'Confirm your email and set your Turn2Opinion password',
  ],
  preheader: 'Confirm your address and choose a password in one step. The link is valid for 24 hours.',
  cta: { label: 'Verify my email', dest: 'set-password?user=…&code=…' },
  reason: 'You are receiving this because this address was used to register for a Turn2Opinion account.',
};

export const text = () => `Verify your email to activate your account

Hi ${u.first()},

WHAT'S HOLDING THINGS UP
  [done]  Your registration has been received.
  [open]  Your email address has not been verified yet.
  [open]  Until it is, the account stays inactive and no survey invitations
          can be sent to it.
Verifying takes about a minute and sets your password at the same time.

VERIFY MY EMAIL
${url.setPassword()}
This link expires 24 hours after it was sent.

ONCE VERIFIED
  1. Create your password
  2. Complete your Basic profile (about 2 min, +50 points)
  3. Take surveys matched to you
  4. Get rewarded your way: PayPal, Wire Transfer, Amazon Gift Card,
     UPI (India only)

Didn't register? Ignore this email - no account is activated without
this confirmation.

${CONDUCT_NOTE}
${textFoot(meta.reason)}`;

export default function Respondent() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account security" reason={meta.reason}>
      <Stage tone="blue" hero="01-respondent"
        alt="A member with a laptop inside a sky-blue portal, beside an envelope tile with a green tick and a gold key"
        title={<>Your registration is in &mdash; your email <span style={HL}>isn&rsquo;t verified yet</span>.</>}
        sub="Until it is, the account stays inactive and no survey can be sent to it. Verifying also sets your password, so it’s one step, not two."
        facts={[{ text: 'About a minute' }, { text: 'Link valid 24 hours', dot: '#9FD6FF' }, { text: <>Member {u.id()}</>, dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>Welcome to Turn2Opinion. One confirmation activates your account and sets your password at the same time.</Lead>
      </Hello>

      <Journey label="What’s holding things up" steps={[
        { state: 'done', label: 'Your registration has been received.' },
        { state: 'warn', label: 'Your email address has not been verified yet.', chip: 'Pending' },
        { state: 'warn', label: 'Until it is, the account stays inactive and no survey invitations can be sent to it.', chip: 'Inactive' },
      ]} note="Verifying takes about a minute and sets your password at the same time." />

      <Cta href={url.setPassword()} label="Verify my email" expiry="This link expires 24 hours after it was sent." showLink />

      <Ask q="What can I do once I’m verified?">
        <Steps items={[
          { title: 'Create your password', text: 'Done in the same step as verifying.' },
          { title: 'Complete your Basic profile', text: 'About 2 minutes · +50 points · +1 quality score.' },
          { title: 'Take surveys matched to you', text: 'Consumer and professional studies, each showing its reward before you start.' },
          { title: 'Get rewarded your way', text: 'Redeem from your dashboard once you reach the minimum.' },
        ]} />
      </Ask>

      <Payouts />

      <Note icon="eye-navy" tint="mist" title="Didn’t register?">
        Ignore this email and nothing happens &mdash; no account is activated without this confirmation. {CONDUCT_NOTE}
      </Note>

      <Signoff line="Welcome aboard — your opinion matters here." />
    </Frame>
  );
}
