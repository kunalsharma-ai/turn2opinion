/**
 * newuser — internal: a new member registered.
 * Merge fields: user.name.first, user._id
 */
import React from 'react';
import { Frame, Stage, Facts, Note, Row, P } from '../components/Mail.jsx';
import { u } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { kv } from '../lib/text.js';

export const meta = {
  id: 'newuser', code: '18', n: 22, name: 'New registration — admin', kind: 'Admin', group: 'Admin',
  tone: 'night', transactional: true, internal: true, source: 'newuser.liquid',
  trigger: 'Internal: a new member registered',
  subjects: ['New registration on Turn2Opinion', '[T2O] New member: {{ user.name.first }} ({{ user._id }})', 'Turn2Opinion — new member registered'],
  subjectsSample: ['New registration on Turn2Opinion', '[T2O] New member: Aarav (6720b4c1e9f3)', 'Turn2Opinion — new member registered'],
  preheader: 'A new member has registered successfully. Details inside.',
  cta: null,
  reason: 'Internal notification from the Turn2Opinion registration system.',
};

export const text = () => `New registration on Turn2Opinion

A new member has registered successfully.

${kv([['Name', u.first()], ['User ID', u.id()], ['Panel', 'Turn2Opinion']])}

This notification is generated automatically after a new registration.
Review the account in the admin panel if any further action is required.

${meta.reason}`;

export default function Newuser() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Internal · Admin" reason={meta.reason} internal>
      <Stage tone="night" eyebrow="Internal notice" hero="18-newuser"
        alt="A member in a gold portal beside a user tile with a plus badge and a dashboard tile"
        title={<>A new member has <span style={{ color: '#9FD6FF' }}>registered</span>.</>}
        sub="Generated automatically after a successful registration."
        facts={[{ text: 'Turn2Opinion' }, { text: 'Registered', dot: '#7FF0CF' }]} />

      <Facts py={20} title="Registration" rows={[
        { k: 'Name', v: u.first() },
        { k: 'User ID', v: u.id() },
        { k: 'Panel', v: 'Turn2Opinion' },
      ]} />

      <Note icon="dashboard-navy" tint="mist" title="Any action needed?">
        Review the account in the admin panel if any further action is required.
      </Note>

      <Row py={18}><P size={13} color="#56618C" mb={0} align="center">Automated notification &mdash; no reply needed.</P></Row>
    </Frame>
  );
}
