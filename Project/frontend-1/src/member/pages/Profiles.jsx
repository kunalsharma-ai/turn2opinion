// /member/profiles/ in the v6 "Profiles & Surveys" design, on the member's real data:
//   1. Hero greeting with the Opinion Galaxy
//   2. {Name}'s Opinion Kingdom: a building per profile/survey, treasury (real points + quality), seals
//   3. About you · Profiles (complete these first)
//   4. Incomplete (pick up where you left off)
//   5. Surveys: every other profile, black & white and sealed until About you is complete,
//      then opened one at a time
// Questions, answers and saving are the member area's (see v6/questions.js and v6/components/Flow.jsx).
import { useEffect, useState } from 'react';
import { useDash, XError } from '../components/Sections.jsx';
import { t as mt } from '../i18n/t.js';
import { useStage, Stage } from '../v6/Stage.jsx';
import Hero from '../v6/components/Hero.jsx';
import Kingdom from '../v6/components/Kingdom.jsx';
import ItemCard from '../v6/components/ItemCard.jsx';
import { Icon } from '../v6/components/Icon.jsx';
import { t, nf } from '../v6/i18n/index.js';
import { reducedMotion } from '../v6/lib/fx.js';
import { readAnchor, clearAnchor } from './anchor.js';

export function ProfilesPage() {
  const d = useDash();
  const s = useStage(d.allProfiles);

  // deep link: /member/profiles/#p-<slug> opens that profile (or its "sealed" message)
  useEffect(() => {
    if (!d.allProfiles) return;
    const a = readAnchor();
    if (!a.startsWith('p-')) return;
    clearAnchor();
    s.openSlug(a.slice(2));
  }, [d.allProfiles]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage s={s} className="xp xp--profiles">
      {d.prStatus === 'error' && !d.allProfiles ? <XError text={mt('pj.err')} onRetry={d.prRetry} /> : <Hub s={s} d={d} />}
    </Stage>
  );
}

function Hub({ s, d }) {
  const [all, setAll] = useState(false);
  const { me, items, state } = s;
  const loading = !d.allProfiles;
  const name = me.firstName || '';
  const profiles = items.filter((x) => x.kind === 'profile');
  const surveys = items.filter((x) => x.kind === 'survey');
  const st = (x) => state.map.get(x.i) || { st: 'locked', pct: 0 };
  const aboutDone = profiles.filter((x) => st(x).st === 'done').length;
  const incomplete = items.filter((x) => st(x).st === 'prog');
  const surveysDone = surveys.filter((x) => st(x).st === 'done').length;
  const nx = state.nextAbout || state.nextSurvey;
  const next = nx ? { ...nx, started: st(nx).st === 'prog' } : null;
  const pts = d.points?.total ?? 0;
  const qs = me.quality?.score ?? 0;
  const toKingdom = () => document.getElementById('kingdom')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });

  return (
    <div className="dash">
      <Hero name={name} aboutDone={aboutDone} aboutTotal={profiles.length || 2} pts={pts} qs={qs} next={next} onStart={s.open} onKingdom={toKingdom} />
      {loading ? (
        <div className="kd kd-skel" aria-hidden="true" />
      ) : (
        <Kingdom items={items} state={state} name={name} hold={s.party != null} onOpen={s.open} onLocked={s.setLocked} points={pts} quality={qs} />
      )}

      <section className="sec6 sec-about" aria-labelledby="h-about">
        <header className="sec6-h">
          <span className="sec6-ic" aria-hidden="true">🙋</span>
          <div>
            <h2 id="h-about">{t('v6_about_title')}</h2>
            <p>{state.aboutDone && profiles.length ? t('v6_about_done') : t('v6_about_sub')}</p>
          </div>
          <span className="sec6-count">
            {nf(aboutDone)}/{nf(profiles.length)}
          </span>
        </header>
        <div className="grid6 g-about">
          {loading ? [0, 1].map((k) => <span key={k} className="icard big skel6" aria-hidden="true" />) : profiles.map((x) => <ItemCard key={x.slug} x={x} st={st(x)} onOpen={s.open} onLocked={s.setLocked} big />)}
        </div>
      </section>

      <section className="sec6 sec-inc" aria-labelledby="h-inc">
        <header className="sec6-h">
          <span className="sec6-ic" aria-hidden="true">⏳</span>
          <div>
            <h2 id="h-inc">{t('v6_inc_title')}</h2>
            <p>{incomplete.length ? t('v6_inc_sub') : t('v6_inc_empty')}</p>
          </div>
          <span className="sec6-count">{nf(incomplete.length)}</span>
        </header>
        {incomplete.length ? (
          <div className="grid6 g-inc">
            {incomplete.map((x) => (
              <ItemCard key={x.slug} x={x} st={st(x)} num={surveys.indexOf(x) + 1} onOpen={s.open} onLocked={s.setLocked} />
            ))}
          </div>
        ) : !loading ? (
          <div className="inc-empty">
            <span className="ie-e" aria-hidden="true">🧭</span>
            <p>{next ? t('v6_inc_hint', { name: next.p.n }) : t('v6_all_done')}</p>
            {next && (
              <button type="button" className="btn6 primary" onClick={() => s.open(next.i)}>
                {t('v6_go')}
                <Icon n="arrow-r" />
              </button>
            )}
          </div>
        ) : null}
      </section>

      {(loading || surveys.length > 0) && (
        <section className={'sec6 sec-surveys' + (state.aboutDone ? ' unlocked' : ' sealed')} aria-labelledby="h-surveys">
          <header className="sec6-h">
            <span className="sec6-ic" aria-hidden="true">{state.aboutDone ? '🗝️' : '🔒'}</span>
            <div>
              <h2 id="h-surveys">{t('v6_surveys_title')}</h2>
              <p>{state.aboutDone ? t('v6_surveys_sub_open') : t('v6_surveys_sub_locked')}</p>
            </div>
            <span className="sec6-count">
              {nf(surveysDone)}/{nf(surveys.length)}
            </span>
          </header>
          {!loading && !state.aboutDone && (
            <div className="seal-banner" role="note">
              <span className="sb-lock" aria-hidden="true">🔐</span>
              <span>{t('v6_surveys_banner', { n: profiles.length - aboutDone })}</span>
            </div>
          )}
          <div className="grid6 g-surveys">
            {loading
              ? [0, 1, 2, 3].map((k) => <span key={k} className="icard skel6 dk" aria-hidden="true" />)
              : surveys.map((x, k) => ((all || k < 8 || st(x).st !== 'locked') ? <ItemCard key={x.slug} x={x} st={st(x)} num={k + 1} onOpen={s.open} onLocked={s.setLocked} /> : null))}
          </div>
          {surveys.length > 8 && (
            <button type="button" className="btn6 ghost more6" onClick={() => setAll((v) => !v)} aria-expanded={all}>
              {all ? t('v6_show_less') : t('v6_show_all', { n: surveys.length })}
              <Icon n="chev" />
            </button>
          )}
        </section>
      )}
      <p className="foot6">
        <Icon n="shield" />
        {t('footer')}
      </p>
    </div>
  );
}
