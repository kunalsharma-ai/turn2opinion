
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}

import { CrudController, Mutate } from "../utils/index.js";
import { User as userModel, Invites as invitesModel, Answers, Survey,Response as responseModel } from "../model/index.js";
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
        if (!mail) user = await super.list({ phone:phone.replace(/\D/g,"") });

        if (user.length !== 1) throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
        let temp = await userModel.findById(user[0]._id).select("+role");

        let response = await temp.verifyPassword(password);
        if (response) {
            return temp;
        }
        throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
    }
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        console.log(query)
        return await super.list(query, populateFields, sort, project)
    }
    async create(data) {
        this.fixUserIssue();
        invitesModel.updateMany({
            email: data.mail
        }, {
            isActive: false
        })
        const user = await super.create(data);
        
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
            console.Log("Auto-invite failed for new user", e.message);
        }

        return user;
    }
    async update(id, data) {
        this.fixUserIssue();
        return await super.update(id, data);
    }
    async read(id) {
        let temp = Mutate(await userModel.findById(id).select("+role"))
        let dob = new Date(temp.dob);
        return {...temp, isMinor: dob.isMinor()};
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
}

export default new User(userModel)
