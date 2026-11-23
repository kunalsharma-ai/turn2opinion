/* Country-specific postal code validation (patterns follow the Universal Postal Union / libaddressinput
   formats). Countries without postcodes skip the question. Where the first characters identify the
   state/province (US, CA, AU, IN, …) we also check that the code matches the chosen state (soft flag). */
import { ok, soft, block } from './core.js';

export const POSTAL = {
  US: [/^\d{5}(-\d{4})?$/, '10001'], CA: [/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i, 'M5V 3A8'],
  GB: [/^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|[A-HK-Y][0-9]{1,2}|[0-9][A-HJKPS-UW]|[A-HK-Y][0-9][ABEHMNPRV-Y]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i, 'SW1A 1AA'],
  IN: [/^[1-9]\d{2} ?\d{3}$/, '110001'], AU: [/^\d{4}$/, '2000'], NZ: [/^\d{4}$/, '6011'], DE: [/^\d{5}$/, '10115'], FR: [/^\d{2} ?\d{3}$/, '75008'],
  ES: [/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/, '28013'], IT: [/^\d{5}$/, '00184'], NL: [/^[1-9]\d{3} ?[A-Z]{2}$/i, '1012 AB'], BE: [/^[1-9]\d{3}$/, '1000'],
  CH: [/^[1-9]\d{3}$/, '8001'], AT: [/^[1-9]\d{3}$/, '1010'], SE: [/^\d{3} ?\d{2}$/, '114 55'], NO: [/^\d{4}$/, '0150'], DK: [/^\d{4}$/, '1050'],
  FI: [/^\d{5}$/, '00100'], PL: [/^\d{2}-\d{3}$/, '00-001'], CZ: [/^\d{3} ?\d{2}$/, '110 00'], SK: [/^\d{3} ?\d{2}$/, '811 01'], HU: [/^[1-9]\d{3}$/, '1051'],
  PT: [/^\d{4}-\d{3}$/, '1000-001'], IE: [/^[AC-FHKNPRTV-Y]\d{2}[ ]?[0-9AC-FHKNPRTV-Y]{4}$/i, 'D02 X285'], GR: [/^\d{3} ?\d{2}$/, '105 57'],
  RO: [/^\d{6}$/, '010011'], BG: [/^\d{4}$/, '1000'], HR: [/^\d{5}$/, '10000'], SI: [/^\d{4}$/, '1000'], RS: [/^\d{5}$/, '11000'], UA: [/^\d{5}$/, '01001'],
  RU: [/^\d{6}$/, '101000'], BY: [/^\d{6}$/, '220030'], KZ: [/^(\d{6}|[A-Z]\d{2}[A-Z]\d[A-Z]\d)$/i, '050000'], TR: [/^\d{5}$/, '34000'], IL: [/^\d{5}(\d{2})?$/, '6100000'],
  CN: [/^\d{6}$/, '100000'], JP: [/^\d{3}-?\d{4}$/, '100-0001'], KR: [/^\d{5}$/, '03187'], TW: [/^\d{3}(\d{2,3})?$/, '100'], SG: [/^\d{6}$/, '018956'],
  MY: [/^\d{5}$/, '50000'], TH: [/^\d{5}$/, '10200'], ID: [/^\d{5}$/, '10110'], PH: [/^\d{4}$/, '1000'], VN: [/^\d{6}$/, '100000'], PK: [/^\d{5}$/, '44000'],
  BD: [/^\d{4}$/, '1000'], LK: [/^\d{5}$/, '00100'], NP: [/^\d{5}$/, '44600'], SA: [/^\d{5}(-\d{4})?$/, '11564'], EG: [/^\d{5}$/, '11511'], MA: [/^\d{5}$/, '10000'],
  ZA: [/^\d{4}$/, '2001'], NG: [/^\d{6}$/, '100001'], KE: [/^\d{5}$/, '00100'], BR: [/^\d{5}-?\d{3}$/, '01310-100'], MX: [/^\d{5}$/, '06000'], AR: [/^([A-Z]\d{4}[A-Z]{3}|\d{4})$/i, 'C1002AAP'],
  CL: [/^\d{7}$/, '8320000'], CO: [/^\d{6}$/, '110111'], PE: [/^\d{5}$/, '15001'], EC: [/^\d{6}$/, '170150'], UY: [/^\d{5}$/, '11000'], VE: [/^\d{4}$/, '1010'],
  IR: [/^\d{5}-?\d{5}$/, '11369-14711'], IQ: [/^\d{5}$/, '10001'], JO: [/^\d{5}$/, '11118'], KW: [/^\d{5}$/, '13001'], OM: [/^\d{3}$/, '100'], LT: [/^(LT-)?\d{5}$/i, '01100'],
  LV: [/^(LV-)?\d{4}$/i, 'LV-1050'], EE: [/^\d{5}$/, '10111'], IS: [/^\d{3}$/, '101'], LU: [/^(L-)?\d{4}$/i, '1009'], MT: [/^[A-Z]{3} ?\d{4}$/i, 'VLT 1117'],
  CY: [/^\d{4}$/, '1010'], DZ: [/^\d{5}$/, '16000'], TN: [/^\d{4}$/, '1000'], ET: [/^\d{4}$/, '1000'], MN: [/^\d{5}$/, '14200'], KH: [/^\d{5,6}$/, '120101'],
};
/* No postal code system in common use → don't ask for one */
export const NO_POSTCODE = new Set(['AE', 'QA', 'HK', 'MO', 'BS', 'BZ', 'BO', 'CW', 'FJ', 'GH', 'GD', 'GY', 'JM', 'KI', 'KP', 'ML', 'MW', 'NR', 'NU', 'PA', 'QA', 'RW', 'SB', 'SC', 'SL', 'SR', 'SY', 'TG', 'TK', 'TL', 'TO', 'TV', 'UG', 'VU', 'YE', 'ZW', 'AO', 'AG', 'AW', 'BF', 'BI', 'BJ', 'BW', 'CF', 'CG', 'CD', 'CI', 'CM', 'DJ', 'DM', 'ER', 'GM', 'GQ', 'HM', 'KM', 'LY', 'TD', 'TF', 'ST']);

/* first digits/letters → state code suffix (as used in the question bank, e.g. "IN-KA") */
const STATE_PREFIX = {
  CA: (z) => ({ A: ['NL'], B: ['NS'], C: ['PE'], E: ['NB'], G: ['QC'], H: ['QC'], J: ['QC'], K: ['ON'], L: ['ON'], M: ['ON'], N: ['ON'], P: ['ON'], R: ['MB'], S: ['SK'], T: ['AB'], V: ['BC'], X: ['NT', 'NU'], Y: ['YT'] })[z[0].toUpperCase()],
  AU: (z) => ({ 0: ['NT'], 2: ['NSW', 'ACT'], 3: ['VIC'], 4: ['QLD'], 5: ['SA'], 6: ['WA'], 7: ['TAS'], 8: ['NT'], 9: ['QLD'] })[z[0]],
  IN: (z) => ({ 1: ['DL', 'HR', 'PB', 'HP', 'JK', 'CH', 'LA'], 2: ['UP', 'UK', 'UT'], 3: ['RJ', 'GJ', 'DN', 'DD'], 4: ['MH', 'MP', 'CT', 'CG', 'GA'], 5: ['AP', 'TG', 'TS', 'KA'], 6: ['TN', 'KL', 'PY', 'LD'], 7: ['WB', 'OR', 'OD', 'AS', 'AR', 'MN', 'ML', 'MZ', 'NL', 'SK', 'TR', 'AN'], 8: ['BR', 'JH'], 9: ['APS'] })[z[0]],
  US: (z) => {
    const n = +z.slice(0, 3);
    const R = [[5, 5, 'NY'], [6, 9, 'PR'], [10, 27, 'MA'], [28, 29, 'RI'], [30, 38, 'NH'], [39, 49, 'ME'], [50, 59, 'VT'], [60, 69, 'CT'], [70, 89, 'NJ'], [100, 149, 'NY'], [150, 196, 'PA'], [197, 199, 'DE'], [200, 205, 'DC'], [206, 219, 'MD'], [220, 246, 'VA'], [247, 268, 'WV'], [270, 289, 'NC'], [290, 299, 'SC'], [300, 319, 'GA'], [320, 349, 'FL'], [350, 369, 'AL'], [370, 385, 'TN'], [386, 397, 'MS'], [398, 399, 'GA'], [400, 427, 'KY'], [430, 459, 'OH'], [460, 479, 'IN'], [480, 499, 'MI'], [500, 528, 'IA'], [530, 549, 'WI'], [550, 567, 'MN'], [570, 577, 'SD'], [580, 588, 'ND'], [590, 599, 'MT'], [600, 629, 'IL'], [630, 658, 'MO'], [660, 679, 'KS'], [680, 693, 'NE'], [700, 714, 'LA'], [716, 729, 'AR'], [730, 749, 'OK'], [750, 799, 'TX'], [800, 816, 'CO'], [820, 831, 'WY'], [832, 838, 'ID'], [840, 847, 'UT'], [850, 865, 'AZ'], [870, 884, 'NM'], [889, 898, 'NV'], [900, 961, 'CA'], [967, 968, 'HI'], [970, 979, 'OR'], [980, 994, 'WA'], [995, 999, 'AK']];
    const r = R.find(([a, b]) => n >= a && n <= b); return r ? [r[2]] : null;
  },
};

export const postalExample = (cc) => (POSTAL[cc] || [])[1] || '';
export const needsPostal = (cc) => !NO_POSTCODE.has(cc);

/* opts: { country: ISO code, state: state value like "IN-KA" } */
export function validatePostal(raw, opts = {}) {
  const v = String(raw ?? '').trim().toUpperCase().replace(/\s+/g, ' ');
  if (!v) return block('required');
  const cc = opts.country, rule = POSTAL[cc];
  if (!rule) {   // unknown format: generic sanity check only
    if (!/^[A-Z0-9][A-Z0-9 -]{1,9}$/.test(v)) return block('postal_generic');
    return ok(v);
  }
  if (!rule[0].test(v)) return block('postal_format', { example: rule[1] });
  if (/^(\d)\1+$/.test(v.replace(/\D/g, '')) && v.replace(/\D/g, '').length >= 4) return soft('postal_fake', {}, v, { flags: ['postal_fake'] });
  const pre = STATE_PREFIX[cc] && opts.state && STATE_PREFIX[cc](v);
  if (pre && opts.state && !pre.some((s) => String(opts.state).toUpperCase().endsWith('-' + s))) return soft('postal_state', { example: rule[1] }, v, { flags: ['postal_state'] });
  return ok(v);
}
