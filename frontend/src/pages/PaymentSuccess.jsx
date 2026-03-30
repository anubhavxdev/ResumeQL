import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LayoutDashboard, Coins, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../hooks/useAuth';

const PaymentSuccess = () => {
  useDocumentTitle('Success - Payment Verified');
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4648d4', '#6669f7', '#ffffff']
    });

    // Refresh user's coin balance
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-surface-container-low rounded-[3rem] border border-outline-variant/40 p-10 shadow-ambient relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />

        <div className="mb-12 inline-flex items-center justify-center w-28 h-28 bg-primary/5 rounded-[3rem] border border-primary/20 shadow-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
           <CheckCircle2 className="w-12 h-12 text-primary relative z-10" />
        </div>

        <div className="space-y-4 mb-12">
           <div className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 text-xs font-black uppercase tracking-widest mb-4">
              Transaction Verified
           </div>
           
           <h1 className="text-5xl md:text-6xl font-black text-[#111827] tracking-tighter leading-tight">
             Credits <span className="text-primary italic">Deployed.</span>
           </h1>
           <p className="text-on-surface-variant text-lg font-bold leading-relaxed max-w-sm mx-auto">
             Your workspace has been infused with fresh compute capacity. Your new balance is live.
           </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
           <div className="bg-white/50 border border-outline-variant/30 rounded-[2rem] p-6 text-center">
              <Coins className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Status</p>
              <p className="text-sm font-black text-on-surface">Instantly Applied</p>
           </div>
           <div className="bg-white/50 border border-outline-variant/30 rounded-[2rem] p-6 text-center">
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-1">Receipt</p>
              <p className="text-sm font-black text-on-surface">Email Dispatched</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button asChild size="lg" className="w-full sm:w-auto rounded-2xl px-12 py-8 bg-[#111827] text-white font-black hover:bg-[#1F2937] group">
              <Link to="/dashboard">
                 <LayoutDashboard className="mr-2 h-5 w-5" /> 
                 Go to Dashboard
              </Link>
           </Button>
           
           <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto font-black text-primary hover:bg-primary/5">
              <Link to="/generate" className="group">
                 Start Generating
                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
           </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30">
           <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-[0.2em]">
             Thank you for choosing ResumeQL. <br /> Your career trajectory just got a tactical upgrade.
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
