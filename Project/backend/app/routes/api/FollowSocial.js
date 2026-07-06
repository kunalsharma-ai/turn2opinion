import Router from "express";
import { FollowSocial as FollowSocialContainer, Socials } from "../../controller/index.js";
import { asyncHandler, HttpError } from "express-web-tools";

const router = Router();
router
    .route("/verify")
    .get(
        asyncHandler(
            async (req, res) => {
                FollowSocialContainer.request = req;
                return res.json({
                    status: "success",
                    message: "",
                    data: await FollowSocialContainer.list({}, "created.By")
                })
            }
        )
    )
    .post(async (req, res) => {
        const {
            platform,
            socialId: user
        } = req.body;
        const { screenshot } = req.files;
        Socials.request = req;
        let temp = await Socials.findOne({ platform })
        if (!temp) throw new HttpError(401, "Invalid request");

        let mime = screenshot.mimetype.split("/");
        if (mime[0] !== "image") throw new HttpError(401, "Invalid request");

        const screenshotFile = `${req.user._id}-${temp._id}.${mime[1]}`;
        screenshot.mv(`/src/public/social/screenshots/${screenshotFile}`);
        FollowSocialContainer.request = req;

        let follow = {
            platform: temp.platform,
            points: temp.points ?? 0,
            user,
            status: "pending",
            screenshot: "/" + screenshotFile,
            created: {
                By: req.user._id,
                From: req.clientIP
            }
        }
        let data = await FollowSocialContainer.create(follow)
        return res.json({
            status: "success",
            message: "Under development",
            data
        })
    })
export default router;