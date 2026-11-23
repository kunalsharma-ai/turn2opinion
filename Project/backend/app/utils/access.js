// Express middleware for member data (T2O-SEC-03 lock-down; see ./memberAccess.js for the rules).
//   requireMember - a signed-in member; sets req.isAdmin from the role read fresh from the database
//   requireAdmin  - a signed-in member whose role is an admin role
//   selfOrAdmin   - the member named in the route parameter, or an admin
import isAuthenticated from "./isAuthenticated.js";
import { User as userModel } from "../model/index.js";
import { isAdminRole } from "./memberAccess.js";

async function roleOf(id) {
    const u = await userModel.findById(id).select("+role").lean();
    return u?.role || "";
}
const deny = (res, status, message) => res.status(status).json({ status: "error", message });

export function requireMember(req, res, next) {
    return isAuthenticated(req, res, async () => {
        try {
            req.isAdmin = isAdminRole(await roleOf(req.user?._id));
        } catch (e) {
            req.isAdmin = false;
        }
        return next();
    });
}

export function requireAdmin(req, res, next) {
    return isAuthenticated(req, res, async () => {
        try {
            const role = await roleOf(req.user?._id);
            if (!isAdminRole(role)) return deny(res, 403, "Forbidden");
            req.isAdmin = true;
            return next();
        } catch (e) {
            return deny(res, 403, "Forbidden");
        }
    });
}

export function selfOrAdmin(param = "id") {
    return (req, res, next) =>
        isAuthenticated(req, res, async () => {
            try {
                if (String(req.user?._id) === String(req.params[param])) {
                    req.isSelf = true;
                    req.isAdmin = isAdminRole(await roleOf(req.user?._id));
                    return next();
                }
                if (!isAdminRole(await roleOf(req.user?._id))) return deny(res, 403, "Forbidden");
                req.isAdmin = true;
                return next();
            } catch (e) {
                return deny(res, 403, "Forbidden");
            }
        });
}
