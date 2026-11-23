/**
 * LIFECYCLE 3 — Terms accepted, no profile completed.
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Journey, Cta, Ask, Rows, Stats, KingdomTrack, Payouts, Note, Signoff, P, Sp } from '../components/Mail.jsx';
import { link, mem, FIRST_ITEMS, LEVELS, TOTAL, PER_ITEM, CONDUCT_NOTE } from '../lib/data.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';

const CMP = 'case3-noprofiles';
const HL = { color: '#FFE3A3' };

export const meta = {
  id: 'case3-noprofiles', code: 'L3', n: 3, name: 'No profiles completed', kind: 'Lifecycle', group: 'Lifecycle reminders',
  tone: 'coral', transactional: false, source: 'MFR case3-noprofiles',
  trigger: 'Registered and terms accepted, but no profile completed',
  subjects: [
    '{{ member.first_name | default: "Hi" }}, your account is active — but matching can’t see you yet',
    'Your Opinion Kingdom is still a campsite',
    'Your first 50 points are about two minutes away',
  ],
  subjectsSample: [
    'Aarav, your account is active — but matching can’t see you yet',
    'Your Opinion Kingdom is still a campsite',
    'Your first 50 points are about two minutes away',
  ],
  preheader: 'Surveys are matched on your profile. Your Basic profile takes about two minutes and earns 50 points.',
  cta: { label: 'Start my Basic profile', dest: 'links.profiles' },
  reason: 'You are receiving this because you are a Turn2Opinion member with no completed profiles.',
};

export const text = () => `WHY YOU'RE GETTING THIS
Your account is active - but matching can't see you yet.
No profile is complete, and surveys are matched on your profile.
Basic profile about 2 min · +50 points · +1 quality score

Hi ${mem.first()},

Nothing is broken. Your account is active and your terms are accepted.

WHAT'S HOLDING THINGS UP
  [done]  Your account is active and your terms are accepted.
  [open]  No profile has been completed, and surveys are matched on it.
  [open]  With nothing to match against, you aren't in the running for
          any study - which is why you haven't heard from us.
Your Basic profile takes about two minutes and fixes it.

START MY BASIC PROFILE
${link.profiles(CMP)}

HOW IT PAYS
  +${PER_ITEM} Opinion Points and +1 quality score for every profile and survey.
  ${TOTAL} items are open to you = ${TOTAL * PER_ITEM} points to earn.
  Redeem from your dashboard once you reach the minimum shown there.

YOUR OPINION KINGDOM
  ${LEVELS.map((l) => `${l.name} (${l.at})`).join(' -> ')}
  You are at Campsite. One item makes you a Hamlet.

THE ORDER THINGS OPEN IN
${FIRST_ITEMS.slice(0, 4).map((it) => `  ${it.name.padEnd(14)} ${String(it.q).padStart(2)} questions  about ${it.min} min  +50 pts  (${it.kind})`).join('\n')}
  Basic opens Educational. Educational breaks the seal on surveys,
  which then open one at a time.

Your answers are saved as you go - stop any time and pick up where you
left off.

${CONDUCT_NOTE}
${textFoot(meta.reason, { prefs: link.prefs(), unsub: link.unsub() })}`;

export default function Case3() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Your profiles" reason={meta.reason}
           recipient={mem.email()} prefs={link.prefs()} unsub={link.unsub()}>
      <Stage
        tone="coral" hero="c3-noprofiles"
        alt="A smiling member in a pink portal beside an unbuilt castle, a +50 coin and a violet quality gem"
        title={<>Your account is active &mdash; but <span style={HL}>matching can&rsquo;t see you yet</span>.</>}
        sub="No profile is complete, and surveys are matched on your profile. With nothing to match against, you aren’t in the running for any study."
        facts={[{ text: 'Basic ≈ 2 minutes' }, { text: '+50 points · +1 quality', dot: '#FFE3A3' }, { text: 'Campsite → Hamlet', dot: '#B9F2E1' }]}
      />

      <Hello name={mem.first()}>
        <Lead>Nothing is broken. That&rsquo;s simply why you haven&rsquo;t heard from us &mdash; and two minutes fixes it.</Lead>
      </Hello>

      <Journey
        label="What’s holding things up"
        steps={[
          { state: 'done', label: 'Your account is active and your terms are accepted.' },
          { state: 'warn', label: 'No profile has been completed — and surveys are matched on your profile.', chip: 'Empty' },
          { state: 'warn', label: 'With nothing to match against, you aren’t in the running for any study.', chip: 'Unmatched' },
        ]}
        note="Your Basic profile takes about two minutes and fixes it."
      />

      <Cta href={link.profiles(CMP)} label="Start my Basic profile" note="Your answers are saved as you go — stop any time and pick up where you left off." />

      <Ask q="How does it pay?">
        <P size={15} mb={4}>Every profile and survey you finish earns the same, once, and adds to your balance.</P>
      </Ask>
      <Stats py={0} items={[
        { img: 'coin', value: `+${PER_ITEM}`, label: 'Opinion Points per item', color: '#9A5B00', tint: 'gold' },
        { img: 'gem', value: '+1', label: 'Quality score per item', color: '#5A36D6', tint: 'violet' },
        { img: 'castle', value: `${TOTAL * PER_ITEM}`, label: `points across all ${TOTAL} items`, color: '#1544C9', tint: 'blue' },
      ]} />

      <KingdomTrack levels={LEVELS} n={0} />

      <Ask q="Why does Basic come first?">
        <Rows items={FIRST_ITEMS.slice(0, 4).map((it) => ({
          icon: it.icon, title: it.name, tag: it.kind, text: `${it.q} questions · about ${it.min} min · ${it.note}`, meta: '+50',
        }))} />
        <Sp h={8} />
        <P size={14} color="#56618C" mb={0}>Basic opens Educational. Educational breaks the seal on surveys, which then open one at a time &mdash; each one you finish opens the next.</P>
      </Ask>

      <Cta href={link.profiles(CMP)} label="Start my Basic profile" py={8} />

      <Payouts />

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">{CONDUCT_NOTE}</Note>

      <Signoff line="Two minutes from now, your campsite is a hamlet." />
    </Frame>
  );
}
