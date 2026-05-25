import mongoose from "mongoose";
import { CrudController, Mutate } from "../utils/index.js";
import { Response as responseModel, Survey as surveyModel } from "../model/index.js";
const threshold={
    rewards:1000,
    loi:10
}
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
                    total: {
                        $sum: { $cond: [{ $eq: ["$status", "invited"] }, 0, 1] }
                    },
                    available:{
                        $sum: { $cond: [{ $eq: ["$status", "invited"] }, 1, 0] }
                    },
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
    async surveySummaryByUsers() {

        let temp = await responseModel.aggregate([
            {
                $group: {
                    _id: "$user",
                    total: {
                        $sum: { $cond: [{ $eq: ["$status", "invited"] }, 0, 1] }
                    },
                    available:{
                        $sum: { $cond: [{ $eq: ["$status", "invited"] }, 1, 0] }
                    },
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
        let filters = { ...this.commonFilters };
        filters.user = new mongoose.Types.ObjectId(this.request.user._id);
        filters["survey.slug"] = data.survey.slug
        let resp = Mutate(await super.list(filters));
        console.log(resp)
        if (resp.length === 0 || (resp.length === 1 && ["dropout", "invited"].includes(resp[0]["status"]))) {
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
        console.log(filter)
        let userID = new mongoose.Types.ObjectId(this.request.user._id);

        let participationFilters = {};
        if (filter.status === "active") {
            participationFilters.status = { $in: ["invited", "dropout"] };
            delete filter.status;
        }

        let pipeline = [
            {
                $match: {
                    user: userID,
                    ...this.commonFilters,
                    ...participationFilters
                }
            },
            {
                $lookup: {
                    from: "Survey",
                    localField: "survey.slug",
                    foreignField: "slug",
                    as: "surveyInfo"
                }
            },
            {
                $unwind: "$surveyInfo"
            },
            {
                $match: {
                    "surveyInfo.category": this.request.user.category,
                    "surveyInfo.status": "active"
                }
            }
        ];

        if (filter.source) {
            pipeline.push({ $match: { "surveyInfo.source": filter.source } });
        }

        pipeline.push({
            $project: {
                _id: "$surveyInfo._id",
                name: "$surveyInfo.name",
                slug: "$surveyInfo.slug",
                points: "$surveyInfo.points",
                loi: "$surveyInfo.loi",
                source: "$surveyInfo.source",
                createdAt: "$surveyInfo.createdAt",
                status: "$surveyInfo.status",
                participationStatus: "$status"
            }
        });
        //*/
        let surveys = Mutate(await responseModel.aggregate(pipeline));
        console.log(surveys);
        return surveys;
    }
    async mySurveyCounts() {
        let surveys = Mutate(await responseModel.aggregate([
            {
                $match: {
                    ...this.commonFilters,
                    user: new mongoose.Types.ObjectId(this.request.user._id),
                    status: "invited"
                }
            },
            {
                $lookup: {
                    from: "Survey",
                    localField: "survey.slug",
                    foreignField: "slug",
                    as: "surveyDetails"
                }
            },
            {
                $unwind: "$surveyDetails"
            },
            {
                $match: {
                    "surveyDetails.category": this.request.user.category,
                    "surveyDetails.status": "active"
                }
            },
            {
                $group: {
                    _id: "$surveyDetails.source",
                    all: {
                        $sum: 1
                    },
                    highRewards:{
                        $sum:{
                            $cond: [{ $gte: ["$surveyDetails.points", threshold.rewards] }, 1,0]
                        }
                    },
                    short:{
                        $sum:{
                            $cond: [{ $gte: ["$surveyDetails.loi", threshold.loi] }, 1,0]
                        }
                    },
                    newSurveys:{
                        $sum:{
                        $cond: [{ $eq: ["$status", "invited"] }, 1,0]
                        }
                    }
                }
            }
        ]))
//        console.log(surveys);
//        if (surveys.length === 1) return surveys[0];
        return surveys.reduce((a,c)=>{
            a[c._id]=c;
            return a;
        },{})
    }
}

let responseController = new Response(responseModel)
responseController.surveySummary();
export default responseController
