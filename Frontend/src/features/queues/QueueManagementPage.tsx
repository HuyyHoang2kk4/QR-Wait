import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  QrCode,
  RotateCcw,
  X,
  Save,
  AlertTriangle,
  ListOrdered,
  Users,
  Clock,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { TicketBadge } from '../../components/ui/TicketBadge';
import { QueueStatus } from '../../lib/types';

export interface QueueCardItem {
  id: string;
  name: string;
  prefix: string;
  avgServiceMinutes: number;
  minPartySize: number;
  maxPartySize: number;
  status: QueueStatus;
  waitingCount: number;
  currentServingTicket: string | null;
  nextWaitingTicket: string | null;
  rotateQrOnSession: boolean;
}

/**
 * SCR-04: Quan ly Hang cho, Trang thai & Mo Phien moi Reset so ve 001
 * Tham chieu: Design/Stitch/SCR-04_Queue_Management.html
 */
export function QueueManagementPage() {
  const [queues] = useState<QueueCardItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingQueue, setEditingQueue] = useState<QueueCardItem | null>(null);
  const [resetTargetQueue, setResetTargetQueue] = useState<QueueCardItem | null>(null);

  const [formName, setFormName] = useState('');
  const [formPrefix, setFormPrefix] = useState('');
  const [formAvgMin, setFormAvgMin] = useState(10);
  const [formMinParty, setFormMinParty] = useState(1);
  const [formMaxParty, setFormMaxParty] = useState(4);
  const [formRotateQr, setFormRotateQr] = useState(false);

  const openCreateDrawer = () => {
    setEditingQueue(null);
    setFormName('');
    setFormPrefix('');
    setFormAvgMin(10);
    setFormMinParty(1);
    setFormMaxParty(4);
    setFormRotateQr(false);
    setDrawerOpen(true);
  };

  const openEditDrawer = (q: QueueCardItem) => {
    setEditingQueue(q);
    setFormName(q.name);
    setFormPrefix(q.prefix);
    setFormAvgMin(q.avgServiceMinutes);
    setFormMinParty(q.minPartySize);
    setFormMaxParty(q.maxPartySize);
    setFormRotateQr(q.rotateQrOnSession);
    setDrawerOpen(true);
  };

  const handleSaveQueue = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Ket noi POST /api/v1/branches/{branchId}/queues hoac PUT /api/v1/queues/{queueId}
    setDrawerOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Cấu hình &amp; Vận hành dịch vụ
            </span>
            <h1 className="mt-1 font-display text-2xl lg:text-3xl font-bold tracking-tight">
              Quản lý Hàng chờ
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Thiết lập phân luồng khách hàng, tiền tố số vé, giới hạn quy mô nhóm và mở phiên làm việc mới.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateDrawer}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Tạo hàng chờ mới</span>
          </button>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <ListOrdered className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-medium">Tổng hàng chờ</div>
              <div className="font-display text-xl font-bold">{queues.length} luồng</div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-medium">Tổng khách đang chờ</div>
              <div className="font-display text-xl font-bold">
                {queues.reduce((sum, q) => sum + q.waitingCount, 0)} nhóm
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-medium">Cơ chế Reset vé</div>
              <div className="text-sm font-bold">Mở phiên mới (Thủ công về 001)</div>
            </div>
          </div>
        </div>

        {/* Queue Grid or Clean Empty State */}
        {queues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queues.map((q) => (
              <div
                key={q.id}
                className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden"
              >
                <div className="h-1.5 w-full bg-indigo-600" />
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono font-bold text-sm px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                        [{q.prefix}]
                      </span>
                      <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        {q.status}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold font-display">{q.name}</h2>
                    <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800 p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase text-slate-400 block">Đang phục vụ</span>
                        {q.currentServingTicket ? (
                          <TicketBadge ticketNumber={q.currentServingTicket} size="md" />
                        ) : (
                          <span className="font-mono font-bold text-slate-400">--</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] uppercase text-slate-400 block">Đang chờ</span>
                        <span className="font-bold">{q.waitingCount} nhóm</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => openEditDrawer(q)}
                        className="h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Chỉnh sửa</span>
                      </button>
                      <button
                        type="button"
                        className="h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        <span>Poster QR</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResetTargetQueue(q)}
                      className="h-9 w-full rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5 hover:bg-amber-100"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Bắt đầu phiên mới (Reset về 001)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
            <ListOrdered className="mx-auto h-10 w-10 text-slate-400 mb-3" />
            <h2 className="font-display text-base font-bold">Chưa có hàng chờ nào được thiết lập</h2>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              Bấm nút <strong>"Tạo hàng chờ mới"</strong> ở góc trên bên phải để cấu hình tiền tố số vé (ví dụ A, B, VIP)
              và giới hạn quy mô nhóm khách.
            </p>
          </div>
        )}
      </div>

      {/* Slide-over Create/Edit Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-display font-bold text-base">
                {editingQueue ? `Chỉnh sửa hàng chờ [${editingQueue.prefix}]` : 'Tạo hàng chờ mới'}
              </h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQueue} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Tên hàng chờ *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Bàn 1–4 người..."
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Tiền tố (1–3 chữ in hoa) *</label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    disabled={Boolean(editingQueue)}
                    value={formPrefix}
                    onChange={(e) => setFormPrefix(e.target.value.toUpperCase())}
                    placeholder="A"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Thời gian phục vụ TB (phút)</label>
                  <input
                    type="number"
                    min={1}
                    value={formAvgMin}
                    onChange={(e) => setFormAvgMin(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Số khách tối thiểu</label>
                  <input
                    type="number"
                    min={1}
                    value={formMinParty}
                    onChange={(e) => setFormMinParty(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Số khách tối đa</label>
                  <input
                    type="number"
                    min={1}
                    value={formMaxParty}
                    onChange={(e) => setFormMaxParty(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold">Tự động đổi mã QR khi mở Ca mới</div>
                  <div className="text-[11px] text-slate-500">Mặc định tắt để giữ nguyên poster giấy đã in</div>
                </div>
                <input
                  type="checkbox"
                  checked={formRotateQr}
                  onChange={(e) => setFormRotateQr(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
              </label>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Lưu cấu hình</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Reset Session Modal */}
      {resetTargetQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-base">Xác nhận mở phiên mới?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Các vé chưa hoàn tất của hàng chờ <strong>{resetTargetQueue.name}</strong> sẽ chuyển sang trạng thái{' '}
              <code>EXPIRED</code> và số thứ tự sẽ đặt lại về <code>{resetTargetQueue.prefix}-001</code>.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setResetTargetQueue(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => setResetTargetQueue(null)}
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold"
              >
                Xác nhận Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
