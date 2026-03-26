const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  coins: Number,
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created"
  },
  idempotencyKey: String,
  verifiedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);