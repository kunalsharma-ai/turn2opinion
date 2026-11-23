// Member design-system primitives. Every visual value comes from tokens (member.css :root vars,
// painted by theme/appearance.js). No component sets its own colours.
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../components/Icon.jsx';
import { Link } from '../../router/Router.jsx';
import { ENV } from '../../config/env.js';
import { ROUTES } from '../config/memberTypes.js';
import { t, fmt } from '../i18n/t.js';

const cx = (...a) => a.filter(Boolean).join(' ');
export { cx, Icon };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.mbMotion === 'reduce');

/* ---------------- navigation-aware link ---------------- */
/** Link to a member route id ("rewards") or a path. External member pages (the existing app) load fully. */
export function MLink({ to, children, className, onClick, ...rest }) {
  const r = ROUTES[to];
  const path = r ? r.path : to;
  const toast = useToast();
  if (r?.external) {
    if (ENV.DEMO_MODE)
      return (
        <a
          href="#"
          className={className}
          onClick={(e) => {
            e.preventDefault();
            onClick?.(e);
            toast(`Opens your existing ${t(r.label)} page in the live member area.`, 'info');
          }}
          {...rest}
        >
          {children}
        </a>
      );
    return (
      <a href={path} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={path} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/* ---------------- button ---------------- */
export function Button({ variant = 'primary', size = 'md', icon, iconEnd, to, href, busy, children, className, ...rest }) {
  const cls = cx('mb-btn', `mb-btn--${variant}`, `mb-btn--${size}`, busy && 'is-busy', className);
  const inner = (
    <>
      {busy ? <span className="mb-spin" aria-hidden="true" /> : icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children && <span className="mb-btn__label">{children}</span>}
      {iconEnd && !busy && <Icon name={iconEnd} size={size === 'sm' ? 16 : 18} className="mb-btn__end" />}
    </>
  );
  if (to)
    return (
      <MLink to={to} className={cls} {...rest}>
        {inner}
      </MLink>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  return (
    <button type="button" className={cls} disabled={busy || rest.disabled} aria-busy={busy || undefined} {...rest}>
      {inner}
    </button>
  );
}

export function IconButton({ icon, label, badge, className, size = 20, ...rest }) {
  return (
    <button type="button" className={cx('mb-iconbtn', className)} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={size} />
      {badge ? (
        <span className="mb-iconbtn__badge" aria-hidden="true">
          {badge > 9 ? '9+' : badge}
        </span>
      ) : null}
    </button>
  );
}

/* ---------------- card ---------------- */
export function Card({ title, icon, eyebrow, action, children, className, tone, as: Tag = 'section', id, ...rest }) {
  const hid = useId();
  return (
    <Tag className={cx('mb-card', tone && `mb-card--${tone}`, className)} aria-labelledby={title ? hid : undefined} id={id} {...rest}>
      {(title || action) && (
        <header className="mb-card__head">
          <div className="mb-card__title">
            {icon && (
              <span className="mb-card__icon" aria-hidden="true">
                <Icon name={icon} size={18} />
              </span>
            )}
            <div>
              {eyebrow && <p className="mb-eyebrow">{eyebrow}</p>}
              {title && <h2 id={hid}>{title}</h2>}
            </div>
          </div>
          {action && <div className="mb-card__action">{action}</div>}
        </header>
      )}
      {children}
    </Tag>
  );
}

export function Badge({ tone = 'neutral', icon, children, className }) {
  return (
    <span className={cx('mb-badge', `mb-badge--${tone}`, className)}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}

export function Avatar({ name = '', src, size = 40, className }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <span className={cx('mb-avatar', className)} style={{ '--s': `${size}px` }} aria-hidden="true">
      {src ? <img src={src} alt="" width={size} height={size} loading="lazy" /> : <span>{initials || <Icon name="user" size={size * 0.5} />}</span>}
    </span>
  );
}

/* ---------------- progress ---------------- */
export function Progress({ value = 0, max = 100, label, tone, size = 'md', showValue }) {
  const pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
  return (
    <div className={cx('mb-progress', `mb-progress--${size}`, tone && `mb-progress--${tone}`)}>
      <div className="mb-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.round(value)} aria-label={label}>
        <span className="mb-progress__fill" style={{ '--p': pct / 100 }} />
      </div>
      {showValue && <span className="mb-progress__value">{Math.round(pct)}%</span>}
    </div>
  );
}

export function ProgressRing({ value = 0, max = 100, size = 132, stroke = 12, label, tone = 'primary', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const [shown, setShown] = useState(prefersReducedMotion() ? pct : 0);
  useEffect(() => {
    if (prefersReducedMotion()) return setShown(pct);
    const id = requestAnimationFrame(() => setShown(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  const gid = useId().replace(/:/g, '');
  return (
    <div className={cx('mb-ring', `mb-ring--${tone}`)} style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id={`g${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="mb-ring__s1" />
            <stop offset="100%" className="mb-ring__s2" />
          </linearGradient>
        </defs>
        <circle className="mb-ring__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
        <circle
          className="mb-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          stroke={`url(#g${gid})`}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="mb-ring__center">{children}</div>
    </div>
  );
}

/** Number that counts up once when it first appears. */
export function Counter({ value = 0, duration = 900, format }) {
  const [n, setN] = useState(prefersReducedMotion() ? value : 0);
  const from = useRef(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(value);
      return undefined;
    }
    const start = performance.now();
    const a = from.current;
    let raf;
    const step = (now) => {
      // the first frame time can be a little before `start`: clamp so the number never dips below its start
      const k = Math.min(1, Math.max(0, (now - start) / duration));
      const e = 1 - Math.pow(1 - k, 3);
      setN(Math.round(a + (value - a) * e));
      if (k < 1) raf = requestAnimationFrame(step);
      else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className="mb-num">{format ? format(n) : fmt(n)}</span>;
}

/* ---------------- form controls ---------------- */
export function Toggle({ checked, onChange, label, description, id, disabled }) {
  const auto = useId();
  const tid = id || auto;
  return (
    <div className={cx('mb-toggle', disabled && 'is-disabled')}>
      <div className="mb-toggle__text">
        <label htmlFor={tid} className="mb-toggle__label">
          {label}
        </label>
        {description && (
          <p className="mb-toggle__desc" id={`${tid}-d`}>
            {description}
          </p>
        )}
      </div>
      <button
        id={tid}
        type="button"
        role="switch"
        aria-checked={!!checked}
        aria-describedby={description ? `${tid}-d` : undefined}
        className="mb-switch"
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span className="mb-switch__knob" />
      </button>
    </div>
  );
}

/** Single-choice pill group (radio semantics, arrow keys move). */
export function Segmented({ options, value, onChange, label, size = 'md' }) {
  const refs = useRef([]);
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const onKey = (e) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (idx + d + options.length) % options.length;
    onChange(options[n].value);
    refs.current[n]?.focus();
  };
  return (
    <div className={cx('mb-seg', `mb-seg--${size}`)} role="radiogroup" aria-label={label} onKeyDown={onKey}>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => (refs.current[i] = el)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          className={cx('mb-seg__opt', o.value === value && 'is-on')}
          onClick={() => onChange(o.value)}
        >
          {o.icon && <Icon name={o.icon} size={16} />}
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export function Tabs({ tabs, value, onChange, label }) {
  const refs = useRef([]);
  const idx = Math.max(0, tabs.findIndex((x) => x.value === value));
  return (
    <div
      className="mb-tabs"
      role="tablist"
      aria-label={label}
      onKeyDown={(e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        const n = (idx + d + tabs.length) % tabs.length;
        onChange(tabs[n].value);
        refs.current[n]?.focus();
      }}
    >
      {tabs.map((x, i) => (
        <button
          key={x.value}
          ref={(el) => (refs.current[i] = el)}
          role="tab"
          type="button"
          aria-selected={x.value === value}
          tabIndex={x.value === value ? 0 : -1}
          className={cx('mb-tab', x.value === value && 'is-on')}
          onClick={() => onChange(x.value)}
        >
          {x.label}
          {x.count != null && <span className="mb-tab__count">{x.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Field({ label, hint, error, children, id }) {
  return (
    <div className={cx('mb-field', error && 'has-error')}>
      <label className="mb-field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && !error && <p className="mb-field__hint">{hint}</p>}
      {error && (
        <p className="mb-field__error" role="alert">
          <Icon name="x" size={13} /> {error}
        </p>
      )}
    </div>
  );
}

export function Tooltip({ text, children }) {
  const id = useId();
  return (
    <span className="mb-tip" data-tip={text} aria-describedby={id}>
      {children}
      <span role="tooltip" id={id} className="mb-tip__bubble">
        {text}
      </span>
    </span>
  );
}

/* ---------------- states ---------------- */
export function Skeleton({ h = 16, w = '100%', r, className, lines }) {
  if (lines)
    return (
      <div className="mb-skel-lines" aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className="mb-skel" style={{ height: h, width: i === lines - 1 ? '62%' : '100%' }} />
        ))}
      </div>
    );
  return <span className={cx('mb-skel', className)} aria-hidden="true" style={{ height: h, width: w, borderRadius: r }} />;
}

export function EmptyState({ icon = 'sparkles', title, children, action }) {
  return (
    <div className="mb-empty">
      <span className="mb-empty__art" aria-hidden="true">
        <span className="mb-empty__orb" />
        <Icon name={icon} size={26} />
      </span>
      <p className="mb-empty__title">{title}</p>
      {children && <p className="mb-empty__text">{children}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ text, onRetry, compact }) {
  return (
    <div className={cx('mb-error', compact && 'is-compact')} role="alert">
      <span className="mb-error__icon" aria-hidden="true">
        <Icon name="refresh" size={20} />
      </span>
      <div>
        <p className="mb-error__title">{t('st8.error')}</p>
        {text && <p className="mb-error__text">{text}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" icon="refresh" onClick={onRetry}>
          {t('st8.retry')}
        </Button>
      )}
    </div>
  );
}

/** Renders loading / error / content for one section. */
export function Section({ status, skeleton, error, onRetry, children }) {
  if (status === 'loading') return <div aria-busy="true">{skeleton}</div>;
  if (status === 'error') return <ErrorState text={error} onRetry={onRetry} compact />;
  return children;
}

export function StatTile({ icon, label, value, tone = 'primary', hint }) {
  return (
    <div className={cx('mb-stat', `mb-stat--${tone}`)}>
      <span className="mb-stat__icon" aria-hidden="true">
        <Icon name={icon} size={18} />
      </span>
      <span className="mb-stat__value">{value}</span>
      <span className="mb-stat__label">{label}</span>
      {hint && <span className="mb-stat__hint">{hint}</span>}
    </div>
  );
}

/* ---------------- modal / drawer ---------------- */
export function Modal({ open, onClose, title, children, side, labelledBy }) {
  const ref = useRef(null);
  const last = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    last.current = document.activeElement;
    const el = ref.current;
    const focusables = () => el?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [];
    requestAnimationFrame(() => (focusables()[0] || el)?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = [...focusables()];
        if (!f.length) return;
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('mb-locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('mb-locked');
      last.current?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  // Rendered at the app root: an opener inside the blurred, sticky header would otherwise become
  // the containing block of this fixed layer and clip it to the header's height.
  const host = typeof document !== 'undefined' ? document.querySelector('.mb-root') || document.body : null;
  const layer = (
    <div className={cx('mb-modal', side && `mb-modal--${side}`)}>
      <div className="mb-modal__scrim" onClick={onClose} aria-hidden="true" />
      <div className="mb-modal__panel" role="dialog" aria-modal="true" aria-label={labelledBy ? undefined : title} aria-labelledby={labelledBy} ref={ref} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
  return host ? createPortal(layer, host) : layer;
}

/* ---------------- toast ---------------- */
const ToastCtx = createContext(() => {});
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((text, tone = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((l) => [...l.slice(-2), { id, text, tone }]);
    setTimeout(() => setItems((l) => l.filter((x) => x.id !== id)), 4200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="mb-toasts" role="status" aria-live="polite">
        {items.map((x) => (
          <div key={x.id} className={cx('mb-toast', `mb-toast--${x.tone}`)}>
            <Icon name={x.tone === 'error' ? 'x' : x.tone === 'info' ? 'bell' : 'check'} size={16} />
            <span>{x.text}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

/** Closes a popover on outside click / Escape. */
export function useDismiss(open, onClose, ref) {
  useEffect(() => {
    if (!open) return undefined;
    const down = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const key = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open, onClose, ref]);
}
