import { ENV } from '../config/env.js';


class API {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  async request(method, endpoint, { body, headers = {} } = {}) {
    // await wait(5000);
    const url = `${this.baseUrl}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Set default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // Merge headers
    const mergedHeaders = {
      ...defaultHeaders,
      ...headers,
    };

    // Handle FormData content type
    if (body instanceof FormData) {
      delete mergedHeaders['Content-Type'];
    }

    const config = {
      method,
      headers: mergedHeaders,
    };

    if (body && method !== 'GET') {
      config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        console.log(response)
        errorData = { message: response.statusText };
      }

      const errorMessage = (errorData?.message || '').toLowerCase();
      if (
        token &&
        typeof window !== 'undefined' &&
        (response.status === 401 ||
          errorMessage.includes('invalid token') ||
          errorMessage.includes('token invalid') ||
          errorMessage.includes('jwt malformed') ||
          errorMessage.includes('jwt expired') ||
          errorMessage.includes("token expired"))
      ) {
        localStorage.removeItem('token');
      }

      document.dispatchEvent(
        new CustomEvent('error-received', {
          detail: {
            status: response.status,
            message: errorData.message
          },
        })
      )
      return errorData;//throw new Error(errorData.message || 'Request failed');
    }
    return response.json();

  }
  async getHtml(url, config = { mode: "no-cors" }) {
    console.log(url);

    const response = await fetch(url, config);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.log(errorData)
      } catch {

        errorData = { message: response.statusText };
      }

      document.dispatchEvent(
        new CustomEvent('error-received', {
          detail: {
            status: response.status,
            message: errorData.message
          },
        })
      )
      return errorData;//throw new Error(errorData.message || 'Request failed');
    }
    return response
  }

  get(endpoint, options = {}) {
    return this.request('GET', endpoint, options);
  }

  post(endpoint, body, options = {}) {
    return this.request('POST', endpoint, { ...options, body });
  }

  put(endpoint, body, options = {}) {
    return this.request('PUT', endpoint, { ...options, body });
  }

  patch(endpoint, body, options = {}) {
    return this.request('PATCH', endpoint, { ...options, body });
  }

  delete(endpoint, body, options = {}) {
    return this.request('DELETE', endpoint, { ...options, body });
  }
  copy(endpoint, body = {}, options = {}) {
    return this.request('COPY', endpoint, { ...options, body });
  }
}

// Export as singleton instance
export const api = new API();

export async function putJSON(url, body, { timeoutMs = 15000 } = {}) {
  if (ENV.DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true, data: { message: 'Preview mode: nothing was sent.' } };
  }
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, error: err && err.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    clearTimeout(t);
  }
}

export async function postJSON(url, body, { timeoutMs = 15000 } = {}) {
  if (ENV.DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true, data: { message: 'Preview mode: nothing was sent.' } };
  }
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, error: err && err.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    clearTimeout(t);
  }
}

export async function getJSON(url, { timeoutMs = 8000 } = {}) {
  if (!url) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** Human message for a failed request. */
export function failureMessage(result) {
  if (result && result.data && typeof result.data.message === 'string') return result.data.message;
  if (result && result.error === 'timeout') return 'The server took too long to answer. Check your connection and try again.';
  if (result && result.status === 0) return 'We couldn’t reach the server. Check your connection and try again.';
  if (result && result.status === 429) return 'Too many attempts. Wait a minute and try again.';
  return 'Something went wrong on our side. Try again, or message us on WhatsApp.';
}
