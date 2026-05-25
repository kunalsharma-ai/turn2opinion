import Profile from ".././model/Profile.js";
import Question from ".././model/Question.js";
import Option from ".././model/Option.js";
import mongoose from "mongoose";
async function exportProfilesJSON() {
   const env = {
          port: process.env.port ?? 3000,
          db: process.env.mongodb ?? "mongodb://db/mfr"
      }
      await mongoose.connect(env.db);
    const [profiles, questions, options] = await Promise.all([
        Profile.find({}).lean(),
        Question.find({}).lean(),
        Option.find({}).lean()
    ]);

    // Question map
    const questionMap = {};
    for (const question of questions) {
        questionMap[question.name] = question;
    }

    // Option map grouped by question
    const optionMap = {};
    for (const option of options) {
        if (!optionMap[option.question]) {
            optionMap[option.question] = [];
        }

        optionMap[option.question].push({
            name: option.value,
            label: option.label,
            parentValue: option.parentValue || []
        });
    }

    const result = {};

    for (const profile of profiles) {
        const profileQuestions = {};

        for (const questionName of profile.pages || []) {
            const que = questionMap[questionName];

            if (!que) continue;

            profileQuestions[que.name] = {
                parent: que.parent || null,
                label: que.label,
                options: optionMap[que.name] || []
            };
        }

        result[profile.slug] = profileQuestions;
    }

    return result;
}

// Example usage
const data = await exportProfilesJSON();

console.log(JSON.stringify(data, null, 2));