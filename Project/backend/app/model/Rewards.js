import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";

let schema = new MongooseModel(
    "Rewards",
    mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        remarks: {
            type: String
        },
        status: {
            type: String,
            default: "credited"
        }
    }),
    null,
    null,
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: false,
        timestamps: true
    }
)

const Rewards = schema.model();
export default Rewards;