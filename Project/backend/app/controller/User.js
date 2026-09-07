
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}
import {HttpError} from "express-web-tools";
import { CrudController, Mutate } from "../utils/index.js";
import {
    User as userModel,
    Invites as invitesModel, Answers,
    Survey as modelSurvey,
    Response as responseModel,
    Alerts as alertModel
} from "../model/index.js";
import fs from "fs"
class User extends CrudController {
    fixUserIssue() {
        super.request = {
            ...this.request,
            user: {
                _id: null
            }
        }
    }
    async login({ phone, mail, password }) {
        let user
        if (!phone)
            user = await super.list({ mail });
        if (!mail) user = await super.list({ phone: phone.replace(/\D/g, "") });

        if (user.length !== 1) throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
        let temp = await userModel.findById(user[0]._id).select("+role");

        let response = await temp.verifyPassword(password);
        if (response) {
            return temp;
        }
        throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
    }
    async listTeamMembers(query = {}, populateFields = null, sort = {}, project = null){
        return await super.list({ ...query, role: { $in: ["superadmin", "root","admin","agent"] } }, populateFields, sort, project)
    }
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return await super.list({ ...query, role: { $nin: ["superadmin", "root"] } }, populateFields, sort, project)
    }
    async create(data) {
        this.fixUserIssue();
        invitesModel.updateMany({
            email: data.mail
        }, {
            isActive: false
        })
        const user = await super.create(data);
        if(user.referredBy){
            let alert =new alertModel({
                ...this.commonFilters,
                user:user.referredBy,
                title:"New Referral Joined",
                subtitle:`${user.mail} has joined`,
                cta:`/member/referrals`,
                ctaType:"link"
            })
            await alert.save();
        }
        // Auto-invite to active surveys with autoInvite enabled
        try {
            const surveys = await modelSurvey.find({
                category: user.category,
                autoInvite: true,
                status: "active",
                ...this.commonFilters
            });

            if (surveys.length > 0) {
                const autoInvites = surveys.map(s => ({
                    user: user._id,
                    survey: {
                        name: s.name,
                        slug: s.slug
                    },
                    status: "invited",
                    source: s.source,
                    points: s.points,
                    ...this.commonFilters
                }));
                await responseModel.insertMany(autoInvites, { ordered: false });
            }
        } catch (e) {
            console.log(e);
            console.log("Auto-invite failed for new user", e.message);
        }

        return user;
    }
    async update(id, data) {
        this.fixUserIssue();
        return await super.update(id, data);
    }
    async read(id) {
        let user = await userModel.findById(id).select("+role +isActive")
        user.isNew = false;
        await user.save();
        let temp = Mutate(
            user
        )

        let dob = new Date(temp.dob);
        return { ...temp, isMinor: dob.isMinor() };
    }
    async delete(id) {
        this.fixUserIssue();
        return await super.delete(id);
    }
    async setPassword(user, password) {
        let temp = await super.read(user);
        return await temp.setPassword(password);
    }
    async changePassword(currentPassword, newPassword) {
        let user = await super.read(this.request.user._id);
        return await user.changePassword(currentPassword, newPassword)
    }
    async addInvites(emails) {
        for (let index = 0; index < emails.length; index++) {
            const email = emails[index];
            let invite = await invitesModel.create({
                invitedBy: this.request.user._id,
                email,
                isActive: true,
                isDeleted: false,
                origin: this.request.origin
            })
            await invite.save();
        }
        return true;
    }
    async invitedUsers() {
        const temp = await invitesModel.find({
            ...this.commonFilters,
            invitedBy: this.request.user._id,
            isActive: {
                $in: [true, false]
            }
        }, {
            createdAt: -1,
            email: 1,
            isActive: 1,

        })
        return temp;
    }
    async summary() {
        let summary = Mutate(await userModel.aggregate([
            {
                $match: {
                    ...this.commonFilters
                }
            },
            {
                $group: {
                    _id: "$category",
                    value: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    label: "$_id",
                    value: 1,
                    _id: 0
                }
            }
        ]))
        summary.unshift({
            label: "Total Panelists",
            value: summary.reduce((a, c) => {
                a += Number(c.value);
                return a;
            }, 0)
        })
        return summary;
    }
    async changeCategory(newCategory) {
        let user = await super.read(this.request.user._id);
        user.category = newCategory;
        return await user.save();
    }
    async changePaymentMethod(paymentMethod) {
        return await super.update(this.request.user._id, { paymentMethod });
    }
    async refreshUser(data) {
        await Answers.deleteMany({
            user: data.user
        })
        let user = await userModel.findById(data.user);
        await responseModel.deleteMany({
            "survey.slug": "welcome",
            user: user._id
        })
        user.terms = [];
        await user.save();
        return true;
    }
    async appsList(query = {}, populateFields = null, sort = {}, project = null) {
        return await super.list({ ...query, role: { $in: ["root"] } }, populateFields, sort, project)
    }
    async appCreateUser(userInfo) {
        return super.create(userInfo);
    }
    async appLoginUser(query) {
        return await super.findOne({ ...query, ...this.commonFilters, role: "root" })
    }
    async birthday() {
        return await this.model.aggregate([
            {
                $project: {
                    birthday: {
                        $dateToString: {
                            format: "%m-%d",
                            date: "$dob",
                            timezone: "Asia/Kolkata"
                        }
                    },
                    today: {
                        $dateToString: {
                            format: "%m-%d",
                            date: "$$NOW",
                            timezone: "Asia/Kolkata"
                        }
                    },
                    hrs: {
                        $hour: {
                            date: "$$NOW",
                            timezone: "$timezone"
                        }
                    },
                    name: 1,
                    mail: 1,
                    gender: 1,
                    ethnicity: 1
                }
            },
            {
                $match: {
                    hrs: {
                        $gte: 18,
                        $lt: 23
                    },
                    // $expr: {
                    //     $eq: ["$today", "$birthday"]
                    // }
                }
            }
        ]);
    }
    async filterUsers(filters) {
        const validFilters = filters.filter(
            ({ question, answer }) => question && ![null,"",[]].includes(answer)
        );
        let userIds=null;
        for (const [index, filter] of validFilters.entries()) {
            const {question,answer}=filter;
            const temp = await Answers.distinct("user", {
                question: question,
                answer: { $in: answer },
            });
            if(index === 0){
                userIds=temp
                continue;
            }
            switch (filter.operator) {
                case "AND":
                    userIds=userIds.filter(u=>temp.includes(u));
                    break;
                case "OR":
                    userIds = new Set([...userIds, ...temp])
                    break;
                default:
                    break;
            }
        }
        return await this.list({
            _id: { $in: [...userIds] },
        })
    }
}

export default new User(userModel)
