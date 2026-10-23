import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Download, 
  ShieldAlert, 
  AlertTriangle,
  QrCode,
  Users
} from 'lucide-react';

export default function ShareableWarningCard({ analysisData }) {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const { risk_level = "High", risk_score = 88, category = "Fake Internship Offer" } = analysisData;
  const isHigh = risk_level.toLowerCase() === 'high' || risk_score >= 70;

  const warningBulletinText = `🚨 *SCAMLENS AI ADVISORY: ${risk_level.toUpperCase()} RISK SCAM DETECTED* 🚨\n\n` +
    `⚠️ *Category:* ${category}\n` +
    `📊 *Risk Level:* ${risk_level} (${risk_score}%)\n\n` +
    `⚠️ *Key Threat Warning:*\n` +
    `• A suspicious offer is circulating asking students for upfront registration fees/urgent confirmation.\n` +
    `• *Rule:* Legitimate employers and scholarships NEVER charge students to get hired.\n\n` +
    `🛡️ Verify before paying! Protected by ScamLens AI (Team FourSight).`;

  const handleCopyBulletin = () => {
    navigator.clipboard.writeText(warningBulletinText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(warningBulletinText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50/50 rounded-2xl sm:rounded-3xl border-2 border-slate-300/80 shadow-md p-5 sm:p-7 relative overflow-hidden transition-all">
      
      {/* Top Advisory Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 mb-5">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase">
            STUDENT SECURITY ADVISORY • SL-2026-X89
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
          <Users className="w-3.5 h-3.5 text-[#2B58FF]" />
          <span>Peer Alert Bulletin</span>
        </div>
      </div>

      {/* Main Advisory Visual Body */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
              isHigh ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
            }`}>
              {isHigh ? '🚨 High Risk Threat Alert' : '⚠️ Suspicious Activity Advisory'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 tracking-tight">
              {category}: Protect Your Classmates & Cohort
            </h3>
          </div>

          <div className="flex-shrink-0 text-left sm:text-right">
            <span className="text-2xl font-black text-rose-600 font-mono">
              {risk_score}%
            </span>
            <span className="text-[10px] block text-slate-400 font-bold uppercase">
              Scam Confidence
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Students are frequently targeted by predatory job listings demanding upfront refundable registration fees or advance equipment deposits. 
          Share this bulletin in your college WhatsApp groups, Discord servers, and campus forums.
        </p>

        {/* 3 Key takeaways */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-800 block">🛑 Never Pay Upfront</span>
            <span className="text-slate-500 text-[11px]">No legit recruiter charges for interviews or kits.</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-800 block">🔍 Check Email Domain</span>
            <span className="text-slate-500 text-[11px]">Beware Gmail/Outlook pretending to be Google/Apex.</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-800 block">🏛️ Report to Cell</span>
            <span className="text-slate-500 text-[11px]">Notify university placement officers immediately.</span>
          </div>
        </div>

        {/* Watermark */}
        <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Verified by ScamLens AI Engine</span>
          <span>Team FourSight • Code Meet '26</span>
        </div>
      </div>

      {/* Sharing CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Forward this warning directly to WhatsApp cohorts or copy the bulletin text.
        </p>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleCopyBulletin}
            id="copy-warning-btn"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Warning</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            id="share-warning-btn"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/25 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share to WhatsApp / Peers</span>
          </button>
        </div>
      </div>

    </div>
  );
}
