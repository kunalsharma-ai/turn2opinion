import LegalLayout, { LegalArt } from '../components/LegalLayout.jsx';
import { Link } from '../router/Router.jsx';
import { SITE } from '../config/site.js';
import Icon from '../components/Icon.jsx';

const COLLECTED = [
  ['user', 'Contact details', 'Names, email addresses and phone numbers you give us on the site or in direct communication.'],
  ['globe', 'Log files', 'IP address, browser type, ISP, browser language, date and time of requests, operating system, referring/exit pages, clickstream data and plug-ins.'],
  ['clock', 'Browsing information', 'When you visited, pages viewed, time on each page and sites visited before or after a survey – collected through cookies.'],
  ['users', 'Demographics', 'Self-reported age, gender, education and similar details.'],
  ['briefcase', 'Firmographics', 'Self-reported employment details such as job title and profession.'],
  ['id', 'Profile information', 'Self-reported interests, technology use, consumer preferences and ownership.'],
  ['pulse', 'System metrics', 'Survey status (completed, terminated) and time spent in a survey, via survey redirects.']
];

const sections = [
  {
    id: 'scope',
    title: 'Who this policy covers',
    icon: 'layers',
    body: (
      <>
        <p>
          This Privacy Policy is published by {SITE.legalName} (“Frequent Research”, “we”, “us”) for Turn2Opinion. It explains how we
          collect, use, transfer and store personal information when you use turn2opinion.com, take part in Turn2Opinion-branded surveys
          and research, or receive our communications – and the choices you have.
        </p>
        <p>
          Other Frequent Research products may have their own policies. Surveys run by our clients, partners or other third parties are
          governed by their policies; please review them. If we collect personal information in connection with a third party’s survey,
          that collection is covered by this policy.
        </p>
        <p>We make this site and policy accessible to people with disabilities. If anything is hard to access, contact us and we’ll help.</p>
      </>
    )
  },
  {
    id: 'consent',
    title: 'Your consent',
    icon: 'check',
    body: (
      <>
        <p>
          Taking part in surveys and research is completely voluntary. By using the site or participating in Turn2Opinion research you
          consent to this policy. If you don’t agree, please don’t use the site or take part.
        </p>
        <p>
          We may receive personal information directly from you, or from partner research communities and sample providers that obtained
          your consent to share it. Where you joined through a third-party research community, that partner decides how your information is
          processed and we act on its instructions.
        </p>
      </>
    )
  },
  {
    id: 'collect',
    title: 'What we collect',
    icon: 'database',
    body: (
      <>
        <p>We comply with applicable laws, including the EU General Data Protection Regulation (GDPR). In the previous 12 months we have collected:</p>
        <ul className="info-tiles">
          {COLLECTED.map(([ic, t, d]) => (
            <li key={t}>
              <Icon name={ic} size={18} />
              <div>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </li>
          ))}
        </ul>
        <p>
          We may combine what your device transmits, what you submit and what we receive from third parties such as sample suppliers, web
          publishers and online service providers.
        </p>
      </>
    )
  },
  {
    id: 'use',
    title: 'How we use it',
    icon: 'target',
    body: (
      <>
        <p>We use information to operate, evaluate and improve our services, including to:</p>
        <ul className="tick-list">
          <li>match you with surveys you are likely to qualify for;</li>
          <li>answer your requests and support questions;</li>
          <li>tell you about services you use and, unless you opt out, new products;</li>
          <li>send updates or newsletters you subscribed to – every one includes an opt-out link;</li>
          <li>keep research quality high and prevent fraud.</li>
        </ul>
        <p className="promise">
          <Icon name="lock" size={18} /> We do not sell your personal details or share them with anyone for advertising. Survey responses are
          reported in aggregate and are not linked to your identity.
        </p>
      </>
    )
  },
  {
    id: 'tracking',
    title: 'Tracking technologies & cookies',
    icon: 'cookie',
    body: (
      <>
        <p>
          With your consent we use Google Analytics and similar tools to understand how the site is used and how effectively surveys are
          qualified. These may record your device IP address, the page URL and time viewed. Some surveys are delivered through third-party
          links or emails that use cookies or similar technologies.
        </p>
        <p>
          Full details, including how to change your choices, are in our <Link to="/cookies/">Cookie Policy</Link>.
        </p>
      </>
    )
  },
  {
    id: 'retention',
    title: 'Accuracy & retention',
    icon: 'clock',
    body: (
      <p>
        We work to keep your information accurate, complete and reliable, and keep it only as long as needed to provide the services you
        requested – or as long as a client engagement requires when we process data on their behalf. We may keep information longer where
        the law requires, to resolve disputes or to enforce our agreements.
      </p>
    )
  },
  {
    id: 'security',
    title: 'How we protect it',
    icon: 'shield',
    body: (
      <>
        <p>
          We use reasonable security measures – including encryption and authentication technology – to prevent loss, misuse and alteration
          of information, and we are ISO/IEC 27001 certified for information security. No internet transmission is ever 100% secure, and we
          can’t control the security of other sites you visit.
        </p>
        <p>
          If we learn of a security breach affecting you, we may notify you by email or by a notice on the site. Depending on where you live,
          you may have a right to written notice; contact us to request it.
        </p>
      </>
    )
  },
  {
    id: 'choices',
    title: 'Your choices & rights',
    icon: 'user',
    body: (
      <>
        <p>
          You can choose whether your personal information is disclosed to a third party or used for a purpose materially different from
          the one it was collected for. You can also access, correct, update or delete the information we hold about you.
        </p>
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We may verify your identity first and will respond within a reasonable
          time. Limiting use of your data may restrict some features. See also our <Link to="/gdpr/">GDPR page</Link>.
        </p>
      </>
    )
  },
  {
    id: 'third',
    title: 'Third-party sites',
    icon: 'external',
    body: (
      <p>
        The site may link to external websites or let you share information with third parties. We don’t control their content, privacy
        or security practices; information you give them is governed by their policies.
      </p>
    )
  },
  {
    id: 'minors',
    title: 'Members under 18',
    icon: 'users',
    body: (
      <>
        <p>
          Members under 18 may register and take part in surveys after informing a parent or legal guardian. During registration they provide
          a valid parent/guardian email, and we may send that address an acknowledgement. Parental verification is not required for
          activation, and Turn2Opinion isn’t responsible for incorrect information given at registration.
        </p>
        <p>Parents or guardians can at any time:</p>
        <ul className="tick-list">
          <li>request details of the minor’s participation;</li>
          <li>object to or restrict the minor’s use of the site;</li>
          <li>request suspension or deletion of the account;</li>
          <li>withdraw their acknowledgement.</li>
        </ul>
        <p>
          On a valid request we may restrict, suspend or close the account and delete or anonymise associated data, subject to legal
          requirements. We don’t knowingly collect sensitive information from minors without appropriate awareness.
        </p>
      </>
    )
  },
  {
    id: 'changes',
    title: 'Changes & contact',
    icon: 'mail',
    body: (
      <>
        <p>
          We may update this policy. Material changes will be announced by email or a notice on the site, and information is always handled
          under the policy in force when it was collected.
        </p>
        <address className="legal-address">
          {SITE.legalName}
          <br />
          {SITE.address.street}, {SITE.address.locality} – {SITE.address.postalCode}, {SITE.address.countryName}
          <br />
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </address>
      </>
    )
  }
];

export default function Privacy() {
  return (
    <LegalLayout
      crumb="Privacy Policy"
      theme="prism"
      kicker="Your data, your rules"
      title="Turn2Opinion Privacy Policy"
      tagline="Your details stay with us – never sold, never shared."
      lead="What we collect, why we collect it, how we protect it – and the control you keep over it."
      art={<LegalArt icon="lock" words={['Never sold', 'Encrypted', 'Your rights']} />}
      sections={sections}
    />
  );
}
