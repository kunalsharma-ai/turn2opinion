/* CHANGE-02 / CHANGE-08 / CHANGE-10 · Profile and survey cards.
   - Profiles (About you): full-colour cards, each in its own palette (from lib/themes.js), a glossy 3D
     emoji orb, status, progress ring and the reward it carries (+50 points · +1 quality).
   - Surveys: black & white while locked, with an animated padlock and a sheen; the one survey that is open
     turns to full colour with a "Next up" ribbon; completed ones stay in colour with their building.
   - No category labels on any card (requirement 3). Status is also given as text, not by colour alone. */
import { Icon } from './Icon.jsx';
import { pnameT, qcount, themeOf } from '../lib/present.js';
import { profileEmoji } from '../lib/emoji.js';
import { itemMeta } from '../lib/items.js';
import { POINTS_PER_ITEM, QUALITY_PER_ITEM } from '../lib/rewards.js';
import { prefetchCore } from '../lib/data.js';
import { t, tr, nf } from '../i18n/index.js';

function Ring({ pct }) {
  const c = 2 * Math.PI * 16;
  return <svg className="ring6" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16" className="tr" /><circle cx="20" cy="20" r="16" className="fg" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} /></svg>;
}

export default function ItemCard({ x, st, num, onOpen, onLocked, big }) {
  const w = themeOf(x.p), m = itemMeta(x.p), [e1, e2, e3] = profileEmoji(x.slug);
  const s = st.st, locked = s === 'locked', name = pnameT(x.p), q = qcount(x.p), mins = (x.src && x.src.minutes) || Math.max(1, Math.round(q * 8 / 60));
  const go = () => (locked ? onLocked(x.i) : onOpen(x.i));
  const status = s === 'done' ? t('v6_st_done') : s === 'prog' ? t('v6_st_prog', { pct: st.pct }) : locked ? t('v6_st_locked') : t('v6_st_open');
  const cta = s === 'done' ? t('v6_cta_update') : s === 'prog' ? t('v6_cta_continue') : locked ? t('v6_cta_locked') : x.kind === 'survey' ? t('v6_cta_survey') : t('v6_cta_start');
  return (
    <button type="button" className={`icard k-${x.kind} s-${s}${big ? ' big' : ''}${w.dark ? ' wdark' : ''}`} style={{ '--ca': w.a, '--cb': w.a2, '--cc': w.a3 }}
      onClick={go} onPointerEnter={locked ? undefined : prefetchCore} onFocus={locked ? undefined : prefetchCore}
      aria-label={`${name}. ${status}. ${cta}`} data-snd={locked ? 'lock' : 'open'}>
      <span className="ic-bg" aria-hidden="true"><i className="o1" /><i className="o2" /></span>
      {x.kind === 'survey' && <span className="ic-num" aria-hidden="true">#{nf(num)}</span>}
      {s === 'open' && x.kind === 'survey' && <span className="ic-ribbon" aria-hidden="true">{t('v6_next_up')}</span>}
      <span className="ic-orb" aria-hidden="true"><span className="ic-e1">{e1}</span><span className="ic-e2">{e2}</span><span className="ic-e3">{e3}</span>
        {locked && <span className="ic-lock"><svg viewBox="0 0 24 24"><path className="shackle" d="M7 11V8a5 5 0 0 1 10 0v3" /><rect x="4.5" y="11" width="15" height="10" rx="2.5" /><circle cx="12" cy="16" r="1.6" /></svg></span>}
        {s === 'done' && <span className="ic-ok"><Icon n="check" /></span>}
      </span>
      <span className="ic-body">
        <span className="ic-name">{name}</span>
        <span className="ic-meta"><span><Icon n="clipboard" />{t('v6_n_q', { n: q })}</span><span><Icon n="clock" />{t('v6_n_min', { n: mins })}</span></span>
        <span className="ic-rw" aria-hidden="true"><span className="r-coin"><i className="mini-coin" />+{nf(POINTS_PER_ITEM)}</span><span className="r-gem"><i className="mini-gem" />+{nf(QUALITY_PER_ITEM)}</span>{s === 'done' && <span className="r-bld">🏗️ {tr(m.name)}</span>}</span>
      </span>
      <span className="ic-foot">
        <span className={'ic-st st-' + s}>{s === 'prog' ? <Ring pct={st.pct} /> : null}{status}</span>
        <span className="ic-cta">{cta}<Icon n={locked ? 'lock' : s === 'done' ? 'edit' : 'arrow-r'} className={locked || s === 'done' ? '' : 'flip'} /></span>
      </span>
      {s !== 'locked' && <span className="ic-shine" aria-hidden="true" />}
      {locked && <span className="ic-sheen" aria-hidden="true" />}
    </button>
  );
}
