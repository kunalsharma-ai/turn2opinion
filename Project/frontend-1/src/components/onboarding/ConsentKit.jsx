// The approved consent pages (Consumer v1.1.0, Professional v1.0.0, Teen v1.1.0), shown inside the site.
//
// Each package is built from consent-kits/<kind>/ into public/consent-kit/<kind>/host.js by
// `npm run build:consent-kits`, and renders in its own Shadow DOM, so its design and the site's CSS never
// touch. The legal wording, the consent boxes and the record are the package's. Saving goes through the
// page that uses this component (config.save), so the site's existing API calls are unchanged.
import { useEffect, useRef, useState } from 'react';
import { asset } from '../../config/env.js';

const VERSION = { consumer: '1.1.0', pro: '1.0.0', teen: '1.1.0' };
const loaded = {};
function load(kind) {
  if (!loaded[kind]) loaded[kind] = import(/* @vite-ignore */ asset(`consent-kit/${kind}/host.js?v=${VERSION[kind]}`));
  return loaded[kind];
}

/**
 * kind: 'consumer' | 'pro' | 'teen'. config: the package config (member, save, onContinue, onDecline, ...).
 * The config is read once, when the page mounts.
 */
export default function ConsentKit({ kind, config, label = 'Consent and terms' }) {
  const ref = useRef(null);
  const cfg = useRef(config);
  cfg.current = config;
  const [state, setState] = useState('loading');

  // The package is a full page with its own top bar (logo, language, theme, sound), so while it is on
  // screen the site's own sticky header steps aside (html.ckit-page in styles/reg-consent.css).
  useEffect(() => {
    const h = document.documentElement;
    h.classList.add('ckit-page');
    return () => h.classList.remove('ckit-page');
  }, []);

  useEffect(() => {
    let off = null;
    let live = true;
    load(kind)
      .then((m) => {
        if (!live || !ref.current) return;
        // the callbacks always reach the latest props
        const c = cfg.current;
        off = m.mount(ref.current, {
          ...c,
          assetBase: asset(`consent-kit/${kind}/`),
          // the packages park their skip link just above the page; inside the site it would show, so keep it hidden until focused
          hostCss: '.skip:not(:focus){top:0;width:1px;height:1px;padding:0;overflow:hidden;clip-path:inset(50%)}' + (c.hostCss || ''),
          save: (rec) => cfg.current.save(rec),
          onContinue: (rec) => cfg.current.onContinue?.(rec),
          onDecline: (why) => cfg.current.onDecline?.(why)
        });
        setState('ready');
      })
      .catch(() => {
        loaded[kind] = null;
        if (live) setState('error');
      });
    return () => {
      live = false;
      if (off) off();
    };
  }, [kind]);

  return (
    <div className={`ckit ckit--${kind} is-${state}`} aria-label={label} aria-busy={state === 'loading' || undefined}>
      {state === 'error' && (
        <p className="form-alert" role="alert">
          The agreement couldn’t load. Check your connection and reload the page.
        </p>
      )}
      {state === 'loading' && (
        <div className="ckit-wait" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div ref={ref} className="ckit-host" />
    </div>
  );
}
