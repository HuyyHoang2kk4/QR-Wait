import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-11: Cai dat He thong, Thanh vien, Quay & Screen Token / TTS TV
 * (Khong bao gom API Keys & Webhooks do M11 tam dung)
 * Tham chieu: Design/Stitch/SCR-11_Settings_Team.html
 */
export function SettingsPage() {
  // TODO: Tab 1 Quan ly Thanh vien (GET/POST /users, PATCH /users/{id}/status)
  // TODO: Tab 2 Chi nhanh, Screen Token TV (POST /branches/{id}/screen-tokens), Bat/Tat TTS (PATCH /branches/{id}/tts) & Logo

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Cài đặt & Đội ngũ (SCR-11)</h1>
        <ThemeToggle />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: Quan ly Nhan vien, Cau hinh Quay, Secret URL TV Display & Giong doc TTS tu SCR-11_Settings_Team.html
      </div>
    </div>
  );
}
