const Order = require("../models/Order");
const Gig = require("../models/Gig");

// This function handles the "Mock" purchase
exports.createOrder = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).send("Gig not found!");

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "mock_pay_" + Math.random().toString(36).substring(7),
      isCompleted: true, // Mark as paid immediately for the demo
    });

    await newOrder.save();
    res.status(200).send("Order successful!");
  } catch (err) {
    res.status(500).send("Error creating order: " + err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
};
// ... existing createOrder and getOrders functions ...

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found!");

    // Check if the person deleting is the Buyer or the Seller of this order
    if (order.buyerId !== req.userId && order.sellerId !== req.userId) {
      return res.status(403).send("You can only cancel your own orders!");
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order cancelled successfully!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};