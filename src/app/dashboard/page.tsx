// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardRouter() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.push('/auth?mode=login');
      return;
    }

    // Route based on user role
    switch (user.role) {
      case 'admin':
        router.push('/dashboard/admin');
        break;
      case 'teacher':
        router.push('/dashboard/teacher');
        break;
      case 'student':
        router.push('/dashboard/student');
        break;
      default:
        // If role is unknown, redirect to student dashboard as fallback
        router.push('/dashboard/student');
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Show loading state while determining route
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600 mb-4" />
        <p className="text-slate-600 dark:text-slate-400">
          Loading your dashboard...
        </p>
      </div>
    </div>
  );
}
