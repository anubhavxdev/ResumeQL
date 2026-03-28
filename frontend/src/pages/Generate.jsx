import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const genzPhrases = [
  "Structuring your narrative...",
  "Running ATS compatibility checks...",
  "Formatting credentials...",
  "Optimizing keyword density...",
  "Drafting LaTeX document...",
  "Finalizing editorial layout...",
];

const steps = [
  { id: 1, title: 'Target Role', subtitle: 'Job Description' },
  { id: 2, title: 'Profile', subtitle: 'Personal Details' },
  { id: 3, title: 'Experience', subtitle: 'Work History' },
  { id: 4, title: 'Skills & Edu', subtitle: 'Qualifications' },
];

const Generate = () => {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle('Resume Builder');
  
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    jd: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    links: '',
    experience: '',
    education: '',
    skills: ''
  });

  const [atsResult, setAtsResult] = useState(null);
  const [analyzingAts, setAnalyzingAts] = useState(false);

  // Centralized Step Validation Logic
  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.jd.trim().length > 20;
      case 2:
        return (
          formData.name.trim().length > 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
          formData.phone.trim().length > 5
        );
      case 3:
        return formData.experience.trim().length > 50;
      case 4:
        return formData.education.trim().length > 10 && formData.skills.trim().length > 5;
      default:
        return true;
    }
  };

  const isCurrentStepValid = validateStep(step);

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % genzPhrases.length);
      }, 2500);
    } else {
      setPhraseIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const constructCV = () => {
    return `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Links: ${formData.links}

Experience:
${formData.experience}

Education:
${formData.education}

Skills:
${formData.skills}
    `.trim();
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      return toast.error("Please complete all required fields for this step.");
    }
    setStep(prev => Math.min(prev + 1, steps.length));
  };
  
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCalculateATS = async () => {
    if (!validateStep(1)) return toast.error('Please provide a job description first.');
    const cv = constructCV();
    if (cv.length < 50) return toast.error('Please provide basic profile and experience details.');
    
    setAnalyzingAts(true);
    try {
      const res = await api.post('/generate/ats-score', { cv, jd: formData.jd });
      setAtsResult(res.data);
      toast.success('ATS analysis complete');
    } catch (err) {
      toast.error('Failed to calculate ATS score');
    } finally {
      setAnalyzingAts(false);
    }
  };

  const handleGenerate = async () => {
    // Final hard-validation check
    for (let i = 1; i <= 4; i++) {
        if (!validateStep(i)) {
            setStep(i);
            return toast.error(`Incomplete details in Step ${i}. Check highlighted fields.`);
        }
    }

    const cv = constructCV();
    if (user.coins < 50) {
      return toast.error('Insufficient coins. Please purchase more.');
    }

    setIsGenerating(true);
    try {
      const res = await api.post('/generate/generate', { cv, jd: formData.jd });
      sessionStorage.setItem('resumeLatex', res.data.updatedLatex);
      fetchUser();
      navigate('/result');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'AI generation failed');
      setIsGenerating(false);
    }
  };

  return (
    <div className="pb-12 text-on-surface">
      {/* Fullscreen Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-2xl shadow-ambient border border-ghost max-w-sm w-full">
              <div className="h-16 w-16 mb-6 rounded-full border-4 border-surface-container-high border-t-primary animate-spin" />
              <div className="h-8 overflow-hidden relative w-full text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phraseIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-lg font-bold tracking-tight text-primary absolute w-full"
                  >
                    {genzPhrases[phraseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                DO NOT CLOSE THIS PAGE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8 border-b border-outline-variant/30 pb-6 w-full flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Architect</h1>
          <p className="text-on-surface-variant">Build a highly tailored resume in 4 simple steps.</p>
        </div>
      </header>

      {/* Stepper Progress */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-container-high -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary transition-all duration-500 ease-in-out -z-10" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div 
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  step >= s.id 
                    ? 'bg-primary text-on-primary shadow-ambient' 
                    : 'bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
              </div>
              <div className="hidden sm:block mt-3 text-center">
                <p className={`text-sm font-bold ${step >= s.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{s.title}</p>
                <p className="text-xs text-on-surface-variant">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-2xl border border-ghost shadow-sm overflow-hidden flex flex-col md:min-h-[600px]">
        {/* Form Area */}
        <div className="p-6 sm:p-10 flex-1 h-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 h-[450px] flex flex-col">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface">Target Job Description</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Paste the exact job description to align your keywords.</p>
                </div>
                <label htmlFor="jd" className="sr-only">Job Description</label>
                <textarea
                  id="jd"
                  name="jd"
                  value={formData.jd}
                  onChange={handleChange}
                  className="flex-1 w-full rounded-xl border border-ghost bg-surface-container-low p-5 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-inner"
                  placeholder="Senior Frontend Developer&#10;&#10;Responsibilities:&#10;- Architect complex react applications...&#10;- Lead a team of...&#10;&#10;Requirements:&#10;- 5+ years React...&#10;- Experience with Next.js..."
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface">Personal Profile</h2>
                  <p className="text-on-surface-variant text-sm mt-1">The header information for your resume.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-bold text-on-surface">Full Name</label>
                    <input id="fullName" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg bg-surface-container-low border border-ghost px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-on-surface">Email Address</label>
                    <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="w-full rounded-lg bg-surface-container-low border border-ghost px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-on-surface">Phone Number</label>
                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-lg bg-surface-container-low border border-ghost px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="links" className="text-sm font-bold text-on-surface">Links (LinkedIn, Portfolio)</label>
                    <input id="links" name="links" value={formData.links} onChange={handleChange} className="w-full rounded-lg bg-surface-container-low border border-ghost px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="github.com/johndoe | linkedin.com/in/johndoe" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 h-[450px] flex flex-col">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface">Work Experience</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Paste your raw work history. The AI will optimally format and rewrite it.</p>
                </div>
                <label htmlFor="experience" className="sr-only">Work Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="flex-1 w-full rounded-xl border border-ghost bg-surface-container-low p-5 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-inner"
                  placeholder="Software Engineer at Tech Corp (2020-Present)&#10;- Build current project...&#10;- Improved SEO performance by 30%..."
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface">Education & Skills</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Finalize your credentials before generation.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 flex flex-col h-[250px]">
                    <label htmlFor="education" className="text-sm font-bold text-on-surface">Education</label>
                    <textarea
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="flex-1 w-full rounded-xl border border-ghost bg-surface-container-low p-4 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-inner"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col h-[250px]">
                    <label htmlFor="skills" className="text-sm font-bold text-on-surface">Skills (Comma separated)</label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="flex-1 w-full rounded-xl border border-ghost bg-surface-container-low p-4 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-inner"
                    />
                  </div>
                </div>

                {/* Optional ATS checking before generation */}
                <div className="bg-surface-container-low rounded-xl p-5 border border-ghost mt-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">Optimization Check</h4>
                      <p className="text-xs text-on-surface-variant">Check your ATS score before spending credits.</p>
                    </div>
                    <Button onClick={handleCalculateATS} disabled={analyzingAts} variant="outline" size="sm" className="bg-surface">
                      {analyzingAts ? <RefreshCcw className="animate-spin h-3 w-3 mr-2" /> : <RefreshCcw className="h-3 w-3 mr-2" />}
                      Run Score
                    </Button>
                  </div>
                  
                  {atsResult && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-outline-variant/30">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-on-surface text-base">Score: {atsResult.score}%</span>
                        <div className="h-1.5 w-1/2 bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${atsResult.score}%` }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 bg-surface-container-low border-t border-outline-variant/40 flex justify-between items-center mt-auto">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className={`font-semibold ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="mr-1 h-5 w-5" /> Back
          </Button>
          
          {step < steps.length ? (
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid}
              className={`font-semibold shadow-sm px-8 ${!isCurrentStepValid ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              Next Step <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          ) : (
            <Button 
              onClick={handleGenerate} 
              disabled={!isCurrentStepValid || isGenerating}
              className={`font-semibold px-8 shadow-ambient bg-gradient-to-r from-primary to-primary-container ${(!isCurrentStepValid || isGenerating) ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              <Sparkles className="mr-2 h-5 w-5" /> Generate Resume (50 Credits)
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
