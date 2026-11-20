import { useMemo, useState } from 'react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blog/index.js';
import { useReveal } from '../hooks/useMounted.js';
import { CtaBand, PageHero } from '../components/Common.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { LazyBlogArt as BlogArt } from '../components/BlogArt.jsx';
import Icon from '../components/Icon.jsx';

// Hero, round 8: a 3D carousel of live covers turning in space over a glowing floor, with sparks
// rising around it. Each panel is one of the six cover worlds, so the hero previews the blog itself.
const RING = [
  ['Earn online', 220, 'hero-orbit'],
  ['Paid surveys', 262, 'hero-chorus'],
  ['Work from home', 18, 'hero-dusk'],
  ['Professionals', 280, 'hero-skyline'],
  ['Rewards & payouts', 330, 'hero-nebula'],
  ['Safety & privacy', 170, 'hero-vault']
];

function HeroArt() {
  return (
    <div className="bh-stage" aria-hidden="true">
      <span className="bh-floor" />
      <span className="bh-orb o1" />
      <span className="bh-orb o2" />
      <div className="bh-ring" style={{ '--n': RING.length }}>
        {RING.map(([kind, hue, seed], i) => (
          <div key={seed} className="bh-panel" style={{ '--i': i }}>
            <BlogArt seed={seed} hue={hue} kind={kind} stars={false} />
          </div>
        ))}
      </div>
      {Array.from({ length: 12 }).map((_, k) => (
        <i key={k} className="bh-spark" style={{ '--k': k }} />
      ))}
    </div>
  );
}

export default function Blog() {
  const ref = useReveal();
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const sorted = useMemo(() => [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const trending = sorted.filter((p) => p.trending);
  const list = sorted.filter(
    (p) => (cat === 'All' || p.category === cat) && (!q || (p.title + ' ' + p.description + ' ' + p.keywords.join(' ')).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div ref={ref}>
      <PageHero
        theme="paper"
        tone="light"
        crumbs={[{ label: 'Blogs' }]}
        kicker="The Turn2Opinion blog"
        title={
          <>
            Earn money online <span className="bh-grad">the honest way</span>
          </>
        }
        tagline="Smarter ways to earn, minus the hype."
        lead="Guides on paid surveys, online earning without investment, work from home and getting your rewards paid. No hype, no get-rich-quick promises."
        art={<HeroArt />}
      />

      <section className="section s-paper blog-trending" aria-labelledby="trend-title">
        <div className="wrap">
          <h2 id="trend-title" className="trend-h">
            <Icon name="bolt" size={22} /> Trending now
          </h2>
          <div className="blog-mag">
            {trending.slice(0, 5).map((p, i) => (
              <BlogCard key={p.slug} post={p} variant={i === 0 ? 'feature' : 'mini'} />
            ))}
          </div>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="all-title">
        <div className="wrap">
          <div className="blog-toolbar">
            <h2 id="all-title">All blogs</h2>
            <div className="blog-search">
              <Icon name="search" size={18} />
              <label htmlFor="blog-q" className="sr-only">
                Search blogs
              </label>
              <input id="blog-q" type="search" placeholder="Search blogs" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
          <div className="topic-tiles" role="group" aria-label="Filter by category">
            {['All', ...BLOG_CATEGORIES].map((c, i) => (
              <button key={c} type="button" className={`topic-tile ${cat === c ? 'is-on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)} style={{ '--i': i }}>
                <span className="topic-art" aria-hidden="true">
                  {c === 'All' ? (
                    <Icon name="layers" size={22} />
                  ) : (
                    <BlogArt seed={`tile-${c}`} hue={[220, 262, 18, 280, 330, 170, 320, 190][i - 1] || 220} kind={c} stars={false} />
                  )}
                </span>
                <span className="topic-name">{c}</span>
              </button>
            ))}
          </div>
          <div className="blog-grid bg5">
            {list.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          {!list.length && <p className="empty">No blogs match “{q}”. Try “surveys”, “UPI” or “work from home”.</p>}
        </div>
      </section>
      <CtaBand title="Ready to put the tips into practice?" variant="paper" />
    </div>
  );
}
