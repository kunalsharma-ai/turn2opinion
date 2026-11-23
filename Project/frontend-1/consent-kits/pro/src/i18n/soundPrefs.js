// One sound switch shared with the main Turn2Opinion website (localStorage "t2o.sound": "on" / "off").
const KEY = 't2o.sound';
let memory = null; // fallback when storage is blocked
export function isSoundEnabled() {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v == null) return memory !== false;
    return v !== 'off';
  } catch {
    return memory !== false;
  }
}
export function setSoundEnabled(on) {
  memory = !!on;
  try {
    window.localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* blocked storage: remembered for this visit */
  }
}
