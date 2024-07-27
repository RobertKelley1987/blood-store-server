import express from "express";
const router = express.Router({ mergeParams: true });
import orders from "../controllers/orders";

router.post("/", orders.create);

export default router;
