import { CrudController } from "../utils/index.js";
import { Profile as profileModel } from "../model/index.js";

class ProfileController extends CrudController {
  
  async status() {
    const userID = this?.request?.user?._id?.toString();
    let temp = await profileModel.aggregate([

      {
        $match: {
          isActive: true,
          isDeleted: false
        }
      },

      {
        $addFields: {
          questionNames: {
            $reduce: {
              input: "$pages",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          }
        }
      },

      {
        $lookup: {
          from: "Question",
          localField: "questionNames",
          foreignField: "name",
          as: "questions"
        }
      },

      { $unwind: "$questions" },

      {
        $lookup: {
          from: "Answer",
          let: { qName: "$questions.name" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$question", "$$qName"] },
                    { $eq: ["$user", userID] }
                  ]
                }
              }
            }
          ],
          as: "answerDoc"
        }
      },

      {
        $graphLookup: {
          from: "Question",
          startWith: "$questions.parent",
          connectFromField: "parent",
          connectToField: "name",
          as: "parentChain"
        }
      },

      {
        $addFields: {
          parentNames: "$parentChain.name"
        }
      },

      {
        $lookup: {
          from: "Answer",
          pipeline: [
            { $match: { user: userID } },
            { $project: { _id: 0, question: 1 } }
          ],
          as: "allUserAnswers"
        }
      },
      {
        $addFields: {
          answeredNames: "$allUserAnswers.question"
        }
      },

      {
        $addFields: {
          isApplicable: {
            $cond: [
              { $eq: ["$questions.parent", null] },
              true,
              {
                $setIsSubset: [
                  "$parentNames",
                  "$answeredNames"
                ]
              }
            ]
          }
        }
      },
      {
        $addFields: {
          isFilled: {
            $and: [
              "$isApplicable",
              { $gt: [{ $size: "$answerDoc" }, 0] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$slug",
          totalApplicable: {
            $sum: { $cond: ["$isApplicable", 1, 0] }
          },
          totalFilled: {
            $sum: { $cond: ["$isFilled", 1, 0] }
          }
        }
      },

      {
        $addFields: {
          completion: {
            $cond: [
              { $eq: ["$totalApplicable", 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$totalFilled", "$totalApplicable"] },
                      100
                    ]
                  },
                  0
                ]
              }
            ]
          }
        }
      },

      {
        $project: {
          _id: 0,
          slug: "$_id",
          completion: 1
        }
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              k: "$slug",
              v: "$completion"
            }
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: { $arrayToObject: "$data" }
        }
      }
    ])
    // console.log({temp,user:this.request.user});
    // console.log(temp)
    // throw new Error("under development")
    if (temp instanceof Array && temp.length === 1) return temp[0];
    return temp;
  }
}

export default new ProfileController(profileModel);
