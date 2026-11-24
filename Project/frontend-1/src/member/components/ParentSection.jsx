// The Parent & guardian section of the Teen's profile (/member/profile/#family), redesigned 24 Nov 2026.
// Replaces "My family record". Same data, same rules, new layout shared with the guardian's own page:
//   hero · the four-step workflow (parent: onboarding, consent; teen: basic profile, surveys) · three cards
//   Card 1 Parent onboarding form   every question with the guardian's answer, and who the guardian is
//   Card 2 Parent reward system     how Teens earn, from the agreement and the platform's point rules, with live points
//   Card 3 Parental consent form    the complete agreement, declaration, permissions and the teen's own decision
// Data: GET /api/v1/user/teen-profile -> family (only after the guardian approved, finished onboarding and gave
// consent; contact details masked by the API), plus the member's points, stats, profiles and surveys.
// A Teen can log in only after consent, so here the guardian's two steps are normally done; this section
// shows them and never lets anyone change or submit them. Changes go through the guardian's secure link.
import { useEffect, useMemo, useState } from 'react';
import { ENV } from '../../config/env.js';
import { api } from '../../utils/api.js';
import { warmRegions } from '../../components/survey/QInput.jsx';
import { relWord, CLOSED, statusIndex } from '../../data/teen/registration.js';
import { profileCompletion, useSection } from '../data/MemberData.jsx';
import { DEMO_FAMILY, teenStatements } from '../data/family.js';
import { Cards, Chip, HubStyles, Hero, Sheet, Workflow } from '../../components/parent/ParentHub.jsx';
import { AnswersView, ConsentDoc, RewardGuide } from '../../components/parent/ParentViews.jsx';
import { CONSENT_FACTS, ONB_LABEL, CON_LABEL, onboardingProgress, workflow } from '../../components/parent/parentData.js';
import Icon from '../../components/Icon.jsx';

const fullName = (n = {}) => [n.first, n.middle, n.last].filter(Boolean).join(' ');
const dateOf = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

/** GET /api/v1/user/teen-profile, once per mount. Also used by GuardianProfiles. */
export function useFamily() {
  const [s, setS] = useState({ status: 'loading' });
  useEffect(() => {
    let live = true;
    (async () => {
      if (ENV.DEMO_MODE) {
        await warmRegions();
        return live && setS({ status: 'ready', data: DEMO_FAMILY });
      }
      try {
        const [r] = await Promise.all([api.get('/api/v1/user/teen-profile'), warmRegions()]);
        if (!live) return;
        setS(r?.status === 'success' ? { status: 'ready', data: r.data } : { status: 'error' });
      } catch {
        if (live) setS({ status: 'error' });
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  return s;
}

const HASH = { onboarding: 'onboarding', guardian: 'onboarding', rewards: 'rewards', consent: 'consent', teen: 'consent' };

export function ParentSection() {
  const s = useFamily();
  const [points] = useSection('points');
  const [stats] = useSection('stats');
  const [profiles] = useSection('profiles');
  const [surveys] = useSection('surveys');
  const [open, setOpen] = useState(null);

  // /member/profile/#family-<card> opens that card
  useEffect(() => {
    if (s.status !== 'ready' || typeof window === 'undefined') return;
    const h = window.location.hash.replace('#', '');
    if (!/^family/.test(h)) return;
    requestAnimationFrame(() => document.getElementById('family')?.scrollIntoView({ block: 'start' }));
    const k = HASH[h.replace(/^family-?/, '')];
    if (k) setOpen(k);
  }, [s.status]);

  const d = s.data || {};
  const f = d.family || { state: 'pending', status: d.status };
  const approved = f.state === 'approved' || f.state === 'approved-without-form';
  const withdrawn = f.state === 'withdrawn';
  const active = (f.status || d.status) === 'account-active';
  const g = f.guardian || {};
  const rel = relWord(g.relation);
  const teenName = d.teen?.name?.first || 'you';
  const at = statusIndex(f.status || d.status);

  const pc = profileCompletion(profiles);
  const status = useMemo(() => {
    const onboarding = f.onboarding ? 'completed' : approved ? 'not-on-record' : at >= 3 ? 'completed' : at === 2 ? 'in-progress' : 'not-started';
    const consent = approved ? 'submitted' : at >= 3 ? 'pending' : 'not-started';
    return {
      onboarding,
      consent,
      profile: pc ? { percent: pc.percent, left: pc.left, total: pc.total } : approved ? { percent: 0 } : null,
      surveys: { open: approved && active && !!pc && pc.percent >= 100, count: Array.isArray(surveys) ? surveys.length : 0 }
    };
  }, [f, approved, active, at, pc, surveys]);
  const steps = workflow(status);
  const prog = onboardingProgress(f.onboarding || {});
  const eligible = active && f.consent?.selections?.participation === true;

  const cards = {
    onboarding: {
      status: status.onboarding,
      pct: f.onboarding ? prog.pct : 0,
      meta: f.onboarding ? `Submitted ${dateOf(f.timeline?.onboardingAt)} · ${prog.done} of ${prog.total} questions answered` : status.onboarding === 'not-on-record' ? 'Approved before the onboarding form existed' : `Waiting for your ${rel}`,
      cta: f.onboarding ? 'View every answer' : 'View the form'
    },
    rewards: {
      status: eligible ? 'done' : 'pending',
      label: eligible ? 'Earning' : 'Not yet earning',
      meta: points ? `${Number(points.total || 0).toLocaleString('en')} points now` : 'Live points and the reward rules',
      cta: 'See how rewards work'
    },
    consent: {
      status: status.consent,
      meta: approved ? `Submitted ${dateOf(f.consent?.acceptedAt)} · agreement ${f.consent?.version || CONSENT_FACTS.version}` : 'Your guardian gives consent from their secure email link',
      cta: approved ? 'View the consent form' : 'Read the consent form',
      note: `Agreement ${CONSENT_FACTS.version}: ${CONSENT_FACTS.sections} sections, the ${CONSENT_FACTS.declaration}-point declaration and ${CONSENT_FACTS.permissions} permissions, with what your ${rel} chose for each.`
    }
  };

  const who = { teenName: d.teen?.name?.first, guardianName: fullName(g.name), relation: g.relation ? rel : '', ref: d.ref };
  const pointsLive = points ? { points: { total: points.total, earned: points.earned, redeemed: points.redeemed, threshold: points.threshold }, completed: stats ? stats.complete : null } : { points: null, completed: stats ? stats.complete : null };

  return (
    <section className="pgs" id="family" aria-label="Parent and guardian section">
      <HubStyles />
      {s.status === 'loading' && (
        <p className="pgs-panel" role="status">
          <span className="btn-spin" aria-hidden="true" /> Loading the parent &amp; guardian section…
        </p>
      )}
      {s.status === 'error' && <p className="pgs-panel">We couldn’t load the parent &amp; guardian section. Please refresh the page.</p>}
      {s.status === 'ready' && (
        <>
          <Hero mode="teen" who={who} steps={steps}>
            {withdrawn && (
              <p className="pgs-notice is-warn">
                <Icon name="lock" size={16} /> Your {rel} withdrew their consent, so their answers are no longer shown. Contact support@turn2opinion.com if this is a mistake.
              </p>
            )}
            {!approved && !withdrawn && CLOSED[f.status] && (
              <p className="pgs-notice is-warn">
                <Icon name="clock" size={16} /> {CLOSED[f.status]}.
              </p>
            )}
            {f.needsReview && (
              <p className="pgs-notice is-warn">
                <Icon name="help" size={16} /> Your {rel} wasn’t sure they are legally authorised, so our team checks the permission before any survey is sent.
              </p>
            )}
          </Hero>
          <Workflow mode="teen" status={status} teenName={d.teen?.name?.first ? d.teen.name.first : 'you'} />
          <Cards cards={cards} onOpen={setOpen} />

          <Sheet
            open={open === 'onboarding'}
            onClose={() => setOpen(null)}
            tone="onb"
            kicker="Card 1 · filled in by your parent or guardian"
            title="Parent onboarding form"
            status={<Chip status={status.onboarding}>{ONB_LABEL[status.onboarding]}</Chip>}
            actions={
              <button type="button" className="pgs-btn" onClick={() => window.print()}>
                <Icon name="clipboard" size={16} /> <span className="pgs-hide-sm">Print</span>
              </button>
            }
          >
            <div className="pgs-panel">
              <b>Who gave permission</b>
              <dl className="pgs-facts">
                <div>
                  <dt>Name</dt>
                  <dd>{fullName(g.name) || 'Not provided'}</dd>
                </div>
                <div>
                  <dt>Relationship to {teenName === 'you' ? 'you' : teenName}</dt>
                  <dd>{g.relation ? rel : 'Not provided'}</dd>
                </div>
                <div>
                  <dt>Email (partly hidden)</dt>
                  <dd>{g.email || 'Not provided'}</dd>
                </div>
                <div>
                  <dt>Mobile (partly hidden)</dt>
                  <dd>{g.phone || 'Not provided'}</dd>
                </div>
                <div>
                  <dt>Submitted</dt>
                  <dd>{dateOf(f.timeline?.onboardingAt) || 'Not on record'}</dd>
                </div>
              </dl>
            </div>
            {f.onboarding ? (
              <>
                <p className="pgs-note">
                  <Icon name="help" size={14} /> Every question of the form, exactly as your {rel} answered it. {prog.done} of {prog.total} answered. Only your {rel} can change these answers: they contact support@turn2opinion.com, as the form is closed once consent is given.
                </p>
                <AnswersView answers={f.onboarding} masked emptyText="Not provided" />
              </>
            ) : (
              <>
                <p className="pgs-note">
                  <Icon name="help" size={14} /> {status.onboarding === 'not-on-record' ? `Your ${rel} approved you before the onboarding form existed, so no answers are on record. These are the questions the form asks.` : `Your ${rel} fills in this form from their secure email link. These are the questions it asks.`}
                </p>
                <AnswersView answers={{}} emptyText="—" skippedText="—" />
              </>
            )}
          </Sheet>

          <Sheet open={open === 'rewards'} onClose={() => setOpen(null)} tone="rw" kicker="Card 2 · for parents and teens" title="Parent reward system" status={<Chip status={cards.rewards.status}>{cards.rewards.label}</Chip>}>
            <RewardGuide live={pointsLive} teenName={teenName === 'you' ? 'Your' : teenName} eligible={eligible} />
          </Sheet>

          <Sheet
            open={open === 'consent'}
            onClose={() => setOpen(null)}
            tone="con"
            kicker="Card 3 · given by your parent or guardian"
            title="Parental consent form"
            status={<Chip status={status.consent}>{CON_LABEL[status.consent]}</Chip>}
            actions={
              <button type="button" className="pgs-btn" onClick={() => window.print()}>
                <Icon name="clipboard" size={16} /> <span className="pgs-hide-sm">Print</span>
              </button>
            }
          >
            {approved ? (
              <p className="pgs-note">
                <Icon name="shield" size={14} /> {f.consent?.verifiedVia === 'email-link' ? `Given by your ${rel} through their own secure email link.` : 'Recorded.'} Optional permissions can be changed, and consent withdrawn, by your {rel} at support@turn2opinion.com.
              </p>
            ) : (
              <p className="pgs-note">
                <Icon name="lock" size={14} /> Nothing has been submitted. Your {rel} reads and signs this from their secure email link; nobody can give consent for them here.
              </p>
            )}
            <ConsentDoc consent={approved ? f.consent : null} teen={f.teenConsent ? { statements: teenStatements(f.teenConsent, g.relation), at: f.teenConsent.acceptedAt } : null} />
          </Sheet>
        </>
      )}
    </section>
  );
}

export default ParentSection;
