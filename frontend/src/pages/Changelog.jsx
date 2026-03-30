import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Sparkles, 
  Terminal, 
  CircleDot, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import FooterEnriched from '../components/landing/FooterEnriched';

const Changelog = () => {
  useDocumentTitle('Changelog');

  const updates = [
    {
      version: 'v1.5.2',
      date: 'Mar 24, 2024',
      status: 'Current',
      title: 'Gemini 1.5 Pro Integration',
      description: 'Major upgrade to the AI core, enabling deep contextual resume rewriting and hallucination-free experience extraction.',
      items: [
         'Introduced Gemini 1.5 Pro as the primary model for generation.',
         'Enhanced LaTeX rendering speed by 40%.',
         'New ATS scoring engine with multi-agent validation.',
         'Improved mobile layout for the Resume Result page.'
      ]
    },
    {
      version: 'v1.4.0',
      date: 'Mar 10, 2024',
      status: 'Stable',
      title: 'Admin Analytics & Real-time Logs',
      description: 'Built a central command for system health, user management, and security event tracking.',
      items: [
         'New Admin Dashboard with real-time stats.',
         'Security Panel for monitoring authentication anomalies.',
         'Raw log viewer with WebSocket integration.',
         'User credit management and usage audits.'
      ]
    },
    {
       version: 'v1.2.0',
       date: 'Feb 20, 2024',
       status: 'Stable',
       title: 'Digital Atelier UX Refinement',
       description: 'Complete overhaul of the visual language. Transitioned to a high-fidelity "Engineering First" design system.',
       items: [
          'Introduced the surface-focused color palette.',
          'Added framer-motion micro-animations throughout the workspace.',
          'Enhanced interactive demo page with real-time previews.',
          'Standardized UI component library (buttons, badges, avatars).'
       ]
    },
    {
       version: 'v1.0.0',
       date: 'Jan 15, 2024',
       status: 'Legacy',
       title: 'LPU Beta Launch',
       description: 'Initial release focused on LPU students, providing free AI resume generation credits.',
       items: [
          'Core resume generation engine using Gemini 1.0 Pro.',
          'Initial set of 5 premium LaTeX templates.',
          'Student credit system (100 coins on signup).',
          'Basic recruitment tracking integration.'
       ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex flex-col">
      <Navbar theme="light" />

      {/* Hero Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none opacity-40 -translate-x-1/2 -translate-y-1/2" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest"
        >
           <GitBranch size={12} /> Versioning History
        </motion.div>
        
        <motion.h1 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight text-[#111827]"
           style={{ letterSpacing: '-0.05em' }}
        >
           System <span className="text-primary italic">Updates.</span>
        </motion.h1>
        
        <motion.p 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="max-w-2xl mx-auto text-lg text-on-surface-variant font-bold leading-relaxed"
        >
           Tracking the mutation of ResumeQL from a beta project into a high-concurrency digital atelier.
        </motion.p>
      </section>

      {/* Status Bar */}
      <section className="py-8 border-y border-outline-variant/30 bg-surface-container-low/30 sticky top-16 z-40 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-8">
            <div className="flex items-center gap-8 divide-x divide-outline-variant/40">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black text-[#111827] uppercase tracking-widest">Main Branch: v1.5.2 stable</span>
               </div>
               <div className="hidden md:flex items-center gap-3 pl-8">
                  <Clock size={14} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-none">Last Deployed: 2h ago</span>
               </div>
               <div className="hidden lg:flex items-center gap-3 pl-8">
                  <ShieldCheck size={14} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-none">Security Status: PASS</span>
               </div>
            </div>
            <Link to="/signup">
               <Button className="rounded-xl px-8 bg-[#111827] hover:bg-[#1F2937] font-black text-xs h-10">
                  Deploy Resume <Zap size={12} className="ml-2" />
               </Button>
            </Link>
         </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative">
         {/* Vertical center line */}
         <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-40 w-px bg-linear-to-b from-transparent via-outline-variant/40 to-transparent hidden md:block" />

         <div className="space-y-32">
            {updates.map((update, idx) => (
              <motion.div 
                key={update.version}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-12 group ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Anchor (Circle) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-outline-variant/40 shadow-sm z-10 group-hover:border-primary transition-colors">
                   <div className={`h-4 w-4 rounded-full ${idx === 0 ? 'bg-primary animate-pulse' : 'bg-outline-variant group-hover:bg-primary/50'}`} />
                </div>

                {/* Content Side */}
                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                   <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${idx % 2 === 0 ? 'text-primary' : 'text-primary'}`}>
                      {update.version} • {update.status}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-[#111827] mb-4 leading-tight">
                      {update.title}
                   </h2>
                   <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-8">
                     {update.date}
                   </p>
                </div>

                {/* List Side */}
                <div className="flex-1 bg-white rounded-[2.5rem] p-10 border border-outline-variant/40 hover:bg-surface-container-lowest transition-all hover:shadow-xl hover:shadow-primary/5 relative">
                   <div className="absolute top-0 right-10 -translate-y-1/2 flex gap-1">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface-container-high border border-outline-variant/40 text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">
                         <Cpu size={18} />
                      </div>
                   </div>
                   
                   <p className="text-[#6B7280] font-medium leading-relaxed mb-8">
                     {update.description}
                   </p>

                   <ul className="space-y-4">
                      {update.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                           <CheckCircle2 size={16} className="text-primary mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                           <span className="text-sm font-bold text-[#111827] leading-tight">{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Future Roadmap / CTA */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#111827]">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/50 rounded-full blur-[150px]" />
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
               whileInView={{ opacity: [0, 1], y: [20, 0] }}
               viewport={{ once: true }}
            >
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.05]" style={{ letterSpacing: '-0.04em' }}>
                  The roadmap is built by <br /> <span className="text-primary italic">engineering logic.</span>
               </h2>
               <p className="text-gray-400 text-lg mb-12 font-medium max-w-2xl mx-auto">
                  We update the platform every 72 hours. Join our Discord or check back frequently for the latest achievement extraction agents.
               </p>
               <Link to="/signup">
                  <Button size="lg" className="rounded-2xl text-xl font-bold px-16 py-10 bg-primary hover:bg-primary-container text-white shadow-3xl shadow-primary/40 transform hover:scale-105 transition-all">
                     Join the Evolution <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
               </Link>
            </motion.div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default Changelog;
