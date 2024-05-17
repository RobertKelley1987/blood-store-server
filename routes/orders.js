import express from "express";
const router = express.Router({ mergeParams: true });
import orders from "../controllers/orders.js";

router.post("/", orders.create);

export default router;
