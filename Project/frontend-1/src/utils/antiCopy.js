// Content protection (Kunal, 20 Nov 2026): discourages casual copying of the site's text and
// pictures. It is a deterrent only. Anyone can still read the page source, use developer tools,
// take a screenshot or turn JavaScript off, so it never claims to stop content extraction.
//
// What stays fully usable, by design:
// - every form field (input, textarea, select, contenteditable), including password fields:
//   typing, selecting, copying, cutting and pasting all work as normal
// - anything marked data-allow-copy (email addresses, referral links, codes)
// - links keep their right-click menu, so "open in new tab" and "copy link" still work
// - keyboard navigation, screen readers, zoom, find-in-page and printing are untouched
// - the site's own copy buttons use navigator.clipboard, which these listeners don't touch

const FIELD = 'input, textarea, select, [contenteditable=""], [contenteditable="true"], [data-allow-copy], a[href^="mailto:"], a[href^="tel:"]';

function inField(node) {
  const el = node && node.nodeType === 1 ? node : node && node.parentElement;
  return !!(el && el.closest && el.closest(FIELD));
}

/** True when the current selection sits inside a field (so the copy is the visitor's own text). */
function selectionInField() {
  const sel = typeof window.getSelection === 'function' ? window.getSelection() : null;
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return inField(document.activeElement);
  return inField(sel.anchorNode) && inField(sel.focusNode);
}

let toastTimer = 0;
function notice() {
  let t = document.getElementById('nocopy-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'nocopy-toast';
    t.className = 'nocopy-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = 'Copying is turned off on Turn2Opinion. To share a page, copy its link from the address bar.';
  t.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
}

export function installAntiCopy() {
  if (typeof document === 'undefined' || document.documentElement.dataset.nocopy) return;
  document.documentElement.dataset.nocopy = 'on';

  const block = (e) => {
    if (selectionInField() || inField(e.target)) return;
    e.preventDefault();
    if (e.type === 'copy' || e.type === 'cut') notice();
  };
  document.addEventListener('copy', block, true);
  document.addEventListener('cut', block, true);

  // Right-click: blocked on text and pictures, kept on links and fields.
  document.addEventListener(
    'contextmenu',
    (e) => {
      const el = e.target && e.target.closest ? e.target : null;
      if (!el || el.closest('a[href]') || inField(el)) return;
      e.preventDefault();
    },
    true
  );

  // Dragging pictures out of the page.
  document.addEventListener(
    'dragstart',
    (e) => {
      const el = e.target;
      if (el && el.nodeType === 1 && el.closest('img, svg, picture, video, canvas, figure')) e.preventDefault();
    },
    true
  );

  // Save-page and view-source shortcuts. Printing, find, zoom and every shortcut inside a field still work.
  document.addEventListener(
    'keydown',
    (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey || inField(e.target)) return;
      const k = (e.key || '').toLowerCase();
      if (k === 's' || k === 'u') e.preventDefault();
    },
    true
  );
}
