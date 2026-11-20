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
//   (The filterable "wall" of postcards and passes was removed on Kunal's request, 20 Nov 2026.)
import { useEffect, useMemo, useState } from 'react';
import { fetchApprovedReviews, getMyReviews, onReview, seedTestimonials, summarise } from '../utils/reviews.js';
import { LEVELS, levelOf } from '../data/reviewFacets.js';
import { useReveal } from '../hooks/useMounted.js';
import Icon from '../components/Icon.jsx';
import { SectionHead } from '../components/Common.jsx';
import Gem from '../components/rating/Gem.jsx';
import FacetDials from '../components/rating/FacetDials.jsx';
import { countryName } from '../components/rating/VoiceCard.jsx';
import { ConsumerPanel, ProPanel, TeenPanel, ReviewsHero } from '../components/rating/ReviewPanels.jsx';

const openStudio = (rating) => window.dispatchEvent(new CustomEvent('t2o:open-review', { detail: rating ? { rating } : {} }));

export default function Reviews() {
  const ref = useReveal();
  const [list, setList] = useState(() => seedTestimonials());

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

  const top = levelOf(stats.avg || 4);
  return (
    <div className="gv-page" ref={ref} style={{ '--g1': top.c1, '--g2': top.c2, '--g3': top.c3 }}>
      {/* ======================= 1. HERO (round 7): 3D review carousel ======================= */}
      <ReviewsHero list={list} stats={stats} countries={countries} onRate={() => openStudio()} />

      {/* ======================= 2. THE TWO PANELS, each in its own world ======================= */}
      <ConsumerPanel list={list} stats={stats} />
      <ProPanel list={list} stats={stats} />
      <TeenPanel list={list} stats={stats} />

      {/* ======================= 2. THE SCALE ======================= */}
      <section className="section s-paper gv-scale" aria-labelledby="rv-scale">
        <div className="wrap">
          <SectionHead id="rv-scale" kicker="How to read a score" title="From a pebble to a diamond" lead="Five gems, five levels. Every score on the site shows the gem, the number and the word together, so there is nothing to decode." align="center" />
          <ol className="gsc-row" data-reveal>
            {LEVELS.map((L, i) => (
              <li key={L.key} style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--glow': L.glow, '--i': i }}>
                <button type="button" onClick={() => openStudio(L.v)} aria-label={`Rate us ${L.gem}, ${L.word}`}>
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

    </div>
  );
}
