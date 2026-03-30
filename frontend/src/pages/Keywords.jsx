import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  Cpu, 
  Database, 
  Cloud, 
  Shield, 
  Terminal, 
  Code2, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import FooterEnriched from '../components/landing/FooterEnriched';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const KeywordCategory = ({ title, icon: Icon, keywords, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white rounded-[2.5rem] p-10 border border-outline-variant/40 hover:bg-surface-container-low transition-all hover:shadow-xl hover:shadow-primary/5 group"
  >
    <div className="flex items-center gap-4 mb-8">
       <div className="h-14 w-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <Icon size={28} />
       </div>
       <h3 className="text-2xl font-black text-[#111827] tracking-tight group-hover:text-primary transition-colors">{title}</h3>
    </div>
    
    <div className="flex flex-wrap gap-2">
       {keywords.map((word, i) => (
         <span 
           key={i} 
           className="px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs font-bold text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all cursor-default"
         >
           {word}
         </span>
       ))}
    </div>
  </motion.div>
);

const Keywords = () => {
  useDocumentTitle('ATS Keyword Repository');

  const categories = [
    {
       title: "Backend Architecture",
       icon: Terminal,
       keywords: ["Microservices", "RESTful APIs", "GraphQL", "gRPC", "WebSockets", "Serverless", "Event-Driven", "Docker", "Kubernetes", "CI/CD Pipelines", "System Design", "Scalability", "Concurrency", "AuthN/AuthZ", "OAuth 2.0", "Redis Caching"]
    },
    {
       title: "Frontend Engineering",
       icon: Code2,
       keywords: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "State Management", "Redux", "Zustand", "Webpack", "Vite", "SSR/SSG", "Client-Side Rendering", "PWA", "Responsive Design", "Accessibility (WCAG)", "Core Web Vitals"]
    },
    {
       title: "AI & Data Science",
       icon: Sparkles,
       keywords: ["Gemini LLM", "Prompt Engineering", "NLP", "Machine Learning", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Scikit-Learn", "Vector Databases", "LangChain", "RAG Pipeline", "Model Fine-tuning", "Neural Networks", "Data Visualisation", "Statistical Analysis"]
    },
    {
       title: "Cloud & DevOps",
       icon: Cloud,
       keywords: ["AWS", "Google Cloud (GCP)", "Azure", "Terraform", "Infrastructure as Code", "GitHub Actions", "GitLab CI", "Prometheus", "Grafana", "ELK Stack", "Docker Swarm", "Load Balancing", "CDN Optimization", "Server Hardening", "Autoscaling"]
    },
    {
       title: "Security & Database",
       icon: Shield,
       keywords: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ElasticSearch", "SQL Optimization", "Database Sharding", "Replication", "Encryption at Rest", "OWASP Top 10", "JWT", "Security Auditing", "Penetration Testing", "Compliance (GDPR/ISO)"]
    },
    {
       title: "Product & Strategy",
       icon: Zap,
       keywords: ["Agile/Scrum", "Product Roadmap", "User Testing", "A/B Testing", "MVP Development", "Stakeholder Management", "Technical Writing", "Mentorship", "Code Review", "Quality Assurance", "Growth Engineering", "Unit Testing", "E2E Testing"]
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
           <Database size={12} /> Keyword Extraction Lab
         </motion.div>

         <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-[#111827]" style={{ letterSpacing: '-0.05em' }}>
            The Digital <br /> <span className="text-primary italic">Lexicon.</span>
         </h1>
         <p className="max-w-2xl mx-auto text-on-surface-variant text-xl font-bold leading-relaxed mb-16">
            A curated high-impact repository of the technical terms that trigger modern ATS search filters. Optimized for engineering-grade resumes.
         </p>

         <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input 
               type="text" 
               placeholder="Search keywords (e.g. Kubernetes, React, LLM)..." 
               className="w-full h-20 rounded-[1.5rem] bg-white border border-outline-variant/40 px-16 text-lg font-bold outline-none focus:ring-4 focus:ring-primary/10 shadow-sm transition-all text-[#111827]"
            />
         </div>
      </section>

      {/* Grid Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {categories.map((cat, i) => (
            <KeywordCategory key={i} {...cat} delay={i * 0.1} />
         ))}
      </section>

      {/* Strategic Callout */}
      <section className="py-32 bg-[#111827] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-120 h-120 bg-primary/10 blur-[120px] -z-0" />
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight">
               Don't just list them. <br className="hidden md:block" /> Contextualize them.
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-12 max-w-2xl mx-auto">
               Keywords alone aren't enough. Our AI generation engine takes these terms and embeds them into your professional narrative as quantified achievements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto rounded-2xl text-xl font-black px-12 py-9 bg-primary hover:bg-primary-container text-white shadow-3xl shadow-primary/20 transition-all transform hover:scale-105">
                   Begin Strategy Workshop <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="hidden sm:block h-px w-10 bg-gray-800" />
                <span className="text-gray-500 font-black text-xs uppercase tracking-widest">v2.1 Database Online</span>
            </div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default Keywords;
