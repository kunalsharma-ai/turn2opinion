// Teen profile section, /teen/profile/ (signed-in Teen members, 21 Nov 2026).
// "Studio" design: the teen's own record, the guardian record kept apart (masked), the consent
// records, and the 13 profile "worlds" from the attached Teen Profile Survey. Every answer already on
// file (registration, welcome survey, earlier profiles) counts as done and is never asked again; a
// world opens on its unanswered questions only, with "Edit my answers" to change earlier ones.
// Data: GET / PUT /api/v1/user/teen-profile.
import { useEffect, useMemo, useState } from 'react';
import { hrefFor } from '../router/Router.jsx';
import { ENV } from '../config/env.js';
import { api } from '../utils/api.js';
import Icon from '../components/Icon.jsx';
import { Flag } from '../components/Brand.jsx';
import { COUNTRIES } from '../data/countries.js';
import { formatDate, PhoneField } from '../components/FormFields.jsx';
import { fullPhone, phoneError, splitPhone } from '../utils/signup.js';
import { playSuccess, pop } from '../utils/sound.js';
import { DASHBOARD } from '../utils/session.js';
import QInput, { isShown, qError } from '../components/survey/QInput.jsx';
import { MINOR_PROFILES } from '../data/teen/teenProfiles.js';
import { exactAge, relWord } from '../data/teen/registration.js';
import { TeenStatus } from '../components/TeenJoin.jsx';

const has = (v) => v != null && v !== '' && !(Array.isArray(v) && !v.length);
const DEMO = {
  ref: 'T2O-TN-4F2A9C',
  status: 'account-active',
  teen: { name: { first: 'Riya', last: 'Shah' }, mail: 'riya@example.com', phone: '', dob: '2011-03-14', gender: 'Female', address: { country: 'in', state: 'IN-MH', city: 'Pune', zipcode: '411001' } },
  guardian: { relation: 'mother', name: { first: 'Meera', last: 'Shah' }, email: 'm••••a@e•••••.com', approvedAt: new Date().toISOString() },
  consents: [
    { who: 'teen', version: 'T2O-TEEN-REG-2026.11', at: new Date(Date.now() - 864e5).toISOString() },
    { who: 'guardian', version: 'MINOR-2026.10', at: new Date().toISOString(), selections: { participation: true, privacy: true, contact: true, studyContact: true, recording: false, sensitive: false } }
  ],
  answers: { D01: '15', D02: 'IN', D03: 'IN-MH', D06: 'Female', D04: 'city', D05: 'en', D08: 'upper', D09: 'ft' }
};

const qsOf = (p) => p.sections.flatMap((s) => s.qs);
function progress(p, a) {
  const shown = qsOf(p).filter((q) => isShown(q, a));
  const done = shown.filter((q) => (q.kind === 'name' ? has(a[q.fields[0]]) : has(a[q.n]))).length;
  return { done, total: shown.length };
}

function World({ p, a, onSave, onClose }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState({});
  const [i, setI] = useState(0);
  const [tried, setTried] = useState(false);
  const [saving, setSaving] = useState(false);
  const merged = { ...a, ...draft };
  // Only what is still unanswered, unless the teen asks to edit; D01–D03/D06 belong to registration.
  const list = useMemo(
    () => qsOf(p).filter((q) => !['D01', 'D02', 'D03', 'D06'].includes(q.n) && (edit || !has(a[q.n]))),
    [p, a, edit]
  );
  const shown = list.filter((q) => isShown(q, merged));
  const q = shown[i];
  const err = q ? qError(q, merged) : '';
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const save = async () => {
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    playSuccess();
    onClose();
  };
  return (
    <div className="tpr-world" role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="tpr-world-card">
        <header>
          <span className="tpr-world-e" aria-hidden="true">
            {p.icon}
          </span>
          <div>
            <h2>{p.name}</h2>
            <p>{p.blurb}</p>
          </div>
          <button type="button" className="tpr-x" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </header>
        {!q ? (
          <div className="tpr-world-end">
            <p>{shown.length ? 'All answered in this world.' : 'Nothing new to answer here. We never ask twice.'}</p>
            <div className="tpr-actions">
              {!edit && (
                <button type="button" className="tpr-btn is-ghost" onClick={() => { setEdit(true); setI(0); }}>
                  Edit my answers
                </button>
              )}
              <button type="button" className="tpr-btn" onClick={Object.keys(draft).length ? save : onClose} disabled={saving}>
                {saving ? 'Saving…' : Object.keys(draft).length ? 'Save' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="tpr-world-bar" style={{ '--p': (i + 1) / shown.length }}>
              <i />
              <span>
                {i + 1} / {shown.length}
              </span>
            </div>
            <div className="tpr-q" key={q.n}>
              <h3>{q.q}</h3>
              {q.help && <p className="tpr-help">{q.help}</p>}
              <QInput q={q} a={merged} set={set} skin="tpq" invalid={tried && !!err} />
              {tried && err && (
                <p className="field-error" role="alert">
                  {err}
                </p>
              )}
            </div>
            <div className="tpr-actions">
              {i > 0 && (
                <button type="button" className="tpr-btn is-ghost" onClick={() => setI(i - 1)}>
                  <Icon name="arrowLeft" size={16} />
                </button>
              )}
              <button type="button" className="tpr-btn is-ghost" onClick={() => { setTried(false); setI(i + 1); }}>
                Skip
              </button>
              <button
                type="button"
                className="tpr-btn"
                onClick={() => {
                  if (err) return setTried(true);
                  setTried(false);
                  pop({ pitch: 1 + i * 0.05 });
                  if (i === shown.length - 1) return save();
                  setI(i + 1);
                }}
                disabled={saving}
              >
                {i === shown.length - 1 ? (saving ? 'Saving…' : 'Save') : 'Next'} <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TeenProfile() {
  const [d, setD] = useState(null);
  const [state, setState] = useState('loading');
  const [open, setOpen] = useState(null);
  const [phone, setPhone] = useState({ dial: '', phone: '' });
  const [phoneMsg, setPhoneMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (ENV.DEMO_MODE) {
        setD(DEMO);
        return setState('ready');
      }
      try {
        const me = await api.get('/api/v1/me');
        if (me?.status !== 'success') return window.location.replace(hrefFor('/login/'));
        const r = await api.get('/api/v1/user/teen-profile');
        if (r?.status !== 'success') return window.location.replace(DASHBOARD);
        setD(r.data);
        setPhone(r.data.teen?.phone ? splitPhone(r.data.teen.phone) : { dial: String(r.data.teen?.address?.country || '').toUpperCase(), phone: '' });
        setState('ready');
      } catch {
        setState('error');
      }
    })();
  }, []);

  const a = d?.answers || {};
  const saveAnswers = async (draft) => {
    const answers = Object.fromEntries(Object.entries(draft).filter(([, v]) => has(v)));
    if (!ENV.DEMO_MODE) await api.put('/api/v1/user/teen-profile', { answers }).catch(() => null);
    setD((x) => ({ ...x, answers: { ...x.answers, ...answers } }));
  };
  const savePhone = async () => {
    if (phone.phone && phoneError(phone.dial, phone.phone)) return setPhoneMsg(phoneError(phone.dial, phone.phone));
    const r = ENV.DEMO_MODE ? { status: 'success' } : await api.put('/api/v1/user/teen-profile', { phone: phone.phone ? fullPhone(phone.dial, phone.phone) : '' }).catch(() => null);
    setPhoneMsg(r?.status === 'success' ? 'Saved.' : 'We couldn’t save it. Please try again.');
  };

  if (state !== 'ready')
    return (
      <section className="tpr tpr-wait">
        <p role="status">{state === 'error' ? 'We couldn’t load your profile. Please refresh the page.' : <><span className="btn-spin" aria-hidden="true" /> Loading your studio…</>}</p>
      </section>
    );

  const t = d.teen || {};
  const cc = String(t.address?.country || '').toUpperCase();
  const c = COUNTRIES.find((x) => x.c === cc);
  const totals = MINOR_PROFILES.map((p) => progress(p, a));
  const all = totals.reduce((s, x) => s + x.done, 0);
  const of = totals.reduce((s, x) => s + x.total, 0);
  const guardianC = d.consents.find((x) => x.who === 'guardian');
  return (
    <section className="tpr">
      <div className="tpr-bg" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="wrap">
        <header className="tpr-hero">
          <div className="tpr-id">
            <span className="tpr-av" aria-hidden="true">
              {(t.name?.first || '?')[0]}
            </span>
            <div>
              <p className="tpr-chip">Teen panel · active</p>
              <h1>{[t.name?.first, t.name?.last].filter(Boolean).join(' ')}</h1>
              <p className="tpr-sub">
                Reference <b data-allow-copy>{d.ref}</b> · Username {t.mail}
              </p>
            </div>
          </div>
          <div className="tpr-meter" style={{ '--p': of ? all / of : 0 }}>
            <span className="tpr-meter-ring" aria-hidden="true" />
            <b>{of ? Math.round((all / of) * 100) : 0}%</b>
            <small>profile complete</small>
          </div>
          <a className="tpr-btn" href={DASHBOARD}>
            My surveys <Icon name="arrow" size={16} />
          </a>
        </header>

        <div className="tpr-cols">
          <section className="tpr-card tpr-me">
            <h2>
              <Icon name="user" size={18} /> About me
            </h2>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{[t.name?.first, t.name?.middle, t.name?.last].filter(Boolean).join(' ')}</dd>
              </div>
              <div>
                <dt>Birthday</dt>
                <dd>
                  {t.dob ? formatDate(String(t.dob).slice(0, 10)) : '—'} · age {exactAge(String(t.dob || '').slice(0, 10)) ?? '—'}
                </dd>
              </div>
              <div>
                <dt>Gender</dt>
                <dd>{a['D06-other'] || a.D06 || t.gender || '—'}</dd>
              </div>
              <div>
                <dt>Lives in</dt>
                <dd>
                  {c && <Flag code={c.c} size={14} />} {[t.address?.city, t.address?.zipcode, c?.n].filter(Boolean).join(', ')}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{t.mail}</dd>
              </div>
            </dl>
            <div className="tpr-phone">
              <p>Phone (optional, you can change this yourself)</p>
              <PhoneField id="tp-phone" country={phone.dial} number={phone.phone} onCountry={(v) => setPhone((p) => ({ ...p, dial: v }))} onNumber={(v) => setPhone((p) => ({ ...p, phone: v }))} />
              <button type="button" className="tpr-btn is-ghost" onClick={savePhone}>
                Save phone
              </button>
              {phoneMsg && <small role="status">{phoneMsg}</small>}
            </div>
            <p className="tpr-note">
              <Icon name="lock" size={14} /> Name, birthday, email and country were checked by your {relWord(d.guardian?.relation)}. To change them, write to support@turn2opinion.com: we confirm the change with them first.
            </p>
          </section>

          <section className="tpr-card tpr-guard">
            <h2>
              <Icon name="shield" size={18} /> My {relWord(d.guardian?.relation)}
            </h2>
            <p className="tpr-guard-n">{[d.guardian?.name?.first, d.guardian?.name?.last].filter(Boolean).join(' ')}</p>
            <p className="tpr-guard-m">{d.guardian?.email}</p>
            <p className="tpr-small">Their record is kept separately from yours. You never see their full contact details, and they never need your password.</p>
            <h3>Consent records</h3>
            <ul className="tpr-consents">
              {d.consents.map((x) => (
                <li key={x.who}>
                  <b>{x.who === 'teen' ? 'Your confirmations' : 'Guardian consent'}</b>
                  <span>
                    {x.version} · {x.at ? new Date(x.at).toLocaleDateString() : ''}
                  </span>
                </li>
              ))}
            </ul>
            {guardianC?.selections && (
              <p className="tpr-small">
                Optional permissions: study contact {guardianC.selections.studyContact ? 'yes' : 'no'} · recordings {guardianC.selections.recording ? 'yes' : 'no'} · sensitive topics {guardianC.selections.sensitive ? 'yes' : 'no'}
              </p>
            )}
            <TeenStatus stage={d.status} compact />
            <a className="tpr-btn is-ghost" href="/member/profile/#family">
              Everything my {relWord(d.guardian?.relation)} shared <Icon name="arrow" size={16} />
            </a>
          </section>
        </div>

        <h2 className="tpr-worlds-h">
          Your profile worlds <small>Answer any world, any time. Each one helps match better surveys.</small>
        </h2>
        <div className="tpr-worlds">
          {MINOR_PROFILES.map((p, k) => {
            const pr = totals[k];
            const done = pr.total && pr.done >= pr.total;
            return (
              <button key={p.id} type="button" className={`tpr-tile ${done ? 'is-done' : ''}`} style={{ '--i': k, '--p': pr.total ? pr.done / pr.total : 0 }} onClick={() => setOpen(p)}>
                <span className="tpr-tile-ring" aria-hidden="true">
                  <span>{p.icon}</span>
                </span>
                <b>{p.name}</b>
                <small>{done ? 'Complete' : `${pr.done} of ${pr.total} answered`}</small>
              </button>
            );
          })}
        </div>
        <p className="tpr-small tpr-privacy">We never ask for your school name, exact address or location. Skip anything you like.</p>
      </div>
      {open && <World p={open} a={a} onSave={saveAnswers} onClose={() => setOpen(null)} />}
    </section>
  );
}
