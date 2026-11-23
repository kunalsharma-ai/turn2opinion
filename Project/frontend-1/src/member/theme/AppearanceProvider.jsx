import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { applyAppearance, readAppearance, saveAppearance } from './appearance.js';

const Ctx = createContext(null);

export function AppearanceProvider({ memberType = 'consumer', children }) {
  const [a, setA] = useState(readAppearance);
  const [info, setInfo] = useState({ adjusted: false, mode: 'light', palette: 'turn2' });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('mb-theming');
    setInfo(applyAppearance(a, memberType));
    const t = setTimeout(() => root.classList.remove('mb-theming'), 450);
    return () => clearTimeout(t);
  }, [a, memberType]);

  // "Auto" follows the device setting live.
  useEffect(() => {
    if (a.mode !== 'system' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setInfo(applyAppearance(a, memberType));
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, [a, memberType]);

  const update = useCallback((patch) => {
    setA((prev) => {
      const next = { ...prev, ...patch };
      saveAppearance(next);
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ appearance: a, update, info }}>{children}</Ctx.Provider>;
}

export const useAppearance = () => useContext(Ctx);
