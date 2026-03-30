import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ResetPassword = () => {
  useDocumentTitle('Recovery - Set New Password');
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      toast.success('Password successfully reset!');
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid or expired token. Please request a new link.');
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
              <Lock className="w-8 h-8 text-primary relative z-10" />
           </div>
           
           <h1 className="text-4xl font-black text-[#111827] tracking-tighter mb-3 leading-tight">
             New <span className="text-primary italic">Credentials.</span>
           </h1>
           <p className="text-on-surface-variant text-sm font-bold tracking-tight">
             Redefine your secure access token.
           </p>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
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
                    <Lock className="h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant/40 rounded-2xl text-on-surface font-bold placeholder:text-on-surface-variant/40 placeholder:font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="New Password (min 8 chars)"
                  />
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant/40 rounded-2xl text-on-surface font-bold placeholder:text-on-surface-variant/40 placeholder:font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Confirm New Password"
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
                    Reset Password
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
                  <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="text-on-surface font-black text-lg mb-2">Protocol Successful.</p>
                  <p className="text-on-surface-variant text-xs font-bold leading-relaxed max-w-xs mx-auto">
                    Your credentials have been updated. Redirecting you to the login base in a few coordinates...
                  </p>
               </div>
               
               <Button asChild className="w-full rounded-2xl py-8 bg-[#111827] text-white">
                  <Link to="/login">Login Now</Link>
               </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
