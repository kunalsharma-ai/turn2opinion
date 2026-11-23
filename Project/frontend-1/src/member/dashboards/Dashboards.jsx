// ConsumerDashboard, ProfessionalDashboard and TeenDashboard: the same modules, composed per
// member type from config/memberTypes.js LAYOUT. Nothing here fetches data.
import { LAYOUT } from '../config/memberTypes.js';
import { useMe } from '../data/MemberData.jsx';
import { Achievements, ActivityTimeline, ExpertiseCard, GuardianConsentCard, InsightsCard, KingdomCard, PointsCard, ProfileCompletionCard, QualificationCard, QualityScoreCard, ReferralCard, SurveySection, WelcomeHero } from '../components/Modules.jsx';

const MODULES = {
  surveys: () => <SurveySection limit={6} />,
  points: () => <PointsCard />,
  quality: () => <QualityScoreCard />,
  profile: () => <ProfileCompletionCard />,
  referral: () => <ReferralCard />,
  activity: () => <ActivityTimeline limit={6} />,
  achievements: () => <Achievements limit={6} />,
  kingdom: () => <KingdomCard />,
  expertise: () => <ExpertiseCard />,
  qualification: () => <QualificationCard />,
  insights: () => <InsightsCard />,
  guardian: () => <GuardianConsentCard />
};

function Composer({ type }) {
  const layout = LAYOUT[type] || LAYOUT.consumer;
  return (
    <div className={`mb-dash mb-dash--${type}`}>
      <WelcomeHero />
      <div className="mb-dash__grid">
        <div className="mb-dash__main">
          {layout.main.map((id) => (
            <div key={id} className="mb-reveal">
              {MODULES[id]()}
            </div>
          ))}
        </div>
        <aside className="mb-dash__side" aria-label="Your status">
          {layout.side.map((id) => (
            <div key={id} className="mb-reveal">
              {MODULES[id]()}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export const ConsumerDashboard = () => <Composer type="consumer" />;
export const ProfessionalDashboard = () => <Composer type="pro" />;
export const TeenDashboard = () => <Composer type="teen" />;

export default function DashboardPage() {
  const me = useMe();
  if (me.type === 'pro') return <ProfessionalDashboard />;
  if (me.type === 'teen') return <TeenDashboard />;
  return <ConsumerDashboard />;
}
