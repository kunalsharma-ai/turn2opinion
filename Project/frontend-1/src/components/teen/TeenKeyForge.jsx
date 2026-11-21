// Teen password creation (the link the teen gets after the guardian's consent), 21 Nov 2026.
// "Key forge": a lock whose bolts slide open as each password rule is met, and swings open when the
// account switches on. The form itself is the shared AccountSetup (PATCH /api/v1/user with the
// signed link), so the rules, CAPTCHA and sign-in are identical to the adult panel.
import { useState } from 'react';
import { hrefFor } from '../../router/Router.jsx';
import Icon from '../Icon.jsx';
import AccountSetup from '../onboarding/AccountSetup.jsx';
import { TeenStatusLine } from './TeenRegister.jsx';
import { playSuccess } from '../../utils/sound.js';
import { WELCOME } from '../../utils/session.js';

export default function TeenKeyForge({ link, f, onDone, onLinkUsed, onTeenWaiting }) {
  const [prog, setProg] = useState({ rules: 0, of: 4, match: false });
  const [done, setDone] = useState(false);
  const bolts = Array.from({ length: prog.of });
  const ready = prog.rules === prog.of && prog.match;
  return (
    <section className={`tky ${done ? 'is-open' : ready ? 'is-ready' : ''}`}>
      <div className="tky-bg" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap tky-grid">
        <div className="tky-art" aria-hidden="true">
          <div className="tky-lock">
            <span className="tky-shackle" />
            <span className="tky-body">
              <span className="tky-hole" />
              {bolts.map((_, i) => (
                <span key={i} className={`tky-bolt ${i < prog.rules ? 'is-slid' : ''}`} style={{ '--i': i }} />
              ))}
            </span>
          </div>
          <p className="tky-meter">
            {done ? 'Unlocked' : `${prog.rules} of ${prog.of} bolts open${prog.match ? ' · passwords match' : ''}`}
          </p>
        </div>
        <div className="tky-card">
          {done ? (
            <div className="tky-done">
              <p className="tky-chip">Account active</p>
              <h1>You’re in, {f.firstName || 'friend'}! 🎉</h1>
              <p>Your password is set and you’re logged in. From now on, log in with <b>{f.email}</b> and your new password.</p>
              <TeenStatusLine status="account-active" compact />
              <a className="trg-go" href={hrefFor(WELCOME)}>
                Start my welcome questions <Icon name="arrow" size={18} />
              </a>
            </div>
          ) : (
            <>
              <p className="tky-chip">Your guardian said yes</p>
              <h1>Forge your key</h1>
              <p className="tky-lead">
                Create the password only you know. Your username is <b>{f.email || 'your email address'}</b>. Nobody at Turn2Opinion, and not your guardian, ever needs it.
              </p>
              <TeenStatusLine status="account-activation-pending" compact />
              <AccountSetup
                user={link.user}
                code={link.code}
                sig={link.sig}
                firstName={f.firstName}
                lastName={f.lastName}
                email={f.email}
                teen
                onProgress={setProg}
                onLinkUsed={onLinkUsed}
                onTeenWaiting={onTeenWaiting}
                onDone={() => {
                  playSuccess();
                  setDone(true);
                  onDone?.();
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
