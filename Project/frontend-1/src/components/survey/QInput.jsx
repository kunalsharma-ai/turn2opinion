// One question from the attached questionnaires (guardian onboarding form, Teen profile survey),
// rendered as an input. Question shape (src/data/teen/*.js):
//   { n, q, help, kind?, o: [[label, value, emoji]], multi, other, exclusive, req, when(a), reqWhen(a), from }
// kind: choice (default) · name · dob · country · region · language · timezone · email · phone · textarea
//       · pick (long list, searchable, single or multi) · income (household-income options of the country in `from`)
// Values: string, or string[] for multi; "Other" free text lives at `${n}-other`.
import { useEffect, useMemo, useState } from 'react';
import { CountryPicker, DateField, PhoneField } from '../FormFields.jsx';
import SearchSelect from '../onboarding/SearchSelect.jsx';
import { loadStates } from '../onboarding/LocationFields.jsx';
import { LANGUAGES } from '../../data/teen/languages.js';
import { exactAge } from '../../data/teen/registration.js';
import { COUNTRIES } from '../../data/countries.js';
import { formatDate } from '../FormFields.jsx';
import { INCOME_BY_COUNTRY } from '../../data/teen/parentProfiling.js';

// Region names for review screens: warmed on first use, codes (IN-MH) fall back to the code until loaded.
let STATES = null;
export const warmRegions = () => (STATES ? Promise.resolve(STATES) : loadStates().then((s) => (STATES = s)).catch(() => (STATES = {})));
const regionName = (cc, v) => {
  const list = (STATES && STATES[String(cc || '').toUpperCase()]) || [];
  const hit = list.find((o) => (Array.isArray(o) ? o[1] : o) === v);
  return hit ? (Array.isArray(hit) ? hit[0] : hit) : v;
};

export const incomeOptions = (a, from = 'P01') => (INCOME_BY_COUNTRY[String(a[from] || '').toUpperCase()] || []).map((v) => [v, v]);
export const isShown = (q, a) => (typeof q.when === 'function' ? !!q.when(a) : q.kind === 'income' ? incomeOptions(a, q.from).length > 0 : true);
export const isRequired = (q, a) => !!q.req || (typeof q.reqWhen === 'function' && !!q.reqWhen(a));
const empty = (v) => v == null || v === '' || (Array.isArray(v) && !v.length);

/** Error text for one question, or ''. */
export function qError(q, a) {
  if (!isShown(q, a)) return '';
  if (q.kind === 'name') return String(a[q.fields[0]] || '').trim() ? '' : 'Please enter the first name.';
  const v = a[q.n];
  if (isRequired(q, a) && empty(v)) return q.multi ? 'Choose at least one answer.' : 'Please answer this question.';
  if (q.other && (Array.isArray(v) ? v.includes(q.other) : v === q.other) && String(a[`${q.n}-other`] || '').trim().length > 80) return 'Keep it under 80 characters.';
  if (q.kind === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address.';
  if (q.kind === 'dob' && v) {
    const age = exactAge(v);
    if (q.segment === 'adult' && (age === null || age < 18)) return 'A parent or guardian must be 18 or older.';
  }
  return '';
}

/** Human answer text for review screens. */
export function answerText(q, a) {
  if (q.kind === 'name') return q.fields.map((k) => a[k]).filter(Boolean).join(' ');
  const v = a[q.n];
  if (empty(v)) return '';
  const list = Array.isArray(v) ? v : [v];
  if (q.kind === 'language') return list.map((c) => LANGUAGES.find((l) => l.code === c)?.name || c).join(', ');
  if (q.kind === 'phone') return `+${v}`;
  if (q.kind === 'country') return COUNTRIES.find((c) => c.c === String(v).toUpperCase())?.n || v;
  if (q.kind === 'region') return regionName(a[q.from], v);
  if (q.kind === 'dob') return formatDate(v) || v;
  if (!q.o) return list.join(', ');
  return list
    .map((x) => {
      const o = q.o.find((o) => o[1] === x);
      if (x === q.other && a[`${q.n}-other`]) return `${o ? o[0] : x}: ${a[`${q.n}-other`]}`;
      return o ? o[0] : x;
    })
    .join(', ');
}

function RegionInput({ q, a, set, id, invalid }) {
  const [states, setStates] = useState(null);
  useEffect(() => {
    loadStates().then(setStates).catch(() => setStates({}));
  }, []);
  const cc = String(a[q.from] || '').toUpperCase();
  const list = (states && states[cc]) || [];
  if (!cc) return <input id={id} className="input" disabled placeholder="Choose the country first" />;
  if (!list.length)
    return <input id={id} className="input" value={a[q.n] || ''} placeholder="Type your state, province or region" onChange={(e) => set(q.n, e.target.value.slice(0, 60))} aria-invalid={invalid} />;
  return <SearchSelect id={id} value={a[q.n] || ''} options={list} allowFree freeLabel="Use" placeholder="Search or type your region" invalid={invalid} onChange={(v) => set(q.n, v)} />;
}

function PickInput({ q, a, set, id, invalid }) {
  const v = a[q.n];
  if (!q.multi) return <SearchSelect id={id} value={v || ''} options={q.o} placeholder="Search the list" invalid={invalid} onChange={(x) => set(q.n, x)} />;
  const list = Array.isArray(v) ? v : v ? [v] : [];
  return (
    <>
      {list.length > 0 && (
        <div className="qi-picked">
          {list.map((x) => (
            <button key={x} type="button" className="chip is-on" onClick={() => set(q.n, list.filter((y) => y !== x))} aria-label={`Remove ${x}`}>
              {x} ×
            </button>
          ))}
        </div>
      )}
      <SearchSelect id={id} value="" options={q.o.filter((o) => !list.includes(o[1]))} placeholder={list.length ? 'Add another' : 'Search the list'} invalid={invalid} onChange={(x) => x && set(q.n, [...list, x].slice(0, 40))} />
    </>
  );
}

function LanguageInput({ q, a, set, id, invalid }) {
  const opts = useMemo(() => LANGUAGES.map((l) => [`${l.native === l.name ? l.name : `${l.name} · ${l.native}`}`, l.code]), []);
  return <SearchSelect id={id} value={a[q.n] || ''} options={opts} placeholder="Search a language" invalid={invalid} onChange={(v) => set(q.n, v)} />;
}

/** The choice chips. `skin` prefixes the class names so each page styles its own. */
export function Choices({ q, a, set, skin }) {
  const v = a[q.n];
  const list = Array.isArray(v) ? v : v ? [v] : [];
  const pick = (val) => {
    if (!q.multi) return set(q.n, val);
    const ex = q.exclusive || [];
    let next = list.includes(val) ? list.filter((x) => x !== val) : [...list, val];
    if (ex.includes(val) && next.includes(val)) next = [val];
    else next = next.filter((x) => !ex.includes(x) || x === val);
    set(q.n, next);
  };
  const otherOn = q.other && list.includes(q.other);
  return (
    <>
      <div className={`${skin}-opts ${q.o.length > 6 ? 'is-many' : ''}`} role={q.multi ? 'group' : 'radiogroup'} aria-label={q.q}>
        {q.o.map(([label, val, emoji], i) => {
          const on = list.includes(val);
          return (
            <button key={val} type="button" role={q.multi ? 'checkbox' : 'radio'} aria-checked={on} className={`${skin}-opt ${on ? 'is-on' : ''}`} style={{ '--i': i }} onClick={() => pick(val)}>
              {emoji && (
                <span className={`${skin}-opt-e`} aria-hidden="true">
                  {emoji}
                </span>
              )}
              <span className={`${skin}-opt-l`}>{label}</span>
            </button>
          );
        })}
      </div>
      {otherOn && (
        <input
          className={`input ${skin}-other`}
          value={a[`${q.n}-other`] || ''}
          onChange={(e) => set(`${q.n}-other`, e.target.value.slice(0, 80))}
          placeholder="Tell us in your own words (optional)"
          aria-label={`${q.q}: your own answer`}
        />
      )}
    </>
  );
}

export default function QInput({ q, a, set, skin = 'qi', invalid = false, locked = {} }) {
  const id = `q-${q.n}`;
  switch (q.kind) {
    case 'name':
      return (
        <div className={`${skin}-name`}>
          {q.fields.map((k, i) => (
            <label key={k} className={`${skin}-mini`}>
              <span>{['First name', 'Middle name (optional)', 'Last name (optional)'][i]}</span>
              <input className="input" value={a[k] || ''} onChange={(e) => set(k, e.target.value.slice(0, 49))} aria-invalid={i === 0 && invalid} autoComplete={['given-name', 'additional-name', 'family-name'][i]} />
            </label>
          ))}
        </div>
      );
    case 'dob': {
      const now = new Date();
      const max = q.segment === 'adult' ? new Date(now.getFullYear() - 18, now.getMonth(), now.getDate()) : now;
      return <DateField id={id} value={a[q.n] || ''} maxDate={max} onChange={(v) => set(q.n, v)} invalid={invalid} />;
    }
    case 'country':
      return <CountryPicker id={id} value={String(a[q.n] || '').toUpperCase()} onChange={(c) => { set(q.n, c); if (q.n === 'P01') { set('P02', ''); set('household-income', ''); } if (q.n === 'D02') set('D03', ''); }} invalid={invalid} />;
    case 'region':
      return <RegionInput q={q} a={a} set={set} id={id} invalid={invalid} />;
    case 'pick':
      return <PickInput q={q} a={a} set={set} id={id} invalid={invalid} />;
    case 'income':
      return <SearchSelect id={id} value={a[q.n] || ''} options={incomeOptions(a, q.from)} placeholder="Choose a range" invalid={invalid} onChange={(v) => set(q.n, v)} />;
    case 'language':
      return <LanguageInput q={q} a={a} set={set} id={id} invalid={invalid} />;
    case 'timezone':
      return <input id={id} className="input" value={a[q.n] || ''} onChange={(e) => set(q.n, e.target.value.slice(0, 60))} placeholder="e.g. Asia/Kolkata" />;
    case 'email':
      return <input id={id} className="input" type="email" value={a[q.n] || ''} readOnly={!!locked[q.n]} onChange={(e) => set(q.n, e.target.value.slice(0, 120))} aria-invalid={invalid} />;
    case 'phone': {
      const ph = a[`${q.n}:parts`] || { dial: a[`${q.n}:dial`] || '', phone: '' };
      return (
        <PhoneField
          id={id}
          country={ph.dial}
          number={ph.phone}
          onCountry={(c) => set(`${q.n}:parts`, { ...ph, dial: c })}
          onNumber={(v) => set(`${q.n}:parts`, { ...ph, phone: v })}
          invalid={invalid}
        />
      );
    }
    case 'textarea':
      return <textarea id={id} className="input" rows={3} value={a[q.n] || ''} placeholder={q.ph || ''} onChange={(e) => set(q.n, e.target.value.slice(0, 500))} />;
    default:
      return q.o ? <Choices q={q} a={a} set={set} skin={skin} /> : <input id={id} className="input" value={a[q.n] || ''} onChange={(e) => set(q.n, e.target.value.slice(0, 120))} />;
  }
}
