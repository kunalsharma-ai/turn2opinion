// "Every channel, every panel" — the social channels and QR codes of the company and every panel.
//
// Layout: a rail of brand "planets" on the left (each in its own colour), and the selected brand's
// world on the right: a big website QR ticket plus one card per channel. Each card shows the
// platform face; hover, focus or tap flips it to that channel's QR code. Every card is also a
// plain link, so scanning is the shortcut and never the only way in.
//
// All brands are rendered on the server (inactive ones `hidden`), so every link is in the HTML.
import { useState } from 'react';
import { asset } from '../../config/env.js';
import { NETWORK, PLATFORM } from '../../data/network.js';
import Icon from '../Icon.jsx';

const EXTRA = {
  threads: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z',
  pinterest: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z'
};

function PIcon({ k, size = 24 }) {
  if (EXTRA[k])
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
        <path d={EXTRA[k]} fill="currentColor" />
      </svg>
    );
  if (k === 'google') return <Icon name="star" size={size} />;
  return <Icon name={k} size={size} />;
}

const host = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function Channel({ l, brand, i }) {
  const [c1, c2] = PLATFORM[l.k] || [brand.c1, brand.c2];
  return (
    <a
      className={`snc snc--${l.k}`}
      href={l.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--p1': c1, '--p2': c2, '--i': i }}
      aria-label={`${brand.name} on ${l.name}: ${l.handle} (opens in a new tab)`}
    >
      <span className="snc-in">
        <span className="snc-f">
          <span className="snc-ico">
            <PIcon k={l.k} size={24} />
          </span>
          <strong>{l.name}</strong>
          <span className="snc-h notranslate" translate="no">
            {l.handle}
          </span>
          <span className="snc-hint" aria-hidden="true">
            <Icon name="qr" size={13} /> Scan
          </span>
        </span>
        <span className="snc-b" aria-hidden="true">
          <img src={asset(l.qr)} alt="" width="120" height="120" loading="lazy" decoding="async" />
          <small>{l.name}</small>
        </span>
      </span>
    </a>
  );
}

export default function SocialNetwork() {
  const [cur, setCur] = useState(NETWORK[0].id);
  return (
    <div className="sn">
      <div className="sn-rail" role="tablist" aria-label="Choose a brand">
        {NETWORK.map((b) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            id={`sn-t-${b.id}`}
            aria-controls={`sn-p-${b.id}`}
            aria-selected={cur === b.id}
            className={`sn-tab${cur === b.id ? ' is-on' : ''}`}
            style={{ '--b1': b.c1, '--b2': b.c2 }}
            onClick={() => setCur(b.id)}
          >
            <span className="sn-planet" aria-hidden="true">
              {b.name
                .replace(/[a-z\s]/g, '')
                .slice(0, 3)}
            </span>
            <span className="sn-tt">
              <strong>{b.name}</strong>
              <small>{b.kind}</small>
            </span>
            <span className="sn-count">{b.links.length}</span>
          </button>
        ))}
      </div>

      {NETWORK.map((b) => (
        <div
          key={b.id}
          id={`sn-p-${b.id}`}
          role="tabpanel"
          aria-labelledby={`sn-t-${b.id}`}
          className="sn-world"
          hidden={cur !== b.id}
          style={{ '--b1': b.c1, '--b2': b.c2, '--b0': b.c0 }}
        >
          <div className="sn-hero">
            <span className="sn-orbs" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="sn-hero-copy">
              <span className="sn-kind">{b.kind}</span>
              <h3>{b.name}</h3>
              <p>{b.tag}</p>
              <a className="sn-site" href={b.site} target="_blank" rel="noopener noreferrer">
                {b.siteLabel || host(b.site)} <Icon name="external" size={14} />
              </a>
            </div>
            <a className="sn-ticket" href={b.site} target="_blank" rel="noopener noreferrer" aria-label={`Open ${b.siteLabel || b.name} (opens in a new tab)`}>
              <span className="sn-scan" aria-hidden="true" />
              <img src={asset(b.siteQr)} alt={`QR code that opens ${host(b.site)}`} width="132" height="132" loading="lazy" decoding="async" />
              <small>Scan for the website</small>
            </a>
          </div>
          <div className="sn-grid">
            {b.links.map((l, i) => (
              <Channel key={l.k + l.url} l={l} brand={b} i={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
