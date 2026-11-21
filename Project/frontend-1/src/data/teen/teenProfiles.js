/**
 * THE TEEN'S OWN PROFILES — the second block of the minor profile hub.
 *
 * Source: Global Teen Research Panel Questionnaire (Ages 13-17), everything from
 * "Teen Basic Demographics" to "Incentives and Rewards".
 *
 * KEY NAMING
 * Where the source document numbers a question (D01, E04, H07, T10, G05, L13,
 * X06, R01, I09, A19 …) that number is the answer key, unchanged. Where the
 * source leaves a question unnumbered — the blocks headed "Digital Behaviour and
 * Social Media", "Gaming and Entertainment", "Shopping Behaviour and Brand
 * Profile", "Food and Beverages", "Fashion and Lifestyle", "Sports and Hobbies"
 * and "Technology, Apps and Emerging Trends" — a two-letter prefix and a running
 * number is assigned (SM01…, GE01…, SH01…, FB01…, FL01…, SP01…, TA01…).
 * docs/DATA-DICTIONARY.md lists every key against its line in the document.
 *
 * Questions the questionnaire marks "Privacy note: avoid collecting …" — exact
 * birth dates, precise home addresses, school names, GPS locations — are not
 * here and must not be added. See docs/INTEGRATION.md § What we never ask a minor.
 */

const FREQ = [
  ['Daily', 'daily', '🔥'],
  ['Several times a week', 'often', '📆'],
  ['Weekly', 'weekly', '🗓️'],
  ['Occasionally', 'sometimes', '🌙'],
  ['Never', 'never', '🙅'],
];
const YES_NO_MAYBE = [
  ['Yes', 'yes', '✅'],
  ['No', 'no', '🚫'],
  ['Maybe', 'maybe', '🤔'],
];

// ════════════════════════════ 1 · Basics ════════════════════════════
const BASIC = {
  id: 'minor__basic',
  owner: 'minor',
  name: 'The basics',
  blurb: 'Where you are and what language you want surveys in. Five minutes, tops.',
  icon: '👋',
  theme: 'sunrise',
  first: true,
  sections: [
    {
      name: 'About you',
      icon: '🙋',
      qs: [
        {
          // A birthday picked on the calendar. Only the AGE (13–17) is stored and
          // sent as D01, exactly as before — the date itself never leaves the
          // device (the questionnaire's privacy note: no exact birth dates).
          n: 'D01', q: 'When is your birthday?', kind: 'dob', segment: 'minor', ageOnly: true,
          help: 'Tap the year to jump to it. We only keep your age — never your birthday.', req: true,
        },
        {
          n: 'D06', q: 'How do you describe yourself?', req: false,
          // same five options and same stored values as the main portal's `gender`
          o: [['Female', 'Female', '👩'], ['Male', 'Male', '👨'], ['Non-binary', 'Non-binary', '🧑'], ['Another identity', 'Other', '✨'], ['Prefer not to say', 'Prefer not to say', '🤐']],
          other: 'Other',
        },
        { n: 'D02', q: 'Which country do you live in?', kind: 'country', req: true },
        { n: 'D03', q: 'Which state, province or region?', kind: 'region', from: 'D02', req: true },
        {
          n: 'D04', q: 'What kind of place is it?', req: true,
          o: [['A large city', 'city', '🏙️'], ['A suburb', 'suburb', '🏘️'], ['A small town', 'town', '🏡'], ['The countryside', 'rural', '🌾'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'D07', q: 'How long have you lived in this country?', req: false,
          o: [['Less than a year', '<1', '🧳'], ['1–3 years', '1-3', '📦'], ['More than 3 years', '3+', '🏠'], ['Most of my life', 'most', '🌳'], ['Prefer not to say', 'na', '🤐']],
        },
      ],
    },
    {
      name: 'Surveys',
      icon: '🗣️',
      qs: [
        { n: 'D05', q: 'Which language would you like your surveys in?', kind: 'language', req: true },
        {
          n: 'D10', q: 'Which time zone are you in?', help: 'So invitations land at a sensible hour.', kind: 'timezone', req: false,
        },
      ],
    },
  ],
};

// ══════════════════════════ 2 · Education ══════════════════════════
const EDUCATION = {
  id: 'minor__education',
  owner: 'minor',
  name: 'School & learning',
  blurb: 'What you study, what you are into, and how you like to learn it.',
  icon: '🎓',
  theme: 'campus',
  sections: [
    {
      name: 'Where you study',
      icon: '🏫',
      qs: [
        {
          n: 'D08', q: 'What stage of education are you at?', req: true,
          o: [['Lower secondary', 'lower', '📗'], ['Upper secondary', 'upper', '📘'], ['Vocational or technical', 'vocational', '🛠️'], ['Another pathway', 'other', '🧭'], ['Not studying right now', 'none', '⏸️'], ['Prefer not to say', 'na', '🤐']],
          other: 'other',
        },
        {
          n: 'D09', q: 'Which best describes how you study?', req: true,
          o: [['Full-time student', 'ft', '🎒'], ['Part-time student', 'pt', '🕐'], ['Homeschooled', 'home', '🏠'], ['Not attending at the moment', 'break', '⏸️'], ['Not studying', 'none', '⭕'], ['Prefer not to say', 'na', '🤐']],
        },
      ],
    },
    {
      name: 'What you like',
      icon: '✨',
      qs: [
        {
          n: 'E01', q: 'Which subjects do you like most?', req: false, multi: true,
          o: [['Maths', 'maths', '➗'], ['Science', 'science', '🔬'], ['Languages', 'languages', '🗣️'], ['Art', 'arts', '🎨'], ['Computing', 'computing', '💻'], ['History & social studies', 'history', '🏛️'], ['Business', 'business', '📈'], ['PE & sport', 'pe', '⚽'], ['Something else', 'other', '🧩'], ['Not sure yet', 'unsure', '🤷']],
          other: 'other', exclusive: ['unsure'],
        },
        {
          n: 'E06', q: 'What would you like to learn more about?', req: false, multi: true,
          o: [['Science', 'science', '🔬'], ['Technology', 'tech', '🤖'], ['Creative arts', 'creative', '🎭'], ['Languages', 'languages', '🌏'], ['Money & business', 'finance', '💰'], ['The environment', 'environment', '🌍'], ['Health & wellbeing', 'health', '🧘'], ['Careers', 'careers', '🧭'], ['Something else', 'other', '💡']],
          other: 'other',
        },
      ],
    },
    {
      name: 'How you learn',
      icon: '🧠',
      qs: [
        {
          n: 'E02', q: 'How do you prefer to learn something new?', req: false,
          o: [['Reading', 'reading', '📖'], ['Watching videos', 'video', '📺'], ['Listening', 'audio', '🎧'], ['Doing it hands-on', 'practical', '🙌'], ['With other people', 'group', '👥'], ['Interactive apps', 'apps', '📱'], ['A mix of all of it', 'mix', '🔀']],
        },
        {
          n: 'E03', q: 'What do you actually use to learn?', req: false, multi: true,
          o: [['Books', 'books', '📚'], ['Websites', 'web', '🌐'], ['Learning apps', 'apps', '📱'], ['Videos', 'video', '▶️'], ['Online courses', 'courses', '🎓'], ['AI tools', 'ai', '🤖'], ['A tutor', 'tutor', '🧑‍🏫'], ['Whatever school gives us', 'classroom', '🏫'], ['Nothing in particular', 'none', '➖'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
        { n: 'E04', q: 'How often do you use digital tools for schoolwork?', req: false, o: FREQ },
        {
          n: 'E05', q: 'Which device do you use most for schoolwork?', req: false,
          o: [['Smartphone', 'phone', '📱'], ['Tablet', 'tablet', '📲'], ['Laptop', 'laptop', '💻'], ['Desktop computer', 'desktop', '🖥️'], ['A device the family shares', 'shared', '👨‍👩‍👧'], ['I don’t use one', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'E09', q: 'Which learning apps or services do you use?', req: false, multi: true,
          when: (a) => a.E04 !== 'never',
          o: [['Khan Academy', 'khan', '🟩'], ['Duolingo', 'duolingo', '🦉'], ['Google Classroom', 'classroom', '🟦'], ['BYJU’S', 'byjus', '🟪'], ['Coursera or edX', 'mooc', '🎓'], ['YouTube learning channels', 'youtube', '▶️'], ['A school-provided platform', 'school', '🏫'], ['Something else', 'other', '💡'], ['None', 'none', '⭕'], ['Prefer not to say', 'na', '🤐']],
          other: 'other', exclusive: ['none', 'na'],
        },
        {
          n: 'E07', q: 'How often do you do clubs, classes or activities outside school?', req: false,
          o: [['Daily', 'daily', '🔥'], ['Several times a week', 'often', '📆'], ['Weekly', 'weekly', '🗓️'], ['Monthly', 'monthly', '📅'], ['Rarely', 'rarely', '🌙'], ['Never', 'never', '🙅']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 3 · Home & family ══════════════════════════
const HOUSEHOLD = {
  id: 'minor__household',
  owner: 'minor',
  name: 'Home & family',
  blurb: 'Who is at home with you and what you get a say in.',
  icon: '🏡',
  theme: 'nest',
  sections: [
    {
      name: 'Who is home',
      icon: '👨‍👩‍👧',
      qs: [
        {
          n: 'H01', q: 'Who do you usually live with?', req: true,
          o: [['Both parents', 'both', '👨‍👩‍👧'], ['One parent', 'one', '👩‍👧'], ['A parent and a step-parent', 'step', '👪'], ['A guardian or relatives', 'guardian', '🛡️'], ['Between two homes', 'shared', '🔁'], ['Another arrangement', 'other', '🏠'], ['Prefer not to say', 'na', '🤐']],
          other: 'other',
        },
        {
          n: 'H02', q: 'How many people live there, counting you?', req: false,
          o: [['1–2', '1-2', '👥'], ['3–4', '3-4', '👨‍👩‍👦'], ['5–6', '5-6', '👨‍👩‍👧‍👦'], ['7 or more', '7+', '🏘️'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'H03', q: 'How many brothers and sisters do you have?', req: false,
          o: [['None', '0', '⭕'], ['1', '1', '🧍'], ['2', '2', '👥'], ['3 or more', '3+', '👨‍👩‍👧‍👦'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'H04', q: 'How many other children aged 0–12 live with you?', req: false,
          o: [['None', '0', '⭕'], ['1', '1', '🧒'], ['2', '2', '👫'], ['3 or more', '3+', '👨‍👩‍👧‍👦'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'H05', q: 'How many other teenagers aged 13–17 live with you?', req: false,
          o: [['None', '0', '⭕'], ['1', '1', '🧑'], ['2', '2', '🧑‍🤝‍🧑'], ['3 or more', '3+', '👨‍👩‍👧‍👦'], ['Prefer not to say', 'na', '🤐']],
        },
      ],
    },
    {
      name: 'What you decide',
      icon: '🧭',
      qs: [
        {
          n: 'H06', q: 'Who decides on technology bought for your home?', req: false,
          o: [['A parent or guardian', 'parent', '🧑‍🍼'], ['We decide together', 'shared', '🤝'], ['Another adult', 'other-adult', '👤'], ['It depends on the thing', 'varies', '🔀'], ['Not sure', 'unsure', '🤷'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'H07', q: 'Who chooses the food and snacks bought for your home?', req: false,
          o: [['A parent or guardian', 'parent', '🧑‍🍼'], ['Me', 'me', '🙋'], ['We decide together', 'shared', '🤝'], ['Someone else at home', 'other', '👤'], ['It varies', 'varies', '🔀'], ['Prefer not to say', 'na', '🤐']],
        },
        {
          n: 'H10', q: 'Which household purchases do you get a say in?', req: false, multi: true,
          o: [['Food and drink', 'food', '🍽️'], ['Technology', 'tech', '📱'], ['Clothing', 'clothing', '👕'], ['Entertainment subscriptions', 'subs', '📺'], ['Travel', 'travel', '✈️'], ['Household products', 'household', '🧽'], ['None of them', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
      ],
    },
  ],
};

// ══════════════════════════ 4 · Devices & internet ══════════════════════════
const DEVICES = {
  id: 'minor__devices',
  owner: 'minor',
  name: 'Devices & internet',
  blurb: 'What you use, where you get online, and what you could do a survey on.',
  icon: '📱',
  theme: 'circuit',
  sections: [
    {
      name: 'Your kit',
      icon: '🔌',
      qs: [
        {
          n: 'T01', q: 'Which devices do you personally use?', req: true, multi: true,
          o: [['Smartphone', 'phone', '📱'], ['Tablet', 'tablet', '📲'], ['Laptop', 'laptop', '💻'], ['Desktop computer', 'desktop', '🖥️'], ['Games console', 'console', '🎮'], ['Smart TV', 'tv', '📺'], ['Smartwatch', 'watch', '⌚'], ['Something else', 'other', '💡'], ['None of these', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'T13', q: 'Which operating system do you use most?', req: false,
          o: [['Android', 'android', '🤖'], ['iOS / iPhone', 'ios', '🍎'], ['Windows', 'windows', '🪟'], ['macOS', 'macos', '💻'], ['ChromeOS', 'chromeos', '🌐'], ['Something else', 'other', '💡'], ['Not sure', 'unsure', '🤷']],
          other: 'other',
        },
      ],
    },
    {
      name: 'Getting online',
      icon: '🌐',
      qs: [
        {
          n: 'T02', q: 'How often do you go online?', req: true,
          o: [['Several times a day', 'many-daily', '🔥'], ['About once a day', 'daily', '📆'], ['Several times a week', 'weekly', '🗓️'], ['Less often', 'rare', '🌙'], ['Never', 'never', '🙅']],
        },
        {
          n: 'T05', q: 'Where do you usually get online?', req: false, multi: true,
          when: (a) => a.T02 !== 'never',
          o: [['At home', 'home', '🏠'], ['At school', 'school', '🏫'], ['On mobile data when out', 'mobile', '📶'], ['Public Wi-Fi', 'public', '📡'], ['A library or community centre', 'library', '📚'], ['Somewhere else', 'other', '✨']],
          other: 'other',
        },
        {
          n: 'T06', q: 'Which connection do you use most?', req: false,
          when: (a) => a.T02 !== 'never',
          o: [['Home Wi-Fi', 'home-wifi', '🏠'], ['Mobile data', 'mobile', '📶'], ['Public Wi-Fi', 'public', '📡'], ['The school network', 'school', '🏫'], ['Something else', 'other', '💡'], ['No regular access', 'none', '⭕']],
          other: 'other',
        },
      ],
    },
    {
      name: 'Taking part',
      icon: '✅',
      qs: [
        {
          n: 'T10', q: 'Could you comfortably do an online survey on your main device?', help: 'There is no wrong answer — it only decides which studies you get.', req: true,
          o: [['Yes', 'yes', '✅'], ['No', 'no', '🚫'], ['Not sure', 'unsure', '🤷']],
        },
        {
          n: 'T11', q: 'Could you use a webcam if a study needed one?', req: false,
          o: [['Yes', 'yes', '📷'], ['No', 'no', '🚫'], ['Only with permission', 'permission', '🗝️'], ['Not sure', 'unsure', '🤷']],
        },
        {
          n: 'T12', q: 'Could you use headphones for an online interview?', req: false,
          o: [['Yes', 'yes', '🎧'], ['No', 'no', '🚫'], ['Sometimes', 'sometimes', '🔀']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 5 · Social media ══════════════════════════
const SOCIAL = {
  id: 'minor__social',
  owner: 'minor',
  name: 'Social & creating',
  blurb: 'Where you scroll, what you post, and who you actually follow.',
  icon: '💬',
  theme: 'feed',
  sections: [
    {
      name: 'Where you are',
      icon: '📲',
      qs: [
        {
          n: 'SM01', q: 'Which social platforms do you use regularly?', req: true, multi: true,
          o: [['Instagram', 'instagram', '📸'], ['YouTube', 'youtube', '▶️'], ['WhatsApp', 'whatsapp', '🟢'], ['Snapchat', 'snapchat', '👻'], ['TikTok', 'tiktok', '🎵'], ['Facebook', 'facebook', '🔵'], ['Discord', 'discord', '🎧'], ['Telegram', 'telegram', '✈️'], ['X', 'x', '✖️'], ['Reddit', 'reddit', '🟠'], ['Something else', 'other', '💡'], ['None of these', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'SM02', q: 'Which one do you use the most?', req: false,
          when: (a) => Array.isArray(a.SM01) && a.SM01.length > 0 && !a.SM01.includes('none'),
          o: [['Instagram', 'instagram', '📸'], ['YouTube', 'youtube', '▶️'], ['WhatsApp', 'whatsapp', '🟢'], ['Snapchat', 'snapchat', '👻'], ['TikTok', 'tiktok', '🎵'], ['Discord', 'discord', '🎧'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'SM03', q: 'Roughly how long do you spend on social media a day?', req: false,
          when: (a) => Array.isArray(a.SM01) && !a.SM01.includes('none'),
          o: [['Under 30 minutes', '<30', '⏱️'], ['30–60 minutes', '30-60', '🕐'], ['1–2 hours', '1-2h', '🕑'], ['2–4 hours', '2-4h', '🕓'], ['More than 4 hours', '4h+', '🕘']],
        },
        {
          n: 'SM04', q: 'What do you mostly use it for?', req: false, multi: true,
          when: (a) => Array.isArray(a.SM01) && !a.SM01.includes('none'),
          o: [['Entertainment', 'fun', '🍿'], ['Chatting with friends', 'friends', '💬'], ['Following creators', 'creators', '⭐'], ['Learning things', 'learning', '🧠'], ['Sharing photos and videos', 'sharing', '📷'], ['Gaming communities', 'gaming', '🎮'], ['News and trends', 'news', '📰']],
        },
      ],
    },
    {
      name: 'What you post',
      icon: '🎬',
      qs: [
        {
          n: 'SM06', q: 'Is any of your profile public?', req: false,
          when: (a) => Array.isArray(a.SM01) && !a.SM01.includes('none'),
          o: [['Yes', 'yes', '🌍'], ['No, all private', 'no', '🔒'], ['Some are public', 'some', '🔀']],
        },
        {
          n: 'SM07', q: 'How often do you post something?', req: false,
          when: (a) => Array.isArray(a.SM01) && !a.SM01.includes('none'),
          o: [['Daily', 'daily', '🔥'], ['Several times a week', 'often', '📆'], ['Weekly', 'weekly', '🗓️'], ['Now and then', 'sometimes', '🌙'], ['Never', 'never', '🙅']],
        },
        {
          n: 'SM08', q: 'What do you usually post?', req: false, multi: true,
          when: (a) => a.SM07 && a.SM07 !== 'never',
          o: [['Photos', 'photos', '📷'], ['Videos or reels', 'video', '🎞️'], ['Stories', 'stories', '⭕'], ['Text posts', 'text', '✍️'], ['Memes', 'memes', '😂']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 6 · Gaming & entertainment ══════════════════════════
const GAMING = {
  id: 'minor__gaming',
  owner: 'minor',
  name: 'Gaming & entertainment',
  blurb: 'What you play, what you watch, and who you watch it with.',
  icon: '🎮',
  theme: 'arcade',
  sections: [
    {
      name: 'Gaming',
      icon: '🕹️',
      qs: [
        {
          n: 'G01', q: 'Do you play games?', req: true,
          o: [['Yes', 'yes', '🎮'], ['No', 'no', '🚫'], ['Prefer not to say', 'na', '🤐']],
        },
        { n: 'GE01', q: 'How often do you play?', req: false, when: (a) => a.G01 === 'yes', o: [['Daily', 'daily', '🔥'], ['Several times a week', 'often', '📆'], ['Once a week', 'weekly', '🗓️'], ['Now and then', 'sometimes', '🌙'], ['Never', 'never', '🙅']] },
        {
          n: 'G02', q: 'What do you play on?', req: false, multi: true, when: (a) => a.G01 === 'yes',
          o: [['Smartphone', 'phone', '📱'], ['Tablet', 'tablet', '📲'], ['PC', 'pc', '💻'], ['Console', 'console', '🎮'], ['A handheld', 'handheld', '🎲'], ['Something else', 'other', '💡'], ['None', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'GE02', q: 'What kind of gaming do you prefer?', req: false, when: (a) => a.G01 === 'yes',
          o: [['Mobile games', 'mobile', '📱'], ['PC games', 'pc', '💻'], ['Console games', 'console', '🎮'], ['Online multiplayer', 'multiplayer', '🌐'], ['Casual games', 'casual', '🧩']],
        },
        {
          n: 'G05', q: 'Which genres do you enjoy?', req: false, multi: true, when: (a) => a.G01 === 'yes',
          o: [['Action', 'action', '💥'], ['Adventure', 'adventure', '🗺️'], ['Puzzle', 'puzzle', '🧩'], ['Sports', 'sports', '⚽'], ['Simulation', 'sim', '🚜'], ['Strategy', 'strategy', '♟️'], ['Role-playing', 'rpg', '🗡️'], ['Racing', 'racing', '🏎️'], ['Casual', 'casual', '🍬'], ['Creative sandbox', 'sandbox', '🧱'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'GE03', q: 'Do you watch gaming content online?', req: false,
          o: [['Often', 'often', '🔥'], ['Sometimes', 'sometimes', '📺'], ['Rarely', 'rarely', '🌙'], ['Never', 'never', '🙅']],
        },
      ],
    },
    {
      name: 'Watching & listening',
      icon: '🍿',
      qs: [
        {
          n: 'GE04', q: 'What do you watch most?', req: false, multi: true,
          o: [['Films', 'films', '🎬'], ['TV and streaming shows', 'tv', '📺'], ['YouTube videos', 'youtube', '▶️'], ['Short videos and reels', 'shorts', '📱'], ['Anime', 'anime', '🌸'], ['Sport', 'sport', '🏟️'], ['Gaming streams', 'streams', '🎮'], ['Music videos', 'music', '🎵']],
        },
        {
          n: 'G10', q: 'Which formats do you get through most?', req: false, multi: true,
          o: [['Films', 'films', '🎬'], ['Series', 'series', '📺'], ['Online videos', 'video', '▶️'], ['Music', 'music', '🎵'], ['Podcasts', 'podcasts', '🎙️'], ['Books', 'books', '📚'], ['Live events', 'live', '🎪'], ['Gaming streams', 'streams', '🎮'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'G12', q: 'Which music do you like?', req: false, multi: true,
          o: [['Pop', 'pop', '🎤'], ['Hip-hop', 'hiphop', '🎧'], ['Rock', 'rock', '🎸'], ['Electronic', 'electronic', '🎛️'], ['Classical', 'classical', '🎻'], ['Regional music', 'regional', '🪘'], ['Jazz', 'jazz', '🎷'], ['K-pop', 'kpop', '💜'], ['Something else', 'other', '💡'], ['No preference', 'any', '🤷']],
          other: 'other', exclusive: ['any'],
        },
        {
          n: 'G13', q: 'How do you usually listen to music?', req: false, multi: true,
          o: [['A streaming service', 'streaming', '🎧'], ['Radio', 'radio', '📻'], ['Downloads', 'downloads', '⬇️'], ['Through videos', 'video', '▶️'], ['Physical media', 'physical', '💿'], ['Live', 'live', '🎪'], ['Something else', 'other', '💡'], ['I don’t', 'never', '🙅']],
          other: 'other', exclusive: ['never'],
        },
      ],
    },
    {
      name: 'Creators & events',
      icon: '⭐',
      qs: [
        {
          n: 'GE05', q: 'Do you follow gaming or entertainment creators?', req: false,
          o: [['Yes, loads', 'many', '🔥'], ['Yes, a few', 'few', '⭐'], ['Now and then', 'sometimes', '🌙'], ['No', 'no', '👎']],
        },
        {
          n: 'G14', q: 'Do you go to entertainment events?', req: false,
          o: [['Often', 'often', '🎪'], ['Sometimes', 'sometimes', '🎟️'], ['Rarely', 'rarely', '🌙'], ['Never', 'never', '🙅']],
        },
        {
          n: 'G15', q: 'Which subscriptions does your household have?', req: false, multi: true,
          o: [['Video', 'video', '📺'], ['Music', 'music', '🎵'], ['Gaming', 'gaming', '🎮'], ['Books or audiobooks', 'books', '📚'], ['Something else', 'other', '💡'], ['None', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'GE06', q: 'Which feature would you most want in a gaming or entertainment app?', req: false,
          o: [['Gaming communities', 'communities', '👥'], ['Live streaming', 'streaming', '📡'], ['Challenges with friends', 'challenges', '🏁'], ['Watch parties', 'watchparty', '🍿'], ['Reviews and ratings', 'reviews', '⭐'], ['Better recommendations', 'recs', '🎯'], ['Tournaments', 'tournaments', '🏆'], ['Creator content', 'creator', '🎬']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 7 · Shopping ══════════════════════════
const SHOPPING = {
  id: 'minor__shopping',
  owner: 'minor',
  name: 'Shopping & brands',
  blurb: 'What you buy, who pays, and how much say you get.',
  icon: '🛍️',
  theme: 'boutique',
  sections: [
    {
      name: 'How you shop',
      icon: '🛒',
      qs: [
        {
          n: 'SH01', q: 'How often do you go shopping?', req: true,
          o: [['Several times a week', 'often', '🔥'], ['Once a week', 'weekly', '🗓️'], ['2–3 times a month', 'biweekly', '📆'], ['Once a month', 'monthly', '📅'], ['Rarely', 'rarely', '🌙']],
        },
        {
          n: 'SH02', q: 'Where do you shop most?', req: false,
          o: [['Online', 'online', '💻'], ['Shopping malls', 'mall', '🏬'], ['Local shops', 'local', '🏪'], ['Brand stores', 'brand', '🏷️'], ['Both online and in person', 'both', '🔀']],
        },
        {
          n: 'SH03', q: 'Which device do you shop on?', req: false,
          when: (a) => ['online', 'both'].includes(a.SH02),
          o: [['Smartphone', 'phone', '📱'], ['Laptop', 'laptop', '💻'], ['Tablet', 'tablet', '📲'], ['A family member’s device', 'family', '👨‍👩‍👧']],
        },
        {
          n: 'SH07', q: 'Which shopping platform do you use most?', req: false,
          o: [['Amazon', 'amazon', '📦'], ['Flipkart', 'flipkart', '🛒'], ['Myntra', 'myntra', '👗'], ['Meesho', 'meesho', '🧺'], ['Shein', 'shein', '👚'], ['Brand websites or apps', 'brand', '🏷️'], ['Something else', 'other', '💡'], ['I don’t shop online', 'none', '🙅']],
          other: 'other',
        },
      ],
    },
    {
      name: 'What and who pays',
      icon: '💳',
      qs: [
        {
          n: 'SH04', q: 'What do you shop for most?', req: false, multi: true,
          o: [['Clothes & fashion', 'fashion', '👕'], ['Shoes', 'shoes', '👟'], ['Beauty & personal care', 'beauty', '🧴'], ['Food & snacks', 'food', '🍫'], ['Electronics & gadgets', 'tech', '🎧'], ['Gaming things', 'gaming', '🎮'], ['Accessories', 'accessories', '🎒'], ['Books & stationery', 'books', '📚']],
        },
        {
          n: 'SH05', q: 'Who usually pays?', req: false,
          o: [['I pay myself', 'me', '🙋'], ['My parents or guardians', 'parents', '🧑‍🍼'], ['Other family', 'family', '👨‍👩‍👧'], ['A mix of me and family', 'shared', '🤝']],
        },
        {
          n: 'SH06', q: 'How much say do you get over what you buy?', req: false,
          o: [['I decide completely', 'full', '👑'], ['I decide most of the time', 'mostly', '✅'], ['We decide together', 'shared', '🤝'], ['My parents decide', 'parents', '🧑‍🍼']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 8 · Food & drink ══════════════════════════
const FOOD = {
  id: 'minor__food',
  owner: 'minor',
  name: 'Food & drink',
  blurb: 'What you eat, what you order, and what makes you try something new.',
  icon: '🍕',
  theme: 'bistro',
  sections: [
    {
      name: 'Where food comes from',
      icon: '🍽️',
      qs: [
        {
          n: 'FB01', q: 'Where do you usually get your food?', req: true, multi: true,
          o: [['Home', 'home', '🏠'], ['School canteen', 'school', '🏫'], ['Restaurants & cafés', 'restaurant', '🍴'], ['Fast food', 'fastfood', '🍔'], ['Delivery apps', 'delivery', '🛵'], ['Local shops & street food', 'street', '🌮']],
        },
        {
          n: 'FB02', q: 'Which kind of food do you like most?', req: false,
          o: [['Fast food', 'fastfood', '🍔'], ['Indian', 'indian', '🍛'], ['Chinese or other Asian', 'asian', '🥡'], ['Italian', 'italian', '🍝'], ['Snacks & street food', 'street', '🌮'], ['Healthy food', 'healthy', '🥗'], ['Desserts & bakery', 'dessert', '🧁']],
        },
        {
          n: 'FB03', q: 'How often do you order food online?', req: false,
          o: [['Several times a week', 'often', '🔥'], ['Once a week', 'weekly', '🗓️'], ['2–3 times a month', 'biweekly', '📆'], ['Now and then', 'sometimes', '🌙'], ['Never', 'never', '🙅']],
        },
        {
          n: 'FB04', q: 'Which delivery app gets used most?', req: false,
          when: (a) => a.FB03 && a.FB03 !== 'never',
          o: [['Swiggy', 'swiggy', '🟠'], ['Zomato', 'zomato', '🔴'], ['Uber Eats', 'ubereats', '🟢'], ['The restaurant’s own app', 'own', '🍴'], ['Something else', 'other', '💡']],
          other: 'other',
        },
      ],
    },
    {
      name: 'Snacks & drinks',
      icon: '🥤',
      qs: [
        {
          n: 'FB06', q: 'Which snacks do you go for?', req: false, multi: true,
          o: [['Crisps & chips', 'chips', '🍟'], ['Chocolate', 'chocolate', '🍫'], ['Biscuits & cookies', 'biscuits', '🍪'], ['Namkeen & savoury mixes', 'namkeen', '🥨'], ['Fast food', 'fastfood', '🍔'], ['Ice cream', 'icecream', '🍦'], ['Bakery', 'bakery', '🥐'], ['Fruit & healthy snacks', 'fruit', '🍎']],
        },
        {
          n: 'FB10', q: 'Which snack flavours do you prefer?', req: false, multi: true,
          o: [['Sweet', 'sweet', '🍬'], ['Salty', 'salty', '🧂'], ['Savoury', 'savoury', '🧄'], ['Fruity', 'fruit', '🍓'], ['Baked', 'baked', '🥖'], ['No preference', 'any', '🤷'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['any'],
        },
        {
          n: 'FB07', q: 'Which drinks do you have most often?', req: false, multi: true,
          o: [['Water', 'water', '💧'], ['Soft drinks', 'soft', '🥤'], ['Fruit juice', 'juice', '🧃'], ['Energy drinks', 'energy', '⚡'], ['Sports drinks', 'sports', '🏃'], ['Tea or coffee', 'tea', '☕'], ['Milk drinks', 'milk', '🥛'], ['Shakes & mocktails', 'shakes', '🍹']],
        },
        { n: 'FB08', q: 'How often do you have soft drinks?', req: false, o: FREQ },
        { n: 'FB09', q: 'How often do you have energy drinks?', req: false, o: FREQ },
      ],
    },
    {
      name: 'Trying new things',
      icon: '✨',
      qs: [
        {
          n: 'FB05', q: 'What makes you try a new food brand?', req: false, multi: true,
          o: [['A friend recommended it', 'friends', '🧑‍🤝‍🧑'], ['I saw it on social media', 'social', '📱'], ['A creator I follow', 'creator', '⭐'], ['A discount or offer', 'offer', '🏷️'], ['The packaging looked good', 'packaging', '📦'], ['A restaurant suggested it', 'restaurant', '🍴'], ['Plain curiosity', 'curiosity', '🔍']],
        },
        {
          n: 'FB11', q: 'Do you have any food preferences or restrictions we should know about for product tests?', help: 'Only so we never send you something you cannot eat.', req: false, multi: true,
          o: [['No, nothing', 'none', '✅'], ['Vegetarian', 'vegetarian', '🥦'], ['Vegan', 'vegan', '🌱'], ['Religious or cultural requirements', 'religious', '🕊️'], ['An allergy or intolerance', 'allergy', '⚠️'], ['Something else', 'other', '💡'], ['Prefer not to say', 'na', '🤐']],
          other: 'other', exclusive: ['none', 'na'],
        },
      ],
    },
  ],
};

// ══════════════════════════ 9 · Fashion & style ══════════════════════════
const FASHION = {
  id: 'minor__fashion',
  owner: 'minor',
  name: 'Fashion & style',
  blurb: 'What you wear, where you find it, and who you take cues from.',
  icon: '👟',
  theme: 'runway',
  sections: [
    {
      name: 'How you shop for it',
      icon: '🛍️',
      qs: [
        {
          n: 'FL01', q: 'How often do you shop for fashion?', req: true,
          o: [['Weekly', 'weekly', '🔥'], ['Monthly', 'monthly', '📅'], ['Every few months', 'quarterly', '🗓️'], ['Rarely or never', 'rarely', '🌙']],
        },
        {
          n: 'FL02', q: 'Where do you shop for it?', req: false,
          o: [['Online', 'online', '💻'], ['In shops', 'store', '🏬'], ['Both', 'both', '🔀'], ['I rarely shop', 'rarely', '🌙']],
        },
        {
          n: 'FL03', q: 'What do you buy most?', req: false, multi: true,
          o: [['Clothes', 'clothing', '👕'], ['Shoes', 'shoes', '👟'], ['Accessories', 'accessories', '🧢'], ['Beauty & personal care', 'beauty', '🧴'], ['All of it', 'all', '✨']],
          exclusive: ['all'],
        },
      ],
    },
    {
      name: 'What you like',
      icon: '💅',
      qs: [
        {
          n: 'L09', q: 'Which clothing styles are you into?', req: false, multi: true,
          o: [['Casual wear', 'casual', '👕'], ['Sportswear', 'sports', '🏃'], ['Formal wear', 'formal', '👔'], ['Streetwear', 'street', '🧢'], ['Traditional clothing', 'traditional', '🥻'], ['Accessories', 'accessories', '💍'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'L12', q: 'Which footwear do you prefer?', req: false, multi: true,
          o: [['Trainers & sports shoes', 'sports', '👟'], ['Casual shoes', 'casual', '👞'], ['Formal shoes', 'formal', '🥿'], ['Sandals', 'sandals', '🩴'], ['Boots', 'boots', '🥾'], ['No preference', 'any', '🤷'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['any'],
        },
        {
          n: 'L13', q: 'Which personal care are you interested in?', req: false, multi: true,
          o: [['Hair care', 'hair', '💇'], ['Skin care', 'skin', '🧴'], ['Oral care', 'oral', '🪥'], ['Bath & body', 'bath', '🛁'], ['Fragrance', 'fragrance', '🌸'], ['None', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
      ],
    },
    {
      name: 'Who influences you',
      icon: '⭐',
      qs: [
        {
          n: 'FL05', q: 'Does social media shape what you wear?', req: false,
          o: [['A lot', 'lot', '🔥'], ['Somewhat', 'some', '👍'], ['A little', 'little', '🤏'], ['Not at all', 'none', '➖']],
        },
        {
          n: 'FL06', q: 'Have you bought something after seeing it on social media?', req: false,
          o: [['Yes, often', 'often', '🔥'], ['Yes, now and then', 'sometimes', '👍'], ['No', 'no', '👎']],
        },
        {
          n: 'FL07', q: 'Which platform shapes your style most?', req: false,
          when: (a) => a.FL05 && a.FL05 !== 'none',
          o: [['Instagram', 'instagram', '📸'], ['YouTube', 'youtube', '▶️'], ['TikTok', 'tiktok', '🎵'], ['Pinterest', 'pinterest', '📌'], ['Something else', 'other', '💡'], ['None', 'none', '⭕']],
          other: 'other',
        },
        {
          n: 'FL09', q: 'Who has the most influence on what you wear?', req: false,
          o: [['Me', 'me', '🙋'], ['Friends', 'friends', '🧑‍🤝‍🧑'], ['Parents & family', 'family', '👨‍👩‍👧'], ['Creators', 'creators', '⭐'], ['Celebrities', 'celebs', '🌟']],
        },
      ],
    },
  ],
};

// ══════════════════════════ 10 · Sports & hobbies ══════════════════════════
const SPORTS = {
  id: 'minor__sports',
  owner: 'minor',
  name: 'Sports & hobbies',
  blurb: 'What you do when you are not online.',
  icon: '⚽',
  theme: 'arena',
  sections: [
    {
      name: 'Moving',
      icon: '🏃',
      qs: [
        { n: 'SP01', q: 'How often do you do sport or get active?', req: true, o: [['Daily', 'daily', '🔥'], ['Several times a week', 'often', '📆'], ['Weekly', 'weekly', '🗓️'], ['Now and then', 'sometimes', '🌙'], ['Never', 'never', '🙅']] },
        {
          n: 'SP02', q: 'Which sports do you play?', req: false, multi: true,
          when: (a) => a.SP01 !== 'never',
          o: [['Cricket', 'cricket', '🏏'], ['Football', 'football', '⚽'], ['Basketball', 'basketball', '🏀'], ['Badminton', 'badminton', '🏸'], ['Swimming', 'swimming', '🏊'], ['Running or cycling', 'running', '🚴'], ['Gym & fitness', 'gym', '🏋️'], ['Something else', 'other', '💡'], ['None', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'L16', q: 'Which kinds of activity do you enjoy?', req: false, multi: true,
          o: [['Team sports', 'team', '🤾'], ['Individual sports', 'solo', '🎯'], ['Dance', 'dance', '💃'], ['Fitness', 'fitness', '🏋️'], ['Cycling', 'cycling', '🚴'], ['Walking', 'walking', '🚶'], ['Outdoors', 'outdoor', '🏕️'], ['Esports', 'esports', '🎮'], ['None', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
      ],
    },
    {
      name: 'Watching',
      icon: '📺',
      qs: [
        {
          n: 'SP04', q: 'Which sport do you follow most?', req: false,
          o: [['Cricket', 'cricket', '🏏'], ['Football', 'football', '⚽'], ['Basketball', 'basketball', '🏀'], ['Tennis', 'tennis', '🎾'], ['Motorsport', 'motorsport', '🏎️'], ['Something else', 'other', '💡'], ['None', 'none', '⭕']],
          other: 'other',
        },
        { n: 'SP05', q: 'How often do you watch sport online?', req: false, o: FREQ },
        {
          n: 'SP09', q: 'Do you follow athletes, teams or hobby creators online?', req: false,
          o: [['Yes, regularly', 'regular', '🔥'], ['Sometimes', 'sometimes', '👍'], ['Rarely', 'rarely', '🌙'], ['Never', 'never', '🙅']],
        },
      ],
    },
    {
      name: 'Hobbies',
      icon: '🎨',
      qs: [
        {
          n: 'SP06', q: 'Do you have hobbies outside school?', req: false,
          o: [['Yes, regularly', 'regular', '🔥'], ['Yes, now and then', 'sometimes', '👍'], ['Not really', 'no', '🤷‍♂️']],
        },
        {
          n: 'SP07', q: 'Which hobbies do you enjoy most?', req: false, multi: true,
          when: (a) => a.SP06 && a.SP06 !== 'no',
          o: [['Music', 'music', '🎵'], ['Art & drawing', 'art', '🎨'], ['Reading', 'reading', '📚'], ['Gaming', 'gaming', '🎮'], ['Gardening', 'gardening', '🌱'], ['Photo & video', 'photo', '📸'], ['Dance', 'dance', '💃'], ['Cooking', 'cooking', '🍳'], ['Collecting things', 'collecting', '🗃️'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'L17', q: 'Which creative things are you into?', req: false, multi: true,
          o: [['Drawing', 'drawing', '✏️'], ['Painting', 'painting', '🖌️'], ['Photography', 'photography', '📷'], ['Music', 'music', '🎸'], ['Writing', 'writing', '✍️'], ['Crafts', 'crafts', '🧶'], ['Video editing', 'editing', '🎞️'], ['Design', 'design', '🎨'], ['None', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
        {
          n: 'L19', q: 'Which of these do you enjoy in your free time?', req: false, multi: true,
          o: [['Reading', 'reading', '📚'], ['Travel', 'travel', '✈️'], ['Cooking', 'cooking', '🍳'], ['Gardening', 'gardening', '🌿'], ['Animals', 'animals', '🐾'], ['Collecting', 'collecting', '🗃️'], ['Volunteering', 'volunteering', '🤝'], ['Being outdoors', 'outdoors', '🏕️'], ['Something else', 'other', '💡']],
          other: 'other',
        },
      ],
    },
  ],
};

// ══════════════════════════ 11 · Tech & AI ══════════════════════════
const TECH = {
  id: 'minor__tech',
  owner: 'minor',
  name: 'Tech & AI',
  blurb: 'The apps you keep open and the tech you actually find interesting.',
  icon: '🤖',
  theme: 'future',
  sections: [
    {
      name: 'Apps',
      icon: '📲',
      qs: [
        {
          n: 'X08', q: 'Which kinds of app do you use most?', req: true, multi: true,
          o: [['Social media', 'social', '💬'], ['Messaging', 'messaging', '✉️'], ['Gaming', 'gaming', '🎮'], ['Streaming', 'streaming', '📺'], ['Shopping', 'shopping', '🛒'], ['Study & education', 'education', '🎓'], ['Money & payments', 'finance', '💳'], ['AI tools', 'ai', '🤖'], ['Fitness & health', 'fitness', '🏃'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'X01', q: 'Which technology do you use?', req: false, multi: true,
          o: [['Smartphones', 'phones', '📱'], ['Computers', 'computers', '💻'], ['Wearables', 'wearables', '⌚'], ['Smart home devices', 'smarthome', '🏠'], ['Robotics', 'robotics', '🦾'], ['AI', 'ai', '🤖'], ['Virtual reality', 'vr', '🥽'], ['Creative software', 'creative', '🎨'], ['Something else', 'other', '💡']],
          other: 'other',
        },
        {
          n: 'X06', q: 'Which smart devices do you use?', req: false, multi: true,
          o: [['Smartwatch', 'watch', '⌚'], ['Smart speaker', 'speaker', '🔊'], ['Smart TV', 'tv', '📺'], ['Smart home devices', 'home', '🏠'], ['VR headset', 'vr', '🥽'], ['Fitness tracker', 'tracker', '📿'], ['None', 'none', '⭕'], ['Something else', 'other', '💡']],
          other: 'other', exclusive: ['none'],
        },
      ],
    },
    {
      name: 'AI & what’s next',
      icon: '🚀',
      qs: [
        { n: 'TA03', q: 'How often do you use AI tools like ChatGPT or Gemini?', req: false, o: FREQ },
        {
          n: 'X04', q: 'What have you used AI tools for?', req: false, multi: true,
          when: (a) => a.TA03 && a.TA03 !== 'never',
          o: [['Learning something', 'learning', '🧠'], ['Help with writing', 'writing', '✍️'], ['Creative work', 'creative', '🎨'], ['Translation', 'translation', '🌍'], ['Entertainment', 'fun', '🍿'], ['Coding', 'coding', '💻'], ['General questions', 'questions', '❓'], ['Something else', 'other', '💡'], ['Not applicable', 'na', '➖']],
          other: 'other', exclusive: ['na'],
        },
        {
          n: 'TA04', q: 'Which new technology interests you most?', req: false, multi: true,
          o: [['AI', 'ai', '🤖'], ['VR & AR', 'vr', '🥽'], ['Smart devices & wearables', 'wearables', '⌚'], ['Robotics', 'robotics', '🦾'], ['Electric vehicles', 'ev', '🔋'], ['Gaming tech', 'gaming', '🎮'], ['Something else', 'other', '💡'], ['None of it', 'none', '⭕']],
          other: 'other', exclusive: ['none'],
        },
      ],
    },
  ],
};

// ══════════════════════════ 12 · Research participation ══════════════════════════
const RESEARCH = {
  id: 'minor__research',
  owner: 'minor',
  name: 'Taking part',
  blurb: 'What kind of research you are up for, and when it suits you.',
  icon: '🔬',
  theme: 'lab',
  sections: [
    {
      name: 'What you would do',
      icon: '🧪',
      qs: [
        {
          n: 'R01', q: 'Which kinds of research would you be comfortable with?', req: true, multi: true,
          o: [['Online surveys', 'surveys', '📝'], ['Online interviews', 'interviews', '🎙️'], ['Group discussions', 'groups', '👥'], ['Product testing', 'products', '📦'], ['Diary studies', 'diary', '📔'], ['Usability testing', 'usability', '🖱️'], ['None at the moment', 'none', '⭕']],
          exclusive: ['none'],
        },
        {
          n: 'R02', q: 'How long should a survey be, ideally?', req: true,
          o: [['1–5 minutes', '1-5', '⚡'], ['6–10 minutes', '6-10', '🕐'], ['11–15 minutes', '11-15', '🕑'], ['16–20 minutes', '16-20', '🕓'], ['More than 20 minutes', '20+', '🕘']],
        },
        { n: 'R07', q: 'Would you join an online group discussion with other teens?', req: false, o: YES_NO_MAYBE },
        { n: 'R08', q: 'Would you test a digital product — an app or a website?', req: false, o: YES_NO_MAYBE },
        {
          n: 'R09', q: 'Would you test a physical product sent to your home?', req: false,
          o: [['Yes', 'yes', '✅'], ['No', 'no', '🚫'], ['Depends what it is', 'depends', '🤔']],
        },
        {
          n: 'R10', q: 'Would you take part in a study that records audio?', help: 'Your parent or guardian is asked separately every time.', req: false,
          o: [['Yes', 'yes', '🎙️'], ['No', 'no', '🚫'], ['Depends on the study', 'depends', '🤔']],
        },
        {
          n: 'R11', q: 'Would you take part in a study that records video?', help: 'Your parent or guardian is asked separately every time.', req: false,
          o: [['Yes', 'yes', '🎬'], ['No', 'no', '🚫'], ['Depends on the study', 'depends', '🤔']],
        },
        { n: 'R15', q: 'Are you happy to answer a few screening questions before a study?', req: false, o: [['Yes', 'yes', '✅'], ['No', 'no', '🚫'], ['Depends on the study', 'depends', '🤔']] },
      ],
    },
    {
      name: 'When it suits you',
      icon: '🗓️',
      qs: [
        {
          n: 'R03', q: 'How often would you like invitations?', req: true,
          o: [['Once a week', 'weekly', '📬'], ['2–3 times a month', 'biweekly', '📆'], ['Once a month', 'monthly', '📅'], ['Only topics I’ve picked', 'selected', '🎯'], ['None for now', 'none', '🔕']],
        },
        {
          n: 'R04', q: 'Which days usually work?', req: false, multi: true,
          when: (a) => a.R03 !== 'none',
          o: [['Weekdays', 'weekdays', '🗓️'], ['Weekends', 'weekends', '🎉'], ['School holidays', 'holidays', '🏖️'], ['It varies', 'varies', '🔀'], ['Prefer not to say', 'na', '🤐']],
          exclusive: ['varies', 'na'],
        },
        {
          n: 'R05', q: 'What time of day works best?', req: false, multi: true,
          when: (a) => a.R03 !== 'none',
          o: [['Morning', 'morning', '🌅'], ['Afternoon', 'afternoon', '☀️'], ['Evening', 'evening', '🌆'], ['Weekends', 'weekends', '🎉'], ['School holidays', 'holidays', '🏖️'], ['It varies', 'varies', '🔀']],
          exclusive: ['varies'],
        },
        { n: 'R06', q: 'Which language would you want an interview in?', kind: 'language', req: false, when: (a) => Array.isArray(a.R01) && (a.R01.includes('interviews') || a.R01.includes('groups')) },
        { n: 'R12', q: 'Would you like invitations for brand-new research topics?', req: false, o: [['Yes', 'yes', '✅'], ['No', 'no', '🚫']] },
      ],
    },
  ],
};

// ══════════════════════════ 13 · Topics & updates ══════════════════════════
const TOPICS = {
  id: 'minor__topics',
  owner: 'minor',
  name: 'Topics & updates',
  blurb: 'Pick your subjects. Two questions and you are done.',
  icon: '🧭',
  theme: 'atlas',
  sections: [
    {
      name: 'Your topics',
      icon: '🎯',
      qs: [
        {
          n: 'A19', q: 'Which topics would you like to be invited to?', req: true, multi: true,
          o: [['Technology', 'tech', '📱'], ['Entertainment', 'entertainment', '🍿'], ['Food & drink', 'food', '🍕'], ['Clothes & fashion', 'fashion', '👕'], ['Education', 'education', '🎓'], ['Gaming', 'gaming', '🎮'], ['Travel', 'travel', '✈️'], ['The environment', 'environment', '🌍'], ['Sport', 'sport', '⚽'], ['Household products', 'household', '🧽'], ['No preference — send me anything', 'any', '🤷']],
          exclusive: ['any'],
        },
        {
          n: 'A20', q: 'How often should we ask you to refresh your profile?', req: true,
          o: [['Every 3 months', '3m', '🗓️'], ['Every 6 months', '6m', '📆'], ['Once a year', '12m', '📅'], ['Only when you prompt me', 'prompted', '🔔']],
        },
        {
          // The one open question in the teen set. Everything else is closed,
          // because closed answers are what a study can actually be matched on
          // — but a teenager will sometimes name a subject no list contains,
          // and that is worth more than another tick box.
          n: 'A21',
          q: 'Is there anything you wish we would ask teenagers about?',
          help: 'Totally optional, and there is no wrong answer. One line is plenty.',
          kind: 'textarea',
          icon: '💭',
          req: false,
          maxLength: 400,
          ph: 'Something nobody seems to ask about…',
        },
      ],
    },
  ],
};

export const MINOR_PROFILES = [
  BASIC, EDUCATION, HOUSEHOLD, DEVICES, SOCIAL, GAMING,
  SHOPPING, FOOD, FASHION, SPORTS, TECH, RESEARCH, TOPICS,
];
export default MINOR_PROFILES;
