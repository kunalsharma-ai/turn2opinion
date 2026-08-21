import { asyncHandler, CrudRoutes } from "express-web-tools";
import { Alerts } from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";
class AlertRoutes extends CrudRoutes {
    // async add(req, res, next) {
    //     Alerts.request = req;
    //     const { users, title, subtitle, cta } = req.body;
    //     for (let index = 0; index < users.length; index++) {
    //         const user = users[index];
    //         await Alerts.create({
    //             user,
    //             title,
    //             subtitle,
    //             cta
    //         })
    //     }
    //     return this.response(res,[],"user alerted")
    // }
}
const Routes = new AlertRoutes(
    "",
    Alerts,
    {
        global: [isAuthenticated]
    }
);
export default Routes.publish();