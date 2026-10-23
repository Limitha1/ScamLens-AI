import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HeroBanner() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2B58FF]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#2B58FF] mb-5 shadow-xs">
        {isAuthenticated ? (
          <>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Welcome, {user.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600">Shield Protection Active ({user.role})</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Prototype • ScamLens AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B58FF]"></span>
            <span className="text-slate-600">Built by Team FourSight</span>
          </>
        )}
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
        Spot Fake Internships & Scholarships <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B58FF] via-blue-600 to-indigo-600">
          Before You Apply or Pay.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
        Paste any suspicious WhatsApp forward, LinkedIn DM, or recruitment email. ScamLens decodes high-pressure language, upfront fee traps, and provides instant verification steps.
      </p>

      {/* Quick reassurance pills */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
        <div className="flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Detects Upfront Fee Traps</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Screenshot & Text OCR</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>100% Free For Students</span>
        </div>
      </div>
    </div>
  );
}
