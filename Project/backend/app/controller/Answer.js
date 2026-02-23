import { CrudController, Mutate } from "../utils/index.js";
import {
    Answers as answerModel,
    Question as questionModel
} from "../model/index.js";

class Answer extends CrudController {
    async save(data) {
        const origin = this.request.origin;
        const user = this.request.user._id;
        let temp = data.map(({ question, answer }) => {
            return {
                updateOne: {
                    filter: {
                        question,
                        user,
                        origin
                    },
                    update: {
                        question,
                        answer: Array.isArray(answer)
                            ? answer
                            : answer === null
                                ? []
                                : [answer],
                        user,
                        origin
                    },
                    upsert: true
                }
            }
        })
        console.log({ temp })
        return await answerModel.bulkWrite(temp, { ordered: true });
        // await answerModel.update
        throw new Error("Unable to save data")
        return true;
    }
    async getAnswers(data) {
        let query = this.commonFilters;
        let questions = Mutate(await questionModel.find({ ...query, type: "multiselect", name: data.question })).map(que => que.name);
        let temp = Mutate(await answerModel.find({ ...query, ...data }).select("+answer"))
            .reduce((a, c) => {
                a[c.question] = c.Answer;
                if (questions.includes(c.question)) a[c.question] = [c.Answer].flat();
                return a;
            }, {})
        return temp;
    }
    async feasibility(filters) {
        let questions = Object.keys(filters);
        let filterOptions = {};
        let aggregation = [];
        if (questions.length > 0) {
            aggregation.push({
                $match: {
                    question: {
                        $in: questions
                    }
                }
            })
            filterOptions = questions.reduce((a, c) => {
                if (c === "$or") {
                    a[c] = filters[c]
                    return a;
                }
                a[c] = {
                    $in: filters[c].map(fltr => {
                        let temp = fltr.split(" | ")
                        return temp[0]
                    })
                }
                return a;
            }, {})
        }

        aggregation.push({
            $group: {
                _id: {
                    usr: "$user"
                },
                ans: {
                    $push: {
                        k: "$question",
                        v: {
                            $cond: [
                                { $isArray: "$answer" },
                                {
                                    $switch: {
                                        branches: [
                                            {
                                                case: { $eq: [{ $size: "$answer" }, 1] },
                                                then: { $arrayElemAt: ["$answer", 0] }
                                            },
                                            {
                                                case: { $gt: [{ $size: "$answer" }, 1] },
                                                then: "$answer"
                                            }
                                        ],
                                        default: null
                                    }
                                },
                                "$answer"
                            ]
                        }
                    }
                }
            }
        },) //Read Questions and Answerts by User

        aggregation.push({
            $project: {
                _id: 1,
                "ans": {
                    $filter: {
                        input: "$ans",
                        cond: { $ne: ["$$this.v", null] }
                    }
                }
            }
        },) //Cleanup 
        aggregation.push({
            $project: {
                "user": "$_id.usr",
                data: {
                    $arrayToObject: "$ans"
                },
                _id: 0
            }
        })
        aggregation.push({
            $lookup: {
                from: "User", // correct mongo collection name
                let: { localId: "$user" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    "$_id",
                                    {
                                        $convert: {
                                            input: "$$localId",
                                            to: "objectId",
                                            onError: null,
                                            onNull: null
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: "userInfo"
            }
        });
        aggregation.push({ $unwind: "$userInfo" });
        aggregation.push({
            $project: {
                user: 1,
                dob: "$userInfo.dob",
                gender: "$userInfo.gender",
                timezone: "$userInfo.timezone",
                category: "$userInfo.category",
                name: "$userInfo.name",
                mail: "$userInfo.mail",
                qualityScore: "$userInfo.qualityScore",
                data: 1
            }
        })
        aggregation.push({
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        {
                            user: "$user",
                            dob: "$dob",
                            gender: "$gender",
                            timezone: "$timezone",
                            category: "$category",
                            name: "$name",
                            mail: "$mail",
                            qualityScore: "$qualityScore"
                        },
                        "$data"
                    ]
                }
            }
        })
        aggregation.push({
            $match: filterOptions
        })
        let data = (await answerModel.aggregate(aggregation))
        return data;
    }
    async summarizeByUsers() {
        // let data=await answerModel.find();
        let data = await answerModel.aggregate([
            {
                $group: {
                    _id: {
                        usr: "$user"
                    },
                    ans: {
                        $push: {
                            k: "$question",
                            v: {
                                $cond: [
                                    { $isArray: "$answer" },
                                    {
                                        $switch: {
                                            branches: [
                                                {
                                                    // If array length = 1 → return first value
                                                    case: { $eq: [{ $size: "$answer" }, 1] },
                                                    then: { $arrayElemAt: ["$answer", 0] }
                                                },
                                                {
                                                    // If array length > 1 → keep array
                                                    case: { $gt: [{ $size: "$answer" }, 1] },
                                                    then: "$answer"
                                                }
                                            ],
                                            // If array length = 0 → store null (we will filter later)
                                            default: null
                                        }
                                    },
                                    // If not an array → keep as is
                                    "$answer"
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    "ans": {
                        $filter: {
                            input: "$ans",
                            cond: { $ne: ["$$this.v", null] }
                        }
                    }
                }
            },
            {
                $project: {
                    "user": "$_id.usr",
                    data: {
                        $arrayToObject: "$ans"
                    },
                    _id: 0
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            { user: "$user" },
                            "$data"
                        ]
                    }
                }
            }
        ])
        return data;
    }
    async summarizeQuestionResponse() {
        const data = await answerModel.aggregate([
            {
                $group: {
                    _id: "$question",
                    users: {
                        $push: "$user"
                    }
                }
            }
        ])
        return Mutate(data).reduce((a, c) => {
            a[c._id] = c.users;
            return a;
        }, {});
    }
    async summarize() {
        const data = await answerModel.aggregate([
            {
                $group: {
                    _id: "$question",
                    qa: {
                        $push: {
                            k: "$user",
                            v: {
                                $cond: [
                                    { $isArray: "$answer" },
                                    {
                                        $switch: {
                                            branches: [
                                                {
                                                    case: { $eq: [{ $size: "$answer" }, 1] },
                                                    then: { $arrayElemAt: ["$answer", 0] }
                                                },
                                                {
                                                    case: { $gt: [{ $size: "$answer" }, 1] },
                                                    then: "$answer"
                                                }
                                            ],
                                            default: null   // empty array → null
                                        }
                                    },
                                    "$answer"   // non-array value
                                ]
                            }
                        }
                    }
                }
            },

            // Remove entries where v = null (empty answers)
            {
                $project: {
                    _id: 1,
                    qa: {
                        $filter: {
                            input: "$qa",
                            cond: { $ne: ["$$this.v", null] }
                        }
                    }
                }
            },

            // Convert [{k, v}, ...] into { user1: v1, user2: v2 }
            {
                $project: {
                    _id: 0,
                    question: "$_id",
                    answers: { $arrayToObject: "$qa" }
                }
            }
        ]);

        return Mutate(data).filter(d => Object.keys(d.answers).length !== 0);
    }
}

export default new Answer(answerModel)