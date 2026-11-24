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
import { Counter, useToast } from '../../components/ui.jsx';
import { t as mt } from '../../i18n/t.js';
import { Icon } from './Icon.jsx';
import { profileEmoji, qEmoji } from '../lib/emoji.js';
import { finePointer, reducedMotion } from '../lib/fx.js';
import { POINTS_PER_ITEM } from '../lib/rewards.js';
import { sound } from '../lib/uisound.js';
import { themeId, themeOf, kind as fieldKind, EXCL } from '../lib/present.js';
import { Tiles, Binary, Rows, Scale, Levels } from './fields/Choice.jsx';
import { Multi } from './fields/Multi.jsx';
import ComboBox from './fields/ComboBox.jsx';
import MultiCombo from './fields/MultiCombo.jsx';
import TextField from './fields/TextField.jsx';
import { t, nf } from '../i18n/index.js';
import { CHOICE, filled, loadQuestion, maxHint, moneyLabel, normalise6, safeHtml, specFor, specifyLabel, validate6, withExtras } from '../questions.js';

// Question types the admin can create (old member app, admin > questions) that this flow asks as text.
const ASK_AS_TEXT = ['text', 'textarea', 'editor', 'address'];
const NEVER_BLANK = ['document'];

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
  // profile credits the server returned during this visit (each profile is credited once, server side)
  const credit = useRef([]);
  const [done, setDone] = useState(false);
  const [defs, setDefs] = useState({});
  const [opts, setOpts] = useState({});
  const [notice, setNotice] = useState(null); // v6 "please check this answer" (soft) notice
  const ack = useRef({}); // soft notices the member confirmed: { question: code }
  const raw = useRef({}); // text typed in a dropdown without picking an option
  const lastV = useRef(undefined); // the answer just picked (state updates after the pick handler)
  const [guess, setGuess] = useState('');
  useEffect(() => {
    let live = true;
    actions
      .country()
      .then((c) => live && c && setGuess(String(c).toUpperCase()))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  const alive = useRef(true);
  const timer = useRef(0);
  const shownAt = useRef(0);
  // v6 sounds: every answer is voiced in the item's own world (sound.click), sections end with a tick
  const world = themeId({ s: source.slug || '' });
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

  // a question listed twice on a page (it happens in the question bank) is asked once
  const names = useMemo(() => (page != null ? [...new Set(pages[page]?.slice(1) || [])] : []), [page, pages]);

  // every question's definition (cached), so "Question n of N" counts only questions that apply
  useEffect(() => {
    if (!loaded) return;
    all.forEach((n) => {
      if (defs[n] !== undefined) return;
      loadQuestion(n).then((q) => alive.current && setDefs((d) => (d[n] !== undefined ? d : { ...d, [n]: q })));
    });
  }, [loaded, all]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    names.forEach((n) => {
      if (defs[n] !== undefined) return;
      loadQuestion(n).then((q) => alive.current && setDefs((d) => ({ ...d, [n]: q })));
    });
  }, [names.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  // A question whose parent is answered in ANOTHER profile (e.g. children ← havechild): read that answer once,
  // so the follow-up shows instead of being skipped. Only read here, never saved from this page.
  const askedParents = useRef(new Set());
  useEffect(() => {
    const need = names
      .map((n) => defs[n]?.parent)
      .filter((pn) => pn && !all.includes(pn) && !(pn in values) && !askedParents.current.has(pn));
    if (!need.length) return;
    need.forEach((pn) => askedParents.current.add(pn));
    actions
      .answers(need)
      .then((d) => {
        if (!alive.current || !d) return;
        const v = {};
        need.forEach((pn) => filled(d[pn]) && (v[pn] = d[pn]));
        if (Object.keys(v).length) setValues((prev) => ({ ...v, ...prev }));
      })
      .catch(() => {});
  }, [defs, names.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  // what the v6 validators read: every answer plus the member's country, age group and the saved value
  const ctxFor = (qq) => {
    const A = { ...values };
    const c = A.country || me?.address?.country || '';
    A.country = c ? String(c).toUpperCase() : '';
    if (!filled(A.dob) && me?.dob) A.dob = String(me.dob).slice(0, 10);
    // phones are kept as digits; the validators compare E.164 ("+<code><number>")
    Object.values(defs).forEach((d) => d && d.type === 'phone' && filled(A[d.name]) && (A[d.name] = '+' + String(A[d.name]).replace(/\D/g, '')));
    return { A, country: A.country, state: A.state, category: me?.type === 'teen' ? 'minor' : 'b2c', prev: qq ? saved[qq.name] : undefined, guess };
  };
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
      // every open-ended question is asked as text (a validation rule, when the API has one, only checks the
      // answer). The admin also creates textarea, editor and address questions: before, those were treated as
      // hidden, saved empty, and the profile counted as complete without the member seeing them.
      if (ASK_AS_TEXT.includes(q.type)) return o !== undefined && o !== 'loading';
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
      // nothing to ask on this page (all hidden): record it as answered (so the profile can reach 100%), then
      // move on in the same direction
      if (kind === 'profile' && dir >= 0) {
        const hv = hiddenValues();
        if (Object.keys(hv).length) actions.saveProfile(hv).then(() => alive.current && setSaved((sv) => ({ ...sv, ...hv }))).catch(() => {});
      }
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
  // "Question n of N": only questions that apply (a follow-up counts once its parent is answered)
  const applies = (n) => {
    const d = defs[n];
    if (d === undefined) return true;
    if (!d || d.name === 'alternate-phone-whatsapp') return false;
    return !(d.parent && !filled(values[d.parent]));
  };
  const beforeNames = [...new Set(pages.slice(0, page || 0).flatMap((p) => p.slice(1)))].filter((n) => !names.includes(n));
  const total = Math.max(1, all.filter(applies).length);
  const pos = Math.min(total, beforeNames.filter(applies).length + Math.max(0, idx) + 1);
  const pct = done ? 100 : Math.round(((pos - 1) / total) * 100);
  const lastPage = page === pages.length - 1;
  const lastQ = lastPage && idx === visible.length - 1;

  const show = (name, d) => {
    clearTimeout(timer.current);
    setErr(null);
    setNotice(null);
    lastV.current = undefined;
    setShake(false);
    setDir(d);
    setCur(name);
    setQKey((k) => k + 1);
    shownAt.current = Date.now();
  };

  const setValue = useCallback(
    (qq, v) => {
      if (CHOICE.includes(qq.type)) sound.click(world, Array.isArray(v) ? 'toggle' : 'pick');
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
      setNotice(null);
    },
    [defs, world]
  );

  /** Questions on this page that are not shown (their parent's answer hides them): saved empty, so the
   *  backend's completion count (answer saved for every applicable question) can reach 100%. */
  function hiddenValues() {
    const out = {};
    names.forEach((n) => {
      if (visible.some((x) => x.name === n)) return;
      // a file upload can't be answered here: never record it as answered-empty (that would complete the profile)
      if (defs[n] && NEVER_BLANK.includes(defs[n].type)) return;
      if (n in values) out[n] = values[n];
      else if (filled(saved[n])) return;
      else out[n] = defs[n] && multi(defs[n]) ? [] : null;
    });
    return out;
  }

  function pageValues() {
    const out = {};
    visible.forEach((x) => {
      out[x.name] = x.name === q?.name ? normalise6(x, values, ctxFor(x)) ?? null : values[x.name] ?? (multi(x) ? [] : null);
      if (filled(values[`${x.name}_specify`])) out[`${x.name}_specify`] = values[`${x.name}_specify`];
    });
    return { ...hiddenValues(), ...out };
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
        await actions.saveSurvey(allVals, source.respID, { slug: source.slug, title: source.name, points: source.points });
        if (!alive.current) return;
        setDone(true);
        onDone?.({ first: true, credited: credit.current });
      } catch (e) {
        toast(e?.message && e.message !== 'error' ? e.message : mt('qz.saveErr'), 'error');
      } finally {
        if (alive.current) setBusy(false);
      }
      return;
    }
    onDone?.({ first: !wasDone, credited: credit.current });
  }

  function fail(text) {
    sound.click(world, 'warn');
    setErr(text);
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    document.getElementById('qi')?.focus();
  }

  async function next() {
    if (busy || !q) return;
    clearTimeout(timer.current);
    const o = opts[optKey(q)];
    const ctx = ctxFor(q);
    const r = validate6(q, values, CHOICE.includes(q.type) ? withExtras(q, o) : o, ctx, raw.current[q.name]);
    if (r && r.level === 'block') return fail(r.text);
    if (r && r.level === 'soft' && ack.current[q.name] !== r.code) {
      // unusual but possible: shown once, Continue again (or "Yes, it's correct") accepts it
      sound.click(world, 'warn');
      ack.current[q.name] = r.code;
      return setNotice(r);
    }
    const nv = normalise6(q, values, ctx);
    if (nv !== values[q.name]) setValues((p) => ({ ...p, [q.name]: nv }));
    if (specifyLabel(q, values[q.name], withExtras(q, o)) && !filled(values[`${q.name}_specify`])) return fail(mt('qz.specify.req'));
    // wait for questions that depend on this answer before deciding what comes next
    if (!pageReady) return setPending(true);
    if (idx < visible.length - 1) {
      sound.click(world, 'next');
      return show(visible[idx + 1].name, 1);
    }
    sound.prime();
    // end of the page: a profile saves this page now
    setBusy(true);
    try {
      if (kind === 'profile') {
        const pv = pageValues();
        const got = await actions.saveProfile(pv);
        if (Array.isArray(got)) credit.current.push(...got);
        if (!alive.current) return;
        setSaved((s) => ({ ...s, ...pv }));
      }
      if (lastPage) {
        await finish();
      } else {
        sound.tick();
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
    sound.click(world, 'back');
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
        {source.points > 0 && (
          <div className="dc-reward" role="status">
            <span className="dc-coin" aria-hidden="true"><i /></span>
            <span className="dc-reward__v">+<Counter value={source.points} duration={1400} /></span>
            <span className="dc-reward__l">{mt('pts.balance')}</span>
            <span className="dc-burst" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--a': `${i * 36}deg` }} />)}</span>
          </div>
        )}
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
    const list = CHOICE.includes(q.type) ? withExtras(q, o).map((x) => (q.isMoney ? { ...x, base: x.label, label: moneyLabel(x.label, values.country || me.address?.country) } : x)) : [];
    const spec = specifyLabel(q, values[q.name], list);
    const ok = !err && !notice && filled(values[q.name]) && !validate6(q, values, CHOICE.includes(q.type) ? list : o, ctxFor(q), raw.current[q.name]);
    const lockedPhone = q.name === 'phone' && filled(saved.phone);
    const disabled = (!q.editable && filled(saved[q.name])) || lockedPhone;
    card = (
      <div className={'qcard' + (err ? ' bad' : notice ? ' warn' : ok ? ' ok' : '') + (shake ? ' shake' : '')} id="cd">
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
            <fieldset className="fs6" disabled={disabled}>
              <Field6
                q={q}
                list={list}
                value={values[q.name]}
                invalid={!!err}
                slug={source.slug}
                teen={me?.type === 'teen'}
                ctx={ctxFor(q)}
                raw={raw.current}
                onChange={(v, o2) => {
                  lastV.current = v;
                  if (o2 && o2.raw !== undefined) raw.current[q.name] = o2.raw;
                  setValue(q, v);
                }}
                onPick={(el) => auto(q, lastV.current !== undefined ? lastV.current : values[q.name], el)}
                onEnter={next}
              />
            </fieldset>
            {lockedPhone && <p className="hint6">{mt('qz.phone.locked')}</p>}
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
          {notice && (
            <div className="soft6" role="alert">
              <p>
                <span aria-hidden="true">🧐</span>
                <span>
                  <b>{t('check_title')}</b> {notice.text}
                </span>
              </p>
              <div className="soft6-acts">
                {notice.suggestion && (
                  <button type="button" className="btn6 ghost sm" onClick={() => setValue(q, notice.suggestion)}>
                    {t('use_suggestion', { s: notice.suggestion })}
                  </button>
                )}
                <button type="button" className="btn6 primary sm" onClick={next}>
                  <Icon n="check" />
                  {t('confirm_continue')}
                </button>
              </div>
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
          <span className="fb-step">{wasDone ? t('v6_editing') : t('q_of', { n: nf(Math.max(1, pos)), total: nf(total) })}</span>
          {kind === 'profile' && !wasDone && (
            <span className="fb-rw" title={t('v6_earn')}>
              <i className="mini-coin" />+{nf(source.points || POINTS_PER_ITEM)}
            </span>
          )}
        </div>
      </div>
      {card}
    </div>
  );
}

/* ------------------------------------------------------------------ one field (v6 controls) */
// The v6 field components work on [label, value] option pairs and a small engine object (s) with actions
// (act). This adapter gives them the member area's question, options and answers, so the controls, their
// layout rules (lib/present.js kind) and their keyboard behaviour are exactly the v6 ones.
function Field6({ q, list, value, invalid, slug, teen, ctx, raw, onChange, onPick, onEnter }) {
  // v6 picks the control from the English option text (ranges, scales); money labels are shown in the member's currency
  const o = useMemo(() => list.map((x) => [String(x.base ?? x.label), x.value]), [list]);
  const shown = useMemo(() => new Map(list.map((x) => [x.value, String(x.label)])), [list]);
  const ex = useMemo(() => new Set(list.filter((x) => x.exclusive).map((x) => x.value)), [list]);
  const tw = themeOf({ s: slug || '' });
  const s = {
    prof: { s: slug || '', c: teen ? 'minor' : 'b2c' },
    ans: ctx.A,
    raw,
    guess: ctx.guess,
    D: { Q: {}, O: {} },
    opts: (n) => (n === q.name && CHOICE.includes(q.type) ? o : null),
    multi: () => multi(q),
    q: () => q.label,
    ctx: () => ctx,
    spec: () => specFor(q),
    max: () => Number(q.max) || 0,
    isEx: (v, l) => ex.has(v) || EXCL.test(String(l || '')),
    show: (v, l) => shown.get(v) ?? l
  };
  const act = {
    answer: (n, v, opt) => {
      if (q.type === 'phone') return onChange(String(v || '').replace(/\D/g, ''), opt);
      // radio inputs hand back a string: keep the option's own value (numbers stay numbers)
      if (CHOICE.includes(q.type) && !Array.isArray(v) && v !== '') {
        const h = list.find((x) => String(x.value) === String(v));
        if (h) return onChange(h.value, opt);
      }
      return onChange(v === '' ? null : v, opt);
    },
    auto: (n, el) => onPick(el),
    next: onEnter,
    setLive: () => {},
    other: () => {}
  };
  if (!CHOICE.includes(q.type)) {
    const v = q.type === 'phone' ? (filled(value) ? '+' + String(value) : '') : q.type === 'date' && value ? String(value).slice(0, 10) : value;
    return <TextField s={s} n={q.name} value={v} act={act} invalid={invalid} />;
  }
  const p = { s, n: q.name, o, value, act, t: tw };
  switch (fieldKind(q.name, o, multi(q))) {
    case 'bin':
      return <Binary {...p} />;
    case 'levels':
      return <Levels {...p} />;
    case 'scale':
      return <Scale {...p} />;
    case 'tiles':
      return <Tiles {...p} />;
    case 'rows':
      return <Rows {...p} />;
    case 'combo':
      return <ComboBox key={q.name + '|' + JSON.stringify(q.parent ? ctx.A[q.parent] ?? '' : '')} {...p} />;
    case 'mcombo':
      return <MultiCombo key={q.name + '|' + JSON.stringify(q.parent ? ctx.A[q.parent] ?? '' : '')} {...p} />;
    case 'mtiles':
      return <Multi {...p} />;
    default:
      return <Multi {...p} chips />;
  }
}
