import { APIResponse } from "./index.js"
export default function expressRoute(callback, Controller) {
    return async (req, res) => {
        try {
            Controller.request = req;
            const { message, data, token } = await callback(req);
            if (!token)
                return res.json(APIResponse.Success(message, data))
            res.cookie("authorization", `Bearer ${token}`, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax", // or "none" if cross-site
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.json({
                status: "success",
                message
            })
        } catch (error) {
            console.log(error)
            res.status(404).json(APIResponse.Error(error.message))
        }
    }
}