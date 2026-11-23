/**
 * change-email — email change requested; confirmation sent to the CURRENT address.
 * Merge fields: user.name.first, user.mail, email, user.origin, token
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Facts, Journey, Note, Signoff } from '../components/Mail.jsx';
import { u, url, newEmail } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv } from '../lib/text.js';
import { BRAND } from '../lib/theme.js';

export const meta = {
  id: 'change-email', code: '05', n: 9, name: 'Email change — confirm', kind: 'Auth', group: 'Account & security',
  tone: 'night', transactional: true, source: 'change-email.liquid',
  trigger: 'Email change requested; confirmation sent to the current address',
  subjects: ['Confirm the email change on your Turn2Opinion account', '{{ user.name.first }}, was this you? Confirm your email change', 'Action needed: confirm your new email address'],
  subjectsSample: ['Confirm the email change on your Turn2Opinion account', 'Aarav, was this you? Confirm your email change', 'Action needed: confirm your new email address'],
  preheader: 'Someone asked to move your account to a new address. Confirm only if it was you.',
  cta: { label: 'Yes, confirm this change', dest: 'auth/change-email?confcode=…' },
  reason: 'You are receiving this because a change of email address was requested on your account.',
};

export const text = () => `Confirm the email change on your account

Hi ${u.first()},

We received a request to change the email address on your Turn2Opinion
account.

${kv([['Current address', u.mail()], ['New address', newEmail()], ['Valid for', '24 hours']])}

CONFIRM THIS CHANGE
${url.changeConf()}

AFTER YOU CONFIRM
We send one more link to the new address. The change completes when that
link is opened - until then your account keeps this address.

IF YOU DID NOT REQUEST THIS
Do not click the link. Your address stays as it is, and the request
expires on its own. Please contact ${BRAND.support} so we can check
the account.
${textFoot(meta.reason)}`;

export default function ChangeEmail() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Account security" reason={meta.reason} recipient={u.mail()}>
      <Stage tone="night" hero="05-change-email"
        alt="A member holding a phone in a sky portal, beside an envelope tile and a swap-arrows tile"
        title={<>Someone asked to <span style={{ color: '#9FD6FF' }}>change your email address</span>.</>}
        sub="Your account will move to the new address only if you confirm here — and then confirm again from the new inbox."
        facts={[{ text: 'Your decision' }, { text: 'Valid 24 hours', dot: '#9FD6FF' }, { text: 'Step 1 of 2', dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>We received a request to change the email address on your Turn2Opinion account. Please check it&rsquo;s right.</Lead>
      </Hello>

      <Facts title="The requested change" rows={[
        { k: 'Current address', v: u.mail() },
        { k: 'New address', v: newEmail(), color: '#1544C9' },
        { k: 'Valid for', v: '24 hours' },
      ]} />

      <Cta href={url.changeConf()} label="Yes, confirm this change" expiry="This link expires 24 hours after it was sent." showLink />

      <Journey label="How the change works" steps={[
        { state: 'done', label: 'Change requested', note: 'From your account settings' },
        { state: 'now', label: 'You confirm from this address', note: 'This email' },
        { state: 'next', label: 'You verify the new address', note: 'We send one more link there' },
      ]} />

      <Note icon="bell-coral" tint="coral" title="Didn’t request this?">
        Don&rsquo;t click the link. Your address stays as it is and the request expires on its own. Please write to{' '}
        <a href={`mailto:${BRAND.support}`} style={{ color: '#D63262', fontWeight: 700 }}>{BRAND.support}</a> so we can check the account.
      </Note>

      <Signoff line="Keeping your account in your hands." />
    </Frame>
  );
}
