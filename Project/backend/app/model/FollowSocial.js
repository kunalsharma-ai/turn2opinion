import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";

const FollowSocial = new MongooseModel(
    "FollowSocial",
    mongoose.Schema({
        platform: { type: String, required: true },
        user: { type: String, required: true },
        screenshot: { type: String, required: true },
        status: { type: String, required: true, enum: ["pending", "approved", "rejected"] },
        points: { type: Number, required: true, default: 0 },
        created:{
            By: {
                select:false,
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            From: {
                select:false,
                type: String,
            },
        },
        updated:{
            By: {
                select:false,
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            From: {
                select:false,
                type: String,
            },
        }
    }),
    [
        [
            {
                platform: 1,
                user: 1,
                origin: 1
            },
            {
                unique: true
            }
        ],
    ],
    {},
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: true,
        timestamps: true,
    }
);

export default FollowSocial.model();