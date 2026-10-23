import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, CheckCircle2, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerificationChecklist({ checklistItems = [] }) {
  // Keep track of checked state for each index
  const [checkedState, setCheckedState] = useState({});

  // Reset checked state when items change
  useEffect(() => {
    setCheckedState({});
  }, [checklistItems]);

  const toggleCheck = (index) => {
    const updated = {
      ...checkedState,
      [index]: !checkedState[index]
    };
    setCheckedState(updated);

    // Check if all are now completed
    const completedCount = Object.values(updated).filter(Boolean).length;
    if (completedCount === checklistItems.length && checklistItems.length > 0) {
      // Trigger festive confetti celebration!
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#2B58FF', '#10B981', '#6366F1']
        });
      } catch (e) {
        // ignore if canvas-confetti fails in non-dom
      }
    }
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleReset = () => {
    setCheckedState({});
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      
      {/* Header with live progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Actionable Student Verification Checklist
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click each security step as you perform it to protect yourself
          </p>
        </div>

        {/* Progress pill & reset */}
        <div className="flex items-center space-x-2.5">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-800">
              {completedCount} of {totalCount} Done
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">
              {percentage}% Verified
            </span>
          </div>

          {completedCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset checklist"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-5 overflow-hidden">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {checklistItems.map((item, index) => {
          const isChecked = !!checkedState[index];
          return (
            <div
              key={index}
              onClick={() => toggleCheck(index)}
              className={`flex items-start space-x-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none ${
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-600'
                  : 'bg-slate-50/70 border-slate-200/90 text-slate-900 hover:bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <button 
                type="button" 
                className="mt-0.5 flex-shrink-0 focus:outline-none"
                aria-label={`Toggle verification step ${index + 1}`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 hover:text-[#2B58FF]" />
                )}
              </button>

              <div className="flex-1">
                <p className={`text-xs sm:text-sm font-medium leading-relaxed ${
                  isChecked ? 'line-through text-slate-500' : 'text-slate-800'
                }`}>
                  {item}
                </p>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Step {index + 1} • University standard protocol
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* All completed celebration banner */}
      {isAllCompleted && (
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-center animate-fade-in flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All security checks verified! You successfully avoided an employment trap.</span>
        </div>
      )}

    </div>
  );
}
