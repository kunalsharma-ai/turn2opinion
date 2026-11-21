import { CrudController } from "../utils/index.js";
import { OTP as otpModel } from "../model/index.js";

class OTPController extends CrudController {
  async generate(user, channel, origin, validFor) {
    const otp = new otpModel();
    return await otp.generateOTP(user, channel, origin, validFor);
  }

  async verify(user, channel, origin, code) {
    const otp = await otpModel.findOne({ user, channel, origin, code });
    if (!otp) return null;

    // An expired link is treated like a missing one. (It used to return { expired: true }, which is
    // truthy, so callers that check `if (!otp)` accepted expired links.)
    if (otp.expiresAt < new Date()) return null;
    return otp;
  }
}

export default new OTPController(otpModel);
