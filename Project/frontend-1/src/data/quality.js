// Quality & security checks shown on Home and /profiling/.
export const SECURITY_CHECKS = [
  { name: 'Timezone Validation', icon: 'clock', group: 'device', text: 'Device time zone must match the location you registered from.' },
  { name: 'Age Validation', icon: 'cake', group: 'identity', text: 'Date of birth is checked for consistency at sign-up and in screeners.' },
  { name: 'BOT Validation', icon: 'bot', group: 'device', text: 'Automated traffic is filtered before it ever reaches a survey.' },
  { name: 'URL Protection', icon: 'link', group: 'survey', text: 'Survey links are signed so they can’t be tampered with or shared.' },
  { name: 'Browser Fingerprinting', icon: 'finger', group: 'device', text: 'Unique device signatures stop one person taking a survey twice.' },
  { name: 'Duplicate Detection', icon: 'copy', group: 'identity', text: 'Automated and manual checks remove duplicate accounts.' },
  { name: 'GEO-IP Validation', icon: 'pin', group: 'device', text: 'Your IP location must match your registered country.' },
  { name: 'CAPTCHA Security Controls', icon: 'puzzle', group: 'device', text: 'Human verification at sign-up, login and survey entry.' },
  { name: 'Gate Survey Screening', icon: 'gate', group: 'survey', text: 'A short gate survey confirms attention before client surveys.' },
  { name: 'Security Question Validation', icon: 'key', group: 'identity', text: 'Personal security questions confirm it’s really you.' },
  { name: 'Screening Questions Filters', icon: 'filter', group: 'survey', text: 'Screeners match each study to the right audience.' },
  { name: 'Open-End (OE) Quality Checks', icon: 'pen', group: 'answers', text: 'Written answers are checked for effort, relevance and copy-paste.' },
  { name: 'Red Herring Questions Controls', icon: 'fish', group: 'answers', text: 'Trap questions catch inattentive or random answering.' },
  { name: 'Pre-Screening Qualification Filters', icon: 'target', group: 'survey', text: 'Profile data pre-qualifies you, so fewer surveys screen you out.' },
  { name: 'Double Opt-In Authentication', icon: 'mail', group: 'identity', text: 'Email and phone are both verified before an account goes live.' },
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

export const VERIFICATION_LAYERS = [
  { name: 'Company email validation', icon: 'mail', text: 'Professional members can confirm employment through a work email.' },
  { name: 'Phone verification', icon: 'phone', text: 'A one-time code confirms a real, reachable phone number.' },
  { name: 'Public profile cross-referencing', icon: 'id', text: 'Professional claims can be cross-checked against public profiles such as LinkedIn.' },
  { name: 'External database validation', icon: 'database', text: 'Addresses and identities are checked against trusted directories.' },
  { name: 'Behavioural pattern monitoring', icon: 'pulse', text: 'Speeding, straight-lining and unusual patterns are flagged.' },
  { name: 'Backend quality audit reviews', icon: 'search', text: 'Our quality team reviews accounts and responses by hand.' }
];
