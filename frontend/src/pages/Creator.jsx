import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
   Github,
   Linkedin,
   Globe,
   Mail,
   Sparkles,
   Code2,
   Cpu,
   FileJson,
   Zap,
   ArrowRight,
   ShieldCheck,
   CircleDot,
   Terminal,
   Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Creator = () => {
   useDocumentTitle('Meet the Creator');

   const careerLog = [
      { year: 2024, event: 'ResumeQL Beta Launch' },
      { year: 2024, event: 'Optimized Gemini LLM Pipeline' },
      { year: 2023, event: 'Pic Trove Engineering Lead' },
      { year: 2023, event: 'EventOne Architecture V2' },
      { year: 2022, event: 'First Cloud Architect Certification' },
      { year: 2021, event: 'Began Atomic Scaling Research' }
   ];

   const techStack = [
      {
         name: 'Gemini AI',
         icon: Sparkles,
         why: 'Contextual Intelligence for the modern engineer.',
         span: 'lg:col-span-2'
      },
      {
         name: 'LaTeX',
         icon: FileJson,
         why: 'Surgical formatting that ATS cannot ignore.',
         span: 'lg:col-span-1'
      },
      {
         name: 'Node.js',
         icon: Cpu,
         why: 'High-concurrency pipelines.',
         span: 'lg:col-span-1'
      },
      {
         name: 'React',
         icon: Code2,
         why: 'High-fidelity reactive workspace.',
         span: 'lg:col-span-2'
      },
      {
         name: 'The Mission',
         icon: Zap,
         why: 'Scaling the human signal.',
         span: 'lg:col-span-2'
      }
   ];

   return (
      <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 overflow-x-hidden text-on-surface">
         <Navbar theme="light" />

         {/* Hero - Cinematic Reveal */}
         <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-20">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-10 flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
            >
               <CircleDot size={12} className="text-primary animate-pulse" />
               <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Engineering Manifesto</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tight leading-[0.95] mb-12 text-transparent bg-clip-text bg-linear-to-b from-[#111827] to-[#6B7280]" style={{ letterSpacing: '-0.05em' }}>
               Engineering is 50% technical mastery.<br />
               The other 50% is <span className="text-primary italic">tactical storytelling.</span>
            </h1>

            <div className="max-w-2xl text-xl text-on-surface-variant font-medium leading-relaxed mb-12">
               Most smart people build amazing things and fail to document them. <br className="hidden md:block" />
               <span className="text-on-surface font-bold underline decoration-primary/40 underline-offset-8 decoration-4">I build the bridge.</span>
            </div>

            <div className="flex items-center gap-6 mt-12 p-1 bg-surface-container-low border border-outline-variant/40 rounded-[2.5rem] pr-8 shadow-sm">
               <img
                  src="https://github.com/anubhavxdev.png"
                  alt="Anubhav Jaiswal"
                  className="h-16 w-16 rounded-4xl border-2 border-outline-variant/40 shadow-sm"
               />
               <div className="text-left">
                  <p className="text-lg font-bold text-on-surface">Anubhav Jaiswal</p>
                  <p className="text-sm font-semibold text-on-surface-variant">Founder & Lead Engineer</p>
               </div>
            </div>
         </section>

         {/* The Paradox - Heavy Narrative */}
         <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-20">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-12"
            >
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-on-surface flex items-center gap-4">
                     The Engineering Paradox <Zap className="text-primary" />
                  </h2>
                  <div className="text-xl text-on-surface-variant leading-relaxed space-y-8">
                     <p>
                        I founded ResumeQL because of a specific frustration:
                        <span className="text-on-surface font-bold"> The signal-to-noise ratio in modern hiring is broken.</span>
                     </p>
                     <p>
                        I saw colleagues build distributed systems that scaled to millions, yet their resumes read like static,
                        uninspired logs. They were master-class engineers but invisible candidates.
                     </p>
                     <div className="p-8 bg-primary/5 border border-primary/20 rounded-4xl relative overflow-hidden group">
                        <p className="text-2xl font-black text-on-surface leading-tight relative z-10">
                           ResumeQL is about <span className="text-primary">moving from static PDFs to strategic career records.</span>
                        </p>
                        <Activity size={100} className="absolute -right-8 -bottom-8 text-primary/10 -rotate-12 group-hover:rotate-0 transition-transform" />
                     </div>
                     <p>
                        We use Gemini AI not to "write" for you, but to surgically translate your atomic achievements into
                        the high-frequency language recruiters and legacy ATS filters are hunting for.
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* Career Build Log panel */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-surface-container-low rounded-[3rem] border border-outline-variant/40 p-8 shadow-sm relative group overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-40" />

               <div className="flex items-center gap-3 mb-8 text-primary font-bold text-sm tracking-widest uppercase">
                  <Terminal size={18} /> BUILD_LOG.sh
               </div>

               <div className="space-y-10 font-mono text-sm">
                  {careerLog.map((log, idx) => (
                     <div key={idx} className="flex gap-6 group/log">
                        <span className="text-on-surface-variant font-bold">{log.year}</span>
                        <span className="text-on-surface-variant group-hover/log:text-primary transition-colors flex items-center gap-2">
                           <ArrowRight size={12} className="opacity-0 group-hover/log:opacity-100 transition-opacity" />
                           {log.event}
                        </span>
                     </div>
                  ))}
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                     <span className="inline-flex items-center gap-2 text-green-400 font-bold">
                        <CircleDot size={12} className="animate-pulse" /> SYSTEM_ONLINE
                     </span>
                     <span className="text-on-surface-variant text-xs uppercase tracking-widest">v1.2.0 stable</span>
                  </div>
               </div>
            </motion.div>
         </section>

         {/* Bento 2.0 - Asymmetrical Tech Grid */}
         <section className="py-32 px-4 sm:px-6 lg:px-8 border-y border-outline-variant/30 bg-surface-container-low/30">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-20">
                  <h2 className="text-4xl font-black text-on-surface tracking-tight">The Tactical Stack</h2>
                  <p className="mt-4 text-on-surface-variant text-lg font-medium">Built for signal speed. Engineered for coordination.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {techStack.map((tech, idx) => (
                     <div
                        key={idx}
                        className={`bg-surface-container-lowest hover:bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/40 transition-all hover:-translate-y-2 group flex flex-col justify-between min-h-70 ${tech.span}`}
                     >
                        <div className="h-14 w-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-8 border border-outline-variant/40 group-hover:bg-primary group-hover:text-white transition-all">
                           <tech.icon size={28} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-on-surface mb-3">{tech.name}</h3>
                           <p className="text-on-surface-variant leading-relaxed font-medium">
                              {tech.why}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Socials & Availability */}
         <section className="py-32 max-w-7xl mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Available for Architecture Audits</span>
               </div>
               <h3 className="text-3xl font-black text-on-surface">Let's Coordinate.</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
               {[
                  { name: 'Github', icon: Github, href: 'https://github.com/anubhavxdev' },
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/anubhavxdev' },
                  { name: 'Portfolio', icon: Globe, href: 'https://anubhavjaiswal.me' },
                  { name: 'Email', icon: Mail, href: 'mailto:anubhavjaiswal1803@gmail.com' }
               ].map((social) => (
                  <a
                     key={social.name}
                     href={social.href}
                     target="_blank"
                     className="bg-surface-container-low p-8 rounded-4xl border border-outline-variant/40 flex flex-col items-center gap-4 hover:border-primary/50 hover:bg-surface-container-high transition-all group"
                  >
                     <social.icon size={24} className="text-on-surface-variant group-hover:text-primary transition-all" />
                     <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{social.name}</span>
                  </a>
               ))}
            </div>
         </section>

         {/* Final Refined CTA */}
         <section className="py-32 px-4 relative overflow-hidden bg-surface-container-low/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] z-0" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
               <h2 className="text-4xl md:text-7xl font-black text-on-surface mb-12 leading-[1.05]" style={{ letterSpacing: '-0.04em' }}>
                  Built this for you — <br />
                  now let it work for you.
               </h2>
               <Link to="/signup">
                  <Button size="lg" className="rounded-2xl text-xl font-bold px-16 py-10 bg-primary hover:bg-primary-container text-white shadow-3xl shadow-primary/40 transform hover:scale-105 transition-all">
                     Scale Your Signal <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
               </Link>
            </div>
         </section>

         {/* Industrial Sub-footer */}
         <footer className="py-16 border-t border-outline-variant/30 text-center">
            <div className="flex items-center justify-center gap-3 mb-4 text-on-surface-variant">
               <span className="text-xs font-bold uppercase tracking-widest">Hand-crafted with intensity</span>
               <div className="w-10 h-px bg-outline-variant/60" />
               <ShieldCheck size={16} className="text-primary" />
            </div>
            <p className="text-sm font-bold text-on-surface">
               Managed & Maintained by <Link to="/about" className="hover:text-primary transition-colors italic">Anubhav Jaiswal</Link>
            </p>
         </footer>
      </div>
   );
};

export default Creator;
