import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, AlertCircle, RefreshCcw, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

const genzPhrases = [
  "Let him cook... 🔥",
  "Optimizing the rizz in your resume... 😎",
  "No cap, this is about to be fire... 🧢",
  "Vibe checking the Job Description... ✨",
  "Hold tight, main character moment incoming... 🎬",
  "Lowkey securing the bag for you... 💰",
  "AI is doing the heavy lifting rn... 💪",
  "Ate the ATS and left no crumbs... 🍽️",
];

const Generate = () => {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ cv: '', jd: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  
  // Rotating phrase logic
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % genzPhrases.length);
      }, 3000);
    } else {
      setPhraseIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculateATS = async () => {
    if (!formData.cv || !formData.jd) {
      return toast.error('CV and Job Description are required for scoring');
    }
    try {
      const res = await api.post('/generate/ats-score', { cv: formData.cv, jd: formData.jd });
      setAtsResult(res.data);
      toast.success('ATS analysis complete!');
    } catch (err) {
      toast.error('Failed to calculate ATS score');
    }
  };

  const handleGenerate = async () => {
    if (!formData.cv || !formData.jd) {
      return toast.error('CV and Job Description are required');
    }
    if (user.coins < 50) {
      return toast.error('Insufficient coins. Please top up.');
    }

    setIsGenerating(true);
    try {
      const res = await api.post('/generate/generate', { cv: formData.cv, jd: formData.jd });
      const updatedLatex = res.data.updatedLatex;
      sessionStorage.setItem('resumeLatex', updatedLatex);
      toast.success('Resume optimized! Redirecting...');
      fetchUser();
      navigate('/result');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'AI generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16 relative overflow-hidden">
      {/* FULLSCREEN LOADING OVERLAY */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-zinc-800 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full border-t-4 border-purple-500 animate-spin absolute top-0 left-0"></div>
                  <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
                </div>
              </div>
              
              <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={phraseIndex}
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                  >
                    {genzPhrases[phraseIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <p className="text-zinc-500 font-mono text-sm max-w-xs leading-relaxed animate-pulse">
                Taking 1-3 minutes.<br />
                Do not close or refresh this page.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400 mb-4"
          >
            <Sparkles className="h-4 w-4" /> Powered by Gemini AI
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight">AI Resume Optimizer</h1>
          <p className="mt-4 text-zinc-400">Tailor your resume for any Job Description in seconds.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Inputs */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500" /> Current CV Content
              </label>
              <textarea
                name="cv"
                value={formData.cv}
                onChange={handleInputChange}
                className="h-64 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Paste your plain text resume content here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" /> Job Description
              </label>
              <textarea
                name="jd"
                value={formData.jd}
                onChange={handleInputChange}
                className="h-64 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Paste the job description you are targeting..."
              />
            </div>
          </div>

          {/* Right: Analysis & Generate */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 backdrop-blur-xl">
              <div className="mb-8 space-y-4">
                <Button
                  onClick={handleCalculateATS}
                  variant="outline"
                  className="w-full border-zinc-800 hover:bg-zinc-800 h-14 text-lg"
                >
                  <RefreshCcw className="mr-2 h-5 w-5" /> Analyze ATS Score
                </Button>

                <AnimatePresence>
                  {atsResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between rounded-xl bg-purple-600/10 p-4 border border-purple-500/20">
                        <div>
                          <p className="text-sm font-medium text-zinc-400">Current Match</p>
                          <p className="text-3xl font-bold text-white">{atsResult.score}%</p>
                        </div>
                        <div className="h-16 w-16 rounded-full border-4 border-purple-600/30 flex items-center justify-center relative">
                          <div
                            className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-purple-500 origin-center"
                            style={{ transform: `rotate(${(atsResult.score / 100) * 360}deg)` }}
                          ></div>
                          <span className="font-bold text-purple-500">{atsResult.score}</span>
                        </div>
                      </div>

                      {atsResult.missingKeywords?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" /> Missing Keywords
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {atsResult.missingKeywords.map(k => (
                              <span key={k} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700">
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {atsResult.suggestions && (
                        <div className="space-y-2 rounded-xl bg-blue-500/5 p-4 border border-blue-500/10">
                          <p className="text-sm font-medium text-blue-400 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> Optimization Suggestions
                          </p>
                          <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                            {atsResult.suggestions}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-zinc-500 italic">
                  * AI will optimize content using your professional template. Structure stays intact.
                </p>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || user?.coins < 50}
                  className="w-full bg-purple-600 h-16 text-lg font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Generate Optimized Resume (50 Coins)
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;
