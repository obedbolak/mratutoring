'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'admin')[];
  requireVerification?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireVerification = false,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Not authenticated
    if (!isAuthenticated || !user) {
      router.push('/auth?mode=login');
      return;
    }

    // Check if user role is allowed
    if (allowedRoles && !allowedRoles.includes(user.role as any)) {
      router.push('/dashboard');
      return;
    }

    // Check if verification is required
    if (requireVerification && !user.verified) {
      router.push('/verify-email');
      return;
    }
  }, [
    user,
    isLoading,
    isAuthenticated,
    router,
    allowedRoles,
    requireVerification,
  ]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication and authorization
  if (!isAuthenticated || !user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role as any)) {
    return null;
  }

  if (requireVerification && !user.verified) {
    return null;
  }

  return <>{children}</>;
}
