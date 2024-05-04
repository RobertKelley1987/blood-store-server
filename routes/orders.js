const express = require("express");
const router = express.Router({ mergeParams: true });
const orders = require("../controllers/orders");

router.post("/", orders.create);

module.exports = router;
