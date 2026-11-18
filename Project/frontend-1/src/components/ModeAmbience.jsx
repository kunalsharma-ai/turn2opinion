// Light and dark each get their own ambience, not just a colour swap (Kunal, 18 Nov 2026).
// Light: warm sunlight from the top corner, slow rays and golden motes drifting up.
// Dark: a twinkling star field, a faint aurora along the top and the odd shooting star.
// One fixed, pointer-events-none layer that CSS shows for the active mode only (html[data-mode]).
// Off with prefers-reduced-motion and on low-power devices (see widgets.css).
export default function ModeAmbience() {
  return (
    <div className="amb" aria-hidden="true">
      <div className="amb-day">
        <i className="amb-sun" />
        <i className="amb-rays" />
        {Array.from({ length: 9 }).map((_, k) => (
          <i key={k} className="amb-mote" style={{ '--k': k }} />
        ))}
      </div>
      <div className="amb-night">
        <i className="amb-aurora" />
        <i className="amb-moon" />
        {Array.from({ length: 26 }).map((_, k) => (
          <i key={k} className="amb-star" style={{ '--k': k }} />
        ))}
        <i className="amb-shoot s1" />
        <i className="amb-shoot s2" />
      </div>
    </div>
  );
}
