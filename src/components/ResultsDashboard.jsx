import React, { useRef, useEffect } from 'react';
import RiskScoreCard from './RiskScoreCard';
import HighlightedMessage from './HighlightedMessage';
import ExplanationPanel from './ExplanationPanel';
import VerificationChecklist from './VerificationChecklist';
import ShareableWarningCard from './ShareableWarningCard';
import { Sparkles } from 'lucide-react';

export default function ResultsDashboard({ analysisData, originalText }) {
  const dashboardRef = useRef(null);

  // Smooth scroll down to dashboard on mount
  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysisData]);

  if (!analysisData) return null;

  return (
    <div ref={dashboardRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16 space-y-6">
      
      {/* Results Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Threat Analysis Results
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2B58FF]/10 text-[#2B58FF] font-bold">
            Real-time Scan Completed
          </span>
        </div>

        <div className="flex items-center gap-2">
          {analysisData.isLiveGemini ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
              <span>Google Gemini AI (Live)</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-mono">
              Engine: {analysisData.modelUsed || 'ScamLens-Student-v2'}
            </span>
          )}
        </div>
      </div>

      {/* 1. Risk Score Card */}
      <RiskScoreCard analysisData={analysisData} />

      {/* 2. Highlighted Original Message */}
      <HighlightedMessage 
        rawText={originalText} 
        flaggedPhrases={analysisData.flagged_text || []} 
      />

      {/* 3. Explanation Panel */}
      <ExplanationPanel 
        flaggedItems={analysisData.flagged_text || []} 
      />

      {/* 4. Actionable Verification Checklist */}
      <VerificationChecklist 
        checklistItems={analysisData.checklist || []} 
      />

      {/* 5. Shareable Warning Card */}
      <ShareableWarningCard 
        analysisData={analysisData} 
      />

    </div>
  );
}
