import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight, 
  Target, 
  Zap, 
  Cpu, 
  Terminal, 
  ShieldCheck,
  CheckCircle2,
  ListRestart,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FooterEnriched from '../components/landing/FooterEnriched';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const GuideStep = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex gap-8 group"
  >
    <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
       <Icon size={28} />
    </div>
    <div className="pt-2">
       <h3 className="text-2xl font-black text-[#111827] mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
       <p className="text-on-surface-variant leading-relaxed font-medium max-w-xl">{desc}</p>
    </div>
  </motion.div>
);

const Guide = () => {
  useDocumentTitle('Resume Optimization Guide');

  const steps = [
    {
       icon: Target,
       title: "Analyze the Target Signal",
       desc: "Before drafting, identify the 5 core technical keywords in your target Job Description. Our ATS engine will look for these specifically. Use the Generate page to paste your CV and JD side-by-side."
    },
    {
       icon: Zap,
       title: "Quantify Your Atomic Impact",
       desc: "Move from tasks to results. Instead of 'Worked with React', use 'Engineered a multi-agent UI orchestration layer using React, reducing state-update latency by 30% across the platform'."
    },
    {
       icon: Cpu,
       title: "Surgical TeX Formatting",
       desc: "Visual clutter is the enemy of parsing bots. Our LaTeX engine automatically strips unnecessary graphics, ensuring that every text character is indexed perfectly by modern ATS search algorithms."
    },
    {
       icon: ShieldCheck,
       title: "Final Verification",
       desc: "Run your generated PDF through our ATS Scorer. If your score is below 85, our AI will provide specific contextual suggestions to bridge the gap between your history and the JD requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex flex-col overflow-x-hidden">
      <Navbar theme="light" />

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40" />
         
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest"
         >
           <BookOpen size={12} /> Optimization Manual
         </motion.div>

         <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-[#111827]" style={{ letterSpacing: '-0.05em' }}>
            The Engineering <br /> <span className="text-primary italic">Playbook.</span>
         </h1>
         <p className="max-w-2xl mx-auto text-on-surface-variant text-xl font-bold leading-relaxed mb-16">
            A step-by-step guide to transforming your professional history into a high-performance narrative.
         </p>
      </section>

      {/* Steps Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
         <div className="space-y-16">
            <h2 className="text-4xl font-black tracking-tight text-[#111827] flex items-center gap-4">
               The Core Workflow <ListRestart className="text-primary" />
            </h2>
            <div className="space-y-12">
               {steps.map((step, i) => (
                  <GuideStep key={i} {...step} delay={i * 0.1} />
               ))}
            </div>
         </div>

         {/* Pro Tips Panel */}
         <div className="bg-surface-container-low rounded-[3rem] border border-outline-variant/40 p-12 relative overflow-hidden group h-full">
            <div className="absolute top-0 right-10 -translate-y-1/2 flex gap-1">
               <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface-container-high border border-outline-variant/40 text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">
                  <Terminal size={18} />
               </div>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-[#111827] mb-8">Engineering Pro-Tips</h2>
            <div className="space-y-10">
               {[
                 { title: "One Page Rule", desc: "For engineers with < 8 years of experience, a single page is mandatory. The AI engine is optimized to compress your narrative without losing signal." },
                 { title: "Action Verbs First", desc: "Every bullet point must start with an active, tactical verb (Engineered, Orchestrated, Optimized, Researched)." },
                 { title: "No Placeholder Skills", desc: "Remove generic skills like 'Team Player' or 'Quick Learner'. Replace with technical proficiencies (e.g., 'CI/CD Pipelines', 'Distributed Systems', 'LLM Fine-tuning')." }
               ].map((tip, i) => (
                 <div key={i} className="space-y-2 group/tip">
                    <h4 className="flex items-center gap-3 text-lg font-black text-[#111827] group-hover/tip:text-primary transition-colors tracking-tight">
                       <CheckCircle2 size={16} className="text-primary" /> {tip.title}
                    </h4>
                    <p className="text-on-surface-variant font-bold text-sm leading-relaxed pl-7">{tip.desc}</p>
                 </div>
               ))}
               
               <div className="pt-8 border-t border-outline-variant/20">
                  <Link to="/generate">
                     <Button className="w-full h-16 rounded-2xl bg-[#111827] hover:bg-[#1F2937] font-black text-lg py-10 shadow-3xl shadow-primary/20 transition-transform">
                        Start Workshop Now <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Checklist section */}
      <section className="py-32 px-4 border-t border-outline-variant/30 bg-surface-container-low/30">
         <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="text-primary mb-6 mx-auto h-10 w-10 p-2 bg-primary/10 rounded-xl" />
            <h2 className="text-4xl font-black text-on-surface mb-12">The 3-Second Rule Checklist.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
               {[
                 "Is my name the largest element on the page?",
                 "Are my tech stack keywords visible in the top 3rd?",
                 "Does each entry have at least one hard metric (%)?",
                 "Is the LaTeX font consistent across all sections?",
                 "Are the contact links clickable and verified?",
                 "Does the summary mention my primary specialty?"
               ].map((check, i) => (
                 <div key={i} className="p-6 bg-white rounded-2xl border border-outline-variant/40 flex items-center gap-4 group">
                    <div className="h-6 w-6 rounded-full border-2 border-primary/40 flex items-center justify-center p-0.5 group-hover:bg-primary transition-all">
                       <CheckCircle2 size={14} className="text-transparent group-hover:text-white transition-all" />
                    </div>
                    <span className="text-sm font-bold text-[#111827]">{check}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default Guide;
