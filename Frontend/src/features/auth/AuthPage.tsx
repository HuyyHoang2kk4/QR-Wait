import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

interface AuthPageProps {
  initialMode: 'login' | 'register';
}

/**
 * SCR-02: Dang nhap & Dang ky Doanh nghiep (Email + Mat khau / Google SSO)
 * Tham chieu giao dien: Design/Stitch/SCR-02_Auth_Onboarding.html
 */
export function AuthPage({ initialMode }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // TODO: Ket noi POST /api/v1/auth/login, /auth/register, /auth/google -> goi AuthContext.setSession
  // TODO: Dieu huong thong minh sau login: OWNER/MANAGER -> /dashboard, STAFF -> /staff/panel (FR-002)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] dark:bg-[#0F172A] px-4">
      <div className="mb-4 flex w-full max-w-md justify-between items-center">
        <Link to="/" className="text-sm font-semibold text-[#4F46E5]">
          ← Trang chủ
        </Link>
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              mode === 'login' ? 'bg-[#4F46E5] text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              mode === 'register' ? 'bg-[#4F46E5] text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Đăng ký
          </button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          TODO: Ghep form {mode === 'login' ? 'Dang nhap' : 'Dang ky'} + nut Google SSO tu SCR-02_Auth_Onboarding.html
        </p>
      </div>
    </div>
  );
}
