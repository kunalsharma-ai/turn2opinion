/**
 * parent-consent — verifiable parental consent required (full version).
 * The most compliance-sensitive template: every disclosure the original makes —
 * what is collected, why this was sent, what approving confirms, the guardian's
 * rights — is kept as live text.
 * Merge fields: user.name.first, user.parent.name.first, user.parent.relation,
 *               user._id, user.origin, otp.code
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Facts, Ask, Checks, Note, Signoff, P, A } from '../components/Mail.jsx';
import { u, url } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv, bullets } from '../lib/text.js';

export const meta = {
  id: 'parent-consent', code: '07', n: 11, name: 'Parental consent required', kind: 'Teen consent', group: 'Teen consent (13–17)',
  tone: 'violet', transactional: true, source: 'parent-consent.liquid',
  trigger: 'Registrant indicated they are under 18 and gave a guardian email',
  subjects: ['Your consent is needed for {{ user.name.first }}’s Turn2Opinion account', 'Parent or guardian approval required — Turn2Opinion', 'Please review your child’s Turn2Opinion registration'],
  subjectsSample: ['Your consent is needed for Aarav’s Turn2Opinion account', 'Parent or guardian approval required — Turn2Opinion', 'Please review your child’s Turn2Opinion registration'],
  preheader: 'The account stays inactive until a parent or guardian approves it. Declining is a perfectly ordinary answer.',
  cta: { label: 'Review and approve', dest: 'auth/parent-consent?user=…&code=…' },
  reason: 'You are receiving this because your email address was given as the parent or guardian contact during a registration.',
};

const COLLECT = ['Basic profile information such as name, age and gender', 'Survey participation responses', 'Reward-related details, if applicable'];
const CONFIRM = ['You are the legal parent or guardian', 'You approve your child’s participation', 'You understand our Privacy Policy and Terms of Use'];
const RIGHTS = ['Review the information your child has shared with us', 'Withdraw consent at any time', 'Request deletion of the account', 'Contact us for any clarification'];

export const text = () => `Your consent is required

Dear ${u.pFirst()},

Your child, ${u.first()}, has registered on Turn2Opinion, an online survey and
market research community operated by Frequent Research Fieldwork Solutions
Pvt. Ltd.

WHY YOU ARE RECEIVING THIS
During registration your child indicated that they are under the age of 18
and gave your email address as their ${u.pRel()}. Under our Child Protection
and Privacy Policy we require verified parental approval before a minor can
access the platform.

${kv([['Child', u.first()], ['Your relation', u.pRel()], ['Account status', 'Inactive, pending your approval'], ['Valid for', '24 hours']])}

WHAT WE COLLECT, WITH YOUR CONSENT
${bullets(COLLECT)}
We do not collect sensitive personal information from minors without
explicit parental approval.

BEFORE YOU APPROVE
By completing the verification you confirm that:
${bullets(CONFIRM)}

REVIEW AND APPROVE
${url.parent()}

If consent is not given, the account simply remains inactive.

YOUR RIGHTS AS A PARENT OR GUARDIAN
${bullets(RIGHTS)}
Contact: ${url.support()}
${textFoot(meta.reason)}`;

export default function ParentConsent() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Parent / guardian" reason={meta.reason}>
      <Stage tone="violet" eyebrow="For the parent or guardian" hero="07-parent-consent"
        alt="An older adult in a violet portal beside a shield tile, a family tile and a clipboard badge"
        title={<>Your child&rsquo;s registration <span style={{ color: '#FFE08A' }}>can&rsquo;t go ahead without your approval</span>.</>}
        sub={<>{u.first()} has registered on Turn2Opinion. The account stays inactive until you decide &mdash; and declining is a perfectly ordinary answer.</>}
        facts={[{ text: 'Your decision' }, { text: 'Valid 24 hours', dot: '#9FD6FF' }, { text: 'Account inactive', dot: '#FFB3C4' }]} />

      <Hello hi="Dear" name={u.pFirst()}>
        <Lead>Your child <strong style={{ color: '#0E1B4D' }}>{u.first()}</strong> has registered on Turn2Opinion. Before anything else happens, we need you.</Lead>
      </Hello>

      <Facts title="The registration" rows={[
        { k: 'Child', v: u.first() },
        { k: 'Your relation', v: u.pRel() },
        { k: 'Account status', v: 'Inactive, pending your approval', color: '#D63262' },
        { k: 'Valid for', v: '24 hours' },
      ]} />

      <Ask q="Why am I receiving this?" kicker="Why this email">
        <P size={15}>During registration your child indicated they are under the age of 18 and gave your email address as their {u.pRel()}. Under our Child Protection and Privacy Policy we require verified parental approval before a minor can access the platform.</P>
        <P size={15} mb={0}>Turn2Opinion is an online survey and market research community operated by Frequent Research Fieldwork Solutions Pvt. Ltd.</P>
      </Ask>

      <Ask q="What will you collect about my child?" kicker="Your child’s data">
        <Checks tone="violet" items={COLLECT} />
        <P size={14} color="#56618C" mb={0}>We do not collect sensitive personal information from minors without explicit parental approval.</P>
      </Ask>

      <Ask q="What am I confirming if I approve?" kicker="Before you approve">
        <Checks tone="blue" items={CONFIRM} />
      </Ask>

      <Cta href={url.parent()} label="Review and approve" expiry="This link expires 24 hours after it was sent."
           note="If consent is not given, the account simply remains inactive." showLink />

      <Note icon="users-violet" tint="violet" title="Your rights as a parent or guardian">
        Review the information your child has shared with us &middot; withdraw consent at any time &middot; request deletion of the account &middot;{' '}
        <A href={url.support()} color="#5A36D6">contact us</A> for any clarification.
      </Note>

      <Signoff line="Thank you for helping keep Turn2Opinion safe for young members." />
    </Frame>
  );
}
