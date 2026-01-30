import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "Option",
    {
        question: {
            type: String
        },
        label: {
            type: String
        },
        value: {
            type: String
        },
        parentValue: [{
            type: String
        }]
    },
    [
        [
            {
                question: 1,
                value: 1,
                origin: 1,
                label:1
            },
            {
                unique: 1
            }
        ]
    ]
)