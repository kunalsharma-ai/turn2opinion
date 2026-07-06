import {CrudRoutes} from "express-web-tools";
import {Socials as socialsController} from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";

class SocialRoutes extends CrudRoutes {}

const router=new SocialRoutes(
    "/",
    socialsController,
    {
        add:[isAuthenticated],
        update:[isAuthenticated],
        delete:[isAuthenticated],
    }
);

export default router.publish()