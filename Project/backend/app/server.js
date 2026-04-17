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
                origin: ["https://t2o.sampledge.duckdns.org", "https://admin.sampledge.duckdns.org"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization", "test"],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
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
                    endpoint:req.path,
                    origin: req.origin
                })
                return { message: `Fallback route: ${req.path} is not available`, status: "error" }
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