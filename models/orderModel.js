const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
  type: String,
  required: true,
},
  cartItems: Array,
  amount: Number,
  status: {
    type: String,
    enum: ["Pending", "Paid", "Packed", "Shipped", "Delivered"],
    default: "Pending",
  },
  paymentInfo: {
      id: String,        // Stripe paymentIntent id
      status: String,    
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order
