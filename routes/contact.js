const express = require("express");
const router = express.Router({ mergeParams: true });
const contact = require("../controllers/contact");

router.post("/", contact.sendMail);

module.exports = router;
