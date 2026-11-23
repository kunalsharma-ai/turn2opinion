// DashboardShell: header, sidebar (desktop), bottom bar + drawer (phones), notification centre,
// appearance, language and sound controls. Grouped so the header never shows more than five
// controls side by side: points, quality, notifications, a settings cluster and the avatar.
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePath } from '../../router/Router.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { soundEnabled, setSoundPref, onSoundChange } from '../../utils/soundPref.js';
import { asset, ENV } from '../../config/env.js';
import { store } from '../../utils/storage.js';
import { NAV, BOTTOM_NAV, ROUTES } from '../config/memberTypes.js';
import { useMe, useSection, qualityTier } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { demoPrefs, setDemoPrefs } from '../data/demo.js';
import { useAppearance } from '../theme/AppearanceProvider.jsx';
import { PALETTES } from '../theme/appearance.js';
import { feedback } from '../theme/feedback.js';
import { t, fmt, relTime } from '../i18n/t.js';
import { Avatar, Badge, Button, Icon, IconButton, MLink, Modal, Segmented, Tabs, cx, useDismiss } from './ui.jsx';

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
            <IconButton icon="x" label={t('nt.close')} onClick={() => setOpen(false)} />
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
        <Avatar name={me.fullName} src={me.photo} size={36} />
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
          {['profile', 'profiles', 'settings', 'support'].map((id) => (
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
function Header({ onMenu }) {
  const me = useMe();
  const [points] = useSection('points');
  const tier = qualityTier(me.quality.score, me.quality.scale);
  return (
    <header className="mb-header">
      <div className="mb-header__left">
        <IconButton icon="menu" label={t('hdr.openMenu')} className="mb-only-sm" onClick={onMenu} />
        <Brand />
      </div>
      <div className="mb-header__right">
        <MLink to="rewards" className="mb-pill mb-pill--points" title={t('nav.rewards')}>
          <span className="mb-coin" aria-hidden="true" />
          <span className="mb-hide-xs">{points ? t('hdr.points', { n: fmt(points.total) }) : '…'}</span>
          <span className="mb-show-xs">{points ? fmt(points.total) : '…'}</span>
        </MLink>
        <MLink to="quality" className={cx('mb-pill mb-pill--quality', `is-${tier}`)} title={t('nav.quality')}>
          <Icon name="shield" size={16} />
          <span className="mb-hide-xs">{t('hdr.quality', { n: `${me.quality.score}/${me.quality.scale}` })}</span>
          <span className="mb-show-xs">{me.quality.score}</span>
        </MLink>
        <NotificationCenter />
        <span className="mb-hide-sm">
          <AppearanceMenu />
        </span>
        <span className="mb-hide-md">
          <LanguageSelector compact />
        </span>
        <UserMenu me={me} />
      </div>
    </header>
  );
}

/* ---------------- navigation ---------------- */
function NavList({ path, onPick, collapsed }) {
  return (
    <ul className="mb-nav__list">
      {NAV.map((id) => {
        const r = ROUTES[id];
        const on = isActive(path, id);
        return (
          <li key={id}>
            <MLink to={id} className={cx('mb-nav__item', on && 'is-on')} aria-current={on ? 'page' : undefined} onClick={onPick} title={collapsed ? t(r.label) : undefined}>
              <Icon name={r.icon} size={20} />
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
  return (
    <nav className={cx('mb-side', collapsed && 'is-collapsed')} aria-label={t('nav.main')}>
      <div className="mb-side__member">
        <span className={cx('mb-side__type', `is-${me.type}`)}>
          <Icon name={me.type === 'pro' ? 'briefcase' : me.type === 'teen' ? 'sparkles' : 'heart'} size={16} />
          <span className="mb-nav__label">{t(`member.${me.type}`)}</span>
        </span>
      </div>
      <NavList path={path} collapsed={collapsed} />
      <div className="mb-side__foot">
        <MLink to="support" className="mb-nav__item mb-nav__item--quiet" title={collapsed ? t('nav.support') : undefined}>
          <Icon name="headset" size={20} />
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
          <MLink key={id} to={id} className={cx('mb-bottom__item', on && 'is-on')} aria-current={on ? 'page' : undefined}>
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
          <IconButton icon="x" label={t('nav.close')} onClick={onClose} />
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
            <Icon name="headset" size={18} /> {t('nav.support')}
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
      <Header onMenu={() => setDrawer(true)} />
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
    </div>
  );
}
