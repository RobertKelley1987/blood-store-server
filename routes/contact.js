import express from "express";
const router = express.Router({ mergeParams: true });
import contact from "../controllers/contact.js";

router.post("/", contact.sendMail);

export default router;
