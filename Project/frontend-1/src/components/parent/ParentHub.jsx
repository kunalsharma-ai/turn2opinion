// The Teen panel's Parent & guardian section (24 Nov 2026): hero, the four-step workflow with who does
// what, and the three cards (Onboarding form, Reward system, Parental consent).
//
// Used in two places, with the same look:
//   mode "guardian"  the guardian's secure page (/parent-consent/), where the forms are filled in and sent;
//   mode "teen"      the Teen's profile (/member/profile/#family), where what the guardian sent is shown.
// Styles: parent-hub.css (prefix pgs-), injected here, using the member tokens when present and light
// fallbacks on the public site, so it works in both places and in dark mode in the member area.
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon.jsx';
import css from './parent-hub.css?inline';
import { CON_LABEL, CONSENT_FACTS, ONB_LABEL, SURVEY_FACTS, tone, workflow } from './parentData.js';

const cx = (...a) => a.filter(Boolean).join(' ');

export function HubStyles() {
  return <style>{css}</style>;
}

export function Chip({ status, children }) {
  const t = tone(status);
  return (
    <span className={cx('pgs-chip', `is-${t}`)}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

/** A ring that fills from 0 to `value` (0..1) once it is on screen. */
export function Ring({ value = 0, size = 64, stroke = 7, children, label }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setOn(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <span className="pgs-ring" ref={ref} style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="pgs-ring-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="pgs-ring-fg" strokeDasharray={c} strokeDashoffset={on ? c * (1 - v) : c} />
      </svg>
      <span className="pgs-ring-in">{children}</span>
    </span>
  );
}

// ------------------------------------------------------------------ hero
function HeroArt() {
  return (
    <svg className="pgs-hero-art" viewBox="0 0 220 180" aria-hidden="true">
      <defs>
        <linearGradient id="phg1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset="1" stopColor="#dfe6ff" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="92" r="78" fill="#ffffff" opacity=".12" />
      <circle className="pgs-orbit" cx="110" cy="92" r="64" fill="none" stroke="#fff" strokeOpacity=".35" strokeDasharray="4 7" />
      {/* the guardian */}
      <g className="pgs-fig pgs-fig--a">
        <circle cx="86" cy="66" r="17" fill="#ffd9b8" />
        <path d="M58 132c0-22 12-38 28-38s28 16 28 38z" fill="#4f6bff" />
      </g>
      {/* the teen */}
      <g className="pgs-fig pgs-fig--b">
        <circle cx="138" cy="82" r="13" fill="#f2c39d" />
        <path d="M117 134c0-17 9-29 21-29s21 12 21 29z" fill="#ff8a5b" />
      </g>
      {/* the shield they share */}
      <g className="pgs-shield">
        <path d="M110 112l22 8v15c0 14-10 24-22 28-12-4-22-14-22-28v-15z" fill="url(#phg1)" stroke="#1f2a6b" strokeOpacity=".25" />
        <path className="pgs-shield-tick" d="M100 136l7 7 14-15" fill="none" stroke="#12a150" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
      </g>
      <g className="pgs-spark">
        <path d="M178 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ffd34d" />
        <path d="M38 52l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" />
      </g>
    </svg>
  );
}

/**
 * The hero. `who` = { teenName, guardianName, relation, ref }; `steps` = the four workflow states.
 */
export function Hero({ mode, who = {}, steps, children }) {
  const done = steps.filter((s) => s === 'done' || s === 'open').length;
  const teen = who.teenName || 'your teen';
  return (
    <header className="pgs-hero">
      <div className="pgs-hero-txt">
        <p className="pgs-eyebrow">
          <Icon name="shield" size={14} /> Teen panel · Parent &amp; guardian section
        </p>
        <h2 className="pgs-hero-h">{mode === 'teen' ? 'Your parent & guardian section' : `Everything for ${teen}’s Teen panel, in one place`}</h2>
        <p className="pgs-hero-p">
          {mode === 'teen'
            ? `The part of your profile that belongs to your ${who.relation || 'parent or guardian'}. It shows their onboarding form, the reward rules and their consent, so you can look through it together. Only you, your guardian and our support team can see it.`
            : `Complete the onboarding form, read how rewards work and give your consent. ${teen} can start their own profile only after both of your steps are done.`}
        </p>
        <ul className="pgs-hero-chips">
          {who.guardianName && (
            <li>
              <Icon name="user" size={14} /> {who.guardianName}
              {who.relation ? ` · ${who.relation}` : ''}
            </li>
          )}
          {who.teenName && (
            <li>
              <Icon name="star" size={14} /> Teen: {who.teenName}
            </li>
          )}
          {who.ref && (
            <li data-allow-copy>
              <Icon name="id" size={14} /> {who.ref}
            </li>
          )}
        </ul>
        {children}
      </div>
      <div className="pgs-hero-side">
        <HeroArt />
        <div className="pgs-hero-meter">
          <Ring value={done / 4} size={58} stroke={6} label={`${done} of 4 steps done`}>
            <b>{done}/4</b>
          </Ring>
          <span>
            <b>{done === 4 ? 'All steps done' : `${done} of 4 steps done`}</b>
            <small>{done === 4 ? 'Surveys are open' : 'Onboarding, consent, profile, surveys'}</small>
          </span>
        </div>
      </div>
    </header>
  );
}

// ------------------------------------------------------------------ the four-step workflow
const STEP_LABEL = { done: 'Done', open: 'Open', 'in-progress': 'In progress', pending: 'Pending', 'not-started': 'Not started', waiting: 'Waiting', locked: 'Not started' };

export function Workflow({ mode, status, teenName = 'your teen' }) {
  const steps = workflow(status);
  const pct = status.profile ? Math.min(100, status.profile.percent) : 0;
  const rows = [
    { who: 'parent', icon: 'clipboard', t: 'Parent onboarding form', d: 'About you, your household and how to reach you.', s: steps[0] },
    { who: 'parent', icon: 'shield', t: 'Parental consent', d: `The agreement and your permissions for ${teenName}.`, s: steps[1] },
    { who: 'teen', icon: 'map', t: 'Basic profile', d: status.profile ? `${pct}% of the About you profiles done.` : `${teenName} answers the About you profiles.`, s: steps[2], bar: status.profile ? pct : null },
    { who: 'teen', icon: 'target', t: 'Eligible surveys', d: status.surveys?.open ? (status.surveys.count ? `${status.surveys.count} available now.` : 'Open. New invitations appear on the Surveys page.') : 'Open once the three steps before are done.', s: steps[3] }
  ];
  const next = steps.findIndex((s) => s !== 'done' && s !== 'open');
  return (
    <section className="pgs-flow" aria-labelledby="pgs-flow-h">
      <div className="pgs-flow-head">
        <div>
          <h3 id="pgs-flow-h">{mode === 'teen' ? 'How you get to surveys' : `How ${teenName} gets to surveys`}</h3>
          <p>Four steps, in order. The parent does the first two, the teen does the last two.</p>
        </div>
        <ul className="pgs-legend" aria-label="Who does what">
          <li className="is-parent">Parent or guardian</li>
          <li className="is-teen">Teen</li>
        </ul>
      </div>
      <ol className="pgs-steps">
        {rows.map((r, i) => (
          <li key={r.t} className={cx('pgs-step', `is-${r.who}`, `st-${r.s}`, i === next && 'is-next')} style={{ '--i': i }}>
            <span className="pgs-step-dot" aria-hidden="true">
              {r.s === 'done' || r.s === 'open' ? <Icon name="check" size={16} strokeWidth={3} /> : <Icon name={r.icon} size={16} />}
            </span>
            <div className="pgs-step-body">
              <small className="pgs-step-who">
                Step {i + 1} · {r.who === 'parent' ? 'Parent or guardian' : 'Teen'}
              </small>
              <b>{r.t}</b>
              <p>{r.d}</p>
              {r.bar != null && (
                <span className="pgs-bar" aria-hidden="true">
                  <i style={{ '--p': r.bar / 100 }} />
                </span>
              )}
            </div>
            <Chip status={r.s === 'done' ? 'done' : r.s}>{STEP_LABEL[r.s] || r.s}</Chip>
          </li>
        ))}
      </ol>
      <div className="pgs-duty">
        <div className="is-parent">
          <b>
            <Icon name="user" size={15} /> What the parent or guardian does
          </b>
          <p>Fills in the onboarding form about themselves and their household, and gives or refuses consent. Never the teen’s own profile or surveys.</p>
        </div>
        <div className="is-teen">
          <b>
            <Icon name="star" size={15} /> What the teen does
          </b>
          <p>Answers their own profile sections and chooses which surveys to take. They can skip a question or stop at any time.</p>
        </div>
      </div>
      {mode === 'teen' && next === 2 && (
        <p className="pgs-flow-next">
          <Icon name="arrow" size={15} /> Next: finish your About you profiles to open surveys.
        </p>
      )}
    </section>
  );
}

// ------------------------------------------------------------------ the three cards
function ArtOnboarding({ pct }) {
  return (
    <svg viewBox="0 0 160 110" className="pgs-art pgs-art--onb" aria-hidden="true">
      <rect x="40" y="10" width="80" height="94" rx="10" fill="#fff" opacity=".96" />
      <rect x="62" y="4" width="36" height="14" rx="6" fill="#c9c2ff" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k} className="pgs-art-row" style={{ '--k': k }}>
          <rect x="52" y={30 + k * 18} width="10" height="10" rx="3" fill={k / 4 < pct ? '#12a150' : '#e5e2f7'} />
          <rect x="68" y={32 + k * 18} width={40 - (k % 2) * 12} height="6" rx="3" fill="#d6d1f5" />
        </g>
      ))}
      <g className="pgs-art-pen">
        <path d="M126 70l10-10 6 6-10 10z" fill="#ffcf4a" />
        <path d="M126 70l-3 9 9-3z" fill="#1f2a6b" />
      </g>
    </svg>
  );
}
function ArtRewards() {
  return (
    <svg viewBox="0 0 160 110" className="pgs-art pgs-art--rw" aria-hidden="true">
      <ellipse cx="80" cy="96" rx="44" ry="7" fill="#000" opacity=".12" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <ellipse cx="80" cy={88 - k * 9} rx="26" ry="8" fill="#e0a419" />
          <ellipse cx="80" cy={85 - k * 9} rx="26" ry="8" fill="#ffd34d" />
        </g>
      ))}
      <g className="pgs-coin pgs-coin--a">
        <circle cx="44" cy="40" r="12" fill="#ffd34d" stroke="#e0a419" strokeWidth="3" />
        <text x="44" y="45" textAnchor="middle" fontSize="13" fontWeight="800" fill="#b07800">P</text>
      </g>
      <g className="pgs-coin pgs-coin--b">
        <circle cx="118" cy="30" r="9" fill="#ffd34d" stroke="#e0a419" strokeWidth="3" />
      </g>
      <path className="pgs-twinkle" d="M120 60l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff" />
    </svg>
  );
}
function ArtConsent({ sealed }) {
  return (
    <svg viewBox="0 0 160 110" className={cx('pgs-art pgs-art--con', sealed && 'is-sealed')} aria-hidden="true">
      <rect x="34" y="12" width="70" height="88" rx="8" fill="#fff" opacity=".96" />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x="44" y={26 + k * 12} width={k === 4 ? 30 : 50} height="5" rx="2.5" fill="#cdeee6" />
      ))}
      <g className="pgs-seal">
        <circle cx="108" cy="74" r="22" fill="#12a17f" />
        <circle cx="108" cy="74" r="16" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="2 3" />
        <path className="pgs-seal-tick" d="M99 74l6 6 12-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
      </g>
    </svg>
  );
}

/**
 * The three cards. `cards` = { onboarding: {status, pct, meta, cta, note}, rewards: {...}, consent: {...} }.
 */
export function Cards({ cards, onOpen }) {
  const o = cards.onboarding;
  const r = cards.rewards;
  const c = cards.consent;
  return (
    <section className="pgs-cards" aria-label="Parent forms and information">
      <button type="button" className="pgs-card pgs-card--onb" onClick={() => onOpen('onboarding')} style={{ '--i': 0 }} aria-describedby="pgs-card-onb-d">
        <span className="pgs-card-art">
          <ArtOnboarding pct={o.pct / 100} />
          {o.status === 'completed' ? (
            <Ring value={1} size={54} stroke={6} label="Form sent">
              <Icon name="check" size={22} strokeWidth={3} />
            </Ring>
          ) : (
            <Ring value={o.pct / 100} size={54} stroke={6} label={`${o.pct}% answered`}>
              <b>{o.pct}%</b>
            </Ring>
          )}
        </span>
        <span className="pgs-card-body">
          <span className="pgs-card-top">
            <small>Card 1</small>
            <Chip status={o.status}>{ONB_LABEL[o.status]}</Chip>
          </span>
          <b className="pgs-card-t">Parent onboarding form</b>
          <span className="pgs-card-d" id="pgs-card-onb-d">
            {o.note || `All ${SURVEY_FACTS.questions} questions in ${SURVEY_FACTS.sections} sections: about you, your household, staying in touch, panel choices, where you live, your home, work and income, and the optional health section.`}
          </span>
          <span className="pgs-card-meta">{o.meta}</span>
          <span className="pgs-card-cta">
            {o.cta} <Icon name="arrow" size={16} />
          </span>
        </span>
      </button>

      <button type="button" className="pgs-card pgs-card--rw" onClick={() => onOpen('rewards')} style={{ '--i': 1 }} aria-describedby="pgs-card-rw-d">
        <span className="pgs-card-art">
          <ArtRewards />
        </span>
        <span className="pgs-card-body">
          <span className="pgs-card-top">
            <small>Card 2</small>
            <Chip status={r.status}>{r.label}</Chip>
          </span>
          <b className="pgs-card-t">Parent reward system</b>
          <span className="pgs-card-d" id="pgs-card-rw-d">
            How your teen earns points, which activities count, how points are worked out and credited, the conditions, and how you can follow them.
          </span>
          <span className="pgs-card-meta">{r.meta}</span>
          <span className="pgs-card-cta">
            {r.cta} <Icon name="arrow" size={16} />
          </span>
        </span>
      </button>

      <button type="button" className="pgs-card pgs-card--con" onClick={() => onOpen('consent')} style={{ '--i': 2 }} aria-describedby="pgs-card-con-d" aria-disabled={c.locked || undefined}>
        <span className="pgs-card-art">
          <ArtConsent sealed={c.status === 'submitted'} />
        </span>
        <span className="pgs-card-body">
          <span className="pgs-card-top">
            <small>Card 3</small>
            <Chip status={c.status}>{CON_LABEL[c.status]}</Chip>
          </span>
          <b className="pgs-card-t">Parental consent form</b>
          <span className="pgs-card-d" id="pgs-card-con-d">
            {c.note || `Agreement ${CONSENT_FACTS.version}: ${CONSENT_FACTS.sections} sections, the ${CONSENT_FACTS.declaration}-point declaration and ${CONSENT_FACTS.permissions} permissions (${CONSENT_FACTS.required} required). Nothing is ticked for you.`}
          </span>
          <span className="pgs-card-meta">{c.meta}</span>
          <span className="pgs-card-cta">
            {c.locked && <Icon name="lock" size={15} />} {c.cta} {!c.locked && <Icon name="arrow" size={16} />}
          </span>
        </span>
      </button>
    </section>
  );
}

// ------------------------------------------------------------------ sheet (full form / guide view)
/** A full-height panel over the page, with an opening and closing transition. */
export function Sheet({ open, onClose, title, kicker, status, tone: t = 'onb', actions, children }) {
  const [shown, setShown] = useState(open);
  const [leaving, setLeaving] = useState(false);
  const id = useId();
  const box = useRef(null);
  const back = useRef(null);
  useEffect(() => {
    if (open) {
      back.current = document.activeElement;
      setShown(true);
      setLeaving(false);
    } else if (shown) {
      setLeaving(true);
      const tm = setTimeout(() => {
        setShown(false);
        setLeaving(false);
        back.current?.focus?.();
      }, 220);
      return () => clearTimeout(tm);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!shown) return;
    const h = document.documentElement;
    h.classList.add('pgs-lock');
    const key = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    requestAnimationFrame(() => box.current?.focus());
    return () => {
      h.classList.remove('pgs-lock');
      window.removeEventListener('keydown', key);
    };
  }, [shown]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!shown || typeof document === 'undefined') return null;
  return createPortal(
    <div className={cx('pgs-sheet-wrap', leaving && 'is-leaving')} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <style>{css}</style>
      <div className={cx('pgs-sheet', `pgs-sheet--${t}`)} role="dialog" aria-modal="true" aria-labelledby={id} tabIndex={-1} ref={box}>
        <header className="pgs-sheet-head">
          <div className="pgs-sheet-ht">
            {kicker && <small>{kicker}</small>}
            <h2 id={id}>{title}</h2>
          </div>
          <div className="pgs-sheet-act">
            {status}
            {actions}
            <button type="button" className="pgs-x" onClick={onClose} aria-label="Close">
              <Icon name="close" size={18} />
            </button>
          </div>
        </header>
        <div className="pgs-sheet-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
