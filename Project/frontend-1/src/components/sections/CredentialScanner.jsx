// "A real research company stands behind us": a verification console. A scan line sweeps the Frequent Research
// logo, each credential flips from "checking" to "verified" in turn, and a stamp lands at the end.
import { useState } from 'react';
import { SITE } from '../../config/site.js';
import { useInView } from '../../hooks/useMounted.js';
import { FrLogo } from '../Brand.jsx';
import Icon from '../Icon.jsx';

export default function CredentialScanner() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [run, setRun] = useState(0);
  return (
    <div className={`scanner ${inView ? 'is-run' : ''}`} ref={ref} key={run} style={{ '--n': SITE.certifications.length }}>
      <div className="sc-head">
        <span className="sc-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Company check · Frequent Research Fieldwork Solutions Pvt. Ltd.</span>
      </div>
      <div className="sc-logo">
        <FrLogo width={190} />
        <span className="sc-beam" aria-hidden="true" />
        <span className="sc-corners" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <ul className="sc-list">
        {SITE.certifications.map((c, i) => (
          <li key={c.id} style={{ '--i': i }}>
            <span className="sc-ico">
              <Icon name="shield" size={16} />
            </span>
            <span className="sc-txt">
              <strong>{c.label}</strong>
              <small>{c.note}</small>
            </span>
            <span className="sc-state">
              <span className="sc-spin" aria-hidden="true" />
              <span className="sc-ok">
                <Icon name="check" size={13} /> Verified
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="sc-foot">
        <span className="sc-stamp" aria-hidden="true">
          <Icon name="check" size={18} /> Real company
        </span>
        <button type="button" className="sc-rerun" onClick={() => setRun((r) => r + 1)}>
          <Icon name="refresh" size={14} /> Run the check again
        </button>
      </div>
    </div>
  );
}
