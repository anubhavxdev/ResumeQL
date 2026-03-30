import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, LifeBuoy, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('404 - Page Not Found');

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-2xl"
      >
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/40 shadow-sm">
           <Search className="w-10 h-10 text-primary animate-pulse" />
        </div>

        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-[#111827] mb-4">
          4<span className="text-primary italic">0</span>4
        </h1>
        
        <h2 className="text-3xl font-bold text-on-surface mb-6 tracking-tight">
          This page has drifted off-course.
        </h2>
        
        <p className="text-on-surface-variant text-lg font-medium max-w-md mx-auto mb-12 leading-relaxed">
          The tactical achievement record you're looking for isn't here. It may have been moved, deleted, or never existed in this coordinate.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button asChild size="lg" className="rounded-2xl px-8 py-7 bg-[#111827] text-white font-black hover:bg-[#1F2937] transition-all group">
              <Link to="/">
                 <Home className="mr-2 h-5 w-5 group-hover:-translate-y-0.5 transition-transform" /> 
                 Return Base
              </Link>
           </Button>
           
           <Button variant="ghost" asChild className="font-bold text-on-surface-variant hover:text-primary">
              <Link to="/support">
                 <LifeBuoy className="mr-2 h-5 w-5" /> 
                 Contact Support
              </Link>
           </Button>
        </div>

        <div className="mt-24 pt-8 border-t border-outline-variant/30">
           <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
             System Status: <span className="text-green-600">All Modules Operational</span>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
