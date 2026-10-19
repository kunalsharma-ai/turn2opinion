// Paid survey showcase ("Browse a few of our paid surveys").
// reward = typical reward per completed survey in US$; mins = typical length.
// `source: 'site'` rows are the surveys and rewards published on the existing Turn2Opinion website.
// Every other row was added in October 2026 as a SUGGESTED example – the business must confirm each reward and
// length before go-live (or change them here; every page and the live-help assistant read this file).
export const SURVEY_NOTE = 'Typical reward per completed survey, shown in US$. Actual rewards vary with survey length and your profile.';

export const SURVEYS = {
  consumer: [
    { id: 'shopping', cat: 'Shopping', title: 'Shopping Habits', desc: 'Share your shopping preferences and experiences to help brands improve their products and services.', reward: 4, mins: 10, icon: 'bag', c: '#FF4F7B', source: 'site' },
    { id: 'tech', cat: 'Technology', title: 'Technology & Apps', desc: 'Tell us what you think about the latest apps, devices, and technology products.', reward: 6, mins: 15, icon: 'phone', c: '#1F5BFF', source: 'site' },
    { id: 'food', cat: 'Lifestyle', title: 'Food & Lifestyle', desc: 'Share your opinions about food, restaurants, brands, and everyday lifestyle choices.', reward: 5, mins: 12, icon: 'cup', c: '#F08C00', source: 'site' },
    { id: 'travel', cat: 'Travel', title: 'Travel Experience', desc: 'Tell us about your travel preferences and experiences to help shape future services.', reward: 7, mins: 18, icon: 'plane', c: '#0EA5E9', source: 'site' },
    { id: 'entertainment', cat: 'Entertainment', title: 'Entertainment', desc: 'Share your views on movies, shows, games, and the entertainment you enjoy.', reward: 4, mins: 10, icon: 'play', c: '#8B5CF6', source: 'site' },
    { id: 'opinion', cat: 'Consumer', title: 'Consumer Opinion', desc: 'Give your honest opinion about products and services and earn rewards for your participation.', reward: 6, mins: 14, icon: 'star', c: '#E8436D', source: 'site' },
    { id: 'gaming', cat: 'Gaming', title: 'Gaming & Esports', desc: 'Console, PC or mobile – tell game studios what keeps you playing and what makes you quit.', reward: 5, mins: 12, icon: 'game', c: '#7B5CFF' },
    { id: 'health', cat: 'Wellness', title: 'Health & Wellness', desc: 'Share how you look after yourself – fitness, sleep, nutrition and the products you trust.', reward: 6, mins: 15, icon: 'pulse', c: '#0E9F6E' },
    { id: 'money', cat: 'Finance', title: 'Personal Finance', desc: 'Banking apps, cards, savings and payments – tell providers what works for you.', reward: 6, mins: 14, icon: 'wallet', c: '#12A594' },
    { id: 'auto', cat: 'Automotive', title: 'Car Owners', desc: 'Buying, servicing or dreaming about your next car? Help shape the cars and services of tomorrow.', reward: 7, mins: 16, icon: 'car', c: '#2F7BFF' },
    { id: 'home', cat: 'Home', title: 'Home & Living', desc: 'Furniture, appliances, cleaning and everyday household brands you live with.', reward: 5, mins: 12, icon: 'home', c: '#C2410C' },
    { id: 'family', cat: 'Family', title: 'Parenting & Family', desc: 'Share what matters when choosing products and services for your family.', reward: 5, mins: 12, icon: 'heart', c: '#DB2777' },
    { id: 'beauty', cat: 'Beauty', title: 'Beauty & Personal Care', desc: 'Skincare, haircare and grooming – tell brands what you love and what you’d change.', reward: 4, mins: 10, icon: 'sparkles', c: '#E11D74' },
    { id: 'pets', cat: 'Pets', title: 'Pet Parents', desc: 'Food, toys and care for your pets – share what you buy and why.', reward: 4, mins: 8, icon: 'paw', c: '#B45309' },
    { id: 'sport', cat: 'Sports', title: 'Sports & Fitness', desc: 'The sports you follow, the gear you buy and the way you stay active.', reward: 5, mins: 12, icon: 'ball', c: '#16A34A' },
    { id: 'telecom', cat: 'Telecom', title: 'Mobile & Internet Plans', desc: 'Your network, data plan and broadband – what keeps you loyal and what makes you switch.', reward: 5, mins: 10, icon: 'signal', c: '#0284C7' },
    { id: 'green', cat: 'Sustainability', title: 'Eco & Sustainability', desc: 'Recycling, green products and how sustainability shapes what you buy.', reward: 5, mins: 12, icon: 'leaf', c: '#15803D' },
    { id: 'media', cat: 'Media', title: 'News & Social Media', desc: 'Where you get your news, which platforms you use and the ads you notice.', reward: 4, mins: 10, icon: 'megaphone', c: '#9333EA' }
  ],
  professional: [
    { id: 'itdm', cat: 'IT', title: 'IT Decision Makers', desc: 'Cloud, cybersecurity, SaaS and hardware – share how your organisation chooses technology.', reward: 15, mins: 20, icon: 'chip', c: '#1F5BFF' },
    { id: 'hcp', cat: 'Healthcare', title: 'Healthcare Professionals', desc: 'Doctors, nurses and pharmacists: clinical practice, medicines, devices and patient care.', reward: 20, mins: 25, icon: 'pulse', c: '#0E9F6E' },
    { id: 'pharma', cat: 'Life sciences', title: 'Pharma & Life Sciences', desc: 'Research, regulatory and commercial roles in pharma, biotech and diagnostics.', reward: 16, mins: 20, icon: 'flask', c: '#7C3AED' },
    { id: 'fin', cat: 'Finance', title: 'Finance & Banking', desc: 'Business banking, payments, insurance and fintech decisions at work.', reward: 12, mins: 18, icon: 'bank', c: '#0F766E' },
    { id: 'legal', cat: 'Legal', title: 'Legal & Compliance', desc: 'Lawyers and compliance teams: regulation, risk and the tools you rely on.', reward: 14, mins: 18, icon: 'scale', c: '#334155' },
    { id: 'dev', cat: 'Software', title: 'Software Developers', desc: 'Languages, frameworks, dev tools and AI assistants – tell vendors what you really use.', reward: 13, mins: 18, icon: 'database', c: '#2563EB' },
    { id: 'smb', cat: 'Business owners', title: 'Small Business Owners', desc: 'Running your own business? Share how you choose suppliers, software and finance.', reward: 12, mins: 18, icon: 'building', c: '#EA580C' },
    { id: 'eng', cat: 'Engineering', title: 'Engineering & Manufacturing', desc: 'Plant, process and product engineers on equipment, automation and materials.', reward: 12, mins: 18, icon: 'gear', c: '#475569' },
    { id: 'ops', cat: 'Operations', title: 'Operations & Supply Chain', desc: 'Logistics, warehousing and manufacturing operations – what slows you down and what helps.', reward: 11, mins: 16, icon: 'truck', c: '#B45309' },
    { id: 'proc', cat: 'Procurement', title: 'Procurement & Purchasing', desc: 'How your organisation sources, negotiates and buys – from vendors to contracts.', reward: 11, mins: 15, icon: 'clipboard', c: '#0891B2' },
    { id: 'hr', cat: 'HR', title: 'HR & Workplace', desc: 'Hiring, benefits, learning and hybrid work – the people side of business.', reward: 10, mins: 15, icon: 'users', c: '#DB2777' },
    { id: 'mkt', cat: 'Marketing', title: 'Marketing & Advertising', desc: 'Advertising, brand and digital marketing – channels, agencies and martech.', reward: 10, mins: 15, icon: 'megaphone', c: '#9333EA' },
    { id: 'realty', cat: 'Real estate', title: 'Real Estate & Construction', desc: 'Developers, architects and contractors on materials, projects and property tech.', reward: 10, mins: 15, icon: 'landmark', c: '#A16207' },
    { id: 'hosp', cat: 'Hospitality', title: 'Hospitality & Retail Managers', desc: 'Store, hotel and restaurant managers on staffing, POS systems and suppliers.', reward: 9, mins: 14, icon: 'key', c: '#E11D48' },
    { id: 'edu', cat: 'Education', title: 'Teachers & Educators', desc: 'Classroom tools, ed-tech and the way learning is changing.', reward: 8, mins: 12, icon: 'cap', c: '#4F46E5' },
    { id: 'agri', cat: 'Agriculture', title: 'Agriculture & Agri-business', desc: 'Farmers and agri-business professionals on seeds, equipment and crop protection.', reward: 8, mins: 14, icon: 'leaf', c: '#15803D' }
  ]
};
