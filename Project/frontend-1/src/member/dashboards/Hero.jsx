// The large animated hero every dashboard opens with: greeting, headline, supporting message,
// a dynamic visual, a progress indicator and the primary call to action. The visual and colours
// change per member type; the structure stays the same so the page reads the same way.
import { t, fmt } from '../i18n/t.js';
import { HeroHello, HeroStats } from '../components/HeroBits.jsx';
import { Button, Icon, cx } from '../components/ui.jsx';

export function greeting(name) {
  const h = new Date().getHours();
  return t(h < 12 ? 'greet.morning' : h < 18 ? 'greet.afternoon' : 'greet.evening', { name });
}

const since = (d) => {
  try {
    return new Date(d).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
};

/** Agreement accepted = the 'terms' choice saved at sign-up. Accounts made before 18 Oct 2026 are not flagged. */
export const termsMissing = (me) => me.type !== 'teen' && !(me.terms || []).includes('terms') && new Date(me.joinedAt || 0) >= new Date('2026-10-18');

export default function XHero({ me, headline, lead, progress, actions, art, chips, className }) {
  const missing = termsMissing(me);
  const pct = progress ? Math.max(0, Math.min(1, progress.value / (progress.max || 1))) : 0;
  return (
    <section className={cx('xh', `xh--${me.type}`, className)} aria-labelledby="xh-hello">
      <div className="xh__bg" aria-hidden="true">
        <span className="xh__blob xh__blob--a" />
        <span className="xh__blob xh__blob--b" />
        <span className="xh__blob xh__blob--c" />
        <span className="xh__grain" />
      </div>
      <div className="xh__text">
        <ul className="xh__chips">
          <li className="xh__chip xh__chip--type">
            <Icon name={me.type === 'pro' ? 'briefcase' : me.type === 'teen' ? 'sparkles' : 'heart'} size={14} />
            {t(`member.${me.type}`)}
          </li>
          <li className={cx('xh__chip', missing ? 'is-warn' : 'is-ok')}>
            <span className="xh__pulse" aria-hidden="true" />
            {missing ? t('greet.status.terms') : t('greet.status.active')}
          </li>
          {me.joinedAt && <li className="xh__chip xh__chip--quiet">{t('greet.memberSince', { date: since(me.joinedAt) })}</li>}
          {chips}
        </ul>
        <div className="xh__hello" id="xh-hello">
          <HeroHello me={me} />
        </div>
        <h1 className="xh__headline">
          {String(headline)
            .split(' ')
            .map((w, i) => (
              <span key={i} className="xh__word" style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
        </h1>
        <p className="xh__lead">{lead}</p>
        <HeroStats showPayout={me.type === 'consumer'} />
        {progress && (
          <div className="xh__progress">
            <div className="xh__progress-top">
              <span>{progress.label}</span>
              <strong>{progress.text ?? `${Math.round(pct * 100)}%`}</strong>
            </div>
            <span className="xh__track" role="progressbar" aria-label={progress.label} aria-valuemin={0} aria-valuemax={progress.max} aria-valuenow={Math.min(progress.value, progress.max)} aria-valuetext={progress.text}>
              <i style={{ '--w': pct }} />
            </span>
            {progress.hint && <p className="xh__hint">{progress.hint}</p>}
          </div>
        )}
        <div className="xh__actions">
          {actions.map((a, i) => (
            <Button key={a.label} to={a.to} icon={a.icon} iconEnd={a.iconEnd ?? (i === 0 ? 'arrow' : undefined)} variant={i === 0 ? 'primary' : 'ghost'} className={i === 0 ? 'xh__cta' : 'xh__cta2'}>
              {a.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="xh__art">{art}</div>
    </section>
  );
}

export const pointsText = (p) => (p ? t('hdr.points', { n: fmt(p.total) }) : '…');
