// Entry for the dashboard-only preview file (npm run preview:member). Opens straight on the member
// dashboard with sample data: no public site, no registration. Never deployed.
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Router } from '../router/Router.jsx';
import { I18nProvider, useI18n } from '../i18n/I18nProvider.jsx';
import MemberApp from './MemberApp.jsx';

const LanguagePicker = lazy(() => import('../components/LanguagePicker.jsx').then((m) => ({ default: m.LanguagePicker })));

function Languages() {
  const { picker } = useI18n();
  return <Suspense fallback={null}>{picker && <LanguagePicker />}</Suspense>;
}

// Anything outside the member area (public pages, Surveys, Profiles) is not in this file.
const onMember = () => /^#\/member\//.test(location.hash);
if (!onMember()) location.replace('#/member/dashboard/');
window.addEventListener('hashchange', () => {
  if (!onMember()) location.replace('#/member/dashboard/');
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <I18nProvider>
        <MemberApp />
        <Languages />
      </I18nProvider>
    </Router>
  </StrictMode>
);
