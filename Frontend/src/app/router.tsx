import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LandingPage } from '../features/landing/LandingPage';
import { AuthPage } from '../features/auth/AuthPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { QueueManagementPage } from '../features/queues/QueueManagementPage';
import { StaffPanelPage } from '../features/staff/StaffPanelPage';
import { CustomerCheckinPage } from '../features/checkin/CustomerCheckinPage';
import { LiveTrackingPage } from '../features/tracking/LiveTrackingPage';
import { TvDisplayPage } from '../features/display/TvDisplayPage';
import { QrStudioPage } from '../features/qr-studio/QrStudioPage';
import { AnalyticsPage } from '../features/analytics/AnalyticsPage';
import { SettingsPage } from '../features/settings/SettingsPage';

export const appRouter = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <AuthPage initialMode="login" /> },
  { path: '/register', element: <AuthPage initialMode="register" /> },

  // Public Customer & TV Display Routes
  { path: '/c/:qrToken', element: <CustomerCheckinPage /> },
  { path: '/ticket/:ticketId', element: <LiveTrackingPage /> },
  { path: '/display/:screenToken', element: <TvDisplayPage /> },

  // Protected Management & Staff Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['OWNER', 'MANAGER', 'SUPER_ADMIN']}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/queues',
    element: (
      <ProtectedRoute allowedRoles={['OWNER', 'MANAGER']}>
        <QueueManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/staff/panel',
    element: (
      <ProtectedRoute allowedRoles={['STAFF', 'MANAGER', 'OWNER']}>
        <StaffPanelPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/qr-studio',
    element: (
      <ProtectedRoute allowedRoles={['OWNER', 'MANAGER']}>
        <QrStudioPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute allowedRoles={['OWNER', 'MANAGER']}>
        <AnalyticsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute allowedRoles={['OWNER', 'MANAGER']}>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
