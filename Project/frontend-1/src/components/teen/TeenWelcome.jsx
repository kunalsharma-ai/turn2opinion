// Teen welcome survey, straight after the first login (21 Nov 2026).
// "Deck" design: one big card per question, swiped away when answered, a ring that fills as you go,
// then a review card before saving. Questions come from the attached Teen Profile Survey ("The
// basics" and "School & learning"); anything already on file (birthday/age, country, region and
// gender from registration, or any earlier answer) is skipped, and the reason is shown.
// Saved with PUT /api/v1/user/welcome, which marks the welcome survey complete.
import { useEffect, useMemo, useState } from 'react';
import { hrefFor } from '../../router/Router.jsx';
import { ENV } from '../../config/env.js';
import { api } from '../../utils/api.js';
import { track } from '../../utils/analytics.js';
import { playSuccess, pop } from '../../utils/sound.js';
import Icon from '../Icon.jsx';
import QInput, { answerText, isRequired, qError } from '../survey/QInput.jsx';
import { MINOR_PROFILES } from '../../data/teen/teenProfiles.js';
import { KNOWN_FROM_REGISTRATION, TEEN_WELCOME_KEYS } from '../../data/teen/registration.js';

const ALL_Q = Object.fromEntries(MINOR_PROFILES.flatMap((p) => p.sections.flatMap((s) => s.qs.map((q) => [q.n, { ...q, profile: p.name }]))));
export const TEEN_HOME = '/teen/profile/';

export default function TeenWelcome({ me }) {
  const [known, setKnown] = useState(null);
  const [a, setA] = useState({});
  const [i, setI] = useState(0);
  const [tried, setTried] = useState(false);
  const [state, setState] = useState('ask');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      let ans = {};
      if (!ENV.DEMO_MODE) {
        try {
          const r = await api.get('/api/v1/user/teen-profile');
          ans = (r?.status === 'success' && r.data?.answers) || {};
        } catch {
          ans = {};
        }
      } else ans = { D01: '15', D02: 'IN', D03: 'IN-MH', D06: 'Female' };
      setKnown(ans);
    })();
  }, []);

  const queue = useMemo(() => (known ? TEEN_WELCOME_KEYS.filter((k) => ALL_Q[k] && (known[k] == null || known[k] === '' || (Array.isArray(known[k]) && !known[k].length))).map((k) => ALL_Q[k]) : []), [known]);
  const skipped = known ? [...KNOWN_FROM_REGISTRATION, ...TEEN_WELCOME_KEYS].filter((k) => known[k] != null && known[k] !== '') : [];
  const q = queue[i];
  const atReview = known && i >= queue.length;
  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const err = q ? qError(q, a) : '';

  const next = () => {
    if (err) return setTried(true);
    setTried(false);
    pop({ pitch: 1 + i * 0.12 });
    setI((n) => n + 1);
  };
  const save = async () => {
    setState('saving');
    setMsg('');
    const welcome = {};
    Object.entries(a).forEach(([k, v]) => {
      if (v != null && v !== '' && !(Array.isArray(v) && !v.length)) welcome[k] = v;
    });
    if (!Object.keys(welcome).length) welcome.D10 = Intl.DateTimeFormat().resolvedOptions().timeZone;
    else welcome.D10 = welcome.D10 || Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const r = await api.put('/api/v1/user/welcome', { welcome });
      if (r?.status !== 'success') {
        setState('ask');
        return setMsg('We couldn’t save your answers. Please try again.');
      }
      track('welcome_complete', { category: 'minor', answers: Object.keys(welcome).length });
      playSuccess();
      setState('done');
      setTimeout(() => window.location.assign(hrefFor(TEEN_HOME)), ENV.DEMO_MODE ? 2200 : 1100);
    } catch {
      setState('ask');
      setMsg('Unable to save. Check your connection and try again.');
    }
  };

  const pct = queue.length ? Math.min(1, i / queue.length) : 1;
  return (
    <section className="twl">
      <div className="twl-bg" aria-hidden="true">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
      </div>
      <div className="wrap twl-grid">
        <header className="twl-hello">
          <span className="twl-ring" style={{ '--p': pct }} aria-hidden="true">
            <b>{atReview ? '✓' : `${Math.min(i + 1, queue.length)}/${queue.length || 0}`}</b>
          </span>
          <div>
            <p className="twl-chip">Welcome to the Teen panel</p>
            <h1>Hey {me?.name?.first || 'there'}! {!known ? 'Welcome to the Teen panel.' : queue.length ? `${queue.length} quick taps and you’re set.` : 'You’re all set.'}</h1>
            <p>These help us send surveys that fit you. Everything else can wait for later surveys.</p>
          </div>
        </header>
        {skipped.length > 0 && (
          <p className="twl-known">
            <Icon name="check" size={14} strokeWidth={3} /> Skipped {skipped.length} question{skipped.length > 1 ? 's' : ''} you already answered at registration (age, country, region and gender). We never ask twice.
          </p>
        )}
        <div className="twl-deck">
          {state === 'done' ? (
            <div className="twl-card is-done">
              <span className="twl-burst" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, k) => (
                  <i key={k} style={{ '--k': k }} />
                ))}
              </span>
              <h2>Saved! 🎉</h2>
              <p>Opening your Teen profile…</p>
            </div>
          ) : !known ? (
            <div className="twl-card">
              <p role="status">
                <span className="btn-spin" aria-hidden="true" /> Getting your questions…
              </p>
            </div>
          ) : atReview ? (
            <div className="twl-card is-review">
              <h2>Quick check</h2>
              <dl>
                {queue.map((x, k) => (
                  <div key={x.n}>
                    <dt>{x.q}</dt>
                    <dd>
                      {answerText(x, a) || <i>Skipped</i>}{' '}
                      <button type="button" className="link-soft" onClick={() => setI(k)}>
                        Change
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>
              {msg && (
                <p className="form-alert" role="alert">
                  {msg}
                </p>
              )}
              <div className="twl-actions">
                {queue.length > 0 && (
                  <button type="button" className="twl-btn is-ghost" onClick={() => setI(queue.length - 1)}>
                    <Icon name="arrowLeft" size={16} /> Back
                  </button>
                )}
                <button type="button" className="twl-btn" onClick={save} disabled={state === 'saving'}>
                  {state === 'saving' ? 'Saving…' : 'Save and open my profile'} <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="twl-card-ghost g2" aria-hidden="true" />
              <span className="twl-card-ghost g1" aria-hidden="true" />
              <div className="twl-card" key={q.n}>
                <p className="twl-from">
                  {q.profile} · {isRequired(q, a) ? 'needed' : 'optional'}
                </p>
                <h2>{q.q}</h2>
                {q.help && <p className="twl-help">{q.help}</p>}
                <QInput q={q} a={a} set={(k, v) => { set(k, v); if (!q.multi && q.o && k === q.n && v !== q.other) setTimeout(() => { setTried(false); setI((n) => n + 1); }, 260); }} skin="twq" invalid={tried && !!err} />
                {tried && err && (
                  <p className="field-error" role="alert">
                    {err}
                  </p>
                )}
                <div className="twl-actions">
                  {i > 0 && (
                    <button type="button" className="twl-btn is-ghost" onClick={() => setI(i - 1)}>
                      <Icon name="arrowLeft" size={16} />
                    </button>
                  )}
                  {!isRequired(q, a) && (
                    <button type="button" className="twl-btn is-ghost" onClick={() => setI(i + 1)}>
                      Skip
                    </button>
                  )}
                  <button type="button" className="twl-btn" onClick={next}>
                    Next <Icon name="arrow" size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
