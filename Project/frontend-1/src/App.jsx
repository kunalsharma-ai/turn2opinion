import { useEffect, useRef, useState } from 'react';
import { Router, usePath } from './router/Router.jsx';
import { matchRoute, resolveSeo } from './routes.js';
import { getData, getPage, isReady, preloadPath } from './app/routeCache.js';
import { applyHead, buildHead } from './seo/seo.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useMounted } from './hooks/useMounted.js';
import { trackPageView } from './utils/analytics.js';
import SocialRedirect from './components/SocialRedirect.jsx';

function GlobalWidgetsLoader() {
  // Floating widgets (chat, cursor, toasts, review prompt, consent) load after the page is idle,
  // so they never compete with the first paint.
  const [Widgets, setWidgets] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const go = () =>
      import('./components/GlobalWidgets.jsx').then((m) => {
        if (!cancelled) setWidgets(() => m.default);
      });
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 600);
    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  return Widgets ? <Widgets /> : null;
}

function Shell() {
  const path = usePath();
  const { route, params } = matchRoute(path);
  const ready = isReady(route, path);
  const [, bump] = useState(0);
  const last = useRef(null);
  const mounted = useMounted();

  useEffect(() => {
    if (ready) return undefined;
    let alive = true;
    preloadPath(path)
      .then(() => alive && bump((n) => n + 1))
      .catch(() => alive && bump((n) => n + 1));
    return () => {
      alive = false;
    };
  }, [path, ready]);

  useEffect(() => {
    if (!ready || !mounted) return;
    const seo = resolveSeo(route, params);
    applyHead(buildHead(path, seo, getData(path)));
    trackPageView(path, seo.title);
  }, [path, ready, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  let content;
  if (ready) {
    const Page = getPage(route);
    content = <Page key={path} params={params} data={getData(path)} />;
    last.current = content;
  } else content = last.current;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SocialRedirect />
      <Header />
      {!ready && <div className="route-progress" role="progressbar" aria-label="Loading page" />}
      <main id="main" tabIndex={-1}>{content}</main>
      <Footer />
      {mounted && <GlobalWidgetsLoader />}
    </>
  );
}

export default function App({ initialPath }) {
  return (
    <Router initialPath={initialPath}>
      <Shell />
    </Router>
  );
}
