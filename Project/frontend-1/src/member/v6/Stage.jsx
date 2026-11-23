// The v6 Profiles & Surveys "stage" shared by /member/profiles/ and /member/surveys/:
//   - the #t2o root that scopes the v6 styles (and its per-item world colours via data-t)
//   - the icon sprite
//   - the hub <-> question flow switch, the "Sealed for now!" popup and the completion celebration
// The list of profiles comes from GET /api/v1/profile through useDash(); nothing is stored on the device
// except which buildings have already been raised (so each rise animation plays once).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMemberData, useMe, aboutYou, topicProfiles } from '../data/MemberData.jsx';
import { useToast } from '../components/ui.jsx';
import { SPRITE } from './lib/icons.js';
import { themeCSS } from './lib/themes.js';
import { setModel, stateOf, canOpen, nextItem } from './lib/progression.js';
import { initBuilt } from './lib/rewards.js';
import { setWorld } from './lib/world.js';
import { profileKey } from './lib/storage.js';
import { themeId } from './lib/present.js';
import { reducedMotion } from './lib/fx.js';
import { t } from './i18n/index.js';
import Flow from './components/Flow.jsx';
import { installClickSounds } from './lib/uisound.js';
import LockedPopup from './components/LockedPopup.jsx';
import Celebration from './components/Celebration.jsx';

const WORLDS = typeof document !== 'undefined' ? themeCSS() : '';

/** The model for the page: items (About-you profiles first, then the others as surveys) and their state. */
export function useStage(allProfiles) {
  const me = useMe();
  const { reload, refreshMe } = useMemberData();
  const toast = useToast();
  const about = useMemo(() => aboutYou(allProfiles), [allProfiles]);
  const topics = useMemo(() => topicProfiles(allProfiles), [allProfiles]);
  // rebuilt on every render (cheap) so the popups, which read the shared model, always see this render's list
  setWorld(me.type); // Consumer kingdom, Professional observatory, Teen islands
  const items = setModel(about, topics, me.type === 'teen' ? 'teen' : 'b2c');
  const state = stateOf();
  const [view, setView] = useState({ name: 'hub' }); // hub | flow (item) | survey (opened paid survey)
  const [locked, setLocked] = useState(null);
  const [party, setParty] = useState(null);
  const [partyPts, setPartyPts] = useState(0);
  const top = useRef(null);

  useEffect(() => {
    if (allProfiles) initBuilt(items.filter((x) => x.src.completion >= 100).map((x) => profileKey(x.p)));
  }, [allProfiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const toTop = useCallback(() => {
    const r = top.current;
    if (!r) return;
    const y = r.getBoundingClientRect().top + window.scrollY - 80;
    if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
  }, []);

  const open = useCallback(
    (i) => {
      const x = items[i];
      if (!x) return;
      if (!canOpen(i)) return setLocked(i);
      setLocked(null);
      setView({ name: 'flow', i, wasDone: x.src.completion >= 100 });
      toTop();
    },
    [items, toTop]
  );
  const openSlug = useCallback((slug) => {
    const i = items.findIndex((x) => x.slug === slug);
    if (i >= 0) open(i);
  }, [items, open]);
  const home = useCallback(() => {
    setView({ name: 'hub' });
    toTop();
  }, [toTop]);
  const goKingdom = useCallback(() => {
    requestAnimationFrame(() => document.getElementById('kingdom')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' }));
  }, []);

  const profileDone = useCallback(
    ({ first, credited = [] }) => {
      const i = view.i;
      const x = items[i];
      // show it as complete straight away; the reload below brings the server's numbers
      if (x) Object.assign(x.src, { completion: 100, started: true });
      reload('profiles');
      reload('points');
      refreshMe?.();
      setView({ name: 'hub' });
      toTop();
      if (first) {
        setPartyPts(credited.filter((c) => !x || c.slug === x.slug).reduce((n, c) => n + (c.points || 0), 0));
        setParty(i);
      }
      else toast(t('changes_saved'));
    },
    [items, reload, refreshMe, toast, toTop, view.i]
  );

  return { me, items, state, view, setView, open, openSlug, home, locked, setLocked, party, partyPts, setParty, goKingdom, profileDone, top, about, topics };
}

/** The #t2o root: children are the hub; the flow replaces them while a profile is open. */
export function Stage({ s, className = '', children, renderSurvey }) {
  // v6: a sound on every click (buttons, cards, links); answers are voiced by the flow itself
  useEffect(() => installClickSounds(s.top.current), [s.top]);
  const x = s.view.name === 'flow' ? s.items[s.view.i] : null;
  const world = x ? themeId(x.p) : s.view.name === 'survey' ? 'rewards' : 'brand';
  const nx = s.party != null ? nextItem() : null;
  return (
    <div id="t2o" ref={s.top} className={'t2o v-' + s.view.name + ' ' + className} data-t={world}>
      <style>{WORLDS}</style>
      <div className="sprite" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SPRITE }} />
      <main className="main6">
        {x ? (
          <Flow key={x.slug} kind="profile" source={{ ...x.src, name: x.p.n }} wasDone={s.view.wasDone} onHome={s.home} onDone={s.profileDone} />
        ) : s.view.name === 'survey' && renderSurvey ? (
          renderSurvey()
        ) : (
          children
        )}
      </main>
      {s.locked != null && (
        <LockedPopup
          i={s.locked}
          onClose={() => s.setLocked(null)}
          onGo={(i) => {
            s.setLocked(null);
            s.open(i);
          }}
        />
      )}
      {s.party != null && (
        <Celebration
          key={s.party}
          i={s.party}
          points={s.partyPts}
          next={nx}
          onClose={() => {
            s.setParty(null);
            s.goKingdom();
          }}
          onNext={(i) => {
            s.setParty(null);
            s.open(i);
          }}
        />
      )}
    </div>
  );
}
