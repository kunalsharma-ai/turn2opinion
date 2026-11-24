// Failed sign-ins and wrong codes, counted per account (not per address, so a bot that changes its address gets no
// further). Rows expire on their own.
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: { type: String },                 // e.g. "login:www.myfrequentrewards.com:asha@example.com"
    count: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
    expiresAt: { type: Date, required: true },
}, { collection: "AuthThrottle", versionKey: false });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.AuthThrottle || mongoose.model("AuthThrottle", schema);
