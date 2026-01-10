const express = require('express')
const { createOrder, getOrders, getOrderById, updateOrderStatus, getMyOrders, getOrderStats } = require('../controllers/orderController');
const { processPayment } = require('../controllers/paymentController');

const router = express.Router()


router.post("/payment/process", processPayment);
router.post("/order", createOrder);
router.get("/all-orders", getOrders);
router.get("/stats", getOrderStats);
router.get("/my/:uid", getMyOrders);
router.get("/:id", getOrderById);             
router.put("/:id/status", updateOrderStatus); 




module.exports = router