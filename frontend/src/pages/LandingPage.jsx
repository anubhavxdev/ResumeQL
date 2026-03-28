import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Modular Landing Components
import AnnouncementBar from '../components/landing/AnnouncementBar';
import InteractiveDemo from '../components/landing/InteractiveDemo';
import LogoStrip from '../components/landing/LogoStrip';
import Timeline from '../components/landing/Timeline';
import BeforeAfter from '../components/landing/BeforeAfter';
import ComparisonTable from '../components/landing/ComparisonTable';
import PricingSection from '../components/landing/PricingSection';
import TestimonialMarquee from '../components/landing/TestimonialMarquee';
import FooterEnriched from '../components/landing/FooterEnriched';
import StickyCTA from '../components/landing/StickyCTA';

const LandingPage = () => {
  useDocumentTitle('Premium AI Resume Builder');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface overflow-x-hidden selection:bg-primary/20">
      <AnnouncementBar />
      
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 glass-nav border-b border-outline-variant/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm">
                R
              </div>
              <span className="text-xl font-bold tracking-tight">ResumeQL</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
               <button 
                 onClick={() => scrollToSection('how-it-works')}
                 className="text-sm font-semibold text-[#6B7280] hover:text-primary transition-colors flex items-center gap-1"
               >
                 How it works <ChevronDown size={14} />
               </button>
               <button 
                 onClick={() => scrollToSection('pricing')}
                 className="text-sm font-semibold text-[#6B7280] hover:text-primary transition-colors"
               >
                 Pricing
               </button>
               <Link
                 to="/about"
                 className="text-sm font-semibold text-[#6B7280] hover:text-primary transition-colors"
               >
                 About
               </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-[#374151] hover:text-primary transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup">
              <Button size="sm" className="rounded-xl shadow-ambient font-bold px-6 bg-primary hover:bg-primary-container">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        {/* Deep background depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-60" />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary mb-8 uppercase tracking-widest"
        >
          <Sparkles className="h-3 w-3" /> Engineering-Grade AI Excellence
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight max-w-5xl text-[#111827] leading-[1.05]"
          style={{ letterSpacing: '-0.04em' }}
        >
          The Digital Atelier <br className="hidden md:block" /> 
          for Your <span className="text-primary italic">Career.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl text-[#6B7280] max-w-2xl font-medium leading-relaxed"
        >
          Transform raw history into a high-performance, LaTeX-rendered narrative. Built for elite professionals who don't settle for "Generic."
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto rounded-2xl text-lg shadow-2xl shadow-primary/20 font-bold px-10 py-8 bg-primary hover:bg-primary-container">
              Start Free Workshop <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-2xl text-lg font-bold px-10 py-8 bg-white border-[#E5E7EB] hover:bg-gray-50">
              View Sample Engine
            </Button>
          </Link>
        </motion.div>

        {/* Interactive Demo Integration */}
        <InteractiveDemo />
      </section>

      {/* Social Proof */}
      <LogoStrip />

      {/* Core Logic Grid (Enriched) */}
      <section id="how-it-works" className="py-24 bg-surface-container-low/30 border-y border-outline-variant/30">
         <Timeline />
         <BeforeAfter />
      </section>

      <ComparisonTable />

      {/* Conversion Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      <TestimonialMarquee />

      {/* Final CTA Strip */}
      <section className="py-24 px-4 overflow-hidden relative">
         <div className="max-w-4xl mx-auto bg-[#111827] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-0" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
               Stop Fighting Word. <br /> Start Engineering Your Future.
            </h2>
            <Link to="/signup" className="relative z-10">
               <Button size="lg" className="rounded-2xl text-xl font-bold px-12 py-8 bg-primary hover:bg-primary-container shadow-2xl shadow-primary/20">
                  Build My Professional Record <Zap className="ml-2 h-5 w-5" />
               </Button>
            </Link>
         </div>
      </section>

      <FooterEnriched />

      {/* Floating Elements */}
      <StickyCTA />
    </div>
  );
};

export default LandingPage;
