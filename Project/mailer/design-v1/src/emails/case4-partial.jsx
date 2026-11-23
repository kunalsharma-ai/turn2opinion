/**
 * LIFECYCLE 4 — About-you profiles done, surveys partly complete.
 * The only lifecycle case with something to celebrate, so it banks the win first.
 * Every number is derived in Liquid from profile.completed_count.
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Journey, Cta, Ask, Cards, Stats, KingdomTrack, Bar, Note, Signoff, Row, Payouts } from '../components/Mail.jsx';
import { link, mem, pf, LEVELS, SAMPLE_DONE, TOTAL, levelName, nextLevel, CONDUCT_NOTE } from '../lib/data.js';
import { subject } from '../lib/liquid.js';
import { textFoot } from '../lib/text.js';
import { C, FONT } from '../lib/theme.js';

const CMP = 'case4-partial';
const HL = { color: '#FFE08A' };

export const meta = {
  id: 'case4-partial', code: 'L4', n: 4, name: 'Partial profiles', kind: 'Lifecycle', group: 'Lifecycle reminders',
  tone: 'mint', transactional: false, source: 'MFR case4-partial',
  trigger: 'About-you profiles complete, surveys outstanding',
  subjects: [
    '{{ member.first_name | default: "Hi" }}, {{ profile.completed_count | times: 50 }} points banked — your next survey is open',
    'Your kingdom is growing. The next building is one survey away',
    '{{ profile.total_count | default: 37 | minus: profile.completed_count }} buildings still waiting in your Opinion Kingdom',
  ],
  subjectsSample: [
    'Aarav, 200 points banked — your next survey is open',
    'Your kingdom is growing. The next building is one survey away',
    '33 buildings still waiting in your Opinion Kingdom',
  ],
  preheader: 'Your About-you profiles are done. Surveys now open one at a time — the next is ready for you.',
  cta: { label: 'Continue my next survey', dest: 'links.profiles' },
  secondary: { label: 'See my kingdom', dest: 'links.account' },
  reason: 'You are receiving this because you have unfinished Turn2Opinion profiles and surveys.',
};

export const text = () => `WHY YOU'RE GETTING THIS
${pf.done()} buildings raised - and ${pf.left()} still waiting.
Your About-you profiles are done and surveys are open. Each one you finish
opens the next, and widens the studies you're matched to.

Hi ${mem.first()},

Your kingdom is a ${levelName()} now: ${pf.done()} items complete,
${pf.points()} Opinion Points and a quality score of ${pf.quality()}.

WHERE YOU ARE
  Items complete     ${pf.done()} of ${pf.total()}
  Opinion Points     ${pf.points()}
  Quality score      ${pf.quality()}
  Kingdom level      ${levelName()}
  Next level         ${nextLevel()}

WHAT'S STILL OPEN
  [done]  Your About-you profiles (Basic, Educational) are complete.
  [open]  ${pf.left()} surveys are still sealed - each opens when you finish the one before.
Next up: ${pf.nextName()}. Every survey earns +50 points and +1 quality score.

CONTINUE MY NEXT SURVEY
${link.profiles(CMP)}

See my kingdom: ${link.account(CMP)}

WHY KEEP GOING
  - Same reward for every item: +50 points and +1 quality score.
  - Category surveys open the studies you're not yet seen for -
    banking, tech, travel, B2B and more.
  - Your answers are saved as you go - pick up where you left off.
  - ${pf.pointsLeft()} points still to earn, at your own pace.

${CONDUCT_NOTE}
${textFoot(meta.reason, { prefs: link.prefs(), unsub: link.unsub() })}`;

export default function Case4() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="Your profiles" reason={meta.reason}
           recipient={mem.email()} prefs={link.prefs()} unsub={link.unsub()}>
      <Stage
        tone="mint" eyebrow="Nice work — here’s where you are" hero="c4-partial"
        alt="A member pointing upward in a violet portal, beside a finished castle, two +50 coins and a quality gem"
        title={<>{pf.done()} buildings raised &mdash; <span style={HL}>{pf.left()} still waiting</span>.</>}
        sub="Your About-you profiles are done and surveys are open. Each one you finish opens the next — and widens the studies you’re matched to."
        facts={[{ text: <>{pf.points()} points banked</> }, { text: <>Level: {levelName()}</>, dot: '#FFE3A3' }, { text: nextLevel(), dot: '#9FD6FF' }]}
      />

      <Hello name={mem.first()}>
        <Lead>Your kingdom is a <strong style={{ color: C.ink }}>{levelName()}</strong> now. That&rsquo;s the hard part done &mdash; the About-you profiles are behind you.</Lead>
      </Hello>

      <Stats items={[
        { img: 'coin', value: pf.points(), label: 'Opinion Points banked', color: C.goldText, tint: 'gold' },
        { img: 'gem', value: pf.quality(), label: 'Quality score', color: C.violetD, tint: 'violet' },
        { img: 'castle', value: <>{pf.done()}<span style={{ fontSize: '15px', color: C.muted }}> / {pf.total()}</span></>, label: 'Buildings raised', color: C.blueD, tint: 'blue' },
      ]} />

      <KingdomTrack levels={LEVELS} n={SAMPLE_DONE} />

      <Row py={8}>
        <Bar pct={Math.round((SAMPLE_DONE / TOTAL) * 100)} liquidPct="profile.completed_count | default: 0 | times: 100 | divided_by: t2o_total"
             left={<>{pf.done()} of {pf.total()} complete</>} right={<>{pf.pointsLeft()} points still to earn</>} />
      </Row>

      <Journey
        label="What’s still open"
        steps={[
          { state: 'done', label: 'Your About-you profiles — Basic and Educational — are complete.' },
          { state: 'now', label: <>Next up: {pf.nextName()}</>, note: '+50 points · +1 quality score', chip: 'Open now' },
          { state: 'next', label: <>{pf.left()} surveys still sealed</>, note: 'Each one opens when you finish the one before.', chip: 'Sealed' },
        ]}
      />

      <Cta href={link.profiles(CMP)} label="Continue my next survey" secondary={{ href: link.account(CMP), label: 'See my kingdom' }} />

      <Ask q="Why keep going?">
        <Cards items={[
          { icon: 'coin-gold', tint: 'gold', title: 'Same reward, every time', text: 'Every survey earns +50 points and +1 quality score — the long ones and the short ones.' },
          { icon: 'target-blue', tint: 'blue', title: 'More studies see you', text: 'Category surveys open the studies you’re not yet matched to — banking, tech, travel, B2B.' },
          { icon: 'refresh-blue', tint: 'mist', title: 'Saved as you go', text: 'Stop any time. Your answers are kept and you pick up exactly where you left off.' },
          { icon: 'trophy-gold', tint: 'violet', title: 'Towards Legendary', text: 'Town at 5, City at 10, Kingdom at 18, Empire at 28 — every building counts.' },
        ]} />
      </Ask>

      <Row py={10}>
        <table role="presentation" width="100%" border="0" cellPadding="0" cellSpacing="0" bgcolor={C.ink}
               style={{ backgroundColor: C.ink, backgroundImage: 'linear-gradient(120deg,#0A1238,#1F3FB0)', borderRadius: '24px' }}>
          <tbody><tr><td style={{ padding: '24px 26px' }}>
            <p style={{ margin: '0 0 6px', fontFamily: FONT.body, fontSize: '11.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#9FD6FF' }}>Where you’re heading</p>
            <p style={{ margin: 0, fontFamily: FONT.display, fontSize: '21px', lineHeight: 1.3, fontWeight: 800, color: '#FFFFFF' }}>
              {pf.left()} buildings and {pf.pointsLeft()} points still to earn &mdash; at your own pace.
            </p>
          </td></tr></tbody>
        </table>
      </Row>

      <Payouts />

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">{CONDUCT_NOTE}</Note>

      <Signoff line="Your next building is one survey away." />
    </Frame>
  );
}
