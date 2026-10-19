import { Icon } from './Icon.jsx';
import { PAT } from '../lib/themes.js';
import { statusOf } from '../lib/storage.js';
import { prefetchCore } from '../lib/data.js';
import { pnameT, qcount, themeOf, themeId } from '../lib/present.js';
import { profileEmoji } from '../lib/emoji.js';
import { t, tr, lang } from '../i18n/index.js';
import ALT from '../data/alt-text.json';

/* A profile card in its world's colours: pattern, glossy 3D illustration, three floating emoji, status and
   (for finished profiles) an Edit chip. `v` is the layout variant chosen by the hub section. */
export default function ProfileCard({ p, i, k, st, v = 'bento', hidden, onOpen }) {
  const id = themeId(p), tw = themeOf(p), pp = PAT[tw.pat] || PAT.dots, s = st || statusOf(p), n = qcount(p), m = Math.max(1, Math.round(n * 8 / 60));
  const [e1, e2, e3] = profileEmoji(p.s);
  const style = { '--k': Math.min(k, 16), '--pa': tw.a, '--pb': tw.a2, '--pc': tw.a3, '--ppat': pp[0], '--ppsz': pp[1], '--pdark': tw.dark ? tw.bg : 'transparent' };
  const status = s.st === 'done' ? t('f_done') : s.st === 'prog' ? t('st_prog', { pct: s.pct }) : t('f_new');
  const name = pnameT(p), src = `/illustrations/${id}.svg`;
  return (
    <button className={'pcard v-' + v + (tw.dark ? ' dk' : '') + (p.c === 'minor' ? ' teen' : '')} type="button" data-i={i} data-st={s.st} style={style} hidden={hidden}
      aria-label={t('card_aria', { name, n, status })} onClick={() => onOpen(i)} onPointerEnter={prefetchCore} onFocus={prefetchCore}>
      <span className="pv">
        <span className="pv-pat" />
        <span className="pv-sheen" />
        <img className="pv-img" src={src} width="320" height="240" loading="lazy" decoding="async" alt={lang() === 'en' ? (ALT[src] || tw.name) : tr(tw.name)} />
        <span className="pv-e e1" aria-hidden="true">{e1}</span>
        <span className="pv-e e2" aria-hidden="true">{e2}</span>
        <span className="pv-e e3" aria-hidden="true">{e3}</span>
        <span className="world">{tr(tw.name)}</span>
        {s.st === 'done' && <span className="pv-done" aria-hidden="true"><Icon n="check" /></span>}
      </span>
      <span className="pi">
        <b className="pn">{name}</b>
        <span className="meta">
          <span className="mq">{t('card_meta', { n, m })}</span>
          <span className={'pill ' + s.st}>{s.st === 'done' && <Icon n="check" />}{status}</span>
        </span>
        <span className="pbar" aria-hidden="true"><i style={{ '--w': s.pct + '%' }} /></span>
        {s.st === 'done' && <span className="pv-edit"><Icon n="edit" />{t('edit_responses')}</span>}
      </span>
    </button>
  );
}
