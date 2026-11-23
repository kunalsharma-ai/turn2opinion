// Quality signals from the v6 design (paste events in identity fields). The member area sends nothing extra
// to the API, so this only keeps the count in memory for the current visit.
const pastes = {};
export const track = { paste: (n) => (pastes[n] = (pastes[n] || 0) + 1) };
