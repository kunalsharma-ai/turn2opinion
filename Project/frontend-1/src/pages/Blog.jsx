import { useMemo, useState } from 'react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blog/index.js';
import { useReveal } from '../hooks/useMounted.js';
import { CtaBand, PageHero } from '../components/Common.jsx';
import BlogCard from '../components/BlogCard.jsx';
import BlogScene from '../components/BlogScenes.jsx';
import Icon from '../components/Icon.jsx';

const STACK = [
  ['Paid surveys', 250],
  ['Rewards & payouts', 30],
  ['Work from home', 160],
  ['Professionals', 200]
];

/** Hero: a 3D fan of illustrated magazine covers that shuffles continuously. */
function HeroArt() {
  return (
    <div className="mag-stack" aria-hidden="true">
      {STACK.map(([cat, h], i) => (
        <div key={cat} className="mag" style={{ '--i': i, '--h': h }}>
          <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="240" fill={`hsl(${h} 80% 52%)`} />
            <circle cx="340" cy="30" r="90" fill="#fff" opacity=".14" />
            <BlogScene category={cat} />
          </svg>
          <span className="mag-tag">{cat}</span>
        </div>
      ))}
      <span className="mag-pen">
        <Icon name="pen" size={22} />
      </span>
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
        title="Earn money online – the honest way"
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
                    <svg viewBox="40 20 320 200" preserveAspectRatio="xMidYMid slice">
                      <BlogScene category={c} />
                    </svg>
                  )}
                </span>
                <span className="topic-name">{c}</span>
              </button>
            ))}
          </div>
          <div className="blog-grid">
            {list.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          {!list.length && <p className="empty">No blogs match “{q}”. Try “surveys”, “UPI” or “work from home”.</p>}
        </div>
      </section>
      <CtaBand title="Ready to put the tips into practice?" />
    </div>
  );
}
