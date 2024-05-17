import express from "express";
const router = express.Router({ mergeParams: true });
import pmtIntents from "../controllers/pmt-intents.js";

router.post("/", pmtIntents.create);
router.put("/", pmtIntents.update);

export default router;
