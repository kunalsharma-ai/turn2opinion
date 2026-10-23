import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "Profile",
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        icon: {
            type: String,
        },
        pages:[],
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        points:{
            type:Number,
            min:[0,"at least zero points required in each profile"],
            default:50
        }
    },
    [
        [
            {
                name: 1,
                category: 1,
                origin: 1
            },
            {
                unique: true
            }
        ],
        [
            {
                slug: 1,
                category: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],

)