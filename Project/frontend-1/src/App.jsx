import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Router, usePath } from './router/Router.jsx';
import { matchRoute, resolveSeo } from './routes.js';
import { getData, getPage, isReady, preloadPath } from './app/routeCache.js';
import { applyHead, buildHead } from './seo/seo.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useMounted } from './hooks/useMounted.js';
import { trackPageView } from './utils/analytics.js';
import SocialRedirect from './components/SocialRedirect.jsx';
import AnimationGate from './components/AnimationGate.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';
import MemberGuard from './components/MemberGuard.jsx';
import VideoShowcase from './components/video/VideoShowcase.jsx';
import { videoFor } from './data/videos.js';

const LanguagePicker = lazy(() => import('./components/LanguagePicker.jsx').then((m) => ({ default: m.LanguagePicker })));
const TranslateStatus = lazy(() => import('./components/LanguagePicker.jsx').then((m) => ({ default: m.TranslateStatus })));

/** Loads the picker code only when it is opened, and the status pill only in other languages. */
function LanguageLayer() {
  const { picker, lang } = useI18n();
  return (
    <Suspense fallback={null}>
      {picker && <LanguagePicker />}
      {lang !== 'en' && <TranslateStatus />}
    </Suspense>
  );
}

const WIDGET_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'];

function GlobalWidgetsLoader() {
  // Floating widgets (chat, cursor, toasts, review prompt, consent) load on the visitor's first
  // move — a scroll, a tap, a key — and otherwise on a timer, so they never compete with the
  // first paint or with hydration. None of them is on screen before that: the review prompt is
  // on a scroll interval anyway, and the chat button and consent bar are needed the moment
  // someone reaches for them, which is exactly when the first of these events fires.
  const [Widgets, setWidgets] = useState(null);
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      stop();
      import('./components/GlobalWidgets.jsx').then((m) => setWidgets(() => m.default));
    };
    const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 1200 }) : setTimeout(go, 400));
    const timer = setTimeout(idle, 2200);
    const stop = () => {
      clearTimeout(timer);
      WIDGET_EVENTS.forEach((e) => window.removeEventListener(e, go, { capture: true }));
    };
    WIDGET_EVENTS.forEach((e) => window.addEventListener(e, go, { capture: true, passive: true, once: true }));
    return () => {
      done = true;
      stop();
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
  // The member area brings its own header, navigation and footer (member/components/Shell.jsx).
  const isMember = path.startsWith('/member/');

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
    // The member area is one persistent app (src/member/MemberApp.jsx): a stable key keeps its data
    // and shell mounted while the member moves between Dashboard, Rewards, Settings and the rest.
    // The page and its video showcase are siblings in <main>, so their keys must differ (a shared key
    // left the previous page on screen after clicking Home, 18 Nov 2026).
    const page = <Page key={isMember ? 'member-app' : `page:${path}`} params={params} data={getData(path)} />;
    // member area ke pages: pehle check ho ki profile complete hai ya nahi
    content = isMember ? <MemberGuard key="member-guard">{page}</MemberGuard> : page;
    last.current = content;
  } else content = last.current;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SocialRedirect />
      {!isMember && <Header />}
      {!ready && <div className="route-progress" role="progressbar" aria-label="Loading page" />}
      <main id="main" tabIndex={-1}>
        {content}
        {/* Every page closes with its own video showcase, in its own template (data/videos.js). */}
        {ready && !isMember && <VideoShowcase key={`video:${path}`} v={videoFor(path)} />}
      </main>
      {!isMember && <Footer />}
      {mounted && (
        <>
          <AnimationGate />
          <GlobalWidgetsLoader />
          <LanguageLayer />
        </>
      )}
    </>
  );
}

export default function App({ initialPath }) {
  return (
    <Router initialPath={initialPath}>
      <I18nProvider>
        <Shell />
      </I18nProvider>
    </Router>
  );
}
