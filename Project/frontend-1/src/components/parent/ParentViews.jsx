// The read views inside the Parent & guardian section's cards (24 Nov 2026):
//   RewardGuide  card 2, the reward system: journey, live numbers, three reward cards and seven answers
//   AnswersView  every question of the onboarding form with the answer given (or "Not answered")
//   ConsentDoc   the complete consent form (agreement MINOR-2026.10) with what was recorded
import { useState } from 'react';
import Icon from '../Icon.jsx';
import { COMPANY, EN, INFO, INFO_RULE } from '../../data/teen/agreement.js';
import { CHAPTERS, DECLARATION, SECTIONS, SELECTIONS, TERMS_VERSION } from '../../data/teen/agreement.js';
import { ASSENT } from '../../data/teen/agreement.js';
import { REWARD_PATH, answerRows, has, rewardGuide } from './parentData.js';
import { Chip } from './ParentHub.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');
const nf = (n) => Number(n || 0).toLocaleString('en');
const dateOf = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

function Fold({ title, icon, open: start = false, children, badge, id }) {
  const [open, setOpen] = useState(start);
  return (
    <section className={cx('pgs-fold', open && 'is-open')} id={id}>
      <button type="button" className="pgs-fold-h" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {icon && <span aria-hidden="true">{icon}</span>}
        <b>{title}</b>
        {badge}
        <Icon name="chevron" size={18} className="pgs-fold-chev" />
      </button>
      {open && <div className="pgs-fold-b">{children}</div>}
    </section>
  );
}

// ------------------------------------------------------------------ card 2: rewards
/**
 * live (teen mode only) = { points: {total, earned, redeemed, threshold}, completed } or null.
 */
export function RewardGuide({ live, teenName = 'your teen', eligible }) {
  const threshold = live?.points?.threshold || null;
  const guide = rewardGuide({ threshold });
  const total = live?.points?.total ?? null;
  const pct = total != null && threshold ? Math.min(1, total / threshold) : 0;
  return (
    <div className="pgs-rw">
      <section className="pgs-rw-path" aria-label="How participation turns into rewards">
        <ol>
          {REWARD_PATH.map(([icon, t, d], i) => (
            <li key={t} style={{ '--i': i }}>
              <span className="pgs-rw-node" aria-hidden="true">
                <Icon name={icon} size={18} />
              </span>
              <b>{t}</b>
              <small>{d}</small>
            </li>
          ))}
        </ol>
        <span className="pgs-rw-coin" aria-hidden="true" />
      </section>

      {live && (
        <section className="pgs-rw-live" aria-label={`${teenName}’s rewards now`}>
          <div className="pgs-rw-stat">
            <small>Points balance</small>
            <b>{total == null ? '…' : nf(total)}</b>
            <span>{live.points ? `${nf(live.points.earned)} earned · ${nf(live.points.redeemed)} redeemed` : ''}</span>
          </div>
          <div className="pgs-rw-stat">
            <small>Surveys completed</small>
            <b>{live.completed == null ? '…' : nf(live.completed)}</b>
            <span>Only Complete surveys add survey points</span>
          </div>
          <div className="pgs-rw-stat pgs-rw-stat--goal">
            <small>Payout milestone</small>
            <b>{threshold ? nf(threshold) : '…'}</b>
            <span className="pgs-bar" aria-hidden="true">
              <i style={{ '--p': pct }} />
            </span>
            <span>{threshold && total != null ? (total >= threshold ? 'Reached' : `${nf(threshold - total)} points to go`) : ''}</span>
          </div>
          <div className={cx('pgs-rw-stat', eligible ? 'is-ok' : 'is-warn')}>
            <small>Reward eligibility</small>
            <b>{eligible ? 'Can earn' : 'Not yet'}</b>
            <span>{eligible ? 'Guardian consent covers rewarded surveys' : 'Needs an active account and guardian consent'}</span>
          </div>
        </section>
      )}

      <section className="pgs-rw-cards" aria-label="Ways to earn">
        <article className="pgs-rwc pgs-rwc--profile" style={{ '--i': 0 }}>
          <span className="pgs-rwc-ico" aria-hidden="true">
            <Icon name="map" size={22} />
          </span>
          <b>Profile points</b>
          <p>Each profile section carries its own points. They are credited once, the moment that section reaches 100%, and never twice.</p>
        </article>
        <article className="pgs-rwc pgs-rwc--survey" style={{ '--i': 1 }}>
          <span className="pgs-rwc-ico" aria-hidden="true">
            <Icon name="clipboard" size={22} />
          </span>
          <b>Survey points</b>
          <p>The reward is shown on the study card before a survey starts. Points are added when the survey is recorded as Complete.</p>
        </article>
        <article className="pgs-rwc pgs-rwc--payout" style={{ '--i': 2 }}>
          <span className="pgs-rwc-ico" aria-hidden="true">
            <Icon name="gift" size={22} />
          </span>
          <b>Payout milestone</b>
          <p>
            {threshold ? `At ${nf(threshold)} points` : 'At the panel’s milestone'} a redemption can be requested. Where a provider or the law requires it, the payout goes through a verified guardian-managed route.
          </p>
        </article>
      </section>

      <section className="pgs-rw-qa" aria-label="Questions and answers">
        {guide.map((g, i) => (
          <Fold key={g.id} id={`pgs-rw-${g.id}`} open={i === 0} icon={<Icon name={g.icon} size={18} />} title={g.q}>
            <ul className="pgs-rw-list">
              {g.a.map(([text, src]) => (
                <li key={text}>
                  <span>{text}</span>
                  <small>{src}</small>
                </li>
              ))}
            </ul>
          </Fold>
        ))}
      </section>
      <p className="pgs-note">
        <Icon name="help" size={14} /> Amounts for each survey are set per study and shown before it starts. Payment methods and processing times depend on country and age group, and are explained before a redemption is completed.
      </p>
    </div>
  );
}

// ------------------------------------------------------------------ card 1 (read view): every answer
export function AnswersView({ answers, masked, emptyText = 'Not answered', skippedText = 'Skipped (optional section)' }) {
  const groups = answerRows(answers || {}, { masked });
  return (
    <div className="pgs-ans">
      {groups.map((s, i) => (
        <Fold
          key={s.name}
          open={i === 0}
          icon={s.icon}
          title={s.name}
          badge={<small className="pgs-fold-n">{s.skipped ? 'Optional · skipped' : `${s.answered}/${s.rows.length}`}</small>}
        >
          <ol className="pgs-qa">
            {s.rows.map((r) => (
              <li key={r.key} className={cx(!has(r.value) && 'is-empty')}>
                <span className="pgs-qa-q">
                  {r.q}
                  {r.required && <i>Required</i>}
                </span>
                <span className="pgs-qa-a">{has(r.value) ? r.value : s.skipped ? skippedText : emptyText}</span>
              </li>
            ))}
          </ol>
        </Fold>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------ card 3 (read view): the consent form
const chapters = () => CHAPTERS.map((c) => ({ ...c, items: c.sections.map((n) => ({ n, ...SECTIONS[String(n)] })) }));

/**
 * consent = { version, acceptedAt, termsRead, declaration, selections } or null (nothing recorded yet).
 * teen = { statements: [{text, given}], at } for Part C, or null.
 */
export function ConsentDoc({ consent, teen }) {
  const sel = consent?.selections || {};
  const recorded = !!consent?.acceptedAt;
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="pgs-doc">
      <nav className="pgs-doc-jump" aria-label="Jump to">
        <button type="button" onClick={() => jump('pgs-doc-provide')}>
          <Icon name="user" size={14} /> What you provide
        </button>
        <button type="button" onClick={() => jump('pgs-doc-ch-data')}>
          <Icon name="database" size={14} /> How it is used and shared
        </button>
        <button type="button" onClick={() => jump('pgs-doc-ch-permission')}>
          <Icon name="scale" size={14} /> Participation conditions
        </button>
        <button type="button" onClick={() => jump('pgs-doc-b')}>
          <Icon name="check" size={14} /> Your consent
        </button>
      </nav>

      <section className="pgs-doc-info">
        <h3>{EN.info_h || 'Important information for parents and legal guardians'}</h3>
        {INFO.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="pgs-doc-rule">{INFO_RULE}</p>
      </section>

      <section className="pgs-doc-provide" id="pgs-doc-provide">
        <h3>What information you provide about your teen</h3>
        <ul>
          <li>
            <b>In the onboarding form:</b> who you are, your relationship to the teen and your household, how to contact you, the teen’s panel choices, your area type and languages, your home, work, education and household income band, and (optional) the teen’s health.
          </li>
          <li>
            <b>Already given by the teen at registration:</b> their name, date of birth, country and email.
          </li>
          <li>
            <b>Never asked:</b> school names, home addresses or exact locations.
          </li>
        </ul>
        <p className="pgs-note">The full rules on collection, use, sharing and retention are sections 9 to 15 below.</p>
      </section>

      <h3 className="pgs-doc-part">Part A · Terms &amp; conditions</h3>
      {chapters().map((ch, ci) => (
        <Fold key={ch.id} id={`pgs-doc-ch-${ch.id}`} open={ci === 0} icon={ch.emoji} title={`${ch.title} · sections ${ch.sections[0]}–${ch.sections[ch.sections.length - 1]}`}>
          <p className="pgs-doc-tag">{ch.tag}</p>
          {ch.items.map((s) => (
            <article key={s.n} className="pgs-doc-s">
              <h4>
                {s.n}. {s.title}
              </h4>
              <p className="pgs-doc-short">In short: {s.short}</p>
              <ul>
                {s.body.map((x, k) =>
                  typeof x === 'string' ? (
                    <li key={k}>{x}</li>
                  ) : (
                    <li key={k}>
                      {COMPANY.legalName} · {COMPANY.address} · {COMPANY.supportEmail} · {COMPANY.phone}
                    </li>
                  )
                )}
              </ul>
            </article>
          ))}
        </Fold>
      ))}

      <h3 className="pgs-doc-part" id="pgs-doc-b">
        Part B · Declaration and permissions
      </h3>
      <section className="pgs-doc-decl">
        <div className="pgs-doc-decl-h">
          <b>Declaration ({DECLARATION.length} points)</b>
          <Chip status={consent?.declaration ? 'done' : recorded ? 'off' : 'pending'}>{consent?.declaration ? 'Confirmed' : recorded ? 'Not recorded' : 'Not given yet'}</Chip>
        </div>
        <ol>
          {DECLARATION.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </section>
      <ul className="pgs-doc-sel">
        {SELECTIONS.map((s) => {
          const given = sel[s.id] === true;
          return (
            <li key={s.id} className={cx(given ? 'is-on' : 'is-off')}>
              <span className="pgs-box" aria-hidden="true">
                {given && <Icon name="check" size={12} strokeWidth={3} />}
              </span>
              <div>
                <b>
                  <span aria-hidden="true">{s.emoji}</span> {EN[`c_${s.id}_k`] || s.id} <small>({EN[s.kind] || (s.required ? 'Required' : 'Optional')})</small>
                </b>
                <p>{EN[`c_${s.id}`]}</p>
              </div>
              <Chip status={given ? 'done' : recorded ? 'off' : 'pending'}>{given ? 'Given' : recorded ? 'Not given' : 'Not given yet'}</Chip>
            </li>
          );
        })}
      </ul>
      {recorded && (
        <p className="pgs-note">
          <Icon name="shield" size={14} /> Recorded {dateOf(consent.acceptedAt)} · agreement {consent.version || TERMS_VERSION}
          {consent.termsRead ? ' · agreement read in full' : ''}. The IP address and browser stored with the record are never shown.
        </p>
      )}

      <h3 className="pgs-doc-part">Part C · The teen’s own decision</h3>
      <section className="pgs-doc-teen">
        <p>What joining means, in the teen’s words:</p>
        <ul>
          {ASSENT.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {teen?.statements?.length ? (
          <>
            <p>
              <b>What the teen confirmed when they registered{teen.at ? ` on ${dateOf(teen.at)}` : ''}:</b>
            </p>
            <ul className="pgs-doc-sel is-small">
              {teen.statements.map((s) => (
                <li key={s.text} className={s.given ? 'is-on' : 'is-off'}>
                  <span className="pgs-box" aria-hidden="true">
                    {s.given && <Icon name="check" size={12} strokeWidth={3} />}
                  </span>
                  <div>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </div>
  );
}
