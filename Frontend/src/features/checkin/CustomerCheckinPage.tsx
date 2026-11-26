import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QrCode, Hourglass, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export interface CheckinQueueContext {
  organizationName: string;
  branchName: string;
  queueName: string;
  waitingCount: number;
  estimatedWaitMinutes: number;
  minPartySize: number;
  maxPartySize: number;
  isGeoEnabled: boolean;
}

/**
 * SCR-06: Man hinh Khach hang quet QR lay so tu phuc vu
 * Tham chieu: Design/Stitch/SCR-06_Customer_Checkin.html (ban Redesign sach se)
 * Khong chua du lieu ao: hien thi du lieu thuc tu API hoac trang thai khoi tao sach se.
 */
export function CustomerCheckinPage() {
  const { qrToken } = useParams<{ qrToken: string }>();
  const [context] = useState<CheckinQueueContext | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [partySize, setPartySize] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFeedback('Vui lòng nhập tên của bạn để nhân viên gọi số.');
      return;
    }
    // TODO: Ket noi GET /public/checkin/{qrToken} & POST /public/tickets
    setFeedback('Giao diện Check-in đã sẵn sàng chờ nối API Backend.');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-gray-900 dark:text-slate-100 flex flex-col">
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-5 py-6 justify-between">
        <div>
          {/* Top Brand Header Bar */}
          <header className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold tracking-tight font-display truncate">
                  {context?.organizationName || 'QR-Wait'}
                </span>
                <span className="text-[11px] font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-full truncate">
                  {context?.branchName || `QR: ${qrToken || '--'}`}
                </span>
              </div>
            </div>
            <ThemeToggle />
          </header>

          {/* Queue Info Section */}
          <div className="flex flex-col items-center mt-5 mb-6 text-center">
            <p className="text-xs font-semibold tracking-wider text-gray-500 dark:text-slate-400 uppercase">
              {context ? context.queueName : 'HÀNG CHỜ DỊCH VỤ'}
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[13px] font-medium">
              <Hourglass className="h-3.5 w-3.5 text-amber-600" />
              <span>
                {context
                  ? `${context.waitingCount} nhóm đang chờ • ~${context.estimatedWaitMinutes} phút`
                  : 'Đang chờ đồng bộ thông tin hàng chờ từ máy chủ'}
              </span>
            </div>
          </div>

          {feedback && (
            <div className="mb-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {feedback}
            </div>
          )}

          {/* Check-in Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                Tên của bạn <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="customerName"
                  type="text"
                  required
                  maxLength={30}
                  autoComplete="off"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nhập tên để nhân viên gọi số..."
                  className="w-full h-11 pl-9 pr-3.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-slate-300">
                  Số lượng người <span className="text-red-500">*</span>
                </label>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {partySize === 5 ? '5+ người' : `${partySize} người`}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((size) => {
                  const selected = partySize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`h-10 rounded-lg text-sm flex items-center justify-center transition-all ${
                        selected
                          ? 'font-semibold bg-indigo-600 text-white border border-indigo-600 shadow-xs'
                          : 'font-medium bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200'
                      }`}
                    >
                      {size === 5 ? '5+' : size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="customerNote" className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                Ghi chú <span className="text-xs text-gray-400 font-normal">(Không bắt buộc)</span>
              </label>
              <textarea
                id="customerNote"
                rows={2}
                maxLength={255}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Yêu cầu thêm nếu có..."
                className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>LẤY SỐ NGAY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 pb-2 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-slate-800">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>Không cần cài app • Tuyệt đối không lưu số điện thoại hay thông tin cá nhân</span>
        </footer>
      </main>
    </div>
  );
}
