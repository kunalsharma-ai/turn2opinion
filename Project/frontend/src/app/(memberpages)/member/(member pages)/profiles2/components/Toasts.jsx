import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const id = useRef(0);
  const toast = useCallback((msg, ic = 'sparkle', ms = 2600) => {
    const k = ++id.current;
    setItems((x) => x.slice(-2).concat({ k, msg, ic, out: false }));
    setTimeout(() => setItems((x) => x.map((t) => (t.k === k ? { ...t, out: true } : t))), ms);
    setTimeout(() => setItems((x) => x.filter((t) => t.k !== k)), ms + 320);
  }, []);
  toast.clear = () => setItems([]);
  return (
    <Ctx.Provider value={toast}>
      {children}
      <div className="toasts" id="toasts" aria-live="polite">
        {items.map((t) => (
          <div key={t.k} className={'toast' + (t.out ? ' out' : '')}><Icon n={t.ic} /><span>{t.msg}</span></div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
