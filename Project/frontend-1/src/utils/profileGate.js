import { splitPhone } from './signup.js';

export const RESUME_KEY = 't2o_resume_signup';

// The last sign-up step saves the home country (address). The mobile number is now collected on
// the first step, so only the missing address means the member hasn't finished.
export const isProfileIncomplete = (u) => !(Array.isArray(u?.address) && u.address.length > 0);

// Saves what the Join page needs to resume at the last step, returns the user id.
export function saveResumeData(u) {
  const uid = u._id || u.id;
  let savedType = null;
  try {
    savedType = localStorage.getItem('t2o_join_type');
  } catch {
    /* ignore */
  }
  const ph = splitPhone(u.phone);
  try {
    sessionStorage.setItem(
      RESUME_KEY,
      JSON.stringify({
        user: uid,
        firstName: u.name?.first,
        lastName: u.name?.last,
        email: u.mail,
        dob: u.dob ? String(u.dob).slice(0, 10) : '',
        gender: u.gender,
        dial: ph.dial,
        phone: ph.phone,
        type: u.category === 'minor' ? 'minor' : u.category === 'b2b' ? 'pro' : u.category ? 'consumer' : savedType || 'consumer'
      })
    );
  } catch {
    /* ignore */
  }
  return uid;
}
