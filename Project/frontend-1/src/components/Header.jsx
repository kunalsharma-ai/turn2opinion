// Site header: logo + language, the blue tab bar, log in / join, and the mobile menu.
//
// v3.2 — "About Us" is now a dropdown with three clearly visible destinations:
//   1. About Turn2Opinion      /about/
//   2. Our Ratings & Reviews   /about/reviews/      (previously only reachable from the footer)
//   3. Scan & Connect          /about/scan-connect/ (the QR hub, now with its own page)
//
// Behaviour: opens on hover (mouse), on click/tap (touch and mouse), and on keyboard focus; Escape and
// a click outside close it. All three links are always in the prerendered HTML (hidden with CSS, not
// removed), so search engines and screen-reader users can reach them without JavaScript.
// On phones the three options are shown permanently inside the menu as a group — never hidden behind
// a second tap.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, usePath } from '../router/Router.jsx';
import { Logo } from './Brand.jsx';
import Icon from './Icon.jsx';
import { SITE } from '../config/site.js';
import { api } from '../utils/api.js';
import { LanguageButton } from './Language.jsx';
import { seedTestimonials, summarise } from '../utils/reviews.js';
import Gem from './rating/Gem.jsx';

export const ABOUT_MENU = [
  { to: '/about/', label: 'About Turn2Opinion', sub: 'Who we are, our certifications and reach', icon: 'building', tone: 'about' },
  { to: '/about/reviews/', label: 'Our Ratings & Reviews', sub: 'Real scores from consumers and professionals', icon: 'quote', tone: 'reviews' },
  { to: '/about/scan-connect/', label: 'Scan & Connect', sub: 'QR codes for our panels and social channels', icon: 'qr', tone: 'scan' }
];

export const NAV = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/about/', label: 'About Us', icon: 'users', children: ABOUT_MENU },
  { to: '/paid-surveys/', label: 'Earn', icon: 'coin' },
  { to: '/how-it-works/', label: 'How It Works', icon: 'route' },
  { to: '/rewards/', label: 'Rewards', icon: 'gift' },
  { to: '/profiling/', label: 'Trust & Safety', icon: 'shield' },
  { to: '/blog/', label: 'Blogs', icon: 'pen', badge: 'Trending' },
  { to: '/faq/', label: 'FAQ', icon: 'chat' },
  { to: '/contact/', label: 'Contact', icon: 'mail' }
];

const isActive = (path, to) => (to === '/' ? path === '/' : path.startsWith(to));
const exact = (path, to) => path === to;

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



/* ------------------------------------------------------------------ desktop dropdown */
function AboutDropdown({ item, i, path, movePill }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const closeT = useRef(0);
  const stats = useMemo(() => summarise(seedTestimonials()), []);
  const active = isActive(path, item.to);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return undefined;
    const out = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    const esc = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        wrap.current?.querySelector('.nav-drop-btn')?.focus();
      }
    };
    document.addEventListener('pointerdown', out);
    window.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', out);
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  const enter = (e) => {
    clearTimeout(closeT.current);
    if (e.pointerType === 'mouse') setOpen(true);
  };
  const leave = (e) => {
    if (e.pointerType !== 'mouse') return;
    closeT.current = setTimeout(() => setOpen(false), 180);
  };

  return (
    <div
      className={`nav-drop ${open ? 'is-open' : ''}`}
      ref={wrap}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onBlur={(e) => !wrap.current.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        className={`nav-link nav-drop-btn ${active ? 'is-active' : ''}`}
        style={{ '--i': i }}
        aria-expanded={open}
        aria-controls="about-menu"
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={(e) => movePill(e.currentTarget)}
        onFocus={(e) => movePill(e.currentTarget)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            setTimeout(() => wrap.current?.querySelector('.drop-item')?.focus(), 30);
          }
        }}
      >
        {item.label}
        <Icon name="chevron" size={14} className="nav-chev" />
      </button>

      <div className="drop-panel" id="about-menu" role="menu" aria-label="About Us">
        <span className="drop-beam" aria-hidden="true" />
        {item.children.map((c, k) => (
          <Link
            key={c.to}
            to={c.to}
            role="menuitem"
            className={`drop-item tone-${c.tone} ${exact(path, c.to) ? 'is-here' : ''}`}
            style={{ '--k': k }}
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              const items = [...wrap.current.querySelectorAll('.drop-item')];
              const at = items.indexOf(e.currentTarget);
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[(at + 1) % items.length].focus();
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[(at - 1 + items.length) % items.length].focus();
              }
            }}
          >
            <span className="drop-ico" aria-hidden="true">
              <span className="drop-ico-glow" />
              {c.tone === 'reviews' ? <Gem level={5} size={30} motion="float" /> : <Icon name={c.icon} size={22} />}
              {c.tone === 'scan' && <i className="drop-scan" />}
            </span>
            <span className="drop-copy">
              <strong>{c.label}</strong>
              <small>{c.sub}</small>
            </span>
            {c.tone === 'reviews' && stats.avg > 0 ? (
              <span className="drop-score" aria-label={`Average ${stats.avg.toFixed(1)} out of 5 from ${stats.count} reviews`}>
                <b>{stats.avg.toFixed(1)}</b>
                <small>{stats.count} reviews</small>
              </span>
            ) : (
              <Icon name="arrow" size={16} className="drop-go" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ header */
export default function Header() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // "Magic pill" that glides to the hovered / focused / active link. Measured with bounding
  // rectangles (not offsetLeft) because the About trigger sits inside its own positioned wrapper.
  const movePill = (el) => {
    const nav = navRef.current;
    if (!nav) return;
    const target = el || nav.querySelector('.nav-link.is-active');
    if (!target) {
      nav.style.setProperty('--pill-o', '0');
      return;
    }
    const a = nav.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    nav.style.setProperty('--pill-x', `${b.left - a.left}px`);
    nav.style.setProperty('--pill-w', `${b.width}px`);
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
        <div className="brand-lang">
          <Logo eager />
          <LanguageButton />
        </div>
        <nav className="main-nav" aria-label="Main" ref={navRef} onMouseLeave={() => movePill()}>
          <span className="nav-pill" aria-hidden="true" />
          {NAV.map((n, i) =>
            n.children ? (
              <AboutDropdown key={n.to} item={n} i={i} path={path} movePill={movePill} />
            ) : (
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
            )
          )}
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
          {NAV.map((n, i) =>
            n.children ? (
              <div key={n.to} className={`mobile-group ${isActive(path, n.to) ? 'is-active' : ''}`} style={{ '--i': i }} role="group" aria-labelledby="mg-about">
                <p className="mobile-group-title" id="mg-about">
                  <span className="mobile-link-icon">
                    <Icon name={n.icon} size={18} />
                  </span>
                  {n.label}
                </p>
                <div className="mobile-sub">
                  {n.children.map((c, k) => (
                    <Link key={c.to} to={c.to} className={`mobile-sublink tone-${c.tone} ${exact(path, c.to) ? 'is-active' : ''}`} style={{ '--k': k }}>
                      <span className="msl-ico" aria-hidden="true">
                        {c.tone === 'reviews' ? <Gem level={5} size={24} motion="still" /> : <Icon name={c.icon} size={18} />}
                      </span>
                      <span className="msl-copy">
                        <strong>{c.label}</strong>
                        <small>{c.sub}</small>
                      </span>
                      <Icon name="arrow" size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
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
            )
          )}
        </nav>
        <div className="mobile-lang">
          <LanguageButton compact />
        </div>
        
        {/* <div className="mobile-cta">
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
        </div> */}

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
