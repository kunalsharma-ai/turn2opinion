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

    // optional check: expired
    if (otp.expiresAt < new Date()) {
      return { expired: true };
    }
    return otp;
  }
}

export default new OTPController(otpModel);
