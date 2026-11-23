// Profile (My account) and Settings pages, plus the profile photo uploader.
import { useEffect, useRef, useState } from 'react';
import { HeroHello, HeroStats } from '../components/HeroBits.jsx';
import { useMe, useMemberData, useSection, profileCompletion, qualityTier } from '../data/MemberData.jsx';
import { actions } from '../data/source.js';
import { useAppearance } from '../theme/AppearanceProvider.jsx';
import { feedback } from '../theme/feedback.js';
import { t, tn, fmt } from '../i18n/t.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { ColorPaletteSelector, LanguageSelector, ThemeSelector, useSound } from '../components/Shell.jsx';
import { GuardianConsentCard } from '../components/Modules.jsx';
import { DataCentre, LevelCard, LinkedAccounts, ProfileFreshness, QuietHours, SurveyPrefs } from '../components/Grow.jsx';
import { engageOn } from '../data/engage.js';
import { Avatar, Badge, Button, Card, Field, Icon, MLink, Toggle, cx, useToast } from '../components/ui.jsx';

const MAX = 5 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/* ================= AvatarUpload ================= */
export function AvatarUpload() {
  const me = useMe();
  const { patchMe } = useMemberData();
  const toast = useToast();
  const input = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [state, setState] = useState('idle'); // idle | ready | uploading | error
  const [err, setErr] = useState('');
  const [drag, setDrag] = useState(false);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const pick = (f) => {
    if (!f) return;
    if (!TYPES.includes(f.type)) return fail(t('av.err.type'));
    if (f.size > MAX) return fail(t('av.err.size'));
    setErr('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setState('ready');
  };
  const fail = (m) => {
    setErr(m);
    setState('error');
  };
  const upload = async () => {
    setState('uploading');
    try {
      const url = await actions.uploadPhoto(file);
      patchMe({ photo: url });
      setFile(null);
      setPreview(null);
      setState('idle');
      toast(t('av.ok'));
      feedback('success');
    } catch {
      fail(t('av.err.upload'));
    }
  };
  const remove = async () => {
    setState('uploading');
    try {
      await actions.removePhoto();
      patchMe({ photo: null });
      setState('idle');
      toast(t('av.removed'));
    } catch {
      fail(t('av.err.upload'));
    }
  };
  const shown = preview || me.photo;
  return (
    <Card title={t('av.title')} icon="user" className="mb-avatarup">
      <div
        className={cx('mb-drop', drag && 'is-drag', state === 'error' && 'is-error')}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          pick(e.dataTransfer.files?.[0]);
        }}
      >
        <div className={cx('mb-drop__preview', state === 'uploading' && 'is-busy')}>
          <Avatar name={me.fullName} src={shown} size={128} />
          {state === 'uploading' && <span className="mb-drop__spinner" aria-hidden="true" />}
        </div>
        <div className="mb-drop__text">
          <p>
            {t('av.drop')}{' '}
            <button type="button" className="mb-linkbtn" onClick={() => input.current?.click()}>
              {t('av.browse')}
            </button>
          </p>
          <p className="mb-faint mb-small">{t('av.hint')}</p>
          <input ref={input} type="file" accept={TYPES.join(',')} className="mb-sr" tabIndex={-1} aria-hidden="true" onChange={(e) => pick(e.target.files?.[0])} />
          {err && (
            <p className="mb-field__error" role="alert">
              <Icon name="close" size={13} /> {err}
            </p>
          )}
          <div className="mb-row" aria-live="polite">
            {state === 'ready' || (state === 'error' && file) ? (
              <>
                <Button size="sm" icon="check" onClick={upload}>
                  {t('av.save')}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setState('idle');
                    setErr('');
                  }}
                >
                  {t('av.cancel')}
                </Button>
              </>
            ) : state === 'uploading' ? (
              <Button size="sm" busy>
                {t('av.uploading')}
              </Button>
            ) : (
              <>
                <Button size="sm" icon="plus" variant={me.photo ? 'secondary' : 'primary'} onClick={() => input.current?.click()}>
                  {me.photo ? t('av.replace') : t('av.upload')}
                </Button>
                {me.photo && (
                  <Button size="sm" variant="ghost" icon="close" onClick={remove}>
                    {t('av.remove')}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ================= Profile page ================= */
function Masked({ value, kind }) {
  const [show, setShow] = useState(false);
  if (!value) return <span className="mb-faint">{t('ma.notSet')}</span>;
  const masked = kind === 'email' ? value.replace(/^(.{2}).*(@.*)$/, '$1•••••$2') : kind === 'phone' ? value.replace(/\d(?=\d{3})/g, '•') : '•• ••• ••••';
  return (
    <span className="mb-masked">
      <span className={cx(!show && 'mb-mono')}>{show ? value : masked}</span>
      <button type="button" className="mb-iconbtn mb-iconbtn--sm" aria-label={show ? t('ma.hide') : t('ma.reveal')} aria-pressed={show} onClick={() => setShow((s) => !s)}>
        <Icon name={show ? 'eyeOff' : 'eye'} size={15} />
      </button>
    </span>
  );
}

const fmtDate = (d) => {
  try {
    return d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  } catch {
    return '';
  }
};
let regionNames;
const countryName = (c) => {
  try {
    regionNames ||= new Intl.DisplayNames(undefined, { type: 'region' });
    return c ? regionNames.of(c.toUpperCase()) : '';
  } catch {
    return c;
  }
};

/** "IN-MH" -> "Maharashtra" from the sign-up state list (loaded only when a code is stored). */
function useStateName(country, code) {
  const [name, setName] = useState(code || '');
  useEffect(() => {
    if (!code || !/^[A-Z]{2}-[A-Z0-9]{1,3}$/i.test(code)) return setName(code || '');
    let live = true;
    import('../../data/welcome/states.json')
      .then((m) => {
        const list = (m.default || m)[String(country || code.slice(0, 2)).toUpperCase()] || [];
        const hit = list.find((x) => x[1].toUpperCase() === code.toUpperCase());
        if (live) setName(hit ? hit[0] : code);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [country, code]);
  return name;
}

/** Membership card with a soft 3D tilt that follows the pointer. */
function MemberCard({ me }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current || document.documentElement.dataset.mbMotion === 'reduce') return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height - 0.5) * -10).toFixed(2)}deg`);
    ref.current.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2)}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };
  return (
    <div className={cx('xcard', `xcard--${me.type}`)} ref={ref} onPointerMove={move} onPointerLeave={leave} role="img" aria-label={`${t('ma.card')}: ${me.fullName}, ${t(`member.${me.type}`)}${me.memberId ? `, ${me.memberId}` : ''}`}>
      <span className="xcard__shine" aria-hidden="true" />
      <span className="xcard__brand">Turn2Opinion</span>
      <span className="xcard__chip" aria-hidden="true" />
      <span className="xcard__type">{t(`member.${me.type}`)}</span>
      <span className="xcard__name">{me.fullName}</span>
      <span className="xcard__row">
        <span>
          <small>{t('ma.id')}</small>
          {me.memberId || '—'}
        </span>
        <span>
          <small>{t('ma.since')}</small>
          {me.joinedAt ? new Date(me.joinedAt).toLocaleDateString(undefined, { month: '2-digit', year: '2-digit' }) : '—'}
        </span>
      </span>
    </div>
  );
}

export function ProfilePage() {
  const me = useMe();
  const a = me.address;
  const stateName = useStateName(a?.country, a?.state);
  const teen = me.type === 'teen';
  const [points] = useSection('points');
  const [stats] = useSection('stats');
  const [profiles] = useSection('profiles');
  const pc = profileCompletion(profiles);
  const tier = qualityTier(me.quality.score, me.quality.scale);
  const stats4 = [
    ['coin', 'rewards', t('sum.points'), points ? fmt(points.total) : '…'],
    ['check', 'activity', t('ac.s.complete'), stats ? fmt(stats.complete) : '…'],
    ['shield', 'quality', t('q.title'), t(`q.tier.${tier}`)],
    ['map', 'profiles', t('sum.profile'), pc ? `${pc.percent}%` : '…']
  ];
  return (
    <div className="xp xp--account">
      <section className="xid" aria-labelledby="xid-name">
        <div className="xid__bg" aria-hidden="true" />
        <div className="xid__who">
          <span className="xid__avatar" style={{ '--p': (pc?.percent ?? 0) / 100 }}>
            <Avatar name={me.fullName} src={me.photo} size={112} />
          </span>
          <div>
            <p className="xph__eyebrow">{t('ma.eyebrow')}</p>
            <h1 id="xid-name" className="hx-name">{me.fullName || t('ma.title')}</h1>
            <p className="xid__meta">
              <Badge tone={me.type}>{t(`member.${me.type}`)}</Badge>
              {me.joinedAt && <span>{t('greet.memberSince', { date: fmtDate(me.joinedAt) })}</span>}
            </p>
            <HeroStats showPayout={false} />
            <div className="mb-row">
              <Button size="sm" icon="user" onClick={() => document.getElementById('xid-photo')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                {me.photo ? t('av.replace') : t('av.upload')}
              </Button>
              <Button size="sm" variant="ghost" icon="key" to="/member/settings/#set-account">
                {t('ma.security')}
              </Button>
            </div>
          </div>
        </div>
        <MemberCard me={me} />
      </section>

      <ul className="xid-stats">
        {stats4.map(([icon, to, label, value], i) => (
          <li key={to} style={{ '--i': i }}>
            <MLink to={to} className="xid-stats__item">
              <span className="xid-stats__icon" aria-hidden="true">
                <Icon name={icon} size={18} />
              </span>
              <strong>{value}</strong>
              <span>{label}</span>
            </MLink>
          </li>
        ))}
      </ul>

      <LevelCard />

      <div className="mb-cols">
        <div className="mb-col-main">
          <Card title={t('ma.basic')} icon="id" className="xid-card">
            <dl className="mb-deflist mb-deflist--two">
              <div>
                <dt>{t('ma.name')}</dt>
                <dd>
                  {me.fullName} <Badge tone="neutral" icon="lock">{t('ma.locked')}</Badge>
                </dd>
              </div>
              <div>
                <dt>{t('ma.type')}</dt>
                <dd>
                  <Badge tone={me.type}>{t(`member.${me.type}`)}</Badge>
                </dd>
              </div>
              <div>
                <dt>{t('ma.email')}</dt>
                <dd>
                  <Masked value={me.email} kind="email" />
                </dd>
              </div>
              <div>
                <dt>{t('ma.phone')}</dt>
                <dd>
                  <Masked value={me.phone} kind="phone" />
                </dd>
              </div>
              <div>
                <dt>{t('ma.dob')}</dt>
                <dd>
                  <Masked value={fmtDate(me.dob)} kind="dob" />
                </dd>
              </div>
              <div>
                <dt>{t('ma.gender')}</dt>
                <dd>{me.gender || <span className="mb-faint">{t('ma.notSet')}</span>}</dd>
              </div>
              <div>
                <dt>{t('ma.joined')}</dt>
                <dd>{fmtDate(me.joinedAt) || '—'}</dd>
              </div>
              {me.memberId && (
                <div>
                  <dt>{t('ma.id')}</dt>
                  <dd className="mb-mono">{me.memberId}</dd>
                </div>
              )}
            </dl>
          </Card>
          <Card title={t('ma.location')} icon="pin" className="xid-card">
            <ol className="mb-loc xloc">
              {[
                ['ma.country', a.country ? countryName(a.country) : '', 'globe'],
                ['ma.state', stateName, 'map'],
                ['ma.city', a.city, 'building'],
                ['ma.zip', a.zip, 'pin']
              ].map(([k, v, icon], i) => (
                <li key={k} className={cx(!v && 'is-empty')} style={{ '--i': i }}>
                  <span className="mb-loc__step" aria-hidden="true">
                    <Icon name={icon} size={16} />
                  </span>
                  <span className="mb-loc__label">{t(k)}</span>
                  <span className="mb-loc__value">{v || t('ma.notSet')}</span>
                </li>
              ))}
            </ol>
            <p className="mb-faint mb-small">{t('ma.editLoc')}</p>
          </Card>
          <ProfileFreshness />
        </div>
        <div className="mb-col-side">
          <div id="xid-photo">
            <AvatarUpload />
          </div>
          {teen && <GuardianConsentCard />}
          {!teen && (
            <Card title={t('ma.payment')} icon="wallet" className="xid-card">
              <p className="mb-card__lead">{t('ma.payment.d')}</p>
              <Button to="myaccount" size="sm" variant="secondary" iconEnd="external" className="mb-wide">
                {t('ma.payment.open')}
              </Button>
            </Card>
          )}
          <LinkedAccounts />
          <Card title={t('st.profile.profiles')} icon="map" className="xid-card">
            <p className="mb-card__lead">{t('kd.sub')}</p>
            <Button to="profiles" size="sm" iconEnd="arrow" className="mb-wide">
              {t('pc.open')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ================= Settings ================= */
const ALL_SECTIONS = [
  ['appearance', 'layers'],
  ['sound', 'volume'],
  ['language', 'globe'],
  ['notifications', 'bell'],
  ['quiet', 'clock', 'quiet'],
  ['prefs', 'target', 'prefs'],
  ['privacy', 'shield'],
  ['data', 'database', 'datacentre'],
  ['profile', 'user'],
  ['account', 'key']
];
// Sections whose feature is not live yet are left out on the live site (see data/engage.js).
const SECTIONS = ALL_SECTIONS.filter(([, , gate]) => !gate || engageOn(gate));

export function SettingsPage() {
  const [active, setActive] = useState('appearance');
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(`set-${id}`)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id.slice(4))), { rootMargin: '-30% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="xp xp--settings mb-settings">
      <ControlCentre onPick={setActive} />
      <div className="mb-settings__grid">
        <nav className="mb-settings__nav" aria-label={t('st.title')}>
          <ul>
            {SECTIONS.map(([id, icon]) => (
              <li key={id}>
                <a href={`#set-${id}`} className={cx(active === id && 'is-on')} aria-current={active === id ? 'true' : undefined} onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`set-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActive(id);
                }}>
                  <Icon name={icon} size={18} /> {t(`st.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mb-settings__body">
          <AppearanceSettings />
          <SoundSettings />
          <Card id="set-language" title={t('lng.title')} icon="globe">
            <p className="mb-card__lead">{t('lng.d')}</p>
            <LanguageSelector />
          </Card>
          <NotificationSettings />
          <QuietHours />
          <SurveyPrefs />
          <PrivacySettings />
          <DataCentre />
          <Card id="set-profile" title={t('st.profile')} icon="user">
            <p className="mb-card__lead">{t('st.profile.d')}</p>
            <div className="mb-row">
              <Button to="profile" size="sm" variant="secondary" iconEnd="arrow">
                {t('st.profile.open')}
              </Button>
              <Button to="profiles" size="sm" variant="ghost" iconEnd="arrow">
                {t('st.profile.profiles')}
              </Button>
            </div>
          </Card>
          <AccountSettings />
        </div>
      </div>
    </div>
  );
}

/** The control centre: one tile per area, each showing its current value. */
function ControlCentre({ onPick }) {
  const me = useMe();
  const { appearance } = useAppearance();
  const [sound] = useSound();
  const { meta } = useI18n();
  const [ans] = useSection('answers');
  const ch = ans?.['communication-methods'];
  const values = {
    appearance: t(`ap.${appearance.mode === 'system' ? 'system' : appearance.mode}`),
    sound: sound ? t('hdr.sound.on') : t('hdr.sound.off'),
    language: meta?.native || 'English',
    notifications: Array.isArray(ch) ? tn('cc.channels', ch.length) : '…',
    privacy: tn('cc.choices', (me.terms || []).length),
    profile: me.photo ? t('cc.photoOn') : t('cc.photoOff'),
    account: t('cc.secure'),
    quiet: t('g.cc.quiet'),
    prefs: t('g.cc.prefs'),
    data: t('g.cc.data')
  };
  return (
    <section className="xcc" aria-labelledby="xcc-t">
      <div className="xcc__head">
        <HeroHello />
        <p className="xph__eyebrow">{t('cc.eyebrow')}</p>
        <h1 id="xcc-t">{t('st.title')}</h1>
        <p className="xph__lead">{t('st.sub')}</p>
        <HeroStats showPayout={false} />
      </div>
      <ul className="xcc__grid">
        {SECTIONS.map(([id, icon], i) => (
          <li key={id} style={{ '--i': i }} className={`is-${id}`}>
            <a
              href={`#set-${id}`}
              className="xcc__tile"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(`set-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                onPick(id);
              }}
            >
              <span className="xcc__icon" aria-hidden="true">
                <Icon name={icon} size={22} />
              </span>
              <span className="xcc__label">{t(`st.${id}`)}</span>
              <span className="xcc__value">{values[id]}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AppearanceSettings() {
  const { appearance, update } = useAppearance();
  return (
    <Card id="set-appearance" title={t('ap.title')} icon="layers" className="mb-set-appearance">
      <div className="mb-set-row">
        <div>
          <p className="mb-subhead">{t('ap.mode')}</p>
          <ThemeSelector />
          <p className="mb-faint mb-small">{appearance.mode === 'night' ? t('ap.night.d') : ' '}</p>
        </div>
        <ThemePreview />
      </div>
      <p className="mb-subhead">{t('ap.palette')}</p>
      <ColorPaletteSelector />
      <Toggle label={t('ap.motion')} description={t('ap.motion.d')} checked={appearance.reduceMotion} onChange={(v) => update({ reduceMotion: v })} />
    </Card>
  );
}

/** Live miniature of the dashboard in the current theme. */
function ThemePreview() {
  return (
    <figure className="mb-preview" aria-label={t('ap.preview')}>
      <div className="mb-preview__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mb-preview__body">
        <span className="mb-preview__side" />
        <div className="mb-preview__main">
          <span className="mb-preview__hero" />
          <div className="mb-preview__cards">
            <span />
            <span />
          </div>
          <span className="mb-preview__btn" />
        </div>
      </div>
      <figcaption className="mb-sr">{t('ap.preview')}</figcaption>
    </figure>
  );
}

function SoundSettings() {
  const [on, set] = useSound();
  return (
    <Card id="set-sound" title={t('snd.title')} icon="volume">
      <Toggle label={t('snd.ui')} description={t('snd.ui.d')} checked={on} onChange={set} />
      <Button size="sm" variant="ghost" icon="play" disabled={!on} onClick={() => feedback('points')}>
        {t('snd.test')}
      </Button>
    </Card>
  );
}

const CHANNELS = ['email', 'sms', 'call', 'dashboard', 'whatsapp'];
function NotificationSettings() {
  const me = useMe();
  const [ans, status] = useSection('answers');
  const toast = useToast();
  const teen = me.type === 'teen';
  const allowed = teen ? ['email', 'dashboard'] : CHANNELS;
  const [sel, setSel] = useState(null);
  useEffect(() => {
    if (status === 'ready') {
      const v = ans?.['communication-methods'];
      setSel(Array.isArray(v) ? v : v ? [v] : ['email', 'dashboard']);
    }
  }, [status, ans]);
  const [busy, setBusy] = useState(false);
  const save = async (next) => {
    setSel(next);
    setBusy(true);
    try {
      await actions.saveChannels(next);
      toast(t('st.saved'));
    } catch (x) {
      toast(x.message || t('st8.error'), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card id="set-notifications" title={t('st.notifications')} icon="bell" aria-busy={busy || undefined}>
      <p className="mb-card__lead">{t('st.n.lead')}</p>
      {sel ? (
        <div className="mb-toggles">
          {allowed.map((c) => (
            <Toggle key={c} label={t(`st.n.${c}`)} checked={sel.includes(c)} onChange={(v) => save(v ? [...sel, c] : sel.filter((x) => x !== c))} />
          ))}
        </div>
      ) : (
        <p className="mb-muted">{status === 'error' ? t('st8.error') : t('st8.loading')}</p>
      )}
      {teen && <p className="mb-faint mb-small">{t('st.n.teenNote')}</p>}
    </Card>
  );
}

const CONSENT_LABEL = { terms: 'Terms & Conditions', privacy: 'Privacy notice', age: 'Age confirmation', marketing: 'News and offers', analytics: 'Analytics cookies', recordings: 'Audio, video and photo studies', sensitive: 'Sensitive-topic studies', accuracy: 'Accurate professional information', confidential: 'Confidentiality', interviews: 'Interviews', clientContact: 'Client contact', 'privacy-policy': 'Privacy Policy', 'video-concent': 'Research participation', newsletter: 'Newsletter' };
function PrivacySettings() {
  const me = useMe();
  const teen = me.type === 'teen';
  return (
    <Card id="set-privacy" title={t('st.privacy')} icon="shield">
      <p className="mb-subhead">{t('st.privacy.accepted')}</p>
      {me.terms?.length ? (
        <ul className="mb-chips">
          {me.terms.map((k) => (
            <li key={k} className="mb-chip is-on">
              <Icon name="check" size={12} strokeWidth={3} /> {CONSENT_LABEL[k] || k}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-faint mb-small">{t('st.privacy.none')}</p>
      )}
      <div className="mb-row">
        {!teen && (
          <Button href={`/user/terms-${me.category === 'b2b' ? 'b2b' : 'b2c'}.html`} size="sm" variant="secondary" iconEnd="arrow">
            {t('st.privacy.review')}
          </Button>
        )}
        <Button to="/privacy/" size="sm" variant="ghost">
          {t('st.privacy.policy')}
        </Button>
        <Button to="/cookies/" size="sm" variant="ghost">
          {t('st.privacy.cookies')}
        </Button>
      </div>
      <div className="mb-callout">
        <Icon name="clock" size={18} />
        <div>
          <p className="mb-callout__title">{t('st.privacy.pause')}</p>
          <p className="mb-small">{t('st.privacy.pause.d')}</p>
          <MLink to="myaccount" className="mb-linkbtn">
            {t('ma.danger')} <Icon name="external" size={13} />
          </MLink>
        </div>
      </div>
    </Card>
  );
}

const STRONG = (p) => p.length >= 8 && /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
function AccountSettings() {
  const toast = useToast();
  const [f, setF] = useState({ old: '', pw: '', pw2: '' });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [eBusy, setEBusy] = useState(false);
  const [show, setShow] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    if (!f.old) x.old = t('st.pw.current');
    if (!STRONG(f.pw)) x.pw = t('st.pw.weak');
    if (f.pw !== f.pw2) x.pw2 = t('st.pw.mismatch');
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    try {
      await actions.changePassword(f.old, f.pw, f.pw2);
      toast(t('st.pw.ok'));
      feedback('success');
      setF({ old: '', pw: '', pw2: '' });
    } catch (y) {
      setErr({ old: y.message });
    } finally {
      setBusy(false);
    }
  };
  const type = show ? 'text' : 'password';
  return (
    <Card id="set-account" title={t('st.account')} icon="key">
      <form className="mb-form" onSubmit={submit} noValidate>
        <p className="mb-subhead">{t('st.pw.title')}</p>
        <Field id="pw-old" label={t('st.pw.current')} error={err.old}>
          <input id="pw-old" className="mb-input" type={type} autoComplete="current-password" value={f.old} onChange={(e) => setF({ ...f, old: e.target.value })} />
        </Field>
        <div className="mb-form__two">
          <Field id="pw-new" label={t('st.pw.new')} error={err.pw} hint={t('st.pw.weak')}>
            <input id="pw-new" className="mb-input" type={type} autoComplete="new-password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} />
          </Field>
          <Field id="pw-new2" label={t('st.pw.confirm')} error={err.pw2}>
            <input id="pw-new2" className="mb-input" type={type} autoComplete="new-password" value={f.pw2} onChange={(e) => setF({ ...f, pw2: e.target.value })} />
          </Field>
        </div>
        <div className="mb-row">
          <Button type="submit" busy={busy} icon="lock">
            {t('st.pw.btn')}
          </Button>
          <Button variant="ghost" size="sm" icon={show ? 'eyeOff' : 'eye'} onClick={() => setShow((s) => !s)} aria-pressed={show}>
            {show ? t('ma.hide') : t('ma.reveal')}
          </Button>
        </div>
      </form>
      <form
        className="mb-form mb-form--sep"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return;
          setEBusy(true);
          try {
            toast(await actions.changeEmail(email.trim()), 'info');
            setEmail('');
          } catch (y) {
            toast(y.message, 'error');
          } finally {
            setEBusy(false);
          }
        }}
      >
        <p className="mb-subhead">{t('st.email.title')}</p>
        <p className="mb-faint mb-small">{t('st.email.d')}</p>
        <div className="mb-copy">
          <input className="mb-input" type="email" placeholder="new@example.com" aria-label={t('st.email.title')} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" variant="secondary" busy={eBusy}>
            {t('st.email.btn')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
