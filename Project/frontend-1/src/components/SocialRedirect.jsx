import { useEffect } from 'react';

export default function SocialRedirect() {
  useEffect(() => {
    if (window.location.pathname !== '/') return;
    const p = new URLSearchParams(window.location.search);

    // email verified nahi hai -> login page
    if (p.get('verifyemail')) {
      window.location.replace(`/login/?verifyemail=${encodeURIComponent(p.get('verifyemail'))}`);
      return;
    }

    // naya user -> join page (name, email ke saath)
    if (p.get('signup')) {
      p.delete('signup');
      const qs = p.toString();
      window.location.replace(`/join/${qs ? `?${qs}` : ''}`);
    }
  }, []);
  return null;
}