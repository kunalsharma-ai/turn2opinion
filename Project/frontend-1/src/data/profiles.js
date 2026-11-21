// Profile coverage – curated from the regional B2B and B2C profile workbooks (2025/26).
// Intentionally lists WHO we invite, never audience sizes.

export const REGIONS = [
  {
    id: 'na',
    name: 'North America',
    accent: '#49B6FF',
    countries: [
      ['US', 'United States'],
      ['CA', 'Canada'],
      ['MX', 'Mexico'],
      ['CR', 'Costa Rica']
    ]
  },
  {
    id: 'sa',
    name: 'South America',
    accent: '#12C29B',
    countries: [
      ['BR', 'Brazil'],
      ['CO', 'Colombia'],
      ['AR', 'Argentina'],
      ['PE', 'Peru'],
      ['CL', 'Chile']
    ]
  },
  {
    id: 'eu',
    name: 'Europe',
    accent: '#7B5CFF',
    countries: [
      ['GB', 'United Kingdom'],
      ['DE', 'Germany'],
      ['FR', 'France'],
      ['IT', 'Italy'],
      ['ES', 'Spain'],
      ['NL', 'Netherlands'],
      ['BE', 'Belgium'],
      ['AT', 'Austria'],
      ['CH', 'Switzerland'],
      ['IE', 'Ireland'],
      ['SE', 'Sweden'],
      ['NO', 'Norway'],
      ['DK', 'Denmark'],
      ['PL', 'Poland'],
      ['CZ', 'Czech Republic'],
      ['PT', 'Portugal'],
      ['RO', 'Romania'],
      ['BG', 'Bulgaria'],
      ['UA', 'Ukraine'],
      ['RU', 'Russia']
    ]
  },
  {
    id: 'apac',
    name: 'Asia Pacific',
    accent: '#FFB020',
    countries: [
      ['IN', 'India'],
      ['CN', 'China'],
      ['JP', 'Japan'],
      ['KR', 'South Korea'],
      ['AU', 'Australia'],
      ['NZ', 'New Zealand'],
      ['SG', 'Singapore'],
      ['HK', 'Hong Kong'],
      ['TW', 'Taiwan'],
      ['MY', 'Malaysia'],
      ['ID', 'Indonesia'],
      ['TH', 'Thailand'],
      ['VN', 'Vietnam'],
      ['PH', 'Philippines'],
      ['KH', 'Cambodia']
    ]
  },
  {
    id: 'mea',
    name: 'Middle East & Africa',
    accent: '#FF5C7A',
    countries: [
      ['AE', 'United Arab Emirates'],
      ['SA', 'Saudi Arabia'],
      ['QA', 'Qatar'],
      ['KW', 'Kuwait'],
      ['IL', 'Israel'],
      ['EG', 'Egypt'],
      ['DZ', 'Algeria'],
      ['IR', 'Iran'],
      ['NG', 'Nigeria'],
      ['KE', 'Kenya'],
      ['ZA', 'South Africa']
    ]
  }
];

export const ALL_COUNTRIES = REGIONS.flatMap((r) => r.countries.map(([code, name]) => ({ code, name, region: r.name, regionId: r.id })));

// ---------------- Business professionals ----------------
export const B2B = {
  industries: [
    { name: 'Information Technology & Software', icon: 'chip' },
    { name: 'Banking, Finance & Insurance', icon: 'bank' },
    { name: 'Healthcare & Pharmaceuticals', icon: 'pulse' },
    { name: 'Manufacturing & Engineering', icon: 'gear' },
    { name: 'Automotive & Aerospace', icon: 'car' },
    { name: 'Energy, Oil & Gas & Utilities', icon: 'bolt' },
    { name: 'Telecommunications', icon: 'signal' },
    { name: 'Retail, FMCG & E-commerce', icon: 'bag' },
    { name: 'Agriculture & Agribusiness', icon: 'leaf' },
    { name: 'Food & Beverage Processing', icon: 'cup' },
    { name: 'Construction & Real Estate', icon: 'building' },
    { name: 'Logistics & Transportation', icon: 'truck' },
    { name: 'Education & Training', icon: 'cap' },
    { name: 'Hospitality & Tourism', icon: 'plane' },
    { name: 'Media, Advertising & Publishing', icon: 'megaphone' },
    { name: 'Legal & Professional Services', icon: 'scale' },
    { name: 'Government & Public Administration', icon: 'landmark' },
    { name: 'Defense & Security', icon: 'shield' },
    { name: 'Chemicals, Steel & Mining', icon: 'flask' },
    { name: 'Entertainment, Gaming & Sport', icon: 'game' }
  ],
  departments: [
    'Strategic & Top Management',
    'Information Technology',
    'Finance & Accounts',
    'Banking, Investments & Trading',
    'Human Resources',
    'Marketing & Advertising',
    'Sales & Business Development',
    'Procurement & Purchasing',
    'Supply Chain & Logistics',
    'Production & Operations',
    'Quality & Inspection',
    'Research & Development',
    'UX, Design & Architecture',
    'Customer Success & Service',
    'Legal & Regulatory',
    'Risk & Compliance',
    'Project & Program Management',
    'Administration & Facilities',
    'Maintenance & Utilities',
    'Medical & Health Services',
    'Teaching & Training',
    'Content, Editorial & Journalism',
    'Construction & Site Engineering',
    'Security',
    'Store & Warehousing',
    'Consulting'
  ],
  // Job-title families, each with representative titles.
  roles: [
    { family: 'C-suite & leadership', titles: ['CEO', 'Managing Director', 'President', 'COO', 'CFO', 'CMO', 'CIO', 'CTO', 'CHRO', 'Chief Procurement Officer', 'Vice President', 'Country Head'] },
    { family: 'IT decision-makers', titles: ['IT Director', 'IT Manager', 'Solution Architect', 'Cloud Architect', 'DevOps Manager', 'Cybersecurity Manager', 'Network Manager', 'Database Administrator', 'Data Scientist', 'AI Solutions Manager'] },
    { family: 'Finance & banking', titles: ['Finance Director', 'Financial Controller', 'Chartered Accountant', 'Credit Manager', 'Investment Manager', 'Wealth Manager', 'Portfolio Manager', 'Risk Manager', 'Underwriting Manager', 'Claims Manager'] },
    { family: 'HR & people', titles: ['HR Director', 'HR Business Partner', 'Talent Acquisition Manager', 'Learning & Development Manager', 'Compensation & Benefits Manager', 'Workforce Planning Manager'] },
    { family: 'Marketing & communications', titles: ['Marketing Director', 'Brand Manager', 'Digital Marketing Manager', 'Product Marketing Manager', 'PR Manager', 'SEO Manager', 'Social Media Manager', 'Media Planner'] },
    { family: 'Sales & customer', titles: ['Sales Director', 'Key Account Manager', 'Business Development Manager', 'Customer Success Manager', 'Contact Center Manager', 'Customer Experience Manager'] },
    { family: 'Healthcare', titles: ['Medical Director', 'Hospital Administrator', 'Nursing Director', 'Clinic Manager', 'Laboratory Manager', 'Pharmacy Manager', 'Diagnostic Center Manager'] },
    { family: 'Operations & manufacturing', titles: ['Plant Director', 'Production Manager', 'Operations Manager', 'Quality Assurance Manager', 'Maintenance Manager', 'HSE Manager', 'Process Engineer'] },
    { family: 'Supply chain & procurement', titles: ['Supply Chain Director', 'Procurement Manager', 'Strategic Sourcing Manager', 'Logistics Manager', 'Warehouse Manager', 'Category Manager', 'Import & Export Manager'] },
    { family: 'Agriculture & agribusiness', titles: ['Farm Owner', 'Agronomist', 'Crop Consultant', 'Livestock Manager', 'Agricultural Scientist', 'AgTech Founder', 'Food Safety Manager'] },
    { family: 'Legal, research & analytics', titles: ['Legal Counsel', 'Compliance Officer', 'Research Director', 'Insights Manager', 'Business Intelligence Manager', 'Analytics Manager'] },
    { family: 'Education, hospitality & services', titles: ['School Principal', 'University Dean', 'Corporate Trainer', 'Hotel General Manager', 'Restaurant Manager', 'Event Manager', 'Facility Services Manager'] },
    { family: 'Public sector & defense', titles: ['Civil Services Officer', 'Policy Advisor', 'Public Procurement Officer', 'Defense Administrator', 'Public Health Officer', 'Rural Development Officer'] },
    { family: 'Business owners & consultants', titles: ['Small Business Owner', 'Founder', 'Management Consultant', 'Independent Advisor', 'Freelance Professional'] }
  ],
  firmographics: ['Micro businesses', 'Small businesses', 'Mid-size companies', 'Large enterprises', 'Global corporations', 'Public sector bodies', 'Start-ups', 'Family-owned firms']
};

// ---------------- Consumers ----------------
export const B2C = {
  demographics: [
    { label: 'Age groups', items: ['Teens (with guardian acknowledgement)', 'Young adults', 'Mid-life', 'Pre-retirement', 'Seniors'] },
    { label: 'Generations', items: ['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'Retirees'] },
    { label: 'Education', items: ['High school', 'Vocational training', 'Bachelor’s degree', 'Master’s degree', 'Professional degree', 'Doctorate'] },
    { label: 'Work status', items: ['Full-time employees', 'Part-time employees', 'Self-employed & freelancers', 'Students', 'Homemakers', 'Stay-at-home parents', 'Retired', 'Seasonal workers'] },
    { label: 'Household', items: ['Married', 'Single', 'Homeowners', 'Renters', 'Living with family', 'Student housing'] },
    { label: 'Parenting', items: ['Expecting parents', 'New parents', 'Parents of preschoolers', 'Parents of school-age kids', 'Parents of teens', 'Single parents'] }
  ],
  lifestyles: [
    { name: 'Shoppers', icon: 'bag', items: ['Online shoppers', 'Omnichannel shoppers', 'Grocery shoppers', 'Luxury buyers', 'Electronics shoppers', 'Household budget managers'] },
    { name: 'Tech users', icon: 'phone', items: ['Smartphone users', 'iPhone users', 'Android users', 'Smart-home owners', 'Wearable users', 'AI tool users'] },
    { name: 'Gamers & streamers', icon: 'game', items: ['Mobile gamers', 'Console gamers', 'PC gamers', 'Esports fans', 'VR & AR gamers', 'Podcast listeners', 'Content creators'] },
    { name: 'Money & banking', icon: 'bank', items: ['Credit card holders', 'Digital wallet users', 'Investors', 'Stock traders', 'Crypto users', 'Insurance holders', 'Home-loan holders'] },
    { name: 'Drivers & riders', icon: 'car', items: ['Car owners', 'EV owners', 'Hybrid owners', 'Motorcycle owners', 'Ride-share drivers', 'Luxury vehicle owners'] },
    { name: 'Travellers', icon: 'plane', items: ['International travellers', 'Business travellers', 'Family vacationers', 'Solo travellers', 'Cruise travellers', 'Loyalty members'] },
    { name: 'Health & wellbeing', icon: 'pulse', items: ['Fitness enthusiasts', 'Patients with chronic conditions', 'Caregivers', 'Telehealth users', 'Health insurance holders', 'Wellness programme members'] },
    { name: 'Food lovers', icon: 'cup', items: ['Home cooks', 'Food-delivery users', 'Organic buyers', 'Plant-based eaters', 'Snack lovers', 'Beverage consumers'] },
    { name: 'Beauty & fashion', icon: 'spark', items: ['Skincare buyers', 'Makeup users', 'Fragrance buyers', 'Men’s grooming', 'Sportswear buyers', 'Jewellery & watch buyers'] },
    { name: 'Pet parents', icon: 'paw', items: ['Dog owners', 'Cat owners', 'Aquarium keepers', 'Multi-pet homes', 'Pet insurance holders'] },
    { name: 'Sports fans', icon: 'ball', items: ['Cricket fans', 'Football fans', 'Runners', 'Cyclists', 'Gym members', 'Yoga practitioners'] },
    { name: 'Media & entertainment', icon: 'play', items: ['Streaming subscribers', 'Music streamers', 'Moviegoers', 'Book readers', 'Social media users'] }
  ]
};

/** Teen panel (13–17, with a parent's permission): what teens are into, by age and profile channel. */
export const TEEN = {
  passions: [
    { name: 'Gamers', icon: 'game', items: ['Mobile gamers', 'Console gamers', 'PC gamers', 'Esports fans'] },
    { name: 'Creators', icon: 'pen', items: ['Short-video creators', 'Streamers', 'Artists', 'Photographers'] },
    { name: 'Music lovers', icon: 'volume', items: ['Playlist builders', 'K-pop fans', 'Musicians', 'Concert goers'] },
    { name: 'Athletes', icon: 'ball', items: ['Football players', 'Cricket players', 'Swimmers', 'Skaters'] },
    { name: 'Coders', icon: 'chip', items: ['App builders', 'Robotics fans', 'AI explorers', 'Hackathon teams'] },
    { name: 'Style setters', icon: 'spark', items: ['Sneakerheads', 'Thrift shoppers', 'Skincare starters', 'Streetwear fans'] },
    { name: 'Bookworms', icon: 'cap', items: ['Fantasy readers', 'Manga readers', 'Debaters', 'Quiz champions'] },
    { name: 'Changemakers', icon: 'leaf', items: ['Volunteers', 'Climate campaigners', 'Student council members', 'Animal lovers'] }
  ],
  ages: ['13', '14', '15', '16', '17'],
  channels: ['School & learning', 'Home & family', 'Devices & internet', 'Social & creating', 'Gaming & entertainment', 'Shopping & brands', 'Food & drink', 'Fashion & style', 'Sports & hobbies', 'Tech & AI']
};

/** Count of distinct profile types we list (used as "N+ profile types"). */
export const PROFILE_TYPE_COUNT =
  B2B.industries.length +
  B2B.departments.length +
  B2B.roles.reduce((n, r) => n + r.titles.length, 0) +
  B2C.demographics.reduce((n, d) => n + d.items.length, 0) +
  B2C.lifestyles.reduce((n, l) => n + l.items.length, 0);
