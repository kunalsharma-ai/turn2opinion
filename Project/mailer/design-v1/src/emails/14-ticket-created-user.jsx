/**
 * ticket-created-user — member submitted a support ticket.
 * Merge fields (FLAT call site): user.name, data.ticketNo, data.subject
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Facts, Journey, Note, Signoff } from '../components/Mail.jsx';
import { tkUser, tk, url } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv } from '../lib/text.js';

export const meta = {
  id: 'ticket-created-user', code: '14', n: 18, name: 'Ticket received — member', kind: 'Support', group: 'Support',
  tone: 'blue', transactional: true, source: 'ticket-created-user.liquid',
  trigger: 'Member submitted a support ticket',
  subjects: ['We have your request — ticket {{ data.ticketNo }}', 'Ticket {{ data.ticketNo }} received: {{ data.subject }}', 'Your Turn2Opinion support request is logged'],
  subjectsSample: ['We have your request — ticket TKT-20931', 'Ticket TKT-20931 received: Points not showing for survey SV-31207', 'Your Turn2Opinion support request is logged'],
  preheader: 'Your request is logged and with our team. Expect a reply within 24 to 48 hours.',
  cta: null,
  reason: 'You are receiving this because you submitted a support request to Turn2Opinion.',
};

export const text = () => `We have your request - ticket ${tk.no()}

Hi ${tkUser.name()},

Thank you for contacting Turn2Opinion. Your support request has been
logged and our team is reviewing it.

${kv([['Ticket number', tk.no()], ['Status', 'Open, with our support team'], ['Response time', 'Within 24 to 48 hours']])}

WHAT HAPPENS NEXT
Our team will review your request and reply with an update. You do not
need to do anything in the meantime.

PLEASE DO NOT REPLY TO THIS EMAIL
Replies to this address are not monitored. To add details or respond,
use the Support Ticket system on your account, quoting ${tk.no()}.
${textFoot(meta.reason)}`;

export default function TicketCreatedUser() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Support" reason={meta.reason}>
      <Stage tone="blue" eyebrow="Ticket received" hero="14-ticket-created-user"
        alt="A member in a sky portal beside a headset tile and a chat tile"
        title={<>We have your request &mdash; <span style={{ color: '#FFD872' }}>our team is on it</span>.</>}
        sub="Your ticket is logged and with our support team. You don’t need to do anything in the meantime."
        facts={[{ text: <>{tk.no()}</> }, { text: 'Reply in 24–48 h', dot: '#9FD6FF' }, { text: 'Nothing to do', dot: '#7FF0CF' }]} />

      <Hello name={tkUser.name()}>
        <Lead>Thank you for contacting Turn2Opinion. Your support request has been logged and our team is reviewing it.</Lead>
      </Hello>

      <Facts title="Your ticket" rows={[
        { k: 'Ticket number', v: tk.no() },
        { k: 'Status', v: 'Open, with our support team', color: '#1544C9' },
        { k: 'Response time', v: 'Within 24 to 48 hours' },
      ]} />

      <Journey label="What happens next" steps={[
        { state: 'done', label: 'Request received and logged' },
        { state: 'now', label: 'Our team reviews it', note: 'Usually within 24 to 48 hours', chip: 'In review' },
        { state: 'next', label: 'We reply with an update', note: 'By email and on your account' },
      ]} />

      <Note icon="chat-blue" tint="blue" title="Please don’t reply to this email">
        Replies to this address aren&rsquo;t monitored. To add details or respond, use the Support Ticket system on your account, quoting <strong>{tk.no()}</strong>.
        Quick answers are often in the <a href={url.faq()} style={{ color: '#1F5BFF', fontWeight: 700 }}>Member FAQ</a>.
      </Note>

      <Signoff line="Thanks for your patience — we’ll be in touch soon." who="Turn2Opinion Support" />
    </Frame>
  );
}
