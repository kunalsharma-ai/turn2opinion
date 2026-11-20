// Home blog teaser, Round 12 redesign: "the newsstand".
// The lead story fills a tall card with its cover and a glass caption panel; the next stories sit in
// a numbered running order beside it, each with a round cover thumbnail that turns on hover. The
// old layout let a decorative blob sit over the cards at some widths; this one has no free-floating
// decoration, only a soft backdrop clipped to the stand itself.
import { Link } from '../../router/Router.jsx';
import Icon from '../Icon.jsx';
import { LazyBlogArt as BlogArt } from '../BlogArt.jsx';
import { formatPostDate } from '../BlogCard.jsx';
import { useInView } from '../../hooks/useMounted.js';

export default function BlogStand({ posts = [] }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <div className={`bstand ${inView ? 'is-in' : ''}`} ref={ref}>
      <article className="bstand-lead">
        <Link to={`/blog/${lead.slug}/`} className="bstand-lead-link">
          <span className="bstand-cover" aria-hidden="true">
            <BlogArt seed={lead.slug} hue={lead.hue} kind={lead.category} />
          </span>
          <span className="bstand-badge" aria-hidden="true">
            <Icon name="bolt" size={14} /> Lead story
          </span>
          <span className="bstand-cap">
            <span className="bstand-cat">{lead.category}</span>
            <h3>{lead.title}</h3>
            <span className="bstand-ex">{lead.description}</span>
            <span className="bstand-meta">
              <time dateTime={lead.date}>{formatPostDate(lead.date)}</time>
              {lead.readMins ? ` · ${lead.readMins} min read` : ''}
              <span className="bstand-go" aria-hidden="true">
                Read <Icon name="arrow" size={14} />
              </span>
            </span>
          </span>
        </Link>
      </article>
      <ol className="bstand-list">
        {rest.map((p, i) => (
          <li key={p.slug} style={{ '--i': i }}>
            <Link to={`/blog/${p.slug}/`} className="bstand-item">
              <span className="bstand-no" aria-hidden="true">
                {String(i + 2).padStart(2, '0')}
              </span>
              <span className="bstand-thumb" aria-hidden="true">
                <BlogArt seed={p.slug} hue={p.hue} kind={p.category} stars={false} />
              </span>
              <span className="bstand-txt">
                <span className="bstand-cat">{p.category}</span>
                <strong>{p.title}</strong>
                <span className="bstand-meta">
                  <time dateTime={p.date}>{formatPostDate(p.date)}</time>
                  {p.readMins ? ` · ${p.readMins} min read` : ''}
                </span>
              </span>
              <span className="bstand-arrow" aria-hidden="true">
                <Icon name="arrow" size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
