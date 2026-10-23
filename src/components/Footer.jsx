import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#2B58FF] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                SL
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight">
                ScamLens <span className="text-[#2B58FF]">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Empowering university students against phishing, predatory fee internships, and deceptive scholarship schemes.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-xs text-slate-500 space-y-1">
            <div className="flex items-center space-x-1 font-semibold text-slate-700">
              <span>Developed for</span>
              <span className="text-[#2B58FF]">Code Meet 24-Hour Hackathon</span>
            </div>
            <div>
              Built by <strong className="text-slate-900">Team FourSight</strong>
            </div>
            <div className="text-[11px] text-slate-400">
              © 2026 ScamLens AI • Open Student Defense Initiative
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
