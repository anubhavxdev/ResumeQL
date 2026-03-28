import React from 'react';
import { motion } from 'framer-motion';

const LogoStrip = () => {
  const logos = [
    { name: 'Google', icon: 'https://cdn.worldvectorlogo.com/logos/google-icon.svg' },
    { name: 'Meta', icon: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg' },
    { name: 'Amazon', icon: 'https://cdn.worldvectorlogo.com/logos/amazon-icon.svg' },
    { name: 'Microsoft', icon: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
    { name: 'OpenAI', icon: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
    { name: 'Netflix', icon: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
    { name: 'Stripe', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-2.svg' },
    { name: 'Vercel', icon: 'https://cdn.worldvectorlogo.com/logos/vercel.svg' }
  ];

  // Repeat logos for continuous loop
  const loopLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-12 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest text-center">
          TRUSTED BY ELITE ENGINEERS FROM
        </p>
        
        <div className="relative w-full flex overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

          <motion.div 
            className="flex gap-16 shrink-0"
            animate={{ x: '-33.33%' }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {loopLogos.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 shrink-0 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                 <img 
                   src={logo.icon} 
                   alt={logo.name} 
                   className="h-8 w-8 object-contain"
                   loading="lazy"
                 />
                 <span className="text-lg font-bold tracking-tight text-[#374151]">
                   {logo.name}
                 </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoStrip;
