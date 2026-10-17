import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { preloadPath } from './app/routeCache.js';
import { normalizePath, isHashMode } from './router/Router.jsx';
import './styles/index.css';

const container = document.getElementById('root');
const path = isHashMode() ? normalizePath(location.hash.replace(/^#/, '') || '/') : normalizePath(location.pathname);

// Load the current page module first so hydration matches the prerendered HTML exactly.
preloadPath(path).finally(() => {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  const prerendered = container.firstElementChild && !isHashMode();
  if (prerendered) hydrateRoot(container, app);
  else createRoot(container).render(app);
  document.documentElement.classList.add('js-ready');
});
