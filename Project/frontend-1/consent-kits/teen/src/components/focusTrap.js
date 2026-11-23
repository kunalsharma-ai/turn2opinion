// Keeps Tab / Shift+Tab inside an open dialog (works in the Shadow DOM too: activeElement is read from the
// dialog's own root node).
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function trapTab(e, box) {
  if (e.key !== 'Tab' || !box) return;
  const items = Array.from(box.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === box);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = box.getRootNode().activeElement;
  if (e.shiftKey && (active === first || !box.contains(active))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (active === last || !box.contains(active))) { e.preventDefault(); first.focus(); }
}
