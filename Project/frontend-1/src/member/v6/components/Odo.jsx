import { nf } from '../i18n/index.js';

/* Rolling odometer for Opinion Points. Each digit is a column of the language's own digits (Latin, Arabic-Indic,
   Devanagari, Bengali…) that rolls to its new value; separators stay put. Columns are keyed from the right so
   1,900 → 2,000 rolls every column instead of re-rendering the whole number. The visible number is
   aria-hidden: callers put the full value in an aria-label. */
const DIG = new Map();
const digitsFor = (s0) => { let d = DIG.get(s0); if (!d) { d = Array.from({ length: 10 }, (_, i) => nf(i)); DIG.set(s0, d); } return d; };

export default function Odo({ value, className = '' }) {
  const s = nf(value), digits = digitsFor(nf(0)), chars = [...s];
  return (
    <span className={'odo ' + className} aria-hidden="true">
      {chars.map((ch, i) => {
        const key = chars.length - i, d = digits.indexOf(ch);
        if (d < 0) return <span key={'s' + key} className="odo-s">{ch}</span>;
        return (
          <span key={'d' + key} className="odo-c">
            <span className="odo-r" style={{ '--d': d }}>{digits.map((x, j) => <span key={j}>{x}</span>)}</span>
            <span className="odo-w">{ch}</span>
          </span>
        );
      })}
    </span>
  );
}
