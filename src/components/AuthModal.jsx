import React, { useState } from 'react';
import { 
  X, LogIn, UserPlus, Mail, Lock, User, School, 
  ShieldCheck, AlertCircle, ArrowRight, Sparkles, Eye, EyeOff 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, signup, quickDemoLogin } = useAuth();
  
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [role, setRole] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password.trim()) {
          setError('Please fill in both email and password.');
          setLoading(false);
          return;
        }

        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Login failed.');
          setLoading(false);
          return;
        }
      } else {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError('Please provide your name, email, and a password.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password should be at least 6 characters long.');
          setLoading(false);
          return;
        }

        const res = await signup({ name, email, password, role, university });
        if (!res.success) {
          setError(res.error || 'Account creation failed.');
          setLoading(false);
          return;
        }
      }

      // Success
      setLoading(false);
      onClose();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickDemo = (type) => {
    quickDemoLogin(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Background Banner */}
        <div className="bg-gradient-to-br from-[#2B58FF] via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {mode === 'login' ? 'Welcome to ScamLens' : 'Join ScamLens Shield'}
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                {mode === 'login' 
                  ? 'Sign in to access your scam scans & report alerts' 
                  : 'Empowering students against recruitment fraud'}
              </p>
            </div>
          </div>

          {/* Quick Demo Selector */}
          <div className="mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-xs font-medium text-blue-100 mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Quick 1-Click Demo Login:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 text-left transition-all active:scale-95 flex items-center justify-between"
              >
                <span>Limitha (Student)</span>
                <ArrowRight className="w-3 h-3 opacity-70" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('ambassador')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 text-left transition-all active:scale-95 flex items-center justify-between"
              >
                <span>Alex (Ambassador)</span>
                <ArrowRight className="w-3 h-3 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50/60 p-1.5 m-5 mb-4 rounded-xl">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'login' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'signup' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start space-x-2 text-rose-700 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Limitha M"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2B58FF]/20 focus:border-[#2B58FF] text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / Institute
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. NIT / IIT"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2B58FF]/20 focus:border-[#2B58FF] text-xs text-slate-800 placeholder-slate-400 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2B58FF]/20 focus:border-[#2B58FF] text-xs text-slate-800 bg-slate-50/50"
                  >
                    <option value="Student">Student</option>
                    <option value="Campus Ambassador">Campus Ambassador</option>
                    <option value="Placement Coordinator">Placement Coordinator</option>
                    <option value="Security Analyst">Security Analyst</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'login' ? 'student@codemeet.edu' : 'you@university.edu'}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2B58FF]/20 focus:border-[#2B58FF] text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Demo account password is: password123')}
                  className="text-[11px] font-semibold text-[#2B58FF] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2B58FF]/20 focus:border-[#2B58FF] text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-[#2B58FF] hover:bg-[#1E44D9] shadow-md shadow-[#2B58FF]/25 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Bottom helper text */}
          <p className="text-center text-xs text-slate-500 pt-1">
            {mode === 'login' ? (
              <>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className="font-bold text-[#2B58FF] hover:underline"
                >
                  Create one now
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="font-bold text-[#2B58FF] hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
