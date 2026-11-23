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
        title: {
            type: String
        },
        status: {
            type: String,
            default: "credited"
        }
    }),
    [
        // one profile-completion credit per member and profile (see utils/profileRewards.js)
        [
            { user: 1, origin: 1, category: 1, remarks: 1 },
            { unique: true, partialFilterExpression: { category: "profile" } }
        ]
    ],
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