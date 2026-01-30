import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import pureIP from "express-pureip";
import mongoose from "mongoose";
import appRoute from "./routes/index.js";
import compression from "compression";
import { setOrigin, expressRoute, fsLogger } from "./utils/index.js";

(async () => {
    const env = {
        port: process.env.port ?? 3000,
        db: process.env.mongodb ?? "mongodb://db/mfr"
    }
    await mongoose.connect(env.db);
    const app = express();
    app
        .set("view-engine", "twig")
        .set('views', "views")
        .use([
            compression(),
            express.static("/src/public"),
            cors({
                origin: function (origin, callback) {
                    return callback(null, origin)
                }
            }),
            express.json(),
            express.urlencoded({
                extended: true
            }),
            cookieParser(),
            pureIP,
            fileUpload(),
            setOrigin,
            errorRoute,
            appRoute
        ])
        .use(expressRoute(
            async (req) => {
                fsLogger.Log("Fallback route", {
                    ...req.headers,
                    origin: req.origin
                })
                return { message: "Fallback route", status: "error" }
            },
            {}
        ))
        .listen(env.port, () => {
            fsLogger.Log(`Server started at port ${env.port}`)
        })
})();

async function errorRoute(error, req, res, next) {
    let { status, message } = error;
    if (isNaN(status)) status = 500;
    fsLogger.Log(`Error: ${error.message}`, {
        ...req.headers,
        origin: req.origin
    })
    return res.status(status).json({
        status: "error",
        message
    })
}