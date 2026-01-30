import express from "express";
import {
    Support as supportController,
    User
} from "../../controller/index.js";
import {
    Mutate,
    expressRoute,
    expressView,
    isAuthenticated,
    fsLogger,
    getMailer,
    sendMail,
    Token
} from "../../utils/index.js"
const router = express.Router();
router
    .route("/")
    .get(expressRoute(
        async req => {
            // showing all requests
            let message = ""
            let data = await supportController.list({}, null, {
                _id: -1
            });
            return { message, data };
        },
        supportController
    ))
    .post(expressRoute(
        async req => {
            // showing all requests
            let message = ""
            let data = await supportController.list({ ...req.body }, null, {
                _id: -1
            });
            return { message, data };
        },
        supportController
    ))
    .put(expressRoute(
        async req => {
            User.request = req;
            const {
                subject = "",
                description = "",
                category = "",
                department = "",
                attachments = [],
                tags = "",
                priority = ""
            } = req.body;
            let issueRaisedBy;
            if ("user" in req.body) {
                const temp = await User.list({
                    mail: req.body.user
                })
                if (temp.length === 1) issueRaisedBy = {
                    name: temp[0].fullName,
                    email: temp[0].mail
                };
                else throw new Error("Something went wrong, Please contact administrator");
            } else {
                const temp = await User.read(req.user._id)
                issueRaisedBy = {
                    name: temp.fullName,
                    email: temp.mail
                }
            }
            let teamMembers = await User.list({
                role: {
                    $in: ["admin", "root", "agent"]
                }
            })
            const message = "Your request is accepted by the system, One of our correspondent will reach you soon. Keep checking your inbox/spam folders of email or this section of dashboard for status."
            const data = await supportController.create({
                subject,
                issueRaisedBy,
                description,
                category,
                department,
                attachments,
                tags,
                priority
            })
            // let user = await User.read(req.user._id);
            let toUser = await getMailer(
                "support",
                "ticket-created-user",
                {
                    user: issueRaisedBy,
                    data
                }
            )
            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                issueRaisedBy.email,
                "My Frequent Rewards: Support Ticket Created",
                toUser.data
            )
            let toTeam = await getMailer(
                "support",
                "ticket-created-team",
                {
                    user: issueRaisedBy,
                    data
                }
            )

            for (let index = 0; index < teamMembers.length; index++) {
                const member = teamMembers[index];
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    member.mail,
                    "My Frequent Rewards: Support Ticket Created",
                    toTeam.data
                )
            }
            return { message, data };
        },
        supportController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            let message = "";
            let data = await supportController.read(req.params.id)
            return { message, data }
        },
        supportController
    ))
    .post(expressRoute(
        async req => {

        },
        supportController
    ))
    .put(expressRoute(
        async req => {

        },
        supportController
    ))
    .patch(expressRoute(
        async req => {

        },
        supportController
    ))
    .delete(expressRoute(
        async req => {
            let data = [];
            let message = "Successfully deleted";

            await supportController.delete(req.params.id);
            return { message, data }
        },
        supportController
    ))
router
    .route('/:id/reply')
    .get(expressRoute(
        async req => {
            let ticket = await supportController.read(req.params.id)
            let [message, data] = ["",
                await supportController.conversation(ticket)
            ];
            return { message, data }
        },
        supportController
    ))
    .post(expressRoute(
        async req => {
            let [message, data] = ["", []];
            return { message, data }
        },
        supportController
    ))
    .put(expressRoute(
        async req => {
            let ticket = await supportController.read(req.params.id)
            let [message, data] = [
                "",
                await supportController.reply(ticket, req.body)
            ];
            let toUser = await getMailer(
                "support",
                "ticket-updated-user",
                {
                    user: ticket.issueRaisedBy,
                    reply: data,
                    repliedBy: req.user
                }
            )


            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                ticket.issueRaisedBy.email,
                "Re: My Frequent Rewards: Support Ticket Created",
                toUser.data
            )
            User.request = req;
            let teamMembers = await User.list({
                role: {
                    $in: ["admin", "root", "agent"]
                }
            })
            let toTeam = await getMailer(
                "support",
                "ticket-updated-team",
                {
                    user: ticket.issueRaisedBy,
                    reply: data,
                    repliedBy: req.user
                }
            )
            for (let index = 0; index < teamMembers.length; index++) {
                const member = teamMembers[index];
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    member.mail,
                    "My Frequent Rewards: Support Ticket Created",
                    toTeam.data
                )
            }

            return { message, data }
        },
        supportController
    ))
    .patch(expressRoute(
        async req => {
            let [message, data] = ["", []];
            return { message, data }
        },
        supportController
    ))
    .delete(expressRoute(
        async req => {
            let [message, data] = ["", []];
            return { message, data }
        },
        supportController
    ))
export default router;