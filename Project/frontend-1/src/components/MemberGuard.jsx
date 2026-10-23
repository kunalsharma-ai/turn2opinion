import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import { isProfileIncomplete, saveResumeData } from '../utils/profileGate.js';

export default function MemberGuard({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await api.get('/api/v1/me');
        if (me?.status === 'success' && me.data && isProfileIncomplete(me.data)) {
          const uid = saveResumeData(me.data);
          window.location.replace(`/join/?user=${uid}&resume=1`);
          return;
        }
      } catch (e) {
        console.error('Profile check failed:', e);
      }
      if (alive) setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  return ready ? children : null;
}