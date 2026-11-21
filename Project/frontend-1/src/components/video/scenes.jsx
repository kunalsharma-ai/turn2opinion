// Poster scenes for the page video templates (decorative, aria-hidden). Loaded on demand by
// VideoShowcase.jsx so they stay out of the main bundle.
import Icon from '../Icon.jsx';

const n = (k) => Array.from({ length: k }, (_, i) => i);

/* ---------------- poster scenes (decorative, aria-hidden) ---------------- */
export const SCENES = {
  premiere: () => (
    <>
      <span className="sc-curtain l" />
      <span className="sc-curtain r" />
      <span className="sc-beam b1" />
      <span className="sc-beam b2" />
      <span className="sc-bulbs t">{n(18).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="sc-bulbs b">{n(18).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="sc-count">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" />
          <circle className="sweep" cx="50" cy="50" r="44" pathLength="100" />
          <path d="M50 4v92M4 50h92" />
        </svg>
        <b>
          <em>3</em>
          <em>2</em>
          <em>1</em>
        </b>
      </span>
    </>
  ),
  blueprint: () => (
    <>
      <svg className="sc-plan" viewBox="0 0 400 225">
        <path className="draw" d="M40 170 C 90 170, 90 60, 150 60 S 220 160, 270 150 S 330 60, 360 55" />
        {[
          [40, 170],
          [150, 60],
          [270, 150],
          [360, 55]
        ].map(([x, y], i) => (
          <g key={i} style={{ '--i': i }} className="node">
            <circle cx={x} cy={y} r="11" />
            <text x={x} y={y + 4}>
              0{i + 1}
            </text>
          </g>
        ))}
        <path className="dim" d="M40 200 H360 M40 194 V206 M360 194 V206" />
        <text className="dimt" x="200" y="196">
          2 MIN · FULL JOURNEY
        </text>
      </svg>
      <span className="sc-compass">
        <i />
      </span>
    </>
  ),
  arcade: () => (
    <>
      <span className="sc-score">
        HI-SCORE <b>004500</b>
      </span>
      <span className="sc-invaders">
        {n(6).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-coins">
        {n(5).map((i) => (
          <i key={i} style={{ '--i': i }}>
            $
          </i>
        ))}
      </span>
      <span className="sc-ship" />
      <span className="sc-insert">INSERT OPINION</span>
      <span className="sc-scan" />
    </>
  ),
  lab: () => (
    <>
      <span className="sc-radar">
        <i className="ring r1" />
        <i className="ring r2" />
        <i className="ring r3" />
        <i className="sweep" />
        {n(5).map((i) => (
          <b key={i} className="blip" style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-hud l">
        {['AGE', 'REGION', 'INTERESTS', 'JOB'].map((t, i) => (
          <i key={t} style={{ '--i': i }}>
            {t}
            <s />
          </i>
        ))}
      </span>
      <span className="sc-hud r">
        MATCH <b>98%</b>
      </span>
    </>
  ),
  vault: () => (
    <>
      <span className="sc-door">
        <i className="ring o" />
        <i className="ring m" />
        <i className="ring c" />
        <i className="spokes">
          {n(6).map((i) => (
            <s key={i} style={{ '--i': i }} />
          ))}
        </i>
      </span>
      <span className="sc-rain">
        {n(9).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
    </>
  ),
  chat: () => (
    <span className="sc-thread">
      <i className="q" style={{ '--i': 0 }}>
        When do I get paid?
      </i>
      <i className="a" style={{ '--i': 1 }}>
        As soon as you reach your threshold
      </i>
      <i className="q" style={{ '--i': 2 }}>
        Can I use UPI?
      </i>
      <i className="a typing" style={{ '--i': 3 }}>
        <s />
        <s />
        <s />
      </i>
    </span>
  ),
  documentary: () => (
    <>
      <span className="sc-strip t">{n(24).map((i) => <i key={i} />)}</span>
      <span className="sc-strip b">{n(24).map((i) => <i key={i} />)}</span>
      <span className="sc-rec">
        <i /> REC
      </span>
      <span className="sc-tc">00:00:24:12</span>
      <span className="sc-frame">
        <i className="c tl" />
        <i className="c tr" />
        <i className="c bl" />
        <i className="c br" />
      </span>
    </>
  ),
  awards: () => (
    <>
      <span className="sc-spot" />
      <svg className="sc-laurel" viewBox="0 0 120 80">
        {n(6).map((i) => (
          <ellipse key={'l' + i} cx={34 - i * 3} cy={66 - i * 10} rx="6" ry="11" transform={`rotate(${-30 - i * 6} ${34 - i * 3} ${66 - i * 10})`} />
        ))}
        {n(6).map((i) => (
          <ellipse key={'r' + i} cx={86 + i * 3} cy={66 - i * 10} rx="6" ry="11" transform={`rotate(${30 + i * 6} ${86 + i * 3} ${66 - i * 10})`} />
        ))}
      </svg>
      <span className="sc-stars">
        {n(5).map((i) => (
          <i key={i} style={{ '--i': i }}>
            ★
          </i>
        ))}
      </span>
      <span className="sc-confetti">
        {n(14).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
    </>
  ),
  broadcast: () => (
    <>
      <span className="sc-bars">
        {n(7).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-onair">ON AIR</span>
      <span className="sc-waves">
        {n(3).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-ch">CH 02</span>
    </>
  ),
  magazine: () => (
    <span className="sc-cover">
      <b className="mast">T2O</b>
      <i className="issue">ISSUE 11 · OPINION</i>
      <i className="line l1">Earn online</i>
      <i className="line l2">without the myths</i>
      <i className="tag">+ 30 guides inside</i>
      <span className="code">{n(16).map((i) => <s key={i} style={{ '--w': (i * 7) % 4 + 1 }} />)}</span>
    </span>
  ),
  reader: () => (
    <span className="sc-page">
      {n(7).map((i) => (
        <i key={i} className={i === 2 || i === 4 ? 'hl' : ''} style={{ '--i': i, '--w': `${92 - ((i * 13) % 30)}%` }} />
      ))}
      <b className="ribbon" />
    </span>
  ),
  postcard: () => (
    <>
      <span className="sc-air" />
      <span className="sc-stamp">
        <Icon name="globe" size={30} />
        <small>T2O · 2026</small>
      </span>
      <svg className="sc-postmark" viewBox="0 0 140 60">
        <circle cx="30" cy="30" r="24" />
        <text x="30" y="34">
          DELHI
        </text>
        {n(4).map((i) => (
          <path key={i} d={`M60 ${14 + i * 10} q 10 -6 20 0 t 20 0 t 20 0 t 20 0`} />
        ))}
      </svg>
      <span className="sc-plane">
        <Icon name="plane" size={26} />
      </span>
    </>
  ),
  boarding: () => (
    <>
      <span className="sc-board">
        {['GATE', 'T2O', '01', 'BOARDING'].map((w, i) => (
          <i key={w} style={{ '--i': i }}>
            {w.split('').map((c, k) => (
              <s key={k} style={{ '--k': k }}>
                {c}
              </s>
            ))}
          </i>
        ))}
      </span>
      <span className="sc-route">
        <b>YOU</b>
        <i>
          <Icon name="plane" size={20} />
        </i>
        <b>$$$</b>
      </span>
    </>
  ),
  keyhole: () => (
    <>
      <span className="sc-dial">
        {n(12).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
        <b />
      </span>
      <span className="sc-key" />
      <span className="sc-code">
        {n(6).map((i) => (
          <i key={i} style={{ '--i': i }}>
            •
          </i>
        ))}
      </span>
    </>
  ),
  shield: () => (
    <>
      <span className="sc-shield">
        <Icon name="lock" size={40} />
      </span>
      <span className="sc-orbit">
        {n(8).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
    </>
  ),
  stars: () => (
    <span className="sc-ring">
      {n(12).map((i) => (
        <i key={i} style={{ '--i': i }}>
          ★
        </i>
      ))}
      <b>GDPR</b>
    </span>
  ),
  jar: () => (
    <>
      <span className="sc-jar">
        <i className="lid" />
        {n(4).map((i) => (
          <b key={i} className="ck" style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-crumbs">
        {n(8).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
    </>
  ),
  scroll: () => (
    <span className="sc-parch">
      <i className="rod t" />
      <span className="sheet">
        {n(6).map((i) => (
          <s key={i} style={{ '--i': i }} />
        ))}
      </span>
      <i className="rod b" />
      <b className="quill" />
    </span>
  ),
  /* Earn · Consumers — a sun rises over a day of small purchases that float up as coins. */
  sunrise: () => (
    <>
      <span className="sc-sun">
        {n(12).map((i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </span>
      <span className="sc-hills" />
      {['🛒', '☕', '📱', '🍿', '✈️', '👟'].map((e, i) => (
        <span key={i} className="sc-float" style={{ '--i': i }}>
          <em>{e}</em>
          <b>+pts</b>
        </span>
      ))}
      {n(3).map((i) => (
        <span key={i} className="sc-cloud" style={{ '--i': i }} />
      ))}
    </>
  ),
  /* Earn · Business professionals — a gold market board: bars climb, a ticker tape runs. */
  ticker: () => (
    <>
      <span className="sc-bars">
        {[38, 62, 48, 80, 66, 92].map((h, i) => (
          <i key={i} style={{ '--i': i, '--h': `${h}%` }} />
        ))}
      </span>
      <svg className="sc-trend" viewBox="0 0 400 225" preserveAspectRatio="none">
        <path d="M30 175 L95 130 L160 150 L225 90 L290 110 L370 40" pathLength="100" />
      </svg>
      <span className="sc-tape">
        <b>
          {['IT ▲', 'FINANCE ▲', 'HR ▲', 'MARKETING ▲', 'HEALTH-TECH ▲', 'LOGISTICS ▲', 'LEGAL ▲', 'RETAIL ▲'].map((t) => (
            <em key={t}>{t}</em>
          ))}
        </b>
      </span>
    </>
  ),
  /* Earn · Minors — a sticker album: stickers slap on, wobble, and an XP bar fills. */
  sticker: () => (
    <>
      {['🎮', '🎧', '⭐', '🛹', '📚', '🍕', '🎨', '🚀'].map((e, i) => (
        <span key={i} className="sc-stk" style={{ '--i': i }}>
          {e}
        </span>
      ))}
      <span className="sc-xp">
        <b>LVL 3</b>
        <i />
      </span>
      {n(14).map((i) => (
        <s key={i} className="sc-dot" style={{ '--i': i }} />
      ))}
    </>
  ),
  /* Earn · Who can join — an open passport; three stamps thump down one after another. */
  passport: () => (
    <span className="sc-pass">
      <i className="pg l">
        <s />
        <s />
        <s />
        <s />
      </i>
      <i className="pg r" />
      {['CONSUMER 18+', 'PRO B2B', 'TEEN 13–17'].map((t, i) => (
        <b key={t} className="stamp" style={{ '--i': i }}>
          {t}
        </b>
      ))}
    </span>
  ),
  atlas: () => (
    <>
      <svg className="sc-map" viewBox="0 0 400 225">
        <path className="route" d="M40 180 C 120 120, 140 200, 210 130 S 320 60, 350 70" />
        <circle cx="40" cy="180" r="6" />
      </svg>
      <span className="sc-pin">
        <Icon name="pin" size={30} />
      </span>
      <span className="sc-rose">N</span>
    </>
  )
};

