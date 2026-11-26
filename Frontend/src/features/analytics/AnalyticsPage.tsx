import { useState } from 'react';
import {
  Download,
  Users,
  Timer,
  Clock,
  UserX,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export interface AnalyticsOverviewData {
  totalTickets: number;
  avgWaitMinutes: number;
  avgServiceMinutes: number;
  noshowRatePercent: number;
  completedCount: number;
  cancelledCount: number;
  noshowTimeoutCount: number;
  hourlyTraffic: Array<{ hour: string; ticketCount: number }>;
  staffRanking: Array<{ staffId: string; staffName: string; servedCount: number; avgServiceMinutes: number }>;
}

/**
 * SCR-10: Bao cao Thong ke & Xuat CSV (UTF-8 BOM)
 * Tham chieu: Design/Stitch/SCR-10_Analytics_Export.html
 */
export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d'>('7d');
  const [overview] = useState<AnalyticsOverviewData | null>(null);

  const statusSlices = overview
    ? [
        { name: 'Hoàn tất', value: overview.completedCount, color: '#4F46E5' },
        { name: 'Vắng mặt', value: overview.noshowTimeoutCount, color: '#F59E0B' },
        { name: 'Tự hủy', value: overview.cancelledCount, color: '#EF4444' },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header & Export */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 text-xs font-semibold uppercase">
              Báo cáo &amp; Phân tích
            </span>
            <h1 className="mt-1 font-display text-2xl lg:text-3xl font-bold tracking-tight">
              Báo cáo &amp; Phân tích vận hành
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Thống kê lưu lượng khách, thời gian chờ và năng suất phục vụ (tối đa 90 ngày khi xuất CSV).
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 self-start lg:self-auto"
          >
            <Download className="h-4 w-4" />
            <span>Xuất file CSV (UTF-8)</span>
          </button>
        </div>

        {/* Date Filter Bar */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">Khoảng thời gian phân tích:</div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {[
              { id: 'today' as const, label: 'Hôm nay' },
              { id: '7d' as const, label: '7 ngày qua' },
              { id: '30d' as const, label: '30 ngày qua' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDateRange(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  dateRange === item.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            {
              label: 'Tổng lượt khách tiếp nhận',
              value: overview ? `${overview.totalTickets}` : '0',
              unit: 'lượt',
              icon: Users,
            },
            {
              label: 'Thời gian chờ trung bình',
              value: overview ? `${overview.avgWaitMinutes.toFixed(1)}` : '--',
              unit: 'phút',
              icon: Timer,
            },
            {
              label: 'Thời gian phục vụ TB',
              value: overview ? `${overview.avgServiceMinutes.toFixed(1)}` : '--',
              unit: 'phút / lượt',
              icon: Clock,
            },
            {
              label: 'Tỷ lệ vắng mặt (No-Show)',
              value: overview ? `${overview.noshowRatePercent.toFixed(1)}%` : '0%',
              unit: '',
              icon: UserX,
            },
          ].map(({ label, value, unit, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-start justify-between"
            >
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold">{value}</span>
                  {unit && <span className="text-xs text-slate-500">{unit}</span>}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </section>

        {/* Charts 60% / 40% */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="font-display text-base font-bold mb-4">Lưu lượng khách theo khung giờ</h2>
            {overview && overview.hourlyTraffic.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overview.hourlyTraffic}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="ticketCount" name="Lượt vé" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <BarChart3 className="mx-auto h-9 w-9 mb-2 opacity-40" />
                <p className="text-xs">Chưa có dữ liệu thống kê cho khoảng thời gian đã chọn</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="font-display text-base font-bold mb-4">Tỷ lệ trạng thái vé</h2>
            {statusSlices.some((s) => s.value > 0) ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusSlices} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>
                      {statusSlices.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <PieChartIcon className="mx-auto h-9 w-9 mb-2 opacity-40" />
                <p className="text-xs">Chưa có vé để tính tỷ lệ</p>
              </div>
            )}
          </div>
        </section>

        {/* Staff Productivity Table */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="font-display text-base font-bold mb-4">Năng suất phục vụ theo Nhân viên</h2>
          {overview && overview.staffRanking.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
                    <th className="py-3 px-4">Nhân viên</th>
                    <th className="py-3 px-4">Số lượt đã phục vụ</th>
                    <th className="py-3 px-4">Thời gian xử lý TB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {overview.staffRanking.map((row) => (
                    <tr key={row.staffId}>
                      <td className="py-3 px-4 font-semibold">{row.staffName}</td>
                      <td className="py-3 px-4">{row.servedCount} lượt</td>
                      <td className="py-3 px-4">{row.avgServiceMinutes.toFixed(1)} phút</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-400">
              Chưa có dữ liệu năng suất nhân viên
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
