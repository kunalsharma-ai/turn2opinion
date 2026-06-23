import mongoose from "mongoose";

import { MongooseModel } from "express-web-tools"

let mongooseModel = new MongooseModel(
    "Validation",
    new mongoose.Schema({
        question: {
            type: String,
            required: true
        },
        pattern: {
            type: String
        },
        parentValue: [{
            type: String
        }]
    }),
    null,
    null,
    {
        softDelete: false,
        multitenant: true,
        auditEnforce: true,
        timestamps: true
    }
)
export default mongooseModel.model();