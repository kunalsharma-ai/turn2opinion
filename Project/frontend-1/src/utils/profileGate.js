export const RESUME_KEY = 't2o_resume_signup';

// phone aur address dono nahi => step 3 abhi bhara nahi gaya
export const isProfileIncomplete = (u) =>
  !u?.phone && !(Array.isArray(u?.address) && u.address.length > 0);

// join page ke resume flow ke liye data save karta hai, user id return karta hai
export function saveResumeData(u) {
  const uid = u._id || u.id;
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify({
      user: uid,
      firstName: u.name?.first,
      lastName: u.name?.last,
      email: u.mail,
      dob: u.dob ? String(u.dob).slice(0, 10) : '',
      gender: u.gender,
     type: u.category ? (u.category === 'b2b' ? 'pro' : 'consumer') : (savedType || 'consumer'),
    }));
  } catch (e) { /* ignore */ }
  let savedType = null;
try { savedType = localStorage.getItem('t2o_join_type'); } catch (e) { /* ignore */ }
  return uid;
}