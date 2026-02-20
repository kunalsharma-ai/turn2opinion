import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

const idConfig= mongooseModel(
    "idconfig",
    {
        module:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        limit:{
            type:Number,
            min:[1,"Minimum limit is 1"],
            validate:{
                validator: Number.isInteger,
                message:"Fractional value is not allowed"
            }
        },
        prefix:{
            type:String,
            required:false,
            default:"",
            trim:true,
            uppercase:true
        },
        suffix:{
            type:String,
            required:false,
            default:"",
            trim:true,
            uppercase:true
        },
        sequence:{
            type:Number,
            required:true,
            default:1
        },
        minLength:{
            type:Number,
            required:true,
            default:4
        }
    },
    [
        [
            {
                origin:1,
                module:1
            },
            {
                unique:true
            }
        ]
    ]
)

export async function generateID(module, origin, count) {
    console.log("Looking for ")
    console.log({module,
        origin,
        isActive: true,
        isDeleted: false})
    let info = await idConfig.findOne({
        module,
        origin,
        isActive: true,
        isDeleted: false
    });

    if (!info) throw new Error("Misconfigured");
    if (info.limit <= count) throw new Error("No more support tickets allowed")
    const temp = `${info.prefix}${Number(info.sequence).toString().padStart(info.minLength, "0")}${info.suffix}`;
    info.sequence++;
    await info.save();
    return temp;
}
export default idConfig;