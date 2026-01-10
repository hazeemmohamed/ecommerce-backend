const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


exports.processPayment = async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("REQ BODY:", req.body);

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "cartItems must be array" });
    }

    let amount = 0;

    cartItems.forEach(item => {
      const price = Number(item.price);
      const qty = Number(item.quantity);

      if (isNaN(price) || isNaN(qty)) {
        throw new Error("Invalid cart item structure");
      }

      amount += price * qty;
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error("PAYMENT ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};
