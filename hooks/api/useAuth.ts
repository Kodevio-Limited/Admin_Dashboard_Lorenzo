'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/services/auth.service';
import { userService } from '@/lib/api/services/user.service';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { extractRoleFromToken } from '@/lib/jwt';
import type {
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from '@/types/auth';

/**
 * Hook for User Login with Admin Role Verification
 */
export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const addToast = useUIStore((s) => s.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginInput) => {
      const data = await authService.login(payload);

      let role = data.role || extractRoleFromToken(data.accessToken);

      // If role is not directly inside JWT, verify by calling getSelfProfile
      if (!role) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', data.accessToken);
          }
          const profile = await userService.getSelfProfile();
          role = profile.role ? profile.role.toUpperCase() : null;
        } catch {
          // If profile fetch fails, role remains null
        }
      }

      if (role && role.toUpperCase() !== 'ADMIN') {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
        }
        try {
          await authService.logout();
        } catch {
          // ignore logout error
        }
        throw new Error('Access Denied: Only administrators have access to this portal.');
      }

      return { ...data, role: role || 'ADMIN' };
    },
    onSuccess: (data) => {
      setAuth(data);
      addToast('Logged in successfully', 'success');
      queryClient.clear();
      router.push('/dashboard/overview');
    },
    onError: (error: Error) => {
      clearAuth();
      addToast(error.message || 'Login failed. Please check your credentials.', 'error');
    },
  });
}

/**
 * Hook for User Logout
 */
export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const addToast = useUIStore((s) => s.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      addToast('Logged out successfully', 'info');
      router.push('/login');
    },
    onError: () => {
      // Force local logout even if server fails
      clearAuth();
      queryClient.clear();
      router.push('/login');
    },
  });
}

/**
 * Hook for Forgot Password
 */
export function useForgotPassword() {
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (payload: ForgotPasswordInput) => authService.forgotPassword(payload),
    onSuccess: (message) => {
      addToast(message, 'success');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to send reset link', 'error');
    },
  });
}

/**
 * Hook for Reset Password
 */
export function useResetPassword() {
  const router = useRouter();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (payload: ResetPasswordInput) => authService.resetPassword(payload),
    onSuccess: (message) => {
      addToast(message, 'success');
      router.push('/login');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to reset password', 'error');
    },
  });
}

/**
 * Hook for Change Password
 */
export function useChangePassword() {
  const addToast = useUIStore((s) => s.addToast);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ChangePasswordInput) => authService.changePassword(payload),
    onSuccess: (message) => {
      addToast(message + '. Please login again.', 'success');
      clearAuth();
      router.push('/login');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to change password', 'error');
    },
  });
}
