import React, { createContext, useContext, useState } from 'react';
import { UserSummary } from '../lib/types';

interface AuthContextValue {
  user: UserSummary | null;
  isAuthenticated: boolean;
  setSession: (accessToken: string, refreshToken: string, user: UserSummary) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSummary | null>(() => {
    const raw = localStorage.getItem('qrwait_user');
    return raw ? (JSON.parse(raw) as UserSummary) : null;
  });

  const setSession = (accessToken: string, refreshToken: string, nextUser: UserSummary) => {
    localStorage.setItem('qrwait_access_token', accessToken);
    localStorage.setItem('qrwait_refresh_token', refreshToken);
    localStorage.setItem('qrwait_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('qrwait_access_token');
    localStorage.removeItem('qrwait_refresh_token');
    localStorage.removeItem('qrwait_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
