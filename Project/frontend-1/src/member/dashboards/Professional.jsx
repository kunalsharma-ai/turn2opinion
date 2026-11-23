// Professional: "Insight Studio". Calm, analytical and premium.
// Story: Responses -> Data -> Analysis -> Insight, drawn with the member's real numbers.
import { t, tn, fmt, relTime } from '../i18n/t.js';
import { Counter, Icon, MLink, cx } from '../components/ui.jsx';
import { InsightPipeline } from '../components/art.jsx';
import { Donut, ProfileJourney, QualityTile, Sparkline, StackBar, SurveyDiscovery, VaultTile, XEmpty, XError, XHead, XSkel, useDash, ABOUT_YOU } from '../components/Sections.jsx';
import { BenchmarkReport, EngageStrip, ExpertBadges, ImpactStories, QuickPoll } from '../components/Engage.jsx';
import { BonusBanner } from '../components/Grow.jsx';
import XHero from './Hero.jsx';
import WorldTeaser from '../components/WorldTeaser.jsx';

export default function ProfessionalDashboard() {
  const d = useDash();
  const open = d.surveys?.length || 0;
  return (
    <div className="xp xp--dash xd xd--pro">
      <XHero
        me={d.me}
        headline={t('xpz.headline')}
        lead={t('xpz.lead')}
        progress={d.pc && { label: t('xpz.progress'), value: d.pc.percent, max: 100, hint: d.pc.left ? tn('pc.left', d.pc.left) : t('pc.done') }}
        actions={[
          { label: open ? tn('xpz.briefs', open) : t('nav.surveys'), to: 'surveys', iconEnd: 'arrow' },
          { label: t('xpz.dossier'), to: 'profiles', icon: 'id', iconEnd: null }
        ]}
        art={
          <InsightPipeline
            bars={d.weeks}
            responses={d.stats?.complete || 0}
            rate={d.rate}
            labels={{ responses: t('xpz.p.responses'), data: t('xpz.p.data'), analysis: t('xpz.p.analysis'), insight: t('xpz.p.insight'), rate: t('pro.rate') }}
          />
        }
      />
      <BonusBanner compact />
      <EngageStrip />
      <WorldTeaser />
      <div className="xpro-row">
        <ProfileJourney variant="dossier" />
        <Analytics />
      </div>
      <ExpertBadges />
      <SurveyDiscovery variant="briefs" limit={6} />
      <BenchmarkReport />
      <div className="xbento xbento--pro">
        <Qualification />
        <QualityTile />
        <VaultTile />
      </div>
      <div className="xe-row">
        <QuickPoll />
        <ImpactStories limit={2} />
      </div>
      <ActivityLog />
    </div>
  );
}

function Analytics() {
  const d = useDash();
  const s = d.stats;
  const eight = d.weeks.reduce((n, v) => n + v, 0);
  return (
    <section className="xs xs--analytics" aria-labelledby="xs-an">
      <XHead id="xs-an" icon="pulse" eyebrow={t('xpz.an.eyebrow')} title={t('pro.insights')} />
      {d.stStatus === 'error' ? (
        <XError />
      ) : !s ? (
        <XSkel rows={3} h={54} />
      ) : !s.total ? (
        <XEmpty compact kind="history" title={t('xpz.an.empty')} />
      ) : (
        <div className="xan">
          <div className="xan__trend">
            <p className="xan__k">{t('xpz.an.trend')}</p>
            <p className="xan__v">
              <Counter value={eight} /> <small>{t('pts.balance')}</small>
            </p>
            <Sparkline values={d.weeks} label={t('xpz.an.trend')} />
            <p className="xan__axis" aria-hidden="true">
              <span>{t('xpz.an.8w')}</span>
              <span>{t('time.today')}</span>
            </p>
          </div>
          <div className="xan__rate">
            <Donut value={d.rate} size={104} label={`${t('pro.rate')} ${Math.round(d.rate * 100)}%`}>
              <strong>{Math.round(d.rate * 100)}%</strong>
            </Donut>
            <p className="xan__k">{t('pro.rate')}</p>
          </div>
          <div className="xan__mix">
            <p className="xan__k">{t('xpz.an.outcomes')}</p>
            <StackBar
              label={t('xpz.an.outcomes')}
              parts={[
                { key: 'ok', value: s.complete, label: t('ac.s.complete') },
                { key: 'out', value: s.disqualified, label: t('ac.s.disq') },
                { key: 'left', value: s.abandoned, label: t('ac.s.abandoned') }
              ]}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Qualification() {
  const d = useDash();
  const prof = (d.profiles || []).find((p) => p.slug === 'professional');
  const ok = prof && prof.completion >= 100;
  const cats = (d.allProfiles || []).filter((p) => !ABOUT_YOU.includes(p.slug));
  const doneN = cats.filter((c) => c.completion >= 100).length;
  const shown = [...cats].sort((a, b) => (b.completion >= 100) - (a.completion >= 100)).slice(0, 6);
  return (
    <section className={cx('xt xt--qual', ok ? 'is-ok' : 'is-partial')} aria-labelledby="xt-qual">
      <span className="xt__k" id="xt-qual">
        {t('pro.qual')}
      </span>
      <span className="xt__seal" aria-hidden="true">
        <Icon name={ok ? 'check' : 'clock'} size={26} strokeWidth={2.4} />
      </span>
      <span className="xt__big">{ok ? t('pro.qual.ok') : t('pro.qual.partial')}</span>
      {cats.length > 0 && (
        <>
          {/* Round 23: a progress line and the first few topics, not every topic as a tag */}
          <span className="xt__prog" role="img" aria-label={`${doneN} / ${cats.length}`}>
            <i style={{ width: `${Math.round((doneN / cats.length) * 100)}%` }} />
          </span>
          <span className="xt__count">
            {doneN} / {cats.length} {t('pro.categories')}
          </span>
          <ul className="xt__tags" aria-label={t('pro.categories')}>
            {shown.map((c) => (
              <li key={c.slug} className={cx(c.completion >= 100 && 'is-on')}>
                {c.name}
              </li>
            ))}
            {cats.length > shown.length && (
              <li className="xt__more">
                <MLink to="profiles">+{cats.length - shown.length}</MLink>
              </li>
            )}
          </ul>
        </>
      )}
    </section>
  );
}

function ActivityLog() {
  const d = useDash();
  const list = (d.activity || []).slice(0, 6);
  return (
    <section className="xs xs--log" aria-labelledby="xs-log">
      <XHead
        id="xs-log"
        icon="layers"
        eyebrow={t('ar.eyebrow')}
        title={t('xpz.log')}
        action={
          <MLink to="activity" className="mb-linkbtn">
            {t('ac.all')}
          </MLink>
        }
      />
      {d.aStatus === 'error' ? (
        <XError text={t('ac.err')} onRetry={d.aRetry} />
      ) : !d.activity ? (
        <XSkel rows={3} h={40} />
      ) : !list.length ? (
        <XEmpty compact kind="activity" title={t('ac.empty.t')}>
          {t('ac.empty.p')}
        </XEmpty>
      ) : (
        <ol className="xlog">
          {list.map((a) => (
            <li key={a.id} className={`is-${a.status}`}>
              <span className="xlog__dot" aria-hidden="true" />
              <span className="xlog__when">{relTime(a.date)}</span>
              <span className="xlog__name">{a.name}</span>
              <span className="xlog__st">{t(`ac.${a.status}`) === `ac.${a.status}` ? t('ac.other') : t(`ac.${a.status}`)}</span>
              <span className="xlog__pts">{a.points > 0 ? `+${fmt(a.points)}` : '—'}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
