// Used only at build time to prerender the English page into dist/index.html (fast first paint).
import { renderToString } from 'react-dom/server';
import Root from './Root.jsx';
import { DEFAULT_CONFIG } from './config.js';

export function render() {
  return renderToString(<Root cfg={{ ...DEFAULT_CONFIG, standalone: true }} initial="en" />);
}
