const express = require("express");
const router = express.Router({ mergeParams: true });
const pmtIntents = require("../controllers/pmt-intents");

router.post("/", pmtIntents.create);
router.put("/", pmtIntents.update);

module.exports = router;
