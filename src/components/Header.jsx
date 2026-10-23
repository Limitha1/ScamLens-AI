import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, BookOpen, Flag, 
  LogIn, LogOut, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ 
  onOpenReportModal, 
  onOpenLibraryModal, 
  onOpenAuthModal,
  reportedCount = 1248 
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#2B58FF] to-[#1E44D9] text-white shadow-md shadow-[#2B58FF]/25">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-heading">
                  ScamLens <span className="text-[#2B58FF]">AI</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#2B58FF]/10 text-[#2B58FF] border border-[#2B58FF]/20">
                  Student Shield
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Autonomous Verification for Internships & Scholarships
              </p>
            </div>
          </div>

          {/* Team FourSight Hackathon Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-xs font-medium text-slate-700 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B58FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B58FF]"></span>
            </span>
            <span className="text-slate-500">Team</span>
            <span className="font-bold text-slate-900">FourSight</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Code Meet '26</span>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <button
              onClick={onOpenLibraryModal}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Browse common scam patterns"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Scam Guide</span>
            </button>

            <button
              onClick={onOpenReportModal}
              id="report-scam-btn"
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2B58FF] hover:bg-[#1E44D9] active:scale-95 shadow-md shadow-[#2B58FF]/25 hover:shadow-lg hover:shadow-[#2B58FF]/35 transition-all duration-150"
            >
              <Flag className="w-4 h-4" />
              <span>Report Scam</span>
            </button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  id="user-profile-menu-button"
                  className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#2B58FF]/30 group-hover:ring-[#2B58FF]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`;
                    }}
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {user.name.split(' ')[0]}
                    </p>
                    <span className="text-[10px] text-blue-600 font-semibold leading-none block">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-fade-in divide-y divide-slate-100">
                    {/* User Info Header */}
                    <div className="px-4 py-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#2B58FF]/20"
                        />
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Student
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-[#2B58FF] text-[11px] font-semibold border border-blue-200">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 truncate">
                        🏫 {user.university || 'Student Member'}
                      </p>
                    </div>

                    {/* Personal Activity Stats */}
                    <div className="px-4 py-2.5 bg-slate-50/70">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Your Protection Stats
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                          <div className="text-base font-extrabold text-[#2B58FF]">
                            {user.scansCount || 0}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">Scans Run</div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                          <div className="text-base font-extrabold text-rose-600">
                            {user.reportsCount || 0}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">Reported</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-1.5">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        id="signout-button"
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  id="header-signin-btn"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:scale-95 border border-slate-200 transition-all"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  <span>Sign In</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
