import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Persistence: Don't show again if dismissed in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement-dismissed');
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative bg-primary text-on-primary overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <p className="text-sm leading-6 flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4" />
                <strong className="font-semibold">Gemini 1.5 Pro</strong>
                <span className="hidden sm:inline">Now powering deep contextual resume rewriting.</span>
                <a 
                  href="/changelog" 
                  className="flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4"
                >
                  Read the changelog <ArrowRight className="h-3 w-3" />
                </a>
              </p>
              <button 
                onClick={handleDismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
