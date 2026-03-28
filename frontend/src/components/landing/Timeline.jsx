import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Zap, Download, ArrowRight } from 'lucide-react';

const Timeline = () => {
  const steps = [
    {
      icon: FileUp,
      title: 'Import Profile',
      desc: 'Link your LinkedIn or upload a raw PDF. No formatting needed.',
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'AI Transformation',
      desc: 'Paste a target job. Gemini rewrites your experience in LaTeX.',
      delay: 0.2
    },
    {
      icon: Download,
      title: 'Scale Careers',
      desc: 'Download your ATS-optimized PDF and start applying.',
      delay: 0.3
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Surgical Precision.</h2>
        <p className="mt-4 text-[#6B7280] text-lg font-medium">The 3-stage process of building a master-class resume.</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -translate-y-1/2 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="flex flex-col items-center text-center group"
            >
              <div className="h-20 w-20 rounded-3xl bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-xl shadow-primary/10 group-hover:scale-110 transition-transform mb-6 relative">
                 <step.icon size={32} />
                 <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-4 border-surface">
                   {idx + 1}
                 </div>
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
              <p className="text-[#6B7280] leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
              
              {idx < steps.length - 1 && (
                <div className="mt-6 md:hidden text-primary animate-bounce">
                   <ArrowRight className="rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
