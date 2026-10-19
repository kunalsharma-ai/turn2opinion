// Machine-translation providers for text that is not in the bundled dictionaries.
// Each provider: { name, translate(texts: string[], onProgress?) → Promise<(string|null)[]> }
//
//  • endpoint — your backend (VITE_TRANSLATE_URL). Recommended for production and the only option that
//    works for every browser and inside mainland China (back it with Azure Translator China, Alibaba Cloud
//    MT, Tencent TMT or Baidu Translate there). Contract:
//      POST <url>  { "source": "en", "target": "zh", "texts": ["Join free", …] }
//      → 200      { "translations": ["免费加入", …] }   (same order and length; null for failures)
//    API keys stay on the server — never in VITE_ variables.
//  • on-device — the browser's built-in Translator API (desktop Chrome 138+). Free, private, offline after
//    a one-time model download (which needs a click). Not available in Safari/Firefox or most phones yet.
const RAW = (typeof import.meta !== 'undefined' && import.meta.env) || {};
const env = (name, fallback = '') => { const v = RAW[`VITE_${name}`]; return typeof v === 'string' && v.trim() ? v.trim() : fallback; };

const ENDPOINT = env('TRANSLATE_URL', '');
const BATCH = 60;
const MAX_CHARS = 6000;

function chunks(texts) {
  const out = [];
  let cur = [];
  let len = 0;
  for (const t of texts) {
    if (cur.length && (cur.length >= BATCH || len + t.length > MAX_CHARS)) {
      out.push(cur);
      cur = [];
      len = 0;
    }
    cur.push(t);
    len += t.length;
  }
  if (cur.length) out.push(cur);
  return out;
}

function endpointProvider(meta) {
  if (!ENDPOINT) return null;
  return {
    name: 'endpoint',
    async translate(texts, onProgress) {
      const res = [];
      for (const part of chunks(texts)) {
        try {
          const r = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'en', target: meta.mt, texts: part }),
          });
          const data = r.ok ? await r.json() : null;
          const list = Array.isArray(data?.translations) ? data.translations : [];
          part.forEach((_, i) => res.push(typeof list[i] === 'string' ? list[i] : null));
        } catch {
          part.forEach(() => res.push(null));
        }
        onProgress?.(res.length);
      }
      return res;
    },
  };
}

const deviceCache = new Map();
async function deviceProvider(meta, interactive) {
  const T = typeof self !== 'undefined' ? self.Translator : undefined;
  if (!T?.availability) return null;
  const opts = { sourceLanguage: 'en', targetLanguage: meta.mt };
  let state;
  try {
    state = await Promise.race([T.availability(opts), new Promise((r) => setTimeout(() => r('unavailable'), 3000))]);
  } catch {
    return null;
  }
  if (state === 'unavailable') return null;
  // Downloading a model requires a user gesture; without one we wait for the "Translate everything" button.
  if (state !== 'available' && !interactive) return { name: 'device-needs-click', translate: async (t) => t.map(() => null) };
  let tr = deviceCache.get(meta.mt);
  if (!tr) {
    try {
      tr = await Promise.race([T.create(opts), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 90000))]);
      deviceCache.set(meta.mt, tr);
    } catch {
      return null;
    }
  }
  return {
    name: 'device',
    async translate(texts, onProgress) {
      const res = new Array(texts.length).fill(null);
      let done = 0;
      let i = 0;
      const worker = async () => {
        while (i < texts.length) {
          const k = i++;
          try {
            res[k] = await tr.translate(texts[k]);
          } catch {
            res[k] = null;
          }
          if (++done % 10 === 0) onProgress?.(done);
        }
      };
      await Promise.all([worker(), worker(), worker(), worker()]);
      onProgress?.(done);
      return res;
    },
  };
}

/** Providers to try in order for a language (empty list = dictionary only). */
export async function providersFor(meta, { interactive = false } = {}) {
  const list = [endpointProvider(meta), await deviceProvider(meta, interactive)].filter(Boolean);
  return list;
}

export const HAS_ENDPOINT = Boolean(ENDPOINT);
