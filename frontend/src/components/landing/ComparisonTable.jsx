import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const ComparisonTable = () => {
  const features = [
    { name: 'Gemini AI Optimization', rql: true, others: false },
    { name: 'ATS Keyword Matching', rql: true, others: false },
    { name: 'LaTeX Source Exports', rql: true, others: false },
    { name: 'Real-time Bullet Scoring', rql: true, others: false },
    { name: 'Collaborative Editing', rql: true, others: true },
    { name: 'Native PDF Rendering', rql: true, others: true },
    { name: 'Automated Formatting', rql: true, others: false },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Engineering Advantage.</h2>
        <p className="mt-4 text-[#6B7280] text-lg font-medium">Why top engineering leads choose ResumeQL over Word or Google Docs.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-outline-variant/30 shadow-ambient bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-6 text-sm font-bold text-[#6B7280] uppercase tracking-wider">Capabilities</th>
              <th className="px-6 py-6 text-sm font-bold text-primary flex items-center gap-2">
                 <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white text-[10px] font-bold">R</div>
                 ResumeQL
              </th>
              <th className="px-6 py-6 text-sm font-bold text-[#6B7280]">Word / Docs</th>
              <th className="px-6 py-6 text-sm font-bold text-[#6B7280]">Old Builders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {features.map((feature, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 text-sm font-semibold text-[#374151]">{feature.name}</td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2 text-primary">
                      <Check size={18} strokeWidth={3} />
                      {idx < 4 && <Sparkles size={12} className="animate-pulse" />}
                   </div>
                </td>
                <td className="px-6 py-5">
                   {feature.others ? <Check size={18} className="text-gray-300" /> : <X size={18} className="text-red-300" />}
                </td>
                <td className="px-6 py-5">
                   {feature.name === 'Native PDF Rendering' ? <Check size={18} className="text-gray-300" /> : <X size={18} className="text-red-300" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Callout */}
      <div className="mt-12 p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex-1">
            <h4 className="text-lg font-bold text-blue-900 mb-1">Standardized ATS Reliability</h4>
            <p className="text-sm text-blue-700 font-medium">
               Word documents often break when scanned by legacy ATS nodes. Our LaTeX-driven engine ensures your coordinates are surgically mapped every time.
            </p>
         </div>
         <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
            Build Identifiable Resume
         </button>
      </div>
    </section>
  );
};

export default ComparisonTable;
