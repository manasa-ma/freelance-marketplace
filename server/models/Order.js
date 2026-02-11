const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  gigId: { type: String, required: true },
  img: { type: String, required: false },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: String, required: true },
  buyerId: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  
  // NEW FIELD: Tracking the progress of the order
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered", "Completed"],
    default: "Pending",
  },
  
  payment_intent: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);