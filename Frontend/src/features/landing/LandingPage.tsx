import { Link } from 'react-router-dom';
import { QrCode, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-01: Landing Page & Live Interactive Demo
 * Tham chieu giao dien: Design/Stitch/SCR-01_Landing_Page.html
 */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <QrCode className="h-6 w-6 text-[#4F46E5]" />
          <span>QR Wait</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4338CA]"
          >
            Bắt đầu miễn phí <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hệ thống Xếp hàng Ảo qua Mã QR
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Không cần máy in phiếu, không cần cài app. Quét mã QR là lấy số và theo dõi lượt trực tiếp.
        </p>
        {/* TODO: Ghep Interactive Demo Widget & Feature Grid tu Design/Stitch/SCR-01_Landing_Page.html */}
      </main>
    </div>
  );
}
