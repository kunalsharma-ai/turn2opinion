import mongoose from "mongoose";
import { mongooseModel } from "../utils/index.js";

export default mongooseModel(
  "OTP",
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, default: (Date.now() + 900) }
  },
  [
    [{ user: 1, type: 1, origin: 1 }, { unique: true }],
    [{ expiresAt: 1 }, { expireAfterSeconds: 0 }]
  ],
  {
    method: {
      async generateOTP(user, channel, origin, validFor) {
        const OTPModel = this.constructor;

        // check for existing OTP
        const existing = await OTPModel.findOne({ user, channel, origin });
        if (existing) return existing;

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otpDoc = await OTPModel.create({
          user,
          channel,
          code: otpCode,
          expiresAt: (Date.now() + validFor),
          origin, // required by your base model
        });
        return otpDoc;
      },
      async remove(){
        return this.deleteOne();
      }
    }
  });

