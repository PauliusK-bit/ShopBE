const express = require("express");
const { getCheckout } = require("../controllers/orderController");

const router = express.Router();

router.post("/checkout", getCheckout);

module.exports = router;
