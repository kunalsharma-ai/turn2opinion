// DashboardShell: header, sidebar (desktop), bottom bar + drawer (phones), notification centre,
// appearance, language and sound controls. Grouped so the header never shows more than five
// controls side by side: points, quality, notifications, a settings cluster and the avatar.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePath, useRouter } from '../../router/Router.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { soundEnabled, setSoundPref, onSoundChange } from '../../utils/soundPref.js';
import { asset, ENV } from '../../config/env.js';
import { store } from '../../utils/storage.js';
import { NAV, BOTTOM_NAV, ROUTES } from '../config/memberTypes.js';
import { PAGE_TOPIC } from '../data/help.js';
import { useMe, useSection, profileCompletion, qualityTier } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { demoPrefs, setDemoPrefs } from '../data/demo.js';
import { useAppearance } from '../theme/AppearanceProvider.jsx';
import { PALETTES } from '../theme/appearance.js';
import { feedback } from '../theme/feedback.js';
import { t, fmt, relTime } from '../i18n/t.js';
import { Avatar, Badge, Button, Counter, Icon, IconButton, MLink, Modal, Segmented, Tabs, cx, useDismiss, useToast } from './ui.jsx';

const isActive = (path, id) => {
  const r = ROUTES[id];
  return r && !r.external && path.startsWith(r.path.replace(/\/$/, ''));
};

/* ---------------- brand ---------------- */
function Brand() {
  return (
    <MLink to="dashboard" className="mb-brand" aria-label={`${t('brand')} – ${t('nav.dashboard')}`}>
      <img src={asset('/images/brand/turn2opinion-logo-320.webp')} srcSet={`${asset('/images/brand/turn2opinion-logo-320.webp')} 320w, ${asset('/images/brand/turn2opinion-logo-640.webp')} 640w`} sizes="140px" alt="" width="140" height="43" decoding="async" />
    </MLink>
  );
}

/* ---------------- sound ---------------- */
export function useSound() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    setOn(soundEnabled());
    return onSoundChange(setOn);
  }, []);
  const set = (v) => {
    setSoundPref(v);
    if (v) feedback('toggle');
  };
  return [on, set];
}

export function SoundControl({ compact }) {
  const [on, set] = useSound();
  const label = on ? t('hdr.sound.on') : t('hdr.sound.off');
  return (
    <button type="button" className={cx('mb-chipbtn', !on && 'is-off')} aria-pressed={on} onClick={() => set(!on)} title={label}>
      <Icon name={on ? 'volume' : 'volumeOff'} size={18} />
      {!compact && <span>{label}</span>}
    </button>
  );
}

/* ---------------- language ---------------- */
export function LanguageSelector({ compact }) {
  const { meta, openPicker } = useI18n();
  return (
    <button type="button" className="mb-chipbtn" onClick={() => openPicker?.()} aria-label={`${t('hdr.language')}: ${meta?.name || 'English'}`} title={t('hdr.language')}>
      <Icon name="globe" size={18} />
      {!compact && <span>{meta?.native || 'English'}</span>}
      {!compact && <Icon name="chevron" size={14} />}
    </button>
  );
}

/* ---------------- appearance (theme + palette) ---------------- */
export function ThemeSelector() {
  const { appearance, update } = useAppearance();
  return (
    <Segmented
      label={t('ap.mode')}
      value={appearance.mode}
      onChange={(mode) => update({ mode })}
      options={[
        { value: 'light', label: t('ap.light'), icon: 'spark' },
        { value: 'dark', label: t('ap.dark'), icon: 'eye' },
        { value: 'night', label: t('ap.night'), icon: 'clock' },
        { value: 'system', label: t('ap.system'), icon: 'refresh' }
      ]}
    />
  );
}

export function ColorPaletteSelector({ withCustom = true }) {
  const { appearance, update, info } = useAppearance();
  const current = info.palette;
  return (
    <div className="mb-palettes">
      <div className="mb-palettes__grid" role="radiogroup" aria-label={t('ap.palette')}>
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={current === p.id}
            className={cx('mb-swatch', current === p.id && 'is-on')}
            style={{ '--sw1': p.hex, '--sw2': p.alt }}
            onClick={() => update({ palette: p.id })}
          >
            <span className="mb-swatch__dot" aria-hidden="true">
              {current === p.id && <Icon name="check" size={14} strokeWidth={3} />}
            </span>
            <span className="mb-swatch__name">{p.label}</span>
          </button>
        ))}
        {withCustom && (
          <button
            type="button"
            role="radio"
            aria-checked={current === 'custom'}
            className={cx('mb-swatch mb-swatch--custom', current === 'custom' && 'is-on')}
            style={{ '--sw1': appearance.custom, '--sw2': appearance.custom }}
            onClick={() => update({ palette: 'custom' })}
          >
            <span className="mb-swatch__dot" aria-hidden="true">
              {current === 'custom' ? <Icon name="check" size={14} strokeWidth={3} /> : <Icon name="pen" size={13} />}
            </span>
            <span className="mb-swatch__name">{t('ap.custom')}</span>
          </button>
        )}
      </div>
      {withCustom && current === 'custom' && <CustomColor />}
    </div>
  );
}

export function CustomColor() {
  const { appearance, update, info } = useAppearance();
  const [hex, setHex] = useState(appearance.custom);
  useEffect(() => setHex(appearance.custom), [appearance.custom]);
  const commit = (v) => {
    if (/^#[0-9a-f]{6}$/i.test(v)) update({ custom: v.toLowerCase(), palette: 'custom' });
  };
  return (
    <div className="mb-custom">
      <label className="mb-custom__picker">
        <input type="color" value={appearance.custom} onChange={(e) => commit(e.target.value)} aria-label={t('ap.pick')} />
        <span className="mb-custom__chip" style={{ background: appearance.custom }} aria-hidden="true" />
      </label>
      <div className="mb-custom__text">
        <label htmlFor="mb-hex" className="mb-field__label">
          {t('ap.customColor')}
        </label>
        <input
          id="mb-hex"
          className="mb-input mb-input--mono"
          value={hex}
          maxLength={7}
          spellCheck={false}
          onChange={(e) => {
            const v = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
            setHex(v);
            commit(v);
          }}
        />
        {info.adjusted && <p className="mb-field__hint">{t('ap.contrastFix')}</p>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => update({ palette: 'turn2', custom: '#1f5bff' })}>
        {t('ap.reset')}
      </Button>
    </div>
  );
}

function AppearanceMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, ref);
  return (
    <div className="mb-pop" ref={ref}>
      <IconButton icon="layers" label={t('hdr.appearance')} aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen((v) => !v)} />
      {open && (
        <div className="mb-pop__panel mb-pop__panel--appearance" role="dialog" aria-label={t('hdr.appearance')}>
          <p className="mb-pop__title">{t('ap.mode')}</p>
          <ThemeSelector />
          <p className="mb-pop__title">{t('ap.palette')}</p>
          <ColorPaletteSelector />
          <div className="mb-pop__row">
            <SoundControl />
            <LanguageSelector />
          </div>
          <MLink to="settings" className="mb-pop__link" onClick={close}>
            {t('nav.settings')} <Icon name="chevronRight" size={16} />
          </MLink>
        </div>
      )}
    </div>
  );
}

/* ---------------- notifications ---------------- */
const READ_KEY = 't2o_member_read_alerts';
export function NotificationCenter() {
  const [alerts, status, retry] = useSection('alerts');
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('all');
  const [read, setRead] = useState([]);
  useEffect(() => setRead(store.get(READ_KEY, []) || []), []);
  const list = alerts || [];
  const unread = list.filter((a) => !read.includes(a.id));
  const shown = tab === 'unread' ? unread : list;
  const mark = (ids) => {
    const next = [...new Set([...read, ...ids])].slice(-300);
    setRead(next);
    store.set(READ_KEY, next);
  };
  const first = useRef(true);
  useEffect(() => {
    if (first.current && unread.length && status === 'ready') {
      first.current = false;
      feedback('notify');
    }
  }, [status, unread.length]);
  return (
    <>
      <IconButton icon="bell" label={unread.length ? `${t('hdr.notifications')} – ${t('hdr.unread', { n: unread.length })}` : t('hdr.notifications')} badge={unread.length} onClick={() => setOpen(true)} aria-haspopup="dialog" />
      <Modal open={open} onClose={() => setOpen(false)} title={t('nt.title')} side="right">
        <div className="mb-drawer">
          <header className="mb-drawer__head">
            <h2>{t('nt.title')}</h2>
            <IconButton icon="close" label={t('nt.close')} onClick={() => setOpen(false)} />
          </header>
          <div className="mb-drawer__bar">
            <Tabs
              label={t('nt.title')}
              value={tab}
              onChange={setTab}
              tabs={[
                { value: 'all', label: t('nt.all'), count: list.length },
                { value: 'unread', label: t('nt.unread'), count: unread.length }
              ]}
            />
            {unread.length > 0 && (
              <button type="button" className="mb-linkbtn" onClick={() => mark(list.map((a) => a.id))}>
                {t('nt.markAll')}
              </button>
            )}
          </div>
          <div className="mb-drawer__body">
            {status === 'loading' && <p className="mb-muted">{t('st8.loading')}</p>}
            {status === 'error' && (
              <div className="mb-pad">
                <p className="mb-muted">{t('nt.err')}</p>
                <Button size="sm" variant="secondary" icon="refresh" onClick={retry}>
                  {t('st8.retry')}
                </Button>
              </div>
            )}
            {status === 'ready' && !shown.length && (
              <div className="mb-empty mb-empty--sm">
                <span className="mb-empty__art" aria-hidden="true">
                  <span className="mb-empty__orb" />
                  <Icon name="check" size={22} />
                </span>
                <p className="mb-empty__title">{t('nt.empty')}</p>
              </div>
            )}
            <ul className="mb-notes">
              {shown.map((a) => {
                const isNew = !read.includes(a.id);
                return (
                  <li key={a.id} className={cx('mb-note', isNew && 'is-new')}>
                    <span className="mb-note__icon" aria-hidden="true">
                      <Icon name={/point|credit/i.test(a.title) ? 'coin' : /survey|study/i.test(a.title) ? 'clipboard' : 'bell'} size={18} />
                    </span>
                    <div className="mb-note__text">
                      <p className="mb-note__title">
                        {a.title}
                        {isNew && <span className="mb-sr"> ({t('nt.unread')})</span>}
                      </p>
                      {a.body && <p className="mb-note__body">{a.body}</p>}
                      <p className="mb-note__time">{relTime(a.date)}</p>
                    </div>
                    {isNew && (
                      <button type="button" className="mb-note__dot" onClick={() => mark([a.id])} aria-label={`${t('nt.markAll')}: ${a.title}`}>
                        <span />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
}

/* ---------------- user menu ---------------- */
function UserMenu({ me }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, ref);
  return (
    <div className="mb-pop" ref={ref}>
      <button type="button" className="mb-userbtn" aria-haspopup="menu" aria-expanded={open} aria-label={t('hdr.profileMenu')} onClick={() => setOpen((v) => !v)}>
        <ProgressAvatar me={me} size={34} />
        <span className="mb-userbtn__name">{me.firstName}</span>
        <Icon name="chevron" size={14} />
      </button>
      {open && (
        <div className="mb-pop__panel mb-pop__panel--menu" role="menu">
          <div className="mb-usercard">
            <Avatar name={me.fullName} src={me.photo} size={44} />
            <div>
              <p className="mb-usercard__name">{me.fullName}</p>
              <Badge tone={me.type}>{t(`member.${me.type}`)}</Badge>
            </div>
          </div>
          {['profile', 'profiles', 'settings', 'help'].map((id) => (
            <MLink key={id} to={id} role="menuitem" className="mb-menuitem" onClick={close}>
              <Icon name={ROUTES[id].icon} size={18} /> {t(ROUTES[id].label)}
              {ROUTES[id].external && <Icon name="external" size={14} className="mb-menuitem__ext" />}
            </MLink>
          ))}
          <button
            type="button"
            role="menuitem"
            className="mb-menuitem mb-menuitem--danger"
            onClick={async () => {
              await actions.logout();
              window.location.assign('/login/');
            }}
          >
            <Icon name="arrowLeft" size={18} /> {t('nav.logout')}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- header ---------------- */
// Each place has its own colour, used for its icon tile, active state and page accent.
export const ROUTE_COLOR = { help: '#0ea5a4', dashboard: '#1f5bff', profiles: '#7b5cff', surveys: '#0b8bd6', rewards: '#d49100', quality: '#0f9f6e', referrals: '#e23d8f', activity: '#ea6a12', profile: '#5b5bf0', settings: '#4f6b8a', support: '#64748b', myaccount: '#0f766e' };

/** Points pill: the number counts up whenever the balance changes and the coin flips. */
function PointsPill({ points }) {
  const [bump, setBump] = useState(false);
  const prev = useRef(null);
  useEffect(() => {
    if (points && prev.current != null && prev.current !== points.total) {
      setBump(true);
      const id = setTimeout(() => setBump(false), 900);
      return () => clearTimeout(id);
    }
    if (points) prev.current = points.total;
    return undefined;
  }, [points]);
  return (
    <MLink to="rewards" className={cx('xhd-pill xhd-pill--points', bump && 'is-bump')} title={t('nav.rewards')}>
      <span className="xhd-coin" aria-hidden="true">
        <span />
      </span>
      <span className="xhd-pill__num">{points ? <Counter value={points.total} /> : '…'}</span>
      <span className="mb-hide-xs xhd-pill__unit">{t('pts.balance')}</span>
    </MLink>
  );
}

function QualityPill({ me }) {
  const tier = qualityTier(me.quality.score, me.quality.scale);
  const p = Math.max(0, Math.min(1, me.quality.score / (me.quality.scale || 1)));
  return (
    <MLink to="quality" className={cx('xhd-pill xhd-pill--quality', `is-${tier}`)} title={`${t('nav.quality')}: ${t(`q.tier.${tier}`)}`} aria-label={`${t('nav.quality')} ${me.quality.score} ${t('q.of', { n: me.quality.scale })}, ${t(`q.tier.${tier}`)}`}>
      <svg viewBox="0 0 36 36" className="xhd-ring" aria-hidden="true">
        <circle cx="18" cy="18" r="15" />
        <circle cx="18" cy="18" r="15" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
      </svg>
      <span className="xhd-pill__num">{me.quality.score}</span>
      <span className="mb-hide-md xhd-pill__unit">{t(`q.tier.${tier}`)}</span>
    </MLink>
  );
}

/** Avatar with a ring that shows how complete the profile is. */
function ProgressAvatar({ me, size = 36 }) {
  const [profiles] = useSection('profiles');
  const pc = profileCompletion(profiles);
  return (
    <span className="xhd-avatar" style={{ '--p': (pc?.percent ?? 0) / 100, '--sz': `${size + 8}px` }} title={pc ? `${t('pc.title')}: ${pc.percent}%` : undefined}>
      <Avatar name={me.fullName} src={me.photo} size={size} />
    </span>
  );
}

/** Header Help button: opens Help on the topic of the page you are on. */
function HelpButton() {
  const path = usePath();
  const slug = path.split('/').filter(Boolean)[1] || 'dashboard';
  const topic = PAGE_TOPIC[slug];
  return (
    <MLink to={slug === 'help' ? '/member/help/' : `/member/help/${topic ? `#topic-${topic}` : ''}`} className={cx('mb-iconbtn xhd-help', slug === 'help' && 'is-on')} aria-label={t('nav.helpHere')} title={t('nav.helpHere')}>
      <Icon name="help" size={21} />
    </MLink>
  );
}

function Header({ onMenu, onJump }) {
  const me = useMe();
  const [points] = useSection('points');
  return (
    <header className={cx('mb-header xhd', `xhd--${me.type}`)}>
      <div className="mb-header__left">
        <IconButton icon="menu" label={t('hdr.openMenu')} className="mb-only-sm" onClick={onMenu} />
        <Brand />
        <span className={cx('xhd-type mb-hide-sm', `is-${me.type}`)}>
          <Icon name={me.type === 'pro' ? 'briefcase' : me.type === 'teen' ? 'sparkles' : 'heart'} size={14} />
          {t(`member.${me.type}.short`)}
        </span>
      </div>
      <button type="button" className="xhd-jump" onClick={onJump} aria-haspopup="dialog" aria-label={t('cmd.open')}>
        <Icon name="search" size={18} />
        <span className="xhd-jump__text">{t('cmd.placeholder')}</span>
        <kbd className="xhd-jump__kbd">Ctrl K</kbd>
      </button>
      <div className="mb-header__right">
        <PointsPill points={points} />
        <QualityPill me={me} />
        <HelpButton />
        <NotificationCenter />
        <span className="mb-hide-sm">
          <AppearanceMenu />
        </span>
        <UserMenu me={me} />
      </div>
    </header>
  );
}

/* ---------------- jump to (command palette) ---------------- */
function CommandPalette({ open, onClose }) {
  const me = useMe();
  const { navigate: go } = useRouter();
  const { update, appearance } = useAppearance();
  const [sound, setSound] = useSound();
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const toast = useToast();
  useEffect(() => {
    if (open) {
      setQ('');
      setI(0);
    }
  }, [open]);
  const isLight = typeof document !== 'undefined' ? document.documentElement.dataset.mbMode === 'light' : appearance.mode === 'light';
  const items = useMemo(() => {
    const pages = [...NAV, ...(me.type === 'teen' ? [] : ['myaccount'])].map((id) => ({
      id,
      kind: 'page',
      icon: ROUTES[id].icon,
      label: t(ROUTES[id].label),
      hint: ROUTES[id].external ? t('cmd.external') : t('cmd.page'),
      run: () => {
        if (ROUTES[id].external) {
          if (ENV.DEMO_MODE) toast(`Opens your existing ${t(ROUTES[id].label)} page in the live member area.`, 'info');
          else window.location.assign(ROUTES[id].path);
        } else go(ROUTES[id].path);
      }
    }));
    const acts = [
      { id: 'mode', kind: 'action', icon: 'eye', label: isLight ? t('cmd.dark') : t('cmd.light'), hint: t('cmd.action'), run: () => update({ mode: isLight ? 'dark' : 'light' }) },
      { id: 'sound', kind: 'action', icon: sound ? 'volumeOff' : 'volume', label: sound ? t('hdr.sound.off') : t('hdr.sound.on'), hint: t('cmd.action'), run: () => setSound(!sound) },
      { id: 'invite', kind: 'action', icon: 'send', label: t('cmd.invite'), hint: t('cmd.action'), run: () => go(ROUTES.referrals.path) },
      { id: 'photo', kind: 'action', icon: 'user', label: t('cmd.photo'), hint: t('cmd.action'), run: () => go(ROUTES.profile.path) }
    ];
    const all = [...pages, ...acts];
    const needle = q.trim().toLowerCase();
    return needle ? all.filter((x) => x.label.toLowerCase().includes(needle)) : all;
  }, [q, me.type, isLight, sound, go, update, setSound, toast]);
  const pick = (x) => {
    onClose();
    x.run();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setI((v) => Math.min(items.length - 1, v + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setI((v) => Math.max(0, v - 1));
    } else if (e.key === 'Enter' && items[i]) {
      e.preventDefault();
      pick(items[i]);
    }
  };
  return (
    <Modal open={open} onClose={onClose} title={t('cmd.open')}>
      <div className="xcmd">
        <label className="xcmd__search">
          <Icon name="search" size={20} />
          <span className="mb-sr">{t('cmd.open')}</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={onKey}
            placeholder={t('cmd.placeholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls="xcmd-list"
            aria-activedescendant={items[i] ? `xcmd-${items[i].id}` : undefined}
          />
          <kbd>Esc</kbd>
        </label>
        <ul className="xcmd__list" id="xcmd-list" role="listbox" aria-label={t('cmd.open')}>
          {items.map((x, n) => (
            <li key={x.id} id={`xcmd-${x.id}`} role="option" aria-selected={n === i} className={cx('xcmd__item', n === i && 'is-on')} style={{ '--nc': ROUTE_COLOR[x.id] || 'var(--mb-primary)' }} onMouseEnter={() => setI(n)} onClick={() => pick(x)}>
              <span className="xcmd__icon" aria-hidden="true">
                <Icon name={x.icon} size={18} />
              </span>
              <span className="xcmd__label">{x.label}</span>
              <span className="xcmd__hint">{x.hint}</span>
            </li>
          ))}
          {!items.length && <li className="xcmd__none">{t('cmd.none')}</li>}
        </ul>
      </div>
    </Modal>
  );
}

/* ---------------- navigation ---------------- */
function NavList({ path, onPick, collapsed }) {
  const on = NAV.findIndex((id) => isActive(path, id));
  return (
    <ul className="mb-nav__list xnav" style={{ '--on': on }}>
      {on >= 0 && <li className="xnav__slider" aria-hidden="true" style={{ '--nc': ROUTE_COLOR[NAV[on]] }} />}
      {NAV.map((id, n) => {
        const r = ROUTES[id];
        const active = n === on;
        return (
          <li key={id} style={{ '--nc': ROUTE_COLOR[id], '--n': n }}>
            <MLink to={id} className={cx('mb-nav__item xnav__item', active && 'is-on')} aria-current={active ? 'page' : undefined} onClick={onPick} title={collapsed ? t(r.label) : undefined}>
              <span className="xnav__tile" aria-hidden="true">
                <Icon name={r.icon} size={18} />
              </span>
              <span className="mb-nav__label">{t(r.label)}</span>
              {r.external && <Icon name="external" size={13} className="mb-nav__ext" />}
            </MLink>
          </li>
        );
      })}
    </ul>
  );
}

function Sidebar({ path, collapsed, onToggle }) {
  const me = useMe();
  const [points] = useSection('points');
  const pct = points ? Math.min(1, points.total / points.threshold) : 0;
  return (
    <nav className={cx('mb-side xside', collapsed && 'is-collapsed')} aria-label={t('nav.main')}>
      <div className="mb-side__member">
        <span className={cx('mb-side__type', `is-${me.type}`)}>
          <Icon name={me.type === 'pro' ? 'briefcase' : me.type === 'teen' ? 'sparkles' : 'heart'} size={16} />
          <span className="mb-nav__label">{t(`member.${me.type}`)}</span>
        </span>
      </div>
      <p className="xside__group mb-nav__label">{t('nav.journey')}</p>
      <NavList path={path} collapsed={collapsed} />
      {me.type !== 'teen' && points && (
        <MLink to="rewards" className="xside__goal" title={collapsed ? t('xc.progress') : undefined} style={{ '--p': pct }}>
          <span className="xside__goal-ring" aria-hidden="true" />
          <span className="mb-nav__label">
            <strong>{Math.round(pct * 100)}%</strong> {t('nav.toPayout')}
          </span>
        </MLink>
      )}
      <div className="mb-side__foot">
        <MLink to="support" className="mb-nav__item mb-nav__item--quiet" title={collapsed ? t('nav.support') : undefined}>
          <Icon name="chat" size={20} />
          <span className="mb-nav__label">{t('nav.support')}</span>
        </MLink>
        <button type="button" className="mb-nav__item mb-nav__item--quiet mb-side__collapse" onClick={onToggle} aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}>
          <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} size={20} />
          <span className="mb-nav__label">{t('nav.collapse')}</span>
        </button>
      </div>
    </nav>
  );
}

function BottomNav({ path, onMore }) {
  return (
    <nav className="mb-bottom" aria-label={t('nav.main')}>
      {BOTTOM_NAV.map((id) => {
        const r = ROUTES[id];
        const on = isActive(path, id);
        return (
          <MLink key={id} to={id} className={cx('mb-bottom__item', on && 'is-on')} aria-current={on ? 'page' : undefined} style={{ '--nc': ROUTE_COLOR[id] }}>
            <Icon name={r.icon} size={22} />
            <span>{t(r.label)}</span>
          </MLink>
        );
      })}
      <button type="button" className="mb-bottom__item" onClick={onMore}>
        <Icon name="menu" size={22} />
        <span>{t('nav.more')}</span>
      </button>
    </nav>
  );
}

function Drawer({ open, onClose, path }) {
  const me = useMe();
  return (
    <Modal open={open} onClose={onClose} title={t('nav.main')} side="left">
      <div className="mb-drawer mb-drawer--nav">
        <header className="mb-drawer__head">
          <Brand />
          <IconButton icon="close" label={t('nav.close')} onClick={onClose} />
        </header>
        <div className="mb-usercard mb-usercard--drawer">
          <Avatar name={me.fullName} src={me.photo} size={44} />
          <div>
            <p className="mb-usercard__name">{me.fullName}</p>
            <Badge tone={me.type}>{t(`member.${me.type}`)}</Badge>
          </div>
        </div>
        <nav aria-label={t('nav.main')}>
          <NavList path={path} onPick={onClose} />
        </nav>
        <div className="mb-drawer__controls">
          <p className="mb-pop__title">{t('ap.mode')}</p>
          <ThemeSelector />
          <div className="mb-pop__row">
            <SoundControl />
            <LanguageSelector />
          </div>
          <MLink to="support" className="mb-pop__link" onClick={onClose}>
            <Icon name="chat" size={18} /> {t('nav.support')}
          </MLink>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- preview-only switcher ---------------- */
function DemoBar() {
  const p = demoPrefs();
  return (
    <div className="mb-demobar" role="region" aria-label="Preview controls">
      <span className="mb-demobar__tag">Preview</span>
      <label>
        {t('demo.label')}{' '}
        <select value={p.as} onChange={(e) => setDemoPrefs({ as: e.target.value })}>
          <option value="consumer">Consumer</option>
          <option value="pro">Professional</option>
          <option value="teen">Teen</option>
        </select>
      </label>
      <label>
        {t('demo.state')}{' '}
        <select value={p.state} onChange={(e) => setDemoPrefs({ state: e.target.value })}>
          <option value="ready">{t('demo.state.ready')}</option>
          <option value="loading">{t('demo.state.loading')}</option>
          <option value="empty">{t('demo.state.empty')}</option>
          <option value="error">{t('demo.state.error')}</option>
        </select>
      </label>
    </div>
  );
}

/* ---------------- shell ---------------- */
export default function DashboardShell({ children }) {
  const path = usePath();
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [jump, setJump] = useState(false);
  const closeJump = useCallback(() => setJump(false), []);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setJump((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => setCollapsed(!!store.get('t2o_member_nav_collapsed', false)), []);
  useEffect(() => setDrawer(false), [path]);
  const toggle = () => {
    setCollapsed((c) => {
      store.set('t2o_member_nav_collapsed', !c);
      return !c;
    });
  };
  return (
    <div className={cx('mb-shell', collapsed && 'is-collapsed')}>
      <a className="mb-skip" href="#mb-main">
        {t('nav.skip')}
      </a>
      <div className="mb-ambient" aria-hidden="true">
        <span className="mb-ambient__a" />
        <span className="mb-ambient__b" />
      </div>
      {ENV.DEMO_MODE && <DemoBar />}
      <Header onMenu={() => setDrawer(true)} onJump={() => setJump(true)} />
      <div className="mb-body">
        <Sidebar path={path} collapsed={collapsed} onToggle={toggle} />
        <main id="mb-main" className="mb-main" tabIndex={-1}>
          {children}
          <footer className="mb-foot">
            <span>© {new Date().getFullYear()} Turn2Opinion</span>
            <MLink to="/privacy/">Privacy</MLink>
            <MLink to="/terms/">Terms</MLink>
            <MLink to="/cookies/">Cookies</MLink>
          </footer>
        </main>
      </div>
      <BottomNav path={path} onMore={() => setDrawer(true)} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} path={path} />
      <CommandPalette open={jump} onClose={closeJump} />
    </div>
  );
}
