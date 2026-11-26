import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  Hourglass,
  CheckCircle2,
  TrendingUp,
  Download,
  PlusCircle,
  BarChart3,
  ListOrdered,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DashboardLayout, BranchOption } from '../../components/layout/DashboardLayout';
import { TicketBadge } from '../../components/ui/TicketBadge';
import { QueueStatus } from '../../lib/types';

export interface DashboardQueueRow {
  id: string;
  name: string;
  prefix: string;
  waitingCount: number;
  estimatedWaitMinutes: number;
  currentServingTicket: string | null;
  status: QueueStatus;
}

export interface DashboardHourlyPoint {
  hourLabel: string;
  issuedCount: number;
  completedCount: number;
}

/**
 * SCR-03: Executive Dashboard
 * Tham chieu: Design/Stitch/SCR-03_Executive_Dashboard.html
 * Khong co du lieu ao: moi chi so & danh sach bat dau o trang thai rong cho du lieu thuc tu Backend.
 */
export function DashboardPage() {
  const [branches] = useState<BranchOption[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [queues] = useState<DashboardQueueRow[]>([]);
  const [hourlyTraffic] = useState<DashboardHourlyPoint[]>([]);

  const totalToday = 0;
  const totalWaiting = queues.reduce((acc, q) => acc + q.waitingCount, 0);
  const activeCounters = 0;
  const completionRate = 0;

  return (
    <DashboardLayout
      branches={branches}
      selectedBranchId={selectedBranchId}
      onBranchChange={setSelectedBranchId}
    >
      <div className="flex flex-col gap-6">
        {/* Top Toolbar */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hệ thống quản trị thời gian thực</span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
              Tổng quan điều hành
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Tải báo cáo (CSV)</span>
            </Link>
            <Link
              to="/queues"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Tạo hàng chờ mới</span>
            </Link>
          </div>
        </section>

        {/* 4 KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tổng số vé hôm nay
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                <Ticket className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-3xl font-extrabold">{totalToday}</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Chờ dữ liệu đồng bộ hôm nay</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Đang chờ
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
                <Hourglass className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-3xl font-extrabold">
              {totalWaiting} <span className="text-base font-normal text-slate-500">nhóm</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">Cập nhật qua WebSocket</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Quầy đang hoạt động
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-3xl font-extrabold">
              {activeCounters} <span className="text-base font-normal text-slate-500">quầy</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">Theo chi nhánh đang chọn</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tỷ lệ hoàn tất
              </span>
              <span className="text-xs text-slate-400">0 / 0 vé</span>
            </div>
            <div className="font-display text-3xl font-extrabold mb-2">{completionRate}%</div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </section>

        {/* Hourly Traffic Chart */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="font-display text-lg font-bold">Mật độ lưu lượng khách theo khung giờ hôm nay</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Theo dõi giờ cao điểm để chủ động phân bổ nhân sự quầy
              </p>
            </div>
          </div>

          {hourlyTraffic.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyTraffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="hourLabel" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="issuedCount" name="Lượt lấy vé" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completedCount" name="Hoàn tất" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <BarChart3 className="h-9 w-9 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Chưa có dữ liệu lưu lượng hôm nay</p>
              <p className="text-xs mt-1">Biểu đồ sẽ tự hiển thị khi có lượt check-in từ Backend.</p>
            </div>
          )}
        </section>

        {/* Queue Overview Table */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Trạng thái các Hàng chờ trực tiếp</h2>
            <span className="text-xs text-slate-500">{queues.length} hàng chờ</span>
          </div>

          {queues.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-6">Tên Hàng Chờ</th>
                    <th className="py-3 px-4">Tiền Tố</th>
                    <th className="py-3 px-4">Đang Chờ</th>
                    <th className="py-3 px-4">Đang Phục Vụ</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-6 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {queues.map((q) => (
                    <tr key={q.id}>
                      <td className="py-3.5 px-6 font-semibold">{q.name}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">[{q.prefix}]</td>
                      <td className="py-3.5 px-4">{q.waitingCount} nhóm</td>
                      <td className="py-3.5 px-4">
                        {q.currentServingTicket ? <TicketBadge ticketNumber={q.currentServingTicket} size="sm" /> : '--'}
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs font-semibold">{q.status}</td>
                      <td className="py-3.5 px-6 text-right">
                        <Link to="/staff/panel" className="text-xs font-semibold text-indigo-600 hover:underline">
                          Mở Staff Panel
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <ListOrdered className="h-9 w-9 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Chưa có hàng chờ nào</p>
              <p className="text-xs mt-1">
                Hãy tạo chi nhánh &amp; hàng chờ đầu tiên ở mục{' '}
                <Link to="/queues" className="text-indigo-600 font-semibold hover:underline">
                  Quản lý Hàng chờ
                </Link>
                .
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
