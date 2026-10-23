import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Lightbulb, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function ExplanationPanel({ flaggedItems = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Web Speech API for simulated AI voice explanation
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = flaggedItems.length > 0 
      ? `ScamLens warning analysis: ${flaggedItems.map(f => f.reason).join('. ')}`
      : "ScamLens analysis confirms no critical scam phrases were detected in this message.";

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-5 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2B58FF]">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Educational Deconstruction
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Why scammers use these exact phrasing tactics on university students
          </p>
        </div>

        {/* Text-to-speech audio explanation */}
        <button
          onClick={handleToggleVoice}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isSpeaking
              ? 'bg-[#2B58FF] text-white border-[#2B58FF] animate-pulse'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Listen to audio briefing"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#2B58FF]" />
              <span>Listen to AI Breakdown</span>
            </>
          )}
        </button>
      </div>

      {/* Flagged items cards */}
      {flaggedItems.length === 0 ? (
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h5 className="text-sm font-bold text-emerald-900">
            No Deceptive Phrasing Patterns Found
          </h5>
          <p className="text-xs text-emerald-700 max-w-md mx-auto mt-1">
            The message follows formal employment communication norms without forced deadlines or demands for advance payments.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {flaggedItems.map((item, index) => {
            const isUrgency = item.phrase.toLowerCase().includes("today") || item.phrase.toLowerCase().includes("immediately") || item.phrase.toLowerCase().includes("hour");
            const isFee = item.phrase.toLowerCase().includes("fee") || item.phrase.toLowerCase().includes("pay") || item.phrase.toLowerCase().includes("deposit");
            const isUnsolicited = item.phrase.toLowerCase().includes("selected") || item.phrase.toLowerCase().includes("congratulations");

            return (
              <div 
                key={index} 
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-5 transition-all hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    
                    {/* Category tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200 flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {isFee ? "Financial Trap" : isUrgency ? "Artificial Urgency" : isUnsolicited ? "Social Engineering Hook" : "Red Flag Marker"}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Sign #{index + 1}</span>
                    </div>

                    {/* Flagged phrase */}
                    <blockquote className="text-sm font-bold text-slate-900 border-l-2 border-[#2B58FF] pl-2.5 py-0.5 italic">
                      "{item.phrase}"
                    </blockquote>
                  </div>
                </div>

                {/* Explanation body */}
                <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <p className="font-medium text-slate-800">
                    <strong className="text-slate-900">Why this is dangerous: </strong>
                    {item.reason}
                  </p>
                  
                  {/* Student Golden Rule */}
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-start space-x-2 text-xs text-slate-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-700 font-semibold">Student Defense: </strong>
                      {isFee 
                        ? "Never transfer money for background checks, laptops, or registration. Real companies absorb all recruitment overhead."
                        : isUrgency
                        ? "Scammers force you to act fast to prevent you from researching reviews on Glassdoor or consulting mentors."
                        : "No legitimate company hires without a technical screen, phone call, or university career fair record."}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
