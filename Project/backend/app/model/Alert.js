import { MongooseModel } from "express-web-tools"
import mongoose from "mongoose";

const schema = new MongooseModel(
    "Alerts",
    mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        subtitle: {
            type: String,
            trim: true
        },
        cta: {
            type: String,
            trim: true
        },
        ctaType: {
            type: String,
            trim: true,
            default: "popup"
        }
    }),
    [],
    {},
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: true,
        timestamps: true
    }
)


export default schema.model();