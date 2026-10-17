// SSR entry used only at build time by scripts/prerender.mjs.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { preloadPath } from './app/routeCache.js';
import { allStaticPaths, matchRoute, resolveSeo, NOT_FOUND, ROUTES } from './routes.js';
import { buildHead, headToHtml } from './seo/seo.js';
import { getData } from './app/routeCache.js';
import { ENV } from './config/env.js';
import { BLOG_POSTS } from './data/blog/index.js';

export { allStaticPaths, ROUTES, NOT_FOUND, BLOG_POSTS };
export const SITE_URL = ENV.SITE_URL;

/** Render one path to { html, head } strings. */
export async function render(path) {
  await preloadPath(path);
  const { route, params } = matchRoute(path);
  const html = renderToString(<App initialPath={path} />);
  const head = headToHtml(buildHead(path, resolveSeo(route, params), getData(path)));
  return { html, head };
}
