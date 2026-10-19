// How one review is displayed everywhere on the site (testimonials, reviews page wall, previews).
//
// The two audiences get two completely different objects, not one card in two colours:
//
//   consumer      an AIRMAIL POSTCARD — warm paper, striped airmail border, the member's country
//                 flag as a perforated postage stamp, and the rating as a postmark carrying the gem.
//   professional  a CONFERENCE PASS — midnight card with a holographic sheen, a lanyard slot, a
//                 "verified B2B member" band, the flag on a country chip and the gem on a chip.
//
// Both always show: name, designation (and company) if given, country name + flag, the score as a
// gem + number + plain word, and the words they wrote.
import { useId } from 'react';
import { COUNTRIES } from '../../data/countries.js';
import { AUDIENCES, FACETS, levelOf } from '../../data/reviewFacets.js';
import { Flag } from '../Brand.jsx';
import Icon from '../Icon.jsx';
import Gem from './Gem.jsx';

export const countryName = (c) => (COUNTRIES.find((x) => x.c === c) || {}).n || '';
export const roleLine = (r) => [r.role && r.role !== 'Member' ? r.role : '', r.company].filter(Boolean).join(' · ');
const fmtDate = (d) => {
  const t = Date.parse(d);
  return isNaN(t) ? '' : new Date(t).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

/** Gem + number + word. `size` in px. */
export function GemBadge({ rating, size = 34, compact = false }) {
  if (!rating) {
    return (
      <span className="gbadge is-none">
        <Icon name="quote" size={14} /> <small>No score on record</small>
      </span>
    );
  }
  const L = levelOf(rating);
  return (
    <span
      className={`gbadge lv-${L.key} ${compact ? 'is-compact' : ''}`}
      style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3 }}
      role="img"
      aria-label={`Rated ${rating} out of 5 — ${L.word}`}
    >
      <Gem level={rating} size={size} motion="float" />
      <span className="gb-txt" aria-hidden="true">
        <b>
          {rating}
          <i>/5</i>
        </b>
        {!compact && <small>{L.word}</small>}
      </span>
    </span>
  );
}

function Stamp({ code, place }) {
  return (
    <span className="pc-stamp" aria-hidden="true">
      <span className="pcs-paper">
        {code ? <Flag code={code} size={44} title={place} /> : <Icon name="globe" size={30} />}
        <small>{place || 'Worldwide'}</small>
      </span>
    </span>
  );
}

function Postmark({ rating }) {
  const L = levelOf(rating || 4);
  const arc = `pcm${useId().replace(/:/g, '')}`;
  return (
    <span className="pc-mark" style={{ '--g1': L.c1, '--g2': L.c2, '--g3': L.c3 }} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="pcm-ring">
        <defs>
          <path id={arc} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <circle cx="60" cy="60" r="54" />
        <circle cx="60" cy="60" r="36" />
        <text>
          <textPath href={`#${arc}`} startOffset="0">
            TURN2OPINION · MEMBER VOICE · {rating ? `${rating}/5 ${L.word.toUpperCase()}` : 'ON RECORD'} ·
          </textPath>
        </text>
      </svg>
      <span className="pcm-gem">{rating ? <Gem level={rating} size={40} motion="still" /> : <Icon name="quote" size={22} />}</span>
      <span className="pcm-waves" />
    </span>
  );
}

export default function VoiceCard({ r, size = 'md', fresh = false, style, className = '', clamp = 0 }) {
  const aud = r.audience === 'professional' ? 'professional' : 'consumer';
  const world = AUDIENCES[aud];
  const L = levelOf(r.rating || 4);
  const place = countryName(r.country);
  const role = roleLine(r);
  const facets = FACETS.filter((f) => (r.facets || {})[f.key] > 0);
  const text = clamp && r.text.length > clamp ? `${r.text.slice(0, clamp - 1).trimEnd()}…` : r.text;
  const date = fmtDate(r.date);
  const vars = { '--g1': L.c1, '--g2': L.c2, '--g3': L.c3, '--a1': world.c1, '--a2': world.c2, '--a3': world.c3, ...style };

  if (aud === 'professional') {
    return (
      <article className={`vcard pass sz-${size} lv-${L.key} ${fresh ? 'is-fresh' : ''} ${className}`} style={vars}>
        <span className="ps-holo" aria-hidden="true" />
        <span className="ps-slot" aria-hidden="true" />
        {fresh && (
          <span className="vc-new">
            <i /> Just posted · live
          </span>
        )}
        <header className="ps-band">
          <span>
            <Icon name="briefcase" size={13} /> B2B panel
          </span>
          <span className="ps-verified">
            <Icon name="shield" size={12} /> Verified member
          </span>
        </header>
        <div className="ps-body">
          <div className="ps-id">
            <span className="ps-avatar notranslate" translate="no" aria-hidden="true">
              {r.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h3 className="ps-name notranslate" translate="no">
                {r.name}
              </h3>
              <p className="ps-role">{role || 'Business professional'}</p>
            </div>
          </div>
          <blockquote className="ps-quote">
            <p>“{text}”</p>
          </blockquote>
          {size !== 'sm' && facets.length > 0 && (
            <ul className="vc-facets" aria-label="Facet scores">
              {facets.map((f) => (
                <li key={f.key} style={{ '--f1': f.c1, '--f2': f.c2, '--p': r.facets[f.key] / 5 }}>
                  <Icon name={f.icon} size={12} />
                  <span>{f.label}</span>
                  <i aria-hidden="true" />
                  <b>{r.facets[f.key]}</b>
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className="ps-foot">
          <span className="ps-country">
            {r.country ? <Flag code={r.country} size={18} title={place} /> : <Icon name="globe" size={14} />}
            <span>{place || 'Worldwide'}</span>
          </span>
          <GemBadge rating={r.rating} size={30} />
          <span className="ps-code" aria-hidden="true" />
        </footer>
        {r.mine && <span className="vc-mine">Your review</span>}
      </article>
    );
  }

  return (
    <article className={`vcard postcard sz-${size} lv-${L.key} ${fresh ? 'is-fresh' : ''} ${className}`} style={vars}>
      <span className="pc-air" aria-hidden="true" />
      {fresh && (
        <span className="vc-new">
          <i /> Just posted · live
        </span>
      )}
      <div className="pc-grid">
        <div className="pc-left">
          <p className="pc-kicker">
            <Icon name="plane" size={13} /> Airmail from {place || 'a member'}
          </p>
          <blockquote className="pc-quote">
            <p>“{text}”</p>
          </blockquote>
          {r.tags && r.tags.length > 0 && size !== 'sm' && (
            <ul className="pc-tags">
              {r.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="pc-right">
          <Stamp code={r.country} place={place} />
          <Postmark rating={r.rating} />
          <div className="pc-addr">
            <strong className="notranslate" translate="no">
              {r.name}
            </strong>
            <span>{role || 'Turn2Opinion member'}</span>
            <span className="pc-place">
              {r.country && <Flag code={r.country} size={14} />} {place || 'Worldwide'}
            </span>
            {date && <span className="pc-date">{date}</span>}
          </div>
        </div>
      </div>
      <footer className="pc-foot">
        <GemBadge rating={r.rating} size={28} />
        <span className="pc-aud">
          <Icon name="bag" size={12} /> Consumer
        </span>
      </footer>
      {r.mine && <span className="vc-mine">Your review</span>}
    </article>
  );
}
