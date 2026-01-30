import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "Batch",
    {
        name: { type: String, required: true },
        survey:{
            type: String,
        },
        parameters: [],
        emails: [{ type: String, required: true }],
        subject: {
            type: String
        },
        template: {
            type: String
        },
        sender: {
            type: String
        },
        scheduledAt: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
    },
    [
        [
            {
                name: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ]
)