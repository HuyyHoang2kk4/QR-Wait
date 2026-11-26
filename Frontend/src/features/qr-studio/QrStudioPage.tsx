import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Printer,
  RefreshCw,
  MapPin,
  FileDown,
  Image as ImageIcon,
  ShieldCheck,
  AlertTriangle,
  QrCode,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

type QrTab = 'poster' | 'rotate' | 'gps';

export interface QrQueueOption {
  id: string;
  name: string;
  prefix: string;
  qrToken: string;
  rotateQrOnSession: boolean;
}

/**
 * SCR-09: QR Studio & Chong gian lan
 * Tham chieu: Design/Stitch/SCR-09_QR_Studio.html & SRS v1.2 (Doi QR thu cong/theo ca + GPS Radius 30-500m)
 */
export function QrStudioPage() {
  const [activeTab, setActiveTab] = useState<QrTab>('poster');
  const [queues] = useState<QrQueueOption[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState('');
  const [paperSize, setPaperSize] = useState<'A4' | 'A5' | 'DESK'>('A4');
  const [accentColor, setAccentColor] = useState('#4F46E5');
  const [headline, setHeadline] = useState('Quét mã để lấy số thứ tự');
  const [subline, setSubline] = useState('Không cần cài đặt ứng dụng • Bảo mật thông tin');
  const [isGeoEnabled, setIsGeoEnabled] = useState(false);
  const [gpsRadius, setGpsRadius] = useState(100);
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);

  const selectedQueue = queues.find((q) => q.id === selectedQueueId) ?? queues[0] ?? null;
  const checkinUrl = selectedQueue ? `${window.location.origin}/c/${selectedQueue.qrToken}` : null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            QR Studio &amp; Chống gian lận
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Thiết kế ấn phẩm mã QR in ấn 300 DPI, đổi mã QR mới khi cần vô hiệu hóa ảnh chụp cũ và cấu hình bán kính GPS.
          </p>
        </div>

        {/* 3 Feature Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2">
          {[
            {
              key: 'poster' as const,
              title: 'Mã QR In ấn (Static Posters)',
              desc: 'Poster A4, A5, Mica để bàn 300 DPI.',
              icon: Printer,
            },
            {
              key: 'rotate' as const,
              title: 'Đổi Mã QR & Chiếu Màn hình',
              desc: 'Giữ cố định hoặc đổi mã QR mới ngay lập tức.',
              icon: RefreshCw,
            },
            {
              key: 'gps' as const,
              title: 'Bảo vệ Vị trí (GPS)',
              desc: 'Giới hạn quét trong bán kính 30m – 500m.',
              icon: MapPin,
            },
          ].map(({ key, title, desc, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`text-left p-4 rounded-xl transition-all flex flex-col gap-1.5 ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-display font-semibold text-sm">{title}</span>
                </div>
                <p className="text-xs text-slate-500">{desc}</p>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Static Posters */}
        {activeTab === 'poster' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
                <label className="block text-sm font-semibold">1. Hàng chờ áp dụng</label>
                <select
                  value={selectedQueueId}
                  onChange={(e) => setSelectedQueueId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm"
                >
                  {queues.length === 0 ? (
                    <option value="">Chưa có hàng chờ nào</option>
                  ) : (
                    queues.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.name} ([{q.prefix}])
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
                <span className="block text-sm font-semibold">2. Khổ giấy in ấn</span>
                <div className="space-y-2">
                  {[
                    { value: 'A4' as const, label: 'Khổ A4 đứng (210 x 297 mm)' },
                    { value: 'A5' as const, label: 'Khổ A5 đứng (148 x 210 mm)' },
                    { value: 'DESK' as const, label: 'Thẻ mica để bàn (100 x 150 mm)' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <input
                        type="radio"
                        name="paper"
                        checked={paperSize === opt.value}
                        onChange={() => setPaperSize(opt.value)}
                        className="text-indigo-600"
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
                <span className="block text-sm font-semibold">3. Nhận diện &amp; Thông điệp Poster</span>
                <div className="flex items-center gap-2.5">
                  {['#4F46E5', '#2563EB', '#0F172A', '#0D9488', '#7C3AED'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setAccentColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-lg transition-transform ${
                        accentColor === color ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110' : ''
                      }`}
                    />
                  ))}
                  <span className="ml-auto font-mono text-xs font-semibold">{accentColor}</span>
                </div>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-medium"
                />
                <input
                  type="text"
                  value={subline}
                  onChange={(e) => setSubline(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
                />
              </div>
            </div>

            {/* Live A4 Preview */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-6 flex justify-center">
                <div className="w-full max-w-[380px] aspect-[1/1.414] bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-md p-6 flex flex-col justify-between text-center">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>QR-Wait</span>
                    <span className="text-slate-400">{paperSize}</span>
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">{headline}</h2>
                    <p className="text-xs text-slate-500 mt-1.5">{subline}</p>
                  </div>

                  <div className="mx-auto p-4 rounded-2xl border border-slate-200 bg-white">
                    {checkinUrl ? (
                      <QRCodeSVG value={checkinUrl} size={170} fgColor={accentColor} />
                    ) : (
                      <div className="w-[170px] h-[170px] flex flex-col items-center justify-center bg-slate-50 text-slate-400 rounded-xl text-xs px-3">
                        <QrCode className="h-10 w-10 mb-2 opacity-40" />
                        <span>Chọn hàng chờ để sinh mã QR thật</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Không cần cài app • Không lưu số điện thoại</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Tải PDF in ấn (300 DPI)</span>
                </button>
                <button
                  type="button"
                  className="h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <ImageIcon className="h-4 w-4 text-indigo-600" />
                  <span>Tải ảnh PNG sắc nét</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rotate QR */}
        {activeTab === 'rotate' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 max-w-2xl space-y-5">
            <div>
              <h2 className="font-display text-lg font-bold">Đổi mã QR mới (Thủ công / Theo Ca)</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Mặc định mỗi hàng chờ giữ nguyên 1 mã QR cố định để tiện in poster. Khi bấm đổi mã QR mới, mã cũ trên giấy in hoặc ảnh chụp trước đó sẽ mất hiệu lực ngay lập tức và TV Display tự cập nhật mã mới.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRotateConfirm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Đổi mã QR mới</span>
            </button>
          </div>
        )}

        {/* Tab 3: GPS Radius */}
        {activeTab === 'gps' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 max-w-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">Bảo vệ Vị trí Địa lý (GPS Radius)</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Chỉ cho phép khách lấy số khi đang đứng trong bán kính quanh tọa độ chi nhánh.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isGeoEnabled}
                onChange={(e) => setIsGeoEnabled(e.target.checked)}
                className="h-5 w-5 rounded text-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Bán kính cho phép</span>
                <span className="text-indigo-600 font-mono">{gpsRadius} mét</span>
              </div>
              <input
                type="range"
                min={30}
                max={500}
                step={10}
                value={gpsRadius}
                onChange={(e) => setGpsRadius(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>30m</span>
                <span>500m</span>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Lưu cấu hình GPS
            </button>
          </div>
        )}
      </div>

      {showRotateConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-base">Xác nhận đổi mã QR?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mã QR cũ trên giấy in hoặc ảnh chụp màn hình trước đó sẽ mất hiệu lực ngay lập tức.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRotateConfirm(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => setShowRotateConfirm(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
              >
                Xác nhận đổi mã
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
