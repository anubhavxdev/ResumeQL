import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';

const BeforeAfter = () => {
  return (
    <section className="py-24 bg-surface px-4 sm:px-6 lg:px-8 border-y border-outline-variant/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#111827] leading-tight mb-6">
            From Static to <span className="text-primary italic">Strategic.</span>
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-xl">
            Generic bullet points get ignored. ResumeQL's Gemini engine identifies "High Impact Vitals" in your work and amplifies them with metric-driven accuracy.
          </p>
          <div className="space-y-4 max-w-md mx-auto lg:ml-0">
             <div className="flex items-center gap-3 font-semibold text-[#374151]">
                <CheckCircle2 className="text-primary" size={20} /> 
                <span>Keyword optimization for 20,000+ job types</span>
             </div>
             <div className="flex items-center gap-3 font-semibold text-[#374151]">
                <CheckCircle2 className="text-primary" size={20} /> 
                <span>Quantifiable metric generation (e.g. %, $)</span>
             </div>
             <div className="flex items-center gap-3 font-semibold text-[#374151]">
                <CheckCircle2 className="text-primary" size={20} /> 
                <span>Action-verb replacement for higher recall</span>
             </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="flex-1 w-full space-y-6">
          {/* Before */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm relative overflow-hidden"
          >
             <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Traditional Raw</span>
               <span className="text-xs font-bold text-red-500">Low Recruiter Recall</span>
             </div>
             <p className="text-[#475569] italic text-sm leading-relaxed">
               "Responsible for managing the company website and making sure it stays online and fast for users."
             </p>
          </motion.div>

          {/* Transformation arrow */}
          <div className="flex justify-center text-primary animate-pulse">
             <Sparkles size={24} />
          </div>

          {/* After */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1e293b] border-2 border-primary/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
          >
             <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest bg-primary/20 px-2 py-1 rounded">AI Optimized</span>
               <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                 <Sparkles size={12} /> High Recruiter Recall
               </span>
             </div>
             <p className="text-[#F8FAFC] font-medium text-sm leading-relaxed">
               "Architected a scalable <span className="text-[#6366F1] font-bold">full-stack infrastructure</span> that improved site performance by <span className="text-green-400 font-bold">45%</span> and ensured <span className="text-[#6366F1] font-bold">99.99% uptime</span> across 1.2M monthly sessions."
             </p>
             {/* Glowing light effect behind the optimized text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[40px] -z-10 group-hover:bg-primary/20 transition-all" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
