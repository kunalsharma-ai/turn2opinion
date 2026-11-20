import { ENV } from '../config/env.js';

// Design preview only (single-file build, no server): stands in for the email links.
export default function PreviewLinks({ links }) {
  if (!ENV.DEMO_MODE) return null;
  const go = (q, path) => window.location.assign(window.location.pathname + q + '#' + path);
  return (
    <div className="preview-links" role="note">
      <strong>Preview only.</strong> No emails are sent here. Open what the email link leads to:
      <div>
        {links.map(([label, q, path]) => (
          <button type="button" key={label} className="btn btn-ghost btn-sm" onClick={() => go(q, path)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
