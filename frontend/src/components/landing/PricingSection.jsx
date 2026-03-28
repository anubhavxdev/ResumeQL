import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  // User specifically requested: 25 for 200, then 4x it.
  const plans = [
    {
      name: 'Starter',
      price: 25,
      credits: 200,
      desc: 'One-off applications.',
      features: ['Basic AI Transformation', 'Standard PDF Export', '200 AI Credits'],
      isPopular: false
    },
    {
      name: 'Professional',
      price: 100,
      credits: 800,
      desc: 'Most chosen by active applicants.',
      features: ['Advanced Gemini 1.5 Pro', 'Priority LaTeX Rendering', '800 AI Credits', 'Custom Portfolios'],
      isPopular: true
    },
    {
      name: 'Infinite',
      price: 400,
      credits: 3200,
      desc: 'For career dominance.',
      features: ['All Pro Features', 'White-label Support', '3,200 AI Credits', 'Priority Support'],
      isPopular: false
    }
  ];

  const calculatePrice = (base) => {
    if (isAnnual) {
       return Math.floor(base * 10); // 12 months for the price of 10
    }
    return base;
  };

  return (
    <section className="py-24 bg-surface px-4 sm:px-6 lg:px-8 border-y border-outline-variant/30 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
           <h2 className="text-4xl font-extrabold tracking-tight text-[#111827]">Transparent Investing.</h2>
           <p className="mt-4 text-[#6B7280] text-lg">No subscription traps. Pay for the credits you need to build your career.</p>
        </div>

        {/* Annual Toggle */}
        <div className="flex items-center gap-4 mb-16 bg-white border border-[#E5E7EB] p-2 rounded-2xl shadow-sm">
           <span className={`text-sm font-bold ${!isAnnual ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Monthly</span>
           <Switch 
             checked={isAnnual}
             onCheckedChange={setIsAnnual}
           />
           <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isAnnual ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Annual</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                Save 20%
              </span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
           {plans.map((plan, idx) => (
             <motion.div 
               key={plan.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className={`relative flex flex-col p-8 bg-white border rounded-3xl transition-all hover:-translate-y-2
                  ${plan.isPopular ? 'border-primary ring-4 ring-primary/10 shadow-xl' : 'border-outline-variant/30 shadow-ambient'}`}
             >
               {plan.isPopular && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                   <Sparkles size={10} /> Most Popular
                 </div>
               )}

               <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-[#111827]">₹{calculatePrice(plan.price)}</span>
                     <span className="text-sm font-bold text-[#6B7280]">
                        /{isAnnual ? 'yr' : 'mo'}
                     </span>
                  </div>
                  <p className="mt-2 text-sm text-[#6B7280] font-medium">{plan.desc}</p>
               </div>

               <div className="mb-8 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Zap size={14} className="text-primary" />
                     <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Credit Volume</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-900">{plan.credits} Units</span>
               </div>

               <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex flex-start gap-3 text-sm font-medium text-[#374151]">
                       <ShieldCheck className="text-primary shrink-0" size={18} />
                       {feature}
                    </li>
                  ))}
               </ul>

               <Button 
                 className={`w-full py-6 rounded-2xl font-bold text-lg 
                   ${plan.isPopular ? 'bg-primary hover:bg-primary-container text-white shadow-lg shadow-primary/20' : 'bg-surface-container-low hover:bg-surface-container-high'}`}
               >
                 Activate {plan.name}
               </Button>
             </motion.div>
           ))}
        </div>
        
        <p className="mt-12 text-[#6B7280] text-sm font-medium">
           Prices include all local taxes and global service fees. Custom enterprise plans available for bootcamps.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
