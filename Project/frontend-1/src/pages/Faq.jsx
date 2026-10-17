// FAQ as a help desk: a search bar that suggests questions as it types, colourful topic tiles, and every answer
// on the back of a flip card. All questions and answers are in the HTML (and the FAQPage schema) for search engines.
import { useEffect, useMemo, useState } from 'react';
import { FAQ_GROUPS } from '../data/faqs.js';
import { useReveal, prefersReducedMotion } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { Breadcrumbs, CtaBand, FlipFaq } from '../components/Common.jsx';
import Icon from '../components/Icon.jsx';

const COLORS = { joining: '#1F5BFF', account: '#7B5CFF', surveys: '#FF5C7A', rewards: '#F08C00', privacy: '#0E9F6E' };
const IDEAS = ['How do I get paid?', 'Is it really free?', 'Why was I screened out?', 'Can I delete my account?', 'Is UPI available?'];

function useTypingPlaceholder() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const word = IDEAS[i];
    const t = setTimeout(
      () => {
        if (n < word.length) setN(n + 1);
        else {
          setN(0);
          setI((x) => (x + 1) % IDEAS.length);
        }
      },
      n < word.length ? 55 : 1600
    );
    return () => clearTimeout(t);
  }, [i, n]);
  return `Try “${IDEAS[i].slice(0, prefersReducedMotion() ? undefined : n)}”`;
}

export default function Faq() {
  const ref = useReveal();
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('all');
  const ph = useTypingPlaceholder();
  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    return FAQ_GROUPS.filter((g) => group === 'all' || g.id === group)
      .map((g) => ({ ...g, items: g.items.filter((it) => !s || (it.q + it.a).toLowerCase().includes(s)) }))
      .filter((g) => g.items.length);
  }, [q, group]);
  const found = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div ref={ref}>
      <section className="helpdesk">
        <div className="hd-bg" aria-hidden="true">
          {['?', '?', '!', '?', '✓', '?', '★'].map((c, i) => (
            <span key={i} style={{ '--i': i }}>
              {c}
            </span>
          ))}
        </div>
        <div className="wrap hd-grid">
          <div>
            <Breadcrumbs items={[{ label: 'FAQ' }]} />
            <p className="ph-kicker">Help desk · open 24/7</p>
            <h1 className="hd-title">Frequently Asked Questions About Turn2Opinion</h1>
            <p className="hd-lead">Joining, surveys, rewards, privacy and your account – {total} straight answers. Can’t find yours? Live help is a tap away.</p>
            <div className="hd-search">
              <Icon name="search" size={22} />
              <label htmlFor="faq-q" className="sr-only">
                Search questions
              </label>
              <input id="faq-q" type="search" placeholder={ph} value={q} onChange={(e) => setQ(e.target.value)} />
              <span className="hd-count" aria-live="polite">
                {found} {found === 1 ? 'answer' : 'answers'}
              </span>
            </div>
            <div className="hd-ideas">
              {IDEAS.slice(0, 4).map((t) => (
                <button key={t} type="button" onClick={() => setQ(t.replace(/\?$/, '').split(' ').slice(-2).join(' '))}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="hd-art" aria-hidden="true">
            <span className="hd-ring" />
            <span className="hd-peep">
              <img src={asset('/images/people/pro-pointing.svg')} alt="" width="220" height="260" />
            </span>
            <span className="hd-bulb">
              <Icon name="bolt" size={26} />
            </span>
            <span className="hd-bub b1">How do I get paid?</span>
            <span className="hd-bub b2">Is it free?</span>
            <span className="hd-bub b3">Why screened out?</span>
          </div>
        </div>
      </section>

      <section className="section s-paper faq2">
        <div className="wrap">
          <div className="faq-tiles" role="group" aria-label="FAQ topics">
            <button type="button" className={group === 'all' ? 'is-on' : ''} onClick={() => setGroup('all')} style={{ '--c': '#0E1B4D' }}>
              <span className="ft-ico">
                <Icon name="layers" size={22} />
              </span>
              <strong>All topics</strong>
              <small>{total} questions</small>
            </button>
            {FAQ_GROUPS.map((g, i) => (
              <button key={g.id} type="button" className={group === g.id ? 'is-on' : ''} onClick={() => setGroup(g.id)} style={{ '--c': COLORS[g.id] || '#1F5BFF', '--i': i }}>
                <span className="ft-ico">
                  <Icon name={g.icon} size={22} />
                </span>
                <strong>{g.title}</strong>
                <small>{g.items.length} questions</small>
              </button>
            ))}
          </div>

          {groups.map((g) => (
            <section key={g.id} className="faq-sec" aria-labelledby={`fg-${g.id}`} style={{ '--c': COLORS[g.id] || '#1F5BFF' }}>
              <h2 id={`fg-${g.id}`}>
                <span className="ft-ico">
                  <Icon name={g.icon} size={20} />
                </span>
                {g.title}
              </h2>
              <FlipFaq items={g.items} colors={g.items.map(() => COLORS[g.id] || '#1F5BFF')} />
            </section>
          ))}
          {!groups.length && (
            <div className="empty">
              <p>No answers match “{q}”.</p>
              <button type="button" className="btn btn-primary" onClick={() => window.dispatchEvent(new Event('t2o:open-chat'))}>
                Ask live help
              </button>
            </div>
          )}
          <div className="faq-help">
            <span className="fh-ico" aria-hidden="true">
              <Icon name="headset" size={28} />
            </span>
            <div>
              <strong>Still stuck?</strong>
              <p>Live help answers in seconds, any time of day.</p>
            </div>
            <button type="button" className="btn btn-gold" onClick={() => window.dispatchEvent(new Event('t2o:open-chat'))}>
              Ask live help
            </button>
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
