// The request that the current code is running for.
//
// Controllers are shared singletons and expressRoute sets `Controller.request = req` before each call. With two
// requests in flight (say one for T2O and one for MHO), the second one overwrote the first one's request while the
// first was still awaiting the database, so its next query could filter on the other brand's origin. Every request
// now runs inside its own AsyncLocalStorage context, and CrudController reads the request from there first.
import { AsyncLocalStorage } from "node:async_hooks";

const store = new AsyncLocalStorage();

export const currentRequest = () => store.getStore();

// Express middleware: everything after it (handlers and their awaits) sees this request.
export function bindRequest(req, res, next) {
    store.run(req, next);
}

// Run fn as another request (a member and brand of the caller's choosing), e.g. a member's profile progress worked out
// inside an admin screen.
export const withRequest = (req, fn) => store.run(req, fn);
