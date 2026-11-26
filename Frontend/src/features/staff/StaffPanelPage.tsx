import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Play,
  BellRing,
  UserX,
  CheckCircle2,
  ArrowLeftRight,
  SkipForward,
  Megaphone,
  ArrowRight,
  Clock,
  RotateCcw,
  Store,
  X,
  LayoutDashboard,
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { TicketBadge } from '../../components/ui/TicketBadge';
import { TicketStatus } from '../../lib/types';

export interface StaffTicketItem {
  id: string;
  ticketNumber: string;
  displayName: string;
  partySize: number;
  notes: string | null;
  isWalkin: boolean;
  status: TicketStatus;
  recallCount: number;
  isAcknowledged: boolean;
  calledAt: string | null;
  cancelScheduledAt: string | null;
}

/**
 * SCR-05: Bang dieu khien Nhan vien 1 cham (Staff Panel)
 * Tham chieu: Design/Stitch/SCR-05_Staff_Calling_Panel.html (Ban Redesign sach se)
 * Dong ho 2 phut chi bao truc quan, KHONG khoa thao tac Vang mat / Goi tiep theo (BRL-011).
 */
export function StaffPanelPage() {
  const [selectedCounterName] = useState<string | null>(null);
  const [queueName] = useState<string | null>(null);
  const [currentTicket] = useState<StaffTicketItem | null>(null);
  const [waitingList] = useState<StaffTicketItem[]>([]);
  const [noshowList] = useState<StaffTicketItem[]>([]);
  const [activeTab, setActiveTab] = useState<'waiting' | 'noshow'>('waiting');
  const [walkinOpen, setWalkinOpen] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinPartySize, setWalkinPartySize] = useState(2);
  const [elapsedCallSec, setElapsedCallSec] = useState(0);

  useEffect(() => {
    if (!currentTicket?.calledAt || currentTicket.status !== 'CALLED') {
      setElapsedCallSec(0);
      return;
    }
    const updateTimer = () => {
      const diff = Math.max(0, Math.floor((Date.now() - new Date(currentTicket.calledAt!).getTime()) / 1000));
      setElapsedCallSec(diff);
    };
    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, [currentTicket]);

  const remainingTwoMin = Math.max(0, 120 - elapsedCallSec);
  const isOverTwoMin = elapsedCallSec >= 120;
  const timerFormatted = `${String(Math.floor(remainingTwoMin / 60)).padStart(2, '0')}:${String(
    remainingTwoMin % 60,
  ).padStart(2, '0')}`;

  const nextWaiting = waitingList[0] ?? null;

  const handleWalkinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Ket noi POST /api/v1/staff/queues/{queueId}/walkin
    setWalkinOpen(false);
    setWalkinName('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] text-gray-900 dark:text-slate-100 flex flex-col">
      {/* Sleek Linear/Stripe Header */}
      <header className="sticky top-0 z-40 h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm">
              Q
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-sm tracking-tight">QR-Wait</span>
              <span className="text-xs text-gray-400">/</span>
              <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Quầy gọi số</span>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white px-2.5 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-xs font-medium"
          >
            <Store className="h-3.5 w-3.5 text-indigo-600" />
            <span>{selectedCounterName || 'Chưa chọn quầy'}</span>
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 flex flex-col gap-6">
        {/* Sub-header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold tracking-tight">
                {queueName || 'Chưa chọn hàng chờ'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Sẵn sàng đồng bộ
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {selectedCounterName || 'Vui lòng chọn quầy trực'} • {waitingList.length} nhóm đang đợi
            </p>
          </div>

          <button
            type="button"
            onClick={() => setWalkinOpen(true)}
            className="h-9 px-3.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
          >
            <UserPlus className="h-4 w-4 text-gray-500" />
            <span>+ Thêm khách (Walk-in)</span>
          </button>
        </div>

        {/* Hero Active Ticket Card */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs">
          {currentTicket ? (
            <>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-gray-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex flex-col min-w-[140px]">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-600">
                      {currentTicket.status === 'SERVING' ? 'Đang phục vụ' : 'Đang gọi số'}
                    </span>
                    <div className="mt-1">
                      <TicketBadge ticketNumber={currentTicket.ticketNumber} size="xl" />
                    </div>
                  </div>
                  <div className="hidden sm:block h-14 w-px bg-gray-200 dark:bg-slate-700" />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{currentTicket.displayName}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-slate-300">
                        Nhóm {currentTicket.partySize} người
                      </span>
                    </div>
                    {currentTicket.notes && (
                      <span className="inline-flex w-fit items-center text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
                        {currentTicket.notes}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Min Non-blocking Timer & Arrival Sync Badge */}
                <div className="flex sm:flex-col items-start sm:items-end gap-2">
                  {currentTicket.isAcknowledged && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Khách báo đã tới</span>
                    </div>
                  )}
                  <div
                    className={`text-xs font-medium ${
                      isOverTwoMin ? 'text-rose-600 font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {isOverTwoMin ? 'Đã quá 2 phút chưa thấy khách' : 'Đang chờ ra quầy:'}{' '}
                    <span className="font-mono font-semibold">{timerFormatted}</span> / 02:00
                  </div>
                </div>
              </div>

              {/* Action Buttons (Never locked by 2-min timer) */}
              <div className="pt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  className="flex-1 sm:flex-initial h-10 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  <span>BẮT ĐẦU PHỤC VỤ</span>
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-medium flex items-center gap-2"
                >
                  <BellRing className="h-4 w-4 text-gray-500" />
                  <span>Gọi lại ({currentTicket.recallCount}/3)</span>
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2"
                >
                  <UserX className="h-4 w-4" />
                  <span>Vắng mặt</span>
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Hoàn tất</span>
                </button>
                <button
                  type="button"
                  title="Chuyển sang quầy khác"
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 flex items-center justify-center ml-auto"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Trạng thái Quầy trực
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Hiện tại chưa có khách hàng đang gọi hoặc đang phục vụ
              </p>
              <p className="text-xs text-slate-500">
                Bấm nút <strong>"GỌI TIẾP THEO"</strong> ở thanh dưới cùng để mời lượt vé kế tiếp theo thứ tự FIFO.
              </p>
            </div>
          )}
        </section>

        {/* Waitlist & No-Show Tabs */}
        <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 pt-3.5 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('waiting')}
                className={`pb-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'waiting'
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                <span>Đang chờ</span>
                <span className="px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                  {waitingList.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('noshow')}
                className={`pb-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'noshow'
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                <span>Vắng mặt 15p</span>
                <span className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-[11px] font-medium">
                  {noshowList.length}
                </span>
              </button>
            </div>
            <div className="pb-3 flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Đồng bộ thời gian thực</span>
            </div>
          </div>

          {activeTab === 'waiting' ? (
            waitingList.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {waitingList.map((item) => (
                  <div
                    key={item.id}
                    className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-gray-50/70 dark:hover:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className="min-w-[96px] whitespace-nowrap font-mono font-bold text-sm bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-2.5 py-1.5 rounded-md text-center">
                        #{item.ticketNumber.replace(/^#/, '')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold">{item.displayName}</span>
                          <span className="text-xs text-gray-500">• {item.partySize} người</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300">
                            {item.isWalkin ? 'Walk-in' : 'Online QR'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <Clock className="h-7 w-7 opacity-40" />
                <span>Hiện không có khách nào đang chờ trong hàng đợi</span>
              </div>
            )
          ) : noshowList.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {noshowList.map((item) => (
                <div key={item.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="min-w-[96px] whitespace-nowrap font-mono font-bold text-sm bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2.5 py-1.5 rounded-md text-center">
                      #{item.ticketNumber.replace(/^#/, '')}
                    </div>
                    <div className="text-xs font-semibold">
                      {item.displayName} • {item.partySize} người
                    </div>
                  </div>
                  <button
                    type="button"
                    className="h-8 px-3.5 rounded-md border border-gray-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Phục hồi vé</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-400">
              Không có vé nào đang trong thời gian ân hạn 15 phút
            </div>
          )}
        </section>
      </main>

      {/* Sticky Bottom Calling Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-gray-200 dark:border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300">
              <SkipForward className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider block">
                Kế tiếp trong hàng
              </span>
              <div className="text-xs font-semibold flex items-center gap-1.5">
                {nextWaiting ? (
                  <>
                    <span className="font-mono text-indigo-600 font-bold whitespace-nowrap">
                      #{nextWaiting.ticketNumber.replace(/^#/, '')}
                    </span>
                    <span>•</span>
                    <span>{nextWaiting.displayName}</span>
                  </>
                ) : (
                  <span className="text-gray-400 font-normal">Chưa có khách kế tiếp</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="h-11 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-xs flex items-center gap-2 whitespace-nowrap"
          >
            <Megaphone className="h-4 w-4" />
            <span>{nextWaiting ? `GỌI TIẾP THEO (#${nextWaiting.ticketNumber})` : 'GỌI TIẾP THEO'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Walk-in Modal */}
      {walkinOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-indigo-600" />
                <h2 className="text-sm font-semibold">Thêm khách Walk-in</h2>
              </div>
              <button type="button" onClick={() => setWalkinOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleWalkinSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium mb-1">Tên khách hàng *</label>
                <input
                  type="text"
                  required
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  placeholder="Nhập tên hoặc đặc điểm nhận dạng..."
                  className="w-full h-9 px-3 rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Số lượng khách</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setWalkinPartySize(n)}
                      className={`h-8 rounded text-xs font-medium border ${
                        walkinPartySize === n
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-gray-200 dark:border-slate-700'
                      }`}
                    >
                      {n === 5 ? '5+' : n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setWalkinOpen(false)}
                  className="flex-1 h-9 rounded-md border border-gray-200 dark:border-slate-700 text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 rounded-md bg-indigo-600 text-white text-xs font-semibold"
                >
                  Lấy vé ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
