// Consumer: "Opinion Playground". Friendly, reward-led and playful.
// Story: Opinion -> Survey -> Contribution -> Reward -> Impact, drawn as a live loop.
import { t, tn, fmt } from '../i18n/t.js';
import { Counter } from '../components/ui.jsx';
import { OpinionLoop } from '../components/art.jsx';
import { ActivityRibbon, BadgeShelf, JourneyRail, ProfileJourney, QualityTile, ReferralTile, SurveyDiscovery, VaultTile, useDash } from '../components/Sections.jsx';
import { useAchievements } from '../components/Modules.jsx';
import { EngageStrip, GemTiers, ImpactStories, LuckySpin, ProductTests, QuickPoll } from '../components/Engage.jsx';
import { BonusBanner } from '../components/Grow.jsx';
import XHero from './Hero.jsx';
import WorldTeaser from '../components/WorldTeaser.jsx';

export default function ConsumerDashboard() {
  const d = useDash();
  const ach = useAchievements();
  const p = d.points;
  const open = d.surveys?.length || 0;
  const stations = [
    { id: 'opinion', icon: 'user', label: t('xc.loop.opinion'), value: d.pc ? `${d.pc.percent}%` : '…' },
    { id: 'survey', icon: 'clipboard', label: t('xc.loop.survey'), value: d.sStatus === 'ready' ? tn('jr.open', open) : '…' },
    { id: 'contribution', icon: 'chat', label: t('xc.loop.contribution'), value: d.stats ? tn('jr.done', d.stats.complete) : '…' },
    { id: 'reward', icon: 'coin', label: t('xc.loop.reward'), value: p ? fmt(p.total) : '…' },
    { id: 'impact', icon: 'sparkles', label: t('xc.loop.impact'), value: t(`q.tier.${d.tier}`) }
  ];
  const actions =
    d.stage === 0
      ? [{ label: t('pc.cta'), to: 'profiles', iconEnd: 'arrow' }, { label: open ? tn('sv.count', open) : t('nav.surveys'), to: 'surveys', icon: 'clipboard', iconEnd: null }]
      : [{ label: open ? tn('sv.count', open) : t('nav.surveys'), to: 'surveys', iconEnd: 'arrow' }, { label: t('pts.view'), to: 'rewards', icon: 'coin', iconEnd: null }];
  return (
    <div className="xp xp--dash xd xd--consumer">
      <XHero
        me={d.me}
        headline={t('xc.headline')}
        lead={t('xc.lead')}
        actions={actions}
        art={
          <OpinionLoop
            stations={stations}
            stage={d.stage}
            center={
              <>
                <strong>{d.stats ? <Counter value={d.stats.complete} /> : '…'}</strong>
                <small>{t('xc.loop.center')}</small>
              </>
            }
          />
        }
      />
      <JourneyRail />
      <WorldTeaser />
      <BonusBanner compact />
      <EngageStrip />
      <ProfileJourney variant="road" />
      <div className="xe-row xe-row--wide">
        <LuckySpin />
        <GemTiers />
      </div>
      <SurveyDiscovery variant="deck" limit={5} />
      <ProductTests />
      <div className="xbento xbento--consumer">
        <VaultTile />
        <QualityTile />
        <ReferralTile />
        <BadgeShelf list={ach} limit={4} />
      </div>
      <div className="xe-row">
        <QuickPoll />
        <ImpactStories limit={2} />
      </div>
      <ActivityRibbon />
    </div>
  );
}
