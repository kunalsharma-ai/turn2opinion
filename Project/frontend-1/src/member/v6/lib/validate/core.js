/* Validation result model shared by the browser and the server (no DOM, no i18n in this folder).
   Four levels — "flag ≠ reject":
     pass    everything looks normal
     soft    unusual but possibly legitimate → the respondent is asked to confirm once, a flag is recorded
     stepup  needs extra verification (OTP, CAPTCHA, consent) before it counts as trusted
     block   cannot be accepted (impossible value, confirmed fake pattern, manipulated value)
   Messages are codes (e.g. "name_digits"); the UI turns them into text with t('v_' + code, vars). */
export const PASS = 'pass', SOFT = 'soft', STEPUP = 'stepup', BLOCK = 'block';
export const RANK = { pass: 0, soft: 1, stepup: 2, block: 3 };

export const ok = (norm, meta) => ({ level: PASS, norm, meta });
export const soft = (code, vars, norm, meta) => ({ level: SOFT, code, vars, norm, meta });
export const stepup = (code, vars, norm, meta) => ({ level: STEPUP, code, vars, norm, meta });
export const block = (code, vars) => ({ level: BLOCK, code, vars });
/* the most serious of several results */
export const worst = (...rs) => rs.filter(Boolean).reduce((a, b) => (RANK[b.level] > RANK[a.level] ? b : a), ok());

export const clean = (v) => String(v ?? '').normalize('NFC').replace(/[​-‍﻿]/g, '').replace(/\s+/g, ' ').trim();
export const letters = (s) => (String(s).match(/\p{L}/gu) || []).length;
export const isLatin = (s) => /^[\p{Script=Latin}\s'’.\-]+$/u.test(s);
export const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
