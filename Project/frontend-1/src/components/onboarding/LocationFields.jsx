// Country -> State / Province -> City -> postal code, from the profile bank's own lists
// (states: src/data/welcome/states.json, cities: public/profiles/data/city/<CC>.json, the same
// files the member profiles use). Values are stored the way the profiles store them
// (state "IN-UP", city as its name), so nothing has to be asked again later.
import { useEffect, useState } from 'react';
import { asset } from '../../config/env.js';
import { CountryPicker, Field } from '../FormFields.jsx';
import SearchSelect from './SearchSelect.jsx';

let statesP = null;
export const loadStates = () => (statesP ||= import('../../data/welcome/states.json').then((m) => m.default || m));
const cityCache = new Map();
export function loadCities(cc) {
  if (!cc) return Promise.resolve(null);
  if (!cityCache.has(cc))
    cityCache.set(
      cc,
      fetch(asset(`/profiles/data/city/${cc}.json`))
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    );
  return cityCache.get(cc);
}

// Postal codes: label and check per country. Countries not listed take any 2-12 letters/numbers.
const POSTAL = {
  IN: ['PIN code', /^[1-9]\d{5}$/, 'Enter your 6-digit PIN code.'],
  US: ['ZIP code', /^\d{5}(-\d{4})?$/, 'Enter a 5-digit ZIP code.'],
  GB: ['Postcode', /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, 'Enter a UK postcode, like SW1A 1AA.'],
  CA: ['Postal code', /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i, 'Enter a postal code, like K1A 0B1.'],
  AU: ['Postcode', /^\d{4}$/, 'Enter a 4-digit postcode.'],
  DE: ['Postleitzahl (PLZ)', /^\d{5}$/, 'Enter a 5-digit PLZ.'],
  FR: ['Code postal', /^\d{5}$/, 'Enter a 5-digit code postal.'],
  BR: ['CEP', /^\d{5}-?\d{3}$/, 'Enter your 8-digit CEP.'],
  JP: ['Postal code', /^\d{3}-?\d{4}$/, 'Enter a postal code, like 100-0001.'],
  AE: null,
  HK: null,
  QA: null
};
export const postalLabel = (cc) => (cc in POSTAL ? POSTAL[cc]?.[0] : 'Postal code');
export function locationErrors(loc, prefix = '') {
  const e = {};
  if (!loc.country) e[`${prefix}country`] = 'Choose your country.';
  if (loc.hasStates && !loc.state) e[`${prefix}state`] = 'Choose your state or province.';
  if (!String(loc.city || '').trim()) e[`${prefix}city`] = 'Choose or type your city.';
  else if (String(loc.city).trim().length < 2) e[`${prefix}city`] = 'Check the city name.';
  if (loc.noPostal) return e; // "My area has no postal code"
  const rule = POSTAL[loc.country];
  const z = String(loc.zipcode || '').trim();
  if (rule && !rule[1].test(z)) e[`${prefix}zipcode`] = z ? rule[2] : `Enter your ${rule[0]}.`;
  else if (rule === undefined && z && !/^[A-Za-z0-9 -]{2,12}$/.test(z)) e[`${prefix}zipcode`] = 'Use letters and numbers only.';
  return e;
}

/** loc = { country, state, city, zipcode, hasStates }; set(key, value) */
// freeState: the state list also accepts a typed name. onNoPostal: shows "My area has no postal code".
export default function LocationFields({ loc, set, errOf, touch, idp = 'loc', prefix = '', countryLabel = 'Country', freeState = false, noPostal = false, onNoPostal }) {
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const k = (n) => `${prefix}${n}`;

  useEffect(() => {
    let live = true;
    loadStates().then((s) => {
      if (!live) return;
      setStates(s);
    });
    return () => {
      live = false;
    };
  }, []);
  const stateList = (states && loc.country && states[loc.country]) || [];
  useEffect(() => {
    if (states) set('hasStates', stateList.length > 0);
  }, [states, loc.country]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let live = true;
    setCities(null);
    if (!loc.country) return;
    setCityLoading(true);
    loadCities(loc.country).then((c) => {
      if (!live) return;
      setCities(c);
      setCityLoading(false);
    });
    return () => {
      live = false;
    };
  }, [loc.country]);

  const cityOpts = ((cities && loc.state && cities[loc.state]) || (cities && !stateList.length ? Object.values(cities).flat() : [])).map((c) => [c, c]);
  const pl = postalLabel(loc.country);

  return (
    <div className="loc-grid">
      <div data-k={k('country')}>
        <Field id={`${idp}-country`} label={countryLabel} error={errOf(k('country'))} valid={!!loc.country && !errOf(k('country'))}>
          <CountryPicker
            id={`${idp}-country`}
            value={loc.country}
            invalid={!!errOf(k('country'))}
            onChange={(c) => {
              set('country', c);
              set('state', '');
              set('city', '');
              set('zipcode', '');
              touch(k('country'))();
            }}
          />
        </Field>
      </div>
      {stateList.length > 0 && (
        <div data-k={k('state')}>
          <Field id={`${idp}-state`} label="State / Province" error={errOf(k('state'))} valid={!!loc.state}>
            <SearchSelect
              id={`${idp}-state`}
              value={loc.state}
              options={stateList}
              allowFree={freeState}
              freeLabel="Use"
              invalid={!!errOf(k('state'))}
              placeholder={freeState ? 'Search or type your state' : 'Search your state'}
              onChange={(v) => {
                set('state', v);
                set('city', '');
                touch(k('state'))();
              }}
            />
          </Field>
        </div>
      )}
      {freeState && loc.country && states && stateList.length === 0 && (
        <div data-k={k('state')}>
          <Field id={`${idp}-state`} label="State / Region" hint="Optional. Leave it empty if your country has none.">
            <input id={`${idp}-state`} className="input" value={loc.state} onChange={(e) => set('state', e.target.value.slice(0, 60))} autoComplete="address-level1" />
          </Field>
        </div>
      )}
      <div data-k={k('city')}>
        <Field id={`${idp}-city`} label="City" error={errOf(k('city'))} valid={!!String(loc.city || '').trim() && !errOf(k('city'))}>
          {cityOpts.length ? (
            <SearchSelect
              id={`${idp}-city`}
              value={loc.city}
              options={cityOpts}
              allowFree
              freeLabel="Use"
              invalid={!!errOf(k('city'))}
              placeholder="Search or type your city"
              onChange={(v) => {
                set('city', v);
                touch(k('city'))();
              }}
            />
          ) : (
            <input
              id={`${idp}-city`}
              className="input"
              value={loc.city}
              placeholder={cityLoading ? 'Loading cities…' : !loc.country ? 'Choose your country first' : stateList.length && !loc.state ? 'Choose your state first' : 'Type your city'}
              disabled={!loc.country || (stateList.length > 0 && !loc.state)}
              onChange={(e) => set('city', e.target.value.slice(0, 80))}
              onBlur={touch(k('city'))}
              autoComplete="address-level2"
              aria-invalid={!!errOf(k('city'))}
            />
          )}
        </Field>
      </div>
      {loc.country && pl && (
        <div data-k={k('zipcode')}>
          <Field id={`${idp}-zip`} label={pl} error={noPostal ? '' : errOf(k('zipcode'))} valid={!noPostal && !!String(loc.zipcode || '').trim() && !errOf(k('zipcode'))} hint={onNoPostal ? 'Type it in. Every format is accepted for your country.' : undefined}>
            <input
              id={`${idp}-zip`}
              disabled={noPostal}
              placeholder={noPostal ? 'No postal code' : ''}
              className="input"
              value={loc.zipcode}
              onChange={(e) => set('zipcode', e.target.value.toUpperCase().slice(0, 12))}
              onBlur={touch(k('zipcode'))}
              autoComplete="postal-code"
              inputMode={/^(IN|US|AU|DE|FR|BR)$/.test(loc.country) ? 'numeric' : 'text'}
              aria-invalid={!!errOf(k('zipcode'))}
            />
          </Field>
          {onNoPostal && (
            <label className="check loc-nopostal">
              <input type="checkbox" checked={noPostal} onChange={(e) => onNoPostal(e.target.checked)} />
              <span className="check-ui" />
              <span>My area has no {pl.toLowerCase()}</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
}
