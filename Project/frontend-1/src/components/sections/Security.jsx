// Quality & security: radar-scanned honeycomb of checks, a 3D verification stack and the privacy vault.
import { useEffect, useState } from 'react';
import { useInView, prefersReducedMotion } from '../../hooks/useMounted.js';
import { asset } from '../../config/env.js';
import { SECURITY_CHECKS, CHECK_GROUPS, VERIFICATION_LAYERS } from '../../data/quality.js';
import Icon from '../Icon.jsx';

export function SecurityHive() {
  const [active, setActive] = useState(null);
  const [group, setGroup] = useState('all');
  const color = (g) => (CHECK_GROUPS.find((x) => x.id === g) || {}).color;
  const shown = active != null ? SECURITY_CHECKS[active] : null;
  return (
    <div className="hive-wrap">
      <div className="hive-legend" role="group" aria-label="Filter checks">
        <button type="button" className={group === 'all' ? 'is-on' : ''} onClick={() => setGroup('all')}>
          All checks
        </button>
        {CHECK_GROUPS.map((g) => (
          <button key={g.id} type="button" className={group === g.id ? 'is-on' : ''} style={{ '--g': g.color }} onClick={() => setGroup(g.id)}>
            <span className="hive-dot" /> {g.name}
          </button>
        ))}
      </div>
      <div className="hive-stage">
        <div className="hive-radar" aria-hidden="true">
          <span className="radar-sweep" />
          <span className="radar-ring r1" />
          <span className="radar-ring r2" />
          <span className="radar-ring r3" />
        </div>
        <ul className="hive">
          {SECURITY_CHECKS.map((c, i) => (
            <li
              key={c.name}
              className={`hex ${group !== 'all' && group !== c.group ? 'is-dim' : ''} ${active === i ? 'is-active' : ''}`}
              style={{ '--g': color(c.group), '--i': i }}
            >
              <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-describedby="hive-detail">
                <Icon name={c.icon} size={22} />
                <span>{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="hive-detail" id="hive-detail" aria-live="polite">
        {shown ? (
          <>
            <span className="hive-detail-icon" style={{ '--g': color(shown.group) }}>
              <Icon name={shown.icon} size={22} />
            </span>
            <div>
              <strong>{shown.name}</strong>
              <p>{shown.text}</p>
            </div>
          </>
        ) : (
          <p>Hover or tap any check to see what it does.</p>
        )}
      </div>
    </div>
  );
}

/** Verification as an ID card being stamped: each protocol lands as a stamp, the list ticks along with it. */
export function VerificationStack() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setK(VERIFICATION_LAYERS.length);
      return undefined;
    }
    const t = setTimeout(() => setK((n) => (n >= VERIFICATION_LAYERS.length ? 0 : n + 1)), k >= VERIFICATION_LAYERS.length ? 3000 : 900);
    return () => clearTimeout(t);
  }, [inView, k]);
  return (
    <div className="stamps" ref={ref}>
      <div className="idcard" aria-hidden="true">
        <div className="id-head">
          <span className="id-photo">
            <img src={asset('/images/people/finance.svg')} alt="Illustration of a panel member whose personal details are kept private" width="90" height="108" />
          </span>
          <span className="id-lines">
            <strong>Member ID</strong>
            <i />
            <i />
            <i className="short" />
          </span>
        </div>
        <div className="id-grid">
          {VERIFICATION_LAYERS.map((l, i) => (
            <span key={l.name} className={`id-stamp ${i < k ? 'is-on' : ''}`} style={{ '--i': i }}>
              <Icon name={l.icon} size={16} />
            </span>
          ))}
        </div>
        <span className={`id-verified ${k >= VERIFICATION_LAYERS.length ? 'is-on' : ''}`}>Verified</span>
      </div>
      <ol className="st-list">
        {VERIFICATION_LAYERS.map((l, i) => (
          <li key={l.name} className={i < k ? 'is-on' : i === k ? 'is-now' : ''}>
            <span className="st-ico">
              <Icon name={i < k ? 'check' : l.icon} size={16} />
            </span>
            <span>
              <strong>{l.name}</strong>
              <small>{l.text}</small>
            </span>
          </li>
        ))}
      </ol>
      <p className="vstack-note">
        <Icon name="search" size={18} /> Our quality team also checks professional credentials and employment by hand, where applicable.
      </p>
    </div>
  );
}

/** Privacy as a force field: your details float safely inside a glowing shield; four promises orbit outside. */
export function PrivacyVault() {
  return (
    <div className="ffield" data-reveal>
      <div className="ff-stage" aria-hidden="true">
        <span className="ff-wave w1" />
        <span className="ff-wave w2" />
        <span className="ff-shield">
          {['id', 'mail', 'phone', 'pin'].map((ic, i) => (
            <i key={ic} style={{ '--i': i }}>
              <Icon name={ic} size={16} />
            </i>
          ))}
          <Icon name="lock" size={30} />
        </span>
        <span className="ff-zap z1" />
        <span className="ff-zap z2" />
      </div>
      <div className="ff-copy">
        <h3>Your details stay with us</h3>
        <p>We don’t sell, rent or share your personal details. Answers are reported in aggregate, never tied to your name.</p>
        <ul className="ff-points">
          {[
            ['lock', 'Encrypted storage & transfer'],
            ['shield', 'ISO/IEC 27001 information security'],
            ['x', 'No spam, no sales calls'],
            ['user', 'Delete your data whenever you want']
          ].map(([ic, t], i) => (
            <li key={t} style={{ '--i': i }}>
              <Icon name={ic} size={16} /> {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
