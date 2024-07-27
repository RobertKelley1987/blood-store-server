"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const pmt_intents_1 = __importDefault(require("../controllers/pmt-intents"));
router.post("/", pmt_intents_1.default.create);
router.put("/", pmt_intents_1.default.update);
exports.default = router;
