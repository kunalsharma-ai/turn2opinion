/**
 * change-email-verify — email change approved; verification sent to the NEW address.
 * Merge fields: user.name.first, user.mail, email, user.origin, token
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Facts, Journey, Note, Signoff } from '../components/Mail.jsx';
import { u, url, newEmail } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv } from '../lib/text.js';

export const meta = {
  id: 'change-email-verify', code: '06', n: 10, name: 'Email change — verify new address', kind: 'Auth', group: 'Account & security',
  tone: 'blue', transactional: true, source: 'change-email-verify.liquid',
  trigger: 'Email change approved; verification sent to the new address',
  subjects: ['Verify your new Turn2Opinion email address', '{{ user.name.first }}, one last step to switch your email', 'Confirm this is your new address'],
  subjectsSample: ['Verify your new Turn2Opinion email address', 'Aarav, one last step to switch your email', 'Confirm this is your new address'],
  preheader: 'The last step of your email change. Until you verify, the account keeps the old address.',
  cta: { label: 'Verify this address', dest: 'auth/change-email?updatecode=…' },
  reason: 'You are receiving this because this address was given as the new address for a Turn2Opinion account.',
};

export const text = () => `Verify your new email address

Hi ${u.first()},

This is the last step of the email change on your Turn2Opinion account.
Verifying confirms that this address belongs to you.

${kv([['Moving from', u.mail()], ['Moving to', newEmail()], ['Valid for', '24 hours']])}

VERIFY THIS ADDRESS
${url.changeUpd()}

Until you verify, the account keeps using the old address.

IF YOU WERE NOT EXPECTING THIS
Ignore this email. Nothing changes without this confirmation, and the
link expires on its own.
${textFoot(meta.reason)}`;

export default function ChangeEmailVerify() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account security" reason={meta.reason} recipient={newEmail()}>
      <Stage tone="blue" hero="06-change-email-verify"
        alt="A member in a mint portal beside a mint envelope tile with a tick and a link tile"
        title={<>One last step: <span style={{ color: '#FFD872' }}>verify this new address</span>.</>}
        sub="Verifying confirms this inbox belongs to you. Until you do, your account keeps the old address."
        facts={[{ text: 'Final step' }, { text: 'Valid 24 hours', dot: '#9FD6FF' }, { text: 'About 10 seconds', dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>This is the last step of the email change on your Turn2Opinion account.</Lead>
      </Hello>

      <Facts title="The change" rows={[
        { k: 'Moving from', v: u.mail() },
        { k: 'Moving to', v: newEmail(), color: '#0B7D63' },
        { k: 'Valid for', v: '24 hours' },
      ]} />

      <Cta href={url.changeUpd()} label="Verify this address" expiry="This link expires 24 hours after it was sent." showLink />

      <Journey label="How the change works" steps={[
        { state: 'done', label: 'Change requested' },
        { state: 'done', label: 'Confirmed from your old address' },
        { state: 'now', label: 'Verify this new address', note: 'This email — the last step' },
      ]} />

      <Note icon="eye-navy" tint="mist" title="Not expecting this?">
        Ignore this email. Nothing changes without this confirmation, and the link expires on its own.
      </Note>

      <Signoff line="Nearly done — see you at your new address." />
    </Frame>
  );
}
