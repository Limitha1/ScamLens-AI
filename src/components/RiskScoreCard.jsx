import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, ShieldAlert, TrendingUp, Info } from 'lucide-react';

export default function RiskScoreCard({ analysisData }) {
  const { risk_level = "High", risk_score = 88, breakdown, category, aiSummary } = analysisData;

  // Determine styling based on risk tier
  const isHigh = risk_level.toLowerCase() === 'high' || risk_score >= 70;
  const isMedium = risk_level.toLowerCase() === 'medium' || (risk_score >= 40 && risk_score < 70);
  const isLow = !isHigh && !isMedium;

  const colorConfig = isHigh
    ? {
        themeColor: '#EF4444',
        badgeBg: 'bg-rose-50',
        badgeBorder: 'border-rose-200',
        badgeText: 'text-rose-700',
        badgePill: 'bg-rose-600 text-white',
        strokeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.15)',
        icon: AlertOctagon,
        label: 'CRITICAL THREAT DETECTED',
        tagline: 'High probability of malicious fee fraud or credential theft.'
      }
    : isMedium
    ? {
        themeColor: '#F59E0B',
        badgeBg: 'bg-amber-50',
        badgeBorder: 'border-amber-200',
        badgeText: 'text-amber-800',
        badgePill: 'bg-amber-500 text-white',
        strokeColor: '#F59E0B',
        glowColor: 'rgba(245, 158, 11, 0.15)',
        icon: AlertTriangle,
        label: 'SUSPICIOUS ELEMENTS DETECTED',
        tagline: 'Proceed with extreme caution. Unverified external channel.'
      }
    : {
        themeColor: '#10B981',
        badgeBg: 'bg-emerald-50',
        badgeBorder: 'border-emerald-200',
        badgeText: 'text-emerald-800',
        badgePill: 'bg-emerald-600 text-white',
        strokeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.15)',
        icon: CheckCircle,
        label: 'STANDARD RECRUITMENT PATTERNS',
        tagline: 'No upfront fee demands or high-pressure phishing markers.'
      };

  const IconComponent = colorConfig.icon;

  // Gauge calculation for circular SVG
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (risk_score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 transition-all">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
        
        {/* Left: Gauge & Circular Score */}
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#F1F5F9"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={colorConfig.strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {risk_score}%
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Threat Score
              </span>
            </div>
          </div>

          <div>
            {/* Risk Badge */}
            <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${colorConfig.badgeBg} ${colorConfig.badgeBorder} ${colorConfig.badgeText} shadow-xs`}>
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              <span>Risk: {risk_level.toUpperCase()} ({risk_score}%)</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 tracking-tight">
              {category || (isHigh ? "Unsolicited Fee Scam" : isMedium ? "Suspicious Offer" : "Legitimate Placement")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-0.5">
              {colorConfig.tagline}
            </p>
          </div>
        </div>

        {/* Right: Sub-breakdown metrics */}
        <div className="w-full lg:w-72 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
            <span>Threat Vector Breakdown</span>
            <span className="text-[11px] text-slate-400 font-mono">v1.2 Scan</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Financial Upfront Risk</span>
                <span className="font-mono font-bold text-slate-800">
                  {breakdown?.financialDemand ?? (isHigh ? "96%" : isMedium ? "60%" : "0%")}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${breakdown?.financialDemand ?? (isHigh ? 96 : isMedium ? 60 : 0)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Urgency & Pressure Index</span>
                <span className="font-mono font-bold text-slate-800">
                  {breakdown?.urgency ?? (isHigh ? "92%" : isMedium ? "70%" : "10%")}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${breakdown?.urgency ?? (isHigh ? 92 : isMedium ? 70 : 10)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Domain & Channel Trust</span>
                <span className="font-mono font-bold text-slate-800">
                  {breakdown?.domainAuthenticity ?? (isHigh ? "15%" : isMedium ? "30%" : "95%")}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${breakdown?.domainAuthenticity ?? (isHigh ? 15 : isMedium ? 30 : 95)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Context Summary Note */}
      {aiSummary && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
          <Info className="w-4 h-4 text-[#2B58FF] mt-0.5 flex-shrink-0" />
          <span className="leading-relaxed">
            <strong className="text-slate-900 font-semibold">AI Assessment: </strong>
            {aiSummary}
          </span>
        </div>
      )}
    </div>
  );
}
