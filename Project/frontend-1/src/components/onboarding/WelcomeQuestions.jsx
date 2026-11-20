// Welcome questionnaire shown during sign-up, before the email link is sent.
// Questions, option labels and values come from the original Turn2Opinion profile bank (see
// scripts/build-welcome-bank.mjs), so the answers are saved under the same question keys the member
// profiles use. Each journey has its own set: Consumer, Business professional and Teen.
//
// Rules (same as the member profile engine): a question with a parent shows only when the parent is
// answered and has options for that answer; changing an answer clears follow-ups that no longer fit;
// "Other" options ask "please specify"; "None of these" style options clear the rest.
import { useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../../config/env.js';
import Icon from '../Icon.jsx';
import SearchSelect from './SearchSelect.jsx';

let bankP = null;
export const loadBank = () => (bankP ||= import('../../data/welcome/bank.json').then((m) => m.default || m));
const jobCache = new Map();
function loadJobTitles(n) {
  if (!jobCache.has(n))
    jobCache.set(
      n,
      fetch(asset(`/profiles/data/jobrole/${n}.json`))
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    );
  return jobCache.get(n);
}

export const filled = (a) => a != null && a !== '' && !(Array.isArray(a) && !a.length);
const OTHER = /^\s*(others?|something else|any ?other|another)\b|please specify|\(specify\)/i;
const ONLY = /^(none of|i do not|i don['’]t|not applicable|prefer not|no,? i)/i;
const tail = (l) => (OTHER.test(l) ? 1 : /^(none of (the|these)|not applicable|n\/a|i do not)\b/i.test(l) ? 2 : /^prefer not/i.test(l) ? 3 : 0);
export const otherKey = (k) => `${k}-other`;

/** Options for a question given the answers so far (null = free text). */
export function optionsFor(bank, journey, key, ans, ctx, jobs = {}) {
  const q = bank.Q[key];
  if (!q) return [];
  if (key === 'jobrole') {
    const d = ans.department;
    if (!filled(d)) return [];
    if (jobs[d] === undefined) return null; // still loading or free text
    return jobs[d] ? jobs[d].map((t) => [t, t]) : null;
  }
  const O = bank.O[journey === 'teen' && bank.O[`teen:${key}`] ? `teen:${key}` : key];
  if (!O) return null;
  const par = q[1];
  let ks;
  if (par) {
    const a = par === 'country' ? ctx.country : ans[par];
    if (!filled(a)) return [];
    ks = [''].concat(Array.isArray(a) ? a : [a]);
  } else ks = Object.keys(O);
  const seen = new Set();
  const out = [];
  ks.forEach((k) =>
    (O[k] || []).forEach((o) => {
      if (!seen.has(o[1])) {
        seen.add(o[1]);
        out.push(o);
      }
    })
  );
  return out.some((o) => tail(o[0])) ? out.map((o, i) => [o, i]).sort((a, b) => tail(a[0][0]) - tail(b[0][0]) || a[1] - b[1]).map((x) => x[0]) : out;
}

export function isVisible(bank, journey, key, ans, ctx, jobs) {
  const par = bank.Q[key]?.[1];
  if (par && !filled(par === 'country' ? ctx.country : ans[par])) return false;
  const o = optionsFor(bank, journey, key, ans, ctx, jobs);
  return o === null || o.length > 0;
}

export function questionError(bank, journey, key, ans, ctx, jobs) {
  const o = optionsFor(bank, journey, key, ans, ctx, jobs);
  const a = ans[key];
  if (!filled(a) || (typeof a === 'string' && !a.trim())) return o ? (bank.Q[key][2] ? 'Pick at least one answer.' : 'Choose an answer.') : 'Please type your answer.';
  if (o) {
    const ok = new Set(o.map((x) => x[1]));
    if ((Array.isArray(a) ? a : [a]).some((x) => !ok.has(x))) return 'Choose an answer from the list.';
    const other = o.some((x) => OTHER.test(x[0]) && (Array.isArray(a) ? a.includes(x[1]) : a === x[1]));
    if (other && String(ans[otherKey(key)] || '').trim().length < 2) return 'Please tell us what “Other” means for you.';
  }
  return '';
}

/** Drop answers whose question is hidden or whose value no longer fits (after a parent changes). */
export function prune(bank, journey, keys, ans, ctx, jobs) {
  const out = { ...ans };
  let changed = true;
  while (changed) {
    changed = false;
    for (const k of keys) {
      if (!(k in out)) continue;
      if (!isVisible(bank, journey, k, out, ctx, jobs)) {
        delete out[k];
        delete out[otherKey(k)];
        changed = true;
        continue;
      }
      const o = optionsFor(bank, journey, k, out, ctx, jobs);
      if (!o) continue;
      const ok = new Set(o.map((x) => x[1]));
      if (Array.isArray(out[k])) {
        const f = out[k].filter((x) => ok.has(x));
        if (f.length !== out[k].length) {
          out[k] = f;
          changed = true;
        }
      } else if (!ok.has(out[k])) {
        delete out[k];
        changed = true;
      }
    }
  }
  return out;
}

/** The answers to send: only visible questions, "Other" text alongside. */
export function welcomePayload(bank, journey, ans, ctx, jobs) {
  const keys = bank.sections[journey].flatMap((s) => s.keys);
  const out = {};
  keys.forEach((k) => {
    if (!isVisible(bank, journey, k, ans, ctx, jobs) || !filled(ans[k])) return;
    out[k] = ans[k];
    if (filled(ans[otherKey(k)])) out[otherKey(k)] = String(ans[otherKey(k)]).trim();
  });
  return out;
}

/** "Label" text for an answer (review screens). */
export function answerLabel(bank, journey, key, ans, ctx, jobs) {
  const o = optionsFor(bank, journey, key, ans, ctx, jobs) || [];
  const f = (v) => (o.find((x) => x[1] === v) || [v])[0];
  const a = ans[key];
  const base = Array.isArray(a) ? a.map(f).join(', ') : f(a);
  return ans[otherKey(key)] ? `${base} (${ans[otherKey(key)]})` : base;
}

export function useJobTitles(bank, department) {
  const [jobs, setJobs] = useState({});
  useEffect(() => {
    if (!bank || !department || jobs[department] !== undefined) return;
    const n = bank.jobrole?.[department];
    if (n === undefined) {
      setJobs((j) => ({ ...j, [department]: null }));
      return;
    }
    let live = true;
    loadJobTitles(n).then((file) => {
      if (live) setJobs((j) => ({ ...j, [department]: (file && file[department]) || null }));
    });
    return () => {
      live = false;
    };
  }, [bank, department]); // eslint-disable-line react-hooks/exhaustive-deps
  return jobs;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function Question({ n, k, bank, journey, ans, setAns, ctx, jobs, err }) {
  const [filter, setFilter] = useState('');
  const q = bank.Q[k];
  const multi = !!q[2];
  const opts = optionsFor(bank, journey, k, ans, ctx, jobs);
  const a = ans[k];
  const id = `wq-${k}`;
  const set = (v) => setAns(k, v);
  const toggle = (v) => {
    const cur = Array.isArray(a) ? a : [];
    const label = (opts.find((o) => o[1] === v) || [''])[0];
    if (cur.includes(v)) return set(cur.filter((x) => x !== v));
    if (ONLY.test(label)) return set([v]);
    const keep = cur.filter((x) => !ONLY.test((opts.find((o) => o[1] === x) || [''])[0]));
    set([...keep, v]);
  };
  const otherOn = opts && opts.some((o) => OTHER.test(o[0]) && (Array.isArray(a) ? a.includes(o[1]) : a === o[1]));
  const shown = opts && filter ? opts.filter((o) => o[0].toLowerCase().includes(filter.toLowerCase())) : opts;

  let control;
  if (opts === null) {
    control = (
      <input
        id={id}
        className="input"
        value={a || ''}
        onChange={(e) => set(e.target.value.slice(0, 100))}
        placeholder={k === 'jobrole' && jobs[ans.department] === undefined ? 'Loading job titles…' : 'Type your answer'}
        aria-invalid={!!err}
      />
    );
  } else if (!multi && opts.length > 9) {
    control = <SearchSelect id={id} value={a || ''} options={opts} onChange={set} invalid={!!err} placeholder="Search the list" />;
  } else if (!multi) {
    control = (
      <div className={`wq-cards ${opts.length <= 3 ? 'is-few' : ''}`} role="radiogroup" aria-labelledby={`${id}-t`} id={id}>
        {opts.map(([l, v], i) => (
          <button type="button" role="radio" aria-checked={a === v} key={v} className={`wq-card ${a === v ? 'is-on' : ''}`} onClick={() => set(v)} style={{ '--i': i }}>
            <span className="wq-key" aria-hidden="true">
              {LETTERS[i] || '•'}
            </span>
            <span className="wq-lab">{l}</span>
          </button>
        ))}
      </div>
    );
  } else {
    control = (
      <>
        {opts.length > 16 && (
          <div className="wq-filter">
            <Icon name="search" size={15} />
            <input className="input" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={`Filter ${opts.length} options`} aria-label="Filter the options" />
          </div>
        )}
        <div className="wq-chips" role="group" aria-labelledby={`${id}-t`} id={id}>
          {shown.map(([l, v], i) => {
            const on = Array.isArray(a) && a.includes(v);
            return (
              <button type="button" role="checkbox" aria-checked={on} key={v} className={`wq-chip ${on ? 'is-on' : ''}`} onClick={() => toggle(v)} style={{ '--i': i % 24 }}>
                <span className="wq-tick" aria-hidden="true">
                  <Icon name={on ? 'check' : 'plus'} size={12} strokeWidth={3} />
                </span>
                {l}
              </button>
            );
          })}
        </div>
        {Array.isArray(a) && a.length > 0 && <p className="wq-count">{a.length} selected</p>}
      </>
    );
  }
  return (
    <div className={`wq ${err ? 'has-error' : ''} ${filled(a) ? 'is-answered' : ''}`} data-k={`wq.${k}`}>
      <p className="wq-q" id={`${id}-t`}>
        <span className="wq-n" aria-hidden="true">
          {filled(a) ? <Icon name="check" size={13} strokeWidth={3} /> : n}
        </span>
        <label htmlFor={opts === null || (!multi && opts.length > 9) ? id : undefined}>{q[0]}</label>
        {multi && <small className="wq-multi">Pick all that fit</small>}
      </p>
      {control}
      {otherOn && (
        <input className="input wq-other" value={ans[otherKey(k)] || ''} onChange={(e) => setAns(otherKey(k), e.target.value.slice(0, 120))} placeholder="Please specify" aria-label="Please specify" />
      )}
      {err && (
        <p className="field-error" role="alert">
          {err}
        </p>
      )}
    </div>
  );
}

/**
 * journey: 'consumer' | 'pro' | 'teen'; ans/setAnswers: the answers object owned by the page;
 * ctx: { country }; onDone(): all sections valid; onBack(): leave the questionnaire at section 0.
 */
export default function WelcomeQuestions({ journey, ans, setAnswers, ctx, onDone, onBack, startAtEnd = false, doneLabel = 'Review and continue' }) {
  const [bank, setBank] = useState(null);
  const [failed, setFailed] = useState(false);
  const [sec, setSec] = useState(0);
  const [tried, setTried] = useState({});
  const top = useRef(null);
  const jobs = useJobTitles(bank, ans.department);

  useEffect(() => {
    loadBank()
      .then((b) => {
        setBank(b);
        if (startAtEnd) setSec(b.sections[journey].length - 1);
      })
      .catch(() => setFailed(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sections = bank?.sections[journey] || [];
  const allKeys = useMemo(() => sections.flatMap((s) => s.keys), [sections]);
  const setAns = (k, v) =>
    setAnswers((prev) => {
      const next = { ...prev, [k]: v };
      return bank ? prune(bank, journey, allKeys, next, ctx, jobs) : next;
    });

  if (failed)
    return (
      <p className="form-alert" role="alert">
        The questions didn’t load. Check your connection and <button type="button" className="link-soft" onClick={() => window.location.reload()}>reload the page</button>.
      </p>
    );
  if (!bank)
    return (
      <div className="wq-loading" aria-live="polite">
        <span className="btn-spin" aria-hidden="true" /> Loading your welcome questions…
      </div>
    );

  const visibleOf = (s) => s.keys.filter((k) => isVisible(bank, journey, k, ans, ctx, jobs));
  const errsOf = (s) => Object.fromEntries(visibleOf(s).map((k) => [k, questionError(bank, journey, k, ans, ctx, jobs)]).filter(([, e]) => e));
  const doneOf = (s) => visibleOf(s).every((k) => !questionError(bank, journey, k, ans, ctx, jobs));
  const cur = sections[sec];
  const vis = visibleOf(cur);
  const errs = tried[sec] ? errsOf(cur) : {};
  const total = sections.reduce((n, s) => n + visibleOf(s).length, 0);
  const answered = sections.reduce((n, s) => n + visibleOf(s).filter((k) => !questionError(bank, journey, k, ans, ctx, jobs)).length, 0);
  const pct = total ? Math.round((answered / total) * 100) : 0;
  let num = sections.slice(0, sec).reduce((n, s) => n + visibleOf(s).length, 0);

  const go = (i) => {
    setSec(i);
    setTimeout(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
  };
  const next = () => {
    const e = errsOf(cur);
    if (Object.keys(e).length) {
      setTried((t) => ({ ...t, [sec]: true }));
      setTimeout(() => {
        const el = document.querySelector(`[data-k="wq.${Object.keys(e)[0]}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el?.querySelector('button, input')?.focus({ preventScroll: true });
      }, 30);
      return;
    }
    if (sec < sections.length - 1) go(sec + 1);
    else onDone();
  };

  return (
    <div className={`welcomeq wj-${journey}`} ref={top}>
      <div className="wq-head">
        <div className="wq-ring" style={{ '--p': pct }} role="img" aria-label={`${pct}% of the welcome questions answered`}>
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="19" className="wq-ring-bg" />
            <circle cx="22" cy="22" r="19" className="wq-ring-fg" pathLength="100" style={{ strokeDasharray: `${pct} 100` }} />
          </svg>
          <b>{pct}%</b>
        </div>
        <div>
          <p className="wq-kicker">
            Welcome questions · part {sec + 1} of {sections.length}
          </p>
          <h2 className="wq-title">
            <Icon name={cur.icon} size={20} /> {cur.title}
          </h2>
          <p className="wq-blurb">{cur.blurb}</p>
        </div>
      </div>
      <ol className="wq-tabs" aria-label="Welcome question parts">
        {sections.map((s, i) => {
          const done = doneOf(s);
          const can = i <= sec || sections.slice(0, i).every(doneOf);
          return (
            <li key={s.id}>
              <button type="button" className={`wq-tab ${i === sec ? 'is-on' : ''} ${done ? 'is-done' : ''}`} disabled={!can} aria-current={i === sec ? 'step' : undefined} onClick={() => go(i)}>
                <span className="wq-tab-ico">{done ? <Icon name="check" size={12} strokeWidth={3} /> : <Icon name={s.icon} size={13} />}</span>
                <span className="wq-tab-l">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="wq-list" key={cur.id}>
        {vis.map((k) => (
          <Question key={k} n={++num} k={k} bank={bank} journey={journey} ans={ans} setAns={setAns} ctx={ctx} jobs={jobs} err={errs[k]} />
        ))}
      </div>
      <div className="join-actions">
        {(sec > 0 || onBack) && (
          <button type="button" className="btn btn-ghost btn-lg" onClick={() => (sec > 0 ? go(sec - 1) : onBack())}>
            <Icon name="arrowLeft" size={18} /> Back
          </button>
        )}
        <button type="button" className="btn btn-primary btn-lg btn-shimmer" onClick={next}>
          {sec < sections.length - 1 ? (
            <>
              Next: {sections[sec + 1].title} <Icon name="arrow" size={18} />
            </>
          ) : (
            <>
              {doneLabel} <Icon name="arrow" size={18} />
            </>
          )}
        </button>
      </div>
      <p className="wq-save-note">
        <Icon name="shield" size={14} /> Answers stay on this device until you send them on the last step. Going back never loses them.
      </p>
    </div>
  );
}
