import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Tag, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Zap, 
  Search,
  Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import FooterEnriched from '../components/landing/FooterEnriched';

const Blog = () => {
  useDocumentTitle('Engineering Blog');

  const posts = [
    {
      id: 1,
      title: 'How we used Gemini 1.5 Pro to solve the "Resume Hallucination" problem.',
      excerpt: 'Traditional LLMs often invent details in resumes. Here is how our engineering team built a strict contextual validator.',
      author: 'Anubhav J.',
      date: 'Mar 24, 2024',
      readTime: '6 min read',
      category: 'AI Engineering',
      icon: Sparkles
    },
    {
      id: 2,
      title: 'The LaTeX Advantage: Why legacy ATS filters hate beautiful Canva resumes.',
      excerpt: 'Visual resumes look great to humans but are unreadable to bots. We break down the technical science of TeX parsing.',
      author: 'ResumeQL Team',
      date: 'Mar 18, 2024',
      readTime: '4 min read',
      category: 'Career Tech',
      icon: Cpu
    },
    {
      id: 3,
      title: 'Scaling our PDF compilation engine to handle 50,000 requests/hour.',
      excerpt: 'A deep dive into our distributed Tectonic-based microservices and how we optimized the rendering pipeline.',
      author: 'Anubhav J.',
      date: 'Mar 10, 2024',
      readTime: '8 min read',
      category: 'Infrastructure',
      icon: Terminal
    },
    {
      id: 4,
      title: 'Strategic Storytelling: Moving from experience logs to achievement records.',
      excerpt: 'Quantifying your impact is hard. Our AI-driven achievement extractor removes the guesswork from your professional history.',
      author: 'ResumeQL Team',
      date: 'Feb 28, 2024',
      readTime: '5 min read',
      category: 'Career strategy',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex flex-col">
      <Navbar theme="light" />

      {/* Hero Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none opacity-40 translate-x-1/2 -translate-y-1/2" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest"
        >
          <Terminal size={12} /> The Engineering Feed
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight text-[#111827]"
          style={{ letterSpacing: '-0.04em' }}
        >
          Engineering <span className="text-primary italic">Notes.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto text-lg text-on-surface-variant font-medium leading-relaxed"
        >
          Deep dives into AI engineering, career strategy, and the technical architecture powering the next generation of professional identities.
        </motion.p>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-y border-outline-variant/30 bg-surface-container-low/30 sticky top-16 z-40 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Search architecture logs..." 
                  className="w-full h-12 rounded-xl bg-white border border-outline-variant/40 px-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
               />
            </div>
            <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
               {['All Notes', 'AI Engineering', 'Infrastructure', 'Career Tech'].map((cat, i) => (
                  <button 
                    key={i} 
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${i === 0 ? 'bg-[#111827] text-white border-transparent' : 'bg-white text-on-surface-variant border-outline-variant/40 hover:border-primary/50 hover:text-primary'}`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Featured Post (Visual Anchor) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
         <motion.div 
           whileHover={{ y: -5 }}
           className="relative bg-[#111827] rounded-[2.5rem] overflow-hidden group flex flex-col lg:flex-row shadow-2xl shadow-primary/10"
         >
            <div className="lg:w-1/2 p-12 flex flex-col justify-center relative z-10">
               <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> Featured Note
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  The Multi-Agent AI System behind ResumeQL V3.
               </h2>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
                  We built a proprietary mesh of specialized agents to handle everything from ATS-parsing to career narrative orchestration.
               </p>
               <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2">
                     <Clock size={16} className="text-primary" />
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">12 Min Read</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                     <Tag size={16} className="text-primary" />
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">AI ARCHITECTURE</span>
                  </div>
               </div>
               <Button size="lg" className="w-fit rounded-xl px-10 bg-primary hover:bg-primary-container font-black py-7">
                  Read Technical Breakdown <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
            <div className="lg:w-1/2 h-80 lg:h-auto bg-gradient-to-br from-primary/20 via-primary/5 to-transparent relative group-hover:scale-105 transition-transform duration-700">
               <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <Terminal size={200} className="text-primary" />
               </div>
            </div>
         </motion.div>
      </section>

      {/* Post Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2rem] p-10 border border-outline-variant/30 hover:bg-surface-container-lowest transition-all hover:shadow-xl hover:shadow-primary/5 relative"
              >
                <div className="h-14 w-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-8 border border-outline-variant/40 group-hover:bg-primary group-hover:text-white transition-all">
                   <post.icon size={28} />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
                     {post.category}
                   </span>
                   <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                     {post.date}
                   </span>
                </div>

                <h3 className="text-2xl font-black text-[#111827] mb-4 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-[#6B7280] font-medium leading-relaxed mb-8 h-20 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center font-black text-xs">
                         {post.author.charAt(0)}
                      </div>
                      <div className="text-left">
                         <p className="text-xs font-black text-[#111827]">{post.author}</p>
                         <p className="text-[10px] font-bold text-on-surface-variant uppercase">{post.readTime}</p>
                      </div>
                   </div>
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface-container-high hover:bg-primary hover:text-white transition-all">
                      <ArrowRight size={18} />
                   </button>
                </div>
              </motion.article>
            ))}
         </div>

         {/* Pagination / Load More */}
         <div className="mt-20 flex justify-center">
            <Button variant="outline" className="rounded-2xl px-12 py-8 bg-white font-black text-lg border-outline-variant shadow-sm hover:shadow-md transition-all">
               Load More Logs 
            </Button>
         </div>
      </section>

      {/* Newsletter Strip */}
      <section className="py-24 px-4">
         <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -z-0" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
               Engineering insights in your inbox.
            </h2>
            <p className="text-white/80 font-bold mb-12 relative z-10 text-lg">
               Join 12,000+ elite professionals receiving weekly status reports on career tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 max-w-lg mx-auto">
               <input 
                  type="email" 
                  placeholder="professional@email.com" 
                  className="flex-1 rounded-2xl bg-white/10 border border-white/20 px-8 py-5 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all font-bold"
               />
               <Button className="rounded-2xl px-10 py-5 bg-white text-primary font-black hover:bg-white/90">
                  Subscribe
               </Button>
            </div>
         </div>
      </section>

      <FooterEnriched />
    </div>
  );
};

export default Blog;
