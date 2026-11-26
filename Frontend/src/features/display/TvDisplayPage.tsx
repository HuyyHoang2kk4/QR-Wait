import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  MapPin,
  BellRing,
  Mic,
  Volume2,
  Tv,
  ShieldCheck,
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { TicketBadge } from '../../components/ui/TicketBadge';
import { useTvAudioQueue } from './useTvAudioQueue';

export interface TvServingCard {
  counterId: string;
  counterName: string;
  ticketId: string;
  ticketNumber: string;
  displayName: string;
  partySize: number;
  status: string;
  recallCount: number;
}

export interface TvQueueQrItem {
  queueId: string;
  queueName: string;
  prefix: string;
  checkinUrl: string;
}

export interface TvDisplayState {
  organizationName: string;
  branchName: string;
  ttsEnabled: boolean;
  totalWaiting: number;
  estimatedAvgMinutes: number;
  servingCards: TvServingCard[];
  recentCalled: TvServingCard[];
  primaryQr: TvQueueQrItem | null;
}

/**
 * SCR-08: Man hinh TV Cong cong (Public TV Display - Read-only qua Secret URL)
 * Mac dinh Light Mode dong nhat toan he thong, ho tro Dark Mode & Audio Queue Ding Dong + TTS.
 * Tham chieu: Design/Stitch/SCR-08_Public_TV_Display.html
 */
export function TvDisplayPage() {
  const { screenToken } = useParams<{ screenToken: string }>();
  const { audioUnlocked, unlockAudio } = useTvAudioQueue();
  const [displayState] = useState<TvDisplayState | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateText = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const hhmm = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const ss = String(now.getSeconds()).padStart(2, '0');

  const ttsEnabled = displayState?.ttsEnabled ?? true;

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 flex flex-col justify-between p-4 lg:p-6 select-none">
      {/* TOP HEADER */}
      <header className="min-h-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
            <QrCode className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl lg:text-2xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                {displayState?.organizationName || 'QR-WAIT'}
              </span>
              <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded border border-indigo-200 dark:border-indigo-800 whitespace-nowrap">
                Hệ thống gọi số
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 whitespace-nowrap">
              <MapPin className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              <span>{displayState?.branchName || `Screen Token: ${screenToken || '--'}`}</span>
            </p>
          </div>
        </div>

        {/* Audio & Theme Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold">
            <BellRing className="h-4 w-4 text-amber-500" />
            <span>
              Chuông Ding Dong: <span className="text-emerald-600 font-bold">Bật</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold">
            <Mic className="h-4 w-4 text-indigo-600" />
            <span>
              Giọng đọc TTS:{' '}
              <span className={ttsEnabled ? 'text-emerald-600 font-bold' : 'text-slate-400 font-bold'}>
                {ttsEnabled ? 'Bật' : 'Tắt'}
              </span>
            </span>
          </div>
          {!audioUnlocked && (
            <button
              type="button"
              onClick={unlockAudio}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <Volume2 className="h-4 w-4" />
              <span>Kích hoạt âm thanh</span>
            </button>
          )}
          <ThemeToggle />
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-4 text-right">
          <div className="border-r border-slate-200 dark:border-slate-700 pr-4 hidden sm:block">
            <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Hôm nay</p>
            <p className="text-xs font-bold capitalize">{dateText}</p>
          </div>
          <div className="text-2xl lg:text-3xl font-black font-mono tracking-tight flex items-center gap-0.5 tabular-nums whitespace-nowrap">
            <span>{hhmm}</span>
            <span className="text-indigo-600 animate-pulse">:</span>
            <span className="text-indigo-600">{ss}</span>
          </div>
        </div>
      </header>

      {/* MAIN BODY (65% Serving / 35% Recents & QR) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 my-5">
        {/* LEFT SECTION: ĐANG PHỤC VỤ */}
        <section className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-xl lg:text-2xl font-black tracking-tight uppercase flex items-center gap-3 flex-wrap">
                ĐANG PHỤC VỤ
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 normal-case bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
                  Mời quý khách đến đúng quầy tiếp nhận
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>{displayState?.servingCards.length ?? 0} Quầy đang hoạt động</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center pt-4 gap-3.5">
            {displayState && displayState.servingCards.length > 0 ? (
              displayState.servingCards.map((card, idx) => (
                <div
                  key={card.counterId}
                  className={`rounded-2xl p-5 flex items-center justify-between transition-all ${
                    idx === 0
                      ? 'border-2 border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm'
                      : 'border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="w-1/4 min-w-0">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                      Khu vực tiếp nhận
                    </span>
                    <div className="text-2xl lg:text-3xl font-black truncate">{card.counterName}</div>
                  </div>
                  <div className="flex-1 text-center border-x border-slate-200 dark:border-slate-700 px-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                      SỐ THỨ TỰ
                    </span>
                    <div className={idx === 0 ? 'text-indigo-600' : ''}>
                      <TicketBadge ticketNumber={card.ticketNumber} size="xl" />
                    </div>
                  </div>
                  <div className="w-1/3 text-right pl-4 min-w-0">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Khách hàng</span>
                    <div className="text-lg lg:text-xl font-bold truncate mt-0.5">{card.displayName}</div>
                    <p className="text-xs font-medium text-slate-500 mt-1">Nhóm {card.partySize} người</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <Tv className="h-12 w-12 mb-3 opacity-40" />
                <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                  Chưa có quầy nào đang gọi số
                </p>
                <p className="text-xs mt-1">
                  Danh sách số thứ tự sẽ tự động hiển thị tại đây khi kết nối Backend &amp; nhân viên bấm gọi số.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT SECTION: VỪA GỌI GẦN ĐÂY & MÃ QR */}
        <aside className="lg:col-span-4 flex flex-col justify-between gap-5">
          {/* VỪA GỌI GẦN ĐÂY */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-indigo-600 rounded-full" />
                <h3 className="text-base font-extrabold tracking-tight uppercase">VỪA GỌI GẦN ĐÂY</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">4 Lượt trước</span>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2 mt-3">
              {displayState && displayState.recentCalled.length > 0 ? (
                displayState.recentCalled.slice(0, 4).map((item) => (
                  <div
                    key={item.ticketId}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg font-black font-mono text-indigo-600 whitespace-nowrap">
                        #{item.ticketNumber.replace(/^#/, '')}
                      </span>
                      <span className="text-xs font-bold truncate">{item.displayName}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-white dark:bg-slate-900 text-xs font-bold rounded border border-slate-200 dark:border-slate-700 shrink-0">
                      {item.counterName}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-xs text-slate-400">Chưa có lịch sử gọi số gần đây</div>
              )}
            </div>
          </div>

          {/* MÃ QR VÀO HÀNG CHỜ */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-between gap-3">
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                MÃ QR VÀO HÀNG CHỜ
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Tại sảnh chờ</span>
            </div>

            <div className="flex items-center gap-4 w-full justify-center py-1">
              <div className="p-2 bg-white rounded-xl border border-slate-200 shrink-0">
                {displayState?.primaryQr ? (
                  <QRCodeSVG value={displayState.primaryQr.checkinUrl} size={108} />
                ) : (
                  <div className="w-[108px] h-[108px] flex flex-col items-center justify-center bg-slate-50 text-slate-400 rounded-lg text-[10px] text-center px-2">
                    <QrCode className="h-8 w-8 mb-1 opacity-50" />
                    <span>Chờ QR từ Server</span>
                  </div>
                )}
              </div>
              <div className="text-left flex-1">
                <h4 className="text-sm font-extrabold leading-snug">Quét mã để lấy số thứ tự</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Dùng camera điện thoại quét mã theo dõi trực tiếp, không cần tải app.
                </p>
              </div>
            </div>

            <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                Mã QR hiện hành
              </span>
              <span className="font-medium text-slate-400">Cập nhật theo phiên</span>
            </div>
          </div>
        </aside>
      </main>

      {/* BOTTOM FOOTER */}
      <footer className="min-h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium shadow-xs">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold rounded text-[11px] uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
            Lưu ý
          </span>
          <span>
            Quý khách vui lòng chuẩn bị sẵn màn hình điện thoại khi đến lượt vào quầy. Vé quá hạn 15 phút sẽ tự động hủy.
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span>
            Đang chờ:{' '}
            <b className="text-slate-900 dark:text-white font-sans font-bold">
              {displayState?.totalWaiting ?? 0} nhóm
            </b>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Chờ trung bình:{' '}
            <b className="text-indigo-600 font-sans font-bold">
              {displayState ? `~${displayState.estimatedAvgMinutes} phút` : '--'}
            </b>
          </span>
        </div>
      </footer>
    </div>
  );
}
