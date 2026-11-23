/* CHANGE-13 · Phone number with country flag, country name and dialling code (requirement 16).
   The country button shows the flag, the country name and +code; it opens a searchable list (flag · name ·
   +code) — search by name, ISO code or dialling code ("india", "IN", "91").
   Value logic is unchanged from v5.2: kept as "+<code> <number>" while typing and normalised to E.164
   when the respondent continues; the country defaults to the residence country, then a browser guess. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { sound } from '../../lib/sound.js';
import { themeId, norm } from '../../lib/present.js';
import { Icon, Flag } from '../Icon.jsx';
import { PHONE_META } from '../../lib/validate/phone-meta.js';
import { parsePhone } from '../../lib/validate/phone.js';
import { track } from '../../lib/signals.js';
import { t, regionName, lang } from '../../i18n/index.js';

const EN = typeof Intl !== 'undefined' && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;
const enName = (c) => { try { return (EN && EN.of(c)) || c; } catch (e) { return c; } };

export default function PhoneField({ s, n, value, act, invalid }) {
  const ctx = s.ctx(n), code = lang();
  const parsed = value ? parsePhone(value, ctx.A['add-residence'] || ctx.A.country || s.guess) : null;
  const [cc, setCc] = useState(() => (parsed && parsed.country) || ctx.A['add-residence'] || ctx.A.country || s.guess || 'US');
  const [open, setOpen] = useState(false), [q, setQ] = useState(''), [act0, setAct] = useState(0);
  const box = useRef(null), srch = useRef(null), num = useRef(null);
  const nat = parsed && !parsed.bad ? parsed.national : String(value || '').replace(/^\+\d+\s*/, '');
  const list = useMemo(() => Object.keys(PHONE_META).map((c) => {
    const nm = regionName(c) || enName(c);
    return { c, nm, en: enName(c), d: PHONE_META[c][0], key: norm(`${nm} ${enName(c)} ${c} +${PHONE_META[c][0]} ${PHONE_META[c][0]}`) };
  }).sort((a, b) => a.nm.localeCompare(b.nm, code)), [code]);
  const nq = norm(q).trim().replace(/^\+/, '');
  const hits = nq ? list.filter((x) => x.key.includes(nq)) : list;
  const cur = list.find((x) => x.c === cc) || { c: cc, nm: enName(cc), d: (PHONE_META[cc] || ['1'])[0] };
  const set = (c, v) => act.answer(n, v ? `+${(PHONE_META[c] || ['1'])[0]} ${v}` : '');
  const pickC = (c) => { setCc(c); set(c, nat); setOpen(false); setQ(''); sound.click(themeId(s.prof), 'pick'); setTimeout(() => num.current && num.current.focus(), 0); };

  useEffect(() => { if (!open) return; setAct(0); const k = setTimeout(() => srch.current && srch.current.focus(), 30); const off = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); }; document.addEventListener('pointerdown', off); return () => { clearTimeout(k); document.removeEventListener('pointerdown', off); }; }, [open]);
  useEffect(() => { setAct(0); }, [q]);

  return (
    <div className={'phone6' + (invalid ? ' bad' : '') + (open ? ' open' : '')} ref={box}>
      <div className="ph6-f">
        <button type="button" className="ph6-cc" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={`${t('country_code')}: ${cur.nm} +${cur.d}`} data-snd="open">
          <Flag cc={cc} /><span className="ph6-cn">{cur.nm}</span><span className="ph6-d" dir="ltr">+{cur.d}</span><Icon n="chev" />
        </button>
        <input id="qi" ref={num} className="in6" type="tel" inputMode="tel" autoComplete={n === 'phone' ? 'tel-national' : 'off'} dir="ltr" value={nat}
          placeholder={t('v6_phone_ph')} aria-labelledby="qh" aria-describedby="er" aria-invalid={invalid || undefined} maxLength={20}
          onPaste={() => track.paste(n)}
          onChange={(e) => {
            const v = e.target.value;
            if (/^\s*(\+|00)/.test(v)) { const p = parsePhone(v, cc); if (p && !p.bad) { setCc(p.country); act.answer(n, `+${p.code} ${p.national}`); return; } }
            set(cc, v.replace(/[^\d\s()\-.]/g, ''));
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act.next(); } }} />
      </div>
      {open && (
        <div className="ph6-pop">
          <label className="ph6-s"><Icon n="search" /><span className="sr">{t('v6_cc_search')}</span>
            <input ref={srch} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('v6_cc_search')} autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setAct((a) => Math.min(hits.length - 1, a + 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setAct((a) => Math.max(0, a - 1)); }
                else if (e.key === 'Enter') { e.preventDefault(); if (hits[act0]) pickC(hits[act0].c); }
                else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
              }} />
          </label>
          <ul className="ph6-list" role="listbox" aria-label={t('country_code')}>
            {hits.slice(0, 250).map((x, k) => (
              <li key={x.c} role="option" aria-selected={x.c === cc} className={(x.c === cc ? 'sel ' : '') + (k === act0 ? 'act' : '')}
                onPointerDown={(e) => e.preventDefault()} onClick={() => pickC(x.c)} onMouseMove={() => k !== act0 && setAct(k)}>
                <Flag cc={x.c} /><span className="pl-n">{x.nm}{x.nm !== x.en && <small lang="en">{x.en}</small>}</span><span className="pl-d" dir="ltr">+{x.d}</span>
              </li>
            ))}
            {!hits.length && <li className="none" aria-disabled="true">{t('cb_none', { q })}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
