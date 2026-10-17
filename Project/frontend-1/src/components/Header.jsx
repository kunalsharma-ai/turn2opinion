import { useEffect, useRef, useState } from 'react';
import { Link, usePath } from '../router/Router.jsx';
import { Logo } from './Brand.jsx';
import Icon from './Icon.jsx';
import { SITE } from '../config/site.js';
import { api } from '../utils/api.js';

export const NAV = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/about/', label: 'About Us', icon: 'users' },
  { to: '/paid-surveys/', label: 'Earn', icon: 'coin' },
  { to: '/how-it-works/', label: 'How It Works', icon: 'route' },
  { to: '/rewards/', label: 'Rewards', icon: 'gift' },
  { to: '/profiling/', label: 'Trust & Safety', icon: 'shield' },
  { to: '/blog/', label: 'Blogs', icon: 'pen', badge: 'Trending' },
  { to: '/faq/', label: 'FAQ', icon: 'chat' },
  { to: '/contact/', label: 'Contact', icon: 'mail' }
];

const isActive = (path, to) => (to === '/' ? path === '/' : path.startsWith(to));

// const getNavbarIcon = (icon) => {
//   const icons = {
//     'icon-drawer': 'layout-dashboard',
//     'icon-user': 'user',
//     'icon-settings': 'settings',
//   };

//   return icons[icon] || icon;
// };


const renderNavbarIcon = (icon, size = 17) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (icon) {
    case 'icon-drawer':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M9 4v16M14 8h3M14 12h3M14 16h3" />
        </svg>
      );

    case 'icon-user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case 'icon-settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.9h-3l-.3-1.9a8 8 0 0 1-1.8-1l-1.7.7-1.5-2.6 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.5-2.6 1.7.7a8 8 0 0 1 1.8-1L12.6 7h3l.3 1.9a8 8 0 0 1 1.8 1l1.7-.7 1.5 2.6-1.4 1.1a8 8 0 0 1-.1 2Z" />
        </svg>
      );

    default:
      return null;
  }
};


export default function Header() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // "Magic pill" that glides to the hovered / focused / active link.
  const movePill = (el) => {
    const nav = navRef.current;
    if (!nav) return;
    const target = el || nav.querySelector('.nav-link.is-active');
    if (!target) {
      nav.style.setProperty('--pill-o', '0');
      return;
    }
    nav.style.setProperty('--pill-x', `${target.offsetLeft}px`);
    nav.style.setProperty('--pill-w', `${target.offsetWidth}px`);
    nav.style.setProperty('--pill-o', '1');
  };

  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
useEffect(()=>{
  api
  .get(`/api/v1/me`)
  .then(resp=>{
    if("data" in resp)
    setUser(resp.data)
  })
  .catch(e=>{
  })
},[])
  // Close dropdown on route change
  useEffect(() => {
    setProfileOpen(false);
  }, [path]);



  useEffect(() => {
    const t = setTimeout(() => movePill(), 60);
    const onResize = () => movePill();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', open);
    if (!open) return undefined;
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap header-row">
        <Logo eager />
        <nav className="main-nav" aria-label="Main" ref={navRef} onMouseLeave={() => movePill()}>
          <span className="nav-pill" aria-hidden="true" />
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className={`nav-link ${isActive(path, n.to) ? 'is-active' : ''}`}
              style={{ '--i': i }}
              onMouseEnter={(e) => movePill(e.currentTarget)}
              onFocus={(e) => movePill(e.currentTarget)}
            >
              {n.label}
              {n.badge && (
                <span className="nav-badge">
                  <Icon name="bolt" size={9} /> {n.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        
        <div className="header-cta">
          {user ? (
            <div className="profile-menu" ref={profileRef}>
              <button
                type="button"
                className="profile-trigger"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                {user.profilePicture || user.avatar ? (
                  <img
                    className="profile-avatar"
                    src={user.profilePicture || user.avatar}
                    alt="Profile"
                  />
                ) : (
                  <span className="profile-avatar profile-avatar-fallback">
                    {(user.name?.first || user.name || 'U')
                      .toString()
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <span className="profile-name">
                  {user.name?.first || user.name || user.firstName || 'User'}
                </span>

                {/* <Icon name="chevron-down" size={16} /> */}
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  {(user.navbar || [
                  ]).map((item) => (
                    <Link
                      key={item.text}
                      to={item.link || '/'}
                      className="profile-dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      {item.icon && renderNavbarIcon(item.icon, 17)}
                      <span>{item.text}</span>
                    </Link>
                  ))}


                  <button
                    type="button"
                    className="profile-dropdown-item profile-logout"
                    onClick={async e=>{
                      await api.delete(`/api/v1/me`);
                      window.location.reload();
                    }}
                  >
                    <Icon name="logout" size={17} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login/" className="btn btn-ghost btn-sm">
                Log in
              </Link>

              <Link
                to="/join/"
                className="btn btn-primary btn-sm btn-shimmer"
              >
                Join free
              </Link>
            </>
          )}

          <button
            type="button"
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
      <div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} className={`mobile-link ${isActive(path, n.to) ? 'is-active' : ''}`} style={{ '--i': i }}>
              <span className="mobile-link-label">
                <span className="mobile-link-icon">
                  <Icon name={n.icon} size={18} />
                </span>
                {n.label}
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </span>
              <Icon name="arrow" size={20} />
            </Link>
          ))}
        </nav>
        {/* mobile cta */}
        {/* <div className="mobile-cta">
          <Link to="/login/" className="btn btn-ghost">
            Log in
          </Link>
          <Link to="/join/" className="btn btn-primary">
            Join free
          </Link>
        </div> */}

        
        <div className="mobile-cta">
          {user ? (
            <div className="mobile-profile">
              <div className="mobile-profile-info">
                {user.profilePicture || user.avatar ? (
                  <img
                    className="profile-avatar"
                    src={user.profilePicture || user.avatar}
                    alt="Profile"
                  />
                ) : (
                  <span className="profile-avatar profile-avatar-fallback">
                    {(user.name?.first || user.name || user.firstName || 'U')
                      .toString()
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <div className="mobile-profile-details">
                  <strong>
                    {user.name?.first || user.name || user.firstName || 'User'}
                  </strong>
                  <span>My Account</span>
                </div>
              </div>

              <div className="mobile-profile-links">
                {(user.navbar || []).map((item) => (
                  <Link
                    key={item.text}
                    to={item.link || '/'}
                    className="profile-dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    {item.icon && renderNavbarIcon(item.icon, 18)}
                    <span>{item.text}</span>
                    <Icon name="arrow" size={16} />
                  </Link>
                ))}


                <button
                  type="button"
                  className="profile-dropdown-item profile-logout"
                  onClick={async e=>{
                    await api.delete(`/api/v1/me`);
                    window.location.reload();
                  }}
                >
                  <Icon name="logout" size={18} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login/"
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>

              <Link
                to="/join/"
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Join free
              </Link>
            </>
          )}
        </div>

        <div className="mobile-extra">
          <p>
            <span className="live-dot" /> Live help, 24/7
          </p>
          <div className="mobile-socials">
            {SITE.social.map((so) => (
              <a key={so.id} href={so.url} target="_blank" rel="noopener noreferrer" aria-label={`Turn2Opinion on ${so.label}`}>
                <Icon name={so.id} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
