// Alt text for the member illustrations in /public/images/people.
//
// They are picked by file name in several places (the profile slot machine, the hero portal, the
// "how it works" duo, the join card), so the description lives here once instead of being written
// out at every call site. Each one describes what is actually drawn — a person, what they are
// wearing and what they are holding — because that is what alt text is for, and it is what image
// search has to work with. Where a page needs something more specific than the picture (the
// support illustration on /contact/, say) the call site passes its own alt instead.
export const PEOPLE_ALT = {
  business: 'Illustration of a smiling business professional holding a phone',
  finance: 'Illustration of a finance professional wearing glasses and a green cardigan',
  foodie: 'Illustration of a smiling panel member holding a mug',
  gamer: 'Illustration of a gamer in a purple hoodie holding a games controller',
  health: 'Illustration of a healthcare professional wearing a headscarf',
  'pro-pointing': 'Illustration of a smiling professional raising a finger to make a point',
  retiree: 'Illustration of a retired panel member with grey hair and glasses',
  shopper: 'Illustration of a smiling shopper with curly hair',
  'tech-user': 'Illustration of an IT professional working on a laptop',
  traveller: 'Illustration of a traveller wearing an orange turban'
};

/** Alt text for a member illustration, by file name (without the .svg). */
export const peopleAlt = (name) => PEOPLE_ALT[name] || 'Illustration of a Turn2Opinion panel member';
