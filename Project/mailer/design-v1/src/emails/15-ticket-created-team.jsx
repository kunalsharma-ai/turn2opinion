/**
 * ticket-created-team — internal: a new ticket was opened.
 * Merge fields (FLAT call site): user.name, user.email, data.ticketNo, data.subject
 */
import React from 'react';
import { Frame, Stage, Facts, Note, Row, P } from '../components/Mail.jsx';
import { tkUser, tk } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { kv } from '../lib/text.js';

export const meta = {
  id: 'ticket-created-team', code: '15', n: 19, name: 'New ticket — team', kind: 'Support', group: 'Support',
  tone: 'night', transactional: true, internal: true, source: 'ticket-created-team.liquid',
  trigger: 'Internal: a member opened a support ticket',
  subjects: ['New ticket {{ data.ticketNo }}: {{ data.subject }}', '[T2O] New ticket {{ data.ticketNo }} from {{ user.name }}', 'Turn2Opinion support — new ticket {{ data.ticketNo }}'],
  subjectsSample: ['New ticket TKT-20931: Points not showing for survey SV-31207', '[T2O] New ticket TKT-20931 from Aarav Mehta', 'Turn2Opinion support — new ticket TKT-20931'],
  preheader: 'Open, awaiting first response. Member details inside.',
  cta: null,
  reason: 'Internal notification from the Turn2Opinion support system.',
};

export const text = () => `New ticket ${tk.no()}

A new support ticket has been opened on Turn2Opinion.

${kv([['Ticket number', tk.no()], ['Subject', tk.subject()], ['From', tkUser.name()], ['Email', tkUser.email()], ['Status', 'Open, awaiting first response']])}

ACTION REQUIRED
Review the ticket and respond to the member. If more information is
needed, follow up using the contact details above.

${meta.reason}`;

export default function TicketCreatedTeam() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Internal · Support" reason={meta.reason} internal>
      <Stage tone="night" eyebrow="Internal notice" hero="15-ticket-created-team"
        alt="A member holding a phone in a peach portal beside a bell tile and a clipboard tile"
        title={<>New ticket <span style={{ color: '#9FD6FF' }}>{tk.no()}</span> is waiting for a first reply.</>}
        sub={<>&ldquo;{tk.subject()}&rdquo;</>}
        facts={[{ text: 'Open' }, { text: 'Awaiting first response', dot: '#FFB3C4' }]} />

      <Facts py={20} title="Ticket" rows={[
        { k: 'Ticket number', v: tk.no() },
        { k: 'Subject', v: tk.subject() },
        { k: 'From', v: tkUser.name() },
        { k: 'Email', v: <a href={`mailto:${tkUser.email()}`} style={{ color: '#1F5BFF' }}>{tkUser.email()}</a> },
        { k: 'Status', v: 'Open, awaiting first response', color: '#D63262' },
      ]} />

      <Note icon="bell-coral" tint="coral" title="Action required">
        Review the ticket and respond to the member. If more information is needed, follow up using the contact details above.
      </Note>

      <Row py={18}><P size={13} color="#56618C" mb={0} align="center">Automated notification &mdash; no reply needed.</P></Row>
    </Frame>
  );
}
