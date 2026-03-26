import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Sparkles, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';

const Result = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const latex = sessionStorage.getItem('resumeLatex');

  if (!latex) {
    if (typeof window !== 'undefined') {
      toast.error('No resume data found. Please generate again.');
      navigate('/generate');
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(latex || '');
    setCopied(true);
    toast.success('LaTeX copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <Navbar />

      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 text-white">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="w-full max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl space-y-8"
        >
          <div className="text-center space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
              <Sparkles className="h-4 w-4" /> Optimized with Gemini AI
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-400" /> Resume Ready!
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your AI-optimized resume has been generated. Use the LaTeX code below in Overleaf or any LaTeX editor to render your PDF.
              </p>
            </div>
          </div>

          {/* LaTeX Code Block */}
          <div className="relative group rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
              <span className="text-sm font-medium text-zinc-400 font-mono">resume.tex</span>
              <Button 
                onClick={handleCopy} 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                {copied ? <Check className="h-4 w-4 mr-1 text-green-500" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? 'Copied' : 'Copy code'}
              </Button>
            </div>
            <textarea
              readOnly
              value={latex || ''}
              className="w-full h-[50vh] p-4 bg-transparent text-sm font-mono text-zinc-300 outline-none resize-none focus:ring-0 custom-scrollbar"
              spellCheck={false}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/generate')}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 h-12 px-8 text-base font-semibold hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
              <Sparkles className="mr-2 h-5 w-5" /> Generate Another
            </Button>

            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full sm:w-auto border-zinc-800 hover:bg-zinc-800 h-12 px-8 text-base"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Result;
