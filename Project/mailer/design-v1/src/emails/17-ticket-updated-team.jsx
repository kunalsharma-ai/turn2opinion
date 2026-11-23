/**
 * ticket-updated-team — internal: a ticket received a new reply.
 * Merge fields: reply.ticketNo, reply.message (unescaped, as the original), repliedBy.fullName
 */
import React from 'react';
import { Frame, Stage, Facts, ChatQuote, Note, Row, P, Raw } from '../components/Mail.jsx';
import { rep } from '../lib/fields.js';
import { subject, isLiquid } from '../lib/liquid.js';
import { kv } from '../lib/text.js';

export const meta = {
  id: 'ticket-updated-team', code: '17', n: 21, name: 'Ticket updated — team', kind: 'Support', group: 'Support',
  tone: 'night', transactional: true, internal: true, source: 'ticket-updated-team.liquid',
  trigger: 'Internal: a ticket received a new reply',
  subjects: ['Ticket {{ reply.ticketNo }} updated by {{ repliedBy.fullName }}', '[T2O] Ticket {{ reply.ticketNo }} — new reply', 'Turn2Opinion support — ticket {{ reply.ticketNo }} awaiting review'],
  subjectsSample: ['Ticket TKT-20931 updated by Support Team', '[T2O] Ticket TKT-20931 — new reply', 'Turn2Opinion support — ticket TKT-20931 awaiting review'],
  preheader: 'A new message was added. Review and respond if needed.',
  cta: null,
  reason: 'Internal notification from the Turn2Opinion support system.',
};

export const text = () => `Ticket ${rep.no()} updated

A new message has been added to support ticket ${rep.no()}.

${kv([['Ticket number', rep.no()], ['Updated by', rep.by()], ['Status', 'Awaiting review']])}

LATEST RESPONSE
${rep.message()}

ACTION REQUIRED
Review the update and take the appropriate action. If a response is
required, reply through the Support Ticket system.

${meta.reason}`;

export default function TicketUpdatedTeam() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Internal · Support" reason={meta.reason} internal>
      <Stage tone="night" eyebrow="Internal notice" hero="17-ticket-updated-team"
        alt="A member in a violet portal beside a chat tile and a refresh tile"
        title={<>Ticket <span style={{ color: '#9FD6FF' }}>{rep.no()}</span> updated and awaiting review.</>}
        sub="A new message has been added to the thread. The full text is quoted below."
        facts={[{ text: <>By {rep.by()}</> }, { text: 'Awaiting review', dot: '#FFB3C4' }]} />

      <Facts py={20} title="Ticket" rows={[
        { k: 'Ticket number', v: rep.no() },
        { k: 'Updated by', v: rep.by() },
        { k: 'Status', v: 'Awaiting review', color: '#D63262' },
      ]} />

      <ChatQuote who={rep.by()} label="Latest response">
        {isLiquid() ? <Raw html={'{{ reply.message }}'} /> : rep.message()}
      </ChatQuote>

      <Note icon="bell-coral" tint="coral" title="Action required">
        Review the update and take the appropriate action. If a response is required, reply through the Support Ticket system.
      </Note>

      <Row py={18}><P size={13} color="#56618C" mb={0} align="center">Automated notification &mdash; no reply needed.</P></Row>
    </Frame>
  );
}
