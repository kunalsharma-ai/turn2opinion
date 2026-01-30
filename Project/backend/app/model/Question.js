import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";
const string = {
    type: String,
    trim: true,
    lowercase: true
}
export default mongooseModel(
    "Question",
    {
        name: {
            ...string,
            required: true,
        },
        label: {
            ...string,
            required: true,
            lowercase: false
        },
        type: {
            ...string,
            required: true,
            // enum:["open end single line","open end multiline","checkbox","radio","select-single","select-multiple","phone","email","zipcode","document"]            
        },
        parent: {
            ...string
        },
        description: {
            type: String
        },
        category: [{
            ...string,
            required: true,
        }],
        adminLabel:{
            type:String,
        },
        isRequired:{
            type:Boolean,
            default:true
        },
        isEditable:{
            type:Boolean,
            default:true
        },
        size:{
            type:String,
            default:"6"
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
                unique: true
            }
        ]
    ],
)