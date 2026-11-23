// The welcome questions were removed from registration (Round 15, Kunal 23 Nov 2026): members go
// straight from their password (and, for Consumers and Professionals, the Consent & Terms step) to
// the dashboard. This page stays only so old bookmarks and emails still land somewhere useful.
import { useEffect } from 'react';
import { hrefFor } from '../router/Router.jsx';
import { DASHBOARD } from '../utils/session.js';

export default function Welcome() {
  useEffect(() => {
    window.location.replace(hrefFor(DASHBOARD));
  }, []);
  return (
    <section className="join-done">
      <div className="wrap join-done-inner">
        <p role="status">Opening your dashboard…</p>
        <a href={hrefFor(DASHBOARD)} className="btn btn-primary">
          Go to my dashboard
        </a>
      </div>
    </section>
  );
}
