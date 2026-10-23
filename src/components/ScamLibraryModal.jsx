import React from 'react';
import { X, BookOpen, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';
import { COMMON_SCAM_TYPES } from '../data/mockData';

export default function ScamLibraryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2B58FF] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Student Scam Defense Playbook
            </h3>
            <p className="text-xs text-slate-500">
              Top deceptive schemes targeted at college students & first-time job hunters
            </p>
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-4">
          {COMMON_SCAM_TYPES.map((scam, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-sm font-bold text-slate-900">
                  {scam.title}
                </h4>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  {scam.frequency} Risk
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                {scam.description}
              </p>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-start space-x-2 text-xs font-medium text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-emerald-900">Golden Rule: </strong>
                  {scam.goldenRule}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2B58FF] hover:bg-[#1E44D9] transition-all"
          >
            Got it, Back to Analyzer
          </button>
        </div>

      </div>
    </div>
  );
}
