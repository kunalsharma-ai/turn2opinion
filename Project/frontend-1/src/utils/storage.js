// localStorage wrapper that never throws (private mode, blocked storage, SSR).
export const store = {
  get(key, fallback = null) {
    try {
      const v = window.localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable – feature degrades gracefully */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
};

export const session = {
  get(key, fallback = null) {
    try {
      const v = window.sessionStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }
};

// This visit only (Kunal, 18 Nov 2026): what a visitor closes with X stays closed while they move
// between pages, and comes back after a refresh or a new visit. A module-level map does exactly
// that: it survives client-side navigation and is gone on reload. sessionStorage would survive
// the reload, which is not what was asked for.
const VISIT = new Map();
export const visit = {
  get(key, fallback = null) {
    return VISIT.has(key) ? VISIT.get(key) : fallback;
  },
  set(key, value) {
    VISIT.set(key, value);
  }
};
