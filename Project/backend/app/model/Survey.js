import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";
const lowerCaseRequiredString = {
    type: String,
    required: true,
    lowercase: true,
    trim: true
}
export default mongooseModel(
    "Survey",
    {
        slug: {
            ...lowerCaseRequiredString
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        icon: {
            type: String,
            trim: true
        },
        summary: {
            type: String,
            trim: true
        },
        category: {
            ...lowerCaseRequiredString
        },
        source: {
            ...lowerCaseRequiredString
        },
        points: {
            type: Number,
            min: [0, "Survey must have some points"]
        },
        thankyou: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        pages: [],
        active: {
            from: {
                type: Date,
            },
            to: {
                type: Date
            }
        },
        status:{
            type:String,
            lowercase:true,
            trim:true,
            required:true,
            default:"draft"
        },
        loi: {
            type: Number,
            required: true
        },
        autoInvite: {
            type: Boolean,
            default: false
        },
        filters: {},
        batchSize: {
            type: Number
        },
        link: {
            type: String
        }
    },
    [
        [
            {
                name: 1,
                category:1,
                origin: 1
            },
            {
                unique:true
            }
        ],
        [
            {
                slug: 1,
                category:1,
                origin: 1
            },
            {
                unique:true
            }
        ],
        
    ]
);

