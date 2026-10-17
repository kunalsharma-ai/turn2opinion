// Tiny dependency-free router (history API or hash mode).
// - Production uses clean URLs with trailing slashes: /paid-surveys/
// - "hash" mode exists only for static design previews (VITE_ROUTER_MODE=hash).
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ENV } from '../config/env.js';

const RouterContext = createContext({ path: '/', navigate: () => {} });

export const isHashMode = () => ENV.ROUTER_MODE === 'hash';

/** Normalise any internal path to "/segment/" form (keeps query/hash out). */
export function normalizePath(p) {
  if (!p) return '/';
  let path = String(p).split('#')[0].split('?')[0];
  if (!path.startsWith('/')) path = '/' + path;
  path = path.replace(/\/{2,}/g, '/');
  if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/';
  return path.toLowerCase();
}

function readLocation() {
  if (typeof window === 'undefined') return '/';
  if (isHashMode()) {
    const h = window.location.hash.replace(/^#/, '');
    return normalizePath(h || '/');
  }
  return normalizePath(window.location.pathname);
}

/** Href string for an internal path, valid for the active router mode. */
export function hrefFor(to) {
  const [pathPart, anchor] = String(to).split('#');
  const path = normalizePath(pathPart || '/');
  if (isHashMode()) return '#' + path + (anchor ? '?a=' + anchor : '');
  return path + (anchor ? '#' + anchor : '');
}

function scrollToAnchorOrTop(anchor) {
  if (typeof window === 'undefined') return;
  requestAnimationFrame(() => {
    const el = anchor && document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  });
}

export function Router({ initialPath, children }) {
  const [path, setPath] = useState(() => (initialPath ? normalizePath(initialPath) : readLocation()));

  useEffect(() => {
    const onChange = () => setPath(readLocation());
    window.addEventListener('popstate', onChange);
    if (isHashMode()) window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const [pathPart, anchor] = String(to).split('#');
    const next = normalizePath(pathPart || '/');
    const href = hrefFor(to);
    if (isHashMode()) {
      if (replace) window.location.replace(href);
      else window.location.hash = href.slice(1);
    } else if (replace) window.history.replaceState({}, '', href);
    else window.history.pushState({}, '', href);
    setPath(next);
    scrollToAnchorOrTop(anchor);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);
export const usePath = () => useContext(RouterContext).path;

// Ye prefixes is SPA ke bahar ki apps hain: full page load chahiye
const EXTERNAL_PREFIXES = ['/member', '/admin'];
const isOutsideApp = (to) => {
  const p = '/' + String(to).split('#')[0].split('?')[0].replace(/^\/+/, '');
  return EXTERNAL_PREFIXES.some((x) => p === x || p.startsWith(x + '/'));
};

/** Internal link. External URLs (http, mailto, tel) render a normal anchor. */
export function Link({ to, children, onClick, className, ...rest }) {
  const { navigate, path } = useRouter();
  const external = /^(https?:|mailto:|tel:)/i.test(to);
  if (external) {
    const isHttp = /^https?:/i.test(to);
    return (
      <a href={to} className={className} {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  
  if (isOutsideApp(to)) {
    return (
      <a href={to} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  const href = hrefFor(to);
  const active = normalizePath(String(to).split('#')[0]) === path;
  return (
    <a
      href={href}
      className={className}
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        onClick && onClick(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
