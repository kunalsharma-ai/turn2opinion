import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
    "Response",
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        survey: {
            name: { type: String },
            slug: { type: String },
        },
        timeline: {
            start: { type: Date },
            end: { type: Date,required:false,default:null },
        },
        telemetry: [
            {
                key: { type: String },
                value: { type: String }
            }
        ],
        status: {
            type: String,
            trim: true,
            lowercase: true,
            default:"invited"
        },
        loi: {
            type: Number,
            default: 0
        },
        source: {
            type: String
        },
        points: {
            type: Number,
            required:true,
            default:0
        }
    },
    [
        [
            {
                "survey.slug":1,
                user:1
            },
            {
                unique:1
            }
        ]
    ],
    {
        methods: {
            async complete() {
                if (![null, "", "dropout", "invited"].includes(this.status)) throw new Error("Unable to change status of your response");
                this.status = "complete"
                await this.save()
                return this;
            },
            async terminate() {
                if (![null, "", "dropout", "invited"].includes(this.status)) throw new Error("Unable to change status of your response");
                this.status = "terminate"
                await this.save()
                return this;
            },
            async overquota() {
                if (![null, "", "dropout", "invited"].includes(this.status)) throw new Error("Unable to change status of your response");
                this.status = "overquota"
                await this.save()
                return this;
            }
        }
    }
);

