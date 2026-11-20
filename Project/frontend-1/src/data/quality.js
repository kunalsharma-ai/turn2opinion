// Quality & security checks shown on Home and /profiling/.
export const SECURITY_CHECKS = [
  { name: 'Timezone Validation', icon: 'clock', group: 'device', text: 'Device time zone must match the location you registered from.' },
  { name: 'Age Validation', icon: 'cake', group: 'identity', text: 'Date of birth is checked for consistency at sign-up and in screeners.', teen: 'Teen panel: only ages 13 to 17 can join, and the date of birth is re-checked in every screener. At 18, members move panels only with their own consent.' },
  { name: 'BOT Validation', icon: 'bot', group: 'device', text: 'Automated traffic is filtered before it ever reaches a survey.' },
  { name: 'URL Protection', icon: 'link', group: 'survey', text: 'Survey links are signed so they can’t be tampered with or shared.', teen: 'Teen panel: invitations go only to the teen’s verified email and dashboard, never to social media.' },
  { name: 'Browser Fingerprinting', icon: 'finger', group: 'device', text: 'Unique device signatures stop one person taking a survey twice.' },
  { name: 'Duplicate Detection', icon: 'copy', group: 'identity', text: 'Automated and manual checks remove duplicate accounts.', teen: 'Teen panel: one teen, one account. A parent email can’t be reused to open a second teen account.' },
  { name: 'GEO-IP Validation', icon: 'pin', group: 'device', text: 'Your IP location must match your registered country.', teen: 'Teen panel: local rules on research with young people are applied by country.' },
  { name: 'CAPTCHA Security Controls', icon: 'puzzle', group: 'device', text: 'Human verification at sign-up, login and survey entry.' },
  { name: 'Gate Survey Screening', icon: 'gate', group: 'survey', text: 'A short gate survey confirms attention before client surveys.', teen: 'Teen panel: studies pass an age-appropriate content review before the gate opens.' },
  { name: 'Security Question Validation', icon: 'key', group: 'identity', text: 'Personal security questions confirm it’s really you.' },
  { name: 'Screening Questions Filters', icon: 'filter', group: 'survey', text: 'Screeners match each study to the right audience.', teen: 'Teen panel: screeners never ask for a school name, home address or photos.' },
  { name: 'Open-End (OE) Quality Checks', icon: 'pen', group: 'answers', text: 'Written answers are checked for effort, relevance and copy-paste.', teen: 'Teen panel: written answers are checked for personal details, which are removed before reporting.' },
  { name: 'Red Herring Questions Controls', icon: 'fish', group: 'answers', text: 'Trap questions catch inattentive or random answering.' },
  { name: 'Pre-Screening Qualification Filters', icon: 'target', group: 'survey', text: 'Profile data pre-qualifies you, so fewer surveys screen you out.' },
  { name: 'Double Opt-In Authentication', icon: 'mail', group: 'identity', text: 'Email and phone are both verified before an account goes live.', teen: 'Teen panel: the teen confirms their email, and the parent or guardian confirms theirs, before anything switches on.' },
  { name: 'Browser Language', icon: 'globe', group: 'device', text: 'Browser language is checked against the survey’s market.' },
  { name: 'TOR Detection', icon: 'onion', group: 'device', text: 'Anonymising networks and proxies are detected and blocked.' },
  { name: 'Cookie Validation', icon: 'cookie', group: 'device', text: 'Session cookies confirm a single, consistent survey session.' }
];

export const CHECK_GROUPS = [
  { id: 'identity', name: 'Who you are', color: '#49B6FF' },
  { id: 'device', name: 'Your device & connection', color: '#7B5CFF' },
  { id: 'survey', name: 'Survey entry', color: '#FFB020' },
  { id: 'answers', name: 'Answer quality', color: '#12C29B' }
];

// Round 10d (Kunal, 20 Nov 2026): the extra standards that apply to the Teen panel (13-17), on top of the 18 checks.
export const TEEN_SAFEGUARDS = [
  { icon: 'key', name: 'Two-key consent', text: 'A parent or guardian gives verified permission, and the teen gives their own yes. Surveys stay locked until both keys turn.' },
  { icon: 'cake', name: 'Ages 13–17 only', text: 'The sign-up calendar only allows teen birthdays, and age is re-checked in screeners.' },
  { icon: 'eye', name: 'Content review', text: 'Every teen study is reviewed for age-appropriate content. No alcohol, gambling, dating or adult topics.' },
  { icon: 'shield', name: 'Separate permission for sensitive topics', text: 'Anything touching health or wellbeing needs its own explanation and a parent’s specific yes.' },
  { icon: 'lock', name: 'Minimum data', text: 'No school names, photos or location tracking. Personal details are stripped from written answers.' },
  { icon: 'x', name: 'No marketing, ever', text: 'Brands never contact teens. Answers are reported in totals and are never sold.' },
  { icon: 'wallet', name: 'Parent-approved payouts', text: 'The parent or guardian chooses how rewards are paid out.' },
  { icon: 'clock', name: 'Short and calm', text: 'Shorter surveys, fewer invitations and a clear time estimate before every study.' },
  { icon: 'refresh', name: 'Stop any time', text: 'Skip any question, leave any survey, or pause or close the account without a reason.' },
  { icon: 'scale', name: 'Research codes', text: 'Run under ESOMAR and MRS guidance for research with children and young people, plus local law.' }
];

export const VERIFICATION_LAYERS = [
  { name: 'Company email validation', icon: 'mail', text: 'Professional members can confirm employment through a work email.' },
  { name: 'Phone verification', icon: 'phone', text: 'A one-time code confirms a real, reachable phone number.' },
  { name: 'Public profile cross-referencing', icon: 'id', text: 'Professional claims can be cross-checked against public profiles such as LinkedIn.' },
  { name: 'External database validation', icon: 'database', text: 'Addresses and identities are checked against trusted directories.' },
  { name: 'Behavioural pattern monitoring', icon: 'pulse', text: 'Speeding, straight-lining and unusual patterns are flagged.' },
  { name: 'Backend quality audit reviews', icon: 'search', text: 'Our quality team reviews accounts and responses by hand.' },
  { name: 'Parent or guardian verification', icon: 'key', text: 'Teen accounts (13–17) switch on only after a parent or guardian confirms their own email and gives permission.' }
];
