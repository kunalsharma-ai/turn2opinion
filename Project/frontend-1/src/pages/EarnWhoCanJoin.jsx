// /earn/who-can-join/ — Earn menu, page 4 of 4 (round 10, Kunal 20 Nov 2026).
//
// World: "passport office". Cream paper, teal ink and red rubber stamps, nothing like the other three
// Earn pages:
//   1. HERO        a passport that opens while three entry stamps land on its pages
//   2. CHECKER     three questions and an instant stamped verdict (with the right sign-up link)
//   3. DOORS       three arched doors, one per panel, with what each one asks of you
//   4. HOUSE RULES the one-account rules, on a lined notepad with a pencil tick
//   5. LUGGAGE     the 55 countries, grouped on swinging luggage tags by region
//   6. STAMP       the closing call to action
import { useMemo, useState } from 'react';
import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { Breadcrumbs } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';
import { Flag } from '../components/Brand.jsx';
import { ALL_COUNTRIES, REGIONS } from '../data/profiles.js';

const AGES = [
  ['under', 'Under 13'],
  ['teen', '13 to 17'],
  ['adult', '18 or over']
];
const WORK = [
  ['study', 'Studying'],
  ['work', 'Employed'],
  ['own', 'Run a business'],
  ['home', 'Not working right now']
];

function verdict(age, work, country) {
  if (!age) return null;
  const listed = !country || ALL_COUNTRIES.some((c) => c.code === country);
  if (age === 'under')
    return { ok: false, stamp: 'NOT YET', t: 'Come back when you turn 13', d: 'Our youngest panel starts at 13, with a parent’s permission. We would love to hear from you then.' };
  if (!listed)
    return { ok: false, stamp: 'WAITLIST', t: 'Not in your country yet', d: 'We are only enrolling in our 55 panel countries for now. New countries are added as research demand grows.' };
  if (age === 'teen')
    return { ok: true, stamp: 'TEEN 13–17', t: 'Welcome to the teen panel', d: 'You can join, and your parent or guardian gives permission before anything starts.', to: '/join/minor/', cta: 'Join the teen panel', more: '/earn/minors/' };
  if (work === 'work' || work === 'own')
    return { ok: true, stamp: 'PROFESSIONAL', t: 'Two doors are open for you', d: 'Join as a business professional to get B2B studies matched to your role, on top of everyday consumer surveys.', to: '/join/professional/', cta: 'Join as a professional', more: '/earn/business-professionals/' };
  return { ok: true, stamp: 'CONSUMER 18+', t: 'You’re in', d: 'Join as a consumer and get surveys about the things you buy, use, watch and love.', to: '/join/', cta: 'Join as a consumer', more: '/earn/consumers/' };
}

function Passport() {
  return (
    <div className="ej-passport" aria-hidden="true">
      <div className="ej-pp-cover">
        <span className="ej-pp-crest">
          <Icon name="globe" size={40} />
        </span>
        <b>PANEL PASSPORT</b>
        <small>Turn2Opinion</small>
      </div>
      <div className="ej-pp-pages">
        <span className="ej-pp-line" />
        <span className="ej-pp-line" />
        <span className="ej-pp-line" />
        <span className="ej-stamp s1">
          CONSUMER<small>18+</small>
        </span>
        <span className="ej-stamp s2">
          PROFESSIONAL<small>B2B</small>
        </span>
        <span className="ej-stamp s3">
          TEEN<small>13–17</small>
        </span>
      </div>
    </div>
  );
}

function Checker() {
  const [age, setAge] = useState('');
  const [work, setWork] = useState('');
  const [country, setCountry] = useState('');
  const v = useMemo(() => verdict(age, work, country), [age, work, country]);
  const sorted = useMemo(() => [...ALL_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name)), []);
  return (
    <div className="ej-check">
      <form className="ej-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>
            <span>1</span> How old are you?
          </legend>
          <div className="ej-opts">
            {AGES.map(([k, l]) => (
              <button key={k} type="button" aria-pressed={age === k} className={age === k ? 'is-on' : ''} onClick={() => setAge(k)}>
                {l}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span>2</span> What do you do most days?
          </legend>
          <div className="ej-opts">
            {WORK.map(([k, l]) => (
              <button key={k} type="button" aria-pressed={work === k} className={work === k ? 'is-on' : ''} onClick={() => setWork(k)}>
                {l}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span>3</span> Where do you live?
          </legend>
          <label className="ej-select">
            {country ? <Flag code={country} size={18} /> : <Icon name="globe" size={16} />}
            <span className="sr-only">Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Choose your country</option>
              {sorted.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
              <option value="ZZ">Somewhere else</option>
            </select>
          </label>
        </fieldset>
      </form>
      <div className={`ej-verdict ${v ? (v.ok ? 'is-ok' : 'is-no') : 'is-empty'}`} aria-live="polite">
        {v ? (
          <div key={v.stamp}>
            <span className="ej-v-stamp">{v.stamp}</span>
            <b>{v.t}</b>
            <p>{v.d}</p>
            {v.to && (
              <div className="ej-v-actions">
                <Link to={v.to} className="btn ej-btn">
                  {v.cta} <Icon name="arrow" size={16} />
                </Link>
                <Link to={v.more} className="ej-textlink">
                  Read more
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <span className="ej-v-ink" aria-hidden="true" />
            <b>Your stamp appears here</b>
            <p>Answer the first question to start. Nothing you pick here is saved or sent anywhere.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const DOORS = [
  {
    k: 'consumer',
    t: 'Consumers',
    age: '18+',
    icon: 'bag',
    asks: ['Be 18 or older', 'Live in a panel country', 'Use your own email and phone', 'Answer honestly about everyday life'],
    to: '/earn/consumers/'
  },
  {
    k: 'pro',
    t: 'Business professionals',
    age: '18+ · working',
    icon: 'briefcase',
    asks: ['Everything a consumer needs', 'Tell us your role, level and industry', 'Keep work details up to date', 'Optional: a company email for more studies'],
    to: '/earn/business-professionals/'
  },
  {
    k: 'teen',
    t: 'Minors',
    age: '13–17',
    icon: 'sparkles',
    asks: ['Be 13 to 17', 'A parent or legal guardian gives verified permission', 'Your own yes as well', 'Age-checked studies only'],
    to: '/earn/minors/',
    tag: 'New'
  }
];

const RULES = [
  ['One person, one account', 'Duplicate accounts are closed, along with their points.'],
  ['Real details only', 'Your name, age and country must be true. We may check them.'],
  ['Your own email and phone', 'Shared or temporary inboxes miss our messages and fail checks.'],
  ['No bots, scripts or masking', 'Automated answers and hidden locations are filtered out.'],
  ['Honest, thoughtful answers', 'Speeding and copy-paste answers lower your quality score.'],
  ['Profiles kept current', 'Moved, changed jobs, had a birthday? Update it and match better.']
];

export default function EarnWhoCanJoin() {
  const ref = useReveal();
  return (
    <div ref={ref} className="ej-page">
      {/* 1. HERO */}
      <section className="ej-hero">
        <span className="ej-guilloche" aria-hidden="true" />
        <div className="wrap ej-hero-grid">
          <div className="ej-hero-copy">
            <Breadcrumbs items={[{ label: 'Earn', to: '/paid-surveys/' }, { label: 'Who can join' }]} />
            <p className="ej-kicker">
              <Icon name="globe" size={15} /> Earn · Who can join our panel
            </p>
            <h1>
              Is there a seat for you?
              <span>Almost certainly.</span>
            </h1>
            <p className="ej-lead">
              Turn2Opinion has three panels: consumers, business professionals and, new this season, teens aged 13 to 17 with a parent’s permission. Here is exactly who
              can join each one, and the few rules that keep the panel fair for everyone.
            </p>
            <a href="#ej-check" className="btn btn-lg ej-btn">
              Check in 10 seconds <Icon name="arrow" size={18} />
            </a>
          </div>
          <Passport />
        </div>
      </section>

      {/* 2. CHECKER */}
      <section className="section ej-check-sec" id="ej-check" aria-labelledby="ej-c-h">
        <div className="wrap">
          <div className="ej-head" data-reveal>
            <p className="ej-kicker">Border control, the friendly kind</p>
            <h2 id="ej-c-h">Three questions, one stamp</h2>
          </div>
          <div data-reveal>
            <Checker />
          </div>
        </div>
      </section>

      {/* 3. DOORS */}
      <section className="section ej-doors-sec" aria-labelledby="ej-d-h">
        <div className="wrap">
          <div className="ej-head is-center" data-reveal>
            <p className="ej-kicker">Three doors</p>
            <h2 id="ej-d-h">What each panel asks of you</h2>
          </div>
          <div className="ej-doors">
            {DOORS.map((d, k) => (
              <Link key={d.k} to={d.to} className={`ej-door d-${d.k}`} style={{ '--k': k }} data-reveal>
                <span className="ej-arch" aria-hidden="true">
                  <span className="ej-arch-in">
                    <Icon name={d.icon} size={30} />
                  </span>
                </span>
                <span className="ej-door-age">{d.age}</span>
                <b>
                  {d.t} {d.tag && <em>{d.tag}</em>}
                </b>
                <ul>
                  {d.asks.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <span className="ej-door-go">
                  Open this door <Icon name="arrow" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOUSE RULES */}
      <section className="section ej-rules-sec" aria-labelledby="ej-r-h">
        <div className="wrap ej-split">
          <div data-reveal>
            <p className="ej-kicker">House rules</p>
            <h2 id="ej-r-h">Six rules that keep rewards flowing to real people</h2>
            <p>Research clients pay for genuine opinions. These rules are how we prove ours are genuine, and why honest members qualify for more surveys.</p>
          </div>
          <ol className="ej-pad" data-reveal>
            {RULES.map(([t, d], k) => (
              <li key={t} style={{ '--k': k }}>
                <span className="ej-tick" aria-hidden="true">
                  ✓
                </span>
                <b>{t}</b>
                <small>{d}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. LUGGAGE */}
      <section className="section ej-bag-sec" aria-labelledby="ej-b-h">
        <div className="wrap">
          <div className="ej-head" data-reveal>
            <p className="ej-kicker">Where we enrol</p>
            <h2 id="ej-b-h">{ALL_COUNTRIES.length} countries, five regions</h2>
          </div>
          <div className="ej-tags">
            {REGIONS.map((r, k) => (
              <div key={r.id} className="ej-tag" style={{ '--c': r.accent, '--k': k }} data-reveal>
                <span className="ej-tag-hole" aria-hidden="true" />
                <span className="ej-tag-string" aria-hidden="true" />
                <b>{r.name}</b>
                <small>{r.countries.length} countries</small>
                <ul>
                  {r.countries.map(([code, name]) => (
                    <li key={code} title={name}>
                      <Flag code={code} size={16} /> <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STAMP */}
      <section className="ej-final" aria-labelledby="ej-f-h">
        <div className="wrap" data-reveal>
          <span className="ej-final-stamp" aria-hidden="true">
            APPROVED
          </span>
          <h2 id="ej-f-h">Found your door? Walk through it.</h2>
          <div className="ej-final-actions">
            <Link to="/join/" className="btn btn-lg ej-btn">
              Consumer <Icon name="arrow" size={16} />
            </Link>
            <Link to="/join/professional/" className="btn btn-lg ej-btn is-ink">
              Professional <Icon name="arrow" size={16} />
            </Link>
            <Link to="/join/minor/" className="btn btn-lg ej-btn is-pop">
              Teen 13–17 <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
