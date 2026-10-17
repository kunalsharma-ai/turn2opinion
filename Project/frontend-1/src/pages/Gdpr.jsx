import LegalLayout, { LegalArt } from '../components/LegalLayout.jsx';
import { Link } from '../router/Router.jsx';
import { SITE } from '../config/site.js';
import Icon from '../components/Icon.jsx';

const RIGHTS = [
  ['search', 'Access', 'Ask what personal data we hold about you.'],
  ['pen', 'Rectification', 'Correct anything inaccurate or incomplete.'],
  ['x', 'Erasure', 'Ask us to delete your data – the “right to be forgotten”.'],
  ['filter', 'Restriction', 'Limit how we use your data.'],
  ['transfer', 'Portability', 'Receive your data in a usable format.'],
  ['flag', 'Objection', 'Object to processing, including direct marketing.']
];

const sections = [
  {
    id: 'what',
    title: 'GDPR and market research',
    icon: 'globe',
    body: (
      <>
        <p>
          The General Data Protection Regulation (GDPR) applies to everyone in the EU and to every organisation that handles their data. It
          changed how data is collected, stored, processed and analysed – and therefore how market research is done.
        </p>
        <p>
          Research can be quantitative (statistics, surveys, questionnaires) or qualitative (expressions, emotions, body language). Under GDPR
          we protect not only individual items of personal data but also combinations that could identify a person.
        </p>
      </>
    )
  },
  {
    id: 'rights',
    title: 'Your rights under GDPR',
    icon: 'user',
    body: (
      <>
        <ul className="rights-grid">
          {RIGHTS.map(([ic, t, d]) => (
            <li key={t}>
              <span>
                <Icon name={ic} size={20} />
              </span>
              <strong>{t}</strong>
              <small>{d}</small>
            </li>
          ))}
        </ul>
        <p>
          To use any of these rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You can also delete your account from your
          dashboard at any time.
        </p>
      </>
    )
  },
  {
    id: 'consent',
    title: 'Consent comes first',
    icon: 'check',
    body: (
      <>
        <p>
          We only contact people who have agreed to be contacted for surveys and opinion research, and we say so explicitly when asking for
          consent. Survey consent doesn’t mean marketing consent – newsletters and offers go only to members who opted in.
        </p>
        <p>Before contacting anyone we ask: are they the right people, will the research be useful, and do we have permission?</p>
      </>
    )
  },
  {
    id: 'purpose',
    title: 'Clear purpose for every cookie and data point',
    icon: 'target',
    body: (
      <p>
        We explain why each cookie is stored and what the information is used for at the point of collection, through our consent banner
        and <Link to="/cookies/">Cookie Policy</Link>. Our <Link to="/privacy/">Privacy Policy</Link> is linked from every invitation and from
        the site, including whether any data is shared with third parties.
      </p>
    )
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    icon: 'clock',
    body: (
      <p>
        Survey data is stored securely for analysis and kept only for a defined period. When that period ends, data is destroyed so it
        can’t be accessed without authorisation. You can ask us to erase information about you at any time.
      </p>
    )
  },
  {
    id: 'storage',
    title: 'Where data lives',
    icon: 'database',
    body: (
      <p>
        We choose storage and cloud providers carefully, with clear responsibility for security and privacy, and protect data in line with
        our ISO/IEC 27001 information-security certification. GDPR compliance reinforces the good practice every research company should
        follow – handled with care, there is nothing to fear.
      </p>
    )
  },
  {
    id: 'contact',
    title: 'Questions about GDPR',
    icon: 'mail',
    body: (
      <p>
        For anything related to GDPR-compliant research or your data, write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    )
  }
];

export default function Gdpr() {
  return (
    <LegalLayout
      crumb="GDPR"
      theme="grid"
      kicker="Data protection"
      title="GDPR & Data Protection"
      tagline="Your rights, clearly explained."
      lead="How Turn2Opinion runs GDPR-compliant market research – and the rights you keep over your personal data."
      art={<LegalArt icon="shield" words={['Consent', 'Purpose', 'Erasure']} />}
      sections={sections}
    />
  );
}
