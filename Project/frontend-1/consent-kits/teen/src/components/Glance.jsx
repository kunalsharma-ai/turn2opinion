// "At a glance": live diagrams and charts built from the page's own data — nothing here is invented.
//   FlowDiagram   the four steps on a wave; the line fills and the nodes light up as each step is done
//   GateDiagram   the activation rule: parent's turn AND teen's turn → account opens (lights follow the real state)
//   BarChart      how many of the 19 sections each of the six topics holds (from content/terms.js)
//   Donut         required vs optional permissions (from the consent list)
// All labels reuse existing, already-translated interface strings, so every language is covered.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons.jsx';
import { CHAPTERS } from '../content/terms.js';
import { useI18n } from '../i18n/I18n.jsx';

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useInView() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined' || reduced()) { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    const failsafe = setTimeout(() => setOn(true), 2500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);
  return [ref, on];
}

function Num({ to, go, ms = 1100 }) {
  const [v, setV] = useState(go && reduced() ? to : 0);
  useEffect(() => {
    if (!go) return undefined;
    if (reduced()) { setV(to); return undefined; }
    let raf; const t0 = performance.now();
    const step = (n) => { const k = Math.min(1, (n - t0) / ms); setV(Math.round(to * (1 - (1 - k) ** 3))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go, to, ms]);
  return <span className="num">{v}</span>;
}

const WAVE = 'M60 95 C150 20 230 20 300 95 S450 170 520 95 S650 20 700 95';
const NODE = [[60, 95], [300, 95], [520, 95], [700, 95]];
// phone layout: the same wave, drawn narrower so the labels stay readable without scrolling
const WAVE_S = 'M50 95 C90 30 130 30 170 95 S250 160 290 95 S370 30 410 95';
const NODE_S = [[50, 95], [170, 95], [290, 95], [410, 95]];
function useNarrow() {
  const [n, setN] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const m = window.matchMedia('(max-width: 720px)');
    const f = () => setN(m.matches);
    f(); m.addEventListener ? m.addEventListener('change', f) : m.addListener(f);
    return () => { m.removeEventListener ? m.removeEventListener('change', f) : m.removeListener(f); };
  }, []);
  return n;
}
const NODE_COLOR = ['#1f5bff', '#7c4dff', '#00b894', '#ff6a4d'];

function FlowDiagram({ stations, here }) {
  const { t } = useI18n();
  const [ref, on] = useInView();
  const done = stations.filter((s) => s.done).length;
  const frac = Math.max(0, Math.min(1, (done - 1) / 3));
  const still = reduced();
  const narrow = useNarrow();
  const WAVE_D = narrow ? WAVE_S : WAVE;
  const NODES = narrow ? NODE_S : NODE;
  return (
    <svg ref={ref} className={`fd ${on ? 'in' : ''} ${narrow ? 'sm' : ''}`} viewBox={narrow ? '0 0 460 180' : '0 0 760 180'} role="img" aria-label={`${t('progress')}: ${stations.map((s) => `${s.label}${s.done ? ' ✓' : ''}`).join(' · ')}`}>
      <defs>
        <linearGradient id="fdg" x1="0" x2="1"><stop offset="0" stopColor="#1f5bff" /><stop offset=".4" stopColor="#7c4dff" /><stop offset=".7" stopColor="#00b894" /><stop offset="1" stopColor="#ff6a4d" /></linearGradient>
        <filter id="fdglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <path className="fd-base" d={WAVE_D} />
      <path className="fd-flow" d={WAVE_D} />
      <path className="fd-fill" d={WAVE_D} pathLength="100" stroke="url(#fdg)" style={{ strokeDashoffset: 100 - frac * 100 }} />
      {still ? null : <circle r="6" className="fd-dot"><animateMotion dur="6s" repeatCount="indefinite" path={WAVE_D} /></circle>}
      {stations.map((s, i) => {
        const [x, y] = NODES[i];
        const isHere = here === s.id;
        return (
          <g key={s.id} className={`fd-n ${s.done ? 'done' : ''} ${isHere ? 'here' : ''}`} transform={`translate(${x} ${y})`} style={{ '--nc': NODE_COLOR[i], '--i': i }}>
            <circle className="fd-halo" r="34" />
            <circle className="fd-c" r="27" />
            {s.done ? <path className="fd-ck" d="M-9 1l6 6 12-13" /> : <text className="fd-t" y="7" textAnchor="middle">{i + 1}</text>}
            <text className="fd-l" y="56" textAnchor="middle">{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GateDiagram({ parent, teen, open }) {
  const { t } = useI18n();
  const pOn = parent === 'turned' || parent === 'ready' || parent === 'verifying';
  const tOn = teen === 'turned';
  const summary = `${t('lock_title')}: ${t('lock_parent')} ${pOn ? '✓' : '…'} + ${t('lock_teen')} ${tOn ? '✓' : '…'} → ${open ? t('lock_open') : t('lock_locked')}`;
  return (
    <svg className={`gd ${pOn ? 'p-on' : ''} ${tOn ? 't-on' : ''} ${open ? 'is-open' : ''}`} viewBox="0 0 440 210" role="img" aria-label={summary}>
      <path className="gd-w gd-wp" d="M78 56 C150 56 150 105 200 105" />
      <path className="gd-w gd-wt" d="M78 154 C150 154 150 105 200 105" />
      <path className="gd-w gd-wo" d="M250 105 L346 105" />
      <g transform="translate(50 56)"><circle className="gd-in gd-ip" r="28" /><g transform="translate(-13 -13)"><Icon name="family" size={26} decorative /></g></g>
      <g transform="translate(50 154)"><circle className="gd-in gd-it" r="28" /><g transform="translate(-13 -13)"><Icon name="hand" size={26} decorative /></g></g>
      <g transform="translate(225 105)"><rect className="gd-g" x="-27" y="-27" width="54" height="54" rx="16" /><text className="gd-and" y="9" textAnchor="middle">&amp;</text></g>
      <g transform="translate(378 105)"><circle className="gd-out" r="32" /><g transform="translate(-14 -14)"><Icon name={open ? 'unlock' : 'lock'} size={28} decorative /></g></g>
      <text className="gd-lab" x="50" y="22" textAnchor="middle">{t('lock_parent')}</text>
      <text className="gd-lab" x="50" y="204" textAnchor="middle">{t('lock_teen')}</text>
      <text className="gd-lab" x="436" y="166" textAnchor="end">{open ? t('lock_open') : t('lock_locked')}</text>
    </svg>
  );
}

function BarChart() {
  const { t } = useI18n();
  const [ref, on] = useInView();
  const max = Math.max(...CHAPTERS.map((c) => c.sections.length));
  const total = CHAPTERS.reduce((n, c) => n + c.sections.length, 0);
  return (
    <div ref={ref} className={`bc ${on ? 'in' : ''}`}>
      <div className="bc-total"><Num to={total} go={on} /><span>{t('sections')}</span></div>
      <ul className="bc-list">
        {CHAPTERS.map((c, i) => (
          <li key={c.id} style={{ '--g1': c.grade[0], '--g2': c.grade[1], '--w': `${(c.sections.length / max) * 100}%`, '--i': i }}>
            <span className="bc-ico"><Icon name={c.icon} size={16} decorative /></span>
            <span className="bc-name">{t(`ch_${c.id}`)}</span>
            <span className="bc-bar"><i /></span>
            <b className="bc-n"><Num to={c.sections.length} go={on} ms={800} /></b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Donut({ required, optional }) {
  const { t } = useI18n();
  const [ref, on] = useInView();
  const total = required + optional;
  const seg = (n) => (n / total) * 100;
  const gap = 2.5;
  return (
    <div ref={ref} className={`dn ${on ? 'in' : ''}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true" className="dn-svg">
        <defs>
          <linearGradient id="dng1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f5bff" /><stop offset="1" stopColor="#7c4dff" /></linearGradient>
          <linearGradient id="dng2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00b894" /><stop offset="1" stopColor="#52c8ff" /></linearGradient>
        </defs>
        <circle className="dn-track" cx="60" cy="60" r="44" />
        <circle className="dn-a" cx="60" cy="60" r="44" pathLength="100" stroke="url(#dng1)" style={{ strokeDasharray: `${seg(required) - gap} 100`, strokeDashoffset: 0 }} />
        <circle className="dn-b" cx="60" cy="60" r="44" pathLength="100" stroke="url(#dng2)" style={{ strokeDasharray: `${seg(optional) - gap} 100`, strokeDashoffset: -seg(required) }} />
      </svg>
      <div className="dn-mid"><Num to={total} go={on} /></div>
      <ul className="dn-key">
        <li className="a"><i /><span>{t('required')}</span><b>{required}</b></li>
        <li className="b"><i /><span>{t('optional')}</span><b>{optional}</b></li>
      </ul>
    </div>
  );
}

export default function Glance({ stations, here, parent, teen, open, required, optional }) {
  const { t } = useI18n();
  return (
    <section className="glance" aria-label={t('progress')}>
      <div className="card gl gl-flow"><FlowDiagram stations={stations} here={here} /></div>
      <div className="gl-row">
        <div className="card gl gl-gate"><h3 className="gl-t"><Icon name="lock" size={16} decorative />{t('lock_title')}</h3><GateDiagram parent={parent} teen={teen} open={open} /></div>
        <div className="card gl gl-bars"><h3 className="gl-t"><Icon name="layers" size={16} decorative />{t('sections')}</h3><BarChart /></div>
        <div className="card gl gl-dn"><h3 className="gl-t"><Icon name="shield" size={16} decorative />{t('required')} · {t('optional')}</h3><Donut required={required} optional={optional} /></div>
      </div>
    </section>
  );
}
