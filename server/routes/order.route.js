const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const { createOrder, getOrders, deleteOrder } = require('../controllers/order.controller');

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.delete("/:id", verifyToken, deleteOrder); // <--- THIS LINE IS CRUCIAL

module.exports = router;