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
import {
    resolveCaller,
    ticketListFilter,
    assertTicketAccess,
    mayRaiseForOthers,
    teamRecipients
} from "../../utils/supportAccess.js";
const router = express.Router();

// role is select:false on users, so it is loaded here for the access checks.
const loadUser = id => User.model.findById(id).select("+role mail");
const caller = req => resolveCaller(req, loadUser);
async function readOwnTicket(req) {
    const who = await caller(req);
    let ticket = null;
    try {
        ticket = await supportController.read(req.params.id);
    } catch (e) {
        ticket = null;
    }
    return assertTicketAccess(who, ticket);
}
router
    .route("/")
    .get(expressRoute(
        async req => {
            // staff see all requests, members only their own
            let message = ""
            let data = await supportController.list(ticketListFilter(await caller(req), {}), null, {
                _id: -1
            });
            return { message, data };
        },
        supportController
    ))
    .post(expressRoute(
        async req => {
            // filtered list; members are always limited to their own requests
            let message = ""
            let data = await supportController.list(ticketListFilter(await caller(req), req.body), null, {
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
            // only staff may raise a ticket on behalf of another member
            if (mayRaiseForOthers(await caller(req), req.body)) {
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
            let teamMembers = await User.listTeamMembers()

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
            let toUser = await getMailer(
                "support",
                "ticket-created-user",
                {
                    user: issueRaisedBy,
                    data
                }
            )
            let status= await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                issueRaisedBy.email,
                `${process.env.PROJECT_NAME}: Support Ticket Created`,
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

            // SUPPORT_TEAM_EMAIL when set, otherwise every team member
            for (const to of teamRecipients(teamMembers)) {
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    to,
                    `${process.env.PROJECT_NAME}: Support Ticket Created`,
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
            let data = await readOwnTicket(req)
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

            // deleting tickets is for staff only
            if (!(await caller(req)).staff) throw new Error("Ticket not found");
            await supportController.delete(req.params.id);
            return { message, data }
        },
        supportController
    ))
router
    .route('/:id/reply')
    .get(expressRoute(
        async req => {
            let ticket = await readOwnTicket(req)
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
            let ticket = await readOwnTicket(req)
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
                `Re: ${process.env.PROJECT_NAME}: Support Ticket Updated`,
                toUser.data
            )
            User.request = req;
            let teamMembers = await User.listTeamMembers()
            let toTeam = await getMailer(
                "support",
                "ticket-updated-team",
                {
                    user: ticket.issueRaisedBy,
                    reply: data,
                    repliedBy: req.user
                }
            )
            for (const to of teamRecipients(teamMembers)) {
                await sendMail(
                    { origin: req.origin, "content-type": "application/json" },
                    to,
                    `${process.env.PROJECT_NAME}: Support Ticket Updated`,
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