const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: false }, // profile picture
  country: { type: String, required: true },
  isSeller: { type: Boolean, default: false },
  desc: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);