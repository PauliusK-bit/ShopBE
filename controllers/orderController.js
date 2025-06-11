const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Item = require("../models/itemModel");

// const getCheckout = async (req, res) => {
//   console.log("req.params:", req.params);

//   const item = await Item.findById(req.params.itemId);

//   const paymentIntent = await stripe.paymentIntents.create({
//     // mode: "payment",
//     // payment_method_types: ["card"],
//     // success_url: `${req.protocol}://${req.get("host")}`,
//     // cancel_url: `${req.protocol}://${req.get("host")}`,

//     // client_reference_id: req.params.itemId,
//     // line_items: [
//     //   {
//     //     price_data: {
//     //       currency: "eur",
//     //       product_data: {
//     //         name: `${item.name} Product`,
//     //         description: item.summary,
//     //         images: [],
//     //       },
//     //       unit_amount: Math.round(item.price * 100),
//     //     },
//     //     quantity: 1,
//     //   },
//     // ],

//     amount: Math.round(item.price * 100),
//     currency: "eur",
//   });

//   res.status(200).json({
//     status: "success",
//     clientSecret: paymentIntent.client_secret,
//   });
// };

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
