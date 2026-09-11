import { CrudRoutes } from "express-web-tools";
import { Rewards as controllerRewards } from "../../controller/index.js";

let routes = new CrudRoutes(
    "",
    controllerRewards
);

export default routes.publish()