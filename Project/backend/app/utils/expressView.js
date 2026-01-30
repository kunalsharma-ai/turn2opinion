import {APIResponse} from "./index.js"
export default function expressRoute(callback, Controller) {
    return async (req, res) => {
        try {
            Controller.request = req;
            const { view, data } = await callback(req);
            // return res.json(data.config)
            return res.render(view,data);
        } catch (error) {
            res.status(401).json(APIResponse.Error(error.message))
        }
    }
}