import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';

const TechShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax and 3D effects
  const yRange = useTransform(scrollY, [0, 500], [0, -100]);
  const rotateX = useSpring(useTransform(scrollY, [0, 500], [0, 5]), { stiffness: 100, damping: 30 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-16 perspective-1000">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[140px] opacity-40 -z-10 group-hover:bg-primary/20 transition-all duration-700" />

      <motion.div
        style={{
          y: yRange,
          rotateX,
          rotateY: mousePosition.x * 0.1,
          rotateZ: mousePosition.y * -0.05
        }}
        className="relative group cursor-pointer"
      >
        {/* Mockup Frame */}
        <div className="relative rounded-[2.5rem] border border-outline-variant/30 bg-surface-container-low shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* macOS Style Bar */}
          <div className="h-10 bg-surface-container-highest/60 backdrop-blur-md border-b border-outline-variant/30 flex items-center px-6 gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="mx-auto text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] opacity-40">
              ResumeQL AI Engine 2.1 — Workshop
            </div>
          </div>

          {/* Isometric Image Container */}
          <div className="relative">
            <motion.img
              src="/hero_isometric_mockup_1774815988888.png"
              alt="ResumeQL Dashboard"
              className="w-full h-auto object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-1000 ease-out"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Scanning Laser Overlay */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-32 bg-linear-to-r from-transparent via-primary/30 to-transparent pointer-events-none z-10"
              style={{ mixBlendMode: 'overlay' }}
            >
              <div className="absolute inset-y-0 right-0 w-[2px] bg-primary/60 shadow-[0_0_20px_rgba(70,72,212,0.8)]" />
            </motion.div>
          </div>
        </div>

        {/* Floating Feature Tags */}
        <motion.div 
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-6 -right-6 md:-right-12 bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-xl flex items-center gap-3 z-20"
        >
           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="text-primary w-5 h-5" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Gemini 2.1</p>
              <p className="text-sm font-black text-[#111827]">98% ATS Recall</p>
           </div>
        </motion.div>

        <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-xl flex items-center gap-3 z-20"
        >
           <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Zap className="text-orange-500 w-5 h-5" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Live Preview</p>
              <p className="text-sm font-black text-[#111827]">LaTeX Rendered</p>
           </div>
        </motion.div>
      </motion.div>

      {/* Social Proof (Small) */}
      <div className="mt-12 flex justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
         <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-on-surface-variant" />
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">SOC II Compliant</span>
         </div>
         <div className="flex items-center gap-2">
            <Layers size={16} className="text-on-surface-variant" />
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Version Control Enabled</span>
         </div>
      </div>
    </div>
  );
};

export default TechShowcase;
