import React, { useState } from 'react';
import {
  Users,
  Tv,
  UserPlus,
  Search,
  Copy,
  RefreshCw,
  Mic,
  Upload,
  X,
  BellRing,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserRole, UserSummary } from '../../lib/types';

type SettingsTab = 'team' | 'display';

/**
 * SCR-11: Cai dat He thong, Thanh vien & Man hinh TV / Am thanh TTS
 * Tham chieu: Design/Stitch/SCR-11_Settings_Team.html & SRS v1.2 (Khong gom M11 API Keys/Webhooks)
 */
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('team');
  const [members] = useState<UserSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [screenUrl] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('STAFF');

  const filteredMembers = members.filter(
    (m) =>
      m.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Ket noi POST /api/v1/users (tao truc tiep khong qua email kich hoat - FR-003)
    setAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            Cài đặt &amp; Quản lý Đội ngũ
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Quản lý tài khoản nhân viên, cấu hình Secret URL màn hình TV Display, giọng đọc TTS và Logo thương hiệu.
          </p>
        </div>

        {/* 2 Active Tabs (M11 API Keys & Webhooks da tam dung theo BRD v1.3) */}
        <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 self-start">
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'team'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Thành viên &amp; Phân quyền</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('display')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'display'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Tv className="h-4 w-4" />
            <span>Chi nhánh, TV Display &amp; TTS</span>
          </button>
        </div>

        {/* Tab 1: Team */}
        {activeTab === 'team' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo tên hoặc email nhân viên..."
                  className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <UserPlus className="h-4 w-4" />
                <span>+ Thêm thành viên mới</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              {filteredMembers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
                        <th className="py-3.5 px-5">Nhân sự</th>
                        <th className="py-3.5 px-4">Vai trò</th>
                        <th className="py-3.5 px-4">Trạng thái</th>
                        <th className="py-3.5 px-5 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredMembers.map((m) => (
                        <tr key={m.id}>
                          <td className="py-3.5 px-5">
                            <div className="font-semibold">{m.displayName}</div>
                            <div className="text-xs text-slate-500">{m.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-bold">{m.role}</td>
                          <td className="py-3.5 px-4 text-xs">
                            {m.isActive ? 'Đang hoạt động' : 'Đã tạm khóa'}
                          </td>
                          <td className="py-3.5 px-5 text-right text-xs">
                            <button type="button" className="text-indigo-600 font-semibold hover:underline">
                              {m.isActive ? 'Khóa tài khoản' : 'Mở khóa'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Users className="mx-auto h-9 w-9 mb-2 opacity-40" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Chưa có thành viên nào</p>
                  <p className="text-xs mt-1">
                    Bấm <strong>"+ Thêm thành viên mới"</strong> để cấp tài khoản Manager hoặc Staff đăng nhập ngay.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Branch, TV Display & TTS */}
        {activeTab === 'display' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
              <div>
                <h2 className="font-display text-lg font-bold">Liên kết hiển thị TV sảnh chờ (Secret URL)</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Mở đường dẫn này trên trình duyệt Smart TV để trình chiếu số đang phục vụ (chỉ đọc, không cần đăng nhập).
                </p>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
                <input
                  readOnly
                  value={screenUrl || 'Chưa tạo Screen Token cho chi nhánh'}
                  className="flex-1 bg-transparent text-xs font-mono focus:outline-none"
                />
                <button
                  type="button"
                  disabled={!screenUrl}
                  onClick={() => screenUrl && navigator.clipboard.writeText(screenUrl)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold disabled:opacity-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Sao chép</span>
                </button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Sinh / Tạo lại Secret URL mới</span>
              </button>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-semibold">Chuông Ding Dong gọi số</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">Luôn bật</span>
                </div>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-semibold">Giọng đọc Text-to-Speech (TTS Tiếng Việt)</div>
                      <div className="text-[11px] text-slate-500">
                        Đọc tuần tự: "Xin mời khách hàng số..., đến Quầy..." qua Audio Queue
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={ttsEnabled}
                    onChange={(e) => setTtsEnabled(e.target.checked)}
                    className="h-5 w-5 rounded text-indigo-600"
                  />
                </label>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
              <h2 className="font-display text-base font-bold">Logo tổ chức trên TV &amp; Check-in</h2>
              <p className="text-xs text-slate-500">
                Hỗ trợ JPG, PNG, SVG tối đa 2MB. Lưu trữ trên Cloud Object Storage.
              </p>
              <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Upload className="h-6 w-6 text-indigo-600" />
                <span className="text-xs font-semibold">Chọn ảnh Logo để tải lên</span>
                <input type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base">Thêm thành viên mới</h3>
              <button type="button" onClick={() => setAddModalOpen(false)} className="text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateMember} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">Tên hiển thị *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nhập tên nhân viên..."
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Email đăng nhập *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nhanvien@cuahang.vn"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Mật khẩu ban đầu (tối thiểu 6 ký tự) *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Vai trò *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                >
                  <option value="STAFF">Nhân viên trực quầy (STAFF)</option>
                  <option value="MANAGER">Quản lý chi nhánh (MANAGER)</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                >
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
