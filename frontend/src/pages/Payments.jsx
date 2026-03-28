import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Coins, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const coinPlans = [
  {
    name: "Starter",
    price: 10,
    coins: 500,
    description: "Perfect for applying to a few specific roles.",
    features: ["10 Resume Generations", "Core ATS Scoring", "PDF Exports", "Standard Support"],
    recommended: false,
    color: "from-blue-500/10 to-transparent",
    border: "border-ghost"
  },
  {
    name: "Professional",
    price: 49,
    coins: 2500,
    description: "Ideal for active and serious job seekers.",
    features: ["50 Resume Generations", "Advanced AI Optimization", "Priority Support", "Unlimited History"],
    recommended: true,
    color: "from-primary/10 to-transparent",
    border: "border-primary/30"
  },
  {
    name: "Career Scale",
    price: 99,
    coins: 6000,
    description: "Maximum bandwidth for high-volume applying.",
    features: ["120 Resume Generations", "Everything in Professional", "Early Beta Features", "1-on-1 Review Session"],
    recommended: false,
    color: "from-emerald-500/10 to-transparent",
    border: "border-ghost"
  }
];

const Payments = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(null);
  useDocumentTitle('Purchase Credits');

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
        description: `Secure purchase of ${plan.coins} credits`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            toast.success("Payment successful! Credits instantly applied.");
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
          color: "#4648d4", // Using the primary token color
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to initiate transaction");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="pb-12 text-on-surface">
      <header className="mb-12 border-b border-outline-variant/30 pb-6 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Billing & Upgrades</h1>
          <p className="text-on-surface-variant text-lg">Invest in your career. Only pay for the compute you need.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-5 py-3 rounded-2xl border border-ghost shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-highest text-orange-500">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Available Balance</p>
            <p className="text-xl font-bold tracking-tight text-on-surface">{user?.coins || 0} Credits</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
        {coinPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex flex-col rounded-3xl border bg-surface-container-lowest p-8 shadow-sm transition-all hover:shadow-ambient ${plan.border}`}
          >
            {plan.recommended && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-container px-4 py-1 rounded-full text-xs font-bold text-on-primary uppercase tracking-widest shadow-sm">
                Most Popular
              </div>
            )}
            
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${plan.color} rounded-t-3xl opacity-50 pointer-events-none`} />

            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-on-surface">{plan.name}</h3>
              <p className="mt-2 text-sm text-on-surface-variant h-10">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-on-surface">₹{plan.price}</span>
                <span className="text-sm font-semibold text-on-surface-variant">INR</span>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <div className="h-8 rounded-full bg-surface-container-high px-3 border border-ghost flex items-center gap-1.5 w-fit">
                  <Coins className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-bold text-on-surface">{plan.coins} Credits</span>
                </div>
              </div>
            </div>

            <ul className="mb-8 grow space-y-4 relative z-10">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-3 text-sm font-medium text-on-surface-variant">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handlePurchase(plan)}
              disabled={loading === plan.name}
              variant={plan.recommended ? 'default' : 'outline'}
              className={`w-full py-6 text-base font-bold transition-all relative z-10 ${
                !plan.recommended ? 'bg-surface hover:bg-surface-container-low border-ghost' : 'shadow-ambient'
              }`}
            >
              {loading === plan.name ? 'Processing Securely...' : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4" /> Purchase Plan
                  </span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      <section className="mt-16 max-w-4xl mx-auto rounded-3xl border border-ghost bg-surface-container-low p-8 text-center sm:p-12 shadow-sm">
          <div className="mx-auto flex flex-col items-center">
            <div className="h-16 w-16 bg-surface rounded-2xl border border-ghost shadow-sm flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">Enterprise-Grade Security</h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl leading-relaxed font-medium">
              We partner with Razorpay to process payments securely. Your financial data is fully encrypted and never stored on our servers. Credits are applied instantly to your workspace.
            </p>
          </div>
      </section>
    </div>
  );
};

export default Payments;
