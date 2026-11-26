import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  QrCode,
  LogIn,
  Building2,
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  User,
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

interface AuthPageProps {
  initialMode: 'login' | 'register';
}

/**
 * SCR-02: Dang nhap & Dang ky Doanh nghiep
 * Tham chieu: Design/Stitch/SCR-02_Auth_Onboarding.html
 */
export function AuthPage({ initialMode }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Ket noi POST /api/v1/auth/login hoac /api/v1/auth/register -> luu JWT qua AuthContext
    setStatusMessage('Giao diện đã sẵn sàng. Hãy kết nối API Backend (/api/v1/auth/*) ở bước tiếp theo.');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F9FAFB] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <header className="w-full py-6 px-6 lg:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Về trang chủ</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <QrCode className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">QR-Wait</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Centered Auth Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-[480px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <QrCode className="h-6 w-6" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight">QR-Wait</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Nền tảng xếp hàng ảo thông minh &amp; gọi số tự động dành cho doanh nghiệp
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Đăng nhập</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Đăng ký tổ chức</span>
            </button>
          </div>

          {/* Google SSO */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setStatusMessage('Chờ tích hợp Google Identity OAuth2 ID Token.')}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                  fill="#34A853"
                />
                <path
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  fill="#EA4335"
                />
              </svg>
              <span>Tiếp tục với Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
            <span className="absolute bg-white dark:bg-slate-900 px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              hoặc sử dụng email
            </span>
          </div>

          {statusMessage && (
            <div className="mb-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-2.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {statusMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="org-name" className="flex items-center justify-between text-xs font-semibold">
                    <span>Tên doanh nghiệp / Cửa hàng</span>
                    <span className="text-[11px] font-normal text-slate-400">Bắt buộc</span>
                  </label>
                  <div className="relative flex items-center">
                    <Store className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="org-name"
                      type="text"
                      required
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Nhập tên cửa hàng hoặc doanh nghiệp..."
                      className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="display-name" className="text-xs font-semibold">
                    Tên người quản trị
                  </label>
                  <div className="relative flex items-center">
                    <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="display-name"
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Nhập họ tên hiển thị..."
                      className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-input" className="text-xs font-semibold">
                Email làm việc
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@doanhnghiep.vn"
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password-input" className="text-xs font-semibold">
                Mật khẩu
              </label>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={mode === 'register' ? 8 : 1}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-10 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Hiện hoặc ẩn mật khẩu"
                  className="absolute right-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === 'register' && (
                <span className="text-[11px] text-slate-500">Tối thiểu 8 ký tự bao gồm chữ cái và chữ số</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                />
                <span className="text-slate-600 dark:text-slate-300">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <span>
                {mode === 'login' ? 'Đăng nhập vào hệ thống' : 'Tạo tài khoản tổ chức'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </main>

      <footer className="py-5 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-indigo-600" />
          <span>Bảo mật danh tính &amp; chuẩn mã hóa JWT</span>
        </div>
        <span>© 2026 QR-Wait</span>
      </footer>
    </div>
  );
}
