import { Link } from '../router/Router.jsx';
import Icon from './Icon.jsx';
import BlogArt from './BlogArt.jsx';

const fmt = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatPostDate = fmt;

/** Cover per post: coded, animated, text-free art (see BlogArt.jsx). Unique per post, graded by its hue. */
export function BlogCover({ post, big = false }) {
  return (
    <div className={`blog-cover ${big ? 'is-big' : ''}`} aria-hidden="true">
      <BlogArt seed={post.slug} hue={post.hue} kind={post.category} />
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
