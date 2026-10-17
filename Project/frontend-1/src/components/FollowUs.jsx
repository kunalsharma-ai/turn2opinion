import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import { SOCIAL_SVG } from './SocialAuth.jsx';

export default function FollowUs() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get('/api/v1/socials')
      .then((resp) => setItems(resp?.data ?? []))
      .catch(() => setItems([]));
  }, []);

  const list = items
    .filter((s) => typeof s?.url === 'string' && s.url.trim() && SOCIAL_SVG[s.platform?.toLowerCase()])
    .map((s) => ({ name: s.platform, url: s.url, icon: SOCIAL_SVG[s.platform.toLowerCase()] }));

  if (!list.length) return null;

  return (
    <div className="follow-us">
      <span>Follow us on</span>
      <div className="follow-icons">
        {list.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="social-icon-btn">
            <span className="social-ico">{s.icon}</span>
          </a>
        ))}
      </div>
    </div>
  );
}