import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

const DEMO_ACCOUNTS = [
  {
    id: 'demo-student-1',
    name: 'Limitha M',
    email: 'student@codemeet.edu',
    password: 'password123',
    role: 'Student',
    university: 'Institute of Technology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    scansCount: 12,
    reportsCount: 3,
    joinedDate: 'October 2026',
    verifiedStudent: true
  },
  {
    id: 'demo-ambassador-1',
    name: 'Alex Rivera',
    email: 'ambassador@codemeet.edu',
    password: 'password123',
    role: 'Campus Ambassador',
    university: 'Global Tech University',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    scansCount: 45,
    reportsCount: 11,
    joinedDate: 'September 2026',
    verifiedStudent: true
  }
];

const STORAGE_KEY_USER = 'scamlens_auth_user';
const STORAGE_KEY_USERS = 'scamlens_registered_users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : DEMO_ACCOUNTS;
    } catch {
      return DEMO_ACCOUNTS;
    }
  });

  // Sync Supabase active session on mount if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !user) {
        const metadata = session.user.user_metadata || {};
        setUser({
          id: session.user.id,
          name: metadata.name || session.user.email?.split('@')[0] || 'Student',
          email: session.user.email,
          role: metadata.role || 'Student',
          university: metadata.university || 'University Member',
          avatar: metadata.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${session.user.id}`,
          scansCount: 0,
          reportsCount: 0,
          verifiedStudent: true
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        setUser({
          id: session.user.id,
          name: metadata.name || session.user.email?.split('@')[0] || 'Student',
          email: session.user.email,
          role: metadata.role || 'Student',
          university: metadata.university || 'University Member',
          avatar: metadata.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${session.user.id}`,
          scansCount: 0,
          reportsCount: 0,
          verifiedStudent: true
        });
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error('Failed to save auth state to localStorage', e);
    }
  }, [user]);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to save registered users', e);
    }
  }, [registeredUsers]);

  // Login handler
  const login = async (email, password) => {
    await new Promise(res => setTimeout(res, 350));

    // Try Supabase auth first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (!error && data?.user) {
          const metadata = data.user.user_metadata || {};
          const supaUser = {
            id: data.user.id,
            name: metadata.name || data.user.email?.split('@')[0] || 'Student',
            email: data.user.email,
            role: metadata.role || 'Student',
            university: metadata.university || 'University Member',
            avatar: metadata.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${data.user.id}`,
            scansCount: 0,
            reportsCount: 0,
            verifiedStudent: true
          };
          setUser(supaUser);
          return { success: true, user: supaUser };
        }
      } catch (err) {
        console.warn('Supabase signin attempt failed, falling back to local registry', err);
      }
    }

    // Fallback to local registered / demo accounts
    const found = registeredUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      return { success: false, error: 'No account found with this email. Please sign up or try Quick Demo login.' };
    }

    if (found.password && found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setUser(found);
    return { success: true, user: found };
  };

  // Sign up handler
  const signup = async ({ name, email, password, role = 'Student', university = 'University' }) => {
    await new Promise(res => setTimeout(res, 350));

    // Try Supabase sign up if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              name: name.trim(),
              role,
              university: university.trim()
            }
          }
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data?.user) {
          const newUser = {
            id: data.user.id,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            role,
            university: university.trim() || 'University Member',
            avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=e0e7ff`,
            scansCount: 0,
            reportsCount: 0,
            verifiedStudent: true
          };
          setUser(newUser);
          return { success: true, user: newUser };
        }
      } catch (err) {
        console.warn('Supabase sign up error, continuing to local registry', err);
      }
    }

    const exists = registeredUsers.some(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      university: university.trim() || 'University Member',
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=e0e7ff`,
      scansCount: 0,
      reportsCount: 0,
      joinedDate: 'Today',
      verifiedStudent: true
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // One-click demo login
  const quickDemoLogin = (type = 'student') => {
    const demo = type === 'ambassador' ? DEMO_ACCOUNTS[1] : DEMO_ACCOUNTS[0];
    setUser(demo);
    return demo;
  };

  // Logout handler
  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout failed', e);
      }
    }
    setUser(null);
  };

  // Activity tracking
  const incrementScans = () => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, scansCount: (prev.scansCount || 0) + 1 };
      setRegisteredUsers(list => list.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  const incrementReports = () => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, reportsCount: (prev.reportsCount || 0) + 1 };
      setRegisteredUsers(list => list.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        quickDemoLogin,
        logout,
        incrementScans,
        incrementReports,
        demoAccounts: DEMO_ACCOUNTS,
        isSupabaseConnected: isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
