import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";
const string = {
    type: String,
    trim: true,
    lowercase: true
}
export default mongooseModel(
    "Answer",
    {
        user: {
            type:String,
            trim:true,
            required: true
        },
        question: {
            type:String,
            trim:true,
            required: true
        },
        answer: {
            type: [{
                type:String,
                trim:true
            }],
            select: false
        },
    },
    [
        [
            {
                user: 1,
                question: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],
    {
        virtuals: {
            Answer: function () {
                if (this.answer instanceof Array && this.answer.length === 1) return this.answer[0];
                return this.answer;
            }
        },
        pre: {
            save: function (next) {
                if (typeof this.answer === "string") this.answer = [this.answer];
                next();
            }
        }
    }
)