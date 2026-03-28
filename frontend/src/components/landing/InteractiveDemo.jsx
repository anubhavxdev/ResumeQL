import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const InteractiveDemo = () => {
  const [inputText, setInputText] = useState("Responsible for increasing company sales numbers.");
  const [outputText, setOutputText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [step, setStep] = useState('idle'); // idle, writing, success

  const demoTransformations = {
    "Responsible for increasing company sales numbers.": 
      "Spearheaded a 40% growth in revenue through strategic lead generation and optimization of the B2B sales funnel.",
    "Worked on the frontend of the website.": 
      "Engineered high-performance React architectures, reducing initial page load by 600ms and improving accessibility scores by 34%."
  };

  const handleRewrite = () => {
    if (isRewriting) return;
    setIsRewriting(true);
    setStep('writing');
    
    // Simulate Gemini AI Latency
    setTimeout(() => {
      const result = demoTransformations[inputText] || 
        "Architected a scalable solution that improved operational efficiency by 25% across cross-functional teams.";
      
      setOutputText(result);
      setStep('success');
      setIsRewriting(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 group relative">
      {/* Decorative Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 to-primary-container/30 rounded-3xl blur-[24px] opacity-20 group-hover:opacity-30 transition-opacity" />
      
      <div className="relative bg-[#0F172A] rounded-3xl border border-[#334155] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px]">
        {/* Terminal Header (Mock) */}
        <div className="absolute top-0 w-full h-10 border-b border-[#1E293B] bg-[#1E293B]/60 backdrop-blur-md flex items-center px-4 gap-2 z-20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest ml-4">
            Interactive AI Lab
          </span>
        </div>

        {/* Input Pane */}
        <div className="flex-1 p-8 pt-16 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-[#1E293B]">
          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-2">
            Raw Experience
          </label>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#F8FAFC] font-mono text-sm leading-relaxed resize-none selection:bg-primary/40 disabled:opacity-50"
            placeholder="Type a boring bullet point..."
            disabled={isRewriting}
          />
          <Button 
            onClick={handleRewrite}
            disabled={isRewriting}
            className="rounded-xl font-bold bg-[#6366F1] hover:bg-[#818CF8] text-white shadow-lg shadow-indigo-500/20"
          >
            {isRewriting ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin" /> Analyzing context...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Optimize with Gemini <Zap className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>

        {/* Output Pane */}
        <div className="flex-1 p-8 pt-16 bg-[#020617]/50 relative overflow-hidden group/output">
           <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center justify-between">
            ATS Polished
            {step === 'success' && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#10B981] flex items-center gap-1">
                <CheckCircle2 size={12} /> Optimized
              </motion.span>
            )}
          </label>
          
          <div className="mt-4 font-mono text-sm leading-relaxed">
            <AnimatePresence mode="wait">
              {step === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-[#475569] italic"
                >
                  Enter a bullet point to start the transformation magic.
                </motion.div>
              )}
              {step === 'writing' && (
                 <motion.div key="writing" className="space-y-2">
                   <div className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }} 
                        animate={{ x: '100%' }} 
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
                      />
                   </div>
                   <div className="h-2 w-3/4 bg-[#1E293B] rounded-full animate-pulse" />
                 </motion.div>
              )}
              {step === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[#6366F1] font-bold"
                >
                  <span className="text-[#F8FAFC] font-normal">{outputText}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#1E293B 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        </div>
      </div>
      
      {/* 4.9 Star Rating Tag under the demo */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5">
           <div className="flex text-yellow-400">
             {"★★★★★".split('').map((s,i) => <span key={i} className="text-lg leading-none">{s}</span>)}
           </div>
           <span className="text-sm font-bold text-on-surface">4.9 / 5</span>
           <span className="text-sm text-on-surface-variant">(2,400+ reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
