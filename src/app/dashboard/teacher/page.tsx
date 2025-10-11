// src/app/dashboard/teacher/page.tsx - Update with ProtectedRoute
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoutes';
import TeacherDashboardContent from './TeacherDashboardContent';

export default function TeacherDashboard() {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
      <TeacherDashboardContent />
    </ProtectedRoute>
  );
}
