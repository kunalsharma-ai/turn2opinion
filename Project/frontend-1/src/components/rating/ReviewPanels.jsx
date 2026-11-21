// Rate & Reviews page, round 7 (Kunal, 18 Nov 2026): a new hero and the reviews split by panel.
//   Hero        a 3D carousel of real reviews circling the average gem, with a rotating headline.
//   Consumers   "The living room": bright ocean sky, reviews hung as polaroids on swaying washing lines.
//   Professionals "The boardroom": midnight amethyst with gold, a spotlight quote and executive passes,
//               grouped by sector (each sector has its own accent colour and icon).
// Everything comes from the same review list as the rest of the page; nothing is invented here.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import { Link } from '../../router/Router.jsx';
import Gem from './Gem.jsx';
import { countryName } from './VoiceCard.jsx';
import GemScore from './GemScore.jsx';
import { levelOf } from '../../data/reviewFacets.js';
import { useMounted } from '../../hooks/useMounted.js';

const isPro = (r) => r.audience === 'professional';
const isTeen = (r) => r.audience === 'teen';
const firstSentence = (t = '', max = 90) => {
  const m = t.match(/^.*?[.!?](\s|$)/);
  const s = (m ? m[0] : t).trim();
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
};
const roleOf = (r) => (r.role && r.role !== 'Member' ? r.role : 'Member');
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ratings are gems, never stars (Kunal, 18 Nov 2026).
function Stars({ n = 0, className = '' }) {
  return <GemScore rating={n} size={16} className={`rvx-stars ${className}`} />;
}

/** Counts up from 0 once it scrolls into view. Server and first render show the real number. */
function CountUp({ to, decimals = 0, suffix = '' }) {
  const [v, setV] = useState(to);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !('IntersectionObserver' in window) || !to) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1400);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setV(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <b ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </b>
  );
}

const WHO = ['students', 'homemakers', 'shoppers', 'marketers', 'engineers', 'accountants', 'founders', 'HR leaders', 'managers'];

function Rotor() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % WHO.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rvx-rotor notranslate" translate="no">
      <span key={i}>{WHO[i]}</span>
    </span>
  );
}

/* ================================ HERO ================================ */
export function ReviewsHero({ list, stats, countries, onRate }) {
  const top = levelOf(stats.avg || 4);
  const high = stats.count ? Math.round(((stats.dist[0] + stats.dist[1]) / stats.count) * 100) : 0;
  // Two rings of real reviews, the strongest first, mixing both panels.
  const picks = useMemo(() => {
    const good = list.filter((r) => r.rating >= 4 && r.text && !r.sample);
    const c = good.filter((r) => !isPro(r) && !isTeen(r) && !r.sample);
    const p = good.filter(isPro);
    const out = [];
    for (let k = 0; out.length < 16 && (k < c.length || k < p.length); k++) {
      if (c[k]) out.push(c[k]);
      if (p[k]) out.push(p[k]);
    }
    return out;
  }, [list]);
  // The two rings are decoration (aria-hidden) and the heaviest part of the page, so they are
  // drawn in the browser right after start-up rather than shipped in the prerendered HTML.
  const mounted = useMounted();
  const ringA = picks.filter((_, k) => k % 2 === 0).slice(0, 8);
  const ringB = picks.filter((_, k) => k % 2 === 1).slice(0, 8);
  return (
    <section className="rvx-hero" aria-labelledby="rv-title">
      <div className="rvx-sky" aria-hidden="true">
        <i className="rs-b b1" />
        <i className="rs-b b2" />
        <i className="rs-b b3" />
        {Array.from({ length: 8 }).map((_, k) => (
          <span key={k} className="rs-q" style={{ '--k': k }}>
            {k % 2 ? '”' : '“'}
          </span>
        ))}
        {Array.from({ length: 18 }).map((_, k) => (
          <i key={`s${k}`} className="rs-star" style={{ '--k': k }} />
        ))}
      </div>
      <div className="wrap rvx-grid">
        <div className="rvx-copy">
          <nav className="gvh-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <Icon name="chevronRight" size={12} /> <Link to="/about/">About</Link> <Icon name="chevronRight" size={12} />{' '}
            <span aria-current="page">Ratings &amp; reviews</span>
          </nav>
          <p className="rvx-kicker">
            <i className="rvx-live" /> Live from {stats.countries} countries
          </p>
          <h1 id="rv-title" className="rvx-title">
            <span className="l1">Real people.</span> <span className="l2">Real opinions.</span> <span className="l3">
              Rated in <em>gems</em>.
            </span>
          </h1>
          <p className="rvx-heard">
            Heard from <Rotor /> all over the world
          </p>
          <p className="rvx-lead">
            Every score here comes from a member: consumers, business professionals and, new this season, teens. Nothing is bought, and low scores stay up exactly as they were written.
          </p>
          <div className="rvx-actions">
            <button type="button" className="btn btn-primary btn-lg btn-shimmer rvx-rate" onClick={onRate}>
              <Gem level={5} size={20} motion="still" /> Rate your experience
            </button>
            <a href="#panel-consumer" className="rvx-jump is-c">
              <Icon name="bag" size={16} /> Consumer panel
            </a>
            <a href="#panel-pro" className="rvx-jump is-p">
              <Icon name="briefcase" size={16} /> Professional panel
            </a>
            <a href="#panel-teen" className="rvx-jump is-t">
              <Icon name="sparkles" size={16} /> Teen panel
            </a>
          </div>
          <ul className="rvx-stats">
            <li>
              <b className="rvx-gemstat">
                <Gem level={top.v} size={26} motion="float" /> {top.gem}
              </b>
              <small>average gem</small>
            </li>
            <li>
              <CountUp to={stats.count} />
              <small>scored reviews</small>
            </li>
            <li>
              <CountUp to={stats.countries} />
              <small>countries</small>
            </li>
            <li>
              <CountUp to={high} suffix="%" />
              <small>Sapphire or Diamond</small>
            </li>
          </ul>
        </div>

        <div className="rvx-stage" aria-hidden="true">
          <div className="rvx-3d">
            {mounted && (
            <div className="rvx-ring ra" style={{ '--n': ringA.length }}>
              {ringA.map((r, k) => (
                <figure key={r.id} className={`rvx-chip ${isPro(r) ? 'is-pro' : 'is-con'}`} style={{ '--i': k }}>
                  <figcaption>
                    <Flag code={r.country} size={16} /> <b>{r.name}</b>
                    <Stars n={r.rating} />
                  </figcaption>
                  <p>{firstSentence(r.text, 70)}</p>
                </figure>
              ))}
            </div>
            )}
            {mounted && (
            <div className="rvx-ring rb" style={{ '--n': ringB.length }}>
              {ringB.map((r, k) => (
                <figure key={r.id} className={`rvx-chip ${isPro(r) ? 'is-pro' : 'is-con'}`} style={{ '--i': k }}>
                  <figcaption>
                    <Flag code={r.country} size={16} /> <b>{r.name}</b>
                    <Stars n={r.rating} />
                  </figcaption>
                  <p>{firstSentence(r.text, 70)}</p>
                </figure>
              ))}
            </div>
            )}
            <div className="rvx-core">
              <span className="rvx-halo" />
              <Gem level={top.v} size={128} motion="spin" />
              <p>
                <b>{top.gem}</b>
                <small>{top.word} · average gem</small>
              </p>
            </div>
          </div>
          <span className="rvx-floor" />
        </div>
      </div>

      <div className="gvh-flags rvx-flags" aria-label="Countries our reviewers answered from">
        <div className="gvf-track">
          {[...countries, ...(mounted ? countries : [])].map(([c], i) => (
            <span key={`${c}-${i}`} className="gvf-flag" aria-hidden={i >= countries.length}>
              <Flag code={c} size={22} />
              <small>{countryName(c)}</small>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================ CONSUMER PANEL ================================ */
const CON_TINTS = [
  ['#22b8ff', '#1f5bff'],
  ['#ffb020', '#ff7a3d'],
  ['#12c29b', '#0e8a6b'],
  ['#ff5c8a', '#c2185b'],
  ['#7fe3ff', '#22b8ff'],
  ['#a78bfa', '#6d28d9'],
  ['#ffd166', '#f59e0b'],
  ['#34d399', '#059669']
];

// `compact` is the home page's Member voices version: one washing line of four that turns over to
// the next four on its own, and a lighter header (the section already has its own title).
export function ConsumerPanel({ list, stats, onReadAll, compact = false, readAllLabel }) {
  const items = useMemo(() => list.filter((r) => !isPro(r) && !isTeen(r) && r.text), [list]);
  const s = stats.byAudience.consumer;
  const L = levelOf(s.avg || 4);
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / 4));
  useEffect(() => {
    if (!compact || reduced() || pages < 2) return undefined;
    const t = setInterval(() => setPage((n) => (n + 1) % pages), 9000);
    return () => clearInterval(t);
  }, [compact, pages]);
  const rows = [];
  if (compact) rows.push(items.slice((page % pages) * 4, (page % pages) * 4 + 4));
  else for (let k = 0; k < items.length; k += 4) rows.push(items.slice(k, k + 4));
  const Tag = compact ? 'div' : 'section';
  return (
    <Tag id={compact ? undefined : 'panel-consumer'} className={`rvx-panel rvx-con ${compact ? 'is-compact' : ''}`} aria-labelledby={compact ? undefined : 'rv-con-h'}>
      <div className="rc-sky" aria-hidden="true">
        <i className="rc-sun" />
        <i className="rc-cloud c1" />
        <i className="rc-cloud c2" />
        <i className="rc-cloud c3" />
        {Array.from({ length: 6 }).map((_, k) => (
          <i key={k} className="rc-bubble" style={{ '--k': k }} />
        ))}
      </div>
      <div className="wrap">
        <header className="rvx-phead">
          <p className="rvx-pkicker">
            <Icon name="bag" size={15} /> Consumer panel
          </p>
          {compact ? (
            <p className="rvx-ptitle">
              Voices from the sofa, the bus <span>and the kitchen table</span>
            </p>
          ) : (
            <h2 id="rv-con-h">
              Voices from the sofa, the bus <span>and the kitchen table</span>
            </h2>
          )}
          {!compact && <p className="rvx-psub">Students, homemakers, shoppers and everyday members telling us how it really feels.</p>}
          <div className="rvx-pscore">
            <Gem level={L.v} size={58} motion="float" />
            <p>
              <b>{L.gem}</b>
              <span>
                {L.word} · {s.count} {s.count === 1 ? 'gem' : 'gems'} given
              </span>
            </p>
          </div>
        </header>

        <div className="rc-lines">
          {rows.map((row, ri) => (
            <ul key={compact ? `p${page}` : ri} className="rc-line" style={{ '--r': ri }}>
              {row.map((r, k) => {
                const [t1, t2] = CON_TINTS[(ri * 4 + k) % CON_TINTS.length];
                return (
                  <li key={r.id} style={{ '--k': k, '--t1': t1, '--t2': t2 }}>
                    <span className="rc-peg" aria-hidden="true" />
                    <figure className="rc-card">
                      <div className="rc-photo">
                        <span className="rc-flag">
                          <Flag code={r.country} size={34} />
                        </span>
                        <Stars n={r.rating} className="on-photo" />
                        <span className="rc-shine" aria-hidden="true" />
                      </div>
                      <blockquote>{r.text}</blockquote>
                      <figcaption>
                        <b>{r.name}</b>
                        <span>
                          {roleOf(r)} · {countryName(r.country)}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
        <p className="rvx-pmore">
          {compact && pages > 1 && (
            <span className="rc-pages" role="group" aria-label="More consumer reviews">
              {Array.from({ length: pages }).map((_, k) => (
                <button key={k} type="button" className={k === page % pages ? 'is-on' : ''} aria-label={`Show reviews ${k * 4 + 1} to ${Math.min(items.length, k * 4 + 4)}`} aria-pressed={k === page % pages} onClick={() => setPage(k)} />
              ))}
            </span>
          )}
          {onReadAll && (
            <button type="button" className="rvx-pbtn" onClick={onReadAll}>
              {readAllLabel || 'Read every consumer review'} <Icon name="arrow" size={16} />
            </button>
          )}
        </p>
      </div>
      <svg className="rc-waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 240 120 480 0 720 60 S 1200 120 1440 60 V120 H0Z" />
        <path d="M0 80 C 260 30 520 120 780 70 S 1240 40 1440 90 V120 H0Z" />
      </svg>
    </Tag>
  );
}

/* ================================ PROFESSIONAL PANEL ================================ */
const SECTORS = [
  { key: 'mkt', label: 'Marketing & product', icon: 'megaphone', c: '#ff5c8a', re: /market|product|merchand|commerce|brand|retail/i },
  { key: 'fin', label: 'Finance & business', icon: 'landmark', c: '#f5c451', re: /financ|account|bank|consult|procure|business owner|entrepreneur/i },
  { key: 'tech', label: 'Tech & engineering', icon: 'chip', c: '#22d3ee', re: /software|engineer|it |^it|developer|tech/i },
  { key: 'ops', label: 'Operations & industry', icon: 'truck', c: '#34d399', re: /operation|supply|manufactur|hotel|logist/i },
  { key: 'ppl', label: 'People, health & education', icon: 'users', c: '#b794ff', re: /hr |human|talent|health|school|educat|sustain|teacher/i }
];
const sectorOf = (r) => SECTORS.find((s) => s.re.test(` ${r.role || ''} `)) || SECTORS[1];

export function ProPanel({ list, stats, onReadAll, compact = false, readAllLabel }) {
  const items = useMemo(() => list.filter((r) => isPro(r) && r.text), [list]);
  const s = stats.byAudience.professional;
  const L = levelOf(s.avg || 4);
  const [sec, setSec] = useState('all');
  const [more, setMore] = useState(false);
  const shown = sec === 'all' ? items : items.filter((r) => sectorOf(r).key === sec);
  const [spot, setSpot] = useState(0);
  useEffect(() => {
    setSpot(0);
    setMore(false);
  }, [sec]);
  useEffect(() => {
    if (reduced() || shown.length < 2) return undefined;
    const t = setInterval(() => setSpot((n) => (n + 1) % shown.length), 7000);
    return () => clearInterval(t);
  }, [shown.length, sec]);
  const sp = shown[spot % Math.max(1, shown.length)];
  const spSec = sp ? sectorOf(sp) : SECTORS[0];
  const cap = compact ? 4 : 6;
  const grid = more ? shown : shown.slice(0, cap);
  const Tag = compact ? 'div' : 'section';
  return (
    <Tag id={compact ? undefined : 'panel-pro'} className={`rvx-panel rvx-pro ${compact ? 'is-compact' : ''}`} aria-labelledby={compact ? undefined : 'rv-pro-h'}>
      <div className="rp-bg" aria-hidden="true">
        <i className="rp-floor" />
        <i className="rp-glow g1" />
        <i className="rp-glow g2" />
        {Array.from({ length: 10 }).map((_, k) => (
          <i key={k} className="rp-dust" style={{ '--k': k }} />
        ))}
      </div>
      <div className="wrap">
        <header className="rvx-phead">
          <p className="rvx-pkicker">
            <Icon name="briefcase" size={15} /> Business professional panel
          </p>
          {compact ? (
            <p className="rvx-ptitle">
              Notes from the desk, <span>between meetings</span>
            </p>
          ) : (
            <h2 id="rv-pro-h">
            Notes from the desk, <span>between meetings</span>
          </h2>
          )}
          {!compact && <p className="rvx-psub">Managers, analysts, engineers and specialists on what our B2B studies are like, sector by sector.</p>}
          <div className="rvx-pscore">
            <Gem level={L.v} size={58} motion="spin" />
            <p>
              <b>{L.gem}</b>
              <span>
                {L.word} · {s.count} {s.count === 1 ? 'gem' : 'gems'} given
              </span>
            </p>
          </div>
        </header>

        <div className="rp-tabs" role="group" aria-label="Filter by sector">
          <button type="button" className={sec === 'all' ? 'is-on' : ''} aria-pressed={sec === 'all'} onClick={() => setSec('all')} style={{ '--sc': '#f5c451' }}>
            <Icon name="layers" size={15} /> All sectors <small>{items.length}</small>
          </button>
          {SECTORS.map((x) => {
            const n = items.filter((r) => sectorOf(r).key === x.key).length;
            if (!n) return null;
            return (
              <button key={x.key} type="button" className={sec === x.key ? 'is-on' : ''} aria-pressed={sec === x.key} onClick={() => setSec(x.key)} style={{ '--sc': x.c }}>
                <Icon name={x.icon} size={15} /> {x.label} <small>{n}</small>
              </button>
            );
          })}
        </div>

        <div className="rp-body">
          {sp && (
            <figure className="rp-spot" key={`${sec}-${sp.id}`} style={{ '--sc': spSec.c }}>
              <span className="rp-spot-beam" aria-hidden="true" />
              <span className="rp-q" aria-hidden="true">
                “
              </span>
              <p className="rp-sector">
                <Icon name={spSec.icon} size={14} /> {spSec.label}
              </p>
              <blockquote>{sp.text}</blockquote>
              <figcaption>
                <Flag code={sp.country} size={22} />
                <span>
                  <b>{sp.name}</b>
                  <small>
                    {roleOf(sp)} · {countryName(sp.country)}
                  </small>
                </span>
                <Stars n={sp.rating} className="gold" />
              </figcaption>
              {shown.length > 1 && (
                <span className="rp-timer" aria-hidden="true">
                  <i key={`${sec}-${spot}`} />
                </span>
              )}
            </figure>
          )}
          <ul className="rp-grid">
            {grid.map((r, k) => {
              const x = sectorOf(r);
              return (
                <li key={r.id} className="rp-pass" style={{ '--sc': x.c, '--k': k % 6 }}>
                  <span className="rp-clip" aria-hidden="true" />
                  <span className="rp-foil" aria-hidden="true" />
                  <p className="rp-role">
                    <span className="rp-ico">
                      <Icon name={x.icon} size={14} />
                    </span>
                    {roleOf(r)}
                  </p>
                  <blockquote>{firstSentence(r.text, 150)}</blockquote>
                  <p className="rp-who">
                    <Flag code={r.country} size={16} /> <b>{r.name}</b>
                    <Stars n={r.rating} className="gold" />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="rvx-pmore">
          {!compact && shown.length > cap && (
            <button type="button" className="rvx-pbtn is-ghost" onClick={() => setMore((m) => !m)}>
              {more ? 'Show fewer passes' : `Show all ${shown.length} passes`}
            </button>
          )}
          {onReadAll && (
            <button type="button" className="rvx-pbtn" onClick={onReadAll}>
              {readAllLabel || 'Read every professional review'} <Icon name="arrow" size={16} />
            </button>
          )}
        </p>
      </div>
    </Tag>
  );
}

/* ================================ TEEN PANEL ================================ */
// Round 10c (Kunal, 20 Nov 2026): "After hours", the neon teen grade. Reviews arrive as voice notes:
// each card has a live waveform, a flag avatar, the gem score, the quote, name, role, country and tags.
// The teen reviews are samples for now and say so on every card.
const TEEN_TINTS = ['#ff2e97', '#22e4ff', '#c8ff3a', '#8a5cff', '#ffb347'];

export function TeenPanel({ list, stats, onReadAll, compact = false, readAllLabel }) {
  const items = useMemo(() => list.filter((r) => isTeen(r) && r.text), [list]);
  const s = stats.byAudience.teen || { count: 0, avg: 0 };
  const L = levelOf(s.avg || 4);
  const [page, setPage] = useState(0);
  const per = compact ? 3 : items.length;
  const pages = Math.max(1, Math.ceil(items.length / (compact ? 3 : items.length || 1)));
  useEffect(() => {
    if (!compact || reduced() || pages < 2) return undefined;
    const t = setInterval(() => setPage((n) => (n + 1) % pages), 9000);
    return () => clearInterval(t);
  }, [compact, pages]);
  const shown = compact ? items.slice((page % pages) * per, (page % pages) * per + per) : items;
  const Tag = compact ? 'div' : 'section';
  return (
    <Tag id={compact ? undefined : 'panel-teen'} className={`rvx-panel rvx-teen ${compact ? 'is-compact' : ''}`} aria-labelledby={compact ? undefined : 'rv-teen-h'}>
      <div className="rt-night" aria-hidden="true">
        <i className="rt-glow g1" />
        <i className="rt-glow g2" />
        <span className="rt-floor" />
      </div>
      <div className="wrap">
        <header className="rvx-phead">
          <p className="rvx-pkicker">
            <Icon name="sparkles" size={15} /> Teen panel · 13–17
          </p>
          {compact ? (
            <p className="rvx-ptitle">
              Voice notes from <span>the next generation</span>
            </p>
          ) : (
            <h2 id="rv-teen-h">
              Voice notes from <span>the next generation</span>
            </h2>
          )}
          {!compact && <p className="rvx-psub">Gamers, creators, athletes and bookworms on the teen panel, every one with a parent’s permission.</p>}
          <div className="rvx-pscore">
            <Gem level={L.v} size={58} motion="float" />
            <p>
              <b>{L.gem}</b>
              <span>
                {L.word} · {s.count} {s.count === 1 ? 'gem' : 'gems'} given
              </span>
            </p>
          </div>
        </header>

        <ul className="rt-notes" key={compact ? `p${page}` : 'all'}>
          {shown.map((r, k) => (
            <li key={r.id} style={{ '--k': k, '--tc': TEEN_TINTS[(k + page) % TEEN_TINTS.length] }}>
              <figure className="rt-card">
                <div className="rt-top">
                  <span className="rt-avatar">
                    <Flag code={r.country} size={30} />
                  </span>
                  <span className="rt-wave" aria-hidden="true">
                    {Array.from({ length: 22 }).map((_, j) => (
                      <i key={j} style={{ '--j': j }} />
                    ))}
                  </span>
                  <Stars n={r.rating} className="rt-gem" />
                </div>
                <blockquote>{r.text}</blockquote>
                {r.tags && r.tags.length > 0 && (
                  <ul className="rt-tags">
                    {r.tags.slice(0, 3).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                <figcaption>
                  <b>{r.name}</b>
                  <span>
                    {roleOf(r)} · {countryName(r.country)}
                  </span>
                  {r.sample && <em className="rt-sample">Sample review</em>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="rvx-pmore">
          {compact && pages > 1 && (
            <span className="rc-pages" role="group" aria-label="More teen reviews">
              {Array.from({ length: pages }).map((_, k) => (
                <button key={k} type="button" className={k === page % pages ? 'is-on' : ''} aria-label={`Show reviews ${k * 3 + 1} to ${Math.min(items.length, k * 3 + 3)}`} aria-pressed={k === page % pages} onClick={() => setPage(k)} />
              ))}
            </span>
          )}
          {onReadAll && (
            <button type="button" className="rvx-pbtn" onClick={onReadAll}>
              {readAllLabel || 'Read every teen review'} <Icon name="arrow" size={16} />
            </button>
          )}
        </p>
      </div>
    </Tag>
  );
}
