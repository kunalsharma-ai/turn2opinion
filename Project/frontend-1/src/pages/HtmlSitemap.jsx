import { Link } from '../router/Router.jsx';
import { BLOG_POSTS } from '../data/blog/index.js';
import { PageHero } from '../components/Common.jsx';
import { useReveal } from '../hooks/useMounted.js';
import Icon from '../components/Icon.jsx';

const GROUPS = [
  {
    title: 'Main pages',
    icon: 'home',
    links: [
      ['/', 'Home'],
      ['/how-it-works/', 'How It Works'],
      ['/paid-surveys/', 'Paid Surveys'],
      ['/profiling/', 'Survey Profiling & Quality Score'],
      ['/rewards/', 'Survey Rewards'],
      ['/about/', 'About Turn2Opinion'],
      ['/about/reviews/', 'Member Ratings & Reviews'],
      ['/contact/', 'Contact'],
      ['/join/', 'Join free'],
      ['/login/', 'Member login']
    ]
  },
  {
    title: 'Help & resources',
    icon: 'headset',
    links: [
      ['/faq/', 'Frequently Asked Questions'],
      ['/blog/', 'Blogs']
    ]
  },
  {
    title: 'Legal',
    icon: 'shield',
    links: [
      ['/privacy/', 'Privacy Policy'],
      ['/gdpr/', 'GDPR & Data Protection'],
      ['/cookies/', 'Cookie Policy'],
      ['/terms/', 'Terms & Conditions']
    ]
  }
];

export default function HtmlSitemap() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero theme="grid" crumbs={[{ label: 'Sitemap' }]} title="Sitemap" lead="Every page on Turn2Opinion, one click away." />
      <section className="section s-paper">
        <div className="wrap sitemap-grid">
          {GROUPS.map((g) => (
            <nav key={g.title} className="sitemap-group" aria-label={g.title} data-reveal>
              <h2>
                <Icon name={g.icon} size={20} /> {g.title}
              </h2>
              <ul>
                {g.links.map(([to, l]) => (
                  <li key={to}>
                    <Link to={to}>{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav className="sitemap-group wide" aria-label="Blogs" data-reveal>
            <h2>
              <Icon name="pen" size={20} /> All blogs
            </h2>
            <ul className="cols">
              {BLOG_POSTS.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}/`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
