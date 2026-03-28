import React from 'react';
import { motion } from 'framer-motion';

const PageSpinner = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-surface-container-high" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm text-xs">
            R
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest text-on-surface-variant uppercase"
        >
          Loading Workspace
        </motion.p>
      </div>
    </div>
  );
};

export default PageSpinner;
