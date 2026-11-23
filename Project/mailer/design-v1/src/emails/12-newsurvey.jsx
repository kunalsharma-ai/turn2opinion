/**
 * newsurvey — member matched to an open study.
 * Merge fields: user.name.first, survey.name, survey.points, survey.time, survey.link
 */
import React from 'react';
import { Frame, Stage, Hello, Lead, Cta, Stats, Ask, Checks, Note, Signoff } from '../components/Mail.jsx';
import { u, sv, url, CONDUCT_NOTE } from '../lib/fields.js';
import { subject } from '../lib/liquid.js';
import { textFoot, kv } from '../lib/text.js';
import { BRAND, C } from '../lib/theme.js';

export const meta = {
  id: 'newsurvey', code: '12', n: 16, name: 'New survey available', kind: 'Engagement', group: 'Engagement',
  tone: 'blue', transactional: false, source: 'newsurvey.liquid',
  trigger: 'Member matched to an open study',
  subjects: ['{{ survey.name }} — {{ survey.points }} points, about {{ survey.time }} min', '{{ user.name.first }}, a new survey matches your profile', 'New on Turn2Opinion: {{ survey.name }}'],
  subjectsSample: ['Streaming habits 2026 — 300 points, about 10 min', 'Aarav, a new survey matches your profile', 'New on Turn2Opinion: Streaming habits 2026'],
  preheader: 'You match the audience for a new study. The reward and length are inside — decide in a second.',
  cta: { label: 'Start the survey', dest: 'survey.link' },
  reason: 'You are receiving this because you are a Turn2Opinion member matched to this study.',
};

export const text = () => `${sv.name()} - about ${sv.time()} minutes

Hi ${u.first()},

A new survey is open and you match the audience for it.

${kv([['Survey', sv.name()], ['Reward', `${sv.points()} points`], ['Estimated time', `${sv.time()} minutes`]])}

START THE SURVEY
${sv.link()}

You can stop at any point, and declining a study never affects your
standing or your balance.

TIPS FOR A SMOOTH SURVEY
  - Answer honestly - there are no right or wrong answers.
  - Read each question; quality checks look for rushed answers.
  - If you're screened out early, it's about the audience the client
    needs, not about you.

${CONDUCT_NOTE}

If you cannot open the link, write to ${BRAND.support} and we will help.
${textFoot(meta.reason, { prefs: url.prefs() })}`;

export default function Newsurvey() {
  return (
    <Frame title={subject(meta)} preheader={meta.preheader} kind="New survey" reason={meta.reason} prefs={url.prefs()}>
      <Stage tone="blue" eyebrow="Matched to you" hero="12-newsurvey"
        alt="A member pointing upward in a sky portal beside a clipboard tile, a clock badge and a points coin"
        title={<>A new survey is open &mdash; <span style={{ color: '#FFD872' }}>and you&rsquo;re a match</span>.</>}
        sub={<>&ldquo;{sv.name()}&rdquo; is looking for people like you. The reward and the time are below, so you can decide in a second.</>}
        facts={[{ text: <>{sv.points()} points</> }, { text: <>About {sv.time()} min</>, dot: '#9FD6FF' }, { text: 'Optional', dot: '#7FF0CF' }]} />

      <Hello name={u.first()}>
        <Lead>You match the audience for <strong style={{ color: C.ink }}>{sv.name()}</strong>.</Lead>
      </Hello>

      <Stats py={4} items={[
        { img: 'coin', value: sv.points(), label: 'Points on completion', color: C.goldText, tint: 'gold' },
        { value: <>{sv.time()}<span style={{ fontSize: '15px' }}> min</span></>, label: 'Estimated time', color: C.blueD, tint: 'blue' },
        { value: '1', label: 'Click to start', color: C.violetD, tint: 'violet' },
      ]} />

      <Cta href={sv.link()} label="Start the survey" note="Stop at any point. Declining never affects your standing or your balance." />

      <Ask q="Any tips before I start?">
        <Checks items={[
          'Answer honestly — there are no right or wrong answers.',
          'Read each question; quality checks look for rushed answers.',
          'If you’re screened out early, it’s about the audience the client needs, not about you.',
        ]} />
      </Ask>

      <Note icon="shield-blue" tint="blue" title="How your answers are handled">
        {CONDUCT_NOTE} Can&rsquo;t open the link? Write to <a href={`mailto:${BRAND.support}`} style={{ color: C.blue, fontWeight: 700 }}>{BRAND.support}</a>.
      </Note>

      <Signoff line="Your opinion shapes what’s next." />
    </Frame>
  );
}
