// Business professional sign-up: three optional "Your work" questions. They are not new fields:
// the questions, options and answer keys come from the existing profile question bank
// (data/welcome/bank.json: empstat, industry, add-seniority) and are saved as ordinary profile
// answers with the sign-up request, so the Professional profile never asks them again.
import { useEffect, useState } from 'react';
import Icon from '../Icon.jsx';
import { Field } from '../FormFields.jsx';
import { filled, loadBank, optionsFor } from './WelcomeQuestions.jsx';

export const PRO_WORK_KEYS = ['empstat', 'industry', 'add-seniority'];

/** The answers worth sending: only questions still visible with an answer from their own list. */
export function proWorkAnswers(bank, work) {
  if (!bank) return {};
  const out = {};
  PRO_WORK_KEYS.forEach((k) => {
    const opts = optionsFor(bank, 'pro', k, work, {});
    if (filled(work[k]) && opts && opts.some((o) => o[1] === work[k])) out[k] = work[k];
  });
  return out;
}

export default function ProWorkFields({ work, onChange }) {
  const [bank, setBank] = useState(null);
  useEffect(() => {
    let live = true;
    loadBank()
      .then((b) => live && setBank(b))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  if (!bank) return null;
  const set = (k, v) => {
    const next = { ...work, [k]: v };
    // a changed employment status can hide the industry question or change its options
    if (k === 'empstat') {
      const io = optionsFor(bank, 'pro', 'industry', next, {});
      if (!io || !io.some((o) => o[1] === next.industry)) next.industry = '';
    }
    onChange(next);
  };
  return (
    <fieldset className="jf-group">
      <legend>
        <Icon name="briefcase" size={15} /> Your work <span className="jf-optional">Optional</span>
      </legend>
      <p className="jf-hint">Helps us send the right business studies first. You can skip these and answer later in your Professional profile.</p>
      <div className="jf-work">
        {PRO_WORK_KEYS.map((k) => {
          const opts = optionsFor(bank, 'pro', k, work, {});
          if (!opts || !opts.length) return null;
          return (
            <div key={k} data-k={`work-${k}`}>
              <Field id={`j-work-${k}`} label={bank.Q[k][0]}>
                <select id={`j-work-${k}`} className="input" value={work[k] || ''} onChange={(e) => set(k, e.target.value)}>
                  <option value="">Choose (optional)</option>
                  {opts.map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
