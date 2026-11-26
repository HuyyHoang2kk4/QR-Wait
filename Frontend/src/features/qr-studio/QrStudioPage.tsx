import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-09: QR Studio, Poster In an PDF/PNG, Doi ma QR & GPS Radius
 * Tham chieu: Design/Stitch/SCR-09_QR_Studio.html
 */
export function QrStudioPage() {
  // TODO: Tab 1 (GET /queues/{id}/qr/poster), Tab 2 (POST /queues/{id}/qr/rotate), Tab 3 (PATCH /branches/{id}/geo 30..500m)

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">QR Studio & Chống gian lận GPS (SCR-09)</h1>
        <ThemeToggle />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: 3 Tab (Poster A4/A5/Desk, Doi ma QR moi, Cau hinh GPS 30m-500m) tu SCR-09_QR_Studio.html
      </div>
    </div>
  );
}
