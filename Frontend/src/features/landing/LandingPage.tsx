import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode,
  ArrowRight,
  ShieldCheck,
  BellRing,
  Smartphone,
  Headphones,
  SkipForward,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Tv,
  Hand,
  Infinity as InfinityIcon,
  BarChart3,
  Lock,
  Info,
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

interface DemoTicket {
  ticketNumber: string;
  name: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED';
}

/**
 * SCR-01: Landing Page & Interactive Demo
 * Tham chieu: Design/Stitch/SCR-01_Landing_Page.html
 * Khong chua du lieu khach hang ao co san; Interactive Demo bat dau tu trang thai rong de nguoi dung tu bam thu.
 */
export function LandingPage() {
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');
  const [demoName, setDemoName] = useState('');
  const [seq, setSeq] = useState(0);
  const [queue, setQueue] = useState<DemoTicket[]>([]);
  const [activeTicket, setActiveTicket] = useState<DemoTicket | null>(null);
  const [toastMsg, setToastMsg] = useState(
    'Nhập tên bất kỳ ở khung bên trái để thử lấy số và điều phối gọi số.',
  );

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = demoName.trim();
    if (!trimmed) {
      setToastMsg('Vui lòng nhập tên để lấy số thử nghiệm.');
      return;
    }
    const nextSeq = seq + 1;
    const ticketNumber = `A-${String(nextSeq).padStart(3, '0')}`;
    const newTicket: DemoTicket = { ticketNumber, name: trimmed, status: 'WAITING' };
    setSeq(nextSeq);
    setQueue((prev) => [...prev, newTicket]);
    setDemoName('');
    setToastMsg(`Đã cấp số #${ticketNumber} cho "${trimmed}".`);
  };

  const handleCallNext = () => {
    if (queue.length === 0) {
      setToastMsg('Hàng chờ thử nghiệm đang trống. Hãy nhập tên ở khung bên trái để tạo vé trước.');
      return;
    }
    const [next, ...rest] = queue;
    setQueue(rest);
    const called: DemoTicket = { ...next, status: 'CALLED' };
    setActiveTicket(called);
    setToastMsg(`Đã gọi #${called.ticketNumber} (${called.name}) lên TV.`);
  };

  const handleRecall = () => {
    if (!activeTicket) {
      setToastMsg('Chưa có vé nào đang gọi.');
      return;
    }
    setToastMsg(`Đã phát lại chuông mời #${activeTicket.ticketNumber}.`);
  };

  const handleComplete = () => {
    if (!activeTicket) {
      setToastMsg('Chưa có vé nào đang phục vụ.');
      return;
    }
    const completedNum = activeTicket.ticketNumber;
    setActiveTicket({ ...activeTicket, status: 'COMPLETED' });
    setToastMsg(`Đã hoàn tất phục vụ #${completedNum}.`);
  };

  const latestWaiting = queue[queue.length - 1] ?? null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">QR Wait</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1 text-xs font-medium">
              {(['VI', 'EN'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLang(item)}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    lang === item
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Bắt đầu miễn phí
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-6">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>Xếp hàng thông minh 4.0</span>
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                Hệ thống Xếp hàng Ảo qua Mã QR – Không cần máy in phiếu, không cần cài app
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                Giải pháp xếp hàng thông minh qua trình duyệt web, tuyệt đối không lưu số điện thoại để bảo vệ quyền riêng tư của khách hàng.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#live-demo"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
                >
                  <span>Dùng thử ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                  <span>100% Bảo mật danh tính (Zero-PII)</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-sm text-slate-500 dark:text-slate-400">
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">&lt; 3 giây</div>
                  <div>Quét mã &amp; lấy số</div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">0đ</div>
                  <div>Chi phí giấy in nhiệt</div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">Web PWA</div>
                  <div>Chạy mọi thiết bị</div>
                </div>
              </div>
            </div>

            {/* Hero Preview Mockup (Phan anh trang thai thuc cua Demo widget, khong co du lieu ao) */}
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-[560px]">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                        Màn hình TV Sảnh
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300">
                      <BellRing className="h-3.5 w-3.5" />
                      <span>Ding Dong &amp; TTS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-7">
                      <div className="mb-1 text-xs uppercase tracking-wider text-slate-400">Đang mời số</div>
                      <div className="font-mono text-4xl font-extrabold tracking-tight text-amber-300 whitespace-nowrap sm:text-5xl">
                        {activeTicket ? `#${activeTicket.ticketNumber}` : '--'}
                      </div>
                      <div className="mt-3 text-sm text-slate-300">
                        {activeTicket ? `Khách hàng: ${activeTicket.name}` : 'Chưa có lượt gọi'}
                      </div>
                    </div>
                    <div className="col-span-5 rounded-xl bg-white/5 p-3.5">
                      <div className="mb-2 text-[11px] uppercase tracking-wider text-slate-400">Đang chờ</div>
                      {queue.length === 0 ? (
                        <div className="text-xs text-slate-400">Trống (0 nhóm)</div>
                      ) : (
                        <div className="flex flex-col gap-1.5 text-sm font-bold">
                          {queue.slice(0, 3).map((q) => (
                            <div key={q.ticketNumber} className="flex items-center justify-between">
                              <span className="font-mono whitespace-nowrap">#{q.ticketNumber}</span>
                              <span className="text-xs font-normal text-slate-300 truncate max-w-[80px]">{q.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="live-demo" className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Tương tác thời gian thực
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Trải nghiệm tương tác trực tiếp
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Nhập tên để thử lấy số trên điện thoại khách hàng và bấm gọi số trên bảng điều khiển nhân viên.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Customer Demo Phone */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F9FAFB] dark:bg-slate-900 p-6 sm:p-8">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold">Màn hình Khách hàng</h3>
                        <p className="text-xs text-slate-500">Quét QR &amp; nhận vé trên trình duyệt</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold">
                      Mobile PWA
                    </span>
                  </div>

                  <div className="mx-auto max-w-[340px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-display text-sm font-bold">QR-Wait Demo</span>
                      <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                        {activeTicket ? activeTicket.status : latestWaiting ? 'WAITING' : 'CHƯA CÓ VÉ'}
                      </span>
                    </div>
                    <div className="mb-5 rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-center">
                      <div className="text-xs text-slate-500 mb-1">Số vé thử nghiệm</div>
                      <div className="font-mono text-4xl font-extrabold text-indigo-600 whitespace-nowrap">
                        {activeTicket
                          ? `#${activeTicket.ticketNumber}`
                          : latestWaiting
                            ? `#${latestWaiting.ticketNumber}`
                            : '--'}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {activeTicket
                          ? `${activeTicket.name} • ${activeTicket.status === 'CALLED' ? 'Tới lượt bạn!' : 'Đã hoàn tất'}`
                          : latestWaiting
                            ? `${latestWaiting.name} • Còn ${queue.length - 1} nhóm phía trước`
                            : 'Chưa có vé nào được tạo'}
                      </div>
                    </div>
                    <form onSubmit={handleDemoSubmit} className="flex flex-col gap-2.5">
                      <label htmlFor="demo-name-input" className="text-xs font-semibold">
                        Lấy số thử nghiệm (Chỉ cần nhập Tên)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="demo-name-input"
                          type="text"
                          value={demoName}
                          onChange={(e) => setDemoName(e.target.value)}
                          placeholder="Nhập tên của bạn..."
                          className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                          Lấy số
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Không yêu cầu Số điện thoại, Email hay CCCD</span>
                </div>
              </div>

              {/* Staff Demo Panel */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F9FAFB] dark:bg-slate-900 p-6 sm:p-8">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                        <Headphones className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold">Staff Panel (Nhân viên)</h3>
                        <p className="text-xs text-slate-500">Điều phối hàng đợi với 1 chạm</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold">
                      Quầy thử nghiệm
                    </span>
                  </div>

                  <div className="mb-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Đang xử lý
                      </span>
                      <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                        {activeTicket?.status ?? 'IDLE'}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-mono text-4xl font-extrabold whitespace-nowrap">
                        {activeTicket ? `#${activeTicket.ticketNumber}` : '--'}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {activeTicket ? activeTicket.name : 'Chưa gọi khách'}
                        </div>
                        <div className="text-xs text-slate-500">Đang đợi: {queue.length} nhóm</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={handleCallNext}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      <SkipForward className="h-4 w-4" />
                      <span>Gọi tiếp theo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRecall}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <BellRing className="h-4 w-4" />
                      <span>Gọi lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleComplete}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Hoàn tất</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                  <Info className="h-4 w-4 shrink-0 text-indigo-600" />
                  <span>{toastMsg}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid (6 Cards theo BRD v1.3 / SRS v1.2) */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Tính năng vượt trội</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Tối ưu vận hành cho mọi điểm giao dịch
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: '01 / Bảo mật vị trí',
                  title: 'Chống gian lận GPS',
                  desc: 'Xác thực vị trí thực tế trong bán kính 30m – 500m, ngăn chặn lấy số ảo từ xa.',
                  icon: MapPin,
                },
                {
                  num: '02 / Linh hoạt tại quầy',
                  title: 'Đổi mã QR theo Ca / Thủ công',
                  desc: 'Giữ mã QR cố định để in poster, hoặc bấm đổi mã QR mới ngay khi cần vô hiệu hóa ảnh chụp cũ.',
                  icon: RefreshCw,
                },
                {
                  num: '03 / Màn hình sảnh',
                  title: 'TV Display chuông & TTS',
                  desc: 'Hiển thị màn hình sảnh rõ nét, phát chuông Ding Dong và giọng đọc tiếng Việt (Bật/Tắt).',
                  icon: Tv,
                },
                {
                  num: '04 / Tối ưu tốc độ',
                  title: 'Thao tác 1 chạm & Đồng hồ 2p',
                  desc: 'Giao diện nhân viên tối giản, đồng bộ 2 chiều và khóa DB chống gọi trùng đa quầy.',
                  icon: Hand,
                },
                {
                  num: '05 / Hiệu năng cao',
                  title: 'Không giới hạn lượt vé',
                  desc: 'Phục vụ hàng nghìn lượt khách mỗi ngày ổn định với kiến trúc Modular Monolith.',
                  icon: InfinityIcon,
                },
                {
                  num: '06 / Dữ liệu trực quan',
                  title: 'Báo cáo & Xuất CSV',
                  desc: 'Thống kê thời gian chờ trung bình, giờ cao điểm và xuất file CSV chuẩn UTF-8.',
                  icon: BarChart3,
                },
              ].map(({ num, title, desc, icon: Icon }) => (
                <div
                  key={num}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-xs hover:shadow-md transition-all"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
                  </div>
                  <div className="mt-6 text-xs font-semibold text-indigo-600">{num}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row lg:px-12">
          <span>© 2026 QR-Wait</span>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-white">
              Đăng nhập hệ thống
            </Link>
            <Link to="/register" className="hover:text-slate-900 dark:hover:text-white">
              Tạo tài khoản tổ chức
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
