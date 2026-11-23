// Welcome questions, asked once after a member's first login (Round 13, Kunal 20 Nov 2026):
// "very limited questions to understand their profile only", taken from the original profile
// question bank, the same treatment for Consumers, Professionals and Teens.
//   login (or password set from the email link) -> /welcome/ (only while not answered) -> T&C -> dashboard
// Answers are saved with PUT /api/v1/user/welcome as ordinary profile answers, and the member area's
// own welcome survey is marked complete so it is not asked a second time.
import { useEffect, useState } from 'react';
import { hrefFor } from '../router/Router.jsx';
import { ENV } from '../config/env.js';
import { api } from '../utils/api.js';
import { track } from '../utils/analytics.js';
import Icon from '../components/Icon.jsx';
import { Breadcrumbs } from '../components/Common.jsx';
import { AuthAura } from '../components/AuthAura.jsx';
import { DASHBOARD, termsUrl, welcomeChannels } from '../utils/session.js';
import WelcomeQuestions, { loadBank, welcomePayload } from '../components/onboarding/WelcomeQuestions.jsx';
import TeenWelcome, { TEEN_HOME } from '../components/teen/TeenWelcome.jsx';

const JOURNEY = { b2b: 'pro', minor: 'teen', b2c: 'consumer' };
const AUD = { pro: 'pro', teen: 'teen', consumer: 'consumer' };

/** Where a member goes once the welcome questions are answered. */
export function afterWelcome(category) {
  return category === 'minor' ? hrefFor(TEEN_HOME) : termsUrl(category);
}

const COPY = {
  consumer: ['A few quick questions', 'Six questions about you. They decide which surveys reach you first, and take about a minute.'],
  pro: ['A few quick questions about your work', 'Six questions about your role and organisation, so the first business studies we send fit you. About a minute. We never contact your employer.'],
  teen: ['A few quick questions', 'Five questions about what you are into, so your first surveys fit you. Nothing about money, and nothing about which school you go to.']
};

export default function Welcome() {
  const [state, setState] = useState('checking'); // checking | ask | saving | done | error
  const [me, setMe] = useState(null);
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let live = true;
    (async () => {
      const q = new URLSearchParams(window.location.search);
      let user = null;
      if (ENV.DEMO_MODE) {
        const as = q.get('as');
        user = { name: { first: as === 'teen' ? 'Riya' : 'Asha' }, category: as === 'teen' ? 'minor' : as === 'pro' ? 'b2b' : 'b2c', country: 'in' };
      } else {
        try {
          const r = await api.get('/api/v1/me');
          user = r?.status === 'success' && r.data ? r.data : null;
        } catch {
          user = null;
        }
        if (!user) {
          window.location.replace(hrefFor('/login/'));
          return;
        }
        try {
          const w = await api.get('/api/v1/user/welcome');
          if (w?.status === 'success' && w.data && w.data.done) {
            window.location.replace(afterWelcome(user.category || w.data.category));
            return;
          }
        } catch {
          /* ask anyway: saving twice only updates the same answers */
        }
      }
      let country = String(user.country || (user.address && user.address[0] && user.address[0].country) || '').toUpperCase();
      if (!country) {
        try {
          country = String((await api.get('/api/v1/get-country'))?.country || '').toUpperCase();
        } catch {
          /* income question falls back to its default list */
        }
      }
      await loadBank();
      if (!live) return;
      setMe({ ...user, country });
      setState('ask');
    })();
    return () => {
      live = false;
    };
  }, []);

  const journey = (me && JOURNEY[me.category]) || 'consumer';
  const aud = AUD[journey];
  const save = async () => {
    setState('saving');
    setMsg('');
    try {
      const b = await loadBank();
      const welcome = welcomePayload(b, journey, answers, { country: me.country }, {});
      const ch = welcomeChannels.take();
      if (ch.length) welcome['communication-methods'] = ch;
      const res = await api.put('/api/v1/user/welcome', { welcome });
      if (res?.status !== 'success') {
        setState('ask');
        setMsg((res && res.message) || 'We couldn’t save your answers. Please try again.');
        return;
      }
      track('welcome_complete', { category: me.category, answers: Object.keys(welcome).length });
      setState('done');
      setTimeout(() => window.location.assign(afterWelcome(me.category)), ENV.DEMO_MODE ? 2500 : 700);
    } catch {
      setState('ask');
      setMsg('Unable to save your answers. Please check your connection and try again.');
    }
  };

  if (state === 'checking')
    return (
      <section className="join-done">
        <div className="wrap join-done-inner">
          <p className="join-progress-note" role="status">
            <span className="btn-spin" aria-hidden="true" /> One moment…
          </p>
        </div>
      </section>
    );

  // Teens get their own welcome deck, from the Teen Profile Survey (components/teen/TeenWelcome.jsx).
  if (journey === 'teen') return <TeenWelcome me={me} />;

  const [title, lead] = COPY[journey];
  return (
    <section className={`join theme-${aud} at-step-welcome is-welcome`}>
      <div className="join-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <AuthAura aud={aud} />
      <div className="wrap join-grid">
        <div className="join-side">
          <Breadcrumbs items={[{ label: 'Welcome' }]} />
          <h1>
            Welcome{me && me.name && me.name.first ? `, ${me.name.first}` : ''}! {title}
          </h1>
          <p className="join-lead">{lead}</p>
          <ol className="wl-next">
            <li className="is-done">
              <Icon name="check" size={14} strokeWidth={2.6} /> Account created and logged in
            </li>
            <li className="is-now">
              <Icon name="sparkles" size={14} /> A few welcome questions
            </li>
            <li>
              <Icon name="arrow" size={14} /> {journey === 'teen' ? 'Your dashboard' : 'Your panel agreement, then your dashboard'}
            </li>
          </ol>
        </div>
        <div className="join-card">
          <span className="join-card-ring" aria-hidden="true" />
          <div className="join-step">
            {state === 'done' ? (
              <p className="join-progress-note" role="status">
                <Icon name="check" size={16} /> Saved. Taking you on…
              </p>
            ) : (
              <WelcomeQuestions journey={journey} ans={answers} setAnswers={setAnswers} ctx={{ country: me && me.country }} onDone={save} doneLabel={journey === 'teen' ? 'Save and open my dashboard' : 'Save and continue'} />
            )}
            {state === 'saving' && (
              <p className="join-progress-note" role="status">
                <span className="btn-spin" aria-hidden="true" /> Saving your answers…
              </p>
            )}
            {msg && (
              <p className="form-alert" role="alert">
                {msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
