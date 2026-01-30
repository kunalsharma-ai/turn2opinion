import mongoose from "mongoose";
import { CrudController, Mutate } from "../utils/index.js";
import { Response as responseModel, Survey as surveyModel } from "../model/index.js";
class Response extends CrudController {
    async setStatus(responseID, status) {
        let commonFilters = this.commonFilters;
        let response = await super.read(responseID)
        if (response.status !== "dropout") throw new Error("Unable to change status of your response");
        switch (status) {
            case "terminate":
                response.status = "terminate";
                break;
            case "overquota":
                response.status = "overquota";
                break;

            default:
                response.status = "complete"
                break;
        }
        await response.save();
        return true;
    }
    async getPoints() {
        let query = {
            user: new mongoose.Types.ObjectId(this.request.user._id),
            status: "complete",
            origin: this.request.origin
        }
        let temp = Mutate(await responseModel.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: "$status",
                    totalPoints: {
                        $sum: "$points"
                    }
                }
            }
        ]))
        console.log(temp);
        if (temp.length === 1) return temp[0].totalPoints;
        throw new Error("Invalid request")
    }
    async surveySummary() {

        let user = this?.request?.user?._id;
        let temp = await responseModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user)
                }
            },
            {
                $group: {
                    _id: "$user",
                    total: { $sum: 1 },
                    complete: {
                        $sum: { $cond: [{ $eq: ["$status", "complete"] }, 1, 0] }
                    },
                    disqualified: {
                        $sum: { $cond: [{ $eq: ["$status", "terminate"] }, 1, 0] }
                    },
                    abdoned: {
                        $sum: { $cond: [{ $eq: ["$status", "dropout"] }, 1, 0] }
                    },
                    internal: {
                        $sum: { $cond: [{ $eq: ["$source", "internal"] }, 1, 0] }
                    },
                    external: {
                        $sum: { $cond: [{ $eq: ["$source", "external"] }, 1, 0] }
                    },
                    points: {
                        $sum: { $cond: [{ $eq: ["$status", "complete"] }, "$points", 0] }
                    },
                    totalRewards: {
                        $sum: { $cond: [{ $eq: ["$status", "complete"] }, "$points", 0] }
                    },
                }
            }
        ]);
        return temp;
    }
    async createOrUpdate(data) {
        let filters = {...this.commonFilters};
        filters.user = new mongoose.Types.ObjectId(this.request.user._id);
        filters["survey.slug"]=data.survey.slug
        let resp = Mutate(await super.list(filters));
        if (resp.length === 0 || (resp.length === 1 && resp[0]["status"] === "dropout")) {
            let response = await responseModel.updateOne(filters, {
                $set: { ...data, ...this.commonFilters }
            }, { upsert: true })
            
        } else {
            throw new Error("Already completed survey")
        }
        let temp = Mutate(await super.list(filters));
        if (temp instanceof Array && temp.length === 1)
            return temp[0]
        throw new Error("Invalid request");
    }
    async mySurveys(filter = {}) {
        let temp = Mutate(
            await responseModel
                .find({
                    user: this.request.user._id,
                    ...this.commonFilters
                }, { "slug": "$survey.slug", "status": "$survey.status" }))
            .reduce((a,c) => {
                a[c.slug]=c.status;
                return a;
            },{})
        let surveys = Mutate(await surveyModel.aggregate([
            {
                $match: {
                    ...filter,
                    ...this.commonFilters,
                    category: this.request.user.category
                }
            }
        ])).map(s=>({...s,participationStatus:(temp[s.slug]??"")}))
        return surveys
    }
    async mySurveyCounts() {
        let temp = Mutate(await responseModel.find({
            user: this.request.user._id,
            ...this.commonFilters
        }, { "slug": "$survey.slug" })).map(r => r.slug)
        let surveys = Mutate(await surveyModel.aggregate([
            {
                $match: {
                    ...this.commonFilters,
                    category: this.request.user.category,
                    slug: {
                        $nin: temp
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1
                    },
                    internal: {
                        $sum: { $cond: [{ $eq: ["$source", "internal"] }, 1, 0] }
                    },
                    external: {
                        $sum: { $cond: [{ $eq: ["$source", "external"] }, 1, 0] }
                    },
                    sampledge: {
                        $sum: { $cond: [{ $eq: ["$source", "sampledge"] }, 1, 0] }
                    }
                }
            }
        ]))
        if (surveys.length === 1) return surveys[0];
        return surveys
    }
}

let responseController = new Response(responseModel)
responseController.surveySummary();
export default responseController 