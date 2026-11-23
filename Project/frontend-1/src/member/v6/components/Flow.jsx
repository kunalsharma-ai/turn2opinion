// The v6 question screen on the member area's real questions.
// Layout from the v6 design: one sticky flow bar (Dashboard · item · journey track · Question n of N · +50/+1)
// and ONE question per card on the item's own world background. Opening lands straight on a question:
// a new profile on its first question, a started one on its first unanswered question.
// Data and saving are unchanged from the member area (see ../questions.js):
//   - saved answers load once with POST /api/v1/me
//   - a profile saves page by page with PATCH /api/v1/me/profile, when the member leaves a page's last question
//   - a Turn2Opinion survey saves once at the end with PATCH /api/v1/me/survey { ...answers, respID }
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { actions } from '../../data/source.js';
import { useMe } from '../../data/MemberData.jsx';
import { useToast } from '../../components/ui.jsx';
import { t as mt } from '../../i18n/t.js';
import { Icon } from './Icon.jsx';
import { profileEmoji, qEmoji } from '../lib/emoji.js';
import { optEmojiSet } from '../lib/emoji-plus.js';
import { burst, finePointer, reducedMotion } from '../lib/fx.js';
import { POINTS_PER_ITEM, QUALITY_PER_ITEM } from '../lib/rewards.js';
import { t, nf } from '../i18n/index.js';
import { CHOICE, DIAL, checkAnswer, filled, loadQuestion, maxHint, moneyLabel, safeHtml, specifyLabel, withExtras } from '../questions.js';

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const Pic = ({ e, cls = 'ic' }) => (!e ? null : typeof e === 'string' ? <span className={cls + ' emo'} aria-hidden="true">{e}</span> : <span className={cls + ' mono'} aria-hidden="true">{e.mono}</span>);
const multi = (q) => q.type === 'multiselect' || q.type === 'checkbox';

/**
 * kind: 'profile' | 'survey'
 * source: profile { slug, name, pages } or opened survey { name, slug, pages, description, thankyou, respID }
 * onHome(): back to the dashboard (answers are already saved page by page)
 * onDone({ first }): a profile was completed (first = it was not complete before)
 */
export default function Flow({ kind, source, wasDone, onHome, onDone }) {
  const me = useMe();
  const toast = useToast();
  const pages = useMemo(() => (source.pages || []).filter((p) => Array.isArray(p) && p.length > 1), [source.pages]);
  const all = useMemo(() => [...new Set(pages.flatMap((p) => p.slice(1)))], [pages]);
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(null);
  const [cur, setCur] = useState(null); // question name, or a marker: '<first>' '<last>' '<open>'
  const [dir, setDir] = useState(1);
  const [qKey, setQKey] = useState(0);
  const [err, setErr] = useState(null);
  const [shake, setShake] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [defs, setDefs] = useState({});
  const [opts, setOpts] = useState({});
  const alive = useRef(true);
  const timer = useRef(0);
  const shownAt = useRef(0);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  // saved answers for every question (one call)
  useEffect(() => {
    let live = true;
    if (!all.length) {
      setLoaded(true);
      return undefined;
    }
    actions
      .answers(all)
      .then((d) => {
        if (!live) return;
        const v = {};
        all.forEach((n) => {
          if (d && filled(d[n]) && n !== 'age') v[n] = d[n];
          if (d && filled(d[`${n}_specify`])) v[`${n}_specify`] = d[`${n}_specify`];
        });
        setValues(v);
        setSaved(d || {});
      })
      .catch(() => {})
      .finally(() => live && setLoaded(true));
    return () => {
      live = false;
    };
  }, [all]);

  // land on the first page with an unanswered question (a completed profile opens at the start)
  useEffect(() => {
    if (!loaded || page !== null) return;
    const i = wasDone ? -1 : pages.findIndex((pg) => pg.slice(1).some((n) => !filled(saved[n])));
    setPage(i < 0 ? 0 : i);
    setCur(wasDone || i < 0 ? '<first>' : '<open>');
  }, [loaded, page, pages, saved, wasDone]);

  const names = page != null ? pages[page]?.slice(1) || [] : [];

  useEffect(() => {
    names.forEach((n) => {
      if (defs[n] !== undefined) return;
      loadQuestion(n).then((q) => alive.current && setDefs((d) => ({ ...d, [n]: q })));
    });
  }, [names.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  const optKey = (q) => `${q.name}::${q.parent ? JSON.stringify(values[q.parent] ?? null) : ''}`;
  useEffect(() => {
    names.forEach((n) => {
      const q = defs[n];
      if (!q) return;
      const key = optKey(q);
      if (opts[key] !== undefined) return;
      setOpts((o) => ({ ...o, [key]: 'loading' }));
      actions
        .options(q, q.parent ? values[q.parent] : undefined)
        .then((r) => alive.current && setOpts((o) => ({ ...o, [key]: r ?? (CHOICE.includes(q.type) ? [] : null) })))
        .catch(() => alive.current && setOpts((o) => ({ ...o, [key]: CHOICE.includes(q.type) ? [] : null })));
    });
  }); // one request per question and parent answer (cached in opts)

  const visible = names
    .map((n) => defs[n])
    .filter(Boolean)
    .filter((q) => {
      if (q.name === 'alternate-phone-whatsapp') return false;
      if (q.name === 'alternate-phone' && !filled(values.phone)) return false;
      if (q.parent && !filled(values[q.parent])) return false;
      const o = opts[optKey(q)];
      if (CHOICE.includes(q.type)) return Array.isArray(o) && o.length > 0;
      if (q.type === 'text') return Boolean(o && o !== 'loading' && o.pattern);
      return ['phone', 'date'].includes(q.type);
    });
  const pageReady =
    names.length > 0 &&
    names.every((n) => {
      const q = defs[n];
      if (q === undefined) return false;
      if (!q || (q.parent && !filled(values[q.parent])) || ['phone', 'date'].includes(q.type)) return true;
      const o = opts[optKey(q)];
      return o !== undefined && o !== 'loading';
    });

  // resolve the landing markers once the page's questions are known
  useEffect(() => {
    if (!pageReady || !cur || !cur.startsWith('<')) return;
    if (!visible.length) {
      // nothing to ask on this page (all hidden): move on in the same direction
      if (dir < 0 && page > 0) {
        setPage(page - 1);
        setCur('<last>');
      } else if (page < pages.length - 1) {
        setPage(page + 1);
        setCur('<first>');
      } else finish();
      return;
    }
    const pick = cur === '<last>' ? visible[visible.length - 1] : cur === '<open>' ? visible.find((q) => !filled(values[q.name])) || visible[0] : visible[0];
    setCur(pick.name);
    setQKey((k) => k + 1);
    shownAt.current = Date.now();
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const idx = visible.findIndex((q) => q.name === cur);
  const q = idx >= 0 ? visible[idx] : null;
  const before = pages.slice(0, page || 0).reduce((s, p) => s + p.length - 1, 0);
  const pos = Math.min(all.length, before + Math.max(0, idx) + 1);
  const pct = done ? 100 : Math.round(((pos - 1) / Math.max(1, all.length)) * 100);
  const lastPage = page === pages.length - 1;
  const lastQ = lastPage && idx === visible.length - 1;

  const show = (name, d) => {
    clearTimeout(timer.current);
    setErr(null);
    setShake(false);
    setDir(d);
    setCur(name);
    setQKey((k) => k + 1);
    shownAt.current = Date.now();
  };

  const setValue = useCallback(
    (qq, v) => {
      setValues((prev) => {
        const next = { ...prev, [qq.name]: v };
        const deps = new Set(qq.children || []);
        Object.values(defs).forEach((d) => d && d.parent === qq.name && deps.add(d.name));
        deps.forEach((n) => {
          if (n in next) next[n] = Array.isArray(next[n]) ? [] : null;
        });
        return next;
      });
      setErr(null);
    },
    [defs]
  );

  function pageValues() {
    const out = {};
    visible.forEach((x) => {
      out[x.name] = values[x.name] ?? (multi(x) ? [] : null);
      if (filled(values[`${x.name}_specify`])) out[`${x.name}_specify`] = values[`${x.name}_specify`];
    });
    names.forEach((n) => {
      if (!(n in out) && n in values) out[n] = values[n];
    });
    return out;
  }

  async function finish() {
    if (kind === 'survey') {
      setBusy(true);
      try {
        const allVals = {};
        all.forEach((n) => {
          if (n in values) allVals[n] = values[n];
          if (filled(values[`${n}_specify`])) allVals[`${n}_specify`] = values[`${n}_specify`];
        });
        await actions.saveSurvey(allVals, source.respID);
        if (!alive.current) return;
        setDone(true);
        onDone?.({ first: true });
      } catch (e) {
        toast(e?.message && e.message !== 'error' ? e.message : mt('qz.saveErr'), 'error');
      } finally {
        if (alive.current) setBusy(false);
      }
      return;
    }
    onDone?.({ first: !wasDone });
  }

  function fail(text) {
    setErr(text);
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    document.getElementById('qi')?.focus();
  }

  async function next() {
    if (busy || !q) return;
    clearTimeout(timer.current);
    const o = opts[optKey(q)];
    const e = checkAnswer(q, values, o, me.dob);
    if (e) return fail(e);
    if (specifyLabel(q, values[q.name], withExtras(q, o)) && !filled(values[`${q.name}_specify`])) return fail(mt('qz.specify.req'));
    // wait for questions that depend on this answer before deciding what comes next
    if (!pageReady) return setPending(true);
    if (idx < visible.length - 1) return show(visible[idx + 1].name, 1);
    // end of the page: a profile saves this page now
    setBusy(true);
    try {
      if (kind === 'profile') {
        const pv = pageValues();
        await actions.saveProfile(pv);
        if (!alive.current) return;
        setSaved((s) => ({ ...s, ...pv }));
      }
      if (lastPage) {
        await finish();
      } else {
        setDir(1);
        setErr(null);
        setPage(page + 1);
        setCur('<first>');
      }
    } catch (er) {
      toast(er?.message && er.message !== 'error' ? er.message : mt('qz.saveErr'), 'error');
    } finally {
      if (alive.current) setBusy(false);
    }
  }
  useEffect(() => {
    if (pending && pageReady) {
      setPending(false);
      next();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  function back() {
    clearTimeout(timer.current);
    if (idx > 0) return show(visible[idx - 1].name, -1);
    if (page > 0) {
      setDir(-1);
      setErr(null);
      setPage(page - 1);
      setCur('<last>');
      return;
    }
    onHome();
  }

  // a single-choice pick moves on by itself (like the design), unless it asks to specify
  function auto(qq, v, el) {
    clearTimeout(timer.current);
    if (el && !reducedMotion()) {
      document.querySelectorAll('#t2o .adv').forEach((a) => a.remove());
      const sw = document.createElement('span');
      sw.className = 'adv';
      el.append(sw);
    }
    const o = withExtras(qq, opts[optKey(qq)]);
    if (specifyLabel(qq, v, o)) return;
    timer.current = setTimeout(() => alive.current && setPending(true), 420);
  }

  // focus the field (or the question) when it changes; keep the card in view
  useEffect(() => {
    const inp = document.getElementById('qi');
    if (inp && finePointer() && inp.type !== 'date') inp.focus({ preventScroll: true });
    else document.getElementById('qh')?.focus({ preventScroll: true });
    const cd = document.getElementById('cd');
    if (cd) {
      const r = cd.getBoundingClientRect();
      if (r.top < 0 || r.top > innerHeight * 0.6) cd.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }, [qKey]);

  const [e1, e2, e3] = profileEmoji(source.slug);
  const title = source.name;
  const sec = page != null ? pages[page]?.[0] : '';
  const nextLabel = busy ? t('saving') : lastQ ? (kind === 'profile' ? (wasDone ? t('save_changes') : t('finish')) : t('finish')) : t('continue');

  let card;
  if (done) {
    card = (
      <div className="qcard donecard" id="cd">
        <span className="err-emo" aria-hidden="true">🎉</span>
        <h2 className="qt6" id="qh" tabIndex={-1}>
          {mt('qz.done.survey')}
        </h2>
        {source.thankyou ? <div className="hint6 html6" dangerouslySetInnerHTML={{ __html: safeHtml(source.thankyou) }} /> : <p className="hint6">{mt('qz.done.surveyP')}</p>}
        <div className="nav6">
          <span />
          <button className="btn6 primary" type="button" onClick={onHome}>
            {mt('qz.backTo', { place: mt('nav.surveys') })}
            <Icon n="arrow-r" />
          </button>
        </div>
      </div>
    );
  } else if (!q) {
    card = (
      <div className="qcard skel6" role="status" aria-label={t('loading')} id="cd">
        <span className="sk w40" />
        <span className="sk h1" />
        <span className="sk row" />
        <span className="sk row" />
        <span className="sk row short" />
      </div>
    );
  } else {
    const o = opts[optKey(q)];
    const list = CHOICE.includes(q.type) ? withExtras(q, o).map((x) => (q.isMoney ? { ...x, label: moneyLabel(x.label, values.country || me.address?.country) } : x)) : [];
    const spec = specifyLabel(q, values[q.name], list);
    const ok = !err && filled(values[q.name]) && !checkAnswer(q, values, o, me.dob);
    const disabled = !q.editable && filled(saved[q.name]);
    card = (
      <div className={'qcard' + (err ? ' bad' : ok ? ' ok' : '') + (shake ? ' shake' : '')} id="cd">
        <div className={'qb6 ' + (dir > 0 ? 'in-f' : 'in-b')} key={qKey}>
          <div className="qh6">
            <span className="qe6" aria-hidden="true">
              {qEmoji(q.name, q.label, source.slug)}
            </span>
            <span className="qsec">{sec || title}</span>
            {!q.required && <span className="qopt">{t('optional')}</span>}
          </div>
          <h2 className="qt6" id="qh" tabIndex={-1}>
            {q.label}
          </h2>
          {kind === 'survey' && page === 0 && idx === 0 && source.description ? <div className="hint6 html6" dangerouslySetInnerHTML={{ __html: safeHtml(source.description) }} /> : null}
          {multi(q) && <p className="hint6">{q.max > 0 ? maxHint(q.max) : t('select_all')}</p>}
          <div id="fld" className="fld6">
            <Field
              q={q}
              list={list}
              value={values[q.name]}
              disabled={disabled}
              invalid={!!err}
              lockedPhone={q.name === 'phone' && filled(saved.phone)}
              onChange={(v) => setValue(q, v)}
              onPick={(v, el) => auto(q, v, el)}
              onEnter={next}
            />
          </div>
          {spec && (
            <div className={'other6' + (err ? ' bad' : '')}>
              <label htmlFor="qo">
                <span aria-hidden="true">✍️</span>
                {spec}
              </label>
              <input
                id="qo"
                className="in6"
                type="text"
                value={values[`${q.name}_specify`] || ''}
                maxLength={120}
                autoComplete="off"
                placeholder={t('other_ph')}
                aria-describedby="er"
                onChange={(e) => {
                  setValues((p) => ({ ...p, [`${q.name}_specify`]: e.target.value }));
                  setErr(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    next();
                  }
                }}
              />
            </div>
          )}
          <div className="er6" id="er" role="alert">
            {err && (
              <>
                <Icon n="x" />
                {err}
              </>
            )}
          </div>
          <div className="nav6">
            <button className="btn6 ghost" type="button" onClick={back} disabled={busy}>
              <Icon n="arrow-l" />
              <span>{idx > 0 || page > 0 ? t('back') : t('v6_dashboard')}</span>
            </button>
            <button className="btn6 primary" type="button" disabled={busy || pending} onClick={() => Date.now() - shownAt.current > 250 && next()}>
              {busy || pending ? <span className="spin6" /> : null}
              <span>{nextLabel}</span>
              {!busy && <Icon n={lastQ ? 'check' : 'arrow-r'} />}
            </button>
          </div>
          <p className="kbd6">{kind === 'profile' ? `${t('kbd')} · ${mt('qz.autosave')}` : t('kbd')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flow6">
      <div className="world6" aria-hidden="true">
        <span className="w-pat" />
        <span className="w-blob a" />
        <span className="w-blob b" />
        <span className="w-e e1">{e1}</span>
        <span className="w-e e2">{e2}</span>
        <span className="w-e e3">{e3}</span>
      </div>
      <div className="fbar">
        <button type="button" className="fb-back" onClick={onHome}>
          <Icon n="arrow-l" />
          <span>{t('v6_dashboard')}</span>
        </button>
        <div className="fb-mid">
          <p className="fb-name">
            <span aria-hidden="true">{e1}</span>
            <b>{title}</b>
            <small>{kind === 'survey' ? t('v6_survey') : t('v6_profile')}</small>
          </p>
          <div className="fb-track" role="progressbar" aria-label={t('ring_label')} aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
            <i style={{ '--w': pct + '%' }} />
            <span className="fb-me" style={{ '--x': pct + '%' }} aria-hidden="true">
              {e1}
            </span>
            {[25, 50, 75].map((m) => (
              <span key={m} className={'fb-ms' + (pct >= m ? ' on' : '')} style={{ '--x': m + '%' }} aria-hidden="true">
                {m === 25 ? '⭐' : m === 50 ? '🔥' : '💎'}
              </span>
            ))}
            <span className="fb-end" aria-hidden="true">
              🏁
            </span>
          </div>
        </div>
        <div className="fb-r">
          <span className="fb-step">{wasDone ? t('v6_editing') : t('q_of', { n: nf(Math.max(1, pos)), total: nf(all.length || 1) })}</span>
          {kind === 'profile' && !wasDone && (
            <span className="fb-rw" title={t('v6_earn')}>
              <i className="mini-coin" />+{nf(POINTS_PER_ITEM)}
              <i className="mini-gem" />+{nf(QUALITY_PER_ITEM)}
            </span>
          )}
        </div>
      </div>
      {card}
    </div>
  );
}

/* ------------------------------------------------------------------ one field */
function Field({ q, list, value, disabled, invalid, lockedPhone, onChange, onPick, onEnter }) {
  if (q.type === 'select' || q.type === 'radio') return <Single q={q} list={list} value={value} disabled={disabled} onChange={onChange} onPick={onPick} onEnter={onEnter} />;
  if (multi(q)) return <Multi q={q} list={list} value={value} disabled={disabled} onChange={onChange} />;
  if (q.type === 'phone') return <Phone value={value} locked={lockedPhone} invalid={invalid} onChange={onChange} onEnter={onEnter} />;
  const enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };
  if (q.type === 'date') {
    return (
      <div className="fld">
        <span className="fi">
          <Icon n="calendar" />
        </span>
        <input id="qi" className="in" type="date" value={value ? String(value).slice(0, 10) : ''} disabled={disabled} aria-labelledby="qh" aria-describedby="er" aria-invalid={invalid || undefined} onChange={(e) => onChange(e.target.value || null)} onKeyDown={enter} />
      </div>
    );
  }
  const numeric = q.name === 'age';
  return (
    <div className="fld">
      <span className="fi">
        <Icon n={/mail/.test(q.name) ? 'mail' : /zip|city|address/.test(q.name) ? 'pin' : numeric ? 'hash' : 'text'} />
      </span>
      <input
        id="qi"
        className="in"
        type="text"
        inputMode={numeric ? 'numeric' : undefined}
        autoComplete="off"
        spellCheck="false"
        placeholder={t('type_here')}
        value={value ?? ''}
        disabled={disabled}
        aria-labelledby="qh"
        aria-describedby="er"
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={enter}
      />
      <span className="vk">
        <Icon n="check" />
      </span>
    </div>
  );
}

function Single({ q, list, value, disabled, onChange, onPick, onEnter }) {
  const [filter, setFilter] = useState('');
  const labels = list.map((o) => String(o.label));
  const pics = optEmojiSet(q.name, labels);
  const pick = (o, e) => {
    if (disabled) return;
    onChange(o.value);
    const el = e.target.closest('label');
    burst(el, document.getElementById('cd'));
    onPick(o.value, el);
  };
  const common = (o) => ({
    type: 'radio',
    name: 'q',
    value: o.value,
    checked: value === o.value,
    disabled,
    onChange: (e) => pick(o, e),
    onClick: (e) => value === o.value && onPick(o.value, e.target.closest('label')),
    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter();
      }
    }
  });
  if (list.length > 8) {
    const f = norm(filter).trim();
    return (
      <>
        {list.length > 12 && (
          <div className="mbar">
            <label className="fsr">
              <span className="sr">{t('filter_label')}</span>
              <Icon n="search" />
              <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={t('filter_ph', { n: list.length })} autoComplete="off" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()} />
            </label>
          </div>
        )}
        <div className="rows" role="radiogroup" aria-labelledby="qh" aria-describedby="er">
          {list.map((o, k) => (
            <label key={o.value} className={'row' + (value === o.value ? ' on' : '')} hidden={!!f && !norm(o.label).includes(f)}>
              <input {...common(o)} />
              <span className="dot" />
              {pics[k] ? <Pic e={pics[k]} cls="ri" /> : null}
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </>
    );
  }
  const yesNo = list.length <= 3 && list.every((o) => /^(yes|no|not sure|maybe)\b/i.test(o.label));
  return (
    <div className={'tiles' + (yesNo ? ' bin' : '')} role="radiogroup" aria-labelledby="qh" aria-describedby="er">
      {list.map((o, k) => (
        <label key={o.value} className={'tile' + (value === o.value ? ' on' : '') + (yesNo ? (/^yes/i.test(o.label) ? ' yes' : /^no\b/i.test(o.label) ? ' no' : '') : '')} style={{ '--k': k }}>
          <input {...common(o)} />
          {yesNo ? (
            <span className="ic emo" aria-hidden="true">
              {/^yes/i.test(o.label) ? '👍' : /^no\b/i.test(o.label) ? '👎' : '🤔'}
            </span>
          ) : (
            <Pic e={pics[k]} />
          )}
          <span className="tl">{o.label}</span>
          <span className="tk">
            <Icon n="check" />
          </span>
        </label>
      ))}
    </div>
  );
}

function Multi({ q, list, value, disabled, onChange }) {
  const [f0, setF] = useState('');
  const sel = Array.isArray(value) ? value : filled(value) ? [value] : [];
  const full = q.max > 0 && sel.length >= q.max;
  const chips = list.length > 12;
  const f = norm(f0).trim();
  const pics = optEmojiSet(q.name, list.map((o) => String(o.label)));
  const toggle = (o, e) => {
    let next;
    if (sel.includes(o.value)) next = sel.filter((v) => v !== o.value);
    else if (o.exclusive) next = [o.value];
    else {
      const ex = list.filter((x) => x.exclusive).map((x) => x.value);
      next = [...sel.filter((v) => !ex.includes(v)), o.value];
      burst(e.target.closest('label'), document.getElementById('cd'));
    }
    onChange(next);
  };
  return (
    <>
      <div className="mbar">
        {chips && (
          <label className="fsr">
            <span className="sr">{t('filter_label')}</span>
            <Icon n="search" />
            <input type="search" value={f0} onChange={(e) => setF(e.target.value)} placeholder={t('filter_ph', { n: list.length })} autoComplete="off" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()} />
          </label>
        )}
        <span className="cnt" aria-live="polite">
          {t('n_selected', { n: sel.length })}
        </span>
        <button type="button" className="lnk" hidden={!sel.length || disabled} onClick={() => onChange([])}>
          {t('clear_all')}
        </button>
      </div>
      <div className={chips ? 'chips' : 'tiles multi'} role="group" aria-labelledby="qh" aria-describedby="er">
        {list.map((o, k) => {
          const on = sel.includes(o.value);
          const input = <input type="checkbox" value={o.value} checked={on} disabled={disabled || (!on && full && !o.exclusive)} onChange={(e) => toggle(o, e)} />;
          const hide = !!f && !norm(o.label).includes(f);
          return chips ? (
            <label key={o.value} className={'chip' + (on ? ' on' : '')} hidden={hide}>
              {input}
              <Icon n="check" />
              <Pic e={pics[k]} cls="ce" />
              <span>{o.label}</span>
            </label>
          ) : (
            <label key={o.value} className={'tile' + (on ? ' on' : '')} style={{ '--k': k }} hidden={hide}>
              {input}
              <Pic e={pics[k]} />
              <span className="tl">{o.label}</span>
              <span className="tk">
                <Icon n="check" />
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}

// Phone: digits with the country code (stored the same way as the existing app); a saved phone stays locked.
function Phone({ value, locked, invalid, onChange, onEnter }) {
  const [cc, setCc] = useState('');
  useEffect(() => {
    if (filled(value)) return undefined;
    let live = true;
    actions.country().then((c) => live && DIAL[c] && setCc(DIAL[c]));
    return () => {
      live = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const digits = String(value || '');
  return (
    <>
      <div className={'fld' + (locked ? ' dis' : '')}>
        <span className="fi">
          <Icon n={locked ? 'lock' : 'call'} />
        </span>
        <input
          id="qi"
          className="in"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder={cc ? `+${cc} …` : t('v6_phone_ph')}
          value={digits ? `+${digits}` : ''}
          disabled={locked}
          aria-labelledby="qh"
          aria-describedby="er"
          aria-invalid={invalid || undefined}
          onFocus={() => !digits && cc && onChange(cc)}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 15))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter();
            }
          }}
        />
        <span className="vk">
          <Icon n="check" />
        </span>
      </div>
      <p className="hint6">{locked ? mt('qz.phone.locked') : mt('qz.phone.hint')}</p>
    </>
  );
}
