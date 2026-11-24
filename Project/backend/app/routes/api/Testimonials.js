import { CrudRoutes } from "express-web-tools";
import { Testimonial as controllerTestimonial } from "../../controller/index.js";
import { isAuthenticated } from "../../utils/index.js";
import { requireAdmin } from "../../utils/access.js";
// what the public site shows: anyone reads, only admins add, change or remove

class TestimonialRouter extends CrudRoutes{
    
}
let routes = new TestimonialRouter(
    "",
    controllerTestimonial,
    {
        add: [requireAdmin],
        delete: [requireAdmin],
        list: [],
        global: [],
        listAll: [],
        order: [requireAdmin],
        read: [isAuthenticated],
        update: [requireAdmin]
    }
);

export default routes.publish()