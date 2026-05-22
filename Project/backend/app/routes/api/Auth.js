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
  .route(["/socials","/social"])
  .get(
    expressRoute(async (req) => {
      let { token } = req.query;
      if (!token) return { redirect: "/?signup=1" };
      let info = JWT.verify(token, "8e2a8ad9aa0f57a3f8dd7ddda64da43745ee88dec1877a12bc639894937ac600b70721aa431ce6c778bc640b04fbfaecf8fdc68bfa989fb138bff5bfde2f647c");
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
      token = Token.generate({
        _id: user._id,
        category: user.category,
        email: user.mail,
        phone: user.phone,
        name: user.name,
        origin: user.origin,
        role: user.role ?? ""
      })
      return { message: "", data: [], token }
    },
      userController
    )
  )
  .post(
    asyncHandler(
      async (req, res) => {
        let socialUrl = process.env.socials;
        if (!socialUrl) throw HttpError(404, "Social signon is not allowed")
        let temp = new URL(socialUrl);
        let api = new API(
          {
            baseURL: `${temp.origin}`,
            useHttps: (temp.protocol === "https:")
          }
        )
        let resp = await api.get(temp.pathname);
        return res.json({
          status: "success",
          data: resp?.data?.data?.providers
        });
      }
    )
  )
export default router;