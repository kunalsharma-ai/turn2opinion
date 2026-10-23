import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { PROFILES } from '../lib/data.js';
import { profileKey, statusOf } from '../lib/storage.js';
import { towerSpec, towerSVG, towerBox, cityOrder, CITY_DEFS, levelOf, levelSteps } from '../lib/city-art.js';
import { catProfiles, isDone, isSeen, isPaid, markSeen, pendingKeys, cityStats, fmtUsd, LEVEL_KEYS, POINTS_PER_PROFILE, POINTS_PER_USD, subscribeRewards, rewardsVersion, deliveredPoints } from '../lib/rewards.js';
import { skyFirework, flyToPill, dust, pillPop } from '../lib/cityfx.js';
import { sound } from '../lib/sound.js';
import { reducedMotion } from '../lib/fx.js';
import { profileEmoji } from '../lib/emoji.js';
import { pnameT } from '../lib/present.js';
import { Icon } from './Icon.jsx';
import Odo from './Odo.jsx';
import { t, nf, lang, useI18n } from '../i18n/index.js';
import { ensureCityStyles } from '../lib/city-style.js';

ensureCityStyles();

/* "Your Opinion City" — the reward board on the hub (lazy-loaded from Hub.jsx).
   Every profile is a plot in the respondent's skyline. Completing it builds that profile's tower in its
   world's colours: it rises out of the ground, its windows light up floor by floor, its emoji pops onto the
   roof and a firework carries +100 Opinion Points to the points pill in the header.
   The sky, glow and neon take the current language's palette (--l1…--l5) and every sound is played on the
   language's own instrument, so each of the 135 languages gets its own city at night. */

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const CRANE = '<svg viewBox="0 0 60 70" aria-hidden="true"><path d="M8 70V8M14 70V8M8 14l6 6M14 14l-6 6M8 26l6 6M14 26l-6 6M8 38l6 6M14 38l-6 6M8 50l6 6M14 50l-6 6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M2 8h56M8 2l3 6M14 2l-3 6M2 8l9-6 3 6" stroke="currentColor" stroke-width="1.8" fill="none"/><rect x="0" y="9" width="8" height="5" rx="1" fill="currentColor"/></svg>';
const HOOK = '<svg viewBox="0 0 12 40" aria-hidden="true"><path d="M6 0v28" stroke="currentColor" stroke-width="1.2"/><path d="M6 28a4 4 0 1 0 4 4" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>';
const MINI = (n) => `<svg viewBox="0 0 40 24" aria-hidden="true">${[[2, 14], [10, 6], [19, 10], [27, 2], [33, 12]].slice(0, n).map(([x, y]) => `<rect x="${x}" y="${y}" width="${x === 27 ? 6 : 7}" height="${24 - y}" rx="1"/>`).join('')}</svg>`;

export default function OpinionCity({ cat, onOpen }) {
  useI18n();
  useSyncExternalStore(subscribeRewards, rewardsVersion, rewardsVersion);
  const ps = useMemo(() => catProfiles(cat), [cat]);
  const order = useMemo(() => cityOrder(ps), [ps]);
  const bySlug = useMemo(() => new Map(ps.map((p) => [p.s, p])), [ps]);
  const art = useMemo(() => new Map(order.map((s) => { const sp = towerSpec(s); return [s, { sp, ar: '40 / ' + towerBox(sp).vbH, lit: towerSVG(sp, 'lit'), plot: towerSVG(sp, 'plot') }]; })), [order]);
  const [shown, setShown] = useState(() => new Set(ps.filter((p) => isDone(p) && isSeen(profileKey(p))).map((p) => p.s)));
  const [rise, setRise] = useState('');
  const [banner, setBanner] = useState('');
  const root = useRef(null), sky = useRef(null), scroller = useRef(null);

  const st = cityStats(cat), built = shown.size, lv = levelOf(built, ps.length), steps = levelSteps(ps.length);
  const pts = deliveredPoints(), next = order.map((s) => bySlug.get(s)).find((p) => !isDone(p) && statusOf(p).st === 'prog') || order.map((s) => bySlug.get(s)).find((p) => !isDone(p) && p.s !== 'additional') || order.map((s) => bySlug.get(s)).find((p) => !isDone(p));
  const nextI = next ? PROFILES.indexOf(next) : -1;
  const lvName = t(LEVEL_KEYS[lv.i]);
  const back = order.filter((_, i) => i % 2 === 0), front = order.filter((_, i) => i % 2 === 1);

  /* ---------- delivery: newly completed profiles build their towers ---------- */
  useEffect(() => {
    const keys = pendingKeys(cat);
    if (!keys.length) {   /* e-mail links open the site at #rewards */
      if (location.hash === '#rewards') setTimeout(() => root.current && root.current.scrollIntoView({ behavior: 'auto', block: 'start' }), 300);
      return undefined;
    }
    let alive = true;
    (async () => {
      await wait(250);
      const el = root.current; if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
      await wait(reducedMotion() ? 50 : 750);
      let have = new Set(ps.filter((p) => isDone(p) && isSeen(profileKey(p))).map((p) => p.s));
      for (const [n, k] of keys.entries()) {
        if (!alive) return;
        const slug = k.split(':')[1], lvBefore = levelOf(have.size, ps.length).i;
        have = new Set(have).add(slug);
        if (n >= 3 || reducedMotion()) { setShown(new Set(have)); markSeen(k); continue; }   // after three, the rest appear at once
        setShown(new Set(have)); setRise(slug);
        await buildTower(slug, k);
        markSeen(k);
        const lvAfter = levelOf(have.size, ps.length).i;
        if (lvAfter > lvBefore) { setBanner(t('rw_levelup', { level: t(LEVEL_KEYS[lvAfter]) })); sound.levelUp(lang()); await wait(2600); setBanner(''); }
        await wait(250);
      }
      if (!alive) return;
      setRise('');
      const sr = document.getElementById('sr'); if (sr) sr.textContent = t('rw_board_aria', { level: t(LEVEL_KEYS[levelOf(have.size, ps.length).i]), pts: nf(deliveredPoints()), usd: fmtUsd(deliveredPoints()), n: nf(have.size), total: nf(ps.length) });
    })();
    return () => { alive = false; };
  }, [cat]); // eslint-disable-line react-hooks/exhaustive-deps

  async function buildTower(slug, key) {
    await wait(30);
    const tw = root.current && root.current.querySelector(`.tower[data-s="${slug}"]`), sc = scroller.current, host = sky.current;
    if (!tw || !host) return;
    if (sc && sc.scrollWidth > sc.clientWidth + 4) { const r = tw.getBoundingClientRect(), s = sc.getBoundingClientRect(); sc.scrollTo({ left: sc.scrollLeft + r.left - s.left - s.width / 2 + r.width / 2, behavior: 'smooth' }); await wait(350); }
    const code = lang(), { sp } = art.get(slug);
    sound.build(code);
    await wait(640);
    const hr = host.getBoundingClientRect(), r = tw.getBoundingClientRect();
    dust(host, r.left - hr.left + r.width / 2, r.bottom - hr.top - 4);
    await wait(180); sound.windows(code, 6);
    await wait(760);
    const art2 = tw.querySelector('.tw-art').getBoundingClientRect();
    const x = art2.left - hr.left + art2.width / 2, y0 = art2.top - hr.top, y1 = Math.max(46, y0 - 70);
    sound.firework();
    await skyFirework(host, x, y0, y1, [sp.a, sp.a2, sp.a3, '#ffd66b'], t('rw_plus', { n: POINTS_PER_PROFILE }));
    if (isPaid(key)) { await wait(700); return; }   // points already landed on the completion screen
    const landed = await flyToPill({ x: hr.left + x, y: hr.top + y1 }, t('rw_plus', { n: POINTS_PER_PROFILE }), [sp.a2, sp.a3, '#ffd66b'], root.current.querySelector('.neon-v'));
    if (landed) { pillPop(landed); sound.land(code); }
  }

  const towerEl = (s, row) => {
    const p = bySlug.get(s); if (!p) return null;
    const { sp, ar, lit, plot } = art.get(s), on = shown.has(s), name = pnameT(p), i = PROFILES.indexOf(p);
    const cls = 'tower ' + (on ? 'built' : 'plot') + (rise === s ? ' rise' : '') + (p === next ? ' next' : '') + (sp.h > 0.86 ? ' tall' : '');
    return (
      <li key={s} className="tw-li">
        <button type="button" className={cls} data-s={s} style={{ aspectRatio: ar, '--ta': sp.a, '--ta2': sp.a2 }} onClick={() => onOpen(i)}
          aria-label={on ? t('rw_tower_aria', { name }) : t('rw_plot_aria', { name })}>
          {p === next && !on && <span className="crane" aria-hidden="true"><span className="crane-m" dangerouslySetInnerHTML={{ __html: CRANE }} /><span className="crane-h" dangerouslySetInnerHTML={{ __html: HOOK }} /></span>}
          <span className="tw-clip"><span className="tw-art" dangerouslySetInnerHTML={{ __html: on ? lit : plot }} /></span>
          {on ? <span className="tw-emo" aria-hidden="true">{profileEmoji(s)[0]}</span> : <span className="tw-plus" aria-hidden="true">+100</span>}
          <span className="tw-tip" aria-hidden="true"><b>{name}</b><small>{on ? t('rw_earned') : t('rw_plus', { n: POINTS_PER_PROFILE })}</small></span>
        </button>
      </li>
    );
  };

  return (
    <section className={'city' + (st.max ? ' maxed' : '')} id="rewards" ref={root} aria-labelledby="rw-h" style={{ '--n': back.length }}>
      <svg className="city-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs dangerouslySetInnerHTML={{ __html: CITY_DEFS }} /></svg>
      <div className="sky" ref={sky}>
        <span className="sky-stars" aria-hidden="true" /><span className="sky-moon" aria-hidden="true" /><span className="sky-cloud c1" aria-hidden="true" /><span className="sky-cloud c2" aria-hidden="true" />
        <span className="sky-glow" aria-hidden="true" />
        <div className="sky-head">
          <div className="sky-t">
            <p className="city-eyebrow"><span className="lv-badge" dangerouslySetInnerHTML={{ __html: MINI(lv.i + 1) }} />{lvName}</p>
            <h2 id="rw-h">{t('rw_title')}</h2>
            <p className="city-sub">{t('rw_sub', { n: nf(POINTS_PER_PROFILE), rate: nf(POINTS_PER_USD), usd: fmtUsd(POINTS_PER_USD) })}</p>
          </div>
          <div className="neon" role="img" aria-label={t('rw_board_aria', { level: lvName, pts: nf(pts), usd: fmtUsd(pts), n: nf(built), total: nf(ps.length) })}>
            <span className="neon-l">{t('rw_points')}</span>
            <span className="neon-v"><Odo value={pts} /><small>{t('rw_pts')}</small></span>
            <span className="neon-usd"><span>{t('rw_cash')}</span><b>{fmtUsd(pts)}</b></span>
          </div>
        </div>
        <div className="sky-scroll" ref={scroller}>
          <div className="skyline">
            <ol className="crow cback" aria-label={t('rw_title')}>{back.map((s) => towerEl(s, 'b'))}</ol>
            <span className="haze" aria-hidden="true" />
            <ol className="crow cfront" aria-label={t('rw_title')}>{front.map((s) => towerEl(s, 'f'))}</ol>
          </div>
        </div>
        <div className="street" aria-hidden="true"><i /></div>
        {banner && <div className="lvup" role="status"><span className="beam b1" aria-hidden="true" /><span className="beam b2" aria-hidden="true" /><b>{banner}</b></div>}
      </div>
      <div className="city-foot">
        <div className="lit-row">
          <span className="lit-t"><b>{t('rw_lit', { n: nf(built), total: nf(ps.length) })}</b></span>
          <span className="lit-strip" aria-hidden="true">{order.map((s) => <i key={s} className={shown.has(s) ? 'on' : ''} style={{ '--ta': art.get(s).sp.a }} />)}</span>
        </div>
        <div className="city-chips">
          {lv.next != null ? <span className="cchip"><Icon n="target" />{t('rw_next_level', { n: nf((lv.next - built) * POINTS_PER_PROFILE), level: t(LEVEL_KEYS[lv.i + 1]) })}</span> : <span className="cchip gold"><Icon n="sparkle" />{t('rw_max')}</span>}
          {!st.max && <span className="cchip"><Icon n="wallet" />{t('rw_next_usd', { n: nf(Math.max(0, st.nextUsd - pts)), usd: fmtUsd(st.nextUsd) })}</span>}
          <span className="cchip soft"><Icon n="gift" />{t('rw_rate', { rate: nf(POINTS_PER_USD), usd: fmtUsd(POINTS_PER_USD) })}</span>
        </div>
        <ol className="lv-track" aria-label={t('rw_level')}>
          {steps.map((v, k) => (
            <li key={k} className={(k < lv.i ? 'past' : k === lv.i ? 'cur' : '')} aria-current={k === lv.i ? 'step' : undefined}>
              <span className="lv-ic" aria-hidden="true" dangerouslySetInnerHTML={{ __html: MINI(k + 1) }} />
              <b>{t(LEVEL_KEYS[k])}</b><small>{nf(v * POINTS_PER_PROFILE)} {t('rw_pts')}</small>
            </li>
          ))}
        </ol>
        {next && <button type="button" className="btn pr city-cta" onClick={() => onOpen(nextI)}><span aria-hidden="true">🏗️</span>{t('rw_cta', { name: pnameT(next) })}<Icon n="arrow-r" className="flip" /></button>}
      </div>
    </section>
  );
}
