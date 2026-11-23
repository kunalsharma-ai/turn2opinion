// Minor Research Participation Terms & Conditions and Parental Consent Agreement — the legal text (English,
// authoritative). Source: Frequent Research universal minor terms (Parts A–E).
//
// Edit the wording HERE.
//   CHAPTERS  six colour-graded folds of Part A (reading order = section order)
//   SECTIONS  the 19 numbered sections of Part A. `short` is the plain-language summary on the card (translated in
//             src/i18n/strings/*.js); `body` is the full legal text — each string is one numbered clause (1.1, 1.2 …)
//             or { ul: [...] } for a bullet list. `hue` is the section's own paper colour.
//   DECLARATION  Part B2 (shown to the parent/guardian)    CONSENTS  Part B3 (separate, unchecked controls)
//   ASSENT    Part C (the teen's own decision)               STUDY_FIELDS  Part D (shown before every survey)
// Tokens in {curly braces} are filled from the page config (src/config.js).
// Bump `termsVersion` in the config whenever the meaning changes — families are then asked again.

export const CHAPTERS = [
  { id: 'join', icon: 'door', sections: [1, 2, 3], grade: ['#2f6bff', '#49b6ff'] },
  { id: 'permission', icon: 'family', sections: [4, 5, 6], grade: ['#ff8a00', '#ffc233'] },
  { id: 'safety', icon: 'shield', sections: [7, 8], grade: ['#14c9b5', '#22c55e'] },
  { id: 'data', icon: 'layers', sections: [9, 10, 11, 12, 13], grade: ['#8b5cf6', '#c084fc'] },
  { id: 'rewards', icon: 'gift', sections: [14, 15, 16], grade: ['#ff5e7e', '#ffb020'] },
  { id: 'help', icon: 'scale', sections: [17, 18, 19], grade: ['#1e3a9e', '#7b5cff'] },
];

export const SECTIONS = {
  1: {
    icon: 'badge', hue: '#2f6bff',
    title: 'Eligibility and age requirements',
    short: 'For teens aged 13–17. Give your true age and country — we may check it, and the rules change when you turn 18.',
    body: [
      'This programme is intended for eligible participants aged 13–17.',
      "Participation is subject to the minimum age requirements, legal capacity rules and other applicable requirements in the participant's country or region.",
      'A participant must provide accurate information about their age and country of residence. We may request proportionate verification where reasonably necessary to establish eligibility or meet legal obligations.',
      'We may decline, suspend or discontinue participation where the participant is ineligible, required permission has not been obtained, or participation would breach applicable law or research safeguards.',
      'If a participant reaches the age of legal adulthood or another relevant age threshold, we will apply the appropriate updated terms and consent process where required.',
    ],
  },
  2: {
    icon: 'target', hue: '#3f8cff',
    title: 'Purpose of the research panel',
    short: 'We ask age-appropriate questions to learn what people think. You never have to buy anything, and we don’t use this for unrelated marketing.',
    body: [
      'Frequent Research conducts market research, consumer research and other approved research activities to understand opinions, preferences, experiences and behaviours.',
      "Surveys may cover products, services, brands, shopping preferences, entertainment, technology, education, everyday activities and other subjects considered appropriate for the participant's age group.",
      'Research findings may be used to prepare reports, analyse trends, improve products or services, and provide research insights to clients.',
      'Participation is for research purposes and does not require the participant to buy a product or service.',
      "We will not use this agreement as blanket permission to send unrelated marketing, create advertising profiles, or use a child's information for unrelated commercial purposes.",
    ],
  },
  3: {
    icon: 'key', hue: '#49b6ff',
    title: 'Registration and account access',
    short: 'You may not need your own email. Your account and your parent’s contact are kept separate. One honest account per person.',
    body: [
      'A teenager may be able to register without having a personal email address, where our registration process and applicable law permit it.',
      'We may use an approved parent or legal guardian contact method for permission requests, verification, important account communications and reward administration.',
      "The participant's panel account and the parent or guardian's account or contact record will be maintained separately where practicable.",
      'Each participant must use their assigned account credentials responsibly and must not impersonate another person, falsify their age or create duplicate accounts to obtain additional rewards.',
      'The parent or guardian must not provide permission on behalf of another family without appropriate authority.',
      "We will provide account recovery and verification options appropriate to the participant's location and age, where available.",
    ],
  },
  4: {
    icon: 'family', hue: '#ff8a00',
    title: 'Parent or legal guardian permission',
    short: 'A parent or guardian gives permission first, and we verify it. It covers only what is explained here — not every future study.',
    body: [
      'Where required by law or by our global participation policy, a parent or legal guardian must provide permission before a minor is enrolled in the panel or invited to participate in research.',
      "We may require verification of the parent's or guardian's identity, contact method and authority to provide permission. The verification method will be selected in accordance with applicable law and the nature of the research.",
      'A parent or guardian must review the information provided about the programme, the applicable privacy notice and any additional study-specific information.',
      'Permission covers only the activities and purposes explained in the applicable notices and consent selections. It does not automatically authorise every future survey, sensitive-data collection, recording or other higher-risk activity.',
      'We may suspend invitations until the required permission has been verified or renewed.',
      'We may contact the parent or guardian to confirm permission, communicate material changes, address concerns or manage withdrawal requests.',
    ],
  },
  5: {
    icon: 'hand', hue: '#ff9f1c',
    title: "The teenager's agreement to participate",
    short: 'You get a clear explanation and decide for yourself. Saying no is always okay — a parent’s yes never overrides your no.',
    body: [
      'In addition to parental permission where required, the teenager must receive an understandable explanation of the relevant research activity.',
      'The teenager must freely agree to participate before beginning the applicable survey.',
      'The teenager may decline an invitation, refuse to answer a question where permitted, or stop participating without being punished or pressured.',
      "Parental permission does not override the teenager's refusal or unwillingness to participate.",
      'Where a study requires additional permission, we will obtain it before the relevant activity begins.',
    ],
  },
  6: {
    icon: 'exit', hue: '#ffb020',
    title: 'Voluntary participation and withdrawal',
    short: 'Nothing is compulsory. You can stop at any time, and a parent can withdraw permission. Stopping never brings a penalty.',
    body: [
      'Participation is voluntary. No participant is required to accept every survey invitation.',
      'Participants may leave a survey or stop participating at any time using the available controls or by contacting us through the stated support channel.',
      "A parent or legal guardian may request the withdrawal of their child's permission, subject to applicable law.",
      'After withdrawal, we will stop the affected future participation and processing that depends on the withdrawn permission, where applicable. Other lawful grounds for processing may continue where permitted by law.',
      'We will explain any limitations affecting the retrieval or deletion of data that has already been irreversibly anonymised, incorporated into aggregated findings, or must be retained for a lawful purpose.',
      'Withdrawal will not result in a penalty for the child. The treatment of rewards already earned or pending will follow the published reward rules and applicable law.',
    ],
  },
  7: {
    icon: 'bell', hue: '#14c9b5',
    title: 'Survey invitations and frequency',
    short: 'Invitations tell you the topic, time, reward and any extra permission needed. No guaranteed number of surveys, and no flood of messages.',
    body: [
      'Eligible participants may receive invitations to surveys based on relevant eligibility criteria, country, age group and research requirements.',
      'The frequency of invitations may vary. Registration does not guarantee a particular number of surveys or any minimum income or reward.',
      'Invitations will provide the material information reasonably needed to decide whether to participate, including the topic, expected duration, reward if applicable, and any additional permission requirements.',
      'We will take reasonable steps to avoid excessive invitations or unnecessary contact with minors.',
    ],
  },
  8: {
    icon: 'shield', hue: '#22c55e',
    title: 'Appropriate research content and safeguarding',
    short: 'Every study is checked for your age. You can skip questions or leave, and serious safety concerns are handled carefully.',
    body: [
      'We will assess research activities for suitability for the intended age group.',
      'We will not intentionally expose minors to exploitative, unlawful or inappropriate research activities.',
      'Surveys involving potentially distressing subjects, sensitive personal information or elevated risks will receive additional review before recruitment.',
      'Where required, we will obtain additional permission, provide additional explanations, implement enhanced safeguards or exclude minors from the study.',
      'Participants may skip questions where the survey permits, leave a study or raise a concern through the designated contact channel.',
      'If a participant discloses information indicating a serious safety concern, we will handle it under applicable law and our safeguarding procedures. Any confidentiality limitations will be explained where appropriate.',
    ],
  },
  9: {
    icon: 'folder', hue: '#8b5cf6',
    title: 'Information we may collect',
    short: 'Only what is needed: age band, country, answers, a participant ID, reward and permission records. No school name or exact location unless truly necessary.',
    body: [
      'Depending on the research activity, we may collect information such as:',
      {
        ul: [
          'Age or age band and country or region.',
          'Survey responses and research eligibility information.',
          'A participant ID and limited panel-account information.',
          'Survey invitations, completion status and reward records.',
          'Parent or guardian contact and permission-verification records, where required.',
          'Technical and security information reasonably necessary to operate and protect the platform.',
        ],
      },
      'We will seek to collect only information reasonably necessary for the stated purposes.',
      'We will not request a full date of birth, school name, precise location, government identification document or other highly identifying information unless it is necessary, lawful and appropriately protected.',
      'We will explain any additional categories of information before collecting them where required by law.',
    ],
  },
  10: {
    icon: 'heart', hue: '#a06cf7',
    title: 'Sensitive information and special-category data',
    short: 'Health, beliefs and similar topics need extra protection. Joining does not allow them — each needs its own review and permission.',
    body: [
      'Certain information, including health information, disability information, religious beliefs, ethnicity, sexual orientation, political opinions and information about abuse or family difficulties, may require enhanced protection under applicable law.',
      'General panel registration or acceptance of these terms does not automatically authorise the collection or processing of such information.',
      'Before a survey involving sensitive information is offered to a minor, we will assess its purpose, necessity, risks, lawful basis, age suitability and additional consent requirements.',
      'Where additional permission or another legal condition is required, it must be satisfied before collection begins.',
      'If a survey cannot lawfully or appropriately be conducted with a minor, we will exclude the minor from that survey.',
    ],
  },
  11: {
    icon: 'lock', hue: '#7b5cff',
    title: 'Privacy, confidentiality and use of responses',
    short: 'Your answers are used to run the panel and the research. Clients usually see combined results, not you. We protect data carefully.',
    body: [
      'We will process personal information in accordance with the applicable privacy notice and relevant law.',
      'Information may be used for panel administration, eligibility checks, survey delivery, research analysis, quality control, reward administration, security and legal compliance, as explained in the relevant notice.',
      'We may share necessary information with authorised employees, approved technology providers, research partners, reward providers or clients, subject to applicable law and the purposes explained to participants.',
      'Where practicable, reports provided to clients will use aggregated or de-identified research results rather than directly identifying individual participants.',
      'We will not describe data as anonymous unless individuals cannot reasonably be identified from it using the relevant means.',
      'We will apply appropriate technical and organisational measures to protect information against unauthorised access, loss, misuse, alteration or disclosure.',
      'We cannot guarantee that every online transmission or storage system is entirely risk-free, but we will take reasonable and legally required steps to protect the information we hold.',
    ],
  },
  12: {
    icon: 'mic', hue: '#c084fc',
    title: 'Recordings, photographs and identifiable quotations',
    short: 'Audio, video, photos or quotes that show who you are are never automatic — they need a separate explanation and permission first.',
    body: [
      'A survey may not automatically include audio recording, video recording, photographs, screen recording, live observation or publication of identifiable quotations.',
      'Where these activities are proposed, we will provide a separate explanation of the purpose, intended use, recipients, retention and relevant risks.',
      'We will obtain separate permission or authorisation where required by law or appropriate research standards before the activity begins.',
      "Permission for ordinary survey participation does not automatically authorise recording, public identification, promotional use or publication of a participant's image or voice.",
    ],
  },
  13: {
    icon: 'share', hue: '#6d5dfc',
    title: 'Research clients and third parties',
    short: 'Clients receive research findings. We explain any sharing, protect it with contracts and safeguards, and ask again for new uses.',
    body: [
      'Research findings may be provided to clients to support research, product development, service improvement and related analysis.',
      'We will explain relevant data sharing in the privacy notice or study-specific information.',
      'We will not promise that all client access is anonymous or that every recipient is subject to identical privacy rules.',
      'We will use appropriate contractual, organisational and technical safeguards for authorised sharing, including international transfers where applicable.',
      'Any use outside the purposes and permissions originally explained will require a separate legal assessment and additional notice or permission where required.',
    ],
  },
  14: {
    icon: 'coins', hue: '#ff5e7e',
    title: 'Rewards, points and payments',
    short: 'Some surveys offer points or vouchers, explained up front. A parent may receive the payout. Rewards are never used to pressure you.',
    body: [
      "Eligible surveys may offer points, gift vouchers or other rewards. The available reward and applicable conditions will be communicated before participation.",
      "Rewards are subject to the relevant survey's eligibility, completion and quality requirements, which will be disclosed in advance.",
      'Points displayed in the panel account are not necessarily cash and may only be redeemed according to the published reward programme.',
      'Redemption thresholds, reward availability, processing times and permitted payment methods may vary by country and age group.',
      'Where a payment provider or applicable law requires a parent or guardian to receive or authorise a reward, we may use a verified guardian-managed payout route.',
      'We will explain who will receive the reward, how the payment will be processed and what information is needed before a redemption request is completed.',
      'We will not require a minor to create a personal bank, wallet or email account where an approved alternative is available and lawful.',
      'Rewards will not be used to pressure minors into participating in a survey or answering questions they do not wish to answer.',
      'Any tax, financial or other legal obligations associated with rewards will be handled in accordance with applicable law and the information supplied by the relevant provider.',
    ],
  },
  15: {
    icon: 'refresh', hue: '#ff7a59',
    title: 'Data retention and deletion',
    short: 'We keep information only as long as needed, then delete or anonymise it. You can ask us to correct or delete it.',
    body: [
      'We will retain personal information only for as long as reasonably necessary for the stated purposes, subject to applicable law and legitimate retention requirements.',
      'Retention periods may differ for account details, consent records, survey responses, security logs and financial or reward records.',
      'When information is no longer needed, we will delete it, securely dispose of it or irreversibly anonymise it, as appropriate.',
      'Requests to delete or correct information will be handled under applicable law. Some information may need to be retained where a lawful exception applies.',
    ],
  },
  16: {
    icon: 'server', hue: '#ffb020',
    title: 'Security and account responsibilities',
    short: 'Keep your login private and don’t share your account. Parents help you stay safe. We look into fraud fairly.',
    body: [
      'Participants must keep their login credentials secure and must not share their accounts for the purpose of manipulating research results or obtaining rewards improperly.',
      'Parents or guardians should help the participant use the service safely where appropriate to their age and circumstances.',
      'We may investigate suspected fraud, impersonation, duplicate accounts, security incidents or misuse of the panel.',
      'Any restriction on an account will be proportionate to the circumstances and consistent with applicable law and the published reward rules.',
    ],
  },
  17: {
    icon: 'mail', hue: '#1e3a9e',
    title: 'Complaints and support',
    short: 'Questions or worries? Teens and parents can contact us any time, and you can also go to your data-protection authority.',
    body: [
      'Participants and parents or legal guardians may contact us with questions, concerns, complaints or requests concerning participation, consent, privacy or rewards.',
      'We will provide a clear support route and handle complaints appropriately.',
      'Where required, participants and parents or guardians may also contact the relevant data-protection authority or other competent regulator.',
      { contact: true },
    ],
  },
  18: {
    icon: 'pen', hue: '#4f5bd5',
    title: 'Changes to these terms',
    short: 'If the terms change in an important way, we tell you — and ask again for permission when the law requires it.',
    body: [
      'We may update these terms when necessary to reflect operational, research, legal or security changes.',
      'We will provide notice of material changes where required.',
      'Where a change requires fresh consent or renewed parental permission, we will obtain it before continuing the affected activity.',
      'Continued account access will not be treated as a substitute for consent where affirmative consent is legally required.',
    ],
  },
  19: {
    icon: 'globe', hue: '#7b5cff',
    title: 'Local law and additional safeguards',
    short: 'Your country’s rules come first. Where they require more protection, we follow them — or we don’t enrol.',
    body: [
      'These terms establish a global baseline for participation and do not replace mandatory legal requirements in any country or region.',
      'Where local law requires additional consent, stronger verification, specific disclosures, additional rights or restrictions on participation, those requirements will apply.',
      'Where participation cannot be conducted lawfully or safely, Frequent Research may decline to enrol the participant or may exclude the participant from the relevant study.',
      'Nothing in these terms removes or limits any right that cannot lawfully be excluded.',
    ],
  },
};

export const SECTION_ORDER = CHAPTERS.flatMap((c) => c.sections); // 1 … 19

// "Important information for parents and legal guardians" (top of the agreement)
export const PARENT_INFO = [
  "Frequent Research conducts market research to understand people's opinions, preferences, experiences and behaviours. We may invite eligible teenagers to participate in online surveys and other age-appropriate research activities.",
  'Before your child participates, please read this agreement carefully. It explains how participation works, what information may be collected, how privacy is protected, how rewards may be provided, and what rights you and your child have.',
  'Where required, your permission must be verified before your child can participate. Your child must also understand the study and freely agree to participate. Giving parental permission does not require your child to participate in any particular survey.',
];

// Part B2 — the parent/guardian declaration (translated keys d1 … d10)
export const DECLARATION = [
  'I am the parent or legal guardian, or otherwise legally authorised representative, of the teenager identified in this registration.',
  "I have read and understood the information provided about Frequent Research's teen research programme.",
  'I have had an opportunity to review the applicable privacy notice and ask questions.',
  "I understand that the teenager may receive invitations to age-appropriate research activities, subject to the programme's eligibility and safeguarding rules.",
  'I understand what information may be collected and the purposes, sharing arrangements and retention rules explained in the applicable privacy notice.',
  'I understand that participation is voluntary and that the teenager may decline a survey or stop participating.',
  'I understand that certain studies may require additional information, separate permission or further verification.',
  'I understand that participation does not guarantee a reward and that any reward will be subject to the conditions disclosed for the relevant survey.',
  'I understand how to contact Frequent Research about permission, privacy, withdrawal or complaints.',
  'I understand that this consent applies only to the programme and purposes explained to me and does not authorise unrelated marketing or every possible future research activity.',
];

// Part B3 — separate, unchecked-by-default controls. Labels/hints are translated (keys c_<id>, c_<id>_k).
// `required`: must be ticked to send. Optional ones are separate and never bundled into the required ones;
// show an optional one only when that activity is actually proposed (config.optionalConsents).
export const CONSENTS = [
  { id: 'participation', required: true, icon: 'family', kind: 'Required', refs: [1, 4, 5, 7] },
  { id: 'privacy', required: true, icon: 'lock', kind: 'Required acknowledgement', refs: [9, 11, 13, 15] },
  { id: 'contact', required: true, icon: 'mail', kind: 'Required where applicable', refs: [3, 4] },
  { id: 'studyContact', required: false, icon: 'bell', kind: 'Optional, separate permission', refs: [7] },
  { id: 'recording', required: false, icon: 'mic', kind: 'Optional, separate permission', refs: [12] },
  { id: 'sensitive', required: false, icon: 'heart', kind: 'Optional, separate permission', refs: [10] },
];

// Part C — teen assent (translated keys a1 … a7)
export const ASSENT = [
  'You may receive invitations to surveys that are suitable for your age.',
  'You can choose whether to take part in each survey.',
  'You can skip questions where the survey allows it or stop taking part.',
  'You do not have to buy anything to participate.',
  'Your answers will be handled as explained in the privacy information.',
  'Some surveys may need extra permission before you can take part.',
  'You can ask a question or raise a concern through the contact details provided.',
];
export const ASSENT_ICONS = ['bell', 'hand', 'exit', 'gift', 'lock', 'key', 'mail'];

// Part D — information shown before every survey (labels translated: f_<id>)
export const STUDY_FIELDS = ['title', 'purpose', 'topics', 'duration', 'collected', 'recipients', 'reward', 'risks', 'permission', 'support'];
export const STUDY_EXAMPLE = {
  title: '[Insert study title]',
  purpose: '[Explain why the research is being conducted]',
  topics: '[Describe the topics, including sensitive subjects where relevant]',
  duration: '[Insert estimated time]',
  collected: '[List relevant data categories]',
  recipients: '[Explain relevant recipients and client access]',
  reward: '[State the reward and eligibility requirements]',
  risks: '[Explain relevant risks and safeguards]',
  permission: '[State the applicable permission requirements]',
  support: '{supportEmail}',
};

export const RELATIONSHIPS = ['father', 'mother', 'guardian', 'representative'];
