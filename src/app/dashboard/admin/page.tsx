// src/app/dashboard/admin/page.tsx - Update with ProtectedRoute
'use client';

import { ProtectedRoute } from '../../../components/ProtectedRoutes';
import AdminDashboardContent from './AdminDashboardContent';

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
