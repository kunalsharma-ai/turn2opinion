/**
 * ticket-updated-user — a member's ticket received a reply.
 * Merge fields: reply.ticketNo, reply.message (rendered unescaped, as the original —
 * sanitise in the backend), repliedBy.fullName
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Facts, ChatQuote, Note, Signoff } from '../components/Mail.jsx';
import { rep, url, tkUser } from '../lib/fields.js';
import { subject, isLiquid } from '../lib/liquid.js';
import { Raw } from '../components/Mail.jsx';
import { textFoot, kv } from '../lib/text.js';

export const meta = {
  id: 'ticket-updated-user', code: '16', n: 20, name: 'Ticket updated — member', kind: 'Support', group: 'Support',
  tone: 'mint', transactional: true, source: 'ticket-updated-user.liquid',
  trigger: 'A ticket the member opened received a reply',
  subjects: ['Update on your ticket {{ reply.ticketNo }}', 'We’ve replied to ticket {{ reply.ticketNo }}', 'Turn2Opinion support: a new reply for you'],
  subjectsSample: ['Update on your ticket TKT-20931', 'We’ve replied to ticket TKT-20931', 'Turn2Opinion support: a new reply for you'],
  preheader: 'A new message has been added to your support ticket. The full reply is inside.',
  cta: null,
  reason: 'You are receiving this because a support ticket you opened has been updated.',
};

export const text = () => `Update on your ticket ${rep.no()}

A new message has been added to your support ticket.

${kv([['Ticket number', rep.no()], ['Status', 'Updated']])}

LATEST UPDATE
${rep.message()}

PLEASE DO NOT REPLY TO THIS EMAIL
Replies to this address are not monitored. To respond or add details,
use the Support Ticket system on your account, quoting ${rep.no()}.
${textFoot(meta.reason)}`;

export default function TicketUpdatedUser() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Support" reason={meta.reason}>
      <Stage tone="mint" eyebrow="New reply" hero="16-ticket-updated-user"
        alt="A member with a laptop in a mint portal beside a chat tile with a tick and a headset tile"
        title={<>There&rsquo;s a <span style={{ color: '#FFE08A' }}>new reply</span> on your ticket.</>}
        sub="Our support team has added a message. You’ll find the full text below."
        facts={[{ text: <>{rep.no()}</> }, { text: 'Updated', dot: '#FFE08A' }]} />

      <Hello hi="Hello" name="again">
        <Lead>A new message has been added to your support ticket.</Lead>
      </Hello>

      <ChatQuote who={rep.by()} label="Latest update">
        {isLiquid() ? <Raw html={'{{ reply.message }}'} /> : rep.message()}
      </ChatQuote>

      <Facts title="Your ticket" rows={[
        { k: 'Ticket number', v: rep.no() },
        { k: 'Status', v: 'Updated', color: '#0B7D63' },
      ]} />

      <Note icon="chat-blue" tint="blue" title="Please don’t reply to this email">
        Replies to this address aren&rsquo;t monitored. To respond or add details, use the Support Ticket system on your account, quoting <strong>{rep.no()}</strong>.
        You can also browse the <a href={url.faq()} style={{ color: '#1F5BFF', fontWeight: 700 }}>Member FAQ</a>.
      </Note>

      <Signoff line="We hope that helps." who="Turn2Opinion Support" />
    </Frame>
  );
}
