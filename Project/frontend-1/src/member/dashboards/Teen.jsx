// Teen: "Voice Lab". Bright, collaborative and age-appropriate. No cash language: points, badges
// and the guardian's consent are front and centre.
import { t, tn, fmt } from '../i18n/t.js';
import { Badge, Button, Counter, Icon, cx } from '../components/ui.jsx';
import { VoiceConstellation } from '../components/art.jsx';
import { ActivityRibbon, BadgeShelf, ProfileJourney, SurveyDiscovery, XHead, XSkel, useDash } from '../components/Sections.jsx';
import { useAchievements } from '../components/Modules.jsx';
import { useSection } from '../data/MemberData.jsx';
import { EngageStrip, GuardianSummary, ImpactStories, LearningBadges, QuickPoll, SeasonChallenge } from '../components/Engage.jsx';
import { BonusBanner } from '../components/Grow.jsx';
import XHero from './Hero.jsx';
import WorldTeaser from '../components/WorldTeaser.jsx';

export default function TeenDashboard() {
  const d = useDash();
  const ach = useAchievements();
  const [g] = useSection('guardian');
  const next = ach.find((a) => a.have < a.goal);
  const done = d.stats?.complete || 0;
  return (
    <div className="xp xp--dash xd xd--teen">
      <XHero
        me={d.me}
        headline={t('xt2.headline')}
        lead={t('xt2.lead')}
        chips={
          g && (
            <li className={cx('xh__chip', g.status === 'approved' ? 'is-ok' : 'is-warn')}>
              <Icon name="shield" size={14} />
              {g.status === 'approved' ? t('xt2.guardianOk') : t('gc.pending')}
            </li>
          )
        }
        progress={next && { label: t('xt2.next', { name: t(`ach.${next.id}`) }), value: Math.min(next.have, next.goal), max: next.goal, text: t('ach.progress', { a: fmt(Math.min(next.have, next.goal)), b: fmt(next.goal) }) }}
        actions={[
          { label: d.surveys?.length ? tn('xt2.missions', d.surveys.length) : t('pc.cta'), to: d.surveys?.length ? 'surveys' : 'profiles', iconEnd: 'arrow' },
          { label: t('xt2.badges'), to: 'rewards', icon: 'trophy', iconEnd: null }
        ]}
        art={<VoiceConstellation voices={done + 3} label={tn('xt2.voices', done)} />}
      />
      <BonusBanner compact />
      <SeasonChallenge />
      <EngageStrip />
      <WorldTeaser />
      <ProfileJourney variant="quests" />
      <SurveyDiscovery variant="missions" limit={6} />
      <div className="xe-row">
        <QuickPoll teen />
        <LearningBadges />
      </div>
      <div className="xbento xbento--teen">
        <BadgeShelf list={ach} title={t('xt2.shelf')} />
        <PointsJar />
        <GuardianPanel />
      </div>
      <div className="xe-row">
        <GuardianSummary />
        <ImpactStories limit={2} />
      </div>
      <ActivityRibbon title={t('xt2.timeline')} />
    </div>
  );
}

/** Points jar: one coin per survey that earned points, filling towards the 10-survey badge. */
function PointsJar() {
  const d = useDash();
  const coins = (d.activity || []).filter((a) => a.points > 0).length;
  const fill = Math.min(1, (d.stats?.complete || 0) / 10);
  return (
    <section className="xt xt--jar" aria-labelledby="xt-jar">
      <span className="xt__k" id="xt-jar">
        {t('pts.teenTitle')}
      </span>
      <span className="xjar" style={{ '--f': fill }} aria-hidden="true">
        <span className="xjar__lid" />
        <span className="xjar__glass">
          <span className="xjar__fill" />
          {Array.from({ length: Math.min(coins, 10) }, (_, i) => (
            <i key={i} className="xjar__coin" style={{ '--i': i, '--x': `${8 + ((i * 23) % 62)}px`, '--y': `${4 + Math.floor(i / 3) * 14}px` }} />
          ))}
        </span>
      </span>
      <span className="xt__big">{d.points ? <Counter value={d.points.total} /> : '…'} {t('pts.balance')}</span>
      <span className="xt__v">{t('xt2.jar', { n: Math.max(0, 10 - (d.stats?.complete || 0)) })}</span>
    </section>
  );
}

function GuardianPanel() {
  const [g, status] = useSection('guardian');
  const date = (v) => {
    try {
      return new Date(v).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '';
    }
  };
  const ok = g?.status === 'approved';
  return (
    <section className={cx('xs xs--guardian', ok ? 'is-ok' : 'is-wait')} aria-labelledby="xs-gc">
      <XHead id="xs-gc" icon="shield" eyebrow={t('xt2.safe')} title={t('gc.title')} />
      {status === 'loading' ? (
        <XSkel rows={2} h={40} />
      ) : g ? (
        <>
          <div className="xg-seal">
            <span className="xg-seal__shield" aria-hidden="true">
              <Icon name={ok ? 'check' : 'clock'} size={26} strokeWidth={2.6} />
            </span>
            <div>
              <Badge tone={ok ? 'success' : 'warning'}>{ok ? t('gc.approved') : t('gc.pending')}</Badge>
              {g.name && (
                <p className="xg-seal__who">
                  {t('gc.by')}: <strong>{g.name}</strong>
                  {g.relation ? ` (${g.relation})` : ''}
                </p>
              )}
            </div>
          </div>
          <dl className="xg-facts">
            {g.date && (
              <div>
                <dt>{t('gc.date')}</dt>
                <dd>{date(g.date)}</dd>
              </div>
            )}
            {g.version && (
              <div>
                <dt>{t('gc.version')}</dt>
                <dd className="mb-mono">{g.version}</dd>
              </div>
            )}
          </dl>
        </>
      ) : (
        <p className="mb-muted mb-small">{t('gc.unknown')}</p>
      )}
      <Button to="/teen/profile/" size="sm" variant="ghost" iconEnd="arrow">
        {t('gc.view')}
      </Button>
    </section>
  );
}
