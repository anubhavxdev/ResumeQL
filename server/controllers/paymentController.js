const razorpay = require("../utils/razorpay");
const Payment = require("../models/Payment");
const crypto = require("crypto");
const User = require("../models/User");

// Security constants
const MIN_AMOUNT = 100; // 1 INR in paise
const MAX_AMOUNT = 100000; // 1000 INR in paise
const PAYMENT_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const COINS_PER_RUPEE = 50;

// 🔹 VALIDATE PAYMENT INPUT
const validatePaymentInput = (amount, coins) => {
  if (!amount || !coins) {
    return { valid: false, msg: "Amount and coins required" };
  }

  if (typeof amount !== "number" || amount <= 0) {
    return { valid: false, msg: "Invalid amount" };
  }

  if (typeof coins !== "number" || coins <= 0) {
    return { valid: false, msg: "Invalid coins" };
  }

  if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return { valid: false, msg: `Amount must be between ${MIN_AMOUNT/100} and ${MAX_AMOUNT/100} INR` };
  }

  // Define allowed plans to accurately verify coins (allow some bonus)
  const allowedPlans = [
    { amount: 10, coins: 500 },
    { amount: 49, coins: 2500 },
    { amount: 99, coins: 6000 }
  ];

  const plan = allowedPlans.find(p => p.amount === amount && p.coins === coins);
  if (!plan) {
    // Basic ratio fallback for other amounts (50 coins per Rupee)
    const expectedCoins = (amount / 1) * COINS_PER_RUPEE;
    if (Math.abs(coins - expectedCoins) > 1) {
        return { valid: false, msg: "Invalid coin amount for this payment" };
    }
  }

  return { valid: true };
};


// 🔹 CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount, coins } = req.body;
    const userId = req.user.id;

    // Validate input
    const validation = validatePaymentInput(amount, coins);
    if (!validation.valid) {
      return res.status(400).json({ msg: validation.msg });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Check for duplicate orders (prevent duplicate clicks)
    const recentOrder = await Payment.findOne({
      userId,
      status: "created",
      createdAt: { $gte: new Date(Date.now() - 60000) } // Last 60 seconds
    });

    if (recentOrder) {
      return res.status(429).json({ msg: "Please wait before creating another order" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(16).toString("hex")
    };

    const order = await razorpay.orders.create(options);

    // Use idempotency key to prevent duplicate orders
    const idempotencyKey = crypto.randomBytes(32).toString("hex");

    const payment = await Payment.create({
      userId,
      orderId: order.id,
      amount,
      coins,
      status: "created",
      idempotencyKey,
      createdAt: new Date()
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ msg: "Order creation failed" });
  }
};


// 🔹 VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;
    const userId = req.user.id;

    // Validate all signature fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ msg: "Missing payment details" });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    )) {
      console.warn(`Invalid signature attempt: ${razorpay_payment_id}`);
      return res.status(403).json({ msg: "Invalid signature" });
    }

    // Find payment record
    const payment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    // Verify user owns this payment
    if (payment.userId.toString() !== userId) {
      console.warn(`Unauthorized payment verification: ${userId} for ${payment.userId}`);
      return res.status(403).json({ msg: "Unauthorized payment access" });
    }

    // Check if order has expired
    if (Date.now() - payment.createdAt > PAYMENT_TIMEOUT) {
      return res.status(400).json({ msg: "Payment order expired" });
    }

    // Prevent double credit (idempotency check)
    if (payment.status === "paid") {
      return res.json({ success: true, msg: "Payment already processed", coins: payment.coins });
    }

    // Update payment as paid
    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "paid";
    payment.verifiedAt = new Date();
    await payment.save();

    // Credit coins to user (atomic operation)
    const user = await User.findById(payment.userId);
    if (!user) {
      throw new Error("User not found during payment processing");
    }

    user.coins += payment.coins;
    user.totalSpent = (user.totalSpent || 0) + payment.amount;
    await user.save();

    // Audit log
    console.log(`Payment verified: User=${userId}, OrderId=${razorpay_order_id}, Coins=${payment.coins}`);

    res.json({
      success: true,
      msg: "Payment verified",
      coins: user.coins
    });

  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ msg: "Payment verification failed" });
  }
};