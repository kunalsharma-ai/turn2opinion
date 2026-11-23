// /member/profiles/ — rebuilt in frontend-1 from the approved live page:
//   welcome hero ("Welcome! Your world is waiting.") -> Your Opinion Kingdom -> About you · Profiles
//   -> Incomplete -> Surveys (sealed until the About-you profiles are complete) -> privacy note.
// Answering runs in the Questionnaire panel on the same endpoints as the existing app.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMemberData, useMe, aboutYou, topicProfiles } from '../data/MemberData.jsx';
import { t, tn, fmt } from '../i18n/t.js';
import { Button, Icon, cx } from '../components/ui.jsx';
import { useDash, XError } from '../components/Sections.jsx';
import Questionnaire from '../components/Questionnaire.jsx';
import { Kingdom, kingdomState } from '../components/Kingdom.jsx';
import { profileArt, readAnchor, clearAnchor } from './profileArt.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? t('pf.morning') : h < 17 ? t('pf.afternoon') : t('pf.evening');
}

export function ProfileTile({ p, onOpen, locked, index, dark, onUnlock }) {
  const art = profileArt(p);
  const done = p.completion >= 100;
  const state = locked ? t('pf.locked') : done ? t('pf.done') : p.started ? t('pf.pct', { n: p.completion }) : t('pf.ready');
  return (
    <article className={cx('pf-card', dark ? 'pf-card--dark' : `pf-card--${art.tone}`, done && 'is-done', locked && 'is-locked')} style={{ '--i': index }}>
      <span className="pf-card__shine" aria-hidden="true" />
      {index != null && dark && <span className="pf-card__num">#{index + 1}</span>}
      <span className="pf-card__icon" aria-hidden="true">
        <Icon name={art.icon} size={30} />
        {locked && (
          <span className="pf-card__lock">
            <Icon name="lock" size={13} strokeWidth={2.4} />
          </span>
        )}
        {done && (
          <span className="pf-card__tick">
            <Icon name="check" size={13} strokeWidth={3} />
          </span>
        )}
      </span>
      <h3 className="pf-card__name">{p.name}</h3>
      <p className="pf-card__meta">
        <span>
          <Icon name="clipboard" size={13} /> {tn('pf.questions', p.questions)}
        </span>
        <span>
          <Icon name="clock" size={13} /> {t('pf.min', { n: p.minutes || 1 })}
        </span>
      </p>
      <p className="pf-card__chips">
        <span className="pf-chip pf-chip--coin">+{fmt(p.points)}</span>
        <span className="pf-chip pf-chip--gem">+1</span>
      </p>
      <div className="pf-card__foot">
        <span className="pf-card__state">
          {!locked && p.started && !done && <span className="pf-ring" style={{ '--p': p.completion / 100 }} aria-hidden="true" />}
          {state}
        </span>
        {locked ? (
          <button type="button" className="pf-card__btn" onClick={onUnlock} aria-label={`${t('sv.unlock')}: ${p.name}`}>
            {t('sv.unlock')} <Icon name="lock" size={13} />
          </button>
        ) : (
          <button type="button" className="pf-card__btn" onClick={() => onOpen(p)} aria-label={`${done ? t('pf.edit') : p.started ? t('pf.continue') : t('pf.start')}: ${p.name}`}>
            {done ? t('pf.edit') : p.started ? t('pf.continue') : t('pf.start')} <Icon name={done ? 'pen' : 'arrow'} size={13} />
          </button>
        )}
      </div>
    </article>
  );
}

function SectionHead({ icon, tone, title, sub, count, id }) {
  return (
    <header className="pf-head">
      <span className={cx('pf-head__icon', `is-${tone}`)} aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <div>
        <h2 id={id}>{title}</h2>
        <p>{sub}</p>
      </div>
      {count != null && <span className="pf-count">{count}</span>}
    </header>
  );
}

/** Shared by Profiles and Surveys: open a profile in the answer panel and refresh counts after. */
export function useProfileRunner() {
  const { reload } = useMemberData();
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const done = useCallback(() => {
    reload('profiles');
    reload('points');
  }, [reload]);
  return { open, setOpen, close, done };
}

export function UnlockHelp({ about, onOpen }) {
  const left = about.filter((p) => p.completion < 100);
  return (
    <div className="pf-unlock">
      <p>{tn('pf.unlock.p', left.length)}</p>
      <ul>
        {about.map((p) => (
          <li key={p.slug} className={cx(p.completion >= 100 && 'is-done')}>
            <Icon name={p.completion >= 100 ? 'check' : profileArt(p).icon} size={16} />
            <span>{p.name}</span>
            {p.completion >= 100 ? (
              <em>{t('pf.done')}</em>
            ) : (
              <Button size="sm" variant="secondary" iconEnd="arrow" onClick={() => onOpen(p)}>
                {p.started ? t('pf.continue') : t('pf.start')}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProfilesPage() {
  const me = useMe();
  const d = useDash();
  const all = d.allProfiles;
  const run = useProfileRunner();
  const about = useMemo(() => aboutYou(all), [all]);
  const topics = useMemo(() => topicProfiles(all), [all]);
  const k = kingdomState({ profiles: all || [], stats: d.stats, points: d.points });
  const aboutDone = about.filter((p) => p.completion >= 100).length;
  const unlocked = about.length > 0 && aboutDone === about.length;
  const next = about.find((p) => p.completion < 100) || topics.find((p) => p.completion < 100);
  const incomplete = (all || []).filter((p) => p.started && p.completion < 100);
  const teen = me.type === 'teen';

  // deep link: /member/profiles/#p-<slug> opens that profile
  useEffect(() => {
    if (!all) return;
    const a = readAnchor();
    const hit = a.startsWith('p-') && all.find((p) => p.slug === a.slice(2));
    if (hit) {
      run.setOpen(hit);
      clearAnchor();
    }
  }, [all]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextAfter = run.open && [...about, ...topics].find((p) => p.slug !== run.open.slug && p.completion < 100);

  return (
    <div className={cx('xp xp--profiles pf', teen && 'is-teen')}>
      {/* hero */}
      <section className="pf-hero" aria-labelledby="pf-hero-h">
        <div className="pf-hero__bg" aria-hidden="true" />
        <div className="pf-hero__text">
          <p className="pf-hello">
            <span aria-hidden="true">●</span> {greeting()}, {me.firstName || t('pf.friend')}
          </p>
          <h1 id="pf-hero-h">{aboutDone === 0 ? t('pf.h.new') : unlocked ? t('pf.h.done') : t('pf.h.mid')}</h1>
          <p className="pf-hero__lead">
            {t('pf.lead.a')}{' '}
            <mark>
              {t('pf.lead.b')} <Icon name="key" size={15} />
            </mark>
          </p>
          <p className="pf-hero__p">
            {next ? t(next.slug === about[0]?.slug && !next.started ? 'pf.p.first' : 'pf.p.next', { name: next.name, n: next.minutes || 1, pts: fmt(next.points) }) : t('pf.p.all')}
          </p>
          <ul className="pf-hero__chips">
            <li>
              <Icon name="id" size={15} />
              <strong>
                {aboutDone}/{about.length || 4}
              </strong>{' '}
              {t('pf.chip.about')}
            </li>
            <li>
              <span className="mb-coin mb-coin--sm" aria-hidden="true" />
              <strong>{fmt(d.points?.total || 0)}</strong> {t('pf.chip.points')}
            </li>
            <li>
              <Icon name="spark" size={15} />
              <strong>
                {fmt(me.quality.score)}/{fmt(me.quality.scale)}
              </strong>{' '}
              {t('pf.chip.quality')}
            </li>
          </ul>
          <div className="pf-hero__cta">
            {next ? (
              <button type="button" className="pf-btn pf-btn--sun" onClick={() => run.setOpen(next)}>
                <Icon name="pen" size={17} /> {next.started ? t('pf.cta.continue', { name: next.name }) : t('pf.cta.start', { name: next.name })} <Icon name="arrow" size={16} />
              </button>
            ) : (
              <Button to="surveys" className="pf-btn pf-btn--sun" iconEnd="arrow">
                {t('pf.cta.surveys')}
              </Button>
            )}
            <a
              className="pf-btn pf-btn--glass"
              href="#kingdom"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('kingdom');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el?.focus({ preventScroll: true });
              }}
            >
              <Icon name="building" size={17} /> {t('pf.cta.kingdom')}
            </a>
          </div>
        </div>
        <div className="pf-hero__art" aria-hidden="true">
          <span className="pf-orbit pf-orbit--a" />
          <span className="pf-orbit pf-orbit--b" />
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="pf-dot" style={{ '--i': i }} />
          ))}
          <span className={cx('pf-orb', unlocked && 'is-open')}>
            <span className="pf-orb__core">
              <Icon name={unlocked ? 'key' : 'lock'} size={40} strokeWidth={2.2} />
            </span>
          </span>
          <span className="pf-float pf-float--coin">
            <span className="mb-coin mb-coin--sm" /> +50
          </span>
          <span className="pf-float pf-float--gem">
            <Icon name="spark" size={13} /> +1
          </span>
        </div>
      </section>

      {d.prStatus === 'error' && !all ? (
        <XError text={t('pj.err')} onRetry={d.prRetry} />
      ) : (
        <>
          <Kingdom k={k} me={me} />

          <section className="pf-sec" aria-labelledby="pf-about-h">
            <SectionHead id="pf-about-h" icon="id" tone="about" title={t('pf.about.t')} sub={t('pf.about.s')} count={all ? `${aboutDone}/${about.length}` : null} />
            {!all ? (
              <div className="pf-grid">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="pf-card pf-card--skel" style={{ '--i': i }} />
                ))}
              </div>
            ) : (
              <div className="pf-grid">
                {about.map((p, i) => (
                  <ProfileTile key={p.slug} p={p} index={i} onOpen={run.setOpen} />
                ))}
              </div>
            )}
          </section>

          {incomplete.length > 0 && (
            <section className="pf-sec" aria-labelledby="pf-inc-h">
              <SectionHead id="pf-inc-h" icon="clock" tone="incomplete" title={t('pf.inc.t')} sub={t('pf.inc.s')} count={incomplete.length} />
              <div className="pf-grid pf-grid--small">
                {incomplete.map((p, i) => (
                  <ProfileTile key={p.slug} p={p} index={i} onOpen={run.setOpen} />
                ))}
              </div>
            </section>
          )}

          {topics.length > 0 && (
            <section className="pf-sec" aria-labelledby="pf-sv-h">
              <SectionHead
                id="pf-sv-h"
                icon={unlocked ? 'clipboard' : 'lock'}
                tone="surveys"
                title={t('pf.sv.t')}
                sub={unlocked ? t('pf.sv.open') : t('pf.sv.s')}
                count={`${topics.filter((p) => p.completion >= 100).length}/${topics.length}`}
              />
              {unlocked ? (
                <>
                  <div className="pf-grid">
                    {topics.slice(0, 4).map((p, i) => (
                      <ProfileTile key={p.slug} p={p} index={i} dark onOpen={run.setOpen} />
                    ))}
                  </div>
                  <Button to="surveys" variant="secondary" iconEnd="arrow" className="pf-more">
                    {tn('pf.sv.all', topics.length)}
                  </Button>
                </>
              ) : (
                <p className="pf-seal" role="note">
                  <Icon name="lock" size={18} />
                  {tn('pf.seal', about.length - aboutDone)}
                </p>
              )}
            </section>
          )}

          <p className="pf-private">
            <Icon name="shield" size={16} /> {t('pf.private')}
          </p>
        </>
      )}

      {run.open && (
        <Questionnaire
          key={run.open.slug}
          kind="profile"
          source={run.open}
          onClose={run.close}
          onDone={run.done}
          nextLabel={nextAfter ? t('pf.cta.continue', { name: nextAfter.name }) : null}
          onNext={nextAfter ? () => run.setOpen(nextAfter) : null}
        />
      )}
    </div>
  );
}
