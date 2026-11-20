// Round 10d (Kunal, 20 Nov 2026): a neon Teen panel band that sits next to the consumer and professional content on the
// inner pages (How it works, Paid surveys, Rewards), so every page also explains the teen panel (13–17) and its safeguards.
// The art is a lock with two keys (parent + teen) that turn one after the other, then the lock opens and points pop out.
import React from 'react';
import { Link } from '../../router/Router.jsx';
import Icon from '../Icon.jsx';
import { useInView } from '../../hooks/useMounted.js';

const VARIANTS = {
  how: {
    kicker: 'Teens 13–17 can take part too',
    title: 'Two keys open the teen panel',
    lead: 'A teen signs up, a parent or guardian confirms by email, and the teen gives their own yes. Only then do age-appropriate surveys unlock.',
    steps: [
      ['user', 'Teen signs up', 'Date of birth must be 13 to 17.'],
      ['key', 'Parent says yes', 'They confirm their own email and give permission.'],
      ['check', 'Teen says yes', 'In their own words, after reading what’s involved.'],
      ['sparkles', 'Surveys unlock', 'Short, reviewed and never about adult topics.']
    ]
  },
  surveys: {
    kicker: 'New · Teen surveys',
    title: 'Surveys made for teens (13–17)',
    lead: 'Games, music, snacks, trainers, study apps and creators. Every teen study is reviewed for age-appropriate content before it goes live.',
    steps: [
      ['eye', 'Checked first', 'No alcohol, gambling, dating or adult topics.'],
      ['clock', 'Short and calm', 'Usually 7 to 10 minutes, with the time shown up front.'],
      ['lock', 'Less data', 'No school names, photos or location tracking.'],
      ['refresh', 'Skip anything', 'Leave any question or survey, no reason needed.']
    ]
  },
  rewards: {
    kicker: 'Teen rewards',
    title: 'Teens earn too, and a parent picks the payout',
    lead: 'Teen members collect points like everyone else. The parent or guardian chooses how rewards are paid, so the money goes somewhere the family trusts.',
    steps: [
      ['gift', 'Same points', 'Every completed survey adds points to the dashboard.'],
      ['wallet', 'Parent-approved', 'Gift cards or vouchers, chosen by the parent or guardian.'],
      ['shield', 'Never sold', 'Answers are reported in totals. Brands never contact teens.'],
      ['x', 'No pressure', 'No streaks, no countdowns, pause or close any time.']
    ]
  }
};

export default function TeenBand({ variant = 'how' }) {
  const v = VARIANTS[variant] || VARIANTS.how;
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div className={`tnb ${inView ? 'is-in' : ''}`} ref={ref}>
      <span className="tnb-grid" aria-hidden="true" />
      <div className="tnb-art" aria-hidden="true">
        <span className="tnb-halo" />
        <span className="tnb-lock">
          <span className="tnb-shackle" />
          <span className="tnb-body">
            <b>13–17</b>
          </span>
        </span>
        <span className="tnb-key k1">
          🔑<small>Parent</small>
        </span>
        <span className="tnb-key k2">
          🗝️<small>Teen</small>
        </span>
        <span className="tnb-pop">
          {['+50', '🎮', '+25', '🎧', '+40'].map((t, k) => (
            <i key={k} style={{ '--k': k }}>
              {t}
            </i>
          ))}
        </span>
      </div>
      <div className="tnb-copy">
        <span className="tnb-kicker">
          <Icon name="sparkles" size={14} /> {v.kicker}
        </span>
        <h3>{v.title}</h3>
        <p>{v.lead}</p>
        <ol className="tnb-steps">
          {v.steps.map(([ic, t, d], i) => (
            <li key={t} style={{ '--i': i }}>
              <span className="tnb-ico">
                <Icon name={ic} size={16} />
              </span>
              <strong>{t}</strong>
              <small>{d}</small>
            </li>
          ))}
        </ol>
        <div className="tnb-ctas">
          <Link to="/join/teen/" className="tnb-cta">
            Join the teen panel <Icon name="arrow" size={16} />
          </Link>
          <Link to="/earn/teens/" className="tnb-cta is-ghost">
            For parents and guardians
          </Link>
        </div>
      </div>
    </div>
  );
}
