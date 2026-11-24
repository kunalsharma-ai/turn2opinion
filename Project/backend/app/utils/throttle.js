// Per-account limits on guessing: sign-in passwords, emailed codes and reset e-mails.
import AuthThrottle from "../model/AuthThrottle.js";

const MIN = 60 * 1000;

/** Is this key locked right now? Returns the minutes left, or 0. */
export async function lockedFor(key) {
    const row = await AuthThrottle.findById(key).lean();
    if (!row?.lockedUntil) return 0;
    const left = row.lockedUntil.getTime() - Date.now();
    return left > 0 ? Math.ceil(left / MIN) : 0;
}

/** Count one failure (or one use). After `max` within `windowMin` minutes the key is locked for `lockMin` minutes. */
export async function fail(key, { max, windowMin = 15, lockMin = 15 }) {
    const now = Date.now();
    const row = await AuthThrottle.findOneAndUpdate(
        { _id: key },
        { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(now + windowMin * MIN) } },
        { upsert: true, new: true },
    ).lean();
    if (row.count >= max) {
        await AuthThrottle.updateOne({ _id: key }, { $set: { count: 0, lockedUntil: new Date(now + lockMin * MIN), expiresAt: new Date(now + Math.max(lockMin, windowMin) * MIN) } });
        return true;
    }
    return false;
}

export async function clear(key) {
    await AuthThrottle.deleteOne({ _id: key });
}

export const norm = (s) => String(s || "").trim().toLowerCase();
