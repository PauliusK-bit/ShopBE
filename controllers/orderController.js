const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Item = require("../models/itemModel");

const generateOrderId = () => {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
};

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

const getCheckout = async (req, res) => {
  const { items } = req.body;

  try {
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "No items in cart" });
    }

    const total = calculateOrderAmount(items);

    if (!total || total <= 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order amount" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: generateOrderId(),
        item_count: items.length,
      },
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create Payment Intent" });
  }
};

module.exports = {
  getCheckout,
};
