// Three distinct dashboards, one per member type. Each has its own hero visual, layout, colours
// and section styles (see member-x.css), and all read the same data sections.
//   Consumer      "Opinion Playground"  dashboards/Consumer.jsx
//   Professional  "Insight Studio"      dashboards/Professional.jsx
//   Teen          "Voice Lab"           dashboards/Teen.jsx
// Order on every dashboard follows the member journey: profile above surveys, then rewards,
// quality, referrals and activity.
import { useMe } from '../data/MemberData.jsx';
import ConsumerDashboard from './Consumer.jsx';
import ProfessionalDashboard from './Professional.jsx';
import TeenDashboard from './Teen.jsx';

export { ConsumerDashboard, ProfessionalDashboard, TeenDashboard };

export default function DashboardPage() {
  const me = useMe();
  if (me.type === 'pro') return <ProfessionalDashboard />;
  if (me.type === 'teen') return <TeenDashboard />;
  return <ConsumerDashboard />;
}
