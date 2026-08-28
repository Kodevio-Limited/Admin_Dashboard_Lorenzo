'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const PUBLIC_ROUTES = ['/login', '/forgot-password', '/reset-password', '/reset-login', '/set-new-pass'];

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized, role, initializeAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    // If authenticated but not ADMIN, immediately clear auth and redirect to login
    if (isAuthenticated && role && role !== 'ADMIN') {
      clearAuth();
      router.replace('/login');
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/login');
    } else if (isAuthenticated && isPublicRoute) {
      router.replace('/dashboard/overview');
    }
  }, [isAuthenticated, isInitialized, role, pathname, router, clearAuth]);

  // Show smooth dark loading screen while auth state is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-white/70">Initializing Lorenzo Admin...</span>
        </div>
      </div>
    );
  }

  // Prevent rendering protected content before redirecting
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if ((!isAuthenticated || (role && role !== 'ADMIN')) && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
