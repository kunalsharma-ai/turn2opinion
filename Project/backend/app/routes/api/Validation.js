import { CrudRoutes, asyncHandler } from "express-web-tools";
import { Validation as validationController } from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";

let validationRoutes = new CrudRoutes(
    "/",
    validationController,
    {
        list: [isAuthenticated],
        listAll: [isAuthenticated],
        add: [isAuthenticated],
        update: [isAuthenticated],
        delete: [isAuthenticated],
    }
)
let routes = validationRoutes.publish()
routes.post(
    "/:id",
    asyncHandler(
        async (req, res) => {            
            const data = await validationController.filterAndRead(
                req.params.id,
                req.body
            )
            return res.json({
                status: "success",
                message: "under development",
                data
            })
        }
    )
)
export default routes;