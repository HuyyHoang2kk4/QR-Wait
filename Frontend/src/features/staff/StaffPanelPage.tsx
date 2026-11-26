import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { TicketBadge } from '../../components/ui/TicketBadge';

/**
 * SCR-05: Bang dieu khien Nhan vien 1 cham (Staff Panel)
 * Tham chieu giao dien: Design/Stitch/SCR-05_Staff_Calling_Panel.html
 */
export function StaffPanelPage() {
  // TODO 1: Bat buoc chon Quay phuc vu (GET /branches/{id}/counters) truoc khi goi (FR-024)
  // TODO 2: Goi khach tiep theo (POST /staff/queues/{id}/call-next) -> chay dong ho 2 phut tu calledAt (KHONG khoa nut Vang mat/Goi tiep - BRL-011)
  // TODO 3: Subscribe WS /topic/staff/{branchId} nhan STAFF_QUEUE_UPDATED & STAFF_CUSTOMER_ACK ("Khach bao da toi")
  // TODO 4: Cac nut thao tac: Bat dau phuc vu (/serve), Goi lai 15s cooldown max 3 (/recall), Vang mat (/noshow), Hoan tat (/complete), Chuyen ve (/transfer), Walk-in (/walkin) & Phuc hoi ve 15p (/restore)

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-4 md:p-6">
      <header className="mb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-bold">Staff Calling Panel (SCR-05)</h1>
          <p className="text-xs text-slate-500">Quầy đang trực: Quầy 01 • Đồng hồ 2 phút không khóa thao tác</p>
        </div>
        <ThemeToggle />
      </header>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-4">
          <TicketBadge ticketNumber="A-025" size="xl" />
          <span className="text-sm text-slate-500">
            TODO: Ghep giao dien Hero Card, nut hanh dong lon & Waitlist/No-Show Drawer tu SCR-05_Staff_Calling_Panel.html
          </span>
        </div>
      </div>
    </div>
  );
}
