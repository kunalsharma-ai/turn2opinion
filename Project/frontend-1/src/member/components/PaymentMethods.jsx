// Payment methods (Round 23): add, change and choose the primary way to receive rewards, right inside
// My account. Same endpoints and answer keys as the old My account page:
//   GET  /api/v1/option/payment-method        the methods on offer
//   POST /api/v1/me { questions: PAY_KEYS }    saved details
//   PATCH /api/v1/me/answer { <key>: value }   save a detail or the primary method
import { useEffect, useState } from 'react';
import { actions } from '../data/source.js';
import { t } from '../i18n/t.js';
import { t as t6 } from '../v6/i18n/index.js';
import { validateUpi, validateBankCode, validateBankAccount } from '../v6/lib/validate/misc.js';
import { validateEmail } from '../v6/lib/validate/email.js';
import { Badge, Button, Card, Icon, cx, useToast } from './ui.jsx';

const FIELDS = {
  'wire-transfer': [
    { key: 'payment-method-bank-name', label: 'Bank name', ph: 'e.g. HDFC Bank', v: (x) => (String(x).trim().length >= 2 ? null : 'Enter your bank name') },
    { key: 'payment-method-bank-ifsc', label: 'IFSC / SWIFT / IBAN', ph: 'HDFC0001234', v: validateBankCode },
    { key: 'payment-method-bank-account', label: 'Account number', ph: 'Account number', im: 'numeric', v: validateBankAccount }
  ],
  upi: [{ key: 'payment-method-upi', label: 'UPI ID', ph: 'name@bank', v: validateUpi }],
  paypal: [{ key: 'payment-method-paypal', label: 'PayPal email', ph: 'name@example.com', type: 'email', v: validateEmail }],
  'amazon-gift-card': [{ key: 'payment-method-amazon', label: 'Amazon account email', ph: 'name@example.com', type: 'email', v: validateEmail }]
};
const ICON = { 'wire-transfer': 'bank', upi: 'phone', paypal: 'wallet', 'amazon-gift-card': 'gift' };

/** A validator result (v6 model) or a plain string, as a message; null when the value is fine. */
function problem(v, x) {
  if (!String(x ?? '').trim()) return 'Required';
  const r = v(x);
  if (!r) return null;
  if (typeof r === 'string') return r;
  return r.level === 'block' ? t6('v_' + r.code, r.vars || {}) : null;
}
const mask = (k, x) => {
  const s = String(x || '');
  return /account/.test(k) && s.length > 4 ? '•••• ' + s.slice(-4) : s;
};

export default function PaymentMethods({ id }) {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [fail, setFail] = useState(false);
  const [open, setOpen] = useState(null);
  const [draft, setDraft] = useState({});
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    actions
      .paymentMethods()
      .then((d) => live && setData(d))
      .catch(() => live && setFail(true));
    return () => {
      live = false;
    };
  }, []);

  const values = data?.values || {};
  const primary = values['payment-method-primary'] || '';
  const hasData = (m) => (FIELDS[m] || []).length > 0 && FIELDS[m].every((f) => String(values[f.key] ?? '').trim());
  const options = (data?.options || []).filter((o) => FIELDS[o.value]).sort((a, b) => (a.value === primary ? -1 : b.value === primary ? 1 : 0));

  const edit = (m) => {
    setOpen(open === m ? null : m);
    setErrs({});
    setDraft(Object.fromEntries((FIELDS[m] || []).map((f) => [f.key, values[f.key] ?? ''])));
  };

  const save = async (m) => {
    const e = {};
    FIELDS[m].forEach((f) => {
      const p = problem(f.v, draft[f.key]);
      if (p) e[f.key] = p;
    });
    setErrs(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      const body = Object.fromEntries(FIELDS[m].map((f) => [f.key, String(draft[f.key]).trim()]));
      // the first method saved becomes the primary one, so rewards always have somewhere to go
      if (!primary || !hasData(primary)) body['payment-method-primary'] = m;
      await actions.savePayment(body);
      setData((d) => ({ ...d, values: { ...d.values, ...body } }));
      setOpen(null);
      toast('Payment details saved.');
    } catch (err) {
      toast(err?.message && !/request failed/i.test(err.message) ? err.message : 'We could not save that. Please try again.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const makePrimary = async (m) => {
    if (!hasData(m)) return edit(m);
    const prev = primary;
    setData((d) => ({ ...d, values: { ...d.values, 'payment-method-primary': m } }));
    try {
      await actions.savePayment({ 'payment-method-primary': m });
      toast('Primary payment method updated.');
    } catch {
      setData((d) => ({ ...d, values: { ...d.values, 'payment-method-primary': prev } }));
      toast('We could not change that. Please try again.', 'error');
    }
  };

  return (
    <Card id={id} title={t('ma.payment')} icon="wallet" className="xid-card xpay">
      <p className="mb-card__lead">Add how you want to receive rewards. Your primary method is used for payouts.</p>
      {fail && <p className="mb-small">We could not load your payment methods. Please refresh the page.</p>}
      {!data && !fail && <div className="xpay__skel" role="status" aria-label={t('loading')} />}
      <ul className="xpay__list">
        {options.map((o) => {
          const filled = hasData(o.value);
          const isP = primary === o.value && filled;
          const isOpen = open === o.value;
          return (
            <li key={o.value} className={cx('xpay__item', isP && 'is-primary', isOpen && 'is-open')}>
              <div className="xpay__row">
                <span className="xpay__icon" aria-hidden="true">
                  <Icon name={ICON[o.value] || 'wallet'} size={18} />
                </span>
                <span className="xpay__main">
                  <strong>{o.label}</strong>
                  <span className="xpay__sub">{filled ? FIELDS[o.value].map((f) => mask(f.key, values[f.key])).join(' · ') : 'Not added yet'}</span>
                </span>
                {isP ? (
                  <Badge tone="success" icon="check">
                    Primary
                  </Badge>
                ) : filled ? (
                  <button type="button" className="xpay__link" onClick={() => makePrimary(o.value)}>
                    Make primary
                  </button>
                ) : null}
                <button type="button" className="xpay__edit" aria-expanded={isOpen} onClick={() => edit(o.value)}>
                  {filled ? 'Edit' : 'Add'}
                </button>
              </div>
              {isOpen && (
                <form
                  className="xpay__form"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    save(o.value);
                  }}
                >
                  {FIELDS[o.value].map((f) => (
                    <label key={f.key} className={cx('mb-field', errs[f.key] && 'has-error')}>
                      <span className="mb-field__label">{f.label}</span>
                      <input
                        className="mb-input"
                        type={f.type || 'text'}
                        inputMode={f.im}
                        placeholder={f.ph}
                        autoComplete="off"
                        value={draft[f.key] ?? ''}
                        aria-invalid={!!errs[f.key]}
                        onChange={(e) => {
                          setDraft((d) => ({ ...d, [f.key]: e.target.value }));
                          setErrs((x) => ({ ...x, [f.key]: undefined }));
                        }}
                      />
                      {errs[f.key] && (
                        <span className="mb-field__error" role="alert">
                          {errs[f.key]}
                        </span>
                      )}
                    </label>
                  ))}
                  <div className="xpay__actions">
                    <Button type="submit" size="sm" busy={busy}>
                      Save
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
