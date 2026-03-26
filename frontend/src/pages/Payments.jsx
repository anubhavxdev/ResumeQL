import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Coins, CreditCard, ArrowRight, ShieldCheck, History } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';

const coinPlans = [
  {
    name: "Starter Pack",
    price: 10,
    coins: 500,
    description: "Perfect for a few job applications.",
    features: ["10 Resume Generations", "ATS Scoring included", "PDF Downloads", "Email Support"],
    recommended: false,
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/30"
  },
  {
    name: "Pro Professional",
    price: 49,
    coins: 2500,
    description: "Best for active job seekers.",
    features: ["50 Resume Generations", "AI Optimization loop", "Priority Support", "History Storage"],
    recommended: true,
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/50"
  },
  {
    name: "Career Growth",
    price: 99,
    coins: 6000,
    description: "Unlimited potential for power users.",
    features: ["120 Resume Generations", "Everything in Pro+", "Beta access to features", "Personalized Support"],
    recommended: false,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30"
  }
];

const Payments = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async (plan) => {
    setLoading(plan.name);
    const res = await loadRazorpay();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your connection.");
      setLoading(null);
      return;
    }

    try {
      // 1. Create order on backend
      const orderRes = await api.post('/payment/create-order', {
        amount: plan.price,
        coins: plan.coins
      });

      const { orderId, amount, currency, key } = orderRes.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "ResumeQL",
        description: `Purchase ${plan.coins} coins`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            toast.success("Payment successful! Coins credited.");
            fetchUser(); // Refresh user data to show new coins
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#9333ea",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to initiate payment");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Coins className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold text-white">{user?.coins} Coins Available</span>
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Simple Pricing, Zero Stress</h1>
          <p className="mt-4 text-zinc-400 text-lg">1 INR = 50 Coins. Only pay for what you use.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {coinPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl border ${plan.border} bg-zinc-900/30 p-8 backdrop-blur-xl ${
                 plan.recommended ? 'scale-105 shadow-[0_0_40px_rgba(147,51,234,0.1)]' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-500">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">₹{plan.price}</span>
                  <span className="ml-2 text-zinc-500">one-time</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-purple-500">
                  {plan.coins} Credits
                </div>
              </div>

              <ul className="mb-8 grow space-y-4">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(plan)}
                disabled={loading === plan.name}
                className={`w-full py-6 text-lg font-bold transition-all active:scale-[0.98] ${
                  plan.recommended 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {loading === plan.name ? 'Processing...' : (
                   <span className="flex items-center gap-2">
                     Get Credits <ArrowRight className="h-5 w-5" />
                   </span>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 text-center sm:p-12">
           <div className="mx-auto max-w-2xl">
              <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
              <h2 className="text-2xl font-bold text-white">Secure Payments via Razorpay</h2>
              <p className="mt-4 text-zinc-400">
                We use industry-standard encryption to protect your transaction details. 
                Coins are credited instantly upon successful payment verification.
              </p>
           </div>
        </section>
      </main>
    </div>
  );
};

export default Payments;
