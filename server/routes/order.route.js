const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const { createOrder, getOrders, updateStatus, deleteOrder } = require('../controllers/order.controller');

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.put("/:id/status", verifyToken, updateStatus);

// ADD THIS LINE if it's missing:
router.delete("/:id", verifyToken, deleteOrder); 

module.exports = router;