import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ListOrdered,
  QrCode,
  BarChart3,
  Settings,
  Tv,
  Store,
  Bell,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Headphones,
  ExternalLink,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../app/AuthContext';

export interface BranchOption {
  id: string;
  name: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  branches?: BranchOption[];
  selectedBranchId?: string;
  onBranchChange?: (branchId: string) => void;
  tvUrl?: string | null;
}

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { to: '/queues', label: 'Hàng chờ', icon: ListOrdered },
  { to: '/qr-studio', label: 'QR Studio', icon: QrCode },
  { to: '/analytics', label: 'Báo cáo & CSV', icon: BarChart3 },
  { to: '/settings', label: 'Cài đặt & Đội ngũ', icon: Settings },
];

/**
 * Layout dung chung cho cac man hinh Quan tri (SCR-03, SCR-04, SCR-09, SCR-10, SCR-11).
 * Bam sat bo cuc Sidebar + Top Header cua thiet ke Stitch, ho tro Light/Dark Mode.
 */
export function DashboardLayout({
  children,
  branches = [],
  selectedBranchId,
  onBranchChange,
  tvUrl = null,
}: DashboardLayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) ?? branches[0];

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-5 px-3 transition-all duration-200 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <div className="flex items-center justify-between px-2">
            <Link to="/dashboard" className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-display font-bold text-sm shadow-sm">
                QR
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none truncate">
                    QR-Wait
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                    Hệ thống vé số
                  </span>
                </div>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Thu gọn thanh điều hướng"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              );
            })}

            <Link
              to="/staff/panel"
              className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <Headphones className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">Mở Staff Panel</span>}
            </Link>
          </nav>
        </div>

        {/* TV Display Status Card */}
        {!collapsed && (
          <div className="px-1">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-600">
                  <Tv className="h-4 w-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    Màn hình TV Display
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {tvUrl ? 'Đã cấp liên kết' : 'Chưa tạo liên kết'}
                  </span>
                </div>
              </div>
              {tvUrl && (
                <a
                  href={tvUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Mở màn hình TV"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main Column */}
      <div className={`transition-all duration-200 ${collapsed ? 'pl-20' : 'pl-64'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5">
              <Store className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Chi nhánh:</span>
              {branches.length > 0 ? (
                <select
                  value={selectedBranch?.id ?? ''}
                  onChange={(e) => onBranchChange?.(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id} className="bg-white dark:bg-slate-900">
                      {b.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Chưa có chi nhánh
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Thông báo hệ thống"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                  {user?.displayName || 'Chưa đăng nhập'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {user?.role || 'GUEST'}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Đăng xuất"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
