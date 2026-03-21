const razorpay = require("../utils/razorpay");
const Payment = require("../models/Payment");
const crypto = require("crypto");
const User = require("../models/User");


// 🔹 CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount, coins } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      userId: req.user.id,
      orderId: order.id,
      amount,
      coins,
      status: "created"
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Order creation failed" });
  }
};


// 🔹 VERIFY PAYMENT (YOUR CODE GOES HERE)
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid signature" });
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    // 🔥 Prevent double credit
    if (payment.status === "paid") {
      return res.json({ msg: "Already processed" });
    }

    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    const user = await User.findById(payment.userId);
    user.coins += payment.coins;
    await user.save();

    res.json({ success: true, coins: user.coins });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Payment verification failed" });
  }
};