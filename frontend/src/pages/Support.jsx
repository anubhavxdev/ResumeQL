import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Mail, 
  MessageCircle, 
  Github, 
  Twitter, 
  Linkedin, 
  Zap, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import FooterEnriched from '../components/landing/FooterEnriched';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border border-outline-variant/40 bg-surface-container-low rounded-[1.5rem] overflow-hidden transition-all hover:bg-surface-container-high">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between transition-colors"
      >
        <span className="text-left font-black text-[#111827] text-lg tracking-tight">{question}</span>
        <div className={`h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           {isOpen ? <Minus size={16} className="text-primary" /> : <Plus size={16} className="text-primary" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-6 text-on-surface-variant font-bold text-sm leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Support = () => {
  useDocumentTitle('Support');

  const faqs = [
    {
      question: "How does the AI specifically help with my resume?",
      answer: "We use Gemini 1.5 Pro to analyze your achievements. Instead of simple grammar checks, we rewrite your experience to highlight quantifiable results (e.g., 'Simplified logs' becomes 'Reduced log parsing latency by 45% using optimized indexing')."
    },
    {
      question: "Why use LaTeX instead of a standard PDF builder?",
      answer: "LaTeX is the engineering standard for precision. Most visual resume builders (Canva, etc.) create non-searchable or poorly structured metadata that ATS (Applicant Tracking Systems) cannot parse. Our TeX engine ensures perfect structural integrity."
    },
    {
      question: "Can I use ResumeQL as a student at LPU?",
      answer: "Yes, ResumeQL was originally built with the LPU ecosystem in mind. All verified students receive 100 free generation coins upon signup."
    },
    {
       question: "What happens if I run out of coins?",
       answer: "You can purchase additional coins in the Payments section. We also offer weekly free refills for active contributors and campus ambassadors."
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
           <MessageCircle size={12} /> Personnel Support
         </motion.div>

         <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-[#111827]" style={{ letterSpacing: '-0.05em' }}>
            Direct Line for <br /> <span className="text-primary italic">Coordination.</span>
         </h1>
         <p className="max-w-2xl mx-auto text-on-surface-variant text-xl font-bold leading-relaxed mb-16">
            Everything you need to know about scaling your career narrative. Stuck on a technical compile error? Our team is here to help.
         </p>

         <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="mailto:anubhavjaiswal1803@gmail.com" className="group">
               <div className="bg-white px-8 py-5 rounded-2xl border border-outline-variant/40 flex items-center gap-4 hover:border-primary group-hover:shadow-lg transition-all">
                  <Mail className="text-primary" />
                  <div className="text-left">
                     <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Email Support</p>
                     <p className="font-black text-on-surface">anubhavjaiswal1803@gmail.com</p>
                  </div>
               </div>
            </a>
            <a href="https://linkedin.com/in/anubhavxdev" target="_blank" className="group">
               <div className="bg-white px-8 py-5 rounded-2xl border border-outline-variant/40 flex items-center gap-4 hover:border-primary group-hover:shadow-lg transition-all">
                  <ShieldCheck className="text-primary" />
                  <div className="text-left">
                     <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">LinkedIN Coordination</p>
                     <p className="font-black text-on-surface">Connect with the Lab Founder</p>
                  </div>
               </div>
            </a>
         </div>
      </section>

      {/* FAQ & Contact Split */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
         {/* FAQs */}
         <div className="space-y-12">
            <h2 className="text-4xl font-black tracking-tight text-[#111827]">Engineering FAQ</h2>
            <div className="space-y-4">
               {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
               ))}
            </div>
         </div>

         {/* Ticket creation form */}
         <div className="bg-surface-container-low rounded-[3rem] border border-outline-variant/40 p-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
            
            <h2 className="text-3xl font-black tracking-tight text-[#111827] mb-8">Open a Support Log</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="e.g. LaTeX Compilation Error"
                    className="w-full bg-white border border-outline-variant/40 px-6 py-4 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Message Detail</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your technical difficulty..."
                    className="w-full bg-white border border-outline-variant/40 px-6 py-4 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
               </div>
               <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-container font-black text-lg py-10 shadow-3xl shadow-primary/20 group-hover:scale-[1.02] transition-transform">
                  Transmit Coordination Request <ChevronRight className="ml-2 h-5 w-5" />
               </Button>
               <p className="text-center text-xs font-bold text-on-surface-variant">
                  System currently online. Expected response time: 2-4 hours.
               </p>
            </form>
         </div>
      </section>

      {/* Community Channels */}
      <section className="py-32 bg-surface-container-low/30 border-y border-outline-variant/30 px-4">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
             <div className="mb-16 text-center">
                <Sparkles className="text-primary mb-6 mx-auto h-10 w-10 p-2 bg-primary/10 rounded-xl" />
                <h2 className="text-4xl font-black text-on-surface mb-4">The Wider Network.</h2>
                <p className="text-[#6B7280] font-bold text-lg">Join the collective to discuss architecture and career plays.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                {[
                  { name: 'Twitter', icon: Twitter, desc: 'Hotfixes & Updates' },
                  { name: 'LinkedIn', icon: Linkedin, desc: 'Industry Coordination' },
                  { name: 'Github', icon: Github, desc: 'Repo Maintenance' }
                ].map((social) => (
                  <div key={social.name} className="bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/40 text-center hover:border-primary group transition-all">
                     <social.icon size={32} className="mx-auto text-on-surface-variant mb-6 group-hover:text-primary group-hover:scale-125 transition-all" />
                     <h3 className="text-xl font-black text-on-surface mb-2">{social.name}</h3>
                     <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{social.desc}</p>
                  </div>
                ))}
             </div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default Support;
