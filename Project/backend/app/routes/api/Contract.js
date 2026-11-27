// GET /api/v1/contract: MADP Panel API Contract discovery (see utils/madpContract.js). Admin token only.
import express from "express";
import { requireAdmin } from "../../utils/access.js";
import { discoveryFor } from "../../utils/madpContract.js";

const router = express.Router();
router.get("/", requireAdmin, (req, res) => {
    if (!req.origin) return res.status(400).json({ status: "error", message: "Missing tenant" });
    return res.json({ status: "success", data: discoveryFor(req.origin) });
});

export default router;
