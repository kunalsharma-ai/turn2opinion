/**
 * forgot-password — password reset requested from the login page.
 * Merge fields: user.name.first, user._id, user.origin, otp.code
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Ask, Checks, Note, Signoff } from '../components/Mail.jsx';
import { u, url } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';
import { BRAND } from '../lib/theme.js';

export const meta = {
  id: 'forgot-password', code: '03', n: 7, name: 'Forgot password', kind: 'Auth', group: 'Account & security',
  tone: 'night', transactional: true, source: 'forgot-password.liquid',
  trigger: 'Password reset requested from the login page',
  subjects: ['Reset your Turn2Opinion password', '{{ user.name.first }}, here’s your password reset link', 'Your Turn2Opinion password reset'],
  subjectsSample: ['Reset your Turn2Opinion password', 'Aarav, here’s your password reset link', 'Your Turn2Opinion password reset'],
  preheader: 'Use the link inside to choose a new password. It works once, for 24 hours.',
  cta: { label: 'Reset my password', dest: 'forgot-password?user=…&code=…' },
  reason: 'You are receiving this because a password reset was requested for your account.',
};

export const text = () => `Reset your Turn2Opinion password

Hi ${u.first()},

We received a request to reset the password on your Turn2Opinion account.

RESET MY PASSWORD
${url.forgot()}
This link works for 24 hours and can be used once.

IF THIS WASN'T YOU
Your password has not changed and your account is not at risk. Ignore
this email and the link expires on its own. If these keep arriving,
contact ${BRAND.support} and we will secure the account.

We will never ask you for your password, a one-time code, a full account
number or a card number by email.
${textFoot(meta.reason)}`;

export default function ForgotPassword() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account security" reason={meta.reason}>
      <Stage tone="night" hero="03-forgot"
        alt="A member with glasses in a peach portal, beside a gold key tile and a blue refresh tile"
        title={<>Someone asked to <span style={{ color: '#9FD6FF' }}>reset your password</span>.</>}
        sub="If it was you, choose a new one below. If it wasn’t, ignore this — nothing changes."
        facts={[{ text: 'Valid 24 hours' }, { text: 'Single use', dot: '#9FD6FF' }, { text: 'Password unchanged', dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>We received a request to reset the password on your Turn2Opinion account. Let&rsquo;s get you back in.</Lead>
      </Hello>

      <Cta href={url.forgot()} label="Reset my password" expiry="Works for 24 hours and can be used once." showLink />

      <Note icon="shield-mint" tint="mint" title="Wasn’t you?">
        Your password has not changed and your account is not at risk. Ignore this email and the link expires on its own.
        If these keep arriving, write to <a href={`mailto:${BRAND.support}`} style={{ color: '#1F5BFF', fontWeight: 700 }}>{BRAND.support}</a> and we&rsquo;ll secure the account.
      </Note>

      <Ask q="What will Turn2Opinion never ask me for?" kicker="Stay safe">
        <Checks tone="blue" items={[
          'Your password — not by email, phone or WhatsApp.',
          'A one-time code you received.',
          'A full bank account or card number.',
          'Any payment to join or to receive a reward.',
        ]} />
      </Ask>

      <Signoff line="Back in no time." />
    </Frame>
  );
}
