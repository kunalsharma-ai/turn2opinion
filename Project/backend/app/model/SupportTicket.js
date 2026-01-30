import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";
import { generateID } from "./idConfig.js";

export default mongooseModel(
    "SupportTicket",
    {
        ticketNo: {
            type: String,
            trim: true
        },
        department: {
            type: String,
            lowercase: true,
            trim: true
        },
        category: {
            type: String,
            lowercase: true,
            trim: true
        },
        subject: {
            type: String
        },
        description: {
            type: String
        },
        attachments: [{
            type: String
        }],
        priority: {
            type: String,
            lowercase: true,
            trim: true
        },
        tags: [{
            type: String
        }],
        status: {
            type: String,
            lowercase: true,
            trim: true,
            default:"new"
        },
        issueRaisedBy: {
            name: {
                type: String
            },
            email: {
                type: String,
                lowercase: true,
                trim: true,
                required: true
            }
        },
        supportAgent: {
            name: {
                type: String,
                required: false
            },
            email: {
                type: String,
                lowercase: true,
                trim: true,
                required: false
            }
        },
        updateTimeline: [
            {
                status: {
                    type: String,
                    lowercase: true,
                    trim: true
                },
                updatedBy: {
                    type: String,
                    lowercase: true,
                    trim: true
                },
                updatedAt: {
                    type: Date,
                    default: (new Date())
                }
            }
        ],
        assignedTo: {
            type: String,
            lowercase: true,
            trim: true
        }
    },
    [
        [
            {
                origin: 1,
                ticketNo: 1
            },
            {
                unique: true
            }
        ]
    ],
    {
        pre: {
            save: async function (next) {
                if (this.isNew) {
                    let count = await mongoose.model("SupportTicket").find({ origin: this.origin }).countDocuments();
                    this.ticketNo = await generateID("support-ticket", this.origin, count);
                }
            }
        }
    }
);

