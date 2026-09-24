import express from "express";
import { asyncHandler, HttpError } from "express-web-tools";
import { cpi } from "../../utils/CPI.js";

const projectCategories = {
    consumer: "b2c",
    business: "b2b",
    genpop: "b2c",
    b2c: "b2c",
    b2b: "b2b"
}

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .post(asyncHandler(
        async (req, res) => {
            const data = cpi.calculate(
                (req.body.category instanceof Array ? req.body.category : [req.body.category]).map(category => projectCategories[category] ?? category),
                req.body.subcategory,
                req.body.ir,
                req.body.loi,
                req.body.country
            )
            res.json({ status: "success", message: "Not implemented", data })
        }
    ))
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
router
    .route('/categories')
    .get(asyncHandler(async (req, res) => {

        return res.json({
            status: "success",
            message: "",
            data: cpi.getCategories(projectCategories[req.query.category] ?? "")
        })
    }))
    .post(asyncHandler(
        async (req, res) => {
            return res.json({
                status: "success",
                message: "",
                data: cpi.getCategories(projectCategories[req.body.category] ?? "")
            })
        }
    ))
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
router
    .route('/:id')
    .get(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .post(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;