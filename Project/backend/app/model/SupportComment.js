import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "SupportComment",
    {
        ticketNo: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            trim: true,
            lowercase: true
        },
        message: {
            type: String
        },
        attachments: [{
            type: String
        }]
    }
)