import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Copy, Check, FileText, Download, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Result = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [error, setError] = useState(null);
  
  useDocumentTitle('Document Ready');

  const latex = sessionStorage.getItem('resumeLatex');

  // 1. Navigation Guard (useEffect fix to prevent render-cycle navigation)
  useEffect(() => {
    if (!latex) {
      toast.error('No resume data found. Please generate again.');
      navigate('/generate');
    }
  }, [latex, navigate]);

  // 2. Real PDF Generation Logic (Blob + ObjectURL + AbortController)
  useEffect(() => {
    if (!latex) return;

    const controller = new AbortController();
    const fetchPdf = async () => {
      setLoadingPdf(true);
      setError(null);
      try {
        const response = await api.post('/generate/download-pdf', 
          { latex }, 
          { 
            responseType: 'blob',
            signal: controller.signal 
          }
        );
        
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('PDF Fetch Error:', err);
          setError('Failed to render PDF preview. You can still copy the LaTeX code.');
          toast.error('PDF Preview failed to load');
        }
      } finally {
        setLoadingPdf(false);
      }
    };

    fetchPdf();

    // Cleanup: Prevent memory leaks and cancel pending requests
    return () => {
      controller.abort();
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [latex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(latex || '');
    setCopied(true);
    toast.success('LaTeX copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
        toast.error("PDF not ready for download");
    }
  };

  if (!latex) return null;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] gap-6 p-2 lg:p-0">
      
      {/* Left Sidebar Actions */}
      <div className="hidden lg:flex w-80 flex-col gap-6 h-full p-6 bg-surface-container-lowest rounded-2xl border border-ghost shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary mb-4 uppercase tracking-widest">
            <CheckCircle2 className="h-3 w-3" /> Ready
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Resume Generated</h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Your ATS-optimized LaTeX source is ready to be compiled into a PDF.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <Button 
            onClick={handleDownload} 
            disabled={!pdfUrl || loadingPdf}
            className="w-full text-sm font-semibold h-12 justify-start px-4 shadow-ambient"
          >
            <Download className="mr-3 h-4 w-4" /> 
            {loadingPdf ? 'Compiling PDF...' : 'Download PDF'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/generate')}
            className="w-full text-sm font-semibold h-12 justify-start px-4 bg-surface hover:bg-surface-container-low text-on-surface"
          >
            <Edit className="mr-3 h-4 w-4" /> Edit Content
          </Button>
          <Button variant="outline" onClick={handleCopy} className="w-full text-sm font-semibold h-12 justify-start px-4 bg-surface hover:bg-surface-container-low text-on-surface border-ghost">
            {copied ? <Check className="mr-3 h-4 w-4 text-green-500" /> : <Copy className="mr-3 h-4 w-4" />}
            {copied ? 'Copied to Clipboard' : 'Copy LaTeX Code'}
          </Button>
        </div>

        <div className="mt-auto pt-6 border-t border-outline-variant/30">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="w-full justify-start text-on-surface-variant hover:text-on-surface">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workspace
          </Button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col h-full bg-surface-container-low rounded-2xl border border-ghost overflow-hidden relative">
        <div className="h-14 border-b border-outline-variant/50 flex justify-center items-center gap-2">
          <div className="flex bg-surface-container-high rounded-lg p-1 border border-ghost">
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-6 py-1.5 text-sm font-bold rounded-md transition-colors ${viewMode === 'preview' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Visual Preview
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-6 py-1.5 text-sm font-bold rounded-md transition-colors flex items-center gap-2 ${viewMode === 'code' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <FileText className="h-4 w-4" /> LaTeX Code
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-surface w-full h-full relative">
          <AnimatePresence mode="wait">
            {viewMode === 'preview' ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-[900px] h-full bg-surface-container-lowest rounded-xl shadow-ambient border border-ghost overflow-hidden flex flex-col"
              >
                {loadingPdf ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <div className="h-12 w-12 border-4 border-surface-container-high border-t-primary rounded-full animate-spin" />
                    <p className="text-sm font-bold text-on-surface-variant animate-pulse tracking-tight">Compiling professional document...</p>
                  </div>
                ) : error ? (
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                     <FileText className="h-16 w-16 text-on-surface-variant opacity-20" />
                     <h3 className="text-lg font-bold text-on-surface">Preview Unavailable</h3>
                     <p className="text-sm text-on-surface-variant max-w-xs">{error}</p>
                     <Button variant="outline" onClick={() => window.location.reload()}>Retry Preview</Button>
                   </div>
                ) : pdfUrl ? (
                  <iframe 
                    src={`${pdfUrl}#toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none"
                    title="Resume Preview"
                  />
                ) : (
                   <div className="flex-1 flex items-center justify-center">
                     <p className="text-on-surface-variant">Waiting for document...</p>
                   </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="code"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-[900px] h-full bg-[#1e1e1e] text-[#d4d4d4] rounded-xl shadow-ambient flex flex-col overflow-hidden"
              >
                <div className="flex justify-between items-center px-6 py-3 border-b border-[#333] bg-[#252526]">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-xs font-mono font-bold text-on-surface/60">resume.tex</span>
                  </div>
                  <button onClick={handleCopy} className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1.5">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copied' : 'Copy LaTeX'}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={latex || ''}
                  className="flex-1 w-full bg-transparent font-mono text-sm p-6 leading-relaxed outline-none resize-none custom-scrollbar"
                  spellCheck={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default Result;
