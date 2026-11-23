// v6 interface sounds, routed to the member area's own feedback (which honours the member's sound setting).
import { feedback, tap } from '../../theme/feedback.js';

const noop = () => {};
export const sound = {
  ui: (k) => { if (k === 'coin' || k === 'gem') tap(); },
  chime: () => feedback('points'),
  click: noop, tick: noop, prime: noop, build: noop, windows: noop
};
