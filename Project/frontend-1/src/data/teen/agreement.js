/**
 * THE CONSENT FORM — step 2 of the parent onboarding page.
 *
 * This is the Turn2Opinion teen research terms & parental consent
 * (agreement MINOR-2026.10, effective 21 October 2026) exactly as it was
 * approved, with two parts removed on instruction:
 *
 *   ✗ Part B1  “Parent or legal guardian details”  — name, relationship,
 *              contact, country. Step 1 already captured all of it, so it is
 *              no longer asked again and no longer shown here.
 *   ✗ Part B4  “Electronic signature”              — removed completely.
 *
 * Everything else is unchanged and in the original order:
 *   Part A  Terms & conditions — the parents' information box and 19 sections
 *           in 6 chapters, each with an “in short” summary and the full text.
 *   Part B  Parent / guardian consent — the declaration (10 points) and the
 *           six consent selections (3 required, 3 optional, all start unticked).
 *   Part C  The teen's own decision — yes, or no.
 *   Part D  Before every survey — the study information card.
 *
 * Translations of every summary, heading and selection (50 languages) are in
 * public/i18n/consent/<lang>.json; the full legal text is English, which is
 * the binding version, with machine translation offered for convenience.
 */

export const TERMS_VERSION = 'MINOR-2026.10';
export const EFFECTIVE = '2026-10-21';

export const COMPANY = {
  legalName: 'Frequent Research Fieldwork Solutions Pvt. Ltd. (d/b/a Turn2Opinion)',
  website: 'https://www.turn2opinion.com',
  supportEmail: 'support@turn2opinion.com',
  privacyEmail: 'support@turn2opinion.com',
  address: 'Mangolpur Kalan, New Delhi 110085, India',
  phone: '+91 81300 15743',
};

/** Part A — the parents' information box. */
export const INFO = [
  "Frequent Research conducts market research to understand people's opinions, preferences, experiences and behaviours. We may invite eligible teenagers to participate in online surveys and other age-appropriate research activities.",
  "Before your child participates, please read this agreement carefully. It explains how participation works, what information may be collected, how privacy is protected, how rewards may be provided, and what rights you and your child have.",
  "Where required, your permission must be verified before your child can participate. Your child must also understand the study and freely agree to participate. Giving parental permission does not require your child to participate in any particular survey."
];
export const INFO_RULE = "Your child will not be eligible to participate until all applicable parental permission, verification and participant-assent requirements have been satisfied.";

/** Part A — six chapters, nineteen sections. `grade` is the chapter's colour pair. */
export const CHAPTERS = [
  { id: 'join', emoji: '🚪', sections: [1, 2, 3], grade: ['#2f6bff', '#49b6ff'], title: "Joining", tag: "Who can join and how the account works" },
  { id: 'permission', emoji: '👨‍👩‍👧', sections: [4, 5, 6], grade: ['#ff8a00', '#ffc233'], title: "Permission & choice", tag: "Parent permission, your own yes — and stopping any time" },
  { id: 'safety', emoji: '🛡️', sections: [7, 8], grade: ['#14c9b5', '#22c55e'], title: "Surveys & safety", tag: "How invitations work and how you are protected" },
  { id: 'data', emoji: '🗂️', sections: [9, 10, 11, 12, 13], grade: ['#8b5cf6', '#c084fc'], title: "Your information", tag: "What is collected, sensitive topics, recordings and sharing" },
  { id: 'rewards', emoji: '🎁', sections: [14, 15, 16], grade: ['#ff5e7e', '#ffb020'], title: "Rewards & your account", tag: "Points, payouts, keeping data and staying secure" },
  { id: 'help', emoji: '⚖️', sections: [17, 18, 19], grade: ['#1e3a9e', '#7b5cff'], title: "Help, changes & the law", tag: "Support, updates and your local rights" },
];

/** One emoji per section, chosen for its subject (shown on the section card). */
export const SECTION_EMOJI = { 1: '🎂', 2: '🎯', 3: '🔑', 4: '👪', 5: '🙋', 6: '🚪', 7: '🔔', 8: '🛡️', 9: '🗂️', 10: '💗', 11: '🔐', 12: '🎙️', 13: '🤝', 14: '🪙', 15: '🔄', 16: '🗄️', 17: '📮', 18: '📝', 19: '🌍' };

/** Part A — the nineteen sections. A body item {contact:true} renders the contact card. */
export const SECTIONS = {
  "1": {
    "icon": "badge",
    "hue": "#2f6bff",
    "title": "Eligibility and age requirements",
    "short": "For teens aged 13–17. Give your true age and country — we may check it, and the rules change when you turn 18.",
    "body": [
      "This programme is intended for eligible participants aged 13–17.",
      "Participation is subject to the minimum age requirements, legal capacity rules and other applicable requirements in the participant's country or region.",
      "A participant must provide accurate information about their age and country of residence. We may request proportionate verification where reasonably necessary to establish eligibility or meet legal obligations.",
      "We may decline, suspend or discontinue participation where the participant is ineligible, required permission has not been obtained, or participation would breach applicable law or research safeguards.",
      "If a participant reaches the age of legal adulthood or another relevant age threshold, we will apply the appropriate updated terms and consent process where required."
    ]
  },
  "2": {
    "icon": "target",
    "hue": "#3f8cff",
    "title": "Purpose of the research panel",
    "short": "We ask age-appropriate questions to learn what people think. You never have to buy anything, and we don’t use this for unrelated marketing.",
    "body": [
      "Frequent Research conducts market research, consumer research and other approved research activities to understand opinions, preferences, experiences and behaviours.",
      "Surveys may cover products, services, brands, shopping preferences, entertainment, technology, education, everyday activities and other subjects considered appropriate for the participant's age group.",
      "Research findings may be used to prepare reports, analyse trends, improve products or services, and provide research insights to clients.",
      "Participation is for research purposes and does not require the participant to buy a product or service.",
      "We will not use this agreement as blanket permission to send unrelated marketing, create advertising profiles, or use a child's information for unrelated commercial purposes."
    ]
  },
  "3": {
    "icon": "key",
    "hue": "#49b6ff",
    "title": "Registration and account access",
    "short": "You may not need your own email. Your account and your parent’s contact are kept separate. One honest account per person.",
    "body": [
      "A teenager may be able to register without having a personal email address, where our registration process and applicable law permit it.",
      "We may use an approved parent or legal guardian contact method for permission requests, verification, important account communications and reward administration.",
      "The participant's panel account and the parent or guardian's account or contact record will be maintained separately where practicable.",
      "Each participant must use their assigned account credentials responsibly and must not impersonate another person, falsify their age or create duplicate accounts to obtain additional rewards.",
      "The parent or guardian must not provide permission on behalf of another family without appropriate authority.",
      "We will provide account recovery and verification options appropriate to the participant's location and age, where available."
    ]
  },
  "4": {
    "icon": "family",
    "hue": "#ff8a00",
    "title": "Parent or legal guardian permission",
    "short": "A parent or guardian gives permission first, and we verify it. It covers only what is explained here — not every future study.",
    "body": [
      "Where required by law or by our global participation policy, a parent or legal guardian must provide permission before a minor is enrolled in the panel or invited to participate in research.",
      "We may require verification of the parent's or guardian's identity, contact method and authority to provide permission. The verification method will be selected in accordance with applicable law and the nature of the research.",
      "A parent or guardian must review the information provided about the programme, the applicable privacy notice and any additional study-specific information.",
      "Permission covers only the activities and purposes explained in the applicable notices and consent selections. It does not automatically authorise every future survey, sensitive-data collection, recording or other higher-risk activity.",
      "We may suspend invitations until the required permission has been verified or renewed.",
      "We may contact the parent or guardian to confirm permission, communicate material changes, address concerns or manage withdrawal requests."
    ]
  },
  "5": {
    "icon": "hand",
    "hue": "#ff9f1c",
    "title": "The teenager's agreement to participate",
    "short": "You get a clear explanation and decide for yourself. Saying no is always okay — a parent’s yes never overrides your no.",
    "body": [
      "In addition to parental permission where required, the teenager must receive an understandable explanation of the relevant research activity.",
      "The teenager must freely agree to participate before beginning the applicable survey.",
      "The teenager may decline an invitation, refuse to answer a question where permitted, or stop participating without being punished or pressured.",
      "Parental permission does not override the teenager's refusal or unwillingness to participate.",
      "Where a study requires additional permission, we will obtain it before the relevant activity begins."
    ]
  },
  "6": {
    "icon": "exit",
    "hue": "#ffb020",
    "title": "Voluntary participation and withdrawal",
    "short": "Nothing is compulsory. You can stop at any time, and a parent can withdraw permission. Stopping never brings a penalty.",
    "body": [
      "Participation is voluntary. No participant is required to accept every survey invitation.",
      "Participants may leave a survey or stop participating at any time using the available controls or by contacting us through the stated support channel.",
      "A parent or legal guardian may request the withdrawal of their child's permission, subject to applicable law.",
      "After withdrawal, we will stop the affected future participation and processing that depends on the withdrawn permission, where applicable. Other lawful grounds for processing may continue where permitted by law.",
      "We will explain any limitations affecting the retrieval or deletion of data that has already been irreversibly anonymised, incorporated into aggregated findings, or must be retained for a lawful purpose.",
      "Withdrawal will not result in a penalty for the child. The treatment of rewards already earned or pending will follow the published reward rules and applicable law."
    ]
  },
  "7": {
    "icon": "bell",
    "hue": "#14c9b5",
    "title": "Survey invitations and frequency",
    "short": "Invitations tell you the topic, time, reward and any extra permission needed. No guaranteed number of surveys, and no flood of messages.",
    "body": [
      "Eligible participants may receive invitations to surveys based on relevant eligibility criteria, country, age group and research requirements.",
      "The frequency of invitations may vary. Registration does not guarantee a particular number of surveys or any minimum income or reward.",
      "Invitations will provide the material information reasonably needed to decide whether to participate, including the topic, expected duration, reward if applicable, and any additional permission requirements.",
      "We will take reasonable steps to avoid excessive invitations or unnecessary contact with minors."
    ]
  },
  "8": {
    "icon": "shield",
    "hue": "#22c55e",
    "title": "Appropriate research content and safeguarding",
    "short": "Every study is checked for your age. You can skip questions or leave, and serious safety concerns are handled carefully.",
    "body": [
      "We will assess research activities for suitability for the intended age group.",
      "We will not intentionally expose minors to exploitative, unlawful or inappropriate research activities.",
      "Surveys involving potentially distressing subjects, sensitive personal information or elevated risks will receive additional review before recruitment.",
      "Where required, we will obtain additional permission, provide additional explanations, implement enhanced safeguards or exclude minors from the study.",
      "Participants may skip questions where the survey permits, leave a study or raise a concern through the designated contact channel.",
      "If a participant discloses information indicating a serious safety concern, we will handle it under applicable law and our safeguarding procedures. Any confidentiality limitations will be explained where appropriate."
    ]
  },
  "9": {
    "icon": "folder",
    "hue": "#8b5cf6",
    "title": "Information we may collect",
    "short": "Only what is needed: age band, country, answers, a participant ID, reward and permission records. No school name or exact location unless truly necessary.",
    "body": [
      "Depending on the research activity, we may collect information such as:",
      {
        "ul": [
          "Age or age band and country or region.",
          "Survey responses and research eligibility information.",
          "A participant ID and limited panel-account information.",
          "Survey invitations, completion status and reward records.",
          "Parent or guardian contact and permission-verification records, where required.",
          "Technical and security information reasonably necessary to operate and protect the platform."
        ]
      },
      "We will seek to collect only information reasonably necessary for the stated purposes.",
      "We will not request a full date of birth, school name, precise location, government identification document or other highly identifying information unless it is necessary, lawful and appropriately protected.",
      "We will explain any additional categories of information before collecting them where required by law."
    ]
  },
  "10": {
    "icon": "heart",
    "hue": "#a06cf7",
    "title": "Sensitive information and special-category data",
    "short": "Health, beliefs and similar topics need extra protection. Joining does not allow them — each needs its own review and permission.",
    "body": [
      "Certain information, including health information, disability information, religious beliefs, ethnicity, sexual orientation, political opinions and information about abuse or family difficulties, may require enhanced protection under applicable law.",
      "General panel registration or acceptance of these terms does not automatically authorise the collection or processing of such information.",
      "Before a survey involving sensitive information is offered to a minor, we will assess its purpose, necessity, risks, lawful basis, age suitability and additional consent requirements.",
      "Where additional permission or another legal condition is required, it must be satisfied before collection begins.",
      "If a survey cannot lawfully or appropriately be conducted with a minor, we will exclude the minor from that survey."
    ]
  },
  "11": {
    "icon": "lock",
    "hue": "#7b5cff",
    "title": "Privacy, confidentiality and use of responses",
    "short": "Your answers are used to run the panel and the research. Clients usually see combined results, not you. We protect data carefully.",
    "body": [
      "We will process personal information in accordance with the applicable privacy notice and relevant law.",
      "Information may be used for panel administration, eligibility checks, survey delivery, research analysis, quality control, reward administration, security and legal compliance, as explained in the relevant notice.",
      "We may share necessary information with authorised employees, approved technology providers, research partners, reward providers or clients, subject to applicable law and the purposes explained to participants.",
      "Where practicable, reports provided to clients will use aggregated or de-identified research results rather than directly identifying individual participants.",
      "We will not describe data as anonymous unless individuals cannot reasonably be identified from it using the relevant means.",
      "We will apply appropriate technical and organisational measures to protect information against unauthorised access, loss, misuse, alteration or disclosure.",
      "We cannot guarantee that every online transmission or storage system is entirely risk-free, but we will take reasonable and legally required steps to protect the information we hold."
    ]
  },
  "12": {
    "icon": "mic",
    "hue": "#c084fc",
    "title": "Recordings, photographs and identifiable quotations",
    "short": "Audio, video, photos or quotes that show who you are are never automatic — they need a separate explanation and permission first.",
    "body": [
      "A survey may not automatically include audio recording, video recording, photographs, screen recording, live observation or publication of identifiable quotations.",
      "Where these activities are proposed, we will provide a separate explanation of the purpose, intended use, recipients, retention and relevant risks.",
      "We will obtain separate permission or authorisation where required by law or appropriate research standards before the activity begins.",
      "Permission for ordinary survey participation does not automatically authorise recording, public identification, promotional use or publication of a participant's image or voice."
    ]
  },
  "13": {
    "icon": "share",
    "hue": "#6d5dfc",
    "title": "Research clients and third parties",
    "short": "Clients receive research findings. We explain any sharing, protect it with contracts and safeguards, and ask again for new uses.",
    "body": [
      "Research findings may be provided to clients to support research, product development, service improvement and related analysis.",
      "We will explain relevant data sharing in the privacy notice or study-specific information.",
      "We will not promise that all client access is anonymous or that every recipient is subject to identical privacy rules.",
      "We will use appropriate contractual, organisational and technical safeguards for authorised sharing, including international transfers where applicable.",
      "Any use outside the purposes and permissions originally explained will require a separate legal assessment and additional notice or permission where required."
    ]
  },
  "14": {
    "icon": "coins",
    "hue": "#ff5e7e",
    "title": "Rewards, points and payments",
    "short": "Some surveys offer points or vouchers, explained up front. A parent may receive the payout. Rewards are never used to pressure you.",
    "body": [
      "Eligible surveys may offer points, gift vouchers or other rewards. The available reward and applicable conditions will be communicated before participation.",
      "Rewards are subject to the relevant survey's eligibility, completion and quality requirements, which will be disclosed in advance.",
      "Points displayed in the panel account are not necessarily cash and may only be redeemed according to the published reward programme.",
      "Redemption thresholds, reward availability, processing times and permitted payment methods may vary by country and age group.",
      "Where a payment provider or applicable law requires a parent or guardian to receive or authorise a reward, we may use a verified guardian-managed payout route.",
      "We will explain who will receive the reward, how the payment will be processed and what information is needed before a redemption request is completed.",
      "We will not require a minor to create a personal bank, wallet or email account where an approved alternative is available and lawful.",
      "Rewards will not be used to pressure minors into participating in a survey or answering questions they do not wish to answer.",
      "Any tax, financial or other legal obligations associated with rewards will be handled in accordance with applicable law and the information supplied by the relevant provider."
    ]
  },
  "15": {
    "icon": "refresh",
    "hue": "#ff7a59",
    "title": "Data retention and deletion",
    "short": "We keep information only as long as needed, then delete or anonymise it. You can ask us to correct or delete it.",
    "body": [
      "We will retain personal information only for as long as reasonably necessary for the stated purposes, subject to applicable law and legitimate retention requirements.",
      "Retention periods may differ for account details, consent records, survey responses, security logs and financial or reward records.",
      "When information is no longer needed, we will delete it, securely dispose of it or irreversibly anonymise it, as appropriate.",
      "Requests to delete or correct information will be handled under applicable law. Some information may need to be retained where a lawful exception applies."
    ]
  },
  "16": {
    "icon": "server",
    "hue": "#ffb020",
    "title": "Security and account responsibilities",
    "short": "Keep your login private and don’t share your account. Parents help you stay safe. We look into fraud fairly.",
    "body": [
      "Participants must keep their login credentials secure and must not share their accounts for the purpose of manipulating research results or obtaining rewards improperly.",
      "Parents or guardians should help the participant use the service safely where appropriate to their age and circumstances.",
      "We may investigate suspected fraud, impersonation, duplicate accounts, security incidents or misuse of the panel.",
      "Any restriction on an account will be proportionate to the circumstances and consistent with applicable law and the published reward rules."
    ]
  },
  "17": {
    "icon": "mail",
    "hue": "#1e3a9e",
    "title": "Complaints and support",
    "short": "Questions or worries? Teens and parents can contact us any time, and you can also go to your data-protection authority.",
    "body": [
      "Participants and parents or legal guardians may contact us with questions, concerns, complaints or requests concerning participation, consent, privacy or rewards.",
      "We will provide a clear support route and handle complaints appropriately.",
      "Where required, participants and parents or guardians may also contact the relevant data-protection authority or other competent regulator.",
      {
        "contact": true
      }
    ]
  },
  "18": {
    "icon": "pen",
    "hue": "#4f5bd5",
    "title": "Changes to these terms",
    "short": "If the terms change in an important way, we tell you — and ask again for permission when the law requires it.",
    "body": [
      "We may update these terms when necessary to reflect operational, research, legal or security changes.",
      "We will provide notice of material changes where required.",
      "Where a change requires fresh consent or renewed parental permission, we will obtain it before continuing the affected activity.",
      "Continued account access will not be treated as a substitute for consent where affirmative consent is legally required."
    ]
  },
  "19": {
    "icon": "globe",
    "hue": "#7b5cff",
    "title": "Local law and additional safeguards",
    "short": "Your country’s rules come first. Where they require more protection, we follow them — or we don’t enrol.",
    "body": [
      "These terms establish a global baseline for participation and do not replace mandatory legal requirements in any country or region.",
      "Where local law requires additional consent, stronger verification, specific disclosures, additional rights or restrictions on participation, those requirements will apply.",
      "Where participation cannot be conducted lawfully or safely, Frequent Research may decline to enrol the participant or may exclude the participant from the relevant study.",
      "Nothing in these terms removes or limits any right that cannot lawfully be excluded."
    ]
  }
};

/** Part B — the declaration. */
export const DECLARATION = [
  "I am the parent or legal guardian, or otherwise legally authorised representative, of the teenager identified in this registration.",
  "I have read and understood the information provided about Frequent Research's teen research programme.",
  "I have had an opportunity to review the applicable privacy notice and ask questions.",
  "I understand that the teenager may receive invitations to age-appropriate research activities, subject to the programme's eligibility and safeguarding rules.",
  "I understand what information may be collected and the purposes, sharing arrangements and retention rules explained in the applicable privacy notice.",
  "I understand that participation is voluntary and that the teenager may decline a survey or stop participating.",
  "I understand that certain studies may require additional information, separate permission or further verification.",
  "I understand that participation does not guarantee a reward and that any reward will be subject to the conditions disclosed for the relevant survey.",
  "I understand how to contact Frequent Research about permission, privacy, withdrawal or complaints.",
  "I understand that this consent applies only to the programme and purposes explained to me and does not authorise unrelated marketing or every possible future research activity."
];

/** Part B — the six consent selections. Each starts unticked. */
export const SELECTIONS = [
  { id: 'participation', required: true, emoji: '👨‍👩‍👧', kind: 'kind_req', refs: [1, 4, 5, 7] },
  { id: 'privacy', required: true, emoji: '🔏', kind: 'kind_ack', refs: [9, 11, 13, 15] },
  { id: 'contact', required: true, emoji: '📨', kind: 'kind_where', refs: [3, 4] },
  { id: 'studyContact', required: false, emoji: '🔔', kind: 'kind_opt', refs: [7] },
  { id: 'recording', required: false, emoji: '🎙️', kind: 'kind_opt', refs: [12] },
  { id: 'sensitive', required: false, emoji: '💗', kind: 'kind_opt', refs: [10] },
];

/** Part C — what joining means, in the teen's words, with the emoji for each line. */
export const ASSENT = [
  "You may receive invitations to surveys that are suitable for your age.",
  "You can choose whether to take part in each survey.",
  "You can skip questions where the survey allows it or stop taking part.",
  "You do not have to buy anything to participate.",
  "Your answers will be handled as explained in the privacy information.",
  "Some surveys may need extra permission before you can take part.",
  "You can ask a question or raise a concern through the contact details provided."
];
export const ASSENT_EMOJI = ['📬', '✅', '⏭️', '🛍️', '🔐', '🗝️', '💬'];

/** Part D — the study information card shown before every survey. */
export const STUDY_FIELDS = [
  ['title', '🏷️', '[Insert study title]'],
  ['purpose', '🎯', '[Explain why the research is being conducted]'],
  ['topics', '🧭', '[Describe the topics, including sensitive subjects where relevant]'],
  ['duration', '⏱️', '[Insert estimated time]'],
  ['collected', '🗂️', '[List relevant data categories]'],
  ['recipients', '🤝', '[Explain relevant recipients and client access]'],
  ['reward', '🎁', '[State the reward and eligibility requirements]'],
  ['risks', '🛟', '[Explain relevant risks and safeguards]'],
  ['permission', '🗝️', '[State the applicable permission requirements]'],
  ['support', '📮', 'support@turn2opinion.com'],
];

/** English strings of the form (keys shared with public/i18n/consent/<lang>.json). */
export const EN = {
  "agreement": "Teen participation agreement",
  "version": "Version {0}",
  "ages": "Ages 13–17",
  "read_count": "{0} of {1} read",
  "hello": "Hi {0} — one thing before your first survey",
  "hello_anon": "One thing before your first survey",
  "h1": "Teen research terms & parental consent",
  "lead": "Read it together. A parent or guardian gives permission, you make your own decision, and the account switches on only when both are done.",
  "role1_h": "Read together",
  "role1_p": "Part A · 19 short sections",
  "role3_h": "You decide",
  "role3_p": "Part C · your own yes or no",
  "time": "About 8 minutes",
  "effective": "Effective {0}",
  "info_h": "Important information for parents and legal guardians",
  "info1": "Frequent Research conducts market research to understand people's opinions, preferences, experiences and behaviours. We may invite eligible teenagers to participate in online surveys and other age-appropriate research activities.",
  "info2": "Before your child participates, please read this agreement carefully. It explains how participation works, what information may be collected, how privacy is protected, how rewards may be provided, and what rights you and your child have.",
  "info3": "Where required, your permission must be verified before your child can participate. Your child must also understand the study and freely agree to participate. Giving parental permission does not require your child to participate in any particular survey.",
  "info_rule": "Your child will not be eligible to participate until all applicable parental permission, verification and participant-assent requirements have been satisfied.",
  "part": "Part {0}",
  "partA_h": "Terms & conditions",
  "partA_p": "What taking part means — plain words first, the full text one tap away.",
  "partB_h": "Parent / guardian consent",
  "partB_p": "Parent or guardian: please complete this part yourself.",
  "partC_h": "Your decision",
  "partC_p": "This part is for you — only you can answer it.",
  "partD_h": "Before every survey",
  "partD_p": "Each study first shows a card like this. If it needs extra permission, we ask before it starts.",
  "partE_note": "Your answers are saved as a secure consent record (version {0}). Verification details stay with our team.",
  "ch_join": "Joining",
  "ch_join_tag": "Who can join and how the account works",
  "ch_permission": "Permission & choice",
  "ch_permission_tag": "Parent permission, your own yes — and stopping any time",
  "ch_safety": "Surveys & safety",
  "ch_safety_tag": "How invitations work and how you are protected",
  "ch_data": "Your information",
  "ch_data_tag": "What is collected, sensitive topics, recordings and sharing",
  "ch_rewards": "Rewards & your account",
  "ch_rewards_tag": "Points, payouts, keeping data and staying secure",
  "ch_help": "Help, changes & the law",
  "ch_help_tag": "Support, updates and your local rights",
  "in_short": "In short",
  "full": "Read the full section",
  "hide": "Hide full text",
  "read_done": "Read",
  "section": "Section {0}",
  "expand_all": "Open all sections",
  "collapse_all": "Close all sections",
  "legal_en": "The full legal text is in English, which is the binding version.",
  "translate_full": "Translate the full text",
  "translating": "Translating…",
  "mt_note": "Machine translation for convenience — the English text prevails.",
  "mt_fail": "Translation of the full text isn’t available right now.",
  "contact_email": "Email",
  "contact_address": "Postal address",
  "contact_privacy": "Privacy contact",
  "b2_h": "Declaration",
  "b2_lead": "By selecting the consent options below and completing any required verification, I confirm that:",
  "b3_h": "Consent selections",
  "b3_lead": "Each box is separate and starts unticked. Optional boxes never change the required ones.",
  "required": "Required",
  "optional": "Optional",
  "kind_ack": "Required acknowledgement",
  "kind_where": "Required where applicable",
  "kind_opt": "Optional · separate permission",
  "c_participation_k": "Permission for panel participation",
  "c_participation": "I give permission for the teenager identified above to enrol in the Frequent Research teen research panel and to be considered for eligible, age-appropriate research activities, subject to any additional permissions required for a specific study.",
  "c_privacy_k": "Privacy information",
  "c_privacy": "I confirm that I have been provided with the applicable privacy notice and understand how to access it. This acknowledgement does not replace any separate consent required by law.",
  "c_contact_k": "Contact and verification",
  "c_contact": "I authorise the use of the contact method I supplied for parental permission verification and necessary programme communications, as described in the applicable privacy notice.",
  "c_studyContact_k": "Additional study contact",
  "c_studyContact": "I agree to receive further contact about specific research opportunities through the channels and for the purposes separately explained to me.",
  "c_recording_k": "Recording or identifiable material",
  "c_recording": "I understand that audio, video, photographs or identifiable quotations require separate study-specific information and any additional permission required by law. Selecting this option does not provide blanket permission for all future recordings or publications.",
  "c_sensitive_k": "Sensitive research",
  "c_sensitive": "I understand that surveys involving sensitive information may require a separate explanation, risk review and additional permission. This option does not authorise all future sensitive-data collection.",
  "opt_note": "Optional permissions appear only when such activities are proposed — and each study still asks again first.",
  "privacy_link": "Open the privacy notice",
  "c_hello": "Hi {0} — please read before joining",
  "c_hello_anon": "Please read before joining",
  "c_lead": "Frequent Research asks people questions to understand what they think and feel about different products, services and experiences.",
  "c_if": "If you join:",
  "c_decide": "Your parent or guardian may give permission for you to be considered for research, but you still get to decide whether you want to take part in a particular survey.",
  "c_choose": "Please choose one option",
  "yes_opt": "Yes, I understand the explanation and want to take part.",
  "no_opt": "No, I do not want to take part.",
  "no_h": "That’s completely okay.",
  "no_p": "Nothing will start and you won’t be invited to studies. You can change your mind later.",
  "no_change": "I changed my mind",
  "no_save": "Save my answer and leave",
  "f_title": "Study title",
  "f_purpose": "Purpose",
  "f_topics": "Topics covered",
  "f_duration": "Expected duration",
  "f_collected": "Information collected",
  "f_recipients": "Who may receive the information",
  "f_reward": "Reward, if any",
  "f_risks": "Additional risks or concerns",
  "f_permission": "Additional permission required",
  "f_support": "Support contact",
  "example": "Example",
  "d_rule": "The general panel consent never replaces study-specific consent — the teen must also agree each time.",
  "send_h": "Ready to send?",
  "chk_read": "Terms read",
  "chk_required": "Required consents",
  "chk_teen": "Your decision",
  "send_btn": "Send for verification",
  "sending": "Sending…",
  "need": "Still needed: {0}",
  "send_note": "The account stays locked until the parent or guardian’s permission is verified.",
  "not_now": "Not now",
  "err_save": "We couldn’t save this. Please check your connection and try again.",
  "decline_h": "Leave without finishing?",
  "decline_p": "Nothing is saved, and the account stays locked until this agreement is complete. You can come back any time.",
  "decline_back": "Back to the agreement",
  "decline_out": "Log out",
  "done_h": "Sent! One key to go",
  "done_p": "We’re confirming the parent or guardian’s contact. The account unlocks as soon as permission is verified.",
  "done_wait": "Waiting for verification…",
  "done_active_h": "Unlocked — welcome!",
  "done_active_p": "Permission verified and your decision saved. Your account is now active.",
  "declined_h": "Your answer is saved",
  "declined_p": "You said no, so nothing will start. Thank you for telling us.",
  "receipt": "Consent record",
  "r_id": "Reference",
  "r_date": "Date",
  "r_version": "Version",
  "r_lang": "Language",
  "r_guardian": "Parent/guardian",
  "r_permission": "Parent permission",
  "r_assent": "Your decision",
  "r_account": "Account",
  "r_choices": "Consent selections",
  "st_pending": "Pending verification",
  "st_verified": "Verified",
  "st_agreed": "Agreed",
  "st_declined": "Declined",
  "st_blocked": "Locked",
  "st_active": "Active",
  "yes": "Yes",
  "no": "No",
  "download": "Download a copy",
  "continue": "Continue to your dashboard",
  "footer_q": "Questions? Write to {0}",
  "privacy_policy": "Privacy Policy",
  "print": "Print",
  "progress": "Reading progress",
  "sections": "Sections"
};

/**
 * The record your backend receives keeps the questionnaire's C-keys as well, so
 * nothing downstream that reads C01–C09 has to change:
 *   C01 privacy notice read          ← selection 'privacy'
 *   C02 panel permission             ← selection 'participation'
 *   C03 participation rules read     ← the declaration, acknowledged
 *   C04 administration updates       ← selection 'studyContact'
 *   C05 / C06 audio / video studies  ← selection 'recording'
 *   C07 / C09 explained, voluntary   ← the teen's decision = yes
 *   C08 the teen wants to join       ← the teen's decision
 */
export function legacyDecisions({ selections = {}, declaration = false, assent = null }) {
  const yn = (b) => (b ? 'yes' : 'no');
  return {
    C01: yn(selections.privacy), C02: yn(selections.participation), C03: yn(declaration),
    C04: yn(selections.studyContact), C05: selections.recording ? 'depends' : 'no', C06: selections.recording ? 'depends' : 'no',
    C07: assent === 'yes' ? 'yes' : assent === 'no' ? 'no' : null,
    C08: assent, C09: assent === 'yes' ? 'yes' : assent === 'no' ? 'no' : null,
  };
}

/** Every translatable string of the form, keyed exactly like the language packs. */
export const CONSENT_STRINGS = (() => {
  const o = { ...EN };
  Object.entries(SECTIONS).forEach(([n, s]) => { o[`t${n}`] = s.title; o[`s${n}`] = s.short; });
  DECLARATION.forEach((d, i) => { o[`d${i + 1}`] = d; });
  ASSENT.forEach((a, i) => { o[`a${i + 1}`] = a; });
  return o;
})();
