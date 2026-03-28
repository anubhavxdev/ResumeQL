import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Zap } from 'lucide-react';
import { Avatar } from '../ui/avatar';

const TestimonialMarquee = () => {
  const testimonials = [
    {
      name: 'Anika R.',
      role: 'Full-stack Dev',
      company: 'TCS',
      text: 'From 0 callbacks to 3 in just 7 days. The LaTeX export is pure magic.',
      score: 5
    },
    {
      name: 'Rahul K.',
      role: 'SRE Lead',
      company: 'Google',
      text: 'I was skeptical about AI, but the Gemini integration actually understands distributed systems context.',
      score: 5
    },
    {
      name: 'Sarah J.',
      role: 'Product Designer',
      company: 'Meta',
      text: 'The UI is premium. It feels like a masterclass tool for professionals.',
      score: 4.9
    },
    {
      name: 'Kunal S.',
      role: 'Fresh Graduate',
      company: 'LPU',
      text: 'Matched my first internship at Zomato thanks to the ATS keyword tagging.',
      score: 5
    },
    {
      name: 'Priaya M.',
      role: 'Data Scientist',
      company: 'Zepto',
      text: 'The best ₹100 I spent on my career. High conversion, low effort.',
      score: 5
    }
  ];

  const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-surface px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Vetted by Ambition.</h2>
           <p className="mt-4 text-[#6B7280] text-lg font-medium">Join 2,400+ professionals who transformed their digital narrative.</p>
        </div>

        <div className="relative w-screen max-w-[100vw]">
           {/* Fading Edges */}
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

           <motion.div 
             className="flex gap-8 px-4"
             animate={{ x: '-33.33%' }}
             transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
           >
              {loopTestimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="w-[350px] shrink-0 bg-white border border-outline-variant/30 rounded-3xl p-8 shadow-ambient group"
                >
                   <div className="flex gap-0.5 text-yellow-400 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(t.score) ? "currentColor" : "none"} />
                      ))}
                   </div>
                   <p className="text-[#374151] font-medium leading-relaxed mb-6 group-hover:text-[#111827] transition-colors">
                     "{t.text}"
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                         {t.name[0]}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-[#111827]">{t.name}</p>
                         <p className="text-xs font-medium text-[#6B7280] flex items-center gap-1">
                           {t.role} @ {t.company} <ShieldCheck size={10} className="text-primary" />
                         </p>
                      </div>
                   </div>
                </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
