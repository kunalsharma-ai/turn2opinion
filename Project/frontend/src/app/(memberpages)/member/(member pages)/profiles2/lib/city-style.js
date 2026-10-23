/* Injects the Opinion City board / reward styles (styles/city-board.js) the first time a component that
   needs them loads. Keeping them out of the inlined critical CSS keeps the first paint as light as v5.1. */
import CSS from '../styles/city-board.js';

export function ensureCityStyles() {
  if (typeof document === 'undefined' || document.getElementById('t2o-city')) return;
  const s = document.createElement('style');
  s.id = 't2o-city';
  s.textContent = CSS.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ');
  document.head.append(s);
}
