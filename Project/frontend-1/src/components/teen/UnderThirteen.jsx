// Under 13: no registration on any route (Join, Teen, Consumer, Professional). Nothing typed is kept.
import { Link } from '../../router/Router.jsx';
import { SITE } from '../../config/site.js';

export default function UnderThirteen({ onBack }) {
  return (
    <div className="u13" role="alert">
      <div className="u13-art" aria-hidden="true">
        <span className="u13-sun" />
        <span className="u13-cloud c1" />
        <span className="u13-cloud c2" />
        <span className="u13-seed">🌱</span>
      </div>
      <h2>Not just yet, but we’ll be here!</h2>
      <p>
        Turn2Opinion is for people aged {SITE.minAge} and older, so we can’t create an account for you right now. We haven’t saved anything you typed. Come back on your {SITE.minAge}th birthday and join the
        Teen panel with your parent or guardian.
      </p>
      <div className="u13-actions">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        {onBack && (
          <button type="button" className="link-soft" onClick={onBack}>
            I picked the wrong date
          </button>
        )}
      </div>
    </div>
  );
}
