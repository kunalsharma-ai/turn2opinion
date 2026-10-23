import { CrudRoutes } from "express-web-tools";
import { Testimonial as controllerTestimonial } from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";

class TestimonialRouter extends CrudRoutes{
    
}
let routes = new TestimonialRouter(
    "",
    controllerTestimonial,
    {
        add: [isAuthenticated],
        delete: [isAuthenticated],
        list: [],
        global: [],
        listAll: [],
        order: [isAuthenticated],
        read: [isAuthenticated],
        update: [isAuthenticated]
    }
);

export default routes.publish()