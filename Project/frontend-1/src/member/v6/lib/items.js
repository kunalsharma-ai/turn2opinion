/* CHANGE-06 / CHANGE-09 · Per-item game identity.
   Every profile and survey gets:
     b    the building it raises in the kingdom (archetype drawn by lib/kingdom-art.js)
     name the building's name (shown in the kingdom and in the completion celebration)
     fx   its completion celebration (lib/celebrate.js) — 14 effects; combined with the item's own
          palette, emoji and building, no two celebrations look the same.
   Presentation only: nothing here changes questions, answers or completion rules. */
import { profileEmoji } from './emoji.js';
import { themeOf, slugOf } from './present.js';

export const ITEM = {
  basic: { b: 'keep', name: 'Castle Keep', fx: 'crown' },
  educational: { b: 'library', name: 'Grand Library', fx: 'scrolls' },
  professional: { b: 'spire', name: 'Guild Tower', fx: 'shards' },
  financial: { b: 'hall', name: 'Royal Treasury', fx: 'coins' },
  'banking-financial-services': { b: 'vault', name: 'Golden Vault', fx: 'coins2' },
  parenting: { b: 'house', name: 'Family Nest', fx: 'balloons' },
  'home-pet': { b: 'cottage', name: 'Hearth Cottage', fx: 'hearts' },
  'home-household': { b: 'manor', name: 'Living Manor', fx: 'bubbles' },
  'household-services': { b: 'workshop', name: 'Fix-it Workshop', fx: 'sparks' },
  'pets-animal-care': { b: 'barn', name: 'Paw Stables', fx: 'paws' },
  shopping: { b: 'market', name: 'Grand Bazaar', fx: 'confetti' },
  'luxury-premium': { b: 'palace', name: 'Jewel Palace', fx: 'gems' },
  'fashion-apparel': { b: 'boutique', name: 'Style Atelier', fx: 'ribbons' },
  beauty: { b: 'dome', name: 'Glow Pavilion', fx: 'petals' },
  'beauty-personal-care': { b: 'greenhouse', name: 'Self-care Spa', fx: 'bubbles2' },
  'lifestyle-food': { b: 'bakery', name: 'Hearty Bakery', fx: 'emoji' },
  'food-beverages': { b: 'fountain', name: 'Flavour Fountain', fx: 'bubbles' },
  'restaurants-food-delivery': { b: 'inn', name: 'Feast Inn', fx: 'emoji' },
  'tobacco-nicotine-alcoholic': { b: 'tavern', name: 'Lantern Lounge', fx: 'lanterns' },
  tech: { b: 'observatory', name: 'Star Observatory', fx: 'stars' },
  'consumer-electronics': { b: 'forge', name: 'Gadget Forge', fx: 'sparks' },
  'technology-digital-services': { b: 'antenna', name: 'Cloud Beacon', fx: 'pixels' },
  'entertainment-media': { b: 'theatre', name: 'Royal Theatre', fx: 'spotlight' },
  game: { b: 'arcade', name: 'Pixel Arcade', fx: 'pixels' },
  'gaming-esports': { b: 'arena', name: 'Champions Arena', fx: 'fireworks' },
  'content-creator-social-influence1': { b: 'studio', name: 'Creator Studio', fx: 'hearts' },
  health: { b: 'garden', name: 'Herb Garden', fx: 'leaves' },
  'health-wellness': { b: 'pagoda', name: 'Calm Pagoda', fx: 'leaves' },
  sports: { b: 'stadium', name: 'Victory Stadium', fx: 'confetti2' },
  'sports-physical-fitness': { b: 'tower', name: 'Training Tower', fx: 'streaks' },
  travel: { b: 'lighthouse', name: 'Harbour Lighthouse', fx: 'planes' },
  'travel-tourism': { b: 'balloon', name: 'Sky Balloon Port', fx: 'balloons' },
  automobile: { b: 'garage', name: 'Carriage House', fx: 'streaks' },
  'automotive-mobility': { b: 'windmill', name: 'Power Windmill', fx: 'sparks' },
  mr: { b: 'clock', name: 'Clock Tower', fx: 'stars' },
  'research-panel': { b: 'observatory', name: 'Oracle Lab', fx: 'shards' },
  additional: { b: 'vault', name: 'Secret Keep', fx: 'gems' },
  // Global Teen Panel bank sections
  'teen-parent-verification': { b: 'house', name: 'Guardian Gate', fx: 'hearts' },
  'teen-teen-demographics': { b: 'keep', name: 'Explorer Keep', fx: 'crown' },
  'teen-geography-and-localization': { b: 'balloon', name: 'Map Tower', fx: 'balloons' },
  'teen-household-composition': { b: 'cottage', name: 'Family Cottage', fx: 'hearts' },
  'teen-socioeconomic-background': { b: 'hall', name: 'Family Ledger', fx: 'coins' },
  'teen-education': { b: 'library', name: 'Study Hall', fx: 'scrolls' },
  'teen-technology': { b: 'forge', name: 'Gadget Den', fx: 'sparks' },
  'teen-internet': { b: 'antenna', name: 'Signal Tower', fx: 'pixels' },
  'teen-social-media': { b: 'studio', name: 'Story Studio', fx: 'hearts' },
  'teen-gaming': { b: 'arcade', name: 'Quest Arcade', fx: 'pixels' },
  'teen-entertainment': { b: 'theatre', name: 'Show Theatre', fx: 'spotlight' },
  'teen-music-and-audio': { b: 'dome', name: 'Sound Dome', fx: 'stars' },
  'teen-sports': { b: 'stadium', name: 'Team Stadium', fx: 'confetti2' },
  'teen-hobbies': { b: 'workshop', name: 'Maker Workshop', fx: 'sparks' },
  'teen-food-and-beverages': { b: 'bakery', name: 'Snack Bakery', fx: 'emoji' },
  'teen-fashion': { b: 'boutique', name: 'Style Loft', fx: 'ribbons' },
  'teen-personal-care': { b: 'greenhouse', name: 'Fresh Greenhouse', fx: 'bubbles2' },
  'teen-shopping': { b: 'market', name: 'Teen Market', fx: 'confetti' },
  'teen-pocket-money-and-financial-literacy': { b: 'vault', name: 'Coin Vault', fx: 'coins2' },
  'teen-household-purchase-participation': { b: 'manor', name: 'Choice Manor', fx: 'bubbles' },
  'teen-ai-and-emerging-technology': { b: 'observatory', name: 'Future Lab', fx: 'stars' },
  'teen-career-aspirations': { b: 'spire', name: 'Dream Tower', fx: 'shards' },
  'teen-environment': { b: 'garden', name: 'Green Garden', fx: 'leaves' },
  'teen-travel': { b: 'lighthouse', name: 'Voyage Lighthouse', fx: 'planes' },
  'teen-reading': { b: 'library', name: 'Story Library', fx: 'scrolls' },
  'teen-languages': { b: 'pagoda', name: 'Language Pagoda', fx: 'leaves' },
  'teen-accessibility': { b: 'fountain', name: 'Comfort Fountain', fx: 'bubbles' },
  'teen-research-preferences': { b: 'clock', name: 'Voice Clock Tower', fx: 'stars' },
};
const DEF = { b: 'house', name: 'New Building', fx: 'confetti' };

export function itemMeta(p) {
  const m = ITEM[p.s] || ITEM[slugOf(p.s)] || DEF, w = themeOf(p), e = profileEmoji(p.s);
  return { ...m, e, a: w.a, a2: w.a2, a3: w.a3, dark: !!w.dark };
}
