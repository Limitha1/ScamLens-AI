import React, { useState } from 'react';
import { Eye, AlertCircle, Copy, Check, Info } from 'lucide-react';

export default function HighlightedMessage({ rawText, flaggedPhrases = [] }) {
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to split text and wrap flagged phrases
  const renderHighlightedContent = () => {
    if (!flaggedPhrases || flaggedPhrases.length === 0) {
      return (
        <span className="text-slate-700 whitespace-pre-wrap leading-relaxed">
          {rawText}
        </span>
      );
    }

    // Sort phrases by length descending to match longest phrases first
    const sortedPhrases = [...flaggedPhrases].sort((a, b) => b.phrase.length - a.phrase.length);
    
    // Create regex pattern to capture all flagged phrases
    // Escape regex special chars
    const escapedPatterns = sortedPhrases.map(p => 
      p.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    
    const regex = new RegExp(`(${escapedPatterns.join('|')})`, 'gi');
    const parts = rawText.split(regex);

    return parts.map((part, index) => {
      // Find if this part matches one of the flagged phrases (case-insensitive)
      const matchedFlag = flaggedPhrases.find(
        f => f.phrase.toLowerCase() === part.toLowerCase()
      );

      if (matchedFlag) {
        return (
          <span 
            key={index} 
            className="relative inline-block my-0.5 mx-0.5"
            onMouseEnter={() => setActiveTooltip(index)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <mark className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded-md border-b-2 border-rose-500 font-semibold cursor-help transition-all hover:bg-rose-200">
              {part}
            </mark>

            {/* Hover Tooltip showing specific danger reason */}
            {activeTooltip === index && (
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-30 pointer-events-none text-left">
                <span className="font-bold text-rose-300 flex items-center space-x-1 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 inline" />
                  <span>Flagged Warning Sign:</span>
                </span>
                <span className="block text-slate-200 leading-snug">
                  {matchedFlag.reason}
                </span>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
              </span>
            )}
          </span>
        );
      }

      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-[#2B58FF]" />
          <h4 className="text-base font-bold text-slate-900 tracking-tight">
            Flagged Message Breakdown
          </h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/70 font-semibold">
            {flaggedPhrases.length} Warning Sign{flaggedPhrases.length !== 1 ? 's' : ''} Detected
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          title="Copy original text"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Flagged legend banner */}
      <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center space-x-2">
        <Info className="w-4 h-4 text-[#2B58FF] flex-shrink-0" />
        <span>
          Highlighted in <strong className="text-rose-700 font-semibold">red</strong>: Phrases containing psychological pressure, deceptive claims, or upfront fee triggers. Hover to view reason.
        </span>
      </div>

      {/* Formatted body with highlighted phrases */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-sm sm:text-base leading-relaxed font-normal text-slate-800">
        {renderHighlightedContent()}
      </div>
    </div>
  );
}
