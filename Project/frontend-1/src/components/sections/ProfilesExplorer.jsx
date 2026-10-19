// "Who we invite": a profile slot machine. Three reels spin and stop on a real profile combination
// ("a Procurement Manager in Logistics at a mid-size company"), a member illustration pops up, and three
// endless rails underneath show the full breadth of industries, roles and lifestyles. A plain list of every
// profile type sits in a disclosure for screen readers and search engines.
import { useEffect, useMemo, useRef, useState } from 'react';
import { B2B, B2C, PROFILE_TYPE_COUNT } from '../../data/profiles.js';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { asset } from '../../config/env.js';
import Icon from '../Icon.jsx';
import { isSoundEnabled } from '../../i18n/soundPrefs.js';
import { peopleAlt } from '../../data/illustrations.js';

const ITEM_H = 46;
const PEOPLE = { pro: ['business', 'finance', 'tech-user', 'pro-pointing'], con: ['shopper', 'gamer', 'foodie', 'traveller', 'health', 'retiree'] };

function reelsFor(mode) {
  if (mode === 'pro') {
    return [
      { label: 'Role', items: B2B.roles.flatMap((r) => r.titles) },
      { label: 'Industry', items: B2B.industries.map((d) => d.name) },
      { label: 'Company', items: B2B.firmographics }
    ];
  }
  return [
    { label: 'Who', items: B2C.lifestyles.flatMap((l) => l.items) },
    { label: 'Generation', items: B2C.demographics.find((d) => d.label === 'Generations').items },
    { label: 'Life stage', items: B2C.demographics.find((d) => d.label === 'Work status').items }
  ];
}
const COMPANY = {
  'Micro businesses': 'a micro business',
  'Small businesses': 'a small business',
  'Mid-size companies': 'a mid-size company',
  'Large enterprises': 'a large enterprise',
  'Global corporations': 'a global corporation',
  'Public sector bodies': 'a public sector body',
  'Start-ups': 'a start-up',
  'Family-owned firms': 'a family-owned firm'
};
const pick = (n) => Math.floor(Math.random() * n);

// The three reels and the three rails below them are the heaviest decoration on the home page:
// repeated at full length they were 528 + 320 spans — about a fifth of the whole document — all of
// it inside `overflow: hidden` boxes a visitor cannot see until this section scrolls into view.
// So each one renders a minimal, same-height placeholder until `live` (the section's own
// IntersectionObserver) turns it on, which is also the moment the first spin is scheduled. The
// window height is fixed in CSS and the rails take their height from a single chip, so filling
// them in later moves nothing on the page. The full profile list stays in the HTML either way —
// it is in the <details> block below, which is what search engines and screen readers read.
const RAIL_IDLE = 6;

function Reel({ items, index, spinKey, delay, live }) {
  // A long strip (items repeated) so each spin travels downward several loops before landing.
  const loops = 4;
  const strip = useMemo(() => (live ? Array.from({ length: loops }, () => items).flat() : [items[index % items.length]]), [items, live, index]);
  const target = live ? (loops - 1) * items.length + index : 0;
  const from = live ? -(target - 2 * items.length) * ITEM_H : 0;
  return (
    <div className="reel">
      <div
        className="reel-strip"
        key={live ? spinKey : 'idle'}
        style={{ '--to': `${-target * ITEM_H}px`, '--d': `${delay}ms`, '--from': `${from}px` }}
      >
        {strip.map((t, i) => (
          <span key={i} className={i === target ? 'is-hit' : ''}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Rail({ items, dir, icons, live }) {
  const strip = live ? [...items, ...items] : items.slice(0, RAIL_IDLE);
  return (
    <div className={`rail ${dir}`} aria-hidden="true">
      <div className="rail-track">
        {strip.map((t, i) => (
          <span key={i}>
            {icons && <Icon name={icons[i % icons.length]} size={14} />}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CountUp({ to, run }) {
  const [v, setV] = useState(prefersReducedMotion() ? to : 0);
  useEffect(() => {
    if (!run || prefersReducedMotion()) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v}</>;
}

export default function ProfilesExplorer() {
  const [mode, setMode] = useState('pro');
  const reels = useMemo(() => reelsFor(mode), [mode]);
  const [idx, setIdx] = useState([3, 0, 2]);
  const [spin, setSpin] = useState(0);
  const [person, setPerson] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const manual = useRef(0);

  const go = () => {
    setIdx(reels.map((r) => pick(r.items.length)));
    setPerson((p) => (p + 1) % PEOPLE[mode].length);
    setSpin((k) => k + 1);
  };
  useEffect(() => {
    setIdx(reels.map((r, i) => (i === 0 ? 3 : i) % r.items.length));
    setSpin((k) => k + 1);
    setPerson(0);
  }, [reels]);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    const t = setTimeout(go, spin === 0 ? 600 : Date.now() - manual.current < 8000 ? 9000 : 5200);
    return () => clearTimeout(t);
  }, [inView, spin]); // eslint-disable-line react-hooks/exhaustive-deps

  const words = reels.map((r, i) => r.items[idx[i] % r.items.length]);
  const an = (w) => (/^[AEIOU]/i.test(w) ? 'An' : 'A');
  const sentence =
    mode === 'pro'
      ? `${an(words[0])} ${words[0]} in ${words[1]}, working at ${COMPANY[words[2]] || words[2]}`
      : `${words[0]} · ${words[1]} · ${words[2]}`;

  const rails =
    mode === 'pro'
      ? [
          { items: B2B.industries.map((d) => d.name), icons: B2B.industries.map((d) => d.icon), dir: 'ltr' },
          { items: B2B.roles.flatMap((r) => r.titles), dir: 'rtl' },
          { items: [...B2B.departments, ...B2B.firmographics], dir: 'ltr' }
        ]
      : [
          { items: B2C.lifestyles.map((l) => l.name), icons: B2C.lifestyles.map((l) => l.icon), dir: 'ltr' },
          { items: B2C.lifestyles.flatMap((l) => l.items), dir: 'rtl' },
          { items: B2C.demographics.flatMap((d) => d.items), dir: 'ltr' }
        ];

  return (
    <div className={`slots mode-${mode}`} ref={ref}>
      <div className="slots-top">
        <div className="mode-switch" role="group" aria-label="Audience">
          <span className={`mode-thumb ${mode}`} aria-hidden="true" />
          <button type="button" aria-pressed={mode === 'pro'} onClick={() => setMode('pro')}>
            <Icon name="briefcase" size={18} /> Business professionals
          </button>
          <button type="button" aria-pressed={mode === 'con'} onClick={() => setMode('con')}>
            <Icon name="users" size={18} /> Consumers
          </button>
        </div>
        <p className="slots-count">
          <strong>
            <CountUp to={PROFILE_TYPE_COUNT} run={inView} />+
          </strong>
          <span>profile types, from the boardroom to the living room</span>
        </p>
      </div>

      <div className="slots-main">
        <div className="machine2">
          <div className="m2-lights" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <i key={i} style={{ '--i': i }} />
            ))}
          </div>
          <p className="m2-title">Profile match-o-matic</p>
          <div className="m2-window">
            {reels.map((r, i) => (
              <div key={r.label} className="m2-col">
                <span className="m2-label">{r.label}</span>
                <Reel items={r.items} index={idx[i] % r.items.length} spinKey={`${mode}-${spin}`} delay={i * 260} live={inView} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="m2-lever"
            onClick={() => {
              manual.current = Date.now();
              go();
              // Lever clunk → reels → cash-register "ka-ching" (synthesised, follows the Sound on/off switch).
              if (isSoundEnabled()) import('../../i18n/sounds.js').then((m) => m.playSlotPull()).catch(() => {});
            }}
          >
            <span className="m2-knob" aria-hidden="true" />
            Spin a profile
          </button>
        </div>

        <div className="slots-result" key={`${mode}-${spin}`} aria-live="polite">
          <span className="sr-person" aria-hidden="true">
            <img
              src={asset(`/images/people/${PEOPLE[mode][person % PEOPLE[mode].length]}.svg`)}
              alt={peopleAlt(PEOPLE[mode][person % PEOPLE[mode].length])}
              width="200"
              height="240"
              loading="lazy"
            />
          </span>
          <p className="sr-kicker">Next survey could be for…</p>
          <p className="sr-sentence">{sentence}</p>
          <p className="sr-note">
            <Icon name="check" size={16} /> Yes, we have surveys for that profile.
          </p>
        </div>
      </div>

      <div className="rails">
        {rails.map((r, i) => (
          <Rail key={`${mode}-${i}`} items={r.items} icons={r.icons} dir={r.dir} live={inView} />
        ))}
      </div>

      <details className="slots-all">
        <summary>
          <Icon name="layers" size={16} /> See every profile type we recruit
        </summary>
        {mode === 'pro' ? (
          <div className="slots-all-cols">
            <div>
              <h3>Industries</h3>
              <p>{B2B.industries.map((d) => d.name).join(', ')}.</p>
            </div>
            <div>
              <h3>Departments</h3>
              <p>{B2B.departments.join(', ')}.</p>
            </div>
            {B2B.roles.map((r) => (
              <div key={r.family}>
                <h3>{r.family}</h3>
                <p>{r.titles.join(', ')}.</p>
              </div>
            ))}
            <div>
              <h3>Company types</h3>
              <p>{B2B.firmographics.join(', ')}.</p>
            </div>
          </div>
        ) : (
          <div className="slots-all-cols">
            {B2C.lifestyles.map((l) => (
              <div key={l.name}>
                <h3>{l.name}</h3>
                <p>{l.items.join(', ')}.</p>
              </div>
            ))}
            {B2C.demographics.map((d) => (
              <div key={d.label}>
                <h3>{d.label}</h3>
                <p>{d.items.join(', ')}.</p>
              </div>
            ))}
          </div>
        )}
      </details>
    </div>
  );
}
