import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Globe,
  Database
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import FooterEnriched from '../components/landing/FooterEnriched';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ApiEndpoint = ({ method, path, desc }) => (
  <div className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden group hover:shadow-lg transition-all">
    <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30">
       <div className="flex items-center gap-3">
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${method === 'POST' ? 'bg-blue-500/10 text-blue-600' : 'bg-green-500/10 text-green-600'}`}>{method}</span>
          <code className="text-sm font-mono font-bold text-[#111827]">{path}</code>
       </div>
       <ShieldCheck size={14} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-6">
       <p className="text-xs font-bold text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ApiDocs = () => {
  useDocumentTitle('API Documentation');

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
           <Terminal size={12} /> External Coordination
         </motion.div>

         <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-[#111827]" style={{ letterSpacing: '-0.05em' }}>
            The API <span className="text-primary italic">Interface.</span>
         </h1>
         <p className="max-w-2xl mx-auto text-on-surface-variant text-xl font-bold leading-relaxed mb-16">
            Programmatic access to the ResumeQL generation and ATS scoring engines. Built for high-concurrency external integrations.
         </p>
      </section>

      {/* Main Content Sections */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
         <div className="space-y-16">
            <h2 className="text-4xl font-black tracking-tight text-[#111827] flex items-center gap-4">
               Base Architecture <Database className="text-primary" />
            </h2>
            <div className="space-y-8">
               <div className="bg-[#111827] rounded-[2rem] p-8 text-white font-mono text-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                     <Zap size={40} className="text-primary" />
                  </div>
                  <p className="text-primary font-bold mb-4 uppercase tracking-widest text-xs">// BASE ENDPOINT</p>
                  <code className="text-lg">https://resumeql-server.onrender.com/api</code>
               </div>

               <div className="space-y-6">
                  <h3 className="text-2xl font-black text-[#111827] tracking-tight">Core Endpoints</h3>
                  <div className="grid grid-cols-1 gap-4">
                     <ApiEndpoint method="POST" path="/generate/generate" desc="Accepts profile data and JD to return AI-optimized LaTeX content." />
                     <ApiEndpoint method="POST" path="/generate/ats-score" desc="Returns a structural ATS score and analysis suggestions." />
                     <ApiEndpoint method="POST" path="/generate/download-pdf" desc="Compiles LaTeX source into a high-fidelity PDF document." />
                  </div>
               </div>
            </div>
         </div>

         {/* Implementation Guide panel */}
         <div className="bg-surface-container-low rounded-[3rem] border border-outline-variant/40 p-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-40" />
            
            <h2 className="text-3xl font-black tracking-tight text-[#111827] mb-8">Authentication</h2>
            <p className="text-on-surface-variant font-bold text-sm mb-10 leading-relaxed">
               All requests must include a JWT Bearer token in the `Authorization` header. Generate your tokens via the `/auth/login` endpoint or your Admin Profile.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 font-mono text-xs text-[#111827] mb-12">
               <p className="opacity-50 mb-2">// Sample Request Header</p>
               <p><span className="text-primary">"Authorization":</span> "Bearer eyJhbGciOiJIUzI1Ni..."</p>
               <p><span className="text-primary">"Content-Type":</span> "application/json"</p>
            </div>

            <div className="space-y-6">
               <h3 className="text-xl font-black text-[#111827]">Rate Limits</h3>
               <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <Cpu className="text-primary" size={20} />
                  <span className="text-xs font-bold text-on-surface-variant">Standard Tier: 100 requests / minute</span>
               </div>
               <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl opacity-60">
                  <Zap className="text-primary" size={20} />
                  <span className="text-xs font-bold text-on-surface-variant">Enterprise Tier: Unlimited scaling</span>
               </div>
            </div>
         </div>
      </section>

      {/* Call to action */}
      <section className="py-24 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-[#111827] mb-8">Ready to Scale?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button size="lg" className="rounded-2xl px-12 py-8 bg-[#111827] text-white font-black hover:bg-[#1F2937]">
                  Request API Key <Globe className="ml-2 h-5 w-5" />
               </Button>
               <Button variant="ghost" className="font-bold text-primary">
                  View full documentation <ChevronRight size={16} />
               </Button>
            </div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default ApiDocs;
