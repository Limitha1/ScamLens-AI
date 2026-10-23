import React, { useState } from 'react';
import { X, Flag, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitScamReportToSupabase } from '../services/supabaseClient';

export default function ReportScamModal({ isOpen, onClose, onScamReported }) {
  const { user, isAuthenticated, incrementReports } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [scamType, setScamType] = useState('Fake Internship');
  const [details, setDetails] = useState('');
  const [contactSource, setContactSource] = useState('WhatsApp');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Sync to Supabase
    await submitScamReportToSupabase({
      companyName,
      scamType,
      contactSource,
      details,
      isAnonymous,
      reporterName: user?.name || 'Anonymous Student',
      reporterEmail: user?.email || null
    });

    setTimeout(() => {
      if (onScamReported) onScamReported();
      if (isAuthenticated) incrementReports();
      setTimeout(() => {
        setSubmitted(false);
        setCompanyName('');
        setDetails('');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Scam Reported to Community Shield!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you{isAuthenticated && !isAnonymous ? `, ${user.name}` : ''}! Our AI threat engine will catalog this entry to protect other students across universities.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Report Suspicious Recruitment Scam
                </h3>
                <p className="text-xs text-slate-500">
                  Help the FourSight community flag predatory offers
                </p>
              </div>
            </div>

            {/* Authenticated reporter pill */}
            {isAuthenticated ? (
              <div className="mb-4 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-[#2B58FF]" />
                  <span className="text-slate-700">
                    Reporting as: <strong className="text-slate-900">{isAnonymous ? 'Anonymous Student' : user.name}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="text-[11px] font-bold text-[#2B58FF] hover:underline"
                >
                  {isAnonymous ? 'Attach Profile' : 'Report Anonymously'}
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Impersonated Company / Sender Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Tech, HR Talent Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#2B58FF] focus:ring-3 focus:ring-[#2B58FF]/15 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Scam Category
                  </label>
                  <select
                    value={scamType}
                    onChange={(e) => setScamType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#2B58FF] outline-none bg-white"
                  >
                    <option>Fake Internship</option>
                    <option>Scholarship Scam</option>
                    <option>Telegram Task Scam</option>
                    <option>Cheque Advance Fraud</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Platform Encountered
                  </label>
                  <select
                    value={contactSource}
                    onChange={(e) => setContactSource(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#2B58FF] outline-none bg-white"
                  >
                    <option>WhatsApp</option>
                    <option>LinkedIn DM</option>
                    <option>Email</option>
                    <option>Telegram</option>
                    <option>Campus Bulletin Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Suspicious Details / Demand (e.g. "Demanded $49 fee")
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what made you suspicious (payment demands, generic greeting, fake domain, etc.)..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#2B58FF] focus:ring-3 focus:ring-[#2B58FF]/15 outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2B58FF] hover:bg-[#1E44D9] shadow-md shadow-[#2B58FF]/20 active:scale-95 transition-all"
                >
                  Submit Scam Report
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
