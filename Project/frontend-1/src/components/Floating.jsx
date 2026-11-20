// Floating popups (Round 13). Calendars, country lists and searchable selects used to open inside
// their form field, so any later part of the form that had its own layer (an animated fieldset, the
// consent checkbox, the Back / Continue buttons) could paint over them. Floating draws the popup in
// a layer of its own at the end of the page, pinned under (or, near the bottom of the screen, above)
// the field it belongs to, and follows it on scroll and resize.
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const GAP = 8;
const EDGE = 8;

function place(anchor, pop, width) {
  const r = anchor.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const w = Math.min(width === 'anchor' ? r.width : typeof width === 'object' ? width.fixed : Math.max(r.width, width || 0), vw - EDGE * 2);
  const h = pop ? pop.offsetHeight : 320;
  // never open over the fixed site menu bar
  const hd = document.querySelector('.site-header');
  const hb = hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0;
  const ceil = Math.max(EDGE, hb + EDGE);
  const below = vh - r.bottom - GAP;
  const above = r.top - GAP - ceil;
  const up = h > below && above > below;
  const top = up ? Math.max(ceil, r.top - GAP - h) : r.bottom + GAP;
  const left = Math.min(Math.max(EDGE, r.left), vw - EDGE - w);
  return { top, left, width: w, up };
}

/**
 * anchor: ref to the field's trigger box. popRef: ref given to the popup element (for outside-click
 * checks). width: a minimum width in px, 'anchor' to match the field exactly, or { fixed: px }.
 */
export default function Floating({ anchor, popRef, width = 'anchor', className = '', as: Tag = 'div', children, ...rest }) {
  const [pos, setPos] = useState(null);
  useLayoutEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!anchor.current) return;
        const r = anchor.current.getBoundingClientRect();
        // the field has scrolled out of sight: keep the popup with it rather than floating alone
        setPos(place(anchor.current, popRef && popRef.current, width));
        if (r.bottom < 0 || r.top > window.innerHeight) setPos((p) => p && { ...p, hidden: true });
      });
    };
    setPos(place(anchor.current, null, width));
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [anchor, popRef, typeof width === 'object' ? width.fixed : width]); // eslint-disable-line react-hooks/exhaustive-deps
  if (typeof document === 'undefined') return null;
  const style = pos
    ? {
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        right: 'auto',
        bottom: 'auto',
        width: pos.width,
        zIndex: 1200,
        visibility: pos.hidden ? 'hidden' : 'visible',
        transformOrigin: pos.up ? 'bottom left' : 'top left'
      }
    : { position: 'fixed', visibility: 'hidden', zIndex: 1200 };
  return createPortal(
    <Tag ref={popRef} className={`${className} is-floating`} style={style} {...rest}>
      {children}
    </Tag>,
    document.body
  );
}
