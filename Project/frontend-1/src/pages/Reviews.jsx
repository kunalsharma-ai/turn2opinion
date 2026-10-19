// /about/reviews/ — "Our Ratings & Reviews" (v3.2 rebuild around the Opinion Gems language).
//
// Everything on this page is built from the same review records the testimonial section uses, so
// the numbers can never drift apart: published testimonials (src/data/testimonials.js), anything
// the reviews API has approved, and the visitor's own submissions, merged and summarised live.
//
// Five movements, each with its own colour grade:
//   1. THE VAULT     midnight: the average as a turning gem, the distribution as gem shelves,
//                    the reach as a field of flags.
//   2. THE SCALE     paper: what each gem means — pebble to diamond, number and word.
//   3. TWO WORLDS    split sunset / midnight: consumers and professionals scored apart.
//   4. THE DETAILS   mist: the four facets, each in its own moving metaphor.
//   5. THE WALL      every review in full as postcards and passes, filterable.
import { useEffect, useMemo, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials, summarise } from '../utils/reviews.js';
import { AUDIENCES, LEVELS, levelOf } from '../data/reviewFacets.js';
import { useReveal } from '../hooks/useMounted.js';
import { Flag } from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router/Router.jsx';
import { SectionHead } from '../components/Common.jsx';
import Gem from '../components/rating/Gem.jsx';
import FacetDials from '../components/rating/FacetDials.jsx';
import VoiceCard, { countryName } from '../components/rating/VoiceCard.jsx';

const openStudio = (rating) => window.dispatchEvent(new CustomEvent('t2o:open-review', { detail: rating ? { rating } : {} }));
const PAGE = 12;

export default function Reviews() {
  const ref = useReveal();
  const [list, setList] = useState(() => seedTestimonials());
  const [aud, setAud] = useState('all');
  const [minScore, setMinScore] = useState(0);
  const [country, setCountry] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [freshId, setFreshId] = useState(null);

  useEffect(() => {
    const merge = (incoming) =>
      setList((l) => {
        const ids = new Set(l.map((x) => x.id));
        const add = incoming.filter((x) => !ids.has(x.id));
        return add.length ? [...add, ...l] : l;
      });
    merge(getMyReviews());
    let alive = true;
    const poll = () =>
      fetchApprovedReviews()
        .then((r) => alive && r.length && merge(r))
        .catch(() => {});
    poll();
    const iv = setInterval(poll, 30000);
    const off = onReview((r) => {
      merge([r]);
      setFreshId(r.id);
    });
    return () => {
      alive = false;
      clearInterval(iv);
      off();
    };
  }, []);

  const stats = useMemo(() => summarise(list), [list]);

  const countries = useMemo(() => {
    const counts = new Map();
    list.forEach((r) => r.country && counts.set(r.country, (counts.get(r.country) || 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || countryName(a[0]).localeCompare(countryName(b[0])));
  }, [list]);

  const filtered = useMemo(
    () =>
      list.filter((r) => {
        if (aud !== 'all' && (r.audience || 'consumer') !== aud) return false;
        if (minScore && r.rating < minScore) return false;
        if (country && r.country !== country) return false;
        return true;
      }),
    [list, aud, minScore, country]
  );

  useEffect(() => setLimit(PAGE), [aud, minScore, country]);

  const maxBar = Math.max(1, ...stats.dist);
  const top = levelOf(stats.avg || 4);
  const high = stats.count ? Math.round(((stats.dist[0] + stats.dist[1]) / stats.count) * 100) : 0;

  return (
    <div className="gv-page" ref={ref} style={{ '--g1': top.c1, '--g2': top.c2, '--g3': top.c3 }}>
      {/* ======================= 1. THE VAULT ======================= */}
      <section className="gv-hero" aria-labelledby="rv-title">
        <span className="gvh-sky" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="gvh-grid" aria-hidden="true" />
        <div className="wrap gvh-wrap">
          <div className="gvh-copy" data-reveal>
            <nav className="gvh-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <Icon name="chevronRight" size={12} /> <Link to="/about/">About</Link> <Icon name="chevronRight" size={12} /> <span aria-current="page">Ratings &amp; reviews</span>
            </nav>
            <p className="gvh-kicker">
              <Gem level={5} size={20} motion="float" /> Our ratings &amp; reviews
            </p>
            <h1 id="rv-title">
              Every opinion is a gem. <span>Here is what members gave us.</span>
            </h1>
            <p className="gvh-lead">
              Real scores from consumers and business professionals, with the country each one came from. Nothing is bought, nothing is averaged out of thin air, and low
              scores stay up exactly as they were written.
            </p>
            <div className="gvh-actions">
              <button type="button" className="btn btn-primary btn-shimmer" onClick={() => openStudio()}>
                Rate your experience <Icon name="arrow" size={18} />
              </button>
              <a href="#rv-wall" className="btn btn-glass">
                Read every review
              </a>
            </div>
          </div>

          <div className="gvh-vault" data-reveal>
            <div className="gvv-core">
              <span className="gvv-ring" aria-hidden="true" />
              <span className="gvv-ring r2" aria-hidden="true" />
              <Gem level={top.v} size={150} motion="spin" title={`Average ${stats.avg ? stats.avg.toFixed(1) : 'not yet'} out of 5 — ${top.word}`} />
              <p className="gvv-avg">
                <b>{stats.avg ? stats.avg.toFixed(1) : '—'}</b>
                <small>/ 5 average</small>
              </p>
              <p className="gvv-word">
                {top.word} · {top.gem}
              </p>
            </div>

            <ul className="gvv-shelves" aria-label="How the scores are distributed">
              {stats.dist.map((c, i) => {
                const L = LEVELS[4 - i];
                return (
                  <li key={L.key} style={{ '--w': `${(c / maxBar) * 100}%`, '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--i': i }}>
                    <Gem level={L.v} size={26} motion="still" />
                    <span className="gvs-label">
                      {L.v} · {L.word}
                    </span>
                    <span className="gvs-bar" aria-hidden="true">
                      <i />
                    </span>
                    <b>{c}</b>
                  </li>
                );
              })}
            </ul>

            <ul className="gvv-stats">
              <li>
                <b>{stats.count}</b>
                <small>scored reviews</small>
              </li>
              <li>
                <b>{stats.countries}</b>
                <small>countries</small>
              </li>
              <li>
                <b>{high}%</b>
                <small>gave Sapphire or Diamond</small>
              </li>
            </ul>
          </div>
        </div>

        <div className="gvh-flags" aria-label="Countries our reviewers answered from">
          <div className="gvf-track">
            {[...countries, ...countries].map(([c], i) => (
              <span key={`${c}-${i}`} className="gvf-flag" aria-hidden={i >= countries.length}>
                <Flag code={c} size={22} />
                <small>{countryName(c)}</small>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= 2. THE SCALE ======================= */}
      <section className="section s-paper gv-scale" aria-labelledby="rv-scale">
        <div className="wrap">
          <SectionHead id="rv-scale" kicker="How to read a score" title="From a pebble to a diamond" lead="Five gems, five levels. Every score on the site shows the gem, the number and the word together, so there is nothing to decode." align="center" />
          <ol className="gsc-row" data-reveal>
            {LEVELS.map((L, i) => (
              <li key={L.key} style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--glow': L.glow, '--i': i }}>
                <button type="button" onClick={() => openStudio(L.v)} aria-label={`Rate us ${L.v} out of 5 — ${L.word}`}>
                  <span className="gsc-plinth" aria-hidden="true" />
                  <Gem level={L.v} size={74} motion="float" />
                  <b className="gsc-n">{L.v}</b>
                  <strong>{L.word}</strong>
                  <small>{L.gem}</small>
                  <span className="gsc-note">“{L.note}”</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================= 3. TWO WORLDS ======================= */}
      <section className="gv-worlds" aria-labelledby="rv-two">
        <h2 id="rv-two" className="sr-only">
          Consumers and professionals, scored apart
        </h2>
        {Object.values(AUDIENCES).map((a) => {
          const s = stats.byAudience[a.key];
          const L = levelOf(s.avg || 4);
          const sample = list.find((r) => (r.audience || 'consumer') === a.key && r.rating >= 4);
          return (
            <article key={a.key} className={`gw-side gw-${a.key}`} style={{ '--a1': a.c1, '--a2': a.c2, '--a3': a.c3, '--g1': L.c1, '--g2': L.c2, '--g3': L.c3 }} data-reveal>
              <span className="gw-bg" aria-hidden="true">
                <i />
                <i />
              </span>
              <div className="gw-copy">
                <p className="gw-kicker">
                  <Icon name={a.icon} size={15} /> {a.plural}
                </p>
                <h3>{a.key === 'consumer' ? 'Answering from the sofa, the bus and the kitchen table' : 'Answering from the desk, between meetings'}</h3>
                <p className="gw-sub">{a.sub}</p>
                <div className="gw-score">
                  <Gem level={L.v} size={64} motion="spin" />
                  <p>
                    <b>{s.avg ? s.avg.toFixed(1) : '—'}</b>
                    <span>
                      {L.word} · from {s.count} scored {s.count === 1 ? 'review' : 'reviews'}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="gw-go"
                  onClick={() => {
                    setAud(a.key);
                    document.getElementById('rv-wall')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Read {a.plural.toLowerCase()} <Icon name="arrow" size={15} />
                </button>
              </div>
              {sample && (
                <div className="gw-sample" aria-hidden="true">
                  <VoiceCard r={sample} size="sm" clamp={150} />
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* ======================= 4. THE DETAILS ======================= */}
      <section className="section s-mist" aria-labelledby="rv-parts">
        <div className="wrap">
          <SectionHead
            id="rv-parts"
            kicker="Broken down"
            title="Four things members score on their own"
            lead="An overall number hides too much. These are scored separately, so a weak spot cannot hide behind a strong one."
            align="center"
          />
          <div data-reveal>
            <FacetDials values={stats.facets} readOnly idPrefix="rv-f" />
          </div>
          <p className="gv-note" data-reveal>
            <Icon name="signal" size={15} /> Facet scores come from reviews posted through the rating studio. Older reviews on record carry an overall score only, so these averages grow
            as more members take part.
          </p>
        </div>
      </section>

      {/* ======================= 5. THE WALL ======================= */}
      <section className="section s-paper gv-wall" aria-labelledby="rv-wall-h" id="rv-wall">
        <div className="wrap">
          <SectionHead id="rv-wall-h" kicker="Every voice" title="The wall — postcards and passes" lead="Consumers send postcards, professionals carry passes. Filter by who they are, how they scored us, or where they answered from." />

          <div className="gwl-filters" data-reveal>
            <div className="gwf-group" role="group" aria-label="Audience">
              {[
                ['all', 'Everyone', 'users'],
                ['consumer', 'Consumers', 'bag'],
                ['professional', 'Professionals', 'briefcase']
              ].map(([k, l, ic]) => (
                <button key={k} type="button" className={`gf-${k} ${aud === k ? 'is-on' : ''}`} aria-pressed={aud === k} onClick={() => setAud(k)}>
                  <Icon name={ic} size={14} /> {l}
                </button>
              ))}
            </div>

            <div className="gwf-group gwf-gems" role="group" aria-label="Minimum score">
              <button type="button" className={minScore === 0 ? 'is-on' : ''} aria-pressed={minScore === 0} onClick={() => setMinScore(0)}>
                Any gem
              </button>
              {[3, 4, 5].map((s) => {
                const L = levelOf(s);
                return (
                  <button key={s} type="button" className={minScore === s ? 'is-on' : ''} aria-pressed={minScore === s} onClick={() => setMinScore(s)} aria-label={`${s} or more — ${L.word} and up`}>
                    <Gem level={s} size={18} motion="still" /> {L.word}+
                  </button>
                );
              })}
            </div>

            <label className="gwf-country">
              <span className="sr-only">Filter by country</span>
              {country ? <Flag code={country} size={18} /> : <Icon name="globe" size={15} />}
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">All countries ({countries.length})</option>
                {countries.map(([c, n]) => (
                  <option key={c} value={c}>
                    {countryName(c)} ({n})
                  </option>
                ))}
              </select>
            </label>

            <p className="gwf-count" aria-live="polite">
              <strong>{filtered.length}</strong> {filtered.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {filtered.length ? (
            <>
              <div className="gwl-grid">
                {filtered.slice(0, limit).map((r, i) => (
                  <div key={r.id} className="gwl-cell" style={{ '--i': i % 12 }}>
                    <VoiceCard r={r} size="md" fresh={r.id === freshId} />
                  </div>
                ))}
              </div>
              {filtered.length > limit && (
                <p className="gwl-more">
                  <button type="button" className="btn btn-ink" onClick={() => setLimit((l) => l + PAGE)}>
                    Show more reviews ({filtered.length - limit} left)
                  </button>
                </p>
              )}
            </>
          ) : (
            <p className="gwl-empty" data-reveal>
              No reviews match that combination yet.{' '}
              <button
                type="button"
                className="link-arrow"
                onClick={() => {
                  setAud('all');
                  setMinScore(0);
                  setCountry('');
                }}
              >
                Clear the filters
              </button>
            </p>
          )}

          <div className="gwl-cta" data-reveal>
            <span className="gwc-gems" aria-hidden="true">
              {LEVELS.map((L) => (
                <Gem key={L.key} level={L.v} size={36} motion="float" />
              ))}
            </span>
            <div>
              <h2>Your turn — which gem do we deserve?</h2>
              <p>Two minutes, one gem, four quick details and whatever you want to say. It lands on this wall as soon as you post it.</p>
            </div>
            <button type="button" className="btn btn-primary btn-shimmer" onClick={() => openStudio()}>
              Write a review <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
