import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-10: Bao cao Thong ke & Xuat CSV UTF-8 BOM
 * Tham chieu: Design/Stitch/SCR-10_Analytics_Export.html
 */
export function AnalyticsPage() {
  // TODO: GET /analytics/overview?branchId=&from=&to= (Recharts Bar & Donut Chart)
  // TODO: GET /analytics/export -> tai blob CSV chuan UTF-8 BOM (max 90 ngay)

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Báo cáo & Xuất Dữ liệu (SCR-10)</h1>
        <ThemeToggle />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: KPI Cards, Bieu do gio cao diem, Bang nang suat & Nut Xuat CSV tu SCR-10_Analytics_Export.html
      </div>
    </div>
  );
}
