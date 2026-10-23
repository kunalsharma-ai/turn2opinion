import { MongooseModel } from "express-web-tools";
import mongoose from "mongoose";

const testimonialsSchema = new MongooseModel(
    "Testimonial",
    new mongoose.Schema({
        rate: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Replace with your registered User model name
            required: true
        }
    }),
    [],
    {},
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: false,
        timestamps: true
    }
)
export default testimonialsSchema.model()
