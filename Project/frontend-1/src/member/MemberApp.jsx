// The member area (frontend-1). One persistent app for every /member/* route this build serves:
// data loads once and survives navigation between Dashboard, Rewards, Referrals and the rest.
// Profiles (/member/profiles/) and Surveys (/member/surveys/) are rebuilt here too, on the same
// profile, question and survey endpoints the existing member app uses.
import { useEffect } from 'react';
import { usePath } from '../router/Router.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { ENV } from '../config/env.js';
import { MemberDataProvider, useMemberData } from './data/MemberData.jsx';
import { AppearanceProvider } from './theme/AppearanceProvider.jsx';
import { setMemberLanguage, t } from './i18n/t.js';
import DashboardShell from './components/Shell.jsx';
import { Button, ToastProvider } from './components/ui.jsx';
import DashboardPage from './dashboards/Dashboards.jsx';
import { ActivityPage, QualityPage, ReferralsPage, RewardsPage } from './pages/Pages.jsx';
import { ProfilePage, SettingsPage } from './pages/Account.jsx';
import { ProfilesPage } from './pages/Profiles.jsx';
import { SurveysPage } from './pages/Surveys.jsx';
import baseCss from './member.css?inline';
import xCss from './member-x.css?inline';
import xpCss from './member-xp.css?inline';
import xeCss from './member-xe.css?inline';
import v6Css from './v6/v6.css?inline';
import v6MemberCss from './v6/member-v6.css?inline';
import { BrandLoader } from './components/art.jsx';

const memberCss = `${baseCss}\n${xCss}\n${xpCss}\n${xeCss}\n${v6Css}\n${v6MemberCss}`;

const PAGES = {
  dashboard: DashboardPage,
  profiles: ProfilesPage,
  surveys: SurveysPage,
  rewards: RewardsPage,
  'quality-score': QualityPage,
  referrals: ReferralsPage,
  activity: ActivityPage,
  profile: ProfilePage,
  settings: SettingsPage
};

function useMemberStyles() {
  useEffect(() => {
    let el = document.getElementById('mb-css');
    if (!el) {
      el = document.createElement('style');
      el.id = 'mb-css';
      el.textContent = memberCss;
      document.head.appendChild(el);
    }
    document.documentElement.classList.add('is-member');
    return () => document.documentElement.classList.remove('is-member');
  }, []);
}

function Loading() {
  return (
    <div className="mb-boot" role="status" aria-live="polite">
      <BrandLoader label={t('auth.checking')} />
    </div>
  );
}

function Gate({ children }) {
  const { me, reloadMe } = useMemberData();
  useEffect(() => {
    if (me.status === 'error' && me.error && /token|unauthori[sz]ed|login|invalid request/i.test(me.error.message) && !ENV.DEMO_MODE) {
      window.location.replace(`/login/?next=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [me]);
  if (me.status === 'loading' && !me.data) return <Loading />;
  if (me.status === 'error')
    return (
      <div className="mb-boot">
        <div className="mb-boot__card">
          <p className="mb-error__title">{t('auth.needLogin')}</p>
          <div className="mb-row">
            <Button href="/login/">{t('auth.login')}</Button>
            <Button variant="ghost" icon="refresh" onClick={reloadMe}>
              {t('st8.retry')}
            </Button>
          </div>
        </div>
      </div>
    );
  return children(me.data);
}

function Themed({ me, children }) {
  return <AppearanceProvider memberType={me.type}>{children}</AppearanceProvider>;
}

export default function MemberApp() {
  useMemberStyles();
  const path = usePath();
  const { lang } = useI18n();
  useEffect(() => setMemberLanguage(lang), [lang]);
  const slug = path.split('/').filter(Boolean)[1] || 'dashboard';
  const Page = PAGES[slug] || DashboardPage;
  useEffect(() => {
    document.getElementById('mb-main')?.focus({ preventScroll: true });
  }, [slug]);
  return (
    <div className="mb-root">
      <MemberDataProvider>
        <ToastProvider>
          <Gate>
            {(me) => (
              <Themed me={me}>
                <DashboardShell>
                  <Page key={slug} />
                </DashboardShell>
              </Themed>
            )}
          </Gate>
        </ToastProvider>
      </MemberDataProvider>
    </div>
  );
}
