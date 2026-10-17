import { useState } from 'react';
import { useReveal } from '../hooks/useMounted.js';
import { PageHero } from '../components/Common.jsx';
import { Link } from '../router/Router.jsx';
import Icon from '../components/Icon.jsx';

const CATS = [
  {
    id: 'essential',
    name: 'Essential',
    icon: 'lock',
    color: '#1F5BFF',
    always: true,
    intro: 'Necessary for the core functionality of the website and its features, such as access to secure areas.',
    rows: [
      ['connection.sid', 'Stores authentication and authorisation after login to provide a personalised experience.', 'http_cookie', '30 days / logout'],
      ['twk_idm_key, TawkConnectionTime, twk_uuid_XXXX', 'Live chat support (Tawk.to). Set by a third party; the live-agent chat depends on them.', 'http_cookie', 'Managed by Tawk.to'],
      ['Google_RECAPTCHA', 'Spam protection and robot detection.', 'http_cookie', 'Managed by Google'],
      ['VisitorInfo*', 'YouTube video embedding and analytics.', 'http_cookie', 'Managed by YouTube'],
      ['t2o_consent_v1', 'Remembers your cookie choices on this site.', 'local_storage', 'Until you clear it']
    ]
  },
  {
    id: 'performance',
    name: 'Performance & functionality',
    icon: 'pulse',
    color: '#12C29B',
    intro: 'Improve performance and functionality but are non-essential. Without them some features (like videos) may be unavailable.',
    rows: [
      ['_hjSessionUser_XXXX, _hjFirstSeen, _hjIncludedInSessionSample, _hjSession_XXXX, _hjIncludedInPageviewSample, _hjAbsoluteSessionInProgress', 'Proactively tracks website and app issues before a visitor reports them.', 'http_cookie', 'Managed by Hotjar'],
      ['_GA*, NID*, IDE*, ANID*', 'Google Analytics information about how visitors use the site.', 'http_cookie', 'Managed by Google']
    ]
  },
  {
    id: 'social',
    name: 'Social & advertising',
    icon: 'megaphone',
    color: '#FF5C7A',
    intro: 'Let you share our content through social networks and other websites. They may also be used for advertising.',
    rows: []
  },
  {
    id: 'unclassified',
    name: 'Unclassified',
    icon: 'search',
    color: '#FFB020',
    intro: 'Cookies we are still classifying with the help of their providers.',
    rows: [['Auth', 'Token for automatic login when you select “Remember me”.', 'html_local_storage', 'Persistent']]
  }
];

function CookieJar() {
  return (
    <div className="jar" aria-hidden="true">
      <div className="jar-lid" />
      <div className="jar-body">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="jar-cookie" style={{ '--i': i }}>
            <Icon name="cookie" size={26} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Cookies() {
  const ref = useReveal();
  const [tab, setTab] = useState('essential');
  const cat = CATS.find((c) => c.id === tab);
  return (
    <div ref={ref}>
      <PageHero
        theme="waves"
        crumbs={[{ label: 'Cookie Policy' }]}
        kicker="Cookies, explained"
        title="Turn2Opinion Cookie Policy"
        tagline="You choose what we store."
        lead="We use different types of cookies to optimise your experience. Choose which types to allow and change your preferences at any time."
        art={<CookieJar />}
      >
        <div className="ph-actions">
          <button type="button" className="btn btn-gold" onClick={() => window.dispatchEvent(new Event('t2o:open-consent'))}>
            <Icon name="gear" size={18} /> Change cookie preferences
          </button>
        </div>
      </PageHero>

      <section className="section s-paper">
        <div className="wrap">
          <p className="cookie-intro" data-reveal>
            Disabling cookies may affect your experience on the website. Learn more in our <Link to="/privacy/">Privacy Policy</Link>.
          </p>
          <div className="cookie-tabs" role="tablist" aria-label="Cookie categories">
            {CATS.map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={tab === c.id} className={tab === c.id ? 'is-on' : ''} style={{ '--c': c.color }} onClick={() => setTab(c.id)}>
                <Icon name={c.icon} size={20} />
                <span>{c.name}</span>
                {c.always && <small>Always on</small>}
              </button>
            ))}
          </div>
          <div className="cookie-panel" role="tabpanel" key={tab} style={{ '--c': cat.color }}>
            <p className="cookie-cat-intro">{cat.intro}</p>
            {cat.rows.length ? (
              <div className="table-wrap">
                <table className="cookie-table">
                  <caption className="sr-only">{cat.name} cookies</caption>
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Purpose</th>
                      <th scope="col">Type</th>
                      <th scope="col">Expires in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.rows.map((r) => (
                      <tr key={r[0]}>
                        <td data-label="Name">
                          <code>{r[0]}</code>
                        </td>
                        <td data-label="Purpose">{r[1]}</td>
                        <td data-label="Type">{r[2]}</td>
                        <td data-label="Expires in">{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty">No cookies in this category are currently set by default. Any added later will appear here and only load with your consent.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
