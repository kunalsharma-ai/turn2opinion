import mongoose from "mongoose";
import {MongooseModel} from "express-web-tools";

const Socials = new MongooseModel(
    "Socials", 
    mongoose.Schema({
        platform: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        icon:{
            type: String,
        },
        iconspecs:{color:{type:String,default:"#000000"}},
        points:{
            type: Number,
            required: true,
            min: [0, "Points must be greater than 0"]
        }
    }),
    [
        [
            {
                platform: 1,
                origin: 1
            },
            {
                unique: true
            }
        ],
        [
            {
                url: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],
    {

    },
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: true,
        timestamps: true,
    }
);

export default Socials.model();