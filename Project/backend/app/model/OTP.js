import mongoose from "mongoose";
import crypto from "node:crypto";
import { mongooseModel } from "../utils/index.js";

const OTP = mongooseModel(
  "OTP",
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) },
    attempts: { type: Number, default: 0 }
  },
  [
    // One live code per member, channel and site. (This used to say `type`, a field the model does not have, so
    // every code shared one key per member: a second code for another channel failed with E11000 - see below.)
    [{ user: 1, channel: 1, origin: 1 }, { unique: true }],
    [{ expiresAt: 1 }, { expireAfterSeconds: 0 }]
  ],
  {
    method: {
      async generateOTP(user, channel, origin, validFor) {
        const OTPModel = this.constructor;

        // check for existing OTP
        const existing = await OTPModel.findOne({ user, channel, origin });
        // if (existing) return existing;
        if (existing) {
        const timePassed = Date.now() - new Date(existing.createdAt).getTime();

        if (timePassed < 60 * 1000) {
            return {
                cooldown: true,
                remaining: Math.ceil((60 * 1000 - timePassed) / 1000)
            };
        }
        // 60 seconds passed, create a new OTP
        await OTPModel.deleteOne({ _id: existing._id });
    }

        // a cryptographic random number (the old pseudo-random codes could be predicted from earlier ones)
        const otpCode = String(crypto.randomInt(100000, 1000000));

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

// One-off clean-up: databases created before the fix still carry the old {user, type, origin} index, which lets a
// member hold only one code. With it in place the guardian's consent step failed while the teen's activation code
// was being created, so the teen never got the link to set a password. Mongoose does not drop old indexes itself.
const LEGACY_INDEX = "user_1_type_1_origin_1";
async function dropLegacyIndex() {
  try {
    const indexes = await OTP.collection.indexes();
    if (indexes.some((i) => i.name === LEGACY_INDEX)) {
      await OTP.collection.dropIndex(LEGACY_INDEX);
      console.log(`OTP: dropped legacy index ${LEGACY_INDEX}`);
    }
  } catch (e) {
    if (e?.codeName !== "NamespaceNotFound") console.error("OTP: could not check legacy index", e?.message);
  }
}
if (mongoose.connection.readyState === 1) dropLegacyIndex();
else mongoose.connection.once("open", dropLegacyIndex);

export default OTP;
