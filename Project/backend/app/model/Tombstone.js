import { mongooseModel } from "../utils/index.js";
import { TOMBSTONE_KINDS } from "../utils/changesFeed.js";

// A record that something was removed for good, so readers of the changes feed (GET /api/v1/changes/deletions)
// can remove it too. Written by the admin hard-delete and refresh routes in routes/api/User.js.
//   kind "member"  - the member record was deleted
//   kind "answers" - all of the member's profile answers were removed (POST /user/refresh)
// It holds the member's id only: no name, e-mail or other details.
export default mongooseModel(
    "Tombstone",
    {
        kind: { type: String, enum: TOMBSTONE_KINDS, required: true },
        user: { type: String, trim: true, required: true }
    },
    [[{ origin: 1, updatedAt: 1, _id: 1 }]]
);
