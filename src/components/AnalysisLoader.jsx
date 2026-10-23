import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Search, CheckCircle2, Cpu } from 'lucide-react';

export default function AnalysisLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { title: "Parsing linguistic markers & urgency triggers...", icon: Search },
    { title: "Cross-referencing university placement scam blacklist...", icon: Cpu },
    { title: "Analyzing financial upfront fee demands...", icon: Shield },
    { title: "Assembling educational risk breakdown & checklist...", icon: Sparkles }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 500);
    const timer2 = setTimeout(() => setStepIndex(2), 1050);
    const timer3 = setTimeout(() => setStepIndex(3), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const CurrentIcon = steps[stepIndex].icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-blue-100 shadow-xl shadow-blue-500/5 p-8 text-center relative overflow-hidden">
        {/* Animated glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2B58FF] via-indigo-400 to-[#2B58FF] animate-pulse"></div>

        {/* Pulse center icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#2B58FF]/10 animate-ping"></div>
          <div className="absolute -inset-2 rounded-full border-2 border-[#2B58FF]/20 animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2B58FF] to-[#1E44D9] text-white flex items-center justify-center shadow-lg shadow-[#2B58FF]/30">
            <CurrentIcon className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        {/* Scanning status */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          ScamLens AI is Analyzing Message
        </h3>
        <p className="mt-2 text-sm text-[#2B58FF] font-medium h-6 transition-all duration-200">
          {steps[stepIndex].title}
        </p>

        {/* Multi-step progress bars */}
        <div className="max-w-md mx-auto mt-6">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#2B58FF] to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
            <span>Syntax Scan</span>
            <span>Pattern Match</span>
            <span>Risk Scoring</span>
            <span>Verification Ready</span>
          </div>
        </div>

        {/* Skeleton cards loader mockup */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-50 pointer-events-none">
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
