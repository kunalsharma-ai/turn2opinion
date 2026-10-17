import LegalLayout, { LegalArt } from '../components/LegalLayout.jsx';
import { Link } from '../router/Router.jsx';
import { SITE } from '../config/site.js';
import Icon from '../components/Icon.jsx';

const sections = [
  {
    id: 'privacy-value',
    title: 'We value your data privacy',
    icon: 'heart',
    body: (
      <>
        <p>
          We value and care about the privacy of your personal information. Under our data privacy policy, your personal data is used for
          market research purposes only and is kept secure. It is not shared with third-party vendors, and we limit the collection of
          sensitive data in any in-house or third-party survey.
        </p>
        <p>
          You get more opportunities to take part in survey categories you prefer. Your opinion helps our clients make better decisions –
          and helps you earn more rewards.
        </p>
      </>
    )
  },
  {
    id: 'consent-form',
    title: 'General consent',
    icon: 'clipboard',
    body: (
      <p>
        Turn2Opinion and our parent company, {SITE.legalName}, value your input and your privacy. Once you log in, Turn2Opinion collects
        and uses your personal information to deliver our research services, websites and applications (our “Services”). This consent
        explains how, what and why we use your personal data, and how you can access, update or otherwise control the personal data we
        process for research.
      </p>
    )
  },
  {
    id: 'personal',
    title: 'Personal data we use',
    icon: 'id',
    body: (
      <ul className="data-chips">
        {[
          ['user', 'Name'],
          ['pin', 'Location'],
          ['phone', 'Telephone number'],
          ['calendar', 'Date of birth'],
          ['mail', 'Email address']
        ].map(([ic, t]) => (
          <li key={t}>
            <Icon name={ic} size={18} /> {t}
          </li>
        ))}
      </ul>
    )
  },
  {
    id: 'additional',
    title: 'Additional information we collect',
    icon: 'database',
    body: (
      <>
        <ul className="data-chips">
          <li>
            <Icon name="pulse" size={18} /> Behaviour tracking
          </li>
          <li>
            <Icon name="cookie" size={18} /> Cookie history
          </li>
        </ul>
        <p>
          See our <Link to="/cookies/">Cookie Policy</Link> for details and choices.
        </p>
      </>
    )
  },
  {
    id: 'accept',
    title: 'What you agree to',
    icon: 'check',
    body: (
      <ul className="tick-list">
        <li>
          To activate your account you must accept these Terms and Conditions and our <Link to="/privacy/">Privacy Notice</Link>.
        </li>
        <li>To access more available surveys you must agree to take part in surveys and other market research activities.</li>
        <li>You keep one account per person and provide true, accurate information.</li>
        <li>Rewards are subject to verification of your profile and survey completions, and the methods available in your country.</li>
      </ul>
    )
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'mail',
    body: (
      <p>
        Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit our <Link to="/contact/">contact page</Link>.
      </p>
    )
  }
];

export default function Terms() {
  return (
    <LegalLayout
      crumb="Terms & Conditions"
      theme="paper"
      kicker="Terms of use"
      title="Terms & Conditions"
      tagline="Fair rules for every member."
      lead="The general consent and terms that apply when you join Turn2Opinion and take part in research."
      art={<LegalArt icon="clipboard" words={['Fair', 'Clear', 'Consent']} />}
      sections={sections}
    />
  );
}
