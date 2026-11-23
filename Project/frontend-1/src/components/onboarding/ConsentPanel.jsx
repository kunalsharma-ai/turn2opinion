// Registration step "Consent & Terms" for Consumers and Business professionals (Round 15).
// The member is logged in (the password step set the session cookie). They read the approved panel
// agreement for their panel and tick the consent boxes; acceptance is saved with the same call the
// stand-alone agreement pages use (PUT /api/v1/me { terms: [...] }), then the dashboard opens.
//
// The legal wording is NOT written here: it is generated word for word from the approved agreement
// pages (public/user/terms-b2c.html and terms-b2b.html) by scripts/extract-consent.mjs into
// src/data/consent/*.js. Only layout, headings and buttons are this file's own.
import { useEffect, useMemo, useRef, useState } from 'react';
import { ENV } from '../../config/env.js';
import { api } from '../../utils/api.js';
import Icon from '../Icon.jsx';

const LOADERS = {
  consumer: () => import('../../data/consent/consumer.js'),
  pro: () => import('../../data/consent/professional.js')
};
const TITLE = { consumer: 'Consumer Consent & Terms', pro: 'Professional Consent & Terms' };
const CH_ICON = { door: 'gate', layers: 'layers', coins: 'coin', shield: 'shield', mic: 'megaphone', key: 'key', badge: 'id', briefcase: 'briefcase', chart: 'pulse', share: 'link' };
const C_ICON = { pen: 'pen', lock: 'lock', badge: 'id', bell: 'bell', cookie: 'cookie', mic: 'megaphone', heart: 'heart', vault: 'database', handshake: 'users' };
// Layout words when an agreement's own UI strings don't have them (the two agreements were built
// with different reader designs, so their button words differ; the legal text never comes from here).
const UI = {
  in_short: 'In short',
  full: 'Read the full section',
  hide: 'Hide full text',
  read_count: '{0} of {1} read',
  choices_h: 'Your choices',
  read_note: 'You have read {0} of {1} sections. You can still open the others before confirming.',
  agree_btn: 'I agree, continue',
  agree_saving: 'Saving your choices…',
  required: 'Required',
  optional: 'Optional'
};
const fill = (s, ...a) => String(s || '').replace(/\{(\d)\}/g, (_, i) => a[i] ?? '');

function Clauses({ items, doc }) {
  return (
    <div className="rc-clauses">
      {items.map((b, i) =>
        typeof b === 'string' ? (
          <p key={i}>{b}</p>
        ) : b.h ? (
          <h5 key={i}>{b.h}</h5>
        ) : b.ol || b.ul ? (
          (() => {
            const L = b.ol ? 'ol' : 'ul';
            return (
              <L key={i}>
                {(b.ol || b.ul).map((x, j) => (
                  <li key={j}>{x}</li>
                ))}
              </L>
            );
          })()
        ) : b.contact ? (
          <address key={i} className="rc-contact">
            <b>{doc.operator}</b>
            <span>{doc.supportEmail}</span>
            <span>{doc.address}</span>
          </address>
        ) : null
      )}
    </div>
  );
}

/** One consent box. A top-level component, so ticking a box never remounts the others (keeps focus). */
function Check({ c, s, on, bad, onToggle }) {
  return (
    <div className={`rc-choice ${on ? 'is-on' : ''} ${bad ? 'has-error' : ''}`} data-c={c.id}>
      <label className="check">
        <input type="checkbox" checked={on} onChange={(e) => onToggle(c.id, e.target.checked)} aria-describedby={`rc-h-${c.id}`} aria-invalid={bad || undefined} />
        <span className="check-ui" />
        <span className="rc-choice-text">
          <span className="rc-choice-ico" aria-hidden="true">
            <Icon name={C_ICON[c.icon] || 'check'} size={16} />
          </span>
          <span>
            <strong>{s[`c_${c.id}`]}</strong>
            <small id={`rc-h-${c.id}`}>{s[`c_${c.id}_hint`]}</small>
          </span>
          <span className={`rc-tag ${c.required ? 'is-req' : ''}`}>{c.required ? s.required : s.optional}</span>
        </span>
      </label>
    </div>
  );
}

/**
 * kind: 'consumer' | 'pro'. firstName for the greeting. onDone() runs after the choices are saved.
 */
export default function ConsentPanel({ kind = 'consumer', firstName = '', onDone }) {
  const [doc, setDoc] = useState(null);
  const [loadErr, setLoadErr] = useState(false);
  const [open, setOpen] = useState(null); // open chapter id
  const [full, setFull] = useState({}); // section number -> full text shown
  const [seen, setSeen] = useState({});
  const [ticks, setTicks] = useState({});
  const [tried, setTried] = useState(false);
  const [state, setState] = useState('idle'); // idle | saving | done | error
  const [err, setErr] = useState('');
  const choicesRef = useRef(null);

  useEffect(() => {
    let live = true;
    (LOADERS[kind] || LOADERS.consumer)()
      .then((m) => {
        if (!live) return;
        const d = m.default;
        setDoc(d);
        setOpen(d.chapters[0]?.id || null);
        // the first chapter opens on its own, so its short summaries count as read
        setSeen(Object.fromEntries((d.chapters[0]?.sections || []).map((n) => [n, true])));
        setTicks(Object.fromEntries(d.consents.map((c) => [c.id, false])));
      })
      .catch(() => live && setLoadErr(true));
    return () => {
      live = false;
    };
  }, [kind]);

  const raw = doc?.strings || {};
  // Same reader for both agreements: the Professional one names chapters tr_* and the choices "approvals".
  const s = new Proxy(raw, {
    get: (o, k) => {
      if (typeof k !== 'string') return o[k];
      if (o[k] != null) return o[k];
      if (k.startsWith('ch_') && o[`tr_${k.slice(3)}`] != null) return o[`tr_${k.slice(3)}`];
      if (k === 'choices_h') return o.approvals_h ?? UI.choices_h;
      if (k === 'choices_lead') return o.approvals_lead ?? '';
      if (k === 'read_note') return o.review_note ?? UI.read_note;
      return UI[k] ?? '';
    }
  });
  const required = useMemo(() => (doc ? doc.consents.filter((c) => c.required) : []), [doc]);
  const optional = useMemo(() => (doc ? doc.consents.filter((c) => !c.required) : []), [doc]);
  const missing = required.filter((c) => !ticks[c.id]);
  const total = doc ? Object.keys(doc.sections).length : 0;
  const readCount = Object.keys(seen).length;

  const toggleChapter = (ch) => {
    setOpen((o) => (o === ch.id ? null : ch.id));
    setSeen((v) => ({ ...v, ...Object.fromEntries(ch.sections.map((n) => [n, true])) }));
  };

  const save = async () => {
    setTried(true);
    if (missing.length) {
      choicesRef.current?.querySelector(`[data-c="${missing[0].id}"] input`)?.focus();
      return;
    }
    setState('saving');
    setErr('');
    const ids = doc.consents.filter((c) => ticks[c.id]).map((c) => c.id);
    try {
      if (!ENV.DEMO_MODE) {
        // Keep any earlier records (for example the sign-up privacy acknowledgement) and replace
        // only this agreement's own choices.
        let prev = [];
        try {
          const me = await api.get('/api/v1/me');
          prev = Array.isArray(me?.data?.terms) ? me.data.terms : [];
        } catch {
          prev = [];
        }
        const own = new Set(doc.consents.map((c) => c.id));
        const terms = [...new Set([...prev.filter((t) => !own.has(t)), ...ids])];
        const r = await api.put('/api/v1/me', { terms });
        if (r?.status !== 'success') throw new Error(r?.message || s.err_save);
      } else await new Promise((r) => setTimeout(r, 700));
      setState('done');
      onDone?.({ terms: ids, version: doc.termsVersion });
    } catch (e) {
      setState('error');
      setErr(e?.message && !/^HTTP/.test(e.message) ? e.message : s.err_save || 'We couldn’t save your choices. Please try again.');
    }
  };

  if (loadErr)
    return (
      <div className="rc-panel">
        <p className="form-alert" role="alert">
          The agreement couldn’t load. Check your connection and reload the page.
        </p>
      </div>
    );
  if (!doc)
    return (
      <div className="rc-panel" aria-busy="true">
        <div className="rc-skel" />
        <div className="rc-skel short" />
        <div className="rc-skel" />
      </div>
    );

  const box = (c) => <Check key={c.id} c={c} s={s} on={!!ticks[c.id]} bad={tried && c.required && !ticks[c.id]} onToggle={(id, v) => setTicks((t) => ({ ...t, [id]: v }))} />;

  return (
    <div className={`rc-panel rc-${kind}`}>
      <header className="rc-head">
        <span className="rc-badge">
          <Icon name="clipboard" size={16} /> {TITLE[kind]}
        </span>
        <h2>{firstName ? fill(s.hello, firstName) : s.hello_anon}</h2>
        <p className="rc-lead">{s.lead}</p>
        <p className="rc-meta">
          <span>{fill(s.version, doc.termsVersion)}</span>
          <span>{fill(s.effective, doc.effectiveDate, doc.lastUpdated)}</span>
          <span>{s.time}</span>
        </p>
        <div className="rc-read" role="progressbar" aria-label={fill(s.read_count, readCount, total)} aria-valuemin={0} aria-valuemax={total} aria-valuenow={readCount}>
          <span style={{ '--p': total ? readCount / total : 0 }} />
          <em>{fill(s.read_count, readCount, total)}</em>
        </div>
      </header>

      <div className="rc-chapters">
        {doc.chapters.map((ch, ci) => {
          const on = open === ch.id;
          return (
            <section key={ch.id} className={`rc-ch ${on ? 'is-open' : ''}`} style={{ '--ci': ci }}>
              <h3>
                <button type="button" className="rc-ch-btn" aria-expanded={on} aria-controls={`rc-ch-${ch.id}`} onClick={() => toggleChapter(ch)}>
                  <span className="rc-ch-ico" aria-hidden="true">
                    <Icon name={CH_ICON[ch.icon] || 'clipboard'} size={18} />
                  </span>
                  <span className="rc-ch-t">
                    <strong>{s[`ch_${ch.id}`]}</strong>
                    <small>{s[`ch_${ch.id}_tag`]}</small>
                  </span>
                  <span className="rc-ch-n">{ch.sections.every((n) => seen[n]) ? <Icon name="check" size={14} strokeWidth={3} /> : ch.sections.length}</span>
                  <Icon name="chevron" size={18} className="rc-ch-chev" />
                </button>
              </h3>
              {on && (
                <div id={`rc-ch-${ch.id}`} className="rc-ch-body">
                  {ch.sections.map((n) => {
                    const sec = doc.sections[n];
                    if (!sec) return null;
                    return (
                      <article key={n} className="rc-sec">
                        <h4>
                          <span className="rc-sec-n">{n}</span> {sec.title}
                        </h4>
                        <p className="rc-short">
                          <b>{s.in_short}:</b> {sec.short}
                        </p>
                        <button type="button" className="rc-more" aria-expanded={!!full[n]} onClick={() => setFull((v) => ({ ...v, [n]: !v[n] }))}>
                          {full[n] ? s.hide : s.full} <Icon name="chevron" size={14} />
                        </button>
                        {full[n] && <Clauses items={sec.body} doc={doc} />}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="rc-choices" ref={choicesRef}>
        <h3>{s.choices_h}</h3>
        <p className="rc-lead">{s.choices_lead}</p>
        <div className="rc-group">
          <div className="rc-group-h">
            <span>{s.required}</span>
            {missing.length > 0 && <em>{fill(s.need_n, missing.length)}</em>}
          </div>
          {required.map(box)}
        </div>
        {optional.length > 0 && (
          <div className="rc-group">
            <div className="rc-group-h">
              <span>{s.optional}</span>
            </div>
            {optional.map(box)}
          </div>
        )}
      </div>

      {readCount < total && <p className="rc-note">{fill(s.read_note, readCount, total)}</p>}
      {tried && missing.length > 0 && (
        <p className="field-error" role="alert">
          {fill(s.need_n, missing.length)}
        </p>
      )}
      {state === 'error' && (
        <p className="form-alert" role="alert">
          {err}
        </p>
      )}
      <div className="join-actions">
        <button type="button" className="btn btn-primary btn-lg btn-shimmer" onClick={save} disabled={state === 'saving' || state === 'done'}>
          {state === 'saving' ? (
            <>
              <span className="btn-spin" aria-hidden="true" /> {s.agree_saving}
            </>
          ) : missing.length ? (
            <>
              {s.agree_btn} <Icon name="arrow" size={18} />
            </>
          ) : (
            <>
              <Icon name="check" size={18} strokeWidth={2.6} /> {s.agree_btn}
            </>
          )}
        </button>
      </div>
      <p className="rc-foot">
        {fill(s.footer_q, '').trim()} <a href={`mailto:${doc.supportEmail}`}>{doc.supportEmail}</a>
      </p>
    </div>
  );
}
