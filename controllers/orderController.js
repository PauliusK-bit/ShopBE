const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Item = require("../models/itemModel");

const getCheckout = async (req, res) => {
  console.log("req.params:", req.params);

  const item = await Item.findById(req.params.itemId);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}`,
    cancel_url: `${req.protocol}://${req.get("host")}`,

    client_reference_id: req.params.itemId,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.name} Product`,
            description: item.summary,
            images: [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
};

module.exports = {
  getCheckout,
};
