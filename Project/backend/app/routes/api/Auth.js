import { HttpError, asyncHandler, API } from "express-web-tools"
import express from "express";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate, Token } from "../../utils/index.js"
import JWT from "jsonwebtoken";
import {
  User as userController
} from "../../controller/index.js";

async function getSocialChannels() {

  return resp;
}
const router = express.Router();
router
  .route(["/socials", "/social"])
  .get(
    expressRoute(async (req) => {
      let { token } = req.query;
      if (!token) return { redirect: "/?signup=1" };
      // The sign-on service's key comes from the environment. It used to be written here in the code, so anyone who
      // saw the code could make a token for any e-mail and be signed in as that member. Without the key social
      // sign-on is off. Tokens must be HS256 and at most 15 minutes old.
      const key = process.env.SOCIAL_JWT_SECRET;
      if (!key || key.length < 32) return { redirect: "/?signup=1" };
      let info;
      try {
        info = JWT.verify(String(token), key, { algorithms: ["HS256"], maxAge: "15m" });
      } catch (e) {
        return { redirect: "/?signup=1" };
      }
      if (!info.email) {
        let searchParams = new URLSearchParams(info);
        return {
          redirect: `/?signup=1&${searchParams.toString()}`
        };
      }
      const user = await userController.findOne({ mail: info.email });
      if (!user) {
        let searchParams = new URLSearchParams(info);
        return {
          redirect: `/?signup=1&${searchParams.toString()}`
        };
      }
      if (user?.isVerified?.email === "unverified") return { message: 'your email is not verified', data: user, redirect: `/?verifyemail=${user.mail}` }
      token = Token.generate({
        _id: user._id,
        category: user.category,
        email: user.mail,
        phone: user.phone,
        name: user.name,
        origin: user.origin,
        role: user.role ?? ""
      })
      return { message: "", data: ["a"], token, redirect: "/member/dashboard" }
    },
      userController
    )
  )
  .post(
    asyncHandler(
      async (req, res) => {
        let socialUrl = process.env.socials;
        if (!socialUrl) throw new HttpError(404, "Social signon is not allowed")
        let temp = new URL(socialUrl);
        let api = new API(
          {
            baseURL: `${temp.origin}`,
            useHttps: (temp.protocol === "https:")
          }
        )

        let resp = await api.get(temp.pathname.replace(/^\//, ""));
        console.log(resp);
        return res.json({
          status: "success",
          data: resp?.data?.data?.providers
        });
      }
    )
  )
export default router;