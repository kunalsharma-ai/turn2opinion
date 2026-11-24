import {CrudRoutes} from "express-web-tools";
import {Socials as socialsController} from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";
import { requireAdmin } from "../../utils/access.js";
// what the public site shows: anyone reads, only admins add, change or remove

class SocialRoutes extends CrudRoutes {}

const router=new SocialRoutes(
    "/",
    socialsController,
    {
        add: [requireAdmin],
        update: [requireAdmin],
        delete: [requireAdmin],
    }
);

export default router.publish()