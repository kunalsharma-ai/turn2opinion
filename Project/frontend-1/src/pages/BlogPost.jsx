import { useEffect, useState } from 'react';
import { BLOG_POSTS, getPostMeta } from '../data/blog/index.js';
import Markdown, { headingsOf, wordCount } from '../components/Markdown.jsx';
import { Accordion, Breadcrumbs, CtaBand } from '../components/Common.jsx';
import BlogCard, { BlogCover, formatPostDate } from '../components/BlogCard.jsx';
import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { ENV } from '../config/env.js';
import Icon from '../components/Icon.jsx';

function ReadingBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = document.querySelector('.post-body');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className="read-ring" aria-hidden="true" style={{ '--p': p }}>
      <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" />
        <circle cx="18" cy="18" r="16" className="read-ring-fg" />
      </svg>
      <span>{Math.round(p * 100)}%</span>
    </div>
  );
}

// In-page jumps that work in both history and hash router modes.
const jump = (id) => (e) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function BlogPost({ params, data }) {
  const ref = useReveal();
  const post = getPostMeta(params.slug);
  const body = (data && data.body) || '';
  const toc = headingsOf(body);
  const mins = Math.max(1, Math.round(wordCount(body) / 220));
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.keywords.some((k) => post.keywords.includes(k)))).slice(0, 3);
  const url = `${ENV.SITE_URL}/blog/${post.slug}/`;
  const share = [
    ['linkedin', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ['facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
    ['whatsapp', `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + url)}`]
  ];

  return (
    <div ref={ref}>
      <header className="post-hero" style={{ '--h': post.hue }}>
        <div className="wrap post-hero-grid">
          <div>
            <Breadcrumbs items={[{ label: 'Blogs', to: '/blog/' }, { label: post.title }]} />
            <p className="blog-meta">
              <span className="blog-cat">{post.category}</span>
              {post.trending && (
                <span className="blog-trend">
                  <Icon name="bolt" size={12} /> Trending
                </span>
              )}
            </p>
            <h1>{post.title}</h1>
            <p className="post-lead">{post.description}</p>
            <p className="post-byline">
              <span className="post-avatar">
                <Icon name="pen" size={14} />
              </span>
              Turn2Opinion Editorial Team · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {mins} min read
            </p>
          </div>
          <BlogCover post={post} big />
        </div>
      </header>

      <div className="wrap post-layout">
        <aside className="post-aside">
          <div className="toc">
            <p className="toc-title">On this page</p>
            <ol>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} onClick={jump(h.id)}>
                    {h.text}
                  </a>
                </li>
              ))}
              {data && data.faqs && data.faqs.length > 0 && (
                <li>
                  <a href="#faqs" onClick={jump('faqs')}>
                    FAQs
                  </a>
                </li>
              )}
            </ol>
            <ReadingBar />
          </div>
          <div className="post-share">
            <p>Share</p>
            {share.map(([n, u]) => (
              <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${n}`}>
                <Icon name={n} size={18} />
              </a>
            ))}
          </div>
        </aside>

        <article className="post-body">
          <Markdown source={body} />
          {data && data.faqs && data.faqs.length > 0 && (
            <section className="post-faqs" aria-labelledby="faqs">
              <h2 id="faqs">Frequently asked questions</h2>
              <Accordion items={data.faqs} idPrefix="post-faq" />
            </section>
          )}
          <div className="post-tags">
            {post.keywords.map((k) => (
              <span key={k} className="chip-tag">
                #{k}
              </span>
            ))}
          </div>
          <div className="post-cta">
            <div>
              <strong>Start earning with your opinion</strong>
              <p>Free to join, no investment, rewards via PayPal, wire transfer, gift cards – or UPI in India.</p>
            </div>
            <Link to="/join/" className="btn btn-primary">
              Join Turn2Opinion free
            </Link>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <section className="section s-mist" aria-labelledby="rel-title">
          <div className="wrap">
            <h2 id="rel-title" className="trend-h">
              Keep reading
            </h2>
            <div className="blog-grid">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </div>
  );
}
