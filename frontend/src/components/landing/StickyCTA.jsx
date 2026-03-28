import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
        >
          <div className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
             <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                   <Sparkles size={20} />
                </div>
                <div className="hidden sm:block">
                   <p className="text-sm font-bold text-white leading-none mb-1">Scale your career.</p>
                   <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Pricing starts at ₹25</p>
                </div>
             </div>
             
             <div className="flex gap-2">
                <Link to="/signup">
                  <Button size="sm" className="rounded-xl font-bold bg-primary hover:bg-primary-container text-white px-6">
                    Start Free
                  </Button>
                </Link>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="h-10 w-10 flex items-center justify-center border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <ArrowRight className="-rotate-90" size={18} />
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
