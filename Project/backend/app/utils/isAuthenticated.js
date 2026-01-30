import API from "./API.js";
import { verify } from "./token.js";
import {User as userModel} from "../model/index.js"
import { Mutate } from "./index.js";
export default async function isAuthenticated(req, res, next) {
    const authtoken = req.headers.authorization??req.cookies.authorization;
    
    if (!authtoken) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized [No Token Found]"
        })
    }
    const token = authtoken.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized- [Invalid Token]"
        })
    }
    try {
        let user = verify(token);
        if (!user || !user._id || !req.origin) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized--[Token Mismatched]",
                info: [
                    !user,
                    !user._id,
                    !req.origin
                ],
                user
            })
        }

        if (user.origin !== req.origin) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden"
            })
        }

        req.user = await getUserDetails(user);
        return next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            status: "error",
            message: "token expired"
        })
    }
}

async function getUserDetails(user) {
    let usr=Mutate(await userModel.findById(user._id));
    return usr;
}