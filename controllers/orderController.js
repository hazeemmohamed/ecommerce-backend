const Order = require("../models/orderModel");
const Product = require("../models/productModel"); 


// exports.createOrder = async (req, res) => {
//   const { cartItems, amount } = req.body;

//   const order = await Order.create({
//     cartItems,
//     amount,
//     status: "Paid",
//   });

//   res.status(201).json({
//     success: true,
//     order,
//   });
// };

exports.createOrder = async (req, res) => {
  try {
    const { userId, cartItems, amount, paymentInfo } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId,
      cartItems,
      amount,
      paymentInfo,        // ✅ saved here
      status: "Paid",
      paidAt: Date.now(), // ✅ saved here
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyOrders = async (req, res) => {
  const { uid } = req.params;

  const orders = await Order.find({ userId: uid })
    .sort({ createdAt: -1 });

  res.json(orders);
};



exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to load order" });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};


exports.getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments(); // ✅ product count

    const paid = await Order.countDocuments({ status: "Paid" });
    const packed = await Order.countDocuments({ status: "Packed" });
    const shipped = await Order.countDocuments({ status: "Shipped" });
    const delivered = await Order.countDocuments({ status: "Delivered" });

    res.json({
      totalProducts,
      totalOrders,
      paid,
      packed,
      shipped,
      delivered,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};



