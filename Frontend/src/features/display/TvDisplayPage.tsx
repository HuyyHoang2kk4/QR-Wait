import { useParams } from 'react-router-dom';
import { Volume2 } from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { useTvAudioQueue } from './useTvAudioQueue';

/**
 * SCR-08: Man hinh TV Cong cong (Public TV Display - Read-only qua Secret URL)
 * Mac dinh Light Mode dong nhat, ho tro chuyen Sang/Toi & Audio Queue (Ding Dong + TTS Bat/Tat)
 * Tham chieu: Design/Stitch/SCR-08_Public_TV_Display.html
 */
export function TvDisplayPage() {
  const { screenToken } = useParams<{ screenToken: string }>();
  const { audioUnlocked, unlockAudio } = useTvAudioQueue();

  // TODO 1: Goi GET /api/v1/public/display/{screenToken} de tai servingCards, recentCalled, queuesQr, ttsEnabled
  // TODO 2: Subscribe WS /topic/branch/{branchId}/tv nhan TV_CALL_ANNOUNCE, TV_QR_ROTATED, TV_TTS_TOGGLED
  // TODO 3: Khi co TV_CALL_ANNOUNCE -> goi enqueueAnnouncement(...) & nhap nhay the ve 4 giay

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3">
        <div>
          <h1 className="text-lg font-bold whitespace-nowrap">QR-WAIT • TV Display (SCR-08)</h1>
          <p className="text-xs text-slate-500">Screen Token: {screenToken}</p>
        </div>
        <div className="flex items-center gap-3">
          {!audioUnlocked && (
            <button
              type="button"
              onClick={unlockAudio}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Volume2 className="h-4 w-4" /> Kích hoạt âm thanh
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-500">
        TODO: Bo cuc 65% Dang phuc vu (whitespace-nowrap) + 35% Vua goi gan day & Ma QR hien hanh (SCR-08_Public_TV_Display.html)
      </div>
    </div>
  );
}
