/**
 * reset-password — password reset requested (record-led variant of 03).
 * Merge fields: user.name.first, user.mail, user._id, user.origin, otp.code
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Facts, Ask, Steps, Note, Signoff } from '../components/Mail.jsx';
import { u, url } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv } from '../lib/text.js';

export const meta = {
  id: 'reset-password', code: '04', n: 8, name: 'Reset password', kind: 'Auth', group: 'Account & security',
  tone: 'night', transactional: true, source: 'reset-password.liquid',
  trigger: 'Password reset requested (record-led variant of 03)',
  subjects: ['Create a new Turn2Opinion password', '{{ user.name.first }}, create your new password', 'Your password reset link is inside'],
  subjectsSample: ['Create a new Turn2Opinion password', 'Aarav, create your new password', 'Your password reset link is inside'],
  preheader: 'A single-use link to choose a new password, valid for 24 hours.',
  cta: { label: 'Create a new password', dest: 'forgot-password?user=…&code=…' },
  reason: 'You are receiving this because a password reset was requested for your account.',
};

export const text = () => `Create a new password

Hi ${u.first()},

We received a request to reset the password associated with your
Turn2Opinion account.

${kv([['Member ID', u.id()], ['Valid for', '24 hours, single use']])}

CREATE A NEW PASSWORD
${url.reset()}

DIDN'T REQUEST A RESET?
You can safely ignore this email. Your current password will remain
unchanged and the link will expire on its own.
${textFoot(meta.reason)}`;

export default function ResetPassword() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account security" reason={meta.reason}>
      <Stage tone="night" hero="04-reset"
        alt="A member in a violet portal beside a padlock tile, a clock badge and a mint shield"
        title={<>Choose a <span style={{ color: '#FFE08A' }}>new password</span> for your account.</>}
        sub="Your reset link is ready. It works once and expires after 24 hours."
        facts={[{ text: 'Single-use link' }, { text: 'Valid 24 hours', dot: '#9FD6FF' }, { text: 'About 30 seconds', dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>We received a request to reset the password associated with your Turn2Opinion account.</Lead>
      </Hello>

      <Facts title="The account" rows={[
        { k: 'Member ID', v: u.id() },
        { k: 'Valid for', v: '24 hours, single use', color: '#5A36D6' },
      ]} />

      <Cta href={url.reset()} label="Create a new password" expiry="This link expires 24 hours after it was sent." showLink />

      <Ask q="What makes a strong password?" kicker="A quick tip">
        <Steps items={[
          { title: 'Make it long', text: 'Twelve characters or more — a short phrase works well.' },
          { title: 'Make it unique', text: 'Don’t reuse a password from another site.' },
          { title: 'Keep it to yourself', text: 'Turn2Opinion will never ask for it by email or phone.' },
        ]} />
      </Ask>

      <Note icon="shield-mint" tint="mint" title="Didn’t request a reset?">
        You can safely ignore this email. Your current password stays unchanged and the link expires on its own.
      </Note>

      <Signoff line="All set in under a minute." />
    </Frame>
  );
}
