// Consumer Panel Terms, Conditions, Privacy Notice and Consent — the legal text (English, authoritative).
//
// Edit the wording HERE. Structure:
//   CHAPTERS  six colour-graded groups shown on the page (order = reading order)
//   SECTIONS  the 22 numbered sections. `short` is the plain-language summary shown on the card (translated in
//             src/i18n/strings/*.js); `body` is the full legal text: strings are paragraphs, { h } a sub-heading,
//             { ol } / { ul } lists. Tokens in {curly braces} are filled from the page config (src/config.js).
// Bump TERMS_VERSION in src/config.js whenever the meaning changes — members are then asked to agree again.

export const CHAPTERS = [
  { id: 'join', icon: 'door', grade: ['#1f5bff', '#49b6ff', '#bfe0ff'], sections: [1, 2] },
  { id: 'data', icon: 'layers', grade: ['#0fb48f', '#3fd6e8', '#b8fff0'], sections: [3, 4, 15] },
  { id: 'surveys', icon: 'coins', grade: ['#ff9f1a', '#ff5c7a', '#ffe3a3'], sections: [5, 6] },
  { id: 'privacy', icon: 'shield', grade: ['#7b5cff', '#4d8dff', '#d6ccff'], sections: [7, 8, 9, 13] },
  { id: 'special', icon: 'mic', grade: ['#ff4d8d', '#ff8a5c', '#ffd0e0'], sections: [10, 11, 12, 18] },
  { id: 'account', icon: 'key', grade: ['#16297a', '#1f5bff', '#9db8ff'], sections: [14, 16, 17, 19, 20, 21] },
];

export const SECTIONS = {
  1: {
    icon: 'wave',
    title: 'Welcome to Our Consumer Panel',
    short: 'You join a research community to share opinions in surveys. Taking part is always your choice.',
    body: [
      'Welcome to our consumer research community. By joining our panel, you can participate in surveys, opinion polls, product and service research, and other market research activities.',
      'Our purpose is to understand consumer preferences, experiences, opinions and purchasing behaviour to help businesses and organisations make better-informed decisions.',
      'Your participation is voluntary. We aim to handle your information responsibly, explain how it is used, and provide appropriate choices about your participation and privacy.',
    ],
  },
  2: {
    icon: 'badge',
    title: 'Eligibility and Membership',
    short: 'Meet the age rule for your country, give true details, use one account that is yours.',
    body: [
      {
        ol: [
          'You must meet the minimum age requirement applicable to your country and the particular research study.',
          'Where a study is restricted to adults, you must meet the applicable adult age requirement.',
          'You must provide accurate, current and complete registration information.',
          'You may maintain only the number of accounts permitted by our published panel rules. Duplicate or fraudulent accounts may be suspended.',
          'You must use your own account and must not impersonate another person.',
          'Membership is subject to successful registration, any required verification and acceptance of the applicable terms.',
          'Some surveys may have additional eligibility requirements based on age, location, occupation, purchasing behaviour or other study criteria.',
          'We may decline, restrict or terminate membership where reasonably necessary to protect the panel, comply with the law, prevent fraud or enforce these terms.',
        ],
      },
    ],
  },
  3: {
    icon: 'folder',
    title: 'Information We May Collect',
    short: 'Contact and profile details, your survey answers, device and security data, and what is needed to pay rewards.',
    body: [
      'Depending on your participation, location and the requirements of a study, we may collect the following categories of information:',
      { h: 'A. Registration and contact information' },
      { ul: ['Full name or display name, where required.', 'Email address and telephone number.', 'Country, state, city or general location.', 'Date of birth or age range, where required.', 'Preferred language and communication preferences.'] },
      { h: 'B. Demographic and consumer profile information' },
      { ul: ['Gender, age group, education and household composition, where relevant.', 'Employment status, occupation and industry.', 'Household income range or personal income range, where relevant.', 'Shopping habits, product preferences, brand awareness and purchasing intentions.', 'General lifestyle interests and consumer preferences.'] },
      { h: 'C. Survey and research information' },
      { ul: ['Survey answers, ratings, comments and opinions.', 'Product, brand, service and advertising feedback.', 'Responses about consumer experiences and usage habits.', 'Photographs, documents or other materials you voluntarily submit as part of an eligible study.', 'Audio, video or interview recordings only where the relevant activity requires them and you have provided the appropriate consent.'] },
      { h: 'D. Technical and usage information' },
      { ul: ['IP address, browser type, device type and operating system.', 'Login timestamps, session information and security logs.', 'Cookies, essential session identifiers and similar technologies.', 'Survey progress, response patterns and information used to detect duplicate, automated or fraudulent activity.', 'Device identifiers or advertising identifiers only where applicable, necessary and lawfully collected with any consent required.'] },
      { h: 'E. Reward and payment information' },
      { ul: ['Points, reward balances and redemption history.', 'Information required to process eligible rewards or payments.', 'Payment provider details or transaction references.', 'Tax or identity verification information where legally required.'] },
      'We will seek only information reasonably necessary for the stated purpose. Information such as health status, political opinions, religion, biometric identifiers or other sensitive personal data will be requested only when appropriate for a specific study and subject to applicable legal requirements and any additional consent required.',
    ],
  },
  4: {
    icon: 'target',
    title: 'Why We Collect and Use Your Information',
    short: 'To run your account, match you to surveys, keep answers genuine, pay rewards and meet legal duties.',
    body: [
      'We may use your information to:',
      {
        ol: [
          'Register, verify and manage your panel account.',
          'Determine your eligibility for surveys and research projects.',
          'Match you with studies relevant to your profile and preferences.',
          'Conduct market research, consumer behaviour studies, opinion polls and product testing.',
          'Review response quality and prevent duplicate, misleading or fraudulent submissions.',
          'Calculate and administer eligible points, incentives, rewards and payments.',
          'Communicate survey invitations, account notices, reward updates and support information.',
          'Improve our surveys, panel operations, website, research processes and participant experience.',
          'Generate statistical analysis, reports, trends and insights for clients and research partners.',
          'Meet applicable legal, regulatory, accounting, security and recordkeeping obligations.',
        ],
      },
      'We will not use your information for a materially different purpose without an appropriate lawful basis and, where required, providing notice or obtaining additional consent.',
    ],
  },
  5: {
    icon: 'clipboard',
    title: 'Voluntary Participation in Surveys',
    short: 'Skip any survey you like. Screen-outs may not earn a reward. Answer honestly — no bots or tricks.',
    body: [
      {
        ol: [
          'Joining the panel does not require you to participate in every survey.',
          'You may decline a survey invitation or stop participating, subject to the practical limitations of a study already completed or submitted.',
          "Survey eligibility may depend on screening questions, quotas, location or the study's target audience.",
          "A screening-out or incomplete survey may not qualify for a reward unless the particular survey's rules state otherwise.",
          'We may review responses for completeness, consistency, duplication and quality.',
          'Rewards, where offered, will be governed by the specific survey invitation and applicable reward rules.',
          'You must not submit false answers, use automated tools to generate responses, manipulate survey systems or attempt to claim rewards improperly.',
          'Research participation does not guarantee that your opinions will influence a business decision, that a product will be launched, or that you will receive an invitation to future studies.',
        ],
      },
    ],
  },
  6: {
    icon: 'gift',
    title: 'Rewards, Points and Incentives',
    short: 'Rewards are paid after checks, as each invitation states. Earned rewards are never changed arbitrarily.',
    body: [
      {
        ol: [
          'Rewards may include points, gift cards, cash payments, vouchers or other incentives, depending on your country and the relevant study.',
          'Each survey may have its own reward amount, eligibility conditions and completion requirements.',
          'Rewards are generally payable only after the applicable validation and approval process.',
          'We may withhold or reverse rewards associated with duplicate accounts, fraudulent activity, materially invalid responses or breaches of the relevant survey rules, subject to applicable law.',
          'Reward processing may require the involvement of third-party payment or reward providers.',
          'You are responsible for providing accurate redemption information and checking any applicable local tax obligations.',
          'Reward availability, redemption thresholds, processing times, expiry rules and permitted payment methods will be explained in the relevant reward policy.',
          'We will not change an already-earned reward arbitrarily. Any adjustments or cancellation must be handled according to the published rules and applicable law.',
        ],
      },
    ],
  },
  7: {
    icon: 'lock',
    title: 'Privacy and Confidentiality',
    short: 'Only authorised people see who you are. Clients normally get results in combined, anonymous form.',
    body: [
      {
        ol: [
          'We will handle personal information in accordance with our Privacy Policy and applicable data protection laws.',
          'Access to identifiable information will be restricted to authorised personnel and service providers who need it for legitimate operational purposes.',
          'Clients generally receive research findings in aggregated, statistical, anonymised or otherwise appropriately protected form.',
          'We will not disclose your directly identifying information to a research client for its independent use unless this is explained to you and an appropriate lawful basis and any required consent are in place.',
          'Some studies may involve client-specific confidentiality requirements. Where applicable, the study instructions will explain these requirements before participation.',
          'No online transmission or storage system can be guaranteed to be completely secure, but we will maintain appropriate safeguards designed to protect your information.',
        ],
      },
    ],
  },
  8: {
    icon: 'share',
    title: 'Sharing Information with Service Providers and Partners',
    short: 'Trusted providers help run surveys, checks and payouts — under strict confidentiality, for that job only.',
    body: [
      'We may share limited information, where appropriate and lawful, with:',
      { ul: ['Survey hosting and programming providers.', 'Panel management, verification and fraud-prevention providers.', 'Research clients and authorised research partners.', 'Reward, gift-card and payment processing providers.', 'Cloud hosting, security, analytics and technical support providers.', 'Professional advisers, auditors, regulators or public authorities where legally required.'] },
      'We require appropriate confidentiality, security and data protection safeguards from service providers handling personal information on our behalf.',
      'If a study requires direct contact from a client, identifiable disclosure, or a transfer to another organisation for its own purposes, we will provide relevant information and obtain consent where required.',
      'We do not authorise service providers to use your information for unrelated purposes merely because it has been shared with them.',
    ],
  },
  9: {
    icon: 'cookie',
    title: 'Cookies, Device Information and Security Checks',
    short: 'Essential cookies keep you signed in and safe. Optional analytics or advertising only with your OK.',
    body: [
      'We may use essential cookies and similar technologies to maintain login sessions, remember necessary settings, protect accounts, prevent fraud and support website functionality.',
      'Where required, non-essential analytics, advertising or tracking technologies will be used only after obtaining the applicable consent. You may manage available cookie preferences through our cookie settings.',
      'We may use security checks, such as email verification, CAPTCHA, duplicate-account detection and response-quality checks, to protect the panel.',
      'We will explain any additional use of device or advertising identifiers where required. Acceptance of essential website functionality does not automatically mean that you consent to optional advertising tracking.',
    ],
  },
  10: {
    icon: 'bell',
    title: 'Communications and Survey Invitations',
    short: 'Account and security messages always reach you. Promotions are a separate choice you can turn off.',
    body: [
      'We may send essential communications about account security, registration, password changes, privacy notices, reward processing and important changes to our terms.',
      'Survey invitations and research-related messages may be sent according to your panel preferences and applicable law.',
      'Optional promotional communications, where offered, will be subject to a separate choice. You may opt out of optional marketing messages without necessarily losing your panel membership.',
      'You may continue to receive essential account or service communications when reasonably necessary, even if you opt out of optional promotional messages.',
    ],
  },
  11: {
    icon: 'mic',
    title: 'Audio, Video, Photographs and Recorded Sessions',
    short: 'Nothing is recorded without asking you first, for that study. Saying no never affects anything else.',
    body: [
      'Some research activities may involve recorded interviews, focus groups, usability testing, product testing or online discussions.',
      'Where recording is proposed, we will explain the purpose, the type of recording, its intended use, relevant recipients and applicable retention arrangements. We will obtain separate consent where required before recording begins.',
      'You may decline a recording-based activity and ask about alternative participation options where available. Refusing an optional recording will not affect unrelated panel activities.',
      'We will not assume that consent to join the consumer panel automatically authorises the recording or public use of your image, voice or identifiable statements.',
    ],
  },
  12: {
    icon: 'heart',
    title: 'Sensitive Information and Special Studies',
    short: 'Questions on health, money or beliefs come with extra notice and explicit consent. You may decline.',
    body: [
      'Certain studies may ask questions about health, financial circumstances, beliefs, ethnicity or other sensitive matters.',
      'Where such information is requested, we will provide appropriate study-specific information and obtain explicit consent or establish another lawful basis where required. You may decline a question or study where permitted by the applicable study rules and law.',
      'Health-related or other sensitive research information will be subject to appropriate access controls and use restrictions. Participation in a study does not create a medical, financial or professional advisory relationship.',
    ],
  },
  13: {
    icon: 'hand',
    title: 'Your Privacy Rights and Choices',
    short: 'See, correct, delete or download your data, withdraw consent, opt out of marketing, or complain.',
    body: [
      'Subject to applicable law, you may have the right to:',
      { ul: ['Request access to your personal information.', 'Correct inaccurate or incomplete information.', 'Request deletion of personal information.', 'Withdraw consent where processing is based on consent.', 'Object to or restrict certain processing.', 'Request a copy of certain information in a portable format.', 'Opt out of optional marketing communications.', 'Manage cookie preferences.', 'Complain to the relevant data protection authority.'] },
      'To exercise your rights, contact {privacyEmail}. We may need to verify your identity before responding.',
      'Some information may need to be retained for legitimate legal, security, accounting or dispute-resolution purposes. Where applicable, we will explain any lawful limitation on your request.',
    ],
  },
  14: {
    icon: 'exit',
    title: 'Withdrawing from the Panel and Closing Your Account',
    short: 'Leave whenever you like. Check pending rewards first; some records are kept where the law requires.',
    body: [
      'You may stop participating in surveys and request account closure at any time, subject to applicable law and the practical requirements of a study already completed.',
      'Account closure does not automatically erase information that we are legally required or otherwise lawfully permitted to retain. We will delete or anonymise information in accordance with our retention policy where appropriate.',
      'Pending rewards, unused points and outstanding redemptions will be handled under the published reward rules and applicable law. Please review any relevant redemption conditions before closing your account.',
      'You may withdraw a particular consent separately where the relevant processing is based on that consent. Withdrawal does not make earlier lawful processing invalid.',
    ],
  },
  15: {
    icon: 'globe',
    title: 'Data Retention and International Transfers',
    short: 'Data is kept only as long as needed and may be processed abroad — with recognised safeguards.',
    body: [
      'We retain personal information only for as long as reasonably necessary for the purposes described in our Privacy Policy, subject to applicable legal, contractual and operational requirements.',
      'Retention periods may differ for account records, survey responses, reward transactions, consent records, security logs and research outputs.',
      'Because our research activities may operate across countries, information may be processed or stored outside your country. Where required, we will use legally recognised transfer safeguards and provide information about the relevant arrangements.',
    ],
  },
  16: {
    icon: 'shield',
    title: 'Account Security and Acceptable Use',
    short: 'Keep your login safe. No duplicate accounts, bots, cheating or harassment — breaches can cost rewards.',
    body: [
      'You agree to keep your login credentials secure, provide accurate information and notify us if you suspect unauthorised account access.',
      'You must not:',
      { ul: ['Create unauthorised duplicate accounts.', 'Use bots, scripts or automated systems to complete surveys.', 'Manipulate survey results, reward systems or eligibility checks.', 'Upload unlawful, infringing or malicious material.', "Attempt to access another participant's account or confidential research data.", 'Share confidential survey materials where prohibited by the study rules.', 'Harass other participants, staff, clients or research partners.'] },
      'We may investigate suspected violations and take proportionate action, including invalidating affected submissions, restricting rewards or suspending an account where justified and permitted by law.',
    ],
  },
  17: {
    icon: 'spark',
    title: 'Intellectual Property and Research Materials',
    short: 'Survey content belongs to us or our clients — use it only to take part. Your personal rights stay yours.',
    body: [
      'Survey questions, study designs, client materials, software, logos and other research content may be protected by intellectual property or confidentiality rights.',
      'You may use such materials only to participate in the relevant research activity. You must not reproduce, publish, distribute or commercially exploit confidential study materials without authorisation.',
      'You retain rights in your personal information as provided by applicable law. Any licence or permission relating to content you submit will be limited to the purposes explained in the relevant study notice and will not transfer ownership of your personal identity or other rights beyond what is lawfully agreed.',
    ],
  },
  18: {
    icon: 'family',
    title: 'Minors and Vulnerable Participants',
    short: 'The panel is for people who meet the age requirement. Studies with minors need a parent or guardian.',
    body: [
      'Our general consumer panel is intended for individuals who meet the minimum age requirement specified for their country and account type.',
      'Where a study lawfully permits participation by minors, we will implement the required parental or guardian authorisation, age-appropriate information and any additional safeguards required by law. We will not knowingly enrol a person who fails the applicable age or consent requirements.',
      'Additional safeguards may apply to participants who need assistance to provide informed consent.',
    ],
  },
  19: {
    icon: 'refresh',
    title: 'Changes to These Terms',
    short: 'If terms change in a way that matters, we tell you — and ask again where the law requires.',
    body: [
      'We may update these terms to reflect changes in our services, research practices, security measures or legal requirements.',
      'Where a change materially affects your rights or how your information is used, we will provide notice through an appropriate channel and obtain renewed consent where required. Continued use of the panel will not replace consent where the law requires a separate affirmative choice.',
    ],
  },
  20: {
    icon: 'server',
    title: 'Liability and Service Availability',
    short: 'We keep the panel running and secure; short outages can happen. Your legal consumer rights are kept.',
    body: [
      'We will take reasonable steps to maintain the availability and security of our panel services. Temporary interruptions may occur because of maintenance, technical issues, security incidents or circumstances outside our reasonable control.',
      'Nothing in these terms excludes or limits any liability, consumer right or remedy that cannot lawfully be excluded or limited. Any other permitted limitations will be interpreted in accordance with applicable law.',
    ],
  },
  21: {
    icon: 'scale',
    title: 'Governing Law and Complaints',
    short: "Your country's mandatory consumer and data rights always apply. Questions or complaints: write to us.",
    body: [
      "These terms will be interpreted under the laws applicable to the panel operator and the participant, subject to any mandatory consumer protection and data protection rights that apply in the participant's country.",
      'If you have a question, complaint or concern about your account, participation or privacy, contact:',
      { contact: true },
      'We will review complaints and respond in accordance with applicable requirements.',
    ],
  },
  22: {
    icon: 'pen',
    title: 'Acknowledgement and Consent',
    short: 'Required boxes run your account; optional ones are your choice and can be changed any time.',
    body: [
      'By selecting the applicable consent options, you confirm that you have had an opportunity to read the terms, understand the relevant privacy information and make your choices voluntarily.',
      'Your consent applies only to the purposes and permissions described in the relevant notice and selected options. Optional permissions may be declined or withdrawn where applicable without automatically cancelling your entire panel membership.',
      'Important: Please read the separate checkboxes on the consent screen. Some permissions are required to operate your account, while others apply only if you choose to participate in particular activities.',
    ],
  },
};

// The checkboxes of section 22. `required` ones must be ticked to continue. `refs` = sections they relate to.
export const CONSENTS = [
  { id: 'terms', required: true, icon: 'pen', refs: [1, 2, 5, 6, 16, 17, 19, 20, 21] },
  { id: 'privacy', required: true, icon: 'lock', refs: [3, 4, 7, 8, 9, 13, 15] },
  { id: 'age', required: true, icon: 'badge', refs: [2, 18] },
  { id: 'marketing', required: false, icon: 'bell', refs: [10] },
  { id: 'analytics', required: false, icon: 'cookie', refs: [9] },
  { id: 'recordings', required: false, icon: 'mic', refs: [11] },
  { id: 'sensitive', required: false, icon: 'heart', refs: [12] },
];

export const SECTION_ORDER = CHAPTERS.flatMap((c) => c.sections);
