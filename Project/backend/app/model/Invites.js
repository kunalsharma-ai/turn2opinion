import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "Invites",
    {
        invitedBy: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    })
    