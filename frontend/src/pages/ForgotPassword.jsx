import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ForgotPassword = () => {
  useDocumentTitle('Recovery - Password Reset');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      toast.success('Recovery link generated!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Could not process request. Please check the email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-low rounded-[2.5rem] border border-outline-variant/40 p-8 shadow-ambient relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-40" />

        <div className="flex flex-col items-center text-center mb-10">
           <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-surface-container-low rounded-[2rem] border border-outline-variant/40 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <ShieldCheck className="w-8 h-8 text-primary relative z-10" />
           </div>
           
           <h1 className="text-4xl font-black text-[#111827] tracking-tighter mb-3 leading-tight">
             Identity <span className="text-primary italic">Recovery.</span>
           </h1>
           <p className="text-on-surface-variant text-sm font-bold tracking-tight">
             Regain programmatic access to your achievement record.
           </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant/40 rounded-2xl text-on-surface font-bold placeholder:text-on-surface-variant/40 placeholder:font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter your professional email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full rounded-2xl py-8 flex items-center justify-center bg-[#111827] text-white font-black hover:bg-[#1F2937] transition-all group"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send Recovery Link
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
               <div className="py-8 px-6 bg-primary/5 border border-primary/20 rounded-3xl">
                  <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="text-on-surface font-black text-lg mb-2">Check your Coordinates.</p>
                  <p className="text-on-surface-variant text-xs font-bold leading-relaxed max-w-xs mx-auto">
                    We've dispatched an encrypted recovery link to <span className="text-primary">{email}</span>. Valid for 10 minutes.
                  </p>
               </div>
               
               <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-[0.2em]">
                 Check your spam folder if it doesn't arrive.
               </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-6 border-t border-outline-variant/30 text-center">
           <Link 
             to="/login" 
             className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2 group"
           >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Return to Login Base
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
