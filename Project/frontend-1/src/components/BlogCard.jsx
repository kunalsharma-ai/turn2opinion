import { Link } from '../router/Router.jsx';
import Icon from './Icon.jsx';
import BlogScene from './BlogScenes.jsx';

const fmt = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatPostDate = fmt;

/** Illustrated cover per post: category scene on the post's gradient (no stock photos; replace with real images later if desired). */
export function BlogCover({ post, big = false }) {
  const h = post.hue;
  return (
    <div className={`blog-cover ${big ? 'is-big' : ''}`} style={{ '--h': h }} aria-hidden="true">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${post.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={`hsl(${h} 85% 58%)`} />
            <stop offset="1" stopColor={`hsl(${(h + 60) % 360} 80% 42%)`} />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#g-${post.slug})`} />
        <circle cx="330" cy="40" r="90" fill="#fff" opacity=".12" />
        <circle cx="60" cy="230" r="120" fill="#fff" opacity=".08" />
        <path d="M0 200 Q 100 160 200 196 T 400 186 V240 H0Z" fill="#0E1B4D" opacity=".2" />
        <BlogScene category={post.category} />
      </svg>
      <span className="blog-cover-icon">
        <Icon name={post.icon} size={big ? 22 : 16} />
      </span>
    </div>
  );
}

export default function BlogCard({ post, variant = 'card' }) {
  return (
    <article className={`blog-card bc-${variant}`} data-reveal>
      <Link to={`/blog/${post.slug}/`} className="blog-card-link">
        <BlogCover post={post} big={variant === 'feature'} />
        <div className="blog-card-body">
          <p className="blog-meta">
            <span className="blog-cat">{post.category}</span>
            {post.trending && (
              <span className="blog-trend">
                <Icon name="bolt" size={12} /> Trending
              </span>
            )}
          </p>
          <h3>{post.title}</h3>
          {variant !== 'mini' && <p className="blog-excerpt">{post.description}</p>}
          <p className="blog-date">
            <time dateTime={post.date}>{fmt(post.date)}</time>
            {post.readMins ? ` · ${post.readMins} min read` : ''}
          </p>
        </div>
      </Link>
    </article>
  );
}
