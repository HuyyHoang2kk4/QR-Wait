import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-04: Quan ly Hang cho, Trang thai & Mo Phien moi Reset so ve 001
 * Tham chieu giao dien: Design/Stitch/SCR-04_Queue_Management.html
 */
export function QueueManagementPage() {
  // TODO: GET/POST /api/v1/branches/{branchId}/queues
  // TODO: PATCH /api/v1/queues/{id}/status (OPEN / PAUSED / CLOSED)
  // TODO: POST /api/v1/queues/{id}/sessions/reset (Modal canh bao ve ton & xac nhan EXPIRED)

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Quản lý Hàng chờ & Phiên làm việc (SCR-04)</h1>
        <ThemeToggle />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: Luoi the Hang cho, Switch OPEN/PAUSED/CLOSED & Modal Reset phien (SCR-04_Queue_Management.html)
      </div>
    </div>
  );
}
