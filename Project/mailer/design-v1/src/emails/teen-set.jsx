/**
 * The twelve Teen registration emails (13–17), in the v1 design.
 *
 * Copy, merge fields and links are exactly those of the Teen templates that were live before
 * this design (Project/mailer/tools/teen-emails.py, PR #10): the guardian's YES / NO decision,
 * onboarding and consent links, the Teen's password link and the reminders. Only the look changed.
 *
 * Merge fields used (all already sent by the backend for these templates):
 *   user.name.first, user.mail, user._id, user.parent.name.first, user.parent.decision,
 *   user.parent.onboardingAt, relation, parentMasked, ref, site, links.yes, links.no, links.open,
 *   activate, otp.code, otp.sig, notRecognised, record.version, record.acceptedAt, record.selections.*
 *
 * Guardian emails use the violet stage (parent / guardian), Teen emails the coral and mint stages.
 * No rewards, cash or referral content appears in any Teen email.
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Button, Facts, Row, Note, Steps, Checks, Signoff, P, Sp, Raw, A } from '../components/Mail.jsx';
import { v, L, isLiquid, subject } from '../lib/liquid.js';
import { C } from '../lib/theme.js';

/* ── merge fields ─────────────────────────────────────────────────────────── */
const teen = () => v('user.name.first', 'Riya');
const parent = () => v('user.parent.name.first', 'Meera');
const rel = () => v('relation', 'mother');
const masked = () => v('parentMasked', 'm••••a@e•••••.com');
const ref = () => v('ref', 'T2O-TN-4F2A9C');
const mail = () => v('user.mail', 'riya.shah@example.com');
const site = () => (isLiquid() ? '{{ site }}' : 'https://www.turn2opinion.com');
const links = {
  yes: () => (isLiquid() ? '{{ links.yes }}' : 'https://www.turn2opinion.com/parent-consent/?d=yes'),
  no: () => (isLiquid() ? '{{ links.no }}' : 'https://www.turn2opinion.com/parent-consent/?d=no'),
  open: () => (isLiquid() ? '{{ links.open }}' : 'https://www.turn2opinion.com/parent-consent/?d=open'),
};
const activate = () => (isLiquid()
  ? '{% if activate %}{{ activate }}{% else %}{{ site }}/join/teen/?user={{ user._id }}&code={{ otp.code }}&s={{ otp.sig }}&activate=1{% endif %}'
  : 'https://www.turn2opinion.com/join/teen/?user=6720b4c1e9f3&code=602914&s=ab12&activate=1');
const b = (x) => <strong style={{ color: C.ink }}>{x}</strong>;

/* Liquid if / else in the template, one branch in the sample render. */
const IfElse = ({ cond, sample = true, yes, no = null }) => (isLiquid()
  ? <>{<Raw html={`{% if ${cond} %}`} />}{yes}{no && <Raw html="{% else %}" />}{no}{<Raw html="{% endif %}" />}</>
  : (sample ? yes : no));

/* ── shared pieces ────────────────────────────────────────────────────────── */
const GUARDIAN_REASON = () => <>You are receiving this because a Teen gave this address as their {rel()}. We use it only for this registration, consent and account notices, never for marketing. Links in this email are personal and time-limited: please do not forward it.</>;
const TEEN_REASON = 'Teen panel members are 13 to 17. We never sell your data, never show you ads in surveys and never ask for your school name or home address.';

function Reference({ teenMail = false }) {
  return (
    <Note icon={teenMail ? 'id-navy' : 'shield-violet'} tint={teenMail ? 'mist' : 'violet'} title="Your registration reference">
      <span style={{ fontFamily: "'SFMono-Regular',Consolas,monospace", fontWeight: 700, color: C.ink, letterSpacing: '.06em' }}>{ref()}</span>
      <br />
      {teenMail
        ? 'Your username is your email address. We will never email you a password.'
        : <>Questions, or want your details removed? Write to <A href="mailto:support@turn2opinion.com">support@turn2opinion.com</A> and quote this reference.</>}
      <br />
      <A href={`${site()}/privacy/`}>Privacy Policy</A> · <A href={`${site()}/terms/`}>Terms</A>
      {teenMail && <> · <A href={`${site()}/earn/teens/`}>How the Teen panel works</A></>}
    </Note>
  );
}

function YesNo({ q, yes = 'YES — I want to enrol my Teen', no = 'NO — I do not want to enrol my Teen', foot }) {
  return (
    <Row py={14} align="center">
      {q && <P size={18} color={C.ink} weight={800} align="center">{q}</P>}
      <Button href={links.yes()} label={yes} width={320} />
      <Sp h={12} />
      <Button href={links.no()} label={no} width={320} ghost />
      {foot && <P size={13.5} color={C.muted} mb={0} align="center"><span style={{ display: 'block', paddingTop: '12px' }}>{foot}</span></P>}
    </Row>
  );
}

const G = (m) => ({ tone: 'violet', transactional: true, kind: 'Parent / guardian', group: 'Teen registration (13–17)', ...m });
const T = (m) => ({ tone: 'coral', transactional: true, kind: 'Teen panel', group: 'Teen registration (13–17)', ...m });

/* ── 1. Teen: registration received ───────────────────────────────────────── */
const requestChild = {
  meta: T({
    id: 'minor-request-child', code: 'T1', name: 'Teen registration received', source: 'minor-request-child.liquid',
    trigger: 'A Teen registers; the guardian invitation has been sent',
    subjects: ['Your Teen registration is in', '{{ user.name.first }}, your request is in!', 'Next step: your parent or guardian decides'],
    subjectsSample: ['Your Teen registration is in', 'Riya, your request is in!', 'Next step: your parent or guardian decides'],
    preheader: 'Your Teen registration is in. Next, your parent or guardian decides.',
    cta: null,
  }),
  text: () => `Nice one, ${teen()}. Your request is in!

We saved your registration and sent an invitation to your ${rel()} at ${masked()}. They decide whether you can join, then fill in a short onboarding form and a consent form.

WHAT HAPPENS NEXT
  1. Your ${rel()} opens our email and chooses Yes or No.
  2. If yes, they complete the onboarding and consent forms.
  3. We email you a secure link to create your password.
  4. You log in with this email address. Your account is switched on.

Your account is not active yet. Nothing to do for now. Maybe give your ${rel()} a heads-up to check their inbox (and spam folder).

Registration reference: ${ref()}
Questions? support@turn2opinion.com`,
  Component: () => (
    <Frame title={subject(requestChild.meta)} preheader={requestChild.meta.preheader} kind="Teen panel" reason={TEEN_REASON}>
      <Stage tone="coral" eyebrow="Teen registration received" hero="10-minor-permitted-child"
        alt="A teen with a phone inside a portal, beside a paper-plane tile"
        title={<>Nice one, {teen()}. <span style={{ color: '#FFE08A' }}>Your request is in!</span></>}
        sub={<>We sent an invitation to your {rel()} at {masked()}. They decide whether you can join.</>}
        facts={[{ text: 'Account not active yet' }, { text: 'Nothing to do for now', dot: '#9FD6FF' }]} />
      <Hello name={teen()}>
        <Lead>We saved your registration. Your {rel()} decides whether you can join, then fills in a short onboarding form and a consent form.</Lead>
      </Hello>
      <Row py={10}>
        <Steps items={[
          { title: <>Your {rel()} opens our email and chooses Yes or No.</> },
          { title: 'If yes, they complete the onboarding and consent forms.' },
          { title: <>We email {b('you')} a secure link to create your password.</> },
          { title: 'You log in with this email address. Your account is switched on.' },
        ]} />
      </Row>
      <Note icon="bell-coral" tint="coral" title="Your account is not active yet">
        Nothing to do for now. Maybe give your {rel()} a heads-up to check their inbox (and spam folder).
      </Note>
      <Reference teenMail />
      <Signoff line="Thanks for wanting to share your opinion with us." />
    </Frame>
  ),
};

/* ── 2. Guardian: invitation with YES / NO ────────────────────────────────── */
const minor = {
  meta: G({
    id: 'minor', code: 'T2', name: 'Guardian invitation (Yes / No)', source: 'minor.liquid',
    trigger: 'A Teen registers and names this guardian',
    subjects: ['{{ user.name.first }} would like to join the Turn2Opinion Teen panel', 'Your decision is needed: {{ user.name.first }}’s Teen registration', 'Please choose Yes or No for {{ user.name.first }}'],
    subjectsSample: ['Riya would like to join the Turn2Opinion Teen panel', 'Your decision is needed: Riya’s Teen registration', 'Please choose Yes or No for Riya'],
    preheader: '{{ user.name.first }} asked to join the Turn2Opinion Teen panel. Please choose Yes or No.',
    cta: { label: 'YES / NO', dest: 'links.yes / links.no' },
  }),
  text: () => `${teen()} would like to join the Turn2Opinion Teen panel

Dear ${parent()},

${teen()} has registered for the Turn2Opinion Teen panel and named you as their ${rel()}. Teens aged 13 to 17 can join only with the permission of a parent or legal guardian, so nothing happens without your decision.

WHAT THE TEEN PANEL IS
Turn2Opinion is a market research panel. Teen members are invited to short, age-appropriate online surveys about things like technology, entertainment, shopping and everyday life, and can earn rewards for completed surveys. Taking part is free and voluntary: your teen can skip any question or stop at any time, and nothing has to be bought.

HOW IT WORKS IF YOU SAY YES
  1. You review your teen's request and confirm you are their parent or legal guardian.
  2. You fill in a short onboarding form about you (about 3 minutes).
  3. You read the Teen participation agreement and tick the permissions you give.
  4. We email your teen a secure link to create their own password. You get a confirmation.

DO YOU WANT TO ENROL ${teen()} IN THE TEEN PANEL?
YES - I want to enrol my Teen: ${links.yes()}
NO - I do not want to enrol my Teen: ${links.no()}
Both links open a secure page where you can confirm your choice. This link expires in 7 days.

WHAT WE WILL ASK YOU
Your name, date of birth, country and region, your relationship to the teen, how you prefer to be contacted, and three optional questions about your teen's health that help us keep unsuitable studies away from them. Then three required permissions and three optional ones.

Did not expect this email? Choose No and tell us you do not recognise the request. The registration will be closed and no account will be created.

Registration reference: ${ref()}
Questions, or want your details removed? support@turn2opinion.com`,
  Component: () => (
    <Frame title={subject(minor.meta)} preheader={minor.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="violet" eyebrow="Your decision is needed" hero="08-minor"
        alt="An adult inside a sky portal beside a shield tile and a clipboard tile"
        title={<><span style={{ color: '#FFE08A' }}>{teen()}</span> would like to join the Turn2Opinion Teen panel.</>}
        sub="Teens aged 13 to 17 can join only with the permission of a parent or legal guardian, so nothing happens without your decision."
        facts={[{ text: 'Your decision' }, { text: 'Link valid 7 days', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()}>
        <Lead>{teen()} has registered for the Turn2Opinion Teen panel and named you as their {b(rel())}.</Lead>
      </Hello>
      <Note icon="clipboard-violet" tint="violet" title="What the Teen panel is">
        Turn2Opinion is a market research panel. Teen members are invited to short, age-appropriate online surveys about things like technology, entertainment, shopping and everyday life, and can earn rewards for completed surveys. Taking part is free and voluntary: your teen can skip any question or stop at any time, and nothing has to be bought.
      </Note>
      <Row py={14}>
        <P size={16} color={C.ink} weight={800}>How it works if you say yes</P>
        <Steps items={[
          { title: 'You review your teen’s request and confirm you are their parent or legal guardian.' },
          { title: 'You fill in a short onboarding form about you (about 3 minutes).' },
          { title: 'You read the Teen participation agreement and tick the permissions you give.' },
          { title: 'We email your teen a secure link to create their own password. You get a confirmation.' },
        ]} />
      </Row>
      <YesNo q={<>Do you want to enrol {teen()} in the Teen panel?</>}
        foot="Both buttons open a secure page where you can confirm your choice. This link expires in 7 days." />
      <Note icon="eye-navy" tint="blue" title="What we will ask you">
        Your name, date of birth, country and region, your relationship to the teen, how you prefer to be contacted, and three optional questions about your teen’s health that help us keep unsuitable studies away from them. Then three required permissions and three optional ones.
      </Note>
      <Row py={6}><P size={14} color={C.muted} mb={0}>Did not expect this email? Choose {b('No')} and tell us you do not recognise the request. The registration will be closed and no account will be created.</P></Row>
      <Reference />
      <Signoff line="Thank you for taking a moment to decide." />
    </Frame>
  ),
};

/* ── 3. Guardian: decision Yes recorded ───────────────────────────────────── */
const parentApproved = {
  meta: G({
    id: 'teen-parent-approved', code: 'T3', name: 'Guardian said Yes', source: 'teen-parent-approved.liquid', tone: 'mint',
    trigger: 'The guardian chose Yes',
    subjects: ['Thank you. Two short steps left', 'Decision recorded: Yes', 'Finish {{ user.name.first }}’s enrolment'],
    subjectsSample: ['Thank you. Two short steps left', 'Decision recorded: Yes', 'Finish Riya’s enrolment'],
    preheader: 'Thank you for saying yes. Two short forms left.',
    cta: { label: 'Continue the onboarding form', dest: 'links.open' },
  }),
  text: () => `Thank you. Two short steps left

Dear ${parent()}, you chose to enrol ${teen()} in the Teen panel. To finish, please complete:
  1. The onboarding form: a few questions about you, about 3 minutes.
  2. The consent form: the Teen participation agreement and your permissions.

If you closed the page, this link takes you back to where you left off:
${links.open()}

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(parentApproved.meta)} preheader={parentApproved.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="mint" eyebrow="Decision recorded: Yes" hero="09-minor-permitted-parent"
        alt="An adult inside a portal beside a shield tile with a green tick"
        title={<>Thank you. <span style={{ color: '#FFE08A' }}>Two short steps left.</span></>}
        sub={<>You chose to enrol {teen()} in the Teen panel.</>}
        facts={[{ text: 'About 3 minutes' }, { text: 'Pick up where you left off', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()}><Lead>To finish, please complete:</Lead></Hello>
      <Row py={8}>
        <Steps items={[
          { title: 'The onboarding form', text: 'A few questions about you, about 3 minutes.' },
          { title: 'The consent form', text: 'The Teen participation agreement and your permissions.' },
        ]} />
      </Row>
      <Cta href={links.open()} label="Continue the onboarding form" note="If you closed the page, this button takes you back to where you left off." />
      <Reference />
      <Signoff line="Thank you for helping your teen take part safely." />
    </Frame>
  ),
};

/* ── 4. Guardian: decision No recorded ────────────────────────────────────── */
const parentDeclined = {
  meta: G({
    id: 'teen-parent-declined', code: 'T4', name: 'Guardian said No', source: 'teen-parent-declined.liquid', tone: 'night',
    trigger: 'The guardian chose No',
    subjects: ['We have recorded your decision', 'Decision recorded: No', 'No Teen account will be created'],
    preheader: 'Your decision is recorded. No Teen account will be created.',
    cta: null,
  }),
  text: () => `We have recorded your decision

Dear ${parent()}, thank you for letting us know. ${teen()}'s Teen registration will not go ahead.

WHAT THIS MEANS
  - No Teen account has been activated and no password link will be sent.
  - ${teen()} cannot take part in surveys or other panel activities.
  - We have let ${teen()} know, without sharing the reasons you gave.
${isLiquid() ? '{% if notRecognised %}' : ''}
You told us you did not recognise this request or are not the right guardian. Our team will review it. If you would like the registration details deleted now, reply to support with the reference below.
${isLiquid() ? '{% endif %}' : ''}
Changed your mind later? Your teen can register again, and you will receive a new invitation.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(parentDeclined.meta)} preheader={parentDeclined.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="night" eyebrow="Decision recorded: No" hero="08-minor"
        alt="An adult inside a portal beside a shield tile"
        title="We have recorded your decision."
        sub={<>{teen()}’s Teen registration will not go ahead.</>}
        facts={[{ text: 'No account created' }, { text: 'No password link sent', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()}><Lead>Thank you for letting us know.</Lead></Hello>
      <Row py={8}>
        <P size={16} color={C.ink} weight={800}>What this means</P>
        <Checks tone="violet" items={[
          'No Teen account has been activated and no password link will be sent.',
          <>{teen()} cannot take part in surveys or other panel activities.</>,
          <>We have let {teen()} know, without sharing the reasons you gave.</>,
        ]} />
      </Row>
      <IfElse cond="notRecognised" sample={false} yes={(
        <Note icon="eye-navy" tint="coral" title="You did not recognise this request">
          You told us you did not recognise this request or are not the right guardian. Our team will review it. If you would like the registration details deleted now, reply to support with the reference below.
        </Note>
      )} />
      <Row py={6}><P size={14.5} color={C.muted} mb={0}>Changed your mind later? Your teen can register again, and you will receive a new invitation.</P></Row>
      <Reference />
      <Signoff line="Thank you for your time." />
    </Frame>
  ),
};

/* ── 5. Guardian: onboarding and consent complete ─────────────────────────── */
const yn = (k) => (isLiquid() ? `{% if record.selections.${k} %}yes{% else %}no{% endif %}` : (k === 'studyContact' ? 'yes' : 'no'));
const permittedParent = {
  meta: G({
    id: 'minor-permitted-parent', code: 'T5', name: 'Guardian consent complete', source: 'minor-permitted-parent.liquid', tone: 'mint',
    trigger: 'The guardian finished the onboarding and consent forms',
    subjects: ['All done. Thank you, {{ user.parent.name.first }}', 'Onboarding complete for {{ user.name.first }}', 'Your consent record'],
    subjectsSample: ['All done. Thank you, Meera', 'Onboarding complete for Riya', 'Your consent record'],
    preheader: 'Onboarding and consent complete. Your teen is getting their password link.',
    cta: null,
  }),
  text: () => `All done. Thank you, ${parent()}

You have completed the onboarding form and given consent for ${teen()} to join the Turn2Opinion Teen panel. We have sent ${teen()} a secure link to create their own password.

YOUR CONSENT RECORD
  Agreement: ${v('record.version | default: "MINOR-2026.10"', 'MINOR-2026.10')}
  Recorded: ${v('record.acceptedAt | date: "%d %B %Y, %H:%M UTC"', '23 November 2026, 11:55 UTC')}
  Required permissions: participation, privacy notice, contact by email
  Optional: study contact ${yn('studyContact')} · recordings ${yn('recording')} · sensitive topics ${yn('sensitive')}

You can withdraw consent, change the optional permissions or ask us to delete ${teen()}'s account at any time by writing to support with the reference below. Your teen's account and your guardian record are kept separately.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(permittedParent.meta)} preheader={permittedParent.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="mint" eyebrow="Onboarding complete" hero="09-minor-permitted-parent"
        alt="An adult inside a portal beside a shield tile with a green tick"
        title={<>All done. <span style={{ color: '#FFE08A' }}>Thank you, {parent()}.</span></>}
        sub={<>We have sent {teen()} a secure link to create their own password.</>}
        facts={[{ text: 'Consent recorded' }, { text: 'Password link sent to your teen', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()}>
        <Lead>You have completed the onboarding form and given consent for {teen()} to join the Turn2Opinion Teen panel.</Lead>
      </Hello>
      <Facts title="Your consent record" rows={[
        { k: 'Agreement', v: v('record.version | default: "MINOR-2026.10"', 'MINOR-2026.10') },
        { k: 'Recorded', v: v('record.acceptedAt | date: "%d %B %Y, %H:%M UTC"', '23 November 2026, 11:55 UTC') },
        { k: 'Required permissions', v: 'Participation, privacy notice, contact by email' },
        { k: 'Optional', v: <>Study contact {yn('studyContact')} · recordings {yn('recording')} · sensitive topics {yn('sensitive')}</> },
      ]} />
      <Note icon="shield-violet" tint="violet" title="You stay in control">
        You can withdraw consent, change the optional permissions or ask us to delete {teen()}’s account at any time by writing to support with the reference below. Your teen’s account and your guardian record are kept separately.
      </Note>
      <Reference />
      <Signoff line="Thank you for helping your teen take part safely." />
    </Frame>
  ),
};

/* ── 6. Teen: create your password ────────────────────────────────────────── */
const permittedChild = {
  meta: T({
    id: 'minor-permitted-child', code: 'T6', name: 'Teen: create your password', source: 'minor-permitted-child.liquid', tone: 'mint',
    trigger: 'The guardian finished consent; the Teen can set a password',
    subjects: ['{{ user.name.first }}, you are in! Create your password', 'You are approved', 'Switch on your Teen account'],
    subjectsSample: ['Riya, you are in! Create your password', 'You are approved', 'Switch on your Teen account'],
    preheader: 'Your parent or guardian said yes. Create your password to switch on your account.',
    cta: { label: 'Create my password', dest: 'activate (or site/join/teen/?user=…&code=…&s=…&activate=1)' },
  }),
  text: () => `${teen()}, you are in! Create your password

Your ${rel()} has completed the onboarding and consent forms. The last step is yours: choose a password and your Teen account switches on.

CREATE MY PASSWORD
${activate()}

Your username is your email address: ${mail()}
The link works once and for 7 days. Expired? Use "Forgot password" on the login page or ask support for a new one.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(permittedChild.meta)} preheader={permittedChild.meta.preheader} kind="Teen panel" reason={TEEN_REASON} recipient={mail()}>
      <Stage tone="mint" eyebrow="You are approved" hero="10-minor-permitted-child"
        alt="A teen with a phone inside a portal, beside a key tile"
        title={<>{teen()}, you are in! <span style={{ color: '#FFE08A' }}>Create your password.</span></>}
        sub={<>Your {rel()} has completed the onboarding and consent forms. The last step is yours.</>}
        facts={[{ text: 'Works once' }, { text: 'Valid 7 days', dot: '#9FD6FF' }]} />
      <Hello name={teen()}><Lead>Choose a password and your Teen account switches on.</Lead></Hello>
      <Cta href={activate()} label="Create my password" expiry="The button works once and for 7 days." showLink />
      <Facts title="Your login" rows={[
        { k: 'Username', v: mail() },
        { k: 'Expired link?', v: 'Use “Forgot password” on the login page or ask support for a new one.' },
      ]} />
      <Reference teenMail />
      <Signoff line="Welcome to the Teen panel." />
    </Frame>
  ),
};

/* ── 7. Teen: account active ──────────────────────────────────────────────── */
const activatedChild = {
  meta: T({
    id: 'teen-activated-child', code: 'T7', name: 'Teen account active', source: 'teen-activated-child.liquid', tone: 'mint',
    trigger: 'The Teen set a password',
    subjects: ['Your Teen account is switched on 🎉', 'Account active', 'Log in with your email address'],
    preheader: 'Your Teen account is active. Log in with your email address.',
    cta: { label: 'Log in now', dest: 'site/login/' },
  }),
  text: () => `Your Teen account is switched on

Your password is set. Log in any time with ${mail()} and the password you chose.

FIRST TIME IN
  1. A few quick welcome questions (we skip everything you already told us).
  2. Your profile studio: fill in topics you like, whenever you want.
  3. Survey invitations that fit your age. Skip any question, stop any time.

LOG IN NOW
${site()}/login/

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(activatedChild.meta)} preheader={activatedChild.meta.preheader} kind="Teen panel" reason={TEEN_REASON} recipient={mail()}>
      <Stage tone="mint" eyebrow="Account active" hero="02-welcome"
        alt="A member inside a portal, celebrating"
        title={<>Your Teen account is <span style={{ color: '#FFE08A' }}>switched on</span> 🎉</>}
        sub={<>Log in any time with {mail()} and the password you chose.</>}
        facts={[{ text: 'Password set' }, { text: 'Ready to log in', dot: '#9FD6FF' }]} />
      <Row py={20}>
        <P size={16} color={C.ink} weight={800}>First time in</P>
        <Steps items={[
          { title: 'A few quick welcome questions', text: 'We skip everything you already told us.' },
          { title: 'Your profile studio', text: 'Fill in topics you like, whenever you want.' },
          { title: 'Survey invitations that fit your age', text: 'Skip any question, stop any time.' },
        ]} />
      </Row>
      <Cta href={`${site()}/login/`} label="Log in now" />
      <Reference teenMail />
      <Signoff line="Have fun, and thanks for sharing your opinion." />
    </Frame>
  ),
};

/* ── 8. Teen: still waiting for the guardian ──────────────────────────────── */
const pendingChild = {
  meta: T({
    id: 'teen-pending-reminder-child', code: 'T8', name: 'Teen: still waiting', source: 'teen-pending-reminder-child.liquid',
    trigger: 'The guardian has not finished yet',
    subjects: ['Still waiting for your {{ relation }}', 'Still pending', 'Give your {{ relation }} a nudge?'],
    subjectsSample: ['Still waiting for your mother', 'Still pending', 'Give your mother a nudge?'],
    preheader: 'Still waiting for your parent or guardian. Give them a nudge?',
    cta: null,
  }),
  text: () => `Still waiting for your ${rel()}

Your ${rel()} hasn't finished the Teen panel forms yet, so your account is still switched off. We've sent them a reminder at ${masked()}.

Ask them to look for an email from Turn2Opinion (check spam too). Wrong address? Write to support with your reference and we'll help.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(pendingChild.meta)} preheader={pendingChild.meta.preheader} kind="Teen panel" reason={TEEN_REASON}>
      <Stage tone="coral" eyebrow="Still pending" hero="16-ticket-updated-user"
        alt="A member inside a portal, waiting with a message bubble"
        title={<>Still waiting for <span style={{ color: '#FFE08A' }}>your {rel()}</span>.</>}
        sub={<>We’ve sent them a reminder at {masked()}.</>}
        facts={[{ text: 'Account still switched off' }, { text: 'Reminder sent', dot: '#9FD6FF' }]} />
      <Row py={22}>
        <P size={16} color={C.ink2}>Your {rel()} hasn’t finished the Teen panel forms yet, so your account is still switched off.</P>
        <P size={16} color={C.ink2} mb={0}>Ask them to look for an email from Turn2Opinion (check spam too). Wrong address? Write to support with your reference and we’ll help.</P>
      </Row>
      <Reference teenMail />
      <Signoff line="Hang in there. We’ll email you as soon as they’re done." />
    </Frame>
  ),
};

/* ── 9. Teen: registration cannot go ahead ────────────────────────────────── */
const declinedChild = {
  meta: T({
    id: 'teen-declined-child', code: 'T9', name: 'Teen: registration update', source: 'teen-declined-child.liquid', tone: 'night',
    trigger: 'The guardian chose No',
    subjects: ['An update on your Teen registration', 'Registration update', 'Your Teen registration'],
    preheader: 'An update on your Teen registration.',
    cta: null,
  }),
  text: () => `Your Teen registration can't go ahead right now

Hi ${teen()}. Your ${rel()} decided not to enrol you in the Teen panel at this time, so we haven't created an account and won't send a password link.

That's completely okay. If things change, you can talk it through together and register again. When you turn 18 you can join the adult panel on your own.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(declinedChild.meta)} preheader={declinedChild.meta.preheader} kind="Teen panel" reason={TEEN_REASON}>
      <Stage tone="night" eyebrow="Registration update" hero="16-ticket-updated-user"
        alt="A member inside a portal with a message bubble"
        title="Your Teen registration can’t go ahead right now."
        sub={<>Your {rel()} decided not to enrol you in the Teen panel at this time.</>}
        facts={[{ text: 'No account created' }]} />
      <Hello name={teen()}>
        <Lead>We haven’t created an account and won’t send a password link.</Lead>
      </Hello>
      <Note icon="chat-mint" tint="mint" title="That’s completely okay">
        If things change, you can talk it through together and register again. When you turn 18 you can join the adult panel on your own.
      </Note>
      <Reference teenMail />
      <Signoff line="Thanks for your interest in Turn2Opinion." />
    </Frame>
  ),
};

/* ── 10. Guardian: reminder ───────────────────────────────────────────────── */
const onboardingReminder = {
  meta: G({
    id: 'teen-onboarding-reminder', code: 'T10', name: 'Guardian reminder', source: 'teen-onboarding-reminder.liquid',
    trigger: 'The guardian has not decided, or has not finished the forms',
    subjects: ['A reminder: {{ user.name.first }} is waiting for your decision', 'Friendly reminder', 'Please finish {{ user.name.first }}’s enrolment'],
    subjectsSample: ['A reminder: Riya is waiting for your decision', 'Friendly reminder', 'Please finish Riya’s enrolment'],
    preheader: 'A reminder: {{ user.name.first }} is waiting for your decision.',
    cta: { label: 'Continue / YES / NO', dest: 'links.open, links.yes, links.no' },
  }),
  text: () => `Friendly reminder

Dear ${parent()},
${isLiquid() ? '{% if user.parent.decision == "yes" %}' : ''}
You chose to enrol ${teen()} in the Teen panel. The ${isLiquid() ? '{% if user.parent.onboardingAt %}consent form is{% else %}onboarding and consent forms are{% endif %}' : 'consent form is'} still open. It takes a few minutes.
Continue where I left off: ${links.open()}
${isLiquid() ? '{% else %}' : ''}${isLiquid() ? `
${teen()} asked to join the Turn2Opinion Teen panel and named you as their ${rel()}. Please let us know your decision.
YES - enrol my Teen: ${links.yes()}
NO - do not enrol: ${links.no()}
{% endif %}` : ''}
This is a new link: earlier links no longer work. We send at most three reminders.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(onboardingReminder.meta)} preheader={onboardingReminder.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="violet" eyebrow="Friendly reminder" hero="08-minor"
        alt="An adult inside a sky portal beside a bell tile"
        title={<IfElse cond={'user.parent.decision == "yes"'} sample yes={<>Please finish {teen()}’s enrolment.</>} no={<>{teen()} is waiting for your decision.</>} />}
        sub="This is a new link: earlier links no longer work. We send at most three reminders."
        facts={[{ text: 'A few minutes' }, { text: 'New link', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()} />
      <IfElse cond={'user.parent.decision == "yes"'} sample
        yes={(
          <>
            <Row py={4}><Lead>You chose to enrol {teen()} in the Teen panel. The <IfElse cond="user.parent.onboardingAt" sample yes="consent form is" no="onboarding and consent forms are" /> still open. It takes a few minutes.</Lead></Row>
            <Cta href={links.open()} label="Continue where I left off" />
          </>
        )}
        no={(
          <>
            <Row py={4}><Lead>{teen()} asked to join the Turn2Opinion Teen panel and named you as their {rel()}. Please let us know your decision.</Lead></Row>
            <YesNo yes="YES — enrol my Teen" no="NO — do not enrol" />
          </>
        )} />
      <Reference />
      <Signoff line="Thank you for taking a moment." />
    </Frame>
  ),
};

/* ── 11. Guardian: fresh link ─────────────────────────────────────────────── */
const linkRenewed = {
  meta: G({
    id: 'teen-link-renewed', code: 'T11', name: 'Guardian: fresh link', source: 'teen-link-renewed.liquid',
    trigger: 'The earlier guardian link expired',
    subjects: ['Here is a fresh link for {{ user.name.first }}’s registration', 'New link', 'Your earlier link expired'],
    subjectsSample: ['Here is a fresh link for Riya’s registration', 'New link', 'Your earlier link expired'],
    preheader: 'Your earlier link expired. Here is a fresh one.',
    cta: { label: 'YES / NO', dest: 'links.yes / links.no' },
  }),
  text: () => `Here is a fresh link for ${teen()}'s registration

Dear ${parent()}, for your teen's safety our registration links stop working after 7 days. The earlier link has expired, so here is a new one. It also lasts 7 days.

YES - I want to enrol my Teen: ${links.yes()}
NO - I do not want to enrol my Teen: ${links.no()}

Already said yes? The Yes link takes you back to your forms. If you did not ask for a new link, you can ignore this email.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(linkRenewed.meta)} preheader={linkRenewed.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="violet" eyebrow="New link" hero="08-minor"
        alt="An adult inside a sky portal beside a clock tile"
        title={<>Here is a fresh link for <span style={{ color: '#FFE08A' }}>{teen()}</span>’s registration.</>}
        sub="For your teen’s safety our registration links stop working after 7 days. This one also lasts 7 days."
        facts={[{ text: 'Earlier link expired' }, { text: 'Valid 7 days', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()} />
      <YesNo foot="Already said yes? The Yes button takes you back to your forms. If you did not ask for a new link, you can ignore this email." />
      <Reference />
      <Signoff line="Thank you for taking a moment." />
    </Frame>
  ),
};

/* ── 12. Guardian: the Teen account is active ─────────────────────────────── */
const activatedParent = {
  meta: G({
    id: 'minor-activated-parent', code: 'T12', name: 'Guardian: Teen account active', source: 'minor-activated-parent.liquid', tone: 'mint',
    trigger: 'The Teen set a password',
    subjects: ['{{ user.name.first }}’s Teen account is now active', 'Account active', '{{ user.name.first }} has created their password'],
    subjectsSample: ['Riya’s Teen account is now active', 'Account active', 'Riya has created their password'],
    preheader: '{{ user.name.first }} has created their password. The Teen account is active.',
    cta: null,
  }),
  text: () => `${teen()}'s Teen account is now active

Dear ${parent()}, ${teen()} has created their own password, so the Teen account you approved is now active.

  - ${teen()} logs in with their own email address and password. You never need their password.
  - Every study is age-checked, and some need your separate permission first.
  - You can withdraw consent or ask us to delete the account at any time.

Registration reference: ${ref()}`,
  Component: () => (
    <Frame title={subject(activatedParent.meta)} preheader={activatedParent.meta.preheader} kind="Parent / guardian" reason={GUARDIAN_REASON()}>
      <Stage tone="mint" eyebrow="Account active" hero="09-minor-permitted-parent"
        alt="An adult inside a portal beside a shield tile with a green tick"
        title={<><span style={{ color: '#FFE08A' }}>{teen()}</span>’s Teen account is now active.</>}
        sub={<>{teen()} has created their own password.</>}
        facts={[{ text: 'Account active' }, { text: 'You stay in control', dot: '#9FD6FF' }]} />
      <Hello hi="Dear" name={parent()}><Lead>The Teen account you approved is now active.</Lead></Hello>
      <Row py={8}>
        <Checks tone="violet" items={[
          <>{teen()} logs in with their own email address and password. You never need their password.</>,
          'Every study is age-checked, and some need your separate permission first.',
          'You can withdraw consent or ask us to delete the account at any time.',
        ]} />
      </Row>
      <Reference />
      <Signoff line="Thank you for helping your teen take part safely." />
    </Frame>
  ),
};

export const TEEN = [requestChild, minor, parentApproved, parentDeclined, permittedParent, permittedChild,
  activatedChild, pendingChild, declinedChild, onboardingReminder, linkRenewed, activatedParent];
