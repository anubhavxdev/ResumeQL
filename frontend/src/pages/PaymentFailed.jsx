import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw, LifeBuoy, CreditCard, ShieldX } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PaymentFailed = () => {
  useDocumentTitle('Failed - Payment Interrupted');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-surface-container-low rounded-[3rem] border border-red-200/40 p-10 shadow-ambient relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-60" />

        <div className="mb-12 inline-flex items-center justify-center w-28 h-28 bg-red-500/5 rounded-[3rem] border border-red-500/20 shadow-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors" />
           <ShieldX className="w-12 h-12 text-red-600 relative z-10" />
        </div>

        <div className="space-y-4 mb-12">
           <div className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-xs font-black uppercase tracking-widest mb-4">
              Protocol Interrupted
           </div>
           
           <h1 className="text-5xl md:text-6xl font-black text-[#111827] tracking-tighter leading-tight">
             Transaction <span className="text-red-600 italic">Aborted.</span>
           </h1>
           <p className="text-on-surface-variant text-lg font-bold leading-relaxed max-w-sm mx-auto">
             Identity verification for this purchase failed or was manually terminated. No credits were dispatched.
           </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
           <div className="bg-white/50 border border-outline-variant/30 rounded-[2rem] p-6 text-center">
              <CreditCard className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Status</p>
              <p className="text-sm font-black text-on-surface text-red-600">No Charge Made</p>
           </div>
           <div className="bg-white/50 border border-outline-variant/30 rounded-[2rem] p-6 text-center">
              <LifeBuoy className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Support</p>
              <p className="text-sm font-black text-on-surface">Available 24/7</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button asChild size="lg" className="w-full sm:w-auto rounded-2xl px-12 py-8 bg-[#111827] text-white font-black hover:bg-[#1F2937] group">
              <Link to="/payments">
                 <RefreshCw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" /> 
                 Try Again
              </Link>
           </Button>
           
           <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto font-black text-on-surface-variant hover:text-primary hover:bg-primary/5">
              <Link to="/support" className="group">
                 Technical Support
                 <ArrowLeft className="ml-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
           </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30">
           <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-[0.2em] max-w-xs mx-auto">
             This could be due to network fluctuations or bank-side security protocols. Your data remains secure.
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
