import express from "express";
import { User as userController, Answer as answerController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token, staticFeasibility } from "../../utils/index.js"
import { asyncHandler, HttpError } from "express-web-tools";

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await userController.list()
            return { message, data: data.length };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            let message = "";
            let filters = Object.fromEntries(Object.entries(req.body).map(fltr => {
                console.log(fltr)
                if (fltr[1] instanceof Array) return fltr;
                if (fltr[0] === "Country") {
                    return ["country", Object.keys(fltr[1])]
                }
                return [fltr[0], Object.keys(fltr[1])]
            }))
            if ("Age" in filters) {
                let temp = filters.Age.map(age => {
                    console.log(age)
                    let start = new Date("0000-01-01")
                    let end = new Date("0000-12-31")
                    let today = new Date();
                    end.setFullYear(today.getFullYear() - age.min)
                    start.setFullYear(today.getFullYear() - age.max)
                    return {
                        dob: {
                            $gt: start,
                            $lt: end
                        }
                    }
                })
                delete (filters.Age);
                filters["$or"] = temp;
            }
            let data = await answerController.feasibility(filters)
            const country = filters.country;
            if (!country || country.length === 0) throw new HttpError(402, "Invalid request")
            const staticCount = staticFeasibility.feasibility(country[0], Object.fromEntries(Object.entries(filters).filter(v => v[0] !== "country")))
            return { message, data: data.length + staticCount };
        },
        answerController
    ))
    .put(

        expressRoute(
            async req => {
                // Read all entries
                let message = "";
                let data = await userController.filterUsers(req.body.query)
                return { message, data: data };
            },
            userController
        )
    )
router
    .route("/options/:country/:field")
    .post(
        asyncHandler(
            async (req, res) => {
                const data = staticFeasibility.getOptions(req.params.country, req.params.field);           
                console.log({
                    status: "success",
                    data
                })
                return res.json({
                    status: "success",
                    data
                })
            }
        )
    )
    .get(
        asyncHandler(
            async (req, res) => {
                const data = staticFeasibility.getOptions(req.params.country, req.params.field);
                console.log({
                    status: "success",
                    data
                })
                return res.json({
                    status: "success",
                    data
                })
            }
        )
    )
export default router;