import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-03: Executive Dashboard (OWNER / MANAGER)
 * Tham chieu giao dien: Design/Stitch/SCR-03_Executive_Dashboard.html
 */
export function DashboardPage() {
  // TODO: Goi GET /api/v1/branches, /branches/{id}/queues, /analytics/overview?from=today&to=today
  // TODO: Subscribe WS /topic/staff/{branchId} de cap nhat realtime chi so hom nay

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Executive Dashboard (SCR-03)</h1>
          <p className="text-xs text-slate-500">Tổng quan vận hành theo thời gian thực</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/queues" className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5">Hàng chờ</Link>
          <Link to="/staff/panel" className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5">Staff Panel</Link>
          <Link to="/qr-studio" className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5">QR Studio</Link>
          <Link to="/analytics" className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5">Báo cáo</Link>
          <Link to="/settings" className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5">Cài đặt</Link>
          <ThemeToggle />
        </div>
      </header>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: Metric Cards, Bieu do luu luong theo gio & Bang trang thai Hang cho (SCR-03_Executive_Dashboard.html)
      </div>
    </div>
  );
}
