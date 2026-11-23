// Help centre (/member/help/). Search across every answer and guide, browse by topic, follow
// step-by-step guides, and when nothing fits raise a query ("Other") on the existing support-ticket
// endpoints. Content lives in data/help.js and is tailored to Consumer, Professional and Teen members.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMe } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { HELP_CATEGORIES, HELP_FAQS, HELP_GUIDES, QUERY_TOPICS, forType } from '../data/help.js';
import { feedback } from '../theme/feedback.js';
import { relTime } from '../i18n/t.js';
import { Button, Icon, MLink, Modal, cx, useToast } from '../components/ui.jsx';

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '');
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const STOP = new Set(['the', 'and', 'for', 'after', 'with', 'not', 'how', 'what', 'why', 'can', 'does', 'my', 'your', 'you', 'are', 'was', 'have', 'has', 'from', 'this', 'that', 'but', 'when', 'want', 'need', 'please', 'help']);
const wordsOf = (q) => norm(q).split(/[^a-z0-9]+/).filter((w) => w.length > 1);

/** Score an entry against the search words; 0 = no match. Questions and titles weigh more. */
function score(words, head, body, extra = '') {
  if (!words.length) return 0;
  const h = norm(head);
  const b = norm(`${body} ${extra}`);
  let n = 0;
  for (const w of words) {
    if (h.includes(w)) n += 3;
    else if (b.includes(w)) n += 1;
    else return 0;
  }
  return n;
}

/** Wrap matched words in <mark>. */
function Hi({ text, words }) {
  if (!words?.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return String(text)
    .split(re)
    .map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

const scrollToId = (id) => {
  const el = typeof document !== 'undefined' && document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const LEAD = {
  consumer: 'Answers for every part of your member area: profiles, surveys, points, rewards and more.',
  pro: 'Answers for every part of your member area, from business studies to rewards and your account.',
  teen: 'Answers for every part of your Teen account: profiles, surveys, points, your guardian and staying safe.'
};

const POPULAR = {
  consumer: ['Why are my surveys locked?', 'Which rewards can I choose?', 'Why was I screened out?', 'What is the quality score?'],
  pro: ['How do I qualify for more studies?', 'Which rewards can I choose?', 'Why was I screened out?', 'What is the quality score?'],
  teen: ['Why does my guardian need to agree?', 'Why are my surveys locked?', 'What are my points for?', 'Can I invite my friends?']
};

const STATUS = {
  new: { label: 'Received', tone: 'info' },
  open: { label: 'In progress', tone: 'warn' },
  pending: { label: 'Waiting for you', tone: 'warn' },
  resolved: { label: 'Resolved', tone: 'ok' },
  closed: { label: 'Closed', tone: 'ok' }
};

/* ------------------------------------------------------------------ hero */
function HelpHero({ me, q, setQ, total, guides, onAsk, popular, onPopular }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <section className={cx('hc-hero', `is-${me.type}`)} aria-labelledby="hc-title">
      <div className="hc-hero__art" aria-hidden="true">
        <span className="hc-orb hc-orb--a" />
        <span className="hc-orb hc-orb--b" />
        <div className="hc-buoy">
          <Icon name="lifebuoy" size={92} strokeWidth={1.4} />
        </div>
        {['clipboard', 'coin', 'shield', 'map', 'gear', 'chat'].map((ic, i) => (
          <span key={ic} className="hc-float" style={{ '--i': i }}>
            <Icon name={ic} size={20} />
          </span>
        ))}
      </div>
      <div className="hc-hero__text">
        <p className="hc-eyebrow">
          <Icon name="help" size={16} /> Help centre
        </p>
        <h1 id="hc-title">
          How can we help{me.firstName ? ', ' : ''}
          {me.firstName && <span className="hx-name">{me.firstName}</span>}?
        </h1>
        <p className="hc-lead">{LEAD[me.type] || LEAD.consumer}</p>
        <form className="hc-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <Icon name="search" size={22} />
          <label htmlFor="hc-q" className="mb-sr">
            Search help
          </label>
          <input id="hc-q" ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: points, locked surveys, password…" autoComplete="off" enterKeyHint="search" />
          {q ? (
            <button type="button" className="hc-search__clear" onClick={() => setQ('')} aria-label="Clear search">
              <Icon name="close" size={18} />
            </button>
          ) : (
            <kbd className="hc-search__kbd">/</kbd>
          )}
        </form>
        <div className="hc-popular">
          <span>Popular:</span>
          {popular.map((p) => (
            <button key={p} type="button" onClick={() => onPopular(p)}>
              {p}
            </button>
          ))}
        </div>
        <ul className="hc-facts">
          <li>
            <strong>{total}</strong> answers
          </li>
          <li>
            <strong>{guides}</strong> step-by-step guides
          </li>
          <li>
            <button type="button" onClick={onAsk}>
              <Icon name="chat" size={16} /> Ask us anything
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ topics */
function Topics({ cats, counts, active, onPick }) {
  return (
    <section className="hc-sec" aria-labelledby="hc-topics">
      <header className="hc-head">
        <h2 id="hc-topics">Browse by topic</h2>
        <p>Every feature of your member area, one tap away.</p>
      </header>
      <ul className="hc-topics">
        {cats.map((c, i) => (
          <li key={c.id} style={{ '--c': c.color, '--n': i }}>
            <button type="button" className={cx('hc-topic', active === c.id && 'is-on')} aria-pressed={active === c.id} onClick={() => onPick(active === c.id ? null : c.id)}>
              <span className="hc-topic__icon">
                <Icon name={c.icon} size={22} />
              </span>
              <span className="hc-topic__t">{c.title}</span>
              <span className="hc-topic__b">{c.blurb}</span>
              <span className="hc-topic__n">
                {plural(counts[c.id] || 0, 'answer')} · {plural(counts[`g:${c.id}`] || 0, 'guide')}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ guides */
function GuideCard({ g, cat, onOpen, words }) {
  return (
    <button type="button" className="hc-guide" style={{ '--c': cat?.color || '#1f5bff' }} onClick={() => onOpen(g)}>
      <span className="hc-guide__icon">
        <Icon name={g.icon} size={24} />
      </span>
      <span className="hc-guide__cat">{cat?.title}</span>
      <span className="hc-guide__t">
        <Hi text={g.title} words={words} />
      </span>
      <span className="hc-guide__steps">
        {g.steps.map((_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className="hc-guide__meta">
        <Icon name="clock" size={14} /> {g.time} · {g.steps.length} steps
        <Icon name="arrow" size={16} className="hc-guide__go" />
      </span>
    </button>
  );
}

function GuideModal({ guide, cat, onClose, onAsk }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [guide]);
  if (!guide) return null;
  const last = i === guide.steps.length - 1;
  const [title, text] = guide.steps[i];
  const step = (d) => {
    feedback('toggle');
    setI((v) => Math.max(0, Math.min(guide.steps.length - 1, v + d)));
  };
  return (
    <Modal open={!!guide} onClose={onClose} labelledBy="hc-gm-t">
      <div className="hc-gm" style={{ '--c': cat?.color || '#1f5bff' }}>
        <header className="hc-gm__head">
          <span className="hc-gm__icon">
            <Icon name={guide.icon} size={26} />
          </span>
          <div>
            <p className="hc-gm__cat">
              {cat?.title} · {guide.time}
            </p>
            <h2 id="hc-gm-t">{guide.title}</h2>
          </div>
          <button type="button" className="hc-gm__x" onClick={onClose} aria-label="Close guide">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="hc-gm__bar" aria-hidden="true">
          <span style={{ width: `${((i + 1) / guide.steps.length) * 100}%` }} />
        </div>
        <ol className="hc-gm__dots" aria-label="Steps">
          {guide.steps.map(([t], k) => (
            <li key={k}>
              <button type="button" className={cx(k === i && 'is-on', k < i && 'is-done')} onClick={() => setI(k)} aria-current={k === i ? 'step' : undefined} aria-label={`Step ${k + 1}: ${t}`}>
                {k < i ? <Icon name="check" size={14} /> : k + 1}
              </button>
            </li>
          ))}
        </ol>
        <div className="hc-gm__step" key={i} aria-live="polite">
          <p className="hc-gm__n">
            Step {i + 1} of {guide.steps.length}
          </p>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <footer className="hc-gm__foot">
          <Button variant="ghost" icon="arrowLeft" onClick={() => step(-1)} disabled={i === 0}>
            Back
          </Button>
          {!last ? (
            <Button iconEnd="arrow" onClick={() => step(1)}>
              Next step
            </Button>
          ) : guide.go ? (
            <Button iconEnd="arrow" to={guide.go} onClick={onClose}>
              Take me there
            </Button>
          ) : guide.anchor ? (
            <Button
              iconEnd="arrow"
              onClick={() => {
                onClose();
                onAsk();
              }}
            >
              Ask us now
            </Button>
          ) : (
            <Button icon="check" onClick={onClose}>
              Done
            </Button>
          )}
        </footer>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ FAQs */
function Faq({ f, open, onToggle, words, cat, onAsk }) {
  const [vote, setVote] = useState(null);
  const id = `hc-f-${f.key}`;
  return (
    <li className={cx('hc-faq', open && 'is-open')} style={{ '--c': cat?.color }}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="hc-faq__dot" aria-hidden="true">
            <Icon name={cat?.icon || 'help'} size={16} />
          </span>
          <span className="hc-faq__q">
            <Hi text={f.q} words={words} />
          </span>
          <Icon name="chevron" size={18} className="hc-faq__chev" />
        </button>
      </h3>
      <div id={id} className="hc-faq__a" hidden={!open}>
        <p>
          <Hi text={f.a} words={words} />
        </p>
        <div className="hc-faq__row">
          {f.go && (
            <MLink to={f.go} className="hc-faq__go">
              Take me there <Icon name="arrow" size={15} />
            </MLink>
          )}
          {f.anchor && (
            <button type="button" className="hc-faq__go" onClick={() => onAsk()}>
              Ask us now <Icon name="arrow" size={15} />
            </button>
          )}
          <span className="hc-faq__vote">
            {vote == null ? (
              <>
                Was this helpful?
                <button
                  type="button"
                  onClick={() => {
                    feedback('success');
                    setVote(1);
                  }}
                  aria-label="Yes, this helped"
                >
                  <Icon name="thumb" size={16} />
                </button>
                <button type="button" className="is-down" onClick={() => setVote(0)} aria-label="No, I still need help">
                  <Icon name="thumb" size={16} />
                </button>
              </>
            ) : vote ? (
              <span className="hc-faq__thanks">
                <Icon name="check" size={15} /> Thanks for telling us
              </span>
            ) : (
              <button type="button" className="hc-faq__more" onClick={() => onAsk(f.cat, f.q)}>
                Sorry about that. Ask us about it <Icon name="arrow" size={15} />
              </button>
            )}
          </span>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ ask */
function Ask({ me, topics, preset, faqs, onFaq }) {
  const toast = useToast();
  const [topic, setTopic] = useState(null);
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState({});
  const [done, setDone] = useState(null);
  const [list, setList] = useState(null);
  const [listErr, setListErr] = useState(false);
  const [openT, setOpenT] = useState(null);
  const [threads, setThreads] = useState({});
  const subjRef = useRef(null);

  const load = useCallback(() => {
    setListErr(false);
    actions
      .tickets(me.email)
      .then(setList)
      .catch(() => setListErr(true));
  }, [me.email]);
  useEffect(load, [load]);

  useEffect(() => {
    if (!preset) return;
    setTopic(preset.topic || 'other');
    if (preset.subject) setSubject(preset.subject);
    setDone(null);
    requestAnimationFrame(() => subjRef.current?.focus({ preventScroll: true }));
  }, [preset]);

  const words = useMemo(() => wordsOf(subject), [subject]);
  const hints = useMemo(() => {
    if (words.length < 1 || subject.trim().length < 4) return [];
    return faqs
      .map((f) => {
        // any-word match for suggestions: a query is rarely phrased like the answer
        const hq = norm(f.q);
        const h = norm(f.q + ' ' + f.a);
        const ws = words.filter((w) => w.length > 2 && !STOP.has(w));
        const inQ = ws.filter((w) => hq.includes(w)).length;
        const n = ws.filter((w) => h.includes(w)).length + inQ;
        return [inQ ? n : 0, f];
      })
      .filter(([n]) => n >= 2)
      .sort((a, b) => b[0] - a[0])
      .slice(0, 3)
      .map(([, f]) => f);
  }, [faqs, words, subject]);

  const pick = (id) => {
    feedback('toggle');
    setTopic(id);
    setDone(null);
    requestAnimationFrame(() => subjRef.current?.focus({ preventScroll: true }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const s = subject.trim();
    const d = details.trim();
    const x = {};
    if (s.length < 5) x.subject = 'Add a short subject (at least 5 characters).';
    if (d.length < 20) x.details = 'Tell us a little more (at least 20 characters) so we can help first time.';
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    try {
      const label = topics.find((t) => t.id === topic)?.label || 'Other';
      const r = await actions.raiseTicket({ topic, subject: s, description: `${d}\n\n— Topic: ${label}`, type: me.type });
      feedback('success');
      setDone(r.ticket || { no: '' });
      setSubject('');
      setDetails('');
      load();
    } catch (ex) {
      toast(ex?.message && !/request failed/i.test(ex.message) ? ex.message : 'We couldn’t send your query. Please try again.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const openThread = (tk) => {
    const next = openT === tk.id ? null : tk.id;
    setOpenT(next);
    if (next && !threads[tk.id]) {
      setThreads((m) => ({ ...m, [tk.id]: 'loading' }));
      actions
        .ticketThread(tk.id)
        .then((r) => setThreads((m) => ({ ...m, [tk.id]: r })))
        .catch(() => setThreads((m) => ({ ...m, [tk.id]: 'error' })));
    }
  };

  const cur = topics.find((t) => t.id === topic);
  return (
    <section className="hc-sec hc-ask" id="help-ask" aria-labelledby="hc-ask-t">
      <div className="hc-ask__card">
        <header className="hc-head">
          <span className="hc-ask__badge" aria-hidden="true">
            <Icon name="headset" size={26} />
          </span>
          <div>
            <h2 id="hc-ask-t">Still need help? Ask us.</h2>
            <p>Pick a topic, or choose Other for anything else. A real person from our support team replies by email.</p>
          </div>
        </header>

        {done ? (
          <div className="hc-done" role="status">
            <span className="hc-done__tick" aria-hidden="true">
              <Icon name="check" size={30} strokeWidth={2.4} />
            </span>
            <div>
              <h3>Query sent{done.no ? `: ticket ${done.no}` : ''}</h3>
              <p>We’ve got it. Our reply comes by email, and it also shows below under My queries. Keep an eye on your spam folder, just in case.</p>
              <Button variant="ghost" icon="plus" onClick={() => setDone(null)}>
                Ask something else
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="hc-qtopics" aria-label="Choose a topic">
              {topics.map((t) => (
                <li key={t.id} style={{ '--c': t.color }}>
                  <button type="button" className={cx(topic === t.id && 'is-on', t.id === 'other' && 'is-other')} aria-pressed={topic === t.id} onClick={() => pick(t.id)}>
                    <Icon name={t.icon} size={18} />
                    <span>{t.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            {topic && (
              <form className="hc-form" onSubmit={submit} noValidate style={{ '--c': cur?.color }}>
                <p className="hc-form__topic">
                  <Icon name={cur?.icon || 'help'} size={16} /> {cur?.label}
                  <button type="button" onClick={() => setTopic(null)}>
                    Change
                  </button>
                </p>
                <div className="hc-field">
                  <label htmlFor="hc-subj">Subject</label>
                  <input id="hc-subj" ref={subjRef} value={subject} maxLength={120} onChange={(e) => setSubject(e.target.value)} placeholder="For example: Points missing for yesterday’s survey" aria-invalid={!!err.subject} aria-describedby={err.subject ? 'hc-subj-e' : undefined} />
                  {err.subject && (
                    <p className="hc-err" id="hc-subj-e">
                      {err.subject}
                    </p>
                  )}
                </div>
                {hints.length > 0 && (
                  <div className="hc-hints" aria-live="polite">
                    <p>
                      <Icon name="sparkles" size={15} /> These might answer it straight away
                    </p>
                    <ul>
                      {hints.map((f) => (
                        <li key={f.key}>
                          <button type="button" onClick={() => onFaq(f)}>
                            {f.q} <Icon name="arrow" size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="hc-field">
                  <label htmlFor="hc-det">What happened?</label>
                  <textarea id="hc-det" rows={5} value={details} maxLength={2000} onChange={(e) => setDetails(e.target.value)} placeholder="What did you do, what did you expect, and what happened instead? Add the survey name or date if it helps." aria-invalid={!!err.details} aria-describedby="hc-det-c" />
                  <p className="hc-count" id="hc-det-c">
                    {err.details ? <span className="hc-err">{err.details}</span> : <span>We reply to {me.email || 'your account email'}.</span>}
                    <span>{details.length}/2000</span>
                  </p>
                </div>
                <div className="hc-form__foot">
                  <p className="hc-form__note">
                    <Icon name="lock" size={14} /> Never send your password. We will never ask for it.
                  </p>
                  <Button type="submit" icon="send" busy={busy} disabled={busy}>
                    {busy ? 'Sending…' : 'Send my query'}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      <div className="hc-mine">
        <header className="hc-mine__head">
          <h3>
            <Icon name="mail" size={18} /> My queries
          </h3>
          <button type="button" onClick={load} aria-label="Refresh my queries">
            <Icon name="refresh" size={16} />
          </button>
        </header>
        {listErr ? (
          <p className="hc-mine__empty">
            Your queries couldn’t load.{' '}
            <button type="button" onClick={load}>
              Try again
            </button>
          </p>
        ) : !list ? (
          <p className="hc-mine__empty">Loading…</p>
        ) : !list.length ? (
          <p className="hc-mine__empty">No queries yet. When you ask us something, it appears here with its ticket number and our replies.</p>
        ) : (
          <ul className="hc-tickets">
            {list.map((tk) => {
              const st = STATUS[tk.status] || { label: tk.status, tone: 'info' };
              const th = threads[tk.id];
              return (
                <li key={tk.id || tk.no} className={cx(openT === tk.id && 'is-open')}>
                  <button type="button" className="hc-tk" aria-expanded={openT === tk.id} onClick={() => openThread(tk)}>
                    <span className="hc-tk__no">{tk.no || '—'}</span>
                    <span className="hc-tk__s">{tk.subject || 'No subject'}</span>
                    <span className={cx('hc-tk__st', `is-${st.tone}`)}>{st.label}</span>
                    <span className="hc-tk__at">{tk.at ? relTime(tk.at) : ''}</span>
                  </button>
                  {openT === tk.id && (
                    <div className="hc-tk__body">
                      {tk.description && <p className="hc-tk__desc">{tk.description.split('\n\n— Topic:')[0]}</p>}
                      {th === 'loading' ? (
                        <p className="hc-mine__empty">Loading replies…</p>
                      ) : th === 'error' ? (
                        <p className="hc-mine__empty">Replies couldn’t load. They are also in your email.</p>
                      ) : th && th.length ? (
                        <ol className="hc-thread">
                          {th.map((m) => (
                            <li key={m.id}>
                              <p className="hc-thread__by">
                                <Icon name="headset" size={14} /> {m.by} {m.at && <span>· {relTime(m.at)}</span>}
                              </p>
                              <p>{m.message}</p>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="hc-mine__empty">No reply yet. We usually reply within 2 working days.</p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */
export function HelpPage() {
  const me = useMe();
  const type = me.type || 'consumer';
  const cats = useMemo(() => forType(HELP_CATEGORIES, type), [type]);
  const catById = useMemo(() => Object.fromEntries(cats.map((c) => [c.id, c])), [cats]);
  const faqs = useMemo(() => forType(HELP_FAQS, type).filter((f) => catById[f.cat]).map((f, i) => ({ ...f, key: i })), [type, catById]);
  const guides = useMemo(() => forType(HELP_GUIDES, type).filter((g) => catById[g.cat]), [type, catById]);
  const topics = useMemo(() => QUERY_TOPICS(type), [type]);
  const counts = useMemo(() => {
    const c = {};
    faqs.forEach((f) => (c[f.cat] = (c[f.cat] || 0) + 1));
    guides.forEach((g) => (c[`g:${g.cat}`] = (c[`g:${g.cat}`] || 0) + 1));
    return c;
  }, [faqs, guides]);

  const [q, setQ] = useState('');
  const [cat, setCat] = useState(null);
  const [open, setOpen] = useState(() => new Set());
  const [guide, setGuide] = useState(null);
  const [preset, setPreset] = useState(null);
  const [more, setMore] = useState(() => new Set());
  const closeGuide = useCallback(() => setGuide(null), []);

  const ask = useCallback((topic, subject) => {
    setPreset({ topic: topic && topic !== 'start' && topic !== 'trouble' ? topic : topic === 'trouble' ? 'technical' : 'other', subject: subject || '', n: Date.now() });
    requestAnimationFrame(() => scrollToId('help-ask'));
  }, []);

  // deep links: #topic-<id> (header Help button), #help-ask, #faq-<text>
  useEffect(() => {
    const read = () => {
      const raw = String(window.location.hash || '');
      // path mode: /member/help/#topic-x; hash-router mode: #/member/help/?a=topic-x
      const h = decodeURIComponent((raw.match(/[?&]a=([^&#]+)/) || [])[1] || raw.split('#').pop() || '');
      if (h.startsWith('topic-') && catById[h.slice(6)]) {
        setCat(h.slice(6));
        setTimeout(() => scrollToId('help-faqs'), 60);
      } else if (h === 'help-ask') setTimeout(() => scrollToId('help-ask'), 60);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, [catById]);

  const words = useMemo(() => wordsOf(q), [q]);
  const searching = words.length > 0;
  const shownFaqs = useMemo(() => {
    if (searching)
      return faqs
        .map((f) => [score(words, f.q, f.a, catById[f.cat]?.title), f])
        .filter(([n]) => n > 0)
        .sort((a, b) => b[0] - a[0])
        .map(([, f]) => f);
    return cat ? faqs.filter((f) => f.cat === cat) : faqs;
  }, [faqs, words, searching, cat, catById]);
  const shownGuides = useMemo(() => {
    if (searching) return guides.filter((g) => score(words, g.title, g.steps.flat().join(' '), catById[g.cat]?.title) > 0);
    return cat ? guides.filter((g) => g.cat === cat) : guides;
  }, [guides, words, searching, cat, catById]);

  // search opens the best match
  useEffect(() => {
    if (searching && shownFaqs[0]) setOpen(new Set([shownFaqs[0].key]));
  }, [searching, shownFaqs]);

  const toggle = (k) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  const openFaq = (f) => {
    setQ('');
    setCat(f.cat);
    setOpen(new Set([f.key]));
    requestAnimationFrame(() => {
      const el = document.getElementById(`hc-f-${f.key}`)?.closest('li');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const pickCat = (id) => {
    feedback('toggle');
    setCat(id);
    setQ('');
    if (id) requestAnimationFrame(() => scrollToId('help-faqs'));
  };

  const grouped = useMemo(() => {
    if (searching || cat) return null;
    return cats.map((c) => ({ c, list: shownFaqs.filter((f) => f.cat === c.id) })).filter((g) => g.list.length);
  }, [searching, cat, cats, shownFaqs]);

  return (
    <div className="xp hc">
      <HelpHero
        me={me}
        q={q}
        setQ={(v) => {
          setQ(v);
          if (v) setCat(null);
        }}
        total={faqs.length}
        guides={guides.length}
        onAsk={() => ask('other')}
        popular={(POPULAR[type] || POPULAR.consumer).filter((p) => faqs.some((f) => f.q === p))}
        onPopular={(p) => {
          const f = faqs.find((x) => x.q === p);
          if (f) openFaq(f);
        }}
      />

      {searching && (
        <p className="hc-results" role="status">
          {shownFaqs.length + shownGuides.length ? (
            <>
              <strong>{shownFaqs.length + shownGuides.length}</strong> results for “{q.trim()}”
            </>
          ) : (
            <>
              Nothing matches “{q.trim()}”. Try other words, or{' '}
              <button type="button" onClick={() => ask('other', q.trim())}>
                ask us directly
              </button>
              .
            </>
          )}
        </p>
      )}

      {!searching && <Topics cats={cats} counts={counts} active={cat} onPick={pickCat} />}

      {shownGuides.length > 0 && (
        <section className="hc-sec" aria-labelledby="hc-guides">
          <header className="hc-head">
            <h2 id="hc-guides">{cat ? `${catById[cat]?.title}: guides` : 'Step-by-step guides'}</h2>
            <p>Short walkthroughs with a button that takes you straight to the right place.</p>
          </header>
          <div className="hc-guides">
            {shownGuides.map((g) => (
              <GuideCard key={g.id} g={g} cat={catById[g.cat]} onOpen={setGuide} words={words} />
            ))}
          </div>
        </section>
      )}

      <section className="hc-sec" id="help-faqs" aria-labelledby="hc-faqs">
        <header className="hc-head hc-head--row">
          <div>
            <h2 id="hc-faqs">{searching ? 'Answers' : cat ? catById[cat]?.title : 'Frequently asked questions'}</h2>
            <p>{cat && !searching ? catById[cat]?.blurb : 'Tap a question to see the answer.'}</p>
          </div>
          {cat && !searching && (
            <button type="button" className="hc-chip" onClick={() => pickCat(null)}>
              <Icon name="close" size={14} /> All topics
            </button>
          )}
        </header>
        {!searching && (
          <div className="hc-tabs" role="toolbar" aria-label="Filter by topic">
            <button type="button" className={cx(!cat && 'is-on')} onClick={() => pickCat(null)}>
              All
            </button>
            {cats.map((c) => (
              <button key={c.id} type="button" className={cx(cat === c.id && 'is-on')} style={{ '--c': c.color }} onClick={() => pickCat(c.id)}>
                <Icon name={c.icon} size={14} /> {c.title}
              </button>
            ))}
          </div>
        )}
        {grouped ? (
          grouped.map(({ c, list }) => (
            <div key={c.id} className="hc-group" style={{ '--c': c.color }}>
              <h3 className="hc-group__t">
                <Icon name={c.icon} size={16} /> {c.title}
              </h3>
              <ul className="hc-faqs">
                {(more.has(c.id) ? list : list.slice(0, 3)).map((f) => (
                  <Faq key={f.key} f={f} cat={c} open={open.has(f.key)} onToggle={() => toggle(f.key)} words={words} onAsk={ask} />
                ))}
              </ul>
              {list.length > 3 && !more.has(c.id) && (
                <button type="button" className="hc-moreq" onClick={() => setMore((m) => new Set(m).add(c.id))}>
                  Show all {list.length} {c.title.toLowerCase()} questions <Icon name="chevron" size={16} />
                </button>
              )}
            </div>
          ))
        ) : shownFaqs.length ? (
          <ul className="hc-faqs">
            {shownFaqs.map((f) => (
              <Faq key={f.key} f={f} cat={catById[f.cat]} open={open.has(f.key)} onToggle={() => toggle(f.key)} words={words} onAsk={ask} />
            ))}
          </ul>
        ) : (
          <p className="hc-none">No answers here yet.</p>
        )}
      </section>

      <Ask me={me} topics={topics} preset={preset} faqs={faqs} onFaq={openFaq} />

      <GuideModal guide={guide} cat={guide ? catById[guide.cat] : null} onClose={closeGuide} onAsk={() => ask('other')} />
    </div>
  );
}

export default HelpPage;
