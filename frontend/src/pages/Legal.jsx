import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Lock, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FooterEnriched from '../components/landing/FooterEnriched';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const LegalLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 text-on-surface flex flex-col">
      <Navbar theme="light" />
      
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-12"
         >
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors mb-8 uppercase tracking-widest">
               <ArrowLeft size={14} /> Back to Atelier
            </Link>
            
            <div className="flex items-center gap-3 mb-4 text-primary font-bold text-xs uppercase tracking-[0.2em]">
               <ShieldCheck size={16} /> Compliance & Security
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#111827]">
               {title}
            </h1>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
               <Clock size={14} /> Last Updated: {lastUpdated}
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="prose prose-slate prose-lg max-w-none 
           prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[#111827]
           prose-p:text-[#4B5563] prose-p:leading-relaxed prose-p:font-medium
           prose-strong:text-[#111827] prose-strong:font-bold
           prose-li:text-[#4B5563] prose-li:font-medium
           prose-a:text-primary prose-a:no-underline hover:prose-a:underline
           border-t border-outline-variant/30 pt-12"
         >
            {children}
         </motion.div>
      </main>

      <FooterEnriched />
    </div>
  );
};

export const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy');
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 20, 2024">
      <h2>1. Information We Collect</h2>
      <p>
        ResumeQL collects information that identifies, relates to, describes, or is reasonably capable of being associated with you. This "Personal Information" includes:
      </p>
      <ul>
        <li><strong>Account Data:</strong> Name, professional email address, and authentication credentials.</li>
        <li><strong>Professional History:</strong> Work experience, education, skills, and certifications provided for resume generation.</li>
        <li><strong>Usage Data:</strong> Metadata regarding how you interact with our AI agents and the frequency of document compilation.</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>
        We utilize your data strictly for the following engineering purposes:
      </p>
      <ul>
        <li>Generating high-fidelity LaTeX documents via our Gemini AI pipeline.</li>
        <li>Calculating ATS (Applicant Tracking System) scores and providing contextual optimization feedback.</li>
        <li>Maintaining account security and preventing unauthorized access to your private workspaces.</li>
      </ul>

      <h2>3. AI Processing & Gemini Integration</h2>
      <p>
        ResumeQL utilizes Google’s Gemini AI API. While we transmit content for processing, <strong>we do not permit Google to use your professional achievement data for training their underlying public models</strong>. Each request is scoped to your specific session.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain your generated resumes and career logs until you explicitly delete your account. You have the right to request a full archive (JSON format) of your professional achievement records at any time.
      </p>

      <h2>5. Security Protocol</h2>
      <p>
        All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We conduct bi-weekly security audits of our authentication middleware and PDF compilation sandbox.
      </p>
    </LegalLayout>
  );
};

export const TermsOfService = () => {
  useDocumentTitle('Terms of Service');
  return (
    <LegalLayout title="Terms of Service" lastUpdated="March 20, 2024">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing the ResumeQL platform ("The Digital Atelier"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must immediately terminate your use of the service.
      </p>

      <h2>2. Permitted Use</h2>
      <p>
        ResumeQL provides a workspace for individual professional achievement documentation. You may not:
      </p>
      <ul>
        <li>Use the platform to generate spam or fraudulent professional identities.</li>
        <li>Reverse engineer our prompt engineering logic or PDF compilation pipeline.</li>
        <li>Attempt to bypass credit-based generation limits via automated scripts.</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        <strong>Your Data is Yours.</strong> You retain 100% ownership of the content you input and the resulting LaTeX/PDF outputs. ResumeQL owns the underlying architecture, UI design, and proprietary prompt signatures.
      </p>

      <h2>4. Credit System & Payments</h2>
      <p>
        Generation credits ("Coins") are required for high-fidelity AI generation. Once a generation request is completed by the AI architect, credits are deducted and are non-refundable unless a technical failure occurs during compilation.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        ResumeQL is an optimization tool. While we provide high-fidelity formatting and ATS suggestions, <strong>we do not guarantee specific employment outcomes</strong>. The final responsibility for the accuracy of professional records lies with the user.
      </p>
    </LegalLayout>
  );
};
