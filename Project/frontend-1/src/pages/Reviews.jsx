// /about/reviews/ — "Our Ratings & Reviews" (v3.2 rebuild around the Opinion Gems language).
//
// Everything on this page is built from the same review records the testimonial section uses, so
// the numbers can never drift apart: published testimonials (src/data/testimonials.js), anything
// the reviews API has approved, and the visitor's own submissions, merged and summarised live.
//
// Round 7 layout (Kunal, 18 Nov 2026):
//   1. HERO          a 3D carousel of real reviews around the average gem, rotating headline, count-ups.
//   2. CONSUMERS     "the living room": ocean sky, reviews as polaroids on swaying washing lines.
//   3. PROFESSIONALS "the boardroom": amethyst and gold, spotlight quote + executive passes by sector.
//   4. THE SCALE     paper: what each gem means — pebble to diamond, number and word.
//   5. THE DETAILS   mist: the four facets, each in its own moving metaphor.
//   6. THE WALL      every review in full as postcards and passes, filterable.
import { useEffect, useMemo, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials, summarise } from '../utils/reviews.js';
import { LEVELS, levelOf } from '../data/reviewFacets.js';
import { useReveal } from '../hooks/useMounted.js';
import { Flag } from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router/Router.jsx';
import { SectionHead } from '../components/Common.jsx';
import Gem from '../components/rating/Gem.jsx';
import FacetDials from '../components/rating/FacetDials.jsx';
import VoiceCard, { countryName } from '../components/rating/VoiceCard.jsx';
import { ConsumerPanel, ProPanel, ReviewsHero } from '../components/rating/ReviewPanels.jsx';

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

  const top = levelOf(stats.avg || 4);
  const readAll = (k) => {
    setAud(k);
    document.getElementById('rv-wall')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="gv-page" ref={ref} style={{ '--g1': top.c1, '--g2': top.c2, '--g3': top.c3 }}>
      {/* ======================= 1. HERO (round 7): 3D review carousel ======================= */}
      <ReviewsHero list={list} stats={stats} countries={countries} onRate={() => openStudio()} />

      {/* ======================= 2. THE TWO PANELS, each in its own world ======================= */}
      <ConsumerPanel list={list} stats={stats} onReadAll={() => readAll('consumer')} />
      <ProPanel list={list} stats={stats} onReadAll={() => readAll('professional')} />

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
