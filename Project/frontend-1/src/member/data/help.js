import { engageOn } from './engage.js';

// Help centre content: categories, step-by-step guides and FAQs for every member-area feature.
// `for` limits an entry to some member types ('consumer' | 'pro' | 'teen'); no `for` = everyone.
// `go` is a member-area link the guide or answer can open ("Take me there").
// Keep answers true to what the member area does today. Numbers that come from the API (payout
// milestone, quality scale) are described, not hard-coded.

export const HELP_CATEGORIES = [
  { id: 'start', icon: 'sparkles', color: '#1f5bff', title: 'Getting started', blurb: 'Your first few minutes on Turn2Opinion.' },
  { id: 'profiles', icon: 'map', color: '#7b5cff', title: 'Profiles', blurb: 'About-you profiles, your kingdom and editing answers.' },
  { id: 'surveys', icon: 'clipboard', color: '#0b8bd6', title: 'Surveys', blurb: 'Invitations, unlocking, screen-outs and resuming.' },
  { id: 'rewards', icon: 'coin', color: '#d49100', title: 'Points & rewards', blurb: 'Earning points, milestones and redeeming.' },
  { id: 'quality', icon: 'shield', color: '#0f9f6e', title: 'Quality score', blurb: 'What it is, what moves it and the tiers.' },
  { id: 'referrals', icon: 'users', color: '#e23d8f', title: 'Referrals', blurb: 'Inviting friends and referral milestones.', for: ['consumer', 'pro'] },
  { id: 'referrals', icon: 'users', color: '#e23d8f', title: 'Inviting friends', blurb: 'Sharing the Teen panel with friends.', for: ['teen'] },
  { id: 'teen', icon: 'heart', color: '#f97316', title: 'Teen & guardian', blurb: 'Guardian consent, gift cards and what your guardian sees.', for: ['teen'] },
  { id: 'pro', icon: 'briefcase', color: '#0f766e', title: 'Professional studies', blurb: 'Business studies, expertise and certificates.', for: ['pro'] },
  { id: 'account', icon: 'key', color: '#5b5bf0', title: 'Account & security', blurb: 'Photo, details, email, password and payment methods.' },
  { id: 'settings', icon: 'gear', color: '#4f6b8a', title: 'Settings & app', blurb: 'Theme, sound, language, notifications and the phone app.' },
  { id: 'privacy', icon: 'lock', color: '#334155', title: 'Privacy & your data', blurb: 'Your agreement, your data and taking a break.' },
  { id: 'trouble', icon: 'refresh', color: '#dc2626', title: 'Fixing problems', blurb: 'When something doesn’t load or look right.' }
];

export const HELP_GUIDES = [
  {
    id: 'about-you',
    cat: 'profiles',
    icon: 'map',
    title: 'Finish your About-you profiles',
    time: '5 min',
    go: '/member/profiles/',
    steps: [
      ['Open Profiles', 'Choose Profiles in the menu. Your About-you profiles are at the top: Basic first, then Educational.'],
      ['Start the open profile', 'Only the next unfinished profile is open. Tap it to start. One question is shown at a time.'],
      ['Answer and continue', 'Pick an answer or type it, then press Continue or Enter. Many single-choice questions move on by themselves.'],
      ['Use the search lists', 'Long lists such as country, state, city or job open as a searchable dropdown. Start typing to find your answer.'],
      ['Watch your kingdom grow', 'Each finished profile raises a building and adds +50 points and +1 quality score.'],
      ['Surveys unlock', 'When every About-you profile is complete, your surveys open, one at a time.']
    ]
  },
  {
    id: 'first-survey',
    cat: 'surveys',
    icon: 'clipboard',
    title: 'Take your first survey',
    time: '3 min',
    go: '/member/surveys/',
    steps: [
      ['Check your surveys', 'Open Surveys. Surveys matched to you are listed with their length and points.'],
      ['Start the open one', 'Surveys open one at a time. Start the first open survey, or Continue one you began.'],
      ['Answer carefully', 'Read each question fully. Surveys include check questions, and careful answers protect your quality score.'],
      ['Points are added', 'When you finish, your points appear on Rewards and in Activity.'],
      ['Next one opens', 'Finishing a survey opens the next one in the list.']
    ]
  },
  {
    id: 'screened-out',
    cat: 'surveys',
    icon: 'filter',
    title: 'What to do after a screen-out',
    time: '1 min',
    go: '/member/activity/',
    steps: [
      ['It’s normal', 'Each study needs a specific group of people. Being screened out is common and is not a judgement of you.'],
      ['See why', 'Open Activity and choose “Why?” next to a screened-out survey to see the usual reasons.'],
      ['Keep profiles fresh', 'Up-to-date profiles bring fewer screen-outs. Update a profile when your life changes.'],
      ['Try the next one', 'Your next survey invitation is matched again from your profile.']
    ]
  },
  {
    id: 'redeem',
    cat: 'rewards',
    icon: 'wallet',
    title: 'Redeem your points',
    time: '2 min',
    go: '/member/rewards/',
    for: ['consumer', 'pro'],
    steps: [
      ['Open Rewards', 'Rewards shows your balance, what it is worth and how far you are from the payout milestone.'],
      ['Reach the milestone', 'Redeeming opens when your points reach the payout milestone shown on the page.'],
      ['Add a payment method', 'Choose Manage payment methods and add how you want to be paid.'],
      ['Pick a reward', 'PayPal, bank or wire transfer, shopping and grocery vouchers and digital gift cards, plus UPI in India.'],
      ['Track it', 'Your redemption shows in Rewards and Activity. You also get an email.']
    ]
  },
  {
    id: 'teen-gift',
    cat: 'rewards',
    icon: 'gift',
    title: 'Swap points for a gift card',
    time: '2 min',
    go: '/member/rewards/',
    for: ['teen'],
    feat: 'giftcards',
    steps: [
      ['Open Rewards', 'Your points vault shows your points and the badges you are working towards.'],
      ['Pick a gift card', 'Teens get gift cards, not cash. Choose a card when you have enough points.'],
      ['Your guardian approves', 'Your parent or guardian gets an email to approve each gift card.'],
      ['It arrives by email', 'Once approved, the gift card code arrives by email.']
    ]
  },
  {
    id: 'quality-up',
    cat: 'quality',
    icon: 'shield',
    title: 'Raise your quality score',
    time: '2 min',
    go: '/member/quality-score/',
    steps: [
      ['See your score', 'Open Quality score to see your number, your tier and what builds it.'],
      ['Finish your profiles', 'Every completed About-you profile and survey adds to your score.'],
      ['Answer with care', 'Speeding, straight-lining (the same answer every time) or answers that contradict each other lower it.'],
      ['Practise check questions', 'Try the practice check question on the Quality page. Nothing is saved or scored.'],
      ['Reach a higher tier', 'A higher score can match you with more studies.']
    ]
  },
  {
    id: 'invite',
    cat: 'referrals',
    icon: 'send',
    title: 'Invite friends and earn',
    time: '2 min',
    go: '/member/referrals/',
    for: ['consumer', 'pro'],
    steps: [
      ['Open Referrals', 'Your personal referral link is at the top.'],
      ['Share your way', 'Copy the link, share it on WhatsApp or Instagram, show the QR code, or invite by email.'],
      ['Follow their progress', 'Friends appear in your referral history as Invited, Joined and Verified.'],
      ['Collect bonuses', 'Milestones at 1, 3, 5 and 10 friends follow the current programme rules.']
    ]
  },
  {
    id: 'teen-invite',
    cat: 'referrals',
    icon: 'send',
    title: 'Tell friends about the Teen panel',
    time: '1 min',
    go: '/member/referrals/',
    for: ['teen'],
    steps: [
      ['Open Invite friends', 'Choose Referrals in the menu.'],
      ['Share the Teen page', 'Share the Teen panel page with friends aged 13 to 17.'],
      ['Guardian says yes', 'Each friend also needs a parent or guardian to say yes before they can take part.'],
      ['No referral rewards', 'Teen accounts don’t earn referral rewards. Sharing is just to help friends join.']
    ]
  },
  {
    id: 'guardian',
    cat: 'teen',
    icon: 'heart',
    title: 'Guardian consent, step by step',
    time: '2 min',
    go: '/member/profile/',
    for: ['teen'],
    steps: [
      ['Your guardian gets an email', 'After you sign up, your parent or guardian gets an email asking them to say yes or no.'],
      ['They complete the form', 'If they say yes, they fill in a short guardian form and agree to the Teen terms.'],
      ['Your account opens', 'You get an email as soon as your guardian has finished. Then you can take surveys.'],
      ['See the record', 'My account shows who gave consent, when, and the consent version.']
    ]
  },
  {
    id: 'pro-match',
    cat: 'pro',
    icon: 'briefcase',
    title: 'Get matched to business studies',
    time: '4 min',
    go: '/member/profiles/',
    for: ['pro'],
    steps: [
      ['Complete About you', 'Finish Basic and Educational first so your studies unlock.'],
      ['Fill in your work details', 'Industry, role, seniority and organisation size decide which business studies reach you.'],
      ['Check Your expertise', 'The dashboard shows the answers studies are matched on. Anything missing links to the right profile.']
    ]
  },
  {
    id: 'security',
    cat: 'account',
    icon: 'key',
    title: 'Change your password or email',
    time: '2 min',
    go: '/member/settings/#set-account',
    steps: [
      ['Open Settings', 'Go to Settings, then Account & security.'],
      ['New password', 'Enter your current password, then a new one with 8+ characters, upper and lower case, a number and a symbol.'],
      ['New email', 'Enter your new email and choose Request email change.'],
      ['Confirm both emails', 'A confirmation link goes to your current email first, then you verify the new address.']
    ]
  },
  {
    id: 'make-it-yours',
    cat: 'settings',
    icon: 'layers',
    title: 'Make it yours: theme, colour, sound and language',
    time: '1 min',
    go: '/member/settings/#set-appearance',
    steps: [
      ['Pick a theme', 'Light, Dark, Night (warm and dim) or Auto, which follows your device.'],
      ['Choose a colour', 'Pick a palette or your own accent colour. We adjust it slightly if text would be hard to read.'],
      ['Sound on or off', 'Interface sounds play for survey completion, points and important notifications only.'],
      ['Language', 'Change the language of the whole site and your dashboard.']
    ]
  },
  {
    id: 'your-data',
    cat: 'privacy',
    icon: 'lock',
    title: 'See and download your data',
    time: '1 min',
    go: '/member/settings/#set-privacy',
    steps: [
      ['Open Settings', 'Go to Settings, then Privacy.'],
      ['Review your agreement', 'Review my agreement shows the panel agreement and the choices you accepted.'],
      ['Open the Data centre', 'See who can see what, and download a copy of your account data.'],
      ['Need a break?', 'Pausing and deleting your account are in My account → Account & privacy, confirmed with your password.']
    ]
  },
  {
    id: 'jump',
    cat: 'start',
    icon: 'search',
    title: 'Find anything fast with Jump to',
    time: '30 sec',
    steps: [
      ['Open Jump to', 'Click the search bar at the top, or press Ctrl K (⌘ K on a Mac).'],
      ['Type a few letters', 'Try “rewards”, “dark”, “photo” or “invite”.'],
      ['Press Enter', 'Use the arrow keys to choose, then Enter to open the page or run the action.']
    ]
  },
  {
    id: 'install',
    cat: 'settings',
    icon: 'phone',
    title: 'Add Turn2Opinion to your phone',
    time: '1 min',
    steps: [
      ['Open the site on your phone', 'Sign in at turn2opinion.com in Chrome (Android) or Safari (iPhone).'],
      ['Android', 'Tap the ⋮ menu, then Install app or Add to Home screen.'],
      ['iPhone', 'Tap Share, then Add to Home Screen.'],
      ['Use it like an app', 'It opens full screen. The bar at the bottom has Dashboard, Profiles, Surveys, Rewards, Help and More.']
    ]
  },
  {
    id: 'query',
    cat: 'trouble',
    icon: 'chat',
    title: 'Raise a query and follow it',
    time: '2 min',
    anchor: 'help-ask',
    steps: [
      ['Search first', 'Type your question in the search box at the top of Help. Most answers are already here.'],
      ['Choose a topic', 'Under “Still need help?” pick the topic, or choose Other for anything else.'],
      ['Describe it', 'Add a short subject and the details: what you did, what you expected and what happened.'],
      ['Get a ticket number', 'You get a ticket number on screen and by email.'],
      ['Follow the reply', 'Replies arrive by email and show under My queries on this page.']
    ]
  }
];

export const HELP_FAQS = [
  // getting started
  { cat: 'start', q: 'What is Turn2Opinion?', a: 'Turn2Opinion is an online research panel. You share your opinions in profiles and surveys, and you earn points for it. Brands and researchers use the answers, combined with others, to improve products and services.' },
  { cat: 'start', q: 'Which panel am I in?', a: 'Your panel shows under your name in the menu: Consumer, Professional or Teen. It decides which profiles, surveys and rewards you see.' },
  { cat: 'start', q: 'What should I do first?', a: 'Finish your About-you profiles (Basic, then Educational). They unlock your surveys and add points and quality score straight away.', go: '/member/profiles/' },
  { cat: 'start', q: 'What is on my dashboard?', a: 'Your dashboard brings together your next profile or survey, points, quality score, recent activity and milestones. Each card links to its full page.', go: '/member/dashboard/' },
  { cat: 'start', q: 'How do I move around on a phone?', a: 'Use the bar at the bottom for Dashboard, Profiles, Surveys, Rewards and Help. Tap More for every other page, the theme, sound and language.' },
  { cat: 'start', q: 'What are notifications?', a: 'The bell at the top shows new surveys, points and account messages. Open it to read them, or choose “Mark all as read”.' },

  // profiles
  { cat: 'profiles', q: 'What are About-you profiles?', a: 'Basic and Educational are your About-you profiles. They describe you so we can match you to the right surveys. Your surveys stay locked until both are complete.' },
  { cat: 'profiles', q: 'Why is a profile locked?', a: 'Profiles open one at a time. Finish the open profile and the next one opens. The lock shows which profile to finish first.' },
  { cat: 'profiles', q: 'Are my answers saved if I stop halfway?', a: 'Yes. Answers are saved at every step. Come back any time and continue where you left off.' },
  { cat: 'profiles', q: 'How do I change an answer?', a: 'Finished profiles always stay open. Open the profile again, go to the question and change it. Your name and date of birth are locked for security.' },
  { cat: 'profiles', q: 'Why can’t I see every country, state or city at once?', a: 'Long lists open as a searchable dropdown. Start typing and the list narrows down. Questions that allow several answers let you pick each one, and each pick shows as a chip you can remove.' },
  { cat: 'profiles', q: 'The form says “Please check this answer”. What do I do?', a: 'That is a gentle check, for example a date or number that looks unusual. If it is correct, choose “Yes, it’s correct — continue”. Otherwise fix it.' },
  { cat: 'profiles', q: 'What is the Opinion Kingdom?', a: 'Your kingdom on the Profiles page grows as you complete profiles and surveys. Each one raises a building and earns +50 points and +1 quality score.' },
  { cat: 'profiles', q: 'How often should I update my profiles?', a: 'Whenever something changes, such as a new job, a move or a new car.' },
  { cat: 'profiles', q: 'How do I give my business details?', a: 'Your industry, role, seniority and organisation size are asked in your profiles. They decide which business studies you are invited to.', for: ['pro'] },

  // surveys
  { cat: 'surveys', q: 'Why are my surveys locked?', a: 'Surveys unlock when every About-you profile is complete. After that they open one at a time: finish one and the next opens.', go: '/member/profiles/' },
  { cat: 'surveys', q: 'How are surveys chosen for me?', a: 'Surveys are matched on your profile answers. Complete, up-to-date profiles bring more invitations and fewer screen-outs.' },
  { cat: 'surveys', q: 'I see no surveys. Is something wrong?', a: 'No. New surveys appear when one matches your profile, and we notify you. Completing more profiles brings more invitations.' },
  { cat: 'surveys', q: 'Why was I screened out?', a: 'Each study needs a specific group of people. The group may be full, a different group was needed, a check question was missed, or the study closed. It is common and is not a judgement of you.', go: '/member/activity/' },
  { cat: 'surveys', q: 'Can I finish a survey later?', a: 'Yes. A survey you started shows Continue. Some studies close when they have enough answers, so finish soon.' },
  { cat: 'surveys', q: 'What are check questions?', a: 'Short questions that make sure people are reading, such as “Choose ‘Agree’ for this one”. Answering them carefully protects your quality score.' },
  { cat: 'surveys', q: 'How do I see the surveys I have taken?', a: 'Activity lists every survey with its result and points, month by month. You can filter by result, period and topic.', go: '/member/activity/' },

  // rewards
  { cat: 'rewards', q: 'How do I earn points?', a: 'You earn points for every completed profile and survey. Profiles add +50 points each. Each survey shows its points before you start.' },
  { cat: 'rewards', q: 'What is the payout milestone?', a: 'The number of points you need before you can redeem. Rewards shows the milestone and how many points you have left.', for: ['consumer', 'pro'], go: '/member/rewards/' },
  { cat: 'rewards', q: 'Which rewards can I choose?', a: 'PayPal, bank transfer, wire transfer, shopping vouchers, grocery vouchers and digital gift cards. UPI is also available for members in India.', for: ['consumer', 'pro'] },
  { cat: 'rewards', q: 'How do I add or change a payment method?', a: 'Open Rewards or My account and choose Manage payment methods.', for: ['consumer', 'pro'] },
  { cat: 'rewards', q: 'Can I donate my points?', a: 'Yes. Donate to a cause turns points into a donation, and we pass on the full value.', for: ['consumer', 'pro'], feat: 'donate' },
  { cat: 'rewards', q: 'What can Teens get for their points?', a: 'Teens get gift cards, not cash. Your parent or guardian approves each gift card, and the code arrives by email.', for: ['teen'], feat: 'giftcards', go: '/member/rewards/' },
  { cat: 'rewards', q: 'What are my points for?', a: 'Points and badges show your progress. Every profile and survey adds to your points vault and moves you towards a new badge.', for: ['teen'], go: '/member/rewards/' },
  { cat: 'rewards', q: 'What are gems and badges?', a: 'Gems and badges mark your milestones, such as your first survey, 10 surveys or a finished profile. Locked ones show what to do next.' },
  { cat: 'rewards', q: 'My points haven’t arrived. What now?', a: 'Points usually appear as soon as a survey is confirmed complete. Some studies confirm later. If points are still missing after 7 days, raise a query and include the survey name and date.' },

  // quality
  { cat: 'quality', q: 'What is the quality score?', a: 'A number that shows how careful and complete your answers are. The header and the Quality page show your score, the scale and your tier.', go: '/member/quality-score/' },
  { cat: 'quality', q: 'What are the tiers?', a: 'Needs attention, Fair, Good, Very good and Excellent. A higher tier can match you with more studies.' },
  { cat: 'quality', q: 'What raises or lowers my score?', a: 'Completed About-you profiles and surveys raise it (+1 per profile). Speeding, straight-lining or answers that contradict each other lower it.' },
  { cat: 'quality', q: 'My score dropped. Can I fix it?', a: 'Yes. Careful answers raise it again. Finish any open profiles and take your time on each survey.' },

  // referrals
  { cat: 'referrals', q: 'How do referrals work?', a: 'Share your personal link. When a friend joins with it, they appear in your referral history and count towards milestones at 1, 3, 5 and 10 friends.', for: ['consumer', 'pro'], go: '/member/referrals/' },
  { cat: 'referrals', q: 'When do I get a referral reward?', a: 'Referral rewards follow the current Turn2Opinion programme rules, shown on the Referrals page.', for: ['consumer', 'pro'] },
  { cat: 'referrals', q: 'My friend joined but isn’t listed.', a: 'They need to sign up with your link. If they used it and still don’t appear after a day, raise a query with their email.', for: ['consumer', 'pro'] },
  { cat: 'referrals', q: 'Can I invite my friends?', a: 'Yes, you can share the Teen panel page. Friends aged 13 to 17 also need a parent or guardian to say yes. Teen accounts don’t earn referral rewards.', for: ['teen'] },

  // teen
  { cat: 'teen', q: 'Why does my guardian need to agree?', a: 'Members under 18 need a parent or guardian’s consent before taking part. It keeps you safe and is required by law.', for: ['teen'] },
  { cat: 'teen', q: 'My guardian didn’t get the email.', a: 'Ask them to check their spam folder. The link is valid for a limited time. If it has expired, we send a renewed link, or raise a query and we will help.', for: ['teen'] },
  { cat: 'teen', q: 'What can my guardian see?', a: 'A short summary with totals only, such as surveys completed and points. They never see your answers.', for: ['teen'], feat: 'summary' },
  { cat: 'teen', q: 'Where is my consent record?', a: 'My account shows who gave consent, when, and the consent version.', for: ['teen'], go: '/member/profile/' },
  { cat: 'teen', q: 'How do I get surveys as a Teen?', a: 'Teen accounts receive survey invitations by email and on the dashboard only.', for: ['teen'] },

  // pro
  { cat: 'pro', q: 'What are business studies?', a: 'Research for companies about your field: products you use at work, buying decisions and industry trends. Some are paid interviews or focus groups.', for: ['pro'] },
  { cat: 'pro', q: 'How do I qualify for more studies?', a: 'Complete your profiles, especially work details. The dashboard shows your qualification status and what is missing.', for: ['pro'] },
  { cat: 'pro', q: 'How do certificates work?', a: 'Finish studies in your field to earn a certificate. Add it to LinkedIn in one click.', for: ['pro'], feat: 'certs' },

  // account
  { cat: 'account', q: 'How do I change my photo?', a: 'Open My account and drag in a photo or browse for one. JPG, PNG or WebP up to 5 MB. Square photos look best.', go: '/member/profile/' },
  { cat: 'account', q: 'Why can’t I change my name or date of birth?', a: 'They are locked for security because they confirm who you are. If one is wrong, raise a query.' },
  { cat: 'account', q: 'How do I change my email?', a: 'Settings → Account & security → Request email change. For your security, a confirmation link goes to your current email first.', go: '/member/settings/#set-account' },
  { cat: 'account', q: 'How do I change my password?', a: 'Settings → Account & security. Use 8+ characters with upper and lower case, a number and a symbol.', go: '/member/settings/#set-account' },
  { cat: 'account', q: 'I forgot my password.', a: 'On the login page choose Forgot password. We email you a link to set a new one.' },
  { cat: 'account', q: 'How do I update my address?', a: 'Your location comes from sign-up. Update it in your Basic profile.', go: '/member/profiles/' },

  // settings
  { cat: 'settings', q: 'How do I switch to dark mode?', a: 'Settings → Appearance, or the theme switch in the header. Choose Light, Dark, Night or Auto. You can also press Ctrl K and type “dark”.', go: '/member/settings/#set-appearance' },
  { cat: 'settings', q: 'How do I turn sounds on or off?', a: 'Settings → Sound, or the sound switch in the menu. Sounds play only for completion, points and important notifications.', go: '/member/settings/#set-sound' },
  { cat: 'settings', q: 'How do I change the language?', a: 'Settings → Language. It changes the whole site and your dashboard.', go: '/member/settings/#set-language' },
  { cat: 'settings', q: 'How do I choose how you contact me?', a: 'Settings → Notifications. Pick email, SMS, phone call, WhatsApp or dashboard notifications.', for: ['consumer', 'pro'], go: '/member/settings/#set-notifications' },
  { cat: 'settings', q: 'Is there a mobile app?', a: 'Turn2Opinion works as an app on your phone. Add it to your home screen from your browser and it opens full screen, with Help in the bottom bar.' },
  { cat: 'settings', q: 'Can I reduce animations?', a: 'Yes. Settings → Appearance → Reduce motion. We also follow your device’s reduced-motion setting automatically.' },

  // privacy
  { cat: 'privacy', q: 'Where can I read my agreement?', a: 'Settings → Privacy → Review my agreement shows the panel agreement and the choices you accepted.', go: '/member/settings/#set-privacy' },
  { cat: 'privacy', q: 'Who can see my answers?', a: 'Your answers are combined with other members’ answers for research. Your contact details are not shared with clients. The Privacy Policy explains it in full.' },
  { cat: 'privacy', q: 'Can I download my data?', a: 'Yes. The Data centre in Settings shows who can see what and lets you download a copy of your account data.' },
  { cat: 'privacy', q: 'How do I pause or delete my account?', a: 'Pausing and deleting are in My account → Account & privacy, so you can confirm with your password.' },

  // trouble
  { cat: 'trouble', q: 'A page won’t load.', a: 'Check your connection and choose Try again. If you are offline we show what we have. Refreshing the page or signing in again fixes most problems.' },
  { cat: 'trouble', q: 'I was signed out.', a: 'For your security we sign you out after a while. Sign in again and you return to the page you were on.' },
  { cat: 'trouble', q: 'A survey link didn’t work.', a: 'The survey may have closed or reached its quota. Check Activity for its status. If it still looks wrong, raise a query with the survey name.' },
  { cat: 'trouble', q: 'I didn’t get an email from you.', a: 'Check your spam or promotions folder and add us to your contacts. Make sure your email is right in My account.' },
  { cat: 'trouble', q: 'How do I contact support?', a: 'Under “Still need help?” on this page, pick a topic or choose Other, describe the problem and send it. You get a ticket number and replies by email.', anchor: 'help-ask' }
];

/** Entries that apply to this member type (and whose feature is switched on, see data/engage.js). */
export const forType = (list, type) => list.filter((x) => (!x.for || x.for.includes(type)) && (!x.feat || engageOn(x.feat)));

/** Topics offered in the "raise a query" form. "other" is always last. */
export const QUERY_TOPICS = (type) => [
  ...forType(HELP_CATEGORIES, type)
    .filter((c) => c.id !== 'start' && c.id !== 'trouble')
    .map((c) => ({ id: c.id, label: c.title, icon: c.icon, color: c.color })),
  { id: 'technical', label: 'Something isn’t working', icon: 'refresh', color: '#dc2626' },
  { id: 'other', label: 'Other', icon: 'help', color: '#64748b' }
];

/** Which help category a member page belongs to (header Help button opens it). */
export const PAGE_TOPIC = {
  dashboard: 'start',
  profiles: 'profiles',
  surveys: 'surveys',
  rewards: 'rewards',
  'quality-score': 'quality',
  referrals: 'referrals',
  activity: 'surveys',
  profile: 'account',
  settings: 'settings'
};
