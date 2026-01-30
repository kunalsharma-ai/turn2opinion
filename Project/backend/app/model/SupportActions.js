import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";


export default mongooseModel(
    "SupportActions",
    {
        ticketNo: {
            type: String,
            trim: true
        },
        action: {
            type: String
        },
        createdBy: {
            type: String
        }
    }
)