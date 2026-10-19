/* Job title normalisation for B2B targeting: free text → { seniority, department }.
   "Chief Marketing Officer" → C-level / Marketing;  "Sr. Software Engineer" → Senior professional / Engineering. */
import { ok, soft, block, clean } from './core.js';

export const SENIORITY = ['c_level', 'owner', 'vp', 'director', 'manager', 'senior', 'professional', 'entry', 'student'];
const SEN = [
  ['owner', /\b(owner|founder|co-?founder|proprietor|partner|principal|self[- ]employed|entrepreneur)\b/i],
  ['c_level', /\b(chief|ceo|cfo|coo|cto|cio|cmo|cso|ciso|cpo|chro|president|managing director|md\b|executive director|chairman|chairwoman|board member)\b/i],
  ['vp', /\b(vice president|vp|svp|evp|avp|head of|general manager|gm\b)\b/i],
  ['director', /\b(director|dir\.)\b/i],
  ['manager', /\b(manager|mgr|lead|supervisor|team lead|superintendent|coordinator|controller)\b/i],
  ['senior', /\b(senior|sr\.?|staff|principal engineer|specialist ii|expert|consultant)\b/i],
  ['student', /\b(student|trainee|apprentice)\b/i],
  ['entry', /\b(intern|junior|jr\.?|assistant|associate|graduate|fresher|entry)\b/i],
];
const DEP = [
  ['marketing', /\b(marketing|brand|cmo|growth|seo|content|communications?|pr|advertising|digital media)\b/i],
  ['sales', /\b(sales|account (executive|manager)|business development|bdm|bde|cso|revenue)\b/i],
  ['finance', /\b(financ|cfo|account(ant|ing)|audit|tax|treasur|controller|payroll|investment|bank)/i],
  ['it', /\b(it\b|cio|ciso|information technology|systems? admin|network|security|devops|infrastructure|helpdesk|support engineer)/i],
  ['engineering', /\b(engineer|developer|programmer|software|cto|architect|data scien|machine learning|qa|test(ing)? engineer)/i],
  ['product', /\b(product|ux|ui|designer|research and development|r&d)\b/i],
  ['hr', /\b(hr|human resources|chro|talent|recruit|people)\b/i],
  ['operations', /\b(operations|coo|logistics|supply chain|production|plant|warehouse|facilities)\b/i],
  ['procurement', /\b(procurement|purchas|buyer|sourcing|vendor)/i],
  ['legal', /\b(legal|lawyer|attorney|counsel|compliance|advocate|solicitor|paralegal)\b/i],
  ['medical', /\b(doctor|physician|surgeon|nurse|pharmac|dentist|clinic|medical|therap|radiolog|veterinar)/i],
  ['education', /\b(teacher|professor|lecturer|tutor|principal|educat|trainer|academic)/i],
  ['customer_service', /\b(customer (service|support|success)|call cent|client service)/i],
  ['admin', /\b(admin|office|secretary|receptionist|clerk|executive assistant|pa\b)/i],
  ['executive', /\b(ceo|managing director|president|general manager|founder|owner|chairman)\b/i],
];
export function classifyTitle(t) {
  const s = clean(t);
  const sen = (SEN.find(([, r]) => r.test(s)) || ['professional'])[0];
  const dep = (DEP.find(([, r]) => r.test(s)) || ['other'])[0];
  return { seniority: sen, department: dep };
}
export function validateJobTitle(raw) {
  const v = clean(raw);
  if (!v) return block('required');
  if (v.length < 2 || !/\p{L}{2,}/u.test(v)) return block('title_short');
  if (v.length > 100) return block('too_long', { max: 100 });
  if (/^(test|none|na|n\/a|nothing|job|work|employee|asdf|xyz)$/i.test(v)) return block('title_placeholder');
  return ok(v, classifyTitle(v));
}
