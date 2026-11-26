import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  QrCode,
  Hourglass,
  Users,
  Clock,
  Check,
  Info,
  XCircle,
  BellRing,
  Store,
  Footprints,
  AlertTriangle,
  QrCode as QrScannerIcon,
  ShieldCheck,
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { TicketBadge } from '../../components/ui/TicketBadge';
import { TicketStatus } from '../../lib/types';

export interface LiveTicketView {
  id: string;
  branchName: string;
  queueName: string;
  ticketNumber: string;
  displayName: string;
  partySize: number;
  status: TicketStatus;
  counterName: string | null;
  aheadCount: number;
  estimatedWaitMinutes: number;
  isAcknowledged: boolean;
  remainingSeconds: number;
}

/**
 * SCR-07 (a/b/c/d): Man hinh Ve cho Truc tiep cua Khach hang
 * Tham chieu: Design/Stitch/SCR-07a_Live_Tracking_WAITING.html .. SCR-07d_Live_Tracking_CANCELLED.html
 * Khong co du lieu ao: khi chua ket noi API Backend se hien trang thai cho du lieu sach se.
 */
export function LiveTrackingPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket] = useState<LiveTicketView | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const renderBody = (t: LiveTicketView) => {
    if (t.status === 'CALLED') {
      return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg px-5 py-7 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center">
            <BellRing className="h-8 w-8 animate-bounce" />
          </div>
          <div>
            <h1 className="font-display font-black text-3xl tracking-tight">TỚI LƯỢT BẠN!</h1>
            <p className="text-sm text-white/90 mt-1">Đã đến lượt phục vụ của bạn</p>
          </div>
          <div className="w-full rounded-xl bg-white/15 px-4 py-5 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/85">Số vé của bạn</span>
            <TicketBadge ticketNumber={t.ticketNumber} size="xl" />
            <div className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-700 font-bold text-sm">
              <Store className="h-4 w-4" />
              <span>VUI LÒNG ĐẾN {t.counterName || 'QUẦY'}</span>
            </div>
          </div>
          <button
            type="button"
            className={`w-full min-h-[52px] px-6 py-3.5 rounded-xl font-display font-extrabold text-base tracking-wide shadow flex items-center justify-center gap-2 ${
              t.isAcknowledged ? 'bg-emerald-950 text-white' : 'bg-white text-emerald-700'
            }`}
          >
            <Footprints className="h-5 w-5" />
            <span>{t.isAcknowledged ? 'ĐÃ XÁC NHẬN ĐANG ĐẾN' : 'TÔI ĐANG ĐẾN'}</span>
          </button>
        </section>
      );
    }

    if (t.status === 'NO_SHOW') {
      const mm = String(Math.floor(t.remainingSeconds / 60)).padStart(2, '0');
      const ss = String(t.remainingSeconds % 60).padStart(2, '0');
      return (
        <section className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg p-5 flex flex-col items-center text-center gap-4">
          <Hourglass className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-display font-extrabold uppercase">Bạn đang bị đánh dấu vắng mặt</h1>
            <p className="text-xs text-amber-100 mt-1">Đã quá lượt gọi nhưng nhân viên chưa thấy bạn tại quầy</p>
          </div>
          <div className="w-full rounded-xl bg-white/15 py-3 px-4 flex flex-col items-center">
            <TicketBadge ticketNumber={t.ticketNumber} size="lg" />
            <span className="text-xs text-amber-50 mt-1">
              {t.displayName} • Nhóm {t.partySize} người
            </span>
          </div>
          <div className="w-full rounded-xl bg-white text-slate-900 p-4">
            <div className="text-xs font-bold uppercase text-amber-700">Thời gian ân hạn còn lại</div>
            <div className="font-mono font-black text-4xl text-amber-600 mt-1">
              {mm}:{ss}
            </div>
          </div>
        </section>
      );
    }

    if (t.status === 'CANCELLED' || t.status === 'EXPIRED') {
      return (
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600">
            <XCircle className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-display font-black uppercase">
            {t.status === 'EXPIRED' ? 'Phiên làm việc đã kết thúc' : 'Lượt vé đã bị hủy'}
          </h1>
          <div className="line-through text-slate-400">
            <TicketBadge ticketNumber={t.ticketNumber} size="lg" />
          </div>
          <button
            type="button"
            className="w-full h-12 rounded-xl bg-indigo-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <QrScannerIcon className="h-4 w-4" />
            <span>QUÉT MÃ LẤY SỐ MỚI</span>
          </button>
        </section>
      );
    }

    return (
      <>
        {/* WAITING Hero Card */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 mb-3">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[11px] font-medium text-slate-500">Trực tiếp • Cập nhật tự động</span>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Số thứ tự của bạn</span>
          <div className="my-2 text-slate-900 dark:text-white">
            <TicketBadge ticketNumber={t.ticketNumber} size="xl" />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 mb-3">
            Chào bạn, <strong>{t.displayName}</strong> • Nhóm {t.partySize} người
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <Hourglass className="h-3.5 w-3.5" />
            <span>{t.status === 'SERVING' ? `Đang phục vụ tại ${t.counterName || 'quầy'}` : 'Đang chờ phục vụ'}</span>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
            <Users className="mx-auto h-5 w-5 text-indigo-600 mb-1.5" />
            <div className="text-xl font-bold font-display">{t.aheadCount} nhóm</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Đang chờ phía trước bạn</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
            <Clock className="mx-auto h-5 w-5 text-indigo-600 mb-1.5" />
            <div className="text-xl font-bold font-display">~{t.estimatedWaitMinutes} phút</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Thời gian chờ ước tính</p>
          </div>
        </section>

        {/* 4-Step Stepper */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tiến trình lượt chờ</span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
              {t.status === 'SERVING' ? 'Bước 4 / 4' : 'Bước 2 / 4'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Đã lấy số', done: true },
              { label: 'Đang chờ', active: t.status === 'WAITING', done: t.status === 'SERVING' },
              { label: 'Tới lượt', done: t.status === 'SERVING' },
              { label: 'Phục vụ', active: t.status === 'SERVING' },
            ].map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    step.done || step.active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.done ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <span className="mt-1.5 text-[11px] font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Trang web sẽ tự động cập nhật trạng thái thời gian thực khi nhân viên gọi số của bạn.
          </p>
        </div>

        {t.status === 'WAITING' && (
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <XCircle className="h-4 w-4" />
            <span>Hủy lượt chờ này</span>
          </button>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 px-4 py-5">
      <div className="mx-auto max-w-md space-y-4">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1">
            <QrCode className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-semibold">
              {ticket ? `${ticket.branchName} • ${ticket.queueName}` : 'QR-Wait • Theo dõi vé'}
            </span>
          </div>
          <ThemeToggle />
        </header>

        {ticket ? (
          renderBody(ticket)
        ) : (
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
            <Hourglass className="mx-auto h-10 w-10 text-indigo-600" />
            <h1 className="font-display text-lg font-bold">Chưa có dữ liệu vé chờ</h1>
            <p className="text-xs text-slate-500">
              Mã tra cứu: <span className="font-mono font-semibold">{ticketId || '--'}</span>. Vui lòng kết nối API
              <code className="mx-1 font-mono">/api/v1/public/tickets/{'{ticketId}'}</code> để hiển thị trạng thái vé thực tế.
            </p>
          </section>
        )}

        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-center space-y-4 shadow-xl">
              <AlertTriangle className="mx-auto h-8 w-8 text-rose-600" />
              <h2 className="text-base font-bold">Xác nhận hủy vé?</h2>
              <p className="text-xs text-slate-500">
                Bạn sẽ mất số thứ tự hiện tại và cần quét lại mã QR nếu muốn xếp hàng lại.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Giữ vé lại
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold"
                >
                  Đồng ý hủy
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Hệ thống xếp hàng tự động QR-Wait</span>
        </footer>
      </div>
    </div>
  );
}
