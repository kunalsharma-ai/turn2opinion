// The question-and-answer flow for profiles and for surveys that run on Turn2Opinion.
// Same data and rules as the existing member app (Project/frontend survey/components):
//   - a profile or survey has pages: [[pageTitle, questionName, ...], ...]
//   - each question comes from POST /api/v1/question, its options from /api/v1/option/:name
//     (dependent questions send the parent's answer), text checks from /api/v1/validation/:name
//   - saved answers load with POST /api/v1/me; a profile saves with PATCH /api/v1/me/profile,
//     a survey with PATCH /api/v1/me/survey { ...answers, respID }
//   - "Others" asks to specify (<name>_specify), "None of the above" and exclusive options clear the rest,
//     maxSelections caps a multi-select, age must match the date of birth, a saved phone stays locked
// Differences, on purpose: a profile saves page by page (so "pick up where you left off" works) and
// changing an answer clears only the questions that depend on it, not every later question.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { actions, CHOICE } from '../data/source.js';
import { useMe } from '../data/MemberData.jsx';
import { t, tn, fmt } from '../i18n/t.js';
import { feedback, tap } from '../theme/feedback.js';
import { Button, Icon, cx, useToast } from './ui.jsx';

const filled = (v) => !(v == null || v === '' || (Array.isArray(v) && !v.length));
const OTHERS = 'others';
const NONE = 'none_of_the_above';
const SKIP = 'prefer_not_to_say';
const isOthers = (o) => String(o.value).toLowerCase() === OTHERS || String(o.label).toLowerCase() === 'others';
const isNone = (o) => String(o.value).toLowerCase() === NONE || String(o.label).toLowerCase() === 'none of the above';
const isSkip = (o) => String(o.value).toLowerCase() === SKIP || String(o.label).toLowerCase() === 'prefer not to say';

// question definitions never change during a visit: fetch each once
const QCACHE = new Map();
function loadQuestion(name) {
  if (!QCACHE.has(name)) QCACHE.set(name, actions.question(name).catch(() => null));
  return QCACHE.get(name);
}

/** Admin-written HTML (survey intro / thank-you): keep the formatting, drop anything active. */
function safeHtml(html) {
  if (!html || typeof DOMParser === 'undefined') return '';
  const doc = new DOMParser().parseFromString(String(html), 'text/html');
  doc.querySelectorAll('script,iframe,object,embed,style,link,meta,form').forEach((n) => n.remove());
  doc.querySelectorAll('*').forEach((el) =>
    [...el.attributes].forEach((a) => {
      if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) el.removeAttribute(a.name);
    })
  );
  return doc.body.innerHTML;
}

const CURRENCY = { IN: 'INR', US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', SG: 'SGD', AE: 'AED', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', IE: 'EUR' };
function moneyLabel(label, country) {
  const cur = CURRENCY[String(country || '').toUpperCase()];
  const m = String(label).match(/^\s*(\d+)\s*(?:-\s*(\d+)|\+)\s*$/);
  if (!cur || !m) return label;
  const f = (n) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(Number(n));
    } catch {
      return n;
    }
  };
  return m[2] ? `${f(m[1])} – ${f(m[2])}` : `${f(m[1])}+`;
}

/* =================================================================== the flow */
/**
 * kind: 'profile' | 'survey'
 * source: profile { slug, name, pages, points } or opened survey { name, slug, pages, description, thankyou, link, respID }
 */
export default function Questionnaire({ kind, source, onClose, onDone, nextLabel, onNext }) {
  const me = useMe();
  const toast = useToast();
  const pages = useMemo(() => (source.pages || []).filter((p) => Array.isArray(p) && p.length > 1), [source.pages]);
  const all = useMemo(() => [...new Set(pages.flatMap((p) => p.slice(1)))], [pages]);
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(kind === 'survey' ? -1 : null); // -1 intro, null = deciding
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [defs, setDefs] = useState({});
  const [opts, setOpts] = useState({});
  const panel = useRef(null);
  const titleRef = useRef(null);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // saved answers for every question in this profile/survey (one call)
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

  // a profile opens on its first page with an unanswered question
  useEffect(() => {
    if (!loaded || page !== null) return;
    const i = pages.findIndex((pg) => pg.slice(1).some((n) => !filled(saved[n])));
    setPage(i < 0 ? 0 : i);
  }, [loaded, page, pages, saved]);

  const names = page != null && page >= 0 ? pages[page]?.slice(1) || [] : [];

  // question definitions for the current page
  useEffect(() => {
    names.forEach((n) => {
      if (defs[n] !== undefined) return;
      loadQuestion(n).then((q) => alive.current && setDefs((d) => ({ ...d, [n]: q })));
    });
  }, [names.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  // options / validation per question, keyed by the parent's current answer
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
  }); // runs after each render; the opts cache keeps it to one request per question and parent answer

  // which questions show on this page
  const visible = names
    .map((n) => defs[n])
    .filter(Boolean)
    .filter((q) => {
      if (q.name === 'alternate-phone-whatsapp') return false;
      if (q.name === 'alternate-phone' && !filled(values.phone)) return false;
      if (q.parent && !filled(values[q.parent])) return false;
      const o = opts[optKey(q)];
      if (CHOICE.includes(q.type)) return Array.isArray(o) && o.length > 0;
      // the existing app draws a text question only when it has a validation pattern
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

  // move focus to the page title on each step, for keyboard and screen-reader users
  useEffect(() => {
    if (page != null) titleRef.current?.focus({ preventScroll: true });
    panel.current?.scrollTo?.({ top: 0 });
  }, [page, done]);

  const setValue = useCallback(
    (q, v) => {
      setValues((prev) => {
        const next = { ...prev, [q.name]: v };
        // clear answers that depend on this one (children and questions whose parent it is)
        const deps = new Set(q.children || []);
        Object.values(defs).forEach((d) => d && d.parent === q.name && deps.add(d.name));
        deps.forEach((n) => {
          if (n in next) next[n] = Array.isArray(next[n]) ? [] : null;
        });
        return next;
      });
      setErrors((e) => (e[q.name] ? { ...e, [q.name]: null } : e));
    },
    [defs]
  );

  function validate() {
    const err = {};
    visible.forEach((q) => {
      const v = values[q.name];
      const o = opts[optKey(q)];
      if (q.required && !filled(v)) err[q.name] = t('qz.required');
      else if (q.type === 'text' && filled(v) && o && o.pattern) {
        try {
          if (!new RegExp(o.pattern).test(String(v))) err[q.name] = t('qz.format');
        } catch {
          /* bad pattern from the server: skip the check, as the existing app does */
        }
      } else if (q.type === 'phone' && filled(v) && !/^\d{8,15}$/.test(String(v))) err[q.name] = t('qz.phone');
      if (!err[q.name] && specifyLabel(q, v, o) && !filled(values[`${q.name}_specify`])) err[`${q.name}_specify`] = t('qz.specify.req');
      if (!err[q.name] && q.name === 'age' && filled(v) && me.dob) {
        const dob = new Date(me.dob);
        const now = new Date();
        let age = now.getFullYear() - dob.getFullYear();
        if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) age -= 1;
        if (Number(v) !== age && Number(v) !== now.getFullYear() - dob.getFullYear()) err.age = t('qz.age');
      }
    });
    setErrors(err);
    const first = Object.keys(err).find((k) => err[k]);
    if (first) {
      document.getElementById(`qz-${first}`)?.focus();
    }
    return !first;
  }

  // answers to send for the current page: visible questions plus their "specify" text
  function pageValues() {
    const out = {};
    visible.forEach((q) => {
      out[q.name] = values[q.name] ?? (q.type === 'multiselect' || q.type === 'checkbox' ? [] : null);
      if (filled(values[`${q.name}_specify`])) out[`${q.name}_specify`] = values[`${q.name}_specify`];
    });
    names.forEach((n) => {
      if (!(n in out) && n in values) out[n] = values[n];
    });
    return out;
  }

  async function next() {
    if (page === -1) {
      if (source.link) {
        const url = String(source.link).replace(/\$uid/g, source.respID || '');
        tap();
        if (/example\.com/.test(url)) {
          toast(t('qz.partner.preview'), 'info');
          return;
        }
        window.location.assign(url);
        return;
      }
      setPage(0);
      return;
    }
    if (!validate()) return;
    const last = page === pages.length - 1;
    setBusy(true);
    try {
      if (kind === 'profile') {
        await actions.saveProfile(pageValues());
        setSaved((s) => ({ ...s, ...pageValues() }));
      } else if (last) {
        const allVals = {};
        all.forEach((n) => {
          if (n in values) allVals[n] = values[n];
          if (filled(values[`${n}_specify`])) allVals[`${n}_specify`] = values[`${n}_specify`];
        });
        await actions.saveSurvey(allVals, source.respID);
      }
      if (last) {
        setDone(true);
        feedback(kind === 'profile' ? 'points' : 'success');
        onDone?.();
      } else {
        setPage(page + 1);
        tap();
      }
    } catch (e) {
      toast(e?.message && e.message !== 'error' ? e.message : t('qz.saveErr'), 'error');
    } finally {
      setBusy(false);
    }
  }

  // Escape closes (answers already saved page by page); focus stays inside the panel
  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const f = [...panel.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex="0"]')];
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('qz-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('qz-open');
      prev?.focus?.();
    };
  }, [onClose]);

  const titles = pages.map((p) => p[0]);
  const pct = done ? 100 : page == null || page < 0 ? 0 : Math.round((page / Math.max(1, pages.length)) * 100);
  const icon = kind === 'profile' ? 'id' : 'clipboard';

  const host = typeof document !== 'undefined' ? document.querySelector('.mb-root') || document.body : null;
  const layer = (
    <div className="qz" role="presentation">
      <div className="qz__scrim" onClick={onClose} aria-hidden="true" />
      <div className={cx('qz__panel', `qz--${kind}`)} role="dialog" aria-modal="true" aria-labelledby="qz-title" ref={panel}>
        <header className="qz__head">
          <span className="qz__icon" aria-hidden="true">
            <Icon name={icon} size={22} />
          </span>
          <div className="qz__heading">
            <p className="qz__eyebrow">{kind === 'profile' ? t('qz.eyebrow.profile') : t('qz.eyebrow.survey')}</p>
            <h2 id="qz-title">{source.name}</h2>
          </div>
          <button type="button" className="qz__close" onClick={onClose} aria-label={t('qz.close')}>
            <Icon name="close" size={20} />
          </button>
          <div className="qz__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={t('qz.progress')}>
            <i style={{ width: `${pct}%` }} />
          </div>
        </header>

        {!done && page != null && page >= 0 && pages.length > 1 && (
          <ol className="qz__steps" aria-label={t('qz.steps')}>
            {titles.map((s, i) => (
              <li key={i} className={cx(i < page && 'is-done', i === page && 'is-on')} aria-current={i === page ? 'step' : undefined}>
                <span className="qz__dot">{i < page ? <Icon name="check" size={13} strokeWidth={3} /> : i + 1}</span>
                <span className="qz__steplabel">{s}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="qz__body">
          {done ? (
            <Finished kind={kind} source={source} onClose={onClose} nextLabel={nextLabel} onNext={onNext} />
          ) : !loaded || page == null ? (
            <QzSkeleton />
          ) : page === -1 ? (
            <div className="qz__intro">
              <h3 tabIndex={-1} ref={titleRef}>
                {t('qz.intro')}
              </h3>
              {source.description ? <div className="qz__html" dangerouslySetInnerHTML={{ __html: safeHtml(source.description) }} /> : <p>{t('qz.intro.none')}</p>}
              {source.link && (
                <p className="qz__note">
                  <Icon name="external" size={16} /> {t('qz.partner')}
                </p>
              )}
            </div>
          ) : (
            <form
              className="qz__form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
            >
              <h3 tabIndex={-1} ref={titleRef} className="qz__pagetitle">
                <span>{t('qz.stepOf', { n: page + 1, of: pages.length })}</span>
                {titles[page]}
              </h3>
              {!pageReady && !visible.length ? (
                <QzSkeleton />
              ) : !visible.length ? (
                <p className="qz__empty">{t('qz.nothing')}</p>
              ) : (
                <div className="qz__grid">
                  {visible.map((q) => (
                    <QuestionField
                      key={q.name}
                      q={q}
                      value={values[q.name]}
                      options={opts[optKey(q)]}
                      error={errors[q.name]}
                      specify={values[`${q.name}_specify`]}
                      specifyError={errors[`${q.name}_specify`]}
                      locked={q.name === 'phone' && filled(saved.phone)}
                      country={values.country || me.address?.country}
                      onChange={(v) => setValue(q, v)}
                      onSpecify={(v) => {
                        setValues((p) => ({ ...p, [`${q.name}_specify`]: v }));
                        setErrors((e) => ({ ...e, [`${q.name}_specify`]: null }));
                      }}
                    />
                  ))}
                </div>
              )}
              <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
            </form>
          )}
        </div>

        {!done && loaded && page != null && (
          <footer className="qz__foot">
            {kind === 'profile' && <p className="qz__saved">{t('qz.autosave')}</p>}
            <div className="qz__actions">
              {page > 0 ? (
                <Button variant="ghost" icon="arrowLeft" onClick={() => setPage(page - 1)} disabled={busy}>
                  {t('qz.back')}
                </Button>
              ) : (
                <Button variant="ghost" onClick={onClose}>
                  {t('qz.later')}
                </Button>
              )}
              <Button iconEnd={page === pages.length - 1 ? 'check' : 'arrow'} busy={busy} onClick={next} disabled={page >= 0 && !pageReady}>
                {page === -1 ? (source.link ? t('qz.go') : t('qz.start')) : page === pages.length - 1 ? (kind === 'profile' ? t('qz.finish') : t('qz.submit')) : t('qz.next')}
              </Button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
  return host ? createPortal(layer, host) : layer;
}

function QzSkeleton() {
  return (
    <div className="qz__skel" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ '--i': i }} />
      ))}
    </div>
  );
}

function Finished({ kind, source, onClose, nextLabel, onNext }) {
  return (
    <div className="qz__done" role="status">
      <span className="qz__trophy" aria-hidden="true">
        <Icon name={kind === 'profile' ? 'flag' : 'trophy'} size={40} />
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <h3>{kind === 'profile' ? t('qz.done.profile', { name: source.name }) : t('qz.done.survey')}</h3>
      {kind === 'profile' ? (
        <>
          <p>{t('qz.done.p')}</p>
          <p className="qz__chips">
            <span className="pf-chip pf-chip--coin">+{fmt(source.points || 50)}</span>
            <span className="pf-chip pf-chip--gem">+1</span>
            <span className="pf-chip">
              <Icon name="home" size={14} /> {t('qz.done.building')}
            </span>
          </p>
        </>
      ) : source.thankyou ? (
        <div className="qz__html" dangerouslySetInnerHTML={{ __html: safeHtml(source.thankyou) }} />
      ) : (
        <p>{t('qz.done.surveyP')}</p>
      )}
      <div className="qz__actions">
        <Button variant={onNext ? 'ghost' : 'primary'} onClick={onClose}>
          {t('qz.backTo', { place: kind === 'profile' ? t('nav.profiles') : t('nav.surveys') })}
        </Button>
        {onNext && (
          <Button iconEnd="arrow" onClick={onNext}>
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

/* =================================================================== one question */
function specifyLabel(q, v, o) {
  if (!Array.isArray(o)) return '';
  const vals = Array.isArray(v) ? v : filled(v) ? [v] : [];
  const sel = o.filter((x) => vals.includes(x.value));
  const d = sel.find((x) => x.describe);
  if (d) return d.describe;
  if (q.hasOthers && vals.includes(OTHERS)) return t('qz.specify');
  return '';
}

function withExtras(q, list) {
  const l = [...(Array.isArray(list) ? list : [])];
  if (q.hasOthers && !l.some(isOthers)) l.push({ label: t('qz.others'), value: OTHERS });
  if (q.hasSkip && !l.some(isSkip)) l.push({ label: t('qz.skip'), value: SKIP, exclusive: true });
  if (q.hasNone && !l.some(isNone)) l.push({ label: t('qz.none'), value: NONE, exclusive: true });
  return l.map((o) => ({ ...o, exclusive: o.exclusive || isNone(o) || isSkip(o) }));
}

export function QuestionField({ q, value, options, error, specify, specifyError, locked, country, onChange, onSpecify }) {
  const id = `qz-${q.name}`;
  const disabled = !q.editable && filled(value);
  const list = CHOICE.includes(q.type) ? withExtras(q, options).map((o) => (q.isMoney ? { ...o, label: moneyLabel(o.label, country) } : o)) : [];
  const spec = specifyLabel(q, value, list);
  const label = (
    <>
      {q.label}
      {q.required && <span className="qz__req" aria-hidden="true"> *</span>}
    </>
  );
  const describedBy = [error && `${id}-err`, q.type === 'multiselect' && q.max > 0 && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  let field;
  if (q.type === 'select' || q.type === 'radio') {
    const asCards = list.length <= 8 && list.every((o) => String(o.label).length <= 42);
    field = asCards ? (
      <fieldset className="qz-q" aria-describedby={describedBy}>
        <legend className="qz-q__label">{label}</legend>
        <div className="qz-opts" role="radiogroup" aria-required={q.required || undefined}>
          {list.map((o, i) => (
            <label key={o.value} className={cx('qz-opt', value === o.value && 'is-on')}>
              <input type="radio" id={i === 0 ? id : undefined} name={q.name} value={o.value} checked={value === o.value} disabled={disabled} onChange={() => onChange(o.value)} />
              <span className="qz-opt__mark" aria-hidden="true" />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    ) : (
      <div className="qz-q">
        <label className="qz-q__label" htmlFor={id}>
          {label}
        </label>
        <div className="qz-select">
          <select id={id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value || null)} aria-invalid={!!error} aria-describedby={describedBy} required={q.required}>
            <option value="">{t('qz.choose')}</option>
            {list.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Icon name="chevron" size={16} />
        </div>
      </div>
    );
  } else if (q.type === 'multiselect' || q.type === 'checkbox') {
    const cur = Array.isArray(value) ? value : filled(value) ? [value] : [];
    const full = q.max > 0 && cur.length >= q.max;
    const toggle = (o) => {
      if (cur.includes(o.value)) return onChange(cur.filter((v) => v !== o.value));
      if (o.exclusive) return onChange([o.value]);
      const ex = list.filter((x) => x.exclusive).map((x) => x.value);
      return onChange([...cur.filter((v) => !ex.includes(v)), o.value]);
    };
    field = (
      <fieldset className="qz-q" aria-describedby={describedBy}>
        <legend className="qz-q__label">{label}</legend>
        {q.max > 0 && (
          <p className="qz-q__hint" id={`${id}-hint`}>
            {tn('qz.max', q.max)}
          </p>
        )}
        <div className="qz-opts qz-opts--multi">
          {list.map((o, i) => {
            const on = cur.includes(o.value);
            return (
              <label key={o.value} className={cx('qz-opt qz-opt--check', on && 'is-on', o.exclusive && 'is-exclusive')}>
                <input type="checkbox" id={i === 0 ? id : undefined} checked={on} disabled={disabled || (!on && full && !o.exclusive)} onChange={() => toggle(o)} />
                <span className="qz-opt__mark" aria-hidden="true">
                  <Icon name="check" size={12} strokeWidth={3.4} />
                </span>
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  } else if (q.type === 'phone') {
    field = <PhoneField id={id} label={label} value={value} onChange={onChange} locked={locked} error={error} describedBy={describedBy} />;
  } else if (q.type === 'date') {
    field = (
      <div className="qz-q">
        <label className="qz-q__label" htmlFor={id}>
          {label}
        </label>
        <input className="qz-input" type="date" id={id} value={value ? String(value).slice(0, 10) : ''} disabled={disabled} onChange={(e) => onChange(e.target.value || null)} aria-invalid={!!error} aria-describedby={describedBy} />
      </div>
    );
  } else {
    const numeric = q.name === 'age' || /\\d|\[0-9\]/.test(options?.pattern || '');
    field = (
      <div className="qz-q">
        <label className="qz-q__label" htmlFor={id}>
          {label}
        </label>
        <input
          className="qz-input"
          id={id}
          type="text"
          inputMode={numeric ? 'numeric' : undefined}
          autoComplete="off"
          value={value ?? ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={q.required}
        />
      </div>
    );
  }
  return (
    <div className={cx('qz-field', `qz-field--${q.type}`, Number(q.size) >= 12 && 'is-wide', error && 'has-error')}>
      {field}
      {error && (
        <p className="qz-err" id={`${id}-err`} role="alert">
          <Icon name="close" size={13} /> {error}
        </p>
      )}
      {spec && (
        <div className="qz-q qz-q--specify">
          <label className="qz-q__label" htmlFor={`qz-${q.name}_specify`}>
            {spec} <span className="qz__req" aria-hidden="true">*</span>
          </label>
          <input className="qz-input" id={`qz-${q.name}_specify`} value={specify ?? ''} onChange={(e) => onSpecify(e.target.value)} aria-invalid={!!specifyError} />
          {specifyError && (
            <p className="qz-err" role="alert">
              <Icon name="close" size={13} /> {specifyError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Calling codes for the country the member is in (the existing app pre-selects it the same way).
const DIAL = { in: '91', us: '1', ca: '1', gb: '44', au: '61', de: '49', fr: '33', sg: '65', ae: '971', es: '34', it: '39', nl: '31', ie: '353', nz: '64', za: '27', ng: '234', ke: '254', ph: '63', my: '60', id: '62', br: '55', mx: '52', jp: '81' };
function PhoneField({ id, label, value, onChange, locked, error, describedBy }) {
  const [cc, setCc] = useState('');
  useEffect(() => {
    if (filled(value)) return;
    let live = true;
    actions.country().then((c) => live && DIAL[c] && setCc(DIAL[c]));
    return () => {
      live = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const digits = String(value || '');
  return (
    <div className="qz-q">
      <label className="qz-q__label" htmlFor={id}>
        {label}
      </label>
      <div className={cx('qz-phone', locked && 'is-locked')}>
        <span className="qz-phone__plus" aria-hidden="true">
          +
        </span>
        <input
          className="qz-input"
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={cc ? `${cc} …` : t('qz.phone.ph')}
          value={digits}
          disabled={locked}
          onFocus={() => !digits && cc && onChange(cc)}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 15))}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
        {locked && <Icon name="lock" size={16} />}
      </div>
      <p className="qz-q__hint">{locked ? t('qz.phone.locked') : t('qz.phone.hint')}</p>
    </div>
  );
}
