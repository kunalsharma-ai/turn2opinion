import { Link } from '../router/Router.jsx';
import Icon from '../components/Icon.jsx';

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap nf-inner">
        <div className="nf-art" aria-hidden="true">
          <span className="nf-4">4</span>
          <span className="nf-bubble">
            <Icon name="chat" size={64} />
          </span>
          <span className="nf-4">4</span>
        </div>
        <h1>This page skipped the survey</h1>
        <p>The link may be old or mistyped. Here’s where most people head next:</p>
        <div className="nf-links">
          <Link to="/" className="btn btn-primary">
            <Icon name="home" size={18} /> Home
          </Link>
          <Link to="/paid-surveys/" className="btn btn-ghost">
            Paid surveys
          </Link>
          <Link to="/blog/" className="btn btn-ghost">
            Blogs
          </Link>
          <Link to="/sitemap/" className="btn btn-ghost">
            Sitemap
          </Link>
        </div>
      </div>
    </section>
  );
}
