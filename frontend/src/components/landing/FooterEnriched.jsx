import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Sparkles, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const FooterEnriched = () => {
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Gemini AI Lab', href: '/generate' },
        { name: 'LaTeX Engine', href: '/result' },
        { name: 'ATS Scoring', href: '/dashboard' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'Meet the Creator', href: '/about' },
        { name: 'Engineering Blog', href: '/blog' },
        { name: 'Changelog', href: '/changelog' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Resume Guide', href: '/guide' },
        { name: 'ATS Keyword List', href: '/keywords' },
        { name: 'API Docs', href: '/api-docs' },
        { name: 'Support', href: '/support' },
      ]
    }
  ];

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
        {/* Branding & Newsletter */}
        <div className="flex-1 max-w-sm">
           <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-sm">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-[#111827]">ResumeQL</span>
           </div>
           <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
             The tactical edge for career transitioners. Built for professionals who treat their resume like an atomic achievement record.
           </p>
           
           <div className="space-y-4">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest block">
                Stay updated
              </label>
              <div className="flex gap-2">
                 <input 
                   disabled
                   type="email" 
                   placeholder="Your professional email"
                   className="flex-1 bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                 />
                 <button className="h-10 px-4 bg-[#111827] text-white rounded-xl text-xs font-bold hover:bg-[#1F2937] transition-colors">
                   <ArrowRight size={14} />
                 </button>
              </div>
           </div>
        </div>

        {/* Links Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-12">
           {sections.map(section => (
             <div key={section.title}>
                <h4 className="text-sm font-bold text-[#111827] uppercase tracking-widest mb-6">{section.title}</h4>
                <ul className="space-y-4">
                   {section.links.map(link => (
                     <li key={link.name}>
                        <Link 
                          to={link.href} 
                          className="text-sm font-medium text-[#6B7280] hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                           {link.name}
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Connect</span>
            <div className="flex gap-4 text-[#6B7280]">
               <Twitter size={18} className="hover:text-primary transition-colors cursor-pointer" />
               <Linkedin size={18} className="hover:text-primary transition-colors cursor-pointer" />
               <Github size={18} className="hover:text-primary transition-colors cursor-pointer" />
            </div>
         </div>

         <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full">
               <ShieldCheck size={14} className="text-primary" />
               <span className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full">
               <Sparkles size={14} className="text-primary" />
               <span className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Built with Gemini AI 1.5 Pro</span>
            </div>
            <p className="text-xs font-medium text-[#94A3B8]">
               © {new Date().getFullYear()} ResumeQL Inc.
            </p>
         </div>
      </div>
    </footer>
  );
};

export default FooterEnriched;
