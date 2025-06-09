const express = require("express");
const { getCheckout } = require("../controllers/orderController");

const router = express.Router();

router.get("/checkout/:itemId", getCheckout);

module.exports = router;
