'use client';

import { ProtectedRoute } from '@/components/ProtectedRoutes';
import StudentDashboardContent from './StudentDashboardContent';

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
