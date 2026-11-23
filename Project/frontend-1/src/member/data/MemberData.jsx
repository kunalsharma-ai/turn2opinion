// Dashboard state. Server/API state (per section, each with its own loading/error) lives here;
// UI state (open drawers, tabs, filters) stays inside the components that own it.
// Sections load in parallel once the member is known, so one slow or failing endpoint never blanks
// the whole dashboard: its card shows its own skeleton or error with "Try again".
import { ABOUT_YOU } from '../config/memberTypes.js';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { loadSection } from './source.js';

const Ctx = createContext(null);
const SECTIONS = ['points', 'stats', 'surveys', 'profiles', 'activity', 'referrals', 'alerts', 'guardian', 'answers', 'socials'];

export function MemberDataProvider({ children }) {
  const [me, setMe] = useState({ status: 'loading', data: null, error: null });
  const [sections, setSections] = useState(() => Object.fromEntries(SECTIONS.map((s) => [s, { status: 'idle', data: null }])));
  const meRef = useRef(null);

  const load = useCallback(async (name) => {
    setSections((s) => ({ ...s, [name]: { status: 'loading', data: s[name]?.data ?? null } }));
    try {
      const data = await loadSection(name, { me: meRef.current });
      setSections((s) => ({ ...s, [name]: { status: 'ready', data } }));
      return data;
    } catch (error) {
      setSections((s) => ({ ...s, [name]: { status: 'error', data: s[name]?.data ?? null, error } }));
      return null;
    }
  }, []);

  const loadMe = useCallback(async () => {
    setMe((m) => ({ ...m, status: 'loading' }));
    try {
      const data = await loadSection('me', {});
      meRef.current = data;
      setMe({ status: 'ready', data, error: null });
      SECTIONS.forEach((n) => load(n));
    } catch (error) {
      setMe({ status: 'error', data: null, error });
    }
  }, [load]);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const patchMe = useCallback((patch) => {
    setMe((m) => {
      const data = { ...m.data, ...patch };
      meRef.current = data;
      return { ...m, data };
    });
  }, []);
  const patchSection = useCallback((name, fn) => setSections((s) => ({ ...s, [name]: { ...s[name], data: fn(s[name]?.data) } })), []);

  const value = useMemo(() => ({ me, sections, reload: load, reloadMe: loadMe, patchMe, patchSection }), [me, sections, load, loadMe, patchMe, patchSection]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useMemberData = () => useContext(Ctx);
export const useMe = () => useContext(Ctx).me.data;
/** [data, status, retry] for one section. */
export function useSection(name) {
  const { sections, reload } = useContext(Ctx);
  const s = sections[name] || { status: 'idle' };
  const retry = useCallback(() => reload(name), [reload, name]);
  return [s.data, s.status === 'idle' ? 'loading' : s.status, retry];
}

// ---------- derived values shared by several cards (computed from existing data only) ----------
/** The About-you profiles that unlock surveys. Panels without those slugs (Teen) use their first four. */
export function aboutYou(profiles) {
  const list = Array.isArray(profiles) ? profiles : [];
  const hit = list.filter((p) => ABOUT_YOU.includes(p.slug));
  return hit.length >= 2 ? hit : list.slice(0, 4);
}
/** Every other profile: the topic surveys that unlock once About-you is complete. */
export function topicProfiles(profiles) {
  const about = aboutYou(profiles);
  return (Array.isArray(profiles) ? profiles : []).filter((p) => !about.includes(p));
}

export function profileCompletion(all) {
  const profiles = aboutYou(all);
  if (!profiles.length) return null;
  // the API reports -1 for a profile not started yet: that counts as 0 %
  const avg = profiles.reduce((n, p) => n + Math.min(100, Math.max(0, Number(p.completion) || 0)), 0) / profiles.length;
  return { percent: Math.round(avg), left: profiles.filter((p) => p.completion < 100).length, total: profiles.length };
}

export function qualityTier(score, scale) {
  const r = scale ? score / scale : 0;
  if (r >= 0.9) return 'excellent';
  if (r >= 0.75) return 'great';
  if (r >= 0.5) return 'good';
  if (r >= 0.3) return 'fair';
  return 'low';
}
